FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm i npm@latest
RUN npm i

COPY src ./src
COPY prisma ./prisma
COPY public ./public
COPY entrypoint.sh next.config.mjs tsconfig.json .eslintrc.json next-env.d.ts postcss.config.mjs tailwind.config.ts ./

ENV NEXT_TELEMETRY_DISABLED 1

ENTRYPOINT [ "./entrypoint.sh" ]

# Start Next.js in development mode
CMD npx next dev
