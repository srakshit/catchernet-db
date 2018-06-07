const moment = require('moment');
const generate = require('nanoid/generate');

let uid = () => generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 22);

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('users', (table) => {
            table.string('uid');
            table.string('county').alter().nullable();
            table.dateTime('created_at').defaultTo(moment().format('YYYY-MM-DD HH:mm:ss'));
            table.dateTime('updated_at').defaultTo(moment().format('YYYY-MM-DD HH:mm:ss'));
        })
        .then(() => {
            //Update uids with default uids
            return  knex('users').select('id')
                    .then((rows) => {
                        rows.forEach((row) => {
                            return knex('users').where('id', row.id).update({uid: 'usr_' + uid()}).then(); 
                        })
                    });
        })
        .then(() => {
            //make uid as notnullable and unique field
            return knex.schema.alterTable('users', (table) => {
                table.string('uid').alter().notNullable().unique();
            })
        }),
        
        knex.schema.createTable('catcher_allocation', (table) => {
            table.integer('catcher_id').unsigned().unique().references('id').inTable('users');
            table.integer('subscriber_id').unsigned().unique().references('id').inTable('users');
            table.dateTime('created_at');
            table.dateTime('updated_at');
            table.boolean('isActive').notNullable().defaultTo(true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('users', (table) => {
            table.dropColumn('uid');
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        }),

        knex.schema.dropTable('catcher_allocation'),
    ]);
};
