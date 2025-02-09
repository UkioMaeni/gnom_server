import userRouter from "../routes/userRouter";
import guestRouter from "../routes/guestRouter";
import subjectRouter from "../routes/subjectRouter";
import uploadFileRouter from "../routes/uploadFileRouter";
import completerRoutes from "../routes/completerRoutes";
import suportRouter from "../routes/supportRouter";
import fcmRoutes from "../routes/fcmRoutes";
import inittializeDB from "../service/inittializeDB";
import firebaseService from "../firebase/firebase"
import { startBotProcess } from "../service/tgBot/tgBot";
const express = require('express');
const path = require('path')
const app = express();
const port = 3625; 


export const startHTTPServer=()=>{
    app.use(express.json());
    app.use("/api/user",userRouter);
    app.use("/api/guest",guestRouter);
    app.use("/api",subjectRouter);
    app.use("/api",uploadFileRouter);
    app.use("/api",completerRoutes);
    app.use("/api/support",suportRouter);
    app.use("/api",fcmRoutes);
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