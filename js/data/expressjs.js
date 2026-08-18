const expressInterviewQuestions = [
	{
		id: "express-1",
		category: "Express.js",
		difficulty: "Basic",
		tags: ["Express.js", "Node.js", "Framework"],
		question: "Express.js কী এবং কেন ব্যবহার করা হয়?",
		answer: `Express.js হলো Node.js-এর উপর তৈরি একটি lightweight এবং flexible web framework। এটি মূলত REST API, web application এবং backend service তৈরি করার জন্য ব্যবহার করা হয়।

Express ব্যবহার করার প্রধান কারণ:
1. Routing সহজ করে।
2. Middleware architecture দেয়।
3. Request/Response handle করা সহজ।
4. REST API তৈরি করা সহজ।
5. Error handling করা যায়।
6. Authentication/Authorization middleware দিয়ে করা যায়।
7. Node.js-এর তুলনায় boilerplate code কম লাগে।

উদাহরণ:
const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.json({ message: "Users list" });
});

app.listen(3000);`,
	},

	{
		id: "express-2",
		category: "Express.js",
		difficulty: "Basic",
		tags: ["Express.js", "Architecture"],
		question: "Express.js কীভাবে কাজ করে?",
		answer: `Express মূলত একটি middleware এবং routing based request-response framework।

Client → HTTP Request → Express Middleware → Router → Controller/Handler → Service → Database → Response

যেমন:
GET /users

1. Request Express server-এ আসে।
2. Global middleware execute হয়।
3. Authentication middleware থাকতে পারে।
4. Router matching করে।
5. Controller/handler execute হয়।
6. প্রয়োজন হলে Service ও Database call হয়।
7. Response client-কে পাঠানো হয়।

Express-এর মূল architecture:
- Application
- Middleware
- Router
- Controller/Handler
- Error Handler`,
	},

	{
		id: "express-3",
		category: "Express.js",
		difficulty: "Basic",
		tags: ["Middleware", "Request Lifecycle"],
		question: "Express Middleware কী?",
		answer: `Middleware হলো এমন একটি function যা request এবং response-এর মাঝখানে execute হয়।

Signature:
(req, res, next)

উদাহরণ:
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

Middleware-এর কাজ:
- Logging
- Authentication
- Authorization
- Validation
- Parsing
- CORS
- Rate limiting
- Error handling

next() call করলে পরবর্তী middleware/handler-এ request চলে যায়।

next() না দিলে request processing আটকে যেতে পারে।`,
	},

	{
		id: "express-4",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Middleware", "next"],
		question: "next() কী এবং next(err) কী?",
		answer: `next() পরবর্তী middleware বা route handler-এ request পাঠায়।

next():
Middleware chain continue করে।

next(err):
Error middleware-এ control পাঠায়।

উদাহরণ:
app.use((req, res, next) => {
  try {
    // logic
    next();
  } catch (error) {
    next(error);
  }
});

Error middleware:
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});

Express-এ error handling-এর জন্য next(error) খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-5",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Middleware", "Types"],
		question: "Express-এ middleware কত ধরনের?",
		answer: `সাধারণভাবে Express middleware কয়েকভাবে ভাগ করা যায়:

1. Application-level middleware
2. Router-level middleware
3. Built-in middleware
4. Third-party middleware
5. Error-handling middleware

Application-level:
app.use(authMiddleware);

Router-level:
router.use(authMiddleware);

Built-in:
express.json()
express.urlencoded()

Third-party:
cors()
helmet()
morgan()

Error middleware:
(err, req, res, next)

Middleware-এর execution order গুরুত্বপূর্ণ। যেই order-এ register করা হয়, সাধারণত সেই order-এই execute হয়।`,
	},

	{
		id: "express-6",
		category: "Express.js",
		difficulty: "Basic",
		tags: ["Routing", "REST API"],
		question: "Express Routing কী?",
		answer: `Routing হলো নির্দিষ্ট HTTP method এবং URL অনুযায়ী নির্দিষ্ট handler execute করা।

উদাহরণ:
app.get("/users", getUsers);
app.post("/users", createUser);
app.get("/users/:id", getUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

HTTP methods:
GET → data read
POST → create
PUT → full update
PATCH → partial update
DELETE → delete

Large application-এ router আলাদা file-এ রাখা হয়।

const router = express.Router();

router.get("/", getUsers);

app.use("/users", router);`,
	},

	{
		id: "express-7",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Router", "Modular Architecture"],
		question: "express.Router() কেন ব্যবহার করা হয়?",
		answer: `express.Router() বড় application-এর route modular করার জন্য ব্যবহার করা হয়।

users.routes.js:
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;

app.js:
app.use("/api/users", userRouter);

এতে application maintainable হয়।

Architecture:
app.js
  ↓
routes
  ↓
controllers
  ↓
services
  ↓
repositories
  ↓
database`,
	},

	{
		id: "express-8",
		category: "Express.js",
		difficulty: "Basic",
		tags: ["Request", "Response"],
		question: "req এবং res কী?",
		answer: `req হলো incoming HTTP request-এর information এবং res হলো client-কে response পাঠানোর object।

req-এর গুরুত্বপূর্ণ properties:
req.params
req.query
req.body
req.headers
req.cookies
req.method
req.url

res-এর গুরুত্বপূর্ণ methods:
res.json()
res.send()
res.status()
res.sendStatus()
res.redirect()
res.cookie()

উদাহরণ:
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    id
  });
});`,
	},

	{
		id: "express-9",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Params", "Query", "Body"],
		question: "req.params, req.query এবং req.body-এর মধ্যে পার্থক্য কী?",
		answer: `req.params:
