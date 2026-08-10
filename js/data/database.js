const databaseQuestions = [
  {
    id: "db-1",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ACID","Transactions","Fundamentals"],
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
    tags: ["Indexing","B-Tree","Performance"],
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
    tags: ["Joins","SQL","Queries"],
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
    tags: ["Isolation Levels","Concurrency Anomalies","MVCC"],
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
    tags: ["Window Functions","SQL"],
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
    tags: ["Normalization","1NF 2NF 3NF BCNF"],
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
    tags: ["Query Optimization","EXPLAIN ANALYZE"],
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
    tags: ["Locking","Deadlocks","Optimistic Pessimistic"],
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
    tags: ["Connection Pooling","Performance"],
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
    tags: ["Database","Replication","Consistency","Senior"],
    question: "Read Replica Lag থাকা অবস্থায় Read-Your-Own-Writes Consistency সমস্যা কীভাবে সমাধান করবেন?",
    answer: `
      <p>Master-এ write করার সাথে সাথে যদি একই ইউজার read replica থেকে read করে, replication lag-এর কারণে তার নিজের সদ্য করা পরিবর্তনই দেখতে না পারার সমস্যা হয় — একে <strong>Read-Your-Own-Writes</strong> সমস্যা বলে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>ইউজার প্রোফাইল আপডেট করলেন → Master-এ লেখা হলো
তাৎক্ষণিক প্রোফাইল পেজ রিফ্রেশ → Read Replica থেকে পড়া হলো (এখনও sync হয়নি)
→ ইউজার দেখেন পুরনো ডেটা — বিভ্রান্তিকর অভিজ্ঞতা</code></pre>
      </div>
      <h4>সমাধান কৌশল</h4>
      <ul>
        <li><strong>Session-Sticky Read:</strong> একটি write-এর পরবর্তী কিছু সময় (কয়েক সেকেন্ড) সেই ইউজারের জন্য read-ও master থেকে করানো, তারপর replica-তে ফিরে যাওয়া।</li>
        <li><strong>Read-Your-Writes Token:</strong> write অপারেশনের replication position (LSN/offset) ক্লায়েন্টকে ফেরত দেওয়া; পরের read রিকোয়েস্টে সেই position পার হওয়া replica খুঁজে বের করে পড়া (MongoDB causal consistency এই প্যাটার্নে কাজ করে)।</li>
        <li><strong>Optimistic UI:</strong> ব্যাকএন্ড থেকে আবার fetch না করে, ফ্রন্টএন্ডে যে ডেটা লেখা হয়েছে সেটিই সাথে সাথে UI-তে দেখানো — replica lag আড়াল হয়ে যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Eventual Consistency ও Read-Your-Own-Writes Consistency-এর মধ্যে সম্পর্ক কী?</li>
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
      <p><strong>Database Migration</strong> হলো ডাটাবেজ স্কিমার পরিবর্তন (টেবিল তৈরি, কলাম যোগ, ইনডেক্স তৈরি) কোড আকারে, ভার্সন-নিয়ন্ত্রিতভাবে ও পুনরাবৃত্তিযোগ্যভাবে ম্যানেজ করার পদ্ধতি — যাতে সব environment (dev/staging/prod) একই স্কিমা state-এ থাকে।</p>
      <h4>কেন raw SQL script যথেষ্ট নয়</h4>
      <p>ম্যানুয়ালি প্রোডাকশন ডাটাবেজে SQL চালালে ট্র্যাক করা কঠিন হয়ে যায় — কোন পরিবর্তন কখন হয়েছে, কোন environment-এ প্রয়োগ হয়েছে, এবং টিমের অন্য মেম্বাররা কীভাবে সেই স্কিমা তাদের লোকাল মেশিনে পুনরুৎপাদন করবে। Migration টুল এই সমস্যা সমাধান করে ভার্সন-নাম্বারযুক্ত ফাইল ও একটি ট্র্যাকিং টেবিলের মাধ্যমে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Knex migration উদাহরণ
exports.up = function(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.decimal('total', 10, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');   // ← rollback পথ, বাধ্যতামূলক
};

// Prisma schema-first পদ্ধতি
model Order {
  id        Int      @id @default(autoincrement())
  userId    Int
  total     Decimal  @db.Decimal(10, 2)
  createdAt DateTime @default(now())
}
// prisma migrate dev → schema.prisma ডিফ করে migration SQL স্বয়ংক্রিয়ভাবে তৈরি করে</code></pre>
      </div>
      <h4>কীভাবে কাজ করে — ট্র্যাকিং টেবিল</h4>
      <p>প্রতিটি migration টুল একটি বিশেষ টেবিল রাখে (Knex-এ <code>knex_migrations</code>, Flyway-এ <code>flyway_schema_history</code>) যেখানে কোন migration ইতিমধ্যে প্রয়োগ হয়েছে তা রেকর্ড থাকে। <code>migrate up</code> চালালে টুল এই টেবিল দেখে বাকি থাকা migration ক্রমানুসারে প্রয়োগ করে — একই migration দুইবার চলে না।</p>
      <h4>Up/Down (Rollback) কেন গুরুত্বপূর্ণ</h4>
      <p>প্রতিটি migration-এর একটি <code>up</code> (পরিবর্তন প্রয়োগ) ও <code>down</code> (পরিবর্তন বাতিল) থাকা উচিত। প্রোডাকশনে একটি migration সমস্যা তৈরি করলে <code>down</code> চালিয়ে দ্রুত আগের অবস্থায় ফেরা যায় — নতুন কোড ডিপ্লয় করার অপেক্ষা না করেই।</p>
      <h4>Zero-Downtime Migration — সিনিয়র-স্তরের বিবেচনা</h4>
      <p>প্রোডাকশনে একটি বড় টেবিলে <code>ALTER TABLE ADD COLUMN NOT NULL</code> সরাসরি চালালে পুরো টেবিল <strong>লক</strong> হয়ে যেতে পারে (PostgreSQL-এ পুরনো ভার্সনে, বা ডিফল্ট ভ্যালু গণনা করতে হলে)। সিনিয়র-স্তরের অভ্যাস:</p>
      <ol>
        <li>প্রথমে কলাম <code>NULL</code>-যোগ্য হিসেবে যোগ করুন (দ্রুত, লক-মুক্ত)।</li>
        <li>ব্যাকফিল স্ক্রিপ্ট দিয়ে ব্যাচে ব্যাচে পুরনো রো আপডেট করুন (একসাথে নয়, টেবিল লক এড়াতে)।</li>
        <li>ব্যাকফিল শেষ হলে <code>NOT NULL</code> constraint যোগ করুন।</li>
      </ol>
      <p>এভাবে schema পরিবর্তন ও কোড ডিপ্লয়মেন্ট আলাদা ধাপে হয় — কোনো ডাউনটাইম ছাড়াই।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একই migration যদি দুই ডেভেলপার আলাদাভাবে লিখে ফেলেন (migration conflict), কীভাবে সমাধান করবেন?</li>
        <li>Prisma-এর schema-first পদ্ধতি ও Knex-এর imperative পদ্ধতির ট্রেড-অফ কী?</li>
      </ul>
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
    tags: ["Database","Backup","Disaster Recovery","Senior"],
    question: "Database Backup Strategy: Full vs Incremental vs Differential এবং Point-in-Time Recovery (PITR) কী?",
    answer: `
      <p>প্রোডাকশন ডাটাবেজে সঠিক backup strategy ছাড়া একটি accidental <code>DROP TABLE</code> বা র‍্যানসমওয়্যার আক্রমণ ব্যবসা ধ্বংস করে দিতে পারে — backup শুধু "কপি রাখা" নয়, একটি নির্ভরযোগ্য recovery পরিকল্পনা।</p>
      <table>
        <tr><th>ধরন</th><th>কী কপি হয়</th><th>Restore সময়</th></tr>
        <tr><td><strong>Full Backup</strong></td><td>পুরো ডাটাবেজ</td><td>দ্রুত (একটি ফাইল থেকে)</td></tr>
        <tr><td><strong>Incremental</strong></td><td>শেষ backup-এর পর যা বদলেছে</td><td>ধীর (last full + সব incremental চেইন)</td></tr>
        <tr><td><strong>Differential</strong></td><td>শেষ <em>full</em> backup-এর পর যা বদলেছে</td><td>মাঝামাঝি (last full + শেষ differential)</td></tr>
      </table>
      <h4>Point-in-Time Recovery (PITR)</h4>
      <p>শুধু daily backup যথেষ্ট নয় — একটি ভুল <code>UPDATE</code> সকাল ১০টায় হলে, রাতের backup সেই ভুলও ধরে রাখবে। PITR-এ WAL/binlog আর্কাইভ রাখা হয়, যাতে "গতকালের backup + WAL replay করে ঠিক ৯:৫৯ মিনিটের অবস্থায়" ফিরে যাওয়া যায় — ভুলের ঠিক আগ মুহূর্তে।</p>
      <h4>সিনিয়র-স্তরের বিবেচনা</h4>
      <ul>
        <li><strong>Backup টেস্ট করা আবশ্যক</strong> — restore আসলেই কাজ করে কিনা নিয়মিত যাচাই না করলে, দরকারের সময় backup কাজ না করার ঝুঁকি থাকে।</li>
        <li><strong>3-2-1 নিয়ম:</strong> ৩টি কপি, ২টি ভিন্ন মিডিয়ায়, ১টি অফসাইট (অন্য region/datacenter)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>RPO (Recovery Point Objective) ও RTO (Recovery Time Objective)-এর পার্থক্য কী এবং backup strategy কীভাবে এই দুটি লক্ষ্যে প্রভাব ফেলে?</li>
      </ul>
    `
  },
  {
    id: "db-20",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing","B-Tree vs Hash","Composite Index"],
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
    tags: ["Performance","EXPLAIN ANALYZE","Query Plan"],
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
    tags: ["Optimization","Sharding","Partitioning"],
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
    tags: ["PostgreSQL","JSONB","GIN Index"],
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
    tags: ["Database","SQL","Query Optimization","Senior"],
    question: "SQL-এ Subquery vs JOIN vs CTE — পারফরম্যান্সের দিক থেকে কখন কোনটি বেছে নেবেন?",
    answer: `
      <p>একই ফলাফল প্রায়ই তিনভাবে পাওয়া যায় — Subquery, JOIN, বা CTE দিয়ে — কিন্তু পারফরম্যান্স ও পঠনযোগ্যতায় পার্থক্য থাকতে পারে, যদিও আধুনিক query planner (PostgreSQL 12+) অনেক ক্ষেত্রে এদের সমান optimize করে ফেলে।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Subquery — correlated হলে প্রতি রো-তে re-execute হতে পারে (ধীর)
SELECT * FROM orders o
WHERE o.total > (SELECT AVG(total) FROM orders WHERE user_id = o.user_id);

-- JOIN — সাধারণত query planner সবচেয়ে ভালো অপ্টিমাইজ করতে পারে
SELECT o.* FROM orders o
JOIN user_avg ua ON ua.user_id = o.user_id
WHERE o.total > ua.avg_total;

-- CTE — পঠনযোগ্যতা ভালো, PostgreSQL 12+ এ auto-inlined (আলাদা কোনো খরচ নেই)
WITH user_avg AS (SELECT user_id, AVG(total) as avg_total FROM orders GROUP BY user_id)
SELECT o.* FROM orders o JOIN user_avg ua ON ua.user_id = o.user_id WHERE o.total > ua.avg_total;</code></pre>
      </div>
      <h4>মূল পার্থক্য — Correlated Subquery-এর ঝুঁকি</h4>
      <p><strong>Correlated subquery</strong> (যেখানে ভেতরের কোয়েরি বাইরের প্রতিটি রো-এর উপর নির্ভর করে) প্রতিটি বাইরের রো-এর জন্য আলাদাভাবে চলতে পারে — N রো থাকলে N বার execute হওয়ার ঝুঁকি। JOIN-এ পুরো ডেটাসেট একবারে প্রসেস হয়, সাধারণত দ্রুততর।</p>
      <h4>সিনিয়র-স্তরের নির্দেশনা</h4>
      <p>সন্দেহ থাকলে সবসময় <code>EXPLAIN ANALYZE</code> দিয়ে যাচাই করুন — আধুনিক PostgreSQL planner CTE ও subquery-কে প্রায়ই JOIN-এর সমতুল্য প্ল্যানে রূপান্তর করে ফেলে। পঠনযোগ্যতা ও রক্ষণাবেক্ষণযোগ্যতা প্রায়ই পারফরম্যান্সের চেয়ে বেশি গুরুত্বপূর্ণ বিবেচনা — যতক্ষণ না প্রোফাইলিং প্রকৃত bottleneck দেখায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>PostgreSQL 12-এর আগে CTE কেন "optimization fence" ছিল এবং এখন কী বদলেছে?</li>
      </ul>
    `
  },
  {
    id: "db-25",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Concurrency","Pessimistic Locking","Optimistic Locking"],
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
    tags: ["CTE","WITH RECURSIVE","Hierarchical"],
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
    tags: ["Connection Pooling","PgBouncer","Idle Sockets"],
    question: "Database Connection Pooling (PgBouncer / HikariCP) এবং Max Connections Tuning কেন জরুরি?",
    answer: `
      <p><strong>Connection Pooling</strong> মানে প্রতিটি ডাটাবেজ কোয়েরির জন্য নতুন সংযোগ তৈরি না করে, আগে থেকে তৈরি করা একগুচ্ছ সংযোগ পুনর্ব্যবহার করা — কারণ একটি TCP সংযোগ + PostgreSQL প্রসেস ফর্ক করা ব্যয়বহুল (কয়েক মিলিসেকেন্ড থেকে কয়েক সেকেন্ড পর্যন্ত)।</p>
      <h4>সমস্যাটি — PostgreSQL-এর প্রসেস-পার-কানেকশন মডেল</h4>
      <p>PostgreSQL প্রতিটি ক্লায়েন্ট সংযোগের জন্য একটি <strong>আলাদা OS প্রসেস</strong> ফর্ক করে (থ্রেড নয়)। প্রতিটি প্রসেসের নিজস্ব মেমরি ওভারহেড (~৫-১০ MB) থাকে। হাজার হাজার concurrent ইউজার থাকলে সরাসরি হাজার হাজার সংযোগ খুললে সার্ভার মেমরি শেষ হয়ে যায় এবং <code>max_connections</code> (ডিফল্ট প্রায় ১০০) সীমা দ্রুত পার হয়ে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>App সার্ভার (১০০ ইনস্ট্যান্স, প্রতিটি ২০ কানেকশন)
  → সরাসরি PostgreSQL-এ কানেক্ট করলে: ২,০০০ কানেকশন দরকার
  → PostgreSQL max_connections = ১০০ → ওভারফ্লো, ক্র্যাশের ঝুঁকি

App সার্ভার → PgBouncer (transaction mode) → PostgreSQL
  → PgBouncer ২,০০০ ক্লায়েন্ট কানেকশন গ্রহণ করে
  → মাত্র ২০-৫০টি প্রকৃত PostgreSQL কানেকশন পুনর্ব্যবহার করে</code></pre>
      </div>
      <h4>PgBouncer — তিনটি pooling mode</h4>
      <table>
        <tr><th>Mode</th><th>আচরণ</th><th>ব্যবহার</th></tr>
        <tr><td><strong>Session</strong></td><td>ক্লায়েন্ট ডিসকানেক্ট না করা পর্যন্ত একই DB কানেকশন ধরে রাখে</td><td>prepared statement/session variable দরকার হলে</td></tr>
        <tr><td><strong>Transaction</strong></td><td>শুধু একটি transaction চলাকালীন DB কানেকশন বরাদ্দ, শেষ হলেই ফেরত</td><td>সবচেয়ে সাধারণ, সর্বোচ্চ efficiency</td></tr>
        <tr><td><strong>Statement</strong></td><td>প্রতিটি স্টেটমেন্টের পর কানেকশন ফেরত</td><td>খুব কম ব্যবহৃত, transaction ভাঙে</td></tr>
      </table>
      <p><strong>Transaction mode</strong>-এ সতর্কতা: session-level ফিচার (prepared statement, <code>SET</code> ভ্যারিয়েবল, advisory lock) কাজ নাও করতে পারে, কারণ পরের কোয়েরি একই ফিজিক্যাল কানেকশনে যাবে তার নিশ্চয়তা নেই।</p>
      <h4>Application-স্তরের Pool (Node.js উদাহরণ)</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { Pool } = require('pg');
const pool = new Pool({
  max: 20,                      // প্রতি অ্যাপ ইনস্ট্যান্সে সর্বোচ্চ কানেকশন
  idleTimeoutMillis: 30000,     // অলস কানেকশন কতক্ষণ পর বন্ধ হবে
  connectionTimeoutMillis: 5000 // pool পূর্ণ হলে কতক্ষণ অপেক্ষা করবে
});</code></pre>
      </div>
      <h4>Max Connections হিসাব — সিনিয়র-স্তরের বিবেচনা</h4>
      <p>একটি সাধারণ ভুল: প্রতিটি অ্যাপ ইনস্ট্যান্সে বড় pool সাইজ (যেমন ১০০) সেট করা। বাস্তবে <strong>অ্যাপ ইনস্ট্যান্স সংখ্যা × pool size ≤ DB-এর max_connections</strong> — নাহলে হরাইজন্টাল স্কেলিং (আরও ইনস্ট্যান্স যোগ করা) DB সংযোগ সীমা ভেঙে দেয়। PgBouncer এই সমস্যা কাঠামোগতভাবে সমাধান করে — অ্যাপের কানেকশন সংখ্যা DB-এর কানেকশন সংখ্যা থেকে decouple করে দেয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Transaction mode-এ prepared statement কেন সমস্যা করতে পারে, এবং কীভাবে এড়াবেন?</li>
        <li>PgBouncer নিজেই একটি single point of failure হয়ে যেতে পারে — কীভাবে HA করবেন?</li>
      </ul>
    `
  },
  {
    id: "db-28",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Database","Connection Pool","Production","Senior"],
    question: "Database Connection Leak প্রোডাকশনে কীভাবে শনাক্ত ও প্রতিরোধ করবেন?",
    answer: `
      <p><strong>Connection Leak</strong> ঘটে যখন কোড একটি ডাটাবেজ কানেকশন pool থেকে ধার নেয় কিন্তু কখনও ফেরত দেয় না — ধীরে ধীরে pool খালি হয়ে যায়, নতুন রিকোয়েস্ট কানেকশন পায় না, পুরো অ্যাপ্লিকেশন থমকে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ leak — এরর হলে connection.release() কখনও চলে না
async function getUser(id) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
  conn.release();   // এই লাইনের আগে এরর থ্রো হলে কানেকশন চিরকাল আটকে থাকে
  return rows[0];
}

// ✅ try/finally দিয়ে গ্যারান্টিড release
async function getUser(id) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } finally {
    conn.release();   // এরর হোক বা না হোক, সবসময় চলবে
  }
}</code></pre>
      </div>
      <h4>শনাক্তকরণ — প্রোডাকশন মনিটরিং</h4>
      <ul>
        <li><strong>Pool মেট্রিক্স মনিটর করুন:</strong> active connections ক্রমাগত বাড়তে থাকা কিন্তু কখনও না কমা — এটি leak-এর স্পষ্ট চিহ্ন।</li>
        <li><strong>PostgreSQL-এ <code>pg_stat_activity</code></strong> দিয়ে দেখুন কোন কানেকশন দীর্ঘক্ষণ idle-in-transaction অবস্থায় আছে।</li>
        <li><strong>Connection timeout সেট করুন</strong> — একটি কানেকশন নির্দিষ্ট সময়ের বেশি ব্যবহৃত হলে বাধ্যতামূলক close/log করা।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ORM (Prisma/TypeORM) ব্যবহার করলে connection leak-এর ঝুঁকি ম্যানুয়াল query-এর তুলনায় কীভাবে কম বা বেশি হয়?</li>
      </ul>
    `
  },
  {
    id: "db-29",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL","WAL","Checkpoints"],
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
    tags: ["Schema","Migrations","Zero Downtime"],
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
    tags: ["Architecture","CAP Theorem","PACELC"],
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
    tags: ["Replication","Master-Slave","Logical"],
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
    tags: ["Foreign Keys","CASCADE","Triggers"],
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
    tags: ["Normalization","3NF","Denormalization"],
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
    tags: ["PostgreSQL","VACUUM","Bloat"],
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
    tags: ["Database","Microservices","Architecture","Senior"],
    question: "একাধিক মাইক্রোসার্ভিস একই Database Schema শেয়ার করা কেন Anti-pattern — Database-per-Service কীভাবে সমাধান দেয়?",
    answer: `
      <p>একাধিক মাইক্রোসার্ভিস একই ডাটাবেজ/স্কিমা শেয়ার করা একটি সাধারণ কিন্তু বিপজ্জনক অ্যান্টি-প্যাটার্ন — এটি মাইক্রোসার্ভিসের মূল উদ্দেশ্যকেই (স্বাধীন ডিপ্লয়মেন্ট, স্বাধীন স্কেলিং) নষ্ট করে দেয়।</p>
      <h4>সমস্যা — Shared Database</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Order Service ─┐
