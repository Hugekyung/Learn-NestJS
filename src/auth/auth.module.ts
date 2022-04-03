import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
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
    providers: [AuthService],
})
export class AuthModule {}
