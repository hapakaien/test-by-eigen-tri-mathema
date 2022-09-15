import { Module } from '@nestjs/common';
import { MemberController } from '../../adapter/controllers/member.controller';
import { IBookRepository } from '../../core/interfaces/book.interface';
import { IMemberRepository } from '../../core/interfaces/member.interface';
import { FindAllMemberWithBookCount } from '../../core/use-cases/find-all-members-with-book-count.use-case';
import { MemberBorrowBook } from '../../core/use-cases/member-borrow-book.use-case';
import { MemberReturnsBook } from '../../core/use-cases/member-returns-book.use-case';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';

@Module({
	imports: [],
	providers: [
		FindAllMemberWithBookCount,
		MemberBorrowBook,
		MemberReturnsBook,
		{ provide: IMemberRepository, useClass: MemberRepository },
		{ provide: IBookRepository, useClass: BookRepository },
	],
	controllers: [MemberController],
})
export class MemberModule {}
