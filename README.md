

# About the Project - Front End

I am utilizing NEXT.js 13 for the front-end of my project. This project revolves around an e-commerce platform designed for purchasing sneakers, offering a wide range of product variations, including different colors and sizes. This flexibility allows customers to buy a single product with various color and size options, products with only color variations, those with only size variations, and even products without either.

To manage the application state, I've integrated Redux Toolkit, while I've used Tailwind CSS to create a cohesive and visually appealing E-commerce design. For the core functionality of the project, I rely on React.js.

Once users have finished selecting items for their shopping cart, they can seamlessly proceed to checkout. For payment processing, I've integrated the STRIPE payment gateway, a trusted European payment solution. This gateway streamlines the payment process by pre-filling payment details with cart data and any additional information needed for transaction processing. The result is a fast and highly intuitive payment experience, which is why I chose to incorporate it into the project.

# ScreenShoots of the Project

![screen1](https://github.com/alexanderdev5/EccomerceSneakers-FE/assets/79029068/3c35f4d1-05e6-4dba-990c-26663d9ec10d)

![screen2](https://github.com/alexanderdev5/EccomerceSneakers-FE/assets/79029068/65278db9-2741-4887-b760-7752dad04c29)

![screen3](https://github.com/alexanderdev5/EccomerceSneakers-FE/assets/79029068/2c8c6212-a0c2-4544-939d-05f673426104)



# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
