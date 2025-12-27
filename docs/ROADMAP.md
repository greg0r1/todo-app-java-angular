# 🗺️ ROADMAP - Plan de Développement

> Plan de développement progressif en 10 phases pour maîtriser Java Spring Boot & Angular 19

---

## 📊 Vue d'Ensemble

| Phase | Nom | Durée | Statut |
|-------|-----|-------|--------|
| 1 | Configuration initiale | 2-3h | ✅ Complété |
| 2 | Backend CRUD basique | 4-6h | ✅ Complété |
| 3 | Frontend basique | 4-6h | ✅ Complété |
| 4 | Validation et gestion d'erreurs | 3-4h | ⏳ À faire |
| 5 | Filtres et recherche | 3-4h | ⏳ À faire |
| 6 | Authentification JWT | 5-7h | ⏳ À faire |
| 7 | Tests approfondis | 4-5h | ⏳ À faire |
| 8 | Optimisations | 3-4h | ⏳ À faire |
| 9 | Déploiement | 3-4h | ⏳ À faire |
| 10 | Documentation finale | 2-3h | ⏳ À faire |

**Durée totale estimée**: 33-46 heures

---

## Phase 1️⃣ : Configuration Initiale ✅

### 🎯 Objectifs
- Initialiser le monorepo
- Configurer le backend Spring Boot
- Configurer le frontend Angular 19
- Mettre en place Git et la documentation de base

### 📚 Concepts à Apprendre
**Java/Spring**:
- Structure d'un projet Spring Boot
- Maven et gestion des dépendances
- Application.properties et configuration

**Angular**:
- Architecture Angular (modules, composants)
- Angular CLI
- Structure d'un projet Angular 19

### 🏗️ Structure de Code

```
backend/
├── src/main/java/com/todo/
│   ├── TodoApplication.java
│   └── config/
└── src/main/resources/
    └── application.properties

frontend/
├── src/app/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
└── angular.json
```

### ✅ Checklist de Validation
- [x] Projet backend Spring Boot initialisé
- [x] Application Spring Boot démarre sans erreurs
- [x] Projet Angular 19 initialisé
- [x] Application Angular démarre sur http://localhost:4200
- [x] .gitignore configuré pour backend et frontend
- [x] README.md à la racine du projet
- [x] Documentation de base créée

---

## Phase 2️⃣ : Backend CRUD Basique ✅

### 🎯 Objectifs
- Créer le modèle de données Todo
- Implémenter les opérations CRUD (Create, Read, Update, Delete)
- Configurer la base de données H2
- Créer les endpoints REST

### 📚 Concepts à Apprendre
**Java/Spring**:
- **Entités JPA** (@Entity, @Id, @GeneratedValue)
- **Repositories** (JpaRepository, méthodes de requête)
- **Services** (logique métier, @Service)
- **Controllers REST** (@RestController, @RequestMapping)
- **DTOs** (Data Transfer Objects)
- **Base de données H2** (configuration en mémoire)

**Principes SOLID**:
- **SRP** (Single Responsibility): Séparation Entity/Service/Controller
- **DIP** (Dependency Inversion): Injection de dépendances

### 🏗️ Structure de Code

```
backend/src/main/java/com/todo/
├── model/
│   └── Todo.java                    # Entité JPA
├── dto/
│   ├── TodoDTO.java                 # DTO pour transfert
│   └── TodoMapper.java              # Conversion Entity <-> DTO
├── repository/
│   └── TodoRepository.java          # Interface JPA Repository
├── service/
│   ├── TodoService.java             # Interface du service
│   └── TodoServiceImpl.java         # Implémentation
└── controller/
    └── TodoController.java          # REST Controller

backend/src/main/resources/
├── application.properties           # Config H2, JPA
└── data.sql                         # Données de test (optionnel)
```

### 📝 Exemple de Modèle Todo

```java
@Entity
@Table(name = "todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters, setters, constructors
}
```

