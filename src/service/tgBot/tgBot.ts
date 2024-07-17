import TelegramBot from 'node-telegram-bot-api';
import SupportAccess, { SupportAccessRow } from '../../models/support_access';
import crypto = require('crypto');
const token = '6441432961:AAEXPHapyE0cC-2Eb_uhRuCRtmYJ_AaFM4o';
import fs from 'fs';

let whiteListSupports:Array<string>=[]

export const startBotPooling=async()=>{
    return;
    await initConfigFile();
    const bot = new TelegramBot(token, {polling: true});
    console.log(whiteListSupports);
    
    bot.on('message',async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from?.id;
        console.log(userId);
        
        // send a message to the chat acknowledging receipt of their message
        const message=msg.text;
        
        if(message=="/check"){
            
            bot.sendMessage(chatId, 'Id пользователя');
            bot.sendMessage(chatId, userId?.toString()??"Нераспознано");
            return;
        }
        
        if(!userId){
           return bot.sendMessage(chatId, "id пользователя нераспознано!");
        }
        const includes = whiteListSupports.includes(userId.toString());
        if(!includes){
            return bot.sendMessage(chatId, "Ваш аккаунт не найден в системе");
        }
        if(message=="/start"){
            return   bot.sendMessage(chatId, 'Ожидайте новый запрос клиентов!');
        }
        if(message=="/status"){
            return   bot.sendMessage(chatId, 'Ожидайте новый запрос клиентов!');
        }
        if(message=="/off"){
            return   bot.sendMessage(chatId, 'Ожидайте новый запрос клиентов!');
        }
        
        
        
      });

      
}

const initConfigFile=async()=>{
    const filePath =__dirname+"/../../../"+'white_list_supports.txt';
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        whiteListSupports = fileContent.split('\n');
        whiteListSupports=whiteListSupports.map(element=>element.replace("\r",""))
      } catch (error) {
        console.error(error);
      }
}

const waitAccess=async(userId:string):Promise<boolean>=>{
    const access= await SupportAccess.findOne({
        where:{
            [SupportAccessRow.user_id]:userId,
           
        } 
    });
    if(!access){
        return false;
    }
     await SupportAccess.update(
        {
            [SupportAccessRow.wait_access]:true
        },{
            where:{
                [SupportAccessRow.user_id]:userId
            }
        }
    );
    return true;
}

const auth=async(userId:string,pass:string):Promise<boolean>=>{
    const passHash= crypto.createHash('sha256').update(pass).digest('hex');
    const access= await SupportAccess.findOne({
        where:{
            [SupportAccessRow.user_id]:userId,
            [SupportAccessRow.password]:passHash
        } 
    });
    if(!access){
        return false;
    }
    return true;
}





