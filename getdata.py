# -*- coding: utf-8 -*-
import re
import time
import json
import cfscrape
import threading
from colors import *
from colorama import Fore

coinpriceRe = re.compile('\€(.*?)\</span>')
totalRe = re.compile('\.9em;\'>(.*?)\ VIVO')
hashRe = re.compile('</td><td align="right" width="100"><b>(.*?)\ (kh|mh)')
time.strftime("%H:%M:%S")
scraper = cfscrape.create_scraper()
f = open('config.json')
config = json.load(f)


def updatecoin():
    threading.Timer(180.0, updatecoin).start()
    scraped = scraper.get(
        "https://www.coingecko.com/en/widget_component/ticker/%s/eur" % config["crypto"]).content
    scraped = coinpriceRe.findall(scraped)
    price = float(scraped[0])
    f = open('data.json', 'r+')
    data = json.load(f)
    latestprice = data["price"][-1]
    if price != latestprice:
        data["price"].append(price)
        if len(data["price"]) > 100:
            del data["price"][0]
        f.seek(0)
        json.dump(data, f)
        f.truncate()
        print Fore.RESET,
        print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [coin price] [INFO]",
        print "price: ",
        print Fore.GREEN,
        print price,
        print "euro"
        print Fore.RESET,
    else:
        print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [coin price] [INFO]",
        print Fore.RED,
        print " price was the same, so not updated"
        print Fore.RESET,
    scraped = scraper.get(
        "https://www.altminer.net/site/wallet_results?address=%s" % config["address"]).content
    scraped = totalRe.findall(scraped)
    balance = float(scraped[3])
    f = open('data.json', 'r+')
    data = json.load(f)
    latestbalance = data["balance"][-1]
    if balance != latestbalance:
        data["balance"].append(balance)
        if len(data["balance"]) > 500:
            del data["balance"][0]
        f.seek(0)
        json.dump(data, f)
        f.truncate()
        print Fore.RESET,
        print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [balance] [INFO]",
        print "balance: ",
        print Fore.BLUE,
        print balance,
        print "vivo"
        print Fore.RESET,
    else:
        print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [balance] [INFO]",
        print Fore.RED,
        print "balance was the same, so not updated"
        print Fore.RESET,
    scraped = scraper.get(
        "https://www.altminer.net/site/wallet_miners_results?address=%s" % config["address"]).content
    scraped = hashRe.findall(scraped)
    if scraped == []:
        f = open('data.json', 'r+')
        data = json.load(f)
        lateststatus = data["online"]
        print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [hashrate]",
        print Fore.YELLOW,
        print "[WARNING]",
        print Fore.RED,
        print "hashrate not found. perhaps not running"
        print Fore.RESET,
        if lateststatus != False:
            print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [hashrate] [INFO]",
            print "status not yet set to false, changing now"
            data["online"] = False
            f.seek(0)
            json.dump(data, f)
            f.truncate()
    else:
        hashrate = float(scraped[0][0])
        if hashrate < 2:
            hashrate *= 1000
        f.seek(0)
        data = json.load(f)
        latesthashrate = data["hashrate"][-1]
        if hashrate != latesthashrate:
            data["hashrate"].append(hashrate)
            if len(data["hashrate"]) > 100:
                del data["hashrate"][0]
            f.seek(0)
            json.dump(data, f)
            f.truncate()
            lateststatus = data["online"]
            print Fore.RESET,
            print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [hashrate] [INFO]",
            print "hashrate: ",
            print Fore.BLUE,
            print hashrate,
            print "kh/s"
            print Fore.RESET,
            if lateststatus != True:
                print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [hashrate] [INFO]",
                print "status not yet set to true, changing now"
                data["online"] = True
                f.seek(0)
                json.dump(data, f)
                f.truncate()
        else:
            print "[" + time.strftime("%d/%m/%Y - %H:%M:%S") + "] [hashrate] [INFO]",
            print Fore.RED,
            print " hashrate was the same, so not updated"
            print Fore.RESET,


updatecoin()
