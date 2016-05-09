"""

"""

from web import ctx, route, restful, intercept
from security import secured

from models import *

@route('/login/<name>')
@restful
def login(name):
    # ctx.response.header('Content-Type', 'text/plain;charset=utf-8')
    return 'Nice Try, %s' % name


@route('/logout')
@restful
def logout():
    pass


@route('/user')
@restful
def get_users():
    return User.load_all()



@restful
@route('/user', method='post')
# @secured('user_mgr')
def add_user():
    User.from_vo(ctx.request.json).save()


@route('/user/<id>')
# @secured('user_mgr')
@restful
def get_user(id):
    return User.load(id)


@secured('user_mgr')
@route('/user/<id>', method='put')
def update_user(id):
    User.from_vo(ctx.request.json).save()


@secured('user_mgr')
@route('/user/<id>', method='delete')
def remove_user(id):
    User.remove(id)



@route('/download/<path_id>')
def download(path_id):
    pass


@route('/upload', method='POST')
def upload():
    pass


# @intercept('/')
# def all_intercept(next_fn):
#     print('before all intercept')
#     try:
#         return next_fn()
#     finally:
#         print('after all intercept')


# @intercept('/admin')
# def check_admin(next_fn):
#     print('before admin interceptor')
#     try:
#         return next_fn()
#     finally:
#         print('after admin interceptor')


@route('/admin')
def admin():
    print('hello, admin')
    return 'hallo'
