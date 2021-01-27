'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  /* Método com o exato nome do relacionamento */
  user () {
    /* this.belongsTo: Significa que o projeto pertence a UM usuario
    e passamos o Model de usuario como parametro */
    return this.belongsTo('App/Models/User')
  }

  tasks () {
    /* this.hasMany: um projeto pode ter várias tarefas associadas a ele */
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
