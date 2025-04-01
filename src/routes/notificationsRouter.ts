import express from 'express';
const notificationsRouter = express.Router();
import NotificationsController from "../controllers/notificationsController";


notificationsRouter.get("/get_notify",NotificationsController.getNotifications);


export default notificationsRouter;