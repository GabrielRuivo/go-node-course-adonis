'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  /* static boot: como se fosse nosso constructor */
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  /* Primeiramente a tarefa pertence a um projeto. */
  project () {
    return this.belongsTo('App/Models/Project')
  }

  /* A tarefa pode pertencer a um usuário. */
  user () {
    return this.belongsTo('App/Models/User')
  }

  /* A tarefa pode ter um arquivo (anexo) */
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
