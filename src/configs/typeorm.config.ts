import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";

const dbConfig = config.get("db");

// TypeORM을 NEST에 연동하기 위한 DB 설정 내용들
export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: dbConfig.synchronize, // 애플리케이션 실행 시 엔티티 안에서 수정된 컬럼 길이, 타입변경 등을 반영항 테이블 생성
};
