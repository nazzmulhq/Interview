const microservice = [
	{
		id: "microservice-1",
		category: "Microservices",
		difficulty: "Beginner",
		tags: ["Microservice", "Architecture"],
		question: "Microservice কী?",
		answer: `Microservice হলো এমন একটি architectural style যেখানে একটি বড় application-কে ছোট ছোট independently deployable service-এ ভাগ করা হয়।

প্রতিটি service সাধারণত একটি নির্দিষ্ট business capability নিয়ে কাজ করে।

Example:

E-commerce System

User Service
Product Service
Order Service
Payment Service
Inventory Service
Notification Service

প্রতিটি service:

- আলাদাভাবে deploy করা যায়
- আলাদাভাবে scale করা যায়
- নিজের business logic manage করে
- অন্য service-এর সাথে API/message-এর মাধ্যমে communicate করে

Example flow:

Client
  ↓
API Gateway
  ↓
Order Service
  ├── Payment Service
  ├── Inventory Service
  └── Notification Service

Microservice-এর মূল লক্ষ্য হলো independent development, deployment, scaling এবং failure isolation।`,
	},

	{
		id: "microservice-2",
		category: "Microservices",
		difficulty: "Beginner",
		tags: ["Monolith", "Microservice", "Architecture"],
		question: "Monolith এবং Microservice-এর মধ্যে পার্থক্য কী?",
		answer: `Monolith:

একটি বড় application-এর মধ্যে সব business functionality থাকে।

Example:

User
Product
Order
Payment
Inventory
সব একই application-এর মধ্যে।

Microservice:

প্রতিটি major business capability আলাদা service।

Example:

User Service
Product Service
Order Service
Payment Service

Monolith-এর সুবিধা:

- সহজ development
- সহজ deployment
- সহজ debugging
- কম infrastructure complexity

Microservice-এর সুবিধা:

- Independent deployment
- Independent scaling
- Team autonomy
- Fault isolation
- Technology flexibility

Microservice সব project-এর জন্য automatically better নয়। System complexity justify করলে ব্যবহার করা উচিত।`,
	},

	{
		id: "microservice-3",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Service Boundary", "DDD", "Architecture"],
		question: "Microservice boundary কীভাবে নির্ধারণ করবেন?",
		answer: `Service boundary নির্ধারণের সময় technical layer-এর পরিবর্তে business capability এবং domain boundary consider করা উচিত।

Example:

ভুল:

User CRUD Service
Product CRUD Service
Order CRUD Service

Better:

Identity Service
Catalog Service
Order Management Service
Payment Service
Inventory Service

DDD-এর bounded context concept এখানে useful।

Consider করুন:

- Business responsibility
- Data ownership
- Change frequency
- Team ownership
- Scaling requirement
- Transaction boundary

একটি service-এর business responsibility clear হওয়া উচিত।`,
	},

	{
		id: "microservice-4",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Database", "Database Per Service"],
		question: "Database per service pattern কী?",
		answer: `Database per service হলো microservice architecture-এর একটি গুরুত্বপূর্ণ principle।

Example:

User Service
 → User DB

Order Service
 → Order DB

Payment Service
 → Payment DB

Inventory Service
 → Inventory DB

একটি service অন্য service-এর database directly access করবে না।

Communication হবে:

API
অথবা
Message/Event

Benefits:

- Loose coupling
- Independent schema
- Independent scaling
- Independent deployment

কিন্তু distributed transaction এবং data consistency handle করার complexity বেড়ে যায়।`,
	},

	{
		id: "microservice-5",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Shared Database", "Architecture"],
		question: "Microservices-এ shared database কেন problematic?",
		answer: `যদি অনেক service একই database এবং একই tables directly access করে, তাহলে serviceগুলো tightly coupled হয়ে যায়।

Example:

Order Service
     ↓
Shared DB
     ↑
Payment Service

সমস্যা:

- Schema change coordination
- Deployment dependency
- Data ownership unclear
- Independent scaling কঠিন
- Service boundary ভেঙে যায়

Ideal approach:

Service
 ↓
Own Database

তবে legacy migration বা ছোট system-এ shared database transitional architecture হিসেবে থাকতে পারে।`,
	},

	{
		id: "microservice-6",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["REST", "HTTP", "Communication"],
		question: "Microservices-এর মধ্যে REST communication কী?",
		answer: `REST হলো HTTP-based synchronous communication mechanism।

Example:

Order Service
   ↓ HTTP
Payment Service
   ↓
Response

Example:

POST /payments

Request:

{
  "order_id": 1001,
  "amount": 5000
}

Response:

{
  "payment_id": 2001,
  "status": "success"
}

REST সহজ এবং widely supported।

কিন্তু synchronous dependency তৈরি হওয়ায় downstream service unavailable হলে upstream request fail বা delay হতে পারে।`,
	},

	{
		id: "microservice-7",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["gRPC", "RPC", "Communication"],
		question: "gRPC কী এবং microservices-এ কেন ব্যবহার করা হয়?",
		answer: `gRPC হলো high-performance RPC framework।

এটি সাধারণত HTTP/2 এবং Protocol Buffers ব্যবহার করে।

Example:

Order Service
    ↓ gRPC
Inventory Service

Benefits:

- High performance
- Strong contract
- Binary serialization
- Streaming support
- Code generation

Internal service-to-service communication-এর জন্য gRPC useful হতে পারে।

Public browser-facing API-এর জন্য REST/HTTP JSON অনেক ক্ষেত্রে simpler।`,
	},

	{
		id: "microservice-8",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["REST", "gRPC", "Comparison"],
		question: "REST বনাম gRPC — কখন কোনটি ব্যবহার করবেন?",
		answer: `REST:

- Simple
- Browser friendly
- JSON
- Easy debugging
- Public API-এর জন্য ভালো

gRPC:

- High performance
- Strong schema
- Binary protocol
- Internal service communication-এর জন্য ভালো
- Streaming support

Example:

Frontend
 ↓
REST/HTTP
 ↓
API Gateway

Internal:

Order Service
 ↓ gRPC
Inventory Service

একই architecture-এ REST এবং gRPC দুটোই ব্যবহার করা সম্ভব।`,
	},

	{
		id: "microservice-9",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Kafka", "RabbitMQ", "Messaging"],
		question: "Kafka এবং RabbitMQ-এর মধ্যে পার্থক্য কী?",
		answer: `RabbitMQ মূলত message broker এবং queue-based messaging-এর জন্য জনপ্রিয়।

Kafka হলো distributed event streaming platform।

RabbitMQ:

Producer
 ↓
Queue
 ↓
Consumer

Kafka:

Producer
 ↓
Topic
 ↓
Partition
 ↓
Consumer Group

RabbitMQ useful:

- Task queue
- Command processing
- Work distribution
- Routing

Kafka useful:

- Event streaming
- High throughput
- Event replay
- Data pipeline
- Multiple consumers

কোনটি better তা use case-এর উপর নির্ভর করে।`,
	},

	{
		id: "microservice-10",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Kafka", "Topic", "Partition"],
		question: "Kafka Topic এবং Partition কী?",
		answer: `Kafka Topic হলো event-এর logical category।

Example:

order.created
payment.completed
inventory.updated

একটি topic multiple partition-এ ভাগ হতে পারে।

Example:

orders
 ├── Partition 0
 ├── Partition 1
 └── Partition 2

Partition-এর কারণে Kafka parallel processing এবং scalability করতে পারে।

একই partition-এর মধ্যে message ordering বজায় থাকে।

Partition key সঠিকভাবে design করা গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-11",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Kafka", "Consumer Group"],
		question: "Kafka Consumer Group কী?",
		answer: `Consumer Group হলো এক বা একাধিক consumer-এর logical group।

Example:

Topic:
orders

Consumer Group:
order-processing

Consumers:

Consumer 1
Consumer 2
Consumer 3

একটি partition একই consumer group-এর মধ্যে সাধারণত এক consumer দ্বারা process হয়।

এর ফলে workload distribute করা যায়।

একই Kafka event multiple business system-কে দিতে চাইলে আলাদা consumer group ব্যবহার করা যায়।

Example:

orders topic
 ├── Payment Group
 ├── Analytics Group
 └── Notification Group`,
	},

	{
		id: "microservice-12",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["RabbitMQ", "Exchange", "Queue"],
		question: "RabbitMQ Exchange কী?",
		answer: `RabbitMQ-তে Producer সাধারণত সরাসরি queue-তে message পাঠায় না।

Producer
 ↓
Exchange
 ↓
Binding
 ↓
Queue
 ↓
Consumer

Common exchange types:

1. Direct
2. Topic
3. Fanout
4. Headers

Direct:
→ Exact routing key

Topic:
→ Pattern-based routing

Fanout:
→ সব bound queue-তে broadcast

Exchange routing flexibility দেয়।`,
	},

	{
		id: "microservice-13",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Async", "Synchronous", "Communication"],
		question: "Synchronous এবং Asynchronous communication-এর পার্থক্য কী?",
		answer: `Synchronous:

Service A request পাঠিয়ে Service B-এর response-এর জন্য অপেক্ষা করে।

A
 ↓
B
 ↓
Response
 ↓
A

Asynchronous:

A message/event পাঠিয়ে immediately continue করতে পারে।

A
 ↓
Message Broker
 ↓
B

Synchronous:
→ Immediate response দরকার হলে ভালো

Asynchronous:
→ Decoupling
→ Background processing
→ High throughput
→ Event-driven architecture

দুটো architecture-এ একসাথে ব্যবহার করা যায়।`,
	},

	{
		id: "microservice-14",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Event Driven", "Architecture"],
		question: "Event-driven architecture কী?",
		answer: `Event-driven architecture-এ একটি service কোনো event ঘটলে event publish করে এবং অন্য serviceগুলো event consume করে।

Example:

Order Created
 ↓
order.created event
 ↓
 ├── Inventory Service
 ├── Payment Service
 ├── Notification Service
 └── Analytics Service

Producer consumer-এর implementation সম্পর্কে কম জানে।

এতে loose coupling তৈরি হয়।`,
	},

	{
		id: "microservice-15",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Event", "Command", "Architecture"],
		question: "Event এবং Command-এর মধ্যে পার্থক্য কী?",
		answer: `Command:

কোনো action করার instruction।

Example:

CreateOrder
ChargePayment
ReserveInventory

Event:

কোনো ঘটনা ইতিমধ্যে ঘটেছে তার notification।

Example:

OrderCreated
PaymentCompleted
InventoryReserved

Command:

"এটা করো"

Event:

"এটা হয়ে গেছে"

Distributed architecture-এ এই distinction পরিষ্কার রাখা গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-16",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Saga", "Distributed Transaction"],
		question: "Saga Pattern কী?",
		answer: `Saga হলো distributed transaction manage করার pattern।

Microservices-এ একটি business transaction অনেক service-এর মধ্যে ভাগ হতে পারে।

Example:

Create Order
 ↓
Reserve Inventory
 ↓
Process Payment
 ↓
Confirm Order

যদি Payment fail করে:

Cancel Payment
 ↓
Release Inventory
 ↓
Cancel Order

এই compensating actions-এর মাধ্যমে distributed transaction handle করা হয়।

Saga দুইভাবে implement করা যায়:

1. Choreography
2. Orchestration`,
	},

	{
		id: "microservice-17",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Saga", "Choreography", "Orchestration"],
		question: "Saga Choreography এবং Orchestration-এর মধ্যে পার্থক্য কী?",
		answer: `Choreography:

প্রতিটি service event publish করে এবং অন্য service সেই event consume করে।

Order
 ↓
OrderCreated
 ↓
Inventory
 ↓
InventoryReserved
 ↓
Payment

Central coordinator থাকে না।

Orchestration:

একটি Saga Orchestrator পুরো workflow control করে।

Orchestrator
 ├── Order
 ├── Inventory
 ├── Payment
 └── Notification

Choreography:
→ More decentralized
→ Simple flow-এ ভালো

Orchestration:
→ Complex workflow-এর জন্য বেশি observable এবং controllable হতে পারে।`,
	},

	{
		id: "microservice-18",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Eventual Consistency", "Distributed Systems"],
		question: "Eventual Consistency কী?",
		answer: `Distributed system-এ সব service একই মুহূর্তে একই data না দেখলেও কিছু সময় পরে consistent state-এ পৌঁছালে তাকে eventual consistency বলা হয়।

Example:

Order Service:
Order = CONFIRMED

কিছু milliseconds/seconds পরে:

Inventory Service:
Stock updated

তারপর:

Analytics Service:
Order count updated

এখানে temporary inconsistency থাকতে পারে।

Distributed systems-এ strong consistency-এর পরিবর্তে eventual consistency অনেক ক্ষেত্রে scalability এবং availability improve করে।`,
	},

	{
		id: "microservice-19",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Distributed Transaction", "2PC", "Saga"],
		question: "Microservices-এ distributed transaction কেন কঠিন?",
		answer: `একটি transaction যদি multiple independent database-এর উপর কাজ করে, তাহলে traditional single-database ACID transaction-এর মতো সহজভাবে rollback করা যায় না।

Example:

Order DB
Payment DB
Inventory DB

একসাথে:

Order Created
Payment Success
Inventory Reserved

এর মধ্যে Inventory fail করলে আগের operation rollback করা কঠিন।

Solutions:

- Saga
- Outbox Pattern
- Idempotency
- Eventual Consistency

2PC কিছু environment-এ সম্ভব হলেও operational complexity এবং availability trade-off থাকতে পারে।`,
	},

	{
		id: "microservice-20",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["CQRS", "Architecture"],
		question: "CQRS কী?",
		answer: `CQRS = Command Query Responsibility Segregation।

এখানে write এবং read responsibility আলাদা করা হয়।

Traditional:

Same Model
 ↓
Read + Write

CQRS:

Command
 ↓
Write Model
 ↓
Database

Query
 ↓
Read Model
 ↓
Database/Read Store

CQRS useful যখন:

- Read/write workload খুব আলাদা
- Complex domain
- High read scalability
- Different read models দরকার

সব CRUD application-এ CQRS প্রয়োজন নেই।`,
	},

	{
		id: "microservice-21",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Event Sourcing", "CQRS"],
		question: "Event Sourcing কী?",
		answer: `Event Sourcing-এ current state শুধু final row হিসেবে না রেখে state পরিবর্তনের events store করা হয়।

Example:

AccountCreated
MoneyDeposited
MoneyWithdrawn
MoneyDeposited

Current balance events replay করে reconstruct করা যায়।

Traditional:

Account
→ balance = 5000

Event Sourcing:

Event 1
Event 2
Event 3
Event 4

তারপর:

Events
 ↓
Replay
 ↓
Current State

Audit এবং historical reconstruction-এর জন্য useful।

তবে complexity বেশি।`,
	},

	{
		id: "microservice-22",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Outbox Pattern", "Database", "Events"],
		question: "Outbox Pattern কী?",
		answer: `Outbox Pattern database update এবং event publishing-এর consistency problem solve করতে ব্যবহৃত হয়।

Problem:

Database update সফল
 ↓
Kafka publish failed

তখন database state update হয়েছে কিন্তু event publish হয়নি।

Outbox approach:

Transaction-এর মধ্যে:

Business Data
+
Outbox Event

একসাথে database-এ save করা হয়।

তারপর:

Outbox Table
 ↓
Publisher
 ↓
Kafka
 ↓
Consumer

এতে event হারানোর risk কমে।

Consumer side-এ idempotency রাখা গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-23",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Idempotency", "Distributed Systems"],
		question: "Idempotency কী?",
		answer: `একই operation একাধিকবার execute হলেও final result একই থাকলে operation-টি idempotent।

Example:

POST /payment

Request ID:
abc123

প্রথম request:

Payment Created

একই request retry হলে:

Existing payment return

নতুন payment create নয়।

Idempotency গুরুত্বপূর্ণ:

- Payment
- Order
- Message consumer
- Retry
- Webhook

এর ক্ষেত্রে।

Common implementation:

idempotency_key
+
unique database constraint
+
stored result`,
	},

	{
		id: "microservice-24",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Retry", "Resilience"],
		question: "Microservice retry কী?",
		answer: `Temporary failure হলে failed request আবার execute করাকে retry বলে।

Example:

Service A
 ↓
Service B
 ↓
Timeout
 ↓
Retry
 ↓
Service B

Retry useful:

- Temporary network failure
- Timeout
- Temporary 5xx
- Broker connection failure

Retry strategy:

1. Immediate retry
2. Fixed delay
3. Exponential backoff
4. Exponential backoff + jitter

সব error retry করা উচিত নয়।

Permanent 4xx error সাধারণত retry করা উচিত নয়।`,
	},

	{
		id: "microservice-25",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Circuit Breaker", "Resilience"],
		question: "Circuit Breaker Pattern কী?",
		answer: `Circuit breaker cascading failure prevent করতে সাহায্য করে।

তিনটি common state:

CLOSED
→ Request normally যায়

OPEN
→ Downstream failure বেশি হলে request block করে

HALF_OPEN
→ কিছু test request পাঠিয়ে service recover করেছে কিনা check করে

Flow:

Service A
 ↓
Service B
 ↓
Repeated Failure
 ↓
Circuit OPEN
 ↓
Fast Failure

এতে unavailable service-এর উপর অতিরিক্ত load দেওয়া বন্ধ হয়।`,
	},

	{
		id: "microservice-26",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Timeout", "Resilience"],
		question: "Microservice timeout কেন গুরুত্বপূর্ণ?",
		answer: `একটি service অন্য service-এর response-এর জন্য unlimited wait করলে thread/connection/resource আটকে যেতে পারে।

Example:

A
 ↓
B
 ↓
C
 ↓
D

D slow হলে পুরো chain slow হতে পারে।

তাই প্রত্যেক network call-এ appropriate timeout রাখা উচিত।

Timeout types:

- Connection timeout
- Read timeout
- Overall request timeout

Timeout + Retry + Circuit Breaker একসাথে resilience improve করে।`,
	},

	{
		id: "microservice-27",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Rate Limiting", "API Gateway", "Security"],
		question: "Rate Limiting কী?",
		answer: `Rate limiting নির্দিষ্ট সময়ের মধ্যে client কত request করতে পারবে তা সীমাবদ্ধ করে।

Example:

100 requests/minute

100-এর বেশি হলে:

HTTP 429 Too Many Requests

Common algorithms:

- Fixed Window
- Sliding Window
- Token Bucket
- Leaky Bucket

Use cases:

- API abuse prevention
- DDoS mitigation
- Resource protection
- Fair usage

Distributed environment-এ Redis-based rate limiting ব্যবহার করা যেতে পারে।`,
	},

	{
		id: "microservice-28",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["API Gateway", "Architecture"],
		question: "API Gateway কী?",
		answer: `API Gateway হলো client এবং backend services-এর মধ্যে entry point।

Client
 ↓
API Gateway
 ├── User Service
 ├── Order Service
 ├── Payment Service
 └── Product Service

Gateway-এর কাজ হতে পারে:

- Routing
- Authentication
- Authorization
- Rate limiting
- TLS termination
- Request logging
- Load balancing
- Response aggregation

তবে gateway-তে অতিরিক্ত business logic রাখা উচিত নয়।`,
	},

	{
		id: "microservice-29",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Service Discovery", "Networking"],
		question: "Service Discovery কী?",
		answer: `Microservice environment-এ service-এর IP/port dynamic হতে পারে।

Service Discovery service-এর location খুঁজে পেতে সাহায্য করে।

Example:

Order Service
 ↓
Service Discovery
 ↓
Payment Service instances

Payment Service:

payment-1
payment-2
payment-3

Service discovery health এবং available instances সম্পর্কে information দিতে পারে।

Kubernetes environment-এ built-in service discovery mechanisms পাওয়া যায়।`,
	},

	{
		id: "microservice-30",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["Load Balancing", "Scalability"],
		question: "Microservices-এ Load Balancing কী?",
		answer: `একই service-এর multiple instance-এর মধ্যে request distribute করাকে load balancing বলে।

Example:

             Load Balancer
              /    |    \\
             /     |     \\
        Order-1 Order-2 Order-3

Benefits:

- Horizontal scaling
- High availability
- Traffic distribution
- Instance failure handling

Load balancing client-side বা server-side হতে পারে।`,
	},

	{
		id: "microservice-31",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Distributed Tracing", "Observability"],
		question: "Distributed Tracing কী?",
		answer: `একটি request multiple microservice-এর মধ্যে travel করলে পুরো request path track করাকে distributed tracing বলে।

Example:

Client
 ↓
API Gateway
 ↓
Order Service
 ↓
Payment Service
 ↓
Inventory Service
 ↓
Database

একটি Trace ID এবং বিভিন্ন Span দিয়ে request journey track করা হয়।

এতে identify করা যায়:

- কোন service slow
- কোথায় error
- কোন dependency bottleneck
- latency কোথায় হচ্ছে`,
	},

	{
		id: "microservice-32",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Correlation ID", "Logging", "Observability"],
		question: "Correlation ID কী?",
		answer: `একটি distributed request-এর সাথে unique identifier attach করে সব service-এর log-এ একই ID ব্যবহার করলে request trace করা সহজ হয়।

Example:

Request ID:
abc-123

Gateway:
abc-123

Order Service:
abc-123

Payment Service:
abc-123

Inventory Service:
abc-123

এতে distributed logs correlate করা যায়।`,
	},

	{
		id: "microservice-33",
		category: "Microservices",
		difficulty: "Intermediate",
		tags: ["DLQ", "RabbitMQ", "Kafka"],
		question: "Dead Letter Queue বা DLQ কী?",
		answer: `যে message বারবার processing fail করে এবং normal queue থেকে আর process করা উচিত নয়, তাকে Dead Letter Queue-তে পাঠানো যায়।

Flow:

Queue
 ↓
Consumer
 ↓
Failure
 ↓
Retry
 ↓
Retry Limit Exceeded
 ↓
DLQ

DLQ থেকে পরে:

- Inspect
- Fix
- Replay
- Manual processing

করা যায়।

Production messaging system-এ DLQ operational visibility-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-34",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Message Ordering", "Kafka"],
		question: "Distributed messaging system-এ message ordering কীভাবে maintain করবেন?",
		answer: `Ordering requirement আগে define করতে হবে।

Kafka-তে একই partition-এর message order preserve করা হয়।

Example:

order_id = 1001

সব events একই partition key দিয়ে publish করলে:

OrderCreated
PaymentCompleted
OrderShipped

একই partition-এ থাকতে পারে।

তবে পুরো topic-এর global ordering সাধারণত scalable নয়।

Ordering-এর জন্য:

- Partition key
- Sequence number
- Version
- Consumer logic

ব্যবহার করা যায়।`,
	},

	{
		id: "microservice-35",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Duplicate Message", "Idempotency", "Messaging"],
		question: "Message duplicate হলে কীভাবে handle করবেন?",
		answer: `Distributed messaging system-এ at-least-once delivery-এর কারণে duplicate message আসতে পারে।

Example:

PaymentCompleted
↓
Consumer
↓
Processing
↓
Network failure before acknowledgement
↓
Message delivered again

Solution:

Consumer idempotent করতে হবে।

Example:

event_id = abc123

Database:

processed_events

যদি abc123 already processed হয়:

→ Ignore

না হলে:

→ Process
→ Store event_id

এর ফলে duplicate processing prevent করা যায়।`,
	},

	{
		id: "microservice-36",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Delivery Semantics", "Kafka", "RabbitMQ"],
		question: "At-most-once, At-least-once এবং Exactly-once কী?",
		answer: `At-most-once:

Message zero বা one time process হতে পারে।

→ Duplicate কম
→ Message loss হতে পারে

At-least-once:

Message one বা multiple times deliver হতে পারে।

→ Message loss কম
→ Duplicate possible

Exactly-once:

Effect logically একবারের মতো guarantee করার চেষ্টা।

Distributed systems-এ true exactly-once end-to-end guarantee complex।

Practical design:

At-least-once delivery
+
Idempotent consumer

অনেক production system-এর জন্য একটি practical strategy।`,
	},

	{
		id: "microservice-37",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Bulkhead", "Resilience"],
		question: "Bulkhead Pattern কী?",
		answer: `Bulkhead pattern একটি failure যাতে পুরো application-এর resources consume করতে না পারে তা prevent করে।

Example:

Service
 ├── Payment connection pool
 ├── Order connection pool
 └── Reporting connection pool

যদি Reporting খুব slow হয়, তার resource exhaustion যেন Payment system-কে affect না করে।

Concept:

Separate resources
→ Failure isolation

এটি concurrency limit এবং separate pools দিয়েও implement করা যায়।`,
	},

	{
		id: "microservice-38",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Backpressure", "Streaming", "Performance"],
		question: "Backpressure কী?",
		answer: `Producer যদি consumer-এর processing capacity-এর চেয়ে দ্রুত data produce করে, তাহলে system overload হতে পারে।

Backpressure হলো producer/processing pipeline-কে consumer capacity অনুযায়ী control করা।

Example:

Producer
→ 10,000 msg/sec

Consumer
→ 2,000 msg/sec

Queue continuously grow করলে:

Memory
CPU
Storage

pressure তৈরি হতে পারে।

Solutions:

- Consumer scaling
- Rate control
- Bounded queue
- Batch processing
- Flow control
- Backpressure mechanisms`,
	},

	{
		id: "microservice-39",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Health Check", "Kubernetes", "Deployment"],
		question: "Liveness এবং Readiness Probe কী?",
		answer: `Liveness:

Application process alive কিনা determine করে।

Failure হলে application restart হতে পারে।

Readiness:

Application traffic receive করার জন্য ready কিনা determine করে।

Example:

Application starting
 ↓
Database connection initializing
 ↓
Not Ready

Ready হওয়ার পরে:

Load Balancer
 ↓
Application

Microservice deployment-এ health endpoint এবং readiness/liveness checks গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-40",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Graceful Shutdown", "Deployment"],
		question: "Microservice graceful shutdown কী?",
		answer: `Application shutdown হওয়ার সময় active request এবং message processing safely complete করার process হলো graceful shutdown।

Example:

Shutdown signal
 ↓
Stop accepting new requests
 ↓
Finish active requests
 ↓
Finish/acknowledge message processing
 ↓
Close DB connection
 ↓
Close broker connection
 ↓
Exit

এতে:

- Request loss
- Duplicate processing
- Partial operation

কমে।

Container/Kubernetes deployment-এ graceful shutdown বিশেষভাবে গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-41",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Python", "FastAPI", "Microservices"],
		question: "Python দিয়ে microservice তৈরি করতে কোন framework ব্যবহার করবেন?",
		answer: `Python microservice-এর জন্য use case অনুযায়ী framework নির্বাচন করা যায়।

FastAPI:

- High-performance API
- Async support
- Type hints
- Automatic OpenAPI
- Pydantic validation

Django:

- Full-featured
- ORM
- Authentication
- Admin
- Large business applications

Flask:

- Lightweight
- Flexible
- Simple services

Typical modern API microservice:

FastAPI
+
Pydantic
+
SQLAlchemy
+
PostgreSQL
+
Redis
+
Kafka/RabbitMQ

তবে framework-এর চেয়ে service boundary এবং architecture বেশি গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-42",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["FastAPI", "Async", "Concurrency"],
		question: "FastAPI microservice-এ async/await কেন গুরুত্বপূর্ণ?",
		answer: `Microservice অনেক সময় I/O-bound operation করে।

