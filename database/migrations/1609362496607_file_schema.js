'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      /* grava o nome do fisico do arquivo */
      table.string('file').notNullable()
      /* grava o nome original do arquivo */
      table.string('name').notNullable()
      /* Maximo 20 caracteres, se é imagem, pdf etc... */
      table.string('type', 20)
      /* se a imagem é jpg, png etc... */
      table.string('subtype', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
