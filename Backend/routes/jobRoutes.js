import express from 'express';
import { GetallJob, deletejob, getsingleJob, updatejob } from '../controller/jobContoller.js';
import { postJob } from '../controller/jobContoller.js';
import { isAuthrized } from '../middleware/auth.js';
import { getmyjobs } from '../controller/jobContoller.js';

const routes = express.Router();

routes.get("/getalljob", GetallJob)
routes.post("/postJob", isAuthrized, postJob)
routes.get("/getmyjobs", isAuthrized, getmyjobs)
routes.put("/update/:id", isAuthrized, updatejob)
routes.delete("/deleteJob/:id", isAuthrized, deletejob)
routes.get("/:id", isAuthrized, getsingleJob)

export default routes;