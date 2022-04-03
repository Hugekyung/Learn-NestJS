import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/creat-board.dto";
import { v4 as uuidV4 } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";
import { User } from "src/auth/user.entity";

@Injectable() // 서비스 전체에서 사용할 수 있게 "주입가능한"이라는 뜻의 데코레이터 작성
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository) // 해당 repository를 사용한다는 의미
        private boardRepository: BoardRepository,
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.getBoardList();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.getBoardById(id);

        if (!found) {
            throw new NotFoundException("일치하는 board가 없습니다.");
        }

        return found;
    }

    async deleteBoard(id: number): Promise<object> {
        const found = await this.boardRepository.getBoardById(id);

        if (!found) {
            throw new NotFoundException("일치하는 board가 없습니다.");
        }

        await this.boardRepository.deleteBoardById(id);
        return { message: "Board deleted successfully" };
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        let found = await this.boardRepository.getBoardById(id);

        if (!found) {
            throw new NotFoundException("일치하는 board가 없습니다.");
        }

        found = await this.boardRepository.updateBoardStatus(found, status);
        return found;
    }
}
