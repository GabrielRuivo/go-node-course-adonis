'use strict'

const Kue = use('Kue') /* Kue para gerenciar nossa fila no redis */
const Job = use('App/Jobs/NewTaskMail') /* Nosso job responsavel pelo envio do email */

const TaskHook = exports = module.exports = {}

/* esse hook só executa quando altera o user_id ou quando cria um novo user_id */
TaskHook.sendNewTaskMail = async (taskInstance) => {
  console.log(taskInstance)
  /* Verificar se essa task tem o campo user_id e se ele foi editado recentemente */
  /* dirty: grava dentro do model quais foram as novas alterações adicionadas nesse model */
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  /* Job.key -> Se refere ao nosso método key la dentro do NewTaskMail.js */
  /* { email, username, file, title } -> São os parametros que vamos utilizar dentro do job */
  /* { attempts: 3 } -> Quantas vezes queremos retentar esse job caso ele falhar */
  /* Dar uma olhada na docs nessa parte de Dispatching, tem bastante coisa. */
  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
