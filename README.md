# todo-app-java-angular

> 📚 Application de gestion de tâches (Todo App) - Projet d'apprentissage Java Spring Boot & Angular 19

## 📖 Description

Ce projet est une application web complète de gestion de tâches (Todo List) développée dans un cadre pédagogique. Il permet d'apprendre et de maîtriser les technologies modernes du développement web full-stack, en mettant l'accent sur les bonnes pratiques architecturales et les principes de conception logicielle.

## 🎯 Objectifs Pédagogiques

- ✅ Maîtriser **Java 11** et **Spring Boot 2.7.x**
- ✅ Apprendre **Angular 20** avec **TypeScript**
- ✅ Appliquer les principes **SOLID** (voir [docs/SOLID.md](docs/SOLID.md))
- ✅ Implémenter une **Clean Architecture**
- ✅ Développer des API RESTful
- ✅ Gérer la persistance avec **JPA/Hibernate**
- ✅ Créer des composants Angular réactifs avec **Angular Material**
- ✅ Mettre en place des tests unitaires et d'intégration

## 📁 Structure du Monorepo

```
todo-app-java-angular/
├── backend/              # API Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── frontend/             # Application Angular 19
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── package.json
│   ├── angular.json
│   └── README.md
│
├── docs/                 # Documentation
│   ├── ROADMAP.md       # Plan de développement
│   └── SOLID.md         # Principes SOLID
│
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis

- **Java 11** ou supérieur
- **Maven 3.8+**
- **Node.js 18+** et **npm 9+**
- **Git**

### Backend (Spring Boot)

```bash
# Se placer dans le dossier backend
cd backend

# Installer les dépendances et compiler
mvn clean install

# Lancer l'application
mvn spring-boot:run
```

L'API sera accessible sur **http://localhost:8080**

### Frontend (Angular)

```bash
# Se placer dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

L'application sera accessible sur **http://localhost:4200**

### Console H2 (Base de données)

Pour accéder à la console H2 et visualiser les données:

1. Ouvrir **http://localhost:8080/h2-console**
2. Utiliser les paramètres suivants:
   - **JDBC URL**: `jdbc:h2:mem:tododb`
   - **User Name**: `sa`
   - **Password**: (laisser vide)
3. Cliquer sur "Connect"

**Note**: La base de données H2 fonctionne en mémoire, les données sont perdues au redémarrage du backend.

## 🛠️ Stack Technique

### Backend
- **Java 11**
- **Spring Boot 2.7.18**
- **Spring Data JPA**
- **H2 Database** (en mémoire)
- **Maven**
- **Lombok**
- **JUnit 5** & **Mockito**

### Frontend
- **Angular 20**
- **TypeScript 5.x**
- **RxJS**
- **Angular Material** (UI avec thème Material Design)
- **Jasmine** & **Karma** (tests)

## 🧪 Tests

### Backend

```bash
cd backend

# Lancer tous les tests
mvn test

# Lancer les tests avec couverture
mvn clean test jacoco:report
```

### Frontend

```bash
cd frontend

# Lancer les tests unitaires
npm test

# Lancer les tests avec couverture
npm run test:coverage
```

## 📚 Documentation

- **[ROADMAP.md](docs/ROADMAP.md)** - Plan de développement par phases
- **[SOLID.md](docs/SOLID.md)** - Principes SOLID et exemples d'application

## 🗺️ Phases de Développement

Le projet suit un plan de développement progressif en 10 phases. Consultez [docs/ROADMAP.md](docs/ROADMAP.md) pour le détail complet.

1. ✅ **Phase 1** - Configuration initiale
2. ✅ **Phase 2** - Backend CRUD basique (API REST complète)
3. ✅ **Phase 3** - Frontend basique (Angular Material Design)
4. ⏳ **Phase 4** - Validation et gestion d'erreurs
5. ⏳ **Phase 5** - Filtres et recherche
6. ⏳ **Phase 6** - Authentification JWT
7. ⏳ **Phase 7** - Tests approfondis
8. ⏳ **Phase 8** - Optimisations
9. ⏳ **Phase 9** - Déploiement
10. ⏳ **Phase 10** - Documentation finale

## 👤 Auteur

**Gregory Dernaucourt**

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

⭐ Si ce projet vous aide dans votre apprentissage, n'hésitez pas à lui donner une étoile !
