/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
	await knex.schema.createTable('members', (table) => {
		table.bigIncrements('id').notNullable().primary();
		table.string('code').notNullable();
		table.string('name').notNullable();
		table.timestamp('penalized_at').nullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
	await knex.schema.raw('DROP TABLE IF EXISTS members');
};
