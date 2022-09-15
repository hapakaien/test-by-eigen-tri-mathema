import { describe, expect, test } from '@jest/globals';
import { compareArray } from './q3';

const inputs = ['xc', 'dz', 'bbb', 'dz'];
const queries = ['bbb', 'ac', 'dz'];

const expectedResult = [1, 0, 2];

describe('compareArray', () => {
	test('should count intersection between 2 array', () => {
		const comparedArr = compareArray(inputs, queries);

		expect(comparedArr).toEqual(expectedResult);
	});
});
