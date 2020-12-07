import { ActorModel } from "../model/ActorModel";

export class ActorService {
    public static async saveActor(actor: ActorModel) {
        try {
            await ActorModel.create({
                id: actor.id,
                title: actor.title,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public static async updateActor(actor: ActorModel) {
        try {
            await ActorModel.update(
                {
                    title: actor.title,
                },
                {
                    where: {
                        id: actor.id,
                    },
                }
            );
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async getActorById(actorId: string): Promise<ActorModel> {
        try {
            const resp = await ActorModel.findByPk(actorId);

            if (typeof resp !== "undefined" && resp !== null) {
                return resp;
            } else {
                throw new Error(`Actor ${actorId} not found`);
            }
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async listActors(): Promise<ActorModel[]> {
        try {
            return await ActorModel.findAll();
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async deleteActor(actorId: string) {
        try {
            const deletedRows = await ActorModel.destroy({
                where: {
                    id: actorId,
                },
            });

            console.log(`deleted ${deletedRows} rows`);
            if (deletedRows === 0) {
                throw new Error(`Actor ${actorId} not found`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
