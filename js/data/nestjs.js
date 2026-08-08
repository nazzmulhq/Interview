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
        <li>রেসপন্স ফরম্যাট রূপাত্নর করা (Response Transformation Envelope Pattern)।</li>
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
  },
  {
    id: "nest-11",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Queues","BullMQ","Redis"],
    question: "NestJS-এ BullMQ (@nestjs/bull) দিয়ে Queue Management কীভাবে কাজ করে?",
    answer: `
      <p><strong>BullMQ</strong> হলো Redis-ভিত্তিক একটি রোবাস্ট কিউ ম্যানেজার। যখন কোনো হেভি টাস্ক (যেমন- ইমেইল পাঠানো, ভিডিও প্রসেসিং) সিঙ্ক্রোনাসভাবে করলে রিকোয়েস্ট ব্লক হয়ে যায়, তখন সেটি ব্যাকগ্রাউন্ডে পাঠানোর জন্য কিউ ব্যবহার করা হয়।</p>
      <h4>ব্যবহার পদ্ধতি:</h4>
      <ol>
        <li><code>BullModule.forRoot()</code> দিয়ে Redis কনফিগ করা হয়।</li>
        <li><code>BullModule.registerQueue()</code> দিয়ে নির্দিষ্ট কিউ রেজিস্টার করা হয়।</li>
        <li>প্রযোজক (Producer): <code>@InjectQueue()</code> দিয়ে কিউতে জব পাঠানো হয়।</li>
        <li>গ্রাহক (Consumer): <code>@Processor()</code> এবং <code>@Process()</code> ডেকোরেটর দিয়ে ব্যাকগ্রাউন্ডে জব প্রসেস করা হয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Processor('emailQueue')
export class EmailConsumer {
  @Process('sendEmail')
  async handleSendEmail(job: Job<EmailData>) {
    console.log(\`Sending email to \${job.data.to}\`);
    // Email sending logic
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-12",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Tasks","Cron","Schedule"],
    question: "NestJS-এ Task Scheduling ও Cron Jobs (@Cron) কীভাবে পরিচালনা করা হয়?",
    answer: `
      <p>NestJS-এ নির্দিষ্ট সময়ে বা নির্দিষ্ট ব্যবধানে কোনো কাজ স্বয়ংক্রিয়ভাবে করার জন্য <code>@nestjs/schedule</code> প্যাকেজ ব্যবহার করা হয়।</p>
      <h4>প্রধান ডেকোরেটরসমূহ:</h4>
      <ul>
        <li><strong>@Cron(cronExpression):</strong> ক্রন এক্সপ্রেশন অনুযায়ী টাস্ক রান করে (যেমন- প্রতিদিন মধ্যরাতে)।</li>
        <li><strong>@Interval(ms):</strong> নির্দিষ্ট মিলিসেকেন্ড পর পর টাস্ক রান করে।</li>
        <li><strong>@Timeout(ms):</strong> নির্দিষ্ট সময় পর মাত্র একবার টাস্ক রান করে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleDailyReport() {
    console.log('Generating daily report...');
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-13",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Realtime","WebSockets","Gateways"],
    question: "NestJS @WebSocketGateway() ব্যবহার করে সকেট কীভাবে সেটআপ করবেন?",
    answer: `
      <p>NestJS-এ রিয়েল-টাইম বা বাইডিরেকশনাল কমিউনিকেশনের জন্য WebSocket Gateway ব্যবহার করা হয়। <code>@WebSocketGateway()</code> দিয়ে একটি ক্লাস ডেকোরেট করলে এটি সকেট কানেকশন হ্যান্ডেল করতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@WebSocketGateway(3001, { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string): void {
    // Broadcast to all clients
    this.server.emit('receiveMessage', message);
  }
}</code></pre>
      </div>
      <p>এখানে <code>@SubscribeMessage()</code> ক্লায়েন্ট থেকে আসা ইভেন্ট লিসেন করে এবং <code>@WebSocketServer()</code> সার্ভার ইনস্ট্যান্স ইনজেক্ট করে যা সকল ক্লায়েন্টকে মেসেজ পাঠাতে সাহায্য করে।</p>
    `
  },
  {
    id: "nest-14",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["GraphQL","Code-first","Schema-first"],
    question: "NestJS GraphQL Integration-এ Code-first vs Schema-first-এর পার্থক্য কী?",
    answer: `
      <p>NestJS-এ GraphQL ইন্টিগ্রেশনের জন্য দুটি প্রধান অ্যাপ্রোচ রয়েছে:</p>
      <ul>
        <li><strong>Schema-first:</strong> এখানে প্রথমে হাতে <code>.graphql</code> ফাইলে SDL (Schema Definition Language) লেখা হয়। এরপর ওই স্কিমা অনুযায়ী টাইপস্ক্রিপ্ট কোড বা রিসল্ভার লেখা হয়।</li>
        <li><strong>Code-first (Recommended):</strong> এখানে টাইপস্ক্রিপ্ট ক্লাস ও ডেকোরেটর (<code>@ObjectType()</code>, <code>@Field()</code>) ব্যবহার করে স্কিমা ডিফাইন করা হয়। NestJS রানটাইমে এই ক্লাসগুলো থেকে স্বয়ংক্রিয়ভাবে SDL স্কিমা জেনারেট করে। এতে কোড ডুপ্লিকেশন কমে এবং টাইপ-সেফটি বজায় থাকে।</li>
      </ul>
    `
  },
  {
    id: "nest-15",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["DI","Custom Providers","Patterns"],
    question: "NestJS Custom Providers (useValue, useClass, useFactory) কখন ব্যবহৃত হয়?",
    answer: `
      <p>সাধারণ ক্লাস প্রোভাইডারের বাইরে বিশেষ প্রয়োজনে কাস্টম প্রোভাইডার ব্যবহার করা হয়।</p>
      <ul>
        <li><strong>useValue:</strong> কোনো মক (Mock) অবজেক্ট বা কনস্ট্যান্ট ভ্যালু ইনজেক্ট করতে ব্যবহৃত হয় (ইউনিট টেস্টিংয়ে খুব কাজে দেয়)।</li>
        <li><strong>useClass:</strong> কোনো অ্যাবস্ট্রাক্ট ক্লাস বা ইন্টারফেসের বিপরীতে কোন কংক্রিট ক্লাসের ইনস্ট্যান্স তৈরি হবে তা ডাইনামিকভাবে নির্ধারণ করতে।</li>
        <li><strong>useFactory:</strong> যখন ডিপেন্ডেন্সি তৈরি করার জন্য কিছু অ্যাসিনক্রোনাস কাজ বা কমপ্লেক্স লজিক (যেমন- ডাটাবেজ কানেকশন কনফিগ) করা প্রয়োজন হয়।</li>
      </ul>
    `
  },
  {
    id: "nest-16",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Lifecycle","Hooks","Architecture"],
    question: "NestJS Lifecycle Hooks-এর প্রধান ধাপগুলো কী কী?",
    answer: `
      <p>NestJS-এ প্রতিটি কম্পোনেন্ট (Module, Provider, Controller) এর নির্দিষ্ট লাইফসাইকেল ইভেন্ট থাকে। প্রধান হুকগুলো হলো:</p>
      <ol>
        <li><strong>OnModuleInit:</strong> মডিউলের ডিপেন্ডেন্সি লোড হওয়ার পর কল হয়। (<code>implements OnModuleInit</code>)</li>
        <li><strong>OnApplicationBootstrap:</strong> সম্পূর্ণ অ্যাপ্লিকেশন বুটস্ট্র্যাপ হওয়ার ঠিক আগে, সকল লিসেনার রেডি হওয়ার পর কল হয়।</li>
        <li><strong>OnModuleDestroy:</strong> অ্যাপ শাটডাউন সিগন্যাল পাওয়ার পর ক্লিনআপ করার জন্য কল হয়।</li>
        <li><strong>OnApplicationShutdown:</strong> সম্পূর্ণ অ্যাপ্লিকেশন বন্ধ হওয়ার ঠিক আগে কল হয়।</li>
      </ol>
    `
  },
  {
    id: "nest-17",
    category: "NestJS",
    difficulty: "Beginner",
    tags: ["Docs","Swagger","OpenAPI"],
    question: "NestJS-এ Swagger OpenAPI Integration কীভাবে ডক্স জেনারেট করে?",
    answer: `
      <p><code>@nestjs/swagger</code> প্যাকেজ ব্যবহার করে NestJS অ্যাপ্লিকেশনের রাউট এবং DTO থেকে স্বয়ংক্রিয়ভাবে ইন্টারঅ্যাকটিভ REST API ডকুমেন্টেশন তৈরি করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// main.ts
const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);</code></pre>
      </div>
      <p>কন্ট্রোলারে <code>@ApiTags()</code> এবং DTO-তে <code>@ApiProperty()</code> ব্যবহার করলে সুন্দর UI সহ ডক্স <code>/api/docs</code> রুটে জেনারেট হয়।</p>
    `
  },
  {
    id: "nest-18",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Health Check","Terminus","DevOps"],
    question: "NestJS-এ Terminus দিয়ে Health Checks Endpoint কীভাবে সেটআপ করবেন?",
    answer: `
      <p><code>@nestjs/terminus</code> প্যাকেজ ব্যবহার করে অ্যাপ্লিকেশনের নির্ভরশীল সার্ভিসগুলো (যেমন- ডাটাবেজ, রেডিস, ডিস্ক স্পেস) সচল আছে কিনা তা চেক করার জন্য রোবাস্ট হেলথ চেক এন্ডপয়েন্ট তৈরি করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-19",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Architecture", "Interceptors", "AOP"],
    question: "NestJS Interceptors (NestInterceptor) কী? Aspect-Oriented Programming (AOP) এবং RxJS Observable রূপান্তর কীভাবে কাজ করে?",
    answer: `
      <p>Interceptor হলো AOP প্যাটার্ন ইমপ্লিমেন্ট করার মেকানিজম। এটি <code>ExecutionContext</code> এবং <code>CallHandler</code> (RxJS Observable) ব্যবহার করে।</p>
      <p>রাউট হ্যান্ডলার এক্সিকিউট হওয়ার আগে এবং পরে (Observable স্ট্রিম থেকে ডাটা ফেরার সময়) লজিক ইনজেক্ট করা যায়। এটি রেসপন্স ট্রান্সফর্ম, ক্যাশিং, লগিং বা এরর হ্যান্ডলিংয়ের জন্য বেস্ট।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(\`After... \${Date.now() - now}ms\`)),
    );
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-20",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Guards", "Auth", "Security"],
    question: "NestJS Guards (CanActivate) এবং Custom Decorators (@Roles, @CurrentUser) দিয়ে RBAC Authorization কীভাবে করবেন?",
    answer: `
      <p>RBAC (Role-Based Access Control) বাস্তবায়নে কাস্টম ডেকোরেটর দিয়ে রোল মেটাডেটা সেট করা হয়, এবং Guard দিয়ে সেই রোল ভ্যালিডেট করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Roles Decorator
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Controller
@Get('admin-data')
@Roles('admin')
@UseGuards(RolesGuard)
getAdminData() { ... }

// Guard
canActivate(context: ExecutionContext) {
  const roles = this.reflector.get('roles', context.getHandler());
  const user = context.switchToHttp().getRequest().user;
  return roles.some(role => user.roles.includes(role));
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-21",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Pipes", "Validation", "class-validator"],
    question: "NestJS ValidationPipe, class-validator এবং class-transformer দিয়ে DTO Input Validation কীভাবে কাজ করে?",
    answer: `
      <p><code>ValidationPipe</code> ইনকামিং রিকোয়েস্টের বডিকে DTO ক্লাসে রূপান্তর (Transform) করে এবং <code>class-validator</code> ডেকোরেটরগুলো দিয়ে ভ্যালিডেট করে। ভুল ডাটা হলে ৪০০ Bad Request থ্রো করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>export class CreateUserDto {
  @IsEmail() email: string;
  @MinLength(8) password: string;
}

// Global Setup with strict options
app.useGlobalPipes(new ValidationPipe({
  whitelist: true, // Strips unknown properties
  forbidNonWhitelisted: true, // Throws error for unknown props
  transform: true, // Converts payload to DTO instance
}));</code></pre>
      </div>
    `
  },
  {
    id: "nest-22",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Exception Filters", "Error Handling", "Global"],
    question: "NestJS Exception Filters (BaseExceptionFilter, @Catch) দিয়ে সেন্ট্রালাইজড এরর ফরম্যাটিং কীভাবে সেটআপ করবেন?",
    answer: `
      <p>বিল্ট-ইন এরর রেসপন্সের বদলে নিজস্ব স্ট্যান্ডার্ড JSON ফরম্যাটে এরর দেখাতে <code>@Catch()</code> ডেকোরেটর দিয়ে গ্লোবাল ফিল্টার তৈরি করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal server error',
    });
  }
}
// main.ts: app.useGlobalFilters(new AllExceptionsFilter());</code></pre>
      </div>
    `
  },
  {
    id: "nest-23",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Microservices", "Transports", "TCP/Redis/Kafka"],
    question: "NestJS Microservices Architecture: Transport Strategy (TCP, Redis, NATS, Kafka) এবং @MessagePattern vs @EventPattern কী?",
    answer: `
      <p>NestJS মাইক্রোসার্ভিসেস বিভিন্ন ট্রান্সপোর্ট লেয়ার সাপোর্ট করে। মেসেজিং প্যাটার্ন দুটি হলো:</p>
      <ul>
        <li><strong>@MessagePattern (Request-Response):</strong> ক্লায়েন্ট সার্ভিসে রিকোয়েস্ট পাঠায় এবং সার্ভিস থেকে রেসপন্স (ACK) পাওয়ার জন্য অপেক্ষা করে। সিঙ্ক্রোনাস বিহেভিয়ার।</li>
        <li><strong>@EventPattern (Event-driven):</strong> ফায়ার-এন্ড-ফরগেট (Fire-and-forget)। সার্ভিস ইভেন্ট রিসিভ করে কিন্তু ক্লায়েন্টকে কোনো রেসপন্স ফেরত দেয় না। অ্যাসিনক্রোনাস টাস্কের জন্য আদর্শ।</li>
      </ul>
    `
  },
  {
    id: "nest-24",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Modules", "Dynamic Modules", "useFactory"],
    question: "NestJS Dynamic Modules (forRoot, forRootAsync, register) কখন এবং কেন প্রয়োজন?",
    answer: `
      <p>যখন কোনো মডিউলকে কনফিগারেশন প্যারামিটার দিয়ে ডাইনামিকভাবে তৈরি করতে হয়, তখন ডায়নামিক মডিউল ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>register / forRoot:</strong> সিঙ্ক্রোনাস কনফিগারেশনের জন্য। <code>forRoot</code> সাধারণত গ্লোবাল মডিউলের জন্য (যেমন DB কানেকশন) এবং <code>register</code> ফিচার লেভেলের জন্য ব্যবহৃত হয়।</li>
        <li><strong>forRootAsync / registerAsync:</strong> যখন কনফিগারেশন ডাটা অ্যাসিনক্রোনাসভাবে (যেমন <code>ConfigService</code> থেকে) ফেচ করতে হয়, তখন <code>useFactory</code> সহ এই মেথডগুলো ব্যবহৃত হয়।</li>
      </ul>
    `
  },
  {
    id: "nest-25",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["CQRS", "CommandBus", "QueryBus"],
    question: "NestJS-এ @nestjs/cqrs প্যাকেজ দিয়ে CQRS Pattern (Command, Query, Event Handlers) কীভাবে ইমপ্লিমেন্ট করবেন?",
    answer: `
      <p><strong>CQRS (Command Query Responsibility Segregation)</strong> প্যাটার্নে রিড (Query) এবং রাইট (Command) অপারেশন আলাদা করা হয়। <code>@nestjs/cqrs</code> প্যাকেজ দিয়ে এটি ইমপ্লিমেন্ট করা হয়।</p>
      <ul>
        <li><strong>CommandBus:</strong> রাইট রিকোয়েস্ট হ্যান্ডেল করে (Create, Update)।</li>
        <li><strong>QueryBus:</strong> রিড রিকোয়েস্ট হ্যান্ডেল করে (Get data)।</li>
        <li><strong>EventBus:</strong> কমান্ড সফল হলে ইভেন্ট ফায়ার করে (যেমন <code>UserCreatedEvent</code>), যা অন্য হ্যান্ডলাররা লিসেন করে।</li>
      </ul>
    `
  },
  {
    id: "nest-26",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Event Emitter", "Decoupling", "Events"],
    question: "NestJS-এ @nestjs/event-emitter দিয়ে ইন-প্রসেস ইভেন্ট ড্রাইভেন আর্কিটেকচার কীভাবে তৈরি করবেন?",
    answer: `
      <p>কোনো হেভি টাস্ক বা সাইড ইফেক্ট (যেমন ইমেইল পাঠানো) মেইন ফ্লো থেকে আলাদা করতে <code>@nestjs/event-emitter</code> ব্যবহৃত হয়। এটি সার্ভিসের মধ্যে লুজ কাপলিং (Loose Coupling) নিশ্চিত করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// user.service.ts
eventEmitter.emit('user.created', newUser);

// email.service.ts
@OnEvent('user.created')
handleUserCreatedEvent(payload: User) {
  this.mailService.sendWelcomeEmail(payload.email);
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-27",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["DI", "Scopes", "TRANSIENT"],
    question: "NestJS Injection Scopes (DEFAULT, REQUEST, TRANSIENT) কী এবং Performance Impact কী?",
    answer: `
      <ul>
        <li><strong>DEFAULT (Singleton):</strong> পুরো অ্যাপে ১টি ইনস্ট্যান্স শেয়ার হয়। মেমোরি ও পারফরম্যান্সের জন্য সেরা।</li>
        <li><strong>REQUEST:</strong> প্রতি HTTP রিকোয়েস্টের জন্য নতুন ইনস্ট্যান্স তৈরি হয়। এটি পারফরম্যান্স স্লো করে কারণ DI কন্টেইনারকে প্রতিবার নতুন করে ডিপেন্ডেন্সি রিসল্ভ করতে হয়।</li>
        <li><strong>TRANSIENT:</strong> যেখানে ইনজেক্ট করা হবে সেখানে আলাদা ইনস্ট্যান্স দেয়।</li>
      </ul>
      <p>সাধারণত স্টেটলেস (Stateless) অ্যাপের জন্য <code>DEFAULT</code> স্কোপ ব্যবহার করাই বেস্ট প্র্যাকটিস।</p>
    `
  },
  {
    id: "nest-28",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Middleware", "Express Middleware", "NestMiddleware"],
    question: "NestJS Middleware vs Interceptor vs Guard vs Pipe — এক্সিকিউশন অর্ডার বা সিকুয়েন্স কী?",
    answer: `
      <p>একটি ইনকামিং HTTP রিকোয়েস্ট নিচের সিকুয়েন্সে এক্সিকিউট হয়:</p>
      <ol>
        <li><strong>Middleware:</strong> রিকোয়েস্ট প্রি-প্রসেসিং (যেমন লগিং, CORS)।</li>
        <li><strong>Guard:</strong> অথেন্টিকেশন ও অথোরাইজেশন (CanActivate)।</li>
        <li><strong>Interceptor (Before):</strong> কন্ট্রোলারে যাওয়ার আগের লজিক।</li>
        <li><strong>Pipe:</strong> রিকোয়েস্ট বডি বা প্যারাম ভ্যালিডেশন ও ট্রান্সফর্মেশন।</li>
        <li><strong>Controller Handler:</strong> মূল রাউট হ্যান্ডলার।</li>
        <li><strong>Interceptor (After):</strong> রেসপন্স ক্লায়েন্টকে যাওয়ার আগের লজিক।</li>
        <li><strong>Exception Filter:</strong> যেকোনো ধাপে এরর হলে তা হ্যান্ডেল করে।</li>
      </ol>
    `
  },
  {
    id: "nest-29",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Database", "TypeORM", "Prisma"],
    question: "NestJS-এ TypeORM / Prisma Integration: Repository Pattern, Transactions এবং Migrations কীভাবে পরিচালিত হয়?",
    answer: `
      <p><strong>TypeORM:</strong> <code>@InjectRepository()</code> দিয়ে ডিপেন্ডেন্সি ইনজেকশন করা হয়। ট্রানজেকশনের জন্য <code>QueryRunner</code> ব্যবহৃত হয়।</p>
      <p><strong>Prisma:</strong> একটি কাস্টম <code>PrismaService</code> (<code>extends PrismaClient</code>) তৈরি করা হয়। ট্রানজেকশনের জন্য <code>prisma.$transaction()</code> ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// TypeORM Transaction
async createWithTransaction() {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager.save(User, data);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-30",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Config", "ConfigModule", "Joi"],
    question: "NestJS @nestjs/config এবং Joi/Zod Schema Validation দিয়ে Env Variables সাশ্রয়ীভাবে পরিচালনা কীভাবে করবেন?",
    answer: `
      <p>এনভায়রনমেন্ট ভেরিয়েবল ভ্যালিডেশন প্রোডাকশন অ্যাপের জন্য খুবই জরুরি। <code>Joi</code> ব্যবহার করে অ্যাপ স্টার্ট হওয়ার সময়ই কনফিগ ভ্যালিডেট করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>ConfigModule.forRoot({
  validationSchema: Joi.object({
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  }),
});</code></pre>
      </div>
      <p>কনফিগ মিসিং থাকলে অ্যাপ স্টার্ট হওয়ার সাথে সাথেই এরর থ্রো করবে, ফলে রানটাইমে ক্র্যাশ এড়ানো যায়।</p>
    `
  },
  {
    id: "nest-31",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Caching", "CacheModule", "Redis"],
    question: "NestJS CacheModule, CacheInterceptor এবং Redis Store দিয়ে অটো-ক্যাশিং কীভাবে করবেন?",
    answer: `
      <p>NestJS-এ রেসপন্স ক্যাশিংয়ের জন্য <code>CacheModule</code> এবং <code>CacheInterceptor</code> ব্যবহৃত হয়। এটি ডাটাবেজের লোড কমায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app.module.ts
CacheModule.registerAsync({
  isGlobal: true,
  useFactory: () => ({
    store: redisStore,
    host: 'localhost',
    port: 6379,
  }),
});

// controller.ts
@Get(':id')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60) // Cache for 60 seconds
findOne(@Param('id') id: string) {
  return this.userService.findOne(id);
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-32",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Testing", "Jest", "TestBed"],
    question: "NestJS-এ Test.createTestingModule() দিয়ে Controller এবং Service Unit Testing & E2E Testing কীভাবে করবেন?",
    answer: `
      <p>ইউনিট টেস্টিংয়ে <code>Test.createTestingModule()</code> দিয়ে আইসোলেটেড কনটেক্সট তৈরি করা হয়। এখানে আসল সার্ভিসের বদলে Mock ব্যবহার করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const module = await Test.createTestingModule({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useValue: mockRepo }, // Mocked DB
  ],
}).compile();

