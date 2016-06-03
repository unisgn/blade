# coding=utf-8
# Created by 0xFranCiS on Jun 01, 2016.

from models import *
from dbx import open_session, Session, engine
from sqlalchemy import func, event, text
from sqlalchemy.sql import label
from sqlalchemy.inspection import inspect
from util import jsonify

# Base.metadata.create_all(engine)

# print(jsonify(Role.permission_tree('001')))

#
#
# po = Permission(id='perm#06', code='perm#06').save()
# print(jsonify(po))
# Session.commit()


rs = Role.load_permissions('123', False)
print(jsonify(rs))
