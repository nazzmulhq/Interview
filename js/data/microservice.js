const microservice = [
  {
    "id": "microservice-1",
    "category": "Microservices",
    "difficulty": "Beginner",
    "tags": [
      "Microservice",
      "Architecture"
    ],
    "question": "Microservice কী?",
    "answer": "\n      <p>Microservice হলো এমন একটি architectural style যেখানে একটি বড় application-কে ছোট ছোট independently deployable service-এ ভাগ করা হয়।</p>\n      <p>প্রতিটি service সাধারণত একটি নির্দিষ্ট business capability নিয়ে কাজ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>E-commerce System</code></pre>\n      </div>\n      <p>User Service<br>Product Service<br>Order Service<br>Payment Service<br>Inventory Service<br>Notification Service</p>\n      <h4>প্রতিটি service:</h4>\n      <ul>\n        <li>আলাদাভাবে deploy করা যায়</li>\n        <li>আলাদাভাবে scale করা যায়</li>\n        <li>নিজের business logic manage করে</li>\n        <li>অন্য service-এর সাথে API/message-এর মাধ্যমে communicate করে</li>\n      </ul>\n      <h4>Example flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n  ↓\nAPI Gateway\n  ↓\nOrder Service\n  ├── Payment Service\n  ├── Inventory Service\n  └── Notification Service</code></pre>\n      </div>\n      <p>Microservice-এর মূল লক্ষ্য হলো independent development, deployment, scaling এবং failure isolation।</p>\n    "
  },
  {
    "id": "microservice-2",
    "category": "Microservices",
    "difficulty": "Beginner",
    "tags": [
      "Monolith",
      "Microservice",
      "Architecture"
    ],
    "question": "Monolith এবং Microservice-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Monolith:</h4>\n      <p>একটি বড় application-এর মধ্যে সব business functionality থাকে।</p>\n      <h4>Example:</h4>\n      <p>User<br>Product<br>Order<br>Payment<br>Inventory<br>সব একই application-এর মধ্যে।</p>\n      <h4>Microservice:</h4>\n      <p>প্রতিটি major business capability আলাদা service।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User Service\nProduct Service\nOrder Service\nPayment Service</code></pre>\n      </div>\n      <h4>Monolith-এর সুবিধা:</h4>\n      <ul>\n        <li>সহজ development</li>\n        <li>সহজ deployment</li>\n        <li>সহজ debugging</li>\n        <li>কম infrastructure complexity</li>\n      </ul>\n      <h4>Microservice-এর সুবিধা:</h4>\n      <ul>\n        <li>Independent deployment</li>\n        <li>Independent scaling</li>\n        <li>Team autonomy</li>\n        <li>Fault isolation</li>\n        <li>Technology flexibility</li>\n      </ul>\n      <p>Microservice সব project-এর জন্য automatically better নয়। System complexity justify করলে ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "microservice-3",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Service Boundary",
      "DDD",
      "Architecture"
    ],
    "question": "Microservice boundary কীভাবে নির্ধারণ করবেন?",
    "answer": "\n      <p>Service boundary নির্ধারণের সময় technical layer-এর পরিবর্তে business capability এবং domain boundary consider করা উচিত।</p>\n      <h4>Example:</h4>\n      <h4>ভুল:</h4>\n      <p>User CRUD Service<br>Product CRUD Service<br>Order CRUD Service</p>\n      <h4>Better:</h4>\n      <p>Identity Service<br>Catalog Service<br>Order Management Service<br>Payment Service<br>Inventory Service</p>\n      <p>DDD-এর bounded context concept এখানে useful।</p>\n      <h4>Consider করুন:</h4>\n      <ul>\n        <li>Business responsibility</li>\n        <li>Data ownership</li>\n        <li>Change frequency</li>\n        <li>Team ownership</li>\n        <li>Scaling requirement</li>\n        <li>Transaction boundary</li>\n      </ul>\n      <p>একটি service-এর business responsibility clear হওয়া উচিত।</p>\n    "
  },
  {
    "id": "microservice-4",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Database",
      "Database Per Service"
    ],
    "question": "Database per service pattern কী?",
    "answer": "\n      <p>Database per service হলো microservice architecture-এর একটি গুরুত্বপূর্ণ principle।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User Service\n → User DB</code></pre>\n      </div>\n      <p>Order Service<br> → Order DB</p>\n      <p>Payment Service<br> → Payment DB</p>\n      <p>Inventory Service<br> → Inventory DB</p>\n      <p>একটি service অন্য service-এর database directly access করবে না।</p>\n      <h4>Communication হবে:</h4>\n      <p>API<br>অথবা<br>Message/Event</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Loose coupling</li>\n        <li>Independent schema</li>\n        <li>Independent scaling</li>\n        <li>Independent deployment</li>\n      </ul>\n      <p>কিন্তু distributed transaction এবং data consistency handle করার complexity বেড়ে যায়।</p>\n    "
  },
  {
    "id": "microservice-5",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Shared Database",
      "Architecture"
    ],
    "question": "Microservices-এ shared database কেন problematic?",
    "answer": "\n      <p>যদি অনেক service একই database এবং একই tables directly access করে, তাহলে serviceগুলো tightly coupled হয়ে যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n     ↓\nShared DB\n     ↑\nPayment Service</code></pre>\n      </div>\n      <h4>সমস্যা:</h4>\n      <ul>\n        <li>Schema change coordination</li>\n        <li>Deployment dependency</li>\n        <li>Data ownership unclear</li>\n        <li>Independent scaling কঠিন</li>\n        <li>Service boundary ভেঙে যায়</li>\n      </ul>\n      <h4>Ideal approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service\n ↓\nOwn Database</code></pre>\n      </div>\n      <p>তবে legacy migration বা ছোট system-এ shared database transitional architecture হিসেবে থাকতে পারে।</p>\n    "
  },
  {
    "id": "microservice-6",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "REST",
      "HTTP",
      "Communication"
    ],
    "question": "Microservices-এর মধ্যে REST communication কী?",
    "answer": "\n      <p>REST হলো HTTP-based synchronous communication mechanism।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n   ↓ HTTP\nPayment Service\n   ↓\nResponse</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>POST /payments</code></pre>\n      </div>\n      <h4>Request:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"order_id\": 1001,\n  \"amount\": 5000\n}</code></pre>\n      </div>\n      <h4>Response:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"payment_id\": 2001,\n  \"status\": \"success\"\n}</code></pre>\n      </div>\n      <p>REST সহজ এবং widely supported।</p>\n      <p>কিন্তু synchronous dependency তৈরি হওয়ায় downstream service unavailable হলে upstream request fail বা delay হতে পারে।</p>\n    "
  },
  {
    "id": "microservice-7",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "gRPC",
      "RPC",
      "Communication"
    ],
    "question": "gRPC কী এবং microservices-এ কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>gRPC হলো high-performance RPC framework।</p>\n      <p>এটি সাধারণত HTTP/2 এবং Protocol Buffers ব্যবহার করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n    ↓ gRPC\nInventory Service</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>High performance</li>\n        <li>Strong contract</li>\n        <li>Binary serialization</li>\n        <li>Streaming support</li>\n        <li>Code generation</li>\n      </ul>\n      <p>Internal service-to-service communication-এর জন্য gRPC useful হতে পারে।</p>\n      <p>Public browser-facing API-এর জন্য REST/HTTP JSON অনেক ক্ষেত্রে simpler।</p>\n    "
  },
  {
    "id": "microservice-8",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "REST",
      "gRPC",
      "Comparison"
    ],
    "question": "REST বনাম gRPC — কখন কোনটি ব্যবহার করবেন?",
    "answer": "\n      <h4>REST:</h4>\n      <ul>\n        <li>Simple</li>\n        <li>Browser friendly</li>\n        <li>JSON</li>\n        <li>Easy debugging</li>\n        <li>Public API-এর জন্য ভালো</li>\n      </ul>\n      <h4>gRPC:</h4>\n      <ul>\n        <li>High performance</li>\n        <li>Strong schema</li>\n        <li>Binary protocol</li>\n        <li>Internal service communication-এর জন্য ভালো</li>\n        <li>Streaming support</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Frontend\n ↓\nREST/HTTP\n ↓\nAPI Gateway</code></pre>\n      </div>\n      <h4>Internal:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓ gRPC\nInventory Service</code></pre>\n      </div>\n      <p>একই architecture-এ REST এবং gRPC দুটোই ব্যবহার করা সম্ভব।</p>\n    "
  },
  {
    "id": "microservice-9",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Kafka",
      "RabbitMQ",
      "Messaging"
    ],
    "question": "Kafka এবং RabbitMQ-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>RabbitMQ মূলত message broker এবং queue-based messaging-এর জন্য জনপ্রিয়।</p>\n      <p>Kafka হলো distributed event streaming platform।</p>\n      <h4>RabbitMQ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Producer\n ↓\nQueue\n ↓\nConsumer</code></pre>\n      </div>\n      <h4>Kafka:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Producer\n ↓\nTopic\n ↓\nPartition\n ↓\nConsumer Group</code></pre>\n      </div>\n      <h4>RabbitMQ useful:</h4>\n      <ul>\n        <li>Task queue</li>\n        <li>Command processing</li>\n        <li>Work distribution</li>\n        <li>Routing</li>\n      </ul>\n      <h4>Kafka useful:</h4>\n      <ul>\n        <li>Event streaming</li>\n        <li>High throughput</li>\n        <li>Event replay</li>\n        <li>Data pipeline</li>\n        <li>Multiple consumers</li>\n      </ul>\n      <p>কোনটি better তা use case-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "microservice-10",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Kafka",
      "Topic",
      "Partition"
    ],
    "question": "Kafka Topic এবং Partition কী?",
    "answer": "\n      <p>Kafka Topic হলো event-এর logical category।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>order.created\npayment.completed\ninventory.updated</code></pre>\n      </div>\n      <p>একটি topic multiple partition-এ ভাগ হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>orders\n ├── Partition 0\n ├── Partition 1\n └── Partition 2</code></pre>\n      </div>\n      <p>Partition-এর কারণে Kafka parallel processing এবং scalability করতে পারে।</p>\n      <p>একই partition-এর মধ্যে message ordering বজায় থাকে।</p>\n      <p>Partition key সঠিকভাবে design করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-11",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Kafka",
      "Consumer Group"
    ],
    "question": "Kafka Consumer Group কী?",
    "answer": "\n      <p>Consumer Group হলো এক বা একাধিক consumer-এর logical group।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Topic:\norders</code></pre>\n      </div>\n      <p><strong>Consumer Group:</strong><br>order-processing</p>\n      <h4>Consumers:</h4>\n      <p>Consumer 1<br>Consumer 2<br>Consumer 3</p>\n      <p>একটি partition একই consumer group-এর মধ্যে সাধারণত এক consumer দ্বারা process হয়।</p>\n      <p>এর ফলে workload distribute করা যায়।</p>\n      <p>একই Kafka event multiple business system-কে দিতে চাইলে আলাদা consumer group ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>orders topic\n ├── Payment Group\n ├── Analytics Group\n └── Notification Group</code></pre>\n      </div>\n    "
  },
  {
    "id": "microservice-12",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "RabbitMQ",
      "Exchange",
      "Queue"
    ],
    "question": "RabbitMQ Exchange কী?",
    "answer": "\n      <p>RabbitMQ-তে Producer সাধারণত সরাসরি queue-তে message পাঠায় না।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Producer\n ↓\nExchange\n ↓\nBinding\n ↓\nQueue\n ↓\nConsumer</code></pre>\n      </div>\n      <h4>Common exchange types:</h4>\n      <ol>\n        <li>Direct</li>\n        <li>Topic</li>\n        <li>Fanout</li>\n        <li>Headers</li>\n      </ol>\n      <p><strong>Direct:</strong></p>\n      <ul>\n        <li>Exact routing key</li>\n      </ul>\n      <p><strong>Topic:</strong></p>\n      <ul>\n        <li>Pattern-based routing</li>\n      </ul>\n      <p><strong>Fanout:</strong></p>\n      <ul>\n        <li>সব bound queue-তে broadcast</li>\n      </ul>\n      <p>Exchange routing flexibility দেয়।</p>\n    "
  },
  {
    "id": "microservice-13",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Async",
      "Synchronous",
      "Communication"
    ],
    "question": "Synchronous এবং Asynchronous communication-এর পার্থক্য কী?",
    "answer": "\n      <h4>Synchronous:</h4>\n      <p>Service A request পাঠিয়ে Service B-এর response-এর জন্য অপেক্ষা করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>A\n ↓\nB\n ↓\nResponse\n ↓\nA</code></pre>\n      </div>\n      <h4>Asynchronous:</h4>\n      <p>A message/event পাঠিয়ে immediately continue করতে পারে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>A\n ↓\nMessage Broker\n ↓\nB</code></pre>\n      </div>\n      <p><strong>Synchronous:</strong></p>\n      <ul>\n        <li>Immediate response দরকার হলে ভালো</li>\n      </ul>\n      <p><strong>Asynchronous:</strong></p>\n      <ul>\n        <li>Decoupling</li>\n        <li>Background processing</li>\n        <li>High throughput</li>\n        <li>Event-driven architecture</li>\n      </ul>\n      <p>দুটো architecture-এ একসাথে ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "microservice-14",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Event Driven",
      "Architecture"
    ],
    "question": "Event-driven architecture কী?",
    "answer": "\n      <p>Event-driven architecture-এ একটি service কোনো event ঘটলে event publish করে এবং অন্য serviceগুলো event consume করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Created\n ↓\norder.created event\n ↓\n ├── Inventory Service\n ├── Payment Service\n ├── Notification Service\n └── Analytics Service</code></pre>\n      </div>\n      <p>Producer consumer-এর implementation সম্পর্কে কম জানে।</p>\n      <p>এতে loose coupling তৈরি হয়।</p>\n    "
  },
  {
    "id": "microservice-15",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Event",
      "Command",
      "Architecture"
    ],
    "question": "Event এবং Command-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Command:</h4>\n      <p>কোনো action করার instruction।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>CreateOrder\nChargePayment\nReserveInventory</code></pre>\n      </div>\n      <h4>Event:</h4>\n      <p>কোনো ঘটনা ইতিমধ্যে ঘটেছে তার notification।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>OrderCreated\nPaymentCompleted\nInventoryReserved</code></pre>\n      </div>\n      <h4>Command:</h4>\n      <p>\"এটা করো\"</p>\n      <h4>Event:</h4>\n      <p>\"এটা হয়ে গেছে\"</p>\n      <p>Distributed architecture-এ এই distinction পরিষ্কার রাখা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-16",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Saga",
      "Distributed Transaction"
    ],
    "question": "Saga Pattern কী?",
    "answer": "\n      <p>Saga হলো distributed transaction manage করার pattern।</p>\n      <p>Microservices-এ একটি business transaction অনেক service-এর মধ্যে ভাগ হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Create Order\n ↓\nReserve Inventory\n ↓\nProcess Payment\n ↓\nConfirm Order</code></pre>\n      </div>\n      <h4>যদি Payment fail করে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Cancel Payment\n ↓\nRelease Inventory\n ↓\nCancel Order</code></pre>\n      </div>\n      <p>এই compensating actions-এর মাধ্যমে distributed transaction handle করা হয়।</p>\n      <h4>Saga দুইভাবে implement করা যায়:</h4>\n      <ol>\n        <li>Choreography</li>\n        <li>Orchestration</li>\n      </ol>\n    "
  },
  {
    "id": "microservice-17",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Saga",
      "Choreography",
      "Orchestration"
    ],
    "question": "Saga Choreography এবং Orchestration-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Choreography:</h4>\n      <p>প্রতিটি service event publish করে এবং অন্য service সেই event consume করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order\n ↓\nOrderCreated\n ↓\nInventory\n ↓\nInventoryReserved\n ↓\nPayment</code></pre>\n      </div>\n      <p>Central coordinator থাকে না।</p>\n      <h4>Orchestration:</h4>\n      <p>একটি Saga Orchestrator পুরো workflow control করে।</p>\n      <p>Orchestrator<br> ├── Order<br> ├── Inventory<br> ├── Payment<br> └── Notification</p>\n      <p><strong>Choreography:</strong></p>\n      <ul>\n        <li>More decentralized</li>\n        <li>Simple flow-এ ভালো</li>\n      </ul>\n      <p><strong>Orchestration:</strong></p>\n      <ul>\n        <li>Complex workflow-এর জন্য বেশি observable এবং controllable হতে পারে।</li>\n      </ul>\n    "
  },
  {
    "id": "microservice-18",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Eventual Consistency",
      "Distributed Systems"
    ],
    "question": "Eventual Consistency কী?",
    "answer": "\n      <p>Distributed system-এ সব service একই মুহূর্তে একই data না দেখলেও কিছু সময় পরে consistent state-এ পৌঁছালে তাকে eventual consistency বলা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Order Service:\nOrder = CONFIRMED</code></pre>\n      </div>\n      <h4>কিছু milliseconds/seconds পরে:</h4>\n      <p><strong>Inventory Service:</strong><br>Stock updated</p>\n      <h4>তারপর:</h4>\n      <p><strong>Analytics Service:</strong><br>Order count updated</p>\n      <p>এখানে temporary inconsistency থাকতে পারে।</p>\n      <p>Distributed systems-এ strong consistency-এর পরিবর্তে eventual consistency অনেক ক্ষেত্রে scalability এবং availability improve করে।</p>\n    "
  },
  {
    "id": "microservice-19",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Distributed Transaction",
      "2PC",
      "Saga"
    ],
    "question": "Microservices-এ distributed transaction কেন কঠিন?",
    "answer": "\n      <p>একটি transaction যদি multiple independent database-এর উপর কাজ করে, তাহলে traditional single-database ACID transaction-এর মতো সহজভাবে rollback করা যায় না।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Order DB\nPayment DB\nInventory DB</code></pre>\n      </div>\n      <h4>একসাথে:</h4>\n      <p>Order Created<br>Payment Success<br>Inventory Reserved</p>\n      <p>এর মধ্যে Inventory fail করলে আগের operation rollback করা কঠিন।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Saga</li>\n        <li>Outbox Pattern</li>\n        <li>Idempotency</li>\n        <li>Eventual Consistency</li>\n      </ul>\n      <p>2PC কিছু environment-এ সম্ভব হলেও operational complexity এবং availability trade-off থাকতে পারে।</p>\n    "
  },
  {
    "id": "microservice-20",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "CQRS",
      "Architecture"
    ],
    "question": "CQRS কী?",
    "answer": "\n      <p>CQRS = Command Query Responsibility Segregation।</p>\n      <p>এখানে write এবং read responsibility আলাদা করা হয়।</p>\n      <h4>Traditional:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Same Model\n ↓\nRead + Write</code></pre>\n      </div>\n      <h4>CQRS:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Command\n ↓\nWrite Model\n ↓\nDatabase</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Query\n ↓\nRead Model\n ↓\nDatabase/Read Store</code></pre>\n      </div>\n      <h4>CQRS useful যখন:</h4>\n      <ul>\n        <li>Read/write workload খুব আলাদা</li>\n        <li>Complex domain</li>\n        <li>High read scalability</li>\n        <li>Different read models দরকার</li>\n      </ul>\n      <p>সব CRUD application-এ CQRS প্রয়োজন নেই।</p>\n    "
  },
  {
    "id": "microservice-21",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Event Sourcing",
      "CQRS"
    ],
    "question": "Event Sourcing কী?",
    "answer": "\n      <p>Event Sourcing-এ current state শুধু final row হিসেবে না রেখে state পরিবর্তনের events store করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>AccountCreated\nMoneyDeposited\nMoneyWithdrawn\nMoneyDeposited</code></pre>\n      </div>\n      <p>Current balance events replay করে reconstruct করা যায়।</p>\n      <h4>Traditional:</h4>\n      <p>Account<br>→ balance = 5000</p>\n      <h4>Event Sourcing:</h4>\n      <p>Event 1<br>Event 2<br>Event 3<br>Event 4</p>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Events\n ↓\nReplay\n ↓\nCurrent State</code></pre>\n      </div>\n      <p>Audit এবং historical reconstruction-এর জন্য useful।</p>\n      <p>তবে complexity বেশি।</p>\n    "
  },
  {
    "id": "microservice-22",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Outbox Pattern",
      "Database",
      "Events"
    ],
    "question": "Outbox Pattern কী?",
    "answer": "\n      <p>Outbox Pattern database update এবং event publishing-এর consistency problem solve করতে ব্যবহৃত হয়।</p>\n      <h4>Problem:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Database update সফল\n ↓\nKafka publish failed</code></pre>\n      </div>\n      <p>তখন database state update হয়েছে কিন্তু event publish হয়নি।</p>\n      <h4>Outbox approach:</h4>\n      <h4>Transaction-এর মধ্যে:</h4>\n      <p>Business Data<br>+<br>Outbox Event</p>\n      <p>একসাথে database-এ save করা হয়।</p>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Outbox Table\n ↓\nPublisher\n ↓\nKafka\n ↓\nConsumer</code></pre>\n      </div>\n      <p>এতে event হারানোর risk কমে।</p>\n      <p>Consumer side-এ idempotency রাখা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-23",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Idempotency",
      "Distributed Systems"
    ],
    "question": "Idempotency কী?",
    "answer": "\n      <p>একই operation একাধিকবার execute হলেও final result একই থাকলে operation-টি idempotent।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>POST /payment</code></pre>\n      </div>\n      <p><strong>Request ID:</strong><br>abc123</p>\n      <h4>প্রথম request:</h4>\n      <p>Payment Created</p>\n      <h4>একই request retry হলে:</h4>\n      <p>Existing payment return</p>\n      <p>নতুন payment create নয়।</p>\n      <h4>Idempotency গুরুত্বপূর্ণ:</h4>\n      <ul>\n        <li>Payment</li>\n        <li>Order</li>\n        <li>Message consumer</li>\n        <li>Retry</li>\n        <li>Webhook</li>\n      </ul>\n      <p>এর ক্ষেত্রে।</p>\n      <h4>Common implementation:</h4>\n      <p>idempotency_key<br>+<br>unique database constraint<br>+<br>stored result</p>\n    "
  },
  {
    "id": "microservice-24",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Retry",
      "Resilience"
    ],
    "question": "Microservice retry কী?",
    "answer": "\n      <p>Temporary failure হলে failed request আবার execute করাকে retry বলে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service A\n ↓\nService B\n ↓\nTimeout\n ↓\nRetry\n ↓\nService B</code></pre>\n      </div>\n      <h4>Retry useful:</h4>\n      <ul>\n        <li>Temporary network failure</li>\n        <li>Timeout</li>\n        <li>Temporary 5xx</li>\n        <li>Broker connection failure</li>\n      </ul>\n      <h4>Retry strategy:</h4>\n      <ol>\n        <li>Immediate retry</li>\n        <li>Fixed delay</li>\n        <li>Exponential backoff</li>\n        <li>Exponential backoff + jitter</li>\n      </ol>\n      <p>সব error retry করা উচিত নয়।</p>\n      <p>Permanent 4xx error সাধারণত retry করা উচিত নয়।</p>\n    "
  },
  {
    "id": "microservice-25",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Circuit Breaker",
      "Resilience"
    ],
    "question": "Circuit Breaker Pattern কী?",
    "answer": "\n      <p>Circuit breaker cascading failure prevent করতে সাহায্য করে।</p>\n      <h4>তিনটি common state:</h4>\n      <p>CLOSED<br>→ Request normally যায়</p>\n      <p>OPEN<br>→ Downstream failure বেশি হলে request block করে</p>\n      <p>HALF_OPEN<br>→ কিছু test request পাঠিয়ে service recover করেছে কিনা check করে</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service A\n ↓\nService B\n ↓\nRepeated Failure\n ↓\nCircuit OPEN\n ↓\nFast Failure</code></pre>\n      </div>\n      <p>এতে unavailable service-এর উপর অতিরিক্ত load দেওয়া বন্ধ হয়।</p>\n    "
  },
  {
    "id": "microservice-26",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Timeout",
      "Resilience"
    ],
    "question": "Microservice timeout কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>একটি service অন্য service-এর response-এর জন্য unlimited wait করলে thread/connection/resource আটকে যেতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>A\n ↓\nB\n ↓\nC\n ↓\nD</code></pre>\n      </div>\n      <p>D slow হলে পুরো chain slow হতে পারে।</p>\n      <p>তাই প্রত্যেক network call-এ appropriate timeout রাখা উচিত।</p>\n      <h4>Timeout types:</h4>\n      <ul>\n        <li>Connection timeout</li>\n        <li>Read timeout</li>\n        <li>Overall request timeout</li>\n      </ul>\n      <p>Timeout + Retry + Circuit Breaker একসাথে resilience improve করে।</p>\n    "
  },
  {
    "id": "microservice-27",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Rate Limiting",
      "API Gateway",
      "Security"
    ],
    "question": "Rate Limiting কী?",
    "answer": "\n      <p>Rate limiting নির্দিষ্ট সময়ের মধ্যে client কত request করতে পারবে তা সীমাবদ্ধ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>100 requests/minute</code></pre>\n      </div>\n      <h4>100-এর বেশি হলে:</h4>\n      <p>HTTP 429 Too Many Requests</p>\n      <h4>Common algorithms:</h4>\n      <ul>\n        <li>Fixed Window</li>\n        <li>Sliding Window</li>\n        <li>Token Bucket</li>\n        <li>Leaky Bucket</li>\n      </ul>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>API abuse prevention</li>\n        <li>DDoS mitigation</li>\n        <li>Resource protection</li>\n        <li>Fair usage</li>\n      </ul>\n      <p>Distributed environment-এ Redis-based rate limiting ব্যবহার করা যেতে পারে।</p>\n    "
  },
  {
    "id": "microservice-28",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "API Gateway",
      "Architecture"
    ],
    "question": "API Gateway কী?",
    "answer": "\n      <p>API Gateway হলো client এবং backend services-এর মধ্যে entry point।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ├── User Service\n ├── Order Service\n ├── Payment Service\n └── Product Service</code></pre>\n      </div>\n      <h4>Gateway-এর কাজ হতে পারে:</h4>\n      <ul>\n        <li>Routing</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Rate limiting</li>\n        <li>TLS termination</li>\n        <li>Request logging</li>\n        <li>Load balancing</li>\n        <li>Response aggregation</li>\n      </ul>\n      <p>তবে gateway-তে অতিরিক্ত business logic রাখা উচিত নয়।</p>\n    "
  },
  {
    "id": "microservice-29",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Service Discovery",
      "Networking"
    ],
    "question": "Service Discovery কী?",
    "answer": "\n      <p>Microservice environment-এ service-এর IP/port dynamic হতে পারে।</p>\n      <p>Service Discovery service-এর location খুঁজে পেতে সাহায্য করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nService Discovery\n ↓\nPayment Service instances</code></pre>\n      </div>\n      <h4>Payment Service:</h4>\n      <p>payment-1<br>payment-2<br>payment-3</p>\n      <p>Service discovery health এবং available instances সম্পর্কে information দিতে পারে।</p>\n      <p>Kubernetes environment-এ built-in service discovery mechanisms পাওয়া যায়।</p>\n    "
  },
  {
    "id": "microservice-30",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "Load Balancing",
      "Scalability"
    ],
    "question": "Microservices-এ Load Balancing কী?",
    "answer": "\n      <p>একই service-এর multiple instance-এর মধ্যে request distribute করাকে load balancing বলে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Load Balancer\n              /    |    \\\n             /     |     \\\n        Order-1 Order-2 Order-3</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Horizontal scaling</li>\n        <li>High availability</li>\n        <li>Traffic distribution</li>\n        <li>Instance failure handling</li>\n      </ul>\n      <p>Load balancing client-side বা server-side হতে পারে।</p>\n    "
  },
  {
    "id": "microservice-31",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Distributed Tracing",
      "Observability"
    ],
    "question": "Distributed Tracing কী?",
    "answer": "\n      <p>একটি request multiple microservice-এর মধ্যে travel করলে পুরো request path track করাকে distributed tracing বলে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nOrder Service\n ↓\nPayment Service\n ↓\nInventory Service\n ↓\nDatabase</code></pre>\n      </div>\n      <p>একটি Trace ID এবং বিভিন্ন Span দিয়ে request journey track করা হয়।</p>\n      <h4>এতে identify করা যায়:</h4>\n      <ul>\n        <li>কোন service slow</li>\n        <li>কোথায় error</li>\n        <li>কোন dependency bottleneck</li>\n        <li>latency কোথায় হচ্ছে</li>\n      </ul>\n    "
  },
  {
    "id": "microservice-32",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Correlation ID",
      "Logging",
      "Observability"
    ],
    "question": "Correlation ID কী?",
    "answer": "\n      <p>একটি distributed request-এর সাথে unique identifier attach করে সব service-এর log-এ একই ID ব্যবহার করলে request trace করা সহজ হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Request ID:\nabc-123</code></pre>\n      </div>\n      <p><strong>Gateway:</strong><br>abc-123</p>\n      <p><strong>Order Service:</strong><br>abc-123</p>\n      <p><strong>Payment Service:</strong><br>abc-123</p>\n      <p><strong>Inventory Service:</strong><br>abc-123</p>\n      <p>এতে distributed logs correlate করা যায়।</p>\n    "
  },
  {
    "id": "microservice-33",
    "category": "Microservices",
    "difficulty": "Intermediate",
    "tags": [
      "DLQ",
      "RabbitMQ",
      "Kafka"
    ],
    "question": "Dead Letter Queue বা DLQ কী?",
    "answer": "\n      <p>যে message বারবার processing fail করে এবং normal queue থেকে আর process করা উচিত নয়, তাকে Dead Letter Queue-তে পাঠানো যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Queue\n ↓\nConsumer\n ↓\nFailure\n ↓\nRetry\n ↓\nRetry Limit Exceeded\n ↓\nDLQ</code></pre>\n      </div>\n      <h4>DLQ থেকে পরে:</h4>\n      <ul>\n        <li>Inspect</li>\n        <li>Fix</li>\n        <li>Replay</li>\n        <li>Manual processing</li>\n      </ul>\n      <p>করা যায়।</p>\n      <p>Production messaging system-এ DLQ operational visibility-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-34",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Message Ordering",
      "Kafka"
    ],
    "question": "Distributed messaging system-এ message ordering কীভাবে maintain করবেন?",
    "answer": "\n      <p>Ordering requirement আগে define করতে হবে।</p>\n      <p>Kafka-তে একই partition-এর message order preserve করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>order_id = 1001</code></pre>\n      </div>\n      <h4>সব events একই partition key দিয়ে publish করলে:</h4>\n      <p>OrderCreated<br>PaymentCompleted<br>OrderShipped</p>\n      <p>একই partition-এ থাকতে পারে।</p>\n      <p>তবে পুরো topic-এর global ordering সাধারণত scalable নয়।</p>\n      <h4>Ordering-এর জন্য:</h4>\n      <ul>\n        <li>Partition key</li>\n        <li>Sequence number</li>\n        <li>Version</li>\n        <li>Consumer logic</li>\n      </ul>\n      <p>ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "microservice-35",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Duplicate Message",
      "Idempotency",
      "Messaging"
    ],
    "question": "Message duplicate হলে কীভাবে handle করবেন?",
    "answer": "\n      <p>Distributed messaging system-এ at-least-once delivery-এর কারণে duplicate message আসতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>PaymentCompleted\n↓\nConsumer\n↓\nProcessing\n↓\nNetwork failure before acknowledgement\n↓\nMessage delivered again</code></pre>\n      </div>\n      <h4>Solution:</h4>\n      <p>Consumer idempotent করতে হবে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>event_id = abc123</code></pre>\n      </div>\n      <h4>Database:</h4>\n      <p>processed_events</p>\n      <h4>যদি abc123 already processed হয়:</h4>\n      <ul>\n        <li>Ignore</li>\n      </ul>\n      <h4>না হলে:</h4>\n      <ul>\n        <li>Process</li>\n        <li>Store event_id</li>\n      </ul>\n      <p>এর ফলে duplicate processing prevent করা যায়।</p>\n    "
  },
  {
    "id": "microservice-36",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Delivery Semantics",
      "Kafka",
      "RabbitMQ"
    ],
    "question": "At-most-once, At-least-once এবং Exactly-once কী?",
    "answer": "\n      <h4>At-most-once:</h4>\n      <p>Message zero বা one time process হতে পারে।</p>\n      <ul>\n        <li>Duplicate কম</li>\n        <li>Message loss হতে পারে</li>\n      </ul>\n      <h4>At-least-once:</h4>\n      <p>Message one বা multiple times deliver হতে পারে।</p>\n      <ul>\n        <li>Message loss কম</li>\n        <li>Duplicate possible</li>\n      </ul>\n      <h4>Exactly-once:</h4>\n      <p>Effect logically একবারের মতো guarantee করার চেষ্টা।</p>\n      <p>Distributed systems-এ true exactly-once end-to-end guarantee complex।</p>\n      <h4>Practical design:</h4>\n      <p>At-least-once delivery<br>+<br>Idempotent consumer</p>\n      <p>অনেক production system-এর জন্য একটি practical strategy।</p>\n    "
  },
  {
    "id": "microservice-37",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Bulkhead",
      "Resilience"
    ],
    "question": "Bulkhead Pattern কী?",
    "answer": "\n      <p>Bulkhead pattern একটি failure যাতে পুরো application-এর resources consume করতে না পারে তা prevent করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Service\n ├── Payment connection pool\n ├── Order connection pool\n └── Reporting connection pool</code></pre>\n      </div>\n      <p>যদি Reporting খুব slow হয়, তার resource exhaustion যেন Payment system-কে affect না করে।</p>\n      <h4>Concept:</h4>\n      <p>Separate resources<br>→ Failure isolation</p>\n      <p>এটি concurrency limit এবং separate pools দিয়েও implement করা যায়।</p>\n    "
  },
  {
    "id": "microservice-38",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Backpressure",
      "Streaming",
      "Performance"
    ],
    "question": "Backpressure কী?",
    "answer": "\n      <p>Producer যদি consumer-এর processing capacity-এর চেয়ে দ্রুত data produce করে, তাহলে system overload হতে পারে।</p>\n      <p>Backpressure হলো producer/processing pipeline-কে consumer capacity অনুযায়ী control করা।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Producer\n→ 10,000 msg/sec</code></pre>\n      </div>\n      <p>Consumer<br>→ 2,000 msg/sec</p>\n      <h4>Queue continuously grow করলে:</h4>\n      <p>Memory<br>CPU<br>Storage</p>\n      <p>pressure তৈরি হতে পারে।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Consumer scaling</li>\n        <li>Rate control</li>\n        <li>Bounded queue</li>\n        <li>Batch processing</li>\n        <li>Flow control</li>\n        <li>Backpressure mechanisms</li>\n      </ul>\n    "
  },
  {
    "id": "microservice-39",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Health Check",
      "Kubernetes",
      "Deployment"
    ],
    "question": "Liveness এবং Readiness Probe কী?",
    "answer": "\n      <h4>Liveness:</h4>\n      <p>Application process alive কিনা determine করে।</p>\n      <p>Failure হলে application restart হতে পারে।</p>\n      <h4>Readiness:</h4>\n      <p>Application traffic receive করার জন্য ready কিনা determine করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application starting\n ↓\nDatabase connection initializing\n ↓\nNot Ready</code></pre>\n      </div>\n      <h4>Ready হওয়ার পরে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Load Balancer\n ↓\nApplication</code></pre>\n      </div>\n      <p>Microservice deployment-এ health endpoint এবং readiness/liveness checks গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-40",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Graceful Shutdown",
      "Deployment"
    ],
    "question": "Microservice graceful shutdown কী?",
    "answer": "\n      <p>Application shutdown হওয়ার সময় active request এবং message processing safely complete করার process হলো graceful shutdown।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Shutdown signal\n ↓\nStop accepting new requests\n ↓\nFinish active requests\n ↓\nFinish/acknowledge message processing\n ↓\nClose DB connection\n ↓\nClose broker connection\n ↓\nExit</code></pre>\n      </div>\n      <h4>এতে:</h4>\n      <ul>\n        <li>Request loss</li>\n        <li>Duplicate processing</li>\n        <li>Partial operation</li>\n      </ul>\n      <p>কমে।</p>\n      <p>Container/Kubernetes deployment-এ graceful shutdown বিশেষভাবে গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-41",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Python",
      "FastAPI",
      "Microservices"
    ],
    "question": "Python দিয়ে microservice তৈরি করতে কোন framework ব্যবহার করবেন?",
    "answer": "\n      <p>Python microservice-এর জন্য use case অনুযায়ী framework নির্বাচন করা যায়।</p>\n      <h4>FastAPI:</h4>\n      <ul>\n        <li>High-performance API</li>\n        <li>Async support</li>\n        <li>Type hints</li>\n        <li>Automatic OpenAPI</li>\n        <li>Pydantic validation</li>\n      </ul>\n      <h4>Django:</h4>\n      <ul>\n        <li>Full-featured</li>\n        <li>ORM</li>\n        <li>Authentication</li>\n        <li>Admin</li>\n        <li>Large business applications</li>\n      </ul>\n      <h4>Flask:</h4>\n      <ul>\n        <li>Lightweight</li>\n        <li>Flexible</li>\n        <li>Simple services</li>\n      </ul>\n      <h4>Typical modern API microservice:</h4>\n      <p>FastAPI<br>+<br>Pydantic<br>+<br>SQLAlchemy<br>+<br>PostgreSQL<br>+<br>Redis<br>+<br>Kafka/RabbitMQ</p>\n      <p>তবে framework-এর চেয়ে service boundary এবং architecture বেশি গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-42",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "FastAPI",
      "Async",
      "Concurrency"
    ],
    "question": "FastAPI microservice-এ async/await কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>Microservice অনেক সময় I/O-bound operation করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API Request\n ↓\nDatabase\n ↓\nExternal API\n ↓\nMessage Broker</code></pre>\n      </div>\n      <p>এই সময় CPU কাজ না করে I/O-এর জন্য অপেক্ষা করে।</p>\n      <p>async/await ব্যবহার করলে event loop অন্য request process করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def get_payment():\n    result = await payment_client.call()\n    return result</code></pre>\n      </div>\n      <p>তবে synchronous blocking library async endpoint-এর মধ্যে ব্যবহার করলে event loop block হতে পারে।</p>\n    "
  },
  {
    "id": "microservice-43",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Connection Pool",
      "Database",
      "Performance"
    ],
    "question": "Microservice-এ database connection pool কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>প্রতিটি request-এর জন্য নতুন database connection তৈরি করলে overhead এবং database overload হতে পারে।</p>\n      <h4>Connection pool:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application\n ↓\nConnection Pool\n ├── Connection 1\n ├── Connection 2\n ├── Connection 3\n └── Connection 4\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Connection reuse</li>\n        <li>Lower latency</li>\n        <li>Controlled DB connections</li>\n      </ul>\n      <p>Pool size খুব বড় করলেও সমস্যা হতে পারে।</p>\n      <h4>Multiple service instance থাকলে:</h4>\n      <p>Total DB Connections<br>=<br>Instance Count × Pool Size</p>\n      <p>তাই database capacity অনুযায়ী pool size design করতে হবে।</p>\n    "
  },
  {
    "id": "microservice-44",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "API Versioning",
      "Backward Compatibility"
    ],
    "question": "Microservice API versioning কীভাবে করবেন?",
    "answer": "\n      <p>API contract পরিবর্তন করলে existing consumers break করা যাবে না।</p>\n      <h4>Common approach:</h4>\n      <p>/api/v1/orders<br>/api/v2/orders</p>\n      <p>অথবা header-based versioning।</p>\n      <h4>Best practice:</h4>\n      <ul>\n        <li>Backward compatibility</li>\n        <li>Deprecation period</li>\n        <li>Consumer migration</li>\n        <li>Contract testing</li>\n        <li>Documentation</li>\n      </ul>\n      <p>Distributed system-এ service independently deploy হওয়ায় backward compatibility অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-45",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Contract Testing",
      "Microservices",
      "Testing"
    ],
    "question": "Contract Testing কী?",
    "answer": "\n      <p>Microservice A এবং B-এর API contract compatible কিনা test করাকে contract testing বলে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nPayment Service</code></pre>\n      </div>\n      <h4>Order Service expects:</h4>\n      <p>POST /payments</p>\n      <h4>Response:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"payment_id\": \"...\",\n  \"status\": \"success\"\n}</code></pre>\n      </div>\n      <p>Payment Service যদি response structure পরিবর্তন করে consumer break হতে পারে।</p>\n      <p>Contract test এই compatibility automatedভাবে verify করে।</p>\n    "
  },
  {
    "id": "microservice-46",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Distributed Lock",
      "Redis",
      "Concurrency"
    ],
    "question": "Distributed Lock কী?",
    "answer": "\n      <p>একাধিক application instance-এর মধ্যে একই resource-এর উপর concurrent operation control করতে distributed lock ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Instance A\nInstance B\nInstance C</code></pre>\n      </div>\n      <p>সবাই একই order process করতে চাইছে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Distributed Lock\n ↓\nOnly one instance processes</code></pre>\n      </div>\n      <p>Redis-based lock বা database-based locking ব্যবহার করা যায়।</p>\n      <p>তবে distributed lock-এর correctness, timeout, ownership এবং failure handling carefully design করতে হয়।</p>\n      <p>সম্ভব হলে idempotency এবং database constraints দিয়ে problem solve করা আরও robust হতে পারে।</p>\n    "
  },
  {
    "id": "microservice-47",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Clock",
      "Distributed Systems"
    ],
    "question": "Distributed system-এ clock problem কী?",
    "answer": "\n      <p>Different machines-এর system clock perfectly synchronized নাও হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Server A:\n10:00:00.100</code></pre>\n      </div>\n      <p><strong>Server B:</strong><br>10:00:00.050</p>\n      <p>তাই শুধু local timestamp ব্যবহার করে distributed event ordering নির্ধারণ করা risky হতে পারে।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>NTP</li>\n        <li>Logical clocks</li>\n        <li>Sequence numbers</li>\n        <li>Event IDs</li>\n        <li>Database ordering</li>\n        <li>Kafka partition ordering</li>\n      </ul>\n      <p>Distributed systems-এ time এবং ordering আলাদা concept হিসেবে ভাবা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-48",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "CAP",
      "Distributed Systems"
    ],
    "question": "CAP Theorem কী?",
    "answer": "\n      <p>CAP theorem অনুযায়ী distributed data system-এর network partition থাকলে একই সময়ে strong Consistency এবং Availability দুটোই সম্পূর্ণভাবে guarantee করা যায় না।</p>\n      <h4>CAP:</h4>\n      <p>C = Consistency<br>A = Availability<br>P = Partition Tolerance</p>\n      <p>বাস্তব distributed system-এ network partition handle করতে হয়।</p>\n      <p>তাই partition-এর সময় system consistency বা availability-এর trade-off নিতে পারে।</p>\n      <p>CAP-কে database selection এবং distributed architecture বুঝতে ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "microservice-49",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "PACELC",
      "Distributed Systems"
    ],
    "question": "PACELC কী?",
    "answer": "\n      <p>PACELC CAP theorem-এর একটি extension।</p>\n      <h4>Partition হলে:</h4>\n      <p>P<br>→ Availability (A)<br>অথবা<br>→ Consistency (C)</p>\n      <h4>Else:</h4>\n      <p>E<br>→ Latency (L)<br>অথবা<br>→ Consistency (C)</p>\n      <p>অর্থাৎ partition না থাকলেও distributed system-এ latency এবং consistency-এর trade-off থাকতে পারে।</p>\n      <p>এটি distributed database architecture বুঝতে useful conceptual model।</p>\n    "
  },
  {
    "id": "microservice-50",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Observability",
      "Metrics",
      "Logging",
      "Tracing"
    ],
    "question": "Microservice observability কী?",
    "answer": "\n      <p>Observability হলো system-এর internal state external signals থেকে বুঝতে পারার capability।</p>\n      <h4>Three major pillars:</h4>\n      <ol>\n        <li>Logs</li>\n        <li>Metrics</li>\n        <li>Traces</li>\n      </ol>\n      <p><strong>Logs:</strong></p>\n      <ul>\n        <li>কী ঘটেছে?</li>\n      </ul>\n      <p><strong>Metrics:</strong></p>\n      <ul>\n        <li>কতবার/কত দ্রুত/কত বেশি ঘটছে?</li>\n      </ul>\n      <p><strong>Traces:</strong></p>\n      <ul>\n        <li>request কোথায় কোথায় গেছে?</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Request latency\nError rate\nCPU\nMemory\nDB latency\nKafka lag\nQueue depth\nHTTP 5xx</code></pre>\n      </div>\n      <p>Production microservice-এর reliability বুঝতে observability অপরিহার্য।</p>\n    "
  },
  {
    "id": "microservice-51",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Kafka",
      "Consumer Lag",
      "Monitoring"
    ],
    "question": "Kafka Consumer Lag কী?",
    "answer": "\n      <p>Consumer lag হলো producer-এর latest message position এবং consumer-এর processed position-এর মধ্যে difference।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Latest Offset:\n1000</code></pre>\n      </div>\n      <p><strong>Consumer Offset:</strong><br>850</p>\n      <p><strong>Lag:</strong><br>150</p>\n      <p>Lag continuously বাড়লে consumer processing capacity insufficient হতে পারে।</p>\n      <h4>Possible solutions:</h4>\n      <ul>\n        <li>More consumers</li>\n        <li>Increase partitions</li>\n        <li>Optimize consumer</li>\n        <li>Batch processing</li>\n        <li>Reduce downstream latency</li>\n      </ul>\n      <p>Monitoring Kafka lag production reliability-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-52",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Retry",
      "Dead Letter Queue",
      "Failure Handling"
    ],
    "question": "Retry এবং DLQ কীভাবে একসাথে ব্যবহার করবেন?",
    "answer": "\n      <p>একটি message processing fail হলে প্রথমে retry করা যেতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Message\n ↓\nConsumer\n ↓\nFailure\n ↓\nRetry 1\n ↓\nRetry 2\n ↓\nRetry 3\n ↓\nStill Failed\n ↓\nDLQ</code></pre>\n      </div>\n      <p><strong>Temporary error:</strong></p>\n      <ul>\n        <li>Retry</li>\n      </ul>\n      <p><strong>Permanent/poison message:</strong></p>\n      <ul>\n        <li>DLQ</li>\n      </ul>\n      <p>DLQ monitoring এবং replay mechanism থাকা উচিত।</p>\n      <p>Consumer idempotent হওয়া জরুরি কারণ retry-এর কারণে duplicate processing হতে পারে।</p>\n    "
  },
  {
    "id": "microservice-53",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Distributed Systems",
      "Failure Handling"
    ],
    "question": "Cascading Failure কী?",
    "answer": "\n      <p>একটি service-এর failure বা slowness অন্য service-কে overload করে এবং ধীরে ধীরে পুরো system failure-এর দিকে যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Payment Service\n ↓ slow\nOrder Service\n ↓ waiting\nAPI Gateway\n ↓ waiting\nClient</code></pre>\n      </div>\n      <h4>Retry যোগ হলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>A\n ↓\nB\n ↓\nB retry\n ↓\nB retry\n ↓\nMore load\n ↓\nB completely overloaded</code></pre>\n      </div>\n      <h4>Prevent করার জন্য:</h4>\n      <ul>\n        <li>Timeout</li>\n        <li>Circuit breaker</li>\n        <li>Retry limit</li>\n        <li>Backoff</li>\n        <li>Bulkhead</li>\n        <li>Rate limiting</li>\n        <li>Load shedding</li>\n      </ul>\n      <p>ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "microservice-54",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Load Shedding",
      "Resilience"
    ],
    "question": "Load Shedding কী?",
    "answer": "\n      <p>System overload হলে সব request process করার চেষ্টা না করে কিছু request intentionally reject/drop করে system-কে healthy রাখাকে load shedding বলে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>architecture</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>System capacity:\n10,000 req/sec</code></pre>\n      </div>\n      <p><strong>Incoming:</strong><br>20,000 req/sec</p>\n      <p>সব request process করার চেষ্টা করলে পুরো system crash করতে পারে।</p>\n      <h4>তাই:</h4>\n      <ul>\n        <li>Low-priority request reject</li>\n        <li>Rate limit</li>\n        <li>Queue limit</li>\n        <li>Return 429/503</li>\n      </ul>\n      <p>করা হতে পারে।</p>\n      <h4>Goal:</h4>\n      <p>Partial failure<br>→ Full system failure হওয়া prevent করা।</p>\n    "
  },
  {
    "id": "microservice-55",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Scalability",
      "Horizontal Scaling"
    ],
    "question": "Microservice horizontal scaling কী?",
    "answer": "\n      <p>একটি service-এর multiple instance চালানোকে horizontal scaling বলে।</p>\n      <h4>Example:</h4>\n      <h4>Order Service:</h4>\n      <p>Instance 1<br>Instance 2<br>Instance 3<br>Instance 4</p>\n      <p>Load Balancer request distribute করবে।</p>\n      <p>Stateless application horizontal scaling-এর জন্য সবচেয়ে সহজ।</p>\n      <h4>State externalize করা যায়:</h4>\n      <ul>\n        <li>Redis</li>\n        <li>Database</li>\n        <li>Object Storage</li>\n        <li>Message Broker</li>\n      </ul>\n      <p>এর মাধ্যমে।</p>\n    "
  },
  {
    "id": "microservice-56",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Stateless",
      "Scalability"
    ],
    "question": "Microservice stateless কেন রাখা হয়?",
    "answer": "\n      <p>Stateless service request-specific state server memory-তে permanently ধরে রাখে না।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nLoad Balancer\n ├── Instance A\n ├── Instance B\n └── Instance C</code></pre>\n      </div>\n      <p>যেকোনো request যেকোনো instance process করতে পারে।</p>\n      <h4>State প্রয়োজন হলে:</h4>\n      <p>Redis<br>Database<br>Object Storage</p>\n      <p>ব্যবহার করা যায়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Easy horizontal scaling</li>\n        <li>Easy failover</li>\n        <li>Easy deployment</li>\n        <li>Better load balancing</li>\n      </ul>\n    "
  },
  {
    "id": "microservice-57",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Security",
      "Zero Trust",
      "Microservices"
    ],
    "question": "Microservices security কীভাবে design করবেন?",
    "answer": "\n      <p>Microservice security শুধু API Gateway-তে authentication দিয়ে শেষ করা উচিত নয়।</p>\n      <h4>Layers:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nAuthentication\n ↓\nAuthorization\n ↓\nService-to-Service Authentication\n ↓\nDatabase Authorization</code></pre>\n      </div>\n      <h4>Consider:</h4>\n      <ul>\n        <li>TLS</li>\n        <li>JWT/OAuth2</li>\n        <li>Service identity</li>\n        <li>mTLS যেখানে প্রয়োজন</li>\n        <li>Least privilege</li>\n        <li>Secret management</li>\n        <li>Network policies</li>\n        <li>Rate limiting</li>\n        <li>Audit logging</li>\n      </ul>\n      <p>একটি compromised service যেন পুরো system access করতে না পারে সেটাই গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-58",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Secrets",
      "Security",
      "Deployment"
    ],
    "question": "Microservice-এ secrets কীভাবে manage করবেন?",
    "answer": "\n      <p>Database password, API key, JWT secret source code-এ hardcode করা উচিত নয়।</p>\n      <h4>Bad:</h4>\n      <p>DB_PASSWORD = \"mypassword\"</p>\n      <h4>Better:</h4>\n      <p>Environment variables<br>Secret manager<br>Kubernetes Secrets<br>Cloud secret management</p>\n      <h4>Production-এ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Source Code\n    X\n    ↓\nSecret Manager\n    ↓\nApplication</code></pre>\n      </div>\n      <h4>Secrets:</h4>\n      <ul>\n        <li>Rotate করা উচিত</li>\n        <li>Access control করা উচিত</li>\n        <li>Logs-এ expose করা উচিত নয়</li>\n        <li>Git repository-তে রাখা উচিত নয়।</li>\n      </ul>\n    "
  },
  {
    "id": "microservice-59",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "Deployment",
      "CI/CD",
      "Zero Downtime"
    ],
    "question": "Microservice zero-downtime deployment কী?",
    "answer": "\n      <p>Application deploy করার সময় existing users-এর service বন্ধ না করে নতুন version gradually চালু করাকে zero-downtime deployment বলা হয়।</p>\n      <h4>Common strategies:</h4>\n      <ol>\n        <li>Rolling Deployment</li>\n        <li>Blue-Green Deployment</li>\n        <li>Canary Deployment</li>\n      </ol>\n      <h4>Rolling:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Old instances\n ↓\nGradually replace\n ↓\nNew instances</code></pre>\n      </div>\n      <h4>Canary:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Small traffic\n ↓\nNew version\n ↓\nMonitor\n ↓\nIncrease traffic</code></pre>\n      </div>\n      <p>Health check এবং backward-compatible API গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "microservice-60",
    "category": "Microservices",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Python",
      "FastAPI",
      "Kafka",
      "Redis"
    ],
    "question": "Python দিয়ে একটি production-ready Order Microservice architecture কীভাবে design করবেন?",
    "answer": "\n      <h4>একটি scalable Order Service-এর example architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n  ↓\nAPI Gateway\n  ↓\nOrder Service - FastAPI\n  ↓\nService Layer\n  ↓\nRepository Layer\n  ↓\nPostgreSQL</code></pre>\n      </div>\n      <h4>Parallel components:</h4>\n      <p>Order Service<br> ├── Redis<br> ├── Kafka<br> ├── Payment Service<br> ├── Inventory Service<br> └── Notification Service</p>\n      <h4>Order creation flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nPOST /orders\n ↓\nAPI Gateway\n ↓\nOrder Service\n ↓\nValidate Request\n ↓\nCreate Order\n ↓\nOutbox Event\n ↓\nPostgreSQL Transaction\n ↓\nOutbox Publisher\n ↓\nKafka\n ↓\norder.created\n ├── Inventory Service\n ├── Payment Service\n └── Notification Service</code></pre>\n      </div>\n      <h4>Reliability:</h4>\n      <p>Timeout<br>Retry<br>Circuit Breaker<br>Idempotency<br>DLQ<br>Outbox Pattern</p>\n      <h4>Database:</h4>\n      <p>PostgreSQL<br> ├── orders<br> ├── order_items<br> └── outbox_events</p>\n      <h4>Caching:</h4>\n      <p>Redis</p>\n      <h4>Messaging:</h4>\n      <p>Kafka</p>\n      <h4>Observability:</h4>\n      <p>Logs<br>Metrics<br>Distributed Tracing<br>Correlation ID</p>\n      <h4>Deployment:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Docker\n ↓\nKubernetes\n ↓\nMultiple Order Service instances</code></pre>\n      </div>\n      <h4>Important principle:</h4>\n      <p>Order Service অন্য service-এর database directly access করবে না।</p>\n      <h4>Instead:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓ API/Event\nPayment Service</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓ API/Event\nInventory Service</code></pre>\n      </div>\n      <p>এই architecture independent deployment, horizontal scaling, failure isolation এবং eventual consistency support করতে পারে।</p>\n    "
  }
];
