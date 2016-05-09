# coding=utf-8
# Created by 0xFranCiS on May 08, 2016.
__author__ = '0xFranCiS'



class Field:
    type = None
    readonly = False
    # a convert function when read from database
    convert = None
    nullable = False
    validator = None
    reference = None

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
