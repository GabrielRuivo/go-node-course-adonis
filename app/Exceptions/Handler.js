'use strict'

const Raven = require('raven')
const Config = use('Config')

const Env = use('Env')
const Youch = use('Youch') /* Formatador de erros */
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  /* handle: O que agente quer retornar pro usuario final */
  async handle (error, { request, response }) {
    /*
      se for um erro de validação eu vou apenas retornar as mensagens de erro
      que aconteceram na validação em formato de json pro nosso front-end.
    */
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    /* Erros mostrados se o ambiente for de desenvolvimento */
    if (Env.get('NODE_ENV') === 'development') {
      /* request.request -> propriedade que tem todas as informações da requisicão */
      const youch = new Youch(error, request.request)

      /* Transformando erros em formato JSON */
      const errorJSON = await youch.toJSON()

      /* retornando a resposta de erro */
      return response.status(error.status).send(errorJSON)
    }
    /* Resposta de erro, sem nenhuma mensagem */
    return response.status(error.status)
  }

  /* report: o que queremos fazer com esse erro */
  async report (error, { request }) {
    /* Services é nome do arquivo que criamos de configuracão */
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
