# Guide d'installation TravelMate

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- React Native CLI
- XCode (pour iOS)
- Android Studio (pour Android)
- Docker et Docker Compose (optionnel)

## Installation du Backend

1. Configurer l'environnement :
```bash
cd server
cp .env.example .env
# Éditer .env avec vos configurations
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur :
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Installation du Frontend (Mobile)

1. Configurer l'environnement :
```bash
cd mobile
cp .env.example .env
# Éditer .env avec vos configurations
```

2. Installer les dépendances :
```bash
npm install

# Pour iOS
cd ios && pod install && cd ..
```

3. Démarrer l'application :
```bash
# iOS
npm run ios

# Android
npm run android
```

## Déploiement avec Docker

1. Construire et démarrer les conteneurs :
```bash
docker-compose up -d
```

2. Vérifier les logs :
```bash
docker-compose logs -f
```

## Configuration Google Maps

1. Créer un projet dans la Google Cloud Console
2. Activer l'API Maps pour iOS et Android
3. Ajouter les clés API dans les fichiers de configuration

## Tests

```bash
# Backend
cd server && npm test

# Frontend
cd mobile && npm test
```

## Problèmes courants

### Erreur de connexion à MongoDB
- Vérifier que MongoDB est en cours d'exécution
- Vérifier l'URL de connexion dans .env

### Erreur de build iOS
- Nettoyer le build : cd ios && xcodebuild clean
- Réinstaller les pods : cd ios && pod install

### Erreur de build Android
- Nettoyer le build : cd android && ./gradlew clean
- Vérifier les variables d'environnement ANDROID_HOME
