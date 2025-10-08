import express from "express";
import  {addSubmission}  from "../../controllers/submissionContoroller";

const submissionRouter = express.Router();

// ✅ Correct usage
submissionRouter.post("/", addSubmission);

export default submissionRouter;
