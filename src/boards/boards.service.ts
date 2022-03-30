import { Injectable, NotFoundException } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import { CreateBoardDto } from "./dto/creat-board.dto";
import { v4 as uuidV4 } from "uuid";

@Injectable() // 서비스 전체에서 사용할 수 있게 "주입가능한"이라는 뜻의 데코레이터 작성
export class BoardsService {
    private boards: Board[] = []; // db 대신 임시로 사용할 배열

    getAllBoards(): Board[] {
        return this.boards;
    }

    getBoard(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`${id}와 일치하는 값이 없습니다.`);
        }

        return found;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuidV4(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(board);
        return board;
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoard(id);
        board.status = status;
        return board;
    }
}
