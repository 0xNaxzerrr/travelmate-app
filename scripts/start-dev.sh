#!/bin/bash

# Démarrage de MongoDB (si installé localement)
if command -v mongod &> /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /var/log/mongodb.log
fi

# Démarrage du backend
echo "Starting backend server..."
cd server
npm run dev &

# Démarrage du Metro bundler
echo "Starting Metro bundler..."
cd ../mobile
npm start