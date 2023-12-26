import { connection, DataTypes } from "../../dbConfig/connection";

const BlackListToken = connection.define(
  "blackListedToken",
  {
    // Model attributes are defined here
    token: {
      type: DataTypes.STRING,
      unique: true, // Token must be uniqe,
      allowNull: false
    }
  }, {
  freezeTableName: true,
  updatedAt: false
});

export default BlackListToken;