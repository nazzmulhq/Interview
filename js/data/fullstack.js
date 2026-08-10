

const seniorFullstackQuestions = [
  {
    "id": "sfs-1",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Architecture",
      "Monolith",
      "Microservices"
    ],
    "question": "Monolithic Architecture এবং Microservices Architecture-এর মধ্যে পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    "answer": "\n      <p><strong>Monolithic Architecture:</strong> এখানে ফ্রন্টএন্ড, ব্যাকএন্ড এবং ডাটাবেজ লজিক একটিমাত্র কোডবেস ও ডিপ্লয়েবল ইউনিটের ভেতর থাকে।</p>\n      <ul>\n        <li><strong>সুবিধা:</strong> ডেভেলপমেন্ট ও টেস্টিং সহজ, নেটওয়ার্ক লেটেন্সি কম (কোনো RPC কল নেই), ডিপ্লয়মেন্ট সিঙ্গেল কমান্ডে হয়।</li>\n        <li><strong>অসুবিধা:</strong> অ্যাপ বড় হলে স্কেলিং কঠিন, একটি বাগ পুরো সিস্টেম ক্র্যাশ করতে পারে, টেক স্ট্যাক পরিবর্তন কঠিন।</li>\n      </ul>\n      <p><strong>Microservices Architecture:</strong> অ্যাপ্লিকেশনকে ছোট ছোট স্বাধীন সার্ভিসে ভাগ করা হয়, প্রতিটির নিজস্ব ডাটাবেজ থাকে।</p>\n      <ul>\n        <li><strong>সুবিধা:</strong> ইন্ডিপেন্ডেন্ট স্কেলিং (শুধু কার্ট সার্ভিস স্কেল করা যায়), টেক স্ট্যাকের স্বাধীনতা, ফল্ট আইসোলেশন।</li>\n        <li><strong>অসুবিধা:</strong> ডিস্ট্রিবিউটেড সিস্টেম ম্যানেজ করা জটিল, ডাটা কনসিস্টেন্সি (Distributed Transactions) নিশ্চিত করা কঠিন, নেটওয়ার্ক লেটেন্সি।</li>\n      </ul>\n      <p><strong>সিদ্ধান্ত:</strong> নতুন স্টার্টআপ বা ছোট টিমের জন্য শুরুতে <strong>Modular Monolith</strong> দিয়ে শুরু করা ভালো। যখন টিম বড় হবে এবং স্কেলিংয়ের প্রয়োজন হবে, তখন Microservices-এ যাওয়া উচিত।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Modular Monolith কী — এটি কীভাবে মনোলিথ ও মাইক্রোসার্ভিসের মধ্যে একটি মধ্যবর্তী পথ দেয়?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-2",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "REST",
      "GraphQL",
      "gRPC",
      "Architecture"
    ],
    "question": "REST, GraphQL এবং gRPC-এর মধ্যে পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    "answer": "\n      <ul>\n        <li><strong>REST:</strong> HTTP প্রোটোকলের ওপর ভিত্তি করে কাজ করে। Resource ভিত্তিক (GET, POST, PUT, DELETE)। \n          <br><em>ব্যবহার:</em> পাবলিক API, ক্র্যাশিং সহজ, ক্যাশিং (HTTP Caching) বিল্ট-ইন। তবে Over-fetching বা Under-fetching সমস্যা থাকে।</li>\n        <li><strong>GraphQL:</strong> ক্লায়েন্ট ঠিক যা দরকার শুধু তা রিকোয়েস্ট করে (Single Endpoint)। \n          <br><em>ব্যবহার:</em> মোবাইল অ্যাপে যেখানে কম ডেটা ট্রান্সফার করা জরুরি, বা একাধিক ডাটাবেজ থেকে একত্রিত ডেটা দেখাতে। তবে সার্ভারে N+1 কুয়েরি সমস্যা ও ক্যাশিং জটিল।</li>\n        <li><strong>gRPC:</strong> Google-এর তৈরি Protobuf (Binary format) ব্যবহার করে। HTTP/2-এর ওপর চলে। দ্রুতগতির ও লাইটওয়েট। \n          <br><em>ব্যবহার:</em> ইন্টারনাল মাইক্রোসার্ভিস কমিউনিকেশন (Service-to-Service), রিয়েল-টাইম স্ট্রিমিং। ব্রাউজার সরাসরি সাপোর্ট করে না (gRPC-Web লাগে)।</li>\n      </ul>\n      <p><strong>সিদ্ধান্ত:</strong> ক্লায়েন্ট-ফেসিং API-এর জন্য REST বা GraphQL এবং ব্যাকএন্ড সার্ভিসগুলোর মধ্যে কমিউনিকেশনের জন্য gRPC ব্যবহার করা আধুনিক বেস্ট প্র্যাকটিস।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>GraphQL-এ over-fetching সমস্যা সমাধান হলেও N+1 query সমস্যা কীভাবে দেখা দেয় এবং DataLoader কীভাবে সমাধান করে?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-3",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Transactions",
      "Microservices",
      "Saga Pattern"
    ],
    "question": "Microservices Architecture-এ Distributed Transaction (যেমন- E-commerce Order Placing) কীভাবে হ্যান্ডেল করবেন?",
    "answer": "\n      <p>মাইক্রোসার্ভিসে একটি অর্ডার করতে গেলে Payment, Inventory, এবং Shipping—তিনটি আলাদা ডাটাবেজ আপডেট হতে হয়। এখানে ঐতিহ্যিক 2-Phase Commit (2PC) খুব স্লো ও ব্লকিং। এটি সমাধানের জন্য <strong>Saga Pattern</strong> ব্যবহৃত হয়।</p>\n      <h4>Saga Pattern-এর ২টি ধরন:</h4>\n      <ol>\n        <li><strong>Choreography-based Saga:</strong> কোনো সেন্ট্রাল কো-অর্ডিনেটর নেই। প্রতিটি সার্ভিস একটি ইভেন্ট পাবলিশ করে (যেমন- Kafka-এ), এবং অন্য সার্ভিস সেটি লিসেন করে নেক্সট স্টেপ সম্পন্ন করে。\n          <br><em>সমস্যা:</em> ডিবাগ করা কঠিন, সাইক্লিক ডিপেন্ডেন্সি তৈরি হতে পারে।</li>\n        <li><strong>Orchestration-based Saga:</strong> একটি সেন্ট্রাল কো-অর্ডিনেটর (Orchestrator) থাকে। সে প্রতিটি সার্ভিসকে কমান্ড দেয় এবং রেসপন্স পেয়ে পরের স্টেপ ডিসাইড করে। যদি কোনো স্টেপ ফেইল করে, Orchestrator Compensating Transactions (Rollback logic) চালায়। \n          <br><em>সুবিধা:</em> বিজনেস লজিক ক্লিয়ার, ডিবাগিং সহজ।</li>\n      </ol>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Choreography-based ও Orchestration-based Saga-এর মধ্যে পার্থক্য কী — কোনটি কখন বেছে নেবেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-4",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Authentication",
      "JWT",
      "Cookies",
      "CSRF"
    ],
    "question": "Fullstack অ্যাপ্লিকেশনে JWT এবং Session-based Authentication-এর মধ্যে কখন কোনটি বেছে নেবেন? Security best practices কী?",
    "answer": "\n      <p><strong>Session-based (Stateful):</strong> সার্ভারে সেশন স্টোর করা থাকে (Redis-এ), ক্লায়েন্টে শুধু Session ID কুকিতে থাকে।</p>\n      <ul>\n        <li><strong>ব্যবহার:</strong> যেখানে স্টেট ট্র্যাক করা দরকার, ইউজারকে সাথে সাথে লগআউট করানো দরকার। নিরাপত্তা বেশি (HttpOnly কুকি ব্যবহার করলে XSS থেকে বাঁচা যায়)।</li>\n      </ul>\n      <p><strong>JWT (Stateless):</strong> টোকেনের ভেতরেই ইউজার ডেটা এনক্রিপ্টেড থাকে। সার্ভারে কিছু স্টোর করতে হয় না।</p>\n      <ul>\n        <li><strong>ব্যবহার:</strong> মাইক্রোসার্ভিস আর্কিটেকচার, মোবাইল অ্যাপ, বা স্টেটলেস API-তে।</li>\n      </ul>\n      <h4>Security Best Practices (JWT-এর জন্য):</h4>\n      <ol>\n        <li><strong>Storage:</strong> JWT কখনো <code>localStorage</code>-এ রাখবেন না (XSS অ্যাটাকে চুরি হতে পারে)। এটি <code>HttpOnly, Secure, SameSite=Strict</code> কুকিতে রাখুন।</li>\n        <li><strong>Short-lived Access Token:</strong> Access Token-এর মেয়াদ ১৫ মিনিট রাখুন।</li>\n        <li><strong>Refresh Token Rotation:</strong> রিফ্রেশ টোকেন দিয়ে নতুন অ্যাক্সেস টোকেন আনার সময় রিফ্রেশ টোকেনটিও পরিবর্তন করুন (Reuse Detection)।</li>\n        <li><strong>CSRF Protection:</strong> কুকি ব্যবহার করলে অবশ্যই Anti-CSRF Token ব্যবহার করুন।</li>\n      </ol>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>JWT স্টেটলেস হওয়ার সুবিধা কী, কিন্তু revocation (লগআউট/ব্যান) কেন কঠিন হয়ে যায়?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-5",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Caching",
      "Redis",
      "Fullstack"
    ],
    "question": "একটি হাই-ট্রাফিক অ্যাপ্লিকেশনে Multi-layer Caching Strategy কীভাবে ডিজাইন করবেন?",
    "answer": "\n      <p>ডাটাবেজ প্রেশার কমাতে এবং রেসপন্স টাইম ফাস্ট করতে মাল্টি-লেয়ার ক্যাশিং ব্যবহৃত হয়।</p>\n      <ol>\n        <li><strong>Layer 1: Client/Browser Cache:</strong> HTTP Headers (<code>Cache-Control: max-age=3600</code>, <code>ETag</code>) দিয়ে স্ট্যাটিক অ্যাসেট (JS, CSS, Images) ব্রাউজারে ক্যাশ করা।</li>\n        <li><strong>Layer 2: CDN Cache (Edge Caching):</strong> Cloudflare বা AWS CloudFront ব্যবহার করে ডাটা বিশ্বের বিভিন্ন এজ লোকেশনে ক্যাশ করা। API রেসপন্সও CDN-এ ক্যাশ করা যায়।</li>\n        <li><strong>Layer 3: Application Cache (Redis/Memcached):</strong> ব্যাকএন্ডে ডাটাবেজ কুয়েরির রেজাল্ট বা ইউজার সেশন Redis-এ রাখা। (যেমন- <code>GET user:123</code>)।</li>\n        <li><strong>Layer 4: Database Cache:</strong> PostgreSQL-এর <code>shared_buffers</code> বা MySQL-এর <code>InnoDB Buffer Pool</code>।</li>\n      </ol>\n      <h4>Cache Invalidation:</h4>\n      <p>ক্যাশ ডেটা পুরোনো হয়ে গেলে (Stale), এটি আপডেট করা জরুরি। সবচেয়ে নিরাপদ উপায় হলো Write-through Cache (ডাটাবেজ আপডেটের সাথে সাথে ক্যাশ আপডেট করা) অথবা TTL (Time-to-Live) সেট করা।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Browser cache, CDN, Redis, ও DB query cache — এই চার স্তরের মধ্যে কোনটি invalidate করা সবচেয়ে ঝুঁকিপূর্ণ এবং কেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-7",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "CI/CD",
      "Zero Downtime",
      "Deployment"
    ],
    "question": "Zero-Downtime Deployment (Blue-Green বা Canary) কী? এগুলোর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>প্রোডাকশনে নতুন কোড ডিপ্লয় করার সময় ইউজারদের কোনো ডাউনটাইম বা এরর দেখা যাবে না, এমন প্রক্রিয়াকে Zero-Downtime Deployment বলে।</p>\n      <ul>\n        <li><strong>Blue-Green Deployment:</strong> দুটি আলাদা পরিবেশ থাকে। Blue (বর্তমান ভার্সন) এবং Green (নতুন ভার্সন)। নতুন ভার্সন Green-এ ডিপ্লয় করে টেস্ট করা হয়। সব ঠিক থাকলে Router বা Load Balancer সাথে সাথে ট্রাফিক Blue থেকে Green-এ ঘুরিয়ে দেয় (Switch)। সম্পূর্ণ ট্রাফিক একসাথে নতুন ভার্সনে যায়।</li>\n        <li><strong>Canary Deployment:</strong> এখানে ট্রাফিক একসাথে সব ঘুরিয়ে দেওয়া হয় না। প্রথমে মাত্র ৫% ট্রাফিক নতুন ভার্সনে পাঠানো হয়। মনিটর করে দেখা হয় বাগ বা হাই ক্যাপাসিটি হচ্ছে কি না। সব ঠিক থাকলে ধীরে ধীরে ২৫%, ৫০%, ১০০% ট্রাফিক নতুন ভার্সনে শিফট করা হয়।</li>\n      </ul>\n      <p><em>ব্যবহার:</em> ছোট অ্যাপের জন্য Blue-Green ভালো, কিন্তু Enterprise বা হাই-রিস্ক অ্যাপের জন্য Canary Deployment বেশি নিরাপদ।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>ডেটাবেজ মাইগ্রেশন জড়িত থাকলে Blue-Green deployment কীভাবে backward-compatible রাখতে হয়?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-8",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Scalability",
      "Rate Limiting",
      "API Gateway"
    ],
    "question": "API Gateway কী? এটি কেন প্রয়োজন এবং এতে Rate Limiting কীভাবে কাজ করে?",
    "answer": "\n      <p>মাইক্রোসার্ভিসে ক্লায়েন্ট যদি সরাসরি প্রতিটি সার্ভিসের সাথে কথা বলে, তবে CORS, Auth, ও রাউটিং ম্যানেজ করা কঠিন। <strong>API Gateway</strong> হলো একটি সিঙ্গেল এন্ট্রি পয়েন্ট যা সকল ক্লায়েন্ট রিকোয়েস্ট গ্রহণ করে এবং সঠিক সার্ভিসে পাঠায়।</p>\n      <h4>API Gateway-এর কাজ:</h4>\n      <ul>\n        <li><strong>Authentication & Authorization:</strong> JWT টোকেন ভ্যালিডেট করা।</li>\n        <li><strong>Rate Limiting & Throttling:</strong> কোনো ক্লায়েন্ট যেন অতিরিক্ত রিকোয়েস্ট না পাঠায় তা নিয়ন্ত্রণ করা।</li>\n        <li><strong>Load Balancing:</strong> রিকোয়েস্ট বিভিন্ন সার্ভারে ভাগ করা।</li>\n        <li><strong>Request Aggregation:</strong> একাধিক সার্ভিস থেকে ডাটা এনে একত্রিত করে ক্লায়েন্টকে দেওয়া।</li>\n      </ul>\n      <h4>Rate Limiting Strategy (Token Bucket Algorithm):</h4>\n      <p>সবচেয়ে বেশি ব্যবহৃত অ্যালগরিদম। এখানে প্রতি ক্লায়েন্টের জন্য একটি বালতি (Bucket) থাকে যাতে নির্দিষ্ট সংখ্যক টোকেন (যেমন- ১০০টি) থাকে। প্রতি রিকোয়েস্টে ১টি টোকেন কমে। টোকেন শেষ হলে <code>429 Too Many Requests</code> এরর দেওয়া হয়। প্রতি সেকেন্ডে বালতিতে নতুন টোকেন যোগ হতে থাকে (Refill rate)। এটি Redis ব্যবহার করে ডিস্ট্রিবিউটেড সিস্টেমে ম্যানেজ করা হয়।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>API Gateway নিজেই single point of failure হয়ে যেতে পারে — কীভাবে এটি HA করবেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sfs-9",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "CAP Theorem",
      "NoSQL",
      "Distributed System"
    ],
    "question": "CAP Theorem কী? NoSQL ডাটাবেজ নির্বাচনের ক্ষেত্রে এটি কীভাবে প্রভাব ফেলে?",
    "answer": "\n      <p><strong>CAP Theorem</strong> বলে যে, একটি ডিস্ট্রিবিউটেড ডাটাবেজ সিস্টেম নিচের ৩টির মধ্যে একসাথে কেবল ২টি গ্যারান্টি দিতে পারে:</p>\n      <ol>\n        <li><strong>Consistency (C):</strong> সকল নোড একই সময়ে একই ডাটা দেখাবে।</li>\n        <li><strong>Availability (A):</strong> সিস্টেমে কোনো নোড ফেইল করলেও প্রতিটি রিকোয়েস্ট রেসপন্স পাবে (সফল বা এরর)।</li>\n        <li><strong>Partition Tolerance (P):</strong> নোডগুলোর মধ্যে নেটওয়ার্ক কানেকশন বিচ্ছিন্ন (Partition) হলেও সিস্টেম চালু থাকবে।</li>\n      </ol>\n      <p>যেহেতু নেটওয়ার্ক ফেইলিওর সবসময় ঘটতে পারে, তাই 'P' বাদ দেওয়া যায় না। ফলে আমাদের <strong>CP</strong> বা <strong>AP</strong> বেছে নিতে হয়।</p>\n      <ul>\n        <li><strong>CP Databases (Consistency + Partition Tolerance):</strong> নেটওয়ার্ক পার্টিশন হলে ডাটা কনসিস্টেন্সি রাখার জন্য সিস্টেম কিছু নোডকে আনঅ্যাভেইলেবল করে দেয়। (যেমন- HBase, MongoDB)। <em>ব্যবহার:</em> ব্যাংকিং বা ফিন্যান্সিয়াল সিস্টেম।</li>\n        <li><strong>AP Databases (Availability + Partition Tolerance):</strong> নেটওয়ার্ক পার্টিশন হলেও সিস্টেম সবসময় অ্যাভেইলেবল থাকে, কিন্তু কিছু নোডে পুরোনো ডাটা (Eventual Consistency) দেখাতে পারে। (যেমন- Cassandra, DynamoDB)। <em>ব্যবহার:</em> সোশ্যাল মিডিয়া ফিড, শপিং কার্ট।</li>\n      </ul>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>PACELC থিওরেম CAP-এর তুলনায় কী অতিরিক্ত বিবেচনা যোগ করে (নেটওয়ার্ক পার্টিশন না থাকা অবস্থাতেও)?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-1",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Scalability",
      "High Traffic",
      "Architecture"
    ],
    "question": "আপনার অ্যাপ্লিকেশনে হঠাৎ ১ সেকেন্ডে ১০,০০০ (10K) রিকোয়েস্ট এলে (Traffic Spike) আপনি কীভাবে হ্যান্ডেল করবেন?",
    "answer": "\n      <p>১০ হাজার রিকোয়েস্ট পার সেকেন্ড (RPS) হ্যান্ডেল করার জন্য একটি মাল্টি-লেয়ার্ড স্কেলিং স্ট্র্যাটেজি প্রয়োজন:</p>\n      <ol>\n        <li><strong>Load Balancing:</strong> একটি বা একাধিক Load Balancer (যেমন- Nginx, AWS ALB) ব্যবহার করে রিকোয়েস্টগুলো একাধিক অ্যাপ্লিকেশন সার্ভারের মধ্যে বিতরণ (Round-robin বা Least connections) করতে হবে।</li>\n        <li><strong>Horizontal Scaling (Auto-scaling):</strong> সার্ভার ইনস্ট্যান্স সংখ্যা স্বয়ংক্রিয়ভাবে বাড়াতে হবে (Kubernetes HPA বা AWS Auto Scaling)।</li>\n        <li><strong>Caching Layer (Redis/Memcached):</strong> ডাটাবেজে চাপ নামিয়ে আনতে Read-heavy ডাটা Redis-এ ক্যাশ করা। ৯০% রিকোয়েস্ট ক্যাশ থেকে সার্ভ করলে ডাটাবেজ সেফ থাকে।</li>\n        <li><strong>Asynchronous Processing (Message Queue):</strong> যেসব কাজে সময় বেশি লাগে (যেমন- ইমেইল পাঠানো, রিপোর্ট জেনারেট করা) সেগুলো RabbitMQ বা Kafka-এর মাধ্যমে Background Job-এ পাঠিয়ে দেওয়া।</li>\n        <li><strong>Database Optimization:</strong> Read Replicas ব্যবহার করে Read লোড ভাগ করা এবং Connection Pooling (PgBouncer) নিশ্চিত করা।</li>\n        <li><strong>Rate Limiting & Throttling:</strong> অতিরিক্ত বা বট রিকোয়েস্ট আটকাতে API Gateway লেভেলে Rate Limiter ব্যবহার করা।</li>\n      </ol>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Auto-scaling চালু হতে কয়েক মিনিট সময় লাগে — সেই gap-এর মধ্যে ট্রাফিক স্পাইক এলে কী করবেন?</li>\n        <li>Rate limiter নিজেই bottleneck হয়ে যেতে পারে কি — কীভাবে distributed rate limiting স্কেল করবেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-2",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Idempotency",
      "Reliability",
      "API Design"
    ],
    "question": "API-তে Idempotency কী? Payment API-তে Idempotency Key কেন এবং কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p><strong>Idempotency</strong> হলো এমন একটি API ডিজাইন প্রিন্সিপল যেখানে একই রিকোয়েস্ট একাধিকবার পাঠালেও সার্ভারের স্টেট ঠিক একবারই পরিবর্তিত হবে।</p>\n      <h4>কেন প্রয়োজন?</h4>\n      <p>নেটওয়ার্ক টাইমআউট বা ক্লায়েন্ট এররের কারণে ইউজার যদি \"Pay\" বাটনে দুবার ক্লিক করে বা রিকোয়েস্ট রিট্রাই হয়, তবে ইউজারের অ্যাকাউন্ট থেকে দুবার টাকা কাটা উচিত নয়।</p>\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>// Client sends a unique UUID in the header\n// POST /api/payments\n// Headers: { \"Idempotency-Key\": \"a1b2c3d4-e5f6\" }\n\nasync function processPayment(req, res) {\n  const idempotencyKey = req.headers['idempotency-key'];\n  \n  // 1. Check if key exists in Redis/DB\n  const cachedResponse = await redis.get(`idem:${idempotencyKey}`);\n  if (cachedResponse) {\n    return res.status(200).json(JSON.parse(cachedResponse)); // Return previous success\n  }\n\n  // 2. Process payment\n  const result = await paymentGateway.charge(req.body);\n\n  // 3. Save result with key (TTL 24 hours)\n  await redis.set(`idem:${idempotencyKey}`, JSON.stringify(result), 'EX', 86400);\n\n  return res.status(201).json(result);\n}</code></pre>\n      </div>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Idempotency key কতক্ষণ সংরক্ষণ করে রাখা উচিত, এবং কোথায় (Redis/DB)?</li>\n        <li>দুটি রিকোয়েস্ট একই idempotency key নিয়ে ঠিক একই সময়ে (concurrent) এলে কী হবে?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-3",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Concurrency",
      "Distributed Lock",
      "Redis"
    ],
    "question": "Race Condition কী? Distributed System-এ Ticket Booking (যেমন- ১টি সিট ২ জন বুক করতে চাইছে) কীভাবে আটকাবেন?",
    "answer": "\n      <p>যখন দুই বা ততোধিক ইউজার একই সময়ে একই রিসোর্স (যেমন- শেষ ১টি ফ্লাইট টিকিট) বুক করতে চায়, তখন Race Condition ঘটে। এটি সমাধানের জন্য <strong>Distributed Lock</strong> ব্যবহার করতে হয়।</p>\n      <h4>Redis-ভিত্তিক Redlock Algorithm:</h4>\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const redis = require('redis');\nconst client = redis.createClient();\n\nasync function bookTicket(userId, flightId) {\n  const lockKey = `lock:flight:${flightId}`;\n  const lockTimeout = 10; // seconds\n  \n  // 1. Acquire Lock (SET NX = Only if not exists)\n  const acquired = await client.set(lockKey, userId, 'NX', 'EX', lockTimeout);\n  \n  if (acquired === 'OK') {\n    try {\n      // 2. Check seat availability & Book ticket\n      const seatAvailable = await checkAvailability(flightId);\n      if (seatAvailable) {\n        await confirmBooking(flightId, userId);\n        return { success: true };\n      }\n      return { success: false, error: 'Sold out' };\n    } finally {\n      // 3. Release Lock (must verify owner before deleting)\n      await client.del(lockKey);\n    }\n  } else {\n    return { success: false, error: 'Someone else is booking. Try again.' };\n  }\n}</code></pre>\n      </div>\n      <p><strong>গুরুত্বপূর্ণ:</strong> লকের সাথে <code>EX</code> (expiry) সবসময় সেট করা আবশ্যক — নাহলে যে প্রসেস লক নিয়েছে সেটি ক্র্যাশ করলে লক চিরকাল আটকে থাকবে (deadlock), অন্য কোনো ইউজার কখনও বুক করতে পারবে না।</p>\n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Redis single instance ডাউন হলে distributed lock-এর কী হয় — Redlock অ্যালগরিদম কীভাবে এই ঝুঁকি কমায়?</li>\n        <li>Pessimistic locking (<code>SELECT ... FOR UPDATE</code>) বনাম optimistic locking (version column) — কোনটি এই কেসে বেশি উপযুক্ত?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-4",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Caching",
      "Cache Stampede",
      "Performance"
    ],
    "question": "Cache Stampede (Thundering Herd) সমস্যা কী এবং এটি প্রতিরোধের উপায় কী?",
    "answer": "\n      <p>যখন ক্যাশে থাকা কোনো জনপ্রিয় ডাটার মেয়াদ (TTL) শেষ হয়ে যায়, তখন হাজার হাজার রিকোয়েস্ট একই সময়ে ক্যাশ মিস করে একসাথে ডাটাবেজে পাল্টা (Fallback) করে। এতে ডাটাবেজ সাথে সাথে ক্র্যাশ করে। একে <strong>Cache Stampede</strong> বলে।</p>\n      <h4>সমাধান:</h4>\n      <ol>\n        <li><strong>Mutex Lock (Early Refresh):</strong> একটি রিকোয়েস্ট ডাটাবেজ থেকে ডাটা আনার জন্য Lock ধরে, বাকি রিকোয়েস্টগুলো অপেক্ষা করে বা পুরোনো ক্যাশ ডাটাই দেখায়।</li>\n        <li><strong>XFetch Algorithm:</strong> TTL-এর বেশিরভাগ সময় শেষ হলে, ব্যাকগ্রাউন্ডে অল্প সম্ভাবনার (Probabilistic) ভিত্তিতে ক্যাশ রিফ্রেশ শুরু করা।</li>\n      </ol>\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>// Mutex Lock based Cache Update\nasync function getDataWithMutex(key) {\n  let data = await cache.get(key);\n  if (data) return data;\n  \n  // Try to acquire lock\n  const lockAcquired = await redis.set(`lock:${key}`, '1', 'NX', 'EX', 5);\n  \n  if (lockAcquired) {\n    // Fetch from DB and update cache\n    data = await db.query(key);\n    await cache.set(key, data, 'EX', 3600);\n    await redis.del(`lock:${key}`);\n    return data;\n  } else {\n    // Wait for the other request to finish, or return stale data\n    await sleep(100);\n    return getDataWithMutex(key); \n  }\n}</code></pre>\n      </div>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Probabilistic early expiration কীভাবে cache stampede-এর ঝুঁকি কমায়?</li>\n        <li>Stale-while-revalidate প্যাটার্ন কীভাবে এই সমস্যায় সাহায্য করে?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-5",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Resilience",
      "Circuit Breaker",
      "Microservices"
    ],
    "question": "Microservices Architecture-এ Circuit Breaker Pattern কী এবং এটি কেন জরুরি?",
    "answer": "\n      <p>যখন একটি সার্ভিস (Service A) অন্য একটি সার্ভিসের (Service B) ওপর নির্ভরশীল, আর Service B ডাউন হয়ে গেলে Service A থেকে রিকোয়েস্ট টাইমআউট হতে থাকে। এতে Thread Pool বা কানেকশন শেষ হয়ে Service A-ও ক্র্যাশ করে (Cascade Failure)।</p>\n      <h4>Circuit Breaker-এর ৩টি State:</h4>\n      <ol>\n        <li><strong>Closed (Normal):</strong> সব রিকোয়েস্ট স্বাভাবিকভাবে Service B-তে যায়।</li>\n        <li><strong>Open (Tripped):</strong> যদি এরর রেট একটি থ্রেশহোল্ড (যেমন ৫০%) ছাড়িয়ে যায়, Circuit ব্রেক হয়। এরপর কোনো রিকোয়েস্ট Service B-তে যায় না, সাথে সাথে Fallback রেসপন্স বা Error ফেরত দেওয়া হয়।</li>\n        <li><strong>Half-Open (Testing):</strong> কিছুক্ষণ পর কয়েকটি লিমিটেড রিকোয়েস্ট পাঠানো হয় দেখার জন্য Service B সেরেছে কি না। সফল হলে Circuit আবার Closed হয়।</li>\n      </ol>\n      <p>Open অবস্থায় থাকাকালীন রিকোয়েস্ট downstream সার্ভিসে পাঠানোই হয় না — সাথে সাথে একটি fallback response বা এরর দেওয়া হয়। এটি একটি <strong>ইতিমধ্যে ব্যর্থ সার্ভিসকে আরও রিকোয়েস্ট দিয়ে চাপ না দিয়ে</strong> তাকে সুস্থ হওয়ার সময় দেয় — এবং caller-কেও দ্রুত ব্যর্থতা জানিয়ে দেয়, টাইমআউটের জন্য অপেক্ষা করাতে হয় না।</p>\n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Circuit Breaker ও Retry pattern একসাথে ব্যবহার করলে কী সতর্কতা মাথায় রাখতে হয়?</li>\n        <li>Half-Open অবস্থায় একসাথে কয়টি টেস্ট রিকোয়েস্ট পাঠানো উচিত এবং কেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-8",
    "category": "Full-Stack",
    "difficulty": "Intermediate",
    "tags": [
      "SOLID",
      "OOP",
      "Design Principles"
    ],
    "question": "SOLID Principles কী? ব্যাকএন্ড ডেভেলপমেন্টে এর গুরুত্ব ব্যাখ্যা করুন।",
    "answer": "\n      <p>SOLID হলো OOP-এর ৫টি মূলনীতি, যা কোডকে মেইনটেইনেবল, স্কেলেবল এবং টেস্টেবল করে তোলে:</p>\n      <ol>\n        <li><strong>S - Single Responsibility Principle (SRP):</strong> একটি ক্লাসের শুধু একটি কারণ থাকতে হবে পরিবর্তনের জন্য। (যেমন- <code>UserService</code> শুধু ইউজার লজিক হ্যান্ডেল করবে, ইমেইল পাঠাবে না)।</li>\n        <li><strong>O - Open/Closed Principle (OCP):</strong> ক্লাস এক্সটেনশনের জন্য খোলা (Open), কিন্তু মডিফিকেশনের জন্য বন্ধ (Closed) থাকতে হবে। (নতুন ফিচার আসলে পুরোনো কোড না বদলে নতুন ক্লাস যোগ করতে হবে)।</li>\n        <li><strong>L - Liskov Substitution Principle (LSP):</strong> প্যারেন্ট ক্লাসের জায়গায় চাইল্ড ক্লাস বসালে প্রোগ্রামের আচরণ ভাঙতে নয়।</li>\n        <li><strong>I - Interface Segregation Principle (ISP):</strong> একটি বড় ইন্টারফেসের বদলে ছোট ছোট স্পেসিফিক ইন্টারফেস থাকা উচিত। ক্লাসকে এমন মেথড ইমপ্লিমেন্ট করতে বাধ্য করা উচিত নয় যা তার দরকার নেই।</li>\n        <li><strong>D - Dependency Inversion Principle (DIP):</strong> হাই-লেভেল মডিউল লো-লেভেল মডিউলের ওপর নির্ভর করবে না, বরং দুজনেই Abstraction (Interface)-এর ওপর নির্ভর করবে। (Dependency Injection এর মাধ্যমে এটি করা হয়)।</li>\n      </ol>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Single Responsibility ও Open/Closed নীতি বাস্তবে কীভাবে conflict করতে পারে — একটি উদাহরণ দিন?</li>\n      </ul>\n    "
  },
  {
    "id": "sr-12",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Long Polling",
      "WebSocket",
      "Real-time"
    ],
    "question": "Real-time Notification System ডিজাইন করতে বলা হলে। WebSocket vs Server-Sent Events (SSE) vs Long Polling— কোনটি বেছে নেবেন এবং কেন?",
    "answer": "\n      <p>রিয়েল-টাইম কমিউনিকেশনের জন্য এই তিনটির মধ্যে পছন্দ নির্ভর করে ইউজ-কেসের ওপর:</p>\n      <ul>\n        <li><strong>Long Polling:</strong> ক্লায়েন্ট রিকোয়েস্ট পাঠায়, সার্ভার নতুন ডাটা না আসা পর্যন্ত হোল্ড করে রাখে। <em>(ব্যবহার:</em> খুব বেশি রিয়েল-টাইম দরকার নেই, লেগেসি সিস্টেম)। এতে সার্ভারের রিসোর্স নষ্ট হয়।</li>\n        <li><strong>Server-Sent Events (SSE):</strong> একমুখী (Server to Client)। HTTP কানেকশন ওপেন রেখে সার্ভার থেকে ক্লায়েন্টে ডাটা পাঠানো হয়। <em>(ব্যবহার:</em> স্টক মার্কেট টিকার, নোটিফিকেশন বেল)। সেটআপ সহজ এবং HTTP/2 তে ভালো স্কেল করে।</li>\n        <li><strong>WebSocket:</strong> দ্বিমুখী (Bi-directional)। ক্লায়েন্ট এবং সার্ভার উভয়েই যেকোনো সময় ডাটা পাঠাতে পারে। <em>(ব্যবহার:</em> চ্যাট অ্যাপ, মাল্টিপ্লেয়ার গেম)। স্কেলিং কিছুটা জটিল (Redis Pub/Sub লাগে)।</li>\n      </ul>\n      <h4>সিদ্ধান্ত:</h4>\n      <p>যদি শুধু সার্ভার থেকে ইউজারকে নোটিফিকেশন পাঠাতে হয়, তবে <strong>SSE</strong> সবচেয়ে ভালো ও লাইটওয়েট চয়েজ। আর ইউজারের থেকেও রিয়েল-টাইম মেসেজ আসবে (যেমন চ্যাট), সেক্ষেত্রে <strong>WebSocket</strong>।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>WebSocket সংযোগ স্কেল করতে হলে (হাজার হাজার concurrent connection) কী আর্কিটেকচার লাগবে (sticky session, Redis pub-sub)?</li>\n        <li>SSE-এর তুলনায় WebSocket কেন বেশি রিসোর্স-ইনটেনসিভ?</li>\n      </ul>\n    "
  },
  {
    "id": "sfe-1",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Architecture",
      "Micro Frontend",
      "Scalability"
    ],
    "question": "Micro Frontend Architecture কী এবং কখন এটি ব্যবহার করা উচিত?",
    "answer": "\n      <p><strong>Micro Frontend (MFE)</strong> হলো এমন একটি আর্কিটেকচারাল স্টাইল যেখানে একটি বৃহৎ ফ্রন্টএন্ড অ্যাপ্লিকেশনকে ছোট ছোট, স্বাধীন এবং ডিপ্লয়েবল মাইক্রো অ্যাপে ভাগ করা হয়। ব্যাকএন্ডের Microservices-এর মতোই ফ্রন্টএন্ডে এর প্রয়োগ।</p>\n      <h4>কখন ব্যবহার করবেন?</h4>\n      <ul>\n        <li>যখন অ্যাপ্লিকেশনটি অনেক বড় হয়ে যায় এবং একটি একক রিপোজিটরি (Monolith) ম্যানেজ করা কঠিন হয়।</li>\n        <li>একাধিক টিম (যেমন- Amazon-এর Checkout টিম, Search টিম) আলাদাভাবে কাজ করতে চাইলে।</li>\n        <li>বিভিন্ন টিম তাদের নিজস্ব টেক স্ট্যাক (React, Vue, Angular) ব্যবহার করতে চাইলে।</li>\n      </ul>\n      <h4>সুবিধা ও অসুবিধা:</h4>\n      <p><strong>সুবিধা:</strong> Independent deployment, Codebase isolation, Team autonomy.<br>\n      <strong>অসুবিধা:</strong> UI Inconsistency, Bundle size বেড়ে যাওয়া (একই লাইব্রেরি একাধিক বার লোড হতে পারে), Cross-app communication জটিলতা।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Micro Frontend-এ একাধিক টিমের ডিজাইন সিস্টেম কীভাবে সামঞ্জস্যপূর্ণ রাখবেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sfe-5",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Core Web Vitals",
      "LCP",
      "CLS",
      "INP"
    ],
    "question": "Core Web Vitals (LCP, CLS, INP) কী এবং সিনিয়র ডেভেলপার হিসেবে আপনি এগুলো কীভাবে অপটিমাইজ করবেন?",
    "answer": "\n      <p>Core Web Vitals হলো Google-এর প্রস্তাবিত মেট্রিক্স যা একটি ওয়েব পেজের ইউজার এক্সপেরিয়েন্স মাপে।</p>\n      <ol>\n        <li><strong>LCP (Largest Contentful Paint):</strong> পেজের সবচেয়ে বড় এলিমেন্ট (যেমন- Hero Image) লোড হতে কত সময় লাগে। (Target: < 2.5s)।\n          <ul><li><em>অপটিমাইজেশন:</em> Image optimization (WebP/AVIF), Lazy loading, CDN ব্যবহার, Render-blocking CSS/JS সরিয়ে ফেলা।</li></ul>\n        </li>\n        <li><strong>CLS (Cumulative Layout Shift):</strong> পেজ লোড হওয়ার সময় এলিমেন্টগুলো কতটা নড়াচড়া করে। (Target: < 0.1)।\n          <ul><li><em>অপটিমাইজেশন:</em> ছবি বা ভিডিওর জন্য আগে থেকে <code>width</code> ও <code>height</code> সেট করা, Font swap এড়াতে <code>font-display: swap</code> ব্যবহার করা, ডায়নামিক এড স্লটের জন্য মিনিমাম হাইট রাখা।</li></ul>\n        </li>\n        <li><strong>INP (Interaction to Next Paint):</strong> ইউজার ক্লিক বা টাইপ করার পর স্ক্রিনে রেসপন্স দেখতে কত সময় লাগে। (FID এর বদলে এটি এসেছে, Target: < 200ms)।\n          <ul><li><em>অপটিমাইজেশন:</em> Main Thread ব্লক না করা, Heavy computation Web Workers-এ পাঠানো, Debouncing/Throttling ব্যবহার করা।</li></ul>\n        </li>\n      </ol>\n    "
  },
  {
    "id": "sfe-6",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "State Management",
      "Redux",
      "React Query"
    ],
    "question": "Global State (Redux) এবং Server State (React Query) এর মধ্যে পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    "answer": "\n      <p>আধুনিক ফ্রন্টএন্ড আর্কিটেকচারে State-কে দুই ভাগে ভাগ করা হয়:</p>\n      <ul>\n        <li><strong>Client State:</strong> ইউজারের UI-এর সাথে সরাসরি সম্পর্কিত ডেটা। যেমন- Theme (Dark/Light), Sidebar open/close, Form input values।</li>\n        <li><strong>Server State:</strong> সার্ভার থেকে আসা ডেটা। যেমন- User Profile, Product List, Dashboard stats। এটি অ্যাসিনক্রোনাস এবং পুরোনো হয়ে যেতে পারে (Stale)।</li>\n      </ul>\n      <h4>কখন কোনটি?</h4>\n      <p><strong>React Query / SWR:</strong> Server State ম্যানেজ করার জন্য সেরা। এটি অটোমেটিক্যালি Caching, Background Refetching, এবং Pagination হ্যান্ডল করে। Redux-এ এই কাজগুলো ম্যানুয়ালি করতে হয় (Boilerplate code বাড়ে)।<br>\n      <strong>Redux / Zustand:</strong> শুধু Client State বা অ্যাপ্লিকেশনের গ্লোবাল UI লজিক ম্যানেজ করার জন্য ব্যবহার করা উচিত।</p>\n      <p><em>আধুনিক অ্যাপ্রোচ:</em> Redux Toolkit (RTK) Query ব্যবহার করলে দুটোই একসাথে পাওয়া যায়।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>React Query ব্যবহার করার পর Redux-এর প্রয়োজনীয়তা কতটা কমে যায় — কীতখনও Redux-এ থাকা উচিত?</li>\n      </ul>\n    "
  },
  {
    "id": "sfe-7",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Bundle Size",
      "Code Splitting",
      "Tree Shaking"
    ],
    "question": "React অ্যাপ্লিকেশনের Bundle Size অনেক বড় হয়ে গেলে আপনি কীভাবে অপটিমাইজ করবেন?",
    "answer": "\n      <p>বড় বান্ডল সাইজ পারফরম্যান্স নষ্ট করে। এটি অপটিমাইজ করার প্রধান উপায়গুলো:</p>\n      <ol>\n        <li><strong>Code Splitting (Dynamic Import):</strong> রাউট বা কম্পোনেন্ট লেভেলে কোড ভাগ করা। যাতে প্রথম লোডে শুধু প্রয়োজনীয় কোড আসে。\n          <pre><code>const Dashboard = React.lazy(() => import('./Dashboard'));</code></pre>\n        </li>\n        <li><strong>Tree Shaking:</strong> Webpack/Vite কনফিগ ঠিক রাখা যাতে লাইব্রেরির ব্যবহৃত অংশ ছাড়া বাকিটা বান্ডলে না আসে। (<code>sideEffects: false</code> in package.json)।</li>\n        <li><strong>Heavy Libraries Replacement:</strong> Moment.js (বড়) এর বদলে date-fns (ট্রি-শেকেবল) ব্যবহার করা। Lodash এর বদলে স্পেসিফিক ফাংশন ইম্পোর্ট করা।</li>\n        <li><strong>Bundle Analyzer:</strong> <code>webpack-bundle-analyzer</code> ব্যবহার করে দেখা কোন প্যাকেজ সবচেয়ে বেশি জায়গা নিয়েছে।</li>\n        <li><strong>Image Optimization:</strong> SVG-এর বদলে WebP, এবং বড় ছবি Lazy load করা।</li>\n      </ol>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Tree-shaking কাজ না করার সাধারণ কারণ কী (side-effect যুক্ত ইমপোর্ট, CommonJS মিশ্রণ)?</li>\n      </ul>\n    "
  },
  {
    "id": "sfe-9",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Memory Leak",
      "useEffect",
      "Cleanup"
    ],
    "question": "React অ্যাপ্লিকেশনে Memory Leak কীভাবে ঘটে এবং আপনি কীভাবে ডিবাগ ও প্রতিরোধ করবেন?",
    "answer": "\n      <p>React-এ Memory Leak সাধারণত ঘটে যখন কোনো কম্পোনেন্ট Unmount হয়ে যায়, কিন্তু তার অ্যাসিনক্রোনাস কাজ (যেমন- API Call, setInterval) ব্যাকগ্রাউন্ডে চলতে থাকে এবং State আপডেট করার চেষ্টা করে।</p>\n      <h4>কারণ ও প্রতিরোধ:</h4>\n      <ul>\n        <li><strong>Uncleaned Timers:</strong> <code>setInterval</code> বা <code>setTimeout</code> ক্লিয়ার না করা。\n          <pre><code>useEffect(() => {\n  const id = setInterval(() => console.log('tick'), 1000);\n  return () => clearInterval(id); // Cleanup\n}, []);</code></pre>\n        </li>\n        <li><strong>Unmounted Component State Update:</strong> API রিকোয়েস্ট শেষ হওয়ার আগে কম্পোনেন্ট আনমাউন্ট হলে。\n          <pre><code>useEffect(() => {\n  let isMounted = true;\n  fetch('/api/data').then(data => {\n    if (isMounted) setData(data);\n  });\n  return () => { isMounted = false; };\n}, []);</code></pre>\n        </li>\n        <li><strong>Event Listeners:</strong> <code>window.addEventListener</code> রিমুভ না করা।</li>\n        <li><strong>Closures in WebSockets:</strong> পুরোনো স্টেট ক্লোজারে আটকে থাকা।</li>\n      </ul>\n      <h4>ডিবাগ করার উপায়:</h4>\n      <p>Chrome DevTools-এর <strong>Memory</strong> ট্যাবে গিয়ে \"Heap Snapshot\" নিতে হয়। কম্পোনেন্ট আনমাউন্ট করার আগে ও পরে স্ন্যাপশট তুলে তুলনা করলে বোঝা যায় কোন অবজেক্টটি মেমোরিতে ধরে রাখা হয়েছে (Detached DOM nodes)।</p>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Chrome DevTools Memory Profiler দিয়ে ঠিক কীভাবে একটি leak-causing কম্পোনেন্ট শনাক্ত করবেন?</li>\n      </ul>\n    "
  },
  {
    "id": "sfe-11",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "XSS",
      "CSRF",
      "CSP"
    ],
    "question": "Frontend Security-তে XSS এবং CSRF অ্যাটাক কী এবং আপনি কীভাবে প্রতিরোধ করবেন?",
    "answer": "\n      <p><strong>XSS (Cross-Site Scripting):</strong> অ্যাটাকার যখন আপনার ওয়েবসাইটে বিপজ্জনক JavaScript ইনজেক্ট করে।</p>\n      <ul>\n        <li><em>প্রতিরোধ:</em> ইউজার ইনপুট স্যানিটাইজ করা (DOMPurify)। React-এ <code>dangerouslySetInnerHTML</code> এড়িয়ে চলা। HTTP হেডারে <strong>Content Security Policy (CSP)</strong> সেট করা, যাতে অননুমোদিত স্ক্রিপ্ট রান না হয়।</li>\n      </ul>\n      <p><strong>CSRF (Cross-Site Request Forgery):</strong> অ্যাটাকার ইউজারের লগইন সেশন ব্যবহার করে অনাকাঙ্ক্ষিত রিকোয়েস্ট (যেমন- টাকা ট্রান্সফার) পাঠায়।</p>\n      <ul>\n        <li><em>প্রতিরোধ:</em> প্রতিটি ফর্মের সাথে একটি লুকানো <strong>Anti-CSRF Token</strong> পাঠানো এবং সার্ভারে ভ্যালিডেট করা। কুকিতে <code>SameSite=Strict</code> বা <code>Lax</code> সেট করা, যাতে অন্য ডোমেইন থেকে রিকোয়েস্ট এলে কুকি না যায়।</li>\n      </ul>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>SameSite কুকি অ্যাট্রিবিউট কীভাবে CSRF আক্রমণ প্রতিরোধ করে?</li>\n      </ul>\n    "
  },
  {
    "id": "sfe-12",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Rendering",
      "SSR",
      "Hydration"
    ],
    "question": "React Hydration কী? Hydration Mismatch Error কেন ঘটে এবং কীভাবে সমাধান করবেন?",
    "answer": "\n      <p>SSR (Server-Side Rendering)-এ সার্ভার থেকে প্লেইন HTML ক্লায়েন্টে পাঠানো হয়। এরপর ক্লায়েন্টে জাভাস্ক্রিপ্ট লোড হওয়ার পর সেই HTML-কে ইন্টারঅ্যাকটিভ (Event listeners যুক্ত) করার প্রক্রিয়াকে <strong>Hydration</strong> বলে।</p>\n      <h4>Hydration Mismatch Error:</h4>\n      <p>যদি সার্ভারে রেন্ডার হওয়া HTML এবং ক্লায়েন্টে রেন্ডার হওয়া React ট্রি-এর মধ্যে কোনো পার্থক্য থাকে, তবে React এই এরর থ্রো করে।</p>\n      <h4>কারণ ও সমাধান:</h4>\n      <ul>\n        <li><strong>Browser API (window, localStorage):</strong> সার্ভারে <code>window</code> থাকে না。\n          <em>সমাধান:</em> <code>useEffect</code> এর ভেতরে ব্রাউজার API ব্যবহার করা (কারণ useEffect শুধু ক্লায়েন্টে রান করে)।</li>\n        <li><strong>Date/Time বা Random Number:</strong> সার্ভার ও ক্লায়েন্টে টাইম আলাদা হতে পারে。\n          <em>সমাধান:</em> ডেট ফরম্যাটিং ক্লায়েন্ট সাইডে করা।</li>\n        <li><strong>Theme (Dark/Light):</strong> সার্ভার ডিফল্ট থিম পাঠে, কিন্তু ক্লায়েন্টের localStorage-এ আরেক থিম থাকতে পারে。\n          <em>সমাধান:</em> Next.js-এ <code>next-themes</code> ব্যবহার করা বা <code>suppressHydrationWarning</code> অ্যাট্রিবিউট ব্যবহার করা।</li>\n      </ul>\n    \n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li><code>suppressHydrationWarning</code> কখন নিরাপদ, আর কখন এটি প্রকৃত বাগ লুকিয়ে ফেলে?</li>\n      </ul>\n    "
  },
  {
    "id": "mongo-4",
    "category": "Full-Stack",
    "difficulty": "Intermediate",
    "tags": [
      "Data Modeling",
      "Embedding vs Referencing"
    ],
    "question": "MongoDB-তে Data Modeling করার সময় Embedding (Normalized) নাকি Referencing (Denormalized) বেছে নেবেন?",
    "answer": "\n      <p>NoSQL-এ ডাটা মডেলিং অ্যাপ্লিকেশনের ডাটা এক্সেস প্যাটার্নের ওপর নির্ভর করে করা হয়।</p>\n      <h4>Embedding (Denormalized - একটি ডকুমেন্টের ভেতর আরেকটি অবজেক্ট/অ্যারে রাখা):</h4>\n      <p><em>কখন ব্যবহার করবেন:</em> \"One-to-Few\" সম্পর্ক (যেমন: ইউজারের ঠিকানা বা সামাজিক লিঙ্ক)। ডাটা সবসময় একসাথে পড়া হয়।</p>\n      <p><em>সুবিধা:</em> ১টি সিঙ্গেল কুয়েরিতে সব ডাটা পাওয়া যায় (No Join needed)।</p>\n      <h4>Referencing (Normalized - আলাদা কালেকশনে ObjectId দিয়ে আইডি লিংক রাখা):</h4>\n      <p><em>কখন ব্যবহার করবেন:</em> \"One-to-Many\" বা \"Many-to-Many\" সম্পর্ক (যেমন: ইউজারের পোস্ট বা অর্ডার হিস্টোরি)।</p>\n      <p><em>সুবিধা:</em> MongoDB-এর 16MB ডকুমেন্ট সাইজ লিমিট অতিক্রম করা প্রতিরোধ করে এবং ডুপ্লিকেট ডাটা আপডেট সমস্যা এড়ায়।</p>\n    "
  },
  {
    "id": "mongo-17",
    "category": "Full-Stack",
    "difficulty": "Intermediate",
    "tags": [
      "Mongoose",
      "Populate",
      "Aggregation"
    ],
    "question": "Mongoose Populate vs MongoDB Aggregation $lookup-এর পার্থক্য কী?",
    "answer": "\n      <p>দুটিই MongoDB-তে \"join\"-এর মতো কাজ করে, কিন্তু <strong>সম্পূর্ণ ভিন্ন জায়গায় চলে</strong> — এবং এই পার্থক্যটি পারফরম্যান্সে বিশাল প্রভাব ফেলে।</p>\n      <table>\n        <tr><th>দিক</th><th>Mongoose <code>populate()</code></th><th><code>$lookup</code></th></tr>\n        <tr><td>কোথায় চলে</td><td><strong>অ্যাপ্লিকেশনে</strong></td><td><strong>ডাটাবেজে</strong></td></tr>\n        <tr><td>কতগুলো কুয়েরি</td><td>২+ (আলাদা রাউন্ড-ট্রিপ)</td><td>১</td></tr>\n        <tr><td>Aggregation-এ ব্যবহার</td><td>❌ না</td><td>✅ হ্যাঁ</td></tr>\n        <tr><td>কোড পাঠযোগ্যতা</td><td>সহজ</td><td>বেশি ভার্বোস</td></tr>\n      </table>\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>// Mongoose populate — ভেতরে যা ঘটে\nconst posts = await Post.find({ published: true })\n                        .populate('author', 'name email');\n\n// $lookup — একটি কুয়েরিতেই\ndb.posts.aggregate([\n  { $match: { published: true } },\n  { $lookup: {\n      from: \"users\",\n      localField: \"authorId\",\n      foreignField: \"_id\",\n      as: \"author\",\n      pipeline: [ { $project: { name: 1, email: 1 } } ]\n  }},\n  { $unwind: \"$author\" }\n]);</code></pre>\n      </div>\n      <p><strong>Populate-এ Mongoose N+1 না করে ১+১ কুয়েরি চালায়। তবে $lookup ডাটাবেজ লেভেলে কাজ করায় ফিল্টারিং ও অ্যাগ্রিগেশনে বেশি কার্যকর।</strong></p>\n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Denormalize করা নাম বদলালে কীভাবে সিঙ্ক রাখবেন?</li>\n        <li>Nested populate কতটা ব্যয়বহুল?</li>\n      </ul>\n    "
  },
  {
    "id": "mongo-19",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Aggregation",
      "Pipeline",
      "Optimizations"
    ],
    "question": "MongoDB Aggregation Pipeline: $match, $group, $project, $lookup, $unwind, $facet এবং Pipeline Optimization কী?",
    "answer": "\n      <p><strong>Aggregation Pipeline</strong> MongoDB-র বিশ্লেষণী ইঞ্জিন — ডকুমেন্টগুলো ধাপে ধাপে (stage) প্রবাহিত হয়, প্রতিটি ধাপ আগেরটির আউটপুট নিয়ে কাজ করে।</p>\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>db.orders.aggregate([\n  // ১. যত আগে সম্ভব ফিল্টার করুন — ইনডেক্স ব্যবহার করতে পারে\n  { $match: { status: \"completed\", createdAt: { $gte: ISODate(\"2026-01-01\") } } },\n\n  // ২. অন্য কালেকশন থেকে যুক্ত করা (left outer join)\n  { $lookup: {\n      from: \"users\",\n      localField: \"userId\",\n      foreignField: \"_id\",\n      as: \"user\"\n  }},\n  { $unwind: \"$user\" },\n\n  // ৩. গ্রুপ ও গণনা\n  { $group: {\n      _id: \"$user.city\",\n      totalRevenue: { $sum: \"$amount\" },\n      orderCount:   { $sum: 1 }\n  }},\n  { $sort: { totalRevenue: -1 } },\n  { $limit: 10 }\n]);</code></pre>\n      </div>\n      <h4>Pipeline অপ্টিমাইজেশনের নিয়ম</h4>\n      <ul>\n        <li><strong><code>$match</code> সবার আগে রাখুন:</strong> প্রথম stage হিসেবে থাকলে এটি <em>ইনডেক্স ব্যবহার করতে পারে</em>।</li>\n        <li><strong><code>$project</code> আগে দিন:</strong> অপ্রয়োজনীয় ফিল্ড বাদ দিলে মেমরি ও প্রসেসিং লোড কমে।</li>\n        <li><strong><code>$sort</code> + <code>$limit</code> একসাথে রাখুন:</strong> MongoDB এটি শনাক্ত করে top-N অপ্টিমাইজেশন করে।</li>\n      </ul>\n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Aggregation stage-এ ১০০ MB মেমরি সীমা অতিক্রম করলে <code>allowDiskUse</code> কীভাবে কাজ করে?</li>\n      </ul>\n    "
  },
  {
    "id": "mongo-20",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Indexing",
      "ESR Rule",
      "Compound Index"
    ],
    "question": "MongoDB ESR Rule (Equality, Sort, Range) compound indexing বেস্ট প্র্যাকটিস কী?",
    "answer": "\n      <p><strong>ESR Rule</strong> (Equality, Sort, Range) compound index-এ ফিল্ডের ক্রম নির্ধারণের সবচেয়ে ব্যবহারিক নীতি।</p>\n      <h4>নিয়মটি:</h4>\n      <ol>\n        <li><strong>E — Equality:</strong> হুবহু মিলের ফিল্ড (<code>status: \"active\"</code>)</li>\n        <li><strong>S — Sort:</strong> যে ফিল্ডে সাজানো হয় (<code>createdAt: -1</code>)</li>\n        <li><strong>R — Range:</strong> রেঞ্জ শর্ত (<code>price: { $gte: 100 }</code>)</li>\n      </ol>\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>// ✅ সঠিক ইনডেক্স — ESR ক্রমে\ndb.products.createIndex({ category: 1, createdAt: -1, price: 1 });\n\n// ❌ ভুল ক্রম — range মাঝখানে রাখলে মেমরিতে ইন-মেমরি SORT করতে হয়\ndb.products.createIndex({ category: 1, price: 1, createdAt: -1 });</code></pre>\n      </div>\n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Prefix নিয়ম কী এবং কীভাবে compound index একাধিক কুয়েরিতে কাজ করে?</li>\n      </ul>\n    "
  },
  {
    "id": "mongo-21",
    "category": "Full-Stack",
    "difficulty": "Advanced",
    "tags": [
      "Replication",
      "Replica Sets",
      "Oplog"
    ],
    "question": "MongoDB Replica Set Architecture: Primary Node, Secondary Nodes, Arbiter, Oplog, এবং Heartbeat Mechanism কী?",
    "answer": "\n      <p><strong>Replica set</strong> MongoDB-র high availability ব্যবস্থা — একই ডেটার একাধিক কপি, স্বয়ংক্রিয় failover সহ।</p>\n      <h4>ভূমিকা:</h4>\n      <ul>\n        <li><strong>Primary:</strong> সব write এবং ডিফল্টে read পরিচালনা করে।</li>\n        <li><strong>Secondary:</strong> primary-র oplog রিপ্লে করে ডেটা সিঙ্ক রাখে এবং প্রয়োজনমতো read সার্ভ করতে পারে।</li>\n        <li><strong>Arbiter:</strong> কোনো ডেটা রাখে না, শুধুমাত্র টাই-ব্রেকিং নির্বাচনে ভোট দেয়।</li>\n      </ul>\n      <h4>Oplog (Operations Log):</h4>\n      <p><code>local.oplog.rs</code> হলো একটি capped collection যেখানে সব পরিবর্তন idempotent উপায়ে লেখা থাকে। Secondary এটি পড়ে সিঙ্ক থাকে।</p>\n      <h4>Follow-up প্রশ্ন</h4>\n      <ul>\n        <li>Replication lag বেড়ে গেলে এবং Oplog window ওভারফ্লো হলে কী ঘটে?</li>\n      </ul>\n    "
  }
];