import { devPool, prodPool } from './config/dbConfig'
import { seedDatabases, seedDevDB, seedProdDB } from './ddl/createTables'
import { dropDatabases, dropDevDB, dropProdDB } from './ddl/dropTables'

export {
    devPool,
    prodPool,
    seedDatabases,
    seedDevDB,
    seedProdDB,
    dropDatabases,
    dropDevDB,
    dropProdDB,
}