import { Sequelize } from "sequelize/types";

const { Model } = require("sequelize");

export class ActorModel extends Model {
    id?: number;
    name: string;
    connectedActors?: string[];
}
