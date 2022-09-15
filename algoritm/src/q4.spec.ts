import { describe, expect, test } from '@jest/globals';
import { matrixSubtraction } from './q4';

const matrixs = [
	[1, 2, 0],
	[4, 5, 6],
	[7, 8, 9],
];

const expectedResult = 3;

describe('matrixSubtraction', () => {
	test('should return subtraction from two diagonal', () => {
		const subtractionDiagonal = matrixSubtraction(matrixs);

		expect(subtractionDiagonal).toEqual(expectedResult);
	});
});
