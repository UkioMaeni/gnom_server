require("dotenv").config();
import {startHTTPServer} from "./src/server/httpServer"
import {startHTTPSServer} from "./src/server/httpsServer"
import mailer from "./src/service/mailer/mailer"
startHTTPServer();
startHTTPSServer();
//mailer.sendMessage();
