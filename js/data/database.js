const databaseInterviewQuestionsPart1 = [
	// ============================================================
	// PART 1 — DATABASE FUNDAMENTALS
	// ============================================================

	{
		id: "db-1",
		category: "Database",
		difficulty: "Beginner",
		tags: ["Database", "Fundamentals"],
		question: "Database কী?",
		answer: `Database হলো structuredভাবে data store, manage, retrieve এবং update করার system।

উদাহরণ:

User:
- id
- name
- email

Product:
- id
- name
- price

Order:
- id
- user_id
- total

Application
    ↓
Database
    ↓
Stored Data

Database ব্যবহারের মূল উদ্দেশ্য:

- Data persistence
- Fast retrieval
- Data consistency
- Concurrent access
- Security
- Backup & recovery

Common database types:

1. Relational Database
   - MySQL
   - PostgreSQL
   - Oracle
   - SQL Server

2. NoSQL
   - MongoDB
   - Redis
   - Cassandra
   - DynamoDB

Relational database structured/tabular data এবং relationship-এর জন্য খুব শক্তিশালী।`,
	},

	{
		id: "db-2",
		category: "Database",
		difficulty: "Very Important",
		tags: ["SQL", "NoSQL"],
		question: "SQL এবং NoSQL Database-এর মধ্যে পার্থক্য কী?",
		answer: `SQL database সাধারণত relational এবং table-based।

Example:

Users
Orders
Products

Relationship:

Users
  ↓
Orders
  ↓
Products

Examples:
- MySQL
- PostgreSQL
- Oracle

NoSQL database বিভিন্ন data model ব্যবহার করতে পারে।

Examples:

MongoDB → Document
Redis → Key-Value
Cassandra → Wide Column
Neo4j → Graph

SQL ভালো যখন:

- Strong relationships
- Transactions
- Complex queries
- ACID consistency
- Structured schema

NoSQL ভালো হতে পারে যখন:

- Flexible schema
- Massive scale
- High throughput
- Specific access patterns
- Distributed architecture

SQL বনাম NoSQL কোনো absolute winner নয়। Application requirement অনুযায়ী নির্বাচন করতে হয়।`,
	},

	{
		id: "db-3",
		category: "Database",
		difficulty: "Very Important",
		tags: ["RDBMS", "SQL"],
		question: "RDBMS কী?",
		answer: `RDBMS = Relational Database Management System।

এখানে data table এবং relationship-এর মাধ্যমে store করা হয়।

Example:

users

id | name | email
---|------|------
1  | A    | a@test.com
2  | B    | b@test.com

orders

id | user_id | amount
---|---------|-------
1  | 1       | 500
2  | 2       | 700

users.id
    ↓
orders.user_id

Popular RDBMS:

- MySQL
- PostgreSQL
- Oracle
- SQL Server

RDBMS-এর গুরুত্বপূর্ণ features:

- Tables
- Primary Key
- Foreign Key
- Constraints
- Transactions
- Indexes
- Joins`,
	},

	{
		id: "db-4",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Schema", "Database Design"],
		question: "Database Schema কী?",
		answer: `Schema হলো database-এর logical structure।

এতে define করা হয়:

- Tables
- Columns
- Data types
- Relationships
- Constraints
- Indexes
- Views

Example:

users
  ├── id INT
  ├── name VARCHAR
  ├── email VARCHAR
  └── created_at DATETIME

orders
  ├── id INT
  ├── user_id INT
  └── total DECIMAL

Schema application-এর data structure এবং relationship define করে।`,
	},

	{
		id: "db-5",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Primary Key", "Constraints"],
		question: "Primary Key কী?",
		answer: `Primary Key হলো table-এর প্রতিটি row uniquely identify করার key।

Example:

users

id | name
---|-----
1  | Nazmul
2  | Rahim

এখানে id হলো Primary Key।

Primary Key-এর বৈশিষ্ট্য:

- Unique
- NULL হতে পারে না
- প্রতিটি row uniquely identify করে
- একটি table-এ সাধারণত একটি primary key constraint থাকে

Primary key single column বা composite হতে পারে।`,
	},

	{
		id: "db-6",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Foreign Key", "Relationship"],
		question: "Foreign Key কী?",
		answer: `Foreign Key একটি table-এর column যা অন্য table-এর primary/unique key reference করে।

Example:

users:
id | name
---|-----
1  | A

orders:
id | user_id
---|--------
10 | 1

orders.user_id
      ↓
users.id

এটি referential integrity maintain করতে সাহায্য করে।

Foreign Key নিশ্চিত করতে পারে যে order-এর user_id valid user-এর দিকে reference করছে।`,
	},

	{
		id: "db-7",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Candidate Key", "Keys"],
		question: "Primary Key, Candidate Key এবং Alternate Key কী?",
		answer: `Candidate Key:

যে column/column combination uniquely row identify করতে পারে।

Example:

users:

id
email
phone

যদি id, email এবং phone প্রত্যেকটি unique হয়, তাহলে এগুলো candidate key হতে পারে।

Primary Key:

Candidate key-গুলোর মধ্যে যেটিকে primary identifier হিসেবে select করা হয়।

Alternate Key:

যে candidate key primary key হিসেবে select হয়নি।

Example:

Candidate:
- id
- email

Primary:
- id

Alternate:
- email`,
	},

	{
		id: "db-8",
		category: "Database",
		difficulty: "Important",
		tags: ["Composite Key"],
		question: "Composite Primary Key কী?",
		answer: `একাধিক column মিলে primary key তৈরি হলে সেটি composite primary key।

Example:

order_items

order_id
product_id
quantity

Primary Key:

(order_id, product_id)

কারণ একই order-এর মধ্যে একই product একবারই থাকতে পারে।

Composite key relationship/junction table-এ খুব common।`,
	},

	{
		id: "db-9",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Constraints"],
		question: "Database Constraint কী কী?",
		answer: `Constraint data integrity enforce করে।

Common constraints:

1. PRIMARY KEY
2. FOREIGN KEY
3. UNIQUE
4. NOT NULL
5. CHECK
6. DEFAULT

Example:

email VARCHAR(255) UNIQUE NOT NULL

এতে:

- NULL allow করবে না
- Duplicate email allow করবে না

Database-level constraint application bug-এর বিরুদ্ধেও data integrity protect করতে সাহায্য করে।`,
	},

	{
		id: "db-10",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Normalization", "Design"],
		question: "Database Normalization কী?",
		answer: `Normalization হলো data redundancy এবং update anomaly কমানোর জন্য database structure organize করার process।

ধরা যাক:

orders

order_id
customer_name
customer_phone
product_name
product_price

একই customer information বারবার store হচ্ছে।

Normalize করলে:

customers
orders
products
order_items

এভাবে আলাদা entity তৈরি করা যায়।

Benefits:

- Duplicate data কমে
- Update consistency বাড়ে
- Insert anomaly কমে
- Delete anomaly কমে

Common normal forms:

1NF
2NF
3NF
BCNF`,
	},

	{
		id: "db-11",
		category: "Database",
		difficulty: "Very Important",
		tags: ["1NF", "Normalization"],
		question: "1NF কী?",
		answer: `1NF = First Normal Form।

মূল ধারণা:

- Atomic values
- Repeating groups না থাকা
- একটি cell-এ multiple values না রাখা

Bad:

user_id | phones
--------|----------------
1       | 017..., 018...

Better:

user_id | phone
--------|---------
1       | 017...
1       | 018...

অর্থাৎ একটি column-এর প্রতিটি cell-এ atomic value থাকা উচিত।`,
	},

	{
		id: "db-12",
		category: "Database",
		difficulty: "Very Important",
		tags: ["2NF", "Normalization"],
		question: "2NF কী?",
		answer: `2NF-এর জন্য:

1. Table অবশ্যই 1NF-এ থাকতে হবে।
2. Non-key attribute পুরো composite key-এর উপর depend করতে হবে।

Partial dependency থাকতে পারবে না।

এটি বিশেষ করে composite primary key-এর ক্ষেত্রে গুরুত্বপূর্ণ।

যদি:

(order_id, product_id)

হয় primary key এবং product_name শুধু product_id-এর উপর depend করে, তাহলে product information আলাদা product table-এ রাখা উচিত।`,
	},

	{
		id: "db-13",
		category: "Database",
		difficulty: "Very Important",
		tags: ["3NF", "Normalization"],
		question: "3NF কী?",
		answer: `3NF-এর জন্য:

- Table 2NF-এ থাকতে হবে
- Transitive dependency avoid করতে হবে

Example:

employee_id
department_id
department_name

এখানে:

employee_id
   ↓
department_id
   ↓
department_name

department_name employee_id-এর direct property নয়।

Better:

employees
- employee_id
- department_id

departments
- department_id
- department_name`,
	},

	{
		id: "db-14",
		category: "Database",
		difficulty: "Important",
		tags: ["Denormalization", "Performance"],
		question: "Denormalization কী এবং কখন ব্যবহার করবেন?",
		answer: `Denormalization হলো performance বা read efficiency-এর জন্য intentionally কিছু redundant data রাখা।

Normalized:

Order
 ↓
Customer
 ↓
Address

অনেক join লাগতে পারে।

Denormalized:

Order
 ├── customer_name
 ├── customer_phone
 └── shipping_address

Benefits:

- Faster reads
- Fewer joins
- Better reporting performance

Trade-off:

- Duplicate data
- More complex updates
- Consistency risk

High-read system বা reporting workload-এ carefully ব্যবহার করা যায়।`,
	},

	// ============================================================
	// SQL BASICS
	// ============================================================

	{
		id: "db-15",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["SELECT", "Query"],
		question: "SQL SELECT কী?",
		answer: `SELECT database থেকে data retrieve করার জন্য ব্যবহৃত হয়।

Example:

SELECT id, name, email
FROM users;

Specific condition:

SELECT *
FROM users
WHERE status = 'active';

SQL query সাধারণত declarative।

আপনি কী result চান তা বলেন; database optimizer execution plan তৈরি করে।`,
	},

	{
		id: "db-16",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["WHERE", "Filtering"],
		question: "WHERE এবং HAVING-এর মধ্যে পার্থক্য কী?",
		answer: `WHERE individual rows filter করে।

HAVING grouped result filter করে।

Example:

SELECT department_id, COUNT(*)
FROM employees
WHERE status = 'active'
GROUP BY department_id
HAVING COUNT(*) > 10;

Execution concept:

FROM
 ↓
WHERE
 ↓
GROUP BY
 ↓
HAVING
 ↓
SELECT
 ↓
ORDER BY
 ↓
LIMIT

WHERE aggregation-এর আগে filter করে।

HAVING aggregation-এর পরে filter করে।`,
	},

	{
		id: "db-17",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["GROUP BY", "Aggregation"],
		question: "GROUP BY কী?",
		answer: `GROUP BY একই ধরনের value অনুযায়ী rows group করে।

Example:

SELECT department_id, COUNT(*)
FROM employees
GROUP BY department_id;

Result:

department_id | count
--------------|------
1             | 20
2             | 15
3             | 30

Common aggregate functions:

- COUNT()
- SUM()
- AVG()
- MIN()
- MAX()`,
	},

	{
		id: "db-18",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["JOIN", "SQL"],
		question: "SQL JOIN কী?",
		answer: `JOIN multiple table-এর related data combine করে।

Example:

users
orders

users.id = orders.user_id

Common JOIN:

- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL OUTER JOIN
- CROSS JOIN

Example:

SELECT users.name, orders.total
FROM users
INNER JOIN orders
ON users.id = orders.user_id;

JOIN database design এবং interview-এর সবচেয়ে গুরুত্বপূর্ণ SQL topics-এর একটি।`,
	},

	{
		id: "db-19",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["INNER JOIN"],
		question: "INNER JOIN কী?",
		answer: `INNER JOIN দুই table-এর matching rows return করে।

Users:

1 A
2 B

Orders:

user_id = 1

INNER JOIN করলে শুধু A-এর order result পাওয়া যাবে।

অর্থাৎ:

A → match
B → no match → বাদ

যখন দুই side-এই matching data দরকার তখন INNER JOIN ব্যবহার করা হয়।`,
	},

	{
		id: "db-20",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["LEFT JOIN"],
		question: "LEFT JOIN কী?",
		answer: `LEFT JOIN left table-এর সব row রাখে।

Example:

users
LEFT JOIN orders

যে user-এর order নেই তার order columns NULL হবে।

এটি useful:

"সব user এবং তাদের order থাকলে order দেখাও"

Example:

SELECT u.name, o.id
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id;`,
	},

	{
		id: "db-21",
		category: "SQL",
		difficulty: "Important",
		tags: ["RIGHT JOIN", "FULL JOIN"],
		question: "RIGHT JOIN এবং FULL OUTER JOIN কী?",
		answer: `RIGHT JOIN right table-এর সব row রাখে।

FULL OUTER JOIN দুই table-এর সব row রাখে এবং match না হলে missing side NULL হয়।

তবে সব database একইভাবে FULL OUTER JOIN support করে না।

MySQL-এ FULL OUTER JOIN nativeভাবে নেই; UNION দিয়ে equivalent result তৈরি করা যায়।

Practical application-এ INNER এবং LEFT JOIN সবচেয়ে বেশি ব্যবহৃত হয়।`,
	},

	{
		id: "db-22",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["Subquery", "SQL"],
		question: "Subquery কী?",
		answer: `একটি SQL query-এর ভিতরে আরেকটি query থাকলে সেটি subquery।

Example:

SELECT *
FROM employees
WHERE salary > (
  SELECT AVG(salary)
  FROM employees
);

Inner query:

SELECT AVG(salary)

Outer query:

salary > average

Subquery SELECT, WHERE, FROM ইত্যাদি জায়গায় ব্যবহার হতে পারে।`,
	},

	{
		id: "db-23",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["CTE", "WITH"],
		question: "CTE কী?",
		answer: `CTE = Common Table Expression।

WITH clause ব্যবহার করে temporary named result তৈরি করা হয়।

Example:

WITH active_users AS (
  SELECT *
  FROM users
  WHERE status = 'active'
)
SELECT *
FROM active_users;

Benefits:

- Readability
- Complex query simplify
- Recursive query support
- Query organization

Complex reporting query-তে CTE খুব useful।`,
	},

	{
		id: "db-24",
		category: "SQL",
		difficulty: "Important",
		tags: ["Window Function", "SQL"],
		question: "Window Function কী?",
		answer: `Window function rows collapse না করে related rows-এর উপর calculation করে।

Example:

ROW_NUMBER()
RANK()
DENSE_RANK()
SUM() OVER()
AVG() OVER()

Example:

SELECT
  employee_id,
  department_id,
  salary,
  RANK() OVER(
    PARTITION BY department_id
    ORDER BY salary DESC
  ) AS rank
FROM employees;

এটি প্রতি department-এর salary ranking করতে পারে।`,
	},

	{
		id: "db-25",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["UNION", "UNION ALL"],
		question: "UNION এবং UNION ALL-এর মধ্যে পার্থক্য কী?",
		answer: `UNION duplicate rows remove করে।

UNION ALL duplicate rows remove করে না।

তাই UNION ALL সাধারণত faster কারণ duplicate elimination করতে হয় না।

যদি duplicate intentionally valid হয় এবং শুধু combine করতে চান:

UNION ALL

ব্যবহার করা ভালো।`,
	},

	{
		id: "db-26",
		category: "SQL",
		difficulty: "Important",
		tags: ["NULL", "SQL"],
		question: "SQL NULL কী এবং কেন এটি tricky?",
		answer: `NULL মানে unknown বা missing value।

NULL:

0 নয়
empty string নয়
false নয়

তাই:

WHERE column = NULL

সঠিক নয়।

ব্যবহার করতে হবে:

WHERE column IS NULL

অথবা:

WHERE column IS NOT NULL

NULL-এর কারণে three-valued logic তৈরি হয়:

TRUE
FALSE
UNKNOWN

Interview-এ এটি খুব common প্রশ্ন।`,
	},

	{
		id: "db-27",
		category: "SQL",
		difficulty: "Very Important",
		tags: ["DELETE", "TRUNCATE", "DROP"],
		question: "DELETE, TRUNCATE এবং DROP-এর মধ্যে পার্থক্য কী?",
		answer: `DELETE:

Table-এর selected rows delete করে।

DELETE FROM users
WHERE id = 10;

TRUNCATE:

Table-এর সব rows দ্রুত remove করে এবং সাধারণত table structure রাখে।

TRUNCATE TABLE users;

DROP:

Table structure-সহ object remove করে।

DROP TABLE users;

সাধারণভাবে:

DELETE → rows
TRUNCATE → all rows
DROP → table/object`,
	},

	// ============================================================
	// INDEXING
	// ============================================================

	{
		id: "db-28",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Index", "Performance"],
		question: "Database Index কী?",
		answer: `Index হলো database-এর data retrieval দ্রুত করার জন্য তৈরি করা auxiliary data structure।

Without index:

Query
 ↓
Scan many rows
 ↓
Find matching row

With index:

Query
 ↓
Index lookup
 ↓
Relevant row/location
 ↓
Data

Index সাধারণত read performance বাড়ায়।

কিন্তু trade-off:

- Extra disk space
- INSERT slower
- UPDATE slower
- DELETE maintenance cost

তাই সব column-এ index দেওয়া উচিত নয়।`,
	},

	{
		id: "db-29",
		category: "Database",
		difficulty: "Very Important",
		tags: ["B-Tree", "Index"],
		question: "B-Tree/B+Tree Index কী?",
		answer: `Relational database-এ B-Tree family index খুব common।

এটি balanced tree structure ব্যবহার করে efficient search করতে সাহায্য করে।

Concept:

             Root
            /    \
          Node   Node
         /  \    /  \
       Leaf Leaf Leaf Leaf

B+Tree-তে data references leaf level-এ সংগঠিত থাকে এবং leaf nodes linked থাকতে পারে।

এটি efficient:

- Equality search
- Range search
- ORDER BY
- Prefix-related operations

যেমন:

WHERE age BETWEEN 20 AND 30

Index range scan করতে পারে।`,
	},

	{
		id: "db-30",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Clustered Index", "Primary Key"],
		question: "Clustered Index কী?",
		answer: `Clustered index table-এর data storage/order-এর সাথে closely associated।

InnoDB/MySQL-এ primary key clustered index হিসেবে ব্যবহৃত হয়।

Concept:

Primary Key
 ↓
Clustered Index
 ↓
Row data

তাই primary key নির্বাচন গুরুত্বপূর্ণ।

একটি table-এর clustered storage order একটিই হতে পারে।`,
	},

	{
		id: "db-31",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Secondary Index", "Non-Clustered"],
		question: "Secondary/Non-Clustered Index কী?",
		answer: `Primary/clustered index ছাড়া অন্য column-এর উপর তৈরি index secondary index।

Example:

CREATE INDEX idx_users_email
ON users(email);

Query:

WHERE email = 'a@test.com'

এই index ব্যবহার করতে পারে।

In clustered-storage systems, secondary index থেকে matching primary key/row locator পাওয়া যায় এবং পরে actual row fetch হতে পারে।`,
	},

	{
		id: "db-32",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Composite Index"],
		question: "Composite Index কী?",
		answer: `একাধিক column নিয়ে তৈরি index হলো composite index।

Example:

CREATE INDEX idx_orders_user_status
ON orders(user_id, status);

এটি useful হতে পারে:

WHERE user_id = ?
AND status = ?

Index order গুরুত্বপূর্ণ।

Index:

(user_id, status)

সাধারণত user_id দিয়ে filtering-এর ক্ষেত্রে ব্যবহারযোগ্য, কিন্তু শুধু status দিয়ে query করলে একই index সবসময় efficient হবে না।

এটিকে leftmost-prefix principle-এর সাথে relate করা হয়।`,
	},

	{
		id: "db-33",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Covering Index"],
		question: "Covering Index কী?",
		answer: `যখন query-এর প্রয়োজনীয় columns index-এর মধ্যেই পাওয়া যায় এবং table row-তে আলাদা lookup করতে হয় না, তখন index query cover করতে পারে।

Example:

INDEX(user_id, status, created_at)

Query:

SELECT user_id, status, created_at
FROM orders
WHERE user_id = 10;

Index থেকেই প্রয়োজনীয় data পাওয়া যেতে পারে।

এতে table lookup কমে performance improve হতে পারে।`,
	},

	{
		id: "db-34",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Query Optimization", "EXPLAIN"],
		question: "EXPLAIN কী?",
		answer: `EXPLAIN query optimizer কীভাবে query execute করতে চায় তা দেখায়।

এতে দেখা যেতে পারে:

- Access type
- Possible indexes
- Chosen index
- Estimated rows
- Join strategy
- Extra operations

Example:

EXPLAIN
SELECT *
FROM orders
WHERE user_id = 10;

Performance debugging-এর জন্য EXPLAIN অত্যন্ত গুরুত্বপূর্ণ।

Actual runtime behavior বুঝতে database-specific EXPLAIN ANALYZE-ও useful হতে পারে।`,
	},

	{
		id: "db-35",
		category: "Database",
		difficulty: "Senior",
		tags: ["SARGable", "Performance"],
		question: "SARGable query কী?",
		answer: `SARGable query এমন query যেখানে database index efficiently ব্যবহার করতে পারে।

Bad:

WHERE YEAR(created_at) = 2026

কারণ column-এর উপর function প্রয়োগ করা হয়েছে।

Better:

WHERE created_at >= '2026-01-01'
AND created_at < '2027-01-01'

এতে index range scan-এর সুযোগ বেশি থাকে।

Performance tuning-এ function-on-column, implicit conversion এবং leading wildcard-এর মতো patterns খেয়াল করতে হয়।`,
	},

	// ============================================================
	// TRANSACTION & ACID
	// ============================================================

	{
		id: "db-36",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Transaction", "ACID"],
		question: "Database Transaction কী?",
		answer: `Transaction হলো এক বা একাধিক database operation-এর logical unit।

Example:

Transfer:

Account A
 ↓
-1000

Account B
 ↓
+1000

দুটো operation সফল হলে COMMIT।

কোনো operation fail হলে ROLLBACK।

Goal:

একটি consistent business operation হিসেবে changes handle করা।`,
	},

	{
		id: "db-37",
		category: "Database",
		difficulty: "Very Important",
		tags: ["ACID"],
		question: "ACID কী?",
		answer: `ACID:

A = Atomicity
C = Consistency
I = Isolation
D = Durability

Atomicity:
সব operation হবে অথবা কিছুই হবে না।

Consistency:
Transaction database constraints/invariants maintain করবে।

Isolation:
Concurrent transaction একে অন্যের intermediate state থেকে appropriately isolated থাকবে।

Durability:
Commit হওয়ার পরে data crash-এর পরেও recoverable থাকবে।

Banking/payment system-এ ACID অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-38",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Commit", "Rollback"],
		question: "COMMIT এবং ROLLBACK কী?",
		answer: `COMMIT:

Transaction-এর changes permanently commit করে।

ROLLBACK:

Transaction-এর uncommitted changes undo করে।

Example:

BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;

কোনো error হলে:

ROLLBACK;

Transaction boundary carefully design করা গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-39",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Isolation Level", "Concurrency"],
		question: "Transaction Isolation Level কী?",
		answer: `Isolation level concurrent transactions-এর মধ্যে visibility/interaction control করে।

Common levels:

1. READ UNCOMMITTED
2. READ COMMITTED
3. REPEATABLE READ
4. SERIALIZABLE

Higher isolation সাধারণত consistency বাড়ায় কিন্তু concurrency/performance cost বাড়াতে পারে।

Common anomalies:

- Dirty Read
- Non-repeatable Read
- Phantom Read

Database-specific implementation ভিন্ন হতে পারে।`,
	},

	{
		id: "db-40",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Dirty Read", "Concurrency"],
		question: "Dirty Read কী?",
		answer: `একটি transaction অন্য transaction-এর uncommitted data read করলে dirty read হয়।

Transaction A:

UPDATE balance = 5000
কিন্তু এখনও COMMIT করেনি।

Transaction B:

balance = 5000 read করল।

তারপর A rollback করল।

তাহলে B এমন data read করেছে যা কখনো committed হয়নি।

এটাই dirty read।`,
	},

	{
		id: "db-41",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Non-repeatable Read", "Concurrency"],
		question: "Non-repeatable Read কী?",
		answer: `একই transaction-এ একই row দুইবার read করে দুইবার different value পাওয়া গেলে non-repeatable read হতে পারে।

Transaction A:

Read balance = 1000

Transaction B:

Update balance = 2000
Commit

Transaction A:

Read balance = 2000

একই transaction-এর মধ্যে একই row-এর value পরিবর্তিত হয়েছে।`,
	},

	{
		id: "db-42",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Phantom Read", "Concurrency"],
		question: "Phantom Read কী?",
		answer: `একই query পুনরায় execute করলে নতুন matching rows দেখা গেলে phantom read।

Example:

SELECT COUNT(*)
FROM orders
WHERE amount > 1000;

প্রথমে 10 rows।

অন্য transaction নতুন matching order insert করল।

পুনরায় query করলে 11 rows।

নতুন row-টি phantom row হিসেবে দেখা যায়।`,
	},

	{
		id: "db-43",
		category: "Database",
		difficulty: "Very Important",
		tags: ["MVCC", "Concurrency"],
		question: "MVCC কী?",
		answer: `MVCC = Multi-Version Concurrency Control।

Database একই data-এর multiple versions ব্যবহার করে concurrent reads/writes manage করতে পারে।

Concept:

Transaction A → Version 1
Transaction B → Version 2

এতে অনেক ক্ষেত্রে reader এবং writer একে অপরকে কম block করে।

PostgreSQL এবং InnoDB-style systems MVCC ব্যবহার করে।

MVCC-এর details database engine-specific।`,
	},

	// ============================================================
	// LOCKING & CONCURRENCY
	// ============================================================

	{
		id: "db-44",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Locking", "Concurrency"],
		question: "Database Lock কী?",
		answer: `Lock concurrent transaction-এর access control করতে ব্যবহৃত হয়।

Common:

- Shared lock
- Exclusive lock
- Row lock
- Table lock

Example:

SELECT *
FROM accounts
WHERE id = 1
FOR UPDATE;

এটি row-level locking-এর জন্য ব্যবহৃত হতে পারে।

Payment/order/inventory system-এ locking গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-45",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Pessimistic Locking"],
		question: "Pessimistic Locking কী?",
		answer: `Pessimistic locking ধরে নেয় যে conflict হওয়ার সম্ভাবনা আছে।

তাই আগে থেকেই lock নেয়।

Example:

SELECT stock
FROM products
WHERE id = 10
FOR UPDATE;

তারপর stock update করা হয়।

Useful:

- Inventory
- Financial transactions
- Highly contended rows

Trade-off:

- Lock contention
- Deadlock possibility
- Reduced concurrency`,
	},

	{
		id: "db-46",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Optimistic Locking"],
		question: "Optimistic Locking কী?",
		answer: `Optimistic locking ধরে নেয় conflict কম হবে।

Row-তে version রাখা হয়।

Example:

id | stock | version
---|-------|--------
10 | 20    | 5

Update:

UPDATE products
SET stock = 19,
    version = 6
WHERE id = 10
AND version = 5;

যদি affected rows = 0 হয়, তাহলে অন্য কেউ আগে update করেছে।

এতে explicit database lock কম লাগে।`,
	},

	{
		id: "db-47",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Deadlock", "Concurrency"],
		question: "Database Deadlock কী?",
		answer: `দুই বা তার বেশি transaction একে অপরের lock release-এর জন্য অপেক্ষা করলে deadlock হয়।

Example:

Transaction A:
Lock Row 1
 ↓
Wait Row 2

Transaction B:
Lock Row 2
 ↓
Wait Row 1

A waits for B
B waits for A

এটাই deadlock।

Prevent:

- Consistent lock ordering
- Short transactions
- Proper indexes
- Avoid unnecessary locks
- Retry after deadlock detection`,
	},

	{
		id: "db-48",
		category: "Database",
		difficulty: "Senior",
		tags: ["Connection Pool", "Performance"],
		question: "Database Connection Pool কী?",
		answer: `Application প্রতিবার নতুন DB connection না খুলে reusable connection pool ব্যবহার করে।

Application
 ↓
Connection Pool
 ├── Conn 1
 ├── Conn 2
 ├── Conn 3
 └── Conn N
 ↓
Database

Benefits:

- Lower connection overhead
- Better throughput
- Connection count control

Pool size খুব বড় করলেই performance বাড়বে না।

Database-এর CPU, workload এবং maximum connection capacity অনুযায়ী tune করতে হয়।`,
	},

	// ============================================================
	// DATABASE STORAGE / INTERNALS
	// ============================================================

	{
		id: "db-49",
		category: "Database",
		difficulty: "Senior",
		tags: ["Buffer Pool", "InnoDB", "Internals"],
		question: "Database Buffer Pool কী?",
		answer: `Buffer pool হলো memory area যেখানে database frequently accessed data/index pages cache করে।

Query
 ↓
Buffer Pool
 ├── Page found → Memory থেকে read
 └── Page missing
       ↓
      Disk
       ↓
  Buffer Pool
       ↓
      Query

Memory থেকে read disk-এর চেয়ে অনেক faster।

InnoDB-তে buffer pool অত্যন্ত গুরুত্বপূর্ণ performance component।`,
	},

	{
		id: "db-50",
		category: "Database",
		difficulty: "Senior",
		tags: ["Redo Log", "WAL", "Durability"],
		question: "Redo Log/WAL কী?",
		answer: `Database durability এবং crash recovery-এর জন্য log-based mechanism ব্যবহার করে।

Simplified flow:

Application
 ↓
Transaction
 ↓
Memory/Buffer
 ↓
Redo Log / WAL
 ↓
Commit
 ↓
Disk pages later flushed

Crash হলে database log ব্যবহার করে committed changes recover করতে পারে।

MySQL InnoDB-তে Redo Log এবং PostgreSQL-এ WAL গুরুত্বপূর্ণ concepts।`,
	},

	{
		id: "db-51",
		category: "Database",
		difficulty: "Senior",
		tags: ["Write-Ahead Logging", "WAL"],
		question: "WAL কী?",
		answer: `WAL = Write-Ahead Logging।

মূল ধারণা:

Data page disk-এ পরিবর্তন করার আগে corresponding log record durable করতে হবে।

Concept:

Change
 ↓
WAL
 ↓
Durable
 ↓
Data Page

Crash হলে WAL replay করে database recovery করতে পারে।

PostgreSQL-এর architecture বুঝতে WAL খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-52",
		category: "Database",
		difficulty: "Senior",
		tags: ["Checkpoint", "Recovery"],
		question: "Database Checkpoint কী?",
		answer: `Checkpoint হলো recovery process সহজ করার জন্য database-এর dirty pages/log state-এর একটি consistent progress point তৈরি করা।

Crash recovery:

Last checkpoint
 ↓
Replay necessary logs
 ↓
Recover database

Checkpoint frequency performance এবং recovery time-এর মধ্যে trade-off তৈরি করে।`,
	},

	// ============================================================
	// QUERY PERFORMANCE
	// ============================================================

	{
		id: "db-53",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Performance", "N+1"],
		question: "N+1 Query Problem কী?",
		answer: `প্রথমে 1টি query করে parent records আনা হয়, তারপর প্রতিটি parent-এর জন্য আলাদা query করা হলে N+1 problem হয়।

Example:

1 query:
SELECT * FROM users;

তারপর:

User 1 → orders query
User 2 → orders query
User 3 → orders query
...
User N → orders query

Total:

1 + N queries

Solution:

- JOIN
- Batch query
- Eager loading
- DataLoader pattern
- Proper aggregation

ORM ব্যবহার করার সময় N+1 বিশেষভাবে খেয়াল করতে হয়।`,
	},

	{
		id: "db-54",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Slow Query", "Optimization"],
		question: "একটি SQL query slow হলে কীভাবে optimize করবেন?",
		answer: `Step-by-step:

1. Query identify করুন
2. Execution time measure করুন
3. EXPLAIN/EXPLAIN ANALYZE করুন
4. Index usage check করুন
5. Full table scan আছে কি দেখুন
6. Join condition check করুন
7. Returned rows কমান
8. SELECT * avoid করুন
9. Query structure optimize করুন
10. Data distribution/statistics check করুন

তারপর:

- Proper index
- Composite index
- Query rewrite
- Pagination
- Pre-aggregation
- Cache

ব্যবহার করা যায়।

Blindly index add করা উচিত নয়।`,
	},

	{
		id: "db-55",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Pagination", "Performance"],
		question: "OFFSET pagination এবং Cursor pagination-এর পার্থক্য কী?",
		answer: `OFFSET:

SELECT *
FROM products
ORDER BY id
LIMIT 20 OFFSET 100000;

Large offset হলে database অনেক row skip করতে পারে।

Cursor:

WHERE id > last_seen_id
ORDER BY id
LIMIT 20;

Large dataset-এ cursor pagination অনেক সময় বেশি efficient।

Cursor pagination high-volume feed/order system-এ useful।

তবে cursor design-এর জন্য stable ordering এবং unique tie-breaker দরকার।`,
	},

	{
		id: "db-56",
		category: "Database",
		difficulty: "Senior",
		tags: ["Read Replica", "Scaling"],
		question: "Read Replica কী?",
		answer: `Primary database write handle করে এবং replica read traffic serve করতে পারে।

Architecture:

Application
   ↓
Primary
 ├── Write
 └── Replication
       ↓
   Replica 1
   Replica 2
       ↓
     Reads

Benefits:

- Read scaling
- Reporting isolation
- Reduced primary load

Trade-off:

Replication lag থাকতে পারে।

তাই immediately-after-write read-এর consistency requirement বুঝতে হবে।`,
	},

	{
		id: "db-57",
		category: "Database",
		difficulty: "Senior",
		tags: ["Replication", "High Availability"],
		question: "Database Replication কী?",
		answer: `এক database-এর data অন্য database node-এ replicate করা হলো replication।

Possible models:

- Primary/Replica
- Synchronous
- Asynchronous
- Multi-primary

Use cases:

- High availability
- Read scaling
- Disaster recovery
- Geographic distribution

Asynchronous replication-এ replication lag হতে পারে।`,
	},

	{
		id: "db-58",
		category: "Database",
		difficulty: "Senior",
		tags: ["Replication Lag", "Distributed Systems"],
		question: "Replication Lag কী?",
		answer: `Primary database-এর নতুন data replica-তে পৌঁছাতে সময় লাগলে replication lag হয়।

Example:

Primary:
Order #100 created

Replica:
কিছু milliseconds/seconds পরে #100 দেখতে পাচ্ছে।

যদি application immediately replica থেকে read করে, stale data পেতে পারে।

Solution:

- Read from primary where strong consistency needed
- Lag monitoring
- Routing strategy
- Session consistency strategy`,
	},

	// ============================================================
	// DATABASE SCALING
	// ============================================================

	{
		id: "db-59",
		category: "Database",
		difficulty: "Senior",
		tags: ["Sharding", "Scaling"],
		question: "Database Sharding কী?",
		answer: `Sharding হলো data horizontally multiple database node-এ distribute করা।

Example:

Users:

Shard 1 → user_id 1-1M
Shard 2 → user_id 1M-2M
Shard 3 → user_id 2M-3M

অথবা hash-based:

hash(user_id) → shard

Benefits:

- Massive scale
- Storage distribution
- Write scaling

Challenges:

- Cross-shard query
- Cross-shard transaction
- Rebalancing
- Hot shard
- Complex operations

Sharding প্রয়োজনের আগে simpler scaling techniques শেষ করা উচিত।`,
	},

	{
		id: "db-60",
		category: "Database",
		difficulty: "Senior",
		tags: ["Partitioning", "Scaling"],
		question: "Database Partitioning কী?",
		answer: `একটি logical table-এর data database-এর ভিতর multiple partitions-এ ভাগ করা হলে partitioning।

Common:

- Range partitioning
- List partitioning
- Hash partitioning

Example:

orders_2025
orders_2026

Date-based partitioning large time-series/order table-এ useful হতে পারে।

Partition pruning query performance improve করতে পারে।`,
	},

	{
		id: "db-61",
		category: "Database",
		difficulty: "Senior",
		tags: ["Horizontal Scaling", "Vertical Scaling"],
		question: "Vertical Scaling এবং Horizontal Scaling কী?",
		answer: `Vertical scaling:

একই server-এর resource বাড়ানো।

CPU ↑
RAM ↑
Storage ↑

Horizontal scaling:

Multiple server/node যোগ করা।

Node 1
Node 2
Node 3

Database:

Vertical:
Bigger DB server

Horizontal:
Replication / Sharding / Distributed DB

Vertical scaling সহজ।

Horizontal scaling বেশি complex কিন্তু large scale-এর জন্য useful।`,
	},

	// ============================================================
	// BACKUP & RECOVERY
	// ============================================================

	{
		id: "db-62",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Backup", "Recovery"],
		question: "Database Backup কী কী ধরনের হতে পারে?",
		answer: `Common backup:

1. Full Backup
2. Incremental Backup
3. Differential Backup
4. Snapshot
5. Logical Backup
6. Physical Backup

Full:
পুরো database।

Incremental:
শেষ backup-এর পরের changes।

Differential:
শেষ full backup-এর পরের changes।

Production system-এ backup strategy-এর সাথে restore testing-ও জরুরি।`,
	},

	{
		id: "db-63",
		category: "Database",
		difficulty: "Very Important",
		tags: ["RPO", "RTO", "Disaster Recovery"],
		question: "RPO এবং RTO কী?",
		answer: `RPO = Recovery Point Objective

কতটা data loss acceptable?

Example:

RPO = 5 minutes

সর্বোচ্চ প্রায় 5 মিনিটের data loss tolerate করা যেতে পারে।

RTO = Recovery Time Objective

কত সময়ের মধ্যে service recover করতে হবে?

Example:

RTO = 30 minutes

Service 30 মিনিটের মধ্যে restore করতে হবে।

High availability/disaster recovery planning-এ RPO এবং RTO গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// SECURITY
	// ============================================================

	{
		id: "db-64",
		category: "Database",
		difficulty: "Very Important",
		tags: ["SQL Injection", "Security"],
		question: "SQL Injection কী?",
		answer: `User input directly SQL query-এর মধ্যে concatenate করলে attacker malicious SQL inject করতে পারে।

Bad:

"SELECT * FROM users WHERE email = '" + email + "'"

Attacker malicious input দিয়ে query structure পরিবর্তন করতে পারে।

Protection:

- Parameterized queries
- Prepared statements
- ORM parameter binding
- Input validation
- Least privilege

সবচেয়ে গুরুত্বপূর্ণ:

User input কখনো raw SQL string-এর সাথে unsafeভাবে concatenate করবেন না।`,
	},

	{
		id: "db-65",
		category: "Database",
		difficulty: "Very Important",
		tags: ["Database Security", "Least Privilege"],
		question: "Database security-এর গুরুত্বপূর্ণ principles কী?",
		answer: `Important:

- Least privilege
- Strong authentication
- Encryption in transit
- Encryption at rest
- Secret management
- Network isolation
- Firewall
- Audit logging
- Parameterized queries
- Backup encryption
- Rotation of credentials

Application-এর DB user-কে প্রয়োজনের চেয়ে বেশি privilege দেওয়া উচিত নয়।

Example:

Read-only reporting service
→ SELECT permission

Write service
→ প্রয়োজনীয় INSERT/UPDATE permission`,
	},

	// ============================================================
	// VIEWS / PROCEDURES / TRIGGERS
	// ============================================================

	{
		id: "db-66",
		category: "SQL",
		difficulty: "Important",
		tags: ["View"],
		question: "Database View কী?",
		answer: `View হলো stored query-এর মতো logical table।

Example:

CREATE VIEW active_users AS
SELECT id, name
FROM users
WHERE status = 'active';

তারপর:

SELECT *
FROM active_users;

Benefits:

- Query abstraction
- Security
- Reusability

Normal view সাধারণত data physically store করে না; materialized view আলাদা concept।`,
	},

	{
		id: "db-67",
		category: "Database",
		difficulty: "Important",
		tags: ["Materialized View", "Performance"],
		question: "Materialized View কী?",
		answer: `Materialized view query result physically store করে।

Normal View:

Query
 ↓
Calculate every time

Materialized View:

Query
 ↓
Stored result
 ↓
Read

Complex reporting/aggregation workload-এ read performance improve করতে পারে।

Trade-off:

Data refresh করতে হয়।

Freshness requirement অনুযায়ী refresh strategy design করতে হয়।`,
	},

	{
		id: "db-68",
		category: "Database",
		difficulty: "Important",
		tags: ["Stored Procedure"],
		question: "Stored Procedure কী?",
		answer: `Stored procedure হলো database-এর মধ্যে stored executable logic।

Benefits:

- Reusable DB-side logic
- Reduced network round trips in some workloads
- Centralized DB operations

কিন্তু অতিরিক্ত business logic database-এ রাখলে:

- Testing complexity
- Version control complexity
- Portability issues

তাই application architecture অনুযায়ী সিদ্ধান্ত নিতে হয়।`,
	},

	{
		id: "db-69",
		category: "Database",
		difficulty: "Important",
		tags: ["Trigger"],
		question: "Database Trigger কী?",
		answer: `Trigger হলো নির্দিষ্ট database event ঘটলে automatically execute হওয়া logic।

Example:

INSERT
UPDATE
DELETE

এর পর trigger execute হতে পারে।

Use cases:

- Audit
- Derived data
- Enforcement of certain DB rules

কিন্তু অতিরিক্ত trigger hidden side effects তৈরি করতে পারে।

Complex business workflow-এর জন্য application/service layer বা event-driven architecture অনেক সময় বেশি maintainable।`,
	},

	// ============================================================
	// NOSQL
	// ============================================================

	{
		id: "db-70",
		category: "NoSQL",
		difficulty: "Very Important",
		tags: ["MongoDB", "Document Database"],
		question: "MongoDB কী?",
		answer: `MongoDB একটি document-oriented NoSQL database।

Data BSON document আকারে store হয়।

Example:

{
  "_id": 1,
  "name": "Product",
  "price": 100,
  "tags": ["a", "b"]
}

MongoDB useful:

- Flexible schema
- Document-centric data
- Rapid development
- Horizontal scaling

তবে complex relational workload হলে relational database অনেক সময় বেশি natural।`,
	},

	{
		id: "db-71",
		category: "NoSQL",
		difficulty: "Very Important",
		tags: ["MongoDB", "Embedding"],
		question: "MongoDB-তে Embedding এবং Referencing কী?",
		answer: `Embedding:

Related data একই document-এর ভিতরে রাখা।

{
  user: {
    name: "A",
    address: {
      city: "Dhaka"
    }
  }
}

Referencing:

অন্য document-এর ID reference করা।

{
  user_id: 123
}

Embedding useful যখন:

- Data frequently together read হয়
- Relationship bounded
- Data size manageable

Referencing useful যখন:

- Data independently managed
- Large/unbounded relationship
- Frequent independent updates`,
	},

	{
		id: "db-72",
		category: "NoSQL",
		difficulty: "Very Important",
		tags: ["Redis", "Cache"],
		question: "Redis কী এবং কোথায় ব্যবহার করবেন?",
		answer: `Redis হলো in-memory data store।

Data structures:

- String
- Hash
- List
- Set
- Sorted Set
- Stream

Use cases:

- Cache
- Session
- Rate limiting
- Distributed locks
- Pub/Sub
- Counters
- Queue-related workloads

Redis fast কারণ primary data access memory-based।

তবে durability requirement অনুযায়ী persistence configuration এবং architecture বিবেচনা করতে হবে।`,
	},

	{
		id: "db-73",
		category: "NoSQL",
		difficulty: "Very Important",
		tags: ["Redis", "Cache"],
		question: "Cache Aside Pattern কী?",
		answer: `Cache-aside-এর flow:

Request
 ↓
Check Cache
 ├── Hit → Return
 └── Miss
       ↓
    Database
       ↓
    Set Cache
       ↓
    Return

Update:

Database update
 ↓
Invalidate cache

এটি সবচেয়ে common application caching pattern-এর একটি।`,
	},

	// ============================================================
	// DATABASE DESIGN
	// ============================================================

	{
		id: "db-74",
		category: "Database Design",
		difficulty: "Very Important",
		tags: ["ERD", "Design"],
		question: "ERD কী?",
		answer: `ERD = Entity Relationship Diagram।

Database entities এবং তাদের relationships visualভাবে দেখায়।

Example:

User
 |
 | 1:N
 ↓
Order
 |
 | 1:N
 ↓
OrderItem
 |
 | N:1
 ↓
Product

ERD database design করার আগে relationship বোঝার জন্য খুব useful।`,
	},

	{
		id: "db-75",
		category: "Database Design",
		difficulty: "Very Important",
		tags: ["Relationship"],
		question: "One-to-One, One-to-Many এবং Many-to-Many relationship কী?",
		answer: `One-to-One:

User → Profile

এক user-এর একটি profile।

One-to-Many:

User → Orders

এক user-এর অনেক order।

Many-to-Many:

Students ↔ Courses

এক student অনেক course নিতে পারে।

এক course অনেক student থাকতে পারে।

Many-to-many সাধারণত junction table দিয়ে model করা হয়:

student_courses

student_id
course_id`,
	},

	{
		id: "db-76",
		category: "Database Design",
		difficulty: "Very Important",
		tags: ["Soft Delete", "Data Lifecycle"],
		question: "Soft Delete কী?",
		answer: `Physical DELETE না করে record-কে deleted হিসেবে mark করা হলে soft delete।

Example:

deleted_at = timestamp

Query:

WHERE deleted_at IS NULL

Benefits:

- Recovery
- Audit
- Historical records

Trade-off:

- Every query-তে filter দরকার
- Unique constraint complexity
- Table size বাড়তে পারে

Large system-এ archive strategy-ও প্রয়োজন হতে পারে।`,
	},

	{
		id: "db-77",
		category: "Database Design",
		difficulty: "Very Important",
		tags: ["Audit", "Data Integrity"],
		question: "Audit Trail কী?",
		answer: `কোন user কখন কী পরিবর্তন করেছে তার historical record হলো audit trail।

Example:

audit_logs

id
user_id
action
entity
entity_id
old_value
new_value
created_at

Useful:

- Banking
- ERP
- Payment
- Admin panel
- Compliance

Critical business systems-এ auditability গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// ADVANCED DISTRIBUTED DATABASE
	// ============================================================

	{
		id: "db-78",
		category: "Distributed Database",
		difficulty: "Senior",
		tags: ["CAP Theorem", "Distributed Systems"],
		question: "CAP Theorem কী?",
		answer: `CAP theorem distributed system-এর তিনটি property নিয়ে কথা বলে:

C = Consistency
A = Availability
P = Partition Tolerance

Network partition হলে system একই সময়ে strong consistency এবং full availability দুটোই guarantee করতে পারে না—classic CAP framing অনুযায়ী।

Distributed database design-এ network partition বাস্তব possibility, তাই trade-off বুঝতে হয়।

এটি simple "choose any two" slogan-এর চেয়ে বেশি nuanced concept।`,
	},

	{
		id: "db-79",
		category: "Distributed Database",
		difficulty: "Senior",
		tags: ["Consistency", "Distributed Systems"],
		question: "Strong Consistency এবং Eventual Consistency কী?",
		answer: `Strong consistency:

Write successful হওয়ার পরে subsequent reads expectedভাবে latest value দেখতে পায়।

Eventual consistency:

Immediately সব replica একই value নাও দেখতে পারে, কিন্তু সময়ের সাথে converge করবে।

Strong consistency:

+ Easier reasoning
- More coordination/latency

Eventual consistency:

+ Better availability/scalability in some systems
- Application complexity

Use case অনুযায়ী choose করতে হয়।`,
	},

	{
		id: "db-80",
		category: "Distributed Database",
		difficulty: "Senior",
		tags: ["Distributed Transaction", "Saga"],
		question: "Distributed transaction কী?",
		answer: `একটি business operation যদি multiple independent database/service-এর data modify করে, সেটি distributed transaction problem তৈরি করে।

Example:

Order DB
+
Payment DB
+
Inventory DB

একটি local database transaction সব service cover করতে পারে না।

Common approaches:

- Saga
- Outbox
- Compensation
- 2PC in specific systems

Microservices-এ Saga এবং eventual consistency বেশি common।`,
	},

	{
		id: "db-81",
		category: "Distributed Database",
		difficulty: "Senior",
		tags: ["Two Phase Commit", "2PC"],
		question: "Two Phase Commit বা 2PC কী?",
		answer: `2PC distributed transaction-এর জন্য coordinator-based protocol।

Phase 1:

Prepare

সব participant জিজ্ঞেস করা হয় তারা commit করতে পারবে কি না।

Phase 2:

Commit/Abort

সব ready হলে commit।

Problem:

- Blocking
- Coordinator dependency
- Performance overhead
- Failure complexity

Microservices-এ সাধারণ business workflow-এর জন্য Saga অনেক সময় বেশি practical।`,
	},

	// ============================================================
	// PRODUCTION / INTERVIEW
	// ============================================================

	{
		id: "db-82",
		category: "Database",
		difficulty: "Senior",
		tags: ["Production", "Architecture"],
		question: "Production database design করার সময় কী কী consider করবেন?",
		answer: `Consider:

1. Data model
2. Relationships
3. Normalization
4. Indexing
5. Transactions
6. Isolation
7. Locking
8. Connection pooling
9. Query performance
10. Caching
11. Replication
12. Backup
13. Recovery
14. Security
15. Monitoring
16. Scaling
17. Migration strategy
18. Disaster recovery
19. Data retention
20. Auditability

Database design শুধু table তৈরি করা নয়।

Application workload বুঝে design করতে হয়।`,
	},

	{
		id: "db-83",
		category: "Database",
		difficulty: "Senior",
		tags: ["Migration", "Deployment"],
		question: "Database Migration কী?",
		answer: `Application-এর সাথে database schema safely evolve করার process হলো migration।

Example:

Version 1:

users
- id
- name

Version 2:

users
- id
- name
- email

Migration:

ALTER TABLE users
ADD COLUMN email VARCHAR(255);

Production migration-এ backward compatibility গুরুত্বপূর্ণ।

Large table-এ blocking migration avoid করতে online/non-blocking migration strategy প্রয়োজন হতে পারে।`,
	},

	{
		id: "db-84",
		category: "Database",
		difficulty: "Senior",
		tags: ["Zero Downtime", "Migration"],
		question: "Zero-downtime database migration কীভাবে করবেন?",
		answer: `সরাসরি destructive schema change production-এ risky।

Expand-and-contract pattern ব্যবহার করা যায়।

Step 1:
নতুন column add করুন।

Step 2:
Application পুরনো + নতুন structure support করবে।

Step 3:
Backfill data।

Step 4:
Application নতুন column use করবে।

Step 5:
Old column remove করুন।

Flow:

Expand
 ↓
Deploy compatible code
 ↓
Backfill
 ↓
Switch reads/writes
 ↓
Contract

এটি large production system-এ খুব useful।`,
	},

	{
		id: "db-85",
		category: "Database",
		difficulty: "Senior",
		tags: ["System Design", "E-commerce"],
		question: "একটি high-scale e-commerce database কীভাবে design করবেন?",
		answer: `Core tables:

users
products
categories
inventory
carts
orders
order_items
payments
shipments

Core relationship:

User
 ↓
Order
 ↓
OrderItem
 ↓
Product

Inventory:

Product
 ↓
Inventory

Critical considerations:

- Product indexes
- Inventory concurrency
- Order transaction
- Payment idempotency
- Cache
- Read replicas
- Search engine for product search
- Queue/event system
- Audit logs
- Partitioning for large order tables
- Backup/recovery

High-scale architecture:

API
 ↓
Cache
 ↓
Primary DB
 ├── Read Replicas
 └── Event/Queue
        ↓
    Async Workers`,
	},

	{
		id: "db-86",
		category: "Database",
		difficulty: "Senior",
		tags: ["System Design", "Banking"],
		question: "Banking transaction system-এর database design-এ সবচেয়ে গুরুত্বপূর্ণ বিষয় কী?",
		answer: `সবচেয়ে গুরুত্বপূর্ণ:

- Strong consistency
- ACID transaction
- Double-entry ledger
- Idempotency
- Concurrency control
- Audit trail
- Immutable transaction history
- Strict authorization
- Encryption
- Backup
- Disaster recovery

Money transfer:

BEGIN
 ↓
Debit account A
 ↓
Credit account B
 ↓
Create ledger entries
 ↓
COMMIT

কোনো step fail হলে rollback।

Financial system-এ শুধু balance column-এর উপর নির্ভর না করে auditable ledger model গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-87",
		category: "Database",
		difficulty: "Senior",
		tags: ["Interview", "Debugging"],
		question: "Production database CPU 90-100% হলে কীভাবে investigate করবেন?",
		answer: `Step 1:
কোন query CPU consume করছে identify করুন।

Step 2:
Slow query / active query inspect করুন।

Step 3:
EXPLAIN করুন।

Step 4:
Check করুন:

- Missing index
- Wrong index
- Full scan
- Expensive joins
- Large aggregation
- Sort
- Lock contention

Step 5:
Traffic/application changes check করুন।

Step 6:
Short-term mitigation:

- Cache
- Rate limiting
- Read replica
- Traffic reduction

Step 7:
Long-term:

- Query optimization
- Index
- Schema optimization
- Partitioning
- Architecture change

Monitoring ছাড়া blindly optimization করা উচিত নয়।`,
	},

	{
		id: "db-88",
		category: "Database",
		difficulty: "Senior",
		tags: ["Interview", "Concurrency"],
		question:
			"একই product-এর stock 1 থাকলে দুইজন একসাথে order করলে কীভাবে overselling prevent করবেন?",
		answer: `Problem:

Stock = 1

Request A → read stock = 1
Request B → read stock = 1

দুইজনই order করলে stock -2 হয়ে যেতে পারে।

Solutions:

1. Atomic update:

UPDATE products
SET stock = stock - 1
WHERE id = ?
AND stock > 0;

Affected rows = 1
→ Success

Affected rows = 0
→ Out of stock

অথবা:

2. SELECT ... FOR UPDATE

Transaction-এর মধ্যে row lock।

অথবা:

3. Optimistic locking

version column।

High-concurrency inventory system-এ atomic update/pessimistic বা optimistic strategy workload অনুযায়ী choose করতে হয়।`,
	},

	{
		id: "db-89",
		category: "Database",
		difficulty: "Senior",
		tags: ["Interview", "Deadlock"],
		question: "Production-এ deadlock হচ্ছে। কীভাবে solve করবেন?",
		answer: `প্রথমে deadlock-এর exact transaction pattern identify করতে হবে।

Check:

- Deadlock logs
- Locked rows
- Query order
- Index
- Transaction duration

Example:

Transaction A:
Lock User → Order

Transaction B:
Lock Order → User

Solution:

সব জায়গায় consistent order:

User
 ↓
Order

অথবা:

- Shorter transactions
- Proper indexes
- Avoid unnecessary locks
- Reduce lock scope
- Retry deadlocked transaction

Deadlock পুরোপুরি impossible করার চেয়ে controlled handling + retry অনেক system-এ practical।`,
	},

	{
		id: "db-90",
		category: "Database",
		difficulty: "Senior",
		tags: ["Interview", "Architecture"],
		question: "একটি application-এর database কখন Redis, SQL এবং MongoDB-এর মধ্যে ভাগ করবেন?",
		answer: `SQL:

Primary source of truth।

Use:

- Orders
- Payments
- Users
- Financial data
- Relationships
- Transactions

MongoDB:

Document-oriented workload।

Use:

- Flexible document data
- Content/catalog style data
- Specific document access patterns

Redis:

Fast temporary/in-memory data।

Use:

- Cache
- Session
- Rate limit
- Distributed lock
- Counters

Important principle:

একই data-এর multiple sources of truth তৈরি করার আগে consistency strategy define করতে হবে।`,
	},
	// ============================================================
	// ADVANCED SQL
	// ============================================================

	{
		id: "db-91",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "Execution Order"],
		question: "SQL Query-এর logical execution order কী?",
		answer: `SQL লেখার order এবং database-এর logical execution order এক নয়।

সাধারণ logical order:

1. FROM
2. JOIN
3. WHERE
4. GROUP BY
5. HAVING
6. SELECT
7. DISTINCT
8. ORDER BY
9. LIMIT/OFFSET

Example:

SELECT department_id, COUNT(*)
FROM employees
WHERE salary > 50000
GROUP BY department_id
HAVING COUNT(*) > 5
ORDER BY COUNT(*) DESC
LIMIT 10;

Conceptually:

FROM
 ↓
JOIN
 ↓
WHERE
 ↓
GROUP BY
 ↓
HAVING
 ↓
SELECT
 ↓
DISTINCT
 ↓
ORDER BY
 ↓
LIMIT

এই order বুঝলে SQL query-এর অনেক interview question সহজ হয়ে যায়।`,
	},

	{
		id: "db-92",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "DISTINCT"],
		question: "DISTINCT কী এবং কখন ব্যবহার করবেন?",
		answer: `DISTINCT duplicate result remove করে।

Example:

SELECT DISTINCT department_id
FROM employees;

যদি department_id হয়:

1
1
2
2
3

Result:

1
2
3

কিন্তু DISTINCT performance cost তৈরি করতে পারে, কারণ database-কে duplicate values identify করতে হয়।

শুধু duplicate সমস্যা hide করার জন্য blindly DISTINCT ব্যবহার করা উচিত নয়।`,
	},

	{
		id: "db-93",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "CASE"],
		question: "SQL CASE expression কী?",
		answer: `CASE conditional logic implement করতে ব্যবহৃত হয়।

Example:

SELECT
  name,
  CASE
    WHEN salary >= 100000 THEN 'Senior'
    WHEN salary >= 50000 THEN 'Mid'
    ELSE 'Junior'
  END AS level
FROM employees;

এটি SQL-এর মধ্যে if/else-এর মতো কাজ করে।

Use cases:

- Conditional formatting
- Categorization
- Reporting
- Conditional aggregation`,
	},

	{
		id: "db-94",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "COALESCE", "NULL"],
		question: "COALESCE কী?",
		answer: `COALESCE প্রথম non-NULL value return করে।

Example:

SELECT COALESCE(phone, 'N/A')
FROM users;

যদি phone NULL হয়:

N/A

Multiple values:

COALESCE(value1, value2, value3)

এটি NULL handling এবং fallback value-এর জন্য খুব useful।`,
	},

	{
		id: "db-95",
		category: "Advanced SQL",
		difficulty: "Important",
		tags: ["SQL", "NULLIF"],
		question: "NULLIF কী?",
		answer: `NULLIF দুইটি value compare করে।

যদি দুইটি equal হয় → NULL
না হলে → প্রথম value।

Example:

NULLIF(quantity, 0)

Division-এর ক্ষেত্রে useful:

price / NULLIF(quantity, 0)

এতে quantity = 0 হলে division-by-zero error avoid করা যায়।`,
	},

	{
		id: "db-96",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["EXISTS", "Subquery"],
		question: "EXISTS এবং IN-এর মধ্যে পার্থক্য কী?",
		answer: `EXISTS check করে subquery অন্তত একটি row return করছে কি না।

Example:

SELECT *
FROM users u
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.user_id = u.id
);

IN:

WHERE id IN (
  SELECT user_id
  FROM orders
);

কোনটি faster হবে তা data distribution, indexes এবং optimizer-এর উপর নির্ভর করে।

EXISTS correlated existence check-এর ক্ষেত্রে খুব natural এবং common।`,
	},

	{
		id: "db-97",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "Anti Join"],
		question: "যেসব user-এর কোনো order নেই তাদের SQL-এ কীভাবে বের করবেন?",
		answer: `দুইটি common approach:

1. LEFT JOIN:

SELECT u.*
FROM users u
LEFT JOIN orders o
ON o.user_id = u.id
WHERE o.id IS NULL;

2. NOT EXISTS:

SELECT u.*
FROM users u
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.user_id = u.id
);

