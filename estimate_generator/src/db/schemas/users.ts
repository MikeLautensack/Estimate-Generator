import { mysqlTable, bigint, varchar } from 'drizzle-orm/mysql-core';
 
export const cities = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }),
});