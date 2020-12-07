import { ActorModel } from "../../actor/model/ActorModel";
const { DataTypes } = require("sequelize");

export function InitModel(sequelize) {
    ActorModel.associate = (models) => {
        ActorModel.hasMany(ActorModel, { as: "connectedActors" });
    };
    ActorModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: DataTypes.TEXT,
        },
        {
            tableName: "actor",
            createdAt: false,
            updatedAt: false,
            sequelize, // We need to pass the connection instance
        }
    );
}