NOT EXISTS সাধারণত intent-এর দিক থেকে পরিষ্কার।

কিন্তু actual performance database optimizer এবং indexes-এর উপর নির্ভর করবে।`,
	},

	{
		id: "db-98",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "Duplicate"],
		question: "Duplicate records কীভাবে identify করবেন?",
		answer: `GROUP BY + HAVING ব্যবহার করা যায়।

Example:

SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

এতে duplicate email পাওয়া যাবে।

Duplicate rows remove করার আগে অবশ্যই:

- Business rule
- Primary key
- Foreign key
- Referential impact

check করতে হবে।`,
	},

	{
		id: "db-99",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "Top N"],
		question: "প্রতিটি department-এর top 3 salary কীভাবে বের করবেন?",
		answer: `Window function ব্যবহার করা সবচেয়ে clean approach।

Example:

SELECT *
FROM (
  SELECT
    employee_id,
    department_id,
    salary,
    ROW_NUMBER() OVER (
      PARTITION BY department_id
      ORDER BY salary DESC
    ) AS rn
  FROM employees
) x
WHERE rn <= 3;

PARTITION BY department অনুযায়ী ranking reset করে।

ROW_NUMBER-এর পরিবর্তে RANK/DENSE_RANK ব্যবহার করলে ties-এর behavior পরিবর্তিত হবে।`,
	},

	{
		id: "db-100",
		category: "Advanced SQL",
		difficulty: "Very Important",
		tags: ["SQL", "RANK", "DENSE_RANK"],
		question: "ROW_NUMBER, RANK এবং DENSE_RANK-এর পার্থক্য কী?",
		answer: `ধরা যাক salary:

