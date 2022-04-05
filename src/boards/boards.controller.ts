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
    UseGuards,
    Logger,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/creat-board.dto";
import { BoardStatus } from "./board-status.enum";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("boards")
@UseGuards(AuthGuard()) // 모든 controller 경로에 인증절차 미들웨어 적용
export class BoardsController {
    private logger = new Logger("BoardController");
    constructor(private boardsService: BoardsService) {} // 이렇게 작성하면 생성자 작성과 함께 인스턴스 변수도 함께 초기화할 수 있다

    @Get()
    async getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get("/me")
    @UseGuards(AuthGuard())
    async getBoards(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(
            `User ${user.username} trying to get all boards ..`,
        );

        return this.boardsService.getBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        this.logger.verbose(
            `User ${user.username} trying to create board .. ${JSON.stringify(
                createBoardDto,
            )}`,
        );

        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get("/:id")
    getBoardById(@Param("id") id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete("/:id")
    deleteBoard(
        @Param("id", ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<object> {
        const res = this.boardsService.deleteBoard(id, user);
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
