import { Router, request, response } from "express";
import Customer from "../../models/Customer";

const router = Router();

router.get("/", async (req: request, res: response) => {
  const customer = await Customer.findOne({
    where: { id: req.authEntety.user_id }
  })

  res.json(customer)
})

router.put("/:id", async (req: request, res: response) => {
  res.json("everything updated Successfully!")
})


export default router