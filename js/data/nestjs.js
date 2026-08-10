const nestjsQuestions = [
  {
    id: "nest-1",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Dependency Injection","IoC Container","Architecture"],
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
    tags: ["Provider Scopes","Performance","Singleton"],
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
    tags: ["Pipes","Validation","DTO"],
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
    tags: ["Guards","Auth","RBAC"],
    question: "NestJS Guards কী? Role-based Access Control (RBAC) বাস্তবায়নে Guard এবং Reflector কীভাবে কাজ করে?",
    answer: `
      <p><strong>Guard</strong> হলো একটি ক্লাস যা <code>CanActivate</code> ইন্টারফেস বাস্তবায়ন করে। এটি মূলত নির্ধারণ করে কোনো নির্দিষ্ট রিকোয়েস্টকে রাউট হ্যান্ডলারে যেতে দেওয়া হবে কি না (Authentication & Authorization)।</p>
      <p>Guard কেবল <code>boolean</code> (true/false) বা <code>Promise&lt;boolean&gt;</code> রিটার্ন করে। <code>false</code> দিলে NestJS স্বয়ংক্রিয়ভাবে <code>403 ForbiddenException</code> থ্রো করে।</p>
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
    tags: ["Interceptors","RxJS","Aspect Oriented"],
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
    tags: ["Exception Filters","Error Handling"],
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
    tags: ["Dynamic Modules","ConfigModule"],
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
    tags: ["Microservices","RabbitMQ","gRPC"],
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
    tags: ["Custom Decorators","Param Decorator"],
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
    tags: ["Testing","Jest","Mocking"],
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
    tags: ["NestJS","RxJS","Timeout","Senior"],
    question: "NestJS-এ RxJS timeout() Operator দিয়ে Request Timeout Handling কীভাবে ইমপ্লিমেন্ট করবেন?",
    answer: `
      <p>একটি ধীর downstream সার্ভিস (external API, ভারী ডাটাবেজ কোয়েরি) পুরো রিকোয়েস্ট চিরকাল আটকে রাখতে পারে — Interceptor-এ RxJS-এর <code>timeout()</code> অপারেটর ব্যবহার করে একটি নির্দিষ্ট সময়ের পর স্বয়ংক্রিয়ভাবে রিকোয়েস্ট ব্যর্থ করে দেওয়া যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),                          // ৫ সেকেন্ডের বেশি হলে TimeoutError
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException('Request took too long'));
        }
        return throwError(() => err);
      }),
    );
  }
}

// গ্লোবালভাবে অ্যাপ্লাই করা
app.useGlobalInterceptors(new TimeoutInterceptor());</code></pre>
      </div>
      <h4>কেন গুরুত্বপূর্ণ — Resource Exhaustion প্রতিরোধ</h4>
      <p>Timeout ছাড়া একটি হ্যাং হওয়া downstream কল অ্যাপ্লিকেশনের worker/connection pool দখল করে রাখতে পারে — একের পর এক এমন রিকোয়েস্ট এলে পুরো সার্ভার resource exhaustion-এ পড়ে যায় (Circuit Breaker প্যাটার্নের একটি প্রাথমিক প্রতিরক্ষা স্তর হিসেবে timeout কাজ করে)।</p>
      <h4>Route-নির্দিষ্ট টাইমআউট</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@UseInterceptors(new TimeoutInterceptor(10000))   // এই রুটে ১০ সেকেন্ড অনুমতি
@Get('reports/heavy')
generateHeavyReport() { ... }</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Timeout হয়ে গেলেও যদি ডাটাবেজ অপারেশন ব্যাকগ্রাউন্ডে চলতেই থাকে, এই "orphaned" অপারেশন কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "nest-20",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["NestJS","Authorization","ABAC","Senior"],
    question: "NestJS-এ Attribute-Based Access Control (ABAC) কীভাবে Role-Based Access Control (RBAC) থেকে আলাদা এবং কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p><strong>RBAC</strong>-এ অনুমতি নির্ধারিত হয় ইউজারের <em>role</em> দিয়ে ("admin সব দেখতে পারে")। <strong>ABAC</strong>-এ অনুমতি নির্ধারিত হয় একাধিক <em>attribute</em>-এর সমন্বয়ে (ইউজারের বৈশিষ্ট্য + রিসোর্সের বৈশিষ্ট্য + প্রসঙ্গ) — অনেক বেশি নমনীয়, কিন্তু জটিল।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// RBAC — সরল, কিন্তু নির্দিষ্ট নিয়ম প্রকাশ করতে পারে না
@Roles('editor')
@Delete('posts/:id')
deletePost() { ... }
// "editor" role থাকলেই যেকোনো পোস্ট মুছতে পারবে — নিজের পোস্ট কিনা তা যাচাই করে না

