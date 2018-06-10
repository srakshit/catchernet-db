
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('package', (table) => {
            table.increments('id').primary();
            table.string('package_uid').notNullable();
            table.string('package_ref').notNullable();
            table.dateTime('created_at');
            table.dateTime('updated_at');
        }),

        knex.schema.createTable('package_status', (table) => {
            table.increments('id').primary();
            table.string('status').notNullable();
            table.dateTime('created_at');
        }),

        knex.schema.createTable('package_association', (table) => {
            table.integer('catcher_id').unsigned().references('id').inTable('users');
            table.integer('subscriber_id').unsigned().references('id').inTable('users');
            table.unique(['catcher_id', 'subscriber_id']);
            table.dateTime('created_at');
            table.dateTime('updated_at');
        }),

        knex.schema.createTable('package_note', (table) => {
            table.increments('id').primary();
            table.string('package_id').notNullable();
            table.string('note').notNullable();
            table.string('user_id').notNullable();
            table.dateTime('created_at');
            table.dateTime('updated_at');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('package'),
        knex.schema.dropTable('package_status'),
        knex.schema.dropTable('package_association'),
        knex.schema.dropTable('package_note')
    ]);
};