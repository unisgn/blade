# coding=utf-8
__author__ = 'yinlan'


from web import WSGI

import routes

app = WSGI()

if __name__ == '__main__':
    app.run('0.0.0.0')
else:
    applicaton = app.get_wsgi()
