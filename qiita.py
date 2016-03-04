from qiita_v2.client import QiitaClient

def getFavID(usrid): #ユーザIDを渡すとユーザのお気に入り(ストックした記事)の全ての記事のIDをリストにして返します
    client = QiitaClient(access_token='63cea801ef0ad9d73cf028fcd34fd59941f11473')
    idList = []
    favList = client.list_user_stocks(usrid).to_json()
    for fav in favList:
        idList.append(fav['id'])
    return idList

def getTag(idList): #記事IDをリストで渡すとリスト上全ての記事のタグをキーワードで返します
    client = QiitaClient(access_token='63cea801ef0ad9d73cf028fcd34fd59941f11473')
    words = []
    for articleid in idList:
        item = client.get_item(articleid).to_json()
        for i in item['tags']:
            words.append(i['name'])
    return words

def makeUniqDict(keywords):
    uniqDict = {}
    for word in keywords:
        uniqDict[word] = 0
    return uniqDict

def countUniqWords(uniqDict,keywords):
    for word in keywords:
        if word in uniqDict:
            uniqDict[word] += 1
    return uniqDict
