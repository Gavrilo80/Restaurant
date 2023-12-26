import jwt from "jsonwebtoken";
import { secret_key } from "./secret_key";
import BlackListToken from "../models/BlackListToken";


const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    // Check if the token is already blacklisted
    const old_token = await BlackListToken.findOne({
      where: { token }
    });
    if (old_token) return res.status(403).send('Forbidden');

    // Verify user
    const decoded = jwt.verify(token, secret_key);
    req.authEntety = decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    else {
      return res.status(401).send("Invalid Token");
    }
  }
  return next();
}

export default verifyToken