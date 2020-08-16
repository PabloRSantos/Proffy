import Knex from "knex"

export async function up(knex: Knex){
    return knex.schema.createTable("users", table => {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.string("password").notNullable()
        table.string("email").notNullable()
        table.string("avatar").defaultTo('default.png')
        table.string("whatsapp")
        table.string("bio")
        table.string("resetPassword")
        table.date("resetPasswordTime")
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable("users")
}