const seniorBackendQuestions = [
  {
    id: "sr-1",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Scalability","High Traffic","Architecture"],
    question: "আপনার অ্যাপ্লিকেশনে হঠাৎ ১ সেকেন্ডে ১০,০০০ (10K) রিকোয়েস্ট এলে (Traffic Spike) আপনি কীভাবে হ্যান্ডেল করবেন?",
    answer: `
      <p>১০ হাজার রিকোয়েস্ট পার সেকেন্ড (RPS) হ্যান্ডেল করার জন্য একটি মাল্টি-লেয়ার্ড স্কেলিং স্ট্র্যাটেজি প্রয়োজন:</p>
      <ol>
        <li><strong>Load Balancing:</strong> একটি বা একাধিক Load Balancer (যেমন- Nginx, AWS ALB) ব্যবহার করে রিকোয়েস্টগুলো একাধিক অ্যাপ্লিকেশন সার্ভারের মধ্যে বিতরণ (Round-robin বা Least connections) করতে হবে।</li>
        <li><strong>Horizontal Scaling (Auto-scaling):</strong> সার্ভার ইনস্ট্যান্স সংখ্যা স্বয়ংক্রিয়ভাবে বাড়াতে হবে (Kubernetes HPA বা AWS Auto Scaling)।</li>
        <li><strong>Caching Layer (Redis/Memcached):</strong> ডাটাবেজে চাপ নামিয়ে আনতে Read-heavy ডাটা Redis-এ ক্যাশ করা। ৯০% রিকোয়েস্ট ক্যাশ থেকে সার্ভ করলে ডাটাবেজ সেফ থাকে।</li>
        <li><strong>Asynchronous Processing (Message Queue):</strong> যেসব কাজে সময় বেশি লাগে (যেমন- ইমেইল পাঠানো, রিপোর্ট জেনারেট করা) সেগুলো RabbitMQ বা Kafka-এর মাধ্যমে Background Job-এ পাঠিয়ে দেওয়া।</li>
        <li><strong>Database Optimization:</strong> Read Replicas ব্যবহার করে Read লোড ভাগ করা এবং Connection Pooling (PgBouncer) নিশ্চিত করা।</li>
        <li><strong>Rate Limiting & Throttling:</strong> অতিরিক্ত বা বট রিকোয়েস্ট আটকাতে API Gateway লেভেলে Rate Limiter ব্যবহার করা।</li>
      </ol>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Auto-scaling চালু হতে কয়েক মিনিট সময় লাগে — সেই gap-এর মধ্যে ট্রাফিক স্পাইক এলে কী করবেন?</li>
        <li>Rate limiter নিজেই bottleneck হয়ে যেতে পারে কি — কীভাবে distributed rate limiting স্কেল করবেন?</li>
      </ul>
    `
  },
  {
    id: "sr-2",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Idempotency","Reliability","API Design"],
    question: "API-তে Idempotency কী? Payment API-তে Idempotency Key কেন এবং কীভাবে ব্যবহার করবেন?",
    answer: `
      <p><strong>Idempotency</strong> হলো এমন একটি API ডিজাইন প্রিন্সিপল যেখানে একই রিকোয়েস্ট একাধিকবার পাঠালেও সার্ভারের স্টেট ঠিক একবারই পরিবর্তিত হবে।</p>
      <h4>কেন প্রয়োজন?</h4>
      <p>নেটওয়ার্ক টাইমআউট বা ক্লায়েন্ট এররের কারণে ইউজার যদি "Pay" বাটনে দুবার ক্লিক করে বা রিকোয়েস্ট রিট্রাই হয়, তবে ইউজারের অ্যাকাউন্ট থেকে দুবার টাকা কাটা উচিত নয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Client sends a unique UUID in the header
// POST /api/payments
// Headers: { "Idempotency-Key": "a1b2c3d4-e5f6" }

async function processPayment(req, res) {
  const idempotencyKey = req.headers['idempotency-key'];
  
  // 1. Check if key exists in Redis/DB
  const cachedResponse = await redis.get(\`idem:\${idempotencyKey}\`);
  if (cachedResponse) {
    return res.status(200).json(JSON.parse(cachedResponse)); // Return previous success
  }

  // 2. Process payment
  const result = await paymentGateway.charge(req.body);

  // 3. Save result with key (TTL 24 hours)
  await redis.set(\`idem:\${idempotencyKey}\`, JSON.stringify(result), 'EX', 86400);

  return res.status(201).json(result);
}</code></pre>
      </div>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Idempotency key কতক্ষণ সংরক্ষণ করে রাখা উচিত, এবং কোথায় (Redis/DB)?</li>
        <li>দুটি রিকোয়েস্ট একই idempotency key নিয়ে ঠিক একই সময়ে (concurrent) এলে কী হবে?</li>
      </ul>
    `
  },
  {
    id: "sr-3",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Concurrency","Distributed Lock","Redis"],
    question: "Race Condition কী? Distributed System-এ Ticket Booking (যেমন- ১টি সিট ২ জন বুক করতে চাইছে) কীভাবে আটকাবেন?",
    answer: `
      <p>যখন দুই বা ততোধিক ইউজার একই সময়ে একই রিসোর্স (যেমন- শেষ ১টি ফ্লাইট টিকিট) বুক করতে চায়, তখন Race Condition ঘটে। এটি সমাধানের জন্য <strong>Distributed Lock</strong> ব্যবহার করতে হয়।</p>
      <h4>Redis-ভিত্তিক Redlock Algorithm:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const redis = require('redis');
const client = redis.createClient();

async function bookTicket(userId, flightId) {
  const lockKey = \`lock:flight:\${flightId}\`;
  const lockTimeout = 10; // seconds
  
  // 1. Acquire Lock (SET NX = Only if not exists)
  const acquired = await client.set(lockKey, userId, 'NX', 'EX', lockTimeout);
  
  if (acquired === 'OK') {
    try {
      // 2. Check seat availability & Book ticket
      const seatAvailable = await checkAvailability(flightId);
      if (seatAvailable) {
        await confirmBooking(flightId, userId);
        return { success: true };
      }
      return { success: false, error: 'Sold out' };
    } finally {
      // 3. Release Lock (must verify owner before deleting)
      await client.del(lockKey);
    }
  } else {
    return { success: false, error: 'Someone else is booking. Try again.' };
  }
}</code></pre>
      </div>
    
      <h4>Distributed Lock দিয়ে সমাধান — সিকোয়েন্স</h4>
      <pre class="mermaid">
sequenceDiagram
    participant U1 as ইউজার A
    participant U2 as ইউজার B
    participant Redis as Redis (Lock)
    participant DB as Database

    U1->>Redis: SET lock:seat:42 NX EX 5
    Redis-->>U1: OK (লক অর্জিত)
    U2->>Redis: SET lock:seat:42 NX EX 5
    Redis-->>U2: nil (লক ব্যর্থ — ইতিমধ্যে ধরা আছে)
    U2-->>U2: "সিট আনভেইলেবল" দেখানো

    U1->>DB: সিট বুকিং করা (BEGIN...COMMIT)
    U1->>Redis: DEL lock:seat:42 (লক ছেড়ে দেওয়া)
      </pre>
      <span class="diagram-caption">Redis SETNX দিয়ে distributed lock — একই মুহূর্তে দুই ইউজার একই সিটের জন্য চেষ্টা করলে শুধু একজনই লক পায়</span>
      <p><strong>গুরুত্বপূর্ণ:</strong> লকের সাথে <code>EX</code> (expiry) সবসময় সেট করা আবশ্যক — নাহলে যে প্রসেস লক নিয়েছে সেটি ক্র্যাশ করলে লক চিরকাল আটকে থাকবে (deadlock), অন্য কোনো ইউজার কখনও বুক করতে পারবে না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis single instance ডাউন হলে distributed lock-এর কী হয় — Redlock অ্যালগরিদম কীভাবে এই ঝুঁকি কমায়?</li>
        <li>Pessimistic locking (<code>SELECT ... FOR UPDATE</code>) বনাম optimistic locking (version column) — কোনটি এই কেসে বেশি উপযুক্ত?</li>
      </ul>
    `
  },
  {
    id: "sr-4",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Caching","Cache Stampede","Performance"],
    question: "Cache Stampede (Thundering Herd) সমস্যা কী এবং এটি প্রতিরোধের উপায় কী?",
    answer: `
      <p>যখন ক্যাশে থাকা কোনো জনপ্রিয় ডাটার মেয়াদ (TTL) শেষ হয়ে যায়, তখন হাজার হাজার রিকোয়েস্ট একই সময়ে ক্যাশ মিস করে একসাথে ডাটাবেজে পাল্টা (Fallback) করে। এতে ডাটাবেজ সাথে সাথে ক্র্যাশ করে। একে <strong>Cache Stampede</strong> বলে।</p>
      <h4>সমাধান:</h4>
      <ol>
        <li><strong>Mutex Lock (Early Refresh):</strong> একটি রিকোয়েস্ট ডাটাবেজ থেকে ডাটা আনার জন্য Lock ধরে, বাকি রিকোয়েস্টগুলো অপেক্ষা করে বা পুরোনো ক্যাশ ডাটাই দেখায়।</li>
        <li><strong>XFetch Algorithm:</strong> TTL-এর বেশিরভাগ সময় শেষ হলে, ব্যাকগ্রাউন্ডে অল্প সম্ভাবনার (Probabilistic) ভিত্তিতে ক্যাশ রিফ্রেশ শুরু করা।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Mutex Lock based Cache Update
async function getDataWithMutex(key) {
  let data = await cache.get(key);
  if (data) return data;
  
  // Try to acquire lock
  const lockAcquired = await redis.set(\`lock:\${key}\`, '1', 'NX', 'EX', 5);
  
  if (lockAcquired) {
    // Fetch from DB and update cache
    data = await db.query(key);
    await cache.set(key, data, 'EX', 3600);
    await redis.del(\`lock:\${key}\`);
    return data;
  } else {
    // Wait for the other request to finish, or return stale data
    await sleep(100);
    return getDataWithMutex(key); 
  }
}</code></pre>
      </div>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Probabilistic early expiration কীভাবে cache stampede-এর ঝুঁকি কমায়?</li>
        <li>Stale-while-revalidate প্যাটার্ন কীভাবে এই সমস্যায় সাহায্য করে?</li>
      </ul>
    `
  },
  {
    id: "sr-5",
    category: "Design Patterns",
    difficulty: "Advanced",
    tags: ["Resilience","Circuit Breaker","Microservices"],
    question: "Microservices Architecture-এ Circuit Breaker Pattern কী এবং এটি কেন জরুরি?",
    answer: `
      <p>যখন একটি সার্ভিস (Service A) অন্য একটি সার্ভিসের (Service B) ওপর নির্ভরশীল, আর Service B ডাউন হয়ে গেলে Service A থেকে রিকোয়েস্ট টাইমআউট হতে থাকে। এতে Thread Pool বা কানেকশন শেষ হয়ে Service A-ও ক্র্যাশ করে (Cascade Failure)।</p>
      <h4>Circuit Breaker-এর ৩টি State:</h4>
      <ol>
        <li><strong>Closed (Normal):</strong> সব রিকোয়েস্ট স্বাভাবিকভাবে Service B-তে যায়।</li>
        <li><strong>Open (Tripped):</strong> যদি এরর রেট একটি থ্রেশহোল্ড (যেমন ৫০%) ছাড়িয়ে যায়, Circuit ব্রেক হয়। এরপর কোনো রিকোয়েস্ট Service B-তে যায় না, সাথে সাথে Fallback রেসপন্স বা Error ফেরত দেওয়া হয়।</li>
        <li><strong>Half-Open (Testing):</strong> কিছুক্ষণ পর কয়েকটি লিমিটেড রিকোয়েস্ট পাঠানো হয় দেখার জন্য Service B সেরেছে কি না। সফল হলে Circuit আবার Closed হয়।</li>
      </ol>
    
      <h4>Circuit Breaker-এর তিনটি অবস্থা</h4>
      <pre class="mermaid">
stateDiagram-v2
    [*] --> Closed
    Closed --> Open: ব্যর্থতার হার থ্রেশহোল্ড পার হলো
    Open --> HalfOpen: টাইমআউট শেষে (যেমন ৩০s)
    HalfOpen --> Closed: টেস্ট রিকোয়েস্ট সফল
    HalfOpen --> Open: টেস্ট রিকোয়েস্টও ব্যর্থ

    note right of Closed: স্বাভাবিক — সব রিকোয়েস্ট সার্ভিসে যায়
    note right of Open: ব্লক — সব রিকোয়েস্ট সাথে সাথে ব্যর্থ (fail fast)
    note right of HalfOpen: সতর্ক — সীমিত টেস্ট রিকোয়েস্ট পাঠানো হয়
      </pre>
      <span class="diagram-caption">Circuit Breaker স্টেট মেশিন — Closed → Open → Half-Open → Closed চক্র</span>
      <p>Open অবস্থায় থাকাকালীন রিকোয়েস্ট downstream সার্ভিসে পাঠানোই হয় না — সাথে সাথে একটি fallback response বা এরর দেওয়া হয়। এটি একটি <strong>ইতিমধ্যে ব্যর্থ সার্ভিসকে আরও রিকোয়েস্ট দিয়ে চাপ না দিয়ে</strong> তাকে সুস্থ হওয়ার সময় দেয় — এবং caller-কেও দ্রুত ব্যর্থতা জানিয়ে দেয়, টাইমআউটের জন্য অপেক্ষা করাতে হয় না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Circuit Breaker ও Retry pattern একসাথে ব্যবহার করলে কী সতর্কতা মাথায় রাখতে হয়?</li>
        <li>Half-Open অবস্থায় একসাথে কয়টি টেস্ট রিকোয়েস্ট পাঠানো উচিত এবং কেন?</li>
      </ul>
    `
  },
  {
    id: "sr-6",
    category: "Design Patterns",
    difficulty: "Intermediate",
    tags: ["Strategy Pattern","OOP","SOLID"],
    question: "Strategy Pattern কী? Payment Gateway integration-এ এটি কীভাবে ব্যবহার করবেন?",
    answer: `
      <p><strong>Strategy Pattern</strong> হলো এমন একটি Behavioral Design Pattern যা রানটাইমে অ্যালগরিদম বা লজিক পরিবর্তন করার সুযোগ দেয়। এটি <code>if-else</code> এর বিশাল ব্লক থেকে বাঁচায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Strategy Interface
interface PaymentStrategy {
  pay(amount: number): Promise<boolean>;
}

// 2. Concrete Strategies
class StripePayment implements PaymentStrategy {
  async pay(amount: number) { /* Stripe API call */ return true; }
}
class PaypalPayment implements PaymentStrategy {
  async pay(amount: number) { /* PayPal API call */ return true; }
}

// 3. Context Class
class ShoppingCart {
  private paymentStrategy: PaymentStrategy;

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }

  async checkout(amount: number) {
    return await this.paymentStrategy.pay(amount);
  }
}

// Usage
const cart = new ShoppingCart();
cart.setPaymentStrategy(new StripePayment());
await cart.checkout(100);</code></pre>
      </div>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Strategy Pattern ও Dependency Injection একসাথে ব্যবহার করলে নতুন Payment Gateway যোগ করা কতটা সহজ হয়?</li>
      </ul>
    `
  },
  {
    id: "sr-7",
    category: "Design Patterns",
    difficulty: "Advanced",
    tags: ["Repository Pattern","Architecture","OOP"],
    question: "Repository Pattern কী এবং এটি কেন ব্যবহার করা হয়? Unit of Work এর সাথে এর পার্থক্য কী?",
    answer: `
      <p><strong>Repository Pattern</strong> ডাটাবেজ অ্যাক্সেস লজিককে (SQL queries) বিজনেস লজিক থেকে সম্পূর্ণ আলাদা করে। এটি মূলত মেমোরিতে থাকা অবজেক্টের কালেকশনের মতো আচরণ করে।</p>
      <h4>সুবিধা:</h4>
      <ul>
        <li>বিজনেস লজিক ডাটাবেজ (Mongoose/Prisma) সম্পর্কে কিছু জানে না (Decoupling)।</li>
        <li>ইউনিট টেস্টিংয়ে সহজে Mock Database ব্যবহার করা যায়।</li>
      </ul>
      <h4>Unit of Work (UoW) এর সাথে পার্থক্য:</h4>
      <p>Repository শুধু একটি টেবিল/এনটিটির কুয়েরি হ্যান্ডেল করে। কিন্তু <strong>Unit of Work</strong> একটি ট্রানজেকশনের ভেতরে থাকা একাধিক Repository-র কাজ কোঅর্ডিনেট করে। সব Repository-র কাজ সফল হলে একসাথে <code>commit()</code> করে, কোনো এরর হলে <code>rollback()</code> করে।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Unit of Work ছাড়া একাধিক Repository দিয়ে একটি ট্রানজ্যাকশনে কাজ করলে কী সমস্যা হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "sr-8",
    category: "OOP",
    difficulty: "Intermediate",
    tags: ["SOLID","OOP","Design Principles"],
    question: "SOLID Principles কী? ব্যাকএন্ড ডেভেলপমেন্টে এর গুরুত্ব ব্যাখ্যা করুন।",
    answer: `
      <p>SOLID হলো OOP-এর ৫টি মূলনীতি, যা কোডকে মেইনটেইনেবল, স্কেলেবল এবং টেস্টেবল করে তোলে:</p>
      <ol>
        <li><strong>S - Single Responsibility Principle (SRP):</strong> একটি ক্লাসের শুধু একটি কারণ থাকতে হবে পরিবর্তনের জন্য। (যেমন- <code>UserService</code> শুধু ইউজার লজিক হ্যান্ডেল করবে, ইমেইল পাঠাবে না)।</li>
        <li><strong>O - Open/Closed Principle (OCP):</strong> ক্লাস এক্সটেনশনের জন্য খোলা (Open), কিন্তু মডিফিকেশনের জন্য বন্ধ (Closed) থাকতে হবে। (নতুন ফিচার আসলে পুরোনো কোড না বদলে নতুন ক্লাস যোগ করতে হবে)।</li>
        <li><strong>L - Liskov Substitution Principle (LSP):</strong> প্যারেন্ট ক্লাসের জায়গায় চাইল্ড ক্লাস বসালে প্রোগ্রামের আচরণ ভাঙতে নয়।</li>
        <li><strong>I - Interface Segregation Principle (ISP):</strong> একটি বড় ইন্টারফেসের বদলে ছোট ছোট স্পেসিফিক ইন্টারফেস থাকা উচিত। ক্লাসকে এমন মেথড ইমপ্লিমেন্ট করতে বাধ্য করা উচিত নয় যা তার দরকার নেই।</li>
        <li><strong>D - Dependency Inversion Principle (DIP):</strong> হাই-লেভেল মডিউল লো-লেভেল মডিউলের ওপর নির্ভর করবে না, বরং দুজনেই Abstraction (Interface)-এর ওপর নির্ভর করবে। (Dependency Injection এর মাধ্যমে এটি করা হয়)।</li>
      </ol>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Single Responsibility ও Open/Closed নীতি বাস্তবে কীভাবে conflict করতে পারে — একটি উদাহরণ দিন?</li>
      </ul>
    `
  },
  {
    id: "sr-9",
    category: "Design Patterns",
    difficulty: "Intermediate",
    tags: ["Observer Pattern","Event-Driven","Architecture"],
    question: "Observer Pattern কী? Event-Driven Architecture-এ এর ব্যবহার কী?",
    answer: `
      <p><strong>Observer Pattern</strong> এমন একটি প্যাটার্ন যেখানে একটি অবজেক্ট (Subject/Publisher)-এর স্টেট পরিবর্তিত হলে তার সাথে যুক্ত সকল ডিপেন্ডেন্ট (Observers/Subscribers)-কে স্বয়ংক্রিয়ভাবে নোটিফিকেশন পাঠানো হয়।</p>
      <h4>ব্যাকএন্ড ব্যবহার:</h4>
      <p>ইউজার রেজিস্ট্রেশনের পর ইমেইল পাঠানো, অ্যানালিটিক্স আপডেট করা এবং ওয়েলকাম বোনাস দেওয়ার কাজ যদি <code>AuthService</code>-এর ভেতরে লেখা হয়, তবে কোডটি কাপলড হবে। Observer প্যাটার্নে <code>AuthService</code> শুধু <code>user.registered</code> ইভেন্ট ফায়ার করবে, আর ইমেইল/বোনাস সার্ভিস সেই ইভেন্ট লিসেন করবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Node.js EventEmitter example
const EventEmitter = require('events');
class AuthService extends EventEmitter {
  register(user) {
    // Save to DB
    this.emit('user.registered', user); // Notify observers
  }
}

const auth = new AuthService();
auth.on('user.registered', (user) => sendWelcomeEmail(user));
auth.on('user.registered', (user) => giveSignupBonus(user));
// If we need to add SMS feature, we just add a new listener, no need to touch AuthService.</code></pre>
      </div>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>In-process Observer Pattern ও external message broker-ভিত্তিক Event-Driven আর্কিটেকচারের মধ্যে কখন কোনটি বেছে নেবেন?</li>
      </ul>
    `
  },
  {
    id: "sr-10",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Backpressure","Queue","Reliability"],
    question: "Backpressure কী? ব্যাকএন্ড সিস্টেমে এটি কীভাবে হ্যান্ডেল করবেন?",
    answer: `
      <p>যখন কোনো সিস্টেমে ইনপুট রিকোয়েস্টের গতি তার প্রসেসিং করার গতির চেয়ে অনেক বেশি হয়ে যায়, তখন সিস্টেমের ওপর চাপ পড়ে। একে <strong>Backpressure</strong> বলে। এটি মেমোরি লিক বা সার্ভার ক্র্যাশ করতে পারে।</p>
      <h4>হ্যান্ডেল করার উপায়:</h4>
      <ol>
        <li><strong>Message Queues (Kafka/RabbitMQ):</strong> রিকোয়েস্টগুলো সরাসরি প্রসেস না করে Queue-তে জমা করা। Consumer তার নিজস্ব গতিতে Queue থেকে রিকোয়েস্ট প্রসেস করবে।</li>
        <li><strong>Load Shedding:</strong> সার্ভার যদি ১০০% লোডে থাকে, তবে নতুন রিকোয়েস্ট গ্রহণ না করে <code>503 Service Unavailable</code> বা <code>429 Too Many Requests</code> রিটার্ন করা।</li>
        <li><strong>Reactive Programming:</strong> Node.js-এ Streams এবং <code>pause()</code>/<code>resume()</code> মেকানিজম ব্যবহার করে ডাটার ফ্লো নিয়ন্ত্রণ করা।</li>
      </ol>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Node.js stream-এ backpressure কীভাবে স্বয়ংক্রিয়ভাবে সামলানো হয় (highWaterMark, pipe())?</li>
        <li>Message queue-তে consumer ধীর হলে backpressure কীভাবে producer পর্যন্ত propagate করানো যায়?</li>
      </ul>
    `
  },
  {
    id: "sr-11",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Connection Pool","Database","Performance"],
    question: "Database Connection Pool Exhaustion কী? হাই-ট্রাফিক অ্যাপে এটি কীভাবে সমাধান করবেন?",
    answer: `
      <p>যখন অ্যাপ্লিকেশনের সকল ডাটাবেজ কানেকশন ব্যস্ত (Busy) থাকে এবং নতুন কোনো কুয়েরি কানেকশনের জন্য অনির্দিষ্টকালের জন্য অপেক্ষা করতে থাকে, তখন সেটি <strong>Connection Pool Exhaustion</strong> বলে। এর ফলে পুরো অ্যাপ হ্যাং করতে পারে।</p>
      <h4>সমাধান:</h4>
      <ul>
        <li><strong>Connection Pool Tuning:</strong> ম্যাক্স পুল সাইজ সঠিকভাবে কনফিগার করা (সাধারণত <code>(core_count * 2) + effective_spindle_count</code> ফর্মুলা ব্যবহার করা হয়)।</li>
        <li><strong>External Pooling (PgBouncer):</strong> অ্যাপ থেকে সরাসরি DB-তে না গিয়ে PgBouncer-এর মতো মিডলওয়্যার ব্যবহার করা। এটি হাজার হাজার ক্লায়েন্ট কানেকশনকে ডাটাবেজের জন্য মাত্র ১০০-২০০টি কানেকশনে ম্যাপ করে।</li>
        <li><strong>Query Timeout:</strong> প্রতিটি কুয়েরির জন্য টাইমআউট (যেমন ৫ সেকেন্ড) সেট করা, যাতে কোনো স্লো কুয়েরি দীর্ঘক্ষণ কানেকশন ধরে না রাখতে পারে।</li>
        <li><strong>Caching:</strong> রিড কুয়েরি ক্যাশ করে ডাটাবেজের লোড কমানো।</li>
      </ul>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>PgBouncer-এর transaction mode কীভাবে connection pool exhaustion কমায়?</li>
        <li>একটি leaked connection (কখনও release হয়নি) কীভাবে শনাক্ত করবেন প্রোডাকশনে?</li>
      </ul>
    `
  },
  {
    id: "sr-12",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Long Polling","WebSocket","Real-time"],
    question: "Real-time Notification System ডিজাইন করতে বলা হলে। WebSocket vs Server-Sent Events (SSE) vs Long Polling— কোনটি বেছে নেবেন এবং কেন?",
    answer: `
      <p>রিয়েল-টাইম কমিউনিকেশনের জন্য এই তিনটির মধ্যে পছন্দ নির্ভর করে ইউজ-কেসের ওপর:</p>
      <ul>
        <li><strong>Long Polling:</strong> ক্লায়েন্ট রিকোয়েস্ট পাঠায়, সার্ভার নতুন ডাটা না আসা পর্যন্ত হোল্ড করে রাখে। <em>(ব্যবহার:</em> খুব বেশি রিয়েল-টাইম দরকার নেই, লেগেসি সিস্টেম)। এতে সার্ভারের রিসোর্স নষ্ট হয়।</li>
        <li><strong>Server-Sent Events (SSE):</strong> একমুখী (Server to Client)। HTTP কানেকশন ওপেন রেখে সার্ভার থেকে ক্লায়েন্টে ডাটা পাঠানো হয়। <em>(ব্যবহার:</em> স্টক মার্কেট টিকার, নোটিফিকেশন বেল)। সেটআপ সহজ এবং HTTP/2 তে ভালো স্কেল করে।</li>
        <li><strong>WebSocket:</strong> দ্বিমুখী (Bi-directional)। ক্লায়েন্ট এবং সার্ভার উভয়েই যেকোনো সময় ডাটা পাঠাতে পারে। <em>(ব্যবহার:</em> চ্যাট অ্যাপ, মাল্টিপ্লেয়ার গেম)। স্কেলিং কিছুটা জটিল (Redis Pub/Sub লাগে)।</li>
      </ul>
      <h4>সিদ্ধান্ত:</h4>
      <p>যদি শুধু সার্ভার থেকে ইউজারকে নোটিফিকেশন পাঠাতে হয়, তবে <strong>SSE</strong> সবচেয়ে ভালো ও লাইটওয়েট চয়েজ। আর ইউজারের থেকেও রিয়েল-টাইম মেসেজ আসবে (যেমন চ্যাট), সেক্ষেত্রে <strong>WebSocket</strong>।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>WebSocket সংযোগ স্কেল করতে হলে (হাজার হাজার concurrent connection) কী আর্কিটেকচার লাগবে (sticky session, Redis pub-sub)?</li>
        <li>SSE-এর তুলনায় WebSocket কেন বেশি রিসোর্স-ইনটেনসিভ?</li>
      </ul>
    `
  },
  {
    id: "sr-13",
    category: "OOP",
    difficulty: "Advanced",
    tags: ["Inheritance","Composition","OOP"],
    question: "'Favor Composition over Inheritance' কথার অর্থ কী? ব্যাকএন্ডে এর প্রয়োগ কী?",
    answer: `
      <p>Inheritance (ইনহেরিট্যান্স) কোড রি-ইউজের জন্য ভালো হলেও, এটি ক্লাসের মধ্যে শক্ত কাপলিং (Tight Coupling) তৈরি করে। প্যারেন্ট ক্লাসের কোনো পরিবর্তন সকল চাইল্ড ক্লাসকে ভেঙে দিতে পারে। </p>
      <p><strong>Composition</strong> হলো একটি ক্লাসের ভেতরে অন্য ক্লাসের অবজেক্ট রেখে (Has-a relationship) তার ফাংশনালিটি ব্যবহার করা।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// BAD: Inheritance (Tight Coupling)
class User {
  save() { /* DB logic */ }
}
class Admin extends User {
  // Admin inherits save(), but what if Admin needs different save logic?
}

// GOOD: Composition (Loose Coupling)
class DatabaseSaver {
  save(entity: any) { /* Generic DB logic */ }
}
class User {
  private dbSaver = new DatabaseSaver(); // Injected via DI ideally
  save() { this.dbSaver.save(this); }
}
class Admin {
  private dbSaver = new DatabaseSaver();
  save() { this.dbSaver.save(this); }
  // We can easily inject a different saver without breaking User class
}</code></pre>
      </div>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Composition ব্যবহার করলে টেস্ট করা কেন সহজ হয় Inheritance-এর তুলনায়?</li>
      </ul>
    `
  },
  {
    id: "sr-14",
    category: "Design Patterns",
    difficulty: "Advanced",
    tags: ["Factory Pattern","SOLID","OOP"],
    question: "Factory Pattern কী? Multi-tenant SaaS অ্যাপ্লিকেশনে এটি কীভাবে কাজে লাগে?",
    answer: `
      <p><strong>Factory Pattern</strong> অবজেক্ট তৈরি করার লজিককে ক্লায়েন্ট কোড থেকে আলাদা করে। ক্লায়েন্ট শুধু বলে কোন টাইপের অবজেক্ট দরকার, আর Factory ক্লাস সেটি তৈরি করে দেয়।</p>
      <p>Multi-tenant SaaS অ্যাপে বিভিন্ন টেন্যান্টের জন্য আলাদা কনফিগারেশন বা ডাটাবেজ কানেকশন লাগতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>class TenantDBFactory {
  static createDBConnection(tenantId: string) {
    if (tenantId === 'client_a') {
      return new PostgresClient('client_a_url');
    } else if (tenantId === 'client_b') {
      return new MySQLClient('client_b_url');
    }
    throw new Error("Invalid Tenant");
  }
}

// In a request
const db = TenantDBFactory.createDBConnection(req.headers['x-tenant-id']);
await db.query('SELECT * FROM users');</code></pre>
      </div>
      <p>এখানে মূল বিজনেস লজিক জানে না কোন টেন্যান্ট কোন ডাটাবেজ ব্যবহার করছে, সেটি Factory-র দায়িত্ব।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Multi-tenant SaaS-এ Factory Pattern দিয়ে tenant-নির্দিষ্ট কনফিগারেশন কীভাবে ইনজেক্ট করবেন?</li>
      </ul>
    `
  },
  {
    id: "sr-15",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Database","Sharding","Scalability"],
    question: "Database Sharding কী? কখন Sharding ব্যবহার করবেন এবং এর সমস্যাগুলো কী কী?",
    answer: `
      <p>যখন একটি ডাটাবেজ সার্ভার বিশাল ডাটা বা ট্রাফিক সামলাতে পারে না, তখন ডাটাকে একাধিক ফিজিক্যাল সার্ভারে (Shards) ভাগ করে রাখাকে <strong>Database Sharding</strong> বলে। এটি Horizontal Scaling।</p>
      <h4>Sharding Key (Partition Key):</h4>
      <p>কোন ডাটা কোন সার্ভারে যাবে তা নির্ধারণ করে (যেমন- <code>user_id</code> এর ভিত্তিতে)। যেমন: <code>user_id % 4 == 0</code> হলে Shard 1-এ যাবে।</p>
      <h4>সমস্যাসমূহ:</h4>
      <ul>
        <li><strong>Hotspots:</strong> যদি একজন ইনফ্লুয়েন্সারের সকল ডাটা একই Shard-এ থাকে, তবে সেই Shard-এ অতিরিক্ত চাপ পড়ে।</li>
        <li><strong>Cross-Shard Joins:</strong> দুটি আলাদা Shard-এর টেবিলকে JOIN করা অত্যন্ত কঠিন ও স্লো।</li>
        <li><strong>Distributed Transactions:</strong> একাধিক Shard-এ ট্রানজেকশন মেইনটেইন করা (2 Phase Commit) জটিল।</li>
        <li><strong>Resharding:</strong> Shard সংখ্যা বাড়াতে হলে পুরো ডাটা পুনরায় ডিস্ট্রিবিউট করতে হয়, যা ডাউনটাইম তৈরি করে।</li>
      </ul>
    
      <h4>Sharding আর্কিটেকচার — Shard Key দিয়ে রাউটিং</h4>
      <pre class="mermaid">
flowchart TB
    App[অ্যাপ্লিকেশন] --> Router{Shard Router<br/>hash user_id % N}
    Router -->|shard 0| DB0[(Shard 0<br/>users 0-999)]
    Router -->|shard 1| DB1[(Shard 1<br/>users 1000-1999)]
    Router -->|shard 2| DB2[(Shard 2<br/>users 2000-2999)]
      </pre>
      <span class="diagram-caption">Shard key (user_id) হ্যাশ করে নির্দিষ্ট শার্ডে রাউট করা হয় — প্রতিটি শার্ড ডেটার একটি অংশের মালিক</span>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি নতুন শার্ড যোগ করলে (resharding) বিদ্যমান ডেটা কীভাবে পুনর্বণ্টন করবেন, ডাউনটাইম ছাড়াই?</li>
        <li>Cross-shard query (একাধিক শার্ড জুড়ে JOIN বা aggregation) কীভাবে হ্যান্ডল করবেন?</li>
      </ul>
    `
  }
];
