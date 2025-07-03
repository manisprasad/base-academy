import axios from 'axios';
import { StudentDatatype } from '../../config/sendMail';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || undefined;
if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
}

const CHAT_ID = process.env.TELEGRAM_CHAT_ID  || undefined;
if (!CHAT_ID) {
  throw new Error('TELEGRAM_CHAT_ID is not defined in environment variables');
}

const sendTelegramMessage = async (student: StudentDatatype) => {
  const message = `
📩 *New Contact Submission*

👤 *Name:* ${student.name}
📞 *Phone:* ${student.phone}
💬 *Query:* ${student.query}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown'
  });
};

// Example usage:
sendTelegramMessage({
  name: 'Test User',
  phone: '+91 934-567-8900',
  query: 'I am interested in your online course'
});
console.log('Telegram message sent successfully!');

export default sendTelegramMessage;