import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllBooksThatHaveNotBeenBorrowed } from '../../core/use-cases/find-all-books-that-have-not-been-borrowed.use-case';

@ApiTags('book')
@Controller('books')
export class BookController {
	constructor(
		private readonly findAllBooksThatHaveNotBeenBorrowed: FindAllBooksThatHaveNotBeenBorrowed,
	) {}

	@Get()
	@ApiOperation({ summary: 'Get all books that have not been borrowed.' })
	async findAllThatHaveNotBeenBorrowed() {
		const books = await this.findAllBooksThatHaveNotBeenBorrowed.execute();

		return books;
	}
}
