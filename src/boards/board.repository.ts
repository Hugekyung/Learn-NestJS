import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/creat-board.dto";

// * DB에 직접 접근해 데이터를 조회하거나 조작하는 역할을 수행하는 영역
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
    async getBoardById(id: number): Promise<Board> {
        return await this.findOne(id);
    }

    async getBoardList(): Promise<Board[]> {
        const boardList = await this.find();
        return boardList;
    }

    async getBoardsByUserId(userId: number): Promise<Board[]> {
        const query = this.createQueryBuilder("board");

        query.where("board.userId = :userId", { userId: userId });

        const boards = await query.getMany(); // query문에 해당하는 모든 데이터
        return boards;
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User,
    ): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
        });

        await this.save(board);
        return board;
    }

    async deleteBoardById(id: number): Promise<void> {
        await this.delete(id);
    }

    async updateBoardStatus(board: Board, status: BoardStatus): Promise<Board> {
        board.status = status;
        await this.save(board);
        return board;
    }
}