Example:

API Request
 ↓
Database
 ↓
External API
 ↓
Message Broker

এই সময় CPU কাজ না করে I/O-এর জন্য অপেক্ষা করে।

async/await ব্যবহার করলে event loop অন্য request process করতে পারে।

Example:

async def get_payment():
    result = await payment_client.call()
    return result

তবে synchronous blocking library async endpoint-এর মধ্যে ব্যবহার করলে event loop block হতে পারে।`,
	},

	{
		id: "microservice-43",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Connection Pool", "Database", "Performance"],
		question: "Microservice-এ database connection pool কেন গুরুত্বপূর্ণ?",
		answer: `প্রতিটি request-এর জন্য নতুন database connection তৈরি করলে overhead এবং database overload হতে পারে।

Connection pool:

Application
 ↓
Connection Pool
 ├── Connection 1
 ├── Connection 2
 ├── Connection 3
 └── Connection 4
 ↓
Database

Benefits:

- Connection reuse
- Lower latency
- Controlled DB connections

Pool size খুব বড় করলেও সমস্যা হতে পারে।

Multiple service instance থাকলে:

Total DB Connections
=
Instance Count × Pool Size

তাই database capacity অনুযায়ী pool size design করতে হবে।`,
	},

	{
		id: "microservice-44",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["API Versioning", "Backward Compatibility"],
		question: "Microservice API versioning কীভাবে করবেন?",
		answer: `API contract পরিবর্তন করলে existing consumers break করা যাবে না।

