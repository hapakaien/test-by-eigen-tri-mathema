import { Injectable } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { IBookRepository } from '../interfaces/book.interface';

@Injectable()
export class FindAllBooksThatHaveNotBeenBorrowed {
	constructor(private readonly bookRepository: IBookRepository) {}

	async execute() {
		const books = this.bookRepository.findAllThatHaveNotBeenBorrowed();

		return books;
	}
}
