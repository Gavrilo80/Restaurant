import { Router, request, response } from "express";
import Reward from "../../models/Reward";

const router = Router();

router.get("/", async (req: request, res: response) => {
  const reward = await Reward.findAll();
  res.json({
    message: "All rewards",
    reward
  })
})

router.put("/:id", async (req: request, res: response) => {
  const { pizza, meal, drink } = req.body;
  const orders = await Reward.update({ pizza, meal, drink }, {
    where: {
      id: req.params.id
    }
  });
  res.json({
    message: "update reword " + req.params.id,
    result: orders
  })
})

export default router