100
100
90
80

ROW_NUMBER:

1
2
3
4

RANK:

1
1
3
4

DENSE_RANK:

1
1
2
3

ROW_NUMBER → প্রতিটি row unique number

RANK → tie হলে gap তৈরি হয়

DENSE_RANK → tie হলে gap তৈরি হয় না

Ranking problem-এ কোনটি দরকার তা business requirement-এর উপর নির্ভর করে।`,
	},

	// ============================================================
	// INDEX DEEP DIVE
	// ============================================================

	{
		id: "db-101",
		category: "Indexing",
		difficulty: "Very Important",
		tags: ["Index", "Selectivity"],
		question: "Index Selectivity কী?",
		answer: `Selectivity হলো একটি column-এর value কতটা unique বা filtering-এ কতটা effective তার ধারণা।

Example:

id:
1
2
3
4
5

id-এর selectivity high।

gender:

male
male
male
female
male

gender-এর selectivity comparatively low।

High-selectivity column সাধারণত filtering-এর জন্য বেশি useful।

তবে optimizer শুধু selectivity নয়, data distribution, query shape, cost এবং অন্যান্য factors বিবেচনা করে।`,
	},

	{
		id: "db-102",
		category: "Indexing",
		difficulty: "Very Important",
		tags: ["Composite Index", "Leftmost Prefix"],
		question: "Composite Index-এর Leftmost Prefix Rule কী?",
		answer: `ধরা যাক index:

(user_id, status, created_at)

তাহলে index-এর প্রথম column থেকে prefix ব্যবহার করা সবচেয়ে natural।

Useful:

WHERE user_id = ?

WHERE user_id = ?
AND status = ?

WHERE user_id = ?
AND status = ?
AND created_at > ?

কিন্তু:

WHERE status = ?

শুধু status-এর query একই index থেকে সাধারণত efficientভাবে benefit নাও পেতে পারে।

তাই composite index column order query pattern অনুযায়ী design করতে হয়।`,
	},

	{
		id: "db-103",
		category: "Indexing",
		difficulty: "Very Important",
		tags: ["Index", "ORDER BY"],
		question: "Index কীভাবে ORDER BY optimize করতে পারে?",
		answer: `ধরা যাক:

CREATE INDEX idx_orders_created
ON orders(created_at);

Query:

SELECT *
FROM orders
ORDER BY created_at DESC
LIMIT 20;

যদি index ordering query-এর সাথে compatible হয়, database index scan করে sorted result পেতে পারে।

তাহলে আলাদা expensive sort operation avoid হতে পারে।

তবে optimizer cost অনুযায়ী index ব্যবহার করবে কি না সেটি execution plan দিয়ে verify করতে হবে।`,
	},

	{
		id: "db-104",
		category: "Indexing",
		difficulty: "Very Important",
		tags: ["Index", "LIKE"],
		question: "LIKE query-তে কখন index কাজ করতে পারে?",
		answer: `Prefix search:

