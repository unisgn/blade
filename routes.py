"""

"""
import mimetypes

from web import ctx, route, restful, intercept, MultipartFile, static_file_generator
from security import secured
from dbx import open_session, open_conn
from models import *
import demjson
from sqlalchemy import text
from sqlalchemy.sql import select, and_, or_, not_, label
import uuid
import os
import time

from urllib import parse

@route('/login/<name>')
@restful
def login(name):
    # ctx.response.header('Content-Type', 'text/plain;charset=utf-8')
    return 'Nice Try, %s' % name


@route('/logout')
@restful
def logout():
    pass


def parse_criteria(query):
    q = query
    req = ctx.request
    start = req.args['start']
    limit = req.args['limit']
    filters = req.args.get('filter', None)
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
        q = session.query(User).order_by(User.username.asc())
        rs = q.all()
        return [e.__json__() for e in rs]




@route('/api/User', method='post')
@restful
# @secured('user_mgr')
def add_user():
    vo = ctx.request.json
    po = User(**vo)
    po.last_modified_date = int(time.time())
    with open_session() as session:
        session.add(po)
        session.commit()
        return po.__json__() # must operated within a session


@route('/api/User/<id>')
# @secured('user_mgr')
@restful
def get_user(id):
    with open_session() as session:
        po = session.query(User).filter(User.id == id).one_or_none()
        if po:
            return po.__json__()


# @secured('user_mgr')
@route('/api/User/<id>', method='put')
@restful
def update_user(id):
    vo = ctx.request.json
    with open_session() as session:
        po = session.query(User).filter(User.username == id).one()
        if po:
            po.update_vo(vo)
            po.last_modified_date = int(time.time())
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
            parent = session.query(ProductCategory).filter(ProductCategory.id == po.parent_id).one_or_none()
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
        po = session.query(ProductCategory).filter(ProductCategory.id == id).one_or_none()
        if po:
            return po.__json__()


@route('/api/ProductCategory/<id>', method='put')
@restful
def update_product_category(id):
    with open_session() as session:
        vo = ctx.request.json
        po = session.query(ProductCategory).filter(ProductCategory.id == id).one_or_none()
        if po:
            po.update_vo(vo)
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
        po = s.query(Project).filter(Project.id == id).one_or_none()
        if po:
            return po.__json__()


@route('/api/Project/<id>', method='put')
@restful
def update_project(id):
    with open_session() as s:
        vo = ctx.request.json
        po = s.query(Project).filter(Project.id == id).one_or_none()
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
        po = s.query(ProjectAccount).filter(ProjectAccount.id == sid).filter(ProjectAccount.project_id == id).one_or_none()
        if po:
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()


@route('/api/Project/<id>/accounts/<sid>', method='delete')
@restful
def remove_project_account(id, sid):
    with open_session() as s:
        po = s.query(ProjectAccount).filter(ProjectAccount.id == sid).filter(ProjectAccount.project_id == id).one_or_none()
        if po:
            s.delete(po)


@route('/api/Project/<id>/supervise_issues')
@restful
def get_project_supervise_issues(id):
    with open_session() as s:
        rs = s.query(SuperviseIssue).filter(SuperviseIssue.project_id == id).all()
        return [e.__json__() for e in rs]


@route('/api/Project/<id>/supervise_issues', method='post')
@restful
def add_project_supervise_issue(id):
    with open_session() as s:
        po = SuperviseIssue()
        vo = ctx.request.json
        po.update_vo(vo)
        po.project_id = id
        s.add(po)
        s.commit()
        return po.__json__()


@route('/api/Project/<id>/supervise_issues/<sid>', method='put')
@restful
def update_project_supervise_issue(id, sid):
    with open_session() as s:
        po = s.query(SuperviseIssue).filter(SuperviseIssue.id == sid).filter(SuperviseIssue.project_id == id ).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()



