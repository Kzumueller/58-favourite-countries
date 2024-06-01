#!/bin/sh

npm i
npx prisma db push

exec "$@"