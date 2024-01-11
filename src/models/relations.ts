import Customer from "./Customer";
import Orders from "./Orders";
import Reward from "./Reward";
import FoodMenu from "./FoodMenu";
import FoodmenuOrders from "./FoodmenuOrders";

async function setModelRelations() {
  try {
    Customer.hasMany(Orders, { onDelete: "CASCADE" });
    Orders.belongsTo(Customer, { onDelete: "CASCADE" });

    Reward.hasMany(Orders);
    Orders.belongsTo(Reward);

    FoodMenu.belongsToMany(Orders, { through: FoodmenuOrders })
    Orders.belongsToMany(FoodMenu, { through: FoodmenuOrders })

    console.log("✅ Model realtions set.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default setModelRelations;