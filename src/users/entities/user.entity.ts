import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Transform } from "class-transformer";

export class UserEntity implements User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: Number })
    age: number
}
