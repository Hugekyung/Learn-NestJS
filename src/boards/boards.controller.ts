import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/creat-board.dto";
import { Board } from "./board.model";

@Controller("boards")
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get("/")
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Get("/:id")
    getBoardById(@Param("id") id: string): Board {
        return this.boardsService.getBoard(id);
    }

    @Post()
    createBoard(
        // 클라이언트에서 보낸 request의 body값은 @Body() body를 통해 얻을 수 있다
        // 아래와 같이 body 전체가 아닌 특정 값만 얻기 위해 쓸 수도 있다
        // @Body("title") title: string,
        // @Body("description") description: string,
        @Body() createBoardDto: CreateBoardDto,
    ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }
}
