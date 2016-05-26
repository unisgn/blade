# coding=utf-8
# Created by 0xFranCiS on May 13, 2016.

from models import *
from dbx import open_session, engine

import demjson

import functools

import tempfile

import datetime
import dateutil
import time

import calendar


def finder(start, end):
    d30 = [4, 6, 9, 11]
    d31 = [1, 3, 5, 7, 8, 10, 12]
    found = 0
    for y in range(start, end + 1):
        for m in d30:
            dt = datetime.datetime(y, m, 1)
            week = dt.weekday()
            if week == 5:
                found += 1
                print(y, m)
        for m in d31:
            dt = datetime.datetime(y, m, 1)
            week = dt.weekday()
            if week == 5 or week == 4:
                found += 1
                print(y, m)
    print('total %s found between %s-01 and %s-12, at rate %f%%' % (found, start, end, found*100/((end-start+1)*12)))

finder(2000, 2016)
