import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class BorrowBookDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	@Min(1)
	book_id: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Max(2)
	quantity: number;
}

export class ReturnBookDto extends BorrowBookDto {}
