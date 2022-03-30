import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}
