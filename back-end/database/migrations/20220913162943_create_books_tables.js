/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
	await knex.schema.createTable('books', (table) => {
		table.bigIncrements('id').notNullable().primary();
		table.string('code').notNullable();
		table.string('title').notNullable();
		table.string('author').notNullable();
		table.integer('stock').notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
	await knex.schema.raw('DROP TABLE IF EXISTS books');
};
