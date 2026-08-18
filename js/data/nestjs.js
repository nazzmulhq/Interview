const nestjsInterviewQuestions = [
	{
		id: "nest-1",
		category: "NestJS",
		difficulty: "Basic",
		tags: ["NestJS", "Node.js", "Framework"],
		question: "NestJS কী এবং কেন ব্যবহার করা হয়?",
		answer: `NestJS হলো Node.js-এর উপর তৈরি একটি progressive backend framework। এটি TypeScript-first এবং scalable, maintainable server-side application তৈরির জন্য ব্যবহৃত হয়।

NestJS-এর মূল সুবিধা:
1. Modular architecture
2. Dependency Injection
3. Decorator-based development
4. TypeScript support
5. Middleware
6. Guards
7. Interceptors
8. Pipes
9. Exception Filters
10. Microservices support
11. WebSocket support
12. GraphQL support
13. Testing support

NestJS internally Express অথবা Fastify-এর মতো HTTP adapter ব্যবহার করতে পারে।

Typical architecture:
Controller
   ↓
Service
   ↓
Repository
   ↓
Database`,
	},

	{
		id: "nest-2",
		category: "NestJS",
		difficulty: "Basic",
		tags: ["Architecture", "Module"],
		question: "NestJS-এর architecture কেমন?",
		answer: `NestJS মূলত modular এবং dependency-injection based architecture অনুসরণ করে।

Core building blocks:
- Module
- Controller
- Provider/Service
- Middleware
- Guard
- Pipe
- Interceptor
- Exception Filter
- Custom Decorator

Request flow:

Client
 ↓
Middleware
 ↓
Guard
 ↓
Interceptor
 ↓
Pipe
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database

তারপর response একই lifecycle-এর মাধ্যমে client-এর কাছে ফিরে আসে।

বড় application-এ feature/module ভিত্তিক architecture maintainability অনেক বাড়ায়।`,
	},

	{
		id: "nest-3",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Module", "Dependency Injection"],
		question: "NestJS Module কী?",
		answer: `Module হলো NestJS application-এর একটি logical boundary।

একটি module-এর মধ্যে সাধারণত থাকে:
- Controllers
- Providers
- Imports
- Exports

উদাহরণ:

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

Feature-based structure:
src/
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── orders/
│   ├── orders.module.ts
│   ├── orders.controller.ts
│   └── orders.service.ts

এতে application modular হয়।`,
	},

	{
		id: "nest-4",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Controller", "Routing"],
		question: "NestJS Controller কী?",
		answer: `Controller incoming request receive করে এবং response return করে।

উদাহরণ:

@Controller("users")
export class UserController {

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}

এখানে:
@Controller("users") → /users route
@Get() → GET /users

Controller-এ business logic বেশি রাখা উচিত নয়।

ভালো architecture:
Controller → HTTP handling
Service → Business logic
Repository → Database access`,
	},

	{
		id: "nest-5",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Provider", "Service", "DI"],
		question: "NestJS Provider কী?",
		answer: `Provider হলো এমন একটি injectable class/object যেটা NestJS Dependency Injection container manage করে।

সবচেয়ে common provider হলো Service।

@Injectable()
export class UserService {
  findAll() {
    return [];
  }
}

Controller-এ:

constructor(
  private readonly userService: UserService
) {}

NestJS নিজে UserService-এর instance তৈরি করে এবং Controller-এ inject করে।

Provider হতে পারে:
- Service
- Repository
- Factory
- Custom provider
- External client`,
	},

	{
		id: "nest-6",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Dependency Injection", "IoC"],
		question: "NestJS Dependency Injection কীভাবে কাজ করে?",
		answer: `Dependency Injection হলো class-এর dependency নিজে তৈরি না করে external container থেকে নেওয়া।

Without DI:
class UserController {
  private service = new UserService();
}

NestJS:
constructor(
  private readonly userService: UserService
) {}

NestJS-এর IoC container:
1. Provider register করে।
2. Dependency graph তৈরি করে।
3. প্রয়োজনীয় instance তৈরি করে।
4. Constructor-এ inject করে।
5. Lifecycle অনুযায়ী instance manage করে।

সুবিধা:
- Loose coupling
- Easy testing
- Mocking সহজ
- Maintainability
- Dependency management`,
	},

	{
		id: "nest-7",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Dependency Injection", "Provider Scope"],
		question: "NestJS Provider scope কী?",
		answer: `NestJS provider-এর lifecycle scope তিন ধরনের:

1. DEFAULT / Singleton
2. REQUEST
3. TRANSIENT

Singleton:
পুরো application-এর জন্য সাধারণত একটি instance।

Request-scoped:
প্রতিটি request-এর জন্য নতুন instance।

Transient:
যে consumer inject করে তার জন্য নতুন instance।

Default singleton সবচেয়ে performant এবং সাধারণ business service-এর জন্য সাধারণত যথেষ্ট।

Request scope প্রয়োজন হলে performance এবং dependency tree-এর উপর impact বিবেচনা করতে হয়।`,
	},

	{
		id: "nest-8",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Middleware", "Request Lifecycle"],
		question: "NestJS Middleware কী?",
		answer: `Middleware request এবং response-এর মাঝখানে execute হয়।

Middleware-এর কাজ:
- Logging
- Request ID
- Authentication-related preprocessing
- Parsing
- Request modification

উদাহরণ:

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log(req.method, req.url);
    next();
  }
}

Middleware সাধারণত route handler-এর আগে execute হয়।`,
	},

	{
		id: "nest-9",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Guard", "Authentication", "Authorization"],
		question: "NestJS Guard কী এবং Middleware থেকে পার্থক্য কী?",
		answer: `Guard determine করে request controller handler execute করতে পারবে কিনা।

উদাহরণ:
CanActivate interface implement করে Guard তৈরি করা হয়।

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // authentication check
    return true;
  }
}

Middleware:
Request processing-এর early stage-এ generic কাজ করে।

Guard:
Route access control-এর জন্য designed।

Authentication এবং Authorization-এর জন্য Guard খুব গুরুত্বপূর্ণ।

Flow:
Middleware
 ↓
Guard
 ↓
Interceptor
 ↓
Pipe
 ↓
Controller`,
	},

	{
		id: "nest-10",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Pipe", "Validation", "Transformation"],
		question: "NestJS Pipe কী?",
		answer: `Pipe মূলত দুটি কাজ করে:

1. Validation
2. Transformation

Built-in pipe:
ValidationPipe
ParseIntPipe
ParseBoolPipe
ParseUUIDPipe

উদাহরণ:

@Get(":id")
findOne(
  @Param("id", ParseIntPipe) id: number
) {}

যদি id integer না হয় তাহলে request reject হতে পারে।

Validation-এর জন্য:
@UsePipes(new ValidationPipe({
  whitelist: true,
  transform: true
}))

এটি DTO-based request validation-এর জন্য খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "nest-11",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["DTO", "Validation", "class-validator"],
		question: "NestJS DTO কী?",
		answer: `DTO = Data Transfer Object।

DTO request/response data structure define করতে ব্যবহার করা হয়।

উদাহরণ:

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;
}

Controller:

@Post()
create(@Body() dto: CreateUserDto) {
  return this.userService.create(dto);
}

DTO-এর সুবিধা:
- Validation
- Type safety
- Clear API contract
- Maintainability
- Swagger documentation সহজ`,
	},

	{
		id: "nest-12",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Validation", "Security"],
		question: "NestJS ValidationPipe-এর whitelist, transform এবং forbidNonWhitelisted কী?",
		answer: `whitelist:
DTO-তে define না করা property remove করে।

transform:
Incoming value-কে DTO type অনুযায়ী transform করতে সাহায্য করে।

forbidNonWhitelisted:
অতিরিক্ত property থাকলে request reject করে।

উদাহরণ:

new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true
})

