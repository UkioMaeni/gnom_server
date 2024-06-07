const express = require('express');
const subjectRouter = express.Router();
import multer from "multer";
import SubjectController from "../controllers/subjectController";

const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage });
subjectRouter.post("/subject",uploadMiddleWare.single("file"),SubjectController.request);

export default subjectRouter;