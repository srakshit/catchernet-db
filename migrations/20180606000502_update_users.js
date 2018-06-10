const moment = require('moment');
const generate = require('nanoid/generate');

let uid = () => generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 22);

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('users', (table) => {
            table.string('uid');
            table.string('county').alter().nullable();
            table.dateTime('created_at');
            table.dateTime('updated_at');
        })
        .then(() => {
            //Update uids with default uids
            return  knex('users').select('id')
                    .then((rows) => {
                        rows.forEach((row) => {
                            return knex('users').where('id', row.id).update({
                                created_at: moment().format('YYYY-MM-DD HH:mm:ss'), 
                                updated_at: moment().format('YYYY-MM-DD HH:mm:ss'), 
                                uid: 'usr_' + uid()
                            }).then();
                        })
                    });
        })
        .then(() => {
            //make uid as notnullable and unique field
            return knex.schema.alterTable('users', (table) => {
                table.string('uid').alter().notNullable().unique();
            })
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('users', (table) => {
            table.dropColumn('uid');
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })
    ]);
};
