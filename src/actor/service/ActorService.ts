import { ActorModel } from "../model/ActorModel";

import { DegreesOfSeparationDto } from "../dto/ActorDto";

import { actorsStub } from "./ActorData";

export class ActorService {
    public static async saveActor({ name, connectedActors }: ActorModel) {
        try {
            const result = await ActorModel.create({
                name,
                connectedActors,
            });

            return result;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public static async updateActor({ id, name }: ActorModel) {
        try {
            await ActorModel.update(
                {
                    name,
                },
                {
                    where: {
                        id,
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
            // const resp = await ActorModel.findByPk(actorId);
            const actors = await actorsStub();
            const actor = actors.find((a) => a.id === parseInt(actorId));

            if (actor) {
                return actor;
            } else {
                throw new Error(`Actor ${actorId} not found`);
            }
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async degreesOfSeparation(
        twoActors: DegreesOfSeparationDto,
        maxDepth = 3
    ): Promise<number> {
        try {
            // const resp = await ActorModel.findByPk(actorId);
            const actorOne = await this.getActorByName(twoActors.actorOneName);

            if (actorOne) {
                const visited = [];
                let queue = [];
                visited.push(actorOne.name);
                queue.push(actorOne.name);
                queue.push(null);
                let level = 0;
                while (queue.length) {
                    const s = queue.shift();
                    visited.push(s);
                    console.log(s);
                    if (!s) {
                        level++;
                        queue.push(null);
                    } else if (s === twoActors.actorTwoName) return level;
                    else {
                        // console.log(s, level);
                        const currActor = await this.getActorByName(s);
                        // console.log(currActor);
                        if (currActor) {
                            currActor.connectedActors.forEach((n) => {
                                if (!visited.includes(n)) {
                                    queue.push(n);
                                }
                            });
                            // if (currActor.connectedActors.length)
                            //     queue.push(null);
                        }
                    }
                    if (level === maxDepth) {
                        queue = [];
                        return -1;
                    }
                }
            } else {
                throw new Error(`Actor ${twoActors.actorOneName} not found`);
            }
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async getActorByName(actorName: string): Promise<ActorModel> {
        try {
            const actors = await actorsStub();
            const actor = actors.find((a) => a.name === actorName);

            return actor;
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async listActors(): Promise<ActorModel[]> {
        try {
            // return await ActorModel.findAll();
            return await actorsStub();
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
