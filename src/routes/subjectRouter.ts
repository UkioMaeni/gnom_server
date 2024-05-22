const express = require('express');
const subjectRouter = express.Router();
import multer from "multer";
import SubjectController from "../controllers/subjectController";

const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage });
subjectRouter.post("/subject/math",uploadMiddleWare.single("photo"),SubjectController.math);


export default subjectRouter;