URL-এর dynamic অংশের জন্য।

GET /users/123
req.params.id → 123

req.query:
URL query parameters-এর জন্য।

GET /users?page=2&limit=10
req.query.page → 2

req.body:
Request body-এর data-এর জন্য।

POST /users
{
  "name": "Nazmul",
  "email": "test@example.com"
}

req.body.name → Nazmul

সংক্ষেপে:
params → resource identify
query → filtering/pagination/search
body → data পাঠানো`,
	},

	{
		id: "express-10",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Body Parser", "JSON"],
		question: "express.json() কী?",
		answer: `express.json() একটি built-in middleware যা incoming JSON request body parse করে req.body-তে রাখে।

app.use(express.json());

তারপর:
app.post("/users", (req, res) => {
  console.log(req.body);
});

Client:
{
  "name": "Nazmul",
  "age": 30
}

req.body:
{
  name: "Nazmul",
  age: 30
}

express.json() না থাকলে JSON body সাধারণভাবে req.body-তে পাওয়া যাবে না।`,
	},

	{
		id: "express-11",
		category: "Express.js",
		difficulty: "Important",
		tags: ["URL Encoding", "Parser"],
		question: "express.urlencoded() কী?",
		answer: `HTML form থেকে application/x-www-form-urlencoded data parse করার জন্য express.urlencoded() ব্যবহার করা হয়।

app.use(express.urlencoded({ extended: true }));

এটি সাধারণত form submission-এর ক্ষেত্রে ব্যবহৃত হয়।

extended: true হলে nested object parse করার জন্য richer parser ব্যবহার করা যায়।`,
	},

	{
		id: "express-12",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Error Handling", "Production"],
		question: "Express.js-এ centralized error handling কীভাবে করবেন?",
		answer: `একটি centralized error-handling middleware তৈরি করা ভালো।

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

Architecture:
Controller
   ↓
Service
   ↓
throw Error
   ↓
Error Middleware
   ↓
Standard Response

Production application-এ প্রতিটি controller-এ আলাদা আলাদা error response না লিখে centralized error handler ব্যবহার করা maintainable।`,
	},

	{
		id: "express-13",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Async", "Error Handling"],
		question: "Express-এ async/await error কীভাবে handle করবেন?",
		answer: `Async handler-এর ভিতরের rejected Promise যেন centralized error handler-এ যায় সেটা নিশ্চিত করতে হবে।

একটি common pattern:

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

ব্যবহার:
app.get("/users", asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
}));

এতে প্রতিটি async route-এ try/catch boilerplate কমে যায়।`,
	},

	{
		id: "express-14",
		category: "Express.js",
		difficulty: "Important",
		tags: ["HTTP", "Status Code"],
		question: "Express API-তে কোন HTTP status code বেশি ব্যবহার করা হয়?",
		answer: `200 OK → সফল GET/update response