Common approach:

/api/v1/orders
/api/v2/orders

অথবা header-based versioning।

Best practice:

- Backward compatibility
- Deprecation period
- Consumer migration
- Contract testing
- Documentation

Distributed system-এ service independently deploy হওয়ায় backward compatibility অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-45",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Contract Testing", "Microservices", "Testing"],
		question: "Contract Testing কী?",
		answer: `Microservice A এবং B-এর API contract compatible কিনা test করাকে contract testing বলে।

Example:

Order Service
 ↓
Payment Service

Order Service expects:

POST /payments

Response:

{
  "payment_id": "...",
  "status": "success"
}

Payment Service যদি response structure পরিবর্তন করে consumer break হতে পারে।

Contract test এই compatibility automatedভাবে verify করে।`,
	},

	{
		id: "microservice-46",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Distributed Lock", "Redis", "Concurrency"],
		question: "Distributed Lock কী?",
		answer: `একাধিক application instance-এর মধ্যে একই resource-এর উপর concurrent operation control করতে distributed lock ব্যবহার করা যায়।

Example:

Instance A
Instance B
Instance C

সবাই একই order process করতে চাইছে।

Distributed Lock
 ↓
Only one instance processes

Redis-based lock বা database-based locking ব্যবহার করা যায়।

তবে distributed lock-এর correctness, timeout, ownership এবং failure handling carefully design করতে হয়।

সম্ভব হলে idempotency এবং database constraints দিয়ে problem solve করা আরও robust হতে পারে।`,
	},

	{
		id: "microservice-47",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Clock", "Distributed Systems"],
		question: "Distributed system-এ clock problem কী?",
		answer: `Different machines-এর system clock perfectly synchronized নাও হতে পারে।

Example:

Server A:
10:00:00.100

Server B:
10:00:00.050

তাই শুধু local timestamp ব্যবহার করে distributed event ordering নির্ধারণ করা risky হতে পারে।

Solutions:

- NTP
- Logical clocks
- Sequence numbers
- Event IDs
- Database ordering
- Kafka partition ordering

Distributed systems-এ time এবং ordering আলাদা concept হিসেবে ভাবা গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-48",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["CAP", "Distributed Systems"],
		question: "CAP Theorem কী?",
		answer: `CAP theorem অনুযায়ী distributed data system-এর network partition থাকলে একই সময়ে strong Consistency এবং Availability দুটোই সম্পূর্ণভাবে guarantee করা যায় না।

CAP:

C = Consistency
A = Availability
P = Partition Tolerance

বাস্তব distributed system-এ network partition handle করতে হয়।

তাই partition-এর সময় system consistency বা availability-এর trade-off নিতে পারে।

CAP-কে database selection এবং distributed architecture বুঝতে ব্যবহার করা হয়।`,
	},

	{
		id: "microservice-49",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["PACELC", "Distributed Systems"],
		question: "PACELC কী?",
		answer: `PACELC CAP theorem-এর একটি extension।

Partition হলে:

P
→ Availability (A)
অথবা
→ Consistency (C)

Else:

E
→ Latency (L)
অথবা
→ Consistency (C)

অর্থাৎ partition না থাকলেও distributed system-এ latency এবং consistency-এর trade-off থাকতে পারে।

এটি distributed database architecture বুঝতে useful conceptual model।`,
	},

	{
		id: "microservice-50",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Observability", "Metrics", "Logging", "Tracing"],
		question: "Microservice observability কী?",
		answer: `Observability হলো system-এর internal state external signals থেকে বুঝতে পারার capability।

Three major pillars:

1. Logs
2. Metrics
3. Traces

Logs:
→ কী ঘটেছে?

Metrics:
→ কতবার/কত দ্রুত/কত বেশি ঘটছে?

Traces:
→ request কোথায় কোথায় গেছে?

Example:

Request latency
Error rate
CPU
Memory
DB latency
Kafka lag
Queue depth
HTTP 5xx

Production microservice-এর reliability বুঝতে observability অপরিহার্য।`,
	},

	{
		id: "microservice-51",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Kafka", "Consumer Lag", "Monitoring"],
		question: "Kafka Consumer Lag কী?",
		answer: `Consumer lag হলো producer-এর latest message position এবং consumer-এর processed position-এর মধ্যে difference।

Example:

Latest Offset:
1000

Consumer Offset:
850

Lag:
150

Lag continuously বাড়লে consumer processing capacity insufficient হতে পারে।

Possible solutions:

- More consumers
- Increase partitions
- Optimize consumer
- Batch processing
- Reduce downstream latency

Monitoring Kafka lag production reliability-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-52",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Retry", "Dead Letter Queue", "Failure Handling"],
		question: "Retry এবং DLQ কীভাবে একসাথে ব্যবহার করবেন?",
		answer: `একটি message processing fail হলে প্রথমে retry করা যেতে পারে।

Flow:

Message
 ↓
Consumer
 ↓
Failure
 ↓
Retry 1
 ↓
Retry 2
 ↓
Retry 3
 ↓
Still Failed
 ↓
DLQ

Temporary error:
→ Retry

Permanent/poison message:
→ DLQ

DLQ monitoring এবং replay mechanism থাকা উচিত।

Consumer idempotent হওয়া জরুরি কারণ retry-এর কারণে duplicate processing হতে পারে।`,
	},

	{
		id: "microservice-53",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Distributed Systems", "Failure Handling"],
		question: "Cascading Failure কী?",
		answer: `একটি service-এর failure বা slowness অন্য service-কে overload করে এবং ধীরে ধীরে পুরো system failure-এর দিকে যায়।

Example:

Payment Service
 ↓ slow
Order Service
 ↓ waiting
API Gateway
 ↓ waiting
Client

Retry যোগ হলে:

A
 ↓
B
 ↓
B retry
 ↓
B retry
 ↓
More load
 ↓
B completely overloaded

Prevent করার জন্য:

- Timeout
- Circuit breaker
- Retry limit
- Backoff
- Bulkhead
- Rate limiting
- Load shedding

ব্যবহার করা যায়।`,
	},

	{
		id: "microservice-54",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Load Shedding", "Resilience"],
		question: "Load Shedding কী?",
		answer: `System overload হলে সব request process করার চেষ্টা না করে কিছু request intentionally reject/drop করে system-কে healthy রাখাকে load shedding বলে।

Example:

System capacity:
10,000 req/sec

Incoming:
20,000 req/sec

সব request process করার চেষ্টা করলে পুরো system crash করতে পারে।

তাই:

- Low-priority request reject
- Rate limit
- Queue limit
- Return 429/503

করা হতে পারে।

Goal:

Partial failure
→ Full system failure হওয়া prevent করা।`,
	},

	{
		id: "microservice-55",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Scalability", "Horizontal Scaling"],
		question: "Microservice horizontal scaling কী?",
		answer: `একটি service-এর multiple instance চালানোকে horizontal scaling বলে।

Example:

Order Service:

Instance 1
Instance 2
Instance 3
Instance 4

Load Balancer request distribute করবে।

Stateless application horizontal scaling-এর জন্য সবচেয়ে সহজ।

State externalize করা যায়:

- Redis
- Database
- Object Storage
- Message Broker

এর মাধ্যমে।`,
	},

	{
		id: "microservice-56",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Stateless", "Scalability"],
		question: "Microservice stateless কেন রাখা হয়?",
		answer: `Stateless service request-specific state server memory-তে permanently ধরে রাখে না।

Example:

Client
 ↓
Load Balancer
 ├── Instance A
 ├── Instance B
 └── Instance C

যেকোনো request যেকোনো instance process করতে পারে।

State প্রয়োজন হলে:

Redis
Database
Object Storage

ব্যবহার করা যায়।

Benefits:

- Easy horizontal scaling
- Easy failover
- Easy deployment
- Better load balancing`,
	},

	{
		id: "microservice-57",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Security", "Zero Trust", "Microservices"],
		question: "Microservices security কীভাবে design করবেন?",
		answer: `Microservice security শুধু API Gateway-তে authentication দিয়ে শেষ করা উচিত নয়।

Layers:

Client
 ↓
API Gateway
 ↓
Authentication
 ↓
Authorization
 ↓
Service-to-Service Authentication
 ↓
Database Authorization

Consider:

- TLS
- JWT/OAuth2
- Service identity
- mTLS যেখানে প্রয়োজন
- Least privilege
- Secret management
- Network policies
- Rate limiting
- Audit logging

একটি compromised service যেন পুরো system access করতে না পারে সেটাই গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-58",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Secrets", "Security", "Deployment"],
		question: "Microservice-এ secrets কীভাবে manage করবেন?",
		answer: `Database password, API key, JWT secret source code-এ hardcode করা উচিত নয়।

Bad:

DB_PASSWORD = "mypassword"

Better:

Environment variables
Secret manager
Kubernetes Secrets
Cloud secret management

Production-এ:

Source Code
    X
    ↓
Secret Manager
    ↓
Application

Secrets:

- Rotate করা উচিত
- Access control করা উচিত
- Logs-এ expose করা উচিত নয়
- Git repository-তে রাখা উচিত নয়।`,
	},

	{
		id: "microservice-59",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["Deployment", "CI/CD", "Zero Downtime"],
		question: "Microservice zero-downtime deployment কী?",
		answer: `Application deploy করার সময় existing users-এর service বন্ধ না করে নতুন version gradually চালু করাকে zero-downtime deployment বলা হয়।

Common strategies:

1. Rolling Deployment
2. Blue-Green Deployment
3. Canary Deployment

Rolling:

Old instances
 ↓
Gradually replace
 ↓
New instances

Canary:

Small traffic
 ↓
New version
 ↓
Monitor
 ↓
Increase traffic

Health check এবং backward-compatible API গুরুত্বপূর্ণ।`,
	},

	{
		id: "microservice-60",
		category: "Microservices",
		difficulty: "Senior",
		tags: ["System Design", "Python", "FastAPI", "Kafka", "Redis"],
		question:
			"Python দিয়ে একটি production-ready Order Microservice architecture কীভাবে design করবেন?",
		answer: `একটি scalable Order Service-এর example architecture:

Client
  ↓
API Gateway
  ↓
Order Service - FastAPI
  ↓
Service Layer
  ↓
Repository Layer
  ↓
PostgreSQL

Parallel components:

Order Service
 ├── Redis
 ├── Kafka
 ├── Payment Service
 ├── Inventory Service
 └── Notification Service

Order creation flow:

Client
 ↓
POST /orders
 ↓
API Gateway
 ↓
Order Service
 ↓
Validate Request
 ↓
Create Order
 ↓
Outbox Event
 ↓
PostgreSQL Transaction
 ↓
Outbox Publisher
 ↓
Kafka
 ↓
order.created
 ├── Inventory Service
 ├── Payment Service
 └── Notification Service

Reliability:

Timeout
Retry
Circuit Breaker
Idempotency
DLQ
Outbox Pattern

Database:

PostgreSQL
 ├── orders
 ├── order_items
 └── outbox_events

Caching:

Redis

Messaging:

Kafka

Observability:

Logs
Metrics
Distributed Tracing
Correlation ID

Deployment:

Docker
 ↓
Kubernetes
 ↓
Multiple Order Service instances

Important principle:

Order Service অন্য service-এর database directly access করবে না।

Instead:

Order Service
 ↓ API/Event
Payment Service

Order Service
 ↓ API/Event
Inventory Service

এই architecture independent deployment, horizontal scaling, failure isolation এবং eventual consistency support করতে পারে।`,
	},
];
