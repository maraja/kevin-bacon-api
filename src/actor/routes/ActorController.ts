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
import { ActorDto } from "../dto/ActorDto";
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
