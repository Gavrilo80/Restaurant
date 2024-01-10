import { Router, request, response } from "express";
import Customer from "../../models/Customer";
import bcrypt from "bcryptjs";
import createToken from "../../controllers/createToken";


const router = Router();

router.post("/login", async (req: request, res: response) => {
  try {
    const { email, password } = req.body;

    // Validate Visitor input
    if (!(email && password)) {
      return res.status(400).send("All input is required(email && password)");
    }
    // Validate if Visitor exist in our database
    const customer = (await Customer.findOne({
      where: { email: req.body.email },
    })) as any;

    //Check password and create token
    if (customer && (await bcrypt.compare(password, customer.password))) {

      //create token and refreshToken        
      const { token, refresh_token } = createToken({ user_id: customer.id, email, roles: customer.roles });

      const result = { token, refresh_token };
      // Visitor
      res.json(result);
    }

  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Credentials");
  }
});

export default router