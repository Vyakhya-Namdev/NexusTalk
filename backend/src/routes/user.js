import { Router } from "express";
import { addToHistory, getUserHistory, login, register } from "../controllers/userController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/addtoactivity").post(addToHistory);
router.route("/getallactivity").post(getUserHistory);

export default router;