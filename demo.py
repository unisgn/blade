# coding=utf-8
# Created by 0xFranCiS on May 13, 2016.

from models import *
from dbx import open_session, engine

import demjson

import functools

import tempfile

f = tempfile.TemporaryFile('w+b')
f.write(b'123456789')
f.write(b'123456789')

