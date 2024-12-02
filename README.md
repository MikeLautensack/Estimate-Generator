# Estimate Generator

Estimate Generator is a web app for contractors and small business's to create, manage, and send work estimates, work orders, and invoices to customers.

## [👉 Check out the Live Demo here! 👈](https://your-live-demo-url.com)

[![Live Project Screenshot](/public/images/estimate-generator-img.png)](https://estimategeneratorapp.com/)

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://estimategeneratorapp.com/)

## Table of Contents

- [Why did I build Estimate Generator?](#why-did-i-build-estimate-generator)
- [Features](#features)
- [Quick Start](#quick-start)
- [Usage](#usage)

## Why did I build Estimate Generator?

Before I became a web developer I owened a small residential home painting business. The most tedious and time consuming activities required of contractors and small business owners off the job site is constantly writing work estimates, work orders, and invoices for customers. When you are a contractor or small business owner, time is money and you need a fast and easy to use software to manage these tasks for the user. Estimate Generator is built to solve that problem by providing a steamlined way to create, manage, and send all your work estimates, work orders, and invoices to save the user time and money.

## Features

- 🌟 Create, manage, and send work estimates and invoices
- 🔒 Role-based authentication for contractors and customers
- 📧 Email notifications with "magic link" for customer access
- 📊 Dynamic and customizable estimate creation interface
- 💾 Save drafts and send estimates as PDF attachments

## Quick Start

Install deps with npm

```
npm i
```

To start a production build locally run...

```
npm run build
npm run start
```

To start the dev server run...

```
npm run dev
```

To run the test suit run...

```
npm run test

or

npm run test:watch
```

To use the linter run...

```
npm run lint
```

## Project Structure

All source code is located in the src folder

### Pages

Pages are located in `src/app` and organized using Next.js app router conventions.

### MUI & Tailwind

This project is using both MUI and Tailwind CSS. MUI components are used for building UI and themeing while tailwind is used for general css styling.

### API Routes

All API routes are located in `src/app/api`.

### Data Access Layer

The data access layer is located at `src/db`. Data schemas are written with Drizzle ORM TypeScript schemas and can be found at `src/db/schemas`. Migrations are done with Drizzle ORM via scripts found in package.json and you can find the migrations files at `src/db/drizzle`.

### Components

All custom components are located in `src/components`.

### Types

This is a TypeScript project and types are located at `src/types` or defined inside the file that uses the type.

### Hooks

All custom react hooks are located in `src/hooks`

## Tests

Currently working on a test suite for the project using Jest for unit testing. Tests are located at `src/__test__`.

## Auth

Estimate Generator is using Next-Auth/Auth.js v5 to implement a role based auth system.

There are three user roles

1. Contractor
2. Customer
3. Admin

## Architecture

The backend for Estimate Generator is built with route handlers and REST architecture. The project is using Drizzle ORM for database querys and migrations.

## Usage

To use Estimate Generator navigate from the home page to the sign up page and create an account using traditional credentials login. Upon creating an account you will be redirected to a contractor profile form where you will need to complete a form with info about your business. When are finished creating your contractor profile and submit the form you will then be redirected to your contractor dashboard.

Estimte Generator has a role based authentication system built with NextAuth. When a new user signs up via the sign up form on the sign up page, Estimate Generator will create a new user with a role of "contractor".

From your contractors you can navigate to the customers page and click the new customer button to create a new customer. When a contractor uses the customer form to add a customer to their account Estimate Generator will automatically create a new user with a role of "customer" and a email is sent to the customer containing "magic link" which the customer can click and be redirected to their customer dashboard. From their customer dashboard they can see all the documents contractors will send then when completing work.

Later contractors can naviage to the estimate page and click the new estimate button to start creating a new estimate with Estimate Generators beautiful custom built dynamic ui for creating estimates. When a contractor is done working on an estimate they can click the save button to save an estimate and continue working on it later or they can click the "save and send" button to save the estimate and trigger Estimate Generator to send an email to the customer containing a PDF estimate and a magic link that will redirect them to a ui version of the estimate in their customer account and allow the customer to accept, reject, or request modifications to work estimates.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/MikeLautensack/Estimate-Generator.svg?style=for-the-badge
[contributors-url]: https://github.com/MikeLautensack/Estimate-Generator/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/MikeLautensack/Estimate-Generator.svg?style=for-the-badge
[stars-url]: https://github.com/MikeLautensack/Estimate-Generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/MikeLautensack/Estimate-Generator.svg?style=for-the-badge
[issues-url]: https://github.com/MikeLautensack/Estimate-Generator/issues
