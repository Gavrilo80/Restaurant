import Orders from "../models/Orders";
import Reward from "../models/Reward";

const rewardOnRegister = async (user) => {
  try {
    await user.createOrder({ name: '' })
    const order = await Orders.findOne({
      where: {
        //@ts-ignore
        customerId: user.id
      }
    })

    const reword = await Reward.findOne() as any

    await reword.addOrders(order)

  } catch (error) {
    console.error("Something went wrong.");
  }
}

export default rewardOnRegister