'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    /* aqui estamos buscando o query param page,
    request.get retona os querys params  */
    const { page } = request.get()

    /* with: ele carrega e preenche automaticamete em cada relacionamento em cada registro do banco de dados */
    /* fetch: é pra finalizar essa query. */
    /* DAR UMA OLHADA NA DOCUMENTAÇÃO DO PAGINATE */
    const projects = await Project.query().with('user').paginate(page)

    return projects
  }

  async store ({ request, response, auth }) {
    /* Pegando apenas os campos title e description */
    const data = request.only(['title', 'description'])
    console.log('AUTH GONODE: ', auth.user)
    /* Criando no banco com os dados recolhidos acima (data) */
    /* E passando o usuario logado com o auth.user.id */
    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    /* load: como se fosse um with porém pra apenas um projeto não todos */
    /* E passamos como parametro o nome do relacionamento Model Project.js tem 2 user e tasks */
    await project.load('user')
    await project.load('tasks')

    return project
  }

  async update ({ params, request }) {
    /* Pegamos o projeto pelo id no banco de dados */
    const project = await Project.findOrFail(params.id)
    /* buscamos apenas os campos que queremos atualizar */
    const data = request.only(['title', 'description'])

    /* Jogamos pra dentro de project os dados de (data) */
    project.merge(data)

    /* E finalmente salvamos as alterações */
    await project.save()

    return project
  }

  async destroy ({ params }) {
    /* Pegamos o projeto pelo id no banco de dados */
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