201 Created → নতুন resource তৈরি
204 No Content → সফল operation কিন্তু response body নেই
400 Bad Request → invalid request
401 Unauthorized → authentication missing/invalid
403 Forbidden → authenticated কিন্তু permission নেই
404 Not Found → resource পাওয়া যায়নি
409 Conflict → duplicate/conflict
422 Unprocessable Entity → validation error
429 Too Many Requests → rate limit
500 Internal Server Error → server error
502 Bad Gateway → upstream service সমস্যা
503 Service Unavailable → service unavailable

উদাহরণ:
res.status(201).json(user);`,
	},

	{
		id: "express-15",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Authentication", "JWT"],
		question: "Express.js-এ JWT authentication কীভাবে implement করবেন?",
		answer: `সাধারণ JWT flow:

Login
 ↓
Validate username/password
 ↓
Generate JWT
 ↓
Client token store করে
 ↓
প্রতিটি protected request-এ token পাঠায়
 ↓
Auth middleware token verify করে
 ↓
req.user সেট করে
 ↓
Controller execute হয়

Header:
Authorization: Bearer <token>

Middleware:
const token = req.headers.authorization?.split(" ")[1];

const payload = jwt.verify(token, process.env.JWT_SECRET);

req.user = payload;
next();

JWT verify করার পরে user authorization করা যায়।`,
	},

	{
		id: "express-16",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Authentication", "Authorization"],
		question: "Authentication এবং Authorization-এর মধ্যে পার্থক্য কী?",
		answer: `Authentication = তুমি কে?

উদাহরণ:
Login করার সময় username/password বা token verify করা।

Authorization = তুমি কী করতে পারবে?

উদাহরণ:
Admin user delete করতে পারবে কিন্তু normal user পারবে না।

Flow:
Authentication
    ↓
User Identity
    ↓
Authorization
    ↓
Permission Check

Express application-এ authentication middleware এবং authorization middleware আলাদা রাখা ভালো।`,
	},

	{
		id: "express-17",
		category: "Express.js",
		difficulty: "Important",
		tags: ["RBAC", "Authorization"],
		question: "Express.js-এ RBAC কীভাবে করবেন?",
		answer: `RBAC = Role-Based Access Control।

প্রথমে authentication user-এর role বের করবে।

req.user = {
  id: 1,
  role: "admin"
};

তারপর authorization middleware:

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };
};

Route:
router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  deleteUser
);

এতে শুধুমাত্র admin user delete operation করতে পারবে।`,
	},

	{
		id: "express-18",
		category: "Express.js",
		difficulty: "Important",
		tags: ["CORS", "Security"],
		question: "CORS কী এবং Express-এ কীভাবে configure করবেন?",
		answer: `CORS = Cross-Origin Resource Sharing।

যখন frontend এবং backend আলাদা origin-এ থাকে তখন browser security policy-এর কারণে cross-origin request control করতে CORS প্রয়োজন হয়।

উদাহরণ:
const cors = require("cors");

app.use(cors({
  origin: "https://example.com",
  credentials: true
}));

Production-এ সাধারণত wildcard (*) দিয়ে credentials-enabled API expose না করে নির্দিষ্ট origin allow করা নিরাপদ।`,
	},

	{
		id: "express-19",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Security", "Helmet"],
		question: "Helmet কী এবং কেন ব্যবহার করা হয়?",
		answer: `Helmet Express application-এর security-related HTTP headers configure করতে সাহায্য করে।

const helmet = require("helmet");

app.use(helmet());

এটি বিভিন্ন browser security header সেট করতে সাহায্য করে।

উদাহরণ:
- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- অন্যান্য security headers

Production API-তে security hardening-এর জন্য Helmet সাধারণত ব্যবহার করা হয়।`,
	},

	{
		id: "express-20",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Rate Limiting", "Security"],
		question: "Express API-তে Rate Limiting কেন দরকার?",
		answer: `Rate limiting একটি client নির্দিষ্ট সময়ের মধ্যে কত request করতে পারবে সেটা control করে।

প্রয়োজন:
1. Brute-force attack কমানো।
2. API abuse প্রতিরোধ।
3. Resource protection।
4. DDoS-এর কিছু application-level impact কমানো।

