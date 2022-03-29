// ? DTO를 작성하는 방법에는 interface와 class를 이용하는 2가지 방법이 있다
// ? 클래스는 인터페이스와 달리 런타임에서 작동하므로 파이프 같은 기능을 이용할 때 유용하다
export class CreateBoardDto {
    title: string;
    description: string;
}
