const fastApi = [
  {
    "id": "fastapi-1",
    "category": "FastAPI",
    "difficulty": "Beginner",
    "tags": [
      "FastAPI",
      "Framework",
      "REST API"
    ],
    "question": "FastAPI কী? কেন FastAPI ব্যবহার করা হয়?",
    "answer": "\n      <p>FastAPI হলো Python-এর একটি modern web framework, যা মূলত API এবং backend application তৈরির জন্য ব্যবহৃত হয়।</p>\n      <h4>FastAPI-এর প্রধান বৈশিষ্ট্য:</h4>\n      <ol>\n        <li>ASGI-based</li>\n        <li>Async/await support</li>\n        <li>Automatic request validation</li>\n        <li>Automatic response serialization</li>\n        <li>OpenAPI documentation</li>\n        <li>Swagger UI</li>\n        <li>ReDoc</li>\n        <li>Python type hints</li>\n        <li>Dependency Injection</li>\n        <li>High performance</li>\n        <li>Pydantic-based validation</li>\n        <li>WebSocket support</li>\n      </ol>\n      <p>FastAPI-এর architecture মূলত Starlette এবং Pydantic-এর উপর নির্ভর করে।</p>\n      <h4>High-level flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n   ↓\nFastAPI\n   ↓\nStarlette\n   ↓\nASGI Server\n   ↓\nApplication</code></pre>\n      </div>\n      <p><strong>FastAPI বিশেষভাবে useful:</strong></p>\n      <ul>\n        <li>REST API</li>\n        <li>Microservices</li>\n        <li>Async applications</li>\n        <li>High-concurrency API</li>\n        <li>Internal services</li>\n        <li>AI/ML backend</li>\n        <li>Modern Python backend</li>\n      </ul>\n      <p>FastAPI-এর বড় advantage হলো Python type hints ব্যবহার করে validation, serialization এবং API documentation-এর অনেক কাজ automatically করা।</p>\n    "
  },
  {
    "id": "fastapi-2",
    "category": "FastAPI",
    "difficulty": "Beginner",
    "tags": [
      "FastAPI",
      "ASGI",
      "WSGI",
      "Architecture"
    ],
    "question": "FastAPI কীভাবে Django বা Flask থেকে আলাদা?",
    "answer": "\n      <p>FastAPI মূলত API-first এবং ASGI-based framework।</p>\n      <p>Flask historically WSGI-based এবং lightweight web framework।</p>\n      <p>Django একটি batteries-included framework যেখানে ORM, admin, authentication, middleware এবং অনেক built-in feature থাকে।</p>\n      <p><strong>FastAPI:</strong></p>\n      <ul>\n        <li>API-focused</li>\n        <li>ASGI</li>\n        <li>Async-first</li>\n        <li>Pydantic validation</li>\n        <li>Automatic OpenAPI docs</li>\n      </ul>\n      <p><strong>Django:</strong></p>\n      <ul>\n        <li>Full web framework</li>\n        <li>Built-in ORM</li>\n        <li>Admin</li>\n        <li>Authentication</li>\n        <li>Templates</li>\n        <li>DRF ব্যবহার করে API তৈরি করা যায়</li>\n      </ul>\n      <p><strong>Flask:</strong></p>\n      <ul>\n        <li>Lightweight</li>\n        <li>Flexible</li>\n        <li>অনেক component নিজে integrate করতে হয়</li>\n      </ul>\n      <p>FastAPI-এর শক্তি হলো modern API development এবং asynchronous I/O।</p>\n    "
  },
  {
    "id": "fastapi-3",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "ASGI",
      "WSGI",
      "Web Server"
    ],
    "question": "ASGI কী? FastAPI কেন ASGI ব্যবহার করে?",
    "answer": "\n      <p>ASGI-এর পূর্ণরূপ Asynchronous Server Gateway Interface।</p>\n      <p>এটি Python web application এবং server-এর মধ্যে একটি standard interface।</p>\n      <p>পুরনো WSGI মূলত synchronous request/response model-এর জন্য তৈরি।</p>\n      <p><strong>ASGI:</strong></p>\n      <ul>\n        <li>Async support করে</li>\n        <li>WebSocket support করে</li>\n        <li>Long-lived connection support করে</li>\n        <li>Concurrent I/O handling-এর জন্য ভালো</li>\n      </ul>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n   ↓\nUvicorn\n   ↓\nASGI\n   ↓\nFastAPI\n   ↓\nApplication</code></pre>\n      </div>\n      <p>FastAPI async endpoint-এর সুবিধা নিতে ASGI ব্যবহার করে।</p>\n      <p>বিশেষ করে high-concurrency I/O-bound application-এ ASGI গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-4",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Uvicorn",
      "ASGI Server",
      "Deployment"
    ],
    "question": "Uvicorn কী?",
    "answer": "\n      <p>Uvicorn হলো একটি high-performance ASGI server।</p>\n      <p>FastAPI নিজে HTTP server নয়। FastAPI application run করার জন্য Uvicorn-এর মতো ASGI server ব্যবহার করা হয়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser / Client\n        ↓\nUvicorn\n        ↓\nASGI\n        ↓\nFastAPI\n        ↓\nEndpoint</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>uvicorn main:app --reload</code></pre>\n      </div>\n      <h4>এখানে:</h4>\n      <p>main<br>→ Python module</p>\n      <p>app<br>→ FastAPI application object</p>\n      <p>--reload<br>→ Development-এর সময় code পরিবর্তন হলে server reload করে।</p>\n      <p>Production-এ সাধারণত reload ব্যবহার করা উচিত নয়।</p>\n    "
  },
  {
    "id": "fastapi-5",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Starlette",
      "Pydantic",
      "Architecture"
    ],
    "question": "FastAPI internally কোন technologies-এর উপর তৈরি?",
    "answer": "\n      <h4>FastAPI-এর architecture বোঝার জন্য দুটি গুরুত্বপূর্ণ component হলো:</h4>\n      <ol>\n        <li>Starlette</li>\n        <li>Pydantic</li>\n      </ol>\n      <p><strong>Starlette:</strong></p>\n      <ul>\n        <li>ASGI web functionality</li>\n        <li>Routing</li>\n        <li>Middleware</li>\n        <li>Request/Response</li>\n        <li>WebSocket</li>\n        <li>Background task infrastructure</li>\n      </ul>\n      <p><strong>Pydantic:</strong></p>\n      <ul>\n        <li>Data validation</li>\n        <li>Parsing</li>\n        <li>Serialization</li>\n        <li>Schema generation</li>\n      </ul>\n      <p><strong>FastAPI:</strong></p>\n      <ul>\n        <li>এই components-এর উপর developer-friendly API layer তৈরি করে।</li>\n      </ul>\n      <h4>Simplified:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>FastAPI\n├── Starlette\n│   ├── Routing\n│   ├── Middleware\n│   ├── Request\n│   └── Response\n│\n└── Pydantic\n    ├── Validation\n    ├── Parsing\n    └── Serialization</code></pre>\n      </div>\n    "
  },
  {
    "id": "fastapi-6",
    "category": "FastAPI",
    "difficulty": "Beginner",
    "tags": [
      "Routing",
      "APIRouter",
      "Endpoint"
    ],
    "question": "FastAPI routing কীভাবে কাজ করে?",
    "answer": "\n      <p>FastAPI-তে route একটি URL এবং HTTP method-এর সাথে একটি Python function connect করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.get(\"/users\")\ndef get_users():\n    return []</code></pre>\n      </div>\n      <h4>এখানে:</h4>\n      <p>GET /users<br>→ get_users()</p>\n      <h4>Common HTTP methods:</h4>\n      <p>GET<br>POST<br>PUT<br>PATCH<br>DELETE</p>\n      <p>Large application-এ সব route main.py-তে না রেখে APIRouter ব্যবহার করা ভালো।</p>\n      <h4>Example structure:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n    main.py\n    routers/\n        users.py\n        products.py\n        orders.py</code></pre>\n      </div>\n      <p>এতে feature-based modular architecture তৈরি হয়।</p>\n    "
  },
  {
    "id": "fastapi-7",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "APIRouter",
      "Modular Architecture"
    ],
    "question": "APIRouter কী এবং কেন ব্যবহার করবেন?",
    "answer": "\n      <p>APIRouter FastAPI application-এর routes modularize করতে ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>router = APIRouter(\n    prefix=\"/users\",\n    tags=[\"Users\"]\n)</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@router.get(\"/\")\ndef get_users():\n    return []</code></pre>\n      </div>\n      <h4>তারপর main application-এ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.include_router(router)</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Feature-based organization</li>\n        <li>Large application maintainability</li>\n        <li>Prefix management</li>\n        <li>Tags</li>\n        <li>Dependency management</li>\n        <li>Versioned API structure</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>/api/v1/users\n/api/v1/orders\n/api/v1/products</code></pre>\n      </div>\n      <p>এভাবে API organize করা যায়।</p>\n    "
  },
  {
    "id": "fastapi-8",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Path Parameter",
      "Query Parameter",
      "Request"
    ],
    "question": "Path parameter এবং Query parameter-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Path parameter resource identify করতে ব্যবহৃত হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /users/100</code></pre>\n      </div>\n      <p>এখানে 100 হলো path parameter।</p>\n      <h4>FastAPI:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.get(\"/users/{user_id}\")\ndef get_user(user_id: int):\n    ...</code></pre>\n      </div>\n      <p>Query parameter সাধারণত filtering, sorting, pagination ইত্যাদির জন্য ব্যবহার হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /users?page=1&amp;limit=20</code></pre>\n      </div>\n      <h4>FastAPI:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.get(\"/users\")\ndef get_users(\n    page: int = 1,\n    limit: int = 20\n):\n    ...</code></pre>\n      </div>\n      <h4>Rule:</h4>\n      <p>Path parameter<br>→ Resource identity</p>\n      <p>Query parameter<br>→ Filtering / sorting / pagination / optional criteria</p>\n    "
  },
  {
    "id": "fastapi-9",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Request Body",
      "Pydantic",
      "Validation"
    ],
    "question": "FastAPI request body validation কীভাবে কাজ করে?",
    "answer": "\n      <p>FastAPI request body validation-এর জন্য Pydantic model ব্যবহার করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class UserCreate(BaseModel):\n    name: str\n    email: EmailStr\n    age: int</code></pre>\n      </div>\n      <h4>Endpoint:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.post(\"/users\")\ndef create_user(user: UserCreate):\n    return user</code></pre>\n      </div>\n      <p>Client invalid data পাঠালে FastAPI automatically validation error response তৈরি করে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JSON Request\n    ↓\nPydantic\n    ↓\nValidation\n    ↓\nValid?\n ┌──┴──┐\nYes   No\n ↓     ↓\nAPI   422 Error</code></pre>\n      </div>\n      <p>এতে manual validation code অনেক কমে যায়।</p>\n    "
  },
  {
    "id": "fastapi-10",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Pydantic",
      "Validation",
      "Schema"
    ],
    "question": "Pydantic কী এবং FastAPI-তে কেন এত গুরুত্বপূর্ণ?",
    "answer": "\n      <p>Pydantic হলো Python data validation এবং parsing library।</p>\n      <h4>FastAPI Pydantic ব্যবহার করে:</h4>\n      <ol>\n        <li>Request validation</li>\n        <li>Response validation</li>\n        <li>Serialization</li>\n        <li>Schema generation</li>\n        <li>OpenAPI documentation</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Product(BaseModel):\n    name: str\n    price: float\n    quantity: int</code></pre>\n      </div>\n      <h4>যদি client পাঠায়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n    \"name\": \"Laptop\",\n    \"price\": \"1000\",\n    \"quantity\": \"5\"\n}</code></pre>\n      </div>\n      <p>Pydantic configured rules অনুযায়ী data parse/validate করতে পারে।</p>\n      <p>FastAPI-এর type-hint-driven development-এর মূল অংশ Pydantic।</p>\n    "
  },
  {
    "id": "fastapi-11",
    "category": "FastAPI",
    "difficulty": "Advanced",
    "tags": [
      "Pydantic",
      "Field",
      "Validation"
    ],
    "question": "Pydantic Field এবং custom validation কীভাবে করবেন?",
    "answer": "\n      <p>Field ব্যবহার করে field-এর constraints এবং metadata define করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Product(BaseModel):\n    name: str = Field(min_length=3)\n    price: float = Field(gt=0)\n    quantity: int = Field(ge=1)</code></pre>\n      </div>\n      <h4>এতে:</h4>\n      <p>name<br>→ minimum 3 characters</p>\n      <p>price<br>→ greater than 0</p>\n      <p>quantity<br>→ minimum 1</p>\n      <p>Complex business validation-এর জন্য model-level বা field-level validators ব্যবহার করা যায়।</p>\n      <p>তবে database-level constraint-এর প্রয়োজন থাকলে শুধু Pydantic validation-এর উপর নির্ভর করা উচিত নয়।</p>\n    "
  },
  {
    "id": "fastapi-12",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Response Model",
      "Serialization",
      "Pydantic"
    ],
    "question": "response_model কী? কেন ব্যবহার করা উচিত?",
    "answer": "\n      <p>response_model API response-এর structure এবং exposed fields define করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class UserResponse(BaseModel):\n    id: int\n    name: str</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.get(\n    \"/users/{id}\",\n    response_model=UserResponse\n)\ndef get_user(id: int):\n    ...</code></pre>\n      </div>\n      <h4>এতে:</h4>\n      <ol>\n        <li>Response validation</li>\n        <li>Serialization</li>\n        <li>OpenAPI documentation</li>\n        <li>Sensitive field hide করা</li>\n      </ol>\n      <p>সম্ভব হয়।</p>\n      <h4>ধরা যাক database user object-এ:</h4>\n      <p>id<br>name<br>email<br>password_hash<br>created_at</p>\n      <p>আছে।</p>\n      <p>Response model-এ password_hash না রাখলে API client-এর কাছে সেটি expose হবে না।</p>\n    "
  },
  {
    "id": "fastapi-13",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Dependency Injection",
      "Depends",
      "DI"
    ],
    "question": "FastAPI Dependency Injection কী?",
    "answer": "\n      <p>Dependency Injection হলো একটি mechanism যেখানে function নিজের dependency নিজে তৈরি না করে বাইরে থেকে dependency receive করে।</p>\n      <p>FastAPI-তে Depends() ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def get_current_user():\n    return user</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.get(\"/profile\")\ndef profile(\n    user = Depends(get_current_user)\n):\n    return user</code></pre>\n      </div>\n      <p>FastAPI request process করার সময় dependency resolve করে।</p>\n      <h4>Common use:</h4>\n      <ul>\n        <li>Database session</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Current user</li>\n        <li>Configuration</li>\n        <li>Service object</li>\n        <li>Permission checking</li>\n      </ul>\n      <p>DI-এর ফলে code loosely coupled এবং testable হয়।</p>\n    "
  },
  {
    "id": "fastapi-14",
    "category": "FastAPI",
    "difficulty": "Advanced",
    "tags": [
      "Dependency Injection",
      "Nested Dependency",
      "Architecture"
    ],
    "question": "FastAPI-তে nested dependency কী?",
    "answer": "\n      <p>একটি dependency নিজেই অন্য dependency-এর উপর depend করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>get_current_user()\n       ↓\nget_token()\n       ↓\nAuthorization header</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>get_current_user()\n       ↓\nget_db()\n       ↓\nDatabase Session</code></pre>\n      </div>\n      <p>এতে dependency graph তৈরি হয়।</p>\n      <p>FastAPI dependency tree resolve করে এবং প্রয়োজনীয় dependency inject করে।</p>\n      <p>Large application-এ এটি authentication, permissions, database এবং tenant context-এর মতো cross-cutting concern manage করতে useful।</p>\n    "
  },
  {
    "id": "fastapi-15",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Dependency Injection",
      "Yield",
      "Database",
      "Lifecycle"
    ],
    "question": "FastAPI dependency-তে yield কেন ব্যবহার করা হয়?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>yield dependency resource setup এবং cleanup-এর জন্য ব্যবহার করা যায়।</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def get_db():\n    db = SessionLocal()</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try:\n        yield db\n    finally:\n        db.close()</code></pre>\n      </div>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCreate DB Session\n ↓\nyield\n ↓\nEndpoint executes\n ↓\nfinally\n ↓\nClose Session</code></pre>\n      </div>\n      <p>এটি database session, resource এবং connection lifecycle manage করার জন্য খুব useful।</p>\n      <p>এভাবে প্রতি request-এর জন্য resource safely acquire এবং release করা যায়।</p>\n    "
  },
  {
    "id": "fastapi-16",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Async",
      "Await",
      "I/O",
      "Concurrency"
    ],
    "question": "FastAPI-তে async def endpoint এবং def endpoint-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>FastAPI দুই ধরনের endpoint support করে:</h4>\n      <p>async def</p>\n      <p>এবং</p>\n      <p>def</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def endpoint event loop-এর সাথে asynchronous execution করতে পারে।</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.get(\"/users\")\nasync def users():\n    result = await async_db.fetch_all()\n    return result</code></pre>\n      </div>\n      <p>এখানে I/O-এর সময় অন্য task execute হতে পারে।</p>\n      <p>Normal def endpoint blocking/synchronous code-এর জন্য useful।</p>\n      <p>FastAPI synchronous endpoint-কে appropriate execution context-এ চালাতে পারে, কিন্তু async endpoint-এর ভিতরে blocking operation ঢুকিয়ে দেওয়া উচিত নয়।</p>\n      <h4>মূল কথা:</h4>\n      <p>async def<br>→ Async-compatible I/O থাকলে useful</p>\n      <p>def<br>→ Blocking/synchronous logic-এর জন্য appropriate হতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-17",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Async",
      "Blocking",
      "Performance"
    ],
    "question": "FastAPI async endpoint-এর মধ্যে কোন ধরনের code avoid করা উচিত?",
    "answer": "\n      <p>Event loop block করে এমন synchronous operation avoid করা উচিত।</p>\n      <h4>Bad example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def endpoint():\n    time.sleep(5)</code></pre>\n      </div>\n      <p>এটি event loop block করতে পারে।</p>\n      <h4>আরেকটি example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def endpoint():\n    requests.get(\"https://example.com\")</code></pre>\n      </div>\n      <p>requests synchronous HTTP client।</p>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def endpoint():\n    await async_http_client.get(...)</code></pre>\n      </div>\n      <p>অর্থাৎ async endpoint-এর ভিতরের I/O dependency-গুলোও asynchronous হওয়া উচিত, অথবা blocking কাজকে suitable worker thread/process-এ offload করতে হবে।</p>\n    "
  },
  {
    "id": "fastapi-18",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Middleware",
      "Request",
      "Response"
    ],
    "question": "FastAPI middleware কী?",
    "answer": "\n      <p>Middleware হলো এমন layer যা request endpoint-এ যাওয়ার আগে এবং response ফেরত যাওয়ার সময় কাজ করতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nMiddleware\n ↓\nRouter\n ↓\nEndpoint\n ↓\nMiddleware\n ↓\nResponse\n ↓\nClient</code></pre>\n      </div>\n      <h4>Common use:</h4>\n      <ul>\n        <li>Request logging</li>\n        <li>Request ID</li>\n        <li>Timing</li>\n        <li>CORS</li>\n        <li>Authentication-related processing</li>\n        <li>Metrics</li>\n        <li>Security headers</li>\n      </ul>\n      <h4>Example concept:</h4>\n      <p>request<br>→ start timer<br>→ call next<br>→ calculate duration<br>→ response</p>\n      <p>Cross-cutting concern-এর জন্য middleware useful।</p>\n    "
  },
  {
    "id": "fastapi-19",
    "category": "FastAPI",
    "difficulty": "Advanced",
    "tags": [
      "Middleware",
      "Dependency",
      "Architecture"
    ],
    "question": "Middleware এবং Dependency-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Middleware পুরো request/response pipeline-এর উপর কাজ করে।</p>\n      <p>Dependency নির্দিষ্ট route বা route group-এর জন্য reusable dependency injection mechanism।</p>\n      <p><strong>Middleware:</strong></p>\n      <ul>\n        <li>Global/request pipeline</li>\n      </ul>\n      <p><strong>Dependency:</strong></p>\n      <ul>\n        <li>Route-specific reusable logic</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Request ID\n→ Middleware</code></pre>\n      </div>\n      <p>Current authenticated user<br>→ Dependency</p>\n      <p>Database session<br>→ Dependency</p>\n      <p>Global CORS<br>→ Middleware</p>\n      <p>Role permission<br>→ Dependency</p>\n      <p>কোন concern কোথায় belong করে তা architecture অনুযায়ী decide করতে হবে।</p>\n    "
  },
  {
    "id": "fastapi-20",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Authentication",
      "Authorization",
      "Security"
    ],
    "question": "Authentication এবং Authorization-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Authentication হলো user কে তা verify করা।</p>\n      <p><strong>Example:</strong><br>\"এই user কি সত্যিই Nazmul?\"</p>\n      <p>Authorization হলো authenticated user কী করতে পারবে তা determine করা।</p>\n      <p><strong>Example:</strong><br>\"Nazmul কি admin operation করতে পারবে?\"</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Login\n ↓\nAuthentication\n ↓\nIdentity established\n ↓\nAuthorization\n ↓\nPermission check\n ↓\nResource access</code></pre>\n      </div>\n      <p><strong>Authentication:</strong><br>Who are you?</p>\n      <p><strong>Authorization:</strong><br>What are you allowed to do?</p>\n    "
  },
  {
    "id": "fastapi-21",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "JWT",
      "Authentication",
      "Token"
    ],
    "question": "JWT কী এবং FastAPI-তে কীভাবে ব্যবহার করা হয়?",
    "answer": "\n      <p>JWT-এর পূর্ণরূপ JSON Web Token।</p>\n      <p>JWT সাধারণত stateless authentication-এর জন্য ব্যবহার করা হয়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User Login\n ↓\nServer validates credentials\n ↓\nJWT তৈরি\n ↓\nClient token store করে\n ↓\nপরবর্তী request-এ\nAuthorization: Bearer &lt;token&gt;\n ↓\nServer token verify করে\n ↓\nUser identify করে</code></pre>\n      </div>\n      <h4>JWT-এর তিনটি অংশ:</h4>\n      <p>Header<br>Payload<br>Signature</p>\n      <p>Payload-এ সাধারণত user identifier, expiry এবং প্রয়োজনীয় claims থাকতে পারে।</p>\n      <p>Password JWT payload-এ রাখা যাবে না।</p>\n      <p>JWT signed হতে হবে এবং secret/private key নিরাপদ রাখতে হবে।</p>\n    "
  },
  {
    "id": "fastapi-22",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "JWT",
      "Access Token",
      "Refresh Token",
      "Security"
    ],
    "question": "Access token এবং Refresh token কী?",
    "answer": "\n      <p>Access token short-lived token হিসেবে API access করতে ব্যবহৃত হয়।</p>\n      <p>Refresh token দীর্ঘ সময়ের জন্য নতুন access token পাওয়ার কাজে ব্যবহৃত হয়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Login\n ↓\nAccess Token + Refresh Token\n ↓\nAccess Token দিয়ে API call\n ↓\nAccess Token expired\n ↓\nRefresh Token\n ↓\nNew Access Token</code></pre>\n      </div>\n      <h4>Security-এর জন্য সাধারণত:</h4>\n      <p>Access token<br>→ Short expiry</p>\n      <p>Refresh token<br>→ Longer expiry<br>→ Secure storage<br>→ Rotation/revocation strategy</p>\n      <p>Refresh token leak হলে account compromise হতে পারে, তাই এটি বেশি carefully manage করতে হয়।</p>\n    "
  },
  {
    "id": "fastapi-23",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "OAuth2",
      "Authentication",
      "Authorization"
    ],
    "question": "OAuth2 কী?",
    "answer": "\n      <p>OAuth 2.0 হলো authorization framework যা একটি application-কে user-এর resource access করার অনুমতি দেওয়ার standard mechanism প্রদান করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n ↓\nClient Application\n ↓\nAuthorization Server\n ↓\nAuthorization Grant\n ↓\nAccess Token\n ↓\nResource Server</code></pre>\n      </div>\n      <p>FastAPI OAuth2-related security utilities provide করে।</p>\n      <h4>গুরুত্বপূর্ণ:</h4>\n      <p>OAuth2 এবং JWT একই জিনিস নয়।</p>\n      <p>OAuth2<br>→ Authorization framework</p>\n      <p>JWT<br>→ Token format</p>\n      <p>OAuth2 system JWT token ব্যবহার করতে পারে, কিন্তু OAuth2 token অবশ্যই JWT হতে হবে এমন নয়।</p>\n    "
  },
  {
    "id": "fastapi-24",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "RBAC",
      "Authorization",
      "Permissions"
    ],
    "question": "FastAPI-তে Role-Based Access Control কীভাবে implement করবেন?",
    "answer": "\n      <p>RBAC-এর পূর্ণরূপ Role-Based Access Control।</p>\n      <p>User-এর role অনুযায়ী permission দেওয়া হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Admin\n→ Create\n→ Read\n→ Update\n→ Delete</code></pre>\n      </div>\n      <p>Manager<br>→ Create<br>→ Read<br>→ Update</p>\n      <p>Viewer<br>→ Read</p>\n      <p>FastAPI Dependency ব্যবহার করে permission check করা যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JWT\n ↓\nCurrent User\n ↓\nRole\n ↓\nPermission Dependency\n ↓\nEndpoint</code></pre>\n      </div>\n      <p>Large system-এ শুধু role check না করে role → permissions mapping ব্যবহার করলে authorization আরও flexible হয়।</p>\n    "
  },
  {
    "id": "fastapi-25",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "CORS",
      "Security",
      "Browser"
    ],
    "question": "CORS কী? FastAPI-তে CORS কেন configure করতে হয়?",
    "answer": "\n      <p>CORS-এর পূর্ণরূপ Cross-Origin Resource Sharing।</p>\n      <p>Browser security policy-এর কারণে একটি origin থেকে অন্য origin-এর API access controlled হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Frontend:\nhttps://app.example.com</code></pre>\n      </div>\n      <p><strong>API:</strong><br>https://api.example.com</p>\n      <p>Different origin হলে browser CORS rules apply করতে পারে।</p>\n      <p>FastAPI-তে CORSMiddleware ব্যবহার করা যায়।</p>\n      <h4>Production-এ:</h4>\n      <p>allow_origins=[\"*\"]</p>\n      <p>blindly ব্যবহার করা উচিত নয়।</p>\n      <p>Trusted frontend origins explicitly configure করা বেশি নিরাপদ।</p>\n    "
  },
  {
    "id": "fastapi-26",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Security",
      "API Security",
      "OWASP"
    ],
    "question": "FastAPI API secure করার সময় কী কী বিষয় consider করবেন?",
    "answer": "\n      <h4>Important security areas:</h4>\n      <ol>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Input validation</li>\n        <li>HTTPS</li>\n        <li>Secure password hashing</li>\n        <li>JWT security</li>\n        <li>Secret management</li>\n        <li>CORS configuration</li>\n        <li>Rate limiting</li>\n        <li>SQL injection prevention</li>\n        <li>Security headers</li>\n        <li>File upload validation</li>\n        <li>Request size limits</li>\n        <li>Dependency vulnerability scanning</li>\n        <li>Sensitive data logging avoid করা</li>\n      </ol>\n      <p>Password কখনো plaintext রাখা যাবে না।</p>\n      <p>Database query parameterized বা ORM-based হওয়া উচিত।</p>\n      <p>Secrets source code-এ hardcode করা উচিত নয়।</p>\n    "
  },
  {
    "id": "fastapi-27",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "BackgroundTasks",
      "Async",
      "Task"
    ],
    "question": "FastAPI BackgroundTasks কী?",
    "answer": "\n      <p>BackgroundTasks response return করার পরে ছোট background কাজ চালানোর জন্য ব্যবহার করা যায়।</p>\n      <h4>Example use:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User registration\n ↓\nCreate user\n ↓\nResponse\n ↓\nSend email</code></pre>\n      </div>\n      <p>Email sending response-এর পরে করা যেতে পারে।</p>\n      <p>FastAPI BackgroundTasks small/simple in-process task-এর জন্য useful।</p>\n      <p><strong>Examples:</strong></p>\n      <ul>\n        <li>Email notification</li>\n        <li>Small logging operation</li>\n        <li>Simple file operation</li>\n      </ul>\n      <p>কিন্তু long-running বা critical distributed job-এর জন্য এটি ideal নয়। সেখানে Celery, RabbitMQ, Kafka বা dedicated worker architecture ব্যবহার করা ভালো।</p>\n    "
  },
  {
    "id": "fastapi-28",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Celery",
      "Background Job",
      "Distributed Task"
    ],
    "question": "FastAPI BackgroundTasks এবং Celery-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>FastAPI BackgroundTasks application process-এর lifecycle-এর সাথে closely related।</p>\n      <p>Celery distributed task queue architecture ব্যবহার করে।</p>\n      <p><strong>BackgroundTasks:</strong></p>\n      <ul>\n        <li>Simple</li>\n        <li>Small tasks</li>\n        <li>In-process</li>\n        <li>No dedicated broker required</li>\n      </ul>\n      <p><strong>Celery:</strong></p>\n      <ul>\n        <li>Distributed worker</li>\n        <li>Retry</li>\n        <li>Scheduling</li>\n        <li>Broker</li>\n        <li>Long-running jobs</li>\n        <li>Multiple workers</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>FastAPI\n ↓\nCelery\n ↓\nRabbitMQ/Redis\n ↓\nWorker\n ↓\nTask</code></pre>\n      </div>\n      <p>Critical email, report generation, image processing বা long-running task-এর ক্ষেত্রে dedicated worker বেশি reliable।</p>\n    "
  },
  {
    "id": "fastapi-29",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Database",
      "SQLAlchemy",
      "ORM"
    ],
    "question": "FastAPI-তে database কীভাবে integrate করবেন?",
    "answer": "\n      <p>FastAPI নিজে ORM provide করে না।</p>\n      <h4>Common choices:</h4>\n      <p>SQLAlchemy<br>SQLModel<br>Tortoise ORM<br>অন্যান্য database libraries</p>\n      <h4>Typical architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>FastAPI\n ↓\nService\n ↓\nRepository\n ↓\nSQLAlchemy\n ↓\nDatabase</code></pre>\n      </div>\n      <p>Database session dependency হিসেবে inject করা যায়।</p>\n      <h4>Example concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()</code></pre>\n      </div>\n      <h4>Route:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def create_user(\n    user: UserCreate,\n    db: Session = Depends(get_db)\n):\n    ...</code></pre>\n      </div>\n      <p>Large project-এ database logic endpoint-এর মধ্যে না রেখে service/repository layer-এ রাখা ভালো।</p>\n    "
  },
  {
    "id": "fastapi-30",
    "category": "FastAPI",
    "difficulty": "Advanced",
    "tags": [
      "SQLAlchemy",
      "Session",
      "Transaction",
      "ORM"
    ],
    "question": "SQLAlchemy Session কী? কেন request-এর মধ্যে session manage করতে হয়?",
    "answer": "\n      <p>SQLAlchemy Session database interaction-এর unit-of-work এবং identity management-এর মতো কাজ করে।</p>\n      <h4>Session ব্যবহার করে:</h4>\n      <ul>\n        <li>Query</li>\n        <li>Insert</li>\n        <li>Update</li>\n        <li>Delete</li>\n        <li>Transaction</li>\n        <li>Commit</li>\n        <li>Rollback</li>\n      </ul>\n      <p>Request lifecycle-এর সাথে session lifecycle manage করা গুরুত্বপূর্ণ।</p>\n      <h4>Typical flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCreate Session\n ↓\nQuery/Update\n ↓\nCommit\n ↓\nResponse\n ↓\nClose Session</code></pre>\n      </div>\n      <p>Exception হলে rollback প্রয়োজন হতে পারে।</p>\n      <p>Long-lived global session রাখা সাধারণত unsafe এবং connection/resource management সমস্যা তৈরি করতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-31",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "SQLAlchemy",
      "AsyncSession",
      "Async Database"
    ],
    "question": "SQLAlchemy synchronous Session এবং AsyncSession-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Synchronous Session blocking database operation করতে পারে।</p>\n      <p>AsyncSession asynchronous database driver-এর সাথে async I/O support করতে পারে।</p>\n      <h4>Async FastAPI endpoint-এ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def get_user(\n    db: AsyncSession\n):\n    result = await db.execute(...)</code></pre>\n      </div>\n      <p>এতে database I/O-এর সময় event loop অন্য কাজ করতে পারে।</p>\n      <p>কিন্তু async SQLAlchemy ব্যবহার করলেই সব query automatically faster হবে না।</p>\n      <p><strong>Actual performance depends on:</strong></p>\n      <ul>\n        <li>Database</li>\n        <li>Query</li>\n        <li>Index</li>\n        <li>Connection pool</li>\n        <li>Network latency</li>\n        <li>Concurrency</li>\n        <li>Workload</li>\n      </ul>\n    "
  },
  {
    "id": "fastapi-32",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Alembic",
      "Database Migration",
      "SQLAlchemy"
    ],
    "question": "Alembic কী? FastAPI project-এ কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Alembic হলো SQLAlchemy ecosystem-এর database migration tool।</p>\n      <p>Database schema change version-controlled রাখার জন্য migration ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Initial:\nusers\n    id\n    name</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Later:\nusers\n    id\n    name\n    email</code></pre>\n      </div>\n      <h4>Migration:</h4>\n      <p>001_create_users<br>002_add_email</p>\n      <p>Production deployment-এ database schema safely evolve করার জন্য migration অত্যন্ত গুরুত্বপূর্ণ।</p>\n      <h4>Common workflow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Model change\n ↓\nGenerate migration\n ↓\nReview migration\n ↓\nRun migration\n ↓\nDatabase updated</code></pre>\n      </div>\n    "
  },
  {
    "id": "fastapi-33",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Exception Handler",
      "HTTPException",
      "Error Handling"
    ],
    "question": "FastAPI-তে HTTPException কী?",
    "answer": "\n      <p>HTTPException API client-কে HTTP error response দেওয়ার জন্য ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if user is None:\n    raise HTTPException(\n        status_code=404,\n        detail=\"User not found\"\n    )</code></pre>\n      </div>\n      <h4>Common status codes:</h4>\n      <p>400 → Bad Request<br>401 → Unauthorized<br>403 → Forbidden<br>404 → Not Found<br>409 → Conflict<br>422 → Validation Error<br>500 → Internal Server Error</p>\n      <p>Business/application exception এবং HTTP layer আলাদা রাখলে architecture আরও clean হয়।</p>\n    "
  },
  {
    "id": "fastapi-34",
    "category": "FastAPI",
    "difficulty": "Advanced",
    "tags": [
      "Exception Handler",
      "Global Error",
      "Middleware"
    ],
    "question": "Custom exception handler কীভাবে কাজ করে?",
    "answer": "\n      <p>Global বা centralized error handling-এর জন্য custom exception handler ব্যবহার করা যায়।</p>\n      <h4>Example concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.exception_handler(UserNotFoundException)\nasync def user_not_found_handler(request, exc):\n    return JSONResponse(\n        status_code=404,\n        content={\n            \"message\": \"User not found\"\n        }\n    )</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Consistent error response</li>\n        <li>Centralized logging</li>\n        <li>Cleaner endpoints</li>\n        <li>Domain exception mapping</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Domain exception\n      ↓\nException handler\n      ↓\nHTTP response</code></pre>\n      </div>\n      <p>এটি large application-এ খুব useful।</p>\n    "
  },
  {
    "id": "fastapi-35",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "API Versioning",
      "REST",
      "API Design"
    ],
    "question": "FastAPI API versioning কীভাবে করবেন?",
    "answer": "\n      <h4>API versioning-এর জন্য common approaches:</h4>\n      <ol>\n        <li>URL versioning</li>\n      </ol>\n      <p>/api/v1/users<br>/api/v2/users</p>\n      <ol>\n        <li>Header versioning</li>\n      </ol>\n      <p><strong>Accept:</strong> application/vnd.example.v2+json</p>\n      <ol>\n        <li>Query parameter</li>\n      </ol>\n      <p>/users?version=2</p>\n      <p>Practical এবং সহজ approach হিসেবে URL versioning অনেক project-এ ব্যবহার করা হয়।</p>\n      <h4>FastAPI:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>/api/v1\n    ↓\nusers\norders</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>/api/v2\n    ↓\nusers\norders</code></pre>\n      </div>\n      <p>Versioning-এর লক্ষ্য হলো existing clients না ভেঙে API evolve করা।</p>\n    "
  },
  {
    "id": "fastapi-36",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "REST",
      "HTTP",
      "API Design"
    ],
    "question": "FastAPI REST API design করার সময় কোন HTTP status codes জানা গুরুত্বপূর্ণ?",
    "answer": "\n      <h4>Common status codes:</h4>\n      <p>200 OK<br>→ Successful GET/update</p>\n      <p>201 Created<br>→ Resource successfully created</p>\n      <p>202 Accepted<br>→ Async/background processing accepted</p>\n      <p>204 No Content<br>→ Successful operation without response body</p>\n      <p>400 Bad Request<br>→ Invalid request</p>\n      <p>401 Unauthorized<br>→ Authentication required/failed</p>\n      <p>403 Forbidden<br>→ Authenticated but not allowed</p>\n      <p>404 Not Found<br>→ Resource not found</p>\n      <p>409 Conflict<br>→ Resource state conflict</p>\n      <p>422 Unprocessable Entity<br>→ Validation-related request error</p>\n      <p>429 Too Many Requests<br>→ Rate limit exceeded</p>\n      <p>500 Internal Server Error<br>→ Unexpected server error</p>\n      <p>502/503<br>→ Upstream/service availability problems</p>\n    "
  },
  {
    "id": "fastapi-37",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Pagination",
      "Filtering",
      "Sorting",
      "API Design"
    ],
    "question": "FastAPI API-তে pagination, filtering এবং sorting কীভাবে design করবেন?",
    "answer": "\n      <p>Large dataset কখনো একবারে return করা উচিত নয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /products?page=1&amp;limit=20\nGET /products?category=electronics\nGET /products?sort=-created_at</code></pre>\n      </div>\n      <h4>Common pagination:</h4>\n      <p>page<br>limit</p>\n      <h4>অথবা:</h4>\n      <p>offset<br>limit</p>\n      <p>Very large distributed dataset-এর ক্ষেত্রে cursor-based pagination বেশি scalable হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /products?cursor=abc123&amp;limit=20</code></pre>\n      </div>\n      <p><strong>API design-এ:</strong></p>\n      <ul>\n        <li>Maximum limit enforce করা</li>\n        <li>Stable sorting রাখা</li>\n        <li>Database index ব্যবহার করা</li>\n        <li>Total count প্রয়োজন হলে carefully calculate করা</li>\n      </ul>\n      <p>গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-38",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "OpenAPI",
      "Swagger",
      "Documentation"
    ],
    "question": "FastAPI কীভাবে automatic API documentation তৈরি করে?",
    "answer": "\n      <p>FastAPI Python type hints এবং Pydantic schema ব্যবহার করে OpenAPI specification generate করে।</p>\n      <p>তারপর OpenAPI specification থেকে interactive documentation তৈরি হয়।</p>\n      <h4>Common endpoints:</h4>\n      <p>/docs<br>→ Swagger UI</p>\n      <p>/redoc<br>→ ReDoc</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Python Type Hints\n      ↓\nPydantic Schema\n      ↓\nOpenAPI\n      ↓\nSwagger/ReDoc</code></pre>\n      </div>\n      <p>এর ফলে frontend developer এবং API consumer সহজে API structure দেখতে পারে এবং test করতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-39",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Testing",
      "Pytest",
      "TestClient"
    ],
    "question": "FastAPI API কীভাবে test করবেন?",
    "answer": "\n      <p>FastAPI API testing-এর জন্য pytest এবং FastAPI/Starlette testing tools ব্যবহার করা যায়।</p>\n      <h4>Test করা যায়:</h4>\n      <ol>\n        <li>Unit test</li>\n        <li>API test</li>\n        <li>Integration test</li>\n        <li>Authentication test</li>\n        <li>Database test</li>\n      </ol>\n      <h4>Example concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def test_get_users(client):\n    response = client.get(\"/users\")</code></pre>\n      </div>\n      <p>assert response.status_code == 200</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API test-এ:\nRequest\n ↓\nFastAPI\n ↓\nDependency\n ↓\nService\n ↓\nDatabase/Test DB\n ↓\nResponse</code></pre>\n      </div>\n      <p>External dependency mock করা যেতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-40",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Dependency Override",
      "Testing",
      "Mocking"
    ],
    "question": "FastAPI dependency override কী?",
    "answer": "\n      <p>Testing-এর সময় production dependency-এর পরিবর্তে test dependency ব্যবহার করতে dependency override করা যায়।</p>\n      <h4>Example:</h4>\n      <h4>Production:</h4>\n      <p>get_db()<br>→ Real Database</p>\n      <h4>Testing:</h4>\n      <p>get_db()<br>→ Test Database</p>\n      <h4>অথবা:</h4>\n      <p>get_current_user()<br>→ Fake Test User</p>\n      <p>এটি খুব useful কারণ API test-এর সময় external database, authentication বা external service isolate করা যায়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Production Dependency\n        ↓\nOverride\n        ↓\nTest Dependency</code></pre>\n      </div>\n    "
  },
  {
    "id": "fastapi-41",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Async Testing",
      "Pytest",
      "AnyIO"
    ],
    "question": "FastAPI asynchronous endpoint কীভাবে test করবেন?",
    "answer": "\n      <p>Async endpoint test করার সময় asynchronous test support প্রয়োজন হতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>async test\n    ↓\nasync HTTP client\n    ↓\nFastAPI application\n    ↓\nawait response</code></pre>\n      </div>\n      <p>Testing stack project অনুযায়ী pytest এবং async testing utilities ব্যবহার করতে পারে।</p>\n      <h4>গুরুত্বপূর্ণ বিষয়:</h4>\n      <p>Async endpoint test করলেই test automatically production-এর সব concurrency behavior prove করে না।</p>\n      <p>Load testing এবং concurrency testing আলাদা concern।</p>\n    "
  },
  {
    "id": "fastapi-42",
    "category": "FastAPI",
    "difficulty": "Advanced",
    "tags": [
      "Lifespan",
      "Startup",
      "Shutdown",
      "Resources"
    ],
    "question": "FastAPI lifespan কী?",
    "answer": "\n      <p>Application startup এবং shutdown-এর সময় resource initialize এবং cleanup করার জন্য lifespan mechanism ব্যবহার করা যায়।</p>\n      <h4>Example resources:</h4>\n      <ul>\n        <li>Database pool</li>\n        <li>Redis connection</li>\n        <li>ML model</li>\n        <li>HTTP client</li>\n        <li>Message broker connection</li>\n      </ul>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Application Start\n ↓\nInitialize resources\n ↓\nServe requests\n ↓\nApplication Shutdown\n ↓\nCleanup resources</code></pre>\n      </div>\n      <p>Production application-এ global resource lifecycle properly manage করার জন্য lifespan গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-43",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Redis",
      "Caching",
      "Performance"
    ],
    "question": "FastAPI application-এ Redis cache কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p>Frequently requested data cache করতে Redis ব্যবহার করা যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nFastAPI\n ↓\nCheck Redis\n ├── Cache Hit → Return\n └── Cache Miss\n       ↓\n    Database\n       ↓\n    Redis\n       ↓\n    Response</code></pre>\n      </div>\n      <p><strong>Common use:</strong></p>\n      <ul>\n        <li>User profile</li>\n        <li>Product data</li>\n        <li>Configuration</li>\n        <li>Session</li>\n        <li>Rate limiting</li>\n        <li>Temporary data</li>\n      </ul>\n      <h4>Cache strategy:</h4>\n      <h4>Cache-aside:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Read\n ↓\nRedis\n ↓\nMiss\n ↓\nDB\n ↓\nRedis SET\n ↓\nReturn</code></pre>\n      </div>\n      <p>Cache invalidation এবং TTL properly design করা অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-44",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Rate Limiting",
      "Redis",
      "Security",
      "API"
    ],
    "question": "FastAPI API-তে rate limiting কেন এবং কীভাবে implement করবেন?",
    "answer": "\n      <p>Rate limiting একটি client কত request নির্দিষ্ট সময়ে করতে পারবে তা control করে।</p>\n      <h4>Purpose:</h4>\n      <ul>\n        <li>Abuse prevention</li>\n        <li>DDoS mitigation-এর একটি layer</li>\n        <li>Brute-force protection</li>\n        <li>Resource protection</li>\n        <li>Fair usage</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>100 requests / minute / user</code></pre>\n      </div>\n      <p>Distributed FastAPI deployment-এ Redis-backed rate limiter ব্যবহার করা যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway / Rate Limiter\n ↓\nRedis\n ↓\nAllowed?\n ├── Yes → FastAPI\n └── No → 429</code></pre>\n      </div>\n      <p>Rate limiting সাধারণত application-এর পাশাপাশি API Gateway বা reverse proxy layer-এও implement করা যায়।</p>\n    "
  },
  {
    "id": "fastapi-45",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "File Upload",
      "UploadFile",
      "Security"
    ],
    "question": "FastAPI-তে file upload কীভাবে handle করবেন?",
    "answer": "\n      <p>FastAPI-তে file upload-এর জন্য UploadFile ব্যবহার করা যায়।</p>\n      <h4>File upload-এর সময় consider করতে হবে:</h4>\n      <ol>\n        <li>File size limit</li>\n        <li>MIME type</li>\n        <li>File extension</li>\n        <li>Content validation</li>\n        <li>Filename security</li>\n        <li>Storage location</li>\n        <li>Virus scanning</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n      </ol>\n      <p>Large file-এর ক্ষেত্রে application server-এর memory-তে পুরো file load না করে streaming/object storage architecture ব্যবহার করা ভালো।</p>\n      <h4>Example architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nFastAPI\n ↓\nObject Storage\n ↓\nS3-compatible storage</code></pre>\n      </div>\n      <p>Production-এ uploaded file-এর original filename blindly trust করা উচিত নয়।</p>\n    "
  },
  {
    "id": "fastapi-46",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Concurrency",
      "Load Testing"
    ],
    "question": "FastAPI application-এর performance কীভাবে improve করবেন?",
    "answer": "\n      <p>Performance optimization-এর আগে bottleneck measure করতে হবে।</p>\n      <h4>Important areas:</h4>\n      <ol>\n        <li>Async I/O</li>\n        <li>Database query optimization</li>\n        <li>Proper indexes</li>\n        <li>Connection pooling</li>\n        <li>Redis caching</li>\n        <li>Pagination</li>\n        <li>Response size reduction</li>\n        <li>Compression</li>\n        <li>Efficient serialization</li>\n        <li>Background workers</li>\n        <li>Horizontal scaling</li>\n        <li>Load testing</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Slow API\n ↓\nProfile\n ↓\nDatabase query found slow\n ↓\nAdd index / optimize query\n ↓\nMeasure again</code></pre>\n      </div>\n      <p>শুধু বেশি Uvicorn worker চালালেই application automatically fast হবে না। Bottleneck identify করা সবচেয়ে গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-47",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Uvicorn",
      "Workers",
      "Scaling",
      "Deployment"
    ],
    "question": "Uvicorn workers কী? Multiple workers কেন ব্যবহার করবেন?",
    "answer": "\n      <p>একাধিক worker process চালালে application multiple process-এর মাধ্যমে request handle করতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Load Balancer\n      ↓\nWorker 1\nWorker 2\nWorker 3\nWorker 4</code></pre>\n      </div>\n      <p>প্রতিটি worker আলাদা process এবং নিজস্ব memory space রাখে।</p>\n      <p><strong>Benefits:</strong></p>\n      <ul>\n        <li>Multiple CPU cores ব্যবহার</li>\n        <li>Process-level isolation</li>\n        <li>Higher throughput under suitable workloads</li>\n      </ul>\n      <p>কিন্তু worker সংখ্যা unlimited বাড়ানো উচিত নয়।</p>\n      <p><strong>প্রতিটি worker:</strong></p>\n      <ul>\n        <li>Memory consume করে</li>\n        <li>Database connection pool consume করতে পারে</li>\n      </ul>\n      <p>তাই CPU, RAM এবং database capacity অনুযায়ী worker সংখ্যা নির্ধারণ করতে হবে।</p>\n    "
  },
  {
    "id": "fastapi-48",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Docker",
      "Nginx",
      "Deployment",
      "Production"
    ],
    "question": "FastAPI production deployment architecture কেমন হতে পারে?",
    "answer": "\n      <h4>একটি common production architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Internet\n   ↓\nDNS\n   ↓\nLoad Balancer / Nginx\n   ↓\nFastAPI\n   ↓\nUvicorn Workers\n   ↓\nService Layer\n   ↓\nDatabase</code></pre>\n      </div>\n      <h4>Additional components:</h4>\n      <p>Redis<br>→ Cache</p>\n      <p>RabbitMQ/Kafka<br>→ Async messaging</p>\n      <p>Object Storage<br>→ Files</p>\n      <p>Monitoring<br>→ Metrics/Logs/Tracing</p>\n      <p>Docker containerization ব্যবহার করে service package করা যায়।</p>\n      <p><strong>Production deployment-এ:</strong></p>\n      <ul>\n        <li>HTTPS</li>\n        <li>Environment configuration</li>\n        <li>Secrets</li>\n        <li>Health checks</li>\n        <li>Logging</li>\n        <li>Metrics</li>\n        <li>Graceful shutdown</li>\n        <li>Database migration</li>\n      </ul>\n      <p>consider করা উচিত।</p>\n    "
  },
  {
    "id": "fastapi-49",
    "category": "FastAPI",
    "difficulty": "Intermediate",
    "tags": [
      "Health Check",
      "Readiness",
      "Liveness",
      "Kubernetes"
    ],
    "question": "Liveness এবং Readiness health check-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Liveness check বলে application process বেঁচে আছে কিনা।</p>\n      <p>Readiness check বলে application বর্তমানে traffic গ্রহণের জন্য ready কিনা।</p>\n      <p><strong>Liveness:</strong><br>\"Process alive?\"</p>\n      <p><strong>Readiness:</strong><br>\"Can this instance serve requests?\"</p>\n      <p>Kubernetes environment-এ দুটো আলাদা purpose serve করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>/health/live\n→ Process alive</code></pre>\n      </div>\n      <p>/health/ready<br>→ DB/config/dependencies অনুযায়ী service ready</p>\n      <p>Readiness check-এ external dependency check করতে হবে কিনা carefully decide করতে হবে, কারণ অতিরিক্ত dependency coupling unhealthy state তৈরি করতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-50",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Logging",
      "Metrics",
      "Tracing",
      "Observability"
    ],
    "question": "FastAPI application-এ observability কীভাবে implement করবেন?",
    "answer": "\n      <h4>Observability-এর তিনটি প্রধান pillar:</h4>\n      <ol>\n        <li>Logs</li>\n        <li>Metrics</li>\n        <li>Traces</li>\n      </ol>\n      <p><strong>Logs:</strong></p>\n      <ul>\n        <li>কী ঘটেছে?</li>\n      </ul>\n      <p><strong>Metrics:</strong></p>\n      <ul>\n        <li>কতবার/কত দ্রুত/কত resource ব্যবহার হয়েছে?</li>\n      </ul>\n      <p><strong>Tracing:</strong></p>\n      <ul>\n        <li>একটি request কোন কোন service-এর মধ্য দিয়ে গেছে?</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nFastAPI\n ↓\nService A\n ↓\nDatabase</code></pre>\n      </div>\n      <p>Distributed tracing থাকলে একই request-এর trace ID ব্যবহার করে পুরো flow দেখা যায়।</p>\n      <p><strong>Important metrics:</strong></p>\n      <ul>\n        <li>Request count</li>\n        <li>Error rate</li>\n        <li>Latency</li>\n        <li>CPU</li>\n        <li>Memory</li>\n        <li>DB latency</li>\n        <li>Queue depth</li>\n      </ul>\n      <p>Production microservice environment-এ observability অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-51",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "SQLAlchemy",
      "N+1",
      "Database",
      "Performance"
    ],
    "question": "N+1 query problem কী? FastAPI/SQLAlchemy-তে কীভাবে avoid করবেন?",
    "answer": "\n      <p>N+1 problem হলো একটি list fetch করার পরে প্রতিটি item-এর related data আলাদাভাবে query করা।</p>\n      <h4>Example:</h4>\n      <p><strong>1 query:</strong></p>\n      <ul>\n        <li>Get 100 users</li>\n      </ul>\n      <h4>তারপর:</h4>\n      <p><strong>100 queries:</strong></p>\n      <ul>\n        <li>Get each user's orders</li>\n      </ul>\n      <p><strong>Total:</strong><br>101 queries</p>\n      <p>এটি performance severely degrade করতে পারে।</p>\n      <p><strong>Solutions:</strong></p>\n      <ul>\n        <li>Eager loading</li>\n        <li>selectinload</li>\n        <li>joinedload</li>\n        <li>Proper SQL join</li>\n        <li>Query optimization</li>\n      </ul>\n      <p>API response design-এর সময় relationship data প্রয়োজন অনুযায়ী fetch করা উচিত। সব relationship automatically load করলে আবার unnecessary data/query তৈরি হতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-52",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Transaction",
      "Database",
      "Consistency"
    ],
    "question": "FastAPI service-এ database transaction কীভাবে manage করবেন?",
    "answer": "\n      <p>Transaction-এর মূল লক্ষ্য হলো multiple database operation-কে একটি consistent unit হিসেবে manage করা।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Create Order\n+\nCreate Order Items\n+\nUpdate Inventory</code></pre>\n      </div>\n      <h4>সব সফল হলে:</h4>\n      <p>COMMIT</p>\n      <h4>কোনো operation fail হলে:</h4>\n      <p>ROLLBACK</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API\n ↓\nService\n ↓\nTransaction Boundary\n ├── Order\n ├── Order Items\n └── Inventory</code></pre>\n      </div>\n      <p>Transaction boundary service/business operation-এর সাথে align করা ভালো।</p>\n      <p>Distributed microservice environment-এ একই database transaction সব service-এর উপর apply করা যায় না। সেখানে Saga/Outbox-এর মতো pattern প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "fastapi-53",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Idempotency",
      "Payment",
      "Distributed Systems"
    ],
    "question": "FastAPI API-তে idempotency কী এবং কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>একই request একাধিকবার পাঠালেও যেন duplicate business effect তৈরি না হয়, তাকে idempotency বলা হয়।</p>\n      <h4>Payment example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nPOST /payments\nIdempotency-Key: abc123</code></pre>\n      </div>\n      <p>Network timeout হলো।</p>\n      <p>Client আবার একই request পাঠালো।</p>\n      <p>Server যদি একই idempotency key recognize করে তাহলে duplicate payment না করে আগের result return করতে পারে।</p>\n      <h4>Common implementation:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Idempotency-Key\n ↓\nRedis/Database\n ↓\nCheck existing request\n ↓\nAlready processed?\n ├── Yes → Return previous result\n └── No → Process + Store result</code></pre>\n      </div>\n      <p>Payment, order এবং distributed retry scenario-তে এটি অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "fastapi-54",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Microservices",
      "API Gateway",
      "Architecture"
    ],
    "question": "FastAPI microservice architecture-এ API Gateway-এর role কী?",
    "answer": "\n      <p>API Gateway client এবং internal services-এর মধ্যে entry point হিসেবে কাজ করতে পারে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n   ↓\nAPI Gateway\n   ↓\n├── User Service\n├── Order Service\n├── Payment Service\n└── Product Service</code></pre>\n      </div>\n      <h4>Gateway-এর কাজ হতে পারে:</h4>\n      <ul>\n        <li>Routing</li>\n        <li>Authentication</li>\n        <li>Rate limiting</li>\n        <li>TLS termination</li>\n        <li>Request logging</li>\n        <li>Request ID</li>\n        <li>Load balancing</li>\n        <li>API version routing</li>\n      </ul>\n      <p>তবে Gateway-এ business logic অতিরিক্ত ঢুকানো উচিত নয়। Business logic service-এর মধ্যে থাকা উচিত।</p>\n    "
  },
  {
    "id": "fastapi-55",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Graceful Shutdown",
      "Deployment",
      "Reliability"
    ],
    "question": "FastAPI graceful shutdown কী এবং কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>Application shutdown-এর সময় active request, database connection, message consumer এবং অন্যান্য resource safely close করাকে graceful shutdown বলা হয়।</p>\n      <h4>Bad shutdown:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Process killed\n ↓\nActive request terminated\n ↓\nConnection/resource leak</code></pre>\n      </div>\n      <h4>Graceful shutdown:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Shutdown signal\n ↓\nStop accepting new work\n ↓\nFinish active work\n ↓\nClose connections\n ↓\nExit</code></pre>\n      </div>\n      <p>Docker/Kubernetes deployment-এ graceful shutdown বিশেষভাবে গুরুত্বপূর্ণ।</p>\n      <p><strong>বিশেষ করে:</strong></p>\n      <ul>\n        <li>DB pool</li>\n        <li>Redis</li>\n        <li>Kafka consumer</li>\n        <li>RabbitMQ consumer</li>\n        <li>HTTP client</li>\n      </ul>\n      <p>properly close করতে হয়।</p>\n    "
  },
  {
    "id": "fastapi-56",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Layered Architecture",
      "Clean Architecture"
    ],
    "question": "Large FastAPI project-এর recommended architecture কী?",
    "answer": "\n      <p>Large FastAPI application-এ feature/module এবং responsibility অনুযায়ী code organize করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n├── main.py\n├── core/\n│   ├── config.py\n│   ├── security.py\n│   └── logging.py\n│\n├── api/\n│   ├── dependencies.py\n│   └── v1/\n│       ├── users.py\n│       ├── orders.py\n│       └── products.py\n│\n├── schemas/\n├── models/\n├── services/\n├── repositories/\n├── integrations/\n├── workers/\n└── tests/</code></pre>\n      </div>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Controller/API\n      ↓\nService\n      ↓\nRepository\n      ↓\nDatabase</code></pre>\n      </div>\n      <h4>External integration:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service\n ↓\nIntegration Client\n ↓\nPayment / Email / External API</code></pre>\n      </div>\n      <p>এতে framework-specific code এবং business logic আলাদা রাখা যায়।</p>\n    "
  },
  {
    "id": "fastapi-57",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Service Layer",
      "Repository",
      "Architecture"
    ],
    "question": "FastAPI endpoint-এর মধ্যে business logic রাখা উচিত কি?",
    "answer": "\n      <p>Large application-এ endpoint-এর মধ্যে complex business logic রাখা উচিত নয়।</p>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@app.post(\"/orders\")\ndef create_order(order):\n    # validation\n    # pricing\n    # inventory\n    # payment\n    # database\n    # notification\n    # সব এখানে</code></pre>\n      </div>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API\n ↓\nOrderService\n ↓\nPricingService\n ↓\nInventoryService\n ↓\nRepository\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Endpoint-এর responsibility:</h4>\n      <ul>\n        <li>Request গ্রহণ</li>\n        <li>Dependency resolve</li>\n        <li>Service call</li>\n        <li>Response return</li>\n      </ul>\n      <p>Business logic service/domain layer-এ থাকা উচিত।</p>\n      <p>এতে unit testing এবং future framework change সহজ হয়।</p>\n    "
  },
  {
    "id": "fastapi-58",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "External API",
      "Timeout",
      "Retry",
      "Resilience"
    ],
    "question": "FastAPI service থেকে external API call করার সময় কী কী consider করবেন?",
    "answer": "\n      <p>External service কখনো fully reliable ধরে নেওয়া উচিত নয়।</p>\n      <h4>Consider করতে হবে:</h4>\n      <ol>\n        <li>Connection timeout</li>\n        <li>Read timeout</li>\n        <li>Retry</li>\n        <li>Retry limit</li>\n        <li>Exponential backoff</li>\n        <li>Circuit breaker</li>\n        <li>Idempotency</li>\n        <li>Error mapping</li>\n        <li>Logging</li>\n        <li>Metrics</li>\n        <li>Trace propagation</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>FastAPI\n ↓\nPayment API\n ↓\nTimeout\n ↓\nRetry\n ↓\nStill failed\n ↓\nFallback / Error</code></pre>\n      </div>\n      <p>সব error retry করা উচিত নয়।</p>\n      <p><strong>যেমন:</strong><br>400 Bad Request<br>→ সাধারণত retry করা উচিত নয়।</p>\n      <p>Temporary network failure বা 503<br>→ retry করা যেতে পারে, policy অনুযায়ী।</p>\n    "
  },
  {
    "id": "fastapi-59",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Scalability",
      "Horizontal Scaling",
      "Stateless"
    ],
    "question": "FastAPI application কীভাবে horizontally scale করবেন?",
    "answer": "\n      <p>Horizontal scaling মানে আরও application instances যোগ করা।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Load Balancer\n       ↓\n ┌─────┼─────┐\n ↓     ↓     ↓\nAPI-1 API-2 API-3</code></pre>\n      </div>\n      <p>Stateless application হলে scaling সহজ হয়।</p>\n      <p><strong>Session state server memory-তে না রেখে:</strong></p>\n      <ul>\n        <li>Database</li>\n        <li>Redis</li>\n        <li>External storage</li>\n      </ul>\n      <p>এ রাখা যায়।</p>\n      <h4>Scaling-এর সময় consider করতে হবে:</h4>\n      <ul>\n        <li>Database connection limits</li>\n        <li>Redis capacity</li>\n        <li>Queue capacity</li>\n        <li>Load balancer</li>\n        <li>CPU</li>\n        <li>Memory</li>\n        <li>External API limits</li>\n      </ul>\n      <p>শুধু FastAPI instance বাড়ালেই system infinitely scale করবে না। Database অনেক সময় bottleneck হয়।</p>\n    "
  },
  {
    "id": "fastapi-60",
    "category": "FastAPI",
    "difficulty": "Senior",
    "tags": [
      "Production",
      "Architecture",
      "Security",
      "Performance",
      "Observability"
    ],
    "question": "একজন Senior FastAPI Developer হিসেবে production API design করার সময় কী কী বিষয় consider করবেন?",
    "answer": "\n      <p>Senior level-এ শুধু endpoint তৈরি করা যথেষ্ট নয়।</p>\n      <p>আমি পুরো system lifecycle consider করব।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1. API Design\n   → REST conventions\n   → Versioning\n   → Pagination\n   → Filtering\n   → Consistent response</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>2. Validation\n   → Pydantic\n   → Input validation\n   → Response model</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>3. Architecture\n   → Router\n   → Service\n   → Repository\n   → Domain logic</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>4. Database\n   → Connection pooling\n   → Transaction\n   → Index\n   → N+1 prevention</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>5. Async\n   → Non-blocking I/O\n   → Async DB\n   → Async HTTP client</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>6. Security\n   → Authentication\n   → Authorization\n   → JWT/OAuth2\n   → CORS\n   → Rate limiting\n   → Secret management</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>7. Reliability\n   → Timeout\n   → Retry\n   → Idempotency\n   → Circuit breaker\n   → Graceful shutdown</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>8. Background processing\n   → Worker\n   → Queue\n   → Retry</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>9. Performance\n   → Cache\n   → Query optimization\n   → Load testing\n   → Horizontal scaling</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>10. Observability\n    → Structured logs\n    → Metrics\n    → Distributed tracing</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>11. Testing\n    → Unit\n    → Integration\n    → API\n    → Async testing</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>12. Deployment\n    → Docker\n    → Uvicorn workers\n    → Reverse proxy\n    → Health checks\n    → CI/CD</code></pre>\n      </div>\n      <h4>Final architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n   ↓\nAPI Gateway / Load Balancer\n   ↓\nFastAPI\n   ↓\nRouter\n   ↓\nDependency\n   ↓\nService / Domain\n   ↓\nRepository\n   ↓\nDatabase</code></pre>\n      </div>\n      <h4>Parallel infrastructure:</h4>\n      <p>FastAPI<br> ├── Redis<br> ├── RabbitMQ/Kafka<br> ├── External APIs<br> ├── Object Storage<br> └── Observability</p>\n      <p>এটাই একটি production-grade FastAPI service-এর overall mental model।</p>\n    "
  }
];
