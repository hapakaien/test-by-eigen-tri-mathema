import { ApiProperty } from '@nestjs/swagger';

export class Member {
	@ApiProperty()
	code: string;

	name: string;
}
