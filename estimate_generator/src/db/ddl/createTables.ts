import { devPool, prodPool } from '../config/dbConfig'

const seedDatabases = async () => {
  try {
    await seedDevDB();
    await seedProdDB();
    console.log('Databases seeded successfully.');
  } catch (error) {
    console.error('Error seeding databases:', error);
  }
}

const seedDevDB = async () => {
  try {
    const devClient = await devPool.connect();
    await devClient.query(createUsersTableQuery)
    await devClient.query(createCustomersTableQuery)
    await devClient.query(createEstimatesTableQuery)
    await devClient.query(createChangeOrdersTableQuery)
    await devClient.query(createUserProfileTableQuery)
    await devClient.query(createEmailsTableQuery)
    await devClient.query(createNotificationTableQuery)
    devClient.release();
  } catch (error) {
    console.error('Error seeding development database:', error);
  }
}

const seedProdDB = async () => {
  try {
    const prodClient = await prodPool.connect();
    await prodClient.query(createUsersTableQuery)
    await prodClient.query(createCustomersTableQuery)
    await prodClient.query(createEstimatesTableQuery)
    await prodClient.query(createChangeOrdersTableQuery)
    await prodClient.query(createUserProfileTableQuery)
    await prodClient.query(createEmailsTableQuery)
    await prodClient.query(createNotificationTableQuery)
    prodClient.release();
  } catch (error) {
    console.error('Error seeding production database:', error);
  }
}

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,
    first_name  VARCHAR(255),
    last_name  VARCHAR(255),
    email  VARCHAR(255),
    password  VARCHAR(255),
  );
`

const createCustomersTableQuery = `
  CREATE TABLE IF NOT EXISTS customers (
    customer_id INT PRIMARY KEY,
    first_name  VARCHAR(255),
    last_name  VARCHAR(255),
    email  VARCHAR(255),
    phone_number  VARCHAR(255),
    primary_address  VARCHAR(255),
  );
`

const createEstimatesTableQuery = `
  CREATE TABLE IF NOT EXISTS estimates (
    estimate_id INT PRIMARY KEY,
    customer_id INT,
    contractor_business_name VARCHAR(255),
    contractor_business_address VARCHAR(255), 
    contractor_business_phone VARCHAR(255),
    contractor_business_email VARCHAR(255),
    customer_name VARCHAR(255),
    customer_business_name VARCHAR(255),
    project_address VARCHAR(255),
    date_created TIMESTAMP,
    date_modified TIMESTAMP,
    message VARCHAR(255),
    subtotal DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    total DECIMAL(10, 2),
    FOREIGH KEY (user_id) REFERENCES users(user_id)
  );
`

const createChangeOrdersTableQuery = `
  CREATE TABLE IF NOT EXISTS changeorders (
    changeorder_id INT PRIMARY KEY,
    estimate_name VARCHAR(255),
    descripion VARCHAR(255),
    customer_name VARCHAR(255),
    work_address VARCHAR(255),
    order_status VARCHAR(255),
  );
`
const createUserProfileTableQuery = `
  CREATE TABLE IF NOT EXISTS userprofile (
    profile_id INT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    business_address VARCHAR(255),
    business_phone VARCHAR(255),
    business_email VARCHAR(255),
  );
`
const createEmailsTableQuery = `
  CREATE TABLE IF NOT EXISTS emails (
    email_id INT PRIMARY KEY,
    sender VARCHAR(255),
    subject VARCHAR(255),
    body VARCHAR(255),
  );
`
const createNotificationTableQuery = `  
  CREATE TABLE IF NOT EXISTS notification (
    notification_id INT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    body VARCHAR(255),
  );
`

export {
  seedDatabases,
  seedDevDB,
  seedProdDB
}