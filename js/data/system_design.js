const systemDesignQuestions = [
  {
    id: "sd-1",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Microservices", "Saga Pattern", "Distributed Systems"],
    question: "Distributed Microservices-এ Saga Pattern কী? Choreography এবং Orchestration-এর পার্থক্যসহ Saga Pattern কীভাবে বাস্তবায়িত হয়?",
    answer: `
      <p>ডিস্ট্রিবিউটেড মাইক্রোসার্ভিস সিস্টেমে প্রতিটি সার্ভিসের নিজস্ব আলাদা ডাটাবেজ থাকে। ফলে প্রথাগত ACID Single DB Transaction (যেমন: <code>BEGIN TRANSACTION ... COMMIT</code>) ব্যবহার করা যায় না। এর বদলে <strong>Saga Pattern</strong> ব্যবহার করা হয়।</p>
      <p><strong>Saga:</strong> এটি এমন একাধিক লোকাল ট্রানজেকশনের ধারাবাহিক চেইন, যেখানে প্রতিটি সার্ভিস তার নিজস্ব ডাটাবেজ আপডেট করার পর একটি ইভেন্ট বা মেসেজ পাঠায় যাতে পরবর্তী সার্ভিস তার নিজস্ব ট্রানজেকশন চালাতে পারে। কোনো এক ধাপে সার্ভিস ব্যর্থ হলে বিপরীতমুখী <strong>Compensating Transactions</strong> চালিয়ে পূর্বের সকল কাজ রোলব্যাক (Rollback) করা হয়।</p>
      <h4>Saga বাস্তবায়নের ২ পদ্ধতি:</h4>
      <ol>
        <li><strong>Choreography (ইভেন্ট চালিত):</strong> কোনো কেন্দ্রীয় নিয়ন্ত্রক থাকে না। প্রতিটি সার্ভিস কাজ শেষে ইভেন্ট পাবলিশ করে এবং অন্য সার্ভিস সেই ইভেন্ট শুনে (Subscribe) নিজের কাজ সম্পন্ন করে। (ছোট ও সহজ সিস্টেমের জন্য উপযুক্ত)।</li>
        <li><strong>Orchestration (সেন্ট্রাল অর্কেস্ট্রেটর):</strong> একটি সেন্ট্রাল সার্ভিস (Saga Orchestrator) থাকে যা নির্দেশ দেয় কোন সার্ভিস কখন কোন কাজ করবে এবং ফেইল করলে রোলব্যাক নির্দেশ পাঠায়। (জটিল বা বড় ওয়ার্কফ্লোর জন্য উপযুক্ত)।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Example Saga Flow for E-commerce Order Processing:
// 1. Order Service -> Create Pending Order
// 2. Payment Service -> Charge Credit Card (If Fails -> Cancel Order Compensating Tx)
// 3. Inventory Service -> Reserve Stock (If Fails -> Refund Credit Card & Cancel Order)
// 4. Order Service -> Mark Order Completed</code></pre>
      </div>
    `
  },
  {
    id: "sd-2",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["CQRS", "Architecture", "Event Sourcing"],
    question: "CQRS (Command Query Responsibility Segregation) প্যাটার্ন কী এবং Event Sourcing-এর সাথে এটি কীভাবে কাজ করে?",
    answer: `
      <p><strong>CQRS</strong> হলো এমন একটি আর্কিটেকচারাল প্যাটার্ন যেখানে ডাটা রাইট করার প্রসেস (<strong>Commands</strong> - Insert, Update, Delete) এবং ডাটা রিড করার প্রসেস (<strong>Queries</strong> - Read/Search) সম্পূর্ণ আলাদা ডাটা মডেল ও সার্ভারে বিভক্ত করা হয়।</p>
      <h4>CQRS কেন ব্যবহার করবেন?</h4>
      <ul>
        <li>উচ্চগতির সিস্টেমে রিড রিকোয়েস্ট (Read Heavy) এবং রাইট রিকোয়েস্ট (Write Heavy)-এর চাহিদা ভিন্ন থাকে।</li>
        <li>রাইটের জন্য Relational Database (PostgreSQL/MySQL) এবং দ্রুত রিডের জন্য NoSQL বা Search Engine (MongoDB/Elasticsearch/Redis) আলাদাভাবে স্কেল করা যায়।</li>
      </ul>
      <h4>CQRS-এর সাথে Event Sourcing:</h4>
      <p><strong>Event Sourcing:</strong> ডাটাবেজে ডাটার বর্তমান স্টেট (Current State) সরাসরি সেভ না করে, ডাটার ওপর ঘটে যাওয়া সকল ঘটনার লোগো (Array of Events) অপরিবর্তনীয়ভাবে (Immutable Log) স্টোর করা হয়।</p>
      <p>CQRS-এ Command সার্ভিস ইভেন্ট জেনারেট করে Event Store-এ লিখে, আর সেখান থেকে Event Stream শুনে Query Read DB আপডেট হয় (Eventual Consistency)।</p>
    `
  },
  {
    id: "sd-3",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Circuit Breaker", "Resilience", "Fault Tolerance"],
    question: "Circuit Breaker Pattern কী? Closed, Open এবং Half-Open স্টেটগুলোর কাজ কী?",
    answer: `
      <p>ডিস্ট্রিবিউটেড সিস্টেমে যখন একটি ডাউনস্ট্রিম মাইক্রোসার্ভিস ফেইল বা অত্যন্ত স্লো হয়ে যায়, তখন আপস্ট্রিম সার্ভিস বারবার রিকোয়েস্ট পাঠিয়ে থ্রেড ব্লক বা ক্র্যাশ হওয়া রোধ করার জন্য <strong>Circuit Breaker Pattern</strong> ব্যবহার করা হয়।</p>
      <h4>Circuit Breaker-এর ৩টি স্টেট:</h4>
      <ol>
        <li><strong>Closed State (স্বাভাবিক অবস্থা):</strong> সিস্টেম স্বাভাবিকভাবে কাজ করছে। রিকোয়েস্ট গন্তব্যে পৌঁছাচ্ছে। এরর রেট থ্রেশহোল্ডের নিচে থাকলে সার্কিট সারাক্ষণ Closed থাকে।</li>
        <li><strong>Open State (বিচ্ছিন্ন অবস্থা):</strong> ডাউনস্ট্রিম সার্ভিসের এরর রেট (Error Threshold) নির্দিষ্ট সীমার (যেমন ৫০%) বাইরে চলে গেলে সার্কিট ট্রিপ করে Open হয়ে যায়। এই অবস্থায় ডাউনস্ট্রিম সার্ভিসে কোনো রিকোয়েস্ট না পাঠিয়ে সাথে সাথে Fallback Response / Exception ফেরত পাঠানো হয়।</li>
        <li><strong>Half-Open State (পরীক্ষামূলক অবস্থা):</strong> নির্দিষ্ট কুলডাউন সময় (Timeout) পার হওয়ার পর সার্কিট Half-Open অবস্থায় যায়। অল্প কিছু রিকোয়েস্ট পরীক্ষা করার জন্য পাঠানো হয়। সফল হলে Closed স্টেটে ফিরে আসে, অন্যথায় আবার Open স্টেটে চলে যায়।</li>
      </ol>
    `
  },
  {
    id: "sd-4",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["API Gateway", "BFF", "Routing"],
    question: "API Gateway এবং Backend For Frontend (BFF) প্যাটার্নের কাজ কী এবং এদের মূল পার্থক্য কী?",
    answer: `
      <p><strong>API Gateway:</strong> এটি ক্লায়েন্ট অ্যাপ্লিকেশন এবং পেছনের ব্যাকএন্ড মাইক্রোসার্ভিসগুলোর মাঝে একমাত্র প্রবেশদ্বার (Single Entry Point) হিসেবে কাজ করে।</p>
      <h4>API Gateway-এর দায়িত্ব:</h4>
      <ul>
        <li>Request Routing & Load Balancing.</li>
        <li>Authentication & Authorization.</li>
        <li>Rate Limiting & Throttling.</li>
        <li>Protocol Translation (e.g. REST/HTTP to gRPC/AMQP).</li>
      </ul>
      <h4>Backend For Frontend (BFF) Pattern:</h4>
      <p>একটি গ্লোবাল সাধারণ API Gateway-এর বদলে নির্দিষ্ট ক্লায়েন্টের (Web App, Mobile App, Smart TV) নিজস্ব আলাদা প্রয়োজন অনুযায়ী তৈরি করা ডেডিকেটেড ব্যাকএন্ড লেয়ারকে <strong>BFF</strong> বলে। মোবাইল অ্যাপের জন্য কম ডেটার পেলোড এবং ওয়েব অ্যাপের জন্য বিস্তৃত ডেটার রেসপন্স আলাদা আলাদা BFF প্রদান করে।</p>
    `
  },
  {
    id: "sd-5",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["CAP Theorem", "PACELC", "Distributed Systems"],
    question: "CAP Theorem এবং PACELC Theorem ডিস্ট্রিবিউটেড ডাটাবেজ ডিজাইনে কী ভূমিকা রাখে?",
    answer: `
      <p><strong>CAP Theorem:</strong> কোনো ডিস্ট্রিবিউটেড ডাটাবেজ একই সাথে নিম্নের ৩টি গ্যারান্টি প্রদান করতে পারে না (সর্বোচ্চ ২টি বেছে নিতে হয়):</p>
      <ul>
        <li><strong>Consistency (C):</strong> সব নোডে একই সময়ে একই ডাটা দেখাবে।</li>
        <li><strong>Availability (A):</strong> প্রতিটি রিকোয়েস্ট সফল রেসপন্স পাবে (এমনকি কোনো নোড ফেইল করলেও)।</li>
        <li><strong>Partition Tolerance (P):</strong> নেটওয়ার্ক ড্রপ বা নোডের মাঝে কমুনিকেশন বিচ্ছিন্ন হলেও সিস্টেম চলতে থাকবে।</li>
      </ul>
      <p>ডিস্ট্রিবিউটেড সিস্টেমে নেটওয়ার্ক পার্টিশন এড়ানো অসম্ভব (P বাধ্যতামূলক)। ফলে ডাটাবেজকে <strong>CP (e.g. MongoDB, HBase)</strong> অথবা <strong>AP (e.g. Cassandra, DynamoDB)</strong> নির্বাচন করতে হয়।</p>
      <h4>PACELC Theorem:</h4>
      <p>CAP Theorem শুধুমাত্র নেটওয়ার্ক Partition (P) ঘটলে কী হবে তা বলে। কিন্তু নেটওয়ার্ক যখন স্বাভাবিক থাকে (Else - E), তখন **Latency (L)** এবং **Consistency (C)** এর মধ্যে ব্যালেন্স করতে হয়। এটিই **PACELC Theorem** (If **P**artition then **A**vailabilty vs **C**onsistency, **E**lse **L**atency vs **C**onsistency)।</p>
    `
  },
  {
    id: "sd-6",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "Algorithms", "Token Bucket"],
    question: "Rate Limiting কী? Token Bucket এবং Leaky Bucket অ্যালগরিদমের পার্থক্য কী?",
    answer: `
      <p><strong>Rate Limiting:</strong> ক্ষতিকারক অ্যাটাক (DDoS, Brute Force) থেকে বাঁচতে এবং সার্ভার রিসোর্স নিয়ন্ত্রণে নির্দিষ্ট সময়ে ক্লায়েন্টের অতিরিক্ত রিকোয়েস্ট দেওয়া সীমিত করার মেকানিজম।</p>
      <h4>Token Bucket Algorithm:</h4>
      <p>একটি বালতিতে (Bucket) নির্দিষ্ট ক্যাপাসিটি অনুযায়ী প্রতিনিয়ত টোকেন জমা হতে থাকে। প্রতিবার রিকোয়েস্ট আসলে বালতি থেকে ১টি টোকেন কেটে নেওয়া হয়। বালতিতে টোকেন না থাকলে রিকোয়েস্ট রিজেক্ট (429 Too Many Requests) হয়।</p>
      <p><em>সুবিধা:</em> আকস্মিক অতিরিক্ত ট্রাফিক স্পাইক (Traffic Bursts) হ্যান্ডেল করতে পারে।</p>
      <h4>Leaky Bucket Algorithm:</h4>
      <p>বালতির নিচে ছিদ্র থাকার মতো। যত স্পিডেই রিকোয়েস্ট বালতিতে জমা হোক না কেন, বালতির তলা দিয়ে একটি নির্দিষ্ট ধ্রুব গতিতে (Fixed Constant Rate) রিকোয়েস্টগুলো বের হয়ে আউটপুট প্রসেস হয়। বালতি ভরে গেলে বাড়তি রিকোয়েস্ট ড্রপ হয়।</p>
      <p><em>সুবিধা:</em> স্মুথ এবং ফিক্সড আউটপুট ফ্লো বজায় রাখে।</p>
    `
  },
  {
    id: "sd-7",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Distributed Tracing", "OpenTelemetry", "Observability"],
    question: "Distributed Tracing কী? OpenTelemetry, Trace ID এবং Span ID কীভাবে মাইক্রোসার্ভিস ডিবাগিংয়ে সাহায্য করে?",
    answer: `
      <p>মাইক্রোসার্ভিস আর্কিটেকচারে ১টি ক্লায়েন্ট রিকোয়েস্ট ১০-২০টি আলাদা আলাদা সার্ভিসের ভেতর দিয়ে যেতে পারে। কোথাও এরর বা পারফরম্যান্স ধীরগতি হলে কোন নির্দিষ্ট সার্ভিসে সমস্যা হয়েছে তা বের করা কঠিন। এর সমাধান হলো <strong>Distributed Tracing</strong>।</p>
      <h4>কোর কনসেপ্টসমূহ:</h4>
      <ul>
        <li><strong>Trace ID:</strong> রিকোয়েস্টটি API Gateway-এ আসার সাথে সাথেই একটি ইউনিক গ্লোবাল আইডি (Trace ID) জেনারেট হয় এবং HTTP Header মাধ্যমে পরবর্তী সকল ডাউনস্ট্রিম মাইক্রোসার্ভিসে পাস করা হয়।</li>
        <li><strong>Span ID:</strong> একক সার্ভিস বা একটি নির্দিষ্ট অপারেশনের (যেমন DB Query বা External HTTP Call) কার্যকাল রিপ্রেজেন্ট করে।</li>
        <li><strong>OpenTelemetry / Jaeger / Zipkin:</strong> এই প্রটোকল বা টুলসগুলো ডিস্ট্রিবিউট ট্রেস ডাটা সংগ্রহ ও গ্রাফিকাল ড্যাশবোর্ডে ভিশুয়ালাইজ করে ট্রাবলশুটিং সহজ করে।</li>
      </ul>
    `
  },
  {
    id: "sd-8",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Idempotency", "API Design", "Distributed Systems"],
    question: "Idempotency কী এবং ডিস্ট্রিবিউটেড পেমেন্ট সিস্টেমে Idempotency Key কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p><strong>Idempotency:</strong> কোনো API সার্ভিস বা মেথডকে একই প্যারামিটার দিয়ে একবার কল করা বা শতবার কল করার ফলাফল যদি একই (No duplicate side effects) হয়, তবে তাকে <strong>Idempotent API</strong> বলা হয়। (HTTP <code>GET</code>, <code>PUT</code>, <code>DELETE</code> বাই-ডিফল্ট Idempotent, কিন্তু <code>POST</code> নয়)।</p>
      <h4>Payment API-তে Idempotency Key বাস্তবায়ন:</h4>
      <p>মোবাইল অ্যাপে নেটওয়ার্ক ড্রপের কারণে ইউজার পেমেন্ট বাটনে ২বার চাপলে যাতে দ্বিগুণ টাকা কেটে না নেয়:</p>
      <ol>
        <li>ক্লায়েন্ট রিকোয়েস্ট হেডারে একটি ইউনিক UUID পাঠায়: <code>Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d</code>।</li>
        <li>API Gateway বা Payment Service রেডিসে (Redis) সেই Idempotency Key চেক করে।</li>
        <li>ইন-প্রোগ্রেস বা অলরেডি প্রসেসড থাকলে আগের সেভ করা রেসপন্স ফেরত দেয়, নতুন কোনো পেমেন্ট ট্রানজেকশন প্রসেস করে না।</li>
      </ol>
    `
  },
  {
    id: "sd-9",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Outbox Pattern", "CDC", "Transactional"],
    question: "Transactional Outbox Pattern কী এবং ডাটাবেজ আপডেট ও ইভেন্ট পাবলিশের মাঝে ডাটা অসঙ্গতি কীভাবে রোধ করবেন?",
    answer: `
      <p>সার্ভিসে ডাটাবেজ আপডেট করা এবং সাথে সাথে Message Broker-এ (Kafka/RabbitMQ) ইভেন্ট পাঠানো একই পারমাণবিক ট্রানজেকশনের অংশ নয়। ফলে DB সেভ হওয়ার পর মেসেজ ব্রোকার ডাউন থাকলে ইভেন্ট লস্ট হয়ে ডাটা অসঙ্গতি তৈরি হয়।</p>
      <h4>Transactional Outbox Pattern সলিউশন:</h4>
      <ol>
        <li>সার্ভিসটি মূল ডাটাবেজ টেবিল আপডেটের সাথে সাথে একই DB Transaction-এর অধীনে একটি বিশেষ <strong>Outbox Table</strong>-এ মেসেজের পেলোডটি সেভ করে। (এটি 100% Atomic)।</li>
        <li>একটি ব্যাকগ্রাউন্ড ওয়ার্কার বা <strong>Change Data Capture (CDC)</strong> টুল (যেমন Debezium) প্রতিনিয়ত Outbox Table রিড করে মেসেজ ব্রোকারে ইভেন্ট নিশ্চিতভাবে পাঠায়।</li>
        <li>সাফল্যের সাথে ইভেন্ট ব্রোকারে চলে গেলে Outbox Table থেকে রো ডিলেট বা প্রসেসড মার্ক করা হয়।</li>
      </ol>
    `
  },
  {
    id: "sd-10",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Service Mesh", "Istio", "Proxy"],
    question: "Service Mesh কী এবং Istio-এর Sidecar Proxy প্যাটার্ন কীভাবে মাইক্রোসার্ভিস কমুনিকেশন সামলায়?",
    answer: `
      <p><strong>Service Mesh:</strong> এটি মাইক্রোসার্ভিসগুলোর মধ্যে সার্ভিস-টু-সার্ভিস (East-West traffic) কমুনিকেশন, সিকিউরিটি এবং ভিজিবিলিটি ম্যানেজ করার একটি ডেডিকেটেড ইনফ্রাস্ট্রাকচার লেয়ার।</p>
      <h4>Sidecar Proxy Architecture:</h4>
      <p>প্রতিটি মাইক্রোসার্ভিসের কন্টেইনারের পাশে একটি করে লাইটওয়েট নেটওয়ার্ক প্রক্সি (যেমন Envoy Proxy) **Sidecar** হিসেবে রান করানো হয়। মাইক্রোসার্ভিসগুলো সরাসরি একে অপরের সাথে কমুনিকেট না করে তাদের স্থানীয় সাইডকার প্রক্সির মাধ্যমে কমুনিকেট করে।</p>
      <h4>সুবিধা:</h4>
      <ul>
        <li>অ্যাপ্লিকেশন কোডে কোনো পরিবর্তনের প্রয়োজন ছাড়াই mTLS (Mutual TLS) সিকিউরিটি অ্যানফোর্স করা।</li>
        <li>অটোমেটিক রিট্রাই, টাইমআউট এবং সার্কিট ব্রেকার হ্যান্ডেল করা।</li>
        <li>মেট্রিক্স এবং ডিস্ট্রিবিউটেড ট্রেসিং অটো কালেকশন।</li>
      </ul>
    `
  }
];

for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "Consistent Hashing Algorithm", tag: "Hashing", diff: "Advanced" },
    { title: "Strangler Fig Pattern for Monolith to Microservices migration", tag: "Refactoring", diff: "Advanced" },
    { title: "Bulkhead Pattern for Fault Isolation", tag: "Resilience", diff: "Intermediate" },
    { title: "Database Sharding & Cross-Shard Joins", tag: "Database", diff: "Advanced" },
    { title: "Service Discovery (Eureka, Consul, k8s DNS)", tag: "Infrastructure", diff: "Intermediate" },
    { title: "Write-Ahead Logging & WAL Replication", tag: "Storage", diff: "Advanced" },
    { title: "CDN (Content Delivery Network) & Edge Caching", tag: "Performance", diff: "Beginner" },
    { title: "Leader Election in Distributed Systems (Raft/Paxos)", tag: "Consensus", diff: "Advanced" }
  ];
  const item = topics[(i - 11) % topics.length];
  systemDesignQuestions.push({
    id: `sd-${i}`,
    category: "System Design",
    difficulty: item.diff,
    tags: [item.tag, "System Design"],
    question: `System Design-এ ${item.title}-এর ভূমিকা এবং আর্কিটেকচারাল ইউজ কেস কী?`,
    answer: `
      <p>ডিস্ট্রিবিউটেড হাই-স্কেল সিস্টেমে <strong>${item.title}</strong> ডিজাইন প্যাটার্নটি অত্যন্ত ভাইটাল।</p>
      <h4>বিস্তারিত আলোচনা:</h4>
      <p>সিস্টেমের অ্যাভেইল্যাবিলিটি, সহনশীলতা (Fault Tolerance) এবং লোড হ্যান্ডেল করতে ${item.title} অনুসরণ করা ইন্টারভিউ বোর্ডে উচ্চ প্রশংসিত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// System Design Architecture Topology for ${item.title}
{ "pattern": "${item.title}", "resilience": "High", "scale": "Distributed" }</code></pre>
      </div>
    `
  });
}
