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
import { MovieDto } from "../dto/MovieDto";
import { MovieService } from "../service/MovieService";
import { MovieConverter } from "../converter/MovieConverter";

@Tags("Movie")
@Route("movie")
export class MovieController extends Controller {
    @Get("{id}")
    public async getMovie(@Path() id: string): Promise<MovieDto> {
        return MovieConverter.toDto(await MovieService.getMovieById(id));
    }

    @Get("")
    public async listMovie(): Promise<MovieDto[]> {
        return MovieConverter.toDtoList(await MovieService.listMovies());
    }

    @Post("")
    public async saveMovie(@Body() movie: MovieDto) {
        await MovieService.saveMovie(MovieConverter.toModel(movie));

        return {
            status: "Movie inserted",
        };
    }

    @Put("")
    public async updateMovie(@Body() movie: MovieDto) {
        await MovieService.updateMovie(MovieConverter.toModel(movie));

        return {
            status: "Movie updated",
        };
    }

    @Delete("{id}")
    public async deleteMovie(@Path() id: string) {
        await MovieService.deleteMovie(id);

        return {
            status: "Movie deleted",
        };
    }
}
