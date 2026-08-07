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
,

  {
    id: "db-11",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Internals","RDBMS","ACID"],
    question: "RDBMS-এ WAL (Write-Ahead Logging) কী এবং এটি কীভাবে ACID Durability নিশ্চিত করে?",
    answer: `
<p><strong>Write-Ahead Logging (WAL)</strong> হলো ডাটাবেজ ইঞ্জিনের একটি বৈশিষ্ট্য যা নিশ্চিত করে যে ডাটাবেজ ফাইলে পরিবর্তনের আগে সেই পরিবর্তনের লগ ডিস্কে সিঙ্ক্রোনাসলি রাইট করা হবে। সার্ভার ক্র্যাশ করলে রিস্টার্টের সময় WAL রিড করে রিকভারি চালানো হয়।</p>
    `
  },
  {
    id: "db-12",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["SQL","Programmability","RDBMS"],
    question: "Stored Procedures, User-Defined Functions (UDF) এবং Triggers-এর মধ্যে মূল পার্থক্য কী?",
    answer: `
<p><strong>Stored Procedure:</strong> বিজনেস লজিক চালায়, একাধিক রেজাল্ট দিতে পারে, CALL দিয়ে ইনভোক করা হয়।</p>
    <p><strong>UDF Function:</strong> একক ভ্যালু রিটান করে, SELECT-এ ব্যবহৃত হয়।</p>
    <p><strong>Trigger:</strong> INSERT/UPDATE/DELETE ইভেন্টে স্বয়ংক্রিয়ভাবে এক্সিকিউট হয়।</p>
    `
  },
  {
    id: "db-13",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ORM","Performance","SQL"],
    question: "ORM-এ N+1 Query Problem কী এবং Eager Loading (JOIN / Include) দিয়ে এটি কীভাবে সমাধান করা হয়?",
    answer: `
<p>১টি মেইন অবজেক্ট লিস্ট আনার জন্য ১টি কুয়েরি চালানো এবং পরে প্রতিটি আইটেমের রিলেটেড ডেটার জন্য N-সংখ্যক কুয়েরি চালানোই হলো N+1 প্রবলেম। Eager Loading (JOIN) ব্যবহার করে সিঙ্গেল কুয়েরিতে পুরো ডেটা তুলে আনলে এটি সমাধান হয়।</p>
    `
  },
  {
    id: "db-14",
    category: "Database",
    difficulty: "Beginner",
    tags: ["Integrity","Foreign Key","SQL"],
    question: "Foreign Key Constraints এবং ON DELETE CASCADE কী?",
    answer: `
<p>Foreign Key টেবিলগুলোর সম্পর্ক টিকিয়ে রাখে। <code>ON DELETE CASCADE</code> দিলে প্যারেন্ট রেকর্ড ডিলিট হলে স্বয়ংক্রিয়ভাবে সকল সম্পর্কিত চাইল্ড রেকর্ড মুছে যায়।</p>
    `
  },
  {
    id: "db-15",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Architecture","Replication","Scaling"],
    question: "Database Master-Slave Replication এবং Read Replicas কীভাবে কাজ করে?",
    answer: `
<p>Master Node সকল Write অপারেশন গ্রহণ করে এবং Replication Log তৈরি করে। Read Replicas সেই লগ সিঙ্ক করে রিড-অনলি (SELECT) সেবা দিয়ে ট্রাফিক স্কেল করে।</p>
    `
  },
  {
    id: "db-16",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Distributed Systems","CAP Theorem","Architecture"],
    question: "Distributed Database Design-এ CAP Theorem কী?",
    answer: `
<p>CAP Theorem অনুযায়ী ডিস্ট্রিবিউটেড ডাটাবেজে Consistency (C), Availability (A), এবং Partition Tolerance (P)-এর মধ্যে একসাথে যেকোনো ২টি কেবল নিশ্চিত করা যায় (CP বা AP)।</p>
    `
  },
  {
    id: "db-17",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["DevOps","Migrations","Schema"],
    question: "Database Migration Management (Knex/Prisma/Flyway) কী?",
    answer: `
<p>ডাটাবেজ স্কিমা ফাইল ভার্সন কন্ট্রোল করার পদ্ধতি। Up/Down মাইগ্রেশন ফাইলের মাধ্যমে টিমের সবার ডাটাবেজ স্কিমা একই স্টেটাস বজায় রাখে।</p>
    `
  },
  {
    id: "db-18",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["SQL","CTE","Queries"],
    question: "SQL-এ Common Table Expressions (CTE) এবং Recursive Queries কী?",
    answer: `
<p>WITH ক্লজ দিয়ে অস্থায়ী রেজাল্ট সেট তৈরি করাকে CTE বলে। Hierarchy ডেটা (Org Chart / Category Tree) সার্চে <code>WITH RECURSIVE</code> ব্যবহার করা হয়।</p>
    `
  },
  {
    id: "db-19",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Transactions", "Isolation Levels", "MVCC"],
    question: "ACID Transactions: 4 Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) এবং Dirty Read, Non-Repeatable Read, Phantom Read কী?",
    answer: `
<p><strong>Read Uncommitted:</strong> অন-কমিক ডেটা পড়ে (Dirty Read ঘটে)।</p><p><strong>Read Committed:</strong> কেবল কমিক হওয়া ডেটা পড়ে (Dirty Read মুক্ত)।</p><p><strong>Repeatable Read:</strong> ট্রানজেকশন চলাকালীন একই ডাটা পরিবর্তিত হয় না (Phantom Read ঘটতে পারে)।</p><p><strong>Serializable:</strong> সম্পূর্ণ আলাদা ও সিকুয়েনশিয়াল লক গ্যারান্টি (জিরো কনকারেন্সি এরর)।</p>
    `
  },
  {
    id: "db-20",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Indexing", "B-Tree vs Hash", "Composite Index"],
    question: "B-Tree Indexing Mechanism, Composite Indexing, Leftmost Prefix Rule এবং Index Scan vs Index Seek কী?",
    answer: `
<p><strong>B-Tree Index:</strong> O(log N) সময়ের মধ্যে ডেটা খোঁজে।</p><p><strong>Composite Index (A, B, C):</strong> কেবল তখনই কাজ করে যদি কোয়েরিতে বামের কলাম (Leftmost Prefix A) যুক্ত থাকে।</p><p><strong>Index Seek:</strong> নির্দিষ্ট পয়েন্টার ধরে সরাসরি বি-ট্রি পাতা রিড করা।</p>
    `
  },
  {
    id: "db-21",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Performance", "EXPLAIN ANALYZE", "Query Plan"],
    question: "EXPLAIN ANALYZE দিয়ে SQL Query Execution Plan এবং Performance Bottlenecks কীভাবে চিহ্নিত করবেন?",
    answer: `
<p>কোয়েরির আগে <code>EXPLAIN ANALYZE</code> চালালে ডাটাবেজের প্ল্যানিং টাইম, এক্সিকিউশন টাইম, Seq Scan (Full Table Scan), এবং Index Scan-এর প্রকৃত বিবরণ পাওয়া যায়।</p>
    `
  },
  {
    id: "db-22",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Optimization", "Sharding", "Partitioning"],
    question: "Database Partitioning (Range, List, Hash) vs Database Sharding-এর মধ্যে মৌলিক পার্থক্য কী?",
    answer: `
<p><strong>Partitioning:</strong> একই ডাটাবেজ সার্ভারের ভেতরে একটি বড় টেবিলকে কলাম বা রেঞ্জ ধরে ছোট ছোট সাব-টেবিলে ভাগ করা।</p><p><strong>Sharding:</strong> ডাটাবেজকে আলাদা আলাদা ফিজিক্যাল সার্ভার নোডে হরাইজন্টালি ডিস্ট্রিবিউট করা।</p>
    `
  },
  {
    id: "db-23",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "JSONB", "GIN Index"],
    question: "PostgreSQL JSON vs JSONB, GIN Indexing, এবং Expression Indexing কীভাবে সার্চ গতি বাড়ায়?",
    answer: `
<p><strong>JSON:</strong> প্লেন টেক্সট (ধীরগতি)। <strong>JSONB:</strong> বাইনারি ফরম্যাট (পার্সিং ছাড়াই দ্রুত রিড)। JSONB ফিল্ডে <code>CREATE INDEX ON table USING gin (data);</code> করলে ডকুমেন্টের ভেতরে ফুল-টেক্সট সার্চ ফাস্ট হয়।</p>
    `
  },
  {
    id: "db-24",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Window Functions", "OVER", "ROW_NUMBER"],
    question: "SQL Window Functions (ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD()) কীভাবে কাজ করে?",
    answer: `
<p><code>OVER (PARTITION BY category ORDER BY price DESC)</code> দিয়ে সারি গ্রুপ করে প্রতি গ্রুপের ভেতরে র‍্যাঙ্ক গণনা করা (GROUP BY এর মতো রো সংকুচিত না করে প্রতিটি সারিতে রেজাল্ট দেয়)।</p>
    `
  },
  {
    id: "db-25",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Concurrency", "Pessimistic Locking", "Optimistic Locking"],
    question: "Pessimistic Locking (SELECT ... FOR UPDATE) vs Optimistic Locking (Version Column) কখন কোনটা ব্যবহার করবেন?",
    answer: `
<p><strong>Pessimistic Lock:</strong> রো সরাসরি লক করে অন্য ট্রানজেকশন আটকে দেয় (হাই কনফ্লিক্ট ব্যাংক ট্রানজেকশন)।</p><p><strong>Optimistic Lock:</strong> লক না করে <code>version</code> কলাম মিলিয়ে রাইট করে, কনফ্লিক্ট হলে রিট্রি করে।</p>
    `
  },
  {
    id: "db-26",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["CTE", "WITH RECURSIVE", "Hierarchical"],
    question: "Common Table Expressions (CTE) এবং WITH RECURSIVE দিয়ে অসীম নেস্টেড ক্যাটাগরি ট্রি (Tree Structure) কীভাবে কোয়েরি করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div><pre><code>WITH RECURSIVE CategoryTree AS (
  SELECT id, name, parent_id FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id FROM categories c
  INNER JOIN CategoryTree ct ON c.parent_id = ct.id
)
SELECT * FROM CategoryTree;</code></pre></div>
    `
  },
  {
    id: "db-27",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Connection Pooling", "PgBouncer", "Idle Sockets"],
    question: "Database Connection Pooling (PgBouncer / HikariCP) এবং Max Connections Tuning কেন জরুরি?",
    answer: `