### 🌐 Endpoints REST à Créer

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/todos` | Récupérer toutes les tâches |
| GET | `/api/todos/{id}` | Récupérer une tâche par ID |
| POST | `/api/todos` | Créer une nouvelle tâche |
| PUT | `/api/todos/{id}` | Mettre à jour une tâche |
| DELETE | `/api/todos/{id}` | Supprimer une tâche |

### ✅ Checklist de Validation
- [x] Entité Todo créée avec annotations JPA
- [x] TodoRepository implémenté (extends JpaRepository)
- [x] TodoService et TodoServiceImpl créés
- [x] TodoController avec les 5 endpoints REST
- [x] Base de données H2 configurée dans application.yaml
- [x] Tests avec l'interface Angular réussis pour tous les endpoints
- [x] Console H2 accessible (http://localhost:8080/h2-console)

---

## Phase 3️⃣ : Frontend Basique ✅

### 🎯 Objectifs
- Créer l'interface utilisateur pour afficher les todos
- Implémenter les formulaires d'ajout et modification
- Connecter le frontend au backend via HTTP
- Gérer l'état de l'application
- Implémenter Angular Material Design

### 📚 Concepts à Apprendre
**Angular**:
- **Components** (création, lifecycle hooks)
- **Services** (HttpClient, injection de dépendances)
- **Reactive Forms** (FormBuilder, Validators)
- **RxJS** (Observables, operators: map, catchError)
- **Routing** (navigation entre vues)
- **Angular Material** (composants UI)
- **Signals** (nouvelle API de réactivité Angular 19)

**Principes SOLID**:
- **SRP**: Séparation composants/services
- **OCP**: Composants extensibles
- **DIP**: Injection de services

### 🏗️ Structure de Code

```
frontend/src/app/
├── core/
│   ├── models/
│   │   └── todo.model.ts            # Interface Todo
│   ├── services/
│   │   └── todo.service.ts          # Service HTTP
│   └── interceptors/
│       └── http-error.interceptor.ts
├── features/
│   └── todos/
│       ├── todo-list/
│       │   ├── todo-list.component.ts
│       │   ├── todo-list.component.html
│       │   └── todo-list.component.scss
│       ├── todo-item/
│       │   ├── todo-item.component.ts
│       │   ├── todo-item.component.html
│       │   └── todo-item.component.scss
│       └── todo-form/
│           ├── todo-form.component.ts
│           ├── todo-form.component.html
│           └── todo-form.component.scss
├── shared/
│   └── components/
│       └── confirmation-dialog/
└── app.routes.ts
```

### 📝 Exemple de Service

```typescript
@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // Autres méthodes CRUD...
}
```

### 🎨 Fonctionnalités UI
- Liste de tous les todos avec statut (complété/non complété)
- Bouton pour marquer une tâche comme complétée
- Formulaire pour ajouter une nouvelle tâche
- Bouton pour éditer une tâche existante
- Bouton pour supprimer une tâche (avec confirmation)
- Filtres: Toutes, Actives, Complétées

### ✅ Checklist de Validation
- [x] TodoService créé avec toutes les méthodes HTTP
- [x] Modèle Todo (interface TypeScript) défini
- [x] Composant TodoList affiche la liste des tâches avec Material Cards
- [x] Composant TodoForm permet de créer des todos avec Material Form Fields
- [x] Composant TodoList affiche les tâches avec checkboxes Material
- [x] Boutons de suppression fonctionnels avec Material Buttons
- [x] Checkbox pour marquer comme complété fonctionne (Material Checkbox)
- [x] Gestion des erreurs avec Material Snackbar
- [x] Angular Material installé et configuré (thème indigo/pink)
- [x] Material Icons intégrés
- [x] Filtres (Toutes/Actives/Complétées) avec Material Chips
- [x] Design responsive avec breakpoints mobile

---

## Phase 4️⃣ : Validation et Gestion d'Erreurs

### 🎯 Objectifs
- Ajouter la validation côté backend (Bean Validation)
- Ajouter la validation côté frontend (Reactive Forms)
- Implémenter une gestion globale des erreurs
- Créer des messages d'erreur utilisateur-friendly

### 📚 Concepts à Apprendre
**Java/Spring**:
- **Bean Validation** (@NotNull, @Size, @Pattern)
- **@Valid** et BindingResult
- **Exception Handling** (@ControllerAdvice, @ExceptionHandler)
- **Custom Exceptions**
- **ResponseEntity** et codes HTTP

**Angular**:
- **Validators** (Validators.required, custom validators)
- **Error handling** (catchError, throwError)
- **Reactive Forms validation**
- **Toast notifications** ou Snackbar

### 🏗️ Structure de Code (Backend)

```
backend/src/main/java/com/todo/
├── dto/
│   └── TodoDTO.java                 # Avec annotations @Valid
├── exception/
│   ├── TodoNotFoundException.java
│   ├── ValidationException.java
│   ├── ErrorResponse.java
│   └── GlobalExceptionHandler.java  # @ControllerAdvice
└── controller/
    └── TodoController.java          # Utilise @Valid
