import {
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";
import { Board } from "src/boards/board.entity";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "password must be english and number.",
    }) // 정규표현식 패턴을 넣어 해당 패턴에 해당하는 값만 넣을 수 있게 한다
    password: string;

    board: Board[];
}
