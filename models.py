# coding=utf-8


from sqlalchemy.ext.declarative import declarative_base, AbstractConcreteBase, as_declarative, declared_attr

from sqlalchemy import Column, String, Integer, Boolean, Text, text, ForeignKey, Numeric, DateTime, Date, PrimaryKeyConstraint, ForeignKeyConstraint, func
from sqlalchemy.orm import relationship, composite, backref, aliased
from sqlalchemy.sql import select, func as sqlfn, exists, except_, case, label
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy.inspection import inspect
from enum import Enum
import time
from excepts import *
import hashlib
from dbx import Session, redis

from util import ChainDict


def default_naming_strategy(name):
    import re
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


@as_declarative()
class Base:

    def _asdict(self):
        ret = ChainDict()
        for c in inspect(self.__class__).columns:
            val = getattr(self, c.name, None)
            ret[c.name] = val
        return ret


class FakeBase(AbstractConcreteBase, Base):

    """__mapper_args__ can be set by @declared_attr if you need some dynamic info

    """
    # @declared_attr
    # def __mapper_args__(cls):
    #     return {
    #         'concrete': True,
    #         # 'polymorphic_identity': cls.__name__
    #     }
    __mapper_args__ = {
        'concrete': True
    }


class VoidEntity:

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    @declared_attr
    def __tablename__(cls):
        return default_naming_strategy(cls.__name__)

    def update_vo(self, **kwargs):
        """
        :rtype: VoidEntity
        :param kwargs:
        :return:
        """
        for k, v in kwargs.items():
            if hasattr(self, k):
                setattr(self, k, v)
        return self

    @classmethod
    def load(cls, pk):
        """
        :rtype: VoidEntity
        :type pk: str
        :param pk: str
        :return: VoidEntity
        """
        return Session.query(cls).get(pk)

    @classmethod
    def remove(cls, pk):
        cls.load(pk).erase()

    def save(self):
        """
        :rtype: VoidEntity
        :return: VoidEntity
        """
        Session.add(self)
        return self

    def erase(self):
        Session.delete(self)

    @property
    def phantom(self):
        return not inspect(self).has_identity


class PrimeEntity(VoidEntity):

    id = Column(String, primary_key=True)

    def __eq__(self, other):
        return False if not isinstance(other, self.__class__) else self.id == other.id


