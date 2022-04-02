import {
    BaseEntity,
    Column,
    Entity,
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
}
