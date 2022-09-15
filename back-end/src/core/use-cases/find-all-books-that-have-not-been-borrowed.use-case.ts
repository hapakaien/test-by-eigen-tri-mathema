import { Injectable } from '@nestjs/common';
import { IBookRepository } from '../interfaces/book.interface';

@Injectable()
export class FindAllBooksThatHaveNotBeenBorrowed {
	constructor(private readonly bookRepository: IBookRepository) {}

	async execute() {
		const books = this.bookRepository.findAllThatHaveNotBeenBorrowed();

		return books;
	}
}
