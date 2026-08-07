const nestjsQuestions = [
  {
    id: "nest-1",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Dependency Injection", "IoC Container", "Architecture"],
    question: "NestJS-এ Dependency Injection (DI) এবং Inversion of Control (IoC) কীভাবে কাজ করে?",
    answer: `
      <p><strong>Inversion of Control (IoC):</strong> এটি একটি আর্কিটেকচারাল ডিজাইন প্যাটার্ন যেখানে অবজেক্ট বা ডিপেন্ডেন্সি তৈরির দায়িত্ব ডেভেলপার কাস্টম ম্যানুয়ালি না নিয়ে একটি সেন্ট্রাল ফ্রেমওয়ার্কের (NestJS IoC Container) ওপর ছেড়ে দেয়।</p>
      <p><strong>Dependency Injection (DI):</strong> IoC বাস্তবায়নের কৌশল। NestJS ফ্রেমওয়ার্ক প্রয়োজন অনুযায়ী ডিপেন্ডেন্সিগুলোকে কন্সট্রাক্টরের মাধ্যমে ক্লাসগুলোর মধ্যে ইনজেক্ট করে।</p>
      <h4>DI কীভাবে কাজ করে:</h4>
      <ol>
        <li><code>@Injectable()</code> ডেকোরেটর সার্ভিস ক্লাসের ওপর যুক্ত করা হয় যাতে NestJS একে <strong>Provider</strong> হিসেবে মেটাডেটায় ফ্ল্যাগ করতে পারে।</li>
        <li>মডিউলের (<code>@Module</code>) <code>providers</code> অরেতে সেই সার্ভিস যুক্ত করা হয়।</li>
        <li>কন্ট্রোলারের কন্সট্রাকটরে টাইপ অ্যানোটেশন <code>constructor(private readonly userService: UserService) {}</code> দিলে NestJS IoC কন্টেইনার সিঙ্গেলটন ইনস্ট্যান্স খুঁজে ইনজেক্ট করে দেয়।</li>
      </ol>
    `
  },
  {
    id: "nest-2",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Provider Scopes", "Performance", "Singleton"],
    question: "NestJS Providers-এর ৩টি Scope কী কী? (DEFAULT, REQUEST, TRANSIENT) এবং এগুলো পারফরম্যান্সে কী প্রভাব ফেলে?",
    answer: `
      <p>ডিফল্টভাবে NestJS-এর সকল প্রোভাইডার <strong>Singleton</strong> হলেও প্রয়োজনভেদে ৩ ধরনের Scope ব্যবহার করা যায়:</p>
      <ol>
        <li><strong>DEFAULT (Singleton):</strong> পুরো অ্যাপ্লিকেশনের লাইফসাইকেলে ১টি মাত্র ইনস্ট্যান্স তৈরি হয় এবং সকল রিকোয়েস্টে সেটি শেয়ার হয়। <em>(উচ্চ পারফরম্যান্স ও মেমোরি দক্ষ)</em>।</li>
        <li><strong>REQUEST:</strong> প্রতি ইনকামিং HTTP রিকোয়েস্টের জন্য একটি করে নতুন ইনস্ট্যান্স তৈরি হয় এবং রিকোয়েস্ট শেষে Garbage Collect হয়ে যায়। <em>(লগিং বা টেন্যান্ট আইডির জন্য দরকারী, তবে অত্যধিক মেমোরি কনজাম্পশন ঘটায়)</em>।</li>
        <li><strong>TRANSIENT:</strong> যে যে ক্লাসে ডিপেন্ডেন্সি হিসেবে ইনজেক্ট করা হবে, প্রতিটির জন্য আলাদা আলাদা নতুন ইনস্ট্যান্স তৈরি হয়।</li>
      </ol>
      <p><em>সাবধানতা:</em> কোনো সার্ভিসে <code>Scope.REQUEST</code> দিলে সেই সার্ভিসের ওপর নির্ভরশীল সকল কন্ট্রোলার এবং প্যারেন্ট প্রোভাইডারও Request Scope-এ কনভার্ট হয়ে যায়, যা অ্যাপ সার্ভারের পারফরম্যান্স নামিয়ে দিতে পারে।</p>
    `
  },
  {
    id: "nest-3",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Pipes", "Validation", "DTO"],
    question: "NestJS Pipes কী? class-validator এবং ValidationPipe ব্যবহার করে DTO কীভাবে ভ্যালিডেশন করবেন?",
    answer: `
      <p><strong>Pipe</strong> হলো এমন ক্লাস যা <code>PipeTransform</code> ইন্টারফেস ইমপ্লিমেন্ট করে। এটি মূলত ২টি কাজের জন্য ব্যবহৃত হয়:</p>
      <ol>
        <li><strong>Transformation:</strong> ইনপুট ডাটাক টাইপ কনভার্ট করা (যেমন: String ID-কে Integer-এ রূপান্তর <code>ParseIntPipe</code>)।</li>
        <li><strong>Validation:</strong> ইনকামিং ইনপুট সঠিক কিনা যাচাই করা এবং ভুল থাকলে <code>BadRequestException</code> থ্রো করা।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// main.ts (Global Pipe Setup)
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));</code></pre>
      </div>
      <p><code>whitelist: true</code> অপশন দিলে DTO-তে ডিফাইন করা ছাড়া বাড়তি অপ্রয়োজনীয় ফিল্ডগুলো অটোমেটিক রিমুভ (Strip) হয়ে যায়।</p>
    `
  },
  {
    id: "nest-4",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Guards", "Auth", "RBAC"],
    question: "NestJS Guards কী? Role-based Access Control (RBAC) বাস্তবায়নে Guard এবং Reflector কীভাবে কাজ করে?",
    answer: `
      <p><strong>Guard</strong> হলো একটি ক্লাস যা <code>CanActivate</code> ইন্টারফেস বাস্তবায়ন করে। এটি মূলত নির্ধারণ করে কোনো নির্দিষ্ট রিকোয়েস্টকে রাউট হ্যান্ডলারে যেতে দেওয়া হবে কি না (Authentication & Authorization)।</p>
      <p>Guard কেবল <code>boolean</code> (true/false) বা <code>Promise<boolean></code> রিটার্ন করে। <code>false</code> দিলে NestJS স্বয়ংক্রিয়ভাবে <code>403 ForbiddenException</code> থ্রো করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.includes(user?.role);
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-5",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Interceptors", "RxJS", "Aspect Oriented"],
    question: "NestJS Interceptors কী? Aspect-Oriented Programming (AOP) ও RxJS-এর সাথে এর সম্পর্ক বুঝিয়ে বলুন।",
    answer: `
      <p><strong>Interceptor</strong> হলো এমন একটি পাওয়ারফুল মেকানিজম যা Aspect-Oriented Programming (AOP) কৌশল অনুসরণ করে। এটি রাউট হ্যান্ডলার রান হওয়ার <strong>আগে এবং পরে</strong> অতিরিক্ত লজিক অ্যানফোর্স করতে পারে।</p>
      <h4>Interceptors-এর কাজসমূহ:</h4>
      <ul>
        <li>মেথড এক্সিকিউশন টাইম (Performance Benchmark) লগ করা।</li>
        <li>রেসপন্স ফরম্যাট রূপান্তর করা (Response Transformation Envelope Pattern)।</li>
        <li>ক্যাশিং (CacheInterceptor) বা টাইমআউট হ্যান্ডেল করা।</li>
        <li>RxJS <code>Observable</code> অপারেটর (<code>map</code>, <code>tap</code>, <code>catchError</code>, <code>timeout</code>) ব্যবহার করে স্ট্রিম ম্যানিপুলেট করা।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({ success: true, statusCode: 200, data }))
    );
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-6",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Exception Filters", "Error Handling"],
    question: "Custom Exception Filters কী? NestJS-এ গ্লোবাল এক্সেপশন ফিল্টার কেন ব্যবহার করবেন?",
    answer: `
      <p>NestJS-এ একটি বিল্ট-ইন <strong>Global Exception Layer</strong> থাকে যা প্রসেস না করা HttpException গুলোকে অটোমেটিক সুন্দর JSON রেসপন্সে রূপান্তর করে।</p>
      <p>তবে কাস্টম ফরম্যাটে এরর স্ট্রাকচার গঠন করতে (যেমন: timestamp, path, custom error code যুক্ত করতে) <strong>Custom Exception Filter</strong> তৈরি করতে হয় যা <code>ExceptionFilter</code> ইন্টারফেস বাস্তবায়ন করে এবং <code>@Catch()</code> ডেকোরেটর ব্যবহার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-7",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Dynamic Modules", "ConfigModule"],
    question: "NestJS Dynamic Modules কী? Static Module এবং Dynamic Module-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p><strong>Static Module:</strong> যেখানে ইম্পোর্ট করা মডিউলের কনফিগারেশন ফিক্সড থাকে (যেমন: <code>UserModule</code>, <code>AuthModule</code>)।</p>
      <p><strong>Dynamic Module:</strong> যে মডিউলকে রানটাইমে কাস্টম প্যারামিটার বা অপশন পাঠিয়ে ডাইনামিকালি কনফিগার ও ক্রিয়েট করা যায়। যেমন ডাটাবেজ কানেকশন বা কনফিগুরেশন মডিউল (<code>ConfigModule.forRoot()</code>, <code>TypeOrmModule.forRootAsync()</code>)।</p>
      <p>Dynamic Module তৈরি করতে <code>register()</code>, <code>forRoot()</code>, বা <code>forFeature()</code> নামে স্ট্যাটিক মেথড ডিক্লেয়ার করতে হয় যা একটি <code>DynamicModule</code> অবজেক্ট রিটার্ন করে।</p>
    `
  },
  {
    id: "nest-8",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Microservices", "RabbitMQ", "gRPC"],
    question: "NestJS-এ Microservices Architecture এবং Request-Response vs Event-Driven প্যাটানি কীভাবে সাজাবেন?",
    answer: `
      <p>NestJS নেটিভভাবে মাইক্রোসার্ভিস সাপোর্ট করে। এটি ট্রান্সপোর্টার (TCP, Redis, RabbitMQ, NATS, Kafka, gRPC) অ্যাবস্ট্রাক্ট করে রাখে।</p>
      <h4>২টি প্রধান মেসেজিং প্যাটার্ন:</h4>
      <ul>
        <li><strong>Message Pattern (Request-Response):</strong> <code>@MessagePattern('cmd')</code> - ক্লায়েন্ট রিপ্লাই বা ডাটার জন্য অপেক্ষা করে (Synchronous pattern over async transport)।</li>
        <li><strong>Event Pattern (Event-Driven):</strong> <code>@EventPattern('user_created')</code> - Fire-and-forget প্যাটার্ন। ক্লায়েন্ট কোনো রেসপন্সের অপেক্ষা না করে মেসেজ ব্রোকারে ইভেন্ট পাবলিশ করে দেয়।</li>
      </ul>
    `
  },
  {
    id: "nest-9",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Custom Decorators", "Param Decorator"],
    question: "NestJS-এ Custom Decorators (যেমন: @CurrentUser()) কীভাবে তৈরি ও ব্যবহার করবেন?",
    answer: `
      <p>NestJS-এ <code>createParamDecorator</code> হেলপার মেথড ব্যবহার করে কাস্টম প্যারামিটার ডেকোরেটর তৈরি করা যায়, যা রিকোয়েস্ট অবজেক্ট থেকে নির্দিষ্ট ডাটা এক্সট্র্যাক্ট করা সহজ করে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

// Usage in Controller
@Get('me')
getProfile(@CurrentUser() user: UserEntity) {
  return user;
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-10",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Testing", "Jest", "Mocking"],
    question: "NestJS-এ Service এবং Controller-এর Unit Testing লেখার পদ্ধতি কী? Test.createTestingModule কীভাবে কাজ করে?",
    answer: `
      <p>NestJS নেটিভভাবে **Jest** টেস্টিং ফ্রেমওয়ার্কের সাথে চমৎকারভাবে ইন্টিগ্রেটেড।</p>
      <p><code>@nestjs/testing</code> প্যাকেজের <code>Test.createTestingModule()</code> ব্যবহার করে একটি লাইটওয়েট আইসোলেটেড NestJS IoC কন্টেইনার তৈরি করা হয়, যেখানে আসল ডাটাবেজ প্রোভাইডারের বদলে **Mock Provider** ইনজেক্ট করে টেস্ট রান করা সম্ভব।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});</code></pre>
      </div>
    `
  }
,

  {
    id: "nest-11",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Queues","BullMQ","Redis"],
    question: "NestJS-এ BullMQ (@nestjs/bull) দিয়ে Queue Management কীভাবে কাজ করে?",
    answer: `