<p>প্রতিটি নতুন ডাটাবেজ কানেকশন কয়েক মেগাবাইট RAM এবং CPU প্রসেস খরচ করে। কানেকশন পুলিং পুরোনো সকেট রিইউজ করে হাজার হাজার রিড রিকুয়েস্ট হ্যান্ডেল করতে ডাটাবেজ ডাউন হওয়া আটকায়।</p>
    `
  },
  {
    id: "db-28",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["ORM", "N+1 Problem", "Eager Loading"],
    question: "ORM (Prisma / TypeORM / Sequelize)-এ N+1 Query Problem কী এবং Eager Loading / JOIN দিয়ে এটি কীভাবে সমাধান করবেন?",
    answer: `
<p>১টি প্রধান তালিকায় N-সংখ্যক চাইল্ড রিলেটেড ডাটা আনতেই আলাদা N-টি ডাটাবেজ কোয়েরি চ্যাটারিং ফায়ার হওয়া। <code>include</code> বা <code>JOIN</code> ব্যবহার করে ১টি কোয়েরিতেই সমাধান করা।</p>
    `
  },
  {
    id: "db-29",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "WAL", "Checkpoints"],
    question: "Write-Ahead Logging (WAL) এবং PostgreSQL Checkpoints কীভাবে ক্র্যাশ রিকভারি নিশ্চিত করে?",
    answer: `
