'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('/files/:id', 'FileController.show')

/* Rotas privadas */
Route.group(() => {
  Route.post('/files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    /* 1º qual método quermos validar, 2º param qual validator ultilizar */
    .validator(new Map([[['projects.store'], ['Project']]]))

  /* projects.tasks ele já adciona o id do projeto antes da tarefa, pois toda tarefa é de algum projeto */
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth']) /* o usuario só vai conseguir acessar essas rotas se ele enviar um token de autenticação */
