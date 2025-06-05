# Product Sitemap & API Endpoints

## 🗺️ Sitemap

### Dashboard

- Overview (stats, recent activity)
- Quick actions (create estimate, add customer, etc)

### Jobs / Estimates

- List all jobs/estimates
- View job/estimate details
- Create new estimate/job
- Edit estimate/job
- Delete/cancel job/estimate
- Save & send estimate

### Customers

- List customers
- View customer details
- Add new customer
- Edit customer
- Delete customer

### Invoices

- List invoices
- View invoice details
- Create invoice from job/estimate
- Send invoice
- Mark invoice as paid

### Settings

- Profile & account
- Company info
- Email templates
- Integrations

---

## 📡 Planned API Endpoints

### Jobs / Estimates

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | /api/jobs          | List all jobs/estimates    |
| POST   | /api/jobs          | Create new job/estimate    |
| GET    | /api/jobs/:id      | Get job/estimate by ID     |
| PUT    | /api/jobs/:id      | Update job/estimate        |
| DELETE | /api/jobs/:id      | Delete/cancel job/estimate |
| POST   | /api/jobs/:id/send | Send estimate via email    |

### Customers

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | /api/customers     | List all customers |
| POST   | /api/customers     | Add new customer   |
| GET    | /api/customers/:id | Get customer by ID |
| PUT    | /api/customers/:id | Update customer    |
| DELETE | /api/customers/:id | Delete customer    |

### Invoices

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | /api/invoices          | List all invoices      |
| POST   | /api/invoices          | Create invoice         |
| GET    | /api/invoices/:id      | Get invoice by ID      |
| PUT    | /api/invoices/:id      | Update invoice         |
| DELETE | /api/invoices/:id      | Delete invoice         |
| POST   | /api/invoices/:id/send | Send invoice via email |
| POST   | /api/invoices/:id/pay  | Mark invoice as paid   |

### Auth & User

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | /api/auth/login    | User login               |
| POST   | /api/auth/logout   | User logout              |
| POST   | /api/auth/register | User registration        |
| GET    | /api/user/profile  | Get current user profile |
| PUT    | /api/user/profile  | Update user profile      |

### Settings

| Method | Endpoint      | Description     |
| ------ | ------------- | --------------- |
| GET    | /api/settings | Get settings    |
| PUT    | /api/settings | Update settings |

---

> **Note:** Adjust, add, or remove endpoints and sitemap items as your product vision evolves!
