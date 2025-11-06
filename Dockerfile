FROM node:20.11-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer pnpm globalement
RUN npm install -g pnpm

# Installer les dépendances avec pnpm
RUN pnpm install

# Copier tout le code
COPY . .

# Builder Next.js
RUN npm run build

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
