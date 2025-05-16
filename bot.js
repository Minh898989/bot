const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const url = process.env.URL; // url domain của bạn, ví dụ https://yourdomain.com
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

// Tạo bot không polling, nhận update qua webhook
const bot = new TelegramBot(token, { polling: false });

async function start() {
  // Set webhook cho bot
  await bot.setWebHook(`${url}/bot${token}`);
  console.log(`Webhook đã được set tại: ${url}/bot${token}`);

  // Lắng nghe webhook POST request
  app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  // Xử lý lệnh /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Link cố định trang web cờ vua
    const webAppUrl = 'https://frontend-chess-seven.vercel.app/';

    bot.sendMessage(chatId, '🎮 Bấm vào nút bên dưới để chơi cờ vua:', {
      reply_markup: {
        inline_keyboard: [[
          { text: "♟️ Vào chơi", web_app: { url: webAppUrl } }
        ]]
      }
    }).catch(console.error);
  });

  // Chạy server Express
  app.listen(port, () => {
    console.log(`Server đang chạy trên port ${port}`);
  });
}

start().catch(console.error);