<p>BullMQ হলো Redis-ভিত্তিক কিউ ম্যানেজার। সার্ভিস থেকে হেভি জব কিউতে পুশ করে Processor ক্লাস দিয়ে ব্যাকগ্রাউন্ডে তা সম্পাদন করা হয়।</p>
    `
  },
  {
    id: "nest-12",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Tasks","Cron","Schedule"],
    question: "NestJS-এ Task Scheduling ও Cron Jobs (@Cron) কীভাবে পরিচালনা করা হয়?",
    answer: `
<p><code>@nestjs/schedule</code> ব্যবহার করে মেথডের ওপর <code>@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)</code> দিয়ে স্বয়ংক্রিয় ব্যাকগ্রাউন্ড কাজ শিডিউল করা হয়।</p>
    `
  },
  {
    id: "nest-13",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Realtime","WebSockets","Gateways"],
    question: "NestJS @WebSocketGateway() ব্যবহার করে সকেট কীভাবে সেটআপ করবেন?",
    answer: `
<p>WebSocket Gateway তৈরি করে <code>@SubscribeMessage()</code> এবং <code>@MessageBody()</code> দিয়ে মেসেজ রিসিভ ও বাইডিরেকশনাল রিয়েল-টাইম ডাটা পাঠানো হয়।</p>
    `
  },
  {
    id: "nest-14",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["GraphQL","Code-first","Schema-first"],
    question: "NestJS GraphQL Integration-এ Code-first vs Schema-first-এর পার্থক্য কী?",
    answer: `
