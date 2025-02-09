import TelegramBot from 'node-telegram-bot-api';
import SupportAccess, { SupportAccessRow } from '../../models/support_access';
import crypto = require('crypto');
const token = process.env.TG_TOKEN ??"";
import fs from 'fs';
const bot = new TelegramBot(token, {polling: true});


let accessCodes : Map<number,string>=new Map();

export const startBotProcess=()=>{
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text;
        if (messageText === '020202'){
            accessCodes.set(chatId,"user");
            bot.sendMessage(chatId, "Вы авторизованы");
            return;
        }
        if(!accessCodes.get(chatId)){
            bot.sendMessage(chatId, 'Для доступа введите пароль');
            return;
        }
        
        if (messageText === '/check') {
           return checkAccessCount();
        } else if (messageText === '/help') {
          bot.sendMessage(chatId, '=>');
        } else {
          bot.sendMessage(chatId, 'Ожидайте трекинга');
        }
      });
}

const checkAccessCount=()=>{
    accessCodes.forEach((value: string, key: number) => {
        bot.sendMessage(key, "ВСего подключено пользователей: "+accessCodes.size);
    });
    
}

export const sendBotSupport=(text:string)=>{
    accessCodes.forEach((value: string, key: number) => {
        bot.sendMessage(key, text);
    });
}



