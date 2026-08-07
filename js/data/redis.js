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
,

  {
    id: "redis-11",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Performance","Pipelining","Networking"],
    question: "Redis Pipelining কী এবং এটি কীভাবে পারফরম্যান্স বাড়ায়?",
    answer: `
<p>Pipelining-এ ক্লায়েন্ট প্রতিটি রেসপন্সের জন্য অপেক্ষা না করে একসাথে একাধিক কমান্ড পাঠিয়ে নেটওয়ার্ক RTT দূর করে।</p>
    `
  },
  {
    id: "redis-12",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Transactions","MULTI","EXEC"],
    question: "Redis Transactions (MULTI / EXEC / WATCH) কীভাবে কাজ করে?",
    answer: `
<p>MULTI দিয়ে ট্রানজেকশন শুরু করে কমান্ড কিউ করা হয় এবং EXEC দিয়ে একসাথে চালানো হয়। WATCH দিয়ে Optimistic Lock রাখা যায়।</p>
    `
  },
  {
    id: "redis-13",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Data Structures","HyperLogLog","Memory"],
    question: "Redis HyperLogLog দিয়ে কীভাবে কোটি কোটি ইউনিক ভ্যালু ১২KB মেমোরিতে মাপা হয়?",
    answer: `
<p>HyperLogLog প্রবাবিলিস্টিক ডাটা স্ট্রাকচার যা মাত্র 12KB মেমোরিতে ৯৮.১% নিখুঁততায় কোটি কোটি ইউনিক ভিজিটর সংখ্যা গণনা করে।</p>
    `
  },
  {
    id: "redis-14",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Lua","Scripting","Atomic"],
    question: "Redis-এ Lua Scripting (EVAL) কেন ব্যবহৃত হয়?",
    answer: `
<p>Lua Script Redis সার্ভার ইঞ্জিনের ভেতরে অ্যাটমিকালি এক্সিকিউট হয়, যা একাধিক কমান্ডের মাঝে Race Condition প্রতিরোধ করে।</p>
    `
  },
  {
    id: "redis-15",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Data Structures","Bitmaps","Analytics"],
    question: "Redis Bitmaps এবং Bitfields কী?",
    answer: `
<p>স্ট্রিংকে বিট অ্যাররে (0 এবং 1) হিসেবে ব্যবহার করে কোটি কোটি ইউজারের দৈনিক অ্যাক্টিভিটি মাত্র কয়েক মেগাবাইট মেমোরিতে ট্র্যাক করা যায়।</p>
    `
  },
  {
    id: "redis-16",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Internals","Memory","Ziplist"],
    question: "Redis ziplist এবং intset মেমোরি অপটিমাইজেশন কীভাবে কাজ করে?",
    answer: `
<p>ছোট ছোট Hash বা Set ডেটা হলে Redis পয়েন্টার ওভারহেড না রেখে সংকুচিত মেমোরি ব্লক ব্যবহার করে RAM ব্যবহারে সাশ্রয় করে।</p>
    `
  },
  {
    id: "redis-17",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Security","Bloom Filter","Cache"],
    question: "Cache Penetration কী এবং Redis Bloom Filter এটি কীভাবে প্রতিরোধ করে?",
    answer: `
<p>ডাটাবেজে অনুপস্থিত কি-র জন্য বারবার ক্যাশ মিস ঘটিয়ে DB ক্র্যাশ করানোকে Cache Penetration বলে। Bloom Filter কম মেমোরিতে আগে থেকেই চেক করে কি-টি আছে কিনা।</p>
    `
  },
  {
    id: "redis-18",
    category: "Redis",
    difficulty: "Beginner",
    tags: ["Ops","Slowlog","Monitoring"],
    question: "Redis Slowlog কী এবং স্লো কমান্ড কীভাবে ফিক্স করবেন?",
    answer: `
<p><code>SLOWLOG GET 10</code> দিয়ে নির্দিষ্ট এক্সিকিউশন টাইম পার করা ধীরগতির কমান্ড (যেমন <code>KEYS *</code>) খুঁজে পাওয়া যায়।</p>
    `
  },
  {
    id: "redis-19",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Eviction", "Memory", "LRU"],
    question: "Redis Memory Eviction Policies (maxmemory-policy: volatile-lru, allkeys-lru, LFU, Random, noeviction) কীভাবে কাজ করে?",
    answer: `
<p>Redis মেমোরি maxmemory সীমানায় পৌঁছলে নতুন ডেটা রাখার জন্য পুরাতন কি মুছে ফেলে:</p><ul><li><strong>allkeys-lru:</strong> সব কি-র মধ্যে সবচেয়ে দীর্ঘদিন অব্যবহৃত (Least Recently Used) কি মুছে ফেলে (ক্যাশিংয়ের ডিফল্ট)।</li><li><strong>allkeys-lfu:</strong> সবচেয়ে কম ফ্রিকোয়েন্সিতে ব্যবহৃত (Least Frequently Used) কি মুছে ফেলে।</li><li><strong>noeviction:</strong> কোনো কি মোছে না, নতুন রাইটে এরর (OOM Error) দেয়।</li></ul>
    `
  },
  {
    id: "redis-20",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Persistence", "RDB", "AOF"],
    question: "Redis Persistence Options: RDB (Redis Database Snapshot) vs AOF (Append Only File)-এর মধ্যে পার্থক্য কী?",
    answer: `
<p><strong>RDB:</strong> নির্দিষ্ট সময় পর পর ডিস্কে পয়েন্ট-ইন-টাইম বাইনারি স্ন্যাপশট নেয় (পারফরম্যান্স ফাস্ট, কিন্তু স্ন্যাপশট বিরতিতে ডেটা লসের ঝুঁকি থাকে)।</p><p><strong>AOF:</strong> প্রতিটি রাইট কমান্ড ফাইলের শেষে যুক্ত করে (জিরো ডেটা লস, তবে ফাইল সাইজ বড় হয়)। বেস্ট প্র্যাকটিস: RDB এবং AOF একসাথে ব্যবহার করা।</p>
    `
  },
  {
    id: "redis-21",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Sentinel", "Cluster", "High Availability"],
    question: "Redis Sentinel vs Redis Cluster-এর মধ্যে স্থাপত্যগত পার্থক্য কী?",
    answer: `
<p><strong>Sentinel:</strong> Master-Replica সেটআপে হাই-অ্যাভেইলেবিলিটি অফার করে। Master ডাউন হলে স্বয়ংক্রিয় ফেলওভার (Failover) করে নতুন Master নির্বাচিত করে (ডাটা হরাইজন্টাল পার্টিশন করে না)।</p><p><strong>Redis Cluster:</strong> ১৬,৩৮৪টি Hash Slots দিয়ে ডেটা একাধিক Master Nodes-এর মধ্যে হরাইজন্টালি শার্ডিং করে অটো-ফেলওভার অফার করে।</p>
    `
  },
  {
    id: "redis-22",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["PubSub", "Streams", "Messaging"],
    question: "Redis Pub/Sub vs Redis Streams-এর মূল পার্থক্য কী?",
    answer: `
<p><strong>Pub/Sub:</strong> ফায়ার-এন্ড-ফরগেট (Fire and forget)। কনজিউমার অফলাইনে থাকলে মেসেজ চিরতরে হারিয়ে যায় (মেসেজ স্টোর থাকে না)।</p><p><strong>Redis Streams:</strong> Kafka-এর মতো মেসেজ ডিস্কে সংরক্ষণ করে, Consumer Groups সাপোর্ট করে, অফলাইন কনজিউমার ফিরে আসলে পেন্ডিং কিউ থেকে পুনরায় রিড করতে পারে।</p>
    `
  },
  {
    id: "redis-23",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Distributed Locks", "Redlock", "Concurrency"],
    question: "Redis দিয়ে Distributed Locking কীভাবে বাস্তবায়ন করা হয়? Redlock Algorithm কী?",
    answer: `
<p>সিঙ্গেল নোডে <code>SET key value NX PX 30000</code> কমান্ড দিয়ে অ্যাটমিক লক নেওয়া হয়।</p><p><strong>Redlock:</strong> ৫টি স্বাধীন Redis Master নোডে মেজোরিটি (অন্তত ৩টি নোড) কনফার্মেশনের মাধ্যমে গ্লোবালি নির্ভুল লকিং গ্যারান্টি দেয়।</p>
    `
  },
  {
    id: "redis-24",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "Hashes", "Memory"],
    question: "Redis Hashes vs String Keys — মেমোরি অপটিমাইজেশনে Hash Structure কেন ব্যবহার করবেন?",
    answer: `
<p>১০০০টি আলাদা String Key স্টোর করার চেয়ে ১টি Redis Hash (<code>HSET user:100 name 'Nazmul' age 25</code>) ব্যবহার করলে Redis অভ্যন্তরীণভাবে <code>ziplist</code> সংকুচিত স্ট্রাকচার দিয়ে মেমোরি ৮০% সাশ্রয় করে।</p>
    `
  },
  {
    id: "redis-25",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "Sorted Sets", "ZSET"],
    question: "Redis Sorted Sets (ZSET) এবং Skip List Data Structure কীভাবে Leaderboard তৈরি করে?",
    answer: `
<p>ZSET প্রতিটি ভ্যালুর সাথে একটি ভাসমান পয়েন্ট Score যুক্ত রাখে। এটি অভ্যন্তরীণভাবে <strong>Skip List</strong> ব্যবহার করায় ও(log N) সময়ের মধ্যে গেমিং বা র‍্যাঙ্কিং লিডারবোর্ড (<code>ZADD</code>, <code>ZRANGEBYSCORE</code>) বজায় রাখতে পারে।</p>
    `
  },
  {
    id: "redis-26",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Internals", "Event Loop", "Single Threaded"],
    question: "Redis সিঙ্গেল-থ্রেডেড (Single-threaded) হয়েও প্রতি সেকেন্ডে লাখ লাখ কমান্ড কীভাবে প্রসেস করে?",
    answer: `
<p>Redis ইন-মেমোরি (RAM) হওয়ায় ডিস্ক ল্যাটেন্সি নেই। এটি C-ভাষায় লেখা I/O Multiplexing (epoll/kqueue) ভিত্তিক ইভেন্ট লুপ ব্যবহার করে কনটেক্সট সোয়াপিং ওভারহেড ছাড়াই ডেটা প্রসেস করে।</p>
    `
  },
  {
    id: "redis-27",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Expiration", "TTL", "Lazy Freeing"],
    question: "Redis কীভাবে এক্সপায়ার্ড কি (Expired Keys) মেমোরি থেকে পরিষ্কার করে? Passive vs Active Expiration কী?",
    answer: `
<p><strong>Passive Eviction:</strong> ক্লায়েন্ট যখন কোনো কি এক্সেস করে তখন এক্সপায়ারি চেক করে মুছে ফেলা হয়।</p><p><strong>Active Eviction:</strong> ব্যাকগ্রাউন্ড থ্রেড প্রতি সেকেন্ডে ১০ বার র্যান্ডম কি রিড করে এক্সপায়ার্ড কি মেমোরি ক্লিয়ার করে।</p>
    `
  },
  {
    id: "redis-28",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Performance", "Cache Stampede", "Mutex"],
    question: "Cache Stampede (Thundering Herd) প্রবলেম কী এবং Redis Mutex Lock দিয়ে এটি কীভাবে ফিক্স করবেন?",
    answer: `
<p>একটি হট ক্যাশ কি হঠাৎ এক্সপায়ার করলে হাজার হাজার কনকারেন্ট রিকুয়েস্ট একসাথে ডাটাবেজে হিট করে DB ডাউন করে দেয়। সমাধান: কাস্টম Mutex Lock বা Probabilistic Early Expiration।</p>
    `
  },
  {
    id: "redis-29",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Security", "AUTH", "ACL"],
    question: "Redis ACL (Access Control Lists) দিয়ে নির্দিষ্ট ইউজারের কমান্ড ও কি-এক্সেস কীভাবে সীমিত করবেন?",
    answer: `
<p>Redis 6+ থেকে <code>ACL SETUSER developer on >password ~cache:* +get +set -keys</code> দিয়ে নির্দিষ্ট কমান্ড ও প্যাটার্নে পারমিশন দেওয়া যায়।</p>
    `
  },
  {
    id: "redis-30",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Cluster", "Hash Slots", "Resharding"],
    question: "Redis Cluster-এ ১৬,৩৮৪টি Hash Slots এবং CRC16 Algorithm কীভাবে কাজ করে?",
    answer: `
<p>Redis Key-কে <code>CRC16(key) % 16384</code> করে হ্যাশ স্লট পাওয়া যায়। স্লটগুলো নোডের মধ্যে বিভক্ত থাকে। নোড যুক্ত বা কমালে স্লটগুলো জিরো ডাউনটাইমে রিশার্ডিং হয়।</p>
    `
  },
  {
    id: "redis-31",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "Geospatial", "GeoHash"],
    question: "Redis Geospatial (GEOADD, GEORADIUS) কীভাবে জিপিএস লোকেশন সার্চ করে?",
    answer: `
<p>GEO কোয়েস্ট অভ্যন্তরীনভাবে Sorted Set (ZSET)-এর ওপর <strong>GeoHash</strong> ইনটিজার স্কোর দিয়ে দূরত্ব ও নিকটস্থ স্থান ৫০ms-এর কম সময়ে রিটার্ন করে।</p>
    `
  },
  {
    id: "redis-32",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Ops", "Forking", "Copy On Write"],
    question: "Redis RDB Snapshot নেওয়ার সময় Copy-on-Write (COW) কীভাবে মেমোরি বজায় রাখে?",
    answer: `
<p>RDB নেওয়ার জন্য Master process একটি <code>fork()</code> চাইল্ড প্রসেস স্পন করে। ওএস Copy-on-Write ব্যবহার করায় চাইল্ড প্রসেস কম মেমোরিতে স্ন্যাপশট ডিস্কে লেখে।</p>
    `
  },
  {
    id: "redis-33",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Commands", "KEYS vs SCAN", "Performance"],
    question: "KEYS * কমান্ড কেন Production Redis-এ চালানো নিষেধ এবং SCAN Cursor কীভাবে ব্যবহার করবেন?",
    answer: `
<p><code>KEYS *</code> ব্লক করে লাখ লাখ কি স্ক্যান করে সিঙ্গেল থ্রেড আটকে দেয় (Downtime)। <code>SCAN 0 MATCH user:* COUNT 100</code> সেশনের প্রগ্রেস কার্সর ধরে নন-ব্লকিং পেজিনেশন অফার করে।</p>
    `
  },
  {
    id: "redis-34",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Modules", "RedisJSON", "RediSearch"],
    question: "RedisModules (RedisJSON, RediSearch, RedisGraph) কীভাবে Redis-কে ডাইনামিক ডাটাবেজ বানায়?",
    answer: `
<p><strong>RedisJSON:</strong> নেটিভভাবে JSON ডকুমেন্ট স্টোর ও ফিল্ড কোয়েরি করতে সাহায্য করে। <strong>RediSearch:</strong> ইন-মেমোরি ফুল-টেক্সট সার্চ ও ভেক্টর ইনডেক্সিং দেয়।</p>
    `
  },
  {
    id: "redis-35",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Patterns", "Cache-Aside", "Write-Through"],
    question: "Caching Patterns: Cache-Aside vs Write-Through vs Write-Behind Caching-এর পার্থক্য কী?",
    answer: `
<p><strong>Cache-Aside:</strong> অ্যাপ ক্যাশে রিড করে, না পেলে DB থেকে এনে ক্যাশে পুশ করে।</p><p><strong>Write-Through:</strong> অ্যাপ ক্যাশে লেখে, ক্যাশ নিজ দায়িত্বে DB-তে আপডেট করে।</p><p><strong>Write-Behind:</strong> ক্যাশে লেখে এবং ব্যাকগ্রাউন্ডে অ্যাসিনক্রোনাসলি ব্যাচ আকারে DB-তে সিঙ্ক করে।</p>
    `
  },
  {
    id: "redis-36",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Performance", "CLIENT KILL", "Slowlog"],
    question: "Redis Client Connection Management এবং maxclients লিমিট কীভাবে মনিটর করবেন?",
    answer: `
<p><code>CLIENT LIST</code> দিয়ে সংযোগ রিড করা, ঝুলন্ত ক্লায়েন্ট <code>CLIENT KILL</code> দিয়ে ড্রপ করা এবং <code>maxclients</code> সীমা পার হলে নতুন TCP রিকুয়েস্ট ক্যানসেল হওয়া রোধ করা।</p>
    `
  },
  {
    id: "redis-37",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "Lists", "Queues"],
    question: "Redis Lists (LPUSH, RPOP, BRPOP) দিয়ে ব্রাউজার নোটিফিকেশন কিউ কীভাবে তৈরি করবেন?",
    answer: `
<p><code>LPUSH</code> দিয়ে সারিতে ইনসার্ট করা এবং <code>BRPOP key timeout</code> দিয়ে ব্লকিং ওয়েট মেকানিজম করে দ্রুত নোটিফিকেশন তুলে আনা।</p>
    `
  },
  {
    id: "redis-38",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Memory", "Fragmentation Ratio", "MEMORY PURGE"],
    question: "Redis Memory Fragmentation Ratio (mem_fragmentation_ratio) কী এবং active-defrag কীভাবে চালু করবেন?",
    answer: `
<p>ওএস থেকে বরাদ্দকৃত মেমোরি ও রিয়েল Redis মেমোরির অনুপাত। ১.৫ পার হলে মেমোরি ফ্র্যাগমেন্টেশন ঘটে। <code>activedefrag yes</code> দিয়ে অন-দ্য-ফ্লাই ফ্র্যাগমেন্টেশন ফিক্স করা যায়।</p>
    `
  },
  {
    id: "redis-39",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Commands", "MGET", "MSET"],
    question: "Redis MGET / MSET এবং Pipeline-এর মধ্যে পার্থক্য কী?",
    answer: `
<p><code>MGET/MSET</code> কেবল ১টি কমান্ড দিয়ে একই ধরণের মাল্টিপল কি রিড/রাইট করে। Pipelining দিয়ে যেকোনো ধরণের ভিন্ন ভিন্ন কমান্ড ব্যাচ করে পাঠানো যায়।</p>
    `
  },
  {
    id: "redis-40",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Cluster", "Split-Brain", "Min-Replicas"],
    question: "Redis Sentinel / Cluster-এ Split-Brain Condition কীভাবে min-replicas-to-write দিয়ে আটকাবেন?",
    answer: `
<p>নেটওয়ার্ক ব্রেক হলে দুটি Master তৈরি হওয়া আটকায়। <code>min-replicas-to-write 1</code> দিলে যদি অন্তত ১টি মেজোরিটি Replica সিঙ্ক না থাকে, তবে নোডটি রাইট রিজেক্ট করে ডুপ্লিকেট এড়ায়।</p>
    `
  },
  {
    id: "redis-41",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "Sets", "Intersection"],
    question: "Redis Sets (SADD, SINTER, SUNION, SDIFF) দিয়ে Mutual Friends কীভাবে বের করবেন?",
    answer: `
<p><code>SINTER user:1:friends user:2:friends</code> কমান্ড দিয়ে ৫০ms-এর কম সময়ে ২ ইউজারের কমন ফ্রেন্ডদের লিস্ট বের করা যায়।</p>
    `
  },
  {
    id: "redis-42",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["AOF", "AOF Rewrite", "bgrewriteaof"],
    question: "AOF Rewrite (BGREWRITEAOF) প্রসেস কীভাবে AOF ফাইলের আকার ছোট করে?",
    answer: `
<p>ইতিহাসের শত শত কমান্ড মুছে ব্যাকগ্রাউন্ডে বর্তমান মেমোরি স্টেট অনুযায়ী একটি নূন্যতম শর্টেস্ট AOF ফাইল জেনারেট করে।</p>
    `
  },
  {
    id: "redis-43",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Performance", "RESP Protocol", "Serialization"],
    question: "Redis Serialization Protocol (RESP2 / RESP3) কীভাবে কাজ করে?",
    answer: `
<p>RESP হলো সিম্পল বাইনারি-সেফ নেটওয়ার্ক প্রোটোকল যা প্রিক্যালকুলেটেড টাইপ ক্যারেক্টার দিয়ে জিরো-পার্সিং খরচে রিড করা যায়।</p>
    `
  },
  {
    id: "redis-44",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Vector Search", "AI", "HNSW"],
    question: "Redis Vector Search (RediSearch HNSW Index) কী?",
    answer: `
<p>Hierarchical Navigable Small World (HNSW) গ্রাফ ইনডেক্স ব্যবহার করে AI Embeddings-এর ভেক্টর সার্চ মিলি-সেকেন্ড ল্যাটেন্সিতে সম্পন্ন করা।</p>
    `
  },
  {
    id: "redis-45",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Security", "TLS", "stunnel"],
    question: "Redis TLS/SSL Encryption কীভাবে কনফিগার করা হয়?",
    answer: `
<p>Redis 6+ নেটিভ TLS সার্টিফিকেট সাপোর্ট করে। ওল্ড ভার্সনে <code>stunnel</code> প্রক্সি ব্যবহার করে ওপেন সকেট ডাটা ইনক্রিপ্ট করে সিকিউর করা হতো।</p>
    `
  },
  {
    id: "redis-46",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Benchmark", "redis-benchmark", "Tuning"],
    question: "redis-benchmark টুল দিয়ে Redis Throughput (RPS) কীভাবে টেস্ট করবেন?",
    answer: `
<p><code>redis-benchmark -h 127.0.0.1 -p 6379 -c 50 -n 100000</code> কমান্ড দিয়ে ৫০টি প্যারালাল সকেটে ১ লাখ কমান্ড চালিয়ে RPS ও Latency Percentiles চেক করা।</p>
    `
  },
  {
    id: "redis-47",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Lua", "Script Caching", "EVALSHA"],
    question: "SCRIPT LOAD এবং EVALSHA কীভাবে বারবার Lua Script পাঠানো অপটিমাইজ করে?",
    answer: `
<p>সার্ভারে Lua Script বানিয়ে SHA1 হ্যাশ নেওয়া হয়। পরবর্তীতে স্ক্রিপ্ট না পাঠিয়ে কেবল SHA1 হ্যাশ (<code>EVALSHA</code>) পাঠিয়ে ব্যান্ডউইথ সাশ্রয় করা হয়।</p>
    `
  },
  {
    id: "redis-48",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Replication", "PSYNC", "Partial Resync"],
    question: "Redis Master-Replica Replication-এ Full Resync vs Partial Resync (PSYNC) কী?",
    answer: `
<p><strong>Full Resync:</strong> মাস্টার RDB স্ন্যাপশট পাঠিয়ে পুরো মেমোরি রিকপি করায়।</p><p><strong>Partial Resync:</strong> Replication Backlog Buffer ব্যবহার করে কেবল নেটওয়ার্ক অফলাইনের মধ্যবর্তী মিস হওয়া ডাটা সিঙ্ক করে।</p>
    `
  },
  {
    id: "redis-49",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures", "HyperLogLog", "PFMERGE"],
    question: "PFMERGE দিয়ে দুটি HyperLogLog ক্যাশকে কীভাবে অটমিকালি মার্জ করবেন?",
    answer: `
<p><code>PFMERGE target hll1 hll2</code> দিয়ে একাধিক দিনের বা ক্যাটাগরির ইউনিক কাউন্টার মার্জ করে মোটের ওপর ইউনিক কাউন্ট ইনস্ট্যান্ট পাওয়া যায়।</p>
    `
  },
  {
    id: "redis-50",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Ops", "Latency Doctor", "LATENCY LATEST"],
    question: "Redis Latency Monitoring (LATENCY DOCTOR / LATENCY LATEST) দিয়ে ল্যাগ ডেবাগ কীভাবে করবেন?",
    answer: `
<p>ল্যাটেন্সি ইভেন্ট থ্রেশহোল্ড সেট করে <code>LATENCY DOCTOR</code> দিলে Redis মানুষের পাঠযোগ্য ভাষায় কোন অপারেশনে কেন স্লো হয়েছে তার পরামর্শ দেয়।</p>
    `
  }
];
