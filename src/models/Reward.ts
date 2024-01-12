import { connection, DataTypes } from "../../dbConfig/connection";

const Reward = connection.define(
  "reward",
  {
    // Model attributes are defined here
    reward: {
      type: DataTypes.STRING
    },
  });

export default Reward;