@ECHO OFF
del config.json
SET /P COIN=please enter the coin you mine (full name without capital letters):
SET /P ADDRESS=please enter your addres you mine to:
copy /y nul config.json
echo {"address": "%ADDRESS%", "crypto": "%COIN%"} >> config.json
del data.json
copy /y nul data.json
echo {"hashrate": [1], "price": [1], "balance": [1], "online": false} >> data.json
echo isntalling cfscrape
pip install cfscrape
@ECHO ON
run.bat
