# 🏛️ Principes SOLID

> Guide d'application des principes SOLID dans le projet Todo App

---

## 📚 Introduction

Les principes **SOLID** sont cinq principes de conception orientée objet qui rendent le code plus maintenable, extensible et testable. Ils ont été popularisés par Robert C. Martin (Uncle Bob).

**SOLID** est un acronyme pour:
- **S**ingle Responsibility Principle (SRP)
- **O**pen/Closed Principle (OCP)
- **L**iskov Substitution Principle (LSP)
- **I**nterface Segregation Principle (ISP)
- **D**ependency Inversion Principle (DIP)

---

## 1️⃣ Single Responsibility Principle (SRP)

### 📖 Définition

> Une classe ne devrait avoir qu'une seule raison de changer.

Chaque classe doit avoir une **responsabilité unique** et bien définie. Si une classe fait trop de choses, elle devient difficile à maintenir et à tester.

### ✅ Application dans ce Projet

#### Backend (Java/Spring Boot)

**Séparation en couches**:
```
Controller  → Gère les requêtes HTTP
Service     → Contient la logique métier
Repository  → Gère l'accès aux données
Entity      → Représente le modèle de données
DTO         → Transfert de données
Mapper      → Conversion Entity ↔ DTO
```

**Exemple concret**:

```java
// ❌ MAUVAIS - Classe qui fait trop de choses
@RestController
public class TodoController {
    // Gère HTTP, logique métier, et accès BDD dans la même classe
    public Todo createTodo(TodoDTO dto) {
        // Validation
        if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
            throw new ValidationException("Title required");
        }

        // Logique métier
        Todo todo = new Todo();
        todo.setTitle(dto.getTitle());
        todo.setCreatedAt(LocalDateTime.now());

        // Accès BDD
        EntityManager em = ...;
        em.persist(todo);

        return todo;
    }
}

// ✅ BON - Responsabilités séparées
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@Valid @RequestBody TodoDTO dto) {
        TodoDTO created = todoService.createTodo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    @Override
    public TodoDTO createTodo(TodoDTO dto) {
        Todo todo = todoMapper.toEntity(dto);
        todo.setCreatedAt(LocalDateTime.now());
        Todo saved = todoRepository.save(todo);
        return todoMapper.toDTO(saved);
    }
}

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Gère uniquement l'accès aux données
}
```

#### Frontend (Angular)

**Séparation composant/service**:

```typescript
// ❌ MAUVAIS - Composant avec logique HTTP
@Component({
  selector: 'app-todo-list',
  template: '...'
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  loadTodos() {
    // Logique HTTP dans le composant
    this.http.get<Todo[]>('http://localhost:8080/api/todos')
      .subscribe(data => this.todos = data);
  }
}

// ✅ BON - Responsabilités séparées
@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
}

@Component({
  selector: 'app-todo-list',
  template: '...'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(
      todos => this.todos = todos
    );
  }
}
```