// ABAC — একাধিক attribute একসাথে বিবেচনা করে সূক্ষ্ম নিয়ম প্রকাশ করা যায়
@Injectable()
export class PostOwnershipGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const post = await this.postService.findById(req.params.id);
    return (
      req.user.role === 'admin' ||                          // attribute ১: role
      (post.authorId === req.user.id && post.status !== 'published')  // attribute ২,৩: মালিকানা + অবস্থা
    );
  }
}</code></pre>
      </div>
      <h4>কখন ABAC প্রয়োজন — RBAC-এর সীমাবদ্ধতা</h4>
      <p>RBAC সহজ কিন্তু "নিজের রিসোর্স হলেই শুধু এডিট করতে পারবে" বা "অফিস আওয়ারের মধ্যেই অ্যাক্সেস" এর মতো প্রসঙ্গ-নির্ভর নিয়ম প্রকাশ করতে পারে না — এই ধরনের নিয়মের জন্য role ছাড়াও resource ownership, resource state, সময়, IP ইত্যাদি বিবেচনা করতে হয়, যা ABAC-এর মূল শক্তি।</p>
      <h4>সিনিয়র-স্তরের বিবেচনা</h4>
      <p>ABAC সম্পূর্ণভাবে সব জায়গায় প্রয়োগ করলে অথরাইজেশন লজিক জটিল ও পরীক্ষা করা কঠিন হয়ে যায়। বাস্তব অ্যাপে প্রায়ই <strong>hybrid পদ্ধতি</strong> ব্যবহৃত হয় — সাধারণ অনুমতির জন্য RBAC (route-level Guard), এবং সূক্ষ্ম ownership/context-নির্ভর নিয়মের জন্য নির্দিষ্ট resource-level Guard।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CASL-এর মতো লাইব্রেরি কীভাবে NestJS-এ ABAC নিয়মগুলো ঘোষণামূলকভাবে (declaratively) ম্যানেজ করতে সাহায্য করে?</li>
      </ul>
    `
  },
  {
    id: "nest-21",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["NestJS","Validation","class-validator","Senior"],
    question: "NestJS-এ Custom Validation Decorator (@ValidatorConstraint) দিয়ে একটি ইউনিক বিজনেস নিয়ম কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p>class-validator-এর বিল্ট-ইন ডেকোরেটর (<code>@IsEmail</code>, <code>@Min</code>) সাধারণ ভ্যালিডেশনের জন্য যথেষ্ট, কিন্তু বিজনেস-নির্দিষ্ট নিয়ম (যেমন "ইমেইল ডাটাবেজে ইতিমধ্যে আছে কিনা") যাচাই করতে <strong>Custom Validator</strong> লিখতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    return !user;   // ইউজার না পেলে valid (true)
  }

  defaultMessage(): string {
    return 'এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}

// DTO-তে ব্যবহার — সম্পূর্ণ বিল্ট-ইন ডেকোরেটরের মতোই ব্যবহারযোগ্য
export class CreateUserDto {
  @IsEmail()
  @IsEmailUnique()
  email: string;
}</code></pre>
      </div>
      <h4>Dependency Injection-এর সুবিধা — কেন @Injectable()</h4>
      <p>Custom validator ক্লাসকে <code>@Injectable()</code> করার ফলে এতে <code>UserService</code>-এর মতো অন্য সার্ভিস inject করা যায় — অর্থাৎ ভ্যালিডেশনের ভেতরে ডাটাবেজ কোয়েরি চালানো সম্ভব হয়, যা static/standalone validation function দিয়ে সরাসরি করা যেত না।</p>
      <p><strong>সেটআপে গুরুত্বপূর্ণ:</strong> AppModule-এ <code>ValidationPipe</code> কনফিগার করার সময় <code>useContainer(app.select(AppModule), { fallbackOnErrors: true })</code> কল করতে হয়, যাতে class-validator NestJS-এর DI container ব্যবহার করতে পারে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একই সময়ে একাধিক ফিল্ড (যেমন password ও confirmPassword) একসাথে যাচাই করতে হলে কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "nest-22",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["NestJS","Error Handling","Reliability","Senior"],
    question: "NestJS-এ Unhandled Promise Rejection ও Uncaught Exception কীভাবে প্রসেস-লেভেলে গ্লোবালভাবে ধরবেন?",
    answer: `
      <p>Exception Filter শুধু HTTP রিকোয়েস্ট-রেসপন্স সাইকেলের মধ্যেকার এরর ধরে — কিন্তু ব্যাকগ্রাউন্ড টাস্ক, cron job, বা event handler-এ থ্রো হওয়া এরর Exception Filter-এর নাগালের বাইরে থাকে। এগুলো Node.js প্রসেস-লেভেল ইভেন্ট দিয়ে ধরতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// main.ts — অ্যাপ্লিকেশন bootstrap-এর বাইরে, প্রসেস-লেভেলে
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection:', reason);
  // সতর্কতা পাঠানো (Sentry/Slack alert), কিন্তু প্রসেস বন্ধ না করা
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // ⚠️ এখানে প্রসেসের অবস্থা অনির্ভরযোগ্য হয়ে যেতে পারে —
  // graceful shutdown শুরু করে প্রসেস exit করাই নিরাপদ (PM2/K8s নতুন instance চালু করবে)
  process.exit(1);
});</code></pre>
      </div>
      <h4>কেন uncaughtException-এর পর process.exit() করা উচিত — সিনিয়র-স্তরের নীতি</h4>
      <p>একটি <code>uncaughtException</code>-এর অর্থ কোডে এমন কিছু ঘটেছে যা প্রোগ্রামার আশাই করেননি — অ্যাপ্লিকেশনের ইন-মেমরি state তখন থেকে <strong>অবিশ্বাস্য (untrustworthy)</strong> হয়ে যেতে পারে (আংশিক আপডেট হওয়া ভ্যারিয়েবল, ভাঙা কানেকশন)। এই অবস্থায় প্রসেস চালিয়ে যাওয়া আরও গুরুতর, চুপচাপ ডেটা করাপশনের ঝুঁকি তৈরি করে। তাই Node.js কমিউনিটির প্রমিত অভ্যাস: লগ করে, সতর্কতা পাঠিয়ে, তারপর প্রসেস বন্ধ করে দেওয়া — orchestrator (PM2, Kubernetes) স্বয়ংক্রিয়ভাবে একটি নতুন সুস্থ instance চালু করবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>NestJS-এর গ্লোবাল Exception Filter ও এই process-level handler-এর দায়িত্বের সীমারেখা কোথায়?</li>
      </ul>
    `
  },
  {
    id: "nest-23",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Microservices","Transports","TCP/Redis/Kafka"],
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
    tags: ["NestJS","Dependency Injection","Modules","Senior"],
    question: "NestJS-এ Circular Dependency (forwardRef) কীভাবে ঘটে এবং কীভাবে সমাধান করবেন?",
    answer: `
      <p><strong>Circular Dependency</strong> ঘটে যখন দুটি মডিউল/সার্ভিস একে অপরকে সরাসরি বা পরোক্ষভাবে ইমপোর্ট/inject করে — NestJS-এর DI container এই চক্র resolve করতে না পেরে রানটাইমে এরর দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ UserService ও OrderService একে অপরের উপর নির্ভরশীল
@Injectable()
export class UserService {
  constructor(private orderService: OrderService) {}   // OrderService দরকার
}
@Injectable()
export class OrderService {
  constructor(private userService: UserService) {}      // UserService দরকার — চক্র!
}
// Error: Nest can't resolve dependencies... circular dependency detected</code></pre>
      </div>
      <h4>সমাধান — forwardRef()</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}
}

