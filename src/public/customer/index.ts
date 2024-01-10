import { Router, request, response } from "express";
import Customer from "../../models/Customer";
import FoodMenu from "../../models/FoodMenu";
import createToken from "../../controllers/createToken";
import bcrypt from "bcryptjs";
import { regex } from "../../controllers/secret_key";
import rewardOnRegister from "../../hooks/rewardOnRegister";

const router = Router();

router.get("/", (req: request, res: response) => {
  res.json({
    message: "Wecome to our site! We are glad you are here with us! For more information please register or log in. Thank You"
  })
});

router.get("/foodmenu", async (req: request, res: response) => {
  const food_menu = await FoodMenu.findAll()
  res.json(food_menu)
})



router.post("/register", async (req: request, res: response) => {
  try {
    // Customer credentials
    const { username, email, password, phone } = req.body;

    // Customer Visitor input
    if (!(username && email && password)) {
      return res.status(400).send("All Input Is Required!!!");
    }

    if (!regex.test(email)) {
      return res.status(400).send({ message: "Email Is Not Valid" });
    }

    // check if Visitor already exist
    // Validate if Visitor exist in our database
    const old_customer = await Customer.findOne({ where: { email } })
    if (old_customer) {
      return res.status(409).send("Visitor Already Exist. Please Login")
    }

    // Encrypt Customer password
    const encrypt_password = await bcrypt.hash(password, 10);

    // Create Visitor in our DataBase
    const customer = (await Customer.create({
      username,
      phone,
      email,
      password: encrypt_password
    })) as any;
    console.log(customer);

    // Create token for Visitor
    const { token, refresh_token } = createToken({ user_id: customer.id, email, roles: customer.roles })

    // Save Visitor and Token in our DataBase
    const result = {
      ...{
        username: customer.username,
        email: customer.email,
        phone: customer.phone,
        roles: customer.roles
      }, ...{ token, refresh_token }
    }

    res.json({
      message: "Thank you for registering and welcome to our site",
      result
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Reword for visitor on register
Customer.afterCreate('', rewardOnRegister)


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


export default router;