@route('/api/ProjectSuperviseIssue/<id>/journals')
@restful
def get_project_supervise_issue_journal(id):
    with open_session() as s:
        rs = s.query(SuperviseIssueJournal).filter(SuperviseIssueJournal.issue_id == id).order_by(SuperviseIssueJournal.jnl_date.desc()).all()
        return [e.__json__() for e in rs]


@route('/api/ProjectSuperviseIssue/<id>/journals', method='post')
@restful
def add_project_supervise_issue_journal(id):
    with open_session() as s:
        po = SuperviseIssueJournal()
        vo = ctx.request.json
        po.update_vo(vo)
        po.issue_id = id
        s.add(po)
        s.commit()
        return po.__json__()


@route('/api/ProjectSuperviseIssue/<id>/journals/<sid>', method='put')
@restful
def update_project_supervise_issue_journal(id, sid):
    with open_session() as s:
        po = s.query(SuperviseIssueJournal).filter(SuperviseIssueJournal.id == sid).filter(SuperviseIssueJournal.issue_id == id ).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()


@route('/api/Project/<id>/transdoc')
@restful
def get_project_archive_item_list(id):
    with open_session() as s:
        rs = s.query(ProjectTransDoc).filter(ProjectTransDoc.project_id == id).all()
        return [e.__json__() for e in rs]


@route('/api/Project/<id>/transdoc', method='post')
@restful
def add_project_archive_item(id):
    with open_session() as s:
        po = ProjectTransDoc()
        vo = ctx.request.json
        po.update_vo(vo)
        po.project_id = id
        s.add(po)
        s.commit()
        return po.__json__()

@route('/api/Project/<id>/transdoc/<sid>', method='put')
@restful
def update_project_archive_item(id, sid):
    with open_session() as s:
        po = s.query(ProjectTransDoc).filter(ProjectTransDoc.id == sid, ProjectTransDoc.project_id == id).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()




@route('/api/Duty')
@restful
def get_duty_list():
    with open_session() as s:
        rs = s.query(Duty).all()
        return [e.__json__() for e in rs]


@route('/api/Duty', method='post')
@restful
def add_duty():
    with open_session() as s:
        vo = ctx.request.json
        po = Duty(**vo)
        s.add(po)
        s.commit()
        return po.__json__()


@route('/api/Duty/<id>')
@restful
def get_duty(id):
    with open_session() as s:
        po = s.query(Duty).filter(Duty.id == id).one_or_none()
        if po:
            return po.__json__()



@route('/api/Duty/<id>', method='put')
@restful
def update_duty(id):
    with open_session() as s:
        vo = ctx.request.json
        po = s.query(Duty).filter(Duty.id == id).one_or_none()
        if po:
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()


@route('/api/DutyGroup')
@restful
def get_duty_group_list():
    with open_session() as s:
        rs = s.query(DutyGroup).all()
        return [e.__json__() for e in rs]


@route('/api/DutyGroup/<id>')
@restful
def get_duty_group(id):
    with open_session() as s:
        po = s.query(DutyGroup).filter(DutyGroup.id == id).one_or_none()
        if po:
            return po.__json__()


@route('/api/DutyGroup', method='post')
@restful
def add_duty_group():
    with open_session() as s:
        vo = ctx.request.json
        po = DutyGroup()
        po.update_vo(vo)

        members = vo['member_csv'].split(',')
        for id in members:
            duty = s.query(Duty).filter(Duty.id == id).one_or_none()
            if duty:
                item = DutyGroupItem()
                item.duty = duty
                po.members.append(item)
        s.add(po)
        s.commit()
        return po.__json__()


@route('/api/DutyGroup/<id>', method='put')
@restful
def update_duty_group(id):
    with open_session() as s:
        po = s.query(DutyGroup).filter(DutyGroup.id == id).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(vo)
            s.add(po)
            s.commit()
            return po.__json__()




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
def get_project_online():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/operators')
@restful
def get_project_operators():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/operation')
@restful
def get_project_operation():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/accounts')
@restful
def get_project_accounts():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/supervise')
@restful
def get_project_supervise():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]


