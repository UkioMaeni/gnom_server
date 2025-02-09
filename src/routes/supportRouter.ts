const express = require('express');
const suportRouter = express.Router();
import Supportontroller from "../controllers/supportController";
var cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

suportRouter.post("/request",cors(corsOptions),Supportontroller.request);

// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default suportRouter;