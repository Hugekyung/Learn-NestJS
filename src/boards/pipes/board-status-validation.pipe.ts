import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

// * 커스텀 파이프라인을 만드려면 PipeTransform이라는 인터페이스를 상속받아야 한다
export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(
                `${value} is not a valid board status`,
            );
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
