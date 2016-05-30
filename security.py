"""

"""

import threading
from web import ctx
import logging
import functools
from decorator import decorator
import dbx
import time

import hashlib

_authorities = {}
_principals = {}

_sessions = {}

SESSION_Name = 'SPYSESSION'

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def secured(role_expr):
    def d(fn):
        logger.info('register %s with access role %s' % (fn.__name__, role_expr))
        security.register_interceptor(fn, role_expr)

        @functools.wraps(fn)
        def dd(*args, **kwargs):
            logger.info('make decision for %s access' % fn.__name__)
            security.make_decision(fn)
            return fn(*args, **kwargs)
        return dd
    return d


class SecurityManager:
    def __init__(self):
        pass

    def make_decision(self, fn):
        pass

    def get_principal(self):
        pass

    def register_interceptor(self, fn, role_expr):
        pass


security = SecurityManager()


class SecurityException(Exception):
    pass



class AuthenticationException(SecurityException):
    pass

#
# class AuthenticationProvider:
#     pass
#
#
# class AuthenticationManager:
#     pass
#
#
# class Authentication:
#     def __init__(self, name, credential):
#         self.name = name
#         self.credential = credential
#         self.authorities = []
#
#
# class Principal:
#     pass
#
#
# class UserDetail:
#     pass
#
#

MAX_AGE = int(2*60*60)



def authenticate(fn):
    def d(*args, **kwargs):
        username = ctx.request.form['username']
        password = ctx.request.form['password']
        user = dbx.redis.hgetall('user:%s' % username)
        if user and user['password'] == password:
            last_session_key = 'last_session:%s' % username
            sessionid = dbx.redis.get(last_session_key)
            if not sessionid:
                sessionid = hashlib.sha1((username + password).encode()).hexdigest()
            pipe = dbx.redis.pipeline()
            session_key = 'secured_session:%s' % sessionid
            pipe.hmset(session_key, user)
            pipe.expire(session_key, MAX_AGE)
            pipe.set(last_session_key, sessionid)
            pipe.expire(last_session_key, MAX_AGE)
            pipe.execute()
            ctx.response.make_cookie(SESSION_Name, sessionid)
            ctx.session['user'] = user
            return fn(*args, **kwargs)
        else:
            raise AuthenticationException('authentication failed')
    return d



#
#
# def security_interceptor():
#     pass
#
#
# class AccessDecisionMaker:
#     pass
#
#
# class GrantedAuthority:
#     pass
