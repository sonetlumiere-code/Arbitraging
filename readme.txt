# Telegram Bot CLI DB


```console
TOKEN
|
|_BotFather
	|_/newbot	# get Bot TOKEN


CHAT_ID
|
|_`https://api.telegram.org/bot${TOKEN}/getUpdates`


SERVER_URL		# use https to set webhook, or NGROK (https://ngrok.com/)
|
NGROK
|
|_share port
|	|_ngrok terminal
|		|_ngrok http 4000	 # (app PORT=4000)
|
|_stop sharing port
	|_windows terminal
		|_taskkill /f /im ngrok.exe
```


## .env example:

```console
TELEGRAM_BOT_TOKEN="00000:xxxxx"
CHAT_ID="xxxxx"
CHAT_ID_GROUP=-xxxxx
MONGODB_URI="mongodb://localhost:27017/arbitraje-bot-cli"
SETTINGS_ID="xxxxx"
```
