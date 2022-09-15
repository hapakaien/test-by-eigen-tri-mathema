import { Injectable } from '@nestjs/common';
import type { Book } from '../entities/book.entity';

export interface BookRow extends Book {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface RequestBook {
	memberId: number;
	bookId: number;
	quantity: number;
}

export interface BorrowedBook extends Book {
	memberBookId: number;
	borrowedAt: Date;
	quantity: number;
}

export type ReturnBook = RequestBook;

@Injectable()
export abstract class IBookRepository {
	abstract findAllThatHaveNotBeenBorrowed(): Promise<Book[]>;

	abstract findOneThatHaveNotBeenBorrowed(
		id: number,
		quantity: number,
	): Promise<Book | null>;

	abstract borrowOne(
		memberId: number,
		bookId: number,
		quantity: number,
	): Promise<Book>;

	abstract findOneBorrowed(
		memberId: number,
		bookId: number,
		quantity: number,
	): Promise<BorrowedBook | null>;

	abstract returnOne(
		memberId: number,
		bookId: number,
		quantity: number,
	): Promise<void>;
}
