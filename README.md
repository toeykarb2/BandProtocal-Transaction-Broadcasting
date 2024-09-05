This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```
CSS => tailwindcss as a CSS framework packed

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Transaction Broadcasting and Monitoring Client

**Description:**
Your task is to develop a module/class in a programming language of your choice that interacts with an HTTP
server. This client module will enable the broadcasting of a transaction and subsequently monitor its status
until finalization.

**Requirements:**
Create a client module that is designed to be integrated into another application, with the following capabilities:

## File structure

api folder => band-test\src\app\api
- transaction.ts => RESTful api to get data from transaction api
- broadcast.ts => RESTful api to post data to broadcast api

component folder => band-test\src\app\component
- Container.jsx => mask page for flex screen
- inputForm.jsx => input form component

Constants folder => band-test\src\app\constants
- api.ts => collect api path

modals folder => band-test\src\app\modals
- inputFormType => collect type of inputform component

type folder => band-test\src\app\type
- api.type.ts => collect type of api from band protocal
- http.type.ts => collect http method type
- 