// E2E Testing uses the real HTTP server:
const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
const app = moduleRef.createNestApplication();
await app.init();
// Use supertest to make HTTP calls</code></pre>
      </div>
    `
  },
  {
    id: "nest-33",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Security", "Passport", "JWT"],
    question: "NestJS @nestjs/passport এবং Passport-JWT Strategy দিয়ে Access & Refresh Token Authentication কীভাবে সেটআপ করবেন?",
    answer: `
      <p>NestJS-এ JWT অথেন্টিকেশনের জন্য <code>PassportStrategy(Strategy)</code> এক্সটেন্ড করে একটি স্ট্র্যাটেজি ক্লাস তৈরি করা হয়। <code>validate()</code> মেথডে ইউজার পেলোড চেক করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// Protect routes with: @UseGuards(AuthGuard('jwt'))</code></pre>
      </div>
    `
  },
  {
    id: "nest-34",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["WebSockets", "Socket.io", "Adapters"],
    question: "NestJS WebSocket Adapters (Socket.io vs ws) এবং Redis IoAdapter দিয়ে ক্লাস্টার স্কেলিং কীভাবে করবেন?",
    answer: `
      <p>যখন অ্যাপ্লিকেশন একাধিক সার্ভারে (Cluster) স্কেল করা হয়, তখন Socket.io এর ডিফল্ট ইন-মেমোরি অ্যাডাপ্টার কাজ করে না। কারণ সার্ভার ১-এ ক্লায়েন্ট কানেক্টেড থাকলে সার্ভার ২ সেটা জানবে না।</p>
      <p>এই সমস্যা সমাধানের জন্য <strong>Redis IoAdapter</strong> ব্যবহৃত হয়। এটি Redis Pub/Sub ব্যবহার করে সকল সার্ভার নোডের মধ্যে সকেট ইভেন্ট ব্রডকাস্ট করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const redisIoAdapter = new RedisIoAdapter(app);
