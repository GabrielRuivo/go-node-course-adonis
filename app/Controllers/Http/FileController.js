'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response }) {
    /* buscando o arquivo de dentro do banco de dados na tabela File pelo id */
    /* findOrFail: procura e retonar erro caso não exista  */
    /* parametros que passamos pra rota */
    const file = await File.findOrFail(params.id)

    /* Agora precisamos retonar o arquivo em forma de imagem não texto ou JSON */
    /* faz o download do arquivo file.file na pasta tmp */
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      /* senão houver nenhum arquivo não faça nada */
      if (!request.file('file')) return

      /* fazendo a requisição do arquivo e setando um tamanho limite para o upload */
      const upload = request.file('file', { size: '2mb' })

      /* gerando um novo nome para o arquivo, utilizando dateTimeStamp para
      evitar repetir nomes de uploads no banco. upload.subtype vai ser a extensão
      do arquivo upado: .jpg, .png etc... */
      const fileName = `${Date.now()}.${upload.subtype}`

      /* movendo o arquivo upado pra dentro de alguma pasta dentro do nosso projeto */
      /* melhor lugar para jogarmos esse arquivo é via Helpers.tmpPath('uploads') */
      /* ele vai retornar o caminho pra uma pasta temporaria e que não vai ser
        compartilhada em produção e desenvolvimento  */
      /* E passamos como 2º params o nome que quermos salvar esse arquivo */
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      /* Verificando se todo o processo acima deu certo  */
      if (!upload.moved()) {
        throw upload.error()
      }

      /* Criando um novo model/registro no banco do File */

      const file = await File.create({
        file: fileName, /* nome do arquivo fisico */
        name: upload.clientName, /* nome real do arquivo onde pode encontrar dentro do clientName */
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no upload do arquivo' } })
    }
  }
}

module.exports = FileController