<p>ডাটাবেজ আসল ডেটা ফাইলে লেখার আগে সকল পরিবর্তন <strong>WAL File</strong>-এ ডিস্কে স্থায়ীভাবে সংরক্ষণ করে। সার্ভার হঠাৎ পাওয়ার কাট হলে WAL রিড করে ইনস্ট্যান্ট মেমোরি স্টেট রিকভার করে।</p>
    `
  },
  {
    id: "db-30",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Schema", "Migrations", "Zero Downtime"],
    question: "Database Migrations (Zero Downtime Schema Migration Pattern) কীভাবে পরিচালনা করবেন?",
    answer: `
<p>একসাথে কলাম রিনেম না করে ৩টি ফেজে সম্পন্ন করা: ১. নতুন কলাম যোগ করা, ২. ব্যাকগ্রাউন্ডে পুরাতন কলাম থেকে ডেটা ব্যাকফিল করা, ৩. ওল্ড কলাম রিমুভ করা।</p>
    `
  },
  {
    id: "db-31",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Architecture", "CAP Theorem", "PACELC"],
    question: "CAP Theorem (Consistency, Availability, Partition Tolerance) এবং PACELC Theorem-এর আধুনিক ব্যাখ্যা কী?",
    answer: `
<p>ডিস্ট্রিবিউটেড ডাটাবেজে নেটওয়ার্ক পার্টিশন (P) হলে আপনাকে Consistency (C) অথবা Availability (A) এর যেকোনো একটি নির্বাচন করতে হবে। PACELC বলে স্বাভাবিক সময়ে ল্যাটেন্সি (L) ও কনসিস্টেন্সি (C) এর মধ্যেও চুক্তি করতে হয়।</p>
    `
  },
  {
    id: "db-32",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Replication", "Master-Slave", "Logical"],
    question: "Master-Slave Replication (Physical Streaming vs Logical Replication) এবং Replication Lag কী?",
    answer: `
