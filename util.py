# coding=utf-8
# Created by 0xFranCiS on May 08, 2016.
__author__ = '0xFranCiS'

import demjson

import functools


def encode_value(obj):
    try:
        return obj.__json__()
    except AttributeError:
        raise demjson.JSONEncodeError('can not encode object into a JSON representation', obj)


jsonify = functools.partial(demjson.encode, encode_default=encode_value)
