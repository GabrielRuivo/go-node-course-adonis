'use strict'

const Antl = use('Antl') /* Biblioteca de internacionalização do adonisJS */

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }

  /* Antl.list('validation') -> estamos dizendo qual lista de erros a biblioteca de
  internacionalização do adonisjS deve ler */
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
