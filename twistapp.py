# coding=utf-8

__author__ = 'yinlan'


from twisted.internet import reactor
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource

from autobahn.twisted.websocket import WebSocketServerFactory, \
    WebSocketServerProtocol
from autobahn.twisted.resource import WebSocketResource, WSGIRootResource

from web import WSGI

import routes


from dbx import engine
from models import Base
Base.metadata.create_all(engine)




class EchoServerProtocol(WebSocketServerProtocol):

    def onMessage(self, payload, isBinary):
        self.sendMessage(payload, isBinary)

if __name__ == '__main__':
    wsgi = WSGI()
    app = wsgi.get_wsgi()

    wsFactory = WebSocketServerFactory(u"ws://localhost:8000")
    wsFactory.protocol = EchoServerProtocol
    wsResource = WebSocketResource(wsFactory)

    wsgiResource = WSGIResource(reactor, reactor.getThreadPool(), app)

    rootResource = WSGIRootResource(wsgiResource, {'ws': wsResource})

    site = Site(rootResource)

    reactor.listenTCP(8000, site)
    reactor.run()
