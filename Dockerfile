# Image de base
FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Builder Next.js
RUN npm run build

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
