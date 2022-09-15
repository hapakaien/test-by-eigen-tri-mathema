import { describe, test, expect } from '@jest/globals';
import { getLongestWord } from './q2';

const str = 'Saya sangat senang mengerjakan soal algoritma';
const expectedResult = 'mengerjakan';

describe('getLongestWord', () => {
	test('should return longest word from given sentence', () => {
		const longestWord = getLongestWord(str);

		expect(longestWord).toEqual(expectedResult);
	});
});
