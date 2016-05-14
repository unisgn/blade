# coding=utf-8
# Created by 0xFranCiS on May 10, 2016.


import DictObject


class Entity:
    __table_name__ = None
    __id__prop__ = None
    __version_prop__ = None
    __engine__ = None

    def __init__(self):
        pass

    def save(self):
        pass

    @staticmethod
    def load(id):
        pass

    @staticmethod
    def remove(id):
        pass

    @staticmethod
    def load_all():
        pass

    @staticmethod
    def query(spec):
        pass

    @staticmethod
    def from_vo(vo):
        pass

    @staticmethod
    def save_vo(vo):
        pass


class Field:
    _type = None
    _readonly = False
    # a convert function when read from database
    _convert = None
    _nullable = False
    _validator = None
    _reference = None

    def __init__(self, *args, **kwargs):
        pass


class TextField(Field):
    type = 'text'


class BoolField(Field):
    type = 'bool'


class IntField(Field):
    type = 'int'


class NumField(Field):
    type = 'num'


class DateField(Field):
    type = 'date'


class RefField:
    pass


class Transient(Field):
    pass



class Table:
    pass


class Session:
    pass


class Transaction:
    pass


class Connection:
    pass


def transactional():
    pass

