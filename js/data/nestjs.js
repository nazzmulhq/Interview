const nestjsInterviewQuestions = [
  {
    "id": "nest-1",
    "category": "NestJS",
    "difficulty": "Basic",
    "tags": [
      "NestJS",
      "Node.js",
      "Framework"
    ],
    "question": "NestJS কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>NestJS হলো Node.js-এর উপর তৈরি একটি progressive backend framework। এটি TypeScript-first এবং scalable, maintainable server-side application তৈরির জন্য ব্যবহৃত হয়।</p>\n      <p><strong>NestJS-এর মূল সুবিধা:</strong><br>1. Modular architecture<br>2. Dependency Injection<br>3. Decorator-based development<br>4. TypeScript support<br>5. Middleware<br>6. Guards<br>7. Interceptors<br>8. Pipes<br>9. Exception Filters<br>10. Microservices support<br>11. WebSocket support<br>12. GraphQL support<br>13. Testing support</p>\n      <p>NestJS internally Express অথবা Fastify-এর মতো HTTP adapter ব্যবহার করতে পারে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Typical architecture:\nController\n   ↓\nService\n   ↓\nRepository\n   ↓\nDatabase</code></pre>\n      </div>\n    "
  },
  {
    "id": "nest-2",
    "category": "NestJS",
    "difficulty": "Basic",
    "tags": [
      "Architecture",
      "Module"
    ],
    "question": "NestJS-এর architecture কেমন?",
    "answer": "\n      <p>NestJS মূলত modular এবং dependency-injection based architecture অনুসরণ করে।</p>\n      <p><strong>Core building blocks:</strong></p>\n      <ul>\n        <li>Module</li>\n        <li>Controller</li>\n        <li>Provider/Service</li>\n        <li>Middleware</li>\n        <li>Guard</li>\n        <li>Pipe</li>\n        <li>Interceptor</li>\n        <li>Exception Filter</li>\n        <li>Custom Decorator</li>\n      </ul>\n      <h4>Request flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nMiddleware\n ↓\nGuard\n ↓\nInterceptor\n ↓\nPipe\n ↓\nController\n ↓\nService\n ↓\nRepository\n ↓\nDatabase</code></pre>\n      </div>\n      <p>তারপর response একই lifecycle-এর মাধ্যমে client-এর কাছে ফিরে আসে।</p>\n      <p>বড় application-এ feature/module ভিত্তিক architecture maintainability অনেক বাড়ায়।</p>\n    "
  },
  {
    "id": "nest-3",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Module",
      "Dependency Injection"
    ],
    "question": "NestJS Module কী?",
    "answer": "\n      <p>Module হলো NestJS application-এর একটি logical boundary।</p>\n      <p><strong>একটি module-এর মধ্যে সাধারণত থাকে:</strong></p>\n      <ul>\n        <li>Controllers</li>\n        <li>Providers</li>\n        <li>Imports</li>\n        <li>Exports</li>\n      </ul>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Module({\n  controllers: [UserController],\n  providers: [UserService],\n  exports: [UserService]\n})\nexport class UserModule {}</code></pre>\n      </div>\n      <p><strong>Feature-based structure:</strong><br>src/<br>├── users/<br>│   ├── users.module.ts<br>│   ├── users.controller.ts<br>│   └── users.service.ts<br>├── orders/<br>│   ├── orders.module.ts<br>│   ├── orders.controller.ts<br>│   └── orders.service.ts</p>\n      <p>এতে application modular হয়।</p>\n    "
  },
  {
    "id": "nest-4",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Controller",
      "Routing"
    ],
    "question": "NestJS Controller কী?",
    "answer": "\n      <p>Controller incoming request receive করে এবং response return করে।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Controller(\"users\")\nexport class UserController {</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Get()\n  findAll() {\n    return this.userService.findAll();\n  }\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>এখানে:\n@Controller(\"users\") → /users route\n@Get() → GET /users</code></pre>\n      </div>\n      <p>Controller-এ business logic বেশি রাখা উচিত নয়।</p>\n      <p><strong>ভালো architecture:</strong><br>Controller → HTTP handling<br>Service → Business logic<br>Repository → Database access</p>\n    "
  },
  {
    "id": "nest-5",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Provider",
      "Service",
      "DI"
    ],
    "question": "NestJS Provider কী?",
    "answer": "\n      <p>Provider হলো এমন একটি injectable class/object যেটা NestJS Dependency Injection container manage করে।</p>\n      <p>সবচেয়ে common provider হলো Service।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Injectable()\nexport class UserService {\n  findAll() {\n    return [];\n  }\n}</code></pre>\n      </div>\n      <h4>Controller-এ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>constructor(\n  private readonly userService: UserService\n) {}</code></pre>\n      </div>\n      <p>NestJS নিজে UserService-এর instance তৈরি করে এবং Controller-এ inject করে।</p>\n      <p><strong>Provider হতে পারে:</strong></p>\n      <ul>\n        <li>Service</li>\n        <li>Repository</li>\n        <li>Factory</li>\n        <li>Custom provider</li>\n        <li>External client</li>\n      </ul>\n    "
  },
  {
    "id": "nest-6",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Dependency Injection",
      "IoC"
    ],
    "question": "NestJS Dependency Injection কীভাবে কাজ করে?",
    "answer": "\n      <p>Dependency Injection হলো class-এর dependency নিজে তৈরি না করে external container থেকে নেওয়া।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Without DI:\nclass UserController {\n  private service = new UserService();\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>NestJS:\nconstructor(\n  private readonly userService: UserService\n) {}</code></pre>\n      </div>\n      <p><strong>NestJS-এর IoC container:</strong><br>1. Provider register করে।<br>2. Dependency graph তৈরি করে।<br>3. প্রয়োজনীয় instance তৈরি করে।<br>4. Constructor-এ inject করে।<br>5. Lifecycle অনুযায়ী instance manage করে।</p>\n      <p><strong>সুবিধা:</strong></p>\n      <ul>\n        <li>Loose coupling</li>\n        <li>Easy testing</li>\n        <li>Mocking সহজ</li>\n        <li>Maintainability</li>\n        <li>Dependency management</li>\n      </ul>\n    "
  },
  {
    "id": "nest-7",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Dependency Injection",
      "Provider Scope"
    ],
    "question": "NestJS Provider scope কী?",
    "answer": "\n      <h4>NestJS provider-এর lifecycle scope তিন ধরনের:</h4>\n      <ol>\n        <li>DEFAULT / Singleton</li>\n        <li>REQUEST</li>\n        <li>TRANSIENT</li>\n      </ol>\n      <p><strong>Singleton:</strong><br>পুরো application-এর জন্য সাধারণত একটি instance।</p>\n      <p><strong>Request-scoped:</strong><br>প্রতিটি request-এর জন্য নতুন instance।</p>\n      <p><strong>Transient:</strong><br>যে consumer inject করে তার জন্য নতুন instance।</p>\n      <p>Default singleton সবচেয়ে performant এবং সাধারণ business service-এর জন্য সাধারণত যথেষ্ট।</p>\n      <p>Request scope প্রয়োজন হলে performance এবং dependency tree-এর উপর impact বিবেচনা করতে হয়।</p>\n    "
  },
  {
    "id": "nest-8",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Middleware",
      "Request Lifecycle"
    ],
    "question": "NestJS Middleware কী?",
    "answer": "\n      <p>Middleware request এবং response-এর মাঝখানে execute হয়।</p>\n      <p><strong>Middleware-এর কাজ:</strong></p>\n      <ul>\n        <li>Logging</li>\n        <li>Request ID</li>\n        <li>Authentication-related preprocessing</li>\n        <li>Parsing</li>\n        <li>Request modification</li>\n      </ul>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Injectable()\nexport class LoggerMiddleware implements NestMiddleware {\n  use(req, res, next) {\n    console.log(req.method, req.url);\n    next();\n  }\n}</code></pre>\n      </div>\n      <p>Middleware সাধারণত route handler-এর আগে execute হয়।</p>\n    "
  },
  {
    "id": "nest-9",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Guard",
      "Authentication",
      "Authorization"
    ],
    "question": "NestJS Guard কী এবং Middleware থেকে পার্থক্য কী?",
    "answer": "\n      <p>Guard determine করে request controller handler execute করতে পারবে কিনা।</p>\n      <p><strong>উদাহরণ:</strong><br>CanActivate interface implement করে Guard তৈরি করা হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Injectable()\nexport class AuthGuard implements CanActivate {\n  canActivate(context: ExecutionContext) {\n    // authentication check\n    return true;\n  }\n}</code></pre>\n      </div>\n      <p><strong>Middleware:</strong><br>Request processing-এর early stage-এ generic কাজ করে।</p>\n      <p><strong>Guard:</strong><br>Route access control-এর জন্য designed।</p>\n      <p>Authentication এবং Authorization-এর জন্য Guard খুব গুরুত্বপূর্ণ।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Flow:\nMiddleware\n ↓\nGuard\n ↓\nInterceptor\n ↓\nPipe\n ↓\nController</code></pre>\n      </div>\n    "
  },
  {
    "id": "nest-10",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Pipe",
      "Validation",
      "Transformation"
    ],
    "question": "NestJS Pipe কী?",
    "answer": "\n      <h4>Pipe মূলত দুটি কাজ করে:</h4>\n      <ol>\n        <li>Validation</li>\n        <li>Transformation</li>\n      </ol>\n      <p><strong>Built-in pipe:</strong><br>ValidationPipe<br>ParseIntPipe<br>ParseBoolPipe<br>ParseUUIDPipe</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Get(\":id\")\nfindOne(\n  @Param(\"id\", ParseIntPipe) id: number\n) {}</code></pre>\n      </div>\n      <p>যদি id integer না হয় তাহলে request reject হতে পারে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Validation-এর জন্য:\n@UsePipes(new ValidationPipe({\n  whitelist: true,\n  transform: true\n}))</code></pre>\n      </div>\n      <p>এটি DTO-based request validation-এর জন্য খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "nest-11",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "DTO",
      "Validation",
      "class-validator"
    ],
    "question": "NestJS DTO কী?",
    "answer": "\n      <p>DTO = Data Transfer Object।</p>\n      <p>DTO request/response data structure define করতে ব্যবহার করা হয়।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export class CreateUserDto {\n  @IsEmail()\n  email: string;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@IsString()\n  @MinLength(2)\n  name: string;\n}</code></pre>\n      </div>\n      <h4>Controller:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Post()\ncreate(@Body() dto: CreateUserDto) {\n  return this.userService.create(dto);\n}</code></pre>\n      </div>\n      <p><strong>DTO-এর সুবিধা:</strong></p>\n      <ul>\n        <li>Validation</li>\n        <li>Type safety</li>\n        <li>Clear API contract</li>\n        <li>Maintainability</li>\n        <li>Swagger documentation সহজ</li>\n      </ul>\n    "
  },
  {
    "id": "nest-12",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Validation",
      "Security"
    ],
    "question": "NestJS ValidationPipe-এর whitelist, transform এবং forbidNonWhitelisted কী?",
    "answer": "\n      <p><strong>whitelist:</strong><br>DTO-তে define না করা property remove করে।</p>\n      <p><strong>transform:</strong><br>Incoming value-কে DTO type অনুযায়ী transform করতে সাহায্য করে।</p>\n      <p><strong>forbidNonWhitelisted:</strong><br>অতিরিক্ত property থাকলে request reject করে।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>new ValidationPipe({\n  whitelist: true,\n  transform: true,\n  forbidNonWhitelisted: true\n})</code></pre>\n      </div>\n      <p>Production API-তে unwanted fields prevent করার জন্য whitelist খুব useful।</p>\n      <p>forbidNonWhitelisted ব্যবহার করলে client extra field পাঠালে error পাওয়া যায়।</p>\n    "
  },
  {
    "id": "nest-13",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Interceptor",
      "AOP",
      "Logging"
    ],
    "question": "NestJS Interceptor কী?",
    "answer": "\n      <p>Interceptor controller method-এর execution-এর আগে এবং পরে কাজ করতে পারে।</p>\n      <p><strong>ব্যবহার:</strong></p>\n      <ul>\n        <li>Logging</li>\n        <li>Response transformation</li>\n        <li>Performance measurement</li>\n        <li>Caching</li>\n        <li>Timeout</li>\n        <li>Request/response manipulation</li>\n      </ul>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nInterceptor Before\n ↓\nController\n ↓\nService\n ↓\nInterceptor After\n ↓\nResponse</code></pre>\n      </div>\n      <p>Interceptor RxJS Observable-এর উপর কাজ করে এবং NestJS-এর cross-cutting concern handle করার জন্য খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "nest-14",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Exception Filter",
      "Error Handling"
    ],
    "question": "NestJS Exception Filter কী?",
    "answer": "\n      <p>Exception Filter application-এর thrown exception customize করে handle করে।</p>\n      <p><strong>Built-in:</strong><br>HttpException</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Custom filter:\n@Catch()\nexport class AllExceptionsFilter implements ExceptionFilter {\n  catch(exception, host) {\n    const response =\n      host.switchToHttp().getResponse();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>response.status(500).json({\n      message: \"Internal Server Error\"\n    });\n  }\n}</code></pre>\n      </div>\n      <p>Centralized error response format maintain করতে Exception Filter ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "nest-15",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Request Lifecycle",
      "Architecture"
    ],
    "question": "NestJS request lifecycle কী?",
    "answer": "\n      <h4>Typical NestJS request lifecycle:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Incoming Request\n      ↓\nMiddleware\n      ↓\nGuards\n      ↓\nInterceptors (before)\n      ↓\nPipes\n      ↓\nController\n      ↓\nService\n      ↓\nResponse\n      ↑\nInterceptors (after)\n      ↑\nException Filters (যদি exception হয়)</code></pre>\n      </div>\n      <p>Interview-এ এই lifecycle খুব গুরুত্বপূর্ণ।</p>\n      <p>বিশেষ করে Middleware বনাম Guard বনাম Pipe বনাম Interceptor বনাম Filter-এর responsibility পরিষ্কারভাবে বুঝতে হবে।</p>\n    "
  },
  {
    "id": "nest-16",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Decorator",
      "Metadata"
    ],
    "question": "NestJS Decorator কী?",
    "answer": "\n      <p>Decorator class, method, property বা parameter-এর metadata/behavior define করতে ব্যবহৃত হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Common decorators:\n@Controller()\n@Get()\n@Post()\n@Param()\n@Query()\n@Body()\n@UseGuards()\n@UsePipes()\n@UseInterceptors()\n@Injectable()\n@Module()</code></pre>\n      </div>\n      <p>Custom decorator-ও তৈরি করা যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\nexport const CurrentUser = createParamDecorator(\n  (data, ctx) =&gt; {\n    const request = ctx.switchToHttp().getRequest();\n    return request.user;\n  }\n);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>তারপর:\n@Get()\ngetProfile(@CurrentUser() user) {}</code></pre>\n      </div>\n    "
  },
  {
    "id": "nest-17",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Authentication",
      "JWT",
      "Passport"
    ],
    "question": "NestJS-এ JWT authentication কীভাবে implement করবেন?",
    "answer": "\n      <h4>Typical flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>POST /auth/login\n ↓\nValidate credentials\n ↓\nGenerate JWT\n ↓\nClient token রাখে\n ↓\nAuthorization: Bearer &lt;token&gt;\n ↓\nJwtAuthGuard\n ↓\nJWT Strategy\n ↓\nValidate user\n ↓\nController</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Common packages:\n@nestjs/jwt\n@nestjs/passport\npassport\npassport-jwt</code></pre>\n      </div>\n      <p>JWT payload-এ সাধারণত user identifier এবং প্রয়োজনীয় claims রাখা হয়।</p>\n      <p>Secret/key source code-এ hardcode না করে environment/secrets management ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "nest-18",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Passport",
      "Strategy",
      "Authentication"
    ],
    "question": "NestJS Passport Strategy কী?",
    "answer": "\n      <p>Passport Strategy authentication mechanism define করে।</p>\n      <p><strong>Common strategies:</strong></p>\n      <ul>\n        <li>Local Strategy</li>\n        <li>JWT Strategy</li>\n        <li>OAuth strategies</li>\n      </ul>\n      <h4>JWT example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Injectable()\nexport class JwtStrategy extends PassportStrategy(Strategy) {\n  constructor() {\n    super({\n      jwtFromRequest:\n        ExtractJwt.fromAuthHeaderAsBearerToken(),\n      secretOrKey: process.env.JWT_SECRET\n    });\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>validate(payload) {\n    return payload;\n  }\n}</code></pre>\n      </div>\n      <p>JwtAuthGuard Strategy-কে invoke করে এবং successful validation-এর result request user context-এ পাওয়া যায়।</p>\n    "
  },
  {
    "id": "nest-19",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Authorization",
      "RBAC",
      "Guard"
    ],
    "question": "NestJS-এ Role-Based Authorization কীভাবে করবেন?",
    "answer": "\n      <p>প্রথমে custom decorator দিয়ে roles define করা যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Roles(\"admin\")</code></pre>\n      </div>\n      <p>তারপর RolesGuard metadata read করে user role check করবে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JWT Authentication\n ↓\nreq.user\n ↓\nRolesGuard\n ↓\nCheck required roles\n ↓\nAllow / Forbidden</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Roles(\"admin\")\n@UseGuards(JwtAuthGuard, RolesGuard)\n@Delete(\":id\")\ndeleteUser() {}</code></pre>\n      </div>\n      <p>এতে authentication এবং authorization আলাদা responsibility থাকে।</p>\n    "
  },
  {
    "id": "nest-20",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Database",
      "TypeORM"
    ],
    "question": "NestJS-এ TypeORM কীভাবে integrate করবেন?",
    "answer": "\n      <p>TypeORM একটি ORM যা relational database-এর সাথে কাজ করতে দেয়।</p>\n      <p><strong>Common databases:</strong></p>\n      <ul>\n        <li>PostgreSQL</li>\n        <li>MySQL</li>\n        <li>MariaDB</li>\n        <li>SQLite</li>\n      </ul>\n      <h4>Integration:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>TypeOrmModule.forRoot({\n  type: \"postgres\",\n  host: process.env.DB_HOST,\n  username: process.env.DB_USER,\n  password: process.env.DB_PASSWORD,\n  database: process.env.DB_NAME,\n  autoLoadEntities: true\n});</code></pre>\n      </div>\n      <h4>Entity:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Entity()\nexport class User {\n  @PrimaryGeneratedColumn()\n  id: number;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Column()\n  email: string;\n}</code></pre>\n      </div>\n      <p>তারপর repository inject করা যায়।</p>\n    "
  },
  {
    "id": "nest-21",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Repository",
      "TypeORM",
      "DI"
    ],
    "question": "NestJS-এ Repository কীভাবে inject করবেন?",
    "answer": "\n      <p>TypeORM repository inject করার জন্য @InjectRepository() ব্যবহার করা যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@Injectable()\nexport class UserService {\n  constructor(\n    @InjectRepository(User)\n    private readonly userRepository: Repository&lt;User&gt;\n  ) {}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>findAll() {\n    return this.userRepository.find();\n  }\n}</code></pre>\n      </div>\n      <p><strong>Module:</strong><br>TypeOrmModule.forFeature([User])</p>\n      <p>Repository database access abstraction দেয় এবং Service-কে database implementation-এর details থেকে কিছুটা আলাদা রাখে।</p>\n    "
  },
  {
    "id": "nest-22",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Prisma",
      "ORM",
      "Database"
    ],
    "question": "NestJS-এ Prisma কী এবং TypeORM-এর সাথে পার্থক্য কী?",
    "answer": "\n      <p>Prisma একটি modern type-safe ORM/database toolkit।</p>\n      <p><strong>Prisma-এর সুবিধা:</strong></p>\n      <ul>\n        <li>Strong generated types</li>\n        <li>Prisma Client</li>\n        <li>Schema-based development</li>\n        <li>Developer-friendly query API</li>\n      </ul>\n      <p><strong>TypeORM:</strong></p>\n      <ul>\n        <li>Entity/decorator based</li>\n        <li>Data Mapper/Active Record patterns support</li>\n        <li>Mature NestJS integration</li>\n      </ul>\n      <p><strong>Prisma:</strong></p>\n      <ul>\n        <li>Schema-first approach</li>\n        <li>Generated client</li>\n        <li>Strong compile-time type safety</li>\n      </ul>\n      <p>দুটিই NestJS-এ ব্যবহার করা যায়। কোনটি ব্যবহার করবেন তা project requirement, team experience এবং ecosystem-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "nest-23",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Database",
      "Transaction"
    ],
    "question": "NestJS-এ database transaction কীভাবে handle করবেন?",
    "answer": "\n      <p>Transaction নিশ্চিত করে একাধিক database operation atomicভাবে execute হবে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Example:\nOrder create\n ↓\nOrder items create\n ↓\nInventory update\n ↓\nCommit</code></pre>\n      </div>\n      <p><strong>কোনো operation fail করলে:</strong><br>Rollback</p>\n      <p>TypeORM-এ QueryRunner বা transaction API ব্যবহার করা যায়।</p>\n      <p>Service layer-এ business transaction boundary define করা ভালো।</p>\n      <p>Transaction-এর মধ্যে external HTTP call দীর্ঘসময় ধরে রাখা সাধারণত avoid করা উচিত।</p>\n    "
  },
  {
    "id": "nest-24",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Config",
      "Environment"
    ],
    "question": "NestJS-এ environment configuration কীভাবে করবেন?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@nestjs/config package ব্যবহার করা যায়।</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ConfigModule.forRoot({\n  isGlobal: true,\n  cache: true\n});</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>constructor(\n  private readonly configService: ConfigService\n) {}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const port =\n  this.configService.get&lt;number&gt;(\"PORT\");</code></pre>\n      </div>\n      <p><strong>Production-এ:</strong></p>\n      <ul>\n        <li>DB credentials</li>\n        <li>JWT secret</li>\n        <li>API keys</li>\n        <li>Service URLs</li>\n      </ul>\n      <p>source code-এ hardcode না করে environment বা proper secret management system ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "nest-25",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "CORS",
      "Security"
    ],
    "question": "NestJS-এ CORS কীভাবে configure করবেন?",
    "answer": "\n      <h4>main.ts:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.enableCors({\n  origin: \"https://example.com\",\n  credentials: true\n});</code></pre>\n      </div>\n      <p>Development-এ multiple origin প্রয়োজন হতে পারে।</p>\n      <p>Production-এ trusted origin নির্দিষ্ট করা ভালো।</p>\n      <p>CORS browser-based cross-origin access control-এর বিষয়; এটি authentication বা authorization-এর replacement নয়।</p>\n    "
  },
  {
    "id": "nest-26",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Security",
      "Helmet",
      "Rate Limiting"
    ],
    "question": "NestJS API security কীভাবে improve করবেন?",
    "answer": "\n      <h4>Important security measures:</h4>\n      <ol>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>ValidationPipe</li>\n        <li>Helmet</li>\n        <li>CORS restriction</li>\n        <li>Rate limiting</li>\n        <li>HTTPS</li>\n        <li>Secure cookies</li>\n        <li>Input sanitization/validation</li>\n        <li>Parameterized database queries</li>\n        <li>Secrets management</li>\n        <li>Proper error responses</li>\n        <li>Dependency vulnerability scanning</li>\n      </ol>\n      <p>NestJS ecosystem-এ @nestjs/throttler rate limiting-এর জন্য ব্যবহার করা যায়।</p>\n      <p>Security layered হওয়া উচিত; একটি middleware বা package-এর উপর সম্পূর্ণ নির্ভর করা উচিত নয়।</p>\n    "
  },
  {
    "id": "nest-27",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Swagger",
      "OpenAPI"
    ],
    "question": "NestJS-এ Swagger কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p>NestJS-এ Swagger/OpenAPI documentation তৈরি করার জন্য @nestjs/swagger ব্যবহার করা যায়।</p>\n      <h4>Basic setup:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const config = new DocumentBuilder()\n  .setTitle(\"API\")\n  .setVersion(\"1.0\")\n  .addBearerAuth()\n  .build();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const document =\n  SwaggerModule.createDocument(app, config);</code></pre>\n      </div>\n      <p>SwaggerModule.setup(\"docs\", app, document);</p>\n      <p>DTO-তে decorators ব্যবহার করলে request/response schema generate করা যায়।</p>\n      <p>Swagger API contract এবং frontend/backend integration সহজ করে।</p>\n    "
  },
  {
    "id": "nest-28",
    "category": "NestJS",
    "difficulty": "Important",
    "tags": [
      "Testing",
      "Unit Test",
      "E2E"
    ],
    "question": "NestJS application কীভাবে test করবেন?",
    "answer": "\n      <p>NestJS testing-এর জন্য Jest ecosystem খুব common।</p>\n      <p><strong>Types:</strong><br>1. Unit Test<br>2. Integration Test<br>3. E2E Test</p>\n      <p><strong>Unit:</strong><br>Service-এর business logic test।</p>\n      <p><strong>Integration:</strong><br>Module + database বা multiple components test।</p>\n      <p><strong>E2E:</strong><br>Real HTTP request দিয়ে পুরো application flow test।</p>\n      <p>NestJS-এর Test.createTestingModule() দিয়ে test module তৈরি করা যায়।</p>\n      <p>External dependency mock করলে unit test fast এবং isolated হয়।</p>\n    "
  },
  {
    "id": "nest-29",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Testing",
      "Mocking",
      "DI"
    ],
    "question": "NestJS-এ dependency mock কীভাবে করবেন?",
    "answer": "\n      <p>Testing module-এ provider-এর real implementation-এর পরিবর্তে mock provider দেওয়া যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  provide: UserService,\n  useValue: {\n    findAll: jest.fn()\n  }\n}</code></pre>\n      </div>\n      <p>Controller তখন real UserService-এর পরিবর্তে mock ব্যবহার করবে।</p>\n      <p><strong>সুবিধা:</strong></p>\n      <ul>\n        <li>Fast test</li>\n        <li>External dependency isolate করা</li>\n        <li>Predictable result</li>\n        <li>Unit testing সহজ</li>\n      </ul>\n      <p>Dependency Injection architecture testing-এর জন্য বড় সুবিধা দেয়।</p>\n    "
  },
  {
    "id": "nest-30",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Microservices",
      "Architecture"
    ],
    "question": "NestJS Microservices কী?",
    "answer": "\n      <p>NestJS built-in microservices abstraction দিয়ে বিভিন্ন transport-এর মাধ্যমে service-to-service communication করা যায়।</p>\n      <p><strong>Supported transport-এর মধ্যে আছে:</strong></p>\n      <ul>\n        <li>TCP</li>\n        <li>Redis</li>\n        <li>NATS</li>\n        <li>MQTT</li>\n        <li>RabbitMQ</li>\n        <li>Kafka</li>\n        <li>gRPC</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n   ↓\nRabbitMQ/Kafka\n   ↓\nPayment Service</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>অথবা request-response pattern:\nOrder Service\n   ↓\ngRPC\n   ↓\nPayment Service</code></pre>\n      </div>\n      <p>NestJS-এর Controller/Provider architecture microservice application-এও ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "nest-31",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Kafka",
      "Microservices",
      "Event Driven"
    ],
    "question": "NestJS-এ Kafka কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p>Kafka event-driven communication-এর জন্য ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n   ↓\nKafka Topic: order.created\n   ↓\n ┌───────────────┐\n ↓               ↓\nPayment        Notification\nService        Service</code></pre>\n      </div>\n      <p>NestJS Kafka transport configuration-এর মাধ্যমে producer এবং consumer তৈরি করা যায়।</p>\n      <p><strong>Event-based communication-এর সুবিধা:</strong></p>\n      <ul>\n        <li>Loose coupling</li>\n        <li>High throughput</li>\n        <li>Async processing</li>\n        <li>Multiple consumers</li>\n      </ul>\n      <p>Kafka ব্যবহার করার সময় partition, consumer group, offset, ordering এবং retry/DLQ strategy বুঝতে হবে।</p>\n    "
  },
  {
    "id": "nest-32",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "RabbitMQ",
      "Microservices",
      "Messaging"
    ],
    "question": "NestJS-এ RabbitMQ কেন ব্যবহার করবেন?",
    "answer": "\n      <p>RabbitMQ সাধারণত message queue এবং asynchronous task processing-এর জন্য ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order API\n ↓\nRabbitMQ\n ↓\nWorker\n ↓\nSend Email</code></pre>\n      </div>\n      <p><strong>এটি useful:</strong></p>\n      <ul>\n        <li>Background jobs</li>\n        <li>Service communication</li>\n        <li>Retry</li>\n        <li>Work queues</li>\n        <li>Event/message processing</li>\n      </ul>\n      <p>RabbitMQ এবং Kafka-এর architecture ও use case এক নয়।</p>\n      <p>RabbitMQ → queue/work distribution-এর জন্য খুব common।</p>\n      <p>Kafka → high-throughput event streaming/log-based architecture-এর জন্য strong।</p>\n    "
  },
  {
    "id": "nest-33",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "gRPC",
      "Microservices",
      "RPC"
    ],
    "question": "NestJS-এ gRPC কী?",
    "answer": "\n      <p>gRPC একটি high-performance RPC framework যা Protocol Buffers ব্যবহার করে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n     ↓\n    gRPC\n     ↓\nPayment Service</code></pre>\n      </div>\n      <p><strong>gRPC-এর সুবিধা:</strong></p>\n      <ul>\n        <li>Strong contract</li>\n        <li>Code generation</li>\n        <li>Efficient binary serialization</li>\n        <li>Streaming support</li>\n        <li>Internal service-to-service communication-এর জন্য ভালো</li>\n      </ul>\n      <p>REST public API-এর জন্য এবং gRPC internal microservice communication-এর জন্য একসাথে ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "nest-34",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "CQRS",
      "Architecture",
      "Scalability"
    ],
    "question": "NestJS CQRS কী?",
    "answer": "\n      <p>CQRS = Command Query Responsibility Segregation।</p>\n      <p>Read এবং Write operation আলাদা model/handler দিয়ে manage করা হয়।</p>\n      <p><strong>Traditional:</strong><br>Controller → Service → DB</p>\n      <p><strong>CQRS:</strong><br>Command → CommandHandler → Write Model</p>\n      <p>Query → QueryHandler → Read Model</p>\n      <p>NestJS-এ @nestjs/cqrs package ব্যবহার করা যায়।</p>\n      <p><strong>CQRS useful যখন:</strong></p>\n      <ul>\n        <li>Complex domain</li>\n        <li>Read/write workload খুব আলাদা</li>\n        <li>Multiple read models প্রয়োজন</li>\n        <li>Domain events প্রয়োজন</li>\n      </ul>\n      <p>Simple CRUD application-এ CQRS unnecessary complexity তৈরি করতে পারে।</p>\n    "
  },
  {
    "id": "nest-35",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Event Sourcing",
      "CQRS",
      "Distributed Systems"
    ],
    "question": "NestJS context-এ Event Sourcing কী?",
    "answer": "\n      <p>Event Sourcing-এ current state সরাসরি শুধু store না করে state পরিবর্তনের events store করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>OrderCreated\n ↓\nItemAdded\n ↓\nPaymentCompleted\n ↓\nOrderShipped</code></pre>\n      </div>\n      <p>Current order state এই event history replay করে reconstruct করা যায়।</p>\n      <p>CQRS-এর সাথে Event Sourcing ব্যবহার করা যেতে পারে, কিন্তু CQRS এবং Event Sourcing একই জিনিস নয়।</p>\n      <p><strong>Event Sourcing-এর complexity:</strong></p>\n      <ul>\n        <li>Event schema evolution</li>\n        <li>Replay</li>\n        <li>Storage growth</li>\n        <li>Debugging</li>\n        <li>Event versioning</li>\n      </ul>\n    "
  },
  {
    "id": "nest-36",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Caching",
      "Redis"
    ],
    "question": "NestJS-এ caching কীভাবে implement করবেন?",
    "answer": "\n      <p>Frequently accessed data-এর জন্য cache ব্যবহার করা যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCache\n ├── Hit → Return\n └── Miss\n       ↓\n     Database\n       ↓\n     Cache\n       ↓\n     Response</code></pre>\n      </div>\n      <p>Redis distributed caching-এর জন্য ব্যবহার করা যায়।</p>\n      <p><strong>Important considerations:</strong></p>\n      <ul>\n        <li>TTL</li>\n        <li>Cache key design</li>\n        <li>Cache invalidation</li>\n        <li>Stale data</li>\n        <li>Cache stampede</li>\n        <li>Serialization</li>\n      </ul>\n      <p>Caching সব endpoint-এ ব্যবহার করা উচিত নয়; read-heavy এবং expensive operations-এর জন্য বেশি useful।</p>\n    "
  },
  {
    "id": "nest-37",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Background Jobs",
      "BullMQ",
      "Redis"
    ],
    "question": "NestJS-এ background job কীভাবে implement করবেন?",
    "answer": "\n      <p>Long-running বা asynchronous কাজ request lifecycle থেকে বের করে queue worker-এ দেওয়া যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>POST /orders\n ↓\nCreate Order\n ↓\nAdd email job\n ↓\nReturn response</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Worker:\nQueue\n ↓\nEmail Worker\n ↓\nSend Email</code></pre>\n      </div>\n      <p>NestJS ecosystem-এ BullMQ + Redis ব্যবহার করা যায়।</p>\n      <p><strong>Use cases:</strong></p>\n      <ul>\n        <li>Email</li>\n        <li>Notification</li>\n        <li>PDF generation</li>\n        <li>Image processing</li>\n        <li>Report generation</li>\n        <li>Scheduled jobs</li>\n      </ul>\n    "
  },
  {
    "id": "nest-38",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Scheduling",
      "Cron"
    ],
    "question": "NestJS Scheduled Task কী?",
    "answer": "\n      <p>Scheduled tasks নির্দিষ্ট সময় বা interval-এ automatically execute হয়।</p>\n      <p><strong>Common use:</strong></p>\n      <ul>\n        <li>Daily reports</li>\n        <li>Cleanup</li>\n        <li>Expired session removal</li>\n        <li>Subscription checking</li>\n        <li>Periodic synchronization</li>\n      </ul>\n      <p>NestJS-এ @nestjs/schedule ব্যবহার করা যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Example:\n@Cron(\"0 0 * * *\")\nhandleCron() {\n  // daily task\n}</code></pre>\n      </div>\n      <p>Distributed deployment-এ একই cron multiple instances-এ execute হতে পারে। তাই distributed lock বা dedicated scheduler প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "nest-39",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Interceptors",
      "Timeout",
      "Resilience"
    ],
    "question": "NestJS API-তে timeout কেন দরকার?",
    "answer": "\n      <p>Downstream service indefinitely wait করলে request resources আটকে থাকতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nPayment Service\n ↓\nPayment hangs...</code></pre>\n      </div>\n      <p>Timeout না থাকলে request অনেকক্ষণ pending থাকতে পারে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Timeout:\nRequest\n ↓\nWait 3 seconds\n ↓\nNo response\n ↓\nFail fast</code></pre>\n      </div>\n      <p>Timeout + Retry + Circuit Breaker একসাথে ব্যবহার করলে distributed system resilience improve করা যায়।</p>\n    "
  },
  {
    "id": "nest-40",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Retry",
      "Circuit Breaker",
      "Microservices"
    ],
    "question": "NestJS microservice-এ Retry এবং Circuit Breaker কেন দরকার?",
    "answer": "\n      <p>Distributed system-এ downstream service temporarily unavailable হতে পারে।</p>\n      <p><strong>Retry:</strong><br>Transient failure হলে সীমিত সংখ্যকবার আবার request করে।</p>\n      <p><strong>Exponential backoff:</strong><br>1s → 2s → 4s → 8s</p>\n      <p><strong>Circuit Breaker:</strong><br>Repeated failure হলে downstream call temporarily বন্ধ করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>States:\nClosed\n ↓ failures\nOpen\n ↓ timeout\nHalf-Open\n ↓ success\nClosed</code></pre>\n      </div>\n      <p>Unlimited retry করা dangerous কারণ এতে cascading failure হতে পারে।</p>\n    "
  },
  {
    "id": "nest-41",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Idempotency",
      "Microservices",
      "Payment"
    ],
    "question": "NestJS API-তে Idempotency কীভাবে implement করবেন?",
    "answer": "\n      <p>Payment/order API-তে একই request retry হলে duplicate operation prevent করার জন্য idempotency key ব্যবহার করা যায়।</p>\n      <p><strong>Request:</strong><br>POST /payments</p>\n      <p><strong>Idempotency-Key:</strong> abc123</p>\n      <p><strong>Server:</strong><br>1. Key check করবে।<br>2. আগে process করা থাকলে previous result return করবে।<br>3. না থাকলে operation process করবে।<br>4. Result এবং key store করবে।</p>\n      <p>Distributed environment-এ idempotency state shared storage যেমন Redis বা database-এ রাখতে হতে পারে।</p>\n    "
  },
  {
    "id": "nest-42",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Outbox",
      "Events",
      "Distributed Transaction"
    ],
    "question": "NestJS application-এ Outbox Pattern কী?",
    "answer": "\n      <p>একই database transaction-এর মধ্যে business data এবং event record store করার pattern হলো Outbox Pattern।</p>\n      <h4>Problem:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Database update\n   ↓ success\nPublish Kafka\n   ↓ failed ❌</code></pre>\n      </div>\n      <p>তাহলে database update হয়েছে কিন্তু event publish হয়নি।</p>\n      <h4>Outbox:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>BEGIN TRANSACTION\n ↓\nUpdate business data\n ↓\nInsert Outbox Event\n ↓\nCOMMIT\n ↓\nOutbox Worker\n ↓\nKafka/RabbitMQ</code></pre>\n      </div>\n      <p>এতে database state এবং event publication-এর মধ্যে reliability বাড়ে।</p>\n    "
  },
  {
    "id": "nest-43",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Distributed Systems",
      "Saga"
    ],
    "question": "NestJS microservices-এ Saga Pattern কী?",
    "answer": "\n      <p>Distributed transaction-এর জন্য Saga Pattern ব্যবহার করা যায়।</p>\n      <h4>ধরা যাক Order process:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Create Order\n ↓\nReserve Inventory\n ↓\nProcess Payment\n ↓\nConfirm Order</code></pre>\n      </div>\n      <p><strong>যদি Payment fail করে:</strong><br><strong>Compensating action:</strong><br>Release Inventory<br>Cancel Order</p>\n      <p><strong>Saga দুইভাবে implement করা যায়:</strong><br>1. Choreography<br>2. Orchestration</p>\n      <p><strong>Choreography:</strong><br>Services events শুনে নিজেরা কাজ করে।</p>\n      <p><strong>Orchestration:</strong><br>একটি Saga Orchestrator পুরো workflow coordinate করে।</p>\n    "
  },
  {
    "id": "nest-44",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Observability",
      "Logging",
      "Tracing"
    ],
    "question": "NestJS production application-এ observability কীভাবে implement করবেন?",
    "answer": "\n      <h4>Observability-এর তিনটি প্রধান অংশ:</h4>\n      <ol>\n        <li>Logs</li>\n        <li>Metrics</li>\n        <li>Traces</li>\n      </ol>\n      <p><strong>Logs:</strong><br>Pino/Winston-এর মতো structured logger।</p>\n      <p><strong>Metrics:</strong></p>\n      <ul>\n        <li>Request count</li>\n        <li>Error count</li>\n        <li>Latency</li>\n        <li>CPU</li>\n        <li>Memory</li>\n      </ul>\n      <p><strong>Tracing:</strong><br>Request কোন service-এর মধ্য দিয়ে গেছে তা track করা।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nGateway\n ↓\nOrder\n ↓\nPayment\n ↓\nNotification</code></pre>\n      </div>\n      <p>Trace ID এবং correlation ID ব্যবহার করলে debugging অনেক সহজ হয়। OpenTelemetry একটি common observability ecosystem।</p>\n    "
  },
  {
    "id": "nest-45",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Health Check",
      "Kubernetes",
      "Production"
    ],
    "question": "NestJS Health Check কী?",
    "answer": "\n      <p>Production deployment-এ service healthy কিনা check করার জন্য health endpoint ব্যবহার করা হয়।</p>\n      <p>NestJS-এ Terminus ecosystem ব্যবহার করা যায়।</p>\n      <p><strong>Common endpoints:</strong><br>GET /health/live<br>GET /health/ready</p>\n      <p><strong>Liveness:</strong><br>Application process চলছে কিনা।</p>\n      <p><strong>Readiness:</strong><br>Application traffic নেওয়ার জন্য ready কিনা।</p>\n      <p>Kubernetes-এর মতো orchestration platform-এ এই checks গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "nest-46",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Graceful Shutdown",
      "Production"
    ],
    "question": "NestJS-এ graceful shutdown কীভাবে করবেন?",
    "answer": "\n      <p>Application shutdown-এর সময় existing request শেষ করে resources properly close করা উচিত।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>SIGTERM\n ↓\nStop accepting traffic\n ↓\nFinish active requests\n ↓\nClose DB\n ↓\nClose Redis\n ↓\nClose Kafka/RabbitMQ\n ↓\nExit</code></pre>\n      </div>\n      <p>NestJS-এ shutdown hooks enable করে lifecycle cleanup implement করা যায়।</p>\n      <p>Production containerized environment-এ graceful shutdown খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "nest-47",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Performance",
      "Scalability"
    ],
    "question": "NestJS application-এর performance কীভাবে improve করবেন?",
    "answer": "\n      <h4>Important optimization:</h4>\n      <ol>\n        <li>Fastify adapter ব্যবহার বিবেচনা করা।</li>\n        <li>Database indexing।</li>\n        <li>Efficient queries।</li>\n        <li>Connection pooling।</li>\n        <li>Redis caching।</li>\n        <li>Pagination।</li>\n        <li>Avoid unnecessary serialization।</li>\n        <li>Background jobs।</li>\n        <li>Compression যেখানে appropriate।</li>\n        <li>Horizontal scaling।</li>\n        <li>Load balancing।</li>\n        <li>Proper logging।</li>\n        <li>Timeouts।</li>\n        <li>Metrics দিয়ে bottleneck identify করা।</li>\n      </ol>\n      <p>প্রথমে profiling এবং metrics দিয়ে bottleneck identify করতে হবে। শুধু অনুমান করে optimization করা উচিত নয়।</p>\n    "
  },
  {
    "id": "nest-48",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Express",
      "Fastify",
      "HTTP Adapter"
    ],
    "question": "NestJS-এ Express এবং Fastify-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>NestJS framework abstraction-এর মাধ্যমে Express বা Fastify adapter ব্যবহার করতে পারে।</p>\n      <p><strong>Express:</strong></p>\n      <ul>\n        <li>Mature ecosystem</li>\n        <li>Huge middleware ecosystem</li>\n        <li>Easy adoption</li>\n        <li>Widely used</li>\n      </ul>\n      <p><strong>Fastify:</strong></p>\n      <ul>\n        <li>Performance-focused</li>\n        <li>Efficient serialization</li>\n        <li>Plugin architecture</li>\n      </ul>\n      <p>যদি existing Express middleware ecosystem প্রয়োজন হয় Express convenient হতে পারে।</p>\n      <p>High-throughput API-তে Fastify benchmark করে বিবেচনা করা যেতে পারে।</p>\n      <p>তবে real-world performance শুধু framework-এর উপর নির্ভর করে না; database, network, serialization, caching এবং application logic বড় factor।</p>\n    "
  },
  {
    "id": "nest-49",
    "category": "NestJS",
    "difficulty": "Advanced",
    "tags": [
      "Architecture",
      "Clean Architecture",
      "SOLID"
    ],
    "question": "NestJS-এ Clean Architecture কীভাবে implement করবেন?",
    "answer": "\n      <p>NestJS-এর module এবং DI system Clean Architecture implement করতে সাহায্য করতে পারে।</p>\n      <h4>Possible structure:</h4>\n      <p>src/<br>├── domain/<br>│   ├── entities/<br>│   └── interfaces/<br>├── application/<br>│   ├── use-cases/<br>│   └── dto/<br>├── infrastructure/<br>│   ├── database/<br>│   └── external-services/<br>├── presentation/<br>│   ├── controllers/<br>│   └── guards/</p>\n      <h4>Dependency direction:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Presentation\n     ↓\nApplication\n     ↓\nDomain</code></pre>\n      </div>\n      <p>Infrastructure সাধারণত abstraction implement করে।</p>\n      <p>এতে business logic framework এবং database-এর সাথে tightly coupled হয় না।</p>\n    "
  },
  {
    "id": "nest-50",
    "category": "NestJS",
    "difficulty": "Very Important",
    "tags": [
      "Production",
      "System Design",
      "Interview"
    ],
    "question": "একটি production-ready NestJS application কীভাবে design করবেন?",
    "answer": "\n      <h4>Production architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n   ↓\nCDN / Load Balancer / API Gateway\n   ↓\nNestJS\n   ↓\nMiddleware\n   ↓\nGuards\n   ↓\nInterceptors\n   ↓\nPipes\n   ↓\nController\n   ↓\nService / Use Case\n   ↓\nRepository\n   ↓\nDatabase</code></pre>\n      </div>\n      <h4>Supporting infrastructure:</h4>\n      <p>NestJS<br> ├── PostgreSQL/MySQL<br> ├── Redis<br> ├── Kafka/RabbitMQ<br> ├── Object Storage<br> ├── Monitoring<br> ├── OpenTelemetry<br> └── Centralized Logging</p>\n      <p><strong>Security:</strong></p>\n      <ul>\n        <li>JWT/OAuth2</li>\n        <li>RBAC</li>\n        <li>ValidationPipe</li>\n        <li>CORS</li>\n        <li>Helmet</li>\n        <li>Rate limiting</li>\n        <li>HTTPS</li>\n        <li>Secret management</li>\n      </ul>\n      <p><strong>Reliability:</strong></p>\n      <ul>\n        <li>Timeout</li>\n        <li>Retry</li>\n        <li>Circuit breaker</li>\n        <li>Idempotency</li>\n        <li>Outbox Pattern</li>\n        <li>Graceful shutdown</li>\n        <li>Health checks</li>\n      </ul>\n      <p><strong>Scalability:</strong></p>\n      <ul>\n        <li>Stateless services</li>\n        <li>Horizontal scaling</li>\n        <li>Load balancing</li>\n        <li>Redis caching</li>\n        <li>Database optimization</li>\n        <li>Async workers</li>\n      </ul>\n      <h4>Interview-এর জন্য সবচেয়ে গুরুত্বপূর্ণ NestJS concepts:</h4>\n      <ol>\n        <li>Module</li>\n        <li>Controller</li>\n        <li>Provider/Service</li>\n        <li>Dependency Injection</li>\n        <li>Middleware</li>\n        <li>Guard</li>\n        <li>Pipe</li>\n        <li>Interceptor</li>\n        <li>Exception Filter</li>\n        <li>DTO + ValidationPipe</li>\n        <li>JWT + Passport</li>\n        <li>RBAC</li>\n        <li>TypeORM/Prisma</li>\n        <li>Transactions</li>\n        <li>Testing</li>\n        <li>Redis</li>\n        <li>Kafka/RabbitMQ</li>\n        <li>gRPC</li>\n        <li>CQRS</li>\n        <li>Saga</li>\n        <li>Outbox</li>\n        <li>Retry/Circuit Breaker</li>\n        <li>Health Check</li>\n        <li>Logging/Metrics/Tracing</li>\n        <li>Production architecture</li>\n      </ol>\n    "
  }
];
