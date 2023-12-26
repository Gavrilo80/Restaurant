import { Router, request, response } from "express";
import Customer from "../../models/Customer";
import Orders from "../../models/Orders";
import Reward from "../../models/Reward";

const router = Router();

router.get("/", async (req: request, res: response) => {
  const orders = await Orders.findAll({
    where: { CustomerId: req.authEntety.user_id },
    include: Reward
  })
  res.json({ message: "Customer order with id!", orders: orders });
});


router.post("/", async (req: request, res: response) => {
  const { food_menu, drink_menu, total_ammount } = req.body;

  const customer = await Customer.findOne({
    where: { id: req.authEntety.user_id }
  }) as any;

  const orders = await customer.createOrder({ food_menu, drink_menu, total_ammount });

  // Reward for the customer when entering the ammount 
  if (orders.total_ammount >= 1000 && orders.total_ammount < 1999) {

    orders.setReward(2)

  } else if (orders.total_ammount >= 2000 && orders.total_ammount < 2999) {

    orders.setReward(3)

  } else if (orders.total_ammount >= 3000 && orders.total_ammount < 3999) {

    orders.setReward(4)

  } else if (orders.total_ammount >= 4000) {

    orders.setReward(5)

  }
  else {
    return res.send("Thanks for Ordering!")
  }

  res.json({ message: "Create Order For Customer", orders });
});

router.put("/:id", async (req: request, res: response) => {
  const { food_menu, drink_menu, total_ammount } = req.body;

  // The case where it is changed via the catering id
  const orders = await Orders.update({ food_menu, drink_menu, total_ammount }, {
    where: {
      customerId: req.authEntety.user_id
    }
  })

  res.json({ message: "Our order is Updated!", orders })
})


router.delete("/:id", async (req: request, res: response) => {
  const orders = await Orders.destroy({
    where: {
      id: req.params.id
    }
  })

  res.json(orders);
})




export default router;