```

### 📝 Exemple de Validation

**Backend (DTO)**:
```java
public class TodoDTO {
    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 3, max = 100, message = "Le titre doit contenir entre 3 et 100 caractères")
    private String title;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;

    // ...
}
```

**Frontend (Reactive Forms)**:
```typescript
this.todoForm = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
  description: ['', [Validators.maxLength(500)]],
  completed: [false]
});
```

### ✅ Checklist de Validation
- [ ] Annotations de validation sur les DTOs backend
- [ ] GlobalExceptionHandler créé (@ControllerAdvice)
- [ ] Custom exceptions (TodoNotFoundException, etc.)
- [ ] Messages d'erreur standardisés (ErrorResponse)
- [ ] Validation Reactive Forms côté Angular
- [ ] Messages d'erreur affichés dans le formulaire
- [ ] Intercepteur HTTP pour gérer les erreurs globalement
- [ ] Toast/Snackbar pour notifier l'utilisateur
- [ ] Tests de validation (champs vides, longueur, etc.)

---

## Phase 5️⃣ : Filtres et Recherche

### 🎯 Objectifs
- Implémenter la recherche de tâches par titre
- Ajouter des filtres (toutes, actives, complétées)
- Implémenter la pagination côté backend
- Créer une interface de filtrage côté frontend

### 📚 Concepts à Apprendre
**Java/Spring**:
- **Query Methods** (findByTitleContaining, findByCompleted)
- **@Query** avec JPQL
- **Pageable** et Page<T>
- **Specification API** (pour filtres dynamiques)
- **@RequestParam**

**Angular**:
- **Pipes** (filter, search)
- **Reactive programming** (debounceTime, distinctUntilChanged)
- **FormControl** pour la recherche
- **Query parameters** dans les routes

### 🏗️ Structure de Code

```
backend/src/main/java/com/todo/
├── repository/
│   └── TodoRepository.java          # Méthodes de recherche
├── service/
│   └── TodoServiceImpl.java         # Logique de filtrage
└── controller/
    └── TodoController.java          # Endpoints avec @RequestParam

frontend/src/app/features/todos/
├── todo-filter/
│   ├── todo-filter.component.ts     # Composant de filtres
│   ├── todo-filter.component.html
│   └── todo-filter.component.scss
└── todo-search/
    ├── todo-search.component.ts     # Barre de recherche
    ├── todo-search.component.html
    └── todo-search.component.scss
```

### 🌐 Nouveaux Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/todos?status={status}` | Filtrer par statut (all, active, completed) |
| GET | `/api/todos/search?q={query}` | Rechercher par titre |
| GET | `/api/todos?page={n}&size={m}` | Pagination |

