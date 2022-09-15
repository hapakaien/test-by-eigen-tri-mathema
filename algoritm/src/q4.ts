export function matrixSubtraction(matrixs: number[][]): number {
	// Last element from array
	const lastElm = matrixs.length - 1;

	// Initiate sum of diagonals
	let firstDiagonal = 0;
	let secondDiagonal = 0;

	// Get sum each diagonal
	matrixs.forEach((arr, index) => {
		firstDiagonal += arr[index] as number;
		secondDiagonal += arr[lastElm - index] as number;
	});

	// First diagonal minus second diagonal
	const result = firstDiagonal - secondDiagonal;

	return result;
}
