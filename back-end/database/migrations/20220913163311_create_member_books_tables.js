/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
	await knex.schema.createTable('member_books', (table) => {
		table.bigIncrements('id').notNullable().primary();
		table.bigInteger('member_id').notNullable();
		table
			.foreign('member_id')
			.references('members.id')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.bigInteger('book_id').notNullable();
		table
			.foreign('book_id')
			.references('books.id')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.integer('quantity').notNullable();
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
	await knex.schema.raw('DROP TABLE IF EXISTS member_books');
};
