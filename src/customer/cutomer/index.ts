import { Router, request, response } from "express";
import Customer from "../../models/Customer";
import bcrypt from "bcryptjs";

const router = Router();

router.get("/", async (req: request, res: response) => {
  const customer = await Customer.findOne({
    where: { id: req.authEntety.user_id }
  })

  res.json(customer)
})

router.put("/:id", async (req: request, res: response) => {
  const { email, phone, username, password } = req.body;

  const customer = await Customer.findOne({ where: { id: req.authEntety.user_id } }) as any;
  // console.log('req.params.id:', req.params.id); String
  // console.log('customer.id:', customer.id);  Number

  // Checks if it a logged in user
  if (req.params.id != customer.id) {
    return res.status(401).json({ error: 'Unauthorized!!!' });
  }

  // Authenticate the user first
  if (!customer || !(await bcrypt.compare(password, customer.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If authentication is successful, update the user's information
  const updateCustomer = await Customer.update({
    email,
    phone,
    username,
    password: await bcrypt.hash(password, 10)
  }, {
    where: { id: req.params.id }
  })
  res.json({ message: "Everything Updated Successfully!", updateCustomer })
})


export default router