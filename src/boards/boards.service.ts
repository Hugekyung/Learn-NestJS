import { Injectable } from "@nestjs/common";
import { Board, BoardStatus } from "./board.model";
import { v4 as uuidV4 } from "uuid";

@Injectable() // 서비스 전체에서 사용할 수 있게 "주입가능한"이라는 뜻의 데코레이터 작성
export class BoardsService {
    private boards: Board[] = []; // db 대신 임시로 사용할 배열

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuidV4(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(board);
        return board;
    }
}
