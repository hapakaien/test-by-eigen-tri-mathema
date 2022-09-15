export function compareArray(inputs: string[], queries: string[]): number[] {
	// Iterate over queries using map
	const result = queries.map((query) => {
		// Filter inputs using queries's element and get it length
		const count = inputs.filter((input) => input === query).length;

		return count;
	});

	return result;
}
