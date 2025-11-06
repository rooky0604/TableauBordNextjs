FROM node:20.11-alpine

WORKDIR /app
COPY package*.json ./
RUN pnpm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
