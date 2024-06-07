const express = require('express');
const fcmRouter = express.Router();
import fcmController from "../controllers/fcmController"
fcmRouter.post("/set_token",fcmController.setToken);


export default fcmRouter;