<p><strong>Physical Streaming:</strong> বাইনারি WAL ফাইল সরাসরি কপি করা (হুবহু মিরর)।</p><p><strong>Logical Replication:</strong> নির্দিষ্ট টেবিল বা ইভেন্ট স্ট্রিম রেপ্লিকেট করা। <strong>Replication Lag:</strong> মাস্টার ও স্লেভের ডাটা প্রাপ্তির সময় পার্থক্য।</p>
    `
  },
  {
    id: "db-33",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Foreign Keys", "CASCADE", "Triggers"],
    question: "ON DELETE CASCADE, ON DELETE SET NULL, এবং Foreign Key Constraint Triggers-এর সঠিক ব্যবহার কী?",
    answer: `
<p><strong>CASCADE:</strong> পেরেন্ট সারির সাথে সাথে চাইল্ড সারি মুছে ফেলা। <strong>SET NULL:</strong> চাইল্ড সারির পয়েন্টার ফাঁকা করা। ভারী লজিকের জন্য ডাটাবেজ Triggers ব্যবহার করা।</p>
    `
  },
  {
    id: "db-34",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Normalization", "3NF", "Denormalization"],
    question: "Database Normalization (1NF, 2NF, 3NF, BCNF) vs Denormalization — পারফরম্যান্স ও ডেটা ইন্টিগ্রিটি ব্যালেন্স কীভাবে করবেন?",
    answer: `
<p>নরম্যালাইজেশন ডুপ্লিকেট ডেটা মুছে ইন্টিগ্রিটি নিশ্চিত করে (রাইট ফাস্ট, রিড কস্টলি JOIN)। ডি-নরম্যালাইজেশন রিড পারফরম্যান্স বাড়াতে হিসাব করা বা ফ্রিকুয়েন্ট ফিল্ড ডুপ্লিকেট করে রাখে।</p>
    `
  },
  {
    id: "db-35",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "VACUUM", "Bloat"],
    question: "PostgreSQL MVCC Bloat এবং Autovacuum / VACUUM FULL কীভাবে মেমোরি ফিনিক্স করে?",
    answer: `
<p>Postgres UPDATE বা DELETE করলে পুরোনো ডাটা রো ফাইল সিস্টেমে 'Dead Tuples' হিসেবে থেকে যায়। <code>Autovacuum</code> ব্যাকগ্রাউন্ডে এগুলো পরিষ্কার করে মেমোরি রিসাইকেল করে।</p>
    `
  },
  {
    id: "db-36",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Triggers", "UDF", "Stored Procedures"],
    question: "Stored Procedures vs User-Defined Functions (UDF) vs Database Triggers-এর কাজের পার্থক্য কী?",
    answer: `
<p><strong>Procedure:</strong> ট্রানজেকশন পরিচালনা করে (COMMIT/ROLLBACK)।</p><p><strong>UDF:</strong> ভ্যালু বা টেবিল রিটার্ন করে। <strong>Trigger:</strong> INSERT/UPDATE/DELETE ইভেন্টে স্বয়ংক্রিয়ভাবে স্পন হয়।</p>
    `
  },
  {
    id: "db-37",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Indexing", "Partial Index", "Covering Index"],
    question: "Partial Index and Covering Index (INCLUDE Clause) কীভাবে কোয়েরি অপটিমাইজ করে?",
    answer: `
