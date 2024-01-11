import { Router, request, response } from "express";
import FoodMenu from "../../models/FoodMenu";

const router = Router()

router.get("/", async (req: request, res: response) => {
  const foodMenu = await FoodMenu.findAll({ attributes: ["price", "food_name"] })
  res.json(foodMenu)
})

export default router