@route('/api/data/project/supervise/journal')
@restful
def get_project_supervise_journal_list():
    with open_session() as s:
        rs = s.query(SuperviseIssue, Project).join(Project).filter(SuperviseIssue.artificial == True).all()
        ret = []
        for i, p in rs:
            r = i.__json__()
            r['project'] = p.__json__()
            ret.append(r)
        return ret


@route('/api/data/project/archive')
@restful
def get_project_archive():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e.__json__() for e in rs]




@route('/api/tree/ProductCategory')
@restful
def get_product_category_node():
    with open_session() as session:
        q = session.query(ProductCategory)
        return [o.__json__() for o in q.all()]



@route('/api/dict/ProductCategory')
@restful
def get_product_category_dict():
    with open_session() as session:
        rs = session.query(ProductCategory.id, ProductCategory.name).filter(ProductCategory.parent_id.is_(None)).all()
        return rs



@route('/api/Attachment/')
@restful
def get_attachments():
    fkid = ctx.request.args['fkid']
    if fkid:
        with open_session() as s:
            rs = s.query(Attachment.id, Attachment.fname, Attachment.fkid, Attachment.upload_date)\
                .filter(Attachment.fkid == fkid)\
                .order_by(Attachment.upload_date.desc()).all()
            return rs


@route('/api/Attachment/remove', method='post')
@restful
def remove_attachment():
    fid = ctx.request.json['id']
    if fid:
        with open_session() as s:
            po = s.query(Attachment).filter(Attachment.id == fid).one_or_none()
            if po:
                fpath = po.fpath
                os.remove(fpath)
                s.delete(po)



@route('/download')
def download():
    fid = ctx.request.args['fid']
    if fid:
        with open_session() as s:
            atta = s.query(Attachment).filter(Attachment.id == fid).one_or_none()
            if atta:
                path = atta.fpath
                fname = atta.fname
                ctx.response.content_type = 'application/octet-stream'
                ctx.response.header('Content-Disposition', 'attachment;filename=%s' % parse.quote(fname))
                return static_file_generator(path)


@route('/upload', method='POST')
def upload():
    ret = {
        'success': True,
        'msg': 'ok'
    }
    req = ctx.request
    fkid = req.args['fkid']
    if fkid:
        for name, fs in req.files.items():
            fname = fs.filename
            fid = str(uuid.uuid1())
            dest_path = '/home/yinlan/uploads/%s' % fid
            try:
                fs.save(dest_path)
                req.close()
                with open_session() as s:
                    po = Attachment()
                    po.id = fid
                    po.fkid = fkid
                    po.fname = fname
                    po.fpath = dest_path
                    po.upload_date = int(time.time())
                    s.add(po)
                    s.commit()
                    ret['data'] = {
                        'id': fid,
                        'fkid': fkid,
                        'fname': fname,
                        'upload_date': po.upload_date
                    }
            except Exception as e:
                msg = str(e)
                if os.path.exists(dest_path):
                    os.remove(dest_path)
                ret['success'] = False
                ret['msg'] = msg
                print(msg)

    else:
        ret['success'] = False
        ret['msg'] = 'no fkid found'
    return demjson.encode(ret)


@route('/api/data/pull_app_dict')
@restful
def pull_app_dict():
    rv = {}

    def update_dict(dictname, resultset):
        rv[dictname] = {
            'values': [{'value': e[0], 'text': e[1]} for e in resultset]
        }
    with open_session() as s:
        rs = s.query(Duty.id, Duty.name).all()
        update_dict('duty', rs)
        rs = s.query(ProductCategory.id, ProductCategory.name).filter(ProductCategory.parent_id.is_(None)).all()
        update_dict('root_product_category', rs)
    return rv

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
