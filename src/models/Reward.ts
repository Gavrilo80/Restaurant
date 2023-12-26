import { connection, DataTypes } from "../../dbConfig/connection";

const Reward = connection.define(
  "reward",
  {
    // Model attributes are defined here
    pizza: {
      type: DataTypes.INTEGER
    },
    meal: {
      type: DataTypes.INTEGER
    },
    drink: {
      type: DataTypes.INTEGER
    }
  });

export default Reward;