Inventory Service ─┼──→ একই MySQL ডাটাবেজ (shared_db.orders টেবিল)
Shipping Service ─┘

সমস্যা: Inventory Service যদি orders টেবিলে একটি কলাম বদলায়,
Order Service ও Shipping Service নিঃশব্দে ভেঙে যেতে পারে —
কোনো API contract নেই, শুধু ডাটাবেজ স্কিমার উপর অন্ধ নির্ভরতা</code></pre>
      </div>
      <ul>
        <li><strong>Tight Coupling:</strong> একটি সার্ভিসের স্কিমা পরিবর্তন অন্য সব সার্ভিসকে ভাঙতে পারে — স্বাধীন ডিপ্লয়মেন্ট অসম্ভব হয়ে যায়।</li>
        <li><strong>অস্পষ্ট মালিকানা:</strong> কোন সার্ভিস কোন ডেটার "সত্যিকারের মালিক" তা স্পষ্ট থাকে না — একাধিক সার্ভিস একই টেবিলে লেখে বিজনেস নিয়ম লঙ্ঘন করতে পারে।</li>
        <li><strong>স্কেলিং বাধা:</strong> একটি সার্ভিস বেশি লোড পেলেও পুরো শেয়ার্ড ডাটাবেজ স্কেল করতে হয়।</li>
      </ul>
      <h4>সমাধান — Database-per-Service</h4>
      <p>প্রতিটি মাইক্রোসার্ভিসের নিজস্ব ডাটাবেজ থাকে, যা শুধু সেই সার্ভিসই সরাসরি অ্যাক্সেস করে। অন্য সার্ভিসের ডেটা দরকার হলে সরাসরি SQL query নয়, বরং সেই সার্ভিসের <strong>API কল করে বা ইভেন্ট শুনে</strong> ডেটা নিতে হয়। এতে প্রতিটি সার্ভিস স্বাধীনভাবে নিজের স্কিমা বদলাতে, স্কেল করতে ও ডিপ্লয় করতে পারে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Database-per-Service ব্যবহার করলে ক্রস-সার্ভিস JOIN-এর প্রয়োজন কীভাবে মেটাবেন (API composition বা CQRS read model)?</li>
      </ul>
    `
  },
  {
    id: "db-37",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing","Partial Index","Covering Index"],
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
    tags: ["PostgreSQL","pflow","Listen/Notify"],
    question: "PostgreSQL LISTEN / NOTIFY দিয়ে রিয়েল-টাইম ডাটাবেজ চেঞ্জ নোটিফিকেশন কীভাবে ট্র্যাকিং করবেন?",
    answer: `
      <p><strong>LISTEN/NOTIFY</strong> PostgreSQL-এর বিল্ট-ইন pub-sub মেকানিজম — ক্লায়েন্ট একটি চ্যানেলে <code>LISTEN</code> করে, এবং যেকোনো ট্রানজ্যাকশন সেই চ্যানেলে <code>NOTIFY</code> পাঠালে সব listening ক্লায়েন্ট তাৎক্ষণিক নোটিফিকেশন পায় — পোলিং ছাড়াই।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- ক্লায়েন্ট ১: একটি চ্যানেল সাবস্ক্রাইব করছে