await redisIoAdapter.connectToRedis();
app.useWebSocketAdapter(redisIoAdapter);</code></pre>
      </div>
    `
  },
  {
    id: "nest-35",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["GraphQL", "Resolvers", "DataLoader"],
    question: "NestJS GraphQL Resolvers-এ N+1 Query Problem কীভাবে DataLoader দিয়ে প্রতিরোধ করবেন?",
    answer: `
      <p>GraphQL-এ যখন একটি লিস্ট কোয়েরি করা হয় এবং প্রতিটি আইটেমের রিলেটেড ডাটা আনার জন্য আলাদা ডাটাবেজ কল হয়, তখন N+1 সমস্যা তৈরি হয়। <strong>DataLoader</strong> এই কলগুলোকে ব্যাচ (Batch) করে একটি মাত্র কোয়েরিতে রূপান্তর করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@ResolveField(() => Author)
async author(@Parent() post: Post, @Loaders() loaders: DataLoaders) {
  // Batches multiple author IDs into a single DB call
  return loaders.authorLoader.load(post.authorId);
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-36",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["OpenAPI", "Swagger", "Cli Plugin"],
    question: "NestJS Swagger CLI Plugin (@nestjs/swagger/plugin) কীভাবে অটো-DTO ইনস্পেকশন করে?",
    answer: `
      <p>সাধারণত Swagger ডক্সের জন্য DTO ক্লাসে প্রতিটি ফিল্ডে <code>@ApiProperty()</code> লিখতে হয়, যা কোড ডুপ্লিকেশন তৈরি করে।</p>
      <p><code>@nestjs/swagger</code> CLI Plugin <code>nest-cli.json</code>-এ কনফিগার করলে এটি কম্পাইল টাইমে টাইপস্ক্রিপ্ট অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) রিড করে স্বয়ংক্রিয়ভাবে Swagger ডেকোরেটর ও রেসপন্স টাইপ ইনজেক্ট করে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// nest-cli.json
{
  "plugins": ["@nestjs/swagger"]
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-37",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Architecture", "Domain Driven Design", "DDD"],
    question: "NestJS-এ Domain-Driven Design (DDD) Architecture — Aggregates, Value Objects, Domain Events কীভাবে সংগঠিত করবেন?",
    answer: `
      <p>NestJS-এ DDD ইমপ্লিমেন্ট করতে বিজনেস লজিককে ফ্রেমওয়ার্ক (NestJS/Express) থেকে সম্পূর্ণ আলাদা রাখা হয়।</p>
      <ul>
        <li><strong>Domain Layer:</strong> খাঁটি টাইপস্ক্রিপ্ট ক্লাস, কোনো ডেকোরেটর থাকে না। এখানে <code>Aggregates</code>, <code>Value Objects</code>, এবং <code>Domain Events</code> থাকে।</li>
        <li><strong>Application Layer:</strong> Use Cases (Commands/Queries)। এটি Domain লজিককে অর্কেস্ট্রেট করে।</li>
        <li><strong>Infrastructure Layer:</strong> ডাটাবেজ, থার্ড-পার্টি API, এবং NestJS মডিউল।</li>
      </ul>
    `
  },
  {
    id: "nest-38",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Health", "Terminus", "Kubernetes"],
    question: "NestJS Terminus Health Indicators (TypeOrmHealthIndicator, MemoryHealthIndicator) দিয়ে Readiness/Liveness Probes তৈরি কীভাবে করবেন?",
    answer: `
      <p>Kubernetes বা অন্য কোনো অর্কেস্ট্রেশন টুলের জন্য লাইভনেস (Liveness) এবং রেডিনেস (Readiness) প্রোব তৈরি করতে Terminus ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>Liveness (/health/live):</strong> অ্যাপ রান আছে কিনা তা চেক করে (মেমোরি লিক বা হ্যাং হলে রিস্টার্ট করার জন্য)।</li>
        <li><strong>Readiness (/health/ready):</strong> ডাটাবেজ বা রেডিসের মতো ডিপেন্ডেন্সি রেডি আছে কিনা চেক করে। না থাকলে ট্রাফিক না পাঠানোর জন্য।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Get('/health/ready')
@HealthCheck()
checkReady() {
  return this.health.check([
    () => this.db.pingCheck('database'),
    () => this.redis.pingCheck('redis'),
  ]);
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-39",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Custom Decorators", "ParamDecorator", "Reflector"],
    question: "createParamDecorator দিয়ে কাস্টম প্যারামিটার ডেকোরেটর (e.g. @ExtractToken(), @IpAddress()) কীভাবে বানাবেন?",
    answer: `
      <p>রিকোয়েস্ট অবজেক্ট থেকে বারবার ডাটা এক্সট্র্যাক্ট না করে ক্লিন কোড লেখার জন্য কাস্টম প্যারামিটার ডেকোরেটর ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Handle proxy IP (x-forwarded-for)
    return request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  },
);

// Usage in controller
@Get()
getData(@IpAddress() ip: string) {
  console.log(\`Request from IP: \${ip}\`);
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-40",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Queues", "BullMQ", "Events"],
    question: "BullMQ Queue Events (@OnQueueCompleted, @OnQueueFailed) দিয়ে ব্যাকগ্রাউন্ড জব ফেলওভার হ্যান্ডেল কীভাবে করবেন?",
    answer: `
      <p>BullMQ তে জব সফল বা ব্যর্থ হওয়ার পর স্বয়ংক্রিয়ভাবে কিছু কাজ (যেমন নোটিফিকেশন বা লগিং) করার জন্য Event Listener ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Processor('videoQueue')
export class VideoProcessor {
  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.error(\`Job \${job.id} failed: \${err.message}\`);
    // Send alert to admin
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(\`Job \${job.id} completed successfully!\`);
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-41",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "Throttler", "ThrottlerGuard"],
    question: "NestJS @nestjs/throttler দিয়ে ডাইনামিক এবং প্রক্সি-সচেতন Rate Limiting কীভাবে করবেন?",
    answer: `
      <p>API কে ব্রুট-ফোর্স বা DDoS অ্যাটাক থেকে বাঁচাতে Rate Limiting ব্যবহৃত হয়। <code>@nestjs/throttler</code> প্যাকেজ দিয়ে এটি করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app.module.ts
ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]), // 10 requests per minute

// controller.ts
@Throttle({ default: { limit: 3, ttl: 60000 } }) // Override limit for specific route
@Post('login')
login() { ... }

// To skip rate limiting: @SkipThrottle()</code></pre>
      </div>
      <p>প্রক্সির পেছনে থাকলে (যেমন Nginx/Load Balancer) সঠিক ক্লায়েন্ট IP পেতে <code>app.set('trust proxy', 1)</code> সেট করা আবশ্যক।</p>
    `
  },
  {
    id: "nest-42",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["CLI", "Schematics", "Generators"],
    question: "NestJS CLI Schematics (nest g resource) কীভাবে স্ট্যান্ডার্ড মডিউল স্কেফোল্ড করে?",
    answer: `
      <p>NestJS CLI ডেভেলপারদের বয়লারপ্লেট কোড লেখার সময় বাঁচায়। <code>nest g resource</code> কমান্ড একটি সম্পূর্ণ CRUD মডিউল সেকেন্ডের মধ্যে জেনারেট করে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>nest g resource users</code></pre>
      </div>
      <p>এই কমান্ডটি চালালে এটি Controller, Service, Module, DTOs (Create/Update), এবং Unit Test ফাইলগুলো স্বয়ংক্রিয়ভাবে তৈরি করে মডিউলে রেজিস্টার করে দেয়।</p>
    `
  },
  {
    id: "nest-43",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Logging", "Winston", "LoggerService"],
    question: "NestJS-এ কাস্টম LoggerService (e.g. Winston/Pino integration) দিয়ে স্ট্রাকচার্ড JSON লগিং কীভাবে করবেন?",
    answer: `
      <p>প্রোডাকশনে লগ ম্যানেজ করার জন্য (যেমন Datadog, ELK) ডিফল্ট NestJS লগারের বদলে স্ট্রাকচার্ড JSON লগ পাঠাতে Winston বা Pino ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// main.ts
const app = await NestFactory.create(AppModule, {
  bufferLogs: true,
});
app.useLogger(app.get(WinstonLogger)); // Custom Winston Service

// winston.module.ts
WinstonModule.forRoot({
  transports: [
    new winston.transports.Console({
      format: winston.format.json(), // Outputs structured JSON logs
    }),
  ],
});</code></pre>
      </div>
    `
  },
  {
    id: "nest-44",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Microservices", "GRPC", "Proto"],
    question: "NestJS-এ gRPC Microservice Transport এবং ClientsModule.register() কীভাবে সেটআপ করবেন?",
    answer: `
      <p>gRPC হলো গুগলের তৈরি একটি হাই-পারফরম্যান্স RPC ফ্রেমওয়ার্ক। এটি Protobuf ব্যবহার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Microservice Server
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, 'hero/hero.proto'),
  },
});

