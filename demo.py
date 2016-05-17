# coding=utf-8
# Created by 0xFranCiS on May 13, 2016.

from models import *
from dbx import open_session, engine

import demjson

import functools


Base.metadata.create_all(engine)


with open_session() as s:
    rs = s.query(DutyGroup).all()
    e = rs[0]
    print(dir(e))