import { Injectable } from "@nestjs/common";
import { Board } from "./board.model";

@Injectable() // 서비스 전체에서 사용할 수 있게 "주입가능한"이라는 뜻의 데코레이터 작성
export class BoardsService {
    private boards: Board[] = []; // db 대신 임시로 사용할 배열

    getAllBoards(): Board[] {
        return this.boards;
    }
}
