# coding=utf-8
# Created by 0xFranCiS on May 30, 2016.

import websockets
import asyncio
import demjson

connected = set()

sessions = {}



async def handler(ws, path):
    global connected
    global sessions
    try:
        msg = await ws.recv()
        msg = demjson.decode(msg)
        token = msg['token']
        if token in ['sys', 'echo', 'normal']:
            connected.add(ws)
            print(len(connected))
            if token == 'sys':
                while 1:
                    msg = await ws.recv()
                    msg = demjson.decode(msg)
                    receivers = msg['to']
                    ms = msg['msg']
                    for e in receivers:
                        if e in sessions:
                            await sessions[e].send(ms)
                            print('msg:%s sent to %s' % (ms, e))
            else:
                sessions[token] = ws
                for e in connected:
                    msg = '%s has connected' % token
                    await e.send(msg)
                    print(msg)
                while 1:
                    msg = await ws.recv()
                    for e in connected:
                        await e.send(msg)
        else:
            await ws.send('invalid token')

    finally:
        connected.remove(ws)

start_server = websockets.serve(handler, 'localhost', 9000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()