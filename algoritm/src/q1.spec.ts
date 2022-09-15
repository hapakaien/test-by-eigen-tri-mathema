import { describe, test, expect } from '@jest/globals';
import { reverseString } from './q1';

const str = 'NEGIE1';
const expectedResult = 'EIGEN1';

describe('reverseString', () => {
	test('should return reversed string', () => {
		const reversedStr = reverseString(str);

		expect(reversedStr).toEqual(expectedResult);
	});
});
