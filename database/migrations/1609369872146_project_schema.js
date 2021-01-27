'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      /* Todo Projeto é criado por um usuáriom então vamos armazenar o usuario que criou esse projeto */
      /* Armazenando o usuario que criou esse projeto com o campo user.id */
      /* Que vai fazer um relacionamento via chave estrangeira com a tabela de usuarios */
      table
        .integer('user_id')
        .unsigned() /* força a ser apenas valores positivos */
        .references('id') /* Nome do campo que queremos referenciar */
        .inTable('users') /* Qual tabela queremos referenciar */
        /*
        resumindo table acima:
          user_id ta fazendo uma chave estrangeira na tabela users
          com o campo id
        */

      /* O que vai acontecer se esse campo for atualizado la dentro da table user */
      /* CASCADE: Vai reemirir as alterações aqui na tabela, ex: se o usuario tem id: 1
        e for alterado pra 2, automaticamente será alterado aqui.
      */
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
