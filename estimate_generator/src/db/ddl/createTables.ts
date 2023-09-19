import { devPool, prodPool } from '../config/dbConfig'

const seedDatabases = () => {
    
}

const seedDevDB = () => {
    
}

const seedProdDB = () => {
    
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
    
  );
`
const createUserProfileTableQuery = `
  CREATE TABLE IF NOT EXISTS userprofile (
    
  );
`
const createEmailsTableQuery = `
  CREATE TABLE IF NOT EXISTS emails (
    
  );
`
const createNotificationTableQuery = `
  CREATE TABLE IF NOT EXISTS notification (
    
  );
`