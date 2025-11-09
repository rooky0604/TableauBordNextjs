# Installer les dépendances
RUN npm install

# Builder Next.js
RUN npm run build

# Lancer l'application
CMD ["npm", "start"]
