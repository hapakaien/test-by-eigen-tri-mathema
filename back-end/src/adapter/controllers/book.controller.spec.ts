import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../core/entities/book.entity';
import { FindAllBooksThatHaveNotBeenBorrowed } from '../../core/use-cases/find-all-books-that-have-not-been-borrowed.use-case';
import { BookController } from './book.controller';

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

const mockFindAllBooksThatHaveNotBeenBorrowed = {
	execute: async (): Promise<Book[]> => {
		return Promise.resolve(books);
	},
};

describe('BookController', () => {
	let controller: BookController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BookController],
			providers: [
				{
					provide: FindAllBooksThatHaveNotBeenBorrowed,
					useValue: mockFindAllBooksThatHaveNotBeenBorrowed,
				},
			],
		}).compile();

		controller = module.get<BookController>(BookController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return all books that have not been borrowed', async () => {
		const result = await controller.findAllThatHaveNotBeenBorrowed();

		expect(result).toEqual(expect.arrayContaining<Book>(books));
	});
});