<p>Code-first এ TypeScript ক্লাস ও Decorator দিয়ে টাইপ ডিফাইন করা হয়। Schema-first এ হাতে <code>.graphql</code> ফাইল লেখা হয়।</p>
    `
  },
  {
    id: "nest-15",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["DI","Custom Providers","Patterns"],
    question: "NestJS Custom Providers (useValue, useClass, useFactory) কখন ব্যবহৃত হয়?",
    answer: `
<p>Mock service injection এ <code>useValue</code>, ডাইনামিক ক্লাসে <code>useClass</code> এবং অ্যাসিনক্রোনাস ডাটাবেজ কানফিগ প্রোভাইডারে <code>useFactory</code> ব্যবহৃত হয়।</p>
    `
  },
  {
    id: "nest-16",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Lifecycle","Hooks","Architecture"],
    question: "NestJS Lifecycle Hooks-এর প্রধান ধাপগুলো কী কী?",
    answer: `
<p>স্টার্টআপ ও শাটডাউনে <code>OnModuleInit</code> -> <code>OnApplicationBootstrap</code> এবং <code>OnModuleDestroy</code> -> <code>OnApplicationShutdown</code> কাজ করে।</p>
    `
  },
  {
    id: "nest-17",
    category: "NestJS",
    difficulty: "Beginner",
    tags: ["Docs","Swagger","OpenAPI"],
    question: "NestJS-এ Swagger OpenAPI Integration কীভাবে ডক্স জেনারেট করে?",
    answer: `
