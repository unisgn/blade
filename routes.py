"""

"""

from web import ctx, route, restful, intercept
from security import secured
from dbx import open_session
from models import *
import demjson
from sqlalchemy import text

@route('/login/<name>')
@restful
def login(name):
    # ctx.response.header('Content-Type', 'text/plain;charset=utf-8')
    return 'Nice Try, %s' % name


@route('/logout')
@restful
def logout():
    pass



def parse_query(query):
    q = query
    req = ctx.request
    start = req['start']
    limit = req['limit']
    filters = req.input('filter')
    if filters:
        filters = demjson.decode(filters)
        for f in filters:
            prop = f['property']
            val = f['value']
            q = q.filter(text("{} like '%{}%'".format(prop, val)))
    q = q.offset(start)
    q = q.limit(limit)
    return q


@route('/api/User')
@restful
def get_users():

    with open_session() as session:
        q = session.query(User)
        q = parse_query(q)
        rs = q.all()
        return [e.__json__() for e in rs]




@route('/api/User', method='post')
@restful
# @secured('user_mgr')
def add_user():
    vo = ctx.request.json
    po = User(**vo)
    with open_session() as session:
        session.add(po)
        session.commit()
        return po.__json__() # must operated within a session


@route('/api/User/<id>')
# @secured('user_mgr')
@restful
def get_user(id):
    with open_session() as session:
        po = session.query(User).filter(User.id == id).one()
        if po:
            return po.__json__()


# @secured('user_mgr')
@route('/api/User/<id>', method='put')
@restful
def update_user(id):
    vo = ctx.request.json
    with open_session() as session:
        po = session.query(User).filter(User.id == id)
        po.update_vo(vo)
        session.add(po)
        session.commit()
        return po.__json__()

# @secured('user_mgr')
@route('/api/User/<id>', method='delete')
@restful
def remove_user(id):
    with open_session() as session:
        session.query(User).filter(User.id == id).delete(synchronize_session=False)


@route('/api/ProductCategory')
@restful
def get_product_category_list():
    pass


@route('/api/ProductCategory', method='post')
@restful
def add_product_category():
    with open_session() as session:
        vo = ctx.request.json
        po = ProductCategory()
        po.update_vo(vo)
        if po.parent_id:
            parent = session.query(ProductCategory).filter(ProductCategory.id == po.parent_id).one()
            po.parent = parent
        else:
            po.parent = None
        session.add(po)
        session.commit()
        return po.__json__()


@route('/api/ProductCategory/<id>')
@restful
def get_product_category(id):
    with open_session() as session:
        po = session.query(ProductCategory).filter(ProductCategory.id == id).one()
        if po:
            return po.__json__()


@route('/api/ProductCategory/<id>', method='put')
@restful
def update_product_category(id):
    with open_session() as session:
        vo = ctx.request.json
        po = session.query(ProductCategory).filter(ProductCategory.id == id).one()
        po.update_vo(vo)
        if vo['parent_id']:
            parent = session.query(ProductCategory).filter(ProductCategory.id == id).one()
            po.parent = parent
        else:
            po.parent = None
        session.add(po)
        session.commit()
        return po.__json__()


@route('/api/ProductCategory/<id>', method='delete')
@restful
def remove_product_category(id):
    pass




@route('/api/Project', method='post')
@restful
def add_project():
    with open_session() as s:
        vo = ctx.request.json
        po = Project()
        po.update_vo(vo)
        s.add(po)
        s.commit()
        return po.__json__()


@route('/api/Project/<id>')
@restful
def get_project(id):
    with open_session() as s:
        po = s.query(Project).filter(Project.id == id).one()
        if po:
            return po.__json__()


@route('/api/Project/<id>', method='put')
@restful
def update_project(id):
    with open_session() as s:
        vo = ctx.request.json
        po = s.query(Project).filter(Project.id == id).one()
        if po:
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()


@route('/api/Project/<id>/accounts')
@restful
def get_project_accounts(id):
    with open_session() as s:
        rs = s.query(ProjectAccount).filter(ProjectAccount.project_id == id).all()
        return [e.__json__() for e in rs]


@route('/api/Project/<id>/accounts', method='post')
@restful
def add_project_account(id):
    with open_session() as s:
        vo = ctx.request.json
        po = ProjectAccount()
        po.update_vo(vo)
        po.project_id = id
        s.add(po)
        s.commit()
        return po.__json__()


@route('/api/Project/<id>/accounts/<sid>', method='put')
@restful
def update_project_account(id, sid):
    with open_session() as s:
        vo = ctx.request.json
        po = s.query(ProjectAccount).filter(ProjectAccount.id == sid).filter(ProjectAccount.project_id == id).one()
        if po:
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()


@route('/api/Project/<id>/accounts/<sid>', method='delete')
@restful
def remove_project_account(id, sid):
    with open_session() as s:
        po = s.query(ProjectAccount).filter(ProjectAccount.id == sid).filter(ProjectAccount.project_id == id).one()
        if po:
            s.delete(po)


@route('/api/Project/<id>/supervise_issues')
@restful
def get_project_supervise_issues(id):
    with open_session() as s:
        rs = s.query(SuperviseIssue).filter(SuperviseIssue.project_id == id).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/basic')
@restful
def get_project_basic():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/essential')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/online')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/operators')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/operation')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/accounts')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/supervise')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/archive')
@restful
def get_project_essential():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]




@route('/api/tree/ProductCategory')
@restful
def get_product_category_node():
    node = ctx.request.input('node')
    if not node:
        node = 'root'
    with open_session() as session:
        q = session.query(ProductCategory)
        # if node == 'root':
        #     q = q.filter(ProductCategory.parent_id.is_(None))
        # else:
        #     q = q.filter(ProductCategory.parent_id == node)
        return [o.__json__() for o in q.all()]



@route('/api/dict/ProductCategory')
@restful
def get_product_category_dict():
    with open_session() as session:
        rs = session.query(ProductCategory.id, ProductCategory.name).filter(ProductCategory.parent_id.is_(None)).all()
        return rs


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
