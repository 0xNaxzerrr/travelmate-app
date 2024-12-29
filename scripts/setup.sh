#!/bin/bash

# Installation des dépendances du backend
echo "Installing backend dependencies..."
cd server
npm install

# Copie du fichier d'environnement backend
cp .env.example .env

# Installation des dépendances frontend
echo "Installing frontend dependencies..."
cd ../mobile
npm install

# Copie du fichier d'environnement frontend
cp .env.example .env

# Installation des pods iOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Installing iOS pods..."
  cd ios && pod install
  cd ..
fi

echo "Setup complete!"
echo "Please configure your .env files in both server and mobile directories."
