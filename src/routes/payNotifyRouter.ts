import express from 'express';
import multer from 'multer';
const payNotifyRouter = express.Router();
import PayNotifyController from "../controllers/payNotifyController";


payNotifyRouter.post("/pay_notify",PayNotifyController.transaction);


export default payNotifyRouter;