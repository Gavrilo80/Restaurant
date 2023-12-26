import { Router, request, response } from "express";
import blacklistedTokens from "../controllers/blackkistedToken";
import CustomerRoutes from "./orders";
import Customer from "../models/Customer";

const router = Router();

router.post("/logout", (req: request, res: response) => {
  blacklistedTokens(req, res);
})

router.delete("/deleteAccount", async (req: request, res: response) => {
  const customer = await Customer.destroy({
    where: {
      id: req.authEntety.user_id
    }
  })

  res.json({ message: "You delete your account ", customer });
})


router.use("/order", CustomerRoutes);
// add other routes...

export default router
