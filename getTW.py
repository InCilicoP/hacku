#coding: utf-8
import urllib.request
from bs4 import BeautifulSoup

def getTW(url):
	useragent = 'Mozilla/5.0'
	req = urllib.request.Request(url)
	req.add_header("User-agent",useragent)
	res = urllib.request.urlopen(req)
	html = res.read().decode()
	soup = BeautifulSoup(html, "html.parser")

	title = soup.find("title")
	section = soup.findAll("div",attrs = {"class":"section"})
	section = section[4]
	words = section.findAll("a")
	title = title.getText().split('\t')
	title = title[-2].strip('\n')
	for i in range(len(words)):
		words[i] = words[i].getText()
	dic = {"title":title , "keywords":words}
	print(dic)
	return dic

def main(url):
	getTW(url)

if __name__ == '__main__':
	main(url)
