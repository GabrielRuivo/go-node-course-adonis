'use strict'

const Antl = use('Antl') /* Biblioteca de internacionalização do adonisJS */

class Project {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }

  /* Antl.list('validation') -> estamos dizendo qual lista de erros a biblioteca de
  internacionalização do adonisjS deve ler */
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Project
