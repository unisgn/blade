"""

"""
import mimetypes

from web import ctx, route, restful, intercept, MultipartFile, static_file_generator
from security import secured, authenticate
from dbx import open_session, open_conn, redis, Session
from models import *
import demjson

from sqlalchemy import text, select, func
from sqlalchemy.sql import select, and_, or_, not_, label, func as sqlfn
from sqlalchemy.orm import load_only
from sqlalchemy.util import Properties
import hashlib
import uuid
import os
import time

import util

from urllib import parse


def audit(entity):
    return
    if isinstance(entity, AuditIface):
        user = ctx.session.get('user')
        username = user['username'] if user else None
        now = int(time.time()*1000)
        entity.modified_by = username
        entity.modified_at = now
        if not entity.created_at:
            entity.created_at = entity.modified_at
        if not entity.created_by:
            entity.created_by = entity.modified_by


@route('/login', method='post')
@restful
@authenticate
def login():
    user = ctx.session['user']
    return user


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
@secured('user_read')
def get_users():
    return Session.query(User).order_by(User.id.asc()).all()


@route('/api/User', method='post')
@restful
# @secured('user_write')
def add_user():
    vo = ctx.request.json  # type: dict

    return User().update_vo(**vo).set_passwd().save()


@route('/api/User/<pk>')
# @secured('user_mgr')
@restful
def get_user(pk):
    return User.load(pk)


# @secured('user_mgr')
@route('/api/User/<pk>', method='put')
@restful
def update_user(pk):
    return User.load(pk).update_vo(**ctx.request.json).save()


# @secured('user_mgr')
@route('/api/User/<pk>', method='delete')
@restful
def remove_user(pk):
    User.remove(pk)


@route('/api/User/<pk>/role')
@restful
def get_user_role_list(pk):
    hdr = aliased(UserRoleHeader)
    rv = Session.query(*inspect(Role).c, case([(hdr.role_fk.is_(None), False)], else_=True).label('checked')) \
        .outerjoin(hdr, (hdr.role_fk == Role.id) & (hdr.user_fk == pk)).all()
    return rv


@route('/api/User/<pk>/permission')
@restful
def get_user_permission_list(pk):
    start = Session.query(Permission) \
        .join(RolePermissionHeader, Permission.id == RolePermissionHeader.permission_fk)\
        .join(UserRoleHeader, RolePermissionHeader.role_fk == UserRoleHeader.role_fk) \
        .filter(UserRoleHeader.user_fk == pk) \
        .group_by(Permission.id).cte(recursive=True)
    nested = start.union(Session.query(Permission)
                         .filter(Permission.id == start.c.parent_fk))
    return Session.query(*nested.c, label('expanded', text('True'))).all()


@route('/api/User/<pk>/role/<spk>', method='put')
@restful
def update_user_role(pk, spk):
    vo = ctx.request.json
    checked = vo['checked']
    if checked:
        User.add_role(pk, spk)
    else:
        User.remove_role(pk, spk)
    return vo


@route('/api/ProductCategory')
@restful
def get_product_category_list():
    pass


@route('/api/ProductCategory', method='post')
@restful
def add_product_category():
    return ProductCategory().update_vo(**ctx.request.json).save()


@route('/api/ProductCategory/<pk>')
@restful
def get_product_category(pk):
    return ProductCategory.load(pk)


@route('/api/ProductCategory/<pk>', method='put')
@restful
def update_product_category(pk):
    return ProductCategory.load(pk).update_vo(**ctx.request.json).save()


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
        po.update_vo(**vo)
        po.number = util.next_project_no()
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/Project/<id>')
@restful
def get_project(id):
    with open_session() as s:
        po = s.query(Project).filter(Project.id == id).one_or_none()
        if po:
            return po._asdict()


@route('/api/Project/<id>', method='put')
@restful
def update_project(id):
    with open_session() as s:
        vo = ctx.request.json
        po = s.query(Project).filter(Project.id == id).one_or_none()
        if po:
            po.update_vo(**vo)
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/Project/<id>/accounts')
@restful
def get_project_accounts(id):
    with open_session() as s:
        rs = s.query(ProjectAccount).filter(ProjectAccount.project_id == id).all()
        return [e._asdict() for e in rs]


