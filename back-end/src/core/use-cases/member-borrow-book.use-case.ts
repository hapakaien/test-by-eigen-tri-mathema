import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { IBookRepository, RequestBook } from '../interfaces/book.interface';
import { IMemberRepository } from '../interfaces/member.interface';

@Injectable()
export class MemberBorrowBook {
	constructor(
		private readonly memberRepository: IMemberRepository,
		private readonly bookRepository: IBookRepository,
	) {}

	async execute(dto: RequestBook) {
		const { memberId, bookId, quantity } = dto;

		const member = await this.memberRepository.findOne(memberId);

		if (!member) {
			throw new NotFoundException('Member not found.');
		}

		const threeDaysAgo = new Date();
		threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

		if (member.penalized_at && member.penalized_at < threeDaysAgo) {
			throw new BadRequestException(
				'You are being penalized, and cannot borrow books.',
			);
		}

		if (quantity > 2) {
			throw new BadRequestException('You cannot borrow more than 2 books.');
		}

		const availableBook =
			await this.bookRepository.findOneThatHaveNotBeenBorrowed(
				bookId,
				quantity,
			);

		if (!availableBook) {
			throw new BadRequestException(
				'The book you are looking for has been borrowed.',
			);
		}

		const borrowedBook = this.bookRepository.borrowOne(
			memberId,
			bookId,
			quantity,
		);

		return borrowedBook;
	}
}
