import { Router, request, response } from "express";
import Customer from "../../models/Customer";
import Orders from "../../models/Orders";
import Reward from "../../models/Reward";
import FoodMenu from "../../models/FoodMenu";
import FoodmenuOrders from "../../models/FoodmenuOrders";

const router = Router();

router.get("/", async (req: request, res: response) => {
  const orders = await Orders.findAll({
    where: { CustomerId: req.authEntety.user_id },
    include: Reward
  })
  res.json({ message: "Customer order with id!", orders });
});

router.post("/", async (req: request, res: response) => {
  const orderItems = req.body;

  // You extract the total amount from the quantity and price 
  let totalOrderPrice = 0;
  for (const orderItem of orderItems) {
    const foodMenuItem = await FoodMenu.findOne({ where: { id: orderItem.id } }) as any
    totalOrderPrice += (orderItem.quantity ?? 1) * foodMenuItem.price;
  }

  // Create a order with the total amount and the customer ID
  const order = await Orders.create({
    total_ammount: totalOrderPrice,
    customerId: req.authEntety.user_id
  }) as any

  // Reward for the customer depending on the amount
  if (order.total_ammount >= 20 && order.total_ammount < 29) {

    order.setReward(2)

  } else if (order.total_ammount >= 30 && order.total_ammount < 39) {

    order.setReward(3)

  } else if (order.total_ammount >= 40 && order.total_ammount < 49) {

    order.setReward(4)

  } else if (order.total_ammount >= 50) {

    order.setReward(5)

  }

  // Fill in the table model with all the necessary data
  for (const orderItem of orderItems) {
    await FoodmenuOrders.create({
      foodMenuId: orderItem.id,
      orderId: order.id,
      quantity: orderItem.quantity
    })
  }

  res.json({ message: "Order Created Successfully!", order })
})


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