// Client (Caller)
ClientsModule.register([
  {
    name: 'HERO_PACKAGE',
    transport: Transport.GRPC,
    options: { package: 'hero', protoPath: 'hero.proto' },
  },
]);</code></pre>
      </div>
    `
  },
  {
    id: "nest-45",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Performance", "Fastify", "Express Adapter"],
    question: "NestJS Express Adapter বনাম Fastify Adapter-এর পারফরম্যান্স সুবিধা ও পরিবর্তন কী?",
    answer: `
      <p>NestJS ডিফল্টভাবে Express.js ব্যবহার করে, তবে পারফরম্যান্সের জন্য <strong>Fastify</strong> ব্যবহার করা যায়।</p>
      <ul>
        <li><strong>Fastify:</strong> এটি Express এর চেয়ে প্রায় ২ গুণ বেশি রিকোয়েস্ট পার সেকেন্ড (RPS) হ্যান্ডেল করতে পারে এবং কম মেমোরি খরচ করে।</li>
        <li><strong>পরিবর্তন:</strong> Fastify ব্যবহার করতে হলে <code>NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())</code> ব্যবহার করতে হবে। Express-এর কিছু মিডলওয়্যার যেমন <code>body-parser</code> Fastify-তে ডিফল্টভাবে বিল্ট-ইন থাকে, তাই অনেক মিডলওয়্যার রিপ্লেস করতে হয়।</li>
      </ul>
    `
  },
  {
    id: "nest-46",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["File Upload", "FileInterceptor", "Multer"],
    question: "NestJS-এ FileInterceptor, FilesInterceptor এবং ParseFilePipe দিয়ে ফাইল সাইজ ও টাইপ ভ্যালিডেশন কীভাবে করবেন?",
    answer: `
      <p>Multer ব্যবহার করে NestJS-এ ফাইল আপলোড হ্যান্ডেল করা হয়। <code>ParseFilePipe</code> দিয়ে ফাইলের সাইজ ও টাইপ ভ্যালিডেট করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 }), // 1KB
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    }),
  )
  file: Express.Multer.File,
) {
  return { message: 'File uploaded successfully' };
}</code></pre>
      </div>
    `
  },
  {
    id: "nest-47",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "CORS"],
    question: "NestJS Bootstrap Server Security (Helmet, CORS, CSRF, Rate-limit) বেস্ট প্র্যাকটিস কী?",
    answer: `
      <p>প্রোডাকশনে যাওয়ার আগে কিছু সিকিউরিটি মিডলওয়্যার সেটআপ করা বাধ্যতামূলক:</p>
      <ul>
        <li><strong>Helmet:</strong> হ্যাকারদের থেকে HTTP হেডার সুরক্ষিত রাখে। <code>app.use(helmet())</code></li>
        <li><strong>CORS:</strong> নির্দিষ্ট ডোমেইন ছাড়া অন্য ডোমেইন থেকে রিকোয়েস্ট ব্লক করে। <code>app.enableCors({ origin: ['https://myapp.com'] })</code></li>
        <li><strong>ValidationPipe:</strong> বিষাক্ত পেলোড থেকে রক্ষা করে। <code>app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))</code></li>
        <li><strong>Rate Limiting:</strong> Throttler গার্ড দিয়ে ব্রুট-ফোর্স ঠেকানো।</li>
      </ul>
    `
  },
  {
    id: "nest-48",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Context", "ExecutionContext", "ArgumentsHost"],
    question: "NestJS ExecutionContext এবং ArgumentsHost-এর কাজের পার্থক্য কী?",
    answer: `
      <p><strong>ArgumentsHost:</strong> এটি ইনকামিং রিকোয়েস্টের প্রোটোকল কনটেক্সট (HTTP, RPC, WebSockets) অ্যাক্সেস করতে দেয়। যেমন- <code>host.switchToHttp().getRequest()</code>। এটি Exception Filter-এ বেশি ব্যবহৃত হয়।</p>
      <p><strong>ExecutionContext:</strong> এটি ArgumentsHost-কে এক্সটেন্ড করে। এটি শুধু রিকোয়েস্টই দেয় না, বরং বর্তমান রুট হ্যান্ডলার ক্লাস ও মেথডের মেটাডাটাও জানায়। <code>context.getClass()</code> এবং <code>context.getHandler()</code>। এটি Guard বা Interceptor-এ ব্যবহৃত হয়।</p>
    `
  },
  {
    id: "nest-49",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Multi-tenancy", "SaaS", "Databases"],
    question: "NestJS-এ Multi-tenancy (Tenant-per-database vs Schema-per-tenant) কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p>SaaS অ্যাপ্লিকেশনে একাধিক টেন্যান্ট (Client) এর ডাটা আলাদা রাখাকে Multi-tenancy বলে।</p>
      <ul>
        <li><strong>Database per Tenant:</strong> সবচেয়ে নিরাপদ কিন্তু খরচ বেশি।</li>
        <li><strong>Schema per Tenant:</strong> একই ডাটাবেজে আলাদা স্কিমা।</li>
      </ul>
      <p>NestJS-এ এটি ইমপ্লিমেন্ট করতে একটি Middleware বা Guard ব্যবহার করে Subdomain বা Header থেকে Tenant ID বের করা হয়। এরপর একটি <strong>Tenant-aware DataSource Provider</strong> দিয়া রানটাইমে সেই টেন্যান্টের নির্দিষ্ট ডাটাবেজ কানেকশন ইনজেক্ট করা হয়।</p>
    `
  },
  {
    id: "nest-50",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Serialization", "ClassSerializerInterceptor", "Exclude"],
    question: "ClassSerializerInterceptor এবং @Exclude(), @Expose() দিয়ে Sensitive Data (Password) লুকানো কীভাবে করবেন?",
    answer: `
      <p>ইউজার ডাটা রেসপন্স করার সময় পাসওয়ার্ড বা সিক্রেট কী যেন ক্লায়েন্টের কাছে না যায়, সেটি নিশ্চিত করতে <code>ClassSerializerInterceptor</code> ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// user.entity.ts
import { Exclude } from 'class-transformer';

export class User {
  id: number;
  email: string;
  
  @Exclude()
  password: string;
}

// controller.ts
@UseInterceptors(ClassSerializerInterceptor)
@Get(':id')
findOne() {
  return this.userService.findOne(1); // Password will be stripped out automatically
}</code></pre>
      </div>
    `
  }
];