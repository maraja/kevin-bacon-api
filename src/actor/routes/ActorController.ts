import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Route,
    Tags,
} from "tsoa";
import { ActorDto, DegreesOfSeparationDto } from "../dto/ActorDto";
import { ActorService } from "../service/ActorService";
import { ActorConverter } from "../converter/ActorConverter";

@Tags("Actor")
@Route("actor")
export class ActorController extends Controller {
    @Get("{id}")
    public async getActor(@Path() id: string): Promise<ActorDto> {
        return ActorConverter.toDto(await ActorService.getActorById(id));
    }

    @Get("")
    public async listActors(): Promise<ActorDto[]> {
        return ActorConverter.toDtoList(await ActorService.listActors());
    }

    @Post("")
    public async saveActor(@Body() actor: ActorDto) {
        await ActorService.saveActor(ActorConverter.toModel(actor));

        return {
            status: "Actor inserted",
        };
    }

    @Post("degrees-of-separation")
    public async degreesOfSeparation(@Body() actors: DegreesOfSeparationDto) {
        const degree = await ActorService.degreesOfSeparation(actors);

        if (degree === -1)
            return { message: "No route could be found with maximum depth." };
        else {
            return {
                message: `Route found with degree ${degree}`,
            };
        }
    }

    @Put("")
    public async updateActor(@Body() actor: ActorDto) {
        await ActorService.updateActor(ActorConverter.toModel(actor));

        return {
            status: "Actor updated",
        };
    }

    @Delete("{id}")
    public async deleteActor(@Path() id: string) {
        await ActorService.deleteActor(id);

        return {
            status: "Actor deleted",
        };
    }
}
