import { ActorModel } from "../../actor/model/ActorModel";
import { MovieModel } from "../../movie/model/MovieModel";
const { DataTypes } = require("sequelize");

export function InitModel(sequelize) {
    // ActorModel.associate = (models) => {
    //     ActorModel.hasMany(ActorModel, { as: "connectedActors" });
    // };
    ActorModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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

    // MovieModel.associate = (models) => {
    //     MovieModel.hasMany(ActorModel, { as: "actors" });
    // };
    MovieModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: DataTypes.TEXT,
            actors: DataTypes.ARRAY(DataTypes.TEXT),
        },
        {
            tableName: "movie",
            createdAt: false,
            updatedAt: false,
            sequelize, // We need to pass the connection instance
        }
    );
}
