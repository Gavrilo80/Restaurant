import { Router, request, response } from "express";
import FoodMenu from "../../models/FoodMenu";

const router = Router();

router.post("/", async (req: request, res: response) => {
  const { food_name, price } = req.body
  const foodMenu = await FoodMenu.create({ food_name, price })
  res.json(foodMenu)
})

router.get("/", async (req: request, res: response) => {
  const foodMenu = await FoodMenu.findAll()
  res.json(foodMenu)
})


router.put("/:id", async (req: request, res: response) => {
  const { food_name, price } = req.body

  const foodMenu = await FoodMenu.update({ food_name, price }, {
    where: { id: req.params.id }
  })
  res.json(foodMenu)
})

router.delete("/:id", async (req: request, res: response) => {
  const foodMenu = await FoodMenu.destroy({
    where: { id: req.params.id }
  })
  res.json(foodMenu)
})

export default router