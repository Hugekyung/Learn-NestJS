import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
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
}
