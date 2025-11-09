# Image de base légère avec Node 20
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./

# Installer les dépendances avec contournement des peer dependencies
RUN npm ci --legacy-peer-deps

# Copier le reste du code
COPY . .

# Construire le projet
RUN npm run build

# Exposer le port par défaut de Next.js
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
