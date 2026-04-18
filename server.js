const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = process.env.PORT || 3000;

// التوكن الخاص بالبوت (تم وضعه مباشرة)
const BOT_TOKEN = '7604669338:AAF-Bor_OJ2nHuP3H_-7E8QXVptnTeqFEUA';
// معرف الدردشة الخاص بحسابك
const CHAT_ID = '1094651468';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// أمر البدء
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ الخادم يعمل بنجاح! جاهز لاستقبال الأوامر.');
});

// أمر اختبار
bot.onText(/\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, '🏓 Pong! الخادم نشط.');
});

// صفحة ويب للتأكد
app.get('/', (req, res) => {
    res.send('C2 Server is running!');
});

app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});
