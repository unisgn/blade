"""

"""

import threading
from web import ctx, restful
import logging
import functools
from decorator import decorator
import dbx
import time
import demjson
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
        role_expr = getattr(fn, '__secured_role__', None)
        if role_expr:
            required_roles = role_expr.split(',')
            principal = ctx.session.get('user')
            if principal:
                granted_roles = dbx.redis.smembers('user_permissions#%s' % principal['username'])
                for r in required_roles:
                    if r not in granted_roles:
                        raise SecurityException('permission: %s are required' % ','.join(required_roles))
            else:
                raise SecurityException('login required')

    def get_principal(self):
        pass

    def register_interceptor(self, fn, role_expr):
        fn.__secured_role__ = role_expr


security = SecurityManager()


class SecurityException(Exception):
    pass



class AuthenticationException(SecurityException):
    pass


base_url = '/api'


# @intercept(base_url)
def secured_session(nxt):
    sessionid = ctx.request.cookie(SESSION_Name)
    if not sessionid:
        if ctx.session.get('user'):
            del ctx.session['user']
        return demjson.encode({
            'success': False,
            'msg': 'login required'
        })
    else:
        session_key = 'secured_session:%s' % sessionid
        principal = dbx.redis.hgetall(session_key)
        now = int(time.time())
        if not principal:
            if ctx.session.get('user'):
                del ctx.session['user']
            return demjson.encode({
                'success': False,
                'msg': 'session expired, login required'
            })
        principal.update({
            'last_active': now
        })
        ctx.session['user'] = principal
        last_session_key = 'last_session:%s' % principal['username']
        pipe = dbx.redis.pipeline()
        pipe.multi()
        pipe.hset(session_key, 'last_active', now)
        pipe.expire(session_key, MAX_AGE)
        pipe.expire(last_session_key, MAX_AGE)
        pipe.execute()
        ctx.response.make_cookie(SESSION_Name, sessionid, expires=MAX_AGE)
    rv = nxt()
    del ctx.session['user']
    return rv

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
            now = int(time.time())
            user.update({
                'login_time': now,
                'last_active': now
            })
            pipe.hmset(session_key, user)
            pipe.expire(session_key, MAX_AGE)
            pipe.set(last_session_key, sessionid)
            pipe.expire(last_session_key, MAX_AGE)
            pipe.execute()
            ctx.response.make_cookie(SESSION_Name, sessionid, expires=MAX_AGE)
            ctx.session['user'] = user
            return fn(*args, **kwargs)
        else:
            ctx.response.del_cookie(SESSION_Name)
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
