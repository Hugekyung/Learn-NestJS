import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentialsDto.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findByUserName(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            return { status: 200, message: "Login success" };
        } else {
            throw new UnauthorizedException("login failed");
        }
    }
}
