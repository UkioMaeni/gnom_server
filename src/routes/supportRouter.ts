const express = require('express');
const suportRouter = express.Router();
import Supportontroller from "../controllers/supportController";

suportRouter.post("/request",Supportontroller.request);

// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default suportRouter;