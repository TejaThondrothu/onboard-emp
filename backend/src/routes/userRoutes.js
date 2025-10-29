import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  changeUserStatus,
  loginUser,
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createUser", createUser);
router.get("/",authenticateUser,getAllUsers);
router.get("/:id", getUserById);
router.get("/email/:email", getUserByEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/status", changeUserStatus);
router.post("/login", loginUser);

export default router;
