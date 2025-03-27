# User Settings API

Cette API est conçue pour gérer les utilisateurs et conserver les paramètres liés à une extension navigateur. Elle permet notamment de créer des utilisateurs, sauvegarder et récupérer leurs préférences personnalisées.

## 🚀 Fonctionnalités principales

- Création et authentification des utilisateurs via JWT
- Gestion des paramètres de l’extension (sauvegarde, mise à jour, lecture)
- Association utilisateur ↔ paramètres personnalisés
- Gestion des erreurs et des logs
- Architecture modulaire avec services, contrôleurs, middlewares, etc.


## 🛠️ Technologies

- **Node.js** + **Express**
- **TypeScript**
- **Sequelize ORM** (avec une base de données SQL)
- **JWT** pour l'authentification
- **ESLint**, **Prettier** pour la qualité du code

## 🔐 Authentification

L’authentification se fait via des tokens JWT. Utilisez l’endpoint `/auth/login` pour générer un token après avoir créé un utilisateur.


## Créer un fichier .env à la racine du projet avec les variables nécessaires :
SECRET_KEY=you_secret
SECRET_KEY_REFRESH=your_secret

## ✅ Lancer le projet
npm run dev

📬 Endpoints principaux
| Méthode | Endpoint                  | Description                            |
|--------:|---------------------------|----------------------------------------|
| POST    | `/auth/register`          | Créer un utilisateur                   |
| POST    | `/auth/login`             | Authentifier un utilisateur (JWT)      |
| GET     | `/settings`               | Récupérer tous les paramètres          |
| POST    | `/settings`               | Ajouter un nouveau paramètre           |
| GET     | `/user-settings/:userId`  | Récupérer les paramètres d’un utilisateur |
| PUT     | `/user-settings/:userId`  | Mettre à jour les paramètres d’un utilisateur |





