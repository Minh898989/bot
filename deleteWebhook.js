// deleteWebhook.js
const fetch = require('node-fetch');
require('dotenv').config();

const token = process.env.TOKEN;
const url = `https://api.telegram.org/bot${token}/deleteWebhook`;

fetch(url, { method: 'POST' })
  .then(res => res.json())
  .then(json => {
    if (json.ok) {
      console.log('✅ Webhook đã được xóa thành công');
    } else {
      console.error('❌ Xóa webhook thất bại:', json);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Lỗi khi xóa webhook:', err);
    process.exit(1);
  });
