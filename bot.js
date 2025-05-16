const TelegramBot = require('node-telegram-bot-api');

// === TOKEN BOT ===
const token = '8151357346:AAFGs22kcLi-HcBzpp6rrdtC_VBj1et66Sk';

// === TẠO BOT VỚI POLLING ===
const bot = new TelegramBot(token, { polling: true });

// === LOG KHI KHỞI ĐỘNG ===
console.log("✅ Bot đã sẵn sàng và đang lắng nghe các tin nhắn...");

// === KHI NGƯỜI DÙNG GÕ /start ===
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || "Người dùng ẩn";
  const userId = msg.from.id;

  // === LINK WEBAPP KÈM THÔNG TIN NGƯỜI DÙNG ===
  const webAppUrl = `https://frontend-chess-seven.vercel.app/?uid=${userId}&un=${username}`;

  // === GỬI NÚT CHƠI GAME CHO NGƯỜI DÙNG ===
  bot.sendMessage(chatId, "🎮 Bấm vào nút bên dưới để chơi cờ vua:", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "♟️ Vào chơi",
          web_app: { url: webAppUrl }
        }
      ]]
    }
  });

  // === LOG DEBUG ===
  console.log(`📥 Bot đã nhận được tin nhắn từ người dùng: ${username} (ID: ${userId})`);
});

// === LỖI POLLING ===
bot.on("polling_error", (error) => {
  console.error("❌ Lỗi khi polling:", error.code, error.message);
});