<p><code>@nestjs/swagger</code> যোগ করে <code>@ApiTags()</code>, <code>@ApiOperation()</code> দিয়ে অটোমেটিক ইন্টারঅ্যাক্টিভ REST API ডক্স তৈরি করা হয়।</p>
    `
  },
  {
    id: "nest-18",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Health Check","Terminus","DevOps"],
    question: "NestJS-এ Terminus দিয়ে Health Checks Endpoint কীভাবে সেটআপ করবেন?",
    answer: `
<p><code>@nestjs/terminus</code> ব্যবহার করে <code>/health</code> রাউটে ডাটাবেজ, মেমোরি এবং এক্সটার্নাল সার্ভিসের হেলথ স্ট্যাটাস রিয়েলটাইম চেক করা হয়।</p>
    `
  },
  {
    id: "nest-19",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Architecture", "Interceptors", "AOP"],
    question: "NestJS Interceptors (NestInterceptor) কী? Aspect-Oriented Programming (AOP) এবং RxJS Observable রূপান্তর কীভাবে কাজ করে?",
    answer: `
<p>Interceptor হলো এমন একটি ক্লাস যা মেথড এক্সিকিউশনের আগে ও পরে কাস্টম লজিক রিড বা পরিবর্তন করতে সাহায্য করে (AOP Pattern)। এটি ExecutionContext এবং CallHandler (RxJS Observable) ব্যবহার করে রেসপন্স ট্রান্সফর্ম, ক্যাশিং বা টাইম লগার প্রসেস করে।</p>
    `
  },
  {
    id: "nest-20",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Guards", "Auth", "Security"],
    question: "NestJS Guards (CanActivate) এবং Custom Decorators (@Roles, @CurrentUser) দিয়ে RBAC Authorization কীভাবে করবেন?",
    answer: `
