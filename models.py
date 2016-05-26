# coding=utf-8


from sqlalchemy.ext.declarative import declarative_base, AbstractConcreteBase, as_declarative, declared_attr

from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey, Numeric, DateTime, Date, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import relationship, composite, backref
from enum import Enum



def default_naming_strategy(name):
    import re
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


@as_declarative()
class Base:

    def __json__(self):
        ret = {}
        for c in self.__table__.columns:
            val = getattr(self, c.name, None)
            ret[c.name] = val
        return ret

    def update_vo(self, vo):
        for k, v in vo.items():
            if hasattr(self, k):
                setattr(self, k, v)


class DistinctBase(AbstractConcreteBase, Base):
    pass


class PrimeBase:
    @declared_attr
    def __tablename__(cls):
        return default_naming_strategy(cls.__name__)

    def __eq__(self, other):
        return False if not isinstance(other, self.__class__) else self.id == other.id



class BaseEntity(PrimeBase):
    archived = Column(Boolean, default=False)
    active = Column(Boolean, default=True)
#
# class PrimeBase(AbstractConcreteBase, Base):
#     id = Column(Integer, primary_key=True, autoincrement=True)
#
#     @declared_attr
#     def __tablename__(cls):
#         return default_naming_strategy(cls.__name__)
#
#     def update_vo(self, vo):
#         for k, v in vo.items():
#             if hasattr(self, k):
#                 setattr(self, k, v)
#
#     def json(self):
#         ret = {}
#         for c in self.__table__.columns:
#             val = getattr(self, c.name, None)
#             ret[c.name] = val
#         return ret


class BusinessEntity(PrimeBase):
    number = Column(String)
    code = Column(String)
    name = Column(String)
    alias = Column(String)
    brief = Column(String)
    search_field = Column(String)


class Auditable:
    last_modified_date = Column(Integer)


class User(Auditable, DistinctBase, BaseEntity):
    __tablename__ = 't_user'

    username = Column(String, nullable=False, primary_key=True)
    password = Column(String)
    alias = Column(String)
    name = Column(String)

    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'User'
    }


class Project(DistinctBase, BusinessEntity):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'Project'
    }


    proj_type = Column(String)

    category_id = Column(String, ForeignKey('product_category.id'))
    category = relationship('ProductCategory')

    contract_no = Column(String(32))
    contract_status = Column(String)

    proj_mgr = Column(String(32))
    cust_mgr = Column(String(32))

    fee_rate = Column(Numeric)
    estimate_scale = Column(Numeric)
    period = Column(Integer)
    estimate_setup_date = Column(Integer)

    setup_date = Column(Integer)

    create_date = Column(Integer)


    agents = relationship('ProjectAgent')


    # prime_pre_account_fk = Column(String, ForeignKey('project_pre_account.id'))

    # prime_pre_account = relationship('ProjectPreAccount', cascade='all, delete-orphan')

    proj_status = Column(String)



    intro_org_id = Column(String, ForeignKey('organization.id'))
    op_org_id = Column(String, ForeignKey('organization.id'))
    spv_org_id = Column(String, ForeignKey('organization.id'))



    online_date = Column(Integer)
    online_scale = Column(Numeric)
    online_memo = Column(Text)
    online_status = Column(String)

    acct_num = Column(String)
    asset_code = Column(String)

    trustee_corp = Column(String(64))
    trustee_contact = Column(String(64))

    due_date = Column(Integer)
    open_date = Column(Integer)
    invest_advisor = Column(String(64))
    lasts_month = Column(Integer)


    accounts = relationship('ProjectAccount')


    supervise_issues = relationship('SuperviseIssue')

    trans_num = Column(String(32))
    trans_person = Column(String(32))
    trans_date = Column(Integer)
    trans_receipt = Column(String(32))
    trans_status = Column(String)

    trans_docs = relationship('ProjectTransDoc')

    def __setattr__(self, key, value):
        if key == 'prime_pre_account':
            value.is_primary = False
        object.__setattr__(self, key, value)

