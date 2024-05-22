const express = require('express');
const tokenRouter = express.Router();
import TokenController from "../controllers/tokenController";

tokenRouter.post("/",TokenController.createUser);
// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default tokenRouter;