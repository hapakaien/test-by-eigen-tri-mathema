/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	await knex('members').del();

	await knex('members').insert([
		{
			code: 'M001',
			name: 'Angga',
		},
		{
			code: 'M002',
			name: 'Ferry',
		},
		{
			code: 'M003',
			name: 'Putri',
		},
	]);
};
