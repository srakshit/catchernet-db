
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('firstName').notNullable();
            table.string('lastName').notNullable();
            table.string('email').notNullable().unique();
            table.string('phone').notNullable().unique();
            table.string('address').notNullable();
            table.string('city').notNullable();
            table.string('county').notNullable();
            table.string('postcode').notNullable();
            table.string('type').notNullable();
        }),
        
        knex.schema.createTable('catchers', (table) => {
            table.integer('user_id').unsigned().unique().references('id').inTable('users');
            table.string('catcher_id').notNullable().unique();
            table.boolean('isActive').notNullable().defaultTo(true);
        }),
        
        knex.schema.createTable('subscribers', (table) => {
            table.integer('user_id').unsigned().unique().references('id').inTable('users');
            table.string('subscriber_id').notNullable().unique();
            table.string('stripe_customer_id');
            table.boolean('isActive').notNullable().defaultTo(true);
        }),
				
		knex.schema.createTable('payments', (table) => {
            table.string('stripe_customer_id').notNullable().unique();
            table.integer('amount').notNullable();
            table.dateTime('last_paid_date');
            table.dateTime('scheduled_pay_date');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('catchers'),
        knex.schema.dropTable('subscribers'),
        knex.schema.dropTable('payments'),
        knex.schema.dropTable('users')
    ]);
};
