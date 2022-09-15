import { BadRequestException, Injectable } from '@nestjs/common';
import { IBookRepository, ReturnBook } from '../interfaces/book.interface';
import { IMemberRepository } from '../interfaces/member.interface';

@Injectable()
export class MemberReturnsBook {
	constructor(
		private readonly memberRepository: IMemberRepository,
		private readonly bookRepository: IBookRepository,
	) {}

	async execute(dto: ReturnBook) {
		const { memberId, bookId, quantity } = dto;

		const book = await this.bookRepository.findOneBorrowed(
			memberId,
			bookId,
			quantity,
		);

		if (!book) {
			throw new BadRequestException('The book you want to return is invalid.');
		}

		const today = new Date();
		const sevenDaysAgo = today;
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		if (book.borrowedAt < sevenDaysAgo) {
			await this.memberRepository.updateOne(memberId, {
				penalized_at: today.toDateString(),
				updated_at: today.toISOString(),
			});

			throw new BadRequestException(
				'You are late in returning this book, and you will be penalized for 3 days.',
			);
		}

		await this.bookRepository.returnOne(memberId, bookId, quantity);
	}
}
