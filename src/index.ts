import { Router, request, response } from "express";
import verifyToken from "./controllers/verifyToken";
import authUser from "./controllers/authUser";
import PublicRoutes from "./public";
import CustomerRoutes from "./customer";
import UserRoutes from "./user";

const router = Router();

router.use("/public", PublicRoutes)
router.use("/customer", verifyToken, authUser("customer", "user", "admin"), CustomerRoutes)
router.use("/user", verifyToken, authUser("user", "admin"), UserRoutes)
// add other routes...

export default router