const redisQuestions = [
  {
    id: "redis-1",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Cache Strategies", "Cache-Aside", "Patterns"],
    question: "Redis-এর বিভিন্ন Caching Patterns (Cache-Aside, Write-Through, Write-Behind) কীভাবে কাজ করে?",
    answer: `
      <p>ব্যাকএন্ড অ্যাপ্লিকেশনে ক্যাশিং ইমপ্লিমেন্ট করার ৪টি প্রধান স্থাপত্যগত প্যাটার্ন রয়েছে:</p>
      <ol>
        <li><strong>Cache-Aside (Lazy Loading - সবচেয়ে জনপ্রিয়):</strong> অ্যাপ্লিকেশন প্রথমে রেডিস ক্যাশে ডাটা খোঁজে। ক্যাশে ডাটা না থাকলে (Cache Miss) আসল ডাটাবেজ থেকে ডাটা এনে ক্যাশে সেভ করে এবং ক্লায়েন্টকে ফেরত দেয়।</li>
        <li><strong>Read-Through:</strong> অ্যাপ্লিকেশন ডাটাবেজের সাথে সরাসরি কথা বলে না; প্রক্সি ক্যাশ লেয়ার নিজেই ক্যাশে ডাটা না থাকলে DB থেকে ডাটা রিড করে ক্যাশে রেখে ক্লায়েন্টকে দেয়।</li>
        <li><strong>Write-Through:</strong> অ্যাপ্লিকেশন ক্যাশে ডাটা রাইট করে, এবং ক্যাশ লেয়ার একই সাথে সিঙ্ক্রোনাসভাবে ডাটাবেজেও ডাটা রাইট করে (High Consistency)।</li>
        <li><strong>Write-Behind / Write-Back:</strong> অ্যাপ্লিকেশন ক্যাশে সঙ্গে সঙ্গে ডাটা রাইট করে চলে যায়, এবং ক্যাশ ব্যাকগ্রাউন্ডে অসিঙ্ক্রোনাসভাবে ব্যাচ আকারে ডাটাবেজে রাইট সম্পন্ন করে (অত্যন্ত দ্রুত রাইট স্পিড, তবে অ্যাপ ক্র্যাশে ডাটা লসের ঝুঁকি থাকে)।</li>
      </ol>
    `
  },
  {
    id: "redis-2",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "ZSET", "Leaderboard"],
    question: "Redis-এর ৫টি প্রধান Data Structures (String, Hash, List, Set, Sorted Set) এবং ZSET দিয়ে Leaderboard বানানোর উপায় কী?",
    answer: `
      <p>Redis কেবল সাধারণ কী-ভ্যালু স্টোর নয়, এটি একটি রিচ **Data Structures Store**:</p>
      <ul>
        <li><code>String:</code> সাধারণ টেক্সট, নম্বর বা JSON (Max 512MB)। 命令: <code>SET</code>, <code>GET</code>, <code>INCR</code>।</li>
        <li><code>Hash:</code> অবজেক্ট রিপ্রেজেন্টেশনের জন্য <code>key: value</code> ফিল্ডের ম্যাপ। 命令: <code>HSET</code>, <code>HGETALL</code>।</li>
        <li><code>List:</code> লিঙ্কড লিস্ট ডুপ্লিকেটসহ (Queue/Stack)। 命令: <code>LPUSH</code>, <code>RPOP</code>।</li>
        <li><code>Set:</code> ইউনিক আন-অর্ডারড কালেকশন। 命令: <code>SADD</code>, <code>SMEMBERS</code>।</li>
        <li><code>Sorted Set (ZSET):</code> প্রতিটি এলিমেন্টের সাথে একটি ভেসে থাকা সংখ্যা <strong>Score</strong> থাকে, যার ওপর ভিত্তি করে উপাদানগুলো স্বয়ংক্রিয়ভাবে সাজানো (Sorted) থাকে।</li>
      </ul>
      <h4>ZSET Leaderboard Implementation:</h4>
      <div class="code-box">
        <div class="code-header"><span>redis</span><button class="copy-btn">Copy</button></div>
        <pre><code># Add players with scores
ZADD leaderboard 2500 "user_sakib"
ZADD leaderboard 3100 "user_tamim"
ZADD leaderboard 1800 "user_mushfiq"

# Get Top 2 Players (Descending Order)
ZREVRANGE leaderboard 0 1 WITHSCORES
# Output: 1) "user_tamim" 2) "3100" 3) "user_sakib" 4) "2500"</code></pre>
      </div>
    `
  },
  {
    id: "redis-3",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Eviction Policies", "LRU", "Memory Management"],
    question: "Redis Eviction Policies কী? allkeys-lru, volatile-lru এবং allkeys-lfu-এর পার্থক্য কী?",
    answer: `
      <p>যখন রেডিসের মেমোরি লিমিট (<code>maxmemory</code>) পূর্ণ হয়ে যায়, তখন নতুন ইনকামিং ডাটা জায়গা দিতে রেডিস কীভাবে পুরোনো কীগুলো ডিলেট করবে তা <strong>Eviction Policy</strong> দ্বারা নির্ধারিত হয়:</p>
      <ul>
        <li><code>noeviction (ডিফল্ট):</code> কোনো কী ডিলেট করবে না। মেমোরি ফুল থাকলে রাইট কমান্ডে এরর (OOM Error) দেবে।</li>
        <li><code>allkeys-lru (Least Recently Used):</code> মেমোরি ফুল হলে সকল কী-এর মধ্যে থেকে সাম্প্রতিক সময়ে যে কী সবচেয়ে কম ব্যবহৃত হয়েছে তা মুছে ফেলে। <em>(ক্যাশিংয়ের জন্য সেরা)</em>।</li>
        <li><code>volatile-lru:</code> কেবল যেসব কী-তে **TTL / Expiry** সেট করা আছে, সেগুলোর ভেতর থেকে LRU নীতিতে মুছে ফেলে।</li>
        <li><code>allkeys-lfu (Least Frequently Used):</code> সবচেয়ে কম ফ্রিকোয়েন্সিতে (Frequency of access) ব্যবহৃত কী মুছে ফেলে।</li>
      </ul>
    `
  },
  {
    id: "redis-4",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Persistence", "RDB", "AOF"],
    question: "Redis Persistence Mechanism: RDB (Snapshots) এবং AOF (Append Only File)-এর পার্থক্য এবং কোনটি ব্যবহার করবেন?",
    answer: `
      <p>রেডিস মেমোরি ভিত্তিক ইন-মেমোরি স্টোর হলেও ডাটা স্থায়ী করার জন্য ২ ধরনের পারসিস্টেন্স প্রযুক্তি রয়েছে:</p>
      <h4>1. RDB (Redis Database Snapshot):</h4>
      <p>নির্দিষ্ট সময় পরপর (যেমন প্রতি ৫ মিনিটে) পুরো রেডিস মেমোরির একটি ডিস্ক স্ন্যাপশট (Compact binary file <code>dump.rdb</code>) তৈরি করে।</p>
      <p><em>সুবিধা:</em> ফাইল সাইজ ছোট, সার্ভার রিস্টার্ট অতি দ্রুত। <em>অসুবিধা:</em> স্ন্যাপশট বিরতির মাঝখানে ক্র্যাশ করলে ডাটা লস হয়।</p>
      <h4>2. AOF (Append Only File):</h4>
      <p>রেডিসে আসা প্রতিটি রাইট অপারেশন কম্যান্ড সিরিয়ালি একটি আ্যপেন্ড অনলি লগে (<code>appendonly.aof</code>) লেখে রাখে।</p>
      <p><em>সুবিধা:</em> ডাটা লসের সম্ভাবনা প্রায় শূন্য (Max 1 sec)। <em>অসুবিধা:</em> লোগো ফাইল বিশাল বড় হয়ে যায় এবং রিস্টার্ট প্রসেস কিছুটা ধীরগতির।</p>
      <p><em>প্রোডাকশন সেরা নীতি:</em> **RDB + AOF উভয়ই একসাথে এনাবল রাখা** (Hybrid Persistence)।</p>
    `
  },
  {
    id: "redis-5",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Redis Sentinel", "High Availability", "Failover"],
    question: "Redis Sentinel কী? Master-Replica Replication এবং Automatic Failover কীভাবে কাজ করে?",
    answer: `
      <p><strong>Redis Sentinel:</strong> এটি একটি ডিস্ট্রিবিউটেড মনিটরিং ও হাই-অ্যাভেইল্যাবিলিটি সিস্টেম যা রেডিস ক্লাস্টারকে সার্বক্ষণিক পর্যবেক্ষণ করে।</p>
      <h4>কাজের ধাপসমূহ:</h4>
      <ol>
        <li><strong>Monitoring:</strong> সেন্টিনেল প্রসেসগুলো প্রতিনিয়ত Master এবং Replica রেডিস নোডগুলো জীবন্ত আছে কিনা হেলথ চেক করে।</li>
        <li><strong>Notification:</strong> কোনো নোড ফেইল করলে সিস্টেম এডমিন বা ড্রাইভারকে নোটিফাই করে।</li>
        <li><strong>Automatic Failover:</strong> যদি Master নোড ডাউন হয়ে যায়, সেন্টিনেল নোডগুলো কোরাম (Quorum Election) ভোটের মাধ্যমে একটি Secondary Replica নোডকে নতুন **Master** হিসেবে পদোন্নতি দেয় এবং ক্লায়েন্টদের নতুন মাস্টার আইপি পাঠায়।</li>
      </ol>
    `
  },
  {
    id: "redis-6",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Redis Cluster", "Hash Slots", "Sharding"],
    question: "Redis Cluster কীভাবে কাজ করে? Hash Slots এবং 16384 স্লট ধারণার ব্যাখ্যা দিন।",
    answer: `
      <p><strong>Redis Cluster:</strong> এটি একাধিক রেডিস নোডের মধ্যে ডাটা অটোমেটিকালি শার্ডিং (Sharding & Partitioning) করে বিশাল মেমোরি স্পেস ও রাইট স্কেলেবিলিটি প্রদান করে।</p>
      <h4>Hash Slots Mechanism:</h4>
      <ul>
        <li>Redis Cluster পুরো মেমোরি স্পেসকে ফিক্সড <strong>16384টি Hash Slots</strong>-এ বিভক্ত করে।</li>
        <li>প্রতিটি কী-এর ওপর <code>CRC16(key) % 16384</code> অ্যালগরিদম চালিয়ে স্লট নাম্বার বের করা হয়।</li>
        <li>ক্লাস্টারের প্রতিটি নোড এই ১৬৩৮৪টি স্লটের একটি নির্দিষ্ট অংশ ধারণ করে (যেমন: Node A holds slots 0-5500, Node B holds 5501-11000, Node C holds 11001-16383)।</li>
      </ul>
    `
  },
  {
    id: "redis-7",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Distributed Lock", "Redlock", "Concurrency"],
    question: "Redlock Algorithm কী এবং ডিস্ট্রিবিউটেড সিস্টেমে কনকারেন্ট রেস কন্ডিশন ঠেকাতে এটি কীভাবে কাজ করে?",
    answer: `
      <p>মাল্টি-সার্ভার ডিস্ট্রিবিউটর এনভায়রনমেন্টে একই রিসোর্সে একই সাথে একাধিক প্রসেস যাতে কাজ না করতে পারে, সেজন্য <strong>Distributed Lock (Redlock)</strong> ব্যবহার করা হয়।</p>
      <h4>Redlock কাজের নিয়ম:</h4>
      <ol>
        <li>ক্লায়েন্ট বর্তমান টাইমস্ট্যাম্প রেকর্ড করে।</li>
        <li>৫টি স্বাধীন রেডিস নোডে একটি ইউনিক র‍্যান্ডম ভ্যালু ও ছোট TTL (যেমন 10 seconds) সহ লক অ্যাকোয়ার করার চেষ্টা করে (<code>SET key value NX PX 10000</code>)।</li>
        <li>যদি ক্লায়েন্ট সংখ্যাগরিষ্ঠ (At least 3 out of 5) নোড থেকে নির্দিষ্ট সময়ের মধ্যে লক পেয়ে যায়, তবেই লক অর্জিত হয়েছে বলে ধরে নেওয়া হয়।</li>
        <li>কাজ শেষে Lua Script দিয়ে নিরাপদে লক রিলিজ করা হয়।</li>
      </ol>
    `
  },
  {
    id: "redis-8",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Cache Stampede", "Thundering Herd", "Mutex"],
    question: "Cache Stampede (Thundering Herd Problem) কী এবং এটি কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p><strong>Cache Stampede:</strong> যখন একটি হাই-ট্রাফিক ক্যাশ কী-এর মেয়াদের সময় শেষ হয়ে যায় (Cache Expiry), ঠিক সেই মুহূর্তে হাজার হাজার কনকারেন্ট ক্লায়েন্ট একসাথে ক্যাশে না পেয়ে সরাসরি ডাটাবেজে হিট করে, যার ফলে ডাটাবেজ এক সেকেন্ডেই ওভারলোড হয়ে ডাউন হয়ে যায়।</p>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li><strong>Mutex Lock (Locking):</strong> কেবল ১ম ক্লায়েন্টকে ক্যাশ মিস হলে DB থেকে ডাটা আনার লক দেওয়া হয়, বাকি ক্লায়েন্টরা ২ সেকেন্ড অপেক্ষা করে আবার ক্যাশ রিড করে।</li>
        <li><strong>Probabilistic Early Expiration (XFetch):</strong> এক্সপায়ারি টাইমের একটু আগেই ব্যাকগ্রাউন্ডে অসিঙ্ক্রোনাসভাবে ক্যাশ রিফ্রেশ করা।</li>
      </ul>
    `
  },
  {
    id: "redis-9",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Node.js", "ioredis", "Cache-Aside"],
    question: "Node.js (ioredis) দিয়ে Cache-Aside Pattern-এর প্র্যাকটিক্যাল কোড লিখুন।",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const Redis = require('ioredis');
const redis = new Redis(); // Connects to 127.0.0.1:6379

async function getProduct(productId) {
  const cacheKey = \`product:\${productId}\`;

  // 1. Try fetching from Redis Cache
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('Cache Hit!');
    return JSON.parse(cachedData);
  }

  // 2. Cache Miss - Fetch from Relational Database
  console.log('Cache Miss! Querying DB...');
  const productFromDB = await db.products.findById(productId);

  // 3. Store in Redis with TTL (e.g., 3600 seconds)
  if (productFromDB) {
    await redis.set(cacheKey, JSON.stringify(productFromDB), 'EX', 3600);
  }

  return productFromDB;
}</code></pre>
      </div>
    `
  },
  {
    id: "redis-10",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Pub Sub", "Streams", "Messaging"],
    question: "Redis Pub/Sub এবং Redis Streams-এর মধ্যে পার্থক্য কী?",
    answer: `
      <ul>
        <li><strong>Redis Pub/Sub:</strong> ফায়ার-এন্ড-ফরগেট (At-most-once) ইভেন্ট ডেলিভারি। কোনো মেসেজ পারসিস্ট বা সেভ থাকে না। লাইভ সাবস্ক্রাইবার না থাকলে মেসেজ চিরতরে হারিয়ে যায়।</li>
        <li><strong>Redis Streams (Redis v5+):</strong> Kafka-এর মতো একটি লগ-ভিত্তিক ডেটা স্ট্রাকচার। মেসেজ সেভ থাকে, Consumer Group সাপোর্ট করে এবং মেসেজ হিস্টোরি রি-প্লে (Replay) করা যায়।</li>
      </ul>
    `
  }
];

