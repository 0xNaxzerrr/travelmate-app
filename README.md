# TravelMate 🌍✈️

## Description
TravelMate est une application mobile innovante qui simplifie la planification de voyages en utilisant l'IA pour générer des suggestions personnalisées.

## Fonctionnalités
- Authentification utilisateur
- Génération de suggestions de voyage par IA
- Planification détaillée d'itinéraires
- Suivi de voyage avec géolocalisation des photos
- Partage de voyage

## Technologies
- Backend: Node.js, Express.js, MongoDB
- Frontend: React Native, Redux
- IA: OpenAI GPT

## Installation

### Prérequis
- Node.js
- MongoDB
- Expo CLI

### Backend
```bash
cd server
npm install
npm start
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## Configuration
Créez un fichier `.env` dans les dossiers `server` et `mobile` avec :

### Backend `.env`
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/travelmate
JWT_SECRET=votre_secret
OPENAI_API_KEY=votre_clé_openai
```

## Documentation API
Accédez à la documentation Swagger : `http://localhost:3000/api-docs`

## Contributions
Les contributions sont les bienvenues ! 🚀