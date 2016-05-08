# coding=utf-8
__author__ = 'yinlan'

import requests
from pyquery import PyQuery as pq
import re
import threading
import time
import os
from queue import Queue

IP_STAT_URL = 'http://ip.cn/index.php'
_RE_CODE = re.compile('<code>(.*)</code>')


wq = Queue(300)


class printer:
    def run(self):
        print('working')


l = [printer() for x in range(5)]


def do_run(el):
    return el + 5

l = map(lambda x: x.run(), l)
print(list(l))