উদাহরণ:
100 requests / 15 minutes / IP

Production-এ distributed system হলে Redis-backed rate limiter ব্যবহার করা যেতে পারে, যাতে multiple API instances একই rate-limit state share করতে পারে।`,
	},

	{
		id: "express-21",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Validation", "API"],
		question: "Express.js API request validation কীভাবে করবেন?",
		answer: `Client input কখনো সরাসরি trust করা উচিত নয়।

Validation library ব্যবহার করা যায়:
- Zod
- Joi
- express-validator
- Yup

উদাহরণ concept:
POST /users

{
  "email": "invalid",
  "age": -5
}

Validation middleware request reject করবে।

Flow:
Request
 ↓
Validation
 ↓
Controller
 ↓
Service

Validation controller-এর আগে করা ভালো, যাতে invalid data application-এর ভিতরে না যায়।`,
	},

	{
		id: "express-22",
		category: "Express.js",
		difficulty: "Important",
		tags: ["API", "Validation"],
		question: "Input validation এবং sanitization-এর মধ্যে পার্থক্য কী?",
		answer: `Validation check করে input valid কিনা।

উদাহরণ:
email অবশ্যই valid email হতে হবে।

Sanitization input-এর unwanted বা dangerous অংশ remove/normalize করে।

উদাহরণ:
- trim whitespace
- normalize input
- unwanted HTML remove করা

Validation:
"এটা valid?"

Sanitization:
"Input-টাকে safe/normalized form-এ কীভাবে আনব?"

দুটোই API security এবং data integrity-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-23",
		category: "Express.js",
		difficulty: "Important",
		tags: ["API Versioning", "REST"],
		question: "Express API versioning কীভাবে করবেন?",
		answer: `API versioning করলে existing client না ভেঙে নতুন API version release করা যায়।

Common approach:

/api/v1/users
/api/v2/users

Express:
app.use("/api/v1/users", userV1Router);
app.use("/api/v2/users", userV2Router);

Versioning করার সুবিধা:
- Backward compatibility
- Gradual migration
- Multiple client version support

Large production API-তে breaking change হলে versioning গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-24",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Pagination", "Filtering", "REST API"],
		question: "Express API-তে pagination, filtering এবং sorting কীভাবে design করবেন?",
		answer: `Query parameters ব্যবহার করা যায়।

GET /products?page=2&limit=20
GET /products?category=electronics
GET /products?sort=price&order=asc

Backend flow:
Request
 ↓
Parse query
 ↓
Validate query
 ↓
Build database query
 ↓
Return data + metadata

Response:
{
  "data": [],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 250,
    "totalPages": 13
  }
}

Production API-তে limit-এর maximum value enforce করা উচিত।`,
	},

	{
		id: "express-25",
		category: "Express.js",
		difficulty: "Important",
		tags: ["REST API", "Idempotency"],
		question: "Express API-তে idempotency কী?",
		answer: `একই request একাধিকবার execute হলেও ফলাফল যেন unintendedভাবে duplicate না হয় সেটাই idempotency।

বিশেষ করে payment/order API-তে গুরুত্বপূর্ণ।

উদাহরণ:
POST /payments

Header:
Idempotency-Key: abc123

Server প্রথম request-এর result store করবে।

একই key দিয়ে আবার request এলে নতুন payment তৈরি না করে আগের result return করবে।

