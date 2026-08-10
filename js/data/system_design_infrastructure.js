/* =========================================================================
 * System Design & Infrastructure
 * -------------------------------------------------------------------------
 * Merged topic file. Replaces the former six standalone files:
 *   nginx.js · elasticsearch.js · rabbitmq_kafka.js · grpc.js ·
 *   redis.js · system_design.js
 *
 * Question ids are intentionally unchanged (nginx-*, redis-*, mq-*, grpc-*,
 * es-*, sd-*) so saved progress in localStorage keeps working. New material
 * added during the merge uses the sdi-* prefix.
 *
 * Layout:
 *   A. System Design Fundamentals            (sdi-1  ...)
 *   B. End-to-End Request / Network Flow     (sdi-*)
 *   C. Nginx, Reverse Proxy & Load Balancing (nginx-*)
 *   D. Redis & Caching                       (redis-*)
 *   E. RabbitMQ & Kafka                      (mq-*)
 *   F. gRPC & Service Protocols              (grpc-*)
 *   G. Elasticsearch                         (es-*)
 *   H. Microservices & Distributed Patterns  (sd-*)
 *   I. Real-World Architecture Design        (sd-*)
 *   J. Cross-Topic Integration               (sdi-*)
 * ========================================================================= */

const systemDesignInfraQuestions = [
  /* ===== SECTION A — System Design Fundamentals (8) ===== */
  {
    id: "sdi-1",
    category: "System Design",
    difficulty: "Beginner",
    tags: ["Fundamentals","Requirements","Interview Method"],
    question: "System Design আসলে কী? ইন্টারভিউতে Functional এবং Non-Functional Requirements কীভাবে আলাদা করবেন?",
    answer: `
      <p><strong>সংক্ষিপ্ত উত্তর:</strong> System Design হলো একটি বিজনেস প্রবলেমকে এমন একটি টেকনিক্যাল আর্কিটেকচারে রূপ দেওয়া, যা নির্দিষ্ট স্কেল, ল্যাটেন্সি ও নির্ভরযোগ্যতার চাহিদা পূরণ করে — এবং যার প্রতিটি সিদ্ধান্তের পেছনে একটি স্পষ্ট <em>trade-off</em> যুক্তি থাকে।</p>
      <h4>Functional vs Non-Functional Requirements</h4>
      <ul>
        <li><strong>Functional Requirements (FR):</strong> সিস্টেম <em>কী করবে</em>। যেমন — "ইউজার ভিডিও আপলোড করতে পারবে", "অর্ডার প্লেস করা যাবে"। এগুলো API এবং ডেটা মডেল নির্ধারণ করে।</li>
        <li><strong>Non-Functional Requirements (NFR):</strong> সিস্টেম <em>কতটা ভালোভাবে</em> করবে। যেমন — "p99 লেটেন্সি ২০০ms-এর নিচে", "99.99% availability", "১০ মিলিয়ন DAU"। এগুলোই আসল আর্কিটেকচার নির্ধারণ করে।</li>
      </ul>
      <p><strong>গুরুত্বপূর্ণ:</strong> ইন্টারভিউতে বেশিরভাগ ক্যান্ডিডেট সরাসরি FR নিয়ে ডিজাইন শুরু করে ফেলে। কিন্তু Netflix আর একটি ছোট ব্লগের FR প্রায় একই ("ভিডিও দেখানো") — পার্থক্য তৈরি করে NFR। তাই প্রথম ৫ মিনিট NFR স্পষ্ট করাই সবচেয়ে বেশি নম্বর আনে।</p>
      <h4>ইন্টারভিউতে অনুসরণ করার ধাপ</h4>
      <pre class="mermaid">
flowchart TD
    A["১. Requirements স্পষ্ট করা<br/>FR + NFR + Scope সীমা"] --> B["২. Capacity Estimation<br/>QPS, Storage, Bandwidth"]
    B --> C["৩. API Design<br/>endpoint + request/response"]
    C --> D["৪. Data Model<br/>SQL না NoSQL, schema"]
    D --> E["৫. High-Level Architecture<br/>বক্স-অ্যান্ড-অ্যারো ডায়াগ্রাম"]
    E --> F["৬. Deep Dive<br/>bottleneck ধরে অপ্টিমাইজ"]
    F --> G["৭. Failure + Trade-offs<br/>কী ভাঙলে কী হবে"]
      </pre>
      <span class="diagram-caption">System Design ইন্টারভিউয়ের স্ট্যান্ডার্ড ৭ ধাপ</span>
      <h4>Scope সীমিত করা</h4>
      <p>৪৫ মিনিটে পুরো YouTube ডিজাইন করা অসম্ভব। তাই শুরুতেই বলুন: "আমি upload, transcoding এবং playback-এ ফোকাস করব; recommendation ও monetization বাদ রাখছি" — এটি দুর্বলতা নয়, পরিণত ইঞ্জিনিয়ারিং জাজমেন্টের লক্ষণ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>এই NFR-গুলোর মধ্যে কোনটি আপনার আর্কিটেকচার সবচেয়ে বেশি বদলে দিল?</li>
        <li>Availability 99.9% থেকে 99.99% করলে খরচ কীভাবে বাড়বে?</li>
        <li>কোন requirement বাদ দিলে সিস্টেম দশগুণ সহজ হয়ে যেত?</li>
      </ul>
    `
  },
  {
    id: "sdi-2",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Capacity Planning","Estimation","QPS"],
    question: "Back-of-the-envelope Capacity Estimation কীভাবে করবেন? QPS, Storage এবং Bandwidth-এর হিসাব দেখান।",
    answer: `
      <p><strong>সংক্ষিপ্ত উত্তর:</strong> Capacity estimation হলো কয়েকটি সহজ গুণ-ভাগের মাধ্যমে বের করা যে সিস্টেমে কত রিকোয়েস্ট, কত ডেটা এবং কত ব্যান্ডউইথ লাগবে — যাতে বোঝা যায় একটি সার্ভারে চলবে, নাকি ১০০টি সার্ভার ও শার্ডিং লাগবে।</p>
      <h4>মনে রাখার মতো সংখ্যা</h4>
      <ul>
        <li>১ দিন ≈ <strong>৮৬,৪০০ সেকেন্ড</strong> (আনুমানিক ১০<sup>৫</sup> ধরলে হিসাব সহজ হয়)</li>
        <li>১ মিলিয়ন req/day ≈ <strong>১২ QPS</strong> (গড়)</li>
        <li><strong>Peak QPS ≈ গড় QPS × ২ থেকে ৩</strong></li>
        <li>Memory read ≈ ১০০ ns · SSD read ≈ ১০০ µs · Network round trip (একই DC) ≈ ০.৫ ms · আন্তঃমহাদেশীয় RTT ≈ ১৫০ ms</li>
      </ul>
      <h4>উদাহরণ: Twitter-সদৃশ সিস্টেম</h4>
      <div class="code-box">
        <div class="code-header"><span>estimation</span><button class="copy-btn">Copy</button></div>
        <pre><code>ধরি: 300M MAU, এর 50% দৈনিক সক্রিয় → 150M DAU
প্রতি ইউজার দিনে 2টি টুইট করে → 300M writes/day

Write QPS  = 300M / 86400 ≈ 3,500 QPS
Peak Write ≈ 3,500 × 3    ≈ 10,500 QPS

Read:Write অনুপাত ধরি 100:1
Read QPS   ≈ 350,000 QPS   ← এটাই আসল চ্যালেঞ্জ

Storage (শুধু টেক্সট):
  প্রতি টুইট ≈ 300 bytes (text + metadata)
  দৈনিক  = 300M × 300B  ≈ 90 GB/day
  ৫ বছরে = 90GB × 365 × 5 ≈ 164 TB

Media ধরলে (10% টুইটে 200KB ছবি):
  দৈনিক = 30M × 200KB ≈ 6 TB/day  ← স্টোরেজ media-ই খায়

Bandwidth (read):
  350,000 QPS × 300B ≈ 105 MB/s ≈ 840 Mbps</code></pre>
      </div>
      <h4>এই হিসাব থেকে যে সিদ্ধান্তগুলো আসে</h4>
      <ul>
        <li>Read:Write = 100:1 → <strong>আক্রমণাত্মক ক্যাশিং</strong> এবং read replica অপরিহার্য।</li>
        <li>১৬৪ TB একটি মেশিনে ধরবে না → <strong>Sharding</strong> লাগবেই।</li>
        <li>Media ও metadata আলাদা → ছবি/ভিডিও <strong>Object Storage (S3) + CDN</strong>-এ, DB-তে শুধু URL।</li>
      </ul>
      <p><strong>সাধারণ ভুল:</strong> নিখুঁত সংখ্যা বের করার চেষ্টা করা। ইন্টারভিউয়ার magnitude দেখতে চান — "১০ হাজার QPS নাকি ১০ লাখ QPS" — দশমিকের নিখুঁততা নয়। রাউন্ড ফিগার ব্যবহার করুন এবং assumption জোরে জোরে বলুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ট্রাফিক ১০ গুণ বাড়লে কোন কম্পোনেন্ট আগে ভাঙবে?</li>
        <li>Read:Write অনুপাত উল্টে গেলে (write-heavy) ডিজাইন কীভাবে বদলাবে?</li>
      </ul>
    `
  },
  {
    id: "sdi-3",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Scalability","Horizontal Scaling","Stateless"],
    question: "Vertical vs Horizontal Scaling-এর পার্থক্য কী? Stateless সার্ভিস কেন স্কেলিংয়ের পূর্বশর্ত?",
    answer: `
      <p><strong>সংক্ষিপ্ত উত্তর:</strong> Vertical scaling মানে একটি মেশিনকে আরও শক্তিশালী করা (bigger box), আর Horizontal scaling মানে আরও মেশিন যোগ করা (more boxes)। বাস্তব সিস্টেম শেষ পর্যন্ত horizontal-এ যেতে বাধ্য, কারণ একটি মেশিনের আকারের সীমা আছে কিন্তু মেশিনের সংখ্যার নেই।</p>
      <h4>তুলনা</h4>
      <table>
        <tr><th>দিক</th><th>Vertical (Scale Up)</th><th>Horizontal (Scale Out)</th></tr>
        <tr><td>পদ্ধতি</td><td>CPU/RAM বাড়ানো</td><td>নতুন নোড যোগ</td></tr>
        <tr><td>সীমা</td><td>হার্ডওয়্যারের সর্বোচ্চ সাইজ</td><td>প্রায় সীমাহীন</td></tr>
        <tr><td>Downtime</td><td>সাধারণত রিবুট লাগে</td><td>শূন্য (নোড যোগ/বাদ)</td></tr>
        <tr><td>Fault tolerance</td><td>Single point of failure</td><td>একটি নোড গেলেও চলে</td></tr>
        <tr><td>খরচের ধরন</td><td>Non-linear (দ্বিগুণ ক্ষমতা = ৪ গুণ দাম)</td><td>প্রায় linear</td></tr>
        <tr><td>জটিলতা</td><td>কম</td><td>বেশি (LB, ডেটা কনসিসটেন্সি)</td></tr>
      </table>
      <h4>Stateless কেন পূর্বশর্ত</h4>
      <p>Horizontal scaling তখনই কাজ করে যখন <strong>যেকোনো রিকোয়েস্ট যেকোনো সার্ভারে যেতে পারে</strong>। সার্ভার যদি লোকাল মেমরিতে সেশন রাখে (stateful), তাহলে ইউজারকে বাধ্যতামূলকভাবে একই সার্ভারে পাঠাতে হয় (sticky session) — এতে সেই সার্ভার ডাউন হলে ইউজার লগআউট হয়ে যায় এবং লোড অসমান হয়।</p>
      <pre class="mermaid">
flowchart LR
    subgraph Stateful["Stateful (সমস্যা)"]
      C1[Client A] -->|sticky| S1["Server 1<br/>session A মেমরিতে"]
      S1 -.->|ক্র্যাশ হলে<br/>সেশন হারায়| X((✕))
    end
    subgraph Stateless["Stateless (সঠিক)"]
      C2[Client B] --> LB[Load Balancer]
      LB --> S2[Server 1]
      LB --> S3[Server 2]
      LB --> S4[Server 3]
      S2 --> R[(Redis<br/>শেয়ার্ড সেশন)]
      S3 --> R
      S4 --> R
    end
      </pre>
      <span class="diagram-caption">State বাইরে সরালে যেকোনো নোড যেকোনো রিকোয়েস্ট সামলাতে পারে</span>
      <p><strong>বাস্তব নিয়ম:</strong> state সম্পূর্ণ দূর করা যায় না — শুধু <em>সরানো</em> যায়। সেশন যায় Redis-এ, ফাইল যায় S3-তে, ডেটা যায় ডাটাবেজে। অ্যাপ্লিকেশন সার্ভার তখন disposable হয়ে যায়, যা auto-scaling ও rolling deploy সম্ভব করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>WebSocket কানেকশন তো stateful — সেটি কীভাবে স্কেল করবেন?</li>
        <li>Sticky session কখন গ্রহণযোগ্য?</li>
        <li>ডাটাবেজ layer horizontal scale করা কেন app layer-এর চেয়ে কঠিন?</li>
      </ul>
    `
  },
  {
    id: "sdi-4",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Availability","Reliability","SLA","SLO"],
    question: "Availability, Reliability এবং Durability-এর পার্থক্য কী? \"Nine\"-এর হিসাব এবং SLA/SLO/SLI বুঝিয়ে বলুন।",
    answer: `
      <p>তিনটি শব্দ প্রায়ই গুলিয়ে ফেলা হয়, কিন্তু এদের অর্থ আলাদা:</p>
      <ul>
        <li><strong>Availability:</strong> সিস্টেম কত শতাংশ সময় রিকোয়েস্ট গ্রহণ করতে পারে। (সিস্টেম কি চালু আছে?)</li>
        <li><strong>Reliability:</strong> সিস্টেম কত শতাংশ ক্ষেত্রে <em>সঠিক</em> ফল দেয়। (চালু থেকেও ভুল উত্তর দিলে সেটি unreliable।)</li>
        <li><strong>Durability:</strong> একবার লেখা ডেটা ভবিষ্যতে হারাবে না — এমন নিশ্চয়তা। (S3-এর দাবি 99.999999999% বা ১১টি nine।)</li>
      </ul>
      <h4>Nine-এর হিসাব (বার্ষিক ডাউনটাইম)</h4>
      <table>
        <tr><th>Availability</th><th>নাম</th><th>বার্ষিক ডাউনটাইম</th><th>সাপ্তাহিক</th></tr>
        <tr><td>99%</td><td>Two nines</td><td>৩.৬৫ দিন</td><td>১.৬৮ ঘণ্টা</td></tr>
        <tr><td>99.9%</td><td>Three nines</td><td>৮.৭৬ ঘণ্টা</td><td>১০.১ মিনিট</td></tr>
        <tr><td>99.99%</td><td>Four nines</td><td>৫২.৬ মিনিট</td><td>১.০১ মিনিট</td></tr>
        <tr><td>99.999%</td><td>Five nines</td><td>৫.২৬ মিনিট</td><td>৬.০ সেকেন্ড</td></tr>
      </table>
      <p><strong>মনে রাখবেন:</strong> সিরিজে যুক্ত কম্পোনেন্টের availability <em>গুণ</em> হয়। ৯৯.৯% করে ৩টি সার্ভিস চেইনে থাকলে মোট = 0.999³ ≈ <strong>99.7%</strong> — অর্থাৎ প্রতিটি নির্ভরতা যোগ করলে মোট availability কমে। এজন্যই redundancy ও graceful degradation দরকার।</p>
      <h4>SLI, SLO, SLA</h4>
      <ul>
        <li><strong>SLI (Indicator):</strong> মাপা মেট্রিক। যেমন — "সফল রিকোয়েস্টের অনুপাত", "p99 latency"।</li>
        <li><strong>SLO (Objective):</strong> অভ্যন্তরীণ লক্ষ্য। যেমন — "p99 latency ৩০ দিনে ৩০০ms-এর নিচে থাকবে"। SLA-এর চেয়ে কড়া রাখা হয়।</li>
        <li><strong>SLA (Agreement):</strong> গ্রাহকের সঙ্গে আইনি চুক্তি, লঙ্ঘনে আর্থিক ক্ষতিপূরণ। যেমন — "৯৯.৯% না দিলে ১০% ক্রেডিট"।</li>
      </ul>
      <h4>Error Budget</h4>
      <p>SLO ৯৯.৯% মানে মাসে প্রায় <strong>৪৩ মিনিট</strong> ব্যর্থতার "বাজেট" আছে। এই বাজেট অবশিষ্ট থাকলে টিম দ্রুত ফিচার রিলিজ করতে পারে; বাজেট শেষ হলে নতুন রিলিজ থামিয়ে নির্ভরযোগ্যতার কাজ করতে হয়। এটি "কত দ্রুত ছাড়ব" বনাম "কত স্থিতিশীল রাখব" — এই দ্বন্দ্বকে সংখ্যায় রূপ দেয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Availability বাড়াতে গিয়ে কোথায় consistency ছাড়তে হয়?</li>
        <li>Five nines বাস্তবে কেন প্রায় অসম্ভব ও অত্যন্ত ব্যয়বহুল?</li>
        <li>আপনার সার্ভিস ৯৯.৯৯% কিন্তু নির্ভরশীল থার্ড-পার্টি ৯৯% — আপনি কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-5",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Latency","Throughput","Percentile","Performance"],
    question: "Latency এবং Throughput-এর সম্পর্ক কী? p50-এর বদলে p99 কেন দেখা হয়?",
    answer: `
      <p><strong>Latency</strong> = একটি রিকোয়েস্ট শেষ হতে কত সময় লাগে (সেকেন্ড)। <strong>Throughput</strong> = প্রতি সেকেন্ডে কতগুলো রিকোয়েস্ট শেষ হয় (QPS)। এরা এক জিনিস নয় — batching করে throughput বাড়ানো যায়, কিন্তু তাতে প্রতিটি রিকোয়েস্টের latency বেড়ে যায়।</p>
      <h4>Percentile কেন গড়ের চেয়ে ভালো</h4>
      <p>গড় (mean) outlier লুকিয়ে ফেলে। ধরুন ১০০টি রিকোয়েস্টের ৯৯টি ১০ms এবং ১টি ৫০০০ms নিল — গড় দাঁড়ায় ~৬০ms, দেখতে ভালো লাগে। কিন্তু একজন ইউজার ৫ সেকেন্ড অপেক্ষা করেছেন। Percentile সেটি ধরে ফেলে:</p>
      <ul>
        <li><strong>p50 (median):</strong> অর্ধেক ইউজারের অভিজ্ঞতা — "স্বাভাবিক" অবস্থা।</li>
        <li><strong>p95 / p99:</strong> সবচেয়ে ধীর ৫% / ১% — এখানেই timeout, GC pause, cold cache, নয়েজি নেইবার ধরা পড়ে।</li>
        <li><strong>p99.9:</strong> বড় সিস্টেমে গুরুত্বপূর্ণ, কারণ এই ইউজাররাই সাধারণত সবচেয়ে সক্রিয় (বেশি ডেটা → বেশি ধীর)।</li>
      </ul>
      <h4>Tail Latency Amplification</h4>
      <p>মাইক্রোসার্ভিসে একটি পেজ লোড করতে ১০০টি ইন্টারনাল কল লাগলে, প্রতিটির p99 = ১০ms হলেও অন্তত একটি ধীর কল পাওয়ার সম্ভাবনা প্রায় <strong>৬৩%</strong> (1 − 0.99¹⁰⁰)। অর্থাৎ কম্পোনেন্টের p99 হয়ে যায় ইউজারের p50।</p>
      <pre class="mermaid">
flowchart TD
    U[Client Request] --> G[API Gateway]
    G --> A["Service A<br/>p99 = 10ms"]
    G --> B["Service B<br/>p99 = 10ms"]
    G --> C["Service C<br/>p99 = 10ms"]
    A --> R{"সব রেসপন্স<br/>একত্র করা"}
    B --> R
    C --> R
    R --> U2["ইউজারের latency =<br/>সবচেয়ে ধীর কলটি"]
      </pre>
      <span class="diagram-caption">Fan-out করলে ইউজার সবচেয়ে ধীর কলের অপেক্ষায় থাকে — tail latency বেড়ে যায়</span>
      <h4>প্রতিকার</h4>
      <ul>
        <li><strong>Hedged requests:</strong> p95 সময় পার হলে দ্বিতীয় রেপ্লিকায় একই রিকোয়েস্ট পাঠানো, যেটি আগে আসে সেটি নেওয়া।</li>
        <li><strong>Timeout + fallback:</strong> ধীর নন-ক্রিটিক্যাল কল বাদ দিয়ে ডিফল্ট ডেটা দেখানো (graceful degradation)।</li>
        <li><strong>Fan-out কমানো:</strong> ডেটা আগেই জোড়া লাগিয়ে রাখা (denormalization)।</li>
        <li><strong>Connection pooling ও keep-alive:</strong> প্রতি কলে TCP/TLS হ্যান্ডশেক এড়ানো।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>p99 খারাপ কিন্তু p50 ভালো — কোথায় খুঁজবেন?</li>
        <li>Throughput বাড়ালে latency কেন বাড়ে (queueing theory)?</li>
        <li>Hedged request কখন ক্ষতিকর?</li>
      </ul>
    `
  },
  {
    id: "sdi-6",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Consistency","Eventual Consistency","Distributed Systems"],
    question: "Strong Consistency এবং Eventual Consistency-এর পার্থক্য কী? কোন সিস্টেমে কোনটি বেছে নেবেন?",
    answer: `
      <p><strong>Strong Consistency:</strong> write সফল হওয়ার পর যেকোনো নোড থেকে পড়লে সর্বশেষ মানটিই পাওয়া যায়। <strong>Eventual Consistency:</strong> কিছু সময়ের জন্য বিভিন্ন নোড ভিন্ন মান দিতে পারে, কিন্তু নতুন write না এলে সবাই শেষে একই মানে পৌঁছায়।</p>
      <h4>কেন eventual consistency মেনে নেওয়া হয়</h4>
      <p>Strong consistency পেতে হলে write-কে একাধিক নোডে কনফার্ম করতে হয়, যা <strong>ল্যাটেন্সি বাড়ায়</strong> এবং নেটওয়ার্ক পার্টিশনের সময় <strong>availability কমায়</strong> (CAP theorem)। গ্লোবাল সিস্টেমে আন্তঃমহাদেশীয় RTT-ই ১৫০ms — প্রতিটি write-এ সেই খরচ দেওয়া অবাস্তব।</p>
      <pre class="mermaid">
sequenceDiagram
    participant C as Client
    participant P as Primary (US)
    participant R as Replica (EU)
    Note over C,R: Eventual Consistency
    C->>P: WRITE x = 5
    P-->>C: OK (সাথে সাথে)
    P->>R: async replicate
    Note over R: এই ফাঁকে EU থেকে পড়লে<br/>পুরনো মান আসতে পারে
    R-->>P: ack
    Note over C,R: এখন সব নোডে x = 5
      </pre>
      <span class="diagram-caption">Async replication দ্রুত write দেয়, বিনিময়ে সাময়িক stale read</span>
      <h4>মাঝামাঝি মডেল (ইন্টারভিউতে বাড়তি নম্বর)</h4>
      <ul>
        <li><strong>Read-your-own-writes:</strong> ইউজার নিজের করা পরিবর্তন সবসময় দেখবে (নিজের রিড primary-তে পাঠিয়ে)। প্রোফাইল আপডেটে অপরিহার্য।</li>
        <li><strong>Monotonic reads:</strong> একবার নতুন মান দেখলে পরে আর পুরনো মান দেখাবে না (একই রেপ্লিকায় পিন করে)।</li>
        <li><strong>Causal consistency:</strong> কারণ-ফলের ক্রম বজায় থাকে — কমেন্টের আগে তার উত্তর দেখাবে না।</li>
      </ul>
      <h4>কোথায় কোনটি</h4>
      <table>
        <tr><th>Strong Consistency দরকার</th><th>Eventual Consistency যথেষ্ট</th></tr>
        <tr><td>ব্যাংক ব্যালান্স, পেমেন্ট</td><td>সোশ্যাল মিডিয়ার লাইক কাউন্ট</td></tr>
        <tr><td>ইনভেন্টরি (overselling ঠেকাতে)</td><td>ভিউ কাউন্ট, অ্যানালিটিক্স</td></tr>
        <tr><td>ইউনিক ইউজারনেম রেজিস্ট্রেশন</td><td>নিউজ ফিড, রেকমেন্ডেশন</td></tr>
        <tr><td>সিট/টিকিট বুকিং</td><td>DNS, CDN কনটেন্ট</td></tr>
      </table>
      <p><strong>বাস্তব নিয়ম:</strong> পুরো সিস্টেমে একটি মডেল বেছে নেওয়ার দরকার নেই। একই ই-কমার্স অ্যাপে চেকআউট strongly consistent, আর "কতজন এটি দেখছে" eventually consistent হতে পারে। ডেটা অনুযায়ী আলাদা করাই পরিণত ডিজাইন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Eventual consistency-তে দুটি নোডে বিরোধী write হলে কীভাবে মেলাবেন (LWW, vector clock, CRDT)?</li>
        <li>Quorum (W + R > N) কীভাবে strong consistency-র কাছাকাছি নিয়ে যায়?</li>
      </ul>
    `
  },
  {
    id: "sdi-7",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Backpressure","Load Shedding","Resilience"],
    question: "Backpressure কী? সিস্টেম ওভারলোডেড হলে Load Shedding কীভাবে সিস্টেমকে বাঁচায়?",
    answer: `
      <p><strong>Backpressure</strong> হলো এমন একটি সংকেত-ব্যবস্থা যেখানে ধীরগতির কনজিউমার দ্রুতগতির প্রডিউসারকে "আস্তে পাঠাও" বলতে পারে। এটি না থাকলে কিউ অসীম বাড়ে, মেমরি শেষ হয় এবং সার্ভিস ক্র্যাশ করে।</p>
      <h4>Backpressure না থাকলে যা হয়</h4>
      <pre class="mermaid">
flowchart LR
    P["Producer<br/>10,000 req/s"] --> Q["Unbounded Queue<br/>অসীম বাড়ছে"]
    Q --> C["Consumer<br/>1,000 req/s"]
    Q -.-> M["Memory শেষ<br/>→ OOM Crash"]
      </pre>
      <span class="diagram-caption">সীমাহীন বাফার সমস্যা লুকায় মাত্র — সমাধান করে না</span>
      <p>মূল অন্তর্দৃষ্টি: বাফার বড় করলে সমস্যা <em>দেরিতে</em> আসে, কিন্তু তখন latency এত বেড়ে যায় যে প্রতিটি রেসপন্স ইতিমধ্যেই অকেজো (ক্লায়েন্ট timeout করে ফেলেছে)। একে বলে <strong>bufferbloat</strong>।</p>
      <h4>Backpressure প্রয়োগের কৌশল</h4>
      <ul>
        <li><strong>Bounded queue:</strong> কিউয়ের সর্বোচ্চ সাইজ নির্ধারণ; পূর্ণ হলে সাথে সাথে reject।</li>
        <li><strong>TCP flow control:</strong> নেটওয়ার্ক স্তরে বিল্ট-ইন; Node.js Streams-এ <code>pipeline()</code> এটি স্বয়ংক্রিয়ভাবে ব্যবহার করে।</li>
        <li><strong>Pull-based consumption:</strong> Kafka-তে কনজিউমার নিজে গতি ঠিক করে টানে, ব্রোকার ঠেলে দেয় না।</li>
        <li><strong>Prefetch limit:</strong> RabbitMQ-তে <code>prefetch(10)</code> — একসাথে ১০টির বেশি unacked মেসেজ যাবে না।</li>
      </ul>
      <h4>Load Shedding: ইচ্ছাকৃতভাবে রিকোয়েস্ট ফেলে দেওয়া</h4>
      <p>ক্ষমতার বাইরে গেলে <strong>সব রিকোয়েস্ট ধীরে সার্ভ করার চেয়ে কিছু রিকোয়েস্ট দ্রুত reject করা ভালো</strong>। ৫০% ইউজারকে ভালো সার্ভিস দেওয়া, সবাইকে timeout দেওয়ার চেয়ে উত্তম।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// অগ্রাধিকার-ভিত্তিক load shedding
const MAX_INFLIGHT = 500;
let inflight = 0;

function priorityOf(req) {
  if (req.path.startsWith('/api/checkout')) return 0; // সর্বোচ্চ
  if (req.path.startsWith('/api/orders'))   return 1;
  return 2;                                            // recommendation ইত্যাদি
}

app.use((req, res, next) => {
  const p = priorityOf(req);
  // চাপ বাড়লে আগে কম গুরুত্বপূর্ণ ট্রাফিক ফেলে দিন
  const limit = MAX_INFLIGHT / (p + 1);
  if (inflight >= limit) {
    res.set('Retry-After', '2');
    return res.status(503).json({ error: 'Service overloaded' });
  }
  inflight++;
  res.on('finish', () => inflight--);
  next();
});</code></pre>
      </div>
      <p><strong>জরুরি:</strong> reject করার সময় <code>429</code>/<code>503</code>-এর সঙ্গে <code>Retry-After</code> হেডার দিন, এবং ক্লায়েন্টে <strong>exponential backoff + jitter</strong> ব্যবহার করুন — নাহলে সব ক্লায়েন্ট একসাথে রিট্রাই করে retry storm তৈরি করবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Load shedding এবং rate limiting-এর পার্থক্য কী?</li>
        <li>Circuit breaker কীভাবে backpressure-এর পরিপূরক?</li>
        <li>কিউ খালি হচ্ছে না — কীভাবে ডিবাগ করবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-8",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Observability","Monitoring","Logging","Metrics"],
    question: "Observability-এর তিনটি স্তম্ভ (Logs, Metrics, Traces) কী? Monitoring এবং Observability-র পার্থক্য কী?",
    answer: `
      <p><strong>Monitoring</strong> উত্তর দেয় "কী ভাঙল?" — আগে থেকে জানা প্রশ্নের ড্যাশবোর্ড। <strong>Observability</strong> উত্তর দেয় "কেন ভাঙল?" — আগে থেকে না-ভাবা প্রশ্নও ডেটা থেকে জিজ্ঞেস করতে পারা। মাইক্রোসার্ভিসে failure mode অসংখ্য, তাই শুধু ড্যাশবোর্ড যথেষ্ট নয়।</p>
      <h4>তিনটি স্তম্ভ</h4>
      <table>
        <tr><th>স্তম্ভ</th><th>কী দেয়</th><th>খরচ</th><th>টুল</th></tr>
        <tr><td><strong>Metrics</strong></td><td>সংখ্যাভিত্তিক টাইম-সিরিজ (QPS, error rate, p99)</td><td>সবচেয়ে সস্তা</td><td>Prometheus, Grafana</td></tr>
        <tr><td><strong>Logs</strong></td><td>নির্দিষ্ট ঘটনার বিস্তারিত রেকর্ড</td><td>ব্যয়বহুল (ভলিউম)</td><td>ELK, Loki</td></tr>
        <tr><td><strong>Traces</strong></td><td>একটি রিকোয়েস্টের সার্ভিস-টু-সার্ভিস যাত্রা</td><td>মাঝারি (sampling)</td><td>Jaeger, OpenTelemetry</td></tr>
      </table>
      <pre class="mermaid">
flowchart TD
    A["🚨 Alert: p99 latency বেড়েছে"] --> B["Metrics: কোন সার্ভিস?<br/>→ order-service"]
    B --> C["Traces: রিকোয়েস্টের কোথায় সময় যাচ্ছে?<br/>→ DB call = 2.4s"]
    C --> D["Logs: ঐ ট্রেসের exact error<br/>→ 'lock wait timeout'"]
    D --> E["✅ মূল কারণ শনাক্ত"]
      </pre>
      <span class="diagram-caption">তিন স্তম্ভ একসাথে ব্যবহার করলে alert থেকে root cause পর্যন্ত পথ তৈরি হয়</span>
      <h4>Structured Logging</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ খারাপ: grep করা কঠিন, ফিল্টার করা যায় না
console.log('User ' + userId + ' failed to checkout: ' + err.message);

// ✅ ভালো: JSON — ইনডেক্স ও query করা যায়
logger.error({
  event: 'checkout_failed',
  userId,
  orderId,
  traceId: ctx.traceId,     // ট্রেসের সঙ্গে লগ জোড়া লাগে
  errorCode: err.code,
  durationMs: Date.now() - start
}, 'Checkout failed');</code></pre>
      </div>
      <p><strong>মূল কৌশল:</strong> প্রতিটি লগে <code>traceId</code> রাখুন। তাহলে একটি ধীর ট্রেস দেখে সরাসরি সেই রিকোয়েস্টের সব সার্ভিসের লগ ফিল্টার করা যায় — মাইক্রোসার্ভিস ডিবাগিংয়ে এটিই সবচেয়ে বড় সময় বাঁচায়।</p>
      <h4>যে চারটি সিগন্যাল সবসময় মাপবেন (RED + USE)</h4>
      <ul>
        <li><strong>Rate:</strong> প্রতি সেকেন্ডে রিকোয়েস্ট</li>
        <li><strong>Errors:</strong> ব্যর্থ রিকোয়েস্টের হার</li>
        <li><strong>Duration:</strong> latency distribution (গড় নয়, percentile)</li>
        <li><strong>Saturation:</strong> রিসোর্স কতটা পূর্ণ (CPU, কানেকশন পুল, কিউ ডেপথ)</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Trace sampling কীভাবে করবেন — খরচ ও তথ্যের ভারসাম্য?</li>
        <li>Alert fatigue কীভাবে এড়াবেন? কোন জিনিসে alert দেবেন — cause না symptom?</li>
        <li>Cardinality explosion কী এবং কেন Prometheus-এ বিপজ্জনক?</li>
      </ul>
    `
  },
  /* ===== SECTION B — End-to-End Request / Network Flow (7) ===== */
  {
    id: "sdi-9",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Request Flow","Architecture","End-to-End"],
    question: "একজন ইউজার ব্রাউজারে URL টাইপ করার পর ডাটাবেজ পর্যন্ত পৌঁছে আবার ফিরে আসা পর্যন্ত সম্পূর্ণ যাত্রাটি ধাপে ধাপে ব্যাখ্যা করুন।",
    answer: `
      <p>এটি সবচেয়ে বেশি জিজ্ঞাসিত সিনিয়র-লেভেল প্রশ্ন, কারণ একটি উত্তরেই নেটওয়ার্কিং, ইনফ্রাস্ট্রাকচার, ব্যাকএন্ড ও ডাটাবেজ — সব জ্ঞান যাচাই হয়ে যায়।</p>
      <pre class="mermaid">
flowchart TD
    A["Browser / Mobile Client"] --> B["DNS Resolution<br/>ডোমেইন → IP"]
    B --> C["TCP Handshake + TLS Handshake"]
    C --> D["CDN / Edge<br/>স্ট্যাটিক হিট হলে এখানেই শেষ"]
    D -->|cache miss| E["Load Balancer (L4/L7)"]
    E --> F["Nginx / Reverse Proxy<br/>TLS termination, gzip, rate limit"]
    F --> G["API Gateway<br/>auth, routing, quota"]
    G --> H["Application Server<br/>Node.js / NestJS"]
    H --> I{"AuthN / AuthZ<br/>JWT যাচাই"}
    I -->|বৈধ| J["Business Logic"]
    J --> K{"Redis Cache<br/>hit?"}
    K -->|hit| R["Response তৈরি"]
    K -->|miss| L["Database<br/>MySQL / MongoDB"]
    L --> M["Cache-এ লিখে রাখা"]
    M --> R
    J -.->|async| N["Message Queue<br/>Kafka / RabbitMQ"]
    N -.-> O["Worker / Microservices<br/>email, invoice, analytics"]
    R --> P["Response ফেরত<br/>gzip + cache headers"]
    P --> A
      </pre>
      <span class="diagram-caption">একটি রিকোয়েস্টের সম্পূর্ণ যাত্রা — ডটেড লাইন মানে অ্যাসিঙ্ক্রোনাস, ইউজার অপেক্ষা করে না</span>
      <h4>ধাপে ধাপে</h4>
      <ol>
        <li><strong>DNS Resolution:</strong> ব্রাউজার ক্যাশ → OS ক্যাশ → রিসলভার → root → TLD → authoritative। ফল IP ঠিকানা। (২০–১২০ms, ক্যাশে থাকলে ০ms)</li>
        <li><strong>TCP Handshake:</strong> SYN → SYN-ACK → ACK। ১ RTT।</li>
        <li><strong>TLS Handshake:</strong> TLS 1.3-এ ১ RTT (1.2-এ ২ RTT)। সার্টিফিকেট যাচাই, সেশন কী তৈরি।</li>
        <li><strong>CDN:</strong> ছবি/CSS/JS এজ থেকেই যায় — অরিজিন পর্যন্ত পৌঁছায়ই না। ডায়নামিক রিকোয়েস্ট পাস-থ্রু হয়।</li>
        <li><strong>Load Balancer:</strong> সুস্থ ব্যাকএন্ড বেছে নেয় (health check + অ্যালগরিদম)।</li>
        <li><strong>Nginx:</strong> TLS termination, স্ট্যাটিক ফাইল সার্ভ, gzip, rate limit, তারপর upstream-এ প্রক্সি।</li>
        <li><strong>API Gateway:</strong> টোকেন যাচাই, quota, রাউটিং, রিকোয়েস্ট/রেসপন্স রূপান্তর।</li>
        <li><strong>Application:</strong> middleware → guard → validation → controller → service।</li>
        <li><strong>Cache তারপর DB:</strong> আগে Redis দেখা, miss হলে DB, তারপর ক্যাশে লিখে রাখা (cache-aside)।</li>
        <li><strong>Async কাজ:</strong> ইমেইল/ইনভয়েস/অ্যানালিটিক্স কিউতে পাঠিয়ে সাথে সাথে রেসপন্স — ইউজার অপেক্ষা করে না।</li>
      </ol>
      <h4>কোন কম্পোনেন্ট কখন লাগে (সবগুলো সবসময় নয়)</h4>
      <table>
        <tr><th>কম্পোনেন্ট</th><th>কখন যোগ করবেন</th><th>ছোট অ্যাপে</th></tr>
        <tr><td>CDN</td><td>স্ট্যাটিক অ্যাসেট বা ভৌগোলিকভাবে ছড়ানো ইউজার</td><td>ঐচ্ছিক</td></tr>
        <tr><td>Load Balancer</td><td>একাধিক অ্যাপ ইনস্ট্যান্স</td><td>লাগে না</td></tr>
        <tr><td>API Gateway</td><td>একাধিক মাইক্রোসার্ভিস</td><td>লাগে না (মনোলিথে অতিরিক্ত)</td></tr>
        <tr><td>Redis</td><td>পড়া বেশি, একই কুয়েরি বারবার</td><td>প্রায়ই লাগে</td></tr>
        <tr><td>Message Queue</td><td>ধীর/ব্যর্থ হতে পারে এমন সাইড-ইফেক্ট</td><td>ইমেইলের জন্য উপকারী</td></tr>
        <tr><td>Elasticsearch</td><td>ফুল-টেক্সট সার্চ, LIKE কুয়েরি ধীর</td><td>লাগে না</td></tr>
      </table>
      <p><strong>ইন্টারভিউ টিপ:</strong> শুরুতেই সব বক্স আঁকবেন না। "Client → Server → DB" দিয়ে শুরু করে বলুন কোন সমস্যার সমাধানে কোন লেয়ার যোগ করছেন। প্রতিটি বক্সের একটি <em>কারণ</em> থাকতে হবে — নাহলে সেটি অপ্রয়োজনীয় জটিলতা।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis ডাউন হলে এই ফ্লোতে কী হবে?</li>
        <li>কোন ধাপে সবচেয়ে বেশি latency যোগ হয়?</li>
        <li>এই পথের কোথায় কোথায় timeout সেট করবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-10",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["DNS","Networking","Latency"],
    question: "DNS Resolution ধাপে ধাপে কীভাবে হয়? DNS-ভিত্তিক Load Balancing এবং TTL-এর ভূমিকা কী?",
    answer: `
      <p>DNS হলো ইন্টারনেটের ফোনবুক — মানুষের পড়ার উপযোগী ডোমেইনকে IP ঠিকানায় রূপান্তর করে। এটি রিকোয়েস্টের একদম প্রথম ধাপ, এবং ধীর DNS মানে প্রতিটি রিকোয়েস্টই ধীর।</p>
      <pre class="mermaid">
sequenceDiagram
    participant B as Browser
    participant OS as OS Cache
    participant R as Recursive Resolver
    participant Root as Root Server
    participant TLD as TLD (.com)
    participant A as Authoritative NS

    B->>OS: shop.example.com?
    alt ক্যাশে আছে
        OS-->>B: IP (0 ms)
    else ক্যাশ মিস
        OS->>R: query
        R->>Root: .com কোথায়?
        Root-->>R: TLD সার্ভারের ঠিকানা
        R->>TLD: example.com কোথায়?
        TLD-->>R: Authoritative NS
        R->>A: shop.example.com?
        A-->>R: 93.184.216.34 (TTL 300)
        R-->>B: IP + ক্যাশে রাখল
    end
      </pre>
      <span class="diagram-caption">প্রতিটি স্তরে ক্যাশ থাকায় বাস্তবে বেশিরভাগ query প্রথম ধাপেই শেষ হয়</span>
      <h4>রেকর্ডের ধরন</h4>
      <ul>
        <li><strong>A / AAAA:</strong> ডোমেইন → IPv4 / IPv6 ঠিকানা।</li>
        <li><strong>CNAME:</strong> ডোমেইন → অন্য ডোমেইন (যেমন CDN-এর হোস্টনেম)। রুট ডোমেইনে ব্যবহার করা যায় না।</li>
        <li><strong>MX:</strong> মেইল সার্ভার। <strong>TXT:</strong> ভেরিফিকেশন, SPF/DKIM।</li>
        <li><strong>NS:</strong> কোন নেমসার্ভার এই জোনের কর্তৃপক্ষ।</li>
      </ul>
      <h4>TTL-এর ট্রেড-অফ</h4>
      <table>
        <tr><th>TTL</th><th>সুবিধা</th><th>অসুবিধা</th></tr>
        <tr><td>ছোট (৩০–৬০s)</td><td>দ্রুত failover, দ্রুত IP পরিবর্তন</td><td>বেশি DNS query, বেশি latency ও খরচ</td></tr>
        <tr><td>বড় (২৪ ঘণ্টা)</td><td>কম query, দ্রুত রেসপন্স</td><td>IP বদলালে ক্লায়েন্ট পুরনো IP-তে যেতে থাকবে</td></tr>
      </table>
      <p><strong>বাস্তব কৌশল:</strong> পরিকল্পিত মাইগ্রেশনের ২৪–৪৮ ঘণ্টা আগে TTL কমিয়ে ৬০s করুন, মাইগ্রেশন শেষ হলে আবার বাড়িয়ে দিন।</p>
      <h4>DNS দিয়ে Load Balancing</h4>
      <ul>
        <li><strong>Round-robin DNS:</strong> একই নামের জন্য একাধিক A রেকর্ড। সহজ, কিন্তু health check নেই — মৃত সার্ভারের IP-ও বিলি হতে থাকবে।</li>
        <li><strong>GeoDNS:</strong> ক্লায়েন্টের অবস্থান অনুযায়ী নিকটতম রিজিয়নের IP — আন্তঃমহাদেশীয় latency বাঁচায়।</li>
        <li><strong>Anycast:</strong> একই IP একাধিক ডেটাসেন্টারে ঘোষণা করা; রাউটিং প্রোটোকলই নিকটতমটিতে পাঠায় (CDN ও DNS সার্ভারে ব্যবহৃত)।</li>
      </ul>
      <p><strong>গুরুত্বপূর্ণ সীমাবদ্ধতা:</strong> DNS-ভিত্তিক failover কখনোই তাৎক্ষণিক নয় — ক্লায়েন্ট ও ISP রিসলভার TTL উপেক্ষা করে ক্যাশ ধরে রাখতে পারে। প্রকৃত দ্রুত failover-এর জন্য load balancer বা anycast দরকার।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>DNS প্রোপাগেশনে দেরি হচ্ছে — কীভাবে ডিবাগ করবেন (<code>dig +trace</code>)?</li>
        <li>রুট ডোমেইনে CNAME কেন নিষিদ্ধ, এবং ALIAS/ANAME কীভাবে সমাধান করে?</li>
      </ul>
    `
  },
  {
    id: "sdi-11",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["TCP","TLS","Handshake","Networking"],
    question: "TCP Handshake এবং TLS Handshake কীভাবে কাজ করে? TLS 1.3 কেন 1.2-এর চেয়ে দ্রুত?",
    answer: `
      <p>HTTPS রিকোয়েস্টের আসল ডেটা যাওয়ার আগেই কয়েকটি রাউন্ড-ট্রিপ খরচ হয়ে যায়। এই খরচ বোঝা latency অপ্টিমাইজেশনের ভিত্তি।</p>
      <pre class="mermaid">
sequenceDiagram
    participant C as Client
    participant S as Server
    Note over C,S: TCP Handshake (1 RTT)
    C->>S: SYN
    S-->>C: SYN + ACK
    C->>S: ACK
    Note over C,S: TLS 1.3 Handshake (1 RTT)
    C->>S: ClientHello + key share
    S-->>C: ServerHello + certificate + Finished
    C->>S: Finished + ✉️ HTTP Request
    S-->>C: HTTP Response
      </pre>
      <span class="diagram-caption">TLS 1.3-এ মোট ২ RTT পরেই ডেটা যায়; TLS 1.2-এ লাগত ৩ RTT</span>
      <h4>TCP Three-Way Handshake</h4>
      <ol>
        <li><strong>SYN:</strong> ক্লায়েন্ট নিজের initial sequence number পাঠায়।</li>
        <li><strong>SYN-ACK:</strong> সার্ভার সেটি স্বীকার করে ও নিজের sequence number পাঠায়।</li>
        <li><strong>ACK:</strong> ক্লায়েন্ট স্বীকার করে — কানেকশন প্রতিষ্ঠিত।</li>
      </ol>
      <h4>TLS 1.2 বনাম TLS 1.3</h4>
      <table>
        <tr><th>দিক</th><th>TLS 1.2</th><th>TLS 1.3</th></tr>
        <tr><td>Handshake RTT</td><td>২ RTT</td><td><strong>১ RTT</strong></td></tr>
        <tr><td>পুনঃসংযোগ</td><td>Session resumption (১ RTT)</td><td><strong>0-RTT</strong> (আগের সেশন থাকলে)</td></tr>
        <tr><td>Cipher suite</td><td>অনেক, দুর্বল অপশনসহ (RSA, CBC)</td><td>শুধু ৫টি AEAD সুইট</td></tr>
        <tr><td>Forward secrecy</td><td>ঐচ্ছিক</td><td>বাধ্যতামূলক (ephemeral key)</td></tr>
      </table>
      <p><strong>TLS 1.3 দ্রুত হওয়ার কারণ:</strong> ক্লায়েন্ট ClientHello-তেই অনুমান করে key share পাঠিয়ে দেয়, তাই cipher আলোচনা ও কী বিনিময় একই রাউন্ড-ট্রিপে হয়ে যায়। দুর্বল অ্যালগরিদম বাদ দেওয়ায় আলোচনার বিকল্পও কমে গেছে।</p>
      <p><strong>0-RTT-এর সতর্কতা:</strong> 0-RTT ডেটা <em>replay attack</em>-এর ঝুঁকিতে থাকে। তাই শুধু idempotent রিকোয়েস্টে (GET) ব্যবহার করুন, POST/পেমেন্টে নয়।</p>
      <h4>ল্যাটেন্সি কমানোর উপায়</h4>
      <ul>
        <li><strong>Keep-Alive:</strong> একই কানেকশনে একাধিক রিকোয়েস্ট — প্রতি রিকোয়েস্টে হ্যান্ডশেক এড়ানো (সবচেয়ে বড় লাভ)।</li>
        <li><strong>TLS session resumption:</strong> পুনরায় সংযোগে সম্পূর্ণ হ্যান্ডশেক এড়ানো।</li>
        <li><strong>OCSP stapling:</strong> সার্টিফিকেট রিভোকেশন যাচাইয়ের জন্য ক্লায়েন্টের আলাদা রিকোয়েস্ট বাদ।</li>
        <li><strong>CDN/এজ termination:</strong> TLS ইউজারের কাছাকাছি শেষ করলে RTT ছোট হয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>TLS termination কোথায় করবেন — LB, Nginx না অ্যাপ্লিকেশনে? কেন?</li>
        <li>mTLS কী এবং মাইক্রোসার্ভিসে কেন ব্যবহার হয়?</li>
        <li>TCP slow start কীভাবে প্রথম কয়েকটি রিকোয়েস্টকে ধীর করে?</li>
      </ul>
    `
  },
  {
    id: "sdi-12",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["HTTP/2","HTTP/3","QUIC","Protocol"],
    question: "HTTP/1.1, HTTP/2 এবং HTTP/3 (QUIC)-এর পার্থক্য কী? Head-of-Line Blocking সমস্যা কীভাবে সমাধান হলো?",
    answer: `
      <p>তিনটি সংস্করণের বিবর্তনের মূল চালিকাশক্তি একটাই — <strong>Head-of-Line (HOL) blocking</strong> দূর করা, অর্থাৎ একটি ধীর জিনিস যেন পেছনের সবাইকে আটকে না রাখে।</p>
      <h4>HTTP/1.1 — HOL blocking অ্যাপ্লিকেশন স্তরে</h4>
      <p>একটি TCP কানেকশনে একবারে একটি রিকোয়েস্ট। ব্রাউজার প্রতি ডোমেইনে ৬টি কানেকশন খুলে কাজ চালাত। ডেভেলপাররা <em>sprite sheet</em>, <em>file concatenation</em>, <em>domain sharding</em>-এর মতো হ্যাক ব্যবহার করতেন।</p>
      <h4>HTTP/2 — Multiplexing</h4>
      <p>একটি TCP কানেকশনেই অনেকগুলো <strong>stream</strong> সমান্তরালে চলে। বাইনারি ফ্রেমিং ও <strong>HPACK</strong> হেডার কম্প্রেশন যোগ হয়। কিন্তু <strong>TCP স্তরের HOL blocking রয়ে গেল</strong> — একটি প্যাকেট হারালে TCP সব stream আটকে রেখে সেটির পুনঃপ্রেরণের অপেক্ষা করে।</p>
      <pre class="mermaid">
flowchart TD
    subgraph H2["HTTP/2 over TCP"]
      T["TCP কানেকশন"] --> P1["packet 1 ✓"]
      T --> P2["packet 2 ✗ হারিয়েছে"]
      T --> P3["packet 3 ✓ (কিন্তু অপেক্ষায়)"]
      P2 -.->|সব stream ব্লকড| B["🚫 HOL Blocking"]
    end
    subgraph H3["HTTP/3 over QUIC (UDP)"]
      Q["QUIC কানেকশন"] --> S1["Stream 1 ✓ চলছে"]
      Q --> S2["Stream 2 ✗ শুধু এটি অপেক্ষায়"]
      Q --> S3["Stream 3 ✓ চলছে"]
    end
      </pre>
      <span class="diagram-caption">QUIC-এ প্রতিটি stream স্বাধীন — একটির প্যাকেট হারালে বাকিরা থামে না</span>
      <h4>HTTP/3 — QUIC (UDP-এর উপর)</h4>
      <ul>
        <li><strong>স্বাধীন stream:</strong> UDP-র উপর নিজস্ব নির্ভরযোগ্যতা প্রয়োগ করায় TCP-র HOL blocking নেই।</li>
        <li><strong>0-RTT / 1-RTT কানেকশন:</strong> TLS 1.3 QUIC-এর ভেতরেই যুক্ত, তাই ট্রান্সপোর্ট ও ক্রিপ্টো হ্যান্ডশেক একসাথে হয়।</li>
        <li><strong>Connection migration:</strong> কানেকশন চেনা হয় Connection ID দিয়ে, IP+port দিয়ে নয়। তাই মোবাইল Wi-Fi থেকে 5G-তে গেলে ডাউনলোড ভাঙে না — মোবাইলের জন্য বিশাল সুবিধা।</li>
      </ul>
      <table>
        <tr><th>দিক</th><th>HTTP/1.1</th><th>HTTP/2</th><th>HTTP/3</th></tr>
        <tr><td>ট্রান্সপোর্ট</td><td>TCP</td><td>TCP</td><td>QUIC (UDP)</td></tr>
        <tr><td>Multiplexing</td><td>নেই</td><td>আছে</td><td>আছে</td></tr>
        <tr><td>HOL blocking</td><td>অ্যাপ + TCP</td><td>শুধু TCP</td><td>নেই</td></tr>
        <tr><td>হেডার কম্প্রেশন</td><td>নেই</td><td>HPACK</td><td>QPACK</td></tr>
        <tr><td>হ্যান্ডশেক RTT</td><td>২–৩</td><td>২–৩</td><td>০–১</td></tr>
      </table>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> HTTP/2 চালু করলে HTTP/1.1-এর পুরনো অপ্টিমাইজেশনগুলো (domain sharding, ফাইল concatenation) <em>ক্ষতিকর</em> হয়ে যায় — এগুলো সরিয়ে ফেলুন, কারণ multiplexing থাকায় বহু ছোট ফাইল এখন সস্তা এবং ক্যাশিংয়ে সুবিধাজনক।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কিছু কর্পোরেট নেটওয়ার্কে UDP ব্লকড থাকলে HTTP/3 কীভাবে fallback করে?</li>
        <li>gRPC কেন HTTP/2 বেছে নিয়েছে?</li>
        <li>HTTP/2 Server Push কেন বাতিল করা হলো?</li>
      </ul>
    `
  },
  {
    id: "sdi-13",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Authentication","JWT","Session","Security"],
    question: "JWT এবং Session-based Authentication-এর মধ্যে পার্থক্য কী? ডিস্ট্রিবিউটেড সিস্টেমে কোনটি বেছে নেবেন?",
    answer: `
      <p>মূল পার্থক্য একটাই: <strong>state কোথায় থাকে</strong>। Session-এ সার্ভার মনে রাখে কে লগইন করা; JWT-তে টোকেন নিজেই সব তথ্য বহন করে এবং সার্ভার কিছু মনে রাখে না।</p>
      <pre class="mermaid">
flowchart LR
    subgraph S["Session-based"]
      C1[Client] -->|Cookie: sid=abc| A1[Server]
      A1 -->|প্রতি রিকোয়েস্টে lookup| D1[(Session Store<br/>Redis)]
    end
    subgraph J["JWT-based"]
      C2[Client] -->|Bearer eyJhbG...| A2[Server]
      A2 -->|শুধু signature যাচাই<br/>কোনো lookup নেই| V["✓ স্থানীয়ভাবে যাচাই"]
    end
      </pre>
      <span class="diagram-caption">JWT নেটওয়ার্ক কল বাঁচায়, কিন্তু তাৎক্ষণিক revoke করার ক্ষমতা হারায়</span>
      <h4>তুলনা</h4>
      <table>
        <tr><th>দিক</th><th>Session</th><th>JWT</th></tr>
        <tr><td>State</td><td>সার্ভারে (stateful)</td><td>টোকেনে (stateless)</td></tr>
        <tr><td>যাচাই</td><td>স্টোরে lookup (নেটওয়ার্ক কল)</td><td>signature যাচাই (CPU only)</td></tr>
        <tr><td><strong>তাৎক্ষণিক Revoke</strong></td><td>সহজ — রেকর্ড মুছুন</td><td><strong>কঠিন</strong> — মেয়াদ শেষ না হওয়া পর্যন্ত বৈধ</td></tr>
        <tr><td>স্কেলিং</td><td>শেয়ার্ড স্টোর লাগে</td><td>স্বাভাবিকভাবেই স্কেল করে</td></tr>
        <tr><td>সাইজ</td><td>ছোট (শুধু id)</td><td>বড় (প্রতি রিকোয়েস্টে যায়)</td></tr>
      </table>
      <h4>JWT-এর সবচেয়ে বড় দুর্বলতা ও তার সমাধান</h4>
      <p>ইউজারকে ব্যান করলেন, কিন্তু তার টোকেন আরও ৩০ মিনিট বৈধ থাকবে। বাস্তব সমাধান — <strong>short-lived access token + refresh token</strong>:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Access token: স্বল্পমেয়াদি, stateless যাচাই
const accessToken = jwt.sign(
  { sub: user.id, roles: user.roles },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Refresh token: দীর্ঘমেয়াদি, DB-তে সংরক্ষিত → বাতিল করা যায়
const refreshToken = crypto.randomBytes(32).toString('hex');
await db.refreshTokens.insert({
  tokenHash: sha256(refreshToken),   // কাঁচা টোকেন কখনও সংরক্ষণ নয়
  userId: user.id,
  expiresAt: addDays(new Date(), 7),
  revokedAt: null
});

// HttpOnly + Secure + SameSite কুকিতে পাঠান — localStorage-এ নয় (XSS ঝুঁকি)
res.cookie('refresh_token', refreshToken, {
  httpOnly: true, secure: true, sameSite: 'strict', path: '/auth/refresh'
});</code></pre>
      </div>
      <h4>সাধারণ ভুল</h4>
      <ul>
        <li><strong>localStorage-এ টোকেন রাখা:</strong> যেকোনো XSS স্ক্রিপ্ট পড়ে নিতে পারে। HttpOnly কুকি ব্যবহার করুন।</li>
        <li><strong><code>alg: none</code> মেনে নেওয়া:</strong> লাইব্রেরিতে অ্যালগরিদম স্পষ্টভাবে নির্দিষ্ট করে দিন।</li>
        <li><strong>JWT-তে সংবেদনশীল তথ্য রাখা:</strong> payload শুধু base64 — এনক্রিপ্টেড নয়, যে কেউ পড়তে পারে।</li>
        <li><strong>দীর্ঘমেয়াদি access token:</strong> চুরি হলে ক্ষতির সময়কাল দীর্ঘ হয়।</li>
      </ul>
      <p><strong>সিদ্ধান্ত:</strong> একক মনোলিথে session সহজ ও নিরাপদ। বহু সার্ভিস/মোবাইল ক্লায়েন্টে JWT সুবিধাজনক, তবে অবশ্যই short expiry + refresh token + প্রয়োজনে denylist সহ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Refresh token rotation ও reuse detection কীভাবে কাজ করে?</li>
        <li>একজন ইউজারের সব ডিভাইস থেকে তাৎক্ষণিক লগআউট কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-14",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["CORS","Security","Browser"],
    question: "CORS কী এবং কেন প্রয়োজন? Preflight Request কখন হয় এবং কীভাবে এটি অপ্টিমাইজ করবেন?",
    answer: `
      <p><strong>CORS (Cross-Origin Resource Sharing)</strong> ব্রাউজারের <em>Same-Origin Policy</em> শিথিল করার নিয়ন্ত্রিত উপায়। Same-Origin Policy ছাড়া <code>evil.com</code>-এ থাকা স্ক্রিপ্ট আপনার লগইন কুকি ব্যবহার করে <code>bank.com</code>-এর API কল করে ডেটা পড়তে পারত।</p>
      <p><strong>গুরুত্বপূর্ণ:</strong> CORS <em>সার্ভারকে</em> সুরক্ষা দেয় না — এটি <em>ব্রাউজারে</em> প্রয়োগ হয়। curl বা Postman CORS মানে না। তাই CORS কখনও অথেন্টিকেশনের বিকল্প নয়।</p>
      <h4>Simple Request বনাম Preflight</h4>
      <p>ব্রাউজার শর্ত পূরণ হলে সরাসরি রিকোয়েস্ট পাঠায় (simple)। নাহলে আগে একটি <code>OPTIONS</code> preflight পাঠিয়ে অনুমতি চায়।</p>
      <pre class="mermaid">
sequenceDiagram
    participant B as Browser
    participant S as API Server
    Note over B,S: Preflight ট্রিগার হয় (PUT + custom header)
    B->>S: OPTIONS /api/orders<br/>Origin, Access-Control-Request-Method: PUT
    S-->>B: 204 + Allow-Origin/Methods/Headers<br/>Access-Control-Max-Age: 86400
    Note over B: ব্রাউজার অনুমতি ক্যাশে রাখল
    B->>S: PUT /api/orders (আসল রিকোয়েস্ট)
    S-->>B: 200 OK + Access-Control-Allow-Origin
      </pre>
      <span class="diagram-caption">Preflight প্রতিটি রিকোয়েস্টে একটি বাড়তি রাউন্ড-ট্রিপ যোগ করে — Max-Age দিয়ে ক্যাশ করুন</span>
      <p><strong>Simple request-এর শর্ত:</strong> মেথড GET/HEAD/POST <em>এবং</em> Content-Type কেবল <code>text/plain</code>, <code>multipart/form-data</code> বা <code>application/x-www-form-urlencoded</code>। লক্ষ করুন — <code>application/json</code> এই তালিকায় নেই, তাই প্রায় সব JSON API কলেই preflight হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const cors = require('cors');

app.use(cors({
  // ❌ credentials-এর সাথে '*' কাজ করে না
  origin: (origin, cb) => {
    const allowed = ['https://app.example.com', 'https://admin.example.com'];
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,              // কুকি পাঠানোর অনুমতি
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  maxAge: 86400                   // preflight ২৪ ঘণ্টা ক্যাশে → latency বাঁচে
}));</code></pre>
      </div>
      <h4>সাধারণ ভুল</h4>
      <ul>
        <li><strong><code>origin: '*'</code> + <code>credentials: true</code>:</strong> ব্রাউজার এটি প্রত্যাখ্যান করে। নির্দিষ্ট origin ফেরত দিতে হবে।</li>
        <li><strong>Origin হেডার প্রতিফলিত করা:</strong> যেকোনো origin-কে অনুমতি দেওয়া = CORS সুরক্ষা বাতিল।</li>
        <li><strong><code>maxAge</code> না দেওয়া:</strong> প্রতিটি কলে অতিরিক্ত OPTIONS রাউন্ড-ট্রিপ।</li>
        <li><strong>এরর রেসপন্সে CORS হেডার না থাকা:</strong> ফ্রন্টএন্ডে আসল ৫০০ এরর দেখা যায় না, বদলে বিভ্রান্তিকর CORS মেসেজ আসে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CORS এবং CSRF কীভাবে আলাদা? CORS কি CSRF ঠেকায়?</li>
        <li>SameSite কুকি অ্যাট্রিবিউট কীভাবে CSRF প্রতিরোধে সাহায্য করে?</li>
      </ul>
    `
  },
  {
    id: "sdi-15",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Timeout","Retry","Resilience","Jitter"],
    question: "Timeout, Retry এবং Exponential Backoff কীভাবে সঠিকভাবে কনফিগার করবেন? Retry Storm কী?",
    answer: `
      <p>ডিস্ট্রিবিউটেড সিস্টেমে কল ব্যর্থ হবেই। কিন্তু ভুলভাবে রিট্রাই করলে সাময়িক সমস্যাকে <strong>সম্পূর্ণ আউটেজে</strong> রূপান্তর করা যায়।</p>
      <h4>Timeout: সবচেয়ে অবহেলিত সেটিং</h4>
      <p>টাইমআউট ছাড়া কল অনন্তকাল ঝুলে থাকে, কানেকশন পুল ভরে যায়, এবং একটি ধীর নির্ভরতা পুরো সার্ভিস অচল করে দেয়। নিয়ম: <strong>প্রতিটি নেটওয়ার্ক কলে টাইমআউট থাকতেই হবে</strong>, এবং কলারের টাইমআউট কলি-র চেয়ে বড় হতে হবে।</p>
      <pre class="mermaid">
flowchart TD
    A["Client timeout: 3000ms"] --> B["API Gateway timeout: 2500ms"]
    B --> C["Service timeout: 2000ms"]
    C --> D["Database timeout: 1500ms"]
    D --> E["✓ ভেতরের স্তর আগে fail করে<br/>→ পরিষ্কার এরর, ঝুলে থাকা নয়"]
      </pre>
      <span class="diagram-caption">Timeout budget বাইরে থেকে ভেতরে কমতে থাকবে</span>
      <h4>Retry Storm কীভাবে তৈরি হয়</h4>
      <p>একটি সার্ভিস ধীর হলো → ১০০০ ক্লায়েন্ট টাইমআউট করল → সবাই একসাথে রিট্রাই করল → লোড দ্বিগুণ হলো → সার্ভিস আরও ধীর হলো → আবার রিট্রাই। একে বলে <strong>retry storm</strong> বা <em>metastable failure</em> — মূল সমস্যা সেরে গেলেও লোড নিজেই নিজেকে টিকিয়ে রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Full Jitter সহ Exponential Backoff (AWS-প্রস্তাবিত)
async function retryWithBackoff(fn, { retries = 3, baseMs = 100, capMs = 5000 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      // ক্ষণস্থায়ী নয় এমন এররে রিট্রাই করা অর্থহীন
      if (!isRetryable(err) || attempt === retries) throw err;

      const expDelay = Math.min(capMs, baseMs * 2 ** attempt);
      // Full jitter: 0 থেকে expDelay-এর মধ্যে র‍্যান্ডম
      // এটি ক্লায়েন্টদের একসাথে ফিরে আসা ঠেকায়
      const delay = Math.random() * expDelay;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

function isRetryable(err) {
  // 5xx, timeout, কানেকশন রিসেট → রিট্রাই করুন
  // 4xx (400, 401, 403, 422) → কখনও নয়, বারবার একই ফল আসবে
  return err.code === 'ETIMEDOUT' || err.code === 'ECONNRESET' ||
         (err.status >= 500 && err.status !== 501);
}</code></pre>
      </div>
      <h4>Jitter কেন অপরিহার্য</h4>
      <p>Jitter ছাড়া সব ক্লায়েন্ট ঠিক ১০০ms, ২০০ms, ৪০০ms পরে ফিরে আসে — অর্থাৎ সিঙ্ক্রোনাইজড ঢেউ (thundering herd)। র‍্যান্ডমাইজেশন এই ঢেউকে সময়ের সাথে ছড়িয়ে দেয়।</p>
      <h4>নিরাপদ রিট্রাইয়ের নিয়ম</h4>
      <ul>
        <li><strong>শুধু idempotent অপারেশনে রিট্রাই করুন</strong> — নাহলে ডাবল চার্জ হতে পারে। POST-এ idempotency key ব্যবহার করুন।</li>
        <li><strong>Retry budget:</strong> মোট ট্রাফিকের ১০%-এর বেশি রিট্রাই হলে থামিয়ে দিন।</li>
        <li><strong>শুধু একটি স্তরে রিট্রাই করুন</strong> — প্রতিটি স্তরে ৩ বার করে রিট্রাই মানে ৩ স্তরে ২৭ গুণ লোড।</li>
        <li><strong>Circuit breaker যোগ করুন</strong> — নির্ভরতা মৃত হলে রিট্রাই না করে দ্রুত fail করা ভালো।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Timeout মান কীভাবে নির্ধারণ করবেন (p99-এর ভিত্তিতে)?</li>
        <li>Circuit breaker এবং retry একসাথে কীভাবে কাজ করে?</li>
        <li>রিট্রাই করা নিরাপদ কি না — কীভাবে বুঝবেন?</li>
      </ul>
    `
  },
  /* ===== SECTION C — Nginx, Reverse Proxy & Load Balancing (49) ===== */
  {
    id: "nginx-1",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Reverse Proxy","Architecture","Load Balancer"],
    question: "Nginx-এ Reverse Proxy এবং Forward Proxy-এর মধ্যে মৌলিক পার্থক্য কী?",
    answer: `
      <p>প্রক্সি সার্ভার ক্লায়েন্ট এবং সার্ভারের মধ্যে মধ্যস্থতাকারী হিসেবে কাজ করে, তবে অবস্থান ও উদ্দেশ্যের দিক থেকে পার্থক্য রয়েছে:</p>
      <h4>Forward Proxy:</h4>
      <p>এটি <strong>ক্লায়েন্টের (Client Side) সামনে</strong> অবস্থান করে। ক্লায়েন্ট ইন্টারনেট বা কোনো বাহ্যিক সার্ভারে রিকোয়েস্ট পাঠানোর সময় Forward Proxy-এর মাধ্যমে পাঠায়।</p>
      <p><em>ব্যবহার:</em> ক্লায়েন্টের আইপি গোপন রাখা, কোম্পানি বা অফিসে নির্দিষ্ট ওয়েবসাইট ব্লক/ফিল্টার করা, ক্যাশিং করা।</p>
      <h4>Reverse Proxy (Nginx Default Role):</h4>
      <p>এটি <strong>ব্যাকএন্ড সার্ভারের (Server Side) সামনে</strong> অবস্থান করে। ইনকামিং ইন্টারনেট ক্লায়েন্ট রিকোয়েস্ট গ্রহণ করে পেছনের একাধিক প্রাইভেট ব্যাকএন্ড সার্ভারে রাউট করে দেয়।</p>
      <p><em>ব্যবহার:</em> Load Balancing, SSL/TLS Termination, Security (Hiding backend DB/Server IPs), Caching Static Assets, Rate Limiting.</p>
    `
  },
  {
    id: "nginx-2",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Load Balancing","Algorithms","Upstream"],
    question: "Nginx-এর বিভিন্ন Load Balancing Algorithms (Round Robin, Least Connections, IP Hash) কীভাবে কনফিগার করবেন?",
    answer: `
      <p>Nginx <code>upstream</code> ব্লকের মাধ্যমে ইনকামিং ট্রাফিক পেছনের ব্যাকএন্ড সার্ভারগুলোর মধ্যে লোড ব্যালেন্স করার জন্য বিভিন্ন অ্যালগরিদম সাপোর্ট করে:</p>
      <ol>
        <li><strong>Round Robin (ডিফল্ট):</strong> রিকোয়েস্টগুলো সারিবদ্ধভাবে একে একে সব সার্ভারে পাঠানো হয়।</li>
        <li><strong>Least Connections (<code>least_conn;</code>):</strong> যে সার্ভারে বর্তমানে সক্রিয় কানেকশন সংখ্যা সবচেয়ে কম, নতুন রিকোয়েস্ট সেই সার্ভারে পাঠানো হয়।</li>
        <li><strong>IP Hash (<code>ip_hash;</code>):</strong> ক্লায়েন্টের আইপি এড্রেসের হ্যাশ ভ্যালু অনুযায়ী রিকোয়েস্ট রাউট করা হয়। ফলে একই ক্লায়েন্ট সবসময় একই ব্যাকএন্ড সার্ভারে পৌঁছায় (Session Sticky Nature)।</li>
        <li><strong>Weighted Load Balancing:</strong> সার্ভারের ক্ষমতার ওপর ভিত্তি করে ওয়েট (<code>weight=3</code>) দেওয়া হয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream backend_cluster {
  least_conn; # Load balancing algorithm
  server app1.example.com:8080 weight=3;
  server app2.example.com:8080 weight=1;
  server app3.example.com:8080 backup;
}

server {
  listen 80;
  location / {
    proxy_pass http://backend_cluster;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-3",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["SSL Termination","HTTPS","Security"],
    question: "Nginx SSL/TLS Termination কী এবং এর সুবিধা কী?",
    answer: `
      <p><strong>SSL/TLS Termination:</strong> ক্লায়েন্ট এবং এনজিনক্স প্রক্সির মধ্যকার কমুনিকেশন HTTPS (Encrypted) হলেও, Nginx ইনকামিং ট্রাফিক ডিক্রিপ্ট (Decrypt) করার পর পেছনের ব্যাকএন্ড মাইক্রোসার্ভিসগুলোতে প্লেইন HTTP-তে পাঠায়।</p>
      <h4>সুবিধা:</h4>
      <ul>
        <li><strong>CPU Offloading:</strong> ভারী SSL/TLS Encryption/Decryption সিপিসি প্রসেসিং কাজগুলো এনজিনক্স একাই সামলায়, ফলে পেছনের Node.js/Java অ্যাপ্লিকেশন সার্ভারের ওপর প্রেশার কমে।</li>
        <li><strong>Centralized Certificate Management:</strong> শত শত মাইক্রোসার্ভিসে আলাদা SSL সার্টিফিকেট সেটআপ করার বদলে কেবল এনজিনক্সে SSL Certificate (Let's Encrypt / Custom SSL) কনফিগার ও রিনিউ করলেই চলে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
  listen 443 ssl http2;
  server_name api.mycompany.com;

  ssl_certificate /etc/nginx/ssl/live/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/live/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;

  location / {
    proxy_pass http://localhost:5000;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-4",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Rate Limiting","DDoS Protection","leaky bucket"],
    question: "Nginx-এ Rate Limiting (limit_req_zone) কীভাবে সেটআপ করবেন? burst এবং nodelay প্যারামিটারের কাজ কী?",
    answer: `
      <p>Nginx <strong>Leaky Bucket Algorithm</strong> অনুসরণ করে আইপি ভিত্তিক রিকোয়েস্ট ফ্রিকোয়েন্সি লিমিট করার সুবিধা দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Define rate limit zone: 10MB memory zone holding client IPs, rate 5 requests per second
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/s;

server {
  location /api/ {
    limit_req zone=api_limit burst=10 nodelay;
    proxy_pass http://backend_app;
  }
}</code></pre>
      </div>
      <h4>প্যারামিটার বিশ্লেষণ:</h4>
      <ul>
        <li><code>rate=5r/s:</code> প্রতি সেকেন্ডে সর্বোচ্চ ৫টি রিকোয়েস্ট অনুমোদিত।</li>
        <li><code>burst=10:</code> কোনো ক্লায়েন্ট হঠাৎ ট্রাফিক স্পাইক দিলে তাকে সাময়িকভাবে সর্বোচ্চ ১০টি অতিরিক্ত রিকোয়েস্ট কিউতে (Buffer) রাখার সুযোগ দেয়।</li>
        <li><code>nodelay:</code> কিউতে থাকা burst রিকোয়েস্টগুলোকে কৃত্রিমভাবে হোল্ড বা ডিলে না করে সাথে সাথে প্রসেস করার নির্দেশ দেয় (কিন্তু কিউ লিমিট পার হলে 503 Service Unavailable দেয়)।</li>
      </ul>
    `
  },
  {
    id: "nginx-5",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Event Loop","Architecture","Worker Processes"],
    question: "Nginx কীভাবে একাই লাখ লাখ কনকারেন্ট কানেকশন সামলাতে পারে? (Worker Processes & Event Loop)",
    answer: `
      <p>প্রথাগত Apache HTTP Server প্রতিটি ইনকামিং কানেকশনের জন্য ১টি করে নতুন থ্রেড বা প্রসেস (Thread-per-request) তৈরি করে, যা হাজার হাজার কানেকশনে RAM ফুল করে ক্র্যাশ করে।</p>
      <h4>Nginx-এর Asynchronous Architecture:</h4>
      <ul>
        <li><strong>Master Process:</strong> কনফিগারেশন রিড করে এবং Worker Process গুলোকে পরিচালনা করে।</li>
        <li><strong>Worker Processes:</strong> সিপিসি কোরের সংখ্যার সমান সংখ্যক Worker Process রান করে (<code>worker_processes auto;</code>)।</li>
        <li><strong>Non-blocking Event-Driven Loop:</strong> প্রতিটি Worker Process অসংকীর্ণ (Non-blocking) ইভেন্ট লুপ (Linux <code>epoll</code> বা BSD <code>kqueue</code>) ব্যবহার করে একটি মাত্র থ্রেডেই দশ হাজার কনকারেন্ট নেটওয়ার্ক সকেট ও কানেকশন দক্ষভাবে প্রসেস করে।</li>
      </ul>
    `
  },
  {
    id: "nginx-6",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Caching","Static Assets","Performance"],
    question: "Nginx Proxy Caching কীভাবে কাজ করে এবং static files (JS, CSS, Images) প্রক্সি ক্যাশে করার উপায় কী?",
    answer: `
      <p>ব্যাকএন্ড সার্ভারে হিট না পাঠিয়ে Nginx নিজেই ফ্রিকুয়েন্টলি ব্যবহৃত রেসপন্স ডিস্কে ক্যাশে করে অতি দ্রুত সার্ভিস দিতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Define cache path and keys zone
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC_CACHE:10m max_size=1g inactive=60m;

server {
  location /static/ {
    proxy_cache STATIC_CACHE;
    proxy_cache_valid 200 302 60m;
    proxy_cache_valid 404 1m;
    proxy_cache_use_stale error timeout updating;
    add_header X-Cache-Status $upstream_cache_status;
    proxy_pass http://backend_app;
  }
}</code></pre>
      </div>
      <p><code>$upstream_cache_status</code> রেসপন্স হেডারে <code>HIT</code>, <code>MISS</code>, বা <code>BYPASS</code> স্ট্যাটাস প্রোভাইড করে।</p>
    `
  },
  {
    id: "nginx-7",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["gRPC Proxy","HTTP2","Microservices"],
    question: "Nginx-এ gRPC এবং HTTP/2 ট্রাফিক প্রক্সি ও লোড ব্যালেন্স কীভাবে করবেন?",
    answer: `
      <p>gRPC ট্রান্সপোর্টের জন্য HTTP/2 ব্যবহার করে। Nginx-এ gRPC ট্রাফিক প্রক্সি করার জন্য <code>grpc_pass</code> ডিরেক্টিভ এবং HTTP/2 সাপোর্ট এনাবল করতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream grpc_services {
  server 10.0.0.1:50051;
  server 10.0.0.2:50051;
}

server {
  listen 50051 ssl http2;
  server_name grpc.mycompany.com;

  ssl_certificate /etc/nginx/ssl/cert.pem;
  ssl_certificate_key /etc/nginx/ssl/key.pem;

  location / {
    grpc_pass grpc://grpc_services;
    grpc_set_header X-Real-IP $remote_addr;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-8",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Upstream Keep-Alive","Performance","TCP Handshake"],
    question: "Nginx Upstream Keep-Alive কনফিগারেশন কেন অত্যন্ত গুরুত্বপূর্ণ?",
    answer: `
      <p>ডিফল্টভাবে Nginx ব্যাকএন্ড সার্ভারের সাথে প্রতিটি ইনকামিং রিকোয়েস্টের জন্য নতুন TCP Connection তৈরি করে এবং কাজ শেষে ক্লোজ করে। উচ্চ ট্রাফিকের অ্যাপ্লিকেশনে এটি প্রচুর TCP Handshake ওভারহেড তৈরি করে এবং পোর্ট ফুরিয়ে যায় (Ephemeral Port Exhaustion)।</p>
      <p><strong>Upstream Keep-Alive Solution:</strong></p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream backend_app {
  server 127.0.0.1:3000;
  keepalive 64; # Keep 64 idle connections open to backend
}

server {
  location / {
    proxy_http_version 1.1; # HTTP/1.1 supports persistent connection
    proxy_set_header Connection ""; # Clear Connection 'close' header
    proxy_pass http://backend_app;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-9",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Security Headers","CORS","Config"],
    question: "Nginx-এ Security Headers এবং CORS (Cross-Origin Resource Sharing) কীভাবে কনফিগার করবেন?",
    answer: `
      <p>অ্যাপ্লিকেশনকে সুরক্ষিত রাখতে Nginx লেভেলেই গ্লোবাল সিকিউরিটি হেডার ইনজেক্ট করা সেরা অনুশীলন:</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Content-Security-Policy "default-src 'self';" always;

# CORS Setup
location /api/ {
  if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://myclient.com';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
    return 204;
  }
  proxy_pass http://backend;
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-10",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Gzip","Brotli","Compression"],
    question: "Nginx Gzip Compression কীভাবে কনফিগার করবেন এবং টেক্সট/পেলোড ফাইল কমানোর উপায় কী?",
    answer: `
      <p>Gzip টেক্সট-ভিত্তিক রেসপন্স (HTML, CSS, JS, JSON) কম্প্রেস করে পাঠানোর আকার <strong>৬০-৮০%</strong> কমিয়ে দেয় — যা মোবাইল ও ধীর নেটওয়ার্কে পেজ লোডিংয়ে বিশাল পার্থক্য তৈরি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    gzip on;
    gzip_vary on;              # Vary: Accept-Encoding — প্রক্সি ক্যাশিংয়ের জন্য জরুরি
    gzip_comp_level 5;         # 1-9; 5 হলো গতি ও আকারের সেরা ভারসাম্য
    gzip_min_length 1024;      # ছোট ফাইলে কম্প্রেশনে লাভ নেই
    gzip_proxied any;          # প্রক্সি করা রেসপন্সেও কম্প্রেস করুন

    gzip_types
        text/plain text/css text/xml
        application/javascript application/json
        application/xml application/rss+xml
        image/svg+xml font/ttf font/otf;
    # ⚠️ text/html তালিকায় লিখবেন না — এটি সবসময় স্বয়ংক্রিয়ভাবে অন্তর্ভুক্ত
}</code></pre>
      </div>
      <h4>যে সিদ্ধান্তগুলো গুরুত্বপূর্ণ</h4>
      <ul>
        <li><strong><code>gzip_comp_level</code> ৯ দেবেন না।</strong> ৫ থেকে ৯-এ গেলে আকার মাত্র ~২-৫% কমে, কিন্তু CPU খরচ দ্বিগুণেরও বেশি হয়। প্রতিটি রিকোয়েস্টে এই খরচ দিতে হয়, তাই ৪-৬ রাখাই যুক্তিসঙ্গত।</li>
        <li><strong><code>gzip_vary on</code> অপরিহার্য।</strong> এটি না দিলে CDN বা প্রক্সি একটি কম্প্রেসড রেসপন্স ক্যাশ করে সেটি এমন ক্লায়েন্টকেও দিতে পারে যে gzip সাপোর্ট করে না — ফলে পেজ ভাঙা দেখাবে।</li>
        <li><strong>ইতিমধ্যে কম্প্রেসড ফাইল বাদ দিন:</strong> JPEG, PNG, MP4, ZIP আবার কম্প্রেস করলে আকার কমে না, শুধু CPU নষ্ট হয় (কখনও কখনও আকার সামান্য বাড়েও)।</li>
      </ul>
      <h4>আরও ভালো: প্রি-কম্প্রেশন</h4>
      <p>স্ট্যাটিক ফাইল প্রতিটি রিকোয়েস্টে নতুন করে কম্প্রেস করা অপচয় — এগুলো তো বদলায় না। বিল্ড টাইমে একবার কম্প্রেস করে রাখুন:</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ngx_http_gzip_static_module প্রয়োজন
gzip_static on;      # app.js.gz থাকলে সেটিই সার্ভ করবে, CPU খরচ শূন্য
brotli_static on;    # আরও ভালো — brotli সাধারণত gzip-এর চেয়ে ১৫-২০% ছোট</code></pre>
      </div>
      <p>বিল্ড স্ক্রিপ্টে <code>gzip -k -9 dist/*.js</code> বা webpack/vite প্লাগইন দিয়ে <code>.gz</code> ও <code>.br</code> ফাইল তৈরি করে রাখুন। তখন সর্বোচ্চ কম্প্রেশন লেভেল ব্যবহার করা যায়, কারণ সেটি একবারই হচ্ছে।</p>
      <p><strong>Brotli:</strong> আধুনিক সব ব্রাউজার সমর্থন করে এবং টেক্সটে gzip-এর চেয়ে ভালো ফল দেয়। Nginx-এ এটি আলাদা মডিউল (<code>ngx_brotli</code>) হিসেবে কম্পাইল করতে হয়। দুটিই চালু রাখলে ক্লায়েন্টের <code>Accept-Encoding</code> অনুযায়ী সেরাটি বেছে নেওয়া হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>HTTPS-এ gzip ব্যবহারে BREACH আক্রমণের ঝুঁকি কী?</li>
        <li>SSE বা স্ট্রিমিং রেসপন্সে gzip কেন সমস্যা করে?</li>
      </ul>
    `
  },
  {
    id: "nginx-11",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Routing","Location","Priority"],
    question: "Nginx Location Block Matching Priority-এর নিয়মসমূহ কী কী?",
    answer: `
      <p>Nginx-এ একাধিক <code>location</code> ব্লক একই URI-র সাথে মিললে কোনটি জিতবে তা নির্ধারণের একটি সুনির্দিষ্ট ক্রম আছে — এবং এটি <em>ফাইলে লেখার ক্রম নয়</em>। এই নিয়ম না জানার কারণেই বেশিরভাগ Nginx রাউটিং বাগ হয়।</p>
      <h4>মিলে যাওয়ার ক্রম (উপর থেকে নিচে)</h4>
      <ol>
        <li><strong><code>=</code> (হুবহু মিল):</strong> সর্বোচ্চ অগ্রাধিকার। মিললে অনুসন্ধান <em>সাথে সাথে থেমে যায়</em>।</li>
        <li><strong><code>^~</code> (prefix, regex থামায়):</strong> দীর্ঘতম prefix মিললে এবং তাতে <code>^~</code> থাকলে regex আর পরীক্ষা করা হয় না।</li>
        <li><strong>Regex (<code>~</code> case-sensitive, <code>~*</code> case-insensitive):</strong> <em>ফাইলে লেখার ক্রমে</em> পরীক্ষা হয়, প্রথম মিলটিই জেতে।</li>
        <li><strong>সাধারণ prefix:</strong> কোনো regex না মিললে সবচেয়ে দীর্ঘ prefix ম্যাচটি ব্যবহৃত হয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    # ১. হুবহু — সবচেয়ে দ্রুত, হোমপেজের জন্য আদর্শ
    location = / {
        proxy_pass http://app;
    }

    # ২. ^~ দিয়ে regex বন্ধ — স্ট্যাটিক ফাইল সরাসরি সার্ভ হবে
    location ^~ /static/ {
        root /var/www;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # ৩. regex — ক্রম গুরুত্বপূর্ণ, প্রথম মিলটিই জেতে
    location ~* \\.(jpg|jpeg|png|gif|webp|svg)$ {
        root /var/www/images;
        expires 30d;
    }

    # ৪. সাধারণ prefix — সবচেয়ে দীর্ঘটি জেতে
    location /api/ {
        proxy_pass http://api_backend;
    }

    # fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}</code></pre>
      </div>
      <h4>যে দুটি ভুল সবচেয়ে বেশি হয়</h4>
      <ul>
        <li><strong>Regex সাধারণ prefix-কে হারিয়ে দেয়:</strong> <code>location /static/</code> লিখেছেন, কিন্তু উপরে একটি <code>location ~ \\.js$</code> আছে — তখন <code>/static/app.js</code> regex ব্লকে চলে যাবে, prefix ব্লকে নয়। <code>^~</code> ব্যবহার করলে এটি ঠেকানো যায়।</li>
        <li><strong>"আমার নিচের ব্লকটি কাজ করছে না":</strong> সাধারণত কারণ উপরে একটি regex আগেই মিলে গেছে। মনে রাখবেন regex-এ <em>লেখার ক্রম</em> গুরুত্বপূর্ণ, কিন্তু prefix-এ <em>দৈর্ঘ্য</em> গুরুত্বপূর্ণ।</li>
      </ul>
      <p><strong>ডিবাগিং টিপ:</strong> লগ ফরম্যাটে একটি ভ্যারিয়েবল যোগ করে দেখুন কোন ব্লক কাজ করছে — অথবা প্রতিটি location-এ আলাদা <code>add_header X-Debug-Location "static" always;</code> দিয়ে রেসপন্স হেডারে যাচাই করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>location /api</code> এবং <code>location /api/</code> — পার্থক্য কী?</li>
        <li>Regex location বেশি ব্যবহার করলে পারফরম্যান্সে প্রভাব পড়ে কি?</li>
      </ul>
    `
  },
  {
    id: "nginx-12",
    category: "Nginx",
    difficulty: "Beginner",
    tags: ["Config","Uploads","Timeouts"],
    question: "Nginx-এ 413 Request Entity Too Large এরর ফিক্স করতে কোন কনফিগারেশন চেঞ্জ করবেন?",
    answer: `
      <p><code>413 Request Entity Too Large</code> এরর আসে যখন ক্লায়েন্টের পাঠানো বডি Nginx-এর অনুমোদিত সীমা ছাড়িয়ে যায়। ডিফল্ট সীমা মাত্র <strong>১ মেগাবাইট</strong> — তাই ফাইল আপলোড ফিচার বানানোর পর এটিই প্রথম বাধা।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    client_max_body_size 1m;          # গ্লোবাল ডিফল্ট — কড়া রাখুন

    server {
        # শুধু আপলোড এন্ডপয়েন্টে বড় সীমা দিন
        location /api/upload {
            client_max_body_size 100m;
            client_body_timeout  300s;    # ধীর নেটওয়ার্কে আপলোডের সময়
            client_body_buffer_size 128k; # এর বেশি হলে অস্থায়ী ফাইলে যাবে

            proxy_pass http://app;
            proxy_request_buffering off;  # স্ট্রিমিং আপলোড — ডিস্কে বাফার নয়
            proxy_read_timeout 300s;
            proxy_send_timeout 300s;
        }
    }
}</code></pre>
      </div>
      <h4>সংশ্লিষ্ট সেটিংস</h4>
      <ul>
        <li><strong><code>client_max_body_size 0</code></strong> সীমা সম্পূর্ণ তুলে দেয় — <em>কখনও করবেন না</em>, এটি সহজ DoS-এর দরজা।</li>
        <li><strong><code>client_body_buffer_size</code>:</strong> এর চেয়ে বড় বডি Nginx অস্থায়ী ফাইলে লেখে (ডিস্ক I/O)। বেশিরভাগ আপলোড ছোট হলে এটি বাড়ালে ডিস্ক লেখা এড়ানো যায়।</li>
        <li><strong><code>proxy_request_buffering off</code>:</strong> ডিফল্টে Nginx পুরো বডি নিজে জমা করে তারপর ব্যাকএন্ডে পাঠায়। বড় ফাইলে এটি ডিস্ক ভরায় ও দেরি করায়। বন্ধ করলে সরাসরি স্ট্রিম হয়।</li>
      </ul>
      <h4>শুধু Nginx-এ ঠিক করলেই হয় না</h4>
      <p>413 এরর গেলেও প্রায়ই ব্যাকএন্ডে আরেকটি সীমা থেকে যায়:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Express — এটিরও ডিফল্ট 100kb
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Multer — ফাইল আপলোডের নিজস্ব সীমা
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } });</code></pre>
      </div>
      <p><strong>প্রোডাকশনের সেরা পদ্ধতি:</strong> বড় ফাইল আপনার সার্ভারের মধ্য দিয়ে না পাঠানোই ভালো। <strong>presigned URL</strong> ব্যবহার করে ব্রাউজার থেকে সরাসরি S3/R2-তে আপলোড করান — তখন Nginx ও অ্যাপ্লিকেশন সার্ভারে কোনো চাপই পড়ে না, এবং এই সীমাগুলো নিয়ে ভাবতেই হয় না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>413 এরর ইউজারকে সুন্দরভাবে দেখাবেন কীভাবে (Nginx এটি ব্যাকএন্ডে পাঠায় না)?</li>
        <li>Resumable upload কীভাবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "nginx-13",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["L4 Balancing","Stream","TCP"],
    question: "Nginx Stream Module দিয়ে Layer 4 (TCP/UDP) Load Balancing কীভাবে করা হয়?",
    answer: `
      <p>Nginx-এর <code>stream</code> মডিউল <strong>Layer 4</strong>-এ কাজ করে — অর্থাৎ এটি TCP/UDP প্যাকেট ফরওয়ার্ড করে, ভেতরের প্রোটোকল বোঝার চেষ্টা করে না। এতে যেকোনো প্রোটোকল প্রক্সি করা যায়: MySQL, PostgreSQL, Redis, MQTT, DNS, গেম সার্ভার।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ⚠️ stream ব্লক http ব্লকের বাইরে, একই স্তরে থাকবে
stream {
    upstream mysql_backend {
        least_conn;
        server 10.0.1.10:3306 max_fails=3 fail_timeout=30s;
        server 10.0.1.11:3306 backup;
    }

    server {
        listen 3306;
        proxy_pass mysql_backend;
        proxy_connect_timeout 3s;
        proxy_timeout 300s;          # নিষ্ক্রিয় কানেকশনের সময়সীমা
    }

    # UDP উদাহরণ — DNS
    upstream dns_backend {
        server 10.0.1.20:53;
        server 10.0.1.21:53;
    }
    server {
        listen 53 udp;
        proxy_pass dns_backend;
        proxy_responses 1;           # UDP-তে কতটি রেসপন্স প্রত্যাশিত
    }
}</code></pre>
      </div>
      <h4>L4 বনাম L7 — এখানে কী হারাচ্ছেন</h4>
      <table>
        <tr><th>ক্ষমতা</th><th>L7 (http)</th><th>L4 (stream)</th></tr>
        <tr><td>URL/path রাউটিং</td><td>✅</td><td>❌</td></tr>
        <tr><td>হেডার পরিবর্তন</td><td>✅</td><td>❌</td></tr>
        <tr><td>ক্যাশিং</td><td>✅</td><td>❌</td></tr>
        <tr><td>যেকোনো প্রোটোকল</td><td>❌ শুধু HTTP</td><td>✅</td></tr>
        <tr><td>গতি</td><td>ভালো</td><td><strong>দ্রুততর</strong></td></tr>
      </table>
      <h4>ক্লায়েন্টের আসল IP — একটি বাস্তব সমস্যা</h4>
      <p>L4 প্রক্সিতে ব্যাকএন্ড কেবল Nginx-এর IP দেখে, কারণ <code>X-Forwarded-For</code>-এর মতো হেডার যোগ করার সুযোগই নেই (প্রোটোকল বোঝা যাচ্ছে না)। সমাধান <strong>PROXY protocol</strong>:</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    listen 3306;
    proxy_pass mysql_backend;
    proxy_protocol on;      # কানেকশনের শুরুতে ক্লায়েন্টের আসল IP পাঠায়
}
# ⚠️ ব্যাকএন্ডকেও PROXY protocol বুঝতে হবে, নাহলে কানেকশন ভেঙে যাবে</code></pre>
      </div>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>ডাটাবেজ প্রক্সি করার আগে ভাবুন:</strong> Nginx কানেকশন পুলিং করে না, ট্রানজেকশন বোঝে না। MySQL/PostgreSQL-এর জন্য ProxySQL বা PgBouncer অনেক উপযুক্ত।</li>
        <li><strong>TLS পাস-থ্রু:</strong> <code>ssl_preread on</code> দিয়ে TLS হ্যান্ডশেকের SNI পড়ে গন্তব্য ঠিক করা যায় — এনক্রিপশন না ভেঙেই ডোমেইনভিত্তিক রাউটিং।</li>
        <li><strong>UDP-তে সাবধান:</strong> UDP stateless, তাই Nginx একটি কৃত্রিম "সেশন" ধারণা ব্যবহার করে — <code>proxy_responses</code> ও <code>proxy_timeout</code> ঠিকভাবে সেট করা জরুরি।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>gRPC-র জন্য L4 না L7 ব্যবহার করবেন?</li>
        <li>PROXY protocol না থাকলে ক্লায়েন্ট IP কীভাবে পাবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-14",
    category: "Nginx",
    difficulty: "Beginner",
    tags: ["Ops","Reload","Process"],
    question: "nginx -s reload কমান্ড দিলে কীভাবে জিরো-ডাউনটাইম আপডেট হয়?",
    answer: `
      <p><code>nginx -s reload</code> কনফিগারেশন পরিবর্তন প্রয়োগ করে <strong>একটিও রিকোয়েস্ট না হারিয়ে</strong>। এটি সম্ভব হয় Nginx-এর master-worker আর্কিটেকচারের কারণে।</p>
      <h4>ধাপে ধাপে কী ঘটে</h4>
      <pre class="mermaid">
flowchart TD
    A["nginx -s reload<br/>(SIGHUP)"] --> B["Master নতুন কনফিগ পার্স ও যাচাই করে"]
    B -->|"সিনট্যাক্স ভুল"| C["❌ বাতিল — পুরনো কনফিগ চলতেই থাকে"]
    B -->|"ঠিক আছে"| D["নতুন worker চালু করে<br/>(নতুন কনফিগ নিয়ে)"]
    D --> E["নতুন রিকোয়েস্ট নতুন worker-এ যায়"]
    D --> F["পুরনো worker-কে graceful shutdown সংকেত"]
    F --> G["পুরনো worker চলমান রিকোয়েস্ট শেষ করে"]
    G --> H["তারপর নিজে থেকে বন্ধ হয়ে যায় ✅"]
      </pre>
      <span class="diagram-caption">দুই প্রজন্মের worker কিছুক্ষণ পাশাপাশি চলে</span>
      <ol>
        <li>Master প্রসেস <code>SIGHUP</code> পায় এবং নতুন কনফিগ ফাইল পার্স করে।</li>
        <li><strong>কনফিগে ভুল থাকলে reload বাতিল হয়</strong> এবং পুরনো কনফিগ নিয়েই সব চলতে থাকে — এটিই সবচেয়ে বড় নিরাপত্তা।</li>
        <li>কনফিগ ঠিক থাকলে master নতুন worker প্রসেস চালু করে, যারা নতুন কনফিগ নিয়ে নতুন কানেকশন গ্রহণ করতে শুরু করে।</li>
        <li>পুরনো worker-দের বলা হয় নতুন কানেকশন নেওয়া বন্ধ করতে, কিন্তু <em>চলমান</em> রিকোয়েস্টগুলো শেষ করতে।</li>
        <li>শেষ রিকোয়েস্ট শেষ হলে পুরনো worker নিজে থেকেই প্রস্থান করে।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ✅ সবসময় reload-এর আগে কনফিগ পরীক্ষা করুন
nginx -t

# তারপর reload
nginx -s reload
# অথবা: systemctl reload nginx  /  kill -HUP $(cat /var/run/nginx.pid)

# reload-এর পর কিছুক্ষণ দুই প্রজন্মের worker দেখা যাবে — এটি স্বাভাবিক
ps aux | grep nginx
# "nginx: worker process is shutting down" ← পুরনো worker</code></pre>
      </div>
      <h4>যে বিষয়গুলো মনে রাখা জরুরি</h4>
      <ul>
        <li><strong>দীর্ঘস্থায়ী কানেকশন পুরনো worker আটকে রাখে:</strong> WebSocket বা SSE কানেকশন থাকলে পুরনো worker ঘণ্টার পর ঘণ্টা বেঁচে থাকতে পারে। <code>worker_shutdown_timeout</code> দিয়ে সর্বোচ্চ সময় বেঁধে দিন।</li>
        <li><strong>মেমরি সাময়িকভাবে দ্বিগুণ</strong> হতে পারে, কারণ দুই সেট worker চলছে।</li>
        <li><strong>reload বনাম restart:</strong> <code>restart</code> সব প্রসেস মেরে নতুন করে চালু করে — কিছু রিকোয়েস্ট হারাবে। <code>listen</code> পোর্ট বা ইউজার বদলানোর মতো কিছু পরিবর্তনে restart লাগে, বাকি প্রায় সব ক্ষেত্রে reload যথেষ্ট।</li>
        <li><strong>বাইনারি আপগ্রেড:</strong> Nginx-এর সংস্করণ পরিবর্তনও ডাউনটাইম ছাড়া করা যায় — <code>USR2</code> সিগন্যাল দিয়ে নতুন master চালু করে, তারপর <code>QUIT</code> দিয়ে পুরনোটি বন্ধ করা হয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>nginx -t</code> কোন ভুলগুলো ধরতে পারে না?</li>
        <li>reload-এর পরেও পুরনো worker না মরলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-15",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Logging","JSON","ELK"],
    question: "Nginx-এ কাস্টম JSON Access Log ফরম্যাট কীভাবে তৈরি করবেন?",
    answer: `
      <p>ডিফল্ট Nginx লগ ফরম্যাট মানুষের পড়ার জন্য ভালো, কিন্তু মেশিনে পার্স করা কঠিন। <strong>JSON ফরম্যাটে</strong> লগ করলে ELK, Loki বা যেকোনো লগ সিস্টেম সরাসরি ফিল্ড হিসেবে ইনডেক্স করতে পারে — কোনো regex পার্সিং লাগে না।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    log_format json_combined escape=json
    '{'
      '"time":"$time_iso8601",'
      '"remote_addr":"$remote_addr",'
      '"request_method":"$request_method",'
      '"request_uri":"$request_uri",'
      '"status":$status,'
      '"body_bytes_sent":$body_bytes_sent,'
      '"request_time":$request_time,'
      '"upstream_response_time":"$upstream_response_time",'
      '"upstream_addr":"$upstream_addr",'
      '"upstream_status":"$upstream_status",'
      '"http_referrer":"$http_referer",'
      '"http_user_agent":"$http_user_agent",'
      '"request_id":"$request_id",'
      '"cache_status":"$upstream_cache_status"'
    '}';

    access_log /var/log/nginx/access.log json_combined;
}</code></pre>
      </div>
      <h4><code>escape=json</code> কেন অপরিহার্য</h4>
      <p>User-Agent বা URI-তে ডাবল কোট, ব্যাকস্ল্যাশ বা কন্ট্রোল ক্যারেক্টার থাকতে পারে। এটি ছাড়া সেই লগ লাইনটি <strong>অবৈধ JSON</strong> হয়ে যাবে এবং লগ পাইপলাইন সেটি ফেলে দেবে (বা খারাপ ক্ষেত্রে log injection আক্রমণ সম্ভব হবে)। Nginx 1.11.8+ এ এটি উপলব্ধ।</p>
      <h4>যে ফিল্ডগুলো সবচেয়ে কাজে লাগে</h4>
      <ul>
        <li><strong><code>$request_time</code>:</strong> Nginx-এর দৃষ্টিতে মোট সময় (ক্লায়েন্টের সাথে ডেটা আদান-প্রদানসহ)।</li>
        <li><strong><code>$upstream_response_time</code>:</strong> শুধু ব্যাকএন্ডের সময়। এই দুটির <em>পার্থক্য</em> দেখে বোঝা যায় ধীরগতি ব্যাকএন্ডে নাকি নেটওয়ার্কে/ক্লায়েন্টে।</li>
        <li><strong><code>$request_id</code>:</strong> Nginx-এর তৈরি ইউনিক আইডি। এটি ব্যাকএন্ডে ফরওয়ার্ড করলে পুরো স্ট্যাকে একটি রিকোয়েস্ট ট্রেস করা যায়।</li>
        <li><strong><code>$upstream_addr</code>:</strong> কোন ব্যাকএন্ড সার্ভ করল — একটি নির্দিষ্ট নোডের সমস্যা ধরতে অপরিহার্য।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># request_id ব্যাকএন্ডে পাঠান — distributed tracing-এর ভিত্তি
proxy_set_header X-Request-ID $request_id;
add_header X-Request-ID $request_id always;   # ক্লায়েন্টকেও জানান</code></pre>
      </div>
      <h4>পারফরম্যান্স বিবেচনা</h4>
      <ul>
        <li><strong>বাফারিং চালু করুন:</strong> <code>access_log /path/log json buffer=32k flush=5s;</code> — প্রতিটি রিকোয়েস্টে ডিস্কে লেখা এড়ায়।</li>
        <li><strong>স্ট্যাটিক অ্যাসেটে লগ বন্ধ রাখুন:</strong> <code>location /assets/ { access_log off; }</code> — লগের আকার নাটকীয়ভাবে কমে।</li>
        <li><strong>Log rotation</strong> অবশ্যই কনফিগার করুন (logrotate), নাহলে ডিস্ক ভরে যাবে। rotate-এর পর <code>USR1</code> সিগন্যাল পাঠাতে হয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>লগে ব্যক্তিগত তথ্য (PII) থাকলে কী করবেন?</li>
        <li><code>$request_time</code> বেশি কিন্তু <code>$upstream_response_time</code> কম — কী বোঝায়?</li>
      </ul>
    `
  },
  {
    id: "nginx-16",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["GeoIP","Routing","Security"],
    question: "Nginx GeoIP Module দিয়ে দেশভিত্তিক ট্রাফিক ব্লক বা রাউট কীভাবে করা হয়?",
    answer: `
      <p>GeoIP মডিউল ক্লায়েন্টের IP দেখে তার দেশ/শহর শনাক্ত করে একটি ভ্যারিয়েবলে রাখে, যা দিয়ে রাউটিং, ব্লকিং বা কনটেন্ট ব্যক্তিগতকরণ করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    # আধুনিক MaxMind DB (ngx_http_geoip2_module)
    geoip2 /etc/nginx/GeoLite2-Country.mmdb {
        $geoip2_country_code country iso_code;
    }

    map $geoip2_country_code $blocked_country {
        default 0;
        KP 1;    # নিষেধাজ্ঞাভুক্ত দেশ
        XX 1;
    }

    map $geoip2_country_code $nearest_backend {
        default  eu_servers;
        BD       asia_servers;
        IN       asia_servers;
        US       us_servers;
    }

    server {
        if ($blocked_country) { return 403; }

        location / {
            proxy_pass http://$nearest_backend;
            proxy_set_header X-Country $geoip2_country_code;   # অ্যাপকেও জানান
        }
    }
}</code></pre>
      </div>
      <h4>ব্যবহারিক প্রয়োগ</h4>
      <ul>
        <li><strong>আইনি সম্মতি:</strong> নির্দিষ্ট দেশে সেবা দেওয়া নিষিদ্ধ হলে, বা GDPR অনুযায়ী ইউরোপীয় ইউজারকে ভিন্ন কনসেন্ট ফ্লো দেখানো।</li>
        <li><strong>কনটেন্ট লাইসেন্সিং:</strong> ভিডিও/মিডিয়া নির্দিষ্ট অঞ্চলে সীমাবদ্ধ রাখা।</li>
        <li><strong>ভাষা/মুদ্রা ডিফল্ট:</strong> বাংলাদেশ থেকে এলে বাংলা ও টাকা প্রি-সিলেক্ট করা (তবে ইউজারকে বদলানোর সুযোগ দিন)।</li>
        <li><strong>নিকটতম ব্যাকএন্ডে রাউটিং:</strong> latency কমানো।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>নির্ভুলতা সীমিত:</strong> দেশ-স্তরে ~৯৯% নির্ভুল, কিন্তু শহর-স্তরে অনেক কম। মোবাইল IP প্রায়ই ভুল অবস্থান দেখায়।</li>
        <li><strong>VPN/প্রক্সি সহজেই এড়ায়:</strong> তাই GeoIP কখনও <em>নিরাপত্তা</em> নিয়ন্ত্রণ হিসেবে ব্যবহার করবেন না — এটি একটি সুবিধা বা সম্মতির টুল, দুর্ভেদ্য বাধা নয়।</li>
        <li><strong>ডাটাবেজ নিয়মিত আপডেট করতে হবে</strong> — IP বরাদ্দ বদলায়। MaxMind সাপ্তাহিক আপডেট দেয়; পুরনো ডাটাবেজ ভুল ফল দেবে।</li>
        <li><strong>CDN/প্রক্সির পেছনে:</strong> <code>realip</code> মডিউল দিয়ে আসল ক্লায়েন্ট IP পুনরুদ্ধার না করলে সব ট্রাফিক CDN-এর দেশ থেকে এসেছে মনে হবে। অনেক CDN নিজেই <code>CF-IPCountry</code>-র মতো হেডার দেয় — সেটি ব্যবহার করা সহজ ও নির্ভরযোগ্য।</li>
      </ul>
      <p><strong>নোট:</strong> পুরনো <code>ngx_http_geoip_module</code> (legacy GeoIP) এখন অপ্রচলিত; MaxMind সেই ফরম্যাট বন্ধ করে দিয়েছে। নতুন সেটআপে <code>geoip2</code> ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Cloudflare-এর পেছনে GeoIP কীভাবে কাজ করাবেন?</li>
        <li>GeoIP-ভিত্তিক ব্লকিং কি আইনি সম্মতির জন্য যথেষ্ট?</li>
      </ul>
    `
  },
  {
    id: "nginx-17",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Lua","OpenResty","Dynamic"],
    question: "Nginx-এ OpenResty এবং Lua Scripting-এর কাজ কী?",
    answer: `
      <p><strong>OpenResty</strong> হলো Nginx + LuaJIT-এর একটি বান্ডল, যা Nginx-এর রিকোয়েস্ট প্রসেসিং চক্রের ভেতরে Lua স্ক্রিপ্ট চালাতে দেয়। এতে Nginx একটি স্ট্যাটিক কনফিগ ফাইল থেকে একটি <strong>প্রোগ্রামেবল অ্যাপ্লিকেশন সার্ভারে</strong> পরিণত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>location /api/ {
    # রিকোয়েস্ট ব্যাকএন্ডে যাওয়ার আগে চলে
    access_by_lua_block {
        local jwt = require "resty.jwt"
        local token = ngx.var.http_authorization

        if not token then
            ngx.status = 401
            ngx.say('{"error":"unauthorized"}')
            return ngx.exit(401)
        end

        local verified = jwt:verify(os.getenv("JWT_SECRET"),
                                    token:gsub("Bearer ", ""))
        if not verified.verified then
            ngx.status = 401
            return ngx.exit(401)
        end
        -- যাচাই হওয়া পরিচয় ব্যাকএন্ডে পাঠান
        ngx.req.set_header("X-User-Id", verified.payload.sub)
    }

    proxy_pass http://backend;
}</code></pre>
      </div>
      <h4>Lua কোথায় চালানো যায় (রিকোয়েস্ট ফেজ)</h4>
      <ul>
        <li><code>init_by_lua</code> — Nginx চালু হওয়ার সময় (কনফিগ লোড, বড় টেবিল প্রস্তুত)।</li>
        <li><code>rewrite_by_lua</code> — URI পরিবর্তন, রাউটিং সিদ্ধান্ত।</li>
        <li><code>access_by_lua</code> — অথেন্টিকেশন ও অনুমোদন (সবচেয়ে বেশি ব্যবহৃত)।</li>
        <li><code>content_by_lua</code> — সরাসরি রেসপন্স তৈরি (ব্যাকএন্ড ছাড়াই)।</li>
        <li><code>header_filter_by_lua</code> / <code>body_filter_by_lua</code> — রেসপন্স পরিবর্তন।</li>
        <li><code>log_by_lua</code> — কাস্টম লগিং/মেট্রিক্স, রেসপন্স পাঠানোর পর।</li>
      </ul>
      <h4>কেন এটি দ্রুত</h4>
      <p>LuaJIT অত্যন্ত দ্রুত এবং কোড Nginx-এর <strong>নিজস্ব event loop-এর ভেতরেই</strong> চলে — কোনো আলাদা প্রসেস, নেটওয়ার্ক hop বা প্রসেস-মধ্যবর্তী যোগাযোগ নেই। <code>lua-resty-*</code> লাইব্রেরিগুলো (redis, mysql, http) সম্পূর্ণ অ-ব্লকিং, তাই একটি worker হাজারো রিকোয়েস্ট সামলাতে পারে।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>এজ-এ অথেন্টিকেশন:</strong> অবৈধ টোকেন ব্যাকএন্ডে পৌঁছানোর আগেই বাতিল — ব্যাকএন্ডের লোড কমে।</li>
        <li><strong>ডায়নামিক রাউটিং:</strong> Redis বা Consul থেকে রাউটিং নিয়ম পড়ে সিদ্ধান্ত — Nginx reload ছাড়াই।</li>
        <li><strong>কাস্টম rate limiting:</strong> ইউজার টিয়ার অনুযায়ী ভিন্ন কোটা।</li>
        <li><strong>A/B টেস্টিং ও ক্যানারি রাউটিং।</strong></li>
        <li><strong>Kong ও APISIX</strong> — জনপ্রিয় API gateway দুটিই OpenResty-র উপর তৈরি।</li>
      </ul>
      <p><strong>সতর্কতা:</strong> Lua কোড Nginx worker-এর ভেতরে চলে, তাই একটি ব্লকিং বা ধীর অপারেশন <strong>পুরো worker আটকে দেবে</strong>। কখনও <code>os.execute</code>, ব্লকিং সকেট, বা ভারী গণনা করবেন না — শুধু <code>lua-resty-*</code> ইকোসিস্টেমের অ-ব্লকিং লাইব্রেরি ব্যবহার করুন। এছাড়া কনফিগে ব্যবসায়িক লজিক বাড়তে থাকলে সেটি ডিবাগ ও টেস্ট করা কঠিন হয়ে পড়ে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>OpenResty কোড কীভাবে টেস্ট করবেন?</li>
        <li>কখন OpenResty-র বদলে আলাদা API gateway ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-18",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["WebSockets","Proxy","Headers"],
    question: "Nginx-এ WebSockets Proxying করতে কোন কোন হেডার সেট করতে হয়?",
    answer: `
      <p>WebSocket সাধারণ HTTP রিকোয়েস্ট হিসেবে শুরু হয়, তারপর <strong>Upgrade</strong> হ্যান্ডশেকের মাধ্যমে একটি স্থায়ী দ্বিমুখী কানেকশনে পরিণত হয়। Nginx-কে এই আপগ্রেড হেডারগুলো ঠিকভাবে ফরওয়ার্ড করতে বলতে হয় — নাহলে হ্যান্ডশেক ব্যর্থ হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    # Connection হেডার শর্তসাপেক্ষে সেট করার স্ট্যান্ডার্ড উপায়
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;      # সাধারণ HTTP রিকোয়েস্টে keep-alive ভাঙে না
    }

    server {
        location /socket.io/ {
            proxy_pass http://websocket_backend;

            proxy_http_version 1.1;                        # ⚠️ আবশ্যক
            proxy_set_header Upgrade    $http_upgrade;     # ⚠️ আবশ্যক
            proxy_set_header Connection $connection_upgrade; # ⚠️ আবশ্যক

            proxy_set_header Host            $host;
            proxy_set_header X-Real-IP       $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            # WebSocket দীর্ঘ সময় নিষ্ক্রিয় থাকতে পারে — ডিফল্ট 60s খুবই কম
            proxy_read_timeout  3600s;
            proxy_send_timeout  3600s;
        }
    }
}</code></pre>
      </div>
      <h4>তিনটি অপরিহার্য লাইন</h4>
      <ul>
        <li><strong><code>proxy_http_version 1.1</code>:</strong> Nginx ডিফল্টে upstream-এ HTTP/1.0 ব্যবহার করে, যেখানে Upgrade মেকানিজমই নেই।</li>
        <li><strong><code>Upgrade $http_upgrade</code>:</strong> ক্লায়েন্টের আপগ্রেড অনুরোধ ব্যাকএন্ডে পৌঁছে দেয়।</li>
        <li><strong><code>Connection $connection_upgrade</code>:</strong> <code>map</code> ব্যবহার করে শুধু WebSocket রিকোয়েস্টেই <code>upgrade</code> পাঠানো হয়; সাধারণ রিকোয়েস্টে <code>close</code> যায়।</li>
      </ul>
      <p><strong><code>map</code> কেন, সরাসরি <code>Connection "upgrade"</code> নয়:</strong> একই location-এ যদি সাধারণ HTTP রিকোয়েস্টও আসে, তাহলে সবগুলোতে <code>upgrade</code> পাঠালে upstream keep-alive ভেঙে যায় এবং পারফরম্যান্স নষ্ট হয়। <code>map</code> এই সমস্যা সুন্দরভাবে সমাধান করে।</p>
      <h4>Timeout — সবচেয়ে সাধারণ বাগ</h4>
      <p><code>proxy_read_timeout</code>-এর ডিফল্ট ৬০ সেকেন্ড। WebSocket কানেকশন এক মিনিট নিষ্ক্রিয় থাকলেই Nginx সেটি কেটে দেবে, এবং ফ্রন্টএন্ডে রহস্যময় disconnect দেখা যাবে।</p>
      <p>এর <strong>সঠিক সমাধান</strong> শুধু timeout বাড়ানো নয় — অ্যাপ্লিকেশন স্তরে <strong>ping/pong heartbeat</strong> পাঠান (Socket.IO নিজে থেকেই করে)। এতে কানেকশন সক্রিয় থাকে এবং মৃত কানেকশনও দ্রুত শনাক্ত হয়।</p>
      <h4>স্কেলিংয়ের বিবেচনা</h4>
      <ul>
        <li><strong>Sticky session:</strong> Socket.IO-র HTTP long-polling fallback একই সার্ভারে যেতে হয়। <code>ip_hash</code> ব্যবহার করুন, অথবা Socket.IO Redis adapter দিয়ে সার্ভারগুলো যুক্ত করে দিন।</li>
        <li><strong>কানেকশন সীমা:</strong> প্রতিটি WebSocket দুটি কানেকশন ধরে রাখে (ক্লায়েন্ট ও upstream), তাই <code>worker_connections</code> ও ফাইল ডেসক্রিপ্টর সীমা যথেষ্ট বড় রাখুন।</li>
        <li><strong>Reload-এর প্রভাব:</strong> দীর্ঘস্থায়ী কানেকশন পুরনো worker-কে বাঁচিয়ে রাখে; <code>worker_shutdown_timeout</code> দিয়ে সীমা দিন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>WebSocket-এ অথেন্টিকেশন কীভাবে করবেন?</li>
        <li>ডিপ্লয়ের সময় হাজারো WebSocket কানেকশন কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-19",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Reverse Proxy","HTTP2","Performance"],
    question: "Nginx-এ HTTP/2 এবং HTTP/3 (QUIC) প্রোটোকল কীভাবে সক্রিয় করবেন?",
    answer: `
      <p>Nginx-এ আধুনিক প্রোটোকল চালু করা কনফিগারেশনের দিক থেকে সহজ, কিন্তু কিছু পূর্বশর্ত আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    # HTTP/2 — Nginx 1.25.1+ এ নতুন সিনট্যাক্স
    listen 443 ssl;
    http2 on;

    # HTTP/3 (QUIC) — UDP পোর্টে
    listen 443 quic reuseport;
    http3 on;

    ssl_certificate     /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;      # HTTP/3-এর জন্য TLS 1.3 আবশ্যক

    # ব্রাউজারকে জানান HTTP/3 উপলব্ধ আছে
    add_header Alt-Svc 'h3=":443"; ma=86400' always;
}</code></pre>
      </div>
      <h4>গুরুত্বপূর্ণ পূর্বশর্ত</h4>
      <ul>
        <li><strong>HTTP/2 কার্যত HTTPS বাধ্যতামূলক</strong> — সব ব্রাউজার কেবল TLS-এর উপরেই HTTP/2 ব্যবহার করে।</li>
        <li><strong>HTTP/3-এর জন্য UDP 443 পোর্ট খুলতে হবে</strong> — ফায়ারওয়ালে এটি প্রায়ই বন্ধ থাকে এবং এটিই সবচেয়ে সাধারণ কারণ যে HTTP/3 কাজ করছে না।</li>
        <li><strong>Nginx-কে QUIC সাপোর্টসহ কম্পাইল করতে হয়</strong> (BoringSSL বা OpenSSL 3.2+); অনেক ডিস্ট্রিবিউশনের ডিফল্ট প্যাকেজে এটি নেই।</li>
        <li><strong><code>Alt-Svc</code> হেডার অপরিহার্য:</strong> ব্রাউজার প্রথমে HTTP/2-তে সংযোগ করে; এই হেডার দেখে সে জানে পরের বার HTTP/3 চেষ্টা করতে হবে।</li>
      </ul>
      <h4>বাস্তব প্রভাব</h4>
      <ul>
        <li><strong>HTTP/2:</strong> multiplexing-এর কারণে বহু ছোট ফাইল দ্রুত লোড হয়। তবে <strong>পুরনো অপ্টিমাইজেশন সরিয়ে ফেলুন</strong> — domain sharding ও ফাইল concatenation এখন ক্ষতিকর, কারণ একটি কানেকশনেই সব সমান্তরালে যায় এবং আলাদা ফাইল ভালোভাবে ক্যাশ হয়।</li>
        <li><strong>HTTP/3:</strong> সবচেয়ে বেশি লাভ মোবাইল ও দুর্বল নেটওয়ার্কে — প্যাকেট হারানোয় TCP-র head-of-line blocking নেই, এবং Wi-Fi থেকে মোবাইল ডেটায় গেলেও কানেকশন টিকে থাকে (connection migration)।</li>
      </ul>
      <p><strong>পরামর্শ:</strong> HTTP/2 এখন স্ট্যান্ডার্ড — চালু করে দিন। HTTP/3 চালু রাখা নিরাপদ, কারণ যেসব ক্লায়েন্ট বা নেটওয়ার্ক এটি সমর্থন করে না তারা স্বয়ংক্রিয়ভাবে HTTP/2-তে fallback করে। CDN ব্যবহার করলে সাধারণত এজেই HTTP/3 পাওয়া যায়, অরিজিনে আলাদা করে দরকার হয় না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>HTTP/2 চালু করার পর কোন পুরনো অপ্টিমাইজেশনগুলো সরাবেন?</li>
        <li>HTTP/3 কাজ করছে কি না কীভাবে যাচাই করবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-20",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["SSL","Certbot","HTTPS"],
    question: "Nginx-এ Let's Encrypt SSL (Certbot) এবং SSL Termination কীভাবে কনফিগার করা হয়?",
    answer: `
      <p><strong>SSL/TLS Termination</strong> মানে এনক্রিপ্টেড কানেকশন Nginx-এ শেষ হওয়া — Nginx ডিক্রিপ্ট করে ব্যাকএন্ডে সাধারণ HTTP পাঠায়।</p>
      <h4>কেন এজ-এ terminate করা হয়</h4>
      <ul>
        <li><strong>কেন্দ্রীভূত সার্টিফিকেট ব্যবস্থাপনা:</strong> ২০টি সার্ভিসে সার্টিফিকেট বসানোর বদলে একটিমাত্র জায়গায়।</li>
        <li><strong>CPU সাশ্রয়:</strong> TLS হ্যান্ডশেক ব্যয়বহুল; ব্যাকএন্ড অ্যাপ্লিকেশন সেই কাজ থেকে মুক্ত থাকে।</li>
        <li><strong>L7 ফিচার সম্ভব হয়:</strong> ডিক্রিপ্ট না করলে path-ভিত্তিক রাউটিং, ক্যাশিং বা হেডার পরিবর্তন করা যেত না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    listen 443 ssl;
    http2 on;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;         # TLS 1.3-এ ক্লায়েন্টের পছন্দই ভালো

    # সেশন পুনর্ব্যবহার — হ্যান্ডশেক এড়িয়ে বড় পারফরম্যান্স লাভ
    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;               # forward secrecy-র জন্য

    # OCSP stapling — ক্লায়েন্টের আলাদা রিভোকেশন চেক এড়ায়
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    resolver 1.1.1.1 8.8.8.8 valid=300s;

    location / {
        proxy_pass http://backend;
        proxy_set_header X-Forwarded-Proto $scheme;   # ⚠️ অপরিহার্য
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}

# HTTP → HTTPS রিডাইরেক্ট (ACME চ্যালেঞ্জ ছাড়া)
server {
    listen 80;
    server_name example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://$host$request_uri; }
}</code></pre>
      </div>
      <h4>Certbot দিয়ে Let's Encrypt</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>certbot --nginx -d example.com -d www.example.com
# স্বয়ংক্রিয় নবায়ন পরীক্ষা করুন — সার্টিফিকেট মাত্র ৯০ দিন টেকে
certbot renew --dry-run</code></pre>
      </div>
      <h4>যে ভুলটি সবচেয়ে ব্যয়বহুল</h4>
      <p><strong><code>X-Forwarded-Proto</code> না পাঠানো।</strong> ব্যাকএন্ড তখন ভাববে রিকোয়েস্টটি HTTP-তে এসেছে, এবং নিজে HTTPS-এ রিডাইরেক্ট করতে চাইবে — কিন্তু Nginx আবার HTTPS-এ পাঠাবে... ফলে <strong>অসীম রিডাইরেক্ট লুপ</strong>। Express/NestJS-এ <code>app.set('trust proxy', 1)</code>-ও সেট করতে হবে, নাহলে <code>req.secure</code> ও <code>req.ip</code> ভুল হবে।</p>
      <p><strong>নিরাপত্তা বিবেচনা:</strong> Nginx থেকে ব্যাকএন্ড পর্যন্ত ট্রাফিক এনক্রিপ্টেড নয়। বিশ্বস্ত প্রাইভেট নেটওয়ার্কে এটি গ্রহণযোগ্য, কিন্তু zero-trust পরিবেশে ভেতরেও mTLS ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>SSL Labs-এ A+ রেটিং পেতে কী কী লাগে?</li>
        <li>Session ticket বন্ধ রাখা কেন forward secrecy-র জন্য ভালো?</li>
      </ul>
    `
  },
  {
    id: "nginx-22",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Upstream","Load Balancing","Keepalive"],
    question: "Nginx Upstream Block-এ keepalive সেটিংস ব্যাকএন্ড সকেট রিইউজে কীভাবে সাহায্য করে?",
    answer: `
      <p>Upstream keep-alive হলো Nginx-এর সবচেয়ে বেশি প্রভাব ফেলা অথচ সবচেয়ে বেশি উপেক্ষিত অপ্টিমাইজেশন। এটি ছাড়া Nginx <strong>প্রতিটি রিকোয়েস্টের জন্য ব্যাকএন্ডের সাথে একটি নতুন TCP কানেকশন</strong> খোলে।</p>
      <h4>খরচটা কোথায়</h4>
      <p>প্রতিটি নতুন কানেকশনে লাগে একটি TCP three-way handshake (১ RTT), এবং TLS থাকলে আরও ১-২ RTT। তার উপর প্রতিটি বন্ধ কানেকশন <code>TIME_WAIT</code> অবস্থায় ৬০ সেকেন্ড পর্যন্ত পোর্ট ধরে রাখে। উচ্চ ট্রাফিকে এতে <strong>পোর্ট নিঃশেষ</strong> হয়ে যেতে পারে (একটি IP-তে সর্বোচ্চ ~২৮,০০০ ephemeral পোর্ট)।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream backend {
    server 10.0.1.10:3000;
    server 10.0.1.11:3000;

    keepalive 64;                  # প্রতি worker-এ কতগুলো idle কানেকশন রাখবে
    keepalive_requests 1000;       # একটি কানেকশনে কতগুলো রিকোয়েস্ট
    keepalive_timeout 60s;
}

server {
    location /api/ {
        proxy_pass http://backend;

        # ⚠️ এই দুটি লাইন ছাড়া উপরের keepalive সম্পূর্ণ নিষ্ক্রিয়
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}</code></pre>
      </div>
      <h4>দুটি লাইন যা প্রায় সবাই ভুলে যায়</h4>
      <ul>
        <li><strong><code>proxy_http_version 1.1</code>:</strong> HTTP/1.0-তে persistent connection ডিফল্ট নয়। Nginx ডিফল্টে upstream-এ 1.0 ব্যবহার করে, তাই keep-alive কাজই করবে না।</li>
        <li><strong><code>proxy_set_header Connection ""</code>:</strong> Nginx ডিফল্টে upstream-এ <code>Connection: close</code> পাঠায়, যা ব্যাকএন্ডকে প্রতিবার কানেকশন বন্ধ করতে বলে। খালি স্ট্রিং দিয়ে এই হেডারটি মুছে ফেলতে হয়।</li>
      </ul>
      <p><strong>এই দুটির যেকোনো একটি বাদ পড়লে <code>keepalive 64</code> লেখা থাকলেও কোনো প্রভাব পড়ে না</strong> — এবং এটি নীরবে ঘটে, কোনো এরর ছাড়াই।</p>
      <h4><code>keepalive</code> মান কত রাখবেন</h4>
      <p>এটি সর্বোচ্চ কানেকশন সংখ্যা নয় — এটি <strong>প্রতি worker প্রসেসে কতগুলো <em>idle</em> কানেকশন ক্যাশে রাখা হবে</strong>। মোট idle কানেকশন = <code>worker_processes × keepalive</code>।</p>
      <ul>
        <li>খুব কম হলে ব্যস্ত সময়ে নতুন কানেকশন খুলতেই হবে — লাভ কম।</li>
        <li>খুব বেশি হলে ব্যাকএন্ডে অপ্রয়োজনীয় idle কানেকশন জমে থাকবে।</li>
        <li>শুরুর পয়েন্ট হিসেবে ৩২-১২৮ যুক্তিসঙ্গত; ব্যাকএন্ডের কানেকশন সীমার সাথে মিলিয়ে নিন।</li>
      </ul>
      <p><strong>ব্যাকএন্ডেও সামঞ্জস্য দরকার:</strong> Node.js-এর ডিফল্ট <code>server.keepAliveTimeout</code> ৫ সেকেন্ড। Nginx-এর টাইমআউট এর চেয়ে বেশি হলে Nginx এমন একটি কানেকশন পুনর্ব্যবহার করতে যাবে যা ব্যাকএন্ড ইতিমধ্যে বন্ধ করে দিয়েছে — ফলে মাঝে মাঝে <strong>502 Bad Gateway</strong> আসবে। ব্যাকএন্ডের timeout সবসময় Nginx-এর চেয়ে <em>বড়</em> রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মাঝে মাঝে 502 আসছে — keep-alive টাইমআউট কীভাবে ডিবাগ করবেন?</li>
        <li>Keep-alive চালু করলে লোড ব্যালেন্সিংয়ে কী প্রভাব পড়ে?</li>
      </ul>
    `
  },
  {
    id: "nginx-23",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Caching","proxy_cache","CDN"],
    question: "Nginx Microcaching (proxy_cache, proxy_cache_valid) দিয়ে ডায়নামিক API রেসপন্স ক্যাশ কীভাবে করবেন?",
    answer: `
      <p><strong>Microcaching</strong> হলো ডায়নামিক API রেসপন্স খুব অল্প সময়ের (১-১০ সেকেন্ড) জন্য ক্যাশ করা। শুনতে সামান্য মনে হলেও এটি ট্রাফিক স্পাইকে ব্যাকএন্ডের লোড <strong>নাটকীয়ভাবে</strong> কমিয়ে দেয়।</p>
      <p><strong>গণিতটা দেখুন:</strong> একটি এন্ডপয়েন্টে সেকেন্ডে ১০০০ রিকোয়েস্ট আসছে। মাত্র ১ সেকেন্ড ক্যাশ করলে ব্যাকএন্ডে যাবে সেকেন্ডে <strong>একটি</strong> রিকোয়েস্ট — অর্থাৎ লোড ৯৯.৯% কমে গেল, অথচ ডেটা সর্বোচ্চ ১ সেকেন্ড পুরনো।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    proxy_cache_path /var/cache/nginx
        levels=1:2
        keys_zone=micro:10m        # 10 MB মেটাডেটা ≈ 80,000 কী
        max_size=1g
        inactive=60m
        use_temp_path=off;         # অপ্রয়োজনীয় ফাইল কপি এড়ায়

    server {
        location /api/products {
            proxy_pass http://backend;

            proxy_cache micro;
            proxy_cache_valid 200 1s;        # সফল রেসপন্স ১ সেকেন্ড
            proxy_cache_valid 404 10s;
            proxy_cache_key "$scheme$request_method$host$request_uri";

            # ⚠️ সবচেয়ে গুরুত্বপূর্ণ লাইন — একই কী-র জন্য একটিই upstream কল
            proxy_cache_lock on;
            proxy_cache_lock_timeout 5s;

            # ব্যাকএন্ড ডাউন হলে বাসি কনটেন্ট দিন — সাইট বাঁচিয়ে রাখে
            proxy_cache_use_stale error timeout updating
                                  http_500 http_502 http_503 http_504;
            proxy_cache_background_update on;

            add_header X-Cache-Status $upstream_cache_status;  # HIT/MISS/STALE
        }
    }
}</code></pre>
      </div>
      <h4>তিনটি ডিরেক্টিভ যা এটিকে শক্তিশালী করে</h4>
      <ul>
        <li><strong><code>proxy_cache_lock on</code>:</strong> ক্যাশ expire হওয়ার মুহূর্তে ১০০০ রিকোয়েস্ট একসাথে এলে সবাই ব্যাকএন্ডে ছুটবে (cache stampede)। এই লক নিশ্চিত করে শুধু <em>একটি</em> রিকোয়েস্ট যাবে, বাকিরা তার ফলের অপেক্ষা করবে।</li>
        <li><strong><code>proxy_cache_use_stale</code>:</strong> ব্যাকএন্ড ডাউন বা ধীর হলে মেয়াদোত্তীর্ণ ক্যাশ থেকেই সার্ভ করে — ৫০২ এররের বদলে সামান্য পুরনো ডেটা অনেক ভালো।</li>
        <li><strong><code>proxy_cache_background_update on</code>:</strong> বাসি কনটেন্ট সাথে সাথে দিয়ে ব্যাকগ্রাউন্ডে নতুন করে আনে — ইউজার কখনও অপেক্ষা করে না।</li>
      </ul>
      <h4>যা কখনও microcache করবেন না</h4>
      <ul>
        <li><strong>ব্যক্তিগতকৃত কনটেন্ট</strong> — একজনের ডেটা অন্যকে দেখানো ভয়াবহ নিরাপত্তা ত্রুটি। ক্যাশ কী-তে ইউজার আইডি যোগ করুন, অথবা লগইন করা ইউজারের রেসপন্স <code>proxy_cache_bypass $cookie_session;</code> দিয়ে বাদ দিন।</li>
        <li><strong>POST/PUT/DELETE</strong> — কেবল GET ও HEAD ক্যাশ করুন।</li>
        <li>দ্রুত বদলায় এমন গুরুত্বপূর্ণ ডেটা (স্টক, ব্যালান্স)।</li>
      </ul>
      <p><strong>ডিবাগিং:</strong> <code>X-Cache-Status</code> হেডার দেখে নিশ্চিত হন ক্যাশ আসলেই কাজ করছে। ব্যাকএন্ড যদি <code>Cache-Control: no-store</code> বা <code>Set-Cookie</code> পাঠায়, Nginx ডিফল্টে ক্যাশ করবে না — সেক্ষেত্রে <code>proxy_ignore_headers</code> লাগতে পারে (সাবধানে)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ব্যক্তিগতকৃত পেজে microcaching কীভাবে নিরাপদে করবেন?</li>
        <li>নির্দিষ্ট একটি ক্যাশ এন্ট্রি কীভাবে purge করবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-24",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Security","Headers","Hardening"],
    question: "Nginx Server Hardening: X-Frame-Options, CSP, HSTS হেডার যোগ করা এবং Nginx Version লুকানো কীভাবে করবেন?",
    answer: `
      <p>নিরাপত্তা হেডার ব্রাউজারকে নির্দেশ দেয় কীভাবে আপনার সাইটের কনটেন্ট নিরাপদে ব্যবহার করতে হবে। Nginx-এ এগুলো একবার সেট করলে সব অ্যাপ্লিকেশনে প্রযোজ্য হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    # Nginx-এর সংস্করণ লুকানো (তথ্য ফাঁস কমায়)
    server_tokens off;

    # HTTPS বাধ্যতামূলক — ⚠️ preload যোগ করার আগে খুব সতর্ক হন
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # clickjacking প্রতিরোধ
    add_header X-Frame-Options "SAMEORIGIN" always;

    # MIME-type sniffing বন্ধ
    add_header X-Content-Type-Options "nosniff" always;

    # রেফারার তথ্য সীমিত করা
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # ব্রাউজার ফিচারের অনুমতি
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # সবচেয়ে শক্তিশালী কিন্তু সবচেয়ে কঠিন
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self'; base-uri 'self'" always;
}</code></pre>
      </div>
      <h4><code>always</code> প্যারামিটারটি কেন অপরিহার্য</h4>
      <p><code>always</code> ছাড়া <code>add_header</code> কেবল সফল রেসপন্সে (২xx, ৩০৪ ইত্যাদি) হেডার যোগ করে। অর্থাৎ <strong>4xx ও 5xx এরর পেজে কোনো নিরাপত্তা হেডার থাকবে না</strong> — অথচ এররর পেজেই প্রায়ই আক্রমণের সুযোগ থাকে। সবসময় <code>always</code> দিন।</p>
      <h4>একটি বিপজ্জনক ফাঁদ: add_header উত্তরাধিকারসূত্রে পায় না</h4>
      <p>Nginx-এ যদি কোনো ভেতরের ব্লকে (যেমন <code>location</code>) একটিও <code>add_header</code> থাকে, তবে সেই ব্লক বাইরের ব্লকের <strong>সব</strong> <code>add_header</code> হারিয়ে ফেলে। এটি অত্যন্ত সাধারণ নিরাপত্তা ত্রুটি:</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    add_header X-Frame-Options "SAMEORIGIN" always;

    location /api/ {
        add_header X-Custom "value" always;
        # ❌ এখানে X-Frame-Options আর নেই! সব হারিয়ে গেছে
    }
}

# ✅ সমাধান: একটি ফাইলে রেখে সব জায়গায় include করুন
# location /api/ { include /etc/nginx/security-headers.conf; ... }</code></pre>
      </div>
      <h4>HSTS-এ সতর্কতা</h4>
      <p><code>Strict-Transport-Security</code> ব্রাউজারকে বলে "এই ডোমেইনে কখনও HTTP ব্যবহার করবে না"। ব্রাউজার এটি <code>max-age</code> সময় পর্যন্ত মনে রাখে এবং <strong>এটি বাতিল করা যায় না</strong>। HTTPS ঠিকমতো কাজ করছে তা নিশ্চিত না হয়ে <code>includeSubDomains</code> বা <code>preload</code> দেবেন না — সাবডোমেইনে HTTPS না থাকলে সেগুলো অ্যাক্সেসযোগ্যই থাকবে না। শুরুতে ছোট <code>max-age</code> (যেমন ৩০০) দিয়ে পরীক্ষা করুন।</p>
      <p><strong>CSP নিয়ে পরামর্শ:</strong> কড়া CSP সবচেয়ে কার্যকর XSS প্রতিরক্ষা, কিন্তু এটি সহজেই সাইট ভেঙে দেয়। প্রথমে <code>Content-Security-Policy-Report-Only</code> মোডে চালিয়ে রিপোর্ট দেখুন কী কী ব্লক হচ্ছে, তারপর প্রয়োগ করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CSP-তে <code>unsafe-inline</code> কেন এড়ানো উচিত এবং nonce কীভাবে সাহায্য করে?</li>
        <li>X-XSS-Protection হেডার এখন কেন ব্যবহার করা হয় না?</li>
      </ul>
    `
  },
  {
    id: "nginx-25",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Redirects","301 vs 302","Rewrite"],
    question: "Nginx 301 Permanent Redirect vs 302 Temporary Redirect এবং rewrite directive-এর নিয়ম কী?",
    answer: `
      <p>রিডাইরেক্টের ধরন SEO ও ব্রাউজার ক্যাশিংয়ে সরাসরি প্রভাব ফেলে — ভুল কোড ব্যবহার করলে দীর্ঘমেয়াদি সমস্যা হতে পারে।</p>
      <table>
        <tr><th>কোড</th><th>অর্থ</th><th>ব্রাউজার ক্যাশ</th><th>SEO</th></tr>
        <tr><td><strong>301</strong></td><td>Permanent</td><td><strong>স্থায়ীভাবে ক্যাশ করে</strong></td><td>লিংক ইক্যুইটি নতুন URL-এ যায়</td></tr>
        <tr><td><strong>302</strong></td><td>Found (temporary)</td><td>করে না</td><td>পুরনো URL-ই ইনডেক্সড থাকে</td></tr>
        <tr><td><strong>307/308</strong></td><td>302/301-এর কড়া সংস্করণ</td><td>—</td><td>HTTP মেথড অপরিবর্তিত রাখে</td></tr>
      </table>
      <p><strong>সবচেয়ে বড় বিপদ:</strong> ব্রাউজার 301 <em>স্থায়ীভাবে</em> ক্যাশ করে রাখে। ভুল করে 301 দিলে ইউজারের ব্রাউজার সেটি মনে রাখবে এবং আপনি সার্ভারে ঠিক করার পরও তারা পুরনো রিডাইরেক্টই পাবেন। <strong>তাই সন্দেহ থাকলে সবসময় 302 দিয়ে শুরু করুন</strong>, নিশ্চিত হলে পরে 301-এ যান।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ✅ সরল রিডাইরেক্টে return ব্যবহার করুন — rewrite-এর চেয়ে দ্রুত
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}

# www → non-www
server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}

# rewrite — যখন প্যাটার্ন ম্যাচিং ও ক্যাপচার দরকার
location /old-blog/ {
    rewrite ^/old-blog/(.*)$ /blog/$1 permanent;   # permanent = 301
    #                                  redirect   = 302
}</code></pre>
      </div>
      <h4><code>rewrite</code>-এর ফ্ল্যাগ</h4>
      <ul>
        <li><strong><code>last</code>:</strong> rewrite করে আবার location ম্যাচিং শুরু করে (ভেতরে, ক্লায়েন্ট জানে না)।</li>
        <li><strong><code>break</code>:</strong> rewrite করে থেমে যায়, বর্তমান ব্লকেই প্রক্রিয়া চালিয়ে যায়।</li>
        <li><strong><code>redirect</code>:</strong> 302 পাঠায় ক্লায়েন্টকে।</li>
        <li><strong><code>permanent</code>:</strong> 301 পাঠায়।</li>
      </ul>
      <p><strong>নিয়ম:</strong> <code>return</code> ও <code>rewrite</code>-এর মধ্যে সবসময় <code>return</code> বেছে নিন যদি regex ক্যাপচার না লাগে — এটি দ্রুত এবং পড়তে সহজ। <code>rewrite</code> প্রতিটি রিকোয়েস্টে regex চালায়।</p>
      <h4>একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ পার্থক্য: 307/308</h4>
      <p>ঐতিহাসিকভাবে অনেক ব্রাউজার 301/302 রিডাইরেক্টে POST-কে GET-এ বদলে ফেলত। <strong>307 ও 308 মেথড অপরিবর্তিত রাখার নিশ্চয়তা দেয়</strong>। API রিডাইরেক্টে POST/PUT সংরক্ষণ করতে হলে এগুলো ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ভুল করে 301 দিয়ে ফেললে কীভাবে ঠিক করবেন?</li>
        <li>রিডাইরেক্ট চেইন SEO-তে কেন ক্ষতিকর?</li>
      </ul>
    `
  },
  {
    id: "nginx-26",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Gzip","Brotli","Static"],
    question: "Nginx-এ Static File Gzip & Brotli Compression (gzip_static, brotli_static) কীভাবে কনফিগার করবেন?",
    answer: `
      <p>প্রতিটি রিকোয়েস্টে নতুন করে কম্প্রেস করা অপচয় — স্ট্যাটিক ফাইল তো বদলায় না। <strong>প্রি-কম্প্রেশন</strong> বিল্ড টাইমে একবার কম্প্রেস করে রাখে, তারপর Nginx শুধু সেই ফাইলটি সার্ভ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    gzip_static on;      # app.js চাইলে app.js.gz থাকলে সেটিই দেবে
    brotli_static on;    # app.js.br — আরও ছোট

    # রানটাইম কম্প্রেশন ডায়নামিক কনটেন্টের জন্য চালু রাখুন
    gzip on;
    gzip_types text/css application/javascript application/json;
    brotli on;
    brotli_comp_level 6;
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># বিল্ড স্ক্রিপ্টে — সর্বোচ্চ কম্প্রেশন ব্যবহার করুন, একবারই হচ্ছে
find dist -type f \\( -name "*.js" -o -name "*.css" -o -name "*.html" \\
     -o -name "*.svg" -o -name "*.json" \\) -exec gzip -k -9 {} \\;
find dist -type f \\( -name "*.js" -o -name "*.css" \\) \\
     -exec brotli -k -q 11 {} \\;

# ফলাফল: app.js, app.js.gz, app.js.br পাশাপাশি থাকবে</code></pre>
      </div>
      <h4>কেন এটি স্পষ্টভাবে ভালো</h4>
      <ul>
        <li><strong>CPU খরচ শূন্য</strong> প্রতি রিকোয়েস্টে — শুধু ফাইল পড়া (এবং <code>sendfile</code> দিয়ে zero-copy পাঠানো)।</li>
        <li><strong>সর্বোচ্চ কম্প্রেশন লেভেল ব্যবহারযোগ্য:</strong> রানটাইমে <code>gzip_comp_level 9</code> দেওয়া অবাস্তব (CPU খরচ), কিন্তু বিল্ড টাইমে <code>-9</code> বা brotli <code>-q 11</code> দেওয়া যায় — ফাইল আরও ছোট হয়।</li>
        <li><strong>ফলাফল পূর্বানুমেয়</strong> — প্রতিবার একই আউটপুট।</li>
      </ul>
      <h4>Brotli বনাম Gzip</h4>
      <table>
        <tr><th>দিক</th><th>Gzip</th><th>Brotli</th></tr>
        <tr><td>কম্প্রেশন (টেক্সট)</td><td>বেসলাইন</td><td><strong>১৫-২৫% ছোট</strong></td></tr>
        <tr><td>ব্রাউজার সাপোর্ট</td><td>সর্বজনীন</td><td>সব আধুনিক ব্রাউজার (HTTPS-এ)</td></tr>
        <tr><td>কম্প্রেশন গতি</td><td>দ্রুত</td><td>ধীর (উচ্চ লেভেলে)</td></tr>
        <tr><td>ডিকম্প্রেশন</td><td>দ্রুত</td><td>দ্রুত</td></tr>
      </table>
      <p>দুটিই চালু রাখুন — Nginx ক্লায়েন্টের <code>Accept-Encoding</code> দেখে সেরাটি বেছে নেবে, এবং পুরনো ক্লায়েন্ট gzip পাবে।</p>
      <h4>গুরুত্বপূর্ণ শর্ত</h4>
      <ul>
        <li><code>gzip_static</code> মডিউল Nginx-এ কম্পাইল করা থাকতে হবে (<code>nginx -V | grep http_gzip_static</code>)। <code>brotli_static</code>-এর জন্য <code>ngx_brotli</code> আলাদাভাবে যোগ করতে হয়।</li>
        <li><strong>মূল ফাইলটিও রাখতে হবে</strong> (<code>gzip -k</code>-এর <code>-k</code> = keep) — যেসব ক্লায়েন্ট কম্প্রেশন সাপোর্ট করে না তাদের জন্য।</li>
        <li>কম্প্রেসড ফাইলের timestamp মূল ফাইলের চেয়ে পুরনো হলে Nginx সতর্ক করতে পারে — বিল্ড পাইপলাইনে ক্রম ঠিক রাখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CDN ব্যবহার করলে কি প্রি-কম্প্রেশন দরকার?</li>
        <li>ছবিতে কি এই কৌশল কাজ করবে?</li>
      </ul>
    `
  },
  {
    id: "nginx-27",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Worker","worker_processes","worker_connections"],
    question: "Nginx worker_processes এবং worker_connections সেটিংস কীভাবে সর্বোচ্চ কনকারেন্সি গ্যারান্টি দেয়?",
    answer: `
      <p>Nginx-এর সর্বোচ্চ কনকারেন্সি একটি সরল সূত্রে নির্ধারিত:</p>
      <p style="text-align:center"><strong>সর্বোচ্চ কানেকশন = <code>worker_processes</code> × <code>worker_connections</code></strong></p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>worker_processes auto;        # CPU কোর সংখ্যার সমান (প্রস্তাবিত)
worker_rlimit_nofile 65535;   # প্রতি worker-এ ফাইল ডেসক্রিপ্টর সীমা

events {
    worker_connections 4096;  # প্রতি worker-এ সর্বোচ্চ কানেকশন
    use epoll;                # Linux-এ দক্ষ ইভেন্ট মডেল
    multi_accept on;          # একবারে একাধিক নতুন কানেকশন গ্রহণ
}
# 8 কোর × 4096 = 32,768 সমান্তরাল কানেকশন</code></pre>
      </div>
      <h4>worker_processes কেন CPU কোরের সমান</h4>
      <p>Nginx প্রতিটি কানেকশনের জন্য থ্রেড তৈরি করে না — প্রতিটি worker একটি <strong>event loop</strong> (epoll) চালিয়ে হাজারো কানেকশন একসাথে সামলায়। কাজ CPU-নির্ভর হওয়ায় কোরের চেয়ে বেশি worker রাখলে অপ্রয়োজনীয় context switch হয়, লাভ হয় না। <code>auto</code> দিলে Nginx নিজেই কোর সংখ্যা শনাক্ত করে।</p>
      <h4>একটি গুরুত্বপূর্ণ সূক্ষ্মতা: reverse proxy-তে কানেকশন দ্বিগুণ</h4>
      <p>Nginx যখন প্রক্সি হিসেবে কাজ করে, প্রতিটি ক্লায়েন্ট রিকোয়েস্টে <strong>দুটি</strong> কানেকশন লাগে — একটি ক্লায়েন্টের সাথে, আরেকটি upstream-এর সাথে। তাই বাস্তব ক্ষমতা প্রায় অর্ধেক। স্ট্যাটিক ফাইল সার্ভ করলে এটি প্রযোজ্য নয়।</p>
      <h4>OS-স্তরের সীমা — যা প্রায়ই আসল bottleneck</h4>
      <p><code>worker_connections</code> যত বড়ই দিন, ফাইল ডেসক্রিপ্টরের সীমা না বাড়ালে কাজ হবে না — Linux-এ প্রতিটি সকেটই একটি ফাইল ডেসক্রিপ্টর।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সিস্টেম-ব্যাপী সীমা
sysctl -w fs.file-max=200000

# প্রতি প্রসেস সীমা (/etc/security/limits.conf)
nginx soft nofile 65535
nginx hard nofile 65535

# TCP টিউনিং
sysctl -w net.core.somaxconn=65535          # accept queue
sysctl -w net.ipv4.tcp_max_syn_backlog=65535
sysctl -w net.ipv4.ip_local_port_range="1024 65535"   # upstream কানেকশনের জন্য

# বর্তমান অবস্থা দেখা
cat /proc/$(pgrep -f "nginx: worker" | head -1)/limits | grep "open files"</code></pre>
      </div>
      <h4>বাস্তব সীমাবদ্ধতা</h4>
      <p>শুধু সংখ্যা বাড়ালেই ক্ষমতা বাড়ে না। প্রতিটি সক্রিয় কানেকশন মেমরি খায় (~২-১০ KB), এবং TLS হ্যান্ডশেক CPU খায়। তাই ৩২,৭৬৮ কানেকশনের কনফিগ থাকলেও প্রকৃত সীমা প্রায়ই RAM, CPU বা upstream ব্যাকএন্ডের ক্ষমতা — Nginx নিজে নয়। লোড টেস্ট করে আসল সীমা বের করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Keep-alive কীভাবে কার্যকর ক্ষমতা বাড়ায়?</li>
        <li>"Too many open files" এরর দেখলে কোথায় দেখবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-28",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Security","mTLS","Client Certificate"],
    question: "Nginx-এ Mutual TLS (mTLS) Client Certificate Authentication কীভাবে কনফিগার করবেন?",
    answer: `
      <p><strong>Mutual TLS (mTLS)</strong>-এ কেবল সার্ভারই নয়, <strong>ক্লায়েন্টকেও</strong> সার্টিফিকেট দিয়ে নিজের পরিচয় প্রমাণ করতে হয়। সাধারণ TLS-এ যাচাই একমুখী; mTLS-এ দ্বিমুখী।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    listen 443 ssl;
    server_name partner-api.example.com;

    ssl_certificate     /etc/ssl/server.crt;
    ssl_certificate_key /etc/ssl/server.key;

    # ক্লায়েন্ট সার্টিফিকেট যাচাইয়ের জন্য CA
    ssl_client_certificate /etc/ssl/ca.crt;
    ssl_verify_client on;          # on = বাধ্যতামূলক, optional = ঐচ্ছিক
    ssl_verify_depth 2;

    # প্রত্যাহার করা সার্টিফিকেট আটকান
    ssl_crl /etc/ssl/ca.crl;

    location / {
        # যাচাই হওয়া পরিচয় ব্যাকএন্ডে পাঠান
        proxy_set_header X-Client-Verify  $ssl_client_verify;   # SUCCESS / FAILED / NONE
        proxy_set_header X-Client-DN      $ssl_client_s_dn;
        proxy_set_header X-Client-Serial  $ssl_client_serial;
        proxy_pass http://backend;
    }
}</code></pre>
      </div>
      <h4>নির্দিষ্ট ক্লায়েন্টকে নির্দিষ্ট পথে সীমিত করা</h4>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ঐচ্ছিক যাচাই — কিছু পথে mTLS, কিছু পথে নয়
ssl_verify_client optional;

map $ssl_client_s_dn $partner_name {
    default                              "";
    "~CN=partner-a.example.com"        partner_a;
    "~CN=partner-b.example.com"        partner_b;
}

location /partner-api/ {
    if ($ssl_client_verify != SUCCESS) { return 403; }
    if ($partner_name = "")            { return 403; }
    proxy_set_header X-Partner $partner_name;
    proxy_pass http://backend;
}

location /public/ {
    proxy_pass http://backend;      # সার্টিফিকেট লাগবে না
}</code></pre>
      </div>
      <h4>কোথায় mTLS উপযুক্ত</h4>
      <ul>
        <li><strong>B2B / পার্টনার API:</strong> সীমিত সংখ্যক পরিচিত ক্লায়েন্ট — সার্টিফিকেট বিতরণ ব্যবস্থাপনাযোগ্য।</li>
        <li><strong>সার্ভিস-টু-সার্ভিস যোগাযোগ:</strong> zero-trust আর্কিটেকচারের ভিত্তি। Service mesh (Istio) এটি স্বয়ংক্রিয়ভাবে করে।</li>
        <li><strong>IoT ডিভাইস:</strong> প্রতিটি ডিভাইসে একটি ইউনিক সার্টিফিকেট।</li>
        <li><strong>অ্যাডমিন প্যানেল:</strong> পাসওয়ার্ডের পাশাপাশি অতিরিক্ত স্তর।</li>
      </ul>
      <h4>কেন এটি সাধারণ ইউজারের জন্য নয়</h4>
      <p>mTLS-এর মূল ব্যবহারিক সমস্যা হলো <strong>সার্টিফিকেট জীবনচক্র ব্যবস্থাপনা</strong> — বিতরণ, নবায়ন, প্রত্যাহার। লক্ষ লক্ষ ব্রাউজার ব্যবহারকারীকে সার্টিফিকেট ইনস্টল করানো অবাস্তব, এবং ব্যবহারকারীর অভিজ্ঞতাও খারাপ। তাই এটি <em>মেশিন-টু-মেশিন</em> যোগাযোগেই সীমাবদ্ধ থাকে।</p>
      <p><strong>সবচেয়ে বড় অপারেশনাল ঝুঁকি:</strong> ক্লায়েন্ট সার্টিফিকেট মেয়াদোত্তীর্ণ হলে সেই ইন্টিগ্রেশন <strong>হঠাৎ সম্পূর্ণ বন্ধ</strong> হয়ে যায়, প্রায়ই কোনো পূর্বসতর্কতা ছাড়াই। তাই মেয়াদ পর্যবেক্ষণ করে আগেভাগে alert দিন এবং সম্ভব হলে স্বয়ংক্রিয় নবায়ন (cert-manager, SPIFFE) ব্যবহার করুন।</p>
      <p><strong>প্রত্যাহার:</strong> একটি ক্লায়েন্ট সার্টিফিকেট আপস হলে CRL বা OCSP দিয়ে বাতিল করতে হবে — শুধু সার্টিফিকেট মুছে ফেললে হবে না, কারণ সেটি ক্লায়েন্টের হাতেই আছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Cloudflare বা লোড ব্যালেন্সারের পেছনে mTLS কীভাবে কাজ করাবেন?</li>
        <li>mTLS বনাম API key — কখন কোনটি যথেষ্ট?</li>
      </ul>
    `
  },
  {
    id: "nginx-29",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Errors","custom error_page","Fallbacks"],
    question: "Nginx-এ কাস্টম 404/50x Error Pages এবং @fallback Location Block কীভাবে সেটআপ করবেন?",
    answer: `
      <p>ডিফল্ট Nginx এরর পেজ দেখতে অপেশাদার এবং সেখানে সার্ভারের সংস্করণ তথ্যও ফাঁস হতে পারে। কাস্টম এরর পেজ ব্যবহারকারীর অভিজ্ঞতা ও নিরাপত্তা দুটোই উন্নত করে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    server_tokens off;                      # সংস্করণ লুকান

    error_page 404              /404.html;
    error_page 500 502 503 504  /50x.html;

    # internal = এই পাথ সরাসরি ব্রাউজার থেকে অ্যাক্সেস করা যাবে না
    location = /404.html {
        root /var/www/errors;
        internal;
    }
    location = /50x.html {
        root /var/www/errors;
        internal;
    }

    # ব্যাকএন্ড ডাউন হলে স্ট্যাটিক fallback পেজ
    location / {
        proxy_pass http://backend;
        proxy_intercept_errors on;          # ব্যাকএন্ডের এররও Nginx সামলাবে
        error_page 502 503 504 = @maintenance;
    }

    location @maintenance {
        root /var/www/errors;
        try_files /maintenance.html =503;
    }
}</code></pre>
      </div>
      <h4>মূল ডিরেক্টিভগুলো</h4>
      <ul>
        <li><strong><code>internal</code>:</strong> নিশ্চিত করে পেজটি কেবল অভ্যন্তরীণ রিডাইরেক্টেই সার্ভ হবে — কেউ সরাসরি <code>/404.html</code> খুলতে পারবে না।</li>
        <li><strong><code>proxy_intercept_errors on</code>:</strong> এটি ছাড়া ব্যাকএন্ডের পাঠানো 502/504 সরাসরি ক্লায়েন্টে চলে যায়, Nginx-এর <code>error_page</code> কার্যকর হয় না।</li>
        <li><strong><code>@name</code> named location:</strong> এটি কোনো URI-র সাথে মেলে না, শুধু <code>error_page</code> বা <code>try_files</code> থেকে অভ্যন্তরীণভাবে ডাকা যায় — fallback লজিকের জন্য আদর্শ।</li>
      </ul>
      <h4>API-র জন্য JSON এরর</h4>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>location /api/ {
    proxy_pass http://backend;
    proxy_intercept_errors on;
    error_page 502 503 504 = @api_error;
}

location @api_error {
    default_type application/json;
    return 503 '{"error":"service_unavailable","message":"সাময়িকভাবে অনুপলব্ধ"}';
}</code></pre>
      </div>
      <p>API ক্লায়েন্টকে HTML এরর পেজ পাঠালে সে JSON পার্স করতে গিয়ে ক্র্যাশ করবে — তাই path অনুযায়ী আলাদা এরর ফরম্যাট দেওয়া গুরুত্বপূর্ণ।</p>
      <h4>একটি গুরুত্বপূর্ণ সতর্কতা</h4>
      <p><code>error_page 404 = 200 /index.html;</code> লিখলে স্ট্যাটাস কোড 200-এ বদলে যায়। SPA-তে এটি প্রলুব্ধকর মনে হলেও <strong>SEO-র জন্য ক্ষতিকর</strong> — সার্চ ইঞ্জিন ভাববে প্রতিটি ভুল URL একটি বৈধ পেজ (soft 404)। SPA-তে <code>try_files</code> ব্যবহার করুন এবং আসল ৪০৪-এর জন্য অ্যাপ্লিকেশনকে সঠিক স্ট্যাটাস দিতে দিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Maintenance mode কীভাবে চালু/বন্ধ করবেন কনফিগ না বদলে?</li>
        <li>এরর পেজেও নিরাপত্তা হেডার থাকবে কীভাবে নিশ্চিত করবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-30",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Proxy","proxy_pass","Trailing Slash"],
    question: "Nginx proxy_pass-এ Trailing Slash (/)-এর ভূমিকা ও পার্থক্য কী?",
    answer: `
      <p><code>proxy_pass</code>-এ URI-র শেষে স্ল্যাশ আছে কি নেই — এই ছোট পার্থক্যটি সম্পূর্ণ ভিন্ন আচরণ তৈরি করে, এবং এটিই Nginx-এর সবচেয়ে বিভ্রান্তিকর নিয়মগুলোর একটি।</p>
      <table>
        <tr><th>কনফিগ</th><th>রিকোয়েস্ট</th><th>ব্যাকএন্ডে যায়</th></tr>
        <tr><td><code>proxy_pass http://app;</code></td><td><code>/api/users</code></td><td><code>/api/users</code></td></tr>
        <tr><td><code>proxy_pass http://app/;</code></td><td><code>/api/users</code></td><td><code>/users</code></td></tr>
      </table>
      <h4>নিয়মটি</h4>
      <ul>
        <li><strong><code>proxy_pass</code>-এ URI অংশ থাকলে (স্ল্যাশসহ বা পাথসহ):</strong> Nginx location-এর সাথে মেলা prefix অংশটি <strong>কেটে ফেলে</strong> এবং তার জায়গায় <code>proxy_pass</code>-এর URI বসায়।</li>
        <li><strong>URI অংশ না থাকলে (শুধু হোস্ট):</strong> সম্পূর্ণ মূল পাথ অপরিবর্তিত অবস্থায় পাঠানো হয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ব্যাকএন্ড /api/ prefix সহ রুট আশা করে
location /api/ {
    proxy_pass http://backend;        # /api/users → /api/users
}

# ব্যাকএন্ড prefix ছাড়া রুট আশা করে (prefix ছেঁটে ফেলা)
location /api/ {
    proxy_pass http://backend/;       # /api/users → /users
}

# নতুন prefix-এ ম্যাপ করা
location /old-api/ {
    proxy_pass http://backend/v2/;    # /old-api/users → /v2/users
}</code></pre>
      </div>
      <h4>যে ভুলটি প্রায়ই হয়</h4>
      <p><strong>একটি স্ল্যাশ যোগ বা বাদ দিলে ব্যাকএন্ডে ৪০৪ আসতে শুরু করে</strong> — অথচ Nginx-এর কোনো এরর দেখা যায় না, কারণ Nginx সফলভাবেই প্রক্সি করেছে, শুধু ভুল পাথে।</p>
      <p><strong>ডিবাগিং:</strong> লগ ফরম্যাটে <code>$upstream_uri</code> যোগ করুন, অথবা ব্যাকএন্ডে ঢোকা পাথটি লগ করুন — তাহলে সাথে সাথে বোঝা যাবে।</p>
      <h4>গুরুত্বপূর্ণ ব্যতিক্রম: regex location</h4>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ❌ অবৈধ — regex location-এ proxy_pass-এ URI দেওয়া যায় না
location ~ ^/api/(.*)$ {
    proxy_pass http://backend/$1;    # কাজ করবে না এভাবে
}

# ✅ regex-এ rewrite ব্যবহার করুন
location ~ ^/api/(.*)$ {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://backend;
}</code></pre>
      </div>
      <p><strong>আরেকটি সূক্ষ্মতা:</strong> <code>proxy_pass</code>-এ ভ্যারিয়েবল ব্যবহার করলে (যেমন <code>proxy_pass http://$backend;</code>) Nginx স্টার্টআপে DNS রিজলভ না করে <em>প্রতিটি রিকোয়েস্টে</em> করে — তখন <code>resolver</code> ডিরেক্টিভ দিতে হয়। এটি ডায়নামিক upstream-এর জন্য উপযোগী, কিন্তু URI হ্যান্ডলিংও তখন বদলে যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>location /api</code> (স্ল্যাশ ছাড়া) দিলে কী পার্থক্য হয়?</li>
        <li>Upstream ব্লক ব্যবহার করলে DNS কখন রিজলভ হয়?</li>
      </ul>
    `
  },
  {
    id: "nginx-31",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Security","IP Blocking","allow deny"],
    question: "Nginx-এ allow এবং deny ডিরেক্টিভ দিয়ে IP Blacklisting / Whitelisting কীভাবে করবেন?",
    answer: `
      <p><code>allow</code> এবং <code>deny</code> দিয়ে IP ঠিকানার ভিত্তিতে অ্যাক্সেস নিয়ন্ত্রণ করা হয় — সাধারণত অ্যাডমিন প্যানেল, মেট্রিক্স এন্ডপয়েন্ট বা ইন্টারনাল টুল সুরক্ষিত রাখতে।</p>
      <p><strong>নিয়ম:</strong> Nginx উপর থেকে নিচে ক্রমানুসারে মেলায় এবং <strong>প্রথম ম্যাচেই থেমে যায়</strong>। তাই <code>deny all</code> সবসময় শেষে রাখতে হবে — শুরুতে রাখলে কেউই ঢুকতে পারবে না।</p>
      <h4>গুরুত্বপূর্ণ সতর্কতা</h4>
      <ul>
        <li><strong>প্রক্সির পেছনে থাকলে এটি ভেঙে যায়:</strong> Cloudflare বা লোড ব্যালেন্সারের পেছনে <code>$remote_addr</code> হয় প্রক্সির IP, আসল ইউজারের নয়। তখন <code>ngx_http_realip_module</code> দিয়ে <code>set_real_ip_from</code> কনফিগার করতে হবে।</li>
        <li><strong>CIDR রেঞ্জ:</strong> একক IP-র বদলে <code>allow 192.168.1.0/24;</code> দিয়ে পুরো সাবনেট অনুমোদন করা যায়।</li>
        <li><strong>এটি একমাত্র সুরক্ষা নয়:</strong> IP স্পুফ বা পরিবর্তন হতে পারে। সংবেদনশীল এন্ডপয়েন্টে IP ফিল্টারের পাশাপাশি প্রকৃত অথেন্টিকেশনও রাখুন।</li>
      </ul>
<div class="code-box"><div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div><pre><code>location /admin {
  allow 192.168.1.10;
  deny all;
}</code></pre></div>
    `
  },
  {
    id: "nginx-32",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Stub Status","Metrics","Prometheus"],
    question: "Nginx stub_status module দিয়ে অ্যাক্টিভ কানেকশন মেট্রিক্স ট্র্যাকিং কীভাবে করবেন?",
    answer: `
      <p><code>stub_status</code> মডিউল Nginx-এর মৌলিক কানেকশন মেট্রিক্স একটি সরল টেক্সট এন্ডপয়েন্টে প্রকাশ করে — মনিটরিংয়ের সবচেয়ে সহজ ভিত্তি।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    listen 127.0.0.1:8080;          # ⚠️ শুধু লোকালহোস্টে

    location /nginx_status {
        stub_status on;
        access_log off;
        allow 127.0.0.1;
        allow 10.0.0.0/8;           # মনিটরিং সার্ভার
        deny all;
    }
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Active connections: 291
server accepts handled requests
 16630948 16630948 31070465
Reading: 6 Writing: 179 Waiting: 106</code></pre>
      </div>
      <h4>প্রতিটি সংখ্যার অর্থ</h4>
      <ul>
        <li><strong>Active connections:</strong> বর্তমানে খোলা কানেকশন (Waiting সহ)।</li>
        <li><strong>accepts:</strong> মোট গৃহীত কানেকশন। <strong>handled:</strong> মোট সফলভাবে সামলানো।</li>
        <li><strong>requests:</strong> মোট রিকোয়েস্ট। <code>requests / handled</code> = প্রতি কানেকশনে গড় রিকোয়েস্ট — এটি বলে দেয় keep-alive কতটা কার্যকর।</li>
        <li><strong>Reading:</strong> রিকোয়েস্ট হেডার পড়ছে। <strong>Writing:</strong> রেসপন্স পাঠাচ্ছে। <strong>Waiting:</strong> idle keep-alive কানেকশন।</li>
      </ul>
      <h4>যেভাবে সমস্যা শনাক্ত করবেন</h4>
      <ul>
        <li><strong><code>accepts</code> ≠ <code>handled</code>:</strong> এই পার্থক্যটি মানে কিছু কানেকশন গ্রহণের পর <em>ফেলে দেওয়া</em> হয়েছে — সাধারণত <code>worker_connections</code> সীমা বা ফাইল ডেসক্রিপ্টর শেষ হয়ে গেছে। <strong>এটি সবচেয়ে গুরুত্বপূর্ণ সংকেত</strong>, এতে অবশ্যই alert দিন।</li>
        <li><strong>Reading বেশি:</strong> ক্লায়েন্টরা ধীরে হেডার পাঠাচ্ছে — Slowloris আক্রমণের লক্ষণ হতে পারে।</li>
        <li><strong>Writing বেশি:</strong> ব্যাকএন্ড ধীর, বা ক্লায়েন্টরা ধীরে ডেটা নিচ্ছে।</li>
        <li><strong>Waiting খুব বেশি:</strong> <code>keepalive_timeout</code> সম্ভবত বেশি — idle কানেকশন সম্পদ ধরে রাখছে।</li>
      </ul>
      <h4>প্রোডাকশন মনিটরিং</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># nginx-prometheus-exporter দিয়ে Prometheus-এ পাঠান
nginx-prometheus-exporter -nginx.scrape-uri=http://127.0.0.1:8080/nginx_status

# পাওয়া যাবে: nginx_connections_active, nginx_connections_waiting,
#             nginx_http_requests_total ইত্যাদি</code></pre>
      </div>
      <p><strong>সীমাবদ্ধতা:</strong> <code>stub_status</code> খুবই মৌলিক — প্রতি-সাইট, প্রতি-upstream বা স্ট্যাটাস কোডভিত্তিক পরিসংখ্যান দেয় না। এর জন্য হয় <strong>অ্যাক্সেস লগ পার্স করে</strong> মেট্রিক তৈরি করতে হয় (Prometheus-এ <code>nginx-log-exporter</code>, বা ELK), অথবা VTS মডিউল/Nginx Plus ব্যবহার করতে হয়। বাস্তবে JSON অ্যাক্সেস লগ থেকেই সবচেয়ে সমৃদ্ধ মেট্রিক পাওয়া যায়।</p>
      <p><strong>নিরাপত্তা:</strong> এই এন্ডপয়েন্ট কখনও পাবলিক করবেন না — এটি আপনার ট্রাফিক প্যাটার্ন ও ক্ষমতা সম্পর্কে তথ্য ফাঁস করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>প্রতি-এন্ডপয়েন্ট latency মেট্রিক কীভাবে পাবেন?</li>
        <li><code>accepts</code> ও <code>handled</code>-এর পার্থক্য দেখলে প্রথমে কী পরীক্ষা করবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-33",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Buffers","proxy_buffer_size","Tuning"],
    question: "Nginx-এ proxy_buffer_size এবং proxy_buffers দিয়ে Response Buffering টিউন কীভাবে করবেন?",
    answer: `
      <p>Nginx ডিফল্টে ব্যাকএন্ডের সম্পূর্ণ রেসপন্স নিজের বাফারে নিয়ে তারপর ক্লায়েন্টকে পাঠায়। এটি <strong>ইচ্ছাকৃত ও সাধারণত কাম্য</strong> — কারণ এতে ধীর ক্লায়েন্ট আপনার ব্যাকএন্ড কানেকশন দীর্ঘক্ষণ আটকে রাখতে পারে না।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>location /api/ {
    proxy_pass http://backend;

    proxy_buffering on;                 # ডিফল্ট — চালু রাখুন
    proxy_buffer_size    8k;            # রেসপন্স হেডারের জন্য প্রথম বাফার
    proxy_buffers        16 8k;         # বডির জন্য: 16টি × 8k = 128k
    proxy_busy_buffers_size 16k;        # ক্লায়েন্টকে পাঠানোর সময় ব্যস্ত বাফার

    # বাফার উপচে পড়লে অস্থায়ী ফাইলে যায়
    proxy_max_temp_file_size 1024m;
    proxy_temp_file_write_size 8k;
}</code></pre>
      </div>
      <h4>কেন বাফারিং ভালো</h4>
      <p>ধরুন একজন ইউজার ২G মোবাইল নেটওয়ার্কে ৫ MB JSON ডাউনলোড করছেন — এতে ৩০ সেকেন্ড লাগবে। বাফারিং ছাড়া আপনার Node.js ব্যাকএন্ডের একটি কানেকশন পুরো ৩০ সেকেন্ড ধরে আটকে থাকবে। বাফারিং থাকলে Nginx দ্রুত পুরো রেসপন্স নিয়ে ব্যাকএন্ডের কানেকশন ছেড়ে দেয়, তারপর ধীরে ধীরে ক্লায়েন্টকে দেয়। <strong>ব্যাকএন্ডের কনকারেন্সি বহুগুণ বাড়ে।</strong></p>
      <h4>কখন বাফারিং বন্ধ করতে হবে</h4>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Server-Sent Events / স্ট্রিমিং রেসপন্স
location /api/stream {
    proxy_pass http://backend;
    proxy_buffering off;          # ⚠️ নাহলে ইভেন্ট আটকে থাকবে
    proxy_cache off;
    chunked_transfer_encoding on;
    proxy_read_timeout 3600s;
}</code></pre>
      </div>
      <p><strong>এটি একটি ক্লাসিক বাগ:</strong> SSE বা AI টোকেন-স্ট্রিমিং এন্ডপয়েন্ট লোকালহোস্টে ঠিক কাজ করে, কিন্তু Nginx-এর পেছনে গেলে কিছুই দেখা যায় না — সব ডেটা একসাথে শেষে আসে। কারণ Nginx বাফারে জমা করছিল। ব্যাকএন্ড থেকে <code>X-Accel-Buffering: no</code> হেডার পাঠিয়েও এটি per-response নিয়ন্ত্রণ করা যায়।</p>
      <h4>লক্ষণ ও টিউনিং</h4>
      <ul>
        <li><strong>এরর লগে <code>"an upstream response is buffered to a temporary file"</code></strong> দেখলে বুঝবেন বাফার ছোট পড়ছে — ডিস্কে লেখা হচ্ছে, যা ধীর। বড় JSON রেসপন্স হলে <code>proxy_buffers</code> বাড়ান।</li>
        <li><strong><code>upstream sent too big header</code></strong> এরর মানে <code>proxy_buffer_size</code> ছোট — বড় কুকি বা অনেক হেডার থাকলে ৮k বা ১৬k করুন।</li>
        <li>বাফার মেমরি <em>প্রতি কানেকশনে</em> বরাদ্দ হয়, তাই খুব বড় মান দিলে উচ্চ কনকারেন্সিতে RAM দ্রুত শেষ হবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>WebSocket-এ proxy_buffering-এর ভূমিকা কী?</li>
        <li>ফাইল আপলোডে <code>proxy_request_buffering</code> কেন আলাদা?</li>
      </ul>
    `
  },
  {
    id: "nginx-34",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Stream","SNI Routing","ssl_preread"],
    question: "Nginx Stream Module-এ ssl_preread দিয়ে TLS SNI-এর ওপর ভিত্তি করে L4 ট্রাফিক রাউটিং কীভাবে করবেন?",
    answer: `
      <p><code>ssl_preread</code> Nginx-এর stream মডিউলের একটি ফিচার যা TLS হ্যান্ডশেকের <strong>ClientHello</strong> বার্তা থেকে <strong>SNI (Server Name Indication)</strong> পড়ে — কিন্তু কানেকশনটি <em>ডিক্রিপ্ট না করেই</em>।</p>
      <p>ফলে একটিমাত্র IP ও পোর্ট (৪৪৩) দিয়ে বিভিন্ন ডোমেইনের ট্রাফিক ভিন্ন ভিন্ন ব্যাকএন্ডে পাঠানো যায়, অথচ Nginx-এ কোনো সার্টিফিকেট রাখতে হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>stream {
    map $ssl_preread_server_name $backend {
        app.example.com    app_servers;
        api.example.com    api_servers;
        legacy.example.com 10.0.5.50:443;
        default            default_servers;
    }

    upstream app_servers { server 10.0.1.10:443; server 10.0.1.11:443; }
    upstream api_servers { server 10.0.2.10:443; }

    server {
        listen 443;
        ssl_preread on;          # ⚠️ SNI পড়ার জন্য আবশ্যক
        proxy_pass $backend;
        proxy_protocol on;       # ক্লায়েন্টের আসল IP ব্যাকএন্ডে পাঠান
    }
}</code></pre>
      </div>
      <h4>কেন এটি কার্যকর</h4>
      <ul>
        <li><strong>End-to-end এনক্রিপশন অটুট থাকে:</strong> Nginx কেবল একটি বুদ্ধিমান TCP ফরওয়ার্ডার — ট্রাফিক ক্লায়েন্ট থেকে ব্যাকএন্ড পর্যন্ত এনক্রিপ্টেড থাকে। zero-trust পরিবেশে এটি গুরুত্বপূর্ণ।</li>
        <li><strong>সার্টিফিকেট ব্যবস্থাপনা ব্যাকএন্ডেই থাকে:</strong> প্রতিটি টিম নিজের সার্টিফিকেট নিজে সামলায়; প্রক্সিতে কিছু বসাতে হয় না।</li>
        <li><strong>খুব দ্রুত:</strong> কোনো এনক্রিপশন/ডিক্রিপশন নেই, তাই CPU খরচ ন্যূনতম।</li>
        <li><strong>মাল্টি-টেন্যান্ট রাউটিং:</strong> শত শত গ্রাহকের কাস্টম ডোমেইন একটি এন্ট্রি পয়েন্ট দিয়ে সঠিক জায়গায় পাঠানো।</li>
      </ul>
      <h4>যা হারাচ্ছেন</h4>
      <ul>
        <li>কোনো L7 ফিচার নেই — path রাউটিং, ক্যাশিং, হেডার পরিবর্তন, WAF কিছুই সম্ভব নয়।</li>
        <li>HTTP-স্তরের লগ নেই (কোন URL চাওয়া হয়েছে তা জানা যাবে না)।</li>
      </ul>
      <h4>একটি সীমাবদ্ধতা: Encrypted Client Hello</h4>
      <p>SNI ঐতিহাসিকভাবে প্লেইনটেক্সটে যায় বলেই <code>ssl_preread</code> কাজ করে। কিন্তু নতুন <strong>ECH (Encrypted Client Hello)</strong> স্ট্যান্ডার্ড SNI-ও এনক্রিপ্ট করে ফেলে (গোপনীয়তার জন্য)। ECH ব্যাপকভাবে চালু হলে এই কৌশল সেসব ক্লায়েন্টের জন্য কাজ করবে না — এটি ভবিষ্যতের একটি বিবেচনা।</p>
      <p><strong>একই ফিচার http ব্লকেও:</strong> L7-এ TLS terminate করলে <code>$ssl_server_name</code> ভ্যারিয়েবল দিয়ে একই ধরনের রাউটিং করা যায়, তবে সেখানে সার্টিফিকেট Nginx-এই থাকতে হবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ক্লায়েন্ট SNI না পাঠালে (পুরনো ক্লায়েন্ট) কী হবে?</li>
        <li>TLS pass-through বনাম termination — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "nginx-35",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Try Files","SPA","History API"],
    question: "Single Page Application (React/Vue/Angular)-এর জন্য try_files $uri $uri/ /index.html; কেন বাধ্যতামূলক?",
    answer: `
      <p>Single Page Application-এ রাউটিং <strong>ক্লায়েন্ট-সাইডে</strong> হয় — React Router বা Vue Router ব্রাউজারের History API দিয়ে URL বদলায়, কিন্তু সার্ভারে কোনো রিকোয়েস্ট যায় না।</p>
      <p>সমস্যাটা হয় যখন ইউজার <code>/dashboard/settings</code> URL-এ সরাসরি যান বা পেজ রিফ্রেশ করেন। তখন ব্রাউজার সার্ভারে সেই পাথ চায়, কিন্তু সার্ভারে <code>/dashboard/settings</code> নামে কোনো ফাইল বা ফোল্ডার নেই — Nginx <strong>404</strong> দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}</code></pre>
      </div>
      <h4><code>try_files</code> কীভাবে কাজ করে</h4>
      <p>এটি বাম থেকে ডানে ক্রমান্বয়ে চেষ্টা করে, প্রথম যেটি পাওয়া যায় সেটি সার্ভ করে:</p>
      <ol>
        <li><code>$uri</code> — এই নামে ফাইল আছে? (<code>/logo.png</code> → সরাসরি ফাইল সার্ভ)</li>
        <li><code>$uri/</code> — এই নামে ডিরেক্টরি আছে?</li>
        <li><code>/index.html</code> — কিছুই না পেলে <strong>fallback</strong>: index.html ফেরত দাও।</li>
      </ol>
      <p>ফলে <code>/dashboard/settings</code> চাইলে <code>index.html</code> লোড হয়, JavaScript চালু হয়, এবং router URL দেখে সঠিক কম্পোনেন্ট রেন্ডার করে। ব্যবহারকারী কিছুই টের পান না।</p>
      <h4>প্রোডাকশনের সম্পূর্ণ কনফিগ</h4>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
    root /var/www/app/dist;

    # হ্যাশযুক্ত অ্যাসেট — চিরকাল ক্যাশ করা নিরাপদ
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;         # এখানে fallback নয় — না থাকলে 404
    }

    # index.html কখনও ক্যাশ করবেন না
    location = /index.html {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}</code></pre>
      </div>
      <h4>দুটি সাধারণ ভুল</h4>
      <ul>
        <li><strong>অ্যাসেটেও fallback দেওয়া:</strong> <code>/assets/</code>-এ <code>try_files $uri /index.html</code> দিলে অনুপস্থিত JS ফাইলের বদলে HTML ফেরত যাবে, এবং ব্রাউজারে রহস্যময় <em>"Unexpected token &lt;"</em> এরর দেখাবে। তাই সেখানে <code>=404</code> দিন।</li>
        <li><strong><code>index.html</code> ক্যাশ করা:</strong> নতুন ডিপ্লয়ের পরেও ইউজার পুরনো HTML পাবেন, যেটি পুরনো (মুছে ফেলা) অ্যাসেট খুঁজবে — সাইট ভেঙে যাবে। HTML সবসময় <code>no-cache</code> রাখুন, আর হ্যাশযুক্ত অ্যাসেট দীর্ঘমেয়াদে ক্যাশ করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>SPA-তে SEO সমস্যা কীভাবে সমাধান করবেন?</li>
        <li><code>try_files</code> আর <code>rewrite</code> — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "nginx-36",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["High Availability","Keepalived","VIP"],
    question: "Keepalived এবং Virtual IP (VIP) ব্যবহার করে Nginx High Availability (Active-Passive) কীভাবে সেটআপ করবেন?",
    answer: `
      <p>একটি Nginx সার্ভার নিজেই SPOF। <strong>Keepalived</strong> ও একটি <strong>Virtual IP (VIP)</strong> ব্যবহার করে দুটি Nginx নোডের মধ্যে স্বয়ংক্রিয় failover তৈরি করা যায়।</p>
      <pre class="mermaid">
flowchart TD
    C["Client → 10.0.1.100 (VIP)"] --> M["Nginx MASTER<br/>10.0.1.10<br/>VIP ধরে আছে"]
    M -.->|"VRRP heartbeat"| B["Nginx BACKUP<br/>10.0.1.11<br/>অপেক্ষমাণ"]
    M -->|"ব্যর্থ হলে"| X["❌"]
    X -.->|"heartbeat বন্ধ →<br/>BACKUP VIP নিয়ে নেয়"| B
      </pre>
      <span class="diagram-caption">VIP সবসময় সুস্থ নোডের সাথে যুক্ত থাকে</span>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># /etc/keepalived/keepalived.conf (MASTER নোড)
vrrp_script check_nginx {
    script "/usr/bin/killall -0 nginx"   # nginx চলছে কি না
    interval 2
    weight -20                            # ব্যর্থ হলে priority কমাও
    fall 2
    rise 2
}

vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 100                          # BACKUP-এ 90 দিন
    advert_int 1

    authentication {
        auth_type PASS
        auth_pass StrongSecret
    }

    virtual_ipaddress {
        10.0.1.100/24                     # ভাসমান VIP
    }

    track_script { check_nginx }
}</code></pre>
      </div>
      <h4>কীভাবে কাজ করে</h4>
      <ol>
        <li>দুটি নোড <strong>VRRP</strong> প্রোটোকলে একে অপরকে heartbeat পাঠায়।</li>
        <li>সর্বোচ্চ <code>priority</code>-র নোড VIP ধরে রাখে এবং ট্রাফিক গ্রহণ করে।</li>
        <li><code>vrrp_script</code> স্থানীয়ভাবে Nginx-এর স্বাস্থ্য পরীক্ষা করে; ব্যর্থ হলে priority কমে যায়।</li>
        <li>MASTER-এর priority BACKUP-এর নিচে নামলে (বা heartbeat বন্ধ হলে) BACKUP VIP নিয়ে নেয় এবং একটি <strong>gratuitous ARP</strong> পাঠায়, যাতে নেটওয়ার্ক সুইচ নতুন MAC ঠিকানা শিখে নেয়।</li>
        <li>Failover সাধারণত <strong>১-৩ সেকেন্ডে</strong> সম্পন্ন হয়।</li>
      </ol>
      <h4>গুরুত্বপূর্ণ বিবেচনা</h4>
      <ul>
        <li><strong><code>check_nginx</code> স্ক্রিপ্ট অপরিহার্য:</strong> এটি ছাড়া Nginx ক্র্যাশ করলেও নোডটি VIP ধরে রাখবে (কারণ মেশিন তো বেঁচেই আছে) — এবং সব ট্রাফিক একটি মৃত সার্ভিসে যাবে।</li>
        <li><strong>Split-brain ঝুঁকি:</strong> দুটি নোডের মধ্যে নেটওয়ার্ক কাটলে দুজনেই নিজেকে MASTER ভেবে VIP নিতে পারে — IP দ্বন্দ্ব তৈরি হবে। আলাদা heartbeat নেটওয়ার্ক বা quorum ব্যবহার করে এটি প্রশমিত করা হয়।</li>
        <li><strong>Active-Passive মানে অর্ধেক সম্পদ অলস</strong> বসে থাকে। বিকল্প হিসেবে দুটি VIP রেখে প্রতিটি নোডকে একটির MASTER করা যায় (active-active), অথবা DNS round-robin ব্যবহার করা যায়।</li>
        <li><strong>ক্লাউডে সাধারণত অপ্রয়োজনীয়:</strong> AWS ELB/ALB, GCP LB বা Kubernetes Service নিজেই HA দেয় — keepalived মূলত অন-প্রিমিস বা VPS পরিবেশের সমাধান।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Failover-এর সময় চলমান কানেকশনগুলোর কী হয়?</li>
        <li>DNS-ভিত্তিক failover-এর তুলনায় VIP কেন দ্রুত?</li>
      </ul>
    `
  },
  {
    id: "nginx-37",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Timeouts","keepalive_timeout","client_header_timeout"],
    question: "Nginx-এ keepalive_timeout এবং client_body_timeout সেটিংস কীভাবে স্লো-রিসোর্স অ্যাটাক প্রতিরোধ করে?",
    answer: `
      <p>Timeout সেটিংস Nginx-এর সবচেয়ে গুরুত্বপূর্ণ প্রতিরক্ষা — এগুলো ছাড়া অল্প সম্পদ দিয়েই একজন আক্রমণকারী আপনার সার্ভার অচল করে দিতে পারে।</p>
      <h4>Slowloris আক্রমণ</h4>
      <p>আক্রমণকারী হাজারো কানেকশন খোলে এবং প্রতিটিতে অত্যন্ত ধীরে ডেটা পাঠায় — যেমন প্রতি ১০ সেকেন্ডে একটি বাইট। কানেকশন কখনও সম্পূর্ণ হয় না, তাই সার্ভার সেগুলো খোলা রেখে অপেক্ষা করতে থাকে। সব worker slot ভরে গেলে বৈধ ইউজাররা আর ঢুকতে পারেন না।</p>
      <p><strong>মজার ব্যাপার:</strong> এই আক্রমণে খুব কম ব্যান্ডউইথ লাগে — একটি সাধারণ ল্যাপটপ থেকেই করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    # ক্লায়েন্ট-সংক্রান্ত timeout
    client_header_timeout 10s;    # হেডার পাঠাতে সর্বোচ্চ সময়
    client_body_timeout   10s;    # বডির দুটি অংশের মধ্যে সর্বোচ্চ বিরতি
    send_timeout          10s;    # ক্লায়েন্ট রেসপন্স গ্রহণে দেরি করলে

    keepalive_timeout     30s;    # idle কানেকশন কতক্ষণ খোলা থাকবে
    keepalive_requests    1000;   # একটি কানেকশনে সর্বোচ্চ রিকোয়েস্ট

    # আকার সীমা — বড় হেডার দিয়ে আক্রমণ ঠেকায়
    client_max_body_size    10m;
    client_body_buffer_size 128k;
    large_client_header_buffers 4 8k;

    # কানেকশন সীমা
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn perip 20;
}</code></pre>
      </div>
      <h4>প্রতিটি timeout-এর ভূমিকা</h4>
      <ul>
        <li><strong><code>client_header_timeout</code>:</strong> Slowloris-এর মূল প্রতিরক্ষা — আক্রমণকারী হেডার ধীরে পাঠায়, এই timeout তাকে কেটে দেয়।</li>
        <li><strong><code>client_body_timeout</code>:</strong> "Slow POST" আক্রমণ (RUDY) ঠেকায়, যেখানে বডি ধীরে পাঠানো হয়। <em>মনে রাখবেন</em> — এটি পুরো বডির সময় নয়, বরং দুটি ধারাবাহিক read অপারেশনের <em>মধ্যবর্তী</em> সর্বোচ্চ বিরতি। তাই ধীর নেটওয়ার্কের বৈধ ইউজার ক্ষতিগ্রস্ত হন না।</li>
        <li><strong><code>send_timeout</code>:</strong> ক্লায়েন্ট রেসপন্স গ্রহণ করা বন্ধ করে দিলে কানেকশন ছেড়ে দেয়।</li>
        <li><strong><code>keepalive_timeout</code>:</strong> খুব বড় রাখলে idle কানেকশন জমে সম্পদ খায়; খুব ছোট রাখলে keep-alive-এর সুবিধা হারায়। ৩০-৭৫ সেকেন্ড সাধারণ।</li>
      </ul>
      <h4>ভারসাম্য রক্ষা</h4>
      <p>Timeout খুব কড়া করলে <strong>বৈধ ইউজার ক্ষতিগ্রস্ত হবেন</strong> — বিশেষ করে ধীর মোবাইল নেটওয়ার্কে বা বড় ফাইল আপলোডে। তাই আপলোড এন্ডপয়েন্টে আলাদা, উদার timeout দিন এবং বাকি সব জায়গায় কড়া রাখুন।</p>
      <p><strong>সম্পূর্ণ প্রতিরক্ষার জন্য:</strong> শুধু timeout যথেষ্ট নয়। <code>limit_conn</code> (প্রতি IP কানেকশন সীমা), <code>limit_req</code> (হার সীমা), fail2ban, এবং বড় আক্রমণের জন্য Cloudflare-এর মতো CDN/WAF — সব মিলিয়ে স্তরে স্তরে সুরক্ষা তৈরি করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Nginx কেন Apache-র চেয়ে Slowloris-এ কম দুর্বল?</li>
        <li>Timeout খুব কড়া হলে কোন বৈধ ব্যবহারকারী ক্ষতিগ্রস্ত হবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-38",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Module","Dynamic Modules","so"],
    question: "Nginx Dynamic Modules (.so) কীভাবে লোড ও মেইনটেইন করা হয়?",
    answer: `
      <p>Nginx-এর মডিউল দুই ধরনের — <strong>static</strong> (কম্পাইলের সময় বাইনারিতে যুক্ত) এবং <strong>dynamic</strong> (<code>.so</code> ফাইল হিসেবে রানটাইমে লোড করা)। Nginx 1.9.11 থেকে ডায়নামিক মডিউল সমর্থিত।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># nginx.conf-এর একদম উপরে (কোনো ব্লকের বাইরে)
load_module modules/ngx_http_geoip2_module.so;
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;

http {
    # এখন মডিউলের ডিরেক্টিভ ব্যবহার করা যাবে
    brotli on;
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># কোন মডিউল কম্পাইল করা আছে দেখুন
nginx -V 2>&1 | tr ' ' '\\n' | grep -- '--with'

# ডায়নামিক মডিউল কম্পাইল করা (মূল Nginx-এর হুবহু একই সংস্করণ লাগবে)
./configure --with-compat --add-dynamic-module=../ngx_brotli
make modules
cp objs/*.so /etc/nginx/modules/</code></pre>
      </div>
      <h4>ডায়নামিক মডিউলের সুবিধা</h4>
      <ul>
        <li><strong>Nginx পুনরায় কম্পাইল না করেই</strong> মডিউল যোগ বা বাদ দেওয়া যায়।</li>
        <li><strong>ছোট বাইনারি ও কম মেমরি</strong> — যেসব মডিউল লাগবে না সেগুলো লোডই হয় না।</li>
        <li><strong>প্যাকেজ ম্যানেজার থেকে ইনস্টল করা যায়</strong> (<code>apt install nginx-module-geoip</code>)।</li>
      </ul>
      <h4>সবচেয়ে গুরুত্বপূর্ণ নিয়ম: সংস্করণের হুবহু মিল</h4>
      <p>ডায়নামিক মডিউল <strong>যে Nginx সংস্করণ ও কনফিগার ফ্ল্যাগ দিয়ে কম্পাইল হয়েছে ঠিক সেটির সাথেই</strong> কাজ করে। Nginx আপগ্রেড করলে সব ডায়নামিক মডিউল <strong>পুনরায় কম্পাইল করতে হবে</strong>, নাহলে Nginx চালুই হবে না:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>nginx: [emerg] module "ngx_http_brotli_filter_module.so" version 1024000
       instead of 1025003 in /etc/nginx/nginx.conf:1</code></pre>
      </div>
      <p><strong>এটি একটি বাস্তব অপারেশনাল ঝুঁকি:</strong> একটি নিয়মিত <code>apt upgrade</code> আপনার Nginx বন্ধ করে দিতে পারে। তাই কাস্টম মডিউল ব্যবহার করলে <strong>Nginx সংস্করণ pin করে রাখুন</strong> এবং আপগ্রেড প্রক্রিয়ায় মডিউল পুনঃকম্পাইলেশন অন্তর্ভুক্ত করুন।</p>
      <p><code>--with-compat</code> ফ্ল্যাগ দিয়ে কম্পাইল করলে বাইনারি সামঞ্জস্য কিছুটা শিথিল হয়, কিন্তু এটি সব ক্ষেত্রে নিশ্চয়তা দেয় না।</p>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>সম্ভব হলে অফিসিয়াল প্যাকেজ ব্যবহার করুন</strong> — nginx.org প্রায় সব জনপ্রিয় মডিউলের প্যাকেজ দেয়, যেগুলো সংস্করণের সাথে মিলিয়ে আপডেট হয়।</li>
        <li><strong>Docker-এ কাস্টম বিল্ড:</strong> একটি Dockerfile-এ Nginx ও সব মডিউল একসাথে কম্পাইল করে রাখলে সংস্করণ সমস্যা দূর হয় এবং পরিবেশ পুনরুৎপাদনযোগ্য থাকে।</li>
        <li><strong>আপগ্রেডের আগে স্টেজিংয়ে পরীক্ষা করুন</strong> — <code>nginx -t</code> চালালেই মডিউল সংস্করণের অমিল ধরা পড়বে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>OpenResty ব্যবহার করলে এই সমস্যা কীভাবে বদলায়?</li>
        <li><code>--with-compat</code> ঠিক কী নিশ্চয়তা দেয়?</li>
      </ul>
    `
  },
  {
    id: "nginx-39",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Headers","add_header","proxy_hide_header"],
    question: "Nginx proxy_hide_header এবং add_header-এর সিকিউরিটি ব্যবহার কী?",
    answer: `
      <p>এই দুটি ডিরেক্টিভ রেসপন্স হেডার নিয়ন্ত্রণ করে — একটি <em>যোগ</em> করে, অন্যটি upstream থেকে আসা হেডার <em>লুকিয়ে ফেলে</em>।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>location /api/ {
    proxy_pass http://backend;

    # ব্যাকএন্ডের তথ্য-ফাঁসকারী হেডার লুকান
    proxy_hide_header X-Powered-By;        # "Express" — স্ট্যাক ফাঁস করে
    proxy_hide_header X-AspNet-Version;
    proxy_hide_header Server;
    proxy_hide_header X-Runtime;           # প্রসেসিং সময় — টাইমিং আক্রমণে সাহায্য করে

    # নিজের নিরাপত্তা হেডার যোগ করুন
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}

# Nginx-এর নিজের সংস্করণ লুকান
server_tokens off;</code></pre>
      </div>
      <h4>কেন তথ্য লুকানো গুরুত্বপূর্ণ</h4>
      <p>আক্রমণকারীরা প্রথমেই <em>reconnaissance</em> করে — কোন প্রযুক্তি ও সংস্করণ চলছে তা জানার চেষ্টা করে। <code>X-Powered-By: Express</code> বা <code>Server: nginx/1.18.0</code> দেখে তারা সরাসরি সেই সংস্করণের পরিচিত দুর্বলতা খুঁজতে পারে।</p>
      <p><strong>এটি "security through obscurity"</strong> — অর্থাৎ এটি কোনো প্রকৃত দুর্বলতা ঠিক করে না। কিন্তু আক্রমণের খরচ বাড়ায় এবং স্বয়ংক্রিয় স্ক্যানারের সহজ লক্ষ্য হওয়া এড়ায়। <strong>আসল প্রতিরক্ষা হলো নিয়মিত প্যাচিং</strong> — হেডার লুকানো তার বিকল্প নয়, পরিপূরক।</p>
      <h4>একটি সীমাবদ্ধতা</h4>
      <p><code>proxy_hide_header</code> কেবল <em>প্রক্সি করা</em> রেসপন্সে কাজ করে। Nginx-এর নিজের <code>Server</code> হেডারের জন্য <code>server_tokens off</code> লাগে — তবে এটি কেবল <em>সংস্করণ নম্বর</em> সরায়, "nginx" শব্দটি থেকেই যায়। সম্পূর্ণ সরাতে <code>headers-more-nginx-module</code> লাগে:</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ngx_headers_more মডিউল প্রয়োজন
more_clear_headers 'Server';
more_set_headers 'Server: WebServer';</code></pre>
      </div>
      <h4>মনে রাখার মতো নিয়ম</h4>
      <ul>
        <li><strong><code>add_header</code>-এ সবসময় <code>always</code> দিন</strong>, নাহলে এরর রেসপন্সে হেডার যাবে না।</li>
        <li><strong><code>add_header</code> উত্তরাধিকারসূত্রে পায় না</strong> — ভেতরের ব্লকে একটি থাকলে বাইরের সব হারিয়ে যায়। স্নিপেট ফাইলে রেখে <code>include</code> করুন।</li>
        <li><strong>উৎসেই ঠিক করা ভালো:</strong> Express-এ <code>app.disable('x-powered-by')</code> দিয়ে হেডারটি আদৌ তৈরি না করাই সবচেয়ে পরিচ্ছন্ন সমাধান — Nginx-এ লুকানোর চেয়ে।</li>
        <li>ব্যাকএন্ড ডিবাগিং হেডার (<code>X-Debug-*</code>) প্রোডাকশনে ফাঁস হচ্ছে কি না নিয়মিত পরীক্ষা করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কোন হেডারগুলো অজান্তে সংবেদনশীল তথ্য ফাঁস করতে পারে?</li>
        <li><code>proxy_pass_header</code> কী কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "nginx-40",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Caching","proxy_cache_use_stale","Resilience"],
    question: "Nginx proxy_cache_use_stale error timeout-এর সুবিধা কী?",
    answer: `
      <p><code>proxy_cache_use_stale</code> Nginx-কে অনুমতি দেয় ব্যাকএন্ড অসুস্থ থাকলে <strong>মেয়াদোত্তীর্ণ (stale) ক্যাশ থেকে রেসপন্স দিতে</strong>। এটি একটি সরল কিন্তু অত্যন্ত কার্যকর resilience কৌশল।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>location / {
    proxy_pass http://backend;
    proxy_cache mycache;
    proxy_cache_valid 200 10m;

    # ব্যাকএন্ড ব্যর্থ হলে পুরনো ক্যাশ দিন
    proxy_cache_use_stale error timeout updating
                          http_500 http_502 http_503 http_504;

    # ব্যাকগ্রাউন্ডে নতুন করে আনুন, ইউজারকে অপেক্ষা করাবেন না
    proxy_cache_background_update on;

    # একই কী-র জন্য একটিই upstream রিকোয়েস্ট
    proxy_cache_lock on;

    add_header X-Cache-Status $upstream_cache_status;
}</code></pre>
      </div>
      <h4>যে সুবিধাগুলো পাওয়া যায়</h4>
      <ul>
        <li><strong>ব্যাকএন্ড ডাউন = সাইট ডাউন নয়:</strong> ৫০২ এররের বদলে ইউজার সামান্য পুরনো কিন্তু <em>কার্যকর</em> কনটেন্ট দেখেন। ব্যবসায়িকভাবে এটি বিশাল পার্থক্য।</li>
        <li><strong><code>updating</code> কীওয়ার্ড:</strong> ক্যাশ যখন রিফ্রেশ হচ্ছে, তখন অন্য রিকোয়েস্টগুলো অপেক্ষা না করে পুরনো কনটেন্ট পায় — latency spike হয় না।</li>
        <li><strong><code>background_update</code>:</strong> মেয়াদোত্তীর্ণ কনটেন্ট সাথে সাথে পরিবেশন করে, নতুনটি ব্যাকগ্রাউন্ডে আনে। কার্যত HTTP-র <code>stale-while-revalidate</code> আচরণ।</li>
        <li><strong>ক্যাসকেডিং ফেইলিওর প্রতিরোধ:</strong> ব্যাকএন্ড ধীর হলে সব রিকোয়েস্ট সেখানে ভিড় করে অবস্থা আরও খারাপ করত; stale ক্যাশ সেই চাপ শুষে নেয়।</li>
      </ul>
      <h4>ঝুঁকি ও নিয়ন্ত্রণ</h4>
      <ul>
        <li><strong>কতটা পুরনো ডেটা গ্রহণযোগ্য?</strong> নিউজ বা প্রোডাক্ট লিস্টিংয়ে কয়েক মিনিটের পুরনো ডেটা ঠিক আছে। কিন্তু অ্যাকাউন্ট ব্যালান্স বা স্টকে এটি বিভ্রান্তিকর বা বিপজ্জনক।</li>
        <li><strong>সীমা বেঁধে দিন:</strong> <code>proxy_cache_valid</code>-এর পাশাপাশি ক্যাশ ফাইলের <code>inactive</code> সময় নিয়ন্ত্রণ করে কতদিনের পুরনো ডেটা রাখা হবে তা ঠিক করুন।</li>
        <li><strong>ব্যক্তিগতকৃত কনটেন্ট কখনও নয়</strong> — অন্যের ডেটা দেখিয়ে ফেলার ঝুঁকি।</li>
        <li><strong>মনিটরিং:</strong> <code>$upstream_cache_status</code>-এ <code>STALE</code> বাড়তে থাকলে সেটি একটি সতর্কসংকেত — ব্যাকএন্ডে সমস্যা চলছে অথচ ইউজার টের পাচ্ছেন না। এটিতে alert দিন, নাহলে সমস্যা লুকিয়ে থাকবে।</li>
      </ul>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> স্ট্যাটিক ও আধা-স্ট্যাটিক কনটেন্টে (হোমপেজ, ক্যাটাগরি পেজ, পাবলিক API) এটি প্রায় সবসময়ই চালু রাখা উচিত। খরচ প্রায় শূন্য, লাভ বিশাল।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ইউজারকে কীভাবে জানাবেন যে তিনি পুরনো ডেটা দেখছেন?</li>
        <li>HTTP-র <code>stale-while-revalidate</code> হেডারের সাথে এর সম্পর্ক কী?</li>
      </ul>
    `
  },
  {
    id: "nginx-41",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Logs","syslog","Remote Logging"],
    question: "Nginx Access Log সরাসরি Remote Syslog সার্ভারে কীভাবে ফরওয়ার্ড করবেন?",
    answer: `
      <p>Nginx সরাসরি <strong>syslog</strong> প্রোটোকলে লগ পাঠাতে পারে — কোনো আলাদা এজেন্ট বা লগ শিপার ছাড়াই। কেন্দ্রীভূত লগিংয়ের সবচেয়ে সরল পথ।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    log_format json_combined escape=json
      '{"time":"$time_iso8601","remote_addr":"$remote_addr",'
      '"request":"$request","status":$status,'
      '"request_time":$request_time,"request_id":"$request_id"}';

    # রিমোট syslog সার্ভারে (UDP — দ্রুত কিন্তু অনির্ভরযোগ্য)
    access_log syslog:server=10.0.1.50:514,facility=local7,tag=nginx,severity=info json_combined;

    # TCP — নির্ভরযোগ্য ডেলিভারি
    access_log syslog:server=10.0.1.50:601,tcp,tag=nginx json_combined;

    error_log  syslog:server=10.0.1.50:514,tag=nginx_error warn;

    # একই সাথে স্থানীয় কপিও রাখা যায় — একাধিক access_log দেওয়া বৈধ
    access_log /var/log/nginx/access.log json_combined buffer=32k flush=5s;
}</code></pre>
      </div>
      <h4>কেন কেন্দ্রীভূত লগিং</h4>
      <ul>
        <li><strong>একাধিক সার্ভারে ছড়ানো লগ একসাথে দেখা</strong> — ১০টি Nginx নোডে SSH করে <code>grep</code> করা অবাস্তব।</li>
        <li><strong>সার্ভার মারা গেলেও লগ থাকে</strong> — পোস্ট-মর্টেম বিশ্লেষণের জন্য অপরিহার্য।</li>
        <li><strong>ডিস্ক ভরে যাওয়া এড়ানো</strong> — বিশেষ করে কন্টেইনারে, যেখানে স্থানীয় স্টোরেজ সীমিত।</li>
        <li><strong>অডিট ও সম্মতি</strong> — লগ পরিবর্তন করা যাবে না এমন জায়গায় রাখা।</li>
      </ul>
      <h4>UDP বনাম TCP</h4>
      <table>
        <tr><th>দিক</th><th>UDP (514)</th><th>TCP (601)</th></tr>
        <tr><td>নির্ভরযোগ্যতা</td><td>লগ হারাতে পারে</td><td>নিশ্চিত ডেলিভারি</td></tr>
        <tr><td>Nginx-এর উপর প্রভাব</td><td>কোনো ব্লকিং নেই</td><td>সার্ভার ধীর হলে <strong>ব্লক করতে পারে</strong></td></tr>
        <tr><td>মেসেজ সাইজ</td><td>সীমিত (সাধারণত 1KB)</td><td>বড় লগ লাইনও যায়</td></tr>
      </table>
      <p><strong>সতর্কতা:</strong> TCP syslog ব্যবহার করলে লগ সার্ভার ধীর বা ডাউন হলে Nginx-এর worker আটকে যেতে পারে — অর্থাৎ <em>লগিং সিস্টেমের সমস্যা আপনার ওয়েবসাইট ডাউন করে দিতে পারে</em>। এটি একটি বাস্তব ঝুঁকি।</p>
      <h4>নিরাপদ বিকল্প: এজেন্ট-ভিত্তিক শিপিং</h4>
      <p>প্রোডাকশনে প্রায়ই বেশি নিরাপদ পদ্ধতি হলো — Nginx স্থানীয় ফাইলে লিখবে (দ্রুত, বাফারড, কখনও ব্লক করে না), আর একটি আলাদা এজেন্ট (Filebeat, Vector, Promtail, Fluent Bit) সেই ফাইল পড়ে কেন্দ্রীয় সিস্টেমে পাঠাবে।</p>
      <p><strong>সুবিধা:</strong> এজেন্ট ডাউন হলেও Nginx অপ্রভাবিত থাকে; এজেন্ট ফিরে এসে যেখান থেকে থেমেছিল সেখান থেকে শুরু করে; বাফারিং ও রিট্রাই এজেন্টই সামলায়।</p>
      <p><strong>কন্টেইনারে:</strong> Nginx-এর অফিসিয়াল ইমেজ লগকে <code>stdout</code>/<code>stderr</code>-এ পাঠায়, এবং কন্টেইনার রানটাইম সেটি সংগ্রহ করে — এটিই সবচেয়ে সহজ ও প্রস্তাবিত পদ্ধতি।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>লগে থাকা ব্যক্তিগত তথ্য (IP, ইউজার আইডি) নিয়ে GDPR কী বলে?</li>
        <li>লগের পরিমাণ খুব বেশি হলে কীভাবে কমাবেন?</li>
      </ul>
    `
  },
  {
    id: "nginx-42",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Performance","sendfile","tcp_nopush"],
    question: "Nginx Performance Tuning: sendfile, tcp_nopush, এবং tcp_nodelay সেটিংস কী কাজ করে?",
    answer: `
      <p>এই তিনটি ডিরেক্টিভ একসাথে কাজ করে স্ট্যাটিক ফাইল সার্ভ করাকে নাটকীয়ভাবে দক্ষ করে তোলে। এগুলো Nginx-এর ডিফল্ট পারফরম্যান্স কনফিগের ভিত্তি।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    sendfile    on;
    tcp_nopush  on;
    tcp_nodelay on;

    # সম্পর্কিত: ফাইল মেটাডেটা ক্যাশ
    open_file_cache max=10000 inactive=60s;
    open_file_cache_valid 60s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
}</code></pre>
      </div>
      <h4>১. <code>sendfile on</code> — Zero-copy</h4>
      <p>সাধারণভাবে ফাইল পাঠাতে হলে: ডিস্ক → কার্নেল বাফার → <strong>অ্যাপ্লিকেশন বাফার</strong> → সকেট বাফার → নেটওয়ার্ক। মাঝের দুটি কপি অপ্রয়োজনীয়।</p>
      <p><code>sendfile()</code> সিস্টেম কল কার্নেলকে বলে "এই ফাইলটি সরাসরি এই সকেটে পাঠাও"। ডেটা কখনও ইউজার-স্পেসে আসে না — CPU ও মেমরি ব্যান্ডউইথ দুটোই বিশাল পরিমাণে বাঁচে। বড় ফাইল সার্ভ করার সময় পার্থক্যটি স্পষ্ট।</p>
      <h4>২. <code>tcp_nopush on</code> — সম্পূর্ণ প্যাকেট পাঠানো</h4>
      <p>এটি <code>TCP_CORK</code> সক্রিয় করে, যা Nginx-কে বলে "প্যাকেট পূর্ণ না হওয়া পর্যন্ত পাঠিও না"। ফলে হেডার ও ফাইলের শুরু আলাদা আলাদা ছোট প্যাকেটে না গিয়ে একসাথে একটি পূর্ণ প্যাকেটে যায় — নেটওয়ার্কে কম প্যাকেট, কম ওভারহেড।</p>
      <p><strong>এটি কেবল <code>sendfile on</code> থাকলেই কাজ করে</strong> — দুটি একসাথে ব্যবহার করতে হয়।</p>
      <h4>৩. <code>tcp_nodelay on</code> — Nagle অ্যালগরিদম বন্ধ</h4>
      <p>Nagle's algorithm ছোট প্যাকেটগুলো জমিয়ে একসাথে পাঠায়, যাতে নেটওয়ার্ক দক্ষতা বাড়ে। কিন্তু এতে <strong>latency বাড়ে</strong> — ছোট রেসপন্স পাঠাতে ২০০ms পর্যন্ত দেরি হতে পারে। WebSocket, API রেসপন্স বা keep-alive কানেকশনে এটি অগ্রহণযোগ্য।</p>
      <h4>বিরোধ নয়, ভাগাভাগি</h4>
      <p>প্রথম দেখায় <code>tcp_nopush</code> ("জমাও") ও <code>tcp_nodelay</code> ("সাথে সাথে পাঠাও") পরস্পরবিরোধী মনে হয়। কিন্তু Nginx চতুরভাবে দুটোই ব্যবহার করে:</p>
      <ul>
        <li>ফাইলের <em>বড় অংশ</em> পাঠানোর সময় <code>tcp_nopush</code> সক্রিয় — পূর্ণ প্যাকেট পাঠানো হয়।</li>
        <li>রেসপন্সের <em>শেষ অংশে</em> Nginx cork সরিয়ে <code>tcp_nodelay</code>-তে চলে যায় — শেষ টুকরোটি সাথে সাথে চলে যায়, কোনো অপেক্ষা ছাড়াই।</li>
      </ul>
      <p>অর্থাৎ থ্রুপুট ও latency — দুটোই অপ্টিমাইজ হয়। এজন্যই তিনটি একসাথে চালু রাখাই স্ট্যান্ডার্ড।</p>
      <p><strong>একটি সতর্কতা:</strong> <code>sendfile</code> কেবল ডিস্ক থেকে সরাসরি ফাইল পাঠানোর সময় কাজ করে। গতিশীল কনটেন্ট (প্রক্সি করা রেসপন্স) বা gzip-এ কম্প্রেস করা কনটেন্টে এটি প্রযোজ্য নয়, কারণ ডেটা প্রক্রিয়া করতে ইউজার-স্পেসে আনতেই হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>open_file_cache</code> কী সমস্যা সমাধান করে?</li>
        <li>Nagle অ্যালগরিদম আর delayed ACK একসাথে কেন সমস্যা তৈরি করে?</li>
      </ul>
    `
  },
  {
    id: "nginx-43",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Auth","auth_basic","htpasswd"],
    question: "Nginx auth_basic এবং .htpasswd ফাইল দিয়ে কীভাবে সিম্পল পাসওয়ার্ড প্রটেকশন দেবেন?",
    answer: `
      <p><strong>HTTP Basic Authentication</strong> হলো সবচেয়ে সহজ পাসওয়ার্ড সুরক্ষা — স্টেজিং সাইট, অভ্যন্তরীণ ড্যাশবোর্ড বা মেট্রিক্স এন্ডপয়েন্ট দ্রুত আড়াল করতে উপযোগী। অ্যাপ্লিকেশনে কোনো কোড লেখা লাগে না।</p>
      <p><code>.htpasswd</code> ফাইল তৈরি করতে হয় <code>htpasswd</code> কমান্ড দিয়ে:</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># প্রথমবার (-c ফাইল তৈরি করে; বিদ্যমান ফাইলে -c দিলে মুছে যাবে!)
sudo htpasswd -c /etc/nginx/.htpasswd admin

# পরবর্তী ইউজার যোগ করতে -c ছাড়া
sudo htpasswd /etc/nginx/.htpasswd developer</code></pre>
      </div>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>HTTPS ছাড়া ব্যবহার করবেন না:</strong> ক্রেডেনশিয়াল কেবল base64 এনকোড হয় — এনক্রিপ্ট হয় না, তাই HTTP-তে সহজেই পড়া যায়।</li>
        <li><strong>কোনো সেশন বা লগআউট নেই:</strong> ব্রাউজার প্রতিটি রিকোয়েস্টে ক্রেডেনশিয়াল পাঠায়; লগআউট করার স্ট্যান্ডার্ড উপায় নেই।</li>
        <li><strong>Rate limiting নেই:</strong> ব্রুট-ফোর্স ঠেকাতে <code>limit_req</code> বা fail2ban যোগ করুন।</li>
        <li>এটি আসল ইউজার অথেন্টিকেশনের বিকল্প নয় — কেবল একটি হালকা প্রতিবন্ধক।</li>
      </ul>
<div class="code-box"><div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div><pre><code>location /admin {
  auth_basic "Restricted Area";
  auth_basic_user_file /etc/nginx/.htpasswd;
}</code></pre></div>
    `
  },
  {
    id: "nginx-44",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Upstream","max_fails","fail_timeout"],
    question: "Nginx Upstream-এ max_fails এবং fail_timeout দিয়ে স্বাস্থ্যহীন ব্যাকএন্ড নোড ড্রপ কীভাবে করবেন?",
    answer: `
      <p>Nginx-এর ওপেন-সোর্স সংস্করণে সক্রিয় health check নেই — কিন্তু <strong>passive health check</strong> আছে, যা <code>max_fails</code> ও <code>fail_timeout</code> দিয়ে কনফিগার করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream backend {
    server 10.0.1.10:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.12:3000 backup;      # অন্য সব ব্যর্থ হলে তবেই

    keepalive 32;
}

server {
    location / {
        proxy_pass http://backend;

        # কোন পরিস্থিতিতে পরের সার্ভারে চেষ্টা করবে
        proxy_next_upstream error timeout http_502 http_503 http_504;
        proxy_next_upstream_tries 2;
        proxy_next_upstream_timeout 10s;

        proxy_connect_timeout 3s;      # কানেকশন স্থাপনে সর্বোচ্চ সময়
        proxy_read_timeout   30s;
    }
}</code></pre>
      </div>
      <h4>কীভাবে কাজ করে</h4>
      <p><code>fail_timeout</code> সময়সীমার মধ্যে যদি একটি সার্ভারে <code>max_fails</code> সংখ্যক ব্যর্থতা ঘটে, Nginx সেই সার্ভারটিকে <strong>পরবর্তী <code>fail_timeout</code> সময়ের জন্য "অনুপলব্ধ" চিহ্নিত করে</strong> এবং সেখানে ট্রাফিক পাঠানো বন্ধ রাখে। সময় শেষে সে আবার একটি রিকোয়েস্ট পাঠিয়ে দেখে সার্ভারটি সুস্থ হয়েছে কি না।</p>
      <p><strong>মনে রাখবেন:</strong> এটি <em>passive</em> — অর্থাৎ প্রকৃত ইউজার রিকোয়েস্ট ব্যর্থ হওয়ার মাধ্যমেই সমস্যা ধরা পড়ে। কিছু ইউজার এরর পাবেনই। Nginx Plus-এ <code>health_check</code> ডিরেক্টিভ দিয়ে সক্রিয় (proactive) চেক করা যায়, যা এই সমস্যা এড়ায়।</p>
      <h4>একটি বিপজ্জনক ফাঁদ: idempotency</h4>
      <p><code>proxy_next_upstream</code>-এ <code>non_idempotent</code> যোগ করলে Nginx ব্যর্থ POST/PUT রিকোয়েস্টও অন্য সার্ভারে পুনরায় পাঠাবে। কিন্তু যদি প্রথম সার্ভার <em>আসলে</em> রিকোয়েস্টটি প্রসেস করে ফেলে থাকে এবং শুধু রেসপন্স পাঠাতে ব্যর্থ হয় — তাহলে <strong>একই অর্ডার দুবার তৈরি হবে</strong>।</p>
      <p>ডিফল্টে Nginx non-idempotent মেথড রিট্রাই করে না — <strong>এটিই সঠিক আচরণ, বদলাবেন না</strong>।</p>
      <h4>Health endpoint যেন সত্যিই স্বাস্থ্য যাচাই করে</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ অর্থহীন — প্রসেস চললেই 200 দেবে, DB ডাউন থাকলেও
app.get('/health', (req, res) => res.send('OK'));

// ✅ প্রকৃত নির্ভরতা যাচাই করে
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    await redis.ping();
    res.status(200).json({ status: 'healthy' });
  } catch (err) {
    res.status(503).json({ status: 'unhealthy', error: err.message });
  }
});</code></pre>
      </div>
      <p><strong>তবে সতর্কতা:</strong> health check-এ সব নির্ভরতা যাচাই করলে একটি ডাটাবেজ সমস্যা <em>সব</em> সার্ভারকে একসাথে "অসুস্থ" করে দিতে পারে — তখন Nginx-এর কাছে কোনো সুস্থ সার্ভারই থাকবে না এবং পুরো সাইট ডাউন হবে। তাই liveness (আমি কি বেঁচে আছি) ও readiness (আমি কি ট্রাফিক নিতে পারব) আলাদা রাখা ভালো।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>সব upstream সার্ভার ব্যর্থ হলে Nginx কী করে?</li>
        <li>Passive ও active health check-এর মধ্যে কোনটি কখন যথেষ্ট?</li>
      </ul>
    `
  },
  {
    id: "nginx-45",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["CORS","Multiple Origins","map directive"],
    question: "Nginx map directive ব্যবহার করে ডায়নামিক Multiple Origin CORS কীভাবে কনফিগার করবেন?",
    answer: `
      <p>একাধিক অনুমোদিত origin থাকলে সমস্যা হলো — <code>Access-Control-Allow-Origin</code> হেডারে একসাথে একাধিক ডোমেইন লেখা যায় না, এবং credentials ব্যবহার করলে <code>*</code>-ও চলে না। সমাধান হলো <code>map</code> ডিরেক্টিভ: রিকোয়েস্টের <code>Origin</code> হেডার মিলিয়ে ডায়নামিকভাবে সঠিক মানটি ফেরত দেওয়া।</p>
      <p><code>map</code> ব্লকটি <code>http</code> কনটেক্সটে থাকে এবং এটি অলস (lazy) — ভ্যারিয়েবলটি ব্যবহার না হলে কোনো খরচ হয় না।</p>
      <h4>নিরাপত্তার দিক</h4>
      <ul>
        <li><strong>কখনও নিঃশর্তভাবে <code>$http_origin</code> প্রতিফলিত করবেন না</strong> — সেটি যেকোনো সাইটকে আপনার API কল করার অনুমতি দিয়ে দেয়, অর্থাৎ CORS সুরক্ষা পুরোপুরি বাতিল।</li>
        <li>রেগুলার এক্সপ্রেশনে <code>.</code> অবশ্যই এস্কেপ করুন (<code>example\\.com</code>), নাহলে <code>exampleXcom</code>-ও মিলে যাবে।</li>
        <li>শেষে <code>$</code> অ্যাংকর দিন, নাহলে <code>example.com.evil.com</code> পাস করে যাবে।</li>
        <li>Credentials পাঠাতে হলে <code>Access-Control-Allow-Credentials: true</code>-ও যোগ করতে হবে।</li>
        <li>Preflight (<code>OPTIONS</code>) রিকোয়েস্টের জন্য <code>Allow-Methods</code>, <code>Allow-Headers</code> এবং <code>Max-Age</code> আলাদাভাবে হ্যান্ডল করুন।</li>
      </ul>
<div class="code-box"><div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div><pre><code>map $http_origin $cors_origin {
  default "";
  "~^https?://(localhost|example\\.com)$" $http_origin;
}
server {
  add_header 'Access-Control-Allow-Origin' $cors_origin;
}</code></pre></div>
    `
  },
  {
    id: "nginx-46",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Security","DoS","limit_conn"],
    question: "Nginx limit_conn_zone এবং limit_conn দিয়ে পার-আইপি সকেট কানেকশন লিমিট কীভাবে করবেন?",
    answer: `
      <p><code>limit_conn</code> প্রতি ক্লায়েন্টের <strong>সমান্তরাল কানেকশন সংখ্যা</strong> সীমিত করে। এটি <code>limit_req</code>-এর পরিপূরক — একটি রিকোয়েস্টের <em>হার</em> নিয়ন্ত্রণ করে, অন্যটি একসাথে কতগুলো খোলা থাকবে তা।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    # $binary_remote_addr ব্যবহার করুন — কম মেমরি (IPv4-এ 4 বাইট)
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn_zone $server_name        zone=perserver:10m;

    limit_conn_status 429;
    limit_conn_log_level warn;

    server {
        location /download/ {
            limit_conn perip 2;          # প্রতি IP-তে ২টি সমান্তরাল ডাউনলোড
            limit_rate 500k;             # প্রতি কানেকশনে ব্যান্ডউইথ সীমা
            limit_rate_after 10m;        # প্রথম 10MB পূর্ণ গতিতে
        }

        location / {
            limit_conn perip 20;
            limit_conn perserver 1000;   # পুরো সার্ভারের সুরক্ষা
        }
    }
}</code></pre>
      </div>
      <h4>কোথায় এটি সবচেয়ে কার্যকর</h4>
      <ul>
        <li><strong>বড় ফাইল ডাউনলোড:</strong> একজন ইউজার ৫০টি সমান্তরাল ডাউনলোড শুরু করে পুরো ব্যান্ডউইথ দখল করতে পারে। <code>limit_conn</code> + <code>limit_rate</code> একসাথে এটি ঠেকায়।</li>
        <li><strong>Slowloris আক্রমণ:</strong> আক্রমণকারী বহু কানেকশন খুলে অত্যন্ত ধীরে ডেটা পাঠায়, কানেকশন আটকে রাখে। কানেকশন সীমা + timeout একসাথে এটি প্রশমিত করে।</li>
        <li><strong>ব্যয়বহুল এন্ডপয়েন্ট:</strong> রিপোর্ট জেনারেশনের মতো দীর্ঘ রিকোয়েস্টে সমান্তরালতা সীমিত রাখা।</li>
      </ul>
      <h4><code>limit_conn</code> বনাম <code>limit_req</code></h4>
      <table>
        <tr><th></th><th><code>limit_conn</code></th><th><code>limit_req</code></th></tr>
        <tr><td>সীমিত করে</td><td>একসাথে খোলা কানেকশন</td><td>প্রতি সেকেন্ডে রিকোয়েস্ট</td></tr>
        <tr><td>উপযুক্ত</td><td>দীর্ঘস্থায়ী কানেকশন, ডাউনলোড</td><td>API abuse, ব্রুট-ফোর্স</td></tr>
        <tr><td>অ্যালগরিদম</td><td>সরল গণনা</td><td>Leaky bucket</td></tr>
      </table>
      <p><strong>বাস্তবে দুটিই একসাথে ব্যবহার করুন</strong> — এরা ভিন্ন ধরনের অপব্যবহার ঠেকায়।</p>
      <h4>যে সীমাবদ্ধতাগুলো মনে রাখবেন</h4>
      <ul>
        <li><strong>NAT-এর সমস্যা:</strong> একটি অফিস বা মোবাইল ক্যারিয়ারের পেছনে শত শত বৈধ ইউজার একই IP শেয়ার করতে পারেন। IP-ভিত্তিক সীমা তাই উদার রাখুন, নাহলে বৈধ ইউজার ব্লক হবেন।</li>
        <li><strong>প্রক্সির পেছনে থাকলে:</strong> <code>$binary_remote_addr</code> হবে প্রক্সির IP। <code>realip</code> মডিউল দিয়ে আসল IP পুনরুদ্ধার করুন, নাহলে সবাই একটি সীমার মধ্যে পড়বে।</li>
        <li><strong>HTTP/2-তে আচরণ ভিন্ন:</strong> একটি কানেকশনে বহু stream চলে, তাই কানেকশন গণনা কম দেখাবে।</li>
        <li>লগইন করা ইউজারের জন্য IP-র বদলে সেশন/API key দিয়ে সীমা দেওয়া অনেক সঠিক।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক Nginx ইনস্ট্যান্স থাকলে এই সীমা কি শেয়ার হয়?</li>
        <li>DDoS প্রতিরোধে Nginx-এর সীমা কতটা যথেষ্ট?</li>
      </ul>
    `
  },
  {
    id: "nginx-47",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Geo","GeoIP2","MaxMind"],
    question: "Nginx-এ geo directive দিয়ে CIDR IP Block অনুযায়ী কাস্টম ভ্যারিয়েবল সেট কীভাবে করবেন?",
    answer: `
      <p><code>geo</code> ডিরেক্টিভ ক্লায়েন্টের IP ঠিকানার ভিত্তিতে একটি ভ্যারিয়েবলের মান নির্ধারণ করে। এটি CIDR ব্লক ব্যবহার করে এবং অত্যন্ত দ্রুত — Nginx এর জন্য একটি বিশেষ radix tree ব্যবহার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>http {
    geo $client_type {
        default          external;
        127.0.0.1/32     internal;
        10.0.0.0/8       internal;
        192.168.0.0/16   internal;
        203.0.113.0/24   partner;
        198.51.100.5/32  blocked;
    }

    # geo-র ফলাফল দিয়ে rate limit ঠিক করা
    map $client_type $limit_key {
        internal  "";                    # খালি = কোনো সীমা নেই
        default   $binary_remote_addr;
    }
    limit_req_zone $limit_key zone=api:10m rate=10r/s;

    server {
        if ($client_type = blocked) { return 403; }

        location /admin/ {
            # শুধু অভ্যন্তরীণ নেটওয়ার্ক
            if ($client_type != internal) { return 403; }
            proxy_pass http://admin_backend;
        }

        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
        }
    }
}</code></pre>
      </div>
      <h4>একটি চমৎকার কৌশল: খালি কী দিয়ে সীমা বাদ দেওয়া</h4>
      <p>উপরের <code>map</code>-এ অভ্যন্তরীণ ক্লায়েন্টের জন্য <code>$limit_key</code> খালি স্ট্রিং হয়। <strong>Nginx-এ <code>limit_req_zone</code>-এর কী খালি হলে সেই রিকোয়েস্টে কোনো সীমা প্রয়োগ হয় না</strong> — এটি অভ্যন্তরীণ সার্ভিস বা মনিটরিং সিস্টেমকে rate limit থেকে ছাড় দেওয়ার সবচেয়ে পরিচ্ছন্ন উপায়।</p>
      <h4><code>geo</code> বনাম <code>allow/deny</code> বনাম <code>geoip2</code></h4>
      <ul>
        <li><strong><code>allow</code>/<code>deny</code>:</strong> সরল অনুমতি নিয়ন্ত্রণ — শুধু হ্যাঁ/না।</li>
        <li><strong><code>geo</code>:</strong> একটি <em>ভ্যারিয়েবল</em> তৈরি করে, যা পরে rate limit, রাউটিং, লগিং বা <code>map</code>-এ ব্যবহার করা যায় — অনেক বেশি নমনীয়।</li>
        <li><strong><code>geoip2</code>:</strong> IP থেকে <em>ভৌগোলিক</em> তথ্য (দেশ, শহর) বের করে; <code>geo</code> কেবল আপনার নিজের সংজ্ঞায়িত CIDR ম্যাপিং ব্যবহার করে।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ সতর্কতা</h4>
      <ul>
        <li><strong>প্রক্সির পেছনে <code>proxy_protocol</code> বা <code>realip</code> লাগবে:</strong> নাহলে <code>geo</code> সবসময় প্রক্সির IP দেখবে এবং সবাই একই শ্রেণিতে পড়ে যাবে। <code>geo $proxy_protocol_addr $var { ... }</code> দিয়েও উৎস নির্দিষ্ট করা যায়।</li>
        <li><strong><code>if</code> ব্যবহারে সাবধান:</strong> Nginx-এ <code>if</code> কুখ্যাতভাবে অপ্রত্যাশিত আচরণ করে (<em>"if is evil"</em>)। সম্ভব হলে <code>map</code> ও আলাদা <code>location</code> দিয়ে কাজ সারুন; <code>if</code> কেবল <code>return</code>-এর সাথে ব্যবহার করা তুলনামূলক নিরাপদ।</li>
        <li>বড় IP তালিকা আলাদা ফাইলে রেখে <code>include</code> করুন — <code>geo $var { include /etc/nginx/blocked-ips.conf; }</code>।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Nginx-এ <code>if</code> কেন সমস্যাযুক্ত?</li>
        <li>হাজারো IP ব্লক করতে হলে কোন পদ্ধতি দক্ষ?</li>
      </ul>
    `
  },
  {
    id: "nginx-48",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["HTTP2","Server Push","http2_push"],
    question: "Nginx HTTP/2 Server Push (http2_push) কনফিগারেশন কীভাবে কাজ করে?",
    answer: `
      <p><strong>HTTP/2 Server Push</strong> ছিল একটি ধারণা যেখানে সার্ভার ক্লায়েন্টের চাওয়ার <em>আগেই</em> রিসোর্স পাঠিয়ে দিত — যেমন HTML পাঠানোর সাথে সাথেই CSS ও JS।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># ⚠️ ঐতিহাসিক — আধুনিক ব্রাউজারে আর কাজ করে না
location = /index.html {
    http2_push /styles/main.css;
    http2_push /scripts/app.js;
}</code></pre>
      </div>
      <h4>কেন এটি বাতিল হলো</h4>
      <p>Chrome ২০২২ সালে (v106) HTTP/2 Server Push সমর্থন <strong>সম্পূর্ণ সরিয়ে দিয়েছে</strong>, এবং Firefox-ও একই পথে গেছে। কারণগুলো শিক্ষণীয়:</p>
      <ul>
        <li><strong>ক্যাশ সম্পর্কে সার্ভার অন্ধ:</strong> ব্রাউজারে ইতিমধ্যেই ফাইলটি ক্যাশে থাকতে পারে, কিন্তু সার্ভার তা জানে না। ফলে একই ফাইল বারবার পাঠিয়ে <strong>ব্যান্ডউইথ নষ্ট</strong> হতো — বিশেষ করে ফিরে আসা ভিজিটরদের ক্ষেত্রে।</li>
        <li><strong>ব্যান্ডউইথ প্রতিযোগিতা:</strong> push করা রিসোর্স HTML-এর সাথেই ব্যান্ডউইথ ভাগ করে নিত, ফলে কখনও কখনও পেজ <em>ধীর</em> হয়ে যেত।</li>
        <li><strong>বাস্তব পরিমাপে লাভ নগণ্য:</strong> Chrome টিমের বিশ্লেষণে দেখা গেছে বেশিরভাগ সাইটে এটি কোনো উন্নতি করেনি, বরং প্রায়ই ক্ষতি করেছে।</li>
        <li><strong>জটিলতা বেশি:</strong> সঠিকভাবে কনফিগার করা কঠিন ছিল।</li>
      </ul>
      <h4>আধুনিক বিকল্প: Resource Hints</h4>
      <p>Push-এর বদলে এখন ব্রাউজারকে <em>ইঙ্গিত</em> দেওয়া হয় — সিদ্ধান্ত ব্রাউজারই নেয়, কারণ সে নিজের ক্যাশ জানে।</p>
      <div class="code-box">
        <div class="code-header"><span>html</span><button class="copy-btn">Copy</button></div>
        <pre><code>&lt;!-- এই পেজে অবশ্যই লাগবে — সর্বোচ্চ অগ্রাধিকারে আনো --&gt;
&lt;link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin&gt;
&lt;link rel="preload" href="/styles/main.css" as="style"&gt;

&lt;!-- অন্য অরিজিনে সংযোগ আগেই স্থাপন করো (DNS + TCP + TLS) --&gt;
&lt;link rel="preconnect" href="https://api.example.com"&gt;

&lt;!-- পরের পেজে সম্ভবত লাগবে --&gt;
&lt;link rel="prefetch" href="/dashboard.js"&gt;</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># HTTP হেডার হিসেবেও দেওয়া যায় — HTML পার্স করার আগেই ব্রাউজার জানবে
location = / {
    add_header Link "&lt;/styles/main.css&gt;; rel=preload; as=style" always;
    add_header Link "&lt;/scripts/app.js&gt;; rel=preload; as=script" always;
}</code></pre>
      </div>
      <p><strong>103 Early Hints:</strong> সবচেয়ে আধুনিক পদ্ধতি — সার্ভার মূল রেসপন্স তৈরি করার <em>আগেই</em> একটি <code>103</code> স্ট্যাটাস পাঠিয়ে ব্রাউজারকে রিসোর্স লোড শুরু করতে বলে। এটি push-এর মূল উদ্দেশ্য পূরণ করে, কিন্তু ক্যাশ-অন্ধত্বের সমস্যা ছাড়াই — কারণ ব্রাউজার সিদ্ধান্ত নেয়।</p>
      <p><strong>ইন্টারভিউয়ের শিক্ষা:</strong> এটি একটি ভালো উদাহরণ যে কীভাবে তাত্ত্বিকভাবে আকর্ষণীয় একটি অপ্টিমাইজেশন বাস্তব পরিমাপে ব্যর্থ হয়ে বাতিল হতে পারে। "সার্ভার ভালো জানে" ধরে নেওয়ার চেয়ে "ক্লায়েন্টকে তথ্য দাও, সিদ্ধান্ত সে নিক" — এই নীতি প্রায়ই ভালো কাজ করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>preload</code> ও <code>prefetch</code>-এর মধ্যে পার্থক্য কী?</li>
        <li>অতিরিক্ত <code>preload</code> ব্যবহার করলে কী ক্ষতি?</li>
      </ul>
    `
  },
  {
    id: "nginx-49",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Config","include directive","conf.d"],
    question: "Nginx include directive দিয়ে কনফিগারেশন মডুলারিটি বজায় রাখা কেন জরুরি?",
    answer: `
      <p>একটি বড় প্রোডাকশন <code>nginx.conf</code> হাজার হাজার লাইনে পৌঁছাতে পারে — যা পড়া, পরিবর্তন করা ও রিভিউ করা দুঃসাধ্য। <code>include</code> ডিরেক্টিভ কনফিগকে যৌক্তিক ফাইলে ভাগ করে এই সমস্যা সমাধান করে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># /etc/nginx/nginx.conf
http {
    include /etc/nginx/mime.types;
    include /etc/nginx/conf.d/*.conf;        # গ্লোবাল সেটিংস
    include /etc/nginx/sites-enabled/*;      # প্রতি-সাইট কনফিগ
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># পুনঃব্যবহারযোগ্য স্নিপেট — /etc/nginx/snippets/proxy-headers.conf
proxy_set_header Host              $host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_http_version 1.1;
proxy_set_header Connection "";

# ব্যবহার — প্রতিটি location-এ ৬ লাইনের বদলে ১ লাইন
location /api/ {
    proxy_pass http://backend;
    include /etc/nginx/snippets/proxy-headers.conf;
}</code></pre>
      </div>
      <h4>কেন এটি শুধু পরিচ্ছন্নতার বিষয় নয় — এটি নিরাপত্তার বিষয়</h4>
      <p>মনে রাখবেন Nginx-এ <strong><code>add_header</code> উত্তরাধিকারসূত্রে পায় না</strong> — কোনো ভেতরের ব্লকে একটি <code>add_header</code> থাকলে বাইরের সব হেডার হারিয়ে যায়। ফলে নিরাপত্তা হেডার প্রতিটি location-এ পুনরাবৃত্তি করতে হয়।</p>
      <p>হাতে কপি-পেস্ট করলে অবধারিতভাবে কোথাও না কোথাও বাদ পড়বে — এবং সেই এন্ডপয়েন্টটি নীরবে অরক্ষিত থেকে যাবে। একটি <code>security-headers.conf</code> ফাইল বানিয়ে সর্বত্র <code>include</code> করলে এই ঝুঁকি দূর হয় এবং একটি জায়গায় বদলালে সব জায়গায় প্রয়োগ হয়।</p>
      <h4>ভালো কাঠামো</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>/etc/nginx/
├── nginx.conf                    # শুধু গ্লোবাল ও include
├── conf.d/
│   ├── gzip.conf
│   ├── ssl-common.conf
│   └── rate-limit-zones.conf     # limit_req_zone সংজ্ঞা
├── snippets/
│   ├── proxy-headers.conf
│   ├── security-headers.conf
│   └── letsencrypt.conf
└── sites-available/
    ├── app.example.com.conf
    └── api.example.com.conf
    # sites-enabled/ এ symlink দিয়ে সক্রিয় করা হয়</code></pre>
      </div>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>সবসময় <code>nginx -t</code> চালান</strong> — include-এর কারণে ভুল কোন ফাইলে তা খুঁজে বের করা কঠিন হতে পারে; <code>-t</code> সঠিক ফাইল ও লাইন নম্বর দেখায়।</li>
        <li><strong><code>sites-available</code> + symlink প্যাটার্ন:</strong> একটি সাইট সাময়িকভাবে বন্ধ করতে শুধু symlink মুছুন — কনফিগ ফাইলটি অক্ষত থাকে।</li>
        <li><strong>কনফিগ Git-এ রাখুন</strong> — কে কী বদলেছে তার ইতিহাস থাকবে এবং রোলব্যাক সহজ হবে।</li>
        <li><code>limit_req_zone</code>-এর মতো <code>http</code>-স্তরের ডিরেক্টিভ <code>conf.d/</code>-তে রাখুন, আর <code>location</code>-স্তরের স্নিপেট <code>snippets/</code>-এ।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>include করা ফাইলে ভুল থাকলে reload-এ কী হয়?</li>
        <li>একই সেটিং দুই জায়গায় থাকলে কোনটি জেতে?</li>
      </ul>
    `
  },
  {
    id: "nginx-50",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Architecture","Master-Worker","Shared Memory"],
    question: "Nginx Architecture: Master Process, Worker Processes এবং Shared Memory (Slab Allocator) কীভাবে কাজ করে?",
    answer: `
      <p>Nginx-এর গতির রহস্য এর প্রসেস মডেলে। Apache-র মতো প্রতি কানেকশনে একটি থ্রেড/প্রসেস তৈরি না করে, Nginx অল্প কিছু worker প্রসেস দিয়ে <strong>event-driven</strong> পদ্ধতিতে হাজারো কানেকশন সামলায়।</p>
      <pre class="mermaid">
flowchart TD
    M["Master Process<br/>(root হিসেবে চলে)"] --> W1["Worker 1<br/>(nginx ইউজার)"]
    M --> W2["Worker 2"]
    M --> W3["Worker 3"]
    M --> C["Cache Manager<br/>Cache Loader"]
    W1 <--> S[("Shared Memory<br/>zone")]
    W2 <--> S
    W3 <--> S
    W1 --> E1["epoll event loop<br/>হাজারো কানেকশন"]
      </pre>
      <span class="diagram-caption">Master শুধু ব্যবস্থাপনা করে; আসল কাজ worker-রা করে</span>
      <h4>Master Process</h4>
      <ul>
        <li><strong>root হিসেবে চলে</strong> — যাতে ৮০/৪৪৩-এর মতো privileged পোর্টে bind করতে পারে এবং সার্টিফিকেট ফাইল পড়তে পারে।</li>
        <li>কনফিগ পড়া ও যাচাই করা, worker তৈরি ও পর্যবেক্ষণ করা।</li>
        <li>সিগন্যাল সামলানো (<code>SIGHUP</code> = reload, <code>SIGUSR2</code> = বাইনারি আপগ্রেড)।</li>
        <li><strong>কোনো ক্লায়েন্ট রিকোয়েস্ট প্রসেস করে না</strong> — এটি নিরাপত্তার জন্য গুরুত্বপূর্ণ।</li>
        <li>worker অপ্রত্যাশিতভাবে মারা গেলে সাথে সাথে নতুন worker চালু করে।</li>
      </ul>
      <h4>Worker Process</h4>
      <ul>
        <li>অ-privileged ইউজারে (<code>nginx</code>/<code>www-data</code>) চলে — কোনো worker আপস হলেও ক্ষতি সীমিত।</li>
        <li>প্রতিটি worker একটি <strong>একক থ্রেডে</strong> epoll/kqueue event loop চালায় এবং অ-ব্লকিংভাবে হাজারো কানেকশন সামলায়।</li>
        <li>একে অপরের থেকে স্বাধীন — নিজেদের মধ্যে কথা বলে না।</li>
        <li>ডিস্ক I/O ব্লক করতে পারে বলে <code>aio</code> বা <code>thread_pool</code> ব্যবহার করে ভারী ফাইল অপারেশন আলাদা থ্রেডে পাঠানো যায়।</li>
      </ul>
      <h4>Shared Memory Zone ও Slab Allocator</h4>
      <p>Worker-রা আলাদা প্রসেস, তাই সাধারণ মেমরি শেয়ার করে না। কিন্তু কিছু জিনিস <em>সব worker-এর মধ্যে</em> শেয়ার করতেই হয় — যেমন rate limit কাউন্টার (নাহলে ৪ worker থাকলে ইউজার ৪ গুণ কোটা পেয়ে যাবে)।</p>
      <p>এজন্য Nginx <strong>shared memory zone</strong> ব্যবহার করে, যা একটি <strong>slab allocator</strong> দিয়ে পরিচালিত হয় — নির্দিষ্ট আকারের ব্লকে মেমরি ভাগ করে fragmentation ছাড়াই দ্রুত বরাদ্দ ও মুক্তি দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># shared zone ব্যবহারকারী ডিরেক্টিভ
limit_req_zone  $binary_remote_addr zone=req:10m rate=10r/s;
limit_conn_zone $binary_remote_addr zone=conn:10m;
proxy_cache_path /var/cache/nginx keys_zone=cache:100m;
ssl_session_cache shared:SSL:50m;

# "zone=req:10m" → 10 MB শেয়ার্ড মেমরি, সব worker একসাথে ব্যবহার করবে
# ভরে গেলে Nginx পুরনো এন্ট্রি বাদ দেয় এবং লগে সতর্কবার্তা দেয়</code></pre>
      </div>
      <p><strong>ব্যবহারিক টিপ:</strong> <code>$binary_remote_addr</code> ব্যবহার করুন <code>$remote_addr</code>-এর বদলে — এটি IPv4-এ ৪ বাইট নেয় (স্ট্রিং ফরম্যাটে ৭-১৫ বাইটের বদলে), তাই একই মেমরিতে অনেক বেশি ক্লায়েন্ট ধরে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি worker ক্র্যাশ করলে তার চলমান কানেকশনগুলোর কী হয়?</li>
        <li>Nginx-এর event model Node.js-এর event loop থেকে কীভাবে আলাদা?</li>
      </ul>
    `
  },
  /* ===== SECTION D — Redis & Caching (46) ===== */
  {
    id: "redis-1",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Cache Strategies","Cache-Aside","Patterns"],
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
    tags: ["Data Structures","ZSET","Leaderboard"],
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
    tags: ["Redis","Bitmap","HyperLogLog","Senior"],
    question: "Redis Bitmap ও HyperLogLog দিয়ে মেমরি-সাশ্রয়ী অ্যানালিটিক্স কীভাবে করবেন?",
    answer: `
      <p>Redis-এ দুটি বিশেষ ডেটা স্ট্রাকচার আছে যা বিশাল স্কেলের অ্যানালিটিক্স সমস্যা <strong>নাটকীয়ভাবে কম মেমরিতে</strong> সমাধান করে — নির্ভুলতার সামান্য (এবং নিয়ন্ত্রিত) ছাড় দিয়ে।</p>
      <h4>Bitmap — প্রতিদিনের Active User ট্র্যাকিং</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>SETBIT active_users:2026-08-10 1042 1   # user_id 1042 আজ অ্যাক্টিভ
SETBIT active_users:2026-08-10 5891 1

BITCOUNT active_users:2026-08-10        # আজকের মোট অ্যাক্টিভ ইউজার সংখ্যা
BITOP AND result active_users:2026-08-09 active_users:2026-08-10   # ২ দিনই অ্যাক্টিভ যারা</code></pre>
      </div>
      <p>প্রতিটি ইউজারের জন্য মাত্র <strong>১ বিট</strong> লাগে — ১ কোটি ইউজারের daily active tracking মাত্র ~১.২৫ MB-তে সম্ভব। <code>BITOP</code> দিয়ে একাধিক দিনের bitmap-এ AND/OR করে "কতজন পরপর ৭ দিন অ্যাক্টিভ ছিল" এর মতো cohort বিশ্লেষণ সহজেই করা যায়।</p>
      <h4>HyperLogLog — Approximate Unique Count</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>PFADD unique_visitors:2026-08-10 "user_1042" "user_5891"
PFCOUNT unique_visitors:2026-08-10       # আনুমানিক ইউনিক ভিজিটর সংখ্যা
PFMERGE weekly_unique week1 week2 week3 week4 week5 week6 week7</code></pre>
      </div>
      <p>একটি <code>SET</code> দিয়ে ইউনিক ভিজিটর গোনা যায় ঠিকই, কিন্তু ১ কোটি ইউনিক ভিজিটরে সেই SET-এর মেমরি ব্যবহার শত শত MB হয়ে যেতে পারে। <strong>HyperLogLog</strong> probabilistic অ্যালগরিদম ব্যবহার করে মাত্র <strong>~১২ KB fixed মেমরিতে</strong> (যত বড় ডেটাসেটই হোক না কেন) ~০.৮১% ত্রুটির মার্জিনে ইউনিক কাউন্ট আনুমানিক করে।</p>
      <h4>সিনিয়র-স্তরের ব্যবহারিক সিদ্ধান্ত</h4>
      <p>নির্ভুল সংখ্যা (billing, financial reporting) দরকার হলে HyperLogLog উপযুক্ত নয় — শুধু <strong>dashboard/analytics</strong>-এর মতো approximate-গ্রহণযোগ্য ক্ষেত্রে ব্যবহার করুন, যেখানে মেমরি সাশ্রয়ের সুবিধা ০.৮% ত্রুটির চেয়ে বেশি গুরুত্বপূর্ণ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>HyperLogLog-এর ০.৮১% error margin কোথা থেকে আসে — এই অ্যালগরিদমের মূল ধারণা কী?</li>
      </ul>
    `
  },
  {
    id: "redis-4",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Redis","RESP3","Client-Side Caching","Senior"],
    question: "Redis Client-Side Caching (RESP3 Tracking) কী এবং এটি কীভাবে নেটওয়ার্ক রাউন্ড-ট্রিপ সম্পূর্ণ এড়িয়ে যায়?",
    answer: `
      <p><strong>Client-Side Caching (Tracking)</strong> Redis 6+ ও RESP3 প্রোটোকলের একটি ফিচার যা ক্লায়েন্ট অ্যাপ্লিকেশনকে নিজের প্রসেসের মেমরিতে ডেটা ক্যাশ করতে দেয় — এবং Redis সার্ভার নিজেই ক্লায়েন্টকে জানিয়ে দেয় কখন সেই ক্যাশ stale (পুরনো) হয়ে গেছে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>প্রচলিত পদ্ধতি: প্রতিটি read-এ Redis-কে নেটওয়ার্ক কল — এমনকি ডেটা না বদলালেও
Client-Side Caching: প্রথম read-এ Redis থেকে আনা হয়, তারপর in-process মেমরিতে ক্যাশ —
  পরের read একদম লোকাল মেমরি থেকে, নেটওয়ার্ক কলই লাগে না (মাইক্রোসেকেন্ড ল্যাটেন্সি)
  Redis key বদলে গেলে সার্ভার push notification পাঠিয়ে ক্লায়েন্টকে invalidate করতে বলে</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ioredis-এর মতো ক্লায়েন্টে (RESP3 সাপোর্টেড)
const redis = new Redis({ enableAutoPipelining: true });
await redis.call('CLIENT', 'TRACKING', 'on');   // এই কানেকশনে tracking চালু

const value = await redis.get('config:feature_flags');   // প্রথমবার — নেটওয়ার্ক কল + লোকাল ক্যাশ
// পরের কল একই প্রসেসের লোকাল ক্যাশ থেকে — যতক্ষণ না key invalidate হয়
redis.on('invalidate', (key) => localCache.delete(key));  // সার্ভার push করলে ক্যাশ বাদ দেওয়া</code></pre>
      </div>
      <h4>কেন গুরুত্বপূর্ণ — Ultra-Low-Latency Read</h4>
      <p>খুব ঘন ঘন read হয় এমন, কিন্তু কালেভদ্রে বদলায় এমন ডেটার জন্য (feature flags, কনফিগারেশন, রেট লিমিট থ্রেশহোল্ড) — এমনকি Redis নেটওয়ার্ক কল-ও (সাধারণত সাব-মিলিসেকেন্ড) অপ্রয়োজনীয় ওভারহেড হয়ে দাঁড়াতে পারে অতি উচ্চ-থ্রুপুট সিস্টেমে। Client-side caching এই read-কে সম্পূর্ণ লোকাল করে দেয় — নেটওয়ার্ক ল্যাটেন্সি শূন্যে নেমে আসে।</p>
      <h4>দুটি Invalidation মোড</h4>
      <table>
        <tr><th>মোড</th><th>আচরণ</th></tr>
        <tr><td><strong>Default</strong></td><td>ক্লায়েন্ট যে key read করেছে, শুধু সেগুলোর জন্য invalidation push পায়</td></tr>
        <tr><td><strong>Broadcasting</strong></td><td>নির্দিষ্ট prefix-এর সব key বদলালে সব সাবস্ক্রাইবড ক্লায়েন্ট notification পায়, read হয়েছে কিনা তা ছাড়াই</td></tr>
      </table>
      <h4>সিনিয়র-স্তরের সতর্কতা</h4>
      <p>এই ফিচার প্রতিটি ব্যবহারের ক্ষেত্রে উপযুক্ত নয় — ঘন ঘন বদলানো ডেটায় (যেমন real-time counter) invalidation notification-এর হার এত বেশি হতে পারে যে সুবিধার চেয়ে জটিলতাই বেশি। শুধু "read-heavy, write-rare" প্যাটার্নে এটি ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Client-side caching ব্যবহার করলে একাধিক অ্যাপ ইনস্ট্যান্সের মধ্যে ক্যাশ সামঞ্জস্য কীভাবে বজায় থাকে?</li>
      </ul>
    `
  },
  {
    id: "redis-5",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Redis Sentinel","High Availability","Failover"],
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
    tags: ["Redis Cluster","Hash Slots","Sharding"],
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
    tags: ["Distributed Lock","Redlock","Concurrency"],
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
    tags: ["Redis","Pub-Sub","Events","Senior"],
    question: "Redis Keyspace Notifications দিয়ে Key Expiry/Change ইভেন্ট কীভাবে সাবস্ক্রাইব করবেন?",
    answer: `
      <p><strong>Keyspace Notifications</strong> Redis-এর একটি ফিচার যা key-তে ঘটা event (SET, DEL, EXPIRE, এমনকি TTL শেষে স্বয়ংক্রিয় expiry) Pub-Sub চ্যানেলে পাবলিশ করে — অ্যাপ্লিকেশনকে পোলিং ছাড়াই রিয়েল-টাইমে সাড়া দিতে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ফিচারটি ডিফল্টে বন্ধ থাকে — চালু করতে হয়
CONFIG SET notify-keyspace-events "Ex"
# E = keyevent notification চালু, x = expired ইভেন্ট

# সাবস্ক্রাইব — একটি key TTL শেষে expire হলে ইভেন্ট আসবে
SUBSCRIBE __keyevent@0__:expired</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const subscriber = redis.duplicate();
await subscriber.subscribe('__keyevent@0__:expired');
subscriber.on('message', (channel, expiredKey) => {
  if (expiredKey.startsWith('session:')) {
    handleSessionExpiry(expiredKey);   // ইউজার সেশন শেষ হলে সাথে সাথে সাড়া দেওয়া
  }
});</code></pre>
      </div>
      <h4>বাস্তব ব্যবহার — Lazy Expiry-নির্ভরতা ছাড়াই ইভেন্ট-চালিত আচরণ</h4>
      <ul>
        <li><strong>Session timeout notification:</strong> ইউজারের সেশন TTL শেষ হলে সাথে সাথে WebSocket দিয়ে "লগআউট হয়ে গেছেন" পাঠানো — পোলিং করে চেক করার দরকার নেই।</li>
        <li><strong>Cache invalidation cascade:</strong> একটি cache key expire হলে dependent cache-ও invalidate করা।</li>
        <li><strong>Temporary lock cleanup:</strong> একটি distributed lock expire হলে waiting queue-তে থাকা অন্য ক্লায়েন্টকে সাথে সাথে জানানো।</li>
      </ul>
      <h4>সীমাবদ্ধতা — সিনিয়র-স্তরের সতর্কতা</h4>
      <ul>
        <li><strong>At-most-once delivery:</strong> Pub-Sub-এর মতোই, সাবস্ক্রাইবার ডাউন থাকলে সেই সময়ের ইভেন্ট চিরতরে হারিয়ে যায় — কোনো persistence/replay নেই।</li>
        <li><strong>Performance ওভারহেড:</strong> সব keyspace event চালু করলে (বিশেষত <code>K</code>/<code>g</code> flag) উচ্চ-থ্রুপুট Redis ইনস্ট্যান্সে উল্লেখযোগ্য CPU খরচ যোগ করতে পারে — শুধু প্রয়োজনীয় event type (যেমন শুধু <code>expired</code>) চালু করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Keyspace notification মিস হয়ে গেলে (সাবস্ক্রাইবার ডাউন ছিল) কীভাবে সেই gap সামলাবেন — reconciliation strategy কী হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "redis-9",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Node.js","ioredis","Cache-Aside"],
    question: "Node.js (ioredis) দিয়ে Cache-Aside Pattern-এর প্র্যাকটিক্যাল কোড লিখুন।",
    answer: `
      <p><strong>Cache-Aside</strong> (বা Lazy Loading) হলো সবচেয়ে বহুল ব্যবহৃত ক্যাশিং প্যাটার্ন। এখানে অ্যাপ্লিকেশন নিজে ক্যাশ ব্যবস্থাপনা করে: আগে Redis-এ খোঁজে, না পেলে ডাটাবেজ থেকে এনে ক্যাশে লিখে রাখে।</p>
      <p>নিচের কোডে তিনটি গুরুত্বপূর্ণ বিষয় লক্ষ করুন — TTL দেওয়া (যাতে বাসি ডেটা চিরকাল না থাকে), ডেটা আপডেট হলে ক্যাশ <em>ইনভ্যালিডেট</em> করা, এবং Redis ব্যর্থ হলেও যেন রিকোয়েস্ট ফেল না করে।</p>
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
    tags: ["Pub Sub","Streams","Messaging"],
    question: "Redis Pub/Sub এবং Redis Streams-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p>দুটিই মেসেজ বিতরণের ব্যবস্থা, কিন্তু <strong>মেসেজ কতক্ষণ টেকে</strong> সেই প্রশ্নে এরা সম্পূর্ণ আলাদা।</p>
      <table>
        <tr><th>দিক</th><th>Pub/Sub</th><th>Streams</th></tr>
        <tr><td>Persistence</td><td><strong>নেই</strong> — পাঠানোর সাথে সাথে হারিয়ে যায়</td><td>থাকে (append-only log)</td></tr>
        <tr><td>গ্রাহক অফলাইন থাকলে</td><td>মেসেজ চিরতরে হারায়</td><td>ফিরে এসে পড়তে পারে</td></tr>
        <tr><td>ডেলিভারি</td><td>At-most-once (fire and forget)</td><td>At-least-once (ACK সহ)</td></tr>
        <tr><td>Consumer group</td><td>নেই — সবাই সব পায়</td><td>আছে (কাজ ভাগ করে নেওয়া)</td></tr>
        <tr><td>ইতিহাস পড়া</td><td>অসম্ভব</td><td>যেকোনো ID থেকে replay</td></tr>
        <tr><td>মেমরি</td><td>নগণ্য</td><td>বাড়তে থাকে (trim করতে হয়)</td></tr>
      </table>
      <p><strong>Pub/Sub-এর সবচেয়ে বিপজ্জনক বৈশিষ্ট্য:</strong> এটি <em>fire-and-forget</em>। মেসেজ পাঠানোর মুহূর্তে যে সাবস্ক্রাইবাররা সংযুক্ত আছে কেবল তারাই পায়। কেউ না থাকলে মেসেজ নীরবে হারিয়ে যায় — কোনো এরর, কোনো সতর্কতা নেই। তাই <strong>গুরুত্বপূর্ণ ডেটার জন্য Pub/Sub কখনও ব্যবহার করবেন না।</strong></p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// --- Streams: নির্ভরযোগ্য কাজ বিতরণ ---
await redis.xadd('orders', '*', 'orderId', '123', 'amount', '500');

// একবার consumer group তৈরি করুন
await redis.xgroup('CREATE', 'orders', 'workers', '0', 'MKSTREAM');

// ওয়ার্কার লুপ
const msgs = await redis.xreadgroup(
  'GROUP', 'workers', 'worker-1',
  'COUNT', 10, 'BLOCK', 5000,
  'STREAMS', 'orders', '>'          // '>' = শুধু নতুন, কেউ পড়েনি এমন
);

for (const [, entries] of msgs ?? []) {
  for (const [id, fields] of entries) {
    await processOrder(fields);
    await redis.xack('orders', 'workers', id);   // ⚠️ ACK না দিলে pending থাকবে
  }
}

// ক্র্যাশ হওয়া ওয়ার্কারের আটকে থাকা মেসেজ উদ্ধার
const stuck = await redis.xautoclaim('orders', 'workers', 'worker-2', 60000, '0');

// মেমরি নিয়ন্ত্রণ — নাহলে স্ট্রিম অসীম বাড়বে
await redis.xtrim('orders', 'MAXLEN', '~', 10000);</code></pre>
      </div>
      <h4>কোনটি কখন</h4>
      <ul>
        <li><strong>Pub/Sub:</strong> ক্ষণস্থায়ী সংকেত — একাধিক সার্ভারের মধ্যে ক্যাশ ইনভ্যালিডেশন বার্তা, WebSocket সার্ভারগুলোর মধ্যে ব্রডকাস্ট, লাইভ টাইপিং ইন্ডিকেটর। হারালেও ক্ষতি নেই এমন ডেটা।</li>
        <li><strong>Streams:</strong> কাজের কিউ, ইভেন্ট সোর্সিং, অডিট লগ — যেখানে প্রতিটি মেসেজ প্রক্রিয়াকৃত হওয়া নিশ্চিত করতে হবে।</li>
      </ul>
      <p><strong>বাস্তব পরামর্শ:</strong> Streams দিয়ে হালকা কাজের কিউ চমৎকার চলে। তবে জটিল রাউটিং, প্রায়োরিটি বা বিশাল থ্রুপুট দরকার হলে RabbitMQ বা Kafka-ই উপযুক্ত — Redis Streams সেগুলোর পূর্ণ বিকল্প নয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Pending Entries List (PEL) কী এবং কেন এটি গুরুত্বপূর্ণ?</li>
        <li>Redis Streams বনাম Kafka — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "redis-11",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Performance","Pipelining","Networking"],
    question: "Redis Pipelining কী এবং এটি কীভাবে পারফরম্যান্স বাড়ায়?",
    answer: `
      <p><strong>Pipelining</strong> মানে একাধিক কমান্ড একসাথে পাঠিয়ে দেওয়া — প্রতিটির উত্তরের জন্য আলাদাভাবে অপেক্ষা না করে। এটি Redis-এর সবচেয়ে সহজ ও সবচেয়ে বড় পারফরম্যান্স জয়গুলোর একটি।</p>
      <h4>কেন এত কার্যকর</h4>
      <p>Redis-এ একটি কমান্ড প্রসেস করতে সময় লাগে মাইক্রোসেকেন্ডে, কিন্তু নেটওয়ার্ক রাউন্ড-ট্রিপে লাগে মিলিসেকেন্ডে। অর্থাৎ <strong>সময়ের ৯৯% কাটে অপেক্ষায়, কাজে নয়</strong>। ১০০০টি কমান্ড আলাদাভাবে পাঠালে ১০০০টি RTT লাগে; pipeline করলে লাগে ১টি।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ধীর: 1000 RTT (0.5ms RTT হলে ~500ms)
for (const id of ids) {
  await redis.get(\`user:\${id}\`);
}

// ✅ দ্রুত: 1 RTT (~2-5ms)
const pipeline = redis.pipeline();
for (const id of ids) pipeline.get(\`user:\${id}\`);
const results = await pipeline.exec();
// results = [[null, 'value1'], [null, 'value2'], ...]  → [err, value] জোড়া

// ⚠️ প্রতিটি কমান্ডের এরর আলাদাভাবে দেখতে হবে
results.forEach(([err, val], i) => {
  if (err) console.error(\`\${ids[i]} ব্যর্থ:\`, err);
});</code></pre>
      </div>
      <h4>Pipeline বনাম Transaction (গুরুত্বপূর্ণ পার্থক্য)</h4>
      <ul>
        <li><strong>Pipeline শুধু নেটওয়ার্ক অপ্টিমাইজেশন</strong> — এটি atomicity দেয় না। pipeline চলাকালে অন্য ক্লায়েন্টের কমান্ড মাঝে ঢুকে যেতে পারে।</li>
        <li>Atomicity দরকার হলে <code>MULTI/EXEC</code> বা Lua script ব্যবহার করুন।</li>
        <li>একটি কমান্ড ব্যর্থ হলে বাকিগুলো তবু চলবে — rollback নেই।</li>
      </ul>
      <h4>সতর্কতা</h4>
      <ul>
        <li><strong>খুব বড় pipeline করবেন না:</strong> ১ লাখ কমান্ড একসাথে পাঠালে সার্ভার ও ক্লায়েন্ট দুই দিকেই বিশাল বাফার জমে মেমরি চাপে পড়ে। <strong>১০০–১০০০</strong> কমান্ডের ব্যাচে ভাগ করুন।</li>
        <li>Redis একক-থ্রেডেড, তাই একটি বিশাল pipeline চলাকালে অন্য ক্লায়েন্টরা অপেক্ষা করে — latency spike হয়।</li>
        <li><strong>Cluster-এ সাবধান:</strong> ভিন্ন কী ভিন্ন শার্ডে থাকতে পারে; বেশিরভাগ ক্লায়েন্ট তখন শার্ড অনুযায়ী ভাগ করে পাঠায়, কিন্তু সব ক্লায়েন্ট সমানভাবে সামলায় না।</li>
      </ul>
      <p><strong>MGET/MSET বনাম pipeline:</strong> একই ধরনের অপারেশন হলে <code>MGET</code> আরও ভালো — একটিই কমান্ড, কম পার্সিং ওভারহেড। ভিন্ন ধরনের কমান্ড মেশাতে হলে pipeline।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Pipeline-এর মাঝপথে কানেকশন ছিঁড়ে গেলে কী হবে?</li>
        <li>Pipeline কি কমান্ডের ক্রম নিশ্চিত করে?</li>
      </ul>
    `
  },
  {
    id: "redis-12",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Transactions","MULTI","EXEC"],
    question: "Redis Transactions (MULTI / EXEC / WATCH) কীভাবে কাজ করে?",
    answer: `
      <p>Redis Transaction <code>MULTI</code> দিয়ে শুরু হয়, তারপর কমান্ডগুলো একটি কিউতে জমা হয় এবং <code>EXEC</code> দিলে <strong>সবগুলো একসাথে, ক্রমানুসারে, বাধাহীনভাবে</strong> চলে।</p>
      <h4>যা Redis transaction দেয়</h4>
      <ul>
        <li><strong>Isolation:</strong> <code>EXEC</code> চলাকালে অন্য কোনো ক্লায়েন্টের কমান্ড মাঝে ঢুকতে পারে না (Redis একক-থ্রেডেড)।</li>
        <li><strong>ক্রম:</strong> কমান্ডগুলো যে ক্রমে কিউ হয়েছে সেই ক্রমেই চলে।</li>
      </ul>
      <h4>যা দেয় না — এটিই সবচেয়ে বড় ভুল ধারণা</h4>
      <p>Redis transaction-এ <strong>rollback নেই</strong>। একটি কমান্ড রানটাইমে ব্যর্থ হলে (যেমন string-এর উপর <code>LPUSH</code>) বাকি কমান্ডগুলো তবু চলতে থাকে এবং ইতিমধ্যে প্রয়োগ হওয়াগুলো ফিরিয়ে নেওয়া হয় না। SQL-এর ACID atomicity এখানে নেই।</p>
      <ul>
        <li><strong>সিনট্যাক্স এরর</strong> (কমান্ড কিউ করার সময় ধরা পড়ে) → পুরো transaction বাতিল হয়।</li>
        <li><strong>রানটাইম এরর</strong> (ভুল টাইপে অপারেশন) → শুধু সেই কমান্ডটি ব্যর্থ, বাকিরা চলে।</li>
      </ul>
      <h4>WATCH — Optimistic Locking</h4>
      <p><code>WATCH</code> একটি কী পর্যবেক্ষণ করে। <code>EXEC</code> করার আগে যদি অন্য কেউ সেই কী বদলে ফেলে, তবে পুরো transaction <strong>বাতিল</strong> হয় এবং <code>nil</code> ফেরত আসে — তখন অ্যাপ্লিকেশন আবার চেষ্টা করবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// check-then-set নিরাপদভাবে করার উপায়
async function transferPoints(from, to, amount) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await redis.watch(\`points:\${from}\`);            // পর্যবেক্ষণ শুরু

    const balance = Number(await redis.get(\`points:\${from}\`));
    if (balance < amount) {
      await redis.unwatch();                          // ⚠️ ছেড়ে দেওয়া জরুরি
      throw new Error('পর্যাপ্ত পয়েন্ট নেই');
    }

    const result = await redis.multi()
      .decrby(\`points:\${from}\`, amount)
      .incrby(\`points:\${to}\`, amount)
      .exec();

    if (result !== null) return true;                 // সফল
    // null = WATCH করা কী বদলে গেছে → আবার চেষ্টা
  }
  throw new Error('অত্যধিক কনটেনশন');
}</code></pre>
      </div>
      <h4>কখন Lua script ভালো</h4>
      <p>বেশিরভাগ বাস্তব ক্ষেত্রে <strong>Lua script (<code>EVAL</code>) MULTI/WATCH-এর চেয়ে সহজ ও দ্রুত</strong> — কারণ পুরো স্ক্রিপ্টটিই অ্যাটমিক, রিট্রাই লুপ লাগে না, এবং শর্তসাপেক্ষ যুক্তি (যদি স্টক থাকে তবে কমাও) সার্ভারেই লেখা যায়। WATCH-এ কনটেনশন বেশি হলে বারবার রিট্রাই করতে হয়, যা অপচয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>WATCH কি Redis Cluster-এ কাজ করে?</li>
        <li>উচ্চ কনটেনশনে optimistic locking-এর সমস্যা কী?</li>
      </ul>
    `
  },
  {
    id: "redis-13",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Data Structures","HyperLogLog","Memory"],
    question: "Redis HyperLogLog দিয়ে কীভাবে কোটি কোটি ইউনিক ভ্যালু ১২KB মেমোরিতে মাপা হয়?",
    answer: `
      <p><strong>HyperLogLog</strong> একটি সম্ভাব্যতা-ভিত্তিক ডেটা স্ট্রাকচার যা কোটি কোটি ইউনিক আইটেম গুনতে পারে মাত্র <strong>~১২ KB</strong> মেমরিতে — প্রায় ০.৮১% ত্রুটির বিনিময়ে।</p>
      <h4>কেন দরকার</h4>
      <p>"আজ কতজন ইউনিক ভিজিটর এসেছে" জানতে Set ব্যবহার করলে প্রতিটি ইউজার আইডি সংরক্ষণ করতে হয়। ১ কোটি ইউজারে সেটি কয়েকশো মেগাবাইট। HyperLogLog-এ সেটি ১২ KB — <strong>হাজার গুণ কম</strong>, এবং আইটেম সংখ্যা যতই বাড়ুক মেমরি স্থির থাকে।</p>
      <h4>ধারণাটি কীভাবে কাজ করে</h4>
      <p>মূল অন্তর্দৃষ্টি: র‍্যান্ডম বাইনারি সংখ্যায় শুরুতে যত বেশি পরপর শূন্য দেখবেন, তত বেশি সংখ্যা আপনি দেখেছেন বলে অনুমান করা যায়। একটি সংখ্যায় ১০টি শূন্য দিয়ে শুরু হওয়ার সম্ভাবনা ১/১০২৪ — তাই এমন একটি দেখলে অনুমান করা যায় প্রায় ১০২৪টি ভিন্ন মান এসেছে।</p>
      <p>HyperLogLog এই অনুমানকে বহু "বাকেটে" ভাগ করে গড় (হারমোনিক গড়) নিয়ে ত্রুটি কমায়। এটি <em>কোনো আইটেম সংরক্ষণ করে না</em> — শুধু প্রতিটি বাকেটে দেখা সর্বোচ্চ শূন্যের সংখ্যা রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// দৈনিক ইউনিক ভিজিটর
await redis.pfadd('visitors:2026-08-10', userId);      // যোগ করা (O(1))
const count = await redis.pfcount('visitors:2026-08-10');

// একাধিক দিনের ইউনিক ভিজিটর — শুধু যোগ নয়, সঠিক union
const weekly = await redis.pfcount(
  'visitors:2026-08-04', 'visitors:2026-08-05', 'visitors:2026-08-06'
);
// ⚠️ এটি আলাদা আলাদা count যোগ করা নয় — একই ইউজার একাধিক দিনে এলে
//    একবারই গোনা হবে। এটিই HLL-এর সবচেয়ে বড় সুবিধা।</code></pre>
      </div>
      <h4>যা করতে পারে না</h4>
      <ul>
        <li>একটি নির্দিষ্ট আইটেম সেটে আছে কি না বলতে পারে না (সদস্যপদ যাচাই নেই)।</li>
        <li>আইটেম তালিকাভুক্ত করতে পারে না — সেগুলো কখনও সংরক্ষিতই হয়নি।</li>
        <li>আইটেম মুছতে পারে না।</li>
        <li>সংখ্যা <strong>আনুমানিক</strong> — তাই বিলিং বা আর্থিক হিসাবে ব্যবহার করবেন না।</li>
      </ul>
      <p><strong>কখন ব্যবহার করবেন:</strong> অ্যানালিটিক্স (ইউনিক ভিজিটর, ইউনিক সার্চ টার্ম, ইউনিক IP) — যেখানে ০.৮% ত্রুটি সম্পূর্ণ গ্রহণযোগ্য কিন্তু নিখুঁত গণনার মেমরি খরচ অগ্রহণযোগ্য।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ছোট সংখ্যায় (যেমন ১০০টি আইটেম) HLL কি নিখুঁত?</li>
        <li>PFMERGE কীভাবে কাজ করে এবং কেন এটি নিখুঁত union দেয়?</li>
      </ul>
    `
  },
  {
    id: "redis-14",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Lua","Scripting","Atomic"],
    question: "Redis-এ Lua Scripting (EVAL) কেন ব্যবহৃত হয়?",
    answer: `
      <p>Redis সার্ভারে সরাসরি Lua স্ক্রিপ্ট চালানোর দুটি বড় কারণ আছে: <strong>atomicity</strong> এবং <strong>নেটওয়ার্ক রাউন্ড-ট্রিপ বাঁচানো</strong>।</p>
      <h4>১. Atomicity — মূল কারণ</h4>
      <p>Redis একটি Lua স্ক্রিপ্টকে <em>একটি একক কমান্ডের</em> মতো চালায়। স্ক্রিপ্ট চলাকালে অন্য কোনো ক্লায়েন্টের কমান্ড মাঝে ঢুকতে পারে না। এতে "পড়ে, যাচাই করে, তারপর লেখা" ধরনের অপারেশন race condition ছাড়াই করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>lua</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- ❌ এটি অ্যাপ্লিকেশনে করলে race condition হবে:
--    GET → যাচাই → DECR (মাঝে অন্য ক্লায়েন্ট ঢুকে যেতে পারে)

-- ✅ Lua-তে পুরোটাই অ্যাটমিক
local stock = tonumber(redis.call('GET', KEYS[1]))
if not stock or stock <= 0 then
  return -1
end
redis.call('DECR', KEYS[1])
return stock - 1</code></pre>
      </div>
      <h4>২. নেটওয়ার্ক বাঁচানো</h4>
      <p>সার্ভার-সাইড যুক্তি মানে ৫টি রাউন্ড-ট্রিপের বদলে ১টি। বিশেষ করে শর্তসাপেক্ষ যুক্তিতে (আগেরটির ফলের উপর পরেরটি নির্ভর করলে) pipeline কাজ করে না — সেখানে Lua-ই একমাত্র উপায়।</p>
      <h4>EVAL বনাম EVALSHA</h4>
      <p>প্রতিবার পুরো স্ক্রিপ্ট পাঠানো অপচয়। <code>SCRIPT LOAD</code> দিয়ে একবার পাঠিয়ে তার SHA1 হ্যাশ পান, তারপর <code>EVALSHA</code> দিয়ে শুধু হ্যাশ পাঠান।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const sha = await redis.script('LOAD', luaScript);   // একবার

async function decrementStock(productId) {
  try {
    return await redis.evalsha(sha, 1, \`stock:\${productId}\`);
  } catch (err) {
    // Redis রিস্টার্ট হলে স্ক্রিপ্ট ক্যাশ মুছে যায়
    if (String(err).includes('NOSCRIPT')) {
      return await redis.eval(luaScript, 1, \`stock:\${productId}\`);
    }
    throw err;
  }
}</code></pre>
      </div>
      <p><strong>NOSCRIPT হ্যান্ডলিং অপরিহার্য</strong> — Redis রিস্টার্ট বা failover-এর পর স্ক্রিপ্ট ক্যাশ খালি থাকে। ভালো ক্লায়েন্ট লাইব্রেরি (ioredis-এর <code>defineCommand</code>) এটি স্বয়ংক্রিয়ভাবে সামলায়।</p>
      <h4>গুরুত্বপূর্ণ নিয়ম</h4>
      <ul>
        <li><strong>স্ক্রিপ্ট ছোট ও দ্রুত রাখুন:</strong> Redis একক-থ্রেডেড, তাই দীর্ঘ স্ক্রিপ্ট <em>পুরো সার্ভার</em> আটকে রাখে। লুপে লক্ষ বার ইটারেশন করবেন না।</li>
        <li><strong>কী অবশ্যই <code>KEYS[]</code>-এ দিন</strong>, স্ক্রিপ্টের ভেতরে হার্ডকোড বা <code>ARGV</code> থেকে বানাবেন না — নাহলে Redis Cluster জানবে না কোন শার্ডে পাঠাতে হবে।</li>
        <li><strong>Deterministic রাখুন:</strong> স্ক্রিপ্টে <code>TIME</code> বা র‍্যান্ডম ব্যবহার করলে রেপ্লিকা ও master-এ ভিন্ন ফল হতে পারে। প্রয়োজনে সময়/র‍্যান্ডম মান <code>ARGV</code> দিয়ে বাইরে থেকে পাঠান।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Lua স্ক্রিপ্ট অসীম লুপে আটকে গেলে কী হবে?</li>
        <li>Redis Functions (7.0+) Lua স্ক্রিপ্টের তুলনায় কী উন্নতি আনে?</li>
      </ul>
    `
  },
  {
    id: "redis-15",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Data Structures","Bitmaps","Analytics"],
    question: "Redis Bitmaps এবং Bitfields কী?",
    answer: `
      <p><strong>Bitmap</strong> আলাদা কোনো টাইপ নয় — এটি একটি সাধারণ Redis String, যার প্রতিটি <em>বিট</em> আলাদাভাবে পড়া ও লেখা যায়। এতে বিশাল বুলিয়ান ডেটা অবিশ্বাস্য কম জায়গায় রাখা যায়।</p>
      <h4>মেমরির হিসাব</h4>
      <p>১ কোটি ইউজারের "আজ লগইন করেছে কি না" রাখতে হলে একটি Set-এ প্রতিটি আইডি রাখলে ~৮০ MB লাগত। Bitmap-এ প্রতিটি ইউজার = ১ বিট, তাই ১ কোটি বিট = <strong>১.২৫ MB</strong> মাত্র।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// দৈনিক সক্রিয় ইউজার ট্র্যাকিং — offset = userId
await redis.setbit('active:2026-08-10', userId, 1);
await redis.getbit('active:2026-08-10', userId);        // 0 বা 1
await redis.bitcount('active:2026-08-10');              // মোট সক্রিয় ইউজার

// শক্তিশালী অংশ: বিটওয়াইজ অপারেশন দিয়ে cohort বিশ্লেষণ
// দুই দিনই সক্রিয় ছিলেন এমন ইউজার (retention)
await redis.bitop('AND', 'retained',
  'active:2026-08-09', 'active:2026-08-10');
const bothDays = await redis.bitcount('retained');

// সপ্তাহে অন্তত একদিন সক্রিয় (WAU)
await redis.bitop('OR', 'active:week', ...sevenDayKeys);</code></pre>
      </div>
      <p>এই <code>BITOP</code> অপারেশনগুলোই আসল শক্তি — কোটি ইউজারের retention হিসাব মিলিসেকেন্ডে হয়ে যায়, কোনো ডাটাবেজ কুয়েরি ছাড়াই।</p>
      <h4>Bitfield — আরও নমনীয়</h4>
      <p><code>BITFIELD</code> একটি string-কে ইচ্ছেমতো প্রস্থের (যেমন ৪ বিট, ৮ বিট) একাধিক সংখ্যার অ্যারে হিসেবে ব্যবহার করতে দেয়। ছোট ছোট কাউন্টার প্যাক করে রাখতে উপযোগী।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># একটি কী-তে একাধিক ছোট কাউন্টার
BITFIELD user:1000:stats \\
  INCRBY u8 0 1 \\      # অফসেট 0 তে 8-বিট কাউন্টার +1 (লগইন)
  INCRBY u8 8 1 \\      # অফসেট 8 তে আরেকটি (পোস্ট)
  GET u8 0

# OVERFLOW আচরণ নিয়ন্ত্রণ — সীমা ছাড়ালে কী হবে
BITFIELD key OVERFLOW SAT INCRBY u8 0 250   # SAT = সর্বোচ্চে আটকে থাকবে</code></pre>
      </div>
      <h4>যে সীমাবদ্ধতাগুলো মনে রাখবেন</h4>
      <ul>
        <li><strong>Offset ঘন হতে হবে:</strong> ইউজার আইডি যদি ১ থেকে ১০০০ হয় কিন্তু আপনি offset ১০ কোটি ব্যবহার করেন, Redis মাঝের পুরো জায়গা বরাদ্দ করবে (~১২ MB)। আইডি বিরল হলে আলাদা ঘন ইনডেক্সে ম্যাপ করে নিন।</li>
        <li>সর্বোচ্চ ৪ বিলিয়ন বিট (৫১২ MB) প্রতি কী।</li>
        <li><code>BITCOUNT</code> O(N) — বিশাল bitmap-এ বারবার চালালে ব্লক করতে পারে; প্রয়োজনে রেঞ্জ দিয়ে চালান।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Bitmap বনাম HyperLogLog — কখন কোনটি?</li>
        <li>ইউজার আইডি UUID হলে bitmap কীভাবে ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-16",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Internals","Memory","Ziplist"],
    question: "Redis ziplist এবং intset মেমোরি অপটিমাইজেশন কীভাবে কাজ করে?",
    answer: `
      <p>Redis প্রতিটি ডেটা টাইপের জন্য <strong>দুটি অভ্যন্তরীণ এনকোডিং</strong> রাখে — ছোট আকারে একটি মেমরি-সাশ্রয়ী কম্প্যাক্ট ফরম্যাট, আর বড় হলে দ্রুত কিন্তু বেশি জায়গা নেওয়া ফরম্যাট। নির্দিষ্ট সীমা পেরোলে Redis স্বয়ংক্রিয়ভাবে রূপান্তর করে।</p>
      <table>
        <tr><th>টাইপ</th><th>ছোট (কম্প্যাক্ট)</th><th>বড়</th></tr>
        <tr><td>Hash</td><td>listpack (আগে ziplist)</td><td>hashtable</td></tr>
        <tr><td>List</td><td>listpack</td><td>quicklist</td></tr>
        <tr><td>Set (শুধু সংখ্যা)</td><td><strong>intset</strong></td><td>hashtable</td></tr>
        <tr><td>Sorted Set</td><td>listpack</td><td>skiplist + hashtable</td></tr>
      </table>
      <h4>listpack / ziplist কীভাবে জায়গা বাঁচায়</h4>
      <p>এটি একটি <em>ধারাবাহিক বাইট অ্যারে</em> — প্রতিটি এন্ট্রি পরপর সাজানো। এতে হ্যাশ টেবিলের বাকেট, পয়েন্টার ও মেটাডেটার বিশাল ওভারহেড বেঁচে যায়। খরচ হলো lookup <strong>O(N)</strong> (শুরু থেকে খুঁজতে হয়), কিন্তু N ছোট (৬৪–১২৮) হওয়ায় বাস্তবে এটি হ্যাশ টেবিলের চেয়ে দ্রুতই হয় — কারণ CPU cache-এ পুরোটা ধরে যায়।</p>
      <h4>intset</h4>
      <p>একটি Set-এ যদি <em>শুধুই পূর্ণসংখ্যা</em> থাকে, Redis সেগুলো একটি সাজানো integer অ্যারেতে রাখে। lookup হয় binary search-এ O(log N), এবং মেমরি খরচ অত্যন্ত কম। একটিমাত্র নন-ইন্টিজার মান ঢোকালেই এটি সাথে সাথে hashtable-এ রূপান্তরিত হয়ে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সীমা নির্ধারণকারী কনফিগ
hash-max-listpack-entries 128     # এর বেশি ফিল্ড হলে hashtable
hash-max-listpack-value  64       # কোনো মান 64 বাইটের বড় হলে hashtable
zset-max-listpack-entries 128
set-max-intset-entries   512

# কোন এনকোডিং ব্যবহার হচ্ছে দেখুন
OBJECT ENCODING myhash    # → "listpack" বা "hashtable"
MEMORY USAGE myhash       # আসল বাইট খরচ</code></pre>
      </div>
      <h4>ব্যবহারিক প্রয়োগ: বহু ছোট কী-কে Hash-এ গোছানো</h4>
      <p>১ কোটি আলাদা string কী রাখলে প্রতিটি কী-র নিজস্ব ওভারহেড (~৫০-১০০ বাইট) যোগ হয়। বদলে সেগুলোকে বাকেটে ভাগ করে Hash-এ রাখলে (প্রতিটি Hash-এ ১০০টি ফিল্ড, তাই listpack এনকোডিং টিকে থাকে) মেমরি খরচ <strong>কয়েক গুণ কমে</strong> যায়। Instagram এই কৌশলে তাদের Redis মেমরি নাটকীয়ভাবে কমিয়েছিল।</p>
      <p><strong>সতর্কতা — রূপান্তর একমুখী:</strong> একবার listpack থেকে hashtable-এ গেলে, পরে এলিমেন্ট মুছে ছোট করলেও Redis আর ফিরে যায় না। তাই সীমার ঠিক আশেপাশে থাকা ডেটা স্ট্রাকচারে সাবধান।</p>
      <p><strong>সীমা বাড়ানোর ট্রেড-অফ:</strong> <code>hash-max-listpack-entries</code> ১০০০ করলে মেমরি আরও বাঁচবে, কিন্তু প্রতিটি lookup O(N) হওয়ায় CPU খরচ বাড়বে এবং একক-থ্রেডেড Redis-এ latency বাড়তে পারে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ziplist থেকে listpack-এ পরিবর্তন কেন আনা হলো?</li>
        <li>কোন কী সবচেয়ে বেশি মেমরি খাচ্ছে কীভাবে বের করবেন (<code>redis-cli --bigkeys</code>)?</li>
      </ul>
    `
  },
  {
    id: "redis-17",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Security","Bloom Filter","Cache"],
    question: "Cache Penetration কী এবং Redis Bloom Filter এটি কীভাবে প্রতিরোধ করে?",
    answer: `
      <p><strong>Cache Penetration</strong> হলো এমন আক্রমণ বা প্যাটার্ন যেখানে <em>যে ডেটা আদৌ নেই</em> সেটির জন্য বারবার রিকোয়েস্ট আসে। ক্যাশে কিছু নেই (কারণ ডেটাই নেই), তাই প্রতিটি রিকোয়েস্ট সরাসরি ডাটাবেজে গিয়ে আঘাত করে — ক্যাশ স্তরটি কার্যত অকেজো হয়ে যায়।</p>
      <h4>তিনটি সম্পর্কিত সমস্যা আলাদা করে চিনুন</h4>
      <table>
        <tr><th>সমস্যা</th><th>কারণ</th><th>সমাধান</th></tr>
        <tr><td><strong>Penetration</strong></td><td>ডেটা কোথাও নেই (অস্তিত্বহীন কী)</td><td>Null ক্যাশিং, Bloom filter</td></tr>
        <tr><td><strong>Breakdown</strong> (hot key)</td><td>একটি জনপ্রিয় কী হঠাৎ expire</td><td>Mutex/lock, logical expiry</td></tr>
        <tr><td><strong>Avalanche</strong></td><td>বহু কী একসাথে expire</td><td>TTL-এ jitter</td></tr>
      </table>
      <h4>সমাধান ১: Null মান ক্যাশ করা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>async function getUser(id) {
  const cached = await redis.get(\`user:\${id}\`);
  if (cached === '__NULL__') return null;      // "নেই" — এটাও ক্যাশড
  if (cached) return JSON.parse(cached);

  const user = await db.users.findById(id);
  if (!user) {
    // ছোট TTL দিন — নাহলে পরে ইউজার তৈরি হলেও দেখা যাবে না
    await redis.setex(\`user:\${id}\`, 60, '__NULL__');
    return null;
  }
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}</code></pre>
      </div>
      <p><strong>সীমাবদ্ধতা:</strong> আক্রমণকারী র‍্যান্ডম আইডি দিয়ে আঘাত করলে ক্যাশ লক্ষ লক্ষ অকেজো null এন্ট্রিতে ভরে যাবে এবং মেমরি শেষ হবে।</p>
      <h4>সমাধান ২: Bloom Filter (বড় স্কেলে আসল সমাধান)</h4>
      <p>Bloom filter একটি সম্ভাব্যতা-ভিত্তিক স্ট্রাকচার যা অল্প মেমরিতে বলতে পারে একটি আইটেম সেটে <em>নিশ্চিতভাবে নেই</em> নাকি <em>সম্ভবত আছে</em>।</p>
      <ul>
        <li><strong>False positive সম্ভব:</strong> "আছে" বলল কিন্তু আসলে নেই → শুধু একটি অপ্রয়োজনীয় DB কুয়েরি হবে। ক্ষতিকর নয়।</li>
        <li><strong>False negative অসম্ভব:</strong> "নেই" বললে নিশ্চিতভাবেই নেই → নিরাপদে সাথে সাথে reject করা যায়। <strong>এই বৈশিষ্ট্যটিই এটিকে কার্যকর করে।</strong></li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// RedisBloom মডিউল ব্যবহার করে
// শুরুতে সব বৈধ আইডি ফিল্টারে ভরে নিন
await redis.call('BF.RESERVE', 'users:exists', '0.001', '10000000');
await redis.call('BF.MADD', 'users:exists', ...allUserIds);

async function getUser(id) {
  const mayExist = await redis.call('BF.EXISTS', 'users:exists', id);
  if (!mayExist) return null;        // ✅ নিশ্চিতভাবে নেই — DB ছোঁয়াই হলো না
  return await getUserFromCacheOrDb(id);
}

// নতুন ইউজার তৈরি হলে ফিল্টারেও যোগ করতে ভুলবেন না
await redis.call('BF.ADD', 'users:exists', newUser.id);</code></pre>
      </div>
      <p><strong>Bloom filter-এর সীমা:</strong> সাধারণ Bloom filter থেকে আইটেম <strong>মোছা যায় না</strong>। ডেটা ডিলিট হয় এমন ক্ষেত্রে Cuckoo filter ব্যবহার করুন, অথবা পর্যায়ক্রমে ফিল্টার পুনর্নির্মাণ করুন।</p>
      <h4>অন্যান্য প্রতিরক্ষা</h4>
      <ul>
        <li><strong>Input validation:</strong> আইডির ফরম্যাট আগেই যাচাই করুন — <code>user:abc!@#</code> DB পর্যন্ত যাওয়ার দরকার নেই।</li>
        <li><strong>Rate limiting:</strong> একই IP থেকে অস্বাভাবিক হারে "not found" এলে থামিয়ে দিন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Bloom filter-এর আকার ও হ্যাশ ফাংশনের সংখ্যা কীভাবে বাছবেন?</li>
        <li>ডেটা ডিলিট হলে Bloom filter কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-18",
    category: "Redis",
    difficulty: "Beginner",
    tags: ["Ops","Slowlog","Monitoring"],
    question: "Redis Slowlog কী এবং স্লো কমান্ড কীভাবে ফিক্স করবেন?",
    answer: `
      <p><strong>Slowlog</strong> Redis-এর অন্তর্নির্মিত একটি লগ যেখানে নির্দিষ্ট সময়ের বেশি নেওয়া কমান্ডগুলো জমা হয়। Redis একক-থ্রেডেড হওয়ায় একটি ধীর কমান্ড <em>সবাইকে</em> আটকে দেয় — তাই latency ডিবাগিংয়ে এটিই প্রথম দেখার জায়গা।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># কনফিগারেশন
CONFIG SET slowlog-log-slower-than 10000   # মাইক্রোসেকেন্ড (10000 = 10ms)
CONFIG SET slowlog-max-len 128             # কতগুলো এন্ট্রি রাখবে

SLOWLOG GET 10      # সাম্প্রতিক ১০টি ধীর কমান্ড
SLOWLOG LEN         # মোট এন্ট্রি
SLOWLOG RESET       # পরিষ্কার

# আউটপুটে থাকে: id, timestamp, সময়কাল (µs), কমান্ড ও আর্গুমেন্ট, ক্লায়েন্ট IP</code></pre>
      </div>
      <h4>গুরুত্বপূর্ণ সূক্ষ্মতা</h4>
      <p>Slowlog-এর সময় শুধু <strong>কমান্ড এক্সিকিউশনের</strong> সময় গোনে — নেটওয়ার্কে যাওয়া-আসা বা I/O-র সময় নয়। তাই ক্লায়েন্টে ৫০ms latency দেখা যাচ্ছে অথচ slowlog খালি — এর মানে সমস্যা Redis-এর ভেতরে নয়, বরং নেটওয়ার্কে, ক্লায়েন্টে বা কানেকশন পুলে।</p>
      <h4>সাধারণ কারণ ও সমাধান</h4>
      <table>
        <tr><th>কারণ</th><th>লক্ষণ</th><th>সমাধান</th></tr>
        <tr><td>O(N) কমান্ড</td><td><code>KEYS</code>, <code>SMEMBERS</code>, <code>HGETALL</code>, <code>LRANGE 0 -1</code></td><td><code>SCAN</code> পরিবারে যান</td></tr>
        <tr><td>বড় মান</td><td>একটি কী-তে মেগাবাইট ডেটা</td><td>ছোট কী-তে ভাগ করুন</td></tr>
        <tr><td>বিশাল কী মোছা</td><td><code>DEL</code> ধীর</td><td><code>UNLINK</code> ব্যবহার করুন</td></tr>
        <tr><td>ভারী Lua স্ক্রিপ্ট</td><td><code>EVAL</code> slowlog-এ</td><td>স্ক্রিপ্ট ছোট করুন</td></tr>
        <tr><td>Fork (BGSAVE/AOF rewrite)</td><td>পর্যায়ক্রমিক spike</td><td>persistence টিউন করুন</td></tr>
        <tr><td>Swap</td><td>সব কিছু ধীর</td><td>swap বন্ধ করুন, RAM বাড়ান</td></tr>
      </table>
      <h4>সম্পূরক টুল</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># অভ্যন্তরীণ latency উৎস বিশ্লেষণ (fork, expire, AOF ইত্যাদি)
redis-cli --latency-history -h HOST
LATENCY DOCTOR       # মানুষের পড়ার মতো বিশ্লেষণ ও পরামর্শ
LATENCY LATEST       # সাম্প্রতিক latency spike-এর ইভেন্ট

# বড় কী খুঁজে বের করা (প্রোডাকশনে নিরাপদ — SCAN ব্যবহার করে)
redis-cli --bigkeys
redis-cli --memkeys

# লাইভ কমান্ড দেখা — ⚠️ পারফরম্যান্স খরচ আছে, অল্প সময়ের জন্য চালান
redis-cli MONITOR</code></pre>
      </div>
      <p><strong>প্রোডাকশন পরামর্শ:</strong> <code>slowlog-log-slower-than</code> ১০ms-এ সেট করে <code>SLOWLOG GET</code> নিয়মিত স্ক্র্যাপ করে মনিটরিং সিস্টেমে পাঠান। এন্ট্রি সংখ্যা বাড়তে শুরু করলেই alert দিন — বেশিরভাগ Redis সমস্যা এখানে আগেভাগে ধরা পড়ে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Slowlog খালি কিন্তু অ্যাপে Redis latency বেশি — কোথায় খুঁজবেন?</li>
        <li><code>MONITOR</code> প্রোডাকশনে কেন সতর্কতার সাথে ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-19",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Eviction","Memory","LRU"],
    question: "Redis Memory Eviction Policies (maxmemory-policy: volatile-lru, allkeys-lru, LFU, Random, noeviction) কীভাবে কাজ করে?",
    answer: `
      <p>Redis-এ <code>maxmemory</code> সীমা ছুঁয়ে গেলে <code>maxmemory-policy</code> ঠিক করে দেয় নতুন ডেটার জায়গা করতে কোন কী মুছে ফেলা হবে।</p>
      <h4>আটটি পলিসি</h4>
      <table>
        <tr><th>পলিসি</th><th>কোন কী থেকে বাছে</th><th>কৌশল</th></tr>
        <tr><td><code>noeviction</code></td><td>কিছুই মোছে না</td><td>write-এ এরর দেয় (ডিফল্ট)</td></tr>
        <tr><td><code>allkeys-lru</code></td><td>সব কী</td><td>সবচেয়ে দীর্ঘ সময় অব্যবহৃত</td></tr>
        <tr><td><code>allkeys-lfu</code></td><td>সব কী</td><td>সবচেয়ে কম ব্যবহৃত</td></tr>
        <tr><td><code>allkeys-random</code></td><td>সব কী</td><td>এলোমেলো</td></tr>
        <tr><td><code>volatile-lru</code></td><td>শুধু TTL-যুক্ত কী</td><td>দীর্ঘ অব্যবহৃত</td></tr>
        <tr><td><code>volatile-lfu</code></td><td>শুধু TTL-যুক্ত</td><td>কম ব্যবহৃত</td></tr>
        <tr><td><code>volatile-random</code></td><td>শুধু TTL-যুক্ত</td><td>এলোমেলো</td></tr>
        <tr><td><code>volatile-ttl</code></td><td>শুধু TTL-যুক্ত</td><td>যার মেয়াদ সবচেয়ে কাছে</td></tr>
      </table>
      <h4>LRU বনাম LFU — কোনটি বাছবেন</h4>
      <ul>
        <li><strong>LRU (Least Recently Used):</strong> সাম্প্রতিকতা দেখে। সমস্যা — একটি কী একবার ব্যবহার করলেই সেটি "সাম্প্রতিক" হয়ে যায়। ফলে একটি বড় ব্যাচ জব বা ক্রলার একবার করে অনেক কী পড়লে সত্যিকারের জনপ্রিয় কী-গুলো বেরিয়ে যায় (cache pollution)।</li>
        <li><strong>LFU (Least Frequently Used, Redis 4.0+):</strong> কতবার ব্যবহৃত হয়েছে তা দেখে, এবং কাউন্টার সময়ের সাথে ক্ষয় (decay) হয়। <strong>ক্যাশিংয়ের জন্য সাধারণত এটিই ভালো</strong>, কারণ সত্যিকারের হট ডেটা টিকে থাকে।</li>
      </ul>
      <p><strong>গুরুত্বপূর্ণ:</strong> Redis-এর LRU/LFU <strong>নিখুঁত নয়, আনুমানিক</strong>। নিখুঁত LRU-র জন্য সব কী-র একটি লিংকড লিস্ট রাখতে হতো, যা মেমরি ও CPU খেত। বদলে Redis কয়েকটি কী র‍্যান্ডমভাবে নমুনা নিয়ে (<code>maxmemory-samples</code>, ডিফল্ট ৫) তাদের মধ্যে সবচেয়ে খারাপটি বাদ দেয়। নমুনা বাড়ালে নির্ভুলতা বাড়ে, CPU-ও বাড়ে।</p>
      <h4>কোন পলিসি কখন</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># বিশুদ্ধ ক্যাশ হিসেবে ব্যবহার করলে — জায়গা করতে যেকোনো কী মুছতে পারে
maxmemory 4gb
maxmemory-policy allkeys-lfu

# ক্যাশ + স্থায়ী ডেটা একসাথে থাকলে (সেশন, লক, কিউ)
# শুধু TTL-যুক্ত কী মুছবে, স্থায়ী ডেটা নিরাপদ থাকবে
maxmemory-policy volatile-lru

# ডাটাবেজ হিসেবে ব্যবহার করলে — কিছুই হারানো চলবে না
maxmemory-policy noeviction     # মেমরি ভরলে write ব্যর্থ হবে</code></pre>
      </div>
      <h4>যে ফাঁদে অনেকে পড়েন</h4>
      <p><code>volatile-*</code> পলিসি বাছলেন কিন্তু <strong>কোনো কী-তে TTL দিলেন না</strong> — তখন Redis-এর মোছার মতো কিছুই থাকে না, আর এটি কার্যত <code>noeviction</code>-এর মতো আচরণ করে অর্থাৎ write ব্যর্থ হতে শুরু করে। একইভাবে একই ইনস্ট্যান্সে ক্যাশ ও লক/সেশন মেশানো বিপজ্জনক — <code>allkeys-*</code> দিলে আপনার distributed lock-ও মুছে যেতে পারে।</p>
      <p><strong>সেরা অভ্যাস:</strong> ক্যাশ ও স্থায়ী ডেটার জন্য <strong>আলাদা Redis ইনস্ট্যান্স</strong> ব্যবহার করুন — তাহলে প্রতিটির জন্য উপযুক্ত পলিসি দেওয়া যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>maxmemory</code> কত রাখবেন — সার্ভারের RAM-এর কত শতাংশ?</li>
        <li>Eviction হচ্ছে কি না কীভাবে মনিটর করবেন (<code>evicted_keys</code>)?</li>
      </ul>
    `
  },
  {
    id: "redis-20",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Persistence","RDB","AOF"],
    question: "Redis Persistence Options: RDB (Redis Database Snapshot) vs AOF (Append Only File)-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p>Redis মেমরি-ভিত্তিক হলেও রিস্টার্টে ডেটা টিকিয়ে রাখতে দুটি persistence পদ্ধতি দেয় — এবং এদের ট্রেড-অফ বোঝা জরুরি।</p>
      <table>
        <tr><th>দিক</th><th>RDB (Snapshot)</th><th>AOF (Append Only File)</th></tr>
        <tr><td>কী সংরক্ষণ করে</td><td>নির্দিষ্ট মুহূর্তের সম্পূর্ণ ছবি</td><td>প্রতিটি write কমান্ডের লগ</td></tr>
        <tr><td>ফাইল সাইজ</td><td>ছোট (কম্প্যাক্ট বাইনারি)</td><td>বড়</td></tr>
        <tr><td>রিস্টার্টে লোডিং</td><td><strong>দ্রুত</strong></td><td>ধীর (কমান্ড রিপ্লে)</td></tr>
        <tr><td>সম্ভাব্য ডেটা ক্ষতি</td><td>মিনিট (শেষ snapshot পর্যন্ত)</td><td><strong>১ সেকেন্ড</strong> (ডিফল্টে)</td></tr>
        <tr><td>পারফরম্যান্স প্রভাব</td><td>fork-এর সময় স্পাইক</td><td>ধারাবাহিক ছোট খরচ</td></tr>
        <tr><td>ব্যাকআপের জন্য</td><td><strong>আদর্শ</strong> (একটি ফাইল কপি)</td><td>অসুবিধাজনক</td></tr>
      </table>
      <h4>RDB কীভাবে কাজ করে</h4>
      <p><code>BGSAVE</code> একটি চাইল্ড প্রসেস <strong>fork</strong> করে; চাইল্ড ডিস্কে স্ন্যাপশট লেখে আর প্যারেন্ট রিকোয়েস্ট সার্ভ করতে থাকে। Linux-এর <strong>copy-on-write</strong>-এর কারণে fork-এর সময় পুরো মেমরি কপি হয় না — কেবল যেসব পেজ পরে বদলায় সেগুলোই কপি হয়।</p>
      <p><strong>বিপদ:</strong> fork-এর মুহূর্তে যদি অনেক write আসে, বহু পেজ কপি হয় এবং মেমরি ব্যবহার প্রায় <strong>দ্বিগুণ</strong> পর্যন্ত যেতে পারে। তাই ৩০ GB Redis চালালে সার্ভারে যথেষ্ট ফাঁকা RAM রাখতে হবে, নাহলে OOM-এ প্রসেস মারা যাবে।</p>
      <h4>AOF ও fsync পলিসি</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>appendonly yes

# appendfsync always    → প্রতিটি write ডিস্কে; সবচেয়ে নিরাপদ, কিন্তু খুব ধীর
appendfsync everysec  # ✅ প্রস্তাবিত: সর্বোচ্চ ১ সেকেন্ডের ডেটা ক্ষতি
# appendfsync no        → OS যখন খুশি; দ্রুত, কিন্তু ঝুঁকিপূর্ণ

# AOF ফাইল দ্বিগুণ হলে স্বয়ংক্রিয়ভাবে rewrite (ছোট করা)
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb</code></pre>
      </div>
      <p><strong>AOF Rewrite:</strong> AOF শুধু বাড়তেই থাকে — একই কী ১০০০ বার <code>INCR</code> করলে ১০০০টি লাইন জমে। <code>BGREWRITEAOF</code> বর্তমান ডেটাসেট থেকে সবচেয়ে সংক্ষিপ্ত কমান্ড-সেট তৈরি করে ফাইলটি ছোট করে (১০০০টি INCR → একটি SET)।</p>
      <h4>প্রোডাকশনে সঠিক উত্তর: দুটিই চালু রাখুন</h4>
      <p>এরা প্রতিদ্বন্দ্বী নয়, পরিপূরক:</p>
      <ul>
        <li><strong>AOF</strong> দেয় সর্বনিম্ন ডেটা ক্ষতি (RPO ≈ ১ সেকেন্ড)।</li>
        <li><strong>RDB</strong> দেয় দ্রুত পুনরুদ্ধার ও সহজ ব্যাকআপ (ফাইলটি অন্যত্র কপি করে রাখা যায়)।</li>
        <li>দুটি চালু থাকলে Redis রিস্টার্টে <strong>AOF থেকে</strong> ডেটা লোড করে, কারণ সেটিই বেশি সম্পূর্ণ।</li>
        <li>Redis 7+ এ <strong>Multi-Part AOF</strong> এবং RDB-AOF hybrid ফরম্যাট দুটির সুবিধা একসাথে দেয় — base হিসেবে RDB, তার উপর incremental AOF।</li>
      </ul>
      <p><strong>ব্যতিক্রম:</strong> Redis যদি বিশুদ্ধ ক্যাশ হিসেবে ব্যবহৃত হয় (হারালে DB থেকে আবার তৈরি হবে), তখন persistence সম্পূর্ণ বন্ধ রাখাই যুক্তিযুক্ত — পারফরম্যান্স ভালো হবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>AOF ফাইল করাপ্ট হলে কী করবেন (<code>redis-check-aof</code>)?</li>
        <li>Persistence থাকলেও কেন আলাদা ব্যাকআপ দরকার?</li>
      </ul>
    `
  },
  {
    id: "redis-21",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Sentinel","Cluster","High Availability"],
    question: "Redis Sentinel vs Redis Cluster-এর মধ্যে স্থাপত্যগত পার্থক্য কী?",
    answer: `
      <p>দুটিই high availability দেয়, কিন্তু সম্পূর্ণ ভিন্ন সমস্যার সমাধান করে: <strong>Sentinel দেয় failover, Cluster দেয় sharding</strong>।</p>
      <table>
        <tr><th>দিক</th><th>Sentinel</th><th>Cluster</th></tr>
        <tr><td>মূল উদ্দেশ্য</td><td>স্বয়ংক্রিয় failover (HA)</td><td>ডেটা ভাগ করা (scaling) + HA</td></tr>
        <tr><td>ডেটা বণ্টন</td><td>প্রতিটি নোডে <strong>পুরো</strong> ডেটাসেট</td><td>১৬৩৮৪টি hash slot-এ ভাগ</td></tr>
        <tr><td>Write স্কেলিং</td><td>না — একটিই master</td><td><strong>হ্যাঁ</strong> — একাধিক master</td></tr>
        <tr><td>মেমরি সীমা</td><td>একটি সার্ভারের RAM</td><td>সব নোডের যোগফল</td></tr>
        <tr><td>Multi-key অপারেশন</td><td>সম্পূর্ণ সমর্থিত</td><td>শুধু একই slot-এ হলে</td></tr>
        <tr><td>ক্লায়েন্ট সাপোর্ট</td><td>সাধারণ</td><td>cluster-সচেতন ক্লায়েন্ট লাগে</td></tr>
        <tr><td>জটিলতা</td><td>কম</td><td>বেশি</td></tr>
      </table>
      <h4>Sentinel কীভাবে কাজ করে</h4>
      <p>Sentinel প্রক্রিয়াগুলো master ও replica-দের পর্যবেক্ষণ করে। master-কে অচল মনে হলে তারা নিজেদের মধ্যে <strong>কোরাম</strong> গঠন করে সম্মত হয়, একটি replica-কে নতুন master হিসেবে promote করে, এবং ক্লায়েন্টদের নতুন ঠিকানা জানায়।</p>
      <p><strong>গুরুত্বপূর্ণ:</strong> Sentinel নিজেও অন্তত <strong>৩টি</strong> (বিজোড় সংখ্যা) চালাতে হবে, আলাদা আলাদা মেশিনে — নাহলে সেটিই SPOF হয়ে যাবে এবং split-brain ঠেকানো যাবে না।</p>
      <h4>Cluster ও Hash Slot</h4>
      <pre class="mermaid">
flowchart TD
    C["Client (cluster-aware)"] -->|"CRC16(key) mod 16384"| S{"slot নম্বর"}
    S -->|"0–5460"| M1["Master A + Replica A"]
    S -->|"5461–10922"| M2["Master B + Replica B"]
    S -->|"10923–16383"| M3["Master C + Replica C"]
      </pre>
      <span class="diagram-caption">প্রতিটি কী একটি slot-এ পড়ে; slot-গুলো master-দের মধ্যে ভাগ করা</span>
      <p>Cluster বিশুদ্ধ consistent hashing ব্যবহার করে না — বদলে <strong>১৬,৩৮৪টি নির্দিষ্ট slot</strong> ব্যবহার করে। এর সুবিধা: slot পুনর্বণ্টন করা সহজ ও পূর্বানুমেয়, এবং প্রতিটি নোড ছোট একটি slot-ম্যাপ রাখলেই চলে।</p>
      <h4>Cluster-এর বড় সীমাবদ্ধতা: multi-key অপারেশন</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ❌ ব্যর্থ হবে: কী দুটি ভিন্ন slot-এ থাকতে পারে
MGET user:1:name user:2:name
# → CROSSSLOT Keys in request don't hash to the same slot

# ✅ Hash tag: {} এর ভেতরের অংশ দিয়ে slot হিসাব হয়
# ফলে এই দুটি কী নিশ্চিতভাবে একই slot-এ পড়বে
MGET {user:1}:name {user:1}:email</code></pre>
      </div>
      <p>একই ইউজারের সব কী একসাথে রাখতে হলে <code>{userId}</code> hash tag ব্যবহার করুন। তবে সাবধান — সব কী একই tag দিলে সব ডেটা একটি slot-এ জমে গিয়ে <strong>hot shard</strong> তৈরি হবে।</p>
      <h4>কোনটি বাছবেন</h4>
      <ul>
        <li><strong>Sentinel:</strong> ডেটা একটি সার্ভারের RAM-এ ধরে যায় এবং শুধু HA দরকার। <em>বেশিরভাগ অ্যাপ্লিকেশনের জন্য এটিই যথেষ্ট</em> — অকারণে Cluster নেবেন না।</li>
        <li><strong>Cluster:</strong> ডেটা একটি মেশিনে ধরছে না, অথবা write throughput একটি master-এর সীমা ছাড়িয়ে গেছে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Cluster-এ resharding চলাকালে কী হয় (MOVED ও ASK রিডাইরেক্ট)?</li>
        <li>Failover-এর সময় কিছু write হারাতে পারে কেন?</li>
      </ul>
    `
  },
  {
    id: "redis-23",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Distributed Locks","Redlock","Concurrency"],
    question: "Redis দিয়ে Distributed Locking কীভাবে বাস্তবায়ন করা হয়? Redlock Algorithm কী?",
    answer: `
      <p>Distributed lock দরকার হয় যখন একাধিক সার্ভার একই রিসোর্সে কাজ করতে পারে এবং একসাথে একজনই করা উচিত (যেমন একটি ক্রন জব যেন একবারই চলে, বা একটি অর্ডার যেন একবারই প্রসেস হয়)।</p>
      <h4>সঠিক একক-ইনস্ট্যান্স লক</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const token = crypto.randomUUID();          // ⚠️ প্রতিটি লক-হোল্ডারের ইউনিক টোকেন

// অ্যাটমিকভাবে: কী না থাকলে সেট করো + TTL দাও
const ok = await redis.set(lockKey, token, 'NX', 'PX', 30000);
if (!ok) throw new Error('লক পাওয়া যায়নি');

try {
  await doWork();
} finally {
  // ⚠️ শুধু DEL করা ভুল — অন্যের লক মুছে ফেলতে পারেন
  // অ্যাটমিকভাবে যাচাই করে মুছুন
  await redis.eval(
    \`if redis.call('GET', KEYS[1]) == ARGV[1] then
        return redis.call('DEL', KEYS[1])
      else return 0 end\`,
    1, lockKey, token
  );
}</code></pre>
      </div>
      <h4>দুটি অপরিহার্য বিবরণ</h4>
      <ul>
        <li><strong>TTL বাধ্যতামূলক:</strong> লক ধরে রাখা প্রসেস ক্র্যাশ করলে TTL ছাড়া লকটি চিরকাল আটকে থাকবে (deadlock)।</li>
        <li><strong>ইউনিক টোকেন দিয়ে মুক্ত করা:</strong> ধরুন প্রসেস A লক নিল, কাজ ৩৫ সেকেন্ড নিল, কিন্তু TTL ৩০ সেকেন্ড। এর মধ্যে লক expire হয়ে B নিয়ে নিল। A কাজ শেষে সরল <code>DEL</code> করলে <strong>B-র লক মুছে ফেলবে</strong>। টোকেন মিলিয়ে মুছলে এটি হয় না।</li>
      </ul>
      <h4>Redlock এবং তার বিতর্ক</h4>
      <p>একটি Redis ইনস্ট্যান্স ব্যবহার করলে সেটিই SPOF, আর master-replica-তে failover-এর সময় লক হারিয়ে যেতে পারে (রেপ্লিকেশন অ্যাসিঙ্ক্রোনাস)। <strong>Redlock</strong> এর সমাধান হিসেবে N (সাধারণত ৫) টি <em>স্বাধীন</em> Redis master-এ লক নিতে বলে; সংখ্যাগরিষ্ঠে (৩টিতে) সফল হলে এবং মোট সময় TTL-এর কম হলে লক অর্জিত ধরা হয়।</p>
      <p><strong>বিতর্কটি জানা ইন্টারভিউতে মূল্যবান:</strong> Martin Kleppmann যুক্তি দিয়েছেন Redlock <em>correctness</em>-এর জন্য নিরাপদ নয়, কারণ এটি সময়ের উপর নির্ভরশীল — GC pause, প্রসেস স্থগিত হওয়া বা ঘড়ির লাফ (clock drift) হলে একজন ভাবতে পারে তার লক আছে অথচ সেটি ইতিমধ্যে expire হয়ে গেছে। Redis-এর নির্মাতা antirez পাল্টা যুক্তি দিয়েছেন। ব্যবহারিক উপসংহার:</p>
      <ul>
        <li><strong>Efficiency lock</strong> (দুবার কাজ হলে কেবল অপচয়, ক্ষতি নয়) → Redis লক সম্পূর্ণ যথেষ্ট।</li>
        <li><strong>Correctness lock</strong> (দুবার হলে টাকা বা ডেটা নষ্ট) → শুধু লকের উপর নির্ভর করবেন না। ডাটাবেজে <strong>unique constraint</strong> বা <strong>fencing token</strong> (প্রতিবার বাড়তে থাকা সংখ্যা, যা রিসোর্স যাচাই করে) ব্যবহার করুন।</li>
      </ul>
      <p><strong>বাস্তব পরামর্শ:</strong> নিজে লক লিখবেন না — <code>redlock</code> বা Redisson-এর মতো পরীক্ষিত লাইব্রেরি ব্যবহার করুন, যেগুলো watchdog দিয়ে TTL স্বয়ংক্রিয়ভাবে বাড়িয়ে দেয় (lock extension)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Fencing token কীভাবে GC pause-এর সমস্যা সমাধান করে?</li>
        <li>PostgreSQL advisory lock কখন Redis লকের চেয়ে ভালো?</li>
      </ul>
    `
  },
  {
    id: "redis-24",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures","Hashes","Memory"],
    question: "Redis Hashes vs String Keys — মেমোরি অপটিমাইজেশনে Hash Structure কেন ব্যবহার করবেন?",
    answer: `
      <p>একই ডেটা আলাদা আলাদা string কী-তে রাখা বনাম একটি Hash-এ ফিল্ড হিসেবে রাখার মধ্যে মেমরির পার্থক্য নাটকীয়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ❌ আলাদা কী — প্রতিটি কী-র নিজস্ব ওভারহেড (~50-100 বাইট)
SET user:1000:name  "Rahim"
SET user:1000:email "rahim@example.com"
SET user:1000:age   "28"

# ✅ একটি Hash — শেয়ার্ড ওভারহেড, listpack এনকোডিং
HSET user:1000 name "Rahim" email "rahim@example.com" age 28
HGET user:1000 name          # একটি ফিল্ড
HMGET user:1000 name email   # কয়েকটি
HGETALL user:1000            # সব (⚠️ ফিল্ড বেশি হলে O(N))</code></pre>
      </div>
      <h4>কেন Hash এত সাশ্রয়ী</h4>
      <p>Redis-এ প্রতিটি টপ-লেভেল কী-র সাথে যুক্ত থাকে একটি <code>robj</code> স্ট্রাকচার, dictEntry, পয়েন্টার ও expire টেবিলের এন্ট্রি — কী-র নামের বাইরেও ৫০-১০০ বাইট। ১ কোটি কী মানে শুধু ওভারহেডেই ~১ GB।</p>
      <p>Hash-এ ফিল্ড সংখ্যা <code>hash-max-listpack-entries</code> (ডিফল্ট ১২৮)-এর কম থাকলে পুরো Hash একটি কম্প্যাক্ট <strong>listpack</strong>-এ থাকে — একটিই বরাদ্দ, পয়েন্টার নেই। ফলে মেমরি খরচ কয়েক গুণ কমে।</p>
      <h4>বড় স্কেলে কৌশল: কী-কে বাকেটে ভাগ করা</h4>
      <p>১ কোটি ইউজারের ডেটা রাখতে হলে ১ কোটি Hash বানালে আবার সেই কী-ওভারহেড ফিরে আসে। Instagram-এর বিখ্যাত কৌশল — আইডিকে ভাগ করে বাকেট বানানো:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// userId 1234567 → bucket 12345, field 67
const bucket = Math.floor(userId / 100);
const field  = userId % 100;
await redis.hset(\`users:\${bucket}\`, field, JSON.stringify(data));
// প্রতিটি Hash-এ ঠিক 100টি ফিল্ড → listpack এনকোডিং টিকে থাকে
// কী সংখ্যা 1 কোটি থেকে নেমে 1 লাখ</code></pre>
      </div>
      <h4>Hash-এর সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>ফিল্ড-লেভেলে TTL নেই</strong> (Redis 7.4-এর আগে) — পুরো Hash-এ একটিই TTL। আলাদা মেয়াদ দরকার হলে আলাদা কী লাগবে।</li>
        <li><strong>Cluster-এ পুরো Hash একটি slot-এ</strong> — খুব বড় Hash হলে সেটি একটি নোডেই ভার ফেলবে।</li>
        <li><code>HGETALL</code> O(N) — ফিল্ড অনেক হলে <code>HSCAN</code> বা <code>HMGET</code> ব্যবহার করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কখন Hash-এর বদলে JSON string রাখবেন?</li>
        <li>বাকেটিং করলে কী কী অসুবিধা তৈরি হয়?</li>
      </ul>
    `
  },
  {
    id: "redis-25",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures","Sorted Sets","ZSET"],
    question: "Redis Sorted Sets (ZSET) এবং Skip List Data Structure কীভাবে Leaderboard তৈরি করে?",
    answer: `
      <p><strong>Sorted Set (ZSET)</strong> Redis-এর সবচেয়ে শক্তিশালী ডেটা স্ট্রাকচার — প্রতিটি সদস্যের সাথে একটি <code>score</code> থাকে এবং সদস্যরা সবসময় score অনুযায়ী সাজানো থাকে। Leaderboard-এর জন্য এটি নিখুঁত।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// স্কোর যোগ/আপডেট — O(log N)
await redis.zadd('leaderboard', 5000, 'player:1');
await redis.zincrby('leaderboard', 150, 'player:1');   // অ্যাটমিক বৃদ্ধি

// শীর্ষ ১০ (স্কোরসহ) — O(log N + M)
const top = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');

// একজনের র‍্যাঙ্ক — O(log N), কোনো গণনা লাগে না!
const rank = await redis.zrevrank('leaderboard', 'player:1');   // 0-ভিত্তিক

// আশেপাশের খেলোয়াড় ("আপনার অবস্থান")
const around = await redis.zrevrange('leaderboard',
  Math.max(0, rank - 2), rank + 2, 'WITHSCORES');

// স্কোরের রেঞ্জ দিয়ে কুয়েরি
await redis.zcount('leaderboard', 1000, 5000);</code></pre>
      </div>
      <p><strong>কেন এটি SQL-এর চেয়ে ভালো:</strong> SQL-এ একজনের র‍্যাঙ্ক বের করতে <code>COUNT(*) WHERE score > x</code> লাগে, যা লক্ষ সারিতে ধীর। ZSET-এ <code>ZREVRANK</code> সরাসরি O(log N)-এ উত্তর দেয়, কারণ কাঠামোটিই সাজানো।</p>
      <h4>ভেতরে কী আছে: Skip List</h4>
      <p>বড় ZSET-এ Redis দুটি স্ট্রাকচার একসাথে রাখে:</p>
      <ul>
        <li><strong>Hash table:</strong> সদস্য → score ম্যাপিং। <code>ZSCORE</code> O(1)।</li>
        <li><strong>Skip list:</strong> score অনুযায়ী সাজানো — রেঞ্জ কুয়েরি ও র‍্যাঙ্কের জন্য O(log N)।</li>
      </ul>
      <p><strong>Skip list কী:</strong> এটি একটি লিংকড লিস্ট যার উপরে কয়েকটি "এক্সপ্রেস লেন" আছে। প্রতিটি নোড সম্ভাব্যতার ভিত্তিতে (সাধারণত ৫০%) উপরের লেভেলেও থাকে। ফলে খোঁজার সময় উপরের লেভেল দিয়ে লাফিয়ে লাফিয়ে দ্রুত কাছাকাছি পৌঁছে তারপর নিচে নেমে আসা যায় — অনেকটা balanced tree-র মতো O(log N) কর্মক্ষমতা।</p>
      <p><strong>Skip list কেন, red-black tree নয়?</strong> Redis-এর নির্মাতার ভাষায় — বাস্তবায়ন অনেক সহজ, রেঞ্জ কুয়েরিতে স্বাভাবিকভাবেই ভালো (নোডগুলো ক্রমানুসারে লিংকড), এবং rebalancing-এর জটিলতা নেই।</p>
      <h4>প্রোডাকশনে যা মনে রাখবেন</h4>
      <ul>
        <li><strong>টাই ভাঙা:</strong> একই score হলে Redis সদস্যের নাম অনুযায়ী lexicographic ক্রমে সাজায়। সময় অনুযায়ী টাই ভাঙতে চাইলে score-এ টাইমস্ট্যাম্প মিশিয়ে দিন (যেমন <code>score * 1e10 + (maxTs - ts)</code>)।</li>
        <li><strong>আকার নিয়ন্ত্রণ:</strong> কোটি ইউজারের leaderboard মেমরি খায়। <code>ZREMRANGEBYRANK</code> দিয়ে শীর্ষ N রেখে বাকিটা ছেঁটে ফেলুন।</li>
        <li><strong>সময়ভিত্তিক leaderboard:</strong> দৈনিক/সাপ্তাহিক আলাদা কী রেখে TTL দিন; <code>ZUNIONSTORE</code> দিয়ে একত্র করা যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ZSET দিয়ে rate limiting (sliding window) কীভাবে করবেন?</li>
        <li>কোটি সদস্যের leaderboard কীভাবে শার্ড করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-26",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Internals","Event Loop","Single Threaded"],
    question: "Redis সিঙ্গেল-থ্রেডেড (Single-threaded) হয়েও প্রতি সেকেন্ডে লাখ লাখ কমান্ড কীভাবে প্রসেস করে?",
    answer: `
      <p>এটি একটি চমৎকার প্রশ্ন, কারণ স্বজ্ঞাতভাবে মনে হয় একক থ্রেড ধীর হওয়া উচিত। বাস্তবে Redis সেকেন্ডে লক্ষ লক্ষ অপারেশন করে — কারণ <strong>এর bottleneck CPU নয়</strong>।</p>
      <h4>কেন একক থ্রেডেও দ্রুত</h4>
      <ul>
        <li><strong>সব কিছু মেমরিতে:</strong> ডিস্ক I/O নেই, তাই প্রতিটি অপারেশন মাইক্রোসেকেন্ডে শেষ। bottleneck হলো নেটওয়ার্ক ও মেমরি ব্যান্ডউইথ, CPU নয়। CPU যদি সীমা না হয়, তবে বেশি থ্রেড দিয়ে লাভ নেই।</li>
        <li><strong>কোনো লক নেই:</strong> একক থ্রেড মানে mutex, lock contention, context switch — কিছুই নেই। মাল্টি-থ্রেডেড সিস্টেমে লক ব্যবস্থাপনাতেই যে সময় যায়, Redis সেটি পুরোটাই বাঁচায়।</li>
        <li><strong>I/O Multiplexing:</strong> Redis একটি event loop (epoll/kqueue) ব্যবহার করে হাজারো কানেকশন একটি থ্রেডেই সামলায় — প্রতিটি কানেকশনের জন্য থ্রেড লাগে না। ধারণাটি Node.js-এর event loop-এর মতোই।</li>
        <li><strong>দক্ষ ডেটা স্ট্রাকচার:</strong> প্রতিটি অপারেশন O(1) বা O(log N) হওয়ায় প্রতিটি কমান্ডে খুব কম কাজ হয়।</li>
      </ul>
      <h4>একক থ্রেডের বড় সুবিধা: অ্যাটমিকতা বিনামূল্যে</h4>
      <p>যেহেতু একসাথে একটিই কমান্ড চলে, <code>INCR</code>, <code>SETNX</code>, বা একটি Lua স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে অ্যাটমিক। এজন্যই Redis distributed lock ও কাউন্টারের জন্য এত জনপ্রিয় — এই নিশ্চয়তা মাল্টি-থ্রেডেড সিস্টেমে অনেক জটিল হতো।</p>
      <h4>বিপরীত দিক — যা ইন্টারভিউতে বলা জরুরি</h4>
      <p>একটি ধীর কমান্ড <strong>পুরো সার্ভার আটকে দেয়</strong>। কোনো সমান্তরালতা নেই, তাই বাকি সব ক্লায়েন্ট অপেক্ষা করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ❌ যেসব কমান্ড প্রোডাকশনে সর্বনাশ ডেকে আনে
KEYS *                  # O(N) — লক্ষ কী স্ক্যান করে সব ব্লক করে
SMEMBERS huge_set       # O(N) — বিশাল সেট একবারে ফেরত
FLUSHALL                # সব মুছতে গিয়ে দীর্ঘ ব্লক
HGETALL massive_hash    # O(N)

# ✅ নিরাপদ বিকল্প — কার্সার দিয়ে টুকরো টুকরো
SCAN 0 MATCH user:* COUNT 100
SSCAN huge_set 0 COUNT 100
HSCAN massive_hash 0 COUNT 100</code></pre>
      </div>
      <h4>Redis 6+ এ আংশিক মাল্টি-থ্রেডিং</h4>
      <p>Redis 6 থেকে <strong>I/O threading</strong> যোগ হয়েছে — নেটওয়ার্ক থেকে পড়া ও লেখা (socket read/write ও প্রোটোকল পার্সিং) একাধিক থ্রেডে হতে পারে। কিন্তু <strong>কমান্ড এক্সিকিউশন এখনও একক-থ্রেডেড</strong>, তাই অ্যাটমিকতার নিশ্চয়তা অক্ষুণ্ণ থাকে। এটি কেবল খুব উচ্চ থ্রুপুটে নেটওয়ার্ক bottleneck কমায়।</p>
      <p><strong>একাধিক কোর ব্যবহার করতে চাইলে:</strong> একই মেশিনে একাধিক Redis ইনস্ট্যান্স চালান বা Redis Cluster ব্যবহার করুন — এটিই প্রস্তাবিত পথ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis-এ latency spike হচ্ছে — কীভাবে ধরবেন কোন কমান্ড দায়ী?</li>
        <li>ফোর্ক (BGSAVE) কীভাবে latency-কে প্রভাবিত করে?</li>
      </ul>
    `
  },
  {
    id: "redis-27",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Expiration","TTL","Lazy Freeing"],
    question: "Redis কীভাবে এক্সপায়ার্ড কি (Expired Keys) মেমোরি থেকে পরিষ্কার করে? Passive vs Active Expiration কী?",
    answer: `
      <p>Redis-এ TTL শেষ হওয়া মাত্রই কী মেমরি থেকে মুছে যায় না। এটি দুটি পরিপূরক কৌশল ব্যবহার করে, কারণ প্রতিটি expired কী তাৎক্ষণিকভাবে খুঁজে বের করা অত্যন্ত ব্যয়বহুল হতো।</p>
      <h4>১. Passive (Lazy) Expiration</h4>
      <p>কোনো কী <em>অ্যাক্সেস করার সময়</em> Redis দেখে সেটি expired কি না। হলে সাথে সাথে মুছে দেয় এবং ক্লায়েন্টকে "নেই" বলে।</p>
      <ul>
        <li>✅ CPU-র দিক থেকে প্রায় বিনামূল্যে — যা ছোঁয়া হয় শুধু তাই যাচাই হয়।</li>
        <li>❌ <strong>একা যথেষ্ট নয়:</strong> যে কী আর কখনও অ্যাক্সেস হবে না সেটি চিরকাল মেমরি দখল করে থাকবে।</li>
      </ul>
      <h4>২. Active Expiration</h4>
      <p>Redis প্রতি সেকেন্ডে ১০ বার একটি ব্যাকগ্রাউন্ড চক্র চালায়:</p>
      <ol>
        <li>TTL-যুক্ত কী-গুলো থেকে ২০টি র‍্যান্ডম নমুনা নেয়।</li>
        <li>যেগুলো expired সেগুলো মুছে দেয়।</li>
        <li>নমুনার <strong>২৫%-এর বেশি</strong> expired পাওয়া গেলে সাথে সাথে আবার ধাপ ১ থেকে শুরু করে।</li>
      </ol>
      <p>এই সম্ভাব্যতা-ভিত্তিক পদ্ধতির ফলে যেকোনো মুহূর্তে expired কিন্তু এখনও না-মোছা কী <strong>২৫%-এর নিচে</strong> থাকে — অথচ পুরো কীস্পেস স্ক্যান করতে হয় না।</p>
      <p><strong>নকশার ভারসাম্য:</strong> Redis একক-থ্রেডেড, তাই active expiration-এর জন্য বেশি সময় দিলে ক্লায়েন্টের কমান্ড আটকে যেত। তাই এটি ইচ্ছাকৃতভাবে সময়-সীমিত (CPU-র ~২৫%-এর বেশি নয়) রাখা হয়েছে।</p>
      <h4>যে ফলাফলগুলো বাস্তবে টের পাওয়া যায়</h4>
      <ul>
        <li><strong><code>used_memory</code> প্রত্যাশার চেয়ে বেশি দেখাতে পারে</strong> — কারণ কিছু expired কী এখনও মোছা হয়নি। এটি স্বাভাবিক, লিক নয়।</li>
        <li><strong>বহু কী একসাথে expire হলে</strong> (যেমন সবাইকে একই TTL দিলে) active cycle ব্যস্ত হয়ে latency spike হতে পারে। তাই <strong>TTL-এ jitter দিন</strong> — <code>3600 + Math.random() * 300</code>।</li>
        <li><strong>Replica নিজে থেকে কী মোছে না।</strong> Master expire করে replica-কে একটি স্পষ্ট <code>DEL</code> পাঠায়। এতে ধারাবাহিকতা বজায় থাকে, তবে সামান্য দেরিতে replica-তে expired কী পড়া যেতে পারে (আধুনিক সংস্করণে replica যৌক্তিকভাবে expired কী লুকিয়ে রাখে)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># expired কী মোছার পরিসংখ্যান
INFO stats
# expired_keys:12345      → কতগুলো expire হয়ে মোছা হয়েছে
# evicted_keys:0          → maxmemory চাপে কতগুলো জোর করে মোছা হয়েছে
#                           এটি বাড়তে থাকলে মেমরি বাড়ানো দরকার

TTL mykey        # অবশিষ্ট সেকেন্ড; -1 = TTL নেই, -2 = কী নেই
PERSIST mykey    # TTL সরিয়ে কী-কে স্থায়ী করা</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Expiration এবং eviction — পার্থক্য কী?</li>
        <li>Keyspace notification দিয়ে কী expire হওয়ার ইভেন্ট পাওয়া কতটা নির্ভরযোগ্য?</li>
      </ul>
    `
  },
  {
    id: "redis-29",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Security","AUTH","ACL"],
    question: "Redis ACL (Access Control Lists) দিয়ে নির্দিষ্ট ইউজারের কমান্ড ও কি-এক্সেস কীভাবে সীমিত করবেন?",
    answer: `
      <p>Redis 6 থেকে <strong>ACL (Access Control List)</strong> যোগ হয়েছে, যা দিয়ে একাধিক ইউজার তৈরি করে প্রত্যেকের কমান্ড ও কী-অ্যাক্সেস আলাদাভাবে সীমিত করা যায়। এর আগে কেবল একটি গ্লোবাল পাসওয়ার্ড ছিল — অর্থাৎ যে কেউ ঢুকলেই সব করতে পারত।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># শুধু-পড়া অ্যানালিটিক্স ইউজার
ACL SETUSER analytics on >StrongPass123 \\
  ~stats:* ~metrics:*        \\   # শুধু এই প্যাটার্নের কী
  +get +mget +hgetall +scan  \\   # শুধু এই কমান্ডগুলো
  -@dangerous                    # বিপজ্জনক কমান্ড বাদ

# অ্যাপ্লিকেশন ইউজার — নিজের namespace-এ পূর্ণ অধিকার
ACL SETUSER app on >AppPass456 ~app:* +@all -@admin -@dangerous

# ক্যাশ-only ইউজার
ACL SETUSER cache on >CachePass ~cache:* +get +set +setex +del +expire

ACL LIST                 # সব ইউজার দেখুন
ACL WHOAMI               # বর্তমানে কে
ACL GETUSER analytics    # নির্দিষ্ট ইউজারের অনুমতি
ACL DELUSER analytics</code></pre>
      </div>
      <h4>নিয়মের সিনট্যাক্স</h4>
      <ul>
        <li><code>on</code>/<code>off</code> — ইউজার সক্রিয় কি না।</li>
        <li><code>&gt;password</code> — পাসওয়ার্ড যোগ (<code>&lt;password</code> দিয়ে বাদ)।</li>
        <li><code>~pattern</code> — কোন কী-প্যাটার্নে অ্যাক্সেস। <code>~*</code> মানে সব।</li>
        <li><code>+command</code> / <code>-command</code> — কমান্ড অনুমোদন/নিষেধ।</li>
        <li><code>+@category</code> — কমান্ড ক্যাটাগরি (<code>@read</code>, <code>@write</code>, <code>@admin</code>, <code>@dangerous</code>, <code>@keyspace</code>)।</li>
        <li><code>&amp;channel</code> — Pub/Sub চ্যানেলের অনুমতি।</li>
      </ul>
      <h4>প্রোডাকশনের সেরা অভ্যাস</h4>
      <ul>
        <li><strong>ডিফল্ট ইউজার বন্ধ করুন:</strong> <code>ACL SETUSER default off</code> — নাহলে পাসওয়ার্ডবিহীন অ্যাক্সেস খোলা থাকতে পারে।</li>
        <li><strong>প্রতিটি সার্ভিসের আলাদা ইউজার:</strong> least privilege — order-service কেন session কী মুছতে পারবে?</li>
        <li><strong>বিপজ্জনক কমান্ড নিষিদ্ধ করুন:</strong> <code>FLUSHALL</code>, <code>KEYS</code>, <code>CONFIG</code>, <code>DEBUG</code>, <code>SHUTDOWN</code> — <code>-@dangerous</code> দিয়ে একবারে।</li>
        <li><strong>ACL ফাইলে রাখুন:</strong> <code>aclfile /etc/redis/users.acl</code> — তাহলে রিস্টার্টেও টিকে থাকে এবং সংস্করণ-নিয়ন্ত্রণে রাখা যায় (পাসওয়ার্ড ছাড়া)।</li>
        <li><code>ACL LOG</code> দিয়ে অনুমতি-লঙ্ঘনের চেষ্টা পর্যবেক্ষণ করুন — অনুপ্রবেশের আগাম সংকেত।</li>
      </ul>
      <p><strong>মনে রাখবেন:</strong> ACL নেটওয়ার্ক-স্তরের সুরক্ষার বিকল্প নয়। Redis কখনও ইন্টারনেটে সরাসরি এক্সপোজ করবেন না — <code>bind</code>, ফায়ারওয়াল ও TLS একসাথে ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ACL কি Redis Cluster-এ সব নোডে স্বয়ংক্রিয়ভাবে ছড়ায়?</li>
        <li>Redis 6-এর আগে অ্যাক্সেস নিয়ন্ত্রণ কীভাবে করা হতো?</li>
      </ul>
    `
  },
  {
    id: "redis-31",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures","Geospatial","GeoHash"],
    question: "Redis Geospatial (GEOADD, GEORADIUS) কীভাবে জিপিএস লোকেশন সার্চ করে?",
    answer: `
      <p>Redis-এর geospatial কমান্ডগুলো আলাদা কোনো ডেটা টাইপ নয় — ভেতরে এগুলো <strong>Sorted Set</strong> ব্যবহার করে, যেখানে score হিসেবে থাকে অক্ষাংশ-দ্রাঘিমার <strong>geohash</strong> মান (৫২-বিট integer)।</p>
      <p>এটিই মূল কৌশল: geohash দ্বিমাত্রিক স্থানাঙ্ককে একমাত্রিক সংখ্যায় রূপান্তর করে এমনভাবে যে <em>কাছাকাছি জায়গার geohash সংখ্যাগতভাবেও কাছাকাছি হয়</em>। ফলে ZSET-এর দ্রুত রেঞ্জ কুয়েরি দিয়েই "কাছের জায়গা" খোঁজা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// অবস্থান যোগ (দ্রাঘিমা, অক্ষাংশ — এই ক্রমেই!)
await redis.geoadd('drivers', 90.4125, 23.8103, 'driver:1');   // ঢাকা
await redis.geoadd('drivers', 90.3563, 23.7104, 'driver:2');

// ৫ কিমি-র মধ্যে নিকটতম ১০ জন, দূরত্ব ও স্থানাঙ্কসহ
const near = await redis.geosearch('drivers',
  'FROMLONLAT', 90.4125, 23.8103,
  'BYRADIUS', 5, 'km',
  'ASC', 'COUNT', 10, 'WITHDIST', 'WITHCOORD');

// দুটি সদস্যের মধ্যে দূরত্ব
await redis.geodist('drivers', 'driver:1', 'driver:2', 'km');

// এটি আসলে ZSET — তাই ZSET কমান্ডও কাজ করে
await redis.zrem('drivers', 'driver:1');    // অফলাইন হলে সরানো
await redis.zcard('drivers');                // মোট সংখ্যা</code></pre>
      </div>
      <p><strong>মনে রাখবেন:</strong> <code>GEOADD</code>-এ ক্রম হলো <strong>longitude, latitude</strong> — সাধারণ "lat, lng" অভ্যাসের উল্টো। এটি সবচেয়ে সাধারণ বাগ।</p>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>সরলরেখার দূরত্ব</strong> (haversine) — রাস্তার প্রকৃত দূরত্ব বা ETA নয়। রাইড-শেয়ারিংয়ে চূড়ান্ত র‍্যাঙ্কিংয়ে routing API লাগবে।</li>
        <li><strong>মেরু ও ±180° দ্রাঘিমার কাছে</strong> geohash-এর নির্ভুলতা কমে।</li>
        <li><code>GEORADIUS</code> পুরনো ও write কমান্ড হিসেবে গণ্য (replica-তে চলে না); Redis 6.2+ এ <strong><code>GEOSEARCH</code></strong> ব্যবহার করুন — এটি read-only এবং বাক্স-আকৃতির অনুসন্ধানও সমর্থন করে।</li>
        <li>উচ্চ write হারে (প্রতি ৪ সেকেন্ডে লক্ষ ড্রাইভার) একটি কী hot হয়ে যেতে পারে — অঞ্চলভিত্তিক আলাদা কী ব্যবহার করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Geohash-এর precision ও cell size-এর সম্পর্ক কী?</li>
        <li>Redis GEO বনাম PostGIS — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "redis-32",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Ops","Forking","Copy On Write"],
    question: "Redis RDB Snapshot নেওয়ার সময় Copy-on-Write (COW) কীভাবে মেমোরি বজায় রাখে?",
    answer: `
      <p><code>BGSAVE</code> চালালে Redis একটি চাইল্ড প্রসেস <strong>fork</strong> করে। চাইল্ড ডিস্কে RDB ফাইল লেখে, আর প্যারেন্ট কোনো বাধা ছাড়াই ক্লায়েন্টদের সার্ভ করতে থাকে। এটি সম্ভব হয় <strong>Copy-on-Write (COW)</strong>-এর কারণে।</p>
      <h4>COW কীভাবে কাজ করে</h4>
      <p><code>fork()</code> করলে চাইল্ড প্রসেস প্যারেন্টের পুরো মেমরির কপি পায় না। বদলে দুটি প্রসেস <em>একই ফিজিক্যাল মেমরি পেজ</em> শেয়ার করে, তবে সেগুলো read-only হিসেবে চিহ্নিত হয়। কোনো পক্ষ একটি পেজে লিখতে গেলে কার্নেল তখন সেই পেজটির একটি কপি বানায় — তাই নাম copy-on-write।</p>
      <pre class="mermaid">
flowchart TD
    F["fork() করা হলো"] --> S["প্যারেন্ট ও চাইল্ড<br/>একই পেজ শেয়ার করছে<br/>(অতিরিক্ত মেমরি ≈ 0)"]
    S --> W{"প্যারেন্টে write এলো?"}
    W -->|"না"| OK["পেজ শেয়ার্ডই থাকে ✅"]
    W -->|"হ্যাঁ"| C["কার্নেল সেই পেজের<br/>কপি বানায় → মেমরি বাড়ে"]
      </pre>
      <span class="diagram-caption">যত বেশি write, তত বেশি পেজ কপি হয়</span>
      <p><strong>ফলাফল:</strong> চাইল্ড প্রসেস fork-এর মুহূর্তের একটি হিমায়িত, ধারাবাহিক ছবি দেখতে পায় — যদিও প্যারেন্টে ডেটা বদলাতে থাকে। এজন্যই RDB স্ন্যাপশট সবসময় একটি নির্দিষ্ট মুহূর্তের সঙ্গতিপূর্ণ অবস্থা।</p>
      <h4>প্রোডাকশনের বিপদ</h4>
      <ul>
        <li><strong>মেমরি স্পাইক:</strong> স্ন্যাপশট চলাকালে যদি write-heavy লোড থাকে, বহু পেজ কপি হয়ে মেমরি ব্যবহার সর্বোচ্চ <strong>দ্বিগুণ</strong> পর্যন্ত যেতে পারে। ৩০ GB Redis-এ পর্যাপ্ত ফাঁকা RAM না থাকলে OOM killer প্রসেস মেরে ফেলবে।</li>
        <li><strong>Fork নিজেই ব্লক করে:</strong> fork() পেজ টেবিল কপি করে, যা মেমরির আকারের সাথে বাড়ে। বড় ইনস্ট্যান্সে এটি কয়েকশো মিলিসেকেন্ড লাগতে পারে — এই সময় Redis সম্পূর্ণ থেমে থাকে। latency spike-এর এটি একটি সাধারণ কারণ।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># অতিরিক্ত মেমরি বরাদ্দের অনুমতি — নাহলে fork ব্যর্থ হতে পারে
sysctl vm.overcommit_memory=1

# Transparent Huge Pages বন্ধ করুন — COW-এ latency নাটকীয়ভাবে বাড়ায়
# (2MB পেজ কপি করা 4KB পেজের চেয়ে অনেক ব্যয়বহুল)
echo never > /sys/kernel/mm/transparent_hugepage/enabled

# fork-এর সময় পর্যবেক্ষণ
INFO stats     # latest_fork_usec → কত মাইক্রোসেকেন্ড লেগেছে
INFO memory    # used_memory_peak, mem_fragmentation_ratio</code></pre>
      </div>
      <p><strong>THP বন্ধ করা গুরুত্বপূর্ণ:</strong> Transparent Huge Pages চালু থাকলে কার্নেল ৪ KB-র বদলে ২ MB পেজ ব্যবহার করে। COW-এর সময় একটি বাইট বদলালেও পুরো ২ MB কপি করতে হয় — মেমরি ও latency দুটোই বিস্ফোরিত হয়। Redis চালু হওয়ার সময় এই বিষয়ে সতর্কবার্তাও দেয়।</p>
      <p><strong>একই প্রক্রিয়া AOF rewrite-এও:</strong> <code>BGREWRITEAOF</code>-ও fork ব্যবহার করে, তাই একই সতর্কতা প্রযোজ্য। দুটি একসাথে চলতে দেবেন না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Replica-তে persistence চালালে master-এর কী লাভ?</li>
        <li><code>latest_fork_usec</code> বেশি হলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-33",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Commands","KEYS vs SCAN","Performance"],
    question: "KEYS * কমান্ড কেন Production Redis-এ চালানো নিষেধ এবং SCAN Cursor কীভাবে ব্যবহার করবেন?",
    answer: `
      <p><code>KEYS *</code> প্রোডাকশনে চালানো Redis-এর সবচেয়ে পরিচিত বিপর্যয়। কারণটি সরল: Redis <strong>একক-থ্রেডেড</strong>, আর <code>KEYS</code> একটি <strong>O(N)</strong> অপারেশন যা <em>সম্পূর্ণ কীস্পেস</em> স্ক্যান করে।</p>
      <h4>কী ঘটে</h4>
      <p>১ কোটি কী থাকলে <code>KEYS *</code> চালাতে কয়েক সেকেন্ড লাগতে পারে। সেই পুরো সময় Redis <strong>অন্য কোনো কমান্ড প্রসেস করে না</strong> — সব ক্লায়েন্ট আটকে থাকে, অ্যাপ্লিকেশনের টাইমআউট শুরু হয়, কানেকশন পুল ভরে যায়, এবং কার্যত পুরো সাইট ডাউন হয়ে যায়। তার উপর ফলাফলটি এক বিশাল অ্যারে হিসেবে একবারে তৈরি হয়, যা মেমরিও খায়।</p>
      <h4>SCAN — সঠিক উপায়</h4>
      <p><code>SCAN</code> একটি <strong>কার্সার-ভিত্তিক</strong> ইটারেটর। প্রতিটি কলে অল্প কিছু কী ফেরত দিয়ে পরের কার্সার দেয়, তাই প্রতিটি কল O(1)-এর কাছাকাছি এবং সার্ভার ব্লক হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ নিরাপদ: টুকরো টুকরো করে পুরো কীস্পেস ঘোরা
async function scanAll(pattern, batch = 100) {
  let cursor = '0';
  const found = [];
  do {
    const [next, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', batch);
    cursor = next;
    found.push(...keys);
  } while (cursor !== '0');          // কার্সার '0' এ ফিরলে শেষ
  return found;
}

// বহু কী মুছতে হলে — একসাথে নয়, ব্যাচে
let cursor = '0';
do {
  const [next, keys] = await redis.scan(cursor, 'MATCH', 'session:old:*', 'COUNT', 100);
  cursor = next;
  if (keys.length) await redis.unlink(...keys);   // UNLINK = অ্যাসিঙ্ক্রোনাস DEL
} while (cursor !== '0');</code></pre>
      </div>
      <h4>SCAN-এর যে আচরণগুলো জানা জরুরি</h4>
      <ul>
        <li><strong><code>COUNT</code> একটি ইঙ্গিত মাত্র</strong>, নিশ্চয়তা নয় — একটি কলে তার চেয়ে কম বা বেশি কী আসতে পারে, এমনকি শূন্যও।</li>
        <li><strong>খালি ফল মানে শেষ নয়:</strong> কার্সার <code>'0'</code> না হওয়া পর্যন্ত চালিয়ে যেতে হবে।</li>
        <li><strong>ডুপ্লিকেট আসতে পারে:</strong> একই কী একাধিকবার ফেরত আসা সম্ভব, তাই প্রয়োজনে Set-এ জমা করুন।</li>
        <li><strong>নিশ্চয়তা:</strong> পুরো ইটারেশন জুড়ে যে কী উপস্থিত ছিল সেটি অন্তত একবার আসবে। মাঝপথে যোগ/বাদ হওয়া কী আসতেও পারে, না-ও পারে।</li>
        <li><strong><code>MATCH</code> ফিল্টার করে ফেরত দেওয়ার সময়</strong>, স্ক্যান করার সময় নয় — অর্থাৎ প্যাটার্ন দিলেও পুরো কীস্পেসই ঘুরতে হয়।</li>
      </ul>
      <h4>DEL বনাম UNLINK</h4>
      <p>বিশাল কী (লক্ষ এলিমেন্টের একটি সেট) মুছতে <code>DEL</code>-ও ব্লক করতে পারে। <code>UNLINK</code> কী-টিকে কীস্পেস থেকে সাথে সাথে সরিয়ে দেয় এবং আসল মেমরি মুক্তি ব্যাকগ্রাউন্ড থ্রেডে করে — প্রোডাকশনে এটিই নিরাপদ।</p>
      <p><strong>আরও ভালো সমাধান:</strong> কী খুঁজতে হচ্ছে মানেই সাধারণত ডিজাইনে সমস্যা। কী-গুলোকে একটি Set বা Hash-এ সূচিবদ্ধ করে রাখুন, তাহলে স্ক্যান করার দরকারই পড়বে না। বিপজ্জনক কমান্ডগুলো <code>rename-command</code> দিয়ে নিষ্ক্রিয় করে রাখাও ভালো অভ্যাস।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis Cluster-এ SCAN কীভাবে কাজ করে?</li>
        <li>SCAN চলাকালে কী বদলে গেলে কী নিশ্চয়তা থাকে?</li>
      </ul>
    `
  },
  {
    id: "redis-34",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Modules","RedisJSON","RediSearch"],
    question: "RedisModules (RedisJSON, RediSearch, RedisGraph) কীভাবে Redis-কে ডাইনামিক ডাটাবেজ বানায়?",
    answer: `
      <p>Redis Modules হলো C-তে লেখা এক্সটেনশন যা Redis-এ সম্পূর্ণ নতুন ডেটা টাইপ ও কমান্ড যোগ করে — ফলে Redis কেবল ক্যাশ না থেকে একটি বহুমুখী ডেটা প্ল্যাটফর্মে পরিণত হয়।</p>
      <table>
        <tr><th>মডিউল</th><th>যা যোগ করে</th><th>ব্যবহার</th></tr>
        <tr><td><strong>RedisJSON</strong></td><td>নেটিভ JSON টাইপ, JSONPath কুয়েরি</td><td>নেস্টেড ডকুমেন্টের একটি ফিল্ড আপডেট</td></tr>
        <tr><td><strong>RediSearch</strong></td><td>সেকেন্ডারি ইনডেক্স, ফুল-টেক্সট, ভেক্টর সার্চ</td><td>Redis-এর ভেতরেই সার্চ</td></tr>
        <tr><td><strong>RedisTimeSeries</strong></td><td>টাইম-সিরিজ টাইপ, downsampling</td><td>মেট্রিক, IoT সেন্সর</td></tr>
        <tr><td><strong>RedisBloom</strong></td><td>Bloom/Cuckoo filter, Count-Min Sketch, Top-K</td><td>সম্ভাব্যতা-ভিত্তিক গণনা</td></tr>
      </table>
      <h4>RedisJSON কেন কার্যকর</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ❌ সাধারণ String-এ JSON রাখলে: একটি ফিল্ড বদলাতে
#    পুরো ডকুমেন্ট GET → পার্স → বদল → সিরিয়ালাইজ → SET (race condition ঝুঁকি)

# ✅ RedisJSON-এ সরাসরি নেস্টেড ফিল্ড অপারেশন
JSON.SET user:1 $ '{"name":"Rahim","address":{"city":"Dhaka"},"visits":5}'
JSON.GET user:1 $.address.city              # শুধু একটি ফিল্ড পড়া
JSON.SET user:1 $.address.city '"Chittagong"'  # শুধু একটি ফিল্ড লেখা
JSON.NUMINCRBY user:1 $.visits 1            # অ্যাটমিক বৃদ্ধি</code></pre>
      </div>
      <h4>RediSearch — সবচেয়ে শক্তিশালী</h4>
      <p>Redis-এর মূল সীমাবদ্ধতা হলো এটি কেবল <em>প্রাইমারি কী</em> দিয়ে খোঁজা যায় — "যেসব ইউজারের বয়স ২৫-৩০ এবং শহর ঢাকা" এমন কুয়েরি সম্ভব নয়। RediSearch সেকেন্ডারি ইনডেক্স যোগ করে এটি সম্ভব করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>FT.CREATE idx:users ON JSON PREFIX 1 user: SCHEMA
  $.name AS name TEXT
  $.age  AS age  NUMERIC SORTABLE
  $.city AS city TAG

FT.SEARCH idx:users "@city:{Dhaka} @age:[25 30]" SORTBY age ASC</code></pre>
      </div>
      <p>এটি <strong>ভেক্টর সার্চ</strong>-ও (HNSW ইনডেক্স) সমর্থন করে, যা AI/RAG অ্যাপ্লিকেশনে embedding খোঁজার জন্য Redis-কে একটি ভেক্টর ডাটাবেজে পরিণত করে।</p>
      <h4>বিবেচ্য বিষয়</h4>
      <ul>
        <li><strong>লাইসেন্স:</strong> এই মডিউলগুলো Redis Source Available License-এর অধীনে — সাধারণ ব্যবহারে সমস্যা নেই, কিন্তু ম্যানেজড সার্ভিস হিসেবে বিক্রি করা যায় না। Redis Stack বা Redis Enterprise-এ পাওয়া যায়; স্ব-হোস্ট করলে আলাদা ইনস্টল লাগে।</li>
        <li><strong>মেমরি:</strong> ইনডেক্সও RAM-এ থাকে — বড় ডেটাসেটে ব্যয়বহুল।</li>
        <li><strong>Elasticsearch-এর বিকল্প নয়:</strong> মাঝারি ডেটাসেটে RediSearch দ্রুত ও সহজ, কিন্তু বিশাল স্কেলে ও জটিল বিশ্লেষণে Elasticsearch-ই উপযুক্ত।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>RediSearch-এর ইনডেক্স কি persist হয়?</li>
        <li>Redis-কে প্রাইমারি ডাটাবেজ হিসেবে ব্যবহার করা কি যুক্তিসঙ্গত?</li>
      </ul>
    `
  },
  {
    id: "redis-36",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Performance","CLIENT KILL","Slowlog"],
    question: "Redis Client Connection Management এবং maxclients লিমিট কীভাবে মনিটর করবেন?",
    answer: `
      <p>Redis-এ প্রতিটি ক্লায়েন্ট কানেকশন মেমরি ও ফাইল ডেসক্রিপ্টর খরচ করে। কানেকশন ব্যবস্থাপনা ভুল হলে <code>ERR max number of clients reached</code> এরর আসে এবং পুরো অ্যাপ্লিকেশন Redis-এ পৌঁছাতে পারে না।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সীমা নির্ধারণ
CONFIG GET maxclients          # ডিফল্ট 10000
CONFIG SET maxclients 20000
# ⚠️ OS-এর ফাইল ডেসক্রিপ্টর সীমাও বাড়াতে হবে, নাহলে Redis নিজেই কমিয়ে নেবে
# ulimit -n 65535

INFO clients
# connected_clients:250
# blocked_clients:5              ← BRPOP/BLPOP-এ অপেক্ষারত
# client_recent_max_input_buffer / output_buffer

CLIENT LIST                    # প্রতিটি কানেকশনের বিস্তারিত
CLIENT KILL ID 42              # নির্দিষ্ট কানেকশন বন্ধ

# নিষ্ক্রিয় কানেকশন স্বয়ংক্রিয়ভাবে বন্ধ (0 = কখনও নয়)
CONFIG SET timeout 300</code></pre>
      </div>
      <h4>যে সমস্যাগুলো সবচেয়ে বেশি হয়</h4>
      <ul>
        <li><strong>কানেকশন লিক:</strong> প্রতিটি রিকোয়েস্টে নতুন Redis ক্লায়েন্ট তৈরি করে বন্ধ না করা। কয়েক মিনিটেই সীমা শেষ। <strong>সমাধান:</strong> অ্যাপ্লিকেশন চালুর সময় একটিই ক্লায়েন্ট ইনস্ট্যান্স তৈরি করে সর্বত্র পুনর্ব্যবহার করুন — ioredis/node-redis নিজেই ভেতরে কানেকশন সামলায়।</li>
        <li><strong>সার্ভারলেস পরিবেশ:</strong> প্রতিটি ল্যাম্বডা ইনভোকেশন নতুন কানেকশন খুলতে পারে। এখানে Redis-এর সামনে একটি প্রক্সি (RedisProxy, Upstash-এর HTTP API) বা কানেকশন পুলার দরকার।</li>
        <li><strong>Output buffer overflow:</strong> একটি ক্লায়েন্ট বিশাল ফল চাইলে (যেমন <code>KEYS *</code>) বা Pub/Sub সাবস্ক্রাইবার ধীরে পড়লে output buffer ফুলে যায় এবং Redis সেই ক্লায়েন্টকে জোর করে বন্ধ করে দেয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># বাফার সীমা: hard limit, soft limit, soft seconds
client-output-buffer-limit normal   0        0      0      # সাধারণ ক্লায়েন্ট
client-output-buffer-limit replica  256mb   64mb   60      # replica
client-output-buffer-limit pubsub   32mb     8mb   60      # সাবস্ক্রাইবার</code></pre>
      </div>
      <p><strong>replica-র বাফার গুরুত্বপূর্ণ:</strong> full resync চলাকালে master-কে সব নতুন write বাফারে রাখতে হয়। বাফার ছোট হলে replica সংযোগ হারায় এবং <em>আবার</em> full resync শুরু হয় — একটি অসীম চক্র তৈরি হতে পারে।</p>
      <h4>যা মনিটর করবেন</h4>
      <ul>
        <li><code>connected_clients</code> — <code>maxclients</code>-এর কাছাকাছি গেলে alert।</li>
        <li><code>rejected_connections</code> (<code>INFO stats</code>) — শূন্যের বেশি মানেই ক্লায়েন্ট ফিরিয়ে দেওয়া হচ্ছে।</li>
        <li><code>blocked_clients</code> — হঠাৎ বাড়লে কনজিউমার আটকে আছে।</li>
        <li>প্রতিটি অ্যাপ্লিকেশন ইনস্ট্যান্স কত কানেকশন খুলছে (<code>CLIENT LIST</code>-এ <code>addr</code> দেখে)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Node.js-এ Redis কানেকশন পুল কীভাবে কাজ করে?</li>
        <li>Pub/Sub-এর জন্য আলাদা কানেকশন কেন লাগে?</li>
      </ul>
    `
  },
  {
    id: "redis-37",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures","Lists","Queues"],
    question: "Redis Lists (LPUSH, RPOP, BRPOP) দিয়ে ব্রাউজার নোটিফিকেশন কিউ কীভাবে তৈরি করবেন?",
    answer: `
      <p>Redis List দিয়ে সবচেয়ে সহজ ও কার্যকর কাজের কিউ বানানো যায়। <code>LPUSH</code> দিয়ে একদিক থেকে ঢোকানো এবং <code>BRPOP</code> দিয়ে অন্যদিক থেকে বের করা — এটিই ক্লাসিক FIFO কিউ।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// প্রডিউসার
await redis.lpush('queue:notifications', JSON.stringify({
  userId: 123, type: 'order_shipped', orderId: 'A-9981'
}));

// কনজিউমার — BRPOP ব্লক করে অপেক্ষা করে (busy polling নয়)
while (running) {
  // 5 সেকেন্ড টাইমআউট — যাতে shutdown সিগন্যাল ধরা যায়
  const res = await redis.brpop('queue:notifications', 5);
  if (!res) continue;                       // টাইমআউট, আবার লুপ
  const [, payload] = res;
  await sendNotification(JSON.parse(payload));
}</code></pre>
      </div>
      <p><strong><code>BRPOP</code> কেন <code>RPOP</code>-এর চেয়ে ভালো:</strong> <code>RPOP</code> খালি কিউতে সাথে সাথে <code>nil</code> দেয়, তাই লুপে চালালে অনর্থক CPU ও নেটওয়ার্ক পোড়ে (busy polling)। <code>BRPOP</code> ডেটা না আসা পর্যন্ত ব্লক করে থাকে, ফলে খরচ প্রায় শূন্য এবং latency প্রায় তাৎক্ষণিক।</p>
      <h4>একটি বড় সমস্যা: মেসেজ হারানো</h4>
      <p>সরল <code>BRPOP</code>-এ মেসেজটি কিউ থেকে বেরিয়ে আসে, কিন্তু যদি ওয়ার্কার প্রসেস করার মাঝপথে ক্র্যাশ করে — <strong>মেসেজটি চিরতরে হারিয়ে যায়</strong>। এটি at-most-once ডেলিভারি।</p>
      <p><strong>সমাধান — <code>BLMOVE</code> (নির্ভরযোগ্য কিউ প্যাটার্ন):</strong></p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// অ্যাটমিকভাবে main কিউ থেকে সরিয়ে processing কিউতে রাখুন
const job = await redis.blmove(
  'queue:notifications', 'queue:processing', 'RIGHT', 'LEFT', 5
);

if (job) {
  try {
    await sendNotification(JSON.parse(job));
    // সফল হলে তবেই processing থেকে মুছুন
    await redis.lrem('queue:processing', 1, job);
  } catch (err) {
    // ব্যর্থ হলে মূল কিউতে ফেরত দিন (বা retry কাউন্টসহ DLQ-তে)
    await redis.lrem('queue:processing', 1, job);
    await redis.lpush('queue:failed', job);
  }
}
// একটি আলাদা reaper জব 'queue:processing'-এ দীর্ঘক্ষণ পড়ে থাকা
// আইটেম খুঁজে মূল কিউতে ফিরিয়ে দেবে (ক্র্যাশ হওয়া ওয়ার্কারের কাজ উদ্ধার)</code></pre>
      </div>
      <h4>List কিউয়ের সীমা</h4>
      <ul>
        <li>consumer group নেই — কাজ ভাগ করে নেওয়ার বিল্ট-ইন ব্যবস্থা নেই (একাধিক ওয়ার্কার একই কিউতে BRPOP করলে কাজ ভাগ হয়, কিন্তু ট্র্যাকিং নেই)।</li>
        <li>ACK, retry কাউন্ট, DLQ — সব নিজে বানাতে হয়।</li>
        <li>প্রায়োরিটি নেই (আলাদা কিউ বানিয়ে ওয়ার্কারে ক্রমানুসারে চেক করতে হয়)।</li>
      </ul>
      <p><strong>পরামর্শ:</strong> সরল কাজে List যথেষ্ট। নির্ভরযোগ্যতা ও consumer group দরকার হলে <strong>Redis Streams</strong>, আর পূর্ণ ফিচার দরকার হলে BullMQ (যা ভেতরে Redis-ই ব্যবহার করে) বা RabbitMQ নিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক ওয়ার্কার BRPOP করলে কে মেসেজ পাবে?</li>
        <li>প্রায়োরিটি কিউ List দিয়ে কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-38",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Memory","Fragmentation Ratio","MEMORY PURGE"],
    question: "Redis Memory Fragmentation Ratio (mem_fragmentation_ratio) কী এবং active-defrag কীভাবে চালু করবেন?",
    answer: `
      <p><strong>Memory fragmentation ratio</strong> = <code>used_memory_rss / used_memory</code> — অর্থাৎ অপারেটিং সিস্টেম Redis-কে যত মেমরি দিয়েছে, আর Redis নিজে যত ডেটা ধরে রেখেছে, তার অনুপাত।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>INFO memory
# used_memory:1073741824              ← Redis-এর ডেটা (1 GB)
# used_memory_rss:1610612736          ← OS থেকে নেওয়া (1.5 GB)
# mem_fragmentation_ratio:1.5         ← 50% অপচয়
# maxmemory_policy:allkeys-lru</code></pre>
      </div>
      <h4>অনুপাত কীভাবে পড়বেন</h4>
      <table>
        <tr><th>মান</th><th>অর্থ</th><th>করণীয়</th></tr>
        <tr><td><strong>~1.0–1.1</strong></td><td>স্বাস্থ্যকর</td><td>কিছু না</td></tr>
        <tr><td><strong>&gt; 1.5</strong></td><td>উল্লেখযোগ্য fragmentation</td><td>defrag চালু করুন</td></tr>
        <tr><td><strong>&lt; 1.0</strong></td><td><strong>বিপদ</strong> — Redis swap হচ্ছে</td><td>সাথে সাথে RAM বাড়ান বা ডেটা কমান</td></tr>
      </table>
      <p><strong>১-এর নিচে হওয়াটা সবচেয়ে গুরুতর:</strong> এর মানে Redis-এর কিছু মেমরি ডিস্কে swap হয়ে গেছে। Redis-এর গতি পুরোপুরি RAM-নির্ভর, তাই swap শুরু হলে latency শতগুণ বেড়ে যায়। Redis সার্ভারে সাধারণত swap সম্পূর্ণ বন্ধ রাখাই প্রস্তাবিত।</p>
      <h4>Fragmentation কেন হয়</h4>
      <p>বিভিন্ন আকারের অবজেক্ট বারবার তৈরি ও মুছে ফেলার ফলে allocator-এর (jemalloc) কাছে ছোট ছোট ফাঁকা জায়গা থেকে যায়, যেগুলো নতুন বরাদ্দে ব্যবহার করা যায় না। বিশেষ করে ডেটার আকার খুব ওঠানামা করলে বা প্রচুর eviction হলে এটি বাড়ে।</p>
      <h4>Active Defragmentation</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>CONFIG SET activedefrag yes
CONFIG SET active-defrag-ignore-bytes 100mb   # এর কম অপচয় হলে কিছু করবে না
CONFIG SET active-defrag-threshold-lower 10   # 10% fragmentation-এ শুরু
CONFIG SET active-defrag-threshold-upper 100  # 100% এ সর্বোচ্চ চেষ্টা
CONFIG SET active-defrag-cycle-min 1          # ন্যূনতম CPU %
CONFIG SET active-defrag-cycle-max 25         # সর্বোচ্চ CPU % (25% এর বেশি নয়)</code></pre>
      </div>
      <p>Active defrag চলাকালে Redis ধীরে ধীরে অবজেক্টগুলোকে নতুন জায়গায় সরিয়ে ফাঁকা জায়গা একত্র করে। এটি CPU খরচ করে এবং Redis একক-থ্রেডেড হওয়ায় latency সামান্য বাড়াতে পারে — তাই <code>cycle-max</code> সীমিত রাখা জরুরি।</p>
      <p><strong>শর্ত:</strong> এটি কেবল <strong>jemalloc</strong> allocator-এর সাথে কাজ করে (Linux-এ ডিফল্ট)। <code>INFO memory</code>-তে <code>mem_allocator</code> দেখে নিশ্চিত হন।</p>
      <p><strong>বিকল্প সমাধান:</strong> defrag-ও যথেষ্ট না হলে সবচেয়ে কার্যকর উপায় হলো replica-কে promote করে পুরনো master রিস্টার্ট করা — রিস্টার্টে fragmentation পুরোপুরি মুছে যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>used_memory</code> আর <code>used_memory_dataset</code>-এর পার্থক্য কী?</li>
        <li>ক্লায়েন্ট আউটপুট বাফার কীভাবে মেমরি ফুলিয়ে দিতে পারে?</li>
      </ul>
    `
  },
  {
    id: "redis-39",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Commands","MGET","MSET"],
    question: "Redis MGET / MSET এবং Pipeline-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p>দুটিই একাধিক অপারেশনের নেটওয়ার্ক খরচ কমায়, কিন্তু ভিন্নভাবে।</p>
      <table>
        <tr><th>দিক</th><th>MGET / MSET</th><th>Pipeline</th></tr>
        <tr><td>কী</td><td>একটিই Redis কমান্ড</td><td>বহু আলাদা কমান্ড, একসাথে পাঠানো</td></tr>
        <tr><td>অ্যাটমিক</td><td><strong>হ্যাঁ</strong> — একক কমান্ড</td><td>না — মাঝে অন্য ক্লায়েন্ট ঢুকতে পারে</td></tr>
        <tr><td>কমান্ড মেশানো</td><td>না — শুধু GET বা শুধু SET</td><td><strong>হ্যাঁ</strong> — যেকোনো মিশ্রণ</td></tr>
        <tr><td>পার্সিং ওভারহেড</td><td>কম (একটি কমান্ড)</td><td>বেশি (প্রতিটি আলাদা)</td></tr>
        <tr><td>RTT</td><td>১</td><td>১</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একই ধরনের অপারেশন → MGET সবচেয়ে ভালো
const values = await redis.mget('user:1', 'user:2', 'user:3');
await redis.mset('a', '1', 'b', '2', 'c', '3');

// ভিন্ন ধরনের অপারেশন মেশাতে হলে → Pipeline
const pipe = redis.pipeline();
pipe.get('user:1');
pipe.hgetall('profile:1');
pipe.zscore('leaderboard', 'user:1');
pipe.expire('session:1', 3600);
const results = await pipe.exec();</code></pre>
      </div>
      <h4>ব্যবহারিক নির্দেশনা</h4>
      <ul>
        <li>শুধু কয়েকটি string কী পড়তে হলে — <strong>MGET</strong>। এটি সবচেয়ে দক্ষ, কারণ Redis একবারই কমান্ড পার্স করে।</li>
        <li>বিভিন্ন টাইপ ও অপারেশন লাগলে — <strong>Pipeline</strong>।</li>
        <li>অ্যাটমিকতা লাগলে — <strong>MULTI/EXEC বা Lua</strong> (pipeline যথেষ্ট নয়)।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ সতর্কতা</h4>
      <ul>
        <li><strong><code>MSET</code> অ্যাটমিক কিন্তু সব-বা-কিছুই-না নয় এমন কিছু নেই</strong> — হয় সব কী সেট হবে, নয়তো কিছুই না। এটি সুবিধা, কিন্তু মনে রাখতে হবে এটি পুরনো মান যাচাই করে না। শর্তসাপেক্ষ সেট চাইলে <code>MSETNX</code>।</li>
        <li><strong>Redis Cluster-এ <code>MGET</code> ব্যর্থ হতে পারে</strong> (<code>CROSSSLOT</code>) যদি কী-গুলো ভিন্ন slot-এ থাকে। Hash tag <code>{}</code> ব্যবহার করে একই slot নিশ্চিত করুন, অথবা cluster-সচেতন ক্লায়েন্টের উপর ছেড়ে দিন যা নিজে ভাগ করে পাঠায়।</li>
        <li><strong>খুব বড় MGET এড়ান:</strong> ১০,০০০ কী একসাথে চাইলে রেসপন্স বিশাল হয় এবং একক-থ্রেডেড Redis সেই সময় ব্লক থাকে। ৫০০–১০০০-এর ব্যাচে ভাগ করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Pipeline-এর ভেতরে MULTI/EXEC ব্যবহার করা যায় কি?</li>
        <li>Cluster-এ pipeline কীভাবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "redis-40",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Cluster","Split-Brain","Min-Replicas"],
    question: "Redis Sentinel / Cluster-এ Split-Brain Condition কীভাবে min-replicas-to-write দিয়ে আটকাবেন?",
    answer: `
      <p><strong>Split-brain</strong> হলো এমন অবস্থা যেখানে নেটওয়ার্ক ভাগ হয়ে যাওয়ায় <em>দুটি নোড একই সাথে নিজেকে master ভাবে</em> এবং দুজনেই write গ্রহণ করে। ফলে ডেটা দুই দিকে আলাদা হয়ে যায় এবং সংযোগ ফিরলে একদিকের write চিরতরে হারিয়ে যায়।</p>
      <h4>কীভাবে ঘটে</h4>
      <ol>
        <li>Master M এবং replica R1, R2 — সবাই সুস্থ।</li>
        <li>নেটওয়ার্ক ভাগ হলো: M একদিকে, R1/R2 ও Sentinel-রা অন্যদিকে।</li>
        <li>Sentinel-রা M-কে মৃত ভেবে R1-কে নতুন master বানাল।</li>
        <li>কিন্তু M আসলে বেঁচে আছে এবং যেসব ক্লায়েন্ট তার সাথে সংযুক্ত তারা এখনও তাকে write পাঠাচ্ছে।</li>
        <li>নেটওয়ার্ক ফিরলে M-কে replica বানানো হয় — এবং তার সব write <strong>মুছে যায়</strong>।</li>
      </ol>
      <h4>প্রতিরোধ: min-replicas সেটিংস</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># master তখনই write নেবে যখন অন্তত 1টি replica
# সর্বোচ্চ 10 সেকেন্ডের মধ্যে সংযুক্ত ও সাড়া দিচ্ছে
min-replicas-to-write 1
min-replicas-max-lag  10</code></pre>
      </div>
      <p>এই সেটিংসের ফলে বিচ্ছিন্ন হয়ে পড়া পুরনো master তার replica-দের হারানোর ১০ সেকেন্ডের মধ্যেই <strong>write নেওয়া বন্ধ করে দেয়</strong> এবং এরর ফেরত দেয়। ফলে হারানো write-এর জানালা অনেক ছোট হয়ে আসে।</p>
      <p><strong>এটি একটি সচেতন আপস:</strong> আপনি availability-র কিছুটা ছেড়ে দিয়ে consistency কিনছেন। replica-রা ডাউন থাকলে master নিজেও write নেবে না — অর্থাৎ সিস্টেম বরং <em>অনুপলব্ধ</em> হবে, কিন্তু ভুল ডেটা তৈরি করবে না। CAP theorem-এর বাস্তব প্রয়োগ।</p>
      <h4>Sentinel-এ অতিরিক্ত সুরক্ষা</h4>
      <ul>
        <li><strong>বিজোড় সংখ্যক Sentinel</strong> (৩ বা ৫) চালান, আলাদা আলাদা মেশিনে বা availability zone-এ।</li>
        <li><code>sentinel monitor mymaster &lt;ip&gt; &lt;port&gt; 2</code> — quorum সেট করুন সংখ্যাগরিষ্ঠতায় (৩ Sentinel হলে ২)। এতে সংখ্যালঘু অংশ কখনও failover শুরু করতে পারবে না।</li>
        <li>Sentinel-দের অ্যাপ্লিকেশন সার্ভারে রাখলে নেটওয়ার্ক দৃষ্টিভঙ্গি ক্লায়েন্টের কাছাকাছি হয়, যা ভুল failover কমায়।</li>
      </ul>
      <h4>Redis Cluster-এ</h4>
      <p>Cluster-এ একই সুরক্ষা আসে <code>cluster-require-full-coverage</code> ও নোডের সংখ্যাগরিষ্ঠতা থেকে। যে অংশে master-দের সংখ্যাগরিষ্ঠতা নেই, সেটি নিজে থেকেই কাজ বন্ধ করে দেয় — তাই সেখানে নতুন master নির্বাচিত হতে পারে না।</p>
      <p><strong>বাস্তবতা মেনে নিন:</strong> Redis-এর অ্যাসিঙ্ক্রোনাস রেপ্লিকেশনে failover-এ <em>কিছু</em> write হারানো সবসময়ই সম্ভব। সম্পূর্ণ শূন্য ডেটা-ক্ষতি দরকার হলে Redis সঠিক পছন্দ নয় — consensus-ভিত্তিক স্টোর দরকার।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>WAIT</code> কমান্ড কীভাবে ডেটা-ক্ষতির ঝুঁকি কমায়?</li>
        <li>Failover-এর সময় ক্লায়েন্ট কীভাবে নতুন master খুঁজে পায়?</li>
      </ul>
    `
  },
  {
    id: "redis-41",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures","Sets","Intersection"],
    question: "Redis Sets (SADD, SINTER, SUNION, SDIFF) দিয়ে Mutual Friends কীভাবে বের করবেন?",
    answer: `
      <p>Redis Set-এর সবচেয়ে শক্তিশালী দিক হলো <strong>সেট-অপারেশনগুলো সার্ভারেই হয়</strong> — ডেটা অ্যাপ্লিকেশনে টেনে এনে মেলাতে হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>await redis.sadd('friends:rahim', 'karim', 'jamal', 'sadia', 'nadia');
await redis.sadd('friends:karim', 'rahim', 'jamal', 'sadia', 'tania');

// পারস্পরিক বন্ধু — একটি কমান্ডেই
const mutual = await redis.sinter('friends:rahim', 'friends:karim');
// → ['jamal', 'sadia']

const mutualCount = await redis.sintercard(2, 'friends:rahim', 'friends:karim');
// শুধু সংখ্যা দরকার হলে (Redis 7+) — ডেটা ট্রান্সফার বাঁচে

// "আপনি চেনেন না এমন বন্ধু" — বন্ধু সুপারিশ
const suggestions = await redis.sdiff('friends:karim', 'friends:rahim');
// → ['tania']  (karim-এর বন্ধু যারা rahim-এর নয়)

// সব বন্ধু একত্রে
await redis.sunion('friends:rahim', 'friends:karim');

// সদস্যপদ যাচাই — O(1)
await redis.sismember('friends:rahim', 'karim');
// একাধিক একসাথে (Redis 6.2+)
await redis.smismember('friends:rahim', 'karim', 'tania');</code></pre>
      </div>
      <h4>জটিলতা ও সতর্কতা</h4>
      <ul>
        <li><code>SINTER</code> O(N×M) — Redis চতুরভাবে সবচেয়ে <em>ছোট</em> সেট থেকে শুরু করে, তাই বাস্তবে অনেক দ্রুত।</li>
        <li><strong>বিশাল সেটে সাবধান:</strong> Redis একক-থ্রেডেড, তাই ১০ লক্ষ সদস্যের দুটি সেটে <code>SINTER</code> চালালে পুরো সার্ভার আটকে যেতে পারে। ফলাফল বড় হলে <code>SINTERSTORE</code> দিয়ে নতুন কী-তে রেখে তারপর <code>SSCAN</code> দিয়ে ধীরে ধীরে পড়ুন।</li>
        <li><code>SMEMBERS</code> O(N) — প্রোডাকশনে বড় সেটে ব্যবহার করবেন না, <code>SSCAN</code> ব্যবহার করুন।</li>
      </ul>
      <h4>অন্যান্য বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>ইউনিক ভিজিটর:</strong> <code>SADD visitors:today userId</code> — ডুপ্লিকেট আপনাআপনি বাদ। (নিখুঁত গণনা দরকার হলে Set; আনুমানিক হলে HyperLogLog অনেক কম মেমরিতে।)</li>
        <li><strong>ট্যাগ ফিল্টারিং:</strong> "যেসব পোস্টে 'redis' এবং 'nodejs' দুটোই আছে" — দুটি ট্যাগ-সেটের <code>SINTER</code>।</li>
        <li><strong>র‍্যান্ডম নির্বাচন:</strong> <code>SRANDMEMBER</code> (না সরিয়ে) বা <code>SPOP</code> (সরিয়ে) — লটারি বা র‍্যান্ডম সুপারিশে।</li>
        <li><strong>অনলাইন ইউজার ট্র্যাকিং:</strong> সেটে যোগ/বাদ এবং <code>SCARD</code> দিয়ে গণনা।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis Cluster-এ <code>SINTER</code> কেন সমস্যা হতে পারে?</li>
        <li>লক্ষ সদস্যের সেটে intersection কীভাবে নিরাপদে করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-42",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["AOF","AOF Rewrite","bgrewriteaof"],
    question: "AOF Rewrite (BGREWRITEAOF) প্রসেস কীভাবে AOF ফাইলের আকার ছোট করে?",
    answer: `
      <p>AOF ফাইল শুধু বাড়তেই থাকে, কারণ এটি প্রতিটি write কমান্ড ক্রমানুসারে যোগ করে যায়। একই কাউন্টার ১০ লক্ষ বার <code>INCR</code> করলে ১০ লক্ষ লাইন জমে — অথচ চূড়ান্ত অবস্থা প্রকাশ করতে একটিমাত্র <code>SET</code> যথেষ্ট।</p>
      <p><code>BGREWRITEAOF</code> ঠিক সেই কাজটি করে: <strong>বর্তমান ডেটাসেট থেকে সবচেয়ে সংক্ষিপ্ত কমান্ড-সেট তৈরি করে</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># আগে (AOF-এ 1,000,000 লাইন)
INCR counter
INCR counter
... (999,998 বার আরও)

# rewrite-এর পরে (1 লাইন)
SET counter 1000000</code></pre>
      </div>
      <h4>প্রক্রিয়াটি কীভাবে নিরাপদে চলে</h4>
      <ol>
        <li>Redis একটি চাইল্ড প্রসেস <strong>fork</strong> করে।</li>
        <li>চাইল্ড বর্তমান মেমরির অবস্থা ঘুরে একটি <em>নতুন</em> সংক্ষিপ্ত AOF ফাইল লেখে।</li>
        <li>এই সময়ে আসা নতুন write কমান্ডগুলো প্যারেন্ট একটি <strong>rewrite buffer</strong>-এ জমা রাখে (এবং পুরনো AOF-এও লিখতে থাকে)।</li>
        <li>চাইল্ড শেষ করলে প্যারেন্ট বাফারের কমান্ডগুলো নতুন ফাইলে যোগ করে।</li>
        <li>নতুন ফাইলটি অ্যাটমিকভাবে পুরনোটির জায়গা নেয়।</li>
      </ol>
      <p>এই পুরো সময় Redis ক্লায়েন্টদের সার্ভ করতে থাকে — কোনো ডাউনটাইম নেই।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># স্বয়ংক্রিয় ট্রিগার
auto-aof-rewrite-percentage 100   # শেষ rewrite-এর তুলনায় 100% বড় হলে
auto-aof-rewrite-min-size 64mb    # তবে অন্তত এই আকার না হলে নয়

# ম্যানুয়ালি চালানো
BGREWRITEAOF

INFO persistence
# aof_rewrite_in_progress:0
# aof_current_size / aof_base_size  → কতটা বেড়েছে
# aof_last_bgrewrite_status:ok</code></pre>
      </div>
      <h4>প্রোডাকশনে যা মনে রাখবেন</h4>
      <ul>
        <li><strong>Fork-এর খরচ:</strong> RDB snapshot-এর মতোই এখানেও copy-on-write মেমরি স্পাইক ও fork-জনিত latency spike হতে পারে। বড় ইনস্ট্যান্সে পর্যাপ্ত ফাঁকা RAM রাখুন।</li>
        <li><strong>একসাথে দুটি নয়:</strong> <code>BGSAVE</code> চলাকালে rewrite শুরু হয় না (এবং উল্টোটাও) — Redis নিজেই সেটি স্থগিত রাখে, কারণ দুটি fork একসাথে খুব ব্যয়বহুল।</li>
        <li><strong>ডিস্ক জায়গা:</strong> rewrite চলাকালে পুরনো ও নতুন দুটি AOF ফাইলই থাকে — ডিস্কে যথেষ্ট জায়গা লাগবে।</li>
        <li><strong>Redis 7-এর Multi-Part AOF:</strong> এখন একটি base ফাইল (RDB ফরম্যাটে) ও কয়েকটি incremental ফাইল ব্যবহার হয়, যা rewrite-কে অনেক দক্ষ করেছে এবং ডিস্ক I/O কমিয়েছে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Rewrite চলাকালে Redis ক্র্যাশ করলে কী হয়?</li>
        <li><code>aof-use-rdb-preamble</code> কী সুবিধা দেয়?</li>
      </ul>
    `
  },
  {
    id: "redis-43",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Performance","RESP Protocol","Serialization"],
    question: "Redis Serialization Protocol (RESP2 / RESP3) কীভাবে কাজ করে?",
    answer: `
      <p><strong>RESP (REdis Serialization Protocol)</strong> হলো ক্লায়েন্ট ও সার্ভারের মধ্যে যোগাযোগের ফরম্যাট। এটি ইচ্ছাকৃতভাবে সরল রাখা হয়েছে — মানুষের পড়ার মতো, দ্রুত পার্স করা যায়, এবং বাইনারি-নিরাপদ।</p>
      <h4>RESP2-এর ডেটা টাইপ</h4>
      <p>প্রতিটি উত্তর একটি বিশেষ অক্ষর দিয়ে শুরু হয় এবং <code>\\r\\n</code> দিয়ে শেষ হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>+OK\\r\\n                 # + Simple String
-ERR unknown command\\r\\n # - Error
:1000\\r\\n               # : Integer
$5\\r\\nhello\\r\\n          # $ Bulk String (দৈর্ঘ্যসহ)
$-1\\r\\n                 # Null bulk string
*2\\r\\n$3\\r\\nfoo\\r\\n$3\\r\\nbar\\r\\n   # * Array (2টি এলিমেন্ট)

# ক্লায়েন্ট কমান্ডও একটি Array হিসেবেই পাঠায়:
# SET key value  →
*3\\r\\n$3\\r\\nSET\\r\\n$3\\r\\nkey\\r\\n$5\\r\\nvalue\\r\\n</code></pre>
      </div>
      <p><strong>Bulk String-এ দৈর্ঘ্য আগে দেওয়া হয়</strong> — এটিই একে বাইনারি-নিরাপদ করে। ডেটার ভেতরে <code>\\r\\n</code> বা যেকোনো বাইট থাকতে পারে, কারণ পার্সার আগেই জানে কত বাইট পড়তে হবে। কোনো এস্কেপিং লাগে না, তাই পার্সিং অত্যন্ত দ্রুত।</p>
      <h4>RESP3 (Redis 6+) কী যোগ করল</h4>
      <table>
        <tr><th>সমস্যা (RESP2)</th><th>সমাধান (RESP3)</th></tr>
        <tr><td>সব কিছু array — ক্লায়েন্টকে জানতে হতো কোন কমান্ডের ফল কীভাবে ব্যাখ্যা করতে হবে</td><td>নতুন টাইপ: <strong>Map</strong> (<code>%</code>), <strong>Set</strong> (<code>~</code>), <strong>Double</strong> (<code>,</code>), <strong>Boolean</strong> (<code>#</code>), <strong>Big Number</strong></td></tr>
        <tr><td>Pub/Sub-এর জন্য আলাদা কানেকশন লাগত</td><td><strong>Push type</strong> (<code>&gt;</code>) — একই কানেকশনে সার্ভার নিজে থেকে বার্তা পাঠাতে পারে</td></tr>
      </table>
      <p><strong>বাস্তব উদাহরণ:</strong> RESP2-তে <code>HGETALL</code> ফেরত দিত একটি সমতল array (<code>[field1, value1, field2, value2]</code>) — ক্লায়েন্ট লাইব্রেরিকে সেটি ম্যানুয়ালি অবজেক্টে রূপান্তর করতে হতো। RESP3-তে এটি সরাসরি একটি <strong>Map</strong> টাইপ হিসেবে আসে।</p>
      <h4>Client-side caching — RESP3-এর সবচেয়ে বড় ফিচার</h4>
      <p>Push type-এর কারণে Redis এখন ক্লায়েন্টকে সক্রিয়ভাবে জানাতে পারে "তুমি যে কী ক্যাশ করে রেখেছিলে সেটি বদলে গেছে"। ফলে ক্লায়েন্ট নিজের মেমরিতে নিরাপদে ক্যাশ রাখতে পারে এবং Redis-এ রাউন্ড-ট্রিপও বেঁচে যায় (<em>client-side caching / tracking</em>)।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>HELLO 3          # RESP3-তে স্যুইচ করা (হ্যান্ডশেক)
CLIENT TRACKING ON</code></pre>
      </div>
      <p>RESP3 পুরোপুরি ঐচ্ছিক ও পশ্চাৎ-সঙ্গতিপূর্ণ — ক্লায়েন্ট <code>HELLO 3</code> না পাঠালে সার্ভার RESP2-তেই কথা বলে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Client-side caching-এ invalidation কীভাবে নিশ্চিত হয়?</li>
        <li>RESP এত সরল রাখার সুবিধা কী?</li>
      </ul>
    `
  },
  {
    id: "redis-44",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Vector Search","AI","HNSW"],
    question: "Redis Vector Search (RediSearch HNSW Index) কী?",
    answer: `
      <p><strong>Vector search</strong> হলো অর্থের ভিত্তিতে খোঁজা — হুবহু শব্দ মেলানো নয়। টেক্সট, ছবি বা অডিওকে একটি এমবেডিং মডেল দিয়ে সংখ্যার ভেক্টরে (যেমন ১৫৩৬-মাত্রিক) রূপান্তর করা হয়, যেখানে <em>অর্থগতভাবে কাছাকাছি জিনিসের ভেক্টরও জ্যামিতিকভাবে কাছাকাছি থাকে</em>।</p>
      <p>ফলে "সস্তা ল্যাপটপ" সার্চ করলে "বাজেট নোটবুক"-ও পাওয়া যায় — যদিও একটি শব্দও মেলেনি। RAG (Retrieval-Augmented Generation) অ্যাপ্লিকেশনের ভিত্তি এটিই।</p>
      <h4>HNSW — কেন দরকার</h4>
      <p>১ কোটি ভেক্টরের সাথে নিখুঁতভাবে দূরত্ব হিসাব করা (brute force KNN) অত্যন্ত ধীর। <strong>HNSW (Hierarchical Navigable Small World)</strong> একটি আনুমানিক (ANN) অ্যালগরিদম যা বহুস্তরীয় গ্রাফ তৈরি করে — উপরের স্তরে দূরপাল্লার "হাইওয়ে" সংযোগ, নিচের স্তরে সূক্ষ্ম স্থানীয় সংযোগ। খোঁজার সময় উপর থেকে নেমে দ্রুত সঠিক এলাকায় পৌঁছানো যায়।</p>
      <p>এতে গতি হাজার গুণ বাড়ে, বিনিময়ে ফলাফল ~৯৫-৯৯% নিখুঁত (কিছু প্রতিবেশী মিস হতে পারে) — যা সার্চে সম্পূর্ণ গ্রহণযোগ্য।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>FT.CREATE idx:docs ON HASH PREFIX 1 doc: SCHEMA
  content TEXT
  embedding VECTOR HNSW 6
    TYPE FLOAT32
    DIM 1536                 # এমবেডিং মডেলের মাত্রা
    DISTANCE_METRIC COSINE   # টেক্সটে সাধারণত COSINE

# নিকটতম 5টি ডকুমেন্ট (KNN)
FT.SEARCH idx:docs "*=>[KNN 5 @embedding $vec AS score]"
  PARAMS 2 vec "&lt;binary float32 buffer&gt;"
  SORTBY score
  DIALECT 2</code></pre>
      </div>
      <h4>টিউনিংয়ের প্যারামিটার</h4>
      <ul>
        <li><code>M</code> — প্রতিটি নোডের সংযোগ সংখ্যা। বেশি হলে নির্ভুলতা ও মেমরি দুটোই বাড়ে।</li>
        <li><code>EF_CONSTRUCTION</code> — ইনডেক্স তৈরির সময় কতটা যত্ন নেওয়া হবে (বেশি = ভালো ইনডেক্স, ধীর নির্মাণ)।</li>
        <li><code>EF_RUNTIME</code> — খোঁজার সময় কতগুলো প্রার্থী দেখা হবে (বেশি = নির্ভুল, ধীর)।</li>
      </ul>
      <h4>Redis-কে ভেক্টর DB হিসেবে ব্যবহারের ট্রেড-অফ</h4>
      <ul>
        <li>✅ <strong>খুব দ্রুত</strong> (সব RAM-এ), এবং ক্যাশ, সেশন ও ভেক্টর একই সিস্টেমে — অবকাঠামো সরল থাকে।</li>
        <li>✅ <strong>Hybrid search</strong> — ভেক্টর সাদৃশ্যের সাথে সাধারণ ফিল্টার (দাম, ক্যাটাগরি) একসাথে দেওয়া যায়।</li>
        <li>❌ <strong>মেমরি ব্যয়বহুল:</strong> ১০ লক্ষ × ১৫৩৬ মাত্রা × ৪ বাইট ≈ <strong>৬ GB</strong> শুধু ভেক্টরের জন্য, ইনডেক্স ওভারহেড আলাদা। কোটি ভেক্টরে ডিস্ক-ভিত্তিক সমাধান (Milvus, pgvector, Qdrant) সাশ্রয়ী।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>COSINE, L2 ও IP distance metric-এর মধ্যে কখন কোনটি?</li>
        <li>ভেক্টর quantization কীভাবে মেমরি কমায়?</li>
      </ul>
    `
  },
  {
    id: "redis-45",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Security","TLS","stunnel"],
    question: "Redis TLS/SSL Encryption কীভাবে কনফিগার করা হয়?",
    answer: `
      <p>Redis 6 থেকে TLS নেটিভভাবে সমর্থিত। এর আগে stunnel বা spiped-এর মতো বাইরের প্রক্সি লাগত।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># redis.conf
port 0                    # ⚠️ সাধারণ (এনক্রিপশনহীন) পোর্ট সম্পূর্ণ বন্ধ
tls-port 6379

tls-cert-file /etc/redis/tls/redis.crt
tls-key-file  /etc/redis/tls/redis.key
tls-ca-cert-file /etc/redis/tls/ca.crt

tls-auth-clients yes      # mTLS — ক্লায়েন্টকেও সার্টিফিকেট দিতে হবে
tls-protocols "TLSv1.2 TLSv1.3"

# replica ও cluster ট্রাফিকও এনক্রিপ্ট করুন
tls-replication yes
tls-cluster yes</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
  host: 'redis.example.com',
  port: 6379,
  tls: {
    ca:   fs.readFileSync('/etc/redis/tls/ca.crt'),
    cert: fs.readFileSync('/etc/redis/tls/client.crt'),  // mTLS হলে
    key:  fs.readFileSync('/etc/redis/tls/client.key'),
    // ⚠️ কখনও rejectUnauthorized: false দেবেন না প্রোডাকশনে —
    //    এটি MITM আক্রমণের দরজা খুলে দেয়
    servername: 'redis.example.com'   // SNI ও হোস্টনেম যাচাইয়ের জন্য
  }
});</code></pre>
      </div>
      <h4>গুরুত্বপূর্ণ বিবেচনা</h4>
      <ul>
        <li><strong><code>port 0</code> দিতে ভুলবেন না:</strong> নাহলে এনক্রিপ্টেড ও অ-এনক্রিপ্টেড দুটি পোর্টই খোলা থাকবে, এবং কেউ ভুল করে বা ইচ্ছাকৃতভাবে অনিরাপদ পোর্টে সংযোগ করতে পারবে।</li>
        <li><strong>পারফরম্যান্স খরচ:</strong> TLS হ্যান্ডশেক ও এনক্রিপশনে CPU লাগে — সাধারণত থ্রুপুট <strong>১০-৩০%</strong> কমে। কানেকশন পুলিং ও keep-alive ব্যবহার করলে হ্যান্ডশেকের খরচ অনেকটাই এড়ানো যায়।</li>
        <li><strong>সার্টিফিকেট মেয়াদ:</strong> সার্টিফিকেট শেষ হয়ে গেলে পুরো সিস্টেম হঠাৎ Redis-এ সংযোগ হারাবে। স্বয়ংক্রিয় আবর্তন ও মেয়াদ-পূর্ব alert রাখুন।</li>
        <li><strong>বিকল্প বিবেচনা করুন:</strong> Redis যদি একটি বিশ্বস্ত প্রাইভেট নেটওয়ার্ক বা VPC-র ভেতরে থাকে এবং latency অত্যন্ত গুরুত্বপূর্ণ হয়, তখন নেটওয়ার্ক-স্তরের বিচ্ছিন্নতা (security group, private subnet) + service mesh-এর mTLS-ও গ্রহণযোগ্য পথ।</li>
      </ul>
      <p><strong>সবচেয়ে জরুরি নিয়ম:</strong> Redis কখনও পাবলিক ইন্টারনেটে এক্সপোজ করবেন না। ইন্টারনেটে খোলা, পাসওয়ার্ডবিহীন Redis ইনস্ট্যান্স স্ক্যান করে দখল করে নেওয়া অত্যন্ত সাধারণ আক্রমণ। TLS-এর পাশাপাশি <code>bind</code>, ফায়ারওয়াল, ACL ও শক্তিশালী পাসওয়ার্ড — সবই দরকার।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>mTLS কখন প্রয়োজন, কখন শুধু server-side TLS যথেষ্ট?</li>
        <li>TLS চালু করার পর latency বেড়েছে — কী টিউন করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-46",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Benchmark","redis-benchmark","Tuning"],
    question: "redis-benchmark টুল দিয়ে Redis Throughput (RPS) কীভাবে টেস্ট করবেন?",
    answer: `
      <p><code>redis-benchmark</code> Redis-এর সাথেই আসা একটি লোড-টেস্টিং টুল, যা দিয়ে থ্রুপুট (RPS) ও latency মাপা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># মৌলিক: 50টি সমান্তরাল ক্লায়েন্ট, 100000 রিকোয়েস্ট
redis-benchmark -h 127.0.0.1 -p 6379 -c 50 -n 100000

# শুধু নির্দিষ্ট কমান্ড টেস্ট করুন (সব চালালে অর্থহীন সময় নষ্ট)
redis-benchmark -t set,get,lpush,zadd -n 100000 -q
# -q = quiet, শুধু সারসংক্ষেপ

# বাস্তবসম্মত পেলোড সাইজ দিন — ডিফল্ট 3 বাইট অবাস্তব
redis-benchmark -t set,get -d 1024 -n 100000

# Pipeline-এর প্রভাব দেখুন (নাটকীয় পার্থক্য)
redis-benchmark -t get -n 100000 -P 16

# নিজের কমান্ড ও র‍্যান্ডম কী
redis-benchmark -n 10000 -r 100000 eval "return redis.call('GET', KEYS[1])" 1 key:__rand_int__

# শুধু latency দেখা
redis-cli --latency          # চলমান গড়
redis-cli --latency-history  # সময়ের সাথে পরিবর্তন</code></pre>
      </div>
      <h4>ফলাফল ব্যাখ্যা করার সময় যা মনে রাখবেন</h4>
      <ul>
        <li><strong>ডিফল্ট সেটিংস বিভ্রান্তিকর:</strong> ৩ বাইটের মান ও একই কী বারবার — এতে অবাস্তবভাবে উচ্চ সংখ্যা আসে। <code>-d</code> দিয়ে আসল পেলোড সাইজ এবং <code>-r</code> দিয়ে র‍্যান্ডম কী ব্যবহার করুন।</li>
        <li><strong>একই মেশিনে চালালে ফল বিকৃত হয়:</strong> benchmark নিজেই CPU খায় এবং নেটওয়ার্ক স্ট্যাক এড়িয়ে যায়। বাস্তব সংখ্যা পেতে আলাদা মেশিন থেকে চালান — তখনই নেটওয়ার্ক latency-র প্রকৃত প্রভাব বোঝা যাবে।</li>
        <li><strong>Pipelining সব বদলে দেয়:</strong> <code>-P 16</code> দিলে RPS প্রায়ই ১০ গুণ বেড়ে যায়। এটিই প্রমাণ করে যে Redis-এর সীমা CPU নয়, বরং নেটওয়ার্ক রাউন্ড-ট্রিপ।</li>
        <li><strong>গড় নয়, percentile দেখুন:</strong> সারসংক্ষেপে p50/p95/p99 থাকে — গড় latency প্রতারণামূলক হতে পারে।</li>
      </ul>
      <h4>বাস্তব ওয়ার্কলোড টেস্ট করার সঠিক উপায়</h4>
      <p><code>redis-benchmark</code> সিন্থেটিক — আপনার আসল কমান্ড-মিশ্রণ, কী-বণ্টন ও ডেটা সাইজ আলাদা। তাই প্রোডাকশনের ধারণা পেতে:</p>
      <ul>
        <li><code>INFO commandstats</code> দেখে বুঝুন কোন কমান্ড কতবার চলে এবং প্রতিটির গড় সময় কত।</li>
        <li><code>INFO latencystats</code> (Redis 7+) কমান্ড-ভিত্তিক latency percentile দেয়।</li>
        <li>সম্ভব হলে <code>MONITOR</code>-এর নমুনা থেকে আসল ট্রাফিক প্যাটার্ন রিপ্লে করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Benchmark-এ ক্লায়েন্ট সংখ্যা (<code>-c</code>) বাড়ালে কী হয়?</li>
        <li>প্রোডাকশনে Redis-এর সীমা কোথায় তা কীভাবে বুঝবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-47",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Lua","Script Caching","EVALSHA"],
    question: "SCRIPT LOAD এবং EVALSHA কীভাবে বারবার Lua Script পাঠানো অপটিমাইজ করে?",
    answer: `
      <p>প্রতিবার সম্পূর্ণ Lua স্ক্রিপ্ট পাঠানো অপচয় — একটি ২ KB স্ক্রিপ্ট সেকেন্ডে ১০,০০০ বার পাঠালে ২০ MB/s অপ্রয়োজনীয় ব্যান্ডউইথ, সাথে প্রতিবার পার্সিংয়ের CPU খরচ।</p>
      <p><code>SCRIPT LOAD</code> স্ক্রিপ্টটি একবার সার্ভারে পাঠিয়ে ক্যাশ করে এবং তার <strong>SHA1 হ্যাশ</strong> ফেরত দেয়। এরপর <code>EVALSHA</code> দিয়ে শুধু সেই ৪০-অক্ষরের হ্যাশ পাঠালেই চলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const script = \`
  local current = tonumber(redis.call('GET', KEYS[1]) or '0')
  if current + tonumber(ARGV[1]) > tonumber(ARGV[2]) then
    return 0
  end
  return redis.call('INCRBY', KEYS[1], ARGV[1])
\`;

// অ্যাপ্লিকেশন চালু হওয়ার সময় একবার
const sha = await redis.script('LOAD', script);   // → "e0e1f9fabfc9d4800c877a703b823ac0578ff831"

async function tryIncrement(key, amount, limit) {
  try {
    return await redis.evalsha(sha, 1, key, amount, limit);
  } catch (err) {
    // Redis রিস্টার্ট / failover হলে স্ক্রিপ্ট ক্যাশ খালি হয়ে যায়
    if (String(err.message).includes('NOSCRIPT')) {
      return await redis.eval(script, 1, key, amount, limit);
    }
    throw err;
  }
}</code></pre>
      </div>
      <h4>NOSCRIPT হ্যান্ডলিং কেন অপরিহার্য</h4>
      <p>স্ক্রিপ্ট ক্যাশ Redis-এর <strong>মেমরিতে</strong> থাকে, ডিস্কে নয়। তাই সার্ভার রিস্টার্ট, failover-এ নতুন master, বা <code>SCRIPT FLUSH</code> চালানো হলে ক্যাশ খালি হয়ে যায় এবং <code>EVALSHA</code> <code>NOSCRIPT</code> এরর দেয়। এটি না সামলালে ডিপ্লয় বা failover-এর পর অ্যাপ্লিকেশন হঠাৎ ব্যর্থ হতে শুরু করবে।</p>
      <p><strong>সবচেয়ে সহজ পথ:</strong> ioredis-এর <code>defineCommand</code> এটি স্বয়ংক্রিয়ভাবে করে — প্রথমে EVALSHA চেষ্টা করে, NOSCRIPT পেলে নিজেই EVAL-এ ফিরে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>redis.defineCommand('limitedIncr', { numberOfKeys: 1, lua: script });
// এখন সাধারণ কমান্ডের মতো ব্যবহার করুন — NOSCRIPT নিজেই সামলাবে
const result = await redis.limitedIncr('counter:1', 5, 100);</code></pre>
      </div>
      <h4>সম্পর্কিত কমান্ড</h4>
      <ul>
        <li><code>SCRIPT EXISTS &lt;sha&gt;</code> — স্ক্রিপ্ট ক্যাশে আছে কি না যাচাই।</li>
        <li><code>SCRIPT FLUSH</code> — সব ক্যাশড স্ক্রিপ্ট মুছে ফেলা।</li>
        <li><code>SCRIPT KILL</code> — আটকে থাকা স্ক্রিপ্ট থামানো (যদি সেটি এখনও কোনো write না করে থাকে; করে ফেললে <code>SHUTDOWN NOSAVE</code> ছাড়া উপায় নেই)।</li>
      </ul>
      <p><strong>Redis 7+ এর বিকল্প — Functions:</strong> <code>FUNCTION LOAD</code> দিয়ে লোড করা ফাংশন <strong>RDB/AOF-এ persist হয়</strong> এবং replica-তেও রেপ্লিকেট হয়। ফলে NOSCRIPT সমস্যাই থাকে না। নতুন প্রজেক্টে এটিই প্রস্তাবিত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis Cluster-এ EVALSHA সব নোডে কাজ করবে কি?</li>
        <li>Redis Functions ও Lua script-এর মূল পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "redis-48",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Replication","PSYNC","Partial Resync"],
    question: "Redis Master-Replica Replication-এ Full Resync vs Partial Resync (PSYNC) কী?",
    answer: `
      <p>Redis replication-এ একটি replica প্রথমবার সংযুক্ত হলে বা সংযোগ ছিঁড়ে গেলে দুটি পথ থাকে — ব্যয়বহুল <strong>Full Resync</strong> অথবা সস্তা <strong>Partial Resync</strong>। <code>PSYNC</code> কমান্ড ঠিক করে কোনটি হবে।</p>
      <h4>Full Resync</h4>
      <ol>
        <li>Master একটি <code>BGSAVE</code> চালিয়ে RDB স্ন্যাপশট তৈরি করে (fork, COW — মেমরি ও CPU খরচ)।</li>
        <li>এই সময়ে আসা নতুন write গুলো একটি <strong>replication buffer</strong>-এ জমা হয়।</li>
        <li>RDB ফাইলটি নেটওয়ার্কে replica-তে পাঠানো হয়।</li>
        <li>Replica নিজের ডেটা মুছে RDB লোড করে, তারপর বাফারে জমা কমান্ডগুলো প্রয়োগ করে।</li>
      </ol>
      <p>বড় ডেটাসেটে এটি অত্যন্ত ব্যয়বহুল — কয়েক গিগাবাইট ডিস্ক লেখা ও নেটওয়ার্ক ট্রান্সফার, master-এ fork-জনিত latency spike।</p>
      <h4>Partial Resync — যা এটিকে বাঁচায়</h4>
      <p>সাময়িক নেটওয়ার্ক বিভ্রাটে পুরো ডেটাসেট আবার পাঠানো অর্থহীন। তাই Redis দুটি জিনিস রাখে:</p>
      <ul>
        <li><strong>Replication ID:</strong> master-এর ডেটা-ইতিহাসের একটি পরিচয়।</li>
        <li><strong>Replication offset:</strong> এখন পর্যন্ত কত বাইট রেপ্লিকেশন স্ট্রিম পাঠানো হয়েছে।</li>
        <li><strong>Replication backlog:</strong> master-এর মেমরিতে একটি বৃত্তাকার বাফার, যেখানে সাম্প্রতিক write কমান্ডগুলো জমা থাকে।</li>
      </ul>
      <p>Replica পুনরায় সংযুক্ত হয়ে বলে "আমি অমুক replication ID-র অমুক offset পর্যন্ত পেয়েছি"। যদি সেই offset এখনও backlog-এ থাকে, master কেবল <strong>বাকি অংশটুকু</strong> পাঠায় — সেকেন্ডের ভগ্নাংশে সিঙ্ক সম্পূর্ণ।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># Backlog বড় করলে বেশি সময়ের বিভ্রাট সামলানো যায়
repl-backlog-size 256mb       # ডিফল্ট মাত্র 1mb — write-heavy সিস্টেমে অপর্যাপ্ত
repl-backlog-ttl 3600         # replica না ফিরলে কতক্ষণ backlog রাখবে

# পর্যবেক্ষণ
INFO replication
# master_repl_offset:123456789
# slave0:...,offset=123456700,lag=0     ← পার্থক্যই হলো lag

INFO stats
# sync_full:2              ← কতবার full resync হয়েছে (কম হওয়া ভালো)
# sync_partial_ok:45       ← কতবার partial সফল
# sync_partial_err:3       ← backlog ছোট হওয়ায় ব্যর্থ → backlog বাড়ান</code></pre>
      </div>
      <p><strong>টিউনিংয়ের নিয়ম:</strong> <code>sync_partial_err</code> বা <code>sync_full</code> বাড়তে থাকলে backlog ছোট। আনুমানিক হিসাব — <code>repl-backlog-size ≥ (গড় write bytes/sec) × (সহনীয় বিচ্ছিন্নতার সেকেন্ড)</code>।</p>
      <h4>Redis 4.0-এর উন্নতি</h4>
      <p>আগে master <strong>failover</strong> হলে নতুন master-এর replication ID আলাদা হওয়ায় সব replica-কে full resync করতে হতো — যা ঠিক সবচেয়ে সংকটময় মুহূর্তে সবচেয়ে বড় ভার ফেলত। Redis 4.0 থেকে দুটি replication ID রাখা হয় (বর্তমান ও পূর্ববর্তী), ফলে promote হওয়া replica পুরনো ইতিহাস চিনতে পারে এবং অন্যরা <strong>partial resync</strong> করতে পারে।</p>
      <p><strong>Diskless replication:</strong> <code>repl-diskless-sync yes</code> দিলে RDB ডিস্কে না লিখে সরাসরি সকেটে পাঠানো হয় — ধীর ডিস্ক কিন্তু দ্রুত নেটওয়ার্ক থাকলে অনেক দ্রুত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Replication lag বেশি হলে কী কী কারণ হতে পারে?</li>
        <li>Master ও replica-র মধ্যে ডেটা মিলছে না — কীভাবে যাচাই করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-49",
    category: "Redis",
    difficulty: "Intermediate",
    tags: ["Data Structures","HyperLogLog","PFMERGE"],
    question: "PFMERGE দিয়ে দুটি HyperLogLog ক্যাশকে কীভাবে অটমিকালি মার্জ করবেন?",
    answer: `
      <p><code>PFMERGE</code> একাধিক HyperLogLog-কে একত্র করে একটি নতুন HLL তৈরি করে, যা মূল সেটগুলোর <strong>union</strong>-এর cardinality ধারণ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># দৈনিক ইউনিক ভিজিটর
PFADD visitors:mon user1 user2 user3
PFADD visitors:tue user2 user3 user4

# সাপ্তাহিক ইউনিক ভিজিটর — নতুন কী-তে মার্জ
PFMERGE visitors:week visitors:mon visitors:tue
PFCOUNT visitors:week      # → 4 (user1..user4), 6 নয়

# অথবা মার্জ না করেই সরাসরি union গণনা
PFCOUNT visitors:mon visitors:tue    # → 4</code></pre>
      </div>
      <h4>কেন এটি গুরুত্বপূর্ণ</h4>
      <p>সাধারণ কাউন্টার দিয়ে এটি অসম্ভব। সোমবার ৩ জন, মঙ্গলবার ৩ জন — যোগ করলে ৬, কিন্তু প্রকৃত ইউনিক সংখ্যা ৪, কারণ user2 ও user3 দুই দিনই এসেছেন। HLL <strong>ডুপ্লিকেট বাদ দিয়ে সঠিক union</strong> দেয়, অথচ কোনো ইউজার আইডি সংরক্ষণ করে না।</p>
      <h4>কীভাবে কাজ করে</h4>
      <p>প্রতিটি HLL হলো ১৬,৩৮৪টি রেজিস্টারের একটি অ্যারে, যেখানে প্রতিটি রেজিস্টার একটি বাকেটে দেখা সর্বোচ্চ "শুরুর শূন্যের সংখ্যা" ধরে রাখে। মার্জ করা মানে কেবল <strong>প্রতিটি অবস্থানে সর্বোচ্চ মান নেওয়া</strong> (element-wise max)।</p>
      <p>এই সরল অপারেশনের দুটি চমৎকার গাণিতিক গুণ আছে:</p>
      <ul>
        <li><strong>অ্যাটমিক ও lossless:</strong> মার্জে কোনো বাড়তি ত্রুটি যোগ হয় না — ফলাফল ঠিক ততটাই নির্ভুল যেন সব আইটেম প্রথম থেকেই একটি HLL-এ যোগ করা হয়েছিল।</li>
        <li><strong>Idempotent ও ক্রম-নিরপেক্ষ:</strong> একই HLL দুবার মার্জ করলেও ফল বদলায় না, এবং যেকোনো ক্রমে মার্জ করা যায়। ডিস্ট্রিবিউটেড অ্যানালিটিক্সে এটি অত্যন্ত সুবিধাজনক — আলাদা সার্ভারে আলাদা HLL বানিয়ে পরে একত্র করা যায়।</li>
      </ul>
      <h4>বাস্তব ব্যবহার</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// প্রতি ঘণ্টায় আলাদা HLL রাখুন
await redis.pfadd(\`uv:\${date}:\${hour}\`, userId);

// যেকোনো সময়সীমার ইউনিক ভিজিটর — আগে থেকে হিসাব করা লাগে না
const keys = hoursInRange.map(h => \`uv:\${date}:\${h}\`);
const uniqueVisitors = await redis.pfcount(...keys);

// মাসিক রোলআপ তৈরি করে দৈনিকগুলো মুছে ফেলা যায়
await redis.pfmerge(\`uv:2026-08\`, ...dailyKeys);</code></pre>
      </div>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Intersection সম্ভব নয়:</strong> HLL শুধু union সমর্থন করে। "দুই দিনই এসেছেন এমন কতজন" জানতে হলে inclusion-exclusion (<code>|A| + |B| - |A∪B|</code>) ব্যবহার করতে হয়, কিন্তু ছোট ফলাফলে এর আপেক্ষিক ত্রুটি অনেক বড় হয়ে যায় — নির্ভরযোগ্য নয়। এমন দরকার হলে Bitmap ব্যবহার করুন।</li>
        <li>Cluster-এ সব কী একই slot-এ থাকতে হবে (hash tag দিন)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>HLL-এর ০.৮১% ত্রুটি কোথা থেকে আসে?</li>
        <li>নিখুঁত ইউনিক গণনা দরকার হলে কী ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "redis-50",
    category: "Redis",
    difficulty: "Advanced",
    tags: ["Ops","Latency Doctor","LATENCY LATEST"],
    question: "Redis Latency Monitoring (LATENCY DOCTOR / LATENCY LATEST) দিয়ে ল্যাগ ডেবাগ কীভাবে করবেন?",
    answer: `
      <p>Redis latency তদন্তের জন্য দুটি অন্তর্নির্মিত টুল আছে, যেগুলো <strong>slowlog-এর চেয়ে আলাদা</strong> — slowlog শুধু ধীর <em>কমান্ড</em> দেখায়, আর latency monitoring দেখায় Redis-এর <em>অভ্যন্তরীণ ঘটনাগুলো</em> (fork, expire cycle, AOF write) কতটা সময় নিচ্ছে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># নজরদারি চালু করুন — 100ms এর বেশি ইভেন্ট রেকর্ড হবে
CONFIG SET latency-monitor-threshold 100

LATENCY LATEST
# 1) "command"      1699... 250  480   ← ইভেন্ট, শেষ কখন, শেষ মান, সর্বোচ্চ (ms)
# 2) "fork"         1699... 180  340
# 3) "expire-cycle" 1699...  90  150

LATENCY HISTORY fork      # একটি ইভেন্টের ইতিহাস
LATENCY DOCTOR            # মানুষের ভাষায় বিশ্লেষণ ও সুপারিশ
LATENCY RESET             # পরিসংখ্যান পরিষ্কার</code></pre>
      </div>
      <h4><code>LATENCY DOCTOR</code> — সবচেয়ে কার্যকর</h4>
      <p>এটি সংগৃহীত ডেটা বিশ্লেষণ করে পাঠযোগ্য পরামর্শ দেয়, যেমন "fork-এ দেরি হচ্ছে, Transparent Huge Pages বন্ধ করুন" বা "expire cycle দীর্ঘ, বহু কী একসাথে expire হচ্ছে"। তদন্ত শুরু করার সবচেয়ে ভালো জায়গা।</p>
      <h4>ইভেন্টগুলোর অর্থ</h4>
      <table>
        <tr><th>ইভেন্ট</th><th>মানে</th><th>সাধারণ সমাধান</th></tr>
        <tr><td><code>command</code></td><td>একটি কমান্ড ধীর</td><td>slowlog দেখে O(N) কমান্ড খুঁজুন</td></tr>
        <tr><td><code>fork</code></td><td>BGSAVE/AOF rewrite-এর fork ধীর</td><td>THP বন্ধ করুন, ইনস্ট্যান্স ছোট করুন</td></tr>
        <tr><td><code>expire-cycle</code></td><td>বহু কী একসাথে expire হচ্ছে</td><td>TTL-এ jitter দিন</td></tr>
        <tr><td><code>aof-write</code></td><td>ডিস্কে AOF লেখা ধীর</td><td>দ্রুত ডিস্ক, <code>appendfsync everysec</code></td></tr>
        <tr><td><code>eviction-del</code></td><td>maxmemory চাপে কী মোছা</td><td>মেমরি বাড়ান, policy বদলান</td></tr>
      </table>
      <h4>বাইরের latency আলাদা করা</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># নেটওয়ার্ক + Redis মিলিয়ে round-trip (ক্লায়েন্টের দৃষ্টিকোণ)
redis-cli --latency -h redis.example.com

# অন্তর্নিহিত সিস্টেম latency (Redis নয়, কার্নেল/হাইপারভাইজার)
redis-cli --intrinsic-latency 100
# ফল যদি বেশি হয় → সমস্যা Redis-এ নয়, মেশিনেই
# (noisy neighbour VM, CPU throttling, বা swap)</code></pre>
      </div>
      <p><strong><code>--intrinsic-latency</code> খুব দরকারি:</strong> এটি Redis-এর কাজ ছাড়াই শুধু মেশিনের ক্ষমতা মাপে। এখানেই যদি ৫ms পাওয়া যায়, তবে Redis টিউন করে কোনো লাভ হবে না — মেশিন বা ভার্চুয়ালাইজেশন স্তরেই সমস্যা।</p>
      <h4>ডিবাগিংয়ের ক্রম</h4>
      <ol>
        <li><code>LATENCY DOCTOR</code> — Redis নিজে কী বলছে?</li>
        <li><code>SLOWLOG GET</code> — কোনো ধীর কমান্ড আছে কি?</li>
        <li><code>INFO memory</code> — fragmentation ১-এর নিচে? (swap হচ্ছে?)</li>
        <li><code>--intrinsic-latency</code> — মেশিনই কি ধীর?</li>
        <li>সবই ঠিক থাকলে সমস্যা নেটওয়ার্কে বা ক্লায়েন্টের কানেকশন পুলে।</li>
      </ol>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ক্লায়েন্টে latency বেশি কিন্তু Redis-এ সব স্বাভাবিক — কী দেখবেন?</li>
        <li>Latency monitoring চালু রাখার খরচ কত?</li>
      </ul>
    `
  },
  /* ===== SECTION E — RabbitMQ & Kafka (Messaging / Event Streaming) (49) ===== */
  {
    id: "mq-1",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Kafka","Architecture"],
    question: "RabbitMQ (Message Broker) এবং Apache Kafka (Event Streaming Platform)-এর মধ্যে মূল স্থাপত্যগত (Architectural) পার্থক্য কী?",
    answer: `
      <p>উভয়ই ডিস্ট্রিবিউটেড মেসেজিংয়ে ব্যবহৃত হলেও তাদের কাজের দর্শন ও আর্কিটেকচার সম্পূর্ণ ভিন্ন:</p>
      <h4>RabbitMQ (Smart Broker, Dumb Consumer):</h4>
      <ul>
        <li><strong>Architecture:</strong> এটি একটি প্রথাগত <strong>Message Broker</strong> যা AMQP (Advanced Message Queuing Protocol) মান অনুসরণ করে।</li>
        <li><strong>Message Delivery:</strong> মেসেজ কনজিউমার (Consumer) সফলভাবে গ্রহণ (ACK) করা মাত্রই ব্রোকার সেই মেসেজ কিউ (Queue) থেকে <em>মুছে ফেলে</em>।</li>
        <li><strong>Routing:</strong> এক্সচেঞ্জ (Exchange) ও রাউটিং কি-এর মাধ্যমে অত্যন্ত জটিল বার্তা রাউটিং (Complex Routing) করতে পারে।</li>
      </ul>
      <h4>Apache Kafka (Dumb Broker, Smart Consumer):</h4>
      <ul>
        <li><strong>Architecture:</strong> এটি একটি <strong>Distributed Commit Log / Event Streaming Platform</strong>।</li>
        <li><strong>Message Retention:</strong> কনজিউমার কনজিউম করার পরও মেসেজ ডিলেট হয় না। পার্টিশন লগে নির্দিষ্ট রিটেনশন সময় (যেমন 7 days) পর্যন্ত অক্ষত থাকে।</li>
        <li><strong>Replayability:</strong> কনজিউমার চাইলে অফসেট (Offset) রিওয়াইন্ড করে পুরোনো মেসেজ পুনরায় রিড (Replay) করতে পারে।</li>
        <li><strong>Throughput:</strong> প্রতি সেকেন্ডে লাখ লাখ ইভেন্ট স্ট্রিমিং ও বি ডেটা অ্যানালিটিক্সের জন্য অত্যন্ত দ্রুত (Ultra High-Throughput)।</li>
      </ul>
    `
  },
  {
    id: "mq-2",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Kafka","Consumer Group","Rebalancing","Senior"],
    question: "Kafka Consumer Group Rebalancing কীভাবে কাজ করে এবং Rebalance Storm কীভাবে এড়াবেন?",
    answer: `
      <p>একটি Kafka <strong>Consumer Group</strong>-এ একাধিক consumer একসাথে partition ভাগ করে পড়ে — কোনো consumer যোগ/বাদ পড়লে, group coordinator স্বয়ংক্রিয়ভাবে partition পুনর্বণ্টন করে, একে <strong>Rebalancing</strong> বলে।</p>
      <pre class="mermaid">
sequenceDiagram
    participant C1 as Consumer 1
    participant C2 as Consumer 2 (নতুন)
    participant GC as Group Coordinator

    Note over C1,GC: শুরুতে C1 একাই সব ৪টি partition পড়ছিল
    C2->>GC: JoinGroup (নতুন consumer যোগ হলো)
    GC->>C1: Rebalance শুরু — সব consumer প্রসেসিং থামাও
    GC->>C1: নতুন assignment: partition 0,1
    GC->>C2: নতুন assignment: partition 2,3
    Note over C1,C2: Rebalance শেষে উভয়ে সমান্তরালে পড়া শুরু করে
      </pre>
      <span class="diagram-caption">Rebalancing-এর সময় পুরো consumer group সাময়িকভাবে থেমে যায় (stop-the-world), তারপর নতুন assignment নিয়ে আবার শুরু হয়</span>
      <h4>Rebalance কখন ট্রিগার হয়</h4>
      <ul>
        <li>নতুন consumer group-এ যোগ দিলে বা কোনো consumer ক্র্যাশ/ডিসকানেক্ট করলে।</li>
        <li>Topic-এ নতুন partition যোগ হলে।</li>
        <li>একটি consumer <code>session.timeout.ms</code>-এর মধ্যে heartbeat পাঠাতে ব্যর্থ হলে (ধীর প্রসেসিং, GC pause)।</li>
      </ul>
      <h4>Rebalance Storm — সমস্যা</h4>
      <p><strong>Rebalance Storm</strong> ঘটে যখন consumer বারবার group-এ join/leave করে (যেমন pod অস্থিতিশীল, ভুল timeout কনফিগারেশন, ধীর message processing session timeout পার করে ফেলা) — প্রতিটি rebalance-এ পুরো group সাময়িকভাবে প্রসেসিং বন্ধ করে দেয়, বারবার হলে throughput মারাত্মকভাবে কমে যায়।</p>
      <h4>প্রতিরোধের কৌশল</h4>
      <ul>
        <li><strong>Cooperative Sticky Assignor</strong> ব্যবহার করুন (<code>partition.assignment.strategy</code>) — পুরনো Range/RoundRobin assignor প্রতিটি rebalance-এ <em>সব</em> partition পুনরায় assign করে (stop-the-world); Cooperative Sticky শুধু প্রয়োজনীয় অংশটুকু পুনর্বণ্টন করে, বাকি consumer অপ্রভাবিত থাকে।</li>
        <li><strong><code>max.poll.interval.ms</code> যথাযথ সেট করুন</strong> — একটি ব্যাচ প্রসেস করতে যে সময় লাগে তার চেয়ে বেশি রাখুন, নাহলে ধীর প্রসেসিং-কে Kafka "ডেড consumer" ভেবে ভুলবশত rebalance ট্রিগার করবে।</li>
        <li><strong>Static Membership (<code>group.instance.id</code>):</strong> consumer সাময়িক রিস্টার্ট হলে (deployment rolling update) তাকে group থেকে সাথে সাথে বাদ না দিয়ে একটি গ্রেস পিরিয়ড দেওয়া — অপ্রয়োজনীয় rebalance এড়ানো যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Static Membership কীভাবে rolling deployment-এর সময় rebalance storm প্রতিরোধ করে?</li>
      </ul>
    `
  },
  {
    id: "mq-3",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","DLX","Dead Letter Exchange"],
    question: "RabbitMQ Dead Letter Exchange (DLX) কী এবং কোনো মেসেজ কখন Dead Letter হয়?",
    answer: `
      <p><strong>Dead Letter Exchange (DLX):</strong> কোনো সাধারণ কিউতে প্রসেস হতে ব্যর্থ হওয়া মেসেজগুলো নষ্ট বা ড্রপ না করে যে বিশেষ এক্সচেঞ্জে ফরোয়ার্ড করা হয়, তাকে <strong>DLX</strong> বলে।</p>
      <h4>মেসেজ Dead Letter হওয়ার ৩টি প্রধান কারণ:</h4>
      <ol>
        <li>কনজিউমার মেসেজটিকে <code>nack</code> বা <code>reject</code> করেছে এবং <code>requeue = false</code> সেট করা রয়েছে।</li>
        <li>মেসেজের মেয়াদ শেষ হয়ে গেছে (Message TTL Expiry)।</li>
        <li>কিউয়ের সর্বোচ্চ ধারণক্ষমতা সীমা অতিক্রম করেছে (Queue Max-Length Exceeded)।</li>
      </ol>
      <p><em>ব্যবহার:</em> ফেইলড মেসেজ ট্র্যাক করা, অ্যালার্ট পাঠানো বা ম্যানুয়াল ইনস্পেকশনের জন্য ডেডিকেটেড DLQ (Dead Letter Queue)-তে রাখা।</p>
    `
  },
  {
    id: "mq-4",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Prefetch Count","Flow Control"],
    question: "RabbitMQ Prefetch Count (qos) কেন সেট করা আবশ্যক?",
    answer: `
      <p>ডিফল্টভাবে RabbitMQ কিউতে মেসেজ আসামাত্রই Round-robin স্টাইলে কনজিউমারকে গণহারে পাঠাতে থাকে। কনজিউমারের ধারণক্ষমতা না মেপেই আনলিমিটেড মেসেজ পুশ করলে কনজিউমার সার্ভার মেমোরি ফুল হয়ে ক্র্যাশ করতে পারে।</p>
      <p><strong>Prefetch Count (channel.prefetch(10)):</strong> এটি নির্ধারণ করে কনজিউমার নিশ্চিতভাবে আগের প্রসেস হওয়া মেসেজের <code>ACK</code> না পাঠানো পর্যন্ত ব্রোকার সর্বোচ্চ কতটি আন-অ্যাকনলেজড মেসেজ কনজিউমারকে দেবে।</p>
      <p><em>সেরা চর্চা:</em> হেভি টাস্কের জন্য <code>prefetch(1)</code> সেট করলে কেবল আগের টাস্ক শেষ হলেই পরবর্তী টাস্ক কনজিউমার পায় (Fair Dispatching)।</p>
    `
  },
  {
    id: "mq-5",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Partitioning","Consumer Groups"],
    question: "Apache Kafka-তে Topics, Partitions এবং Consumer Groups-এর স্কেলেবিলিটি সম্পর্ক ব্যাখ্যা করুন।",
    answer: `
      <p>Kafka-এর অসামান্য স্কেলেবিলিটির মূল রহস্য হলো **Partitions** এবং **Consumer Groups**-এর যুগল সমন্বয়:</p>
      <ul>
        <li><strong>Topic:</strong> ইভেন্ট স্ট্রিমিংয়ের একটি লজিক্যাল নাম বা ক্যাটাগরি (যেমন: <code>user-events</code>)।</li>
        <li><strong>Partition:</strong> একটি টপিককে একাধিক ফিজিক্যাল লগে ভাগ করে বহু সার্ভারে ছড়িয়ে দেওয়াকে Partition বলে। মেসেজের <code>Record Key</code>-এর হ্যাশ ভ্যালু দিয়ে নির্দিষ্ট পার্টিশনে পাঠানো হয়।</li>
        <li><strong>Consumer Group:</strong> একাধিক কনজিউমার সার্ভিস একসাথে একটি মেম্বার গ্রুপ তৈরি করে টপিকের পার্টিশনগুলো নিজেদের মধ্যে ভাগ করে রিড করে।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ স্কেলিং রুল:</h4>
      <p>একটি পার্টিশন একটি Consumer Group-এর <strong>একটির বেশি কনজিউমার দ্বারা সমান্তরালে পঠিত হতে পারে না</strong>। তাই কোনো টপিকের সমান্তরাল প্রসেসিং সক্ষমতা বাড়াতে চাইলে তার পার্টিশন সংখ্যা বাড়াতে হবে (যেমন ৪টি পার্টিশন থাকলে ৪টি কনজিউমার প্যারালালে রিড করতে পারবে)।</p>
    `
  },
  {
    id: "mq-6",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Producer Acks","Reliability"],
    question: "Kafka Producer Acks (acks=0, acks=1, acks=all / -1)-এর মধ্যে পার্থক্য কী এবং ডাটা লস রোধে সেরা সেটিংস কোনটি?",
    answer: `
      <p>Kafka Producer ইভেন্ট রাইট করার পর ব্রোকারের কাছ থেকে প্রডিউসার কেমন অ্যাকনলেজমেন্টের জন্য অপেক্ষা করবে তা <code>acks</code> কনফিগ দিয়ে ঠিক করা হয়:</p>
      <ul>
        <li><strong>acks = 0:</strong> প্রডিউসার মেসেজ পাঠিয়েই নিশ্চিত ধরে নেয়, ব্রোকারের কোনো অ্যাকনলেজমেন্টের অপেক্ষা করে না। <em>(উচ্চ স্পিড, কিন্তু মেমোরিতে ডাটা লসের প্রবল সম্ভাবনা)</em>।</li>
        <li><strong>acks = 1 (ডিফল্ট):</strong> কেবল <strong>Leader Partition Node</strong> মেসেজটি ডিস্কে রাইট করলে Success ACK দেয়। (লিডার ক্র্যাশ করলে কিন্তু রেপ্লিকাতে সিঙ্ক না হলে ডাটা হারাবে)।</li>
        <li><strong>acks = all (বা -1):</strong> Leader Node এবং তার <strong>In-Sync Replicas (ISR)</strong> প্রত্যেকে মেসেজ স্থায়ীভাবে সেভ করার পরেই কেবল Success ACK দেয়।</li>
      </ul>
      <p><em>Zero Data Loss Settings:</em> <code>acks = all</code> এবং টপিক কনফিগারেশনে <code>min.insync.replicas = 2</code> সেট করা।</p>
    `
  },
  {
    id: "mq-7",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Offset","Consumer Offset Management"],
    question: "Kafka Offset কী? Auto-commit vs Manual Commit-এর মধ্যে কেন Manual Offset Commit বেছে নেওয়া উচিত?",
    answer: `
      <p><strong>Offset:</strong> পার্টিশনের প্রতিটি মেসেজের জন্য একটি ক্রমাগত বৃদ্ধি পাওয়া সিকোয়েন্সিয়াল আইডেন্টিফায়ার (অফসেট নাম্বার)। কনজিউমার কত নম্বর অফসেট পর্যন্ত রিড করেছে তা <code>__consumer_offsets</code> টপিকে সেভ থাকে।</p>
      <h4>Auto-commit (enable.auto.commit = true):</h4>
      <p>প্রতি ৫ সেকেন্ড পর পর অটোমেটিক্যালি অফসেট সেভ হয়ে যায়। কিন্তু কনজিউমার মেসেজ পেয়ে প্রসেস শেষ করার আগেই যদি ক্র্যাশ করে, তবে সেই মেসেজটি আর প্রসেস হবে না (Data Loss)।</p>
      <h4>Manual Commit (enable.auto.commit = false):</h4>
      <p>কনজিউমার কোডে বিজনেস লজিক এবং ডাটাবেজ সেভ সফলভাবে হওয়ার পরেই কেবল <code>consumer.commitSync()</code> বা <code>commitAsync()</code> ডায়নামিক্যালি ম্যানুয়ালি কল করা হয়। এতে ডাটা লস এড়ানো যায়।</p>
    `
  },
  {
    id: "mq-8",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Exactly Once","Transactional Producer"],
    question: "Apache Kafka-তে Exactly-Once Processing Semantics (EOS) কীভাবে অর্জিত হয়?",
    answer: `
      <p>ডিস্ট্রিবিউটেড মেসেজিংয়ে ৩টি সেমান্টিক্স থাকে: <em>At-Most-Once</em>, <em>At-Least-Once</em>, এবং <strong>Exactly-Once</strong>।</p>
      <h4>Kafka EOS-এর ৩টি স্তম্ভ:</h4>
      <ol>
        <li><strong>Idempotent Producer (enable.idempotence = true):</strong> প্রডিউসার নেটওয়ার্ক গ্লিচের জন্য একই মেসেজ পুনরায় পাঠালেও ব্রোকার প্রডিউসার আইডি (PID) ও সিকোয়েন্স নাম্বার দিয়ে চিনে নিয়ে ডুপ্লিকেট রাইট ড্রপ করে দেয়।</li>
        <li><strong>Transactional Coordinator:</strong> Read-Process-Write লুপের মধ্যে ইনপুট অফসেট কমিট এবং আউটপুট মেসেজ রাইট একটি এটমিক ট্রানজেকশনে সম্পাদন করে।</li>
        <li><strong>Read Committed Consumer (isolation.level = read_committed):</strong> কনজিউমার কেবল অসংকীর্ণ ট্রানজেকশনাল রাইট হওয়া ইভেন্টগুলো রিড করে।</li>
      </ol>
    `
  },
  {
    id: "mq-9",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Publish Confirm","Node.js"],
    question: "Node.js (amqplib) দিয়ে RabbitMQ Publisher Confirm এবং Consumer Ack কোড উদাহরণসহ লিখুন।",
    answer: `
      <p>RabbitMQ-তে মেসেজ না হারানোর নিশ্চয়তা দুই প্রান্তেই আলাদাভাবে নিশ্চিত করতে হয়:</p>
      <ul>
        <li><strong>Publisher Confirm:</strong> প্রডিউসার নিশ্চিত হয় যে ব্রোকার মেসেজটি সত্যিই গ্রহণ ও persist করেছে। এটি ছাড়া <code>publish()</code> কেবল সকেটে লিখে দেয় — ব্রোকার ক্র্যাশ করলে মেসেজ নীরবে হারিয়ে যায়।</li>
        <li><strong>Consumer Ack:</strong> কনজিউমার কাজ <em>সফলভাবে শেষ করার পর</em> <code>ack</code> পাঠায়। কনজিউমার প্রসেসিংয়ের মাঝপথে ক্র্যাশ করলে মেসেজ আবার কিউতে ফিরে যায় এবং অন্য ওয়ার্কার সেটি পায় (at-least-once ডেলিভারি)।</li>
      </ul>
      <p>এই দুটির সাথে <strong>durable queue</strong> ও <strong>persistent message</strong> মিলিয়ে ব্যবহার করতে হয় — নাহলে ব্রোকার রিস্টার্টে কিউ-ই মুছে যাবে। যেহেতু ডেলিভারি at-least-once, কনজিউমারকে অবশ্যই <strong>idempotent</strong> হতে হবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const amqp = require('amqplib');

async function setupMessaging() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'order_created_queue';
  await channel.assertQueue(queue, { durable: true });

  // Fair Dispatching
  channel.prefetch(1);

  // Consumer Code with Manual ACK
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      try {
        const order = JSON.parse(msg.content.toString());
        console.log('Processing Order:', order.id);
        
        // Business logic...
        channel.ack(msg); // Successfully processed
      } catch (err) {
        console.error('Error processing, sending to DLQ');
        channel.nack(msg, false, false); // Don't requeue, send to DLX
      }
    }
  });
}
setupMessaging();</code></pre>
      </div>
    `
  },
  {
    id: "mq-10",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Kafka","KafkaJS","Node.js"],
    question: "Node.js (kafkajs) দিয়ে Kafka Producer এবং Consumer Group সেটআপ কীভাবে করবেন?",
    answer: `
      <p>Kafka-তে স্কেলিংয়ের মূল ধারণা হলো <strong>Consumer Group</strong>। একই <code>groupId</code>-র একাধিক কনজিউমার একটি টপিকের পার্টিশনগুলো নিজেদের মধ্যে ভাগ করে নেয় — প্রতিটি পার্টিশন ঠিক একজন কনজিউমারের কাছে যায়।</p>
      <ul>
        <li><strong>সমান্তরালতার সীমা = পার্টিশন সংখ্যা।</strong> ৩টি পার্টিশনে ৫টি কনজিউমার চালালে ২টি বসে থাকবে। তাই পার্টিশন সংখ্যা পরিকল্পনা করে রাখুন (পরে বাড়ানো যায়, কমানো যায় না)।</li>
        <li><strong>Ordering:</strong> ক্রম শুধু <em>একটি পার্টিশনের ভেতরে</em> নিশ্চিত। একই কী-র মেসেজ একই পার্টিশনে যায়, তাই ordering দরকার হলে সঠিক <code>key</code> বাছাই করা জরুরি (যেমন <code>userId</code>)।</li>
        <li><strong>Manual commit:</strong> <code>autoCommit</code> বন্ধ রেখে কাজ শেষে offset কমিট করলে প্রসেসিংয়ের মাঝপথে ক্র্যাশে মেসেজ হারায় না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-payment-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'payment-group' });

async function run() {
  await producer.connect();
  await consumer.connect();

  // Subscribe Consumer Group to Topic
  await consumer.subscribe({ topic: 'payment-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        offset: message.offset
      });
    },
  });
}
run();</code></pre>
      </div>
    `
  },
  {
    id: "mq-11",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Log Compaction","Topics"],
    question: "Kafka Compacted Topics (Log Compaction) কী?",
    answer: `
      <p><strong>Log Compaction</strong> Kafka-র একটি বিশেষ retention নীতি — সময় বা আকার অনুযায়ী পুরনো মেসেজ মুছে ফেলার বদলে এটি <strong>প্রতিটি কী-র সর্বশেষ মানটি চিরকাল ধরে রাখে</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>compaction-এর আগে:
  offset 0: user1 → {name: "Rahim", city: "Dhaka"}
  offset 1: user2 → {name: "Karim"}
  offset 2: user1 → {name: "Rahim", city: "Chittagong"}   ← আপডেট
  offset 3: user3 → {name: "Sadia"}
  offset 4: user2 → null                                   ← tombstone

compaction-এর পরে:
  offset 2: user1 → {name: "Rahim", city: "Chittagong"}
  offset 3: user3 → {name: "Sadia"}
  (user2 সম্পূর্ণ মুছে গেল — tombstone-এর কারণে)</code></pre>
      </div>
      <h4>কেন কার্যকর</h4>
      <p>সাধারণ retention-এ ৭ দিন পর ডেটা মুছে যায়। কিন্তু কিছু টপিক আসলে <em>অবস্থা</em> ধারণ করে — যেমন "প্রতিটি ইউজারের বর্তমান প্রোফাইল"। সেখানে পুরনো ইতিহাস দরকার নেই, কিন্তু <strong>সর্বশেষ মানটি কখনও হারানো চলবে না</strong>।</p>
      <p>Compaction-এর ফলে টপিকটি কার্যত একটি <strong>ডিউরেবল key-value স্টোরে</strong> পরিণত হয়। নতুন একটি সার্ভিস চালু হলে সে টপিকের শুরু থেকে পড়ে সম্পূর্ণ বর্তমান অবস্থা পুনর্গঠন করতে পারে — এটিই event sourcing ও CDC-র ভিত্তি।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>kafka-topics.sh --create --topic user-profiles \\
  --config cleanup.policy=compact \\
  --config min.cleanable.dirty.ratio=0.5 \\   # ৫০% "নোংরা" হলে compaction চালু
  --config delete.retention.ms=86400000 \\    # tombstone কতক্ষণ রাখবে
  --config segment.ms=604800000

# দুটি একসাথেও দেওয়া যায়:
--config cleanup.policy=compact,delete        # compact + সময়সীমা</code></pre>
      </div>
      <h4>Tombstone — মুছে ফেলার উপায়</h4>
      <p>compacted টপিকে একটি কী মুছতে হলে সেই কী-তে <strong><code>null</code> value</strong> পাঠাতে হয়। একে <em>tombstone</em> বলে। compaction চলার সময় Kafka সেই কী-র সব রেকর্ড মুছে দেয়, এবং <code>delete.retention.ms</code> সময় পর tombstone-টিও মুছে ফেলে।</p>
      <p><strong>কেন tombstone কিছুক্ষণ রাখা হয়:</strong> কনজিউমারদের "এই কী মুছে গেছে" খবরটি পাওয়ার সুযোগ দিতে। খুব দ্রুত মুছে ফেললে কোনো পিছিয়ে থাকা কনজিউমার ডিলিটের খবরই পাবে না এবং তার স্থানীয় অবস্থায় কী-টি থেকে যাবে।</p>
      <h4>গুরুত্বপূর্ণ সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>কী থাকা বাধ্যতামূলক</strong> — কী ছাড়া মেসেজ compaction-এ ব্যবহারযোগ্য নয়।</li>
        <li><strong>Compaction তাৎক্ষণিক নয়</strong> — এটি একটি ব্যাকগ্রাউন্ড প্রক্রিয়া। সক্রিয় segment কখনও compact হয় না, তাই সাম্প্রতিক ডুপ্লিকেট কিছুক্ষণ থেকে যায়।</li>
        <li><strong>কনজিউমারকে ডুপ্লিকেট সহ্য করতে হবে</strong> — compaction গ্যারান্টি দেয় না যে প্রতিটি কী ঠিক একবার আসবে।</li>
      </ul>
      <p><strong>বাস্তব ব্যবহার:</strong> Kafka নিজেই <code>__consumer_offsets</code> টপিকে compaction ব্যবহার করে। এছাড়া Kafka Streams-এর state store backup, Debezium-এর CDC ও কনফিগারেশন বিতরণে এটি ব্যাপকভাবে ব্যবহৃত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Compacted টপিক থেকে সম্পূর্ণ state কীভাবে পুনর্গঠন করবেন?</li>
        <li><code>min.cleanable.dirty.ratio</code> কমালে কী প্রভাব পড়বে?</li>
      </ul>
    `
  },
  {
    id: "mq-12",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Quorum Queues","Raft"],
    question: "RabbitMQ Quorum Queues কী এবং এটি কেন ব্যবহার করা হয়?",
    answer: `
      <p><strong>Quorum Queue</strong> হলো RabbitMQ 3.8+ এর নতুন প্রজন্মের রেপ্লিকেটেড কিউ, যা <strong>Raft consensus</strong> অ্যালগরিদমের উপর তৈরি। এটি পুরনো <em>mirrored (classic HA) queue</em>-এর প্রতিস্থাপন — যেগুলো এখন deprecated।</p>
      <h4>Mirrored Queue-এর সমস্যা</h4>
      <p>পুরনো mirrored queue-তে রেপ্লিকেশন ছিল অনেকটা "best effort"। নেটওয়ার্ক পার্টিশন বা নোড ক্র্যাশের সময় নীরবে মেসেজ হারানো, split-brain এবং দীর্ঘ সিঙ্ক সময় — এসব ছিল পরিচিত সমস্যা। এর কোনো আনুষ্ঠানিক correctness প্রমাণ ছিল না।</p>
      <h4>Quorum Queue কীভাবে ভালো</h4>
      <ul>
        <li><strong>Raft-ভিত্তিক:</strong> প্রতিটি কিউয়ের একটি leader ও কয়েকটি follower থাকে। একটি মেসেজ তখনই confirm হয় যখন <strong>সংখ্যাগরিষ্ঠ</strong> রেপ্লিকা সেটি লিখেছে — গাণিতিকভাবে প্রমাণিত নিরাপত্তা।</li>
        <li><strong>Split-brain অসম্ভব:</strong> সংখ্যাগরিষ্ঠতা ছাড়া কোনো leader নির্বাচিত হতে পারে না, তাই দুটি leader একসাথে থাকা অসম্ভব।</li>
        <li><strong>পূর্বানুমেয় পুনরুদ্ধার:</strong> নোড ফিরে এলে Raft log থেকে ধারাবাহিকভাবে সিঙ্ক হয়।</li>
        <li><strong>বিল্ট-ইন poison message হ্যান্ডলিং:</strong> <code>x-delivery-limit</code> দিয়ে নির্দিষ্ট বারের বেশি redeliver হলে স্বয়ংক্রিয়ভাবে DLX-এ পাঠায় — mirrored queue-তে এটি নিজে বানাতে হতো।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>await ch.assertQueue('orders', {
  durable: true,
  arguments: {
    'x-queue-type': 'quorum',
    'x-quorum-initial-group-size': 3,   // বিজোড় সংখ্যা রাখুন
    'x-delivery-limit': 5,               // ৫ বার ব্যর্থ হলে DLX-এ
    'x-dead-letter-exchange': 'dlx'
  }
});</code></pre>
      </div>
      <h4>ট্রেড-অফ — যা জানা জরুরি</h4>
      <ul>
        <li><strong>সবসময় durable ও ডিস্কে লেখা হয়</strong> — তাই classic queue-র চেয়ে ধীর এবং বেশি I/O করে।</li>
        <li><strong>মেমরি বেশি খায়</strong> কারণ Raft log রাখতে হয়। খুব দীর্ঘ কিউ (লক্ষ লক্ষ জমে থাকা মেসেজ) এর জন্য ভালো নয়।</li>
        <li><strong>বিজোড় সংখ্যক রেপ্লিকা</strong> (৩ বা ৫) রাখুন — ৪ রেপ্লিকাতেও ৩টি লাগে, অর্থাৎ ৩-এর চেয়ে বাড়তি সহনশীলতা নেই।</li>
        <li><strong>কিছু ফিচার সমর্থিত নয়:</strong> priority queue, non-durable, exclusive queue, per-message TTL (কিউ-স্তরের TTL চলে)।</li>
      </ul>
      <p><strong>সিদ্ধান্ত:</strong> ডেটা হারানো অগ্রহণযোগ্য এমন সব ক্ষেত্রে (অর্ডার, পেমেন্ট, ইনভেন্টরি) <strong>quorum queue</strong> ব্যবহার করুন। ক্ষণস্থায়ী, উচ্চ-থ্রুপুট ও হারালেও চলে এমন ডেটায় classic queue-ই যথেষ্ট ও দ্রুত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Quorum queue-তে সংখ্যাগরিষ্ঠতা হারালে কী হয়?</li>
        <li>RabbitMQ Streams কী এবং quorum queue থেকে কীভাবে আলাদা?</li>
      </ul>
    `
  },
  {
    id: "mq-13",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Rebalance","Consumers"],
    question: "Kafka Rebalance Protocol এবং Cooperative Sticky Assignor কীভাবে কাজ করে?",
    answer: `
      <p><strong>Rebalance</strong> হলো সেই প্রক্রিয়া যেখানে কনজিউমার গ্রুপের সদস্যদের মধ্যে পার্টিশনগুলো পুনর্বণ্টন করা হয় — কনজিউমার যোগ হলে, চলে গেলে, বা টপিকের পার্টিশন বদলালে।</p>
      <h4>Eager Rebalance-এর সমস্যা (পুরনো ডিফল্ট)</h4>
      <p>ঐতিহ্যবাহী <em>eager</em> কৌশলে rebalance শুরু হলে <strong>সব কনজিউমার তাদের সব পার্টিশন ছেড়ে দেয়</strong>, তারপর নতুন বণ্টন হয়। একে বলা হয় <strong>"stop-the-world"</strong> — এই সময় পুরো গ্রুপের কোনো কনজিউমার কিছুই প্রসেস করে না।</p>
      <p>১০০ কনজিউমারের একটি গ্রুপে একটি কনজিউমার রিস্টার্ট করলেও সবাই থেমে যায়। rolling deploy করলে এটি বারবার ঘটে এবং কয়েক মিনিট প্রসেসিং বন্ধ থাকতে পারে।</p>
      <pre class="mermaid">
flowchart TD
    subgraph E["❌ Eager (stop-the-world)"]
      E1["সবাই সব পার্টিশন ছাড়ল"] --> E2["🛑 পুরো গ্রুপ থেমে গেল"] --> E3["নতুন বণ্টন"] --> E4["আবার শুরু"]
    end
    subgraph C["✅ Cooperative (incremental)"]
      C1["শুধু যেগুলো সরাতে হবে<br/>সেগুলোই ছাড়া হলো"] --> C2["বাকি সবাই কাজ চালিয়ে যাচ্ছে ✅"] --> C3["সরানো পার্টিশন নতুন মালিকে"]
    end
      </pre>
      <span class="diagram-caption">Cooperative rebalance-এ অপ্রভাবিত পার্টিশনগুলো কখনও থামে না</span>
      <h4>Cooperative Sticky Assignor</h4>
      <p>Kafka 2.4+ এ যুক্ত হওয়া এই কৌশলটি দুটি কাজ একসাথে করে:</p>
      <ul>
        <li><strong>Cooperative (incremental):</strong> rebalance দুই ধাপে হয়। প্রথম ধাপে কেবল <em>যেসব পার্টিশনের মালিকানা বদলাবে</em> সেগুলোই ছাড়া হয়; বাকি কনজিউমাররা নিরবচ্ছিন্নভাবে কাজ চালিয়ে যায়।</li>
        <li><strong>Sticky:</strong> যতটা সম্ভব আগের বণ্টন ধরে রাখার চেষ্টা করে — অর্থাৎ অপ্রয়োজনীয় স্থানান্তর এড়ায়। স্থানীয় state বা ক্যাশ থাকলে এটি বিশাল সুবিধা।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>properties</span><button class="copy-btn">Copy</button></div>
        <pre><code>partition.assignment.strategy=org.apache.kafka.clients.consumer.CooperativeStickyAssignor

# অপ্রয়োজনীয় rebalance কমাতে
session.timeout.ms=45000          # কনজিউমার মৃত ধরার আগে অপেক্ষা
heartbeat.interval.ms=3000        # session timeout-এর ~1/3
max.poll.interval.ms=300000       # দুটি poll()-এর মধ্যে সর্বোচ্চ সময়</code></pre>
      </div>
      <h4>Rebalance ঘটার সবচেয়ে সাধারণ (ও লুকানো) কারণ</h4>
      <p><code>max.poll.interval.ms</code> অতিক্রম করা। কনজিউমার একটি ব্যাচ প্রসেস করতে খুব বেশি সময় নিলে Kafka ভাবে সে মারা গেছে এবং তাকে গ্রুপ থেকে বের করে rebalance শুরু করে। ফলে কাজটি আবার অন্য কনজিউমারে যায়, সে-ও ধীর হয় — একটি দুষ্টচক্র তৈরি হয়।</p>
      <p><strong>সমাধান:</strong> হয় <code>max.poll.records</code> কমান (ছোট ব্যাচ), নয়তো <code>max.poll.interval.ms</code> বাড়ান, অথবা ভারী কাজ আলাদা থ্রেডে সরিয়ে poll লুপ দ্রুত রাখুন।</p>
      <p><strong>আরও ভালো:</strong> <code>group.instance.id</code> সেট করে <strong>static membership</strong> ব্যবহার করুন — তাহলে কনজিউমার রিস্টার্ট করলেও (যদি session timeout-এর মধ্যে ফিরে আসে) কোনো rebalance-ই হবে না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Rebalance চলাকালে ইতিমধ্যে প্রসেস করা কিন্তু commit না করা মেসেজের কী হয়?</li>
        <li>Rebalance-এর সংখ্যা কীভাবে মনিটর করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-14",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Architecture","Deduplication","Idempotency"],
    question: "Message Consumer-এ Deduplication (Idempotent Consumer) কীভাবে নিশ্চিত করা হয়?",
    answer: `
      <p>প্রায় সব মেসেজিং সিস্টেম <strong>at-least-once</strong> ডেলিভারি দেয়, অর্থাৎ ডুপ্লিকেট আসবেই। তাই নির্ভরযোগ্য সিস্টেমের দায়িত্ব হলো <strong>কনজিউমারকে idempotent বানানো</strong> — একই মেসেজ দুবার এলেও ফলাফল একবারের মতোই থাকবে।</p>
      <h4>ডুপ্লিকেট কেন আসে</h4>
      <ul>
        <li>কনজিউমার কাজ শেষ করেছে কিন্তু ack/commit পাঠানোর আগে ক্র্যাশ করল → মেসেজ আবার ডেলিভার হবে।</li>
        <li>নেটওয়ার্ক টাইমআউটে প্রডিউসার রিট্রাই করল, অথচ প্রথমটি আসলে সফল হয়েছিল।</li>
        <li>Kafka rebalance-এ commit না হওয়া offset থেকে আবার শুরু।</li>
      </ul>
      <h4>সবচেয়ে নির্ভরযোগ্য পদ্ধতি: ডাটাবেজ unique constraint</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ⚠️ Redis-এ শুধু SETNX দিয়ে চেক করা যথেষ্ট নয় —
//    Redis-এ চিহ্ন পড়ল কিন্তু DB লেখা ব্যর্থ হলে মেসেজটি চিরতরে হারাবে।
//    ডিডুপ ও ব্যবসায়িক কাজ একই ট্রানজেকশনে হতে হবে।

await db.transaction(async (tx) => {
  const res = await tx.query(
    \`INSERT INTO processed_events (event_id, processed_at)
     VALUES ($1, NOW()) ON CONFLICT (event_id) DO NOTHING RETURNING event_id\`,
    [msg.eventId]
  );
  if (res.rowCount === 0) return;        // আগেই প্রসেস হয়েছে

  await tx.query(
    'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
    [msg.amount, msg.accountId]
  );
});
// ট্রানজেকশন সফল হলে দুটোই হলো; ব্যর্থ হলে কিছুই হলো না → রিট্রাই নিরাপদ</code></pre>
      </div>
      <h4>বিকল্প কৌশল</h4>
      <ul>
        <li><strong>স্বাভাবিকভাবেই idempotent অপারেশন লিখুন:</strong> <code>SET status = 'shipped'</code> যতবার চালান একই ফল; কিন্তু <code>balance = balance + 100</code> নয়। সম্ভব হলে প্রথমটির মতো করে ডিজাইন করুন।</li>
        <li><strong>Upsert:</strong> <code>INSERT ... ON CONFLICT DO UPDATE</code> — একই কী-তে দ্বিতীয়বার এলে ডুপ্লিকেট সারি তৈরি হয় না।</li>
        <li><strong>Optimistic concurrency (version নম্বর):</strong> <code>UPDATE ... WHERE version = $expected</code> — পুরনো/পুনরাবৃত্ত আপডেট আপনাআপনি বাতিল হয়।</li>
        <li><strong>Redis দিয়ে দ্রুত ফিল্টার:</strong> DB-তে যাওয়ার আগে <code>SET NX EX</code> দিয়ে বেশিরভাগ ডুপ্লিকেট সস্তায় ছেঁকে ফেলা যায় — তবে এটি <em>অপ্টিমাইজেশন</em>, চূড়ান্ত সুরক্ষা নয়। চূড়ান্ত সুরক্ষা সবসময় DB constraint।</li>
      </ul>
      <h4>বাস্তব বিবেচনা</h4>
      <ul>
        <li><strong>ডিডুপ টেবিল বাড়তে থাকে</strong> — পুরনো এন্ট্রি মুছতে হবে। মেসেজের সর্বোচ্চ retention সময়ের চেয়ে কিছু বেশি সময় রাখুন (যেমন ৭ দিন), তারপর ক্রন জব দিয়ে পরিষ্কার করুন।</li>
        <li><strong>event_id প্রডিউসারই তৈরি করবে</strong> — ব্রোকারের offset ব্যবহার করবেন না, কারণ প্রডিউসার রিট্রাই করলে একই ইভেন্ট ভিন্ন offset পাবে।</li>
        <li><strong>বাইরের API কল</strong> (পেমেন্ট, ইমেইল) idempotent নয় — সেখানে প্রোভাইডারের idempotency key ব্যবহার করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ইমেইল পাঠানো তো rollback করা যায় না — কীভাবে সামলাবেন?</li>
        <li>ডিডুপ টেবিল নিজেই bottleneck হয়ে গেলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-15",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Schema","Avro","Serialization"],
    question: "Kafka Schema Registry এবং Avro Serialization কেন ব্যবহার করা হয়?",
    answer: `
      <p>Kafka-র কাছে মেসেজ কেবল বাইট — সে জানেই না ভেতরে কী আছে। সমস্যা হলো, প্রডিউসার ও কনজিউমার আলাদা টিমের হাতে থাকে এবং কেউ ফরম্যাট বদলালে অন্যরা নীরবে ভেঙে পড়ে।</p>
      <p><strong>Schema Registry</strong> এই সমস্যা সমাধান করে — এটি স্কিমার একটি কেন্দ্রীয় ভাণ্ডার এবং <em>সঙ্গতি প্রয়োগকারী</em> (compatibility enforcer)।</p>
      <h4>কীভাবে কাজ করে</h4>
      <pre class="mermaid">
flowchart LR
    P["Producer"] -->|"১. স্কিমা রেজিস্টার"| SR[("Schema Registry")]
    SR -->|"২. schema ID"| P
    P -->|"৩. [magic byte][schema ID][Avro data]"| K["Kafka"]
    K -->|"৪. মেসেজ"| C["Consumer"]
    C -->|"৫. ID দিয়ে স্কিমা চায়"| SR
    SR -->|"৬. স্কিমা"| C
      </pre>
      <span class="diagram-caption">মেসেজে পুরো স্কিমা নয়, মাত্র ৪ বাইটের ID যায়</span>
      <p><strong>মূল সুবিধা:</strong> স্কিমা নিজে মেসেজের সাথে যায় না — শুধু একটি ছোট ID যায়। ফলে JSON-এর তুলনায় পেলোড নাটকীয়ভাবে ছোট হয় (প্রতিটি মেসেজে ফিল্ডের নাম বারবার পাঠাতে হয় না)।</p>
      <h4>Compatibility মোড</h4>
      <table>
        <tr><th>মোড</th><th>নিশ্চিত করে</th><th>কখন</th></tr>
        <tr><td><strong>BACKWARD</strong></td><td>নতুন স্কিমা পুরনো ডেটা পড়তে পারে</td><td>আগে কনজিউমার আপগ্রেড (ডিফল্ট)</td></tr>
        <tr><td><strong>FORWARD</strong></td><td>পুরনো স্কিমা নতুন ডেটা পড়তে পারে</td><td>আগে প্রডিউসার আপগ্রেড</td></tr>
        <tr><td><strong>FULL</strong></td><td>দুটোই</td><td>সবচেয়ে নিরাপদ, সবচেয়ে সীমাবদ্ধ</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>{
  "type": "record",
  "name": "OrderCreated",
  "fields": [
    { "name": "orderId",  "type": "string" },
    { "name": "amount",   "type": "double" },
    { "name": "currency", "type": "string", "default": "BDT" }
  ]
}
// ✅ নিরাপদ পরিবর্তন: default সহ নতুন ফিল্ড যোগ, ঐচ্ছিক ফিল্ড বাদ
// ❌ ভাঙা পরিবর্তন: ফিল্ডের নাম/টাইপ বদলানো, default ছাড়া required ফিল্ড যোগ</code></pre>
      </div>
      <p><strong>সবচেয়ে বড় ব্যবহারিক সুবিধা:</strong> কেউ যদি একটি ভাঙা পরিবর্তন পুশ করার চেষ্টা করে, Schema Registry সেটি <strong>প্রডিউসার চালু হওয়ার সময়েই প্রত্যাখ্যান করে</strong> — প্রোডাকশনে কনজিউমার ভাঙার আগেই। এটি CI-তে একটি চেক হিসেবেও চালানো যায়।</p>
      <h4>Avro বনাম Protobuf বনাম JSON Schema</h4>
      <ul>
        <li><strong>Avro:</strong> Kafka-র সাথে সবচেয়ে বেশি ব্যবহৃত, কম্প্যাক্ট, স্কিমা বিবর্তনের নিয়ম সুস্পষ্ট।</li>
        <li><strong>Protobuf:</strong> gRPC-র সাথে সঙ্গতিপূর্ণ, ভালো টুলিং।</li>
        <li><strong>JSON Schema:</strong> মানুষের পড়ার উপযোগী কিন্তু বড় ও ধীর — কেবল ডিবাগিং সুবিধা মুখ্য হলে।</li>
      </ul>
      <p><strong>মনে রাখবেন:</strong> Schema Registry একটি নির্ভরতা — এটি ডাউন থাকলে নতুন প্রডিউসার/কনজিউমার চালু হতে পারে না। তাই HA-তে চালান এবং ক্লায়েন্টে স্কিমা ক্যাশ রাখুন (ক্লায়েন্ট লাইব্রেরি সাধারণত করেই)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>প্রোডাকশনে একটি স্কিমা পরিবর্তন কীভাবে নিরাপদে রোলআউট করবেন?</li>
        <li>Schema Registry ডাউন হলে চলমান কনজিউমারের কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-16",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Priority Queues","Queues"],
    question: "RabbitMQ Priority Queues কীভাবে বার্তা অগ্রাধিকার নির্ধারণ করে?",
    answer: `
      <p>RabbitMQ-তে priority queue তৈরি করলে উচ্চ অগ্রাধিকারের মেসেজ কিউয়ের সামনে চলে আসে এবং আগে ডেলিভার হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// কিউ তৈরির সময় সর্বোচ্চ priority নির্ধারণ করতে হয়
await ch.assertQueue('notifications', {
  durable: true,
  arguments: { 'x-max-priority': 10 }    // 1–10; বেশি রাখলে বেশি CPU/মেমরি
});

// পাঠানোর সময় priority দিন
ch.sendToQueue('notifications', Buffer.from(otpPayload),   { priority: 10 }); // OTP
ch.sendToQueue('notifications', Buffer.from(orderPayload), { priority: 5 });
ch.sendToQueue('notifications', Buffer.from(promoPayload), { priority: 1 });  // প্রোমো</code></pre>
      </div>
      <h4>যে সীমাবদ্ধতাগুলো ইন্টারভিউতে বলা জরুরি</h4>
      <ul>
        <li><strong>ইতিমধ্যে ডেলিভার হওয়া মেসেজে কাজ করে না:</strong> prefetch যদি ১০০ হয়, কনজিউমার ইতিমধ্যেই ১০০টি কম-অগ্রাধিকারের মেসেজ নিজের বাফারে নিয়ে নিয়েছে। এখন একটি উচ্চ-অগ্রাধিকার মেসেজ এলেও সেটি ঐ ১০০টির পরে প্রসেস হবে। <strong>তাই priority কার্যকর করতে <code>prefetch</code> ছোট রাখতেই হবে</strong> (১ থেকে ৫)।</li>
        <li><strong>Starvation:</strong> উচ্চ-অগ্রাধিকারের মেসেজ ক্রমাগত আসতে থাকলে নিম্ন-অগ্রাধিকারের মেসেজ কখনও প্রসেস না-ও হতে পারে।</li>
        <li><strong>পারফরম্যান্স খরচ:</strong> প্রতিটি priority স্তরের জন্য RabbitMQ আলাদা অভ্যন্তরীণ কাঠামো রাখে। <code>x-max-priority</code> ২৫৫ দেওয়া যায়, কিন্তু ব্যবহারিকভাবে <strong>৫–১০-এর বেশি রাখবেন না</strong>।</li>
        <li><strong>Quorum queue-তে সমর্থিত নয়</strong> — শুধু classic queue-তে।</li>
        <li>কিউ তৈরির পর <code>x-max-priority</code> বদলানো যায় না — কিউ মুছে আবার বানাতে হবে।</li>
      </ul>
      <h4>প্রায়ই ভালো বিকল্প: আলাদা কিউ</h4>
      <p>বাস্তবে বেশিরভাগ ক্ষেত্রে priority queue-র চেয়ে <strong>আলাদা কিউ + আলাদা ওয়ার্কার পুল</strong> ভালো কাজ করে:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// আলাদা কিউ — নিশ্চিত বিচ্ছিন্নতা (bulkhead)
await ch.assertQueue('notifications.high', { durable: true });   // OTP, security
await ch.assertQueue('notifications.low',  { durable: true });   // প্রোমো, digest

// উচ্চ-অগ্রাধিকারের জন্য বেশি ওয়ার্কার বরাদ্দ
// low কিউতে ১০ লক্ষ প্রোমো জমলেও high কিউ সম্পূর্ণ অপ্রভাবিত থাকে</code></pre>
      </div>
      <p><strong>কেন এটি ভালো:</strong> আলাদা কিউতে low-priority কাজের ঢল কখনও high-priority কাজকে স্পর্শ করে না, প্রতিটির জন্য আলাদা স্কেলিং ও মনিটরিং করা যায়, এবং starvation নিয়ন্ত্রণে থাকে (আপনি ঠিক করেন কত ওয়ার্কার কোথায় দেবেন)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Kafka-তে priority কীভাবে করবেন (উত্তর: বিল্ট-ইন নেই)?</li>
        <li>Starvation ঠেকাতে কী কৌশল নেবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-17",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["CDC","Kafka Connect","Debezium"],
    question: "Kafka Connect এবং Debezium (CDC) কী?",
    answer: `
      <p><strong>Kafka Connect</strong> হলো Kafka-র সাথে বাইরের সিস্টেম যুক্ত করার একটি ফ্রেমওয়ার্ক — কোনো কোড না লিখে কনফিগারেশন দিয়েই ডেটা আনা-নেওয়া করা যায়।</p>
      <ul>
        <li><strong>Source connector:</strong> বাইরের সিস্টেম → Kafka (যেমন MySQL → Kafka)।</li>
        <li><strong>Sink connector:</strong> Kafka → বাইরের সিস্টেম (যেমন Kafka → Elasticsearch/S3)।</li>
      </ul>
      <p>Connect ক্লাস্টার নিজেই সমান্তরালতা, offset ব্যবস্থাপনা, ব্যর্থতা পুনরুদ্ধার ও স্কেলিং সামলায় — যা নিজে লিখলে অনেক কাজ।</p>
      <h4>Debezium ও CDC</h4>
      <p><strong>CDC (Change Data Capture)</strong> মানে ডাটাবেজের পরিবর্তনগুলো ধরে ফেলা। <strong>Debezium</strong> একটি source connector যা ডাটাবেজের <strong>transaction log</strong> (MySQL binlog, PostgreSQL WAL, MongoDB oplog) পড়ে প্রতিটি INSERT/UPDATE/DELETE-কে Kafka ইভেন্টে রূপান্তর করে।</p>
      <pre class="mermaid">
flowchart LR
    A["App"] -->|"স্বাভাবিক write"| DB[("MySQL")]
    DB -->|"binlog পড়ে"| D["Debezium<br/>connector"]
    D --> K["Kafka topic"]
    K --> E["Elasticsearch sink"]
    K --> C["Cache invalidator"]
    K --> W["Data warehouse"]
      </pre>
      <span class="diagram-caption">অ্যাপ্লিকেশন কোডে কোনো পরিবর্তন ছাড়াই সব পরিবর্তন ইভেন্ট হয়ে যায়</span>
      <h4>Log-based CDC কেন শ্রেষ্ঠ</h4>
      <table>
        <tr><th>পদ্ধতি</th><th>সমস্যা</th></tr>
        <tr><td>Polling (<code>WHERE updated_at &gt; x</code>)</td><td>DELETE ধরতে পারে না; দুটি poll-এর মাঝের পরিবর্তন মিস করে; DB-তে লোড ফেলে</td></tr>
        <tr><td>Dual write (অ্যাপ থেকে DB + Kafka)</td><td>একটি সফল অন্যটি ব্যর্থ হলে স্থায়ী অসঙ্গতি</td></tr>
        <tr><td>Trigger</td><td>write পারফরম্যান্স নষ্ট করে, রক্ষণাবেক্ষণ কঠিন</td></tr>
        <tr><td><strong>Log-based CDC</strong></td><td><strong>কিছুই মিস করে না, DB-তে প্রায় শূন্য প্রভাব, DELETE-ও ধরে</strong></td></tr>
      </table>
      <p><strong>মূল অন্তর্দৃষ্টি:</strong> transaction log ইতিমধ্যেই ডাটাবেজের প্রতিটি পরিবর্তনের নির্ভুল, ক্রমবদ্ধ রেকর্ড — durability-র জন্য সেটি এমনিতেই লেখা হয়। CDC শুধু সেটিকে কাজে লাগায়, তাই কোনো বাড়তি write খরচ নেই।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>Search index সিঙ্ক:</strong> MySQL → Elasticsearch, dual write-এর অসঙ্গতি ছাড়াই।</li>
        <li><strong>Cache invalidation:</strong> ডেটা বদলালেই স্বয়ংক্রিয়ভাবে Redis কী মুছে ফেলা।</li>
        <li><strong>Strangler Fig মাইগ্রেশন:</strong> মনোলিথের DB থেকে নতুন মাইক্রোসার্ভিসে ডেটা প্রবাহিত করা, মনোলিথের কোড না ছুঁয়েই।</li>
        <li><strong>Data warehouse-এ রিয়েল-টাইম ফিড।</strong></li>
      </ul>
      <p><strong>বিবেচ্য:</strong> CDC ইভেন্ট ডাটাবেজের <em>স্কিমার</em> আকারে আসে, আপনার ডোমেইন ইভেন্টের আকারে নয়। ফলে কনজিউমাররা ডাটাবেজ স্কিমার উপর নির্ভরশীল হয়ে পড়ে — টেবিল বদলালে তারা ভাঙে। বিশুদ্ধ ডোমেইন ইভেন্ট চাইলে <strong>Outbox pattern</strong> (একটি outbox টেবিলে ইচ্ছাকৃত ইভেন্ট লিখে সেটিতে CDC চালানো) বেশি উপযুক্ত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Debezium-এর initial snapshot কীভাবে কাজ করে?</li>
        <li>CDC বনাম Outbox pattern — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "mq-18",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Performance","Backpressure","Flow"],
    question: "Event Consumers-এ Backpressure Handling কীভাবে করবেন?",
    answer: `
      <p>Backpressure মানে কনজিউমারের প্রকৃত ক্ষমতার সাথে মেসেজ গ্রহণের গতি মিলিয়ে নেওয়া। এটি না থাকলে কনজিউমার মেমরি ভরে ক্র্যাশ করে বা ডাউনস্ট্রিম সিস্টেম ধসে পড়ে।</p>
      <h4>Pull বনাম Push — মৌলিক পার্থক্য</h4>
      <ul>
        <li><strong>Kafka (pull):</strong> কনজিউমার নিজে <code>poll()</code> করে যতটুকু পারে ততটুকু নেয়। ব্যাকপ্রেশার স্বাভাবিকভাবেই বিল্ট-ইন — ধীরে poll করলে ধীরে ডেটা আসে, ব্রোকারে কিছু জমে না (সেটি এমনিতেই লগ)।</li>
        <li><strong>RabbitMQ (push):</strong> ব্রোকার ঠেলে দেয়। এখানে <code>prefetch</code> দিয়ে স্পষ্টভাবে সীমা বেঁধে দিতে হয়, নাহলে কনজিউমারের মেমরিতে মেসেজ জমতে থাকবে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// --- RabbitMQ: prefetch-ই প্রধান হাতিয়ার ---
await ch.prefetch(10);    // একসাথে সর্বোচ্চ ১০টি unacked

// --- Kafka: poll লুপ দ্রুত রাখা ---
const consumer = kafka.consumer({
  groupId: 'workers',
  maxBytesPerPartition: 1048576,
  // ⚠️ এটিই সবচেয়ে গুরুত্বপূর্ণ: একটি ব্যাচ প্রসেসে এর বেশি সময় লাগলে
  //    Kafka ভাববে কনজিউমার মৃত এবং rebalance শুরু করবে
  maxWaitTimeInMs: 1000,
  sessionTimeout: 45000
});

await consumer.run({
  partitionsConsumedConcurrently: 3,
  eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
    for (const message of batch.messages) {
      await processMessage(message);
      resolveOffset(message.offset);
      // দীর্ঘ ব্যাচে heartbeat পাঠিয়ে জানান দিন যে আপনি বেঁচে আছেন
      await heartbeat();
    }
    await commitOffsetsIfNecessary();
  }
});</code></pre>
      </div>
      <h4>ডাউনস্ট্রিম সুরক্ষা — আসল ঝুঁকি</h4>
      <p>কনজিউমার নিজে দ্রুত হলেও সে যদি একটি ডাটাবেজ বা থার্ড-পার্টি API-তে লিখে, তাহলে <em>সেটিই</em> ভেঙে পড়তে পারে। কিউতে ১০ লক্ষ মেসেজ জমে থাকলে কনজিউমার সেগুলো যত দ্রুত পারে ছেড়ে দেবে এবং ডাটাবেজ ডুবে যাবে।</p>
      <ul>
        <li><strong>Concurrency সীমিত করুন:</strong> একসাথে কতগুলো ডাউনস্ট্রিম কল চলবে তা নির্ধারণ করুন (semaphore/bulkhead)।</li>
        <li><strong>Circuit breaker:</strong> ডাউনস্ট্রিম ব্যর্থ হতে থাকলে কনজিউম করাই থামিয়ে দিন (RabbitMQ-তে <code>ch.cancel()</code>, Kafka-তে <code>consumer.pause()</code>) — মেসেজ ব্রোকারে নিরাপদে অপেক্ষা করবে।</li>
        <li><strong>Batch write:</strong> ১০০০টি আলাদা INSERT-এর বদলে একটি bulk insert — ডাটাবেজের উপর চাপ নাটকীয়ভাবে কমে।</li>
      </ul>
      <h4>যা মনিটর করবেন</h4>
      <p><strong>Consumer lag</strong> — সবচেয়ে গুরুত্বপূর্ণ মেট্রিক। এটি ক্রমাগত বাড়তে থাকা মানে কনজিউমার উৎপাদনের গতির সাথে পারছে না। lag <em>স্থিতিশীল</em> থাকলে (এমনকি বড় হলেও) সিস্টেম সুস্থ; <em>বাড়তে</em> থাকলে হয় কনজিউমার স্কেল করুন, নয়তো প্রসেসিং অপ্টিমাইজ করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Consumer lag বাড়ছে — কনজিউমার বাড়ালেই কি সমাধান?</li>
        <li>একটি ধীর মেসেজ পুরো পার্টিশন আটকে দিলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-19",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Exchanges","Direct/Topic/Fanout/Headers"],
    question: "RabbitMQ Exchange Types: Direct, Fanout, Topic, Headers Exchange-এর কাজের পার্থক্য কী?",
    answer: `
      <p>RabbitMQ-তে প্রডিউসার কখনও সরাসরি কিউতে পাঠায় না — সে পাঠায় <strong>Exchange</strong>-এ। Exchange তার ধরন ও <strong>binding</strong> অনুযায়ী ঠিক করে মেসেজটি কোন কিউ(গুলো)-তে যাবে। এই স্তরটিই RabbitMQ-কে "smart broker" বানায়।</p>
      <pre class="mermaid">
flowchart LR
    P["Producer"] --> E{"Exchange"}
    E -->|"routing key মিলে"| Q1["Queue A"]
    E -->|"binding অনুযায়ী"| Q2["Queue B"]
    Q1 --> C1["Consumer 1"]
    Q2 --> C2["Consumer 2"]
      </pre>
      <span class="diagram-caption">Exchange রাউটিং সিদ্ধান্ত নেয়; প্রডিউসার কিউ সম্পর্কে কিছু জানে না</span>
      <table>
        <tr><th>ধরন</th><th>রাউটিং নিয়ম</th><th>ব্যবহার</th></tr>
        <tr><td><strong>Direct</strong></td><td>routing key <em>হুবহু</em> মিলতে হবে</td><td>নির্দিষ্ট কিউতে টাস্ক পাঠানো</td></tr>
        <tr><td><strong>Fanout</strong></td><td>routing key উপেক্ষা — সব বাঁধা কিউতে কপি</td><td>ব্রডকাস্ট, ক্যাশ invalidation</td></tr>
        <tr><td><strong>Topic</strong></td><td>প্যাটার্ন ম্যাচিং (<code>*</code>, <code>#</code>)</td><td>নমনীয় ইভেন্ট রাউটিং</td></tr>
        <tr><td><strong>Headers</strong></td><td>routing key নয়, হেডারের মান দেখে</td><td>জটিল বহু-শর্তের রাউটিং (কম ব্যবহৃত)</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Topic exchange — সবচেয়ে নমনীয়
await ch.assertExchange('events', 'topic', { durable: true });

// '*' = ঠিক একটি শব্দ, '#' = শূন্য বা একাধিক শব্দ
await ch.bindQueue('q.order.all',    'events', 'order.#');
await ch.bindQueue('q.order.created','events', 'order.created');
await ch.bindQueue('q.critical',     'events', '*.*.critical');

ch.publish('events', 'order.created', Buffer.from(JSON.stringify(data)));
// → q.order.all এবং q.order.created দুটোতেই যাবে</code></pre>
      </div>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>Topic exchange দিয়েই শুরু করুন।</strong> এটি direct-এর কাজও করতে পারে (প্যাটার্নে wildcard না দিলে), কিন্তু পরে নতুন কনজিউমার যোগ করা অনেক সহজ — প্রডিউসারের কোড বদলাতে হয় না।</li>
        <li><strong>Default exchange</strong> (<code>""</code>) একটি বিশেষ direct exchange, যেখানে routing key = কিউয়ের নাম। শেখার জন্য সুবিধাজনক, কিন্তু প্রোডাকশনে ব্যবহার করলে প্রডিউসার ও কিউয়ের মধ্যে শক্ত কাপলিং তৈরি হয়।</li>
        <li><strong>Alternate exchange</strong> সেট করুন — কোনো binding-এ না মেলা মেসেজ নীরবে হারিয়ে না গিয়ে একটি "unrouted" কিউতে জমা হবে। ডিবাগিংয়ে অমূল্য।</li>
        <li><strong>Exchange ও কিউ <code>durable: true</code></strong> রাখুন, নাহলে ব্রোকার রিস্টার্টে সব মুছে যাবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একই মেসেজ একাধিক কিউতে গেলে সেটি কি কপি হয়, না রেফারেন্স?</li>
        <li>Headers exchange কেন কম ব্যবহৃত হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-20",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Partitions","Consumer Groups"],
    question: "Kafka Topic, Partition, Segment, Offset এবং Consumer Group Scale-Out Architecture কীভাবে কাজ করে?",
    answer: `
      <p>Kafka-র স্কেলিং পুরোপুরি এই চারটি ধারণার উপর দাঁড়িয়ে — এবং এদের সম্পর্ক বোঝাই Kafka বোঝার মূল চাবি।</p>
      <pre class="mermaid">
flowchart TD
    T["Topic: orders"] --> P0["Partition 0<br/>offset 0,1,2,3..."]
    T --> P1["Partition 1<br/>offset 0,1,2..."]
    T --> P2["Partition 2<br/>offset 0,1,2,3,4..."]
    P0 --> C1["Consumer 1"]
    P1 --> C2["Consumer 2"]
    P2 --> C3["Consumer 3"]
    subgraph CG["Consumer Group: order-processors"]
      C1
      C2
      C3
    end
      </pre>
      <span class="diagram-caption">প্রতিটি পার্টিশন ঠিক একজন কনজিউমারের কাছে যায়</span>
      <ul>
        <li><strong>Topic:</strong> একটি লজিক্যাল ইভেন্ট-ধারার নাম (যেমন <code>orders</code>)।</li>
        <li><strong>Partition:</strong> টপিকের ভেতরে একটি append-only ক্রমবদ্ধ লগ। <strong>এটিই সমান্তরালতার একক।</strong></li>
        <li><strong>Offset:</strong> পার্টিশনের ভেতরে প্রতিটি মেসেজের ক্রমিক নম্বর। কনজিউমার নিজে ট্র্যাক করে সে কোথায় আছে।</li>
        <li><strong>Segment:</strong> পার্টিশন ডিস্কে একাধিক ফাইলে (segment) ভাগ করে রাখা হয়। পুরনো segment মুছে ফেলা বা compact করা সহজ হয় — পুরো পার্টিশন ছোঁয়া লাগে না।</li>
      </ul>
      <h4>যে নিয়মটি সব ঠিক করে দেয়</h4>
      <p><strong>একটি কনজিউমার গ্রুপে, প্রতিটি পার্টিশন ঠিক একজন কনজিউমারের কাছে যায়।</strong> এর তিনটি সরাসরি ফলাফল:</p>
      <ol>
        <li><strong>সমান্তরালতার সর্বোচ্চ সীমা = পার্টিশন সংখ্যা।</strong> ৩টি পার্টিশনে ১০টি কনজিউমার চালালে ৭টি নিষ্ক্রিয় বসে থাকবে।</li>
        <li><strong>ক্রম কেবল পার্টিশনের ভেতরে</strong> নিশ্চিত, পুরো টপিকে নয়।</li>
        <li><strong>একাধিক গ্রুপ একই ডেটা স্বাধীনভাবে পড়তে পারে</strong> — প্রত্যেকের নিজস্ব offset। এখানেই Kafka RabbitMQ থেকে মৌলিকভাবে আলাদা।</li>
      </ol>
      <h4>পার্টিশন সংখ্যা নির্ধারণ</h4>
      <ul>
        <li><strong>পার্টিশন বাড়ানো যায়, কমানো যায় না</strong> — তাই ভবিষ্যতের কথা ভেবে কিছুটা বেশি রাখুন।</li>
        <li>কিন্তু অতিরিক্ত পার্টিশনেরও খরচ আছে: প্রতিটি ব্রোকারে বেশি ফাইল হ্যান্ডল, বেশি মেমরি, দীর্ঘ rebalance ও failover সময়।</li>
        <li><strong>সতর্কতা:</strong> পার্টিশন সংখ্যা বাড়ালে key-to-partition ম্যাপিং বদলে যায় — অর্থাৎ একই কী নতুন পার্টিশনে যেতে পারে এবং <strong>ক্রমের নিশ্চয়তা ভেঙে যায়</strong>।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একই টপিকে দুটি ভিন্ন কনজিউমার গ্রুপ থাকলে কী হয়?</li>
        <li>কনজিউমার সংখ্যা পার্টিশনের চেয়ে বেশি হলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-22",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Producer","acks"],
    question: "Kafka Producer Acknowledgments (acks=0, acks=1, acks=all / -1) এবং min.insync.replicas-এর নিরাপত্তা ভূমিকা কী?",
    answer: `
      <p><code>acks</code> ঠিক করে প্রডিউসার কখন একটি write-কে "সফল" ধরবে — এবং এটিই ডেটা নিরাপত্তা ও থ্রুপুটের মধ্যে মূল আপস।</p>
      <table>
        <tr><th>সেটিং</th><th>কখন সফল ধরে</th><th>ডেটা ক্ষতি</th><th>গতি</th></tr>
        <tr><td><code>acks=0</code></td><td>সকেটে লেখামাত্র</td><td><strong>উচ্চ</strong> — ব্রোকার ডাউন হলেও জানবে না</td><td>সবচেয়ে দ্রুত</td></tr>
        <tr><td><code>acks=1</code></td><td>leader লিখেছে</td><td>মাঝারি — leader ক্র্যাশ করলে হারাতে পারে</td><td>দ্রুত</td></tr>
        <tr><td><code>acks=all</code></td><td>সব ISR লিখেছে</td><td><strong>সর্বনিম্ন</strong></td><td>ধীর</td></tr>
      </table>
      <h4>acks=all একা যথেষ্ট নয় — এটিই আসল অন্তর্দৃষ্টি</h4>
      <p><code>acks=all</code> মানে "সব <strong>in-sync replica</strong> নিশ্চিত করেছে"। কিন্তু যদি রেপ্লিকাগুলো পিছিয়ে পড়ে ISR থেকে বাদ পড়ে যায়, তখন ISR-এ শুধু leader-ই থাকতে পারে — তখন <code>acks=all</code> কার্যত <code>acks=1</code>-এর সমান হয়ে যায়!</p>
      <p>এজন্যই <strong><code>min.insync.replicas</code></strong> দরকার। এটি ব্রোকার/টপিক-স্তরের সেটিং যা বলে "কমপক্ষে এতগুলো রেপ্লিকা ISR-এ না থাকলে write গ্রহণই করব না"।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># প্রস্তাবিত প্রোডাকশন কনফিগ
replication.factor=3       # ৩টি কপি
min.insync.replicas=2      # অন্তত ২টি সুস্থ থাকতেই হবে
acks=all                   # প্রডিউসারে

# ফলাফল: ১টি ব্রোকার হারালেও write চলবে (২টি ISR আছে)
#         ২টি হারালে write ব্যর্থ হবে (NotEnoughReplicas) —
#         ইচ্ছাকৃতভাবে, কারণ নীরবে ডেটা হারানোর চেয়ে থেমে যাওয়া ভালো</code></pre>
      </div>
      <p><strong>কেন <code>min.insync.replicas=2</code>, ৩ নয়:</strong> ৩ দিলে একটি ব্রোকার রক্ষণাবেক্ষণের জন্য বন্ধ করলেই সব write থেমে যাবে। ২ রাখলে একটি ব্রোকার হারানো সহনীয়, অথচ ডেটা অন্তত দুই জায়গায় থাকে।</p>
      <h4>সম্পূর্ণ নিরাপদ প্রডিউসার কনফিগ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const producer = kafka.producer({
  idempotent: true,        // ডুপ্লিকেট প্রতিরোধ (acks=all স্বয়ংক্রিয়ভাবে সেট হয়)
  maxInFlightRequests: 5,  // idempotence চালু থাকলে ৫ পর্যন্ত নিরাপদ
  retry: { retries: Number.MAX_SAFE_INTEGER, initialRetryTime: 100 }
});
// ⚠️ idempotent ছাড়া retry করলে ডুপ্লিকেট ও ক্রমভঙ্গ হতে পারে</code></pre>
      </div>
      <p><strong>আরেকটি বিপজ্জনক সেটিং:</strong> <code>unclean.leader.election.enable=true</code> দিলে ISR-এ না থাকা (পিছিয়ে পড়া) রেপ্লিকাও leader হতে পারে — এতে availability বাড়ে কিন্তু <strong>নিশ্চিতভাবে ডেটা হারায়</strong>। প্রোডাকশনে এটি <code>false</code> রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ISR থেকে একটি রেপ্লিকা কখন বাদ পড়ে?</li>
        <li><code>acks=all</code> latency কতটা বাড়ায় এবং কীভাবে কমাবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-23",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Message Delivery","Guarantees","At-least-once"],
    question: "Message Delivery Guarantees: At-Most-Once, At-Least-Once, এবং Exactly-Once Semantics কী?",
    answer: `
      <p>ডেলিভারি গ্যারান্টি বোঝা ডিস্ট্রিবিউটেড মেসেজিংয়ের সবচেয়ে মৌলিক বিষয় — এবং এখানে একটি বহুল প্রচলিত ভুল ধারণা আছে।</p>
      <table>
        <tr><th>গ্যারান্টি</th><th>মানে</th><th>কীভাবে অর্জিত</th><th>ঝুঁকি</th></tr>
        <tr><td><strong>At-most-once</strong></td><td>০ বা ১ বার</td><td>প্রসেস করার <em>আগে</em> ack/commit</td><td>মেসেজ হারাতে পারে</td></tr>
        <tr><td><strong>At-least-once</strong></td><td>১ বা তার বেশি</td><td>প্রসেস করার <em>পরে</em> ack/commit</td><td>ডুপ্লিকেট হতে পারে</td></tr>
        <tr><td><strong>Exactly-once</strong></td><td>ঠিক ১ বার</td><td>ট্রানজেকশন বা idempotency</td><td>জটিল ও ধীর</td></tr>
      </table>
      <h4>মূল পার্থক্যটি কোথায়</h4>
      <p>পুরো ব্যাপারটি একটি সিদ্ধান্তের উপর নির্ভর করে: <strong>আপনি কখন "কাজ শেষ" বলছেন — প্রসেস করার আগে না পরে?</strong></p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ At-most-once: আগে commit → এখানে ক্র্যাশ হলে মেসেজ চিরতরে হারাল
await consumer.commitOffsets([{ topic, partition, offset }]);
await processMessage(msg);

// ✅ At-least-once: আগে প্রসেস → এখানে ক্র্যাশ হলে আবার ডেলিভার হবে
await processMessage(msg);
await consumer.commitOffsets([{ topic, partition, offset }]);</code></pre>
      </div>
      <h4>"Exactly-once" নিয়ে ভুল ধারণা</h4>
      <p>নেটওয়ার্কের ওপারে <strong>exactly-once <em>delivery</em> কঠোরভাবে অসম্ভব</strong> (Two Generals Problem)। প্রেরক কখনও নিশ্চিতভাবে জানতে পারে না মেসেজটি পৌঁছেছে কিনা, নাকি শুধু ack হারিয়ে গেছে — তাই তাকে হয় রিট্রাই করতে হবে (ডুপ্লিকেট ঝুঁকি) নয়তো ছেড়ে দিতে হবে (হারানোর ঝুঁকি)।</p>
      <p>যা <em>অর্জনযোগ্য</em> তা হলো <strong>exactly-once processing</strong> — ডুপ্লিকেট এলেও চূড়ান্ত ফলাফল একবারের মতোই থাকবে।</p>
      <h4>বাস্তব সমাধান: at-least-once + idempotent consumer</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>async function handleMessage(msg) {
  const eventId = msg.headers['event-id'].toString();

  // ডেটাবেজ ট্রানজেকশনে ডিডুপ ও ব্যবসায়িক কাজ একসাথে
  await db.transaction(async (tx) => {
    // unique constraint-ই আসল সুরক্ষা — race condition-এও কাজ করে
    const inserted = await tx.query(
      'INSERT INTO processed_events (id) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id',
      [eventId]
    );
    if (inserted.rowCount === 0) return;      // আগেই প্রসেস হয়েছে — চুপচাপ এড়িয়ে যান

    await tx.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [msg.amount, msg.accountId]);
  });
}</code></pre>
      </div>
      <p><strong>এটিই ৯৫% ক্ষেত্রে সঠিক উত্তর</strong> — Kafka-র transactional API-র চেয়ে সহজ, দ্রুত এবং যেকোনো ব্রোকারে কাজ করে।</p>
      <p><strong>Kafka Transactions</strong> শুধু তখনই প্রকৃত exactly-once দেয় যখন পুরো প্রবাহটি Kafka-র ভেতরে থাকে (consume → process → produce)। বাইরের ডাটাবেজ বা API জড়িত থাকলে সেটি আর প্রযোজ্য নয় — তখন idempotency-ই একমাত্র পথ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ইমেইল পাঠানোর মতো non-idempotent কাজে কীভাবে ডুপ্লিকেট ঠেকাবেন?</li>
        <li>ডিডুপ টেবিল কতদিন রাখবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-24",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Offset Commit","auto.commit"],
    question: "Kafka Manual Offset Commit (commitSync vs commitAsync) vs Auto Commit (enable.auto.commit) কী?",
    answer: `
      <p>Kafka-তে offset commit করা মানে বলা "আমি এই পার্টিশনের এই পর্যন্ত প্রসেস করে ফেলেছি"। কনজিউমার রিস্টার্ট বা rebalance হলে এখান থেকেই আবার শুরু হবে — তাই commit-এর সময় ও পদ্ধতি সরাসরি ডেটা নিরাপত্তা নির্ধারণ করে।</p>
      <h4>Auto Commit-এর লুকানো বিপদ</h4>
      <p><code>enable.auto.commit=true</code> থাকলে ক্লায়েন্ট প্রতি <code>auto.commit.interval.ms</code> (ডিফল্ট ৫ সেকেন্ড) পরপর <em>ব্যাকগ্রাউন্ডে</em> offset commit করে — আপনার প্রসেসিং শেষ হয়েছে কি না তা না জেনেই।</p>
      <p>ফলে এমন হতে পারে: ১০০টি মেসেজ poll করলেন, ৫টি প্রসেস হলো, এর মধ্যে auto-commit চলে গেল (১০০টিই commit হয়ে গেল), তারপর ক্র্যাশ — বাকি ৯৫টি মেসেজ <strong>চিরতরে হারিয়ে গেল</strong>। এটি নীরবে ঘটে, কোনো এরর ছাড়াই।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ঝুঁকিপূর্ণ
const consumer = kafka.consumer({ groupId: 'g', autoCommit: true });

// ✅ নিরাপদ: প্রসেস করার পরে নিজে commit করুন
const consumer = kafka.consumer({ groupId: 'g' });
await consumer.run({
  autoCommit: false,
  eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
    for (const message of batch.messages) {
      await processMessage(message);       // আগে কাজ
      resolveOffset(message.offset);       // তারপর "এটি হয়ে গেছে" চিহ্নিত
      await heartbeat();
    }
    await commitOffsetsIfNecessary();      // ব্যাচ শেষে commit
  }
});</code></pre>
      </div>
      <h4>commitSync বনাম commitAsync</h4>
      <table>
        <tr><th>দিক</th><th>commitSync</th><th>commitAsync</th></tr>
        <tr><td>আচরণ</td><td>ব্রোকারের নিশ্চয়তার অপেক্ষা করে</td><td>পাঠিয়ে এগিয়ে যায়</td></tr>
        <tr><td>রিট্রাই</td><td>ব্যর্থ হলে নিজে রিট্রাই করে</td><td>করে না</td></tr>
        <tr><td>থ্রুপুট</td><td>কম (প্রতিবার অপেক্ষা)</td><td>বেশি</td></tr>
        <tr><td>ঝুঁকি</td><td>ধীর</td><td>ব্যর্থতা নীরবে চলে যেতে পারে</td></tr>
      </table>
      <p><strong>প্রচলিত সেরা প্যাটার্ন:</strong> স্বাভাবিক প্রবাহে <code>commitAsync</code> ব্যবহার করুন (দ্রুত), কিন্তু কনজিউমার বন্ধ হওয়ার সময় বা rebalance-এর ঠিক আগে <code>commitSync</code> দিয়ে শেষবার নিশ্চিত করুন — তাহলে গতি ও নিরাপত্তা দুটোই মেলে।</p>
      <p><strong>মনে রাখবেন:</strong> commitAsync-এ রিট্রাই না করাটা ইচ্ছাকৃত। একটি পুরনো commit দেরিতে সফল হলে সেটি নতুন offset-কে <em>পিছিয়ে</em> দিতে পারত, ফলে মেসেজ আবার প্রসেস হতো।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Commit করা offset আসলে কোথায় সংরক্ষিত হয়?</li>
        <li>ভুল করে পুরনো offset-এ ফিরে গেলে কী হবে?</li>
      </ul>
    `
  },
  {
    id: "mq-25",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Message Acknowledgments","basic.ack"],
    question: "RabbitMQ Message Acknowledgments (autoAck vs manualAck) এবং Channel Prefetch (QoS) কী?",
    answer: `
      <p>RabbitMQ-তে <strong>acknowledgment</strong> ও <strong>prefetch</strong> — এই দুটি সেটিং নির্ভরযোগ্যতা ও লোড বণ্টন নিয়ন্ত্রণ করে, এবং দুটিই প্রায়ই ভুলভাবে কনফিগার করা হয়।</p>
      <h4>autoAck বনাম manual ack</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ autoAck: ব্রোকার মেসেজ পাঠানোমাত্রই ভুলে যায়
// কনজিউমার ক্র্যাশ করলে মেসেজ চিরতরে হারায় (at-most-once)
ch.consume('tasks', handler, { noAck: true });

// ✅ Manual ack: কাজ শেষ হলে তবেই নিশ্চিত করা
ch.consume('tasks', async (msg) => {
  try {
    await processTask(JSON.parse(msg.content));
    ch.ack(msg);                          // সফল — কিউ থেকে মুছে ফেলুন
  } catch (err) {
    if (isTransient(err)) {
      ch.nack(msg, false, true);          // requeue = true → আবার চেষ্টা
    } else {
      ch.nack(msg, false, false);         // requeue = false → DLX-এ পাঠান
    }
  }
}, { noAck: false });</code></pre>
      </div>
      <p><strong>বিপজ্জনক ফাঁদ:</strong> <code>nack(msg, false, true)</code> দিয়ে অন্ধভাবে requeue করলে একটি স্থায়ীভাবে ব্যর্থ মেসেজ (poison message) অসীম লুপে ঘুরতে থাকবে এবং CPU খেয়ে ফেলবে। তাই retry কাউন্ট রাখুন (হেডারে) এবং নির্দিষ্ট বারের পর <strong>Dead Letter Exchange</strong>-এ পাঠান।</p>
      <h4>Prefetch (QoS) — লোড বণ্টনের চাবি</h4>
      <p>ডিফল্টে RabbitMQ কনজিউমারকে যত পারে তত মেসেজ ঠেলে দেয়। ফলে একটি দ্রুত কনজিউমার শত শত মেসেজ নিজের বাফারে জমিয়ে ফেলে, আর অন্য কনজিউমাররা বসে থাকে — লোড অসম হয়ে যায় এবং মেমরিও ফুলে ওঠে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একসাথে সর্বোচ্চ ১০টি unacked মেসেজ পাবে
await ch.prefetch(10);</code></pre>
      </div>
      <table>
        <tr><th>Prefetch</th><th>উপযুক্ত যখন</th><th>প্রভাব</th></tr>
        <tr><td><strong>1</strong></td><td>প্রতিটি টাস্ক দীর্ঘ ও ভারী</td><td>নিখুঁত লোড বণ্টন, কিন্তু বেশি রাউন্ড-ট্রিপ</td></tr>
        <tr><td><strong>10–100</strong></td><td>সাধারণ কাজ</td><td>ভালো ভারসাম্য</td></tr>
        <tr><td><strong>বেশি/সীমাহীন</strong></td><td>অত্যন্ত দ্রুত, ছোট টাস্ক</td><td>থ্রুপুট বেশি, কিন্তু অসম বণ্টন ও মেমরি ঝুঁকি</td></tr>
      </table>
      <p><strong>নিয়ম:</strong> টাস্ক যত দীর্ঘ, prefetch তত কম। ভিডিও প্রসেসিংয়ের মতো কাজে <code>prefetch(1)</code> — নাহলে একটি ওয়ার্কার ১০০টি ভিডিও ধরে রাখবে আর বাকিরা খালি বসে থাকবে।</p>
      <p><strong>মনে রাখবেন:</strong> prefetch হলো <em>per-channel</em> (বা <code>global: true</code> দিলে per-connection)। এবং এটি ব্যাকপ্রেশারেরও প্রধান হাতিয়ার — কনজিউমার ধীর হলে ব্রোকার আপনাআপনি ঠেলা বন্ধ করে দেয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Prefetch-এর সঠিক মান কীভাবে বের করবেন?</li>
        <li>কনজিউমার ack না দিয়ে ঝুলে থাকলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-26",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Log Retention","Retention Policy"],
    question: "Kafka Log Retention Policies (retention.ms, retention.bytes) এবং Log Cleanup (delete vs compact) কী?",
    answer: `
      <p>Kafka মেসেজ পড়ার পর মোছে না — সে <strong>retention নীতি</strong> অনুযায়ী মোছে। এটিই Kafka-কে প্রচলিত কিউ থেকে আলাদা করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সময়ভিত্তিক (ডিফল্ট ৭ দিন)
retention.ms=604800000

# আকারভিত্তিক — প্রতি পার্টিশনে
retention.bytes=10737418240        # 10 GB

# দুটোই দিলে যেটি আগে পূর্ণ হয় সেটিই কার্যকর হয়

# segment কত বড় হলে বন্ধ করে নতুন খোলা হবে
segment.ms=604800000
segment.bytes=1073741824           # 1 GB</code></pre>
      </div>
      <h4>একটি গুরুত্বপূর্ণ সূক্ষ্মতা: segment</h4>
      <p>Kafka <em>একটি একটি করে মেসেজ</em> মোছে না — সে পুরো <strong>segment ফাইল</strong> মোছে। আর <strong>সক্রিয় segment কখনও মোছা হয় না</strong>। তাই <code>retention.ms=1000</code> দিলেও ডেটা সাথে সাথে মুছবে না; segment বন্ধ হওয়া পর্যন্ত (<code>segment.ms</code> বা <code>segment.bytes</code> অনুযায়ী) অপেক্ষা করতে হবে।</p>
      <p>এই কারণেই অনেকে বিভ্রান্ত হন — "retention ১ ঘণ্টা দিলাম, তবু ডেটা রয়ে গেছে কেন?" উত্তর: <code>segment.ms</code>-ও ছোট করতে হবে।</p>
      <h4>দুটি cleanup policy</h4>
      <table>
        <tr><th>নীতি</th><th>আচরণ</th><th>উপযুক্ত</th></tr>
        <tr><td><code>delete</code></td><td>বয়স/আকার অনুযায়ী পুরনো segment মুছে ফেলে</td><td>ইভেন্ট স্ট্রিম, লগ, মেট্রিক</td></tr>
        <tr><td><code>compact</code></td><td>প্রতিটি কী-র সর্বশেষ মান রাখে</td><td>অবস্থা/state, CDC, কনফিগ</td></tr>
        <tr><td><code>compact,delete</code></td><td>compact করে, তারপরও পুরনো হলে মোছে</td><td>সীমাহীন বৃদ্ধি ঠেকাতে</td></tr>
      </table>
      <h4>Retention ঠিক করার বিবেচনা</h4>
      <ul>
        <li><strong>পুনরুদ্ধারের সময়:</strong> একটি কনজিউমার বাগ ধরা পড়তে ও ঠিক করে replay করতে কত সময় লাগতে পারে? সেই সময়ের চেয়ে বেশি retention দিন — নাহলে ঠিক করার আগেই ডেটা মুছে যাবে।</li>
        <li><strong>ডিস্ক খরচ:</strong> retention × ট্রাফিক × replication factor। ৩ রেপ্লিকায় ৭ দিনের ডেটা মানে প্রকৃত ডিস্ক ব্যবহার ২১ দিনের সমান।</li>
        <li><strong>নতুন কনজিউমার:</strong> retention দীর্ঘ হলে নতুন সার্ভিস শুরু থেকে পড়ে নিজের state বানাতে পারে।</li>
        <li><strong>সম্মতি/আইন:</strong> ব্যক্তিগত ডেটা নির্দিষ্ট সময়ের বেশি রাখা যাবে না এমন বাধ্যবাধকতা থাকতে পারে।</li>
      </ul>
      <p><strong>সতর্কতা:</strong> retention কমালে ডেটা <em>অপরিবর্তনীয়ভাবে</em> মুছে যায়। প্রোডাকশনে কমানোর আগে নিশ্চিত হোন কোনো কনজিউমার পিছিয়ে নেই (consumer lag দেখুন)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি কনজিউমার retention-এর চেয়ে বেশি পিছিয়ে পড়লে কী হয়?</li>
        <li>ডিস্ক ভরে গেলে Kafka ব্রোকারের কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-27",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Message Ordering","Partitioning","Keys"],
    question: "Kafka-তে Message Strict Ordering কীভাবে বজায় রাখবেন?",
    answer: `
      <p>Kafka-তে ordering নিয়ে সবচেয়ে গুরুত্বপূর্ণ সত্য: <strong>ক্রম কেবল একটি পার্টিশনের ভেতরে নিশ্চিত</strong>, পুরো টপিকে নয়। গ্লোবাল ordering পেতে হলে টপিকে একটিই পার্টিশন রাখতে হবে — যা সমান্তরালতা সম্পূর্ণ নষ্ট করে দেয়।</p>
      <h4>সঠিক পদ্ধতি: partition key</h4>
      <p>বাস্তবে আপনার গ্লোবাল ordering লাগে না — লাগে <strong>একটি সত্তার জন্য ordering</strong>। একই কী-র সব মেসেজ একই পার্টিশনে যায়, তাই তাদের ক্রম নিশ্চিত থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একই orderId-র সব ইভেন্ট একই পার্টিশনে → ক্রম বজায় থাকবে
await producer.send({
  topic: 'order-events',
  messages: [
    { key: order.id, value: JSON.stringify({ type: 'created',   ...data }) },
    { key: order.id, value: JSON.stringify({ type: 'paid',      ...data }) },
    { key: order.id, value: JSON.stringify({ type: 'shipped',   ...data }) }
  ]
});
// partition = hash(key) % numPartitions
// ভিন্ন অর্ডার ভিন্ন পার্টিশনে যাবে → সমান্তরালতা অক্ষুণ্ণ</code></pre>
      </div>
      <h4>যেসব জিনিস নীরবে ক্রম ভেঙে দেয়</h4>
      <ul>
        <li><strong>রিট্রাই + একাধিক in-flight রিকোয়েস্ট:</strong> <code>max.in.flight.requests.per.connection &gt; 1</code> থাকলে মেসেজ ১ ব্যর্থ হয়ে রিট্রাই হওয়ার আগেই মেসেজ ২ সফল হয়ে যেতে পারে — ক্রম উল্টে যায়। <strong>সমাধান:</strong> <code>enable.idempotence=true</code> দিন; তখন Kafka সিকোয়েন্স নম্বর দিয়ে ক্রম রক্ষা করে এবং ৫ পর্যন্ত in-flight নিরাপদ থাকে।</li>
        <li><strong>পার্টিশন সংখ্যা বাড়ানো:</strong> <code>hash(key) % N</code>-এ N বদলে গেলে একই কী নতুন পার্টিশনে যেতে শুরু করবে, অথচ পুরনো মেসেজ আগের পার্টিশনে রয়ে গেছে। <strong>এটি অপরিবর্তনীয়ভাবে ক্রম ভাঙে</strong> — তাই ordering গুরুত্বপূর্ণ হলে পার্টিশন সংখ্যা আগেই ঠিক করে নিন।</li>
        <li><strong>কনজিউমারে সমান্তরাল প্রসেসিং:</strong> একটি পার্টিশন থেকে মেসেজ নিয়ে থ্রেড পুলে ছড়িয়ে দিলে ব্রোকারের ordering গ্যারান্টি আপনি নিজেই নষ্ট করলেন।</li>
        <li><strong>Key ছাড়া পাঠানো:</strong> কী না দিলে মেসেজ round-robin-এ ছড়িয়ে যায় — কোনো ordering নেই।</li>
      </ul>
      <h4>Key নির্বাচনের ভারসাম্য</h4>
      <p>খুব সংকীর্ণ কী (যেমন সব মেসেজে <code>"global"</code>) সব ট্রাফিক একটি পার্টিশনে ফেলে <strong>hot partition</strong> তৈরি করে। আবার খুব বিস্তৃত কী ordering দেয় না। সঠিক কী হলো সেই সত্তা যার জন্য ক্রম দরকার — সাধারণত <code>userId</code>, <code>orderId</code> বা <code>accountId</code>।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি কী অন্যদের চেয়ে অনেক বেশি ট্রাফিক পেলে (hot key) কী করবেন?</li>
        <li>ক্রম বজায় রেখে কীভাবে সমান্তরালে প্রসেস করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-28",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Clustering","Mirrored Queues"],
    question: "RabbitMQ Clustering, Mirrored Queues এবং Quorum Queues (Raft) এর প্রধান পার্থক্য কী?",
    answer: `
      <p>RabbitMQ-তে HA নিশ্চিত করার তিনটি ধাপ আছে, এবং এদের পার্থক্য বোঝা জরুরি।</p>
      <h4>১. Clustering (ভিত্তি)</h4>
      <p>একাধিক RabbitMQ নোড একসাথে একটি লজিক্যাল ব্রোকার হিসেবে কাজ করে। তারা exchange, binding, ইউজার ও ভার্চুয়াল হোস্টের মেটাডেটা শেয়ার করে।</p>
      <p><strong>গুরুত্বপূর্ণ:</strong> শুধু clustering করলে <strong>কিউয়ের ডেটা রেপ্লিকেট হয় না</strong> — প্রতিটি কিউ একটিমাত্র নোডে থাকে (তার "home node")। সেই নোড ডাউন হলে কিউটি ও তার সব মেসেজ অনুপলব্ধ হয়ে যায়। অন্য নোডরা শুধু রিকোয়েস্ট সেই নোডে ফরওয়ার্ড করে।</p>
      <h4>২. Mirrored Queue (পুরনো, deprecated)</h4>
      <p>কিউ একটি master ও কয়েকটি mirror-এ রেপ্লিকেট হয়। কিন্তু এর রেপ্লিকেশন কোনো আনুষ্ঠানিক consensus অ্যালগরিদম ব্যবহার করত না, ফলে:</p>
      <ul>
        <li>নেটওয়ার্ক পার্টিশনে <strong>split-brain</strong> ও নীরবে মেসেজ হারানো সম্ভব ছিল।</li>
        <li>নতুন mirror যুক্ত হলে পুরো কিউ সিঙ্ক করতে হতো, যা দীর্ঘ সময় কিউ ব্লক করে রাখত।</li>
        <li>RabbitMQ 3.9 থেকে deprecated, 4.0-এ সম্পূর্ণ অপসারিত।</li>
      </ul>
      <h4>৩. Quorum Queue (বর্তমান স্ট্যান্ডার্ড)</h4>
      <p><strong>Raft consensus</strong>-এর উপর তৈরি। একটি মেসেজ তখনই confirm হয় যখন <strong>সংখ্যাগরিষ্ঠ</strong> রেপ্লিকা সেটি ডিস্কে লিখেছে।</p>
      <table>
        <tr><th>দিক</th><th>Mirrored</th><th>Quorum</th></tr>
        <tr><td>ভিত্তি</td><td>কাস্টম রেপ্লিকেশন</td><td><strong>Raft</strong> (প্রমাণিত)</td></tr>
        <tr><td>Split-brain</td><td>সম্ভব</td><td><strong>অসম্ভব</strong></td></tr>
        <tr><td>ডেটা নিরাপত্তা</td><td>দুর্বল</td><td>শক্তিশালী</td></tr>
        <tr><td>Poison message</td><td>নিজে সামলাতে হয়</td><td><code>x-delivery-limit</code> বিল্ট-ইন</td></tr>
        <tr><td>গতি</td><td>দ্রুত</td><td>ধীর (সবসময় ডিস্কে)</td></tr>
        <tr><td>অবস্থা</td><td>অপসারিত</td><td><strong>প্রস্তাবিত</strong></td></tr>
      </table>
      <p><strong>নেটওয়ার্ক পার্টিশন হ্যান্ডলিং:</strong> classic clustering-এ <code>cluster_partition_handling</code> সেট করতে হয় (<code>pause_minority</code> প্রস্তাবিত — সংখ্যালঘু অংশ নিজেকে থামিয়ে দেয়)। Quorum queue-তে এটি Raft-এর অংশ হিসেবেই আসে, আলাদা কনফিগ লাগে না।</p>
      <p><strong>পরামর্শ:</strong> নতুন সিস্টেমে সরাসরি quorum queue ব্যবহার করুন। বিজোড় সংখ্যক নোড (৩ বা ৫) রাখুন এবং সম্ভব হলে ভিন্ন availability zone-এ ছড়িয়ে দিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>৩ নোডের ক্লাস্টারে ২টি নোড হারালে কী হয়?</li>
        <li>RabbitMQ ক্লাস্টার কি একাধিক ডেটাসেন্টারে ছড়ানো উচিত?</li>
      </ul>
    `
  },
  {
    id: "mq-29",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Kafka","Controller Node","KRaft"],
    question: "Kafka Metadata Management: ZooKeeper vs KRaft (Kafka Raft Metadata Mode) কী?",
    answer: `
      <p>Kafka-র মেটাডেটা (কোন টপিকে কত পার্টিশন, কে leader, ACL, কনফিগ) কোথাও সঞ্চিত ও সমন্বিত রাখতে হয়। আগে এই কাজ করত <strong>ZooKeeper</strong>, এখন করে <strong>KRaft</strong>।</p>
      <h4>ZooKeeper-এর সমস্যা</h4>
      <ul>
        <li><strong>দুটি আলাদা সিস্টেম চালাতে হতো</strong> — Kafka ও ZooKeeper, দুটোরই আলাদা কনফিগ, মনিটরিং, নিরাপত্তা ও অপারেশনাল জ্ঞান।</li>
        <li><strong>স্কেলিং সীমা:</strong> মেটাডেটা ZooKeeper-এ থাকায় ক্লাস্টার প্রায় ২০০,০০০ পার্টিশনের বেশি যেতে পারত না।</li>
        <li><strong>ধীর failover:</strong> controller বদলালে তাকে ZooKeeper থেকে সব মেটাডেটা লোড করতে হতো — বড় ক্লাস্টারে কয়েক মিনিট লাগত, এই সময় পার্টিশন leader নির্বাচন থেমে থাকত।</li>
        <li>মেটাডেটা প্রচারে অসঙ্গতি ও race condition-এর ঝুঁকি।</li>
      </ul>
      <h4>KRaft (Kafka Raft) কীভাবে সমাধান করে</h4>
      <p>KRaft-এ Kafka নিজেই Raft consensus বাস্তবায়ন করে এবং মেটাডেটা একটি অভ্যন্তরীণ Kafka টপিকে (<code>__cluster_metadata</code>) রাখে। অর্থাৎ <strong>Kafka তার নিজের লগ ব্যবহার করেই নিজের মেটাডেটা সামলায়</strong> — কোনো বাইরের নির্ভরতা নেই।</p>
      <pre class="mermaid">
flowchart TD
    subgraph ZK["❌ ZooKeeper মোড"]
      Z["ZooKeeper ensemble<br/>(আলাদা সিস্টেম)"] <--> C1["Kafka Controller"]
      C1 --> B1["Broker 1"]
      C1 --> B2["Broker 2"]
    end
    subgraph KR["✅ KRaft মোড"]
      Q["Controller quorum<br/>(Kafka নোডই)"] --> B3["Broker 1"]
      Q --> B4["Broker 2"]
    end
      </pre>
      <span class="diagram-caption">KRaft-এ বাইরের কোনো সমন্বয় সেবা লাগে না</span>
      <h4>যে সুবিধাগুলো পাওয়া যায়</h4>
      <ul>
        <li><strong>একটিই সিস্টেম</strong> — ডিপ্লয়, মনিটরিং ও নিরাপত্তা অনেক সরল।</li>
        <li><strong>লক্ষ লক্ষ পার্টিশন</strong> সমর্থন করে।</li>
        <li><strong>প্রায় তাৎক্ষণিক controller failover</strong> — নতুন controller ইতিমধ্যেই মেটাডেটা লগ ফলো করছিল, তাই আলাদা করে লোড করতে হয় না।</li>
        <li>দ্রুত ক্লাস্টার স্টার্টআপ ও শাটডাউন।</li>
      </ul>
      <p><strong>অবস্থা:</strong> KRaft Kafka 3.3 থেকে প্রোডাকশন-প্রস্তুত, 3.5 থেকে ZooKeeper deprecated, এবং <strong>Kafka 4.0-এ ZooKeeper সম্পূর্ণ অপসারিত</strong>। নতুন ক্লাস্টার অবশ্যই KRaft-এ তৈরি করুন।</p>
      <p><strong>মাইগ্রেশন:</strong> বিদ্যমান ZooKeeper ক্লাস্টার থেকে KRaft-এ যাওয়ার আনুষ্ঠানিক পথ আছে, তবে এটি একমুখী — ফিরে যাওয়া যায় না, তাই সাবধানে পরিকল্পনা করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>KRaft-এ controller নোড কি ব্রোকারের সাথে একসাথে চালানো উচিত?</li>
        <li>Controller quorum-এ কতটি নোড রাখবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-30",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Message TTL","Queue TTL"],
    question: "RabbitMQ Message TTL vs Queue Expiration TTL কীভাবে সেট করবেন?",
    answer: `
      <p>RabbitMQ-তে TTL দুই স্তরে দেওয়া যায়, এবং এদের অর্থ সম্পূর্ণ আলাদা — এটি প্রায়ই গুলিয়ে ফেলা হয়।</p>
      <table>
        <tr><th>ধরন</th><th>আর্গুমেন্ট</th><th>কী মেয়াদোত্তীর্ণ হয়</th></tr>
        <tr><td><strong>Message TTL</strong></td><td><code>x-message-ttl</code></td><td>কিউয়ের ভেতরে থাকা <em>মেসেজ</em></td></tr>
        <tr><td><strong>Queue TTL</strong></td><td><code>x-expires</code></td><td>অব্যবহৃত <em>কিউ</em> নিজেই</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>await ch.assertQueue('otp', {
  durable: true,
  arguments: {
    'x-message-ttl': 300000,     // মেসেজ ৫ মিনিট পর মেয়াদোত্তীর্ণ
    'x-expires': 1800000,        // কিউ ৩০ মিনিট অব্যবহৃত থাকলে মুছে যাবে
    'x-dead-letter-exchange': 'dlx'   // মেয়াদোত্তীর্ণ মেসেজ এখানে যাবে
  }
});

// প্রতি-মেসেজ TTL (কিউ-স্তরের চেয়ে ছোটটি কার্যকর হয়)
ch.sendToQueue('otp', Buffer.from(payload), { expiration: '60000' });</code></pre>
      </div>
      <h4>একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ আচরণ</h4>
      <p>RabbitMQ কেবল <strong>কিউয়ের সামনের (head) মেসেজ</strong> মেয়াদোত্তীর্ণ কি না তা পরীক্ষা করে। অর্থাৎ কিউয়ের মাঝখানে থাকা একটি মেয়াদোত্তীর্ণ মেসেজ ততক্ষণ পর্যন্ত মুছবে না যতক্ষণ না সেটি সামনে আসে।</p>
      <p>এর ফলে <em>প্রতি-মেসেজ TTL</em> ব্যবহার করলে অদ্ভুত অবস্থা হতে পারে: সামনে ১ ঘণ্টার TTL-যুক্ত একটি মেসেজ আটকে থাকলে তার পেছনের ১ মিনিটের TTL-যুক্ত মেসেজগুলোও কিউতে বসে থাকবে (যদিও ডেলিভার হওয়ার সময় সেগুলো বাতিল হবে)। তাই <strong>কিউ-স্তরের অভিন্ন TTL বেশি পূর্বানুমেয়</strong>।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>OTP / ক্ষণস্থায়ী কাজ:</strong> ৫ মিনিট পর OTP পাঠানোর আর অর্থ নেই — TTL দিয়ে বাতিল করুন।</li>
        <li><strong>Delayed retry:</strong> TTL + DLX একসাথে ব্যবহার করে একটি "delay queue" বানানো যায় — মেসেজ TTL শেষে DLX হয়ে মূল কিউতে ফিরে আসে। এটি exponential backoff বাস্তবায়নের ক্লাসিক কৌশল (অথবা <code>rabbitmq_delayed_message_exchange</code> প্লাগইন ব্যবহার করুন)।</li>
        <li><strong>Temporary reply queue:</strong> RPC প্যাটার্নে <code>x-expires</code> দিলে ক্লায়েন্ট চলে গেলে কিউ আপনাআপনি পরিষ্কার হয়ে যায়।</li>
      </ul>
      <p><strong>সতর্কতা:</strong> DLX সেট না করলে মেয়াদোত্তীর্ণ মেসেজ <strong>নীরবে হারিয়ে যায়</strong>। গুরুত্বপূর্ণ মেসেজে সবসময় DLX দিন, যাতে পরে বিশ্লেষণ করা যায় কেন সেগুলো সময়মতো প্রসেস হয়নি।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>TTL + DLX দিয়ে exponential backoff কীভাবে বানাবেন?</li>
        <li>Quorum queue-তে per-message TTL কেন সমর্থিত নয়?</li>
      </ul>
    `
  },
  {
    id: "mq-31",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Kafka","Producer","Partitioner"],
    question: "Kafka Producer Custom Partitioner কীভাবে নির্দিষ্ট পার্টিশনে ট্রাফিক পাঠায়?",
    answer: `
      <p>Kafka ডিফল্টে পার্টিশন বেছে নেয় এভাবে: কী থাকলে <code>murmur2(key) % numPartitions</code>, কী না থাকলে sticky round-robin। বিশেষ প্রয়োজনে নিজস্ব <strong>partitioner</strong> লিখে এই আচরণ বদলানো যায়।</p>
      <h4>কখন কাস্টম partitioner দরকার</h4>
      <ul>
        <li><strong>Hot key সমস্যা:</strong> একটি বিশাল গ্রাহক মোট ট্রাফিকের ৫০% তৈরি করছে — ডিফল্ট হ্যাশিংয়ে তার সব ডেটা একটি পার্টিশনে পড়ে সেটিকে অতিরিক্ত ভারী করে ফেলবে।</li>
        <li><strong>ব্যবসায়িক আলাদা করা:</strong> VIP গ্রাহকদের জন্য আলাদা পার্টিশন সংরক্ষিত রাখা, যাতে সাধারণ ট্রাফিকের ঢল তাদের প্রভাবিত না করে।</li>
        <li><strong>ভৌগোলিক/টেন্যান্ট রাউটিং:</strong> নির্দিষ্ট অঞ্চলের ডেটা নির্দিষ্ট পার্টিশনে রেখে locality বজায় রাখা।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// kafkajs-এ কাস্টম partitioner
const vipPartitioner = () => ({ topic, partitionMetadata, message }) => {
  const total = partitionMetadata.length;
  const key = message.key.toString();

  // শেষ ২টি পার্টিশন VIP-দের জন্য সংরক্ষিত
  if (key.startsWith('vip:')) {
    return total - 1 - (hash(key) % 2);
  }
  // বাকিরা প্রথম (total-2) পার্টিশনে
  return hash(key) % (total - 2);
};

const producer = kafka.producer({ createPartitioner: vipPartitioner });</code></pre>
      </div>
      <h4>Hot key সমাধানের সাধারণ কৌশল: key salting</h4>
      <p>একটি কী-র ট্রাফিক অত্যধিক হলে কী-র সাথে একটি ছোট র‍্যান্ডম সংখ্যা যোগ করে কয়েকটি পার্টিশনে ছড়িয়ে দেওয়া হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// hot key কে N ভাগে ছড়ানো
const salt = Math.floor(Math.random() * 8);
const key = isHot(userId) ? \`\${userId}#\${salt}\` : userId;</code></pre>
      </div>
      <p><strong>খরচ:</strong> এতে সেই কী-র <strong>ordering গ্যারান্টি ভেঙে যায়</strong>, কারণ একই ইউজারের মেসেজ এখন একাধিক পার্টিশনে ছড়ানো। তাই ordering দরকার না হলে তবেই এটি করুন।</p>
      <h4>সতর্কতা</h4>
      <ul>
        <li>কাস্টম partitioner লেখার আগে নিশ্চিত হোন সমস্যাটি বাস্তব — অপ্রয়োজনীয় জটিলতা ডিবাগ করা কঠিন।</li>
        <li>পার্টিশন সংখ্যা বদলালে আপনার লজিকও পুনর্বিবেচনা করতে হবে।</li>
        <li>প্রডিউসারের সব ইনস্ট্যান্সে <strong>একই partitioner</strong> থাকতে হবে, নাহলে একই কী ভিন্ন পার্টিশনে যাবে।</li>
        <li>পার্টিশন বণ্টন মনিটর করুন — প্রতিটি পার্টিশনে বার্তার হার সমান কি না দেখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Sticky partitioner (Kafka 2.4+) কী সমস্যার সমাধান করে?</li>
        <li>Hot partition কীভাবে সনাক্ত করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-32",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Architecture","Kafka vs RabbitMQ","Tradeoffs"],
    question: "RabbitMQ (Smart Broker / Dumb Consumer) vs Kafka (Dumb Broker / Smart Consumer) দর্শনগত পার্থক্য কী?",
    answer: `
      <p>এই দর্শনগত পার্থক্যটিই RabbitMQ ও Kafka-র প্রায় সব আচরণগত ভিন্নতার মূল কারণ — এবং এটি বুঝলে বাকি সব পার্থক্য আপনাআপনি বোঝা যায়।</p>
      <h4>RabbitMQ: Smart Broker, Dumb Consumer</h4>
      <p>ব্রোকার প্রায় সব দায়িত্ব নেয়:</p>
      <ul>
        <li>জটিল রাউটিং সিদ্ধান্ত (exchange, binding, routing key, header)।</li>
        <li>কোন কনজিউমার কোন মেসেজ পেয়েছে তার হিসাব রাখা।</li>
        <li>Ack না পেলে redeliver করা, retry ও DLQ সামলানো।</li>
        <li>মেসেজ ডেলিভার হয়ে ack পেলে সেটি <strong>মুছে ফেলা</strong>।</li>
      </ul>
      <p>কনজিউমার শুধু মেসেজ নেয় ও ack দেয় — তার কোনো অবস্থা ধরে রাখতে হয় না। <strong>ফল:</strong> সহজ কনজিউমার, কিন্তু ব্রোকারে বেশি কাজ (তাই থ্রুপুট তুলনামূলক কম), এবং মেসেজ একবার গেলে আর ফিরে পাওয়া যায় না।</p>
      <h4>Kafka: Dumb Broker, Smart Consumer</h4>
      <p>ব্রোকার প্রায় কিছুই করে না — সে কেবল একটি <strong>append-only লগ ফাইল</strong> রক্ষণাবেক্ষণ করে:</p>
      <ul>
        <li>কোনো রাউটিং নেই — শুধু partition key দিয়ে পার্টিশন নির্বাচন।</li>
        <li>কে কী পড়েছে তার হিসাব রাখে না — <strong>কনজিউমার নিজে offset ট্র্যাক করে</strong>।</li>
        <li>মেসেজ পড়ার পর মোছে না — retention নীতি অনুযায়ী সময়/আকারে মোছে।</li>
      </ul>
      <p><strong>ফল:</strong> ব্রোকার অবিশ্বাস্য দ্রুত (কার্যত শুধু ফাইলে append ও sendfile), কিন্তু কনজিউমারকে অনেক বেশি বুদ্ধিমান হতে হয় — offset ব্যবস্থাপনা, rebalance, ডিডুপ্লিকেশন, retry সব তার দায়িত্ব।</p>
      <h4>এই পার্থক্য থেকে যা সরাসরি আসে</h4>
      <table>
        <tr><th>বৈশিষ্ট্য</th><th>কারণ</th></tr>
        <tr><td>Kafka-তে replay সম্ভব, RabbitMQ-তে নয়</td><td>Kafka মেসেজ মোছে না; RabbitMQ ack পেলেই মোছে</td></tr>
        <tr><td>Kafka-তে বহু স্বাধীন কনজিউমার সহজ</td><td>প্রত্যেকের নিজের offset; RabbitMQ-তে প্রতিটির জন্য আলাদা কিউ বাঁধতে হয়</td></tr>
        <tr><td>Kafka-র থ্রুপুট অনেক বেশি</td><td>ব্রোকার প্রতি মেসেজে কম কাজ করে</td></tr>
        <tr><td>RabbitMQ-র রাউটিং অনেক সমৃদ্ধ</td><td>ব্রোকারই রাউটিং বোঝে</td></tr>
        <tr><td>RabbitMQ-তে per-message ack ও priority আছে</td><td>ব্রোকার প্রতিটি মেসেজের অবস্থা জানে</td></tr>
        <tr><td>Kafka-তে ordering শুধু পার্টিশনে</td><td>লগ কাঠামোর স্বাভাবিক পরিণতি</td></tr>
      </table>
      <p><strong>ইন্টারভিউয়ের সারকথা:</strong> RabbitMQ একটি <em>মেসেজ ব্রোকার</em> — কাজ বিতরণের জন্য। Kafka একটি <em>ডিস্ট্রিবিউটেড কমিট লগ</em> — ইভেন্টের ইতিহাস ধরে রাখার জন্য, যা ঘটনাচক্রে মেসেজিংয়ের কাজেও ব্যবহার করা যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>RabbitMQ Streams কীভাবে এই সীমারেখা ঝাপসা করে দিচ্ছে?</li>
        <li>একটি সিস্টেমে দুটিই ব্যবহার করা কি যুক্তিসঙ্গত?</li>
      </ul>
    `
  },
  {
    id: "mq-33",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Lazy Queues","Memory"],
    question: "RabbitMQ Lazy Queues (x-queue-mode: lazy) RAM মেমোরি রক্ষায় কীভাবে কাজ করে?",
    answer: `
      <p>ডিফল্টে RabbitMQ যতটা সম্ভব মেসেজ <strong>RAM-এ</strong> রাখে, যাতে ডেলিভারি দ্রুত হয়। কিন্তু কনজিউমার ডাউন থাকলে বা ব্যাকলগ জমলে লক্ষ লক্ষ মেসেজ মেমরিতে জমে ব্রোকারকে ধসিয়ে দিতে পারে।</p>
      <p><strong>Lazy Queue</strong> এই আচরণ উল্টে দেয় — মেসেজ যত দ্রুত সম্ভব <strong>ডিস্কে</strong> লিখে ফেলা হয় এবং RAM-এ কেবল ন্যূনতম রাখা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>await ch.assertQueue('bulk-jobs', {
  durable: true,
  arguments: { 'x-queue-mode': 'lazy' }
});

// অথবা policy দিয়ে (বিদ্যমান কিউতেও প্রয়োগ করা যায়)
// rabbitmqctl set_policy lazy-q "^bulk\\." '{"queue-mode":"lazy"}' --apply-to queues</code></pre>
      </div>
      <h4>কখন ব্যবহার করবেন</h4>
      <ul>
        <li><strong>দীর্ঘ কিউ প্রত্যাশিত:</strong> ব্যাচ জব, রিপোর্ট জেনারেশন, রাতের প্রসেসিং — যেখানে লক্ষ লক্ষ মেসেজ জমতে পারে।</li>
        <li><strong>কনজিউমার প্রায়ই বন্ধ থাকে:</strong> মেসেজ জমে থাকবে জেনেই ডিজাইন করা।</li>
        <li><strong>মেমরি চাপ ঠেকানো:</strong> ব্রোকার যেন memory alarm-এ গিয়ে সব প্রকাশনা থামিয়ে না দেয়।</li>
        <li><strong>ট্রাফিক স্পাইক শোষণ:</strong> হঠাৎ ঢল এলে ডিস্কে জমা হবে, RAM ভরবে না।</li>
      </ul>
      <h4>খরচ</h4>
      <ul>
        <li><strong>Latency বাড়ে:</strong> প্রতিটি মেসেজ ডিস্কে যায় এবং পড়তেও ডিস্ক থেকে আসে। খালি কিউতে (যেখানে মেসেজ সাথে সাথে ডেলিভার হয়) এটি অপ্রয়োজনীয় ধীরগতি।</li>
        <li><strong>ডিস্ক I/O বেশি</strong> — ধীর ডিস্কে bottleneck হতে পারে।</li>
        <li>তাই <strong>ছোট, দ্রুত-নিষ্কাশিত কিউতে lazy mode ব্যবহার করবেন না।</strong></li>
      </ul>
      <p><strong>গুরুত্বপূর্ণ প্রেক্ষিত:</strong> <strong>Quorum queue সবসময়ই ডিস্ক-ভিত্তিক</strong>, তাই সেখানে lazy mode-এর ধারণাটিই প্রযোজ্য নয় (এবং সমর্থিতও নয়)। RabbitMQ 3.12+ থেকে classic queue-ও ডিফল্টে অনেক বেশি মেমরি-সচেতন হয়েছে, ফলে lazy mode-এর প্রয়োজনীয়তা কমে এসেছে। নতুন সিস্টেমে quorum queue বেছে নিলে এই সিদ্ধান্তটি নিতেই হয় না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Memory alarm ট্রিগার হলে প্রডিউসারের কী হয়?</li>
        <li>কিউ দীর্ঘ হয়ে যাওয়া কি সবসময় সমস্যা?</li>
      </ul>
    `
  },
  {
    id: "mq-34",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Transaction","Transactional Producer"],
    question: "Kafka Exactly-Once Semantics (EOS) এবং Transactional Producer (initTransactions, sendOffsetsToTransaction) কীভাবে কাজ করে?",
    answer: `
      <p>Kafka-র <strong>Exactly-Once Semantics (EOS)</strong> একটি নির্দিষ্ট পরিস্থিতিতে প্রকৃত exactly-once নিশ্চয়তা দেয়: <strong>consume → process → produce</strong> — অর্থাৎ যখন পুরো প্রবাহটি Kafka-র ভেতরে থাকে।</p>
      <h4>দুটি স্তম্ভ</h4>
      <ul>
        <li><strong>Idempotent Producer:</strong> প্রতিটি প্রডিউসারের একটি PID ও প্রতি পার্টিশনে সিকোয়েন্স নম্বর থাকে। ব্রোকার ডুপ্লিকেট সিকোয়েন্স দেখলে নীরবে বাদ দেয় — রিট্রাইয়ে ডুপ্লিকেট লেখা হয় না।</li>
        <li><strong>Transactions:</strong> একাধিক পার্টিশনে লেখা এবং offset commit — সবগুলোকে একটি অ্যাটমিক একক হিসেবে সম্পন্ন করা।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const producer = kafka.producer({
  transactionalId: 'order-processor-1',   // ইনস্ট্যান্স-প্রতি ইউনিক ও স্থিতিশীল
  idempotent: true,
  maxInFlightRequests: 5
});
await producer.connect();

await consumer.run({
  eachBatch: async ({ batch }) => {
    const tx = await producer.transaction();
    try {
      for (const message of batch.messages) {
        const result = transform(message);
        await tx.send({ topic: 'processed-orders', messages: [result] });
      }
      // ⚠️ মূল কৌশল: offset commit-ও ট্রানজেকশনের অংশ
      await tx.sendOffsets({
        consumerGroupId: 'order-processors',
        topics: [{ topic: batch.topic,
                   partitions: [{ partition: batch.partition,
                                  offset: (Number(batch.lastOffset()) + 1).toString() }] }]
      });
      await tx.commit();      // আউটপুট ও offset — দুটোই একসাথে
    } catch (err) {
      await tx.abort();       // কিছুই হলো না
      throw err;
    }
  }
});</code></pre>
      </div>
      <h4>কেন <code>sendOffsetsToTransaction</code> সবকিছু বদলে দেয়</h4>
      <p>সাধারণত দুটি আলাদা কাজ থাকে — আউটপুট লেখা এবং ইনপুট offset commit করা। এদুটির মাঝখানে ক্র্যাশ হলে হয় ডুপ্লিকেট (offset commit হয়নি) নয়তো ডেটা হারানো (আউটপুট যায়নি অথচ offset commit হয়েছে)।</p>
      <p>Offset commit-কেও ট্রানজেকশনের ভেতরে আনলে দুটি হয় একসাথে সফল, নয়তো একসাথে বাতিল — মাঝামাঝি অবস্থা আর সম্ভব নয়।</p>
      <h4>কনজিউমারের দিকেও কনফিগ লাগে</h4>
      <p>ডাউনস্ট্রিম কনজিউমারকে <code>isolation.level=read_committed</code> দিতে হবে, নাহলে সে abort হওয়া ট্রানজেকশনের মেসেজও পড়ে ফেলবে।</p>
      <h4>সীমাবদ্ধতা — যা অবশ্যই বলবেন</h4>
      <ul>
        <li><strong>শুধু Kafka-র ভেতরে কাজ করে।</strong> আপনি যদি ডাটাবেজে লেখেন বা কোনো API কল করেন, সেটি ট্রানজেকশনের অংশ নয় — তখন idempotency-ই একমাত্র সমাধান।</li>
        <li><strong>পারফরম্যান্স খরচ:</strong> সাধারণত ৩–২০% থ্রুপুট কমে এবং latency বাড়ে (ট্রানজেকশন মার্কার লিখতে হয়)।</li>
        <li><strong>জটিলতা:</strong> <code>transactionalId</code> ব্যবস্থাপনা, transaction timeout, zombie fencing — সব বুঝতে হয়।</li>
      </ul>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> Kafka Streams ব্যবহার করলে <code>processing.guarantee=exactly_once_v2</code> দিয়ে এই সবই একটি সেটিংয়ে পাওয়া যায় — নিজে হাতে ট্রানজেকশন লেখার চেয়ে অনেক নিরাপদ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Zombie producer কী এবং fencing কীভাবে কাজ করে?</li>
        <li>ডাটাবেজে লিখতে হলে exactly-once কীভাবে অর্জন করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-35",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Flow Control","Memory Alarm"],
    question: "RabbitMQ Memory Alarm and Disk Free Alarm কীভাবে মেসেজ প্রকাশ স্থগিত করে?",
    answer: `
      <p>RabbitMQ-তে দুটি স্বয়ংক্রিয় সুরক্ষা ব্যবস্থা আছে যা ব্রোকারকে সম্পূর্ণ ধসে পড়া থেকে বাঁচায় — মেমরি ও ডিস্ক alarm। এগুলো সক্রিয় হলে ব্রোকার <strong>প্রকাশনা (publishing) স্থগিত করে দেয়</strong>।</p>
      <h4>Memory Alarm</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># মোট RAM-এর কত অংশ ব্যবহার হলে alarm (ডিফল্ট 0.4 = 40%)
vm_memory_high_watermark.relative = 0.4

# অথবা নির্দিষ্ট পরিমাণে
# vm_memory_high_watermark.absolute = 2GB

rabbitmqctl status | grep -A5 memory
rabbitmqctl set_vm_memory_high_watermark 0.5</code></pre>
      </div>
      <p><strong>৪০% কেন:</strong> RabbitMQ Erlang VM-এ চলে, যেখানে গার্বেজ কালেকশনের সময় সাময়িকভাবে মেমরি দ্বিগুণ হতে পারে। রক্ষণশীল সীমা তাই ইচ্ছাকৃত — এটি বাড়ানোর আগে ভালোভাবে পরীক্ষা করুন।</p>
      <h4>Disk Free Alarm</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ফাঁকা ডিস্ক এর নিচে নামলে alarm (ডিফল্ট 50MB — প্রোডাকশনে খুবই কম!)
disk_free_limit.absolute = 5GB
# অথবা RAM-এর অনুপাতে
# disk_free_limit.relative = 2.0</code></pre>
      </div>
      <p>ডিফল্ট ৫০ MB প্রোডাকশনের জন্য বিপজ্জনকভাবে কম — ডিস্ক ভরে গেলে RabbitMQ ডেটা করাপ্ট হতে পারে। অন্তত কয়েক গিগাবাইট রাখুন।</p>
      <h4>Alarm সক্রিয় হলে কী ঘটে</h4>
      <ul>
        <li><strong>সব প্রকাশক ব্লক হয়ে যায়</strong> — TCP স্তরে RabbitMQ প্রডিউসার কানেকশন থেকে পড়া বন্ধ করে দেয়। প্রডিউসার কোনো এরর পায় না, শুধু <code>publish()</code> ঝুলে থাকে।</li>
        <li><strong>কনজিউমাররা স্বাভাবিকভাবে চলতে থাকে</strong> — এটি ইচ্ছাকৃত, যাতে কিউ খালি হয়ে alarm নিজে থেকেই কেটে যায়।</li>
        <li>alarm কেটে গেলে প্রকাশনা আপনাআপনি আবার শুরু হয়।</li>
      </ul>
      <p><strong>যে সমস্যাটি বাস্তবে দেখা যায়:</strong> অ্যাপ্লিকেশন ডেভেলপাররা রিপোর্ট করেন "RabbitMQ ঝুলে গেছে, কোনো এরর নেই" — আসলে alarm সক্রিয়। তাই প্রডিউসারে অবশ্যই <strong>publish টাইমআউট</strong> রাখুন, নাহলে আপনার অ্যাপ্লিকেশন থ্রেড অনির্দিষ্টকাল আটকে থাকবে এবং সেটিও ধসে পড়বে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># alarm-এর অবস্থা দেখা
rabbitmqctl eval 'rabbit_alarm:get_alarms().'
rabbitmq-diagnostics alarms
rabbitmq-diagnostics check_alarms     # মনিটরিংয়ে ব্যবহার করুন</code></pre>
      </div>
      <p><strong>প্রতিরোধ:</strong> কিউ দীর্ঘ হতে দেবেন না। <code>x-max-length</code> বা <code>x-max-length-bytes</code> দিয়ে সীমা বেঁধে দিন (সীমা ছাড়ালে পুরনো মেসেজ DLX-এ যাবে), lazy বা quorum queue ব্যবহার করুন, এবং consumer lag মনিটর করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Memory alarm-এর সময় কনজিউমারও বন্ধ করলে কী হতো?</li>
        <li>কিউ সীমা ছাড়ালে কোন মেসেজ বাদ দেবেন — পুরনো না নতুন?</li>
      </ul>
    `
  },
  {
    id: "mq-36",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Zero Copy","sendfile"],
    question: "Kafka Performance: OS Page Cache এবং Zero-Copy (sendfile syscall) কীভাবে কাফকাকে অতি দ্রুত করে?",
    answer: `
      <p>Kafka ডিস্কে লেখা সত্ত্বেও ইন-মেমরি সিস্টেমের কাছাকাছি গতি পায় — এর পেছনে দুটি অপারেটিং সিস্টেম-স্তরের কৌশল আছে।</p>
      <h4>১. OS Page Cache-এর উপর নির্ভরতা</h4>
      <p>Kafka নিজে কোনো ইন-মেমরি ক্যাশ রাখে না। বদলে এটি ডেটা সরাসরি ফাইলে লেখে এবং <strong>অপারেটিং সিস্টেমের page cache</strong>-এর উপর নির্ভর করে।</p>
      <ul>
        <li>লেখা যায় page cache-এ (RAM), OS পরে অলসভাবে ডিস্কে ফ্লাশ করে — তাই write অত্যন্ত দ্রুত।</li>
        <li>কনজিউমাররা সাধারণত <em>সদ্য লেখা</em> ডেটাই পড়ে, যা তখনও page cache-এ থাকে — অর্থাৎ read-ও RAM থেকেই হয়, ডিস্ক ছোঁয়া লাগে না।</li>
        <li><strong>সুবিধা:</strong> JVM heap-এ ক্যাশ রাখলে GC চাপ ও অবজেক্ট ওভারহেড হতো। Page cache ব্যবহারে Kafka প্রসেস রিস্টার্ট করলেও ক্যাশ গরম থাকে, কারণ সেটি কার্নেলের।</li>
      </ul>
      <p>এজন্যই Kafka ব্রোকারে বড় JVM heap দেওয়া <strong>ভুল</strong> — heap ছোট (৬-৮ GB) রেখে বাকি RAM OS-কে page cache-এর জন্য ছেড়ে দিতে হয়।</p>
      <h4>২. Zero-Copy (<code>sendfile</code>)</h4>
      <p>সাধারণভাবে ডিস্ক থেকে নেটওয়ার্কে ডেটা পাঠাতে ৪ বার কপি ও ৪ বার context switch লাগে:</p>
      <pre class="mermaid">
flowchart TD
    subgraph N["❌ সাধারণ পথ (4 কপি)"]
      D1["Disk"] --> K1["Kernel buffer"] --> A1["App buffer"] --> S1["Socket buffer"] --> NIC1["NIC"]
    end
    subgraph Z["✅ Zero-copy (sendfile)"]
      D2["Disk"] --> K2["Kernel page cache"] --> NIC2["NIC"]
    end
      </pre>
      <span class="diagram-caption">Zero-copy-তে ডেটা অ্যাপ্লিকেশনের মেমরিতে ঢোকেই না</span>
      <p><code>sendfile()</code> সিস্টেম কল ব্যবহার করে Kafka কার্নেলকে বলে "এই ফাইলের এই অংশটুকু সরাসরি এই সকেটে পাঠাও"। ডেটা কখনও ইউজার-স্পেসে (JVM-এ) আসে না — CPU ও মেমরি ব্যান্ডউইথ দুটোই বিশাল পরিমাণে বাঁচে।</p>
      <h4>৩. অন্যান্য সহায়ক নকশা</h4>
      <ul>
        <li><strong>Sequential I/O:</strong> Kafka শুধু ফাইলের শেষে append করে। ক্রমিক ডিস্ক write র‍্যান্ডম write-এর চেয়ে শতগুণ দ্রুত — এমনকি HDD-তেও ক্রমিক write RAM-এর র‍্যান্ডম অ্যাক্সেসের সাথে তুলনীয়।</li>
        <li><strong>Batching:</strong> প্রডিউসার ও কনজিউমার উভয়েই মেসেজ ব্যাচে পাঠায়/নেয় — প্রতি মেসেজের নেটওয়ার্ক ও সিস্টেম কল ওভারহেড ভাগ হয়ে যায়।</li>
        <li><strong>Binary protocol ও কম্প্রেশন:</strong> ব্যাচ পুরোটা একসাথে কম্প্রেস হয় এবং <em>কম্প্রেসড অবস্থাতেই</em> ডিস্কে ও কনজিউমারে যায় — ব্রোকারকে ডিকম্প্রেস করতে হয় না।</li>
      </ul>
      <p><strong>একটি গুরুত্বপূর্ণ পরিণতি:</strong> zero-copy কেবল তখনই কাজ করে যখন ব্রোকারকে ডেটা <em>স্পর্শ</em> করতে হয় না। TLS এনক্রিপশন চালু করলে ডেটা এনক্রিপ্ট করতে ইউজার-স্পেসে আনতে হয় — তাই zero-copy-র সুবিধা হারিয়ে যায় এবং CPU খরচ লক্ষণীয়ভাবে বাড়ে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Kafka ব্রোকারে JVM heap ছোট রাখা কেন গুরুত্বপূর্ণ?</li>
        <li>কনজিউমার অনেক পিছিয়ে থাকলে পারফরম্যান্সে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-37",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Consumer Cancel","Cancel Callback"],
    question: "RabbitMQ Consumer Cancel Notification এবং Graceful Consumer Recovery কীভাবে করবেন?",
    answer: `
      <p>RabbitMQ কনজিউমারকে জোর করে বাতিল করতে পারে — কিউ মুছে ফেলা হলে, নোড ব্যর্থ হলে, বা অ্যাডমিন ম্যানুয়ালি বাতিল করলে। <strong>Consumer Cancel Notification</strong> সেই খবরটি ক্লায়েন্টকে জানায়, যাতে সে সঠিকভাবে পুনরুদ্ধার করতে পারে।</p>
      <p>এই নোটিফিকেশন না থাকলে ক্লায়েন্ট চুপচাপ বসে থাকত — কানেকশন খোলা, কিন্তু কোনো মেসেজ আসছে না। নীরব ব্যর্থতা, যা ধরা কঠিন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { consumerTag } = await ch.consume('tasks', async (msg) => {
  // ⚠️ msg === null মানে কনজিউমার বাতিল হয়েছে
  if (msg === null) {
    console.warn('Consumer cancelled by broker — পুনঃপ্রতিষ্ঠা করছি');
    await resubscribe();
    return;
  }
  try {
    await processTask(JSON.parse(msg.content));
    ch.ack(msg);
  } catch (err) {
    ch.nack(msg, false, !isPermanent(err));
  }
});

// চ্যানেল ও কানেকশন স্তরের ইভেন্টও সামলান
ch.on('close', () => scheduleReconnect());
ch.on('error', (err) => logger.error({ err }, 'channel error'));
conn.on('close', () => scheduleReconnect());
conn.on('error', (err) => logger.error({ err }, 'connection error'));</code></pre>
      </div>
      <h4>নির্ভরযোগ্য পুনরুদ্ধারের নিয়ম</h4>
      <ul>
        <li><strong>Backoff + jitter সহ রিকানেক্ট:</strong> ব্রোকার রিস্টার্ট করলে সব ক্লায়েন্ট একসাথে ঝাঁপিয়ে পড়লে সেটি আবার ধসে পড়বে।</li>
        <li><strong>টপোলজি আবার ঘোষণা করুন:</strong> রিকানেক্টের পর exchange, queue ও binding আবার <code>assert</code> করুন। বিশেষ করে auto-delete/exclusive কিউ ইতিমধ্যে মুছে গেছে।</li>
        <li><strong>Prefetch আবার সেট করুন</strong> — নতুন চ্যানেলে এটি ডিফল্টে ফিরে যায়, যা ভুলে গেলে হঠাৎ অসম লোড হয়।</li>
        <li><strong>পুরনো মেসেজ অবজেক্টে ack দেবেন না:</strong> চ্যানেল বন্ধ হয়ে গেলে delivery tag অকার্যকর; ack দিলে চ্যানেল এরর হবে। unacked মেসেজ ব্রোকার আপনাআপনি requeue করে।</li>
        <li><strong>Idempotent কনজিউমার:</strong> কানেকশন হারালে unacked মেসেজ আবার ডেলিভার হবে — ডুপ্লিকেট প্রসেসিং হবেই।</li>
      </ul>
      <h4>Graceful shutdown</h4>
      <p>ডিপ্লয়ের সময় সঠিক ক্রম হলো: (১) <code>ch.cancel(consumerTag)</code> দিয়ে নতুন মেসেজ নেওয়া বন্ধ করুন, (২) চলমান কাজ শেষ করে ack দিন, (৩) চ্যানেল ও কানেকশন বন্ধ করুন। সরাসরি প্রসেস মেরে ফেললে চলমান কাজগুলো requeue হয়ে ডুপ্লিকেট প্রসেসিং তৈরি করে।</p>
      <p><strong>পরামর্শ:</strong> এই সবই নিজে লেখার বদলে <code>amqp-connection-manager</code>-এর মতো লাইব্রেরি ব্যবহার করুন — এটি রিকানেক্ট, টপোলজি পুনঃঘোষণা ও অফলাইন পাবলিশ বাফার স্বয়ংক্রিয়ভাবে সামলায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>রিকানেক্টের সময় প্রকাশিত মেসেজগুলোর কী হবে?</li>
        <li>Kubernetes-এ graceful shutdown-এর জন্য কত সময় দেবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-38",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Streams API","State Stores"],
    question: "Kafka Streams API এবং RocksDB State Store দিয়ে রিয়েল-টাইম স্ট্রিম প্রসেসিং কীভাবে করবেন?",
    answer: `
      <p><strong>Kafka Streams</strong> একটি লাইব্রেরি (আলাদা ক্লাস্টার নয়) যা দিয়ে Kafka টপিকের উপর রিয়েল-টাইম প্রসেসিং করা যায় — filter, map, join, aggregate, windowing।</p>
      <p>মূল সুবিধা: এটি শুধু একটি লাইব্রেরি, তাই আপনার সাধারণ অ্যাপ্লিকেশনের ভেতরেই চলে। Spark বা Flink-এর মতো আলাদা ক্লাস্টার চালানো ও রক্ষণাবেক্ষণের দরকার নেই।</p>
      <h4>Stateless বনাম Stateful অপারেশন</h4>
      <ul>
        <li><strong>Stateless:</strong> <code>filter</code>, <code>map</code>, <code>flatMap</code> — প্রতিটি ইভেন্ট স্বাধীনভাবে প্রসেস হয়, কিছু মনে রাখতে হয় না।</li>
        <li><strong>Stateful:</strong> <code>count</code>, <code>aggregate</code>, <code>join</code>, windowing — আগের ইভেন্টের তথ্য মনে রাখতে হয়। এখানেই state store দরকার।</li>
      </ul>
      <h4>RocksDB State Store — কেন এবং কীভাবে</h4>
      <p>"গত ৫ মিনিটে প্রতিটি ইউজার কতবার ক্লিক করেছে" গণনা করতে হলে চলমান কাউন্ট কোথাও রাখতে হবে। সব মেমরিতে রাখলে ডেটা বড় হলেই OOM হবে।</p>
      <p>Kafka Streams তাই <strong>RocksDB</strong> ব্যবহার করে — একটি এমবেডেড, ডিস্ক-ভিত্তিক key-value স্টোর যা প্রতিটি অ্যাপ্লিকেশন ইনস্ট্যান্সের <em>লোকাল ডিস্কে</em> চলে। ফলে RAM-এর চেয়ে বড় state রাখা যায়, অথচ অ্যাক্সেস দ্রুত (নেটওয়ার্ক কল লাগে না)।</p>
      <pre class="mermaid">
flowchart LR
    K["Kafka topic"] --> A["Streams App"]
    A <--> R[("RocksDB<br/>লোকাল ডিস্ক")]
    R -.->|"প্রতিটি পরিবর্তন"| CL["changelog topic<br/>(compacted)"]
    CL -.->|"ক্র্যাশে<br/>পুনর্গঠন"| R
      </pre>
      <span class="diagram-caption">লোকাল state দ্রুত; changelog টপিক সেটিকে fault-tolerant করে</span>
      <p><strong>এখানেই আসল কৌশল:</strong> লোকাল ডিস্ক নির্ভরযোগ্য নয় (মেশিন মরে যেতে পারে)। তাই RocksDB-র প্রতিটি পরিবর্তন একটি <strong>compacted changelog টপিকে</strong> Kafka-তেই লেখা হয়। ইনস্ট্যান্স ক্র্যাশ করলে নতুন ইনস্ট্যান্স সেই টপিক পড়ে নিজের RocksDB পুনর্গঠন করে নেয়। অর্থাৎ <em>Kafka নিজেই state-এর ব্যাকআপ</em>।</p>
      <div class="code-box">
        <div class="code-header"><span>java</span><button class="copy-btn">Copy</button></div>
        <pre><code>StreamsBuilder builder = new StreamsBuilder();

builder.stream("clicks")
    .groupByKey()
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
    .count(Materialized.as("click-counts"))     // RocksDB store
    .toStream()
    .to("click-counts-output");

// exactly-once একটি সেটিংয়ে
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, "exactly_once_v2");</code></pre>
      </div>
      <p><strong>Node.js প্রসঙ্গ:</strong> Kafka Streams কেবল JVM-এর জন্য। Node.js-এ সমতুল্য কিছু নেই — সেখানে সাধারণত সরল কনজিউমার + Redis/ডাটাবেজে state রাখা হয়, অথবা ভারী স্ট্রিম প্রসেসিংয়ের জন্য Flink ব্যবহার করা হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Changelog টপিক compacted কেন রাখা হয়?</li>
        <li>KStream ও KTable-এর মধ্যে পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "mq-39",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Exclusive Queue","Auto Delete"],
    question: "RabbitMQ Exclusive Queue এবং Auto-Delete Queue-এর ব্যবহার কী?",
    answer: `
      <p>RabbitMQ-তে কিউয়ের জীবনকাল নিয়ন্ত্রণের দুটি বিশেষ ফ্ল্যাগ আছে, যেগুলো ক্ষণস্থায়ী কিউ ব্যবস্থাপনায় ব্যবহৃত হয়।</p>
      <table>
        <tr><th>ফ্ল্যাগ</th><th>আচরণ</th><th>কখন মুছে যায়</th></tr>
        <tr><td><strong>exclusive</strong></td><td>শুধু যে কানেকশন তৈরি করেছে সে-ই ব্যবহার করতে পারে</td><td>সেই <em>কানেকশন</em> বন্ধ হলে</td></tr>
        <tr><td><strong>autoDelete</strong></td><td>একাধিক কনজিউমার ব্যবহার করতে পারে</td><td><em>শেষ কনজিউমার</em> চলে গেলে</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// RPC-র reply queue — সার্ভার নাম দেয়, শুধু এই কানেকশনের জন্য
const { queue } = await ch.assertQueue('', {
  exclusive: true      // durable: false, autoDelete: true স্বয়ংক্রিয়ভাবে
});

// একটি WebSocket সার্ভার ইনস্ট্যান্সের নিজস্ব ব্রডকাস্ট কিউ
await ch.assertQueue('notifications.node-7', {
  autoDelete: true,    // এই নোড বন্ধ হলে কিউ পরিষ্কার হয়ে যাবে
  durable: false
});
await ch.bindQueue('notifications.node-7', 'broadcast', '');</code></pre>
      </div>
      <h4>প্রধান ব্যবহার</h4>
      <ul>
        <li><strong>RPC reply queue:</strong> প্রতিটি ক্লায়েন্ট একটি অস্থায়ী exclusive কিউ বানায় উত্তর গ্রহণের জন্য। ক্লায়েন্ট চলে গেলে কিউ আপনাআপনি মুছে যায় — নাহলে হাজারো পরিত্যক্ত কিউ জমে ব্রোকার ভারী হয়ে যেত।</li>
        <li><strong>Fanout সাবস্ক্রাইবার:</strong> প্রতিটি সার্ভার ইনস্ট্যান্স নিজের অস্থায়ী কিউ বাঁধে একটি fanout exchange-এ। ইনস্ট্যান্স স্কেল-ডাউন হলে কিউও সরে যায়।</li>
        <li><strong>একক-ভোক্তা নিশ্চিত করা:</strong> exclusive দিয়ে গ্যারান্টি দেওয়া যায় যে কেবল একটি প্রসেসই এই কিউ পড়ছে।</li>
      </ul>
      <h4>সতর্কতা</h4>
      <ul>
        <li><strong>সংযোগ বিচ্ছিন্ন হলে ডেটা হারায়:</strong> নেটওয়ার্ক সাময়িকভাবে কাটলেই exclusive কিউ ও তার সব মেসেজ মুছে যায়। তাই গুরুত্বপূর্ণ ডেটায় ব্যবহার করবেন না।</li>
        <li><strong>রিকানেক্টে নতুন কিউ:</strong> ক্লায়েন্ট আবার সংযুক্ত হলে তাকে নতুন করে কিউ ও binding তৈরি করতে হবে — রিকানেক্ট লজিকে এটি অবশ্যই রাখুন।</li>
        <li><strong>autoDelete-এর সূক্ষ্মতা:</strong> কিউতে অন্তত একবার কনজিউমার যুক্ত হওয়ার পরেই কেবল "শেষ কনজিউমার চলে যাওয়া" গণনা শুরু হয়। কখনও কোনো কনজিউমার না এলে কিউ মুছবে না।</li>
        <li><strong>Quorum queue-তে exclusive সমর্থিত নয়</strong> — এগুলো স্বভাবতই ক্ষণস্থায়ী, আর quorum queue ডিউরেবিলিটির জন্য।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>RPC-তে reply queue প্রতিবার নতুন বানানো কি দক্ষ?</li>
        <li>exclusive কিউয়ের কনজিউমার ক্র্যাশ করলে মেসেজগুলোর কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-40",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Compaction","Tombstone Marker"],
    question: "Kafka Log Compaction-এ Tombstone Marker (Null Payload) কী?",
    answer: `
      <p>Compacted টপিকে একটি কী <em>মুছে ফেলার</em> একমাত্র উপায় হলো সেই কী-তে <strong>null payload</strong> সহ একটি মেসেজ পাঠানো। একে বলা হয় <strong>tombstone</strong> (সমাধিফলক)।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ইউজার অ্যাকাউন্ট মুছে ফেলার ইভেন্ট
await producer.send({
  topic: 'user-profiles',
  messages: [{ key: 'user:1234', value: null }]   // ⚠️ null — খালি স্ট্রিং নয়
});</code></pre>
      </div>
      <p><strong>গুরুত্বপূর্ণ:</strong> <code>value: null</code> এবং <code>value: ""</code> সম্পূর্ণ আলাদা। খালি স্ট্রিং একটি বৈধ মান এবং সেটি tombstone হিসেবে গণ্য হবে না।</p>
      <h4>জীবনচক্র</h4>
      <ol>
        <li>Tombstone টপিকে লেখা হয় — কনজিউমাররা সেটি পড়ে বুঝতে পারে কী-টি মুছে গেছে এবং নিজেদের স্থানীয় state থেকে সরিয়ে ফেলে।</li>
        <li>Compaction চলার সময় সেই কী-র <em>সব পুরনো রেকর্ড</em> মুছে যায়।</li>
        <li><code>delete.retention.ms</code> (ডিফল্ট ২৪ ঘণ্টা) সময় পর tombstone-টিও মুছে ফেলা হয়।</li>
      </ol>
      <h4>Tombstone কিছুক্ষণ রাখা হয় কেন</h4>
      <p>এটিই সবচেয়ে সূক্ষ্ম অংশ। যদি tombstone সাথে সাথে মুছে ফেলা হতো, তাহলে একটি পিছিয়ে থাকা বা অফলাইন কনজিউমার কখনও জানতেই পারত না যে কী-টি মুছে গেছে। সে শুধু দেখত কী-টি আর নেই — কিন্তু তার নিজের স্থানীয় state-এ পুরনো মানটি রয়ে যেত (ভূত রেকর্ড)।</p>
      <p><code>delete.retention.ms</code> কনজিউমারদের সেই খবর পাওয়ার সময় দেয়। তাই এই মান <strong>আপনার কনজিউমারের সর্বোচ্চ সম্ভাব্য ডাউনটাইমের চেয়ে বেশি</strong> রাখা উচিত।</p>
      <h4>বাস্তব প্রয়োগ</h4>
      <ul>
        <li><strong>GDPR / ডেটা মুছে ফেলা:</strong> "ভুলে যাওয়ার অধিকার" প্রয়োগে compacted টপিক থেকে ব্যক্তিগত ডেটা সরানোর একমাত্র উপায়।</li>
        <li><strong>CDC:</strong> Debezium ডাটাবেজের DELETE-কে tombstone হিসেবে প্রকাশ করে, যাতে ডাউনস্ট্রিম সিস্টেমও রেকর্ড মুছে ফেলে।</li>
        <li><strong>Kafka Streams:</strong> KTable-এ null মান পাঠানো মানে সেই কী state store থেকে সরিয়ে ফেলা।</li>
      </ul>
      <p><strong>কনজিউমারে সতর্কতা:</strong> কোড অবশ্যই null value সামলাতে প্রস্তুত থাকতে হবে — নাহলে <code>JSON.parse(null)</code> বা null dereference-এ ক্র্যাশ করবে। এটি একটি অত্যন্ত সাধারণ বাগ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Tombstone মুছে যাওয়ার পর নতুন কনজিউমার এলে সে কী দেখবে?</li>
        <li>Compaction ছাড়া টপিকে tombstone পাঠালে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mq-41",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Monitoring","Prometheus","Metrics"],
    question: "RabbitMQ and Kafka Prometheus Metrics: Consumer Lag কী এবং এটি কেন মনিটর করা জরুরি?",
    answer: `
      <p><strong>Consumer Lag</strong> = পার্টিশনের সর্বশেষ offset − কনজিউমারের commit করা offset। সহজভাবে: <em>কতগুলো মেসেজ উৎপাদিত হয়েছে কিন্তু এখনও প্রসেস হয়নি</em>।</p>
      <p>এটি মেসেজিং সিস্টেমের <strong>সবচেয়ে গুরুত্বপূর্ণ একক মেট্রিক</strong>, কারণ এটি সরাসরি বলে দেয় আপনার কনজিউমাররা উৎপাদনের গতির সাথে তাল মেলাতে পারছে কি না।</p>
      <h4>যা সঠিকভাবে ব্যাখ্যা করা জরুরি</h4>
      <ul>
        <li><strong>বড় কিন্তু স্থিতিশীল lag = সুস্থ।</strong> সিস্টেম ধারাবাহিকভাবে একটি ব্যাকলগ নিয়ে চলছে, কিন্তু পিছিয়ে পড়ছে না।</li>
        <li><strong>ক্রমাগত বাড়তে থাকা lag = বিপদ।</strong> কনজিউমার উৎপাদনের চেয়ে ধীর — এটি কখনও নিজে থেকে ঠিক হবে না।</li>
        <li><strong>হঠাৎ শূন্যে নেমে যাওয়া = সন্দেহজনক।</strong> হয় প্রডিউসার থেমে গেছে, নয়তো কেউ offset রিসেট করেছে (মেসেজ এড়িয়ে গেছে)।</li>
        <li><strong>সময়ে মাপুন, সংখ্যায় নয়:</strong> "৫০,০০০ মেসেজ পিছিয়ে" চেয়ে "৩ মিনিট পিছিয়ে" অনেক বেশি অর্থবহ — কারণ ব্যবসায়িক প্রভাব সময়ের সাথে যুক্ত।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># Kafka — CLI দিয়ে দ্রুত দেখা
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --describe --group order-processors
# TOPIC  PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG  CONSUMER-ID

# Prometheus-এ (kafka_exporter / Burrow)
# kafka_consumergroup_lag{group="order-processors", topic="orders"}

# RabbitMQ — কিউ ডেপথই সমতুল্য মেট্রিক
rabbitmqctl list_queues name messages messages_ready messages_unacknowledged
# rabbitmq_queue_messages_ready — Prometheus মেট্রিক</code></pre>
      </div>
      <h4>Lag বাড়ার কারণ ও সমাধান</h4>
      <table>
        <tr><th>কারণ</th><th>সমাধান</th></tr>
        <tr><td>কনজিউমার কম</td><td>স্কেল আউট (তবে পার্টিশন সংখ্যার বেশি নয়)</td></tr>
        <tr><td>প্রসেসিং ধীর</td><td>কোড অপ্টিমাইজ, ব্যাচ write, ডাউনস্ট্রিম কল কমানো</td></tr>
        <tr><td>একটি পার্টিশনে hot key</td><td>partition key পুনর্বিবেচনা</td></tr>
        <tr><td>ঘন ঘন rebalance</td><td><code>max.poll.interval</code> টিউন, static membership</td></tr>
        <tr><td>ডাউনস্ট্রিম ধীর (DB/API)</td><td>সেটিই আসল bottleneck — সেখানে কাজ করুন</td></tr>
      </table>
      <p><strong>গুরুত্বপূর্ণ:</strong> কনজিউমার বাড়ানোই সবসময় সমাধান নয়। পার্টিশন সংখ্যার বেশি কনজিউমার চালালে অতিরিক্তগুলো নিষ্ক্রিয় বসে থাকবে। আর ডাউনস্ট্রিম ডাটাবেজই যদি bottleneck হয়, তবে বেশি কনজিউমার সেটিকে আরও দ্রুত ধসিয়ে দেবে।</p>
      <p><strong>Alert-এর নিয়ম:</strong> নির্দিষ্ট সংখ্যায় alert না দিয়ে <em>প্রবণতায়</em> alert দিন — "lag ১৫ মিনিট ধরে ক্রমাগত বাড়ছে"। স্বাভাবিক ট্রাফিক স্পাইকে সাময়িক lag হওয়াই স্বাভাবিক।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Lag এত বেড়ে গেছে যে retention পার হয়ে যাচ্ছে — কী করবেন?</li>
        <li>RabbitMQ-তে unacked মেসেজ বাড়তে থাকলে কী বোঝায়?</li>
      </ul>
    `
  },
  {
    id: "mq-42",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Publisher Confirms","Confirm Select"],
    question: "RabbitMQ Publisher Confirms (confirmSelect) দিয়ে নির্ভরযোগ্য রাইট কীভাবে সুনিশ্চিত করবেন?",
    answer: `
      <p>ডিফল্টে <code>ch.sendToQueue()</code> বা <code>ch.publish()</code> শুধু সকেটে বাইট লিখে দেয় এবং সাথে সাথে ফিরে আসে — <strong>ব্রোকার মেসেজটি পেয়েছে কি না তার কোনো নিশ্চয়তা নেই</strong>। ব্রোকার ক্র্যাশ করলে বা কিউ পূর্ণ থাকলে মেসেজ নীরবে হারিয়ে যায়।</p>
      <p><strong>Publisher Confirms</strong> এই ফাঁক পূরণ করে: ব্রোকার মেসেজটি নিরাপদে গ্রহণ (এবং durable হলে ডিস্কে লেখা) করার পর একটি <code>ack</code> পাঠায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// confirm channel তৈরি করুন
const ch = await conn.createConfirmChannel();

// একক মেসেজ — সহজ কিন্তু ধীর
await new Promise((resolve, reject) => {
  ch.sendToQueue('orders', Buffer.from(payload), { persistent: true },
    (err) => err ? reject(err) : resolve()
  );
});

// ✅ ব্যাচ — অনেক দ্রুত, প্রোডাকশনে এটিই ব্যবহার করুন
for (const msg of messages) {
  ch.sendToQueue('orders', Buffer.from(msg), { persistent: true });
}
await ch.waitForConfirms();     // সবগুলোর নিশ্চয়তার অপেক্ষা</code></pre>
      </div>
      <h4>ডেটা না হারানোর সম্পূর্ণ চেকলিস্ট</h4>
      <p>Publisher confirm একা যথেষ্ট নয় — চারটি জিনিস একসাথে লাগে:</p>
      <ol>
        <li><strong>Durable exchange ও queue</strong> — <code>durable: true</code>, নাহলে ব্রোকার রিস্টার্টে কাঠামোই মুছে যাবে।</li>
        <li><strong>Persistent message</strong> — <code>persistent: true</code>, নাহলে কিউ durable হলেও মেসেজ শুধু মেমরিতে থাকবে।</li>
        <li><strong>Publisher confirms</strong> — ব্রোকার পেয়েছে তা নিশ্চিত করা।</li>
        <li><strong>Manual consumer ack</strong> — প্রসেসিং শেষে তবেই ack।</li>
      </ol>
      <p>এর যেকোনো একটি বাদ পড়লে চেইনে ফাঁক থেকে যায় — এবং এটিই ইন্টারভিউতে সবচেয়ে বেশি জিজ্ঞাসিত অংশ।</p>
      <h4>আরেকটি ফাঁক: unroutable মেসেজ</h4>
      <p>ব্রোকার মেসেজ গ্রহণ করে ack দিতে পারে, অথচ কোনো binding না মেলায় সেটি কোনো কিউতেই পৌঁছায় না — মেসেজ নীরবে হারায়। সমাধান দুটি:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// mandatory ফ্ল্যাগ + return listener
ch.on('return', (msg) => {
  logger.error({ rk: msg.fields.routingKey }, 'মেসেজ কোনো কিউতে যায়নি');
});
ch.publish('events', 'order.created', Buffer.from(payload),
  { persistent: true, mandatory: true });

// অথবা exchange-এ alternate-exchange সেট করুন (বেশি নির্ভরযোগ্য)</code></pre>
      </div>
      <p><strong>পারফরম্যান্স:</strong> প্রতিটি মেসেজে আলাদা করে confirm-এর অপেক্ষা করলে থ্রুপুট নাটকীয়ভাবে কমে যায়। ব্যাচে পাঠিয়ে <code>waitForConfirms()</code> ব্যবহার করুন, অথবা অ্যাসিঙ্ক্রোনাস confirm হ্যান্ডলার দিয়ে একটি "unconfirmed" ম্যাপ রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>nack</code> পেলে প্রডিউসারের কী করা উচিত?</li>
        <li>Kafka-র <code>acks=all</code>-এর সাথে এর তুলনা কী?</li>
      </ul>
    `
  },
  {
    id: "mq-43",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Kafka","MirrorMaker","Cross DC"],
    question: "Kafka MirrorMaker 2.0 দিয়ে Multi-Cluster Geo-Replication (Cross Datacenter) কীভাবে করবেন?",
    answer: `
      <p><strong>MirrorMaker 2</strong> (MM2) Kafka-র নিজস্ব টুল, যা এক ক্লাস্টার থেকে আরেক ক্লাস্টারে ডেটা রেপ্লিকেট করে। এটি Kafka Connect ফ্রেমওয়ার্কের উপর তৈরি, তাই স্কেলিং ও ব্যর্থতা পুনরুদ্ধার বিনামূল্যে পাওয়া যায়।</p>
      <h4>কেন দরকার</h4>
      <ul>
        <li><strong>Disaster recovery:</strong> একটি অঞ্চল হারালে অন্য অঞ্চলে সেবা চালু রাখা।</li>
        <li><strong>ভৌগোলিক locality:</strong> ইউরোপের কনজিউমার ইউরোপের ক্লাস্টার থেকে পড়বে — আন্তঃমহাদেশীয় latency এড়াতে।</li>
        <li><strong>ক্লাস্টার মাইগ্রেশন</strong> বা অন-প্রিমিস থেকে ক্লাউডে যাওয়া।</li>
        <li><strong>বিচ্ছিন্নকরণ:</strong> প্রোডাকশন ডেটা একটি আলাদা অ্যানালিটিক্স ক্লাস্টারে পাঠানো, যাতে ভারী কুয়েরি মূল ক্লাস্টারকে প্রভাবিত না করে।</li>
      </ul>
      <h4>MM1-এর তুলনায় MM2 যা যোগ করল</h4>
      <ul>
        <li><strong>Consumer offset রেপ্লিকেশন:</strong> MM1-এ কেবল মেসেজ যেত, offset নয় — তাই failover-এর পর কনজিউমাররা জানত না কোথা থেকে শুরু করতে হবে। MM2 offset ম্যাপিংও রেপ্লিকেট করে।</li>
        <li><strong>টপিক ও কনফিগ স্বয়ংক্রিয় সিঙ্ক</strong> — নতুন টপিক ও পার্টিশন আপনাআপনি তৈরি হয়।</li>
        <li><strong>ACL রেপ্লিকেশন।</strong></li>
        <li><strong>Prefix-ভিত্তিক নামকরণ</strong> — সোর্স ক্লাস্টারের নাম যোগ হয় (<code>us-east.orders</code>), যা লুপ প্রতিরোধ করে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>properties</span><button class="copy-btn">Copy</button></div>
        <pre><code>clusters = primary, backup
primary.bootstrap.servers = kafka-primary:9092
backup.bootstrap.servers  = kafka-backup:9092

primary->backup.enabled = true
primary->backup.topics = orders|payments|users
sync.group.offsets.enabled = true
emit.checkpoints.enabled = true
replication.factor = 3</code></pre>
      </div>
      <h4>যে সীমাবদ্ধতাগুলো অবশ্যই জানতে হবে</h4>
      <ul>
        <li><strong>Offset হুবহু এক নয়:</strong> সোর্স ও টার্গেট ক্লাস্টারে একই মেসেজের offset আলাদা হয়। MM2 একটি checkpoint টপিকে ম্যাপিং রাখে, কিন্তু failover-এর সময় কিছু মেসেজ পুনরায় প্রসেস হতেই পারে।</li>
        <li><strong>শুধু at-least-once:</strong> ক্লাস্টারের মধ্যে exactly-once নেই — কনজিউমারকে idempotent হতেই হবে।</li>
        <li><strong>Async রেপ্লিকেশন:</strong> সবসময় কিছুটা lag থাকবে; আকস্মিক failover-এ সেই ব্যবধানের ডেটা হারাতে পারে (এটিই আপনার RPO)।</li>
        <li><strong>Active-active জটিল:</strong> দুই দিকে রেপ্লিকেশন চালালে লুপ ও দ্বন্দ্ব সামলাতে হয়। prefix নামকরণ লুপ ঠেকায়, কিন্তু অ্যাপ্লিকেশনকে উভয় টপিক পড়তে হয়।</li>
      </ul>
      <p><strong>বিকল্প:</strong> Confluent Replicator (বাণিজ্যিক) বা Cluster Linking আরও নিরবচ্ছিন্ন অভিজ্ঞতা দেয় — বিশেষ করে offset সংরক্ষণে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Failover-এর পর কনজিউমার কোথা থেকে শুরু করবে?</li>
        <li>Active-active সেটআপে ডেটা দ্বন্দ্ব কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-44",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Security","SASL","SCRAM"],
    question: "Kafka Authentication Protocols: PLAINTEXT vs SASL_SSL (SCRAM-SHA-512) এবং mTLS কীভাবে কাজ করে?",
    answer: `
      <p>Kafka-র নিরাপত্তা তিনটি স্বাধীন স্তরে ভাগ করা যায় — <strong>এনক্রিপশন</strong> (কে শুনতে পারে), <strong>authentication</strong> (আপনি কে), এবং <strong>authorization</strong> (আপনি কী করতে পারেন)।</p>
      <h4>প্রোটোকলের সমন্বয়</h4>
      <table>
        <tr><th>প্রোটোকল</th><th>এনক্রিপশন</th><th>Authentication</th><th>ব্যবহার</th></tr>
        <tr><td><code>PLAINTEXT</code></td><td>❌</td><td>❌</td><td>শুধু লোকাল ডেভেলপমেন্ট</td></tr>
        <tr><td><code>SSL</code></td><td>✅ TLS</td><td>ঐচ্ছিক (mTLS)</td><td>সার্টিফিকেট-ভিত্তিক</td></tr>
        <tr><td><code>SASL_PLAINTEXT</code></td><td>❌</td><td>✅</td><td>বিশ্বস্ত প্রাইভেট নেটওয়ার্ক</td></tr>
        <tr><td><code>SASL_SSL</code></td><td>✅ TLS</td><td>✅</td><td><strong>প্রোডাকশনের স্ট্যান্ডার্ড</strong></td></tr>
      </table>
      <h4>SASL মেকানিজম</h4>
      <ul>
        <li><strong>PLAIN:</strong> ইউজারনেম/পাসওয়ার্ড সরল টেক্সটে — <em>কেবল</em> TLS-এর ভেতরে ব্যবহারযোগ্য।</li>
        <li><strong>SCRAM-SHA-256/512:</strong> চ্যালেঞ্জ-রেসপন্স; পাসওয়ার্ড কখনও তারে যায় না, এবং ব্রোকারে সল্টেড হ্যাশ হিসেবে থাকে। ক্রেডেনশিয়াল ZooKeeper/KRaft-এ থাকায় ব্রোকার রিস্টার্ট ছাড়াই ইউজার যোগ/বাদ করা যায়। <strong>সাধারণত সেরা পছন্দ।</strong></li>
        <li><strong>GSSAPI (Kerberos):</strong> এন্টারপ্রাইজ পরিবেশে, যেখানে ইতিমধ্যেই Kerberos আছে।</li>
        <li><strong>OAUTHBEARER:</strong> OAuth2 টোকেন-ভিত্তিক — আধুনিক ক্লাউড পরিবেশে জনপ্রিয় হচ্ছে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const kafka = new Kafka({
  brokers: ['kafka-1:9093'],
  ssl: { ca: [fs.readFileSync('/certs/ca.pem')], rejectUnauthorized: true },
  sasl: {
    mechanism: 'scram-sha-512',
    username: process.env.KAFKA_USER,
    password: process.env.KAFKA_PASSWORD
  }
});</code></pre>
      </div>
      <h4>mTLS বনাম SASL_SSL</h4>
      <ul>
        <li><strong>mTLS:</strong> ক্লায়েন্টের পরিচয় আসে তার সার্টিফিকেট থেকে। সার্ভিস-টু-সার্ভিসে চমৎকার, কিন্তু সার্টিফিকেট বিতরণ ও আবর্তন ব্যবস্থাপনা লাগে। সার্টিফিকেট মেয়াদোত্তীর্ণ হলে হঠাৎ সব বন্ধ হয়ে যায়।</li>
        <li><strong>SASL_SSL + SCRAM:</strong> এনক্রিপশনের জন্য TLS, পরিচয়ের জন্য পাসওয়ার্ড। পরিচালনা সহজ, ইউজার যোগ/বাদ দ্রুত।</li>
      </ul>
      <h4>Authorization ভুলবেন না</h4>
      <p>Authentication শুধু বলে <em>আপনি কে</em>। কে কোন টপিকে কী করতে পারবে তা ঠিক করতে <strong>ACL</strong> লাগে:</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>kafka-acls.sh --bootstrap-server localhost:9092 --add \\
  --allow-principal User:order-service \\
  --operation Write --topic orders

# ⚠️ প্রোডাকশনে এটি অবশ্যই false রাখুন
# allow.everyone.if.no.acl.found=false</code></pre>
      </div>
      <p><strong>পারফরম্যান্স খরচ:</strong> TLS চালু করলে Kafka-র zero-copy অপ্টিমাইজেশন হারিয়ে যায় (ডেটা এনক্রিপ্ট করতে ইউজার-স্পেসে আনতে হয়), তাই CPU ব্যবহার ও latency লক্ষণীয়ভাবে বাড়ে। এটি নিরাপত্তার অনিবার্য মূল্য — ক্ষমতা পরিকল্পনায় হিসাব রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি বিশ্বস্ত VPC-র ভেতরে কি TLS দরকার?</li>
        <li>ক্রেডেনশিয়াল আবর্তন কীভাবে ডাউনটাইম ছাড়া করবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-45",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Consistent Hash Exchange","Sharding"],
    question: "RabbitMQ Consistent Hash Exchange Plugin দিয়ে কিউ স্কেলিং কীভাবে করবেন?",
    answer: `
      <p>RabbitMQ-তে একটি কিউয়ের সব মেসেজ একটিমাত্র নোডে থাকে, এবং একটি কিউ একটি নির্দিষ্ট সীমার বেশি থ্রুপুট নিতে পারে না। <strong>Consistent Hash Exchange</strong> প্লাগইন এই সমস্যার সমাধান দেয় — এটি মেসেজগুলোকে routing key-র হ্যাশ অনুযায়ী <em>একাধিক কিউতে</em> ছড়িয়ে দেয়।</p>
      <p>এটি কার্যত RabbitMQ-তে Kafka-র partition ধারণাটি নিয়ে আসে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>rabbitmq-plugins enable rabbitmq_consistent_hash_exchange</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>await ch.assertExchange('orders-hash', 'x-consistent-hash', {
  durable: true,
  arguments: { 'hash-property': 'message_id' }   // routing key-র বদলে property দিয়েও হ্যাশ
});

// binding key = weight (কত অনুপাতে ট্রাফিক পাবে)
for (let i = 0; i < 4; i++) {
  await ch.assertQueue(\`orders.\${i}\`, { durable: true });
  await ch.bindQueue(\`orders.\${i}\`, 'orders-hash', '1');   // সমান ওজন
}

// একই customerId সবসময় একই কিউতে যাবে → সেই গ্রাহকের ordering বজায় থাকবে
ch.publish('orders-hash', order.customerId, Buffer.from(payload));</code></pre>
      </div>
      <h4>যা অর্জন হয়</h4>
      <ul>
        <li><strong>থ্রুপুট স্কেলিং:</strong> ৪টি কিউ ৪টি ভিন্ন নোডে থাকতে পারে — লোড ছড়িয়ে যায়।</li>
        <li><strong>প্রতি-কী ordering:</strong> একই হ্যাশ কী সবসময় একই কিউতে যায়, তাই সেই সত্তার মেসেজের ক্রম বজায় থাকে (Kafka partition key-র মতোই)।</li>
        <li><strong>ওজনভিত্তিক বণ্টন:</strong> binding key-তে বড় সংখ্যা দিলে সেই কিউ বেশি ট্রাফিক পায় — অসম ক্ষমতার নোডে কাজে লাগে।</li>
      </ul>
      <h4>ট্রেড-অফ</h4>
      <ul>
        <li><strong>কিউ যোগ/বাদ করলে বণ্টন বদলায়</strong> — consistent hashing সব কী পুনর্বণ্টন ঠেকায়, কিন্তু কিছু কী নতুন কিউতে সরে যায় এবং সাময়িকভাবে ordering ভাঙতে পারে।</li>
        <li><strong>প্রতিটি কিউতে আলাদা কনজিউমার</strong> লাগে — অ্যাপ্লিকেশনের জটিলতা বাড়ে।</li>
        <li><strong>অসম বণ্টন সম্ভব:</strong> কী-গুলো ভালোভাবে ছড়ানো না হলে একটি কিউ ভারী হয়ে যাবে।</li>
      </ul>
      <p><strong>একটি সৎ পর্যবেক্ষণ:</strong> যদি আপনার এই মাত্রার পার্টিশনিং ও ordering দরকার হয়, তবে সেটি প্রায়ই একটি সংকেত যে <strong>Kafka-ই আপনার জন্য সঠিক টুল</strong> — সেখানে এসব প্রথম-শ্রেণির ধারণা, প্লাগইন নয়। এই প্লাগইনটি সবচেয়ে যুক্তিসঙ্গত যখন আপনি ইতিমধ্যেই RabbitMQ-তে বিনিয়োগ করেছেন এবং একটি নির্দিষ্ট কিউ bottleneck হয়ে গেছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি কিউতে অসমভাবে বেশি ট্রাফিক এলে কী করবেন?</li>
        <li>এটি quorum queue-র সাথে ব্যবহার করা যায় কি?</li>
      </ul>
    `
  },
  {
    id: "mq-46",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Partition Rebalance","Static Membership"],
    question: "Kafka Consumer Static Membership (group.instance.id) কীভাবে অপ্রয়োজনীয় Rebalance প্রতিরোধ করে?",
    answer: `
      <p>ডিফল্টে একটি কনজিউমার গ্রুপ ছেড়ে গেলে (রিস্টার্ট, ডিপ্লয়, ক্র্যাশ) সাথে সাথে <strong>rebalance</strong> শুরু হয় এবং পার্টিশনগুলো পুনর্বণ্টিত হয়। কিন্তু rolling deploy-এ প্রতিটি পড রিস্টার্ট করলে বারবার rebalance হয় — এবং প্রতিবারই প্রসেসিং ব্যাহত হয়।</p>
      <p><strong>Static Membership</strong> (Kafka 2.3+) এই সমস্যার সমাধান।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const consumer = kafka.consumer({
  groupId: 'order-processors',
  // স্থিতিশীল ও ইউনিক পরিচয় — Kubernetes StatefulSet-এর pod নাম আদর্শ
  groupInstanceId: process.env.POD_NAME,   // যেমন "order-processor-0"
  sessionTimeout: 60000                     // রিস্টার্টের সময়ের চেয়ে বেশি রাখুন
});</code></pre>
      </div>
      <h4>কীভাবে কাজ করে</h4>
      <p><code>group.instance.id</code> সেট করলে ব্রোকার কনজিউমারটিকে একটি <em>স্থায়ী পরিচয়</em> হিসেবে মনে রাখে। কনজিউমার চলে গেলে ব্রোকার সাথে সাথে rebalance শুরু করে না — সে <code>session.timeout.ms</code> পর্যন্ত অপেক্ষা করে।</p>
      <p>যদি সেই সময়ের মধ্যে <strong>একই <code>group.instance.id</code></strong> নিয়ে কেউ ফিরে আসে, ব্রোকার তাকে <strong>ঠিক আগের পার্টিশনগুলোই</strong> ফিরিয়ে দেয় — কোনো rebalance হয় না।</p>
      <pre class="mermaid">
flowchart TD
    A["পড রিস্টার্ট হলো"] --> B{"group.instance.id<br/>সেট করা আছে?"}
    B -->|"না"| C["সাথে সাথে rebalance<br/>🛑 পুরো গ্রুপ ব্যাহত"]
    B -->|"হ্যাঁ"| D["session.timeout পর্যন্ত অপেক্ষা"]
    D -->|"সময়মতো ফিরল"| E["একই পার্টিশন ফেরত ✅<br/>কোনো rebalance নেই"]
    D -->|"ফিরল না"| F["তখন rebalance"]
      </pre>
      <span class="diagram-caption">স্থায়ী পরিচয় থাকলে দ্রুত রিস্টার্ট rebalance ঘটায় না</span>
      <h4>যে সুবিধাগুলো পাওয়া যায়</h4>
      <ul>
        <li><strong>Rolling deploy মসৃণ হয়</strong> — ২০টি পড রিস্টার্ট করলে ২০টি rebalance-এর বদলে শূন্যটি।</li>
        <li><strong>স্থানীয় state সংরক্ষিত থাকে</strong> — একই পার্টিশন ফিরে পাওয়ায় ক্যাশ বা RocksDB state পুনর্গঠন করতে হয় না (Kafka Streams-এ বিশাল সুবিধা)।</li>
        <li>সাময়িক নেটওয়ার্ক বিভ্রাটেও অপ্রয়োজনীয় বিশৃঙ্খলা হয় না।</li>
      </ul>
      <h4>যে বিষয়গুলো সতর্কতার সাথে দেখতে হবে</h4>
      <ul>
        <li><strong><code>session.timeout.ms</code> ভারসাম্য:</strong> খুব বড় রাখলে সত্যিকারের মৃত কনজিউমারের পার্টিশনগুলো ততক্ষণ কেউ প্রসেস করবে না। রিস্টার্টের প্রত্যাশিত সময়ের সামান্য বেশি রাখুন (৪৫-৬০s সাধারণ)।</li>
        <li><strong>ID অবশ্যই ইউনিক ও স্থিতিশীল হতে হবে।</strong> দুটি কনজিউমার একই ID নিয়ে এলে দ্বিতীয়টি <code>FencedInstanceIdException</code> পাবে। Deployment-এর র‍্যান্ডম pod নাম কাজ করবে না — <strong>StatefulSet</strong> ব্যবহার করুন।</li>
        <li>স্থায়ীভাবে স্কেল-ডাউন করলে rebalance এমনিতেই হবে (timeout-এর পর), সেটি প্রত্যাশিত।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Static membership ও cooperative rebalancing একসাথে ব্যবহার করা যায় কি?</li>
        <li>একটি পড স্থায়ীভাবে মারা গেলে কতক্ষণে তার কাজ অন্যরা নেবে?</li>
      </ul>
    `
  },
  {
    id: "mq-47",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Federation","Shovel"],
    question: "RabbitMQ Federation vs Shovel Plugin-এর কাজের পার্থক্য কী?",
    answer: `
      <p>দুটিই RabbitMQ ব্রোকারের মধ্যে মেসেজ সরানোর প্লাগইন, কিন্তু এদের উদ্দেশ্য ও আচরণ আলাদা।</p>
      <table>
        <tr><th>দিক</th><th>Federation</th><th>Shovel</th></tr>
        <tr><td>ধারণা</td><td>দূরবর্তী exchange/queue থেকে <em>সাবস্ক্রাইব</em> করা</td><td>এক জায়গা থেকে <em>টেনে</em> অন্য জায়গায় <em>ঠেলে</em> দেওয়া</td></tr>
        <tr><td>কনফিগ কোথায়</td><td>গ্রহীতা (downstream) দিকে</td><td>যেকোনো এক দিকে</td></tr>
        <tr><td>টপোলজি</td><td>ঘোষণামূলক, চলমান লিংক</td><td>পয়েন্ট-টু-পয়েন্ট, প্রায়ই এককালীন</td></tr>
        <tr><td>ব্যবহার</td><td>বহু-অঞ্চলে ধারাবাহিক ইভেন্ট বিতরণ</td><td>মাইগ্রেশন, DLQ নিষ্কাশন, ক্লাস্টার সেতু</td></tr>
      </table>
      <h4>Federation — বিতরণের জন্য</h4>
      <p>একটি downstream ব্রোকার upstream ব্রোকারের exchange-এ "সাবস্ক্রাইব" করে। upstream-এ প্রকাশিত মেসেজ স্বয়ংক্রিয়ভাবে downstream-এ প্রবাহিত হয়। এটি একটি <em>চলমান সম্পর্ক</em>।</p>
      <p><strong>উপযুক্ত যখন:</strong> ঢাকার ডেটাসেন্টারে ইভেন্ট প্রকাশিত হয় এবং সিঙ্গাপুর ও লন্ডনের ক্লাস্টারেও সেগুলো দরকার। প্রতিটি অঞ্চলের কনজিউমার স্থানীয়ভাবে পড়ে — আন্তঃমহাদেশীয় latency এড়ানো যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>rabbitmq-plugins enable rabbitmq_federation rabbitmq_federation_management

# upstream সংজ্ঞা (downstream ব্রোকারে চালান)
rabbitmqctl set_parameter federation-upstream dhaka-upstream \\
  '{"uri":"amqp://user:pass@dhaka-broker:5672","expires":3600000}'

rabbitmqctl set_policy --apply-to exchanges federate-events "^events\\." \\
  '{"federation-upstream-set":"all"}'</code></pre>
      </div>
      <h4>Shovel — সরানোর জন্য</h4>
      <p>Shovel একটি সরল কর্মী: নির্দিষ্ট উৎস কিউ থেকে মেসেজ নেয়, নির্দিষ্ট গন্তব্যে পাঠায়, ack দেয়। এটি একটি <em>নির্দেশিত পাইপ</em>।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>rabbitmqctl set_parameter shovel migrate-orders '{
  "src-uri": "amqp://old-broker",  "src-queue": "orders",
  "dest-uri": "amqp://new-broker", "dest-queue": "orders",
  "ack-mode": "on-confirm"
}'</code></pre>
      </div>
      <p><strong>সবচেয়ে সাধারণ ব্যবহার:</strong> DLQ-তে জমা মেসেজ পরীক্ষা করে ঠিক করার পর মূল কিউতে ফিরিয়ে দেওয়া, অথবা পুরনো ব্রোকার থেকে নতুন ব্রোকারে ডাউনটাইম ছাড়া মাইগ্রেশন।</p>
      <h4>বাছাইয়ের সহজ নিয়ম</h4>
      <ul>
        <li><strong>একই মেসেজ একাধিক জায়গায় দরকার</strong> (বিতরণ) → Federation।</li>
        <li><strong>মেসেজ এক জায়গা থেকে আরেক জায়গায় সরাতে হবে</strong> (স্থানান্তর) → Shovel।</li>
      </ul>
      <p><strong>গুরুত্বপূর্ণ:</strong> এদুটির কোনোটিই WAN-এর উপর একটি একক ক্লাস্টার প্রসারিত করার বিকল্প নয় — বরং সেটিই এদের উদ্দেশ্য। RabbitMQ ক্লাস্টারিং কম-latency, নির্ভরযোগ্য নেটওয়ার্ক ধরে নেয় (Erlang distribution)। ডেটাসেন্টারের মধ্যে ক্লাস্টার প্রসারিত করলে সামান্য নেটওয়ার্ক সমস্যাতেই পার্টিশন ও অস্থিতিশীলতা তৈরি হয়। <strong>WAN পার হতে সবসময় federation বা shovel ব্যবহার করুন।</strong></p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Federation-এ নেটওয়ার্ক কাটলে মেসেজগুলোর কী হয়?</li>
        <li>দুই দিকেই federation করলে লুপ কীভাবে ঠেকাবেন?</li>
      </ul>
    `
  },
  {
    id: "mq-48",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Idempotent Producer","enable.idempotence"],
    question: "Kafka Idempotent Producer (enable.idempotence=true) কীভাবে ডুপ্লিকেট মেসেজ রাইট প্রতিরোধ করে?",
    answer: `
      <p>প্রডিউসার একটি মেসেজ পাঠাল, ব্রোকার সেটি লিখল, কিন্তু ack ফেরত আসার পথে নেটওয়ার্ক কেটে গেল। প্রডিউসার ভাববে ব্যর্থ হয়েছে এবং <strong>রিট্রাই করবে</strong> — ফলে একই মেসেজ দুবার লেখা হবে।</p>
      <p><strong>Idempotent Producer</strong> ঠিক এই সমস্যাটি সমাধান করে।</p>
      <h4>কীভাবে কাজ করে</h4>
      <ol>
        <li>প্রতিটি প্রডিউসার ব্রোকার থেকে একটি ইউনিক <strong>Producer ID (PID)</strong> পায়।</li>
        <li>প্রতিটি পার্টিশনের জন্য প্রডিউসার একটি <strong>ক্রমবর্ধমান সিকোয়েন্স নম্বর</strong> বজায় রাখে।</li>
        <li>ব্রোকার প্রতিটি (PID, পার্টিশন) জোড়ার জন্য শেষ গৃহীত সিকোয়েন্স নম্বর মনে রাখে।</li>
        <li>ইতিমধ্যে দেখা সিকোয়েন্স নম্বর আবার এলে ব্রোকার সেটি <strong>নীরবে বাদ দেয়</strong> এবং সফল ack ফেরত দেয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const producer = kafka.producer({
  idempotent: true,
  // এগুলো idempotence চালু করলে স্বয়ংক্রিয়ভাবে প্রয়োগ হয়:
  //   acks = all
  //   retries = Integer.MAX_VALUE
  //   max.in.flight.requests.per.connection <= 5
  maxInFlightRequests: 5
});</code></pre>
      </div>
      <h4>বাড়তি সুবিধা: ordering রক্ষা</h4>
      <p>Idempotence ছাড়া <code>max.in.flight.requests &gt; 1</code> এবং রিট্রাই একসাথে থাকলে <strong>ক্রম ভেঙে যেতে পারে</strong> — মেসেজ ১ ব্যর্থ হয়ে রিট্রাই হওয়ার আগেই মেসেজ ২ সফল হয়ে যায়।</p>
      <p>Idempotence চালু থাকলে ব্রোকার সিকোয়েন্স নম্বর দেখে ক্রম যাচাই করে; কোনো ফাঁক থাকলে সে মেসেজ প্রত্যাখ্যান করে এবং প্রডিউসার সঠিক ক্রমে আবার পাঠায়। তাই ৫ পর্যন্ত in-flight রেখেও ক্রম নিরাপদ থাকে — অর্থাৎ <strong>নিরাপত্তা ও থ্রুপুট দুটোই</strong>।</p>
      <h4>যা এটি দেয় না — গুরুত্বপূর্ণ সীমা</h4>
      <ul>
        <li><strong>শুধু একটি প্রডিউসার সেশনের মধ্যে।</strong> অ্যাপ্লিকেশন রিস্টার্ট করলে নতুন PID পাবে, তাই রিস্টার্টের আগে পাঠানো মেসেজ আবার পাঠালে সেটি ডুপ্লিকেট হবেই। এর জন্য <code>transactionalId</code> সহ ট্রানজেকশন লাগে।</li>
        <li><strong>শুধু প্রডিউসার→ব্রোকার পথে।</strong> অ্যাপ্লিকেশন লজিকের কারণে একই ইভেন্ট দুবার তৈরি হলে Kafka তা ধরতে পারবে না।</li>
        <li><strong>কনজিউমারের ডুপ্লিকেট আলাদা সমস্যা</strong> — rebalance বা offset commit ব্যর্থতায় কনজিউমার একই মেসেজ আবার পড়তেই পারে। সেখানে idempotent consumer লাগবে।</li>
      </ul>
      <p><strong>পরামর্শ:</strong> Kafka 3.0 থেকে <code>enable.idempotence=true</code> ডিফল্ট। এটি বন্ধ করার কোনো ভালো কারণ প্রায় নেই — পারফরম্যান্স খরচ নগণ্য, আর সুরক্ষা যথেষ্ট বড়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ব্রোকার সিকোয়েন্স নম্বর কতক্ষণ মনে রাখে?</li>
        <li>Idempotent producer আর transaction — কখন কোনটি লাগবে?</li>
      </ul>
    `
  },
  {
    id: "mq-49",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","RPC","Correlation ID"],
    question: "RabbitMQ-তে Request-Reply (RPC) Pattern এবং Correlation ID কীভাবে বাস্তবায়িত হয়?",
    answer: `
      <p>মেসেজ কিউ স্বভাবতই একমুখী (fire-and-forget), কিন্তু কখনও উত্তরের দরকার হয়। RabbitMQ-তে <strong>RPC প্যাটার্ন</strong> দিয়ে অ্যাসিঙ্ক্রোনাস মেসেজিংয়ের উপর সিঙ্ক্রোনাস-সদৃশ request-reply বানানো যায়।</p>
      <pre class="mermaid">
sequenceDiagram
    participant C as Client
    participant Q as rpc_queue
    participant S as Server
    C->>C: reply_to = অস্থায়ী কিউ<br/>correlation_id = uuid
    C->>Q: request (reply_to, correlation_id)
    Q->>S: consume
    S->>S: প্রসেস
    S-->>C: reply_to কিউতে উত্তর<br/>(একই correlation_id)
    C->>C: correlation_id মিলিয়ে<br/>সঠিক promise resolve
      </pre>
      <span class="diagram-caption">correlation_id ছাড়া কোন উত্তর কোন রিকোয়েস্টের তা বোঝা যেত না</span>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- ক্লায়েন্ট ----
const { queue: replyQueue } = await ch.assertQueue('', { exclusive: true });
const pending = new Map();

await ch.consume(replyQueue, (msg) => {
  const resolver = pending.get(msg.properties.correlationId);
  if (resolver) {
    resolver(JSON.parse(msg.content));
    pending.delete(msg.properties.correlationId);
  }
}, { noAck: true });

function call(payload, timeoutMs = 5000) {
  const correlationId = crypto.randomUUID();
  return new Promise((resolve, reject) => {
    pending.set(correlationId, resolve);
    // ⚠️ টাইমআউট অপরিহার্য — নাহলে সার্ভার মরে গেলে চিরকাল ঝুলে থাকবে
    setTimeout(() => {
      if (pending.delete(correlationId)) reject(new Error('RPC timeout'));
    }, timeoutMs);

    ch.sendToQueue('rpc_queue', Buffer.from(JSON.stringify(payload)), {
      correlationId, replyTo: replyQueue, expiration: String(timeoutMs)
    });
  });
}

// ---- সার্ভার ----
await ch.prefetch(1);
await ch.consume('rpc_queue', async (msg) => {
  const result = await handle(JSON.parse(msg.content));
  ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)),
    { correlationId: msg.properties.correlationId });
  ch.ack(msg);
});</code></pre>
      </div>
      <h4>দুটি অপরিহার্য উপাদান</h4>
      <ul>
        <li><strong><code>reply_to</code>:</strong> ক্লায়েন্ট একটি অস্থায়ী exclusive কিউ বানিয়ে তার নাম পাঠায় — সার্ভার সেখানেই উত্তর দেয়।</li>
        <li><strong><code>correlation_id</code>:</strong> একটি ক্লায়েন্ট একসাথে বহু রিকোয়েস্ট পাঠাতে পারে, এবং উত্তর যেকোনো ক্রমে আসতে পারে। এই আইডি দিয়েই মেলানো হয়।</li>
      </ul>
      <h4>যে বিষয়গুলো সাবধানে ভাবতে হবে</h4>
      <ul>
        <li><strong>টাইমআউট বাধ্যতামূলক</strong> — সার্ভার ক্র্যাশ করলে উত্তর কখনও আসবে না।</li>
        <li><strong>মেসেজে <code>expiration</code> দিন</strong> — ক্লায়েন্ট টাইমআউট করে চলে যাওয়ার পর সার্ভার যেন অকেজো কাজ না করে।</li>
        <li><strong>প্রতিবার নতুন reply queue বানানো ব্যয়বহুল</strong> — কানেকশন-প্রতি একটিই reply queue বানিয়ে পুনর্ব্যবহার করুন (উপরের কোডে সেটাই করা হয়েছে)।</li>
        <li><strong>ক্লায়েন্ট রিকানেক্ট করলে</strong> exclusive কিউ মুছে যায় — চলমান রিকোয়েস্টগুলোর উত্তর হারাবে।</li>
      </ul>
      <p><strong>একটি সৎ মূল্যায়ন:</strong> মেসেজ ব্রোকারের উপর RPC বানানো মানে অ্যাসিঙ্ক্রোনাস ব্যবস্থার সব জটিলতা নিয়ে সিঙ্ক্রোনাস আচরণ পাওয়া। যদি আপনার সত্যিই request-reply দরকার হয়, তবে <strong>HTTP বা gRPC সাধারণত ভালো পছন্দ</strong> — সেগুলোতে টাইমআউট, লোড ব্যালেন্সিং, ট্রেসিং ও এরর হ্যান্ডলিং প্রথম-শ্রেণির নাগরিক।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক RPC সার্ভার ইনস্ট্যান্স থাকলে লোড কীভাবে ভাগ হয়?</li>
        <li>উত্তর আসার আগেই ক্লায়েন্ট রিস্টার্ট করলে কী হবে?</li>
      </ul>
    `
  },
  {
    id: "mq-50",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Batching","linger.ms"],
    question: "Kafka Producer Batching Performance: batch.size, linger.ms, এবং compression.type (snappy/zstd) কীভাবে টিউন করবেন?",
    answer: `
      <p>Kafka প্রডিউসারের থ্রুপুট মূলত তিনটি সেটিংয়ের উপর নির্ভর করে, এবং এদের মূল ভারসাম্য হলো <strong>latency বনাম throughput</strong>।</p>
      <h4>batch.size ও linger.ms</h4>
      <p>প্রডিউসার প্রতিটি মেসেজ আলাদাভাবে পাঠায় না — একই পার্টিশনের মেসেজ একটি বাফারে জমিয়ে ব্যাচে পাঠায়। ব্যাচ পাঠানো হয় যখন:</p>
      <ul>
        <li>ব্যাচের আকার <code>batch.size</code> (ডিফল্ট ১৬ KB) ছুঁয়ে যায়, <strong>অথবা</strong></li>
        <li><code>linger.ms</code> সময় পার হয়ে যায় (ডিফল্ট <strong>০</strong>)।</li>
      </ul>
      <p><strong>মূল অন্তর্দৃষ্টি:</strong> <code>linger.ms=0</code> মানে প্রডিউসার অপেক্ষাই করে না — মেসেজ এলেই পাঠিয়ে দেয়। ফলে ব্যাচিং কার্যত হয় না এবং প্রতিটি মেসেজে আলাদা নেটওয়ার্ক রাউন্ড-ট্রিপ যায়। মাত্র <code>linger.ms=10</code> দিলেই থ্রুপুট প্রায়ই <strong>কয়েক গুণ</strong> বেড়ে যায়, বিনিময়ে সর্বোচ্চ ১০ms বাড়তি latency।</p>
      <div class="code-box">
        <div class="code-header"><span>properties</span><button class="copy-btn">Copy</button></div>
        <pre><code># উচ্চ থ্রুপুট (লগ, অ্যানালিটিক্স, ইভেন্ট স্ট্রিম)
batch.size=131072          # 128 KB
linger.ms=20               # 20ms পর্যন্ত অপেক্ষা করে ব্যাচ ভরা
compression.type=zstd
buffer.memory=67108864     # 64 MB

# কম latency (রিয়েল-টাইম নোটিফিকেশন)
batch.size=16384
linger.ms=0
compression.type=lz4</code></pre>
      </div>
      <h4>compression.type</h4>
      <table>
        <tr><th>অ্যালগরিদম</th><th>অনুপাত</th><th>CPU</th><th>কখন</th></tr>
        <tr><td><code>none</code></td><td>—</td><td>—</td><td>ইতিমধ্যে কম্প্রেসড ডেটা</td></tr>
        <tr><td><code>lz4</code></td><td>মাঝারি</td><td>খুব কম</td><td>কম latency প্রয়োজন</td></tr>
        <tr><td><code>snappy</code></td><td>মাঝারি</td><td>কম</td><td>ভারসাম্যপূর্ণ, বহুল ব্যবহৃত</td></tr>
        <tr><td><code>zstd</code></td><td><strong>সেরা</strong></td><td>মাঝারি</td><td><strong>বেশিরভাগ ক্ষেত্রে প্রস্তাবিত</strong></td></tr>
        <tr><td><code>gzip</code></td><td>ভালো</td><td>বেশি</td><td>ব্যান্ডউইথ অত্যন্ত ব্যয়বহুল হলে</td></tr>
      </table>
      <p><strong>কম্প্রেশন কেন এত কার্যকর:</strong> Kafka <em>পুরো ব্যাচ</em> একসাথে কম্প্রেস করে। JSON-এর মতো পুনরাবৃত্তিমূলক ডেটায় ব্যাচ যত বড়, কম্প্রেশন তত ভালো — প্রায়ই ৫-১০× সংকোচন। আরও গুরুত্বপূর্ণ, ডেটা <strong>কম্প্রেসড অবস্থাতেই ডিস্কে থাকে এবং কনজিউমার পর্যন্ত যায়</strong>, তাই নেটওয়ার্ক ও স্টোরেজ দুটোই বাঁচে এবং ব্রোকারকে ডিকম্প্রেস করতে হয় না।</p>
      <p>অর্থাৎ <code>linger.ms</code> ও কম্প্রেশন একে অপরকে শক্তিশালী করে — বড় ব্যাচ মানে ভালো কম্প্রেশন।</p>
      <h4>টিউনিংয়ের পদ্ধতি</h4>
      <ul>
        <li><strong>আপনার latency বাজেট নির্ধারণ করুন</strong>, তারপর <code>linger.ms</code> তার নিচে রাখুন।</li>
        <li><code>batch.size</code> এত বড় রাখুন যেন <code>linger.ms</code> শেষ হওয়ার আগেই ব্যাচ ভরে যায় (তাহলে অপেক্ষা করতেই হয় না)।</li>
        <li><strong>মনিটর করুন:</strong> <code>batch-size-avg</code>, <code>records-per-request-avg</code>, <code>compression-rate-avg</code>। ব্যাচ সাইজ <code>batch.size</code>-এর অনেক কম হলে <code>linger.ms</code> বাড়ান।</li>
        <li><code>buffer.memory</code> পূর্ণ হলে <code>send()</code> ব্লক করে — এটি ব্যাকপ্রেশারের সংকেত।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কম্প্রেশন প্রডিউসার না ব্রোকারে হওয়া ভালো?</li>
        <li>ব্যাচ পাঠানোর আগে প্রডিউসার ক্র্যাশ করলে কী হয়?</li>
      </ul>
    `
  },
  /* ===== SECTION F — gRPC, Protobuf & Service Protocols (50) ===== */
  {
    id: "grpc-1",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["gRPC","REST","Protobuf"],
    question: "gRPC কী? REST API-এর তুলনায় gRPC কেন ১০ গুণ বেশি দ্রুত এবং কখন কোনটি বেছে নেবেন?",
    answer: `
      <p><strong>gRPC (Google Remote Procedure Call):</strong> এটি গুগল দ্বারা তৈরি একটি আধুনিক, ওপেন-সোর্স হাই-পারফরম্যান্স RPC ফ্রেমওয়ার্ক যা ট্রান্সপোর্ট হিসেবে **HTTP/2** এবং মেসেজ সিরিয়ালাইজেশনের জন্য **Protocol Buffers (Protobuf)** ব্যবহার করে।</p>
      <h4>REST vs gRPC তুলনা:</h4>
      <ul>
        <li><strong>Payload Format:</strong> REST প্লেইন টেক্সট JSON (Human-readable, Heavy payload) পাঠায়। gRPC বাইনারি (Binary Format - Protobuf) পাঠায় যা সাইজে ৫০-৮০% ছোট এবং পার্সিং স্পিড ১০ গুণ দ্রুত।</li>
        <li><strong>Transport Protocol:</strong> REST সাধারণত HTTP/1.1 (One request per TCP connection) ব্যবহার করে। gRPC HTTP/2 ব্যবহার করে (Multiplexing - ১টি TCP সকেটে হাজার হাজার স্ট্রিম সমান্তরালে আদান-প্রদান করা যায়)।</li>
        <li><strong>Contract-first:</strong> gRPC-তে <code>.proto</code> ফাইলের মাধ্যমে কঠোর স্কিমা রিফাইন করা বাধ্যতামূলক।</li>
        <li><strong>Streaming:</strong> REST-এ বাই-ডাইরেকশনাল স্ট্রিমিং সম্ভব নয়, gRPC-তে ৪ ধরনের স্ট্রিমিং নেটিভভাবে সাপোর্টেড।</li>
      </ul>
      <p><em>সিদ্ধান্ত:</em> ইস্টার্ন/পাবলিক ক্লায়েন্ট API-এর জন্য REST/GraphQL এবং অভ্যন্তরীণ মাইক্রোসার্ভিস-টু-মাইক্রোসার্ভিস (Internal East-West Traffic) হাই-স্পিড কমুনিকেশনের জন্য **gRPC** সেরা।</p>
    `
  },
  {
    id: "grpc-2",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","Schema",".proto"],
    question: "Protocol Buffers (Protobuf v3) কী এবং কীভাবে একটি .proto ফাইল ডিফাইন করবেন?",
    answer: `
      <p><strong>Protocol Buffers:</strong> এটি গুগলের তৈরি ল্যাঙ্গুয়েজ-নিরপেক্ষ, প্ল্যাটফর্ম-নিরপেক্ষ রি-ইউজেবল মেকানিজম যা মেকানিজম সিরিয়ালাইজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>syntax = "proto3";

package user;

// User Message definition
message UserRequest {
  int32 id = 1; // Field Tag Number
}

message UserResponse {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4; // Array of strings
}

// Service definition
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}</code></pre>
      </div>
      <p><em>নোট:</em> <code>id = 1; name = 2;</code> এই সংখ্যাগুলো ভ্যালু নয়, এগুলো বাইনারিতে ফিল্ড চিহ্নিত করার **Field Tags**। তাই একবার ফিল্ড ট্যাগ অ্যাসাইন করলে তা পরিবর্তন করা যাবে না।</p>
    `
  },
  {
    id: "grpc-3",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Streaming","Bi-directional","RPC"],
    question: "gRPC-এর ৪টি Communication Patterns (Unary, Server Streaming, Client Streaming, Bi-directional) কী কী?",
    answer: `
      <p>gRPC ট্রান্সপোর্টে ৪টি নমনীয় সার্ভিস মেথড প্যাটার্ন সাপোর্ট করে:</p>
      <ol>
        <li><strong>Unary RPC:</strong> প্রথাগত রিকোয়েস্ট-রেসপন্স (১টি রিকোয়েস্ট -> ১টি রেসপন্স)।</li>
        <li><strong>Server Streaming RPC:</strong> ক্লায়েন্ট ১টি রিকোয়েস্ট পাঠায়, সার্ভার তার উত্তরে ক্রমাগত স্ট্রিম আকারে একের পর এক মেসেজ পাঠাতে থাকে (<code>returns (stream ItemResponse)</code>)। <em>(যেমন: স্টক মার্কেট লাইভ প্রাইজ ফিড)</em>।</li>
        <li><strong>Client Streaming RPC:</strong> ক্লায়েন্ট প্রডিউসার হিসেবে একের পর এক ফাইল বা চ্যাঙ্ক পাঠাতে থাকে, শেষে সার্ভার ১টি সামারি রেসপন্স দেয় (<code>rpc UploadFile (stream Chunk) returns (Summary)</code>)।</li>
        <li><strong>Bi-directional Streaming RPC:</strong> উভয় পক্ষই (Client & Server) স্বাধীনভাবে একই সাথে বাইনারি স্ট্রিমে মেসেজ আদান-প্রদান করে (<code>rpc Chat (stream Msg) returns (stream Msg)</code>)।</li>
      </ol>
    `
  },
  {
    id: "grpc-4",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["HTTP2","Multiplexing","HPACK"],
    question: "HTTP/2 প্রটোকল কীভাবে Multiplexing এবং Header Compression (HPACK) বাস্তবায়ন করে?",
    answer: `
      <p>HTTP/1.1-এর মূল সীমাবদ্ধতা ছিল **Head-of-Line (HOL) Blocking**—১টি পোর্টে একাধিক রিকোয়েস্ট সমান্তরালে পাঠানো যেত না।</p>
      <h4>HTTP/2-এর ২ প্রধান ফিচার:</h4>
      <ul>
        <li><strong>Multiplexing (মাল্টিপ্লেক্সিং):</strong> একই ফিজিক্যাল TCP কানেকশনের ওপর একাধিক স্বাধীন বাইনারি **Stream** ও **Frames** গঠন করা হয়। ফলে হাজার হাজার রিকোয়েস্ট ও রেসপন্স কানেকশন না ভেঙে সমান্তরালে যাতায়াত করতে পারে।</li>
        <li><strong>HPACK Header Compression:</strong> HTTP Headings (User-Agent, Cookie, Content-Type) বিশাল সাইজ দখল করে। HPACK অ্যালগরিদম প্রতিটি স্ট্রিমে বারবার একই হেডার না পাঠিয়ে একটি **Header Table Index** বজায় রেখে সংকোচন করে ৯০% হেডার ওভারহেড কমায়।</li>
      </ul>
    `
  },
  {
    id: "grpc-5",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Deadlines","Cancellation","Context Propagation"],
    question: "gRPC Deadlines এবং Cancellation Propagation কেন জরুরি?",
    answer: `
      <p>ডিস্ট্রিবিউটেড সিস্টেমে যখন সার্ভিস A সার্ভিস B-কে এবং সার্ভিস B সার্ভিস C-কে কল করে, সার্ভিস C কোনো কারণে আটকে গেলে সার্ভিস A এবং B ও আনলিমিটেড সময় ধরে হ্যাক হয়ে থাকবে (Cascading Failure)।</p>
      <p><strong>gRPC Deadline:</strong> ক্লায়েন্ট রিকোয়েস্ট ডিক্লেয়ার করার সময়ই সর্বোচ্চ সময়সীমা (যেমন deadline = 500ms) বেঁধে দেয়।</p>
      <p><strong>Cancellation Propagation:</strong> ৫০০ms পার হওয়া মাত্রই ক্লায়েন্ট কল ক্যানসেল করে এবং gRPC Context প্রটোকলের মাধ্যমে এই Cancellation সংকেত স্বয়ংক্রিয়ভাবে ডাউনস্ট্রিম সার্ভিস B এবং C-তে ছড়িয়ে পড়ে, যা তাদের অহেতুক সিপিসি কাজ করা বন্ধ করায়।</p>
    `
  },
  {
    id: "grpc-6",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Metadata","Authentication","Headers"],
    question: "gRPC-তে Metadata কী এবং Authentication Token (JWT) কীভাবে পাস করবেন?",
    answer: `
      <p>HTTP REST-এ যেমন HTTP Headers থাকে, gRPC-তে ঠিক তেমনি কাস্টম কী-ভ্যালু পেয়ার পাস করার জন্য <strong>Metadata</strong> ব্যবহার করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const grpc = require('@grpc/grpc-js');

// Client-side Metadata Setup
const metadata = new grpc.Metadata();
metadata.add('authorization', 'Bearer eyJhbGciOiJKV1QiLCJ...');

client.getUser({ id: 100 }, metadata, (err, response) => {
  if (err) console.error(err);
  console.log('User Profile:', response);
});</code></pre>
      </div>
    `
  },
  {
    id: "grpc-7",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Interceptors","Middleware"],
    question: "gRPC Interceptors কী? Client-side এবং Server-side Interceptor-এর কাজ কী?",
    answer: `
      <p><strong>Interceptor</strong> হলো gRPC-র middleware — প্রতিটি RPC কলের আগে ও পরে কোড চালানোর একটি হুক। এতে ক্রস-কাটিং দায়িত্ব (auth, লগিং, মেট্রিক্স, রিট্রাই) প্রতিটি হ্যান্ডলারে না লিখে এক জায়গায় রাখা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- Server-side interceptor (@grpc/grpc-js) ----
function authInterceptor(methodDescriptor, call) {
  const metadata = call.metadata;
  const token = metadata.get('authorization')[0];

  if (!token) {
    call.sendStatus({ code: grpc.status.UNAUTHENTICATED,
                      details: 'টোকেন পাওয়া যায়নি' });
    return;
  }
  // যাচাই হওয়া পরিচয় হ্যান্ডলারের জন্য রাখুন
  call.user = verifyJwt(token);
}

// ---- Client-side interceptor ----
const authClientInterceptor = (options, nextCall) =>
  new grpc.InterceptingCall(nextCall(options), {
    start(metadata, listener, next) {
      metadata.add('authorization', \`Bearer \${getToken()}\`);
      metadata.add('x-trace-id', currentTraceId());   // ট্রেসিং চেইন অক্ষুণ্ণ রাখুন
      next(metadata, listener);
    }
  });

const client = new OrderService(addr, creds, {
  interceptors: [authClientInterceptor]
});</code></pre>
      </div>
      <h4>Server-side interceptor-এর ব্যবহার</h4>
      <ul>
        <li><strong>Authentication ও authorization:</strong> মেটাডেটা থেকে টোকেন যাচাই করে অবৈধ কল আগেই বাতিল।</li>
        <li><strong>লগিং ও মেট্রিক্স:</strong> প্রতিটি কলের সময়কাল, স্ট্যাটাস কোড ও মেথড রেকর্ড করা।</li>
        <li><strong>Panic/exception recovery:</strong> হ্যান্ডলারে অপ্রত্যাশিত এরর হলে পুরো সার্ভার ক্র্যাশ না করে সঠিক status ফেরত দেওয়া।</li>
        <li><strong>Rate limiting ও ভ্যালিডেশন।</strong></li>
      </ul>
      <h4>Client-side interceptor-এর ব্যবহার</h4>
      <ul>
        <li><strong>প্রতিটি কলে টোকেন যোগ করা</strong> — একবার লিখলেই সব কলে প্রযোজ্য।</li>
        <li><strong>Trace context প্রোপাগেশন</strong> — distributed tracing-এর জন্য অপরিহার্য।</li>
        <li><strong>রিট্রাই ও circuit breaker লজিক।</strong></li>
        <li><strong>ক্লায়েন্ট-সাইড মেট্রিক্স</strong> — কোন সার্ভিস ধীর তা জানা।</li>
      </ul>
      <h4>Unary বনাম Streaming interceptor</h4>
      <p>দুটি আলাদাভাবে লিখতে হয়। Unary-তে একটি request ও একটি response — সরল। Streaming-এ ইন্টারসেপ্টরকে <em>স্ট্রিম অবজেক্ট</em> মুড়ে দিতে হয় এবং প্রতিটি মেসেজে হুক লাগাতে হয় — যথেষ্ট জটিল। তাই বেশিরভাগ ফ্রেমওয়ার্কে দুটির আলাদা API থাকে।</p>
      <p><strong>ক্রম গুরুত্বপূর্ণ:</strong> একাধিক interceptor থাকলে সেগুলো চেইনে চলে। যুক্তিসঙ্গত ক্রম — recovery → লগিং → auth → rate limit → ভ্যালিডেশন → হ্যান্ডলার। Recovery সবার বাইরে রাখুন, যাতে অন্য কোনো interceptor-এর panic-ও ধরা পড়ে।</p>
      <p><strong>নোট:</strong> Node.js-এর <code>@grpc/grpc-js</code>-এ interceptor API অন্যান্য ভাষার (Go, Java) তুলনায় কম পরিণত। NestJS ব্যবহার করলে তার নিজস্ব Guard ও Interceptor ব্যবস্থা gRPC ট্রান্সপোর্টেও কাজ করে, যা অনেক সুবিধাজনক।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Interceptor থেকে হ্যান্ডলারে ডেটা কীভাবে পাস করবেন?</li>
        <li>Interceptor-এ এরর হলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "grpc-8",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Load Balancing","Client-side LB","Proxy LB"],
    question: "gRPC Load Balancing কেন চ্যালেঞ্জিং? Client-side Load Balancing vs Proxy Load Balancing বুঝে বলুন।",
    answer: `
      <p>gRPC দীর্ঘস্থায়ী (Long-lived) <strong>HTTP/2 TCP Connection</strong> ব্যবহার করে। প্রথাগত L4 (TCP Level) লোড ব্যালেন্সার কানেকশন তৈরি হওয়ার পর সব রিকোয়েস্ট ১টি মাত্র সার্ভারেই পাঠাতে থাকে। তাই gRPC-তে L7 (Application Level) লোড ব্যালেন্সিং প্রয়োজন।</p>
      <h4>২টি লোড ব্যালেন্সিং সমাধান:</h4>
      <ol>
        <li><strong>Client-side Load Balancing:</strong> ক্লায়েন্ট নিজেই Service Discovery (যেমন DNS, Consul) থেকে সকল সার্ভার আইপি সংগ্রহ করে এবং রাউন্ড-রবিন অনুযায়ী HTTP/2 স্ট্রিম ভাগ করে পাঠায়। <em>(উচ্চ গতি, কিন্তু ক্লায়েন্ট হেভি হয়)</em>।</li>
        <li><strong>Proxy Load Balancing (Envoy / Nginx):</strong> ক্লায়েন্ট প্রক্সির সাথে HTTP/2 কানেকশন রাখে এবং Envoy/Nginx প্রতিটি L7 gRPC ফ্রেম পার্স করে ব্যাকএন্ড নোডগুলোতে স্ট্রিম লোড ব্যালেন্স করে।</li>
      </ol>
    `
  },
  {
    id: "grpc-9",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Node.js","gRPC-js","Implementation"],
    question: "Node.js-এ @grpc/grpc-js দিয়ে কীভাবে একটি সাধারণ gRPC Server তৈরি করবেন?",
    answer: `
      <p>Node.js-এ gRPC সার্ভার তৈরির চারটি ধাপ: (১) <code>.proto</code> ফাইল লোড করা, (২) সেটি থেকে সার্ভিস ডেফিনিশন তৈরি করা, (৩) প্রতিটি RPC মেথডের হ্যান্ডলার লেখা, এবং (৪) একটি পোর্টে সার্ভার বাইন্ড করে চালু করা।</p>
      <p><code>@grpc/proto-loader</code> রানটাইমে <code>.proto</code> পড়ে অবজেক্টে রূপান্তর করে। হ্যান্ডলারগুলো <code>(call, callback)</code> প্যাটার্ন ব্যবহার করে — <code>call.request</code>-এ ক্লায়েন্টের পাঠানো ডেটা থাকে, আর <code>callback(err, response)</code> দিয়ে উত্তর ফেরত যায়।</p>
      <p><strong>প্রোডাকশনে মনে রাখবেন:</strong> এররে সাধারণ <code>Error</code> নয়, সঠিক gRPC status code দিন (<code>grpc.status.NOT_FOUND</code>, <code>INVALID_ARGUMENT</code>) — ক্লায়েন্ট তখনই বুঝতে পারবে রিট্রাই করা উচিত কি না। এছাড়া <code>createInsecure()</code> কেবল ডেভেলপমেন্টের জন্য; প্রোডাকশনে TLS ক্রেডেনশিয়াল ব্যবহার করুন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

function getUser(call, callback) {
  const userId = call.request.id;
  // Return response (error, result)
  callback(null, { id: userId, name: "Rahim", email: "rahim@test.com" });
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { getUser });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC Server running on port 50051');
  server.start();
});</code></pre>
      </div>
    `
  },
  {
    id: "grpc-10",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["gRPC-Web","Frontend","Browser"],
    question: "gRPC-Web কী এবং ব্রাউজার ফ্রন্টএন্ড থেকে সরাসরি gRPC কল করার চ্যালেঞ্জগুলো কী কী?",
    answer: `
      <p>ব্রাউজার থেকে সরাসরি gRPC কল করা <strong>সম্ভব নয়</strong> — এবং কারণটি প্রযুক্তিগতভাবে মৌলিক।</p>
      <h4>কেন ব্রাউজার পারে না</h4>
      <p>gRPC-র জন্য HTTP/2 ফ্রেমের উপর নিম্ন-স্তরের নিয়ন্ত্রণ দরকার — trailer হেডার পড়া, স্ট্রিম ম্যানুয়ালি নিয়ন্ত্রণ করা ইত্যাদি। কিন্তু ব্রাউজারের <code>fetch</code>/<code>XMLHttpRequest</code> API এই স্তরের অ্যাক্সেস দেয় না। বিশেষ করে gRPC স্ট্যাটাস <code>grpc-status</code> <strong>trailer</strong>-এ পাঠায়, আর ব্রাউজার JavaScript-এ trailer পড়ার কোনো উপায়ই নেই।</p>
      <h4>gRPC-Web — সমাধান</h4>
      <p>gRPC-Web একটি সামান্য ভিন্ন wire protocol, যা ব্রাউজারের সীমার মধ্যে কাজ করে (trailer-কে বডির শেষে এনকোড করে)। কিন্তু ব্যাকএন্ড gRPC সার্ভার এটি বোঝে না — তাই মাঝখানে একটি <strong>অনুবাদক প্রক্সি</strong> লাগে।</p>
      <pre class="mermaid">
flowchart LR
    B["🌐 Browser<br/>gRPC-Web client"] -->|"gRPC-Web<br/>(HTTP/1.1 বা 2)"| P["Envoy / grpcwebproxy"]
    P -->|"প্রকৃত gRPC<br/>(HTTP/2)"| S["gRPC Server"]
      </pre>
      <span class="diagram-caption">প্রক্সি দুই প্রোটোকলের মধ্যে অনুবাদ করে</span>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># Envoy-তে gRPC-Web ফিল্টার
http_filters:
  - name: envoy.filters.http.grpc_web
  - name: envoy.filters.http.cors
  - name: envoy.filters.http.router

cors:
  allow_origin_string_match: [{ prefix: "https://app.example.com" }]
  allow_headers: "keep-alive,content-type,x-grpc-web,grpc-timeout,authorization"
  expose_headers: "grpc-status,grpc-message"    # ⚠️ না দিলে এরর পড়া যাবে না</code></pre>
      </div>
      <h4>যে সীমাবদ্ধতাগুলো মেনে নিতে হবে</h4>
      <ul>
        <li><strong>Client streaming ও bidirectional streaming সমর্থিত নয়</strong> — শুধু unary ও server streaming চলে। এটিই সবচেয়ে বড় সীমা।</li>
        <li><strong>বাড়তি অবকাঠামো:</strong> একটি প্রক্সি চালাতে ও রক্ষণাবেক্ষণ করতে হবে।</li>
        <li><strong>CORS কনফিগার করতেই হবে</strong>, এবং <code>grpc-status</code>/<code>grpc-message</code> expose না করলে ফ্রন্টএন্ডে এরর দেখাই যাবে না।</li>
        <li><strong>ডিবাগিং কঠিন:</strong> ব্রাউজার DevTools-এ পেলোড বাইনারি দেখায়।</li>
      </ul>
      <h4>বাস্তব পরামর্শ</h4>
      <p>বেশিরভাগ প্রজেক্টে <strong>ব্রাউজারের জন্য REST/GraphQL রাখুন এবং ভেতরে সার্ভিস-টু-সার্ভিসে gRPC ব্যবহার করুন</strong> — এটিই সবচেয়ে বাস্তবসম্মত আর্কিটেকচার। একটি BFF (Backend For Frontend) স্তর বাইরে REST দেয়, ভেতরে gRPC কল করে।</p>
      <p><strong>ভবিষ্যৎ:</strong> <strong>Connect</strong> প্রোটোকল (Buf-এর তৈরি) একটি আকর্ষণীয় বিকল্প — এটি একই সার্ভারে gRPC, gRPC-Web ও সাধারণ HTTP/JSON তিনটিই সাপোর্ট করে, কোনো প্রক্সি ছাড়াই। ব্রাউজার সাপোর্ট দরকার হলে এটি বিবেচনা করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>gRPC-Web-এ অথেন্টিকেশন কীভাবে করবেন?</li>
        <li>BFF প্যাটার্নে gRPC কীভাবে ফিট করে?</li>
      </ul>
    `
  },
  {
    id: "grpc-11",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf","Versioning","Rules"],
    question: "Protocol Buffers (Protobuf)-এ Backward এবং Forward Compatibility রুলস কী কী?",
    answer: `
      <p>Protobuf-এর সবচেয়ে বড় ব্যবহারিক শক্তি হলো <strong>স্কিমা বিবর্তন</strong> — প্রডিউসার ও কনজিউমার আলাদা সময়ে ডিপ্লয় করেও একসাথে কাজ করতে পারে। কিন্তু এটি নির্দিষ্ট নিয়ম মানলে তবেই।</p>
      <h4>✅ নিরাপদ পরিবর্তন</h4>
      <ul>
        <li><strong>নতুন ফিল্ড যোগ করা</strong> (নতুন ফিল্ড নম্বর দিয়ে) — পুরনো কোড সেটি উপেক্ষা করবে।</li>
        <li><strong>ফিল্ড মুছে ফেলা</strong> — তবে অবশ্যই সেই নম্বর <code>reserved</code> করে রাখতে হবে।</li>
        <li><strong>ফিল্ডের নাম বদলানো</strong> — wire format-এ নাম যায় না, শুধু নম্বর যায়। (তবে JSON transcoding ব্যবহার করলে নাম গুরুত্বপূর্ণ।)</li>
        <li><code>optional</code> ↔ <code>repeated</code> নয়, কিন্তু <code>int32</code> ↔ <code>int64</code> ↔ <code>uint32</code> ↔ <code>bool</code> পরস্পর সামঞ্জস্যপূর্ণ (একই wire type)।</li>
      </ul>
      <h4>❌ ভাঙা পরিবর্তন</h4>
      <ul>
        <li><strong>ফিল্ড নম্বর বদলানো</strong> — এটিই একমাত্র পরিচয়, বদলালে ডেটা ভুল ফিল্ডে যাবে।</li>
        <li><strong>ফিল্ডের টাইপ অসামঞ্জস্যপূর্ণভাবে বদলানো</strong> (<code>string</code> → <code>int32</code>) — নীরবে বিকৃত ডেটা তৈরি হবে।</li>
        <li><strong>মুছে ফেলা নম্বর পুনরায় ব্যবহার</strong> — সবচেয়ে বিপজ্জনক, কারণ পুরনো ক্লায়েন্ট পুরনো অর্থে সেটি পড়বে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>message User {
  // মুছে ফেলা ফিল্ডের নম্বর ও নাম সংরক্ষিত রাখুন
  reserved 3, 7, 9 to 11;
  reserved "old_email", "legacy_status";

  string id    = 1;
  string name  = 2;
  // string old_email = 3;        ← মুছে ফেলা হয়েছে
  int64  created_at = 4;
  string phone = 12;               // নতুন ফিল্ড, নতুন নম্বর
}</code></pre>
      </div>
      <p><strong><code>reserved</code> কেন অপরিহার্য:</strong> এটি ছাড়া ভবিষ্যতে কেউ ভুল করে ফিল্ড ৩ পুনরায় ব্যবহার করলে কম্পাইলার কিছুই বলবে না, কিন্তু পুরনো ক্লায়েন্ট নতুন ডেটাকে <code>old_email</code> হিসেবে পড়বে — নীরব ডেটা করাপশন। <code>reserved</code> থাকলে কম্পাইলার সাথে সাথে এরর দেবে।</p>
      <h4>proto3-এ অনুপস্থিতি বোঝা</h4>
      <p>proto3-তে ডিফল্টে "ফিল্ড অনুপস্থিত" ও "ফিল্ডের মান ডিফল্ট (0/"")" — এই দুটি আলাদা করা যায় না। এটি সমস্যা তৈরি করে: ইউজার কি বয়স ০ দিয়েছে, নাকি বয়স পাঠায়ইনি?</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>optional int32 age = 5;   // proto3.15+ — hasAge() মেথড তৈরি হয়
// অথবা wrapper type ব্যবহার করুন
google.protobuf.Int32Value age = 5;</code></pre>
      </div>
      <p><strong>স্বয়ংক্রিয় সুরক্ষা:</strong> CI পাইপলাইনে <code>buf breaking --against '.git#branch=main'</code> চালান — এটি ভাঙা পরিবর্তন মার্জ হওয়ার আগেই ধরে ফেলবে। এটি প্রোডাকশনে স্কিমা দুর্ঘটনা প্রতিরোধের সবচেয়ে কার্যকর উপায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি ফিল্ড <code>required</code> থেকে <code>optional</code> করা যায় কি?</li>
        <li>Enum-এ নতুন মান যোগ করলে পুরনো ক্লায়েন্টের কী হয়?</li>
      </ul>
    `
  },
  {
    id: "grpc-12",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Error Handling","Status Codes","API"],
    question: "gRPC Status Codes (OK, NOT_FOUND, CANCELLED) কীভাবে কাজ করে?",
    answer: `
      <p>gRPC HTTP স্ট্যাটাস কোড ব্যবহার করে না — এর নিজস্ব <strong>১৭টি স্ট্যাটাস কোড</strong> আছে, যা ট্রেইলারে (<code>grpc-status</code>) পাঠানো হয়। এগুলো সব ভাষায় ও সব প্ল্যাটফর্মে অভিন্ন।</p>
      <table>
        <tr><th>কোড</th><th>নাম</th><th>কখন</th><th>রিট্রাই?</th></tr>
        <tr><td>0</td><td>OK</td><td>সফল</td><td>—</td></tr>
        <tr><td>1</td><td>CANCELLED</td><td>ক্লায়েন্ট বাতিল করেছে</td><td>না</td></tr>
        <tr><td>3</td><td>INVALID_ARGUMENT</td><td>ক্লায়েন্টের ভুল ইনপুট</td><td>❌ না</td></tr>
        <tr><td>4</td><td>DEADLINE_EXCEEDED</td><td>টাইমআউট</td><td>⚠️ সাবধানে</td></tr>
        <tr><td>5</td><td>NOT_FOUND</td><td>রিসোর্স নেই</td><td>না</td></tr>
        <tr><td>6</td><td>ALREADY_EXISTS</td><td>ডুপ্লিকেট তৈরির চেষ্টা</td><td>না</td></tr>
        <tr><td>7</td><td>PERMISSION_DENIED</td><td>অনুমতি নেই (পরিচয় আছে)</td><td>না</td></tr>
        <tr><td>8</td><td>RESOURCE_EXHAUSTED</td><td>কোটা/rate limit শেষ</td><td>✅ backoff সহ</td></tr>
        <tr><td>13</td><td>INTERNAL</td><td>সার্ভারের বাগ</td><td>না</td></tr>
        <tr><td>14</td><td>UNAVAILABLE</td><td>সার্ভিস সাময়িকভাবে ডাউন</td><td>✅ হ্যাঁ</td></tr>
        <tr><td>16</td><td>UNAUTHENTICATED</td><td>পরিচয়ই নেই/অবৈধ</td><td>না</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const grpc = require('@grpc/grpc-js');

function getOrder(call, callback) {
  const order = db.find(call.request.id);
  if (!order) {
    // ✅ সঠিক status code দিন — ক্লায়েন্ট তখন বুঝবে কী করতে হবে
    return callback({
      code: grpc.status.NOT_FOUND,
      message: \`Order \${call.request.id} not found\`
    });
  }
  callback(null, order);
}</code></pre>
      </div>
      <h4>কেন সঠিক কোড দেওয়া গুরুত্বপূর্ণ</h4>
      <p>gRPC-র রিট্রাই, circuit breaker ও লোড ব্যালেন্সিং লজিক <strong>স্ট্যাটাস কোডের উপর ভিত্তি করে স্বয়ংক্রিয় সিদ্ধান্ত নেয়</strong>। সব এররে <code>INTERNAL</code> ফেরত দিলে ক্লায়েন্ট কখনও রিট্রাই করবে না — এমনকি সাময়িক সমস্যাতেও। আবার সব কিছুতে <code>UNAVAILABLE</code> দিলে ক্লায়েন্ট অর্থহীনভাবে রিট্রাই করে সার্ভারে বাড়তি চাপ ফেলবে।</p>
      <h4>দুটি সূক্ষ্ম পার্থক্য</h4>
      <ul>
        <li><strong><code>UNAUTHENTICATED</code> (16) বনাম <code>PERMISSION_DENIED</code> (7):</strong> প্রথমটি মানে "তুমি কে তা জানি না বা টোকেন অবৈধ", দ্বিতীয়টি মানে "তুমি কে জানি, কিন্তু এই কাজের অনুমতি নেই"।</li>
        <li><strong><code>UNAVAILABLE</code> (14) বনাম <code>INTERNAL</code> (13):</strong> প্রথমটি সাময়িক ও রিট্রাইযোগ্য (সার্ভিস রিস্টার্ট হচ্ছে), দ্বিতীয়টি একটি বাগ — রিট্রাই করলে একই ফল হবে।</li>
      </ul>
      <p><strong>নিরাপত্তা:</strong> এরর মেসেজে ভেতরের বিবরণ (স্ট্যাক ট্রেস, SQL, ফাইল পাথ) দেবেন না। বিস্তারিত সার্ভার-সাইডে লগ করুন, ক্লায়েন্টকে শুধু কোড ও নিরাপদ বার্তা দিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>এররের সাথে কাঠামোবদ্ধ বিবরণ কীভাবে পাঠাবেন (<code>google.rpc.ErrorInfo</code>)?</li>
        <li>Streaming RPC-তে মাঝপথে এরর হলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "grpc-13",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Tools","Buf","Linting"],
    question: "gRPC-তে Buf Tool কী?",
    answer: `
      <p><strong>Buf</strong> হলো Protobuf-এর জন্য একটি আধুনিক টুলচেইন, যা <code>protoc</code>-এর দীর্ঘদিনের ভোগান্তিগুলো দূর করে। এটি Protobuf ইকোসিস্টেমের কার্যত নতুন স্ট্যান্ডার্ড হয়ে উঠেছে।</p>
      <h4><code>protoc</code>-এর সমস্যা</h4>
      <ul>
        <li><code>--proto_path</code> ও import পাথ ম্যানুয়ালি ঠিক করা অত্যন্ত ঝামেলার।</li>
        <li>নির্ভরতা ব্যবস্থাপনা নেই — অন্য প্রকল্পের <code>.proto</code> ফাইল হাতে কপি করতে হয়।</li>
        <li>প্রতিটি ভাষার প্লাগইন আলাদাভাবে ইনস্টল ও সংস্করণ মেলাতে হয়।</li>
        <li>বিল্ড কমান্ড দীর্ঘ, অপঠনযোগ্য শেল স্ক্রিপ্টে পরিণত হয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># buf.yaml — নির্ভরতা ও নিয়ম
version: v2
deps:
  - buf.build/googleapis/googleapis        # রেজিস্ট্রি থেকে, কপি নয়
lint:
  use: [STANDARD]
breaking:
  use: [FILE]

# buf.gen.yaml — কোড জেনারেশন
version: v2
plugins:
  - remote: buf.build/protocolbuffers/js   # প্লাগইন ইনস্টল করাই লাগে না
    out: gen/js
  - remote: buf.build/grpc/node
    out: gen/js</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>buf lint                    # স্টাইল ও ডিজাইন নিয়ম যাচাই
buf format -w               # স্বয়ংক্রিয় ফরম্যাটিং
buf generate                # সব ভাষার কোড তৈরি — একটি কমান্ডে
buf breaking --against '.git#branch=main'   # ভাঙা পরিবর্তন সনাক্ত
buf push                    # স্কিমা রেজিস্ট্রিতে প্রকাশ</code></pre>
      </div>
      <h4>সবচেয়ে মূল্যবান ফিচার: breaking change detection</h4>
      <p><code>buf breaking</code> বর্তমান স্কিমাকে একটি রেফারেন্সের (সাধারণত <code>main</code> ব্রাঞ্চ) সাথে তুলনা করে এবং ফিল্ড নম্বর পরিবর্তন, টাইপ পরিবর্তন বা মুছে ফেলার মতো <strong>wire-incompatible পরিবর্তন CI-তেই ধরে ফেলে</strong>।</p>
      <p>এটি অত্যন্ত গুরুত্বপূর্ণ, কারণ Protobuf-এর ভাঙা পরিবর্তন <em>কম্পাইল টাইমে ধরা পড়ে না</em> — এটি প্রোডাকশনে নীরব ডেটা করাপশন হিসেবে প্রকাশ পায়। CI-তে এই একটি চেক যোগ করলে সেই শ্রেণির দুর্ঘটনা কার্যত দূর হয়ে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># GitHub Actions
- uses: bufbuild/buf-setup-action@v1
- run: buf lint
- run: buf breaking --against 'https://github.com/org/repo.git#branch=main'</code></pre>
      </div>
      <h4>অন্যান্য সুবিধা</h4>
      <ul>
        <li><strong><code>buf lint</code>:</strong> Google-এর API ডিজাইন গাইডলাইন প্রয়োগ করে — enum-এ <code>UNSPECIFIED</code> আছে কি না, নামকরণ ধারাবাহিক কি না ইত্যাদি।</li>
        <li><strong>Buf Schema Registry (BSR):</strong> npm-এর মতো <code>.proto</code>-র জন্য প্যাকেজ রেজিস্ট্রি — টিমগুলো স্কিমা শেয়ার করতে পারে সংস্করণসহ।</li>
        <li><strong>Remote plugin:</strong> স্থানীয়ভাবে কোনো protoc প্লাগইন ইনস্টল করতে হয় না — সংস্করণ অসামঞ্জস্যের সমস্যা দূর।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি ইচ্ছাকৃত breaking change কীভাবে সামলাবেন?</li>
        <li>Monorepo-তে একাধিক টিমের .proto কীভাবে সংগঠিত করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-14",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Debugging","Evans CLI","Reflection"],
    question: "gRPC Server Reflection এবং Evans CLI কী?",
    answer: `
      <p><strong>Server Reflection</strong> gRPC সার্ভারকে রানটাইমে নিজের <code>.proto</code> সংজ্ঞা প্রকাশ করতে দেয়। এতে ক্লায়েন্ট আগে থেকে <code>.proto</code> ফাইল না জেনেও সার্ভিস আবিষ্কার ও কল করতে পারে।</p>
      <p><strong>যে সমস্যাটি সমাধান করে:</strong> gRPC বাইনারি প্রোটোকল, তাই <code>curl</code> দিয়ে সহজে পরীক্ষা করা যায় না। Reflection ছাড়া প্রতিটি টুলকে সঠিক <code>.proto</code> ফাইল হাতে দিতে হতো — যা ডিবাগিংকে ভীষণ কষ্টকর করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { ReflectionService } = require('@grpc/reflection');

const reflection = new ReflectionService(packageDefinition);
reflection.addToServer(server);
// ⚠️ প্রোডাকশনে সাধারণত বন্ধ রাখুন বা অথেন্টিকেশনের পেছনে দিন</code></pre>
      </div>
      <h4>grpcurl — gRPC-র curl</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সব সার্ভিস তালিকাভুক্ত করুন (reflection ব্যবহার করে)
grpcurl -plaintext localhost:50051 list

# একটি সার্ভিসের মেথড দেখুন
grpcurl -plaintext localhost:50051 list order.OrderService

# মেথডের সংজ্ঞা দেখুন
grpcurl -plaintext localhost:50051 describe order.OrderService.GetOrder

# আসল কল — JSON দিয়ে, বাইনারি হাতে বানাতে হয় না
grpcurl -plaintext -d '{"id":"123"}' \\
  localhost:50051 order.OrderService/GetOrder

# হেডার সহ
grpcurl -H "authorization: Bearer TOKEN" -d '{"id":"123"}' \\
  api.example.com:443 order.OrderService/GetOrder

# reflection বন্ধ থাকলে .proto ফাইল দিন
grpcurl -proto order.proto -d '{"id":"123"}' localhost:50051 ...</code></pre>
      </div>
      <h4>সংশ্লিষ্ট টুল</h4>
      <ul>
        <li><strong>grpcurl:</strong> CLI, স্ক্রিপ্টিং ও CI-তে আদর্শ।</li>
        <li><strong>Evans:</strong> ইন্টারঅ্যাকটিভ REPL — সার্ভিস ব্রাউজ করে ধাপে ধাপে ইনপুট দেওয়া যায়, শেখার জন্য চমৎকার।</li>
        <li><strong>Postman / Insomnia:</strong> এখন gRPC সাপোর্ট করে এবং reflection ব্যবহার করে স্বয়ংক্রিয়ভাবে মেথড ও ফিল্ড দেখায়।</li>
        <li><strong>grpcui:</strong> ব্রাউজারে Postman-সদৃশ ওয়েব UI দেয়।</li>
      </ul>
      <h4>নিরাপত্তা বিবেচনা</h4>
      <p>Reflection আপনার <strong>সম্পূর্ণ API স্কিমা প্রকাশ করে দেয়</strong> — সব সার্ভিস, মেথড ও ফিল্ডের নাম। আক্রমণকারীর জন্য এটি একটি সম্পূর্ণ মানচিত্র।</p>
      <ul>
        <li><strong>ডেভেলপমেন্ট ও স্টেজিংয়ে চালু রাখুন</strong> — উৎপাদনশীলতা অনেক বাড়ে।</li>
        <li><strong>পাবলিক-ফেসিং প্রোডাকশনে বন্ধ রাখুন</strong>, অথবা কেবল অভ্যন্তরীণ নেটওয়ার্কে সীমাবদ্ধ করুন।</li>
        <li>অভ্যন্তরীণ সার্ভিস-টু-সার্ভিস পরিবেশে চালু রাখা সাধারণত গ্রহণযোগ্য এবং ডিবাগিংয়ে বিশাল সাহায্য করে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Reflection ছাড়া প্রোডাকশন gRPC কীভাবে ডিবাগ করবেন?</li>
        <li>gRPC-র জন্য API ডকুমেন্টেশন কীভাবে তৈরি করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-15",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["DevOps","Health Check","Kubernetes"],
    question: "gRPC Health Checking Protocol কীভাবে কাজ করে?",
    answer: `
      <p>gRPC-র একটি <strong>স্ট্যান্ডার্ড health checking প্রোটোকল</strong> আছে (<code>grpc.health.v1.Health</code>), যা লোড ব্যালেন্সার ও অর্কেস্ট্রেটরকে জানায় সার্ভিসটি ট্রাফিক নেওয়ার জন্য প্রস্তুত কি না।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>service Health {
  rpc Check(HealthCheckRequest) returns (HealthCheckResponse);
  rpc Watch(HealthCheckRequest) returns (stream HealthCheckResponse);
}

message HealthCheckResponse {
  enum ServingStatus {
    UNKNOWN         = 0;
    SERVING         = 1;
    NOT_SERVING     = 2;
    SERVICE_UNKNOWN = 3;
  }
  ServingStatus status = 1;
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { HealthImplementation } = require('grpc-health-check');

const healthImpl = new HealthImplementation({
  '': 'SERVING',                    // খালি নাম = পুরো সার্ভার
  'order.OrderService': 'SERVING'   // প্রতি-সার্ভিস স্ট্যাটাস
});
healthImpl.addToServer(server);

// নির্ভরতা ব্যর্থ হলে স্ট্যাটাস বদলান
db.on('error', () => healthImpl.setStatus('order.OrderService', 'NOT_SERVING'));
db.on('connect', () => healthImpl.setStatus('order.OrderService', 'SERVING'));</code></pre>
      </div>
      <h4>দুটি মেথডের ভূমিকা</h4>
      <ul>
        <li><strong><code>Check</code> (unary):</strong> একবার জিজ্ঞেস করে উত্তর নেওয়া — polling-ভিত্তিক health check।</li>
        <li><strong><code>Watch</code> (server streaming):</strong> স্ট্যাটাস <em>বদলালেই</em> সাথে সাথে জানানো হয়। এটি অনেক দক্ষ ও দ্রুত — polling-এর বিলম্ব থাকে না। gRPC-র নিজস্ব লোড ব্যালেন্সার এটি ব্যবহার করে।</li>
      </ul>
      <h4>Kubernetes-এ ব্যবহার</h4>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># k8s 1.24+ এ নেটিভ gRPC probe (আগে grpc_health_probe বাইনারি লাগত)
livenessProbe:
  grpc:
    port: 50051
  initialDelaySeconds: 10

readinessProbe:
  grpc:
    port: 50051
    service: "order.OrderService"    # নির্দিষ্ট সার্ভিসের স্ট্যাটাস
  periodSeconds: 5</code></pre>
      </div>
      <h4>প্রতি-সার্ভিস স্ট্যাটাস কেন কাজে লাগে</h4>
      <p>একটি gRPC সার্ভারে একাধিক সার্ভিস থাকতে পারে। ধরুন <code>OrderService</code>-এর ডাটাবেজ ডাউন, কিন্তু <code>SearchService</code> (যা Elasticsearch ব্যবহার করে) দিব্যি চলছে। প্রতি-সার্ভিস স্ট্যাটাস থাকলে কেবল প্রথমটির ট্রাফিক সরানো যায় — পুরো পড মেরে ফেলার দরকার হয় না।</p>
      <h4>Liveness বনাম Readiness — একটি গুরুত্বপূর্ণ পার্থক্য</h4>
      <ul>
        <li><strong>Liveness</strong> = "আমি কি বেঁচে আছি?" — ব্যর্থ হলে k8s পড <em>রিস্টার্ট</em> করবে। এখানে নির্ভরতা যাচাই করবেন <strong>না</strong>।</li>
        <li><strong>Readiness</strong> = "আমি কি ট্রাফিক নিতে পারব?" — ব্যর্থ হলে শুধু লোড ব্যালেন্সার থেকে বাদ যাবে। এখানে নির্ভরতা যাচাই করুন।</li>
      </ul>
      <p><strong>কেন এটি জরুরি:</strong> liveness-এ ডাটাবেজ যাচাই করলে DB সাময়িকভাবে ডাউন হলে <em>সব পড একসাথে রিস্টার্ট</em> হতে থাকবে — যা পরিস্থিতি আরও খারাপ করে, কারণ DB ফিরে এলে সব পড একসাথে কানেকশন চাইবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Graceful shutdown-এর সময় health status কীভাবে ব্যবহার করবেন?</li>
        <li>Health check এন্ডপয়েন্ট কি অথেন্টিকেশন ছাড়া রাখা উচিত?</li>
      </ul>
    `
  },
  {
    id: "grpc-16",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Optimization","FieldMask","Performance"],
    question: "gRPC FieldMask (Partial Response) কী?",
    answer: `
      <p><strong>FieldMask</strong> ক্লায়েন্টকে বলতে দেয় সে ঠিক <em>কোন ফিল্ডগুলো</em> নিয়ে আগ্রহী — পড়ার সময় (partial response) বা লেখার সময় (partial update)।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>import "google/protobuf/field_mask.proto";

message GetUserRequest {
  string id = 1;
  google.protobuf.FieldMask read_mask = 2;   // "id,name,profile.avatar_url"
}

message UpdateUserRequest {
  User user = 1;
  google.protobuf.FieldMask update_mask = 2; // শুধু এই ফিল্ডগুলোই আপডেট হবে
}</code></pre>
      </div>
      <h4>Partial Update — যে সমস্যাটি সমাধান করে</h4>
      <p>একটি <code>UpdateUser</code> কলে ক্লায়েন্ট শুধু <code>name</code> পাঠাল। সার্ভার কী করবে?</p>
      <ul>
        <li>বাকি ফিল্ডগুলো কি <em>অপরিবর্তিত</em> রাখবে? — তাহলে কোনো ফিল্ড <em>মুছে ফেলার</em> উপায় নেই।</li>
        <li>নাকি বাকিগুলো <em>খালি করে দেবে</em>? — তাহলে প্রতিবার সম্পূর্ণ অবজেক্ট পাঠাতে হবে, এবং দুটি সমান্তরাল আপডেটে একজনের পরিবর্তন হারাবে (lost update)।</li>
      </ul>
      <p><code>update_mask</code> এই দ্ব্যর্থতা দূর করে — এটি স্পষ্টভাবে বলে দেয় "শুধু এই ফিল্ডগুলো স্পর্শ করো"।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function updateUser(call, callback) {
  const { user, update_mask } = call.request;
  const allowed = ['name', 'email', 'phone'];
  const updates = {};

  for (const path of update_mask.paths) {
    if (!allowed.includes(path)) {
      return callback({ code: grpc.status.INVALID_ARGUMENT,
                        message: \`\${path} আপডেট করা যাবে না\` });
    }
    updates[path] = user[path];      // null/খালি হলেও সেটি ইচ্ছাকৃত
  }

  db.users.update(user.id, updates); // শুধু নির্দিষ্ট কলাম
  callback(null, getUser(user.id));
}</code></pre>
      </div>
      <h4>Partial Response — ব্যান্ডউইথ সাশ্রয়</h4>
      <p><code>read_mask</code> দিয়ে ক্লায়েন্ট কেবল প্রয়োজনীয় ফিল্ড চাইতে পারে। মোবাইল অ্যাপের লিস্ট ভিউতে হয়তো শুধু <code>id</code> ও <code>name</code> লাগে — পুরো প্রোফাইল, ঠিকানা ও পছন্দের তালিকা নয়।</p>
      <p>এটি GraphQL-এর ফিল্ড নির্বাচনের অনুরূপ ধারণা, তবে অনেক সরল। সার্ভার এটি কাজে লাগিয়ে <strong>ডাটাবেজ কুয়েরিও অপ্টিমাইজ করতে পারে</strong> — অপ্রয়োজনীয় JOIN বা কলাম বাদ দিয়ে।</p>
      <h4>ব্যবহারিক নোট</h4>
      <ul>
        <li><strong>পাথ নেস্টেড হতে পারে:</strong> <code>"profile.avatar_url"</code>।</li>
        <li><strong>খালি mask-এর অর্থ আগে থেকে ঠিক করে ডকুমেন্ট করুন</strong> — সাধারণত read-এ "সব ফিল্ড", update-এ "সব ফিল্ড প্রতিস্থাপন"।</li>
        <li><strong>নিরাপত্তা:</strong> mask-এর পাথ অবশ্যই যাচাই করুন। যাচাই না করলে ক্লায়েন্ট <code>"role"</code> বা <code>"is_admin"</code> আপডেট করার চেষ্টা করতে পারে — একটি গুরুতর privilege escalation দুর্বলতা।</li>
        <li>Google-এর নিজস্ব API (Cloud, Ads) সর্বত্র এই প্যাটার্ন ব্যবহার করে — এটি একটি প্রতিষ্ঠিত কনভেনশন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>FieldMask ও HTTP PATCH-এর সম্পর্ক কী?</li>
        <li>সমান্তরাল আপডেটে lost update কীভাবে ঠেকাবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-17",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Gateway","Transcoding","JSON"],
    question: "gRPC JSON Transcoding (grpc-gateway) কী?",
    answer: `
      <p><strong>grpc-gateway</strong> একটি reverse proxy তৈরি করে যা RESTful JSON API-কে gRPC কলে অনুবাদ করে। ফলে <em>একটি</em> <code>.proto</code> ফাইল থেকেই দুটি ইন্টারফেস পাওয়া যায় — ভেতরে gRPC, বাইরে REST।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>import "google/api/annotations.proto";

service OrderService {
  rpc GetOrder(GetOrderRequest) returns (Order) {
    option (google.api.http) = {
      get: "/v1/orders/{id}"          // path প্যারামিটার স্বয়ংক্রিয়ভাবে ম্যাপ হয়
    };
  }

  rpc CreateOrder(CreateOrderRequest) returns (Order) {
    option (google.api.http) = {
      post: "/v1/orders"
      body: "*"                        // পুরো JSON বডি রিকোয়েস্টে ম্যাপ হবে
    };
  }

  rpc UpdateOrder(UpdateOrderRequest) returns (Order) {
    option (google.api.http) = {
      patch: "/v1/orders/{order.id}"
      body: "order"
    };
  }
}</code></pre>
      </div>
      <h4>কেন এটি কার্যকর</h4>
      <ul>
        <li><strong>একটিই সত্যের উৎস:</strong> API সংজ্ঞা এক জায়গায় — REST ও gRPC আলাদাভাবে রক্ষণাবেক্ষণ করতে হয় না, তাই দুটি কখনও অসামঞ্জস্যপূর্ণ হয় না।</li>
        <li><strong>ব্রাউজার ও থার্ড-পার্টি সাপোর্ট:</strong> ব্রাউজার সরাসরি gRPC পারে না, কিন্তু REST সবাই পারে।</li>
        <li><strong>ধীরে ধীরে মাইগ্রেশন:</strong> বিদ্যমান REST ক্লায়েন্ট অপরিবর্তিত রেখে ভেতরে gRPC-তে যাওয়া যায়।</li>
        <li><strong>স্বয়ংক্রিয় OpenAPI/Swagger:</strong> <code>protoc-gen-openapiv2</code> প্লাগইন একই annotation থেকে Swagger ডকুমেন্টেশনও তৈরি করে দেয়।</li>
      </ul>
      <pre class="mermaid">
flowchart LR
    B["🌐 Browser / cURL"] -->|"REST + JSON"| GW["grpc-gateway"]
    M["📱 Mobile"] -->|"gRPC"| S["gRPC Server"]
    GW -->|"gRPC"| S
    P[".proto ফাইল"] -.->|"codegen"| GW
    P -.->|"codegen"| S
    P -.->|"codegen"| SW["Swagger docs"]
      </pre>
      <span class="diagram-caption">একটি .proto থেকে তিনটি আউটপুট</span>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Go-কেন্দ্রিক:</strong> grpc-gateway একটি Go প্রকল্প। Node.js ব্যাকএন্ডে ব্যবহার করতে হলে gateway-টি আলাদা Go প্রসেস হিসেবে চালাতে হবে — অতিরিক্ত অপারেশনাল জটিলতা।</li>
        <li><strong>Streaming সীমিত:</strong> server streaming চলে (chunked JSON হিসেবে), কিন্তু client ও bidirectional streaming REST-এ ম্যাপ করা যায় না।</li>
        <li><strong>REST সেমান্টিক্স আপস করতে হয়:</strong> সত্যিকারের RESTful ডিজাইন (HATEOAS, সূক্ষ্ম স্ট্যাটাস কোড) সবসময় সুন্দরভাবে ম্যাপ হয় না।</li>
        <li>বাড়তি একটি hop — সামান্য latency যোগ হয়।</li>
      </ul>
      <p><strong>বিকল্প:</strong> Envoy-র <code>grpc_json_transcoder</code> ফিল্টার একই কাজ করে, কিন্তু ইতিমধ্যে Envoy ব্যবহার করলে আলাদা প্রসেস লাগে না। আর <strong>Connect</strong> প্রোটোকল একই সার্ভারে gRPC ও HTTP/JSON দুটিই দেয় — কোনো gateway ছাড়াই, যা Node.js-বান্ধব।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>gRPC status code REST-এ কোন HTTP কোডে ম্যাপ হয়?</li>
        <li>Node.js প্রজেক্টে gateway-র বদলে কী ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-18",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Networking","HTTP/2","Keepalive"],
    question: "gRPC Stream-এ HTTP/2 Keepalive Pings-এর ভূমিকা কী?",
    answer: `
      <p>দীর্ঘস্থায়ী gRPC স্ট্রিমে keepalive ping বিশেষভাবে জরুরি, কারণ স্ট্রিম ঘণ্টার পর ঘণ্টা খোলা থাকতে পারে এবং মাঝে দীর্ঘ নিষ্ক্রিয়তা আসতে পারে।</p>
      <h4>যে সমস্যাটি ঘটে</h4>
      <p>NAT gateway, ফায়ারওয়াল ও ক্লাউড লোড ব্যালেন্সার সাধারণত <strong>নিষ্ক্রিয় TCP কানেকশন ৩৫০ সেকেন্ড থেকে ৫ মিনিটের মধ্যে নীরবে ফেলে দেয়</strong> — কোনো FIN বা RST না পাঠিয়েই। ফলে দুই পক্ষই ভাবতে থাকে কানেকশন জীবিত, অথচ প্যাকেট কোথাও পৌঁছাচ্ছে না।</p>
      <p>একটি server-streaming RPC-তে (যেমন ইভেন্ট ফিড) যদি ১০ মিনিট কোনো ইভেন্ট না আসে, কানেকশনটি নীরবে মরে যাবে। পরের ইভেন্ট পাঠানোর চেষ্টায় সার্ভার জানতেও পারবে না যে ক্লায়েন্ট আর নেই — এবং ক্লায়েন্ট অনন্তকাল অপেক্ষা করতে থাকবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// স্ট্রিমিং ক্লায়েন্টে keepalive অত্যাবশ্যক
const client = new EventService(addr, creds, {
  'grpc.keepalive_time_ms': 30000,
  'grpc.keepalive_timeout_ms': 10000,
  'grpc.keepalive_permit_without_calls': 1   // নিষ্ক্রিয় স্ট্রিমেও ping
});

const stream = client.watchEvents({ topic: 'orders' });
stream.on('data',  (event) => handle(event));
stream.on('error', (err) => {
  // keepalive-এর কারণে মৃত কানেকশন দ্রুত ধরা পড়ে
  if (err.code === grpc.status.UNAVAILABLE) reconnectWithBackoff();
});
stream.on('end', () => reconnectWithBackoff());</code></pre>
      </div>
      <h4>HTTP/2 PING ফ্রেম</h4>
      <p>gRPC keepalive HTTP/2-র নেটিভ <code>PING</code> ফ্রেম ব্যবহার করে। এটি <em>কানেকশন-স্তরের</em>, স্ট্রিম-স্তরের নয় — তাই একটি ping দিয়েই সেই কানেকশনের সব স্ট্রিমের স্বাস্থ্য যাচাই হয়ে যায়। পিয়ার নির্দিষ্ট সময়ের মধ্যে PING ACK না পাঠালে gRPC কানেকশনটি ভেঙে দেয় এবং সব স্ট্রিমে <code>UNAVAILABLE</code> এরর যায়।</p>
      <h4>দুটি অপরিহার্য বিষয়</h4>
      <ul>
        <li><strong><code>permit_without_calls</code> স্ট্রিমিংয়ে বিশেষভাবে দরকার:</strong> নাহলে সক্রিয় ডেটা প্রবাহ ছাড়া ping যাবে না — অথচ ঠিক সেই নিষ্ক্রিয় সময়েই কানেকশন মরে।</li>
        <li><strong>সার্ভারের <code>min_ping_interval_without_data_ms</code> মেলাতে হবে</strong> — নাহলে সার্ভার ক্লায়েন্টের ping-কে অপব্যবহার ধরে <code>ENHANCE_YOUR_CALM</code> দিয়ে কানেকশন কেটে দেবে।</li>
      </ul>
      <p><strong>অ্যাপ্লিকেশন-স্তরের heartbeat-ও বিবেচনা করুন:</strong> কিছু আর্কিটেকচারে (বিশেষত প্রক্সির পেছনে) protocol-স্তরের ping যথেষ্ট নয়। তখন স্ট্রিমে পর্যায়ক্রমে একটি খালি "heartbeat" মেসেজ পাঠানো হয় — এটি মাঝের সব ডিভাইসের কাছে প্রকৃত ট্রাফিক হিসেবে গণ্য হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>স্ট্রিম ছিঁড়ে গেলে মিস হওয়া ইভেন্ট কীভাবে পুনরুদ্ধার করবেন?</li>
        <li>Keepalive ping ও অ্যাপ্লিকেশন heartbeat-এর মধ্যে কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "grpc-19",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf","Serialization","Varints"],
    question: "Protocol Buffers Binary Wire Format (Varints, Tag-Length-Value) কীভাবে JSON-এর তুলনায় চরম ব্যান্ডউইথ সাশ্রয় করে?",
    answer: `
      <p>Protobuf-এর ব্যান্ডউইথ সাশ্রয়ের মূল কারণ তিনটি: <strong>ফিল্ডের নাম পাঠানো হয় না</strong>, <strong>সংখ্যা varint-এ এনকোড হয়</strong>, এবং <strong>পুরোটাই বাইনারি</strong>।</p>
      <h4>Tag-Length-Value (TLV) কাঠামো</h4>
      <p>প্রতিটি ফিল্ড এনকোড হয় <code>(field_number &lt;&lt; 3) | wire_type</code> — একটি বাইটে ফিল্ড নম্বর ও টাইপ দুটোই। ফিল্ডের <em>নাম</em> কখনও তারে যায় না, কারণ দুই পক্ষেই <code>.proto</code> ফাইল আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>JSON:      {"userId":150,"isActive":true}          → 30 বাইট
Protobuf:  08 96 01 10 01                          → 5 বাইট

বিশ্লেষণ:
  08     = ফিল্ড 1, wire type 0 (varint)   [(1<<3)|0 = 8]
  96 01  = 150 (varint এনকোডিং)
  10     = ফিল্ড 2, wire type 0            [(2<<3)|0 = 16]
  01     = true</code></pre>
      </div>
      <h4>Varint — পরিবর্তনশীল দৈর্ঘ্যের সংখ্যা</h4>
      <p>ছোট সংখ্যা কম বাইট নেয়। প্রতিটি বাইটের ৭ বিট ডেটা, ১ বিট "আরও বাইট আছে" নির্দেশক:</p>
      <ul>
        <li>০–১২৭ → <strong>১ বাইট</strong></li>
        <li>১২৮–১৬,৩৮৩ → ২ বাইট</li>
        <li>একটি <code>int32</code> সর্বোচ্চ ৫ বাইট</li>
      </ul>
      <p>বাস্তবে বেশিরভাগ আইডি, কাউন্ট ও enum ছোট সংখ্যা — তাই গড়ে বিশাল সাশ্রয় হয়। তুলনায় JSON-এ <code>150</code> লিখতে ৩ বাইট লাগে (অক্ষর হিসেবে), আর ফিল্ডের নাম <code>"userId"</code> আরও ৮ বাইট।</p>
      <h4>একটি গুরুত্বপূর্ণ ফাঁদ: ঋণাত্মক সংখ্যা</h4>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>int32  balance = 1;   // ❌ ঋণাত্মক হলে সবসময় 10 বাইট!
sint32 balance = 1;   // ✅ ZigZag এনকোডিং — -1 → 1, 1 → 2, -2 → 3...</code></pre>
      </div>
      <p><code>int32</code>-এ ঋণাত্মক সংখ্যা two's complement-এ উপরের সব বিট ১ হয়ে যায়, ফলে varint সর্বোচ্চ দৈর্ঘ্য নেয়। <strong>ঋণাত্মক মান প্রত্যাশিত হলে অবশ্যই <code>sint32</code>/<code>sint64</code> ব্যবহার করুন</strong> — এটি ZigZag এনকোডিং দিয়ে ছোট ঋণাত্মক সংখ্যাকেও ছোট রাখে।</p>
      <h4>বাস্তব পারফরম্যান্স</h4>
      <ul>
        <li><strong>আকার:</strong> সাধারণত JSON-এর ৩০-৫০% (কম্প্রেশনের আগে)। gzip করার পর পার্থক্য কমে যায়, কিন্তু Protobuf তখনও ছোট থাকে।</li>
        <li><strong>পার্সিং গতি:</strong> এখানেই আসল লাভ — Protobuf পার্সিং JSON-এর চেয়ে <strong>৫-১০ গুণ দ্রুত</strong>, কারণ কোনো স্ট্রিং পার্সিং, escape হ্যান্ডলিং বা টাইপ অনুমান লাগে না। উচ্চ QPS-এ এটি CPU খরচে বড় পার্থক্য গড়ে।</li>
      </ul>
      <p><strong>খরচ:</strong> মানুষের পড়ার অযোগ্য — <code>tcpdump</code> দিয়ে ডিবাগ করা কঠিন। এজন্যই <code>grpcurl</code> ও server reflection-এর মতো টুল দরকার হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ফিল্ড নম্বর ১-১৫ কেন বিশেষ?</li>
        <li>Protobuf-এ ফিল্ড অনুপস্থিত ও ডিফল্ট মান কীভাবে আলাদা করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-20",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Streaming","Bidirectional","HTTP2"],
    question: "gRPC 4 Types of RPCs: Unary, Server Streaming, Client Streaming, Bidirectional Streaming কীভাবে কাজ করে?",
    answer: `
      <p>gRPC চার ধরনের RPC সমর্থন করে, এবং এটিই HTTP/1.1-ভিত্তিক REST-এর তুলনায় এর সবচেয়ে বড় ক্ষমতাগত পার্থক্য। HTTP/2-র স্ট্রিমিং সক্ষমতা এটি সম্ভব করে।</p>
      <pre class="mermaid">
flowchart TD
    subgraph U["1. Unary"]
      U1["Client →── request ──→ Server"]
      U2["Client ←── response ── Server"]
    end
    subgraph SS["2. Server Streaming"]
      S1["Client →── request ──→ Server"]
      S2["Client ←═ res 1,2,3... ═ Server"]
    end
    subgraph CS["3. Client Streaming"]
      C1["Client ═ req 1,2,3... ═→ Server"]
      C2["Client ←── response ── Server"]
    end
    subgraph BD["4. Bidirectional"]
      B1["Client ═══ req/res ═══ Server<br/>(স্বাধীনভাবে, একসাথে)"]
    end
      </pre>
      <span class="diagram-caption">চারটি প্যাটার্ন একই .proto ফাইলে সংজ্ঞায়িত হয়</span>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>service OrderService {
  // 1. Unary — সাধারণ request/response
  rpc GetOrder(GetOrderRequest) returns (Order);

  // 2. Server streaming — একটি রিকোয়েস্ট, অনেক রেসপন্স
  rpc WatchOrders(WatchRequest) returns (stream Order);

  // 3. Client streaming — অনেক রিকোয়েস্ট, একটি রেসপন্স
  rpc UploadOrders(stream Order) returns (UploadSummary);

  // 4. Bidirectional — দুই দিকেই স্বাধীন স্ট্রিম
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}</code></pre>
      </div>
      <h4>কোনটি কখন</h4>
      <ul>
        <li><strong>Unary:</strong> ৯০% ক্ষেত্রে এটিই — সাধারণ CRUD অপারেশন। REST-এর সমতুল্য।</li>
        <li><strong>Server streaming:</strong> বড় ফলাফল সেট পাঠানো (পুরোটা মেমরিতে জমা না করে), লাইভ আপডেট, প্রগ্রেস রিপোর্ট, AI টোকেন স্ট্রিমিং।</li>
        <li><strong>Client streaming:</strong> বড় ফাইল বা ব্যাচ ডেটা আপলোড, সেন্সর/টেলিমেট্রি ডেটা পাঠানো।</li>
        <li><strong>Bidirectional:</strong> চ্যাট, রিয়েল-টাইম গেম, সমান্তরাল আলোচনা — WebSocket-এর সমতুল্য কিন্তু টাইপ-নিরাপদ।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ বিবরণ</h4>
      <ul>
        <li><strong>Bidirectional স্ট্রিম সম্পূর্ণ স্বাধীন:</strong> ক্লায়েন্ট ও সার্ভার একে অপরের অপেক্ষা না করে যেকোনো ক্রমে মেসেজ পাঠাতে পারে। এটি request-response জোড়া নয়।</li>
        <li><strong>একটি স্ট্রিমের ভেতরে ক্রম নিশ্চিত</strong> (HTTP/2 stream-এর গুণে), কিন্তু ভিন্ন স্ট্রিমের মধ্যে নয়।</li>
        <li><strong>স্ট্রিম দীর্ঘস্থায়ী কানেকশন ধরে রাখে</strong> — লোড ব্যালেন্সিংয়ে এটি সমস্যা তৈরি করে (একটি সার্ভারে আটকে যায়), এবং keepalive টিউনিং দরকার হয়।</li>
        <li><strong>Backpressure:</strong> স্ট্রিমিংয়ে গ্রাহক ধীর হলে HTTP/2-র flow control আপনাআপনি প্রেরককে ধীর করে দেয় — এটি বিনামূল্যে পাওয়া একটি বড় সুবিধা।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Server streaming ও SSE-র মধ্যে পার্থক্য কী?</li>
        <li>দীর্ঘস্থায়ী স্ট্রিম লোড ব্যালেন্সারে কী সমস্যা তৈরি করে?</li>
      </ul>
    `
  },
  {
    id: "grpc-21",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Interceptors","Middleware","Auth"],
    question: "gRPC Interceptors (UnaryInterceptor vs StreamInterceptor) দিয়ে Authentication & Logging কীভাবে করবেন?",
    answer: `
      <p>Unary ও streaming RPC-র জন্য interceptor আলাদাভাবে লিখতে হয়, কারণ তাদের জীবনচক্র সম্পূর্ণ ভিন্ন।</p>
      <table>
        <tr><th>দিক</th><th>Unary Interceptor</th><th>Stream Interceptor</th></tr>
        <tr><td>কল হয়</td><td>প্রতি RPC-তে একবার</td><td>স্ট্রিম শুরুতে একবার</td></tr>
        <tr><td>দেখে</td><td>request ও response সরাসরি</td><td>স্ট্রিম অবজেক্ট (মেসেজগুলো নয়)</td></tr>
        <tr><td>প্রতিটি মেসেজে হুক</td><td>প্রযোজ্য নয়</td><td>স্ট্রিম মুড়ে (wrap) দিতে হয়</td></tr>
        <tr><td>জটিলতা</td><td>সরল</td><td>উল্লেখযোগ্য</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- Unary: auth + লগিং + সময় মাপা ----
function unaryLogger(methodName, handler) {
  return async (call, callback) => {
    const start = Date.now();
    const traceId = call.metadata.get('x-trace-id')[0] ?? randomUUID();

    try {
      const user = verifyToken(call.metadata.get('authorization')[0]);
      call.user = user;

      handler(call, (err, res) => {
        logger.info({
          method: methodName, traceId, userId: user?.id,
          durationMs: Date.now() - start,
          status: err ? err.code : grpc.status.OK
        });
        callback(err, res);
      });
    } catch (e) {
      callback({ code: grpc.status.UNAUTHENTICATED, message: 'অবৈধ টোকেন' });
    }
  };
}</code></pre>
      </div>
      <h4>Streaming-এ কেন কঠিন</h4>
      <p>Streaming RPC-তে ইন্টারসেপ্টর কেবল স্ট্রিম <em>শুরুর</em> সময় চলে। প্রতিটি মেসেজে কিছু করতে চাইলে (যেমন প্রতিটি মেসেজ লগ করা বা ভ্যালিডেট করা) স্ট্রিম অবজেক্টটিকে মুড়ে দিতে হয় — অর্থাৎ <code>write</code>/<code>on('data')</code> মেথডগুলো ইন্টারসেপ্ট করতে হয়।</p>
      <p>এছাড়া মাথায় রাখতে হয়: স্ট্রিম দীর্ঘক্ষণ চলে, তাই <strong>স্ট্রিম শুরুতে যাচাই করা টোকেন মাঝপথে মেয়াদোত্তীর্ণ হতে পারে</strong>। দীর্ঘস্থায়ী স্ট্রিমে পর্যায়ক্রমে পুনরায় অনুমোদন যাচাই করা প্রয়োজন হতে পারে।</p>
      <h4>ব্যবহারিক ক্রম</h4>
      <p>একাধিক interceptor চেইনে চলে। যুক্তিসঙ্গত ক্রম:</p>
      <ol>
        <li><strong>Recovery</strong> — সবার বাইরে, যাতে যেকোনো panic ধরা পড়ে।</li>
        <li><strong>Logging/tracing</strong> — সব কিছুর সময় মাপতে।</li>
        <li><strong>Auth</strong> — অবৈধ কল দ্রুত বাতিল।</li>
        <li><strong>Rate limiting</strong> — পরিচয় জানার পরে (প্রতি-ইউজার সীমা দিতে)।</li>
        <li><strong>Validation</strong> — সবার শেষে, হ্যান্ডলারের ঠিক আগে।</li>
      </ol>
      <p><strong>বাস্তব পরামর্শ:</strong> Node.js-এ <code>@grpc/grpc-js</code>-এর interceptor API তুলনামূলকভাবে অপরিণত এবং streaming-এ বিশেষভাবে ঝামেলার। <strong>NestJS ব্যবহার করলে</strong> তার নিজস্ব Guard, Interceptor ও Exception Filter gRPC ট্রান্সপোর্টেও কাজ করে — এবং সেগুলো unary ও streaming দুটোই সুন্দরভাবে সামলায়। এটিই সাধারণত সবচেয়ে ব্যবহারিক পথ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>দীর্ঘস্থায়ী স্ট্রিমে টোকেন মেয়াদোত্তীর্ণ হলে কী করবেন?</li>
        <li>Interceptor-এ ফেলা এরর ক্লায়েন্টে কীভাবে পৌঁছায়?</li>
      </ul>
    `
  },
  {
    id: "grpc-22",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Deadlines","Timeouts","Context"],
    question: "gRPC Deadlines / Timeouts এবং Cascading Cancellation কীভাবে সার্ভিস ক্যাস্কেডিং ফেইলিয়র প্রতিরোধ করে?",
    answer: `
      <p>gRPC-র <strong>deadline</strong> সাধারণ টাইমআউট থেকে মৌলিকভাবে আলাদা — এটি একটি নির্দিষ্ট <em>মুহূর্ত</em> (absolute point in time), এবং সবচেয়ে গুরুত্বপূর্ণ, এটি <strong>পুরো কল-চেইনে স্বয়ংক্রিয়ভাবে ছড়িয়ে পড়ে</strong>।</p>
      <pre class="mermaid">
flowchart LR
    C["Client<br/>deadline: 5s"] -->|"বাকি 5s"| A["Service A"]
    A -->|"বাকি 4.2s"| B["Service B"]
    B -->|"বাকি 3.1s"| D["Service C"]
    D -.->|"deadline পার হলে<br/>পুরো চেইন বাতিল"| X["❌ CANCELLED"]
      </pre>
      <span class="diagram-caption">Deadline চেইন বেয়ে যায় এবং বাকি সময় কমতে থাকে</span>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ক্লায়েন্ট — deadline একটি নির্দিষ্ট সময় (timeout নয়)
const deadline = new Date(Date.now() + 5000);
client.getOrder({ id: '123' }, { deadline }, (err, res) => {
  if (err && err.code === grpc.status.DEADLINE_EXCEEDED) {
    // সময় শেষ — সার্ভারও কাজ থামিয়ে দিয়েছে
  }
});

// সার্ভার — deadline পার হয়েছে কি না পরীক্ষা করুন
function getOrder(call, callback) {
  if (call.cancelled) return;                    // ক্লায়েন্ট চলে গেছে
  const remaining = call.getDeadline() - Date.now();
  if (remaining < 100) {
    return callback({ code: grpc.status.DEADLINE_EXCEEDED });
  }
  // ডাউনস্ট্রিম কলে অবশিষ্ট সময়ই পাস করুন
  downstream.fetch(req, { deadline: call.getDeadline() }, callback);
}</code></pre>
      </div>
      <h4>কেন এটি ক্যাসকেডিং ফেইলিওর ঠেকায়</h4>
      <p>সাধারণ টাইমআউটে প্রতিটি সার্ভিস নিজের মতো করে অপেক্ষা করে। ক্লায়েন্ট ৫ সেকেন্ড পর হাল ছেড়ে দিলেও <strong>সার্ভার চেইন কাজ করতেই থাকে</strong> — ডাটাবেজ কুয়েরি চলে, CPU পোড়ে, কানেকশন আটকে থাকে। ফলাফলটি কেউ পড়বে না, অথচ সম্পদ খরচ হচ্ছে।</p>
      <p>ভারী লোডে এটি মারাত্মক: সব রিকোয়েস্ট টাইমআউট করছে, কিন্তু সার্ভারগুলো পরিত্যক্ত কাজ করে যাচ্ছে — সিস্টেম নিজের ওজনে ধসে পড়ে (<em>metastable failure</em>)।</p>
      <p><strong>gRPC deadline এটি সমাধান করে:</strong> deadline পার হলে পুরো চেইন সাথে সাথে <code>CANCELLED</code> পায় এবং কাজ থামিয়ে সম্পদ মুক্ত করে দেয়।</p>
      <h4>বাস্তব নিয়ম</h4>
      <ul>
        <li><strong>প্রতিটি কলে deadline দিন।</strong> deadline ছাড়া gRPC কল অনন্তকাল ঝুলে থাকতে পারে — এটি সবচেয়ে সাধারণ প্রোডাকশন সমস্যা।</li>
        <li><strong>Deadline বাজেট ভাগ করুন:</strong> বাইরের ৫ সেকেন্ড থেকে ভেতরের প্রতিটি স্তর কম সময় পাবে, যাতে ব্যর্থতা ভেতর থেকে বাইরে আসে।</li>
        <li><strong>সার্ভারে <code>call.cancelled</code> পরীক্ষা করুন</strong> — দীর্ঘ লুপ বা ভারী কাজের মাঝে, যাতে অপ্রয়োজনীয় কাজ বন্ধ হয়।</li>
        <li><strong>Deadline ও রিট্রাই একসাথে সাবধানে:</strong> রিট্রাই মূল deadline-এর ভেতরেই হতে হবে, নাহলে অর্থহীন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Deadline-এর সঠিক মান কীভাবে নির্ধারণ করবেন?</li>
        <li>REST/HTTP-তে একই ধরনের প্রোপাগেশন কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-23",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Load Balancing","Client-Side LB","Lookaside LB"],
    question: "gRPC Load Balancing: Proxy Model vs Client-Side Load Balancing vs Lookaside LB (gRPC Name Resolver) কী?",
    answer: `
      <p>gRPC-তে লোড ব্যালেন্সিং <strong>কুখ্যাতভাবে কঠিন</strong>, এবং এর কারণ প্রোটোকলের নকশায়।</p>
      <h4>মূল সমস্যা</h4>
      <p>gRPC HTTP/2 ব্যবহার করে, যেখানে একটি TCP কানেকশনে <em>বহু</em> রিকোয়েস্ট multiplex হয়। একটি ঐতিহ্যবাহী L4 লোড ব্যালেন্সার <strong>কানেকশন</strong> ভাগ করে, রিকোয়েস্ট নয় — তাই ক্লায়েন্ট একবার একটি সার্ভারের সাথে যুক্ত হলে তার <em>সব</em> রিকোয়েস্ট সেখানেই যায়।</p>
      <p>ফলাফল: ১০টি ক্লায়েন্ট ও ১০টি সার্ভার থাকলেও ৩টি সার্ভারে সব ট্রাফিক জমে যেতে পারে, বাকি ৭টি নিষ্ক্রিয় থাকে। নতুন সার্ভার যোগ করলেও কেউ তার সাথে সংযোগই করে না।</p>
      <h4>তিনটি সমাধান</h4>
      <table>
        <tr><th>মডেল</th><th>কীভাবে</th><th>সুবিধা / অসুবিধা</th></tr>
        <tr><td><strong>Proxy (L7)</strong></td><td>Envoy/Nginx HTTP/2 বোঝে ও প্রতিটি <em>রিকোয়েস্ট</em> ভাগ করে</td><td>✅ সহজ, ক্লায়েন্ট কিছু জানে না<br/>❌ বাড়তি hop ও latency</td></tr>
        <tr><td><strong>Client-side</strong></td><td>ক্লায়েন্ট সব সার্ভারের ঠিকানা জানে ও নিজে ভাগ করে</td><td>✅ কোনো বাড়তি hop নেই, দ্রুততম<br/>❌ প্রতিটি ভাষায় লজিক লাগে, ক্লায়েন্ট মোটা হয়</td></tr>
        <tr><td><strong>Lookaside</strong></td><td>একটি আলাদা LB সার্ভিস ক্লায়েন্টকে বলে দেয় কোথায় পাঠাতে হবে</td><td>✅ কেন্দ্রীভূত বুদ্ধি + সরাসরি কানেকশন<br/>❌ অবকাঠামো জটিল (xDS)</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Client-side LB — DNS থেকে সব IP নিয়ে round_robin
const client = new OrderService(
  'dns:///order-service.default.svc.cluster.local:50051',
  grpc.credentials.createInsecure(),
  {
    'grpc.service_config': JSON.stringify({
      loadBalancingConfig: [{ round_robin: {} }]
    }),
    'grpc.keepalive_time_ms': 30000
  }
);
// ⚠️ 'dns:///' প্রিফিক্স জরুরি — এটি সব A রেকর্ড নেয়,
//    সাধারণ হোস্টনেম দিলে শুধু প্রথম IP-তেই সব যাবে</code></pre>
      </div>
      <h4>Kubernetes-এ যা ঘটে</h4>
      <p>k8s-এর সাধারণ <code>ClusterIP</code> সার্ভিস একটি L4 প্রক্সি — তাই <strong>gRPC-তে এটি লোড সমানভাবে ভাগ করে না</strong>। এটি একটি অত্যন্ত সাধারণ প্রোডাকশন সমস্যা। সমাধান:</p>
      <ul>
        <li><strong>Headless Service</strong> (<code>clusterIP: None</code>) + client-side <code>round_robin</code> — DNS সব পড-এর IP দেয়, ক্লায়েন্ট নিজে ভাগ করে।</li>
        <li><strong>Service mesh</strong> (Istio/Linkerd) — sidecar প্রক্সি L7-এ সঠিকভাবে ভাগ করে, অ্যাপ্লিকেশনে কোনো পরিবর্তন ছাড়াই।</li>
        <li><strong>gRPC-সচেতন ingress</strong> (Envoy, Contour)।</li>
      </ul>
      <p><strong>অতিরিক্ত সতর্কতা:</strong> <code>MAX_CONNECTION_AGE</code> সার্ভার-সাইডে সেট করুন। এতে কানেকশন পর্যায়ক্রমে বন্ধ হয়ে ক্লায়েন্ট আবার নতুন করে সংযোগ করে — নতুন যোগ হওয়া পড-গুলোও ট্রাফিক পেতে শুরু করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>দীর্ঘস্থায়ী স্ট্রিমিং RPC-তে লোড কীভাবে ভাগ করবেন?</li>
        <li>xDS প্রোটোকল কীভাবে lookaside LB সম্ভব করে?</li>
      </ul>
    `
  },
  {
    id: "grpc-24",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Metadata","Headers","Context"],
    question: "gRPC Metadata (metadata.MD) কী এবং কীভাবে Key-Value Pair হেডার প্রোপাগেট করা হয়?",
    answer: `
      <p><strong>Metadata</strong> হলো gRPC-র হেডার — key-value জোড়ার একটি সেট যা আসল মেসেজ পেলোডের <em>বাইরে</em> যায়। HTTP হেডারের সমতুল্য, এবং ভেতরে সেভাবেই বাস্তবায়িত।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ক্লায়েন্ট — মেটাডেটা পাঠানো
const metadata = new grpc.Metadata();
metadata.set('authorization', \`Bearer \${token}\`);
metadata.set('x-trace-id', traceId);
metadata.set('x-tenant-id', tenantId);

client.getOrder({ id: '123' }, metadata, (err, res) => { /* ... */ });

// সার্ভার — মেটাডেটা পড়া
function getOrder(call, callback) {
  const token    = call.metadata.get('authorization')[0];
  const traceId  = call.metadata.get('x-trace-id')[0];

  // রেসপন্স মেটাডেটা পাঠানো
  const responseMeta = new grpc.Metadata();
  responseMeta.set('x-server-id', process.env.HOSTNAME);
  call.sendMetadata(responseMeta);

  callback(null, order);
}</code></pre>
      </div>
      <h4>নিয়ম ও সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>কী সবসময় lowercase</strong> — gRPC নিজে ছোট হাতের অক্ষরে রূপান্তর করে।</li>
        <li><strong><code>-bin</code> সাফিক্স = বাইনারি মান।</strong> <code>x-payload-bin</code>-এ Buffer পাঠানো যায়; gRPC নিজে base64 এনকোড/ডিকোড করে। এই সাফিক্স ছাড়া মান অবশ্যই ASCII হতে হবে।</li>
        <li><strong><code>grpc-</code> দিয়ে শুরু হওয়া কী সংরক্ষিত</strong> (<code>grpc-status</code>, <code>grpc-timeout</code>) — নিজে ব্যবহার করবেন না।</li>
        <li><strong>একই কী-তে একাধিক মান</strong> থাকতে পারে, তাই <code>get()</code> একটি অ্যারে ফেরত দেয়।</li>
      </ul>
      <h4>Headers বনাম Trailers</h4>
      <p>gRPC-তে মেটাডেটা দুই জায়গায় পাঠানো যায়:</p>
      <ul>
        <li><strong>Headers:</strong> রেসপন্স শুরু হওয়ার <em>আগে</em> — যেমন <code>content-type</code>।</li>
        <li><strong>Trailers:</strong> রেসপন্স শেষ হওয়ার <em>পরে</em> — এখানেই <code>grpc-status</code> ও <code>grpc-message</code> যায়।</li>
      </ul>
      <p><strong>Trailer কেন দরকার:</strong> streaming RPC-তে সার্ভার মেসেজ পাঠাতে শুরু করার সময় এখনও জানে না কল সফল হবে কি না। Trailer তাকে <em>শেষে</em> চূড়ান্ত স্ট্যাটাস পাঠানোর সুযোগ দেয়। এটিই gRPC-র HTTP/2 নির্ভরতার একটি বড় কারণ — এবং ঠিক এই কারণেই ব্রাউজার সরাসরি gRPC পারে না (JavaScript-এ trailer পড়া যায় না)।</p>
      <h4>প্রোপাগেশন — সবচেয়ে গুরুত্বপূর্ণ ব্যবহার</h4>
      <p>মাইক্রোসার্ভিস চেইনে trace ID, tenant ID ও ইউজার কনটেক্সট মেটাডেটা দিয়ে পাস করা হয়। <strong>কিন্তু এটি স্বয়ংক্রিয় নয়</strong> — প্রতিটি সার্ভিসকে ইনকামিং মেটাডেটা পড়ে আউটগোয়িং কলে যোগ করতে হবে। এই কাজটি সাধারণত একটি interceptor-এ লেখা হয়, যাতে প্রতিটি হ্যান্ডলারে মনে রাখতে না হয়।</p>
      <p><strong>নিরাপত্তা:</strong> মেটাডেটা এনক্রিপ্ট করা নয় (TLS ছাড়া) এবং প্রায়ই লগ ও ট্রেসে চলে যায়। সংবেদনশীল তথ্য সেখানে রাখবেন না, এবং লগিং interceptor-এ <code>authorization</code> হেডার অবশ্যই মাস্ক করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মেটাডেটার আকারে কি কোনো সীমা আছে?</li>
        <li>OpenTelemetry কীভাবে মেটাডেটা ব্যবহার করে?</li>
      </ul>
    `
  },
  {
    id: "grpc-25",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf","Well-Known Types","Timestamp"],
    question: "Protobuf Well-Known Types (google.protobuf.Timestamp, Duration, Any, Empty, Struct) কী?",
    answer: `
      <p><strong>Well-Known Types</strong> হলো Google-এর সরবরাহ করা প্রমিত Protobuf টাইপ, যেগুলো সাধারণ প্রয়োজন মেটায় এবং সব ভাষার লাইব্রেরিতে বিশেষ সমর্থন পায়।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>import "google/protobuf/timestamp.proto";
import "google/protobuf/duration.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/field_mask.proto";
import "google/protobuf/struct.proto";

message Order {
  google.protobuf.Timestamp created_at  = 1;   // UTC সময়
  google.protobuf.Duration  ship_within = 2;   // সময়ের ব্যাপ্তি
  google.protobuf.Int32Value discount   = 3;   // nullable int
  google.protobuf.Struct metadata       = 4;   // যেকোনো JSON
}

service Health {
  rpc Ping(google.protobuf.Empty) returns (google.protobuf.Empty);
}</code></pre>
      </div>
      <table>
        <tr><th>টাইপ</th><th>সমাধান করে</th></tr>
        <tr><td><code>Timestamp</code></td><td>প্রমিত UTC সময় (seconds + nanos)। প্রতিটি টিমের নিজস্ব সময় ফরম্যাট তৈরি করা বন্ধ করে</td></tr>
        <tr><td><code>Duration</code></td><td>সময়ের ব্যাপ্তি — "কত সময়" বনাম "কোন মুহূর্ত" স্পষ্ট আলাদা</td></tr>
        <tr><td><code>Empty</code></td><td>কোনো প্যারামিটার বা রিটার্ন নেই — খালি message বানাতে হয় না</td></tr>
        <tr><td><code>Wrappers</code></td><td>proto3-এ nullable scalar (নিচে বিস্তারিত)</td></tr>
        <tr><td><code>FieldMask</code></td><td>আংশিক আপডেট/রেসপন্স</td></tr>
        <tr><td><code>Struct</code>/<code>Value</code></td><td>স্কিমাবিহীন ডায়নামিক JSON</td></tr>
        <tr><td><code>Any</code></td><td>যেকোনো message টাইপ ধারণ করা (টাইপ URL সহ)</td></tr>
      </table>
      <h4>Wrapper types কেন গুরুত্বপূর্ণ</h4>
      <p>proto3-তে <code>int32 discount = 3;</code> লিখলে ০ ও "সেট করা হয়নি" আলাদা করা যায় না। একটি আপডেট API-তে এটি মারাত্মক — ইউজার কি ডিসকাউন্ট ০ করতে চেয়েছে, নাকি ফিল্ডটি পাঠায়ইনি (অর্থাৎ অপরিবর্তিত রাখতে চেয়েছে)?</p>
      <p><code>Int32Value</code> একটি message হওয়ায় সেটি <em>অনুপস্থিত</em> থাকতে পারে — পার্থক্যটি স্পষ্ট হয়। (proto3.15+ এ <code>optional</code> কীওয়ার্ড একই কাজ আরও সহজে করে, এবং সাধারণত সেটিই পছন্দনীয়।)</p>
      <h4>সতর্কতা</h4>
      <ul>
        <li><strong><code>Any</code> এড়িয়ে চলুন</strong> যদি না সত্যিই দরকার হয় — এটি টাইপ নিরাপত্তা নষ্ট করে এবং রানটাইমে টাইপ যাচাই করতে হয়। <code>oneof</code> প্রায় সবসময় ভালো বিকল্প।</li>
        <li><strong><code>Struct</code> ব্যবহারে সংযম:</strong> এটি Protobuf-এর মূল সুবিধা (স্কিমা ও কম্প্যাক্ট এনকোডিং) হারিয়ে ফেলে — কার্যত JSON-ই পাঠাচ্ছেন। কেবল সত্যিকারের অজানা কাঠামোতে ব্যবহার করুন।</li>
        <li><code>Timestamp</code> সবসময় UTC — টাইমজোন তথ্য ধারণ করে না। প্রয়োজনে আলাদা ফিল্ডে টাইমজোন রাখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>টাকার পরিমাণের জন্য কোন টাইপ ব্যবহার করবেন?</li>
        <li><code>Any</code> ও <code>oneof</code>-এর মধ্যে কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "grpc-26",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Channel","Subchannel","Connection Pool"],
    question: "gRPC Channel, Subchannel এবং Connectivity States (IDLE, CONNECTING, READY, TRANSIENT_FAILURE, SHUTDOWN) কী?",
    answer: `
      <p>gRPC-তে <strong>Channel</strong> হলো একটি সার্ভারের সাথে যোগাযোগের ভার্চুয়াল কানেকশন — এটি ভেতরে এক বা একাধিক <strong>subchannel</strong> ব্যবস্থাপনা করে, যার প্রতিটি একটি প্রকৃত TCP কানেকশন।</p>
      <pre class="mermaid">
stateDiagram-v2
    [*] --> IDLE
    IDLE --> CONNECTING: প্রথম RPC এলো
    CONNECTING --> READY: কানেকশন সফল
    CONNECTING --> TRANSIENT_FAILURE: ব্যর্থ
    TRANSIENT_FAILURE --> CONNECTING: backoff শেষে আবার চেষ্টা
    READY --> IDLE: দীর্ঘ নিষ্ক্রিয়তা
    READY --> TRANSIENT_FAILURE: কানেকশন ছিঁড়ে গেল
    READY --> SHUTDOWN: channel.close()
      </pre>
      <span class="diagram-caption">Channel স্বয়ংক্রিয়ভাবে এই অবস্থাগুলোর মধ্যে চলাচল করে</span>
      <table>
        <tr><th>অবস্থা</th><th>অর্থ</th></tr>
        <tr><td><strong>IDLE</strong></td><td>কোনো কানেকশন নেই; প্রথম RPC এলে সংযোগ শুরু হবে (lazy)</td></tr>
        <tr><td><strong>CONNECTING</strong></td><td>TCP + TLS হ্যান্ডশেক চলছে</td></tr>
        <tr><td><strong>READY</strong></td><td>RPC পাঠানোর জন্য প্রস্তুত</td></tr>
        <tr><td><strong>TRANSIENT_FAILURE</strong></td><td>ব্যর্থ হয়েছে; backoff সহ পুনরায় চেষ্টা করবে</td></tr>
        <tr><td><strong>SHUTDOWN</strong></td><td>বন্ধ করা হয়েছে; আর ব্যবহারযোগ্য নয়</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ⚠️ Channel ব্যয়বহুল — অ্যাপ্লিকেশনে একবার তৈরি করে পুনর্ব্যবহার করুন
const client = new OrderService(address, credentials, {
  'grpc.keepalive_time_ms': 30000,
  'grpc.max_receive_message_length': 10 * 1024 * 1024
});

// অবস্থা পর্যবেক্ষণ
const state = client.getChannel().getConnectivityState(false);

// অবস্থা বদলালে জানুন
client.getChannel().watchConnectivityState(state, Infinity, () => {
  console.log('নতুন অবস্থা:', client.getChannel().getConnectivityState(false));
});

// অ্যাপ চালুর সময় আগেভাগে সংযোগ করুন — প্রথম RPC-র latency বাঁচে
client.waitForReady(Date.now() + 5000, (err) => { /* ... */ });</code></pre>
      </div>
      <h4>যে বিষয়গুলো ব্যবহারিকভাবে গুরুত্বপূর্ণ</h4>
      <ul>
        <li><strong>Channel পুনর্ব্যবহার করুন:</strong> প্রতিটি রিকোয়েস্টে নতুন client/channel তৈরি করা একটি সাধারণ ও ব্যয়বহুল ভুল — প্রতিবার TCP+TLS হ্যান্ডশেক হবে। অ্যাপ্লিকেশন চালুর সময় একবার তৈরি করে সর্বত্র শেয়ার করুন।</li>
        <li><strong>Channel থ্রেড-নিরাপদ</strong> এবং ভেতরে multiplexing করে — একটি channel দিয়েই হাজারো সমান্তরাল RPC চলে।</li>
        <li><strong>IDLE থেকে জাগতে সময় লাগে:</strong> দীর্ঘ নিষ্ক্রিয়তার পর প্রথম RPC-তে হ্যান্ডশেকের latency যোগ হয়। keepalive দিয়ে কানেকশন সজীব রাখা যায়।</li>
        <li><strong>TRANSIENT_FAILURE-এ RPC তাৎক্ষণিক ব্যর্থ হয়</strong> (<code>UNAVAILABLE</code>) — যদি না <code>waitForReady</code> সেট করা থাকে, তখন এটি deadline পর্যন্ত অপেক্ষা করে।</li>
      </ul>
      <p><strong>ডিবাগিং টিপ:</strong> মাঝে মাঝে <code>UNAVAILABLE</code> এরর দেখলে channel state পর্যবেক্ষণ করুন — এটি প্রায়ই বলে দেয় সমস্যা DNS-এ, নেটওয়ার্কে, নাকি সার্ভারের keepalive সেটিংয়ে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি channel-এ কতগুলো সমান্তরাল RPC চালানো যায়?</li>
        <li><code>waitForReady</code> কখন ব্যবহার করবেন, কখন নয়?</li>
      </ul>
    `
  },
  {
    id: "grpc-27",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Security","TLS","mTLS"],
    question: "gRPC Channel Security: Insecure vs TLS Credentials vs mTLS (Mutual TLS) কীভাবে কনফিগার করবেন?",
    answer: `
      <p>gRPC-তে নিরাপত্তা <strong>credentials</strong> দিয়ে কনফিগার করা হয়, এবং তিনটি স্তর আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Insecure — শুধু লোকাল ডেভেলপমেন্ট
const creds = grpc.credentials.createInsecure();

// 2. TLS — সার্ভার যাচাই (সবচেয়ে সাধারণ)
const creds = grpc.credentials.createSsl(
  fs.readFileSync('ca.pem')       // কাস্টম CA; পাবলিক CA হলে null
);

// 3. mTLS — উভয় পক্ষ যাচাই
const creds = grpc.credentials.createSsl(
  fs.readFileSync('ca.pem'),
  fs.readFileSync('client-key.pem'),
  fs.readFileSync('client-cert.pem')
);

// ---- সার্ভার ----
server.bindAsync('0.0.0.0:50051',
  grpc.ServerCredentials.createSsl(
    fs.readFileSync('ca.pem'),
    [{ private_key: fs.readFileSync('server-key.pem'),
       cert_chain:  fs.readFileSync('server-cert.pem') }],
    true      // ⚠️ true = ক্লায়েন্ট সার্টিফিকেট বাধ্যতামূলক (mTLS)
  ),
  callback
);</code></pre>
      </div>
      <h4>Channel credentials বনাম Call credentials</h4>
      <p>এটি gRPC-র একটি গুরুত্বপূর্ণ ধারণাগত পার্থক্য:</p>
      <ul>
        <li><strong>Channel credentials:</strong> ট্রান্সপোর্ট নিরাপত্তা — TLS/mTLS। পুরো কানেকশনে প্রযোজ্য।</li>
        <li><strong>Call credentials:</strong> প্রতি-কল পরিচয় — যেমন OAuth টোকেন। প্রতিটি RPC-তে আলাদা হতে পারে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// দুটি একত্র করা — TLS + প্রতি-কল টোকেন
const callCreds = grpc.credentials.createFromMetadataGenerator(
  (params, callback) => {
    const metadata = new grpc.Metadata();
    metadata.set('authorization', \`Bearer \${getToken()}\`);
    callback(null, metadata);
  }
);
const combined = grpc.credentials.combineChannelCredentials(
  grpc.credentials.createSsl(ca), callCreds
);</code></pre>
      </div>
      <p><strong>একটি গুরুত্বপূর্ণ নিরাপত্তা বৈশিষ্ট্য:</strong> gRPC <em>call credentials কেবল এনক্রিপ্টেড channel-এ পাঠাতে দেয়</em>। insecure channel-এ টোকেন যুক্ত করতে গেলে এরর হবে — এটি দুর্ঘটনাক্রমে প্লেইনটেক্সটে টোকেন ফাঁস হওয়া ঠেকায়।</p>
      <h4>বাস্তব পরামর্শ</h4>
      <ul>
        <li><strong>প্রোডাকশনে কখনও <code>createInsecure()</code> নয়</strong> — এমনকি প্রাইভেট নেটওয়ার্কেও নয়, কারণ zero-trust নীতিতে অভ্যন্তরীণ নেটওয়ার্কও বিশ্বস্ত নয়।</li>
        <li><strong>mTLS বনাম TLS + টোকেন:</strong> সার্ভিস-টু-সার্ভিসে mTLS আদর্শ (পরিচয় সার্টিফিকেটেই); ইউজার-ফেসিং কলে TLS + JWT সহজ ও নমনীয়।</li>
        <li><strong>Service mesh ব্যবহার করলে mTLS বিনামূল্যে</strong> — Istio/Linkerd সার্টিফিকেট তৈরি, বিতরণ ও আবর্তন স্বয়ংক্রিয়ভাবে করে। নিজে সার্টিফিকেট ব্যবস্থাপনা করা ভুলের সবচেয়ে বড় উৎস।</li>
        <li><strong>সার্টিফিকেট মেয়াদ পর্যবেক্ষণ করুন</strong> — মেয়াদোত্তীর্ণ হলে পুরো সার্ভিস-টু-সার্ভিস যোগাযোগ হঠাৎ বন্ধ হয়ে যাবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>লোড ব্যালেন্সারে TLS terminate করলে ভেতরে কী করবেন?</li>
        <li>সার্টিফিকেট আবর্তন ডাউনটাইম ছাড়া কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-28",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","Packages","Namespaces"],
    question: "Protobuf package, option go_package, option java_package কীভাবে নেমস্পেস কলিশন এড়ায়?",
    answer: `
      <p>Protobuf-এ <code>package</code> ও ভাষা-নির্দিষ্ট <code>option</code>-গুলো নেমস্পেস নিয়ন্ত্রণ করে — একটি বড় সংগঠনে যেখানে বহু টিম <code>.proto</code> ফাইল লেখে, সেখানে এগুলো ছাড়া নাম সংঘর্ষ অনিবার্য।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>syntax = "proto3";

// Protobuf-এর নিজস্ব নেমস্পেস — সব ভাষায় প্রযোজ্য
package acme.order.v1;

option go_package   = "github.com/acme/api/gen/order/v1;orderv1";
option java_package = "com.acme.api.order.v1";
option java_multiple_files = true;
option csharp_namespace = "Acme.Api.Order.V1";

message Order { string id = 1; }
service OrderService {
  rpc GetOrder(GetOrderRequest) returns (Order);
}</code></pre>
      </div>
      <h4><code>package</code> কী করে</h4>
      <p>এটি সব টাইপের পূর্ণ নাম নির্ধারণ করে — <code>acme.order.v1.Order</code>। এই পূর্ণ নামটিই gRPC মেথড পাথে ব্যবহৃত হয় (<code>/acme.order.v1.OrderService/GetOrder</code>) এবং <code>Any</code> টাইপে টাইপ URL হিসেবে যায়।</p>
      <p>দুটি ভিন্ন টিম যদি দুটি <code>Order</code> message লেখে, ভিন্ন package থাকলে কোনো সংঘর্ষ হয় না — এবং একটি ফাইলে দুটিই import করা যায়।</p>
      <h4>ভার্সন নেমস্পেসে রাখা কেন গুরুত্বপূর্ণ</h4>
      <p><code>acme.order.<strong>v1</strong></code> — এই <code>v1</code> অংশটি অত্যন্ত মূল্যবান। যখন একটি সত্যিকারের breaking change দরকার হবে (যা মাঝে মাঝে অনিবার্য), তখন <code>v2</code> package তৈরি করে <strong>দুটি সংস্করণ পাশাপাশি চালানো যায়</strong>। পুরনো ক্লায়েন্ট v1 ব্যবহার করতে থাকবে, নতুনরা v2-তে যাবে, এবং ধীরে ধীরে মাইগ্রেশন সম্পন্ন হবে।</p>
      <p>ভার্সন ছাড়া package দিলে breaking change-এর একমাত্র উপায় হয় সবাইকে একসাথে আপডেট করানো — যা বাস্তবে অসম্ভব।</p>
      <h4>ভাষা-নির্দিষ্ট option কেন আলাদা</h4>
      <p>প্রতিটি ভাষার নিজস্ব নেমস্পেস কনভেনশন আছে — Go-তে মডিউল পাথ, Java-তে reverse-domain, C#-এ PascalCase। এই option-গুলো না দিলে জেনারেটর <code>package</code> থেকে অনুমান করে, যা প্রায়ই ভাষার কনভেনশন ভাঙে বা সংঘর্ষ তৈরি করে।</p>
      <ul>
        <li><strong><code>go_package</code>:</strong> সেমিকোলনের আগে import পাথ, পরে প্যাকেজ alias। এটি না দিলে Go কোড জেনারেশন প্রায়ই ব্যর্থ হয় বা ভুল import তৈরি করে।</li>
        <li><strong><code>java_multiple_files = true</code>:</strong> প্রতিটি message আলাদা ফাইলে যাবে; না দিলে সব একটি বিশাল outer class-এর ভেতরে নেস্টেড হয়।</li>
      </ul>
      <p><strong>ডিরেক্টরি কাঠামোও মেলান:</strong> <code>proto/acme/order/v1/order.proto</code> — package ও ফাইল পাথ মিললে import পাথ পূর্বানুমেয় থাকে এবং <code>buf</code>-এর lint নিয়মও এটি প্রত্যাশা করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>v1 থেকে v2-তে মাইগ্রেশন কীভাবে পরিচালনা করবেন?</li>
        <li>একই সার্ভারে দুটি ভার্সন চালানো সম্ভব কি?</li>
      </ul>
    `
  },
  {
    id: "grpc-29",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf","oneof","Unions"],
    question: "Protobuf oneof Keyword কীভাবে C-style Unions বা Polymorphic Values অফার করে?",
    answer: `
      <p><code>oneof</code> দিয়ে একটি message-এ কয়েকটি ফিল্ডের মধ্যে <strong>যেকোনো একটি</strong> সেট করার নিয়ম প্রয়োগ করা যায় — অনেকটা C-র union বা TypeScript-এর discriminated union-এর মতো।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>message PaymentMethod {
  string user_id = 1;

  oneof method {
    CreditCard   card         = 2;
    BankAccount  bank         = 3;
    MobileWallet mobile_wallet = 4;
  }
}

message SearchResult {
  oneof result {
    Product product = 1;
    Article article = 2;
    Video   video   = 3;
  }
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// জেনারেট হওয়া কোডে কোনটি সেট আছে তা জানার উপায় থাকে
switch (payment.method) {          // @grpc/grpc-js-এ ফিল্ডের নাম
  case 'card':          return chargeCard(payment.card);
  case 'bank':          return debitBank(payment.bank);
  case 'mobile_wallet': return chargeWallet(payment.mobile_wallet);
  default:
    throw new Error('কোনো পেমেন্ট পদ্ধতি দেওয়া হয়নি');
}</code></pre>
      </div>
      <h4>মূল বৈশিষ্ট্য</h4>
      <ul>
        <li><strong>স্বয়ংক্রিয় পারস্পরিক বর্জন:</strong> একটি ফিল্ড সেট করলে আগেরটি <em>আপনাআপনি মুছে যায়</em>। অ্যাপ্লিকেশন কোডে ভ্যালিডেশন লাগে না।</li>
        <li><strong>মেমরি সাশ্রয়:</strong> সব ফিল্ডের জন্য জায়গা বরাদ্দ হয় না, শুধু সক্রিয়টির জন্য।</li>
        <li><strong>"কোনটি সেট" জানা যায়:</strong> জেনারেট হওয়া কোডে একটি <code>case</code>/<code>which</code> মেথড থাকে — এটিই <code>oneof</code>-এর সবচেয়ে বড় সুবিধা, কারণ proto3-এ সাধারণ ফিল্ডে এই তথ্য পাওয়া যায় না।</li>
      </ul>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong><code>repeated</code> ফিল্ড <code>oneof</code>-এ রাখা যায় না।</strong> দরকার হলে সেটিকে একটি message-এ মুড়ে নিন।</li>
        <li><code>oneof</code>-এর ভেতরে <code>map</code>-ও রাখা যায় না।</li>
        <li>সব ফিল্ড ঐচ্ছিক — কোনোটিই সেট না থাকা বৈধ, তাই ভ্যালিডেশন এখনও লাগে।</li>
      </ul>
      <h4>বিবর্তনে সতর্কতা</h4>
      <p><code>oneof</code>-এ নতুন ফিল্ড যোগ করা নিরাপদ, কিন্তু <strong>একটি বিদ্যমান ফিল্ডকে <code>oneof</code>-এর ভেতরে সরানো বা বাইরে আনা wire-compatible নয়</strong> — এটি একটি ভাঙা পরিবর্তন। তাই শুরুতেই ঠিক করে নিন।</p>
      <p><strong>বাস্তব ব্যবহার:</strong> API রেসপন্সে "সফল ফল অথবা এরর", polymorphic ইভেন্ট (একটি টপিকে বিভিন্ন ধরনের ইভেন্ট), এবং বিভিন্ন ধরনের ইনপুট গ্রহণকারী এন্ডপয়েন্ট — এসব ক্ষেত্রে <code>oneof</code> কোডকে অনেক টাইপ-নিরাপদ করে তোলে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>oneof</code> ব্যবহার না করে একই কাজ করলে কী কী সমস্যা হতো?</li>
        <li>একটি <code>oneof</code>-এ কোনো ফিল্ডই সেট না থাকলে কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-30",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Code Generation","protoc","Plugins"],
    question: "protoc Compiler and gRPC Plugins (protoc-gen-go, protoc-gen-ts) কীভাবে কাজ করে?",
    answer: `
      <p><code>protoc</code> হলো Protocol Buffers কম্পাইলার। এটি নিজে কোনো কোড তৈরি করে না — এটি <code>.proto</code> ফাইল পার্স করে একটি <strong>descriptor</strong> তৈরি করে এবং সেটি প্লাগইনে পাঠায়। প্রকৃত কোড জেনারেশন প্লাগইনই করে।</p>
      <pre class="mermaid">
flowchart LR
    P[".proto ফাইল"] --> C["protoc<br/>পার্স ও যাচাই"]
    C -->|"CodeGeneratorRequest<br/>(descriptor)"| PL1["protoc-gen-go"]
    C --> PL2["protoc-gen-ts"]
    C --> PL3["protoc-gen-grpc-web"]
    PL1 --> O1["order.pb.go"]
    PL2 --> O2["order_pb.d.ts"]
    PL3 --> O3["order_grpc_web_pb.js"]
      </pre>
      <span class="diagram-caption">একটি প্লাগইন আর্কিটেকচার — যেকোনো ভাষার সাপোর্ট যোগ করা যায়</span>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># Node.js / TypeScript-এর জন্য
protoc \\
  --proto_path=./proto \\
  --js_out=import_style=commonjs,binary:./gen \\
  --grpc_out=grpc_js:./gen \\
  --ts_out=./gen \\
  ./proto/acme/order/v1/order.proto

# ⚠️ প্লাগইন PATH-এ থাকতে হবে:
# protoc খোঁজে "protoc-gen-<name>" নামের এক্সিকিউটেবল
# --foo_out দিলে সে protoc-gen-foo খুঁজবে</code></pre>
      </div>
      <h4>প্লাগইন কীভাবে কাজ করে</h4>
      <p>protoc প্লাগইনকে stdin-এ একটি সিরিয়ালাইজড <code>CodeGeneratorRequest</code> পাঠায় এবং stdout-এ <code>CodeGeneratorResponse</code> প্রত্যাশা করে। এটি একটি অত্যন্ত সরল কন্ট্রাক্ট — <strong>যেকোনো ভাষায় নিজের প্লাগইন লেখা যায়</strong>, শুধু Protobuf পড়তে-লিখতে পারলেই হলো।</p>
      <p>এই নকশার কারণেই Protobuf ইকোসিস্টেমে ভ্যালিডেশন, ডকুমেন্টেশন, ORM ম্যাপিং ইত্যাদির জন্য শত শত কমিউনিটি প্লাগইন আছে।</p>
      <h4>Node.js-এর দুটি পথ</h4>
      <ul>
        <li><strong>Static codegen (<code>protoc</code>):</strong> আগে থেকে কোড তৈরি করে রাখা। দ্রুত স্টার্টআপ, TypeScript টাইপ পাওয়া যায় — প্রোডাকশনের জন্য প্রস্তাবিত।</li>
        <li><strong>Dynamic loading (<code>@grpc/proto-loader</code>):</strong> রানটাইমে <code>.proto</code> পড়ে অবজেক্ট তৈরি করা। কোনো বিল্ড স্টেপ লাগে না, দ্রুত প্রোটোটাইপিংয়ে সুবিধাজনক — কিন্তু টাইপ নিরাপত্তা নেই এবং স্টার্টআপে সময় লাগে।</li>
      </ul>
      <h4>বাস্তব পরামর্শ</h4>
      <p><code>protoc</code>-এর কমান্ড লাইন দ্রুতই দুর্বোধ্য শেল স্ক্রিপ্টে পরিণত হয়, এবং প্লাগইনের সংস্করণ মেলানো ভোগান্তির কারণ। <strong>নতুন প্রজেক্টে <code>buf generate</code> ব্যবহার করুন</strong> — এটি YAML কনফিগে সব প্লাগইন সংজ্ঞায়িত করতে দেয়, remote প্লাগইন সাপোর্ট করে (স্থানীয় ইনস্টল লাগে না), এবং import পাথ নিজেই সামলায়।</p>
      <p><strong>জেনারেট হওয়া কোড কি Git-এ রাখবেন?</strong> দুটি মতই প্রচলিত। কমিট করলে CI সহজ ও বিল্ড দ্রুত হয়; না করলে merge conflict এড়ানো যায় কিন্তু প্রতিটি বিল্ডে টুলচেইন লাগে। ছোট টিমে কমিট করাই ব্যবহারিক।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Monorepo-তে একাধিক ভাষার codegen কীভাবে সংগঠিত করবেন?</li>
        <li>জেনারেট হওয়া কোড আপ-টু-ডেট আছে কি না CI-তে কীভাবে যাচাই করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-31",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Performance","Compression","gzip"],
    question: "gRPC Message Compression (gzip, deflate, snappy) কীভাবে সক্রিয় করবেন?",
    answer: `
      <p>gRPC মেসেজ-স্তরে কম্প্রেশন সমর্থন করে, যা বড় পেলোডে উল্লেখযোগ্য ব্যান্ডউইথ সাশ্রয় করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- সার্ভার: কম্প্রেশন সক্রিয় করা ----
const server = new grpc.Server({
  'grpc.default_compression_algorithm': 2,   // 0=none, 1=deflate, 2=gzip
  'grpc.default_compression_level': 2        // 0=none,1=low,2=medium,3=high
});

// ---- ক্লায়েন্ট: প্রতি-কল কম্প্রেশন ----
const metadata = new grpc.Metadata();
metadata.set('grpc-encoding', 'gzip');
client.uploadReport({ data: bigPayload }, metadata, callback);

// অথবা channel-স্তরে ডিফল্ট
const client = new ReportService(addr, creds, {
  'grpc.default_compression_algorithm': 2
});</code></pre>
      </div>
      <h4>কীভাবে আলোচনা হয়</h4>
      <p>ক্লায়েন্ট <code>grpc-accept-encoding</code> হেডারে জানায় সে কোন অ্যালগরিদম বোঝে; সার্ভার <code>grpc-encoding</code>-এ জানায় সে কোনটি ব্যবহার করেছে। <strong>দুই দিকে ভিন্ন কম্প্রেশন ব্যবহার করা সম্পূর্ণ বৈধ</strong> — যেমন ক্লায়েন্ট কম্প্রেস না করে পাঠাল, কিন্তু সার্ভার কম্প্রেস করে উত্তর দিল।</p>
      <h4>কখন কম্প্রেশন লাভজনক নয়</h4>
      <ul>
        <li><strong>ছোট মেসেজে (&lt;১ KB):</strong> কম্প্রেশনের CPU খরচ ও হেডার ওভারহেড লাভের চেয়ে বেশি। কখনও কখনও আকার <em>বেড়েও</em> যায়।</li>
        <li><strong>Protobuf ইতিমধ্যেই কম্প্যাক্ট:</strong> JSON-এর মতো পুনরাবৃত্তিমূলক টেক্সট না থাকায় কম্প্রেশন অনুপাত JSON-এর তুলনায় কম হয়।</li>
        <li><strong>ইতিমধ্যে কম্প্রেসড ডেটা</strong> (ছবি, ভিডিও, zip) — অর্থহীন।</li>
        <li><strong>অত্যন্ত low-latency পথে:</strong> কম্প্রেশন/ডিকম্প্রেশনের সময় যোগ হয়।</li>
      </ul>
      <p><strong>কোথায় সত্যিই লাভ:</strong> বড় <code>repeated</code> ফিল্ড (হাজারো রেকর্ডের তালিকা), লম্বা স্ট্রিং ফিল্ড (HTML, লগ, বর্ণনা), এবং ব্যয়বহুল বা ধীর নেটওয়ার্ক (আন্তঃঅঞ্চল, মোবাইল)।</p>
      <h4>নিরাপত্তা সতর্কতা</h4>
      <p>এনক্রিপ্টেড কানেকশনে কম্প্রেশন ব্যবহার করলে <strong>CRIME/BREACH ধরনের আক্রমণের ঝুঁকি</strong> থাকে — আক্রমণকারী পেলোডের আকার পর্যবেক্ষণ করে গোপন তথ্য (টোকেন) অনুমান করতে পারে, যদি একই মেসেজে ইউজার-নিয়ন্ত্রিত ডেটা ও গোপন তথ্য একসাথে থাকে। সংবেদনশীল ফিল্ড ও ইউজার ইনপুট একই কম্প্রেসড মেসেজে না রাখাই নিরাপদ।</p>
      <p><strong>একটি DoS বিবেচনা:</strong> <code>grpc.max_receive_message_length</code> সেট করুন — নাহলে ক্ষুদ্র একটি কম্প্রেসড পেলোড ডিকম্প্রেস হয়ে বিশাল হয়ে মেমরি শেষ করে দিতে পারে (zip bomb)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কম্প্রেশন সত্যিই কাজ করছে কি না কীভাবে যাচাই করবেন?</li>
        <li>Kafka-র মতো ব্যাচ কম্প্রেশন gRPC-তে সম্ভব কি?</li>
      </ul>
    `
  },
  {
    id: "grpc-32",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Errors","Status","Details"],
    question: "gRPC Error Details (google.rpc.ErrorInfo, BadRequest, RetryInfo) কীভাবে সমৃদ্ধ এরর পাঠায়?",
    answer: `
      <p>শুধু status code ও একটি টেক্সট মেসেজ প্রায়ই যথেষ্ট নয় — ক্লায়েন্টের প্রায়ই <em>কাঠামোবদ্ধ</em> তথ্য দরকার হয়: কোন ফিল্ডটি ভুল, কতক্ষণ পরে রিট্রাই করা যাবে, কোন কোটা শেষ হয়েছে।</p>
      <p><strong>Rich Error Model</strong> এই সমস্যার সমাধান — <code>google.rpc.Status</code>-এর <code>details</code> ফিল্ডে টাইপযুক্ত মেসেজ পাঠানো হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>// google/rpc/error_details.proto থেকে
message BadRequest {
  message FieldViolation {
    string field       = 1;    // "user.email"
    string description = 2;    // "ইমেইল ফরম্যাট সঠিক নয়"
  }
  repeated FieldViolation field_violations = 1;
}

message RetryInfo   { google.protobuf.Duration retry_delay = 1; }
message QuotaFailure { /* কোন কোটা, কত সীমা */ }
message ErrorInfo   { string reason = 1; string domain = 2;
                      map&lt;string, string&gt; metadata = 3; }</code></pre>
      </div>
      <h4>প্রতিটি টাইপ কোন সমস্যার সমাধান</h4>
      <ul>
        <li><strong><code>BadRequest</code>:</strong> ফর্ম ভ্যালিডেশন — ফ্রন্টএন্ড ঠিক কোন ইনপুট ফিল্ডের নিচে কোন এরর দেখাবে তা জানতে পারে। এটি ছাড়া "invalid input" মেসেজ দিয়ে ইউজারকে সাহায্য করা যায় না।</li>
        <li><strong><code>RetryInfo</code>:</strong> সার্ভার <em>নিজে</em> বলে দেয় কতক্ষণ অপেক্ষা করতে হবে। ক্লায়েন্টের অনুমান করার দরকার নেই — HTTP-র <code>Retry-After</code>-এর সমতুল্য।</li>
        <li><strong><code>QuotaFailure</code>:</strong> কোন কোটা, কত সীমা, কখন রিসেট হবে।</li>
        <li><strong><code>ErrorInfo</code>:</strong> একটি স্থিতিশীল, মেশিন-পাঠযোগ্য <code>reason</code> (যেমন <code>"INSUFFICIENT_BALANCE"</code>)। <strong>এটি সবচেয়ে গুরুত্বপূর্ণ</strong> — ক্লায়েন্ট এটির উপর লজিক লিখতে পারে, এরর মেসেজের টেক্সট পার্স না করে (যা অনুবাদ বা সংশোধনে ভেঙে যায়)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// সার্ভারে — details বাইনারি এনকোড করে metadata-তে পাঠানো হয়
const metadata = new grpc.Metadata();
metadata.set('grpc-status-details-bin', encodedStatusDetails);

callback({
  code: grpc.status.INVALID_ARGUMENT,
  message: 'ভ্যালিডেশন ব্যর্থ',
  metadata
});</code></pre>
      </div>
      <h4>ব্যবহারিক নোট</h4>
      <ul>
        <li>Go ও Java-তে এর সাপোর্ট চমৎকার (<code>status.WithDetails</code>)। <strong>Node.js-এ এটি ম্যানুয়ালি এনকোড/ডিকোড করতে হয়</strong> — <code>grpc-status-details-bin</code> মেটাডেটায় একটি সিরিয়ালাইজড <code>google.rpc.Status</code> রাখতে হয়। কিছুটা ঝামেলার।</li>
        <li><strong>বিকল্প (এবং প্রায়ই ব্যবহারিক):</strong> নিজের <code>.proto</code>-তে একটি কাস্টম error message টাইপ সংজ্ঞায়িত করে সেটি সাধারণ ফিল্ড হিসেবে ব্যবহার করা।</li>
        <li><strong>নিরাপত্তা:</strong> details-এ ভেতরের বিবরণ (স্ট্যাক ট্রেস, SQL, অভ্যন্তরীণ আইডি) দেবেন না।</li>
      </ul>
      <p><strong>মূল নীতি:</strong> <code>reason</code> কোড দিন যা কখনও বদলাবে না, এবং মানুষের পড়ার মেসেজ আলাদা রাখুন। ক্লায়েন্ট কোড-এর উপর সিদ্ধান্ত নেবে, মেসেজ শুধু দেখাবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>এরর মেসেজ বহুভাষিক করতে হলে কী করবেন?</li>
        <li>REST API-তে একই ধরনের কাঠামোবদ্ধ এরর কীভাবে দেবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-33",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Web","gRPC-Web","Envoy Proxy"],
    question: "Browser JavaScript থেকে gRPC ডাকতে gRPC-Web এবং Envoy Proxy কেন প্রয়োজন?",
    answer: `
      <p>ব্রাউজার থেকে সরাসরি gRPC কল <strong>প্রযুক্তিগতভাবে অসম্ভব</strong>, এবং এর কারণ ব্রাউজারের API-র সীমাবদ্ধতা।</p>
      <h4>তিনটি মৌলিক বাধা</h4>
      <ol>
        <li><strong>Trailer পড়া যায় না:</strong> gRPC চূড়ান্ত স্ট্যাটাস (<code>grpc-status</code>) HTTP/2 <em>trailer</em>-এ পাঠায়। ব্রাউজারের <code>fetch</code> বা <code>XMLHttpRequest</code>-এ trailer পড়ার কোনো API নেই।</li>
        <li><strong>HTTP/2 ফ্রেমে নিয়ন্ত্রণ নেই:</strong> gRPC-র স্ট্রিমিংয়ের জন্য ফ্রেম-স্তরের নিয়ন্ত্রণ দরকার; ব্রাউজার সেটি JavaScript-এ দেয় না।</li>
        <li><strong>প্রোটোকল নির্বাচনে নিয়ন্ত্রণ নেই:</strong> ব্রাউজার নিজেই ঠিক করে HTTP/1.1 না HTTP/2 ব্যবহার করবে।</li>
      </ol>
      <h4>সমাধানের গঠন</h4>
      <pre class="mermaid">
flowchart LR
    B["Browser<br/>grpc-web client"] -->|"gRPC-Web<br/>trailer বডির শেষে"| E["Envoy<br/>grpc_web filter"]
    E -->|"প্রকৃত gRPC<br/>HTTP/2 + trailer"| S["gRPC Server"]
    S --> E --> B
      </pre>
      <span class="diagram-caption">Envoy দুই প্রোটোকলের মধ্যে অনুবাদ করে</span>
      <p>gRPC-Web প্রোটোকল trailer-কে <strong>রেসপন্স বডির শেষে</strong> এনকোড করে রাখে — যা ব্রাউজার সাধারণভাবে পড়তে পারে। Envoy সেই ফরম্যাটকে প্রকৃত gRPC-তে অনুবাদ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { OrderServiceClient } from './generated/order_grpc_web_pb';
const client = new OrderServiceClient('https://api.example.com');

client.getOrder(req, { authorization: \`Bearer \${token}\` }, (err, res) => {
  if (err) console.error(err.code, err.message);
  else console.log(res.toObject());
});</code></pre>
      </div>
      <h4>Envoy কেন, Nginx নয়</h4>
      <p>Envoy-তে <code>envoy.filters.http.grpc_web</code> ফিল্টার বিল্ট-ইন এবং পরিণত। Nginx-এর ওপেন-সোর্স সংস্করণে gRPC-Web অনুবাদ নেই (<code>grpc_pass</code> আছে, কিন্তু সেটি gRPC-Web নয়)। বিকল্প হিসেবে <code>grpcwebproxy</code> নামের একটি হালকা Go প্রক্সিও ব্যবহার করা যায়।</p>
      <h4>বাস্তব সিদ্ধান্ত</h4>
      <p>এই সব জটিলতার কারণে বেশিরভাগ প্রোডাকশন আর্কিটেকচারে <strong>ব্রাউজারের জন্য REST/GraphQL এবং ভেতরে gRPC</strong> রাখা হয়। একটি BFF স্তর অনুবাদের কাজটি করে, এবং সেখানে ব্যবসায়িক যুক্তি (একাধিক সার্ভিসের ডেটা একত্র করা) যোগ করার সুযোগও থাকে।</p>
      <p><strong>আধুনিক বিকল্প — Connect:</strong> Buf-এর <code>connect-web</code> একই <code>.proto</code> থেকে ব্রাউজার-বান্ধব ক্লায়েন্ট তৈরি করে এবং সার্ভার একই পোর্টে gRPC, gRPC-Web ও সাধারণ HTTP/JSON তিনটিই সাপোর্ট করে — <strong>কোনো প্রক্সি ছাড়াই</strong>। নতুন প্রজেক্টে ব্রাউজার সাপোর্ট দরকার হলে এটি গুরুত্ব সহকারে বিবেচনা করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>gRPC-Web-এ কোন streaming মোডগুলো কাজ করে না?</li>
        <li>BFF স্তর যোগ করলে কী কী সুবিধা পাওয়া যায়?</li>
      </ul>
    `
  },
  {
    id: "grpc-34",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","repeated","Arrays"],
    question: "Protobuf repeated fields (packed=true) কীভাবে অ্যারে স্টোর করে?",
    answer: `
      <p>Protobuf-এ <code>repeated</code> কীওয়ার্ড একটি অ্যারে বা তালিকা নির্দেশ করে। কিন্তু সংখ্যাসূচক টাইপে এটি কীভাবে এনকোড হয় তা পারফরম্যান্সে বড় পার্থক্য গড়ে।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>message Order {
  repeated int64  product_ids = 1;   // proto3-এ স্বয়ংক্রিয়ভাবে packed
  repeated string tags        = 2;    // string কখনও packed হয় না
  repeated Item   items       = 3;    // message-ও packed হয় না
}</code></pre>
      </div>
      <h4>Packed বনাম Unpacked</h4>
      <p><strong>Unpacked (পুরনো proto2 ডিফল্ট):</strong> প্রতিটি এলিমেন্টের জন্য আলাদা করে tag ও মান লেখা হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[tag][value][tag][value][tag][value]   ← প্রতিটি এলিমেন্টে tag পুনরাবৃত্তি

Packed:
[tag][মোট দৈর্ঘ্য][value][value][value]   ← tag একবারই</code></pre>
      </div>
      <p>১০০০টি <code>int64</code>-এর একটি তালিকায় unpacked-এ ১০০০টি অতিরিক্ত tag বাইট যায়। Packed-এ যায় মাত্র একটি tag ও একটি দৈর্ঘ্য — <strong>উল্লেখযোগ্য সাশ্রয়</strong>, বিশেষত ছোট সংখ্যার বড় তালিকায়।</p>
      <h4>proto3-এ যা জানা জরুরি</h4>
      <ul>
        <li><strong>proto3-এ scalar numeric ও enum টাইপে packing ডিফল্টে চালু</strong> — <code>[packed=true]</code> লেখার দরকার নেই। (proto2-তে স্পষ্টভাবে লিখতে হতো।)</li>
        <li><strong><code>string</code>, <code>bytes</code> ও <code>message</code> কখনও packed হয় না</strong> — কারণ এগুলো ইতিমধ্যেই দৈর্ঘ্য-প্রিফিক্সযুক্ত, packing-এ কোনো লাভ নেই।</li>
        <li><strong>পার্সার উভয় ফরম্যাটই গ্রহণ করে</strong> — তাই packed ↔ unpacked পরিবর্তন wire-compatible, ভাঙা পরিবর্তন নয়।</li>
      </ul>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>বড় তালিকায় সতর্কতা:</strong> লক্ষ লক্ষ এলিমেন্টের <code>repeated</code> ফিল্ড একটি বিশাল মেসেজ তৈরি করে, যা মেমরি চাপ ও <code>max_receive_message_length</code> সীমা অতিক্রমের ঝুঁকি তৈরি করে। এমন ক্ষেত্রে <strong>server streaming ব্যবহার করুন</strong> — একটি বিশাল মেসেজের বদলে অনেকগুলো ছোট মেসেজ।</li>
        <li><strong>খালি তালিকা ও অনুপস্থিত তালিকা আলাদা করা যায় না</strong> — proto3-এ দুটিই খালি অ্যারে হিসেবে আসে।</li>
        <li>ফিল্ড নম্বর ১-১৫ একটি বাইটে এনকোড হয়, ১৬+ দুই বাইটে। তাই <strong>সবচেয়ে বেশি ব্যবহৃত ও repeated ফিল্ডগুলোকে ১-১৫ নম্বরে রাখুন</strong> — বড় তালিকায় এটি লক্ষণীয় সাশ্রয় দেয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>খুব বড় তালিকা পাঠাতে হলে কোন কৌশল নেবেন?</li>
        <li><code>repeated</code> ফিল্ডে ক্রম কি সংরক্ষিত থাকে?</li>
      </ul>
    `
  },
  {
    id: "grpc-35",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Testing","grpcurl","Mocking"],
    question: "grpcurl Tool দিয়ে cURL-এর মতো gRPC এন্ডপয়েন্ট টার্মিনাল থেকে কীভাবে টেস্ট করবেন?",
    answer: `
      <p><code>grpcurl</code> হলো gRPC-র জন্য <code>curl</code>-এর সমতুল্য — টার্মিনাল থেকে gRPC এন্ডপয়েন্ট পরীক্ষা করার প্রধান টুল।</p>
      <p>gRPC বাইনারি প্রোটোকল হওয়ায় সাধারণ <code>curl</code> দিয়ে কল করা যায় না। <code>grpcurl</code> JSON ইনপুট নিয়ে Protobuf-এ রূপান্তর করে, এবং উত্তরকে আবার JSON-এ ফিরিয়ে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ইনস্টল
brew install grpcurl        # macOS

# সব সার্ভিস তালিকা (reflection দরকার)
grpcurl -plaintext localhost:50051 list

# মেথড ও স্কিমা দেখা
grpcurl -plaintext localhost:50051 describe acme.order.v1.OrderService
grpcurl -plaintext localhost:50051 describe .acme.order.v1.Order

# কল করা
grpcurl -plaintext -d '{"id":"123"}' \\
  localhost:50051 acme.order.v1.OrderService/GetOrder

# হেডার সহ, TLS-এ
grpcurl -H "authorization: Bearer $TOKEN" -d '{"id":"123"}' \\
  api.example.com:443 acme.order.v1.OrderService/GetOrder

# reflection বন্ধ থাকলে .proto দিন
grpcurl -import-path ./proto -proto order.proto \\
  -d '{"id":"123"}' localhost:50051 acme.order.v1.OrderService/GetOrder

# streaming — একাধিক মেসেজ পাঠানো
grpcurl -d @ localhost:50051 acme.order.v1.OrderService/UploadOrders &lt;&lt;EOF
{"id":"1"}
{"id":"2"}
EOF

# ভার্বোস — হেডার ও trailer দেখতে
grpcurl -v -plaintext -d '{"id":"123"}' localhost:50051 ...</code></pre>
      </div>
      <h4>দরকারি ফ্ল্যাগ</h4>
      <ul>
        <li><code>-plaintext</code> — TLS ছাড়া (লোকাল ডেভেলপমেন্টে)।</li>
        <li><code>-insecure</code> — TLS ব্যবহার করবে কিন্তু সার্টিফিকেট যাচাই করবে না (স্ব-স্বাক্ষরিত সার্টিফিকেটে)।</li>
        <li><code>-d @</code> — stdin থেকে ইনপুট, streaming-এ প্রয়োজন।</li>
        <li><code>-format-error</code> — এররের বিস্তারিত JSON-এ দেখায়।</li>
        <li><code>-max-time</code> — deadline সেট করা।</li>
      </ul>
      <h4>ব্যবহারিক প্রয়োগ</h4>
      <ul>
        <li><strong>স্মোক টেস্ট:</strong> ডিপ্লয়ের পর CI-তে একটি <code>grpcurl</code> কল দিয়ে সার্ভিস সাড়া দিচ্ছে কি না যাচাই করা।</li>
        <li><strong>প্রোডাকশন ডিবাগিং:</strong> ক্লায়েন্ট কোড না লিখেই একটি নির্দিষ্ট রিকোয়েস্ট পুনরুৎপাদন করা।</li>
        <li><strong>API অন্বেষণ:</strong> <code>describe</code> দিয়ে অন্য টিমের সার্ভিসের স্কিমা বোঝা, <code>.proto</code> ফাইল না খুঁজেই।</li>
        <li><strong>Health check:</strong> <code>grpcurl -plaintext localhost:50051 grpc.health.v1.Health/Check</code></li>
      </ul>
      <p><strong>বিকল্প টুল:</strong> <code>grpcui</code> একই reflection ব্যবহার করে ব্রাউজারে Postman-সদৃশ UI দেয় — ফর্ম পূরণ করে কল করা যায়, যা জটিল নেস্টেড মেসেজে অনেক সহজ। <code>evans</code> একটি ইন্টারঅ্যাকটিভ REPL দেয়।</p>
      <p><strong>মনে রাখবেন:</strong> reflection বন্ধ থাকলে (প্রোডাকশনে যা সাধারণ) <code>-proto</code> দিয়ে ফাইল দিতে হবে — তাই <code>.proto</code> ফাইলগুলো হাতের কাছে রাখুন বা BSR থেকে নিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>mTLS-সুরক্ষিত এন্ডপয়েন্টে grpcurl কীভাবে ব্যবহার করবেন?</li>
        <li>gRPC এন্ডপয়েন্টের লোড টেস্ট কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-36",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","enum","Zero Value"],
    question: "Protobuf Enum Design Best Practice: 0-Index UNSPECIFIED Value কেন রাখা আবশ্যক?",
    answer: `
      <p>Protobuf-এ প্রতিটি enum-এর <strong>প্রথম মান অবশ্যই ০ হতে হবে</strong> (proto3-এর নিয়ম), এবং সেই ০-মানটির নাম <code>UNSPECIFIED</code> রাখা একটি অত্যন্ত গুরুত্বপূর্ণ ডিজাইন প্র্যাকটিস।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ খারাপ — PENDING হয়ে গেল ডিফল্ট
enum OrderStatus {
  PENDING   = 0;
  SHIPPED   = 1;
  DELIVERED = 2;
}

// ✅ ভালো
enum OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0;   // "মান দেওয়া হয়নি"
  ORDER_STATUS_PENDING     = 1;
  ORDER_STATUS_SHIPPED     = 2;
  ORDER_STATUS_DELIVERED   = 3;
}</code></pre>
      </div>
      <h4>কেন এটি এত গুরুত্বপূর্ণ</h4>
      <p>proto3-এ ডিফল্ট মান <strong>wire-এ পাঠানোই হয় না</strong> (জায়গা বাঁচাতে)। অর্থাৎ ফিল্ডটি সম্পূর্ণ অনুপস্থিত থাকলেও গ্রাহক ০-মানটিই পড়বে।</p>
      <p>প্রথম উদাহরণে <code>PENDING = 0</code> হওয়ায় — কেউ যদি স্ট্যাটাস <em>সেট করতেই ভুলে যায়</em>, তবুও গ্রাহক দেখবে "PENDING"। বাগ ও বৈধ ডেটার মধ্যে পার্থক্য করার কোনো উপায় থাকবে না।</p>
      <p><code>UNSPECIFIED = 0</code> রাখলে এটি স্পষ্টভাবে বোঝায় "এই ফিল্ডে কিছু দেওয়া হয়নি" — এবং সার্ভার সেটি ভ্যালিডেশনে ধরে ফেলতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>if (req.status === OrderStatus.ORDER_STATUS_UNSPECIFIED) {
  return callback({
    code: grpc.status.INVALID_ARGUMENT,
    message: 'status ফিল্ড আবশ্যক'
  });
}</code></pre>
      </div>
      <h4>নামকরণে প্রিফিক্স কেন</h4>
      <p><code>ORDER_STATUS_PENDING</code>-এর মতো প্রিফিক্স দেওয়া হয় কারণ <strong>Protobuf-এ enum মানগুলো enum-এর নয়, তার প্যারেন্ট স্কোপের অন্তর্ভুক্ত</strong> (C++-এর নিয়ম অনুসরণ করে)। প্রিফিক্স ছাড়া একই ফাইলে দুটি enum-এ <code>ACTIVE</code> থাকলে নাম সংঘর্ষ হবে এবং কম্পাইল ব্যর্থ হবে।</p>
      <h4>Enum বিবর্তনের নিয়ম</h4>
      <ul>
        <li><strong>নতুন মান যোগ করা নিরাপদ</strong> — কিন্তু পুরনো ক্লায়েন্ট সেটি চিনবে না। তাই ক্লায়েন্ট কোডে <em>অজানা মান</em> সামলানোর ব্যবস্থা রাখুন (<code>default</code> কেস), নাহলে ক্র্যাশ করবে।</li>
        <li><strong>মান মুছে ফেললে <code>reserved</code> করুন</strong> — নম্বর পুনর্ব্যবহার হলে নীরব ডেটা করাপশন হবে।</li>
        <li><strong>নাম বদলানো wire-এ নিরাপদ</strong> (শুধু নম্বর যায়), কিন্তু কোড ভাঙবে।</li>
        <li><code>allow_alias = true</code> দিয়ে একই নম্বরে একাধিক নাম দেওয়া যায় — নাম পরিবর্তনের সময় সাময়িকভাবে কাজে লাগে।</li>
      </ul>
      <p><strong>একই যুক্তি অন্য ফিল্ডেও:</strong> proto3-এ <code>bool is_active = 1;</code> ফিল্ডে <code>false</code> ও "সেট করা হয়নি" আলাদা করা যায় না। এই পার্থক্য দরকার হলে <code>optional bool</code> বা <code>google.protobuf.BoolValue</code> ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ক্লায়েন্ট অজানা enum মান পেলে কী করা উচিত?</li>
        <li>proto2-তে enum-এর আচরণ কীভাবে আলাদা ছিল?</li>
      </ul>
    `
  },
  {
    id: "grpc-37",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Resilience","Retry Policy","Hedging"],
    question: "gRPC Native Service Config: Auto Retry Policy এবং Hedged Requests কীভাবে কাজ করে?",
    answer: `
      <p>gRPC-তে রিট্রাই ও hedging <strong>অ্যাপ্লিকেশন কোডে নয়, service config-এ</strong> ঘোষণামূলকভাবে কনফিগার করা যায় — এবং gRPC লাইব্রেরি নিজেই সেটি প্রয়োগ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const serviceConfig = {
  methodConfig: [{
    name: [{ service: 'order.OrderService', method: 'GetOrder' }],

    retryPolicy: {
      maxAttempts: 4,
      initialBackoff: '0.1s',
      maxBackoff: '5s',
      backoffMultiplier: 2,
      // ⚠️ শুধু নিরাপদ কোডে রিট্রাই — INVALID_ARGUMENT কখনও নয়
      retryableStatusCodes: ['UNAVAILABLE', 'RESOURCE_EXHAUSTED']
    }
  }]
};

const client = new OrderService(addr, creds, {
  'grpc.service_config': JSON.stringify(serviceConfig),
  'grpc.enable_retries': 1
});</code></pre>
      </div>
      <h4>Hedging — ভিন্ন কৌশল</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>hedgingPolicy: {
  maxAttempts: 3,
  hedgingDelay: '0.5s',      // 500ms পরেও উত্তর না এলে আরেকটি পাঠাও
  nonFatalStatusCodes: ['UNAVAILABLE']
}
// ⚠️ retryPolicy ও hedgingPolicy একসাথে দেওয়া যায় না</code></pre>
      </div>
      <table>
        <tr><th>দিক</th><th>Retry</th><th>Hedging</th></tr>
        <tr><td>কখন চালু হয়</td><td>কল <em>ব্যর্থ</em> হলে</td><td>কল <em>ধীর</em> হলে (এখনও ব্যর্থ নয়)</td></tr>
        <tr><td>সমাধান করে</td><td>ক্ষণস্থায়ী ব্যর্থতা</td><td><strong>Tail latency</strong> (p99)</td></tr>
        <tr><td>লোড</td><td>সামান্য বাড়ে</td><td>বেশি বাড়ে (একাধিক সমান্তরাল কল)</td></tr>
        <tr><td>প্রয়োজন</td><td>—</td><td>অবশ্যই <strong>idempotent</strong></td></tr>
      </table>
      <p><strong>Hedging কেন কার্যকর:</strong> ডিস্ট্রিবিউটেড সিস্টেমে কিছু রিকোয়েস্ট এলোমেলোভাবে ধীর হয় (GC pause, ঠান্ডা ক্যাশ, নয়েজি নেইবার)। ব্যর্থতার অপেক্ষা না করে ৫০০ms পরেই আরেকটি রেপ্লিকায় সমান্তরাল রিকোয়েস্ট পাঠিয়ে <em>যেটি আগে আসে</em> সেটি নেওয়া হয় — p99 latency নাটকীয়ভাবে কমে।</p>
      <p><strong>খরচ:</strong> কিছু রিকোয়েস্ট দুবার প্রসেস হবে। তাই কেবল <em>read</em> ও idempotent অপারেশনে ব্যবহার করুন — এবং লোড বৃদ্ধির হিসাব রাখুন।</p>
      <h4>gRPC-র বিল্ট-ইন সুরক্ষা</h4>
      <ul>
        <li><strong>Retry throttling:</strong> gRPC একটি টোকেন বাজেট রাখে — ব্যর্থতার হার বেশি হলে রিট্রাই নিজে থেকেই বন্ধ করে দেয়। এটি retry storm প্রতিরোধ করে।</li>
        <li><strong>Deadline সম্মান করে:</strong> সব রিট্রাই মূল deadline-এর ভেতরেই হয়।</li>
        <li><strong>Backoff-এ jitter</strong> অন্তর্ভুক্ত।</li>
      </ul>
      <p><strong>কেন কোডে না লিখে config-এ:</strong> সব ভাষার ক্লায়েন্টে একই আচরণ পাওয়া যায়, নীতি কেন্দ্রীভূতভাবে বদলানো যায় (এমনকি xDS দিয়ে রানটাইমে), এবং ডেভেলপারদের প্রতিটি কল সাইটে রিট্রাই লজিক লিখতে হয় না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Non-idempotent কলে রিট্রাই কীভাবে নিরাপদ করবেন?</li>
        <li>Hedging কখন ক্ষতিকর হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "grpc-38",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","map","Dictionary"],
    question: "Protobuf map<key_type, value_type> Syntax কীভাবে ডিকশনারি স্টোর করে?",
    answer: `
      <p>Protobuf-এ <code>map&lt;key_type, value_type&gt;</code> দিয়ে ডিকশনারি বা key-value জোড়া সংরক্ষণ করা হয় — যেখানে কী-গুলো আগে থেকে জানা নেই (যেমন ইউজারভিত্তিক স্কোর, ডায়নামিক লেবেল, সেটিংস)।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>syntax = "proto3";

message PlayerStats {
  string player_id = 1;
  map&lt;string, int32&gt; scores = 2;       // level নাম → স্কোর
  map&lt;string, string&gt; attributes = 3;  // ডায়নামিক মেটাডেটা
}</code></pre>
      </div>
      <h4>নিয়ম ও সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Key অবশ্যই primitive:</strong> integer বা string হতে হবে। float, bytes, enum বা message কী হিসেবে চলবে না।</li>
        <li><strong>Value যেকোনো টাইপ:</strong> scalar, enum, এমনকি নেস্টেড message হতে পারে — তবে আরেকটি map হতে পারে না।</li>
        <li><strong>ক্রম সংরক্ষিত হয় না:</strong> map-এর এন্ট্রির ক্রম অনির্দিষ্ট। ক্রম দরকার হলে <code>repeated</code> ব্যবহার করুন।</li>
        <li><strong>repeated হতে পারে না:</strong> <code>repeated map</code> অবৈধ। প্রয়োজনে map-কে একটি message-এ মুড়ে সেটিকে repeated করুন।</li>
      </ul>
      <h4>ভেতরে আসলে কী ঘটে</h4>
      <p>Protobuf map মূলত <em>সিনট্যাক্টিক সুগার</em>। কম্পাইলার এটিকে ভেতরে একটি repeated message-এ রূপান্তর করে:</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>// map&lt;string, int32&gt; scores = 2;  আসলে এর সমতুল্য:
message ScoresEntry {
  string key = 1;
  int32 value = 2;
}
repeated ScoresEntry scores = 2;</code></pre>
      </div>
      <p>এজন্যই wire format-এ কোনো পার্থক্য নেই এবং map ফিল্ড যোগ করা backward compatible থাকে। একই কী একাধিকবার এলে <strong>শেষেরটি জেতে</strong>।</p>
      <h4>কখন map ব্যবহার করবেন না</h4>
      <p>কী-গুলো যদি আগে থেকেই জানা ও স্থির হয় (যেমন <code>name</code>, <code>email</code>), তখন map নয় — স্পষ্ট ফিল্ড ব্যবহার করুন। স্পষ্ট ফিল্ড টাইপ-নিরাপদ, ভ্যালিডেট করা সহজ এবং কম জায়গা নেয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>map ফিল্ডে "অনুপস্থিত" এবং "ডিফল্ট মান" কীভাবে আলাদা করবেন?</li>
        <li>map-এর বদলে <code>google.protobuf.Struct</code> কখন ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-39",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Architecture","REST vs gRPC","Benchmark"],
    question: "REST (JSON over HTTP/1.1) vs gRPC (Protobuf over HTTP/2)-এর পারফরম্যান্স বেঞ্চমার্ক তুলনা কী?",
    answer: `
      <p>gRPC বনাম REST-এর পারফরম্যান্স তুলনায় প্রায়ই অতিরঞ্জিত দাবি করা হয়। বাস্তব চিত্রটি আরও সূক্ষ্ম।</p>
      <h4>কোথায় gRPC সত্যিই দ্রুত</h4>
      <table>
        <tr><th>দিক</th><th>REST (JSON/HTTP1.1)</th><th>gRPC (Protobuf/HTTP2)</th></tr>
        <tr><td>পেলোড আকার</td><td>বেসলাইন</td><td>৩০-৫০% (কম্প্রেশনের আগে)</td></tr>
        <tr><td>সিরিয়ালাইজেশন CPU</td><td>ধীর (টেক্সট পার্সিং)</td><td><strong>৫-১০× দ্রুত</strong></td></tr>
        <tr><td>কানেকশন</td><td>প্রতি ডোমেইনে সীমিত</td><td>একটিতে multiplexed</td></tr>
        <tr><td>Streaming</td><td>সীমিত (SSE)</td><td>নেটিভ, দ্বিমুখী</td></tr>
        <tr><td>থ্রুপুট (উচ্চ QPS)</td><td>বেসলাইন</td><td>প্রায়ই <strong>২-৫×</strong></td></tr>
      </table>
      <p><strong>সবচেয়ে বড় লাভ আসলে সিরিয়ালাইজেশনে</strong>, নেটওয়ার্কে নয়। JSON পার্সিং CPU-নিবিড় — স্ট্রিং স্ক্যান, escape হ্যান্ডলিং, টাইপ অনুমান। Protobuf সরাসরি বাইট পড়ে স্ট্রাক্টে বসায়। উচ্চ QPS-এ এটি CPU খরচে বিশাল পার্থক্য গড়ে।</p>
      <h4>যেখানে দাবিগুলো অতিরঞ্জিত</h4>
      <ul>
        <li><strong>"gRPC ১০ গুণ দ্রুত" প্রায়ই বিভ্রান্তিকর</strong> — এটি সাধারণত সিরিয়ালাইজেশন বেঞ্চমার্ক, end-to-end latency নয়। বাস্তবে বেশিরভাগ API-র সময় যায় <em>ডাটাবেজ কুয়েরিতে</em>, সিরিয়ালাইজেশনে নয়। ৫ms DB কুয়েরির পাশে ০.১ms বনাম ০.৫ms সিরিয়ালাইজেশনের পার্থক্য অর্থহীন।</li>
        <li><strong>gzip করা JSON-এর সাথে আকারের পার্থক্য অনেক কমে যায়</strong> — কারণ JSON-এর পুনরাবৃত্তিমূলক কী-নাম চমৎকারভাবে কম্প্রেস হয়।</li>
        <li><strong>HTTP/2-র সুবিধা REST-ও পেতে পারে</strong> — REST over HTTP/2 সম্পূর্ণ সম্ভব, তখন multiplexing ও হেডার কম্প্রেশন সেখানেও পাওয়া যায়।</li>
      </ul>
      <h4>কখন gRPC বেছে নেওয়া যুক্তিযুক্ত</h4>
      <ul>
        <li>ইন্টারনাল সার্ভিস-টু-সার্ভিস, বিশেষত <strong>উচ্চ QPS</strong> বা <strong>chatty</strong> যোগাযোগে।</li>
        <li><strong>Streaming</strong> দরকার — এখানে gRPC-র সুবিধা স্পষ্ট ও অনস্বীকার্য।</li>
        <li><strong>কড়া কন্ট্রাক্ট ও কোড জেনারেশন</strong> — বহু টিম ও বহু ভাষায় এটি সবচেয়ে বড় ব্যবহারিক সুবিধা, পারফরম্যান্সের চেয়েও বেশি।</li>
        <li>মোবাইল ক্লায়েন্টে ব্যান্ডউইথ ও ব্যাটারি সাশ্রয়।</li>
      </ul>
      <h4>কখন REST-ই ভালো</h4>
      <ul>
        <li>পাবলিক API — সবাই REST বোঝে, কোনো টুলিং লাগে না।</li>
        <li>ব্রাউজার ক্লায়েন্ট (gRPC-Web-এর জটিলতা এড়াতে)।</li>
        <li>ডিবাগিং ও অন্বেষণ সহজ (curl, browser DevTools)।</li>
        <li>কম ট্রাফিকের CRUD সার্ভিস — যেখানে পারফরম্যান্স পার্থক্য অদৃশ্য।</li>
      </ul>
      <p><strong>সৎ উপসংহার:</strong> gRPC বেছে নিন <em>টাইপ নিরাপত্তা, কোড জেনারেশন ও streaming</em>-এর জন্য; পারফরম্যান্স একটি চমৎকার বোনাস। কেবল "দ্রুত" শোনার কারণে REST থেকে gRPC-তে মাইগ্রেট করা প্রায়ই ভুল সিদ্ধান্ত — আগে প্রোফাইল করে দেখুন সময়টা আসলে কোথায় যাচ্ছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>আপনার API-তে সিরিয়ালাইজেশন কত শতাংশ সময় নেয় — কীভাবে মাপবেন?</li>
        <li>REST over HTTP/2 কি gRPC-র বিকল্প হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "grpc-40",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","Import","Proto Path"],
    question: "Protobuf import \"other.proto\" এবং proto_path দিয়ে ফাইল অর্গানাইজেশন কীভাবে করবেন?",
    answer: `
      <p>বড় প্রজেক্টে <code>.proto</code> ফাইল একাধিক ফাইলে ভাগ করে <code>import</code> দিয়ে যুক্ত করা হয়। কিন্তু import পাথ ঠিক করাই <code>protoc</code>-এর সবচেয়ে বিরক্তিকর অংশ।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>// proto/acme/common/v1/money.proto
package acme.common.v1;
message Money { string currency = 1; int64 amount_minor = 2; }

// proto/acme/order/v1/order.proto
package acme.order.v1;

import "acme/common/v1/money.proto";      // proto_path থেকে আপেক্ষিক
import "google/protobuf/timestamp.proto";

message Order {
  string id = 1;
  acme.common.v1.Money total = 2;          // পূর্ণ নাম দিয়ে ব্যবহার
  google.protobuf.Timestamp created_at = 3;
}</code></pre>
      </div>
      <h4>মূল নিয়ম</h4>
      <p><strong>Import পাথ সবসময় <code>--proto_path</code> (বা <code>-I</code>) থেকে আপেক্ষিক</strong> — ফাইল সিস্টেমের আপেক্ষিক পাথ নয়। এটিই সবচেয়ে বড় বিভ্রান্তির উৎস।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>protoc --proto_path=./proto \\
       --go_out=./gen \\
       ./proto/acme/order/v1/order.proto

# proto_path=./proto হওয়ায় import লিখতে হবে:
#   "acme/common/v1/money.proto"     ✅
# এভাবে নয়:
#   "../common/v1/money.proto"       ❌
#   "./proto/acme/common/v1/money.proto"  ❌</code></pre>
      </div>
      <p><strong>নিয়ম:</strong> ডিরেক্টরি কাঠামো <code>package</code> নামের সাথে মেলান। <code>package acme.order.v1</code> → ফাইল <code>proto/acme/order/v1/order.proto</code>। তাহলে import পাথ সবসময় পূর্বানুমেয় থাকে।</p>
      <h4>Public import</h4>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>import public "acme/common/v1/money.proto";
// যে ফাইল এটিকে import করবে, সে-ও Money সরাসরি পাবে
// — ফাইল রিফ্যাক্টর করার সময় পশ্চাৎ-সঙ্গতি রাখতে কাজে লাগে</code></pre>
      </div>
      <h4>নির্ভরতা ব্যবস্থাপনার সমস্যা</h4>
      <p><code>google/protobuf/timestamp.proto</code>-র মতো ফাইল কোথা থেকে আসবে? <code>protoc</code> সেগুলো নিজের সাথে বান্ডল করে রাখে, কিন্তু <code>googleapis/annotations.proto</code>-র মতো থার্ড-পার্টি ফাইল <strong>হাতে ডাউনলোড করে রিপোতে কপি করতে হয়</strong> — এবং সেগুলো আপডেট রাখা কেউ মনে রাখে না।</p>
      <p><strong>এখানেই <code>buf</code>-এর সবচেয়ে বড় সুবিধা:</strong></p>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># buf.yaml — npm-এর মতো নির্ভরতা ব্যবস্থাপনা
version: v2
deps:
  - buf.build/googleapis/googleapis
  - buf.build/grpc-ecosystem/grpc-gateway
# buf dep update → buf.lock তৈরি হয় (package-lock.json-এর মতো)</code></pre>
      </div>
      <p>কোনো ফাইল কপি করতে হয় না, সংস্করণ lock করা থাকে, এবং import পাথ <code>buf</code> নিজেই সামলায়।</p>
      <h4>সংগঠনের পরামর্শ</h4>
      <ul>
        <li><strong>শেয়ার্ড টাইপ আলাদা package-এ:</strong> <code>acme.common.v1</code>-এ Money, Address, Pagination ইত্যাদি — একাধিক সার্ভিস এগুলো ব্যবহার করবে।</li>
        <li><strong>বৃত্তাকার import এড়ান</strong> — protoc এটি প্রত্যাখ্যান করে।</li>
        <li><strong>একটি ফাইলে একটি সার্ভিস</strong> রাখলে পরিবর্তন ট্র্যাক করা ও রিভিউ করা সহজ হয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>শেয়ার্ড <code>.proto</code> ফাইল একাধিক রিপোর মধ্যে কীভাবে শেয়ার করবেন?</li>
        <li>Common package-এ breaking change হলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "grpc-41",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Gateway","OpenAPI","protoc-gen-openapiv2"],
    question: "grpc-gateway দিয়ে automatic Swagger / OpenAPI Schema Generator কীভাবে সক্রিয় করবেন?",
    answer: `
      <p>grpc-gateway-র <code>protoc-gen-openapiv2</code> প্লাগইন একই <code>.proto</code> ফাইল ও তার HTTP annotation থেকে <strong>OpenAPI (Swagger) স্পেসিফিকেশন</strong> তৈরি করে।</p>
      <p>এতে REST API-র ডকুমেন্টেশন <em>স্বয়ংক্রিয়ভাবে</em> কোডের সাথে সিঙ্ক থাকে — হাতে লেখা ডকুমেন্টেশনের মতো পুরনো হয়ে যায় না।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>import "protoc-gen-openapiv2/options/annotations.proto";

option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
  info: { title: "Order API"; version: "1.0"; }
  security_definitions: {
    security: { key: "Bearer";
      value: { type: TYPE_API_KEY; in: IN_HEADER; name: "Authorization" } }
  }
};

service OrderService {
  rpc GetOrder(GetOrderRequest) returns (Order) {
    option (google.api.http) = { get: "/v1/orders/{id}" };
    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
      summary: "একটি অর্ডার আনুন"
      description: "আইডি দিয়ে অর্ডারের বিস্তারিত তথ্য"
      responses: { key: "404"
        value: { description: "অর্ডার পাওয়া যায়নি" } }
    };
  }
}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>protoc -I . \\
  --openapiv2_out=./docs \\
  --openapiv2_opt=allow_merge=true,merge_file_name=api \\
  proto/acme/order/v1/order.proto
# → docs/api.swagger.json</code></pre>
      </div>
      <h4>যা পাওয়া যায়</h4>
      <ul>
        <li><strong>Swagger UI:</strong> ব্রাউজারে ইন্টারঅ্যাকটিভ ডকুমেন্টেশন — ডেভেলপাররা সরাসরি API পরীক্ষা করতে পারেন।</li>
        <li><strong>ক্লায়েন্ট SDK জেনারেশন:</strong> OpenAPI Generator দিয়ে যেকোনো ভাষার REST ক্লায়েন্ট তৈরি করা যায় — যারা gRPC ব্যবহার করতে চায় না তাদের জন্য।</li>
        <li><strong>API গভর্নেন্স:</strong> স্পেসিফিকেশন CI-তে যাচাই করা, breaking change ধরা।</li>
        <li><strong>Postman/Insomnia-তে import</strong> করা যায়।</li>
      </ul>
      <h4>সীমাবদ্ধতা ও বাস্তবতা</h4>
      <ul>
        <li><strong>Annotation বাড়তে থাকলে <code>.proto</code> ফাইল ভারী হয়ে যায়</strong> — কোথায় সার্ভিস সংজ্ঞা আর কোথায় ডকুমেন্টেশন তা আলাদা করা কঠিন হয়। সংযমের সাথে ব্যবহার করুন।</li>
        <li><strong>OpenAPI 2 (Swagger)</strong> — প্লাগইনটি মূলত v2 তৈরি করে; OpenAPI 3-এর সাপোর্ট সীমিত।</li>
        <li><strong>Streaming ম্যাপ হয় না ভালোভাবে</strong> — REST-এ streaming-এর সমতুল্য নেই।</li>
        <li>Go-কেন্দ্রিক টুলচেইন; Node.js প্রজেক্টে এটি ব্যবহার করতে হলে বিল্ড পাইপলাইনে Go টুল যোগ করতে হয়।</li>
      </ul>
      <p><strong>মূল মূল্য:</strong> একটি সত্যের উৎস। <code>.proto</code> থেকেই তৈরি হয় সার্ভার স্টাব, ক্লায়েন্ট কোড, REST gateway এবং API ডকুমেন্টেশন — চারটি জিনিস কখনও একে অপরের সাথে অসামঞ্জস্যপূর্ণ হতে পারে না। হাতে রক্ষণাবেক্ষণ করা ডকুমেন্টেশনের তুলনায় এটি বিশাল উন্নতি।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Node.js প্রজেক্টে API ডকুমেন্টেশনের বিকল্প কী?</li>
        <li>OpenAPI স্পেসিফিকেশন CI-তে কীভাবে যাচাই করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-42",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Context","Call Options","Header Injection"],
    question: "gRPC Call Options (Header, Trailer, MaxRecvMsgSize) কীভাবে সেট করবেন?",
    answer: `
      <p>Call options দিয়ে প্রতিটি RPC কলের আচরণ সূক্ষ্মভাবে নিয়ন্ত্রণ করা যায় — deadline, মেসেজ সাইজ, হেডার ও trailer অ্যাক্সেস।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- Channel-স্তরে সীমা ----
const client = new ReportService(addr, creds, {
  'grpc.max_receive_message_length': 16 * 1024 * 1024,  // 16 MB (ডিফল্ট 4 MB)
  'grpc.max_send_message_length': 8 * 1024 * 1024
});

// ---- প্রতি-কল অপশন ----
const call = client.getReport(
  { id: '123' },
  metadata,
  { deadline: new Date(Date.now() + 10000) },
  (err, res) => { /* ... */ }
);

// রেসপন্স হেডার (রেসপন্সের আগে আসে)
call.on('metadata', (md) => {
  console.log('সার্ভার:', md.get('x-server-id')[0]);
});

// Trailer (কল শেষে আসে — এখানেই grpc-status থাকে)
call.on('status', (status) => {
  console.log('স্ট্যাটাস:', status.code, status.details);
});</code></pre>
      </div>
      <h4><code>max_receive_message_length</code> — সবচেয়ে বেশি সমস্যা করা সেটিং</h4>
      <p>gRPC-র ডিফল্ট সীমা <strong>৪ MB</strong>। এর চেয়ে বড় রেসপন্স এলে কল ব্যর্থ হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>RESOURCE_EXHAUSTED: Received message larger than max (5242880 vs. 4194304)</code></pre>
      </div>
      <p><strong>দুই দিকেই সেট করতে হবে</strong> — ক্লায়েন্টে <code>max_receive</code> এবং সার্ভারে <code>max_send</code>। একদিকে বাড়ালে অন্যদিক এখনও আটকাবে, যা ডিবাগ করা বিভ্রান্তিকর।</p>
      <h4>কিন্তু সীমা বাড়ানোই কি সঠিক সমাধান?</h4>
      <p>সাধারণত <strong>না</strong>। বড় মেসেজের তিনটি সমস্যা:</p>
      <ul>
        <li><strong>মেমরি স্পাইক:</strong> পুরো মেসেজ একসাথে মেমরিতে জমা হয়। ১০০ সমান্তরাল কলে ১৬ MB করে মানে ১.৬ GB।</li>
        <li><strong>Head-of-line blocking:</strong> একটি বিশাল মেসেজ কানেকশন আটকে রাখে।</li>
        <li><strong>DoS ঝুঁকি:</strong> সীমাহীন করলে একটি ক্লায়েন্ট বিশাল পেলোড পাঠিয়ে সার্ভারের মেমরি শেষ করতে পারে।</li>
      </ul>
      <p><strong>সঠিক সমাধান — server streaming:</strong> একটি ১০০ MB তালিকা পাঠানোর বদলে ছোট ছোট চাঙ্কে স্ট্রিম করুন। মেমরি ব্যবহার স্থির থাকে, ক্লায়েন্ট ধীরে ধীরে প্রসেস করতে পারে, এবং HTTP/2-র flow control স্বয়ংক্রিয়ভাবে backpressure দেয়।</p>
      <h4>অন্যান্য দরকারি অপশন</h4>
      <ul>
        <li><code>grpc.max_concurrent_streams</code> — সার্ভারে একটি কানেকশনে সর্বোচ্চ সমান্তরাল RPC।</li>
        <li><code>grpc.initial_reconnect_backoff_ms</code> — পুনঃসংযোগের গতি।</li>
        <li><code>waitForReady</code> — channel প্রস্তুত না থাকলে সাথে সাথে ব্যর্থ না হয়ে অপেক্ষা করা।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>বড় ফাইল আপলোড gRPC দিয়ে কীভাবে করবেন?</li>
        <li>Streaming-এ প্রতিটি চাঙ্কের আদর্শ আকার কত?</li>
      </ul>
    `
  },
  {
    id: "grpc-43",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Keepalive","Client Parameters","PermitWithoutStream"],
    question: "gRPC Keepalive Client Parameters: Time, Timeout, and PermitWithoutStream টিউন কীভাবে করবেন?",
    answer: `
      <p>Keepalive ping gRPC-কে জানায় কানেকশনটি এখনও জীবিত কি না। এটি বিশেষভাবে গুরুত্বপূর্ণ কারণ <strong>মাঝখানের নেটওয়ার্ক ডিভাইস (NAT, লোড ব্যালেন্সার, ফায়ারওয়াল) নীরবে নিষ্ক্রিয় কানেকশন কেটে দেয়</strong> — কোনো পক্ষকে না জানিয়ে।</p>
      <p>এই "half-open" কানেকশনে RPC পাঠালে সেটি টাইমআউট না হওয়া পর্যন্ত ঝুলে থাকে। Keepalive এই মৃত কানেকশন দ্রুত শনাক্ত করে বাদ দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- ক্লায়েন্ট ----
const client = new OrderService(addr, creds, {
  'grpc.keepalive_time_ms': 30000,            // প্রতি 30s এ ping
  'grpc.keepalive_timeout_ms': 10000,         // ping-এর উত্তরের অপেক্ষা
  'grpc.keepalive_permit_without_calls': 1,   // RPC না থাকলেও ping পাঠাও
  'grpc.http2.max_pings_without_data': 0      // সীমাহীন
});

// ---- সার্ভার ----
const server = new grpc.Server({
  'grpc.keepalive_time_ms': 30000,
  'grpc.keepalive_timeout_ms': 10000,
  // ⚠️ ক্লায়েন্টের keepalive_time এর চেয়ে ছোট রাখুন
  'grpc.http2.min_ping_interval_without_data_ms': 20000,
  'grpc.max_connection_age_ms': 300000,       // লোড ব্যালেন্সিংয়ের জন্য উপকারী
  'grpc.max_connection_age_grace_ms': 10000
});</code></pre>
      </div>
      <h4>সবচেয়ে বড় ফাঁদ: ENHANCE_YOUR_CALM</h4>
      <p>gRPC সার্ভারে একটি প্রতিরক্ষা আছে — ক্লায়েন্ট যদি <em>খুব ঘন ঘন</em> ping পাঠায়, সার্ভার সেটিকে আক্রমণ ধরে নিয়ে কানেকশন কেটে দেয় এবং <code>ENHANCE_YOUR_CALM</code> সহ <code>GOAWAY</code> পাঠায়।</p>
      <p><strong>নিয়ম:</strong> ক্লায়েন্টের <code>keepalive_time_ms</code> সার্ভারের <code>min_ping_interval_without_data_ms</code>-এর চেয়ে <strong>বড়</strong> হতে হবে। এই দুটি না মিললে কানেকশন বারবার ছিঁড়বে — এবং এররটি বিভ্রান্তিকর, কারণ মনে হবে নেটওয়ার্ক সমস্যা।</p>
      <ul>
        <li>সার্ভারের ডিফল্ট <code>min_ping_interval</code> = ৫ মিনিট (অত্যন্ত রক্ষণশীল)।</li>
        <li>ক্লায়েন্টে ৩০ সেকেন্ড দিতে চাইলে সার্ভারেও সেই অনুযায়ী শিথিল করতে হবে।</li>
        <li><code>permit_without_calls</code> চালু না থাকলে সক্রিয় RPC ছাড়া ping যায় না — নিষ্ক্রিয় কানেকশন তখন মৃত থাকলেও ধরা পড়বে না।</li>
      </ul>
      <h4><code>max_connection_age</code> — একটি অবমূল্যায়িত সেটিং</h4>
      <p>এটি কানেকশনকে নির্দিষ্ট সময় পর ভদ্রভাবে বন্ধ করে দেয় (<code>GOAWAY</code> পাঠিয়ে, চলমান RPC শেষ হতে দিয়ে)। ক্লায়েন্ট তখন নতুন করে সংযোগ করে — এবং <strong>নতুন যোগ হওয়া সার্ভার পডগুলোও ট্রাফিক পেতে শুরু করে</strong>।</p>
      <p>Kubernetes-এ gRPC লোড অসমতার সমস্যার এটি সবচেয়ে সহজ সমাধান — কোনো service mesh ছাড়াই।</p>
      <h4>ভারসাম্য</h4>
      <p>খুব ঘন ঘন ping করলে অপ্রয়োজনীয় নেটওয়ার্ক ট্রাফিক ও ব্যাটারি খরচ (মোবাইলে) হয়। খুব কম করলে মৃত কানেকশন দেরিতে ধরা পড়ে। সার্ভার-টু-সার্ভারে ৩০-৬০ সেকেন্ড যুক্তিসঙ্গত; মোবাইল ক্লায়েন্টে অনেক বেশি (৫ মিনিট বা তার বেশি) রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মাঝে মাঝে <code>UNAVAILABLE</code> এরর — keepalive দিয়ে কীভাবে ডিবাগ করবেন?</li>
        <li>TCP keepalive ও gRPC keepalive-এর পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "grpc-44",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Debugging","GRPC_GO_LOG_VERBOSITY","Env"],
    question: "gRPC Internal Debugging: GRPC_GO_LOG_VERBOSITY=debug এবং GRPC_TRACE=all দিয়ে নেটওয়ার্ক ফ্রেম কীভাবে রিড করবেন?",
    answer: `
      <p>gRPC-র অভ্যন্তরীণ আচরণ (কানেকশন, HTTP/2 ফ্রেম, নাম রেজোলিউশন, লোড ব্যালেন্সিং) ডিবাগ করতে এনভায়রনমেন্ট ভ্যারিয়েবল দিয়ে বিস্তারিত লগ চালু করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ---- Node.js (@grpc/grpc-js) ----
GRPC_VERBOSITY=DEBUG GRPC_TRACE=all node server.js

# নির্দিষ্ট বিষয়ে সীমাবদ্ধ রাখুন — 'all' অত্যন্ত মুখর
GRPC_TRACE=channel,subchannel,dns_resolver node server.js
GRPC_TRACE=call_stream,server_call node server.js

# ---- Go ----
GRPC_GO_LOG_VERBOSITY_LEVEL=99 GRPC_GO_LOG_SEVERITY_LEVEL=info ./server</code></pre>
      </div>
      <h4>দরকারি trace ক্যাটাগরি</h4>
      <table>
        <tr><th>ক্যাটাগরি</th><th>যা দেখায়</th><th>কখন কাজে লাগে</th></tr>
        <tr><td><code>channel</code></td><td>channel অবস্থার পরিবর্তন</td><td>মাঝে মাঝে <code>UNAVAILABLE</code></td></tr>
        <tr><td><code>subchannel</code></td><td>প্রতিটি TCP কানেকশন</td><td>লোড ব্যালেন্সিং সমস্যা</td></tr>
        <tr><td><code>dns_resolver</code></td><td>DNS রেজোলিউশন</td><td>ভুল সার্ভারে যাচ্ছে</td></tr>
        <tr><td><code>keepalive</code></td><td>ping ও ACK</td><td>কানেকশন ছিঁড়ে যাচ্ছে</td></tr>
        <tr><td><code>call_stream</code></td><td>প্রতিটি RPC-র জীবনচক্র</td><td>কল ঝুলে থাকছে</td></tr>
      </table>
      <h4>যেসব সমস্যা এভাবে ধরা পড়ে</h4>
      <ul>
        <li><strong>"সব ট্রাফিক একটি পডে যাচ্ছে":</strong> <code>subchannel</code> trace দেখাবে কতগুলো কানেকশন তৈরি হয়েছে — একটিই হলে DNS বা LB কনফিগে সমস্যা।</li>
        <li><strong>"মাঝে মাঝে UNAVAILABLE":</strong> <code>keepalive</code> trace দেখাবে ping ব্যর্থ হচ্ছে কি না, বা <code>ENHANCE_YOUR_CALM</code> আসছে কি না।</li>
        <li><strong>"নতুন পড ট্রাফিক পাচ্ছে না":</strong> <code>dns_resolver</code> দেখাবে DNS কখন পুনরায় রিজলভ হয়েছে।</li>
      </ul>
      <h4>অন্যান্য পদ্ধতি</h4>
      <ul>
        <li><strong>channelz:</strong> gRPC-র বিল্ট-ইন ডিবাগ সার্ভিস যা রানটাইমে channel, subchannel ও socket-এর অবস্থা প্রকাশ করে — লগ পড়ার চেয়ে অনেক কাঠামোবদ্ধ।</li>
        <li><strong>Wireshark:</strong> HTTP/2 ফ্রেম ডিকোড করতে পারে। TLS-এ ব্যবহার করতে <code>SSLKEYLOGFILE</code> সেট করে কী লগ করতে হয়।</li>
        <li><strong>OpenTelemetry:</strong> প্রোডাকশনে ধারাবাহিক পর্যবেক্ষণের জন্য এটিই সঠিক টুল — trace ও মেট্রিক দিয়ে বেশিরভাগ সমস্যা লগ ছাড়াই ধরা পড়ে।</li>
      </ul>
      <p><strong>সতর্কতা:</strong> <code>GRPC_TRACE=all</code> প্রোডাকশনে <strong>কখনও চালাবেন না</strong> — এটি বিপুল পরিমাণ লগ তৈরি করে, পারফরম্যান্স মারাত্মকভাবে কমায় এবং ডিস্ক ভরে দিতে পারে। প্রয়োজনে অল্প সময়ের জন্য নির্দিষ্ট ক্যাটাগরি চালু করুন, অথবা একটি ক্যানারি ইনস্ট্যান্সে চালান।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>channelz কীভাবে চালু করবেন?</li>
        <li>প্রোডাকশনে একটি নির্দিষ্ট ধীর RPC কীভাবে তদন্ত করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-45",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf","Custom Options","Extensions"],
    question: "Protobuf Custom Options দিয়ে মেটাডাটা বা অডিটিং ডেকোরেটর কীভাবে বানাবেন?",
    answer: `
      <p>Protobuf-এ <strong>custom option</strong> দিয়ে <code>.proto</code> ফাইলেই মেটাডেটা যুক্ত করা যায় — যা কোড জেনারেটর বা রানটাইম ইন্টারসেপ্টর পড়ে সিদ্ধান্ত নিতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>import "google/protobuf/descriptor.proto";

// নিজস্ব option সংজ্ঞায়িত করুন
extend google.protobuf.MethodOptions {
  bool   require_auth  = 50001;    // 50000-99999 রেঞ্জ কাস্টম ব্যবহারের জন্য
  string required_role = 50002;
  bool   audit_log     = 50003;
}

extend google.protobuf.FieldOptions {
  bool pii = 50010;                 // ব্যক্তিগত তথ্য চিহ্নিত করা
}

service OrderService {
  rpc DeleteOrder(DeleteOrderRequest) returns (google.protobuf.Empty) {
    option (require_auth)  = true;
    option (required_role) = "admin";
    option (audit_log)     = true;
  }
}

message User {
  string id    = 1;
  string email = 2 [(pii) = true];    // লগে মাস্ক করতে হবে
  string phone = 3 [(pii) = true];
}</code></pre>
      </div>
      <h4>রানটাইমে ব্যবহার</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একটি সাধারণ interceptor সব মেথডের নিয়ম প্রয়োগ করে
function authInterceptor(call, methodDescriptor) {
  const opts = methodDescriptor.options;

  if (opts.require_auth && !call.user) {
    throw { code: grpc.status.UNAUTHENTICATED };
  }
  if (opts.required_role && !call.user.roles.includes(opts.required_role)) {
    throw { code: grpc.status.PERMISSION_DENIED };
  }
  if (opts.audit_log) {
    auditLogger.record({ method: methodDescriptor.path, user: call.user.id });
  }
}</code></pre>
      </div>
      <h4>কেন এটি শক্তিশালী</h4>
      <ul>
        <li><strong>নিরাপত্তা নীতি কন্ট্রাক্টের অংশ হয়ে যায়:</strong> কোন মেথডে কোন অনুমতি লাগে তা <code>.proto</code> দেখেই বোঝা যায় — কোড ঘেঁটে খুঁজতে হয় না। রিভিউ ও অডিট অনেক সহজ হয়।</li>
        <li><strong>ভুলে যাওয়া অসম্ভব:</strong> নতুন মেথড যোগ করলে option না দিলে CI-তে ধরা যায় ("প্রতিটি মেথডে require_auth স্পষ্টভাবে থাকতে হবে")।</li>
        <li><strong>ভাষা-নিরপেক্ষ:</strong> একই নিয়ম Go, Java ও Node.js সার্ভারে প্রযোজ্য।</li>
        <li><strong>PII ট্যাগিং:</strong> কোন ফিল্ড ব্যক্তিগত তা চিহ্নিত থাকলে লগিং লেয়ার স্বয়ংক্রিয়ভাবে মাস্ক করতে পারে — GDPR সম্মতিতে অত্যন্ত কার্যকর।</li>
      </ul>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Extension নম্বর সংঘর্ষ এড়াতে হবে</strong> — সংগঠনের ভেতরে একটি রেজিস্ট্রি রাখুন (৫০০০০-৯৯৯৯৯ রেঞ্জ ব্যবহার করুন)।</li>
        <li><strong>Node.js-এ option পড়া কিছুটা ঝামেলার</strong> — descriptor থেকে ম্যানুয়ালি বের করতে হয়; Go ও Java-তে এটি অনেক সরল।</li>
        <li><strong>অতিরিক্ত ব্যবহারে <code>.proto</code> জটিল হয়ে যায়</strong> — ব্যবসায়িক যুক্তি option-এ ঢুকিয়ে ফেলবেন না।</li>
      </ul>
      <p><strong>বাস্তব উদাহরণ:</strong> <code>protoc-gen-validate</code> ঠিক এই কৌশলেই কাজ করে — ফিল্ডে <code>[(validate.rules).string.email = true]</code> লিখলে জেনারেট হওয়া কোডে ভ্যালিডেশন যুক্ত হয়ে যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Custom option ব্যবহার করে ভ্যালিডেশন কীভাবে বাস্তবায়ন করবেন?</li>
        <li>Extension নম্বর কীভাবে বরাদ্দ করবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-46",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Server","Graceful Stop","GracefulStop"],
    question: "gRPC Server Graceful Shutdown: server.GracefulStop() vs server.Stop() কী?",
    answer: `
      <p>gRPC সার্ভার বন্ধ করার দুটি উপায় আছে, এবং প্রোডাকশনে ভুলটি বেছে নিলে চলমান রিকোয়েস্ট হারিয়ে যায়।</p>
      <table>
        <tr><th></th><th><code>GracefulStop()</code></th><th><code>Stop()</code> / <code>forceShutdown()</code></th></tr>
        <tr><td>নতুন কানেকশন</td><td>গ্রহণ বন্ধ</td><td>গ্রহণ বন্ধ</td></tr>
        <tr><td>চলমান RPC</td><td><strong>শেষ হতে দেয়</strong></td><td><strong>সাথে সাথে কেটে দেয়</strong></td></tr>
        <tr><td>ক্লায়েন্ট পায়</td><td>স্বাভাবিক রেসপন্স</td><td><code>UNAVAILABLE</code> এরর</td></tr>
        <tr><td>ব্লক করে</td><td>সব RPC শেষ না হওয়া পর্যন্ত</td><td>না</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>async function shutdown(signal) {
  logger.info({ signal }, 'shutdown শুরু');

  // ১. Health status বদলান — লোড ব্যালেন্সার নতুন ট্রাফিক পাঠানো বন্ধ করবে
  healthImpl.setStatus('', 'NOT_SERVING');

  // ২. LB-র প্রোব চক্র সম্পূর্ণ হওয়ার সময় দিন (গুরুত্বপূর্ণ!)
  await new Promise(r => setTimeout(r, 5000));

  // ৩. চলমান RPC শেষ হতে দিন
  const forceTimer = setTimeout(() => {
    logger.warn('graceful shutdown সময়সীমা পার — জোর করে বন্ধ');
    server.forceShutdown();
  }, 25000);

  server.tryShutdown(async () => {
    clearTimeout(forceTimer);
    await db.close();
    await redis.quit();
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));</code></pre>
      </div>
      <h4>ধাপ ২ কেন অপরিহার্য</h4>
      <p>এটি সবচেয়ে বেশি উপেক্ষিত অংশ। Kubernetes পড মুছে ফেলার সময় <strong>দুটি কাজ সমান্তরালে</strong> করে — কন্টেইনারে <code>SIGTERM</code> পাঠায়, এবং Service-এর endpoint তালিকা থেকে পড সরায়। কিন্তু endpoint আপডেট সব নোডে ছড়াতে কয়েক সেকেন্ড লাগে।</p>
      <p>তাই <code>SIGTERM</code> পাওয়ামাত্র সার্ভার বন্ধ করলে সেই কয়েক সেকেন্ডে আসা রিকোয়েস্ট <strong>একটি মৃত পডে গিয়ে ব্যর্থ হবে</strong>। প্রথমে health status বদলে কিছুক্ষণ অপেক্ষা করলে এই রেস কন্ডিশন দূর হয় — ডিপ্লয়ের সময় ৫০০ এরর বন্ধ হয়ে যায়।</p>
      <h4>অন্যান্য বিবেচনা</h4>
      <ul>
        <li><strong>টাইমআউট রাখুন:</strong> কোনো RPC অনন্তকাল চললে (বা একটি স্ট্রিম খোলা থাকলে) graceful shutdown কখনও শেষ হবে না। k8s-এর <code>terminationGracePeriodSeconds</code>-এর চেয়ে কম সময়ে জোর করে বন্ধ করুন, নাহলে k8s নিজেই <code>SIGKILL</code> দেবে।</li>
        <li><strong>দীর্ঘস্থায়ী স্ট্রিম:</strong> এগুলো নিজে থেকে শেষ হবে না। স্ট্রিম হ্যান্ডলারে একটি shutdown ফ্ল্যাগ দেখে ভদ্রভাবে স্ট্রিম বন্ধ করার ব্যবস্থা রাখুন।</li>
        <li><strong>নির্ভরতা শেষে বন্ধ করুন</strong> — DB কানেকশন আগে বন্ধ করলে চলমান RPC ব্যর্থ হবে।</li>
        <li><strong><code>max_connection_age</code> সাহায্য করে:</strong> কানেকশন পর্যায়ক্রমে বদলালে shutdown-এর সময় কম কানেকশন খোলা থাকে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>terminationGracePeriodSeconds</code> কত রাখবেন?</li>
        <li>ক্লায়েন্ট <code>GOAWAY</code> পেলে কী করে?</li>
      </ul>
    `
  },
  {
    id: "grpc-47",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Tracing","OpenTelemetry","StatsHandler"],
    question: "gRPC OpenTelemetry StatsHandler দিয়ে ক্লায়েন্ট ও সার্ভারের Metrics & Tracing কীভাবে ট্র্যাকিং করবেন?",
    answer: `
      <p>gRPC-র <strong>StatsHandler</strong> একটি হুক যা প্রতিটি RPC-র জীবনচক্রের ইভেন্ট (শুরু, মেসেজ পাঠানো/গ্রহণ, শেষ) রিপোর্ট করে। OpenTelemetry এটি ব্যবহার করে স্বয়ংক্রিয়ভাবে মেট্রিক্স ও ট্রেস সংগ্রহ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { NodeSDK } = require('@opentelemetry/sdk-node');
const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');

const sdk = new NodeSDK({
  instrumentations: [
    new GrpcInstrumentation({
      // সংবেদনশীল মেটাডেটা ট্রেসে যেন না যায়
      metadataToSpanAttributes: {
        client: { requestMetadata: ['x-tenant-id'] },
        server: { requestMetadata: ['x-tenant-id'] }
      }
    })
  ]
});
sdk.start();
// এরপর সব gRPC কল স্বয়ংক্রিয়ভাবে ট্রেস ও মেট্রিক তৈরি করবে</code></pre>
      </div>
      <h4>যা স্বয়ংক্রিয়ভাবে পাওয়া যায়</h4>
      <ul>
        <li><strong>মেট্রিক্স:</strong> প্রতি-মেথড রিকোয়েস্ট সংখ্যা, latency histogram, স্ট্যাটাস কোডের বণ্টন, মেসেজের আকার।</li>
        <li><strong>ট্রেস:</strong> প্রতিটি RPC একটি span; ক্লায়েন্ট ও সার্ভারের span স্বয়ংক্রিয়ভাবে যুক্ত হয়ে একটি সম্পূর্ণ ট্রেস তৈরি করে।</li>
      </ul>
      <h4>Context propagation — মূল যাদু</h4>
      <p>OpenTelemetry trace context (traceparent) <strong>gRPC মেটাডেটায় ইনজেক্ট করে দেয়</strong>। ফলে সার্ভিস A → B → C চেইনে সব span একই trace ID শেয়ার করে, এবং Jaeger-এ পুরো যাত্রাটি একটি সময়রেখায় দেখা যায়।</p>
      <p>এটি ছাড়া মাইক্রোসার্ভিসে "রিকোয়েস্টটি কোথায় ধীর হলো" প্রশ্নের উত্তর দেওয়া প্রায় অসম্ভব — প্রতিটি সার্ভিসের লগ আলাদাভাবে দেখে মেলাতে হতো।</p>
      <pre class="mermaid">
flowchart LR
    A["Gateway<br/>span 1"] -->|"traceparent<br/>মেটাডেটায়"| B["Order Service<br/>span 2"]
    B -->|"একই trace id"| C["Payment Service<br/>span 3"]
    B -->|"একই trace id"| D["DB span 4"]
      </pre>
      <span class="diagram-caption">এক trace, বহু span — সময় কোথায় গেল তা স্পষ্ট দেখা যায়</span>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>Sampling ব্যবহার করুন:</strong> ১০০% ট্রেস সংগ্রহ ব্যয়বহুল। ১-১০% হেড sampling সাধারণ; আরও ভালো হলো <strong>tail sampling</strong> — সব এরর ও ধীর রিকোয়েস্ট রাখুন, স্বাভাবিকগুলোর নমুনা নিন।</li>
        <li><strong>লগে trace ID যুক্ত করুন</strong> — তাহলে একটি ধীর ট্রেস দেখে সরাসরি সেই রিকোয়েস্টের সব লগ ফিল্টার করা যায়। এটিই সবচেয়ে বেশি সময় বাঁচায়।</li>
        <li><strong>Cardinality-তে সতর্ক:</strong> মেট্রিকের লেবেলে ইউজার আইডি বা রিকোয়েস্ট আইডি দেবেন না — মেট্রিক সিস্টেম ধসে পড়বে। সেগুলো span attribute-এ রাখুন।</li>
        <li><strong>সংবেদনশীল মেটাডেটা মাস্ক করুন</strong> — <code>authorization</code> হেডার ট্রেসে যাওয়া উচিত নয়।</li>
        <li><strong>ব্যবসায়িক span যোগ করুন:</strong> স্বয়ংক্রিয় ইনস্ট্রুমেন্টেশন RPC-র সীমানা দেখায়; ভেতরের ব্যয়বহুল অংশ (ক্যাশ lookup, ভারী গণনা) নিজে span দিয়ে চিহ্নিত করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Streaming RPC-তে span কীভাবে মডেল করবেন?</li>
        <li>Tail sampling কীভাবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "grpc-48",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf","Deprecated","deprecated option"],
    question: "Protobuf option deprecated = true কীভাবে কোড জেনারেটরে ওয়ার্নিং ফায়ার করে?",
    answer: `
      <p><code>deprecated = true</code> option দিয়ে একটি ফিল্ড, মেথড, message বা enum মানকে "আর ব্যবহার করবেন না" হিসেবে চিহ্নিত করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>message User {
  string id        = 1;
  string full_name = 2;

  // পুরনো ফিল্ড — এখনও কাজ করে, কিন্তু নতুন কোডে ব্যবহার করবেন না
  string name = 3 [deprecated = true];

  reserved 4;   // এটি আগেই মুছে ফেলা হয়েছে
}

service UserService {
  rpc GetUser(GetUserRequest) returns (User);

  rpc GetUserLegacy(GetUserRequest) returns (User) {
    option deprecated = true;
  }
}</code></pre>
      </div>
      <h4>এটি কী করে</h4>
      <p>কোড জেনারেটর এই তথ্যটি জেনারেট হওয়া কোডে ভাষা-নির্দিষ্ট deprecation চিহ্ন হিসেবে অনুবাদ করে:</p>
      <ul>
        <li><strong>Go:</strong> <code>// Deprecated: Do not use.</code> কমেন্ট — linter সতর্ক করে।</li>
        <li><strong>Java:</strong> <code>@Deprecated</code> annotation — কম্পাইলার সতর্কবার্তা দেয়।</li>
        <li><strong>TypeScript:</strong> <code>@deprecated</code> JSDoc — IDE-তে নামের উপর কাটা দাগ পড়ে।</li>
      </ul>
      <p><strong>গুরুত্বপূর্ণ:</strong> এটি <em>কেবল একটি সংকেত</em> — ফিল্ডটি এখনও সম্পূর্ণ কার্যকর থাকে এবং wire format-এ কোনো পরিবর্তন হয় না। কেউ চাইলে ব্যবহার করতে পারবে, শুধু সতর্কবার্তা দেখবে।</p>
      <h4>নিরাপদ ফিল্ড অপসারণের সম্পূর্ণ প্রক্রিয়া</h4>
      <ol>
        <li><strong>Deprecate:</strong> <code>[deprecated = true]</code> যোগ করুন এবং কমেন্টে বিকল্প জানান। নতুন কোড লেখা বন্ধ হবে।</li>
        <li><strong>মাইগ্রেট:</strong> সব ক্লায়েন্টকে নতুন ফিল্ডে সরান। এই সময়ে সার্ভার <em>দুটি ফিল্ডই</em> পূরণ করবে।</li>
        <li><strong>পর্যবেক্ষণ করুন:</strong> মেট্রিক দিয়ে যাচাই করুন কেউ আর পুরনো ফিল্ড পড়ছে/পাঠাচ্ছে না। <strong>এই ধাপটি সবচেয়ে বেশি বাদ পড়ে</strong> — অনুমান না করে মেপে নিন।</li>
        <li><strong>মুছে ফেলুন ও <code>reserved</code> করুন:</strong> ফিল্ড নম্বর ও নাম দুটোই সংরক্ষিত রাখুন, যাতে ভবিষ্যতে কেউ পুনর্ব্যবহার করতে না পারে।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>message User {
  reserved 3;
  reserved "name";     // নামও সংরক্ষিত — ভুল করে ফিরিয়ে আনা ঠেকায়

  string id = 1;
  string full_name = 2;
}</code></pre>
      </div>
      <p><strong>কেন <code>reserved</code> ছাড়া বিপজ্জনক:</strong> ফিল্ড ৩ পুনর্ব্যবহার করলে পুরনো ক্লায়েন্ট নতুন ডেটাকে পুরনো অর্থে পড়বে — নীরব ডেটা করাপশন, যা কোথাও এরর দেয় না।</p>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> <code>buf lint</code>-এ deprecated ফিল্ডের ব্যবহার ধরার নিয়ম যোগ করা যায়, এবং সার্ভারে একটি মেট্রিক রাখুন যা গোনে কতবার deprecated ফিল্ড পূরণ করা হয়েছে — সেটি শূন্যে নামলেই মুছে ফেলা নিরাপদ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কতদিন একটি ফিল্ড deprecated রেখে তারপর মুছবেন?</li>
        <li>পুরনো ফিল্ড কেউ ব্যবহার করছে কি না কীভাবে মাপবেন?</li>
      </ul>
    `
  },
  {
    id: "grpc-49",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Connection","Subchannel Reconnection","Backoff"],
    question: "gRPC Subchannel Connection Backoff Algorithm কীভাবে কাজ করে?",
    answer: `
      <p>gRPC কানেকশন ব্যর্থ হলে সাথে সাথে বারবার চেষ্টা করে না — এটি একটি নির্দিষ্ট <strong>exponential backoff</strong> অ্যালগরিদম অনুসরণ করে, যা gRPC স্পেসিফিকেশনে সংজ্ঞায়িত।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>ডিফল্ট প্যারামিটার:
  INITIAL_BACKOFF = 1 সেকেন্ড
  MULTIPLIER      = 1.6
  JITTER          = 0.2
  MAX_BACKOFF     = 120 সেকেন্ড

অ্যালগরিদম:
  প্রথম চেষ্টা তাৎক্ষণিক
  ব্যর্থ হলে:
    current = min(current * MULTIPLIER, MAX_BACKOFF)
    অপেক্ষা = current ± (JITTER × current)     ← র‍্যান্ডমাইজেশন

আনুমানিক ক্রম: 1s → 1.6s → 2.6s → 4.1s → 6.5s → ... → 120s (সর্বোচ্চ)</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const client = new OrderService(addr, creds, {
  'grpc.initial_reconnect_backoff_ms': 1000,
  'grpc.max_reconnect_backoff_ms': 30000,   // 120s অনেক দীর্ঘ হতে পারে
  'grpc.min_reconnect_backoff_ms': 1000
});</code></pre>
      </div>
      <h4>Jitter কেন অপরিহার্য</h4>
      <p>একটি সার্ভার রিস্টার্ট করলে তার সাথে যুক্ত <em>সব</em> ক্লায়েন্ট একই মুহূর্তে কানেকশন হারায়। jitter ছাড়া তারা সবাই ঠিক ১ সেকেন্ড পরে একসাথে পুনরায় সংযোগের চেষ্টা করত — সদ্য ফিরে আসা সার্ভারে হঠাৎ হাজারো সংযোগের ঢল (thundering herd), যা তাকে আবার ধসিয়ে দিতে পারত।</p>
      <p>±২০% র‍্যান্ডমাইজেশন এই ঢেউকে সময়ের সাথে ছড়িয়ে দেয়।</p>
      <h4>একটি ব্যবহারিক সমস্যা</h4>
      <p>ডিফল্ট <code>MAX_BACKOFF</code> ১২০ সেকেন্ড অনেক সিস্টেমের জন্য দীর্ঘ। একটি সার্ভিস ৫ মিনিট ডাউন থাকার পর ফিরে এলে ক্লায়েন্ট তখন হয়তো ১২০ সেকেন্ডের অপেক্ষায় আছে — সার্ভিস ফিরে আসার পরও ২ মিনিট পর্যন্ত পুনঃসংযোগ হবে না।</p>
      <p><strong>সমাধান:</strong> অভ্যন্তরীণ সার্ভিসে <code>max_reconnect_backoff_ms</code> ১৫-৩০ সেকেন্ডে নামিয়ে আনুন। সার্ভিস দ্রুত ফিরে আসার প্রত্যাশা থাকলে এটি পুনরুদ্ধারের সময় নাটকীয়ভাবে কমায়।</p>
      <h4>সংশ্লিষ্ট আচরণ</h4>
      <ul>
        <li><strong>সফল কানেকশনে backoff রিসেট হয়</strong> — পরের বার আবার ১ সেকেন্ড থেকে শুরু।</li>
        <li><strong>Backoff চলাকালে RPC তাৎক্ষণিক <code>UNAVAILABLE</code> পায়</strong>, যদি না <code>waitForReady</code> সেট করা থাকে — তখন deadline পর্যন্ত অপেক্ষা করে।</li>
        <li><strong>প্রতিটি subchannel-এর নিজস্ব backoff</strong> — একাধিক সার্ভারের ক্ষেত্রে একটি ব্যর্থ হলে অন্যগুলো অপ্রভাবিত থাকে।</li>
        <li>এই backoff <em>কানেকশন</em>-স্তরের; RPC-স্তরের রিট্রাই (<code>retryPolicy</code>) সম্পূর্ণ আলাদা ও স্বাধীনভাবে কাজ করে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ক্লায়েন্ট পুনঃসংযোগের চেষ্টা করছে কি না কীভাবে দেখবেন?</li>
        <li>DNS বদলে গেলে ক্লায়েন্ট কখন নতুন IP শিখবে?</li>
      </ul>
    `
  },
  {
    id: "grpc-50",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Testing","Buf Breaking","CI CD"],
    question: "CI/CD Pipeline-এ buf breaking --against \".git#branch=main\" দিয়ে Breaking Change Detection কীভাবে করবেন?",
    answer: `
      <p>Protobuf-এর breaking change-এর সবচেয়ে বিপজ্জনক দিক হলো — <strong>এগুলো কম্পাইল টাইমে ধরা পড়ে না</strong>। ফিল্ড নম্বর বদলে দিলে কোড দিব্যি কম্পাইল হবে, টেস্টও পাস করবে, কিন্তু প্রোডাকশনে পুরনো ক্লায়েন্ট বিকৃত ডেটা পড়তে শুরু করবে।</p>
      <p><code>buf breaking</code> CI-তেই এটি ধরে ফেলে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># main ব্রাঞ্চের সাথে তুলনা করুন
buf breaking --against '.git#branch=main'

# রিমোট রিপোর সাথে
buf breaking --against 'https://github.com/org/api.git#branch=main'

# একটি নির্দিষ্ট ট্যাগের সাথে (প্রকাশিত সংস্করণ)
buf breaking --against '.git#tag=v1.4.0'</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># .github/workflows/proto.yml
name: Protobuf CI
on: pull_request

jobs:
  buf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }       # ⚠️ পূর্ণ ইতিহাস দরকার
      - uses: bufbuild/buf-setup-action@v1
      - run: buf lint
      - run: buf format --diff --exit-code
      - run: buf breaking --against '.git#branch=main,subdir=proto'</code></pre>
      </div>
      <h4>Breaking রুল সেট</h4>
      <table>
        <tr><th>রুল সেট</th><th>কী যাচাই করে</th><th>কখন</th></tr>
        <tr><td><code>FILE</code></td><td>ফাইল-স্তরের সামঞ্জস্য (সবচেয়ে কড়া)</td><td>ডিফল্ট, প্রস্তাবিত</td></tr>
        <tr><td><code>PACKAGE</code></td><td>package-স্তরে; ফাইল সরানো অনুমোদিত</td><td>রিফ্যাক্টর করতে হলে</td></tr>
        <tr><td><code>WIRE</code></td><td>শুধু wire format ভাঙে কি না</td><td>শিথিলতম</td></tr>
        <tr><td><code>WIRE_JSON</code></td><td>wire + JSON নাম</td><td>JSON transcoding ব্যবহার করলে</td></tr>
      </table>
      <p><strong>কোনটি বাছবেন:</strong> gRPC ছাড়াও JSON transcoding (grpc-gateway) ব্যবহার করলে <code>WIRE_JSON</code> লাগবে, কারণ তখন ফিল্ডের <em>নামও</em> গুরুত্বপূর্ণ — শুধু নম্বর নয়। কেবল বাইনারি gRPC হলে <code>WIRE</code> যথেষ্ট, কিন্তু <code>FILE</code> সবচেয়ে নিরাপদ কারণ এটি জেনারেট হওয়া কোডের সামঞ্জস্যও রক্ষা করে।</p>
      <h4>ইচ্ছাকৃত breaking change কীভাবে করবেন</h4>
      <p>কখনও কখনও breaking change অনিবার্য। তখন দুটি পথ:</p>
      <ul>
        <li><strong>নতুন version package তৈরি করুন</strong> (<code>acme.order.v2</code>) — এটিই সঠিক উপায়। v1 ও v2 পাশাপাশি চলবে, ক্লায়েন্টরা নিজের গতিতে মাইগ্রেট করবে।</li>
        <li><strong>সাময়িকভাবে চেক বাইপাস করুন</strong> — <code>buf.yaml</code>-এ <code>ignore</code> দিয়ে, তবে এটি একটি সচেতন সিদ্ধান্ত হতে হবে এবং PR-এ স্পষ্টভাবে আলোচিত হতে হবে।</li>
      </ul>
      <h4>কেন এটি সবচেয়ে মূল্যবান CI চেক</h4>
      <p>Protobuf-এ ভাঙা পরিবর্তনের ক্ষতি অসামঞ্জস্যপূর্ণভাবে বড় — একটি ভুল মার্জ প্রোডাকশনে নীরব ডেটা করাপশন তৈরি করতে পারে, যা দিন-সপ্তাহ পরে ধরা পড়ে এবং ততক্ষণে ক্ষতিগ্রস্ত ডেটা ছড়িয়ে গেছে। একটি ৩-লাইনের CI স্টেপ এই পুরো শ্রেণির দুর্ঘটনা প্রতিরোধ করে।</p>
      <p><strong>টিপ:</strong> <code>fetch-depth: 0</code> দিতে ভুলবেন না — অগভীর checkout-এ <code>.git#branch=main</code> রেফারেন্স খুঁজে পাওয়া যাবে না এবং চেকটি নীরবে ব্যর্থ হবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি পাবলিক API-তে breaking change কীভাবে ঘোষণা ও পরিচালনা করবেন?</li>
        <li>Buf Schema Registry কীভাবে এই প্রক্রিয়া সহজ করে?</li>
      </ul>
    `
  },
  /* ===== SECTION G — Elasticsearch & Search Infrastructure (48) ===== */
  {
    id: "es-1",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Inverted Index","Lucene","Architecture"],
    question: "Elasticsearch-এ Inverted Index কী এবং এটি কীভাবে টেক্সট সার্চকে মিলিসেকেন্ডে সম্পাদন করে?",
    answer: `
      <p><strong>Inverted Index:</strong> এটি এমন একটি বিশেষ সার্চ ডেটা স্ট্রাকচার যা বইয়ের শেষের ইনডেক্স সূচির মতো কাজ করে। প্রতিটি ডকুমেন্টের পুরো টেক্সট পড়ার বদলে এটি টেক্সটকে ছোট ছোট শব্দে (Tokens) ভেঙে প্রতিটি শব্দ কোন কোন ডকুমেন্টে এবং কত নম্বর পজিশনে আছে তার একটি ম্যাপ বজায় রাখে।</p>
      <h4>Inverted Index কীভাবে তৈরি হয়:</h4>
      <p>ধরা যাক ২টি ডকুমেন্ট রয়েছে:</p>
      <ul>
        <li>Doc 1: "Quick brown fox"</li>
        <li>Doc 2: "Fast brown dog"</li>
      </ul>
      <p>Elasticsearch-এর <strong>Lucene Engine</strong> ইনভার্টেড ইনডেক্স তৈরি করবে এভাবে:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Term      | Document IDs
------------------------
Quick     | [Doc 1]
Fast      | [Doc 2]
brown     | [Doc 1, Doc 2]
fox       | [Doc 1]
dog       | [Doc 2]</code></pre>
      </div>
      <p>এখন ইউজার "brown" লিখে সার্চ করলে Elasticsearch কোনো টেবিল স্ক্যান না করে ইনভার্টেড ইনডেক্স দেখে ১ মিলি-সেকেন্ডেই Doc 1 ও Doc 2 রিটার্ন করে দিতে পারে।</p>
    `
  },
  {
    id: "es-2",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Analyzer","Tokenizer","Stemming"],
    question: "Elasticsearch Text Analyzer কী? Character Filter, Tokenizer এবং Token Filter-এর কাজ কী?",
    answer: `
      <p>Elasticsearch-এ যখনই কোনো <code>text</code> টাইপ কলামে ইনডেক্স বা সার্চ করা হয়, তখন **Analyzer** সেই স্ট্রিংকে প্রসেস করে ইনভার্টেড ইনডেক্সের টার্মে রূপান্তর করে।</p>
      <h4>Analyzer-এর ৩টি পর্যায় (Pipeline):</h4>
      <ol>
        <li><strong>Character Filter:</strong> মূল স্ট্রিম থেকে অপছন্দনীয় ক্যারেক্টার ছেঁটে ফেলে বা মডিফাই করে (যেমন: HTML ট্যাগ <code>&lt;p&gt;</code> রিমুভ করা)।</li>
        <li><strong>Tokenizer:</strong> টেক্সটকে আলাদা আলাদা টোকেন বা শব্দে ভেঙে ফেলে (যেমন: স্পেস বা পাঙ্কচুয়েশন ধরে শব্দ আলাদা করা)।</li>
        <li><strong>Token Filter:</strong> টোকেনগুলোকে ছোট হাতের বর্ণে রূপান্তর (Lowercase), অতিরিক্ত সাধারণ শব্দ ছাঁটাই (Stopwords filter like 'is', 'the'), এবং মূল মূলে রূপান্তর (Stemming e.g., 'running' -> 'run') করে।</li>
      </ol>
    `
  },
  {
    id: "es-3",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Query DSL","bool query","filter vs must"],
    question: "Elasticsearch Query DSL-এ bool Query-এর must, filter, should, এবং must_not-এর পার্থক্য এবং Scoring (Relevance Score) কীভাবে কাজ করে?",
    answer: `
      <p>Elasticsearch-এ জটিল সার্চ লজিক লিখতে <strong>Query DSL (Domain Specific Language)</strong> ব্যবহার করা হয়। <code>bool</code> কুয়েরি দিয়ে একাধিক কন্ডিশন ব্লকে ভাগ করা হয়:</p>
      <ul>
        <li><code>must:</code> কন্ডিশন অবশ্যই মিলতে হবে এবং ডকুমেন্টের **Relevance Score (_score)** গণনায় প্রভাব ফেলবে।</li>
        <li><code>filter:</code> কন্ডিশন মিলতেই হবে, কিন্তু কোনো **Relevance Score হিসেব করে না**। এটি মেমোরিতে **Filter Cache** তৈরি করে, ফলে <code>must</code>-এর চেয়ে অনেক বেশি দ্রুত।</li>
        <li><code>should:</code> কন্ডিশন মেলা বাধ্যতামূলক নয়, তবে মিললে ডকুমেন্টের <code>_score</code> বা র্যাঙ্কিং বাড়িয়ে উপরে তুলবে (OR কন্ডিশনের মতো)।</li>
        <li><code>must_not:</code> এই কন্ডিশনের সাথে মিলে যাওয়া ডকুমেন্ট বাদ দেওয়া হবে (Score = 0)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /products/_search
{
  "query": {
    "bool": {
      "must": [ { "match": { "name": "laptop" } } ],
      "filter": [ { "term": { "status": "ACTIVE" } }, { "range": { "price": { "lte": 1000 } } } ],
      "should": [ { "match": { "brand": "Apple" } } ]
    }
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "es-4",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Term Query","Match Query","Mapping"],
    question: "Term Query এবং Match Query-এর মধ্যে পার্থক্য কী এবং text vs keyword কলামের ভূমিকা কী?",
    answer: `
      <p>Elasticsearch-এ স্ট্রিং ফিল্ড ডিক্লেয়ার করার সময় কলামের ২ ধরনের ডাটা টাইপ থাকে:</p>
      <ul>
        <li><code>text:</code> অ্যানেলাইজড (Analyzed) হয়। ইনভার্টেড ইনডেক্সে ফুল টেক্সট সার্চের জন্য টোকেনাইজড হয়ে সেভ হয়।</li>
        <li><code>keyword:</code> আন-অ্যানেলাইজড (Not Analyzed)। সম্পূর্ণ স্ট্রিমটি ঠিক যেভাবে দেওয়া হয়েছে সেভাবেই ইনডেক্স হয় (Exact Matching)।</li>
      </ul>
      <h4>Term Query vs Match Query:</h4>
      <ul>
        <li><strong>Term Query:</strong> নিখুঁত হুবহু মেচিং (Exact Match) নিশ্চিত করে। এটি ইনপুটকে কোনো অ্যানালাইজ করে না। সবসময় <code>keyword</code> কলামের ওপর চালাতে হয়।</li>
        <li><strong>Match Query:</strong> ইনপুট টেক্সটকে অ্যানালাইজ (Tokenize/Lowercase) করে ইনভার্টেড ইনডেক্সে মেলায়। ফুল-টেক্সট সার্চের জন্য ব্যবহৃত হয়।</li>
      </ul>
    `
  },
  {
    id: "es-5",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Cluster","Shards","Node Types"],
    question: "Elasticsearch Cluster Architecture কীভাবে কাজ করে? Master Node, Data Node, Primary Shard এবং Replica Shard বুঝিয়ে বলুন।",
    answer: `
      <p>Elasticsearch একটি মাস্টারলেস ফিলিং ডিস্ট্রিবিউটেড ক্লাস্টার সিস্টেম হিসেবে কাজ করে:</p>
      <h4>Node Types:</h4>
      <ul>
        <li><strong>Master-eligible Node:</strong> ক্লাস্টারের মেটাডেটা নিয়ন্ত্রণ, ইনডেক্স তৈরি/ডিলেট এবং শার্ড অ্যালোকেশন দেখভাল করে।</li>
        <li><strong>Data Node:</strong> আসল ইনডেক্স করা ডাটা স্টোর করে এবং কুয়েরি ও এগ্রিগেশন এক্সিকিউট করে। (RAM & SSD নির্ভর)।</li>
        <li><strong>Ingest Node:</strong> ইনডেক্সিংয়ের আগে ডাটা প্রি-প্রসেস বা ট্রান্সফর্ম করে।</li>
      </ul>
      <h4>Primary vs Replica Shards:</h4>
      <p>একটি Index একাধিক <strong>Primary Shard</strong>-এ বিভক্ত থাকে যা বহু নোডে ছড়িয়ে থাকে। প্রতিটি Primary Shard-এর ১ বা একাধিক <strong>Replica Shard</strong> থাকে যা হাই-অ্যাভেইল্যাবিলিটি ও ডাটা লস রোধ নিশ্চিত করে এবং রিড পারফরম্যান্স বাড়ায়।</p>
    `
  },
  {
    id: "es-6",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Aggregations","Metrics","Buckets"],
    question: "Elasticsearch Aggregations কী? Bucket Aggregations এবং Metric Aggregations-এর উদাহরণ দিন।",
    answer: `
      <p><strong>Aggregations:</strong> এটি SQL-এর <code>GROUP BY</code> এবং এগ্রিগেট মেথডের থেকেও অনেক শক্তিশালী অ্যানালিটিক্যাল ফ্রেমওয়ার্ক যা সার্চ রেজাল্টের ওপর রিয়াল-টাইম স্ট্যাটিস্টিক্স হিসেব করে।</p>
      <h4>২ প্রধান টাইপ:</h4>
      <ol>
        <li><strong>Bucket Aggregations:</strong> ডকুমেন্টগুলোকে নির্দিষ্ট কন্ডিশন অনুসারে বালতিতে (Bucket) বিভক্ত করে (SQL GROUP BY-এর সমতুল্য)। যেমন: <code>terms</code>, <code>date_histogram</code>, <code>range</code>।</li>
        <li><strong>Metric Aggregations:</strong> বিভক্ত বা সম্পূর্ণ ডকুমেন্টের ওপর গাণিতিক হিসেব বের করে। যেমন: <code>avg</code>, <code>sum</code>, <code>min</code>, <code>max</code>, <code>stats</code>।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /sales/_search
{
  "size": 0,
  "aggs": {
    "by_category": {
      "terms": { "field": "category.keyword" },
      "aggs": { "avg_price": { "avg": { "field": "price" } } }
    }
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "es-7",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Mapping","Explicit Mapping"],
    question: "Elasticsearch Mapping কী? Dynamic Mapping-এর ঝুঁকি এবং Explicit Mapping কেন প্রয়োজন?",
    answer: `
      <p><strong>Mapping:</strong> ডাটাবেজ স্কিমার মতোই Mapping হলো Elasticsearch-এর একটি ব্লুপ্রিন্ট যা নির্ধারণ করে ডকুমেন্টের কোন ফিল্ডের ডাটা টাইপ (text, keyword, integer, date, geo_point) কী হবে এবং কীভাবে ইনডেক্স হবে।</p>
      <h4>Dynamic Mapping Risk:</h4>
      <p>ডিফল্টভাবে Elasticsearch নতুন কোনো JSON ফিল্ড পেলেই নিজে টাইপ গেস করে Dynamic Mapping তৈরি করে নেয়। এতে কোনো তারিখ String বা সংখ্যা Float হিসেবে ভুলভাবে ম্যাপ হয়ে মেমোরি ওয়েস্ট ও কুয়েরি এরর ঘটাতে পারে।</p>
      <p><em>সমাধান:</em> প্রোডাকশন ক্লাস্টারে ইনডেক্স বানানোর সময়ই কাস্টম **Explicit Mapping** ডিক্লেয়ার করে রাখা।</p>
    `
  },
  {
    id: "es-8",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Performance","Bulk API","Reindex"],
    question: "Elasticsearch Bulk API এবং Reindex API-এর ব্যবহার কী?",
    answer: `
      <ul>
        <li><strong>Bulk API:</strong> লাখ লাখ ডকুমেন্ট একে একে সিঙ্গেল HTTP রিকোয়েস্টে ইনডেক্স না করে, একটি মাত্র HTTP রিকোয়েস্টে ব্যাচ আকারে (Batch index/update/delete) ইনডেক্সিং করার মেথড। এটি ইনডেক্সিং স্পিড ১০০ গুণ বাড়িয়ে দেয়।</li>
        <li><strong>Reindex API:</strong> Elasticsearch-এ একবার কোনো ইনডেক্সের কলাম টাইপ বা Mapping ডিক্লেয়ার হয়ে গেলে তা সরাসরি পরিবর্তন করা যায় না। Reindex API দিয়ে পুরোনো ইনডেক্স থেকে নতুন পরিবর্তিত Mapping-এর ইনডেক্সে ডাটা মাইগ্রেট করা হয়।</li>
      </ul>
    `
  },
  {
    id: "es-9",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Node.js","@elastic/elasticsearch"],
    question: "Node.js (official elasticsearch client) দিয়ে Elasticsearch-এ সার্চ করার উদাহরণ দিন।",
    answer: `
      <p>অফিসিয়াল <code>@elastic/elasticsearch</code> ক্লায়েন্ট দিয়ে সার্চ করার সময় সবচেয়ে গুরুত্বপূর্ণ ধারণাটি হলো <strong>query বনাম filter</strong>-এর পার্থক্য:</p>
      <ul>
        <li><strong><code>must</code> (query context):</strong> "কতটা ভালোভাবে মিলল" তা হিসাব করে <em>relevance score</em> দেয়। ফুল-টেক্সট সার্চে এটি দরকার।</li>
        <li><strong><code>filter</code> (filter context):</strong> শুধু হ্যাঁ/না — স্কোর গণনা করে না, তাই দ্রুত এবং <strong>ক্যাশযোগ্য</strong>। "শুধু স্টকে আছে এমন পণ্য" ধরনের শর্তে সবসময় <code>filter</code> ব্যবহার করুন, <code>must</code> নয়।</li>
      </ul>
      <p>ফলাফল আসে <code>result.hits.hits</code>-এ; প্রকৃত ডকুমেন্ট থাকে প্রতিটি hit-এর <code>_source</code> ফিল্ডে এবং প্রাসঙ্গিকতার স্কোর <code>_score</code>-এ।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function searchProducts(searchTerm) {
  const result = await client.search({
    index: 'products',
    query: {
      bool: {
        must: [ { match: { name: searchTerm } } ],
        filter: [ { term: { inStock: true } } ]
      }
    }
  });

  const hits = result.hits.hits.map(hit => hit._source);
  console.log('Search Results:', hits);
}
searchProducts('wireless headphones');</code></pre>
      </div>
    `
  },
  {
    id: "es-10",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["ILM","Index Lifecycle","Hot Warm Cold"],
    question: "Elasticsearch Index Lifecycle Management (ILM) এবং Hot-Warm-Cold Architecture কী?",
    answer: `
      <p>ILM টাইম-সিরিজ ডেটার (লগ, মেট্রিক) জীবনচক্র স্বয়ংক্রিয় করে। <strong>Hot-Warm-Cold</strong> আর্কিটেকচারের মূল ধারণা — ডেটার বয়স বাড়ার সাথে সাথে তার অ্যাক্সেস প্যাটার্ন বদলায়, তাই স্টোরেজও বদলানো উচিত।</p>
      <ul>
        <li><strong>Hot:</strong> আজকের লগ — লেখা হচ্ছে ও ঘন ঘন সার্চ হচ্ছে। দামি NVMe SSD, বেশি CPU।</li>
        <li><strong>Warm:</strong> গত সপ্তাহের — আর লেখা হয় না, মাঝে মাঝে সার্চ হয়। সাধারণ SSD, shard সংকুচিত।</li>
        <li><strong>Cold:</strong> গত মাসের — কদাচিৎ সার্চ। সস্তা HDD, replica ০।</li>
        <li><strong>Frozen:</strong> ডেটা S3-তে, কেবল প্রয়োজনে আংশিক আনা হয়। খরচ নগণ্য, সার্চ ধীর।</li>
        <li><strong>Delete:</strong> retention শেষে স্বয়ংক্রিয় অপসারণ।</li>
      </ul>
      <p><strong>ব্যবসায়িক যুক্তি:</strong> লগ ডেটার ~৯০% এক সপ্তাহের বেশি পুরনো, অথচ ~৯০% সার্চ সাম্প্রতিক ডেটায় হয়। সব ডেটা দামি হার্ডওয়্যারে রাখা বিপুল অপচয়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># নোডে tier চিহ্নিত করুন
node.roles: [ data_hot, ingest ]
node.roles: [ data_warm ]
node.roles: [ data_cold ]

# ILM নীতির সাথে data stream যুক্ত করুন
PUT _index_template/logs-template
{
  "index_patterns": ["logs-*"],
  "data_stream": {},
  "template": { "settings": { "index.lifecycle.name": "logs-policy" } }
}</code></pre>
      </div>
      <p><strong>Data stream</strong> ILM-এর সাথে সবচেয়ে ভালো কাজ করে — এটি স্বয়ংক্রিয়ভাবে rollover পরিচালনা করে এবং append-only টাইম-সিরিজ ডেটার জন্য অপ্টিমাইজ করা।</p>
      <p><strong>মনিটরিং:</strong> <code>GET /my-index/_ilm/explain</code> দিয়ে দেখুন একটি ইনডেক্স এখন কোন phase-এ আছে এবং কোনো ধাপে আটকে গেছে কি না — ILM নীরবে ব্যর্থ হতে পারে (যেমন warm নোডে জায়গা না থাকলে)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Data stream ও সাধারণ ইনডেক্সের পার্থক্য কী?</li>
        <li>ILM ধাপে আটকে গেলে কীভাবে ঠিক করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-11",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Data Modeling","Mapping","Nested"],
    question: "Elasticsearch-এ Nested Object Mapping এবং Parent-Join (Join Field) Mapping-এর পার্থক্য কী?",
    answer: `
      <p>Elasticsearch ডকুমেন্টে নেস্টেড অবজেক্ট সংরক্ষণের তিনটি উপায় আছে, এবং ভুলটি বাছলে <strong>ভুল সার্চ ফলাফল</strong> আসে — কোনো এরর ছাড়াই।</p>
      <h4>ডিফল্ট <code>object</code> টাইপের ফাঁদ</h4>
      <p>Elasticsearch ভেতরে ডকুমেন্টকে সমতল (flatten) করে ফেলে। ফলে অ্যারের ভেতরের অবজেক্টগুলোর মধ্যে <strong>সম্পর্ক হারিয়ে যায়</strong>:</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># মূল ডকুমেন্ট
{ "reviews": [
    { "author": "রহিম", "rating": 5 },
    { "author": "করিম", "rating": 1 }
]}

# Elasticsearch ভেতরে যেভাবে সংরক্ষণ করে (flattened):
{ "reviews.author": ["রহিম", "করিম"],
  "reviews.rating": [5, 1] }

# ফলাফল: এই কুয়েরি ভুলভাবে মিলে যাবে!
{ "bool": { "must": [
    { "match": { "reviews.author": "রহিম" } },
    { "match": { "reviews.rating": 1 } }
]}}
# রহিম ৫ দিয়েছে, করিম ১ — কিন্তু flatten হওয়ায় দুটোই "আছে" ✗</code></pre>
      </div>
      <h4>সমাধান ১: <code>nested</code> টাইপ</h4>
      <p><code>nested</code> mapping দিলে Elasticsearch প্রতিটি সাব-অবজেক্টকে একটি <strong>আলাদা লুকানো Lucene ডকুমেন্ট</strong> হিসেবে ইনডেক্স করে — তাই সম্পর্ক অক্ষুণ্ণ থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>"reviews": { "type": "nested", "properties": { ... } }

# কুয়েরিতেও nested ব্যবহার করতে হবে
{ "nested": {
    "path": "reviews",
    "query": { "bool": { "must": [
      { "match": { "reviews.author": "রহিম" } },
      { "match": { "reviews.rating": 1 } }
    ]}}
}}
# এখন সঠিকভাবে কিছুই মিলবে না ✅</code></pre>
      </div>
      <p><strong>খরচ:</strong> প্রতিটি nested অবজেক্ট একটি আলাদা Lucene ডকুমেন্ট — ১০০টি রিভিউ থাকলে ১০১টি ডকুমেন্ট। ইনডেক্স বড় হয়, কুয়েরি ধীর হয়, এবং <strong>একটি সাব-অবজেক্ট আপডেট করলে পুরো মূল ডকুমেন্ট পুনরায় ইনডেক্স হয়</strong>।</p>
      <h4>সমাধান ২: <code>join</code> ফিল্ড (parent-child)</h4>
      <p>এখানে parent ও child সম্পূর্ণ <em>আলাদা ডকুমেন্ট</em> হিসেবে থাকে, কেবল একই shard-এ রাখা হয়।</p>
      <table>
        <tr><th>দিক</th><th><code>nested</code></th><th><code>join</code></th></tr>
        <tr><td>আপডেট</td><td>পুরো ডকুমেন্ট পুনরায় ইনডেক্স</td><td><strong>শুধু child আপডেট</strong></td></tr>
        <tr><td>সার্চ গতি</td><td>দ্রুত</td><td>ধীর (রানটাইমে join)</td></tr>
        <tr><td>উপযুক্ত</td><td>কম বদলায়, কম সংখ্যক সাব-অবজেক্ট</td><td>ঘন ঘন বদলায়, অনেক child</td></tr>
      </table>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> সম্ভব হলে <strong>ডেটা denormalize করুন</strong> — Elasticsearch একটি সার্চ ইঞ্জিন, রিলেশনাল ডাটাবেজ নয়। <code>nested</code> কেবল তখনই ব্যবহার করুন যখন সাব-অবজেক্টের ফিল্ডগুলোর মধ্যে <em>সম্পর্ক রেখে</em> সার্চ করতেই হবে। <code>join</code> সবচেয়ে ব্যয়বহুল — শেষ উপায় হিসেবে রাখুন।</p>
      <p><strong>সীমা:</strong> <code>index.mapping.nested_objects.limit</code> ডিফল্টে ১০,০০০ — একটি ডকুমেন্টে এর বেশি nested অবজেক্ট থাকলে প্রত্যাখ্যাত হবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Nested aggregation কীভাবে করবেন?</li>
        <li><code>flattened</code> ফিল্ড টাইপ কখন উপযোগী?</li>
      </ul>
    `
  },
  {
    id: "es-12",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Fuzzy","Algorithms"],
    question: "Elasticsearch Fuzzy Query কীভাবে Levenshtein Edit Distance ব্যবহার করে?",
    answer: `
      <p><strong>Fuzzy query</strong> টাইপো সহ্য করে — "লেভেনশটাইন এডিট ডিসট্যান্স" ব্যবহার করে কাছাকাছি বানানের শব্দও মেলায়।</p>
      <h4>Edit Distance</h4>
      <p>একটি শব্দকে অন্যটিতে রূপান্তর করতে ন্যূনতম কতগুলো অক্ষর-অপারেশন লাগে: <strong>যোগ</strong>, <strong>বাদ</strong>, <strong>প্রতিস্থাপন</strong>, এবং (Damerau সংস্করণে) <strong>স্থান বিনিময়</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>"laptop" → "laptp"    দূরত্ব 1  (একটি 'o' বাদ)
"laptop" → "labtop"   দূরত্ব 1  (p → b প্রতিস্থাপন)
"laptop" → "lapotp"   দূরত্ব 1  (transposition, Damerau-তে)
"laptop" → "desktop"  দূরত্ব 4  (অনেক দূরে)</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /products/_search
{
  "query": {
    "match": {
      "title": {
        "query": "labtop wireles",
        "fuzziness": "AUTO",          // ✅ প্রায় সবসময় AUTO ব্যবহার করুন
        "prefix_length": 2,           // প্রথম ২ অক্ষর অবশ্যই মিলতে হবে
        "max_expansions": 50,
        "fuzzy_transpositions": true
      }
    }
  }
}</code></pre>
      </div>
      <h4><code>fuzziness: "AUTO"</code> কেন গুরুত্বপূর্ণ</h4>
      <p>স্থির মান (যেমন <code>2</code>) দিলে ছোট শব্দে বিপর্যয় ঘটে — ৩ অক্ষরের শব্দে ২টি এডিট মানে প্রায় <em>যেকোনো</em> শব্দ মিলে যাবে। <code>AUTO</code> শব্দের দৈর্ঘ্য অনুযায়ী সমন্বয় করে:</p>
      <ul>
        <li><strong>০-২ অক্ষর:</strong> কোনো fuzziness নয় (হুবহু মিলতে হবে)</li>
        <li><strong>৩-৫ অক্ষর:</strong> ১টি এডিট</li>
        <li><strong>৬+ অক্ষর:</strong> ২টি এডিট</li>
      </ul>
      <h4>পারফরম্যান্স নিয়ন্ত্রণ</h4>
      <ul>
        <li><strong><code>prefix_length</code> সবচেয়ে কার্যকর:</strong> প্রথম কয়েকটি অক্ষর নির্দিষ্ট করে দিলে Elasticsearch-কে অনেক কম টার্ম পরীক্ষা করতে হয়। ১-২ দিলে গতি নাটকীয়ভাবে বাড়ে, এবং বাস্তবে মানুষ শব্দের শুরুতে কম ভুল করে।</li>
        <li><strong><code>max_expansions</code>:</strong> সর্বোচ্চ কতগুলো টার্ম-ভ্যারিয়েন্ট পরীক্ষা করা হবে। ডিফল্ট ৫০ — বাড়ালে ধীর হবে।</li>
      </ul>
      <p><strong>খরচ:</strong> Fuzzy query সাধারণ match-এর চেয়ে যথেষ্ট ধীর, কারণ প্রতিটি সার্চ টার্মের জন্য অনেক সম্ভাব্য ভ্যারিয়েন্ট তৈরি করে ইনডেক্সে খুঁজতে হয়।</p>
      <h4>বাস্তব কৌশল: সব কুয়েরিতে fuzzy দেবেন না</h4>
      <p>প্রথমে হুবহু মিল খুঁজুন; ফলাফল খুব কম বা শূন্য হলে <em>তখন</em> fuzzy দিয়ে আবার চেষ্টা করুন। এতে বেশিরভাগ কুয়েরি দ্রুত থাকে, আর টাইপো হলেও ইউজার ফল পান।</p>
      <p>আরও ভালো — <code>bool.should</code>-এ হুবহু মিলকে বেশি <code>boost</code> দিয়ে fuzzy মিলের সাথে রাখুন, যাতে সঠিক বানানের ফলাফল সবসময় উপরে থাকে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>"Did you mean?" সাজেশন কীভাবে তৈরি করবেন (phrase suggester)?</li>
        <li>Fuzzy search বাংলা টেক্সটে কতটা কার্যকর?</li>
      </ul>
    `
  },
  {
    id: "es-13",
    category: "Elasticsearch",
    difficulty: "Beginner",
    tags: ["Search","Highlighting","UI"],
    question: "Elasticsearch-এ Highlighting Search Results কীভাবে কাজ করে?",
    answer: `
      <p><strong>Highlighting</strong> সার্চ ফলাফলে মিলে যাওয়া শব্দগুলো চিহ্নিত করে দেখায় — ইউজার তখন বুঝতে পারেন কেন এই ফলাফলটি এসেছে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /articles/_search
{
  "query": { "match": { "content": "elasticsearch performance" } },
  "highlight": {
    "pre_tags":  ["&lt;mark&gt;"],
    "post_tags": ["&lt;/mark&gt;"],
    "fields": {
      "content": {
        "fragment_size": 150,          // প্রতিটি টুকরোর আকার
        "number_of_fragments": 3,       // সর্বোচ্চ ৩টি টুকরো
        "no_match_size": 100            // না মিললেও প্রথম 100 অক্ষর দেখাও
      },
      "title": { "number_of_fragments": 0 }   // 0 = পুরো ফিল্ড
    }
  }
}

# রেসপন্সে প্রতিটি hit-এ একটি "highlight" অবজেক্ট আসে
# "content": ["... &lt;mark&gt;Elasticsearch&lt;/mark&gt; এর &lt;mark&gt;performance&lt;/mark&gt; ..."]</code></pre>
      </div>
      <h4>তিনটি highlighter</h4>
      <table>
        <tr><th>Highlighter</th><th>গতি</th><th>প্রয়োজন</th></tr>
        <tr><td><strong>unified</strong> (ডিফল্ট)</td><td>ভালো</td><td>কিছু না</td></tr>
        <tr><td><strong>fvh</strong> (fast vector)</td><td>বড় ফিল্ডে দ্রুততম</td><td><code>term_vector: with_positions_offsets</code></td></tr>
        <tr><td><strong>plain</strong></td><td>ধীর</td><td>কিছু না (ছোট ফিল্ডে ঠিক আছে)</td></tr>
      </table>
      <p><strong>খরচ বোঝা জরুরি:</strong> Highlighting সার্চের সময় <code>_source</code> থেকে মূল টেক্সট পড়ে <em>পুনরায় analyze</em> করে — এটি ব্যয়বহুল। বড় ডকুমেন্টে (যেমন সম্পূর্ণ নিবন্ধ) এটি কুয়েরির সময় উল্লেখযোগ্যভাবে বাড়িয়ে দিতে পারে।</p>
      <p><strong>FVH দ্রুত কেন:</strong> এটি ইনডেক্সে আগে থেকে সংরক্ষিত term vector (অবস্থান ও অফসেট সহ) ব্যবহার করে, তাই পুনরায় analyze করতে হয় না। বিনিময়ে ইনডেক্সের আকার উল্লেখযোগ্যভাবে বাড়ে। <strong>বড় টেক্সট ফিল্ডে highlight করতে হলে এই আপসটি লাভজনক।</strong></p>
      <h4>ব্যবহারিক টিপ</h4>
      <ul>
        <li><strong><code>number_of_fragments: 0</code></strong> শিরোনামের মতো ছোট ফিল্ডে — টুকরো না করে পুরোটা ফেরত দেয়।</li>
        <li><strong>XSS সতর্কতা:</strong> highlight-এর ফলাফল HTML ট্যাগসহ আসে। ফ্রন্টএন্ডে সরাসরি <code>innerHTML</code>-এ বসালে ডকুমেন্টে থাকা কোনো স্ক্রিপ্ট চলে যেতে পারে। কাস্টম নিরাপদ ট্যাগ ব্যবহার করে সেগুলো নিজে প্রতিস্থাপন করুন।</li>
        <li><code>require_field_match: false</code> দিলে অন্য ফিল্ডের মিলও এই ফিল্ডে highlight হবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Highlighting কুয়েরি ধীর করছে — কী করবেন?</li>
        <li>Term vector সংরক্ষণ করলে ইনডেক্স কতটা বাড়ে?</li>
      </ul>
    `
  },
  {
    id: "es-14",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Internals","Memory","Doc Values"],
    question: "Elasticsearch Inverted Index-এর সাথে Doc Values এবং Fielddata-র পার্থক্য কী?",
    answer: `
      <p>Elasticsearch দুটি সম্পূর্ণ ভিন্ন ডেটা স্ট্রাকচার রাখে — একটি সার্চের জন্য, আরেকটি সাজানো ও aggregation-এর জন্য। এদের পার্থক্য বোঝা মেমরি সমস্যা ডিবাগ করার চাবি।</p>
      <table>
        <tr><th>দিক</th><th>Inverted Index</th><th>Doc Values</th></tr>
        <tr><td>দিক</td><td>টার্ম → ডকুমেন্ট</td><td>ডকুমেন্ট → মান</td></tr>
        <tr><td>ব্যবহার</td><td>সার্চ ("কোন ডকে এই শব্দ?")</td><td>Sort, aggregation, script</td></tr>
        <tr><td>কোথায় থাকে</td><td>ডিস্কে</td><td>ডিস্কে (OS ক্যাশে)</td></tr>
        <tr><td>কখন তৈরি</td><td>ইনডেক্স করার সময়</td><td>ইনডেক্স করার সময়</td></tr>
      </table>
      <p><strong>দুটোই দরকার কেন:</strong> Inverted index থেকে "সব ডকুমেন্টের price ফিল্ডের মান" বের করা অত্যন্ত অদক্ষ — এটি উল্টো দিকে কাজ করে। তাই Elasticsearch একই ডেটা <em>কলাম-ভিত্তিক</em> ফরম্যাটেও (doc values) লিখে রাখে, যা সাজানো ও গণনার জন্য আদর্শ।</p>
      <h4>Fielddata — বিপজ্জনক পুরনো ব্যবস্থা</h4>
      <p><code>text</code> ফিল্ডে doc values থাকে না (analyze করা টোকেন সাজানোর অর্থ হয় না)। তাই <code>text</code> ফিল্ডে aggregation করতে চাইলে Elasticsearch <strong>fielddata</strong> ব্যবহার করত — যা inverted index থেকে পুরো ডেটা পড়ে <strong>JVM heap-এ</strong> উল্টো ম্যাপ তৈরি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Fielddata is disabled on text fields by default. Set fielddata=true on
[description] in order to load fielddata in memory by uninverting the
inverted index.</code></pre>
      </div>
      <p><strong>এই এররটি দেখলে <code>fielddata: true</code> করবেন না।</strong> এটি সমস্যার সমাধান নয় — এটি একটি ফাঁদ। বড় ইনডেক্সে এটি পুরো heap খেয়ে ফেলে এবং নোড OOM-এ মারা যায়। এটি Elasticsearch ক্লাস্টার ধসিয়ে দেওয়ার সবচেয়ে সাধারণ কারণগুলোর একটি।</p>
      <p><strong>সঠিক সমাধান:</strong> একটি <code>keyword</code> সাব-ফিল্ড ব্যবহার করুন (<code>description.keyword</code>) — সেখানে doc values আছে এবং সেটি ডিস্ক থেকে দক্ষভাবে পড়া হয়।</p>
      <h4>Doc values বন্ধ করে জায়গা বাঁচানো</h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>"log_message_id": {
  "type": "keyword",
  "doc_values": false      // কখনও sort/aggregate করব না → ডিস্ক বাঁচে
}</code></pre>
      </div>
      <p>বিশাল লগ ইনডেক্সে যেসব ফিল্ডে কখনও aggregation হবে না, সেখানে <code>doc_values: false</code> দিলে উল্লেখযোগ্য ডিস্ক সাশ্রয় হয়। একইভাবে যেসব ফিল্ডে কখনও সার্চ হবে না সেখানে <code>index: false</code> দেওয়া যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Doc values ডিস্কে থাকলেও দ্রুত কেন?</li>
        <li>Circuit breaker কীভাবে fielddata-জনিত OOM ঠেকায়?</li>
      </ul>
    `
  },
  {
    id: "es-15",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Pagination","Search After","Scroll"],
    question: "Elasticsearch-এ Deep Pagination-এর জন্য Search After কেন ব্যবহার করা হয়?",
    answer: `
      <p>Elasticsearch-এ গভীর পেজিনেশন (deep pagination) একটি মৌলিক স্থাপত্যগত সমস্যা — এবং এর কারণ ডিস্ট্রিবিউটেড আর্কিটেকচার।</p>
      <h4>কেন <code>from/size</code> গভীরে গিয়ে ভেঙে পড়ে</h4>
      <p><code>from: 10000, size: 10</code> চাইলে কী ঘটে? ইনডেক্সে ৫টি shard থাকলে <strong>প্রতিটি shard-কে নিজের শীর্ষ ১০,০১০টি ডকুমেন্ট বের করে কো-অর্ডিনেটর নোডে পাঠাতে হয়</strong>। কো-অর্ডিনেটর ৫০,০৫০টি ফলাফল মেমরিতে নিয়ে সাজায়, তারপর মাঝের ১০টি ফেরত দেয় — বাকি সব ফেলে দেয়।</p>
      <p>মেমরি ও CPU খরচ পৃষ্ঠা নম্বরের সাথে <em>রৈখিকভাবে</em> বাড়ে। এজন্যই Elasticsearch-এ ডিফল্ট সীমা <code>index.max_result_window = 10000</code> — এর বেশি চাইলে এরর দেয়। <strong>এই সীমা বাড়ানো প্রায় সবসময়ই ভুল সিদ্ধান্ত</strong>; এটি ক্লাস্টার ধসিয়ে দেওয়ার সবচেয়ে সহজ উপায়।</p>
      <h4>সমাধান: <code>search_after</code></h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># প্রথম পৃষ্ঠা
GET /products/_search
{
  "size": 20,
  "sort": [
    { "created_at": "desc" },
    { "_id": "asc" }              // ⚠️ tie-breaker আবশ্যক
  ]
}

# পরের পৃষ্ঠা — শেষ ডকুমেন্টের sort মান দিন
GET /products/_search
{
  "size": 20,
  "search_after": [1723200000000, "product-8842"],
  "sort": [
    { "created_at": "desc" },
    { "_id": "asc" }
  ]
}</code></pre>
      </div>
      <p><strong>কেন এটি দ্রুত:</strong> প্রতিটি shard জানে ঠিক কোথা থেকে শুরু করতে হবে — সাজানো ইনডেক্সে সরাসরি সেই অবস্থানে চলে যায়। আগের সব ফলাফল আনার দরকারই পড়ে না। <strong>১০০তম পৃষ্ঠা ১ম পৃষ্ঠার মতোই দ্রুত।</strong></p>
      <h4>দুটি অপরিহার্য বিষয়</h4>
      <ul>
        <li><strong>Tie-breaker বাধ্যতামূলক:</strong> sort-এ একটি ইউনিক ফিল্ড (যেমন <code>_id</code>) শেষে যোগ করতেই হবে। নাহলে একই <code>created_at</code>-এর একাধিক ডকুমেন্ট থাকলে কিছু ডকুমেন্ট বাদ পড়বে বা দুবার আসবে।</li>
        <li><strong>র‍্যান্ডম অ্যাক্সেস সম্ভব নয়:</strong> সরাসরি ৫০তম পৃষ্ঠায় যাওয়া যায় না — ক্রমান্বয়ে এগোতে হয়। তাই এটি <strong>ইনফিনিট স্ক্রল ও "পরের পৃষ্ঠা" বোতামের জন্য উপযুক্ত</strong>, কিন্তু ক্লিকযোগ্য পৃষ্ঠা নম্বরের জন্য নয়।</li>
      </ul>
      <h4>Point in Time (PIT) — সঙ্গতিপূর্ণ ফলাফলের জন্য</h4>
      <p>পেজিনেশন চলাকালে নতুন ডকুমেন্ট ইনডেক্স হলে ফলাফল বদলে যেতে পারে। <strong>PIT</strong> একটি নির্দিষ্ট মুহূর্তের স্ন্যাপশট ধরে রাখে:</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>POST /products/_pit?keep_alive=5m      # → pit id পাবেন
# তারপর প্রতিটি রিকোয়েস্টে "pit": { "id": "...", "keep_alive": "5m" } দিন
DELETE /_pit                            # শেষে অবশ্যই ছেড়ে দিন</code></pre>
      </div>
      <p><strong>Scroll API কেন নয়:</strong> পুরনো <code>scroll</code> API এখন <em>deprecated</em> পেজিনেশনের জন্য। এটি সার্চ কনটেক্সট ধরে রাখে যা সম্পদ খরচ করে। বর্তমান প্রস্তাবনা — <strong>PIT + search_after</strong>। তবে সম্পূর্ণ ইনডেক্স এক্সপোর্ট করতে হলে <code>_reindex</code> বা <code>scroll</code> এখনও ব্যবহার হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>UI-তে পৃষ্ঠা নম্বর দেখাতেই হলে কী করবেন?</li>
        <li>PIT না ব্যবহার করলে কী ধরনের অসঙ্গতি দেখা যাবে?</li>
      </ul>
    `
  },
  {
    id: "es-16",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Ops","Aliases","Reindex"],
    question: "Elasticsearch Index Aliases কীভাবে Zero-Downtime Reindexing নিশ্চিত করে?",
    answer: `
      <p><strong>Alias</strong> হলো এক বা একাধিক ইনডেক্সের একটি বিকল্প নাম। এটি Elasticsearch-এ zero-downtime অপারেশনের ভিত্তি — এবং এমন একটি প্র্যাকটিস যা <em>শুরু থেকেই</em> ব্যবহার করা উচিত।</p>
      <h4>যে সমস্যাটি সমাধান করে</h4>
      <p>Elasticsearch-এ <strong>বিদ্যমান ফিল্ডের mapping পরিবর্তন করা যায় না</strong>। একটি ফিল্ডের টাইপ বদলাতে বা analyzer পরিবর্তন করতে হলে <em>নতুন ইনডেক্স তৈরি করে সব ডেটা reindex করা ছাড়া উপায় নেই</em>।</p>
      <p>অ্যাপ্লিকেশন যদি সরাসরি ইনডেক্সের নাম ব্যবহার করে, তাহলে মাইগ্রেশনের সময় কোড পরিবর্তন ও ডিপ্লয় লাগবে — এবং মাঝখানে ডাউনটাইম হবে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ১. নতুন ইনডেক্স তৈরি করুন (নতুন mapping সহ)
PUT /products-v2 { "mappings": { ... } }

# ২. ডেটা কপি করুন
POST /_reindex?wait_for_completion=false
{
  "source": { "index": "products-v1" },
  "dest":   { "index": "products-v2" }
}

# ৩. ⚡ অ্যাটমিক সোয়াপ — এক মুহূর্তেও কোনো ফাঁক থাকে না
POST /_aliases
{
  "actions": [
    { "remove": { "index": "products-v1", "alias": "products" } },
    { "add":    { "index": "products-v2", "alias": "products" } }
  ]
}

# ৪. যাচাই করে পুরনোটি মুছুন
DELETE /products-v1</code></pre>
      </div>
      <p><strong>ধাপ ৩-ই মূল কথা:</strong> <code>_aliases</code> API-র একাধিক action <strong>একটি অ্যাটমিক অপারেশন</strong> হিসেবে চলে। কোনো মুহূর্তে alias-টি দুটি ইনডেক্সে বা শূন্য ইনডেক্সে থাকে না — সোয়াপ সম্পূর্ণ নিরবচ্ছিন্ন।</p>
      <h4>Reindex চলাকালে নতুন ডেটা</h4>
      <p>Reindex-এ কয়েক ঘণ্টা লাগতে পারে, এবং সেই সময়ে নতুন ডকুমেন্ট আসতে থাকবে। দুটি কৌশল:</p>
      <ul>
        <li><strong>Dual write:</strong> অ্যাপ্লিকেশন সাময়িকভাবে দুটি ইনডেক্সেই লেখে।</li>
        <li><strong>Write alias আলাদা রাখা:</strong> <code>products-write</code> ও <code>products-read</code> — দুটি alias আলাদাভাবে সোয়াপ করা যায়।</li>
        <li>তারপর reindex-এর পর একটি delta reindex চালান (<code>range</code> query দিয়ে শুধু নতুন ডকুমেন্ট)।</li>
      </ul>
      <h4>Alias-এর অন্যান্য ব্যবহার</h4>
      <ul>
        <li><strong>একাধিক ইনডেক্সে একসাথে সার্চ:</strong> <code>logs-2026-*</code> ইনডেক্সগুলোকে একটি <code>logs</code> alias-এ যুক্ত করা।</li>
        <li><strong>Filtered alias (নিরাপত্তা):</strong> একটি alias-এ ফিল্টার যুক্ত করে টেন্যান্ট আলাদা করা — একটি গ্রাহক কেবল নিজের ডেটাই দেখবে।</li>
        <li><strong>Rollover:</strong> <code>is_write_index</code> সহ alias দিয়ে টাইম-সিরিজ ইনডেক্স স্বয়ংক্রিয়ভাবে ঘোরানো।</li>
      </ul>
      <p><strong>সোনালী নিয়ম:</strong> অ্যাপ্লিকেশন কোডে <em>কখনও</em> সরাসরি ইনডেক্সের নাম লিখবেন না — সবসময় alias ব্যবহার করুন। এই একটি অভ্যাস ভবিষ্যতের সব মাইগ্রেশনকে সহজ করে দেয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Reindex ব্যর্থ হলে বা মাঝপথে থামলে কী করবেন?</li>
        <li>Filtered alias কি নিরাপত্তার জন্য যথেষ্ট?</li>
      </ul>
    `
  },
  {
    id: "es-17",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Search","Percolator","Reverse Search"],
    question: "Elasticsearch Percolator Query কী?",
    answer: `
      <p><strong>Percolator</strong> সাধারণ সার্চের <em>উল্টো</em> কাজ করে। সাধারণত আপনি একটি কুয়েরি দিয়ে ডকুমেন্ট খোঁজেন; percolator-এ আপনি <strong>কুয়েরিগুলো ইনডেক্স করে রাখেন</strong>, তারপর একটি ডকুমেন্ট দিয়ে জিজ্ঞেস করেন — "এই ডকুমেন্টটি কোন কোন কুয়েরির সাথে মেলে?"</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ১. percolator ফিল্ড সহ ইনডেক্স
PUT /alerts
{ "mappings": { "properties": {
    "query":   { "type": "percolator" },
    "title":   { "type": "text" },
    "price":   { "type": "double" },
    "user_id": { "type": "keyword" }
}}}

# ২. ইউজারের সেভ করা সার্চ/অ্যালার্ট ইনডেক্স করুন
PUT /alerts/_doc/alert-1
{
  "user_id": "user-42",
  "query": { "bool": {
    "must":   [{ "match": { "title": "iphone" } }],
    "filter": [{ "range": { "price": { "lte": 80000 } } }]
  }}
}

# ৩. নতুন পণ্য এলে — কোন অ্যালার্টগুলো ম্যাচ করে?
GET /alerts/_search
{ "query": { "percolate": {
    "field": "query",
    "document": { "title": "Apple iPhone 15", "price": 75000 }
}}}
# → alert-1 ফেরত আসবে → user-42 কে নোটিফাই করুন</code></pre>
      </div>
      <h4>কোথায় ব্যবহার হয়</h4>
      <ul>
        <li><strong>Saved search alert:</strong> "দাম ৮০ হাজারের নিচে নামলে জানাও" — নতুন পণ্য এলেই সব সেভ করা অ্যালার্ট একবারে যাচাই।</li>
        <li><strong>কনটেন্ট মডারেশন:</strong> নিষিদ্ধ প্যাটার্নের কুয়েরি ইনডেক্স করে রেখে প্রতিটি নতুন পোস্ট পরীক্ষা করা।</li>
        <li><strong>রিয়েল-টাইম শ্রেণিবিভাগ:</strong> ইনকামিং লগ বা ইভেন্টকে নিয়মের ভিত্তিতে ট্যাগ করা।</li>
        <li><strong>মূল্য পর্যবেক্ষণ, চাকরির অ্যালার্ট, নিলামে বিড নোটিফিকেশন।</strong></li>
      </ul>
      <p><strong>কেন এটি কার্যকর:</strong> ১ লাখ সেভ করা অ্যালার্ট থাকলে প্রতিটি নতুন পণ্যের জন্য ১ লাখ কুয়েরি আলাদাভাবে চালানো অবাস্তব। Percolator ভেতরে একটি বুদ্ধিমান অপ্টিমাইজেশন ব্যবহার করে — ডকুমেন্টটিকে একটি ছোট অস্থায়ী ইনডেক্সে রেখে, প্রথমে কোন কুয়েরিগুলো <em>সম্ভাব্যভাবে</em> মিলতে পারে তা ছেঁকে নেয় (টার্ম-ভিত্তিক প্রাক-ফিল্টার), তারপর কেবল সেগুলোই চালায়।</p>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>ব্যয়বহুল</strong> সাধারণ সার্চের তুলনায় — প্রতিটি percolate একটি ক্ষুদ্র ইনডেক্স তৈরি করে।</li>
        <li><strong>ব্যাচ করুন:</strong> একসাথে একাধিক ডকুমেন্ট percolate করা অনেক বেশি দক্ষ।</li>
        <li><strong>Mapping মিলতে হবে:</strong> percolator ইনডেক্সের mapping-এ সেই সব ফিল্ড থাকতে হবে যা কুয়েরিতে ব্যবহৃত হয়।</li>
        <li>খুব উচ্চ থ্রুপুটে (সেকেন্ডে হাজারো ইভেন্ট) এটি bottleneck হতে পারে — তখন স্ট্রিম প্রসেসিং (Kafka Streams, Flink) বিবেচনা করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>লক্ষ লক্ষ সেভ করা অ্যালার্ট থাকলে কীভাবে স্কেল করবেন?</li>
        <li>Percolator বনাম Kafka Streams — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "es-18",
    category: "Elasticsearch",
    difficulty: "Beginner",
    tags: ["Monitoring","Cluster","Health"],
    question: "Elasticsearch Cluster Health-এর ৩টি স্টেট (Green, Yellow, Red) কী নির্দেশ করে?",
    answer: `
      <p>Cluster health-এর তিনটি রঙ ক্লাস্টারের সবচেয়ে দ্রুত স্বাস্থ্য-সূচক। কিন্তু এদের অর্থ প্রায়ই ভুল বোঝা হয় — <strong>রঙগুলো shard বরাদ্দ সম্পর্কে বলে, ডেটার ক্ষতি সম্পর্কে নয়</strong>।</p>
      <table>
        <tr><th>রঙ</th><th>অর্থ</th><th>ডেটা হারিয়েছে?</th><th>জরুরি?</th></tr>
        <tr><td>🟢 <strong>Green</strong></td><td>সব primary ও replica shard বরাদ্দকৃত</td><td>না</td><td>না</td></tr>
        <tr><td>🟡 <strong>Yellow</strong></td><td>সব primary ঠিক আছে, কিছু replica বরাদ্দ হয়নি</td><td><strong>না</strong></td><td>না — কিন্তু redundancy নেই</td></tr>
        <tr><td>🔴 <strong>Red</strong></td><td>অন্তত একটি <em>primary</em> shard অনুপলব্ধ</td><td><strong>হ্যাঁ (আংশিক)</strong></td><td><strong>হ্যাঁ</strong></td></tr>
      </table>
      <h4>Yellow নিয়ে আতঙ্কিত হবেন না</h4>
      <p>Yellow মানে <strong>সব ডেটা সম্পূর্ণ অক্ষত এবং সার্চ ও ইনডেক্সিং স্বাভাবিকভাবে চলছে</strong> — শুধু কিছু replica বরাদ্দ হয়নি, অর্থাৎ redundancy নেই। এখন একটি নোড হারালে ডেটা হারাতে পারে, কিন্তু এই মুহূর্তে কিছুই ভাঙেনি।</p>
      <p><strong>সবচেয়ে সাধারণ কারণ:</strong> একটি একক-নোড ক্লাস্টারে ইনডেক্স তৈরি করা যেখানে <code>number_of_replicas: 1</code> — Elasticsearch replica-কে <em>কখনও</em> primary-র সাথে একই নোডে রাখে না (তাতে redundancy-র উদ্দেশ্যই ব্যর্থ হতো)। তাই ডেভেলপমেন্টে single-node ক্লাস্টার প্রায় সবসময় yellow থাকে — এটি সম্পূর্ণ স্বাভাবিক।</p>
      <h4>Red — এখানে সত্যিই সমস্যা</h4>
      <p>Red মানে অন্তত একটি primary shard কোথাও নেই। ফলে <strong>সেই shard-এর ডেটা পড়া বা লেখা যাচ্ছে না</strong>, এবং সার্চের ফলাফল <em>আংশিক</em> হবে — নীরবে কিছু ডকুমেন্ট বাদ পড়বে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /_cluster/health
GET /_cluster/health?level=indices        # কোন ইনডেক্স red তা দেখুন

# সবচেয়ে দরকারি — কেন shard বরাদ্দ হচ্ছে না তার ব্যাখ্যা
GET /_cluster/allocation/explain

# অবরাদ্দকৃত shard-এর তালিকা ও কারণ
GET /_cat/shards?v&h=index,shard,prirep,state,unassigned.reason</code></pre>
      </div>
      <p><strong><code>_cluster/allocation/explain</code> আপনার প্রধান টুল</strong> — এটি মানুষের পড়ার মতো করে ব্যাখ্যা করে কেন একটি shard বরাদ্দ হতে পারছে না।</p>
      <h4>সাধারণ কারণ</h4>
      <ul>
        <li><strong>ডিস্ক watermark:</strong> নোডে ডিস্ক ৮৫% ভরলে Elasticsearch নতুন shard বরাদ্দ বন্ধ করে; ৯৫%-এ ইনডেক্স read-only হয়ে যায়। এটি সবচেয়ে সাধারণ কারণ।</li>
        <li><strong>নোড হারিয়ে যাওয়া</strong> — replica থাকলে Elasticsearch নিজেই তাকে primary বানিয়ে নেবে (yellow হয়ে তারপর green)।</li>
        <li><strong>Shard বরাদ্দের নিয়ম</strong> (awareness, filtering) পূরণ করা যাচ্ছে না।</li>
        <li><strong>করাপ্ট shard</strong> — snapshot থেকে restore করা ছাড়া উপায় নেই।</li>
      </ul>
      <p><strong>Alert-এর নিয়ম:</strong> Red-এ সাথে সাথে alert দিন। Yellow-এ একটি সতর্কতা যথেষ্ট — তবে yellow যদি <em>দীর্ঘ সময়</em> ধরে থাকে, সেটিও তদন্ত করা উচিত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Red অবস্থায় সার্চ করলে কী ফল পাবেন?</li>
        <li>ডিস্ক watermark-এ পৌঁছে গেলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-20",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Analysis","Analyzers","Tokenizers"],
    question: "Elasticsearch Text Analysis: Character Filters, Tokenizer, এবং Token Filters (Lowercase, Stemming, Stopwords) কীভাবে কাজ করে?",
    answer: `
      <p><strong>Analysis</strong> হলো টেক্সটকে সার্চযোগ্য টোকেনে রূপান্তরের প্রক্রিয়া। এটি তিনটি ধাপে ঘটে এবং <strong>ইনডেক্স করার সময় ও সার্চ করার সময় — দুবারই</strong> চলে।</p>
      <pre class="mermaid">
flowchart LR
    A["&lt;p&gt;The QUICK brown foxes!&lt;/p&gt;"] --> B["1. Character Filter<br/>HTML সরানো"]
    B --> C["The QUICK brown foxes!"]
    C --> D["2. Tokenizer<br/>শব্দে ভাঙা"]
    D --> E["[The][QUICK][brown][foxes]"]
    E --> F["3. Token Filter<br/>lowercase, stopword, stemming"]
    F --> G["[quick][brown][fox]"]
      </pre>
      <span class="diagram-caption">তিন ধাপ শেষে যে টোকেনগুলো থাকে, সেগুলোই inverted index-এ যায়</span>
      <ol>
        <li><strong>Character Filter:</strong> টোকেনাইজ করার <em>আগে</em> কাঁচা টেক্সট পরিবর্তন — HTML ট্যাগ সরানো, অক্ষর প্রতিস্থাপন।</li>
        <li><strong>Tokenizer:</strong> টেক্সটকে টোকেনে ভাঙা। <code>standard</code> tokenizer শব্দসীমা অনুযায়ী ভাঙে। ঠিক একটিই tokenizer থাকতে পারে।</li>
        <li><strong>Token Filter:</strong> টোকেন পরিবর্তন/যোগ/বাদ — lowercase, stopword বাদ, stemming, synonym যোগ। একাধিক থাকতে পারে, ক্রমানুসারে চলে।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /products
{
  "settings": {
    "analysis": {
      "analyzer": {
        "bangla_english": {
          "char_filter": ["html_strip"],
          "tokenizer": "standard",
          "filter": ["lowercase", "stop", "my_stemmer", "my_synonyms"]
        }
      },
      "filter": {
        "my_stemmer":  { "type": "stemmer", "language": "english" },
        "my_synonyms": { "type": "synonym",
                         "synonyms": ["mobile, phone, cellphone"] }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": { "type": "text", "analyzer": "bangla_english" }
    }
  }
}

# পরীক্ষা করুন — কী টোকেন তৈরি হচ্ছে দেখুন
POST /products/_analyze
{ "analyzer": "bangla_english", "text": "Running SHOES for men" }
# → [run] [shoe] [men]   ("for" stopword হিসেবে বাদ)</code></pre>
      </div>
      <h4>সবচেয়ে গুরুত্বপূর্ণ নিয়ম</h4>
      <p><strong>ইনডেক্স ও সার্চে একই analyzer ব্যবহার করতে হবে।</strong> ইনডেক্সে stemming করে <code>run</code> সংরক্ষণ করলেন, কিন্তু সার্চে stemming ছাড়া <code>running</code> খুঁজলেন — কিছুই মিলবে না। ডিফল্টে Elasticsearch একই analyzer ব্যবহার করে, কিন্তু <code>search_analyzer</code> দিয়ে আলাদা করা যায় (কখনও কখনও ইচ্ছাকৃতভাবে দরকার হয়, যেমন autocomplete-এ)।</p>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong><code>_analyze</code> API আপনার সেরা বন্ধু</strong> — "কেন এই ডকুমেন্ট মিলছে না" প্রশ্নের উত্তর প্রায়ই এখানেই পাওয়া যায়।</li>
        <li><strong>Analyzer পরিবর্তন করলে reindex করতেই হবে</strong> — বিদ্যমান ডকুমেন্ট পুরনো নিয়মে ইনডেক্স হয়ে আছে।</li>
        <li><strong>Stopword বাদ দেওয়ায় সতর্ক:</strong> "The Who" বা "to be or not to be" — সব শব্দই stopword হয়ে গেলে সার্চ অসম্ভব হয়ে পড়ে।</li>
        <li><strong>বাংলা টেক্সটে</strong> <code>icu_analysis</code> প্লাগইন বা কাস্টম কনফিগ লাগতে পারে; <code>standard</code> tokenizer বাংলা মোটামুটি সামলায় কিন্তু stemming নেই।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একই ফিল্ডে ভিন্ন analyzer দিয়ে সার্চ করতে চাইলে কী করবেন (multi-field)?</li>
        <li>Synonym পরিবর্তন করতে কি reindex লাগে?</li>
      </ul>
    `
  },
  {
    id: "es-21",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Queries","Match vs Term","Query Context"],
    question: "Match Query vs Term Query এবং Query Context vs Filter Context-এর পার্থক্য কী?",
    answer: `
      <p>এখানে দুটি আলাদা কিন্তু সম্পর্কিত ধারণা আছে — <strong>কুয়েরির ধরন</strong> (match বনাম term) এবং <strong>এক্সিকিউশন কনটেক্সট</strong> (query বনাম filter)।</p>
      <h4>Match বনাম Term</h4>
      <table>
        <tr><th>দিক</th><th><code>match</code></th><th><code>term</code></th></tr>
        <tr><td>সার্চ টার্ম analyze হয়?</td><td>✅ হ্যাঁ</td><td>❌ না — হুবহু ব্যবহার</td></tr>
        <tr><td>উপযুক্ত ফিল্ড</td><td><code>text</code></td><td><code>keyword</code>, সংখ্যা, তারিখ, boolean</td></tr>
        <tr><td>ব্যবহার</td><td>ফুল-টেক্সট সার্চ</td><td>হুবহু ফিল্টার</td></tr>
      </table>
      <p><strong>সবচেয়ে সাধারণ বাগ:</strong> <code>text</code> ফিল্ডে <code>term</code> কুয়েরি চালানো। ইনডেক্সে টোকেন আছে <code>[nike]</code> (lowercase), কিন্তু আপনি <code>term: "Nike"</code> খুঁজছেন — term কুয়েরি analyze করে না, তাই <code>"Nike"</code> হুবহু খোঁজা হয় এবং <strong>কিছুই মেলে না</strong>। কোনো এরর আসে না, শুধু খালি ফল।</p>
      <h4>Query Context বনাম Filter Context</h4>
      <p>এটি পারফরম্যান্সের দিক থেকে অত্যন্ত গুরুত্বপূর্ণ:</p>
      <ul>
        <li><strong>Query context</strong> ("এটি কতটা ভালোভাবে মেলে?") — BM25 দিয়ে <code>_score</code> গণনা করে। ক্যাশ হয় না।</li>
        <li><strong>Filter context</strong> ("এটি কি মেলে? হ্যাঁ/না") — স্কোর গণনা করে না, তাই <strong>দ্রুত</strong> এবং ফলাফল <strong>ক্যাশ হয়</strong> (bitset হিসেবে)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /products/_search
{
  "query": {
    "bool": {
      "must": [                              // query context — স্কোর গণনা হয়
        { "match": { "description": "wireless headphones" } }
      ],
      "filter": [                            // filter context — দ্রুত ও ক্যাশড
        { "term":  { "status": "active" } },
        { "term":  { "brand.keyword": "Sony" } },
        { "range": { "price": { "gte": 1000, "lte": 5000 } } }
      ],
      "should": [                            // ঐচ্ছিক — মিললে স্কোর বাড়ে
        { "match": { "tags": "bestseller" } }
      ],
      "must_not": [                          // filter context (স্কোরহীন)
        { "term": { "discontinued": true } }
      ]
    }
  }
}</code></pre>
      </div>
      <h4>bool-এর চারটি ধারা</h4>
      <ul>
        <li><strong><code>must</code>:</strong> মিলতেই হবে, এবং স্কোরে অবদান রাখে।</li>
        <li><strong><code>filter</code>:</strong> মিলতেই হবে, কিন্তু স্কোরে অবদান নেই — <strong>ক্যাশযোগ্য</strong>।</li>
        <li><strong><code>should</code>:</strong> মিললে স্কোর বাড়ে। (কোনো <code>must</code>/<code>filter</code> না থাকলে অন্তত একটি <code>should</code> মিলতে হবে।)</li>
        <li><strong><code>must_not</code>:</strong> মিললে বাদ। filter context-এ চলে।</li>
      </ul>
      <p><strong>একটি অপ্টিমাইজেশন যা বিশাল পার্থক্য গড়ে:</strong> যেকোনো হ্যাঁ/না শর্ত (স্ট্যাটাস, ক্যাটাগরি, দামের রেঞ্জ, তারিখ) <code>must</code>-এর বদলে <code>filter</code>-এ রাখুন। স্কোরের প্রয়োজন নেই, আর ক্যাশিংয়ের কারণে পুনরাবৃত্ত কুয়েরি নাটকীয়ভাবে দ্রুত হয়। এটি Elasticsearch পারফরম্যান্স টিউনিংয়ের সবচেয়ে সহজ ও কার্যকর পদক্ষেপ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Filter cache কখন invalidate হয়?</li>
        <li><code>match_phrase</code> ও <code>match</code>-এর পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "es-22",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Aggregations","Metric vs Bucket","Analytics"],
    question: "Elasticsearch Aggregations: Metric Aggregations vs Bucket Aggregations (Terms, Date Histogram) কীভাবে কাজ করে?",
    answer: `
      <p><strong>Aggregation</strong> Elasticsearch-এর বিশ্লেষণী ইঞ্জিন — এটি সার্চের ফলাফলের উপর সারসংক্ষেপ, গ্রুপিং ও পরিসংখ্যান তৈরি করে। Kibana-র প্রতিটি চার্ট আসলে একটি aggregation।</p>
      <h4>দুটি প্রধান ধরন</h4>
      <ul>
        <li><strong>Bucket aggregation:</strong> ডকুমেন্টগুলোকে দলে ভাগ করে (SQL-এর <code>GROUP BY</code>)। যেমন <code>terms</code>, <code>date_histogram</code>, <code>range</code>, <code>filters</code>।</li>
        <li><strong>Metric aggregation:</strong> সংখ্যা গণনা করে (SQL-এর <code>SUM</code>, <code>AVG</code>)। যেমন <code>sum</code>, <code>avg</code>, <code>min</code>, <code>max</code>, <code>cardinality</code>, <code>percentiles</code>।</li>
      </ul>
      <p><strong>মূল শক্তি — নেস্টিং:</strong> bucket-এর ভেতরে metric, এবং bucket-এর ভেতরে আরও bucket রাখা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /orders/_search
{
  "size": 0,                              // ⚠️ ডকুমেন্ট লাগবে না, শুধু aggregation
  "query": { "range": { "created_at": { "gte": "now-30d" } } },
  "aggs": {
    "per_day": {
      "date_histogram": {
        "field": "created_at",
        "calendar_interval": "day",
        "min_doc_count": 0                // খালি দিনও দেখাও (চার্টে ফাঁক এড়াতে)
      },
      "aggs": {
        "revenue":     { "sum": { "field": "total" } },
        "avg_order":   { "avg": { "field": "total" } },
        "unique_users":{ "cardinality": { "field": "user_id" } },
        "top_products": {
          "terms": { "field": "product.keyword", "size": 5 }
        }
      }
    }
  }
}</code></pre>
      </div>
      <p><strong><code>"size": 0</code> দিতে ভুলবেন না</strong> — নাহলে Elasticsearch অপ্রয়োজনীয়ভাবে ১০টি ডকুমেন্টও ফেরত দেবে এবং নেটওয়ার্ক ও মেমরি নষ্ট হবে।</p>
      <h4>একটি গুরুত্বপূর্ণ সীমাবদ্ধতা: terms aggregation আনুমানিক</h4>
      <p>ডিস্ট্রিবিউটেড পরিবেশে <code>terms</code> aggregation-এর ফল <strong>নিখুঁত নাও হতে পারে</strong>। প্রতিটি shard নিজের শীর্ষ N টার্ম পাঠায়; একটি টার্ম যদি কোনো shard-এ শীর্ষ N-এ না পড়ে কিন্তু অন্যগুলোতে থাকে, তার মোট গণনা কম দেখাতে পারে।</p>
      <p><code>doc_count_error_upper_bound</code> ফিল্ডটি এই সম্ভাব্য ত্রুটি জানায়। নির্ভুলতা বাড়াতে <code>shard_size</code> বাড়ানো যায় (মেমরি খরচের বিনিময়ে)।</p>
      <p>একইভাবে <code>cardinality</code> (ইউনিক গণনা) HyperLogLog++ ব্যবহার করে — এটিও আনুমানিক (~০.৫% ত্রুটি), কিন্তু বিশাল কম মেমরিতে।</p>
      <h4>পারফরম্যান্স বিবেচনা</h4>
      <ul>
        <li><strong>Doc values দরকার</strong> — <code>text</code> ফিল্ডে aggregation করা যায় না, <code>.keyword</code> ব্যবহার করুন।</li>
        <li><strong>উচ্চ cardinality বিপজ্জনক:</strong> লক্ষ লক্ষ ইউনিক মানের ফিল্ডে <code>terms</code> aggregation বিপুল মেমরি খায়। <code>search.max_buckets</code> (ডিফল্ট ৬৫,৫৩৬) এটি আটকায়।</li>
        <li><strong>গভীর নেস্টিং বিস্ফোরক:</strong> ৩ স্তরের নেস্টেড aggregation মানে bucket সংখ্যা গুণিতক হারে বাড়ে।</li>
        <li><strong>Filter context ব্যবহার করুন</strong> — aggregation-এর আগে <code>filter</code> দিয়ে ডকুমেন্ট সংখ্যা কমালে সব aggregation দ্রুত হয়।</li>
      </ul>
      <h4>Pipeline aggregation</h4>
      <p>অন্য aggregation-এর ফলাফলের উপর গণনা — যেমন <code>derivative</code> (দৈনিক পরিবর্তনের হার), <code>moving_avg</code>, <code>cumulative_sum</code>। ট্রেন্ড বিশ্লেষণে অত্যন্ত কার্যকর।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Terms aggregation-এর ফল নিখুঁত করতে কী করবেন?</li>
        <li>বিশাল ডেটাসেটে aggregation ধীর হলে কী কৌশল নেবেন?</li>
      </ul>
    `
  },
  {
    id: "es-23",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Mapping","Dynamic Mapping","Explicit Mapping"],
    question: "Dynamic Mapping vs Explicit Mapping এবং Dynamic Templates কীভাবে কনফিগার করবেন?",
    answer: `
      <p>Elasticsearch নতুন ফিল্ড দেখলে স্বয়ংক্রিয়ভাবে তার টাইপ অনুমান করে mapping তৈরি করে — একে <strong>dynamic mapping</strong> বলে। এটি শুরুতে সুবিধাজনক, কিন্তু প্রোডাকশনে বিপজ্জনক।</p>
      <h4>Dynamic mapping-এর তিনটি ঝুঁকি</h4>
      <ul>
        <li><strong>ভুল টাইপ অনুমান:</strong> প্রথম ডকুমেন্টে <code>"zipcode": "1207"</code> এলে সেটি <code>text</code> হবে; কিন্তু যদি <code>"zipcode": 1207</code> আসত, তবে <code>long</code> হতো। একবার নির্ধারিত হলে <strong>আর বদলানো যায় না</strong> — reindex ছাড়া।</li>
        <li><strong>Mapping explosion:</strong> ডায়নামিক কী-যুক্ত ডেটা (যেমন <code>{"user_123_score": 5}</code>) ইনডেক্স করলে হাজারো ফিল্ড তৈরি হয়। প্রতিটি ফিল্ড ক্লাস্টার state-এ মেমরি খায় — ক্লাস্টার অস্থির হয়ে পড়ে।</li>
        <li><strong>অপ্রয়োজনীয় ইনডেক্সিং:</strong> প্রতিটি স্ট্রিং ডিফল্টে <code>text</code> + <code>keyword</code> দুটোই হয় — ডিস্ক ও ইনডেক্সিং সময় দ্বিগুণ।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /products
{
  "mappings": {
    "dynamic": "strict",              // অজানা ফিল্ড এলে ডকুমেন্ট প্রত্যাখ্যান
    // "dynamic": false,              // উপেক্ষা করে (সংরক্ষণ করে, ইনডেক্স নয়)
    // "dynamic": "runtime",          // runtime field হিসেবে যোগ করে

    "properties": {
      "sku":   { "type": "keyword" },
      "title": { "type": "text",
                 "fields": { "keyword": { "type": "keyword", "ignore_above": 256 } } },
      "price": { "type": "scaled_float", "scaling_factor": 100 },
      "created_at": { "type": "date" }
    }
  }
}</code></pre>
      </div>
      <h4><code>dynamic</code>-এর চারটি মান</h4>
      <table>
        <tr><th>মান</th><th>আচরণ</th><th>কখন</th></tr>
        <tr><td><code>true</code></td><td>নতুন ফিল্ড যোগ করে (ডিফল্ট)</td><td>প্রোটোটাইপিং</td></tr>
        <tr><td><code>runtime</code></td><td>runtime field হিসেবে যোগ (ইনডেক্স হয় না)</td><td>নমনীয়তা + নিয়ন্ত্রণ</td></tr>
        <tr><td><code>false</code></td><td>উপেক্ষা করে, কিন্তু <code>_source</code>-এ থাকে</td><td>অতিরিক্ত ডেটা সংরক্ষণ</td></tr>
        <tr><td><code>strict</code></td><td>ডকুমেন্ট <strong>প্রত্যাখ্যান</strong> করে</td><td><strong>প্রোডাকশনে প্রস্তাবিত</strong></td></tr>
      </table>
      <p><code>strict</code> সবচেয়ে নিরাপদ — একটি টাইপো (<code>"pirce"</code>) সাথে সাথে ধরা পড়ে, নীরবে একটি নতুন ফিল্ড তৈরি করে না।</p>
      <h4>Dynamic Template — দুয়ের মাঝামাঝি</h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>"dynamic_templates": [
  {
    "strings_as_keyword": {
      "match_mapping_type": "string",
      "mapping": { "type": "keyword", "ignore_above": 256 }
    }
  },
  {
    "metrics_as_double": {
      "match": "metric_*",              // নামের প্যাটার্ন
      "mapping": { "type": "double" }
    }
  }
]</code></pre>
      </div>
      <p>লগ ইনডেক্সে এটি অত্যন্ত কার্যকর — সব স্ট্রিংকে <code>keyword</code> বানিয়ে দিলে অপ্রয়োজনীয় full-text ইনডেক্সিং এড়ানো যায়, অথচ নতুন ফিল্ড এলেও ভাঙে না।</p>
      <p><strong>সুরক্ষা:</strong> <code>index.mapping.total_fields.limit</code> (ডিফল্ট ১০০০) mapping explosion আটকায়। এই সীমায় পৌঁছালে সেটি বাড়ানোর আগে ভাবুন — সাধারণত এটি একটি ডিজাইন সমস্যার সংকেত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>বিদ্যমান ইনডেক্সে নতুন ফিল্ড যোগ করা যায় কি?</li>
        <li>Runtime field কখন উপযোগী?</li>
      </ul>
    `
  },
  {
    id: "es-24",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Text vs Keyword","Field Types","Mapping"],
    question: "Elasticsearch Text Field Type vs Keyword Field Type-এর পার্থক্য ও ব্যবহার কী?",
    answer: `
      <p>এটি Elasticsearch-এর সবচেয়ে মৌলিক ও সবচেয়ে বেশি ভুল বোঝা ধারণা — এবং বেশিরভাগ "আমার সার্চ কাজ করছে না" সমস্যার মূল কারণ।</p>
      <table>
        <tr><th>দিক</th><th><code>text</code></th><th><code>keyword</code></th></tr>
        <tr><td>Analyze হয়?</td><td>✅ হ্যাঁ — টোকেনে ভাঙা হয়</td><td>❌ না — পুরোটা একটি টোকেন</td></tr>
        <tr><td>উপযুক্ত</td><td>ফুল-টেক্সট সার্চ</td><td>হুবহু মিল, ফিল্টার, সাজানো, aggregation</td></tr>
        <tr><td>Aggregation</td><td>❌ ডিফল্টে অসম্ভব</td><td>✅ দ্রুত</td></tr>
        <tr><td>Sorting</td><td>❌ অর্থহীন</td><td>✅ হ্যাঁ</td></tr>
        <tr><td>উদাহরণ</td><td>পণ্যের বর্ণনা</td><td>স্ট্যাটাস, ট্যাগ, ইমেইল, আইডি</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>মান: "Nike Air Max"

text  হিসেবে   → [nike] [air] [max]        (৩টি টোকেন)
keyword হিসেবে → ["Nike Air Max"]           (১টি টোকেন, হুবহু)

তাই:
  term query "nike"        → text-এ মেলে ✅, keyword-এ মেলে না ❌
  term query "Nike Air Max" → keyword-এ মেলে ✅, text-এ মেলে না ❌</code></pre>
      </div>
      <h4>সমাধান: Multi-field</h4>
      <p>বাস্তবে প্রায়ই দুটোই দরকার — বর্ণনায় সার্চ করতে হবে <em>এবং</em> ব্র্যান্ড অনুযায়ী aggregation করতে হবে। Elasticsearch-এর dynamic mapping এটি স্বয়ংক্রিয়ভাবে করে:</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>"brand": {
  "type": "text",                          // ফুল-টেক্সট সার্চের জন্য
  "fields": {
    "keyword": {                            // সাব-ফিল্ড
      "type": "keyword",
      "ignore_above": 256                   // ২৫৬ অক্ষরের বেশি হলে ইনডেক্স হবে না
    }
  }
}

# ব্যবহার:
GET /products/_search
{
  "query":  { "match": { "brand": "nike air" } },      // text ফিল্ড
  "aggs":   { "brands": { "terms": { "field": "brand.keyword" } } }  // keyword
}</code></pre>
      </div>
      <p><strong><code>.keyword</code> সাফিক্স</strong> — এটিই সেই বহুল ব্যবহৃত প্যাটার্ন যা প্রায় প্রতিটি Elasticsearch কুয়েরিতে দেখা যায়।</p>
      <h4>যে ভুলগুলো সবচেয়ে বেশি হয়</h4>
      <ul>
        <li><strong><code>text</code> ফিল্ডে aggregation করার চেষ্টা</strong> → এরর ("Fielddata is disabled")। <code>.keyword</code> ব্যবহার করুন। <em>কখনও <code>fielddata: true</code> চালু করবেন না</em> — এটি বিপুল heap খেয়ে ক্লাস্টার ধসিয়ে দেয়।</li>
        <li><strong>আইডি বা স্ট্যাটাসকে <code>text</code> করা</strong> → অপ্রয়োজনীয় analysis, ভুল মিল এবং জায়গার অপচয়। এগুলো সবসময় <code>keyword</code>।</li>
        <li><strong><code>ignore_above</code> ভুলে যাওয়া</strong> → খুব লম্বা স্ট্রিং keyword হিসেবে ইনডেক্স হলে Lucene-এর সীমা (৩২ KB) অতিক্রম করে ডকুমেন্ট প্রত্যাখ্যাত হয়।</li>
        <li><strong>keyword-এ case-sensitivity:</strong> <code>"Nike"</code> ও <code>"nike"</code> সম্পূর্ণ ভিন্ন। case-insensitive হুবহু মিল চাইলে <code>normalizer</code> দিয়ে lowercase করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ইমেইল ঠিকানা কোন টাইপে রাখবেন এবং কেন?</li>
        <li>Dynamic mapping কীভাবে স্বয়ংক্রিয়ভাবে multi-field তৈরি করে?</li>
      </ul>
    `
  },
  {
    id: "es-26",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Reindex","Scroll","Task Management"],
    question: "Reindex API (POST _reindex) দিয়ে লাইভ ইনডেক্স মাইগ্রেশন কীভাবে করবেন?",
    answer: `
      <p><code>_reindex</code> API একটি ইনডেক্স থেকে অন্যটিতে ডকুমেন্ট কপি করে। Mapping পরিবর্তন, analyzer পরিবর্তন বা shard সংখ্যা বদলানোর একমাত্র উপায় এটিই — কারণ এসব বিদ্যমান ইনডেক্সে বদলানো যায় না।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>POST /_reindex?wait_for_completion=false&slices=auto
{
  "source": {
    "index": "products-v1",
    "size": 2000,
    "query": { "range": { "updated_at": { "gte": "2026-01-01" } } }
  },
  "dest": { "index": "products-v2", "op_type": "create" },
  "script": {
    "source": """
      ctx._source.full_name = ctx._source.first_name + ' ' + ctx._source.last_name;
      ctx._source.remove('first_name');
      ctx._source.remove('last_name');
    """
  }
}
# → task id ফেরত আসবে</code></pre>
      </div>
      <h4>দুটি অপরিহার্য প্যারামিটার</h4>
      <ul>
        <li><strong><code>wait_for_completion=false</code>:</strong> Reindex ঘণ্টার পর ঘণ্টা চলতে পারে। এটি ছাড়া HTTP কানেকশন টাইমআউট হয়ে যাবে (যদিও কাজ চলতে থাকবে)। এর বদলে একটি task id নিয়ে অগ্রগতি দেখুন।</li>
        <li><strong><code>slices=auto</code>:</strong> কাজটি shard অনুযায়ী সমান্তরাল অংশে ভাগ করে — নাটকীয়ভাবে দ্রুত।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET _tasks/TASK_ID                    # অগ্রগতি দেখুন
POST _tasks/TASK_ID/_cancel            # বাতিল করুন

# ধীর করতে (প্রোডাকশনে চাপ কমাতে)
POST _reindex/TASK_ID/_rethrottle?requests_per_second=1000</code></pre>
      </div>
      <h4>লাইভ ইনডেক্স মাইগ্রেশনের সম্পূর্ণ কৌশল</h4>
      <ol>
        <li>নতুন mapping দিয়ে <code>products-v2</code> তৈরি করুন। ইনডেক্সিং গতির জন্য <code>refresh_interval: -1</code> ও <code>number_of_replicas: 0</code> দিন।</li>
        <li>অ্যাপ্লিকেশনকে <strong>দুটি ইনডেক্সেই লিখতে</strong> বলুন (dual write), অথবা সব পরিবর্তন একটি কিউতে জমা রাখুন।</li>
        <li><code>_reindex</code> চালান।</li>
        <li>শেষ হলে একটি <strong>delta reindex</strong> চালান — reindex শুরুর পর যেসব ডকুমেন্ট বদলেছে সেগুলোর জন্য (<code>updated_at</code> range query দিয়ে)।</li>
        <li>ডকুমেন্ট সংখ্যা ও নমুনা ফলাফল যাচাই করুন।</li>
        <li><code>refresh_interval</code> ও replica ফিরিয়ে আনুন।</li>
        <li><strong>Alias অ্যাটমিকভাবে সোয়াপ করুন</strong> — এটিই zero-downtime নিশ্চিত করে।</li>
        <li>কিছুদিন পর্যবেক্ষণ করে পুরনো ইনডেক্স মুছুন।</li>
      </ol>
      <h4>সতর্কতা</h4>
      <ul>
        <li><strong><code>op_type: "create"</code></strong> দিলে গন্তব্যে ইতিমধ্যে থাকা ডকুমেন্ট ওভাররাইট হবে না — dual write চলাকালে নতুন ডেটা পুরনো দিয়ে চাপা পড়া রোধ করে।</li>
        <li><strong>Script যতটা সম্ভব সরল রাখুন</strong> — প্রতিটি ডকুমেন্টে চলে, তাই ধীর script পুরো প্রক্রিয়া দীর্ঘায়িত করে।</li>
        <li><strong>Reindex ক্লাস্টারে চাপ ফেলে</strong> — প্রোডাকশনে কম ট্রাফিকের সময় চালান এবং <code>requests_per_second</code> দিয়ে throttle করুন।</li>
        <li><strong>Remote reindex</strong> (<code>source.remote</code>) দিয়ে ভিন্ন ক্লাস্টার থেকেও আনা যায় — ক্লাস্টার আপগ্রেডে কাজে লাগে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Reindex মাঝপথে ব্যর্থ হলে আবার শুরু করবেন কীভাবে?</li>
        <li>দুটি ইনডেক্সের ডেটা মিলছে কি না কীভাবে যাচাই করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-27",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Performance","Bulk API","Indexing Speed"],
    question: "Elasticsearch Bulk API (_bulk) এবং Refresh Interval টিউন করে ইনডেক্সিং স্পিড কীভাবে বাড়াবেন?",
    answer: `
      <p>Elasticsearch-এ ইনডেক্সিং গতি বাড়ানোর দুটি প্রধান উপায় — <strong>bulk API</strong> ব্যবহার এবং <strong>refresh interval</strong> টিউন করা।</p>
      <h4>১. Bulk API</h4>
      <p>প্রতিটি ডকুমেন্ট আলাদাভাবে ইনডেক্স করলে প্রতিটিতে একটি HTTP রাউন্ড-ট্রিপ ও কো-অর্ডিনেশন ওভারহেড যায়। Bulk API একসাথে অনেকগুলো পাঠায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ⚠️ bulk আংশিকভাবে ব্যর্থ হতে পারে — প্রতিটি আইটেমের ফল যাচাই করুন
const result = await client.bulk({ refresh: false, operations });

if (result.errors) {
  result.items.forEach((item, i) => {
    const op = item.index ?? item.create ?? item.update;
    if (op.error) {
      logger.error({ doc: i, error: op.error }, 'bulk আইটেম ব্যর্থ');
    }
  });
}
// HTTP 200 এলেও কিছু ডকুমেন্ট ব্যর্থ হতে পারে — এটিই সবচেয়ে বড় ফাঁদ</code></pre>
      </div>
      <p><strong>ব্যাচের আকার:</strong> ডকুমেন্ট সংখ্যা নয়, <strong>পেলোডের আকার</strong> দিয়ে ভাবুন — <strong>৫-১৫ MB</strong> সাধারণত আদর্শ। খুব বড় ব্যাচ মেমরি চাপ ও circuit breaker ট্রিগার করে। আপনার ডেটায় সঠিক সংখ্যা পরীক্ষা করে বের করুন।</p>
      <h4>২. Refresh Interval</h4>
      <p>Elasticsearch ডিফল্টে প্রতি <strong>১ সেকেন্ডে</strong> refresh করে — অর্থাৎ in-memory buffer থেকে একটি নতুন segment তৈরি করে, যাতে নতুন ডকুমেন্ট সার্চযোগ্য হয়। এটিই Elasticsearch-এর "near real-time" আচরণ।</p>
      <p>কিন্তু প্রতিটি refresh একটি নতুন segment তৈরি করে, এবং বেশি segment মানে বেশি merge কাজ। বাল্ক ইনডেক্সিংয়ের সময় এটি বিশাল অপচয়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># বড় ইমপোর্টের আগে
PUT /my-index/_settings
{ "index": { "refresh_interval": "-1", "number_of_replicas": 0 } }

# ... বাল্ক ইনডেক্সিং চালান ...

# শেষে আগের অবস্থায় ফিরিয়ে আনুন
PUT /my-index/_settings
{ "index": { "refresh_interval": "1s", "number_of_replicas": 1 } }
POST /my-index/_forcemerge?max_num_segments=1
POST /my-index/_refresh</code></pre>
      </div>
      <p><strong>Replica ০ করা কেন কার্যকর:</strong> রেপ্লিকা থাকলে প্রতিটি ডকুমেন্ট দুবার ইনডেক্স করতে হয় (primary ও replica উভয়ে analysis চলে)। ইমপোর্টের সময় ০ করে পরে ফিরিয়ে আনলে Elasticsearch শুধু ফাইল কপি করে — অনেক দ্রুত। <em>তবে এই সময়ে কোনো redundancy থাকে না</em>, তাই কেবল পুনরুৎপাদনযোগ্য ইমপোর্টে করুন।</p>
      <h4>অন্যান্য টিপ</h4>
      <ul>
        <li><strong>নিজে <code>_id</code> দেবেন না</strong> যদি প্রয়োজন না হয় — Elasticsearch স্বয়ংক্রিয় আইডি ব্যবহার করলে ডুপ্লিকেট চেক এড়াতে পারে, যা দ্রুততর।</li>
        <li><strong>একাধিক থ্রেড/প্রসেস থেকে সমান্তরালে</strong> bulk পাঠান — একটি ক্লায়েন্ট থ্রেড সাধারণত ক্লাস্টারকে পূর্ণ ব্যবহার করতে পারে না।</li>
        <li><strong><code>refresh: true</code> কখনও bulk-এ দেবেন না</strong> — এটি প্রতিটি ব্যাচে জোর করে refresh করায় সব সুবিধা নষ্ট হয়ে যায়।</li>
        <li><strong>429 (rejected) এলে</strong> ব্যাচের আকার বা সমান্তরালতা কমান — ক্লায়েন্টে backoff লজিক রাখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Refresh, flush ও fsync-এর মধ্যে সম্পর্ক কী?</li>
        <li>ইনডেক্সিংয়ের সময় সার্চ ধীর হয়ে গেলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-28",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Multi-match","Cross Fields"],
    question: "Multi-match Query Types: best_fields, most_fields, cross_fields-এর পার্থক্য কী?",
    answer: `
      <p><code>multi_match</code> একাধিক ফিল্ডে একসাথে সার্চ করে, এবং <code>type</code> প্যারামিটার ঠিক করে ফিল্ডগুলোর স্কোর কীভাবে মিলবে — এটি প্রাসঙ্গিকতায় বড় পার্থক্য গড়ে।</p>
      <table>
        <tr><th>Type</th><th>স্কোরিং</th><th>উপযুক্ত</th></tr>
        <tr><td><strong>best_fields</strong> (ডিফল্ট)</td><td>সবচেয়ে ভালো মেলা <em>একটি</em> ফিল্ডের স্কোর</td><td>একই ধারণা ভিন্ন ফিল্ডে (title, description)</td></tr>
        <tr><td><strong>most_fields</strong></td><td>সব মেলা ফিল্ডের স্কোর <em>যোগ</em></td><td>একই টেক্সট ভিন্নভাবে analyze করা</td></tr>
        <tr><td><strong>cross_fields</strong></td><td>সব ফিল্ডকে <em>একটি বড় ফিল্ড</em> হিসেবে গণ্য</td><td>একটি সত্তার নাম ভিন্ন ফিল্ডে ছড়ানো</td></tr>
        <tr><td><strong>phrase</strong></td><td>শব্দক্রম বজায় রেখে</td><td>হুবহু বাক্যাংশ</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>{ "multi_match": {
    "query": "wireless bluetooth headphones",
    "fields": ["title^3", "brand^2", "description"],   // ^ = boost
    "type": "best_fields",
    "tie_breaker": 0.3,          // অন্য ফিল্ডের স্কোরও ৩০% গণনায় আসবে
    "fuzziness": "AUTO"
}}</code></pre>
      </div>
      <h4>কখন কোনটি — বাস্তব উদাহরণ</h4>
      <p><strong><code>best_fields</code>:</strong> "wireless headphones" খুঁজলে — যে ডকুমেন্টে <em>একটি ফিল্ডে</em> দুটি শব্দই আছে, সেটি ভালো। যে ডকুমেন্টে title-এ "wireless" আর description-এ "headphones" আলাদাভাবে আছে, সেটি কম প্রাসঙ্গিক। এই ধারণাই ডিফল্ট, এবং বেশিরভাগ ক্ষেত্রে সঠিক।</p>
      <p><strong><code>tie_breaker</code> কেন দরকার:</strong> বিশুদ্ধ <code>best_fields</code> অন্য ফিল্ডের মিল সম্পূর্ণ উপেক্ষা করে। ০.৩ দিলে সেরা ফিল্ডের পূর্ণ স্কোর + বাকিদের ৩০% যোগ হয় — যা সাধারণত আরও ভালো র‍্যাঙ্কিং দেয়।</p>
      <p><strong><code>cross_fields</code>-এর ক্লাসিক উদাহরণ:</strong> "Rahim Uddin" খুঁজছেন, কিন্তু <code>first_name: "Rahim"</code> ও <code>last_name: "Uddin"</code> আলাদা ফিল্ডে। <code>best_fields</code>-এ কোনো একক ফিল্ডে দুটি শব্দই নেই, তাই স্কোর কম। <code>cross_fields</code> ফিল্ডগুলোকে একত্রে দেখে — সঠিকভাবে মেলায়।</p>
      <p><strong><code>most_fields</code>-এর ব্যবহার:</strong> একই টেক্সট তিনভাবে ইনডেক্স করা (মূল, stemmed, n-gram)। যত বেশি বিশ্লেষণে মেলে, তত বেশি আত্মবিশ্বাস — তাই স্কোর যোগ করাই যুক্তিসঙ্গত।</p>
      <h4>Boost ব্যবহারে সতর্কতা</h4>
      <p><code>title^10</code>-এর মতো অতিরিক্ত boost দিলে অন্য ফিল্ড কার্যত অর্থহীন হয়ে যায়। ২-৩ দিয়ে শুরু করে বাস্তব কুয়েরিতে পরীক্ষা করে সমন্বয় করুন। <code>"explain": true</code> দিয়ে দেখুন প্রতিটি ফিল্ড কতটা অবদান রাখছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>cross_fields</code>-এ সব ফিল্ডের analyzer একই হওয়া কেন জরুরি?</li>
        <li>Boost মান কীভাবে টিউন করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-29",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Internals","Lucene","Segments"],
    question: "Elasticsearch Internals: Lucene Segments, Immutable Segments, and Segment Merging (forcemerge) কী?",
    answer: `
      <p>Elasticsearch ভেতরে <strong>Apache Lucene</strong> ব্যবহার করে, এবং Lucene-এর মৌলিক স্টোরেজ একক হলো <strong>segment</strong> — একটি ছোট, স্বয়ংসম্পূর্ণ inverted index।</p>
      <h4>সবচেয়ে গুরুত্বপূর্ণ বৈশিষ্ট্য: segment অপরিবর্তনীয় (immutable)</h4>
      <p>একবার লেখা হয়ে গেলে একটি segment <strong>কখনও পরিবর্তন করা হয় না</strong>। এর ফলে:</p>
      <ul>
        <li><strong>নতুন ডকুমেন্ট</strong> → নতুন segment-এ যায়।</li>
        <li><strong>ডিলিট</strong> → ডকুমেন্ট আসলে মুছে না; একটি <code>.del</code> ফাইলে "মুছে ফেলা" হিসেবে চিহ্নিত হয়। সার্চের ফলাফল থেকে বাদ দেওয়া হয়, কিন্তু ডিস্কে থেকেই যায়।</li>
        <li><strong>আপডেট</strong> → পুরনোটি মুছে-চিহ্নিত হয় এবং একটি সম্পূর্ণ নতুন ডকুমেন্ট লেখা হয়। <em>In-place আপডেট বলে কিছু নেই।</em></li>
      </ul>
      <p><strong>কেন এই নকশা:</strong> অপরিবর্তনীয় হওয়ায় কোনো লক লাগে না (একাধিক থ্রেড নিরাপদে পড়তে পারে), OS ফাইল ক্যাশে চমৎকারভাবে ক্যাশ হয়, এবং লেখা সম্পূর্ণ ক্রমিক (sequential) — ডিস্কের জন্য দ্রুততম।</p>
      <pre class="mermaid">
flowchart TD
    A["নতুন ডকুমেন্ট"] --> B["In-memory buffer"]
    B -->|"refresh (প্রতি 1s)"| C["নতুন segment<br/>→ এখন সার্চযোগ্য"]
    C --> D["আরও segment জমছে..."]
    D -->|"background merge"| E["বড় segment<br/>মুছে-চিহ্নিত ডক বাদ পড়ে"]
      </pre>
      <span class="diagram-caption">ছোট segment জমতে থাকে, ব্যাকগ্রাউন্ডে মার্জ হয়</span>
      <h4>Segment Merging</h4>
      <p>প্রতি সেকেন্ডে নতুন segment তৈরি হলে দ্রুত হাজারো segment জমে যাবে — এবং প্রতিটি সার্চে <em>সব</em> segment খুঁজতে হয়, তাই সার্চ ধীর হয়ে যায়। তাই Lucene ব্যাকগ্রাউন্ডে ছোট segment গুলোকে বড় segment-এ <strong>merge</strong> করে।</p>
      <p>Merge-এর সময়ই মুছে-চিহ্নিত ডকুমেন্টগুলো <strong>প্রকৃতপক্ষে সরিয়ে ফেলা হয়</strong> — তাই merge না হওয়া পর্যন্ত ডিলিট করা ডেটা ডিস্কে থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /_cat/segments/my-index?v          # segment সংখ্যা ও আকার দেখুন

# শুধু read-only ইনডেক্সে forcemerge করুন
POST /old-logs-2026-01/_forcemerge?max_num_segments=1</code></pre>
      </div>
      <h4><code>forcemerge</code>-এ কড়া সতর্কতা</h4>
      <p><code>forcemerge</code> অত্যন্ত ব্যয়বহুল — এটি প্রচুর ডিস্ক I/O ও CPU খরচ করে এবং চলাকালে ইনডেক্সিং ও সার্চ ধীর হয়ে যায়।</p>
      <p><strong>শুধু সেসব ইনডেক্সে চালান যেগুলোতে আর লেখা হবে না</strong> (যেমন গতকালের লগ)। সক্রিয় ইনডেক্সে <code>max_num_segments=1</code> চালালে একটি বিশাল segment তৈরি হয় যা স্বাভাবিক merge নীতিতে আর কখনও merge হবে না — ফলে সেখানে মুছে ফেলা ডকুমেন্ট চিরকাল জমে থাকবে এবং ডিস্ক নষ্ট হবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Refresh, flush ও commit-এর মধ্যে পার্থক্য কী?</li>
        <li>বেশি সংখ্যক ছোট segment থাকলে কী সমস্যা হয়?</li>
      </ul>
    `
  },
  {
    id: "es-30",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Prefix","Wildcard"],
    question: "Prefix Query, Wildcard Query, এবং Regexp Query কেন স্লো এবং search_as_you_type ফিল্ড কীভাবে এটি ফিক্স করে?",
    answer: `
      <p><code>prefix</code>, <code>wildcard</code> ও <code>regexp</code> কুয়েরি ধীর হওয়ার কারণ একটাই — এগুলো <strong>inverted index-এর মূল সুবিধা ব্যবহার করতে পারে না</strong>।</p>
      <h4>কেন ধীর</h4>
      <p>Inverted index টার্মগুলোকে বর্ণানুক্রমে সাজিয়ে রাখে, তাই একটি নির্দিষ্ট টার্ম খোঁজা O(log N)। কিন্তু:</p>
      <ul>
        <li><strong><code>prefix: "lap"</code></strong> — সাজানো তালিকায় "lap" দিয়ে শুরু হওয়া সব টার্ম খুঁজতে হয়। মোটামুটি সহনীয়, কিন্তু ম্যাচিং টার্ম বেশি হলে ধীর।</li>
        <li><strong><code>wildcard: "*top"</code></strong> — শুরুটা অজানা, তাই <strong>পুরো টার্ম ডিকশনারি স্ক্যান</strong> করতে হয়। এটি ভয়াবহ — লক্ষ লক্ষ টার্মে অসহনীয়।</li>
        <li><strong><code>regexp</code></strong> — আরও খারাপ; জটিল regex ক্লাস্টার অচল করে দিতে পারে।</li>
      </ul>
      <p>এটি ঠিক SQL-এর <code>LIKE '%keyword%'</code>-এর সমস্যার সমতুল্য।</p>
      <h4>সমাধান: ইনডেক্স করার সময়েই কাজটি করে ফেলুন</h4>
      <p>মূল নীতি — <strong>সার্চের সময় ব্যয়বহুল কাজ করার বদলে ইনডেক্সের সময় বাড়তি টোকেন তৈরি করে রাখুন</strong>। ডিস্ক সস্তা, সার্চের সময় মূল্যবান।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># সবচেয়ে সহজ: search_as_you_type
PUT /products
{
  "mappings": { "properties": {
    "title": { "type": "search_as_you_type" }
  }}
}

GET /products/_search
{ "query": { "multi_match": {
    "query": "wirel head",
    "type": "bool_prefix",
    "fields": ["title", "title._2gram", "title._3gram"]
}}}</code></pre>
      </div>
      <p><code>search_as_you_type</code> স্বয়ংক্রিয়ভাবে কয়েকটি সাব-ফিল্ড তৈরি করে (shingle ও prefix ভিত্তিক), যা autocomplete-কে সাধারণ টার্ম lookup-এ পরিণত করে — অত্যন্ত দ্রুত।</p>
      <h4>বিকল্প কৌশল</h4>
      <table>
        <tr><th>কৌশল</th><th>কীভাবে</th><th>উপযুক্ত</th></tr>
        <tr><td><code>search_as_you_type</code></td><td>বিল্ট-ইন, শূন্য কনফিগ</td><td>সাধারণ autocomplete</td></tr>
        <tr><td><strong>Edge n-gram</strong></td><td>ইনডেক্সে "l","la","lap","lapt"... রাখা</td><td>সর্বোচ্চ নিয়ন্ত্রণ</td></tr>
        <tr><td><strong>Completion suggester</strong></td><td>FST (in-memory) ডেটা স্ট্রাকচার</td><td><strong>দ্রুততম</strong>, কিন্তু RAM খায়</td></tr>
        <tr><td><code>index_prefixes</code></td><td>keyword ফিল্ডে prefix ইনডেক্স</td><td>prefix কুয়েরি দ্রুত করতে</td></tr>
        <tr><td><strong>Reverse ফিল্ড</strong></td><td>উল্টো করে সংরক্ষণ</td><td>suffix সার্চ (<code>*top</code>)</td></tr>
      </table>
      <p><strong>Edge n-gram-এর সতর্কতা:</strong> ইনডেক্সে n-gram তৈরি করুন, কিন্তু <strong>সার্চের সময় নয়</strong> — <code>search_analyzer: "standard"</code> দিন। নাহলে সার্চ টার্মও n-gram-এ ভেঙে অপ্রাসঙ্গিক ফল আসবে। এটি একটি অত্যন্ত সাধারণ ভুল।</p>
      <p><strong>যদি wildcard ব্যবহার করতেই হয়:</strong> <code>keyword</code> ফিল্ডে <code>wildcard</code> টাইপ (ES 7.9+) ব্যবহার করুন — এটি বিশেষভাবে wildcard ও regexp কুয়েরির জন্য অপ্টিমাইজ করা, লগ সার্চে উপযোগী।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Autocomplete-এ টাইপো সহনশীলতা কীভাবে যোগ করবেন?</li>
        <li>Completion suggester-এর মেমরি খরচ কীভাবে হিসাব করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-31",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["ILM","Lifecycle","Hot Warm Cold"],
    question: "Index Lifecycle Management (ILM): Hot, Warm, Cold, Frozen, Delete Phases কীভাবে ডিস্ক ও RAM সাশ্রয় করে?",
    answer: `
      <p><strong>ILM (Index Lifecycle Management)</strong> টাইম-সিরিজ ডেটার (লগ, মেট্রিক, ইভেন্ট) জীবনচক্র স্বয়ংক্রিয়ভাবে পরিচালনা করে — ব্যয়বহুল হার্ডওয়্যার থেকে সস্তায় সরিয়ে, শেষে মুছে ফেলে।</p>
      <pre class="mermaid">
flowchart LR
    H["🔥 Hot<br/>লেখা + সার্চ<br/>NVMe SSD"] --> W["🌤️ Warm<br/>শুধু সার্চ<br/>SSD/HDD"]
    W --> C["❄️ Cold<br/>কদাচিৎ সার্চ<br/>সস্তা HDD"]
    C --> F["🧊 Frozen<br/>S3 থেকে সার্চ"]
    F --> D["🗑️ Delete"]
      </pre>
      <span class="diagram-caption">ডেটা পুরনো হওয়ার সাথে সাথে সস্তা স্টোরেজে নেমে যায়</span>
      <table>
        <tr><th>Phase</th><th>বৈশিষ্ট্য</th><th>খরচ</th></tr>
        <tr><td><strong>Hot</strong></td><td>সক্রিয়ভাবে লেখা হচ্ছে ও ঘন ঘন সার্চ হচ্ছে</td><td>সর্বোচ্চ</td></tr>
        <tr><td><strong>Warm</strong></td><td>আর লেখা হয় না, কিন্তু নিয়মিত সার্চ হয়</td><td>মাঝারি</td></tr>
        <tr><td><strong>Cold</strong></td><td>কদাচিৎ সার্চ; replica কমানো যায়</td><td>কম</td></tr>
        <tr><td><strong>Frozen</strong></td><td>ডেটা S3-তে; সার্চে দেরি হয় কিন্তু সম্ভব</td><td>সর্বনিম্ন</td></tr>
        <tr><td><strong>Delete</strong></td><td>মুছে ফেলা</td><td>—</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT _ilm/policy/logs-policy
{
  "policy": { "phases": {
    "hot": {
      "actions": {
        "rollover": { "max_primary_shard_size": "50gb", "max_age": "1d" }
      }
    },
    "warm": {
      "min_age": "7d",
      "actions": {
        "shrink": { "number_of_shards": 1 },
        "forcemerge": { "max_num_segments": 1 },
        "allocate": { "require": { "data": "warm" } }
      }
    },
    "cold": {
      "min_age": "30d",
      "actions": { "allocate": { "number_of_replicas": 0 } }
    },
    "delete": { "min_age": "90d", "actions": { "delete": {} } }
  }}
}</code></pre>
      </div>
      <h4>Rollover — ভিত্তি</h4>
      <p>ILM-এর কেন্দ্রে আছে <strong>rollover</strong>: একটি ইনডেক্স নির্দিষ্ট আকার বা বয়সে পৌঁছালে একটি নতুন ইনডেক্স তৈরি হয় এবং write alias সেখানে সরে যায়। ফলে পুরনো ইনডেক্সগুলো অপরিবর্তনীয় হয়ে যায় — তখন সেগুলো নিরাপদে shrink, forcemerge ও স্থানান্তর করা যায়।</p>
      <p><strong><code>max_primary_shard_size</code> ব্যবহার করুন</strong> (ডকুমেন্ট সংখ্যা নয়) — এটিই সবচেয়ে নির্ভরযোগ্য নিয়ন্ত্রণ, কারণ shard-এর আদর্শ আকার ২০-৫০ GB।</p>
      <h4>Warm phase-এর দুটি ক্রিয়া কেন কার্যকর</h4>
      <ul>
        <li><strong><code>shrink</code>:</strong> hot phase-এ লেখার সমান্তরালতার জন্য অনেক shard দরকার হয়; কিন্তু লেখা শেষ হলে সেগুলো একটি shard-এ সংকুচিত করলে ওভারহেড কমে।</li>
        <li><strong><code>forcemerge</code>:</strong> read-only ইনডেক্সে নিরাপদ — segment একত্র করে ডিস্ক ও সার্চ পারফরম্যান্স দুটোই উন্নত করে। (সক্রিয় ইনডেক্সে এটি করা বিপজ্জনক।)</li>
      </ul>
      <p><strong>Data tier:</strong> নোডে <code>node.roles: [data_hot]</code>, <code>[data_warm]</code> ইত্যাদি সেট করলে ILM স্বয়ংক্রিয়ভাবে সঠিক হার্ডওয়্যারে shard সরায় — hot-এ দামি NVMe, cold-এ সস্তা ডিস্ক।</p>
      <p><strong>বাস্তব প্রভাব:</strong> লগ ইনডেক্সে ILM প্রায়ই স্টোরেজ খরচ <strong>৫০-৮০% কমিয়ে দেয়</strong>, কারণ পুরনো ডেটা (যা মোট ডেটার ৯০%) সস্তা স্টোরেজে চলে যায় এবং replica কমে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Data stream ও ILM কীভাবে একসাথে কাজ করে?</li>
        <li>ILM নীতি বদলালে বিদ্যমান ইনডেক্সে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "es-32",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Cluster","Master Node","Split Brain"],
    question: "Master-eligible Nodes, Voting Only Nodes, এবং Split-Brain Condition কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p>Elasticsearch ক্লাস্টারে <strong>master node</strong> ক্লাস্টার-স্তরের সিদ্ধান্ত নেয় — কোন shard কোথায় থাকবে, কোন নোড ক্লাস্টারে আছে, ইনডেক্স তৈরি/মুছে ফেলা। এটি ডেটা রিকোয়েস্ট সামলায় না, কিন্তু এটি ছাড়া ক্লাস্টার অকার্যকর।</p>
      <h4>Split-brain সমস্যা</h4>
      <p>নেটওয়ার্ক ভাগ হয়ে গেলে দুটি অংশ যদি আলাদাভাবে নিজেদের master নির্বাচন করে ফেলে, তাহলে <strong>দুটি master একই সাথে ভিন্ন সিদ্ধান্ত নেবে</strong> — shard বণ্টন, ইনডেক্স পরিবর্তন সব দ্বিধাবিভক্ত হয়ে যাবে। নেটওয়ার্ক ফিরলে ডেটা অপরিবর্তনীয়ভাবে দূষিত হতে পারে।</p>
      <h4>সমাধান: quorum</h4>
      <p>Elasticsearch 7+ এ এটি <strong>স্বয়ংক্রিয়</strong> — পুরনো <code>minimum_master_nodes</code> সেটিং বাদ দেওয়া হয়েছে (এটি ভুলভাবে সেট করা ছিল অসংখ্য প্রোডাকশন দুর্ঘটনার কারণ)। এখন ক্লাস্টার নিজেই একটি <strong>voting configuration</strong> রক্ষণাবেক্ষণ করে এবং সংখ্যাগরিষ্ঠতা ছাড়া কোনো master নির্বাচিত হতে পারে না।</p>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># elasticsearch.yml — শুধু প্রথমবার bootstrap করার সময়
cluster.initial_master_nodes: ["node-1", "node-2", "node-3"]

# নোডের ভূমিকা স্পষ্টভাবে নির্ধারণ করুন
node.roles: [ master ]              # ডেডিকেটেড master
node.roles: [ data, ingest ]        # ডেটা নোড
node.roles: [ master, voting_only ] # ভোট দেবে, কিন্তু master হবে না</code></pre>
      </div>
      <p><strong>⚠️ <code>cluster.initial_master_nodes</code> শুধু একদম প্রথম স্টার্টআপে ব্যবহার হয়</strong> — ক্লাস্টার একবার তৈরি হয়ে গেলে এই সেটিং সরিয়ে ফেলা উচিত। এটি রেখে দিলে ভবিষ্যতে দুর্ঘটনাক্রমে একটি নতুন আলাদা ক্লাস্টার তৈরি হয়ে যেতে পারে।</p>
      <h4>Voting-only নোড</h4>
      <p>এটি একটি চতুর সমাধান। ধরুন আপনার দুটি ডেটাসেন্টারে ২টি করে master-eligible নোড আছে — মোট ৪টি (জোড় সংখ্যা, খারাপ)। একটি তৃতীয় স্থানে একটি ছোট, সস্তা <strong>voting-only</strong> নোড রাখলে সেটি tie-breaker হিসেবে কাজ করে, কিন্তু কখনও master হয় না — তাই তার জন্য শক্তিশালী হার্ডওয়্যার লাগে না।</p>
      <h4>ব্যবহারিক নিয়ম</h4>
      <ul>
        <li><strong>ঠিক ৩টি master-eligible নোড</strong> রাখুন — এটি ১টি ব্যর্থতা সহ্য করে। ৫টি রাখলে ২টি সহ্য করে, কিন্তু নির্বাচন ধীর হয়। ৩-এর বেশি খুব বড় ক্লাস্টার ছাড়া অপ্রয়োজনীয়।</li>
        <li><strong>কখনও জোড় সংখ্যা নয়</strong> — ৪টি নোডেও ৩টি লাগে, অর্থাৎ ৩-এর চেয়ে বাড়তি সহনশীলতা নেই, শুধু খরচ বেশি।</li>
        <li><strong>বড় ক্লাস্টারে master নোড ডেডিকেটেড রাখুন</strong> — ডেটা নোডের ভারী কাজ (GC pause, ভারী কুয়েরি) master-কে অনুপলব্ধ করে দিতে পারে, যা অপ্রয়োজনীয় নির্বাচন ট্রিগার করে।</li>
        <li><strong>একটি ক্লাস্টার একাধিক ডেটাসেন্টারে ছড়াবেন না</strong> — Elasticsearch কম-latency নেটওয়ার্ক ধরে নেয়। ভিন্ন অঞ্চলের জন্য <strong>CCR (Cross-Cluster Replication)</strong> ব্যবহার করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Master নোড হারালে ক্লাস্টারে কী কাজ চলতে থাকে?</li>
        <li>Coordinating-only নোড কী কাজে লাগে?</li>
      </ul>
    `
  },
  {
    id: "es-33",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Search","Function Score","Custom Scoring"],
    question: "Function Score Query এবং Decay Functions (gauss, exp, lin) দিয়ে কাস্টম র‍্যাঙ্কিং কীভাবে করবেন?",
    answer: `
      <p>বিশুদ্ধ টেক্সট প্রাসঙ্গিকতা (BM25) প্রায়ই যথেষ্ট নয় — ব্যবসায়িক সিগন্যাল যোগ করতে হয়। <code>function_score</code> কুয়েরি BM25 স্কোরের সাথে কাস্টম গণনা মিশিয়ে চূড়ান্ত র‍্যাঙ্কিং তৈরি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /products/_search
{
  "query": {
    "function_score": {
      "query": { "match": { "title": "wireless headphones" } },

      "functions": [
        {
          "field_value_factor": {          // জনপ্রিয়তা
            "field": "sales_count",
            "modifier": "log1p",            // ⚠️ লগ ব্যবহার করুন
            "factor": 0.5,
            "missing": 0
          }
        },
        {
          "gauss": {                        // নতুনত্ব
            "created_at": {
              "origin": "now",
              "scale": "30d",               // ৩০ দিনে স্কোর অর্ধেক
              "decay": 0.5
            }
          }
        },
        {
          "filter": { "term": { "in_stock": true } },
          "weight": 2                       // স্টকে থাকলে দ্বিগুণ
        }
      ],

      "score_mode": "sum",                  // functions গুলো কীভাবে মিলবে
      "boost_mode": "multiply"              // মূল স্কোরের সাথে কীভাবে মিলবে
    }
  }
}</code></pre>
      </div>
      <h4>Decay function — তিনটি আকৃতি</h4>
      <ul>
        <li><strong><code>gauss</code>:</strong> origin-এর কাছে ধীরে কমে, তারপর দ্রুত। <strong>সবচেয়ে বেশি ব্যবহৃত</strong> — "সাম্প্রতিক" বা "কাছাকাছি" ধারণার জন্য স্বাভাবিক।</li>
        <li><strong><code>exp</code>:</strong> শুরুতেই দ্রুত কমে। খুব কড়া নতুনত্ব-অগ্রাধিকারে।</li>
        <li><strong><code>lin</code>:</strong> সরলরৈখিক, একটি নির্দিষ্ট দূরত্বে শূন্য হয়ে যায়।</li>
      </ul>
      <p>Decay function তারিখ, সংখ্যা ও <strong>geo_point</strong> — তিনটিতেই কাজ করে। রেস্তোরাঁ সার্চে "৫ কিমি-র মধ্যে যত কাছে তত ভালো" এভাবেই করা হয়।</p>
      <h4><code>log1p</code> কেন গুরুত্বপূর্ণ</h4>
      <p><code>field_value_factor</code>-এ সরাসরি <code>sales_count</code> ব্যবহার করলে ১০ লক্ষ বিক্রির একটি পণ্য টেক্সট প্রাসঙ্গিকতাকে সম্পূর্ণ চাপা দিয়ে দেবে — ইউজার যা-ই সার্চ করুক, সেই একটি পণ্যই উপরে আসবে।</p>
      <p><code>log1p</code> (log(1+x)) এই প্রভাবকে সংকুচিত করে: ১০০ বনাম ১০,০০০ বিক্রির পার্থক্য থাকে, কিন্তু সেটি অপ্রতিরোধ্য হয় না। <strong>জনপ্রিয়তা সিগন্যালে প্রায় সবসময় লগ ব্যবহার করুন।</strong></p>
      <h4>score_mode ও boost_mode</h4>
      <ul>
        <li><strong><code>score_mode</code></strong> — একাধিক function কীভাবে একত্র হবে: <code>multiply</code> (ডিফল্ট), <code>sum</code>, <code>avg</code>, <code>max</code>, <code>first</code>।</li>
        <li><strong><code>boost_mode</code></strong> — সেই ফল মূল কুয়েরি স্কোরের সাথে কীভাবে মিলবে: <code>multiply</code> (ডিফল্ট), <code>sum</code>, <code>replace</code>।</li>
      </ul>
      <p><strong>ডিবাগিং:</strong> <code>"explain": true</code> দিলে প্রতিটি ডকুমেন্টের স্কোর কীভাবে গণনা হলো তার সম্পূর্ণ ভাঙন দেখা যায় — র‍্যাঙ্কিং টিউন করার সময় এটি অপরিহার্য।</p>
      <p><strong>পারফরম্যান্স সতর্কতা:</strong> <code>script_score</code> দিয়ে যেকোনো গণনা করা যায়, কিন্তু সেটি <em>প্রতিটি মেলা ডকুমেন্টে</em> চলে — ধীর। সম্ভব হলে বিল্ট-ইন function ব্যবহার করুন, অথবা <code>rescore</code> দিয়ে কেবল শীর্ষ N ডকুমেন্টে ব্যয়বহুল গণনা সীমাবদ্ধ রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>র‍্যাঙ্কিং পরিবর্তন ভালো হয়েছে কি না কীভাবে মাপবেন?</li>
        <li>Personalized র‍্যাঙ্কিং কীভাবে যোগ করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-34",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Index Template","Component Template","Dynamic"],
    question: "Index Templates and Component Templates (index_patterns) কীভাবে স্বয়ংক্রিয় ইনডেক্স সেটিংস ও ম্যাপিং দেয়?",
    answer: `
      <p><strong>Index template</strong> নির্দিষ্ট প্যাটার্নের নামে নতুন ইনডেক্স তৈরি হলে স্বয়ংক্রিয়ভাবে তাতে সেটিংস ও mapping প্রয়োগ করে। টাইম-সিরিজ ডেটায় (প্রতিদিন নতুন ইনডেক্স) এটি অপরিহার্য।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># পুনঃব্যবহারযোগ্য component template
PUT _component_template/logs-settings
{ "template": { "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
    "index.lifecycle.name": "logs-policy"
}}}

PUT _component_template/logs-mappings
{ "template": { "mappings": {
    "dynamic": "strict",
    "properties": {
      "@timestamp": { "type": "date" },
      "level":      { "type": "keyword" },
      "message":    { "type": "text" },
      "service":    { "type": "keyword" }
    }
}}}

# এগুলো একত্র করে index template
PUT _index_template/logs-template
{
  "index_patterns": ["logs-*"],
  "composed_of": ["logs-settings", "logs-mappings"],
  "priority": 200,
  "data_stream": {}
}</code></pre>
      </div>
      <h4>Component template কেন যোগ করা হলো</h4>
      <p>আগে প্রতিটি index template-এ সব সেটিংস ও mapping পুনরাবৃত্তি করতে হতো। ১০টি ভিন্ন লগ টাইপের জন্য ১০টি template মানে একই <code>@timestamp</code> সংজ্ঞা ১০ বার — একটি বদলাতে হলে ১০ জায়গায় বদলাতে হতো।</p>
      <p>Component template এই পুনরাবৃত্তি দূর করে — যেমন CSS-এ শেয়ার্ড ক্লাস। একটি সাধারণ <code>base-mappings</code> লিখে সব template-এ <code>composed_of</code> দিয়ে যুক্ত করা যায়।</p>
      <h4>Priority ও ক্রম</h4>
      <ul>
        <li>একাধিক template একই প্যাটার্নে মিললে <strong>সর্বোচ্চ <code>priority</code>-র টি জেতে</strong> — একাধিক একসাথে প্রয়োগ হয় না।</li>
        <li>Elasticsearch-এর নিজস্ব বিল্ট-ইন template (যেমন <code>logs-*-*</code>) ১০০ priority-তে থাকে, তাই নিজেরটি ২০০+ দিন।</li>
        <li><code>composed_of</code>-এর তালিকায় <strong>পরেরটি আগেরটিকে ওভাররাইড করে</strong>, এবং template-এর নিজস্ব <code>template</code> ব্লক সবার উপরে থাকে।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ সীমাবদ্ধতা</h4>
      <p><strong>Template কেবল <em>নতুন</em> ইনডেক্সে প্রযোজ্য।</strong> template বদলালে বিদ্যমান ইনডেক্সে কোনো প্রভাব পড়ে না — সেগুলো তৈরি হওয়ার সময়ের সেটিংস নিয়েই চলবে। পরিবর্তন প্রয়োগ করতে হলে rollover বা reindex লাগবে।</p>
      <p><strong>টেস্টিং:</strong> <code>POST /_index_template/_simulate_index/logs-2026-08-10</code> দিয়ে দেখুন একটি নির্দিষ্ট নামের ইনডেক্স তৈরি হলে চূড়ান্ত কনফিগ কী দাঁড়াবে — একাধিক component মিলে কী হচ্ছে তা যাচাই করতে অপরিহার্য।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Legacy <code>_template</code> ও নতুন <code>_index_template</code>-এর পার্থক্য কী?</li>
        <li>একই প্যাটার্নে দুটি template থাকলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "es-35",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Vector Search","kNN","Dense Vector"],
    question: "Elasticsearch kNN (k-Nearest Neighbors) and dense_vector field type দিয়ে Vector Search কীভাবে করবেন?",
    answer: `
      <p>Elasticsearch 8+ এ <strong>dense_vector</strong> ফিল্ড ও <strong>kNN search</strong> যোগ হওয়ায় এটি একটি পূর্ণাঙ্গ ভেক্টর ডাটাবেজ হিসেবেও ব্যবহারযোগ্য — যা RAG ও সিমান্টিক সার্চে গুরুত্বপূর্ণ।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /articles
{ "mappings": { "properties": {
    "title":   { "type": "text" },
    "category":{ "type": "keyword" },
    "embedding": {
      "type": "dense_vector",
      "dims": 1536,
      "index": true,
      "similarity": "cosine",
      "index_options": { "type": "hnsw", "m": 16, "ef_construction": 100 }
    }
}}}

# Hybrid search — ভেক্টর + কীওয়ার্ড + ফিল্টার একসাথে
GET /articles/_search
{
  "knn": {
    "field": "embedding",
    "query_vector": [0.12, -0.45, ...],
    "k": 10,
    "num_candidates": 100,
    "filter": { "term": { "category": "technology" } }
  },
  "query": { "match": { "title": "machine learning" } },
  "rank": { "rrf": {} }
}</code></pre>
      </div>
      <h4>Elasticsearch-কে ভেক্টর DB হিসেবে বাছার আসল কারণ</h4>
      <p>বিশুদ্ধ ভেক্টর সার্চে ডেডিকেটেড ডাটাবেজ (Qdrant, Milvus) প্রায়ই দ্রুত। কিন্তু Elasticsearch দুটি অনন্য সুবিধা দেয়:</p>
      <ul>
        <li><strong>Pre-filtering:</strong> <code>knn</code>-এর ভেতরে <code>filter</code> দিলে Elasticsearch ফিল্টার প্রয়োগ করে <em>তারপর</em> নিকটতম প্রতিবেশী খোঁজে। অনেক সিস্টেমে post-filtering হয় — অর্থাৎ শীর্ষ ১০ বের করে তারপর ফিল্টার, ফলে ফিল্টার কড়া হলে কিছুই অবশিষ্ট থাকে না।</li>
        <li><strong>Hybrid search:</strong> <code>rrf</code> (Reciprocal Rank Fusion) দিয়ে ভেক্টর সাদৃশ্য ও ঐতিহ্যবাহী BM25 কীওয়ার্ড স্কোর একত্র করা যায়। বাস্তবে <strong>hybrid প্রায় সবসময় শুধু ভেক্টরের চেয়ে ভালো ফল দেয়</strong> — কারণ নির্দিষ্ট নাম, কোড বা সংখ্যা খুঁজতে কীওয়ার্ড সার্চই সেরা, আর ধারণাগত সাদৃশ্যে ভেক্টর।</li>
      </ul>
      <h4>বাস্তব বিবেচনা</h4>
      <ul>
        <li><strong>মেমরি:</strong> ১০ লক্ষ × ১৫৩৬ মাত্রা × ৪ বাইট ≈ <strong>৬ GB</strong> শুধু ভেক্টরের জন্য। HNSW গ্রাফ আরও জায়গা নেয়। ক্ষমতা পরিকল্পনায় এটি প্রধান বিবেচ্য।</li>
        <li><strong>Quantization:</strong> <code>int8_hnsw</code> ব্যবহার করলে মেমরি ~৪ গুণ কমে, নির্ভুলতা সামান্য কমে — বড় ডেটাসেটে প্রায় সবসময় লাভজনক।</li>
        <li><strong><code>num_candidates</code> টিউনিং:</strong> এটি বাড়ালে নির্ভুলতা বাড়ে, গতি কমে। <code>k</code>-এর ৫-১০ গুণ দিয়ে শুরু করুন।</li>
        <li><strong>এমবেডিং তৈরি আলাদা কাজ</strong> — Elasticsearch ভেক্টর সংরক্ষণ ও খোঁজে, কিন্তু টেক্সট থেকে ভেক্টর বানাতে একটি মডেল লাগবে (OpenAI, Cohere, বা ELSER দিয়ে Elasticsearch-এর ভেতরেই)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>RRF কীভাবে দুটি ভিন্ন স্কেলের স্কোর একত্র করে?</li>
        <li>Pre-filtering ও post-filtering-এর পার্থক্য কেন গুরুত্বপূর্ণ?</li>
      </ul>
    `
  },
  {
    id: "es-36",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Ops","Cat API","_cat"],
    question: "Elasticsearch _cat API (_cat/shards, _cat/indices, _cat/nodes) দিয়ে টার্মিনাল ডেবাগিং কীভাবে করবেন?",
    answer: `
      <p><code>_cat</code> API মানুষের পড়ার উপযোগী টেবিল আকারে ক্লাস্টারের তথ্য দেয় — JSON পার্স না করেই টার্মিনাল থেকে দ্রুত ডিবাগিংয়ের জন্য।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># v = হেডার দেখাও, s = সাজাও, h = নির্দিষ্ট কলাম
GET /_cat/health?v
GET /_cat/nodes?v&h=name,node.role,heap.percent,cpu,load_1m,disk.used_percent

# ইনডেক্স — আকার অনুযায়ী সাজানো
GET /_cat/indices?v&s=store.size:desc&h=index,health,docs.count,store.size

# অবরাদ্দকৃত shard ও কারণ — red/yellow ডিবাগিংয়ে প্রথম কমান্ড
GET /_cat/shards?v&h=index,shard,prirep,state,node,unassigned.reason

# থ্রেড পুল — rejected কলাম শূন্যের বেশি মানে ওভারলোড
GET /_cat/thread_pool/search,write?v&h=node_name,name,active,queue,rejected

# চলমান কাজ (দীর্ঘ reindex/forcemerge)
GET /_cat/tasks?v&detailed</code></pre>
      </div>
      <h4>যে কলামগুলো সবচেয়ে বেশি বলে</h4>
      <ul>
        <li><strong><code>heap.percent</code>:</strong> ৭৫%-এর উপরে ধারাবাহিকভাবে থাকলে GC চাপ বাড়ছে — নোড অস্থির হওয়ার পূর্বাভাস।</li>
        <li><strong><code>disk.used_percent</code>:</strong> ৮৫% ছুঁলে Elasticsearch নতুন shard বরাদ্দ বন্ধ করে; ৯৫%-এ ইনডেক্স read-only হয়ে যায়। এটি yellow/red-এর সবচেয়ে সাধারণ কারণ।</li>
        <li><strong><code>rejected</code> (thread_pool):</strong> শূন্যের বেশি মানে রিকোয়েস্ট ফেলে দেওয়া হচ্ছে — ক্লাস্টার ক্ষমতার বাইরে চলছে।</li>
        <li><strong><code>unassigned.reason</code>:</strong> কেন shard বরাদ্দ হয়নি তার সরাসরি উত্তর।</li>
      </ul>
      <h4>ব্যবহারিক ব্যবহার</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># শেল থেকে সরাসরি — grep/awk-এর সাথে চমৎকার কাজ করে
curl -s 'localhost:9200/_cat/indices?h=index,store.size&s=store.size:desc' | head -20

# সব উপলব্ধ কলাম দেখুন
GET /_cat/indices?help</code></pre>
      </div>
      <p><strong>সীমাবদ্ধতা:</strong> <code>_cat</code> কেবল <em>মানুষের</em> ব্যবহারের জন্য — এর আউটপুট ফরম্যাট সংস্করণভেদে বদলাতে পারে। <strong>স্ক্রিপ্ট বা মনিটরিং সিস্টেমে কখনও <code>_cat</code> পার্স করবেন না</strong>; সেখানে <code>_cluster/stats</code>, <code>_nodes/stats</code> বা <code>_cluster/health</code>-এর JSON API ব্যবহার করুন।</p>
      <p>দ্রুত তদন্তের জন্য এই ক্রমটি কার্যকর: <code>_cat/health</code> → সমস্যা থাকলে <code>_cat/shards</code> → কারণ বুঝতে <code>_cluster/allocation/explain</code>।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Shard আকার কত হওয়া উচিত এবং কেন?</li>
        <li>Thread pool rejection দেখলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-37",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Circuit Breakers","Parent Breaker","OOM"],
    question: "Elasticsearch Circuit Breakers (indices.breaker.total.use_real_memory) কীভাবে OOM Crash প্রতিরোধ করে?",
    answer: `
      <p><strong>Circuit breaker</strong> Elasticsearch-এর আত্মরক্ষা ব্যবস্থা — একটি অপারেশন যদি অতিরিক্ত মেমরি চাইতে যায়, তবে সেটি <em>শুরু হওয়ার আগেই</em> বাতিল করে দেয়, যাতে পুরো নোড OOM-এ মারা না যায়।</p>
      <p><strong>মূল দর্শন:</strong> একটি ব্যয়বহুল কুয়েরি ব্যর্থ হওয়া অনেক ভালো, পুরো নোড ক্র্যাশ করে সব shard অনুপলব্ধ হওয়ার চেয়ে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>CircuitBreakingException: [parent] Data too large, data for [&lt;http_request&gt;]
would be [7.9gb], which is larger than the limit of [7.4gb]</code></pre>
      </div>
      <h4>প্রধান breaker</h4>
      <table>
        <tr><th>Breaker</th><th>সীমা (ডিফল্ট)</th><th>কী থেকে রক্ষা করে</th></tr>
        <tr><td><code>parent</code></td><td>heap-এর ৯৫%</td><td>সব breaker-এর মোট যোগফল</td></tr>
        <tr><td><code>request</code></td><td>৬০%</td><td>একটি রিকোয়েস্টের aggregation মেমরি</td></tr>
        <tr><td><code>fielddata</code></td><td>৪০%</td><td><code>text</code> ফিল্ডে aggregation</td></tr>
        <tr><td><code>in_flight_requests</code></td><td>১০০%</td><td>চলমান রিকোয়েস্টের মোট আকার</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /_nodes/stats/breaker      # প্রতিটি breaker কতবার ট্রিপ করেছে দেখুন

# ES 7+ এ ডিফল্টে চালু — প্রকৃত heap ব্যবহার দেখে সিদ্ধান্ত নেয়
indices.breaker.total.use_real_memory: true</code></pre>
      </div>
      <p><strong><code>use_real_memory</code> কেন গুরুত্বপূর্ণ:</strong> আগে breaker কেবল <em>নিজের হিসাব রাখা</em> বরাদ্দ গুনত। কিন্তু heap-এর অনেকটাই অন্য কারণে ভরে থাকতে পারে। এখন এটি JVM-এর প্রকৃত heap ব্যবহার দেখে সিদ্ধান্ত নেয় — অনেক বেশি নির্ভরযোগ্য সুরক্ষা।</p>
      <h4>Breaker ট্রিপ করলে যা করবেন (এবং করবেন না)</h4>
      <p><strong>❌ করবেন না:</strong> সীমা বাড়িয়ে দেওয়া। এটি সমস্যা লুকায় মাত্র — এবং পরের বার নোডটি সত্যিই OOM-এ মারা যাবে, যা অনেক বেশি ক্ষতিকর।</p>
      <p><strong>✅ করুন — মূল কারণ খুঁজুন:</strong></p>
      <ul>
        <li><strong>উচ্চ-cardinality aggregation:</strong> লক্ষ লক্ষ ইউনিক মানে <code>terms</code> aggregation। <code>size</code> কমান বা <code>composite</code> aggregation ব্যবহার করুন (এটি পেজিনেট করে, মেমরি স্থির রাখে)।</li>
        <li><strong>Fielddata breaker ট্রিপ:</strong> <code>text</code> ফিল্ডে aggregation হচ্ছে — <code>.keyword</code> সাব-ফিল্ড ব্যবহার করুন।</li>
        <li><strong>বিশাল bulk রিকোয়েস্ট:</strong> ব্যাচের আকার কমান।</li>
        <li><strong>গভীর নেস্টেড aggregation:</strong> bucket সংখ্যা গুণিতক হারে বাড়ে — কুয়েরি সরল করুন।</li>
        <li><strong>heap সত্যিই কম:</strong> নোড যোগ করুন বা ডেটা কমান (ILM দিয়ে)।</li>
      </ul>
      <p><strong>মনে রাখবেন:</strong> Circuit breaker ট্রিপ করা <em>ভালো লক্ষণ</em> — এর মানে সুরক্ষা কাজ করছে। এটি নিয়মিত ঘটলে সেটি ক্ষমতা বা কুয়েরি ডিজাইনের সমস্যার সংকেত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Composite aggregation কীভাবে মেমরি সমস্যা সমাধান করে?</li>
        <li>Search-এর জন্য <code>search.max_buckets</code> কী কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "es-38",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Mapping","copy_to","Search All"],
    question: "Elasticsearch copy_to Mapping Parameter কীভাবে একাধিক ফিল্ড একসাথে কম্বাইন করে?",
    answer: `
      <p><code>copy_to</code> একাধিক ফিল্ডের মান একটি অতিরিক্ত ফিল্ডে অনুলিপি করে, যাতে সেগুলোতে একসাথে সার্চ করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /products
{ "mappings": { "properties": {
    "title":       { "type": "text", "copy_to": "search_all" },
    "brand":       { "type": "text", "copy_to": "search_all" },
    "description": { "type": "text", "copy_to": "search_all" },
    "tags":        { "type": "text", "copy_to": "search_all" },

    "search_all": { "type": "text" }    // ⚠️ এই ফিল্ডটি _source-এ থাকে না
}}}

# এখন একটি ফিল্ডেই সব খোঁজা যায়
GET /products/_search
{ "query": { "match": { "search_all": "wireless sony headphones" } } }</code></pre>
      </div>
      <h4><code>multi_match</code>-এর তুলনায় সুবিধা</h4>
      <table>
        <tr><th>দিক</th><th><code>copy_to</code></th><th><code>multi_match</code></th></tr>
        <tr><td>কুয়েরির গতি</td><td><strong>দ্রুত</strong> (একটি ফিল্ড)</td><td>ধীর (একাধিক ফিল্ড)</td></tr>
        <tr><td>ইনডেক্স আকার</td><td>বড় (ডেটা ডুপ্লিকেট)</td><td>ছোট</td></tr>
        <tr><td>প্রতি-ফিল্ড boost</td><td>❌ সম্ভব নয়</td><td>✅ হ্যাঁ</td></tr>
        <tr><td>নমনীয়তা</td><td>mapping-এ স্থির</td><td>কুয়েরিতে পরিবর্তনযোগ্য</td></tr>
      </table>
      <p><strong>সবচেয়ে বড় সুবিধা:</strong> <code>copy_to</code> একটি <em>সত্যিকারের একক ফিল্ড</em> তৈরি করে, তাই টার্ম ফ্রিকোয়েন্সি ও ফিল্ড দৈর্ঘ্যের হিসাব একত্রে হয় — <code>cross_fields</code>-এর মতো আচরণ পাওয়া যায় কিন্তু কুয়েরির সময় কোনো বাড়তি খরচ ছাড়াই।</p>
      <h4>গুরুত্বপূর্ণ বিবরণ</h4>
      <ul>
        <li><strong>মূল মানগুলো <code>_source</code>-এ কপি হয় না</strong> — শুধু ইনডেক্সে যায়। তাই <code>search_all</code> ফিল্ডটি রেসপন্সে দেখা যাবে না, এবং <code>"store": true</code> না দিলে তার মান ফেরত পাওয়া যাবে না। এটি প্রত্যাশিত আচরণ।</li>
        <li><strong>চেইন করা যায় না</strong> — একটি <code>copy_to</code> ফিল্ড আবার অন্য ফিল্ডে copy করা যায় না।</li>
        <li><strong>একাধিক গন্তব্যে কপি করা যায়:</strong> <code>"copy_to": ["search_all", "suggest_field"]</code>।</li>
        <li><strong>Mapping পরিবর্তন করলে reindex লাগবে</strong> — বিদ্যমান ডকুমেন্টে <code>copy_to</code> পূর্ববর্তীভাবে প্রয়োগ হয় না।</li>
      </ul>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> সাধারণ "সব কিছুতে খোঁজো" সার্চ বারের জন্য <code>copy_to</code> চমৎকার। কিন্তু যদি শিরোনামের মিল বর্ণনার মিলের চেয়ে বেশি গুরুত্বপূর্ণ হয় (যা সাধারণত হয়), তবে <code>multi_match</code> + boost বেশি উপযুক্ত। অনেক সিস্টেমে দুটিই ব্যবহার হয় — <code>copy_to</code> ফিল্ডে দ্রুত recall, আর নির্দিষ্ট ফিল্ডে boost দিয়ে precision।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>copy_to</code> ফিল্ডে ভিন্ন analyzer ব্যবহার করা যায় কি?</li>
        <li>ইনডেক্সের আকার কতটা বাড়বে?</li>
      </ul>
    `
  },
  {
    id: "es-39",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Ops","Snapshot and Restore","S3 Plugin"],
    question: "Snapshot and Restore API (repository-s3) দিয়ে ব্যাকআপ ও রিকভারি কীভাবে করবেন?",
    answer: `
      <p>Snapshot হলো Elasticsearch-এর অফিসিয়াল ব্যাকআপ ব্যবস্থা। এটি <strong>incremental</strong> — প্রতিটি snapshot কেবল আগেরটির পর থেকে পরিবর্তিত segment ফাইলগুলো কপি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ১. রিপোজিটরি রেজিস্টার করুন (repository-s3 প্লাগইন লাগে)
PUT _snapshot/s3-backup
{
  "type": "s3",
  "settings": {
    "bucket": "my-es-backups",
    "region": "ap-southeast-1",
    "base_path": "production",
    "compress": true
  }
}

# ২. স্বয়ংক্রিয় snapshot (SLM — Snapshot Lifecycle Management)
PUT _slm/policy/daily-snapshots
{
  "schedule": "0 30 2 * * ?",              // প্রতিদিন রাত ২:৩০
  "name": "&lt;prod-snap-{now/d}&gt;",
  "repository": "s3-backup",
  "config": { "indices": ["*"], "include_global_state": true },
  "retention": { "expire_after": "30d", "min_count": 7, "max_count": 50 }
}

# ৩. রিস্টোর
POST _snapshot/s3-backup/prod-snap-2026.08.10/_restore
{
  "indices": "products",
  "rename_pattern": "(.+)",
  "rename_replacement": "restored_$1"      // মূল ইনডেক্স অক্ষত রাখুন
}</code></pre>
      </div>
      <h4>Incremental কীভাবে কাজ করে</h4>
      <p>Lucene segment <strong>অপরিবর্তনীয়</strong> — একবার লেখা হলে কখনও বদলায় না। তাই Elasticsearch শুধু দেখে কোন segment ফাইলগুলো রিপোজিটরিতে এখনও নেই, এবং কেবল সেগুলোই আপলোড করে।</p>
      <p>ফলে প্রথম snapshot বড় হলেও পরেরগুলো অনেক ছোট ও দ্রুত হয় — এমনকি প্রতিদিন সম্পূর্ণ ক্লাস্টারের snapshot নেওয়াও ব্যবহারিক।</p>
      <h4>গুরুত্বপূর্ণ বিষয়</h4>
      <ul>
        <li><strong>রিস্টোর করার আগে ইনডেক্স বন্ধ বা মুছতে হয়</strong> — খোলা ইনডেক্সের উপর রিস্টোর করা যায় না। <code>rename_pattern</code> দিয়ে নতুন নামে রিস্টোর করাই নিরাপদ।</li>
        <li><strong>Snapshot ক্লাস্টারে চাপ ফেলে</strong> (I/O ও নেটওয়ার্ক) — কম ট্রাফিকের সময় শিডিউল করুন।</li>
        <li><strong>সংস্করণ সামঞ্জস্য:</strong> নতুন সংস্করণের snapshot পুরনো সংস্করণে রিস্টোর করা যায় না। সাধারণত এক বড় সংস্করণ পিছিয়ে পর্যন্ত সমর্থিত।</li>
        <li><strong><code>include_global_state</code>:</strong> ক্লাস্টার সেটিংস, index template, ILM নীতি ও ingest pipeline সংরক্ষণ করে — সম্পূর্ণ পুনরুদ্ধারের জন্য গুরুত্বপূর্ণ।</li>
      </ul>
      <h4>সবচেয়ে গুরুত্বপূর্ণ পরামর্শ</h4>
      <p><strong>রিস্টোর নিয়মিত পরীক্ষা করুন।</strong> "আমাদের snapshot আছে" আর "আমরা পুনরুদ্ধার করতে পারি" এক জিনিস নয়। একটি পরিত্যক্ত ক্লাস্টারে পর্যায়ক্রমে রিস্টোর drill চালান — নাহলে আপনার RTO একটি অনুমান মাত্র।</p>
      <p><strong>Searchable snapshot</strong> (Enterprise ফিচার) দিয়ে S3-তে থাকা snapshot সরাসরি সার্চ করা যায়, সম্পূর্ণ রিস্টোর ছাড়াই — ILM-এর frozen tier এটিই ব্যবহার করে এবং পুরনো ডেটার খরচ নাটকীয়ভাবে কমায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Snapshot নেওয়ার সময় ইনডেক্সিং চলতে থাকলে কী হয়?</li>
        <li>একটি নির্দিষ্ট ইনডেক্স হারালে দ্রুততম পুনরুদ্ধারের উপায় কী?</li>
      </ul>
    `
  },
  {
    id: "es-40",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Queries","Geo","geo_point"],
    question: "geo_point vs geo_shape field type এবং geo_distance query কীভাবে কাজ করে?",
    answer: `
      <p>Elasticsearch দুটি geo টাইপ দেয়, এবং এদের ক্ষমতা ও খরচ সম্পূর্ণ ভিন্ন।</p>
      <table>
        <tr><th>দিক</th><th><code>geo_point</code></th><th><code>geo_shape</code></th></tr>
        <tr><td>কী সংরক্ষণ করে</td><td>একটি বিন্দু (lat, lon)</td><td>যেকোনো আকৃতি — polygon, line, circle</td></tr>
        <tr><td>পারফরম্যান্স</td><td><strong>দ্রুত</strong></td><td>ধীর, বেশি জায়গা</td></tr>
        <tr><td>উপযুক্ত</td><td>দোকান, ব্যবহারকারী, ঘটনা</td><td>এলাকা, সীমানা, রুট, ডেলিভারি জোন</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /stores
{ "mappings": { "properties": {
    "location":      { "type": "geo_point" },
    "delivery_zone": { "type": "geo_shape" }
}}}

# ⚠️ geo_point-এ একাধিক ফরম্যাট গ্রহণযোগ্য — ক্রম ভিন্ন!
PUT /stores/_doc/1
{
  "location": { "lat": 23.8103, "lon": 90.4125 },   // অবজেক্ট: lat প্রথমে
  // "location": [90.4125, 23.8103],                 // অ্যারে: lon প্রথমে!
  // "location": "23.8103,90.4125"                   // স্ট্রিং: lat প্রথমে
}</code></pre>
      </div>
      <p><strong>সবচেয়ে সাধারণ বাগ:</strong> অ্যারে ফরম্যাটে <strong>longitude আগে</strong> (GeoJSON স্ট্যান্ডার্ড অনুসরণ করে), কিন্তু অবজেক্ট ও স্ট্রিং ফরম্যাটে <strong>latitude আগে</strong>। এটি গুলিয়ে ফেললে আপনার ঢাকার দোকান সাগরের মাঝখানে চলে যাবে — এবং কোনো এরর আসবে না।</p>
      <h4>প্রধান কুয়েরি</h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># নির্দিষ্ট দূরত্বের মধ্যে
{ "geo_distance": {
    "distance": "5km",
    "location": { "lat": 23.8103, "lon": 90.4125 }
}}

# দূরত্ব অনুযায়ী সাজানো (+ প্রতিটি ফলাফলে দূরত্ব পাওয়া)
"sort": [{ "_geo_distance": {
    "location": { "lat": 23.8103, "lon": 90.4125 },
    "order": "asc", "unit": "km"
}}]

# একটি নির্দিষ্ট এলাকার মধ্যে
{ "geo_bounding_box": { "location": {
    "top_left":     { "lat": 24.0, "lon": 90.2 },
    "bottom_right": { "lat": 23.6, "lon": 90.6 }
}}}

# geo_shape — এই বিন্দুটি কোন ডেলিভারি জোনে পড়ে?
{ "geo_shape": {
    "delivery_zone": {
      "shape": { "type": "point", "coordinates": [90.4125, 23.8103] },
      "relation": "contains"
}}}</code></pre>
      </div>
      <h4>ব্যবহারিক টিপ</h4>
      <ul>
        <li><strong><code>geo_bounding_box</code> সবচেয়ে দ্রুত</strong> — মানচিত্রের দৃশ্যমান অংশে যা আছে তা দেখাতে এটিই ব্যবহার করুন, <code>geo_distance</code> নয়।</li>
        <li><strong>Filter context-এ রাখুন</strong> — geo কুয়েরিতে সাধারণত স্কোরের দরকার নেই।</li>
        <li><strong><code>geo_distance</code> aggregation</strong> দিয়ে "১ কিমি-র মধ্যে ৫টি, ৫ কিমি-র মধ্যে ২০টি" ধরনের ফলাফল দেওয়া যায়।</li>
        <li><strong>Decay function</strong> (<code>gauss</code>) দিয়ে দূরত্বকে প্রাসঙ্গিকতার সাথে মেশানো যায় — "কাছের এবং ভালো রেটিংয়ের রেস্তোরাঁ"।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Elasticsearch geo বনাম Redis GEO — কখন কোনটি?</li>
        <li>বিশাল geo_shape (দেশের সীমানা) পারফরম্যান্সে কী প্রভাব ফেলে?</li>
      </ul>
    `
  },
  {
    id: "es-41",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Internals","Translog","Flush"],
    question: "Elasticsearch Translog (Transactional Log) এবং Flush Operation কীভাবে ডেটা স্থায়িত্ব গ্যারান্টি দেয়?",
    answer: `
      <p>Elasticsearch-এ ডেটা স্থায়িত্বের (durability) নিশ্চয়তা আসে <strong>translog</strong> থেকে — অন্য ডাটাবেজের write-ahead log-এর সমতুল্য।</p>
      <h4>যে সমস্যাটি সমাধান করে</h4>
      <p>ইনডেক্স করা ডকুমেন্ট প্রথমে একটি in-memory buffer-এ যায়। <code>refresh</code> (প্রতি ১ সেকেন্ডে) হলে সেটি একটি segment-এ পরিণত হয়ে <em>সার্চযোগ্য</em> হয় — কিন্তু segment তখনও <strong>OS-এর ফাইল ক্যাশে</strong>, ডিস্কে নয়। এই অবস্থায় নোড ক্র্যাশ করলে ডেটা হারিয়ে যাবে।</p>
      <p>প্রতিটি ডকুমেন্টে <code>fsync</code> করা অত্যন্ত ব্যয়বহুল হতো। তাই Elasticsearch প্রতিটি অপারেশন একটি <strong>append-only translog</strong>-এ লিখে রাখে — ক্রমিক লেখা, তাই দ্রুত।</p>
      <pre class="mermaid">
flowchart TD
    A["ইনডেক্স রিকোয়েস্ট"] --> B["In-memory buffer"]
    A --> T["Translog<br/>(append-only, fsync)"]
    B -->|"refresh (1s)"| C["Segment → সার্চযোগ্য<br/>(এখনও OS ক্যাশে)"]
    C -->|"flush (30 মিনিট বা 512MB)"| D["ডিস্কে fsync<br/>+ translog খালি"]
    T -.->|"ক্র্যাশে রিকভারি"| E["translog রিপ্লে করে<br/>হারানো অপারেশন ফিরিয়ে আনা"]
      </pre>
      <span class="diagram-caption">Refresh সার্চযোগ্যতা দেয়; flush স্থায়িত্ব দেয় — দুটি আলাদা জিনিস</span>
      <h4>তিনটি অপারেশন আলাদা করে চিনুন</h4>
      <table>
        <tr><th>অপারেশন</th><th>কী করে</th><th>কত ঘন ঘন</th></tr>
        <tr><td><strong>Refresh</strong></td><td>buffer → segment (সার্চযোগ্য)</td><td>১ সেকেন্ড (ডিফল্ট)</td></tr>
        <tr><td><strong>Flush</strong></td><td>segment ডিস্কে fsync + translog খালি</td><td>৩০ মিনিট বা translog ৫১২ MB</td></tr>
        <tr><td><strong>Fsync (translog)</strong></td><td>translog ডিস্কে নিশ্চিত</td><td>প্রতিটি রিকোয়েস্টে (ডিফল্ট)</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /my-index/_settings
{
  "index.translog.durability": "request",   // ডিফল্ট — সবচেয়ে নিরাপদ
  // "index.translog.durability": "async",  // ⚠️ দ্রুত, কিন্তু ডেটা হারাতে পারে
  "index.translog.sync_interval": "5s",
  "index.translog.flush_threshold_size": "512mb"
}</code></pre>
      </div>
      <h4>durability সেটিংয়ের ট্রেড-অফ</h4>
      <ul>
        <li><strong><code>request</code> (ডিফল্ট):</strong> প্রতিটি ইনডেক্স রিকোয়েস্টের পর translog fsync করা হয়, তারপরই সাফল্য জানানো হয়। ক্র্যাশে <strong>কিছুই হারায় না</strong>, কিন্তু প্রতিটি write-এ ডিস্ক I/O।</li>
        <li><strong><code>async</code>:</strong> প্রতি <code>sync_interval</code> (৫s) পরপর fsync। ইনডেক্সিং উল্লেখযোগ্যভাবে দ্রুত, কিন্তু ক্র্যাশে <strong>শেষ ৫ সেকেন্ডের ডেটা হারাতে পারে</strong>।</li>
      </ul>
      <p><strong>কখন <code>async</code> গ্রহণযোগ্য:</strong> লগ, মেট্রিক বা এমন ডেটা যা উৎস থেকে আবার তৈরি করা যায়। <strong>কখনও নয়:</strong> যেখানে Elasticsearch-ই সত্যের একমাত্র উৎস।</p>
      <p><strong>মনে রাখবেন:</strong> Elasticsearch একটি সার্চ ইঞ্জিন, প্রাথমিক ডাটাবেজ নয়। সত্যের উৎস অন্যত্র (SQL/MongoDB) রেখে Elasticsearch-কে পুনর্নির্মাণযোগ্য ইনডেক্স হিসেবে ব্যবহার করাই সবচেয়ে নিরাপদ স্থাপত্য।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Translog খুব বড় হয়ে গেলে রিকভারিতে কী প্রভাব পড়ে?</li>
        <li><code>?refresh=wait_for</code> প্যারামিটার কী করে?</li>
      </ul>
    `
  },
  {
    id: "es-42",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Rescore","Top N"],
    question: "Elasticsearch Rescore Query দিয়ে শীর্ষ ৫০টি ডকুমেন্টের র‍্যাঙ্কিং কীভাবে টিউন করবেন?",
    answer: `
      <p><strong>Rescore</strong> একটি দুই-ধাপের কৌশল: প্রথমে একটি সস্তা কুয়েরি দিয়ে প্রার্থী বাছাই, তারপর কেবল <em>শীর্ষ N</em> ডকুমেন্টে একটি ব্যয়বহুল কুয়েরি চালিয়ে পুনরায় র‍্যাঙ্ক করা।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /articles/_search
{
  "query": {                                  // দ্রুত — সব ডকুমেন্টে চলে
    "match": { "content": "elasticsearch performance tuning" }
  },
  "rescore": {
    "window_size": 50,                        // প্রতি shard-এ শীর্ষ ৫০টি
    "query": {
      "rescore_query": {                      // ব্যয়বহুল — শুধু ৫০টিতে
        "match_phrase": {
          "content": { "query": "elasticsearch performance", "slop": 2 }
        }
      },
      "query_weight": 0.7,
      "rescore_query_weight": 1.3
    }
  }
}</code></pre>
      </div>
      <h4>কেন এটি কার্যকর</h4>
      <p><code>match_phrase</code> বা <code>script_score</code>-এর মতো কুয়েরি ব্যয়বহুল — অবস্থান তথ্য পরীক্ষা করতে হয় বা প্রতিটি ডকুমেন্টে script চালাতে হয়। ১ কোটি ডকুমেন্টে এটি চালানো অবাস্তব।</p>
      <p>কিন্তু ইউজার তো কেবল প্রথম পৃষ্ঠাই দেখেন। তাই সস্তা কুয়েরি দিয়ে ভালো প্রার্থী বাছাই করে কেবল সেই ৫০টিতে সূক্ষ্ম র‍্যাঙ্কিং প্রয়োগ করাই যথেষ্ট — <strong>গুণমান প্রায় একই, খরচ শতগুণ কম</strong>।</p>
      <h4>যে বিষয়গুলো জানা জরুরি</h4>
      <ul>
        <li><strong><code>window_size</code> <em>প্রতি shard</em>-এ প্রযোজ্য</strong> — ৫ shard-এ <code>window_size: 50</code> মানে মোট ২৫০টি ডকুমেন্ট rescore হবে।</li>
        <li><strong><code>window_size</code> অবশ্যই <code>from + size</code>-এর চেয়ে বড় হতে হবে</strong> — নাহলে যে ডকুমেন্ট ইউজার দেখবেন সেটি rescore-ই হয়নি।</li>
        <li><strong>Rescore পেজিনেশনে অসঙ্গতি তৈরি করতে পারে:</strong> ২য় পৃষ্ঠায় যাওয়ার সময় window-র বাইরের ডকুমেন্ট rescore হয়নি, তাই ক্রম অদ্ভুত মনে হতে পারে।</li>
        <li><strong>একাধিক rescore চেইন করা যায়</strong> — প্রতিটি আগেরটির ফলাফলের উপর কাজ করে।</li>
        <li><strong>Rescore শুধু স্কোর বদলায়, ফিল্টার করে না</strong> — কোনো ডকুমেন্ট বাদ পড়ে না।</li>
      </ul>
      <h4>সাধারণ ব্যবহার</h4>
      <ul>
        <li><strong>Phrase matching:</strong> প্রথমে যেকোনো শব্দ মেলা ডকুমেন্ট আনুন, তারপর যেগুলোতে শব্দগুলো <em>পাশাপাশি</em> আছে সেগুলোকে উপরে তুলুন।</li>
        <li><strong>ML re-ranking:</strong> একটি learning-to-rank মডেল বা cross-encoder দিয়ে শীর্ষ ৫০টি পুনরায় সাজানো — আধুনিক সার্চ সিস্টেমে এটিই স্ট্যান্ডার্ড প্যাটার্ন।</li>
        <li><strong>ব্যক্তিগতকরণ:</strong> ইউজারের ইতিহাসের ভিত্তিতে শীর্ষ ফলাফল সমন্বয় করা।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>window_size</code> কত রাখবেন — ট্রেড-অফ কী?</li>
        <li>Rescore ও <code>function_score</code>-এর মধ্যে কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "es-43",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Security","X-Pack","RBP"],
    question: "Elasticsearch Security: Role-Based Access Control (RBAC), Document Level Security (DLS), and Field Level Security (FLS) কী?",
    answer: `
      <p>Elasticsearch তিন স্তরে অ্যাক্সেস নিয়ন্ত্রণ দেয় — কোন <em>ইনডেক্সে</em>, কোন <em>ডকুমেন্টে</em>, এবং কোন <em>ফিল্ডে</em> একজন ইউজার যেতে পারবে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>POST /_security/role/tenant_analyst
{
  "indices": [{
    "names": ["orders-*", "products-*"],
    "privileges": ["read", "view_index_metadata"],

    // Document Level Security — শুধু নিজের টেন্যান্টের ডেটা
    "query": {
      "template": {
        "source": "{\\"term\\":{\\"tenant_id\\":\\"{{_user.metadata.tenant_id}}\\"}}"
      }
    },

    // Field Level Security — সংবেদনশীল ফিল্ড লুকানো
    "field_security": {
      "grant":  ["*"],
      "except": ["customer.email", "customer.phone", "payment.*"]
    }
  }]
}

POST /_security/user/analyst1
{
  "password": "...",
  "roles": ["tenant_analyst"],
  "metadata": { "tenant_id": "acme-corp" }
}</code></pre>
      </div>
      <h4>DLS — মাল্টি-টেন্যান্সির চাবি</h4>
      <p><code>query</code> টেমপ্লেটটি ইউজারের metadata থেকে মান নেয়, তাই <strong>একটিমাত্র role দিয়ে সব টেন্যান্ট সামলানো যায়</strong> — প্রতিটি টেন্যান্টের জন্য আলাদা role বানাতে হয় না।</p>
      <p>এই ফিল্টার Elasticsearch <em>প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে</em> যোগ করে দেয়। অ্যাপ্লিকেশন ডেভেলপার ভুলে গেলেও ডেটা ফাঁস হবে না — এটিই এর সবচেয়ে বড় নিরাপত্তা মূল্য। অ্যাপ্লিকেশন-স্তরের ফিল্টারিংয়ে একটি ভুলে যাওয়া <code>WHERE</code> ক্লজ ভয়াবহ ডেটা ফাঁস ঘটাতে পারে।</p>
      <h4>FLS — ফিল্ড লুকানো</h4>
      <p>একই ডকুমেন্ট বিভিন্ন ইউজারের কাছে ভিন্নভাবে দেখাবে — অ্যানালিস্ট অর্ডার দেখবেন কিন্তু গ্রাহকের ইমেইল ও পেমেন্ট তথ্য দেখবেন না। ফিল্ডগুলো <code>_source</code> থেকেই বাদ পড়ে যায়।</p>
      <h4>সীমাবদ্ধতা যা জানা জরুরি</h4>
      <ul>
        <li><strong>DLS/FLS পারফরম্যান্স খরচ করে</strong> — প্রতিটি কুয়েরিতে বাড়তি ফিল্টার ও ফিল্ড ফিল্টারিং। উচ্চ ট্রাফিকে এটি লক্ষণীয়।</li>
        <li><strong>FLS-এ লুকানো ফিল্ডে সার্চ করা যায় না</strong> — তবে সেই ফিল্ডের অস্তিত্ব aggregation-এর মাধ্যমে অনুমান করা সম্ভব হতে পারে; সম্পূর্ণ গোপনীয়তার জন্য আলাদা ইনডেক্স ভালো।</li>
        <li><strong>এগুলো Elastic-এর বাণিজ্যিক (Platinum) ফিচার</strong> — বেসিক লাইসেন্সে শুধু ইনডেক্স-স্তরের RBAC পাওয়া যায়।</li>
        <li><strong>বিকল্প (বেসিক লাইসেন্সে):</strong> প্রতি-টেন্যান্ট আলাদা ইনডেক্স + filtered alias, অথবা অ্যাপ্লিকেশন স্তরে কঠোরভাবে ফিল্টার প্রয়োগ।</li>
      </ul>
      <p><strong>মৌলিক নিরাপত্তা:</strong> এসবের আগে নিশ্চিত করুন Elasticsearch ইন্টারনেটে এক্সপোজড নয়, TLS চালু আছে, এবং ডিফল্ট পাসওয়ার্ড বদলানো হয়েছে। উন্মুক্ত Elasticsearch ক্লাস্টার থেকে ডেটা চুরি একটি অত্যন্ত সাধারণ ঘটনা।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মাল্টি-টেন্যান্সিতে DLS বনাম আলাদা ইনডেক্স — কখন কোনটি?</li>
        <li>API key দিয়ে অ্যাক্সেস নিয়ন্ত্রণ কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-44",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Mapping","coerce","ignore_malformed"],
    question: "Elasticsearch ignore_malformed and coerce mapping parameters কীভাবে ইনপুট এরর সামলায়?",
    answer: `
      <p>ইনকামিং ডেটা সবসময় পরিষ্কার হয় না। <code>ignore_malformed</code> ও <code>coerce</code> নির্ধারণ করে Elasticsearch টাইপ-অমিল কীভাবে সামলাবে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT /events
{ "mappings": {
    "properties": {
      "user_count": { "type": "integer", "ignore_malformed": true },
      "price":      { "type": "float",   "coerce": true },      // ডিফল্ট
      "timestamp":  { "type": "date",    "ignore_malformed": true }
    }
}}

# coerce: true (ডিফল্ট) — স্ট্রিং থেকে সংখ্যায় রূপান্তর
{ "price": "99.5" }      → 99.5 হিসেবে সংরক্ষিত ✅

# ignore_malformed: true — অবৈধ মান উপেক্ষা, বাকি ডকুমেন্ট সংরক্ষিত
{ "user_count": "অনেক" } → user_count ইনডেক্স হবে না,
                             কিন্তু ডকুমেন্টের বাকি অংশ ঠিক থাকবে ✅
                             _ignored ফিল্ডে নাম যোগ হবে</code></pre>
      </div>
      <h4>ডিফল্ট আচরণ কেন সমস্যা</h4>
      <p>এগুলো ছাড়া একটি অবৈধ মান <strong>পুরো ডকুমেন্ট প্রত্যাখ্যান</strong> করায়। লগ ইনজেশনে এটি বিপজ্জনক — একটি ফিল্ডে একটি খারাপ মানের কারণে সেই লগ এন্ট্রির <em>সব</em> তথ্য হারিয়ে যায়।</p>
      <p>আরও খারাপ: bulk ইনডেক্সিংয়ে এই ব্যর্থতা নীরবে ঘটতে পারে যদি আপনি প্রতিটি আইটেমের ফলাফল যাচাই না করেন।</p>
      <h4>মূল সুবিধা: <code>_ignored</code> ফিল্ড</h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># কোন ডকুমেন্টে কোন ফিল্ড উপেক্ষিত হয়েছে খুঁজুন
GET /events/_search
{ "query": { "exists": { "field": "_ignored" } } }

# একটি নির্দিষ্ট ফিল্ডে সমস্যা কতবার হয়েছে
GET /events/_search
{ "query": { "term": { "_ignored": "user_count" } } }</code></pre>
      </div>
      <p>এটি অত্যন্ত মূল্যবান — সমস্যা নীরবে চাপা পড়ে না, আপনি ঠিক দেখতে পান কোথায় ডেটার মান খারাপ এবং কতটা।</p>
      <h4>ব্যবহারিক নির্দেশনা</h4>
      <ul>
        <li><strong>লগ ও অ্যানালিটিক্স ইনডেক্সে <code>ignore_malformed: true</code> রাখুন</strong> — আংশিক ডেটা কোনো ডেটার চেয়ে ভালো, এবং একটি খারাপ ফিল্ড পুরো লগ এন্ট্রি নষ্ট করবে না।</li>
        <li><strong>ব্যবসায়িক ক্রিটিক্যাল ডেটায় <code>false</code> রাখুন</strong> — সেখানে খারাপ ডেটা নীরবে গ্রহণ করার চেয়ে জোরে ব্যর্থ হওয়া ভালো, যাতে উৎসেই ঠিক করা যায়।</li>
        <li><strong>ইনডেক্স-স্তরে ডিফল্ট দেওয়া যায়:</strong> <code>"index.mapping.ignore_malformed": true</code>।</li>
        <li><strong>সীমাবদ্ধতা:</strong> এটি nested/object টাইপে কাজ করে না — একটি অবজেক্ট প্রত্যাশিত জায়গায় স্ট্রিং এলে ডকুমেন্ট তবুও প্রত্যাখ্যাত হবে।</li>
        <li><strong><code>_ignored</code> মনিটর করুন</strong> — এর সংখ্যা হঠাৎ বাড়া মানে উৎস সিস্টেমে কিছু বদলেছে।</li>
      </ul>
      <p><strong>সেরা সমাধান:</strong> ingest pipeline-এ ডেটা পরিষ্কার ও রূপান্তর করে নিন — তাহলে mapping-এ ক্ষমা করার প্রয়োজনই কমে যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>coerce: false</code> কখন দরকার?</li>
        <li>Ingest pipeline দিয়ে ডেটা ভ্যালিডেশন কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "es-45",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Pipeline","Ingest Node","Grok"],
    question: "Ingest Pipelines (_ingest/pipeline) and Grok Processors দিয়ে ইনকামিং লগ পার্সিং কীভাবে করবেন?",
    answer: `
      <p><strong>Ingest pipeline</strong> ডকুমেন্ট ইনডেক্স হওয়ার <em>আগে</em> তাকে রূপান্তর করে — Logstash-এর মতো কাজ, কিন্তু Elasticsearch-এর ভেতরেই, কোনো আলাদা সার্ভিস ছাড়া।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>PUT _ingest/pipeline/nginx-logs
{
  "processors": [
    {
      "grok": {
        "field": "message",
        "patterns": ["%{IPORHOST:client_ip} - %{DATA:user} \\\\[%{HTTPDATE:timestamp}\\\\] \\"%{WORD:method} %{DATA:url}\\" %{NUMBER:status:int} %{NUMBER:bytes:int}"]
      }
    },
    { "date":   { "field": "timestamp",
                  "formats": ["dd/MMM/yyyy:HH:mm:ss Z"],
                  "target_field": "@timestamp" } },
    { "geoip":  { "field": "client_ip", "target_field": "geo" } },
    { "user_agent": { "field": "agent" } },
    { "remove": { "field": ["message", "timestamp"] } },
    { "set":    { "field": "env", "value": "production" } }
  ],
  "on_failure": [
    { "set": { "field": "ingest_error", "value": "{{ _ingest.on_failure_message }}" } }
  ]
}

# ব্যবহার
PUT /logs/_doc/1?pipeline=nginx-logs { "message": "..." }
# বা ইনডেক্সের ডিফল্ট হিসেবে:
PUT /logs/_settings { "index.default_pipeline": "nginx-logs" }</code></pre>
      </div>
      <h4>Grok — কাঠামোহীন লগকে কাঠামো দেওয়া</h4>
      <p>Grok হলো নামযুক্ত regex প্যাটার্নের একটি লাইব্রেরি। <code>%{IPORHOST:client_ip}</code> লিখলে সেটি একটি IP মেলায় এবং <code>client_ip</code> ফিল্ডে রাখে। কাঁচা regex লেখার চেয়ে এটি অনেক পাঠযোগ্য ও পুনঃব্যবহারযোগ্য।</p>
      <p><strong>Grok-এর বিপদ:</strong> খারাপভাবে লেখা প্যাটার্ন <em>catastrophic backtracking</em> ঘটাতে পারে — একটি লগ লাইন প্রসেস করতে সেকেন্ডের পর সেকেন্ড লেগে যায় এবং ইনজেশন পাইপলাইন আটকে যায়। যতটা সম্ভব নির্দিষ্ট প্যাটার্ন ব্যবহার করুন, <code>%{DATA}</code> বা <code>.*</code> কম ব্যবহার করুন।</p>
      <p><strong>বিকল্প:</strong> লগ যদি ইতিমধ্যে গঠিত হয় (JSON), তবে <code>json</code> processor অনেক দ্রুত ও নিরাপদ। <strong>সবচেয়ে ভালো সমাধান — অ্যাপ্লিকেশনকেই JSON লগ লিখতে বলুন</strong>, তাহলে grok-এর দরকারই পড়বে না।</p>
      <h4><code>on_failure</code> অপরিহার্য</h4>
      <p>একটি লগ লাইন প্যাটার্নে না মিললে ডিফল্টে পুরো ডকুমেন্ট প্রত্যাখ্যাত হয় — অর্থাৎ <strong>ডেটা নীরবে হারিয়ে যায়</strong>। <code>on_failure</code> হ্যান্ডলার দিয়ে সেই ডকুমেন্টকে একটি এরর ফিল্ডসহ সংরক্ষণ করুন, যাতে পরে তদন্ত করা যায়।</p>
      <h4>টেস্টিং</h4>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ডিপ্লয়ের আগে পাইপলাইন পরীক্ষা করুন
POST _ingest/pipeline/nginx-logs/_simulate
{ "docs": [ { "_source": { "message": "192.168.1.1 - - [10/Aug/2026:..." } } ] }</code></pre>
      </div>
      <p><strong>Logstash-এর তুলনায়:</strong> Ingest pipeline সহজ ও আলাদা অবকাঠামো লাগে না, কিন্তু Logstash-এর মতো বাফারিং, জটিল রাউটিং বা একাধিক আউটপুট নেই। হালকা রূপান্তরে ingest pipeline, জটিল ETL-এ Logstash।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Ingest node আলাদা রাখা উচিত কি?</li>
        <li>একটি পাইপলাইনে অন্য পাইপলাইন ডাকা যায় কি?</li>
      </ul>
    `
  },
  {
    id: "es-46",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Highlighting","Fast Vector Highlighter"],
    question: "Unified Highlighter vs Fast Vector Highlighter (FVH) এর পার্থক্য কী?",
    answer: `
      <p>Elasticsearch-এ তিনটি highlighter আছে, এবং এদের মূল পার্থক্য — <strong>মিলে যাওয়া শব্দের অবস্থান কীভাবে বের করা হয়</strong>।</p>
      <table>
        <tr><th>দিক</th><th>Unified (ডিফল্ট)</th><th>FVH</th><th>Plain</th></tr>
        <tr><td>অবস্থান পায়</td><td>postings বা term vector</td><td><strong>সংরক্ষিত term vector</strong></td><td>রানটাইমে পুনরায় analyze</td></tr>
        <tr><td>বড় ফিল্ডে</td><td>ভালো</td><td><strong>দ্রুততম</strong></td><td>খুব ধীর</td></tr>
        <tr><td>ইনডেক্স আকার</td><td>স্বাভাবিক</td><td><strong>উল্লেখযোগ্য বেশি</strong></td><td>স্বাভাবিক</td></tr>
        <tr><td>বাক্য-সীমানা বোঝে</td><td>✅ (BreakIterator)</td><td>❌ কম ভালো</td><td>❌</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># FVH ব্যবহার করতে হলে ইনডেক্সে term vector সংরক্ষণ করতে হবে
PUT /articles
{ "mappings": { "properties": {
    "content": {
      "type": "text",
      "term_vector": "with_positions_offsets"    // ⚠️ ইনডেক্স বড় করে
    }
}}}

GET /articles/_search
{
  "query": { "match": { "content": "elasticsearch" } },
  "highlight": {
    "type": "fvh",
    "fields": { "content": { "fragment_size": 150 } }
  }
}</code></pre>
      </div>
      <h4>কোনটি বাছবেন</h4>
      <ul>
        <li><strong>Unified (ডিফল্ট):</strong> প্রায় সব ক্ষেত্রেই সঠিক পছন্দ। এটি Lucene-এর <code>UnifiedHighlighter</code> ব্যবহার করে, বাক্য-সীমানা বুঝে সুন্দর টুকরো তৈরি করে, এবং কোনো বাড়তি ইনডেক্স কনফিগ লাগে না। <strong>বিশেষ কারণ ছাড়া এটি বদলাবেন না।</strong></li>
        <li><strong>FVH:</strong> কেবল তখনই — যখন ফিল্ডগুলো <em>খুব বড়</em> (সম্পূর্ণ বই বা নিবন্ধ) এবং highlighting মাপা যায় এমনভাবে ধীর হচ্ছে। ইনডেক্স আকার বৃদ্ধির (প্রায়ই ২ গুণ) বিনিময়ে গতি পাওয়া যায়।</li>
        <li><strong>Plain:</strong> ছোট ফিল্ডে ঠিক আছে, কিন্তু বড় ফিল্ডে ভয়ংকর ধীর — কারণ এটি প্রতিটি ডকুমেন্টের টেক্সট মেমরিতে এনে পুনরায় analyze করে।</li>
      </ul>
      <h4>সিদ্ধান্তের ভিত্তি</h4>
      <p><strong>আগে মাপুন, তারপর বদলান।</strong> <code>profile: true</code> দিয়ে দেখুন highlighting আসলেই কুয়েরির সময়ের বড় অংশ নিচ্ছে কি না। বেশিরভাগ অ্যাপ্লিকেশনে ডকুমেন্ট যথেষ্ট ছোট এবং unified highlighter সম্পূর্ণ যথেষ্ট।</p>
      <p><strong>বিকল্প অপ্টিমাইজেশন:</strong> highlighting-এর খরচ কমাতে <code>number_of_fragments</code> কমান, বা কেবল একটি ছোট সারাংশ ফিল্ডে (<code>summary</code>) highlight করুন — পুরো <code>content</code>-এ নয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Term vector সংরক্ষণে ইনডেক্স কতটা বাড়ে?</li>
        <li>Highlighting-এর ফলাফল ক্যাশ করা যায় কি?</li>
      </ul>
    `
  },
  {
    id: "es-47",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Aggregations","Significant Terms","Anomaly"],
    question: "Significant Terms Aggregation দিয়ে ট্রেন্ড বা অস্বাভাবিকতা ডিটেক্ট কীভাবে করবেন?",
    answer: `
      <p><code>significant_terms</code> aggregation সাধারণ <code>terms</code> থেকে মৌলিকভাবে আলাদা — এটি <em>সবচেয়ে বেশি ঘটে</em> এমন টার্ম দেখায় না, বরং <strong>যে টার্মগুলো অস্বাভাবিকভাবে বেশি ঘটে</strong> তা দেখায়।</p>
      <h4>পার্থক্যটি বোঝা</h4>
      <p>ধরুন ঢাকায় ঘটা অপরাধের ডেটা বিশ্লেষণ করছেন:</p>
      <ul>
        <li><strong><code>terms</code></strong> দেখাবে সবচেয়ে সাধারণ অপরাধ — "চুরি", "ছিনতাই"। কিন্তু এগুলো <em>সব জায়গাতেই</em> সাধারণ, তাই ঢাকা সম্পর্কে বিশেষ কিছু বলে না।</li>
        <li><strong><code>significant_terms</code></strong> তুলনা করে — এই উপসেটে (ঢাকা) কোন টার্মের হার <em>সামগ্রিক ডেটার তুলনায়</em> অস্বাভাবিক বেশি। হয়তো "সাইবার প্রতারণা" — যা মোট সংখ্যায় কম, কিন্তু আনুপাতিকভাবে অনেক বেশি।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /logs/_search
{
  "size": 0,
  "query": {                                    // foreground সেট
    "bool": { "filter": [
      { "term": { "status": 500 } },
      { "range": { "@timestamp": { "gte": "now-1h" } } }
    ]}
  },
  "aggs": {
    "unusual_factors": {
      "significant_terms": {
        "field": "service.keyword",
        "size": 10
        // background = পুরো ইনডেক্স (ডিফল্ট)
      }
    }
  }
}
# → কোন সার্ভিসে ৫০০ এরর অস্বাভাবিকভাবে বেশি হচ্ছে</code></pre>
      </div>
      <h4>কীভাবে কাজ করে</h4>
      <p>Elasticsearch দুটি সেট তুলনা করে — <strong>foreground</strong> (আপনার কুয়েরির ফলাফল) ও <strong>background</strong> (পুরো ইনডেক্স বা নির্দিষ্ট <code>background_filter</code>)। প্রতিটি টার্মের জন্য এটি একটি পরিসংখ্যানগত স্কোর গণনা করে — foreground-এ অনুপাত background-এর তুলনায় কতটা বেশি।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>ইনসিডেন্ট তদন্ত:</strong> "গত ১ ঘণ্টার এররগুলোতে কোন সার্ভিস, কোন ভার্সন বা কোন হোস্ট অস্বাভাবিকভাবে বেশি?" — সাধারণ terms aggregation এখানে অকেজো, কারণ সবচেয়ে ব্যস্ত সার্ভিসই সবসময় শীর্ষে থাকবে।</li>
        <li><strong>নিরাপত্তা:</strong> ব্যর্থ লগইনে কোন IP রেঞ্জ বা user-agent অস্বাভাবিক।</li>
        <li><strong>সুপারিশ:</strong> "যারা এটি কিনেছেন তারা আর কী কেনেন" — জনপ্রিয় পণ্যের বদলে <em>প্রাসঙ্গিকভাবে</em> সম্পর্কিত পণ্য।</li>
        <li><strong>ট্রেন্ড শনাক্তকরণ:</strong> আজকের সার্চ টার্ম গত মাসের তুলনায় কোনগুলো হঠাৎ বেড়েছে।</li>
      </ul>
      <p><strong>সংশ্লিষ্ট:</strong> <code>significant_text</code> — একই ধারণা, কিন্তু <code>text</code> ফিল্ডে কাজ করে এবং ভেতরে ডুপ্লিকেট ফিল্টারিং করে। লগ মেসেজ থেকে অস্বাভাবিক শব্দ বের করতে উপযোগী, তবে অনেক ধীর।</p>
      <p><strong>সতর্কতা:</strong> Foreground সেট খুব ছোট হলে (কয়েকটি ডকুমেন্ট) ফলাফল পরিসংখ্যানগতভাবে অর্থহীন হয়ে পড়ে। <code>min_doc_count</code> দিয়ে ন্যূনতম সীমা দিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>background_filter</code> কখন স্পষ্টভাবে দেবেন?</li>
        <li>এটি অ্যানোমালি ডিটেকশনের বিকল্প হতে পারে কি?</li>
      </ul>
    `
  },
  {
    id: "es-48",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Explain API","_explain"],
    question: "Elasticsearch Explain API (GET /index/_explain/id) দিয়ে কেন কোনো ডকুমেন্ট সার্চে আসল না তা ডেবাগ কীভাবে করবেন?",
    answer: `
      <p>"কেন এই ডকুমেন্টটি সার্চে আসছে না?" — Elasticsearch-এর সবচেয়ে সাধারণ প্রশ্ন। <code>_explain</code> API এর সরাসরি উত্তর দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /products/_explain/PRODUCT_ID
{
  "query": { "match": { "title": "wireless headphones" } }
}

# রেসপন্স:
{
  "matched": false,                    // ← মূল উত্তর
  "explanation": {
    "value": 0.0,
    "description": "no matching term",
    "details": [...]
  }
}</code></pre>
      </div>
      <p>ডকুমেন্ট মিললে <code>explanation</code>-এ স্কোরের সম্পূর্ণ গাণিতিক ভাঙন দেখা যায় — কোন টার্ম কত অবদান রাখল, TF/IDF/field length কীভাবে হিসাব হলো।</p>
      <h4>ডিবাগিংয়ের ধাপ</h4>
      <p><code>_explain</code> "না মিলল" বললে পরের ধাপ হলো <strong>কেন</strong> তা বের করা। সবচেয়ে সাধারণ কারণ — <em>ইনডেক্সে থাকা টোকেন আর সার্চ টার্ম মিলছে না</em>।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ১. আমার সার্চ টার্ম কোন টোকেনে ভাঙছে?
POST /products/_analyze
{ "field": "title", "text": "wireless headphones" }

# ২. ডকুমেন্টের ফিল্ডটি কোন টোকেনে ইনডেক্স হয়েছে?
GET /products/_termvectors/PRODUCT_ID?fields=title

# ৩. mapping কী বলছে?
GET /products/_mapping/field/title

# ৪. ডকুমেন্টটি আদৌ ইনডেক্সে আছে কি?
GET /products/_doc/PRODUCT_ID</code></pre>
      </div>
      <p><strong><code>_termvectors</code> অত্যন্ত মূল্যবান</strong> — এটি দেখায় একটি নির্দিষ্ট ডকুমেন্টের একটি ফিল্ড ঠিক কোন টোকেনে ইনডেক্স হয়েছে। এটি আর <code>_analyze</code>-এর ফল পাশাপাশি রাখলে অমিলটি সাধারণত সাথে সাথে চোখে পড়ে।</p>
      <h4>সবচেয়ে সাধারণ কারণসমূহ</h4>
      <ul>
        <li><strong><code>text</code> ফিল্ডে <code>term</code> কুয়েরি</strong> — term analyze করে না, তাই lowercase টোকেনের সাথে মূল কেস মেলে না।</li>
        <li><strong>Analyzer-এর অমিল</strong> — ইনডেক্সে stemming হয়েছে কিন্তু সার্চে হয়নি (বা উল্টো)।</li>
        <li><strong>Refresh হয়নি</strong> — ডকুমেন্ট ইনডেক্স হয়েছে কিন্তু ১ সেকেন্ড পার হয়নি, তাই এখনও সার্চযোগ্য নয়। টেস্টে <code>?refresh=wait_for</code> ব্যবহার করুন।</li>
        <li><strong>ভুল ফিল্ড</strong> — <code>title</code>-এ খুঁজছেন কিন্তু ডেটা <code>name</code>-এ আছে।</li>
        <li><strong><code>ignore_above</code></strong> — keyword ফিল্ডে খুব লম্বা মান ইনডেক্স হয়নি।</li>
      </ul>
      <h4>সম্পর্কিত টুল</h4>
      <ul>
        <li><strong><code>"explain": true</code></strong> সার্চ কুয়েরিতে — <em>সব</em> ফলাফলের স্কোর ব্যাখ্যা দেয়। র‍্যাঙ্কিং টিউন করার সময় অপরিহার্য।</li>
        <li><strong><code>_validate/query?explain</code></strong> — কুয়েরিটি ভেতরে কীভাবে রূপান্তরিত হচ্ছে তা দেখায়।</li>
        <li><strong><code>profile: true</code></strong> — কুয়েরির কোন অংশে কত সময় যাচ্ছে (ধীর কুয়েরি ডিবাগ করতে)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি ডকুমেন্ট প্রত্যাশার চেয়ে নিচে আসছে — কীভাবে ঠিক করবেন?</li>
        <li>Profile API-তে কী কী দেখবেন?</li>
      </ul>
    `
  },
  {
    id: "es-49",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Performance","Heap Size","32GB Limit"],
    question: "Elasticsearch Heap Size Setting: 31GB এর বেশি RAM বরাদ্দ করা কেন ক্ষতিকর (Compressed OOPs)?",
    answer: `
      <p>Elasticsearch-এর heap সাইজ নির্ধারণে দুটি নিয়ম আছে, এবং দ্বিতীয়টি স্বজ্ঞাবিরোধী — <strong>বেশি RAM দিলে পারফরম্যান্স খারাপ হতে পারে</strong>।</p>
      <h4>নিয়ম ১: মোট RAM-এর অর্ধেকের বেশি নয়</h4>
      <p>Elasticsearch ভেতরে Lucene ব্যবহার করে, এবং Lucene <strong>OS-এর file system cache</strong>-এর উপর প্রবলভাবে নির্ভরশীল — segment ফাইল, doc values, inverted index সবই সেখান থেকে পড়া হয়।</p>
      <p>সব RAM heap-এ দিয়ে দিলে OS-এর ক্যাশের জন্য কিছুই থাকে না, এবং প্রতিটি সার্চে ডিস্কে যেতে হয় — যা নাটকীয়ভাবে ধীর। <strong>অর্ধেক heap, অর্ধেক OS ক্যাশ</strong> — এটিই প্রমিত ভারসাম্য।</p>
      <h4>নিয়ম ২: ৩১ GB-র বেশি কখনও নয় (Compressed OOPs)</h4>
      <p>JVM একটি অপ্টিমাইজেশন ব্যবহার করে — <strong>Compressed Ordinary Object Pointers</strong>। heap ৩২ GB-র নিচে থাকলে JVM অবজেক্ট পয়েন্টার ৬৪ বিটের বদলে <strong>৩২ বিটে</strong> রাখতে পারে (৮-বাইট alignment ব্যবহার করে)।</p>
      <p>heap ৩২ GB অতিক্রম করলে এই অপ্টিমাইজেশন <strong>বন্ধ হয়ে যায়</strong> এবং সব পয়েন্টার দ্বিগুণ জায়গা নেয়। ফলে:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>31 GB heap  → compressed pointers → কার্যকর ধারণক্ষমতা বেশি
32 GB heap  → uncompressed        → পয়েন্টারে বাড়তি জায়গা
                                   → কার্যকর ধারণক্ষমতা 31 GB এর চেয়ে কম!
                                   → GC pause-ও দীর্ঘ হয়</code></pre>
      </div>
      <p><strong>অর্থাৎ ৩২ GB heap ৩১ GB-র চেয়ে খারাপ</strong> — বেশি মেমরি দিয়েও কম কার্যকর জায়গা পাওয়া যায়। এটি Elasticsearch-এর সবচেয়ে বিখ্যাত টিউনিং নিয়ম।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># jvm.options — Xms ও Xmx সবসময় সমান রাখুন
-Xms31g
-Xmx31g

# যাচাই করুন compressed oops চালু আছে কি না
GET /_nodes/jvm?filter_path=**.using_compressed_ordinary_object_pointers
# → "true" থাকতে হবে

# লগে স্টার্টআপের সময় দেখা যায়:
# heap size [30.7gb], compressed ordinary object pointers [true]</code></pre>
      </div>
      <h4>Xms ও Xmx সমান কেন</h4>
      <p>heap রানটাইমে বাড়তে-কমতে দিলে JVM-কে মেমরি পুনর্বণ্টন করতে হয়, যা pause তৈরি করে। শুরুতেই পুরোটা বরাদ্দ করে রাখলে এই অস্থিরতা থাকে না।</p>
      <h4>৬৪ GB+ RAM-এর সার্ভারে কী করবেন</h4>
      <p>এটিই সঠিক প্রশ্ন। উত্তর: <strong>একটি নোডে সব RAM দেওয়ার চেষ্টা করবেন না</strong>। বদলে একই মেশিনে <strong>একাধিক Elasticsearch নোড</strong> চালান, প্রতিটিতে ৩১ GB heap। ১২৮ GB মেশিনে ২টি নোড (৩১ GB করে heap, বাকি ~৬৬ GB OS ক্যাশ) — এটিই প্রস্তাবিত কনফিগারেশন।</p>
      <p>তবে সতর্কতা: একই মেশিনে দুটি নোড থাকলে <code>cluster.routing.allocation.awareness</code> সেট করুন, যাতে primary ও replica shard একই ফিজিক্যাল মেশিনে না পড়ে — নাহলে মেশিন হারালে দুটোই হারাবে।</p>
      <p><strong>অন্যান্য:</strong> swap সম্পূর্ণ বন্ধ করুন (<code>bootstrap.memory_lock: true</code>) — heap swap হলে GC ভয়াবহ ধীর হয়ে যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Heap ব্যবহার ৭৫%-এর উপরে থাকলে কী করবেন?</li>
        <li>G1GC না CMS — Elasticsearch-এ কোনটি?</li>
      </ul>
    `
  },
  {
    id: "es-50",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Search Templates","Mustache"],
    question: "Search Templates (_render/template) and Mustache Templating কীভাবে সার্চ কোয়েরি ডিকুপল করে?",
    answer: `
      <p><strong>Search template</strong> কুয়েরির কাঠামো Elasticsearch-এ সংরক্ষণ করে রাখে, এবং অ্যাপ্লিকেশন কেবল প্যারামিটার পাঠায় — Mustache টেমপ্লেটিং ব্যবহার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ১. টেমপ্লেট সংরক্ষণ করুন
PUT _scripts/product-search
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "bool": {
          "must": [{ "multi_match": {
            "query": "{{query_string}}",
            "fields": ["title^3", "description"]
          }}],
          "filter": [
            {{#category}}{ "term": { "category": "{{category}}" } },{{/category}}
            { "range": { "price": {
                "gte": "{{min_price}}{{^min_price}}0{{/min_price}}",
                "lte": "{{max_price}}{{^max_price}}999999{{/max_price}}"
            }}}
          ]
        }
      },
      "size": "{{size}}{{^size}}20{{/size}}"
    }
  }
}

# ২. অ্যাপ্লিকেশন থেকে ব্যবহার — শুধু প্যারামিটার
GET /products/_search/template
{
  "id": "product-search",
  "params": { "query_string": "wireless headphones",
              "category": "electronics", "min_price": 1000 }
}</code></pre>
      </div>
      <h4>Mustache সিনট্যাক্স</h4>
      <ul>
        <li><code>{{var}}</code> — মান প্রতিস্থাপন।</li>
        <li><code>{{#var}}...{{/var}}</code> — শর্তাধীন ব্লক (মান থাকলে অন্তর্ভুক্ত)।</li>
        <li><code>{{^var}}...{{/var}}</code> — উল্টো শর্ত (মান <em>না</em> থাকলে) — ডিফল্ট মান দিতে ব্যবহৃত।</li>
        <li><code>{{#toJson}}var{{/toJson}}</code> — অ্যারে বা অবজেক্ট JSON হিসেবে বসানো।</li>
      </ul>
      <h4>প্রধান সুবিধা</h4>
      <ul>
        <li><strong>কুয়েরি লজিক অ্যাপ্লিকেশন থেকে আলাদা:</strong> র‍্যাঙ্কিং বা boost টিউন করতে অ্যাপ্লিকেশন রিডিপ্লয় করতে হয় না — শুধু টেমপ্লেট আপডেট করুন। সার্চ টিম ও অ্যাপ টিম স্বাধীনভাবে কাজ করতে পারে।</li>
        <li><strong>একাধিক ক্লায়েন্টে সঙ্গতি:</strong> ওয়েব, মোবাইল ও API — সবাই একই কুয়েরি লজিক ব্যবহার করে।</li>
        <li><strong>নিরাপত্তা:</strong> ক্লায়েন্ট নিজে ইচ্ছেমতো কুয়েরি পাঠাতে পারে না — কেবল অনুমোদিত প্যারামিটার। এটি ব্যয়বহুল বা বিপজ্জনক কুয়েরি (যেমন গভীর aggregation) ঠেকায়।</li>
        <li><strong>ছোট পেলোড:</strong> প্রতিটি রিকোয়েস্টে বিশাল JSON কুয়েরি পাঠাতে হয় না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code># ডিবাগিং — চূড়ান্ত কুয়েরিটি কী দাঁড়াল দেখুন
GET _render/template
{ "id": "product-search", "params": { "query_string": "laptop" } }</code></pre>
      </div>
      <p><strong><code>_render/template</code> অপরিহার্য</strong> — জটিল Mustache শর্ত দিয়ে ভুল হওয়া সহজ, এবং এটি রেন্ডার করা কুয়েরি দেখিয়ে দেয়।</p>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Mustache খুব সীমিত</strong> — লুপ ও শর্ত ছাড়া তেমন কিছু নেই। জটিল ডায়নামিক কুয়েরিতে এটি দ্রুত অপাঠ্য হয়ে পড়ে।</li>
        <li><strong>টেমপ্লেট সংস্করণ নিয়ন্ত্রণ করা কঠিন</strong> — এগুলো ক্লাস্টার state-এ থাকে, Git-এ নয়। ডিপ্লয় পাইপলাইনে টেমপ্লেট আপলোড করার ব্যবস্থা রাখুন।</li>
        <li>জটিল ক্ষেত্রে অ্যাপ্লিকেশন কোডে একটি কুয়েরি-বিল্ডার লেখা প্রায়ই বেশি রক্ষণাবেক্ষণযোগ্য।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>টেমপ্লেট পরিবর্তন কীভাবে নিরাপদে রোলআউট করবেন?</li>
        <li>A/B টেস্টিংয়ে search template কীভাবে কাজে লাগে?</li>
      </ul>
    `
  },
  /* ===== SECTION H — Microservices & Distributed System Patterns (32) ===== */
  {
    id: "sd-1",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Microservices","Saga Pattern","Distributed Systems"],
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
    tags: ["CQRS","Architecture","Event Sourcing"],
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
    tags: ["Circuit Breaker","Resilience","Fault Tolerance"],
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
    tags: ["API Gateway","BFF","Routing"],
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
    tags: ["CAP Theorem","PACELC","Distributed Systems"],
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
    tags: ["Rate Limiting","Algorithms","Token Bucket"],
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
    tags: ["Distributed Tracing","OpenTelemetry","Observability"],
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
    tags: ["Idempotency","API Design","Distributed Systems"],
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
    tags: ["Outbox Pattern","CDC","Transactional"],
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
    tags: ["Service Mesh","Istio","Proxy"],
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
  },
  {
    id: "sd-11",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Hashing","Consistent Hashing","Scaling"],
    question: "Consistent Hashing Algorithm কীভাবে কাজ করে?",
    answer: `
      <p><strong>সংক্ষিপ্ত উত্তর:</strong> Consistent Hashing এমন একটি কৌশল যেখানে নোড যোগ বা বাদ দিলে <em>প্রায় সব</em> কী পুনর্বণ্টিত না হয়ে কেবল গড়ে <strong>K/N</strong> সংখ্যক কী সরে — যেখানে K = মোট কী, N = নোড সংখ্যা।</p>
      <h4>সাধারণ modulo hashing-এর সমস্যা</h4>
      <p><code>hash(key) % N</code> ব্যবহার করলে N বদলানোমাত্র প্রায় সব কী নতুন নোডে চলে যায়। ৪টি ক্যাশ সার্ভারের একটি ডাউন হলে (N: 4→3) প্রায় <strong>৭৫% কী</strong> ভুল জায়গায় খুঁজতে যাবে — অর্থাৎ পুরো ক্যাশ কার্যত খালি হয়ে যাবে এবং ডাটাবেজে ধস নামবে।</p>
      <h4>কীভাবে কাজ করে</h4>
      <pre class="mermaid">
flowchart TD
    subgraph Ring["Hash Ring (0 → 2³²)"]
      N1["Node A<br/>pos 100"]
      K1["key1 → 120"]
      N2["Node B<br/>pos 500"]
      K2["key2 → 550"]
      N3["Node C<br/>pos 900"]
    end
    K1 -->|"ঘড়ির কাঁটার দিকে<br/>প্রথম নোড"| N2
    K2 -->|"ঘড়ির কাঁটার দিকে"| N3
      </pre>
      <span class="diagram-caption">নোড ও কী দুটোই একই বৃত্তে; কী যায় তার ডান দিকের প্রথম নোডে</span>
      <ol>
        <li>একটি কাল্পনিক বৃত্তে (0 থেকে 2³²) নোডগুলোকে তাদের হ্যাশ অনুযায়ী বসানো হয়।</li>
        <li>প্রতিটি কী-কেও একইভাবে হ্যাশ করে বৃত্তে বসানো হয়।</li>
        <li>কী যায় তার থেকে <strong>ঘড়ির কাঁটার দিকে প্রথম যে নোড</strong> পড়ে সেটিতে।</li>
        <li>একটি নোড বাদ পড়লে কেবল <em>তার দায়িত্বের অংশটুকু</em> পরের নোডে যায় — বাকি সব অপরিবর্তিত থাকে।</li>
      </ol>
      <h4>Virtual Nodes — বাস্তবে অপরিহার্য</h4>
      <p>মাত্র ৩টি নোড বৃত্তে র‍্যান্ডমভাবে বসালে কেউ পাবে ৬০% ভার, কেউ ১০% — অসম বণ্টন। সমাধান: প্রতিটি ফিজিক্যাল নোডকে বৃত্তে <strong>বহুবার</strong> (যেমন ১৫০–২৫৬ বার, <code>nodeA#1</code>, <code>nodeA#2</code>…) বসানো।</p>
      <ul>
        <li>ভার অনেক সমানভাবে ছড়ায়।</li>
        <li>একটি নোড মারা গেলে তার ভার <em>একজনের</em> ঘাড়ে না চেপে সবার মধ্যে ভাগ হয় — ক্যাসকেডিং ফেইলিওর এড়ায়।</li>
        <li>শক্তিশালী মেশিনকে বেশি virtual node দিয়ে বেশি ভার দেওয়া যায় (heterogeneous cluster)।</li>
      </ul>
      <h4>কোথায় ব্যবহৃত হয়</h4>
      <p>Memcached ক্লায়েন্ট, Redis Cluster (ধারণাগতভাবে — বাস্তবে ১৬৩৮৪টি hash slot), Cassandra, DynamoDB, এবং CDN-এ কোন এজ সার্ভারে কোন কনটেন্ট থাকবে তা ঠিক করতে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis Cluster hash slot ব্যবহার করে, বিশুদ্ধ consistent hashing নয় — কেন?</li>
        <li>রেপ্লিকেশন যোগ করলে (N কপি) বৃত্তে কীভাবে বসাবেন?</li>
        <li>একটি নির্দিষ্ট কী অত্যন্ত জনপ্রিয় হলে (hot key) consistent hashing কি সাহায্য করে?</li>
      </ul>
    `
  },
  {
    id: "sd-12",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Refactoring","Strangler Fig","Microservices"],
    question: "Monolith থেকে Microservices মাইগ্রেশনে Strangler Fig Pattern কী?",
    answer: `
      <p><strong>Strangler Fig Pattern</strong> হলো মনোলিথকে একবারে না ভেঙে <em>ধীরে ধীরে</em> মাইক্রোসার্ভিসে রূপান্তরের কৌশল। নামটি এসেছে স্ট্র্যাংলার ফিগ গাছ থেকে — যা হোস্ট গাছকে ঘিরে বেড়ে ওঠে এবং শেষে হোস্ট গাছ মরে গেলেও নিজে দাঁড়িয়ে থাকে।</p>
      <h4>কেন "Big Bang" রিরাইট ব্যর্থ হয়</h4>
      <p>পুরনো সিস্টেম চালু রেখে সমান্তরালে নতুন সিস্টেম বানিয়ে একদিনে সুইচ করার চেষ্টা প্রায় সবসময় ব্যর্থ হয়: পুরনো সিস্টেমে বছরের পর বছর জমা হওয়া edge case নতুনটিতে থাকে না, ফিচার ডেভেলপমেন্ট মাসের পর মাস থেমে থাকে, এবং সুইচ করার দিনে ঝুঁকি সর্বোচ্চ থাকে।</p>
      <h4>কীভাবে কাজ করে</h4>
      <pre class="mermaid">
flowchart TD
    C["Client"] --> F["Facade / Proxy<br/>(Nginx বা API Gateway)"]
    F -->|"/orders/*<br/>✅ মাইগ্রেটেড"| NEW["Order Microservice"]
    F -->|"/users/*<br/>🔄 চলমান"| NEW2["User Microservice"]
    F -->|"বাকি সব<br/>⏳ এখনও পুরনো"| OLD["Legacy Monolith"]
    NEW --> DB1[("Order DB")]
    OLD --> DB0[("Legacy DB")]
      </pre>
      <span class="diagram-caption">Facade রাউটিং নিয়ন্ত্রণ করে; ক্লায়েন্ট জানেই না কোনটা নতুন কোনটা পুরনো</span>
      <ol>
        <li><strong>Facade বসান:</strong> মনোলিথের সামনে একটি প্রক্সি/gateway রাখুন। প্রথমে সব ট্রাফিক মনোলিথেই যাবে — কোনো আচরণ বদলাবে না।</li>
        <li><strong>একটি সীমানা বেছে নিন:</strong> সবচেয়ে কম কাপলড এবং সবচেয়ে বেশি ব্যবসায়িক মূল্যযুক্ত মডিউল আগে নিন (যেমন নোটিফিকেশন, রিপোর্টিং)।</li>
        <li><strong>নতুন সার্ভিসে লিখুন এবং রাউট ঘোরান:</strong> সেই পাথের ট্রাফিক নতুন সার্ভিসে পাঠান। সমস্যা হলে facade-এ রাউট ফিরিয়ে দিলেই রোলব্যাক।</li>
        <li><strong>পুরনো কোড মুছুন:</strong> এই ধাপটি সবচেয়ে বেশি বাদ পড়ে — না মুছলে দুটি সিস্টেম চিরকাল রক্ষণাবেক্ষণ করতে হবে।</li>
        <li>পুনরাবৃত্তি করুন যতক্ষণ না মনোলিথ শূন্য হয়ে যায়।</li>
      </ol>
      <h4>সবচেয়ে কঠিন অংশ: ডাটাবেজ</h4>
      <p>কোড ভাগ করা সহজ, ডেটা ভাগ করা কঠিন। মনোলিথের একটি টেবিলে ১০টি মডিউল JOIN করে। কৌশল:</p>
      <ul>
        <li>প্রথমে <strong>শুধু কোড</strong> আলাদা করুন, DB শেয়ার্ড রাখুন (স্বীকৃত অস্থায়ী আপস)।</li>
        <li>তারপর নতুন সার্ভিসের নিজস্ব টেবিল দিন এবং <strong>CDC বা outbox</strong> দিয়ে ডেটা সিঙ্ক করুন।</li>
        <li>শেষে JOIN-এর বদলে API কল বা ইভেন্ট-চালিত ডেটা কপি ব্যবহার করুন।</li>
      </ul>
      <p><strong>ঝুঁকি কমানোর কৌশল:</strong> কিছুদিন <em>উভয়</em> সিস্টেমে রিকোয়েস্ট পাঠিয়ে (shadow traffic) ফলাফল তুলনা করুন — কিন্তু রেসপন্স দিন কেবল পুরনোটির। এতে নতুন সার্ভিসের ভুল ইউজারকে প্রভাবিত না করেই ধরা পড়ে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>প্রথম কোন মডিউলটি বের করবেন — কীভাবে ঠিক করবেন?</li>
        <li>মাইগ্রেশন মাঝপথে থেমে গেলে (অর্ধেক মনোলিথ, অর্ধেক সার্ভিস) কী হয়?</li>
        <li>শেয়ার্ড ডাটাবেজ কতদিন চালানো গ্রহণযোগ্য?</li>
      </ul>
    `
  },
  {
    id: "sd-13",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Resilience","Bulkhead","Fault Tolerance"],
    question: "System Resilience-এ Bulkhead Pattern কী?",
    answer: `
      <p><strong>Bulkhead Pattern</strong> জাহাজের নকশা থেকে নেওয়া — জাহাজের খোল কয়েকটি জলনিরোধক প্রকোষ্ঠে ভাগ করা থাকে, যাতে একটি ফুটো হলে কেবল সেই প্রকোষ্ঠ ভরে, পুরো জাহাজ ডোবে না। সফটওয়্যারেও রিসোর্স আলাদা করে রাখলে একটি অংশের ব্যর্থতা পুরো সিস্টেমকে ডোবাতে পারে না।</p>
      <h4>যে সমস্যা এটি সমাধান করে</h4>
      <p>ধরুন আপনার সার্ভিসে ২০০টি থ্রেড বা কানেকশনের একটি পুল আছে, এবং সেটি তিনটি নির্ভরতা ব্যবহার করে। একটি নির্ভরতা (যেমন রেকমেন্ডেশন সার্ভিস) ধীর হয়ে গেল — রিকোয়েস্টগুলো সেখানে আটকে থাকতে থাকতে <strong>পুরো ২০০টি থ্রেডই</strong> নিঃশেষ হয়ে যাবে। ফলে সম্পূর্ণ সুস্থ চেকআউট ও পেমেন্টও সার্ভ করা যাবে না — একটি অপ্রয়োজনীয় ফিচার পুরো সাইট নামিয়ে দিল।</p>
      <pre class="mermaid">
flowchart TD
    subgraph Bad["❌ শেয়ার্ড পুল"]
      R1["সব রিকোয়েস্ট"] --> P1["Pool: 200 থ্রেড"]
      P1 --> S1["Payment ✅"]
      P1 --> S2["Recommendation 🐢 ধীর"]
      S2 -.->|"সব থ্রেড খেয়ে ফেলল"| X["💥 সবকিছু ডাউন"]
    end
    subgraph Good["✅ Bulkhead"]
      R2["সব রিকোয়েস্ট"] --> PA["Pool A: 100<br/>Payment"]
      R2 --> PB["Pool B: 20<br/>Recommendation"]
      PA --> OK["Payment সুস্থ ✅"]
      PB --> DEG["Recommendation<br/>বন্ধ, কিন্তু আলাদা"]
    end
      </pre>
      <span class="diagram-caption">আলাদা পুল মানে একটি নির্ভরতার ব্যর্থতা সেখানেই আটকে থাকে</span>
      <h4>প্রয়োগের স্তর</h4>
      <ul>
        <li><strong>Connection/thread pool আলাদা করা:</strong> প্রতিটি ডাউনস্ট্রিম নির্ভরতার জন্য আলাদা পুল ও সীমা। সবচেয়ে সাধারণ প্রয়োগ।</li>
        <li><strong>প্রক্রিয়া/কন্টেইনার আলাদা করা:</strong> গুরুত্বপূর্ণ ও অ-গুরুত্বপূর্ণ কাজ ভিন্ন পডে চালানো।</li>
        <li><strong>Tenant আলাদা করা:</strong> মাল্টি-টেন্যান্ট সিস্টেমে একটি বড় গ্রাহকের ভারী ব্যবহার যেন অন্যদের প্রভাবিত না করে ("noisy neighbour")।</li>
        <li><strong>কিউ আলাদা করা:</strong> উচ্চ ও নিম্ন অগ্রাধিকারের কাজের জন্য ভিন্ন কিউ ও ভিন্ন ওয়ার্কার পুল।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// প্রতিটি নির্ভরতার জন্য আলাদা সীমা — একটির সমস্যা অন্যকে ছোঁবে না
const pools = {
  payment:        { limit: 100, inflight: 0 },  // গুরুত্বপূর্ণ → বড় ভাগ
  inventory:      { limit: 50,  inflight: 0 },
  recommendation: { limit: 20,  inflight: 0 }   // ঐচ্ছিক → ছোট ভাগ
};

async function callWithBulkhead(name, fn, fallback) {
  const p = pools[name];
  if (p.inflight >= p.limit) {
    // পুল পূর্ণ → অপেক্ষা না করে দ্রুত ফিরে যান
    metrics.increment(\`bulkhead.rejected.\${name}\`);
    return fallback;
  }
  p.inflight++;
  try {
    return await fn();
  } finally {
    p.inflight--;                 // ⚠️ finally ছাড়া লিক হবে
  }
}

// recommendation ব্যর্থ হলে খালি অ্যারে — পেজ তবু লোড হবে
const recs = await callWithBulkhead('recommendation',
  () => recoService.get(userId), []);</code></pre>
      </div>
      <p><strong>Circuit breaker-এর সাথে সম্পর্ক:</strong> দুটি পরিপূরক। Bulkhead <em>ক্ষতির পরিধি সীমিত করে</em> (blast radius), আর circuit breaker <em>ব্যর্থ নির্ভরতাকে কল করাই বন্ধ করে দেয়</em>। প্রোডাকশনে সাধারণত দুটিই একসাথে ব্যবহার হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>প্রতিটি পুলের আকার কীভাবে নির্ধারণ করবেন?</li>
        <li>Bulkhead থাকলে মোট থ্রুপুট কি কমে যায়?</li>
        <li>Kubernetes-এ resource limit কীভাবে bulkhead হিসেবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "sd-14",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Database","Sharding","Cross-Shard"],
    question: "Database Sharding এবং Cross-Shard Join-এর চ্যালেঞ্জ কী?",
    answer: `
      <p><strong>Sharding</strong> হলো একটি বড় ডাটাবেজকে একাধিক স্বাধীন সার্ভারে (shard) অনুভূমিকভাবে ভাগ করা, যেখানে প্রতিটি shard ডেটার একটি উপসেট রাখে। এটি তখনই করা হয় যখন একটি মেশিনে আর ডেটা ধরে না বা write throughput সীমা ছুঁয়ে যায়।</p>
      <h4>Shard Key — সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্ত</h4>
      <p>ভুল shard key বাছলে পরে ঠিক করা অত্যন্ত ব্যয়বহুল। ভালো shard key-র তিনটি গুণ:</p>
      <ul>
        <li><strong>উচ্চ cardinality:</strong> যথেষ্ট ভিন্ন মান, যাতে ভাগ করা যায়।</li>
        <li><strong>সমান বণ্টন:</strong> কোনো একটি shard-এ ভিড় জমবে না।</li>
        <li><strong>কুয়েরির সাথে সঙ্গতি:</strong> বেশিরভাগ কুয়েরিতে shard key থাকবে, যাতে একটি shard-এই উত্তর মেলে।</li>
      </ul>
      <table>
        <tr><th>কৌশল</th><th>কীভাবে</th><th>সমস্যা</th></tr>
        <tr><td><strong>Range-based</strong></td><td>A–M → shard 1, N–Z → shard 2</td><td>অসম বণ্টন; ক্রমিক কী-তে সব নতুন write একটি shard-এ (hotspot)</td></tr>
        <tr><td><strong>Hash-based</strong></td><td><code>hash(userId) % N</code></td><td>সমান বণ্টন, কিন্তু range query অসম্ভব ও rebalance কঠিন</td></tr>
        <tr><td><strong>Directory-based</strong></td><td>একটি lookup সার্ভিস বলে দেয় কোথায় আছে</td><td>নমনীয়, কিন্তু lookup সার্ভিসটিই SPOF ও বাড়তি hop</td></tr>
        <tr><td><strong>Geo-based</strong></td><td>অঞ্চল অনুযায়ী</td><td>ডেটা রেসিডেন্সি আইনে সুবিধা; কিন্তু অঞ্চলভেদে ভার অসম</td></tr>
      </table>
      <h4>Cross-Shard Join — মূল চ্যালেঞ্জ</h4>
      <p>একবার shard করে ফেললে <strong>ডাটাবেজ আর JOIN করতে পারে না</strong>, কারণ টেবিলগুলো ভিন্ন মেশিনে। বাস্তব কৌশল:</p>
      <ul>
        <li><strong>Denormalization:</strong> যে ডেটা একসাথে দরকার সেটি একসাথেই রাখুন — এমনকি ডুপ্লিকেট করে হলেও। এটিই সবচেয়ে বেশি ব্যবহৃত সমাধান।</li>
        <li><strong>একই shard key ব্যবহার:</strong> একজন ইউজারের orders, addresses, payments সব <code>userId</code> দিয়ে shard করুন — তাহলে সেগুলো একই shard-এ থাকবে এবং JOIN স্থানীয়ভাবেই সম্ভব।</li>
        <li><strong>Application-level join:</strong> দুটি shard থেকে আলাদা করে এনে অ্যাপ্লিকেশনে মেলানো (ধীর, N+1 ঝুঁকি)।</li>
        <li><strong>Reference table replication:</strong> ছোট, কম বদলায় এমন টেবিল (country, category) সব shard-এ কপি রাখা।</li>
      </ul>
      <h4>আরও যেসব জিনিস ভেঙে যায়</h4>
      <ul>
        <li><strong>ট্রানজেকশন:</strong> একাধিক shard জুড়ে ACID পেতে হলে 2PC বা Saga লাগে — দুটিই জটিল ও ধীর।</li>
        <li><strong>AUTO_INCREMENT:</strong> প্রতিটি shard আলাদাভাবে গুনবে → সংঘর্ষ। Snowflake/UUIDv7 ব্যবহার করুন।</li>
        <li><strong>Unique constraint:</strong> গ্লোবাল ইউনিক ইমেইল নিশ্চিত করতে আলাদা lookup টেবিল লাগে।</li>
        <li><strong>Rebalancing:</strong> shard যোগ করা মানে ডেটা সরানো — consistent hashing বা pre-split (আগে থেকেই বেশি logical shard বানিয়ে রাখা) এই ব্যথা কমায়।</li>
      </ul>
      <p><strong>ইন্টারভিউয়ের সেরা উত্তর:</strong> "যত দেরিতে সম্ভব shard করুন।" আগে read replica, ক্যাশিং, ইনডেক্স অপ্টিমাইজেশন, এবং vertical scaling শেষ করুন। Sharding স্থায়ীভাবে জটিলতা যোগ করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি shard অন্যদের চেয়ে অনেক বড় হয়ে গেলে কী করবেন?</li>
        <li>Shard key পরে বদলাতে হলে কীভাবে করবেন?</li>
        <li>Sharding বনাম partitioning — পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "sd-15",
    category: "System Design",
    difficulty: "Intermediate",
    tags: ["Infrastructure","Service Discovery","Microservices"],
    question: "Service Discovery Pattern কীভাবে কাজ করে?",
    answer: `
      <p><strong>Service Discovery</strong> হলো সেই ব্যবস্থা যার মাধ্যমে একটি সার্ভিস অন্য সার্ভিসের বর্তমান নেটওয়ার্ক ঠিকানা খুঁজে পায় — হার্ডকোড করা IP ছাড়াই।</p>
      <h4>কেন দরকার</h4>
      <p>কনটেইনার ও অটো-স্কেলিংয়ের যুগে ইনস্ট্যান্সের IP <em>ক্ষণস্থায়ী</em>। একটি পড রিস্টার্ট হলে নতুন IP পায়, স্কেল আউট হলে নতুন ইনস্ট্যান্স যুক্ত হয়, ডিপ্লয়ে পুরনোগুলো মারা যায়। কনফিগ ফাইলে IP লিখে রাখা তাই অসম্ভব।</p>
      <h4>দুটি প্যাটার্ন</h4>
      <pre class="mermaid">
flowchart TD
    subgraph CS["Client-Side Discovery"]
      C1["Service A"] -->|"১. কোথায় আছে B?"| R1[("Registry<br/>Consul/Eureka")]
      R1 -->|"২. IP তালিকা"| C1
      C1 -->|"৩. নিজেই LB করে<br/>সরাসরি কল"| B1["Service B"]
    end
    subgraph SS["Server-Side Discovery"]
      C2["Service A"] -->|"১. শুধু কল করে"| LB["Load Balancer /<br/>k8s Service"]
      LB -->|"২. LB নিজে<br/>registry দেখে"| B2["Service B"]
    end
      </pre>
      <span class="diagram-caption">Client-side-এ ক্লায়েন্ট বুদ্ধিমান; server-side-এ অবকাঠামো বুদ্ধিমান</span>
      <table>
        <tr><th>দিক</th><th>Client-Side (Eureka)</th><th>Server-Side (k8s Service)</th></tr>
        <tr><td>Load balancing</td><td>ক্লায়েন্টে (নমনীয়)</td><td>অবকাঠামোতে</td></tr>
        <tr><td>বাড়তি hop</td><td>নেই (দ্রুত)</td><td>আছে</td></tr>
        <tr><td>ক্লায়েন্ট জটিলতা</td><td>প্রতিটি ভাষায় লাইব্রেরি লাগে</td><td>ক্লায়েন্ট কিছুই জানে না</td></tr>
        <tr><td>ভাষা-নিরপেক্ষতা</td><td>দুর্বল</td><td><strong>শক্তিশালী</strong></td></tr>
      </table>
      <h4>রেজিস্ট্রি কীভাবে জানে কে বেঁচে আছে</h4>
      <ul>
        <li><strong>Self-registration:</strong> সার্ভিস চালু হয়ে নিজেকে রেজিস্টার করে এবং নিয়মিত heartbeat পাঠায়। heartbeat থামলে রেজিস্ট্রি তাকে বাদ দেয়।</li>
        <li><strong>Third-party registration:</strong> আলাদা এজেন্ট (যেমন k8s-এর kubelet) সার্ভিসের স্বাস্থ্য দেখে রেজিস্ট্রি আপডেট করে — সার্ভিস কোডে কিছু লিখতে হয় না।</li>
      </ul>
      <h4>Kubernetes-এ বাস্তবে</h4>
      <p>k8s-এ আলাদা করে Consul/Eureka লাগে না — এটি বিল্ট-ইন। একটি <code>Service</code> অবজেক্ট তৈরি করলে <code>order-service.default.svc.cluster.local</code> নামে একটি স্থিতিশীল DNS নাম ও virtual IP পাওয়া যায়। kube-proxy সেই IP-কে সুস্থ পডগুলোর মধ্যে বণ্টন করে। রেডিনেস প্রোব ফেল করা পড স্বয়ংক্রিয়ভাবে endpoint তালিকা থেকে বাদ যায়।</p>
      <p><strong>সূক্ষ্ম সমস্যা:</strong> DNS ক্যাশিং। অনেক HTTP ক্লায়েন্ট DNS ফল অনির্দিষ্টকাল ক্যাশ করে রাখে, ফলে পড বদলে গেলেও পুরনো IP-তে কল করতে থাকে। তাই DNS TTL সম্মান করে এমন ক্লায়েন্ট ব্যবহার করুন, অথবা service mesh-এর উপর ছেড়ে দিন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>রেজিস্ট্রি নিজেই ডাউন হলে কী হবে?</li>
        <li>Health check-এ liveness ও readiness-এর পার্থক্য কী?</li>
        <li>Service mesh কীভাবে এই সমস্যার সমাধান বদলে দেয়?</li>
      </ul>
    `
  },
  {
    id: "sd-16",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Storage","Replication","State Machine"],
    question: "State Machine Replication এবং Distributed Write-Ahead Logging কী?",
    answer: `
      <p><strong>State Machine Replication (SMR)</strong> হলো ডিস্ট্রিবিউটেড সিস্টেমে fault tolerance অর্জনের মূল তত্ত্ব: যদি একাধিক নোড <em>একই প্রাথমিক অবস্থা</em> থেকে শুরু করে <em>একই ক্রমে একই অপারেশন</em> প্রয়োগ করে, তবে তারা সবসময় একই অবস্থায় থাকবে।</p>
      <p>ফলে সমস্যাটি "ডেটা কীভাবে কপি করব" থেকে বদলে গিয়ে হয়ে যায় <strong>"অপারেশনের ক্রম নিয়ে কীভাবে একমত হব"</strong> — আর সেটিই consensus (Raft/Paxos) সমাধান করে।</p>
      <h4>অপরিহার্য শর্ত: Determinism</h4>
      <p>অপারেশনগুলো অবশ্যই deterministic হতে হবে। <code>SET updated_at = NOW()</code> রেপ্লিকেট করলে প্রতিটি নোডে ভিন্ন সময় বসবে এবং অবস্থা আলাদা হয়ে যাবে। এজন্যই ডাটাবেজগুলো হয় deterministic মান আগে হিসাব করে পাঠায় (<code>SET updated_at = '2026-08-10 12:00:00'</code>), নয়তো statement-এর বদলে <strong>row-based replication</strong> ব্যবহার করে।</p>
      <h4>Write-Ahead Logging (WAL)</h4>
      <p>WAL-এর মূল নিয়ম: <strong>ডেটা ফাইলে পরিবর্তন লেখার আগে সেই পরিবর্তনের বর্ণনা লগে লিখে ডিস্কে fsync করতে হবে।</strong></p>
      <pre class="mermaid">
sequenceDiagram
    participant T as Transaction
    participant W as WAL (append-only)
    participant B as Buffer Pool (RAM)
    participant D as Data Files (disk)
    T->>W: ১. পরিবর্তন লগে লিখে fsync
    W-->>T: ২. ডিস্কে নিশ্চিত
    T->>B: ৩. মেমরিতে পেজ বদলানো
    T-->>T: ৪. COMMIT সফল বলা হলো
    Note over B,D: ৫. পরে, অলসভাবে
    B->>D: checkpoint — পেজ ডিস্কে লেখা
      </pre>
      <span class="diagram-caption">Commit-এর সময় শুধু লগ ডিস্কে যায় — তাই দ্রুত; আসল পেজ পরে লেখা হয়</span>
      <h4>WAL কেন এত কার্যকর</h4>
      <ul>
        <li><strong>Durability সস্তায়:</strong> লগ লেখা <em>ক্রমিক (sequential)</em> — ডিস্কের জন্য সবচেয়ে দ্রুত অপারেশন। অন্যদিকে ডেটা পেজ ছড়িয়ে থাকে, তাই র‍্যান্ডম write ধীর। commit-এ শুধু লগ লিখলেই দায়িত্ব শেষ।</li>
        <li><strong>Crash recovery:</strong> রিস্টার্টে ডাটাবেজ লগ পড়ে — commit হওয়া কিন্তু ডেটা ফাইলে না পৌঁছানো পরিবর্তন <em>redo</em> করে, আর commit না হওয়া পরিবর্তন <em>undo</em> করে।</li>
        <li><strong>Replication:</strong> WAL ইতিমধ্যেই সব পরিবর্তনের ক্রমবদ্ধ ধারা। সেটি রেপ্লিকায় স্ট্রিম করলেই রেপ্লিকা তৈরি হয়ে যায় — PostgreSQL streaming replication ঠিক এটাই করে।</li>
        <li><strong>Point-in-Time Recovery:</strong> পুরনো ব্যাকআপ + সেই সময় থেকে WAL রিপ্লে করে যেকোনো মুহূর্তে ফিরে যাওয়া যায়।</li>
      </ul>
      <h4>বিভিন্ন সিস্টেমে একই ধারণা</h4>
      <p>PostgreSQL-এ WAL, MySQL/InnoDB-তে redo log + binlog, MongoDB-তে journal + oplog, Kafka-তে পুরো টপিকই একটি append-only log, Raft-এ replicated log। নামে ভিন্ন, ধারণায় এক।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Synchronous ও asynchronous replication-এ WAL কীভাবে ব্যবহৃত হয়?</li>
        <li>WAL ফাইল জমে ডিস্ক ভরে গেলে কী হয়?</li>
        <li><code>fsync</code> বন্ধ করলে কী ঝুঁকি?</li>
      </ul>
    `
  },
  {
    id: "sd-17",
    category: "System Design",
    difficulty: "Beginner",
    tags: ["Performance","CDN","Caching"],
    question: "CDN Edge Caching এবং Push vs Pull CDN-এর পার্থক্য কী?",
    answer: `
      <p><strong>CDN (Content Delivery Network)</strong> হলো বিশ্বজুড়ে ছড়ানো এজ সার্ভারের একটি নেটওয়ার্ক, যা কনটেন্ট ইউজারের ভৌগোলিকভাবে কাছে রেখে latency কমায় এবং অরিজিন সার্ভারের ভার হালকা করে।</p>
      <h4>কেন কার্যকর</h4>
      <p>আলোর গতিই একটি ভৌত সীমা। ঢাকা থেকে ভার্জিনিয়ার সার্ভারে রাউন্ড-ট্রিপে ~২৫০ms লাগে; সিঙ্গাপুরের এজ থেকে হলে ~৬০ms। একটি পেজে ৫০টি অ্যাসেট থাকলে এই পার্থক্য কয়েক সেকেন্ডে দাঁড়ায়। তার উপর ৯০%+ ট্রাফিক এজেই শেষ হয়ে যায় বলে অরিজিন প্রায় নিঃশ্বাস নেয়।</p>
      <h4>Push বনাম Pull</h4>
      <table>
        <tr><th>দিক</th><th>Pull CDN (Origin Pull)</th><th>Push CDN</th></tr>
        <tr><td>কনটেন্ট কীভাবে পৌঁছায়</td><td>প্রথম রিকোয়েস্টে এজ অরিজিন থেকে টেনে আনে</td><td>আপনি আগেই এজে আপলোড করেন</td></tr>
        <tr><td>প্রথম ইউজার</td><td>ধীর (cache miss)</td><td>দ্রুত (আগেই আছে)</td></tr>
        <tr><td>রক্ষণাবেক্ষণ</td><td>প্রায় শূন্য — স্বয়ংক্রিয়</td><td>নিজে আপলোড ও মুছতে হয়</td></tr>
        <tr><td>স্টোরেজ খরচ</td><td>কম (যা চাওয়া হয় তাই)</td><td>বেশি (সব এজে সব কিছু)</td></tr>
        <tr><td>উপযুক্ত</td><td><strong>বেশিরভাগ ওয়েবসাইট</strong></td><td>বড় ফাইল, ভিডিও, সফটওয়্যার রিলিজ</td></tr>
      </table>
      <p>বাস্তবে প্রায় সব আধুনিক CDN (Cloudflare, Fastly, CloudFront) <strong>pull</strong> মডেলে চলে — এটি স্বয়ংক্রিয় ও কম ঝামেলার। Push কেবল তখনই যুক্তিযুক্ত যখন ফাইল বিশাল এবং প্রথম ইউজারের অভিজ্ঞতাও দ্রুত হতে হবে।</p>
      <h4>Cache Invalidation — আসল কঠিন অংশ</h4>
      <ul>
        <li><strong>Cache busting (সেরা উপায়):</strong> ফাইলের নামে হ্যাশ দিন — <code>app.9f2a1b.js</code>। কনটেন্ট বদলালে নামও বদলায়, তাই invalidate করার দরকারই পড়ে না। এমন ফাইলে <code>Cache-Control: max-age=31536000, immutable</code> নিরাপদে দেওয়া যায়।</li>
        <li><strong>Purge API:</strong> নির্দিষ্ট URL বা ট্যাগ মুছে ফেলা। কার্যকর, কিন্তু বিশ্বজুড়ে ছড়াতে কয়েক সেকেন্ড লাগে।</li>
        <li><strong>Short TTL + stale-while-revalidate:</strong> মেয়াদোত্তীর্ণ কনটেন্ট সাথে সাথে পরিবেশন করে ব্যাকগ্রাউন্ডে নতুন করে আনা — ইউজার কখনও অপেক্ষা করে না।</li>
      </ul>
      <p><strong>মূল কৌশল:</strong> HTML-এ ছোট TTL (কারণ এতে অ্যাসেটের নাম থাকে), আর হ্যাশযুক্ত অ্যাসেটে দীর্ঘ TTL। এতে ডিপ্লয় করলে নতুন HTML সাথে সাথে নতুন অ্যাসেটের দিকে ইশারা করে।</p>
      <h4>ডায়নামিক কনটেন্টেও CDN কাজে লাগে</h4>
      <ul>
        <li><strong>Microcaching:</strong> API রেসপন্স মাত্র ১–৫ সেকেন্ড ক্যাশ করলেও ট্রাফিক স্পাইকে অরিজিনে হিট নাটকীয়ভাবে কমে।</li>
        <li><strong>TLS termination ও HTTP/3</strong> এজেই হয় — হ্যান্ডশেকের RTT ছোট হয়ে যায়।</li>
        <li><strong>DDoS শোষণ ও WAF:</strong> আক্রমণ এজেই থেমে যায়, অরিজিন পর্যন্ত পৌঁছায় না।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ব্যক্তিগতকৃত (per-user) কনটেন্ট কীভাবে ক্যাশ করবেন?</li>
        <li><code>Cache-Control</code>-এ <code>public</code>, <code>private</code>, <code>no-cache</code>, <code>no-store</code>-এর পার্থক্য কী?</li>
        <li>ভুল কনটেন্ট বিশ্বজুড়ে ক্যাশ হয়ে গেলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-18",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Consensus","Raft","Leader Election"],
    question: "Distributed Consensus Protocols (Raft / Paxos)-এ Leader Election কীভাবে হয়?",
    answer: `
      <p>ডিস্ট্রিবিউটেড সিস্টেমে <strong>Consensus</strong> মানে একাধিক নোড কোনো একটি মানে (কে লিডার, কোন অপারেশন কোন ক্রমে) একমত হওয়া — এমনকি কিছু নোড ক্র্যাশ করলে বা নেটওয়ার্ক ভাগ হয়ে গেলেও।</p>
      <h4>Raft — বোঝার মতো করে ডিজাইন করা</h4>
      <p>Paxos গাণিতিকভাবে সঠিক কিন্তু কুখ্যাতভাবে দুর্বোধ্য। Raft একই নিশ্চয়তা দেয়, কিন্তু সমস্যাটিকে তিনটি বোধগম্য অংশে ভাগ করে: <strong>leader election</strong>, <strong>log replication</strong>, এবং <strong>safety</strong>।</p>
      <h4>তিনটি অবস্থা</h4>
      <pre class="mermaid">
stateDiagram-v2
    [*] --> Follower
    Follower --> Candidate: election timeout<br/>(লিডারের heartbeat আসেনি)
    Candidate --> Leader: সংখ্যাগরিষ্ঠ ভোট পেল
    Candidate --> Follower: অন্য কেউ লিডার হলো
    Candidate --> Candidate: ভোট ভাগাভাগি<br/>→ নতুন নির্বাচন
    Leader --> Follower: বড় term দেখতে পেল
      </pre>
      <span class="diagram-caption">Raft-এর নোড তিনটি অবস্থার একটিতে থাকে</span>
      <h4>Leader Election ধাপে ধাপে</h4>
      <ol>
        <li>সব নোড <strong>Follower</strong> হিসেবে শুরু করে এবং লিডারের heartbeat শোনে।</li>
        <li>একটি নির্দিষ্ট সময় (election timeout) heartbeat না এলে নোডটি <strong>Candidate</strong> হয়, <code>term</code> সংখ্যা এক বাড়ায়, নিজেকে ভোট দেয় এবং সবার কাছে ভোট চায়।</li>
        <li>যে candidate <strong>সংখ্যাগরিষ্ঠ (N/2 + 1)</strong> ভোট পায় সে <strong>Leader</strong> হয় এবং heartbeat পাঠাতে শুরু করে।</li>
        <li>একই সময়ে একাধিক candidate হলে ভোট ভাগ হয়ে যেতে পারে — তখন কেউ জেতে না, timeout শেষে আবার নির্বাচন হয়।</li>
      </ol>
      <p><strong>যে কৌশলটি এটিকে কাজ করায়:</strong> election timeout <em>র‍্যান্ডমাইজড</em> (যেমন ১৫০–৩০০ms)। সবার timeout একই হলে বারবার ভোট ভাগ হয়ে অচলাবস্থা তৈরি হতো। র‍্যান্ডমাইজেশনে সাধারণত একজন আগে জেগে ওঠে এবং অন্যরা জাগার আগেই ভোট নিয়ে নেয়।</p>
      <h4>কেন সংখ্যাগরিষ্ঠতা (quorum) দরকার</h4>
      <p>সংখ্যাগরিষ্ঠতা বাধ্যতামূলক করায় একসাথে <strong>দুটি লিডার থাকা অসম্ভব</strong> — কারণ দুটি সংখ্যাগরিষ্ঠ দলে অন্তত একটি নোড অবশ্যই সাধারণ থাকবে, আর সে দুবার ভোট দেবে না। নেটওয়ার্ক ভাগ হয়ে গেলে ছোট অংশটি কখনও সংখ্যাগরিষ্ঠতা পাবে না, তাই সে লিডার নির্বাচন করতে পারবে না এবং <strong>split-brain</strong> এড়ানো যায়।</p>
      <ul>
        <li>৩ নোড → ২টি লাগবে → ১টি ব্যর্থতা সহনীয়।</li>
        <li>৫ নোড → ৩টি লাগবে → ২টি ব্যর্থতা সহনীয়।</li>
        <li><strong>বিজোড় সংখ্যা</strong> ব্যবহার করুন — ৪ নোডেও ৩ লাগে, অর্থাৎ ৩ নোডের চেয়ে বাড়তি সহনশীলতা নেই, শুধু খরচ বেশি।</li>
      </ul>
      <h4>কোথায় ব্যবহৃত হয়</h4>
      <p>etcd (Kubernetes-এর পুরো state এখানে), Consul, MongoDB replica set election, Kafka-র KRaft মোড, CockroachDB, TiDB।</p>
      <p><strong>খরচ:</strong> প্রতিটি write সংখ্যাগরিষ্ঠ নোডে নিশ্চিত হতে হয়, তাই consensus-ভিত্তিক সিস্টেম স্বাভাবিকভাবেই ধীর। এজন্যই এগুলো <em>মেটাডেটা ও কনফিগারেশনের</em> জন্য ব্যবহৃত হয়, উচ্চ-থ্রুপুট অ্যাপ্লিকেশন ডেটার জন্য নয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>লিডার বেঁচে আছে কিন্তু নেটওয়ার্কে বিচ্ছিন্ন — কী হবে?</li>
        <li>Raft-এ log replication কীভাবে হয় এবং কখন commit ধরা হয়?</li>
        <li>etcd ডাউন হলে চলমান Kubernetes ক্লাস্টারের কী হয়?</li>
      </ul>
    `
  },
  {
    id: "sd-19",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Load Balancing","Algorithms","L4 vs L7"],
    question: "Layer 4 vs Layer 7 Load Balancing-এর পার্থক্য এবং Load Balancing Algorithms (Round Robin, Least Connections, IP Hash) কী?",
    answer: `
      <p>Load balancer OSI মডেলের কোন স্তরে কাজ করে তার উপর নির্ভর করে সে কতটা "বুঝতে" পারে এবং কতটা দ্রুত।</p>
      <table>
        <tr><th>দিক</th><th>Layer 4 (Transport)</th><th>Layer 7 (Application)</th></tr>
        <tr><td>কী দেখে</td><td>IP + port (TCP/UDP)</td><td>HTTP হেডার, URL, cookie, body</td></tr>
        <tr><td>গতি</td><td>খুব দ্রুত (প্যাকেট ফরওয়ার্ড)</td><td>ধীর (কানেকশন terminate করে পার্স করতে হয়)</td></tr>
        <tr><td>রাউটিং সিদ্ধান্ত</td><td>শুধু কোন সার্ভারে পাঠাবে</td><td>path/host/header অনুযায়ী ভিন্ন ব্যাকএন্ড</td></tr>
        <tr><td>TLS</td><td>পাস-থ্রু (পড়তে পারে না)</td><td>terminate করে (পড়তে পারে)</td></tr>
        <tr><td>উদাহরণ</td><td>AWS NLB, Nginx stream module</td><td>AWS ALB, Nginx http, Envoy</td></tr>
      </table>
      <p><strong>ব্যবহারিক নিয়ম:</strong> HTTP API-তে প্রায় সবসময় <strong>L7</strong> — কারণ path-ভিত্তিক রাউটিং, হেডার দেখে ক্যানারি, retry, ও প্রতি-রিকোয়েস্ট লোড ব্যালেন্সিং দরকার। ডাটাবেজ, গেম সার্ভার বা কাস্টম বাইনারি প্রোটোকলে <strong>L4</strong>, যেখানে বিষয়বস্তু বোঝার দরকার নেই এবং সর্বোচ্চ থ্রুপুট চাই।</p>
      <p><strong>একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ পার্থক্য:</strong> L4 <em>কানেকশন</em> ভাগ করে, L7 <em>রিকোয়েস্ট</em> ভাগ করে। HTTP/2-তে একটি কানেকশনে হাজারো রিকোয়েস্ট চলে — তাই L4 ব্যবহার করলে একটি ক্লায়েন্টের সব রিকোয়েস্ট একটিই সার্ভারে আটকে যায় এবং লোড অসম হয়ে পড়ে। gRPC-তে এটি খুব সাধারণ সমস্যা।</p>
      <h4>Load Balancing অ্যালগরিদম</h4>
      <ul>
        <li><strong>Round Robin:</strong> ক্রমানুসারে একের পর এক। সহজ, কিন্তু ধরে নেয় সব রিকোয়েস্টের খরচ ও সব সার্ভারের ক্ষমতা সমান — যা সাধারণত সত্য নয়।</li>
        <li><strong>Weighted Round Robin:</strong> শক্তিশালী সার্ভারকে বেশি ওজন। ভিন্ন ক্ষমতার মেশিন থাকলে উপযোগী।</li>
        <li><strong>Least Connections:</strong> যার সক্রিয় কানেকশন সবচেয়ে কম তাকে পাঠানো। রিকোয়েস্টের সময়কাল ভিন্ন ভিন্ন হলে (কিছু ১০ms, কিছু ১০s) এটি round robin-এর চেয়ে <strong>অনেক ভালো</strong>।</li>
        <li><strong>Least Response Time:</strong> কানেকশন সংখ্যা + প্রকৃত latency মিলিয়ে। সবচেয়ে বুদ্ধিমান, কিন্তু বেশি হিসাব করতে হয়।</li>
        <li><strong>IP Hash:</strong> ক্লায়েন্টের IP হ্যাশ করে সবসময় একই সার্ভারে পাঠানো (sticky)। stateful অ্যাপে দরকার, কিন্তু NAT-এর পেছনের বহু ইউজার একই সার্ভারে পড়ে যায় এবং সার্ভার বদলালে সেশন হারায়।</li>
        <li><strong>Power of Two Choices:</strong> র‍্যান্ডম দুটি সার্ভার বেছে যেটির লোড কম সেটিতে পাঠানো। প্রায় least-connections-এর মতো ভালো ফল দেয় অথচ গ্লোবাল অবস্থা জানার দরকার হয় না — বড় ডিস্ট্রিবিউটেড LB-তে জনপ্রিয়।</li>
      </ul>
      <h4>অ্যালগরিদমের চেয়েও যা বেশি জরুরি</h4>
      <p><strong>Health check।</strong> নিখুঁত অ্যালগরিদমও মৃত সার্ভারে ট্রাফিক পাঠালে অর্থহীন। Passive check (ব্যর্থ রেসপন্স দেখে বাদ দেওয়া) ও active check (নিয়মিত <code>/health</code> কল) — দুটিই রাখুন, এবং health endpoint যেন সত্যিই নির্ভরতা যাচাই করে (শুধু <code>200 OK</code> ফেরত না দেয়)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>gRPC/HTTP2-তে L4 ব্যবহার করলে লোড অসম হয় কেন এবং সমাধান কী?</li>
        <li>Sticky session ছাড়া WebSocket কীভাবে স্কেল করবেন?</li>
        <li>Load balancer নিজেই SPOF — কীভাবে HA করবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-20",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["API Gateway","Microservices","Routing"],
    question: "API Gateway Pattern কী? Authentication, Rate Limiting, Request Collapsing এবং Service Mesh-এ এর ভূমিকা কী?",
    answer: `
      <p><strong>API Gateway</strong> হলো সব ক্লায়েন্ট রিকোয়েস্টের একক প্রবেশদ্বার, যা প্রতিটি মাইক্রোসার্ভিসে বারবার লিখতে হয় এমন <em>ক্রস-কাটিং</em> দায়িত্বগুলো এক জায়গায় সামলায়।</p>
      <h4>যে সমস্যা এটি সমাধান করে</h4>
      <p>Gateway ছাড়া প্রতিটি ক্লায়েন্টকে ২০টি সার্ভিসের ঠিকানা জানতে হয়, প্রতিটি সার্ভিসকে নিজে auth, rate limit, CORS, লগিং বাস্তবায়ন করতে হয় — এবং একটি মোবাইল স্ক্রিন আঁকতে ৮টি আলাদা নেটওয়ার্ক কল লাগে (মোবাইল নেটওয়ার্কে যা ভয়াবহ)।</p>
      <pre class="mermaid">
flowchart TD
    W["🌐 Web"] --> G["API Gateway"]
    M["📱 Mobile"] --> G
    P["🤝 Partner API"] --> G
    G --> A["AuthN / AuthZ"]
    G --> RL["Rate Limiting"]
    G --> AGG["Aggregation"]
    G --> S1["User Service"]
    G --> S2["Order Service"]
    G --> S3["Product Service"]
      </pre>
      <span class="diagram-caption">সাধারণ দায়িত্ব একবার gateway-তে, প্রতিটি সার্ভিসে নয়</span>
      <h4>প্রধান দায়িত্ব</h4>
      <ul>
        <li><strong>Authentication:</strong> টোকেন একবার gateway-তে যাচাই করে ভেতরে বিশ্বস্ত পরিচয় (যেমন <code>X-User-Id</code> হেডার বা অভ্যন্তরীণ টোকেন) পাঠানো। প্রতিটি সার্ভিসে JWT যাচাইয়ের কোড ডুপ্লিকেট হয় না।</li>
        <li><strong>Rate Limiting ও quota:</strong> প্রতি API-key/ইউজারভিত্তিক সীমা এক জায়গায়।</li>
        <li><strong>Routing:</strong> path/host/version অনুযায়ী সঠিক সার্ভিসে পাঠানো; ক্লায়েন্টের কাছে অভ্যন্তরীণ টপোলজি লুকিয়ে রাখা।</li>
        <li><strong>Aggregation:</strong> একটি ক্লায়েন্ট কলের জন্য ভেতরে কয়েকটি সার্ভিসে কল করে ফল একত্র করা — মোবাইলের রাউন্ড-ট্রিপ বাঁচে।</li>
        <li><strong>Request Collapsing:</strong> একই সময়ে একই রিসোর্সের বহু রিকোয়েস্ট এলে ডাউনস্ট্রিমে একটিই কল পাঠানো (thundering herd থেকে সার্ভিস রক্ষা)।</li>
        <li><strong>Protocol translation:</strong> বাইরে REST/GraphQL, ভেতরে gRPC।</li>
      </ul>
      <h4>BFF (Backend For Frontend)</h4>
      <p>এক gateway সব ক্লায়েন্টকে সন্তুষ্ট করতে গিয়ে জগাখিচুড়ি হয়ে যায় — মোবাইলের দরকার ছোট পেলোড, ওয়েবের দরকার বেশি ডেটা। সমাধান: প্রতিটি ক্লায়েন্ট-ধরনের জন্য <strong>আলাদা gateway</strong> (mobile-BFF, web-BFF), যেটির মালিক সেই ফ্রন্টএন্ড টিম। এতে টিমগুলো স্বাধীনভাবে এগোতে পারে।</p>
      <h4>Service Mesh-এর সাথে সম্পর্ক (গুরুত্বপূর্ণ পার্থক্য)</h4>
      <ul>
        <li><strong>API Gateway = North-South ট্রাফিক:</strong> বাইরের ক্লায়েন্ট → ক্লাস্টারের ভেতরে। ব্যবসায়িক উদ্বেগ (auth, quota, monetization)।</li>
        <li><strong>Service Mesh = East-West ট্রাফিক:</strong> ক্লাস্টারের ভেতরে সার্ভিস → সার্ভিস। অবকাঠামোগত উদ্বেগ (mTLS, retry, ট্রেসিং)।</li>
        <li>এরা প্রতিযোগী নয় — বড় সিস্টেমে দুটিই একসাথে থাকে।</li>
      </ul>
      <p><strong>প্রধান ঝুঁকি:</strong> gateway সহজেই একটি নতুন মনোলিথ হয়ে উঠতে পারে। ব্যবসায়িক লজিক কখনও gateway-তে রাখবেন না — সেটি রাউটিং ও পলিসির জায়গা। এবং এটি একটি SPOF, তাই একাধিক ইনস্ট্যান্সে চালান।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Gateway ডাউন হলে পুরো সিস্টেম ডাউন — কীভাবে প্রশমিত করবেন?</li>
        <li>Gateway aggregation করলে একটি ডাউনস্ট্রিম সার্ভিস ধীর হলে কী হবে?</li>
        <li>ভেতরের সার্ভিসগুলো কি gateway-কে অন্ধভাবে বিশ্বাস করবে?</li>
      </ul>
    `
  },
  {
    id: "sd-21",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Rate Limiting","Token Bucket","Leaky Bucket"],
    question: "Rate Limiting Algorithms: Token Bucket vs Leaky Bucket vs Sliding Window Log / Counter কীভাবে কাজ করে?",
    answer: `
      <p>Rate limiting-এর অ্যালগরিদম বাছাই মূলত তিনটি জিনিসের মধ্যে আপস: <strong>নির্ভুলতা</strong>, <strong>মেমরি</strong>, এবং <strong>বার্স্ট সহনশীলতা</strong>।</p>
      <h4>১. Fixed Window Counter</h4>
      <p>প্রতিটি নির্দিষ্ট সময়-জানালায় (যেমন প্রতি মিনিটে) একটি কাউন্টার। সহজতম ও সবচেয়ে কম মেমরি।</p>
      <p><strong>মারাত্মক ত্রুটি — সীমানা সমস্যা:</strong> সীমা ১০০/মিনিট হলে ইউজার ১০:০০:৫৯-এ ১০০টি এবং ১০:০১:০০-এ আরও ১০০টি পাঠাতে পারেন — মাত্র ২ সেকেন্ডে <strong>২০০টি</strong>, অথচ প্রযুক্তিগতভাবে কোনো নিয়ম ভাঙেনি।</p>
      <h4>২. Sliding Window Log</h4>
      <p>প্রতিটি রিকোয়েস্টের টাইমস্ট্যাম্প একটি সেটে (যেমন Redis ZSET) রাখা হয়; প্রতিবার উইন্ডোর বাইরেরগুলো বাদ দিয়ে গুনতি করা হয়।</p>
      <ul>
        <li>✅ <strong>নিখুঁত</strong> — কোনো সীমানা সমস্যা নেই।</li>
        <li>❌ প্রতিটি রিকোয়েস্টে একটি এন্ট্রি — উচ্চ ট্রাফিকে মেমরি খরচ অনেক বেশি।</li>
      </ul>
      <h4>৩. Sliding Window Counter (বাস্তবের সেরা ভারসাম্য)</h4>
      <p>আগের ও বর্তমান উইন্ডোর কাউন্টার নিয়ে ওজনযুক্ত গড় বের করা হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// উইন্ডোর ২৫% অতিক্রান্ত হলে আগের উইন্ডোর ৭৫% ওজন পাবে
const elapsed = (now % windowMs) / windowMs;      // 0.25
const estimate = prevCount * (1 - elapsed) + currCount;
// prev=90, curr=20, elapsed=0.25 → 90*0.75 + 20 = 87.5 → সীমা 100 হলে অনুমোদিত</code></pre>
      </div>
      <ul>
        <li>✅ মাত্র দুটি সংখ্যা — অত্যন্ত কম মেমরি।</li>
        <li>✅ সীমানা সমস্যা কার্যত দূর।</li>
        <li>⚠️ আনুমানিক (ধরে নেয় আগের উইন্ডোতে রিকোয়েস্ট সমানভাবে ছড়ানো ছিল) — বাস্তবে ত্রুটি ০.০০৩%-এর কম।</li>
      </ul>
      <h4>৪. Token Bucket</h4>
      <p>একটি বালতিতে নির্দিষ্ট হারে টোকেন জমা হয়; প্রতিটি রিকোয়েস্ট একটি টোকেন খরচ করে। বালতি খালি হলে reject।</p>
      <ul>
        <li><strong>বার্স্ট অনুমোদন করে:</strong> ইউজার নিষ্ক্রিয় থাকলে টোকেন জমতে থাকে, তারপর একসাথে খরচ করতে পারেন। API-তে এটি সাধারণত <em>কাম্য</em> — বাস্তব ব্যবহার এমনই হয়।</li>
        <li>দুটি প্যারামিটার দিয়ে নিয়ন্ত্রণ: <code>rate</code> (গড় হার) ও <code>capacity</code> (সর্বোচ্চ বার্স্ট)।</li>
        <li>AWS API Gateway, Stripe সহ বেশিরভাগ পাবলিক API এটিই ব্যবহার করে।</li>
      </ul>
      <h4>৫. Leaky Bucket</h4>
      <p>রিকোয়েস্ট একটি কিউতে ঢোকে এবং <em>ধ্রুব হারে</em> বেরোয় — ঠিক ফুটো বালতির মতো। আউটপুট সম্পূর্ণ মসৃণ (কোনো বার্স্ট নেই)।</p>
      <p>ডাউনস্ট্রিম সিস্টেম বার্স্ট সহ্য করতে না পারলে (যেমন একটি লিগ্যাসি সার্ভিস বা থার্ড-পার্টি API যার কড়া কোটা আছে) এটি আদর্শ। Nginx-এর <code>limit_req</code> ডিফল্টে leaky bucket, আর <code>burst</code> প্যারামিটার দিয়ে কিউ সাইজ বাড়ানো যায়।</p>
      <h4>সারসংক্ষেপ</h4>
      <table>
        <tr><th>অ্যালগরিদম</th><th>মেমরি</th><th>নির্ভুলতা</th><th>বার্স্ট</th><th>কখন</th></tr>
        <tr><td>Fixed Window</td><td>খুব কম</td><td>দুর্বল</td><td>২× সম্ভব</td><td>মোটা দাগের সুরক্ষা</td></tr>
        <tr><td>Sliding Log</td><td>বেশি</td><td>নিখুঁত</td><td>না</td><td>কঠোর নিয়ন্ত্রণ, কম ট্রাফিক</td></tr>
        <tr><td>Sliding Counter</td><td>কম</td><td>খুব ভালো</td><td>না</td><td><strong>সাধারণ ডিফল্ট</strong></td></tr>
        <tr><td>Token Bucket</td><td>কম</td><td>ভালো</td><td>✅ নিয়ন্ত্রিত</td><td>পাবলিক API</td></tr>
        <tr><td>Leaky Bucket</td><td>কম</td><td>ভালো</td><td>❌ মসৃণ করে</td><td>দুর্বল ডাউনস্ট্রিম রক্ষা</td></tr>
      </table>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Token bucket ও leaky bucket গাণিতিকভাবে কতটা আলাদা?</li>
        <li>একাধিক সার্ভারে এগুলো কীভাবে বাস্তবায়ন করবেন (Redis + Lua)?</li>
        <li>429 রেসপন্সে কোন হেডারগুলো দেওয়া উচিত?</li>
      </ul>
    `
  },
  {
    id: "sd-24",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Caching","Distributed Cache","Memcached vs Redis"],
    question: "Distributed Caching Strategies: Memcached vs Redis এবং Cache Invalidation (Cache Aside, Write Through, Write Back) কী?",
    answer: `
      <p>ডিস্ট্রিবিউটেড ক্যাশিং মানে ক্যাশকে অ্যাপ্লিকেশন সার্ভারের বাইরে একটি শেয়ার্ড স্তরে সরানো, যাতে সব ইনস্ট্যান্স একই ক্যাশ দেখে এবং সার্ভার রিস্টার্টে ক্যাশ হারায় না।</p>
      <h4>Memcached বনাম Redis</h4>
      <table>
        <tr><th>দিক</th><th>Memcached</th><th>Redis</th></tr>
        <tr><td>ডেটা টাইপ</td><td>শুধু string (key-value)</td><td>String, Hash, List, Set, ZSet, Stream, Bitmap</td></tr>
        <tr><td>Persistence</td><td>নেই — রিস্টার্টে সব শেষ</td><td>RDB + AOF</td></tr>
        <tr><td>Replication / HA</td><td>নেই (ক্লায়েন্ট-সাইড শার্ডিং)</td><td>Sentinel, Cluster</td></tr>
        <tr><td>থ্রেডিং</td><td>মাল্টি-থ্রেডেড</td><td>একক-থ্রেডেড কমান্ড লুপ (Redis 6+ এ I/O থ্রেড)</td></tr>
        <tr><td>অ্যাটমিক অপারেশন</td><td>সীমিত</td><td>Lua script, transaction</td></tr>
        <tr><td>মেমরি দক্ষতা</td><td>সরল string-এ কিছুটা ভালো</td><td>বেশি ফিচার, কিছুটা বেশি ওভারহেড</td></tr>
      </table>
      <p><strong>বাস্তব পরামর্শ:</strong> আজকাল প্রায় সব ক্ষেত্রে <strong>Redis</strong>-ই ডিফল্ট পছন্দ — কারণ persistence, HA ও ডেটা স্ট্রাকচারগুলো বিনামূল্যে অনেক সমস্যার সমাধান দেয় (rate limiting, leaderboard, distributed lock, pub/sub)। Memcached কেবল তখনই বিবেচ্য যখন আপনার একমাত্র দরকার বিশুদ্ধ key-value ক্যাশ এবং মাল্টি-থ্রেডেড থ্রুপুট সর্বোচ্চ করতে চান।</p>
      <h4>Cache Invalidation কৌশল</h4>
      <ul>
        <li><strong>Cache-Aside (Lazy Loading):</strong> অ্যাপ আগে ক্যাশ দেখে, miss হলে DB থেকে এনে ক্যাশে লেখে। <em>সবচেয়ে বেশি ব্যবহৃত</em>। সুবিধা — কেবল যা চাওয়া হয় তাই ক্যাশ হয়; অসুবিধা — প্রতিটি cache miss-এ একটি বাড়তি রাউন্ড-ট্রিপ, এবং প্রথম রিকোয়েস্ট সবসময় ধীর।</li>
        <li><strong>Write-Through:</strong> প্রতিটি write একই সাথে ক্যাশ ও DB-তে যায়। ক্যাশ সবসময় সতেজ থাকে, কিন্তু write ধীর হয় এবং যে ডেটা কখনও পড়াই হবে না সেটিও ক্যাশ দখল করে।</li>
        <li><strong>Write-Behind (Write-Back):</strong> write শুধু ক্যাশে যায়, পরে ব্যাচে DB-তে লেখা হয়। write অত্যন্ত দ্রুত, কিন্তু ক্যাশ ক্র্যাশ করলে <strong>ডেটা হারানোর ঝুঁকি</strong>। কেবল সহনীয় ডেটায় (ভিউ কাউন্ট, অ্যানালিটিক্স) ব্যবহার করুন।</li>
        <li><strong>Read-Through:</strong> Cache-aside-এর মতো, তবে ক্যাশ লাইব্রেরি নিজেই DB থেকে লোড করে — অ্যাপ্লিকেশন কোড পরিষ্কার থাকে।</li>
      </ul>
      <h4>Invalidation নাকি TTL?</h4>
      <p>"Cache invalidation কম্পিউটার সায়েন্সের দুই কঠিন সমস্যার একটি" — এই কৌতুকের কারণ, ডেটা কখন বাসি হলো তা নিখুঁতভাবে জানা কঠিন। ব্যবহারিক নীতি:</p>
      <ul>
        <li>যেখানে সামান্য বাসি ডেটা চলে — <strong>শুধু TTL</strong> ব্যবহার করুন। সবচেয়ে সহজ ও নির্ভরযোগ্য।</li>
        <li>যেখানে তাৎক্ষণিক সতেজতা দরকার — write-এর সময় <strong>স্পষ্টভাবে ক্যাশ কী মুছুন</strong> (আপডেট নয়, delete — কারণ delete idempotent এবং race condition কম)।</li>
        <li>জটিল নির্ভরতায় <strong>ট্যাগ-ভিত্তিক invalidation</strong> ব্যবহার করুন (একটি পণ্য বদলালে সেই পণ্য-সংক্রান্ত সব ক্যাশ কী একসাথে বাতিল)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Write-through-এ DB সফল কিন্তু ক্যাশ ব্যর্থ হলে কী করবেন?</li>
        <li>একাধিক ডেটাসেন্টারে ক্যাশ কীভাবে সিঙ্ক রাখবেন?</li>
        <li>ক্যাশ hit rate কত হলে সেটি "ভালো" ধরবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-25",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Database Scaling","Read Replicas","Federation"],
    question: "Database Scaling Strategies: Vertical vs Horizontal Scaling, Read Replicas, Federation এবং Sharding কী?",
    answer: `
      <p>ডাটাবেজ স্কেল করার একটি নির্দিষ্ট ক্রম আছে — এবং ইন্টারভিউয়ে সেই ক্রমটি জানা থাকাই পরিণত ইঞ্জিনিয়ারিংয়ের লক্ষণ। প্রতিটি ধাপ পরেরটির চেয়ে সহজ ও সস্তা, তাই যতদূর সম্ভব উপরের ধাপেই থাকুন।</p>
      <pre class="mermaid">
flowchart TD
    A["০. কুয়েরি ও ইনডেক্স অপ্টিমাইজ<br/>💰 প্রায় বিনামূল্যে"] --> B["১. Caching (Redis)<br/>💰 সস্তা, বিশাল লাভ"]
    B --> C["২. Vertical Scaling<br/>💰 সহজ, কিন্তু সীমা আছে"]
    C --> D["৩. Read Replicas<br/>💰 read স্কেল করে"]
    D --> E["৪. Federation<br/>💰 functional ভাগ"]
    E --> F["৫. Sharding<br/>💰💰 জটিল, শেষ উপায়"]
      </pre>
      <span class="diagram-caption">নিচে নামার আগে উপরের প্রতিটি ধাপ শেষ করুন</span>
      <h4>০. আগে অপ্টিমাইজ করুন</h4>
      <p>বেশিরভাগ "স্কেলিং সমস্যা" আসলে একটি অনুপস্থিত ইনডেক্স বা একটি N+1 কুয়েরি। <code>EXPLAIN</code> চালিয়ে slow query log দেখুন — নতুন সার্ভার কেনার আগে এটিই সবচেয়ে বেশি রিটার্ন দেয়।</p>
      <h4>১. Vertical Scaling</h4>
      <p>বেশি CPU/RAM/NVMe। অবমূল্যায়িত — আধুনিক একটি মেশিনেই ১২৮ কোর ও কয়েক TB RAM সম্ভব, যা বেশিরভাগ কোম্পানির জন্য যথেষ্ট। সীমা: হার্ডওয়্যারের সর্বোচ্চ আকার, অ-রৈখিক দাম, এবং এটি একটি SPOF থেকেই যায়।</p>
      <h4>২. Read Replicas</h4>
      <p>Primary সব write নেয়, একাধিক replica read সার্ভ করে। বেশিরভাগ অ্যাপে read:write = ১০:১ বা তার বেশি, তাই এটি বিশাল স্বস্তি দেয়।</p>
      <ul>
        <li><strong>মূল সমস্যা — replication lag:</strong> ইউজার প্রোফাইল আপডেট করে সাথে সাথে রিফ্রেশ করলে পুরনো ডেটা দেখতে পারেন।</li>
        <li><strong>সমাধান:</strong> "নিজের লেখা ডেটা" পড়ার সময় primary থেকে পড়ুন (read-your-own-writes), বাকি সব replica থেকে।</li>
        <li>Write স্কেল করে না — write সীমায় পৌঁছালে replica সাহায্য করবে না।</li>
      </ul>
      <h4>৩. Federation (Functional Partitioning)</h4>
      <p>ফাংশন অনুযায়ী আলাদা ডাটাবেজ — users DB, orders DB, analytics DB। প্রতিটি ছোট হওয়ায় ক্যাশ ভালো কাজ করে এবং write ভার ভাগ হয়। এটি sharding-এর চেয়ে <em>অনেক সহজ</em> এবং মাইক্রোসার্ভিসের "database per service" নীতির স্বাভাবিক ফল। খরচ: টেবিলগুলোর মধ্যে JOIN আর সম্ভব নয়।</p>
      <h4>৪. Sharding</h4>
      <p>একই টেবিলকে shard key দিয়ে একাধিক সার্ভারে অনুভূমিকভাবে ভাগ করা। একমাত্র উপায় যা <strong>write</strong> স্কেল করে, কিন্তু সবচেয়ে জটিল — cross-shard join, ডিস্ট্রিবিউটেড ট্রানজেকশন, rebalancing, গ্লোবাল unique constraint সব ভেঙে যায়।</p>
      <h4>অতিরিক্ত: কাজ অনুযায়ী ডাটাবেজ বাছাই</h4>
      <p>সব ধরনের কাজ একটিই ডাটাবেজ দিয়ে করার চেষ্টা করবেন না। সার্চ → Elasticsearch, অ্যানালিটিক্স → ColumnStore/BigQuery, সেশন/ক্যাশ → Redis, টাইম-সিরিজ → TimescaleDB। এতে মূল OLTP ডাটাবেজের উপর চাপ অনেক কমে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Replication lag কীভাবে মাপবেন ও alert দেবেন?</li>
        <li>Primary ফেল করলে replica-কে promote করার প্রক্রিয়া কী?</li>
        <li>কোন মেট্রিক দেখে বুঝবেন এখন shard করার সময় এসেছে?</li>
      </ul>
    `
  },
  {
    id: "sd-26",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Message Queue","PubSub","Backpressure"],
    question: "Message Queues (Kafka vs RabbitMQ) ডিস্ট্রিবিউটেড সিস্টেমে Decoupling এবং Asynchronous Processing কীভাবে গ্যারান্টি দেয়?",
    answer: `
      <p>Message queue দুটি সার্ভিসের মধ্যে সরাসরি সিঙ্ক্রোনাস কলের বদলে একটি মধ্যস্থ স্তর বসিয়ে দেয়। এতে সময়গত (temporal) কাপলিং ভেঙে যায় — প্রেরক ও গ্রাহকের একই সময়ে বেঁচে থাকা লাগে না।</p>
      <h4>Decoupling-এর তিনটি স্তর</h4>
      <ul>
        <li><strong>Temporal:</strong> গ্রাহক ডাউন থাকলেও প্রেরক কাজ চালিয়ে যেতে পারে; মেসেজ কিউতে অপেক্ষা করে।</li>
        <li><strong>Spatial:</strong> প্রেরক জানেই না কে বা কতজন গ্রাহক আছে — নতুন গ্রাহক যোগ করতে প্রেরকের কোড বদলাতে হয় না।</li>
        <li><strong>Load:</strong> ট্রাফিক স্পাইক কিউতে জমা হয়; গ্রাহক নিজের সহনীয় গতিতে প্রসেস করে (buffering)। একে বলে <em>load leveling</em>।</li>
      </ul>
      <pre class="mermaid">
flowchart LR
    subgraph Sync["❌ সিঙ্ক্রোনাস চেইন"]
      A1["Order API"] --> B1["Email Service<br/>🐢 ধীর/ডাউন"]
      B1 -.->|"ব্যর্থ হলে<br/>অর্ডারও ব্যর্থ"| X1["💥"]
    end
    subgraph Async["✅ কিউ দিয়ে"]
      A2["Order API"] -->|"publish"| Q["Queue"]
      A2 --> OK["দ্রুত রেসপন্স ✅"]
      Q --> B2["Email Worker"]
      Q --> B3["Analytics Worker"]
      Q --> B4["Invoice Worker"]
    end
      </pre>
      <span class="diagram-caption">কিউ ব্যর্থতাকে বিচ্ছিন্ন করে এবং নতুন গ্রাহক যোগ করা সহজ করে</span>
      <h4>Availability-র উপর প্রভাব (গুরুত্বপূর্ণ যুক্তি)</h4>
      <p>সিঙ্ক্রোনাস চেইনে availability <em>গুণ</em> হয় — ৫টি সার্ভিস প্রতিটি ৯৯.৯% হলে মোট ৯৯.৫%। অ্যাসিঙ্ক্রোনাস করলে অর্ডার API-র availability কেবল নিজের ও ব্রোকারের উপর নির্ভর করে; ইমেইল সার্ভিস ঘণ্টাখানেক ডাউন থাকলেও অর্ডার নেওয়া চলতে থাকে এবং পরে ইমেইল চলে যায়।</p>
      <h4>Delivery Semantics — যা অবশ্যই জানতে হবে</h4>
      <table>
        <tr><th>নিশ্চয়তা</th><th>মানে</th><th>বাস্তবতা</th></tr>
        <tr><td>At-most-once</td><td>শূন্য বা একবার</td><td>দ্রুত, কিন্তু মেসেজ হারাতে পারে</td></tr>
        <tr><td><strong>At-least-once</strong></td><td>অন্তত একবার, ডুপ্লিকেট সম্ভব</td><td><strong>বাস্তবের ডিফল্ট</strong> — গ্রাহককে idempotent হতে হবে</td></tr>
        <tr><td>Exactly-once</td><td>ঠিক একবার</td><td>সীমিত পরিসরে সম্ভব (Kafka transaction); সাধারণভাবে at-least-once + idempotency-ই ব্যবহারিক উত্তর</td></tr>
      </table>
      <p><strong>মনে রাখবেন:</strong> "Exactly-once delivery" নেটওয়ার্কের ওপারে কঠোরভাবে অসম্ভব — যা অর্জন করা যায় তা হলো <em>exactly-once processing</em>, অর্থাৎ ডুপ্লিকেট এলেও ফলাফল একবারের মতোই থাকবে। তাই প্রতিটি মেসেজে একটি ইউনিক আইডি রেখে প্রসেস করা আইডি সংরক্ষণ করুন।</p>
      <h4>যে খরচগুলো স্বীকার করতে হবে</h4>
      <ul>
        <li><strong>Eventual consistency:</strong> কাজ সাথে সাথে হয় না — UI-তে "প্রসেসিং চলছে" দেখাতে হবে।</li>
        <li><strong>ডিবাগিং কঠিন:</strong> একটি রিকোয়েস্টের যাত্রা আর একটি স্ট্যাক ট্রেসে নেই — distributed tracing অপরিহার্য।</li>
        <li><strong>ক্রম:</strong> সমান্তরাল গ্রাহক থাকলে ক্রম ভাঙতে পারে; ক্রম দরকার হলে partition key বা একক গ্রাহক লাগবে।</li>
        <li><strong>নতুন অপারেশনাল দায়িত্ব:</strong> কিউ ডেপথ ও consumer lag মনিটর করতেই হবে — নাহলে নীরবে ব্যাকলগ জমবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>গ্রাহক মেসেজ প্রসেস করতে বারবার ব্যর্থ হলে কী হবে (poison message)?</li>
        <li>কিউ ডেপথ ক্রমাগত বাড়তে থাকলে কী করবেন?</li>
        <li>ব্রোকার নিজেই ডাউন হলে প্রেরক কী করবে?</li>
      </ul>
    `
  },
  {
    id: "sd-33",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Security","OAuth2","OIDC"],
    question: "OAuth 2.0 Framework and OpenID Connect (OIDC) Authorization Code Flow with PKCE কীভাবে কাজ করে?",
    answer: `
      <p><strong>OAuth 2.0</strong> একটি <em>authorization</em> ফ্রেমওয়ার্ক — এটি বলে "এই অ্যাপটি আপনার পক্ষ থেকে কী করতে পারবে"। <strong>OpenID Connect (OIDC)</strong> এর উপর একটি <em>authentication</em> স্তর যোগ করে — "ইউজারটি আসলে কে"।</p>
      <p><strong>মূল পার্থক্য:</strong> OAuth দেয় <code>access_token</code> (API কল করার অনুমতি), OIDC অতিরিক্ত দেয় <code>id_token</code> (একটি JWT যাতে ইউজারের পরিচয় থাকে)। "Google দিয়ে লগইন" আসলে OIDC, শুধু OAuth নয়।</p>
      <h4>Authorization Code Flow with PKCE</h4>
      <pre class="mermaid">
sequenceDiagram
    participant U as User
    participant A as App (client)
    participant AS as Auth Server
    participant API as Resource API

    A->>A: code_verifier তৈরি (র‍্যান্ডম)
    A->>A: code_challenge = SHA256(verifier)
    A->>AS: /authorize + code_challenge
    AS->>U: লগইন + সম্মতির পর্দা
    U-->>AS: অনুমোদন
    AS-->>A: redirect + authorization code
    A->>AS: /token (code + code_verifier)
    AS->>AS: SHA256(verifier) == challenge?
    AS-->>A: access_token + id_token + refresh_token
    A->>API: Bearer access_token
      </pre>
      <span class="diagram-caption">Code আর token আলাদা ধাপে — token কখনও ব্রাউজারের URL-এ আসে না</span>
      <h4>কেন দুই ধাপ (code, তারপর token)</h4>
      <p>Token সরাসরি রিডাইরেক্ট URL-এ পাঠালে সেটি ব্রাউজার হিস্ট্রি, রেফারার হেডার ও সার্ভার লগে থেকে যেত। তাই প্রথমে একটি স্বল্পস্থায়ী, একবার-ব্যবহারযোগ্য <code>code</code> দেওয়া হয়, যা পরে একটি সরাসরি ব্যাক-চ্যানেল POST-এ token-এর জন্য বিনিময় করা হয়।</p>
      <h4>PKCE কেন অপরিহার্য</h4>
      <p>মোবাইল অ্যাপ ও SPA <strong>client_secret নিরাপদে রাখতে পারে না</strong> (কোড ডিকম্পাইল বা বান্ডল পড়া যায়)। তাই কেবল code চুরি করতে পারলেই আক্রমণকারী token পেয়ে যেত।</p>
      <p><strong>PKCE (Proof Key for Code Exchange)</strong> এটি ঠেকায়: অ্যাপ প্রতিবার একটি র‍্যান্ডম <code>code_verifier</code> তৈরি করে এবং তার SHA-256 হ্যাশ (<code>code_challenge</code>) প্রথম রিকোয়েস্টে পাঠায়। Token চাওয়ার সময় আসল <code>code_verifier</code> দিতে হয়। আক্রমণকারী code চুরি করলেও verifier জানে না, তাই token নিতে পারে না।</p>
      <p><strong>মনে রাখবেন:</strong> OAuth 2.1-এ PKCE এখন <em>সব</em> ক্লায়েন্টের জন্য বাধ্যতামূলক — কেবল পাবলিক ক্লায়েন্টের জন্য নয়। Implicit flow সম্পূর্ণ বাতিল করা হয়েছে।</p>
      <h4>নিরাপত্তার অপরিহার্য নিয়ম</h4>
      <ul>
        <li><strong><code>state</code> প্যারামিটার:</strong> CSRF ঠেকাতে র‍্যান্ডম মান পাঠিয়ে ফেরত আসার সময় মিলিয়ে দেখুন।</li>
        <li><strong>Redirect URI-র হুবহু মিল:</strong> ওয়াইল্ডকার্ড ব্যবহার করবেন না — open redirect দিয়ে code চুরি হতে পারে।</li>
        <li><strong><code>id_token</code> যাচাই:</strong> signature, <code>iss</code>, <code>aud</code>, <code>exp</code> এবং <code>nonce</code> — সবগুলোই পরীক্ষা করুন।</li>
        <li><strong>Access token স্বল্পমেয়াদি</strong> রাখুন এবং refresh token <strong>rotate</strong> করুন (ব্যবহৃত refresh token আবার এলে চুরির সংকেত — পুরো চেইন বাতিল করুন)।</li>
        <li>টোকেন <code>localStorage</code>-এ নয়, HttpOnly কুকিতে রাখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Client Credentials flow কখন ব্যবহার করবেন?</li>
        <li>Refresh token reuse detection কীভাবে কাজ করে?</li>
        <li>OAuth কেন authentication-এর জন্য যথেষ্ট নয়?</li>
      </ul>
    `
  },
  {
    id: "sd-37",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Service Mesh","Istio","Envoy"],
    question: "Service Mesh Architecture (Control Plane vs Data Plane) — Istio এবং Envoy Sidecar Proxy কীভাবে কাজ করে?",
    answer: `
      <p><strong>Service Mesh</strong> সার্ভিস-টু-সার্ভিস যোগাযোগের সব দায়িত্ব (retry, timeout, mTLS, লোড ব্যালেন্সিং, ট্রেসিং) অ্যাপ্লিকেশন কোড থেকে সরিয়ে <em>অবকাঠামো স্তরে</em> নিয়ে যায়।</p>
      <h4>যে সমস্যা এটি সমাধান করে</h4>
      <p>Mesh ছাড়া প্রতিটি সার্ভিসকে নিজে retry, circuit breaker, TLS, ট্রেসিং বাস্তবায়ন করতে হয়। ৫টি ভাষায় ২০টি সার্ভিস থাকলে এই লজিক ৫ বার লিখতে হবে এবং সব জায়গায় সমানভাবে আপডেট রাখতে হবে — বাস্তবে যা অসম্ভব।</p>
      <h4>Data Plane বনাম Control Plane</h4>
      <pre class="mermaid">
flowchart TD
    subgraph CP["Control Plane (Istiod)"]
      C["কনফিগ, সার্টিফিকেট,<br/>পলিসি বিতরণ"]
    end
    subgraph P1["Pod A"]
      A["App A"] <--> PA["Envoy sidecar"]
    end
    subgraph P2["Pod B"]
      PB["Envoy sidecar"] <--> B["App B"]
    end
    PA <-->|"mTLS<br/>সব ট্রাফিক এখান দিয়ে"| PB
    C -.->|"কনফিগ পুশ"| PA
    C -.->|"কনফিগ পুশ"| PB
      </pre>
      <span class="diagram-caption">Control plane সিদ্ধান্ত নেয়; data plane (sidecar) আসল ট্রাফিক বহন করে</span>
      <ul>
        <li><strong>Data Plane:</strong> প্রতিটি পডের পাশে চলা Envoy প্রক্সি। অ্যাপের সব ইন/আউট ট্রাফিক এর মধ্য দিয়ে যায় (iptables দিয়ে স্বচ্ছভাবে রিডাইরেক্ট করা হয়)। <strong>অ্যাপ্লিকেশন কোডে কোনো পরিবর্তন লাগে না</strong> — এটিই মূল আকর্ষণ।</li>
        <li><strong>Control Plane (Istiod):</strong> কোনো ট্রাফিক বহন করে না। এটি কনফিগারেশন, সার্ভিস ডিসকভারি ও সার্টিফিকেট তৈরি করে সব sidecar-এ পুশ করে।</li>
      </ul>
      <h4>যা বিনামূল্যে পাওয়া যায়</h4>
      <ul>
        <li><strong>mTLS সর্বত্র:</strong> সার্ভিসগুলোর মধ্যে সব ট্রাফিক স্বয়ংক্রিয়ভাবে এনক্রিপ্টেড ও পারস্পরিকভাবে প্রমাণীকৃত, সার্টিফিকেট আবর্তনসহ। Zero Trust-এর ভিত্তি।</li>
        <li><strong>ট্রাফিক ব্যবস্থাপনা:</strong> ক্যানারি (৫% নতুন ভার্সনে), হেডার-ভিত্তিক রাউটিং, mirroring — কোড বদলানো ছাড়াই।</li>
        <li><strong>Resilience:</strong> retry, timeout, circuit breaker, outlier detection — সব কনফিগ দিয়ে।</li>
        <li><strong>Observability:</strong> প্রতিটি কলের মেট্রিক ও ট্রেস স্বয়ংক্রিয়ভাবে — golden signals বিনা পরিশ্রমে।</li>
        <li><strong>Chaos testing:</strong> ইচ্ছাকৃতভাবে ল্যাটেন্সি বা এরর ইনজেক্ট করে দুর্বলতা খোঁজা।</li>
      </ul>
      <h4>খরচ — যা ইন্টারভিউতে বলা জরুরি</h4>
      <ul>
        <li><strong>ল্যাটেন্সি:</strong> প্রতিটি কলে দুটি বাড়তি প্রক্সি hop (সাধারণত ২–১০ms যোগ হয়)।</li>
        <li><strong>রিসোর্স:</strong> প্রতিটি পডে একটি বাড়তি কন্টেইনার — ১০০ পডে ১০০টি Envoy, যা উল্লেখযোগ্য CPU/RAM খায়।</li>
        <li><strong>অপারেশনাল জটিলতা:</strong> নতুন একটি সিস্টেম শিখতে ও ডিবাগ করতে হবে; ভুল কনফিগে রহস্যময় ৫০৩ এরর।</li>
      </ul>
      <p><strong>কখন ব্যবহার করবেন না:</strong> ১০-১৫টির কম সার্ভিস, একটিই ভাষা, বা টিমে Kubernetes বিশেষজ্ঞ না থাকলে mesh সমস্যার চেয়ে বেশি জটিলতা আনে। তখন একটি ভালো লাইব্রেরি (যেমন resilience4j বা একটি শেয়ার্ড HTTP ক্লায়েন্ট) যথেষ্ট। নতুন <strong>ambient mode</strong> (sidecar ছাড়া) এই খরচ কিছুটা কমাচ্ছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Sidecar প্রক্সি ক্র্যাশ করলে অ্যাপের কী হবে?</li>
        <li>Service mesh ও API gateway একসাথে কীভাবে কাজ করে?</li>
        <li>mTLS-এ সার্টিফিকেট আবর্তন কীভাবে হয়?</li>
      </ul>
    `
  },
  {
    id: "sd-39",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Resilience","Retry with Jitter","Exponential Backoff"],
    question: "Network Resilience: Exponential Backoff and Full Jitter Algorithm কেন গুরুত্বপূর্ণ?",
    answer: `
      <p>ব্যর্থ কল পুনরায় চেষ্টা করা স্বাভাবিক — কিন্তু <em>কীভাবে</em> রিট্রাই করবেন সেটিই ঠিক করে দেয় সিস্টেম সেরে উঠবে নাকি সম্পূর্ণ ধসে পড়বে।</p>
      <h4>ধাপে ধাপে বিবর্তন</h4>
      <ul>
        <li><strong>Immediate retry:</strong> সাথে সাথে আবার চেষ্টা। ইতিমধ্যেই চাপে থাকা সার্ভিসের উপর তাৎক্ষণিকভাবে লোড দ্বিগুণ — সবচেয়ে খারাপ।</li>
        <li><strong>Fixed delay:</strong> প্রতিবার ১ সেকেন্ড পর। ভালো, কিন্তু সব ক্লায়েন্ট একই সাথে ফিরে আসে।</li>
        <li><strong>Exponential backoff:</strong> ১০০ms, ২০০ms, ৪০০ms, ৮০০ms… প্রতিটি ব্যর্থতায় অপেক্ষা দ্বিগুণ, ফলে সার্ভিস শ্বাস নেওয়ার সময় পায়।</li>
        <li><strong>Exponential backoff + jitter:</strong> র‍্যান্ডমাইজেশন যোগ — <strong>এটিই সঠিক উত্তর</strong>।</li>
      </ul>
      <h4>Jitter ছাড়া কী হয়</h4>
      <p>শুধু exponential backoff থাকলে ১০০০ ক্লায়েন্ট একই সময়ে ব্যর্থ হয়ে ঠিক ১০০ms, ২০০ms, ৪০০ms পরে <em>একসাথে</em> ফিরে আসে। ফলে লোড সমান হয় না — বরং সিঙ্ক্রোনাইজড ঢেউয়ে পরিণত হয়, যা বারবার সার্ভিসকে ফেলে দেয়। একে বলে <strong>thundering herd</strong>।</p>
      <pre class="mermaid">
flowchart TD
    subgraph NJ["❌ Jitter ছাড়া"]
      A1["1000 ক্লায়েন্ট ব্যর্থ"] --> B1["সবাই ঠিক 200ms পরে"]
      B1 --> C1["📈 আবার স্পাইক → আবার ব্যর্থ"]
      C1 --> B1
    end
    subgraph WJ["✅ Full Jitter সহ"]
      A2["1000 ক্লায়েন্ট ব্যর্থ"] --> B2["0–200ms এর মধ্যে<br/>এলোমেলোভাবে ছড়ানো"]
      B2 --> C2["📉 মসৃণ লোড → সেরে ওঠে"]
    end
      </pre>
      <span class="diagram-caption">Jitter সিঙ্ক্রোনাইজড ঢেউকে সমতল প্রবাহে পরিণত করে</span>
      <h4>Jitter-এর ধরন (AWS-এর গবেষণা অনুসারে)</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const exp = Math.min(capMs, baseMs * 2 ** attempt);

// Full Jitter — সাধারণত সেরা: সবচেয়ে কম কনটেনশন
const fullJitter = Math.random() * exp;

// Equal Jitter — অর্ধেক নিশ্চিত অপেক্ষা + অর্ধেক র‍্যান্ডম
const equalJitter = exp / 2 + Math.random() * (exp / 2);

// Decorrelated Jitter — দীর্ঘ আউটেজে ভালো ছড়ায়
sleep = Math.min(capMs, Math.random() * (sleep * 3 - baseMs) + baseMs);</code></pre>
      </div>
      <p>AWS-এর সিমুলেশনে <strong>Full Jitter</strong> সবচেয়ে কম মোট কল ও সবচেয়ে দ্রুত সম্পূর্ণতা দিয়েছে — যদিও এটি সবচেয়ে "অগোছালো" মনে হয়।</p>
      <h4>রিট্রাইয়ের অন্যান্য অপরিহার্য নিয়ম</h4>
      <ul>
        <li><strong>শুধু idempotent অপারেশনে:</strong> নাহলে ডাবল চার্জ। POST-এ idempotency key ব্যবহার করুন।</li>
        <li><strong>শুধু ক্ষণস্থায়ী এররে:</strong> 5xx, timeout, connection reset — হ্যাঁ। 400/401/403/422 — কখনও নয়, ফল বদলাবে না।</li>
        <li><strong>একটিমাত্র স্তরে রিট্রাই করুন:</strong> ৩টি স্তরে ৩ বার করে রিট্রাই = ২৭ গুণ লোড।</li>
        <li><strong>Retry budget:</strong> মোট ট্রাফিকের ১০%-এর বেশি রিট্রাই হলে থামান।</li>
        <li><strong>সর্বোচ্চ সীমা (cap):</strong> নাহলে অপেক্ষা ঘণ্টায় পৌঁছে যাবে।</li>
        <li><strong>Circuit breaker যোগ করুন:</strong> নির্ভরতা পুরোপুরি মৃত হলে রিট্রাই অর্থহীন — দ্রুত fail করাই ভালো।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মোট কতবার রিট্রাই করবেন — কীভাবে ঠিক করবেন?</li>
        <li>সার্ভার <code>Retry-After</code> হেডার দিলে সেটি কি মানবেন?</li>
        <li>Metastable failure কী এবং কীভাবে বেরোবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-42",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Disaster Recovery","RPO","RTO"],
    question: "Disaster Recovery (DR) Metrics: RPO (Recovery Point Objective) vs RTO (Recovery Time Objective) কী?",
    answer: `
      <p>RPO এবং RTO হলো দুর্যোগ পুনরুদ্ধার পরিকল্পনার দুটি মূল সংখ্যা। এরা ব্যবসায়িক সিদ্ধান্ত, প্রযুক্তিগত নয় — প্রযুক্তি এই লক্ষ্য পূরণের উপায় মাত্র।</p>
      <table>
        <tr><th></th><th>RPO (Recovery Point Objective)</th><th>RTO (Recovery Time Objective)</th></tr>
        <tr><td>প্রশ্ন</td><td>কতটুকু <strong>ডেটা</strong> হারানো সহনীয়?</td><td>কতক্ষণ <strong>ডাউনটাইম</strong> সহনীয়?</td></tr>
        <tr><td>মাপে</td><td>সময়ের পিছনে (শেষ ভালো ব্যাকআপ)</td><td>সময় সামনে (সেবা ফেরা পর্যন্ত)</td></tr>
        <tr><td>নির্ভর করে</td><td>ব্যাকআপ/রেপ্লিকেশনের ঘনত্ব</td><td>পুনরুদ্ধার প্রক্রিয়ার গতি</td></tr>
        <tr><td>RPO = ১ ঘণ্টা মানে</td><td>সর্বোচ্চ ১ ঘণ্টার ডেটা হারাতে পারি</td><td>—</td></tr>
      </table>
      <pre class="mermaid">
flowchart LR
    B["🗄️ শেষ ব্যাকআপ<br/>02:00"] -->|"RPO<br/>← এই ডেটা হারাল"| F["💥 বিপর্যয়<br/>03:00"]
    F -->|"RTO<br/>পুনরুদ্ধারে যত সময়"| R["✅ সেবা ফিরল<br/>05:00"]
      </pre>
      <span class="diagram-caption">RPO বিপর্যয়ের আগের দিকে তাকায়, RTO পরের দিকে</span>
      <h4>DR কৌশল ও তাদের খরচ</h4>
      <table>
        <tr><th>কৌশল</th><th>RPO</th><th>RTO</th><th>খরচ</th></tr>
        <tr><td><strong>Backup & Restore</strong></td><td>ঘণ্টা</td><td>ঘণ্টা–দিন</td><td>সবচেয়ে কম</td></tr>
        <tr><td><strong>Pilot Light</strong> (মূল অংশ চালু, বাকিটা বন্ধ)</td><td>মিনিট</td><td>দশ মিনিট</td><td>কম</td></tr>
        <tr><td><strong>Warm Standby</strong> (ছোট আকারে পুরো কপি চালু)</td><td>সেকেন্ড</td><td>মিনিট</td><td>মাঝারি</td></tr>
        <tr><td><strong>Active-Active</strong> (দুই অঞ্চলেই লাইভ ট্রাফিক)</td><td>প্রায় শূন্য</td><td>প্রায় শূন্য</td><td>সবচেয়ে বেশি</td></tr>
      </table>
      <h4>মূল ট্রেড-অফ</h4>
      <p>RPO শূন্যের কাছাকাছি নিতে হলে <strong>synchronous replication</strong> লাগে — অর্থাৎ প্রতিটি write দূরের অঞ্চলে নিশ্চিত হওয়া পর্যন্ত অপেক্ষা করতে হবে। এতে প্রতিটি write-এ আন্তঃঅঞ্চল RTT (৫০–১৫০ms) যোগ হয়। তাই <strong>কম RPO-র মূল্য হলো বেশি latency</strong> — এই সংযোগটি বোঝা ইন্টারভিউতে গুরুত্বপূর্ণ।</p>
      <p>বেশিরভাগ সিস্টেম তাই asynchronous replication বেছে নেয় এবং কয়েক সেকেন্ডের RPO মেনে নেয়।</p>
      <h4>যা প্রায়ই ভুল হয়</h4>
      <ul>
        <li><strong>ব্যাকআপ পরীক্ষা না করা:</strong> "আমাদের ব্যাকআপ আছে" আর "আমরা পুনরুদ্ধার করতে পারি" এক জিনিস নয়। নিয়মিত restore drill করুন — না করলে RTO একটি অনুমান মাত্র।</li>
        <li><strong>ব্যাকআপ একই জায়গায় রাখা:</strong> একই অঞ্চল/অ্যাকাউন্টে থাকলে সেই অঞ্চল বা র‍্যানসমওয়্যার দুটোই একসাথে নেবে। অপরিবর্তনীয় (immutable) ও ভিন্ন অঞ্চলে কপি রাখুন।</li>
        <li><strong>শুধু ডাটাবেজ ভাবা:</strong> DR মানে DNS, সার্টিফিকেট, সিক্রেট, কনফিগ, থার্ড-পার্টি ইন্টিগ্রেশন — সবকিছু।</li>
        <li><strong>সব সিস্টেমে একই লক্ষ্য দেওয়া:</strong> পেমেন্ট DB-র RPO কয়েক সেকেন্ড হতে হবে, কিন্তু অ্যানালিটিক্সে এক দিনও চলে। সব কিছুকে সর্বোচ্চ স্তরে নিলে খরচ অহেতুক বাড়ে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Failover-এর পর আবার মূল অঞ্চলে ফিরবেন (failback) কীভাবে?</li>
        <li>DR সাইটে failover করার সিদ্ধান্ত কে নেবে এবং কীভাবে?</li>
        <li>Active-active-এ ডেটা দ্বন্দ্ব কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-44",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Zero Trust","Security","Architecture"],
    question: "Zero Trust Security Architecture in Microservices — Never Trust, Always Verify কীভাবে কাজ করে?",
    answer: `
      <p><strong>Zero Trust</strong> নিরাপত্তার সেই ঐতিহ্যবাহী ধারণা বাতিল করে যেখানে "নেটওয়ার্কের ভেতরে থাকা মানেই বিশ্বাসযোগ্য"। মূল নীতি — <strong>Never trust, always verify</strong>: প্রতিটি রিকোয়েস্ট প্রমাণীকৃত ও অনুমোদিত হতে হবে, সেটি যেখান থেকেই আসুক।</p>
      <h4>পুরনো মডেল কেন ব্যর্থ</h4>
      <p>ঐতিহ্যবাহী "castle-and-moat" মডেলে শক্ত ফায়ারওয়াল থাকে বাইরে, আর ভেতরে সবাই একে অপরকে বিশ্বাস করে। সমস্যা হলো — একজন আক্রমণকারী একটি সার্ভিস ভাঙতে পারলেই ভেতরে <strong>অবাধে পাশাপাশি ছড়াতে (lateral movement)</strong> পারে। ক্লাউড, রিমোট কাজ ও মাইক্রোসার্ভিসে "ভেতর" বলে স্পষ্ট কিছু আর নেই-ও।</p>
      <h4>মূল স্তম্ভ</h4>
      <ul>
        <li><strong>শক্তিশালী পরিচয় (identity):</strong> প্রতিটি সার্ভিসের নিজস্ব যাচাইযোগ্য পরিচয় থাকবে (SPIFFE ID বা mTLS সার্টিফিকেট) — শুধু IP ঠিকানা যথেষ্ট নয়, কারণ IP স্পুফ ও পুনর্বণ্টিত হয়।</li>
        <li><strong>mTLS সর্বত্র:</strong> সার্ভিসগুলোর মধ্যে সব যোগাযোগ এনক্রিপ্টেড এবং <em>উভয় পক্ষ</em> একে অপরকে প্রমাণ করে। Service mesh এটি স্বয়ংক্রিয়ভাবে দেয়।</li>
        <li><strong>Least privilege:</strong> প্রতিটি সার্ভিস কেবল যা দরকার তাতেই অ্যাক্সেস পাবে। order-service কেন user টেবিলে <code>DELETE</code> করতে পারবে?</li>
        <li><strong>স্পষ্ট authorization পলিসি:</strong> "কে কার সাথে কথা বলতে পারবে" কোডে নয়, ঘোষণামূলক পলিসিতে (Istio AuthorizationPolicy, OPA) লেখা — যাতে অডিট করা যায়।</li>
        <li><strong>ধরে নিন লঙ্ঘন ঘটেছে:</strong> ডিজাইন এমন হবে যেন একটি সার্ভিস ভাঙলেও ক্ষতি সেখানেই সীমাবদ্ধ থাকে (micro-segmentation)।</li>
        <li><strong>সবকিছু লগ ও পর্যবেক্ষণ:</strong> প্রতিটি অ্যাক্সেস সিদ্ধান্ত অডিটযোগ্য হবে।</li>
      </ul>
      <h4>মাইক্রোসার্ভিসে বাস্তব প্রয়োগ</h4>
      <pre class="mermaid">
flowchart TD
    U["👤 User"] -->|"OAuth token"| G["API Gateway<br/>ইউজার প্রমাণীকরণ"]
    G -->|"mTLS + অভ্যন্তরীণ টোকেন<br/>(ইউজার কনটেক্সট সহ)"| S1["Order Service"]
    S1 -->|"mTLS + পলিসি যাচাই"| S2["Payment Service"]
    S1 -.->|"❌ পলিসিতে অনুমতি নেই"| S3["Admin Service"]
    P[("Policy Engine<br/>OPA / Istio")] -.-> S1
    P -.-> S2
      </pre>
      <span class="diagram-caption">প্রতিটি hop-এ আলাদা যাচাই — gateway পেরোলেই সব খোলা নয়</span>
      <p><strong>একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ বিষয়:</strong> gateway ইউজারকে প্রমাণ করার পর ভেতরের সার্ভিসগুলো যেন অন্ধভাবে বিশ্বাস না করে। ইউজারের পরিচয় ভেতরেও বহন করুন (স্বাক্ষরিত অভ্যন্তরীণ টোকেন হিসেবে), যাতে প্রতিটি সার্ভিস নিজে সিদ্ধান্ত নিতে পারে "এই ইউজার কি সত্যিই এই অর্ডারটি দেখতে পারেন?" — নাহলে IDOR ধরনের দুর্বলতা থেকে যায়।</p>
      <h4>ব্যবহারিক পদক্ষেপ</h4>
      <ul>
        <li>সিক্রেট কোড বা env-এ নয় — Vault/KMS-এ, স্বল্পমেয়াদি ও স্বয়ংক্রিয়ভাবে আবর্তিত।</li>
        <li>ডিফল্টে সব ট্রাফিক deny; স্পষ্টভাবে যা দরকার তাই allow (k8s NetworkPolicy)।</li>
        <li>মানুষের অ্যাক্সেসেও একই নীতি — MFA, স্বল্পমেয়াদি ক্রেডেনশিয়াল, just-in-time অনুমোদন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Zero Trust কি VPN-এর প্রয়োজন দূর করে?</li>
        <li>প্রতিটি কলে পলিসি যাচাই করলে latency-র কী হবে?</li>
        <li>লিগ্যাসি সার্ভিস mTLS সাপোর্ট না করলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-45",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Deployment","Canary","Blue-Green"],
    question: "Deployment Strategies: Blue-Green Deployment vs Canary Deployment vs Rolling Update কী?",
    answer: `
      <p>ডিপ্লয়মেন্ট কৌশলের মূল লক্ষ্য একটাই — <strong>নতুন কোড রিলিজ করার ঝুঁকি কমানো</strong> এবং সমস্যা হলে দ্রুত ফিরে আসা।</p>
      <table>
        <tr><th>দিক</th><th>Rolling Update</th><th>Blue-Green</th><th>Canary</th></tr>
        <tr><td>পদ্ধতি</td><td>একটি একটি করে ইনস্ট্যান্স বদলানো</td><td>দুটি সম্পূর্ণ পরিবেশ, ট্রাফিক একবারে সুইচ</td><td>অল্প শতাংশ ট্রাফিক নতুনে, ধীরে বাড়ানো</td></tr>
        <tr><td>রোলব্যাক গতি</td><td>ধীর (আবার rolling)</td><td><strong>তাৎক্ষণিক</strong></td><td>দ্রুত (ট্রাফিক ফিরিয়ে নিন)</td></tr>
        <tr><td>খরচ</td><td>কম</td><td><strong>দ্বিগুণ</strong> (দুটি পরিবেশ)</td><td>সামান্য বেশি</td></tr>
        <tr><td>ঝুঁকির পরিধি</td><td>ক্রমে সবাই</td><td>একবারে ১০০%</td><td><strong>শুরুতে ১–৫%</strong></td></tr>
        <tr><td>দুই ভার্সন একসাথে</td><td>হ্যাঁ (সাময়িক)</td><td>না</td><td>হ্যাঁ (দীর্ঘ সময়)</td></tr>
      </table>
      <pre class="mermaid">
flowchart TD
    subgraph C["Canary Deployment"]
      LB["Load Balancer"] -->|"৯৫%"| V1["v1 (স্থিতিশীল)"]
      LB -->|"৫%"| V2["v2 (নতুন)"]
      V2 --> M{"মেট্রিক ঠিক আছে?<br/>error rate, latency"}
      M -->|"হ্যাঁ"| INC["ট্রাফিক বাড়ান<br/>৫% → ২৫% → ১০০%"]
      M -->|"না"| RB["🔙 রোলব্যাক<br/>মাত্র ৫% ইউজার প্রভাবিত"]
    end
      </pre>
      <span class="diagram-caption">Canary-তে সমস্যা অল্প ইউজারেই ধরা পড়ে</span>
      <h4>কোনটি কখন</h4>
      <ul>
        <li><strong>Rolling:</strong> ডিফল্ট (Kubernetes-এ বিল্ট-ইন)। সস্তা ও সহজ। রুটিন, কম ঝুঁকির পরিবর্তনে যথেষ্ট।</li>
        <li><strong>Blue-Green:</strong> যখন তাৎক্ষণিক ও নিশ্চিত রোলব্যাক দরকার, এবং দুই ভার্সন একসাথে চলা সমস্যাজনক (যেমন ব্যাকগ্রাউন্ড জব বা schema-সংবেদনশীল পরিবর্তন)। খরচ বেশি, কিন্তু সুইচটি অ্যাটমিক।</li>
        <li><strong>Canary:</strong> সবচেয়ে নিরাপদ — উচ্চ ঝুঁকির পরিবর্তনে ব্যবহার করুন। বাস্তব ট্রাফিকে বাস্তব মেট্রিক দেখে সিদ্ধান্ত নেওয়া যায়, যা স্টেজিংয়ে কখনও সম্ভব নয়।</li>
      </ul>
      <h4>যে বিষয়টি সবচেয়ে বেশি ভুল হয়: ডাটাবেজ মাইগ্রেশন</h4>
      <p>যেকোনো কৌশলেই <strong>পুরনো ও নতুন কোড কিছু সময়ের জন্য একই ডাটাবেজ শেয়ার করবে</strong>। তাই schema পরিবর্তন অবশ্যই <em>backward compatible</em> হতে হবে। কলাম মুছে ফেলা বা নাম বদলানো ডিপ্লয় ভেঙে দেবে, কারণ পুরনো পড এখনও সেটি খুঁজবে।</p>
      <p><strong>নিরাপদ পদ্ধতি — Expand & Contract:</strong></p>
      <ol>
        <li><strong>Expand:</strong> নতুন কলাম যোগ করুন (পুরনোটি রেখে দিন)।</li>
        <li><strong>Migrate:</strong> কোড দুটোতেই লিখুক, পড়ুক নতুনটি থেকে। ডিপ্লয় করুন।</li>
        <li><strong>Backfill:</strong> পুরনো সারিগুলোর ডেটা নতুন কলামে ভরুন।</li>
        <li><strong>Contract:</strong> সব ঠিক থাকলে পরের রিলিজে পুরনো কলাম মুছুন।</li>
      </ol>
      <h4>সম্পর্কিত ধারণা</h4>
      <ul>
        <li><strong>Feature flag:</strong> ডিপ্লয় আর রিলিজ আলাদা করে দেয় — কোড প্রোডাকশনে থাকবে কিন্তু বন্ধ, তারপর ফ্ল্যাগ দিয়ে চালু। রোলব্যাক = ফ্ল্যাগ বন্ধ করা, কোনো ডিপ্লয় লাগে না। এটিই সবচেয়ে দ্রুত "রোলব্যাক"।</li>
        <li><strong>Shadow / dark launch:</strong> আসল ট্রাফিকের কপি নতুন ভার্সনে পাঠানো, কিন্তু রেসপন্স ফেলে দেওয়া — ইউজারকে প্রভাবিত না করে পারফরম্যান্স যাচাই।</li>
        <li><strong>স্বয়ংক্রিয় রোলব্যাক:</strong> ক্যানারির সিদ্ধান্ত মানুষের চোখে নয়, মেট্রিকের উপর ছাড়ুন (error rate বাড়লেই স্বয়ংক্রিয়ভাবে ফিরিয়ে নিন)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Canary-তে কোন মেট্রিক দেখে সিদ্ধান্ত নেবেন?</li>
        <li>স্টেটফুল সার্ভিস বা চলমান WebSocket কানেকশন কীভাবে ডিপ্লয় করবেন?</li>
        <li>Graceful shutdown না থাকলে rolling update-এ কী সমস্যা হয়?</li>
      </ul>
    `
  },
  {
    id: "sd-49",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["CDN","Edge Computing","Cloudflare Workers"],
    question: "Edge Computing (Cloudflare Workers, Vercel Edge Functions) কীভাবে ল্যাটেন্সি দূর করে?",
    answer: `
      <p><strong>Edge Computing</strong> মানে কোড চালানো ইউজারের ভৌগোলিকভাবে কাছে — একটি কেন্দ্রীয় ডেটাসেন্টারে নয়, বরং বিশ্বজুড়ে ছড়ানো শত শত এজ লোকেশনে।</p>
      <h4>কেন latency কমে</h4>
      <p>মূল কারণ পদার্থবিজ্ঞান। ফাইবারে আলোর গতি সীমিত, তাই ঢাকা থেকে ভার্জিনিয়ায় রাউন্ড-ট্রিপে ~২৫০ms লাগবেই — কোড যত দ্রুতই হোক। এজ লোকেশন সিঙ্গাপুরে হলে সেটি ~৬০ms। TLS হ্যান্ডশেকেও একাধিক RTT লাগে, তাই কাছাকাছি termination করলে লাভ গুণিতক হারে বাড়ে।</p>
      <pre class="mermaid">
flowchart TD
    U["👤 ঢাকার ইউজার"] -->|"~15ms"| E["Edge (সিঙ্গাপুর)<br/>auth, redirect, A/B, ক্যাশ"]
    E -->|"বেশিরভাগ এখানেই শেষ ✅"| U
    E -.->|"শুধু প্রয়োজনে ~200ms"| O["Origin (ভার্জিনিয়া)<br/>ডাটাবেজ, ভারী লজিক"]
      </pre>
      <span class="diagram-caption">এজে যা সিদ্ধান্ত নেওয়া যায় তা অরিজিন পর্যন্ত যায় না</span>
      <h4>এজে কী চালানো উপযুক্ত</h4>
      <ul>
        <li><strong>Authentication ও রিডাইরেক্ট:</strong> টোকেন যাচাই করে অবৈধ রিকোয়েস্ট এজেই ফিরিয়ে দেওয়া।</li>
        <li><strong>A/B টেস্ট ও ব্যক্তিগতকরণ:</strong> কুকি দেখে কোন ভ্যারিয়েন্ট দেখাবে তা ঠিক করা।</li>
        <li><strong>জিওলোকেশন-ভিত্তিক রাউটিং:</strong> দেশ অনুযায়ী ভাষা, মুদ্রা বা কনটেন্ট।</li>
        <li><strong>হেডার/রেসপন্স রূপান্তর, বট ফিল্টারিং, rate limiting।</strong></li>
        <li><strong>ছবি রিসাইজ ও ক্যাশিং।</strong></li>
      </ul>
      <h4>এজের সীমাবদ্ধতা — যা ইন্টারভিউতে বলা জরুরি</h4>
      <ul>
        <li><strong>এটি Node.js নয়:</strong> Cloudflare Workers/Vercel Edge V8 isolate-এ চলে, সম্পূর্ণ Node রানটাইমে নয়। <code>fs</code>, নেটিভ মডিউল, TCP সকেট — কিছুই নেই। শুধু Web API (fetch, crypto, streams)।</li>
        <li><strong>কড়া CPU ও সময়সীমা:</strong> সাধারণত কয়েক মিলিসেকেন্ড CPU সময় — ভারী গণনা চলবে না।</li>
        <li><strong>ডাটাবেজই আসল ফাঁদ:</strong> এজ ফাংশন সিঙ্গাপুরে চলছে কিন্তু ডাটাবেজ ভার্জিনিয়ায় থাকলে <em>প্রতিটি কুয়েরিতে</em> ২০০ms যোগ হবে — অর্থাৎ এজে সরানোয় সিস্টেম <strong>ধীর</strong> হয়ে গেল। কয়েকটি কুয়েরি থাকলে অবস্থা আরও খারাপ।</li>
      </ul>
      <p><strong>এই কারণেই এজের সঙ্গে ডেটাও এজে দরকার:</strong> Cloudflare D1/KV/Durable Objects, Vercel Edge Config, Turso — এগুলো ডেটা রেপ্লিকেট করে এজের কাছে রাখে। এজ ফাংশন তখনই সত্যিই দ্রুত যখন তার ডেটাও কাছে থাকে, নাহলে এটি কেবল একটি বাড়তি hop।</p>
      <h4>ব্যবহারিক নিয়ম</h4>
      <p>এজে রাখুন সেই লজিক যা <strong>ডেটাবিহীন বা সামান্য, রেপ্লিকেটেড ডেটার উপর নির্ভর করে</strong> এবং দ্রুত সিদ্ধান্ত নেয়। ভারী, ডেটা-নিবিড় কাজ ডাটাবেজের পাশে অরিজিনেই রাখুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>এজ ফাংশনে ডাটাবেজ কানেকশন পুলিং কেন সমস্যা?</li>
        <li>Cold start এজে কম কেন (V8 isolate বনাম কন্টেইনার)?</li>
        <li>এজে ব্যক্তিগত ডেটা প্রসেস করলে ডেটা রেসিডেন্সি আইনে কী প্রভাব?</li>
      </ul>
    `
  },
  {
    id: "sd-50",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Data Lake","Data Warehouse","ETL"],
    question: "Data Warehouse (Snowflake/BigQuery) vs Data Lake (Hadoop/S3) এবং ETL vs ELT Pipeline কী?",
    answer: `
      <p>Data Warehouse ও Data Lake দুটোই বিশ্লেষণের জন্য ডেটা জমা রাখে, কিন্তু <strong>কাঠামো কখন আরোপ করা হয়</strong> সেই প্রশ্নে এরা মৌলিকভাবে আলাদা।</p>
      <table>
        <tr><th>দিক</th><th>Data Warehouse</th><th>Data Lake</th></tr>
        <tr><td>ডেটার ধরন</td><td>কাঠামোবদ্ধ, পরিশোধিত</td><td>যেকোনো — কাঁচা, আধা-কাঠামোবদ্ধ, বাইনারি</td></tr>
        <tr><td>Schema</td><td><strong>Schema-on-write</strong> (আগে সংজ্ঞা)</td><td><strong>Schema-on-read</strong> (পড়ার সময় ব্যাখ্যা)</td></tr>
        <tr><td>ব্যবহারকারী</td><td>বিজনেস অ্যানালিস্ট, BI ড্যাশবোর্ড</td><td>ডেটা সায়েন্টিস্ট, ML</td></tr>
        <tr><td>খরচ</td><td>বেশি (কম্পিউট + স্টোরেজ)</td><td>কম (সস্তা অবজেক্ট স্টোরেজ)</td></tr>
        <tr><td>কুয়েরির গতি</td><td>দ্রুত (অপ্টিমাইজড, কলামার)</td><td>ধীর (প্রক্রিয়াকরণ লাগে)</td></tr>
        <tr><td>উদাহরণ</td><td>Snowflake, BigQuery, Redshift</td><td>S3 + Hadoop/Spark</td></tr>
      </table>
      <p><strong>মূল ঝুঁকি:</strong> শাসন (governance) ছাড়া data lake সহজেই <em>"data swamp"</em>-এ পরিণত হয় — কেউ জানে না কোন ফাইলে কী আছে, কে লিখেছে, নাকি সেটি এখনও সঠিক। ক্যাটালগ ও মেটাডেটা ব্যবস্থাপনা তাই ঐচ্ছিক নয়।</p>
      <h4>ETL বনাম ELT</h4>
      <pre class="mermaid">
flowchart LR
    subgraph ETL["ETL (ঐতিহ্যবাহী)"]
      S1["Source"] --> E1["Extract"] --> T1["Transform<br/>আলাদা সার্ভারে"] --> L1["Load"] --> W1[("Warehouse")]
    end
    subgraph ELT["ELT (আধুনিক)"]
      S2["Source"] --> E2["Extract"] --> L2["Load<br/>কাঁচা ডেটা"] --> W2[("Warehouse")]
      W2 --> T2["Transform<br/>warehouse-এর ভেতরেই SQL দিয়ে"]
    end
      </pre>
      <span class="diagram-caption">ELT-তে রূপান্তর হয় গন্তব্যেই — কাঁচা ডেটা সংরক্ষিত থাকে</span>
      <ul>
        <li><strong>ETL:</strong> লোড করার <em>আগে</em> রূপান্তর। স্টোরেজ ব্যয়বহুল ছিল বলে এটিই ছিল নিয়ম। অসুবিধা — কাঁচা ডেটা হারিয়ে যায়, তাই লজিক বদলালে পুরনো ডেটা আর পুনর্গণনা করা যায় না।</li>
        <li><strong>ELT (আধুনিক ডিফল্ট):</strong> কাঁচা ডেটা আগে লোড করে warehouse-এর শক্তিশালী ইঞ্জিনে SQL দিয়ে রূপান্তর। স্টোরেজ এখন সস্তা এবং Snowflake/BigQuery-র কম্পিউট বিশাল — তাই আলাদা ট্রান্সফর্ম ক্লাস্টার রাখার দরকার নেই।</li>
      </ul>
      <p><strong>ELT কেন জিতেছে:</strong> কাঁচা ডেটা থেকে যায় বলে ব্যবসায়িক সংজ্ঞা বদলালে (যেমন "সক্রিয় ইউজার"-এর নতুন সংজ্ঞা) পুরো ইতিহাস আবার গণনা করা যায়। ETL-এ সেটি চিরতরে হারিয়ে যেত। dbt-এর মতো টুল এই ভেতরে-রূপান্তরের কাজকে সংস্করণ-নিয়ন্ত্রিত ও পরীক্ষাযোগ্য করেছে।</p>
      <h4>Lakehouse — দুয়ের মিলন</h4>
      <p>Delta Lake, Apache Iceberg ও Hudi সস্তা অবজেক্ট স্টোরেজের উপর warehouse-এর সুবিধা (ACID ট্রানজেকশন, schema enforcement, time travel) যোগ করে। এটিই বর্তমানে সবচেয়ে জনপ্রিয় দিক — একই কপি ডেটার উপর BI ও ML দুটোই চালানো যায়, দুটি আলাদা সিস্টেমে ডেটা ডুপ্লিকেট না করেই।</p>
      <h4>একটি গুরুত্বপূর্ণ স্থাপত্যগত নীতি</h4>
      <p><strong>অ্যানালিটিক্স কুয়েরি কখনও প্রোডাকশন OLTP ডাটাবেজে চালাবেন না।</strong> একটি ভারী রিপোর্ট কুয়েরি টেবিল লক করে বা রিসোর্স খেয়ে লাইভ অ্যাপ ধীর করে দিতে পারে। ডেটা আলাদা অ্যানালিটিক্যাল স্টোরে (CDC বা পর্যায়ক্রমিক সিঙ্ক দিয়ে) সরিয়ে সেখানে বিশ্লেষণ করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>OLTP ও OLAP ডাটাবেজের অভ্যন্তরীণ পার্থক্য কী (row বনাম columnar স্টোরেজ)?</li>
        <li>Columnar ফরম্যাট (Parquet) অ্যানালিটিক্সে দ্রুত কেন?</li>
        <li>Warehouse-এ ডেটা কত ঘন ঘন সিঙ্ক করবেন — ব্যাচ না স্ট্রিমিং?</li>
      </ul>
    `
  },
  /* ===== SECTION I — Real-World Architecture Design (16) ===== */
  {
    id: "sd-27",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Search Engine","Elasticsearch","Indexing"],
    question: "Design a Distributed Search System (e.g., E-commerce Search / Google Search) — Inverted Index এবং Ranking Architecture কী?",
    answer: `
      <h4>Requirements</h4>
      <ul>
        <li><strong>FR:</strong> কীওয়ার্ড সার্চ, ফিল্টার (দাম, ব্র্যান্ড, ক্যাটাগরি), সাজানো, autocomplete, টাইপো সহনশীলতা, faceted count।</li>
        <li><strong>NFR:</strong> p99 &lt;২০০ms, নতুন পণ্য কয়েক সেকেন্ডে সার্চে আসবে, সার্চ ডাউন হলেও সাইট চলবে।</li>
      </ul>
      <h4>১. Inverted Index — মূল ধারণা</h4>
      <p>সাধারণ ইনডেক্স "ডকুমেন্ট → শব্দ" ম্যাপ করে। <strong>Inverted index</strong> উল্টোটা করে — "শব্দ → কোন কোন ডকুমেন্টে আছে"। ফলে সার্চ মানে সব ডকুমেন্ট স্ক্যান নয়, বরং কয়েকটি তালিকার ছেদ (intersection) বের করা।</p>
      <pre class="mermaid">
flowchart LR
    subgraph Docs["ডকুমেন্ট"]
      D1["doc1: red running shoes"]
      D2["doc2: blue running shirt"]
      D3["doc3: red cotton shirt"]
    end
    subgraph Index["Inverted Index"]
      T1["red → [1, 3]"]
      T2["running → [1, 2]"]
      T3["shoes → [1]"]
      T4["shirt → [2, 3]"]
    end
    Docs --> Index
    Index --> Q["'red shirt' → [1,3] ∩ [2,3] = doc3 ⚡"]
      </pre>
      <span class="diagram-caption">শব্দ থেকে সরাসরি ডকুমেন্ট আইডি — তাই মিলিসেকেন্ডে ফল</span>
      <h4>২. Analysis pipeline (ইনডেক্স করার আগে)</h4>
      <ol>
        <li><strong>Character filter:</strong> HTML ট্যাগ সরানো, বিশেষ অক্ষর স্বাভাবিক করা।</li>
        <li><strong>Tokenizer:</strong> বাক্যকে শব্দে ভাঙা।</li>
        <li><strong>Token filter:</strong> lowercase, stop word বাদ, <strong>stemming</strong> ("running" → "run", যাতে "run" সার্চেও মেলে), synonym যোগ।</li>
      </ol>
      <p><strong>জরুরি:</strong> সার্চের সময়ও <em>একই</em> analyzer চালাতে হবে, নাহলে ইনডেক্সে "run" আছে কিন্তু সার্চে "running" খুঁজবে — কিছুই মিলবে না।</p>
      <h4>৩. Ranking (BM25)</h4>
      <p>Elasticsearch ডিফল্টে <strong>BM25</strong> ব্যবহার করে, যা তিনটি বিষয় বিবেচনা করে:</p>
      <ul>
        <li><strong>Term Frequency:</strong> শব্দটি ডকুমেন্টে কতবার আছে (তবে ক্রমহ্রাসমান রিটার্ন — ১০ বার থাকা ৫ বারের দ্বিগুণ ভালো নয়)।</li>
        <li><strong>Inverse Document Frequency:</strong> বিরল শব্দ বেশি গুরুত্বপূর্ণ ("the" প্রায় মূল্যহীন, "Sennheiser" অত্যন্ত নির্দেশক)।</li>
        <li><strong>Field length:</strong> ছোট ফিল্ডে মিললে বেশি প্রাসঙ্গিক (টাইটেলে মেলা বর্ণনায় মেলার চেয়ে ভালো)।</li>
      </ul>
      <p>ই-কমার্সে শুধু টেক্সট প্রাসঙ্গিকতা যথেষ্ট নয় — <strong>ব্যবসায়িক সিগন্যাল</strong> মেশাতে হয়: বিক্রির সংখ্যা, রেটিং, স্টকে আছে কি না, লাভের মার্জিন। <code>function_score</code> দিয়ে এগুলো BM25 স্কোরের সাথে মেলানো হয়।</p>
      <h4>৪. স্কেলিং ও ব্যর্থতা</h4>
      <ul>
        <li><strong>Sharding:</strong> ইনডেক্স শার্ডে ভাগ হয়; প্রতিটি শার্ড সমান্তরালে সার্চ করে, তারপর কো-অর্ডিনেটর নোড ফল মেলায়। শার্ড সংখ্যা পরে বদলানো যায় না — তাই পরিকল্পনা করে নিন।</li>
        <li><strong>Replica:</strong> read throughput ও fault tolerance দুটোই বাড়ায়।</li>
        <li><strong>Near real-time:</strong> ES ডিফল্টে প্রতি ১ সেকেন্ডে refresh করে — তাই নতুন ডকুমেন্ট সাথে সাথে নয়, ~১s পরে সার্চে আসে।</li>
        <li><strong>Search ডাউন হলে:</strong> সাইট যেন না ভাঙে — ক্যাটাগরি ব্রাউজ বা DB-ভিত্তিক সরল সার্চে fallback দিন।</li>
        <li><strong>Zero-downtime reindex:</strong> নতুন ইনডেক্স বানিয়ে <strong>alias</strong> অ্যাটমিকভাবে সরান — ম্যাপিং বদলানোর একমাত্র নিরাপদ উপায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Autocomplete কীভাবে বানাবেন (edge n-gram বনাম completion suggester)?</li>
        <li>ব্যক্তিগতকৃত (personalized) সার্চ ফল কীভাবে দেবেন?</li>
        <li>"কোনো ফল পাওয়া যায়নি" — কীভাবে কমাবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-28",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","URL Shortener","Base62"],
    question: "Design a URL Shortener (e.g., TinyURL) — Hash Function, Base62 Encoding এবং Unique ID Generation কীভাবে করবেন?",
    answer: `
      <h4>১. Requirements</h4>
      <ul>
        <li><strong>FR:</strong> লম্বা URL → ছোট URL; ছোট URL-এ গেলে রিডাইরেক্ট; ঐচ্ছিক custom alias ও expiry।</li>
        <li><strong>NFR:</strong> রিডাইরেক্ট অত্যন্ত দ্রুত (&lt;৫০ms), উচ্চ availability, শর্ট কোড কখনও পুনর্ব্যবহার নয়।</li>
        <li><strong>স্কেল ধরি:</strong> ১০০M নতুন URL/মাস → ~৪০ write/s; read:write = ১০০:১ → ~৪০০০ read/s।</li>
      </ul>
      <h4>২. শর্ট কোড তৈরির কৌশল</h4>
      <table>
        <tr><th>পদ্ধতি</th><th>কীভাবে</th><th>সমস্যা</th></tr>
        <tr><td>MD5/SHA হ্যাশ</td><td>URL হ্যাশ করে প্রথম ৭ অক্ষর</td><td><strong>Collision</strong> হয় — চেক ও রিট্রাই লাগে</td></tr>
        <tr><td>Auto-increment + Base62</td><td>DB counter → base62 এনকোড</td><td>ID অনুমানযোগ্য; counter একটি bottleneck</td></tr>
        <tr><td><strong>KGS (প্রস্তাবিত)</strong></td><td>আগে থেকেই কোড তৈরি করে রাখা</td><td>আলাদা সার্ভিস, কিন্তু collision-free ও দ্রুত</td></tr>
      </table>
      <p><strong>Base62 কেন:</strong> a–z, A–Z, 0–9 = ৬২টি অক্ষর। ৭ অক্ষরে 62<sup>7</sup> ≈ <strong>৩.৫ ট্রিলিয়ন</strong> কম্বিনেশন — কয়েক দশকের জন্য যথেষ্ট।</p>
      <h4>৩. আর্কিটেকচার</h4>
      <pre class="mermaid">
flowchart TD
    U["👤 Client"] --> LB["Load Balancer"]
    LB --> W["Write API<br/>POST /shorten"]
    LB --> R["Read API<br/>GET /:code"]
    W --> KGS["Key Generation Service<br/>প্রি-জেনারেটেড কোড পুল"]
    W --> DB[("Database<br/>code → longUrl")]
    R --> C{"Redis cache<br/>hit?"}
    C -->|hit| RD["301/302 Redirect"]
    C -->|miss| DB
    DB --> C2["ক্যাশে লিখে রাখা"] --> RD
      </pre>
      <span class="diagram-caption">Read পথটিই আসল — তাই সেটি ক্যাশ-ফার্স্ট</span>
      <h4>৪. Data Model</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE TABLE urls (
  short_code   VARCHAR(7) PRIMARY KEY,   -- lookup key, তাই PK
  long_url     TEXT        NOT NULL,
  user_id      BIGINT,
  created_at   TIMESTAMP   DEFAULT NOW(),
  expires_at   TIMESTAMP,
  click_count  BIGINT      DEFAULT 0
);
CREATE INDEX idx_urls_expires ON urls (expires_at) WHERE expires_at IS NOT NULL;</code></pre>
      </div>
      <p>এটি একটি বিশুদ্ধ key-value lookup — join নেই, ট্রানজেকশন নেই। তাই DynamoDB/Cassandra-র মতো NoSQL স্টোর এখানে চমৎকার মানায় এবং শার্ডিংও সহজ (shard key = short_code)।</p>
      <h4>৫. গুরুত্বপূর্ণ সিদ্ধান্ত: 301 না 302?</h4>
      <ul>
        <li><strong>301 (Permanent):</strong> ব্রাউজার ক্যাশে রাখে → পরের বার আপনার সার্ভারে আসেই না। সার্ভার লোড কমে, কিন্তু <strong>ক্লিক অ্যানালিটিক্স হারিয়ে যায়</strong>।</li>
        <li><strong>302 (Temporary):</strong> প্রতিবার সার্ভারে আসে → অ্যানালিটিক্স পাওয়া যায়, লোড বেশি। অ্যানালিটিক্স পণ্যের অংশ হলে 302 নিন।</li>
      </ul>
      <h4>৬. স্কেলিং ও ব্যর্থতা</h4>
      <ul>
        <li><strong>ক্যাশ:</strong> ক্লিক বণ্টন Zipf-এর মতো — অল্প কিছু URL-ই বেশিরভাগ ট্রাফিক পায়। LRU ক্যাশে ~২০% ডেটা রাখলেই ৯০%+ hit rate মেলে।</li>
        <li><strong>Analytics:</strong> রিডাইরেক্ট পথে DB আপডেট করবেন না। ক্লিক ইভেন্ট Kafka-তে পাঠিয়ে অ্যাসিঙ্ক্রোনাসভাবে গুনুন।</li>
        <li><strong>KGS SPOF:</strong> দুটি রেপ্লিকা রাখুন, প্রতিটি আলাদা কী-রেঞ্জ ধরে রাখবে — একই কোড দুবার দেওয়ার ঝুঁকি থাকবে না।</li>
        <li><strong>অপব্যবহার:</strong> ফিশিং লিংক ঠেকাতে Safe Browsing API যাচাই ও প্রতি-ইউজার rate limit।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কাস্টম alias কীভাবে সামলাবেন — collision হলে?</li>
        <li>মেয়াদোত্তীর্ণ URL কীভাবে পরিষ্কার করবেন এবং কোড পুনর্ব্যবহার করা কি উচিত?</li>
        <li>ক্লিক অ্যানালিটিক্স রিয়েল-টাইম হতে হলে কী বদলাবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-29",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Chat App","WebSockets"],
    question: "Design a Real-time Chat Application (e.g., WhatsApp / Slack) — WebSockets, Connection Manager, PubSub এবং Storage Architecture কী?",
    answer: `
      <h4>১. Requirements</h4>
      <ul>
        <li><strong>FR:</strong> ১-১ ও গ্রুপ চ্যাট, অনলাইন স্ট্যাটাস, ডেলিভারি/রিড রিসিট, অফলাইন মেসেজ ডেলিভারি, মিডিয়া শেয়ার।</li>
        <li><strong>NFR:</strong> মেসেজ latency &lt;১০০ms, মেসেজ কখনও হারাবে না, ক্রম বজায় থাকবে, লক্ষ লক্ষ সমান্তরাল কানেকশন।</li>
      </ul>
      <h4>২. আর্কিটেকচার</h4>
      <pre class="mermaid">
flowchart TD
    A["📱 User A"] <-->|WebSocket| G1["Chat Server 1"]
    B["📱 User B"] <-->|WebSocket| G2["Chat Server 2"]
    G1 --> S[("Redis<br/>userId → serverId<br/>session registry")]
    G2 --> S
    G1 -->|"B অন্য সার্ভারে"| PS["Redis Pub/Sub<br/>বা Kafka"]
    PS --> G2
    G1 --> Q["Message Queue"]
    Q --> P["Persistence Worker"]
    P --> DB[("Cassandra<br/>messages")]
    P --> PN["Push Notification<br/>(অফলাইন হলে)"]
      </pre>
      <span class="diagram-caption">Session registry বলে দেয় ইউজার কোন সার্ভারে; Pub/Sub সার্ভারগুলোকে জোড়া লাগায়</span>
      <h4>৩. মূল চ্যালেঞ্জ: কানেকশন stateful</h4>
      <p>WebSocket একটি নির্দিষ্ট সার্ভারের সাথে বাঁধা। A সার্ভার ১-এ, B সার্ভার ২-এ থাকলে A-র মেসেজ B পর্যন্ত পৌঁছাবে কীভাবে? সমাধান দুই অংশে:</p>
      <ul>
        <li><strong>Session registry (Redis):</strong> <code>user:123 → chat-server-7</code> ম্যাপিং। কে কোথায় আছে জানা যায়।</li>
        <li><strong>Pub/Sub ব্যাকবোন:</strong> সার্ভার ১ <code>server-7</code> চ্যানেলে পাবলিশ করে; সার্ভার ৭ সাবস্ক্রাইব করা আছে, সে নিজের সকেটে ডেলিভার করে।</li>
      </ul>
      <h4>৪. Data Model — কেন Cassandra</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Cassandra: partition = conversation, ক্রমানুসারে সাজানো
CREATE TABLE messages (
  conversation_id  UUID,
  message_id       TIMEUUID,      -- সময়ক্রম বিল্ট-ইন
  sender_id        BIGINT,
  content          TEXT,
  created_at       TIMESTAMP,
  PRIMARY KEY ((conversation_id), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
-- একটি কথোপকথনের সাম্প্রতিক মেসেজ = একটি পার্টিশন থেকে সিকোয়েনশিয়াল রিড</code></pre>
      </div>
      <p>চ্যাট <strong>write-heavy</strong> (প্রতিটি মেসেজ একটি write) এবং কুয়েরি প্যাটার্ন অত্যন্ত সরল ("এই কথোপকথনের শেষ N মেসেজ")। Cassandra ঠিক এই কাজে সেরা — write দ্রুত, পার্টিশন-ভিত্তিক রিড দ্রুত, horizontal scaling সহজ।</p>
      <h4>৫. মেসেজ যেন না হারায় ও ক্রম ঠিক থাকে</h4>
      <ul>
        <li><strong>Client-generated ID:</strong> ক্লায়েন্ট প্রতিটি মেসেজে একটি UUID দেয় → রিট্রাই করলেও ডুপ্লিকেট হবে না (idempotency)।</li>
        <li><strong>ACK চেইন:</strong> sent (সার্ভারে পৌঁছেছে) → delivered (গ্রাহকের ডিভাইসে) → read। প্রতিটি ধাপে ক্লায়েন্টকে জানানো হয়।</li>
        <li><strong>ক্রম:</strong> গ্লোবাল ক্রম অসম্ভব ও অপ্রয়োজনীয়। <em>প্রতি কথোপকথনে</em> ক্রম যথেষ্ট — সার্ভার-সাইড টাইমস্ট্যাম্প/TIMEUUID দিয়ে নিশ্চিত করুন, ক্লায়েন্টের ঘড়ি বিশ্বাস করবেন না।</li>
        <li><strong>অফলাইন:</strong> রেজিস্ট্রিতে ইউজার না থাকলে DB-তে সংরক্ষণ করে push notification পাঠান; ইউজার ফিরলে last_read_message_id-র পর থেকে সিঙ্ক।</li>
      </ul>
      <h4>৬. স্কেলিং ও ব্যর্থতা</h4>
      <ul>
        <li><strong>কানেকশন ক্ষমতা:</strong> একটি টিউন করা সার্ভার ~৫০–১০০K সকেট ধরে (ফাইল ডেসক্রিপ্টর ও মেমরি সীমা বাড়াতে হবে)। ১০M ইউজারের জন্য ~২০০ সার্ভার।</li>
        <li><strong>সার্ভার ক্র্যাশ:</strong> ক্লায়েন্ট backoff সহ রিকানেক্ট করবে, নতুন সার্ভারে রেজিস্ট্রি আপডেট হবে, তারপর মিসড মেসেজ সিঙ্ক।</li>
        <li><strong>গ্রুপ চ্যাটের fan-out:</strong> ১০০০ সদস্যের গ্রুপে একটি মেসেজ = ১০০০ ডেলিভারি। বড় গ্রুপে fan-out ওয়ার্কারে সরিয়ে দিন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>End-to-end encryption যোগ করলে সার্ভার-সাইড সার্চ কীভাবে করবেন?</li>
        <li>"টাইপিং করছে..." ইন্ডিকেটর কীভাবে করবেন — এটি কি persist করবেন?</li>
        <li>একই ইউজারের একাধিক ডিভাইস কীভাবে সিঙ্ক রাখবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-30",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Notification System","Queues"],
    question: "Design a Scalable Notification System (Email, SMS, Push Notification) — Priority Queues, Deduplication এবং Rate Limiting কীভাবে করবেন?",
    answer: `
      <h4>Requirements</h4>
      <ul>
        <li><strong>FR:</strong> Email/SMS/Push তিন চ্যানেল, টেমপ্লেট, ইউজার প্রেফারেন্স ও opt-out, ডেলিভারি স্ট্যাটাস ট্র্যাকিং।</li>
        <li><strong>NFR:</strong> OTP কয়েক সেকেন্ডে যেতে হবে, প্রোমোশনাল দেরি হলেও চলবে; একই নোটিফিকেশন দুবার যাবে না; থার্ড-পার্টি ডাউন থাকলেও কিছু হারাবে না।</li>
      </ul>
      <pre class="mermaid">
flowchart TD
    S["Services<br/>(order, auth, billing)"] --> API["Notification API<br/>validate + dedupe"]
    API --> PREF{"ইউজার প্রেফারেন্স<br/>ও opt-out যাচাই"}
    PREF -->|blocked| DROP["বাদ"]
    PREF -->|allowed| PQ["Priority Queues"]
    PQ --> HI["high: OTP, security"]
    PQ --> LO["low: promo, digest"]
    HI --> W["Workers"]
    LO --> W
    W --> V1["SendGrid (email)"]
    W --> V2["Twilio (SMS)"]
    W --> V3["FCM/APNs (push)"]
    V1 -.->|webhook| ST[("Delivery status")]
    W -->|ব্যর্থ| DLQ["Dead Letter Queue"]
      </pre>
      <span class="diagram-caption">অগ্রাধিকার আলাদা কিউতে — নিউজলেটারের ঢল যেন OTP আটকে না দেয়</span>
      <h4>মূল ডিজাইন সিদ্ধান্ত</h4>
      <ul>
        <li><strong>আলাদা প্রায়োরিটি কিউ (একই কিউতে priority ফিল্ড নয়):</strong> ১০ লাখ প্রোমো মেসেজ কিউতে ঢুকলে OTP পেছনে পড়ে যাবে। ভিন্ন কিউ ও ভিন্ন ওয়ার্কার পুল রাখলে এই সমস্যা হয় না।</li>
        <li><strong>Deduplication:</strong> প্রতিটি নোটিফিকেশনের জন্য একটি <code>idempotency_key</code> (যেমন <code>order-123-shipped</code>) তৈরি করে Redis-এ <code>SET NX EX 86400</code> দিন। রিট্রাই বা ডুপ্লিকেট ইভেন্টে ইউজার দ্বিতীয়বার মেসেজ পাবেন না।</li>
        <li><strong>Rate limiting দুই স্তরে:</strong> (ক) প্রতি ইউজারে — "দিনে ৫টির বেশি প্রোমো নয়", (খ) প্রতি ভেন্ডরে — Twilio-র API কোটা অতিক্রম না করা।</li>
        <li><strong>Template rendering:</strong> টেমপ্লেট ও ডেটা আলাদা রাখুন; রেন্ডার করা কনটেন্ট নয়, টেমপ্লেট আইডি + ভ্যারিয়েবল কিউতে পাঠান — তাহলে টেমপ্লেট বদলালে পুরনো কিউ-ও ঠিক থাকে।</li>
      </ul>
      <h4>ব্যর্থতা সামলানো</h4>
      <ul>
        <li><strong>ভেন্ডর ডাউন:</strong> exponential backoff সহ রিট্রাই; বারবার ব্যর্থ হলে circuit breaker খুলে ব্যাকআপ ভেন্ডরে সরে যান (SendGrid → SES)।</li>
        <li><strong>DLQ:</strong> সর্বোচ্চ রিট্রাইয়ের পরও ব্যর্থ মেসেজ DLQ-তে যাবে — নীরবে হারাবে না; পরে পরীক্ষা ও রিপ্লে করা যাবে।</li>
        <li><strong>Bounce/complaint হ্যান্ডলিং:</strong> ভেন্ডরের webhook থেকে bounce এলে সেই ঠিকানা suppression list-এ ফেলুন, নাহলে sender reputation নষ্ট হবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একজন ইউজার একসাথে ৫০টি ইভেন্ট ট্রিগার করলে কীভাবে একত্র (digest) করবেন?</li>
        <li>নির্দিষ্ট সময়ে (ইউজারের টাইমজোনে সকাল ৯টা) পাঠানো কীভাবে করবেন?</li>
        <li>ডেলিভারি স্ট্যাটাস কীভাবে ট্র্যাক করবেন যখন ভেন্ডর অ্যাসিঙ্ক্রোনাসভাবে জানায়?</li>
      </ul>
    `
  },
  {
    id: "sd-31",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Rate Limiter","Distributed Limiter"],
    question: "Design a Distributed Rate Limiter — Redis Sliding Window Counter এবং Race Condition ফিক্স কীভাবে করবেন?",
    answer: `
      <h4>১. সমস্যা</h4>
      <p>একাধিক API সার্ভারে ছড়ানো অবস্থায় "প্রতি ইউজার প্রতি মিনিটে ১০০ রিকোয়েস্ট" নিয়ম প্রয়োগ করতে হবে। প্রতিটি সার্ভার নিজের ইন-মেমোরি কাউন্টার রাখলে ১০টি সার্ভারে ইউজার আসলে ১০০০ রিকোয়েস্ট পেয়ে যাবে — তাই <strong>শেয়ার্ড স্টেট</strong> (Redis) লাগবে।</p>
      <h4>২. অ্যালগরিদম তুলনা</h4>
      <table>
        <tr><th>অ্যালগরিদম</th><th>মেমরি</th><th>নির্ভুলতা</th><th>সমস্যা</th></tr>
        <tr><td>Fixed Window Counter</td><td>খুব কম</td><td>কম</td><td>উইন্ডোর সীমানায় <strong>২× বার্স্ট</strong> সম্ভব</td></tr>
        <tr><td>Sliding Window Log</td><td>বেশি (প্রতিটি টাইমস্ট্যাম্প)</td><td>নিখুঁত</td><td>বেশি ট্রাফিকে মেমরি খরচ</td></tr>
        <tr><td><strong>Sliding Window Counter</strong></td><td>কম</td><td>খুব ভালো (আনুমানিক)</td><td>বাস্তবে সেরা ভারসাম্য</td></tr>
        <tr><td>Token Bucket</td><td>কম</td><td>ভালো</td><td>নিয়ন্ত্রিত বার্স্ট অনুমোদন করে</td></tr>
      </table>
      <p><strong>Fixed window-এর সমস্যাটি বুঝুন:</strong> সীমা ১০০/মিনিট। ইউজার ১০:০০:৫৯-এ ১০০টি এবং ১০:০১:০০-এ আরও ১০০টি পাঠাল — মাত্র ২ সেকেন্ডে ২০০টি রিকোয়েস্ট, অথচ কোনো নিয়ম ভাঙেনি।</p>
      <h4>৩. Race Condition ও তার সমাধান</h4>
      <p>নিষ্পাপ বাস্তবায়ন <code>GET</code> → যাচাই → <code>INCR</code> করে। কিন্তু ১০টি সমান্তরাল রিকোয়েস্ট একই সাথে GET করলে সবাই "৯৯" দেখে সবাই পাস করে যায়। সমাধান — <strong>Lua script</strong>, কারণ Redis স্ক্রিপ্টকে একক অ্যাটমিক অপারেশন হিসেবে চালায়।</p>
      <div class="code-box">
        <div class="code-header"><span>lua</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Sliding Window Log, ZSET দিয়ে, সম্পূর্ণ অ্যাটমিক
-- KEYS[1]=key  ARGV[1]=now(ms)  ARGV[2]=windowMs  ARGV[3]=limit
local key    = KEYS[1]
local now    = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit  = tonumber(ARGV[3])

-- উইন্ডোর বাইরের পুরনো এন্ট্রি বাদ
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)

local count = redis.call('ZCARD', key)
if count < limit then
  redis.call('ZADD', key, now, now .. '-' .. math.random())
  redis.call('PEXPIRE', key, window)      -- মেমরি লিক ঠেকায়
  return {1, limit - count - 1}            -- {allowed, remaining}
end
return {0, 0}</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const sha = await redis.script('LOAD', luaScript);

async function rateLimit(userId, limit = 100, windowMs = 60_000) {
  const [allowed, remaining] = await redis.evalsha(
    sha, 1, \`rl:\${userId}\`, Date.now(), windowMs, limit
  );
  return { allowed: allowed === 1, remaining };
}

app.use(async (req, res, next) => {
  let r;
  try {
    r = await rateLimit(req.user.id);
  } catch (err) {
    // ⚠️ Redis ডাউন হলে fail-open না fail-closed?
    // পাবলিক API → fail-open (ব্যবহারযোগ্যতা), লগইন এন্ডপয়েন্ট → fail-closed (নিরাপত্তা)
    return next();
  }
  res.set('X-RateLimit-Remaining', r.remaining);
  if (!r.allowed) {
    res.set('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
});</code></pre>
      </div>
      <h4>৪. প্রোডাকশন বিবেচনা</h4>
      <ul>
        <li><strong>Redis-ই bottleneck হতে পারে:</strong> প্রতিটি রিকোয়েস্টে একটি রাউন্ড-ট্রিপ। বিশাল স্কেলে দুই স্তরে করুন — লোকাল approximate কাউন্টার + পর্যায়ক্রমে Redis-এ সিঙ্ক।</li>
        <li><strong>কোন কী দিয়ে সীমা:</strong> লগইন করা ইউজারে <code>userId</code>; অজ্ঞাত ট্রাফিকে IP — তবে NAT-এর কারণে একই IP-তে বহু ইউজার থাকতে পারে, তাই IP-ভিত্তিক সীমা উদার রাখুন।</li>
        <li><strong>সবসময় হেডার দিন:</strong> <code>X-RateLimit-Limit/Remaining/Reset</code> এবং <code>Retry-After</code> — ক্লায়েন্ট তখন ভদ্রভাবে backoff করতে পারে।</li>
        <li><strong>স্তরভিত্তিক সীমা:</strong> free/paid ভেদে ভিন্ন কোটা; ব্যয়বহুল এন্ডপয়েন্টে কড়া সীমা।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis ডাউন হলে fail-open না fail-closed — কোন এন্ডপয়েন্টে কোনটি?</li>
        <li>একাধিক ডেটাসেন্টারে গ্লোবাল rate limit কীভাবে করবেন?</li>
        <li>Token bucket কখন sliding window-এর চেয়ে ভালো?</li>
      </ul>
    `
  },
  {
    id: "sd-32",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Video Streaming","HLS"],
    question: "Design a Video Streaming Service (e.g., YouTube / Netflix) — Video Transcoding, HLS / DASH, CDN এবং Storage Architecture কী?",
    answer: `
      <h4>Requirements</h4>
      <ul>
        <li><strong>FR:</strong> ভিডিও আপলোড, একাধিক রেজোলিউশনে প্লেব্যাক, seek, সাবটাইটেল, রেজিউম।</li>
        <li><strong>NFR:</strong> বাফারিং ন্যূনতম, বিশ্বব্যাপী কম latency, স্টোরেজ খরচ নিয়ন্ত্রণে, দুর্বল নেটওয়ার্কেও চলবে।</li>
      </ul>
      <pre class="mermaid">
flowchart TD
    U["📤 Upload"] --> S3R[("Raw storage (S3)")]
    S3R --> Q["Transcoding Queue"]
    Q --> W["Worker pool (FFmpeg)"]
    W --> T1["1080p"] --> SEG["সেগমেন্টে ভাঙা<br/>(২–১০s chunk)"]
    W --> T2["720p"] --> SEG
    W --> T3["480p / 360p"] --> SEG
    SEG --> MAN["Manifest তৈরি<br/>(.m3u8 / .mpd)"]
    MAN --> S3P[("Processed storage")]
    S3P --> CDN["CDN Edge"]
    CDN --> P["▶️ Player<br/>Adaptive Bitrate"]
      </pre>
      <span class="diagram-caption">আপলোড ও প্লেব্যাক সম্পূর্ণ আলাদা পথ; মাঝে অ্যাসিঙ্ক্রোনাস ট্রান্সকোডিং</span>
      <h4>১. কেন সেগমেন্টে ভাঙা হয় (HLS / DASH)</h4>
      <p>পুরো ভিডিও একটি ফাইল হিসেবে পাঠালে নেটওয়ার্ক খারাপ হলে বাফারিং হয় এবং seek করতে পুরো ফাইল নামাতে হয়। তাই ভিডিওকে ২–১০ সেকেন্ডের ছোট <strong>segment</strong>-এ ভাঙা হয়, এবং একটি <strong>manifest</strong> ফাইল বলে দেয় কোন কোয়ালিটির কোন সেগমেন্ট কোথায় আছে।</p>
      <p><strong>Adaptive Bitrate (ABR):</strong> প্লেয়ার প্রতিটি সেগমেন্ট ডাউনলোডের গতি মেপে পরের সেগমেন্টের কোয়ালিটি নিজেই ঠিক করে। নেট ধীর হলে ৩৬০p, ভালো হলে ১০৮০p — ভিডিও থামে না, শুধু ঝাপসা হয়।</p>
      <h4>২. Transcoding পাইপলাইন</h4>
      <ul>
        <li><strong>DAG হিসেবে চিন্তা করুন:</strong> একটি ভিডিও থেকে সমান্তরালে অনেক আউটপুট (রেজোলিউশন, কোডেক, থাম্বনেইল, সাবটাইটেল)। প্রতিটি ধাপ আলাদা জব।</li>
        <li><strong>খণ্ডে ভাগ করে সমান্তরাল করুন:</strong> ২ ঘণ্টার ভিডিও একটি মেশিনে ট্রান্সকোড করতে ঘণ্টার পর ঘণ্টা লাগবে। ভিডিওকে টুকরো করে ১০০ ওয়ার্কারে ভাগ করে দিলে মিনিটে শেষ।</li>
        <li><strong>খরচ নিয়ন্ত্রণ:</strong> সব ভিডিওর সব রেজোলিউশন আগে থেকে বানাবেন না। জনপ্রিয় ভিডিওতে সব, কম দেখা ভিডিওতে চাহিদা অনুযায়ী (on-demand) ট্রান্সকোড করুন।</li>
      </ul>
      <h4>৩. CDN-ই আসল নায়ক</h4>
      <p>ভিডিও ট্রাফিকের ৯৫%+ CDN থেকে যায় — অরিজিন সার্ভার প্রায় ছোঁয়াই হয় না। সেগমেন্ট ফাইল অপরিবর্তনীয় (immutable), তাই দীর্ঘ <code>Cache-Control</code> দেওয়া যায়। শুধু manifest ছোট TTL-এ রাখুন (লাইভ স্ট্রিমে)।</p>
      <h4>৪. অন্যান্য বিবেচনা</h4>
      <ul>
        <li><strong>Resumable upload:</strong> বড় ফাইল আপলোডে নেট কাটলে শুরু থেকে করা অগ্রহণযোগ্য — chunked/multipart আপলোড ব্যবহার করুন।</li>
        <li><strong>DRM ও hotlink protection:</strong> signed URL বা টোকেনভিত্তিক অ্যাক্সেস, নাহলে অন্যরা আপনার ব্যান্ডউইথে ভিডিও পরিবেশন করবে।</li>
        <li><strong>স্টোরেজ tiering:</strong> পুরনো, কম দেখা ভিডিও সস্তা কোল্ড স্টোরেজে সরান।</li>
        <li><strong>থাম্বনেইল ও প্রিভিউ:</strong> seek bar-এ hover প্রিভিউয়ের জন্য sprite sheet আগেই তৈরি করে রাখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>লাইভ স্ট্রিমিংয়ে ডিজাইন কীভাবে বদলাবে (latency বনাম বাফার)?</li>
        <li>"কে কতটুকু দেখেছে" (watch progress) কীভাবে ট্র্যাক করবেন?</li>
        <li>একটি ভিডিও হঠাৎ ভাইরাল হলে কী ঘটবে?</li>
      </ul>
    `
  },
  {
    id: "sd-34",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Web Crawler","Robots.txt"],
    question: "Design a Web Crawler (e.g., Googlebot) — URL Frontier, HTML Parser, Duplicate Detection (Bloom Filter) এবং Politeness Policy কী?",
    answer: `
      <h4>মূল কম্পোনেন্ট</h4>
      <pre class="mermaid">
flowchart TD
    F["URL Frontier<br/>অগ্রাধিকার + politeness কিউ"] --> DL["Downloader<br/>(robots.txt মেনে)"]
    DL --> P["HTML Parser"]
    P --> EX["লিংক নিষ্কাশন"]
    P --> CS["Content Seen?<br/>(checksum/SimHash)"]
    CS -->|নতুন| ST[("Content Store")]
    CS -->|ডুপ্লিকেট| DROP["বাদ"]
    EX --> UF{"URL Seen?<br/>Bloom Filter"}
    UF -->|না| F
    UF -->|হ্যাঁ| DROP
      </pre>
      <span class="diagram-caption">দুই ধরনের ডুপ্লিকেট আলাদা করে ধরতে হয় — URL এবং কনটেন্ট</span>
      <h4>১. URL Frontier — শুধু কিউ নয়</h4>
      <p>এটি ক্রলারের সবচেয়ে সূক্ষ্ম অংশ। এটিকে দুটি কাজ একসাথে করতে হয়:</p>
      <ul>
        <li><strong>Priority:</strong> গুরুত্বপূর্ণ/দ্রুত বদলায় এমন পেজ (সংবাদ সাইট) বেশি ঘন ঘন ক্রল করা।</li>
        <li><strong>Politeness:</strong> একই ডোমেইনে একসাথে অনেক রিকোয়েস্ট পাঠিয়ে সার্ভার ডাউন করে দেওয়া যাবে না। সাধারণত <strong>প্রতি হোস্টে একটি কানেকশন</strong> এবং দুটি রিকোয়েস্টের মাঝে বিলম্ব রাখা হয়।</li>
      </ul>
      <p>বাস্তবায়ন: প্রতি-হোস্ট আলাদা কিউ, এবং একটি ওয়ার্কার একটি হোস্ট ধরে রাখে — এতে politeness স্বাভাবিকভাবেই নিশ্চিত হয়।</p>
      <h4>২. Bloom Filter কেন</h4>
      <p>১০০ বিলিয়ন URL-এর সেট মেমরিতে রাখা অসম্ভব (শুধু URL-ই টেরাবাইট)। <strong>Bloom filter</strong> একটি সম্ভাব্যতা-ভিত্তিক ডেটা স্ট্রাকচার যা অল্প মেমরিতে বলে দেয় "এটি নিশ্চিতভাবে দেখিনি" বা "সম্ভবত দেখেছি"।</p>
      <ul>
        <li><strong>False positive সম্ভব</strong> (আসলে দেখিনি কিন্তু "দেখেছি" বলল) → কিছু পেজ বাদ পড়বে। ক্রলিংয়ে এটি গ্রহণযোগ্য।</li>
        <li><strong>False negative অসম্ভব</strong> → যা দেখেছি তা কখনও "নতুন" বলবে না। এটিই দরকার।</li>
        <li>~১% false positive হারে প্রতি URL-এ মাত্র ~১০ bit লাগে — বিশাল সাশ্রয়।</li>
      </ul>
      <h4>৩. Content-level ডুপ্লিকেশন</h4>
      <p>ভিন্ন URL-এ একই কনটেন্ট থাকতে পারে (mirror, session id-যুক্ত URL)। তাই কনটেন্টের <strong>checksum</strong> বা <strong>SimHash</strong> রেখে near-duplicate ধরা হয়। SimHash প্রায় একই রকম পেজও ধরতে পারে, হুবহু এক না হলেও।</p>
      <h4>৪. Politeness ও নৈতিকতা</h4>
      <ul>
        <li><code>robots.txt</code> মেনে চলা (এবং সেটিও ক্যাশ করা)।</li>
        <li>সঠিক <code>User-Agent</code> ও যোগাযোগের ঠিকানা দেওয়া।</li>
        <li><code>Crawl-delay</code> সম্মান করা; সার্ভার 429/503 দিলে গতি কমানো।</li>
        <li><strong>Crawler trap এড়ানো:</strong> ক্যালেন্ডার পেজের মতো অসীম গভীর লিংক — তাই depth সীমা ও প্রতি-ডোমেইন URL সীমা রাখুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>JavaScript-নির্ভর সাইট (SPA) কীভাবে ক্রল করবেন?</li>
        <li>কোন পেজ কত ঘন ঘন পুনরায় ক্রল করবেন — কীভাবে ঠিক করবেন?</li>
        <li>ক্রলার ক্র্যাশ করলে কাজ কোথা থেকে শুরু হবে?</li>
      </ul>
    `
  },
  {
    id: "sd-35",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Metrics Logging","Prometheus"],
    question: "Design a Metrics Logging and Monitoring System (e.g., Prometheus & Grafana) — Time Series DB and Pull vs Push Model কী?",
    answer: `
      <h4>Pull বনাম Push</h4>
      <table>
        <tr><th>দিক</th><th>Pull (Prometheus)</th><th>Push (StatsD, InfluxDB)</th></tr>
        <tr><td>কে উদ্যোগ নেয়</td><td>সার্ভার সার্ভিসের <code>/metrics</code> থেকে টেনে আনে</td><td>সার্ভিস নিজে পাঠায়</td></tr>
        <tr><td>সার্ভিস বেঁচে আছে কি না</td><td><strong>স্বয়ংক্রিয়ভাবে জানা যায়</strong> (scrape ব্যর্থ = ডাউন)</td><td>আলাদা health check লাগে</td></tr>
        <tr><td>Service discovery</td><td>দরকার (k8s, Consul)</td><td>লাগে না</td></tr>
        <tr><td>স্বল্পস্থায়ী জব</td><td>কঠিন (scrape-এর আগেই শেষ)</td><td>স্বাভাবিক</td></tr>
        <tr><td>ফায়ারওয়াল</td><td>মনিটরিং সার্ভারের অ্যাক্সেস লাগে</td><td>শুধু বাইরের দিকে কানেকশন</td></tr>
      </table>
      <p>Prometheus pull বেছে নিয়েছে কারণ এতে <strong>"সার্ভিসটি সাড়া দিচ্ছে কি না"</strong> মেট্রিক বিনামূল্যে পাওয়া যায়, এবং কোনো সার্ভিস পাগল হয়ে গেলে মনিটরিং সিস্টেমকে ডুবিয়ে দিতে পারে না। স্বল্পস্থায়ী ব্যাচ জবের জন্য <strong>Pushgateway</strong> ব্যবহার করা হয়।</p>
      <h4>Time-Series Database কেন বিশেষ</h4>
      <p>মেট্রিক ডেটার একটি অনন্য বৈশিষ্ট্য আছে — মান ধীরে ধীরে বদলায় এবং টাইমস্ট্যাম্প নিয়মিত ব্যবধানে আসে। TSDB এই সুবিধা নিয়ে বিশাল কম্প্রেশন করে:</p>
      <ul>
        <li><strong>Delta-of-delta encoding:</strong> টাইমস্ট্যাম্প ১০s ব্যবধানে এলে প্রতিবার পুরো টাইমস্ট্যাম্প নয়, শুধু পার্থক্যের পার্থক্য (প্রায়ই ০) সংরক্ষণ হয়।</li>
        <li><strong>XOR compression:</strong> পরপর দুটি float প্রায় একই হলে XOR করলে বেশিরভাগ বিট শূন্য হয়।</li>
        <li>ফলে প্রতি ডেটাপয়েন্ট গড়ে <strong>~১.৩ বাইট</strong>-এ নেমে আসে (কাঁচা অবস্থায় ১৬ বাইট)।</li>
      </ul>
      <h4>Cardinality — সবচেয়ে বড় ফাঁদ</h4>
      <p>Prometheus-এ প্রতিটি লেবেল কম্বিনেশন একটি <strong>আলাদা টাইম সিরিজ</strong>। <code>user_id</code>-কে লেবেল বানালে ১০ লাখ ইউজারে ১০ লাখ সিরিজ তৈরি হবে — মেমরি শেষ হয়ে Prometheus ক্র্যাশ করবে। একে বলে <strong>cardinality explosion</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ বিপর্যয়: অসীম cardinality
httpDuration.labels(req.userId, req.path).observe(ms);
//                  ^^^^^^^^^^  ^^^^^^^^ /users/123, /users/124 ...

// ✅ সঠিক: সীমিত, পূর্বানুমেয় লেবেল
httpDuration.labels(req.route.path, req.method, String(res.statusCode)).observe(ms);
//                  '/users/:id'  — টেমপ্লেট, আসল মান নয়</code></pre>
      </div>
      <p>উচ্চ-cardinality তথ্য (userId, traceId) মেট্রিকে নয় — <strong>লগ বা ট্রেসে</strong> রাখুন। এটিই তিন স্তম্ভের মধ্যে শ্রমবিভাজনের মূল কারণ।</p>
      <h4>দীর্ঘমেয়াদি সংরক্ষণ</h4>
      <p>Prometheus স্থানীয় স্টোরেজ স্বল্পমেয়াদি (সাধারণত ১৫ দিন)। বছরের ডেটা রাখতে Thanos বা Cortex ব্যবহার করে অবজেক্ট স্টোরেজে পাঠানো হয়, সঙ্গে <strong>downsampling</strong> — পুরনো ডেটার রেজোলিউশন কমিয়ে জায়গা বাঁচানো।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>কোন জিনিসে alert দেবেন — cause না symptom? কেন?</li>
        <li>Counter, Gauge, Histogram, Summary — পার্থক্য কী?</li>
        <li>Histogram থেকে p99 কীভাবে বের হয় এবং সেটি কতটা নির্ভুল?</li>
      </ul>
    `
  },
  {
    id: "sd-36",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Distributed Key-Value Store","Cassandra"],
    question: "Design a Distributed Key-Value Store (e.g., DynamoDB / Cassandra) — Consistent Hashing, Vector Clocks, Gossip Protocol এবং Hinted Handoff কী?",
    answer: `
      <h4>স্থাপত্যগত ভিত্তি: leaderless</h4>
      <p>DynamoDB/Cassandra-র মতো স্টোরে কোনো একক মাস্টার নেই — <strong>যেকোনো নোড যেকোনো রিকোয়েস্ট নিতে পারে</strong>। এতে single point of failure দূর হয় এবং লেখার availability সর্বোচ্চ হয়, বিনিময়ে consistency শিথিল হয়।</p>
      <h4>১. Consistent Hashing — ডেটা কোথায় থাকবে</h4>
      <p>সাধারণ <code>hash(key) % N</code>-এর সমস্যা হলো একটি নোড যোগ/বাদ দিলে <em>প্রায় সব</em> কী পুনর্বণ্টিত হয়। Consistent hashing নোড ও কী উভয়কে একটি বৃত্তে বসায়; কী তার ঘড়ির কাঁটার দিকের প্রথম নোডে যায়। নোড যোগ হলে কেবল <strong>তার প্রতিবেশীর অংশটুকু</strong> সরে — গড়ে K/N কী।</p>
      <p><strong>Virtual nodes:</strong> প্রতিটি ফিজিক্যাল নোডকে বৃত্তে বহুবার (যেমন ২৫৬ বার) বসানো হয়, যাতে লোড সমানভাবে ছড়ায় এবং নোড বাদ পড়লে তার ভার সবার মধ্যে ভাগ হয়ে যায়।</p>
      <h4>২. Quorum — N, W, R</h4>
      <pre class="mermaid">
flowchart LR
    C["Client WRITE"] --> N1["Node 1 ✓"]
    C --> N2["Node 2 ✓"]
    C --> N3["Node 3 ⏳"]
    N1 --> OK["W=2 পূর্ণ<br/>→ সফল বলা হলো"]
    N2 --> OK
      </pre>
      <span class="diagram-caption">সব রেপ্লিকার অপেক্ষা না করে quorum পূর্ণ হলেই উত্তর</span>
      <ul>
        <li><strong>N</strong> = রেপ্লিকা সংখ্যা, <strong>W</strong> = লেখা সফল বলার জন্য কতটি ack লাগবে, <strong>R</strong> = পড়ার সময় কতটি নোড থেকে পড়বে।</li>
        <li><strong>W + R &gt; N</strong> হলে read ও write সেট অন্তত একটি নোডে মিলবেই → সর্বশেষ মান পাওয়া নিশ্চিত (strong consistency)।</li>
        <li>উদাহরণ: N=3, W=2, R=2 → ভারসাম্যপূর্ণ। W=1, R=1 → দ্রুততম কিন্তু stale read সম্ভব।</li>
      </ul>
      <h4>৩. Gossip Protocol — নোডেরা একে অপরকে কীভাবে চেনে</h4>
      <p>কেন্দ্রীয় রেজিস্ট্রি রাখলে সেটিই SPOF। বদলে প্রতিটি নোড প্রতি সেকেন্ডে কয়েকটি র‍্যান্ডম নোডের সাথে অবস্থা বিনিময় করে। তথ্য মহামারীর মতো ছড়ায় — O(log N) রাউন্ডে সবাই জেনে যায়। কোনো নোড ডাউন হলে অল্প সময়ের মধ্যেই পুরো ক্লাস্টার তা জানতে পারে।</p>
      <h4>৪. ব্যর্থতা সামলানো</h4>
      <ul>
        <li><strong>Hinted Handoff:</strong> লক্ষ্য নোড ডাউন থাকলে অন্য নোড ডেটা সাময়িকভাবে "hint" হিসেবে রাখে; নোড ফিরে এলে পৌঁছে দেয়। এতে নোড ডাউন থাকলেও write গ্রহণ করা যায়।</li>
        <li><strong>Read Repair:</strong> পড়ার সময় রেপ্লিকাগুলোর মধ্যে অমিল ধরা পড়লে পুরনো রেপ্লিকা সাথে সাথে আপডেট করে দেওয়া হয়।</li>
        <li><strong>Merkle Tree:</strong> দুটি রেপ্লিকার মধ্যে <em>কোন অংশে</em> পার্থক্য তা দ্রুত বের করতে হ্যাশ-ট্রি তুলনা করা হয় — পুরো ডেটাসেট তুলনা না করেই।</li>
      </ul>
      <h4>৫. Conflict Resolution</h4>
      <ul>
        <li><strong>Last-Write-Wins (LWW):</strong> সহজ, কিন্তু ঘড়ির অসামঞ্জস্যে <strong>নীরবে ডেটা হারায়</strong>।</li>
        <li><strong>Vector Clock:</strong> কোন আপডেট কোনটির পরে ঘটেছে তা কার্যকারণসহ ধরে রাখে; সত্যিকারের সমান্তরাল দ্বন্দ্ব হলে দুটি ভার্সনই রেখে অ্যাপ্লিকেশনকে মেলাতে দেয় (Amazon-এর শপিং কার্টের মতো)।</li>
        <li><strong>CRDT:</strong> এমন ডেটা স্ট্রাকচার যা গাণিতিকভাবেই দ্বন্দ্বমুক্তভাবে মিলে যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Vector clock-এর আকার বাড়তে থাকলে কী করবেন?</li>
        <li>এই ডিজাইনে ট্রানজেকশন সম্ভব কি?</li>
        <li>Cassandra-তে partition key ভুল বাছলে কী হয় (hot partition)?</li>
      </ul>
    `
  },
  {
    id: "sd-38",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Distributed Unique ID","Snowflake"],
    question: "Design a Distributed Unique ID Generator (e.g., Twitter Snowflake Algorithm) — 64-bit ID Structure কীভাবে কাজ করে?",
    answer: `
      <h4>কেন দরকার</h4>
      <p>ডিস্ট্রিবিউটেড সিস্টেমে auto-increment ID কাজ করে না — একাধিক DB নোড একই সংখ্যা তৈরি করবে। আবার UUID (128-bit) বড়, র‍্যান্ডম এবং <strong>sortable নয়</strong>, যা B-Tree ইনডেক্সে খারাপ (প্রতিটি insert র‍্যান্ডম জায়গায় গিয়ে page split ঘটায়)।</p>
      <p><strong>Snowflake</strong> এই দুটি সমস্যাই সমাধান করে: ৬৪-বিট, সমন্বয়হীনভাবে (কোনো লক ছাড়া) তৈরি, এবং <strong>সময়ক্রমে সাজানো</strong>।</p>
      <h4>৬৪-বিট গঠন</h4>
      <pre class="mermaid">
flowchart LR
    A["1 bit<br/>unused<br/>(sign)"] --- B["41 bits<br/>timestamp (ms)<br/>~৬৯ বছর"]
    B --- C["10 bits<br/>machine id<br/>১০২৪ নোড"]
    C --- D["12 bits<br/>sequence<br/>৪০৯৬/ms"]
      </pre>
      <span class="diagram-caption">উপরের বিট সময়, তাই সংখ্যাগত ক্রম = সময়ক্রম</span>
      <ul>
        <li><strong>১ bit:</strong> অব্যবহৃত — signed integer-এ ঋণাত্মক না হওয়া নিশ্চিত করে।</li>
        <li><strong>৪১ bits timestamp:</strong> কাস্টম epoch থেকে মিলিসেকেন্ড। 2<sup>41</sup> ms ≈ <strong>৬৯ বছর</strong>।</li>
        <li><strong>১০ bits machine id:</strong> ১০২৪টি নোড (৫ bit datacenter + ৫ bit worker হিসেবেও ভাগ করা হয়)।</li>
        <li><strong>১২ bits sequence:</strong> একই মিলিসেকেন্ডে প্রতি নোডে <strong>৪০৯৬</strong>টি ID। অর্থাৎ প্রতি নোডে সেকেন্ডে ৪০ লাখ।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const EPOCH = 1704067200000n;   // কাস্টম শুরু (২০২৪-০১-০১)
let lastMs = -1n, seq = 0n;

function nextId(machineId) {
  let now = BigInt(Date.now());

  if (now === lastMs) {
    seq = (seq + 1n) & 4095n;             // ১২ bit
    if (seq === 0n) {                      // এই ms-এ কোটা শেষ
      while (BigInt(Date.now()) <= lastMs) {}   // পরের ms-এর জন্য অপেক্ষা
      now = BigInt(Date.now());
    }
  } else if (now < lastMs) {
    // ⚠️ ঘড়ি পিছিয়ে গেছে (NTP sync) — ডুপ্লিকেট ID তৈরি হতে পারে
    throw new Error('Clock moved backwards; refusing to generate id');
  } else {
    seq = 0n;
  }
  lastMs = now;

  return ((now - EPOCH) << 22n) | (BigInt(machineId) << 12n) | seq;
}</code></pre>
      </div>
      <h4>বাস্তব সমস্যা ও সমাধান</h4>
      <ul>
        <li><strong>Clock skew:</strong> NTP ঘড়ি পিছিয়ে দিলে ডুপ্লিকেট ID হতে পারে। তাই হয় এরর থ্রো করুন, নয়তো ঘড়ি ধরে ফেলা পর্যন্ত অপেক্ষা করুন। NTP-তে <em>slew</em> মোড ব্যবহার করুন, <em>step</em> নয়।</li>
        <li><strong>Machine ID বরাদ্দ:</strong> ZooKeeper/etcd থেকে নিন বা k8s StatefulSet-এর ordinal ব্যবহার করুন। দুটি নোডে একই ID পড়লে সংঘর্ষ হবে।</li>
        <li><strong>JavaScript-এ সতর্কতা:</strong> ৬৪-bit সংখ্যা <code>Number</code>-এ ধরে না (নিরাপদ সীমা 2<sup>53</sup>)। তাই <code>BigInt</code> ব্যবহার করুন এবং JSON-এ <strong>string হিসেবে</strong> পাঠান — নাহলে ফ্রন্টএন্ডে নীরবে ভুল মান চলে যাবে।</li>
        <li><strong>নিরাপত্তা:</strong> ID অনুমানযোগ্য ও ক্রমিক — এতে ব্যবসায়িক তথ্য ফাঁস হয় (প্রতিদিন কত অর্ডার)। পাবলিক URL-এ আলাদা অস্বচ্ছ slug ব্যবহার করুন।</li>
      </ul>
      <h4>বিকল্প</h4>
      <p><strong>UUIDv7</strong> (২০২৪-এ প্রমিত) একই সুবিধা দেয় — সময়ক্রমে সাজানো ও র‍্যান্ডম — কিন্তু machine ID সমন্বয়ের ঝামেলা ছাড়াই। নতুন সিস্টেমে এটি প্রায়ই সহজ পছন্দ। <strong>ULID</strong>-ও একই ধারণা।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>৬৯ বছর পর কী হবে?</li>
        <li>ID থেকে কি পোস্টের সময় বের করা যায় — এটি কি সমস্যা?</li>
        <li>একটি নোডে সেকেন্ডে ৪০ লাখের বেশি দরকার হলে কী করবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-40",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","E-commerce","Inventory Lock"],
    question: "Design an Flash Sale / High Concurrency Inventory Management System — Race Condition & Overselling কীভাবে আটকাবেন?",
    answer: `
      <h4>১. সমস্যা</h4>
      <p>ফ্ল্যাশ সেলে ১০০টি পণ্যের জন্য এক সেকেন্ডে ১ লাখ রিকোয়েস্ট আসে। দুটি বিপদ: (ক) <strong>Overselling</strong> — race condition-এ ১০০টির বেশি বিক্রি হয়ে যাওয়া, (খ) <strong>ডাটাবেজ ধস</strong> — লক কনটেনশনে DB অচল হয়ে যাওয়া।</p>
      <h4>২. কেন সরল সমাধানগুলো ব্যর্থ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ভুল — চিরায়ত race condition
const p = await db.query('SELECT stock FROM products WHERE id = ?', [id]);
if (p.stock > 0) {                     // ১০০০ রিকোয়েস্ট একসাথে এখানে "১" দেখে
  await db.query('UPDATE products SET stock = stock - 1 WHERE id = ?', [id]);
}                                       // → স্টক ঋণাত্মক হয়ে যায়

// ⚠️ ঠিক, কিন্তু স্কেল করে না — প্রতিটি রিকোয়েস্ট সারিতে দাঁড়ায়
await db.query(
  'UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0', [id]
);  // অ্যাটমিক ও নিরাপদ, কিন্তু একই সারিতে ১ লাখ লক = DB অচল</code></pre>
      </div>
      <p>দ্বিতীয়টি <em>সঠিক</em> — <code>AND stock > 0</code> শর্তসহ একক UPDATE অ্যাটমিক, তাই overselling হবে না। সমস্যা কেবল <strong>থ্রুপুট</strong>: সব রিকোয়েস্ট একই সারির উপর row lock-এর জন্য অপেক্ষা করে।</p>
      <h4>৩. সমাধান: Redis-এ স্টক, DB-তে সত্য</h4>
      <pre class="mermaid">
flowchart TD
    U["১ লাখ রিকোয়েস্ট"] --> RL["Rate limit + bot ফিল্টার"]
    RL --> R{"Redis Lua<br/>DECR stock"}
    R -->|"stock < 0"| F["❌ 'Sold out'<br/>দ্রুত reject — DB ছোঁয়াই হলো না"]
    R -->|"সফল"| MQ["অর্ডার কিউতে"]
    MQ --> W["Worker<br/>নিয়ন্ত্রিত গতিতে"]
    W --> DB[("Database<br/>অর্ডার তৈরি + স্টক কমানো")]
    W --> P["Payment (TTL সহ)"]
    P -.->|"টাইমআউট/ব্যর্থ"| RB["Redis-এ স্টক ফেরত"]
      </pre>
      <span class="diagram-caption">Redis একটি গেট হিসেবে কাজ করে — ৯৯.৯% ট্রাফিক DB পর্যন্ত পৌঁছায়ই না</span>
      <div class="code-box">
        <div class="code-header"><span>lua</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- অ্যাটমিক স্টক কর্তন; ঋণাত্মক হতে দেয় না
local stock = tonumber(redis.call('GET', KEYS[1]))
if not stock or stock <= 0 then
  return -1                                  -- সোল্ড আউট
end
-- একই ইউজার একাধিকবার কিনছে কি না (SADD ০ দিলে আগেই ছিল)
if redis.call('SADD', KEYS[2], ARGV[1]) == 0 then
  return -2                                  -- ডুপ্লিকেট ক্রয়
end
redis.call('DECR', KEYS[1])
return 1</code></pre>
      </div>
      <h4>৪. কেন এটি নিরাপদ</h4>
      <ul>
        <li>Redis একক-থ্রেডেড এবং Lua স্ক্রিপ্ট অ্যাটমিক — দুটি রিকোয়েস্ট কখনও একই স্টক ইউনিট পাবে না।</li>
        <li>স্টক শেষ হওয়ামাত্র বাকি ৯৯,৯০০ রিকোয়েস্ট সাথে সাথে reject হয় — DB সম্পূর্ণ সুরক্ষিত থাকে।</li>
        <li>DB-তে <code>UPDATE ... WHERE stock > 0</code> শর্ত <strong>রাখতেই হবে</strong> — Redis ও DB-র মধ্যে অসঙ্গতি হলে এটিই শেষ রক্ষাকবচ।</li>
      </ul>
      <h4>৫. ব্যর্থতার পরিস্থিতি</h4>
      <ul>
        <li><strong>Redis ক্র্যাশ:</strong> স্টক কাউন্টার হারালে অতিরিক্ত বিক্রি হতে পারে। AOF persistence + replica রাখুন এবং DB-র শর্তসাপেক্ষ UPDATE-কে চূড়ান্ত কর্তৃপক্ষ হিসেবে ব্যবহার করুন।</li>
        <li><strong>পেমেন্ট অসম্পূর্ণ:</strong> স্টক সংরক্ষণে TTL (যেমন ১০ মিনিট) দিন; সময় পেরোলে স্টক স্বয়ংক্রিয়ভাবে ফেরত যাবে।</li>
        <li><strong>বট:</strong> সেলের আগে ওয়েটিং রুম/কিউ পেজ, ক্যাপচা, অ্যাকাউন্টের বয়স যাচাই — নাহলে আসল ক্রেতা সুযোগ পাবেন না।</li>
        <li><strong>Hot key:</strong> একটি পণ্যের কী একটি Redis শার্ডে পড়ে। প্রয়োজনে স্টককে N ভাগে ভাগ করুন (<code>stock:123:{0..9}</code>) এবং র‍্যান্ডম বাকেটে হিট করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ইউজারকে কী দেখাবেন — সাথে সাথে "সোল্ড আউট" না "প্রসেসিং"?</li>
        <li>অর্ডার বাতিল হলে স্টক ফেরানোর সময় race condition কীভাবে এড়াবেন?</li>
        <li>Redis-এর স্টক ও DB-র স্টক মিলছে না — কীভাবে ধরবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-41",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Ride Sharing","Uber"],
    question: "Design a Location-based Service (e.g., Uber / Grab) — QuadTree vs Spatial Indexing এবং Real-time Driver Matching কী?",
    answer: `
      <h4>মূল সমস্যা</h4>
      <p>"আমার ৫ কিমি-র মধ্যে সব ড্রাইভার দেখাও" — সাধারণ SQL-এ এটি করতে হলে প্রতিটি ড্রাইভারের সাথে দূরত্ব হিসাব করতে হয় (full scan), যা লক্ষ ড্রাইভারে অসম্ভব। দরকার <strong>spatial index</strong>।</p>
      <p>তার উপর ড্রাইভাররা প্রতি ৪ সেকেন্ডে লোকেশন আপডেট পাঠায় — অর্থাৎ এটি একটি অত্যন্ত <strong>write-heavy</strong> সিস্টেম।</p>
      <h4>Spatial Indexing কৌশল</h4>
      <table>
        <tr><th>পদ্ধতি</th><th>ধারণা</th><th>সুবিধা / অসুবিধা</th></tr>
        <tr><td><strong>Geohash</strong></td><td>মানচিত্রকে গ্রিডে ভাগ করে প্রতিটি ঘরকে স্ট্রিং কোড</td><td>সহজ, স্ট্রিং prefix দিয়ে খোঁজা যায়; কিন্তু সীমানার দুই পাশে কাছাকাছি দুটি বিন্দুর কোড সম্পূর্ণ আলাদা হতে পারে</td></tr>
        <tr><td><strong>QuadTree</strong></td><td>ঘনত্ব অনুযায়ী প্রতিটি বর্গকে ৪ ভাগে ভাগ করা</td><td>ঘন এলাকায় (শহর) গভীর, ফাঁকা এলাকায় অগভীর — মানানসই; কিন্তু ইন-মেমোরি ট্রি, ডিস্ট্রিবিউট করা কঠিন</td></tr>
        <tr><td><strong>H3 / S2</strong></td><td>Uber-এর H3 ষড়ভুজ, Google-এর S2 গোলকীয় কোষ</td><td>ষড়ভুজে সব প্রতিবেশীর দূরত্ব সমান — ম্যাচিংয়ে সুবিধা; আজকের স্ট্যান্ডার্ড</td></tr>
      </table>
      <p><strong>ষড়ভুজ কেন ভালো:</strong> বর্গক্ষেত্রে প্রতিবেশী ৮টি, এবং কোণাকুণি প্রতিবেশীর দূরত্ব পাশের চেয়ে বেশি (√2 গুণ)। ষড়ভুজে ৬টি প্রতিবেশী, সবার কেন্দ্র সমদূরত্বে — দূরত্বভিত্তিক হিসাব অনেক সুসংগত হয়।</p>
      <h4>আর্কিটেকচার</h4>
      <pre class="mermaid">
flowchart TD
    D["🚗 Drivers<br/>প্রতি ৪s লোকেশন"] -->|WebSocket| LS["Location Service"]
    LS --> R[("Redis GEO<br/>বর্তমান অবস্থান")]
    LS -.->|async| K["Kafka → স্টোরেজ<br/>(ইতিহাস, অ্যানালিটিক্স)"]
    U["👤 Rider<br/>রাইড চায়"] --> M["Matching Service"]
    M -->|GEOSEARCH| R
    R --> M
    M --> RANK["র‍্যাঙ্কিং: দূরত্ব + ETA<br/>+ রেটিং + গন্তব্যের দিক"]
    RANK --> OFFER["ড্রাইভারকে অফার<br/>(টাইমআউটসহ)"]
      </pre>
      <span class="diagram-caption">লাইভ অবস্থান Redis-এ (দ্রুত, ক্ষণস্থায়ী); ইতিহাস আলাদা পথে</span>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Redis-এর বিল্ট-ইন geospatial (ভেতরে sorted set + geohash score)
await redis.geoadd('drivers:available', lng, lat, driverId);

// ৫ কিমি-র মধ্যে নিকটতম ১০ জন, দূরত্বসহ
const nearby = await redis.geosearch(
  'drivers:available',
  'FROMLONLAT', riderLng, riderLat,
  'BYRADIUS', 5, 'km',
  'ASC', 'COUNT', 10, 'WITHDIST'
);

// ⚠️ ড্রাইভার অফলাইন হলে সরিয়ে দিন, নাহলে "ভূত ড্রাইভার" দেখাবে
await redis.zrem('drivers:available', driverId);</code></pre>
      </div>
      <h4>প্রোডাকশন বিবেচনা</h4>
      <ul>
        <li><strong>লোকেশন আপডেট DB-তে লিখবেন না:</strong> ১ লাখ ড্রাইভার × প্রতি ৪s = ২৫,০০০ write/s। Redis-এ রাখুন; ইতিহাস দরকার হলে Kafka হয়ে আলাদা স্টোরে।</li>
        <li><strong>ম্যাচিং ≠ শুধু নিকটতম:</strong> ETA (রাস্তার দূরত্ব, সরলরেখা নয়), ড্রাইভারের গন্তব্যের দিক, রেটিং ও অপেক্ষার সময় — সব মিলিয়ে স্কোর।</li>
        <li><strong>Double-booking ঠেকানো:</strong> ড্রাইভারকে অফার পাঠানোর সময় Redis-এ TTL সহ লক নিন, যাতে দুই রাইডার একই ড্রাইভার না পান।</li>
        <li><strong>Hot partition:</strong> বিমানবন্দর বা কনসার্টের কাছে সব ড্রাইভার একটি সেলে পড়ে যায়। খুব ঘন এলাকায় সেল আরও ছোট করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>সরলরেখার দূরত্ব বনাম আসল রাস্তার ETA — পার্থক্য কীভাবে সামলাবেন?</li>
        <li>ড্রাইভার অফার গ্রহণ না করলে কী হবে?</li>
        <li>Surge pricing কীভাবে গণনা করবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-43",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Distributed Storage","S3"],
    question: "Design an Object Storage System (e.g., AWS S3 / MinIO) — Metadata Store vs Block Store Architecture কী?",
    answer: `
      <h4>মূল ধারণা: metadata আর data আলাদা</h4>
      <p>অবজেক্ট স্টোরেজে ফাইলের <em>বিষয়বস্তু</em> এবং তার <em>তথ্য</em> সম্পূর্ণ আলাদা সিস্টেমে থাকে — কারণ দুটির অ্যাক্সেস প্যাটার্ন ভিন্ন।</p>
      <pre class="mermaid">
flowchart TD
    C["Client"] --> API["API Gateway<br/>auth, signature যাচাই"]
    API --> MS[("Metadata Store<br/>key, size, etag, ACL<br/>→ শার্ডেড DB")]
    API --> DS["Data Service"]
    DS --> B1[("Storage Node 1")]
    DS --> B2[("Storage Node 2")]
    DS --> B3[("Storage Node 3")]
    MS -.->|"object key →<br/>কোন নোডে আছে"| DS
      </pre>
      <span class="diagram-caption">Metadata ছোট ও ঘন ঘন কুয়েরি হয়; data বিশাল ও কালেভদ্রে পড়া হয়</span>
      <h4>১. কেন আলাদা</h4>
      <ul>
        <li><strong>Metadata:</strong> ছোট (কয়েকশো বাইট), কিন্তু "এই bucket-এ কী কী আছে" ধরনের কুয়েরি দরকার। শার্ডেড রিলেশনাল/NoSQL DB উপযুক্ত।</li>
        <li><strong>Data:</strong> বিশাল (GB), কিন্তু কুয়েরি লাগে না — শুধু key দিয়ে পড়া/লেখা। সস্তা ডিস্কে append-only ফাইল হিসেবে রাখা যায়।</li>
        <li>আলাদা রাখলে দুটি স্বাধীনভাবে স্কেল করে এবং metadata DB ছোট ও দ্রুত থাকে।</li>
      </ul>
      <h4>২. Durability: Replication বনাম Erasure Coding</h4>
      <table>
        <tr><th>দিক</th><th>3× Replication</th><th>Erasure Coding (যেমন ৬+৩)</th></tr>
        <tr><td>স্টোরেজ খরচ</td><td>৩০০%</td><td><strong>১৫০%</strong></td></tr>
        <tr><td>কতটি ব্যর্থতা সহনীয়</td><td>২টি</td><td>৩টি</td></tr>
        <tr><td>পড়ার গতি</td><td>দ্রুত (সরাসরি কপি)</td><td>ধীর (পুনর্গঠন লাগতে পারে)</td></tr>
        <tr><td>CPU</td><td>নগণ্য</td><td>বেশি (এনকোড/ডিকোড)</td></tr>
      </table>
      <p><strong>Erasure coding-এর ধারণা:</strong> ডেটাকে ৬ খণ্ডে ভেঙে ৩টি parity খণ্ড তৈরি করা হয়। মোট ৯টির <em>যেকোনো ৬টি</em> থাকলেই মূল ডেটা ফিরে পাওয়া যায়। তাই কম জায়গায় বেশি নিরাপত্তা। বাস্তবে গরম ডেটায় replication, ঠান্ডা ডেটায় erasure coding ব্যবহার হয়।</p>
      <h4>৩. Consistency মডেল</h4>
      <p>S3 আগে eventual consistency দিত (নতুন অবজেক্ট লেখার পরপরই পড়লে না-ও পাওয়া যেতে পারত)। ২০২০ সাল থেকে S3 <strong>strong read-after-write consistency</strong> দেয়। তবে <em>একই কী-তে</em> সমান্তরাল লেখায় শেষ কোনটি জিতবে তার নিশ্চয়তা নেই — তাই অবজেক্ট স্টোরেজকে ডাটাবেজের মতো ব্যবহার করবেন না।</p>
      <h4>৪. অন্যান্য গুরুত্বপূর্ণ দিক</h4>
      <ul>
        <li><strong>Multipart upload:</strong> বড় ফাইল খণ্ডে খণ্ডে ও সমান্তরালে আপলোড; একটি খণ্ড ব্যর্থ হলে শুধু সেটিই আবার পাঠাতে হয়।</li>
        <li><strong>ETag/checksum:</strong> আপলোডের অখণ্ডতা যাচাই এবং ক্যাশিংয়ের জন্য।</li>
        <li><strong>Storage tiering ও lifecycle:</strong> ৩০ দিন পর সস্তা tier-এ, ১ বছর পর আর্কাইভে — খরচ নাটকীয়ভাবে কমায়।</li>
        <li><strong>Presigned URL:</strong> ক্লায়েন্ট সরাসরি আপলোড/ডাউনলোড করে, আপনার সার্ভার দিয়ে বাইট প্রবাহিত হয় না।</li>
        <li><strong>Background scrubbing:</strong> নীরব ডিস্ক করাপশন (bit rot) ধরতে পর্যায়ক্রমে checksum যাচাই করা হয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি স্টোরেজ নোড চিরতরে হারালে ডেটা কীভাবে পুনর্গঠিত হয়?</li>
        <li>Metadata store নিজেই বিশাল হয়ে গেলে কীভাবে শার্ড করবেন?</li>
        <li>Versioning কীভাবে বাস্তবায়ন করবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-46",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Payment Gateway","Idempotency"],
    question: "Design an Payment Gateway Integration — Idempotency Key, Webhook Security এবং Double Charge Prevention কীভাবে করবেন?",
    answer: `
      <h4>মূল নীতি</h4>
      <p>পেমেন্ট সিস্টেমে সবচেয়ে বড় ভয় দুটি — <strong>ডাবল চার্জ</strong> এবং <strong>টাকা কেটেছে কিন্তু অর্ডার হয়নি</strong>। নেটওয়ার্ক অনির্ভরযোগ্য, তাই ক্লায়েন্ট রিট্রাই করবেই; ডিজাইনকে সেটির জন্য প্রস্তুত থাকতে হবে।</p>
      <pre class="mermaid">
sequenceDiagram
    participant C as Client
    participant A as Our API
    participant P as Payment Provider
    C->>A: POST /pay (Idempotency-Key: uuid)
    A->>A: কী আগে দেখেছি?
    alt আগেই প্রসেসড
        A-->>C: আগের ফলাফল (নতুন চার্জ নয়)
    else নতুন
        A->>A: payment রেকর্ড = PENDING
        A->>P: charge (একই idempotency key)
        P-->>A: 200 / timeout
        A-->>C: PENDING / result
    end
    P->>A: Webhook: payment_succeeded (signed)
    A->>A: signature যাচাই → PENDING থেকে SUCCESS
    A->>A: অর্ডার confirm করে ইভেন্ট পাবলিশ
      </pre>
      <span class="diagram-caption">Webhook-ই চূড়ান্ত সত্য; HTTP রেসপন্স কেবল ইঙ্গিত</span>
      <h4>১. Idempotency Key</h4>
      <p>ক্লায়েন্ট প্রতিটি পেমেন্ট <em>প্রচেষ্টার</em> জন্য একটি UUID তৈরি করে পাঠায় (রিট্রাইয়ে একই কী)। সার্ভারে সেই কী-তে <strong>unique constraint</strong> রাখুন — এটিই আসল সুরক্ষা, কারণ অ্যাপ্লিকেশন-স্তরের চেক race condition-এ ব্যর্থ হতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE TABLE payments (
  id                UUID PRIMARY KEY,
  idempotency_key   VARCHAR(64) NOT NULL,
  user_id           BIGINT      NOT NULL,
  amount_cents      BIGINT      NOT NULL,   -- কখনও float নয়
  currency          CHAR(3)     NOT NULL,
  status            VARCHAR(20) NOT NULL,   -- PENDING/SUCCESS/FAILED
  provider_ref      VARCHAR(80),
  created_at        TIMESTAMP   DEFAULT NOW(),
  CONSTRAINT uq_idem UNIQUE (user_id, idempotency_key)  -- ডাবল চার্জের চূড়ান্ত বাধা
);</code></pre>
      </div>
      <p><strong>টাকার হিসাব কখনও float-এ নয়</strong> — <code>0.1 + 0.2 !== 0.3</code>। integer (পয়সা/সেন্ট) বা <code>DECIMAL</code> ব্যবহার করুন।</p>
      <h4>২. Webhook নিরাপত্তা</h4>
      <ul>
        <li><strong>Signature যাচাই বাধ্যতামূলক:</strong> HMAC-SHA256 দিয়ে raw body যাচাই করুন। না করলে যে কেউ "পেমেন্ট সফল" পাঠিয়ে বিনামূল্যে পণ্য নিয়ে যাবে।</li>
        <li><strong>Timestamp যাচাই:</strong> ৫ মিনিটের পুরনো webhook বাতিল করুন — replay attack ঠেকাতে।</li>
        <li><strong>Idempotent হ্যান্ডলার:</strong> প্রোভাইডার একই ইভেন্ট একাধিকবার পাঠায়। <code>event_id</code> সংরক্ষণ করে ডুপ্লিকেট উপেক্ষা করুন।</li>
        <li><strong>দ্রুত 200 দিন:</strong> ভারী কাজ কিউতে পাঠান; ধীর হলে প্রোভাইডার টাইমআউট ধরে রিট্রাই করতে থাকবে।</li>
      </ul>
      <h4>৩. অসঙ্গতি ধরার ব্যবস্থা</h4>
      <p>Webhook হারিয়ে যেতে পারে। তাই <strong>Reconciliation job</strong> রাখুন — প্রতি ঘণ্টায় PENDING পেমেন্টগুলো প্রোভাইডারের API-তে যাচাই করে অবস্থা মিলিয়ে নিন। এটি ছাড়া কিছু অর্ডার চিরকাল PENDING-এ আটকে থাকবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ব্যবহারকারীর কার্ড কেটেছে কিন্তু আপনার DB লেখা ব্যর্থ — কী করবেন?</li>
        <li>রিফান্ড ও আংশিক রিফান্ড কীভাবে মডেল করবেন?</li>
        <li>PCI-DSS মানতে কার্ড ডেটা কোথায় রাখবেন (উত্তর: নিজে রাখবেন না)?</li>
      </ul>
    `
  },
  {
    id: "sd-47",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Distributed File System","HDFS"],
    question: "Design a Distributed File System (e.g., HDFS / GFS) — NameNode vs DataNode Architecture কী?",
    answer: `
      <h4>মূল স্থাপত্য</h4>
      <p>HDFS/GFS একটি <strong>single-master</strong> ডিজাইন — একটি NameNode পুরো ফাইল সিস্টেমের কাঠামো জানে, আর বহু DataNode আসল বাইট রাখে। ডিজাইনটি "বিশাল ফাইল, একবার লেখা, বারবার পড়া" (write-once, read-many) ধরনের কাজের জন্য অপ্টিমাইজ করা।</p>
      <pre class="mermaid">
sequenceDiagram
    participant C as Client
    participant N as NameNode
    participant D1 as DataNode 1
    participant D2 as DataNode 2
    C->>N: read /logs/2026.txt
    N-->>C: block তালিকা + কোন DataNode-এ আছে
    Note over C,N: ⚠️ ডেটা NameNode দিয়ে যায় না
    C->>D1: block 1 চাই
    D1-->>C: ডেটা (সরাসরি)
    C->>D2: block 2 চাই
    D2-->>C: ডেটা (সরাসরি)
      </pre>
      <span class="diagram-caption">Control plane আর data plane আলাদা — এটিই স্কেলিংয়ের চাবি</span>
      <h4>১. NameNode (master)</h4>
      <ul>
        <li>ডিরেক্টরি ট্রি, ফাইল → ব্লক ম্যাপিং, এবং প্রতিটি ব্লক কোন DataNode-এ আছে — সব <strong>মেমরিতে</strong> রাখে (তাই দ্রুত)।</li>
        <li><strong>আসল ডেটা কখনও NameNode দিয়ে যায় না।</strong> ক্লায়েন্ট শুধু ঠিকানা নেয়, তারপর সরাসরি DataNode-এর সাথে কথা বলে। এজন্যই একটি master থাকা সত্ত্বেও throughput বিশাল হতে পারে।</li>
        <li><strong>সীমাবদ্ধতা:</strong> প্রতিটি ফাইল/ব্লকের metadata মেমরি খায় (~১৫০ বাইট)। তাই <strong>কোটি কোটি ছোট ফাইল HDFS-এর দুঃস্বপ্ন</strong> — NameNode-এর RAM শেষ হয়ে যায়। বড় ফাইলে একত্র করাই সমাধান।</li>
      </ul>
      <h4>২. DataNode ও ব্লক</h4>
      <ul>
        <li>ফাইল বড় ব্লকে ভাগ হয় (ডিফল্ট <strong>১২৮ MB</strong>)। ব্লক এত বড় কেন? কারণ ডিস্কে seek করার সময় বেশি; বড় ব্লক মানে বেশি সময় ধরে ক্রমিক (sequential) পড়া, যা অনেক দ্রুত।</li>
        <li>প্রতিটি ব্লকের ৩টি কপি (ডিফল্ট) রাখা হয়।</li>
        <li><strong>Rack awareness:</strong> ১টি কপি একই র‍্যাকে, ২টি অন্য র‍্যাকে। পুরো র‍্যাকের সুইচ নষ্ট হলেও ডেটা বাঁচে, আবার সব কপি দূরে না রাখায় নেটওয়ার্ক ট্রাফিকও কম থাকে।</li>
        <li>DataNode নিয়মিত <strong>heartbeat</strong> ও <strong>block report</strong> পাঠায়। heartbeat বন্ধ হলে NameNode সেই নোডের ব্লকগুলো অন্যত্র রেপ্লিকেট করে দেয়।</li>
      </ul>
      <h4>৩. NameNode-ই SPOF — সমাধান</h4>
      <ul>
        <li><strong>FsImage + EditLog:</strong> স্ন্যাপশট ও পরিবর্তনের লগ ডিস্কে থাকে, যাতে রিস্টার্টে অবস্থা ফিরিয়ে আনা যায়।</li>
        <li><strong>HA সেটআপ:</strong> Active + Standby NameNode, মাঝে JournalNode কোরাম দিয়ে EditLog শেয়ার। ZooKeeper স্বয়ংক্রিয় failover করায়।</li>
        <li><strong>Federation:</strong> একাধিক NameNode আলাদা namespace সামলায় — metadata স্কেলিংয়ের জন্য।</li>
      </ul>
      <h4>৪. Data locality — মূল দর্শন</h4>
      <p>"ডেটার কাছে গণনা পাঠাও, গণনার কাছে ডেটা নয়।" টেরাবাইট ডেটা নেটওয়ার্কে টানার চেয়ে কোডটুকু সেই মেশিনে পাঠানো অনেক সস্তা। MapReduce/Spark এই নীতিতেই কাজ করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>HDFS-এ ফাইলের মাঝখানে এডিট করা যায় না কেন?</li>
        <li>"Small files problem" বাস্তবে কীভাবে সমাধান করবেন?</li>
        <li>HDFS আর S3-এর মধ্যে কখন কোনটি বাছবেন?</li>
      </ul>
    `
  },
  {
    id: "sd-48",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["System Design","Feed System","Newsfeed"],
    question: "Design a News Feed System (e.g., Facebook News Feed / Twitter Timeline) — Fan-out on Write vs Fan-out on Read কী?",
    answer: `
      <h4>মূল সমস্যা</h4>
      <p>ফিড তৈরির দুটি সময় আছে — পোস্ট করার সময় (write) অথবা ফিড খোলার সময় (read)। কোনটিতে কাজ করবেন, সেটিই মূল স্থাপত্যগত সিদ্ধান্ত।</p>
      <pre class="mermaid">
flowchart TD
    subgraph W["Fan-out on Write (Push)"]
      P1["ইউজার পোস্ট করল"] --> F1["সব ফলোয়ারের<br/>ইনবক্সে কপি লেখা"]
      F1 --> R1["ফিড পড়া = ১টি কুয়েরি ⚡"]
    end
    subgraph R["Fan-out on Read (Pull)"]
      P2["ইউজার পোস্ট করল"] --> F2["শুধু নিজের টেবিলে লেখা"]
      F2 --> R2["ফিড পড়া = সব followee-র<br/>পোস্ট এনে merge 🐢"]
    end
      </pre>
      <table>
        <tr><th>দিক</th><th>Fan-out on Write</th><th>Fan-out on Read</th></tr>
        <tr><td>ফিড পড়ার গতি</td><td>খুব দ্রুত</td><td>ধীর</td></tr>
        <tr><td>পোস্ট করার খরচ</td><td>বেশি (N ফলোয়ার = N write)</td><td>কম</td></tr>
        <tr><td>স্টোরেজ</td><td>বেশি (ডেটা ডুপ্লিকেট)</td><td>কম</td></tr>
        <tr><td>সেলিব্রিটি সমস্যা</td><td><strong>মারাত্মক</strong> (৫ কোটি write)</td><td>নেই</td></tr>
        <tr><td>নিষ্ক্রিয় ইউজার</td><td>অপচয় (কেউ পড়বে না)</td><td>অপচয় নেই</td></tr>
      </table>
      <h4>বাস্তব সমাধান: Hybrid</h4>
      <p>বড় সিস্টেমগুলো দুটিই ব্যবহার করে — এটিই সঠিক উত্তর:</p>
      <ul>
        <li><strong>সাধারণ ইউজার (&lt;১০,০০০ ফলোয়ার) → Push:</strong> পোস্ট করার সাথে সাথে ফলোয়ারদের ইনবক্সে লেখা হয়। ফিড পড়া তাৎক্ষণিক।</li>
        <li><strong>সেলিব্রিটি (লক্ষ ফলোয়ার) → Pull:</strong> ফ্যান-আউট করলে একটি পোস্টে কোটি write লাগবে। তাই তাদের পোস্ট ফিড পড়ার সময় আলাদা করে এনে merge করা হয়।</li>
        <li><strong>ফিড = ইনবক্স (push) + সেলিব্রিটি পোস্ট (pull), তারপর র‍্যাঙ্কিং।</strong></li>
      </ul>
      <h4>অন্যান্য গুরুত্বপূর্ণ বিষয়</h4>
      <ul>
        <li><strong>নিষ্ক্রিয় ইউজারে fan-out করবেন না:</strong> ৩০ দিন লগইন না করা ইউজারের ইনবক্সে লিখে লাভ নেই — তারা ফিরলে pull করে নিন।</li>
        <li><strong>ফিড সীমিত রাখুন:</strong> ইনবক্সে সর্বশেষ ~৫০০-১০০০ আইটেম রাখুন; পুরনোটা ছেঁটে ফেলুন। কেউ ৫০০০ পোস্ট স্ক্রল করে না।</li>
        <li><strong>Fan-out অ্যাসিঙ্ক্রোনাস:</strong> পোস্ট API সাথে সাথে ফেরত দেবে; fan-out কিউতে ওয়ার্কাররা করবে। ইউজার নিজের পোস্ট সাথে সাথে দেখবেন (ক্লায়েন্ট-সাইডে যোগ করে)।</li>
        <li><strong>স্টোরেজ:</strong> ইনবক্সে পুরো পোস্ট নয়, শুধু <code>post_id</code> রাখুন; পোস্টের বিষয়বস্তু আলাদা স্টোর ও ক্যাশ থেকে আসবে — নাহলে স্টোরেজ বিস্ফোরিত হবে এবং পোস্ট এডিট করলে অসঙ্গতি হবে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>র‍্যাঙ্কিং (কালানুক্রমিক নয়) যোগ করলে ডিজাইন কীভাবে বদলাবে?</li>
        <li>কেউ পোস্ট ডিলিট করলে কোটি ইনবক্স থেকে কীভাবে সরাবেন?</li>
        <li>ইউজার আনফলো করলে ইনবক্সের পুরনো পোস্টগুলোর কী হবে?</li>
      </ul>
    `
  },
  /* ===== SECTION J — Cross-Topic Integration (7) ===== */
  {
    id: "sdi-16",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","Next.js","NestJS","Architecture"],
    question: "প্রোডাকশনে Next.js (frontend) এবং NestJS (backend) একসাথে কীভাবে আর্কিটেক্ট করবেন? একই সার্ভারে নাকি আলাদা?",
    answer: `
      <p>এটি বাংলাদেশি ফুল-স্ট্যাক ইন্টারভিউয়ের অন্যতম প্র্যাকটিক্যাল প্রশ্ন। উত্তরের মূল কথা — <strong>Next.js এবং NestJS আলাদা সার্ভিস হিসেবে ডিপ্লয় করুন</strong>, কারণ এদের স্কেলিং প্রোফাইল সম্পূর্ণ ভিন্ন।</p>
      <pre class="mermaid">
flowchart TD
    U["👤 Browser"] --> CDN["CDN<br/>স্ট্যাটিক অ্যাসেট, ছবি"]
    U --> N["Nginx / Ingress<br/>TLS, gzip, routing"]
    N -->|"/ (পেজ)"| NX["Next.js<br/>SSR / RSC / ISR"]
    N -->|"/api/*"| NJ["NestJS API<br/>business logic"]
    NX -->|"সার্ভার-সাইড fetch<br/>ইন্টারনাল নেটওয়ার্ক"| NJ
    NJ --> RD[("Redis<br/>cache + session")]
    NJ --> DB[("PostgreSQL / MongoDB")]
    NJ -.->|async| MQ["RabbitMQ / Kafka"]
    MQ -.-> W["Workers<br/>email, invoice, report"]
      </pre>
      <span class="diagram-caption">দুটি আলাদা সার্ভিস, একটি Nginx পেছনে — path দিয়ে রাউটিং</span>
      <h4>কেন আলাদা রাখবেন</h4>
      <ul>
        <li><strong>ভিন্ন স্কেলিং চাহিদা:</strong> Next.js SSR CPU-নির্ভর (রেন্ডারিং), NestJS API I/O-নির্ভর (DB কল)। আলাদা থাকলে যেটির চাপ বেশি শুধু সেটিই স্কেল করা যায়।</li>
        <li><strong>স্বাধীন ডিপ্লয়:</strong> UI-এর ছোট পরিবর্তনে API রিস্টার্ট করার দরকার নেই।</li>
        <li><strong>পুনঃব্যবহার:</strong> একই NestJS API মোবাইল অ্যাপ ও থার্ড-পার্টি ইন্টিগ্রেশনও সার্ভ করে।</li>
        <li><strong>ব্লাস্ট রেডিয়াস:</strong> SSR-এ মেমরি লিক হলে API ডাউন হবে না।</li>
      </ul>
      <h4>মূল বাস্তবায়ন বিবরণ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Next.js Server Component — সার্ভার থেকে সার্ভারে কল
// ব্রাউজারের URL নয়, ইন্টারনাল সার্ভিস URL ব্যবহার করুন
async function getOrders(userId) {
  const res = await fetch(\`\${process.env.INTERNAL_API_URL}/orders?userId=\${userId}\`, {
    headers: {
      // ইউজারের টোকেন সার্ভার-সাইডে ফরওয়ার্ড করুন
      Authorization: \`Bearer \${await getServerToken()}\`,
      // ট্রেসিং চেইন অক্ষুণ্ণ রাখুন
      'x-trace-id': headers().get('x-trace-id') ?? crypto.randomUUID()
    },
    next: { revalidate: 60 }        // Next.js ডেটা ক্যাশ
  });
  if (!res.ok) throw new Error('Failed to load orders');
  return res.json();
}

// INTERNAL_API_URL = http://nestjs-api:3000   (Docker/k8s সার্ভিস নাম)
// NEXT_PUBLIC_API_URL = https://api.example.com  (ব্রাউজার থেকে)</code></pre>
      </div>
      <h4>যে ভুলগুলো প্রায়ই হয়</h4>
      <ul>
        <li><strong>সার্ভার-সাইড fetch-এ পাবলিক URL ব্যবহার:</strong> রিকোয়েস্ট অপ্রয়োজনীয়ভাবে ইন্টারনেট ঘুরে আসে — latency ও খরচ দুটোই বাড়ে। ইন্টারনাল DNS নাম ব্যবহার করুন।</li>
        <li><strong>ব্রাউজার ও সার্ভারে একই env var:</strong> <code>NEXT_PUBLIC_</code> প্রিফিক্সযুক্ত ভ্যারিয়েবল বান্ডলে চলে যায় — সেখানে সিক্রেট রাখবেন না।</li>
        <li><strong>Auth কুকি ডোমেইন ভুল:</strong> <code>app.example.com</code> ও <code>api.example.com</code> আলাদা হলে কুকির ডোমেইন <code>.example.com</code> করতে হবে, নাহলে কুকি যাবে না।</li>
        <li><strong>দুই জায়গায় business logic:</strong> ভ্যালিডেশন শুধু NestJS-এ রাখুন; Next.js শুধু UX-এর জন্য হালকা ভ্যালিডেশন করবে।</li>
      </ul>
      <p><strong>কখন একসাথে রাখবেন:</strong> ছোট প্রজেক্ট বা MVP-তে শুধু Next.js Route Handlers যথেষ্ট। NestJS তখনই যোগ করুন যখন একাধিক ক্লায়েন্ট, ভারী ব্যাকগ্রাউন্ড জব, বা জটিল ডোমেইন লজিক দরকার হয় — আগে থেকেই নয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Next.js Server Component থেকে কল করলে auth টোকেন কীভাবে পাস করবেন?</li>
        <li>দুটি সার্ভিসের মধ্যে টাইপ শেয়ার কীভাবে করবেন (monorepo, OpenAPI codegen)?</li>
        <li>SSR পেজে API ধীর হলে ইউজারকে কী দেখাবেন (streaming + Suspense)?</li>
      </ul>
    `
  },
  {
    id: "sdi-17",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","Redis","Database","Failure"],
    question: "Redis হঠাৎ ডাউন হয়ে গেলে আপনার সিস্টেমে কী ঘটবে? কীভাবে ডিজাইন করলে ক্যাশ ডাউন হলেও সিস্টেম টিকে থাকে?",
    answer: `
      <p>এটি চমৎকার একটি ফেইলিওর-সিনারিও প্রশ্ন, কারণ বেশিরভাগ ডেভেলপার ক্যাশকে "পারফরম্যান্স বুস্ট" ভাবেন — কিন্তু বাস্তবে অনেক সিস্টেম ক্যাশের উপর <em>নির্ভরশীল</em> হয়ে পড়ে, এবং ক্যাশ গেলে পুরো সিস্টেম ধসে পড়ে।</p>
      <h4>যা ঘটে (ক্যাসকেডিং ফেইলিওর)</h4>
      <pre class="mermaid">
flowchart TD
    A["❌ Redis ডাউন"] --> B["সব রিড এখন DB-তে যাচ্ছে"]
    B --> C["DB লোড ১০০ গুণ বেড়ে গেল"]
    C --> D["DB কানেকশন পুল নিঃশেষ"]
    D --> E["কুয়েরি টাইমআউট শুরু"]
    E --> F["অ্যাপ সার্ভার থ্রেড আটকে গেল"]
    F --> G["💥 সম্পূর্ণ আউটেজ"]
    A --> H["সেশন Redis-এ থাকলে<br/>সব ইউজার লগআউট"]
      </pre>
      <span class="diagram-caption">ক্যাশ হারানো মানে শুধু ধীরগতি নয় — প্রায়ই এটি সম্পূর্ণ আউটেজ</span>
      <h4>প্রতিরোধমূলক ডিজাইন</h4>
      <ul>
        <li><strong>ক্যাশ কলে ছোট টাইমআউট:</strong> Redis-এ ৫০ms টাইমআউট দিন। ধীর ক্যাশের জন্য অপেক্ষা করার চেয়ে সরাসরি DB-তে যাওয়া ভালো।</li>
        <li><strong>ক্যাশ ব্যর্থতা fatal নয়:</strong> Redis এরর ধরে DB fallback নিন — এক্সেপশন যেন রিকোয়েস্ট ফেল না করায়।</li>
        <li><strong>Circuit breaker:</strong> Redis বারবার ব্যর্থ হলে কিছুক্ষণ কল করাই বন্ধ রাখুন (প্রতিবার ৫০ms নষ্ট করার দরকার নেই)।</li>
        <li><strong>DB-র সামনে রক্ষাকবচ:</strong> কানেকশন পুল সীমা + কুয়েরি টাইমআউট + load shedding, যাতে DB নিজেও ধসে না পড়ে।</li>
        <li><strong>Request coalescing:</strong> একই কী-র জন্য একসাথে ১০০০ রিকোয়েস্ট এলে DB-তে একটিই কুয়েরি যাবে।</li>
        <li><strong>সেশন Redis-এ হলে persistence + replica রাখুন</strong>, নাহলে সেশন হারালে সবাই লগআউট হবে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const CACHE_TIMEOUT_MS = 50;
let redisHealthy = true, failures = 0;

async function withCache(key, ttlSec, loader) {
  // Circuit খোলা থাকলে Redis একদম ছুঁবেন না
  if (redisHealthy) {
    try {
      const hit = await withTimeout(redis.get(key), CACHE_TIMEOUT_MS);
      if (hit) return JSON.parse(hit);
      failures = 0;
    } catch (err) {
      // ⚠️ ক্যাশ ব্যর্থতা কখনও রিকোয়েস্ট ফেল করাবে না
      if (++failures >= 5) {
        redisHealthy = false;
        setTimeout(() => { redisHealthy = true; failures = 0; }, 30_000);
      }
      metrics.increment('cache.error');
    }
  }

  // একই কী-র সমান্তরাল রিকোয়েস্টগুলো একটিই DB কুয়েরিতে মেলানো
  const value = await singleFlight(key, loader);

  if (redisHealthy) {
    redis.setex(key, ttlSec, JSON.stringify(value)).catch(() => {});  // fire-and-forget
  }
  return value;
}</code></pre>
      </div>
      <h4>একটি জরুরি প্রশ্ন নিজেকে করুন</h4>
      <p><strong>"আমার ক্যাশ কি optional না required?"</strong> যদি ক্যাশ ছাড়া DB পুরো ট্রাফিক সামলাতে না পারে, তাহলে সেটি আর ক্যাশ নয় — সেটি একটি <em>ডাটাবেজ</em>, এবং সেই অনুযায়ী HA (Sentinel/Cluster), persistence ও ব্যাকআপ দরকার। এই পার্থক্যটি ইন্টারভিউয়ারদের খুব ভালো লাগে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redis রিস্টার্টের পর ঠান্ডা ক্যাশে thundering herd কীভাবে ঠেকাবেন?</li>
        <li>Redis Sentinel বনাম Cluster — কখন কোনটি?</li>
        <li>ক্যাশ ছাড়া DB কত QPS নিতে পারে — কীভাবে পরীক্ষা করবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-18",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","Elasticsearch","Database","Search"],
    question: "MySQL-এর LIKE '%keyword%' কুয়েরির বদলে Elasticsearch কেন ব্যবহার করবেন? দুটির মধ্যে ডেটা সিঙ্ক কীভাবে রাখবেন?",
    answer: `
      <p><strong>সংক্ষিপ্ত উত্তর:</strong> <code>LIKE '%keyword%'</code> কোনো ইনডেক্স ব্যবহার করতে পারে না — প্রতিবার সম্পূর্ণ টেবিল স্ক্যান হয়। ১ কোটি সারিতে এটি কয়েক সেকেন্ড নেয়, যেখানে Elasticsearch inverted index দিয়ে একই কাজ মিলিসেকেন্ডে করে।</p>
      <h4>কেন LIKE ধীর</h4>
      <p>B-Tree ইনডেক্স বাম দিক থেকে সাজানো, তাই <code>LIKE 'apple%'</code> ইনডেক্স ব্যবহার করতে পারে। কিন্তু <code>'%apple%'</code>-এ শুরুটা অজানা, তাই ইনডেক্স অকেজো — full scan ছাড়া উপায় নেই। তাছাড়া LIKE শুধু হুবহু substring মেলায়: টাইপো, বহুবচন, প্রাসঙ্গিকতা র‍্যাঙ্কিং — কিছুই বোঝে না।</p>
      <table>
        <tr><th>ক্ষমতা</th><th>SQL LIKE</th><th>Elasticsearch</th></tr>
        <tr><td>গতি (১ কোটি সারি)</td><td>সেকেন্ড</td><td>মিলিসেকেন্ড</td></tr>
        <tr><td>Relevance ranking</td><td>নেই</td><td>BM25 স্কোরিং</td></tr>
        <tr><td>টাইপো সহনশীলতা</td><td>নেই</td><td>Fuzzy query</td></tr>
        <tr><td>Stemming (run/running)</td><td>নেই</td><td>Analyzer</td></tr>
        <tr><td>Faceted filter/aggregation</td><td>ধীর GROUP BY</td><td>দ্রুত aggregation</td></tr>
        <tr><td>ট্রানজেকশন / ACID</td><td>✅ শক্তিশালী</td><td>❌ নয়</td></tr>
      </table>
      <p><strong>গুরুত্বপূর্ণ নীতি:</strong> Elasticsearch আপনার <em>system of record</em> নয়। সত্যের উৎস থাকবে MySQL/MongoDB-তে; Elasticsearch শুধু একটি <em>পুনর্নির্মাণযোগ্য সার্চ ইনডেক্স</em>। ES হারালে যেন পুরোটা আবার তৈরি করা যায়।</p>
      <h4>ডেটা সিঙ্ক করার তিনটি উপায়</h4>
      <pre class="mermaid">
flowchart TD
    subgraph One["১. Dual Write (ঝুঁকিপূর্ণ)"]
      A1[App] --> D1[(MySQL)]
      A1 --> E1[(Elasticsearch)]
      A1 -.->|একটি ব্যর্থ হলে<br/>ডেটা অসঙ্গত| X1["⚠️"]
    end
    subgraph Two["২. Outbox + Worker (নির্ভরযোগ্য)"]
      A2[App] -->|একই ট্রানজেকশনে| D2[(MySQL + outbox টেবিল)]
      D2 --> W2[Worker] --> E2[(Elasticsearch)]
    end
    subgraph Three["৩. CDC / Debezium (সেরা)"]
      A3[App] --> D3[(MySQL)]
      D3 -->|binlog| K3[Kafka] --> C3[Connector] --> E3[(Elasticsearch)]
    end
      </pre>
      <span class="diagram-caption">Dual write এড়িয়ে চলুন — outbox বা CDC ব্যবহার করুন</span>
      <ul>
        <li><strong>Dual write:</strong> সহজ কিন্তু বিপজ্জনক — DB সফল হয়ে ES ব্যর্থ হলে স্থায়ী অসঙ্গতি তৈরি হয়। ছোট প্রজেক্ট ছাড়া এড়ান।</li>
        <li><strong>Transactional Outbox:</strong> ডেটা ও ইভেন্ট <em>একই ট্রানজেকশনে</em> লেখা হয়, তাই atomicity নিশ্চিত। একটি worker outbox পড়ে ES-এ পাঠায়।</li>
        <li><strong>CDC (Debezium):</strong> ডাটাবেজের binlog পড়ে পরিবর্তন ধরে — অ্যাপ্লিকেশন কোডে কোনো পরিবর্তন লাগে না, এবং কোনো write মিস হয় না। বড় সিস্টেমে এটিই স্ট্যান্ডার্ড।</li>
      </ul>
      <p><strong>বাস্তবতা:</strong> সিঙ্ক সবসময় eventually consistent — কয়েকশো মিলিসেকেন্ড দেরি হবে। তাই "অর্ডার দেওয়ার সাথে সাথে সার্চে দেখাতে হবে" ধরনের চাহিদা থাকলে সেই নির্দিষ্ট রিডটি DB থেকে করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Elasticsearch ইনডেক্স করাপ্ট হলে ডাউনটাইম ছাড়া কীভাবে reindex করবেন (alias swap)?</li>
        <li>PostgreSQL full-text search কখন যথেষ্ট, কখন ES লাগে?</li>
        <li>ES আর DB-র ফল আলাদা হলে কীভাবে ধরবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-19",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","Kafka","RabbitMQ","Decision"],
    question: "একটি নতুন ফিচারের জন্য RabbitMQ নাকি Kafka বেছে নেবেন — সিদ্ধান্তটি কীভাবে নেবেন? বাস্তব উদাহরণ দিন।",
    answer: `
      <p>সঠিক উত্তর "Kafka ভালো" নয়। সিদ্ধান্তটি নির্ভর করে একটি প্রশ্নের উপর: <strong>আপনার কি টাস্ক বিতরণ দরকার, নাকি ইভেন্টের ইতিহাস দরকার?</strong></p>
      <h4>মূল স্থাপত্যগত পার্থক্য</h4>
      <table>
        <tr><th>দিক</th><th>RabbitMQ</th><th>Kafka</th></tr>
        <tr><td>মডেল</td><td>Message broker (smart broker, dumb consumer)</td><td>Distributed log (dumb broker, smart consumer)</td></tr>
        <tr><td>পড়ার পর</td><td>মেসেজ কিউ থেকে <strong>মুছে যায়</strong></td><td>retention শেষ না হওয়া পর্যন্ত <strong>থেকে যায়</strong></td></tr>
        <tr><td>Replay</td><td>সম্ভব নয় (DLQ ছাড়া)</td><td>offset পিছিয়ে যেকোনো সময় replay</td></tr>
        <tr><td>Ordering</td><td>কিউ-ভিত্তিক</td><td>পার্টিশন-ভিত্তিক</td></tr>
        <tr><td>থ্রুপুট</td><td>হাজার/সেকেন্ড</td><td>লক্ষ/সেকেন্ড</td></tr>
        <tr><td>রাউটিং</td><td>খুব সমৃদ্ধ (topic, header, fanout exchange)</td><td>সরল (topic + partition key)</td></tr>
        <tr><td>একাধিক ভোক্তা</td><td>প্রতিটির জন্য আলাদা কিউ বাঁধতে হয়</td><td>স্বাভাবিক — প্রত্যেকে নিজের offset রাখে</td></tr>
      </table>
      <h4>সিদ্ধান্ত নেওয়ার প্রশ্নমালা</h4>
      <pre class="mermaid">
flowchart TD
    S{"ইভেন্ট কি একাধিক<br/>ভোক্তা আলাদাভাবে<br/>পড়বে?"} -->|হ্যাঁ| K1["Kafka"]
    S -->|না| R1{"পুরনো ইভেন্ট<br/>replay করার<br/>দরকার হবে?"}
    R1 -->|হ্যাঁ| K1
    R1 -->|না| R2{"জটিল রাউটিং বা<br/>per-message priority<br/>দরকার?"}
    R2 -->|হ্যাঁ| RB["RabbitMQ"]
    R2 -->|না| R3{"থ্রুপুট<br/>> ৫০,০০০/s?"}
    R3 -->|হ্যাঁ| K1
    R3 -->|না| RB
      </pre>
      <span class="diagram-caption">replay ও multi-consumer দরকার হলে Kafka; টাস্ক কিউ ও রাউটিং হলে RabbitMQ</span>
      <h4>বাস্তব উদাহরণ</h4>
      <ul>
        <li><strong>ইমেইল/SMS পাঠানো → RabbitMQ.</strong> এটি একটি টাস্ক: একবার পাঠালেই শেষ, replay করার দরকার নেই, রিট্রাই ও DLQ দরকার, প্রায়োরিটি কিউ কাজে লাগে (OTP আগে, নিউজলেটার পরে)।</li>
        <li><strong>ইউজার অ্যাক্টিভিটি ট্র্যাকিং → Kafka.</strong> একই "order_placed" ইভেন্ট একসাথে অ্যানালিটিক্স, রেকমেন্ডেশন, ফ্রড ডিটেকশন ও ডেটা ওয়্যারহাউস পড়বে — প্রত্যেকে নিজের গতিতে, নিজের offset নিয়ে।</li>
        <li><strong>ইমেজ থাম্বনেইল তৈরি → RabbitMQ.</strong> ক্লাসিক work queue, prefetch দিয়ে ওয়ার্কারদের মধ্যে ভাগ।</li>
        <li><strong>Event sourcing / audit log → Kafka.</strong> লগই সত্যের উৎস; নতুন সার্ভিস যুক্ত হলে শুরু থেকে সব ইভেন্ট পড়ে নিজের state বানাতে পারে।</li>
      </ul>
      <p><strong>একটি বাস্তব পরামর্শ:</strong> Kafka অপারেশনালি ভারী (ZooKeeper/KRaft, পার্টিশন পরিকল্পনা, rebalance বোঝা)। দৈনিক কয়েক লক্ষ মেসেজের নিচে থাকলে RabbitMQ — বা এমনকি PostgreSQL-ভিত্তিক জব কিউ — অনেক কম রক্ষণাবেক্ষণে একই কাজ করে। "Kafka লাগবে" বলার আগে প্রমাণ করুন যে সত্যিই লাগবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>দুটোই ব্যবহার করা কি যুক্তিসঙ্গত? কখন?</li>
        <li>Kafka-তে ordering দরকার হলে partition key কীভাবে বাছবেন?</li>
        <li>RabbitMQ-তে কনজিউমার সব মেসেজ ফেল করলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "sdi-20",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","Nginx","Node.js","Scaling"],
    question: "Nginx কীভাবে একাধিক Node.js ইনস্ট্যান্সে ট্রাফিক বিতরণ করে? Node.js Cluster এবং Nginx load balancing-এর মধ্যে সম্পর্ক কী?",
    answer: `
      <p>Node.js একটি প্রসেসে একটিই থ্রেডে JavaScript চালায় — অর্থাৎ ১৬ কোরের সার্ভারে একটি Node প্রসেস মাত্র ১টি কোর ব্যবহার করে। বাকি ১৫টি কোর কাজে লাগাতে দুটি স্তরে বিতরণ দরকার।</p>
      <pre class="mermaid">
flowchart TD
    I["🌐 Internet"] --> N["Nginx<br/>(reverse proxy + LB)"]
    N -->|"সার্ভার ১"| S1["VM / Container 1"]
    N -->|"সার্ভার ২"| S2["VM / Container 2"]
    subgraph S1g["সার্ভার ১ (৪ কোর)"]
      S1 --> M1["PM2 / cluster master"]
      M1 --> W1["worker 1"]
      M1 --> W2["worker 2"]
      M1 --> W3["worker 3"]
      M1 --> W4["worker 4"]
    end
      </pre>
      <span class="diagram-caption">দুই স্তর: Nginx মেশিনের মধ্যে ভাগ করে, cluster/PM2 কোরের মধ্যে ভাগ করে</span>
      <h4>দুটি স্তরের ভূমিকা</h4>
      <ul>
        <li><strong>Nginx (মেশিন-স্তর):</strong> একাধিক সার্ভার/কন্টেইনারের মধ্যে বিতরণ, TLS termination, স্ট্যাটিক ফাইল, gzip, rate limiting, health check করে অসুস্থ নোড বাদ দেওয়া।</li>
        <li><strong>Node cluster / PM2 (কোর-স্তর):</strong> একই মেশিনের সব CPU কোর ব্যবহার। মাস্টার প্রসেস পোর্ট শেয়ার করে, OS বা মাস্টার কানেকশন ওয়ার্কারদের মধ্যে ভাগ করে দেয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream node_backend {
    least_conn;                    # দীর্ঘস্থায়ী কানেকশনে round-robin-এর চেয়ে ভালো

    server 10.0.1.10:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:3000 max_fails=3 fail_timeout=30s;
    server 10.0.1.12:3000 backup;  # অন্যরা ডাউন হলে তবেই

    keepalive 64;                  # upstream সকেট পুনঃব্যবহার — বড় পারফরম্যান্স লাভ
}

server {
    listen 443 ssl http2;

    location /api/ {
        proxy_pass http://node_backend;
        proxy_http_version 1.1;            # keepalive-এর জন্য আবশ্যক
        proxy_set_header Connection "";     # ⚠️ না দিলে keepalive কাজ করবে না

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 5s;
        proxy_read_timeout   30s;
        proxy_next_upstream error timeout http_502 http_503;
    }
}</code></pre>
      </div>
      <h4>যে বিষয়গুলো প্রায়ই ভুল হয়</h4>
      <ul>
        <li><strong><code>proxy_set_header Connection ""</code> ভুলে যাওয়া:</strong> এটি ছাড়া <code>keepalive</code> ডিরেক্টিভ নিষ্ক্রিয় থাকে এবং প্রতিটি রিকোয়েস্টে নতুন TCP কানেকশন তৈরি হয়।</li>
        <li><strong>অ্যাপে <code>trust proxy</code> সেট না করা:</strong> Express/NestJS-এ এটি না দিলে <code>req.ip</code> সবসময় Nginx-এর IP দেখাবে — rate limiting ও লগিং ভুল হবে।</li>
        <li><strong>ওয়ার্কারদের মধ্যে state শেয়ার ধরে নেওয়া:</strong> প্রতিটি cluster worker আলাদা প্রসেস, আলাদা মেমরি। ইন-মেমরি ক্যাশ বা rate-limit কাউন্টার ওয়ার্কারদের মধ্যে শেয়ার হয় না — Redis ব্যবহার করুন।</li>
        <li><strong>WebSocket-এ sticky session না দেওয়া:</strong> Socket.IO-র polling fallback একই নোডে যাওয়া দরকার, নাহলে <code>ip_hash</code> বা Redis adapter লাগবে।</li>
      </ul>
      <p><strong>কনটেইনার যুগে সূক্ষ্মতা:</strong> Kubernetes-এ সাধারণত প্রতি পডে <strong>একটি</strong> Node প্রসেস চালানো হয় এবং পড সংখ্যা বাড়িয়ে স্কেল করা হয় — cluster module ব্যবহার করা হয় না। এতে রিসোর্স লিমিট, health check ও অটো-স্কেলিং অনেক পরিষ্কার হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি Node ওয়ার্কার ক্র্যাশ করলে কী হয় — চলমান রিকোয়েস্টগুলোর কী দশা?</li>
        <li>Graceful shutdown কীভাবে করবেন যাতে ডিপ্লয়ে রিকোয়েস্ট না হারায়?</li>
        <li><code>least_conn</code> কেন প্রায়ই <code>round_robin</code>-এর চেয়ে ভালো?</li>
      </ul>
    `
  },
  {
    id: "sdi-21",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","Microservices","gRPC","REST"],
    question: "মাইক্রোসার্ভিসের মধ্যে যোগাযোগে কখন REST, কখন gRPC এবং কখন Message Queue ব্যবহার করবেন?",
    answer: `
      <p>প্রথম সিদ্ধান্তটি প্রোটোকল নয় — প্রথম প্রশ্ন হলো <strong>এই কলটি কি সিঙ্ক্রোনাস হতেই হবে?</strong> অর্থাৎ কলারের কি এখনই উত্তর দরকার, নাকি সে "কাজটা করে রেখো" বলে এগিয়ে যেতে পারে?</p>
      <pre class="mermaid">
flowchart TD
    Q{"কলারের কি এখনই<br/>উত্তর দরকার?"} -->|না| MQ["Message Queue<br/>(Kafka / RabbitMQ)"]
    Q -->|হ্যাঁ| P{"কল কি ইন্টারনাল<br/>সার্ভিস-টু-সার্ভিস?"}
    P -->|না, পাবলিক/ব্রাউজার| REST["REST / GraphQL"]
    P -->|হ্যাঁ| V{"উচ্চ ভলিউম বা<br/>কড়া latency বাজেট?"}
    V -->|হ্যাঁ| G["gRPC"]
    V -->|না| REST
      </pre>
      <span class="diagram-caption">সিঙ্ক্রোনাস দরকার না হলে কিউই সেরা — কাপলিং সবচেয়ে কম</span>
      <h4>তুলনা</h4>
      <table>
        <tr><th>দিক</th><th>REST</th><th>gRPC</th><th>Message Queue</th></tr>
        <tr><td>ধরন</td><td>সিঙ্ক্রোনাস</td><td>সিঙ্ক্রোনাস</td><td>অ্যাসিঙ্ক্রোনাস</td></tr>
        <tr><td>পেলোড</td><td>JSON (টেক্সট)</td><td>Protobuf (বাইনারি)</td><td>যেকোনো</td></tr>
        <tr><td>গতি</td><td>ভালো</td><td>৫–১০× দ্রুত</td><td>প্রযোজ্য নয়</td></tr>
        <tr><td>ব্রাউজার সাপোর্ট</td><td>নেটিভ</td><td>gRPC-Web লাগে</td><td>নেই</td></tr>
        <tr><td>কাপলিং</td><td>মাঝারি</td><td>মাঝারি (schema শেয়ার)</td><td>সবচেয়ে কম</td></tr>
        <tr><td>কলি ডাউন হলে</td><td>কল ব্যর্থ</td><td>কল ব্যর্থ</td><td>মেসেজ অপেক্ষা করে ✅</td></tr>
        <tr><td>Streaming</td><td>সীমিত (SSE)</td><td>দ্বিমুখী streaming</td><td>স্বাভাবিক</td></tr>
      </table>
      <h4>বাস্তব প্রয়োগের নিয়ম</h4>
      <ul>
        <li><strong>REST:</strong> পাবলিক API, ব্রাউজার/মোবাইল ক্লায়েন্ট, থার্ড-পার্টি ইন্টিগ্রেশন। ডিবাগ সহজ (curl), টুলিং সর্বত্র।</li>
        <li><strong>gRPC:</strong> ইন্টারনাল সার্ভিস-টু-সার্ভিস, বিশেষ করে উচ্চ ভলিউম বা যেখানে প্রতি মিলিসেকেন্ড গোনা হয়। কড়া schema (.proto) ভুল আগেই ধরে ফেলে।</li>
        <li><strong>Message Queue:</strong> সাইড-ইফেক্ট (ইমেইল, ইনভয়েস, অ্যানালিটিক্স), দীর্ঘ প্রসেসিং, এবং যেখানে গন্তব্য সার্ভিস সাময়িক ডাউন থাকলেও কাজ হারানো চলবে না।</li>
      </ul>
      <h4>সবচেয়ে বড় অ্যান্টি-প্যাটার্ন: Distributed Monolith</h4>
      <p>যদি অর্ডার তৈরি করতে সিঙ্ক্রোনাসভাবে ৫টি সার্ভিসে কল করতে হয়, তাহলে আপনি মনোলিথই বানিয়েছেন — শুধু ফাংশন কলের বদলে নেটওয়ার্ক কল বসিয়ে <em>ধীর ও ভঙ্গুর</em> করেছেন। প্রতিটি সিঙ্ক্রোনাস নির্ভরতা availability কমায় (0.99⁵ ≈ ৯৫%)।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ অ্যান্টি-প্যাটার্ন: সব কিছু সিঙ্ক্রোনাস
async function createOrder(dto) {
  await inventoryService.reserve(dto);    // এর যেকোনো একটি ডাউন হলে
  await paymentService.charge(dto);       // পুরো অর্ডার ব্যর্থ
  await emailService.sendConfirmation(dto);
  await analyticsService.track(dto);
  return order;
}

// ✅ ভালো: যা ব্যবসায়িকভাবে জরুরি শুধু তাই সিঙ্ক্রোনাস
async function createOrder(dto) {
  // এগুলো ব্যর্থ হলে অর্ডারই হওয়া উচিত নয়
  await inventoryService.reserve(dto);
  const payment = await paymentService.charge(dto);
  const order = await orderRepo.save({ ...dto, paymentId: payment.id });

  // এগুলো পরে হলেও চলে — ইউজারকে আটকে রাখার দরকার নেই
  await outbox.publish('order.created', { orderId: order.id });
  return order;                            // দ্রুত রেসপন্স
}</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>অ্যাসিঙ্ক্রোনাস করলে ইউজারকে ফলাফল কীভাবে জানাবেন (polling, WebSocket, webhook)?</li>
        <li>একাধিক সার্ভিসে ছড়ানো ট্রানজেকশন কীভাবে সামলাবেন (Saga)?</li>
        <li>gRPC ব্যবহার করলে ব্রাউজার ক্লায়েন্টকে কীভাবে সার্ভ করবেন?</li>
      </ul>
    `
  },
  {
    id: "sdi-22",
    category: "System Design",
    difficulty: "Advanced",
    tags: ["Cross-Topic","React","Node.js","Real-time"],
    question: "React frontend এবং Node.js backend-এর মধ্যে real-time যোগাযোগ কীভাবে করবেন? WebSocket, SSE এবং Polling-এর মধ্যে কোনটি কখন?",
    answer: `
      <p>তিনটি পদ্ধতিরই আলাদা জায়গা আছে। ভুল পছন্দ করলে হয় অপ্রয়োজনীয় জটিলতা, নয়তো অপ্রয়োজনীয় সার্ভার লোড তৈরি হয়।</p>
      <pre class="mermaid">
flowchart TD
    Q{"ডেটা কি দুই দিকেই<br/>যাবে?"} -->|হ্যাঁ| WS["WebSocket<br/>চ্যাট, গেম, কোলাবরেশন"]
    Q -->|না, শুধু সার্ভার→ক্লায়েন্ট| F{"আপডেট কি<br/>ঘন ঘন আসে?"}
    F -->|হ্যাঁ| SSE["Server-Sent Events<br/>নোটিফিকেশন, লাইভ ফিড"]
    F -->|না, কালেভদ্রে| POLL["Polling<br/>সহজ, যথেষ্ট"]
      </pre>
      <span class="diagram-caption">দ্বিমুখী দরকার না হলে WebSocket অতিরিক্ত জটিলতা</span>
      <table>
        <tr><th>দিক</th><th>Polling</th><th>SSE</th><th>WebSocket</th></tr>
        <tr><td>দিক</td><td>ক্লায়েন্ট → সার্ভার</td><td>সার্ভার → ক্লায়েন্ট</td><td>দ্বিমুখী</td></tr>
        <tr><td>প্রোটোকল</td><td>HTTP</td><td>HTTP</td><td>ws:// (আপগ্রেড)</td></tr>
        <tr><td>অটো-রিকানেক্ট</td><td>প্রযোজ্য নয়</td><td>✅ বিল্ট-ইন</td><td>❌ নিজে লিখতে হয়</td></tr>
        <tr><td>প্রক্সি/ফায়ারওয়াল</td><td>সমস্যা নেই</td><td>সমস্যা নেই</td><td>মাঝে মাঝে ব্লকড</td></tr>
        <tr><td>স্কেলিং</td><td>সহজ (stateless)</td><td>মাঝারি</td><td>কঠিন (stateful)</td></tr>
        <tr><td>সার্ভার খরচ</td><td>বেশি (অপ্রয়োজনীয় কল)</td><td>কম</td><td>কম</td></tr>
      </table>
      <h4>SSE — সবচেয়ে অবমূল্যায়িত বিকল্প</h4>
      <p>নোটিফিকেশন, লাইভ ড্যাশবোর্ড, প্রগ্রেস বার, AI টোকেন স্ট্রিমিং — এসবের জন্য SSE যথেষ্ট এবং WebSocket-এর চেয়ে অনেক সহজ। এটি সাধারণ HTTP, তাই বিদ্যমান auth, proxy ও লোড ব্যালেন্সার বিনা পরিবর্তনে কাজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ---- Node.js / Express দিকে ----
app.get('/api/notifications/stream', authenticate, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'      // ⚠️ Nginx-এর বাফারিং বন্ধ করতে আবশ্যক
  });

  const send = (data) => res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  const onNotify = (n) => send(n);
  events.on(\`user:\${req.user.id}\`, onNotify);

  // প্রক্সি টাইমআউট এড়াতে হার্টবিট
  const hb = setInterval(() => res.write(': ping\\n\\n'), 25_000);

  req.on('close', () => {                 // লিক ঠেকাতে অবশ্যই পরিষ্কার করুন
    clearInterval(hb);
    events.off(\`user:\${req.user.id}\`, onNotify);
  });
});

// ---- React দিকে ----
useEffect(() => {
  const es = new EventSource('/api/notifications/stream', { withCredentials: true });
  es.onmessage = (e) => setNotifications(prev => [JSON.parse(e.data), ...prev]);
  es.onerror = () => { /* ব্রাউজার নিজেই রিকানেক্ট করবে */ };
  return () => es.close();
}, []);</code></pre>
      </div>
      <h4>একাধিক সার্ভারে স্কেল করার সমস্যা</h4>
      <p>WebSocket/SSE কানেকশন একটি নির্দিষ্ট সার্ভারের সাথে বাঁধা। ইউজার A সার্ভার ১-এ আর ইউজার B সার্ভার ২-এ থাকলে, A-র পাঠানো মেসেজ B পাবে না। সমাধান — <strong>Redis Pub/Sub</strong> (বা Socket.IO Redis adapter) দিয়ে সার্ভারগুলোর মধ্যে ব্রডকাস্ট করা।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>WebSocket কানেকশনে অথেন্টিকেশন কীভাবে করবেন (হেডার পাঠানো যায় না)?</li>
        <li>১ লাখ সমান্তরাল WebSocket কানেকশন কীভাবে সামলাবেন?</li>
        <li>কানেকশন ছিঁড়ে গেলে মিস হওয়া মেসেজ কীভাবে ফিরিয়ে দেবেন?</li>
      </ul>
    `
  }
];
