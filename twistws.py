# coding=utf-8
import json

from geventwebsocket import WebSocketApplication

__author__ = 'yinlan'


from twisted.internet import reactor
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource

from autobahn.twisted.websocket import WebSocketServerFactory, \
    WebSocketServerProtocol
from autobahn.twisted.resource import WebSocketResource, WSGIRootResource





class EchoServerProtocol(WebSocketServerProtocol):

    def onMessage(self, payload, isBinary):
        self.sendMessage(payload, isBinary)

if __name__ == '__main__':

   import sys

   from twisted.python import log
   from twisted.internet import reactor
   log.startLogging(sys.stdout)

   from autobahn.twisted.websocket import WebSocketServerFactory
   factory = WebSocketServerFactory()
   factory.protocol = EchoServerProtocol

   reactor.listenTCP(9000, factory)
   reactor.run()



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