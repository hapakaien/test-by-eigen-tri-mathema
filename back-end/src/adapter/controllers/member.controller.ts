import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllMemberWithBookCount } from '../../core/use-cases/find-all-members-with-book-count.use-case';
import { MemberBorrowBook } from '../../core/use-cases/member-borrow-book.use-case';
import { MemberReturnsBook } from '../../core/use-cases/member-returns-book.use-case';
import { BorrowBookDto, ReturnBookDto } from '../dto/member.dto';

@ApiTags('member')
@Controller('members')
export class MemberController {
	constructor(
		private readonly findAllMemberWithBookCount: FindAllMemberWithBookCount,
		private readonly memberBorrowBooks: MemberBorrowBook,
		private readonly memberReturnsBook: MemberReturnsBook,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all members with book count.' })
	async findAllWithBookCount() {
		const members = await this.findAllMemberWithBookCount.execute();

		return members;
	}

	@Post('borrow/:id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Member borrow books.' })
	async borrowBook(@Param('id') id: number, @Body() dto: BorrowBookDto) {
		const { book_id: bookId, ...rest } = dto;

		const books = await this.memberBorrowBooks.execute({
			memberId: id,
			bookId,
			...rest,
		});

		return books;
	}

	@Post('return/:id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Member return books.' })
	async returnBook(@Param('id') id: number, @Body() dto: ReturnBookDto) {
		const { book_id: bookId, ...rest } = dto;

		await this.memberReturnsBook.execute({
			memberId: id,
			bookId,
			...rest,
		});
	}
}
