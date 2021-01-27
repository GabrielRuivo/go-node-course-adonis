'use strict'

const Antl = use('Antl') /* Biblioteca de internacionalização do adonisJS */

class Task {
  get rules () {
    return {
      title: 'required',
      due_date: 'date'
    }
  }

  /* Antl.list('validation') -> estamos dizendo qual lista de erros a biblioteca de
  internacionalização do adonisjS deve ler */
  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Task
