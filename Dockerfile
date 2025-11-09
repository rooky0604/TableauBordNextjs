# Image de base
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Installer dépendances avec contournement des peer deps
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
