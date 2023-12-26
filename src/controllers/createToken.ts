import { secret_key } from "./secret_key";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  try {

    // Creating token for user
    const token = jwt.sign(user, secret_key, { expiresIn: "45m" });

    // Creating RefreshToken for user
    const refresh_token = jwt.sign(user, secret_key, { expiresIn: "1d" });

    return { token, refresh_token }
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

export default createToken