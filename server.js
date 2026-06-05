const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAElI3Uy3cnB4rzmk5LTGHI3a5ws63ueYS0';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// تعريف البوت بحيث لا يستخدم نظام الاستقصاء (Polling)
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// الأوامر الأساسية للبوت (للتأكد من أنه يعمل)
bot.onText(/\/start/, (msg) => bot.sendMessage(msg.chat.id, '✅ البوت يعمل بنجاح! أرسل /help للأوامر.'));
bot.onText(/\/help/, (msg) => bot.sendMessage(msg.chat.id, '📱 الأوامر: /start, /help, /contacts'));

// نقطة الوصول (Endpoint) التي سيرسل إليها Telegram الأوامر
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('C2 Server is running and ready!'));

app.listen(PORT, () => console.log(`✅ C2 Server is running on port ${PORT}`));