<p><strong>Partial Index:</strong> <code>WHERE status = 'active'</code> দিয়ে কেবল ১০% প্রয়োজনীয় ডেটায় ছোট ইনডেক্স করা।</p><p><strong>Covering Index:</strong> ইনডেক্সের সাথে <code>INCLUDE (name, email)</code> যোগ করায় অরিজিনাল টেবিলে না গিয়ে সরাসরি ইনডেক্স থেকে রেসপন্স দেওয়া।</p>
    `
  },
  {
    id: "db-38",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pflow", "Listen/Notify"],
    question: "PostgreSQL LISTEN / NOTIFY দিয়ে রিয়েল-টাইম ডাটাবেজ চেঞ্জ নোটিফিকেশন কীভাবে ট্র্যাকিং করবেন?",
    answer: `
<p><code>NOTIFY channel_name, 'payload'</code> দিলে নোড ব্যাকএন্ড সকেট <code>LISTEN channel_name</code> দিয়ে কোনো এক্সটার্নাল মেসেজ ব্রোকার ছাড়াই রিয়েল-টাইম ডাটা ইভেন্ট সাবস্ক্রাইব করতে পারে।</p>
    `
  },
  {
    id: "db-39",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Optimization", "Bulk Insert", "COPY"],
    question: "PostgreSQL COPY Command vs Bulk INSERT — ১ লাখ রেকর্ড ১ সেকেন্ডে আপলোডের উপায় কী?",
    answer: `
<p>স্বাভাবিক INSERT কমান্ডের বদলে <code>COPY table_name FROM 'data.csv' WITH CSV HEADER;</code> ব্যবহার করলে এটি ডাটাবেজের বাইনারি স্ট্রিম দিয়ে সরাসরি ডিস্কে বাল্ক ইনসার্ট সম্পন্ন করে।</p>
    `
  },
  {
    id: "db-40",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Types", "UUID vs AutoIncrement", "Performance"],
    question: "Primary Keys: Auto-increment INT vs UUID v4 vs UUID v7 (Time-ordered) — বি-ট্রি ইনডেক্স পারফরম্যান্স তুলনা কী?",
    answer: `
<p>UUID v4 সম্পূর্ণ র্যান্ডম হওয়ায় B-Tree Index Fragmentation ঘটায় (স্লো)। <strong>UUID v7</strong> টাইমস্ট্যাম্প অর্ডারড হওয়ায় Auto-increment-এর স্পিড ও UUID-এর ডিস্ট্রিবিউটেড গ্লোবাল ইউনিকত্ব একসাথে দেয়।</p>
    `
  },
  {
    id: "db-41",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Joins", "Nested Loop", "Hash Join"],
    question: "Database Join Algorithms: Nested Loop Join vs Hash Join vs Merge Join কীভাবে কাজ করে?",
    answer: `
<p><strong>Nested Loop:</strong> ১টি ছোট টেবিল অন্য টেবিলের প্রতি সারিতে লুকআপ করে (ছোট ডেটাসেট)।</p><p><strong>Hash Join:</strong> মেমোরিতে হ্যাশ টেবিল বানায় (বড় আন-সর্টেড ডেটাসেট)।</p><p><strong>Merge Join:</strong> ২ সর্টেড টেবিল সমান্তরাল মার্জ করে।</p>
    `
  },
  {
    id: "db-42",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pg_stat_activity", "Slow Queries"],
    question: "PostgreSQL pg_stat_activity এবং pg_stat_statements দিয়ে স্লো কোয়েরি ও ডেডলক কীভাবে চিহ্নিত করবেন?",
    answer: `
<p><code>SELECT * FROM pg_stat_activity WHERE state = 'active';</code> দিয়ে ঝুলন্ত ব্লকিং কোয়েরি দেখা এবং <code>pg_stat_statements</code> দিয়ে সবচেয়ে বেশি সময় নেওয়া টপ কোয়েরি তালিকা বিশ্লেষণ করা।</p>
    `
  },
  {
    id: "db-43",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "Tablespace", "Storage"],
    question: "PostgreSQL Tablespaces দিয়ে আলাদা ফিজিক্যাল ডিস্কে (NVMe SSD vs HDD) টেবিল স্টোর কীভাবে করবেন?",
    answer: `
