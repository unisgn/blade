# coding=utf-8

__author__ = 'yinlan'


from web import WSGI

import routes


from dbx import engine
from models import Base
Base.metadata.create_all(engine)

wsgi = WSGI()

app = None

if __name__ == '__main__':
    wsgi.run('0.0.0.0')
else:
    app = wsgi.get_wsgi()