@route('/api/Project/<id>/accounts', method='post')
@restful
def add_project_account(id):
    with open_session() as s:
        vo = ctx.request.json
        po = ProjectAccount()
        po.update_vo(**vo)
        po.project_id = id
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/Project/<id>/accounts/<sid>', method='put')
@restful
def update_project_account(id, sid):
    with open_session() as s:
        vo = ctx.request.json
        po = s.query(ProjectAccount).filter(ProjectAccount.id == sid).filter(
            ProjectAccount.project_id == id).one_or_none()
        if po:
            po.update_vo(**vo)
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/Project/<id>/accounts/<sid>', method='delete')
@restful
def remove_project_account(id, sid):
    with open_session() as s:
        po = s.query(ProjectAccount).filter(ProjectAccount.id == sid).filter(
            ProjectAccount.project_id == id).one_or_none()
        if po:
            s.delete(po)


@route('/api/Project/<id>/supervise_issues')
@restful
def get_project_supervise_issues(id):
    with open_session() as s:
        rs = s.query(SuperviseIssue).filter(SuperviseIssue.project_id == id).all()
        return [e._asdict() for e in rs]


@route('/api/Project/<id>/supervise_issues', method='post')
@restful
def add_project_supervise_issue(id):
    with open_session() as s:
        po = SuperviseIssue()
        vo = ctx.request.json
        po.update_vo(**vo)
        po.project_id = id
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/Project/<id>/supervise_issues/<sid>', method='put')
@restful
def update_project_supervise_issue(id, sid):
    with open_session() as s:
        po = s.query(SuperviseIssue).filter(SuperviseIssue.id == sid).filter(
            SuperviseIssue.project_id == id).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(**vo)
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/ProjectEssential')
@restful
def get_project_essential_list():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/ProjectEssential/<id>')
@restful
def get_project_essential(id):
    with open_session() as s:
        po = s.query(Project).filter(Project.id == id).one()
        if po:
            return po._asdict()


@route('/api/ProjectEssential/<id>', method='put')
@restful
def update_project_essential(id):
    with open_session() as s:
        po = s.query(Project).filter(Project.id == id).one()
        if po:
            contract_no = po.contract_no
            po.update_vo(**ctx.request.json)
            if not contract_no:
                po.contract_no = util.next_project_contract_no()
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/ProjectSuperviseIssue/<id>/journals')
@restful
def get_project_supervise_issue_journal(id):
    with open_session() as s:
        rs = s.query(SuperviseIssueJournal).filter(SuperviseIssueJournal.issue_id == id).order_by(
            SuperviseIssueJournal.jnl_date.desc()).all()
        return [e._asdict() for e in rs]


@route('/api/ProjectSuperviseIssue/<id>/journals', method='post')
@restful
def add_project_supervise_issue_journal(id):
    with open_session() as s:
        po = SuperviseIssueJournal()
        vo = ctx.request.json
        po.update_vo(**vo)
        po.issue_id = id
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/ProjectSuperviseIssue/<id>/journals/<sid>', method='put')
@restful
def update_project_supervise_issue_journal(id, sid):
    with open_session() as s:
        po = s.query(SuperviseIssueJournal).filter(SuperviseIssueJournal.id == sid).filter(
            SuperviseIssueJournal.issue_id == id).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(**vo)
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/Project/<id>/transdoc')
@restful
def get_project_archive_item_list(id):
    with open_session() as s:
        rs = s.query(ProjectTransDoc).filter(ProjectTransDoc.project_id == id).all()
        return [e._asdict() for e in rs]


@route('/api/Project/<id>/transdoc', method='post')
@restful
def add_project_archive_item(id):
    with open_session() as s:
        po = ProjectTransDoc()
        vo = ctx.request.json
        po.update_vo(**vo)
        po.project_id = id
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/Project/<id>/transdoc/<sid>', method='put')
@restful
def update_project_archive_item(id, sid):
    with open_session() as s:
        po = s.query(ProjectTransDoc).filter(ProjectTransDoc.id == sid, ProjectTransDoc.project_id == id).one_or_none()
        if po:
            vo = ctx.request.json
            po.update_vo(**vo)
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/Duty')
@restful
def get_duty_list():
    with open_session() as s:
        rs = s.query(Duty).all()
        return [e._asdict() for e in rs]


@route('/api/Duty', method='post')
@restful
def add_duty():
    return Duty().update_vo(**ctx.request.json).save()


@route('/api/Duty/<pk>')
@restful
def get_duty(pk):
    return Duty.load(pk)


@route('/api/Duty/<pk>', method='put')
@restful
def update_duty(pk):
    return Duty.load(pk).update_vo(**ctx.request.json).save()


@route('/api/DutyChain')
@restful
def get_duty_chain_list():
    return Session.query(DutyChain).all()


