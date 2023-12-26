import { connection, DataTypes } from "../../dbConfig/connection";
import { regex } from "../controllers/secret_key";

const Customer = connection.define(
  "customer",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    }
  },
  {
    // Other model options go here
    hooks: {
      beforeCreate: (user, options) => {
        if (!regex.test(user["email"])) throw new Error("Email is not valid")
      }
    }
  }
);


export default Customer;