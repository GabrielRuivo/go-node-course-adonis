'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/* Importando as váriaveis ambiantes do nosso arquivo .env */
const Env = use('Env')

class File extends Model {
  /* Nesse computed vamos retornar o novo campo que vamos inserir */
  static get computed () {
    return ['url']
  }

  /* pagamos o url da nossa aplicação do nosso .env e passamos
  o restante da rota com o id */
  getUrl ({ id, name }) {
    console.log(name)
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
