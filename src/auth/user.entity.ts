import { Board } from "src/boards/board.entity";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";

@Entity()
@Unique(["username"]) // 배열에다 유니크하게 설정할 컬럼을 지정한다
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // oneToMany 필드(3개의 파라미터가 필요) - 타입, 접근방식, user를 가져올 때 관련된 board를 모두 가져올지 여부
    @OneToMany((type) => Board, (board) => board.user, { eager: true })
    board: Board[];
}
