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
    question: "Database Indexing কী? B-Tree Index কীভাবে কাজ করে এবং কী কী ধরনের Index থাকে?",
    answer: `
      <p><strong>Index</strong> হলো ডাটাবেজ টেবিলের একটি বিশেষ ডেটা স্ট্রাকচার (প্রধানত <strong>B-Tree / B+Tree</strong>) যা ফুল টেবিল স্ক্যান (Full Table Scan) না করে খুব দ্রুত নির্দিষ্ট রো (Row) খুঁজে বের করতে সাহায্য করে।</p>
      <h4>B-Tree Index কাজের নীতি:</h4>
      <p>B-Tree ডাটাকে একটি সুষম গাছে (Balanced Tree) সাজিয়ে রাখে। ফলে খুঁজবার সময় <code>O(N)</code> সময়ের পরিবর্তে টাইম কমপ্লেক্সিটি দাঁড়ায় <code>O(log N)</code>।</p>
      <h4>সাধারণ ইনডেক্সের প্রকারভেদ:</h4>
      <ul>
        <li><strong>Primary Index (Clustered):</strong> টেবিলের Primary Key-এর ওপর স্বয়ংক্রিয়ভাবে তৈরি হয়। এটি ইউনিক ভ্যালু এনফোর্স করে এবং ডাটা লুকআপ দ্রুত করে। প্রতি টেবিলে ১টি থাকতে পারে।</li>
        <li><strong>Secondary / Non-Clustered Index:</strong> Primary Key ছাড়া অন্য কলামের ওপর তৈরি করা হয়। এটি ডুপ্লিকেট ভ্যালু রাখতে পারে এবং মূল ডাটার পয়েন্টার স্টোর করে।</li>
        <li><strong>Composite (Multi-column) Index:</strong> একাধিক কলামের কম্বিনেশনে তৈরি হয়। এখানে কলামের অর্ডার খুবই গুরুত্বপূর্ণ (Leftmost Prefix Rule)।</li>
        <li><strong>Full-text Index:</strong> বড় টেক্সট বা আর্টিকেল বডির মধ্যে কীওয়ার্ড সার্চ করার জন্য ব্যবহৃত হয়।</li>
        <li><strong>Spatial ও Hash Index:</strong> GIS লোকেশন ডাটার জন্য Spatial এবং মেমোরি-ভিত্তিক দ্রুত লুকআপের জন্য Hash ইনডেক্স ব্যবহৃত হয়।</li>
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
    tags: ["Isolation Levels", "Concurrency Anomalies", "MVCC"],
    question: "Database Transaction Isolation Levels কী কী? Dirty Read, Non-repeatable Read এবং Phantom Read কী?",
    answer: `
      <p>কনকারেন্ট ট্রানজেকশন (একই সময়ে একাধিক ট্রানজেকশন চলা) থাকলে ডাটার অসঙ্গতি (Anomalies) তৈরি হতে পারে। এই সমস্যাগুলো নিয়ন্ত্রণ করার জন্য ANSI/ISO SQL-এ ৪টি <strong>Isolation Level</strong> সংজ্ঞায়িত আছে।</p>
      
      <h4>সমস্যাসমূহ (Concurrency Anomalies):</h4>
      <ul>
        <li><strong>Dirty Read:</strong> ট্রানজেকশন A কোনো ডাটা মডিফাই করেছে কিন্তু এখনও Commit করেনি। এই অবস্থায় ট্রানজেকশন B যদি সেই আন-কমিটেড ডাটা রিড করে ফেলে, তবে তাকে Dirty Read বলে। যদি A রোলব্যাক করে, তবে B এমন একটি ডাটা পড়বে যা আসলে আর ডাটাবেজে নেই।</li>
        <li><strong>Non-repeatable Read:</strong> ট্রানজেকশন A একটি নির্দিষ্ট রো (Row) রিড করল। এরপর ট্রানজেকশন B সেই রো-এর ডাটা আপডেট করে বা ডিলিট করে কমিট করে দিল। A যদি একই ট্রানজেকশনে আবার সেই রো রিড করে, তবে সে প্রথমবারের চেয়ে ভিন্ন ভ্যালু পাবে। (মূলত <code>UPDATE</code>/<code>DELETE</code> এর কারণে ঘটে)।</li>
        <li><strong>Phantom Read:</strong> ট্রানজেকশন A কোনো শর্তের ভিত্তিতে (যেমন: <code>WHERE salary > 50000</code>) কিছু রো রিড করল। এরপর ট্রানজেকশন B নতুন কিছু রো ইনসার্ট করে কমিট করল যা A-এর শর্ত পূরণ করে। A যদি আবার একই শর্তে কুয়েরি চালায়, তবে নতুন কিছু 'ভূত' (Phantom) রো চলে আসবে। (মূলত <code>INSERT</code>/<code>DELETE</code> এর কারণে ঘটে)।</li>
      </ul>

      <h4>৪টি Isolation Levels (নিম্ন থেকে উচ্চ ক্রমানুসারে):</h4>
      <ol>
        <li><strong>Read Uncommitted:</strong> সর্বনিম্ন লেভেল। এখানে কোনো লক থাকে না। এক ট্রানজেকশন অন্যের আন-কমিটেড ডাটা পড়তে পারে (Dirty Read ঘটে)। পারফরম্যান্স সবচেয়ে বেশি, তবে ডাটা ইনটিগ্রিটি নেই।</li>
        <li><strong>Read Committed:</strong> (PostgreSQL ও SQL Server-এর ডিফল্ট)। এটি শুধুমাত্র কমিট হওয়া ডাটা রিড করার অনুমতি দেয়, তাই Dirty Read হয় না। তবে একই ট্রানজেকশনে দুইবার রিড করলে ভিন্ন ভ্যালু আসতে পারে (Non-repeatable Read ঘটে)।</li>
        <li><strong>Repeatable Read:</strong> (MySQL-এর ডিফল্ট)। একবার রিড করা ডাটা ট্রানজেকশন শেষ হওয়া পর্যন্ত অন্য কেউ পরিবর্তন করতে পারে না (লক করে রাখে বা MVCC ব্যবহার করে)। তাই Non-repeatable Read হয় না। তবে নতুন ডাটা ইনসার্ট হতে পারে (Phantom Read ঘটতে পারে)। <em>বিঃদ্রঃ PostgreSQL তাদের MVCC আর্কিটেকচারের কারণে এই লেভেলে Phantom Read-ও আটকায়।</em></li>
        <li><strong>Serializable:</strong> সর্বোচ্চ লেভেল। এখানে ট্রানজেকশনগুলো এমনভাবে রান হয় যেন এগুলো একে একে (Sequentially) চলছে। কোনো Anomaly ঘটে না, তবে এতে লকিং বেশি থাকায় পারফরম্যান্স (Concurrency) সবচেয়ে কম হয়।</li>
      </ol>

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
    question: "Slow SQL Query কীভাবে অপ্টিমাইজ করবেন? EXPLAIN বা EXPLAIN ANALYZE দিয়ে কীভাবে Index verify করবেন?",
    answer: `
      <p>SQL Performance Tuning-এর জন্য ধীরগতির কুয়েরি চিহ্নিত ও সমাধান করার ধাপসমূহ:</p>
      <ol>
        <li><code>EXPLAIN</code> বা <code>EXPLAIN ANALYZE</code> চালানো: এতে কুয়েরি প্ল্যানারের প্রসেসিং স্টেপ, কস্ট এবং সময় দেখায়। <code>EXPLAIN ANALYZE</code> আরও এক ধাপ এগিয়ে actual execution time ও rows read দেখায়।</li>
        <li><strong>MySQL-এ EXPLAIN আউটপুট যাচাইয়ের প্র্যাকটিক্যাল টিপস:</strong>
          <ul>
            <li><code>type</code> কলাম: অ্যাক্সেস মেথড বোঝায়। যদি <code>ALL</code> দেখায়, তবে বুঝতে হবে ফুল টেবিল স্ক্যান হচ্ছে (পারফরম্যান্সের জন্য খারাপ)। <code>ref</code> বা <code>const</code> ভালো সাইন।</li>
            <li><code>key</code> কলাম: কোন ইনডেক্সটি ব্যবহৃত হচ্ছে তা দেখায়। যদি <code>NULL</code> থাকে, তবে বুঝতে হবে কোনো ইনডেক্স কাজ করছে না।</li>
            <li><code>possible_keys</code> কলাম: কোন কোন ইনডেক্স ব্যবহার হতে পারতো তার লিস্ট দেয়।</li>
            <li><code>rows</code> কলাম: রেজাল্ট পেতে কতগুলো রো স্ক্যান করতে হচ্ছে তার অনুমান দেয়।</li>
          </ul>
        </li>
        <li>MySQL Workbench বা DBeaver-এর মতো GUI টুলে <strong>Visual Explain</strong> ব্যবহার করলে ডায়াগ্রামের মাধ্যমে কোথায় Index Lookup হচ্ছে বা কোথায় Full Table Scan হচ্ছে তা খুব সহজেই বোঝা যায়।</li>
        <li>কলামের ওপর ফাংশন ব্যবহার বন্ধ করা (যেমন <code>WHERE UPPER(email) = 'test'</code> ইনডেক্স বাইপাস করে)।</li>
        <li><code>SELECT *</code> না লিখে শুধুমাত্র প্রয়োজনীয় কলাম স্পেসিফাই করা এবং Composite Index প্রয়োগ করার সময় Leftmost Prefix Rule মেনে চলা।</li>
      </ol>
      <p><em>ইন্টারভিউ পারসপেক্টিভ:</em> ইন্টারভিউতে যদি জানতে চায় "কিভাবে verify করো যে index ইউজ হচ্ছে?", তখন বলবে— "আমি EXPLAIN বা EXPLAIN ANALYZE চালাই, output এর <code>key</code> আর <code>type</code> কলাম দেখি, কত rows স্ক্যান হচ্ছে সেটাও চেক করি এবং প্রয়োজন হলে query বা index design optimize করি।"</p>
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
  },
  {
    id: "db-11",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Internals","RDBMS","ACID"],
    question: "RDBMS-এ WAL (Write-Ahead Logging) কী এবং এটি কীভাবে ACID Durability নিশ্চিত করে?",
    answer: `
      <p><strong>Write-Ahead Logging (WAL)</strong> হলো ডাটাবেজ ইঞ্জিনের একটি বৈশিষ্ট্য, যা নিশ্চিত করে যে ডাটাবেজের মূল ফাইলে পরিবর্তন (Write) করার আগে সেই পরিবর্তনের লগ ডিস্কে সিঙ্ক্রোনাসলি রাইট করা হবে।</p>
      <h4>Durability নিশ্চিত করার প্রক্রিয়া:</h4>
      <p>সার্ভার হঠাৎ ক্র্যাশ বা পাওয়ার কাট হলে, মেমোরিতে থাকা ডাটা মুছে যেতে পারে। রিস্টার্টের সময় ডাটাবেজ ইঞ্জিন WAL ফাইল রিড করে বুঝতে পারে কোন ট্রানজেকশনগুলো Commit হয়েছিল এবং সেগুলোকে পুনরায় মূল ডাটা ফাইলে প্রয়োগ (Replay) করে। এর ফলে কোনো কমিটেড ডাটা হারিয়ে যায় না, অর্থাৎ Durability নিশ্চিত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>1. Transaction Start -> 2. Write to WAL Buffer -> 3. Flush WAL to Disk
