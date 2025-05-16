const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const url = process.env.URL;
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

// Tạo bot không polling, sẽ nhận update qua webhook Express
const bot = new TelegramBot(token, { polling: false });

async function start() {
  await bot.setWebHook(`${url}/bot${token}`);
  console.log(`Webhook được set thành công: ${url}/bot${token}`);

  app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.from.username || msg.from.first_name || "ẩn";

    const webAppUrl = `https://frontend-chess-seven.vercel.app/?uid=${userId}&un=${username}`;

    bot.sendMessage(chatId, '🎮 Bấm vào nút bên dưới để chơi cờ vua:', {
      reply_markup: {
        inline_keyboard: [[
          { text: "♟️ Vào chơi", web_app: { url: webAppUrl } }
        ]]
      }
    });
  });

  app.listen(port, () => {
    console.log(`✅ Server đang chạy trên port ${port}`);
  });
}

start().catch(console.error);
