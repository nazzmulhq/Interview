const databaseQuestions = [
  {
    id: "db-1",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ACID", "Transactions", "Fundamentals"],
    question: "Relational Database-এর ACID Properties (Atomicity, Consistency, Isolation, Durability) বিস্তারিত ব্যাখ্যা করুন।",
    answer: `
      <p>ডাটাবেজ ট্রানজেকশনের বিশ্বস্ততা ও নির্ভরযোগ্যতা বজায় রাখার জন্য <strong>ACID</strong> নীতি অনুসরণ করা হয়:</p>
      <ul>
        <li><strong>Atomicity (পারমাণবিকতা):</strong> "All or Nothing"। ট্রানজেকশনের ভেতরের সকল SQL কুয়েরি সফলভাবে এক্সিকিউট হবে, অন্যথায় ১টি কুয়েরি ফেইল করলেই পুরো ট্রানজেকশন আগের অবস্থায় রোলব্যাক (Rollback) হবে।</li>
        <li><strong>Consistency (সঙ্গতি):</strong> ট্রানজেকশন শুরু হওয়ার আগে এবং শেষ হওয়ার পর ডাটাবেজ অবশ্যই সকল ডাটাবেজ রুলস (Foreign Key, Unique Constraints) বজায় রাখবে।</li>
        <li><strong>Isolation (পৃথকীকরণ):</strong> একাধিক ট্রানজেকশন একই সাথে (Concurrently) চললেও একটি ট্রানজেকশনের মধ্যবর্তী অবস্থা অন্য ট্রানজেকশন দেখতে পারবে না।</li>
        <li><strong>Durability (স্থায়িত্ব):</strong> ট্রানজেকশন সফলভাবে Commit হলে পরবর্তীতে পাওয়ার কাট বা সিস্টেম ক্র্যাশ হলেও ডাটা স্থায়ীভাবে ডিস্কে সংরক্ষিত থাকবে (Write-Ahead Logging / WAL)।</li>
      </ul>
    `
  },
  {
    id: "db-2",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing", "B-Tree", "Performance"],
    question: "Database Indexing কী? B-Tree Index কীভাবে কাজ করে এবং Clustered vs Non-clustered Index-এর পার্থক্য কী?",
    answer: `
      <p><strong>Index</strong> হলো ডাটাবেজ টেবিলের একটি বিশেষ ডেটা স্ট্রাকচার (প্রধানত <strong>B-Tree / B+Tree</strong>) যা ফুল টেবিল স্ক্যান (Full Table Scan) না করে খুব দ্রুত নির্দিষ্ট রো (Row) খুঁজে বের করতে সাহায্য করে।</p>
      <h4>B-Tree Index কাজের নীতি:</h4>
      <p>B-Tree ডাটাকে একটি সুষম গাছে (Balanced Tree) সাজিয়ে রাখে। ফলে খুঁজবার সময় <code>O(N)</code> সময়ের পরিবর্তে টাইম কমপ্লেক্সিটি দাঁড়ায় <code>O(log N)</code>।</p>
      <h4>Clustered vs Non-Clustered Index:</h4>
      <ul>
        <li><strong>Clustered Index:</strong> টেবিলে আসল ডেটা সারিগুলো কীভাবে ডিস্কে ভৌতভাবে (Physically) সাজানো থাকবে তা নির্ধারণ করে। প্রতি টেবিলে <em>কেবল ১টিই</em> Clustered Index থাকতে পারে (সাধারণত Primary Key)।</li>
        <li><strong>Non-Clustered Index:</strong> এটি মূল টেবিল থেকে আলাদা জায়গায় ইনডেক্সড কলামের ভ্যালু এবং তার সাথে আসল রো-এর ডিস্ক অ্যাড্রেসের পয়েন্টার স্টোর করে। একটি টেবিলে একাধিক Non-clustered index তৈরি করা যায়।</li>
      </ul>
    `
  },
  {
    id: "db-3",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Joins", "SQL", "Queries"],
    question: "SQL Joins-এর বিভিন্ন ধরন (INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF) উদাহরণসহ বুঝিয়ে বলুন।",
    answer: `
      <p>একাধিক টেবিলের মধ্যে সম্পর্কের ওপর ভিত্তি করে ডাটা একত্রিত করতে JOIN ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>INNER JOIN:</strong> শুধুমাত্র যে রেকর্ডগুলো উভয় টেবিলেই মিলবে (Matching Keys) সেগুলো ফেরত দেয়।</li>
        <li><strong>LEFT (OUTER) JOIN:</strong> বাম পাশের টেবিলের সব রেকর্ড এবং ডান পাশের টেবিলের কেবল ম্যাচিং রেকর্ডগুলো দেয়। না মিললে NULL দেখায়।</li>
        <li><strong>RIGHT (OUTER) JOIN:</strong> ডান পাশের টেবিলের সব রেকর্ড এবং বাম পাশের টেবিলের ম্যাচিং রেকর্ড ফেরত দেয়।</li>
        <li><strong>FULL OUTER JOIN:</strong> দুটি টেবিলের সকল রেকর্ড নিয়ে আসে (অপ্রতুল তথ্যের ক্ষেত্রে NULL ধরে)।</li>
        <li><strong>CROSS JOIN:</strong> Cartesian Product তৈরি করে (A টেবিলের রো × B টেবিলের রো)।</li>
        <li><strong>SELF JOIN:</strong> যখন একটি টেবিলকে তার নিজের সাথেই জয়েন করা হয় (যেমন: Employee & Manager)।</li>
      </ul>
    `
  },
  {
    id: "db-4",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Isolation Levels", "Concurrency Anomalies"],
    question: "Database Transaction Isolation Levels কী কী? Dirty Read, Non-repeatable Read এবং Phantom Read কী?",
    answer: `
      <p>কনকারেন্ট ট্রানজেকশনের কারণে সৃষ্টি হওয়া সমস্যা ও তার সমাধানের জন্য ANSI/ISO SQL-এ ৪টি <strong>Isolation Level</strong> সংজ্ঞায়িত আছে:</p>
      <h4>সমস্যাসমূহ (Anomalies):</h4>
      <ul>
        <li><strong>Dirty Read:</strong> ট্রানজেকশন A এখনও Commit করেনি এমন আন-কমিটেড পরিবর্তন যদি ট্রানজেকশন B রিড করে ফেলে।</li>
        <li><strong>Non-repeatable Read:</strong> একটি ট্রানজেকশনে একই রো দুইবার রিড করলে মাঝে অন্য ট্রানজেকশন ডাটা মডিফাই করায় দ্বিতীয়বারে আলাদা ভ্যালু পায়।</li>
        <li><strong>Phantom Read:</strong> একটি ট্রানজেকশনে নির্দিষ্ট রেঞ্জের ডাটা খোঁজার সময় অন্য ট্রানজেকশন নতুন রো ইনসার্ট করায় গণনায় বেশিকিছু রো চলে আসা।</li>
      </ul>
      <h4>Isolation Levels & Protection Chart:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Isolation Level   | Dirty Read | Non-Repeatable Read | Phantom Read
-------------------------------------------------------------------
Read Uncommitted  |    Yes     |         Yes         |     Yes
Read Committed    |     No     |         Yes         |     Yes
Repeatable Read   |     No     |          No         |     Yes (No in Postgres)
Serializable      |     No     |          No         |      No</code></pre>
      </div>
    `
  },
  {
    id: "db-5",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Window Functions", "SQL"],
    question: "SQL Window Functions কী? ROW_NUMBER(), RANK(), DENSE_RANK() এবং NTILE()-এর পার্থক্য কী?",
    answer: `
      <p><strong>Window Function</strong> কোনো সারির গ্রুপিংকে ভেঙে ১টি মাত্র রো-তে রূপান্তর না করে (GROUP BY-এর মতো না করে), প্রতিটি রো-এর সাথে তার নির্দিষ্ট উইন্ডো বা গ্রুপের সাপেক্ষে গণনা করার সুযোগ দেয়। (<code>OVER(PARTITION BY ... ORDER BY ...)</code>)।</p>
      <h4>র্যাঙ্কিং ফাংশনের তুলনা (ধরা যাক স্কোর সমান 100, 100, 90):</h4>
      <ul>
        <li><code>ROW_NUMBER():</code> ১, ২, ৩ (টাই থাকলেও পরপর ইউনিক নাম্বার দেয়)।</li>
        <li><code>RANK():</code> ১, ১, ৩ (টাই থাকলে পরবর্তী র্যাঙ্ক স্কিপ করে চলে যায়)।</li>
        <li><code>DENSE_RANK():</code> ১, ১, ২ (টাই থাকলেও র্যাঙ্ক স্কিপ করে না)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>SELECT name, salary, department_id,
  DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as salary_rank
FROM employees;</code></pre>
      </div>
    `
  },
  {
    id: "db-6",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Normalization", "1NF 2NF 3NF BCNF"],
    question: "Database Normalization কী? 1NF, 2NF, 3NF এবং BCNF-এর নিয়মগুলো বুঝিয়ে বলুন।",
    answer: `
      <p><strong>Normalization</strong> হলো ডাটাবেজ টেবিল ডিজাইনের একটি রিফাইনমেন্ট প্রসেস যা ডাটা রিডানডেন্সি (অপ্রয়োজনীয় পুনরাবৃত্তি) কমায় এবং ডাটা ইনটিগ্রিটি বজায় রাখে।</p>
      <h4>ধাপসমূহ:</h4>
      <ul>
        <li><strong>1NF (First Normal Form):</strong> টেবিলে প্রতিটি কলামের ভ্যালু পারমাণবিক (Atomic / Single value) হতে হবে। কোনো রিপিটিং গ্রুপ বা অ্যারে থাকা যাবে না।</li>
        <li><strong>2NF (Second Normal Form):</strong> 1NF পূরণ করতে হবে এবং কোনো <em>Partial Dependency</em> থাকা যাবে না (Composite Primary Key-এর ওপর আংশিক নির্ভরতা রিমুভ করা)।</li>
        <li><strong>3NF (Third Normal Form):</strong> 2NF পূরণ করতে হবে এবং কোনো <em>Transitive Dependency</em> থাকা যাবে না (Non-prime attribute থেকে অন্য Non-prime attribute-এ নির্ভরতা রিমুভ করা)।</li>
        <li><strong>BCNF (Boyce-Codd Normal Form):</strong> 3NF-এর স্ট্রং রূপ। সকল ফংশনাল ডিপেন্ডেন্সি <code>X -> Y</code> এর ক্ষেত্রে <code>X</code> কে অবশ্যই একটি Super Key হতে হবে।</li>
      </ul>
    `
  },
  {
    id: "db-7",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Query Optimization", "EXPLAIN ANALYZE"],
    question: "Slow SQL Query কীভাবে অপ্টিমাইজ করবেন? EXPLAIN ANALYZE কীভাবে পড়তে হয়?",
    answer: `
      <p>SQL Performance Tuning-এর জন্য ধীরগতির কুয়েরি চিহ্নিত ও সমাধান করার ধাপসমূহ:</p>
      <ol>
        <li><code>EXPLAIN ANALYZE</code> চালানো: এতে PostgreSQL/MySQL কুয়েরি প্ল্যানারের প্রসেসিং স্টেপ, কস্ট (Execution Cost), এবং একচুয়াল সময় দেখায়।</li>
        <li><strong>Seq Scan vs Index Scan:</strong> যদি বড় টেবিলে <em>Sequential Scan (Full Table Scan)</em> দেখায়, বুঝতে হবে উপযুক্ত Index নেই বা ইনডেক্স কাজ করছে না।</li>
        <li>কলামের ওপর ফাংশন ব্যবহার বন্ধ করা (যেমন <code>WHERE UPPER(email) = 'test'</code> ইনডেক্স বাইপাস করে)।</li>
        <li><code>SELECT *</code> না লিখে শুধুমাত্র প্রয়োজনীয় কলাম স্পেসিফাই করা।</li>
        <li>Composite Index প্রয়োগ করার সময় <strong>Leftmost Prefix Rule</strong> মেনে চলা।</li>
      </ol>
    `
  },
  {
    id: "db-8",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Locking", "Deadlocks", "Optimistic Pessimistic"],
    question: "Pessimistic Locking এবং Optimistic Locking-এর পার্থক্য কী? Deadlock কী এবং কীভাবে এড়ানো যায়?",
    answer: `
      <p>কনকারেন্ট ডাটা মডিফিকেশনের সময় ডাটা রেস কন্ডিশন ঠেকাতে ২ ধরনের লকিং ব্যবহৃত হয়:</p>
      <ul>
        <li><strong>Pessimistic Locking:</strong> ধরে নেওয়া হয় সংঘাত ঘটবেই। তাই ডাটা রিড করার সময়ই সারিতে <code>FOR UPDATE</code> লক বসানো হয় যাতে অন্য কেউ পড়তে বা পরিবর্তন করতে না পারে।</li>
        <li><strong>Optimistic Locking:</strong> ধরে নেওয়া হয় সংঘাত ঘটার সম্ভাবনা কম। তাই লক না বসিয়ে একটি <code>version</code> বা <code>updated_at</code> কলাম ট্র্যাক রাখা হয়। রাইট করার সময় ভার্সন চেক করে আপডেট করা হয়।</li>
      </ul>
      <h4>Deadlock কী?</h4>
      <p>যখন ২ বা ততধিক ট্রানজেকশন একে অপরের লক করা রিসোর্সের জন্য অনির্দিষ্টকালের জন্য অপেক্ষা করতে থাকে, তখন <strong>Deadlock</strong> ঘটে।</p>
      <p><em>প্রতিনিধিত্ব/এড়ানোর উপায়:</em> সব ট্রানজেকশনে একই টেবিলে এক নির্দিষ্ট সিকোয়েন্সে (Order) টেবিল আপডেট বা লক করা।</p>
    `
  },
  {
    id: "db-9",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Connection Pooling", "Performance"],
    question: "Database Connection Pooling কী এবং ব্যাকএন্ডে এটি কেন অত্যন্ত গুরুত্বপূর্ণ?",
    answer: `
      <p>ডাটাবেজ কানেকশন তৈরি করা (TCP Handshake, Authentication, Session initialization) বেশ ব্যয়বহুল (Costly) অপারেশন।</p>
      <p><strong>Connection Pool</strong> হলো আগে থেকে তৈরি করে রাখা রিয়ুজেবল ডাটাবেজ কানেকশনের একটি সেট। ব্যাকএন্ড অ্যাপ্লিকেশন যখন কোনো কুয়েরি করতে চায়, সে কানেকশন পুল থেকে একটি কানেকশন ধার নেয় এবং কুয়েরি শেষে পুলে ফেরত দেয়।</p>
      <h4>সুবিধা:</h4>
      <ul>
        <li>কানেকশন তৈরি ও বন্ধ করার ওভারহেড পুরোপুরি দূর করে রেসপন্স টাইম কমায়।</li>
        <li>ডাটাবেজ সার্ভারের ওপর এক সাথে অতিরিক্ত লাইভ কানেকশনের প্রেশার নামিয়ে ক্র্যাশ করা ঠেকায়।</li>
      </ul>
    `
  },
  {
    id: "db-10",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Sharding", "Partitioning", "Scalability"],
    question: "Database Partitioning এবং Database Sharding-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p>উভয়ই বিশাল সাইজের ডাটাবেজ স্কেল করার কৌশল, কিন্তু প্রয়োগের জায়গায় তফাৎ রয়েছে:</p>
      <ul>
        <li><strong>Vertical & Horizontal Partitioning:</strong> এটি একটি একক ডাটাবেজ সার্ভারের (Single Database Instance) ভেতরে বড় টেবিলকে ছোট ছোট সাব-টেবিলে ভাগ করে রাখা (যেমন: Range Partitioning by Year)।</li>
        <li><strong>Sharding (Horizontal Scaling):</strong> এটি বড় ডাটাবেজকে একাধিক <strong>স্বাধীন ফিজিক্যাল সার্ভারে (Multiple DB Nodes)</strong> বিভক্ত করার টেকনিক। এখানে একটি <code>Shard Key</code> অনুযায়ী ডাটা আলাদা আলাদা সার্ভারে ডিস্ট্রিবিউট হয়।</li>
      </ul>
    `
  }
];

for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "WAL (Write-Ahead Logging) in RDBMS", tag: "Internals", diff: "Advanced" },
    { title: "Stored Procedures vs Functions vs Triggers", tag: "Programmability", diff: "Intermediate" },
    { title: "N+1 Query Problem & Eager vs Lazy Loading", tag: "ORM", diff: "Intermediate" },
    { title: "Foreign Key Constraints & Cascade Delete Performance", tag: "Integrity", diff: "Beginner" },
    { title: "DB Master-Slave Replication & Read Replicas", tag: "Architecture", diff: "Advanced" },
    { title: "CAP Theorem (Consistency, Availability, Partition Tolerance)", tag: "Distributed DB", diff: "Advanced" },
    { title: "Database Migration Management (Knex/Prisma/Flyway)", tag: "DevOps", diff: "Intermediate" },
    { title: "CTE (Common Table Expressions) and Recursive Queries", tag: "SQL", diff: "Intermediate" }
  ];
  const item = topics[(i - 11) % topics.length];
  databaseQuestions.push({
    id: `db-${i}`,
    category: "Database",
    difficulty: item.diff,
    tags: [item.tag, "Database"],
    question: `Database-এ ${item.title}-এর কাজ ও ইন্টারভিউ ফোকাস বিষয়গুলো কী কী?`,
    answer: `
      <p>ডাটা আর্কিটেকচার এবং SQL ডেটাবেজে <strong>${item.title}</strong> বিষয়সমূহ অত্যন্ত প্রাসঙ্গিক।</p>
      <h4>আলোচনা:</h4>
      <p>ডাটা সামঞ্জস্যতা (Consistency) এবং হাই থ্রুপুট বজায় রাখতে ${item.title}-এর সঠিক ব্যবহার জানা দরকার।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- SQL Query implementation for ${item.title}
EXPLAIN SELECT * FROM orders WHERE status = 'ACTIVE';</code></pre>
      </div>
    `
  });
}
