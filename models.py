# coding=utf-8


from sqlalchemy.ext.declarative import declarative_base, AbstractConcreteBase, as_declarative, declared_attr

from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey, Numeric, DateTime, Date
from sqlalchemy.orm import relationship, composite
from enum import Enum



def default_naming_strategy(name):
    import re
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

@as_declarative()
class Base:
    @declared_attr
    def __tablename__(cls):
        return default_naming_strategy(cls.__name__)

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


# Base = declarative_base(cls=Base)


class DistinctBase(AbstractConcreteBase, Base):
    pass


class BaseEntity:
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


class BusinessEntity:
    number = Column(String)
    code = Column(String)
    name = Column(String)
    alias = Column(String)
    brief = Column(String)
    search_field = Column(String)


class User(DistinctBase, BaseEntity):
    __tablename__ = 't_user'

    username = Column(String, nullable=False)
    password = Column(String)
    alias = Column(String)

    id = Column(String, primary_key=True)
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


    proj_type = Column(Integer)

    category_id = Column(String, ForeignKey('product_category.id'))
    category = relationship('ProductCategory')

    contract_no = Column(String(32))
    contract_status = Column(Integer)

    proj_mgr = Column(String(32))
    cust_mgr = Column(String(32))

    fee_rate = Column(Numeric)
    estimate_scale = Column(Numeric)
    period = Column(Integer)
    estimate_setup_date = Column(Integer)

    setup_date = Column(Integer)

    create_date = Column(Integer)


    agents = relationship('ProjectAgent')
    pre_accounts = relationship('ProjectPreAccount')

    proj_status = Column(Integer)



    intro_org_id = Column(String, ForeignKey('organization.id'))
    op_org_id = Column(String, ForeignKey('organization.id'))
    spv_org_id = Column(String, ForeignKey('organization.id'))



    online_date = Column(Integer)
    online_scale = Column(Numeric)
    online_memo = Column(Text)
    online_status = Column(Integer)

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
    trans_status = Column(Integer)

    trans_docs = relationship('ProjectTransDoc')



#
# class ProjectBasicInfo:
#     def __init__(self, *args, **kwargs):
#         for k, v in kwargs.items():
#             setattr(self, k, v)
#
#

class ProjectTransDoc(DistinctBase):
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
class ProjectAgent(DistinctBase):
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
class ProjectPreAccount(DistinctBase):
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
class SuperviseIssue(DistinctBase):
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
class SuperviseIssueJournal(DistinctBase):
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
class ProjectAccount(DistinctBase):
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



class ProductCategory(DistinctBase):
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

    parent = relationship('ProductCategory', remote_side=[id])

    def __setattr__(self, key, value):
        if key == 'parent':
            if value:
                value.leaf = False
                self.fullname = value.fullname + ':' + self.name
            else:
                self.fullname = self.name
        object.__setattr__(self, key, value)

#
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
    parent = relationship('Organization', remote_side=[id])


    def __setattr__(self, key, value):
        if key == 'parent':
            if value:
                value.leaf = False
        object.__setattr__(self, key, value)
