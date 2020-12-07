import { ActorDto } from "../dto/ActorDto";
import { ActorModel } from "../model/ActorModel";

export class ActorConverter {
    static toDto({ id, name, connectedActors }: ActorModel): ActorDto {
        return {
            id,
            name,
            connectedActors,
        };
    }

    static toDtoList(val: ActorModel[]): ActorDto[] {
        return val.map(({ id, name, connectedActors }: ActorModel) => {
            return {
                id,
                name,
                connectedActors,
            };
        });
    }

    static toModel({ id, name, connectedActors }: ActorDto): ActorModel {
        return {
            id,
            name,
            connectedActors,
        };
    }
}
