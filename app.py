# coding=utf-8

__author__ = 'yinlan'


from web import WSGI, intercept

import routes


from dbx import engine, session_in_view
from models import Base
from security import secured_session
Base.metadata.create_all(engine)

intercept(session_in_view, '/api')


wsgi = WSGI(debug=True)

app = None







if __name__ == '__main__':
    wsgi.run('0.0.0.0')
else:
    app = wsgi.get_wsgi()
