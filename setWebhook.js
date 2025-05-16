// setWebhook.js
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const url = 'https://bot.onrender.com'; // 👈 sửa theo URL service bot của bạn

const bot = new TelegramBot(token);

bot.setWebHook(`${url}/bot${token}`)
  .then(() => console.log('✅ Webhook đã được thiết lập thành công'))
  .catch(err => console.error('❌ Lỗi webhook:', err));