<p>হট পারফরম্যান্স টেবিল দ্রুতগতির NVMe SSD-তে থাকা Tablespace-এ রাখা এবং ওল্ড হিস্ট্রি ডাটা ধীরগতির সস্তা HDD-তে তৈরি Tablespace-এ ডাইভার্ট করা।</p>
    `
  },
  {
    id: "db-44",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["Queries", "GROUP BY", "HAVING"],
    question: "GROUP BY vs HAVING vs WHERE Clause-এর এক্সিকিউশন অর্ডার ও কাজের পার্থক্য কী?",
    answer: `
<p><strong>WHERE:</strong> গ্রুপ করার আগেই ইনডিভিজুয়াল রো ফিল্টার করে।</p><p><strong>GROUP BY:</strong> সারিগুলোকে সমবেত করে।</p><p><strong>HAVING:</strong> এগ্রিগেটেড রেজাল্টের (SUM/AVG) ওপর ফিল্টার চালায়।</p>
    `
  },
  {
    id: "db-45",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Security", "SQL Injection", "Parameterized Queries"],
    question: "SQL Injection (SQLi) কীভাবে কাজ করে এবং Parameterized Prepared Statements এটি কেন শতভাগ প্রতিরোধ করে?",
    answer: `
<p>Prepared Statements SQL কোয়েরি কোড এবং ইউজার ইনপুট ডাটা দুটোকে সম্পূর্ণ আলাদা কার্নেল স্পেসে প্রসেস করায় ইনপুটের ভেতরের কোনো SQL ক্যারেক্টার (<code>' OR '1'='1</code>) এক্সিকিউটেবল কোড হতে পারে না।</p>
    `
  },
  {
    id: "db-46",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Extensions", "pg_trgm"],
    question: "PostgreSQL Extension: pg_trgm (Trigram Index) দিয়ে Fuzzy Text Search কীভাবে করবেন?",
    answer: `
<p><code>CREATE INDEX ON users USING gin (name gin_trgm_ops);</code> করলে বানানের ভুল থাকা সত্ত্বেও (e.g. 'Nazmul' vs 'Najmul') মিলি-সেকেন্ডে <code>%</code> সিমিলারিটি কোয়েরি করা যায়।</p>
    `
  },
  {
    id: "db-47",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "FDW", "Foreign Data Wrapper"],
    question: "PostgreSQL Foreign Data Wrappers (postgres_fdw) দিয়ে ডিস্ট্রিবিউটেড ডাটাবেজ কোয়েরি কীভাবে করবেন?",
    answer: `
<p>অন্য রিমোট PostgreSQL বা MySQL সার্ভারকে কাস্টম Foreign Table হিসেবে মাউন্ট করে বর্তমান ডাটাবেজ থেকেই সরাসরি <code>JOIN</code> চালানোর কৌশল।</p>
    `
  },
  {
    id: "db-48",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "COLLATE", "Case Insensitive"],
    question: "PostgreSQL CITEXT Data Type vs Lowercase Indexing — Case-Insensitive Search কীভাবে করবেন?",
    answer: `
<p><code>citext</code> টাইপ কলাম নেটিভভাবে কেস-ইনসেনসিটিভ সার্চ দেয়। অথবা <code>CREATE INDEX ON users (LOWER(email));</code> দিয়ে এক্সপ্রেশন ইনডেক্স তৈরি করা।</p>
    `
  },
  {
    id: "db-49",
    category: "Database (SQL)",
    difficulty: "Advanced",
    tags: ["Resilience", "Two-Phase Commit", "2PC"],
    question: "Two-Phase Commit (2PC) Protocol দিয়ে Multi-Database Distributed Transaction কীভাবে সামলাবেন?",
    answer: `
<p>Prepare Phase (সব DB কি কমিক করতে প্রস্তুত?) এবং Commit Phase (সবাই কনফার্ম করলে এক সাথে চূড়ান্ত রাইট)।</p>
    `
  },
  {
    id: "db-50",
    category: "Database (SQL)",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Constraints", "CHECK"],
    question: "PostgreSQL CHECK Constraints and EXCLUSION Constraints-এর সিকিউরিটি সুবিধা কী?",
    answer: `
<p><code>CHECK (price > 0)</code> দিয়ে ডাটাবেজ লেভেলেই ভুল মান ইনসার্ট ব্লক করা এবং <code>EXCLUSION</code> দিয়ে ওভারলেপিং ডেট-রেঞ্জ বা বুকিং কনফ্লিক্ট আটকানো।</p>
    `
  }
];
