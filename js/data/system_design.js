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
,

  {
    id: "sd-11",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Hashing","Consistent Hashing","Scaling"],
    question: "Consistent Hashing Algorithm কীভাবে কাজ করে?",
    answer: `
<p>Consistent Hashing রিং আর্কিটেকচার ব্যবহার করে নতুন নোড যোগ/বিয়োগ করলে রিলোড না বাড়িয়ে কেবল 1/N পরিমাণ কি রি-মেপিং নিশ্চিত করে।</p>
    `
  },
  {
    id: "sd-12",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Refactoring","Strangler Fig","Microservices"],
    question: "Monolith থেকে Microservices মাইগ্রেশনে Strangler Fig Pattern কী?",
    answer: `
<p>পুরো মনোলিথ একসাথে না বদলে API Gateway দিয়ে ধীরে ধীরে একটি একটি সার্ভিস আলাদা মাইক্রোসার্ভিসে সরিয়ে নেওয়া।</p>
    `
  },
  {
    id: "sd-13",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Resilience","Bulkhead","Fault Tolerance"],
    question: "System Resilience-এ Bulkhead Pattern কী?",
    answer: `
<p>প্রতিটি সার্ভিসের জন্য আলাদা থ্রেড পুল বা কানেকশন পুল বিচ্ছিন্ন রাখা, যাতে একটি সার্ভিস ফেল করলে অন্য সার্ভিস ডাউন না হয়।</p>
    `
  },
  {
    id: "sd-14",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Database","Sharding","Cross-Shard"],
    question: "Database Sharding এবং Cross-Shard Join-এর চ্যালেঞ্জ কী?",
    answer: `
<p>হরাইজন্টাল শার্ডিং ডাটাবেজ টেবিলকে বিভিন্ন সার্ভারে ভাগ করে। ভিন্ন শার্ডে থাকা ডেটায় Cross-Shard Join চড়া ধীরগতির হওয়ায় ডিনরম্যালাইজেশন ব্যবহৃত হয়।</p>
    `
  },
  {
    id: "sd-15",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Infrastructure","Service Discovery","Microservices"],
    question: "Service Discovery Pattern কীভাবে কাজ করে?",
    answer: `
<p>Service Registry (Consul, Eureka) ডিরেক্টরি রাখে, যাতে সার্ভিসগুলো নিজেদের নাম দিয়ে লাইভ কন্টেইনার IP খুঁজে ইন্টারঅ্যাক্ট করতে পারে।</p>
    `
  },
  {
    id: "sd-16",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Storage","Replication","State Machine"],
    question: "State Machine Replication এবং Distributed Write-Ahead Logging কী?",
    answer: `
<p>সব ডিস্ট্রিবিউটেড নোড একই ক্রমে একগুচ্ছ কমান্ডের ওয়াচ লগ (WAL) পেয়ে হুবহু একই স্টেট রেজাল্ট জেনারেট করাকে State Machine Replication বলে।</p>
    `
  },
  {
    id: "sd-17",
    category: "System Design",
    difficulty: "Beginner",
    tags: ["Performance","CDN","Caching"],
    question: "CDN Edge Caching এবং Push vs Pull CDN-এর পার্থক্য কী?",
    answer: `
<p>Pull CDN ইউজারের রিকুয়েস্টের পর অরিজিন সার্ভার থেকে ডেটা ক্যাশ করে। Push CDN কনটেন্ট আপডেটের সাথে সাথেই এজ নোডগুলোতে ফাইল পুশ করে।</p>
    `
  },
  {
    id: "sd-18",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Consensus","Raft","Leader Election"],
    question: "Distributed Consensus Protocols (Raft / Paxos)-এ Leader Election কীভাবে হয়?",
    answer: `
<p>নোডগুলো প্রপোজাল পাঠায় এবং ক্যোরাম (Quorum = N/2 + 1) অর্জনের মাধ্যমে মেজোরিটি নোডের ভোটে স্বাধীনভাবে নতুন Leader নির্বাচন করে।</p>
    `
  },
  {
    id: "sd-19",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Load Balancing", "Algorithms", "L4 vs L7"],
    question: "Layer 4 vs Layer 7 Load Balancing-এর পার্থক্য এবং Load Balancing Algorithms (Round Robin, Least Connections, IP Hash) কী?",
    answer: `
<p><strong>Layer 4:</strong> কেবল TCP/UDP সকেট তথ্য দেখে প্যাকট পাঠায় (অতি দ্রুত, প্যাকেট কন্টেন্ট পড়তে পারে না)।</p><p><strong>Layer 7:</strong> HTTP Headers, Cookies, URL রিড করে বুদ্ধিমান রাউটিং করে।</p><ul><li><strong>Round Robin:</strong> সমানভাবে একের পর এক নোডে ট্রাফিক বন্টন।</li><li><strong>Least Connections:</strong> সবচেয়ে কম সক্রিয় সকেট কানেকশন থাকা নোডে ট্রাফিক পাঠায়।</li></ul>
    `
  },
  {
    id: "sd-20",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["API Gateway", "Microservices", "Routing"],
    question: "API Gateway Pattern কী? Authentication, Rate Limiting, Request Collapsing এবং Service Mesh-এ এর ভূমিকা কী?",
    answer: `
<p>API Gateway হলো ফ্রন্টএন্ড এবং ব্যাকএন্ড মাইক্রোসার্ভিসের মধ্যকার সেন্ট্রাল এন্ট্রি পয়েন্ট। এটি Authentication, Rate Limiting, SSL Termination, Caching এবং Protocol Translation (REST -> gRPC) সেন্ট্রালাইজডভাবে পরিচালনা করে।</p>
    `
  },
  {
    id: "sd-21",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "Token Bucket", "Leaky Bucket"],
    question: "Rate Limiting Algorithms: Token Bucket vs Leaky Bucket vs Sliding Window Log / Counter কীভাবে কাজ করে?",
    answer: `
<p><strong>Token Bucket:</strong> নির্দিষ্ট হারে বাকেটে টোকেন জমা হয়। রিকুয়েস্ট আসলে টোকেন তুলে নেয় (Burst traffic সাপোর্ট করে)।</p><p><strong>Leaky Bucket:</strong> রিকুয়েস্ট বাকেটে পড়ে এবং ফিক্সড ফ্লো রেটে নিচে ড্রপ করে (Smooth constant rate)।</p><p><strong>Sliding Window Counter:</strong> সময় উইন্ডোকে সাব-উইন্ডোতে ভাগ করে মসৃণ ফিল্টারিং গ্যারান্টি দেয়।</p>
    `
  },
  {
    id: "sd-22",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Event-Driven", "CQRS", "Event Sourcing"],
    question: "CQRS (Command Query Responsibility Segregation) এবং Event Sourcing Architecture কীভাবে কাজ করে?",
    answer: `
<p><strong>CQRS:</strong> ডেটা রাইট (Command) এবং ডেটা রিড (Query) করার ডাটাবেজ বা মডেল সম্পূর্ণ আলাদা রাখা।</p><p><strong>Event Sourcing:</strong> অ্যাপ্লিকেশনের বর্তমান স্টেট স্টোর না করে অতীতের সকল পরিবর্তনের ঘটনার তালিকা (Sequence of Events) স্থায়ীভাবে ইমিউটেবল হিসেবে স্টোর রাখা।</p>
    `
  },
  {
    id: "sd-23",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Distributed Tracing", "OpenTelemetry", "Jaeger"],
    question: "Distributed Tracing (OpenTelemetry, Jaeger, Zipkin) কী এবং Trace ID & Span ID কীভাবে মাইক্রোসার্ভিস ডেবাগ করে?",
    answer: `
<p>মাইক্রোসার্ভিসে ইনকামিং রিকুয়েস্টে ১টি Unique <code>TraceID</code> এবং প্রতিটি ইন্টার-সার্ভিস কলে আলাদা <code>SpanID</code> জেনারেট করে প্রোপাগেট করা হয়। ফলে কোন সার্ভিসে কত মিলি-সেকেন্ড সময় নষ্ট হচ্ছে তা ভিজ্যুয়াল গ্রাফে দেখা যায়।</p>
    `
  },
  {
    id: "sd-24",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Caching", "Distributed Cache", "Memcached vs Redis"],
    question: "Distributed Caching Strategies: Memcached vs Redis এবং Cache Invalidation (Cache Aside, Write Through, Write Back) কী?",
    answer: `
<p><strong>Memcached:</strong> সিম্পল মাল্টি-থ্রেডেড কী-ভ্যালু স্টোর।</p><p><strong>Redis:</strong> রিচ ডাটা স্ট্রাকচার, পারসিস্টেন্স এবং ক্লাস্টার সাপোর্ট দেয়।</p><p><strong>Cache Invalidation:</strong> ক্যাশের ডেটা এবং অরিজিন ডাটাবেজের ডেটা সিঙ্ক রাখার সবচেয়ে কঠিন চ্যালেঞ্জ।</p>
    `
  },
  {
    id: "sd-25",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Database Scaling", "Read Replicas", "Federation"],
    question: "Database Scaling Strategies: Vertical vs Horizontal Scaling, Read Replicas, Federation এবং Sharding কী?",
    answer: `
<p><strong>Vertical:</strong> একই সার্ভারে RAM/CPU বাড়ানো (সীমিত)।</p><p><strong>Read Replicas:</strong> রিড ট্রাফিক আলাদা নোডে পাঠানো।</p><p><strong>Federation:</strong> ফাংশনালিটি অনুযায়ী ডাটাবেজ আলাদা করা (e.g. User DB, Order DB)।</p><p><strong>Sharding:</strong> একই টেবিল একাধিক নোডে ভাগ করা।</p>
    `
  },
  {
    id: "sd-26",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Message Queue", "PubSub", "Backpressure"],
    question: "Message Queues (Kafka vs RabbitMQ) ডিস্ট্রিবিউটেড সিস্টেমে Decoupling এবং Asynchronous Processing কীভাবে গ্যারান্টি দেয়?",
    answer: `
<p>সার্ভিসগুলোর মধ্যে সরাসরি synchronous HTTP কল বন্ধ করে মেসেজ ব্রোকার ব্যবহার করা হয়। ফলে Producer ডাউন বা স্লো হলেও Consumer নিজের সুবিধাজনক গতিতে ব্যাকপ্রেশার হ্যান্ডেল করে প্রসেস করতে পারে।</p>
    `
  },
  {
    id: "sd-27",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Search Engine", "Elasticsearch", "Indexing"],
    question: "Design a Distributed Search System (e.g., E-commerce Search / Google Search) — Inverted Index এবং Ranking Architecture কী?",
    answer: `
<p>শব্দগুলোকে টোকেনাইজ করে Inverted Index তৈরি করা। বিএম২৫ (BM25) বা TF-IDF অ্যালগরিদম দিয়ে প্রাসঙ্গিকতা স্কোয়ার (Relevance Score) গণনা করা এবং দ্রুত রিট্রাইভালের জন্য ইন-মেমোরি ডিস্ট্রিবিউটেড ক্লাস্টার ব্যবহার করা।</p>
    `
  },
  {
    id: "sd-28",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "URL Shortener", "Base62"],
    question: "Design a URL Shortener (e.g., TinyURL) — Hash Function, Base62 Encoding এবং Unique ID Generation কীভাবে করবেন?",
    answer: `
<p>Auto-increment ID বা KGS (Key Generation Service) দিয়ে ইউনিক ইনটিজার আইডি তৈরি করা। পরে সেটিকে Base62 (a-z, A-Z, 0-9) দিয়ে এনকোড করে ৭ ক্যারেক্টারের ইউনিক শর্ট ইউআরএল তৈরি করা। ক্যাশিংয়ের জন্য Redis ব্যবহার করা।</p>
    `
  },
  {
    id: "sd-29",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Chat App", "WebSockets"],
    question: "Design a Real-time Chat Application (e.g., WhatsApp / Slack) — WebSockets, Connection Manager, PubSub এবং Storage Architecture কী?",
    answer: `
<p>লাইভ সিগন্যালিংয়ের জন্য WebSockets। কোন ইউজার কোন সকেটে কানেক্টেড তার ম্যাপিং রাখতে Redis। অফলাইন মেসেজ স্টোর করার জন্য Cassandra বা MongoDB এবং ইভেন্ট ব্রডকাস্টের জন্য Kafka/RabbitMQ।</p>
    `
  },
  {
    id: "sd-30",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Notification System", "Queues"],
    question: "Design a Scalable Notification System (Email, SMS, Push Notification) — Priority Queues, Deduplication এবং Rate Limiting কীভাবে করবেন?",
    answer: `
<p>রিকুয়েস্ট গ্রহণ করে RabbitMQ Priority Queue-তে পুশ করা। Worker প্রসেসগুলো থার্ড পার্টি এপিআই (Twilio, SendGrid, FCM) কল করবে। মেসেজ ডুপ্লিকেশন এড়াতে Redis Deduplication Lock ব্যবহার করা।</p>
    `
  },
  {
    id: "sd-31",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Rate Limiter", "Distributed Limiter"],
    question: "Design a Distributed Rate Limiter — Redis Sliding Window Counter এবং Race Condition ফিক্স কীভাবে করবেন?",
    answer: `
<p>Redis Sorted Set (ZSET) ব্যবহার করে স্ল্লাইডিং উইন্ডো টাইমস্ট্যাম্প স্টোর করা। মিলি-সেকেন্ডের কনকারেন্ট রিকুয়েস্টে Race Condition প্রতিরোধে Redis Lua Scriptিং দিয়ে অ্যাটমিকালি চেক ও আপডেট করা।</p>
    `
  },
  {
    id: "sd-32",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Video Streaming", "HLS"],
    question: "Design a Video Streaming Service (e.g., YouTube / Netflix) — Video Transcoding, HLS / DASH, CDN এবং Storage Architecture কী?",
    answer: `
<p>আপলোড করা ভিডিও Chunk করে আলাদা আলাদা রেজোলিউশনে (1080p, 720p) Transcoding (FFmpeg) করা। Adaptive Bitrate Streaming (HLS) ব্যবহার করে CDN Edge নোড থেকে ব্রাউজারে স্ট্রিম করা।</p>
    `
  },
  {
    id: "sd-33",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Security", "OAuth2", "OIDC"],
    question: "OAuth 2.0 Framework and OpenID Connect (OIDC) Authorization Code Flow with PKCE কীভাবে কাজ করে?",
    answer: `
<p><strong>OAuth 2.0:</strong> এক্সেস পারমিশন (Delegated Authorization) দেয়।</p><p><strong>OIDC:</strong> আইডি টোকেন দিয়ে আইডেন্টিটি (Authentication) দেয়। SPA বা মোবাইল অ্যাপের জন্য <strong>PKCE</strong> (Proof Key for Code Exchange) দিয়ে সিকিউর গ্রান্ট ফ্লো চালানো হয়।</p>
    `
  },
  {
    id: "sd-34",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Web Crawler", "Robots.txt"],
    question: "Design a Web Crawler (e.g., Googlebot) — URL Frontier, HTML Parser, Duplicate Detection (Bloom Filter) এবং Politeness Policy কী?",
    answer: `
<p><strong>URL Frontier:</strong> ক্রল করার ইউআরএল কিউ বজায় রাখে।</p><p><strong>Politeness:</strong> একই ডোমেনে বারবার হিট দিয়ে সার্ভার ডাউন না করা।</p><p><strong>Bloom Filter:</strong> একটি ইউআরএল আগে ক্রল করা হয়েছে কিনা তা কম মেমোরিতে চেক করা।</p>
    `
  },
  {
    id: "sd-35",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Metrics Logging", "Prometheus"],
    question: "Design a Metrics Logging and Monitoring System (e.g., Prometheus & Grafana) — Time Series DB and Pull vs Push Model কী?",
    answer: `
<p><strong>Pull Model (Prometheus):</strong> সার্ভার সার্ভিসগুলোর <code>/metrics</code> এন্ডপয়েন্ট থেকে মেট্রিক্স টেনে আনে।</p><p><strong>Time Series DB:</strong> সময়ভিত্তিক স্ন্যাপশট ডাটা অত্যন্ত সংকুচিত করে স্টোর করে। Visualizing-এর জন্য Grafana।</p>
    `
  },
  {
    id: "sd-36",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Distributed Key-Value Store", "Cassandra"],
    question: "Design a Distributed Key-Value Store (e.g., DynamoDB / Cassandra) — Consistent Hashing, Vector Clocks, Gossip Protocol এবং Hinted Handoff কী?",
    answer: `
<p>নোড ছড়াতে Consistent Hashing, নোডগুলোর নিজেদের স্ট্যাটাস নিশ্চিত করতে Gossip Protocol, ডেটার ভার্সন কনফ্লিক্ট মেটাতে Vector Clocks এবং নোড সাময়িক অফলাইন থাকলে Hinted Handoff ব্যবহার করা।</p>
    `
  },
  {
    id: "sd-37",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Service Mesh", "Istio", "Envoy"],
    question: "Service Mesh Architecture (Control Plane vs Data Plane) — Istio এবং Envoy Sidecar Proxy কীভাবে কাজ করে?",
    answer: `
<p>মাইক্রোসার্ভিসের কোড না বদলে নেটওয়ার্ক লেভেলে Mutual TLS (mTLS), Traffic Splitting (Canary Deployment) এবং Circuit Breaking পরিচালনা করার জন্য প্রতিটি পোডের সাথে Envoy Sidecar Proxy কানেক্ট থাকে।</p>
    `
  },
  {
    id: "sd-38",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Distributed Unique ID", "Snowflake"],
    question: "Design a Distributed Unique ID Generator (e.g., Twitter Snowflake Algorithm) — 64-bit ID Structure কীভাবে কাজ করে?",
    answer: `
<p>64-bit ID গঠন:</p><ul><li>1 bit: Unused (always 0)</li><li>41 bits: Timestamp (milli-seconds)</li><li>10 bits: Machine ID / Datacenter ID</li><li>12 bits: Sequence Number (per machine)</li></ul><p>এটি গ্লোবাল লক ছাড়াই প্রতি মিলি-সেকেন্ডে হাজার হাজার সর্টেবল ইউনিক আইডি জেনারেট করে।</p>
    `
  },
  {
    id: "sd-39",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Resilience", "Retry with Jitter", "Exponential Backoff"],
    question: "Network Resilience: Exponential Backoff and Full Jitter Algorithm কেন গুরুত্বপূর্ণ?",
    answer: `
<p>সার্ভার স্লো হলে সাথে সাথে রিট্রি না করে সময় দ্বিগুণ (Exponential Backoff: 1s, 2s, 4s, 8s) করে রিট্রি করা। সব ক্লায়েন্ট যাতে একই সাথে ট্রাই না করে সে জন্য র্যান্ডম ডিলে (Jitter) যোগ করা।</p>
    `
  },
  {
    id: "sd-40",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "E-commerce", "Inventory Lock"],
    question: "Design an Flash Sale / High Concurrency Inventory Management System — Race Condition & Overselling কীভাবে আটকাবেন?",
    answer: `
<p>ডাটাবেজে সরাসরি হিট না করে Redis Atomicity (Lua Script) দিয়ে স্টক কমানো। পেমেন্ট পেন্ডিং থাকলে Redis Temporary TTL Lock রাখা। স্টক ফুরিয়ে গেলে ডাটাবেজ হিট পুরোপুরি ব্লক করা।</p>
    `
  },
  {
    id: "sd-41",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Ride Sharing", "Uber"],
    question: "Design a Location-based Service (e.g., Uber / Grab) — QuadTree vs Spatial Indexing এবং Real-time Driver Matching কী?",
    answer: `
<p>ভৌগোলিক সীমানাকে ৪ ভাগে ভাগ করে <strong>QuadTree</strong> বা <strong>Google S2 Cell / H3 Spatial Index</strong> তৈরি করা। চালকের লাইভ লোকেশন WebSockets দিয়ে আপডেট করা এবং Redis Geospatial দিয়ে নিকটস্থ চালক ম্যাচ করা।</p>
    `
  },
  {
    id: "sd-42",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Disaster Recovery", "RPO", "RTO"],
    question: "Disaster Recovery (DR) Metrics: RPO (Recovery Point Objective) vs RTO (Recovery Time Objective) কী?",
    answer: `
<p><strong>RPO:</strong> সিস্টেম ক্র্যাশ করলে সর্বোচ্চ কত সময়ের ডেটা লস গ্রহণযোগ্য (যেমন: ৫ মিনিটের ডেটা)।</p><p><strong>RTO:</strong> সিস্টেম ক্র্যাশ করার পর সর্বোচ্চ কত সময়ের মধ্যে ডাউন্টাইম শেষ করে সার্ভার রিকভার করতে হবে (যেমন: ১৫ মিনিট)।</p>
    `
  },
  {
    id: "sd-43",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Distributed Storage", "S3"],
    question: "Design an Object Storage System (e.g., AWS S3 / MinIO) — Metadata Store vs Block Store Architecture কী?",
    answer: `
<p>ফাইল বাইনারিগুলোকে ছোট ছোট ব্লকে ডিস্ট্রিবিউটেড ডিস্কে (Block Store) রাখা এবং ফাইলের নাম, সাইজ, পারমিশন আলাদা রিলেশনাল/NoSQL ডাটাবেজে (Metadata Store) রাখা।</p>
    `
  },
  {
    id: "sd-44",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Zero Trust", "Security", "Architecture"],
    question: "Zero Trust Security Architecture in Microservices — Never Trust, Always Verify কীভাবে কাজ করে?",
    answer: `
<p>অভ্যন্তরীণ নেটওয়ার্কের ট্রাফিককেও নিরাপদ না ভেবে প্রতিটি মাইক্রোসার্ভিস মেথড কলে mTLS ইনক্রিপশন এবং কন্টিনিউয়াস JWT Identity & Permission Evaluation বাধ্যতামূলক করা।</p>
    `
  },
  {
    id: "sd-45",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Deployment", "Canary", "Blue-Green"],
    question: "Deployment Strategies: Blue-Green Deployment vs Canary Deployment vs Rolling Update কী?",
    answer: `
<p><strong>Blue-Green:</strong> ২ সেট সম্পূর্ণ পরিবেশ রাখা, রাউটার সোয়াপ করে ১ সেকেন্ডে রিলিজ।</p><p><strong>Canary:</strong> প্রথমে ৫% রিয়েল ইউজারের কাছে নতুন ভার্সন পাঠিয়ে টেস্ট করে পার্সেন্টেজ বাড়ানো।</p><p><strong>Rolling Update:</strong> একের পর এক কন্টেইনার রিপ্লেস করা।</p>
    `
  },
  {
    id: "sd-46",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Payment Gateway", "Idempotency"],
    question: "Design an Payment Gateway Integration — Idempotency Key, Webhook Security এবং Double Charge Prevention কীভাবে করবেন?",
    answer: `
<p>প্রতিটি পেমেন্ট রিকুয়েস্টে ইউনিক <code>Idempotency-Key</code> হেডার পাঠানো। পেমেন্ট প্রসেসরের Webhook রেসপন্স ডিজিটাল সিগনেচার (HMAC-SHA256) দিয়ে ভ্যালিডেট করা এবং DB Unique Constraint রাখা।</p>
    `
  },
  {
    id: "sd-47",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Distributed File System", "HDFS"],
    question: "Design a Distributed File System (e.g., HDFS / GFS) — NameNode vs DataNode Architecture কী?",
    answer: `
<p><strong>NameNode:</strong> মাস্টার নোড যা ডিরেক্টরি ট্রি এবং ফাইলের ব্লকের অবস্থান মেমোরিতে ধরে রাখে।</p><p><strong>DataNodes:</strong> আসল ফাইলের স্লাইস ফিজিক্যাল ডিস্কে রিকভারি রেপ্লিকেশনসহ স্টোর করে।</p>
    `
  },
  {
    id: "sd-48",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design", "Feed System", "Newsfeed"],
    question: "Design a News Feed System (e.g., Facebook News Feed / Twitter Timeline) — Fan-out on Write vs Fan-out on Read কী?",
    answer: `
<p><strong>Fan-out on Write (Push):</strong> পোস্ট হওয়ার সাথে সাথেই অনুসারীদের ইনবক্সে পোস্ট ইনসার্ট করা (সাধারণ ইউজারের জন্য ফাস্ট)।</p><p><strong>Fan-out on Read (Pull):</strong> সেলিব্রিটিদের কোটি কোটি ফলোয়ার থাকলে পোস্ট করার সময় না ঠেলে ফলোয়ারের টাইমলাইন খোলার সময় ফেচ করা।</p>
    `
  },
  {
    id: "sd-49",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["CDN", "Edge Computing", "Cloudflare Workers"],
    question: "Edge Computing (Cloudflare Workers, Vercel Edge Functions) কীভাবে ল্যাটেন্সি দূর করে?",
    answer: `
<p>ইউজারের ভৌগোলিক নিকটতম CDN Edge সার্ভারে Serverless JavaScript/Wasm কোড এক্সিকিউট করে অরিজিন সার্ভারে না গিয়ে মিলি-সেকেন্ডে সার্ভিস রেসপন্স দেওয়া।</p>
    `
  },
  {
    id: "sd-50",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Data Lake", "Data Warehouse", "ETL"],
    question: "Data Warehouse (Snowflake/BigQuery) vs Data Lake (Hadoop/S3) এবং ETL vs ELT Pipeline কী?",
    answer: `
<p><strong>Data Warehouse:</strong> স্ট্রাকচার্ড ও প্রসেসড বিজনেস ডাটা স্টোর করে।</p><p><strong>Data Lake:</strong> র (Raw) আনস্ট্রাকচার্ড বিশাল ডাটা ধরে রাখে। <strong>ELT:</strong> ডেটা আগে লেকে লোড করে পরে অন-ডিমান্ড ট্রান্সফর্ম করা।</p>
    `
  }
];
