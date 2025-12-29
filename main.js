import { doMYSSign } from './src/MYS/index.js'
import { doCloudSign } from './src/MihoyoCloud/index.js'
import TelegramBot from 'node-telegram-bot';

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_BOT_CHATID = process.env.TG_BOT_CHATID;

let bot;
if (TG_BOT_TOKEN) {
  bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });
  console.log('TG bot started');
} else {
  console.warn('TG_BOT_TOKEN not set, using no-op bot');
  bot = { sendMessage: (chatId, msg) => console.log(`[TG:${chatId}] ${msg}`) };
}

globalThis.TG_BOT = bot;
globalThis.TG_BOT_CHATID = TG_BOT_CHATID;

async function main() {
  await doMYSSign('Genshin')
  await doMYSSign('StarRail')
  await doCloudSign('CloudYS')
  await doCloudSign('CloudSR')
}

main().then()