Production API-তে unwanted fields prevent করার জন্য whitelist খুব useful।

forbidNonWhitelisted ব্যবহার করলে client extra field পাঠালে error পাওয়া যায়।`,
	},

	{
		id: "nest-13",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Interceptor", "AOP", "Logging"],
		question: "NestJS Interceptor কী?",
		answer: `Interceptor controller method-এর execution-এর আগে এবং পরে কাজ করতে পারে।

ব্যবহার:
- Logging
- Response transformation
- Performance measurement
- Caching
- Timeout
- Request/response manipulation

Concept:

Request
 ↓
Interceptor Before
 ↓
Controller
 ↓
Service
 ↓
Interceptor After
 ↓
Response

Interceptor RxJS Observable-এর উপর কাজ করে এবং NestJS-এর cross-cutting concern handle করার জন্য খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "nest-14",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Exception Filter", "Error Handling"],
		question: "NestJS Exception Filter কী?",
		answer: `Exception Filter application-এর thrown exception customize করে handle করে।

Built-in:
HttpException

Custom filter:
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host) {
    const response =
      host.switchToHttp().getResponse();

    response.status(500).json({
      message: "Internal Server Error"
    });
  }
}

Centralized error response format maintain করতে Exception Filter ব্যবহার করা হয়।`,
	},

	{
		id: "nest-15",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Request Lifecycle", "Architecture"],
		question: "NestJS request lifecycle কী?",
		answer: `Typical NestJS request lifecycle:

Incoming Request
      ↓
Middleware
      ↓
Guards
      ↓
Interceptors (before)
      ↓
Pipes
      ↓
Controller
      ↓
Service
      ↓
Response
      ↑
Interceptors (after)
      ↑
Exception Filters (যদি exception হয়)

Interview-এ এই lifecycle খুব গুরুত্বপূর্ণ।

বিশেষ করে Middleware বনাম Guard বনাম Pipe বনাম Interceptor বনাম Filter-এর responsibility পরিষ্কারভাবে বুঝতে হবে।`,
	},

	{
		id: "nest-16",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Decorator", "Metadata"],
		question: "NestJS Decorator কী?",
		answer: `Decorator class, method, property বা parameter-এর metadata/behavior define করতে ব্যবহৃত হয়।

Common decorators:
@Controller()
@Get()
@Post()
@Param()
@Query()
@Body()
@UseGuards()
@UsePipes()
@UseInterceptors()
@Injectable()
@Module()

Custom decorator-ও তৈরি করা যায়।

উদাহরণ:
export const CurrentUser = createParamDecorator(
  (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

তারপর:
@Get()
getProfile(@CurrentUser() user) {}`,
	},

	{
		id: "nest-17",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Authentication", "JWT", "Passport"],
		question: "NestJS-এ JWT authentication কীভাবে implement করবেন?",
		answer: `Typical flow:

POST /auth/login
 ↓
Validate credentials
 ↓
Generate JWT
 ↓
Client token রাখে
 ↓
Authorization: Bearer <token>
 ↓
JwtAuthGuard
 ↓
JWT Strategy
 ↓
Validate user
 ↓
Controller

Common packages:
@nestjs/jwt
@nestjs/passport
passport
passport-jwt

JWT payload-এ সাধারণত user identifier এবং প্রয়োজনীয় claims রাখা হয়।

Secret/key source code-এ hardcode না করে environment/secrets management ব্যবহার করা উচিত।`,
	},

	{
		id: "nest-18",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Passport", "Strategy", "Authentication"],
		question: "NestJS Passport Strategy কী?",
		answer: `Passport Strategy authentication mechanism define করে।

Common strategies:
- Local Strategy
- JWT Strategy
- OAuth strategies

JWT example:

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  validate(payload) {
    return payload;
  }
}

JwtAuthGuard Strategy-কে invoke করে এবং successful validation-এর result request user context-এ পাওয়া যায়।`,
	},

	{
		id: "nest-19",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Authorization", "RBAC", "Guard"],
		question: "NestJS-এ Role-Based Authorization কীভাবে করবেন?",
		answer: `প্রথমে custom decorator দিয়ে roles define করা যায়।

@Roles("admin")

তারপর RolesGuard metadata read করে user role check করবে।

Flow:

JWT Authentication
 ↓
req.user
 ↓
RolesGuard
 ↓
Check required roles
 ↓
Allow / Forbidden

Example:

@Roles("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(":id")
deleteUser() {}

এতে authentication এবং authorization আলাদা responsibility থাকে।`,
	},

	{
		id: "nest-20",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Database", "TypeORM"],
		question: "NestJS-এ TypeORM কীভাবে integrate করবেন?",
		answer: `TypeORM একটি ORM যা relational database-এর সাথে কাজ করতে দেয়।

Common databases:
- PostgreSQL
- MySQL
- MariaDB
- SQLite

Integration:

TypeOrmModule.forRoot({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true
});

Entity:

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}

তারপর repository inject করা যায়।`,
	},

	{
		id: "nest-21",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Repository", "TypeORM", "DI"],
		question: "NestJS-এ Repository কীভাবে inject করবেন?",
		answer: `TypeORM repository inject করার জন্য @InjectRepository() ব্যবহার করা যায়।

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll() {
    return this.userRepository.find();
  }
}

Module:
TypeOrmModule.forFeature([User])

Repository database access abstraction দেয় এবং Service-কে database implementation-এর details থেকে কিছুটা আলাদা রাখে।`,
	},

	{
		id: "nest-22",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Prisma", "ORM", "Database"],
		question: "NestJS-এ Prisma কী এবং TypeORM-এর সাথে পার্থক্য কী?",
		answer: `Prisma একটি modern type-safe ORM/database toolkit।

Prisma-এর সুবিধা:
- Strong generated types
- Prisma Client
- Schema-based development
- Developer-friendly query API

TypeORM:
- Entity/decorator based
- Data Mapper/Active Record patterns support
- Mature NestJS integration

Prisma:
- Schema-first approach
- Generated client
- Strong compile-time type safety

দুটিই NestJS-এ ব্যবহার করা যায়। কোনটি ব্যবহার করবেন তা project requirement, team experience এবং ecosystem-এর উপর নির্ভর করে।`,
	},

	{
		id: "nest-23",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Database", "Transaction"],
		question: "NestJS-এ database transaction কীভাবে handle করবেন?",
		answer: `Transaction নিশ্চিত করে একাধিক database operation atomicভাবে execute হবে।

Example:
Order create
 ↓
Order items create
 ↓
Inventory update
 ↓
Commit

কোনো operation fail করলে:
Rollback

TypeORM-এ QueryRunner বা transaction API ব্যবহার করা যায়।

Service layer-এ business transaction boundary define করা ভালো।

Transaction-এর মধ্যে external HTTP call দীর্ঘসময় ধরে রাখা সাধারণত avoid করা উচিত।`,
	},

	{
		id: "nest-24",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Config", "Environment"],
		question: "NestJS-এ environment configuration কীভাবে করবেন?",
		answer: `@nestjs/config package ব্যবহার করা যায়।

ConfigModule.forRoot({
  isGlobal: true,
  cache: true
});

তারপর:

constructor(
  private readonly configService: ConfigService
) {}

const port =
  this.configService.get<number>("PORT");

Production-এ:
- DB credentials
- JWT secret
- API keys
- Service URLs

source code-এ hardcode না করে environment বা proper secret management system ব্যবহার করা উচিত।`,
	},

	{
		id: "nest-25",
		category: "NestJS",
		difficulty: "Important",
		tags: ["CORS", "Security"],
		question: "NestJS-এ CORS কীভাবে configure করবেন?",
		answer: `main.ts:

app.enableCors({
  origin: "https://example.com",
  credentials: true
});

Development-এ multiple origin প্রয়োজন হতে পারে।

Production-এ trusted origin নির্দিষ্ট করা ভালো।

CORS browser-based cross-origin access control-এর বিষয়; এটি authentication বা authorization-এর replacement নয়।`,
	},

	{
		id: "nest-26",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Security", "Helmet", "Rate Limiting"],
		question: "NestJS API security কীভাবে improve করবেন?",
		answer: `Important security measures:

1. Authentication
2. Authorization
3. ValidationPipe
4. Helmet
5. CORS restriction
6. Rate limiting
7. HTTPS
8. Secure cookies
9. Input sanitization/validation
10. Parameterized database queries
11. Secrets management
12. Proper error responses
13. Dependency vulnerability scanning

NestJS ecosystem-এ @nestjs/throttler rate limiting-এর জন্য ব্যবহার করা যায়।

Security layered হওয়া উচিত; একটি middleware বা package-এর উপর সম্পূর্ণ নির্ভর করা উচিত নয়।`,
	},

	{
		id: "nest-27",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Swagger", "OpenAPI"],
		question: "NestJS-এ Swagger কীভাবে ব্যবহার করবেন?",
		answer: `NestJS-এ Swagger/OpenAPI documentation তৈরি করার জন্য @nestjs/swagger ব্যবহার করা যায়।

Basic setup:

const config = new DocumentBuilder()
  .setTitle("API")
  .setVersion("1.0")
  .addBearerAuth()
  .build();

const document =
  SwaggerModule.createDocument(app, config);

SwaggerModule.setup("docs", app, document);

DTO-তে decorators ব্যবহার করলে request/response schema generate করা যায়।

Swagger API contract এবং frontend/backend integration সহজ করে।`,
	},

	{
		id: "nest-28",
		category: "NestJS",
		difficulty: "Important",
		tags: ["Testing", "Unit Test", "E2E"],
		question: "NestJS application কীভাবে test করবেন?",
		answer: `NestJS testing-এর জন্য Jest ecosystem খুব common।

Types:
1. Unit Test
2. Integration Test
3. E2E Test

Unit:
Service-এর business logic test।

Integration:
Module + database বা multiple components test।

E2E:
Real HTTP request দিয়ে পুরো application flow test।

NestJS-এর Test.createTestingModule() দিয়ে test module তৈরি করা যায়।

External dependency mock করলে unit test fast এবং isolated হয়।`,
	},

	{
		id: "nest-29",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Testing", "Mocking", "DI"],
		question: "NestJS-এ dependency mock কীভাবে করবেন?",
		answer: `Testing module-এ provider-এর real implementation-এর পরিবর্তে mock provider দেওয়া যায়।

Example:

{
  provide: UserService,
  useValue: {
    findAll: jest.fn()
  }
}

Controller তখন real UserService-এর পরিবর্তে mock ব্যবহার করবে।

সুবিধা:
- Fast test
- External dependency isolate করা
- Predictable result
- Unit testing সহজ

Dependency Injection architecture testing-এর জন্য বড় সুবিধা দেয়।`,
	},

	{
		id: "nest-30",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Microservices", "Architecture"],
		question: "NestJS Microservices কী?",
		answer: `NestJS built-in microservices abstraction দিয়ে বিভিন্ন transport-এর মাধ্যমে service-to-service communication করা যায়।

Supported transport-এর মধ্যে আছে:
- TCP
- Redis
- NATS
- MQTT
- RabbitMQ
- Kafka
- gRPC

Example:

Order Service
   ↓
RabbitMQ/Kafka
   ↓
Payment Service

অথবা request-response pattern:
Order Service
   ↓
gRPC
   ↓
Payment Service

NestJS-এর Controller/Provider architecture microservice application-এও ব্যবহার করা যায়।`,
	},

	{
		id: "nest-31",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Kafka", "Microservices", "Event Driven"],
		question: "NestJS-এ Kafka কীভাবে ব্যবহার করবেন?",
		answer: `Kafka event-driven communication-এর জন্য ব্যবহার করা যায়।

Example:

Order Service
   ↓
Kafka Topic: order.created
   ↓
 ┌───────────────┐
 ↓               ↓
Payment        Notification
Service        Service

NestJS Kafka transport configuration-এর মাধ্যমে producer এবং consumer তৈরি করা যায়।

Event-based communication-এর সুবিধা:
- Loose coupling
- High throughput
- Async processing
- Multiple consumers

Kafka ব্যবহার করার সময় partition, consumer group, offset, ordering এবং retry/DLQ strategy বুঝতে হবে।`,
	},

	{
		id: "nest-32",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["RabbitMQ", "Microservices", "Messaging"],
		question: "NestJS-এ RabbitMQ কেন ব্যবহার করবেন?",
		answer: `RabbitMQ সাধারণত message queue এবং asynchronous task processing-এর জন্য ব্যবহার করা হয়।

Example:

Order API
 ↓
RabbitMQ
 ↓
Worker
 ↓
Send Email

এটি useful:
- Background jobs
- Service communication
- Retry
- Work queues
- Event/message processing

RabbitMQ এবং Kafka-এর architecture ও use case এক নয়।

RabbitMQ → queue/work distribution-এর জন্য খুব common।

Kafka → high-throughput event streaming/log-based architecture-এর জন্য strong।`,
	},

	{
		id: "nest-33",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["gRPC", "Microservices", "RPC"],
		question: "NestJS-এ gRPC কী?",
		answer: `gRPC একটি high-performance RPC framework যা Protocol Buffers ব্যবহার করে।

Architecture:

Order Service
     ↓
    gRPC
     ↓
Payment Service

gRPC-এর সুবিধা:
- Strong contract
- Code generation
- Efficient binary serialization
- Streaming support
- Internal service-to-service communication-এর জন্য ভালো

REST public API-এর জন্য এবং gRPC internal microservice communication-এর জন্য একসাথে ব্যবহার করা যায়।`,
	},

	{
		id: "nest-34",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["CQRS", "Architecture", "Scalability"],
		question: "NestJS CQRS কী?",
		answer: `CQRS = Command Query Responsibility Segregation।

Read এবং Write operation আলাদা model/handler দিয়ে manage করা হয়।

Traditional:
Controller → Service → DB

CQRS:
Command → CommandHandler → Write Model

Query → QueryHandler → Read Model

NestJS-এ @nestjs/cqrs package ব্যবহার করা যায়।

CQRS useful যখন:
- Complex domain
- Read/write workload খুব আলাদা
- Multiple read models প্রয়োজন
- Domain events প্রয়োজন

Simple CRUD application-এ CQRS unnecessary complexity তৈরি করতে পারে।`,
	},

	{
		id: "nest-35",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Event Sourcing", "CQRS", "Distributed Systems"],
		question: "NestJS context-এ Event Sourcing কী?",
		answer: `Event Sourcing-এ current state সরাসরি শুধু store না করে state পরিবর্তনের events store করা হয়।

Example:

OrderCreated
 ↓
ItemAdded
 ↓
PaymentCompleted
 ↓
OrderShipped

Current order state এই event history replay করে reconstruct করা যায়।

CQRS-এর সাথে Event Sourcing ব্যবহার করা যেতে পারে, কিন্তু CQRS এবং Event Sourcing একই জিনিস নয়।

Event Sourcing-এর complexity:
- Event schema evolution
- Replay
- Storage growth
- Debugging
- Event versioning`,
	},

	{
		id: "nest-36",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Caching", "Redis"],
		question: "NestJS-এ caching কীভাবে implement করবেন?",
		answer: `Frequently accessed data-এর জন্য cache ব্যবহার করা যায়।

Flow:

Request
 ↓
Cache
 ├── Hit → Return
 └── Miss
       ↓
     Database
       ↓
     Cache
       ↓
     Response

Redis distributed caching-এর জন্য ব্যবহার করা যায়।

Important considerations:
- TTL
- Cache key design
- Cache invalidation
- Stale data
- Cache stampede
- Serialization

Caching সব endpoint-এ ব্যবহার করা উচিত নয়; read-heavy এবং expensive operations-এর জন্য বেশি useful।`,
	},

	{
		id: "nest-37",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Background Jobs", "BullMQ", "Redis"],
		question: "NestJS-এ background job কীভাবে implement করবেন?",
		answer: `Long-running বা asynchronous কাজ request lifecycle থেকে বের করে queue worker-এ দেওয়া যায়।

Example:

POST /orders
 ↓
Create Order
 ↓
Add email job
 ↓
Return response

Worker:
Queue
 ↓
Email Worker
 ↓
Send Email

NestJS ecosystem-এ BullMQ + Redis ব্যবহার করা যায়।

Use cases:
- Email
- Notification
- PDF generation
- Image processing
- Report generation
- Scheduled jobs`,
	},

	{
		id: "nest-38",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Scheduling", "Cron"],
		question: "NestJS Scheduled Task কী?",
		answer: `Scheduled tasks নির্দিষ্ট সময় বা interval-এ automatically execute হয়।

Common use:
- Daily reports
- Cleanup
- Expired session removal
- Subscription checking
- Periodic synchronization

NestJS-এ @nestjs/schedule ব্যবহার করা যায়।

Example:
@Cron("0 0 * * *")
handleCron() {
  // daily task
}

Distributed deployment-এ একই cron multiple instances-এ execute হতে পারে। তাই distributed lock বা dedicated scheduler প্রয়োজন হতে পারে।`,
	},

	{
		id: "nest-39",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Interceptors", "Timeout", "Resilience"],
		question: "NestJS API-তে timeout কেন দরকার?",
		answer: `Downstream service indefinitely wait করলে request resources আটকে থাকতে পারে।

Example:

Order Service
 ↓
Payment Service
 ↓
Payment hangs...

Timeout না থাকলে request অনেকক্ষণ pending থাকতে পারে।

Timeout:
Request
 ↓
Wait 3 seconds
 ↓
No response
 ↓
Fail fast

Timeout + Retry + Circuit Breaker একসাথে ব্যবহার করলে distributed system resilience improve করা যায়।`,
	},

	{
		id: "nest-40",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Retry", "Circuit Breaker", "Microservices"],
		question: "NestJS microservice-এ Retry এবং Circuit Breaker কেন দরকার?",
		answer: `Distributed system-এ downstream service temporarily unavailable হতে পারে।

Retry:
Transient failure হলে সীমিত সংখ্যকবার আবার request করে।

Exponential backoff:
1s → 2s → 4s → 8s

Circuit Breaker:
Repeated failure হলে downstream call temporarily বন্ধ করে।

States:
Closed
 ↓ failures
Open
 ↓ timeout
Half-Open
 ↓ success
Closed

Unlimited retry করা dangerous কারণ এতে cascading failure হতে পারে।`,
	},

	{
		id: "nest-41",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Idempotency", "Microservices", "Payment"],
		question: "NestJS API-তে Idempotency কীভাবে implement করবেন?",
		answer: `Payment/order API-তে একই request retry হলে duplicate operation prevent করার জন্য idempotency key ব্যবহার করা যায়।

Request:
POST /payments

Idempotency-Key: abc123

Server:
1. Key check করবে।
2. আগে process করা থাকলে previous result return করবে।
3. না থাকলে operation process করবে।
4. Result এবং key store করবে।

Distributed environment-এ idempotency state shared storage যেমন Redis বা database-এ রাখতে হতে পারে।`,
	},

	{
		id: "nest-42",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Outbox", "Events", "Distributed Transaction"],
		question: "NestJS application-এ Outbox Pattern কী?",
		answer: `একই database transaction-এর মধ্যে business data এবং event record store করার pattern হলো Outbox Pattern।

Problem:

Database update
   ↓ success
Publish Kafka
   ↓ failed ❌

তাহলে database update হয়েছে কিন্তু event publish হয়নি।

Outbox:

BEGIN TRANSACTION
 ↓
Update business data
 ↓
Insert Outbox Event
 ↓
COMMIT
 ↓
Outbox Worker
 ↓
Kafka/RabbitMQ

এতে database state এবং event publication-এর মধ্যে reliability বাড়ে।`,
	},

	{
		id: "nest-43",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Distributed Systems", "Saga"],
		question: "NestJS microservices-এ Saga Pattern কী?",
		answer: `Distributed transaction-এর জন্য Saga Pattern ব্যবহার করা যায়।

ধরা যাক Order process:

Create Order
 ↓
Reserve Inventory
 ↓
Process Payment
 ↓
Confirm Order

যদি Payment fail করে:
Compensating action:
Release Inventory
Cancel Order

Saga দুইভাবে implement করা যায়:
1. Choreography
2. Orchestration

Choreography:
Services events শুনে নিজেরা কাজ করে।

Orchestration:
একটি Saga Orchestrator পুরো workflow coordinate করে।`,
	},

	{
		id: "nest-44",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Observability", "Logging", "Tracing"],
		question: "NestJS production application-এ observability কীভাবে implement করবেন?",
		answer: `Observability-এর তিনটি প্রধান অংশ:

1. Logs
2. Metrics
3. Traces

Logs:
Pino/Winston-এর মতো structured logger।

Metrics:
- Request count
- Error count
- Latency
- CPU
- Memory

Tracing:
Request কোন service-এর মধ্য দিয়ে গেছে তা track করা।

Example:

Client
 ↓
Gateway
 ↓
Order
 ↓
Payment
 ↓
Notification

Trace ID এবং correlation ID ব্যবহার করলে debugging অনেক সহজ হয়। OpenTelemetry একটি common observability ecosystem।`,
	},

	{
		id: "nest-45",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Health Check", "Kubernetes", "Production"],
		question: "NestJS Health Check কী?",
		answer: `Production deployment-এ service healthy কিনা check করার জন্য health endpoint ব্যবহার করা হয়।

NestJS-এ Terminus ecosystem ব্যবহার করা যায়।

Common endpoints:
GET /health/live
GET /health/ready

Liveness:
Application process চলছে কিনা।

Readiness:
Application traffic নেওয়ার জন্য ready কিনা।

Kubernetes-এর মতো orchestration platform-এ এই checks গুরুত্বপূর্ণ।`,
	},

	{
		id: "nest-46",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Graceful Shutdown", "Production"],
		question: "NestJS-এ graceful shutdown কীভাবে করবেন?",
		answer: `Application shutdown-এর সময় existing request শেষ করে resources properly close করা উচিত।

Flow:

SIGTERM
 ↓
Stop accepting traffic
 ↓
Finish active requests
 ↓
Close DB
 ↓
Close Redis
 ↓
Close Kafka/RabbitMQ
 ↓
Exit

NestJS-এ shutdown hooks enable করে lifecycle cleanup implement করা যায়।

Production containerized environment-এ graceful shutdown খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "nest-47",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Performance", "Scalability"],
		question: "NestJS application-এর performance কীভাবে improve করবেন?",
		answer: `Important optimization:

1. Fastify adapter ব্যবহার বিবেচনা করা।
2. Database indexing।
3. Efficient queries।
4. Connection pooling।
5. Redis caching।
6. Pagination।
7. Avoid unnecessary serialization।
8. Background jobs।
9. Compression যেখানে appropriate।
10. Horizontal scaling।
11. Load balancing।
12. Proper logging।
13. Timeouts।
14. Metrics দিয়ে bottleneck identify করা।

প্রথমে profiling এবং metrics দিয়ে bottleneck identify করতে হবে। শুধু অনুমান করে optimization করা উচিত নয়।`,
	},

	{
		id: "nest-48",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Express", "Fastify", "HTTP Adapter"],
		question: "NestJS-এ Express এবং Fastify-এর মধ্যে পার্থক্য কী?",
		answer: `NestJS framework abstraction-এর মাধ্যমে Express বা Fastify adapter ব্যবহার করতে পারে।

Express:
- Mature ecosystem
- Huge middleware ecosystem
- Easy adoption
- Widely used

Fastify:
- Performance-focused
- Efficient serialization
- Plugin architecture

যদি existing Express middleware ecosystem প্রয়োজন হয় Express convenient হতে পারে।

High-throughput API-তে Fastify benchmark করে বিবেচনা করা যেতে পারে।

তবে real-world performance শুধু framework-এর উপর নির্ভর করে না; database, network, serialization, caching এবং application logic বড় factor।`,
	},

	{
		id: "nest-49",
		category: "NestJS",
		difficulty: "Advanced",
		tags: ["Architecture", "Clean Architecture", "SOLID"],
		question: "NestJS-এ Clean Architecture কীভাবে implement করবেন?",
		answer: `NestJS-এর module এবং DI system Clean Architecture implement করতে সাহায্য করতে পারে।

Possible structure:

src/
├── domain/
│   ├── entities/
│   └── interfaces/
├── application/
│   ├── use-cases/
│   └── dto/
├── infrastructure/
│   ├── database/
│   └── external-services/
├── presentation/
│   ├── controllers/
│   └── guards/

Dependency direction:

Presentation
     ↓
Application
     ↓
Domain

Infrastructure সাধারণত abstraction implement করে।

এতে business logic framework এবং database-এর সাথে tightly coupled হয় না।`,
	},

	{
		id: "nest-50",
		category: "NestJS",
		difficulty: "Very Important",
		tags: ["Production", "System Design", "Interview"],
		question: "একটি production-ready NestJS application কীভাবে design করবেন?",
		answer: `Production architecture:

Client
   ↓
CDN / Load Balancer / API Gateway
   ↓
NestJS
   ↓
Middleware
   ↓
Guards
   ↓
Interceptors
   ↓
Pipes
   ↓
Controller
   ↓
Service / Use Case
   ↓
Repository
   ↓
Database

Supporting infrastructure:

NestJS
 ├── PostgreSQL/MySQL
 ├── Redis
 ├── Kafka/RabbitMQ
 ├── Object Storage
 ├── Monitoring
 ├── OpenTelemetry
 └── Centralized Logging

Security:
- JWT/OAuth2
- RBAC
- ValidationPipe
- CORS
- Helmet
- Rate limiting
- HTTPS
- Secret management

Reliability:
- Timeout
- Retry
- Circuit breaker
- Idempotency
- Outbox Pattern
- Graceful shutdown
- Health checks

Scalability:
- Stateless services
- Horizontal scaling
- Load balancing
- Redis caching
- Database optimization
- Async workers

Interview-এর জন্য সবচেয়ে গুরুত্বপূর্ণ NestJS concepts:

1. Module
2. Controller
3. Provider/Service
4. Dependency Injection
5. Middleware
6. Guard
7. Pipe
8. Interceptor
9. Exception Filter
10. DTO + ValidationPipe
11. JWT + Passport
12. RBAC
13. TypeORM/Prisma
14. Transactions
15. Testing
16. Redis
17. Kafka/RabbitMQ
18. gRPC
19. CQRS
20. Saga
21. Outbox
22. Retry/Circuit Breaker
23. Health Check
24. Logging/Metrics/Tracing
25. Production architecture`,
	},
];
