const nodejsInterviewQuestions = [

  // ============================================================
  // NODE.JS FUNDAMENTALS
  // ============================================================

  {
    id: "node-1",
    category: "Node.js Fundamentals",
    difficulty: "Very Important",
    tags: ["Node.js", "Runtime"],
    question: "Node.js কী?",
    answer: `Node.js হলো একটি JavaScript runtime environment, যা browser-এর বাইরে JavaScript execute করতে দেয়।

Node.js V8 JavaScript engine ব্যবহার করে এবং non-blocking I/O model-এর মাধ্যমে network-intensive application তৈরি করতে খুব ভালো কাজ করে।

Architecture:

Client
 ↓
Node.js
 ↓
V8 Engine
 ↓
JavaScript Execution

এর সাথে libuv asynchronous I/O, event loop এবং OS-level operations handle করতে সাহায্য করে।

Common use cases:

- REST API
- Real-time application
- WebSocket
- Microservices
- Streaming
- CLI tools
- BFF/API gateway

Node.js CPU-heavy কাজের চেয়ে I/O-heavy application-এর জন্য বেশি উপযোগী।`
  },

  {
    id: "node-2",
    category: "Node.js Fundamentals",
    difficulty: "Very Important",
    tags: ["Node.js", "V8"],
    question: "V8 Engine কী?",
    answer: `V8 হলো Google-এর JavaScript engine, যা Chrome এবং Node.js-এ JavaScript execute করে।

Node.js-এর ক্ষেত্রে:

JavaScript
 ↓
V8
 ↓
Machine Code

V8-এর গুরুত্বপূর্ণ কাজ:

- JavaScript parsing
- Bytecode generation
- JIT compilation
- Optimization
- Garbage collection

Node.js নিজে JavaScript engine নয়।

Node.js runtime = V8 + libuv + Node APIs + অন্যান্য runtime components।`
  },

  {
    id: "node-3",
    category: "Node.js Fundamentals",
    difficulty: "Very Important",
    tags: ["Node.js", "Runtime"],
    question: "Node.js কি single-threaded?",
    answer: `Node.js-এর JavaScript execution model মূলত single main thread-এর উপর চলে।

কিন্তু এর মানে Node.js পুরোপুরি single-threaded নয়।

Architecture:

Main JS Thread
      ↓
Event Loop
      ↓
libuv
      ↓
OS / Thread Pool

CPU-heavy বা কিছু asynchronous operations-এর জন্য libuv thread pool ব্যবহার করতে পারে।

এছাড়া Node.js Worker Threads ব্যবহার করে সত্যিকারের parallel JavaScript execution করা যায়।

তাই interview-এ বলা ভালো:

"Node.js uses a single main JavaScript thread with an asynchronous event-driven architecture, while background work can use the OS or libuv thread pool, and CPU parallelism can be achieved with worker threads or processes."`
  },

  {
    id: "node-4",
    category: "Node.js Fundamentals",
    difficulty: "Very Important",
    tags: ["Node.js", "Architecture"],
    question: "Node.js-এর architecture কীভাবে কাজ করে?",
    answer: `Simplified architecture:

                Client
                   ↓
              Node.js Server
                   ↓
             Event Loop
                   ↓
       ┌───────────┴───────────┐
       ↓                       ↓
   Call Stack              libuv
                               ↓
                    ┌──────────┴──────────┐
                    ↓                     ↓
                  OS I/O              Thread Pool
                    ↓                     ↓
                 Callback/Event Queue
                    ↓
                Event Loop
                    ↓
                JavaScript

Node.js মূলত event-driven এবং non-blocking architecture ব্যবহার করে।

একটি request-এর জন্য blocking না করে অন্য request process করা যায়।`
  },

  {
    id: "node-5",
    category: "Node.js Fundamentals",
    difficulty: "Very Important",
    tags: ["Node.js", "Non Blocking"],
    question: "Blocking এবং Non-blocking I/O কী?",
    answer: `Blocking operation current execution flow-কে অপেক্ষা করায়।

Example:

const data = fs.readFileSync("file.txt");

এখানে file read শেষ না হওয়া পর্যন্ত current thread অপেক্ষা করে।

Non-blocking:

fs.readFile("file.txt", (err, data) => {
  // callback
});

এখানে Node.js file read-এর জন্য অপেক্ষা না করে অন্য কাজ করতে পারে।

Node.js-এর scalability-এর একটি বড় কারণ হলো non-blocking I/O।`
  },

  // ============================================================
  // EVENT LOOP
  // ============================================================

  {
    id: "node-6",
    category: "Event Loop",
    difficulty: "Very Important",
    tags: ["Event Loop", "Async"],
    question: "Node.js Event Loop কী?",
    answer: `Event Loop হলো Node.js-এর asynchronous operation coordination mechanism।

Simplified:

Call Stack
   ↓
Async Operation
   ↓
libuv / OS
   ↓
Callback Queue
   ↓
Event Loop
   ↓
Call Stack

Event Loop continuously check করে:

- Call stack empty কি না
- কোন callback ready কি না
- Timer ready কি না
- I/O event ready কি না

তারপর appropriate callback JavaScript execution-এর জন্য stack-এ পাঠায়।

এভাবেই Node.js blocking না করে অনেক I/O request handle করতে পারে।`
  },

  {
    id: "node-7",
    category: "Event Loop",
    difficulty: "Very Important",
    tags: ["Event Loop", "Phases"],
    question: "Node.js Event Loop-এর phases কী কী?",
    answer: `Node.js event loop-এর প্রধান phases:

1. Timers
2. Pending callbacks
3. Idle, prepare
4. Poll
5. Check
6. Close callbacks

Concept:

Timers
 ↓
Pending callbacks
 ↓
Poll
 ↓
Check
 ↓
Close callbacks

প্রতিটি phase-এর নিজস্ব callback handling behavior আছে।

Interview-এ শুধু list নয়, Poll এবং Check phase-এর role জানা গুরুত্বপূর্ণ।`
  },

  {
    id: "node-8",
    category: "Event Loop",
    difficulty: "Very Important",
    tags: ["setTimeout", "setImmediate"],
    question: "setTimeout() এবং setImmediate() এর মধ্যে পার্থক্য কী?",
    answer: `setTimeout(callback, 0) timer phase-এর সাথে সম্পর্কিত।

setImmediate(callback) check phase-এ execute হয়।

I/O callback-এর ভিতরে:

fs.readFile("file.txt", () => {
  setTimeout(() => console.log("timeout"), 0);

  setImmediate(() => console.log("immediate"));
});

এক্ষেত্রে সাধারণত setImmediate আগে execute হওয়ার সম্ভাবনা বেশি।

কিন্তু top-level code-এ:

setTimeout(..., 0);
setImmediate(...);

কোনটি আগে হবে তা নির্ভর করতে পারে environment এবং timing-এর উপর।

তাই "setTimeout always আগে" বলা ভুল।`
  },

  {
    id: "node-9",
    category: "Event Loop",
    difficulty: "Very Important",
    tags: ["process.nextTick", "Microtask"],
    question: "process.nextTick() কী?",
    answer: `process.nextTick() current operation-এর পর খুব high-priority callback হিসেবে execute হয়।

Example:

console.log("A");

process.nextTick(() => {
  console.log("B");
});

console.log("C");

Result:

A
C
B

nextTick queue সাধারণ event loop progression-এর আগে process হয়।

অতিরিক্ত recursive nextTick ব্যবহার করলে event loop starvation হতে পারে।`
  },

  {
    id: "node-10",
    category: "Event Loop",
    difficulty: "Very Important",
    tags: ["Promise", "Microtask"],
    question: "Promise microtask এবং process.nextTick-এর relationship কী?",
    answer: `Node.js-এ process.nextTick queue এবং Promise microtask queue খুব high priority asynchronous queues।

সাধারণভাবে:

Current JS execution
 ↓
process.nextTick queue
 ↓
Promise microtasks
 ↓
Event loop phases

তাই:

process.nextTick(() => ...)
Promise.resolve().then(() => ...)
setTimeout(() => ...)

এর execution order বোঝার জন্য Node.js-specific queue behavior জানা দরকার।

Interview-এ important point:

"nextTick can run before the Promise microtask queue, and excessive nextTick usage can starve the event loop."`
  },

  {
    id: "node-11",
    category: "Event Loop",
    difficulty: "Senior",
    tags: ["Event Loop", "Starvation"],
    question: "Event Loop Starvation কী?",
    answer: `যখন event loop দীর্ঘ সময় কোনো কাজ থেকে মুক্ত হতে পারে না, তখন অন্য request/callback execute হতে পারে না।

Example:

while (true) {
  // CPU-heavy loop
}

অথবা excessive recursive:

process.nextTick(function loop() {
  process.nextTick(loop);
});

Result:

Event loop blocked
 ↓
Other requests delayed
 ↓
Latency increases
 ↓
Server becomes unresponsive

Solution:

- CPU work offload
- Worker Threads
- Child Processes
- Queue-based processing
- Break large work into chunks`
  },

  // ============================================================
  // ASYNC JAVASCRIPT
  // ============================================================

  {
    id: "node-12",
    category: "Async Programming",
    difficulty: "Very Important",
    tags: ["Callback", "Async"],
    question: "Callback কী?",
    answer: `Callback হলো এমন function যেটি অন্য function-এর কাছে argument হিসেবে দেওয়া হয় এবং পরে execute করা হয়।

Example:

fs.readFile("data.txt", (err, data) => {
  console.log(data);
});

এখানে callback asynchronous operation complete হওয়ার পরে execute হয়।

Problem:

অনেক nested callback হলে:

Callback Hell

এজন্য Promise এবং async/await বেশি readable approach।`
  },

  {
    id: "node-13",
    category: "Async Programming",
    difficulty: "Very Important",
    tags: ["Promise", "Async"],
    question: "Promise কী?",
    answer: `Promise হলো future asynchronous result represent করার abstraction।

States:

Pending
 ↓
Fulfilled

অথবা:

Pending
 ↓
Rejected

Example:

const result = fetchData();

result
  .then(data => {})
  .catch(error => {});

Promise callback nesting কমায় এবং async flow সহজ করে।`
  },

  {
    id: "node-14",
    category: "Async Programming",
    difficulty: "Very Important",
    tags: ["async", "await"],
    question: "async/await কীভাবে কাজ করে?",
    answer: `async function Promise return করে।

await Promise-এর result পাওয়ার জন্য current async function-এর execution pause করে, কিন্তু Node.js event loop পুরোপুরি block করে না।

Example:

async function getUser() {
  const user = await fetchUser();
  return user;
}

await মানে:

"এই async function-এর পরবর্তী অংশ Promise settle না হওয়া পর্যন্ত চালিও না"

এটি thread block করার equivalent নয়।`
  },

  {
    id: "node-15",
    category: "Async Programming",
    difficulty: "Very Important",
    tags: ["Promise.all", "Concurrency"],
    question: "Promise.all() কখন ব্যবহার করবেন?",
    answer: `Independent asynchronous operations parallel/concurrently start করতে Promise.all() ব্যবহার করা যায়।

Example:

const [users, products] = await Promise.all([
  getUsers(),
  getProducts()
]);

এতে sequential:

getUsers()
 ↓
getProducts()

এর বদলে দুটো operation overlap করতে পারে।

কিন্তু একটি Promise reject করলে Promise.all পুরো operation reject করে।

যদি সব result দরকার এবং failure tolerate করতে হয়, Promise.allSettled() consider করা যায়।`
  },

  {
    id: "node-16",
    category: "Async Programming",
    difficulty: "Very Important",
    tags: ["Promise.allSettled", "Promise"],
    question: "Promise.all এবং Promise.allSettled-এর পার্থক্য কী?",
    answer: `Promise.all():

একটি Promise reject করলে পুরো result reject হয়।

Promise.allSettled():

সব Promise শেষ হওয়া পর্যন্ত অপেক্ষা করে।

Example result:

[
  { status: "fulfilled", value: ... },
  { status: "rejected", reason: ... }
]

Use:

Promise.all
→ সব operation সফল হওয়া প্রয়োজন।

Promise.allSettled
→ প্রতিটি operation-এর individual result দরকার।`
  },

  // ============================================================
  // NODE MODULE SYSTEM
  // ============================================================

  {
    id: "node-17",
    category: "Node.js Modules",
    difficulty: "Very Important",
    tags: ["CommonJS", "ESM"],
    question: "CommonJS এবং ES Module-এর মধ্যে পার্থক্য কী?",
    answer: `CommonJS:

const express = require("express");

module.exports = router;

ESM:

import express from "express";

export default router;

CommonJS historically Node.js-এর default module system ছিল।

Modern Node.js ES Modules support করে।

package.json-এ:

"type": "module"

দিলে .js files ESM হিসেবে interpret করা যায়।

Main difference:

CommonJS → require/module.exports

ESM → import/export`
  },

  {
    id: "node-18",
    category: "Node.js Modules",
    difficulty: "Important",
    tags: ["require", "import"],
    question: "require() এবং import-এর গুরুত্বপূর্ণ পার্থক্য কী?",
    answer: `require():

- CommonJS
- Runtime-এ call করা যায়
- Dynamic loading সম্ভব

import:

- ES Modules
- Static module structure
- Tooling/tree-shaking-এর জন্য better ecosystem support

Example:

const fs = require("fs");

vs

import fs from "node:fs";

Modern projects-এ project-wide module system consistent রাখা গুরুত্বপূর্ণ।`
  },

  {
    id: "node-19",
    category: "Node.js Modules",
    difficulty: "Important",
    tags: ["package.json", "npm"],
    question: "package.json কী?",
    answer: `package.json Node.js project-এর metadata এবং dependency configuration file।

Common fields:

{
  "name": "...",
  "version": "...",
  "scripts": {},
  "dependencies": {},
  "devDependencies": {}
}

এতে থাকে:

- Project name
- Version
- Scripts
- Dependencies
- Engine requirements
- Module configuration

Node.js project management-এর core file এটি।`
  },

  {
    id: "node-20",
    category: "Node.js Modules",
    difficulty: "Very Important",
    tags: ["dependencies", "devDependencies"],
    question: "dependencies এবং devDependencies-এর পার্থক্য কী?",
    answer: `dependencies:

Production application runtime-এ প্রয়োজন।

Example:

express
typeorm
jsonwebtoken

devDependencies:

Development/testing/build-এর জন্য।

Example:

jest
eslint
typescript
prettier

npm install package
→ dependencies

npm install -D package
→ devDependencies

Production deployment strategy অনুযায়ী devDependencies install না-ও করা হতে পারে।`
  },

  // ============================================================
  // NPM / PACKAGE MANAGEMENT
  // ============================================================

  {
    id: "node-21",
    category: "NPM",
    difficulty: "Very Important",
    tags: ["npm", "package-lock"],
    question: "package-lock.json কেন গুরুত্বপূর্ণ?",
    answer: `package-lock.json dependency tree-এর resolved versions lock করে।

package.json:

express: "^5.x"

কিন্তু exact dependency tree lock file-এ থাকে।

Benefits:

- Reproducible installation
- Consistent CI/CD
- Dependency integrity
- Transitive dependency versions control

Team project-এ lock file commit করা সাধারণত recommended।`
  },

  {
    id: "node-22",
    category: "NPM",
    difficulty: "Important",
    tags: ["npm", "Semantic Versioning"],
    question: "Semantic Versioning কী?",
    answer: `Version format:

MAJOR.MINOR.PATCH

Example:

2.5.3

MAJOR:
Breaking changes

MINOR:
Backward-compatible features

PATCH:
Backward-compatible bug fixes

^ এবং ~ version range dependency resolution-এ গুরুত্বপূর্ণ।

Production application-এ dependency upgrades controlledভাবে করা উচিত।`
  },

  // ============================================================
  // FILE SYSTEM
  // ============================================================

  {
    id: "node-23",
    category: "Node.js APIs",
    difficulty: "Very Important",
    tags: ["fs", "File System"],
    question: "Node.js fs module কী?",
    answer: `fs module filesystem-এর সাথে কাজ করতে ব্যবহৃত হয়।

Examples:

- readFile
- writeFile
- appendFile
- mkdir
- unlink
- rename
- stat

Synchronous:

fs.readFileSync()

Asynchronous:

fs.promises.readFile()

Server application-এ asynchronous API prefer করা উচিত যাতে main thread unnecessarily block না হয়।`
  },

  {
    id: "node-24",
    category: "Streams",
    difficulty: "Very Important",
    tags: ["Streams", "File"],
    question: "Node.js Stream কী?",
    answer: `Stream data পুরোপুরি memory-তে load না করে chunk-by-chunk process করতে দেয়।

Types:

1. Readable
2. Writable
3. Duplex
4. Transform

Example:

Large File
 ↓
Chunk 1
 ↓
Chunk 2
 ↓
Chunk 3

এতে memory efficient processing সম্ভব।

Use cases:

- Large file upload/download
- Video streaming
- HTTP response
- Compression
- Data processing`
  },

  {
    id: "node-25",
    category: "Streams",
    difficulty: "Very Important",
    tags: ["Backpressure", "Streams"],
    question: "Backpressure কী?",
    answer: `Producer যদি consumer-এর চেয়ে দ্রুত data produce করে, তখন consumer-এর capacity-এর বাইরে data জমতে পারে।

Example:

Producer → 100 MB/s
Consumer → 10 MB/s

এখানে backpressure প্রয়োজন।

Node.js streams backpressure handle করার mechanism দেয়।

pipe():

readable.pipe(writable)

automatically data flow manage করতে সাহায্য করে।

Large data processing-এর জন্য এটি খুব গুরুত্বপূর্ণ।`
  },

  {
    id: "node-26",
    category: "Streams",
    difficulty: "Senior",
    tags: ["pipe", "Stream"],
    question: "pipe() কীভাবে কাজ করে?",
    answer: `pipe() একটি readable stream-এর output writable stream-এ পাঠায়।

Example:

readStream.pipe(writeStream);

Flow:

File
 ↓
Readable Stream
 ↓
pipe()
 ↓
Writable Stream
 ↓
Destination

এটি memory usage এবং backpressure management-এর জন্য খুব useful।`
  },

  // ============================================================
  // BUFFER
  // ============================================================

  {
    id: "node-27",
    category: "Node.js APIs",
    difficulty: "Very Important",
    tags: ["Buffer", "Binary"],
    question: "Node.js Buffer কী?",
    answer: `Buffer binary data handle করার জন্য Node.js-এর বিশেষ data structure।

Use cases:

- File data
- TCP packets
- Image
- Video
- Encryption
- Network protocols

Example:

const buffer = Buffer.from("Hello");

JavaScript সাধারণত text-oriented হলেও Node.js server-side application-এ binary data frequently handle করতে হয়।`
  },

  {
    id: "node-28",
    category: "Node.js APIs",
    difficulty: "Important",
    tags: ["Buffer", "Encoding"],
    question: "Buffer এবং String-এর পার্থক্য কী?",
    answer: `String:

Text data represent করে।

Buffer:

Raw binary bytes represent করে।

Example:

const buffer = Buffer.from("Hello");

buffer.toString();

Network/file processing-এ Buffer গুরুত্বপূর্ণ কারণ binary data byte-level-এ process করতে হয়।`
  },

  // ============================================================
  // HTTP
  // ============================================================

  {
    id: "node-29",
    category: "HTTP",
    difficulty: "Very Important",
    tags: ["HTTP", "Server"],
    question: "Node.js-এ HTTP server কীভাবে তৈরি করবেন?",
    answer: `Built-in http module ব্যবহার করা যায়।

Example concept:

const http = require("node:http");

const server = http.createServer((req, res) => {
  res.end("Hello");
});

server.listen(3000);

Flow:

Request
 ↓
HTTP Server
 ↓
Request Handler
 ↓
Response

Express/Fastify/NestJS-এর মতো framework internally Node HTTP capabilities-এর উপর build করতে পারে।`
  },

  {
    id: "node-30",
    category: "HTTP",
    difficulty: "Very Important",
    tags: ["HTTP", "Request"],
    question: "HTTP request-এর প্রধান অংশগুলো কী?",
    answer: `HTTP request-এর মধ্যে থাকতে পারে:

1. Method
2. URL
3. Headers
4. Query parameters
5. Path parameters
6. Body

Example:

POST /users?id=10

Headers:
Authorization
Content-Type

Body:
{
  "name": "Nazmul"
}

Server এগুলো parse করে application logic-এ পাঠায়।`
  },

  {
    id: "node-31",
    category: "HTTP",
    difficulty: "Very Important",
    tags: ["HTTP", "Status Code"],
    question: "Common HTTP status codes কী কী?",
    answer: `2xx:

200 → OK
201 → Created
204 → No Content

4xx:

400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
409 → Conflict
422 → Unprocessable Content
429 → Too Many Requests

5xx:

500 → Internal Server Error
502 → Bad Gateway
503 → Service Unavailable
504 → Gateway Timeout

Interview-এ status code শুধু মুখস্থ নয়, কখন কোনটি ব্যবহার করবেন সেটাও জানতে হবে।`
  },

  // ============================================================
  // PROCESS
  // ============================================================

  {
    id: "node-32",
    category: "Node.js Process",
    difficulty: "Very Important",
    tags: ["process", "Environment"],
    question: "Node.js process object কী?",
    answer: `process হলো current Node.js process-এর information এবং control interface।

Common:

process.env
process.argv
process.pid
process.cwd()
process.exit()
process.version

Example:

const port = process.env.PORT || 3000;

Production configuration environment variables-এর মাধ্যমে manage করা common practice।`
  },

  {
    id: "node-33",
    category: "Node.js Process",
    difficulty: "Very Important",
    tags: ["Environment Variables", "Config"],
    question: "Environment variable কীভাবে manage করবেন?",
    answer: `Configuration hardcode না করে environment variable ব্যবহার করা যায়।

Example:

PORT
DATABASE_URL
JWT_SECRET

Development:

.env

Production:

Secret Manager / deployment environment

Important:

- Secrets Git-এ commit করবেন না
- Environment-specific configuration রাখুন
- Validation করুন
- Required secret missing হলে application startup fail করতে পারেন`
  },

  {
    id: "node-34",
    category: "Node.js Process",
    difficulty: "Very Important",
    tags: ["SIGTERM", "Graceful Shutdown"],
    question: "Graceful Shutdown কী এবং Node.js-এ কেন দরকার?",
    answer: `Server বন্ধ হওয়ার আগে active requests এবং resources safely close করাকে graceful shutdown বলে।

Flow:

SIGTERM
 ↓
Stop accepting new requests
 ↓
Finish active requests
 ↓
Close DB connection
 ↓
Close Redis
 ↓
Close message consumers
 ↓
Exit

Example:

process.on("SIGTERM", async () => {
  await server.close();
  await db.close();
  process.exit(0);
});

Docker/Kubernetes deployment-এ graceful shutdown খুব গুরুত্বপূর্ণ।`
  },

  // ============================================================
  // ERROR HANDLING
  // ============================================================

  {
    id: "node-35",
    category: "Error Handling",
    difficulty: "Very Important",
    tags: ["Error", "Async"],
    question: "Node.js-এ error handling কীভাবে করবেন?",
    answer: `Synchronous:

try {
  riskyOperation();
} catch (error) {
  // handle
}

Promise:

try {
  await riskyOperation();
} catch (error) {
  // handle
}

Promise chain:

operation()
  .catch(error => {});

Callback:

callback(err, result);

Production application-এ centralized error handling এবং structured logging ব্যবহার করা উচিত।`
  },

  {
    id: "node-36",
    category: "Error Handling",
    difficulty: "Very Important",
    tags: ["Unhandled Rejection", "Exception"],
    question: "Unhandled Promise Rejection কী?",
    answer: `যখন Promise reject হয় কিন্তু কোনো catch/handling নেই, তখন unhandled rejection হতে পারে।

Example:

Promise.reject(new Error("Failed"));

Production-এ unhandled rejection ignore করা dangerous।

Application-level strategy:

- Proper await/catch
- Centralized error handling
- Logging
- Monitoring
- Controlled shutdown where appropriate

Error silently ignore করা উচিত নয়।`
  },

  {
    id: "node-37",
    category: "Error Handling",
    difficulty: "Senior",
    tags: ["uncaughtException", "Process"],
    question: "uncaughtException কী?",
    answer: `যখন synchronous exception process-level handler দ্বারা uncaught থাকে, তখন uncaughtException event trigger হতে পারে।

process.on("uncaughtException", error => {
  logger.error(error);
});

এটিকে normal error recovery mechanism হিসেবে ব্যবহার করা উচিত নয়।

কারণ process potentially corrupted state-এ থাকতে পারে।

Production strategy:

Log
 ↓
Stop accepting new work
 ↓
Graceful shutdown
 ↓
Restart via process manager/orchestrator`
  },

  // ============================================================
  // MEMORY
  // ============================================================

  {
    id: "node-38",
    category: "Memory Management",
    difficulty: "Very Important",
    tags: ["Heap", "Memory"],
    question: "Node.js memory কীভাবে manage করে?",
    answer: `JavaScript objects সাধারণত V8 heap-এ থাকে।

Concept:

Node.js
 ↓
V8
 ↓
Heap
 ↓
Objects

V8 garbage collector unreachable objects cleanup করে।

Memory-related issues:

- Memory leak
- Large objects
- Unbounded cache
- Event listener leak
- Long-lived references

Production-এ memory usage monitor করা গুরুত্বপূর্ণ।`
  },

  {
    id: "node-39",
    category: "Memory Management",
    difficulty: "Very Important",
    tags: ["Memory Leak", "Heap"],
    question: "Node.js memory leak কী?",
    answer: `যখন application এমন objects-এর reference ধরে রাখে যেগুলো আর দরকার নেই, Garbage Collector সেগুলো free করতে পারে না।

Common causes:

- Global arrays
- Unbounded cache
- Event listeners
- Timers
- Closures
- Long-lived objects

Example:

const cache = {};

app.get("/user/:id", async (req, res) => {
  cache[req.params.id] = await loadUser(req.params.id);
});

Cache cleanup না করলে memory continuously grow করতে পারে।`
  },

  {
    id: "node-40",
    category: "Memory Management",
    difficulty: "Senior",
    tags: ["Heap Snapshot", "Debugging"],
    question: "Node.js memory leak কীভাবে debug করবেন?",
    answer: `Approach:

1. Memory usage monitor
2. Heap snapshot নিন
3. Multiple snapshots compare করুন
4. Retained objects identify করুন
5. References trace করুন
6. Suspected code fix করুন
7. Load test করুন

Useful tools:

- Chrome DevTools
- Node.js inspector
- Heap snapshots
- Clinic.js
- APM tools

Important metric:

Heap usage continuously increase করছে কি না।

একটি normal GC cycle-এর পরে memory baseline recover না করলে leak-এর সম্ভাবনা থাকে।`
  },

  // ============================================================
  // CLUSTER / WORKER THREAD
  // ============================================================

  {
    id: "node-41",
    category: "Concurrency",
    difficulty: "Very Important",
    tags: ["Worker Threads", "CPU"],
    question: "Worker Threads কী?",
    answer: `Worker Threads Node.js-এ JavaScript code parallelভাবে execute করতে দেয়।

Main Thread
    |
    +---- Worker Thread
    |
    +---- Worker Thread

CPU-intensive কাজের জন্য useful:

- Image processing
- Encryption
- Compression
- Large calculations
- CPU-heavy parsing

I/O-heavy কাজের জন্য সাধারণ async I/O যথেষ্ট হতে পারে।`
  },

  {
    id: "node-42",
    category: "Concurrency",
    difficulty: "Very Important",
    tags: ["Worker Threads", "Child Process"],
    question: "Worker Threads এবং Child Process-এর পার্থক্য কী?",
    answer: `Worker Threads:

- Same Node.js process-এর মধ্যে worker
- JavaScript execution parallel করতে পারে
- Memory sharing-এর কিছু capability আছে
- CPU-intensive JS-এর জন্য useful

Child Process:

- Separate OS process
- আলাদা memory space
- Stronger isolation
- External commands/programs চালাতে useful

Concept:

Worker:
Process
 ├── Main Thread
 └── Worker

Child Process:
Parent Process
      |
      +---- Child Process`
  },

  {
    id: "node-43",
    category: "Concurrency",
    difficulty: "Senior",
    tags: ["Cluster", "Scaling"],
    question: "Node.js Cluster কী?",
    answer: `Cluster multiple Node.js processes চালিয়ে multiple CPU cores ব্যবহার করতে সাহায্য করতে পারে।

Concept:

             Load Balancer
                  ↓
       ┌──────────┼──────────┐
       ↓          ↓          ↓
   Worker 1   Worker 2   Worker 3
       ↓          ↓          ↓
    CPU Core   CPU Core   CPU Core

প্রতিটি worker আলাদা process এবং আলাদা memory space ব্যবহার করে।

Modern deployments-এ Kubernetes বা external process managers দিয়ে horizontal scaling করাও common।`
  },

  // ============================================================
  // EVENT EMITTER
  // ============================================================

  {
    id: "node-44",
    category: "Node.js Core",
    difficulty: "Very Important",
    tags: ["EventEmitter", "Events"],
    question: "EventEmitter কী?",
    answer: `EventEmitter Node.js-এর event-driven programming model-এর core abstraction।

Example:

const emitter = new EventEmitter();

emitter.on("order.created", data => {
  console.log(data);
});

emitter.emit("order.created", order);

Flow:

emit event
 ↓
registered listeners
 ↓
callbacks execute

Node.js-এর অনেক internal APIs event-based।`
  },

  {
    id: "node-45",
    category: "Node.js Core",
    difficulty: "Important",
    tags: ["EventEmitter", "Memory Leak"],
    question: "EventEmitter memory leak কীভাবে তৈরি করতে পারে?",
    answer: `যদি repeatedly event listener add করা হয় কিন্তু remove না করা হয়, listener count বাড়তে পারে।

Example:

emitter.on("data", handler);

যদি request প্রতি নতুন listener add হয়:

Request 1 → listener
Request 2 → listener
Request 3 → listener

এভাবে listeners accumulate করতে পারে।

Solutions:

- Register listener once
- Remove listener
- Use once() where appropriate
- Avoid per-request global listeners`
  },

  // ============================================================
  // SECURITY
  // ============================================================

  {
    id: "node-46",
    category: "Node.js Security",
    difficulty: "Very Important",
    tags: ["Security", "SQL Injection"],
    question: "Node.js application-এ SQL Injection কীভাবে prevent করবেন?",
    answer: `User input সরাসরি SQL string-এর মধ্যে concatenate করা উচিত নয়।

Bad:

const sql = "SELECT * FROM users WHERE email = '" + email + "'";

Better:

Parameterized query
 ↓
Prepared statement
 ↓
ORM/Query Builder parameter binding

Additional:

- Input validation
- Least-privilege DB user
- Proper escaping
- Security testing

ORM ব্যবহার করলেই automatically সব security problem solve হয় না; raw query ব্যবহারের ক্ষেত্রেও সতর্ক থাকতে হবে।`
  },

  {
    id: "node-47",
    category: "Node.js Security",
    difficulty: "Very Important",
    tags: ["Security", "XSS"],
    question: "XSS কী এবং Node.js API কীভাবে এটি reduce করতে পারে?",
    answer: `XSS = Cross-Site Scripting।

Attacker malicious script inject করতে পারে।

API layer:

- Validate input
- Sanitize where appropriate
- Proper output encoding
- Avoid unsafe HTML generation
- Set security headers

API নিজে browser rendering না করলেও backend থেকে unsafe content return করলে frontend risk তৈরি হতে পারে।

Security frontend + backend দুই layer-এই consider করতে হবে।`
  },

  {
    id: "node-48",
    category: "Node.js Security",
    difficulty: "Very Important",
    tags: ["Security", "Helmet"],
    question: "Helmet কী?",
    answer: `Helmet Node.js/Express applications-এর HTTP security headers configure করতে সাহায্য করে।

Security headers-এর examples:

- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Strict-Transport-Security

Helmet security-এর একটি layer মাত্র।

Authentication, authorization, validation, rate limiting এবং secure configuration আলাদাভাবে দরকার।`
  },

  {
    id: "node-49",
    category: "Node.js Security",
    difficulty: "Very Important",
    tags: ["Password", "Hashing"],
    question: "Password Node.js-এ কীভাবে store করবেন?",
    answer: `Password কখনো plain text হিসেবে store করা উচিত নয়।

Use:

- Argon2
- bcrypt

Flow:

Password
 ↓
Password Hashing
 ↓
Database

Login:

Password
 ↓
Hash verification
 ↓
Match?
 ↓
Authenticated

Encryption এবং password hashing এক জিনিস নয়।

Password সাধারণত reversible encryption নয়, one-way password hashing ব্যবহার করে store করা হয়।`
  },

  {
    id: "node-50",
    category: "Node.js Security",
    difficulty: "Very Important",
    tags: ["JWT", "Authentication"],
    question: "JWT কীভাবে Node.js authentication-এ কাজ করে?",
    answer: `Login:

Client
 ↓
Credentials
 ↓
Server
 ↓
Verify
 ↓
JWT
 ↓
Client

পরবর্তী request:

Client
 ↓
Authorization: Bearer <token>
 ↓
Server
 ↓
Verify JWT
 ↓
User identity
 ↓
Protected resource

JWT সাধারণত claims বহন করে।

Important:

JWT encrypted data নয়; সাধারণ JWT payload readable হতে পারে।

Sensitive data JWT payload-এ রাখা উচিত নয়।`
  },

  // ============================================================
  // PERFORMANCE
  // ============================================================

  {
    id: "node-51",
    category: "Performance",
    difficulty: "Very Important",
    tags: ["Performance", "Latency"],
    question: "Node.js API slow হলে কীভাবে debug করবেন?",
    answer: `Step-by-step:

1. Measure API latency
2. Check event loop lag
3. Check CPU
4. Check memory
5. Check database latency
6. Check external API latency
7. Check connection pool
8. Check slow queries
9. Check network
10. Profile CPU

Potential causes:

- Blocking code
- Slow DB query
- Missing index
- External API timeout
- Memory pressure
- Event loop starvation
- Too much JSON serialization

Rule:

Measure first → Optimize second।`
  },

  {
    id: "node-52",
    category: "Performance",
    difficulty: "Senior",
    tags: ["Event Loop", "CPU"],
    question: "Node.js API-তে CPU-heavy কাজ কেন সমস্যা?",
    answer: `Node.js main JavaScript thread event loop-এর উপর নির্ভর করে।

যদি CPU-heavy code:

for (...) {
  heavyCalculation();
}

তাহলে event loop blocked হতে পারে।

Flow:

Request A
 ↓
CPU-heavy task
 ↓
Event Loop blocked
 ↓
Request B waits
 ↓
Request C waits

Solution:

- Worker Threads
- Child Processes
- Background jobs
- Queue
- Separate microservice`
  },

  {
    id: "node-53",
    category: "Performance",
    difficulty: "Very Important",
    tags: ["Compression", "HTTP"],
    question: "Node.js API response compression কেন ব্যবহার করা হয়?",
    answer: `Large response network-এর মাধ্যমে পাঠানোর আগে compression করলে payload size কমে।

Example:

JSON 1 MB
 ↓
gzip/brotli
 ↓
200 KB

Benefits:

- Less bandwidth
- Faster transfer

Trade-off:

Compression CPU cost তৈরি করে।

সব response blindly compress করা উচিত নয়।

Reverse proxy/CDN layer-এ compression handle করাও common।`
  },

  {
    id: "node-54",
    category: "Performance",
    difficulty: "Very Important",
    tags: ["Caching", "Redis"],
    question: "Node.js application-এ caching কেন ব্যবহার করবেন?",
    answer: `Repeated expensive operation avoid করতে cache ব্যবহার করা হয়।

Example:

Request
 ↓
Redis
 ↓
Cache Hit
 ↓
Return

Cache Miss:

Request
 ↓
Redis miss
 ↓
Database
 ↓
Cache
 ↓
Response

Common cached data:

- User profile
- Product
- Configuration
- Permission
- Frequently accessed reports

Trade-off:

Cache invalidation এবং stale data management করতে হয়।`
  },

  // ============================================================
  // DATABASE CONNECTIONS
  // ============================================================

  {
    id: "node-55",
    category: "Database",
    difficulty: "Very Important",
    tags: ["Connection Pool", "Database"],
    question: "Database Connection Pool কী?",
    answer: `প্রতিটি request-এর জন্য নতুন DB connection তৈরি না করে reusable connection-এর pool রাখা হয়।

Without pool:

Request
 ↓
Create connection
 ↓
Query
 ↓
Close

With pool:

Connection Pool
 ├── Connection 1
 ├── Connection 2
 ├── Connection 3
 └── Connection 4

Request এসে available connection নেয়।

Benefits:

- Lower connection overhead
- Better performance
- Controlled concurrency

Pool size খুব ছোট হলে waiting বাড়ে।

খুব বড় হলে database overload হতে পারে।`
  },

  {
    id: "node-56",
    category: "Database",
    difficulty: "Senior",
    tags: ["Connection Pool", "Scaling"],
    question: "Node.js connection pool size কীভাবে determine করবেন?",
    answer: `একটি fixed magic number নেই।

Consider:

- DB max connections
- Number of application instances
- Query latency
- CPU
- Concurrent workload
- Pool wait time

Example:

DB max connections = 500

Application instances = 10

প্রতিটি instance-কে 100 connections দিলে:

10 × 100 = 1000

এটি DB capacity exceed করবে।

তাই total pool capacity হিসাব করতে হবে:

Instance Count × Pool Size <= Safe DB Connection Capacity

তারপর load testing করে tune করতে হবে।`
  },

  // ============================================================
  // LOGGING / OBSERVABILITY
  // ============================================================

  {
    id: "node-57",
    category: "Observability",
    difficulty: "Very Important",
    tags: ["Logging", "Production"],
    question: "Production Node.js application-এ কীভাবে logging করবেন?",
    answer: `Structured logging ব্যবহার করা ভালো।

Example:

{
  "level": "error",
  "requestId": "...",
  "userId": "...",
  "route": "/orders",
  "duration": 120,
  "error": "..."
}

Common information:

- Timestamp
- Level
- Request ID
- Trace ID
- Service name
- Route
- Duration
- Error stack

Popular libraries:

- Pino
- Winston

console.log development-এ useful হলেও production observability-এর জন্য structured logger better।`
  },

  {
    id: "node-58",
    category: "Observability",
    difficulty: "Very Important",
    tags: ["Request ID", "Tracing"],
    question: "Request ID কেন দরকার?",
    answer: `একটি request-এর সব logs correlate করার জন্য request ID ব্যবহার করা হয়।

Flow:

Client
 ↓
API Gateway
 ↓
Node Service
 ↓
Database
 ↓
Other Service

সব log-এ একই requestId থাকলে পুরো request trace করা সহজ হয়।

Example:

requestId=abc123

API log
DB log
Payment service log

সব জায়গায়:

abc123

Production debugging-এ এটি অত্যন্ত useful।`
  },

  // ============================================================
  // TESTING
  // ============================================================

  {
    id: "node-59",
    category: "Testing",
    difficulty: "Very Important",
    tags: ["Unit Test", "Integration Test"],
    question: "Node.js application-এ Unit, Integration এবং E2E test-এর পার্থক্য কী?",
    answer: `Unit Test:

একটি function/class isolatedভাবে test করে।

Integration Test:

Multiple components একসাথে কাজ করছে কি না test করে।

Example:

Service + Database

E2E:

পুরো user flow test করে।

Example:

Login
 ↓
Create Order
 ↓
Payment
 ↓
Order confirmation

Typical pyramid:

Many Unit Tests
      ↓
Some Integration Tests
      ↓
Fewer E2E Tests`
  },

  {
    id: "node-60",
    category: "Testing",
    difficulty: "Very Important",
    tags: ["Mock", "Stub"],
    question: "Mock এবং Stub কী?",
    answer: `Stub:

Predefined response দেয়।

Example:

getUser() → fake user

Mock:

Interaction verify করতে পারে।

Example:

paymentService.charge()
must be called once

External API, database বা message broker test-এর সময় mocking useful।

তবে excessive mocking করলে test বাস্তব behavior থেকে দূরে চলে যেতে পারে।`
  },

  // ============================================================
  // API DESIGN
  // ============================================================

  {
    id: "node-61",
    category: "API Design",
    difficulty: "Very Important",
    tags: ["REST", "API"],
    question: "Node.js REST API design-এর important principles কী?",
    answer: `Important:

- Resource-oriented URLs
- Correct HTTP methods
- Correct status codes
- Validation
- Authentication
- Authorization
- Pagination
- Filtering
- Sorting
- Error format
- Versioning
- Idempotency
- Rate limiting
- Observability

Example:

GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id
DELETE /users/:id

API design শুধু route তৈরি করা নয়; consistency এবং operational behavior-ও গুরুত্বপূর্ণ।`
  },

  {
    id: "node-62",
    category: "API Design",
    difficulty: "Very Important",
    tags: ["Pagination", "API"],
    question: "Offset pagination এবং Cursor pagination-এর পার্থক্য কী?",
    answer: `Offset:

GET /orders?page=100&limit=20

Database:

OFFSET 1980
LIMIT 20

Large offset হলে performance সমস্যা হতে পারে।

Cursor:

GET /orders?cursor=abc&limit=20

Cursor একটি position represent করে।

Cursor pagination:

- Large dataset-এর জন্য better
- Stable pagination
- Infinite scroll-এর জন্য useful

Offset:

- Simple
- Admin/reporting UI-তে convenient

Use case অনুযায়ী choose করতে হবে।`
  },

  {
    id: "node-63",
    category: "API Design",
    difficulty: "Very Important",
    tags: ["Idempotency", "API"],
    question: "Idempotency কী এবং payment API-তে কেন গুরুত্বপূর্ণ?",
    answer: `একই request multiple times execute হলেও final effect একই থাকা idempotency-এর মূল ধারণা।

Payment:

Request
 ↓
Charge $100
 ↓
Network timeout
 ↓
Client retry
 ↓
Charge $100 again?

Idempotency key:

POST /payments
Idempotency-Key: abc123

Server একই key-এর previous result return করতে পারে।

এতে duplicate payment risk কমে।`
  },

  // ============================================================
  // RATE LIMITING
  // ============================================================

  {
    id: "node-64",
    category: "API Security",
    difficulty: "Very Important",
    tags: ["Rate Limiting", "Redis"],
    question: "Rate Limiting কী?",
    answer: `একটি client/IP/user কত request নির্দিষ্ট সময়ে করতে পারবে তার limit।

Example:

100 requests/minute

যদি 101st request আসে:

429 Too Many Requests

Algorithms:

- Fixed Window
- Sliding Window
- Token Bucket
- Leaky Bucket

Distributed Node.js application-এ Redis-based rate limiting common।`
  },

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  {
    id: "node-65",
    category: "Authentication",
    difficulty: "Very Important",
    tags: ["JWT", "Refresh Token"],
    question: "Access Token এবং Refresh Token-এর পার্থক্য কী?",
    answer: `Access Token:

Short-lived

API access-এর জন্য।

Refresh Token:

Longer-lived

নতুন access token পাওয়ার জন্য।

Flow:

Login
 ↓
Access Token + Refresh Token
 ↓
Access Token expires
 ↓
Refresh Token
 ↓
New Access Token

Security-এর জন্য refresh token carefully protect এবং rotate/revoke করার strategy প্রয়োজন।`
  },

  {
    id: "node-66",
    category: "Authentication",
    difficulty: "Very Important",
    tags: ["RBAC", "Authorization"],
    question: "Authentication এবং Authorization-এর পার্থক্য কী?",
    answer: `Authentication:

"তুমি কে?"

Example:

Login → user verified

Authorization:

"তুমি কী করতে পারবে?"

Example:

Admin → delete user
User → view profile

Flow:

Authentication
 ↓
Identity
 ↓
Authorization
 ↓
Permission
 ↓
Resource`
  },

  // ============================================================
  // MICROSERVICES
  // ============================================================

  {
    id: "node-67",
    category: "Node.js Microservices",
    difficulty: "Very Important",
    tags: ["Microservices", "Architecture"],
    question: "Node.js দিয়ে microservice কেন তৈরি করা হয়?",
    answer: `Node.js-এর সুবিধা:

- Lightweight runtime
- Fast startup
- Excellent I/O handling
- Good API ecosystem
- Async programming
- JSON-native ecosystem
- Good fit for network-heavy services

Example:

API Gateway
   ↓
 ┌──────┬─────────┬──────────┐
 ↓      ↓         ↓          ↓
User  Order    Payment   Notification
Svc    Svc       Svc        Svc

তবে microservice শুধু Node.js দিয়ে তৈরি করা যায় না; architecture এবং service boundaries বেশি গুরুত্বপূর্ণ।`
  },

  {
    id: "node-68",
    category: "Node.js Microservices",
    difficulty: "Very Important",
    tags: ["REST", "gRPC", "Kafka"],
    question: "Node.js microservices কীভাবে communicate করতে পারে?",
    answer: `দুই ধরনের communication:

Synchronous:

- REST
- HTTP
- gRPC

Asynchronous:

- Kafka
- RabbitMQ
- NATS

Example:

REST:

Order Service
 ↓
Payment Service

Event:

Order Service
 ↓
Kafka
 ↓
Payment Service

Synchronous communication simple।

Asynchronous communication loose coupling এবং scalability improve করতে পারে, কিন্তু eventual consistency এবং operational complexity বাড়ায়।`
  },

  {
    id: "node-69",
    category: "Node.js Microservices",
    difficulty: "Senior",
    tags: ["Circuit Breaker", "Resilience"],
    question: "Circuit Breaker কী?",
    answer: `একটি dependent service বারবার fail করলে continuously request পাঠানো বন্ধ করার pattern।

States:

Closed
 ↓
Failures
 ↓
Open
 ↓
Wait
 ↓
Half Open
 ↓
Success → Closed

Example:

Order Service
 ↓
Payment Service DOWN

Circuit breaker open হলে payment service-এ request না পাঠিয়ে দ্রুত failure/fallback return করা যায়।

Benefits:

- Cascading failure reduce
- Resource protection
- Faster failure response`
  },

  {
    id: "node-70",
    category: "Node.js Microservices",
    difficulty: "Senior",
    tags: ["Retry", "Resilience"],
    question: "Retry strategy কীভাবে design করবেন?",
    answer: `সব error retry করা উচিত নয়।

Retry suitable:

- Temporary network failure
- Timeout
- 503
- Rate limit অনুযায়ী retry-after

Retry unsuitable:

- 400 validation error
- Authentication failure
- Business rule failure

Use:

Exponential Backoff
+
Jitter

Example:

1 sec
2 sec
4 sec
8 sec

Jitter একই সময়ে অনেক client retry করার সমস্যা কমায়।

Retry + idempotency খুব গুরুত্বপূর্ণ।`
  },

  // ============================================================
  // MESSAGE QUEUE
  // ============================================================

  {
    id: "node-71",
    category: "Message Queue",
    difficulty: "Very Important",
    tags: ["RabbitMQ", "Kafka", "Queue"],
    question: "Node.js application-এ message queue কেন ব্যবহার করবেন?",
    answer: `Synchronous request-এর পরিবর্তে asynchronous processing করতে queue ব্যবহার করা যায়।

Example:

API
 ↓
Queue
 ↓
Worker
 ↓
Email

User API response দ্রুত পেতে পারে।

Benefits:

- Async processing
- Load buffering
- Retry
- Decoupling
- Background jobs

Examples:

- RabbitMQ
- Kafka
- BullMQ/Redis
- NATS`
  },

  {
    id: "node-72",
    category: "Message Queue",
    difficulty: "Very Important",
    tags: ["RabbitMQ", "Kafka"],
    question: "Kafka এবং RabbitMQ-এর মূল পার্থক্য কী?",
    answer: `RabbitMQ:

- Traditional message broker
- Queue-based
- Routing এবং work distribution-এর জন্য excellent
- Task processing-এ common

Kafka:

- Distributed event streaming platform
- Durable ordered log
- High-throughput event streaming
- Replay capability
- Event-driven architecture-এর জন্য excellent

Simple task queue:

RabbitMQ

Large event streaming/data pipeline:

Kafka

তবে actual choice workload এবং architecture-এর উপর নির্ভর করে।`
  },

  // ============================================================
  // DISTRIBUTED SYSTEMS
  // ============================================================

  {
    id: "node-73",
    category: "Distributed Systems",
    difficulty: "Senior",
    tags: ["Distributed Systems", "Consistency"],
    question: "Eventual Consistency কী?",
    answer: `Distributed system-এ সব node একই মুহূর্তে একই data না দেখিয়ে কিছু সময় পরে consistent state-এ পৌঁছালে তাকে eventual consistency বলা হয়।

Example:

Order Service
 ↓
Event
 ↓
Kafka
 ↓
Notification Service

Order update immediately notification DB-তে না পৌঁছালেও কিছু সময় পরে পৌঁছাবে।

Benefits:

- Scalability
- Availability
- Loose coupling

Trade-off:

- Temporary stale data
- More complex application logic`
  },

  {
    id: "node-74",
    category: "Distributed Systems",
    difficulty: "Senior",
    tags: ["Saga", "Transaction"],
    question: "Saga Pattern কী?",
    answer: `Distributed transaction-এর পরিবর্তে ছোট local transactions এবং compensating actions ব্যবহার করা হয়।

Example:

Create Order
 ↓
Reserve Inventory
 ↓
Payment
 ↓
Shipment

Payment failed হলে:

Cancel Order
 ↓
Release Inventory

এটি compensation।

Saga দুইভাবে হতে পারে:

- Choreography
- Orchestration

Microservices-এ distributed business transaction manage করতে Saga গুরুত্বপূর্ণ।`
  },

  // ============================================================
  // DATABASE + NODE
  // ============================================================

  {
    id: "node-75",
    category: "Database",
    difficulty: "Senior",
    tags: ["N+1", "ORM"],
    question: "Node.js ORM-এ N+1 query problem কী?",
    answer: `একটি list query করার পর প্রতিটি row-এর জন্য আবার আলাদা query করলে N+1 হয়।

Example:

SELECT users;        // 1 query

For each user:
SELECT orders;       // N queries

Total:

1 + N queries

যদি 100 users:

101 queries

Solutions:

- JOIN
- Eager loading
- Batch query
- DataLoader
- Proper ORM relation loading

Performance-critical API-তে N+1 খুব common problem।`
  },

  // ============================================================
  // DEPENDENCY INJECTION
  // ============================================================

  {
    id: "node-76",
    category: "Architecture",
    difficulty: "Very Important",
    tags: ["Dependency Injection", "SOLID"],
    question: "Node.js application-এ Dependency Injection কী?",
    answer: `Dependency Injection হলো class/function-এর dependency নিজে create না করে বাইরে থেকে provide করা।

Bad:

class UserService {
  constructor() {
    this.db = new MySQLDatabase();
  }
}

Better:

class UserService {
  constructor(db) {
    this.db = db;
  }
}

এতে:

- Testing সহজ
- Coupling কম
- Dependency replace করা সহজ
- Architecture cleaner

NestJS এই pattern heavily ব্যবহার করে।`
  },

  // ============================================================
  // CLEAN ARCHITECTURE
  // ============================================================

  {
    id: "node-77",
    category: "Architecture",
    difficulty: "Senior",
    tags: ["Clean Architecture", "SOLID"],
    question: "Node.js backend-এর Clean Architecture কীভাবে design করবেন?",
    answer: `একটি common structure:

src/
 ├── domain/
 ├── application/
 ├── infrastructure/
 └── presentation/

Domain:
Business entities/rules

Application:
Use cases

Infrastructure:
Database
Redis
Kafka
External APIs

Presentation:
HTTP controllers/routes

Flow:

HTTP
 ↓
Controller
 ↓
Use Case
 ↓
Repository Interface
 ↓
Repository Implementation
 ↓
Database

Benefit:

Business logic infrastructure-এর সাথে tightly coupled থাকে না।`
  },

  // ============================================================
  // GRACEFUL SHUTDOWN
  // ============================================================

  {
    id: "node-78",
    category: "Production",
    difficulty: "Very Important",
    tags: ["Graceful Shutdown", "Kubernetes"],
    question: "Kubernetes-এ Node.js service deploy করলে graceful shutdown কেন গুরুত্বপূর্ণ?",
    answer: `Kubernetes pod terminate করার সময় SIGTERM পাঠাতে পারে।

যদি application immediately exit করে:

Active requests
 ↓
Connection terminated
 ↓
Failed requests

Graceful shutdown:

SIGTERM
 ↓
Readiness false
 ↓
Stop accepting new traffic
 ↓
Finish active requests
 ↓
Close DB/Redis/Queue
 ↓
Exit

এতে deployment এবং scaling-এর সময় request loss কমে।`
  },

  // ============================================================
  // HEALTH CHECK
  // ============================================================

  {
    id: "node-79",
    category: "Production",
    difficulty: "Very Important",
    tags: ["Health Check", "Kubernetes"],
    question: "Liveness এবং Readiness probe কী?",
    answer: `Liveness:

Application process healthy কি না।

যদি unhealthy:
→ restart হতে পারে।

Readiness:

Application traffic নেওয়ার জন্য ready কি না।

যদি false:
→ load balancer traffic পাঠাবে না।

Example:

GET /health/live
GET /health/ready

Readiness check-এ database বা critical dependency-এর status consider করা যেতে পারে, কিন্তু check design carefully করতে হয় যাতে dependency failure নিজে cascading outage না তৈরি করে।`
  },

  // ============================================================
  // FILE UPLOAD
  // ============================================================

  {
    id: "node-80",
    category: "File Upload",
    difficulty: "Very Important",
    tags: ["Upload", "Security"],
    question: "Node.js-এ secure file upload কীভাবে implement করবেন?",
    answer: `Important checks:

1. File size limit
2. MIME type validation
3. Extension validation
4. File content validation where needed
5. Random filename
6. Storage outside executable directory
7. Virus scanning if required
8. Authentication/authorization
9. Rate limiting
10. Object storage for large files

Architecture:

Client
 ↓
Node.js
 ↓
Validation
 ↓
Object Storage
 ↓
Metadata DB

Large files-এর জন্য streaming ব্যবহার করা ভালো।`
  },

  // ============================================================
  // WEB SOCKET
  // ============================================================

  {
    id: "node-81",
    category: "Real-Time",
    difficulty: "Very Important",
    tags: ["WebSocket", "Socket.io"],
    question: "Node.js-এ WebSocket কী?",
    answer: `WebSocket client এবং server-এর মধ্যে persistent bidirectional communication দেয়।

HTTP:

Client → Request
Server → Response

WebSocket:

Client ↔ Server

Connection open থাকে।

Use cases:

- Chat
- Live notification
- Real-time dashboard
- Multiplayer
- Live tracking

Multiple Node.js instances হলে WebSocket state synchronization-এর জন্য Redis adapter/pub-sub বা অন্য distributed mechanism প্রয়োজন হতে পারে।`
  },

  // ============================================================
  // CRON / BACKGROUND
  // ============================================================

  {
    id: "node-82",
    category: "Background Jobs",
    difficulty: "Very Important",
    tags: ["Cron", "Background Job"],
    question: "Node.js-এ Cron Job এবং Queue Worker-এর মধ্যে পার্থক্য কী?",
    answer: `Cron:

সময় অনুযায়ী কাজ শুরু করে।

Example:

প্রতি রাত 12টায় report generate।

Queue Worker:

কাজ queue-তে আসলে process করে।

Example:

Order created
 ↓
Queue
 ↓
Email worker

Cron:
Time-driven

Queue:
Event/job-driven

Heavy background work-এর জন্য queue worker বেশি scalable।`
  },

  // ============================================================
  // RATE LIMIT / DDOS
  // ============================================================

  {
    id: "node-83",
    category: "Production Security",
    difficulty: "Senior",
    tags: ["Rate Limiting", "DDoS"],
    question: "Node.js API-কে high traffic বা abuse থেকে কীভাবে protect করবেন?",
    answer: `Layers:

Client
 ↓
CDN / WAF
 ↓
Load Balancer
 ↓
API Gateway
 ↓
Rate Limiter
 ↓
Node.js
 ↓
Database

Techniques:

- Rate limiting
- WAF
- CDN
- Request size limits
- Timeout
- Connection limits
- Authentication
- Abuse detection
- Caching
- Queueing

শুধু application-level rate limiting দিয়ে large-scale DDoS solve করা যায় না; edge/network layer-ও প্রয়োজন।`
  },

  // ============================================================
  // TIMEOUTS
  // ============================================================

  {
    id: "node-84",
    category: "Resilience",
    difficulty: "Very Important",
    tags: ["Timeout", "Microservices"],
    question: "Node.js external API call-এ timeout কেন সেট করবেন?",
    answer: `Timeout না থাকলে একটি slow dependency-এর জন্য request দীর্ঘসময় hanging থাকতে পারে।

Example:

Node API
 ↓
Payment API
 ↓
Hanging

Result:

Connection occupied
 ↓
Pool exhausted
 ↓
More requests wait
 ↓
Cascading failure

তাই:

Connect timeout
Request timeout
Idle timeout

যেখানে appropriate সেট করা উচিত।

Timeout + Retry + Circuit Breaker একসাথে resilience improve করতে পারে।`
  },

  // ============================================================
  // TRANSACTION
  // ============================================================

  {
    id: "node-85",
    category: "Database Transaction",
    difficulty: "Very Important",
    tags: ["Transaction", "Node.js"],
    question: "Node.js service-এ database transaction কীভাবে manage করবেন?",
    answer: `Typical flow:

BEGIN
 ↓
INSERT order
 ↓
UPDATE inventory
 ↓
INSERT payment record
 ↓
COMMIT

Error:

ROLLBACK

Important:

Transaction-এর ভিতরে unnecessary external API call রাখা উচিত নয়।

Bad:

BEGIN
 ↓
DB update
 ↓
HTTP call
 ↓
WAIT
 ↓
COMMIT

এতে transaction দীর্ঘ হয় এবং locks ধরে রাখে।

Distributed transaction হলে Saga/Outbox-এর মতো pattern প্রয়োজন হতে পারে।`
  },

  // ============================================================
  // DATABASE MIGRATION
  // ============================================================

  {
    id: "node-86",
    category: "Database Migration",
    difficulty: "Senior",
    tags: ["Migration", "Zero Downtime"],
    question: "Node.js production application-এ zero-downtime database migration কীভাবে করবেন?",
    answer: `Breaking migration সরাসরি করা risky।

Example:

Old application:
name column ব্যবহার করছে

New application:
full_name column চায়

Safe approach:

Phase 1:
Add new column

Phase 2:
Deploy code that writes both

Phase 3:
Backfill old data

Phase 4:
Deploy code reading new column

Phase 5:
Stop writing old column

Phase 6:
Remove old column later

এটি Expand → Migrate → Contract pattern-এর মতো।

Rolling deployment-এ backward compatibility গুরুত্বপূর্ণ।`
  },

  // ============================================================
  // DEPLOYMENT
  // ============================================================

  {
    id: "node-87",
    category: "Deployment",
    difficulty: "Very Important",
    tags: ["Docker", "Production"],
    question: "Node.js application Dockerize করার basic architecture কী?",
    answer: `Typical:

Dockerfile
 ↓
Node.js Image
 ↓
Container
 ↓
Application

Production:

Internet
 ↓
Load Balancer
 ↓
Node.js Containers
 ↓
Database / Redis / Kafka

Container-এর ভিতরে process manager হিসেবে PM2 সবসময় দরকার হয় না; Docker/Kubernetes নিজেই process lifecycle manage করতে পারে।

Container environment-এ সাধারণত one main process per container principle follow করা হয়।`
  },

  {
    id: "node-88",
    category: "Deployment",
    difficulty: "Very Important",
    tags: ["PM2", "Cluster"],
    question: "PM2 কী?",
    answer: `PM2 হলো Node.js process manager।

Features:

- Process management
- Restart on crash
- Log management
- Environment management
- Cluster mode
- Monitoring

Example architecture:

PM2
 ├── Node Worker 1
 ├── Node Worker 2
 └── Node Worker 3

Cloud/Kubernetes environment-এ PM2 ব্যবহার করা হবে কি না deployment architecture-এর উপর নির্ভর করে।`
  },

  // ============================================================
  // LOAD BALANCING
  // ============================================================

  {
    id: "node-89",
    category: "Scalability",
    difficulty: "Very Important",
    tags: ["Load Balancer", "Scaling"],
    question: "Node.js horizontal scaling কী?",
    answer: `একটি Node.js process বড় করার বদলে multiple instances চালানোকে horizontal scaling বলে।

Architecture:

             Load Balancer
                  ↓
       ┌──────────┼──────────┐
       ↓          ↓          ↓
    Node 1     Node 2     Node 3

Benefits:

- More traffic handling
- Fault tolerance
- Independent scaling

Stateless API হলে horizontal scaling সহজ।

Session local memory-তে রাখলে distributed deployment-এ সমস্যা হতে পারে।`
  },

  // ============================================================
  // SESSION
  // ============================================================

  {
    id: "node-90",
    category: "Authentication",
    difficulty: "Very Important",
    tags: ["Session", "Redis"],
    question: "Node.js distributed application-এ session কীভাবে manage করবেন?",
    answer: `Local memory session:

Node 1 → Session A
Node 2 → Session নেই

Load balancer request অন্য server-এ পাঠালে সমস্যা হতে পারে।

Better:

Node 1 ─┐
Node 2 ─┼── Redis Session Store
Node 3 ─┘

তখন সব instance একই session store access করতে পারে।

Alternative:

Stateless JWT authentication।

কোনটি ব্যবহার করবেন তা security, revocation, session behavior এবং architecture-এর উপর নির্ভর করে।`
  },

  // ============================================================
  // BFF / API GATEWAY
  // ============================================================

  {
    id: "node-91",
    category: "Architecture",
    difficulty: "Very Important",
    tags: ["API Gateway", "BFF"],
    question: "API Gateway এবং BFF কী?",
    answer: `API Gateway হলো clients এবং backend services-এর সামনে থাকা entry point।

Client
 ↓
API Gateway
 ↓
Services

Responsibilities:

- Authentication
- Rate limiting
- Routing
- TLS termination
- Logging
- Request aggregation

BFF = Backend For Frontend।

Different frontend-এর জন্য specialized backend layer।

Example:

Web BFF
Mobile BFF
Admin BFF

সব frontend-এর requirement এক না হলে BFF useful হতে পারে।`
  },

  // ============================================================
  // DISTRIBUTED TRACING
  // ============================================================

  {
    id: "node-92",
    category: "Observability",
    difficulty: "Senior",
    tags: ["Tracing", "OpenTelemetry"],
    question: "Distributed Tracing কী?",
    answer: `একটি request multiple services-এর মধ্য দিয়ে গেলে পুরো journey trace করার technique।

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

একটি trace ID:

trace-123

প্রতিটি service span তৈরি করতে পারে।

Trace:

Gateway: 20ms
Order: 50ms
Payment: 500ms
Inventory: 30ms

এখানে বোঝা যায় Payment Service bottleneck।`
  },

  // ============================================================
  // GRACEFUL ERROR / FALLBACK
  // ============================================================

  {
    id: "node-93",
    category: "Resilience",
    difficulty: "Senior",
    tags: ["Fallback", "Circuit Breaker"],
    question: "Fallback strategy কী?",
    answer: `Dependency unavailable হলে alternative response দেওয়া।

Example:

Product Service
 ↓
Recommendation Service DOWN
 ↓
Return product without recommendations

অথবা:

Primary API
 ↓
Failure
 ↓
Cached data

Fallback সব business operation-এর জন্য safe নয়।

Payment-এর মতো critical operation-এ incorrect fallback dangerous হতে পারে।`
  },

  // ============================================================
  // SYSTEM DESIGN
  // ============================================================

  {
    id: "node-94",
    category: "System Design",
    difficulty: "Senior",
    tags: ["Scalable API", "Architecture"],
    question: "একটি scalable Node.js API architecture কীভাবে design করবেন?",
    answer: `Typical architecture:

                 Internet
                    ↓
                 CDN/WAF
                    ↓
              Load Balancer
                    ↓
              API Gateway
                    ↓
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     Node API    Node API    Node API
        ↓           ↓           ↓
        └───────────┼───────────┘
                    ↓
               Redis Cache
                    ↓
              Primary DB
              /       \\
        Replica 1    Replica 2

Async workloads:

Node API
 ↓
Kafka/RabbitMQ
 ↓
Workers

Observability:

Logs + Metrics + Traces

Important principles:

- Stateless API
- Horizontal scaling
- Connection pooling
- Caching
- Queue for async work
- Database optimization
- Timeouts
- Retry
- Circuit breaker
- Rate limiting`
  },

  // ============================================================
  // SENIOR TROUBLESHOOTING
  // ============================================================

  {
    id: "node-95",
    category: "Production Troubleshooting",
    difficulty: "Senior",
    tags: ["Production", "Debugging"],
    question: "Production Node.js server CPU 100% হলে কীভাবে troubleshoot করবেন?",
    answer: `Step 1:
Check which process/container high CPU ব্যবহার করছে।

Step 2:
Check event loop lag।

Step 3:
CPU profile নিন।

Step 4:
Identify hot function।

Possible causes:

- Infinite loop
- Large JSON serialization
- Regex catastrophic backtracking
- CPU-heavy calculation
- Excessive logging
- Encryption/compression
- Memory pressure/GC

Fix:

CPU-heavy work
 ↓
Worker Thread / Queue / Separate Service

Database issue হলে CPU profiling-এর আগে DB metrics-ও check করতে হবে।`
  },

  {
    id: "node-96",
    category: "Production Troubleshooting",
    difficulty: "Senior",
    tags: ["Production", "Memory"],
    question: "Node.js server memory continuously increase করলে কী করবেন?",
    answer: `Step 1:
Check RSS/heap usage।

Step 2:
Observe GC behavior।

Step 3:
Take heap snapshots।

Step 4:
Compare snapshots।

Step 5:
Find retained objects।

Check:

- Global cache
- Event listeners
- Timers
- Closures
- Request references
- Large buffers
- WebSocket connections

তারপর fix করে load test করুন।

শুধু process restart করা permanent solution নয়; leak-এর root cause identify করতে হবে।`
  },

  {
    id: "node-97",
    category: "Production Troubleshooting",
    difficulty: "Senior",
    tags: ["Production", "Latency"],
    question: "Node.js API latency হঠাৎ বেড়ে গেলে কীভাবে root cause বের করবেন?",
    answer: `Observe:

API latency
 ↓
Application CPU
 ↓
Event loop lag
 ↓
Memory
 ↓
DB latency
 ↓
External API latency
 ↓
Network
 ↓
Connection pool
 ↓
Queue backlog

Distributed tracing থাকলে:

Request
 ↓
Gateway
 ↓
Service
 ↓
DB
 ↓
External service

কোন span slow তা identify করুন।

Principle:

Don't guess.

Measure → isolate → reproduce → fix → verify.`
  },

  // ============================================================
  // ADVANCED JAVASCRIPT / NODE
  // ============================================================

  {
    id: "node-98",
    category: "JavaScript Runtime",
    difficulty: "Very Important",
    tags: ["Closure", "Memory"],
    question: "Closure Node.js application-এ কী?",
    answer: `Closure হলো function-এর সাথে তার lexical scope-এর reference ধরে রাখার behavior।

Example:

function createCounter() {
  let count = 0;

  return () => ++count;
}

const counter = createCounter();

counter();
counter();

Returned function count variable access করতে পারে।

Node.js-এ closure useful:

- Callbacks
- Middleware
- Factories
- Private state

কিন্তু unnecessary large objects closure-এর মাধ্যমে retain করলে memory leak হতে পারে।`
  },

  {
    id: "node-99",
    category: "JavaScript Runtime",
    difficulty: "Very Important",
    tags: ["this", "JavaScript"],
    question: "Node.js-এ this কীভাবে কাজ করে?",
    answer: `this-এর value function কীভাবে call হচ্ছে তার উপর নির্ভর করে।

Object method:

obj.method()

→ this = obj

Arrow function:

const fn = () => {}

Arrow function নিজের this bind করে না; lexical this ব্যবহার করে।

Node.js code-এ callback এবং class method-এর ক্ষেত্রে this behavior ভুল বুঝলে bug তৈরি হতে পারে।

Modern code-এ arrow functions এবং explicit binding ব্যবহারের কারণে এই issue কমানো যায়।`
  },

  // ============================================================
  // NODE INTERNALS
  // ============================================================

  {
    id: "node-100",
    category: "Node.js Internals",
    difficulty: "Senior",
    tags: ["libuv", "Internals"],
    question: "libuv কী?",
    answer: `libuv হলো Node.js-এর গুরুত্বপূর্ণ cross-platform library, যা asynchronous I/O এবং event loop implementation-এর core অংশ।

It helps with:

- Event loop
- File system operations
- Networking
- Timers
- Thread pool

Concept:

Node.js APIs
 ↓
libuv
 ↓
OS / Thread Pool
 ↓
Events
 ↓
Event Loop
 ↓
JavaScript

Node.js-এর asynchronous architecture বোঝার জন্য libuv খুব গুরুত্বপূর্ণ।`
  },

  {
    id: "node-101",
    category: "Node.js Internals",
    difficulty: "Senior",
    tags: ["Thread Pool", "libuv"],
    question: "libuv Thread Pool কী?",
    answer: `কিছু blocking বা expensive operations Node.js main JS thread-এর বাইরে libuv thread pool ব্যবহার করতে পারে।

Common examples-এর মধ্যে filesystem এবং কিছু crypto/DNS operations থাকতে পারে।

Concept:

JavaScript
 ↓
libuv
 ↓
Thread Pool
 ├── Worker
 ├── Worker
 ├── Worker
 └── Worker

Thread pool size এবং workload অনুযায়ী concurrency behavior পরিবর্তিত হতে পারে।

CPU-heavy arbitrary JavaScript code-এর জন্য thread pool নয়; Worker Threads বেশি appropriate।`
  },

  // ============================================================
  // DNS
  // ============================================================

  {
    id: "node-102",
    category: "Networking",
    difficulty: "Senior",
    tags: ["DNS", "Networking"],
    question: "Node.js-এ DNS lookup কীভাবে কাজ করতে পারে?",
    answer: `DNS hostname থেকে IP address resolve করে।

Example:

api.example.com
 ↓
DNS
 ↓
IP address

Node.js-এ DNS resolution-এর বিভিন্ন API এবং behavior আছে।

কিছু DNS operation OS/libuv facilities ব্যবহার করতে পারে, আবার dns.resolve-এর মতো APIs network DNS queries করতে পারে।

High-throughput application-এ DNS behavior এবং caching understanding useful।`
  },

  // ============================================================
  // HTTP KEEP ALIVE
  // ============================================================

  {
    id: "node-103",
    category: "Networking",
    difficulty: "Senior",
    tags: ["Keep Alive", "HTTP"],
    question: "HTTP Keep-Alive কী এবং Node.js-এ কেন গুরুত্বপূর্ণ?",
    answer: `প্রতিটি HTTP request-এর জন্য নতুন TCP connection তৈরি না করে existing connection reuse করা যায়।

Without keep-alive:

Request
 ↓
TCP connect
 ↓
Response
 ↓
Close

With keep-alive:

Connection
 ↓
Request 1
 ↓
Response
 ↓
Request 2
 ↓
Response

Benefits:

- Less TCP handshake
- Lower latency
- Lower CPU/network overhead

High-throughput microservices-এ connection reuse গুরুত্বপূর্ণ।`
  },

  // ============================================================
  // SECURITY
  // ============================================================

  {
    id: "node-104",
    category: "Security",
    difficulty: "Very Important",
    tags: ["Prototype Pollution", "JavaScript"],
    question: "Prototype Pollution কী?",
    answer: `JavaScript object prototype maliciousভাবে modify করা গেলে prototype pollution হতে পারে।

Risk:

Object
 ↓
Prototype modified
 ↓
Unexpected properties inherited
 ↓
Security/logic issue

Preventive measures:

- Validate input
- Avoid unsafe deep merge
- Use trusted libraries
- Restrict object keys
- Avoid blindly merging user-controlled objects

Node.js ecosystem-এ dependency security scanning-ও গুরুত্বপূর্ণ।`
  },

  {
    id: "node-105",
    category: "Security",
    difficulty: "Very Important",
    tags: ["ReDoS", "Regex"],
    question: "ReDoS কী এবং Node.js-এ কেন dangerous?",
    answer: `ReDoS = Regular Expression Denial of Service।

কিছু poorly designed regex specially crafted input-এর জন্য অত্যন্ত বেশি CPU time নিতে পারে।

Node.js-এর main event loop block হলে:

Malicious input
 ↓
Expensive Regex
 ↓
CPU high
 ↓
Event Loop blocked
 ↓
All requests slow

Solutions:

- Safe regex
- Input length limits
- Regex analysis
- Avoid catastrophic backtracking
- Move expensive processing off main thread`
  },

  // ============================================================
  // FINAL SENIOR QUESTIONS
  // ============================================================

  {
    id: "node-106",
    category: "Senior Interview",
    difficulty: "Senior",
    tags: ["Architecture", "Node.js"],
    question: "কখন Node.js ব্যবহার করবেন না?",
    answer: `Node.js excellent হলেও সব workload-এর জন্য ideal নয়।

Avoid বা carefully consider করুন যখন application-এর primary workload:

- Heavy CPU computation
- Scientific computation
- Large ML training
- CPU-intensive image/video processing

যদিও Worker Threads বা separate services দিয়ে Node.js architecture-এ এগুলো integrate করা যায়।

Node.js-এর strongest area:

I/O-heavy
Network-heavy
Real-time
API
Microservices
Streaming`
  },

  {
    id: "node-107",
    category: "Senior Interview",
    difficulty: "Senior",
    tags: ["Architecture", "Scaling"],
    question: "Node.js application scalable করার সবচেয়ে গুরুত্বপূর্ণ principles কী?",
    answer: `Core principles:

1. Non-blocking I/O
2. Stateless services
3. Horizontal scaling
4. Connection pooling
5. Caching
6. Database indexing
7. Queue/background jobs
8. Timeouts
9. Retry with backoff
10. Circuit breaker
11. Rate limiting
12. Graceful shutdown
13. Health checks
14. Structured logging
15. Distributed tracing
16. Metrics
17. Load testing
18. Efficient memory management
19. Worker Threads for CPU-heavy tasks
20. Proper database architecture

Scalability শুধু Node.js-এর speed-এর বিষয় নয়।

পুরো system:

Client
 ↓
Gateway
 ↓
Node.js
 ↓
Cache
 ↓
DB
 ↓
Queue
 ↓
Workers

সব layer-এর bottleneck consider করতে হয়।`
  },

  {
    id: "node-108",
    category: "Senior Interview",
    difficulty: "Senior",
    tags: ["Interview", "Production"],
    question: "একজন Senior Node.js Developer-এর সবচেয়ে গুরুত্বপূর্ণ interview topics কী কী?",
    answer: `Core:

- Node.js runtime
- V8
- libuv
- Event Loop
- Async programming
- Promise
- async/await
- EventEmitter
- Streams
- Buffer
- File system

Performance:

- Event loop blocking
- CPU profiling
- Memory leak
- Garbage collection
- Connection pooling
- Caching

Backend:

- HTTP
- REST API
- Authentication
- JWT
- Authorization
- Validation
- Error handling
- Rate limiting
- Pagination
- Idempotency

Database:

- Transactions
- Indexes
- ORM
- N+1
- Connection pool
- Query optimization

Distributed systems:

- Microservices
- REST/gRPC
- Kafka/RabbitMQ
- Retry
- Timeout
- Circuit breaker
- Saga
- Outbox
- Eventual consistency

Production:

- Docker
- Kubernetes
- Health check
- Graceful shutdown
- Logging
- Metrics
- Distributed tracing
- CI/CD

Architecture:

- SOLID
- Dependency Injection
- Clean Architecture
- Repository pattern
- Layered architecture
- CQRS
- Event-driven architecture

Senior interview-এ definition-এর পাশাপাশি অবশ্যই explain করতে হবে:

1. কী?
2. কেন?
3. কীভাবে কাজ করে?
4. কখন ব্যবহার করবেন?
5. কখন ব্যবহার করবেন না?
6. Trade-off কী?
7. Production-এ কীভাবে debug করবেন?`
  }

];