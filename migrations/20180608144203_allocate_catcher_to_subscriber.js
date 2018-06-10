const moment = require('moment');

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('catcher_allocation', (table) => {
            table.integer('catcher_id').unsigned().references('id').inTable('users');
            table.integer('subscriber_id').unsigned().references('id').inTable('users');
            table.unique(['catcher_id', 'subscriber_id']);
			table.dateTime('created_at');
            table.dateTime('updated_at');
            table.boolean('isActive').notNullable().defaultTo(true);
        });
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('catcher_allocation'),
    ]);
};
