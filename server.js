const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAF-Bor_OJ2nHuP3H_-7E8QXVptnTeqFEUA';
const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل وضع Polling
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// أمر بدء التشغيل
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ البوت يعمل بنجاح! أرسل /help للأوامر.');
});

// أمر المساعدة
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 الأوامر المتاحة:\n/start\n/help');
});

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
