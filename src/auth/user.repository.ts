import {
    ConflictException,
    InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { AuthCredentialsDto } from "./dto/auth-credentialsDto.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, board } = authCredentialsDto;

        const salt = await bcrypt.genSalt(); // hash에 붙여줄 unique한 값
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword, board });

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

    async findByUserName(username): Promise<User> {
        const user = await this.findOne({ username });
        return user;
    }
}
