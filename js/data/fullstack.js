const seniorFullstackQuestions = [
  {
    id: "sfs-1",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Architecture","Monolith","Microservices"],
    question: "Monolithic Architecture এবং Microservices Architecture-এর মধ্যে পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p><strong>Monolithic Architecture:</strong> এখানে ফ্রন্টএন্ড, ব্যাকএন্ড এবং ডাটাবেজ লজিক একটিমাত্র কোডবেস ও ডিপ্লয়েবল ইউনিটের ভেতর থাকে।</p>
      <ul>
        <li><strong>সুবিধা:</strong> ডেভেলপমেন্ট ও টেস্টিং সহজ, নেটওয়ার্ক লেটেন্সি কম (কোনো RPC কল নেই), ডিপ্লয়মেন্ট সিঙ্গেল কমান্ডে হয়।</li>
        <li><strong>অসুবিধা:</strong> অ্যাপ বড় হলে স্কেলিং কঠিন, একটি বাগ পুরো সিস্টেম ক্র্যাশ করতে পারে, টেক স্ট্যাক পরিবর্তন কঠিন।</li>
      </ul>
      <p><strong>Microservices Architecture:</strong> অ্যাপ্লিকেশনকে ছোট ছোট স্বাধীন সার্ভিসে ভাগ করা হয়, প্রতিটির নিজস্ব ডাটাবেজ থাকে।</p>
      <ul>
        <li><strong>সুবিধা:</strong> ইন্ডিপেন্ডেন্ট স্কেলিং (শুধু কার্ট সার্ভিস স্কেল করা যায়), টেক স্ট্যাকের স্বাধীনতা, ফল্ট আইসোলেশন।</li>
        <li><strong>অসুবিধা:</strong> ডিস্ট্রিবিউটেড সিস্টেম ম্যানেজ করা জটিল, ডাটা কনসিস্টেন্সি (Distributed Transactions) নিশ্চিত করা কঠিন, নেটওয়ার্ক লেটেন্সি।</li>
      </ul>
      <p><strong>সিদ্ধান্ত:</strong> নতুন স্টার্টআপ বা ছোট টিমের জন্য শুরুতে <strong>Modular Monolith</strong> দিয়ে শুরু করা ভালো। যখন টিম বড় হবে এবং স্কেলিংয়ের প্রয়োজন হবে, তখন Microservices-এ যাওয়া উচিত।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Modular Monolith কী — এটি কীভাবে মনোলিথ ও মাইক্রোসার্ভিসের মধ্যে একটি মধ্যবর্তী পথ দেয়?</li>
      </ul>
    `
  },
  {
    id: "sfs-2",
    category: "API Design",
    difficulty: "Advanced",
    tags: ["REST","GraphQL","gRPC","Architecture"],
    question: "REST, GraphQL এবং gRPC-এর মধ্যে পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <ul>
        <li><strong>REST:</strong> HTTP প্রোটোকলের ওপর ভিত্তি করে কাজ করে। Resource ভিত্তিক (GET, POST, PUT, DELETE)। 
          <br><em>ব্যবহার:</em> পাবলিক API, ক্র্যাশিং সহজ, ক্যাশিং (HTTP Caching) বিল্ট-ইন। তবে Over-fetching বা Under-fetching সমস্যা থাকে।</li>
        <li><strong>GraphQL:</strong> ক্লায়েন্ট ঠিক যা দরকার শুধু তা রিকোয়েস্ট করে (Single Endpoint)। 
          <br><em>ব্যবহার:</em> মোবাইল অ্যাপে যেখানে কম ডেটা ট্রান্সফার করা জরুরি, বা একাধিক ডাটাবেজ থেকে একত্রিত ডেটা দেখাতে। তবে সার্ভারে N+1 কুয়েরি সমস্যা ও ক্যাশিং জটিল।</li>
        <li><strong>gRPC:</strong> Google-এর তৈরি Protobuf (Binary format) ব্যবহার করে। HTTP/2-এর ওপর চলে। দ্রুতগতির ও লাইটওয়েট। 
          <br><em>ব্যবহার:</em> ইন্টারনাল মাইক্রোসার্ভিস কমিউনিকেশন (Service-to-Service), রিয়েল-টাইম স্ট্রিমিং। ব্রাউজার সরাসরি সাপোর্ট করে না (gRPC-Web লাগে)।</li>
      </ul>
      <p><strong>সিদ্ধান্ত:</strong> ক্লায়েন্ট-ফেসিং API-এর জন্য REST বা GraphQL এবং ব্যাকএন্ড সার্ভিসগুলোর মধ্যে কমিউনিকেশনের জন্য gRPC ব্যবহার করা আধুনিক বেস্ট প্র্যাকটিস।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>GraphQL-এ over-fetching সমস্যা সমাধান হলেও N+1 query সমস্যা কীভাবে দেখা দেয় এবং DataLoader কীভাবে সমাধান করে?</li>
      </ul>
    `
  },
  {
    id: "sfs-3",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Transactions","Microservices","Saga Pattern"],
    question: "Microservices Architecture-এ Distributed Transaction (যেমন- E-commerce Order Placing) কীভাবে হ্যান্ডেল করবেন?",
    answer: `
      <p>মাইক্রোসার্ভিসে একটি অর্ডার করতে গেলে Payment, Inventory, এবং Shipping—তিনটি আলাদা ডাটাবেজ আপডেট হতে হয়। এখানে ঐতিহ্যিক 2-Phase Commit (2PC) খুব স্লো ও ব্লকিং। এটি সমাধানের জন্য <strong>Saga Pattern</strong> ব্যবহৃত হয়।</p>
      <h4>Saga Pattern-এর ২টি ধরন:</h4>
      <ol>
        <li><strong>Choreography-based Saga:</strong> কোনো সেন্ট্রাল কো-অর্ডিনেটর নেই। প্রতিটি সার্ভিস একটি ইভেন্ট পাবলিশ করে (যেমন- Kafka-এ), এবং অন্য সার্ভিস সেটি লিসেন করে নেক্সট স্টেপ সম্পন্ন করে।
          <br><em>সমস্যা:</em> ডিবাগ করা কঠিন, সাইক্লিক ডিপেন্ডেন্সি তৈরি হতে পারে।</li>
        <li><strong>Orchestration-based Saga:</strong> একটি সেন্ট্রাল কো-অর্ডিনেটর (Orchestrator) থাকে। সে প্রতিটি সার্ভিসকে কমান্ড দেয় এবং রেসপন্স পেয়ে পরের স্টেপ ডিসাইড করে। যদি কোনো স্টেপ ফেইল করে, Orchestrator Compensating Transactions (Rollback logic) চালায়। 
          <br><em>সুবিধা:</em> বিজনেস লজিক ক্লিয়ার, ডিবাগিং সহজ।</li>
      </ol>
    
      <h4>Saga Pattern — Compensating Transaction দিয়ে সমাধান</h4>
      <pre class="mermaid">
sequenceDiagram
    participant O as Order Service
    participant P as Payment Service
    participant I as Inventory Service
    participant S as Shipping Service

    O->>P: Charge Payment
    P-->>O: Success
    O->>I: Reserve Stock
    I-->>O: Success
    O->>S: Create Shipment
    S-->>O: ❌ Failure (স্টক আছে কিন্তু শিপিং ব্যর্থ)

    Note over O,S: Compensating transaction শুরু — উল্টো ক্রমে rollback
    O->>I: Release Stock (compensate)
    O->>P: Refund Payment (compensate)
      </pre>
      <span class="diagram-caption">একটি ধাপ ব্যর্থ হলে সাগা আগের সব সফল ধাপের বিপরীত (compensating) অ্যাকশন চালায় — ডিস্ট্রিবিউটেড ট্রানজ্যাকশনে কোনো global lock ছাড়াই সামঞ্জস্য বজায় থাকে</span>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Choreography-based ও Orchestration-based Saga-এর মধ্যে পার্থক্য কী — কোনটি কখন বেছে নেবেন?</li>
      </ul>
    `
  },
  {
    id: "sfs-4",
    category: "Security",
    difficulty: "Advanced",
    tags: ["Authentication","JWT","Cookies","CSRF"],
    question: "Fullstack অ্যাপ্লিকেশনে JWT এবং Session-based Authentication-এর মধ্যে কখন কোনটি বেছে নেবেন? Security best practices কী?",
    answer: `
      <p><strong>Session-based (Stateful):</strong> সার্ভারে সেশন স্টোর করা থাকে (Redis-এ), ক্লায়েন্টে শুধু Session ID কুকিতে থাকে।</p>
      <ul>
        <li><strong>ব্যবহার:</strong> যেখানে স্টেট ট্র্যাক করা দরকার, ইউজারকে সাথে সাথে লগআউট করানো দরকার। নিরাপত্তা বেশি (HttpOnly কুকি ব্যবহার করলে XSS থেকে বাঁচা যায়)।</li>
      </ul>
      <p><strong>JWT (Stateless):</strong> টোকেনের ভেতরেই ইউজার ডেটা এনক্রিপ্টেড থাকে। সার্ভারে কিছু স্টোর করতে হয় না।</p>
      <ul>
        <li><strong>ব্যবহার:</strong> মাইক্রোসার্ভিস আর্কিটেকচার, মোবাইল অ্যাপ, বা স্টেটলেস API-তে।</li>
      </ul>
      <h4>Security Best Practices (JWT-এর জন্য):</h4>
      <ol>
        <li><strong>Storage:</strong> JWT কখনো <code>localStorage</code>-এ রাখবেন না (XSS অ্যাটাকে চুরি হতে পারে)। এটি <code>HttpOnly, Secure, SameSite=Strict</code> কুকিতে রাখুন।</li>
        <li><strong>Short-lived Access Token:</strong> Access Token-এর মেয়াদ ১৫ মিনিট রাখুন।</li>
        <li><strong>Refresh Token Rotation:</strong> রিফ্রেশ টোকেন দিয়ে নতুন অ্যাক্সেস টোকেন আনার সময় রিফ্রেশ টোকেনটিও পরিবর্তন করুন (Reuse Detection)।</li>
        <li><strong>CSRF Protection:</strong> কুকি ব্যবহার করলে অবশ্যই Anti-CSRF Token ব্যবহার করুন।</li>
      </ol>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>JWT স্টেটলেস হওয়ার সুবিধা কী, কিন্তু revocation (লগআউট/ব্যান) কেন কঠিন হয়ে যায়?</li>
      </ul>
    `
  },
  {
    id: "sfs-5",
    category: "Performance",
    difficulty: "Advanced",
    tags: ["Caching","Redis","Fullstack"],
    question: "একটি হাই-ট্রাফিক অ্যাপ্লিকেশনে Multi-layer Caching Strategy কীভাবে ডিজাইন করবেন?",
    answer: `
      <p>ডাটাবেজ প্রেশার কমাতে এবং রেসপন্স টাইম ফাস্ট করতে মাল্টি-লেয়ার ক্যাশিং ব্যবহৃত হয়।</p>
      <ol>
        <li><strong>Layer 1: Client/Browser Cache:</strong> HTTP Headers (<code>Cache-Control: max-age=3600</code>, <code>ETag</code>) দিয়ে স্ট্যাটিক অ্যাসেট (JS, CSS, Images) ব্রাউজারে ক্যাশ করা।</li>
        <li><strong>Layer 2: CDN Cache (Edge Caching):</strong> Cloudflare বা AWS CloudFront ব্যবহার করে ডাটা বিশ্বের বিভিন্ন এজ লোকেশনে ক্যাশ করা। API রেসপন্সও CDN-এ ক্যাশ করা যায়।</li>
        <li><strong>Layer 3: Application Cache (Redis/Memcached):</strong> ব্যাকএন্ডে ডাটাবেজ কুয়েরির রেজাল্ট বা ইউজার সেশন Redis-এ রাখা। (যেমন- <code>GET user:123</code>)।</li>
        <li><strong>Layer 4: Database Cache:</strong> PostgreSQL-এর <code>shared_buffers</code> বা MySQL-এর <code>InnoDB Buffer Pool</code>।</li>
      </ol>
      <h4>Cache Invalidation:</h4>
      <p>ক্যাশ ডেটা পুরোনো হয়ে গেলে (Stale), এটি আপডেট করা জরুরি। সবচেয়ে নিরাপদ উপায় হলো Write-through Cache (ডাটাবেজ আপডেটের সাথে সাথে ক্যাশ আপডেট করা) অথবা TTL (Time-to-Live) সেট করা।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Browser cache, CDN, Redis, ও DB query cache — এই চার স্তরের মধ্যে কোনটি invalidate করা সবচেয়ে ঝুঁকিপূর্ণ এবং কেন?</li>
      </ul>
    `
  },
  {
    id: "sfs-6",
    category: "Real-World Scenario",
    difficulty: "Advanced",
    tags: ["Eventual Consistency","UI/UX","Optimistic UI"],
    question: "Distributed System-এ 'Eventual Consistency' থাকলে Frontend-এ User Experience (UX) কীভাবে ম্যানেজ করবেন?",
    answer: `
      <p>মাইক্রোসার্ভিসে ডাটা আপডেট করার সাথে সাথে সব জায়গায় রিফ্লেক্ট হয় না (যেমন- কমেন্ট পোস্ট করলে সাথে সাথে ডাটাবেজে না-ও থাকতে পারে)। একে Eventual Consistency বলে। এতে ইউজার কনফিউজড হতে পারে। এটি সমাধানের জন্য:</p>
      <ol>
        <li><strong>Optimistic UI Updates:</strong> সার্ভার থেকে সাকসেস রেসপন্স আসার অপেক্ষা না করে, সাথে সাথে UI-তে পরিবর্তন দেখানো। যেমন- লাইক বাটনে ক্লিক করা মাত্রই লাইক কাউন্ট ১ বাড়িয়ে দেওয়া। যদি সার্ভার এরর দেয়, তবে UI রোলব্যাক করে আগের অবস্থায় যাওয়া।</li>
        <li><strong>Loading State / Skeletons:</strong> ব্যাকগ্রাউন্ডে প্রসেসিং চললে শুধু স্পিনার না দেখিয়ে সুন্দর Skeleton UI দেখানো।</li>
        <li><strong>Polling বা WebSockets:</strong> যদি কোনো রিপোর্ট জেনারেট হতে সময় লাগে, তবে ক্লায়েন্ট থেকে কিছুক্ষণ পর পর রিকোয়েস্ট পাঠানো (Polling) বা WebSocket দিয়ে সার্ভার থেকে রেডি হওয়ার সিগন্যাল আসা পর্যন্ত অপেক্ষা করা।</li>
        <li><strong>Toast Notifications:</strong> "আপনার অর্ডারটি প্রসেসিংয়ে আছে, কিছুক্ষণ পর হিস্ট্রিতে দেখা যাবে"—এমন মেসেজ দিয়ে ইউজারকে আশ্বস্ত করা।</li>
      </ol>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Optimistic UI update ব্যবহার করলে eventual consistency-জনিত ভুল ধারণা ব্যবহারকারীকে কীভাবে দেখাবেন যদি সার্ভার আসলে ব্যর্থ হয়?</li>
      </ul>
    `
  },
  {
    id: "sfs-7",
    category: "DevOps",
    difficulty: "Advanced",
    tags: ["CI/CD","Zero Downtime","Deployment"],
    question: "Zero-Downtime Deployment (Blue-Green বা Canary) কী? এগুলোর মধ্যে পার্থক্য কী?",
    answer: `
      <p>প্রোডাকশনে নতুন কোড ডিপ্লয় করার সময় ইউজারদের কোনো ডাউনটাইম বা এরর দেখা যাবে না, এমন প্রক্রিয়াকে Zero-Downtime Deployment বলে।</p>
      <ul>
        <li><strong>Blue-Green Deployment:</strong> দুটি আলাদা পরিবেশ থাকে। Blue (বর্তমান ভার্সন) এবং Green (নতুন ভার্সন)। নতুন ভার্সন Green-এ ডিপ্লয় করে টেস্ট করা হয়। সব ঠিক থাকলে Router বা Load Balancer সাথে সাথে ট্রাফিক Blue থেকে Green-এ ঘুরিয়ে দেয় (Switch)। সম্পূর্ণ ট্রাফিক একসাথে নতুন ভার্সনে যায়।</li>
        <li><strong>Canary Deployment:</strong> এখানে ট্রাফিক একসাথে সব ঘুরিয়ে দেওয়া হয় না। প্রথমে মাত্র ৫% ট্রাফিক নতুন ভার্সনে পাঠানো হয়। মনিটর করে দেখা হয় বাগ বা হাই ক্যাপাসিটি হচ্ছে কি না। সব ঠিক থাকলে ধীরে ধীরে ২৫%, ৫০%, ১০০% ট্রাফিক নতুন ভার্সনে শিফট করা হয়।</li>
      </ul>
      <p><em>ব্যবহার:</em> ছোট অ্যাপের জন্য Blue-Green ভালো, কিন্তু Enterprise বা হাই-রিস্ক অ্যাপের জন্য Canary Deployment বেশি নিরাপদ।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ডেটাবেজ মাইগ্রেশন জড়িত থাকলে Blue-Green deployment কীভাবে backward-compatible রাখতে হয়?</li>
      </ul>
    `
  },
  {
    id: "sfs-8",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Scalability","Rate Limiting","API Gateway"],
    question: "API Gateway কী? এটি কেন প্রয়োজন এবং এতে Rate Limiting কীভাবে কাজ করে?",
    answer: `
      <p>মাইক্রোসার্ভিসে ক্লায়েন্ট যদি সরাসরি প্রতিটি সার্ভিসের সাথে কথা বলে, তবে CORS, Auth, ও রাউটিং ম্যানেজ করা কঠিন। <strong>API Gateway</strong> হলো একটি সিঙ্গেল এন্ট্রি পয়েন্ট যা সকল ক্লায়েন্ট রিকোয়েস্ট গ্রহণ করে এবং সঠিক সার্ভিসে পাঠায়।</p>
      <h4>API Gateway-এর কাজ:</h4>
      <ul>
        <li><strong>Authentication & Authorization:</strong> JWT টোকেন ভ্যালিডেট করা।</li>
        <li><strong>Rate Limiting & Throttling:</strong> কোনো ক্লায়েন্ট যেন অতিরিক্ত রিকোয়েস্ট না পাঠায় তা নিয়ন্ত্রণ করা।</li>
        <li><strong>Load Balancing:</strong> রিকোয়েস্ট বিভিন্ন সার্ভারে ভাগ করা।</li>
        <li><strong>Request Aggregation:</strong> একাধিক সার্ভিস থেকে ডাটা এনে একত্রিত করে ক্লায়েন্টকে দেওয়া।</li>
      </ul>
      <h4>Rate Limiting Strategy (Token Bucket Algorithm):</h4>
      <p>সবচেয়ে বেশি ব্যবহৃত অ্যালগরিদম। এখানে প্রতি ক্লায়েন্টের জন্য একটি বালতি (Bucket) থাকে যাতে নির্দিষ্ট সংখ্যক টোকেন (যেমন- ১০০টি) থাকে। প্রতি রিকোয়েস্টে ১টি টোকেন কমে। টোকেন শেষ হলে <code>429 Too Many Requests</code> এরর দেওয়া হয়। প্রতি সেকেন্ডে বালতিতে নতুন টোকেন যোগ হতে থাকে (Refill rate)। এটি Redis ব্যবহার করে ডিস্ট্রিবিউটেড সিস্টেমে ম্যানেজ করা হয়।</p>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>API Gateway নিজেই single point of failure হয়ে যেতে পারে — কীভাবে এটি HA করবেন?</li>
      </ul>
    `
  },
  {
    id: "sfs-9",
    category: "Database",
    difficulty: "Advanced",
    tags: ["CAP Theorem","NoSQL","Distributed System"],
    question: "CAP Theorem কী? NoSQL ডাটাবেজ নির্বাচনের ক্ষেত্রে এটি কীভাবে প্রভাব ফেলে?",
    answer: `
      <p><strong>CAP Theorem</strong> বলে যে, একটি ডিস্ট্রিবিউটেড ডাটাবেজ সিস্টেম নিচের ৩টির মধ্যে একসাথে কেবল ২টি গ্যারান্টি দিতে পারে:</p>
      <ol>
        <li><strong>Consistency (C):</strong> সকল নোড একই সময়ে একই ডাটা দেখাবে।</li>
        <li><strong>Availability (A):</strong> সিস্টেমে কোনো নোড ফেইল করলেও প্রতিটি রিকোয়েস্ট রেসপন্স পাবে (সফল বা এরর)।</li>
        <li><strong>Partition Tolerance (P):</strong> নোডগুলোর মধ্যে নেটওয়ার্ক কানেকশন বিচ্ছিন্ন (Partition) হলেও সিস্টেম চালু থাকবে।</li>
      </ol>
      <p>যেহেতু নেটওয়ার্ক ফেইলিওর সবসময় ঘটতে পারে, তাই 'P' বাদ দেওয়া যায় না। ফলে আমাদের <strong>CP</strong> বা <strong>AP</strong> বেছে নিতে হয়।</p>
      <ul>
        <li><strong>CP Databases (Consistency + Partition Tolerance):</strong> নেটওয়ার্ক পার্টিশন হলে ডাটা কনসিস্টেন্সি রাখার জন্য সিস্টেম কিছু নোডকে আনঅ্যাভেইলেবল করে দেয়। (যেমন- HBase, MongoDB)। <em>ব্যবহার:</em> ব্যাংকিং বা ফিন্যান্সিয়াল সিস্টেম।</li>
        <li><strong>AP Databases (Availability + Partition Tolerance):</strong> নেটওয়ার্ক পার্টিশন হলেও সিস্টেম সবসময় অ্যাভেইলেবল থাকে, কিন্তু কিছু নোডে পুরোনো ডাটা (Eventual Consistency) দেখাতে পারে। (যেমন- Cassandra, DynamoDB)। <em>ব্যবহার:</em> সোশ্যাল মিডিয়া ফিড, শপিং কার্ট।</li>
      </ul>
    
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>PACELC থিওরেম CAP-এর তুলনায় কী অতিরিক্ত বিবেচনা যোগ করে (নেটওয়ার্ক পার্টিশন না থাকা অবস্থাতেও)?</li>
      </ul>
    `
  },
  {
    id: "sfs-10",
    category: "Architecture",
    difficulty: "Advanced",
    tags: ["WebSockets","Real-time","Scalability"],
    question: "একটি রিয়েল-টাইম চ্যাট অ্যাপ্লিকেশন (যেমন- WhatsApp) ডিজাইন করতে হলে আপনার আর্কিটেকচার কেমন হবে?",
    answer: `
      <p>রিয়েল-টাইম চ্যাট অ্যাপ ডিজাইন করার জন্য নিচের কম্পোনেন্টগুলো প্রয়োজন:</p>
      <ol>
        <li><strong>Connection Layer (WebSocket Gateway):</strong> ক্লায়েন্টরা WebSocket দিয়ে সার্ভারে কানেক্ট করবে। যেহেতু একটি সার্ভারে লাখ লাখ কানেকশন ধরা যায় না, তাই একাধিক WebSocket সার্ভার (Horizontal Scaling) লাগবে।</li>
        <li><strong>Presence Service (Redis):</strong> কোন ইউজার অনলাইন আছে এবং সে কোন WebSocket সার্ভারে কানেক্টেড, তা Redis-এ সেভ করা থাকবে।</li>
        <li><strong>Message Broker (RabbitMQ/Kafka):</strong> ইউজার A মেসেজ পাঠালে সেটি সার্ভার থেকে মেসেজ ব্রোকারে যাবে।</li>
        <li><strong>Message Routing:</strong> ব্রোকার চেক করবে ইউজার B অনলাইন কি না। অনলাইন থাকলে Redis থেকে তার WebSocket সার্ভারের আইডি বের করে মেসেজ সেই সার্ভারে পাঠাবে, আর সেই সার্ভার ইউজার B-কে মেসেজ ডেলিভারি দেবে।</li>
        <li><strong>Storage (Cassandra/MongoDB):</strong> চ্যাট হিস্ট্রি সেভ করার জন্য। এখানে Write-heavy ডাটাবেজ প্রয়োজন।</li>
        <li><strong>Push Notification Service:</strong> ইউজার B অফলাইন থাকলে Firebase Cloud Messaging (FCM) বা APNs-এর মাধ্যমে পুশ নোটিফিকেশন পাঠানো হবে।</li>
      </ol>
    
      <h4>রিয়েল-টাইম চ্যাট আর্কিটেকচার — উচ্চ স্তরের ওভারভিউ</h4>
      <pre class="mermaid">
flowchart TB
    Client1[ক্লায়েন্ট A] <-->|WebSocket| GW[WebSocket Gateway<br/>লোড-ব্যালান্সড, স্টিকি সেশন]
    Client2[ক্লায়েন্ট B] <-->|WebSocket| GW
    GW <--> Redis[Redis Pub-Sub<br/>একাধিক GW ইনস্ট্যান্স জুড়ে মেসেজ ফ্যান-আউট]
    GW --> Queue[Message Queue<br/>persistence-এর জন্য]
    Queue --> DB[(Message Store<br/>Cassandra/MongoDB)]
    GW --> Push[Push Notification Service<br/>অফলাইন ইউজারদের জন্য]
      </pre>
      <span class="diagram-caption">একাধিক WebSocket Gateway ইনস্ট্যান্সের মধ্যে Redis Pub-Sub দিয়ে মেসেজ রিলে হয় — ক্লায়েন্ট A ও B ভিন্ন গেটওয়ে ইনস্ট্যান্সে কানেক্টেড থাকলেও মেসেজ পৌঁছায়</span>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মেসেজ delivery guarantee (at-least-once vs exactly-once) কীভাবে বাস্তবায়ন করবেন?</li>
        <li>"Typing indicator" ও "read receipt"-এর মতো ফিচার persist করার দরকার আছে কি — কেন?</li>
      </ul>
    `
  }
];
