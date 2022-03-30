import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "board-app",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true, // 애플리케이션 실행 시 엔티티 안에서 수정된 컬럼 길이, 타입변경 등을 반영항 테이블 생성
};
