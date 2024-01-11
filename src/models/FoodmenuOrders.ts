import { connection, DataTypes } from "../../dbConfig/connection";

const FoodmenuOrders = connection.define(
  "foodmenu_orders",
  {
    // Model attributes are defined here
    foodMenuId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    }
  })

export default FoodmenuOrders