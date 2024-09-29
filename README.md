# Sales Management System

This project is a Sales Management System built with **Next.js**, **Tailwind CSS**, **NextAuth.js**, and **MongoDB**. It is designed for sellers to manage their products and sales, while customers can browse and purchase products.

## Features

### Seller Features

- Register and log in as a seller.
- Add new products to the system.
- View sales information after a customer purchases a product.
- See who purchased products.
- View total sales and available products.
- Each Seller have individual profile.

### Customer Features

- Register and log in as a customer.
- View all available products.
- Purchase products from the dashboard.
- View purchase history in the Order page.
- Each Customer have individual profile.
- View detailed information about each product and its seller.

## Getting Started

### Clone the Repository

```bash

git clone https://github.com/sayid2kx/sales-management-system-nextjs.git
cd sales-management-system-nextjs

```

Create a `.env` file in the root of the project and add the following variables:

```text

DATABASE_URL="mongodb://localhost:27017/<your-database-name>"
NEXTAUTH_SECRET="your secret"
NEXTAUTH_URL="base URL"

```

Replace <your-database-name> and other placeholders with your actual values.

## Install Dependencies and Run the Application

```bash

npm install
npm run dev

```

This will start the development server, and you can access the application at `http://localhost:3000`.