<p>Guard রিকুয়েস্ট হ্যান্ডলারের কাছে যাওয়ার আগেই Boolean (true/false) দিয়ে পারমিশন চেক করে। Reflector এবং Metadata ব্যবহার করে রুট লেভেলে ভূমিকা (Roles) যাচাই করা হয়।</p>
    `
  },
  {
    id: "nest-21",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Pipes", "Validation", "class-validator"],
    question: "NestJS ValidationPipe, class-validator এবং class-transformer দিয়ে DTO Input Validation কীভাবে কাজ করে?",
    answer: `
<p>ValidationPipe ইনকামিং JSON বডিকে DTO ক্লাসে রূপান্তর করে (class-transformer) এবং Decorators (@IsString(), @IsEmail(), @Min()) দিয়ে ইনপুট ডেটা ভ্যালিডেট করে অসামঞ্জস্য ডেটায় স্বয়ংক্রিয় 400 Bad Request দেয়।</p>
    `
  },
  {
    id: "nest-22",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Exception Filters", "Error Handling", "Global"],
    question: "NestJS Exception Filters (BaseExceptionFilter, @Catch) দিয়ে সেন্ট্রালাইজড এরর ফরম্যাটিং কীভাবে সেটআপ করবেন?",
    answer: `
<p>অ্যাপ্লিকেশনের যেকোনো জায়গায় থ্রো করা Exception (e.g. HttpException) গ্লোবালি ইন্টারসেপ্ট করে একটি নির্দিষ্ট স্ট্যান্ডার্ড JSON ফরম্যাটে এরর রেসপন্স প্রদান করা।</p>
    `
  },
  {
    id: "nest-23",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Microservices", "Transports", "TCP/Redis/Kafka"],
    question: "NestJS Microservices Architecture: Transport Strategy (TCP, Redis, NATS, Kafka) এবং @MessagePattern vs @EventPattern কী?",
    answer: `
<p><strong>@MessagePattern (Request-Response):</strong> ক্লায়েন্ট রেসপন্সের জন্য অপেক্ষা করে (ACK)।</p><p><strong>@EventPattern (Event-driven):</strong> ফায়ার-এন্ড-ফরগেট (Fire-and-forget), কোনো রেসপন্সের আশা করে না।</p>
    `
  },
  {
    id: "nest-24",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Modules", "Dynamic Modules", "useFactory"],
    question: "NestJS Dynamic Modules (forRoot, forRootAsync, register) কখন এবং কেন প্রয়োজন?",
    answer: `
<p>যখন একটি মডিউল কনফিগারেশন ইনপুট (যেমন ডাটাবেজ ইউআরএল বা সিক্রেট কী) অন-দ্য-ফ্লাই বা অ্যাসিনক্রোনাসলি ডাইনামিকালি প্যারামিটারাইজড করতে হয় (e.g. DatabaseModule.forRootAsync())।</p>
    `
  },
  {
    id: "nest-25",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["CQRS", "CommandBus", "QueryBus"],
    question: "NestJS-এ @nestjs/cqrs প্যাকেজ দিয়ে CQRS Pattern (Command, Query, Event Handlers) কীভাবে ইমপ্লিমেন্ট করবেন?",
    answer: `
<p>মেথডগুলোকে বিভক্ত করে আলাদা আলাদা Command (Write) এবং Query (Read) বাসে ভাগ করে ফেলা। EventBus ব্যবহার করে ডোমেইন ইভেন্ট সাবস্ক্রাইব করানো।</p>
    `
  },
  {
    id: "nest-26",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Event Emitter", "Decoupling", "Events"],
    question: "NestJS-এ @nestjs/event-emitter দিয়ে ইন-প্রসেস ইভেন্ট ড্রাইভেন আর্কিটেকচার কীভাবে তৈরি করবেন?",
    answer: `
<p><code>eventEmitter.emit('user.created', user)</code> পাঠালে <code>@OnEvent('user.created')</code> দিয়ে সার্ভিস লেভেলে কোনো কাইন্ড অফ ডাইরেক্ট ডিপেন্ডেন্সি ছাড়াই নোটিফিকেশন বা ইমেইল পাঠানো।</p>
    `
  },
  {
    id: "nest-27",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["DI", "Scopes", "TRANSIENT"],
    question: "NestJS Injection Scopes (DEFAULT, REQUEST, TRANSIENT) কী এবং Performance Impact কী?",
    answer: `