class VersionEntity(PrimeEntity):
    """ place this class and its subclass before the VoidBase to supply the __mapped_args__

    """

    version = Column(Integer, nullable=False)

    archived = Column(Boolean, default=False)
    active = Column(Boolean, default=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.active = True
        self.archived = False

    def erase(self):
        self.archive()

    def archive(self):
        self.archived = False
        self.save()

    @declared_attr
    def __mapper_args__(cls):
        return {
            'concrete': True,
            # 'polymorphic_identity': cls.__name__, # turn off polymorphic loading
            'version_id_col': cls.version
        }


class BusinessEntity(VersionEntity):

    number = Column(String)
    code = Column(String)
    name = Column(String)
    alias = Column(String)
    brief = Column(String)
    search_field = Column(String)


class AuditIface:

    created_at = Column(Integer)
    created_by = Column(String)
    modified_at = Column(Integer)
    modified_by = Column(String)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.created_at = int(time.time() * 1000)
        self.modified_at = self.created_at


class NodeIface:
    """ subclass must satisfy: id property as primary_key, parent_fk property as parent foreign key
        subclass should override PrimeEntity's save method to invoke _update_leaf method before save

    """

    leaf = Column(Boolean, default=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.leaf = True

    def _update_leaf(self):
        clz = self.__class__
        tbl = clz.__table__
        # use execute instead of query, because the session may issue an update command before query method
        if not self.phantom:
            old_parent_fk = Session.execute(select([tbl.c.parent_fk]).where(tbl.c.id == self.id)).first()[0]
            if old_parent_fk == self.parent_fk:
                return
            if old_parent_fk:
                cnt = Session.query(func.count(clz.id)).filter(clz.parent_fk == old_parent_fk).one()[0]
                if cnt <= 1:
                    stmt = tbl.update().values(leaf=True).where((tbl.c.id == old_parent_fk) & (tbl.c.leaf == False))
                    Session.execute(stmt)
        if self.parent_fk:
            stmt = tbl.update().values(leaf=False).where((tbl.c.id == self.parent_fk) & (tbl.c.leaf == True))
            Session.execute(stmt)

    @classmethod
    def tree(cls, node=None):
        """

        :rtype: list[VoidEntity]
        :type node: str
        :param node:
        :return:
        """
        return Session.query(cls).filter(cls.parent_fk == node).all()


class User(VersionEntity, AuditIface, FakeBase):
    __tablename__ = 't_user'
    password = Column(String)
    alias = Column(String)
    name = Column(String)
    org_fk = Column(String)
    memo = Column(String)

    OPWD = '898989'
    SALT = '9iOl*$K'

    @hybrid_property
    def username(self):
        return self.id

    def save(self):
        """

        :rtype: User
        """
        super().save()
        redis.hmset('user:%s' % self.id, self._asdict())
        return self

    @staticmethod
    def add_role(user_fk, role_fk):
        po = UserRoleHeader(user_fk=user_fk, role_fk=role_fk)
        Session.add(po)
        permits = Session.query(Permission.id).\
            join(RolePermissionHeader).\
            filter(RolePermissionHeader.role_fk == role_fk).all()
        if permits:
            redis.sadd('user_permits:%s' % user_fk, *[e[0] for e in permits])

    @staticmethod
    def remove_role(user_fk, role_fk):
        po = Session.query(UserRoleHeader)\
            .filter(UserRoleHeader.user_fk == user_fk, UserRoleHeader.role_fk == role_fk).one()
        q1 = Session.query(Permission.id)\
            .join(RolePermissionHeader)\
            .filter(RolePermissionHeader.role_fk == role_fk)
        q2 = Session.query(Permission.id).join(RolePermissionHeader, UserRoleHeader)\
            .filter(UserRoleHeader.user_fk == user_fk, RolePermissionHeader.role_fk != role_fk)
        to_remove = q1.except_(q2).all()
        if to_remove:
            redis.srem('user_permits:%s' % user_fk, *[e[0] for e in to_remove])
        Session.delete(po)

    def digest_passwd(self):
        msg = self.id + ':' + self.password + ':' + User.SALT
        self.password = str(hashlib.md5(msg.encode()).hexdigest())
        return self

    def set_passwd(self, passwd=None):
        if not passwd:
            passwd = User.OPWD
        self.password = passwd
        self.digest_passwd()
        return self


class Duty(VersionEntity, FakeBase):
    code = Column(String(20))
    name = Column(String(64))
    brief = Column(Text)


class UserDutyHeader(VoidEntity, FakeBase):
    user_fk = Column(String, ForeignKey('t_user.id'), primary_key=True)
    duty_fk = Column(String, ForeignKey('duty.id'), primary_key=True)


class DutyChain(VersionEntity, FakeBase):
    code = Column(String(20))
    name = Column(String(64))
    brief = Column(Text)

    members = Column(Text)


class WorkFlow(FakeBase, PrimeEntity):
    duty_chain_fk = Column(String)
    approves = Column(String)
    status = Column(String)
    finished = Column(Boolean)
    cur_node = Column(Integer)

    def proceed(self, operator, op_code, memo):
        pass

    def init_flow(self):
        pass


class WorkFlowed:

    flow_status = Column(String)
    flow_finished = Column(Boolean)

    @declared_attr
    def work_flow_fk(cls):
        return Column(String, ForeignKey('work_flow.id'))

    @declared_attr
    def work_flow(cls):
        return relationship('WorkFlow')

    def sync_flow_status(self):
        w = self.work_flow
        self.flow_status = w.status
        self.flow_finished = w.finished


class WorkFlowItem(FakeBase, PrimeEntity):
    sub_idx = Column(Integer)
    op_code = Column(String)
    duty_fk = Column(String)  # reference to duty.id
    operator_fk = Column(String)  # reference to user.username
    memo = Column(String)
    status = Column(String)
    result = Column(String)
    flow_fk = Column(String, ForeignKey('work_flow.id'))


class WorkFlowJournal(FakeBase, PrimeEntity):
    flow_fk = Column(String, ForeignKey('work_flow.id'))
    date = Column(Integer)
    operator_fk = Column(String)
    op_code = Column(String)
    memo = Column(String)


class Project(BusinessEntity, WorkFlowed, AuditIface, FakeBase):

    proj_type = Column(String)

    category_id = Column(String, ForeignKey('product_category.id'))

    # part contract
    setup_date = Column(Integer)
    contract_no = Column(String(32))
    contract_status = Column(String)

    proj_mgr = Column(String(32))
    cust_mgr = Column(String(32))

    fee_rate = Column(Numeric)
    estimate_scale = Column(Numeric)
    period = Column(Integer)
    estimate_setup_date = Column(Integer)


    # prime_pre_account_fk = Column(String, ForeignKey('project_pre_account.id'))

    # prime_pre_account = relationship('ProjectPreAccount', cascade='all, delete-orphan')

    status = Column(String)

    org_introduce_fk = Column(String, ForeignKey('organization.id'))
    org_operate_fk = Column(String, ForeignKey('organization.id'))
    org_supervise_fk = Column(String, ForeignKey('organization.id'))

    # part online
    online_date = Column(Integer)
    online_scale = Column(Numeric)
    online_status = Column(String)
    status_online = Column(String)

    # part operators
    acct_num = Column(String)
    asset_code = Column(String)
    status_operators = Column(String)

    # part operation
    trustee_corp = Column(String(64))
    trustee_contact = Column(String(64))
    due_date = Column(Integer)
    open_date = Column(Integer)
    invest_advisor = Column(String(64))
    lasts_month = Column(Integer)
    status_operation = Column(String)

    status_accounts = Column(String)

    status_supervise = Column(String)

    status_archive = Column(String)


class ProjectOnline(VersionEntity, AuditIface, FakeBase):

    online_memo = Column(Text)
    status = Column(String)
    project_fk = Column(String, ForeignKey('project.id'))


class ProjectOperators(VersionEntity, AuditIface, FakeBase):
    clerks_operator = Column(String)
    clerks_checker = Column(String)
    clerks_director = Column(String)
    status = Column(String)
    project_fk = Column(String, ForeignKey('project.id'))


class ProjectAccounts(PrimeEntity, WorkFlowed, FakeBase):
    pass


class ProjectSupervise(VersionEntity, WorkFlowed, AuditIface, FakeBase):
    pass


class ProjectArchive(VersionEntity, WorkFlowed, AuditIface, FakeBase):

    trans_num = Column(String(32))
    trans_person = Column(String(32))
    trans_date = Column(Integer)
    trans_receipt = Column(String(32))
    project_fk = Column(String, ForeignKey('project.id'))


class ProjectTransDoc(PrimeEntity, FakeBase):

    detail = Column(Text)
    copies = Column(Integer)
    is_copy = Column(Boolean)
    memo = Column(Text)
    project_archive_fk = Column(String)


class ProjectType(Enum):

    CLASSIC = '1'
    MODERN = '2'


class ProjectStatus(Enum):

    DRAFT = '1'
    OPEN = '2'
    CLOSED = '3'


class ProjectAgent(PrimeEntity, FakeBase):

    corp_name = Column(String(64))
    addr = Column(String(64))
    legalman = Column(String(32))
    phone = Column(String(32))
    contact = Column(String(32))
    contact_phone = Column(String(32))
    zipcode = Column(String(16))
    project_id = Column(String, ForeignKey('project.id'))


class ProjectPreAccount(PrimeEntity, FakeBase):

    acct_no = Column(String(64))
    acct_name = Column(String(64))
    branch = Column(String(64))
    is_primary = Column(Boolean)
    project_id = Column(String, ForeignKey('project.id'))


class SuperviseIssue(FakeBase, PrimeEntity):

    issue_type = Column(String)
    content = Column(Text)
    artificial = Column(Boolean)
    project_id = Column(String, ForeignKey('project.id'))

    journals = relationship('SuperviseIssueJournal', back_populates='issue')


class SuperviseIssueJournal(FakeBase, PrimeEntity):

    journal_date = Column(Integer)
    content = Column(Text)
    memo = Column(Text)
    issue_id = Column(String, ForeignKey('supervise_issue.id'))

    issue = relationship('SuperviseIssue', back_populates='journals')


class ProjectAccount(FakeBase, PrimeEntity):

    acct_no = Column(String(64))
    acct_name = Column(String(64))
    acct_type = Column(Integer)
    branch = Column(String(64))
    open_date = Column(Integer)
    close_date = Column(Integer)
    is_primary = Column(Boolean)
    project_id = Column(String, ForeignKey('project.id'))


class ProductCategory(VersionEntity, FakeBase):
    id = Column(String, primary_key=True)

    code = Column(String(20))
    name = Column(String(64), nullable=False)
    fullname = Column(String)
    brief = Column(Text)
    leaf = Column(Boolean, default=True)
    parent_fk = Column(String, ForeignKey('product_category.id'))

    # children = relationship('ProductCategory',
    #                         backref=backref('parent', remote_side=[id]), cascade='all, delete, delete-orphan')

    # sadly, relationship dose not work here with @declared_attr
    # @declared_attr
    # def parent(cls):
    #     relationship('ProductCategory', remote_side=[cls.id], backref=backref('children', cascade='all'), cascade='save-update')

    parent = relationship('ProductCategory', remote_side=[id], backref=backref('children', cascade='all'), cascade='save-update')

    def set_parent(self, parent=None):
        """

        :param {str|ProductCategory|None} parent: parent_fk or parent; None to remove parent
        :return:
        """
        if parent:
            if isinstance(parent, str):
                if parent == self.id:
                    raise BusinessException('parent should not be oneself')
                parent = self.__class__.load(parent)
                if not parent:
                    raise EntityNotFound('%s#%s' % (self.__class__.name, parent))
            if parent.id == self.id:
                raise BusinessException('parent should not be oneself')
            old_parent = self.parent
            if parent == old_parent:
                return
            if old_parent:
                cnt = Session.query(func.count(ProductCategory.id))\
                    .filter(ProductCategory.parent_fk == old_parent.id).one()[0]
                if cnt <= 1:
                    old_parent.leaf = True
                    Session.add(old_parent)
            parent.leaf = False
            self.parent = parent
            self._update_fullname()
        else:
            old_parent = self.parent
            if old_parent:
                cnt = Session.query(func.count(ProductCategory.id)) \
                    .filter(ProductCategory.parent_fk == old_parent.id).one()[0]
                if cnt <= 1:
                    old_parent.leaf = True
                    Session.add(old_parent)
            self.parent = None
            self._update_fullname()

    def _update_fullname(self):
        if self.parent:
            self.fullname = self.parent.fullname + ':' + self.name
        else:
            self.fullname = self.name
        for c in self.children:
            c._update_fullname()

    def erase(self):
        old_parent = self.parent
        if old_parent:
            cnt = Session.query(func.count(ProductCategory.id)) \
                .filter(ProductCategory.parent_fk == old_parent.id).one()[0]
            if cnt <= 1:
                old_parent.leaf = True
                Session.add(old_parent)
        super().erase()

    def update_vo(self, **kwargs):
        """
        :rtype VoidEntity
        """
        super().update_vo(**kwargs)
        if 'parent_fk' in kwargs:
            self.set_parent(kwargs['parent_fk'])
        return self


class Organization(VersionEntity, NodeIface, FakeBase):

    code = Column(String(20))
    name = Column(String(64))
    brief = Column(Text)

    parent_fk = Column(String, ForeignKey('organization.id'))

    def save(self):
        self._update_leaf()
        super().save()
        return self


class Attachment(FakeBase, PrimeEntity):

    fkid = Column(String(64))
    fpath = Column(String(255))
    fname = Column(String(255))
    mime = Column(String(32))
    upload_date = Column(Integer)
    upload_by = Column(String)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.upload_date = int(time.time()*1000)

    @staticmethod
    def load_by_fkid(fkid):
        """
        :type fkid str
        :rtype list[Attachment]
        :param fkid:
        :return:
        """
        return Session.query(Attachment.id, Attachment.fkid, Attachment.fname, Attachment.upload_date)\
            .filter(Attachment.fkid == fkid).order_by(Attachment.upload_date.desc()).all()


class ActivityLog:
    activity_category = None
    action_type = None
    subject = None
    detail = None
    target = None


class AppDict(BusinessEntity, FakeBase):

    nullable = Column(Boolean)
    dict_type = Column(String(1))
    items = relationship('AppDictItem')


class AppDictItem(FakeBase, PrimeEntity):

    app_dict_fk = Column(String, ForeignKey('app_dict.id'))
    value = Column(String(64))
    text = Column(String(255))
    memo = Column(String(255))


class Role(FakeBase, PrimeEntity):

    code = Column(String, unique=True, nullable=False)
    memo = Column(Text)
    name = Column(String)
    flag = Column(String(10))

    permissions = relationship('RolePermissionHeader')


class UserRoleHeader(VoidEntity, FakeBase):

    user_fk = Column(String, ForeignKey('t_user.id'), primary_key=True)
    role_fk = Column(String, ForeignKey('role.id'), primary_key=True)


class Permission(PrimeEntity, NodeIface, FakeBase):

    code = Column(String, unique=True, nullable=False)
    name = Column(String)
    memo = Column(Text)
    parent_fk = Column(String, ForeignKey('permission.id'))

    def save(self):
        self._update_leaf()
        super().save()
        return self


class RolePermissionHeader(VoidEntity, FakeBase):
    role_fk = Column(String, ForeignKey('role.id'), primary_key=True)
    permission_fk = Column(String, ForeignKey('permission.id'), primary_key=True)


#############################
# END: business/domain entity
############################
# BEGIN: listeners
############################
