'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/* o model ja etende automaticamente os campos que tem na tabela */
class User extends Model {
  /* static boot => como se fosse o constructor, pois toda vez é executado */
  static boot () {
    super.boot()

    /* adciona um hook, é executado automaticamente antes de salvar o novo usuario
      faz um hash na senha se ela foi alterada, ou foi criado um usuario novo.
      criptografa a senha.
    */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  addresses () {
    return this.hasMany('App/Models/UserAddress')
  }

  /* onde ficam armazenadas as informações de refresh token etc..
    ou algum tipo detoken que pode expirar
  */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  projects () {
    return this.hasMany('App/Models/Project')
  }

  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = User
