# 58 Favourite Countries

*(You can have more - or fewer - than 58)*

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  
Additionally, the [Prisma](https://www.prisma.io/) ORM is used to connect to a PostgresQL database.  
[Tailwind](https://tailwindcss.com/) provides easy access to styles and layouts, using [Daisy UI](https://daisyui.com/) for pre-fab components.

## Getting Started

### Setting up your environment

At this project's root you will find file name `.env.template`.  
Copy and rename it to `.env`, then add credentials for Postgres and a JWT token in the appropriate places (see file itself for further instructions).  

Keep in mind that `POSTGRES_HOST` is the corresponding docker container's name in the docker network so to change it, `docker-compose.yml` needs to adjusted accordingly.  
`POSTGRES_PORT` corresponds to the container's exposed port, also configured in `docker-compose.yml`  

### Building containers

With your .env file in place at the root of the project, run 
```bash
docker compose up
```

This will build containers for postgres, adminer (very simple admin UI, see https://localhost:8080),
and the app itself.  

The app's container (`next-app`) will use Prisma to automatically create all required database tables 
and populate the `Country` table with data fetched via the [GraphQL Countries API](https://graphql.country/graphql) specified in .env.  

## Into the app

Open [http://localhost:3000](http://localhost:3000) in your browser.

Since you're not logged in, you will be redirected to `/login`.  
And since there are no accounts yet, click the link at the bottom of the page to 
be taken to the user registration page where you'll be asked to provide a username and password.  
Usernames must be unique so the form will tell you whether your chosen name is still available.  

Upon successful registration you'll be logged in automatically and taken to the Favourite Countries page
where you can add and remove countries from your list as well as leave and update notes concerning each one.  

**Disclaimer**: When used in a diplomatic capacity, 
the manufacturer of this product cannot be made liable in any way for any international incidents that arise from its use or misuse.

## Database Schema

Definitions for all used tables can be found in `./prisma/schema.prisma`. They will be applied 
and updated automatically when starting the docker container so there is no manual setup required.

## Installing Dependencies and generating the prisma client

Installing `node_modules` and generating a custom prisma client based on defined models is managed via the app's Dockerfile and entrypoint, 
meaning that changes to `package.json` and `schema.prisma` will be applied the next time the container restarts. 