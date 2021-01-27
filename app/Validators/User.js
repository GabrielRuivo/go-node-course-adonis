'use strict'

const Antl = use('Antl') /* Biblioteca de internacionalização do adonisJS */

class User {
  /*
    Faz com que todos os campos sejam validados ao mesmo tempo
    diferente do adonis que por padrão para no primeiro erro.
  */
  get validateAll () {
    return true
  }

  /* rules: onde vão ser definidas as regras pra esse Model de User */
  get rules () {
    return {
      username: 'required|unique:users', /* username unico por usuario */
      email: 'required|email|unique:users', /* obrigatorio/formato valido de email/ tem que ser unico */
      password: 'required|confirmed'
    }
  }

  /* Antl.list('validation') -> estamos dizendo qual lista de erros a biblioteca de
  internacionalização do adonisjS deve ler */
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
