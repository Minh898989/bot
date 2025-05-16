const TelegramBot = require('node-telegram-bot-api');

const token = '7653298046:AAHkkUmS3UJeVTEJ-Dpgi-uef4swNwEIQIw';
const bot = new TelegramBot(token);

bot.deleteWebHook()
  .then(() => {
    console.log("✅ Webhook đã được xóa thành công. Có thể chạy polling.");
  })
  .catch((err) => {
    console.error("❌ Lỗi khi xóa webhook:", err);
  });
