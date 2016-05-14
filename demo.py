# coding=utf-8
# Created by 0xFranCiS on May 13, 2016.

from models import *
from dbx import open_session

import demjson

import functools

def encode_value(obj):
    try:
        return obj.__json__()
    except AttributeError:
        raise demjson.JSONEncodeError('can not encode object into a JSON representation', obj)

jsonify = functools.partial(demjson.encode, encode_default=encode_value)

class myperson:
    name = 'jane'

    def __json__(self):
        return {
            'name': self.name
        }

o = myperson()
d = {
    'name': 'jane'
}
print(jsonify(o))