<p><strong>DEFAULT:</strong> সিঙ্গেলটন (Singleton), অ্যাপ চলাকালীন ১টি ইনস্ট্যান্স থাকে (ফাস্ট)।</p><p><strong>REQUEST:</strong> প্রতি ইনকামিং HTTP রিকুয়েস্টে নতুন ইনস্ট্যান্স তৈরি করে (পারফরম্যান্স স্লো করায় সতর্কতার সাথে ব্যবহার্য)।</p><p><strong>TRANSIENT:</strong> প্রতি ইনজেকশনে আলাদা ইনস্ট্যান্স দেয়।</p>
    `
  },
  {
    id: "nest-28",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Middleware", "Express Middleware", "NestMiddleware"],
    question: "NestJS Middleware vs Interceptor vs Guard vs Pipe — এক্সিকিউশন অর্ডার বা সিকুয়েন্স কী?",
    answer: `
<p>ইনকামিং রিকুয়েস্টের এক্সিকিউশন সিকুয়েন্স:</p><ol><li>Middleware</li><li>Guard</li><li>Interceptor (Before)</li><li>Pipe</li><li>Controller Handler</li><li>Interceptor (After)</li><li>Exception Filter (If error)</li></ol>
    `
  },
  {
    id: "nest-29",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Database", "TypeORM", "Prisma"],
    question: "NestJS-এ TypeORM / Prisma Integration: Repository Pattern, Transactions এবং Migrations কীভাবে পরিচালিত হয়?",
    answer: `
<p>TypeORM <code>@InjectRepository()</code> বা PrismaService দিয়ে ডাটাবেজ লেয়ার ডিকুপল করা। Unit of Work ট্রানজেকশনে QueryRunner বা prisma.$transaction ব্যবহার করা।</p>
    `
  },
  {
    id: "nest-30",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Config", "ConfigModule", "Joi"],
    question: "NestJS @nestjs/config এবং Joi/Zod Schema Validation দিয়ে Env Variables সাশ্রয়ীভাবে পরিচালনা কীভাবে করবেন?",
    answer: `
<p><code>ConfigModule.forRoot({ validationSchema: Joi.object({...}) })</code> দিলে অ্যাপ স্টার্ট হওয়ার মুহূর্তেই প্রয়োজনীয় Env Missing থাকলে ক্র্যাশ করিয়ে নিরাপদ এনভায়রনমেন্ট গ্যারান্টি দেয়।</p>
    `
  },
  {
    id: "nest-31",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Caching", "CacheModule", "Redis"],
    question: "NestJS CacheModule, CacheInterceptor এবং Redis Store দিয়ে অটো-ক্যাশিং কীভাবে করবেন?",
    answer: `
<p>কন্ট্রোলারের ওপর <code>@UseInterceptors(CacheInterceptor)</code> এবং <code>@CacheTTL(60)</code> বসালে GET এন্ডপয়েন্টের রেসপন্স স্বয়ংক্রিয়ভাবে Redis-এ ক্যাশ হয়।</p>
    `
  },
  {
    id: "nest-32",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Testing", "Jest", "TestBed"],
    question: "NestJS-এ Test.createTestingModule() দিয়ে Controller এবং Service Unit Testing & E2E Testing কীভাবে করবেন?",
    answer: `
<p>NestJS টেস্টিং ইউটিলিটি ব্যবহার করে সত্যিকারের মডিউলের বদলে <code>useValue</code> দিয়ে Mock Service বানিয়ে বিচ্ছিন্নভাবে ইউনিট টেস্ট চালানো।</p>
    `
  },
  {
    id: "nest-33",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Security", "Passport", "JWT"],
    question: "NestJS @nestjs/passport এবং Passport-JWT Strategy দিয়ে Access & Refresh Token Authentication কীভাবে সেটআপ করবেন?",
    answer: `
<p><code>PassportStrategy(Strategy)</code> ক্লাস এক্সটেন্ড করে <code>validate()</code> মেথডে পেলোড ভ্যালিডেট করা এবং <code>AuthGuard('jwt')</code> দিয়ে রুট প্রটেক্ট করা।</p>
    `
  },
  {
    id: "nest-34",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["WebSockets", "Socket.io", "Adapters"],
    question: "NestJS WebSocket Adapters (Socket.io vs ws) এবং Redis IoAdapter দিয়ে ক্লাস্টার স্কেলিং কীভাবে করবেন?",
    answer: `
