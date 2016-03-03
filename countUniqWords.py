uniqDict = {}
userDict = {"userID": "", "URLsList":[],"TitlesList":[],"WordsDict":[]}

def getAllWords(keywords):
	global uniqDict
	for word in keywords:
		uniqDict[word] = 0

def countUniqWords(keywords):
	global uniqDict
	global userDict
	for word in keywords:
		if word in uniqDict:
			uniqDict[word] += 1

def main(usrElem):
	global userDict

	userDict["userID"] = usrElem[0]["userID"]
	for element in usrElem:
		userDict["URLsList"].append(element["URL"])
		userDict["TitlesList"].append(element["title"])
		getAllWords(element["keywords"])
	for element in usrElem:
		countUniqWords(element["keywords"])

	
	tempDict = list(uniqDict.items())
	print(tempDict)
	for i in range(len(tempDict)):
		userDict["WordsDict"].append({"name":tempDict[i][0],"count":tempDict[i][1]})

	return userDict




if __name__ == '__main__':
	main()