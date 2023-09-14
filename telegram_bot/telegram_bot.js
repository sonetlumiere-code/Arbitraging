'use strict'

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const switchCommands = require('./commands-bot')

bot.onText(/\/ab(.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const prompt = match[1].trim()
    if (chatId == process.env.CHAT_ID_GROUP) {
        const response = await switchCommands(prompt)
        bot.sendMessage(chatId, response)
    } else {
        bot.sendMessage(chatId, 'forbidden')
    }
})

/*
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message')
})
*/

module.exports = bot