#
# class ProjectBasicInfo:
#     def __init__(self, *args, **kwargs):
#         for k, v in kwargs.items():
#             setattr(self, k, v)
#
#

class ProjectTransDoc(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'ProjectTransDoc'
    }
    detail = Column(Text)
    copies = Column(Integer)
    is_copy = Column(Boolean)
    memo = Column(Text)
    project_id = Column(String, ForeignKey('project.id'))
#
#
# class ProjectType(Enum):
#     CLASSIC = 1
#     MODERN = 2
#
#
# class ProjectStatus(Enum):
#     DRAFT = 1
#     OPEN = 2
#     CLOSED = 3
#
#
class ProjectAgent(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'ProjectAgent'
    }

    corp_name = Column(String(64))
    addr = Column(String(64))
    legalman = Column(String(32))
    phone = Column(String(32))
    contact = Column(String(32))
    contact_phone = Column(String(32))
    zipcode = Column(String(16))
    project_id = Column(String, ForeignKey('project.id'))
#
#
class ProjectPreAccount(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'ProjectPreAccount'
    }


    acct_no = Column(String(64))
    acct_name = Column(String(64))
    branch = Column(String(64))
    is_primary = Column(Boolean)
    project_id = Column(String, ForeignKey('project.id'))
#
#
class SuperviseIssue(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'SuperviseIssue'
    }

    issue_type = Column(String)
    content = Column(Text)
    artificial = Column(Boolean)
    project_id = Column(String, ForeignKey('project.id'))

    journals = relationship('SuperviseIssueJournal', back_populates='issue')
#
#
#
class SuperviseIssueJournal(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'SuperviseIssueJournal'
    }

    jnl_date = Column(Integer)
    content = Column(Text)
    memo = Column(Text)
    issue_id = Column(String, ForeignKey('supervise_issue.id'))

    issue = relationship('SuperviseIssue', back_populates='journals')
#
#
class ProjectAccount(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'ProjectAccount'
    }

    acct_no = Column(String(64))
    acct_name = Column(String(64))
    acct_type = Column(Integer)
    branch = Column(String(64))
    open_date = Column(Integer)
    close_date = Column(Integer)
    is_primary = Column(Boolean)
    project_id = Column(String, ForeignKey('project.id'))



class ProductCategory(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'ProductCategory'
    }

    code = Column(String(20))
    name = Column(String(64))
    fullname = Column(String)
    brief = Column(Text)
    leaf = Column(Boolean, default=True)
    parent_id = Column(String, ForeignKey('product_category.id'))

    # children = relationship('ProductCategory',
    #                         backref=backref('parent', remote_side=[id]), cascade='all, delete, delete-orphan')
    parent = relationship('ProductCategory', remote_side=[id], backref=backref('children', cascade='all'), cascade='save-update')
    # as there is no ultimate root node in this model, you can not use a delete-orphan cascade option
    # delete-orphan means when no parent found for a record, it will be deleted

    def __setattr__(self, key, value):
        if key == 'parent':
            old = self.parent
            new = value
            if new == old:
                object.__setattr__(self, key, value)
                return
            if new == self or self._parent_of(new):
                # here we prefer to move the entire hierarchy chain nodes instead of single node
                # think about that do you want to just delete one single node or the node and all of its children
                raise Exception('one can not point parent to itself or child node, try to modified the record instead')

            if old is not None:
                old.children.remove(self)
                if len(old.children) == 0:
                    old.leaf = True

            if new is not None:
                new.leaf = False

            object.__setattr__(self, key, value)
            self._update_fullname()

            return

        if key == 'name':
            object.__setattr__(self, key, value)
            self._update_fullname()
            return

        object.__setattr__(self, key, value)

    def _update_fullname(self):
        if self.parent:
            self.fullname = self.parent.fullname + ':' + self.name
        else:
            self.fullname = self.name
        for c in self.children:
            c._update_fullname()

    def before_remove(self):
        p = self.parent
        if len(p.children) == 1:
            p.leaf = True

    def _parent_of(self, new_parent):
        if new_parent is None:
            return False
        ptr = new_parent
        while 1:
            parent = ptr.parent
            if parent:
                if parent == self:
                    return True
                else:
                    ptr = parent
            else:
                return False



