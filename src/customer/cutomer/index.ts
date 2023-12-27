import { Router, request, response } from "express";
import Customer from "../../models/Customer";

const router = Router();

router.get("/", async (req: request, res: response) => {
  const customer = await Customer.findOne({
    where: { id: req.authEntety.user_id }
  })

  res.json(customer)
})


router.get("/:id", async (req: request, res: response) => {
  const customer = await Customer.findOne({
    where: { id: req.params.id }
  })

  res.json(customer)
})


export default router