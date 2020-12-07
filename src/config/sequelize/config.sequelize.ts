// import { environment } from "../../environments/environment";
import { Sequelize } from "sequelize";
import { InitModel } from "./init.model";

export class ConfigSequelize {
    private static _instance: ConfigSequelize = null;
    public sequelize: Sequelize = null;

    constructor() {
        if (!ConfigSequelize._instance) {
            console.log("creating instance ConfigSequelize");
            ConfigSequelize._instance = this;
        } else {
            console.log("retrieve instance ConfigSequelize");
            return ConfigSequelize._instance;
        }
    }

    public static getInstance() {
        return ConfigSequelize._instance;
    }

    public async setupConnection() {
        if (this.sequelize) {
            return;
        }
        this.sequelize = new Sequelize(
            "postgresql://postgres:postgres@localhost:5432/postgres"
        );

        console.log("Connection to database concluded");

        InitModel(this.sequelize);
    }
}
