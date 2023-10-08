# Telegram Bot CLI DB

## Get Token

* Create a bot with BotFather in Telegram

```console
/newbot
```

## Get chat id

* Go to URL:

```javascript
`https://api.telegram.org/bot${TOKEN}/getUpdates`
```

## Using Ngrok (optional):

* use https to set webhook, or NGROK (https://ngrok.com/)

### Share port

* Ngrok terminal:

```console
ngrok http 4000	 # (app PORT=4000)
```

### Stop sharing port

* Windows terminal

```console
taskkill /f /im ngrok.exe
```

## .env example:

```console
NTBA_FIX_319=1
TELEGRAM_BOT_TOKEN="00000:xxxxx"
CHAT_ID="xxxxx"
CHAT_ID_GROUP=-xxxxx
MONGODB_URI="mongodb://localhost:27017/arbitrage-bot-cli"
SETTINGS_ID="xxxxx"
```

*Update SETTINGS_ID with the generated Settings MongoDB Document id*