"""

"""

import threading
from web import ctx
import logging
import functools
from decorator import decorator

_authorities = {}
_principals = {}

_sessions = {}

SESSION_Name = 'SECURED_SESSION'

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
# def authenticate():
#     pass
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

