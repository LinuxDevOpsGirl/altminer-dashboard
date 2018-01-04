#!/bin/sh
rm config.json
echo "please enter the coin you mine (full name without capital letters):"
read COIN
echo "please enter your addres you mine to:"
read ADDRESS
echo "{\"address\": \"$ADDRESS\", \"crypto\": \"$COIN\"}" >> config.json
echo "isntalling cfscrape"
pip install cfscrape
