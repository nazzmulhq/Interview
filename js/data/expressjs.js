const expressInterviewQuestions = [
  {
    "id": "express-1",
    "category": "Express.js",
    "difficulty": "Basic",
    "tags": [
      "Express.js",
      "Node.js",
      "Framework"
    ],
    "question": "Express.js কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Express.js হলো Node.js-এর উপর তৈরি একটি lightweight এবং flexible web framework। এটি মূলত REST API, web application এবং backend service তৈরি করার জন্য ব্যবহার করা হয়।</p>\n      <p><strong>Express ব্যবহার করার প্রধান কারণ:</strong><br>1. Routing সহজ করে।<br>2. Middleware architecture দেয়।<br>3. Request/Response handle করা সহজ।<br>4. REST API তৈরি করা সহজ।<br>5. Error handling করা যায়।<br>6. Authentication/Authorization middleware দিয়ে করা যায়।<br>7. Node.js-এর তুলনায় boilerplate code কম লাগে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\nconst express = require(\"express\");\nconst app = express();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.get(\"/users\", (req, res) =&gt; {\n  res.json({ message: \"Users list\" });\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.listen(3000);</code></pre>\n      </div>\n    "
  },
  {
    "id": "express-2",
    "category": "Express.js",
    "difficulty": "Basic",
    "tags": [
      "Express.js",
      "Architecture"
    ],
    "question": "Express.js কীভাবে কাজ করে?",
    "answer": "\n      <p>Express মূলত একটি middleware এবং routing based request-response framework।</p>\n      <p>Client → HTTP Request → Express Middleware → Router → Controller/Handler → Service → Database → Response</p>\n      <p><strong>যেমন:</strong><br>GET /users</p>\n      <ol>\n        <li>Request Express server-এ আসে।</li>\n        <li>Global middleware execute হয়।</li>\n        <li>Authentication middleware থাকতে পারে।</li>\n        <li>Router matching করে।</li>\n        <li>Controller/handler execute হয়।</li>\n        <li>প্রয়োজন হলে Service ও Database call হয়।</li>\n        <li>Response client-কে পাঠানো হয়।</li>\n      </ol>\n      <p><strong>Express-এর মূল architecture:</strong></p>\n      <ul>\n        <li>Application</li>\n        <li>Middleware</li>\n        <li>Router</li>\n        <li>Controller/Handler</li>\n        <li>Error Handler</li>\n      </ul>\n    "
  },
  {
    "id": "express-3",
    "category": "Express.js",
    "difficulty": "Basic",
    "tags": [
      "Middleware",
      "Request Lifecycle"
    ],
    "question": "Express Middleware কী?",
    "answer": "\n      <p>Middleware হলো এমন একটি function যা request এবং response-এর মাঝখানে execute হয়।</p>\n      <p><strong>Signature:</strong><br>(req, res, next)</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\napp.use((req, res, next) =&gt; {\n  console.log(req.method, req.url);\n  next();\n});</code></pre>\n      </div>\n      <p><strong>Middleware-এর কাজ:</strong></p>\n      <ul>\n        <li>Logging</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Validation</li>\n        <li>Parsing</li>\n        <li>CORS</li>\n        <li>Rate limiting</li>\n        <li>Error handling</li>\n      </ul>\n      <p>next() call করলে পরবর্তী middleware/handler-এ request চলে যায়।</p>\n      <p>next() না দিলে request processing আটকে যেতে পারে।</p>\n    "
  },
  {
    "id": "express-4",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Middleware",
      "next"
    ],
    "question": "next() কী এবং next(err) কী?",
    "answer": "\n      <p>next() পরবর্তী middleware বা route handler-এ request পাঠায়।</p>\n      <p>next():<br>Middleware chain continue করে।</p>\n      <p>next(err):<br>Error middleware-এ control পাঠায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\napp.use((req, res, next) =&gt; {\n  try {\n    // logic\n    next();\n  } catch (error) {\n    next(error);\n  }\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Error middleware:\napp.use((err, req, res, next) =&gt; {\n  res.status(500).json({\n    message: err.message\n  });\n});</code></pre>\n      </div>\n      <p>Express-এ error handling-এর জন্য next(error) খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-5",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Middleware",
      "Types"
    ],
    "question": "Express-এ middleware কত ধরনের?",
    "answer": "\n      <h4>সাধারণভাবে Express middleware কয়েকভাবে ভাগ করা যায়:</h4>\n      <ol>\n        <li>Application-level middleware</li>\n        <li>Router-level middleware</li>\n        <li>Built-in middleware</li>\n        <li>Third-party middleware</li>\n        <li>Error-handling middleware</li>\n      </ol>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Application-level:\napp.use(authMiddleware);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Router-level:\nrouter.use(authMiddleware);</code></pre>\n      </div>\n      <p><strong>Built-in:</strong><br>express.json()<br>express.urlencoded()</p>\n      <p><strong>Third-party:</strong><br>cors()<br>helmet()<br>morgan()</p>\n      <p><strong>Error middleware:</strong><br>(err, req, res, next)</p>\n      <p>Middleware-এর execution order গুরুত্বপূর্ণ। যেই order-এ register করা হয়, সাধারণত সেই order-এই execute হয়।</p>\n    "
  },
  {
    "id": "express-6",
    "category": "Express.js",
    "difficulty": "Basic",
    "tags": [
      "Routing",
      "REST API"
    ],
    "question": "Express Routing কী?",
    "answer": "\n      <p>Routing হলো নির্দিষ্ট HTTP method এবং URL অনুযায়ী নির্দিষ্ট handler execute করা।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\napp.get(\"/users\", getUsers);\napp.post(\"/users\", createUser);\napp.get(\"/users/:id\", getUser);\napp.put(\"/users/:id\", updateUser);\napp.delete(\"/users/:id\", deleteUser);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>HTTP methods:\nGET → data read\nPOST → create\nPUT → full update\nPATCH → partial update\nDELETE → delete</code></pre>\n      </div>\n      <p>Large application-এ router আলাদা file-এ রাখা হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const router = express.Router();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>router.get(\"/\", getUsers);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.use(\"/users\", router);</code></pre>\n      </div>\n    "
  },
  {
    "id": "express-7",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Router",
      "Modular Architecture"
    ],
    "question": "express.Router() কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>express.Router() বড় application-এর route modular করার জন্য ব্যবহার করা হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users.routes.js:\nconst router = express.Router();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>router.get(\"/\", getUsers);\nrouter.post(\"/\", createUser);</code></pre>\n      </div>\n      <p>module.exports = router;</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.js:\napp.use(\"/api/users\", userRouter);</code></pre>\n      </div>\n      <p>এতে application maintainable হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Architecture:\napp.js\n  ↓\nroutes\n  ↓\ncontrollers\n  ↓\nservices\n  ↓\nrepositories\n  ↓\ndatabase</code></pre>\n      </div>\n    "
  },
  {
    "id": "express-8",
    "category": "Express.js",
    "difficulty": "Basic",
    "tags": [
      "Request",
      "Response"
    ],
    "question": "req এবং res কী?",
    "answer": "\n      <p>req হলো incoming HTTP request-এর information এবং res হলো client-কে response পাঠানোর object।</p>\n      <p><strong>req-এর গুরুত্বপূর্ণ properties:</strong><br>req.params<br>req.query<br>req.body<br>req.headers<br>req.cookies<br>req.method<br>req.url</p>\n      <p><strong>res-এর গুরুত্বপূর্ণ methods:</strong><br>res.json()<br>res.send()<br>res.status()<br>res.sendStatus()<br>res.redirect()<br>res.cookie()</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\napp.get(\"/users/:id\", (req, res) =&gt; {\n  const id = req.params.id;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>res.status(200).json({\n    id\n  });\n});</code></pre>\n      </div>\n    "
  },
  {
    "id": "express-9",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Params",
      "Query",
      "Body"
    ],
    "question": "req.params, req.query এবং req.body-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>req.params:<br>URL-এর dynamic অংশের জন্য।</p>\n      <p>GET /users/123<br>req.params.id → 123</p>\n      <p>req.query:<br>URL query parameters-এর জন্য।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /users?page=2&amp;limit=10\nreq.query.page → 2</code></pre>\n      </div>\n      <p>req.body:<br>Request body-এর data-এর জন্য।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>POST /users\n{\n  \"name\": \"Nazmul\",\n  \"email\": \"test@example.com\"\n}</code></pre>\n      </div>\n      <p>req.body.name → Nazmul</p>\n      <p><strong>সংক্ষেপে:</strong><br>params → resource identify<br>query → filtering/pagination/search<br>body → data পাঠানো</p>\n    "
  },
  {
    "id": "express-10",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Body Parser",
      "JSON"
    ],
    "question": "express.json() কী?",
    "answer": "\n      <p>express.json() একটি built-in middleware যা incoming JSON request body parse করে req.body-তে রাখে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.use(express.json());</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>তারপর:\napp.post(\"/users\", (req, res) =&gt; {\n  console.log(req.body);\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Client:\n{\n  \"name\": \"Nazmul\",\n  \"age\": 30\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>req.body:\n{\n  name: \"Nazmul\",\n  age: 30\n}</code></pre>\n      </div>\n      <p>express.json() না থাকলে JSON body সাধারণভাবে req.body-তে পাওয়া যাবে না।</p>\n    "
  },
  {
    "id": "express-11",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "URL Encoding",
      "Parser"
    ],
    "question": "express.urlencoded() কী?",
    "answer": "\n      <p>HTML form থেকে application/x-www-form-urlencoded data parse করার জন্য express.urlencoded() ব্যবহার করা হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.use(express.urlencoded({ extended: true }));</code></pre>\n      </div>\n      <p>এটি সাধারণত form submission-এর ক্ষেত্রে ব্যবহৃত হয়।</p>\n      <p><strong>extended:</strong> true হলে nested object parse করার জন্য richer parser ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "express-12",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Error Handling",
      "Production"
    ],
    "question": "Express.js-এ centralized error handling কীভাবে করবেন?",
    "answer": "\n      <p>একটি centralized error-handling middleware তৈরি করা ভালো।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.use((err, req, res, next) =&gt; {\n  const statusCode = err.statusCode || 500;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>res.status(statusCode).json({\n    success: false,\n    message: err.message || \"Internal Server Error\"\n  });\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Architecture:\nController\n   ↓\nService\n   ↓\nthrow Error\n   ↓\nError Middleware\n   ↓\nStandard Response</code></pre>\n      </div>\n      <p>Production application-এ প্রতিটি controller-এ আলাদা আলাদা error response না লিখে centralized error handler ব্যবহার করা maintainable।</p>\n    "
  },
  {
    "id": "express-13",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Async",
      "Error Handling"
    ],
    "question": "Express-এ async/await error কীভাবে handle করবেন?",
    "answer": "\n      <p>Async handler-এর ভিতরের rejected Promise যেন centralized error handler-এ যায় সেটা নিশ্চিত করতে হবে।</p>\n      <h4>একটি common pattern:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const asyncHandler = (fn) =&gt; {\n  return (req, res, next) =&gt; {\n    Promise.resolve(fn(req, res, next)).catch(next);\n  };\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ব্যবহার:\napp.get(\"/users\", asyncHandler(async (req, res) =&gt; {\n  const users = await userService.getUsers();\n  res.json(users);\n}));</code></pre>\n      </div>\n      <p>এতে প্রতিটি async route-এ try/catch boilerplate কমে যায়।</p>\n    "
  },
  {
    "id": "express-14",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "HTTP",
      "Status Code"
    ],
    "question": "Express API-তে কোন HTTP status code বেশি ব্যবহার করা হয়?",
    "answer": "\n      <p>200 OK → সফল GET/update response<br>201 Created → নতুন resource তৈরি<br>204 No Content → সফল operation কিন্তু response body নেই<br>400 Bad Request → invalid request<br>401 Unauthorized → authentication missing/invalid<br>403 Forbidden → authenticated কিন্তু permission নেই<br>404 Not Found → resource পাওয়া যায়নি<br>409 Conflict → duplicate/conflict<br>422 Unprocessable Entity → validation error<br>429 Too Many Requests → rate limit<br>500 Internal Server Error → server error<br>502 Bad Gateway → upstream service সমস্যা<br>503 Service Unavailable → service unavailable</p>\n      <p><strong>উদাহরণ:</strong><br>res.status(201).json(user);</p>\n    "
  },
  {
    "id": "express-15",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Authentication",
      "JWT"
    ],
    "question": "Express.js-এ JWT authentication কীভাবে implement করবেন?",
    "answer": "\n      <h4>সাধারণ JWT flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Login\n ↓\nValidate username/password\n ↓\nGenerate JWT\n ↓\nClient token store করে\n ↓\nপ্রতিটি protected request-এ token পাঠায়\n ↓\nAuth middleware token verify করে\n ↓\nreq.user সেট করে\n ↓\nController execute হয়</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Header:\nAuthorization: Bearer &lt;token&gt;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Middleware:\nconst token = req.headers.authorization?.split(\" \")[1];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const payload = jwt.verify(token, process.env.JWT_SECRET);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>req.user = payload;\nnext();</code></pre>\n      </div>\n      <p>JWT verify করার পরে user authorization করা যায়।</p>\n    "
  },
  {
    "id": "express-16",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Authentication",
      "Authorization"
    ],
    "question": "Authentication এবং Authorization-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Authentication = তুমি কে?</p>\n      <p><strong>উদাহরণ:</strong><br>Login করার সময় username/password বা token verify করা।</p>\n      <p>Authorization = তুমি কী করতে পারবে?</p>\n      <p><strong>উদাহরণ:</strong><br>Admin user delete করতে পারবে কিন্তু normal user পারবে না।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Flow:\nAuthentication\n    ↓\nUser Identity\n    ↓\nAuthorization\n    ↓\nPermission Check</code></pre>\n      </div>\n      <p>Express application-এ authentication middleware এবং authorization middleware আলাদা রাখা ভালো।</p>\n    "
  },
  {
    "id": "express-17",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "RBAC",
      "Authorization"
    ],
    "question": "Express.js-এ RBAC কীভাবে করবেন?",
    "answer": "\n      <p>RBAC = Role-Based Access Control।</p>\n      <p>প্রথমে authentication user-এর role বের করবে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>req.user = {\n  id: 1,\n  role: \"admin\"\n};</code></pre>\n      </div>\n      <h4>তারপর authorization middleware:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const authorize = (...roles) =&gt; {\n  return (req, res, next) =&gt; {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({\n        message: \"Forbidden\"\n      });\n    }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>next();\n  };\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Route:\nrouter.delete(\n  \"/users/:id\",\n  authenticate,\n  authorize(\"admin\"),\n  deleteUser\n);</code></pre>\n      </div>\n      <p>এতে শুধুমাত্র admin user delete operation করতে পারবে।</p>\n    "
  },
  {
    "id": "express-18",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "CORS",
      "Security"
    ],
    "question": "CORS কী এবং Express-এ কীভাবে configure করবেন?",
    "answer": "\n      <p>CORS = Cross-Origin Resource Sharing।</p>\n      <p>যখন frontend এবং backend আলাদা origin-এ থাকে তখন browser security policy-এর কারণে cross-origin request control করতে CORS প্রয়োজন হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\nconst cors = require(\"cors\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.use(cors({\n  origin: \"https://example.com\",\n  credentials: true\n}));</code></pre>\n      </div>\n      <p>Production-এ সাধারণত wildcard (*) দিয়ে credentials-enabled API expose না করে নির্দিষ্ট origin allow করা নিরাপদ।</p>\n    "
  },
  {
    "id": "express-19",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Security",
      "Helmet"
    ],
    "question": "Helmet কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Helmet Express application-এর security-related HTTP headers configure করতে সাহায্য করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const helmet = require(\"helmet\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.use(helmet());</code></pre>\n      </div>\n      <p>এটি বিভিন্ন browser security header সেট করতে সাহায্য করে।</p>\n      <p><strong>উদাহরণ:</strong></p>\n      <ul>\n        <li>Content-Security-Policy</li>\n        <li>X-Content-Type-Options</li>\n        <li>Referrer-Policy</li>\n        <li>অন্যান্য security headers</li>\n      </ul>\n      <p>Production API-তে security hardening-এর জন্য Helmet সাধারণত ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "express-20",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Rate Limiting",
      "Security"
    ],
    "question": "Express API-তে Rate Limiting কেন দরকার?",
    "answer": "\n      <p>Rate limiting একটি client নির্দিষ্ট সময়ের মধ্যে কত request করতে পারবে সেটা control করে।</p>\n      <p><strong>প্রয়োজন:</strong><br>1. Brute-force attack কমানো।<br>2. API abuse প্রতিরোধ।<br>3. Resource protection।<br>4. DDoS-এর কিছু application-level impact কমানো।</p>\n      <p><strong>উদাহরণ:</strong><br>100 requests / 15 minutes / IP</p>\n      <p>Production-এ distributed system হলে Redis-backed rate limiter ব্যবহার করা যেতে পারে, যাতে multiple API instances একই rate-limit state share করতে পারে।</p>\n    "
  },
  {
    "id": "express-21",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Validation",
      "API"
    ],
    "question": "Express.js API request validation কীভাবে করবেন?",
    "answer": "\n      <p>Client input কখনো সরাসরি trust করা উচিত নয়।</p>\n      <p><strong>Validation library ব্যবহার করা যায়:</strong></p>\n      <ul>\n        <li>Zod</li>\n        <li>Joi</li>\n        <li>express-validator</li>\n        <li>Yup</li>\n      </ul>\n      <p><strong>উদাহরণ concept:</strong><br>POST /users</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"email\": \"invalid\",\n  \"age\": -5\n}</code></pre>\n      </div>\n      <p>Validation middleware request reject করবে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Flow:\nRequest\n ↓\nValidation\n ↓\nController\n ↓\nService</code></pre>\n      </div>\n      <p>Validation controller-এর আগে করা ভালো, যাতে invalid data application-এর ভিতরে না যায়।</p>\n    "
  },
  {
    "id": "express-22",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "API",
      "Validation"
    ],
    "question": "Input validation এবং sanitization-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Validation check করে input valid কিনা।</p>\n      <p><strong>উদাহরণ:</strong><br>email অবশ্যই valid email হতে হবে।</p>\n      <p>Sanitization input-এর unwanted বা dangerous অংশ remove/normalize করে।</p>\n      <p><strong>উদাহরণ:</strong></p>\n      <ul>\n        <li>trim whitespace</li>\n        <li>normalize input</li>\n        <li>unwanted HTML remove করা</li>\n      </ul>\n      <p><strong>Validation:</strong><br>\"এটা valid?\"</p>\n      <p><strong>Sanitization:</strong><br>\"Input-টাকে safe/normalized form-এ কীভাবে আনব?\"</p>\n      <p>দুটোই API security এবং data integrity-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-23",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "API Versioning",
      "REST"
    ],
    "question": "Express API versioning কীভাবে করবেন?",
    "answer": "\n      <p>API versioning করলে existing client না ভেঙে নতুন API version release করা যায়।</p>\n      <h4>Common approach:</h4>\n      <p>/api/v1/users<br>/api/v2/users</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Express:\napp.use(\"/api/v1/users\", userV1Router);\napp.use(\"/api/v2/users\", userV2Router);</code></pre>\n      </div>\n      <p><strong>Versioning করার সুবিধা:</strong></p>\n      <ul>\n        <li>Backward compatibility</li>\n        <li>Gradual migration</li>\n        <li>Multiple client version support</li>\n      </ul>\n      <p>Large production API-তে breaking change হলে versioning গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-24",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Pagination",
      "Filtering",
      "REST API"
    ],
    "question": "Express API-তে pagination, filtering এবং sorting কীভাবে design করবেন?",
    "answer": "\n      <p>Query parameters ব্যবহার করা যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /products?page=2&amp;limit=20\nGET /products?category=electronics\nGET /products?sort=price&amp;order=asc</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Backend flow:\nRequest\n ↓\nParse query\n ↓\nValidate query\n ↓\nBuild database query\n ↓\nReturn data + metadata</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Response:\n{\n  \"data\": [],\n  \"meta\": {\n    \"page\": 2,\n    \"limit\": 20,\n    \"total\": 250,\n    \"totalPages\": 13\n  }\n}</code></pre>\n      </div>\n      <p>Production API-তে limit-এর maximum value enforce করা উচিত।</p>\n    "
  },
  {
    "id": "express-25",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "REST API",
      "Idempotency"
    ],
    "question": "Express API-তে idempotency কী?",
    "answer": "\n      <p>একই request একাধিকবার execute হলেও ফলাফল যেন unintendedভাবে duplicate না হয় সেটাই idempotency।</p>\n      <p>বিশেষ করে payment/order API-তে গুরুত্বপূর্ণ।</p>\n      <p><strong>উদাহরণ:</strong><br>POST /payments</p>\n      <p><strong>Header:</strong><br><strong>Idempotency-Key:</strong> abc123</p>\n      <p>Server প্রথম request-এর result store করবে।</p>\n      <p>একই key দিয়ে আবার request এলে নতুন payment তৈরি না করে আগের result return করবে।</p>\n      <p>এটি network retry এবং distributed systems-এর ক্ষেত্রে খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-26",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Database",
      "Architecture"
    ],
    "question": "Express application-এ Controller, Service এবং Repository layer কেন আলাদা করবেন?",
    "answer": "\n      <p>Separation of concerns-এর জন্য।</p>\n      <p><strong>Controller:</strong><br>HTTP request/response handle করে।</p>\n      <p><strong>Service:</strong><br>Business logic handle করে।</p>\n      <p><strong>Repository:</strong><br>Database access handle করে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n  ↓\nController\n  ↓\nService\n  ↓\nRepository\n  ↓\nDatabase</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\nController:\nconst users = await userService.getUsers();</code></pre>\n      </div>\n      <p><strong>Service:</strong><br>business rules apply করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Repository:\nreturn db.user.findMany();</code></pre>\n      </div>\n      <p>এতে testing, maintenance এবং scaling সহজ হয়।</p>\n    "
  },
  {
    "id": "express-27",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Architecture",
      "Clean Architecture"
    ],
    "question": "Express.js-এর জন্য ভালো production folder structure কেমন হতে পারে?",
    "answer": "\n      <h4>একটি scalable structure:</h4>\n      <p>src/<br>├── config/<br>├── routes/<br>├── controllers/<br>├── services/<br>├── repositories/<br>├── models/<br>├── middlewares/<br>├── validators/<br>├── utils/<br>├── errors/<br>├── jobs/<br>├── events/<br>├── app.js<br>└── server.js</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.js:\nExpress configuration, middleware এবং routes।</code></pre>\n      </div>\n      <p>server.js:<br>HTTP server start এবং infrastructure-level startup।</p>\n      <p>এই separation testing এবং application bootstrap clean রাখতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "express-28",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "app.js",
      "server.js"
    ],
    "question": "app.js এবং server.js আলাদা করার সুবিধা কী?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.js সাধারণত Express application configure করে।</code></pre>\n      </div>\n      <p><strong>server.js:</strong></p>\n      <ul>\n        <li>Port listen করে</li>\n        <li>Database connection</li>\n        <li>Server startup</li>\n        <li>Graceful shutdown-এর মতো bootstrap কাজ handle করতে পারে।</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.js:\nconst app = express();\napp.use(...);\nmodule.exports = app;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>server.js:\nconst app = require(\"./app\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.listen(PORT);</code></pre>\n      </div>\n      <p>এতে app-কে integration test-এ সরাসরি import করা যায় এবং test চালানোর সময় আলাদা server listener প্রয়োজন হয় না।</p>\n    "
  },
  {
    "id": "express-29",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Testing",
      "Supertest"
    ],
    "question": "Express API কীভাবে test করবেন?",
    "answer": "\n      <p><strong>Testing-এর জন্য সাধারণত ব্যবহার করা যায়:</strong></p>\n      <ul>\n        <li>Jest</li>\n        <li>Vitest</li>\n        <li>Supertest</li>\n      </ul>\n      <p><strong>Test types:</strong><br>1. Unit test<br>2. Integration test<br>3. API/E2E test</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Supertest দিয়ে:\nrequest(app)\n  .get(\"/users\")\n  .expect(200);</code></pre>\n      </div>\n      <p><strong>Unit test:</strong><br>Service-এর business logic আলাদাভাবে test।</p>\n      <p><strong>Integration test:</strong><br>API + database interaction test।</p>\n      <p><strong>E2E:</strong><br>Realistic user flow test।</p>\n      <p>Production-quality application-এ critical business logic এবং API endpoints test করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-30",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Logging",
      "Observability"
    ],
    "question": "Express application-এ logging কীভাবে করবেন?",
    "answer": "\n      <p>Production application-এ console.log-এর পরিবর্তে structured logging ব্যবহার করা ভালো।</p>\n      <p><strong>Common tools:</strong></p>\n      <ul>\n        <li>Pino</li>\n        <li>Winston</li>\n      </ul>\n      <p><strong>Log করতে পারেন:</strong></p>\n      <ul>\n        <li>request ID</li>\n        <li>method</li>\n        <li>URL</li>\n        <li>status code</li>\n        <li>response time</li>\n        <li>error</li>\n        <li>user/service context</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Example:\n{\n  \"level\": \"info\",\n  \"requestId\": \"abc123\",\n  \"method\": \"GET\",\n  \"path\": \"/users\",\n  \"status\": 200,\n  \"duration\": 35\n}</code></pre>\n      </div>\n      <p>Distributed system-এ request ID/trace ID অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-31",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Request ID",
      "Distributed Systems"
    ],
    "question": "Request ID বা Correlation ID কী?",
    "answer": "\n      <p>একটি request-এর জন্য unique ID generate করে পুরো request lifecycle-এ carry করা হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓ request-id: abc123\nAPI Gateway\n ↓ abc123\nExpress Service\n ↓ abc123\nOrder Service\n ↓ abc123\nPayment Service</code></pre>\n      </div>\n      <p>এতে একটি distributed request-এর সব log একসাথে খুঁজে পাওয়া যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Middleware:\nreq.id = crypto.randomUUID();</code></pre>\n      </div>\n      <p>তারপর logger-এ req.id ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "express-32",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Graceful Shutdown",
      "Production"
    ],
    "question": "Express server-এ graceful shutdown কী?",
    "answer": "\n      <p>Application বন্ধ করার সময় নতুন request গ্রহণ বন্ধ করে existing request শেষ করার process হলো graceful shutdown।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Typical flow:\nSIGTERM\n ↓\nStop accepting new traffic\n ↓\nFinish existing requests\n ↓\nClose DB connection\n ↓\nClose Redis/Kafka/RabbitMQ connection\n ↓\nExit process</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ:\nprocess.on(\"SIGTERM\", async () =&gt; {\n  server.close(async () =&gt; {\n    await db.close();\n    process.exit(0);\n  });\n});</code></pre>\n      </div>\n      <p>Docker এবং Kubernetes environment-এ graceful shutdown বিশেষভাবে গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "express-33",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Performance",
      "Node.js"
    ],
    "question": "Express.js application-এর performance কীভাবে improve করবেন?",
    "answer": "\n      <h4>গুরুত্বপূর্ণ optimization:</h4>\n      <ol>\n        <li>Async I/O ব্যবহার।</li>\n        <li>Blocking operation avoid করা।</li>\n        <li>Database indexing।</li>\n        <li>Connection pooling।</li>\n        <li>Redis caching।</li>\n        <li>Response compression।</li>\n        <li>Pagination।</li>\n        <li>Efficient queries।</li>\n        <li>Rate limiting।</li>\n        <li>Load balancing।</li>\n        <li>Horizontal scaling।</li>\n        <li>Production logging optimize করা।</li>\n      </ol>\n      <p>সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো bottleneck measure করে optimization করা।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Flow:\nMetrics\n ↓\nFind bottleneck\n ↓\nOptimize\n ↓\nLoad test\n ↓\nMeasure again</code></pre>\n      </div>\n    "
  },
  {
    "id": "express-34",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Caching",
      "Redis"
    ],
    "question": "Express API-তে Redis caching কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p>যেসব data বারবার read হয় সেগুলোর জন্য Redis cache ব্যবহার করা যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCheck Redis\n ↓\nCache hit → Return\n ↓\nCache miss\n ↓\nDatabase\n ↓\nSave Redis\n ↓\nReturn</code></pre>\n      </div>\n      <p><strong>Example:</strong><br>GET /products/10</p>\n      <p><strong>Redis key:</strong><br>product:10</p>\n      <p>Cache hit হলে database query প্রয়োজন হয় না।</p>\n      <p>তবে cache invalidation strategy গুরুত্বপূর্ণ।</p>\n      <p><strong>যেমন product update হলে:</strong><br>DEL product:10</p>\n    "
  },
  {
    "id": "express-35",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Transactions",
      "Database"
    ],
    "question": "Express API-তে database transaction কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>যখন একটি business operation-এর একাধিক database operation atomicভাবে execute করতে হয় তখন transaction প্রয়োজন।</p>\n      <p><strong>উদাহরণ:</strong><br>Transfer $100</p>\n      <ol>\n        <li>Account A থেকে -100</li>\n        <li>Account B-তে +100</li>\n      </ol>\n      <p>একটি সফল এবং অন্যটি failed হলে data inconsistent হবে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Transaction:\nBEGIN\n ↓\nDebit\n ↓\nCredit\n ↓\nCOMMIT</code></pre>\n      </div>\n      <p><strong>যদি error:</strong><br>ROLLBACK</p>\n      <p>Express নিজে transaction manage করে না। Database/ORM layer transaction manage করে।</p>\n    "
  },
  {
    "id": "express-36",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "File Upload",
      "Multipart"
    ],
    "question": "Express-এ file upload কীভাবে handle করবেন?",
    "answer": "\n      <p>multipart/form-data request handle করার জন্য Multer-এর মতো middleware ব্যবহার করা যায়।</p>\n      <h4>Typical flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nmultipart/form-data\n ↓\nUpload middleware\n ↓\nValidation\n ↓\nStorage\n ↓\nDatabase metadata</code></pre>\n      </div>\n      <p>Production-এ বড় file application server-এর local filesystem-এ না রেখে object storage যেমন S3-compatible storage ব্যবহার করা ভালো।</p>\n      <p>Database-এ সাধারণত file-এর URL/key রাখা হয়, binary file নয়।</p>\n    "
  },
  {
    "id": "express-37",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "Cookies",
      "Session"
    ],
    "question": "Express-এ cookie কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p>Cookie client browser-এ ছোট data রাখার জন্য ব্যবহার করা যায়।</p>\n      <p><strong>Common use:</strong></p>\n      <ul>\n        <li>Session ID</li>\n        <li>Refresh token</li>\n        <li>Preferences</li>\n      </ul>\n      <p><strong>Security-related cookie হলে সাধারণত:</strong><br>HttpOnly<br>Secure<br>SameSite</p>\n      <p>ব্যবহার করা হয়।</p>\n      <p>HttpOnly → JavaScript থেকে cookie access কমায়।<br>Secure → HTTPS connection-এ পাঠায়।<br>SameSite → cross-site request behavior control করে।</p>\n      <p>Authentication design অনুযায়ী cookie-based session অথবা token-based approach ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "express-38",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "CSRF",
      "Security"
    ],
    "question": "CSRF কী এবং Express application-এ কীভাবে prevent করবেন?",
    "answer": "\n      <p>CSRF = Cross-Site Request Forgery।</p>\n      <p>বিশেষ করে cookie-based authentication-এ attacker victim-এর browser ব্যবহার করে unwanted request করানোর চেষ্টা করতে পারে।</p>\n      <p><strong>Protection:</strong><br>1. SameSite cookie।<br>2. CSRF token।<br>3. Origin/Referer validation যেখানে appropriate।<br>4. Proper authentication design।</p>\n      <p>Bearer token header-based authentication সাধারণত browser cookie-based CSRF-এর একই ধরনের risk বহন করে না, তবে XSS এবং token storage-এর ঝুঁকি আলাদাভাবে বিবেচনা করতে হয়।</p>\n    "
  },
  {
    "id": "express-39",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "SQL Injection",
      "Security"
    ],
    "question": "Express.js API-তে SQL Injection কীভাবে prevent করবেন?",
    "answer": "\n      <p>User input সরাসরি SQL query string-এর সাথে concatenate করা উচিত নয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Unsafe:\nconst sql = \"SELECT * FROM users WHERE id = \" + req.params.id;</code></pre>\n      </div>\n      <p><strong>Safe approach:</strong></p>\n      <ul>\n        <li>Parameterized query</li>\n        <li>Prepared statements</li>\n        <li>Trusted ORM/query builder</li>\n        <li>Input validation</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>উদাহরণ concept:\nSELECT * FROM users WHERE id = ?</code></pre>\n      </div>\n      <p>এখানে user input query structure-এর অংশ না হয়ে parameter হিসেবে যায়।</p>\n    "
  },
  {
    "id": "express-40",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "NoSQL Injection",
      "Security"
    ],
    "question": "NoSQL Injection কীভাবে prevent করবেন?",
    "answer": "\n      <p>MongoDB-এর মতো NoSQL database-এ malicious query object পাঠিয়ে query behavior পরিবর্তনের চেষ্টা করা হতে পারে।</p>\n      <p><strong>Protection:</strong><br>1. Input validation।<br>2. Schema validation।<br>3. User input সরাসরি query object হিসেবে ব্যবহার না করা।<br>4. Allowed fields whitelist করা।<br>5. MongoDB/ODM security best practices অনুসরণ করা।</p>\n      <p>যেমন login query-তে সম্পূর্ণ req.body database filter হিসেবে ব্যবহার না করে শুধুমাত্র expected fields ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "express-41",
    "category": "Express.js",
    "difficulty": "Important",
    "tags": [
      "OpenAPI",
      "Swagger",
      "Documentation"
    ],
    "question": "Express API কীভাবে document করবেন?",
    "answer": "\n      <p>REST API documentation-এর জন্য OpenAPI/Swagger ব্যবহার করা যায়।</p>\n      <p><strong>Documentation-এ থাকা উচিত:</strong></p>\n      <ul>\n        <li>Endpoint</li>\n        <li>HTTP method</li>\n        <li>Parameters</li>\n        <li>Request body</li>\n        <li>Response</li>\n        <li>Status codes</li>\n        <li>Authentication</li>\n        <li>Error response</li>\n      </ul>\n      <p><strong>Example:</strong><br>GET /api/v1/users</p>\n      <p>Swagger UI ব্যবহার করলে developer browser থেকেই API দেখতে এবং test করতে পারে।</p>\n      <p>Documentation API development এবং frontend/mobile integration সহজ করে।</p>\n    "
  },
  {
    "id": "express-42",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "API Gateway",
      "Microservices"
    ],
    "question": "Microservices architecture-এ Express.js-এর ভূমিকা কী হতে পারে?",
    "answer": "\n      <p>Express.js একটি individual microservice তৈরি করতে ব্যবহার করা যায়।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API Gateway\n    ↓\n ┌───────────────┐\n ↓       ↓       ↓\nUser    Order   Payment\nService Service Service\n ↓       ↓       ↓\nDB      DB      DB</code></pre>\n      </div>\n      <p>প্রতিটি service আলাদা Express application হতে পারে।</p>\n      <p><strong>Express-এর দায়িত্ব:</strong></p>\n      <ul>\n        <li>HTTP API</li>\n        <li>Routing</li>\n        <li>Middleware</li>\n        <li>Validation</li>\n        <li>Authentication integration</li>\n        <li>Error handling</li>\n      </ul>\n      <p>Business logic service layer-এ রাখা উচিত।</p>\n    "
  },
  {
    "id": "express-43",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Microservices",
      "Resilience"
    ],
    "question": "Express microservice-এ Retry এবং Circuit Breaker কেন দরকার?",
    "answer": "\n      <p>Distributed system-এ একটি service অন্য service-এর উপর নির্ভর করতে পারে।</p>\n      <h4>যদি Payment Service temporarily unavailable হয়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n   ↓\nPayment Service ❌</code></pre>\n      </div>\n      <p>Retry transient failure handle করতে পারে।</p>\n      <p>কিন্তু unlimited retry করলে system overload হতে পারে।</p>\n      <p><strong>Circuit breaker:</strong><br>Closed → requests pass<br>Open → requests immediately fail<br>Half-open → limited test request</p>\n      <p>এতে failing downstream service-এর কারণে পুরো system cascade failure-এ পড়া থেকে কিছুটা রক্ষা পায়।</p>\n    "
  },
  {
    "id": "express-44",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Queues",
      "Background Jobs"
    ],
    "question": "Express API থেকে background job কেন ব্যবহার করবেন?",
    "answer": "\n      <p>যেসব কাজ user response-এর জন্য অপেক্ষা করানো প্রয়োজন নেই সেগুলো background job-এ পাঠানো যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>উদাহরণ:\nPOST /orders\n ↓\nCreate Order\n ↓\nQueue Job\n ↓\nReturn 201</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Background worker:\nQueue\n ↓\nSend Email\n ↓\nGenerate Invoice\n ↓\nNotification</code></pre>\n      </div>\n      <p><strong>Tools:</strong></p>\n      <ul>\n        <li>BullMQ</li>\n        <li>RabbitMQ</li>\n        <li>Kafka</li>\n      </ul>\n      <p>এতে API response দ্রুত হয় এবং heavy কাজ আলাদা worker process-এ করা যায়।</p>\n    "
  },
  {
    "id": "express-45",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Scalability",
      "Cluster"
    ],
    "question": "Express.js application কীভাবে horizontally scale করবেন?",
    "answer": "\n      <p>একটি server-এর CPU/RAM বাড়ানোর পরিবর্তে multiple application instances চালানোকে horizontal scaling বলা হয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Load Balancer\n      ↓\n ┌────┼────┐\n ↓    ↓    ↓\nAPI1 API2 API3\n ↓    ↓    ↓\nShared DB/Redis</code></pre>\n      </div>\n      <p>Stateless application হলে scaling সহজ হয়।</p>\n      <p>যদি session state local memory-তে রাখা হয়, multiple instances-এর মধ্যে সমস্যা হতে পারে। তখন shared session store বা stateless authentication ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "express-46",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Streams",
      "Performance"
    ],
    "question": "Express.js-এ Stream কী এবং কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Stream বড় data একবারে memory-তে load না করে chunk-by-chunk process করতে দেয়।</p>\n      <p><strong>Useful for:</strong></p>\n      <ul>\n        <li>Large file download</li>\n        <li>Video/audio</li>\n        <li>Large CSV</li>\n        <li>Large database export</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Concept:\nFile\n ↓\nReadable Stream\n ↓\nExpress Response\n ↓\nClient</code></pre>\n      </div>\n      <p>এতে memory usage কমতে পারে।</p>\n      <p>res.pipe() অথবা stream pipeline-এর মতো Node.js stream API ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "express-47",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Compression",
      "Performance"
    ],
    "question": "Express API response compression কী?",
    "answer": "\n      <p>Response compression network payload size কমায়।</p>\n      <p><strong>Common compression:</strong></p>\n      <ul>\n        <li>gzip</li>\n        <li>Brotli</li>\n      </ul>\n      <p>Express application-এ compression middleware ব্যবহার করা যায়।</p>\n      <p><strong>সুবিধা:</strong></p>\n      <ul>\n        <li>কম bandwidth</li>\n        <li>Faster transfer</li>\n        <li>Large JSON response-এর ক্ষেত্রে benefit</li>\n      </ul>\n      <p>তবে CPU cost এবং proxy/CDN configuration বিবেচনা করতে হবে।</p>\n    "
  },
  {
    "id": "express-48",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Health Check",
      "Kubernetes",
      "Production"
    ],
    "question": "Express application-এ health check endpoint কেন দরকার?",
    "answer": "\n      <p>Deployment platform বা load balancer service healthy কিনা জানতে health endpoint ব্যবহার করে।</p>\n      <p><strong>Liveness:</strong><br>GET /health/live</p>\n      <p><strong>Readiness:</strong><br>GET /health/ready</p>\n      <p>Liveness → process বেঁচে আছে কিনা।</p>\n      <p>Readiness → traffic নেওয়ার জন্য service ready কিনা।</p>\n      <p>Readiness check-এ database বা required dependency connectivity বিবেচনা করা যেতে পারে, তবে অতিরিক্ত dependency check যেন নিজেই health endpoint-কে fragile না করে।</p>\n    "
  },
  {
    "id": "express-49",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Observability",
      "Tracing"
    ],
    "question": "Express application-এ distributed tracing কী?",
    "answer": "\n      <p>Distributed tracing একটি request বিভিন্ন service-এর মধ্যে কীভাবে travel করেছে সেটা track করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nOrder Service\n ↓\nPayment Service\n ↓\nNotification Service</code></pre>\n      </div>\n      <p>একটি Trace ID-এর অধীনে বিভিন্ন Span থাকে।</p>\n      <p><strong>Trace:</strong><br>abc123</p>\n      <p><strong>Spans:</strong><br><strong>API Gateway:</strong> 10ms<br><strong>Order Service:</strong> 50ms<br><strong>Payment Service:</strong> 500ms</p>\n      <p>এতে bottleneck এবং distributed failure খুঁজে বের করা সহজ হয়।</p>\n      <p>OpenTelemetry একটি common observability standard/tooling ecosystem।</p>\n    "
  },
  {
    "id": "express-50",
    "category": "Express.js",
    "difficulty": "Advanced",
    "tags": [
      "Production",
      "System Design"
    ],
    "question": "একটি production-ready Express.js REST API কীভাবে design করবেন?",
    "answer": "\n      <h4>একটি ভালো production architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n  ↓\nLoad Balancer / API Gateway\n  ↓\nExpress API\n  ↓\nMiddleware\n  ├── Request ID\n  ├── Authentication\n  ├── Authorization\n  ├── Validation\n  ├── Rate Limit\n  └── Logging\n  ↓\nController\n  ↓\nService\n  ↓\nRepository\n  ↓\nDatabase</code></pre>\n      </div>\n      <p><strong>Supporting infrastructure:</strong></p>\n      <ul>\n        <li>Redis → caching/session/rate limiting</li>\n        <li>Message Queue → background jobs</li>\n        <li>Object Storage → files</li>\n        <li>Monitoring → metrics</li>\n        <li>OpenTelemetry → tracing</li>\n        <li>Centralized Logging → logs</li>\n        <li>Secrets Manager/Environment → secrets</li>\n      </ul>\n      <p><strong>Security:</strong></p>\n      <ul>\n        <li>HTTPS</li>\n        <li>Helmet/security headers</li>\n        <li>CORS configuration</li>\n        <li>Input validation</li>\n        <li>Parameterized queries</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Rate limiting</li>\n      </ul>\n      <p><strong>Reliability:</strong></p>\n      <ul>\n        <li>Timeout</li>\n        <li>Retry with backoff</li>\n        <li>Circuit breaker</li>\n        <li>Idempotency</li>\n        <li>Graceful shutdown</li>\n        <li>Health/readiness checks</li>\n      </ul>\n      <p><strong>Scalability:</strong></p>\n      <ul>\n        <li>Stateless API</li>\n        <li>Horizontal scaling</li>\n        <li>Load balancing</li>\n        <li>Database optimization</li>\n        <li>Cache</li>\n      </ul>\n      <p>Interview-এ সবচেয়ে গুরুত্বপূর্ণ হলো শুধু Express-এর API লিখতে পারা নয়; বরং request lifecycle, middleware, error handling, security, database interaction, testing, observability এবং production scalability বুঝতে পারা।</p>\n    "
  }
];
