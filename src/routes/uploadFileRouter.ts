import express from 'express';
import multer from 'multer';
const uploadFileRouter = express.Router();
import UploadFileController from "../controllers/uploadFileController";

const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage });

uploadFileRouter.post("/upload",uploadMiddleWare.single("file"),UploadFileController.upload);


export default uploadFileRouter;