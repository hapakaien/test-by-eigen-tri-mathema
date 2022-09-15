export function reverseString(str: string): string {
	// Get last char from string
	const lastChar = str.slice(-1);

	// Split string into array
	const splitStr = str.split('');

	// Remove last element from array
	splitStr.pop();

	// Reverse array
	const reverseArr = splitStr.reverse();

	// Join array into string
	const joinArr = reverseArr.join('');

	// Combine string
	return `${joinArr}${lastChar}`;
}
