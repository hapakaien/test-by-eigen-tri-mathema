import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Book } from '../../core/entities/book.entity';
import {
	BorrowedBook,
	IBookRepository,
} from '../../core/interfaces/book.interface';

@Injectable()
export class BookRepository implements IBookRepository {
	constructor(@InjectKnex() private readonly knex: Knex) {}

	async findOneBorrowed(
		memberId: number,
		bookId: number,
		quantity: number,
	): Promise<BorrowedBook | null> {
		const bookRecord = await this.knex('books')
			.join('member_books', 'books.id', 'member_books.book_id')
			.join('members', 'member_books.member_id', 'members.id')
			.where('books.id', bookId)
			.where('members.id', memberId)
			.where('member_books.quantity', '>=', quantity)
			.first<
				Omit<BorrowedBook, 'memberBookId' | 'borrowedAt'> & {
					borrowed_at: string;
					member_book_id: number;
				}
			>([
				'books.code',
				'books.title',
				'books.author',
				'books.stock',
				'member_books.quantity',
				this.knex.raw('member_books.id as member_book_id'),
				this.knex.raw('member_books.created_at as borrowed_at'),
			]);

		if (!bookRecord) {
			return null;
		}

		const { member_book_id, borrowed_at, ...record } = bookRecord;

		const book = {
			memberBookId: member_book_id,
			borrowedAt: new Date(borrowed_at),
			...record,
		};

		return book;
	}

	async returnOne(
		memberId: number,
		bookId: number,
		quantity: number,
	): Promise<void> {
		const trx = await this.knex.transaction();

		const book = await this.findOneBorrowed(memberId, bookId, quantity);

		const { memberBookId, quantity: borrowedQty, stock } = book as BorrowedBook;

		if (quantity < borrowedQty) {
			await trx('member_books')
				.where('id', memberBookId)
				.update({ quantity: borrowedQty - quantity });
		} else {
			await trx('member_books').where('id', memberBookId).delete();
		}

		await trx('books')
			.where('id', bookId)
			.update({ stock: stock + quantity });

		await trx.commit();
	}

	async findAllThatHaveNotBeenBorrowed(): Promise<Book[]> {
		const books: Book[] = await this.knex
			.table('books')
			.select(['books.code', 'books.title', 'books.author', 'books.stock'])
			.from('books')
			.leftOuterJoin('member_books', 'books.id', 'member_books.book_id')
			.leftOuterJoin('members', 'member_books.member_id', 'members.id')
			.whereNull('member_books.book_id')
			.where('books.stock', '>', 0);

		return books;
	}

	async findOneThatHaveNotBeenBorrowed(
		id: number,
		quantity: number,
	): Promise<Book | null> {
		const book = await this.knex
			.table('books')
			.from('books')
			.leftOuterJoin('member_books', 'books.id', 'member_books.book_id')
			.leftOuterJoin('members', 'member_books.member_id', 'members.id')
			.where('books.id', id)
			.whereNull('member_books.book_id')
			.where('books.stock', '>=', quantity)
			.first<Book | null>([
				'books.id',
				'books.code',
				'books.title',
				'books.author',
				'books.stock',
			]);

		if (!book) {
			return null;
		}

		return book;
	}

	async borrowOne(
		memberId: number,
		bookId: number,
		quantity: number,
	): Promise<Book> {
		const trx = await this.knex.transaction();

		const bookIds = await trx('member_books')
			.insert({
				member_id: memberId,
				book_id: bookId,
				quantity,
			})
			.returning<{ book_id: string }[]>(['book_id']);

		const { book_id } = bookIds[0];

		const borrowedBook = await trx
			.table('books')
			.from('books')
			.join('member_books', 'books.id', 'member_books.book_id')
			.join('members', 'member_books.member_id', 'members.id')
			.where('books.id', book_id)
			.first<Book>([
				'books.code',
				'books.title',
				'books.author',
				'books.stock',
			]);

		await trx('books')
			.where('id', book_id)
			.update({ stock: borrowedBook.stock - quantity });

		await trx.commit();

		return borrowedBook;
	}
}
