# Etape 1: Construire ton application
FROM node:16-alpine as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers de l'application
COPY . .

# Compiler l'application TypeScript et construire le projet Next.js
RUN yarn build

# Etape 2: Exécuter l'application
FROM node:16-alpine

WORKDIR /app

# Copier le build et les dépendances nécessaires à l'exécution
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port (3000 par défaut pour Next.js)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["yarn", "start"]
