import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/creat-board.dto";
import { BoardStatus } from "./board-status.enum";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.entity";

@Controller("boards")
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    async getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get("/:id")
    getBoardById(@Param("id") id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete("/:id")
    deleteBoard(@Param("id", ParseIntPipe) id: number): Promise<object> {
        const res = this.boardsService.deleteBoard(id);
        return res;
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
