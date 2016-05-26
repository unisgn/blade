import base64
import hashlib
import json
import threading
import logging
import functools
import os.path
import mimetypes
import sys
import six
from io import StringIO
import traceback
import re
import uuid
from decorator import decorator

from http import HTTPStatus



logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
from util import jsonify
import demjson
import cgi

from werkzeug.wrappers import BaseRequest

# from geventwebsocket.handler import WebSocketHandler
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket import WebSocketServer, WebSocketApplication, Resource



HTTP_STATUSES = {
    100: ''
}

SESSION_NAME = 'PYSESSION'


_HTTP_HEADERS = (
    'Accept-Ranges',
    'Age',
    'Allow',
    'Cache-Control',
    'Connection',
    'Content-Encoding',
    'Content-Language',
    'Content-Length',
    'Content-Location',
    'Content-MD5',
    'Content-Disposition',
    'Content-Range',
    'Content-Type',
    'Date',
    'ETag',
    'Expires',
    'Last-Modified',
    'Link',
    'Location',
    'P3P',
    'Pragma',
    'Proxy-Authenticate',
    'Refresh',
    'Retry-After',
    'Server',
    'Set-Cookie',
    'Strict-Transport-Security',
    'Trailer',
    'Transfer-Encoding',
    'Vary',
    'Via',
    'Warning',
    'WWW-Authenticate',
    'X-Frame-Options',
    'X-XSS-Protection',
    'X-Content-Type-Options',
    'X-Forwarded-Proto',
    'X-UA-Compatible',
)

_weekdayname = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

