export interface ActorDto {
    id?: number;
    name: string;
    connectedActors?: string[];
}

export interface DegreesOfSeparationDto {
    actorOneName: string;
    actorTwoName: string;
}
