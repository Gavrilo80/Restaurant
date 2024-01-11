import { Router, request, response } from "express";
import RewardRoutes from "./reward";
import CustomerRoutes from "./customer";
import FoodMenuRoutes from "../models/FoodMenu";

const router = Router();

router.use("/rewards", RewardRoutes)
router.use("/customer", CustomerRoutes)
router.use("/foodmenu", FoodMenuRoutes)
// add other routes...

export default router