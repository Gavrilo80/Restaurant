import { connection, DataTypes } from "../../dbConfig/connection";

const FoodMenu = connection.define(
  "foodMenu",
  {
    // Model attributes are defined here
    food_name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    }
  })

export default FoodMenu