4. Commit Success -> 5. Apply changes to Main Data Files (Async)</code></pre>
      </div>
    `
  },
  {
    id: "db-12",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["SQL","Programmability","RDBMS"],
    question: "Stored Procedures, User-Defined Functions (UDF) এবং Triggers-এর মধ্যে মূল পার্থক্য কী?",
    answer: `
      <p>এই তিনটিই ডাটাবেজে লজিক স্টোর করার উপায়, তবে তাদের ব্যবহার ও কাজের ধরন আলাদা।</p>
      <ul>
        <li><strong>Stored Procedure (SP):</strong> এটি বিজনেস লজিক চালানোর জন্য ব্যবহৃত হয়। এটি <code>CALL</code> স্টেটমেন্ট দিয়ে ইনভোক করতে হয়। এটি একাধিক রেজাল্ট সেট ফেরত দিতে পারে এবং এর ভেতরে DML (Insert/Update) ও DDL স্টেটমেন্ট চালানো যায়।</li>
        <li><strong>User-Defined Function (UDF):</strong> এটি সর্বদা একটি নির্দিষ্ট ভ্যালু (Scalar) বা টেবিল রিটার্ন করে। এটি সরাসরি <code>SELECT</code> স্টেটমেন্টের ভেতর ব্যবহার করা যায়। তবে এটি ডাটাবেজের স্টেট পরিবর্তন করতে পারে না।</li>
        <li><strong>Trigger:</strong> এটি ম্যানুয়ালি কল করা যায় না। টেবিলে <code>INSERT</code>, <code>UPDATE</code>, বা <code>DELETE</code> ইভেন্ট ঘটলে এটি স্বয়ংক্রিয়ভাবে এক্সিকিউট হয়। (যেমন- Audit log তৈরি করা)।</li>
      </ul>
    `
  },
  {
    id: "db-13",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ORM","Performance","SQL"],
    question: "ORM-এ N+1 Query Problem কী এবং Eager Loading (JOIN / Include) দিয়ে এটি কীভাবে সমাধান করা হয়?",
    answer: `
      <p>যখন কোনো ORM (যেমন- Sequelize, Prisma) থেকে ১টি লিস্ট আনার জন্য ১টি মূল কুয়েরি চালানো হয়, এরপর সেই লিস্টের প্রতিটি আইটেমের রিলেটেড ডেটা আনার জন্য আলাদা N-সংখ্যক কুয়েরি চালানো হয়, তখন তাকে <strong>N+1 Query Problem</strong> বলে। এতে ডাটাবেজের ওপর চাপ পড়ে এবং অ্যাপ স্লো হয়ে যায়।</p>
      <h4>সমাধান (Eager Loading):</h4>
      <p>সিঙ্গেল কুয়েরিতে রিলেটেড ডেটা তুলে আনার জন্য ORM-এর <code>include</code> বা <code>JOIN</code> অপশন ব্যবহার করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Bad (N+1 Problem):
const users = await User.findAll();
for (let user of users) {
  const posts = await Post.findAll({ where: { userId: user.id } });
}

