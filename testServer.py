import time
import tornado.ioloop
import tornado.web
import tornado.websocket
from tornado.ioloop import PeriodicCallback
from tornado.options import define, options, parse_command_line
from pymongo import MongoClient
import getTW
import json
from bson.json_util import dumps
from bson.json_util import loads

define("port", default = 41580, help = "run on the given port", type = int)

class IndexHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self):
        self.render("index.html")

class SendWebSocket(tornado.websocket.WebSocketHandler):
    #on_message -> receive data
    #write_message -> send data

    #index.htmlでコネクションが確保されると呼び出される
    def open(self):
        self.i = 0
        self.callback = PeriodicCallback(self._send_message, 400) #遅延用コールバック
        self.callback.start()
        print ("WebSocket opened")

    #クライアントからメッセージが送られてくると呼び出される
    def on_message(self, message):
        print (type(message))
        messageJson = json.loads(message)
        print(messageJson)
        if messageJson['key'] == 'test':
            print(messageJson['value'])
        elif messageJson['key'] == 'reqDisp':
            #bsonを取ってくる
            resDispData = db_connect["test"].find({'userID':messageJson['value']})
            print('bson')
            print(resDispData)
            #bosn>>dict
            sendData =loads(dumps(resDispData))[0]
            sendDataNeo = {
                'key':'resDisp',
                'value':{
                    'userID':sendData['userID'],
                    'url':sendData['url']
                    }
                }
            #dict>>str
            sendDataStr = json.dumps(sendDataNeo)
            self.write_message(sendDataStr)

    #コールバックスタートで呼び出しが始まる
    def _send_message(self):
        self.i += 1
        self.write_message(str(self.i))

    #ページが閉じ、コネクションが切れる事で呼び出し
    def on_close(self):
        self.callback.stop()
        print ("WebSocket closed")

app = tornado.web.Application([
    (r"/", IndexHandler),
    (r"/ws", SendWebSocket),
])

if __name__ == "__main__":
    # MongoDBへの接続
    mongo_client = MongoClient('localhost:27017')
    # データベースの選択
    db_connect = mongo_client["inSilico"]
    # コレクションを指定し、データを挿入する
    #db_connect["test"].insert_one({'x':1})
    # データを取得する
    collection_list = db_connect["test"].find()
    print(type(collection_list))
    for x in collection_list:
        print(x)
        print(type(x))

    getTW.main("http://ieeexplore.ieee.org/xpl/abstractKeywords.jsp?arnumber=7023234&newsearch=true")

    parse_command_line()
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
