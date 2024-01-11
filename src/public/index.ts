import { Router, request, response } from "express";
import refreshToken from "../controllers/refreshToken";
import FoodMenuRoutes from "./foodMenu";
import PublicRoutes from "./customer";
import UserRoutes from "./user";

const router = Router();

router.post("/refresh", (req: request, res: response) => {
  refreshToken(req, res);
})

router.use("/foodmenu", FoodMenuRoutes);
router.use("/customer", PublicRoutes);
router.use("/user", UserRoutes);
// add other routes...


export default router