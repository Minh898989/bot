const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token);

bot.deleteWebHook()
  .then(() => {
    console.log('✅ Webhook đã được xóa thành công');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Lỗi khi xóa webhook:', err);
    process.exit(1);
  });
