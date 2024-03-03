import { DataTypes } from "sequelize";

import db from "../db";
import { ITokenModel } from "../interfaces/tokenInterface";

const TokenModel = db.define<ITokenModel>(
  "TokenModel",
  {
    key: { type: DataTypes.STRING, allowNull: true },
    code: { type: DataTypes.STRING, unique: true },
    type: { type: DataTypes.STRING, allowNull: false },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "token",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default TokenModel;