@route('/api/DutyChain/<pk>')
@restful
def get_duty_chain(pk):
    return DutyChain.load(pk)


@route('/api/DutyChain', method='post')
@restful
def add_duty_chain():
    return DutyChain().update_vo(**ctx.request.json).save()


@route('/api/DutyChain/<pk>', method='put')
@restful
def update_duty_chain(pk):
    return DutyChain.load(pk).update_vo(**ctx.request.json).save()


@route('/api/Organization', method='post')
@restful
def add_organization():
    vo = ctx.request.json
    return Organization().update_vo(**vo).save()


@route('/api/Organization/<pk>', method='put')
@restful
def update_organization(pk):
    return Organization.load(pk).update_vo(**ctx.request.json).save()


@route('/api/Organization/<pk>')
@restful
def get_organization(pk):
    return Organization.load(pk)


@route('/api/ProjectPreAccount')
@restful
def get_project_pre_account_list():
    parent_id = ctx.request.args['project_id']
    with open_session() as s:
        rs = s.query(ProjectPreAccount).filter(ProjectPreAccount.project_id == parent_id).all()
        return [e._asdict() for e in rs]


@route('/api/ProjectPreAccount', method='post')
@restful
def add_project_pre_account():
    vo = ctx.request.json
    with open_session() as s:
        po = ProjectPreAccount()
        po.update_vo(**ctx.request.json)
        po.project_id = ctx.request.args['project_id']
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/ProjectPreAccount/<id>', method='put')
@restful
def update_project_pre_account(id):
    with open_session() as s:
        po = s.query(ProjectPreAccount).filter(ProjectPreAccount.id == id).one()
        if po:
            po.update_vo(**ctx.request.json)
            po.project_id = ctx.request.args['project_id']
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/ProjectPreAccount/<id>/set_primary', method='put')
@restful
def set_main_project_pre_account(id):
    project_id = ctx.request.form['project_id']
    with open_session() as s:
        tbl = ProjectPreAccount.__table__
        stmt = tbl.update().where(tbl.c.project_id == project_id).values(is_primary=False)
        s.execute(stmt)
        stmt = tbl.update().where(tbl.c.id == id).values(is_primary=True)
        s.execute(stmt)


@route('/api/ProjectPreAccount/<id>', method='delete')
@restful
def remove_project_pre_account(id):
    with open_session() as s:
        po = s.query(ProjectPreAccount).filter(ProjectPreAccount.id == id).one()
        if po:
            s.delete(po)


@route('/api/ProjectAgent')
@restful
def get_project_agent_list():
    project_id = ctx.request.args['project_id']
    with open_session() as s:
        rs = s.query(ProjectAgent).filter(ProjectAgent.project_id == project_id).all()
        return [e._asdict() for e in rs]


@route('/api/ProjectAgent', method='post')
@restful
def add_project_agent():
    with open_session() as s:
        po = ProjectAgent()
        po.update_vo(**ctx.request.json)
        po.project_id = ctx.request.args['project_id']
        s.add(po)
        s.commit()
        return po._asdict()


@route('/api/ProjectAgent/<id>', method='put')
@restful
def update_project_agent(id):
    vo = ctx.request.json
    with open_session() as s:
        po = s.query(ProjectAgent).filter(ProjectAgent.id == id).one()
        if po:
            po.update_vo(**vo)
            po.project_id = ctx.request.args['project_id']
            s.add(po)
            s.commit()
            return po._asdict()


@route('/api/ProjectAgent/<id>', method='delete')
@restful
def remove_project_agent(id):
    with open_session() as s:
        po = s.query(ProjectAgent).filter(ProjectAgent.id == id).one()
        if po:
            s.delete(po)


@route('/api/data/project/basic')
@restful
def get_project_basic():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/essential')
@restful
def get_project_essential_data():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/online')
@restful
def get_project_online():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/operators')
@restful
def get_project_operators():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/operation')
@restful
def get_project_operation():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/accounts')
@restful
def get_project_accounts():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/supervise')
@restful
def get_project_supervise():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/data/project/supervise/journal')
@restful
def get_project_supervise_journal_list():
    with open_session() as s:
        rs = s.query(SuperviseIssue, Project).join(Project).filter(SuperviseIssue.artificial == True).all()
        ret = []
        for i, p in rs:
            r = i._asdict()
            r['project'] = p._asdict()
            ret.append(r)
        return ret


