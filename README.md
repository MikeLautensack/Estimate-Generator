# Estimate Generator

Estimate Generator is a web app for contractors and small business's to create, manage, and send work estimates, work orders, and invoices to customers.

## Why did I build Estimate Generator?

Before I became a web developer I owened a small residential home painting business. The most tedious and time consuming activities required of contractors and small business owners off the job site is constantly writing work estimates, work orders, and invoices for customers. When you are a contractor or small business owner, time is money and you need a fast and easy to use software to manage these tasks for the user. Estimate Generator is built to solve that problem by providing a steamlined way to create, manage, and send all your work estimates, work orders, and invoices to save the user time and money.

## Quick Start

To start a production build locally run...

```
npm run build
npm run startt
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

## Usage

To use Estimate Generator navigate from the home page to the sign up page and create an account using traditional credentials login. Upon creating an account you will be redirected to a contractor profile form where you will need to complete a form with info about your business. When are finished creating your contractor profile and submit the form you will then be redirected to your contractor dashboard.

Estimte Generator has a role based authentication system built with NextAuth. When a new user signs up via the sign up form on the sign up page, Estimate Generator will create a new user with a role of "contractor".

From your contractors you can navigate to the customers page and click the new customer button to create a new customer. When a contractor uses the customer form to add a customer to their account Estimate Generator will automatically create a new user with a role of "customer" and a email is sent to the customer containing "magic link" which the customer can click and be redirected to their customer dashboard. From their customer dashboard they can see all the documents contractors will send then when completing work.

Later contractors can naviage to the estimate page and click the new estimate button to start creating a new estimate with Estimate Generators beautiful custom built dynamic ui for creating estimates. When a contractor is done working on an estimate they can click the save button to save an estimate and continue working on it later or they can click the "save and send" button to save the estimate and trigger Estimate Generator to send an email to the customer containing a PDF estimate and a magic link that will redirect them to a ui version of the estimate in their customer account and allow the customer to accept, reject, or request modifications to work estimates.
