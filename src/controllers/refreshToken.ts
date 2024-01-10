import jwt from "jsonwebtoken";
import { secret_key } from "./secret_key";
import BlackListToken from "../models/BlackListToken";
import createToken from "./createToken";

const refreshToken = async (req, res) => {
  const refresh = req.body.refresh_token;
  if (!refresh) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // Check if the token is already blacklisted
    const oldToken = await BlackListToken.findOne({
      where: { token: refresh }
    });
    if (oldToken) return res.status(403).send('Forbidden');

    // Verify token
    const customer = jwt.verify(refresh, secret_key);
    // Create new token
    const { token } = createToken({
      user_id: customer.user_id,
      email: customer.email,
      roles: customer.roles
    });
    res.json({ token });
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};

export default refreshToken