// Good (Eager Loading - 1 Query):
const users = await User.findAll({ include: [{ model: Post }] });</code></pre>
      </div>
    `
  },
  {
    id: "db-14",
    category: "Database",
    difficulty: "Beginner",
    tags: ["Integrity","Foreign Key","SQL"],
    question: "Foreign Key Constraints এবং ON DELETE CASCADE কী?",
    answer: `
      <p><strong>Foreign Key</strong> হলো এমন একটি কনস্ট্রেইন্ট যা দুটি টেবিলের (Parent ও Child) মধ্যে সম্পর্ক (Referential Integrity) টিকিয়ে রাখে। চাইল্ড টেবিলে এমন কোনো ভ্যালু ঢোকানো যাবে না যা প্যারেন্ট টেবিলে নেই।</p>
      <p><strong>ON DELETE CASCADE</strong> হলো Foreign Key-এর একটি রুল। যদি প্যারেন্ট টেবিল থেকে কোনো রেকর্ড ডিলিট করা হয়, তবে স্বয়ংক্রিয়ভাবে চাইল্ড টেবিলের সম্পর্কিত সকল রেকর্ড মুছে যাবে।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);</code></pre>
      </div>
    `
  },
  {
    id: "db-15",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Architecture","Replication","Scaling"],
    question: "Database Master-Slave Replication এবং Read Replicas কীভাবে কাজ করে?",
    answer: `
      <p>রিড-হেভি অ্যাপ্লিকেশনে ডাটাবেজের লোড কমানোর জন্য <strong>Master-Slave Replication</strong> ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>Master Node:</strong> এটি সকল Write ও Update অপারেশন গ্রহণ করে এবং একটি Replication Log (Binlog/WAL) তৈরি করে।</li>
        <li><strong>Read Replicas (Slaves):</strong> এগুলো মাস্টার নোডের লগ সিঙ্ক করে নিজেদের কাছে কপি রাখে। অ্যাপ্লিকেশন থেকে রিড (SELECT) কুয়েরি এই স্লেভ নোডগুলোতে পাঠানো হয়।</li>
      </ul>
      <p>এর ফলে মাস্টার নোডের ওপর রিড প্রেশার কমে এবং ডাটাবেজ হরাইজন্টালি স্কেল করে।</p>
    `
  },
  {
    id: "db-16",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Distributed Systems","CAP Theorem","Architecture"],
    question: "Distributed Database Design-এ CAP Theorem কী?",
    answer: `
      <p><strong>CAP Theorem</strong> বলে যে, একটি ডিস্ট্রিবিউটেড ডাটাবেজ সিস্টেমে নিচের ৩টি গ্যারান্টির মধ্যে একসাথে কেবল ২টি প্রদান করা সম্ভব:</p>
      <ul>
        <li><strong>Consistency (C):</strong> সকল নোড একই সময়ে একই ডাটা দেখাবে।</li>
        <li><strong>Availability (A):</strong> প্রতিটি রিকোয়েস্ট সফল বা ফেইল হওয়ার গ্যারান্টি পাবে (সিস্টেম ডাউন হবে না)।</li>
        <li><strong>Partition Tolerance (P):</strong> নোডগুলোর মধ্যে নেটওয়ার্ক কানেকশন বিচ্ছিন্ন (Partition) হলেও সিস্টেম চালু থাকবে।</li>
      </ul>
      <p>নেটওয়ার্ক ফেইলিওর সবসময় ঘটতে পারে বলে 'P' বাদ দেওয়া যায় না। তাই ডাটাবেজ হয় <strong>CP</strong> (Consistency প্রায়োগ করে অনুপলব্ধ হয়, যেমন- HBase) অথবা <strong>AP</strong> (Availability দেয় কিন্তু সাময়িকভাবে পুরোনো ডাটা দেখাতে পারে, যেমন- Cassandra) হিসেবে ডিজাইন করতে হয়।</p>
    `
  },
  {
    id: "db-17",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["DevOps","Migrations","Schema"],
    question: "Database Migration Management (Knex/Prisma/Flyway) কী?",
    answer: `
      <p>ডাটাবেজ স্কিমা পরিবর্তনগুলোকে ভার্সন কন্ট্রোল (Git) এর মাধ্যমে ম্যানেজ করার প্রক্রিয়াকে <strong>Database Migration</strong> বলে। টিমের সবার লোকাল ডাটাবেজ এবং প্রোডাকশন ডাটাবেজ একই স্টেটে রাখতে এটি ব্যবহৃত হয়।</p>
      <p>প্রতিটি মাইগ্রেশন ফাইলে দুটি অংশ থাকে:</p>
      <ul>
        <li><strong>Up (Upgrade):</strong> নতুন টেবিল বা কলাম যোগ করার কোড।</li>
        <li><strong>Down (Rollback):</strong> কোনো সমস্যা হলে আগের অবস্থায় ফিরে যাওয়ার কোড।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>npx prisma migrate dev --name add_user_table</code></pre>
      </div>
    `
  },
  {
    id: "db-18",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["SQL","CTE","Queries"],
    question: "SQL-এ Common Table Expressions (CTE) এবং Recursive Queries কী?",
    answer: `
      <p><strong>CTE (Common Table Expression)</strong> হলো একটি অস্থায়ী নামযুক্ত রেজাল্ট সেট, যা একটি বড় ও জটিল SQL কুয়েরির ভেতরে পড়া সহজ করতে <code>WITH</code> ক্লজ দিয়ে তৈরি করা হয়। এটি কোডের রিডাবিলিটি বাড়ায়।</p>
      <p>যখন CTE নিজেই নিজেকে রেফার করে, তখন তাকে <strong>Recursive Query</strong> বলে। এটি মূলত হায়ারার্কিক্যাল বা ট্রি স্ট্রাকচার ডেটা (যেমন- কোম্পানির অর্গ চার্ট, কমেন্টস থ্রেড) সার্চ করতে ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>WITH RECURSIVE EmployeeHierarchy AS (
  -- Base case
  SELECT id, name, manager_id FROM employees WHERE id = 1
  UNION ALL
  -- Recursive case
  SELECT e.id, e.name, e.manager_id FROM employees e
  INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM EmployeeHierarchy;</code></pre>
      </div>
    `
  },
  {
    id: "db-19",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Transactions", "Isolation Levels", "MVCC"],
    question: "ACID Transactions: 4 Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) এবং Dirty Read, Non-Repeatable Read, Phantom Read কী?",
    answer: `
      <p>কনকারেন্সি কন্ট্রোলের জন্য ৪টি আইসোলেশন লেভেল ব্যবহৃত হয়:</p>
      <ul>
        <li><strong>Read Uncommitted:</strong> সবচেয়ে কম আইসোলেটেড। অন্য ট্রানজেকশনের কমিট না হওয়া ডেটা পড়া যায় (<em>Dirty Read</em> ঘটে)।</li>
        <li><strong>Read Committed:</strong> কেবল কমিট হওয়া ডেটা পড়া যায়। তবে একই ট্রানজেকশনে দুইবার পড়লে ভিন্ন ভ্যালু আসতে পারে (<em>Non-Repeatable Read</em> ঘটে)।</li>
        <li><strong>Repeatable Read:</strong> ট্রানজেকশন শুরু হওয়ার পর একই ডাটা পরিবর্তিত হতে দেওয়া হয় না। তবে নতুন রো ইনসার্ট হলে তা দেখা যেতে পারে (<em>Phantom Read</em>)।</li>
        <li><strong>Serializable:</strong> সর্বোচ্চ আইসোলেটেড। ট্রানজেকশনগুলো একে অপরের সাথে সম্পূর্ণ আলাদাভাবে সিকুয়েনশিয়ালি রান হয়। কোনো এনোমালি ঘটে না, তবে পারফরম্যান্স স্লো হয়।</li>
      </ul>
    `
  },
  {
    id: "db-20",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing", "B-Tree vs Hash", "Composite Index"],
    question: "B-Tree Indexing Mechanism, Composite Indexing, Leftmost Prefix Rule এবং Index Scan vs Index Seek কী?",
    answer: `
      <p><strong>B-Tree Index:</strong> এটি গাছের মতো স্ট্রাকচার যা ডাটাকে সর্টেড রাখে। এতে ডেটা খোঁজার সময় <code>O(log N)</code> লাগে।</p>
      <p><strong>Composite Index:</strong> একাধিক কলামের ওপর তৈরি ইনডেক্স (যেমন- <code>INDEX(A, B, C)</code>)। এখানে <strong>Leftmost Prefix Rule</strong> প্রয়োগ হয়, অর্থাৎ কুয়েরিতে <code>A</code> থাকলেই ইনডেক্স কাজ করবে। শুধু <code>B</code> বা <code>C</code> থাকলে ইনডেক্স ইগনোর করা হবে।</p>
      <ul>
        <li><strong>Index Seek:</strong> ইনডেক্সের নির্দিষ্ট পয়েন্টার ধরে সরাসরি B-Tree পাতা থেকে ডেটা খুঁজে বের করা (দ্রুত)।</li>
        <li><strong>Index Scan:</strong> পুরো ইনডেক্স ট্রি সিকুয়েনশিয়ালি স্ক্যান করা (Seek এর চেয়ে ধীর)।</li>
      </ul>
    `
  },
  {
    id: "db-21",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Performance", "EXPLAIN ANALYZE", "Query Plan"],
    question: "EXPLAIN ANALYZE দিয়ে SQL Query Execution Plan এবং Performance Bottlenecks কীভাবে চিহ্নিত করবেন?",
    answer: `
      <p>কোয়েরির আগে <code>EXPLAIN ANALYZE</code> লিখলে ডাটাবেজ ইঞ্জিন আসল ডাটা না এনে কেবল এক্সিকিউশন প্ল্যান দেখায়। এটি পারফরম্যান্স বটলনেক খুঁজতে সাহায্য করে।</p>
      <ul>
        <li><strong>Seq Scan (Sequential Scan):</strong> পুরো টেবিল স্ক্যান করা হলে এটি দেখায়, যা বড় টেবিলের জন্য খুব ধীর। এর মানে সঠিক ইনডেক্স নেই।</li>
        <li><strong>Index Scan / Bitmap Scan:</strong> ইনডেক্স ব্যবহার করে দ্রুত ডেটা খোঁজা হলে এটি দেখায়।</li>
        <li><strong>Execution Time & Cost:</strong> প্রতিটি স্টেপের সময় ও কম্পিউটেশনাল খরচ দেখে বোঝা যায় কোন অংশটি স্লো করছে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@test.com';</code></pre>
      </div>
    `
  },
  {
    id: "db-22",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Optimization", "Sharding", "Partitioning"],
    question: "Database Partitioning (Range, List, Hash) vs Database Sharding-এর মধ্যে মৌলিক পার্থক্য কী?",
    answer: `
      <p>বড় টেবিল ম্যানেজ করার জন্য এই দুটি টেকনিক ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>Partitioning:</strong> এটি একই ডাটাবেজ সার্ভারের ভেতরে একটি বড় টেবিলকে ছোট ছোট সাব-টেবিলে (Partitions) ভাগ করে। এটি Range, List বা Hash অনুযায়ী হতে পারে। এতে কুয়েরি পারফরম্যান্স বাড়ে কারণ ডাটাবেজ নির্দিষ্ট পার্টিশনেই সার্চ করে।</li>
        <li><strong>Sharding:</strong> এটি ডাটাবেজকে আলাদা আলাদা ফিজিক্যাল সার্ভার (নোড) জুড়ে হরাইজন্টালি ডিস্ট্রিবিউট করে। এখানে একটি <code>Shard Key</code> থাকে, যা নির্ধারণ করে কোন ডেটা কোন সার্ভারে থাকবে। এটি স্টোরেজ স্কেল করতে ব্যবহৃত হয়।</li>
      </ul>
    `
  },
  {
    id: "db-23",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "JSONB", "GIN Index"],
    question: "PostgreSQL JSON vs JSONB, GIN Indexing, এবং Expression Indexing কীভাবে সার্চ গতি বাড়ায়?",
    answer: `
      <p>PostgreSQL NoSQL-এর মতো JSON ডেটা সাপোর্ট করে।</p>
      <ul>
        <li><strong>JSON:</strong> এটি প্লেইন টেক্সট হিসেবে সেভ হয়। প্রতিবার পড়ার সময় পার্স করতে হয়, তাই ধীর।</li>
        <li><strong>JSONB:</strong> এটি পার্স করা বাইনারি ফরম্যাটে সেভ হয়। পার্সিং ছাড়াই দ্রুত রিড করা যায় এবং ইনডেক্সিং সাপোর্ট করে।</li>
      </ul>
      <p>JSONB ফিল্ডের ভেতরের কি-ভ্যালু সার্চ দ্রুত করতে <strong>GIN (Generalized Inverted Index)</strong> ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE INDEX idx_user_data ON users USING gin (data_column);
-- Fast search inside JSONB
SELECT * FROM users WHERE data_column @> '{"role": "admin"}';</code></pre>
      </div>
    `
  },
  {
    id: "db-24",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Window Functions", "OVER", "ROW_NUMBER"],
    question: "SQL Window Functions (ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD()) কীভাবে কাজ করে?",
    answer: `
      <p>Window Function একটি কুয়েরির রেজাল্ট সেটকে গ্রুপ করে (যেমন- <code>OVER(PARTITION BY ...)</code>), কিন্তু <code>GROUP BY</code>-এর মতো রো (Row) কমিয়ে ফেলে না। প্রতিটি রো-এর সাথেই অ্যাগ্রিগেটেড বা র‍্যাঙ্ক ভ্যালু যুক্ত করে।</p>
      <ul>
        <li><strong>ROW_NUMBER():</strong> প্রতি গ্রুপের প্রতিটি রো-কে ১, ২, ৩ করে নাম্বার দেয়।</li>
        <li><strong>RANK() / DENSE_RANK():</strong> নির্দিষ্ট কলামের ভ্যালুর ওপর ভিত্তি করে র‍্যাঙ্ক দেয়।</li>
        <li><strong>LAG() / LEAD():</strong> বর্তমান রো-এর সাথে পরবর্তী বা পূর্ববর্তী রো-এর ডেটা তুলনা করতে সাহায্য করে।</li>
      </ul>
    `
  },
  {
    id: "db-25",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Concurrency", "Pessimistic Locking", "Optimistic Locking"],
    question: "Pessimistic Locking (SELECT ... FOR UPDATE) vs Optimistic Locking (Version Column) কখন কোনটা ব্যবহার করবেন?",
    answer: `
      <p>কনকারেন্ট আপডেট ঠেকাতে এই দুটি লকিং মেকানিজম ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>Pessimistic Locking:</strong> <code>SELECT ... FOR UPDATE</code> দিয়ে রো সরাসরি লক করে দেওয়া হয়। অন্য ট্রানজেকশন এটি পড়তে বা আপডেট করতে পারে না যতক্ষণ না বর্তমান ট্রানজেকশন শেষ হয়। <em>(ব্যবহার:</em> যেখানে কনফ্লিক্ট বেশি, যেমন- ব্যাংকিং ব্যালেন্স আপডেট)।</li>
        <li><strong>Optimistic Locking:</strong> লক না করে একটি <code>version</code> কলাম ট্র্যাক রাখা হয়। আপডেটের সময় চেক করা হয় যে ভার্সন আগের মতই আছে কি না। না থাকলে আপডেট বাতিল হয়ে যায় এবং রিট্রি করতে হয়। <em>(ব্যবহার:</em> যেখানে কনফ্লিক্ট কম, যেমন- ইউজার প্রোফাইল আপডেট)।</li>
      </ul>
    `
  },
  {
    id: "db-26",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["CTE", "WITH RECURSIVE", "Hierarchical"],
    question: "Common Table Expressions (CTE) এবং WITH RECURSIVE দিয়ে অসীম নেস্টেড ক্যাটাগরি ট্রি (Tree Structure) কীভাবে কোয়েরি করবেন?",
    answer: `
      <p>ক্যাটাগরি বা অর্গানাইজেশনাল হায়ারার্কি যেখানে প্যারেন্ট-চাইল্ড রিলেশন থাকে, সেখানে <code>WITH RECURSIVE</code> ব্যবহৃত হয়। এটি বেস কেস (Root) খুঁজে বের করে এবং তারপর রিকার্সিভলি চাইল্ড নোডগুলোকে যুক্ত করে।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>WITH RECURSIVE CategoryTree AS (
  -- Base Case: Root categories
  SELECT id, name, parent_id FROM categories WHERE parent_id IS NULL
  UNION ALL
  -- Recursive Case: Child categories
  SELECT c.id, c.name, c.parent_id FROM categories c
  INNER JOIN CategoryTree ct ON c.parent_id = ct.id
)
SELECT * FROM CategoryTree;</code></pre>
      </div>
    `
  },
  {
    id: "db-27",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Connection Pooling", "PgBouncer", "Idle Sockets"],
    question: "Database Connection Pooling (PgBouncer / HikariCP) এবং Max Connections Tuning কেন জরুরি?",
    answer: `
      <p>প্রতিটি নতুন ডাটাবেজ কানেকশন তৈরি করতে কয়েক মেগাবাইট RAM এবং CPU প্রসেস খরচ হয়। হাজার হাজার রিকোয়েস্ট একসাথে এলে ডাটাবেজ ক্র্যাশ করতে পারে।</p>
      <p><strong>Connection Pooling (PgBouncer/HikariCP):</strong> এটি আগে থেকেই কিছু কানেকশন তৈরি করে রাখে এবং রিকোয়েস্ট আসলে সেগুলো রির্ইউজ করে। রিকোয়েস্ট শেষ হলে কানেকশন বন্ধ না করে পুলে ফেরত দেয়। এতে ডাটাবেজ ডাউন হওয়া আটকায় এবং রেসপন্স টাইম দ্রুত হয়।</p>
    `
  },
  {
    id: "db-28",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ORM", "N+1 Problem", "Eager Loading"],
    question: "ORM (Prisma / TypeORM / Sequelize)-এ N+1 Query Problem কী এবং Eager Loading / JOIN দিয়ে এটি কীভাবে সমাধান করবেন?",
    answer: `
      <p>১টি প্রধান তালিকা আনার জন্য ১টি কুয়েরি চালানো হয়, কিন্তু সেই তালিকার প্রতিটি আইটেমের রিলেটেড ডাটা আনার জন্য আলাদা N-সংখ্যক কুয়েরি চালানোই হলো <strong>N+1 Problem</strong>। এটি অ্যাপ্লিকেশনকে অনেক স্লো করে দেয়।</p>
      <p>এটি সমাধান করতে Eager Loading বা <code>JOIN</code> ব্যবহার করা হয়, যাতে ১টি কুয়েরিতেই মূল ও রিলেটেড সব ডাটা চলে আসে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Prisma Example
const users = await prisma.user.findMany({
  include: { posts: true } // Solves N+1 using JOIN
});</code></pre>
      </div>
    `
  },
  {
    id: "db-29",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "WAL", "Checkpoints"],
    question: "Write-Ahead Logging (WAL) এবং PostgreSQL Checkpoints কীভাবে ক্র্যাশ রিকভারি নিশ্চিত করে?",
    answer: `
      <p>PostgreSQL ডাটাবেজ আসল ডেটা ফাইলে লেখার আগে সকল পরিবর্তন <strong>WAL File</strong>-এ ডিস্কে স্থায়ীভাবে সংরক্ষণ করে। </p>
      <p><strong>Checkpoint</strong> হলো এমন একটি প্রক্রিয়া যেখানে PostgreSQL মেমোরিতে থাকা (Buffer cache) সকল পরিবর্তিত ডেটা পেজ ডিস্কের মূল ফাইলে লিখে দেয় এবং একটি নতুন Checkpoint রেকর্ড তৈরি করে।</p>
      <p>সার্ভার হঠাৎ পাওয়ার কাট হয়ে বন্ধ হলে, রিস্টার্টের সময় ডাটাবেজ সর্বশেষ Checkpoint থেকে WAL ফাইল রিড করে কোন ট্রানজেকশনগুলো কমিট হয়েছিল তা রিকভার করে, ফলে কোনো ডাটা হারায় না।</p>
    `
  },
  {
    id: "db-30",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Schema", "Migrations", "Zero Downtime"],
    question: "Database Migrations (Zero Downtime Schema Migration Pattern) কীভাবে পরিচালনা করবেন?",
    answer: `
      <p>প্রোডাকশনে চলমান সিস্টেমে ডাটাবেজ স্কিমা পরিবর্তন করতে হলে ডাউনটাইম এড়াতে <strong>Zero Downtime Migration</strong> প্যাটার্ন ব্যবহৃত হয়। এটি সাধারণত ৩টি ফেজে সম্পন্ন হয়:</p>
      <ol>
        <li><strong>Add Column:</strong> নতুন কলাম যোগ করা হয় (Nullable হিসেবে), যাতে পুরোনো অ্যাপ কোড ক্র্যাশ না করে।</li>
        <li><strong>Backfill Data:</strong> ব্যাকগ্রাউন্ডে স্ক্রিপ্ট চালিয়ে পুরোনো কলাম থেকে নতুন কলামে ডেটা কপি করা হয় এবং অ্যাপ আপডেট করে নতুন কলামে রিড/রাইট শুরু করা হয়।</li>
        <li><strong>Remove Old Column:</strong> নিশ্চিত হওয়ার পর পুরোনো কলাম ডিলিট করা হয়।</li>
      </ol>
    `
  },
  {
    id: "db-31",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Architecture", "CAP Theorem", "PACELC"],
    question: "CAP Theorem (Consistency, Availability, Partition Tolerance) এবং PACELC Theorem-এর আধুনিক ব্যাখ্যা কী?",
    answer: `
      <p><strong>CAP Theorem</strong> বলে ডিস্ট্রিবিউটেড ডাটাবেজে নেটওয়ার্ক পার্টিশন (P) হলে আপনাকে Consistency (C) অথবা Availability (A) এর যেকোনো একটি বেছে নিতে হবে।</p>
      <p>CAP এর একটি সীমাবদ্ধতা হলো, এটি কেবল নেটওয়ার্ক ফেইলিওরের কথা বলে। তাই আধুনিক সময়ে <strong>PACELC Theorem</strong> আসে:</p>
      <ul>
        <li>যদি পার্টিশন (P) হয়, তবে C বা A এর মধ্যে ট্রেড-অফ করতে হবে।</li>
        <li>যদি পার্টিশন না হয় (Else - E), তবে Latency (L) বা Consistency (C) এর মধ্যে ট্রেড-অফ করতে হবে।</li>
      </ul>
      <p>অর্থাৎ, স্বাভাবিক অবস্থায়ও দ্রুত রেসপন্স (Latency) দিতে গেলে কিছু নোডে সাময়িক কনসিস্টেন্সি (Consistency) বিসর্জন দিতে হয়।</p>
    `
  },
  {
    id: "db-32",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Replication", "Master-Slave", "Logical"],
    question: "Master-Slave Replication (Physical Streaming vs Logical Replication) এবং Replication Lag কী?",
    answer: `
      <p>ডাটাবেজ রিপ্লিকেশন দুই ধরনের হয়:</p>
      <ul>
        <li><strong>Physical Streaming:</strong> মাস্টার নোডের বাইনারি WAL ফাইল সরাসরি স্লেভে কপি করা হয়। স্লেভ নোড মাস্টারের হুবহু কার্বন কপি হয়।</li>
        <li><strong>Logical Replication:</strong> বাইনারি ফাইলের বদলে নির্দিষ্ট টেবিল বা রো-লেভেল পরিবর্তন (DML) স্ট্রিম হিসেবে পাঠানো হয়। স্লেভ নোডে ভিন্ন স্কিমা বা ইনডেক্স থাকতে পারে।</li>
      </ul>
      <p><strong>Replication Lag:</strong> মাস্টারে ডাটা রাইট হওয়ার পর সেই ডাটা স্লেভে পৌঁছাতে যে সময় পার্থক্য লাগে, তাকে Replication Lag বলে। নেটওয়ার্ক স্লো হলে বা স্লেভে লোড বেশি থাকলে এই Lag বাড়ে।</p>
    `
  },
  {
    id: "db-33",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Foreign Keys", "CASCADE", "Triggers"],
    question: "ON DELETE CASCADE, ON DELETE SET NULL, এবং Foreign Key Constraint Triggers-এর সঠিক ব্যবহার কী?",
    answer: `
      <p>Foreign Key কনস্ট্রেইন্ট প্যারেন্ট-চাইল্ড রিলেশন ম্যানেজ করে। প্যারেন্ট ডিলিট হলে চাইল্ড কী হবে তা এই রুলগুলো নির্ধারণ করে:</p>
      <ul>
        <li><strong>ON DELETE CASCADE:</strong> প্যারেন্ট রো ডিলিট হলে, তার সাথে সম্পর্কিত সকল চাইল্ড রো স্বয়ংক্রিয়ভাবে মুছে যাবে।</li>
        <li><strong>ON DELETE SET NULL:</strong> প্যারেন্ট ডিলিট হলে, চাইল্ড রো মুছবে না, কিন্তু চাইল্ডের Foreign Key ফিল্ডে NULL বসে যাবে (চাইল্ড ফিল্ড Nullable হতে হবে)।</li>
      </ul>
      <p>যদি এই সাধারণ রুলগুলো ছাড়া আরও জটিল লজিক (যেমন- ডিলিট না করে আর্কাইভে পাঠানো) থাকে, তখন ডাটাবেজ <strong>Triggers</strong> (BEFORE DELETE) ব্যবহার করা হয়।</p>
    `
  },
  {
    id: "db-34",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Normalization", "3NF", "Denormalization"],
    question: "Database Normalization (1NF, 2NF, 3NF, BCNF) vs Denormalization — পারফরম্যান্স ও ডেটা ইন্টিগ্রিটি ব্যালেন্স কীভাবে করবেন?",
    answer: `
      <p><strong>Normalization:</strong> এটি ডুপ্লিকেট ডেটা মুছে ফেলে ডেটা ইন্টিগ্রিটি নিশ্চিত করে। ডাটা আপডেট করা সহজ ও ফাস্ট (কম জায়গায় আপডেট করতে হয়)। কিন্তু ডেটা পড়ার সময় অনেক টেবিল <code>JOIN</code> করতে হয়, তাই রিড পারফরম্যান্স কস্টলি হয়।</p>
      <p><strong>Denormalization:</strong> পারফরম্যান্স বাড়ানোর জন্য ইচ্ছাকৃতভাবে কিছু ডেটা ডুপ্লিকেট করে রাখা হয়। এতে JOIN কমানো যায় এবং রিড ফাস্ট হয়। তবে রাইট আপডেটের সময় একাধিক জায়গায় আপডেট করতে হয়।</p>
      <p><em>ব্যালেন্স:</em> OLTP (Transaction heavy) সিস্টেমে নরম্যালাইজেশন এবং OLAP (Read heavy/Analytics) সিস্টেমে ডি-নরম্যালাইজেশন ব্যবহার করা ভালো।</p>
    `
  },
  {
    id: "db-35",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "VACUUM", "Bloat"],
    question: "PostgreSQL MVCC Bloat এবং Autovacuum / VACUUM FULL কীভাবে মেমোরি ফিনিক্স করে?",
    answer: `
      <p>PostgreSQL-এ MVCC (Multi-Version Concurrency Control) থাকায়, কোনো রো <code>UPDATE</code> বা <code>DELETE</code> করলে সাথে সাথে পুরোনো ডাটা মুছে যায় না। এটি ফাইল সিস্টেমে 'Dead Tuples' হিসেবে থেকে যায়, যাকে <strong>Bloat</strong> বলে।</p>
      <ul>
        <li><strong>Autovacuum:</strong> এটি ব্যাকগ্রাউন্ডে চলতে থাকে এবং Dead Tuples গুলো পরিষ্কার করে মেমোরি স্পেস রিসাইকেল করে।</li>
        <li><strong>VACUUM FULL:</strong> এটি পুরো টেবিলকে নতুন করে রিরাইট করে এবং ডিস্ক স্পেস অপারেটিং সিস্টেমকে ফেরত দেয়। তবে এটি চলাকালীন টেবিলে এক্সক্লুসিভ লক ধরে রাখে।</li>
      </ul>
    `
  },
  {
    id: "db-36",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Triggers", "UDF", "Stored Procedures"],
    question: "Stored Procedures vs User-Defined Functions (UDF) vs Database Triggers-এর কাজের পার্থক্য কী?",
    answer: `
      <ul>
        <li><strong>Stored Procedure:</strong> এটি ম্যানুয়ালি <code>CALL</code> করে চালাতে হয়। এর ভেতরে ট্রানজেকশন পরিচালনা (COMMIT/ROLLBACK) করা যায় এবং একাধিক টেবিলে ডেটা মডিফিকেশন করা যায়।</li>
        <li><strong>UDF (Function):</strong> এটি <code>SELECT</code> স্টেটমেন্টের ভেতর ব্যবহৃত হয়। এটি ভ্যালু বা টেবিল রিটার্ন করে, কিন্তু ডাটাবেজের স্টেট পরিবর্তন করতে পারে না।</li>
        <li><strong>Trigger:</strong> এটি কোনো ইভেন্টের (INSERT/UPDATE/DELETE) ওপর স্বয়ংক্রিয়ভাবে ফায়ার হয়। এটি সাধারণত Audit Log বা ডেটা ভ্যালিডেশনের কাজে ব্যবহৃত হয়।</li>
      </ul>
    `
  },
  {
    id: "db-37",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing", "Partial Index", "Covering Index"],
    question: "Partial Index and Covering Index (INCLUDE Clause) কীভাবে কোয়েরি অপটিমাইজ করে?",
    answer: `
      <p>স্টোরেজ ও মেমোরি সেভ করে পারফরম্যান্স বাড়াতে এই দুটি স্পেশাল ইনডেক্স ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>Partial Index:</strong> পুরো টেবিলের বদলে নির্দিষ্ট শর্ত পূরণকারী রো-এর ওপর ইনডেক্স তৈরি করা হয়। যেমন: শুধু <code>WHERE status = 'active'</code> রো-এর জন্য ইনডেক্স করলে সাইজ ছোট ও স্পিড ফাস্ট হয়।</li>
        <li><strong>Covering Index:</strong> যখন ইনডেক্স করা কলামের সাথে কুয়েরিতে থাকা আরও কিছু কলাম <code>INCLUDE</code> ক্লজ দিয়ে ইনডেক্সেই সেভ করে রাখা হয়। ফলে ডাটাবেজকে আসল টেবিল থেকে ডেটা রিড করতে হয় না, ইনডেক্স থেকেই সরাসরি রেজাল্ট দেওয়া যায়।</li>
      </ul>
    `
  },
  {
    id: "db-38",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pflow", "Listen/Notify"],
    question: "PostgreSQL LISTEN / NOTIFY দিয়ে রিয়েল-টাইম ডাটাবেজ চেঞ্জ নোটিফিকেশন কীভাবে ট্র্যাকিং করবেন?",
    answer: `
      <p>PostgreSQL-এ <code>LISTEN/NOTIFY</code> হলো বিল্ট-ইন Pub/Sub মেকানিজম। কোনো এক্সটার্নাল মেসেজ ব্রোকার (যেমন- Redis) ছাড়াই রিয়েল-টাইম ইভেন্ট ট্র্যাক করা যায়।</p>
      <ul>
        <li>ব্যাকএন্ড অ্যাপ <code>LISTEN channel_name;</code> চালিয়ে সকেট ওপেন রাখে।</li>
        <li>ডাটাবেজে কোনো ট্রিগার বা স্টোরড প্রসিডিউর থেকে <code>NOTIFY channel_name, 'payload'</code> চালালে, সাথে সাথে ব্যাকএন্ড অ্যাপ সেই মেসেজ রিসিভ করে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>NOTIFY order_created, '{"order_id": 12345}';</code></pre>
      </div>
    `
  },
  {
    id: "db-39",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Optimization", "Bulk Insert", "COPY"],
    question: "PostgreSQL COPY Command vs Bulk INSERT — ১ লাখ রেকর্ড ১ সেকেন্ডে আপলোডের উপায় কী?",
    answer: `
      <p>স্বাভাবিক <code>INSERT</code> কমান্ড প্রতিটি রো-এর জন্য আলাদা পার্সিং ও ট্রানজেকশন ওভারহেড তৈরি করে, ফলে ১ লাখ রেকর্ড ঢোকাতে অনেক সময় লাগে। </p>
      <p>PostgreSQL-এর <strong>COPY</strong> কমান্ড ডাটাবেজের বাইনারি স্ট্রিম দিয়ে সরাসরি ডিস্কে বাল্ক ইনসার্ট সম্পন্ন করে। এটি INSERT-এর চেয়ে ১০-১০০ গুণ দ্রুত।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>COPY users (name, email) FROM '/path/to/data.csv' WITH CSV HEADER;</code></pre>
      </div>
    `
  },
  {
    id: "db-40",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Types", "UUID vs AutoIncrement", "Performance"],
    question: "Primary Keys: Auto-increment INT vs UUID v4 vs UUID v7 (Time-ordered) — বি-ট্রি ইনডেক্স পারফরম্যান্স তুলনা কী?",
    answer: `
      <p>Primary Key নির্বাচনের ওপর ডাটাবেজের ইনডেক্সিং পারফরম্যান্স অনেক বেশি নির্ভর করে।</p>
      <ul>
        <li><strong>Auto-increment INT:</strong> সিকুয়েনশিয়াল হওয়ায় B-Tree-তে দ্রুত ইনসার্ট হয়। কিন্তু ডিস্ট্রিবিউটেড সিস্টেমে আইডি কলিশন হতে পারে।</li>
        <li><strong>UUID v4:</strong> সম্পূর্ণ র্যান্ডম হওয়ায় বি-ট্রি ইনডেক্সে র‍্যান্ডম লোকেশনে ইনসার্ট হয়, যা Index Fragmentation ঘটায় এবং পারফরম্যান্স স্লো করে।</li>
        <li><strong>UUID v7 (Time-ordered):</strong> এটি টাইমস্ট্যাম্প অর্ডারড হওয়ায় সিকুয়েনশিয়ালভাবে ইনসার্ট হয়। ফলে Auto-increment-এর স্পিড এবং UUID-এর ডিস্ট্রিবিউটেড গ্লোবাল ইউনিকত্ব—দুটিই একসাথে পাওয়া যায়।</li>
      </ul>
    `
  },
  {
    id: "db-41",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Joins", "Nested Loop", "Hash Join"],
    question: "Database Join Algorithms: Nested Loop Join vs Hash Join vs Merge Join কীভাবে কাজ করে?",
    answer: `
      <p>ডাটাবেজ ইঞ্জিন ডাটার সাইজ ও ইনডেক্সের ওপর ভিত্তি করে জয়েন অ্যালগরিদম বেছে নেয়।</p>
      <ul>
        <li><strong>Nested Loop Join:</strong> এক টেবিলের প্রতিটি রো-এর জন্য অন্য টেবিলের সব রো চেক করে। ছোট ডেটাসেট বা ইনডেক্স থাকলে এটি ভালো কাজ করে।</li>
        <li><strong>Hash Join:</strong> ছোট টেবিলটিকে মেমোরিতে একটি Hash Table বানিয়ে রাখে, তারপর বড় টেবিলের রোগুলো হ্যাশ করে মিলিয়ে দেখে। বড় আন-সর্টেড ডেটাসেটের জন্য এটি দ্রুত।</li>
        <li><strong>Merge Join:</strong> উভয় টেবিলের ডেটা যদি জয়েন কী (Join Key) অনুযায়ী সর্টেড (Sorted) থাকে, তবে দুটিকে সমান্তরালভাবে মার্জ করা হয়। এটি সবচেয়ে দ্রুত।</li>
      </ul>
    `
  },
  {
    id: "db-42",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pg_stat_activity", "Slow Queries"],
    question: "PostgreSQL pg_stat_activity এবং pg_stat_statements দিয়ে স্লো কোয়েরি ও ডেডলক কীভাবে চিহ্নিত করবেন?",
    answer: `
      <p>প্রোডাকশন সার্ভারে ঝুলন্ত (Hanging) বা স্লো কোয়েরি খুঁজে বের করতে এই দুটি ভিউ ব্যবহৃত হয়।</p>
      <ul>
        <li><code>pg_stat_activity</code>: এটি বর্তমানে চলমান সকল কানেকশন ও কোয়েরির লাইভ স্ট্যাটাস দেখায়। কোন কোয়েরি কত সময় ধরে চলছে বা কোনটি Lock করে আছে তা এখান থেকে বোঝা যায়।</li>
        <li><code>pg_stat_statements</code>: এটি ডাটাবেজের সকল কোয়েরির হিস্টোরিক্যাল রেকর্ড রাখে। কোন কোয়েরি সবচেয়ে বেশি সময় (Total Time) নিচ্ছে বা সবচেয়ে বেশি রিসোর্স খরচ করছে তা ট্র্যাক করে।</li>
      </ul>
    `
  },
  {
    id: "db-43",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "Tablespace", "Storage"],
    question: "PostgreSQL Tablespaces দিয়ে আলাদা ফিজিক্যাল ডিস্কে (NVMe SSD vs HDD) টেবিল স্টোর কীভাবে করবেন?",
    answer: `
      <p><strong>Tablespace</strong> হলো PostgreSQL-এর এমন একটি ফিচার, যার মাধ্যমে ডাটাবেজ টেবিল বা ইনডেক্সকে ডিফল্ট ডিরেক্টরির বদলে আলাদা কোনো ফিজিক্যাল ডিস্কে স্টোর করার সুযোগ দেওয়া হয়।</p>
      <p>উদাহরণস্বরূপ, হট পারফরম্যান্স টেবিলগুলো দ্রুতগতির NVMe SSD-তে থাকা Tablespace-এ রাখা যায়। আর পুরোনো হিস্ট্রি বা আর্কাইভ ডাটা ধীরগতির সস্তা HDD-তে তৈরি Tablespace-এ ডাইভার্ট করা যায়। এতে কস্ট এবং পারফরম্যান্স দুটোই ব্যালেন্স হয়।</p>
    `
  },
  {
    id: "db-44",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Queries", "GROUP BY", "HAVING"],
    question: "GROUP BY vs HAVING vs WHERE Clause-এর এক্সিকিউশন অর্ডার ও কাজের পার্থক্য কী?",
    answer: `
      <p>এই তিনটির এক্সিকিউশন অর্ডার এবং কাজের ধরন ভিন্ন:</p>
      <ul>
        <li><strong>WHERE:</strong> এটি গ্রুপ করার আগেই ইনডিভিজুয়াল রো ফিল্টার করে। এটি Aggregate ফাংশন (SUM, COUNT) এর সাথে ব্যবহার করা যায় না।</li>
        <li><strong>GROUP BY:</strong> এটি নির্দিষ্ট কলামের ভ্যালুর ওপর ভিত্তি করে সারিগুলোকে একত্রিত (Group) করে।</li>
        <li><strong>HAVING:</strong> এটি GROUP BY-এর পরে চলে। গ্রুপ করার পর অ্যাগ্রিগেটেড রেজাল্টের (যেমন- <code>SUM(price) > 1000</code>) ওপর ফিল্টার চালাতে এটি ব্যবহৃত হয়।</li>
      </ul>
      <p><strong>Execution Order:</strong> FROM -> WHERE -> GROUP BY -> HAVING -> SELECT</p>
    `
  },
  {
    id: "db-45",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Security", "SQL Injection", "Parameterized Queries"],
    question: "SQL Injection (SQLi) কীভাবে কাজ করে এবং Parameterized Prepared Statements এটি কেন শতভাগ প্রতিরোধ করে?",
    answer: `
      <p>ইউজার ইনপুট সরাসরি SQL স্ট্রিং-এর সাথে যুক্ত করা হলে SQL Injection ঘটে। অ্যাটাকার <code>' OR '1'='1</code> এর মতো ইনপুট দিয়ে পুরো টেবিলের ডাটা বের করে নিতে পারে বা ডাটা ডিলিট করতে পারে।</p>
      <p><strong>Parameterized Prepared Statements</strong> এটি শতভাগ প্রতিরোধ করে কারণ এখানে SQL কোয়েরি এবং ইউজার ইনপুট ডাটা সম্পূর্ণ আলাদাভাবে ডাটাবেজে পাঠানো হয়। ডাটাবেজ ইঞ্জিন প্রথমে কোয়েরি স্ট্রাকচার কম্পাইল করে, এরপর ইনপুট ডাটাকে কেবল লিটারাল স্ট্রিং বা ভ্যালু হিসেবে গ্রহণ করে। ফলে ইনপুটের ভেতরের SQL কমান্ড কখনোই এক্সিকিউট করা হয় না।</p>
    `
  },
  {
    id: "db-46",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Extensions", "pg_trgm"],
    question: "PostgreSQL Extension: pg_trgm (Trigram Index) দিয়ে Fuzzy Text Search কীভাবে করবেন?",
    answer: `
      <p>সাধারণ <code>LIKE '%word%'</code> সার্চ ধীর এবং বানান ভুল হলে কাজ করে না। <code>pg_trgm</code> এক্সটেনশন টেক্সটকে ৩-অক্ষরের গ্রুপে (Trigrams) ভাগ করে সিমিলারিটি মেপার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE EXTENSION pg_trgm;
CREATE INDEX idx_user_name ON users USING gin (name gin_trgm_ops);

-- Fuzzy search (works even with spelling mistakes)
SELECT * FROM users WHERE name % 'Nazmul';</code></pre>
      </div>
    `
  },
  {
    id: "db-47",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "FDW", "Foreign Data Wrapper"],
    question: "PostgreSQL Foreign Data Wrappers (postgres_fdw) দিয়ে ডিস্ট্রিবিউটেড ডাটাবেজ কোয়েরি কীভাবে করবেন?",
    answer: `
      <p><strong>Foreign Data Wrapper (FDW)</strong> হলো PostgreSQL-এর একটি এক্সটেনশন, যার মাধ্যমে একটি ডাটাবেজ সার্ভার থেকে অন্য রিমোট সার্ভারের (PostgreSQL, MySQL, Oracle ইত্যাদি) টেবিলকে লোকাল টেবিলের মতো কুয়েরি করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE EXTENSION postgres_fdw;
CREATE SERVER remote_db FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host '10.0.0.2', dbname 'remote_db');
CREATE FOREIGN TABLE remote_users (id INT, name TEXT) SERVER remote_db OPTIONS (table_name 'users');

