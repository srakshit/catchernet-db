const moment = require('moment');
const generate = require('nanoid/generate');

let uid = () => generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 22);

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('users', (table) => {
            table.string('uid');
            table.dateTime('date_created').defaultTo(moment().format('YYYY-MM-DD HH:mm:ss'));
            table.dateTime('date_updated').defaultTo(moment().format('YYYY-MM-DD HH:mm:ss'));
        }),
        // .then(() => {
        //     //return knex('users').update({uid: 'usr_'+uid()});
        //     return  knex('users').select('id')
        //             .then((rows) => {
        //                 rows.forEach((row) => {
        //                     console.log(row.id);
        //                     return knex('users').where('id', row.id).update({uid: 'usr_' + uid()}); 
        //                 })
        //             });
        // }),
        
        knex.schema.createTable('catcher_allocation', (table) => {
            table.integer('catcher_id').unsigned().unique().references('id').inTable('users');
            table.integer('subscriber_id').unsigned().unique().references('id').inTable('users');
            table.dateTime('date_created');
            table.dateTime('date_updated');
            table.boolean('isActive').notNullable().defaultTo(true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('users', (table) => {
            table.dropColumn('uid');
            table.dropColumn('date_created');
            table.dropColumn('date_updated');
        }),

        knex.schema.dropTable('catcher_allocation'),
    ]);
};
