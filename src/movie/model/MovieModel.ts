const { Model } = require("sequelize");
import { ActorModel } from "../../actor/model/ActorModel";

export class MovieModel extends Model {
    id?: number;
    title: string;
    actors: string[];
}