WHERE name LIKE 'Naz%'

অনেক B-tree implementation-এ index ব্যবহার করতে পারে।

কিন্তু:

WHERE name LIKE '%Naz'

অথবা:

WHERE name LIKE '%Naz%'

সাধারণ B-tree index সাধারণত effectiveভাবে ব্যবহার করতে পারে না।

Large-scale text search-এর জন্য:

- Full-text index
- Elasticsearch/OpenSearch
- Database-specific text search

ব্যবহার করা যেতে পারে।`,
	},

	{
		id: "db-105",
		category: "Indexing",
		difficulty: "Senior",
		tags: ["Index", "Write Performance"],
		question: "অনেক বেশি index দিলে কী সমস্যা হয়?",
		answer: `Index read performance improve করতে পারে, কিন্তু প্রতিটি write-এর সময় relevant indexes maintain করতে হয়।

তাই অনেক index হলে:

INSERT ↑ cost
UPDATE ↑ cost
DELETE ↑ cost
Storage ↑
Memory/cache pressure ↑

Example:

একটি table-এ 15টি index থাকলে নতুন row insert করার সময় multiple index update করতে হতে পারে।

তাই index query workload অনুযায়ী design করতে হবে।`,
	},

	{
		id: "db-106",
		category: "Indexing",
		difficulty: "Senior",
		tags: ["Index", "Unused Index"],
		question: "Unused index কেন remove করা উচিত?",
		answer: `Unused index:

