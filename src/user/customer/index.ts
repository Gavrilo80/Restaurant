import { Router, request, response } from "express";
import Orders from "../../models/Orders";
import Reward from "../../models/Reward";
import Customer from "../../models/Customer";

const router = Router();


router.get("/", async (req: request, res: response) => {
  const customer = await Customer.findAll({
    include: [{
      model: Orders,
      include: [Reward]
    }]
  })
  res.json({
    message: "Hello admin ,this is all data for customers",
    result: customer,
  })
});

router.post("/", async (req: request, res: response) => {
  res.json({
    message: "Admin create",
  })
});

router.put("/:id", async (req: request, res: response) => {
  res.json({
    message: "Admin update data with id ",
  });
});

router.delete("/:id", async (req: request, res: response) => {
  // In the event that a user cannot be deleted for some reason
  const customer = await Customer.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json({
    message: `Admin delete data with id: ${req.params.id}` + customer,
  });
});


export default router;