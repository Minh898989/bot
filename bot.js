const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TOKEN;
const url = process.env.URL; // URL của bạn trên Render, ví dụ https://your-app.onrender.com
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const bot = new TelegramBot(token);
bot.setWebHook(`${url}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Chào bạn! Bot đã sẵn sàng với webhook.');
});

app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
  console.log(`Webhook URL: ${url}/bot${token}`);
});