_monthname = [None,
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def _getdate(future=0, weekdayname=_weekdayname, monthname=_monthname):
    from time import gmtime, time
    now = time()
    year, month, day, hh, mm, ss, wd, y, z = gmtime(now + future)
    return "%s, %02d %3s %4d %02d:%02d:%02d GMT" % \
           (weekdayname[wd], day, monthname[month], year, hh, mm, ss)

_HTTP_HEADERS_DICT = dict(zip(map(lambda x: x.upper(), _HTTP_HEADERS), _HTTP_HEADERS))


class HTTPError(Exception):
    _status = None

    def __init__(self, status, msg='', data=None):
        self._status = status
        self.message = msg
        self.data = data

    @property
    def status(self):
        return '%s %s' % (self._status.value, self._status.phrase)

    @property
    def code(self):
        return int(self._status.value)


class MultipartFile:
    def __init__(self, storage):
        self.filename = storage.filename
        self.file = storage.file


def _get_data(req, cache):
    getter = getattr(req, 'get_data', None)
    if getter is not None:
        return getter(cache=cache)
    return req.data


class Request(BaseRequest):
    def __init__(self, environ):
        super(Request, self).__init__(environ, populate_request=False)
        self._environ = environ

    @property
    def json(self):
        if not hasattr(self, '_json'):
            data = _get_data(self, True)
            self._json = demjson.decode(data)
        return self._json

    @property
    def method(self):
        return self._environ['REQUEST_METHOD']

    @property
    def query_string(self):
        return self._environ.get('QUERY_STRING', '')

    @property
    def cookies(self):
        if not hasattr(self, '_cookies'):
            cks = {}
            if 'HTTP_COOKIE' in self._environ:
                for _cookie in self._environ['HTTP_COOKIE'].split(';'):
                    if 'DELETED' in _cookie:
                        continue
                    name, val = _cookie.strip().split('=', 1)
                    cks[name] = val
            self._cookies = cks
        return self._cookies

    def cookie(self, name):
        return self.cookies.get(name, None)



class Response:

    def __init__(self, status=HTTPStatus.OK):
        self._status = status
        self._headers = {'CONTENT-TYPE': 'text/html;charset=utf-8'}
        self._cookies = {}

    @property
    def status(self):
        return '%s %s' % (self._status.value, self._status.phrase)

    @property
    def headers(self):
        lst = [(_HTTP_HEADERS_DICT.get(k, k), v) for k, v in self._headers.items()]
        for k, v in self._cookies.items():
            lst.append(('Set-Cookie', '%s=%s' % (k, v)))
        return lst

    def header(self, name, value=None):
        if value is None:
            return self._get_header(name)
        elif value == '':
            self._remove_header(name)
        else:
            self._set_header(name, value)

    def _remove_header(self, name):
        key = name.upper()
        if key not in _HTTP_HEADERS_DICT:
            key = name
        if key in self._headers:
            del self._headers[key]

    def _get_header(self, name):
        key = name.upper()
        if key not in _HTTP_HEADERS_DICT:
            key = name
        return self._headers.get(key)

    def _set_header(self, name, val):
        key = name.upper()
        if key not in _HTTP_HEADERS_DICT:
            key = name
        self._headers[key] = val

    def make_cookie(self, name, val, expires='', path='/', domain=''):
        val = val.replace(';', '')
        if expires:
            expires = 'expires=%s; ' % expires
        if domain:
            domain = 'Domain=%s; ' % domain
        self._cookies[name] = '%s;%s%s path=%s' % (val, domain, expires, path)

    def del_cookie(self, name):
        self.make_cookie(name, 'DELETED', expires='Thu, 01 Jan 1970 00:00:00 GMT')

    @property
    def content_type(self):
        return self.header('CONTENT-TYPE')

    @content_type.setter
    def content_type(self, val):
        self.header('CONTENT-TYPE', val)


class SessionManager:
    def __init__(self):
        self._sessions = {}

    def get(self, sessionid):
        return self._sessions.get(sessionid)

    def generate(self):
        pass


_sessions = {}


class Routine:
    _RE_URL_VARIABLE = re.compile(r'\S+<([a-zA-Z_]\w*\S*)>')
    _RE_URL_PATTERN = re.compile(r'<([a-zA-Z_]\w*)>')

    def __init__(self, url_expr, method, handler):
        self.url_expr = url_expr.rstrip('/')
        self.method = method.upper()
        self.handler = handler
        self.url_variables = self._parse_path_variables(url_expr)
        self._re_url = self._build_url_pattern(url_expr) if \
            self.url_variables else None

    def _build_url_pattern(self, url_expr):
        return '^' + re.sub(self._RE_URL_PATTERN, '(?P<\\1>[^/]+)', url_expr) + '$'

    def _parse_path_variables(self, url_expr):
        m = re.match(self._RE_URL_VARIABLE, url_expr)
        return m.groups() if m else None

    def match(self, url):
        m = re.match(self._re_url, url)
        if m:
            groups = m.groups()

        return m.groups() if m else None


class Router:
    def __init__(self):
        self._web_root = os.path.dirname(__file__)
        self.statics = {
            'GET': {},
            'POST': {},
            'PUT': {},
            'DELETE': {}
        }
        self.dynamics = {
            'GET': [],
            'POST': [],
            'PUT': [],
            'DELETE': []
        }
        self.inspectors = []

    @property
    def web_root(self):
        return self._web_root

    @web_root.setter
    def web_root(self, web_root):
        self._web_root = web_root

    def dispatch(self):
        return self._walk_interceptors()()
        # return self._dispatch()

    def _dispatch(self):
        request = ctx.request
        method = request.method.upper()
        path = request.path
        handler = args = None
        if self._is_file(path):
            path = os.path.join(self.web_root, path.lstrip('/'))
            if os.path.isfile(path):
                handler, args = static_file_handler(path), None
        else:
            routine = self.statics[method].get(path)
            if routine:
                handler = routine.handler
            if not handler:
                for routine in self.dynamics[method]:
                    variables = routine.match(path)
                    if variables:
                        handler, args = routine.handler, variables
                        break
        if handler:
            if args:
                return handler(*args)
            else:
                return handler()
        else:
            raise HTTPError(HTTPStatus.NOT_FOUND)

    def register(self, routine):
        if routine.url_variables:
            self.dynamics[routine.method].append(routine)
        else:
            self.statics[routine.method][routine.url_expr] = routine
        logger.info('<Router>: registered %s %s to handler %s' %
                    (routine.method, routine.url_expr, routine.handler.__name__))

    def register_interceptor(self, interceptor):
        self.inspectors.insert(0, interceptor)

    @staticmethod
    def _intercept(interceptor, nxt):
        def wrapper():
            if isinstance(interceptor, Interceptor) \
                    and ctx.request.path.startswith(interceptor.pattern):
                return interceptor.interceptor(nxt)
            else:
                return nxt()
        return wrapper

    def _walk_interceptors(self):
        target = self._dispatch
        for i in self.inspectors:
            target = self._intercept(i, target)
        return target

    @staticmethod
    def _is_file(url):
        return url.startswith('/statics/') or url == '/favicon.ico'


_router = Router()





def static_file_generator(fpath):
    # can't read/write ctx in an generator function
    # so you can't have code as follows
    #
    # mime = mimetypes.guess_type(fpath)[0]
    # if not mime:
    #     mime = 'application/octet-stream'
    # ctx.response.content_type = mime
    buf_size = 8192
    with open(fpath, mode='rb') as f:
        buf = f.read(buf_size)
        while buf:
            yield buf
            buf = f.read(buf_size)


class static_file_handler:
    def __init__(self, fpath):
        self.fpath = fpath
        mime = mimetypes.guess_type(fpath)[0]
        if not mime:
            mime = 'application/octet-stream'
        ctx.response.content_type = mime

    def __call__(self, *args):
        return static_file_generator(self.fpath)


def restful(fn):
    @functools.wraps(fn)
    def d(*args, **kwargs):
        ctx.response.content_type = 'application/json'
        ret = {
            'msg': 'ok',
            'success': True,
            'data': None
        }
        try:
            content = fn(*args, **kwargs)
            ret['data'] = content
        except Exception as e:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            fp = StringIO()
            traceback.print_exception(exc_type, exc_value, exc_traceback, file=fp)
            stacks = fp.getvalue()
            print(stacks)
            fp.close()
            ret['success'] = False
            ret['msg'] = stacks
        return jsonify(ret)
    return d


def route(path, method='get'):
    def d(fn):
        rt = Routine(path, method, fn)
        _router.register(rt)

        @functools.wraps(fn)
        def dd(*args, **kwargs):
            return fn(*args, **kwargs)
        return dd
    return d


class Interceptor:
    def __init__(self, pattern, fn):
        self.pattern = pattern
        self.interceptor = fn


def intercept(pattern='/'):
    def d(fn):
        _router.register_interceptor(Interceptor(pattern, fn))

        def dd(*args, **kwargs):
            return fn(*args, **kwargs)
        return dd
    return d


ctx = threading.local()




class ChatApplication(WebSocketApplication):
    def on_open(self):
        print("Some client connected!")

    def on_message(self, message):
        if message is None:
            return

        message = json.loads(message)

        if message['msg_type'] == 'message':
            self.broadcast(message)
        elif message['msg_type'] == 'update_clients':
            self.send_client_list(message)

    def send_client_list(self, message):
        current_client = self.ws.handler.active_client
        current_client.nickname = message['nickname']

        self.ws.send(json.dumps({
            'msg_type': 'update_clients',
            'clients': [
                getattr(client, 'nickname', 'anonymous')
                for client in self.ws.handler.server.clients.values()
            ]
        }))

    def broadcast(self, message):
        for client in self.ws.handler.server.clients.values():
            client.ws.send(json.dumps({
                'msg_type': 'message',
                'nickname': message['nickname'],
                'message': message['message']
            }))

    def on_close(self, reason):
        print("Connection closed!")








class WSGI:

    def __init__(self, web_root=os.path.dirname(os.path.abspath(__file__)), debug=False):
        _router.web_root = web_root
        self.router = _router
        self.debug = debug

    def get_wsgi(self):
        router = self.router

        def wsgi(environ, start_response):
            req = ctx.request = Request(environ)
            resp = ctx.response = Response()
            sessionid = req.cookie(SESSION_NAME)
            if sessionid:
                session = ctx.session = _sessions.get(sessionid)
            else:
                sessionid = str(uuid.uuid1())
                resp.make_cookie(SESSION_NAME, sessionid)
                session = {}
                _sessions[sessionid] = session
                ctx.session = session

            try:
                r = router.dispatch()
                if isinstance(r, str):
                    r = [r.encode()]
                if not r:
                    r = []
                start_response(resp.status, resp.headers)
                return r
            except HTTPError as he:
                start_response(he.status, resp.headers)
                return [he.message.encode()]
            except Exception as e:
                # logger.exception(e)
                if not self.debug:
                    start_response(HTTPError(HTTPStatus.INTERNAL_SERVER_ERROR).status, resp.headers)
                    return ['<html><body><h1>500 Internal Server Error</h1></body></html>'.encode()]
                else:
                    exc_type, exc_value, exc_traceback = sys.exc_info()
                    fp = StringIO()
                    traceback.print_exception(exc_type, exc_value, exc_traceback, file=fp)
                    stacks = fp.getvalue()
                    fp.close()
                    print(stacks)
                    start_response(HTTPError(HTTPStatus.INTERNAL_SERVER_ERROR).status, resp.headers)

                    return [
                        r'''<html><body><h1>500 Internal Server Error</h1><div style="font-family:Monaco, Menlo, Consolas, 'Courier New', monospace;"><pre>'''.encode(),
                        stacks.replace('<', '&lt;').replace('>', '&gt;').encode(),
                        '</pre></div></body></html>'.encode()]
            finally:
                del ctx.request
                del ctx.response
                del ctx.session
        return wsgi

    def run(self, host='', port=8000):
        from wsgiref.simple_server import make_server

        # httpd = make_server(host, port, self.get_wsgi())


        # from gevent.monkey import patch_all; patch_all()
        # from psycogreen.gevent import patch_psycopg; patch_psycopg()

        from gevent import pywsgi
        httpd = pywsgi.WSGIServer((host, port), self.get_wsgi())

        httpd.serve_forever()

        # WebSocketServer(
        #     ('0.0.0.0', 8000),
        #
        #     Resource([
        #         ('^/chat', ChatApplication),
        #         ('^/.*', self.get_wsgi())
        #     ]),
        #
        #     debug=False
        # ).serve_forever()

