import express from "express";
import { getOnboardEmployeeDetails, saveEmployeeOnboardDetails } from "../controllers/onboardController.js";



const router = express.Router();

router.post("/saveOnboardData",saveEmployeeOnboardDetails);
router.get("/:registrationId",getOnboardEmployeeDetails);

export default router;

