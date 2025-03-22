import express from 'express';
import multer from 'multer';
const payNotifyRouter = express.Router();
import PayNotifyController from "../controllers/payNotifyController";


payNotifyRouter.post("/pay_notify",PayNotifyController.paymentHook);
payNotifyRouter.post("/init",PayNotifyController.init);
payNotifyRouter.get("/pay_items",PayNotifyController.payItems);

export default payNotifyRouter;