LISTEN order_updates;

-- ট্রিগার ফাংশন দিয়ে স্বয়ংক্রিয় NOTIFY (সাধারণ প্যাটার্ন)
CREATE OR REPLACE FUNCTION notify_order_change() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('order_updates', json_build_object(
    'id', NEW.id, 'status', NEW.status
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_status_trigger
AFTER UPDATE OF status ON orders
FOR EACH ROW EXECUTE FUNCTION notify_order_change();</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Node.js ক্লায়েন্ট — নোটিফিকেশন গ্রহণ
const { Client } = require('pg');
const client = new Client();
await client.connect();
await client.query('LISTEN order_updates');
client.on('notification', (msg) => {
  const data = JSON.parse(msg.payload);
  broadcastToWebSocket(data);   // ফ্রন্টএন্ডে রিয়েল-টাইম পুশ
});</code></pre>
      </div>
      <h4>কীভাবে কাজ করে — ভেতরের প্রক্রিয়া</h4>
      <p><code>NOTIFY</code> যখন ট্রানজ্যাকশনের ভেতরে কল হয়, নোটিফিকেশন সাথে সাথে পাঠানো হয় না — <strong>ট্রানজ্যাকশন কমিট হওয়া পর্যন্ত queue হয়ে থাকে</strong>, তারপর একবারে delivered হয়। এটি গুরুত্বপূর্ণ: rollback হলে সেই নোটিফিকেশন কখনও পাঠানো হয় না — ডেটা ও নোটিফিকেশনের মধ্যে সামঞ্জস্য নিশ্চিত থাকে।</p>
      <h4>সীমাবদ্ধতা — কেন এটি সবসময় যথেষ্ট নয়</h4>
      <ul>
        <li><strong>Payload সীমা ৮০০০ বাইট</strong> — বড় ডেটা পাঠানো যায় না, শুধু ID/সংক্ষিপ্ত মেটাডেটা পাঠিয়ে ক্লায়েন্টকে পূর্ণ ডেটা আলাদাভাবে fetch করতে হয়।</li>
        <li><strong>কোনো persistence নেই</strong> — ক্লায়েন্ট যদি disconnected থাকে (নেটওয়ার্ক সমস্যা, ক্র্যাশ), সেই সময়ের নোটিফিকেশন চিরতরে হারিয়ে যায়। Kafka/RabbitMQ-এর মতো durable queue নয়।</li>
        <li><strong>প্রতিটি listening কানেকশন একটি নিবেদিত DB কানেকশন দখল করে থাকে</strong> — হাজার হাজার concurrent listener থাকলে এটি connection pool-এর উপর চাপ ফেলে; PgBouncer-এর transaction mode-এ LISTEN নির্ভরযোগ্যভাবে কাজ করে না (session mode দরকার)।</li>
        <li><strong>Fan-out সীমিত</strong> — একটি একক PostgreSQL ইনস্ট্যান্সের মধ্যেই কাজ করে, একাধিক ডাটাসেন্টার/রিজিয়নে ছড়ানো সিস্টেমে কাজ করে না।</li>
      </ul>
      <h4>কখন ব্যবহার করবেন, কখন Kafka/Redis Pub-Sub</h4>
      <p>ছোট থেকে মাঝারি স্কেলে (কয়েকশ concurrent listener, non-critical রিয়েল-টাইম ফিচার যেমন dashboard আপডেট) LISTEN/NOTIFY চমৎকার — অতিরিক্ত infrastructure ছাড়াই কাজ করে, ডেটা ও ইভেন্ট একই ট্রানজ্যাকশনে atomic থাকে। কিন্তু <strong>মেসেজ হারানো সহনীয় নয়</strong> এমন ক্ষেত্রে (payment, order processing) বা <strong>বিশাল স্কেলে</strong> Kafka/RabbitMQ-এর মতো durable message broker প্রয়োজন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>LISTEN/NOTIFY দিয়ে outbox pattern কীভাবে বাস্তবায়ন করা যায়?</li>
        <li>একাধিক অ্যাপ সার্ভার একই চ্যানেল LISTEN করলে সবাই কি একই নোটিফিকেশন পায়?</li>
      </ul>
    `
  },
  {
    id: "db-39",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Optimization","Bulk Insert","COPY"],
    question: "PostgreSQL COPY Command vs Bulk INSERT — ১ লাখ রেকর্ড ১ সেকেন্ডে আপলোডের উপায় কী?",
    answer: `
      <p>বড় পরিমাণে ডেটা লোড করার সময় সাধারণ <code>INSERT</code> স্টেটমেন্ট ও <code>COPY</code> কমান্ডের performance-এর পার্থক্য বিশাল — সঠিক পদ্ধতি বেছে নেওয়া bulk import-এর গতি ১০-১০০ গুণ বাড়াতে পারে।</p>
      <h4>কেন individual INSERT ধীর</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- ❌ ধীর: প্রতিটি INSERT আলাদা রাউন্ড-ট্রিপ + আলাদা ট্রানজ্যাকশন ওভারহেড
INSERT INTO events (user_id, action, ts) VALUES (1, 'click', now());
INSERT INTO events (user_id, action, ts) VALUES (2, 'click', now());
-- ১ লাখ বার repeat করলে: ১ লাখ নেটওয়ার্ক রাউন্ড-ট্রিপ + ১ লাখ WAL flush</code></pre>
      </div>
      <p>প্রতিটি individual <code>INSERT</code>-এ: (১) নেটওয়ার্ক রাউন্ড-ট্রিপ ল্যাটেন্সি, (২) parser/planner ওভারহেড, (৩) প্রতিটির জন্য আলাদা WAL (Write-Ahead Log) entry ও ডিস্ক ফ্ল্যাশ — এই তিনটি খরচ প্রতিটি রো-তে যোগ হয়।</p>
      <h4>COPY — বাল্ক লোডের জন্য ডিজাইন করা</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- ✅ দ্রুত: একটি single স্ট্রিমে সব ডেটা, minimal per-row overhead
COPY events (user_id, action, ts) FROM '/data/events.csv' WITH (FORMAT csv, HEADER true);

-- অথবা STDIN দিয়ে (অ্যাপ্লিকেশন থেকে স্ট্রিম করার সময়)
COPY events (user_id, action, ts) FROM STDIN WITH (FORMAT csv);</code></pre>
      </div>
      <p><code>COPY</code> একটি বিশেষ বাইনারি প্রোটোকল ব্যবহার করে যা: (১) parser/planner প্রতি-রো বাইপাস করে, (২) একটি একক স্ট্রিমে সব ডেটা পাঠায় — নেটওয়ার্ক রাউন্ড-ট্রিপ একবারই, (৩) WAL-এ ব্যাচে লেখে। এই কারণে ১ লাখ রেকর্ড কয়েক সেকেন্ডে লোড হতে পারে, যেখানে individual INSERT-এ মিনিট লেগে যেতে পারে।</p>
      <h4>Node.js থেকে COPY ব্যবহার (pg-copy-streams)</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { from } = require('pg-copy-streams');
const stream = client.query(from('COPY events (user_id, action, ts) FROM STDIN WITH (FORMAT csv)'));
fs.createReadStream('events.csv').pipe(stream);</code></pre>
      </div>
      <h4>Multi-row INSERT — যখন COPY সম্ভব নয়</h4>
      <p>যদি প্রতিটি রো-তে অ্যাপ্লিকেশন-স্তরের লজিক (validation, transformation) দরকার হয় এবং সরাসরি CSV স্ট্রিম করা সম্ভব না, তাহলে <strong>multi-row INSERT</strong> মাঝামাঝি সমাধান:</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- একটি স্টেটমেন্টে অনেক রো — round-trip খরচ কমে যায়
INSERT INTO events (user_id, action, ts) VALUES
  (1, 'click', now()), (2, 'click', now()), (3, 'view', now()), ...
  -- সাধারণত ১০০-১০০০ রো প্রতি ব্যাচে ভালো ফলাফল দেয়</code></pre>
      </div>
      <h4>Bulk লোডের সময় ইনডেক্স ও কনস্ট্রেইন্ট বিবেচনা — সিনিয়র-স্তরের অপ্টিমাইজেশন</h4>
      <ul>
        <li><strong>বড় লোডের আগে ইনডেক্স ড্রপ করে পরে পুনরায় তৈরি করুন:</strong> প্রতিটি রো ইনসার্টে সব ইনডেক্স আপডেট হয় — একটি খালি টেবিলে বাল্ক ডেটা লোড করার পর একবারে ইনডেক্স তৈরি করা প্রায়ই দ্রুততর।</li>
        <li><strong>Foreign key constraint সাময়িকভাবে <code>DEFERRED</code> করুন</strong> — প্রতিটি রো-তে চেক করার বদলে পুরো ট্রানজ্যাকশন শেষে একবারে যাচাই হয়।</li>
        <li><strong>একটি একক ট্রানজ্যাকশনে করুন</strong> — প্রতিটি রো আলাদা ট্রানজ্যাকশন হলে commit overhead বহুগুণ বেড়ে যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>COPY চলাকালীন যদি একটি রো ভুল ফরম্যাটে থাকে, পুরো অপারেশন কী হয়?</li>
        <li>খুব বড় ডেটাসেটে (১ কোটি+ রো) COPY-কেও কীভাবে আরও অপ্টিমাইজ করবেন (parallel COPY, unlogged table)?</li>
      </ul>
    `
  },
  {
    id: "db-40",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Types","UUID vs AutoIncrement","Performance"],
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
    tags: ["Joins","Nested Loop","Hash Join"],
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
    tags: ["PostgreSQL","pg_stat_activity","Slow Queries"],
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
    tags: ["PostgreSQL","Tablespace","Storage"],
    question: "PostgreSQL Tablespaces দিয়ে আলাদা ফিজিক্যাল ডিস্কে (NVMe SSD vs HDD) টেবিল স্টোর কীভাবে করবেন?",
    answer: `
      <p><strong>Tablespace</strong> PostgreSQL-এ একটি নির্দিষ্ট ফাইল সিস্টেম লোকেশনের নাম — এটি আপনাকে নির্দিষ্ট করতে দেয় কোন টেবিল/ইনডেক্স কোন ফিজিক্যাল ডিস্কে সংরক্ষিত হবে, যা I/O পারফরম্যান্স অপ্টিমাইজ করতে ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- একটি tablespace তৈরি — দ্রুত NVMe SSD-তে
CREATE TABLESPACE fast_ssd LOCATION '/mnt/nvme_ssd/pgdata';

-- একটি ধীর, সস্তা HDD-তে — কম-অ্যাক্সেস আর্কাইভ ডেটার জন্য
CREATE TABLESPACE archive_hdd LOCATION '/mnt/hdd_array/pgdata';

-- হট টেবিল (ঘন ঘন query হয়) দ্রুত ডিস্কে
CREATE TABLE active_orders (...) TABLESPACE fast_ssd;

-- পুরনো, কম-ব্যবহৃত ডেটা সস্তা ডিস্কে
CREATE TABLE archived_orders_2023 (...) TABLESPACE archive_hdd;

-- ইনডেক্সও আলাদা tablespace-এ রাখা যায় (টেবিল থেকে ভিন্ন ডিস্কে)
CREATE INDEX idx_orders_user ON active_orders(user_id) TABLESPACE fast_ssd;</code></pre>
      </div>
      <h4>কেন এটি গুরুত্বপূর্ণ — I/O bottleneck সমাধান</h4>
      <p>বড় প্রোডাকশন ডাটাবেজে সব ডেটা সমান গুরুত্বপূর্ণ বা সমান ঘন ঘন অ্যাক্সেস হয় না — সাম্প্রতিক অর্ডার প্রতিনিয়ত query হয়, কিন্তু ৩ বছরের পুরনো অর্ডার কালেভদ্রে দরকার হয়। সব ডেটা একই (ব্যয়বহুল, উচ্চ-পারফরম্যান্স) ডিস্কে রাখা অপ্রয়োজনীয় খরচ। Tablespace দিয়ে:</p>
      <ul>
        <li><strong>হট ডেটা (frequently accessed) → NVMe SSD</strong> — কম ল্যাটেন্সি, উচ্চ IOPS দরকার।</li>
        <li><strong>কোল্ড/আর্কাইভ ডেটা → HDD বা সস্তা storage</strong> — কম খরচ, পারফরম্যান্স তেমন গুরুত্বপূর্ণ না।</li>
        <li><strong>ইনডেক্স ও টেবিল আলাদা ডিস্কে</strong> — উভয়ই একইসাথে অ্যাক্সেস হয় (index scan + heap fetch), আলাদা ফিজিক্যাল ডিস্কে থাকলে I/O প্যারালাল হতে পারে (traditional spinning disk-এ বেশি প্রাসঙ্গিক, SSD-তে কম গুরুত্বপূর্ণ)।</li>
      </ul>
      <h4>Partitioning-এর সাথে সংমিশ্রণ — বাস্তব প্রোডাকশন প্যাটার্ন</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Time-based partition + tablespace tiering
CREATE TABLE orders (id bigint, created_at date, ...) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2026 PARTITION OF orders
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01') TABLESPACE fast_ssd;

CREATE TABLE orders_2023 PARTITION OF orders
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01') TABLESPACE archive_hdd;
-- সাম্প্রতিক পার্টিশন দ্রুত ডিস্কে, পুরনো পার্টিশন সস্তা ডিস্কে —
-- একই লজিক্যাল টেবিল, ভিন্ন ফিজিক্যাল স্টোরেজ tier</code></pre>
      </div>
      <h4>ব্যবহারিক সতর্কতা</h4>
      <ul>
        <li><strong>Cloud managed PostgreSQL-এ (RDS, Cloud SQL) tablespace সীমিতভাবে সমর্থিত</strong> — আন্ডারলাইং স্টোরেজ ম্যানেজড, তাই এই ফিচার সাধারণত self-hosted বা ব্যাপক কাস্টম infrastructure-এই বেশি প্রাসঙ্গিক।</li>
        <li><strong>ভুল tablespace সাইজিং</strong> ডিস্ক পূর্ণ হয়ে যাওয়ার ঝুঁকি তৈরি করে — মনিটরিং ছাড়া ব্যবহার করা বিপজ্জনক।</li>
        <li>আধুনিক NVMe SSD-এর যুগে, ইনডেক্স-বনাম-টেবিল আলাদা ডিস্কে রাখার সুবিধা কমে গেছে (traditional HDD-তে যতটা গুরুত্বপূর্ণ ছিল) — মূল ব্যবহার এখন hot/cold data tiering-এর জন্য।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Table partitioning ছাড়া শুধু tablespace দিয়ে hot/cold ডেটা আলাদা করা যায় কি?</li>
        <li>Tablespace বদলাতে (ALTER TABLE ... SET TABLESPACE) হলে টেবিল কি লক হয়ে যায়?</li>
      </ul>
    `
  },
  {
    id: "db-44",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Queries","GROUP BY","HAVING"],
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
    tags: ["Security","SQL Injection","Parameterized Queries"],
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
    tags: ["PostgreSQL","Extensions","pg_trgm"],
    question: "PostgreSQL Extension: pg_trgm (Trigram Index) দিয়ে Fuzzy Text Search কীভাবে করবেন?",
    answer: `
      <p><strong>pg_trgm</strong> একটি PostgreSQL এক্সটেনশন যা টেক্সটকে ৩-অক্ষরের টুকরা (trigram) হিসেবে ভেঙে ইনডেক্স করে — এর ফলে <code>LIKE '%pattern%'</code>-এর মতো ফাজি/সাবস্ট্রিং সার্চ এবং ভুল বানান সহনশীল অনুসন্ধান দ্রুত করা যায়, যা সাধারণ B-tree ইনডেক্স দিয়ে সম্ভব নয়।</p>
      <h4>সমস্যা — কেন সাধারণ ইনডেক্স কাজ করে না</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- B-tree ইনডেক্স থাকলেও এই কোয়েরি ইনডেক্স ব্যবহার করতে পারে না
SELECT * FROM products WHERE name LIKE '%phone%';
-- '%' প্যাটার্নের শুরুতে থাকায় B-tree কোনো prefix ম্যাচ করতে পারে না
-- → PostgreSQL পুরো টেবিল স্ক্যান করতে বাধ্য হয় (Seq Scan)</code></pre>
      </div>
      <p>B-tree ইনডেক্স সাজানো ডেটার উপর কাজ করে এবং <strong>prefix ম্যাচিং</strong>-এ ভালো (<code>LIKE 'phone%'</code>) — কিন্তু মাঝে বা শেষে প্যাটার্ন থাকলে (<code>%phone%</code>) সাজানো কাঠামোর কোনো সুবিধা নেওয়া যায় না।</p>
      <h4>Trigram ইনডেক্স কীভাবে কাজ করে</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>শব্দ "phone" ভেঙে trigram হয়:
  "  p", " ph", "pho", "hon", "one", "ne "
-- প্রতিটি ৩-অক্ষরের সাবস্ট্রিং আলাদাভাবে ইনডেক্স হয়

সার্চ "%phone%" করলে PostgreSQL এই trigram-গুলো দিয়ে দ্রুত candidate row খুঁজে বের করে,
তারপর সত্যিকারের ম্যাচ যাচাই করে — পুরো টেবিল স্ক্যান করতে হয় না</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE EXTENSION pg_trgm;

-- GIN ইনডেক্স ব্যবহার করে trigram-ভিত্তিক সার্চ দ্রুত করা
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);

-- এখন এই কোয়েরি ইনডেক্স ব্যবহার করবে
SELECT * FROM products WHERE name LIKE '%phone%';
SELECT * FROM products WHERE name ILIKE '%PHONE%';   -- case-insensitive-ও দ্রুত</code></pre>
      </div>
      <h4>Similarity/Fuzzy সার্চ — ভুল বানান সহনশীলতা</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- দুটি স্ট্রিং কতটা মিল, ০ থেকে ১ স্কেলে
SELECT similarity('phone', 'fone');   -- → 0.36 (আংশিক মিল)

-- ব্যবহারকারী ভুল বানান লিখলেও ফলাফল পাওয়া যায়
SELECT name, similarity(name, 'iphon') AS score
FROM products
WHERE name % 'iphon'              -- '%' অপারেটর: similarity থ্রেশহোল্ডের বেশি হলে ম্যাচ
ORDER BY score DESC
LIMIT 10;
-- pg_trgm.similarity_threshold (ডিফল্ট 0.3) দিয়ে সংবেদনশীলতা নিয়ন্ত্রণযোগ্য</code></pre>
      </div>
      <h4>কখন pg_trgm, কখন Elasticsearch</h4>
      <p>pg_trgm ছোট-থেকে-মাঝারি স্কেলে (কয়েক লাখ রো, প্রোডাক্ট সার্চ, অটোকমপ্লিট) চমৎকার কাজ করে — <strong>আলাদা কোনো infrastructure ছাড়াই</strong> ডাটাবেজের মধ্যেই সার্চ চলে, ডেটা sync করার প্রয়োজন নেই। কিন্তু relevance ranking, faceted search, বিশাল স্কেল (কোটি কোটি ডকুমেন্ট), বা full-text অ্যানালাইটিক্স দরকার হলে Elasticsearch বেশি উপযুক্ত — এটি পারপাস-বিল্ট সার্চ ইঞ্জিন যেখানে PostgreSQL মূলত একটি ট্রানজ্যাকশনাল ডাটাবেজ যাতে সার্চ ক্ষমতা যোগ করা হয়েছে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>GIN ও GiST ইনডেক্সের মধ্যে pg_trgm-এর জন্য কোনটি বেছে নেবেন এবং কেন?</li>
        <li>PostgreSQL-এর built-in Full-Text Search (tsvector/tsquery) ও pg_trgm-এর পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "db-47",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL","FDW","Foreign Data Wrapper"],
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
    tags: ["PostgreSQL","COLLATE","Case Insensitive"],
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
    tags: ["Resilience","Two-Phase Commit","2PC"],
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
    tags: ["PostgreSQL","Constraints","CHECK"],
    question: "PostgreSQL CHECK Constraints and EXCLUSION Constraints-এর সিকিউরিটি সুবিধা কী?",
    answer: `
      <p><strong>CHECK</strong> ও <strong>EXCLUSION</strong> constraint ডাটাবেজ-স্তরে ডেটা ইন্টিগ্রিটি নিয়ম প্রয়োগ করে — অ্যাপ্লিকেশন কোডের ভুল বা bypass সত্ত্বেও অবৈধ ডেটা টেবিলে ঢুকতে না পারার নিশ্চয়তা দেয়, যা নিরাপত্তার একটি গুরুত্বপূর্ণ স্তর।</p>
      <h4>CHECK Constraint — কলাম-স্তরের নিয়ম</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE TABLE products (
  id serial PRIMARY KEY,
  price numeric NOT NULL CHECK (price > 0),          -- নেগেটিভ দাম অসম্ভব
  discount numeric CHECK (discount BETWEEN 0 AND 100),
  status text CHECK (status IN ('active', 'draft', 'archived'))  -- enum-এর মতো
);

-- মাল্টি-কলাম CHECK
ALTER TABLE bookings ADD CONSTRAINT valid_dates
  CHECK (end_date > start_date);</code></pre>
      </div>
      <p><strong>কেন গুরুত্বপূর্ণ:</strong> অ্যাপ্লিকেশন-স্তরের validation (Zod, Joi) বাইপাস হতে পারে — সরাসরি DB access (admin script, migration, অন্য একটি সার্ভিস যা একই DB শেয়ার করে) দিয়ে অবৈধ ডেটা ঢুকতে পারে। CHECK constraint <strong>শেষ প্রতিরক্ষা স্তর</strong> — কোনোভাবেই negative price বা invalid status ডাটাবেজে থাকতে পারবে না, অ্যাপ্লিকেশন কোড যাই করুক না কেন।</p>
      <h4>EXCLUSION Constraint — ওভারল্যাপ প্রতিরোধ</h4>
      <p>CHECK constraint একটি রো-এর ভেতরের মান যাচাই করে, কিন্তু <strong>একাধিক রো-এর মধ্যে সম্পর্ক</strong> (যেমন সময়ের ওভারল্যাপ) যাচাই করতে পারে না — এখানেই EXCLUSION কাজে আসে।</p>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>CREATE EXTENSION btree_gist;

CREATE TABLE room_bookings (
  room_id integer,
  during tsrange,   -- সময়ের রেঞ্জ টাইপ
  EXCLUDE USING GIST (room_id WITH =, during WITH &&)
  -- অর্থ: একই room_id-এর জন্য দুটি রো-এর সময় রেঞ্জ ওভারল্যাপ করতে পারবে না
);

INSERT INTO room_bookings VALUES (101, '[2026-08-10 10:00, 2026-08-10 12:00)');
INSERT INTO room_bookings VALUES (101, '[2026-08-10 11:00, 2026-08-10 13:00)');
-- ❌ ERROR: conflicting key value violates exclusion constraint
-- ডাটাবেজ নিজেই ডাবল-বুকিং প্রতিরোধ করল, অ্যাপ্লিকেশন লজিকে race condition-এর ঝুঁকি ছাড়াই</code></pre>
      </div>
      <h4>কেন এটি নিরাপত্তার দৃষ্টিকোণ থেকে গুরুত্বপূর্ণ — Race Condition প্রতিরোধ</h4>
      <p>অ্যাপ্লিকেশন-স্তরে "চেক করে তারপর ইনসার্ট করুন" (check-then-insert) লজিক লিখলে দুটি concurrent রিকোয়েস্ট একই সময়ে চেক পাস করে ফেলতে পারে (উভয়ই দেখে রুম খালি আছে, তারপর উভয়ই বুক করে ফেলে) — এটি একটি ক্লাসিক <strong>race condition</strong> যা ডেটা ইন্টিগ্রিটি ভেঙে দেয়। EXCLUSION constraint ডাটাবেজ-স্তরে atomic গ্যারান্টি দেয় — কোনো race condition সম্ভবই না, কারণ ডাটাবেজ নিজেই প্রতিটি ইনসার্টে ওভারল্যাপ চেক করে একটি single atomic operation-এ।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>রিসোর্স বুকিং সিস্টেম:</strong> রুম, ইকুইপমেন্ট, ইন্টারভিউ স্লট — সময়ের ওভারল্যাপ প্রতিরোধ।</li>
        <li><strong>প্রাইস/টিয়ার রেঞ্জ:</strong> একই প্রোডাক্টে দুটি প্রাইসিং টিয়ার সংখ্যাগতভাবে ওভারল্যাপ করতে না পারা।</li>
        <li><strong>IP রেঞ্জ বরাদ্দ:</strong> নেটওয়ার্ক সাবনেট ওভারল্যাপ প্রতিরোধ।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Application-স্তরে distributed lock দিয়ে একই সমস্যা সমাধান করলে EXCLUSION constraint-এর তুলনায় কী ট্রেড-অফ হয়?</li>
        <li>CHECK constraint-এ subquery বা অন্য টেবিল রেফারেন্স করা যায় কি — কেন না?</li>
      </ul>
    `
  }
];
