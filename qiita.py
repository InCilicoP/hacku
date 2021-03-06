from qiita_v2.client import QiitaClient

def getFavID(usrid): #ユーザIDを渡すとユーザのお気に入り(ストックした記事)の全ての記事のIDをリストにして返します
    client = QiitaClient(access_token='ebad5a802a2846451a75579069d0bec6364d0c69')
    idList = []
    favList = client.list_user_stocks(usrid).to_json()
    for fav in favList:
        idList.append(fav['id'])
    return idList

def getTag(idList): #記事IDをリストで渡すとリスト上全ての記事のタグをキーワードで返します
    client = QiitaClient(access_token='ebad5a802a2846451a75579069d0bec6364d0c69')
    words = []
    for articleid in idList:
        item = client.get_item(articleid).to_json()
        for i in item['tags']:
            words.append(i['name'])
    return words

def countUniqWords(keywords,userID):
    uniqDict = {}
    for word in keywords:
        uniqDict[word] = 0
    for word in keywords:
        if word in uniqDict:
            uniqDict[word] += 1
    result = []
    tempDict = list(uniqDict.items())
    for i in range(len(tempDict)):
        result.append({"word":tempDict[i][0],"count":tempDict[i][1],"userID":userID})
    return result