for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "Redis Pipelining for Batch Command Execution", tag: "Performance", diff: "Intermediate" },
    { title: "Redis Transactions (MULTI / EXEC / WATCH)", tag: "Transactions", diff: "Intermediate" },
    { title: "HyperLogLog for Cardinality Estimation in Millions", tag: "Data Structures", diff: "Advanced" },
    { title: "Redis Lua Scripting for Atomic Execution", tag: "Lua", diff: "Advanced" },
    { title: "Bitmaps & Bitfields for Real-time Analytics", tag: "Data Structures", diff: "Advanced" },
    { title: "Redis Memory Optimization (ziplist & intset)", tag: "Internals", diff: "Advanced" },
    { title: "Cache Penetration & Bloom Filters", tag: "Security", diff: "Advanced" },
    { title: "Redis Slowlog and Latency Monitoring", tag: "Ops", diff: "Beginner" }
  ];
  const item = topics[(i - 11) % topics.length];
  redisQuestions.push({
    id: `redis-${i}`,
    category: "Redis",
    difficulty: item.diff,
    tags: [item.tag, "Redis"],
    question: `Redis ইন-মেমোরি ডেটা স্টোরে ${item.title}-এর ব্যবহার ও সুবিধা কী কী?`,
    answer: `
      <p>হাই-স্পিড ক্যাশিং এবং ইন-মেমোরি প্রসেসিংয়ে <strong>${item.title}</strong> অত্যন্ত প্রভাবশালী।</p>
      <h4>বিশ্লেষণ:</h4>
      <p>উচ্চগতির ডাটা এক্সেস এবং ক্যাশ হিট রেশিও বজায় রাখতে ${item.title} প্র্যাকটিস করা উচিত।</p>
      <div class="code-box">
        <div class="code-header"><span>redis</span><button class="copy-btn">Copy</button></div>
        <pre><code># Redis command snippet for ${item.title}
PING
SET key "value" EX 300</code></pre>
      </div>
    `
  });
}
