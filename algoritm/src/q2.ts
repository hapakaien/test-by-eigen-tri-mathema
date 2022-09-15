export function getLongestWord(str: string): string {
	// Split sentence into array
	const splitStr = str.split(' ');

	// Get longest element from array
	const longestWord = splitStr.reduce(
		(previousVal, nextVal) =>
			previousVal.length > nextVal.length ? previousVal : nextVal,
		''
	);

	return longestWord;
}
