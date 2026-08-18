const fastApi = [
	// ============================================================
	// FASTAPI FUNDAMENTALS
	// ============================================================

	{
		id: "fastapi-1",
		category: "FastAPI",
		difficulty: "Beginner",
		tags: ["FastAPI", "Framework", "REST API"],
		question: "FastAPI কী? কেন FastAPI ব্যবহার করা হয়?",
		answer: `FastAPI হলো Python-এর একটি modern web framework, যা মূলত API এবং backend application তৈরির জন্য ব্যবহৃত হয়।

FastAPI-এর প্রধান বৈশিষ্ট্য:

1. ASGI-based
2. Async/await support
3. Automatic request validation
4. Automatic response serialization
5. OpenAPI documentation
6. Swagger UI
7. ReDoc
8. Python type hints
9. Dependency Injection
10. High performance
11. Pydantic-based validation
12. WebSocket support

FastAPI-এর architecture মূলত Starlette এবং Pydantic-এর উপর নির্ভর করে।

High-level flow:

Client
   ↓
FastAPI
   ↓
Starlette
   ↓
ASGI Server
   ↓
Application

FastAPI বিশেষভাবে useful:
- REST API
- Microservices
- Async applications
- High-concurrency API
- Internal services
- AI/ML backend
- Modern Python backend

FastAPI-এর বড় advantage হলো Python type hints ব্যবহার করে validation, serialization এবং API documentation-এর অনেক কাজ automatically করা।`,
	},

	{
		id: "fastapi-2",
		category: "FastAPI",
		difficulty: "Beginner",
		tags: ["FastAPI", "ASGI", "WSGI", "Architecture"],
		question: "FastAPI কীভাবে Django বা Flask থেকে আলাদা?",
		answer: `FastAPI মূলত API-first এবং ASGI-based framework।

Flask historically WSGI-based এবং lightweight web framework।

Django একটি batteries-included framework যেখানে ORM, admin, authentication, middleware এবং অনেক built-in feature থাকে।

FastAPI:
→ API-focused
→ ASGI
→ Async-first
→ Pydantic validation
→ Automatic OpenAPI docs

Django:
→ Full web framework
→ Built-in ORM
→ Admin
→ Authentication
→ Templates
→ DRF ব্যবহার করে API তৈরি করা যায়

Flask:
→ Lightweight
→ Flexible
→ অনেক component নিজে integrate করতে হয়

FastAPI-এর শক্তি হলো modern API development এবং asynchronous I/O।`,
	},

	{
		id: "fastapi-3",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["ASGI", "WSGI", "Web Server"],
		question: "ASGI কী? FastAPI কেন ASGI ব্যবহার করে?",
		answer: `ASGI-এর পূর্ণরূপ Asynchronous Server Gateway Interface।

এটি Python web application এবং server-এর মধ্যে একটি standard interface।

পুরনো WSGI মূলত synchronous request/response model-এর জন্য তৈরি।

ASGI:
- Async support করে
- WebSocket support করে
- Long-lived connection support করে
- Concurrent I/O handling-এর জন্য ভালো

Architecture:

Client
   ↓
Uvicorn
   ↓
ASGI
   ↓
FastAPI
   ↓
Application

FastAPI async endpoint-এর সুবিধা নিতে ASGI ব্যবহার করে।

বিশেষ করে high-concurrency I/O-bound application-এ ASGI গুরুত্বপূর্ণ।`,
	},

	{
		id: "fastapi-4",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Uvicorn", "ASGI Server", "Deployment"],
		question: "Uvicorn কী?",
		answer: `Uvicorn হলো একটি high-performance ASGI server।

FastAPI নিজে HTTP server নয়। FastAPI application run করার জন্য Uvicorn-এর মতো ASGI server ব্যবহার করা হয়।

Flow:

Browser / Client
        ↓
Uvicorn
        ↓
ASGI
        ↓
FastAPI
        ↓
Endpoint

Example:

uvicorn main:app --reload

এখানে:

main
→ Python module

app
→ FastAPI application object

--reload
→ Development-এর সময় code পরিবর্তন হলে server reload করে।

Production-এ সাধারণত reload ব্যবহার করা উচিত নয়।`,
	},

	{
		id: "fastapi-5",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Starlette", "Pydantic", "Architecture"],
		question: "FastAPI internally কোন technologies-এর উপর তৈরি?",
		answer: `FastAPI-এর architecture বোঝার জন্য দুটি গুরুত্বপূর্ণ component হলো:

1. Starlette
2. Pydantic

Starlette:
→ ASGI web functionality
→ Routing
→ Middleware
→ Request/Response
→ WebSocket
→ Background task infrastructure

Pydantic:
→ Data validation
→ Parsing
→ Serialization
→ Schema generation

FastAPI:
→ এই components-এর উপর developer-friendly API layer তৈরি করে।

Simplified:

FastAPI
├── Starlette
│   ├── Routing
│   ├── Middleware
│   ├── Request
│   └── Response
│
└── Pydantic
    ├── Validation
    ├── Parsing
    └── Serialization`,
	},

	// ============================================================
	// ROUTING
	// ============================================================

	{
		id: "fastapi-6",
		category: "FastAPI",
		difficulty: "Beginner",
		tags: ["Routing", "APIRouter", "Endpoint"],
		question: "FastAPI routing কীভাবে কাজ করে?",
		answer: `FastAPI-তে route একটি URL এবং HTTP method-এর সাথে একটি Python function connect করে।

Example:

@app.get("/users")
def get_users():
    return []

এখানে:

GET /users
→ get_users()

Common HTTP methods:

GET
POST
PUT
PATCH
DELETE

Large application-এ সব route main.py-তে না রেখে APIRouter ব্যবহার করা ভালো।

Example structure:

app/
    main.py
    routers/
        users.py
        products.py
        orders.py

এতে feature-based modular architecture তৈরি হয়।`,
	},

	{
		id: "fastapi-7",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["APIRouter", "Modular Architecture"],
		question: "APIRouter কী এবং কেন ব্যবহার করবেন?",
		answer: `APIRouter FastAPI application-এর routes modularize করতে ব্যবহার করা হয়।

Example:

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/")
def get_users():
    return []

তারপর main application-এ:

app.include_router(router)

Benefits:

- Feature-based organization
- Large application maintainability
- Prefix management
- Tags
- Dependency management
- Versioned API structure

Example:

/api/v1/users
/api/v1/orders
/api/v1/products

এভাবে API organize করা যায়।`,
	},

	{
		id: "fastapi-8",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Path Parameter", "Query Parameter", "Request"],
		question: "Path parameter এবং Query parameter-এর মধ্যে পার্থক্য কী?",
		answer: `Path parameter resource identify করতে ব্যবহৃত হয়।

Example:

GET /users/100

এখানে 100 হলো path parameter।

FastAPI:

@app.get("/users/{user_id}")
def get_user(user_id: int):
    ...

Query parameter সাধারণত filtering, sorting, pagination ইত্যাদির জন্য ব্যবহার হয়।

Example:

GET /users?page=1&limit=20

FastAPI:

@app.get("/users")
def get_users(
    page: int = 1,
    limit: int = 20
):
    ...

Rule:

Path parameter
→ Resource identity

Query parameter
→ Filtering / sorting / pagination / optional criteria`,
	},

	{
		id: "fastapi-9",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Request Body", "Pydantic", "Validation"],
		question: "FastAPI request body validation কীভাবে কাজ করে?",
		answer: `FastAPI request body validation-এর জন্য Pydantic model ব্যবহার করে।

Example:

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: int

Endpoint:

@app.post("/users")
def create_user(user: UserCreate):
    return user

Client invalid data পাঠালে FastAPI automatically validation error response তৈরি করে।

Flow:

JSON Request
    ↓
Pydantic
    ↓
Validation
    ↓
Valid?
 ┌──┴──┐
Yes   No
 ↓     ↓
API   422 Error

এতে manual validation code অনেক কমে যায়।`,
	},

	// ============================================================
	// PYDANTIC
	// ============================================================

	{
		id: "fastapi-10",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Pydantic", "Validation", "Schema"],
		question: "Pydantic কী এবং FastAPI-তে কেন এত গুরুত্বপূর্ণ?",
		answer: `Pydantic হলো Python data validation এবং parsing library।

FastAPI Pydantic ব্যবহার করে:

1. Request validation
2. Response validation
3. Serialization
4. Schema generation
5. OpenAPI documentation

Example:

class Product(BaseModel):
    name: str
    price: float
    quantity: int

যদি client পাঠায়:

{
    "name": "Laptop",
    "price": "1000",
    "quantity": "5"
}

Pydantic configured rules অনুযায়ী data parse/validate করতে পারে।

FastAPI-এর type-hint-driven development-এর মূল অংশ Pydantic।`,
	},

	{
		id: "fastapi-11",
		category: "FastAPI",
		difficulty: "Advanced",
		tags: ["Pydantic", "Field", "Validation"],
		question: "Pydantic Field এবং custom validation কীভাবে করবেন?",
		answer: `Field ব্যবহার করে field-এর constraints এবং metadata define করা যায়।

Example:

class Product(BaseModel):
    name: str = Field(min_length=3)
    price: float = Field(gt=0)
    quantity: int = Field(ge=1)

এতে:

name
→ minimum 3 characters

price
→ greater than 0

quantity
→ minimum 1

Complex business validation-এর জন্য model-level বা field-level validators ব্যবহার করা যায়।

তবে database-level constraint-এর প্রয়োজন থাকলে শুধু Pydantic validation-এর উপর নির্ভর করা উচিত নয়।`,
	},

	{
		id: "fastapi-12",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Response Model", "Serialization", "Pydantic"],
		question: "response_model কী? কেন ব্যবহার করা উচিত?",
		answer: `response_model API response-এর structure এবং exposed fields define করে।

Example:

class UserResponse(BaseModel):
    id: int
    name: str

@app.get(
    "/users/{id}",
    response_model=UserResponse
)
def get_user(id: int):
    ...

এতে:

1. Response validation
2. Serialization
3. OpenAPI documentation
4. Sensitive field hide করা

সম্ভব হয়।

ধরা যাক database user object-এ:

id
name
email
password_hash
created_at

আছে।

Response model-এ password_hash না রাখলে API client-এর কাছে সেটি expose হবে না।`,
	},

	// ============================================================
	// DEPENDENCY INJECTION
	// ============================================================

	{
		id: "fastapi-13",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Dependency Injection", "Depends", "DI"],
		question: "FastAPI Dependency Injection কী?",
		answer: `Dependency Injection হলো একটি mechanism যেখানে function নিজের dependency নিজে তৈরি না করে বাইরে থেকে dependency receive করে।

FastAPI-তে Depends() ব্যবহার করা হয়।

Example:

def get_current_user():
    return user

@app.get("/profile")
def profile(
    user = Depends(get_current_user)
):
    return user

FastAPI request process করার সময় dependency resolve করে।

Common use:

- Database session
- Authentication
- Authorization
- Current user
- Configuration
- Service object
- Permission checking

DI-এর ফলে code loosely coupled এবং testable হয়।`,
	},

	{
		id: "fastapi-14",
		category: "FastAPI",
		difficulty: "Advanced",
		tags: ["Dependency Injection", "Nested Dependency", "Architecture"],
		question: "FastAPI-তে nested dependency কী?",
		answer: `একটি dependency নিজেই অন্য dependency-এর উপর depend করতে পারে।

Example:

get_current_user()
       ↓
get_token()
       ↓
Authorization header

অথবা:

get_current_user()
       ↓
get_db()
       ↓
Database Session

এতে dependency graph তৈরি হয়।

FastAPI dependency tree resolve করে এবং প্রয়োজনীয় dependency inject করে।

Large application-এ এটি authentication, permissions, database এবং tenant context-এর মতো cross-cutting concern manage করতে useful।`,
	},

	{
		id: "fastapi-15",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Dependency Injection", "Yield", "Database", "Lifecycle"],
		question: "FastAPI dependency-তে yield কেন ব্যবহার করা হয়?",
		answer: `yield dependency resource setup এবং cleanup-এর জন্য ব্যবহার করা যায়।

Example:

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

Flow:

Request
 ↓
Create DB Session
 ↓
yield
 ↓
Endpoint executes
 ↓
finally
 ↓
Close Session

এটি database session, resource এবং connection lifecycle manage করার জন্য খুব useful।

এভাবে প্রতি request-এর জন্য resource safely acquire এবং release করা যায়।`,
	},

	// ============================================================
	// ASYNC
	// ============================================================

	{
		id: "fastapi-16",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Async", "Await", "I/O", "Concurrency"],
		question: "FastAPI-তে async def endpoint এবং def endpoint-এর মধ্যে পার্থক্য কী?",
		answer: `FastAPI দুই ধরনের endpoint support করে:

async def

এবং

def

async def endpoint event loop-এর সাথে asynchronous execution করতে পারে।

Example:

@app.get("/users")
async def users():
    result = await async_db.fetch_all()
    return result

এখানে I/O-এর সময় অন্য task execute হতে পারে।

Normal def endpoint blocking/synchronous code-এর জন্য useful।

FastAPI synchronous endpoint-কে appropriate execution context-এ চালাতে পারে, কিন্তু async endpoint-এর ভিতরে blocking operation ঢুকিয়ে দেওয়া উচিত নয়।

মূল কথা:

async def
→ Async-compatible I/O থাকলে useful

def
→ Blocking/synchronous logic-এর জন্য appropriate হতে পারে।`,
	},

	{
		id: "fastapi-17",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Async", "Blocking", "Performance"],
		question: "FastAPI async endpoint-এর মধ্যে কোন ধরনের code avoid করা উচিত?",
		answer: `Event loop block করে এমন synchronous operation avoid করা উচিত।

Bad example:

async def endpoint():
    time.sleep(5)

এটি event loop block করতে পারে।

আরেকটি example:

async def endpoint():
    requests.get("https://example.com")

requests synchronous HTTP client।

Better:

async def endpoint():
    await async_http_client.get(...)

অর্থাৎ async endpoint-এর ভিতরের I/O dependency-গুলোও asynchronous হওয়া উচিত, অথবা blocking কাজকে suitable worker thread/process-এ offload করতে হবে।`,
	},

	// ============================================================
	// MIDDLEWARE
	// ============================================================

	{
		id: "fastapi-18",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Middleware", "Request", "Response"],
		question: "FastAPI middleware কী?",
		answer: `Middleware হলো এমন layer যা request endpoint-এ যাওয়ার আগে এবং response ফেরত যাওয়ার সময় কাজ করতে পারে।

Flow:

Client
 ↓
Middleware
 ↓
Router
 ↓
Endpoint
 ↓
Middleware
 ↓
Response
 ↓
Client

Common use:

- Request logging
- Request ID
- Timing
- CORS
- Authentication-related processing
- Metrics
- Security headers

Example concept:

request
→ start timer
→ call next
→ calculate duration
→ response

Cross-cutting concern-এর জন্য middleware useful।`,
	},

	{
		id: "fastapi-19",
		category: "FastAPI",
		difficulty: "Advanced",
		tags: ["Middleware", "Dependency", "Architecture"],
		question: "Middleware এবং Dependency-এর মধ্যে পার্থক্য কী?",
		answer: `Middleware পুরো request/response pipeline-এর উপর কাজ করে।

Dependency নির্দিষ্ট route বা route group-এর জন্য reusable dependency injection mechanism।

Middleware:
→ Global/request pipeline

Dependency:
→ Route-specific reusable logic

Example:

Request ID
→ Middleware

Current authenticated user
→ Dependency

Database session
→ Dependency

Global CORS
→ Middleware

Role permission
→ Dependency

কোন concern কোথায় belong করে তা architecture অনুযায়ী decide করতে হবে।`,
	},

	// ============================================================
	// AUTHENTICATION / AUTHORIZATION
	// ============================================================

	{
		id: "fastapi-20",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Authentication", "Authorization", "Security"],
		question: "Authentication এবং Authorization-এর মধ্যে পার্থক্য কী?",
		answer: `Authentication হলো user কে তা verify করা।

Example:
"এই user কি সত্যিই Nazmul?"

Authorization হলো authenticated user কী করতে পারবে তা determine করা।

Example:
"Nazmul কি admin operation করতে পারবে?"

Flow:

Login
 ↓
Authentication
 ↓
Identity established
 ↓
Authorization
 ↓
Permission check
 ↓
Resource access

Authentication:
Who are you?

Authorization:
What are you allowed to do?`,
	},

	{
		id: "fastapi-21",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["JWT", "Authentication", "Token"],
		question: "JWT কী এবং FastAPI-তে কীভাবে ব্যবহার করা হয়?",
		answer: `JWT-এর পূর্ণরূপ JSON Web Token।

JWT সাধারণত stateless authentication-এর জন্য ব্যবহার করা হয়।

Concept:

User Login
 ↓
Server validates credentials
 ↓
JWT তৈরি
 ↓
Client token store করে
 ↓
পরবর্তী request-এ
Authorization: Bearer <token>
 ↓
Server token verify করে
 ↓
User identify করে

JWT-এর তিনটি অংশ:

Header
Payload
Signature

Payload-এ সাধারণত user identifier, expiry এবং প্রয়োজনীয় claims থাকতে পারে।

Password JWT payload-এ রাখা যাবে না।

JWT signed হতে হবে এবং secret/private key নিরাপদ রাখতে হবে।`,
	},

	{
		id: "fastapi-22",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["JWT", "Access Token", "Refresh Token", "Security"],
		question: "Access token এবং Refresh token কী?",
		answer: `Access token short-lived token হিসেবে API access করতে ব্যবহৃত হয়।

Refresh token দীর্ঘ সময়ের জন্য নতুন access token পাওয়ার কাজে ব্যবহৃত হয়।

Flow:

Login
 ↓
Access Token + Refresh Token
 ↓
Access Token দিয়ে API call
 ↓
Access Token expired
 ↓
Refresh Token
 ↓
New Access Token

Security-এর জন্য সাধারণত:

Access token
→ Short expiry

Refresh token
→ Longer expiry
→ Secure storage
→ Rotation/revocation strategy

Refresh token leak হলে account compromise হতে পারে, তাই এটি বেশি carefully manage করতে হয়।`,
	},

	{
		id: "fastapi-23",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["OAuth2", "Authentication", "Authorization"],
		question: "OAuth2 কী?",
		answer: `OAuth 2.0 হলো authorization framework যা একটি application-কে user-এর resource access করার অনুমতি দেওয়ার standard mechanism প্রদান করে।

Example:

User
 ↓
Client Application
 ↓
Authorization Server
 ↓
Authorization Grant
 ↓
Access Token
 ↓
Resource Server

FastAPI OAuth2-related security utilities provide করে।

গুরুত্বপূর্ণ:

OAuth2 এবং JWT একই জিনিস নয়।

OAuth2
→ Authorization framework

JWT
→ Token format

OAuth2 system JWT token ব্যবহার করতে পারে, কিন্তু OAuth2 token অবশ্যই JWT হতে হবে এমন নয়।`,
	},

	{
		id: "fastapi-24",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["RBAC", "Authorization", "Permissions"],
		question: "FastAPI-তে Role-Based Access Control কীভাবে implement করবেন?",
		answer: `RBAC-এর পূর্ণরূপ Role-Based Access Control।

User-এর role অনুযায়ী permission দেওয়া হয়।

Example:

Admin
→ Create
→ Read
→ Update
→ Delete

Manager
→ Create
→ Read
→ Update

Viewer
→ Read

FastAPI Dependency ব্যবহার করে permission check করা যায়।

Flow:

JWT
 ↓
Current User
 ↓
Role
 ↓
Permission Dependency
 ↓
Endpoint

Large system-এ শুধু role check না করে role → permissions mapping ব্যবহার করলে authorization আরও flexible হয়।`,
	},

	// ============================================================
	// CORS / SECURITY
	// ============================================================

	{
		id: "fastapi-25",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["CORS", "Security", "Browser"],
		question: "CORS কী? FastAPI-তে CORS কেন configure করতে হয়?",
		answer: `CORS-এর পূর্ণরূপ Cross-Origin Resource Sharing।

Browser security policy-এর কারণে একটি origin থেকে অন্য origin-এর API access controlled হতে পারে।

Example:

Frontend:
https://app.example.com

API:
https://api.example.com

Different origin হলে browser CORS rules apply করতে পারে।

FastAPI-তে CORSMiddleware ব্যবহার করা যায়।

Production-এ:

allow_origins=["*"]

blindly ব্যবহার করা উচিত নয়।

Trusted frontend origins explicitly configure করা বেশি নিরাপদ।`,
	},

	{
		id: "fastapi-26",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Security", "API Security", "OWASP"],
		question: "FastAPI API secure করার সময় কী কী বিষয় consider করবেন?",
		answer: `Important security areas:

1. Authentication
2. Authorization
3. Input validation
4. HTTPS
5. Secure password hashing
6. JWT security
7. Secret management
8. CORS configuration
9. Rate limiting
10. SQL injection prevention
11. Security headers
12. File upload validation
13. Request size limits
14. Dependency vulnerability scanning
15. Sensitive data logging avoid করা

Password কখনো plaintext রাখা যাবে না।

Database query parameterized বা ORM-based হওয়া উচিত।

Secrets source code-এ hardcode করা উচিত নয়।`,
	},

	// ============================================================
	// BACKGROUND TASKS
	// ============================================================

	{
		id: "fastapi-27",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["BackgroundTasks", "Async", "Task"],
		question: "FastAPI BackgroundTasks কী?",
		answer: `BackgroundTasks response return করার পরে ছোট background কাজ চালানোর জন্য ব্যবহার করা যায়।

Example use:

User registration
 ↓
Create user
 ↓
Response
 ↓
Send email

Email sending response-এর পরে করা যেতে পারে।

FastAPI BackgroundTasks small/simple in-process task-এর জন্য useful।

Examples:
- Email notification
- Small logging operation
- Simple file operation

কিন্তু long-running বা critical distributed job-এর জন্য এটি ideal নয়। সেখানে Celery, RabbitMQ, Kafka বা dedicated worker architecture ব্যবহার করা ভালো।`,
	},

	{
		id: "fastapi-28",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Celery", "Background Job", "Distributed Task"],
		question: "FastAPI BackgroundTasks এবং Celery-এর মধ্যে পার্থক্য কী?",
		answer: `FastAPI BackgroundTasks application process-এর lifecycle-এর সাথে closely related।

Celery distributed task queue architecture ব্যবহার করে।

BackgroundTasks:
→ Simple
→ Small tasks
→ In-process
→ No dedicated broker required

Celery:
→ Distributed worker
→ Retry
→ Scheduling
→ Broker
→ Long-running jobs
→ Multiple workers

Example:

FastAPI
 ↓
Celery
 ↓
RabbitMQ/Redis
 ↓
Worker
 ↓
Task

Critical email, report generation, image processing বা long-running task-এর ক্ষেত্রে dedicated worker বেশি reliable।`,
	},

	// ============================================================
	// DATABASE
	// ============================================================

	{
		id: "fastapi-29",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Database", "SQLAlchemy", "ORM"],
		question: "FastAPI-তে database কীভাবে integrate করবেন?",
		answer: `FastAPI নিজে ORM provide করে না।

Common choices:

SQLAlchemy
SQLModel
Tortoise ORM
অন্যান্য database libraries

Typical architecture:

FastAPI
 ↓
Service
 ↓
Repository
 ↓
SQLAlchemy
 ↓
Database

Database session dependency হিসেবে inject করা যায়।

Example concept:

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Route:

def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    ...

Large project-এ database logic endpoint-এর মধ্যে না রেখে service/repository layer-এ রাখা ভালো।`,
	},

	{
		id: "fastapi-30",
		category: "FastAPI",
		difficulty: "Advanced",
		tags: ["SQLAlchemy", "Session", "Transaction", "ORM"],
		question: "SQLAlchemy Session কী? কেন request-এর মধ্যে session manage করতে হয়?",
		answer: `SQLAlchemy Session database interaction-এর unit-of-work এবং identity management-এর মতো কাজ করে।

Session ব্যবহার করে:

- Query
- Insert
- Update
- Delete
- Transaction
- Commit
- Rollback

Request lifecycle-এর সাথে session lifecycle manage করা গুরুত্বপূর্ণ।

Typical flow:

Request
 ↓
Create Session
 ↓
Query/Update
 ↓
Commit
 ↓
Response
 ↓
Close Session

Exception হলে rollback প্রয়োজন হতে পারে।

Long-lived global session রাখা সাধারণত unsafe এবং connection/resource management সমস্যা তৈরি করতে পারে।`,
	},

	{
		id: "fastapi-31",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["SQLAlchemy", "AsyncSession", "Async Database"],
		question: "SQLAlchemy synchronous Session এবং AsyncSession-এর মধ্যে পার্থক্য কী?",
		answer: `Synchronous Session blocking database operation করতে পারে।

AsyncSession asynchronous database driver-এর সাথে async I/O support করতে পারে।

Async FastAPI endpoint-এ:

async def get_user(
    db: AsyncSession
):
    result = await db.execute(...)

এতে database I/O-এর সময় event loop অন্য কাজ করতে পারে।

কিন্তু async SQLAlchemy ব্যবহার করলেই সব query automatically faster হবে না।

Actual performance depends on:
- Database
- Query
- Index
- Connection pool
- Network latency
- Concurrency
- Workload`,
	},

	{
		id: "fastapi-32",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Alembic", "Database Migration", "SQLAlchemy"],
		question: "Alembic কী? FastAPI project-এ কেন ব্যবহার করবেন?",
		answer: `Alembic হলো SQLAlchemy ecosystem-এর database migration tool।

Database schema change version-controlled রাখার জন্য migration ব্যবহার করা হয়।

Example:

Initial:
users
    id
    name

Later:
users
    id
    name
    email

Migration:

001_create_users
002_add_email

Production deployment-এ database schema safely evolve করার জন্য migration অত্যন্ত গুরুত্বপূর্ণ।

Common workflow:

Model change
 ↓
Generate migration
 ↓
Review migration
 ↓
Run migration
 ↓
Database updated`,
	},

	// ============================================================
	// ERROR HANDLING
	// ============================================================

	{
		id: "fastapi-33",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Exception Handler", "HTTPException", "Error Handling"],
		question: "FastAPI-তে HTTPException কী?",
		answer: `HTTPException API client-কে HTTP error response দেওয়ার জন্য ব্যবহার করা হয়।

Example:

if user is None:
    raise HTTPException(
        status_code=404,
        detail="User not found"
    )

Common status codes:

400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
409 → Conflict
422 → Validation Error
500 → Internal Server Error

Business/application exception এবং HTTP layer আলাদা রাখলে architecture আরও clean হয়।`,
	},

	{
		id: "fastapi-34",
		category: "FastAPI",
		difficulty: "Advanced",
		tags: ["Exception Handler", "Global Error", "Middleware"],
		question: "Custom exception handler কীভাবে কাজ করে?",
		answer: `Global বা centralized error handling-এর জন্য custom exception handler ব্যবহার করা যায়।

Example concept:

@app.exception_handler(UserNotFoundException)
async def user_not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "message": "User not found"
        }
    )

Benefits:

- Consistent error response
- Centralized logging
- Cleaner endpoints
- Domain exception mapping

Example:

Domain exception
      ↓
Exception handler
      ↓
HTTP response

এটি large application-এ খুব useful।`,
	},

	// ============================================================
	// API DESIGN
	// ============================================================

	{
		id: "fastapi-35",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["API Versioning", "REST", "API Design"],
		question: "FastAPI API versioning কীভাবে করবেন?",
		answer: `API versioning-এর জন্য common approaches:

1. URL versioning

/api/v1/users
/api/v2/users

2. Header versioning

Accept: application/vnd.example.v2+json

3. Query parameter

/users?version=2

Practical এবং সহজ approach হিসেবে URL versioning অনেক project-এ ব্যবহার করা হয়।

FastAPI:

/api/v1
    ↓
users
orders

/api/v2
    ↓
users
orders

Versioning-এর লক্ষ্য হলো existing clients না ভেঙে API evolve করা।`,
	},

	{
		id: "fastapi-36",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["REST", "HTTP", "API Design"],
		question: "FastAPI REST API design করার সময় কোন HTTP status codes জানা গুরুত্বপূর্ণ?",
		answer: `Common status codes:

200 OK
→ Successful GET/update

201 Created
→ Resource successfully created

202 Accepted
→ Async/background processing accepted

204 No Content
→ Successful operation without response body

400 Bad Request
→ Invalid request

401 Unauthorized
→ Authentication required/failed

403 Forbidden
→ Authenticated but not allowed

404 Not Found
→ Resource not found

409 Conflict
→ Resource state conflict

422 Unprocessable Entity
→ Validation-related request error

429 Too Many Requests
→ Rate limit exceeded

500 Internal Server Error
→ Unexpected server error

502/503
→ Upstream/service availability problems`,
	},

	{
		id: "fastapi-37",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Pagination", "Filtering", "Sorting", "API Design"],
		question: "FastAPI API-তে pagination, filtering এবং sorting কীভাবে design করবেন?",
		answer: `Large dataset কখনো একবারে return করা উচিত নয়।

Example:

GET /products?page=1&limit=20
GET /products?category=electronics
GET /products?sort=-created_at

Common pagination:

page
limit

অথবা:

offset
limit

Very large distributed dataset-এর ক্ষেত্রে cursor-based pagination বেশি scalable হতে পারে।

Example:

GET /products?cursor=abc123&limit=20

API design-এ:
- Maximum limit enforce করা
- Stable sorting রাখা
- Database index ব্যবহার করা
- Total count প্রয়োজন হলে carefully calculate করা

গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// API DOCUMENTATION
	// ============================================================

	{
		id: "fastapi-38",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["OpenAPI", "Swagger", "Documentation"],
		question: "FastAPI কীভাবে automatic API documentation তৈরি করে?",
		answer: `FastAPI Python type hints এবং Pydantic schema ব্যবহার করে OpenAPI specification generate করে।

তারপর OpenAPI specification থেকে interactive documentation তৈরি হয়।

Common endpoints:

/docs
→ Swagger UI

/redoc
→ ReDoc

Flow:

Python Type Hints
      ↓
Pydantic Schema
      ↓
OpenAPI
      ↓
Swagger/ReDoc

এর ফলে frontend developer এবং API consumer সহজে API structure দেখতে পারে এবং test করতে পারে।`,
	},

	// ============================================================
	// TESTING
	// ============================================================

	{
		id: "fastapi-39",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Testing", "Pytest", "TestClient"],
		question: "FastAPI API কীভাবে test করবেন?",
		answer: `FastAPI API testing-এর জন্য pytest এবং FastAPI/Starlette testing tools ব্যবহার করা যায়।

Test করা যায়:

1. Unit test
2. API test
3. Integration test
4. Authentication test
5. Database test

Example concept:

def test_get_users(client):
    response = client.get("/users")

    assert response.status_code == 200

API test-এ:
Request
 ↓
FastAPI
 ↓
Dependency
 ↓
Service
 ↓
Database/Test DB
 ↓
Response

External dependency mock করা যেতে পারে।`,
	},

	{
		id: "fastapi-40",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Dependency Override", "Testing", "Mocking"],
		question: "FastAPI dependency override কী?",
		answer: `Testing-এর সময় production dependency-এর পরিবর্তে test dependency ব্যবহার করতে dependency override করা যায়।

Example:

Production:

get_db()
→ Real Database

Testing:

get_db()
→ Test Database

অথবা:

get_current_user()
→ Fake Test User

এটি খুব useful কারণ API test-এর সময় external database, authentication বা external service isolate করা যায়।

Concept:

Production Dependency
        ↓
Override
        ↓
Test Dependency`,
	},

	{
		id: "fastapi-41",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Async Testing", "Pytest", "AnyIO"],
		question: "FastAPI asynchronous endpoint কীভাবে test করবেন?",
		answer: `Async endpoint test করার সময় asynchronous test support প্রয়োজন হতে পারে।

Concept:

async test
    ↓
async HTTP client
    ↓
FastAPI application
    ↓
await response

Testing stack project অনুযায়ী pytest এবং async testing utilities ব্যবহার করতে পারে।

গুরুত্বপূর্ণ বিষয়:

Async endpoint test করলেই test automatically production-এর সব concurrency behavior prove করে না।

Load testing এবং concurrency testing আলাদা concern।`,
	},

	// ============================================================
	// LIFESPAN
	// ============================================================

	{
		id: "fastapi-42",
		category: "FastAPI",
		difficulty: "Advanced",
		tags: ["Lifespan", "Startup", "Shutdown", "Resources"],
		question: "FastAPI lifespan কী?",
		answer: `Application startup এবং shutdown-এর সময় resource initialize এবং cleanup করার জন্য lifespan mechanism ব্যবহার করা যায়।

Example resources:

- Database pool
- Redis connection
- ML model
- HTTP client
- Message broker connection

Flow:

Application Start
 ↓
Initialize resources
 ↓
Serve requests
 ↓
Application Shutdown
 ↓
Cleanup resources

Production application-এ global resource lifecycle properly manage করার জন্য lifespan গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// CACHING / REDIS
	// ============================================================

	{
		id: "fastapi-43",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Redis", "Caching", "Performance"],
		question: "FastAPI application-এ Redis cache কীভাবে ব্যবহার করবেন?",
		answer: `Frequently requested data cache করতে Redis ব্যবহার করা যায়।

Flow:

Client
 ↓
FastAPI
 ↓
Check Redis
 ├── Cache Hit → Return
 └── Cache Miss
       ↓
    Database
       ↓
    Redis
       ↓
    Response

Common use:
- User profile
- Product data
- Configuration
- Session
- Rate limiting
- Temporary data

Cache strategy:

Cache-aside:

Read
 ↓
Redis
 ↓
Miss
 ↓
DB
 ↓
Redis SET
 ↓
Return

Cache invalidation এবং TTL properly design করা অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// RATE LIMITING
	// ============================================================

	{
		id: "fastapi-44",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Rate Limiting", "Redis", "Security", "API"],
		question: "FastAPI API-তে rate limiting কেন এবং কীভাবে implement করবেন?",
		answer: `Rate limiting একটি client কত request নির্দিষ্ট সময়ে করতে পারবে তা control করে।

Purpose:

- Abuse prevention
- DDoS mitigation-এর একটি layer
- Brute-force protection
- Resource protection
- Fair usage

Example:

100 requests / minute / user

Distributed FastAPI deployment-এ Redis-backed rate limiter ব্যবহার করা যায়।

Flow:

Client
 ↓
API Gateway / Rate Limiter
 ↓
Redis
 ↓
Allowed?
 ├── Yes → FastAPI
 └── No → 429

Rate limiting সাধারণত application-এর পাশাপাশি API Gateway বা reverse proxy layer-এও implement করা যায়।`,
	},

	// ============================================================
	// FILE UPLOAD
	// ============================================================

	{
		id: "fastapi-45",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["File Upload", "UploadFile", "Security"],
		question: "FastAPI-তে file upload কীভাবে handle করবেন?",
		answer: `FastAPI-তে file upload-এর জন্য UploadFile ব্যবহার করা যায়।

File upload-এর সময় consider করতে হবে:

1. File size limit
2. MIME type
3. File extension
4. Content validation
5. Filename security
6. Storage location
7. Virus scanning
8. Authentication
9. Authorization

Large file-এর ক্ষেত্রে application server-এর memory-তে পুরো file load না করে streaming/object storage architecture ব্যবহার করা ভালো।

Example architecture:

Client
 ↓
FastAPI
 ↓
Object Storage
 ↓
S3-compatible storage

Production-এ uploaded file-এর original filename blindly trust করা উচিত নয়।`,
	},

	// ============================================================
	// PERFORMANCE
	// ============================================================

	{
		id: "fastapi-46",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Performance", "Concurrency", "Load Testing"],
		question: "FastAPI application-এর performance কীভাবে improve করবেন?",
		answer: `Performance optimization-এর আগে bottleneck measure করতে হবে।

Important areas:

1. Async I/O
2. Database query optimization
3. Proper indexes
4. Connection pooling
5. Redis caching
6. Pagination
7. Response size reduction
8. Compression
9. Efficient serialization
10. Background workers
11. Horizontal scaling
12. Load testing

Example:

Slow API
 ↓
Profile
 ↓
Database query found slow
 ↓
Add index / optimize query
 ↓
Measure again

শুধু বেশি Uvicorn worker চালালেই application automatically fast হবে না। Bottleneck identify করা সবচেয়ে গুরুত্বপূর্ণ।`,
	},

	{
		id: "fastapi-47",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Uvicorn", "Workers", "Scaling", "Deployment"],
		question: "Uvicorn workers কী? Multiple workers কেন ব্যবহার করবেন?",
		answer: `একাধিক worker process চালালে application multiple process-এর মাধ্যমে request handle করতে পারে।

Concept:

Load Balancer
      ↓
Worker 1
Worker 2
Worker 3
Worker 4

প্রতিটি worker আলাদা process এবং নিজস্ব memory space রাখে।

Benefits:
- Multiple CPU cores ব্যবহার
- Process-level isolation
- Higher throughput under suitable workloads

কিন্তু worker সংখ্যা unlimited বাড়ানো উচিত নয়।

প্রতিটি worker:
- Memory consume করে
- Database connection pool consume করতে পারে

তাই CPU, RAM এবং database capacity অনুযায়ী worker সংখ্যা নির্ধারণ করতে হবে।`,
	},

	// ============================================================
	// DEPLOYMENT
	// ============================================================

	{
		id: "fastapi-48",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Docker", "Nginx", "Deployment", "Production"],
		question: "FastAPI production deployment architecture কেমন হতে পারে?",
		answer: `একটি common production architecture:

Internet
   ↓
DNS
   ↓
Load Balancer / Nginx
   ↓
FastAPI
   ↓
Uvicorn Workers
   ↓
Service Layer
   ↓
Database

Additional components:

Redis
→ Cache

RabbitMQ/Kafka
→ Async messaging

Object Storage
→ Files

Monitoring
→ Metrics/Logs/Tracing

Docker containerization ব্যবহার করে service package করা যায়।

Production deployment-এ:
- HTTPS
- Environment configuration
- Secrets
- Health checks
- Logging
- Metrics
- Graceful shutdown
- Database migration

consider করা উচিত।`,
	},

	// ============================================================
	// HEALTH CHECK
	// ============================================================

	{
		id: "fastapi-49",
		category: "FastAPI",
		difficulty: "Intermediate",
		tags: ["Health Check", "Readiness", "Liveness", "Kubernetes"],
		question: "Liveness এবং Readiness health check-এর মধ্যে পার্থক্য কী?",
		answer: `Liveness check বলে application process বেঁচে আছে কিনা।

Readiness check বলে application বর্তমানে traffic গ্রহণের জন্য ready কিনা।

Liveness:
"Process alive?"

Readiness:
"Can this instance serve requests?"

Kubernetes environment-এ দুটো আলাদা purpose serve করে।

Example:

/health/live
→ Process alive

/health/ready
→ DB/config/dependencies অনুযায়ী service ready

Readiness check-এ external dependency check করতে হবে কিনা carefully decide করতে হবে, কারণ অতিরিক্ত dependency coupling unhealthy state তৈরি করতে পারে।`,
	},

	// ============================================================
	// OBSERVABILITY
	// ============================================================

	{
		id: "fastapi-50",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Logging", "Metrics", "Tracing", "Observability"],
		question: "FastAPI application-এ observability কীভাবে implement করবেন?",
		answer: `Observability-এর তিনটি প্রধান pillar:

1. Logs
2. Metrics
3. Traces

Logs:
→ কী ঘটেছে?

Metrics:
→ কতবার/কত দ্রুত/কত resource ব্যবহার হয়েছে?

Tracing:
→ একটি request কোন কোন service-এর মধ্য দিয়ে গেছে?

Example:

Client
 ↓
API Gateway
 ↓
FastAPI
 ↓
Service A
 ↓
Database

Distributed tracing থাকলে একই request-এর trace ID ব্যবহার করে পুরো flow দেখা যায়।

Important metrics:
- Request count
- Error rate
- Latency
- CPU
- Memory
- DB latency
- Queue depth

Production microservice environment-এ observability অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// DATABASE N+1
	// ============================================================

	{
		id: "fastapi-51",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["SQLAlchemy", "N+1", "Database", "Performance"],
		question: "N+1 query problem কী? FastAPI/SQLAlchemy-তে কীভাবে avoid করবেন?",
		answer: `N+1 problem হলো একটি list fetch করার পরে প্রতিটি item-এর related data আলাদাভাবে query করা।

Example:

1 query:
→ Get 100 users

তারপর:

100 queries:
→ Get each user's orders

Total:
101 queries

এটি performance severely degrade করতে পারে।

Solutions:
- Eager loading
- selectinload
- joinedload
- Proper SQL join
- Query optimization

API response design-এর সময় relationship data প্রয়োজন অনুযায়ী fetch করা উচিত। সব relationship automatically load করলে আবার unnecessary data/query তৈরি হতে পারে।`,
	},

	// ============================================================
	// TRANSACTION / CONSISTENCY
	// ============================================================

	{
		id: "fastapi-52",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Transaction", "Database", "Consistency"],
		question: "FastAPI service-এ database transaction কীভাবে manage করবেন?",
		answer: `Transaction-এর মূল লক্ষ্য হলো multiple database operation-কে একটি consistent unit হিসেবে manage করা।

Example:

Create Order
+
Create Order Items
+
Update Inventory

সব সফল হলে:

COMMIT

কোনো operation fail হলে:

ROLLBACK

Architecture:

API
 ↓
Service
 ↓
Transaction Boundary
 ├── Order
 ├── Order Items
 └── Inventory

Transaction boundary service/business operation-এর সাথে align করা ভালো।

Distributed microservice environment-এ একই database transaction সব service-এর উপর apply করা যায় না। সেখানে Saga/Outbox-এর মতো pattern প্রয়োজন হতে পারে।`,
	},

	// ============================================================
	// IDEMPOTENCY
	// ============================================================

	{
		id: "fastapi-53",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Idempotency", "Payment", "Distributed Systems"],
		question: "FastAPI API-তে idempotency কী এবং কেন গুরুত্বপূর্ণ?",
		answer: `একই request একাধিকবার পাঠালেও যেন duplicate business effect তৈরি না হয়, তাকে idempotency বলা হয়।

Payment example:

Client
 ↓
POST /payments
Idempotency-Key: abc123

Network timeout হলো।

Client আবার একই request পাঠালো।

Server যদি একই idempotency key recognize করে তাহলে duplicate payment না করে আগের result return করতে পারে।

Common implementation:

Idempotency-Key
 ↓
Redis/Database
 ↓
Check existing request
 ↓
Already processed?
 ├── Yes → Return previous result
 └── No → Process + Store result

Payment, order এবং distributed retry scenario-তে এটি অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// API GATEWAY / MICROSERVICE
	// ============================================================

	{
		id: "fastapi-54",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Microservices", "API Gateway", "Architecture"],
		question: "FastAPI microservice architecture-এ API Gateway-এর role কী?",
		answer: `API Gateway client এবং internal services-এর মধ্যে entry point হিসেবে কাজ করতে পারে।

Architecture:

Client
   ↓
API Gateway
   ↓
├── User Service
├── Order Service
├── Payment Service
└── Product Service

Gateway-এর কাজ হতে পারে:

- Routing
- Authentication
- Rate limiting
- TLS termination
- Request logging
- Request ID
- Load balancing
- API version routing

তবে Gateway-এ business logic অতিরিক্ত ঢুকানো উচিত নয়। Business logic service-এর মধ্যে থাকা উচিত।`,
	},

	// ============================================================
	// GRACEFUL SHUTDOWN
	// ============================================================

	{
		id: "fastapi-55",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Graceful Shutdown", "Deployment", "Reliability"],
		question: "FastAPI graceful shutdown কী এবং কেন গুরুত্বপূর্ণ?",
		answer: `Application shutdown-এর সময় active request, database connection, message consumer এবং অন্যান্য resource safely close করাকে graceful shutdown বলা হয়।

Bad shutdown:

Process killed
 ↓
Active request terminated
 ↓
Connection/resource leak

Graceful shutdown:

Shutdown signal
 ↓
Stop accepting new work
 ↓
Finish active work
 ↓
Close connections
 ↓
Exit

Docker/Kubernetes deployment-এ graceful shutdown বিশেষভাবে গুরুত্বপূর্ণ।

বিশেষ করে:
- DB pool
- Redis
- Kafka consumer
- RabbitMQ consumer
- HTTP client

properly close করতে হয়।`,
	},

	// ============================================================
	// SENIOR ARCHITECTURE
	// ============================================================

	{
		id: "fastapi-56",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Architecture", "Layered Architecture", "Clean Architecture"],
		question: "Large FastAPI project-এর recommended architecture কী?",
		answer: `Large FastAPI application-এ feature/module এবং responsibility অনুযায়ী code organize করা যায়।

Example:

app/
├── main.py
├── core/
│   ├── config.py
│   ├── security.py
│   └── logging.py
│
├── api/
│   ├── dependencies.py
│   └── v1/
│       ├── users.py
│       ├── orders.py
│       └── products.py
│
├── schemas/
├── models/
├── services/
├── repositories/
├── integrations/
├── workers/
└── tests/

Flow:

Controller/API
      ↓
Service
      ↓
Repository
      ↓
Database

External integration:

Service
 ↓
Integration Client
 ↓
Payment / Email / External API

এতে framework-specific code এবং business logic আলাদা রাখা যায়।`,
	},

	{
		id: "fastapi-57",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Service Layer", "Repository", "Architecture"],
		question: "FastAPI endpoint-এর মধ্যে business logic রাখা উচিত কি?",
		answer: `Large application-এ endpoint-এর মধ্যে complex business logic রাখা উচিত নয়।

Bad:

@app.post("/orders")
def create_order(order):
    # validation
    # pricing
    # inventory
    # payment
    # database
    # notification
    # সব এখানে

Better:

API
 ↓
OrderService
 ↓
PricingService
 ↓
InventoryService
 ↓
Repository
 ↓
Database

Endpoint-এর responsibility:

- Request গ্রহণ
- Dependency resolve
- Service call
- Response return

Business logic service/domain layer-এ থাকা উচিত।

এতে unit testing এবং future framework change সহজ হয়।`,
	},

	{
		id: "fastapi-58",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["External API", "Timeout", "Retry", "Resilience"],
		question: "FastAPI service থেকে external API call করার সময় কী কী consider করবেন?",
		answer: `External service কখনো fully reliable ধরে নেওয়া উচিত নয়।

Consider করতে হবে:

1. Connection timeout
2. Read timeout
3. Retry
4. Retry limit
5. Exponential backoff
6. Circuit breaker
7. Idempotency
8. Error mapping
9. Logging
10. Metrics
11. Trace propagation

Example:

FastAPI
 ↓
Payment API
 ↓
Timeout
 ↓
Retry
 ↓
Still failed
 ↓
Fallback / Error

সব error retry করা উচিত নয়।

যেমন:
400 Bad Request
→ সাধারণত retry করা উচিত নয়।

Temporary network failure বা 503
→ retry করা যেতে পারে, policy অনুযায়ী।`,
	},

	{
		id: "fastapi-59",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Scalability", "Horizontal Scaling", "Stateless"],
		question: "FastAPI application কীভাবে horizontally scale করবেন?",
		answer: `Horizontal scaling মানে আরও application instances যোগ করা।

Architecture:

Load Balancer
       ↓
 ┌─────┼─────┐
 ↓     ↓     ↓
API-1 API-2 API-3

Stateless application হলে scaling সহজ হয়।

Session state server memory-তে না রেখে:
- Database
- Redis
- External storage

এ রাখা যায়।

Scaling-এর সময় consider করতে হবে:

- Database connection limits
- Redis capacity
- Queue capacity
- Load balancer
- CPU
- Memory
- External API limits

শুধু FastAPI instance বাড়ালেই system infinitely scale করবে না। Database অনেক সময় bottleneck হয়।`,
	},

	{
		id: "fastapi-60",
		category: "FastAPI",
		difficulty: "Senior",
		tags: ["Production", "Architecture", "Security", "Performance", "Observability"],
		question:
			"একজন Senior FastAPI Developer হিসেবে production API design করার সময় কী কী বিষয় consider করবেন?",
		answer: `Senior level-এ শুধু endpoint তৈরি করা যথেষ্ট নয়।

আমি পুরো system lifecycle consider করব।

1. API Design
   → REST conventions
   → Versioning
   → Pagination
   → Filtering
   → Consistent response

2. Validation
   → Pydantic
   → Input validation
   → Response model

3. Architecture
   → Router
   → Service
   → Repository
   → Domain logic

4. Database
   → Connection pooling
   → Transaction
   → Index
   → N+1 prevention

5. Async
   → Non-blocking I/O
   → Async DB
   → Async HTTP client

6. Security
   → Authentication
   → Authorization
   → JWT/OAuth2
   → CORS
   → Rate limiting
   → Secret management

7. Reliability
   → Timeout
   → Retry
   → Idempotency
   → Circuit breaker
   → Graceful shutdown

8. Background processing
   → Worker
   → Queue
   → Retry

9. Performance
   → Cache
   → Query optimization
   → Load testing
   → Horizontal scaling

10. Observability
    → Structured logs
    → Metrics
    → Distributed tracing

11. Testing
    → Unit
    → Integration
    → API
    → Async testing

12. Deployment
    → Docker
    → Uvicorn workers
    → Reverse proxy
    → Health checks
    → CI/CD

Final architecture:

Client
   ↓
API Gateway / Load Balancer
   ↓
FastAPI
   ↓
Router
   ↓
Dependency
   ↓
Service / Domain
   ↓
Repository
   ↓
Database

Parallel infrastructure:

FastAPI
 ├── Redis
 ├── RabbitMQ/Kafka
 ├── External APIs
 ├── Object Storage
 └── Observability

এটাই একটি production-grade FastAPI service-এর overall mental model।`,
	},
];
