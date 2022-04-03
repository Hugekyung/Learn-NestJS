import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: "SecretJWT1234",
            signOptions: {
                expiresIn: "1h",
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ], // UserRepository를 사용하기 위해 선언
    controllers: [AuthController],
    // JwtStrategy를 Auth 모듈 내에서 사용할 수 있도록 등록
    providers: [AuthService, JwtStrategy],
    // 다른 모듈들에서도 사용할 수 있도록 exports에 등록
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
