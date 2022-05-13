//Packages
const knex = require('knex')
const optionsMariaDB = require('../options/mariaDB')

//Product Routes
class productsController {
    constructor(config) {
        this.knex = knex(config)
    }

    async createTable() {
        return this.knex.schema.dropTableIfExists('productos')
          .finally(() => {
            return this.knex.schema.createTable('productos', table => {
              table.increments('id').primary();
              table.string('title', 50).notNullable();
              table.float('price').notNullable();
              table.string('thumbnail');
            })
        })
    }
    
    async getAllProduct() {
        return await this.knex('productos').select('*')
    }

    async addNewProduct(productos) {
        return await this.knex('productos').insert(productos)
    }

    close() {
        this.knex.destroy()
    }
}

const ProductsController = new productsController(optionsMariaDB)
//Export
module.exports = ProductsController