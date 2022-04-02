import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentialsDto.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, password });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException("이미 존재하는 username입니다.");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
