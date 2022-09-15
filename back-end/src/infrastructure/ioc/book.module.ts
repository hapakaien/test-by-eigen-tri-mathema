import { Module } from '@nestjs/common';
import { BookController } from '../../adapter/controllers/book.controller';
import { IBookRepository } from '../../core/interfaces/book.interface';
import { FindAllBooksThatHaveNotBeenBorrowed } from '../../core/use-cases/find-all-books-that-have-not-been-borrowed.use-case';
import { BookRepository } from '../repositories/book.repository';

@Module({
	imports: [],
	providers: [
		FindAllBooksThatHaveNotBeenBorrowed,
		{ provide: IBookRepository, useClass: BookRepository },
	],
	controllers: [BookController],
})
export class BookModule {}
