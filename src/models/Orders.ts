import { connection, DataTypes } from "../../dbConfig/connection";

const Orders = connection.define(
  "orders",
  {
    // Model attributes are defined here
    food_menu: {
      type: DataTypes.STRING,
    },

    drink_menu: {
      type: DataTypes.STRING,
    },
    total_ammount: {
      type: DataTypes.FLOAT
    }
  },
  {
    // Other model options go here
  }
);

export default Orders;