<p>একাধিক NestJS নোডে WebSocket চালালে নোডগুলোর মধ্যে সকেট ইভেন্ট ব্রডকাস্টের জন্য <code>RedisIoAdapter</code> ব্যবহার করে PubSub চ্যানেল সিঙ্ক করা।</p>
    `
  },
  {
    id: "nest-35",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["GraphQL", "Resolvers", "DataLoader"],
    question: "NestJS GraphQL Resolvers-এ N+1 Query Problem কীভাবে DataLoader দিয়ে প্রতিরোধ করবেন?",
    answer: `
<p><code>@ResolveField()</code> মেথডে ব্যাচিং এবং মেমোাইজেশন করতে <code>DataLoader</code> ইন্টিগ্রেট করে N-সংখ্যক কোয়েরিকে ১টি ব্যাচ ইকুয়ালিটি ডিরেক্ট কোয়েরিতে রূপান্তর করা।</p>
    `
  },
  {
    id: "nest-36",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["OpenAPI", "Swagger", "Cli Plugin"],
    question: "NestJS Swagger CLI Plugin (@nestjs/swagger/plugin) কীভাবে অটো-DTO ইনস্পেকশন করে?",
    answer: `
<p><code>nest-cli.json</code>-এ প্লাগইন অন করলে DTO ক্লাসে বারবার <code>@ApiProperty()</code> ডেকোরেটর না লিখেই স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট ইন্টারফেস রিড করে Swagger স্কিমা বানায়।</p>
    `
  },
  {
    id: "nest-37",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Architecture", "Domain Driven Design", "DDD"],
    question: "NestJS-এ Domain-Driven Design (DDD) Architecture — Aggregates, Value Objects, Domain Events কীভাবে সংগঠিত করবেন?",
    answer: `
<p>ডোমেন লজিককে NestJS ডেকোরেটর থেকে মুক্ত খাঁটি টাইপস্ক্রিপ্ট ফোল্ডারে (Entities, Value Objects) রাখা এবং ইনফ্রাস্ট্রাকচার মডিউলের মাধ্যমে রিফ্লেক্ট করা।</p>
    `
  },
  {
    id: "nest-38",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Health", "Terminus", "Kubernetes"],
    question: "NestJS Terminus Health Indicators (TypeOrmHealthIndicator, MemoryHealthIndicator) দিয়ে Readiness/Liveness Probes তৈরি কীভাবে করবেন?",
    answer: `
