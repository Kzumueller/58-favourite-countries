#!/bin/sh

npm i

# Prisma can only take its default database url from an .env file that it parses itself
# The alternative would be to copy a local .env file or pass the URL in every client constructor
echo "DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB" > .env
npx prisma db push

exec "$@"