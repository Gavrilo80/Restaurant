import { Router, request, response } from "express";
import verifyToken from "./controllers/verifyToken";
import PublicRoutes from "./public";
import CustomerRoutes from "./customer";
import UserRoutes from "./user";

const router = Router();

router.use("/public", PublicRoutes)
router.use(verifyToken)
router.use("/customer", CustomerRoutes)
router.use("/user", UserRoutes)
// add other routes...

export default router