const express = require('express');
const completerRouter = express.Router();
import SubjectController from "../controllers/completerController"
completerRouter.post("/completer",SubjectController.complete);


export default completerRouter;