@route('/api/data/project/archive')
@restful
def get_project_archive():
    with open_session() as s:
        rs = s.query(Project).all()
        return [e._asdict() for e in rs]


@route('/api/tree/ProductCategory')
@restful
def get_product_category_tree():
    return Session.query(ProductCategory).all()


@route('/api/tree/Organization')
@restful
def get_organization_tree():
    return Session.query(Organization).all()

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
        return Attachment.load_by_fkid(fkid)


@route('/api/Attachment/<pk>', method='delete')
@restful
def remove_attachment(pk):
    po = Attachment.load(pk)
    if po:
        fpath = po.fpath
        os.remove(fpath)
        po.erase()


@route('/download')
def download():
    fid = ctx.request.args['fid']
    if fid:
        atta = Attachment.load(fid)
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
                po = Attachment(id=fid, fkid=fkid, fname=fname, fpath=dest_path)
                po.save()
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
    s = Session
    rs = s.query(Duty.id, Duty.name).all()
    update_dict('duty', rs)
    rs = s.query(ProductCategory.id, ProductCategory.name).order_by(ProductCategory.name.asc()).filter(ProductCategory.parent_fk.is_(None)).all()
    update_dict('root_product_category', rs)
    rs = s.query(Organization.id, Organization.name).order_by(Organization.name.asc()).all()
    update_dict('organization', rs)
    rs = s.query(User.id, User.name).order_by(User.name.asc()).all()
    update_dict('user', rs)
    rs = s.query(Permission.id, Permission.name).order_by(Permission.name.asc()).all()
    update_dict('permission_parent', rs)
    return rv


#
# # @intercept('/')
# # def all_intercept(next_fn):
# #     print('before all intercept')
# #     try:
# #         return next_fn()
# #     finally:
# #         print('after all intercept')
#
#
# # @intercept('/admin')
# # def check_admin(next_fn):
# #     print('before admin interceptor')
# #     try:
# #         return next_fn()
# #     finally:
# #         print('after admin interceptor')


@route('/api/Role')
@restful
def get_role_list():
    return Session.query(Role).all()


@route('/api/Role/<pk>')
@restful
def get_role(pk):
    return Role.load(pk)


@route('/api/Role', method='post')
@restful
def add_role():
    return Role().update_vo(**ctx.request.json).save()


@route('/api/Role/<pk>', method='put')
@restful
def update_role(pk):
    return Role.load(pk).update_vo(**ctx.request.json).save()


@route('/api/Role/<pk>/permission')
@restful
def get_role_permission_tree(pk):
    checked = ctx.request.args['checked']
    if checked == '1':
        header = aliased(RolePermissionHeader)
        return Session.query(*inspect(Permission).c,
                             case([(header.role_fk.is_(None), False)], else_=True).label('checked')) \
            .outerjoin(header, (header.permission_fk == Permission.id) & (header.role_fk == pk)) \
            .all()
    else:
        start = Session.query(Permission) \
            .join(RolePermissionHeader) \
            .filter(RolePermissionHeader.role_fk == pk) \
            .group_by(Permission.id) \
            .cte(recursive=True)
        nested = start.union(Session.query(Permission)
                             .filter(Permission.id == start.c.parent_fk))
        return Session.query(*nested.c, label('expanded', text('True'))).all()


@route('/api/Role/<pk>/permission', method='post')
@restful
def update_role_permission(pk):
    vo = ctx.request.json
    permissions = vo['permissions']
    if permissions:
        Session.query(RolePermissionHeader).filter(RolePermissionHeader.role_fk == pk).delete(synchronize_session=False)
        Session.bulk_insert_mappings(RolePermissionHeader, [{'role_fk': pk, 'permission_fk': e} for e in permissions])


@route('/api/Permission')
@restful
def get_permission_list():
    return Session.query(Permission).all()


@route('/api/Permission/<pk>')
@restful
def get_permission(pk):
    return Permission.load(pk)


@route('/api/Permission', method='post')
@restful
def add_permission():
    return Permission().update_vo(**ctx.request.json).save()


@route('/api/Permission/<pk>', method='put')
@restful
def update_permission(pk):
    return Permission.load(pk).update_vo(**ctx.request.json).save()


@route('/api/tree/Permission')
@restful
def get_permission_tree_list():
    node = ctx.request.args['node']
    if node == 'root':
        node = None
    rs = Permission.tree(node)
    return rs


@route('/api/tree/Permission', method='post')
@restful
def update_permission_node():
    vo = ctx.request.json
    pk = vo['id']
    return Permission.load(pk).update_vo(vo).save()

