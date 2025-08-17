import { Router } from "express";
import axios from "axios";
import { addToHistory, getUserHistory, login, register } from "../controllers/userController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/addtoactivity").post(addToHistory);
router.route("/getallactivity").get(getUserHistory);

export default router;