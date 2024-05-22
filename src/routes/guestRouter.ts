const express = require('express');
const guestRouter = express.Router();
import multer from "multer";
import GuestController from "../controllers/guestController";
const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage });
guestRouter.post("/auth",GuestController.auth);
guestRouter.put("/refresh",GuestController.refresh);
guestRouter.get("/requests_info",GuestController.requestsInfo);
guestRouter.post("/request",uploadMiddleWare.single("file"),GuestController.request);
// userRouter.get("/profile/:userId",UserController.profileUser);
// userRouter.get("/find",UserController.find);
// userRouter.post("/addfriends",UserController.addFriends);
// userRouter.delete("/",UserController.createUser); 

export default guestRouter;