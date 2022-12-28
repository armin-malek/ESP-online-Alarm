# ESP alaram - server

## Project setup

you can deploy and use the server in three ways

- with docker (recommend for production)
- local setup (testing only)
- using PM2 (production only)

### Database

the default database is PostgreSQL but since Prisma is used as ORM you can use any SQL database supported by Prisma.

so yeah have a PostgresSQL running locally or you can get one free in Liara.ir or Fly.io .

### envirement variables

put these in a .env file for local setup are enter them in your system environment for production

```
DATABASE_URL="postgresql://root:password@localhost:5432/esp" # database connection url
TG_TOKEN="" # Telegram Bot token
ADMIN_ID="" # your Numberic ID in telegram
```

### with docker

there is Dockerfile so you can easily deploy them on Liara.ir or Fly.io for free,
or if your built different you could just run it locally🤷‍♂️.

### local setup

first, create a .env file and fill in the required environment variables,
and just run these commands, it should just work fine.

```
npm i

npx prisma@4 db push

npm run dev
```

### PM2

run these commands and it should just work fine.
don't forget the ENV!

```
npm i

npx prisma@4 db push

pm2 start server.js
```

## Author

- Armin Esmaeili [@armin-malek](https://www.github.com/armin-malek)
