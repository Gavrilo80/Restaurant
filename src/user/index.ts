import { Router, request, response } from "express";
import RewardRoutes from "./reward";
import CustomerRoutes from "./customer";

const router = Router();

router.use("/rewards", RewardRoutes)
router.use("/customer", CustomerRoutes)
// add other routes...

export default router