- Storage consume করে
- Write overhead তৈরি করে
- Cache pressure বাড়ায়
- Maintenance cost বাড়ায়

তবে production-এ সরাসরি index drop করা উচিত নয়।

আগে:

- Query statistics
- Application workload
- Peak traffic
- Historical usage

analyze করতে হবে।

কারণ একটি index daily workload-এ unused হলেও monthly reporting query-এর জন্য প্রয়োজনীয় হতে পারে।`,
	},

	// ============================================================
	// QUERY OPTIMIZER
	// ============================================================

	{
		id: "db-107",
		category: "Query Optimization",
		difficulty: "Senior",
		tags: ["Optimizer", "Execution Plan"],
		question: "Database Query Optimizer কী?",
		answer: `Query optimizer SQL query-এর জন্য সম্ভাব্য execution strategy evaluate করে এবং cost অনুযায়ী একটি plan নির্বাচন করে।

Example:

SELECT *
FROM orders o
JOIN users u
ON u.id = o.user_id
WHERE o.status = 'paid';

Possible plans:

Plan A:
Scan orders → join users

Plan B:
Use index → filter orders → join users

Optimizer সাধারণত statistics এবং estimated cost ব্যবহার করে plan নির্বাচন করে।

তাই একই SQL query different data distribution-এ different execution plan নিতে পারে।`,
	},

	{
		id: "db-108",
		category: "Query Optimization",
		difficulty: "Senior",
		tags: ["EXPLAIN", "Execution Plan"],
		question: "EXPLAIN plan-এর কোন বিষয়গুলো সবচেয়ে গুরুত্বপূর্ণ?",
		answer: `Database অনুযায়ী fields আলাদা হলেও সাধারণত দেখবেন:

- Access method
- Index used
- Estimated rows
- Actual rows
- Join method
- Filter
- Sort
- Temporary table
- Full scan
- Cost
- Actual execution time

বিশেষ করে compare করুন:

Estimated rows
vs
Actual rows

যদি estimate এবং actual অনেক আলাদা হয়, optimizer statistics/data distribution issue থাকতে পারে।`,
	},

	{
		id: "db-109",
		category: "Query Optimization",
		difficulty: "Senior",
		tags: ["Full Table Scan", "Index"],
		question: "Full Table Scan কি সবসময় খারাপ?",
		answer: `না।

যদি table খুব ছোট হয়, full table scan index lookup-এর চেয়ে faster হতে পারে।

Example:

Table = 100 rows

Index lookup-এর overhead-এর চেয়ে পুরো table scan সহজ হতে পারে।

আবার যদি:

Table = 100 million rows

এবং query মাত্র 10 rows চায়, তখন appropriate index অনেক বেশি useful হতে পারে।

তাই:

Full Scan ≠ Always Bad

Execution plan এবং actual workload দেখে সিদ্ধান্ত নিতে হবে।`,
	},

	{
		id: "db-110",
		category: "Query Optimization",
		difficulty: "Senior",
		tags: ["Statistics", "Optimizer"],
		question: "Database Statistics কী এবং কেন গুরুত্বপূর্ণ?",
		answer: `Optimizer data distribution সম্পর্কে statistics ব্যবহার করে execution plan তৈরি করতে পারে।

Statistics-এর মাধ্যমে optimizer estimate করতে পারে:

- কত rows match করবে
- কোন index useful
- কোন join order ভালো

Statistics stale হলে optimizer ভুল estimate করতে পারে।

