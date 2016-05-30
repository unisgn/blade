# coding=utf-8
# Created by 0xFranCiS on May 30, 2016.

from websocket import create_connection
import demjson
ws = create_connection('ws://localhost:9000')
msg = {
    'token': 'sys'
}
ws.send(demjson.encode(msg))
msg = {
    'to': ['echo', 'normal'],
    'msg': 'hallo'
}
ws.send(demjson.encode(msg))
