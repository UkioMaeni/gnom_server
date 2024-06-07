const express = require('express');
const completerRouter = express.Router();
import SubjectController from "../controllers/completerController"
completerRouter.post("/completer",SubjectController.complete);
completerRouter.post("/verify",SubjectController.verify);

export default completerRouter;