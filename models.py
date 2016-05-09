# coding=utf-8


from orm.orm import Entity
from orm.field import TextField, IntField, BoolField, RefField


class BaseEntity(Entity):
    id = IntField()
    version = IntField()
    archived = BoolField(val=False)
    active = BoolField(val=True)


class BusinessEntity(BaseEntity):
    number = TextField()
    code = TextField()
    name = TextField()
    brief = TextField()
    search_field = TextField()


class User(BaseEntity):
    username = TextField()
    password = TextField()


class Organization(BusinessEntity):
    parent = IntField()
