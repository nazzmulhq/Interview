const databaseQuestions = [
  {
    id: "db-1",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ACID", "Transactions", "Fundamentals"],
    question: "Relational Database-এর ACID Properties (Atomicity, Consistency, Isolation, Durability) বিস্তারিত ব্যাখ্যা করুন।",
    answer: `
      <p>ডাটাবেজ ট্রানজেকশনের বিশ্বস্ততা, ডাটা ইন্টিগ্রিটি এবং ফল্ট-টলারেন্স বজায় রাখার জন্য **ACID** নীতি অনুসরণ করা হয়। এটি ৪টি মূল স্তম্ভের ওপর দাঁড়িয়ে আছে:</p>
      
      <h4>১. Atomicity (পারমাণবিকতা — "All or Nothing"):</h4>
      <p>ট্রানজেকশনের ভেতরে একাধিক SQL স্টেটমেন্ট থাকলে, হয় সেগুলোর **সবকয়টি সফলভাবে এক্সিকিউট হবে**, অন্যথায় **১টি কোয়েরি ফেইল করলেই পুরো ট্রানজেকশন আগের অবস্থায় রোলব্যাক (Rollback) হবে**। কোনো মধ্যবর্তী বা আংশিক স্টেট (Partial State) ডাটাবেজে সংরক্ষিত হবে না।</p>
      <ul>
        <li><strong>মেকানিজম:</strong> ডাটাবেজ ইঞ্জিন এটি অর্জন করতে <strong>Undo Log</strong> ব্যবহার করে। কোনো ট্রানজেকশন ফেইল করলে Undo Log থেকে ডাটার আগের অবস্থা রি-স্টোর করা হয়।</li>
      </ul>

      <h4>২. Consistency (সঙ্গতি):</h4>
      <p>ট্রানজেকশন শুরু হওয়ার আগে এবং শেষ হওয়ার পর ডাটাবেজ অবশ্যই সংজ্ঞায়িত সকল স্কিমা ইনভেরিয়েন্ট ও কনস্ট্রেইন্ট (Primary Key, Foreign Key, Unique, Check Constraints) মেনে চলবে। ডাটাবেজ কখনোই কোনো ইনভ্যালিড ডাটা স্টোর করতে দেবে না।</p>
      <ul>
        <li><strong>মেকানিজম:</strong> ডাটাবেজের কনস্ট্রেইন্ট চেকার এবং ক্যাসকেডিং রুলস ট্রানজেকশন কমিক হওয়ার ঠিক আগে এটি ভ্যালিডেট করে।</li>
      </ul>

      <h4>৩. Isolation (পৃথকীকরণ):</h4>
      <p>একই সময়ে কনকারেন্টলি (Concurrently) একাধিক ট্রানজেকশন চললেও একটি ট্রানজেকশনের মধ্যবর্তী অসম্পূর্ণ কাজ অন্য ট্রানজেকশন দেখতে পারবে না। প্রতিটি ট্রানজেকশন এমনভাবে এক্সিকিউট হবে যেন সে ডাটাবেজে একাই কাজ করছে।</p>
      <ul>
        <li><strong>মেকানিজম:</strong> এটি নিয়ন্ত্রণ করা হয় <strong>Locks (Shared/Exclusive)</strong> এবং <strong>MVCC (Multi-Version Concurrency Control)</strong>-এর মাধ্যমে।</li>
      </ul>

      <h4>৪. Durability (স্থায়িত্ব):</h4>
      <p>ট্রানজেকশন সফলভাবে <code>COMMIT</code> হয়ে গেলে পরবর্তীতে পাওয়ার কাট, সিস্টেম ক্র্যাশ বা ওএস ফেইলিয়র হলেও ডাটা স্থায়ীভাবে ডিস্কে সংরক্ষিত থাকবে।</p>
      <ul>
        <li><strong>মেকানিজম:</strong> ডাটাবেজ ইঞ্জিন মেমোরি থেকে মূল ডাটা ফাইলে লেখার আগেই <strong>WAL (Write-Ahead Log) / Redo Log</strong> সিঙ্ক্রোনাসলি ডিস্কে ফ্ল্যাশ করে।</li>
      </ul>

      <h4>ডাটাবেজ ইন্টারনালস ফ্লো (ASCII Architecture):</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ SQL Queries ] ──> [ RAM Buffer Pool ] ──(Sync Flush)──> [ WAL / Redo Log (Disk) ]
                           │                                      │
                   (Async Checkpoint)                     (Crash Recovery)
                           ▼                                      ▼
                  [ Main DB Data Files ] <─────────────────────────┘</code></pre>
      </div>

      <h4>বাস্তব প্র্যাকটিক্যাল উদাহরণ (Bank Transfer):</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>BEGIN TRANSACTION;

-- Step 1: Deduct 500 BDT from Account A
UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 'ACC_A' AND balance >= 500;

-- Savepoint for partial safety
SAVEPOINT debit_done;

-- Step 2: Add 500 BDT to Account B
UPDATE accounts 
SET balance = balance + 500 
WHERE account_id = 'ACC_B';

-- Validation: Check constraint violation or unexpected error
IF ERROR_OCCURRED THEN
    ROLLBACK TO debit_done; -- Rollback to savepoint
    ROLLBACK;               -- Abort full transaction (Atomicity)
ELSE
    COMMIT;                 -- Persist changes permanently (Durability via WAL)
END IF;</code></pre>
      </div>

      <p><em>ইন্টারভিউ টিপ:</em> আপনাকে প্রশ্ন করা হতে পারে "NoSQL ডাটাবেজ কেন ACID পুরোপুরি সাপোর্ট করে না?"—উত্তরে বলবেন, NoSQL ডাটাবেজ স্কেলেবিলিটি এবং Availability বাড়ানোর জন্য CAP Theorem অনুযায়ী Eventual Consistency গ্রহণ করে (BASE Architecture), ফলে multi-document ACID Isolation বিসর্জন দিতে হয়।</p>
    `
  },
  {
    id: "db-2",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing", "B-Tree", "Performance"],
    question: "Database Indexing কী? B-Tree Index কীভাবে কাজ করে এবং কী কী ধরনের Index থাকে?",
    answer: `
      <p><strong>Database Index</strong> হলো ডাটাবেজ টেবিলের একটি বিশেষ ডাটা স্ট্রাকচার (প্রধানত <strong>B-Tree / B+Tree</strong>) যা ফুল টেবিল স্ক্যান (Full Table Scan — $O(N)$) না করে খুব দ্রুত লগারিমিক টাইমে ($O(\log N)$) নির্দিষ্ট রো খুঁজে বের করতে সাহায্য করে।</p>
      
      <h4>B+Tree Index-এর অভ্যন্তরীণ মেکানিজম:</h4>
      <p>আধুনিক রিলেশনাল ডাটাবেজ (PostgreSQL, MySQL InnoDB) B-Tree-এর উন্নত সংস্করণ <strong>B+Tree</strong> ব্যবহার করে। ডাটাগুলো ডিস্ক পেজে ব্লক আকারে নোড সাজানো থাকে:</p>
      <ul>
        <li><strong>Root & Internal Nodes:</strong> কেবল সার্চ কী (Search Keys) এবং চাইল্ড পেজের পয়েন্টার স্টোর করে।</li>
        <li><strong>Leaf Nodes:</strong> মূল ডাটার পয়েন্টার বা ডাটা রো নিজেই ধারণ করে। সকল Leaf Node একটি **ডাবলি লিঙ্কড-লিস্ট (Doubly Linked List)** দিয়ে কানেক্টেড থাকে, যা Range Query (<code>BETWEEN</code>, <code>></code>, <code><</code>) দ্রুত সম্পন্ন করে।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>                    [ Root Node: 50 ]
                   /                 \
            [ Internal: 20 ]       [ Internal: 70 ]
             /          \           /          \
        [Leaf: 10,15] [Leaf: 20,30] [Leaf: 50,60] [Leaf: 70,80]
          └───────────┴───────────┴───────────┴───────────► (Doubly Linked List)</code></pre>
      </div>

      <h4>ইনডেক্সের বিস্তারিত প্রকারভেদ:</h4>
      <ul>
        <li><strong>Primary / Clustered Index:</strong> টেবিলের ফিজিক্যাল ডাটা যেভাবে ডিস্কে সাজানো থাকে তার ওপর নির্ভর করে। প্রতি টেবিলে কেবল ১টি Clustered Index থাকতে পারে (যেমন: MySQL InnoDB Primary Key)।</li>
        <li><strong>Secondary / Non-Clustered Index:</strong> এটি আলাদা একটি ইনডেক্স ট্রি তৈরি করে যেখানে ইনডেক্স কলাম এবং মূল ডাটার Primary Key / RowID জমা থাকে।</li>
        <li><strong>Composite Index:</strong> একাধিক কলামের কম্বিনেশনে তৈরি ইনডেক্স। এটি <strong>Leftmost Prefix Rule</strong> কড়াভাবে মেনে চলে।</li>
        <li><strong>Partial / Expression Index:</strong> নির্দিষ্ট শর্তে (<code>WHERE status = 'ACTIVE'</code>) বা কোনো ফাংশনের ফলাফলের ওপর (<code>LOWER(email)</code>) ইনডেক্স করা।</li>
        <li><strong>Covering Index:</strong> ইনডেক্স B-Tree পাতাতেই <code>INCLUDE</code> ক্লজ দিয়ে অতিরিক্ত কলাম রাখা, যাতে মূল ডাটা পেজ (Heap Page) রিড করতেই না হয় (Index-Only Scan)।</li>
      </ul>

      <h4>প্র্যাকটিক্যাল SQL উদাহরণ ও Leftmost Prefix Rule:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Composite Index Creation
CREATE INDEX idx_users_country_city_status ON users(country, city, status);

-- ✅ OPTIMAL: Uses index fully (Follows Leftmost Prefix)
SELECT * FROM users WHERE country = 'BD' AND city = 'Dhaka' AND status = 'ACTIVE';

-- ✅ USES INDEX: Uses country & city prefix
SELECT * FROM users WHERE country = 'BD' AND city = 'Dhaka';

-- ❌ INDEX SKIP: Cannot use B-Tree index (Skipped leftmost column 'country')
SELECT * FROM users WHERE city = 'Dhaka' AND status = 'ACTIVE';

-- Expression Index Example
CREATE INDEX idx_lower_email ON users(LOWER(email));
-- Query taking advantage of expression index:
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';</code></pre>
      </div>
    `
  },
  {
    id: "db-3",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Joins", "SQL", "Queries"],
    question: "SQL Joins-এর বিভিন্ন ধরন (INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF) উদাহরণসহ বুঝিয়ে বলুন।",
    answer: `
      <p>একাধিক টেবিলের মধ্যে প্রাইমারি ও ফরেন কী-এর সম্পর্কের ওপর ভিত্তি করে ডাটা একত্রিত করতে <code>JOIN</code> ব্যবহৃত হয়।</p>
      
      <h4>JOIN-এর ধরন ও লজিক্যাল বিহেভিয়ার:</h4>
      <ul>
        <li><strong>INNER JOIN:</strong> শুধুমাত্র উভয় টেবিলেই ম্যাচিং কী (Matching Rows) থাকলে সেই রেকর্ডগুলো ফেরত দেয়।</li>
        <li><strong>LEFT (OUTER) JOIN:</strong> বাম পাশের টেবিলের সব রেকর্ড এবং ডান পাশের টেবিলের কেবল ম্যাচিং রেকর্ড দেয়। না মিললে ডান পাশের কলামে <code>NULL</code> বসে।</li>
        <li><strong>RIGHT (OUTER) JOIN:</strong> ডান পাশের টেবিলের সব রেকর্ড এবং বাম পাশের টেবিলের ম্যাচিং রেকর্ড ফেরত দেয়।</li>
        <li><strong>FULL OUTER JOIN:</strong> দুটি টেবিলের সকল রেকর্ড নিয়ে আসে (অপ্রতুল তথ্যের ক্ষেত্রে <code>NULL</code> ধরে)।</li>
        <li><strong>CROSS JOIN:</strong> Cartesian Product তৈরি করে ($A \times B$)। ১ম টেবিলের প্রতিটি রো-কে ২য় টেবিলের প্রতিটি রো-এর সাথে গুণ করে।</li>
        <li><strong>SELF JOIN:</strong> যখন একটি টেবিলকে তার নিজের সাথেই জয়েন করা হয় (যেমন: Employee-Manager রিলেশন)।</li>
      </ul>

      <h4>প্র্যাকটিক্যাল কোড ও উদাহরণ:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. INNER JOIN Example
SELECT u.name, o.total_amount 
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- 2. LEFT JOIN Example (Find users with or without orders)
SELECT u.name, COALESCE(o.total_amount, 0) as total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- 3. SELF JOIN Example (Hierarchical Employee Tree)
SELECT 
    e.name AS Employee, 
    COALESCE(m.name, 'No Manager (CEO)') AS Manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- 4. CROSS JOIN Example (Generating Product-Size Matrix)
SELECT p.product_name, s.size_code
FROM products p
CROSS JOIN sizes s;</code></pre>
      </div>

      <p><em>পারফরম্যান্স নোট:</em> ডাটাবেজ ইঞ্জিন অভ্যন্তরীণভাবে ৩টি অ্যালগরিদম দিয়ে Join রান করে: <strong>Nested Loop Join</strong> (ছোট ডাটার জন্য), <strong>Hash Join</strong> (বড় আন-সর্টেড ডাটার জন্য) এবং <strong>Merge Join</strong> (সর্টেড ডাটার জন্য)।</p>
    `
  },
  {
    id: "db-4",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Isolation Levels", "Concurrency Anomalies", "MVCC"],
    question: "Database Transaction Isolation Levels কী কী? Dirty Read, Non-repeatable Read, Phantom Read এবং Write Skew কী?",
    answer: `
      <p>কনকারেন্ট ট্রানজেকশনে সমসাময়িক রিড/রাইট অপারেশনের সময় ডাটাবেজে ৪টি প্রধান সমস্যা (Anomalies) তৈরি হতে পারে। এগুলো প্রতিরোধ করার জন্য ANSI SQL ৪টি <strong>Isolation Level</strong> সংজ্ঞায়িত করেছে।</p>
      
      <h4>Concurrency Anomalies (সমস্যাসমূহ):</h4>
      <ul>
        <li><strong>Dirty Read:</strong> ট্রানজেকশন A কোনো ডাটা আপডেট করল কিন্তু কমিট করেনি। ট্রানজেকশন B সেই আন-কমিটেড ডাটা রিড করে ফেলল। পরবর্তীতে A ট্রানজেকশন Rollback করলে B-এর রিড করা ডাটা অবৈধ (Dirty) হয়ে যায়।</li>
        <li><strong>Non-repeatable Read:</strong> ট্রানজেকশন A একটি রো রিড করল। ট্রানজেকশন B সেই রো <code>UPDATE</code> বা <code>DELETE</code> করে Commit করল। A যদি একই ট্রানজেকশনে আবার রিড করে, সে ভিন্ন ভ্যালু পাবে।</li>
        <li><strong>Phantom Read:</strong> ট্রানজেকশন A নির্দিষ্ট শর্তে (<code>WHERE salary > 50000</code>) কিছু রো রিড করল। ট্রানজেকশন B নতুন একটি রো <code>INSERT</code> করে Commit করল। A পুনরায় একই কোয়েরি চালালে নতুন 'ভূতুড়ে' (Phantom) রো দেখতে পাবে।</li>
        <li><strong>Write Skew:</strong> Snapshot Isolation-এ দুটি কনকারেন্ট ট্রানজেকশন পৃথক কিন্তু সম্পর্কিত কন্ডিশনে ডাটা রাইট করার সময় ইনভেরিয়েন্ট ভেঙে ফেলা (যেমন: ২ জন অন-কল ডক্টর একই সাথে ডিউটি অফ রিকোয়েস্ট পাঠালে উভয়ই অফ হয়ে যাওয়া)।</li>
      </ul>

      <h4>Isolation Levels ও প্রটেকশন ম্যাট্রিক্স:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Isolation Level    | Dirty Read | Non-Repeatable Read | Phantom Read
───────────────────────────────────────────────────────────────────
Read Uncommitted   |    Yes     |         Yes         |     Yes
Read Committed     |     No     |         Yes         |     Yes
Repeatable Read    |     No     |          No         |  Yes (Postgres Exception: No)
Serializable       |     No     |          No         |      No</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Set Isolation Level in PostgreSQL per transaction
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT SUM(balance) FROM accounts WHERE user_id = 101;
-- Even if another transaction updates account 101 now, 
-- subsequent reads in this transaction will show consistent snapshot.

COMMIT;</code></pre>
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
      <p><strong>Window Function</strong> প্রচলিত <code>GROUP BY</code>-এর মতো সারির গ্রুপিংকে ভেঙে ১টি মাত্র রো-তে সংকুচিত না করে, প্রতিটি মূল রো অক্ষুণ্ণ রেখেই একটি নির্দিষ্ট উইন্ডো বা সাবসেটের সাপেক্ষে গণনা (Aggregation / Ranking) করার সুযোগ দেয়।</p>
      
      <h4>র্যাঙ্কিং উইন্ডো ফাংশনের তুলনা (ধরা যাক স্কোর সমান: 100, 100, 90):</h4>
      <ul>
        <li><code>ROW_NUMBER():</code> ১, ২, ৩ (টাই থাকলেও প্রতিটি রো-কে কড়া সিকুয়েনশিয়াল ইউনিক নম্বর দেয়)।</li>
        <li><code>RANK():</code> ১, ১, ৩ (টাই থাকলে একই নম্বর দেয় কিন্তু পরবর্তী র্যাঙ্ক স্কিপ করে চলে যায়)।</li>
        <li><code>DENSE_RANK():</code> ১, ১, ২ (টাই থাকলেও র্যাঙ্ক স্কিপ না করে পরপর সংখ্যা বসায়)।</li>
        <li><code>NTILE(N):</code> মোট রেজাল্ট সেটকে সমান N সংখ্যক গ্রুপে/কোয়ার্টাইলে ভাগ করে এনটি নম্বর অ্যাসাইন করে।</li>
      </ul>

      <h4>প্র্যাকটিক্যাল কোড (প্রতি ডিপার্টমেন্টের ২য় সর্বোচ্চ স্যালারি বের করার কৌশল):</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>WITH RankedEmployees AS (
    SELECT 
        id,
        name,
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id 
            ORDER BY salary DESC
        ) as salary_rank
    FROM employees
)
SELECT id, name, department_id, salary
FROM RankedEmployees
WHERE salary_rank = 2; -- Exactly 2nd highest salary per department</code></pre>
      </div>
    `
  },
  {
    id: "db-6",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Normalization", "1NF 2NF 3NF BCNF"],
    question: "Database Normalization কী? 1NF, 2NF, 3NF এবং BCNF-এর নিয়মগুলো বুঝিয়ে বলুন।",
    answer: `
      <p><strong>Normalization</strong> হলো ডাটাবেজ টেবিল ডিজাইনের একটি সিস্টেমিক রিফাইনমেন্ট প্রসেস যা ডাটা রিডানডেন্সি (অনাবশ্যক পুনরাবৃত্তি) কমায় এবং ইনসার্ট, আপডেট ও ডিলিট অ্যানোমালি প্রতিরোধ করে ডাটা ইন্টিগ্রিটি বজায় রাখে।</p>
      
      <h4>নরম্যালাইজেশনের ধাপসমূহ:</h4>
      <ul>
        <li><strong>1NF (First Normal Form):</strong> টেবিলে প্রতিটি কলামের ভ্যালু পারমাণবিক (Atomic / Single scalar value) হতে হবে। কোনো রিপিটিং গ্রুপ, ডুপ্লিকেট কলাম বা অ্যারে থাকা যাবে না।</li>
        <li><strong>2NF (Second Normal Form):</strong> 1NF পূরণ করতে হবে এবং কোনো <em>Partial Dependency</em> থাকা যাবে না (নন-প্রাইম কলাম কম্পোজিট প্রাইমারি কী-এর আংশিক অংশের ওপর নির্ভর করতে পারবে না, পুরো কী-এর ওপর নির্ভর করতে হবে)।</li>
        <li><strong>3NF (Third Normal Form):</strong> 2NF পূরণ করতে হবে এবং কোনো <em>Transitive Dependency</em> থাকা যাবে না (নন-প্রাইম কলাম থেকে অন্য নন-প্রাইম কলামে নির্ভরতা রিমুভ করা: $A \to B \to C$ রিমুভ করা)।</li>
        <li><strong>BCNF (Boyce-Codd Normal Form):</strong> 3NF-এর কড়া সংস্করণ। সকল ফাংশনাল ডিপেন্ডেন্সি $X \to Y$-এর ক্ষেত্রে $X$-কে অবশ্যই একটি Super Key হতে হবে।</li>
      </ul>

      <h4>ভিজ্যুয়াল স্কিমা রিফ্যাক্টরিং:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- ❌ Bad Schema (Violates 1NF - Array in single column):
-- Student(id, name, courses: "Math, Physics, CS")

-- ✅ 1NF Compliant Normalized Schema:
CREATE TABLE student_courses (
    student_id INT,
    course_name VARCHAR(50),
    PRIMARY KEY (student_id, course_name),
    FOREIGN KEY (student_id) REFERENCES students(id)
);</code></pre>
      </div>
    `
  },
  {
    id: "db-7",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Query Optimization", "EXPLAIN ANALYZE"],
    question: "Slow SQL Query কীভাবে অপ্টিমাইজ করবেন? EXPLAIN বা EXPLAIN ANALYZE দিয়ে কীভাবে Index verify করবেন?",
    answer: `
      <p>SQL Performance Tuning-এর জন্য পদ্ধতিগত সমাধান কৌশল:</p>
      <ol>
        <li><code>EXPLAIN (ANALYZE, BUFFERS)</code> প্রয়োগ: কুয়েরির প্ল্যানার স্টেপ, আসল এক্সিকিউশন টাইম, মোট কস্ট এবং বাফার হিট দেখা।</li>
        <li><strong>কুয়েরি প্ল্যান আউটপুট ডিকোডিং:</strong>
          <ul>
            <li><code>Seq Scan</code> / <code>Table Scan</code>: ইনডেক্স মিসিং নির্দেশ করে (খারাপ)।</li>
            <li><code>Index Scan</code> / <code>Index Only Scan</code>: ইনডেক্স সঠিক ব্যবহার হচ্ছে (ভালো)।</li>
            <li><code>Bitmap Index Scan</code>: একাধিক ইনডেক্স কন্ডিশন একসাথে মেলাচ্ছে।</li>
          </ul>
        </li>
        <li><strong>কলাম ফিল্টারে ফাংশন এড়ানো:</strong> <code>WHERE UPPER(email) = 'X'</code> না লিখে Expression Index ব্যবহার করা।</li>
        <li><code>SELECT *</code> এর পরিবর্তে নির্দিষ্ট কলাম সিলেক্ট করে Covering Index সুবিধা নিশ্চিত করা।</li>
      </ol>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Step 1: Analyze slow query
EXPLAIN (ANALYZE, BUFFERS) 
SELECT id, name FROM users WHERE email = 'test@example.com';

-- Output Output Example (Bad - Sequential Scan):
-- Seq Scan on users  (cost=0.00..35.50 rows=1 width=16) (actual time=14.210..14.212 rows=1 loops=1)
-- Buffers: shared read=120

-- Step 2: Add Index
CREATE INDEX idx_users_email ON users(email);

-- Step 3: Verify optimization
-- Index Scan using idx_users_email on users  (cost=0.28..8.29 rows=1 width=16) (actual time=0.035..0.036 rows=1 loops=1)
-- Buffers: shared hit=3</code></pre>
      </div>
    `
  },
  {
    id: "db-8",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Locking", "Deadlocks", "Optimistic Pessimistic"],
    question: "Pessimistic Locking এবং Optimistic Locking-এর পার্থক্য কী? Deadlock কী এবং কীভাবে এড়ানো যায়?",
    answer: `
      <p>কনকারেন্ট রাইট অপারেশনে রেস কন্ডিশন ঠেকাতে ২ প্রকার লকিং মেকানিজম ব্যবহার করা হয়:</p>
      <ul>
        <li><strong>Pessimistic Locking:</strong> ধরে নেওয়া হয় সংঘাত ঘটবেই। তাই ডাটা রিড করার সময়ই সারিতে <code>SELECT ... FOR UPDATE</code> চালিয়ে এক্সক্লুসিভ লক বসানো হয়। অন্যদের অপেক্ষা করতে হয়। (উচ্চ কনফ্লিক্ট এরিয়া যেমন: ব্যাংকিং ট্রান্সফার, ইনভেন্টরি স্টক বাইং)।</li>
        <li><strong>Optimistic Locking:</strong> ধরে নেওয়া হয় সংঘাত কম হবে। তাই লক না বসিয়ে একটি <code>version</code> বা <code>updated_at</code> কলাম ট্র্যাক রাখা হয়। আপডেটের সময় ভার্সন চেক করে আপডেট করা হয়। (কম কনফ্লিক্ট এরিয়া যেমন: ইউজার প্রোফাইল আপডেট)।</li>
      </ul>

      <h4>Deadlock কী এবং কীভাবে এড়াবেন?</h4>
      <p>যখন ২ বা ততধিক ট্রানজেকশন একে অপরের লক করা রিসোর্সের জন্য অনির্দিষ্টকালের জন্য সাইক্লিক অপেক্ষায় (Circular Wait) আটকে থাকে, তাকে Deadlock বলে।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Optimistic Locking Query Pattern
UPDATE products 
SET stock = stock - 1, version = version + 1
WHERE id = 101 AND version = 5; 
-- If affected rows = 0, application handles retry logic.

-- Preventing Deadlock: Maintain strict identical lock acquisition order across transactions
-- Transaction A & B must update 'accounts' first, then 'orders' (Never reverse order).</code></pre>
      </div>
    `
  },
  {
    id: "db-9",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Connection Pooling", "Performance"],
    question: "Database Connection Pooling কী এবং ব্যাকএন্ডে এটি কেন অত্যন্ত গুরুত্বপূর্ণ?",
    answer: `
      <p>ডাটাবেজ কানেকশন তৈরি করা (TCP 3-Way Handshake, SSL/TLS, Authentication, Session Memory Allocation) অত্যন্ত ব্যয়বহুল (Costly) অপারেশন।</p>
      <p><strong>Connection Pool</strong> হলো আগে থেকে তৈরি করে রাখা পুনর্ব্যবহারযোগ্য (Reusable) ডাটাবেজ সকেটের একটি সেট। ব্যাকএন্ড অ্যাপ যখন কোনো কোয়েরি করতে চায়, সে কানেকশন পুল থেকে একটি কানেকশন ধার নেয় এবং কাজ শেষে পুলে ফেরত দেয়।</p>

      <h4>সুবিধাসমূহ & Sizing Formula:</h4>
      <ul>
        <li><strong>ল্যাটেন্সি হ্রাস:</strong> প্রতিটি রিকোয়েস্টে নতুন কানেকশন তৈরি ও বন্ধের ওভারহেড পুরোপুরি দূর হয়।</li>
        <li><strong>Resource Protection:</strong> ডাটাবেজ সার্ভারের ওপর অতিরিক্ত লাইভ কানেকশনের প্রেশার পড়ে ক্র্যাশ করা ঠেকায় (<code>max_connections</code> এর ভয় থাকে না)।</li>
        <li><strong>Pool Sizing Formula (HikariCP Benchmark):</strong> $Connections = (CPU\ cores \times 2) + Effective\ Spindle\ Count$</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Node.js pg pool configuration
const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.internal',
  user: 'app_user',
  database: 'prod_db',
  max: 20,                  // Max 20 sockets in pool
  idleTimeoutMillis: 30000, // Close idle socket after 30s
  connectionTimeoutMillis: 2000 // Error if connection not acquired in 2s
});

module.exports = pool;</code></pre>
      </div>
    `
  },
  {
    id: "db-10",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Database", "Replication", "Consistency", "Senior"],
    question: "Read Replica Lag থাকা অবস্থায় Read-Your-Own-Writes Consistency সমস্যা কীভাবে সমাধান করবেন?",
    answer: `
      <p>Master-এ Write করার সাথে সাথে যদি একই ইউজার Read Replica থেকে Read করে, Replication Lag-এর কারণে ডাটা সিঙ্ক না হওয়ায় ব্যবহারকারী নিজের সদ্য করা আপডেট দেখতে না পারার বিভ্রান্তিকর সমস্যা ঘটে — একে <strong>Read-Your-Own-Writes</strong> সমস্যা বলে।</p>
      
      <h4>সমাধান কৌশলসমূহ:</h4>
      <ul>
        <li><strong>Session-Sticky Read Routing:</strong> কোনো ইউজার রাইট অপারেশন করলে একটি টাইমস্ট্যাম্প কুকি/সেশনে সেভ করা। পরবর্তী নির্দিষ্ট সময় (যেমন: ৩ সেকেন্ড) সেই ইউজারের সকল রিড সরাসরি Master DB-তে রাউট করা।</li>
        <li><strong>LSN / Read-Your-Writes Token:</strong> Write অপারেশনের Replication Position (Postgres LSN / MySQL Binlog Offset) ক্লায়েন্টকে ফেরত দেয়া; Read করার সময় সেই LSN পার হওয়া Replica খুঁজে বের করে সেখান থেকে পড়া।</li>
        <li><strong>Optimistic UI State:</strong> ব্যাকএন্ড থেকে রিচ না করে ক্লায়েন্ট স্টেটেই সাথে সাথে আপডেট ভিউ দেখানো।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Express.js DB Routing Middleware Example
function routeDbRequest(req, res, next) {
  const lastWriteTime = req.session.lastWriteTimestamp || 0;
  const REPLICATION_LAG_WINDOW_MS = 3000; // 3 Seconds

  if (Date.now() - lastWriteTime < REPLICATION_LAG_WINDOW_MS) {
    req.db = primaryMasterDbPool; // Route to Master
  } else {
    req.db = readReplicaPool;     // Route to Read Replica
  }
  next();
}</code></pre>
      </div>
    `
  },
  {
    id: "db-11",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Internals", "RDBMS", "ACID", "WAL"],
    question: "RDBMS-এ WAL (Write-Ahead Logging) কী এবং এটি কীভাবে ACID Durability ও Crash Recovery নিশ্চিত করে?",
    answer: `
      <p><strong>Write-Ahead Logging (WAL)</strong> বা Redo Log হলো RDBMS (PostgreSQL, MySQL InnoDB, SQLite)-এর একটি সেন্ট্রাল আর্কিটেকচারাল মেকানিজম যা নিশ্চিত করে যে মূল ডাটা ফাইলে (Disk Data Pages) পরিবর্তন করার আগেই সেই পরিবর্তনের বর্ণনা ডিস্কে লগে সিঙ্ক্রোনাসলি রাইট করা হবে।</p>
      
      <h4>WAL কীভাবে কাজ করে (ARIES Protocol Step-by-step):</h4>
      <ol>
        <li><strong>RAM Buffer-এ পরিবর্তন:</strong> ইউজার যখন কোনো <code>UPDATE</code> বা <code>INSERT</code> চালায়, তখন ডাটাবেজ ইঞ্জিন সরাসরি ডিস্কে রাইট না করে RAM-এর **Buffer Pool**-এ সংশ্লিষ্ট ডাটা পেজ মডিফাই করে (যাকে Dirty Page বলে)।</li>
        <li><strong>WAL Buffer-এ লগ তৈরি:</strong> একই সাথে মেমোরির **WAL Buffer**-এ ওই অপারেশনের লজিক্যাল রেকর্ড তৈরি হয়।</li>
        <li><strong>Synchronous Flush on Commit:</strong> ইউজার যখন <code>COMMIT</code> কমান্ড দেয়, ডাটাবেজ ইঞ্জিন <code>fsync()</code> সিস্টেম কলের মাধ্যমে WAL লগকে ডিস্কে রাইট করে। WAL রাইট সফল হলেই ইউজারকে "Commit Successful" মেসেজ পাঠানো হয়।</li>
        <li><strong>Asynchronous Page Flush (Checkpointing):</strong> RAM-এ থাকা Dirty Page-গুলো পরবর্তীতে ব্যাকগ্রাউন্ড প্রসেস (Checkpointer) দিয়ে আস্তে আস্তে মূল ডাটা ফাইলে ফ্ল্যাশ হয়।</li>
      </ol>

      <h4>ক্র্যাশ রিকভারি প্রসেস (Crash Recovery Cycle):</h4>
      <p>যদি Dirty Page ডিস্কে সেভ হওয়ার আগেই বিদ্যুৎ চলে যায় বা ডাটাবেজ ক্র্যাশ করে, তবে RAM-এর সব ডাটা মুছে যায়। কিন্তু WAL লগ ইতিমধ্যে ডিস্কে সিঙ্ক করা ছিল। ডাটাবেজ পুনরায় স্টার্ট হওয়ার সময় ৩টি ফেজে রিকভারি করে:</p>
      <ul>
        <li><strong>Analysis Phase:</strong> শেষ সফল Checkpoint থেকে WAL রিড করে কোন কোন ট্রানজেকশন কমিটেড এবং কোনগুলো আন-কমিটেড ছিল তা চিহ্নিত করে।</li>
        <li><strong>Redo Phase (REPLAY):</strong> কমিটেড ট্রানজেকশনগুলোর সব পরিবর্তন পুনরায় চালিয়ে ডাটাবেজকে ক্র্যাশের মুহূর্তের অবস্থায় ফিরিয়ে আনে (Durability)।</li>
        <li><strong>Undo Phase (ROLLBACK):</strong> যেসব ট্রানজেকশন কমিট হওয়ার আগেই ক্র্যাশ করেছিল,Undo Log ব্যবহার করে সেগুলোর পরিবর্তন রোলব্যাক করে (Atomicity)।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ User Query ] ──> [ RAM: Buffer Pool (Dirty Page) ]
                         │
                         ├────(Synchronous Flush on Commit)───> [ WAL File on Disk ] ──► COMMIT ACK
                         │
               (Async Checkpoint Process)
                         │
                         ▼
             [ Main Data Files on Disk ]</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- PostgreSQL WAL Configuration Example (postgresql.conf)
wal_level = replica                  -- Controls how much information is written to WAL
max_wal_size = 1GB                   -- Maximum size to let WAL grow during checkpoints
checkpoint_completion_target = 0.9   -- Spreads checkpoint I/O over time to avoid disk spikes</code></pre>
      </div>
    `
  },
  {
    id: "db-12",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["SQL", "Programmability", "RDBMS"],
    question: "Stored Procedures, User-Defined Functions (UDF) এবং Triggers-এর মধ্যে মূল পার্থক্য কী?",
    answer: `
      <p>ডাটাবেজ সার্ভার সাইড প্রোগামেবিলিটির ৩টি প্রধান উপাদানের ফিচার ও আর্কিটেকচারাল পার্থক্য নিম্নে বিস্তৃতভাবে তুলে ধরা হলো:</p>
      
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>Stored Procedure</th>
          <th>User-Defined Function (UDF)</th>
          <th>Trigger</th>
        </tr>
        <tr>
          <td><strong>ইনভোকেশন</strong></td>
          <td><code>CALL proc_name()</code> দিয়ে ম্যানুয়ালি বা অ্যাপ কোড থেকে।</td>
          <td>SQL স্টেটমেন্টের ভেতর সরাসরি (<code>SELECT func() FROM tbl</code>)।</td>
          <td>DML ইভেন্টে (<code>INSERT/UPDATE/DELETE</code>) অটোমেটিক।</td>
        </tr>
        <tr>
          <td><strong>রিটার্ন ভ্যালু</strong></td>
          <td>রিটার্ন করা বাধ্যতামূলক নয় (০ বা একাধিক রেজাল্ট সেট দিতে পারে)।</td>
          <td>বাধ্যতামূলকভাবে একটি সিঙ্গেল মান (Scalar) বা টেবিল (Table) দেয়।</td>
          <td>কোনো মান রিটার্ন করে না (তবে NEW/OLD রেকর্ড মোডিফাই করতে পারে)।</td>
        </tr>
        <tr>
          <td><strong>ট্রানজেকশন কন্ট্রোল</strong></td>
          <td>ভিতরে <code>COMMIT</code> এবং <code>ROLLBACK</code> চালানো যায়।</td>
          <td>ভিতরে ট্রানজেকশন ম্যানেজমেন্ট (Commit/Rollback) সম্পূর্ণ নিষিদ্ধ।</td>
          <td>প্যারেন্ট ট্রানজেকশনের অংশ হিসেবে কাজ করে (আলাদা Commit সম্ভব নয়)।</td>
        </tr>
        <tr>
          <td><strong>DML/DDL ব্যবহার</strong></td>
          <td><code>INSERT</code>, <code>UPDATE</code>, <code>CREATE TABLE</code> ইত্যাদি সব চালানো যায়।</td>
          <td>কেবল মাত্র ডাটা রিড/ক্যালকুলেশন বা সাইড-ইফেক্ট ফ্রি DML সম্ভব।</td>
          <td>টেবিলের ডাটা মোডিফাই বা অন্য অডিট টেবিলে ইনসার্ট করতে পারে।</td>
        </tr>
        <tr>
          <td><strong>ব্যবহারের ক্ষেত্র</strong></td>
          <td>জটিল এন্ড-টু-এন্ড বিজনেস ওয়ার্কফ্লো প্রসেসিং।</td>
          <td>কম্পিউটেশন বা ডাটা ফরম্যাটিং (যেমন: ট্যাক্স হিসাব, ফাজি টেক্সট)।</td>
          <td>অডিট ট্রেইল (Audit Logging), ডেটা সিকিউরিটি বা ক্যাসকেড কাস্টম চেক।</td>
        </tr>
      </table>

      <h4>প্র্যাকটিক্যাল কোড উদাহরণসমূহ:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. User-Defined Function (Calculates Tax)
CREATE FUNCTION calculate_tax(amount NUMERIC) RETURNS NUMERIC AS $$
BEGIN
    RETURN amount * 0.15; -- 15% Tax
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Usage in SELECT:
SELECT id, total_amount, calculate_tax(total_amount) AS tax FROM orders;

-- 2. Trigger Function for Audit Logging
CREATE OR REPLACE FUNCTION audit_user_email_change() RETURNS TRIGGER AS $$
BEGIN
    IF OLD.email IS DISTINCT FROM NEW.email THEN
        INSERT INTO audit_logs(user_id, old_email, new_email, changed_at)
        VALUES (OLD.id, OLD.email, NEW.email, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_email_change
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION audit_user_email_change();</code></pre>
      </div>
    `
  },
  {
    id: "db-13",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["ORM", "Performance", "SQL"],
    question: "ORM-এ N+1 Query Problem কী এবং Eager Loading (JOIN / Include) দিয়ে এটি কীভাবে সমাধান করা হয়?",
    answer: `
      <p><strong>N+1 Query Problem</strong> হলো ORM (Prisma, Sequelize, TypeORM, Hibernate) ব্যবহারের সময় ঘটা সবচেয়ে কমন পারফরম্যান্স অ্যান্টি-প্যাটার্ন। যখন একটি প্যারেন্ট লিস্ট আনার জন্য ১টি কোয়েরি চালানো হয়, এবং এরপর লুপের ভেতর প্রতিটি প্যারেন্টের রিলেটেড চাইল্ড ডাটা আনার জন্য আলাদা আলাদা N-সংখ্যক কোয়েরি ডাটাবেজে হিট করে, তখন মোট $1 + N$ টি কোয়েরি এক্সিকিউট হয়।</p>
      
      <h4>সমস্যাটি যেভাবে তৈরি হয় (১০০ জন ইউজারের ১০০টি পোস্টের উদাহরণ):</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ BAD: Triggers N+1 SQL Queries (1 Query for Users + 100 Queries for Posts)
const users = await prisma.user.findMany(); // Query 1: SELECT * FROM "User";

for (const user of users) {
  // Queries 2 to 101: SELECT * FROM "Post" WHERE "userId" = 1, 2, 3...
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
  console.log(user.name, posts.length);
}
// Result: 101 Network Round-trips to DB! Database connection pool gets exhausted.</code></pre>
      </div>

      <h4>আর্কিটেকচারাল পার্থক্য (N+1 vs Eager Loading):</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ N+1 Problem ]     App  ──(101 Queries)──► DB Engine  (High Latency / High CPU)
[ Eager Loading ]   App  ──( 1  Query )───► DB Engine  (Fast / Efficient JOIN)</code></pre>
      </div>

      <h4>সমাধান (Eager Loading):</h4>
      <p>Eager Loading-এর মাধ্যমে ORM একক <code>LEFT OUTER JOIN</code> চালিয়ে অথবা ১টি <code>IN (...)</code> সাব-কোয়েরি ব্যাচ করে একবারেই সব ডাটা নিয়ে আসে।</p>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ GOOD: Eager Loading using 'include' (Executes ONLY 1 Single SQL Query with JOIN)
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true // Instructs ORM to perform an Eager Load
  }
});

// Generated SQL by ORM:
// SELECT "User"."id", "User"."name", "Post"."id" AS "post_id", "Post"."title" 
// FROM "User" 
// LEFT JOIN "Post" ON "User"."id" = "Post"."userId";</code></pre>
      </div>
    `
  },
  {
    id: "db-14",
    category: "Database",
    difficulty: "Beginner",
    tags: ["Integrity", "Foreign Key", "SQL"],
    question: "Foreign Key Constraints এবং ON DELETE CASCADE, SET NULL, RESTRICT-এর পার্থক্য কী?",
    answer: `
      <p><strong>Foreign Key (FK) Constraint</strong> হলো Relational Database-এর একটি গুরুত্বপূর্ণ নিয়ম যা ২টি টেবিলের (Parent Table & Child Table) মধ্যে <strong>Referential Integrity</strong> বজায় রাখে। এটি নিশ্চিত করে যে চাইল্ড টেবিলে এমন কোনো রেফারেন্স কী থাকতে পারবে না যা প্যারেন্ট টেবিলে বিদ্যমান নেই।</p>
      
      <h4>ON DELETE / ON UPDATE রুলস-এর তুলনা:</h4>
      <ul>
        <li><strong>ON DELETE CASCADE:</strong> প্যারেন্ট টেবিল থেকে কোনো রো ডিলিট করা হলে, চাইল্ড টেবিলে থাকা ওই প্যারেন্টের সাথে সম্পর্কিত সকল রেকর্ড **স্বয়ংক্রিয়ভাবে মুছে যাবে**। (ব্যবহার: Order & OrderItems, User & UserProfile)।</li>
        <li><strong>ON DELETE SET NULL:</strong> প্যারেন্ট রো ডিলিট হলে, চাইল্ড রো-গুলো মুছবে না, কিন্তু চাইল্ডের Foreign Key কলামটি <code>NULL</code> হয়ে যাবে। (ব্যবহার: Post & Author — যেখানে লেখক একাউন্ট ডিলিট করলেও পোস্ট রেখে দেওয়া হয়)। <em>নোট: FK কলামটি অবশ্যই Nullable হতে হবে।</em></li>
        <li><strong>ON DELETE RESTRICT:</strong> যদি চাইল্ড টেবিলে ওই প্যারেন্টের অন্তত একটি রেফারেন্সও অবশিষ্ট থাকে, তবে ডাটাবেজ প্যারেন্ট রো ডিলিট হতে **বাধা দেবে** এবং ফরেন কী এরর থ্রো করবে। (ব্যবহার: Bank Account & Transactions — ট্রানজেকশন ডাটা থাকা অবস্থায় অ্যাকাউন্ট ডিলিট আটকানো)।</li>
        <li><strong>ON DELETE NO ACTION:</strong> RESTRICT-এর মতোই কাজ করে, তবে কিছু ডাটাবেজে (যেমন Postgres) এটি ট্রানজেকশনের শেষে (Deferred Check) ভ্যালিডেশন চালায়।</li>
        <li><strong>ON DELETE SET DEFAULT:</strong> প্যারেন্ট ডিলিট হলে চাইল্ডের FK কলামে টেবিল ডিজাইনে থাকা ডিফল্ট ভ্যালু বসে যাবে।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Practical Table Definition with Constraints
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    CONSTRAINT fk_author 
        FOREIGN KEY (author_id) 
        REFERENCES users(id) 
        ON DELETE SET NULL -- If user deleted, keep post but set author_id = NULL
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_name VARCHAR(255),
    CONSTRAINT fk_order 
        FOREIGN KEY (order_id) 
        REFERENCES orders(id) 
        ON DELETE CASCADE -- If order is deleted, wipe order_items automatically
);</code></pre>
      </div>
    `
  },
  {
    id: "db-15",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Architecture", "Replication", "Scaling"],
    question: "Database Master-Slave Replication এবং Read Replicas কীভাবে কাজ করে?",
    answer: `
      <p>হাই-ট্রাফিক অ্যাপ্লিকেশনে ডাটাবেজের থ্রুপুট বাড়ানো, রিড-রাইট লোড আলাদা করা এবং High Availability (HA) সুনিশ্চিত করতে <strong>Master-Slave (Primary-Replica) Replication</strong> আর্কিটেকচার ব্যবহৃত হয়।</p>
      
      <h4>আর্কিটেকচারাল কম্পোনেন্টস:</h4>
      <ul>
        <li><strong>Master (Primary) Node:</strong> অ্যাপ্লিকেশনের সমস্ত Write অপারেশন (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, DDL) গ্রহণ করে। প্রতিটি পরিবর্তনের ঘটনা WAL (Postgres) বা Binlog (MySQL)-এ রেকর্ড করে।</li>
        <li><strong>Slave (Read Replica) Nodes:</strong> মাস্টার নোড থেকে ডিস্ক সার্ভিস বা নেটওয়ার্ক স্ট্রিম ক্যোয়ারীর মাধ্যমে WAL/Binlog গ্রহণ করে এবং নিজের লোকাল ডাটা পেজে প্রতিনিয়ত Replay করে সিঙ্ক থাকে। এগুলো কেবল <code>SELECT</code> (Read) কোয়েরি প্রসেস করে।</li>
      </ul>

      <h4>Replication Mode-এর প্রকারভেদ:</h4>
      <ul>
        <li><strong>Asynchronous Replication (ডিফল্ট):</strong> মাস্টার নোড ডিস্কে WAL সেভ করার পর পরই ইউজারকে Success অ্যাকনলেজমেন্ট পাঠিয়ে দেয়, স্লেভ সিঙ্ক হওয়ার জন্য অপেক্ষা করে না। (খুব ফাস্ট, কিন্তু মাস্টার ক্র্যাশ করলে সামান্য Data Loss বা Replication Lag হতে পারে)।</li>
        <li><strong>Synchronous Replication:</strong> মাস্টারে রাইট করার পর অন্তত ১টি স্লেভ নোড ডিস্কে WAL সিঙ্ক সম্পন্ন করার বার্তা না পাঠানো পর্যন্ত ইউজার অ্যাকনলেজমেন্ট পায় না। (জিরো ডাটা লস, কিন্তু ল্যাটেন্সি একটু বেশি)।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>                         ┌──► [ Read Replica 1 ] (SELECTs)
                         │
[ App Layer ] ──(Writes)─┼──► [ Primary Master ] ──(WAL Streaming)──┐
                         │                                           ▼
                         └──► [ Read Replica 2 ] (SELECTs) ◄─────────┘</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Checking Replication Status on PostgreSQL Primary
SELECT 
    client_addr AS replica_ip,
    state,
    sync_state, -- async or sync
    pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes
FROM pg_stat_replication;</code></pre>
      </div>
    `
  },
  {
    id: "db-16",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Distributed Systems", "CAP Theorem", "Architecture"],
    question: "Distributed Database Design-এ CAP Theorem কী?",
    answer: `
      <p><strong>CAP Theorem (Brewer's Theorem)</strong> বলে যে, যেকোনো ডিস্ট্রিবিউটেড ডাটাবেজ সিস্টেমে (যেখানে ডাটা একাধিক নেটওয়ার্কড নোডে শেয়ার করা থাকে) নিচের ৩টি গ্যারান্টির মধ্যে <strong>একসাথে সর্বোচ্চ ২টি অর্জন করা সম্ভব</strong>:</p>
      
      <h4>৩টি প্রধান গ্যারান্টি:</h4>
      <ul>
        <li><strong>Consistency (C):</strong> সিস্টেমের সকল ক্লায়েন্ট একই মুহূর্তে যেকোনো নোড থেকে একই ডাটা দেখবে। (Master-এ রাইট হলে সব নোডে সিঙ্ক হওয়া পর্যন্ত রিড ব্লক থাকবে)।</li>
        <li><strong>Availability (A):</strong> প্রতিটি নন-ফেইলিং নোড সবসময় রিকোয়েস্টের সফল রেসপন্স (Read/Write) দেবে—এমনকি কোনো নোড পুরোনো ডাটা দেখালেও রিকোয়েস্ট ফেল করবে না।</li>
        <li><strong>Partition Tolerance (P):</strong> সিস্টেমের নোডগুলোর মধ্যকার নেটওয়ার্ক ক্যাবল বিচ্ছিন্ন (Network Partition) হলেও বা মেসেজ ড্রপ করলেও পুরো ডিস্ট্রিবিউটেড সিস্টেম চালু থাকবে।</li>
      </ul>

      <h4>কেন "CP" অথবা "AP" বেছে নিতে হয়?</h4>
      <p>বাস্তবিকের ডিস্ট্রিবিউটেড সিস্টেমে নেটওয়ার্ক ফেইলিওর (Network Partition) যেকোনো সময় ঘটতে পারে। তাই <strong>Partition Tolerance (P) কে বাদ দেওয়া অসম্ভব</strong>। এর ফলে নেটওয়ার্ক পার্টিশন ঘটলে ডাটাবেজ স্থপতিদের ১টি পছন্দ করতে হয়:</p>

      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>                     CAP Theorem Triangle
                             / \
                            /   \
                           /  P  \
                          /───────\
                         /  /   \  \
                        /  /     \  \
            (CP System)/  /       \  \(AP System)
                      /  /         \  \
                     /  /           \  \
   [ Consistency ] ─┴───             ───┴─ [ Availability ]</code></pre>
      </div>

      <ul>
        <li><strong>CP System (Consistency + Partition Tolerance):</strong> নেটওয়ার্ক বিচ্ছিন্ন হলে ডাটা অমিল হওয়া ঠেকাতে সিস্টেম রাইট বা রিড অপারেশন ব্লক/এরর করে দেয়। (উদাহরণ: HBase, MongoDB, CockroachDB, PostgreSQL with 2PC)।</li>
        <li><strong>AP System (Availability + Partition Tolerance):</strong> নেটওয়ার্ক বিচ্ছিন্ন হলেও রিকোয়েস্ট প্রসেস করতে থাকে, তবে ক্লায়েন্ট কিছু সময় পুরোনো ডাটা (Stale Data) পেতে পারে। পার্টিশন ঠিক হলে Eventual Consistency অর্জন করে। (উদাহরণ: Apache Cassandra, Amazon DynamoDB, CouchDB)।</li>
      </ul>
    `
  },
  {
    id: "db-17",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["DevOps", "Migrations", "Zero Downtime"],
    question: "Database Migration Management (Knex/Prisma/Flyway) কী এবং Zero-Downtime Migration কী?",
    answer: `
      <p><strong>Database Migration</strong> হলো ডাটাবেজ স্কিমার সংস্করণ নিয়ন্ত্রণ (Version Control Systems like Git, but for DDL)। এটি ডায়নামিক ফাইল (SQL বা JS/TS Scripts) ব্যবহার করে ডেভেলপমেন্ট, স্টেজিং এবং প্রোডাকশন পরিবেশের ডাটাবেজ স্কিমা স্টেট হুবহু সিঙ্ক রাখে।</p>
      
      <h4>মাইগ্রেশন কীভাবে কাজ করে (Tracking Table):</h4>
      <p>প্রতিটি মাইগ্রেশন টুলে একটি ট্র্যাকিং টেবিল থাকে (যেমন: Knex-এ <code>knex_migrations</code>, Flyway-এ <code>flyway_schema_history</code>)। মাইগ্রেশন রান করলে টুলটি এই টেবিলে প্রয়োগকৃত ফাইলের হ্যাশ ও নাম সেভ রাখে, যাতে একই মাইগ্রেশন দ্বিতীয়বার রান না করে।</p>

      <h4>Zero-Downtime Migration Pattern (Expand and Contract):</h4>
      <p>চলমান প্রোডাকশনে সরাসরি <code>ALTER TABLE RENAME COLUMN</code> বা <code>DROP COLUMN</code> চালালে পুরানো সার্ভিস ক্র্যাশ করে। ডাউনটাইম ছাড়া মাইগ্রেশনের ৩-ধাপের আর্কিটেকচার:</p>

      <ol>
        <li><strong>Phase 1 (Expand):</strong> নতুন কলাম যোগ করুন (Nullable হিসেবে)। পুরানো অ্যাপ পুরানো কলামেই রিড/রাইট করতে থাকবে।</li>
        <li><strong>Phase 2 (Migrate & Dual-Write):</strong> নতুন অ্যাপ ভার্সন ডিপ্লয় করুন যা পুরানো ও নতুন দুই কলামেই একসাথে লেখে (Dual-write)। ব্যাকগ্রাউন্ড স্ক্রিপ্ট চালিয়ে পুরানো রেকর্ডগুলোকে নতুন কলামে ব্যাকফিল (Backfill) করুন।</li>
        <li><strong>Phase 3 (Contract):</strong> নিশ্চিত হওয়ার পর অ্যাপ থেকে পুরানো কলামের ব্যবহার তুলে নিন এবং নতুন মাইগ্রেশন চালিয়ে পুরানো কলামটি ড্রপ করুন।</li>
      </ol>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Knex.js Migration Example with Up/Down rollback safety
exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('phone_v2', 20).nullable(); // Step 1: Expand safely
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('phone_v2'); // Rollback path
  });
};</code></pre>
      </div>
    `
  },
  {
    id: "db-18",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["SQL", "CTE", "Queries"],
    question: "SQL-এ Common Table Expressions (CTE) এবং Recursive Queries কী?",
    answer: `
      <p><strong>Common Table Expression (CTE)</strong> হলো একটি অস্থায়ী নামযুক্ত রেজাল্ট সেট যা <code>WITH</code> ক্লজ ব্যবহার করে কোনো প্রধান SQL কোয়েরির ভেতরে সংজ্ঞায়িত করা হয়। এটি সাব-কোয়েরির চেয়ে অনেক বেশি পঠনযোগ্য (Readable) এবং কোড রি-ইউজেবল করে।</p>
      
      <h4>Recursive CTE:</h4>
      <p>যখন একটি CTE নিজেই নিজেকে রিকার্সিভলি রেফার করে, তাকে <strong>Recursive CTE</strong> বলে। এটি অসীম নেস্টেড ক্যাটাগরি, অর্গানাইজেশনাল হায়ারার্কি বা থ্রেডেড কমেন্টস-এর মতো **Tree Structure Data** প্রসেস করতে ব্যবহৃত হয়।</p>

      <h4>Recursive CTE-এর ২টি মূল অংশ:</h4>
      <ul>
        <li><strong>Anchor Member (Base Case):</strong> এটি প্রথম কোয়েরি যা রিকার্শনের মূল বা Root নোড খুঁজে বের করে।</li>
        <li><strong>Recursive Member:</strong> এটি <code>UNION ALL</code> দিয়ে যুক্ত থাকে এবং আগের সাইকেলের রেজাল্টের সাথে জয়েন করে চাইল্ড নোড বের করে আনে।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Querying Employee Manager Org Chart with Hierarchy Level
WITH RECURSIVE OrgChart AS (
    -- Anchor Member: Find CEO (No Manager)
    SELECT id, name, manager_id, 1 AS level, CAST(name AS VARCHAR(255)) AS path
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive Member: Join employees with previous hierarchy step
    SELECT e.id, e.name, e.manager_id, oc.level + 1, CAST(oc.path || ' -> ' || e.name AS VARCHAR(255))
    FROM employees e
    INNER JOIN OrgChart oc ON e.manager_id = oc.id
)
SELECT id, name, level, path FROM OrgChart ORDER BY path;</code></pre>
      </div>
    `
  },
  {
    id: "db-19",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Database", "Backup", "Disaster Recovery", "Senior"],
    question: "Database Backup Strategy: Full vs Incremental vs Differential এবং Point-in-Time Recovery (PITR) কী?",
    answer: `
      <p>প্রোডাকশন ডাটাবেজে সিস্টেম ডিজাস্টার, র‍্যানসমওয়্যার বা এক্সিডেন্টাল <code>DROP TABLE</code> থেকে রিকভারির জন্য সঠিক ব্যাকআপ স্ট্র্যাটেজি রাখা আবশ্যক।</p>
      
      <h4>ব্যাকআপ কৌশলের তুলনা:</h4>
      <table>
        <tr>
          <th>টাইপ</th>
          <th>কী কপি হয়</th>
          <th>স্টোরেজ ও সময়</th>
          <th>Restore প্রসেস ও সময়</th>
        </tr>
        <tr>
          <td><strong>Full Backup</strong></td>
          <td>সম্পূর্ণ ডাটাবেজ ফাইল ও স্কিমা স্ন্যাপশট।</td>
          <td>সর্বোচ্চ স্টোরেজ এবং অনেক সময় লাগে।</td>
          <td>খুব দ্রুত (একক ফাইল থেকে ডিরেক্ট রিস্টোর)।</td>
        </tr>
        <tr>
          <td><strong>Incremental Backup</strong></td>
          <td>শেষ ব্যাকআপের (Full/Incremental) পর যা বদলেছে।</td>
          <td>সর্বনিম্ন স্টোরেজ ও দ্রুততম সময়।</td>
          <td>ধীরগতি (Full Backup + প্রতিটি Incremental ফাইল ক্রমানুসারে অ্যাপ্লাই করতে হয়)।</td>
        </tr>
        <tr>
          <td><strong>Differential Backup</strong></td>
          <td>শেষ <em>Full Backup</em>-এর পর থেকে পরিবর্তিত সকল ডাটা।</td>
          <td>মাঝারি স্টোরেজ ও সময়।</td>
          <td>মাঝারি (Full Backup + কেবল সর্বশেষ Differential ফাইলটি লাগে)।</td>
        </tr>
      </table>

      <h4>Point-in-Time Recovery (PITR) কী?</h4>
      <p>ধরা যাক রাত ২টায় ডেইলি ব্যাকআপ নেওয়া হয়, কিন্তু দুপুর ১২টায় কোনো ডেভেলপার ভুলবশত প্রোডাক্টস টেবিল ড্রপ করে ফেলল। সাধারণ ব্যাকআপ রিস্টোর করলে সকালের ১০ ঘণ্টার ডাটা হারিয়ে যাবে।</p>
      <p><strong>PITR</strong> হলো একটি ফুল ব্যাকআপ এবং ক্রমাগত ডিস্কে আর্কাইভ করা WAL/Binlog ফাইলের সমন্বয়ে ডাটাবেজকে **নির্দিষ্ট কোনো সেকেন্ডের পূর্ববর্তী স্টেটে** (যেমন: দুপুর ১১:৫৯:৫৯ সেকেন্ডে) পুনঃপ্রতিষ্ঠা করার প্রযুক্তি।</p>

      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ Daily Full Backup (2:00 AM) ] ───► [ Apply WAL Archives 2:00 AM to 11:59 AM ] ──► [ Restored DB State (11:59:59 AM) ]</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- PostgreSQL PITR Target Config in postgresql.conf / recovery.signal
restore_command = 'cp /var/lib/postgresql/wal_archive/%f %p'
recovery_target_time = '2026-08-11 11:59:59+06'
recovery_target_action = 'promote'</code></pre>
      </div>
    `
  },
  {
    id: "db-20",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing", "B-Tree", "Performance"],
    question: "B-Tree Indexing Mechanism, Composite Indexing, Leftmost Prefix Rule এবং Index Scan vs Index Seek কী?",
    answer: `
      <p>ডাটাবেজ ইঞ্জিন ডাটা সার্চ করার জন্য বিভিন্ন ইনডেক্স স্ক্যানিং স্ট্র্যাটেজি ব্যবহার করে। পারফরম্যান্স টিউনিংয়ের জন্য এগুলো জানা জরুরি।</p>
      
      <h4>১. Index Seek vs Index Scan vs Table Scan:</h4>
      <ul>
        <li><strong>Index Seek:</strong> ডাটাবেজ B-Tree ট্রাভার্স করে সরাসরি কাঙ্ক্ষিত রো-এর পেজ পয়েন্টারে পৌঁছায় ($O(\log N)$)। এটি সবচেয়ে দ্রুততম অপারেশন (যেমন: <code>WHERE primary_id = 500</code>)।</li>
        <li><strong>Index Scan:</strong> ইনডেক্স স্ট্রাকচারের সম্পূর্ণ বা বিশাল অংশ সিকুয়েনশিয়ালি স্ক্যান করতে হয়। Index Seek-এর চেয়ে ধীর হলেও Full Table Scan-এর চেয়ে ভালো।</li>
        <li><strong>Seq Scan / Full Table Scan:</strong> ইনডেক্স বাইপাস করে ডিস্ক থেকে সকল টেবিল পেজ রিড করা ($O(N)$)। বড় টেবিলের জন্য এটি মারাত্মক পারফরম্যান্স বটলনেক।</li>
      </ul>

      <h4>২. Composite Indexing & Leftmost Prefix Rule:</h4>
      <p>যখন একাধিক কলাম নিয়ে ইনডেক্স তৈরি করা হয় (যেমন: <code>INDEX(A, B, C)</code>), B-Tree প্রথমে কলাম <code>A</code> দিয়ে সর্ট করে, তারপর একই <code>A</code>-এর জন্য <code>B</code> দিয়ে, এবং শেষে <code>C</code> দিয়ে।</p>
      <p><strong>Leftmost Prefix Rule:</strong> ক্যোয়ারীতে বামপাশের কলামগুলোর সিকোয়েন্স থাকতে হবে। <code>INDEX(A, B, C)</code> কেবল নিচের ফিল্টারগুলোতে ইনডেক্স ব্যবহার করতে পারবে:</p>
      <ul>
        <li><code>WHERE A = 1</code> (Uses Index)</li>
        <li><code>WHERE A = 1 AND B = 2</code> (Uses Index)</li>
        <li><code>WHERE A = 1 AND B = 2 AND C = 3</code> (Uses Index)</li>
        <li><code>WHERE B = 2 AND C = 3</code> (<strong>CANNOT Use Index!</strong> কারণ <code>A</code> অনুপস্থিত)</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Creating Composite Index
CREATE INDEX idx_orders_user_status_date ON orders(user_id, status, order_date);

-- Query 1: Performs Optimal INDEX SEEK
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE user_id = 101 AND status = 'COMPLETED' AND order_date >= '2026-01-01';

-- Query 2: Performs INDEX SCAN / SEQ SCAN (Violates Leftmost Prefix Rule)
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE status = 'COMPLETED'; -- Missing user_id!</code></pre>
      </div>
    `
  },
  {
    id: "db-21",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Performance", "EXPLAIN ANALYZE", "Query Plan"],
    question: "EXPLAIN ANALYZE দিয়ে SQL Query Execution Plan এবং Performance Bottlenecks কীভাবে চিহ্নিত করবেন?",
    answer: `
      <p>ডাটাবেজ পারফরম্যান্স অপ্টিমাইজেশনের প্রথম ধাপ হলো ডাটাবেজ ক্যোয়ারী প্ল্যানার (Query Planner) কীভাবে কোয়েরিটি এক্সিকিউট করছে তা বিশ্লেষণ করা। <code>EXPLAIN ANALYZE</code> কোয়েরিটি প্রকৃতপক্ষে রান করে এবং এর বিস্তারিত **Execution Tree** ও সময়ের হিসাব দেয়।</p>
      
      <h4>১. EXPLAIN ANALYZE-এর প্রধান মেট্রিকসমূহ:</h4>
      <ul>
        <li><strong>Cost (Estimates):</strong> <code>cost=0.28..8.29</code> — ১ম মানটি হলো ফার্স্ট রো (First Row) ফেরত পেতে আনুমানিক কম্পিউটেশনাল কস্ট এবং ২য় মানটি হলো সম্পূর্ণ রেজাল্ট আনতে মোট কস্ট।</li>
        <li><strong>Actual Time:</strong> <code>actual time=0.035..0.036</code> — প্রথম রো পেতে লাগা প্রকৃত সময় এবং সম্পূর্ণ প্রসেস শেষ হতে লাগা মোট সময় (মিলিসেকেন্ডে)।</li>
        <li><strong>Rows:</strong> প্ল্যানারের আনুমানিক রো সংখ্যা বনাম <code>actual rows</code> (প্রকৃত রেজাল্ট রো সংখ্যা)। এই দুটির মধ্যে বিশাল পার্থক্য থাকলে ডাটাবেজ স্ট্যাটিস্টিক্স (Table Statistics) আউটডেটেড হতে পারে।</li>
        <li><strong>Buffers (RAM vs Disk):</strong> <code>shared hit</code> মানে মেমোরি (Buffer Pool) থেকে ডাটা পাওয়া গেছে, আর <code>shared read</code> মানে ডাটা ডিস্ক থেকে রিড করতে হয়েছে (ধীরগতি)।</li>
      </ul>

      <h4>২. কমন পারফরম্যান্স বটলনেক এবং সমাধান:</h4>
      <table>
        <tr>
          <th>নোড টাইপ (Node Type)</th>
          <th>সমস্যা/কারণ</th>
          <th>অপ্টিমাইজেশন কৌশল</th>
        </tr>
        <tr>
          <td><code>Seq Scan / Table Scan</code></td>
          <td>ফিল্টার ফিল্ডে ইনডেক্স নেই অথবা টেবিল খুব ছোট।</td>
          <td>ফিল্টার করা কলামের ওপর B-Tree/Composite Index তৈরি করা।</td>
        </tr>
        <tr>
          <td><code>Rows Removed by Filter</code></td>
          <td>ইনডেক্স ব্যবহার না করে অনেক রো রিড করে ফিল্টারে ড্রপ করা হচ্ছে।</td>
          <td><code>WHERE</code> কন্ডিশনে ব্যবহৃত কলামগুলোতে ইনডেক্স যুক্ত করা।</td>
        </tr>
        <tr>
          <td><code>External Sort / Disk Sort</code></td>
          <td><code>ORDER BY</code> প্রসেস করার জন্য মেমোরি (work_mem) অপর্যাপ্ত, তাই ডিস্কে টেম্প ফাইল তৈরি হচ্ছে।</td>
          <td><code>work_mem</code> সাইজ বাড়ানো অথবা সর্টেড কলামে ইনডেক্স বসানো।</td>
        </tr>
        <tr>
          <td><code>Nested Loop (Large Data)</code></td>
          <td>বড় দুটি টেবিল জয়েন করার সময় চাইল্ড টেবিলে ইনডেক্স না থাকা।</td>
          <td>Foreign Key বা Join-Key তে ইনডেক্স যোগ করা যেন Hash Join বা Index Seek ব্যবহার করে।</td>
        </tr>
      </table>

      <h4>প্র্যাকটিক্যাল কোড ও আউটপুট অ্যানালাইসিস:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Executing EXPLAIN ANALYZE with Buffers info
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT o.id, o.total_amount, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.order_date >= '2026-01-01' AND o.status = 'COMPLETED'
ORDER BY o.total_amount DESC
LIMIT 10;

/* Sample Execution Output Analysis:
Limit  (cost=1250.40..1250.43 rows=10 width=40) (actual time=45.120..45.125 rows=10 loops=1)
  Buffers: shared hit=420 read=15
  -> Sort  (cost=1250.40..1265.10 rows=5880 width=40) (actual time=45.118..45.120 rows=10 loops=1)
        Sort Key: o.total_amount DESC
        Sort Method: quicksort  Memory: 1024kB
        -> Hash Join  (cost=120.00..1100.50 rows=5880 width=40) (actual time=3.100..40.250 rows=5880 loops=1)
              Hash Cond: (o.user_id = u.id)
              -> Seq Scan on orders o  (cost=0.00..950.00 rows=5880 width=24) (actual time=0.050..32.100 rows=5880 loops=1)
                    Filter: ((order_date >= '2026-01-01'::date) AND ((status)::text = 'COMPLETED'::text))
                    Rows Removed by Filter: 150000 -- ◄── BOTTLENECK: 150k rows read & dropped!
              -> Hash  (cost=70.00..70.00 rows=4000 width=24) (actual time=2.900..2.900 rows=4000 loops=1)
                    -> Seq Scan on users u
*/

-- 2. Fixing the Bottleneck with a Composite Partial Index
CREATE INDEX idx_orders_date_status_incl 
ON orders (order_date, status) 
INCLUDE (user_id, total_amount)
WHERE status = 'COMPLETED';

-- Re-running EXPLAIN ANALYZE now changes 'Seq Scan' to 'Index Only Scan' reducing time from 45ms to 0.8ms!</code></pre>
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
      <p>বিশাল পরিমাণের ডাটা সেট (মাল্টি-টেরাবাইট) এবং হাই-থ্রুপুট অ্যাপ্লিকেশন সামলানোর জন্য ডাটা বিভাজন (Data Division) করা হয়। তবে **Table Partitioning** এবং **Database Sharding** দুটি সম্পূর্ণ আলাদা স্তরের সমাধান।</p>
      
      <h4>১. মৌলিক পার্থক্যসমূহ:</h4>
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>Table Partitioning (Vertical / Horizontal)</th>
          <th>Database Sharding</th>
        </tr>
        <tr>
          <td><strong>আর্কিটেকচারাল লেভেল</strong></td>
          <td>একক ডাটাবেজ ইন্সট্যান্স ও একই ফিজিক্যাল সার্ভারের ভেতরের টেবিল বিভাজন।</td>
          <td>একাধিক স্বতন্ত্র ফিজিক্যাল/ভার্চুয়াল সার্ভার (Multi-Node Clusters) জুড়ে ডিস্ট্রিবিউটেড বিভাজন।</td>
        </tr>
        <tr>
          <td><strong>কম্পিউট রিসোর্স (CPU/RAM)</strong></td>
          <td>সকল পার্টিশন একই সার্ভারের CPU, RAM এবং I/O শেয়ার করে।</td>
          <td>প্রতিটি শার্ডের স্বতন্ত্র CPU, RAM, Disk I/O এবং ডাটাবেজ ইঞ্জিন থাকে।</td>
        </tr>
        <tr>
          <td><strong>স্কেলিং পদ্ধতি</strong></td>
          <td><strong>Vertical Scaling (Scale-Up):</strong> বড় সার্ভার বা RAM যুক্ত করতে হয়।</td>
          <td><strong>Horizontal Scaling (Scale-Out):</strong> নতুন নতুন কমদামী নোড/শার্ড ক্লাস্টারে যুক্ত করা যায়।</td>
        </tr>
        <tr>
          <td><strong>জটিলতা</strong></td>
          <td>খুব কম। ডাটাবেজ ইঞ্জিন স্বয়ংক্রিয়ভাবে পার্টিশন প্রুনিং (Partition Pruning) করে।</td>
          <td>অত্যন্ত জটিল। Cross-Shard Joins, Distributed Transactions (2PC) এবং Rebalancing সামলাতে হয়।</td>
        </tr>
      </table>

      <h4>২. Partitioning-এর প্রকারভেদ (Range, List, Hash):</h4>
      <ul>
        <li><strong>Range Partitioning:</strong> নির্দিষ্ট সীমার ওপর ভিত্তি করে (যেমন: তারিখ বা সাল অনুযায়ী)। উদাহরণ: প্রতি মাসের ডাটা আলাদা পার্টিশনে রাখা।</li>
        <li><strong>List Partitioning:</strong> সুনির্দিষ্ট ক্যাটাগরি বা ডিসক্রিট ভ্যালুর ওপর ভিত্তি করে (যেমন: দেশ বা রিজিওন অনুযায়ী — 'BD', 'US', 'IN')।</li>
        <li><strong>Hash Partitioning:</strong> একটি কলামকে (যেমন <code>user_id</code>) হ্যাশ ফাংশন দিয়ে ভাগ করে সমপরিমাণ ডাটায় বন্টন করা।</li>
      </ul>

      <h4>৩. আর্কিটেকচারাল ডায়াগ্রাম:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ Single Database Instance ]                      [ Distributed Sharded Cluster ]
  └── Table: Orders                                 ├── Shard 1 (Server A) ──► Orders (User 1-1M)
      ├── Partition 2024 (File A)                   ├── Shard 2 (Server B) ──► Orders (User 1M-2M)
      ├── Partition 2025 (File B)                   └── Shard 3 (Server C) ──► Orders (User 2M-3M)
      └── Partition 2026 (File C)                         ▲
           ▲                                              │
           └─ Partition Pruning (DB Engine handles)       └─ Shard Router / Proxy (e.g., Vitess / Citus)</code></pre>
      </div>

      <h4>প্র্যাকটিক্যাল SQL উদাহরণ (Declarative Range Partitioning in PostgreSQL):</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Create Parent Partitioned Table
CREATE TABLE audit_logs (
    id BIGSERIAL,
    user_id INT NOT NULL,
    action VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (created_at);

-- 2. Create Child Partitions for Specific Ranges
CREATE TABLE audit_logs_y2026m01 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2026-02-01 00:00:00+00');

CREATE TABLE audit_logs_y2026m02 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-02-01 00:00:00+00') TO ('2026-03-01 00:00:00+00');

-- Query Planner automatically uses 'Partition Pruning' to scan ONLY audit_logs_y2026m01
SELECT * FROM audit_logs 
WHERE created_at >= '2026-01-15' AND created_at < '2026-01-20';</code></pre>
      </div>
    `
  },
  {
    id: "db-23",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "JSONB", "GIN Index"],
    question: "PostgreSQL JSON vs JSONB, GIN Indexing, এবং Expression Indexing কীভাবে সার্চ গতি বাড়ায়?",
    answer: `
      <p>PostgreSQL হলো একটি হাইব্রিড রিলেশনাল ডাটাবেজ যা চমৎকার ডায়নামিক NoSQL/Document স্টোরেজ সমর্থন করে। এটি ২ প্রকার JSON টাইপ প্রদান করে: <code>JSON</code> এবং <code>JSONB</code>।</p>
      
      <h4>১. JSON vs JSONB তুলনামূলক পার্থক্য:</h4>
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>JSON (Plain Text Format)</th>
          <th>JSONB (Binary Format)</th>
        </tr>
        <tr>
          <td><strong>স্টোরেজ ফরম্যাট</strong></td>
          <td>ইনপুট স্ট্রিংয়ের হুবহু প্লেইন টেক্সট কপি স্টোর করে (হোয়াইটস্পেস ও কি-অর্ডারসহ)।</td>
          <td>পার্স করা, ডি-কমপ্রেসড বাইনারি ফরম্যাটে স্টোর করে (হোয়াইটস্পেস বাদ যায়, কি সর্টেড থাকে)।</td>
        </tr>
        <tr>
          <td><strong>ইনসার্ট গতি</strong></td>
          <td>খুবই ফাস্ট (কোনো বাইনারি কনভার্সন বা পার্সিং লাগে না)।</td>
          <td>সামান্য ধীর (ইনসার্ট করার সময় বাইনারি ট্রি অবজেক্ট তৈরি করতে হয়)।</td>
        </tr>
        <tr>
          <td><strong>কোয়েরি/রিড গতি</strong></td>
          <td>খুব ধীর। প্রতিবার প্রসেস করার সময় টেক্সট রি-পার্স করতে হয়।</td>
          <td>অত্যন্ত দ্রুত। পার্সিং ছাড়াই সরাসরি বাইনারি নোড রিড করা যায়।</td>
        </tr>
        <tr>
          <td><strong>ইনডেক্সিং</strong></td>
          <td>সরাসরি GIN ইনডেক্স করা অসম্ভব।</td>
          <td>সম্পূর্ণ বাইনারি অবজেক্টে <strong>GIN (Generalized Inverted Index)</strong> সাপোর্ট করে।</td>
        </tr>
      </table>

      <h4>২. GIN (Generalized Inverted Index) কীভাবে কাজ করে?</h4>
      <p>GIN হলো এক ধরনের ইনভার্টেড ইনডেক্স। JSONB ডকুমেন্টের প্রতিটি কী এবং ভ্যালুকে আলাদা আলাদা সাব-আইটেমে ভেঙে একটি B-Tree ইনডেক্স ট্রি তৈরি করে। ফলে <code>@></code> (Containment Operator) দিয়ে অনুসন্ধান করলে সেকেন্ডের ভগ্নাংশে রেজাল্ট পাওয়া যায়।</p>

      <h4>প্র্যাকটিক্যাল কোড এবং ইনডেক্সিং কৌশল:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Create Table with JSONB column
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    attributes JSONB
);

-- Strategy A: Full GIN Indexing on whole JSONB Column
-- Uses default 'jsonb_ops' (Indexes both keys and values)
CREATE INDEX idx_profiles_attributes_gin ON user_profiles USING GIN (attributes);

-- Strategy B: Specialized GIN Indexing using 'jsonb_path_ops' (Smaller index size, faster matching)
CREATE INDEX idx_profiles_attributes_path ON user_profiles USING GIN (attributes jsonb_path_ops);

-- Query using Containment Operator '@>' (Utilizes GIN Index!)
SELECT * FROM user_profiles 
WHERE attributes @> '{"role": "admin", "settings": {"theme": "dark"}}';

-- Strategy C: Expression Indexing on a Specific Nested JSON Field
-- Use when you only frequently query ONE specific nested field
CREATE INDEX idx_profiles_city 
ON user_profiles ((attributes->'address'->>'city'));

-- Query using Expression Index:
SELECT * FROM user_profiles 
WHERE attributes->'address'->>'city' = 'Dhaka';</code></pre>
      </div>
    `
  },
  {
    id: "db-24",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Database", "SQL", "Query Optimization", "Senior"],
    question: "SQL-এ Subquery vs JOIN vs CTE — পারফরম্যান্সের দিক থেকে কখন কোনটি বেছে নেবেন?",
    answer: `
      <p>একই বিজনেস লজিক অর্জন করতে SQL-এ তিনটি ভিন্ন স্টাইল ব্যবহার করা যায় — Subquery, JOIN, এবং Common Table Expressions (CTE)। তবে এদের মেমোরি কনসাম্পশন, এক্সিকিউশন স্ট্র্যাটেজি এবং পঠনযোগ্যতায় বিশাল তফাৎ রয়েছে।</p>
      
      <h4>১. তুলনামূলক বিশ্লেষণ ও পারফরম্যান্স মেট্রিক্স:</h4>
      <ul>
        <li><strong>Correlated Subquery (ঝুঁকিপূর্ণ):</strong> যে Subquery ভেতরের কোয়েরি চালানোর জন্য বাইরের ক্যোয়ারীর রো-এর ওপর নির্ভর করে। এটি বাইরের প্রতি সারির জন্য পুনরায় চালিত হতে পারে ($O(N \times M)$)। এটি সবচেয়ে ধীরগতির কৌশল।</li>
        <li><strong>JOINs (সর্বোত্তম পারফরম্যান্স):</strong> ক্যোয়ারী প্ল্যানারদের (Postgres/MySQL) জন্য অপটিমাইজ করা সবচেয়ে সহজ। Hash Join বা Merge Join ব্যবহার করে একবারে পুরো ডেটাসেট ইন-মেমোরিতে প্রসেস করে।</li>
        <li><strong>CTE (WITH Clause - Readability & Modularization):</strong> কোড সুন্দর ও মডুলার করে। <strong>PostgreSQL 12-এর পর থেকে</strong> ক্যোয়ারী প্ল্যানার CTE-কে স্বয়ংক্রিয়ভাবে Inline Query হিসেবে জেনারেট করে JOIN-এর সমান স্পিড দেয়। তবে `MATERIALIZED` কি-ওয়ার্ড দিলে CTE রেজাল্ট ইন-মেমোরি টেম্প টেবিলে সেভ করে রাখা হয়।</li>
      </ul>

      <h4>২. কখন কোনটি বেছে নেবেন?</h4>
      <table>
        <tr>
          <th>টেকনিক</th>
          <th>কখন ব্যবহার করবেন?</th>
          <th>কখন এড়িয়ে চলবেন?</th>
        </tr>
        <tr>
          <td><strong>JOIN</strong></td>
          <td>একাধিক রিলেশনাল টেবিলের ডাটা মার্চ করা এবং হাই-পারফরম্যান্স প্রোডাকশন কোয়েরিতে।</td>
          <td>অত্যন্ত জটিল নেস্টেড লজিক যা পড়তে কঠিন হয়ে যায়।</td>
        </tr>
        <tr>
          <td><strong>CTE</strong></td>
          <td>রিকার্সিভ কোয়েরি (Hierarchy) চালাতে এবং বড় জটিল কোয়েরিকে ছোট ছোট রিডেবল ধাপে সাজাতে।</td>
          <td>খুব ছোট ওয়ান-লাইনার কোয়েরিতে অনাবশ্যক ব্যবহার।</td>
        </tr>
        <tr>
          <td><strong>Subquery</strong></td>
          <td><code>EXISTS</code> বা <code>IN</code> কন্ডিশন দিয়ে সাধারণ অস্তিত্ব যাচাইয়ের জন্য (Uncorrelated)।</td>
          <td>লুপের ভেতরে থাকা Correlated Subquery হিসেবে (<code>SELECT (SELECT ...) FROM ...</code>)।</td>
        </tr>
      </table>

      <h4>প্র্যাকটিক্যাল কোড তুলনা (Subquery vs JOIN vs CTE):</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- ❌ BAD: Correlated Subquery (Re-executes inner query for EVERY outer row -> Slow)
SELECT u.name, 
       (SELECT AVG(total_amount) FROM orders WHERE user_id = u.id) as avg_order
FROM users u;

-- ✅ GOOD: Optimized JOIN with GROUP BY (Processes dataset in single pass)
SELECT u.name, COALESCE(AVG(o.total_amount), 0) as avg_order
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- ✅ BEST FOR READABILITY: CTE (Auto-inlined in Postgres 12+)
WITH UserOrderStats AS (
    SELECT user_id, AVG(total_amount) as avg_order
    FROM orders
    GROUP BY user_id
)
SELECT u.name, COALESCE(uos.avg_order, 0) as avg_order
FROM users u
LEFT JOIN UserOrderStats uos ON u.id = uos.user_id;</code></pre>
      </div>
    `
  },
  {
    id: "db-25",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Concurrency", "Pessimistic Locking", "Optimistic Locking"],
    question: "Pessimistic Locking (SELECT ... FOR UPDATE) vs Optimistic Locking (Version Column) কখন কোনটা ব্যবহার করবেন?",
    answer: `
      <p>কনকারেন্ট সিস্টেমে যখন একাধিক ইউজার বা ব্যাকগ্রাউন্ড সার্ভিস একই সাথে একই রো আপডেট করতে চায়, তখন ডাটা রেস কন্ডিশন (Data Race Condition) এবং <strong>Lost Update Problem</strong> তৈরি হয়। এটি সমাধান করতে ২টি কৌশল ব্যবহৃত হয়।</p>
      
      <h4>১. Pessimistic Locking ( pessimistic = সংশয়বাদী ):</h4>
      <p>ধরে নেওয়া হয় কনফ্লিক্ট বা সংঘাত নিশ্চিত ঘটবেই। তাই ডাটা পড়ার সময়ই ডাটাবেজের সারিতে <code>SELECT ... FOR UPDATE</code> চালিয়ে এক্সক্লুসিভ লক বসানো হয়। বর্তমান ট্রানজেকশন <code>COMMIT</code> বা <code>ROLLBACK</code> না করা পর্যন্ত অন্য কেউ ওই রো পড়তে বা আপডেট করতে পারে না (ব্লক হয়ে থাকে)।</p>
      <ul>
        <li><strong>উপযোগী ক্ষেত্র:</strong> হাই-কনফ্লিক্ট এনভায়রনমেন্ট, ফাইনান্সিয়াল ব্যালেন্স ট্রান্সফার, ফ্ল্যাশ সেলে লিমিটেড স্টক বাইং, সিট বুকিং সিস্টেম।</li>
        <li><strong>অসুবিধা:</strong> থ্রুপুট কমে যায় এবং লক অর্ডারিং ভুল হলে Deadlock সৃষ্টি হতে পারে।</li>
      </ul>

      <h4>২. Optimistic Locking ( optimistic = আশাবাদী ):</h4>
      <p>ধরে নেওয়া হয় সংঘাত ঘটার সম্ভাবনা খুব কম। তাই ডাটা রিড করার সময় কোনো ডাটাবেজ লক বসানো হয় না। টেবিলে একটি <code>version</code> বা <code>updated_at</code> কলাম ট্র্যাক রাখা হয়। ডাটা আপডেট করার সময় অপটিমিস্টিক চেক চালানো হয়: <code>WHERE id = x AND version = old_version</code>। যদি মাঝপথে অন্য কেউ ডাটা বদলে ফেলে, তবে এফেক্টেড রো সংখ্যা ০ হবে এবং অ্যাপ্লিকেশন থেকে এক্সেপশন থ্রো করা হবে।</p>
      <ul>
        <li><strong>উপযোগী ক্ষেত্র:</strong> লো-কনফ্লিক্ট এনভায়রনমেন্ট, সিএমএস আর্টিকেলে কন্টেন্ট এডিটিং, ইউজার প্রোফাইল সেটিংস।</li>
        <li><strong>অসুবিধা:</strong> কনফ্লিক্ট বেশি হলে বারবার ট্রানজেকশন ফেল করবে এবং অ্যাপ থেকে রিট্রি (Retry) প্রসেস চালাতে হবে।</li>
      </ul>

      <h4>প্র্যাকটিক্যাল কোড উদাহরণসমূহ:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- A. Pessimistic Locking with 'SKIP LOCKED' (Ideal for High Concurrency Job Queue)
BEGIN;

SELECT id, payload 
FROM background_jobs 
WHERE status = 'PENDING' 
LIMIT 1 
FOR UPDATE SKIP LOCKED; -- ◄── Other workers skip locked rows immediately without waiting!

UPDATE background_jobs SET status = 'PROCESSING' WHERE id = 10;

COMMIT;

-- B. Optimistic Locking Query Pattern
-- 1. Read row: fetch id=101, stock=50, version=3
SELECT id, stock, version FROM products WHERE id = 101;

-- 2. Perform business logic in application, then update with version check:
UPDATE products 
SET stock = stock - 1, version = version + 1 
WHERE id = 101 AND version = 3; -- ◄── If rows_affected == 0, conflict detected! Rollback app logic.</code></pre>
      </div>
    `
  },
  {
    id: "db-26",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["CTE", "WITH RECURSIVE", "Hierarchical"],
    question: "Common Table Expressions (CTE) এবং WITH RECURSIVE দিয়ে অসীম নেস্টেড ক্যাটাগরি ট্রি (Tree Structure) কীভাবে কোয়েরি করবেন?",
    answer: `
      <p>ই-কমার্স ওয়েবসাইটে ক্যাটাগরি এবং সাব-ক্যাটাগরি অসীম লেভেল পর্যন্ত নেস্টেড থাকতে পারে (যেমন: <code>Electronics -> Computers -> Laptops -> Gaming Laptops</code>)। রিলেশনাল ডাটাবেজে প্রতিটি চাইল্ড রো-তে <code>parent_id</code> স্টোর করা হয়। এই ধরনের ট্রি স্ট্রাকচার ডাটা এক কোয়েরিতে তুলে আনতে <code>WITH RECURSIVE</code> ব্যবহার করা হয়।</p>
      
      <h4>WITH RECURSIVE-এর ৩টি ধাপ:</h4>
      <ol>
        <li><strong>Anchor Query (Base Case):</strong> রুট বা টপ-লেভেল ক্যাটাগরি (যেগুলোর <code>parent_id IS NULL</code>) খুঁজে বের করে। এটি রিকার্শনের শুরু।</li>
        <li><strong>Recursive Query:</strong> <code>UNION ALL</code> দিয়ে যুক্ত থাকে। এটি আগের সাইকেলের রেজাল্টের সাথে প্যারেন্ট-চাইল্ড রিলেশন জয়েন করে পরবর্তী লেভেলের চাইল্ড খুঁজে আনে।</li>
        <li><strong>Termination Condition:</strong> যখন কোনো চাইল্ড রো খুঁজে পাওয়া যায় না, রিকার্শন স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যায়।</li>
      </ol>

      <h4>প্র্যাকটিক্যাল কোড (Tree Path, Depth, & Cycle Prevention):</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Schema Definition
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INT REFERENCES categories(id)
);

-- 2. Querying Infinite Nested Category Tree with Breadcrumb Path and Depth Level
WITH RECURSIVE CategoryTree AS (
    -- Anchor Member: Root Categories
    SELECT 
        id, 
        name, 
        parent_id, 
        1 AS depth_level,
        CAST(name AS TEXT) AS breadcrumb_path
    FROM categories 
    WHERE parent_id IS NULL

    UNION ALL

    -- Recursive Member: Sub-categories
    SELECT 
        c.id, 
        c.name, 
        c.parent_id, 
        ct.depth_level + 1,
        ct.breadcrumb_path || ' > ' || c.name
    FROM categories c
    INNER JOIN CategoryTree ct ON c.parent_id = ct.id
)
SELECT id, breadcrumb_path, depth_level 
FROM CategoryTree 
ORDER BY breadcrumb_path;

/* Sample Result Output:
 id | breadcrumb_path                              | depth_level
----+----------------------------------------------+─────────────
  1 | Electronics                                  |          1
  2 | Electronics > Computers                      |          2
  3 | Electronics > Computers > Laptops            |          3
  4 | Electronics > Computers > Laptops > Gaming   |          4
*/</code></pre>
      </div>

      <p><em>অ্যাডভান্সড টিপ:</em> চক্রীয় ডাটা (Cyclic Data Error — A-এর প্যারেন্ট B, আবার B-এর প্যারেন্ট A) থাকলে অনন্ত লুপ আটকানোর জন্য PostgreSQL 14+ এ <code>CYCLE parent_id SET is_cycle USING path</code> স্টেটমেন্ট ব্যবহার করা যায়।</p>
    `
  },
  {
    id: "db-27",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Connection Pooling", "PgBouncer", "Idle Sockets"],
    question: "Database Connection Pooling (PgBouncer / HikariCP) এবং Max Connections Tuning কেন জরুরি?",
    answer: `
      <p>PostgreSQL-এ প্রতিটি ইনকামিং ক্লায়েন্ট কানেকশনের জন্য ডাটাবেজ ইঞ্জিন অপারেটিং সিস্টেমে একটি **স্বতন্ত্র প্রসেস (Backend Process)** ফর্ক করে। প্রতিটি প্রসেসের নিজস্ব মেমোরি ওভারহেড (~৫MB - ১০MB RAM) এবং কন্টাক্সট সুইচিং কস্ট থাকে। হাজার হাজার ক্লায়েন্ট সরাসরি ডাটাবেজে কানেক্ট করলে RAM ক্র্যাশ করা নিশ্চিত।</p>
      
      <h4>১. PgBouncer-এর Pooling Modes:</h4>
      <ul>
        <li><strong>Session Pooling:</strong> ক্লায়েন্ট কানেক্ট করার পর ডিসকানেক্ট না করা পর্যন্ত ডাটাবেজ কানেকশন ধরে রাখে। (কম ইফিসিয়েন্ট)।</li>
        <li><strong>Transaction Pooling (সর্বোত্তম):</strong> ক্লায়েন্ট কেবল একটি ট্রানজেকশন (<code>BEGIN</code> to <code>COMMIT</code>) চলার সময় ডাটাবেজ কানেকশন পায়। ট্রানজেকশন শেষ হওয়ামাত্র কানেকশন পুলে ফিরে যায়। হাজার হাজার অ্যাপ কানেকশনকে মাত্র ৫০টি মূল ডাটাবেজ কানেকশন দিয়ে হ্যান্ডেল করা যায়।</li>
        <li><strong>Statement Pooling:</strong> প্রতিটি এক��রে, তখন মূল ডাটা পেজ সরাসরি ডিস্কে রাইট হয় না—বরং মেমোরির **Buffer Pool**-এ পরিবর্তন হয় (Dirty Pages)। কিন্তু ডিস্কে ডাটা স্থায়ী করতে **Checkpointer** এবং **WAL Logger** সাহায্য করে।</p>
      
      <h4>১. Checkpoint প্রসেস কী?</h4>
      <p><strong>Checkpoint</strong> হলো ব্যাকগ্রাউন্ডে ঘটা একটি নির্দিষ্ট সময়পরপর ঘটনা, যেখানে PostgreSQL মেমোরিতে জমে থাকা সকল Dirty Pages-কে ডিস্কের মূল ফাইলগুলোতে (Heap Files) সিঙ্ক করে লিখে দেয় এবং WAL ফাইলের ভেতরে একটি সেভপয়েন্ট রেকর্ড (Checkpoint LSN) চিহ্নিত করে।</p>

      <h4>২. কেন Checkpoint জরুরি?</h4>
      <p>যদি Checkpoint না থাকত, তবে ক্র্যাশ রিকভারির সময় ডাটাবেজ শুরুর দিন থেকে জমে থাকা সকল WAL ফাইল রি-প্লে (Replay) করতে হতো—যাতে ডাটাবেজ স্টার্ট হতে কয়েক দিন লেগে যেত! Checkpoint ঘটার ফলে ডাটাবেজ জানে যে Checkpoint LSN পর্যন্ত সকল ডাটা ডিস্কে সেভ আছে, তাই রিকভারির সময় **কেবলমাত্র শেষ Checkpoint-এর পর জমা হওয়া WAL অংশটুকু** রি-প্লে করলেই চলে।</p>

      <h4>৩. ক্র্যাশ রিকভারি ভিজ্যুয়াল টাইমলাইন:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ Old WAL Records ] ──► [ Checkpoint Executed (LSN 100) ] ──► [ WAL Record 101 ] ──► [ WAL Record 102 ] ──► [ CRASH! ]
  (Dirty Pages synced to disk)                                                                                  │
  (No recovery needed for these)                                                                                │
                                                                                                                ▼
                               [ RECOVERY ENGINE: Replays ONLY LSN 101 to 102 from WAL ] ◄──────────────────────┘</code></pre>
      </div>

      <h4>৪. Checkpoint Tuning Parameters (postgresql.conf):</h4>
      <div class="code-box">
        <div class="code-header"><span>ini</span><button class="copy-btn">Copy</button></div>
        <pre><code>; Minimum interval between automatic WAL checkpoints
checkpoint_timeout = 15min          

; Maximum size to let WAL files grow before forcing an automatic checkpoint
max_wal_size = 16GB                  

; Spreads out the Checkpoint Write I/O over time to prevent disk I/O spikes (0.9 = 90% of duration)
checkpoint_completion_target = 0.9  </code></pre>
      </div>
    `
  },
  {
    id: "db-30",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Schema", "Migrations", "Zero Downtime"],
    question: "Database Migrations (Zero Downtime Schema Migration Pattern) কীভাবে পরিচালনা করবেন?",
    answer: `
      <p>হাই-ট্রাফিক ২৪/৭ প্রোডাকশন সিস্টেমে কোনো ডাউনটাইম বা সার্ভিস পজ না করে ডাটাবেজ স্কিমা রিফ্যাক্টর (যেমন: কলামের নাম পরিবর্তন, ডাটা টাইপ পরিবর্তন, কলাম ড্রপ করা) করার আর্কিটেকচারাল প্যাটার্নকে **Zero Downtime Migration (Expand and Contract Pattern)** বলে।</p>
      
      <h4>৩-ধাপের সমাধান প্রক্রিয়া (Expand and Contract Steps):</h4>
      <ol>
        <li><strong>Phase 1: Expand (সম্প্রসারণ)</strong>
          <ul>
            <li>ডাটাবেজে নতুন কলামটি <code>NULLABLE</code> বা <code>DEFAULT</code> ভ্যালুসহ যোগ করুন।</li>
            <li>পুরোনো কোড অ্যাপ সার্ভারে চলতে থাকবে এবং পুরোনো কলামেই রিড/রাইট করবে। অ্যাপ ক্র্যাশ করবে না।</li>
          </ul>
        </li>
        <li><strong>Phase 2: Dual-Write & Backfill (স্থানান্তর)</strong>
          <ul>
            <li>নতুন অ্যাপ ভার্সন ডিপ্লয় করুন যা নতুন ও পুরোনো **উভয় কলামেই ডাটা লেখে** (Dual-write)।</li>
            <li>একটি ব্যাকগ্রাউন্ড মাইগ্রেশন স্ক্রিপ্ট (Batch Processing) চালিয়ে পুরোনো টেবিল রো-গুলোর ডাটা নতুন কলামে কপি করুন (Backfilling)।</li>
          </ul>
        </li>
        <li><strong>Phase 3: Contract (সংকোচন)</strong>
          <ul>
            <li>অ্যাপ সার্ভারকে সম্পূর্ণরূপে নতুন কলাম রিড/রাইট করার জন্য কনফিগার করুন।</li>
            <li>নিশ্চিত হওয়ার পর মাইগ্রেশন ফাইল চালিয়ে পুরোনো অব্যবহৃত কলামটি <code>DROP</code> করে দিন।</li>
          </ul>
        </li>
      </ol>

      <h4>প্র্যাকটিক্যাল কোড এবং মাইগ্রেশন স্ক্রিপ্ট:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Step 1: Expand Phase - Add new column safely
ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(20) DEFAULT NULL;

-- Step 2: Backfill Old Data in Non-Blocking Batches (Prevents Table Locking)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT id, phone FROM users WHERE phone_v2 IS NULL LOOP
        UPDATE users SET phone_v2 = r.phone WHERE id = r.id;
        -- Sleep slightly if needed to avoid I/O spikes
    END LOOP;
END $$;

-- Step 3: Contract Phase - Safe to drop old column after App release
ALTER TABLE users DROP COLUMN phone;</code></pre>
      </div>
    `
  },
  {
    id: "db-31",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Architecture", "CAP Theorem", "PACELC"],
    question: "CAP Theorem (Consistency, Availability, Partition Tolerance) এবং PACELC Theorem-এর আধুনিক ব্যাখ্যা কী?",
    answer: `
      <p>ডিস্ট্রিবিউটেড ডাটাবেজ সিস্টেমে ডাটা আদান-প্রদান ও সিঙ্ক্রোনাইজেশনের ট্রেড-অফ (Trade-off) বোঝার জন্য <strong>CAP Theorem</strong> এবং এর আধুনিক রূপ <strong>PACELC Theorem</strong> ব্যবহার করা হয়।</p>
      
      <h4>১. CAP Theorem-এর মূলনীতি ও সীমাবদ্ধতা:</h4>
      <p>CAP থিওরেম (Eric Brewer) বলে যে, যেকোনো ডিস্ট্রিবিউটেড ডাটাবেজে ৩টি বৈশিষ্ট্যের মধ্যে একসাথে সর্বোচ্চ ২টি অর্জন করা সম্ভব:</p>
      <ul>
        <li><strong>Consistency (C):</strong> সব নোড একই সময়ে সর্বশেষ ডাটা দেখাবে।</li>
        <li><strong>Availability (A):</strong> প্রতিটি নন-ফেইলিং নোড সবসময় সফল রেসপন্স প্রদান করবে।</li>
        <li><strong>Partition Tolerance (P):</strong> নোডগুলোর মাঝে নেটওয়ার্ক ড্রপ (Partition) হলেও সিস্টেম চালু থাকবে।</li>
      </ul>
      <p><em>সীমাবদ্ধতা:</em> বাস্তবিকের ডিস্ট্রিবিউটেড নেটওয়ার্কে Network Partition ($P$) একটি অনিবার্য ঘটনা। ফলে $P$-কে বাদ দেয়া যায় না। তাই মূল ট্রেড-অফটি হয় <strong>CP (Consistency over Availability)</strong> অথবা <strong>AP (Availability over Consistency)</strong>-এর মধ্যে। কিন্তু CAP থিওরেমের মূল সীমাবদ্ধতা হলো, এটি কেবল নেটওয়ার্ক ফেইলিয়র বা পার্টিশনের মুহূর্তের কথা বলে—স্বাভাবিক অবস্থায় (Normal State) ডাটাবেজ কীভাবে আচরণ করবে তা ব্যাখ্যা করে না।</p>

      <h4>২. PACELC Theorem (আধুনিক ব্যাখ্যা):</h4>
      <p>Daniel Abadi দ্বারা প্রস্তাবিত <strong>PACELC Theorem</strong> ডিস্ট্রিবিউটেড ডাটাবেজের স্বাভাবিক ও অস্বাভাবিক উভয় অবস্থার ট্রেড-অফ ব্যাখ্যা করে। এর সূত্রটি হলো:</p>
      
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-bit">Copy</button></div>
        <pre><code>If Partition (P):
    Choose between Availability (A) and Consistency (C)
Else (E) [Normal Operation]:
    Choose between Latency (L) and Consistency (C)</code></pre>
      </div>

      <h4>৩. PACELC শ্রেণীবিন্যাস ও ডাটাবেজ ম্যাপিং:</h4>
      <table>
        <tr>
          <th>টাইপ</th>
          <th>পার্টিশনের সময় (P)</th>
          <th>স্বাভাবিক অবস্থায় (E)</th>
          <th>উদাহরণ ডাটাবেজ</th>
        </tr>
        <tr>
          <td><strong>PC/EC</strong></td>
          <td>Consistency বজায় রাখে (A কমায়)</td>
          <td>Consistency বজায় রাখে (Latency বাড়ে)</td>
          <td>PostgreSQL (2PC), CockroachDB, Google Spanner, MongoDB (Majority)</td>
        </tr>
        <tr>
          <td><strong>PA/EL</strong></td>
          <td>Availability বজায় রাখে (C কমায়)</td>
          <td>Low Latency কে প্রাধান্য দেয় (Eventual C)</td>
          <td>Apache Cassandra, Amazon DynamoDB, Couchbase</td>
        </tr>
        <tr>
          <td><strong>PA/EC</strong></td>
          <td>Availability বজায় রাখে</td>
          <td>Consistency নিশ্চিত করে</td>
          <td>MongoDB (Primary Read/Write with default WriteConcern)</td>
        </tr>
      </table>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- MongoDB Read Preference tuning reflecting PACELC Trade-off:
-- PC/EC mode (High Consistency, Higher Latency):
db.orders.find().readConcern("majority");

-- PA/EL mode (Low Latency, Eventual Consistency):
db.orders.find().readPreference("nearest");</code></pre>
      </div>
    `
  },
  {
    id: "db-32",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Replication", "Master-Slave", "Logical"],
    question: "Master-Slave Replication (Physical Streaming vs Logical Replication) এবং Replication Lag কী?",
    answer: `
      <p>PostgreSQL এবং আধুনিক RDBMS-এ ডাটা স্কেলিং ও রিড-হেভি ওয়ার্কলোড কমানোর জন্য Master-Slave Replication ব্যবহৃত হয়। এটি ২ উপায়ে করা যায়: <strong>Physical Streaming Replication</strong> এবং <strong>Logical Replication</strong>।</p>
      
      <h4>১. Physical Streaming vs Logical Replication:</h4>
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>Physical Streaming Replication</th>
          <th>Logical Replication</th>
        </tr>
        <tr>
          <td><strong>ডাটা লেভেল</strong></td>
          <td>ডিস্কের বাইনারি পেজ ও WAL ব্লক হুবহু কপি করে (Byte-for-byte copy)।</td>
          <td>লজিক্যাল DML ইভেন্ট (INSERT, UPDATE, DELETE) আকারে টেবিল-বাই-টেবিল স্ট্রিম করে।</td>
        </tr>
        <tr>
          <td><strong>স্কিমা ও ভার্সন</strong></td>
          <td>মাস্টার ও স্লেভের ডাটাবেজ ভার্সন, ওএস এবং আর্কিটেকচার সম্পূর্ণ এক হতে হবে।</td>
          <td>ভিন্ন ডাটাবেজ ভার্সনেও কাজ করে (e.g., Postgres 14 to Postgres 16) এবং স্লেভে ভিন্ন ইনডেক্স রাখা যায়।</td>
        </tr>
        <tr>
          <td><strong>গ্র্যানুলারিটি (Granularity)</strong></td>
          <td>পুরো ডাটাবেজ ক্লাস্টার একবারে কপি হয় (অল-অর-নাথিং)।</td>
          <td>নির্দিষ্ট নির্দিষ্ট টেবিল বা স্কিমা সিলেক্ট করে (Publish/Subscribe) সিঙ্ক করা যায়।</td>
        </tr>
        <tr>
          <td><strong>স্লেভ রাইট অ্যাক্সেস</strong></td>
          <td>স্লেভ সম্পূর্ণ Read-Only মোডে থাকে।</td>
          <td>স্লেভ নোডে অতিরিক্ত স্থানীয় টেবিল তৈরি ও রাইট করা সম্ভব।</td>
        </tr>
      </table>

      <h4>২. Replication Lag কী এবং কীভাবে মনিটর করবেন?</h4>
      <p><strong>Replication Lag</strong> হলো মাস্টারে কোনো ডাটা রাইট (Commit) হওয়া এবং স্লেভ নোডে সেই একই ডাটা অ্যাপ্লাই হওয়ার মধ্যকার সময়ের বা সাইজের পার্থক্য (Delay)। নেটওয়ার্ক ধীর হলে, স্লেভে ভারী রিড কোয়েরি চললে বা মাস্টারে একবারে অনেক বাল্ক ইনসার্ট হলে Replication Lag বাড়ে।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Logical Replication Setup (Publisher on Primary)
CREATE PUBLICATION order_pub FOR TABLE orders, order_items;

-- Logical Replication Setup (Subscriber on Replica)
CREATE SUBSCRIPTION order_sub 
CONNECTION 'host=primary_db port=5432 dbname=prod user=rep_user password=secret' 
PUBLICATION order_pub;

-- 2. Monitoring Replication Lag Bytes on Primary Master (PostgreSQL)
SELECT 
    client_addr AS replica_ip,
    application_name,
    state,
    sync_state,
    pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes
FROM pg_stat_replication;</code></pre>
      </div>
    `
  },
  {
    id: "db-33",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Foreign Keys", "CASCADE", "Triggers"],
    question: "ON DELETE CASCADE, ON DELETE SET NULL, এবং Foreign Key Constraint Triggers-এর সঠিক ব্যবহার কী?",
    answer: `
      <p>প্যারেন্ট টেবিল থেকে কোনো রেকর্ড মুছে ফেলা হলে (Delete) চাইল্ড টেবিলের রেফারেন্সযুক্ত ডাটাগুলোর কী পরিণতি হবে, তা নির্ধারিত হয় Referential Integrity Rules এবং Constraint Triggers দ্বারা।</p>
      
      <h4>১. সঠিক ব্যবহার ও রিস্ক অ্যাসেসমেন্ট:</h4>
      <ul>
        <li><strong>ON DELETE CASCADE (কঠোর আঁটসাঁট সম্পর্ক):</strong> প্যারেন্ট ডিলিট হলে চাইল্ডের সব রেকর্ড নিজ দায়িত্বে ডিলিট হয়।
          <br/><em>ব্যবহার:</em> <code>Orders -> OrderItems</code>, <code>Invoices -> InvoiceLineItems</code>।
          <br/><em>ঝুঁকি:</em> ভুলবশত প্যারেন্ট টেবিলের ১টি সারি ডিলিট করলে অজান্তেই চাইল্ড টেবিলের হাজার হাজার রেকর্ড মুছে যেতে পারে (Mass accidental deletion)।
        </li>
        <li><strong>ON DELETE SET NULL (অডিট ট্রেইল ও রিটেনশন):</strong> প্যারেন্ট ডিলিট হলে চাইল্ড রেকর্ড থেকে যায়, কেবল FK কলামটি <code>NULL</code> হয়।
          <br/><em>ব্যবহার:</em> <code>Users -> Posts</code> (ইউজার একাউন্ট ডিলিট করলেও তার পোস্টগুলো 'Anonymous User' হিসেবে ব্লগে রেখে দেওয়া)।
        </li>
        <li><strong>ON DELETE RESTRICT / NO ACTION (ডাটা সুরক্ষা):</strong> চাইল্ড টেবিলে রেকর্ড থাকলে প্যারেন্ট রো কোনোভাবেই ডিলিট হতে দেয় না। (ডিফল্ট ও নিরাপদ মোড)।</li>
      </ul>

      <h4>২. Foreign Key Constraint Triggers (কাস্টম বিজনেস রুলস):</h4>
      <p>সাধারণ declarative constraint দিয়ে যখন জটিল শর্ত পূরণ করা যায় না (যেমন: অর্ডারের স্ট্যাটাস 'DELIVERED' হয়ে গেলে আর ডিলিট করতে না দেওয়া, অথবা সফট ডিলিট বাস্তবায়ন করা), তখন Constraint Trigger ব্যবহার করা হয়।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Standard Declarative Foreign Key Definitions
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES users(id) ON DELETE SET NULL -- Keeps post, clears author
);

-- 2. Custom Constraint Trigger Example (Blocks deletion if business logic fails)
CREATE OR REPLACE FUNCTION check_order_deletion_safety() 
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent deletion of User if they have active processing orders
    IF EXISTS (SELECT 1 FROM orders WHERE user_id = OLD.id AND status = 'PROCESSING') THEN
        RAISE EXCEPTION 'Cannot delete User ID %: User has active PROCESSING orders!', OLD.id;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER trg_prevent_user_delete
AFTER DELETE ON users
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION check_order_deletion_safety();</code></pre>
      </div>
    `
  },
  {
    id: "db-34",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Normalization", "3NF", "Denormalization"],
    question: "Database Normalization (1NF, 2NF, 3NF, BCNF) vs Denormalization — পারফরম্যান্স ও ডেটা ইন্টিগ্রিটি ব্যালেন্স কীভাবে করবেন?",
    answer: `
      <p>ডাটাবেজ আর্কিটেকচারে <strong>Normalization</strong> এবং <strong>Denormalization</strong> দুটি সম্পূর্ণ বিপরীতমুখী কৌশল। সঠিক প্রজেক্ট ডিজাইনের জন্য এই দুটির মধ্যে ব্যালেন্স করা অত্যন্ত জরুরি।</p>
      
      <h4>১. নরম্যালাইজেশন বনাম ডি-নরম্যালাইজেশন তুলনা:</h4>
      <table>
        <tr>
          <th>বিষয়</th>
          <th>Normalization (3NF / BCNF)</th>
          <th>Denormalization</th>
        </tr>
        <tr>
          <th>মূল উদ্দেশ্য</th>
          <td>ডাটা ডুপ্লিকেশন দূর করা ও Write Integrity নিশ্চিত করা।</td>
          <td><code>JOIN</code> কমানো এবং Read Performance বাড়ানো।</td>
        </tr>
        <tr>
          <th>উপযোগী সিস্টেম</th>
          <td><strong>OLTP (Online Transaction Processing):</strong> হাই ইনসার্ট/আপডেট অ্যাপ (e.g., Banking, ERP)।</td>
          <td><strong>OLAP (Online Analytical Processing):</strong> রিড-হেভি সিস্টেম, রিপোর্ট ও ড্যাশবোর্ড।</td>
        </tr>
        <tr>
          <th>পারফরম্যান্স ট্রেড-অফ</th>
          <td>Write ফাস্ট, কিন্তু রিডের সময় অনেকগুলো টেবিল <code>JOIN</code> করতে হয় বলে রিড স্লো।</td>
          <td>Read ফাস্ট, কিন্তু ডাটা আপডেটের সময় একাধিক জায়গায় আপডেট করতে হয় (Write overhead)।</td>
        </tr>
      </table>

      <h4>২. ব্যালেন্স করার সিনিয়র-লেভেল কৌশল (Materialized Views & Triggers):</h4>
      <p>প্রোডাকশন লেভেলে মূল OLTP ডাটাবেজকে সবসময় 3NF-এ নরম্যালাইজড রাখা হয়। আর রিড পারফরম্যান্স বাড়ানোর জন্য নিচের পদ্ধতিগুলো দিয়ে ডি-নরম্যালাইজেশন করা হয়:</p>
      <ul>
        <li><strong>Calculated Column Caching:</strong> ড্যাশবোর্ডের জন্য বারবার <code>COUNT()</code> বা <code>SUM()</code> না চালিয়ে মূল টেবিলে ১টি ক্যালকুলেটেড কলাম রাখা এবং ট্র্রিগার দিয়ে তা সিঙ্ক রাখা।</li>
        <li><strong>Materialized Views:</strong> জটিল এবং ভারী JOIN ক্যোয়ারীর ফলাফল ডিস্কে ক্যাশ করে রাখা এবং নির্দিষ্ট সময় পরপর রিফ্রেশ করা।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Creating a Materialized View for Denormalized Analytics Dashboard
CREATE MATERIALIZED VIEW mv_customer_summary AS
SELECT 
    u.id AS user_id,
    u.name,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Unique Index on Materialized View allows Concurrent Refresh (Zero Read-Locking!)
CREATE UNIQUE INDEX idx_mv_customer_user_id ON mv_customer_summary(user_id);

-- Refresh View in Background
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_customer_summary;</code></pre>
      </div>
    `
  },
  {
    id: "db-35",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "VACUUM", "Bloat"],
    question: "PostgreSQL MVCC Bloat এবং Autovacuum / VACUUM FULL কীভাবে মেমোরি ফিনিক্স করে?",
    answer: `
      <p>PostgreSQL কনকারেন্সি কন্ট্রোলের জন্য **MVCC (Multi-Version Concurrency Control)** ব্যবহার করে। এর ফলে কোনো ডাটা <code>UPDATE</code> বা <code>DELETE</code> করলে টেবিলের পুরনো ডাটা সারিগুলো ফিজিক্যালি ডিস্ক থেকে মুছে যায় না—বরং সেগুলো <strong>Dead Tuples</strong> হিসেবে থেকে যায়। এটিই হলো **Table Bloat**।</p>
      
      <h4>১. Table & Index Bloat-এর সমস্যা:</h4>
      <p>যদি Dead Tuples পরিষ্কার না করা হয়, তবে টেবিলের সাইজ অযথা বাড়তে থাকে (Bloat)। এর ফলে ইনডেক্স সার্চ ও সিকুয়েনশিয়াল স্ক্যান অনেক ধীর হয়ে যায়, কারণ ডাটাবেজ ইঞ্জিনকে অনাবশ্যক মৃত সারিগুলোও রিড করতে হয়।</p>

      <h4>২. Autovacuum vs VACUUM FULL কাজের পার্থক্য:</h4>
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>Autovacuum (Standard Vacuum)</th>
          <th>VACUUM FULL</th>
        </tr>
        <tr>
          <td><strong>কাজের মেকানিজম</strong></td>
          <td>Dead Tuples চিহ্নিত করে সেগুলোর স্থানকে "Free Space Map (FSM)"-এ খালি হিসেবে মার্ক করে, যাতে নতুন <code>INSERT</code> সেখানে হতে পারে।</td>
          <td>পুরো টেবিলটি রি-রাইট করে একদম নতুন ডিস্ক ফাইলে কপি করে এবং মৃত অংশগুলো সম্পূর্ণ মুছে ফেলে।</td>
        </tr>
        <tr>
          <td><strong>অপারেটিং সিস্টেমকে ডিস্ক স্পেস ফেরত দেয়া</strong></td>
          <td><strong>দেয় না।</strong> (ফাইলের শেষ প্রান্তের ফ্রি স্পেস ছাড়া বাকি স্পেস ডাটাবেজের ভেতরেই পুনর্ব্যবহারের জন্য থেকে যায়)।</td>
          <td><strong>সম্পূর্ণ ফেরত দেয়।</strong> ডিস্ক স্পেস OS-কে ফ্রি করে দেয়।</td>
        </tr>
        <tr>
          <td><strong>টেবিল লকিং</strong></td>
          <td>নন-ব্লকিং। সাধারণ রিড/রাইটের সাথে ব্যাকগ্রাউন্ডে চলতে পারে (<code>SHARE UPDATE EXCLUSIVE</code>)।</td>
          <td><strong>এক্সক্লুসিভ লক নেয় (ACCESS EXCLUSIVE)।</strong> এটি চলাকালীন টেবিলে সব প্রকার রিড/রাইট সম্পূর্ণ ব্লক থাকে।</td>
        </tr>
      </table>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Check Table Bloat & Dead Tuples in PostgreSQL
SELECT 
    relname AS table_name, 
    n_live_tup AS live_rows, 
    n_dead_tup AS dead_rows,
    round(n_dead_tup::numeric / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 2) AS dead_tuple_ratio
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- 2. Run Manual Standard Vacuum (Non-blocking)
VACUUM (VERBOSE, ANALYZE) orders;

-- 3. Zero-Downtime Bloat Reduction Alternative (using pg_repack extension instead of VACUUM FULL)
-- pg_repack builds a new table copy online WITHOUT holding exclusive lock!
-- Terminal Command: pg_repack -k -t orders prod_db</code></pre>
      </div>
    `
  },
  {
    id: "db-36",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Database", "Microservices", "Architecture", "Senior"],
    question: "একাধিক মাইক্রোসার্ভিস একই Database Schema শেয়ার করা কেন Anti-pattern — Database-per-Service কীভাবে সমাধান দেয়?",
    answer: `
      <p>মাইক্রোসার্ভিস আর্কিটেকচারে একাধিক স্বাধীন সার্ভিস একই ডাটাবেজ স্কিমা শেয়ার করা একটি মারাত্মক অ্যান্টি-প্যাটার্ন (যাকে <strong>Shared Database Anti-pattern</strong> বলা হয়)।</p>
      
      <h4>১. শেয়ার্ড ডাটাবেজের প্রধান সমস্যাসমূহ:</h4>
      <ul>
        <li><strong>Tight Coupling (কঠিন নির্ভরতা):</strong> Order Service যদি টেবিলে ১টি কলামের নাম বদলায়, তবে একই টেবিল অ্যাক্সেস করা Shipping Service এবং Inventory Service না জানিয়ে হঠাৎ ক্র্যাশ করবে।</li>
        <li><strong>No Bounded Context (মালিকানার অভাব):</strong> ডাটাবেজের কোনো টেবিলের একক মালিক থাকে না। যেকোনো সার্ভিস সরাসরি SQL চালিয়ে বিজনেস নিয়ম লঙ্ঘন করতে পারে।</li>
        <li><strong>Scaling Bottleneck:</strong> ১টি সার্ভিস বেশি লোড পেলে পুরো এক একক শেয়ার্ড ডাটাবেজ থমকে যায়—স্বাধীনভাবে স্কেল করা যায় না।</li>
      </ul>

      <h4>২. সমাধান: Database-per-Service Architecture:</h4>
      <p>প্রতিটি মাইক্রোসার্ভিসের নিজস্ব ডাটাবেজ (Postgres, MongoDB, Redis ইত্যাদি) থাকবে। কোনো সার্ভিস অন্য সার্ভিসের ডাটাবেজে সরাসরি SQL চালাতে পারবে না। ডাটা শেয়ার করার ২টি সঠিক পদ্ধতি:</p>
      <ul>
        <li><strong>Synchronous Communication (REST/gRPC):</strong> সার্ভিস সরাসরি অন্য সার্ভিসের অনুমোদিত API কল করে ডাটা নেবে।</li>
        <li><strong>Asynchronous Event-Driven Communication (Outbox Pattern + Kafka):</strong> ডাটা পরিবর্তনের ঘটনা Event হিসেবে মেসেজ ব্রোকারে পুশ হবে, অন্য সার্ভিস তা কনজিউম করে নিজের ডাটাবেজে ভিউ তৈরি করে নেবে।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ ❌ SHARED DATABASE ANTI-PATTERN ]
[ Order Service ] ────┐
[ Shipping Service ] ─┼──► ( Shared MySQL Database ) ◄── Tight Coupling / Single Point of Failure
[ Inventory Service ]─┘

[ ✅ DATABASE-PER-SERVICE ARCHITECTURE ]
[ Order Service ] ────► ( Order DB ) ───( Publish Event )───┐
                                                             ▼
                                                    [ Kafka Event Bus ]
                                                             │
[ Shipping Service ] ──► ( Shipping DB ) ◄──( Consume Event )┘</code></pre>
      </div>
    `
  },
  {
    id: "db-37",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Indexing", "Partial Index", "Covering Index"],
    question: "Partial Index and Covering Index (INCLUDE Clause) কীভাবে কোয়েরি অপটিমাইজ করে?",
    answer: `
      <p>বড় প্রোডাকশন ডাটাবেজে ইনডেক্সের সাইজ ছোট রাখা এবং ডিস্ক আই/ও (Heap Read) পুরোপুরি বাইপাস করার জন্য **Partial Index** এবং **Covering Index** ব্যবহার করা হয়।</p>
      
      <h4>১. Partial Index (আংশিক ইনডেক্স):</h4>
      <p>পুরো টেবিলের সকল সারিতে ইনডেক্স না বসিয়ে <code>WHERE</code> কন্ডিশন দিয়ে কেবল নির্দিষ্ট শর্ত পূরণকারী সারিগুলোর ওপর ইনডেক্স তৈরি করা।</p>
      <ul>
        <li><strong>সুবিধা:</strong> ইনডেক্সের সাইজ ৮০-৯০% পর্যন্ত ছোট হয়, RAM মেমোরি বাঁচে এবং ইনসার্ট/আপডেটের সময় ইনডেক্স মেইনটেইন করার ওভারহেড কমে।</li>
        <li><strong>ব্যবহারের ক্ষেত্র:</strong> Soft-deleted টেবিল (<code>WHERE is_deleted = false</code>), অথবা আন-প্রসেসড অর্ডার (<code>WHERE status = 'PENDING'</code>)।</li>
      </ul>

      <h4>২. Covering Index with INCLUDE Clause:</h4>
      <p>সাধারণত ইনডেক্স থেকে ডাটার পয়েন্টার পাওয়ার পর ডাটাবেজকে মূল ডাটা পেজে (Heap Page) গিয়ে বাকি কলামগুলো রিড করতে হয় (Heap Fetch)। কিন্তু যদি কোয়েরির প্রয়োজনীয় অতিরিক্ত কলামগুলো ইনডেক্সের Leaf Node-এই <code>INCLUDE</code> ক্লজ দিয়ে সেভ রাখা হয়, তবে ডাটাবেজকে মূল টেবিলে যেতেই হয় না। একে <strong>Index-Only Scan</strong> বলে।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Partial Index Example
-- Only indexes active pending orders (Ignores millions of completed historic orders)
CREATE INDEX idx_pending_orders ON orders (user_id, created_at) 
WHERE status = 'PENDING';

-- Query using Partial Index:
SELECT * FROM orders WHERE user_id = 500 AND status = 'PENDING';

-- 2. Covering Index Example with INCLUDE Clause
-- B-Tree Key: email | Payload in Leaf Node: first_name, last_name
CREATE INDEX idx_users_email_covering ON users (email) 
INCLUDE (first_name, last_name);

-- Query triggers 'Index Only Scan' (Zero Heap Fetch! Super Fast):
EXPLAIN ANALYZE 
SELECT first_name, last_name FROM users WHERE email = 'dev@test.com';</code></pre>
      </div>
    `
  },
  {
    id: "db-38",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pflow", "Listen/Notify"],
    question: "PostgreSQL LISTEN / NOTIFY দিয়ে রিয়েল-টাইম ডাটাবেজ চেঞ্জ নোটিফিকেশন কীভাবে ট্র্যাকিং করবেন?",
    answer: `
      <p><strong>LISTEN / NOTIFY</strong> হলো PostgreSQL-এর বিল্ট-ইন Pub-Sub (Publisher-Subscriber) মেকানিজম। এটি ব্যাকএন্ড অ্যাপ্লিকেশনগুলোকে ডাটাবেজের অনাকাঙ্ক্ষিত পোলিং (Polling - বারবার <code>SELECT</code> চালানো) ছাড়াই রিয়েল-টাইমে ডাটা পরিবর্তনের আপডেট পেতে সাহায্য করে।</p>
      
      <h4>১. কীভাবে কাজ করে?</h4>
      <ul>
        <li><strong>LISTEN channel_name:</strong> ক্লায়েন্ট (যেমন Node.js বা Go সার্ভিস) নির্দিষ্ট নোটিফিকেশন চ্যানেলে সাবস্ক্রাইব করে শোনে।</li>
        <li><strong>NOTIFY channel_name, 'payload':</strong> ডাটাবেজের কোনো ট্রিগার বা কোয়েরি থেকে ওই চ্যানেলে মেসেজ বা JSON পে-লোড পাঠানো হয়।</li>
        <li><strong>Transaction Atomicity:</strong> <code>NOTIFY</code> ঘটনাটি ট্রানজেকশনের ভেতরে ঘটে। ট্রানজেকশন সফলভাবে <code>COMMIT</code> হলেই কেবল ক্লায়েন্টের কাছে মেসেজ ডেলিভার হয়। Rollback হলে মেসেজ ড্রপ হয়।</li>
      </ul>

      <h4>২. সীমাবদ্ধতা:</h4>
      <p>পে-লোড সাইজ সর্বোচ্চ **৮০০০ বাইট (8KB)** হতে পারে। এটি Kafka বা RabbitMQ-এর মতো কোনো মেসেজ পারসিস্টেন্স বা কিউয়িং সাপোর্ট করে না (সংযোগ বিচ্ছিন্ন থাকলে নোটিফিকেশন হারিয়ে যায়)।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Step 1: Create Trigger Function that emits NOTIFY JSON
CREATE OR REPLACE FUNCTION notify_order_status_change() 
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        PERFORM pg_notify(
            'order_status_channel', 
            json_build_object(
                'order_id', NEW.id, 
                'old_status', OLD.status, 
                'new_status', NEW.status
            )::text
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_status_notify
AFTER UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION notify_order_status_change();</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Step 2: Node.js Backend Subscribing to Postgres NOTIFY
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });

async function listenToDbEvents() {
  await client.connect();
  await client.query('LISTEN order_status_channel');

  client.on('notification', (msg) => {
    const payload = JSON.parse(msg.payload);
    console.log('Real-time Event Received:', payload);
    // Push real-time event to Frontend via WebSocket!
  });
}
listenToDbEvents();</code></pre>
      </div>
    `
  },
  {
    id: "db-39",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Optimization", "Bulk Insert", "COPY"],
    question: "PostgreSQL COPY Command vs Bulk INSERT — ১ লাখ রেকর্ড ১ সেকেন্ডে আপলোডের উপায় কী?",
    answer: `
      <p>বড় ডেটাসেট (CSV/Dump files) ডাটাবেজে বাল্ক লোড করার সময় সাধারণ <code>INSERT</code> স্টেটমেন্ট চরম ধীরগতির হয়। সঠিক কৌশল ব্যবহার করলে ১ লাখ রেকর্ড ১-২ সেকেন্ডে ইমপোর্ট করা সম্ভব।</p>
      
      <h4>১. সাধারণ INSERT ধীর হওয়ার কারণ:</h4>
      <p>প্রতিটি পৃথক <code>INSERT</code> স্টেটমেন্টের জন্য: (১) আলাদা নেটওয়ার্ক রাউন্ড-ট্রিপ, (২) কোয়েরি পার্সিং ও প্ল্যানিং ওভারহেড, এবং (৩) প্রতি রো-তে পৃথক WAL (Write-Ahead Log) ডিস্ক ফ্ল্যাশ হয়।</p>

      <h4>২. বাল্ক ইমপোর্টের ৩টি স্তরের পারফরম্যান্স তুলনা:</h4>
      <ul>
        <li><strong>Individual INSERT (ধীরতম):</strong> ১ লাখ রো = ১ লাখ নেটওয়ার্ক ট্রিপ (সময়: ১-২ মিনিট)।</li>
        <li><strong>Multi-row INSERT (মাঝারি):</strong> <code>INSERT INTO tbl VALUES (...), (...), (...)</code> ব্যাচে ১০০০টি করে রো পাঠানো (সময়: ৫-১০ সেকেন্ড)।</li>
        <li><strong>PostgreSQL COPY Command (দ্রুততম):</strong> SQL Parser বাইপাস করে সরাসরি বাইনারি/CSV স্ট্রিম ডিস্ক পেজে পাঠায় (সময়: ১ সেকেন্ডের কম)।</li>
      </ul>

      <h4>৩. ১ লাখ রেকর্ড ১ সেকেন্ডে আপলোডের মাস্টার চেকক্লিনিক:</h4>
      <ol>
        <li><code>COPY</code> স্টেটমেন্ট বা Node.js-এর <code>pg-copy-streams</code> ব্যবহার করা।</li>
        <li>বাল্ক ইনসার্টের আগে সাময়িকভাবে টেবিলের **Secondary Indexes** এবং **Foreign Key Constraints** ড্রপ/ডিজেবল করা (ইনসার্ট শেষে পুনরায় বিল্ড করা)।</li>
        <li>ইনসার্ট প্রক্রিয়াটি একটি একক ট্রানজেকশনে রাখা।</li>
      </ol>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. High-Performance COPY Command via SQL
COPY users (first_name, last_name, email) 
FROM '/var/lib/postgresql/data_file.csv' 
WITH (FORMAT csv, HEADER true, DELIMITER ',');</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 2. Ultra-Fast Streaming COPY via Node.js (pg-copy-streams)
const { from: copyFrom } = require('pg-copy-streams');
const fs = require('fs');

async function bulkUpload() {
  const client = await pool.connect();
  try {
    const stream = client.query(
      copyFrom("COPY users (first_name, last_name, email) FROM STDIN WITH (FORMAT csv)")
    );
    const fileStream = fs.createReadStream('100k_users.csv');
    
    fileStream.pipe(stream); // Directly streams CSV chunks into DB Binary Engine
    stream.on('finish', () => console.log('100k rows imported in < 1 second!'));
  } finally {
    client.release();
  }
}</code></pre>
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
      <p>ডাটাবেজ টেবিলের Primary Key সিলেক্ট করার ওপর B-Tree ইনডেক্স পারফরম্যান্স, ডিস্ক আই/ও এবং ডিস্ট্রিবিউটেড স্কেলিং সরাসরি নির্ভর করে।</p>
      
      <h4>১. ৩টি প্রাইমারি কি টাইপের অভ্যন্তরীণ তুলনা:</h4>
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>Auto-Increment (BIGINT)</th>
          <th>UUID v4 (Random)</th>
          <th>UUID v7 (Time-Ordered)</th>
        </tr>
        <tr>
          <td><strong>সাইজ (Storage)</strong></td>
          <td>৮ বাইট (64-bit) — খুব ছোট।</td>
          <td>১৬ বাইট (128-bit) — বড়।</td>
          <td>১৬ বাইট (128-bit) — বড়।</td>
        </tr>
        <tr>
          <td><strong>ইনসার্ট প্যাটার্ন</strong></td>
          <td>সিকুয়েনশিয়াল (Monotonically Increasing)।</td>
          <td>সম্পূর্ণ র্যান্ডম (Random 128 bits)।</td>
          <td>সময় অনুযায়ী সিকুয়েনশিয়াল (Unix Epoch + Random bits)।</td>
        </tr>
        <tr>
          <td><strong>B-Tree Index বিহেভিয়ার</strong></td>
          <td><strong>Optimal:</strong> B-Tree গাছের সবচেয়ে ডানপাশের পাতায় (Rightmost Leaf) পরপর ইনসার্ট হয়। zero page-splits।</td>
          <td><strong>Terrible:</strong> B-Tree-এর যেকোনো এলোমেলো পাতায় ঢোকে। ফলে মারাত্মক <strong>Page Split</strong>, Index Fragmentation এবং Random Disk Read হয়।</td>
        </tr>
        <tr>
          <td><strong>ডিস্ট্রিবিউটেড ইউনিকনেস</strong></td>
          <td>নাই (সেন্ট্রাল ডাটাবেজ লাগে, ID Collision এর ঝুঁকি থাকে)।</td>
          <td>১০০% গ্লোবালি ইউনিক (No Central DB required)।</td>
          <td>১০০% গ্লোবালি ইউনিক (Time-sortable + Unique)।</td>
        </tr>
      </table>

      <h4>২. B-Tree Insertion Impact (ASCII Diagram):</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ Auto-Increment / UUID v7 ] ──► Inserts sequentially at the END of B-Tree ──► Fast / No Page Split
[ UUID v4 (Random) ]         ──► Inserts in the MIDDLE of full B-Tree Pages ──► Page Split / Fragmentation!</code></pre>
      </div>

      <h4>৩. কেন আধুনিক ডিস্ট্রিবিউটেড ব্যাকএন্ডে UUID v7 বিজয়ী?</h4>
      <p>UUID v7 প্রথম ৪৮-বিট টাইমস্ট্যাম্প ধারণ করে, যা ইনডেক্সে Auto-Increment-এর মতো সিকুয়েনশিয়াল ইনসার্ট স্পিড নিশ্চিত করে এবং একই সাথে UUID-এর মতো গ্লোবাল ইউনিকত্ব ও সিকিউরিটি নিশ্চিত করে।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- PostgreSQL 17+ Native UUID v7 support
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuidv7(), -- Time-sorted UUID v7!
    user_id INT NOT NULL,
    amount NUMERIC
);

-- UUID v7 Binary Structure:
-- | 48-bit Timestamp (msec) | 12-bit Ver/Var | 68-bit Cryptographic Random |</code></pre>
      </div>
    `
  },
  {
    id: "db-41",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Joins", "Nested Loop", "Hash Join", "Merge Join"],
    question: "Database Join Algorithms: Nested Loop Join vs Hash Join vs Merge Join কীভাবে কাজ করে?",
    answer: `
      <p>ডাটাবেজ ক্যোয়ারী অপটিমাইজার (Query Optimizer) টেবিলগুলোর সাইজ, ইনডেক্সের উপস্থিতি এবং ডাটা সর্টিং স্ট্যাটাসের ওপর ভিত্তি করে সবচেয়ে কার্যকর <strong>Join Algorithm</strong> স্বয়ংক্রিয়ভাবে সিলেক্ট করে। ৩টি প্রধান অ্যালগরিদমের অভ্যন্তরীণ মেকানিজম নিম্নে আলোচনা করা হলো:</p>
      
      <h4>১. Nested Loop Join (ছোট ডাটা ও ইনডেক্স ভিত্তিক):</h4>
      <p>এটি সাধারণ ব্রুট-ফোর্স (Loop inside Loop) পদ্ধতির মতো কাজ করে। বাইরের টেবিলের (Outer Table / Driving Table) প্রতিটি সারির জন্য ভিতরের টেবিলের (Inner Table) সব সারি স্ক্যান করা হয়।</p>
      <ul>
        <li><strong>টাইম কমপ্লেক্সিটি:</strong> $O(N \times M)$ — কিন্তু ভিতরের টেবিলে B-Tree Index থাকলে তা কমে দাঁড়ায় $O(N \log M)$।</li>
        <li><strong>কখন ব্যবহৃত হয়:</strong> যখন Outer Table খুব ছোট হয় এবং Inner Table-এর Join-Key তে উপযুক্ত Index থাকে।</li>
      </ul>

      <h4>২. Hash Join (বড় আন-সর্টেড ডাটার জন্য সেরা):</h4>
      <p>এটি ২টি ধাপে কাজ করে: **Build Phase** এবং **Probe Phase**।</p>
      <ul>
        <li><strong>Build Phase:</strong> ছোট টেবিলটিকে রিড করে মেমোরিতে (Work Memory) Join-Key এর ওপর ভিত্তি করে একটি <strong>In-Memory Hash Table</strong> তৈরি করে।</li>
        <li><strong>Probe Phase:</strong> বড় টেবিলটি স্ক্যান করা হয় এবং প্রতিটি সারির Join-Key কে হ্যাশ ফাংশনে পাঠিয়ে মেমোরিতে থাকা Hash Table-এর সাথে দ্রুত ম্যাচিং খুঁজে বের করা হয়।</li>
        <li><strong>টাইম কমপ্লেক্সিটি:</strong> $O(N + M)$ — অত্যন্ত ফাস্ট।</li>
        <li><strong>কখন ব্যবহৃত হয়:</strong> যখন উভয় টেবিল অনেক বড়, জয়েন কলামে কোনো ইনডেক্স নেই এবং পর্যাপ্ত RAM মেমোরি বিদ্যমান।</li>
      </ul>

      <h4>৩. Merge Join / Sort-Merge Join (সর্টেড ডাটার জন্য সেরা):</h4>
      <p>যদি দুটি টেবিলই Join-Key অনুযায়ী আগে থেকেই সর্টেড (Sorted) থাকে, তবে ২টি পয়েন্টার ব্যবহার করে সমান্তরালভাবে ১ পাসে ডাটা মার্জ করা হয় (ঠিক Merge Sort-এর মতোই)।</p>
      <ul>
        <li><strong>টাইম কমপ্লেক্সিটি:</strong> সর্ট করা থাকলে $O(N + M)$। সর্ট করা না থাকলে $O(N \log N + M \log M)$।</li>
        <li><strong>কখন ব্যবহৃত হয়:</strong> যখন উভয় টেবিলের Join-Key তে B-Tree Index থাকে (যা আগে থেকেই সর্টেড) অথবা ক্যোয়ারীতে <code>ORDER BY</code> জয়েন কী-এর সাথে মিলে যায়।</li>
      </ul>

      <h4>অ্যালগরিদম সমূহের তুলনা ও ভিজ্যুয়াল ফ্লো:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ Hash Join Algorithm ]
Step 1 (Build):  Small Table A ──(Hash Function)──► [ In-Memory Hash Table ]
Step 2 (Probe):  Large Table B ──(Hash Lookup)────► Match Found! ──► Result Set

[ Merge Join Algorithm ]
Sorted Table A: [10, 20, 30, 40] ──┐
                                   ├──► (Dual Pointer Scan) ──► Joined Output
Sorted Table B: [10, 25, 30, 50] ──┘</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Forcing/Observing Join Algorithms in PostgreSQL via EXPLAIN ANALYZE
EXPLAIN ANALYZE 
SELECT o.id, u.name 
FROM orders o 
JOIN users u ON o.user_id = u.id;

/* Planner Decision Breakdown:
   - If 'users' has B-Tree index on 'id' & 'orders' is small -> Uses Nested Loop Join
   - If both tables are huge with no indexes -> Uses Hash Join
   - If both tables are sorted by user_id via Index -> Uses Merge Join
*/</code></pre>
      </div>
    `
  },
  {
    id: "db-42",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pg_stat_activity", "pg_stat_statements", "Slow Queries"],
    question: "PostgreSQL pg_stat_activity এবং pg_stat_statements দিয়ে স্লো কোয়েরি ও ডেডলক কীভাবে চিহ্নিত করবেন?",
    answer: `
      <p>প্রোডাকশন PostgreSQL সার্ভারে ডাটাবেজের হেলথ মনিটরিং, ডেডলক ট্রাবলশুটিং এবং স্লো কোয়েরি পারফরম্যান্স টিউনিং করার জন্য ২টি বিল্ট-ইন ভিউ ব্যবহার করা হয়: <code>pg_stat_activity</code> এবং <code>pg_stat_statements</code>।</p>
      
      <h4>১. pg_stat_activity (রিয়েল-টাইম কানেকশন ও লক মনিটরিং):</h4>
      <p>এটি ডাটাবেজের লাইভ স্ট্যাটাস দেখায়। বর্তমানে কোন প্রসেস (PID) কোন কোয়েরি রান করছে, কত সময় ধরে রান করছে এবং কোন কোয়েরি অন্য কোয়েরিকে লকিং করে আটকে রেখেছে তা এখান থেকে সরাসরি দেখা যায়।</p>

      <h4>২. pg_stat_statements (ঐতিহাসিক পারফরম্যান্স মেট্রিক্স):</h4>
      <p>এটি ডাটাবেজে চালিত সমস্ত কোয়েরির ঐতিহাসিক পরিসংখ্যান (Aggregated Historical Metrics) জমিয়ে রাখে। সবচেয়ে বেশি সময় নেওয়া কোয়েরি, সবচেয়ে বেশি CPU/Disk I/O ব্যবহার করা কোয়েরি চিহ্নিত করতে এটি অপরিহার্য।</p>

      <h4>প্র্যাকটিক্যাল মনিটরিং SQL স্নিপেটস:</h4>
      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Identify Currently Running Slow Queries (> 5 Seconds)
SELECT 
    pid, 
    usename, 
    client_addr, 
    now() - query_start AS duration, 
    state, 
    query 
FROM pg_stat_activity 
WHERE state != 'idle' AND (now() - query_start) > interval '5 seconds'
ORDER BY duration DESC;

-- 2. Identify Deadlocks and Blocked Queries (Lock Tree)
SELECT
    blocked_locks.pid     AS blocked_pid,
    blocked_activity.usename  AS blocked_user,
    blocking_locks.pid    AS blocking_pid,
    blocking_activity.usename AS blocking_user,
    blocked_activity.query    AS blocked_statement,
    blocking_activity.query   AS blocking_statement
FROM  pg_catalog.pg_locks         blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks         blocking_locks 
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    ```javascript
const databaseQuestions = [
  {
    id: "db-41",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Joins", "Nested Loop", "Hash Join", "Merge Join"],
    question: "Database Join Algorithms: Nested Loop Join vs Hash Join vs Merge Join কীভাবে কাজ করে?",
    answer: `
      <p>SQL ক্যোয়ারী রান করার সময় ডাটাবেজ ক্যোয়ারী প্ল্যানার (Query Planner) টেবিলের ডাটা সাইজ, ইনডেক্সিং এবং memory limits-এর ওপর ভিত্তি করে ৩টি মূল অভ্যন্তরীণ অ্যালগরিদমের একটি বেছে নিয়ে টেবিল জয়েন সম্পন্ন করে।</p>
      
      <h4>১. অ্যালগরিদমসমূহের অভ্যন্তরীণ মেকানিজম ও তুলনা:</h4>
      <table>
        <tr>
          <th>অ্যালগরিদম</th>
          <th>কাজের মেকানিজম</th>
          <th>টাইম কমপ্লেক্সিটি</th>
          <th>কখন বেছে নেওয়া হয়?</th>
        </tr>
        <tr>
          <td><strong>Nested Loop Join</strong></td>
          <td>আউটার টেবিলের (Outer Table) প্রতিটি সারির জন্য ইনার টেবিলের (Inner Table) সব সারি ট্রাভার্স করে ম্যাচ খোঁজে।</td>
          <td>
            ইনডেক্স থাকলে: $O(N \log M)$<br/>
            ইনডেক্স না থাকলে: $O(N \times M)$
          </td>
          <td>১টি টেবিল খুব ছোট এবং অন্য টেবিলে জয়েন-কি এর ওপর B-Tree Inndex থাকে।</td>
        </tr>
        <tr>
          <td><strong>Hash Join</strong></td>
          <td>
            <strong>Build Phase:</strong> ছোট টেবিলের কলামগুলোর ওপর RAM-এ Hash Table তৈরি করে।<br/>
            <strong>Probe Phase:</strong> বড় টেবিল রিড করে Hash Table-এ দ্রুত লুকআপ করে।
          </td>
          <td>$O(N + M)$ (সবচেয়ে ফাস্ট)</td>
          <td>বড় আন-সর্টেড (Unsorted) দুটি টেবিল জয়েন করার জন্য (কোনো ইনডেক্স না থাকলেও কাজ করে)।</td>
        </tr>
        <tr>
          <td><strong>Merge Join</strong></td>
          <td>উভয় টেবিলের ডাটা জয়েন-কি অনুযায়ী পূর্ব থেকেই সর্টেড থাকলে সমান্তরালভাবে ১ পাসে (Single Pass) মার্জ করে।</td>
          <td>
            সর্টেড থাকলে: $O(N + M)$<br/>
            সর্ট করতে হলে: $O(N \log N + M \log M)$
          </td>
          <td>উভয় টেবিল জয়েন-কি দিয়ে সর্টেড থাকলে অথবা জয়েন কলামে B-Tree ইনডেক্স থাকলে।</td>
        </tr>
      </table>

      <h4>২. Hash Join-এর আর্কিটেকচারাল ডায়াগ্রাম:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>[ Build Phase ]  Small Table A ──► [ Hash Function ] ──► [ In-Memory Hash Table ]
                                                                 ▲
[ Probe Phase ]  Large Table B ──► [ Hash Function ] ────────────┘ (Fast Lookups & Match)</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- EXPLAIN ANALYZE Output showing Hash Join execution
EXPLAIN ANALYZE 
SELECT o.id, u.name 
FROM orders o 
JOIN users u ON o.user_id = u.id;

/* Output Example:
Hash Join  (cost=3.25..18.40 rows=100 width=32) (actual time=0.080..0.210 rows=100 loops=1)
  Hash Cond: (o.user_id = u.id)
  -> Seq Scan on orders o
  -> Hash  (cost=2.00..2.00 rows=50 width=16)
        -> Seq Scan on users u
*/</code></pre>
      </div>
    `
  },
  {
    id: "db-42",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "pg_stat_activity", "Slow Queries"],
    question: "PostgreSQL pg_stat_activity এবং pg_stat_statements দিয়ে স্লো কোয়েরি ও ডেডলক কীভাবে চিহ্নিত করবেন?",
    answer: `
      <p>প্রোডাকশন PostgreSQL সার্ভারে ঝুলন্ত (Hanging), আটকে থাকা (Locked) অথবা অতিরিক্ত মেমোরি খাওয়া স্লো ক্যোয়ারী ট্রাবলশুট করার জন্য ২টি গুরুত্বপূর্ণ সিস্টেম ভিউ (System Views) ব্যবহৃত হয়।</p>
      
      <h4>১. pg_stat_activity (রিয়েল-টাইম লাইভ স্টেট মনিটরিং):</h4>
      <p>এটি ডাটাবেজের বর্তমানে রানিং সকল সংযোগ, ক্যোয়ারী, সংযোগকারী ক্লায়েন্টের IP, ক্যোয়ারী শুরুর সময় এবং স্টেট (e.g., <code>active</code>, <code>idle in transaction</code>) সরাসরি ফ্রেম করে দেখায়।</p>

      <h4>২. pg_stat_statements (ঐতিহাসিক ক্যোয়ারী পারফরম্যান্স স্ট্যাটিস্টিক্স):</h4>
      <p>এটি একটি অফিসিয়াল এক্সটেনশন যা ডাটাবেজে রান হওয়া সকল ক্যোয়ারীর ফ্রিকোয়েন্সি, মোট এক্সিকিউশন টাইম, গড়ে মেমোরি বা বাফার রিড ইত্যাদি পারসিস্টেন্টলি ট্র্যাক করে রাখে।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Enable pg_stat_statements in postgresql.conf
shared_preload_libraries = 'pg_stat_statements'

-- 2. Find Currently Active Queries Running for More Than 5 Seconds (pg_stat_activity)
SELECT pid, usename, client_addr, state, age(clock_timestamp(), query_start) AS duration, query
FROM pg_stat_activity
WHERE state != 'idle' AND (clock_timestamp() - query_start) > interval '5 seconds'
ORDER BY duration DESC;

-- 3. Find Top 5 Most Time-Consuming Queries Historically (pg_stat_statements)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT 
    query, 
    calls, 
    round(total_exec_time::numeric, 2) AS total_time_ms,
    round(mean_exec_time::numeric, 2) AS avg_time_ms,
    rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 5;

-- 4. Terminate a Hanging Blocking Query Process (by Process ID / PID)
SELECT pg_terminate_backend(12345);</code></pre>
      </div>
    `
  },
  {
    id: "db-43",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "Tablespace", "Storage"],
    question: "PostgreSQL Tablespaces দিয়ে আলাদা ফিজিক্যাল ডিস্কে (NVMe SSD vs HDD) টেবিল স্টোর কীভাবে করবেন?",
    answer: `
      <p><strong>Tablespace</strong> হলো PostgreSQL-এর একটি স্টোরেজ অ্যাবস্ট্রাকশন ফিচার যা ডাটাবেজ অ্যাডমিনিস্ট্রেটরদের নির্দিষ্ট টেবিল, ইনডেক্স বা ডাটাবেজকে সার্ভারের নির্দিষ্ট কোনো ফিজিক্যাল ড্রাইভ বা ডিস্ক পার্টিশনে স্টোর করার সুবিধা দেয়।</p>
      
      <h4>১. হট/কোল্ড স্টোরেজ টিয়ারিং (Tiered Storage Strategy):</h4>
      <ul>
        <li><strong>Hot Data (NVMe SSD):</strong> যেসব টেবিল বা ইনডেক্সে সেকেন্ডে হাজার হাজার রিড/রাইট হয় (যেমন: <code>orders</code>, <code>active_sessions</code>), সেগুলো আল্ট্রা-ফাস্ট NVMe SSD ড্রাইভে রাখা।</li>
        <li><strong>Cold Data (Cheap HDD / Cloud Storage):</strong> যেসব পুরনো আর্কাইভ ডাটা কালেভদ্রে কোয়েরি করা হয় (যেমন: <code>audit_logs_2023</code>, <code>invoice_backups</code>), সেগুলো সস্তা ও বড় মেমোরির HDD-তে রাখা।</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Step 1: Create Tablespaces pointing to Linux directory mount points
CREATE TABLESPACE fast_nvme_storage LOCATION '/mnt/nvme_drive/pg_data';
CREATE TABLESPACE cheap_hdd_storage LOCATION '/mnt/hdd_drive/pg_archive';

-- Step 2: Create Hot Table in Fast NVMe Storage
CREATE TABLE active_orders (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount NUMERIC(10,2)
) TABLESPACE fast_nvme_storage;

-- Step 3: Create Cold Archive Partition Table in Cheap Storage
CREATE TABLE archived_orders_2023 (
    id BIGINT,
    user_id INT,
    amount NUMERIC(10,2)
) TABLESPACE cheap_hdd_storage;

-- Step 4: Move an Existing Table to a Different Physical Disk (Online operation)
ALTER TABLE user_audit_logs SET TABLESPACE cheap_hdd_storage;</code></pre>
      </div>
    `
  },
  {
    id: "db-44",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["Queries", "GROUP BY", "HAVING", "Execution Order"],
    question: "GROUP BY vs HAVING vs WHERE Clause-এর এক্সিকিউশন অর্ডার ও কাজের পার্থক্য কী?",
    answer: `
      <p>SQL কোয়েরি লেখার অর্ডার এবং ডাটাবেজ ইঞ্জিনের অভ্যন্তরীণ **Execution Order** সম্পূর্ণ ভিন্ন। সঠিক পারফরম্যান্সের জন্য এই এক্সিকিউশন পাইপলাইন বোঝা জরুরি।</p>
      
      <h4>১. SQL Execution Order Pipeline:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>1. FROM / JOIN  ──► 2. WHERE  ──► 3. GROUP BY  ──► 4. HAVING  ──► 5. SELECT  ──► 6. ORDER BY  ──► 7. LIMIT</code></pre>
      </div>

      <h4>২. WHERE বনাম HAVING-এর মূল পার্থক্যসমূহ:</h4>
      <table>
        <tr>
          <th>বৈশিষ্ট্য</th>
          <th>WHERE Clause</th>
          <th>HAVING Clause</th>
        </tr>
        <tr>
          <td><strong>ফিল্টারিংয়ের সময়</strong></td>
          <td>ডাটা গ্রুপ (Group) করার **পূর্বে** ইনডিভিজুয়াল রো ফিল্টার করে।</td>
          <td><code>GROUP BY</code> দিয়ে ডাটা গ্রুপ তৈরি করার **পরে** ফিল্টার করে।</td>
        </tr>
        <tr>
          <td><strong>Aggregate Functions</strong></td>
          <td>Aggregate Functions (<code>SUM</code>, <code>COUNT</code>, <code>AVG</code>) সমর্থন করে না।</td>
          <td>Aggregate Functions-এর ওপর ফিল্টার বসায় (e.g., <code>HAVING COUNT(*) > 5</code>)।</td>
        </tr>
        <tr>
          <td><strong>ইনডেক্স ব্যবহার</strong></td>
          <td>ইনডেক্স ব্যবহার করে দ্রুত রো বাতিল করতে পারে (ফাস্ট)।</td>
          <td>সাধারণত ইনডেক্স ব্যবহার করতে পারে না, গ্রুপ ডাটার ওপর কাজ করে।</td>
        </tr>
      </table>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Practical Example showing Execution Sequence
SELECT 
    department_id, 
    AVG(salary) AS avg_salary
FROM employees
WHERE status = 'ACTIVE'                   -- 1. Filters individual active rows BEFORE grouping
GROUP BY department_id                    -- 2. Groups remaining rows by department
HAVING AVG(salary) > 60000                -- 3. Filters aggregated department groups
ORDER BY avg_salary DESC;                 -- 4. Sorts final result set</code></pre>
      </div>
    `
  },
  {
    id: "db-45",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Security", "SQL Injection", "Parameterized Queries"],
    question: "SQL Injection (SQLi) কীভাবে কাজ করে এবং Parameterized Prepared Statements এটি কেন শতভাগ প্রতিরোধ করে?",
    answer: `
      <p><strong>SQL Injection (SQLi)</strong> হলো একটি ওয়েব সিকিউরিটি ভ্যালনারেবিলিটি যেখানে অ্যাটাকার অনাকাঙ্ক্ষিত ইউজার ইনপুটের সাথে কাঁচা SQL কোড যুক্ত করে ক্যোয়ারীর স্ট্রাকচার পরিবর্তন করে ফেলে ডাটাবেজ থেকে স্পর্শকাতর ডাটা বের করে বা মুছে ফেলে।</p>
      
      <h4>১. SQL Injection কীভাবে ঘটে (String Concatenation Vulnerability):</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ VULNERABLE CODE: Direct String Interpolation
const userInput = "' OR '1'='1"; 
const query = `SELECT * FROM users WHERE email = '${userInput}' AND password = '${password}'`;

// Resulting Executed SQL AST Parser Tree:
// SELECT * FROM users WHERE email = '' OR '1'='1' AND password = '...'
// '1'='1' is always TRUE! Attacker bypasses authentication and dumps entire users table.</code></pre>
      </div>

      <h4>২. Prepared Statements কেন শতভাগ সুরক্ষা দেয়?</h4>
      <p>Parameterized Query ২টি আলাদা ফেজে প্রসেস হয়:</p>
      <ol>
        <li><strong>Preparation Phase (AST Compilation):</strong> ডাটাবেজ ইঞ্জিন ইউজার ইনপুট ছাড়াই কেবল SQL ক্যোয়ারী টেমপ্লেটটি কম্পাইল করে Abstract Syntax Tree (AST) গঠন করে নেয়। ক্যোয়ারীর লজিক্যাল স্ট্রাকচার এখানে চিরতরে ফিক্সড হয়ে যায়।</li>
        <li><strong>Execution Phase (Parameter Binding):</strong> ইউজার ইনপুট ডাটাবেজে সম্পূর্ণ পৃথক প্রোটোকল স্ট্রিমে পাঠানো হয়। ডাটাবেজ ইউজার ইনপুটকে কেবল একটি **Literal Scalar Value** হিসেবে গয়না পরে গ্রহণ করে। ইনপুটের ভেতরে <code>' OR '1'='1</code> থাকলেও তা কোনো কোড হিসেবে এক্সিকিউট হয় না—বরং স্ট্রিং হিসেবে সার্চ করা হয়।</li>
      </ol>

      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ SECURE CODE: Using Parameterized Prepared Statement
const userInput = "' OR '1'='1";
const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';

// userInput is sent bound separately as raw string data:
await db.query(query, [userInput, password]); 
// Safe! Database checks if literal email text is equal to the string "' OR '1'='1"</code></pre>
      </div>
    `
  },
  {
    id: "db-46",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Extensions", "pg_trgm"],
    question: "PostgreSQL Extension: pg_trgm (Trigram Index) দিয়ে Fuzzy Text Search কীভাবে করবেন?",
    answer: `
      <p>সাধারণ B-Tree ইনডেক্স কেবল Prefix Match (e.g., <code>LIKE 'phone%'</code>)-এ কাজ করতে পারে। কিন্তু টেক্সটের শুরুতে ওয়াইল্ডকার্ড থাকলে (e.g., <code>LIKE '%phone%'</code>) বা ইউজার স্পেলিং ভুল লিখলে (Fuzzy Search) B-Tree কাজ করে না এবং Full Table Scan করে। এর সমাধান হলো <strong>pg_trgm (Trigram) Extension</strong>।</p>
      
      <h4>১. Trigram কীভাবে কাজ করে?</h4>
      <p>Trigram একটি শব্দকে ৩-অক্ষরের টুকরায় (Slices) বিভক্ত করে। উদাহরণস্বরূপ <code>"phone"</code> শব্দটি ভাঙলে Trigram হয়: <code>"  p", " ph", "pho", "hon", "one", "ne "</code>। এরপর <strong>GIN (Generalized Inverted Index)</strong> ব্যবহার করে ট্রাইগ্রামগুলোর ওপর ইনডেক্স তৈরি করা হয়।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Step 1: Enable Extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Step 2: Create GIN Index using Trigram operators
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);

-- Step 3: Fast Substring Wildcard Search (Uses Index!)
EXPLAIN ANALYZE 
SELECT * FROM products WHERE name ILIKE '%iphone%';

-- Step 4: Fuzzy Similarity Search (Handles Typos!)
-- User types misspelled 'iphne', pg_trgm matches 'iPhone' using similarity threshold
SELECT name, similarity(name, 'iphne') AS score
FROM products
WHERE name % 'iphne' -- '%' is the similarity operator
ORDER BY score DESC;</code></pre>
      </div>
    `
  },
  {
    id: "db-47",
    category: "Database",
    difficulty: "Advanced",
    tags: ["PostgreSQL", "FDW", "Foreign Data Wrapper"],
    question: "PostgreSQL Foreign Data Wrappers (postgres_fdw) দিয়ে ডিস্ট্রিবিউটেড ডাটাবেজ কোয়েরি কীভাবে করবেন?",
    answer: `
      <p><strong>Foreign Data Wrapper (FDW)</strong> হলো SQL/MED (SQL Management of External Data) স্ট্যান্ডার্ড অনুসারী PostgreSQL-এর একটি এক্সটেনশন। এর মাধ্যমে একাধিক ভিন্ন ফিজিক্যাল সার্ভারে থাকা PostgreSQL বা অন্যান্য ডাটাবেজের টেবিলকে লোকাল টেবিলের মতো অ্যাক্সেস ও <code>JOIN</code> করা যায়।</p>
      
      <h4>১. Pushdown Optimization:</h4>
      <p><code>postgres_fdw</code> অত্যন্ত বুদ্ধিমান। এটি লোকাল ক্যোয়ারীর <code>WHERE</code> কন্ডিশন ও <code>JOIN</code> লজিক দূরবর্তী সার্ভারে পাঠায় (Pushdown), যাতে নেটওয়ার্কে কেবল ফিল্টার করা ফাইনাল ডাটা চলে আসে।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Step 1: Enable Extension
CREATE EXTENSION postgres_fdw;

-- Step 2: Define Connection Server to Remote Postgres Instance
CREATE SERVER remote_payment_db 
FOREIGN DATA WRAPPER postgres_fdw 
OPTIONS (host '10.0.0.45', port '5432', dbname 'payments_prod');

-- Step 3: Map Local User Credentials to Remote Database User
CREATE USER MAPPING FOR current_user 
SERVER remote_payment_db 
OPTIONS (user 'fdw_read_user', password 'secure_password');

-- Step 4: Import Foreign Table Schema locally
IMPORT FOREIGN SCHEMA public FROM SERVER remote_payment_db INTO public;

-- Step 5: Query Remote Table Seamlessly locally & JOIN with Local Users table!
SELECT u.id, u.name, rp.amount, rp.status
FROM users u -- Local table
JOIN foreign_payments rp ON u.id = rp.user_id -- Remote Foreign Table
WHERE rp.created_at >= NOW() - INTERVAL '7 days';</code></pre>
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
      <p>PostgreSQL-এ ডিফল্টভাবে টেক্সট ফিল্টার ও তুলনা কেস-সেনসিটিভ (Case-Sensitive) হয় (যেমন: <code>'Test@test.com'</code> এবং <code>'test@test.com'</code> আলাদা)। কেস-ইনসেনসিটিভ সার্চের জন্য ২টি প্রধান অ্যাপ্রোচ রয়েছে।</p>
      
      <h4>১. Expression Indexing (LOWER Function):</h4>
      <p>সাধারণ <code>VARCHAR</code> কলামে <code>LOWER(email)</code> দিয়ে কাস্টম এক্সপ্রেশন ইনডেক্স তৈরি করা। ক্যোয়ারী চালানোর সময়ও <code>LOWER(email)</code> লিখতে হয়।</p>

      <h4>২. CITEXT Extension (Case-Insensitive Text Data Type):</h4>
      <p><code>CITEXT</code> হলো একটি কাস্টম টাইপ যা ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সকল স্ট্রিং অপারেশনে (<code>=</code>, <code>LIKE</code>, <code>UNIQUE</code> constraint) <code>LOWER()</code> কল করে নেয়।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Approach 1: Expression Indexing on Standard VARCHAR
CREATE INDEX idx_users_lower_email ON users (LOWER(email));

-- Query must explicitly use LOWER() to utilize the index:
SELECT * FROM users WHERE LOWER(email) = LOWER('User@Example.com');


-- Approach 2: Using CITEXT Extension (Cleaner Code)
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    username CITEXT UNIQUE NOT NULL -- Case-Insensitive Unique Constraint!
);

-- Plain Query automatically matches Case-Insensitively!
SELECT * FROM accounts WHERE username = 'JohnDOELocal'; -- Matches 'johndoelocal'</code></pre>
      </div>
    `
  },
  {
    id: "db-49",
    category: "Database",
    difficulty: "Advanced",
    tags: ["Resilience", "Two-Phase Commit", "2PC"],
    question: "Two-Phase Commit (2PC) Protocol দিয়ে Multi-Database Distributed Transaction কীভাবে সামলাবেন?",
    answer: `
      <p>যখন একটি ট্রানজেকশনের কার্যপরিধি একাধিক স্বাধীন ফিজিক্যাল ডাটাবেজ নোড জুড়ে বিস্তৃত থাকে, তখন সকল ডাটাবেজে একসাথে <code>COMMIT</code> অথবা একসাথে <code>ROLLBACK</code> সুনিশ্চিত করতে <strong>Two-Phase Commit (2PC) Protocol</strong> ব্যবহার করা হয়।</p>
      
      <h4>১. Two-Phase Commit (2PC)-এর ২টি ফেজ:</h4>
      <ul>
        <li><strong>Phase 1: Prepare Phase (ভোট গ্রহণ)</strong>
          <br/>সেন্ট্রাল কো-অর্ডিনেটর (Coordinator Node) সবকয়টি পার্টিসিপেন্ট ডাটাবেজকে পরিবর্তনটি প্রস্তুত করতে বলে এবং মেসেজ পাঠায়: <em>"Can you Commit?"</em>। পার্টিসিপেন্টরা ডাটা লকিং ও WAL-এ রাইট করে তৈরি থাকে এবং প্রত্যেকে 'YES' বা 'NO' ভোট পাঠায়।
        </li>
        <li><strong>Phase 2: Commit / Abort Phase (সিদ্ধান্ত বাস্তবায়ন)</strong>
          <br/>সব নোড যদি 'YES' বলে, তবে কো-অর্ডিনেটর সবাইকে <strong>COMMIT PREPARED</strong> বার্তা পাঠায়। আর যদি একটি নোডও 'NO' বলে বা টাইমআউট হয়, তবে কো-অর্ডিনেটর সবাইকে <strong>ROLLBACK PREPARED</strong> নির্দশ দিয়ে পুরো ডিস্ট্রিবিউটেড ট্রানজেকশন বাতিল করে।
        </li>
      </ul>

      <h4>২. 2PC আর্কিটেকচারাল ফ্লো:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Coordinator ───► Prepare? ───► DB Node 1 (Locks & Writes WAL) ──► Vote YES ──┐
Coordinator ───► Prepare? ───► DB Node 2 (Locks & Writes WAL) ──► Vote YES ──┼──► Coordinator sends "COMMIT PREPARED"
                                                                             │
                                                               (If Any NO) ──┴──► Coordinator sends "ROLLBACK PREPARED"</code></pre>
      </div>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- Manual 2PC Protocol Execution in PostgreSQL
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 10;

-- Step 1: Prepare Transaction (Persists locks & WAL to disk, assigns GID)
PREPARE TRANSACTION 'tx_transfer_bd_to_us_101';

-- Step 2A: Commit Prepared Transaction (Executed by Coordinator if all OK)
COMMIT PREPARED 'tx_transfer_bd_to_us_101';

-- Step 2B: Rollback Prepared Transaction (Executed if any node fails)
ROLLBACK PREPARED 'tx_transfer_bd_to_us_101';</code></pre>
      </div>
    `
  },
  {
    id: "db-50",
    category: "Database",
    difficulty: "Intermediate",
    tags: ["PostgreSQL", "Constraints", "CHECK", "EXCLUSION"],
    question: "PostgreSQL CHECK Constraints and EXCLUSION Constraints-এর সিকিউরিটি সুবিধা কী?",
    answer: `
      <p>ডাটাবেজ আর্কিটেকচারের সবচেয়ে শক্তিশালী নিরাপত্তার স্তর হলো **Database-Level Constraints**। অ্যাপ্লিকেশন লেভেলের ভ্যালিডেশন বাইপাস (Race condition বা Direct Script Access) হলেও ডাটাবেজের এই কনস্ট্রেইন্টগুলো টেবিলে কোনো অবৈধ ডাটা প্রবেশ করতে দেয় না।</p>
      
      <h4>১. CHECK Constraint (কলাম মান যাচাই):</h4>
      <p>একক রো-এর বিভিন্ন কলামের মানের ওপর গাণিতিক বা লজিক্যাল ফিল্টার বসায়।</p>

      <h4>২. EXCLUSION Constraint (GiST Index-based Overlap Prevention):</h4>
      <p>একাধিক সারির মধ্যকার সম্পর্কের মধ্যে ওভারল্যাপিং (Overlapping) প্রতিরোধ করে। এটি সময় ভিত্তিক বুকিং শিডিউল বা জিওগ্রাফিক্যাল মানচিত্রে জোনিং ওভারল্যাপ প্রতিরোধে অত্যন্ত কার্যকর। এটি অ্যাপ্লিকেশন লেভেলের <strong>Race Condition শতভাগ প্রতিরোধ করে</strong>।</p>

      <div class="code-box">
        <div class="code-header"><span>sql</span><button class="copy-btn">Copy</button></div>
        <pre><code>-- 1. Table with CHECK Constraints
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    price NUMERIC(10,2) CHECK (price > 0), -- Price cannot be zero or negative
    discount_price NUMERIC(10,2),
    CONSTRAINT chk_discount_valid CHECK (discount_price < price) -- Multi-column logic
);

-- 2. EXCLUSION Constraint Example (Prevent Hotel Room Double Booking Race Conditions)
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE hotel_room_bookings (
    room_number INT,
    booking_period TSRANGE, -- Timestamp range: '[2026-08-10 10:00, 2026-08-12 10:00)'
    
    -- EXCLUSION: Prevent booking if room_number is EQUAL (=) 
    -- AND booking_period OVERLAPS (&&) with any existing row!
    EXCLUDE USING GIST (
        room_number WITH =, 
        booking_period WITH &&
    )
);

-- Inserting non-overlapping booking: SUCCESS
INSERT INTO hotel_room_bookings VALUES (101, '[2026-08-10 10:00, 2026-08-12 10:00)');

-- Trying to insert overlapping time range: FAILS IMMEDIATELY WITH DB EXCEPTION!
INSERT INTO hotel_room_bookings VALUES (101, '[2026-08-11 10:00, 2026-08-13 10:00)');
-- ERROR: conflicting key value violates exclusion constraint "hotel_room_bookings_room_number_booking_period_excl"</code></pre>
      </div>
    `
  }
];
