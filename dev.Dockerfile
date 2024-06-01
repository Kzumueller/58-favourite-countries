FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY src ./src
COPY prisma ./prisma
COPY public ./public
COPY entrypoint.sh .env next.config.mjs tsconfig.json .eslintrc.json next-env.d.ts postcss.config.mjs tailwind.config.ts ./

ENV NEXT_TELEMETRY_DISABLED 1

ENTRYPOINT [ "./entrypoint.sh" ]

# Start Next.js in development mode based on the preferred package manager
CMD npx next dev