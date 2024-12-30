# TravelMate 🌍✈️

## Description
TravelMate est une application mobile qui simplifie la planification de voyages en utilisant l'IA pour générer des suggestions personnalisées.

## Fonctionnalités
- Authentification utilisateur
- Génération de suggestions de voyage par IA
- Planification détaillée d'itinéraires
- Suivi de voyage avec géolocalisation des photos
- Partage de voyage

## Technologies

### Backend
- Node.js + Express.js
- TypeScript
- Prisma (ORM)
- OpenAI API
- AWS S3
- Redis (Cache)

### Frontend (Mobile)
- React Native
- TypeScript
- Redux Toolkit
- Expo

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Redis

### Backend
```bash
cd server
npm install
npm run prisma:generate
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```