// মডিউল লেভেলেও যদি circular import থাকে
@Module({
  imports: [forwardRef(() => OrderModule)],
})
export class UserModule {}</code></pre>
      </div>
      <p><code>forwardRef()</code> NestJS-কে বলে দেয় "এই ডিপেন্ডেন্সি এখনই resolve কোরো না, একটি reference রাখো, পরে (যখন উভয় ক্লাস সংজ্ঞায়িত হয়ে গেছে) resolve করো" — এভাবে module initialization-এর সময়কার chicken-and-egg সমস্যা এড়ানো যায়।</p>
      <h4>সিনিয়র-স্তরের নির্দেশনা — Circular Dependency এড়ানোই সেরা সমাধান</h4>
      <p><code>forwardRef()</code> একটি workaround, প্রকৃত সমাধান নয়। Circular dependency প্রায়ই একটি <strong>ডিজাইন সমস্যার লক্ষণ</strong> — দুটি সার্ভিস একে অপরের উপর নির্ভরশীল হওয়া মানে তাদের দায়িত্ব সীমা স্পষ্ট নয়। ভালো সমাধান:</p>
      <ul>
        <li><strong>Event-driven decoupling:</strong> সরাসরি একে অপরকে কল না করে <code>EventEmitter</code>-এর মাধ্যমে যোগাযোগ করা।</li>
        <li><strong>শেয়ার্ড লজিক আলাদা সার্ভিসে বের করা:</strong> যে কমন লজিকের জন্য দুই সার্ভিস একে অপরকে দরকার, সেটি একটি তৃতীয় (shared) সার্ভিসে সরিয়ে উভয়েই সেটির উপর নির্ভর করা — চক্র ভেঙে যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Circular dependency মডিউল-লেভেলে vs প্রোভাইডার-লেভেলে হলে সমাধান কীভাবে ভিন্ন হয়?</li>
      </ul>
    `
  },
  {
    id: "nest-25",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["CQRS","CommandBus","QueryBus"],
    question: "NestJS-এ @nestjs/cqrs প্যাকেজ দিয়ে CQRS Pattern (Command, Query, Event Handlers) কীভাবে ইমপ্লিমেন্ট করবেন?",
    answer: `
      <p><strong>CQRS</strong> (Command Query Responsibility Segregation) মানে read (query) ও write (command) অপারেশনকে সম্পূর্ণ আলাদা পথে পরিচালনা করা — <code>@nestjs/cqrs</code> প্যাকেজ NestJS-এ এই প্যাটার্ন কাঠামোগতভাবে বাস্তবায়ন করতে সাহায্য করে।</p>
      <h4>কেন Command ও Query আলাদা করা — মূল ধারণা</h4>
      <p>ঐতিহ্যবাহী CRUD সার্ভিসে একই মডেল read ও write উভয়ের জন্য ব্যবহৃত হয়। জটিল ডোমেইনে এটি সমস্যা তৈরি করে — write-এর জন্য কড়া বিজনেস নিয়ম ও validation দরকার, কিন্তু read-এর জন্য দরকার দ্রুত, ফ্ল্যাট, UI-উপযোগী ডেটা shape। CQRS এই দুই প্রয়োজনকে আলাদা করে অপ্টিমাইজ করার সুযোগ দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Command — একটি নির্দিষ্ট ইনটেন্ট, ডেটা বদলায়
export class CreateOrderCommand {
  constructor(public readonly userId: string, public readonly items: OrderItem[]) {}
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private repo: OrderRepository, private eventBus: EventBus) {}

  async execute(command: CreateOrderCommand) {
    const order = Order.create(command.userId, command.items);   // ডোমেইন লজিক/validation
    await this.repo.save(order);
    this.eventBus.publish(new OrderCreatedEvent(order.id));       // side effect ইভেন্টে
    return order.id;
  }
}

// Query — শুধু ডেটা পড়ে, কোনো side effect নেই
export class GetOrderSummaryQuery {
  constructor(public readonly orderId: string) {}
}

@QueryHandler(GetOrderSummaryQuery)
export class GetOrderSummaryHandler implements IQueryHandler<GetOrderSummaryQuery> {
  constructor(private readModel: OrderReadRepository) {}
  async execute(query: GetOrderSummaryQuery) {
    return this.readModel.findFlatSummary(query.orderId);  // অপ্টিমাইজড read-only ভিউ
  }
}

// Controller — কমান্ড/কোয়েরি বাসে dispatch করে
@Controller('orders')
export class OrderController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(dto.userId, dto.items));
  }

  @Get(':id')
  getSummary(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderSummaryQuery(id));
  }
}</code></pre>
      </div>
      <h4>Event Handler — Side Effect ম্যানেজমেন্ট</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(private emailService: EmailService) {}
  handle(event: OrderCreatedEvent) {
    this.emailService.sendConfirmation(event.orderId);  // কমান্ড হ্যান্ডলার থেকে সম্পূর্ণ decoupled
  }
}</code></pre>
      </div>
      <p>Command handler নিজে ইমেইল পাঠানো/নোটিফিকেশনের কোড লেখে না — শুধু ইভেন্ট পাবলিশ করে। এটি single responsibility বজায় রাখে এবং একাধিক Event Handler একই ইভেন্টে প্রতিক্রিয়া জানাতে পারে, একে অপরের সম্পর্কে না জেনেই।</p>
      <h4>কখন CQRS ব্যবহার করবেন — এবং কখন নয়</h4>
      <table>
        <tr><th>উপযুক্ত</th><th>অনুপযুক্ত</th></tr>
        <tr><td>জটিল ডোমেইন লজিক (e-commerce, ব্যাংকিং)</td><td>সাধারণ CRUD অ্যাপ</td></tr>
        <tr><td>Read ও Write-এর স্কেলিং প্রয়োজন আলাদা</td><td>ছোট টিম, দ্রুত ডেভেলপমেন্ট প্রয়োজন</td></tr>
        <tr><td>Event-driven আর্কিটেকচারের অংশ</td><td>Read model sync করার infrastructure নেই</td></tr>
      </table>
      <p><strong>সিনিয়র-স্তরের সতর্কতা:</strong> CQRS অনেক বেশি boilerplate যোগ করে (আলাদা Command, Query, Handler, Event ক্লাস) — একটি সাধারণ CRUD এন্ডপয়েন্টে এই জটিলতা চাপিয়ে দেওয়া over-engineering। শুধু তখনই ব্যবহার করুন যখন read/write আলাদা করার প্রকৃত সুবিধা আছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CQRS-এর সাথে Event Sourcing-এর সম্পর্ক কী — একটি ছাড়া অন্যটি ব্যবহার করা যায়?</li>
        <li>Read model কীভাবে write model থেকে sync থাকে — eventual consistency-এর প্রভাব কী?</li>
      </ul>
    `
  },
  {
    id: "nest-26",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Event Emitter","Decoupling","Events"],
    question: "NestJS-এ @nestjs/event-emitter দিয়ে ইন-প্রসেস ইভেন্ট ড্রাইভেন আর্কিটেকচার কীভাবে তৈরি করবেন?",
    answer: `
      <p><code>@nestjs/event-emitter</code> একটি অ্যাপ্লিকেশনের মধ্যেই (in-process) ইভেন্ট-ড্রিভেন যোগাযোগ সম্ভব করে — একটি মডিউল ইভেন্ট emit করে, অন্য মডিউল সেটি শোনে, কোনো সরাসরি dependency ছাড়াই।</p>
      <h4>সমস্যা যা এটি সমাধান করে — Tight Coupling</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Tightly coupled — OrderService সরাসরি সব dependent সার্ভিস জানে
