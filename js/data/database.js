const databaseInterviewQuestionsPart1 = [
  {
    "id": "db-1",
    "category": "Database",
    "difficulty": "Beginner",
    "tags": [
      "Database",
      "Fundamentals"
    ],
    "question": "Database কী?",
    "answer": "\n      <p>Database হলো structuredভাবে data store, manage, retrieve এবং update করার system।</p>\n      <h4>উদাহরণ:</h4>\n      <p><strong>User:</strong></p>\n      <ul>\n        <li>id</li>\n        <li>name</li>\n        <li>email</li>\n      </ul>\n      <p><strong>Product:</strong></p>\n      <ul>\n        <li>id</li>\n        <li>name</li>\n        <li>price</li>\n      </ul>\n      <p><strong>Order:</strong></p>\n      <ul>\n        <li>id</li>\n        <li>user_id</li>\n        <li>total</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n    ↓\nDatabase\n    ↓\nStored Data</code></pre>\n      </div>\n      <h4>Database ব্যবহারের মূল উদ্দেশ্য:</h4>\n      <ul>\n        <li>Data persistence</li>\n        <li>Fast retrieval</li>\n        <li>Data consistency</li>\n        <li>Concurrent access</li>\n        <li>Security</li>\n        <li>Backup &amp; recovery</li>\n      </ul>\n      <h4>Common database types:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1. Relational Database\n   - MySQL\n   - PostgreSQL\n   - Oracle\n   - SQL Server</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>2. NoSQL\n   - MongoDB\n   - Redis\n   - Cassandra\n   - DynamoDB</code></pre>\n      </div>\n      <p>Relational database structured/tabular data এবং relationship-এর জন্য খুব শক্তিশালী।</p>\n    "
  },
  {
    "id": "db-2",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "NoSQL"
    ],
    "question": "SQL এবং NoSQL Database-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>SQL database সাধারণত relational এবং table-based।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Users\nOrders\nProducts</code></pre>\n      </div>\n      <h4>Relationship:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Users\n  ↓\nOrders\n  ↓\nProducts</code></pre>\n      </div>\n      <p><strong>Examples:</strong></p>\n      <ul>\n        <li>MySQL</li>\n        <li>PostgreSQL</li>\n        <li>Oracle</li>\n      </ul>\n      <p>NoSQL database বিভিন্ন data model ব্যবহার করতে পারে।</p>\n      <h4>Examples:</h4>\n      <p>MongoDB → Document<br>Redis → Key-Value<br>Cassandra → Wide Column<br>Neo4j → Graph</p>\n      <h4>SQL ভালো যখন:</h4>\n      <ul>\n        <li>Strong relationships</li>\n        <li>Transactions</li>\n        <li>Complex queries</li>\n        <li>ACID consistency</li>\n        <li>Structured schema</li>\n      </ul>\n      <h4>NoSQL ভালো হতে পারে যখন:</h4>\n      <ul>\n        <li>Flexible schema</li>\n        <li>Massive scale</li>\n        <li>High throughput</li>\n        <li>Specific access patterns</li>\n        <li>Distributed architecture</li>\n      </ul>\n      <p>SQL বনাম NoSQL কোনো absolute winner নয়। Application requirement অনুযায়ী নির্বাচন করতে হয়।</p>\n    "
  },
  {
    "id": "db-3",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "RDBMS",
      "SQL"
    ],
    "question": "RDBMS কী?",
    "answer": "\n      <p>RDBMS = Relational Database Management System।</p>\n      <p>এখানে data table এবং relationship-এর মাধ্যমে store করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>id | name | email\n---|------|------\n1  | A    | a@test.com\n2  | B    | b@test.com</code></pre>\n      </div>\n      <p>orders</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>id | user_id | amount\n---|---------|-------\n1  | 1       | 500\n2  | 2       | 700</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>users.id\n    ↓\norders.user_id</code></pre>\n      </div>\n      <h4>Popular RDBMS:</h4>\n      <ul>\n        <li>MySQL</li>\n        <li>PostgreSQL</li>\n        <li>Oracle</li>\n        <li>SQL Server</li>\n      </ul>\n      <h4>RDBMS-এর গুরুত্বপূর্ণ features:</h4>\n      <ul>\n        <li>Tables</li>\n        <li>Primary Key</li>\n        <li>Foreign Key</li>\n        <li>Constraints</li>\n        <li>Transactions</li>\n        <li>Indexes</li>\n        <li>Joins</li>\n      </ul>\n    "
  },
  {
    "id": "db-4",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Schema",
      "Database Design"
    ],
    "question": "Database Schema কী?",
    "answer": "\n      <p>Schema হলো database-এর logical structure।</p>\n      <h4>এতে define করা হয়:</h4>\n      <ul>\n        <li>Tables</li>\n        <li>Columns</li>\n        <li>Data types</li>\n        <li>Relationships</li>\n        <li>Constraints</li>\n        <li>Indexes</li>\n        <li>Views</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users\n  ├── id INT\n  ├── name VARCHAR\n  ├── email VARCHAR\n  └── created_at DATETIME</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>orders\n  ├── id INT\n  ├── user_id INT\n  └── total DECIMAL</code></pre>\n      </div>\n      <p>Schema application-এর data structure এবং relationship define করে।</p>\n    "
  },
  {
    "id": "db-5",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Primary Key",
      "Constraints"
    ],
    "question": "Primary Key কী?",
    "answer": "\n      <p>Primary Key হলো table-এর প্রতিটি row uniquely identify করার key।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>id | name\n---|-----\n1  | Nazmul\n2  | Rahim</code></pre>\n      </div>\n      <p>এখানে id হলো Primary Key।</p>\n      <h4>Primary Key-এর বৈশিষ্ট্য:</h4>\n      <ul>\n        <li>Unique</li>\n        <li>NULL হতে পারে না</li>\n        <li>প্রতিটি row uniquely identify করে</li>\n        <li>একটি table-এ সাধারণত একটি primary key constraint থাকে</li>\n      </ul>\n      <p>Primary key single column বা composite হতে পারে।</p>\n    "
  },
  {
    "id": "db-6",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Foreign Key",
      "Relationship"
    ],
    "question": "Foreign Key কী?",
    "answer": "\n      <p>Foreign Key একটি table-এর column যা অন্য table-এর primary/unique key reference করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>users:\nid | name\n---|-----\n1  | A</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>orders:\nid | user_id\n---|--------\n10 | 1</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>orders.user_id\n      ↓\nusers.id</code></pre>\n      </div>\n      <p>এটি referential integrity maintain করতে সাহায্য করে।</p>\n      <p>Foreign Key নিশ্চিত করতে পারে যে order-এর user_id valid user-এর দিকে reference করছে।</p>\n    "
  },
  {
    "id": "db-7",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Candidate Key",
      "Keys"
    ],
    "question": "Primary Key, Candidate Key এবং Alternate Key কী?",
    "answer": "\n      <h4>Candidate Key:</h4>\n      <p>যে column/column combination uniquely row identify করতে পারে।</p>\n      <h4>Example:</h4>\n      <h4>users:</h4>\n      <p>id<br>email<br>phone</p>\n      <p>যদি id, email এবং phone প্রত্যেকটি unique হয়, তাহলে এগুলো candidate key হতে পারে।</p>\n      <h4>Primary Key:</h4>\n      <p>Candidate key-গুলোর মধ্যে যেটিকে primary identifier হিসেবে select করা হয়।</p>\n      <h4>Alternate Key:</h4>\n      <p>যে candidate key primary key হিসেবে select হয়নি।</p>\n      <h4>Example:</h4>\n      <p><strong>Candidate:</strong></p>\n      <ul>\n        <li>id</li>\n        <li>email</li>\n      </ul>\n      <p><strong>Primary:</strong></p>\n      <ul>\n        <li>id</li>\n      </ul>\n      <p><strong>Alternate:</strong></p>\n      <ul>\n        <li>email</li>\n      </ul>\n    "
  },
  {
    "id": "db-8",
    "category": "Database",
    "difficulty": "Important",
    "tags": [
      "Composite Key"
    ],
    "question": "Composite Primary Key কী?",
    "answer": "\n      <p>একাধিক column মিলে primary key তৈরি হলে সেটি composite primary key।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>order_items</code></pre>\n      </div>\n      <p>order_id<br>product_id<br>quantity</p>\n      <h4>Primary Key:</h4>\n      <p>(order_id, product_id)</p>\n      <p>কারণ একই order-এর মধ্যে একই product একবারই থাকতে পারে।</p>\n      <p>Composite key relationship/junction table-এ খুব common।</p>\n    "
  },
  {
    "id": "db-9",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Constraints"
    ],
    "question": "Database Constraint কী কী?",
    "answer": "\n      <p>Constraint data integrity enforce করে।</p>\n      <h4>Common constraints:</h4>\n      <ol>\n        <li>PRIMARY KEY</li>\n        <li>FOREIGN KEY</li>\n        <li>UNIQUE</li>\n        <li>NOT NULL</li>\n        <li>CHECK</li>\n        <li>DEFAULT</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>email VARCHAR(255) UNIQUE NOT NULL</code></pre>\n      </div>\n      <h4>এতে:</h4>\n      <ul>\n        <li>NULL allow করবে না</li>\n        <li>Duplicate email allow করবে না</li>\n      </ul>\n      <p>Database-level constraint application bug-এর বিরুদ্ধেও data integrity protect করতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "db-10",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Normalization",
      "Design"
    ],
    "question": "Database Normalization কী?",
    "answer": "\n      <p>Normalization হলো data redundancy এবং update anomaly কমানোর জন্য database structure organize করার process।</p>\n      <h4>ধরা যাক:</h4>\n      <p>orders</p>\n      <p>order_id<br>customer_name<br>customer_phone<br>product_name<br>product_price</p>\n      <p>একই customer information বারবার store হচ্ছে।</p>\n      <h4>Normalize করলে:</h4>\n      <p>customers<br>orders<br>products<br>order_items</p>\n      <p>এভাবে আলাদা entity তৈরি করা যায়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Duplicate data কমে</li>\n        <li>Update consistency বাড়ে</li>\n        <li>Insert anomaly কমে</li>\n        <li>Delete anomaly কমে</li>\n      </ul>\n      <h4>Common normal forms:</h4>\n      <p>1NF<br>2NF<br>3NF<br>BCNF</p>\n    "
  },
  {
    "id": "db-11",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "1NF",
      "Normalization"
    ],
    "question": "1NF কী?",
    "answer": "\n      <p>1NF = First Normal Form।</p>\n      <h4>মূল ধারণা:</h4>\n      <ul>\n        <li>Atomic values</li>\n        <li>Repeating groups না থাকা</li>\n        <li>একটি cell-এ multiple values না রাখা</li>\n      </ul>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>user_id | phones\n--------|----------------\n1       | 017..., 018...</code></pre>\n      </div>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>user_id | phone\n--------|---------\n1       | 017...\n1       | 018...</code></pre>\n      </div>\n      <p>অর্থাৎ একটি column-এর প্রতিটি cell-এ atomic value থাকা উচিত।</p>\n    "
  },
  {
    "id": "db-12",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "2NF",
      "Normalization"
    ],
    "question": "2NF কী?",
    "answer": "\n      <h4>2NF-এর জন্য:</h4>\n      <ol>\n        <li>Table অবশ্যই 1NF-এ থাকতে হবে।</li>\n        <li>Non-key attribute পুরো composite key-এর উপর depend করতে হবে।</li>\n      </ol>\n      <p>Partial dependency থাকতে পারবে না।</p>\n      <p>এটি বিশেষ করে composite primary key-এর ক্ষেত্রে গুরুত্বপূর্ণ।</p>\n      <h4>যদি:</h4>\n      <p>(order_id, product_id)</p>\n      <p>হয় primary key এবং product_name শুধু product_id-এর উপর depend করে, তাহলে product information আলাদা product table-এ রাখা উচিত।</p>\n    "
  },
  {
    "id": "db-13",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "3NF",
      "Normalization"
    ],
    "question": "3NF কী?",
    "answer": "\n      <h4>3NF-এর জন্য:</h4>\n      <ul>\n        <li>Table 2NF-এ থাকতে হবে</li>\n        <li>Transitive dependency avoid করতে হবে</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>employee_id\ndepartment_id\ndepartment_name</code></pre>\n      </div>\n      <h4>এখানে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>employee_id\n   ↓\ndepartment_id\n   ↓\ndepartment_name</code></pre>\n      </div>\n      <p>department_name employee_id-এর direct property নয়।</p>\n      <h4>Better:</h4>\n      <p>employees<br>- employee_id<br>- department_id</p>\n      <p>departments<br>- department_id<br>- department_name</p>\n    "
  },
  {
    "id": "db-14",
    "category": "Database",
    "difficulty": "Important",
    "tags": [
      "Denormalization",
      "Performance"
    ],
    "question": "Denormalization কী এবং কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Denormalization হলো performance বা read efficiency-এর জন্য intentionally কিছু redundant data রাখা।</p>\n      <h4>Normalized:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order\n ↓\nCustomer\n ↓\nAddress</code></pre>\n      </div>\n      <p>অনেক join লাগতে পারে।</p>\n      <h4>Denormalized:</h4>\n      <p>Order<br> ├── customer_name<br> ├── customer_phone<br> └── shipping_address</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Faster reads</li>\n        <li>Fewer joins</li>\n        <li>Better reporting performance</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>Duplicate data</li>\n        <li>More complex updates</li>\n        <li>Consistency risk</li>\n      </ul>\n      <p>High-read system বা reporting workload-এ carefully ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "db-15",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "SELECT",
      "Query"
    ],
    "question": "SQL SELECT কী?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT database থেকে data retrieve করার জন্য ব্যবহৃত হয়।</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT id, name, email\nFROM users;</code></pre>\n      </div>\n      <h4>Specific condition:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM users\nWHERE status = 'active';</code></pre>\n      </div>\n      <p>SQL query সাধারণত declarative।</p>\n      <p>আপনি কী result চান তা বলেন; database optimizer execution plan তৈরি করে।</p>\n    "
  },
  {
    "id": "db-16",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "WHERE",
      "Filtering"
    ],
    "question": "WHERE এবং HAVING-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>WHERE individual rows filter করে।</p>\n      <p>HAVING grouped result filter করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT department_id, COUNT(*)\nFROM employees\nWHERE status = 'active'\nGROUP BY department_id\nHAVING COUNT(*) &gt; 10;</code></pre>\n      </div>\n      <h4>Execution concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>FROM\n ↓\nWHERE\n ↓\nGROUP BY\n ↓\nHAVING\n ↓\nSELECT\n ↓\nORDER BY\n ↓\nLIMIT</code></pre>\n      </div>\n      <p>WHERE aggregation-এর আগে filter করে।</p>\n      <p>HAVING aggregation-এর পরে filter করে।</p>\n    "
  },
  {
    "id": "db-17",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "GROUP BY",
      "Aggregation"
    ],
    "question": "GROUP BY কী?",
    "answer": "\n      <p>GROUP BY একই ধরনের value অনুযায়ী rows group করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT department_id, COUNT(*)\nFROM employees\nGROUP BY department_id;</code></pre>\n      </div>\n      <h4>Result:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>department_id | count\n--------------|------\n1             | 20\n2             | 15\n3             | 30</code></pre>\n      </div>\n      <h4>Common aggregate functions:</h4>\n      <ul>\n        <li>COUNT()</li>\n        <li>SUM()</li>\n        <li>AVG()</li>\n        <li>MIN()</li>\n        <li>MAX()</li>\n      </ul>\n    "
  },
  {
    "id": "db-18",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "JOIN",
      "SQL"
    ],
    "question": "SQL JOIN কী?",
    "answer": "\n      <p>JOIN multiple table-এর related data combine করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users\norders</code></pre>\n      </div>\n      <p>users.id = orders.user_id</p>\n      <h4>Common JOIN:</h4>\n      <ul>\n        <li>INNER JOIN</li>\n        <li>LEFT JOIN</li>\n        <li>RIGHT JOIN</li>\n        <li>FULL OUTER JOIN</li>\n        <li>CROSS JOIN</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT users.name, orders.total\nFROM users\nINNER JOIN orders\nON users.id = orders.user_id;</code></pre>\n      </div>\n      <p>JOIN database design এবং interview-এর সবচেয়ে গুরুত্বপূর্ণ SQL topics-এর একটি।</p>\n    "
  },
  {
    "id": "db-19",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "INNER JOIN"
    ],
    "question": "INNER JOIN কী?",
    "answer": "\n      <p>INNER JOIN দুই table-এর matching rows return করে।</p>\n      <h4>Users:</h4>\n      <p>1 A<br>2 B</p>\n      <h4>Orders:</h4>\n      <p>user_id = 1</p>\n      <p>INNER JOIN করলে শুধু A-এর order result পাওয়া যাবে।</p>\n      <h4>অর্থাৎ:</h4>\n      <p>A → match<br>B → no match → বাদ</p>\n      <p>যখন দুই side-এই matching data দরকার তখন INNER JOIN ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "db-20",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "LEFT JOIN"
    ],
    "question": "LEFT JOIN কী?",
    "answer": "\n      <p>LEFT JOIN left table-এর সব row রাখে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users\nLEFT JOIN orders</code></pre>\n      </div>\n      <p>যে user-এর order নেই তার order columns NULL হবে।</p>\n      <h4>এটি useful:</h4>\n      <p>\"সব user এবং তাদের order থাকলে order দেখাও\"</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT u.name, o.id\nFROM users u\nLEFT JOIN orders o\nON u.id = o.user_id;</code></pre>\n      </div>\n    "
  },
  {
    "id": "db-21",
    "category": "SQL",
    "difficulty": "Important",
    "tags": [
      "RIGHT JOIN",
      "FULL JOIN"
    ],
    "question": "RIGHT JOIN এবং FULL OUTER JOIN কী?",
    "answer": "\n      <p>RIGHT JOIN right table-এর সব row রাখে।</p>\n      <p>FULL OUTER JOIN দুই table-এর সব row রাখে এবং match না হলে missing side NULL হয়।</p>\n      <p>তবে সব database একইভাবে FULL OUTER JOIN support করে না।</p>\n      <p>MySQL-এ FULL OUTER JOIN nativeভাবে নেই; UNION দিয়ে equivalent result তৈরি করা যায়।</p>\n      <p>Practical application-এ INNER এবং LEFT JOIN সবচেয়ে বেশি ব্যবহৃত হয়।</p>\n    "
  },
  {
    "id": "db-22",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "Subquery",
      "SQL"
    ],
    "question": "Subquery কী?",
    "answer": "\n      <p>একটি SQL query-এর ভিতরে আরেকটি query থাকলে সেটি subquery।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM employees\nWHERE salary &gt; (\n  SELECT AVG(salary)\n  FROM employees\n);</code></pre>\n      </div>\n      <h4>Inner query:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT AVG(salary)</code></pre>\n      </div>\n      <h4>Outer query:</h4>\n      <p>salary &gt; average</p>\n      <p>Subquery SELECT, WHERE, FROM ইত্যাদি জায়গায় ব্যবহার হতে পারে।</p>\n    "
  },
  {
    "id": "db-23",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "CTE",
      "WITH"
    ],
    "question": "CTE কী?",
    "answer": "\n      <p>CTE = Common Table Expression।</p>\n      <p>WITH clause ব্যবহার করে temporary named result তৈরি করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>WITH active_users AS (\n  SELECT *\n  FROM users\n  WHERE status = 'active'\n)\nSELECT *\nFROM active_users;</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Readability</li>\n        <li>Complex query simplify</li>\n        <li>Recursive query support</li>\n        <li>Query organization</li>\n      </ul>\n      <p>Complex reporting query-তে CTE খুব useful।</p>\n    "
  },
  {
    "id": "db-24",
    "category": "SQL",
    "difficulty": "Important",
    "tags": [
      "Window Function",
      "SQL"
    ],
    "question": "Window Function কী?",
    "answer": "\n      <p>Window function rows collapse না করে related rows-এর উপর calculation করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ROW_NUMBER()\nRANK()\nDENSE_RANK()\nSUM() OVER()\nAVG() OVER()</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT\n  employee_id,\n  department_id,\n  salary,\n  RANK() OVER(\n    PARTITION BY department_id\n    ORDER BY salary DESC\n  ) AS rank\nFROM employees;</code></pre>\n      </div>\n      <p>এটি প্রতি department-এর salary ranking করতে পারে।</p>\n    "
  },
  {
    "id": "db-25",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "UNION",
      "UNION ALL"
    ],
    "question": "UNION এবং UNION ALL-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>UNION duplicate rows remove করে।</p>\n      <p>UNION ALL duplicate rows remove করে না।</p>\n      <p>তাই UNION ALL সাধারণত faster কারণ duplicate elimination করতে হয় না।</p>\n      <h4>যদি duplicate intentionally valid হয় এবং শুধু combine করতে চান:</h4>\n      <p>UNION ALL</p>\n      <p>ব্যবহার করা ভালো।</p>\n    "
  },
  {
    "id": "db-26",
    "category": "SQL",
    "difficulty": "Important",
    "tags": [
      "NULL",
      "SQL"
    ],
    "question": "SQL NULL কী এবং কেন এটি tricky?",
    "answer": "\n      <p>NULL মানে unknown বা missing value।</p>\n      <h4>NULL:</h4>\n      <p>0 নয়<br>empty string নয়<br>false নয়</p>\n      <h4>তাই:</h4>\n      <p>WHERE column = NULL</p>\n      <p>সঠিক নয়।</p>\n      <h4>ব্যবহার করতে হবে:</h4>\n      <p>WHERE column IS NULL</p>\n      <h4>অথবা:</h4>\n      <p>WHERE column IS NOT NULL</p>\n      <h4>NULL-এর কারণে three-valued logic তৈরি হয়:</h4>\n      <p>TRUE<br>FALSE<br>UNKNOWN</p>\n      <p>Interview-এ এটি খুব common প্রশ্ন।</p>\n    "
  },
  {
    "id": "db-27",
    "category": "SQL",
    "difficulty": "Very Important",
    "tags": [
      "DELETE",
      "TRUNCATE",
      "DROP"
    ],
    "question": "DELETE, TRUNCATE এবং DROP-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>DELETE:</h4>\n      <p>Table-এর selected rows delete করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>DELETE FROM users\nWHERE id = 10;</code></pre>\n      </div>\n      <h4>TRUNCATE:</h4>\n      <p>Table-এর সব rows দ্রুত remove করে এবং সাধারণত table structure রাখে।</p>\n      <p>TRUNCATE TABLE users;</p>\n      <h4>DROP:</h4>\n      <p>Table structure-সহ object remove করে।</p>\n      <p>DROP TABLE users;</p>\n      <h4>সাধারণভাবে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>DELETE → rows\nTRUNCATE → all rows\nDROP → table/object</code></pre>\n      </div>\n    "
  },
  {
    "id": "db-28",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Index",
      "Performance"
    ],
    "question": "Database Index কী?",
    "answer": "\n      <p>Index হলো database-এর data retrieval দ্রুত করার জন্য তৈরি করা auxiliary data structure।</p>\n      <h4>Without index:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nScan many rows\n ↓\nFind matching row</code></pre>\n      </div>\n      <h4>With index:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nIndex lookup\n ↓\nRelevant row/location\n ↓\nData</code></pre>\n      </div>\n      <p>Index সাধারণত read performance বাড়ায়।</p>\n      <h4>কিন্তু trade-off:</h4>\n      <ul>\n        <li>Extra disk space</li>\n        <li>INSERT slower</li>\n        <li>UPDATE slower</li>\n        <li>DELETE maintenance cost</li>\n      </ul>\n      <p>তাই সব column-এ index দেওয়া উচিত নয়।</p>\n    "
  },
  {
    "id": "db-29",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "B-Tree",
      "Index"
    ],
    "question": "B-Tree/B+Tree Index কী?",
    "answer": "\n      <p>Relational database-এ B-Tree family index খুব common।</p>\n      <p>এটি balanced tree structure ব্যবহার করে efficient search করতে সাহায্য করে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Root\n            /              Node   Node\n         /      /         Leaf Leaf Leaf Leaf</code></pre>\n      </div>\n      <p>B+Tree-তে data references leaf level-এ সংগঠিত থাকে এবং leaf nodes linked থাকতে পারে।</p>\n      <h4>এটি efficient:</h4>\n      <ul>\n        <li>Equality search</li>\n        <li>Range search</li>\n        <li>ORDER BY</li>\n        <li>Prefix-related operations</li>\n      </ul>\n      <h4>যেমন:</h4>\n      <p>WHERE age BETWEEN 20 AND 30</p>\n      <p>Index range scan করতে পারে।</p>\n    "
  },
  {
    "id": "db-30",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Clustered Index",
      "Primary Key"
    ],
    "question": "Clustered Index কী?",
    "answer": "\n      <p>Clustered index table-এর data storage/order-এর সাথে closely associated।</p>\n      <p>InnoDB/MySQL-এ primary key clustered index হিসেবে ব্যবহৃত হয়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Primary Key\n ↓\nClustered Index\n ↓\nRow data</code></pre>\n      </div>\n      <p>তাই primary key নির্বাচন গুরুত্বপূর্ণ।</p>\n      <p>একটি table-এর clustered storage order একটিই হতে পারে।</p>\n    "
  },
  {
    "id": "db-31",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Secondary Index",
      "Non-Clustered"
    ],
    "question": "Secondary/Non-Clustered Index কী?",
    "answer": "\n      <p>Primary/clustered index ছাড়া অন্য column-এর উপর তৈরি index secondary index।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>CREATE INDEX idx_users_email\nON users(email);</code></pre>\n      </div>\n      <h4>Query:</h4>\n      <p>WHERE email = 'a@test.com'</p>\n      <p>এই index ব্যবহার করতে পারে।</p>\n      <p>In clustered-storage systems, secondary index থেকে matching primary key/row locator পাওয়া যায় এবং পরে actual row fetch হতে পারে।</p>\n    "
  },
  {
    "id": "db-32",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Composite Index"
    ],
    "question": "Composite Index কী?",
    "answer": "\n      <p>একাধিক column নিয়ে তৈরি index হলো composite index।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>CREATE INDEX idx_orders_user_status\nON orders(user_id, status);</code></pre>\n      </div>\n      <h4>এটি useful হতে পারে:</h4>\n      <p>WHERE user_id = ?<br>AND status = ?</p>\n      <p>Index order গুরুত্বপূর্ণ।</p>\n      <h4>Index:</h4>\n      <p>(user_id, status)</p>\n      <p>সাধারণত user_id দিয়ে filtering-এর ক্ষেত্রে ব্যবহারযোগ্য, কিন্তু শুধু status দিয়ে query করলে একই index সবসময় efficient হবে না।</p>\n      <p>এটিকে leftmost-prefix principle-এর সাথে relate করা হয়।</p>\n    "
  },
  {
    "id": "db-33",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Covering Index"
    ],
    "question": "Covering Index কী?",
    "answer": "\n      <p>যখন query-এর প্রয়োজনীয় columns index-এর মধ্যেই পাওয়া যায় এবং table row-তে আলাদা lookup করতে হয় না, তখন index query cover করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>INDEX(user_id, status, created_at)</code></pre>\n      </div>\n      <h4>Query:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT user_id, status, created_at\nFROM orders\nWHERE user_id = 10;</code></pre>\n      </div>\n      <p>Index থেকেই প্রয়োজনীয় data পাওয়া যেতে পারে।</p>\n      <p>এতে table lookup কমে performance improve হতে পারে।</p>\n    "
  },
  {
    "id": "db-34",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Query Optimization",
      "EXPLAIN"
    ],
    "question": "EXPLAIN কী?",
    "answer": "\n      <p>EXPLAIN query optimizer কীভাবে query execute করতে চায় তা দেখায়।</p>\n      <h4>এতে দেখা যেতে পারে:</h4>\n      <ul>\n        <li>Access type</li>\n        <li>Possible indexes</li>\n        <li>Chosen index</li>\n        <li>Estimated rows</li>\n        <li>Join strategy</li>\n        <li>Extra operations</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>EXPLAIN\nSELECT *\nFROM orders\nWHERE user_id = 10;</code></pre>\n      </div>\n      <p>Performance debugging-এর জন্য EXPLAIN অত্যন্ত গুরুত্বপূর্ণ।</p>\n      <p>Actual runtime behavior বুঝতে database-specific EXPLAIN ANALYZE-ও useful হতে পারে।</p>\n    "
  },
  {
    "id": "db-35",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "SARGable",
      "Performance"
    ],
    "question": "SARGable query কী?",
    "answer": "\n      <p>SARGable query এমন query যেখানে database index efficiently ব্যবহার করতে পারে।</p>\n      <h4>Bad:</h4>\n      <p>WHERE YEAR(created_at) = 2026</p>\n      <p>কারণ column-এর উপর function প্রয়োগ করা হয়েছে।</p>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>WHERE created_at &gt;= '2026-01-01'\nAND created_at &lt; '2027-01-01'</code></pre>\n      </div>\n      <p>এতে index range scan-এর সুযোগ বেশি থাকে।</p>\n      <p>Performance tuning-এ function-on-column, implicit conversion এবং leading wildcard-এর মতো patterns খেয়াল করতে হয়।</p>\n    "
  },
  {
    "id": "db-36",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Transaction",
      "ACID"
    ],
    "question": "Database Transaction কী?",
    "answer": "\n      <p>Transaction হলো এক বা একাধিক database operation-এর logical unit।</p>\n      <h4>Example:</h4>\n      <h4>Transfer:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Account A\n ↓\n-1000</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Account B\n ↓\n+1000</code></pre>\n      </div>\n      <p>দুটো operation সফল হলে COMMIT।</p>\n      <p>কোনো operation fail হলে ROLLBACK।</p>\n      <h4>Goal:</h4>\n      <p>একটি consistent business operation হিসেবে changes handle করা।</p>\n    "
  },
  {
    "id": "db-37",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "ACID"
    ],
    "question": "ACID কী?",
    "answer": "\n      <h4>ACID:</h4>\n      <p>A = Atomicity<br>C = Consistency<br>I = Isolation<br>D = Durability</p>\n      <p><strong>Atomicity:</strong><br>সব operation হবে অথবা কিছুই হবে না।</p>\n      <p><strong>Consistency:</strong><br>Transaction database constraints/invariants maintain করবে।</p>\n      <p><strong>Isolation:</strong><br>Concurrent transaction একে অন্যের intermediate state থেকে appropriately isolated থাকবে।</p>\n      <p><strong>Durability:</strong><br>Commit হওয়ার পরে data crash-এর পরেও recoverable থাকবে।</p>\n      <p>Banking/payment system-এ ACID অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-38",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Commit",
      "Rollback"
    ],
    "question": "COMMIT এবং ROLLBACK কী?",
    "answer": "\n      <h4>COMMIT:</h4>\n      <p>Transaction-এর changes permanently commit করে।</p>\n      <h4>ROLLBACK:</h4>\n      <p>Transaction-এর uncommitted changes undo করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>BEGIN;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>UPDATE accounts\nSET balance = balance - 1000\nWHERE id = 1;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>UPDATE accounts\nSET balance = balance + 1000\nWHERE id = 2;</code></pre>\n      </div>\n      <p>COMMIT;</p>\n      <h4>কোনো error হলে:</h4>\n      <p>ROLLBACK;</p>\n      <p>Transaction boundary carefully design করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-39",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Isolation Level",
      "Concurrency"
    ],
    "question": "Transaction Isolation Level কী?",
    "answer": "\n      <p>Isolation level concurrent transactions-এর মধ্যে visibility/interaction control করে।</p>\n      <h4>Common levels:</h4>\n      <ol>\n        <li>READ UNCOMMITTED</li>\n        <li>READ COMMITTED</li>\n        <li>REPEATABLE READ</li>\n        <li>SERIALIZABLE</li>\n      </ol>\n      <p>Higher isolation সাধারণত consistency বাড়ায় কিন্তু concurrency/performance cost বাড়াতে পারে।</p>\n      <h4>Common anomalies:</h4>\n      <ul>\n        <li>Dirty Read</li>\n        <li>Non-repeatable Read</li>\n        <li>Phantom Read</li>\n      </ul>\n      <p>Database-specific implementation ভিন্ন হতে পারে।</p>\n    "
  },
  {
    "id": "db-40",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Dirty Read",
      "Concurrency"
    ],
    "question": "Dirty Read কী?",
    "answer": "\n      <p>একটি transaction অন্য transaction-এর uncommitted data read করলে dirty read হয়।</p>\n      <h4>Transaction A:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>UPDATE balance = 5000\nকিন্তু এখনও COMMIT করেনি।</code></pre>\n      </div>\n      <h4>Transaction B:</h4>\n      <p>balance = 5000 read করল।</p>\n      <p>তারপর A rollback করল।</p>\n      <p>তাহলে B এমন data read করেছে যা কখনো committed হয়নি।</p>\n      <p>এটাই dirty read।</p>\n    "
  },
  {
    "id": "db-41",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Non-repeatable Read",
      "Concurrency"
    ],
    "question": "Non-repeatable Read কী?",
    "answer": "\n      <p>একই transaction-এ একই row দুইবার read করে দুইবার different value পাওয়া গেলে non-repeatable read হতে পারে।</p>\n      <h4>Transaction A:</h4>\n      <p>Read balance = 1000</p>\n      <h4>Transaction B:</h4>\n      <p>Update balance = 2000<br>Commit</p>\n      <h4>Transaction A:</h4>\n      <p>Read balance = 2000</p>\n      <p>একই transaction-এর মধ্যে একই row-এর value পরিবর্তিত হয়েছে।</p>\n    "
  },
  {
    "id": "db-42",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Phantom Read",
      "Concurrency"
    ],
    "question": "Phantom Read কী?",
    "answer": "\n      <p>একই query পুনরায় execute করলে নতুন matching rows দেখা গেলে phantom read।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT COUNT(*)\nFROM orders\nWHERE amount &gt; 1000;</code></pre>\n      </div>\n      <p>প্রথমে 10 rows।</p>\n      <p>অন্য transaction নতুন matching order insert করল।</p>\n      <p>পুনরায় query করলে 11 rows।</p>\n      <p>নতুন row-টি phantom row হিসেবে দেখা যায়।</p>\n    "
  },
  {
    "id": "db-43",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "MVCC",
      "Concurrency"
    ],
    "question": "MVCC কী?",
    "answer": "\n      <p>MVCC = Multi-Version Concurrency Control।</p>\n      <p>Database একই data-এর multiple versions ব্যবহার করে concurrent reads/writes manage করতে পারে।</p>\n      <h4>Concept:</h4>\n      <p>Transaction A → Version 1<br>Transaction B → Version 2</p>\n      <p>এতে অনেক ক্ষেত্রে reader এবং writer একে অপরকে কম block করে।</p>\n      <p>PostgreSQL এবং InnoDB-style systems MVCC ব্যবহার করে।</p>\n      <p>MVCC-এর details database engine-specific।</p>\n    "
  },
  {
    "id": "db-44",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Locking",
      "Concurrency"
    ],
    "question": "Database Lock কী?",
    "answer": "\n      <p>Lock concurrent transaction-এর access control করতে ব্যবহৃত হয়।</p>\n      <h4>Common:</h4>\n      <ul>\n        <li>Shared lock</li>\n        <li>Exclusive lock</li>\n        <li>Row lock</li>\n        <li>Table lock</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM accounts\nWHERE id = 1\nFOR UPDATE;</code></pre>\n      </div>\n      <p>এটি row-level locking-এর জন্য ব্যবহৃত হতে পারে।</p>\n      <p>Payment/order/inventory system-এ locking গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-45",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Pessimistic Locking"
    ],
    "question": "Pessimistic Locking কী?",
    "answer": "\n      <p>Pessimistic locking ধরে নেয় যে conflict হওয়ার সম্ভাবনা আছে।</p>\n      <p>তাই আগে থেকেই lock নেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT stock\nFROM products\nWHERE id = 10\nFOR UPDATE;</code></pre>\n      </div>\n      <p>তারপর stock update করা হয়।</p>\n      <h4>Useful:</h4>\n      <ul>\n        <li>Inventory</li>\n        <li>Financial transactions</li>\n        <li>Highly contended rows</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>Lock contention</li>\n        <li>Deadlock possibility</li>\n        <li>Reduced concurrency</li>\n      </ul>\n    "
  },
  {
    "id": "db-46",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Optimistic Locking"
    ],
    "question": "Optimistic Locking কী?",
    "answer": "\n      <p>Optimistic locking ধরে নেয় conflict কম হবে।</p>\n      <p>Row-তে version রাখা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>id | stock | version\n---|-------|--------\n10 | 20    | 5</code></pre>\n      </div>\n      <h4>Update:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>UPDATE products\nSET stock = 19,\n    version = 6\nWHERE id = 10\nAND version = 5;</code></pre>\n      </div>\n      <p>যদি affected rows = 0 হয়, তাহলে অন্য কেউ আগে update করেছে।</p>\n      <p>এতে explicit database lock কম লাগে।</p>\n    "
  },
  {
    "id": "db-47",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Deadlock",
      "Concurrency"
    ],
    "question": "Database Deadlock কী?",
    "answer": "\n      <p>দুই বা তার বেশি transaction একে অপরের lock release-এর জন্য অপেক্ষা করলে deadlock হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Transaction A:\nLock Row 1\n ↓\nWait Row 2</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Transaction B:\nLock Row 2\n ↓\nWait Row 1</code></pre>\n      </div>\n      <p>A waits for B<br>B waits for A</p>\n      <p>এটাই deadlock।</p>\n      <h4>Prevent:</h4>\n      <ul>\n        <li>Consistent lock ordering</li>\n        <li>Short transactions</li>\n        <li>Proper indexes</li>\n        <li>Avoid unnecessary locks</li>\n        <li>Retry after deadlock detection</li>\n      </ul>\n    "
  },
  {
    "id": "db-48",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Connection Pool",
      "Performance"
    ],
    "question": "Database Connection Pool কী?",
    "answer": "\n      <p>Application প্রতিবার নতুন DB connection না খুলে reusable connection pool ব্যবহার করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n ↓\nConnection Pool\n ├── Conn 1\n ├── Conn 2\n ├── Conn 3\n └── Conn N\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Lower connection overhead</li>\n        <li>Better throughput</li>\n        <li>Connection count control</li>\n      </ul>\n      <p>Pool size খুব বড় করলেই performance বাড়বে না।</p>\n      <p>Database-এর CPU, workload এবং maximum connection capacity অনুযায়ী tune করতে হয়।</p>\n    "
  },
  {
    "id": "db-49",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Buffer Pool",
      "InnoDB",
      "Internals"
    ],
    "question": "Database Buffer Pool কী?",
    "answer": "\n      <p>Buffer pool হলো memory area যেখানে database frequently accessed data/index pages cache করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nBuffer Pool\n ├── Page found → Memory থেকে read\n └── Page missing\n       ↓\n      Disk\n       ↓\n  Buffer Pool\n       ↓\n      Query</code></pre>\n      </div>\n      <p>Memory থেকে read disk-এর চেয়ে অনেক faster।</p>\n      <p>InnoDB-তে buffer pool অত্যন্ত গুরুত্বপূর্ণ performance component।</p>\n    "
  },
  {
    "id": "db-50",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Redo Log",
      "WAL",
      "Durability"
    ],
    "question": "Redo Log/WAL কী?",
    "answer": "\n      <p>Database durability এবং crash recovery-এর জন্য log-based mechanism ব্যবহার করে।</p>\n      <h4>Simplified flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n ↓\nTransaction\n ↓\nMemory/Buffer\n ↓\nRedo Log / WAL\n ↓\nCommit\n ↓\nDisk pages later flushed</code></pre>\n      </div>\n      <p>Crash হলে database log ব্যবহার করে committed changes recover করতে পারে।</p>\n      <p>MySQL InnoDB-তে Redo Log এবং PostgreSQL-এ WAL গুরুত্বপূর্ণ concepts।</p>\n    "
  },
  {
    "id": "db-51",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Write-Ahead Logging",
      "WAL"
    ],
    "question": "WAL কী?",
    "answer": "\n      <p>WAL = Write-Ahead Logging।</p>\n      <h4>মূল ধারণা:</h4>\n      <p>Data page disk-এ পরিবর্তন করার আগে corresponding log record durable করতে হবে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Change\n ↓\nWAL\n ↓\nDurable\n ↓\nData Page</code></pre>\n      </div>\n      <p>Crash হলে WAL replay করে database recovery করতে পারে।</p>\n      <p>PostgreSQL-এর architecture বুঝতে WAL খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-52",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Checkpoint",
      "Recovery"
    ],
    "question": "Database Checkpoint কী?",
    "answer": "\n      <p>Checkpoint হলো recovery process সহজ করার জন্য database-এর dirty pages/log state-এর একটি consistent progress point তৈরি করা।</p>\n      <h4>Crash recovery:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Last checkpoint\n ↓\nReplay necessary logs\n ↓\nRecover database</code></pre>\n      </div>\n      <p>Checkpoint frequency performance এবং recovery time-এর মধ্যে trade-off তৈরি করে।</p>\n    "
  },
  {
    "id": "db-53",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Performance",
      "N+1"
    ],
    "question": "N+1 Query Problem কী?",
    "answer": "\n      <p>প্রথমে 1টি query করে parent records আনা হয়, তারপর প্রতিটি parent-এর জন্য আলাদা query করা হলে N+1 problem হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1 query:\nSELECT * FROM users;</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n      <p>User 1 → orders query<br>User 2 → orders query<br>User 3 → orders query<br>...<br>User N → orders query</p>\n      <h4>Total:</h4>\n      <p>1 + N queries</p>\n      <h4>Solution:</h4>\n      <ul>\n        <li>JOIN</li>\n        <li>Batch query</li>\n        <li>Eager loading</li>\n        <li>DataLoader pattern</li>\n        <li>Proper aggregation</li>\n      </ul>\n      <p>ORM ব্যবহার করার সময় N+1 বিশেষভাবে খেয়াল করতে হয়।</p>\n    "
  },
  {
    "id": "db-54",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Slow Query",
      "Optimization"
    ],
    "question": "একটি SQL query slow হলে কীভাবে optimize করবেন?",
    "answer": "\n      <h4>Step-by-step:</h4>\n      <ol>\n        <li>Query identify করুন</li>\n        <li>Execution time measure করুন</li>\n        <li>EXPLAIN/EXPLAIN ANALYZE করুন</li>\n        <li>Index usage check করুন</li>\n        <li>Full table scan আছে কি দেখুন</li>\n        <li>Join condition check করুন</li>\n        <li>Returned rows কমান</li>\n        <li>SELECT * avoid করুন</li>\n        <li>Query structure optimize করুন</li>\n        <li>Data distribution/statistics check করুন</li>\n      </ol>\n      <h4>তারপর:</h4>\n      <ul>\n        <li>Proper index</li>\n        <li>Composite index</li>\n        <li>Query rewrite</li>\n        <li>Pagination</li>\n        <li>Pre-aggregation</li>\n        <li>Cache</li>\n      </ul>\n      <p>ব্যবহার করা যায়।</p>\n      <p>Blindly index add করা উচিত নয়।</p>\n    "
  },
  {
    "id": "db-55",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Pagination",
      "Performance"
    ],
    "question": "OFFSET pagination এবং Cursor pagination-এর পার্থক্য কী?",
    "answer": "\n      <h4>OFFSET:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM products\nORDER BY id\nLIMIT 20 OFFSET 100000;</code></pre>\n      </div>\n      <p>Large offset হলে database অনেক row skip করতে পারে।</p>\n      <h4>Cursor:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>WHERE id &gt; last_seen_id\nORDER BY id\nLIMIT 20;</code></pre>\n      </div>\n      <p>Large dataset-এ cursor pagination অনেক সময় বেশি efficient।</p>\n      <p>Cursor pagination high-volume feed/order system-এ useful।</p>\n      <p>তবে cursor design-এর জন্য stable ordering এবং unique tie-breaker দরকার।</p>\n    "
  },
  {
    "id": "db-56",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Read Replica",
      "Scaling"
    ],
    "question": "Read Replica কী?",
    "answer": "\n      <p>Primary database write handle করে এবং replica read traffic serve করতে পারে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n   ↓\nPrimary\n ├── Write\n └── Replication\n       ↓\n   Replica 1\n   Replica 2\n       ↓\n     Reads</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Read scaling</li>\n        <li>Reporting isolation</li>\n        <li>Reduced primary load</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <p>Replication lag থাকতে পারে।</p>\n      <p>তাই immediately-after-write read-এর consistency requirement বুঝতে হবে।</p>\n    "
  },
  {
    "id": "db-57",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Replication",
      "High Availability"
    ],
    "question": "Database Replication কী?",
    "answer": "\n      <p>এক database-এর data অন্য database node-এ replicate করা হলো replication।</p>\n      <h4>Possible models:</h4>\n      <ul>\n        <li>Primary/Replica</li>\n        <li>Synchronous</li>\n        <li>Asynchronous</li>\n        <li>Multi-primary</li>\n      </ul>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>High availability</li>\n        <li>Read scaling</li>\n        <li>Disaster recovery</li>\n        <li>Geographic distribution</li>\n      </ul>\n      <p>Asynchronous replication-এ replication lag হতে পারে।</p>\n    "
  },
  {
    "id": "db-58",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Replication Lag",
      "Distributed Systems"
    ],
    "question": "Replication Lag কী?",
    "answer": "\n      <p>Primary database-এর নতুন data replica-তে পৌঁছাতে সময় লাগলে replication lag হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Primary:\nOrder #100 created</code></pre>\n      </div>\n      <p><strong>Replica:</strong><br>কিছু milliseconds/seconds পরে #100 দেখতে পাচ্ছে।</p>\n      <p>যদি application immediately replica থেকে read করে, stale data পেতে পারে।</p>\n      <h4>Solution:</h4>\n      <ul>\n        <li>Read from primary where strong consistency needed</li>\n        <li>Lag monitoring</li>\n        <li>Routing strategy</li>\n        <li>Session consistency strategy</li>\n      </ul>\n    "
  },
  {
    "id": "db-59",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Sharding",
      "Scaling"
    ],
    "question": "Database Sharding কী?",
    "answer": "\n      <p>Sharding হলো data horizontally multiple database node-এ distribute করা।</p>\n      <h4>Example:</h4>\n      <h4>Users:</h4>\n      <p>Shard 1 → user_id 1-1M<br>Shard 2 → user_id 1M-2M<br>Shard 3 → user_id 2M-3M</p>\n      <h4>অথবা hash-based:</h4>\n      <p>hash(user_id) → shard</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Massive scale</li>\n        <li>Storage distribution</li>\n        <li>Write scaling</li>\n      </ul>\n      <h4>Challenges:</h4>\n      <ul>\n        <li>Cross-shard query</li>\n        <li>Cross-shard transaction</li>\n        <li>Rebalancing</li>\n        <li>Hot shard</li>\n        <li>Complex operations</li>\n      </ul>\n      <p>Sharding প্রয়োজনের আগে simpler scaling techniques শেষ করা উচিত।</p>\n    "
  },
  {
    "id": "db-60",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Partitioning",
      "Scaling"
    ],
    "question": "Database Partitioning কী?",
    "answer": "\n      <p>একটি logical table-এর data database-এর ভিতর multiple partitions-এ ভাগ করা হলে partitioning।</p>\n      <h4>Common:</h4>\n      <ul>\n        <li>Range partitioning</li>\n        <li>List partitioning</li>\n        <li>Hash partitioning</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>orders_2025\norders_2026</code></pre>\n      </div>\n      <p>Date-based partitioning large time-series/order table-এ useful হতে পারে।</p>\n      <p>Partition pruning query performance improve করতে পারে।</p>\n    "
  },
  {
    "id": "db-61",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Horizontal Scaling",
      "Vertical Scaling"
    ],
    "question": "Vertical Scaling এবং Horizontal Scaling কী?",
    "answer": "\n      <h4>Vertical scaling:</h4>\n      <p>একই server-এর resource বাড়ানো।</p>\n      <p>CPU ↑<br>RAM ↑<br>Storage ↑</p>\n      <h4>Horizontal scaling:</h4>\n      <p>Multiple server/node যোগ করা।</p>\n      <p>Node 1<br>Node 2<br>Node 3</p>\n      <h4>Database:</h4>\n      <p><strong>Vertical:</strong><br>Bigger DB server</p>\n      <p><strong>Horizontal:</strong><br>Replication / Sharding / Distributed DB</p>\n      <p>Vertical scaling সহজ।</p>\n      <p>Horizontal scaling বেশি complex কিন্তু large scale-এর জন্য useful।</p>\n    "
  },
  {
    "id": "db-62",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Backup",
      "Recovery"
    ],
    "question": "Database Backup কী কী ধরনের হতে পারে?",
    "answer": "\n      <h4>Common backup:</h4>\n      <ol>\n        <li>Full Backup</li>\n        <li>Incremental Backup</li>\n        <li>Differential Backup</li>\n        <li>Snapshot</li>\n        <li>Logical Backup</li>\n        <li>Physical Backup</li>\n      </ol>\n      <p><strong>Full:</strong><br>পুরো database।</p>\n      <p><strong>Incremental:</strong><br>শেষ backup-এর পরের changes।</p>\n      <p><strong>Differential:</strong><br>শেষ full backup-এর পরের changes।</p>\n      <p>Production system-এ backup strategy-এর সাথে restore testing-ও জরুরি।</p>\n    "
  },
  {
    "id": "db-63",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "RPO",
      "RTO",
      "Disaster Recovery"
    ],
    "question": "RPO এবং RTO কী?",
    "answer": "\n      <p>RPO = Recovery Point Objective</p>\n      <p>কতটা data loss acceptable?</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>RPO = 5 minutes</code></pre>\n      </div>\n      <p>সর্বোচ্চ প্রায় 5 মিনিটের data loss tolerate করা যেতে পারে।</p>\n      <p>RTO = Recovery Time Objective</p>\n      <p>কত সময়ের মধ্যে service recover করতে হবে?</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>RTO = 30 minutes</code></pre>\n      </div>\n      <p>Service 30 মিনিটের মধ্যে restore করতে হবে।</p>\n      <p>High availability/disaster recovery planning-এ RPO এবং RTO গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-64",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "SQL Injection",
      "Security"
    ],
    "question": "SQL Injection কী?",
    "answer": "\n      <p>User input directly SQL query-এর মধ্যে concatenate করলে attacker malicious SQL inject করতে পারে।</p>\n      <h4>Bad:</h4>\n      <p>\"SELECT * FROM users WHERE email = '\" + email + \"'\"</p>\n      <p>Attacker malicious input দিয়ে query structure পরিবর্তন করতে পারে।</p>\n      <h4>Protection:</h4>\n      <ul>\n        <li>Parameterized queries</li>\n        <li>Prepared statements</li>\n        <li>ORM parameter binding</li>\n        <li>Input validation</li>\n        <li>Least privilege</li>\n      </ul>\n      <h4>সবচেয়ে গুরুত্বপূর্ণ:</h4>\n      <p>User input কখনো raw SQL string-এর সাথে unsafeভাবে concatenate করবেন না।</p>\n    "
  },
  {
    "id": "db-65",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Database Security",
      "Least Privilege"
    ],
    "question": "Database security-এর গুরুত্বপূর্ণ principles কী?",
    "answer": "\n      <h4>Important:</h4>\n      <ul>\n        <li>Least privilege</li>\n        <li>Strong authentication</li>\n        <li>Encryption in transit</li>\n        <li>Encryption at rest</li>\n        <li>Secret management</li>\n        <li>Network isolation</li>\n        <li>Firewall</li>\n        <li>Audit logging</li>\n        <li>Parameterized queries</li>\n        <li>Backup encryption</li>\n        <li>Rotation of credentials</li>\n      </ul>\n      <p>Application-এর DB user-কে প্রয়োজনের চেয়ে বেশি privilege দেওয়া উচিত নয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Read-only reporting service\n→ SELECT permission</code></pre>\n      </div>\n      <p>Write service<br>→ প্রয়োজনীয় INSERT/UPDATE permission</p>\n    "
  },
  {
    "id": "db-66",
    "category": "SQL",
    "difficulty": "Important",
    "tags": [
      "View"
    ],
    "question": "Database View কী?",
    "answer": "\n      <p>View হলো stored query-এর মতো logical table।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>CREATE VIEW active_users AS\nSELECT id, name\nFROM users\nWHERE status = 'active';</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM active_users;</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Query abstraction</li>\n        <li>Security</li>\n        <li>Reusability</li>\n      </ul>\n      <p>Normal view সাধারণত data physically store করে না; materialized view আলাদা concept।</p>\n    "
  },
  {
    "id": "db-67",
    "category": "Database",
    "difficulty": "Important",
    "tags": [
      "Materialized View",
      "Performance"
    ],
    "question": "Materialized View কী?",
    "answer": "\n      <p>Materialized view query result physically store করে।</p>\n      <h4>Normal View:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nCalculate every time</code></pre>\n      </div>\n      <h4>Materialized View:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nStored result\n ↓\nRead</code></pre>\n      </div>\n      <p>Complex reporting/aggregation workload-এ read performance improve করতে পারে।</p>\n      <h4>Trade-off:</h4>\n      <p>Data refresh করতে হয়।</p>\n      <p>Freshness requirement অনুযায়ী refresh strategy design করতে হয়।</p>\n    "
  },
  {
    "id": "db-68",
    "category": "Database",
    "difficulty": "Important",
    "tags": [
      "Stored Procedure"
    ],
    "question": "Stored Procedure কী?",
    "answer": "\n      <p>Stored procedure হলো database-এর মধ্যে stored executable logic।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Reusable DB-side logic</li>\n        <li>Reduced network round trips in some workloads</li>\n        <li>Centralized DB operations</li>\n      </ul>\n      <h4>কিন্তু অতিরিক্ত business logic database-এ রাখলে:</h4>\n      <ul>\n        <li>Testing complexity</li>\n        <li>Version control complexity</li>\n        <li>Portability issues</li>\n      </ul>\n      <p>তাই application architecture অনুযায়ী সিদ্ধান্ত নিতে হয়।</p>\n    "
  },
  {
    "id": "db-69",
    "category": "Database",
    "difficulty": "Important",
    "tags": [
      "Trigger"
    ],
    "question": "Database Trigger কী?",
    "answer": "\n      <p>Trigger হলো নির্দিষ্ট database event ঘটলে automatically execute হওয়া logic।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>INSERT\nUPDATE\nDELETE</code></pre>\n      </div>\n      <p>এর পর trigger execute হতে পারে।</p>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Audit</li>\n        <li>Derived data</li>\n        <li>Enforcement of certain DB rules</li>\n      </ul>\n      <p>কিন্তু অতিরিক্ত trigger hidden side effects তৈরি করতে পারে।</p>\n      <p>Complex business workflow-এর জন্য application/service layer বা event-driven architecture অনেক সময় বেশি maintainable।</p>\n    "
  },
  {
    "id": "db-70",
    "category": "NoSQL",
    "difficulty": "Very Important",
    "tags": [
      "MongoDB",
      "Document Database"
    ],
    "question": "MongoDB কী?",
    "answer": "\n      <p>MongoDB একটি document-oriented NoSQL database।</p>\n      <p>Data BSON document আকারে store হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"_id\": 1,\n  \"name\": \"Product\",\n  \"price\": 100,\n  \"tags\": [\"a\", \"b\"]\n}</code></pre>\n      </div>\n      <h4>MongoDB useful:</h4>\n      <ul>\n        <li>Flexible schema</li>\n        <li>Document-centric data</li>\n        <li>Rapid development</li>\n        <li>Horizontal scaling</li>\n      </ul>\n      <p>তবে complex relational workload হলে relational database অনেক সময় বেশি natural।</p>\n    "
  },
  {
    "id": "db-71",
    "category": "NoSQL",
    "difficulty": "Very Important",
    "tags": [
      "MongoDB",
      "Embedding"
    ],
    "question": "MongoDB-তে Embedding এবং Referencing কী?",
    "answer": "\n      <h4>Embedding:</h4>\n      <p>Related data একই document-এর ভিতরে রাখা।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  user: {\n    name: \"A\",\n    address: {\n      city: \"Dhaka\"\n    }\n  }\n}</code></pre>\n      </div>\n      <h4>Referencing:</h4>\n      <p>অন্য document-এর ID reference করা।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  user_id: 123\n}</code></pre>\n      </div>\n      <h4>Embedding useful যখন:</h4>\n      <ul>\n        <li>Data frequently together read হয়</li>\n        <li>Relationship bounded</li>\n        <li>Data size manageable</li>\n      </ul>\n      <h4>Referencing useful যখন:</h4>\n      <ul>\n        <li>Data independently managed</li>\n        <li>Large/unbounded relationship</li>\n        <li>Frequent independent updates</li>\n      </ul>\n    "
  },
  {
    "id": "db-72",
    "category": "NoSQL",
    "difficulty": "Very Important",
    "tags": [
      "Redis",
      "Cache"
    ],
    "question": "Redis কী এবং কোথায় ব্যবহার করবেন?",
    "answer": "\n      <p>Redis হলো in-memory data store।</p>\n      <h4>Data structures:</h4>\n      <ul>\n        <li>String</li>\n        <li>Hash</li>\n        <li>List</li>\n        <li>Set</li>\n        <li>Sorted Set</li>\n        <li>Stream</li>\n      </ul>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Cache</li>\n        <li>Session</li>\n        <li>Rate limiting</li>\n        <li>Distributed locks</li>\n        <li>Pub/Sub</li>\n        <li>Counters</li>\n        <li>Queue-related workloads</li>\n      </ul>\n      <p>Redis fast কারণ primary data access memory-based।</p>\n      <p>তবে durability requirement অনুযায়ী persistence configuration এবং architecture বিবেচনা করতে হবে।</p>\n    "
  },
  {
    "id": "db-73",
    "category": "NoSQL",
    "difficulty": "Very Important",
    "tags": [
      "Redis",
      "Cache"
    ],
    "question": "Cache Aside Pattern কী?",
    "answer": "\n      <h4>Cache-aside-এর flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCheck Cache\n ├── Hit → Return\n └── Miss\n       ↓\n    Database\n       ↓\n    Set Cache\n       ↓\n    Return</code></pre>\n      </div>\n      <h4>Update:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Database update\n ↓\nInvalidate cache</code></pre>\n      </div>\n      <p>এটি সবচেয়ে common application caching pattern-এর একটি।</p>\n    "
  },
  {
    "id": "db-74",
    "category": "Database Design",
    "difficulty": "Very Important",
    "tags": [
      "ERD",
      "Design"
    ],
    "question": "ERD কী?",
    "answer": "\n      <p>ERD = Entity Relationship Diagram।</p>\n      <p>Database entities এবং তাদের relationships visualভাবে দেখায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n |\n | 1:N\n ↓\nOrder\n |\n | 1:N\n ↓\nOrderItem\n |\n | N:1\n ↓\nProduct</code></pre>\n      </div>\n      <p>ERD database design করার আগে relationship বোঝার জন্য খুব useful।</p>\n    "
  },
  {
    "id": "db-75",
    "category": "Database Design",
    "difficulty": "Very Important",
    "tags": [
      "Relationship"
    ],
    "question": "One-to-One, One-to-Many এবং Many-to-Many relationship কী?",
    "answer": "\n      <h4>One-to-One:</h4>\n      <p>User → Profile</p>\n      <p>এক user-এর একটি profile।</p>\n      <h4>One-to-Many:</h4>\n      <p>User → Orders</p>\n      <p>এক user-এর অনেক order।</p>\n      <h4>Many-to-Many:</h4>\n      <p>Students ↔ Courses</p>\n      <p>এক student অনেক course নিতে পারে।</p>\n      <p>এক course অনেক student থাকতে পারে।</p>\n      <h4>Many-to-many সাধারণত junction table দিয়ে model করা হয়:</h4>\n      <p>student_courses</p>\n      <p>student_id<br>course_id</p>\n    "
  },
  {
    "id": "db-76",
    "category": "Database Design",
    "difficulty": "Very Important",
    "tags": [
      "Soft Delete",
      "Data Lifecycle"
    ],
    "question": "Soft Delete কী?",
    "answer": "\n      <p>Physical DELETE না করে record-কে deleted হিসেবে mark করা হলে soft delete।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>deleted_at = timestamp</code></pre>\n      </div>\n      <h4>Query:</h4>\n      <p>WHERE deleted_at IS NULL</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Recovery</li>\n        <li>Audit</li>\n        <li>Historical records</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>Every query-তে filter দরকার</li>\n        <li>Unique constraint complexity</li>\n        <li>Table size বাড়তে পারে</li>\n      </ul>\n      <p>Large system-এ archive strategy-ও প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "db-77",
    "category": "Database Design",
    "difficulty": "Very Important",
    "tags": [
      "Audit",
      "Data Integrity"
    ],
    "question": "Audit Trail কী?",
    "answer": "\n      <p>কোন user কখন কী পরিবর্তন করেছে তার historical record হলো audit trail।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>audit_logs</code></pre>\n      </div>\n      <p>id<br>user_id<br>action<br>entity<br>entity_id<br>old_value<br>new_value<br>created_at</p>\n      <h4>Useful:</h4>\n      <ul>\n        <li>Banking</li>\n        <li>ERP</li>\n        <li>Payment</li>\n        <li>Admin panel</li>\n        <li>Compliance</li>\n      </ul>\n      <p>Critical business systems-এ auditability গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-78",
    "category": "Distributed Database",
    "difficulty": "Senior",
    "tags": [
      "CAP Theorem",
      "Distributed Systems"
    ],
    "question": "CAP Theorem কী?",
    "answer": "\n      <h4>CAP theorem distributed system-এর তিনটি property নিয়ে কথা বলে:</h4>\n      <p>C = Consistency<br>A = Availability<br>P = Partition Tolerance</p>\n      <p>Network partition হলে system একই সময়ে strong consistency এবং full availability দুটোই guarantee করতে পারে না—classic CAP framing অনুযায়ী।</p>\n      <p>Distributed database design-এ network partition বাস্তব possibility, তাই trade-off বুঝতে হয়।</p>\n      <p>এটি simple \"choose any two\" slogan-এর চেয়ে বেশি nuanced concept।</p>\n    "
  },
  {
    "id": "db-79",
    "category": "Distributed Database",
    "difficulty": "Senior",
    "tags": [
      "Consistency",
      "Distributed Systems"
    ],
    "question": "Strong Consistency এবং Eventual Consistency কী?",
    "answer": "\n      <h4>Strong consistency:</h4>\n      <p>Write successful হওয়ার পরে subsequent reads expectedভাবে latest value দেখতে পায়।</p>\n      <h4>Eventual consistency:</h4>\n      <p>Immediately সব replica একই value নাও দেখতে পারে, কিন্তু সময়ের সাথে converge করবে।</p>\n      <h4>Strong consistency:</h4>\n      <p>+ Easier reasoning<br>- More coordination/latency</p>\n      <h4>Eventual consistency:</h4>\n      <p>+ Better availability/scalability in some systems<br>- Application complexity</p>\n      <p>Use case অনুযায়ী choose করতে হয়।</p>\n    "
  },
  {
    "id": "db-80",
    "category": "Distributed Database",
    "difficulty": "Senior",
    "tags": [
      "Distributed Transaction",
      "Saga"
    ],
    "question": "Distributed transaction কী?",
    "answer": "\n      <p>একটি business operation যদি multiple independent database/service-এর data modify করে, সেটি distributed transaction problem তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Order DB\n+\nPayment DB\n+\nInventory DB</code></pre>\n      </div>\n      <p>একটি local database transaction সব service cover করতে পারে না।</p>\n      <h4>Common approaches:</h4>\n      <ul>\n        <li>Saga</li>\n        <li>Outbox</li>\n        <li>Compensation</li>\n        <li>2PC in specific systems</li>\n      </ul>\n      <p>Microservices-এ Saga এবং eventual consistency বেশি common।</p>\n    "
  },
  {
    "id": "db-81",
    "category": "Distributed Database",
    "difficulty": "Senior",
    "tags": [
      "Two Phase Commit",
      "2PC"
    ],
    "question": "Two Phase Commit বা 2PC কী?",
    "answer": "\n      <p>2PC distributed transaction-এর জন্য coordinator-based protocol।</p>\n      <h4>Phase 1:</h4>\n      <p>Prepare</p>\n      <p>সব participant জিজ্ঞেস করা হয় তারা commit করতে পারবে কি না।</p>\n      <h4>Phase 2:</h4>\n      <p>Commit/Abort</p>\n      <p>সব ready হলে commit।</p>\n      <h4>Problem:</h4>\n      <ul>\n        <li>Blocking</li>\n        <li>Coordinator dependency</li>\n        <li>Performance overhead</li>\n        <li>Failure complexity</li>\n      </ul>\n      <p>Microservices-এ সাধারণ business workflow-এর জন্য Saga অনেক সময় বেশি practical।</p>\n    "
  },
  {
    "id": "db-82",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Production",
      "Architecture"
    ],
    "question": "Production database design করার সময় কী কী consider করবেন?",
    "answer": "\n      <h4>Consider:</h4>\n      <ol>\n        <li>Data model</li>\n        <li>Relationships</li>\n        <li>Normalization</li>\n        <li>Indexing</li>\n        <li>Transactions</li>\n        <li>Isolation</li>\n        <li>Locking</li>\n        <li>Connection pooling</li>\n        <li>Query performance</li>\n        <li>Caching</li>\n        <li>Replication</li>\n        <li>Backup</li>\n        <li>Recovery</li>\n        <li>Security</li>\n        <li>Monitoring</li>\n        <li>Scaling</li>\n        <li>Migration strategy</li>\n        <li>Disaster recovery</li>\n        <li>Data retention</li>\n        <li>Auditability</li>\n      </ol>\n      <p>Database design শুধু table তৈরি করা নয়।</p>\n      <p>Application workload বুঝে design করতে হয়।</p>\n    "
  },
  {
    "id": "db-83",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Migration",
      "Deployment"
    ],
    "question": "Database Migration কী?",
    "answer": "\n      <p>Application-এর সাথে database schema safely evolve করার process হলো migration।</p>\n      <h4>Example:</h4>\n      <h4>Version 1:</h4>\n      <p>users<br>- id<br>- name</p>\n      <h4>Version 2:</h4>\n      <p>users<br>- id<br>- name<br>- email</p>\n      <h4>Migration:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ALTER TABLE users\nADD COLUMN email VARCHAR(255);</code></pre>\n      </div>\n      <p>Production migration-এ backward compatibility গুরুত্বপূর্ণ।</p>\n      <p>Large table-এ blocking migration avoid করতে online/non-blocking migration strategy প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "db-84",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Zero Downtime",
      "Migration"
    ],
    "question": "Zero-downtime database migration কীভাবে করবেন?",
    "answer": "\n      <p>সরাসরি destructive schema change production-এ risky।</p>\n      <p>Expand-and-contract pattern ব্যবহার করা যায়।</p>\n      <p><strong>Step 1:</strong><br>নতুন column add করুন।</p>\n      <p><strong>Step 2:</strong><br>Application পুরনো + নতুন structure support করবে।</p>\n      <p><strong>Step 3:</strong><br>Backfill data।</p>\n      <p><strong>Step 4:</strong><br>Application নতুন column use করবে।</p>\n      <p><strong>Step 5:</strong><br>Old column remove করুন।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Expand\n ↓\nDeploy compatible code\n ↓\nBackfill\n ↓\nSwitch reads/writes\n ↓\nContract</code></pre>\n      </div>\n      <p>এটি large production system-এ খুব useful।</p>\n    "
  },
  {
    "id": "db-85",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "E-commerce"
    ],
    "question": "একটি high-scale e-commerce database কীভাবে design করবেন?",
    "answer": "\n      <h4>Core tables:</h4>\n      <p>users<br>products<br>categories<br>inventory<br>carts<br>orders<br>order_items<br>payments<br>shipments</p>\n      <h4>Core relationship:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n ↓\nOrder\n ↓\nOrderItem\n ↓\nProduct</code></pre>\n      </div>\n      <h4>Inventory:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Product\n ↓\nInventory</code></pre>\n      </div>\n      <h4>Critical considerations:</h4>\n      <ul>\n        <li>Product indexes</li>\n        <li>Inventory concurrency</li>\n        <li>Order transaction</li>\n        <li>Payment idempotency</li>\n        <li>Cache</li>\n        <li>Read replicas</li>\n        <li>Search engine for product search</li>\n        <li>Queue/event system</li>\n        <li>Audit logs</li>\n        <li>Partitioning for large order tables</li>\n        <li>Backup/recovery</li>\n      </ul>\n      <h4>High-scale architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API\n ↓\nCache\n ↓\nPrimary DB\n ├── Read Replicas\n └── Event/Queue\n        ↓\n    Async Workers</code></pre>\n      </div>\n    "
  },
  {
    "id": "db-86",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Banking"
    ],
    "question": "Banking transaction system-এর database design-এ সবচেয়ে গুরুত্বপূর্ণ বিষয় কী?",
    "answer": "\n      <h4>সবচেয়ে গুরুত্বপূর্ণ:</h4>\n      <ul>\n        <li>Strong consistency</li>\n        <li>ACID transaction</li>\n        <li>Double-entry ledger</li>\n        <li>Idempotency</li>\n        <li>Concurrency control</li>\n        <li>Audit trail</li>\n        <li>Immutable transaction history</li>\n        <li>Strict authorization</li>\n        <li>Encryption</li>\n        <li>Backup</li>\n        <li>Disaster recovery</li>\n      </ul>\n      <h4>Money transfer:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>BEGIN\n ↓\nDebit account A\n ↓\nCredit account B\n ↓\nCreate ledger entries\n ↓\nCOMMIT</code></pre>\n      </div>\n      <p>কোনো step fail হলে rollback।</p>\n      <p>Financial system-এ শুধু balance column-এর উপর নির্ভর না করে auditable ledger model গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-87",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Interview",
      "Debugging"
    ],
    "question": "Production database CPU 90-100% হলে কীভাবে investigate করবেন?",
    "answer": "\n      <p><strong>Step 1:</strong><br>কোন query CPU consume করছে identify করুন।</p>\n      <p><strong>Step 2:</strong><br>Slow query / active query inspect করুন।</p>\n      <p><strong>Step 3:</strong><br>EXPLAIN করুন।</p>\n      <p><strong>Step 4:</strong><br><strong>Check করুন:</strong></p>\n      <ul>\n        <li>Missing index</li>\n        <li>Wrong index</li>\n        <li>Full scan</li>\n        <li>Expensive joins</li>\n        <li>Large aggregation</li>\n        <li>Sort</li>\n        <li>Lock contention</li>\n      </ul>\n      <p><strong>Step 5:</strong><br>Traffic/application changes check করুন।</p>\n      <p><strong>Step 6:</strong><br><strong>Short-term mitigation:</strong></p>\n      <ul>\n        <li>Cache</li>\n        <li>Rate limiting</li>\n        <li>Read replica</li>\n        <li>Traffic reduction</li>\n      </ul>\n      <p><strong>Step 7:</strong><br><strong>Long-term:</strong></p>\n      <ul>\n        <li>Query optimization</li>\n        <li>Index</li>\n        <li>Schema optimization</li>\n        <li>Partitioning</li>\n        <li>Architecture change</li>\n      </ul>\n      <p>Monitoring ছাড়া blindly optimization করা উচিত নয়।</p>\n    "
  },
  {
    "id": "db-88",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Interview",
      "Concurrency"
    ],
    "question": "একই product-এর stock 1 থাকলে দুইজন একসাথে order করলে কীভাবে overselling prevent করবেন?",
    "answer": "\n      <h4>Problem:</h4>\n      <p>Stock = 1</p>\n      <p>Request A → read stock = 1<br>Request B → read stock = 1</p>\n      <p>দুইজনই order করলে stock -2 হয়ে যেতে পারে।</p>\n      <h4>Solutions:</h4>\n      <h4>1. Atomic update:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>UPDATE products\nSET stock = stock - 1\nWHERE id = ?\nAND stock &gt; 0;</code></pre>\n      </div>\n      <p>Affected rows = 1<br>→ Success</p>\n      <p>Affected rows = 0<br>→ Out of stock</p>\n      <h4>অথবা:</h4>\n      <ol>\n        <li>SELECT ... FOR UPDATE</li>\n      </ol>\n      <p>Transaction-এর মধ্যে row lock।</p>\n      <h4>অথবা:</h4>\n      <ol>\n        <li>Optimistic locking</li>\n      </ol>\n      <p>version column।</p>\n      <p>High-concurrency inventory system-এ atomic update/pessimistic বা optimistic strategy workload অনুযায়ী choose করতে হয়।</p>\n    "
  },
  {
    "id": "db-89",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Interview",
      "Deadlock"
    ],
    "question": "Production-এ deadlock হচ্ছে। কীভাবে solve করবেন?",
    "answer": "\n      <p>প্রথমে deadlock-এর exact transaction pattern identify করতে হবে।</p>\n      <h4>Check:</h4>\n      <ul>\n        <li>Deadlock logs</li>\n        <li>Locked rows</li>\n        <li>Query order</li>\n        <li>Index</li>\n        <li>Transaction duration</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Transaction A:\nLock User → Order</code></pre>\n      </div>\n      <p><strong>Transaction B:</strong><br>Lock Order → User</p>\n      <h4>Solution:</h4>\n      <h4>সব জায়গায় consistent order:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n ↓\nOrder</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n      <ul>\n        <li>Shorter transactions</li>\n        <li>Proper indexes</li>\n        <li>Avoid unnecessary locks</li>\n        <li>Reduce lock scope</li>\n        <li>Retry deadlocked transaction</li>\n      </ul>\n      <p>Deadlock পুরোপুরি impossible করার চেয়ে controlled handling + retry অনেক system-এ practical।</p>\n    "
  },
  {
    "id": "db-90",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Interview",
      "Architecture"
    ],
    "question": "একটি application-এর database কখন Redis, SQL এবং MongoDB-এর মধ্যে ভাগ করবেন?",
    "answer": "\n      <h4>SQL:</h4>\n      <p>Primary source of truth।</p>\n      <h4>Use:</h4>\n      <ul>\n        <li>Orders</li>\n        <li>Payments</li>\n        <li>Users</li>\n        <li>Financial data</li>\n        <li>Relationships</li>\n        <li>Transactions</li>\n      </ul>\n      <h4>MongoDB:</h4>\n      <p>Document-oriented workload।</p>\n      <h4>Use:</h4>\n      <ul>\n        <li>Flexible document data</li>\n        <li>Content/catalog style data</li>\n        <li>Specific document access patterns</li>\n      </ul>\n      <h4>Redis:</h4>\n      <p>Fast temporary/in-memory data।</p>\n      <h4>Use:</h4>\n      <ul>\n        <li>Cache</li>\n        <li>Session</li>\n        <li>Rate limit</li>\n        <li>Distributed lock</li>\n        <li>Counters</li>\n      </ul>\n      <h4>Important principle:</h4>\n      <p>একই data-এর multiple sources of truth তৈরি করার আগে consistency strategy define করতে হবে।</p>\n    "
  },
  {
    "id": "db-91",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Execution Order"
    ],
    "question": "SQL Query-এর logical execution order কী?",
    "answer": "\n      <p>SQL লেখার order এবং database-এর logical execution order এক নয়।</p>\n      <h4>সাধারণ logical order:</h4>\n      <ol>\n        <li>FROM</li>\n        <li>JOIN</li>\n        <li>WHERE</li>\n        <li>GROUP BY</li>\n        <li>HAVING</li>\n        <li>SELECT</li>\n        <li>DISTINCT</li>\n        <li>ORDER BY</li>\n        <li>LIMIT/OFFSET</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT department_id, COUNT(*)\nFROM employees\nWHERE salary &gt; 50000\nGROUP BY department_id\nHAVING COUNT(*) &gt; 5\nORDER BY COUNT(*) DESC\nLIMIT 10;</code></pre>\n      </div>\n      <h4>Conceptually:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>FROM\n ↓\nJOIN\n ↓\nWHERE\n ↓\nGROUP BY\n ↓\nHAVING\n ↓\nSELECT\n ↓\nDISTINCT\n ↓\nORDER BY\n ↓\nLIMIT</code></pre>\n      </div>\n      <p>এই order বুঝলে SQL query-এর অনেক interview question সহজ হয়ে যায়।</p>\n    "
  },
  {
    "id": "db-92",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "DISTINCT"
    ],
    "question": "DISTINCT কী এবং কখন ব্যবহার করবেন?",
    "answer": "\n      <p>DISTINCT duplicate result remove করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT DISTINCT department_id\nFROM employees;</code></pre>\n      </div>\n      <h4>যদি department_id হয়:</h4>\n      <p>1<br>1<br>2<br>2<br>3</p>\n      <h4>Result:</h4>\n      <p>1<br>2<br>3</p>\n      <p>কিন্তু DISTINCT performance cost তৈরি করতে পারে, কারণ database-কে duplicate values identify করতে হয়।</p>\n      <p>শুধু duplicate সমস্যা hide করার জন্য blindly DISTINCT ব্যবহার করা উচিত নয়।</p>\n    "
  },
  {
    "id": "db-93",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "CASE"
    ],
    "question": "SQL CASE expression কী?",
    "answer": "\n      <p>CASE conditional logic implement করতে ব্যবহৃত হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT\n  name,\n  CASE\n    WHEN salary &gt;= 100000 THEN 'Senior'\n    WHEN salary &gt;= 50000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS level\nFROM employees;</code></pre>\n      </div>\n      <p>এটি SQL-এর মধ্যে if/else-এর মতো কাজ করে।</p>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Conditional formatting</li>\n        <li>Categorization</li>\n        <li>Reporting</li>\n        <li>Conditional aggregation</li>\n      </ul>\n    "
  },
  {
    "id": "db-94",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "COALESCE",
      "NULL"
    ],
    "question": "COALESCE কী?",
    "answer": "\n      <p>COALESCE প্রথম non-NULL value return করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT COALESCE(phone, 'N/A')\nFROM users;</code></pre>\n      </div>\n      <h4>যদি phone NULL হয়:</h4>\n      <p>N/A</p>\n      <h4>Multiple values:</h4>\n      <p>COALESCE(value1, value2, value3)</p>\n      <p>এটি NULL handling এবং fallback value-এর জন্য খুব useful।</p>\n    "
  },
  {
    "id": "db-95",
    "category": "Advanced SQL",
    "difficulty": "Important",
    "tags": [
      "SQL",
      "NULLIF"
    ],
    "question": "NULLIF কী?",
    "answer": "\n      <p>NULLIF দুইটি value compare করে।</p>\n      <p>যদি দুইটি equal হয় → NULL<br>না হলে → প্রথম value।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>NULLIF(quantity, 0)</code></pre>\n      </div>\n      <h4>Division-এর ক্ষেত্রে useful:</h4>\n      <p>price / NULLIF(quantity, 0)</p>\n      <p>এতে quantity = 0 হলে division-by-zero error avoid করা যায়।</p>\n    "
  },
  {
    "id": "db-96",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "EXISTS",
      "Subquery"
    ],
    "question": "EXISTS এবং IN-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>EXISTS check করে subquery অন্তত একটি row return করছে কি না।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.user_id = u.id\n);</code></pre>\n      </div>\n      <h4>IN:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>WHERE id IN (\n  SELECT user_id\n  FROM orders\n);</code></pre>\n      </div>\n      <p>কোনটি faster হবে তা data distribution, indexes এবং optimizer-এর উপর নির্ভর করে।</p>\n      <p>EXISTS correlated existence check-এর ক্ষেত্রে খুব natural এবং common।</p>\n    "
  },
  {
    "id": "db-97",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Anti Join"
    ],
    "question": "যেসব user-এর কোনো order নেই তাদের SQL-এ কীভাবে বের করবেন?",
    "answer": "\n      <h4>দুইটি common approach:</h4>\n      <h4>1. LEFT JOIN:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT u.*\nFROM users u\nLEFT JOIN orders o\nON o.user_id = u.id\nWHERE o.id IS NULL;</code></pre>\n      </div>\n      <h4>2. NOT EXISTS:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT u.*\nFROM users u\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.user_id = u.id\n);</code></pre>\n      </div>\n      <p>NOT EXISTS সাধারণত intent-এর দিক থেকে পরিষ্কার।</p>\n      <p>কিন্তু actual performance database optimizer এবং indexes-এর উপর নির্ভর করবে।</p>\n    "
  },
  {
    "id": "db-98",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Duplicate"
    ],
    "question": "Duplicate records কীভাবে identify করবেন?",
    "answer": "\n      <p>GROUP BY + HAVING ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) &gt; 1;</code></pre>\n      </div>\n      <p>এতে duplicate email পাওয়া যাবে।</p>\n      <h4>Duplicate rows remove করার আগে অবশ্যই:</h4>\n      <ul>\n        <li>Business rule</li>\n        <li>Primary key</li>\n        <li>Foreign key</li>\n        <li>Referential impact</li>\n      </ul>\n      <p>check করতে হবে।</p>\n    "
  },
  {
    "id": "db-99",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Top N"
    ],
    "question": "প্রতিটি department-এর top 3 salary কীভাবে বের করবেন?",
    "answer": "\n      <p>Window function ব্যবহার করা সবচেয়ে clean approach।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM (\n  SELECT\n    employee_id,\n    department_id,\n    salary,\n    ROW_NUMBER() OVER (\n      PARTITION BY department_id\n      ORDER BY salary DESC\n    ) AS rn\n  FROM employees\n) x\nWHERE rn &lt;= 3;</code></pre>\n      </div>\n      <p>PARTITION BY department অনুযায়ী ranking reset করে।</p>\n      <p>ROW_NUMBER-এর পরিবর্তে RANK/DENSE_RANK ব্যবহার করলে ties-এর behavior পরিবর্তিত হবে।</p>\n    "
  },
  {
    "id": "db-100",
    "category": "Advanced SQL",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "RANK",
      "DENSE_RANK"
    ],
    "question": "ROW_NUMBER, RANK এবং DENSE_RANK-এর পার্থক্য কী?",
    "answer": "\n      <h4>ধরা যাক salary:</h4>\n      <p>100<br>100<br>90<br>80</p>\n      <h4>ROW_NUMBER:</h4>\n      <p>1<br>2<br>3<br>4</p>\n      <h4>RANK:</h4>\n      <p>1<br>1<br>3<br>4</p>\n      <h4>DENSE_RANK:</h4>\n      <p>1<br>1<br>2<br>3</p>\n      <p>ROW_NUMBER → প্রতিটি row unique number</p>\n      <p>RANK → tie হলে gap তৈরি হয়</p>\n      <p>DENSE_RANK → tie হলে gap তৈরি হয় না</p>\n      <p>Ranking problem-এ কোনটি দরকার তা business requirement-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "db-101",
    "category": "Indexing",
    "difficulty": "Very Important",
    "tags": [
      "Index",
      "Selectivity"
    ],
    "question": "Index Selectivity কী?",
    "answer": "\n      <p>Selectivity হলো একটি column-এর value কতটা unique বা filtering-এ কতটা effective তার ধারণা।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>id:\n1\n2\n3\n4\n5</code></pre>\n      </div>\n      <p>id-এর selectivity high।</p>\n      <h4>gender:</h4>\n      <p>male<br>male<br>male<br>female<br>male</p>\n      <p>gender-এর selectivity comparatively low।</p>\n      <p>High-selectivity column সাধারণত filtering-এর জন্য বেশি useful।</p>\n      <p>তবে optimizer শুধু selectivity নয়, data distribution, query shape, cost এবং অন্যান্য factors বিবেচনা করে।</p>\n    "
  },
  {
    "id": "db-102",
    "category": "Indexing",
    "difficulty": "Very Important",
    "tags": [
      "Composite Index",
      "Leftmost Prefix"
    ],
    "question": "Composite Index-এর Leftmost Prefix Rule কী?",
    "answer": "\n      <h4>ধরা যাক index:</h4>\n      <p>(user_id, status, created_at)</p>\n      <p>তাহলে index-এর প্রথম column থেকে prefix ব্যবহার করা সবচেয়ে natural।</p>\n      <h4>Useful:</h4>\n      <p>WHERE user_id = ?</p>\n      <p>WHERE user_id = ?<br>AND status = ?</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>WHERE user_id = ?\nAND status = ?\nAND created_at &gt; ?</code></pre>\n      </div>\n      <h4>কিন্তু:</h4>\n      <p>WHERE status = ?</p>\n      <p>শুধু status-এর query একই index থেকে সাধারণত efficientভাবে benefit নাও পেতে পারে।</p>\n      <p>তাই composite index column order query pattern অনুযায়ী design করতে হয়।</p>\n    "
  },
  {
    "id": "db-103",
    "category": "Indexing",
    "difficulty": "Very Important",
    "tags": [
      "Index",
      "ORDER BY"
    ],
    "question": "Index কীভাবে ORDER BY optimize করতে পারে?",
    "answer": "\n      <h4>ধরা যাক:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>CREATE INDEX idx_orders_created\nON orders(created_at);</code></pre>\n      </div>\n      <h4>Query:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM orders\nORDER BY created_at DESC\nLIMIT 20;</code></pre>\n      </div>\n      <p>যদি index ordering query-এর সাথে compatible হয়, database index scan করে sorted result পেতে পারে।</p>\n      <p>তাহলে আলাদা expensive sort operation avoid হতে পারে।</p>\n      <p>তবে optimizer cost অনুযায়ী index ব্যবহার করবে কি না সেটি execution plan দিয়ে verify করতে হবে।</p>\n    "
  },
  {
    "id": "db-104",
    "category": "Indexing",
    "difficulty": "Very Important",
    "tags": [
      "Index",
      "LIKE"
    ],
    "question": "LIKE query-তে কখন index কাজ করতে পারে?",
    "answer": "\n      <h4>Prefix search:</h4>\n      <p>WHERE name LIKE 'Naz%'</p>\n      <p>অনেক B-tree implementation-এ index ব্যবহার করতে পারে।</p>\n      <h4>কিন্তু:</h4>\n      <p>WHERE name LIKE '%Naz'</p>\n      <h4>অথবা:</h4>\n      <p>WHERE name LIKE '%Naz%'</p>\n      <p>সাধারণ B-tree index সাধারণত effectiveভাবে ব্যবহার করতে পারে না।</p>\n      <h4>Large-scale text search-এর জন্য:</h4>\n      <ul>\n        <li>Full-text index</li>\n        <li>Elasticsearch/OpenSearch</li>\n        <li>Database-specific text search</li>\n      </ul>\n      <p>ব্যবহার করা যেতে পারে।</p>\n    "
  },
  {
    "id": "db-105",
    "category": "Indexing",
    "difficulty": "Senior",
    "tags": [
      "Index",
      "Write Performance"
    ],
    "question": "অনেক বেশি index দিলে কী সমস্যা হয়?",
    "answer": "\n      <p>Index read performance improve করতে পারে, কিন্তু প্রতিটি write-এর সময় relevant indexes maintain করতে হয়।</p>\n      <h4>তাই অনেক index হলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>INSERT ↑ cost\nUPDATE ↑ cost\nDELETE ↑ cost\nStorage ↑\nMemory/cache pressure ↑</code></pre>\n      </div>\n      <h4>Example:</h4>\n      <p>একটি table-এ 15টি index থাকলে নতুন row insert করার সময় multiple index update করতে হতে পারে।</p>\n      <p>তাই index query workload অনুযায়ী design করতে হবে।</p>\n    "
  },
  {
    "id": "db-106",
    "category": "Indexing",
    "difficulty": "Senior",
    "tags": [
      "Index",
      "Unused Index"
    ],
    "question": "Unused index কেন remove করা উচিত?",
    "answer": "\n      <h4>Unused index:</h4>\n      <ul>\n        <li>Storage consume করে</li>\n        <li>Write overhead তৈরি করে</li>\n        <li>Cache pressure বাড়ায়</li>\n        <li>Maintenance cost বাড়ায়</li>\n      </ul>\n      <p>তবে production-এ সরাসরি index drop করা উচিত নয়।</p>\n      <h4>আগে:</h4>\n      <ul>\n        <li>Query statistics</li>\n        <li>Application workload</li>\n        <li>Peak traffic</li>\n        <li>Historical usage</li>\n      </ul>\n      <p>analyze করতে হবে।</p>\n      <p>কারণ একটি index daily workload-এ unused হলেও monthly reporting query-এর জন্য প্রয়োজনীয় হতে পারে।</p>\n    "
  },
  {
    "id": "db-107",
    "category": "Query Optimization",
    "difficulty": "Senior",
    "tags": [
      "Optimizer",
      "Execution Plan"
    ],
    "question": "Database Query Optimizer কী?",
    "answer": "\n      <p>Query optimizer SQL query-এর জন্য সম্ভাব্য execution strategy evaluate করে এবং cost অনুযায়ী একটি plan নির্বাচন করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM orders o\nJOIN users u\nON u.id = o.user_id\nWHERE o.status = 'paid';</code></pre>\n      </div>\n      <h4>Possible plans:</h4>\n      <p><strong>Plan A:</strong><br>Scan orders → join users</p>\n      <p><strong>Plan B:</strong><br>Use index → filter orders → join users</p>\n      <p>Optimizer সাধারণত statistics এবং estimated cost ব্যবহার করে plan নির্বাচন করে।</p>\n      <p>তাই একই SQL query different data distribution-এ different execution plan নিতে পারে।</p>\n    "
  },
  {
    "id": "db-108",
    "category": "Query Optimization",
    "difficulty": "Senior",
    "tags": [
      "EXPLAIN",
      "Execution Plan"
    ],
    "question": "EXPLAIN plan-এর কোন বিষয়গুলো সবচেয়ে গুরুত্বপূর্ণ?",
    "answer": "\n      <h4>Database অনুযায়ী fields আলাদা হলেও সাধারণত দেখবেন:</h4>\n      <ul>\n        <li>Access method</li>\n        <li>Index used</li>\n        <li>Estimated rows</li>\n        <li>Actual rows</li>\n        <li>Join method</li>\n        <li>Filter</li>\n        <li>Sort</li>\n        <li>Temporary table</li>\n        <li>Full scan</li>\n        <li>Cost</li>\n        <li>Actual execution time</li>\n      </ul>\n      <h4>বিশেষ করে compare করুন:</h4>\n      <p>Estimated rows<br>vs<br>Actual rows</p>\n      <p>যদি estimate এবং actual অনেক আলাদা হয়, optimizer statistics/data distribution issue থাকতে পারে।</p>\n    "
  },
  {
    "id": "db-109",
    "category": "Query Optimization",
    "difficulty": "Senior",
    "tags": [
      "Full Table Scan",
      "Index"
    ],
    "question": "Full Table Scan কি সবসময় খারাপ?",
    "answer": "\n      <p>না।</p>\n      <p>যদি table খুব ছোট হয়, full table scan index lookup-এর চেয়ে faster হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Table = 100 rows</code></pre>\n      </div>\n      <p>Index lookup-এর overhead-এর চেয়ে পুরো table scan সহজ হতে পারে।</p>\n      <h4>আবার যদি:</h4>\n      <p>Table = 100 million rows</p>\n      <p>এবং query মাত্র 10 rows চায়, তখন appropriate index অনেক বেশি useful হতে পারে।</p>\n      <h4>তাই:</h4>\n      <p>Full Scan ≠ Always Bad</p>\n      <p>Execution plan এবং actual workload দেখে সিদ্ধান্ত নিতে হবে।</p>\n    "
  },
  {
    "id": "db-110",
    "category": "Query Optimization",
    "difficulty": "Senior",
    "tags": [
      "Statistics",
      "Optimizer"
    ],
    "question": "Database Statistics কী এবং কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>Optimizer data distribution সম্পর্কে statistics ব্যবহার করে execution plan তৈরি করতে পারে।</p>\n      <h4>Statistics-এর মাধ্যমে optimizer estimate করতে পারে:</h4>\n      <ul>\n        <li>কত rows match করবে</li>\n        <li>কোন index useful</li>\n        <li>কোন join order ভালো</li>\n      </ul>\n      <p>Statistics stale হলে optimizer ভুল estimate করতে পারে।</p>\n      <p>তাই production database-এ statistics maintenance গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-111",
    "category": "MySQL",
    "difficulty": "Very Important",
    "tags": [
      "InnoDB",
      "MySQL"
    ],
    "question": "InnoDB কী?",
    "answer": "\n      <p>InnoDB হলো MySQL-এর প্রধান transactional storage engine।</p>\n      <h4>Important features:</h4>\n      <ul>\n        <li>ACID transactions</li>\n        <li>Row-level locking</li>\n        <li>Foreign keys</li>\n        <li>MVCC</li>\n        <li>Crash recovery</li>\n        <li>Buffer pool</li>\n        <li>Redo log</li>\n      </ul>\n      <p>Modern transactional MySQL application-এ InnoDB সাধারণত default choice।</p>\n    "
  },
  {
    "id": "db-112",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "InnoDB",
      "Clustered Index"
    ],
    "question": "InnoDB-তে Primary Key কীভাবে data storage-এর সাথে সম্পর্কিত?",
    "answer": "\n      <p>InnoDB clustered index structure ব্যবহার করে।</p>\n      <p>Primary key index-এর leaf pages-এ row data logically organized থাকে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Primary Key B+Tree\n        ↓\nLeaf Pages\n        ↓\nRow Data</code></pre>\n      </div>\n      <h4>তাই:</h4>\n      <ul>\n        <li>ছোট primary key beneficial</li>\n        <li>Stable primary key beneficial</li>\n        <li>Randomly huge primary key storage/index cost বাড়াতে পারে</li>\n      </ul>\n      <p>Secondary index-এর মধ্যে primary key value-ও গুরুত্বপূর্ণ ভূমিকা রাখে, তাই primary key size secondary indexes-এর storage-কে প্রভাবিত করতে পারে।</p>\n    "
  },
  {
    "id": "db-113",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "InnoDB",
      "Secondary Index"
    ],
    "question": "InnoDB Secondary Index lookup কীভাবে কাজ করে?",
    "answer": "\n      <h4>Conceptually:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Secondary Index\n      ↓\nMatching index entry\n      ↓\nPrimary Key\n      ↓\nClustered Index\n      ↓\nActual Row</code></pre>\n      </div>\n      <p>তাই query যদি secondary index থেকে শুরু করে এবং প্রয়োজনীয় columns index-এর মধ্যেই থাকে, covering index হলে extra clustered lookup avoid হতে পারে।</p>\n      <p>এই কারণেই secondary index design গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-114",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "Buffer Pool",
      "InnoDB"
    ],
    "question": "InnoDB Buffer Pool কীভাবে query performance improve করে?",
    "answer": "\n      <p>Database data disk pages হিসেবে store করে।</p>\n      <h4>Frequently used pages memory-তে রাখা হয়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Disk\n ↓\nBuffer Pool\n ↓\nQuery</code></pre>\n      </div>\n      <h4>যদি required page buffer pool-এ থাকে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Memory Hit\n ↓\nFast</code></pre>\n      </div>\n      <h4>না থাকলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Disk Read\n ↓\nBuffer Pool\n ↓\nQuery</code></pre>\n      </div>\n      <p>তাই buffer pool database performance-এর অন্যতম গুরুত্বপূর্ণ component।</p>\n    "
  },
  {
    "id": "db-115",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "Redo Log",
      "InnoDB"
    ],
    "question": "InnoDB-তে Redo Log কেন দরকার?",
    "answer": "\n      <p>Database update করার পর data page immediately disk-এ write না হলেও durability maintain করতে redo log সাহায্য করে।</p>\n      <h4>Simplified:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>UPDATE\n ↓\nMemory page changed\n ↓\nRedo Log durable\n ↓\nCOMMIT\n ↓\nLater data page flush</code></pre>\n      </div>\n      <p>Crash হলে redo log replay করে committed changes recover করা যায়।</p>\n      <p>এটি write performance এবং durability-এর balance-এর অংশ।</p>\n    "
  },
  {
    "id": "db-116",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "Undo Log",
      "MVCC"
    ],
    "question": "Undo Log কী?",
    "answer": "\n      <p>Undo log মূলত previous row versions এবং rollback-related information ধরে রাখে।</p>\n      <h4>Use cases:</h4>\n      <ol>\n        <li>Transaction rollback</li>\n        <li>MVCC consistent reads</li>\n      </ol>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Old Value\n   ↓\nUndo Log</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>New Value\n   ↓\nCurrent Data</code></pre>\n      </div>\n      <p>এটি Redo Log-এর থেকে আলাদা উদ্দেশ্যে ব্যবহৃত হয়।</p>\n      <p>Redo → recovery/redo changes</p>\n      <p>Undo → rollback + old versions/MVCC</p>\n    "
  },
  {
    "id": "db-117",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "Redo",
      "Undo"
    ],
    "question": "Redo Log এবং Undo Log-এর পার্থক্য কী?",
    "answer": "\n      <h4>Redo Log:</h4>\n      <p><strong>Purpose:</strong><br>Committed changes recovery/replay।</p>\n      <p><strong>Question:</strong><br>Crash হলে committed changes কীভাবে recover করব?</p>\n      <h4>Undo Log:</h4>\n      <p><strong>Purpose:</strong><br>Rollback এবং older row versions।</p>\n      <p><strong>Question:</strong><br>Transaction rollback বা consistent read-এর জন্য previous version কোথায় পাব?</p>\n      <h4>Simplified:</h4>\n      <p><strong>Redo:</strong><br>\"কি পরিবর্তন আবার apply করতে হবে\"</p>\n      <p><strong>Undo:</strong><br>\"আগের state/version কী ছিল\"</p>\n      <p>দুটোই transactional database internals-এর গুরুত্বপূর্ণ অংশ।</p>\n    "
  },
  {
    "id": "db-118",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "Flush",
      "Durability"
    ],
    "question": "Database COMMIT করার পর data কি সাথে সাথে table data file-এ লিখে যায়?",
    "answer": "\n      <p>অবশ্যই সব ক্ষেত্রে সরাসরি data page disk-এ write হয় না।</p>\n      <h4>Simplified flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n ↓\nTransaction\n ↓\nBuffer Pool\n ↓\nRedo Log\n ↓\nCommit\n ↓\nLater page flush</code></pre>\n      </div>\n      <p>Durability-এর জন্য log mechanism এবং storage flush behavior গুরুত্বপূর্ণ।</p>\n      <p>Exact behavior configuration, filesystem এবং storage engine-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "db-119",
    "category": "MySQL",
    "difficulty": "Senior",
    "tags": [
      "Crash Recovery",
      "InnoDB"
    ],
    "question": "MySQL/InnoDB crash হলে কীভাবে recovery করে?",
    "answer": "\n      <h4>Simplified:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Database Crash\n ↓\nRestart\n ↓\nRecovery\n ↓\nRead transaction logs\n ↓\nRedo necessary changes\n ↓\nRollback incomplete transactions\n ↓\nConsistent state</code></pre>\n      </div>\n      <h4>এখানে:</h4>\n      <p>Redo → committed changes recover করতে সাহায্য করে</p>\n      <p>Undo → incomplete transaction rollback এবং consistent reads-এর জন্য সাহায্য করে</p>\n      <p>এটি database durability এবং crash recovery-এর core concept।</p>\n    "
  },
  {
    "id": "db-120",
    "category": "PostgreSQL",
    "difficulty": "Very Important",
    "tags": [
      "PostgreSQL",
      "MVCC"
    ],
    "question": "PostgreSQL-এর গুরুত্বপূর্ণ বৈশিষ্ট্য কী?",
    "answer": "\n      <p>PostgreSQL একটি advanced open-source relational database।</p>\n      <h4>Important features:</h4>\n      <ul>\n        <li>ACID transactions</li>\n        <li>MVCC</li>\n        <li>Powerful SQL</li>\n        <li>CTE</li>\n        <li>Window functions</li>\n        <li>JSON/JSONB</li>\n        <li>Arrays</li>\n        <li>Full-text search</li>\n        <li>Extensions</li>\n        <li>Strong indexing options</li>\n        <li>Replication</li>\n        <li>Partitioning</li>\n      </ul>\n      <p>Complex relational এবং data-intensive application-এর জন্য PostgreSQL খুব শক্তিশালী।</p>\n    "
  },
  {
    "id": "db-121",
    "category": "PostgreSQL",
    "difficulty": "Senior",
    "tags": [
      "PostgreSQL",
      "WAL"
    ],
    "question": "PostgreSQL WAL কীভাবে কাজ করে?",
    "answer": "\n      <p>WAL = Write-Ahead Log।</p>\n      <h4>Simplified:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Transaction\n ↓\nGenerate WAL record\n ↓\nWAL durable\n ↓\nCommit\n ↓\nData pages later written</code></pre>\n      </div>\n      <p>Crash হলে WAL replay করে database recovery করতে পারে।</p>\n      <p>WAL replication-এর ক্ষেত্রেও গুরুত্বপূর্ণ ভূমিকা রাখে।</p>\n    "
  },
  {
    "id": "db-122",
    "category": "PostgreSQL",
    "difficulty": "Senior",
    "tags": [
      "PostgreSQL",
      "VACUUM"
    ],
    "question": "PostgreSQL VACUUM কী?",
    "answer": "\n      <p>PostgreSQL MVCC-এর কারণে update/delete-এর পুরনো row versions থাকতে পারে।</p>\n      <p>VACUUM dead tuples cleanup করতে সাহায্য করে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>UPDATE/DELETE\n ↓\nOld tuple remains\n ↓\nVACUUM\n ↓\nCleanup/reclaim process</code></pre>\n      </div>\n      <h4>VACUUM গুরুত্বপূর্ণ কারণ excessive dead tuples:</h4>\n      <ul>\n        <li>Storage বাড়াতে পারে</li>\n        <li>Query performance affect করতে পারে</li>\n        <li>Table bloat তৈরি করতে পারে</li>\n      </ul>\n      <p>Autovacuum production PostgreSQL-এর গুরুত্বপূর্ণ component।</p>\n    "
  },
  {
    "id": "db-123",
    "category": "PostgreSQL",
    "difficulty": "Senior",
    "tags": [
      "PostgreSQL",
      "Analyze"
    ],
    "question": "PostgreSQL ANALYZE কী?",
    "answer": "\n      <p>ANALYZE table-এর data distribution সম্পর্কে statistics collect করে।</p>\n      <p>Optimizer এই statistics ব্যবহার করে execution plan তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ANALYZE users;</code></pre>\n      </div>\n      <h4>এটি বিশেষভাবে useful হতে পারে যখন:</h4>\n      <ul>\n        <li>অনেক data পরিবর্তন হয়েছে</li>\n        <li>Data distribution বদলেছে</li>\n        <li>Query plan unexpectedly poor</li>\n      </ul>\n      <p>Autovacuum system-এর সাথে automatic analyze-ও হতে পারে।</p>\n    "
  },
  {
    "id": "db-124",
    "category": "Transactions",
    "difficulty": "Very Important",
    "tags": [
      "Isolation",
      "Read Committed"
    ],
    "question": "READ COMMITTED কী?",
    "answer": "\n      <p>READ COMMITTED সাধারণত একটি transaction-এর query-কে অন্য transaction-এর committed data দেখতে দেয়।</p>\n      <p>Uncommitted changes দেখা যাবে না।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Transaction A:\nUPDATE but not commit</code></pre>\n      </div>\n      <p><strong>Transaction B:</strong><br>SELECT</p>\n      <p>B সাধারণত A-এর uncommitted value দেখতে পাবে না।</p>\n      <p>তবে একই transaction-এর দুই query-এর মধ্যে অন্য transaction commit করলে result change হতে পারে।</p>\n      <p>Exact semantics database-specific।</p>\n    "
  },
  {
    "id": "db-125",
    "category": "Transactions",
    "difficulty": "Very Important",
    "tags": [
      "Isolation",
      "Repeatable Read"
    ],
    "question": "REPEATABLE READ কী?",
    "answer": "\n      <p>REPEATABLE READ একই transaction-এর repeated reads-এর জন্য consistent view maintain করার লক্ষ্য রাখে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Transaction A:\nRead row → 100</code></pre>\n      </div>\n      <p><strong>Transaction B:</strong><br>Update → 200<br>Commit</p>\n      <p><strong>Transaction A:</strong><br>Read again</p>\n      <p>REPEATABLE READ implementation অনুযায়ী আগের consistent value দেখতে পারে।</p>\n      <p>MySQL InnoDB এবং PostgreSQL-এর semantics এক নয়, তাই database-specific behavior জানা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-126",
    "category": "Transactions",
    "difficulty": "Very Important",
    "tags": [
      "Serializable",
      "Isolation"
    ],
    "question": "SERIALIZABLE isolation level কী?",
    "answer": "\n      <p>SERIALIZABLE হলো strongest standard isolation level।</p>\n      <h4>Goal:</h4>\n      <p>Concurrent transactions এমনভাবে execute হবে যেন তারা serial order-এ execute হয়েছে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Strong consistency</li>\n        <li>Many concurrency anomalies prevent</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>More blocking/conflicts/retries</li>\n        <li>Lower throughput হতে পারে</li>\n      </ul>\n      <p>High-value financial operations-এ প্রয়োজন হতে পারে, কিন্তু blindly সব transaction SERIALIZABLE করা উচিত নয়।</p>\n    "
  },
  {
    "id": "db-127",
    "category": "Transactions",
    "difficulty": "Very Important",
    "tags": [
      "Isolation",
      "Comparison"
    ],
    "question": "Isolation level নির্বাচন কীভাবে করবেন?",
    "answer": "\n      <h4>Requirement অনুযায়ী:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>READ UNCOMMITTED:\nVery weak isolation; uncommon for critical systems।</code></pre>\n      </div>\n      <p><strong>READ COMMITTED:</strong><br>Common default-style choice।</p>\n      <p><strong>REPEATABLE READ:</strong><br>More stable reads।</p>\n      <p><strong>SERIALIZABLE:</strong><br>Strongest isolation।</p>\n      <h4>Consider:</h4>\n      <ul>\n        <li>Business correctness</li>\n        <li>Concurrency</li>\n        <li>Performance</li>\n        <li>Lock contention</li>\n        <li>Retry behavior</li>\n      </ul>\n      <p>Banking/payment system-এর সব operation-এ একই isolation level দরকার—এমন নয়।</p>\n    "
  },
  {
    "id": "db-128",
    "category": "Locking",
    "difficulty": "Senior",
    "tags": [
      "Row Lock",
      "Table Lock"
    ],
    "question": "Row Lock এবং Table Lock-এর পার্থক্য কী?",
    "answer": "\n      <h4>Row lock:</h4>\n      <p>শুধু নির্দিষ্ট row lock করে।</p>\n      <h4>Table lock:</h4>\n      <p>পুরো table lock করতে পারে।</p>\n      <h4>Example:</h4>\n      <p>100 million row table-এ একটি row update করার সময় row-level locking concurrency বেশি allow করে।</p>\n      <p>Table-level locking সহজ কিন্তু concurrency reduce করতে পারে।</p>\n      <p>Exact lock behavior database engine-specific।</p>\n    "
  },
  {
    "id": "db-129",
    "category": "Locking",
    "difficulty": "Senior",
    "tags": [
      "Gap Lock",
      "Next-Key Lock"
    ],
    "question": "Gap Lock এবং Next-Key Lock কী?",
    "answer": "\n      <p>InnoDB-এর locking internals-এ gap lock এবং next-key lock গুরুত্বপূর্ণ।</p>\n      <h4>Gap Lock:</h4>\n      <p>Index records-এর মাঝের gap lock করে।</p>\n      <h4>Next-Key Lock:</h4>\n      <p>Record lock + preceding gap-এর combination হিসেবে কাজ করে।</p>\n      <p>এগুলো বিশেষ isolation behavior এবং phantom prevention-এর সাথে সম্পর্কিত।</p>\n      <p>High-concurrency InnoDB debugging-এর সময় এগুলো জানা useful।</p>\n    "
  },
  {
    "id": "db-130",
    "category": "Locking",
    "difficulty": "Senior",
    "tags": [
      "Lock Wait",
      "Timeout"
    ],
    "question": "Lock wait timeout কী?",
    "answer": "\n      <p>একটি transaction অন্য transaction-এর lock release হওয়ার জন্য অপেক্ষা করতে করতে configured timeout exceed করলে lock wait timeout হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Transaction A\n ↓\nLock row 10</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Transaction B\n ↓\nUPDATE row 10\n ↓\nWAIT\n ↓\nTimeout</code></pre>\n      </div>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Short transactions</li>\n        <li>Proper indexes</li>\n        <li>Consistent access order</li>\n        <li>Avoid unnecessary locks</li>\n        <li>Monitor blocking queries</li>\n        <li>Retry safely where appropriate</li>\n      </ul>\n    "
  },
  {
    "id": "db-131",
    "category": "Transaction Design",
    "difficulty": "Very Important",
    "tags": [
      "Transaction",
      "Best Practice"
    ],
    "question": "Transaction কতক্ষণ open রাখা উচিত?",
    "answer": "\n      <p>Transaction যত short রাখা যায় তত ভালো।</p>\n      <h4>Long transaction:</h4>\n      <ul>\n        <li>Locks ধরে রাখে</li>\n        <li>Concurrency কমায়</li>\n        <li>Deadlock risk বাড়ায়</li>\n        <li>Undo/version storage বাড়াতে পারে</li>\n        <li>Connection occupied রাখে</li>\n      </ul>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>BEGIN\n ↓\nDB operation\n ↓\nExternal API call\n ↓\nUser processing\n ↓\nAnother DB operation\n ↓\nCOMMIT</code></pre>\n      </div>\n      <h4>Better:</h4>\n      <p>External work আগে/পরে carefully handle করে DB transaction-এর critical section ছোট রাখা।</p>\n      <p>বিশেষ করে network call transaction-এর ভিতরে রাখা সাধারণত avoid করা ভালো।</p>\n    "
  },
  {
    "id": "db-132",
    "category": "Transaction Design",
    "difficulty": "Very Important",
    "tags": [
      "Atomicity",
      "Concurrency"
    ],
    "question": "Atomic database update কী?",
    "answer": "\n      <p>একটি condition-এর সাথে update এক statement-এ safely করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>UPDATE inventory\nSET stock = stock - 1\nWHERE product_id = 10\nAND stock &gt; 0;</code></pre>\n      </div>\n      <h4>তারপর affected rows check:</h4>\n      <p>1 → success<br>0 → stock unavailable</p>\n      <h4>এটি:</h4>\n      <p>Read stock<br>→ Application logic<br>→ Write stock</p>\n      <p>এর চেয়ে race condition কমাতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "db-133",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Second Highest Salary"
    ],
    "question": "Second highest salary কীভাবে বের করবেন?",
    "answer": "\n      <h4>একটি approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT MAX(salary)\nFROM employees\nWHERE salary &lt; (\n  SELECT MAX(salary)\n  FROM employees\n);</code></pre>\n      </div>\n      <h4>আরেকটি approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT salary\nFROM (\n  SELECT\n    salary,\n    DENSE_RANK() OVER (\n      ORDER BY salary DESC\n    ) AS rnk\n  FROM employees\n) x\nWHERE rnk = 2;</code></pre>\n      </div>\n      <p>DENSE_RANK duplicate salary handle করতে সুবিধা দেয়।</p>\n    "
  },
  {
    "id": "db-134",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Nth Highest"
    ],
    "question": "Nth highest salary কীভাবে বের করবেন?",
    "answer": "\n      <h4>Window function:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT salary\nFROM (\n  SELECT\n    salary,\n    DENSE_RANK() OVER (\n      ORDER BY salary DESC\n    ) AS rnk\n  FROM employees\n) x\nWHERE rnk = N;</code></pre>\n      </div>\n      <p>এখানে N হলো desired rank।</p>\n      <p>Duplicate salary-এর ক্ষেত্রে DENSE_RANK এবং ROW_NUMBER-এর difference বুঝতে হবে।</p>\n    "
  },
  {
    "id": "db-135",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Duplicate"
    ],
    "question": "Duplicate email delete করার সময় কীভাবে একটি record রেখে বাকিগুলো delete করবেন?",
    "answer": "\n      <h4>Conceptually:</h4>\n      <p>ROW_NUMBER() দিয়ে duplicate group-এর মধ্যে একটি row retain করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>WITH duplicates AS (\n  SELECT\n    id,\n    ROW_NUMBER() OVER (\n      PARTITION BY email\n      ORDER BY id\n    ) AS rn\n  FROM users\n)\nDELETE ...\nWHERE rn &gt; 1;</code></pre>\n      </div>\n      <p>Actual DELETE syntax database অনুযায়ী আলাদা হতে পারে।</p>\n      <p>Production-এ আগে SELECT দিয়ে affected rows verify করতে হবে এবং backup/transaction strategy বিবেচনা করতে হবে।</p>\n    "
  },
  {
    "id": "db-136",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Latest Record"
    ],
    "question": "প্রতিটি user-এর latest order কীভাবে বের করবেন?",
    "answer": "\n      <h4>ROW_NUMBER():</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT *\nFROM (\n  SELECT\n    o.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY user_id\n      ORDER BY created_at DESC, id DESC\n    ) AS rn\n  FROM orders o\n) x\nWHERE rn = 1;</code></pre>\n      </div>\n      <p>created_at-এর সাথে id tie-breaker রাখা useful যাতে ordering deterministic হয়।</p>\n    "
  },
  {
    "id": "db-137",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Aggregation"
    ],
    "question": "প্রতি customer-এর total order amount কীভাবে বের করবেন?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT\n  user_id,\n  SUM(total) AS total_amount\nFROM orders\nGROUP BY user_id;</code></pre>\n      </div>\n      <h4>যদি order না থাকা user-ও দেখতে হয়:</h4>\n      <p>users<br>LEFT JOIN orders<br>GROUP BY users.id</p>\n      <p>এবং NULL amount-এর জন্য COALESCE ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "db-138",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Date"
    ],
    "question": "গত 30 দিনের orders কীভাবে বের করবেন?",
    "answer": "\n      <p>Database-specific date syntax আলাদা।</p>\n      <h4>Concept:</h4>\n      <p>WHERE created_at &gt;= CURRENT_TIME_OR_DATE - INTERVAL 30 DAY</p>\n      <h4>MySQL-এ:</h4>\n      <p>WHERE created_at &gt;= NOW() - INTERVAL 30 DAY</p>\n      <h4>PostgreSQL-এ:</h4>\n      <p>WHERE created_at &gt;= NOW() - INTERVAL '30 days'</p>\n      <p>Production query-তে timezone এবং timestamp semantics অবশ্যই consider করতে হবে।</p>\n    "
  },
  {
    "id": "db-139",
    "category": "SQL Interview",
    "difficulty": "Very Important",
    "tags": [
      "SQL",
      "Aggregation"
    ],
    "question": "প্রতি মাসে কত order হয়েছে কীভাবে বের করবেন?",
    "answer": "\n      <p>Database-specific date grouping ব্যবহার করা যায়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>year + month\n ↓\nGROUP BY\n ↓\nCOUNT(*)</code></pre>\n      </div>\n      <h4>PostgreSQL example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT\n  DATE_TRUNC('month', created_at) AS month,\n  COUNT(*)\nFROM orders\nGROUP BY DATE_TRUNC('month', created_at)\nORDER BY month;</code></pre>\n      </div>\n      <p>Large dataset হলে function-based grouping-এর performance এবং pre-aggregation consider করা যায়।</p>\n    "
  },
  {
    "id": "db-140",
    "category": "Database Architecture",
    "difficulty": "Senior",
    "tags": [
      "Read Write Split",
      "Scaling"
    ],
    "question": "Read/Write Splitting কী?",
    "answer": "\n      <p>Application write request primary database-এ পাঠায় এবং read request replica-তে পাঠাতে পারে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n   |\n   +---- Write ----&gt; Primary\n   |\n   +---- Read -----&gt; Replica</code></pre>\n      </div>\n      <h4>কিন্তু একটি সমস্যা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Write Primary-তে\n ↓\nImmediately Read Replica\n ↓\nReplication lag\n ↓\nStale data</code></pre>\n      </div>\n      <p>তাই strong read-after-write requirement থাকলে primary read করতে হতে পারে।</p>\n    "
  },
  {
    "id": "db-141",
    "category": "Database Architecture",
    "difficulty": "Senior",
    "tags": [
      "Caching",
      "Database"
    ],
    "question": "Database-এর আগে Redis cache ব্যবহার করলে কী কী সমস্যা হতে পারে?",
    "answer": "\n      <h4>Cache performance improve করে, কিন্তু introduce করে:</h4>\n      <ul>\n        <li>Cache invalidation</li>\n        <li>Stale data</li>\n        <li>Cache stampede</li>\n        <li>Cache penetration</li>\n        <li>Cache avalanche</li>\n        <li>Memory limit</li>\n        <li>Serialization issues</li>\n      </ul>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>DB update হয়েছে\n ↓\nCache পুরনো\n ↓\nUser stale data পাচ্ছে</code></pre>\n      </div>\n      <p>তাই cache strategy-এর সাথে consistency strategy design করতে হবে।</p>\n    "
  },
  {
    "id": "db-142",
    "category": "Database Architecture",
    "difficulty": "Senior",
    "tags": [
      "Cache Stampede",
      "Redis"
    ],
    "question": "Cache Stampede কী?",
    "answer": "\n      <p>একটি popular cache key একই সময়ে অনেক request-এর জন্য expire করলে সবাই database-এ request পাঠাতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Cache expired\n ↓\n1000 requests\n ↓\n1000 DB queries\n ↓\nDB overloaded</code></pre>\n      </div>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Locking</li>\n        <li>Request coalescing</li>\n        <li>Early refresh</li>\n        <li>Randomized TTL</li>\n        <li>Stale-while-revalidate</li>\n      </ul>\n      <p>High-traffic application-এ এটি গুরুত্বপূর্ণ cache problem।</p>\n    "
  },
  {
    "id": "db-143",
    "category": "Database Architecture",
    "difficulty": "Senior",
    "tags": [
      "Cache Penetration",
      "Redis"
    ],
    "question": "Cache Penetration কী?",
    "answer": "\n      <p>যে data database-এও নেই, attacker/user বারবার সেই key request করলে cache miss হয়ে database query হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET user/999999999\nGET user/999999999\nGET user/999999999</code></pre>\n      </div>\n      <h4>যদি record না থাকে এবং cache-ও না থাকে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCache miss\n ↓\nDB query\n ↓\nNot found</code></pre>\n      </div>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Negative caching</li>\n        <li>Input validation</li>\n        <li>Bloom filter</li>\n        <li>Rate limiting</li>\n      </ul>\n    "
  },
  {
    "id": "db-144",
    "category": "Database Monitoring",
    "difficulty": "Senior",
    "tags": [
      "Monitoring",
      "Production"
    ],
    "question": "Production database-এর কোন metrics monitor করবেন?",
    "answer": "\n      <h4>Important metrics:</h4>\n      <p><strong>Performance:</strong></p>\n      <ul>\n        <li>Query latency</li>\n        <li>QPS</li>\n        <li>TPS</li>\n        <li>Slow queries</li>\n      </ul>\n      <p><strong>Resources:</strong></p>\n      <ul>\n        <li>CPU</li>\n        <li>RAM</li>\n        <li>Disk</li>\n        <li>IOPS</li>\n        <li>Network</li>\n      </ul>\n      <p><strong>Database:</strong></p>\n      <ul>\n        <li>Connections</li>\n        <li>Connection pool usage</li>\n        <li>Lock waits</li>\n        <li>Deadlocks</li>\n        <li>Buffer/cache hit ratio</li>\n        <li>Replication lag</li>\n      </ul>\n      <p><strong>Storage:</strong></p>\n      <ul>\n        <li>Database size</li>\n        <li>Table growth</li>\n        <li>Index growth</li>\n      </ul>\n      <p><strong>Availability:</strong></p>\n      <ul>\n        <li>Errors</li>\n        <li>Failover</li>\n        <li>Replica health</li>\n      </ul>\n      <p>Monitoring ছাড়া production database optimize করা কঠিন।</p>\n    "
  },
  {
    "id": "db-145",
    "category": "Database Monitoring",
    "difficulty": "Senior",
    "tags": [
      "Slow Query",
      "Monitoring"
    ],
    "question": "Slow Query Log কী?",
    "answer": "\n      <p>Slow query log এমন queries identify করতে সাহায্য করে যেগুলো configured threshold-এর বেশি সময় নেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nExecution time = 3.5 sec\n ↓\nSlow query threshold = 1 sec\n ↓\nLog</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Slow query\n ↓\nEXPLAIN\n ↓\nIndex/Query optimization</code></pre>\n      </div>\n      <p>Production performance tuning-এর জন্য slow query analysis অত্যন্ত useful।</p>\n    "
  },
  {
    "id": "db-146",
    "category": "Backup & Recovery",
    "difficulty": "Senior",
    "tags": [
      "PITR",
      "Recovery"
    ],
    "question": "Point-in-Time Recovery বা PITR কী?",
    "answer": "\n      <p>PITR হলো নির্দিষ্ট সময় পর্যন্ত database recover করার capability।</p>\n      <h4>Example:</h4>\n      <h4>Database:</h4>\n      <p>10:00 → Good<br>10:30 → Good<br>11:00 → Bad accidental DELETE<br>11:10 → Disaster noticed</p>\n      <h4>PITR থাকলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Base Backup\n +\nTransaction/WAL logs\n ↓\nRecover to 10:59:59</code></pre>\n      </div>\n      <p>এটি production database disaster recovery-এর জন্য খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-147",
    "category": "Backup & Recovery",
    "difficulty": "Senior",
    "tags": [
      "Backup",
      "Disaster Recovery"
    ],
    "question": "Backup আছে কিন্তু restore test না করলে সমস্যা কী?",
    "answer": "\n      <p>Backup file exist করা এবং backup successfully restore করা দুইটি আলাদা বিষয়।</p>\n      <p>Backup corrupt হতে পারে।</p>\n      <h4>Possible problems:</h4>\n      <ul>\n        <li>Missing files</li>\n        <li>Wrong credentials</li>\n        <li>Incompatible version</li>\n        <li>Incomplete backup</li>\n        <li>Broken restore process</li>\n      </ul>\n      <h4>তাই:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Backup\n ↓\nRestore Test\n ↓\nValidation\n ↓\nPeriodic Drill</code></pre>\n      </div>\n      <p>করতে হবে।</p>\n      <h4>Production disaster recovery-এর সবচেয়ে গুরুত্বপূর্ণ principle:</h4>\n      <p>\"Backup is not proven until restore is tested.\"</p>\n    "
  },
  {
    "id": "db-148",
    "category": "Database Security",
    "difficulty": "Very Important",
    "tags": [
      "Encryption",
      "Security"
    ],
    "question": "Encryption at Rest এবং Encryption in Transit কী?",
    "answer": "\n      <h4>Encryption at Rest:</h4>\n      <p>Disk/storage-এ থাকা data encrypted।</p>\n      <h4>Encryption in Transit:</h4>\n      <p>Application ↔ Database network communication encrypted।</p>\n      <h4>Typical:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Application\n   |\n TLS\n   |\nDatabase</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>At Rest:\nDisk\n ↓\nEncrypted storage</code></pre>\n      </div>\n      <p>Sensitive systems-এ দুই ধরনের encryption-ই গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-149",
    "category": "Database Security",
    "difficulty": "Very Important",
    "tags": [
      "Secrets",
      "Security"
    ],
    "question": "Database password কীভাবে manage করা উচিত?",
    "answer": "\n      <p>Production source code-এ database password hardcode করা উচিত নয়।</p>\n      <h4>Bad:</h4>\n      <p>DB_PASSWORD = \"my-secret\"</p>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n ↓\nSecret Manager / Environment / Vault\n ↓\nDatabase credentials</code></pre>\n      </div>\n      <h4>Important:</h4>\n      <ul>\n        <li>Secret rotation</li>\n        <li>Least privilege</li>\n        <li>Separate credentials per service/environment</li>\n        <li>No secrets in Git</li>\n        <li>Audit access</li>\n      </ul>\n      <p>Production-এ centralized secret management preferred।</p>\n    "
  },
  {
    "id": "db-150",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Troubleshooting"
    ],
    "question": "একটি API suddenly 10ms থেকে 2 seconds latency দিচ্ছে। Database issue কিনা কীভাবে বুঝবেন?",
    "answer": "\n      <h4>Step 1:</h4>\n      <p>Application metrics দেখুন।</p>\n      <p><strong>API latency:</strong><br>10ms → 2 sec</p>\n      <h4>Step 2:</h4>\n      <p>DB query latency check করুন।</p>\n      <h4>Step 3:</h4>\n      <p>Connection pool check করুন।</p>\n      <h4>Possible:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Pool exhausted\n ↓\nRequests waiting\n ↓\nAPI slow</code></pre>\n      </div>\n      <h4>Step 4:</h4>\n      <p>Slow query check করুন।</p>\n      <h4>Step 5:</h4>\n      <p>Lock wait check করুন।</p>\n      <h4>Step 6:</h4>\n      <p>Database CPU/IO check করুন।</p>\n      <h4>Step 7:</h4>\n      <p>Replication lag check করুন।</p>\n      <h4>Step 8:</h4>\n      <p>Recent deployment/index/schema change check করুন।</p>\n      <h4>Step 9:</h4>\n      <p>EXPLAIN slow queries।</p>\n      <h4>Step 10:</h4>\n      <h4>Root cause অনুযায়ী fix:</h4>\n      <ul>\n        <li>Missing index</li>\n        <li>Bad query</li>\n        <li>Lock contention</li>\n        <li>Pool sizing</li>\n        <li>DB resource saturation</li>\n        <li>Replica issue</li>\n        <li>Network problem</li>\n      </ul>\n      <p>Senior engineer-এর answer শুধু \"index add করব\" হওয়া উচিত নয়।</p>\n      <p>প্রথমে observe → measure → isolate → fix → verify করতে হবে।</p>\n    "
  },
  {
    "id": "db-151",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Scalability"
    ],
    "question": "Database scaling-এর জন্য প্রথমে কী করবেন?",
    "answer": "\n      <p>সরাসরি sharding করা উচিত নয়।</p>\n      <h4>Typical progression:</h4>\n      <ol>\n        <li>Fix bad queries</li>\n        <li>Add correct indexes</li>\n        <li>Optimize schema</li>\n        <li>Connection pooling</li>\n        <li>Add caching</li>\n        <li>Vertical scaling</li>\n        <li>Read replicas</li>\n        <li>Partition large tables</li>\n        <li>Archive old data</li>\n        <li>Sharding</li>\n      </ol>\n      <h4>Principle:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Optimize first\n ↓\nScale second\n ↓\nDistribute when necessary</code></pre>\n      </div>\n      <p>Premature sharding architecture অনেক complex করে দিতে পারে।</p>\n    "
  },
  {
    "id": "db-152",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Consistency"
    ],
    "question": "Database consistency এবং performance-এর মধ্যে trade-off কী?",
    "answer": "\n      <p>Strong consistency সাধারণত বেশি coordination/locking/communication চাইতে পারে।</p>\n      <h4>Performance/scalability-এর জন্য system কখনও:</h4>\n      <ul>\n        <li>Caching</li>\n        <li>Async processing</li>\n        <li>Read replicas</li>\n        <li>Eventual consistency</li>\n      </ul>\n      <p>ব্যবহার করে।</p>\n      <h4>Example:</h4>\n      <p><strong>Payment balance:</strong></p>\n      <ul>\n        <li>Strong consistency</li>\n      </ul>\n      <p><strong>Product view count:</strong></p>\n      <ul>\n        <li>Eventual consistency acceptable হতে পারে</li>\n      </ul>\n      <p>সব data-এর জন্য একই consistency level দরকার হয় না।</p>\n      <p>Business requirement অনুযায়ী consistency boundary define করতে হয়।</p>\n    "
  },
  {
    "id": "db-153",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Data Integrity"
    ],
    "question": "Application validation এবং Database constraint—দুটোই কেন দরকার?",
    "answer": "\n      <p>Application validation user-friendly error এবং business validation দেয়।</p>\n      <p>Database constraint শেষ layer হিসেবে data integrity enforce করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Application:\nemail format validate</code></pre>\n      </div>\n      <p><strong>Database:</strong><br>email UNIQUE</p>\n      <p>কারণ অন্য service বা bug database-এ duplicate email insert করার চেষ্টা করতে পারে।</p>\n      <h4>Layer:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API Validation\n ↓\nService Validation\n ↓\nDatabase Constraint</code></pre>\n      </div>\n      <p>Defense in depth হিসেবে এটি গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "db-154",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Microservices"
    ],
    "question": "Microservice architecture-এ কেন Database per Service ব্যবহার করা হয়?",
    "answer": "\n      <p>প্রতিটি service নিজের data-এর owner হলে coupling কমে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User Service\n ↓\nUser DB</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nOrder DB</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Payment Service\n ↓\nPayment DB</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Loose coupling</li>\n        <li>Independent deployment</li>\n        <li>Independent scaling</li>\n        <li>Service ownership</li>\n      </ul>\n      <h4>কিন্তু problem:</h4>\n      <ul>\n        <li>Cross-service query</li>\n        <li>Distributed transaction</li>\n        <li>Data duplication</li>\n        <li>Eventual consistency</li>\n      </ul>\n      <p>তাই microservice database architecture relational monolith-এর চেয়ে বেশি complex।</p>\n    "
  },
  {
    "id": "db-155",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "Microservices",
      "Database"
    ],
    "question": "Microservices-এ অন্য service-এর database direct query করা উচিত কি?",
    "answer": "\n      <p>সাধারণভাবে উচিত নয়।</p>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nPayment Service DB</code></pre>\n      </div>\n      <p>এতে tight coupling তৈরি হয়।</p>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nOrder DB</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Payment Service\n ↓\nPayment DB</code></pre>\n      </div>\n      <h4>Communication:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n   ↓\nAPI / Event\n   ↓\nPayment Service</code></pre>\n      </div>\n      <p>এতে service ownership এবং boundaries পরিষ্কার থাকে।</p>\n      <p>বিশেষ ক্ষেত্রে analytics/reporting-এর জন্য separate read model তৈরি করা যেতে পারে।</p>\n    "
  },
  {
    "id": "db-156",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "Outbox",
      "Microservices"
    ],
    "question": "Database update এবং event publish একসাথে reliableভাবে কীভাবে করবেন?",
    "answer": "\n      <h4>Problem:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>DB update successful\n ↓\nEvent publish failed</code></pre>\n      </div>\n      <p>তাহলে database এবং message broker inconsistent হয়ে যায়।</p>\n      <h4>Outbox Pattern:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>BEGIN\n ↓\nUpdate business data\n ↓\nInsert event into outbox table\n ↓\nCOMMIT\n ↓\nOutbox worker\n ↓\nPublish event\n ↓\nMark event published</code></pre>\n      </div>\n      <p>একই local transaction-এর মধ্যে business data এবং outbox event commit করা যায়।</p>\n      <p>এটি microservices-এ reliable event publishing-এর খুব common pattern।</p>\n    "
  },
  {
    "id": "db-157",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "CQRS",
      "Database"
    ],
    "question": "CQRS database architecture-এ কীভাবে ব্যবহার করা হয়?",
    "answer": "\n      <h4>CQRS:</h4>\n      <p>Command Query Responsibility Segregation</p>\n      <h4>Write model:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Command\n ↓\nWrite DB</code></pre>\n      </div>\n      <h4>Read model:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nRead DB / Projection</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Orders write model\n        ↓\n     Events\n        ↓\nRead Model\n        ↓\nDashboard</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Read optimization</li>\n        <li>Independent scaling</li>\n        <li>Specialized projections</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>Complexity</li>\n        <li>Eventual consistency</li>\n        <li>Multiple data models</li>\n      </ul>\n      <p>Simple CRUD application-এ CQRS প্রয়োজন নাও হতে পারে।</p>\n    "
  },
  {
    "id": "db-158",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "Event Sourcing",
      "Database"
    ],
    "question": "Event Sourcing কী?",
    "answer": "\n      <p>Event Sourcing-এ current state-এর বদলে state পরিবর্তনের events source of truth হিসেবে store করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>sql</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>AccountCreated\nMoneyDeposited(1000)\nMoneyWithdrawn(200)\nMoneyDeposited(500)</code></pre>\n      </div>\n      <h4>Current balance:</h4>\n      <p>1000 - 200 + 500 = 1300</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Complete history</li>\n        <li>Auditability</li>\n        <li>Replay capability</li>\n      </ul>\n      <h4>Challenges:</h4>\n      <ul>\n        <li>Event schema evolution</li>\n        <li>Storage growth</li>\n        <li>Query complexity</li>\n        <li>Eventual consistency</li>\n      </ul>\n      <p>Banking/domain-heavy systems-এ useful হতে পারে, কিন্তু সাধারণ CRUD-এর জন্য overkill হতে পারে।</p>\n    "
  },
  {
    "id": "db-159",
    "category": "Database Interview",
    "difficulty": "Senior",
    "tags": [
      "Interview",
      "Architecture"
    ],
    "question": "Database interview-এ একজন Senior Backend Engineer-এর কী কী গভীরভাবে জানা উচিত?",
    "answer": "\n      <h4>Minimum strong areas:</h4>\n      <ol>\n        <li>SQL</li>\n        <li>JOIN</li>\n        <li>GROUP BY</li>\n        <li>Subquery</li>\n        <li>CTE</li>\n        <li>Window functions</li>\n        <li>Index</li>\n        <li>B-Tree/B+Tree</li>\n        <li>Composite index</li>\n        <li>Covering index</li>\n        <li>EXPLAIN</li>\n        <li>Query optimization</li>\n        <li>ACID</li>\n        <li>Transactions</li>\n        <li>Isolation levels</li>\n        <li>MVCC</li>\n        <li>Locks</li>\n        <li>Deadlocks</li>\n        <li>Optimistic locking</li>\n        <li>Pessimistic locking</li>\n        <li>Buffer pool</li>\n        <li>Redo/WAL</li>\n        <li>Undo</li>\n        <li>Replication</li>\n        <li>Replication lag</li>\n        <li>Read replica</li>\n        <li>Partitioning</li>\n        <li>Sharding</li>\n        <li>Caching</li>\n        <li>Redis</li>\n        <li>Backup</li>\n        <li>PITR</li>\n        <li>RPO/RTO</li>\n        <li>Security</li>\n        <li>SQL injection</li>\n        <li>Database migrations</li>\n        <li>Zero-downtime migration</li>\n        <li>Microservice database ownership</li>\n        <li>Outbox</li>\n        <li>Distributed transaction</li>\n        <li>CQRS</li>\n        <li>Event sourcing</li>\n      </ol>\n      <p>Senior level-এ শুধু definition নয়।</p>\n      <h4>আপনাকে explain করতে হবে:</h4>\n      <p>\"What happens internally?\"<br>\"Why?\"<br>\"When should I use it?\"<br>\"What are the trade-offs?\"<br>\"How would I debug it in production?\"</p>\n    "
  }
];
