import express from 'express'
import { Logout, Register, getEmployer, getJobseeker, getuser } from "../controller/userController.js";
import { Login } from "../controller/userController.js"
import { isAuthrized } from "../middleware/auth.js"

const routes = express.Router();
routes.post("/register", Register);
routes.post("/login", Login);
routes.get("/logout", isAuthrized, Logout);
routes.get("/getuser", isAuthrized, getuser);
routes.get("/getjobseeker", isAuthrized, getJobseeker);
routes.get("/getemployer", isAuthrized, getEmployer);
export default routes;