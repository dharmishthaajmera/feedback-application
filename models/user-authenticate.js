"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  class userAuthenticate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "users",
      });
    }
  }
  userAuthenticate.init(
    {
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      token_id: {
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userAuthenticate",
      tableName: "user_authenticate",
    }
  );
  return userAuthenticate;
};
