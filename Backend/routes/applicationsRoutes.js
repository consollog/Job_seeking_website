import express from 'express'
import { JobseekerDeleteApplications, JobseekerGetApplication, employerGetApplication, postApplications } from "../controller/applications.js"
import { isAuthrized } from "../middleware/auth.js"
const routes = express.Router();

routes.get("/jobseeker/getall", isAuthrized, JobseekerGetApplication)
routes.get("/employer/getall", isAuthrized, employerGetApplication)
routes.delete("/delete/:id", isAuthrized, JobseekerDeleteApplications)
routes.post("/post", isAuthrized, postApplications)

export default routes;