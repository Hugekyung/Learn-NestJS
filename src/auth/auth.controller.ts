import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentialsDto.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signup")
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Get("/signin")
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post("/test")
    @UseGuards(AuthGuard()) // 인증처리 -> AuthGuard는 passport에서 req.user객체에 유저정보를 넣어주는 역할 처리
    test(@Req() req) {
        console.log("req >> ", req.user);
    }
}