তাই production database-এ statistics maintenance গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// MYSQL / INNODB INTERNALS
	// ============================================================

	{
		id: "db-111",
		category: "MySQL",
		difficulty: "Very Important",
		tags: ["InnoDB", "MySQL"],
		question: "InnoDB কী?",
		answer: `InnoDB হলো MySQL-এর প্রধান transactional storage engine।

Important features:

- ACID transactions
- Row-level locking
- Foreign keys
- MVCC
- Crash recovery
- Buffer pool
- Redo log

Modern transactional MySQL application-এ InnoDB সাধারণত default choice।`,
	},

	{
		id: "db-112",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["InnoDB", "Clustered Index"],
		question: "InnoDB-তে Primary Key কীভাবে data storage-এর সাথে সম্পর্কিত?",
		answer: `InnoDB clustered index structure ব্যবহার করে।

Primary key index-এর leaf pages-এ row data logically organized থাকে।

Concept:

Primary Key B+Tree
        ↓
Leaf Pages
        ↓
Row Data

তাই:

- ছোট primary key beneficial
- Stable primary key beneficial
- Randomly huge primary key storage/index cost বাড়াতে পারে

Secondary index-এর মধ্যে primary key value-ও গুরুত্বপূর্ণ ভূমিকা রাখে, তাই primary key size secondary indexes-এর storage-কে প্রভাবিত করতে পারে।`,
	},

	{
		id: "db-113",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["InnoDB", "Secondary Index"],
		question: "InnoDB Secondary Index lookup কীভাবে কাজ করে?",
		answer: `Conceptually:

Secondary Index
      ↓
Matching index entry
      ↓
Primary Key
      ↓
Clustered Index
      ↓
Actual Row

তাই query যদি secondary index থেকে শুরু করে এবং প্রয়োজনীয় columns index-এর মধ্যেই থাকে, covering index হলে extra clustered lookup avoid হতে পারে।

এই কারণেই secondary index design গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-114",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["Buffer Pool", "InnoDB"],
		question: "InnoDB Buffer Pool কীভাবে query performance improve করে?",
		answer: `Database data disk pages হিসেবে store করে।

Frequently used pages memory-তে রাখা হয়:

Disk
 ↓
Buffer Pool
 ↓
Query

যদি required page buffer pool-এ থাকে:

Memory Hit
 ↓
Fast

না থাকলে:

Disk Read
 ↓
Buffer Pool
 ↓
Query

তাই buffer pool database performance-এর অন্যতম গুরুত্বপূর্ণ component।`,
	},

	{
		id: "db-115",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["Redo Log", "InnoDB"],
		question: "InnoDB-তে Redo Log কেন দরকার?",
		answer: `Database update করার পর data page immediately disk-এ write না হলেও durability maintain করতে redo log সাহায্য করে।

Simplified:

UPDATE
 ↓
Memory page changed
 ↓
Redo Log durable
 ↓
COMMIT
 ↓
Later data page flush

Crash হলে redo log replay করে committed changes recover করা যায়।

এটি write performance এবং durability-এর balance-এর অংশ।`,
	},

	{
		id: "db-116",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["Undo Log", "MVCC"],
		question: "Undo Log কী?",
		answer: `Undo log মূলত previous row versions এবং rollback-related information ধরে রাখে।

Use cases:

1. Transaction rollback
2. MVCC consistent reads

Concept:

Old Value
   ↓
Undo Log

New Value
   ↓
Current Data

এটি Redo Log-এর থেকে আলাদা উদ্দেশ্যে ব্যবহৃত হয়।

Redo → recovery/redo changes

Undo → rollback + old versions/MVCC`,
	},

	{
		id: "db-117",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["Redo", "Undo"],
		question: "Redo Log এবং Undo Log-এর পার্থক্য কী?",
		answer: `Redo Log:

Purpose:
Committed changes recovery/replay।

Question:
Crash হলে committed changes কীভাবে recover করব?

Undo Log:

Purpose:
Rollback এবং older row versions।

Question:
Transaction rollback বা consistent read-এর জন্য previous version কোথায় পাব?

Simplified:

Redo:
"কি পরিবর্তন আবার apply করতে হবে"

Undo:
"আগের state/version কী ছিল"

দুটোই transactional database internals-এর গুরুত্বপূর্ণ অংশ।`,
	},

	{
		id: "db-118",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["Flush", "Durability"],
		question: "Database COMMIT করার পর data কি সাথে সাথে table data file-এ লিখে যায়?",
		answer: `অবশ্যই সব ক্ষেত্রে সরাসরি data page disk-এ write হয় না।

Simplified flow:

Application
 ↓
Transaction
 ↓
Buffer Pool
 ↓
Redo Log
 ↓
Commit
 ↓
Later page flush

Durability-এর জন্য log mechanism এবং storage flush behavior গুরুত্বপূর্ণ।

Exact behavior configuration, filesystem এবং storage engine-এর উপর নির্ভর করে।`,
	},

	{
		id: "db-119",
		category: "MySQL",
		difficulty: "Senior",
		tags: ["Crash Recovery", "InnoDB"],
		question: "MySQL/InnoDB crash হলে কীভাবে recovery করে?",
		answer: `Simplified:

Database Crash
 ↓
Restart
 ↓
Recovery
 ↓
Read transaction logs
 ↓
Redo necessary changes
 ↓
Rollback incomplete transactions
 ↓
Consistent state

এখানে:

Redo → committed changes recover করতে সাহায্য করে

Undo → incomplete transaction rollback এবং consistent reads-এর জন্য সাহায্য করে

এটি database durability এবং crash recovery-এর core concept।`,
	},

	// ============================================================
	// POSTGRESQL
	// ============================================================

	{
		id: "db-120",
		category: "PostgreSQL",
		difficulty: "Very Important",
		tags: ["PostgreSQL", "MVCC"],
		question: "PostgreSQL-এর গুরুত্বপূর্ণ বৈশিষ্ট্য কী?",
		answer: `PostgreSQL একটি advanced open-source relational database।

Important features:

- ACID transactions
- MVCC
- Powerful SQL
- CTE
- Window functions
- JSON/JSONB
- Arrays
- Full-text search
- Extensions
- Strong indexing options
- Replication
- Partitioning

Complex relational এবং data-intensive application-এর জন্য PostgreSQL খুব শক্তিশালী।`,
	},

	{
		id: "db-121",
		category: "PostgreSQL",
		difficulty: "Senior",
		tags: ["PostgreSQL", "WAL"],
		question: "PostgreSQL WAL কীভাবে কাজ করে?",
		answer: `WAL = Write-Ahead Log।

Simplified:

Transaction
 ↓
Generate WAL record
 ↓
WAL durable
 ↓
Commit
 ↓
Data pages later written

Crash হলে WAL replay করে database recovery করতে পারে।

WAL replication-এর ক্ষেত্রেও গুরুত্বপূর্ণ ভূমিকা রাখে।`,
	},

	{
		id: "db-122",
		category: "PostgreSQL",
		difficulty: "Senior",
		tags: ["PostgreSQL", "VACUUM"],
		question: "PostgreSQL VACUUM কী?",
		answer: `PostgreSQL MVCC-এর কারণে update/delete-এর পুরনো row versions থাকতে পারে।

VACUUM dead tuples cleanup করতে সাহায্য করে।

Concept:

UPDATE/DELETE
 ↓
Old tuple remains
 ↓
VACUUM
 ↓
Cleanup/reclaim process

VACUUM গুরুত্বপূর্ণ কারণ excessive dead tuples:

- Storage বাড়াতে পারে
- Query performance affect করতে পারে
- Table bloat তৈরি করতে পারে

Autovacuum production PostgreSQL-এর গুরুত্বপূর্ণ component।`,
	},

	{
		id: "db-123",
		category: "PostgreSQL",
		difficulty: "Senior",
		tags: ["PostgreSQL", "Analyze"],
		question: "PostgreSQL ANALYZE কী?",
		answer: `ANALYZE table-এর data distribution সম্পর্কে statistics collect করে।

Optimizer এই statistics ব্যবহার করে execution plan তৈরি করে।

Example:

ANALYZE users;

এটি বিশেষভাবে useful হতে পারে যখন:

- অনেক data পরিবর্তন হয়েছে
- Data distribution বদলেছে
- Query plan unexpectedly poor

Autovacuum system-এর সাথে automatic analyze-ও হতে পারে।`,
	},

	// ============================================================
	// TRANSACTION DEEP DIVE
	// ============================================================

	{
		id: "db-124",
		category: "Transactions",
		difficulty: "Very Important",
		tags: ["Isolation", "Read Committed"],
		question: "READ COMMITTED কী?",
		answer: `READ COMMITTED সাধারণত একটি transaction-এর query-কে অন্য transaction-এর committed data দেখতে দেয়।

Uncommitted changes দেখা যাবে না।

Concept:

Transaction A:
UPDATE but not commit

Transaction B:
SELECT

B সাধারণত A-এর uncommitted value দেখতে পাবে না।

তবে একই transaction-এর দুই query-এর মধ্যে অন্য transaction commit করলে result change হতে পারে।

Exact semantics database-specific।`,
	},

	{
		id: "db-125",
		category: "Transactions",
		difficulty: "Very Important",
		tags: ["Isolation", "Repeatable Read"],
		question: "REPEATABLE READ কী?",
		answer: `REPEATABLE READ একই transaction-এর repeated reads-এর জন্য consistent view maintain করার লক্ষ্য রাখে।

Example:

Transaction A:
Read row → 100

Transaction B:
Update → 200
Commit

Transaction A:
Read again

REPEATABLE READ implementation অনুযায়ী আগের consistent value দেখতে পারে।

MySQL InnoDB এবং PostgreSQL-এর semantics এক নয়, তাই database-specific behavior জানা গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-126",
		category: "Transactions",
		difficulty: "Very Important",
		tags: ["Serializable", "Isolation"],
		question: "SERIALIZABLE isolation level কী?",
		answer: `SERIALIZABLE হলো strongest standard isolation level।

Goal:

Concurrent transactions এমনভাবে execute হবে যেন তারা serial order-এ execute হয়েছে।

Benefits:

- Strong consistency
- Many concurrency anomalies prevent

Trade-off:

- More blocking/conflicts/retries
- Lower throughput হতে পারে

High-value financial operations-এ প্রয়োজন হতে পারে, কিন্তু blindly সব transaction SERIALIZABLE করা উচিত নয়।`,
	},

	{
		id: "db-127",
		category: "Transactions",
		difficulty: "Very Important",
		tags: ["Isolation", "Comparison"],
		question: "Isolation level নির্বাচন কীভাবে করবেন?",
		answer: `Requirement অনুযায়ী:

READ UNCOMMITTED:
Very weak isolation; uncommon for critical systems।

READ COMMITTED:
Common default-style choice।

REPEATABLE READ:
More stable reads।

SERIALIZABLE:
Strongest isolation।

Consider:

- Business correctness
- Concurrency
- Performance
- Lock contention
- Retry behavior

Banking/payment system-এর সব operation-এ একই isolation level দরকার—এমন নয়।`,
	},

	// ============================================================
	// LOCK DEEP DIVE
	// ============================================================

	{
		id: "db-128",
		category: "Locking",
		difficulty: "Senior",
		tags: ["Row Lock", "Table Lock"],
		question: "Row Lock এবং Table Lock-এর পার্থক্য কী?",
		answer: `Row lock:

শুধু নির্দিষ্ট row lock করে।

Table lock:

পুরো table lock করতে পারে।

Example:

100 million row table-এ একটি row update করার সময় row-level locking concurrency বেশি allow করে।

Table-level locking সহজ কিন্তু concurrency reduce করতে পারে।

Exact lock behavior database engine-specific।`,
	},

	{
		id: "db-129",
		category: "Locking",
		difficulty: "Senior",
		tags: ["Gap Lock", "Next-Key Lock"],
		question: "Gap Lock এবং Next-Key Lock কী?",
		answer: `InnoDB-এর locking internals-এ gap lock এবং next-key lock গুরুত্বপূর্ণ।

Gap Lock:

Index records-এর মাঝের gap lock করে।

Next-Key Lock:

Record lock + preceding gap-এর combination হিসেবে কাজ করে।

এগুলো বিশেষ isolation behavior এবং phantom prevention-এর সাথে সম্পর্কিত।

High-concurrency InnoDB debugging-এর সময় এগুলো জানা useful।`,
	},

	{
		id: "db-130",
		category: "Locking",
		difficulty: "Senior",
		tags: ["Lock Wait", "Timeout"],
		question: "Lock wait timeout কী?",
		answer: `একটি transaction অন্য transaction-এর lock release হওয়ার জন্য অপেক্ষা করতে করতে configured timeout exceed করলে lock wait timeout হতে পারে।

Example:

Transaction A
 ↓
Lock row 10

Transaction B
 ↓
UPDATE row 10
 ↓
WAIT
 ↓
Timeout

Solutions:

- Short transactions
- Proper indexes
- Consistent access order
- Avoid unnecessary locks
- Monitor blocking queries
- Retry safely where appropriate`,
	},

	// ============================================================
	// TRANSACTION DESIGN
	// ============================================================

	{
		id: "db-131",
		category: "Transaction Design",
		difficulty: "Very Important",
		tags: ["Transaction", "Best Practice"],
		question: "Transaction কতক্ষণ open রাখা উচিত?",
		answer: `Transaction যত short রাখা যায় তত ভালো।

Long transaction:

- Locks ধরে রাখে
- Concurrency কমায়
- Deadlock risk বাড়ায়
- Undo/version storage বাড়াতে পারে
- Connection occupied রাখে

Bad:

BEGIN
 ↓
DB operation
 ↓
External API call
 ↓
User processing
 ↓
Another DB operation
 ↓
COMMIT

Better:

External work আগে/পরে carefully handle করে DB transaction-এর critical section ছোট রাখা।

বিশেষ করে network call transaction-এর ভিতরে রাখা সাধারণত avoid করা ভালো।`,
	},

	{
		id: "db-132",
		category: "Transaction Design",
		difficulty: "Very Important",
		tags: ["Atomicity", "Concurrency"],
		question: "Atomic database update কী?",
		answer: `একটি condition-এর সাথে update এক statement-এ safely করা যায়।

Example:

UPDATE inventory
SET stock = stock - 1
WHERE product_id = 10
AND stock > 0;

তারপর affected rows check:

1 → success
0 → stock unavailable

এটি:

Read stock
→ Application logic
→ Write stock

এর চেয়ে race condition কমাতে সাহায্য করে।`,
	},

	// ============================================================
	// SQL INTERVIEW PROBLEMS
	// ============================================================

	{
		id: "db-133",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Second Highest Salary"],
		question: "Second highest salary কীভাবে বের করবেন?",
		answer: `একটি approach:

SELECT MAX(salary)
FROM employees
WHERE salary < (
  SELECT MAX(salary)
  FROM employees
);

আরেকটি approach:

SELECT salary
FROM (
  SELECT
    salary,
    DENSE_RANK() OVER (
      ORDER BY salary DESC
    ) AS rnk
  FROM employees
) x
WHERE rnk = 2;

DENSE_RANK duplicate salary handle করতে সুবিধা দেয়।`,
	},

	{
		id: "db-134",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Nth Highest"],
		question: "Nth highest salary কীভাবে বের করবেন?",
		answer: `Window function:

SELECT salary
FROM (
  SELECT
    salary,
    DENSE_RANK() OVER (
      ORDER BY salary DESC
    ) AS rnk
  FROM employees
) x
WHERE rnk = N;

এখানে N হলো desired rank।

Duplicate salary-এর ক্ষেত্রে DENSE_RANK এবং ROW_NUMBER-এর difference বুঝতে হবে।`,
	},

	{
		id: "db-135",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Duplicate"],
		question: "Duplicate email delete করার সময় কীভাবে একটি record রেখে বাকিগুলো delete করবেন?",
		answer: `Conceptually:

ROW_NUMBER() দিয়ে duplicate group-এর মধ্যে একটি row retain করা যায়।

Example:

WITH duplicates AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY email
      ORDER BY id
    ) AS rn
  FROM users
)
DELETE ...
WHERE rn > 1;

Actual DELETE syntax database অনুযায়ী আলাদা হতে পারে।

Production-এ আগে SELECT দিয়ে affected rows verify করতে হবে এবং backup/transaction strategy বিবেচনা করতে হবে।`,
	},

	{
		id: "db-136",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Latest Record"],
		question: "প্রতিটি user-এর latest order কীভাবে বের করবেন?",
		answer: `ROW_NUMBER():

SELECT *
FROM (
  SELECT
    o.*,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY created_at DESC, id DESC
    ) AS rn
  FROM orders o
) x
WHERE rn = 1;

created_at-এর সাথে id tie-breaker রাখা useful যাতে ordering deterministic হয়।`,
	},

	{
		id: "db-137",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Aggregation"],
		question: "প্রতি customer-এর total order amount কীভাবে বের করবেন?",
		answer: `SELECT
  user_id,
  SUM(total) AS total_amount
FROM orders
GROUP BY user_id;

যদি order না থাকা user-ও দেখতে হয়:

users
LEFT JOIN orders
GROUP BY users.id

এবং NULL amount-এর জন্য COALESCE ব্যবহার করা যায়।`,
	},

	{
		id: "db-138",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Date"],
		question: "গত 30 দিনের orders কীভাবে বের করবেন?",
		answer: `Database-specific date syntax আলাদা।

Concept:

WHERE created_at >= CURRENT_TIME_OR_DATE - INTERVAL 30 DAY

MySQL-এ:

WHERE created_at >= NOW() - INTERVAL 30 DAY

PostgreSQL-এ:

WHERE created_at >= NOW() - INTERVAL '30 days'

Production query-তে timezone এবং timestamp semantics অবশ্যই consider করতে হবে।`,
	},

	{
		id: "db-139",
		category: "SQL Interview",
		difficulty: "Very Important",
		tags: ["SQL", "Aggregation"],
		question: "প্রতি মাসে কত order হয়েছে কীভাবে বের করবেন?",
		answer: `Database-specific date grouping ব্যবহার করা যায়।

Concept:

year + month
 ↓
GROUP BY
 ↓
COUNT(*)

PostgreSQL example:

SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*)
FROM orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;

Large dataset হলে function-based grouping-এর performance এবং pre-aggregation consider করা যায়।`,
	},

	// ============================================================
	// DATABASE ARCHITECTURE
	// ============================================================

	{
		id: "db-140",
		category: "Database Architecture",
		difficulty: "Senior",
		tags: ["Read Write Split", "Scaling"],
		question: "Read/Write Splitting কী?",
		answer: `Application write request primary database-এ পাঠায় এবং read request replica-তে পাঠাতে পারে।

Architecture:

Application
   |
   +---- Write ----> Primary
   |
   +---- Read -----> Replica

কিন্তু একটি সমস্যা:

Write Primary-তে
 ↓
Immediately Read Replica
 ↓
Replication lag
 ↓
Stale data

তাই strong read-after-write requirement থাকলে primary read করতে হতে পারে।`,
	},

	{
		id: "db-141",
		category: "Database Architecture",
		difficulty: "Senior",
		tags: ["Caching", "Database"],
		question: "Database-এর আগে Redis cache ব্যবহার করলে কী কী সমস্যা হতে পারে?",
		answer: `Cache performance improve করে, কিন্তু introduce করে:

- Cache invalidation
- Stale data
- Cache stampede
- Cache penetration
- Cache avalanche
- Memory limit
- Serialization issues

উদাহরণ:

DB update হয়েছে
 ↓
Cache পুরনো
 ↓
User stale data পাচ্ছে

তাই cache strategy-এর সাথে consistency strategy design করতে হবে।`,
	},

	{
		id: "db-142",
		category: "Database Architecture",
		difficulty: "Senior",
		tags: ["Cache Stampede", "Redis"],
		question: "Cache Stampede কী?",
		answer: `একটি popular cache key একই সময়ে অনেক request-এর জন্য expire করলে সবাই database-এ request পাঠাতে পারে।

Example:

Cache expired
 ↓
1000 requests
 ↓
1000 DB queries
 ↓
DB overloaded

Solutions:

- Locking
- Request coalescing
- Early refresh
- Randomized TTL
- Stale-while-revalidate

High-traffic application-এ এটি গুরুত্বপূর্ণ cache problem।`,
	},

	{
		id: "db-143",
		category: "Database Architecture",
		difficulty: "Senior",
		tags: ["Cache Penetration", "Redis"],
		question: "Cache Penetration কী?",
		answer: `যে data database-এও নেই, attacker/user বারবার সেই key request করলে cache miss হয়ে database query হতে পারে।

Example:

GET user/999999999
GET user/999999999
GET user/999999999

যদি record না থাকে এবং cache-ও না থাকে:

Request
 ↓
Cache miss
 ↓
DB query
 ↓
Not found

Solutions:

- Negative caching
- Input validation
- Bloom filter
- Rate limiting`,
	},

	// ============================================================
	// DATABASE MONITORING
	// ============================================================

	{
		id: "db-144",
		category: "Database Monitoring",
		difficulty: "Senior",
		tags: ["Monitoring", "Production"],
		question: "Production database-এর কোন metrics monitor করবেন?",
		answer: `Important metrics:

Performance:
- Query latency
- QPS
- TPS
- Slow queries

Resources:
- CPU
- RAM
- Disk
- IOPS
- Network

Database:
- Connections
- Connection pool usage
- Lock waits
- Deadlocks
- Buffer/cache hit ratio
- Replication lag

Storage:
- Database size
- Table growth
- Index growth

Availability:
- Errors
- Failover
- Replica health

Monitoring ছাড়া production database optimize করা কঠিন।`,
	},

	{
		id: "db-145",
		category: "Database Monitoring",
		difficulty: "Senior",
		tags: ["Slow Query", "Monitoring"],
		question: "Slow Query Log কী?",
		answer: `Slow query log এমন queries identify করতে সাহায্য করে যেগুলো configured threshold-এর বেশি সময় নেয়।

Example:

Query
 ↓
Execution time = 3.5 sec
 ↓
Slow query threshold = 1 sec
 ↓
Log

তারপর:

Slow query
 ↓
EXPLAIN
 ↓
Index/Query optimization

Production performance tuning-এর জন্য slow query analysis অত্যন্ত useful।`,
	},

	// ============================================================
	// BACKUP / RECOVERY DEEP DIVE
	// ============================================================

	{
		id: "db-146",
		category: "Backup & Recovery",
		difficulty: "Senior",
		tags: ["PITR", "Recovery"],
		question: "Point-in-Time Recovery বা PITR কী?",
		answer: `PITR হলো নির্দিষ্ট সময় পর্যন্ত database recover করার capability।

Example:

Database:

10:00 → Good
10:30 → Good
11:00 → Bad accidental DELETE
11:10 → Disaster noticed

PITR থাকলে:

Base Backup
 +
Transaction/WAL logs
 ↓
Recover to 10:59:59

এটি production database disaster recovery-এর জন্য খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-147",
		category: "Backup & Recovery",
		difficulty: "Senior",
		tags: ["Backup", "Disaster Recovery"],
		question: "Backup আছে কিন্তু restore test না করলে সমস্যা কী?",
		answer: `Backup file exist করা এবং backup successfully restore করা দুইটি আলাদা বিষয়।

Backup corrupt হতে পারে।

Possible problems:

- Missing files
- Wrong credentials
- Incompatible version
- Incomplete backup
- Broken restore process

তাই:

Backup
 ↓
Restore Test
 ↓
Validation
 ↓
Periodic Drill

করতে হবে।

Production disaster recovery-এর সবচেয়ে গুরুত্বপূর্ণ principle:

"Backup is not proven until restore is tested."`,
	},

	// ============================================================
	// DATABASE SECURITY
	// ============================================================

	{
		id: "db-148",
		category: "Database Security",
		difficulty: "Very Important",
		tags: ["Encryption", "Security"],
		question: "Encryption at Rest এবং Encryption in Transit কী?",
		answer: `Encryption at Rest:

Disk/storage-এ থাকা data encrypted।

Encryption in Transit:

Application ↔ Database network communication encrypted।

Typical:

Application
   |
 TLS
   |
Database

At Rest:
Disk
 ↓
Encrypted storage

Sensitive systems-এ দুই ধরনের encryption-ই গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-149",
		category: "Database Security",
		difficulty: "Very Important",
		tags: ["Secrets", "Security"],
		question: "Database password কীভাবে manage করা উচিত?",
		answer: `Production source code-এ database password hardcode করা উচিত নয়।

Bad:

DB_PASSWORD = "my-secret"

Better:

Application
 ↓
Secret Manager / Environment / Vault
 ↓
Database credentials

Important:

- Secret rotation
- Least privilege
- Separate credentials per service/environment
- No secrets in Git
- Audit access

Production-এ centralized secret management preferred।`,
	},

	// ============================================================
	// FINAL SENIOR INTERVIEW SCENARIOS
	// ============================================================

	{
		id: "db-150",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["System Design", "Troubleshooting"],
		question:
			"একটি API suddenly 10ms থেকে 2 seconds latency দিচ্ছে। Database issue কিনা কীভাবে বুঝবেন?",
		answer: `Step 1:

Application metrics দেখুন।

API latency:
10ms → 2 sec

Step 2:

DB query latency check করুন।

Step 3:

Connection pool check করুন।

Possible:

Pool exhausted
 ↓
Requests waiting
 ↓
API slow

Step 4:

Slow query check করুন।

Step 5:

Lock wait check করুন।

Step 6:

Database CPU/IO check করুন।

Step 7:

Replication lag check করুন।

Step 8:

Recent deployment/index/schema change check করুন।

Step 9:

EXPLAIN slow queries।

Step 10:

Root cause অনুযায়ী fix:

- Missing index
- Bad query
- Lock contention
- Pool sizing
- DB resource saturation
- Replica issue
- Network problem

Senior engineer-এর answer শুধু "index add করব" হওয়া উচিত নয়।

প্রথমে observe → measure → isolate → fix → verify করতে হবে।`,
	},

	{
		id: "db-151",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["System Design", "Scalability"],
		question: "Database scaling-এর জন্য প্রথমে কী করবেন?",
		answer: `সরাসরি sharding করা উচিত নয়।

Typical progression:

1. Fix bad queries
2. Add correct indexes
3. Optimize schema
4. Connection pooling
5. Add caching
6. Vertical scaling
7. Read replicas
8. Partition large tables
9. Archive old data
10. Sharding

Principle:

Optimize first
 ↓
Scale second
 ↓
Distribute when necessary

Premature sharding architecture অনেক complex করে দিতে পারে।`,
	},

	{
		id: "db-152",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["System Design", "Consistency"],
		question: "Database consistency এবং performance-এর মধ্যে trade-off কী?",
		answer: `Strong consistency সাধারণত বেশি coordination/locking/communication চাইতে পারে।

Performance/scalability-এর জন্য system কখনও:

- Caching
- Async processing
- Read replicas
- Eventual consistency

ব্যবহার করে।

Example:

Payment balance:
→ Strong consistency

Product view count:
→ Eventual consistency acceptable হতে পারে

সব data-এর জন্য একই consistency level দরকার হয় না।

Business requirement অনুযায়ী consistency boundary define করতে হয়।`,
	},

	{
		id: "db-153",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["System Design", "Data Integrity"],
		question: "Application validation এবং Database constraint—দুটোই কেন দরকার?",
		answer: `Application validation user-friendly error এবং business validation দেয়।

Database constraint শেষ layer হিসেবে data integrity enforce করে।

Example:

Application:
email format validate

Database:
email UNIQUE

কারণ অন্য service বা bug database-এ duplicate email insert করার চেষ্টা করতে পারে।

Layer:

API Validation
 ↓
Service Validation
 ↓
Database Constraint

Defense in depth হিসেবে এটি গুরুত্বপূর্ণ।`,
	},

	{
		id: "db-154",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["Architecture", "Microservices"],
		question: "Microservice architecture-এ কেন Database per Service ব্যবহার করা হয়?",
		answer: `প্রতিটি service নিজের data-এর owner হলে coupling কমে।

Example:

User Service
 ↓
User DB

Order Service
 ↓
Order DB

Payment Service
 ↓
Payment DB

Benefits:

- Loose coupling
- Independent deployment
- Independent scaling
- Service ownership

কিন্তু problem:

- Cross-service query
- Distributed transaction
- Data duplication
- Eventual consistency

তাই microservice database architecture relational monolith-এর চেয়ে বেশি complex।`,
	},

	{
		id: "db-155",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["Microservices", "Database"],
		question: "Microservices-এ অন্য service-এর database direct query করা উচিত কি?",
		answer: `সাধারণভাবে উচিত নয়।

Bad:

Order Service
 ↓
Payment Service DB

এতে tight coupling তৈরি হয়।

Better:

Order Service
 ↓
Order DB

Payment Service
 ↓
Payment DB

Communication:

Order Service
   ↓
API / Event
   ↓
Payment Service

এতে service ownership এবং boundaries পরিষ্কার থাকে।

বিশেষ ক্ষেত্রে analytics/reporting-এর জন্য separate read model তৈরি করা যেতে পারে।`,
	},

	{
		id: "db-156",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["Outbox", "Microservices"],
		question: "Database update এবং event publish একসাথে reliableভাবে কীভাবে করবেন?",
		answer: `Problem:

DB update successful
 ↓
Event publish failed

তাহলে database এবং message broker inconsistent হয়ে যায়।

Outbox Pattern:

BEGIN
 ↓
Update business data
 ↓
Insert event into outbox table
 ↓
COMMIT
 ↓
Outbox worker
 ↓
Publish event
 ↓
Mark event published

একই local transaction-এর মধ্যে business data এবং outbox event commit করা যায়।

এটি microservices-এ reliable event publishing-এর খুব common pattern।`,
	},

	{
		id: "db-157",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["CQRS", "Database"],
		question: "CQRS database architecture-এ কীভাবে ব্যবহার করা হয়?",
		answer: `CQRS:

Command Query Responsibility Segregation

Write model:

Command
 ↓
Write DB

Read model:

Query
 ↓
Read DB / Projection

Example:

Orders write model
        ↓
     Events
        ↓
Read Model
        ↓
Dashboard

Benefits:

- Read optimization
- Independent scaling
- Specialized projections

Trade-off:

- Complexity
- Eventual consistency
- Multiple data models

Simple CRUD application-এ CQRS প্রয়োজন নাও হতে পারে।`,
	},

	{
		id: "db-158",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["Event Sourcing", "Database"],
		question: "Event Sourcing কী?",
		answer: `Event Sourcing-এ current state-এর বদলে state পরিবর্তনের events source of truth হিসেবে store করা হয়।

Example:

AccountCreated
MoneyDeposited(1000)
MoneyWithdrawn(200)
MoneyDeposited(500)

Current balance:

1000 - 200 + 500 = 1300

Benefits:

- Complete history
- Auditability
- Replay capability

Challenges:

- Event schema evolution
- Storage growth
- Query complexity
- Eventual consistency

Banking/domain-heavy systems-এ useful হতে পারে, কিন্তু সাধারণ CRUD-এর জন্য overkill হতে পারে।`,
	},

	{
		id: "db-159",
		category: "Database Interview",
		difficulty: "Senior",
		tags: ["Interview", "Architecture"],
		question: "Database interview-এ একজন Senior Backend Engineer-এর কী কী গভীরভাবে জানা উচিত?",
		answer: `Minimum strong areas:

1. SQL
2. JOIN
3. GROUP BY
4. Subquery
5. CTE
6. Window functions
7. Index
8. B-Tree/B+Tree
9. Composite index
10. Covering index
11. EXPLAIN
12. Query optimization
13. ACID
14. Transactions
15. Isolation levels
16. MVCC
17. Locks
18. Deadlocks
19. Optimistic locking
20. Pessimistic locking
21. Buffer pool
22. Redo/WAL
23. Undo
24. Replication
25. Replication lag
26. Read replica
27. Partitioning
28. Sharding
29. Caching
30. Redis
31. Backup
32. PITR
33. RPO/RTO
34. Security
35. SQL injection
36. Database migrations
37. Zero-downtime migration
38. Microservice database ownership
39. Outbox
40. Distributed transaction
41. CQRS
42. Event sourcing

Senior level-এ শুধু definition নয়।

আপনাকে explain করতে হবে:

"What happens internally?"
"Why?"
"When should I use it?"
"What are the trade-offs?"
"How would I debug it in production?"`,
	},
];
