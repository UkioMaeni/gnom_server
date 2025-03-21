import userRouter from "../routes/userRouter";
import guestRouter from "../routes/guestRouter";
import subjectRouter from "../routes/subjectRouter";
import uploadFileRouter from "../routes/uploadFileRouter";
import completerRoutes from "../routes/completerRoutes";

import fcmRoutes from "../routes/fcmRoutes";
import inittializeDB from "../service/inittializeDB";
import firebaseService from "../firebase/firebase"
import { startBotProcess } from "../service/tgBot/tgBot";
import suportRouter from "../routes/supportRouter";
import payNotifyRouter from "../routes/payNotifyRouter";
var cors = require('cors')
const express = require('express');
const path = require('path')
const app = express();
const port = 3625; 

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

export const startHTTPServer=()=>{
    app.use(cors(corsOptions))
    app.use(express.json());
    app.use("/api/user",userRouter);
    app.use("/api/guest",guestRouter);
    app.use("/api",subjectRouter);
    app.use("/api",uploadFileRouter);
    app.use("/api",completerRoutes);
    app.use("/api/support",suportRouter);
    app.use("/api",fcmRoutes);
    app.use("/api",payNotifyRouter);
    
    app.listen(port, async() => {
    const initDb:boolean= await inittializeDB.initializeModelDB()
    firebaseService.initialize()
    startBotProcess()
    if(!initDb){
        throw new Error("no init DB")
    }
    console.log(`Сервер запущен на http://localhost:${port}`);
    });
}


