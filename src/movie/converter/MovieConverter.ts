import { MovieDto } from "../dto/MovieDto";
import { MovieModel } from "../model/MovieModel";

export class MovieConverter {
    static toDto({ id, title, actors }: MovieModel): MovieDto {
        return {
            id,
            title,
            actors,
        };
    }

    static toDtoList(val: MovieModel[]): MovieDto[] {
        return val.map(({ id, title, actors }: MovieModel) => {
            return {
                id,
                title,
                actors,
            };
        });
    }

    static toModel({ id, title, actors }: MovieDto): MovieModel {
        return {
            id,
            title,
            actors,
        };
    }
}
