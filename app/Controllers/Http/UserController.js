'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    /* Buscando o campo address criado la no corpo do insomnia */
    /* Utilizando request.input que busca apenas um campo */
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    /* porque esse address() ? */
    /* createMany: Vai criar vários endereços, já que o addresses é um array,
      pra cada informação que recebemos dentro do addresses ele vai criar um
      novo endereço pra o usuario em questão. Fazendo o relacionamento automaticamente.
    */
    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    return user
  }
}

module.exports = UserController
