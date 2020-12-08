import { MovieModel } from "../model/MovieModel";
import { ActorService } from "../../actor/service/ActorService";
// import { actorsStub } from "actor/service/ActorData";

export class MovieService {
    public static async saveMovie(movie: MovieModel) {
        try {
            Promise.all(
                movie.actors.map(async (name: string) => {
                    let actor = await ActorService.getActorByName(name);
                    if (!actor) {
                        actor = await ActorService.saveActor({ name });
                    }
                    return actor.name;
                })
            ).then(async (actors) => {
                console.log(actors);

                await MovieModel.create({
                    title: movie.title,
                    actors,
                });
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    public static async updateMovie(movie: MovieModel) {
        try {
            await MovieModel.update(
                {
                    name: movie.name,
                },
                {
                    where: {
                        id: movie.id,
                    },
                }
            );
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async getMovieById(movieId: string): Promise<MovieModel> {
        try {
            const resp = await MovieModel.findByPk(movieId);

            if (!!resp) {
                return resp;
            } else {
                throw new Error(`Movie ${movieId} not found`);
            }
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async listMovies(): Promise<MovieModel[]> {
        try {
            return await MovieModel.findAll();
        } catch (error) {
            console.error(error.name);
            throw error;
        }
    }

    public static async deleteMovie(movieId: string) {
        try {
            const deletedRows = await MovieModel.destroy({
                where: {
                    id: movieId,
                },
            });

            console.log(`deleted ${deletedRows} rows`);
            if (deletedRows === 0) {
                throw new Error(`Movie ${movieId} not found`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
