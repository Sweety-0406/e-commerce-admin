# Full Stack E-Commerce + Dashboard: Next.js 14 App Router, React, Tailwind, Prisma, PostgreSQL

![alt text](<Screenshot 2024-10-20 223047.png>)

This is a repository for a Full Stack E-Commerce + Dashboard: Next.js 14 App Router, React, Tailwind, Prisma, PostgreSQL

Key Features:

- Shadcn UI is used for the Admin interface.
- The dashboard functions both as the Admin panel and API.
- You can manage multiple vendors/stores (e.g., "Shoe store," "Laptop store," "Suit store") with separate API routes for each.
- Ability to create, update, and delete categories.
- Ability to create, update, and delete products.
- Upload multiple images for products and modify them anytime.
- Manage filters such as "Color" and "Size" and link them during product creation.
- Create, update, and delete billboards, attach them to categories or use them standalone, with APIs generated for all cases.
- Search through categories, products, sizes, colors, and billboards with pagination.
- Control which products are featured on the homepage.
- View orders, sales, and revenue.
- Access graphs showing revenue and other analytics.
- Clerk Authentication is used.
- Ability to create orders.
- Stripe checkout and webhooks.
- Uses PostgreSQL with Prisma.

### Prerequisites

**Node version 20.x**

### Cloning the repository

```shell
git clone https://github.com/Sweety-0406/e-commerce-admin.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# Documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

### Connect to PostgreSQL and Push Prisma
```shell
npx prisma generate
npx prisma db push
```


### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Deployed Link

```shell
https://e-commerce-admin-ten-hazel.vercel.app/
```
