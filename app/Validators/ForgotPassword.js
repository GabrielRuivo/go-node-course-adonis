'use strict'

const Antl = use('Antl') /* Biblioteca de internacionalização do adonisJS */

class ForgotPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }

  /* Antl.list('validation') -> estamos dizendo qual lista de erros a biblioteca de
  internacionalização do adonisjS deve ler */
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