### 🎯 Bénéfices
- ✅ Code plus facile à comprendre
- ✅ Tests plus simples (chaque classe teste une chose)
- ✅ Meilleure réutilisabilité
- ✅ Changements isolés (modifier la BDD n'affecte pas le Controller)

---

## 2️⃣ Open/Closed Principle (OCP)

### 📖 Définition

> Les entités logicielles doivent être ouvertes à l'extension mais fermées à la modification.

On doit pouvoir **ajouter de nouvelles fonctionnalités sans modifier le code existant**.

### ✅ Application dans ce Projet

#### Backend (Java/Spring Boot)

**Utilisation d'interfaces**:

```java
// ❌ MAUVAIS - Modification du code existant pour ajouter une fonctionnalité
public class TodoService {
    public void sendNotification(Todo todo, String type) {
        if (type.equals("EMAIL")) {
            // Envoi email
            System.out.println("Email envoyé pour: " + todo.getTitle());
        } else if (type.equals("SMS")) {
            // Envoi SMS
            System.out.println("SMS envoyé pour: " + todo.getTitle());
        }
        // Pour ajouter PUSH, il faut modifier cette méthode ❌
    }
}

// ✅ BON - Extension via interface
public interface NotificationService {
    void send(Todo todo);
}

@Service
public class EmailNotificationService implements NotificationService {
    @Override
    public void send(Todo todo) {
        System.out.println("Email envoyé pour: " + todo.getTitle());
    }
}

@Service
public class SmsNotificationService implements NotificationService {
    @Override
    public void send(Todo todo) {
        System.out.println("SMS envoyé pour: " + todo.getTitle());
    }
}

// Ajout d'un nouveau type sans modifier le code existant ✅
@Service
public class PushNotificationService implements NotificationService {
    @Override
    public void send(Todo todo) {
        System.out.println("Push envoyé pour: " + todo.getTitle());
    }
}

@Service
public class TodoService {
    private final List<NotificationService> notificationServices;

    public TodoService(List<NotificationService> notificationServices) {
        this.notificationServices = notificationServices;
    }

    public void notifyAll(Todo todo) {
        notificationServices.forEach(service -> service.send(todo));
    }
}
```

#### Frontend (Angular)

**Utilisation de l'injection de dépendances**:

```typescript
// Interface pour le stockage
export interface StorageService {
  save(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
}

// Implémentation LocalStorage
@Injectable({ providedIn: 'root' })
export class LocalStorageService implements StorageService {
  save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

// Ajout SessionStorage sans modifier le code existant ✅
@Injectable({ providedIn: 'root' })
export class SessionStorageService implements StorageService {
  save(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
```

### 🎯 Bénéfices
- ✅ Ajout de fonctionnalités sans risque de casser l'existant
- ✅ Code plus extensible
- ✅ Respect du principe "Don't Repeat Yourself" (DRY)

---

## 3️⃣ Liskov Substitution Principle (LSP)

### 📖 Définition

> Les objets d'une classe dérivée doivent pouvoir remplacer les objets de la classe de base sans altérer le bon fonctionnement du programme.

Les **sous-classes** doivent pouvoir être utilisées à la place de leur **classe parente** sans problème.

### ✅ Application dans ce Projet

#### Backend (Java/Spring Boot)

```java
// ❌ MAUVAIS - La sous-classe viole le contrat
public class TodoService {
    public TodoDTO createTodo(TodoDTO dto) {
        // Crée toujours une todo
        return savedTodo;
    }
}

public class ReadOnlyTodoService extends TodoService {
    @Override
    public TodoDTO createTodo(TodoDTO dto) {
        // Lance une exception au lieu de créer
        throw new UnsupportedOperationException("Read-only mode");
    }
}

// ✅ BON - Interface claire
public interface TodoReader {
    List<TodoDTO> findAll();
    Optional<TodoDTO> findById(Long id);
}

public interface TodoWriter {
    TodoDTO createTodo(TodoDTO dto);
    TodoDTO updateTodo(Long id, TodoDTO dto);
    void deleteTodo(Long id);
}

@Service
public class TodoServiceImpl implements TodoReader, TodoWriter {
    // Implémente toutes les méthodes
}

@Service
public class ReadOnlyTodoService implements TodoReader {
    // N'implémente que la lecture
    @Override
    public List<TodoDTO> findAll() { ... }

    @Override
    public Optional<TodoDTO> findById(Long id) { ... }
}
```

**Exemple avec authentification**:

```java
// Interface commune
public interface UserAuthentication {
    boolean authenticate(String username, String password);
}

// Authentification par base de données
@Service
public class DatabaseAuthentication implements UserAuthentication {
    @Override
    public boolean authenticate(String username, String password) {
        // Vérifie dans la BDD
        User user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
}

// Authentification LDAP (substituable)
@Service
public class LdapAuthentication implements UserAuthentication {
    @Override
    public boolean authenticate(String username, String password) {
        // Vérifie via LDAP
        return ldapTemplate.authenticate(username, password);
    }
}

// Le code client fonctionne avec n'importe quelle implémentation
@Service
public class AuthService {
    private final UserAuthentication authProvider;

    public AuthService(UserAuthentication authProvider) {
        this.authProvider = authProvider;
    }

    public boolean login(String username, String password) {
        return authProvider.authenticate(username, password);
    }
}
```

### 🎯 Bénéfices
- ✅ Polymorphisme sûr
- ✅ Facilite les tests (mocks)
- ✅ Comportement prévisible

---

## 4️⃣ Interface Segregation Principle (ISP)

### 📖 Définition

> Les clients ne devraient pas dépendre d'interfaces qu'ils n'utilisent pas.

Mieux vaut avoir **plusieurs petites interfaces spécifiques** qu'une seule grosse interface générique.

### ✅ Application dans ce Projet

#### Backend (Java/Spring Boot)

```java
// ❌ MAUVAIS - Interface trop large
public interface TodoOperations {
    List<TodoDTO> findAll();
    Optional<TodoDTO> findById(Long id);
    TodoDTO createTodo(TodoDTO dto);
    TodoDTO updateTodo(Long id, TodoDTO dto);
    void deleteTodo(Long id);
    List<TodoDTO> searchByTitle(String title);
    List<TodoDTO> findByStatus(boolean completed);
    long countCompleted();
    void deleteAllCompleted();
    void markAllAsCompleted();
}

// Un service read-only doit implémenter tout ça ❌
public class ReadOnlyTodoService implements TodoOperations {
    // Forcé d'implémenter des méthodes inutiles
    @Override
    public TodoDTO createTodo(TodoDTO dto) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteTodo(Long id) {
        throw new UnsupportedOperationException();
    }
    // ...
}

// ✅ BON - Interfaces ségrégées
public interface TodoReader {
    List<TodoDTO> findAll();
    Optional<TodoDTO> findById(Long id);
}

public interface TodoWriter {
    TodoDTO createTodo(TodoDTO dto);
    TodoDTO updateTodo(Long id, TodoDTO dto);
    void deleteTodo(Long id);
}

public interface TodoSearcher {
    List<TodoDTO> searchByTitle(String title);
    List<TodoDTO> findByStatus(boolean completed);
}

public interface TodoStatistics {
    long countCompleted();
    long countActive();
}

// Chaque service n'implémente que ce dont il a besoin
@Service
public class TodoServiceImpl implements TodoReader, TodoWriter, TodoSearcher, TodoStatistics {
    // Implémentation complète
}

@Service
public class ReadOnlyTodoService implements TodoReader, TodoSearcher {
    // Seulement lecture et recherche
}

@Service
public class TodoStatsService implements TodoStatistics {
    // Seulement statistiques
}
```

#### Frontend (Angular/TypeScript)

```typescript
// ❌ MAUVAIS - Interface trop large
export interface DataService<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  create(item: T): Observable<T>;
  update(id: number, item: T): Observable<T>;
  delete(id: number): Observable<void>;
  search(query: string): Observable<T[]>;
  export(): Observable<Blob>;
  import(file: File): Observable<void>;
}

// ✅ BON - Interfaces ségrégées
export interface Readable<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
}

export interface Writable<T> {
  create(item: T): Observable<T>;
  update(id: number, item: T): Observable<T>;
  delete(id: number): Observable<void>;
}

export interface Searchable<T> {
  search(query: string): Observable<T[]>;
}

export interface Exportable {
  export(): Observable<Blob>;
  import(file: File): Observable<void>;
}

// Service complet
@Injectable({ providedIn: 'root' })
export class TodoService implements Readable<Todo>, Writable<Todo>, Searchable<Todo> {
  // Implémentation
}

// Service en lecture seule
@Injectable({ providedIn: 'root' })
export class TodoReadService implements Readable<Todo>, Searchable<Todo> {
  // Seulement lecture et recherche
}
```

### 🎯 Bénéfices
- ✅ Interfaces plus faciles à implémenter
- ✅ Réduction du couplage
- ✅ Meilleure flexibilité

---

## 5️⃣ Dependency Inversion Principle (DIP)

### 📖 Définition

> Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'abstractions.

Utiliser des **interfaces/abstractions** plutôt que des implémentations concrètes.

### ✅ Application dans ce Projet

#### Backend (Java/Spring Boot)

**Injection de dépendances avec Spring**:

```java
// ❌ MAUVAIS - Dépendance directe à l'implémentation
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    // Dépendance concrète
    private TodoServiceImpl todoService = new TodoServiceImpl();

    @GetMapping
    public List<TodoDTO> getAllTodos() {
        return todoService.findAll();
    }
}

// ✅ BON - Dépendance à l'abstraction
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoService todoService; // Interface

    @Autowired // Injection par constructeur
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<TodoDTO> getAllTodos() {
        return todoService.findAll();
    }
}

// Interface (abstraction)
public interface TodoService {
    List<TodoDTO> findAll();
    Optional<TodoDTO> findById(Long id);
    TodoDTO createTodo(TodoDTO dto);
    // ...
}

// Implémentation
@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository; // Interface aussi!

    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<TodoDTO> findAll() {
        return todoRepository.findAll().stream()
            .map(todoMapper::toDTO)
            .collect(Collectors.toList());
    }
}
```

**Facilite les tests avec des mocks**:

```java
@ExtendWith(MockitoExtension.class)
class TodoControllerTest {
    @Mock
    private TodoService todoService; // Mock de l'interface

    @InjectMocks
    private TodoController todoController;

    @Test
    void shouldGetAllTodos() {
        // Given
        List<TodoDTO> todos = Arrays.asList(new TodoDTO(), new TodoDTO());
        when(todoService.findAll()).thenReturn(todos);

        // When
        List<TodoDTO> result = todoController.getAllTodos();

        // Then
        assertEquals(2, result.size());
        verify(todoService, times(1)).findAll();
    }
}
```

#### Frontend (Angular)

**Injection de dépendances Angular**:

```typescript
// ❌ MAUVAIS - Création d'instance dans le composant
@Component({
  selector: 'app-todo-list',
  template: '...'
})
export class TodoListComponent {
  private http = inject(HttpClient);

  // Dépendance directe à HttpClient
  loadTodos() {
    this.http.get<Todo[]>('http://localhost:8080/api/todos')
      .subscribe(todos => this.todos = todos);
  }
}

// ✅ BON - Injection via abstraction
@Component({
  selector: 'app-todo-list',
  template: '...'
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService); // Service abstrait
  todos: Todo[] = [];

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }
}

// Service (abstraction)
@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/todos';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
}
```

**Tests facilités**:

```typescript
describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    // Mock du service
    mockTodoService = jasmine.createSpyObj('TodoService', ['getTodos']);

    TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        { provide: TodoService, useValue: mockTodoService }
      ]
    });

    component = TestBed.createComponent(TodoListComponent).componentInstance;
  });

  it('should load todos on init', () => {
    const mockTodos = [{ id: 1, title: 'Test' }] as Todo[];
    mockTodoService.getTodos.and.returnValue(of(mockTodos));

    component.ngOnInit();

    expect(component.todos).toEqual(mockTodos);
    expect(mockTodoService.getTodos).toHaveBeenCalled();
  });
});
```

### 🎯 Bénéfices
- ✅ Code découplé et flexible
- ✅ Tests facilités (mocking)
- ✅ Changement d'implémentation sans toucher au code client
- ✅ Inversion of Control (IoC)

---

## 📊 Récapitulatif: SOLID dans Todo App

| Principe | Backend (Java/Spring) | Frontend (Angular) |
|----------|----------------------|-------------------|
| **SRP** | Controller, Service, Repository séparés | Composants, Services séparés |
| **OCP** | Interfaces pour extensions | Services abstraits, Providers |
| **LSP** | Implémentations interchangeables | Guards, Interceptors substituables |
| **ISP** | Interfaces spécifiques (Reader, Writer) | Interfaces TypeScript ciblées |
| **DIP** | Injection de dépendances Spring | Injection de dépendances Angular |

---

## ⚠️ Anti-Patterns à Éviter

### 1. God Class (violation de SRP)
```java
// ❌ Classe qui fait tout
public class TodoManager {
    public void handleHttpRequest() { }
    public void validateData() { }
    public void saveToDatabase() { }
    public void sendEmail() { }
    public void generateReport() { }
}
```

### 2. Tight Coupling (violation de DIP)
```java
// ❌ Couplage fort
public class TodoController {
    private TodoServiceImpl service = new TodoServiceImpl();
}
```

### 3. Fat Interface (violation de ISP)
```java
// ❌ Interface trop large
public interface TodoService {
    void create();
    void read();
    void update();
    void delete();
    void export();
    void import();
    void backup();
    void restore();
    // ... 20 autres méthodes
}
```

### 4. Modification au lieu d'Extension (violation de OCP)
```java
// ❌ Modification du code existant pour ajouter une fonctionnalité
public void process(String type) {
    if (type.equals("A")) { }
    else if (type.equals("B")) { }
    else if (type.equals("C")) { } // On ajoute ici à chaque fois
}
```

---

## 🎯 Checklist SOLID pour Code Review

Avant de valider votre code, vérifiez:

- [ ] **SRP**: Chaque classe a-t-elle une seule responsabilité claire?
- [ ] **OCP**: Puis-je ajouter une fonctionnalité sans modifier le code existant?
- [ ] **LSP**: Mes sous-classes respectent-elles le contrat de la classe parente?
- [ ] **ISP**: Mes interfaces sont-elles spécifiques et ciblées?
- [ ] **DIP**: Est-ce que je dépends d'abstractions plutôt que d'implémentations?

### Questions à se poser:

1. **Pour SRP**: "Cette classe a-t-elle plus d'une raison de changer?"
2. **Pour OCP**: "Si je veux ajouter un nouveau comportement, dois-je modifier cette classe?"
3. **Pour LSP**: "Puis-je remplacer l'objet parent par n'importe quel enfant sans bug?"
4. **Pour ISP**: "Cette interface force-t-elle des implémentations inutiles?"
5. **Pour DIP**: "Mes classes dépendent-elles de classes concrètes ou d'abstractions?"

---

## 📖 Ressources Complémentaires

### Livres
- **Clean Code** - Robert C. Martin
- **Clean Architecture** - Robert C. Martin
- **Design Patterns** - Gang of Four

### Articles
- [SOLID Principles Explained](https://www.baeldung.com/solid-principles)
- [SOLID in Spring Boot](https://www.baeldung.com/spring-boot-solid)
- [Angular Architecture Patterns](https://angular.dev/style-guide)

### Vidéos
- Uncle Bob - SOLID Principles
- Spring Framework Best Practices
- Angular Architecture Best Practices

---

**💡 N'oubliez pas**: Les principes SOLID sont des guides, pas des règles absolues. Appliquez-les avec pragmatisme selon le contexte de votre projet.

---

⭐ **Bonne application des principes SOLID dans votre apprentissage !**
