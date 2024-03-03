import { DataTypes } from "sequelize";

import db from "../db";
import { IUserModel } from "../interfaces/userInterface";

const UserModel = db.define<IUserModel>(
  "UserModel",
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING, allowNull: true },
    isEmailVerified: { type: DataTypes.STRING, allowNull: true },
    accountStatus: { type: DataTypes.STRING, allowNull: true },
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
    tableName: "user",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default UserModel;
