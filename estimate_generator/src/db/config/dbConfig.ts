import { Pool } from 'pg'

const devPool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DEVDATABASE,
    password: process.env.DBPASSWORD,
    port: 5432,
})

const prodPool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.PRODDATABASE,
    password: process.env.DBPASSWORD,
    port: 5432,
})

export {
    devPool,
    prodPool
}