### ✅ Checklist de Validation
- [ ] Query methods dans TodoRepository
- [ ] Endpoint de recherche par titre fonctionnel
- [ ] Endpoint de filtrage par statut fonctionnel
- [ ] Pagination implémentée côté backend
- [ ] Composant TodoFilter avec boutons (Toutes/Actives/Complétées)
- [ ] Barre de recherche avec debounce (300ms)
- [ ] Résultats de recherche affichés en temps réel
- [ ] Compteurs (X tâches actives, Y complétées)
- [ ] Navigation de pagination côté frontend

---

## Phase 6️⃣ : Authentification JWT

### 🎯 Objectifs
- Implémenter l'authentification JWT côté backend
- Créer les pages de login/register côté frontend
- Protéger les routes et endpoints
- Associer les todos aux utilisateurs

### 📚 Concepts à Apprendre
**Java/Spring**:
- **Spring Security** (configuration, filters)
- **JWT** (génération, validation de tokens)
- **UserDetailsService**
- **Password encoding** (BCrypt)
- **@PreAuthorize**, **@Secured**
- **SecurityContext**

**Angular**:
- **AuthGuard** (protection des routes)
- **Intercepteurs HTTP** (ajout du token)
- **LocalStorage** ou SessionStorage
- **Route guards** (CanActivate)

### 🏗️ Structure de Code

```
backend/src/main/java/com/todo/
├── model/
│   ├── User.java                    # Entité User
│   └── Todo.java                    # ManyToOne vers User
├── repository/
│   └── UserRepository.java
├── security/
│   ├── JwtTokenProvider.java        # Génération/validation JWT
│   ├── JwtAuthenticationFilter.java # Filter pour vérifier token
│   ├── SecurityConfig.java          # Configuration Spring Security
│   └── UserDetailsServiceImpl.java
├── dto/
│   ├── LoginRequest.java
│   ├── SignupRequest.java
│   └── JwtResponse.java
└── controller/
    ├── AuthController.java          # /api/auth/login, /signup
    └── TodoController.java          # Modifié pour user connecté

frontend/src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   ├── jwt.interceptor.ts       # Ajoute token aux requêtes
│   │   └── error.interceptor.ts
│   └── services/
│       └── auth.service.ts
└── features/
    └── auth/
        ├── login/
        ├── register/
        └── profile/
```

### 🔐 Fonctionnalités d'Authentification
- Inscription (register) avec email, username, password
- Connexion (login) avec credentials
- Stockage du JWT dans localStorage
- Auto-login si token valide au démarrage
- Logout (suppression du token)
- Affichage du nom d'utilisateur dans la navbar
- Redirection vers login si non authentifié

### ✅ Checklist de Validation
- [ ] Entité User créée avec relation vers Todo
- [ ] Spring Security configuré
- [ ] JwtTokenProvider créé (génération/validation)
- [ ] Endpoints /api/auth/login et /api/auth/signup
- [ ] Password encodé avec BCrypt
- [ ] JWT Filter ajoute l'utilisateur au SecurityContext
- [ ] AuthService Angular créé
- [ ] Pages Login et Register fonctionnelles
- [ ] JWT stocké dans localStorage après login
- [ ] AuthGuard protège les routes privées
- [ ] JwtInterceptor ajoute le token aux requêtes
- [ ] Logout fonctionnel
- [ ] Chaque utilisateur voit uniquement ses todos

---

## Phase 7️⃣ : Tests Approfondis

### 🎯 Objectifs
- Écrire des tests unitaires backend (JUnit, Mockito)
- Écrire des tests unitaires frontend (Jasmine, Karma)
- Créer des tests d'intégration
- Atteindre une couverture de code > 80%