class Organization(DistinctBase, BaseEntity):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'Organization'
    }

    code = Column(String(20))
    name = Column(String(64))
    brief = Column(Text)
    leaf = Column(Boolean, default=True)
    parent_id = Column(String, ForeignKey('organization.id'))

    parent = relationship('Organization', remote_side=[id], cascade='save-update', backref=backref('children', cascade='all'))

    def __setattr__(self, key, value):
        if key == 'parent':
            old = self.parent
            new = value
            if new == old:
                object.__setattr__(self, key, value)
                return
            if new == self or self._parent_of(new):
                raise Exception('one can not point parent to itself or child node, try to modified the record instead')

            if old is not None:
                children = old.children
                children.remove(self)
                if len(children) == 0:
                    old.leaf = True

            if new is not None:
                new.leaf = False

        object.__setattr__(self, key, value)

    def _parent_of(self, new_parent):
        if new_parent is None:
            return False
        ptr = new_parent
        while 1:
            parent = ptr.parent
            if parent:
                if parent == self:
                    return True
                else:
                    ptr = parent
            else:
                return False


class Duty(DistinctBase, BaseEntity):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'Duty'
    }

    code = Column(String(20))
    name = Column(String(64))
    brief = Column(Text)


class DutyGroup(DistinctBase, BaseEntity):
    id = Column(String, primary_key=True)
    version = Column(Integer, nullable=False)
    __mapper_args__ = {
        'version_id_col': version,
        'concrete': True,
        'polymorphic_identity': 'DutyGroup'
    }

    code = Column(String(20))
    name = Column(String(64))
    brief = Column(Text)

    members = relationship('DutyGroupItem')

    def __json__(self):
        ret = super(DutyGroup, self).__json__()
        ret['members'] = [e.__json__() for e in self.members]
        return ret


class DutyGroupItem(DistinctBase, PrimeBase):

    group_id = Column(String, ForeignKey('duty_group.id'), primary_key=True)
    duty_id = Column(String, ForeignKey('duty.id'), primary_key=True)

    sub_idx = Column(Integer)
    duty = relationship('Duty')

    __mapper_args__ = {
        'concrete': True,
        'polymorphic_identity': 'DutyGroupItem'
    }

    def __json__(self):
        ret = super(DutyGroupItem, self).__json__()
        ret['duty'] = self.duty.__json__()
        return ret


class Attachment(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    __mapper_args__ = {
        'concrete': True,
        'polymorphic_identity': 'Attachment'
    }
    fkid = Column(String(64))
    fpath = Column(String(255))
    fname = Column(String(255))
    mime = Column(String(32))
    upload_date = Column(Integer)


class ActivityLog:
    activity_type = None
    action_type = None
    subject = None
    detail = None
    target = None


class AppDict(DistinctBase, BusinessEntity):
    id = Column(String, primary_key=True)
    __mapper_args__ = {
        'concrete': True,
        'polymorphic_identity': 'AppDict'
    }
    nullable = Column(Boolean)
    dict_type = Column(String(1))
    items = relationship('AppDictItem')


class AppDictItem(DistinctBase, PrimeBase):
    id = Column(String, primary_key=True)
    __mapper_args__ = {
        'concrete': True,
        'polymorphic_identity': 'AppDictItem'
    }
    app_dict_fk = Column(String, ForeignKey('app_dict.id'))
    value = Column(String(64))
    text = Column(String(255))
    memo = Column(String(255))
