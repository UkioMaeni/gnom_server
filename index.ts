require("dotenv").config();
import {startHTTPServer} from "./src/server/httpServer"
import mailer from "./src/service/mailer/mailer"
startHTTPServer();
//mailer.sendMessage();