### 📚 Concepts à Apprendre
**Java/Spring**:
- **JUnit 5** (@Test, @BeforeEach, assertions)
- **Mockito** (@Mock, @InjectMocks, when/then)
- **@WebMvcTest** (tests de controllers)
- **@DataJpaTest** (tests de repositories)
- **@SpringBootTest** (tests d'intégration)
- **MockMvc** (simuler des requêtes HTTP)

**Angular**:
- **Jasmine** (describe, it, expect)
- **Karma** (test runner)
- **TestBed** (configuration des tests)
- **HttpClientTestingModule**
- **Spy objects**

**Principes SOLID**:
- **DIP**: Les mocks facilitent les tests grâce à l'injection de dépendances
- **SRP**: Chaque classe a un rôle clair, facilite les tests unitaires

### 🏗️ Structure de Tests

```
backend/src/test/java/com/todo/
├── repository/
│   └── TodoRepositoryTest.java      # @DataJpaTest
├── service/
│   └── TodoServiceTest.java         # Tests unitaires avec Mockito
├── controller/
│   └── TodoControllerTest.java      # @WebMvcTest
└── integration/
    └── TodoIntegrationTest.java     # @SpringBootTest

frontend/src/app/
├── core/services/
│   ├── todo.service.spec.ts
│   └── auth.service.spec.ts
└── features/todos/
    ├── todo-list/
    │   └── todo-list.component.spec.ts
    └── todo-form/
        └── todo-form.component.spec.ts
```

### 📝 Exemple de Test Backend

```java
@ExtendWith(MockitoExtension.class)
class TodoServiceTest {
    @Mock
    private TodoRepository todoRepository;

    @Mock
    private TodoMapper todoMapper;

    @InjectMocks
    private TodoServiceImpl todoService;

    @Test
    void shouldCreateTodo() {
        // Given
        TodoDTO dto = new TodoDTO("Test", "Description", false);
        Todo entity = new Todo();
        when(todoMapper.toEntity(dto)).thenReturn(entity);
        when(todoRepository.save(entity)).thenReturn(entity);

        // When
        TodoDTO result = todoService.createTodo(dto);

        // Then
        assertNotNull(result);
        verify(todoRepository, times(1)).save(entity);
    }
}
```

### ✅ Checklist de Validation
- [ ] Tests unitaires pour TodoService (avec Mockito)
- [ ] Tests pour TodoController (avec MockMvc)
- [ ] Tests pour TodoRepository (@DataJpaTest)
- [ ] Tests d'intégration complets (@SpringBootTest)
- [ ] Couverture de code backend > 80% (Jacoco)
- [ ] Tests unitaires pour TodoService Angular
- [ ] Tests pour composants Todo (TestBed)
- [ ] Tests pour AuthService et AuthGuard
- [ ] Couverture de code frontend > 80%
- [ ] CI configuré (GitHub Actions ou GitLab CI)

---

## Phase 8️⃣ : Optimisations

### 🎯 Objectifs
- Optimiser les requêtes SQL (N+1 problem)
- Implémenter du caching
- Optimiser le bundle Angular
- Améliorer les performances globales

### 📚 Concepts à Apprendre
**Java/Spring**:
- **@EntityGraph** (éviter N+1)
- **Query optimization** (Hibernate logs)
- **@Cacheable** (Spring Cache)
- **Redis** (cache distribué)
- **Lazy/Eager loading**
- **DTO projections**

**Angular**:
- **Lazy loading** de modules
- **OnPush** change detection
- **TrackBy** dans *ngFor
- **Tree shaking**
- **Code splitting**
- **Service Workers** (PWA)

### 🏗️ Optimisations à Implémenter

**Backend**:
```
├── config/
│   └── CacheConfig.java             # Configuration cache
├── repository/
│   └── TodoRepository.java          # @EntityGraph
└── service/
    └── TodoServiceImpl.java         # @Cacheable
```

**Frontend**:
```
├── app.routes.ts                    # Lazy loading
├── features/
│   └── todos/
│       └── todo-list.component.ts   # OnPush, trackBy
└── environments/
    └── environment.prod.ts          # Production config
```

### ⚡ Optimisations Spécifiques

**Backend**:
- Activer les logs SQL Hibernate
- Utiliser @EntityGraph pour charger User avec Todo
- Mettre en cache la liste des todos avec @Cacheable
- Ajouter des index sur les colonnes fréquemment cherchées
- Utiliser des DTO projections pour les listes

**Frontend**:
- Lazy loading pour le module Auth
- ChangeDetectionStrategy.OnPush sur les composants
- trackBy function dans les *ngFor
- Preloading strategy pour les modules critiques
- Build production avec optimizations

### ✅ Checklist de Validation
- [ ] Logs SQL activés et analysés
- [ ] N+1 queries éliminées avec @EntityGraph
- [ ] Cache implémenté sur les requêtes fréquentes
- [ ] Index ajoutés sur les colonnes critiques
- [ ] Lazy loading implémenté pour les modules Angular
- [ ] OnPush change detection utilisé
- [ ] trackBy ajouté sur toutes les listes
- [ ] Bundle size analysé (ng build --stats-json)
- [ ] Lighthouse score > 90
- [ ] Tests de performance réalisés

---

## Phase 9️⃣ : Déploiement

### 🎯 Objectifs
- Préparer l'application pour la production
- Configurer PostgreSQL en production
- Déployer le backend (Heroku, Railway, ou autre)
- Déployer le frontend (Vercel, Netlify, ou autre)
- Configurer les variables d'environnement

### 📚 Concepts à Apprendre
**DevOps**:
- **Profils Spring** (dev, prod)
- **Variables d'environnement**
- **Docker** (containerisation)
- **CI/CD** (GitHub Actions)
- **PostgreSQL** (migration depuis H2)
- **CORS** (configuration production)
- **HTTPS/SSL**

### 🏗️ Configuration Production

```
backend/
├── src/main/resources/
│   ├── application.properties       # Profil par défaut
│   ├── application-dev.properties   # H2
│   └── application-prod.properties  # PostgreSQL
├── Dockerfile                       # Image Docker backend
└── .dockerignore

frontend/
├── src/environments/
│   ├── environment.ts               # Development
│   └── environment.prod.ts          # Production
├── Dockerfile                       # Image Docker frontend
└── nginx.conf                       # Config serveur
```

### 🐳 Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: todoapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret

  backend:
    build: ./backend
    environment:
      SPRING_PROFILES_ACTIVE: prod
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
```

### ✅ Checklist de Validation
- [ ] Profils Spring configurés (dev, prod)
- [ ] PostgreSQL configuré en production
- [ ] Migrations de schéma avec Flyway ou Liquibase
- [ ] Variables d'environnement externalisées
- [ ] CORS configuré pour le domaine de production
- [ ] Dockerfile backend créé et testé
- [ ] Dockerfile frontend créé et testé
- [ ] Docker Compose fonctionne localement
- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible
- [ ] HTTPS configuré
- [ ] CI/CD pipeline créé (build, test, deploy)

---

## Phase 🔟 : Documentation Finale

### 🎯 Objectifs
- Créer une documentation complète du projet
- Documenter l'architecture et les choix techniques
- Créer un guide utilisateur
- Préparer une présentation du projet

### 📚 Livrables

1. **README.md** (déjà fait, à compléter)
   - Badges (build status, coverage, etc.)
   - Screenshots de l'application
   - Instructions de déploiement

2. **Architecture Documentation**
   - Diagramme de l'architecture globale
   - Diagramme de classes (backend)
   - Diagramme de composants (frontend)
   - Schéma de base de données

3. **API Documentation**
   - Swagger/OpenAPI pour le backend
   - Documentation des endpoints
   - Exemples de requêtes/réponses

4. **Code Documentation**
   - Javadoc pour le backend
   - TSDoc pour le frontend
   - Commentaires sur le code complexe

5. **User Guide**
   - Guide d'utilisation de l'application
   - FAQ
   - Troubleshooting

### 🏗️ Structure Documentation

```
docs/
├── architecture/
│   ├── system-architecture.md
│   ├── database-schema.md
│   └── diagrams/
├── api/
│   └── api-documentation.md         # Swagger UI
├── user-guide/
│   ├── getting-started.md
│   ├── features.md
│   └── faq.md
├── development/
│   ├── setup.md
│   ├── coding-standards.md
│   └── contribution-guide.md
├── ROADMAP.md                       # Ce fichier
└── SOLID.md                         # Principes appliqués
```

### ✅ Checklist de Validation
- [ ] README.md complet avec badges et screenshots
- [ ] Documentation de l'architecture (diagrammes)
- [ ] Swagger/OpenAPI configuré pour l'API
- [ ] Javadoc généré pour le backend
- [ ] TSDoc généré pour le frontend
- [ ] Guide utilisateur créé
- [ ] Guide de contribution créé
- [ ] Changelog maintenu
- [ ] LICENSE à jour
- [ ] Présentation du projet prête

---

## 🎓 Apprentissages Clés par Phase

### Compétences Java/Spring
- ✅ Structure projet Spring Boot (Phase 1)
- ⏳ JPA/Hibernate et repositories (Phase 2)
- ⏳ REST Controllers et DTOs (Phase 2)
- ⏳ Bean Validation (Phase 4)
- ⏳ Exception Handling (Phase 4)
- ⏳ Query methods et pagination (Phase 5)
- ⏳ Spring Security et JWT (Phase 6)
- ⏳ Tests (JUnit, Mockito) (Phase 7)
- ⏳ Caching et optimisations (Phase 8)
- ⏳ Profils et déploiement (Phase 9)

### Compétences Angular
- ✅ Structure projet Angular 19 (Phase 1)
- ⏳ Components et Services (Phase 3)
- ⏳ Reactive Forms et HttpClient (Phase 3)
- ⏳ RxJS et Observables (Phase 3)
- ⏳ Validation et error handling (Phase 4)
- ⏳ Filtres et recherche (Phase 5)
- ⏳ Guards et Interceptors (Phase 6)
- ⏳ Tests (Jasmine, Karma) (Phase 7)
- ⏳ Lazy loading et optimisations (Phase 8)
- ⏳ Build production (Phase 9)

### Principes SOLID
- ✅ **SRP** - Séparation des responsabilités (Phases 2-3)
- ⏳ **OCP** - Composants extensibles (Phase 3)
- ⏳ **LSP** - Substitution de Liskov (Phase 6)
- ⏳ **ISP** - Interfaces spécifiques (Phase 2)
- ⏳ **DIP** - Injection de dépendances (Toutes phases)

---

## 📌 Conseils et Bonnes Pratiques

### Pour Réussir
1. **Une phase à la fois**: Ne pas passer à la phase suivante tant que la précédente n'est pas validée
2. **Commit réguliers**: Faire des commits à chaque fonctionnalité terminée
3. **Tests d'abord**: Tester chaque endpoint/composant immédiatement après création
4. **Documentation au fur et à mesure**: Ne pas attendre la fin pour documenter
5. **Code review**: Relire son code avant de passer à la suite
6. **Refactoring**: Améliorer le code existant quand nécessaire

### Points d'Attention
- ⚠️ **Ne pas négliger les tests** (Phase 7)
- ⚠️ **Bien gérer les erreurs** dès le début (Phase 4)
- ⚠️ **Sécuriser l'application** (Phase 6)
- ⚠️ **Optimiser avant de déployer** (Phase 8)
- ⚠️ **Documenter tout au long du projet**

### Ressources Recommandées
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.dev)
- [Baeldung - Spring Tutorials](https://www.baeldung.com)
- [RealWorld Example Apps](https://github.com/gothinkster/realworld)

---

**🎉 Bonne chance dans votre apprentissage !**

> Ce roadmap est un guide, n'hésitez pas à l'adapter selon vos besoins et votre rythme d'apprentissage.
