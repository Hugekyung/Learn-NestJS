import { User } from "src/auth/user.entity";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { BoardStatus } from "./board-status.enum";

// * Mongoose에서 컬렉션의 각 컬럼 속성과 타입 등을 지정하는 Schema를 선언하는 것과 비슷하다
@Entity() // Entity임을 나타내는 데코레이터
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    // user객체는 userId로서 Board 테이블의 FK가 된다
    @ManyToOne((type) => User, (user) => user.board, { eager: false })
    user: User;
}
