const express = require('express');
const userRouter = express.Router();
import UserController from "../controllers/userController";

userRouter.post("/",UserController.createUser);
userRouter.post("/otp",UserController.otp);
userRouter.post("/verifyotp",UserController.verifyOtp);
userRouter.get("/requests_info",UserController.requestsInfo);
userRouter.put("/refresh",UserController.refresh);
userRouter.post("/profile",UserController.profile);
userRouter.get("/find",UserController.find);
userRouter.get("/unread_messages",UserController.checkUnreadMessages);
// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default userRouter;