<p><code>/health/readiness</code> এ ডাটাবেজ সকেট চেক এবং <code>/health/liveness</code> এ মেমোরি থ্রেশহোল্ড চেক করে Kubernetes cluster POD রিফ্রেস নিয়ন্ত্রণ করা।</p>
    `
  },
  {
    id: "nest-39",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Custom Decorators", "ParamDecorator", "Reflector"],
    question: "createParamDecorator দিয়ে কাস্টম প্যারামিটার ডেকোরেটর (e.g. @ExtractToken(), @IpAddress()) কীভাবে বানাবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div><pre><code>export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);</code></pre></div>
    `
  },
  {
    id: "nest-40",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Queues", "BullMQ", "Events"],
    question: "BullMQ Queue Events (@OnQueueCompleted, @OnQueueFailed) দিয়ে ব্যাকগ্রাউন্ড জব ফেলওভার হ্যান্ডেল কীভাবে করবেন?",
    answer: `
<p>জব ক্যানসেল বা ফেইল হলে <code>@OnQueueFailed()</code> লিসেনারে রিনোটিফিকেশন পাঠানো এবং জব অটো-রিট্রাই সেটিংস (backoff exponential) কনফিগার করা।</p>
    `
  },
  {
    id: "nest-41",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "Throttler", "ThrottlerGuard"],
    question: "NestJS @nestjs/throttler দিয়ে ডাইনামিক এবং প্রক্সি-সচেতন Rate Limiting কীভাবে করবেন?",
    answer: `
<p><code>ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }])</code> দিয়ে কন্ট্রোলার লেভেলে <code>@SkipThrottle()</code> বা কাস্টম প্রক্সি IP ওভাররাইড ThrottlerGuard সেট করা।</p>
    `
  },
  {
    id: "nest-42",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["CLI", "Schematics", "Generators"],
    question: "NestJS CLI Schematics (nest g resource) কীভাবে স্ট্যান্ডার্ড মডিউল স্কেফোল্ড করে?",
    answer: `
<p><code>nest g res users</code> চালালে এটি এক ক্লিকে Controller, Service, Module, DTO, Entity এবং Spec ফাইল জেনারেট করে মডিউলে রেজিস্টার করে।</p>
    `
  },
  {
    id: "nest-43",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Logging", "Winston", "LoggerService"],
    question: "NestJS-এ কাস্টম LoggerService (e.g. Winston/Pino integration) দিয়ে স্ট্রাকচার্ড JSON লগিং কীভাবে করবেন?",
    answer: `
<p>NestJS-এর ডিফল্ট <code>Logger</code> ক্লাস কাস্টম Pino/Winston সার্ভিস দিয়ে রিপ্লেস করে সকল এরর স্ট্যাক JSON লাইনে আউটপুট দেওয়া।</p>
    `
  },
  {
    id: "nest-44",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Microservices", "GRPC", "Proto"],
    question: "NestJS-এ gRPC Microservice Transport এবং ClientsModule.register() কীভাবে সেটআপ করবেন?",
    answer: `
<p>Protobuf ফাইল লোড করে gRPC ট্রান্সপোর্ট কনফিগার করা এবং অন্য সার্ভিস থেকে <code>@Inject('HERO_PACKAGE') ClientGrpc</code> দিয়ে কল করা।</p>
    `
  },
  {
    id: "nest-45",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Performance", "Fastify", "Express Adapter"],
    question: "NestJS Express Adapter বনাম Fastify Adapter-এর পারফরম্যান্স সুবিধা ও পরিবর্তন কী?",
    answer: `
<p><code>FastifyAdapter</code> ব্যবহার করলে HTTP throughput ২ গুণ পর্যন্ত বাড়ে, তবে এক্সপ্রেস-নির্দিষ্ট মিডলওয়্যার রিপ্লেস করতে হয়।</p>
    `
  },
  {
    id: "nest-46",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["File Upload", "FileInterceptor", "Multer"],
    question: "NestJS-এ FileInterceptor, FilesInterceptor এবং ParseFilePipe দিয়ে ফাইল সাইজ ও টাইপ ভ্যালিডেশন কীভাবে করবেন?",
    answer: `
<p><code>@UseInterceptors(FileInterceptor('file'))</code> এবং <code>ParseFilePipe({ validators: [new MaxFileSizeValidator(...)] })</code> দিয়ে নিরাপদ ফাইল আপলোড।</p>
    `
  },
  {
    id: "nest-47",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "CORS"],
    question: "NestJS Bootstrap Server Security (Helmet, CORS, CSRF, Rate-limit) বেস্ট প্র্যাকটিস কী?",
    answer: `
<p><code>app.use(helmet())</code>, <code>app.enableCors({...})</code>, <code>app.useGlobalPipes(new ValidationPipe({ whitelist: true }))</code> সেটআপ করা।</p>
    `
  },
  {
    id: "nest-48",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Context", "ExecutionContext", "ArgumentsHost"],
    question: "NestJS ExecutionContext এবং ArgumentsHost-এর কাজের পার্থক্য কী?",
    answer: `
<p><strong>ArgumentsHost:</strong> ইনকামিং রিকুয়েস্টের প্রোটোকল কনটেক্সট (HTTP, RPC, WebSockets) অ্যাক্সেস করতে দেয়।</p><p><strong>ExecutionContext:</strong> ArgumentsHost-কে এক্সটেন্ড করে বর্তমান রুট হ্যান্ডলার ক্লাস ও মেথডের মেটাডাটা জানায়।</p>
    `
  },
  {
    id: "nest-49",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Multi-tenancy", "SaaS", "Databases"],
    question: "NestJS-এ Multi-tenancy (Tenant-per-database vs Schema-per-tenant) কীভাবে বাস্তবায়ন করবেন?",
    answer: `
<p>ইনকামিং Subdomain বা Header থেকে Tenant ID বের করে Dynamic Provider দিয়ে নির্দিষ্ট Tenant ডাটাবেজ কানেকশন বা স্কোপ রিপ্লেস করা।</p>
    `
  },
  {
    id: "nest-50",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Serialization", "ClassSerializerInterceptor", "Exclude"],
    question: "ClassSerializerInterceptor এবং @Exclude(), @Expose() দিয়ে Sensitive Data (Password) লুকানো কীভাবে করবেন?",
    answer: `
<p>Entity বা DTO-তে <code>@Exclude()</code> বসিয়ে কন্ট্রোলারে <code>@UseInterceptors(ClassSerializerInterceptor)</code> বসালে স্বয়ংক্রিয়ভাবে পাসওয়ার্ড ফিল্ড বাদ দিয়ে JSON রেসপন্স পাঠায়।</p>
    `
  }
];