@Injectable()
export class OrderService {
  constructor(
    private emailService: EmailService,
    private inventoryService: InventoryService,
    private analyticsService: AnalyticsService,
    private loyaltyService: LoyaltyService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await this.repo.save(dto);
    // নতুন ফিচার যোগ হলে এখানে আরও একটি লাইন যোগ করতে হয় — OrderService বাড়তেই থাকে
    await this.emailService.sendConfirmation(order);
    await this.inventoryService.reserveStock(order);
    await this.analyticsService.track(order);
    await this.loyaltyService.addPoints(order);
    return order;
  }
}</code></pre>
      </div>
      <h4>Event Emitter দিয়ে Decoupled সমাধান</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// AppModule-এ সেটআপ
@Module({ imports: [EventEmitterModule.forRoot()] })
export class AppModule {}

// ✅ OrderService শুধু ইভেন্ট emit করে — কে শুনছে জানে না, জানারও দরকার নেই
@Injectable()
export class OrderService {
  constructor(private eventEmitter: EventEmitter2, private repo: OrderRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await this.repo.save(dto);
    this.eventEmitter.emit('order.created', new OrderCreatedEvent(order));
    return order;   // OrderService-এর দায়িত্ব এখানেই শেষ
  }
}

// প্রতিটি সার্ভিস স্বাধীনভাবে ইভেন্ট শোনে — একে অপরের সম্পর্কে জানে না
@Injectable()
export class EmailListener {
  @OnEvent('order.created')
  handleOrderCreated(event: OrderCreatedEvent) {
    this.emailService.sendConfirmation(event.order);
  }
}

@Injectable()
export class LoyaltyListener {
  @OnEvent('order.created')
  addPoints(event: OrderCreatedEvent) {
    this.loyaltyService.addPoints(event.order);
  }
}
// নতুন ফিচার (যেমন AnalyticsListener) যোগ করতে OrderService-এ কোনো পরিবর্তন লাগে না — Open/Closed নীতি</code></pre>
      </div>
      <h4>Synchronous বনাম Asynchronous ইভেন্ট</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>this.eventEmitter.emit('order.created', event);          // fire-and-forget, listener error caller-কে প্রভাবিত করে না
await this.eventEmitter.emitAsync('order.created', event); // সব async listener শেষ হওয়া পর্যন্ত অপেক্ষা করে

