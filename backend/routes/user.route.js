import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";

const router = express();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
