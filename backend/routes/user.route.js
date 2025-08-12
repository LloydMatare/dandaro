import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/", protectedRoute, getUsers);

export default router;
