import Knex from "knex"

export async function up(knex: Knex){
    return knex.schema.createTable("classes", table => {
        table.increments("id").primary()
        table.string("subject").notNullable()
        table.decimal("cost").notNullable()
        
        table.integer("user_id")
        .unique()
        .notNullable().references("id")
        .inTable("users").onDelete("CASCADE")
        .onUpdate("CASCADE")  //qnd exclui ou altera algo na table users, aq também é 
        //alterado ou excluido
        
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable("classes")
}

//table de aulas