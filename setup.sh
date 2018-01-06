#!/bin/sh
rm config.json
echo "please enter the coin you mine (full name without capital letters):"
read COIN
echo "please enter your addres you mine to:"
read ADDRESS
touch config.json
echo "{\"address\": \"$ADDRESS\", \"crypto\": \"$COIN\"}" >> config.json
rm data.json
touch data.json
echo "{\"hashrate\": [1], \"price\": [1], \"balance\": [1], \"online\": false}" >> data.json
echo "isntalling cfscrape"
pip install cfscrape
echo "installing colorama"
pip install colorama
