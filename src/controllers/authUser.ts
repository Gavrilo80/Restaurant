import Customer from "../models/Customer";

const authUser = (...roles) => {
  return async (req, res, next) => {
    const customer = await Customer.findOne({ where: { id: req.authEntety.user_id } }) as any
    if (!roles.includes(customer.roles)) {
      return res.status(401).json("You dont have permission!");
    }
    next()
  }
}

export default authUser