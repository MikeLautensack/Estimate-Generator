# Estimate Generator

Estimate Generator is a fullstack web application designed for contractors to streamline their workflow. It allows for creating work estimates, sending them to customers, obtaining approvals, managing change orders, and generating invoices. The application also provides PDF generation capabilities for all document types.

## Features

- Create and manage work estimates
- Send estimates to customers for approval
- Handle change orders
- Create and manage invoices
- Generate PDF documents for all document types
- Role-based authentication for contractors, admins, and customers
- Responsive design with 3D elements and animations

## Tech Stack

- **Framework**: Next.js 14 (with App Router)
- **Authentication**: Next-auth/Auth.js (Role-based auth with Credentials login, OAuth, and Magic Link)
- **ORM**: Drizzle ORM
- **Database**: Neon Serverless Postgres
- **Component Library**: MUI v6
- **CSS**: Tailwind and MUI sx props
- **Backend API**: 
  - Next.js Route Handlers for CRUD operations
  - Node/Express microservices
  - ASP.NET Core C# microservices
- **Testing**: Jest unit tests
- **Infrastructure**: 
  - Next.js app deployed on Vercel
  - Express and .NET microservices deployed on Azure (separate repo)
- **Theming**: Material Design
- **Email Service**: Resend
- **3D Rendering**: React Three Fiber
- **2D UI Animation**: Framer Motion
- **Forms**: React-Hook-Form, Zod
- **File Upload**: Upload Thing

## Prerequisites

- Node.js (version specified in `.nvmrc` or `.node-version`)
- npm (comes with Node.js)
- PostgreSQL database (Neon Serverless Postgres)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/estimate-generator.git
   cd estimate-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables (refer to `.env.example` if available).

4. Run database migrations:
   ```bash
   npm run migrations:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm test`: Run Jest tests
- `npm run test:watch`: Run Jest tests in watch mode
- `npm run migrations:generate`: Generate new Drizzle ORM migrations
- `npm run migrations:push`: Push Drizzle ORM migrations to the database
- `npm run migrations:drop`: Drop all tables in the database

## Project Structure

(Briefly describe the main directories and their purposes)

## Authentication

The application uses Next-auth/Auth.js for authentication with the following methods:
- Credentials login for contractor and admin roles
- OAuth for contractor and admin roles
- Email magic link for customer role

## API Structure

- Next.js Route Handlers for CRUD operations
- Separate Node/Express microservices (deployed on Azure)
- Separate ASP.NET Core C# microservices (deployed on Azure)

## Styling and UI

- MUI v6 for component library
- Tailwind CSS for utility classes
- MUI sx props for custom styling
- Framer Motion for 2D UI animations
- React Three Fiber for 3D elements

## Testing

Jest is used for unit testing. Run tests with `npm test` or `npm run test:watch` for watch mode.

## Deployment

- The Next.js application is deployed on Vercel
- Express and .NET microservices are deployed on Azure (in a separate repository)

## Contributing

(Add guidelines for contributing to the project)

## License

(Specify the license under which this project is released)

## Support

(Provide information on how to get support or contact the maintainers)

## Acknowledgements

(List any acknowledgements or third-party libraries that you want to give credit to)
