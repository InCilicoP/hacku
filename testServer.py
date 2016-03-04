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
import os.path
import qiita

define("port", default = 8080, help = "run on the given port", type = int)

class IndexHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self):
        self.render("./static/list.html")

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
        messageJson = json.loads(message)
        print(messageJson)
        if messageJson['key'] == 'test':
            print(messageJson['value'])
        elif messageJson['key'] == 'reqDisp':
            #bsonを取ってくる
            resDispData = db_connect["test"].find({'userID':messageJson['value']})
            #bosn>>dict
            sendDataNeo = {
                'key':'resDisp',
                'value':[]
                }
            for sendData in loads(dumps(resDispData)):
                sendDataNeo['value'].append({'title':sendData['title'],'url':sendData['url'],'keywords':sendData['keywords']})
            #dict>>str
            sendDataStr = json.dumps(sendDataNeo)
            self.write_message(sendDataStr)
        elif messageJson['key'] == 'reqGomi':
            #idからお気に入りリストを取ってくる
            favAry = qiita.getFavID(messageJson['value'])
            allAry = []
            print(favAry)
            tagAry = qiita.getTag(favAry)
            for wordss in tagAry:
                allAry.append(wordss)
            countResult = qiita.countUniqWords(allAry)
            sendData = {
                'key':'resGomi',
                'value':{
                    'user':messageJson['value'],
                    'wordCount':countResult,
                }
            }
            print(sendData)
            sendDataStr = json.dumps(sendData)
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

settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "cookie_secret": "__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
    "xsrf_cookies": True,
}
app = tornado.web.Application([
    (r"/", IndexHandler),
    (r"/ws", SendWebSocket),
    (r"/(apple-touch-icon\.png)", tornado.web.StaticFileHandler,
    dict(path=settings['static_path'])),
], **settings)

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
