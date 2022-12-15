import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const tableUsers = 'labecommerce_users'
const tableProducts = 'labecommerce_products'
const tablePurchases = 'labecommerce_purchases'

const createTables = () =>
    connection.schema
        .hasTable(tableUsers).then((exists) => {
            if (!exists) {
                const table = connection.schema
                    .createTable(tableUsers, (table) => {
                        table.primary(['id'])
                        table.string('id')
                        table.string('name')
                        table.string('email')
                        table.string('password')
                    })
                console.log(`Table ${tableUsers} created.`)
                return table
            } else {
                console.log(`Table ${tableUsers} already exists.`)
            }
        })
        .catch(printError)

connection.schema
    .hasTable(tableProducts).then((exists) => {
        if (!exists) {
            const table = connection.schema
                .createTable(tableProducts, (table) => {
                    table.primary(['id'])
                    table.string('id')
                    table.string('name')
                    table.integer('price')
                    table.string('image_url')
                })
            console.log(`Table ${tableProducts} created.`)
            return table
        } else {
            console.log(`Table ${tableProducts} already exists.`)
        }
    })
    .catch(printError)

connection.schema
    .hasTable(tablePurchases).then((exists) => {
        if (!exists) {
            const table = connection.schema
                .createTable(tablePurchases, (table) => {
                    table.primary(['id'])
                    table.string('id')
                    table.string('user_id')
                    table.string('product_id')
                    table.foreign('user_id').references('id').inTable('labecommerce_users')
                    table.foreign('product_id').references('id').inTable('labecommerce_products')
                    table.integer('quantity')
                    table.integer('total_price')
                })
            console.log(`Table ${tablePurchases} created.`)
            return table
        } else {
            console.log(`Table ${tablePurchases} already exists.`)
        }
    })
    .catch(printError)


const closeConnection = () => { connection.destroy() }

createTables()
    .finally(closeConnection)
