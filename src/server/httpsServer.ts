const express = require('express');
const https = require('https');
const fs = require('fs');
var cors = require('cors')
import suportRouter from "../routes/supportRouter";
const app = express();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const options = {
  key: fs.readFileSync(__dirname+'/key.pem'),
  cert: fs.readFileSync(__dirname+'/cert.pem')
};



const server = https.createServer(options, app);


export const startHTTPSServer=()=>{
    app.use(cors(corsOptions))
    app.use(express.json());
    app.use("/api/support",suportRouter);

    app.listen(3625, async() => {
    console.log(`Сервер запущен на http://localhost:${3625}`);
    });
}