এটি network retry এবং distributed systems-এর ক্ষেত্রে খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-26",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Database", "Architecture"],
		question: "Express application-এ Controller, Service এবং Repository layer কেন আলাদা করবেন?",
		answer: `Separation of concerns-এর জন্য।

Controller:
HTTP request/response handle করে।

Service:
Business logic handle করে।

Repository:
Database access handle করে।

Architecture:

Request
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database

উদাহরণ:
Controller:
const users = await userService.getUsers();

Service:
business rules apply করে।

Repository:
return db.user.findMany();

এতে testing, maintenance এবং scaling সহজ হয়।`,
	},

	{
		id: "express-27",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Architecture", "Clean Architecture"],
		question: "Express.js-এর জন্য ভালো production folder structure কেমন হতে পারে?",
		answer: `একটি scalable structure:

src/
├── config/
├── routes/
├── controllers/
├── services/
├── repositories/
├── models/
├── middlewares/
├── validators/
├── utils/
├── errors/
├── jobs/
├── events/
├── app.js
└── server.js

app.js:
Express configuration, middleware এবং routes।

server.js:
HTTP server start এবং infrastructure-level startup।

এই separation testing এবং application bootstrap clean রাখতে সাহায্য করে।`,
	},

	{
		id: "express-28",
		category: "Express.js",
		difficulty: "Important",
		tags: ["app.js", "server.js"],
		question: "app.js এবং server.js আলাদা করার সুবিধা কী?",
		answer: `app.js সাধারণত Express application configure করে।

server.js:
- Port listen করে
- Database connection
- Server startup
- Graceful shutdown-এর মতো bootstrap কাজ handle করতে পারে।

app.js:
const app = express();
app.use(...);
module.exports = app;

server.js:
const app = require("./app");

app.listen(PORT);

এতে app-কে integration test-এ সরাসরি import করা যায় এবং test চালানোর সময় আলাদা server listener প্রয়োজন হয় না।`,
	},

	{
		id: "express-29",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Testing", "Supertest"],
		question: "Express API কীভাবে test করবেন?",
		answer: `Testing-এর জন্য সাধারণত ব্যবহার করা যায়:
- Jest
- Vitest
- Supertest

Test types:
1. Unit test
2. Integration test
3. API/E2E test

Supertest দিয়ে:
request(app)
  .get("/users")
  .expect(200);

Unit test:
Service-এর business logic আলাদাভাবে test।

Integration test:
API + database interaction test।

E2E:
Realistic user flow test।

Production-quality application-এ critical business logic এবং API endpoints test করা গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-30",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Logging", "Observability"],
		question: "Express application-এ logging কীভাবে করবেন?",
		answer: `Production application-এ console.log-এর পরিবর্তে structured logging ব্যবহার করা ভালো।

Common tools:
- Pino
- Winston

Log করতে পারেন:
- request ID
- method
- URL
- status code
- response time
- error
- user/service context

Example:
{
  "level": "info",
  "requestId": "abc123",
  "method": "GET",
  "path": "/users",
  "status": 200,
  "duration": 35
}

Distributed system-এ request ID/trace ID অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-31",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Request ID", "Distributed Systems"],
		question: "Request ID বা Correlation ID কী?",
		answer: `একটি request-এর জন্য unique ID generate করে পুরো request lifecycle-এ carry করা হয়।

Client
 ↓ request-id: abc123
API Gateway
 ↓ abc123
Express Service
 ↓ abc123
Order Service
 ↓ abc123
Payment Service

এতে একটি distributed request-এর সব log একসাথে খুঁজে পাওয়া যায়।

Middleware:
req.id = crypto.randomUUID();

তারপর logger-এ req.id ব্যবহার করা যায়।`,
	},

	{
		id: "express-32",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Graceful Shutdown", "Production"],
		question: "Express server-এ graceful shutdown কী?",
		answer: `Application বন্ধ করার সময় নতুন request গ্রহণ বন্ধ করে existing request শেষ করার process হলো graceful shutdown।

Typical flow:
SIGTERM
 ↓
Stop accepting new traffic
 ↓
Finish existing requests
 ↓
Close DB connection
 ↓
Close Redis/Kafka/RabbitMQ connection
 ↓
Exit process

উদাহরণ:
process.on("SIGTERM", async () => {
  server.close(async () => {
    await db.close();
    process.exit(0);
  });
});

Docker এবং Kubernetes environment-এ graceful shutdown বিশেষভাবে গুরুত্বপূর্ণ।`,
	},

	{
		id: "express-33",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Performance", "Node.js"],
		question: "Express.js application-এর performance কীভাবে improve করবেন?",
		answer: `গুরুত্বপূর্ণ optimization:

1. Async I/O ব্যবহার।
2. Blocking operation avoid করা।
3. Database indexing।
4. Connection pooling।
5. Redis caching।
6. Response compression।
7. Pagination।
8. Efficient queries।
9. Rate limiting।
10. Load balancing।
11. Horizontal scaling।
12. Production logging optimize করা।

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো bottleneck measure করে optimization করা।

Flow:
Metrics
 ↓
Find bottleneck
 ↓
Optimize
 ↓
Load test
 ↓
Measure again`,
	},

	{
		id: "express-34",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Caching", "Redis"],
		question: "Express API-তে Redis caching কীভাবে ব্যবহার করবেন?",
		answer: `যেসব data বারবার read হয় সেগুলোর জন্য Redis cache ব্যবহার করা যায়।

Flow:

Request
 ↓
Check Redis
 ↓
Cache hit → Return
 ↓
Cache miss
 ↓
Database
 ↓
Save Redis
 ↓
Return

Example:
GET /products/10

Redis key:
product:10

Cache hit হলে database query প্রয়োজন হয় না।

তবে cache invalidation strategy গুরুত্বপূর্ণ।

যেমন product update হলে:
DEL product:10`,
	},

	{
		id: "express-35",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Transactions", "Database"],
		question: "Express API-তে database transaction কেন গুরুত্বপূর্ণ?",
		answer: `যখন একটি business operation-এর একাধিক database operation atomicভাবে execute করতে হয় তখন transaction প্রয়োজন।

উদাহরণ:
Transfer $100

1. Account A থেকে -100
2. Account B-তে +100

একটি সফল এবং অন্যটি failed হলে data inconsistent হবে।

Transaction:
BEGIN
 ↓
Debit
 ↓
Credit
 ↓
COMMIT

যদি error:
ROLLBACK

Express নিজে transaction manage করে না। Database/ORM layer transaction manage করে।`,
	},

	{
		id: "express-36",
		category: "Express.js",
		difficulty: "Important",
		tags: ["File Upload", "Multipart"],
		question: "Express-এ file upload কীভাবে handle করবেন?",
		answer: `multipart/form-data request handle করার জন্য Multer-এর মতো middleware ব্যবহার করা যায়।

Typical flow:

Client
 ↓
multipart/form-data
 ↓
Upload middleware
 ↓
Validation
 ↓
Storage
 ↓
Database metadata

Production-এ বড় file application server-এর local filesystem-এ না রেখে object storage যেমন S3-compatible storage ব্যবহার করা ভালো।

Database-এ সাধারণত file-এর URL/key রাখা হয়, binary file নয়।`,
	},

	{
		id: "express-37",
		category: "Express.js",
		difficulty: "Important",
		tags: ["Cookies", "Session"],
		question: "Express-এ cookie কীভাবে ব্যবহার করবেন?",
		answer: `Cookie client browser-এ ছোট data রাখার জন্য ব্যবহার করা যায়।

Common use:
- Session ID
- Refresh token
- Preferences

Security-related cookie হলে সাধারণত:
HttpOnly
Secure
SameSite

ব্যবহার করা হয়।

HttpOnly → JavaScript থেকে cookie access কমায়।
Secure → HTTPS connection-এ পাঠায়।
SameSite → cross-site request behavior control করে।

Authentication design অনুযায়ী cookie-based session অথবা token-based approach ব্যবহার করা যায়।`,
	},

	{
		id: "express-38",
		category: "Express.js",
		difficulty: "Important",
		tags: ["CSRF", "Security"],
		question: "CSRF কী এবং Express application-এ কীভাবে prevent করবেন?",
		answer: `CSRF = Cross-Site Request Forgery।

বিশেষ করে cookie-based authentication-এ attacker victim-এর browser ব্যবহার করে unwanted request করানোর চেষ্টা করতে পারে।

Protection:
1. SameSite cookie।
2. CSRF token।
3. Origin/Referer validation যেখানে appropriate।
4. Proper authentication design।

Bearer token header-based authentication সাধারণত browser cookie-based CSRF-এর একই ধরনের risk বহন করে না, তবে XSS এবং token storage-এর ঝুঁকি আলাদাভাবে বিবেচনা করতে হয়।`,
	},

	{
		id: "express-39",
		category: "Express.js",
		difficulty: "Important",
		tags: ["SQL Injection", "Security"],
		question: "Express.js API-তে SQL Injection কীভাবে prevent করবেন?",
		answer: `User input সরাসরি SQL query string-এর সাথে concatenate করা উচিত নয়।

Unsafe:
const sql = "SELECT * FROM users WHERE id = " + req.params.id;

Safe approach:
- Parameterized query
- Prepared statements
- Trusted ORM/query builder
- Input validation

উদাহরণ concept:
SELECT * FROM users WHERE id = ?

এখানে user input query structure-এর অংশ না হয়ে parameter হিসেবে যায়।`,
	},

	{
		id: "express-40",
		category: "Express.js",
		difficulty: "Important",
		tags: ["NoSQL Injection", "Security"],
		question: "NoSQL Injection কীভাবে prevent করবেন?",
		answer: `MongoDB-এর মতো NoSQL database-এ malicious query object পাঠিয়ে query behavior পরিবর্তনের চেষ্টা করা হতে পারে।

Protection:
1. Input validation।
2. Schema validation।
3. User input সরাসরি query object হিসেবে ব্যবহার না করা।
4. Allowed fields whitelist করা।
5. MongoDB/ODM security best practices অনুসরণ করা।

যেমন login query-তে সম্পূর্ণ req.body database filter হিসেবে ব্যবহার না করে শুধুমাত্র expected fields ব্যবহার করা উচিত।`,
	},

	{
		id: "express-41",
		category: "Express.js",
		difficulty: "Important",
		tags: ["OpenAPI", "Swagger", "Documentation"],
		question: "Express API কীভাবে document করবেন?",
		answer: `REST API documentation-এর জন্য OpenAPI/Swagger ব্যবহার করা যায়।

Documentation-এ থাকা উচিত:
- Endpoint
- HTTP method
- Parameters
- Request body
- Response
- Status codes
- Authentication
- Error response

Example:
GET /api/v1/users

Swagger UI ব্যবহার করলে developer browser থেকেই API দেখতে এবং test করতে পারে।

Documentation API development এবং frontend/mobile integration সহজ করে।`,
	},

	{
		id: "express-42",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["API Gateway", "Microservices"],
		question: "Microservices architecture-এ Express.js-এর ভূমিকা কী হতে পারে?",
		answer: `Express.js একটি individual microservice তৈরি করতে ব্যবহার করা যায়।

উদাহরণ:

API Gateway
    ↓
 ┌───────────────┐
 ↓       ↓       ↓
User    Order   Payment
Service Service Service
 ↓       ↓       ↓
DB      DB      DB

প্রতিটি service আলাদা Express application হতে পারে।

Express-এর দায়িত্ব:
- HTTP API
- Routing
- Middleware
- Validation
- Authentication integration
- Error handling

Business logic service layer-এ রাখা উচিত।`,
	},

	{
		id: "express-43",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Microservices", "Resilience"],
		question: "Express microservice-এ Retry এবং Circuit Breaker কেন দরকার?",
		answer: `Distributed system-এ একটি service অন্য service-এর উপর নির্ভর করতে পারে।

যদি Payment Service temporarily unavailable হয়:

Order Service
   ↓
Payment Service ❌

Retry transient failure handle করতে পারে।

কিন্তু unlimited retry করলে system overload হতে পারে।

Circuit breaker:
Closed → requests pass
Open → requests immediately fail
Half-open → limited test request

এতে failing downstream service-এর কারণে পুরো system cascade failure-এ পড়া থেকে কিছুটা রক্ষা পায়।`,
	},

	{
		id: "express-44",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Queues", "Background Jobs"],
		question: "Express API থেকে background job কেন ব্যবহার করবেন?",
		answer: `যেসব কাজ user response-এর জন্য অপেক্ষা করানো প্রয়োজন নেই সেগুলো background job-এ পাঠানো যায়।

উদাহরণ:
POST /orders
 ↓
Create Order
 ↓
Queue Job
 ↓
Return 201

Background worker:
Queue
 ↓
Send Email
 ↓
Generate Invoice
 ↓
Notification

Tools:
- BullMQ
- RabbitMQ
- Kafka

এতে API response দ্রুত হয় এবং heavy কাজ আলাদা worker process-এ করা যায়।`,
	},

	{
		id: "express-45",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Scalability", "Cluster"],
		question: "Express.js application কীভাবে horizontally scale করবেন?",
		answer: `একটি server-এর CPU/RAM বাড়ানোর পরিবর্তে multiple application instances চালানোকে horizontal scaling বলা হয়।

Load Balancer
      ↓
 ┌────┼────┐
 ↓    ↓    ↓
API1 API2 API3
 ↓    ↓    ↓
Shared DB/Redis

Stateless application হলে scaling সহজ হয়।

যদি session state local memory-তে রাখা হয়, multiple instances-এর মধ্যে সমস্যা হতে পারে। তখন shared session store বা stateless authentication ব্যবহার করা যায়।`,
	},

	{
		id: "express-46",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Streams", "Performance"],
		question: "Express.js-এ Stream কী এবং কখন ব্যবহার করবেন?",
		answer: `Stream বড় data একবারে memory-তে load না করে chunk-by-chunk process করতে দেয়।

Useful for:
- Large file download
- Video/audio
- Large CSV
- Large database export

Concept:
File
 ↓
Readable Stream
 ↓
Express Response
 ↓
Client

এতে memory usage কমতে পারে।

res.pipe() অথবা stream pipeline-এর মতো Node.js stream API ব্যবহার করা যায়।`,
	},

	{
		id: "express-47",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Compression", "Performance"],
		question: "Express API response compression কী?",
		answer: `Response compression network payload size কমায়।

Common compression:
- gzip
- Brotli

Express application-এ compression middleware ব্যবহার করা যায়।

সুবিধা:
- কম bandwidth
- Faster transfer
- Large JSON response-এর ক্ষেত্রে benefit

তবে CPU cost এবং proxy/CDN configuration বিবেচনা করতে হবে।`,
	},

	{
		id: "express-48",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Health Check", "Kubernetes", "Production"],
		question: "Express application-এ health check endpoint কেন দরকার?",
		answer: `Deployment platform বা load balancer service healthy কিনা জানতে health endpoint ব্যবহার করে।

Liveness:
GET /health/live

Readiness:
GET /health/ready

Liveness → process বেঁচে আছে কিনা।

Readiness → traffic নেওয়ার জন্য service ready কিনা।

Readiness check-এ database বা required dependency connectivity বিবেচনা করা যেতে পারে, তবে অতিরিক্ত dependency check যেন নিজেই health endpoint-কে fragile না করে।`,
	},

	{
		id: "express-49",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Observability", "Tracing"],
		question: "Express application-এ distributed tracing কী?",
		answer: `Distributed tracing একটি request বিভিন্ন service-এর মধ্যে কীভাবে travel করেছে সেটা track করে।

Example:

Client
 ↓
API Gateway
 ↓
Order Service
 ↓
Payment Service
 ↓
Notification Service

একটি Trace ID-এর অধীনে বিভিন্ন Span থাকে।

Trace:
abc123

Spans:
API Gateway: 10ms
Order Service: 50ms
Payment Service: 500ms

এতে bottleneck এবং distributed failure খুঁজে বের করা সহজ হয়।

OpenTelemetry একটি common observability standard/tooling ecosystem।`,
	},

	{
		id: "express-50",
		category: "Express.js",
		difficulty: "Advanced",
		tags: ["Production", "System Design"],
		question: "একটি production-ready Express.js REST API কীভাবে design করবেন?",
		answer: `একটি ভালো production architecture:

Client
  ↓
Load Balancer / API Gateway
  ↓
Express API
  ↓
Middleware
  ├── Request ID
  ├── Authentication
  ├── Authorization
  ├── Validation
  ├── Rate Limit
  └── Logging
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database

Supporting infrastructure:
- Redis → caching/session/rate limiting
- Message Queue → background jobs
- Object Storage → files
- Monitoring → metrics
- OpenTelemetry → tracing
- Centralized Logging → logs
- Secrets Manager/Environment → secrets

Security:
- HTTPS
- Helmet/security headers
- CORS configuration
- Input validation
- Parameterized queries
- Authentication
- Authorization
- Rate limiting

Reliability:
- Timeout
- Retry with backoff
- Circuit breaker
- Idempotency
- Graceful shutdown
- Health/readiness checks

Scalability:
- Stateless API
- Horizontal scaling
- Load balancing
- Database optimization
- Cache

Interview-এ সবচেয়ে গুরুত্বপূর্ণ হলো শুধু Express-এর API লিখতে পারা নয়; বরং request lifecycle, middleware, error handling, security, database interaction, testing, observability এবং production scalability বুঝতে পারা।`,
	},
];