@OnEvent('order.created', { async: true })   // এই listener asynchronously চলবে
handleOrderCreated(event) { ... }</code></pre>
      </div>
      <h4>সীমাবদ্ধতা — কেন এটি মেসেজ ব্রোকার নয়</h4>
      <p><code>@nestjs/event-emitter</code> শুধুই <strong>একই প্রসেসের মধ্যে (in-memory)</strong> কাজ করে — Node.js-এর <code>EventEmitter</code>-এর উপর তৈরি। এটি:</p>
      <ul>
        <li><strong>Durable নয়</strong> — প্রসেস ক্র্যাশ করলে বা রিস্টার্ট হলে সব pending ইভেন্ট হারিয়ে যায়, কোনো persistence নেই।</li>
        <li><strong>একাধিক সার্ভিস/প্রসেস জুড়ে কাজ করে না</strong> — একই অ্যাপ্লিকেশন প্রসেসের মধ্যেই সীমাবদ্ধ। একাধিক মাইক্রোসার্ভিসের মধ্যে যোগাযোগের জন্য RabbitMQ/Kafka দরকার।</li>
        <li><strong>Retry/dead-letter mechanism নেই</strong> — একটি listener ব্যর্থ হলে সেই ইভেন্ট আবার চেষ্টা করার কোনো বিল্ট-ইন উপায় নেই।</li>
      </ul>
      <p><strong>ব্যবহারিক নির্দেশনা:</strong> একই সার্ভিসের মধ্যে মডিউলগুলোকে decouple করতে event-emitter উপযুক্ত (যেমন একটি মনোলিথের ভেতরে)। ক্রস-সার্ভিস যোগাযোগ বা মেসেজ হারানো সহনীয় নয় এমন ক্ষেত্রে external message broker প্রয়োজন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি listener এরর থ্রো করলে অন্য listener-গুলোর কী হয়?</li>
        <li>@nestjs/cqrs-এর EventBus ও @nestjs/event-emitter-এর মধ্যে পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "nest-27",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["NestJS","Providers","Async","Senior"],
    question: "NestJS-এ Async Provider (useFactory with async/await) কীভাবে কনফিগারেশন লোড হওয়ার আগে Bootstrap অপেক্ষা করায়?",
    answer: `
      <p>কিছু প্রোভাইডার তৈরি করতে asynchronous কাজ প্রয়োজন হয় (ডাটাবেজ কানেকশন স্থাপন, remote configuration fetch করা, secret manager থেকে ক্রেডেনশিয়াল আনা) — <strong>Async Provider</strong> ব্যবহার করে NestJS নিশ্চিত করে এই কাজ শেষ না হওয়া পর্যন্ত অ্যাপ্লিকেশন bootstrap সম্পূর্ণ হবে না।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const connection = await createConnection({
          host: configService.get('DB_HOST'),
          password: await secretManager.getSecret('db-password'),  // async কাজ
        });
        return connection;   // resolve না হওয়া পর্যন্ত bootstrap অপেক্ষা করবে
      },
      inject: [ConfigService],
    },
  ],
})
export class DatabaseModule {}</code></pre>
      </div>
      <h4>কেন গুরুত্বপূর্ণ — Race Condition প্রতিরোধ</h4>
      <p>যদি প্রোভাইডার তৈরি synchronous হতো কিন্তু ভেতরে async কাজ ব্যাকগ্রাউন্ডে (fire-and-forget) চলত, তাহলে অ্যাপ্লিকেশন সম্পূর্ণ প্রস্তুত হওয়ার আগেই রিকোয়েস্ট আসতে পারত — একটি রিকোয়েস্ট হ্যান্ডলার ডাটাবেজ কানেকশন ব্যবহার করার চেষ্টা করত যা তখনও তৈরি হয়নি। <code>useFactory</code>-তে <code>async</code>/<code>await</code> ব্যবহার করলে NestJS DI container প্রতিটি নির্ভরশীল প্রোভাইডারের জন্য <strong>Promise resolve হওয়া পর্যন্ত অপেক্ষা করে</strong>, তারপরই bootstrap এগিয়ে যায়।</p>
      <h4>App Bootstrap-এ Async প্রোভাইডারের প্রভাব</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // এই লাইনে পৌঁছানোর আগেই সব async provider resolve হয়ে গেছে —
  // অর্থাৎ app.listen() কল হওয়ার সময় ডাটাবেজ কানেকশন নিশ্চিতভাবে প্রস্তুত
  await app.listen(3000);
}</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি async provider ব্যর্থ হলে (যেমন ডাটাবেজ কানেক্ট করতে না পারলে) পুরো অ্যাপ্লিকেশন bootstrap-এর কী হয়?</li>
      </ul>
    `
  },
  {
    id: "nest-28",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Middleware","Express Middleware","NestMiddleware"],
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
    tags: ["Database","TypeORM","Prisma"],
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
    tags: ["Config","ConfigModule","Joi"],
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
    tags: ["Caching","CacheModule","Redis"],
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
    tags: ["NestJS","Testing","Testcontainers","Senior"],
    question: "NestJS Integration Testing-এ Testcontainers দিয়ে বাস্তব ডাটাবেজ কীভাবে ব্যবহার করবেন (Mock না করে)?",
    answer: `
      <p>ইউনিট টেস্টে repository/service mock করা যথেষ্ট, কিন্তু <strong>integration test</strong>-এ প্রকৃত ডাটাবেজ আচরণ (constraint, transaction, query সিনট্যাক্স) যাচাই করা জরুরি — <strong>Testcontainers</strong> লাইব্রেরি প্রতিটি টেস্ট রানে একটি ডিসপোজেবল Docker কন্টেইনার (PostgreSQL/MongoDB) স্পিন আপ করে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { PostgreSqlContainer } from '@testcontainers/postgresql';

describe('OrderService (Integration)', () => {
  let container: StartedPostgreSqlContainer;
  let app: TestingModule;

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:16').start();

    app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: container.getHost(),
          port: container.getPort(),
          database: container.getDatabase(),
          username: container.getUsername(),
          password: container.getPassword(),
          entities: [Order],
          synchronize: true,   // টেস্টেই শুধু — প্রোডাকশনে কখনও না
        }),
        OrderModule,
      ],
    }).compile();
  }, 30000);   // কন্টেইনার চালু হতে সময় লাগে, timeout বাড়াতে হয়

  afterAll(async () => {
    await app.close();
    await container.stop();   // টেস্ট শেষে কন্টেইনার সম্পূর্ণ ধ্বংস — কোনো leftover state নেই
  });

  it('persists an order with real constraint checks', async () => {
    const orderService = app.get(OrderService);
    const order = await orderService.create({ userId: 1, total: 500 });
    expect(order.id).toBeDefined();
  });
});</code></pre>
      </div>
      <h4>কেন Mock-এর চেয়ে ভালো — Fidelity বনাম Speed</h4>
      <table>
        <tr><th></th><th>Mock Repository</th><th>Testcontainers</th></tr>
        <tr><td><strong>গতি</strong></td><td>দ্রুত (in-memory)</td><td>ধীর (Docker কন্টেইনার চালু হতে সময় লাগে)</td></tr>
        <tr><td><strong>বাস্তবতা</strong></td><td>কম — DB constraint/query সিনট্যাক্স যাচাই হয় না</td><td>বেশি — প্রকৃত ডাটাবেজ আচরণ পরীক্ষিত হয়</td></tr>
        <tr><td><strong>CI/CD-তে</strong></td><td>সহজ</td><td>Docker সাপোর্ট প্রয়োজন, তবে GitHub Actions-এ সহজেই চলে</td></tr>
      </table>
      <p>প্রতিটি টেস্ট রান একটি সম্পূর্ণ ফ্রেশ কন্টেইনারে চলে বলে <strong>টেস্ট আইসোলেশন গ্যারান্টিড</strong> — একটি টেস্টের ডেটা আরেকটি টেস্টকে প্রভাবিত করতে পারে না, যা shared test database ব্যবহার করলে প্রায়ই সমস্যা তৈরি করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CI pipeline-এ প্রতিটি টেস্ট স্যুটে নতুন কন্টেইনার চালু করা ধীর হয়ে গেলে কীভাবে অপ্টিমাইজ করবেন?</li>
      </ul>
    `
  },
  {
    id: "nest-33",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Security","Passport","JWT"],
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
    tags: ["WebSockets","Socket.io","Adapters"],
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
    tags: ["GraphQL","Resolvers","DataLoader"],
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
    tags: ["OpenAPI","Swagger","Cli Plugin"],
    question: "NestJS Swagger CLI Plugin (@nestjs/swagger/plugin) কীভাবে অটো-DTO ইনস্পেকশন করে?",
    answer: `
      <p>NestJS Swagger CLI Plugin (<code>@nestjs/swagger/plugin</code>) একটি কম্পাইল-টাইম TypeScript ট্রান্সফর্মার যা DTO ক্লাস থেকে স্বয়ংক্রিয়ভাবে Swagger/OpenAPI ডকুমেন্টেশন তৈরি করে — ম্যানুয়ালি প্রতিটি প্রপার্টিতে <code>@ApiProperty()</code> ডেকোরেটর লেখার প্রয়োজন ছাড়াই।</p>
      <h4>সমস্যা — ম্যানুয়াল ডেকোরেটরের পুনরাবৃত্তি</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Plugin ছাড়া — টাইপ তথ্য ও ডকুমেন্টেশন তথ্য দুইবার লিখতে হয়
export class CreateUserDto {
  @ApiProperty({ example: 'Rahim', description: 'ইউজারের নাম' })
  name: string;

  @ApiProperty({ example: 25, required: false })
  age?: number;

  @ApiProperty({ type: [String] })
  roles: string[];
}
// প্রতিটি প্রপার্টিতে টাইপ (already TypeScript-এ আছে) আবার ম্যানুয়ালি লিখতে হচ্ছে</code></pre>
      </div>
      <h4>Plugin কীভাবে কাজ করে — Compile-Time AST বিশ্লেষণ</h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// nest-cli.json
{
  "compilerOptions": {
    "plugins": ["@nestjs/swagger/plugin"]
  }
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ Plugin সহ — শুধু TypeScript টাইপ লিখলেই যথেষ্ট
export class CreateUserDto {
  name: string;         // Plugin স্বয়ংক্রিয়ভাবে @ApiProperty({ type: String }) যোগ করে
  age?: number;         // optional (?) দেখে required: false বুঝে নেয়
  roles: string[];      // অ্যারে টাইপ স্বয়ংক্রিয়ভাবে সনাক্ত করে
}</code></pre>
      </div>
      <p>Plugin কম্পাইলেশনের সময় TypeScript-এর <strong>AST (Abstract Syntax Tree)</strong> বিশ্লেষণ করে — প্রতিটি ক্লাস প্রপার্টির টাইপ, optional চিহ্ন (<code>?</code>), এবং JSDoc কমেন্ট পড়ে নিজে থেকেই <code>@ApiProperty()</code> ডেকোরেটর ইনজেক্ট করে দেয় compiled আউটপুটে। এটি একটি <strong>TypeScript Transformer</strong> — সাধারণ ডেকোরেটরের মতো রানটাইমে নয়, বরং কম্পাইল টাইমে কোড পরিবর্তন করে।</p>
      <h4>যা এটি স্বয়ংক্রিয়ভাবে সনাক্ত করে</h4>
      <ul>
        <li><strong>প্রপার্টি টাইপ:</strong> <code>string</code>, <code>number</code>, <code>boolean</code>, অ্যারে, enum, nested DTO ক্লাস।</li>
        <li><strong>Required/Optional:</strong> <code>?</code> চিহ্ন দেখে।</li>
        <li><strong>class-validator ডেকোরেটর থেকে অতিরিক্ত তথ্য:</strong> <code>@Min()</code>, <code>@Max()</code>, <code>@IsEmail()</code> থাকলে Swagger স্কিমাতেও সংশ্লিষ্ট constraint যোগ হয়।</li>
        <li><strong>JSDoc কমেন্ট:</strong> প্রপার্টির উপরে লেখা কমেন্ট <code>description</code> হিসেবে ব্যবহৃত হয়।</li>
      </ul>
      <h4>কখন ম্যানুয়াল @ApiProperty() এখনও দরকার</h4>
      <p>Plugin বেশিরভাগ সাধারণ ক্ষেত্রে যথেষ্ট, কিন্তু <code>example</code> ভ্যালু, জটিল <code>oneOf</code>/<code>anyOf</code> স্কিমা, বা কাস্টম ডকুমেন্টেশন বিবরণের জন্য এখনও ম্যানুয়াল ডেকোরেটর ব্যবহার করা যায় — Plugin ও ম্যানুয়াল ডেকোরেটর একসাথে কাজ করে, ম্যানুয়াল যা স্পষ্টভাবে দেওয়া আছে তা override হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Plugin কনফিগারেশনে <code>introspectComments: true</code> অপশন কী করে?</li>
        <li>Monorepo-তে একাধিক অ্যাপে এই plugin কীভাবে শেয়ার করবেন?</li>
      </ul>
    `
  },
  {
    id: "nest-37",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Architecture","Domain Driven Design","DDD"],
    question: "NestJS-এ Domain-Driven Design (DDD) Architecture — Aggregates, Value Objects, Domain Events কীভাবে সংগঠিত করবেন?",
    answer: `
      <p><strong>Domain-Driven Design (DDD)</strong> একটি সফটওয়্যার ডিজাইন পদ্ধতি যেখানে কোডের কাঠামো সরাসরি বিজনেস ডোমেইনের ভাষা ও নিয়ম প্রতিফলিত করে — NestJS-এর মডুলার আর্কিটেকচার (মডিউল, ডিপেন্ডেন্সি ইনজেকশন) DDD বাস্তবায়নের জন্য স্বাভাবিকভাবেই উপযুক্ত।</p>
      <h4>মূল বিল্ডিং ব্লক</h4>
      <h4>১. Entity — পরিচয় (identity) দিয়ে সংজ্ঞায়িত</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Entity — একটি ইউনিক ID আছে, সময়ের সাথে পরিবর্তনশীল কিন্তু পরিচয় একই থাকে
export class Order {
  private constructor(
    private readonly id: OrderId,
    private status: OrderStatus,
    private items: OrderItem[],
  ) {}

  static create(userId: string, items: OrderItem[]): Order {
    if (!items.length) throw new DomainError('Order must have at least one item');
    return new Order(OrderId.generate(), OrderStatus.PENDING, items);
    // ডোমেইন নিয়ম কনস্ট্রাক্টরেই প্রয়োগ হচ্ছে — অবৈধ Order তৈরিই সম্ভব নয়
  }

  confirm(): void {
    if (this.status !== OrderStatus.PENDING)
      throw new DomainError('Only pending orders can be confirmed');
    this.status = OrderStatus.CONFIRMED;
  }
}</code></pre>
      </div>
      <h4>২. Value Object — পরিচয় ছাড়া, শুধু মান দিয়ে সমতা</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Value Object — immutable, দুটি Money সমান হলে মান দিয়েই সমান (ID নেই)
export class Money {
  private constructor(private readonly amount: number, private readonly currency: string) {
    if (amount < 0) throw new DomainError('Money cannot be negative');
  }
  static of(amount: number, currency: string): Money { return new Money(amount, currency); }

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new DomainError('Currency mismatch');
    return Money.of(this.amount + other.amount, this.currency);
  }
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
// দুটি Money(100, 'BDT') সমান — যদিও দুটি ভিন্ন instance, কোনো ID নেই যা তুলনা করতে হবে</code></pre>
      </div>
      <h4>৩. Aggregate — সামঞ্জস্যতার সীমানা</h4>
      <p><strong>Aggregate</strong> একগুচ্ছ Entity ও Value Object যা একসাথে একটি লজিক্যাল ইউনিট গঠন করে এবং একটি একক <strong>Aggregate Root</strong>-এর মাধ্যমে সব পরিবর্তন হয়। উদাহরণে, <code>Order</code> হলো Aggregate Root, এবং <code>OrderItem</code>-গুলো শুধু <code>Order</code>-এর মাধ্যমেই পরিবর্তনযোগ্য — বাইরে থেকে সরাসরি একটি <code>OrderItem</code> পরিবর্তন করা যায় না। এটি নিশ্চিত করে যে সব বিজনেস নিয়ম (যেমন "confirmed অর্ডারে item যোগ করা যাবে না") একটি একক জায়গায় প্রয়োগ হয়।</p>
      <h4>৪. Domain Service — যে লজিক একক Entity-তে ফিট হয় না</h4>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// দুটি Aggregate-এর মধ্যে সমন্বয় প্রয়োজন এমন লজিক
@Injectable()
export class OrderTransferService {
  transferItems(source: Order, target: Order, itemIds: string[]) {
    // একটি একক Entity-এর দায়িত্ব নয়, তাই এখানে
  }
}</code></pre>
      </div>
      <h4>NestJS-এ DDD স্তর বিন্যাস</h4>
      <table>
        <tr><th>স্তর</th><th>দায়িত্ব</th><th>NestJS উপাদান</th></tr>
        <tr><td>Domain</td><td>Entity, Value Object, ডোমেইন নিয়ম</td><td>প্লেইন TypeScript ক্লাস (NestJS ডেকোরেটর ছাড়া)</td></tr>
        <tr><td>Application</td><td>Use case অর্কেস্ট্রেশন</td><td>Service (CQRS Command/Query Handler)</td></tr>
        <tr><td>Infrastructure</td><td>ডাটাবেজ, external API</td><td>Repository implementation</td></tr>
        <tr><td>Interface</td><td>HTTP, GraphQL এন্ট্রি পয়েন্ট</td><td>Controller</td></tr>
      </table>
      <h4>সিনিয়র-স্তরের সতর্কতা — কখন DDD এড়াবেন</h4>
      <p>DDD জটিল বিজনেস ডোমেইনে (ব্যাংকিং, ইনস্যুরেন্স, e-commerce অর্ডার লজিক) মূল্যবান — যেখানে নিয়ম জটিল ও পরিবর্তনশীল। কিন্তু সাধারণ CRUD অ্যাপে (blog, সাধারণ admin panel) এই কাঠামো প্রয়োজনের চেয়ে অনেক বেশি জটিলতা যোগ করে — <strong>ডোমেইনের প্রকৃত জটিলতার সাথে আর্কিটেকচারাল বিনিয়োগ মেলানো জরুরি</strong>।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Aggregate-এর সীমানা কীভাবে নির্ধারণ করবেন — কোন Entity একসাথে থাকবে?</li>
        <li>Repository pattern কীভাবে Domain স্তরকে Infrastructure থেকে আলাদা রাখে?</li>
      </ul>
    `
  },
  {
    id: "nest-38",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Health","Terminus","Kubernetes"],
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
    tags: ["NestJS","Performance","Dependency Injection","Senior"],
    question: "NestJS-এ REQUEST-scoped Provider-এর Performance Impact কীভাবে মাপবেন এবং কমাবেন?",
    answer: `
      <p>NestJS-এর ডিফল্ট provider scope <strong>Singleton</strong> — একটি instance পুরো অ্যাপ্লিকেশনের জীবনচক্রে একবারই তৈরি হয়। <code>REQUEST</code> scope ব্যবহার করলে প্রতিটি HTTP রিকোয়েস্টে একটি নতুন instance তৈরি হয় — এটি নমনীয় কিন্তু উল্লেখযোগ্য performance খরচ যোগ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  constructor(@Inject(REQUEST) private request: Request) {}
  getTenantId(): string { return this.request.headers['x-tenant-id'] as string; }
}
// প্রতিটি রিকোয়েস্টে নতুন TenantContextService instance তৈরি হয়</code></pre>
      </div>
      <h4>Performance খরচ — কেন এটি ব্যয়বহুল</h4>
      <p>একটি <code>REQUEST</code>-scoped প্রোভাইডার inject করা মানে — সেই প্রোভাইডারের উপর নির্ভরশীল <strong>পুরো dependency chain</strong> (Controller, তার Service, সেই Service-এর সব dependency) request-scoped হয়ে যায়। এর ফলে প্রতিটি রিকোয়েস্টে পুরো chain পুনরায় instantiate হয় — একটি singleton অ্যাপ্লিকেশনের তুলনায় উল্লেখযোগ্য CPU ও মেমরি ওভারহেড, উচ্চ-ট্রাফিক এন্ডপয়েন্টে যা measurable latency যোগ করতে পারে।</p>
      <h4>পরিমাপ — Benchmark করা</h4>
      <p>NestJS ডকুমেন্টেশন অনুযায়ী request-scoped provider ব্যবহারে থ্রুপুট উল্লেখযোগ্যভাবে কমতে পারে ভারী dependency tree-তে। প্রোডাকশনে সিদ্ধান্ত নেওয়ার আগে <code>autocannon</code>/<code>k6</code>-এর মতো লোড-টেস্টিং টুল দিয়ে request-scoped ও singleton ভার্সনের throughput তুলনা করে দেখা উচিত।</p>
      <h4>কমানোর কৌশল</h4>
      <ul>
        <li><strong>REQUEST scope এড়িয়ে চলুন যেখানে সম্ভব:</strong> tenant ID-এর মতো per-request ডেটা প্রায়ই একটি singleton service-এ প্যারামিটার হিসেবে পাস করা যায়, পুরো ক্লাস request-scoped না করেও।</li>
        <li><strong>শুধু যেখানে সত্যিই দরকার সেখানেই সীমাবদ্ধ রাখুন:</strong> পুরো অ্যাপ্লিকেশন request-scoped না করে, শুধু যে নির্দিষ্ট মডিউলে per-request context দরকার সেটিতেই সীমাবদ্ধ করুন — dependency chain যত ছোট রাখা যায়।</li>
        <li><strong>Durable Provider (NestJS 10+):</strong> multi-tenant অ্যাপ্লিকেশনে, প্রতিটি রিকোয়েস্টের বদলে প্রতিটি tenant-এর জন্য একটি instance cache করে খরচ কমানো যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Durable Provider কীভাবে REQUEST scope-এর খরচ ও multi-tenancy-এর নমনীয়তার মধ্যে ভারসাম্য আনে?</li>
      </ul>
    `
  },
  {
    id: "nest-40",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["Queues","BullMQ","Events"],
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
    tags: ["Rate Limiting","Throttler","ThrottlerGuard"],
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
    tags: ["CLI","Schematics","Generators"],
    question: "NestJS CLI Schematics (nest g resource) কীভাবে স্ট্যান্ডার্ড মডিউল স্কেফোল্ড করে?",
    answer: `
      <p>NestJS CLI Schematics (<code>nest generate</code> বা সংক্ষেপে <code>nest g</code>) হলো কোড জেনারেশন টেমপ্লেট যা প্রমিত, সামঞ্জস্যপূর্ণ ফাইল কাঠামো স্বয়ংক্রিয়ভাবে তৈরি করে — ম্যানুয়ালি প্রতিটি ফাইল হাতে লেখার পরিবর্তে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># একটি সম্পূর্ণ CRUD রিসোর্স তৈরি (module + controller + service + DTO + entity)
nest g resource orders

# ইন্টারঅ্যাক্টিভ প্রম্পট:
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes</code></pre>
      </div>
      <h4>যা স্বয়ংক্রিয়ভাবে তৈরি হয়</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>src/orders/
  orders.module.ts        ← মডিউল রেজিস্ট্রেশন, Controller ও Service ওয়্যার-আপ
  orders.controller.ts    ← GET/POST/PATCH/DELETE সব রুট স্টাব সহ
  orders.controller.spec.ts  ← ইউনিট টেস্ট স্কেলিটন
  orders.service.ts       ← CRUD মেথড স্টাব (create, findAll, findOne, update, remove)
  orders.service.spec.ts  ← সার্ভিস টেস্ট স্কেলিটন
  dto/
    create-order.dto.ts
    update-order.dto.ts   ← PartialType(CreateOrderDto) দিয়ে স্বয়ংক্রিয়ভাবে সব ফিল্ড optional
  entities/
    order.entity.ts</code></pre>
      </div>
      <h4>কেন এটি গুরুত্বপূর্ণ — শুধু সময় বাঁচানো নয়</h4>
      <ul>
        <li><strong>সামঞ্জস্যতা (consistency):</strong> টিমের প্রতিটি মেম্বার একই কাঠামো অনুসরণ করে — একজনের মডিউল আরেকজনের থেকে গঠনগতভাবে ভিন্ন হয় না, যা বড় কোডবেসে নেভিগেশন সহজ করে।</li>
        <li><strong>Boilerplate ভুল কমায়:</strong> মডিউল রেজিস্ট্রেশন (imports/providers/exports), ডেকোরেটর সিনট্যাক্স, ফাইল নামকরণ কনভেনশন — হাতে লিখলে ভুল হওয়ার সুযোগ থাকে, স্বয়ংক্রিয় জেনারেশনে থাকে না।</li>
        <li><strong>টেস্ট ফাইল থেকেই শুরু:</strong> <code>.spec.ts</code> ফাইল আগে থেকেই তৈরি থাকে — "টেস্ট পরে লিখব" এই অভ্যাস কম হয়, কারণ ফাইল ইতিমধ্যে বিদ্যমান।</li>
      </ul>
      <h4>ভেতরের প্রক্রিয়া — Schematics ইঞ্জিন</h4>
      <p>NestJS CLI Angular-এর <strong>Schematics</strong> ইঞ্জিন ব্যবহার করে — টেমপ্লেট ফাইল (<code>.ejs</code> এর মতো) ও ফাইল-অপারেশন রুলের একটি সেট, যা ইনপুট প্যারামিটার (রিসোর্স নাম, transport layer) অনুযায়ী কাস্টমাইজড কোড জেনারেট করে। এটি extensible — নিজস্ব কাস্টম schematic লিখে টিমের নির্দিষ্ট কনভেনশন (যেমন নিজস্ব DTO প্যাটার্ন) স্বয়ংক্রিয় করা সম্ভব।</p>
      <h4>প্রাসঙ্গিক অন্যান্য কমান্ড</h4>
      <table>
        <tr><th>কমান্ড</th><th>তৈরি করে</th></tr>
        <tr><td><code>nest g module orders</code></td><td>শুধু মডিউল</td></tr>
        <tr><td><code>nest g controller orders</code></td><td>শুধু কন্ট্রোলার + স্পেক</td></tr>
        <tr><td><code>nest g service orders</code></td><td>শুধু সার্ভিস + স্পেক</td></tr>
        <tr><td><code>nest g guard auth</code></td><td>Guard স্টাব</td></tr>
        <tr><td><code>nest g interceptor logging</code></td><td>Interceptor স্টাব</td></tr>
      </table>
      <h4>সিনিয়র-স্তরের বিবেচনা</h4>
      <p>জেনারেট করা কোড একটি <strong>শুরুর বিন্দু</strong>, চূড়ান্ত সমাধান নয় — DTO-তে validation ডেকোরেটর, service-এ প্রকৃত বিজনেস লজিক, controller-এ guard/pipe — এসব ম্যানুয়ালি যোগ করতে হয়। বড় টিমে নিজস্ব কাস্টম schematic তৈরি করে টিমের প্যাটার্ন (যেমন Repository ইনজেকশন, নির্দিষ্ট error handling) স্বয়ংক্রিয়ভাবে জেনারেট করা যায়, যা <code>nest g resource</code>-এর ডিফল্ট থেকে আরও দরকারি।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি কাস্টম Schematic কীভাবে তৈরি করবেন টিমের নিজস্ব কনভেনশনের জন্য?</li>
        <li>GraphQL transport layer বেছে নিলে জেনারেট করা কোড কীভাবে ভিন্ন হয়?</li>
      </ul>
    `
  },
  {
    id: "nest-43",
    category: "NestJS",
    difficulty: "Advanced",
    tags: ["Logging","Winston","LoggerService"],
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
    tags: ["Microservices","GRPC","Proto"],
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
    tags: ["Performance","Fastify","Express Adapter"],
    question: "NestJS Express Adapter বনাম Fastify Adapter-এর পারফরম্যান্স সুবিধা ও পরিবর্তন কী?",
    answer: `
      <p>NestJS ডিফল্টভাবে Express.js ব্যবহার করে, তবে পারফরম্যান্সের জন্য <strong>Fastify</strong> ব্যবহার করা যায়।</p>
      <ul>
        <li><strong>Fastify:</strong> এটি Express এর চেয়ে প্রায় ২ গুণ বেশি রিকোয়েস্ট পার সেকেন্ড (RPS) হ্যান্ডেল করতে পারে এবং কম মেমোরি খরচ করে।</li>
        <li><strong>পরিবর্তন:</strong> Fastify ব্যবহার করতে হলে <code>NestFactory.create&lt;NestFastifyApplication&gt;(AppModule, new FastifyAdapter())</code> ব্যবহার করতে হবে। Express-এর কিছু মিডলওয়্যার যেমন <code>body-parser</code> Fastify-তে ডিফল্টভাবে বিল্ট-ইন থাকে, তাই অনেক মিডলওয়্যার রিপ্লেস করতে হয়।</li>
      </ul>
    `
  },
  {
    id: "nest-46",
    category: "NestJS",
    difficulty: "Intermediate",
    tags: ["File Upload","FileInterceptor","Multer"],
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
    tags: ["Security","Helmet","CORS"],
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
    tags: ["Context","ExecutionContext","ArgumentsHost"],
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
    tags: ["Multi-tenancy","SaaS","Databases"],
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
    tags: ["Serialization","ClassSerializerInterceptor","Exclude"],
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
