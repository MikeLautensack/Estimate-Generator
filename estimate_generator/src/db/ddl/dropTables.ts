import { devPool, prodPool } from '../config/dbConfig'

const dropDatabases = async () => {
  try {
    await dropDevDB();
    await dropProdDB();
    console.log('Databases seeded successfully.');
  } catch (error) {
    console.error('Error seeding databases:', error);
  }
}

const dropDevDB = async () => {
  try {
    const devClient = await devPool.connect();
    await devClient.query(dropUsersTableQuery)
    await devClient.query(dropCustomersTableQuery)
    await devClient.query(dropEstimatesTableQuery)
    await devClient.query(dropChangeOrdersTableQuery)
    await devClient.query(dropUserProfileTableQuery)
    await devClient.query(dropEmailsTableQuery)
    await devClient.query(dropNotificationTableQuery)
    devClient.release();
  } catch (error) {
    console.error('Error seeding development database:', error);
  }
}

const dropProdDB = async () => {
  try {
    const prodClient = await prodPool.connect();
    await prodClient.query(dropUsersTableQuery)
    await prodClient.query(dropCustomersTableQuery)
    await prodClient.query(dropEstimatesTableQuery)
    await prodClient.query(dropChangeOrdersTableQuery)
    await prodClient.query(dropUserProfileTableQuery)
    await prodClient.query(dropEmailsTableQuery)
    await prodClient.query(dropNotificationTableQuery)
    prodClient.release();
  } catch (error) {
    console.error('Error seeding production database:', error);
  }
}

const dropUsersTableQuery = `
  DROP TABLE IF EXISTS users (
    user_id INT PRIMARY KEY,
    first_name  VARCHAR(255),
    last_name  VARCHAR(255),
    email  VARCHAR(255),
    password  VARCHAR(255),
  );
`

const dropCustomersTableQuery = `
  DROP TABLE IF EXISTS customers (
    customer_id INT PRIMARY KEY,
    first_name  VARCHAR(255),
    last_name  VARCHAR(255),
    email  VARCHAR(255),
    phone_number  VARCHAR(255),
    primary_address  VARCHAR(255),
  );
`

const dropEstimatesTableQuery = `
  DROP TABLE IF EXISTS estimates (
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

const dropChangeOrdersTableQuery = `
  DROP TABLE IF EXISTS changeorders (
    changeorder_id INT PRIMARY KEY,
    estimate_name VARCHAR(255),
    descripion VARCHAR(255),
    customer_name VARCHAR(255),
    work_address VARCHAR(255),
    order_status VARCHAR(255),
  );
`
const dropUserProfileTableQuery = `
  DROP TABLE IF EXISTS userprofile (
    profile_id INT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    business_address VARCHAR(255),
    business_phone VARCHAR(255),
    business_email VARCHAR(255),
  );
`
const dropEmailsTableQuery = `
  DROP TABLE IF EXISTS emails (
    email_id INT PRIMARY KEY,
    sender VARCHAR(255),
    subject VARCHAR(255),
    body VARCHAR(255),
  );
`
const dropNotificationTableQuery = `  
  DROP TABLE IF EXISTS notification (
    notification_id INT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    body VARCHAR(255),
  );
`

export {
  dropDatabases,
  dropDevDB,
  dropProdDB
}