import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../core/entities/book.entity';
import { Member } from '../../core/entities/member.entity';
import { BookRow, RequestBook } from '../../core/interfaces/book.interface';
import { MemberRow } from '../../core/interfaces/member.interface';
import { FindAllMemberWithBookCount } from '../../core/use-cases/find-all-members-with-book-count.use-case';
import { MemberBorrowBook } from '../../core/use-cases/member-borrow-book.use-case';
import { MemberReturnsBook } from '../../core/use-cases/member-returns-book.use-case';
import { MemberController } from './member.controller';

const today = new Date();

const members: Member[] = [
	{
		code: 'M001',
		name: 'Angga',
	},
	{
		code: 'M002',
		name: 'Ferry',
	},
	{
		code: 'M003',
		name: 'Putri',
	},
];

const memberRecords: MemberRow[] = members.map((member, index) => {
	return {
		id: index + 1,
		penalized_at: null,
		created_at: today,
		updated_at: today,
		...member,
	};
});

const books: Book[] = [
	{
		code: 'JK-45',
		title: 'Harry Potter',
		author: 'J.K Rowling',
		stock: 1,
	},
	{
		code: 'SHR-1',
		title: 'A Study in Scarlet',
		author: 'Arthur Conan Doyle',
		stock: 1,
	},
	{
		code: 'TW-11',
		title: 'Twilight',
		author: 'Stephenie Meyer',
		stock: 1,
	},
	{
		code: 'HOB-83',
		title: 'The Hobbit, or There and Back Again',
		author: 'J.R.R. Tolkien',
		stock: 1,
	},
	{
		code: 'NRN-7',
		title: 'The Lion, the Witch and the Wardrobe',
		author: 'C.S. Lewis',
		stock: 1,
	},
];

const bookRecords: BookRow[] = books.map((book, index) => {
	return {
		id: index + 1,
		createdAt: today,
		updatedAt: today,
		...book,
	};
});

const mockFindAllMemberWithBookCount = {
	execute: async (): Promise<(Member & { book: number })[]> => {
		const result = members.map((items) => {
			return { ...items, book: 0 };
		});

		return Promise.resolve(result);
	},
};

const mockMemberBorrowBook = {
	execute: async (dto: RequestBook): Promise<Book> => {
		const { memberId, bookId, quantity } = dto;

		const memberRecord = memberRecords.filter(({ id }) => id === memberId);

		if (memberRecord.length < 1) {
			throw new BadRequestException('Member not found.');
		}

		if (quantity > 2) {
			throw new BadRequestException('You cannot borrow more than 2 books.');
		}

		const bookRecord = bookRecords.filter(
			({ id, stock }) => id === bookId && stock >= quantity,
		);

		if (bookRecord.length < 1) {
			throw new BadRequestException(
				'The book you are looking for has been borrowed.',
			);
		}

		const { id, createdAt, updatedAt, ...book } = bookRecord[0];

		return Promise.resolve(book);
	},
};

const mockMemberReturnsBook = {
	execute: async () => {
		return Promise.resolve();
	},
};

describe('MemberController', () => {
	let controller: MemberController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MemberController],
			providers: [
				{
					provide: FindAllMemberWithBookCount,
					useValue: mockFindAllMemberWithBookCount,
				},
				{
					provide: MemberBorrowBook,
					useValue: mockMemberBorrowBook,
				},
				{
					provide: MemberReturnsBook,
					useValue: mockMemberReturnsBook,
				},
			],
		}).compile();

		controller = module.get<MemberController>(MemberController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all members with book count', async () => {
		const result = await controller.findAllWithBookCount();

		expect(result).toEqual(
			expect.arrayContaining<Member & { book: number }>(
				members.map((items) => {
					return { ...items, book: 0 };
				}),
			),
		);
	});

	it('should thrown error if member is not found', async () => {
		await expect(
			controller.borrowBook(0, { book_id: 1, quantity: 1 }),
		).rejects.toThrow(new BadRequestException('Member not found.'));
	});

	it('should thrown error if member want to borrow more than 2 books', async () => {
		await expect(
			controller.borrowBook(1, { book_id: 1, quantity: 3 }),
		).rejects.toThrow(
			new BadRequestException('You cannot borrow more than 2 books.'),
		);
	});

	it('should thrown error if book has been borrowed', async () => {
		await expect(
			controller.borrowBook(1, { book_id: 1, quantity: 2 }),
		).rejects.toThrow(
			new BadRequestException(
				'The book you are looking for has been borrowed.',
			),
		);
	});

	it('member should can borrow books', async () => {
		const book = await controller.borrowBook(1, { book_id: 1, quantity: 1 });

		expect(book).toEqual(books[0]);
	});
});