-- Querying remote table locally
SELECT * FROM remote_users;</code></pre>
      </div>
    `
  },
  {
    id: "db-48",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "COLLATE", "Case Insensitive"],
    question: "PostgreSQL CITEXT Data Type vs Lowercase Indexing — Case-Insensitive Search কীভাবে করবেন?",
    answer: `
      <p>PostgreSQL-এ ডিফল্টভাবে Text Search Case-sensitive (ছোট-বড় হাতের অক্ষর সংবেদনশীল) হয়। এটি সমাধানের দুটি উপায় আছে:</p>
      <ul>
        <li><strong>CITEXT Extension:</strong> এটি একটি কাস্টম ডাটা টাইপ, যা স্বয়ংক্রিয়ভাবে সব সার্চকে Case-insensitive করে দেয়।</li>
        <li><strong>Expression Indexing:</strong> টেক্সট ফিল্ডের ওপর <code>LOWER()</code> ফাংশন প্রয়োগ করে ইনডেক্স তৈরি করা। কুয়েরির সময় <code>WHERE LOWER(email) = 'test.com'</code> লিখতে হয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE INDEX idx_lower_email ON users (LOWER(email));</code></pre>
      </div>
    `
  },
  {
    id: "db-49",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Resilience", "Two-Phase Commit", "2PC"],
    question: "Two-Phase Commit (2PC) Protocol দিয়ে Multi-Database Distributed Transaction কীভাবে সামলাবেন?",
    answer: `
      <p>যখন একটি ট্রানজেকশন একাধিক ডাটাবেজের ওপর জুড়ে থাকে (Distributed Transaction), তখন সব ডাটাবেজে একসাথে কমিট হওয়া নিশ্চিত করতে <strong>Two-Phase Commit (2PC)</strong> ব্যবহৃত হয়।</p>
      <ol>
        <li><strong>Prepare Phase:</strong> কো-অর্ডিনেটর সব ডাটাবেজকে জিজ্ঞাসা করে "তোমরা কি কমিট করতে প্রস্তুত?" সবাই যদি 'Yes' বলে, তবে পরবর্তী ধাপে যায়।</li>
        <li><strong>Commit Phase:</strong> কো-অর্ডিনেটর সবাইকে একসাথে 'Commit' করার নির্দেশ দেয়। কেউ যদি Prepare ফেজে 'No' বলে, তবে সবাইকে Rollback করা হয়।</li>
      </ol>
    `
  },
  {
    id: "db-50",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Constraints", "CHECK"],
    question: "PostgreSQL CHECK Constraints and EXCLUSION Constraints-এর সিকিউরিটি সুবিধা কী?",
    answer: `
      <p>ডাটাবেজ লেভেলে ভুল ডাটা ঢোকা আটকাতে এই কনস্ট্রেইন্টগুলো ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>CHECK Constraint:</strong> এটি নির্দিষ্ট শর্ত যাচাই করে। যেমন: <code>CHECK (price > 0)</code> দিলে কেউ প্রোডাক্টের মূল্য ০ বা নেগেটিভ দিতে পারবে না।</li>
        <li><strong>EXCLUSION Constraint:</strong> এটি দুটি রো-এর মধ্যে ওভারল্যাপিং ঠেকায়। যেমন- হোটেল রুম বুকিংয়ে <code>EXCLUDE USING gist (room_id WITH =, booking_range WITH &&)</code> দিলে, একই রুমে একই সময়ে দুজন বুকিং দিতে পারবে না।</li>
      </ul>
    `
  }
];