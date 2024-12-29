# TravelMate

Application mobile interactive pour planifier et partager vos voyages.

## 🌟 Fonctionnalités

- Planification de voyage intuitive
- Itinéraires touristiques optimisés
- Tracking des souvenirs avec géolocalisation
- Journal de bord collaboratif
- Partage social
- Mode hors ligne
- Sécurité et assistance

## 🛠 Technologies

- **Frontend:** React Native
- **Backend:** Node.js, Express.js
- **Base de données:** MongoDB
- **APIs:** Google Maps
- **Déploiement:** Docker

## 🚀 Installation

### Prérequis

- Node.js >= 14.0.0
- MongoDB >= 4.4
- React Native CLI
- Docker

### Installation du Frontend (React Native)

```bash
cd mobile
npm install
# Pour iOS
cd ios && pod install && cd ..
npx react-native run-ios
# Pour Android
npx react-native run-android
```

### Installation du Backend

```bash
cd server
npm install
npm run dev
```

### Démarrage avec Docker

```bash
docker-compose up -d
```

## 📱 Structure du Projet

```
├── mobile/           # Application React Native
├── server/           # Backend Node.js
└── docker/           # Configuration Docker
```

## 📝 License

MIT