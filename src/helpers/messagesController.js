//Packages
const knex = require('knex')
const optionsSQLite = require('../options/sqlite')

//Product Routes
class messagesController {
    constructor(config) {
        this.knex = knex(config)
    }

    async createTable() {
        return this.knex.schema.dropTableIfExists('mensajes')
          .finally(() => {
            return this.knex.schema.createTable('mensajes', table => {
              table.increments('id').primary();
              table.string('user', 50).notNullable();
              table.float('messageText').notNullable();
            })
        })
    }

    async getAllMessages() {
        return await this.knex('mensajes').select('*')
    }

    async addNewMessage(mensajes) {
        return await this.knex('mensajes').insert(mensajes)
    }

    close() {
        this.knex.destroy()
    }
}

const MessagesController = new messagesController(optionsSQLite)

//Export
module.exports = MessagesController