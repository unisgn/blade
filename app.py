# coding=utf-8
__author__ = 'yinlan'


from web import WSGI

import routes

wsgi = WSGI()

if __name__ == '__main__':
    wsgi.run('0.0.0.0')
else:
    app = wsgi.get_wsgi()
