"use strict";
const { Model, Sequelize, NOW } = require("sequelize");
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
        as: "users_token_fk",
        onDelete: "cascade",
      });
    }
  }
  userAuthenticate.init(
    {
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
      },
      token_id: {
        type: Sequelize.STRING,
      },
      token_id: {
        type: Sequelize.INTEGER,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry_time: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.NOW(),
      },
    },
    {
      sequelize,
      modelName: "userAuthenticate",
      tableName: "user_authenticate",
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["user_id", "token_id"],
        },
      ],
    }
  );
  return userAuthenticate;
};
