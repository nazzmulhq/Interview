const nodejsInterviewQuestions = [
  {
    "id": "node-1",
    "category": "Node.js Fundamentals",
    "difficulty": "Very Important",
    "tags": [
      "Node.js",
      "Runtime"
    ],
    "question": "Node.js কী?",
    "answer": "\n      <p>Node.js হলো একটি JavaScript runtime environment, যা browser-এর বাইরে JavaScript execute করতে দেয়।</p>\n      <p>Node.js V8 JavaScript engine ব্যবহার করে এবং non-blocking I/O model-এর মাধ্যমে network-intensive application তৈরি করতে খুব ভালো কাজ করে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nNode.js\n ↓\nV8 Engine\n ↓\nJavaScript Execution</code></pre>\n      </div>\n      <p>এর সাথে libuv asynchronous I/O, event loop এবং OS-level operations handle করতে সাহায্য করে।</p>\n      <h4>Common use cases:</h4>\n      <ul>\n        <li>REST API</li>\n        <li>Real-time application</li>\n        <li>WebSocket</li>\n        <li>Microservices</li>\n        <li>Streaming</li>\n        <li>CLI tools</li>\n        <li>BFF/API gateway</li>\n      </ul>\n      <p>Node.js CPU-heavy কাজের চেয়ে I/O-heavy application-এর জন্য বেশি উপযোগী।</p>\n    "
  },
  {
    "id": "node-2",
    "category": "Node.js Fundamentals",
    "difficulty": "Very Important",
    "tags": [
      "Node.js",
      "V8"
    ],
    "question": "V8 Engine কী?",
    "answer": "\n      <p>V8 হলো Google-এর JavaScript engine, যা Chrome এবং Node.js-এ JavaScript execute করে।</p>\n      <h4>Node.js-এর ক্ষেত্রে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JavaScript\n ↓\nV8\n ↓\nMachine Code</code></pre>\n      </div>\n      <h4>V8-এর গুরুত্বপূর্ণ কাজ:</h4>\n      <ul>\n        <li>JavaScript parsing</li>\n        <li>Bytecode generation</li>\n        <li>JIT compilation</li>\n        <li>Optimization</li>\n        <li>Garbage collection</li>\n      </ul>\n      <p>Node.js নিজে JavaScript engine নয়।</p>\n      <p>Node.js runtime = V8 + libuv + Node APIs + অন্যান্য runtime components।</p>\n    "
  },
  {
    "id": "node-3",
    "category": "Node.js Fundamentals",
    "difficulty": "Very Important",
    "tags": [
      "Node.js",
      "Runtime"
    ],
    "question": "Node.js কি single-threaded?",
    "answer": "\n      <p>Node.js-এর JavaScript execution model মূলত single main thread-এর উপর চলে।</p>\n      <p>কিন্তু এর মানে Node.js পুরোপুরি single-threaded নয়।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Main JS Thread\n      ↓\nEvent Loop\n      ↓\nlibuv\n      ↓\nOS / Thread Pool</code></pre>\n      </div>\n      <p>CPU-heavy বা কিছু asynchronous operations-এর জন্য libuv thread pool ব্যবহার করতে পারে।</p>\n      <p>এছাড়া Node.js Worker Threads ব্যবহার করে সত্যিকারের parallel JavaScript execution করা যায়।</p>\n      <h4>তাই interview-এ বলা ভালো:</h4>\n      <p>\"Node.js uses a single main JavaScript thread with an asynchronous event-driven architecture, while background work can use the OS or libuv thread pool, and CPU parallelism can be achieved with worker threads or processes.\"</p>\n    "
  },
  {
    "id": "node-4",
    "category": "Node.js Fundamentals",
    "difficulty": "Very Important",
    "tags": [
      "Node.js",
      "Architecture"
    ],
    "question": "Node.js-এর architecture কীভাবে কাজ করে?",
    "answer": "\n      <h4>Simplified architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n                   ↓\n              Node.js Server\n                   ↓\n             Event Loop\n                   ↓\n       ┌───────────┴───────────┐\n       ↓                       ↓\n   Call Stack              libuv\n                               ↓\n                    ┌──────────┴──────────┐\n                    ↓                     ↓\n                  OS I/O              Thread Pool\n                    ↓                     ↓\n                 Callback/Event Queue\n                    ↓\n                Event Loop\n                    ↓\n                JavaScript</code></pre>\n      </div>\n      <p>Node.js মূলত event-driven এবং non-blocking architecture ব্যবহার করে।</p>\n      <p>একটি request-এর জন্য blocking না করে অন্য request process করা যায়।</p>\n    "
  },
  {
    "id": "node-5",
    "category": "Node.js Fundamentals",
    "difficulty": "Very Important",
    "tags": [
      "Node.js",
      "Non Blocking"
    ],
    "question": "Blocking এবং Non-blocking I/O কী?",
    "answer": "\n      <p>Blocking operation current execution flow-কে অপেক্ষা করায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const data = fs.readFileSync(\"file.txt\");</code></pre>\n      </div>\n      <p>এখানে file read শেষ না হওয়া পর্যন্ত current thread অপেক্ষা করে।</p>\n      <h4>Non-blocking:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>fs.readFile(\"file.txt\", (err, data) =&gt; {\n  // callback\n});</code></pre>\n      </div>\n      <p>এখানে Node.js file read-এর জন্য অপেক্ষা না করে অন্য কাজ করতে পারে।</p>\n      <p>Node.js-এর scalability-এর একটি বড় কারণ হলো non-blocking I/O।</p>\n    "
  },
  {
    "id": "node-6",
    "category": "Event Loop",
    "difficulty": "Very Important",
    "tags": [
      "Event Loop",
      "Async"
    ],
    "question": "Node.js Event Loop কী?",
    "answer": "\n      <p>Event Loop হলো Node.js-এর asynchronous operation coordination mechanism।</p>\n      <h4>Simplified:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Call Stack\n   ↓\nAsync Operation\n   ↓\nlibuv / OS\n   ↓\nCallback Queue\n   ↓\nEvent Loop\n   ↓\nCall Stack</code></pre>\n      </div>\n      <h4>Event Loop continuously check করে:</h4>\n      <ul>\n        <li>Call stack empty কি না</li>\n        <li>কোন callback ready কি না</li>\n        <li>Timer ready কি না</li>\n        <li>I/O event ready কি না</li>\n      </ul>\n      <p>তারপর appropriate callback JavaScript execution-এর জন্য stack-এ পাঠায়।</p>\n      <p>এভাবেই Node.js blocking না করে অনেক I/O request handle করতে পারে।</p>\n    "
  },
  {
    "id": "node-7",
    "category": "Event Loop",
    "difficulty": "Very Important",
    "tags": [
      "Event Loop",
      "Phases"
    ],
    "question": "Node.js Event Loop-এর phases কী কী?",
    "answer": "\n      <h4>Node.js event loop-এর প্রধান phases:</h4>\n      <ol>\n        <li>Timers</li>\n        <li>Pending callbacks</li>\n        <li>Idle, prepare</li>\n        <li>Poll</li>\n        <li>Check</li>\n        <li>Close callbacks</li>\n      </ol>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Timers\n ↓\nPending callbacks\n ↓\nPoll\n ↓\nCheck\n ↓\nClose callbacks</code></pre>\n      </div>\n      <p>প্রতিটি phase-এর নিজস্ব callback handling behavior আছে।</p>\n      <p>Interview-এ শুধু list নয়, Poll এবং Check phase-এর role জানা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-8",
    "category": "Event Loop",
    "difficulty": "Very Important",
    "tags": [
      "setTimeout",
      "setImmediate"
    ],
    "question": "setTimeout() এবং setImmediate() এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>setTimeout(callback, 0) timer phase-এর সাথে সম্পর্কিত।</p>\n      <p>setImmediate(callback) check phase-এ execute হয়।</p>\n      <h4>I/O callback-এর ভিতরে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>fs.readFile(\"file.txt\", () =&gt; {\n  setTimeout(() =&gt; console.log(\"timeout\"), 0);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setImmediate(() =&gt; console.log(\"immediate\"));\n});</code></pre>\n      </div>\n      <p>এক্ষেত্রে সাধারণত setImmediate আগে execute হওয়ার সম্ভাবনা বেশি।</p>\n      <h4>কিন্তু top-level code-এ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setTimeout(..., 0);\nsetImmediate(...);</code></pre>\n      </div>\n      <p>কোনটি আগে হবে তা নির্ভর করতে পারে environment এবং timing-এর উপর।</p>\n      <p>তাই \"setTimeout always আগে\" বলা ভুল।</p>\n    "
  },
  {
    "id": "node-9",
    "category": "Event Loop",
    "difficulty": "Very Important",
    "tags": [
      "process.nextTick",
      "Microtask"
    ],
    "question": "process.nextTick() কী?",
    "answer": "\n      <p>process.nextTick() current operation-এর পর খুব high-priority callback হিসেবে execute হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"A\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>process.nextTick(() =&gt; {\n  console.log(\"B\");\n});</code></pre>\n      </div>\n      <p>console.log(\"C\");</p>\n      <h4>Result:</h4>\n      <p>A<br>C<br>B</p>\n      <p>nextTick queue সাধারণ event loop progression-এর আগে process হয়।</p>\n      <p>অতিরিক্ত recursive nextTick ব্যবহার করলে event loop starvation হতে পারে।</p>\n    "
  },
  {
    "id": "node-10",
    "category": "Event Loop",
    "difficulty": "Very Important",
    "tags": [
      "Promise",
      "Microtask"
    ],
    "question": "Promise microtask এবং process.nextTick-এর relationship কী?",
    "answer": "\n      <p>Node.js-এ process.nextTick queue এবং Promise microtask queue খুব high priority asynchronous queues।</p>\n      <h4>সাধারণভাবে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Current JS execution\n ↓\nprocess.nextTick queue\n ↓\nPromise microtasks\n ↓\nEvent loop phases</code></pre>\n      </div>\n      <h4>তাই:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>process.nextTick(() =&gt; ...)\nPromise.resolve().then(() =&gt; ...)\nsetTimeout(() =&gt; ...)</code></pre>\n      </div>\n      <p>এর execution order বোঝার জন্য Node.js-specific queue behavior জানা দরকার।</p>\n      <h4>Interview-এ important point:</h4>\n      <p>\"nextTick can run before the Promise microtask queue, and excessive nextTick usage can starve the event loop.\"</p>\n    "
  },
  {
    "id": "node-11",
    "category": "Event Loop",
    "difficulty": "Senior",
    "tags": [
      "Event Loop",
      "Starvation"
    ],
    "question": "Event Loop Starvation কী?",
    "answer": "\n      <p>যখন event loop দীর্ঘ সময় কোনো কাজ থেকে মুক্ত হতে পারে না, তখন অন্য request/callback execute হতে পারে না।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>while (true) {\n  // CPU-heavy loop\n}</code></pre>\n      </div>\n      <h4>অথবা excessive recursive:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>process.nextTick(function loop() {\n  process.nextTick(loop);\n});</code></pre>\n      </div>\n      <h4>Result:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Event loop blocked\n ↓\nOther requests delayed\n ↓\nLatency increases\n ↓\nServer becomes unresponsive</code></pre>\n      </div>\n      <h4>Solution:</h4>\n      <ul>\n        <li>CPU work offload</li>\n        <li>Worker Threads</li>\n        <li>Child Processes</li>\n        <li>Queue-based processing</li>\n        <li>Break large work into chunks</li>\n      </ul>\n    "
  },
  {
    "id": "node-12",
    "category": "Async Programming",
    "difficulty": "Very Important",
    "tags": [
      "Callback",
      "Async"
    ],
    "question": "Callback কী?",
    "answer": "\n      <p>Callback হলো এমন function যেটি অন্য function-এর কাছে argument হিসেবে দেওয়া হয় এবং পরে execute করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>fs.readFile(\"data.txt\", (err, data) =&gt; {\n  console.log(data);\n});</code></pre>\n      </div>\n      <p>এখানে callback asynchronous operation complete হওয়ার পরে execute হয়।</p>\n      <h4>Problem:</h4>\n      <h4>অনেক nested callback হলে:</h4>\n      <p>Callback Hell</p>\n      <p>এজন্য Promise এবং async/await বেশি readable approach।</p>\n    "
  },
  {
    "id": "node-13",
    "category": "Async Programming",
    "difficulty": "Very Important",
    "tags": [
      "Promise",
      "Async"
    ],
    "question": "Promise কী?",
    "answer": "\n      <p>Promise হলো future asynchronous result represent করার abstraction।</p>\n      <h4>States:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Pending\n ↓\nFulfilled</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Pending\n ↓\nRejected</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = fetchData();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>result\n  .then(data =&gt; {})\n  .catch(error =&gt; {});</code></pre>\n      </div>\n      <p>Promise callback nesting কমায় এবং async flow সহজ করে।</p>\n    "
  },
  {
    "id": "node-14",
    "category": "Async Programming",
    "difficulty": "Very Important",
    "tags": [
      "async",
      "await"
    ],
    "question": "async/await কীভাবে কাজ করে?",
    "answer": "\n      <p>async function Promise return করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>await Promise-এর result পাওয়ার জন্য current async function-এর execution pause করে, কিন্তু Node.js event loop পুরোপুরি block করে না।</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async function getUser() {\n  const user = await fetchUser();\n  return user;\n}</code></pre>\n      </div>\n      <h4>await মানে:</h4>\n      <p>\"এই async function-এর পরবর্তী অংশ Promise settle না হওয়া পর্যন্ত চালিও না\"</p>\n      <p>এটি thread block করার equivalent নয়।</p>\n    "
  },
  {
    "id": "node-15",
    "category": "Async Programming",
    "difficulty": "Very Important",
    "tags": [
      "Promise.all",
      "Concurrency"
    ],
    "question": "Promise.all() কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Independent asynchronous operations parallel/concurrently start করতে Promise.all() ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [users, products] = await Promise.all([\n  getUsers(),\n  getProducts()\n]);</code></pre>\n      </div>\n      <h4>এতে sequential:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>getUsers()\n ↓\ngetProducts()</code></pre>\n      </div>\n      <p>এর বদলে দুটো operation overlap করতে পারে।</p>\n      <p>কিন্তু একটি Promise reject করলে Promise.all পুরো operation reject করে।</p>\n      <p>যদি সব result দরকার এবং failure tolerate করতে হয়, Promise.allSettled() consider করা যায়।</p>\n    "
  },
  {
    "id": "node-16",
    "category": "Async Programming",
    "difficulty": "Very Important",
    "tags": [
      "Promise.allSettled",
      "Promise"
    ],
    "question": "Promise.all এবং Promise.allSettled-এর পার্থক্য কী?",
    "answer": "\n      <h4>Promise.all():</h4>\n      <p>একটি Promise reject করলে পুরো result reject হয়।</p>\n      <h4>Promise.allSettled():</h4>\n      <p>সব Promise শেষ হওয়া পর্যন্ত অপেক্ষা করে।</p>\n      <h4>Example result:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[\n  { status: \"fulfilled\", value: ... },\n  { status: \"rejected\", reason: ... }\n]</code></pre>\n      </div>\n      <h4>Use:</h4>\n      <p>Promise.all<br>→ সব operation সফল হওয়া প্রয়োজন।</p>\n      <p>Promise.allSettled<br>→ প্রতিটি operation-এর individual result দরকার।</p>\n    "
  },
  {
    "id": "node-17",
    "category": "Node.js Modules",
    "difficulty": "Very Important",
    "tags": [
      "CommonJS",
      "ESM"
    ],
    "question": "CommonJS এবং ES Module-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>CommonJS:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const express = require(\"express\");</code></pre>\n      </div>\n      <p>module.exports = router;</p>\n      <h4>ESM:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import express from \"express\";</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export default router;</code></pre>\n      </div>\n      <p>CommonJS historically Node.js-এর default module system ছিল।</p>\n      <p>Modern Node.js ES Modules support করে।</p>\n      <h4>package.json-এ:</h4>\n      <p>\"type\": \"module\"</p>\n      <p>দিলে .js files ESM হিসেবে interpret করা যায়।</p>\n      <h4>Main difference:</h4>\n      <p>CommonJS → require/module.exports</p>\n      <p>ESM → import/export</p>\n    "
  },
  {
    "id": "node-18",
    "category": "Node.js Modules",
    "difficulty": "Important",
    "tags": [
      "require",
      "import"
    ],
    "question": "require() এবং import-এর গুরুত্বপূর্ণ পার্থক্য কী?",
    "answer": "\n      <h4>require():</h4>\n      <ul>\n        <li>CommonJS</li>\n        <li>Runtime-এ call করা যায়</li>\n        <li>Dynamic loading সম্ভব</li>\n      </ul>\n      <h4>import:</h4>\n      <ul>\n        <li>ES Modules</li>\n        <li>Static module structure</li>\n        <li>Tooling/tree-shaking-এর জন্য better ecosystem support</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const fs = require(\"fs\");</code></pre>\n      </div>\n      <p>vs</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import fs from \"node:fs\";</code></pre>\n      </div>\n      <p>Modern projects-এ project-wide module system consistent রাখা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-19",
    "category": "Node.js Modules",
    "difficulty": "Important",
    "tags": [
      "package.json",
      "npm"
    ],
    "question": "package.json কী?",
    "answer": "\n      <p>package.json Node.js project-এর metadata এবং dependency configuration file।</p>\n      <h4>Common fields:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"name\": \"...\",\n  \"version\": \"...\",\n  \"scripts\": {},\n  \"dependencies\": {},\n  \"devDependencies\": {}\n}</code></pre>\n      </div>\n      <h4>এতে থাকে:</h4>\n      <ul>\n        <li>Project name</li>\n        <li>Version</li>\n        <li>Scripts</li>\n        <li>Dependencies</li>\n        <li>Engine requirements</li>\n        <li>Module configuration</li>\n      </ul>\n      <p>Node.js project management-এর core file এটি।</p>\n    "
  },
  {
    "id": "node-20",
    "category": "Node.js Modules",
    "difficulty": "Very Important",
    "tags": [
      "dependencies",
      "devDependencies"
    ],
    "question": "dependencies এবং devDependencies-এর পার্থক্য কী?",
    "answer": "\n      <h4>dependencies:</h4>\n      <p>Production application runtime-এ প্রয়োজন।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>express\ntypeorm\njsonwebtoken</code></pre>\n      </div>\n      <h4>devDependencies:</h4>\n      <p>Development/testing/build-এর জন্য।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>jest\neslint\ntypescript\nprettier</code></pre>\n      </div>\n      <p>npm install package<br>→ dependencies</p>\n      <p>npm install -D package<br>→ devDependencies</p>\n      <p>Production deployment strategy অনুযায়ী devDependencies install না-ও করা হতে পারে।</p>\n    "
  },
  {
    "id": "node-21",
    "category": "NPM",
    "difficulty": "Very Important",
    "tags": [
      "npm",
      "package-lock"
    ],
    "question": "package-lock.json কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>package-lock.json dependency tree-এর resolved versions lock করে।</p>\n      <h4>package.json:</h4>\n      <p><strong>express:</strong> \"^5.x\"</p>\n      <p>কিন্তু exact dependency tree lock file-এ থাকে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Reproducible installation</li>\n        <li>Consistent CI/CD</li>\n        <li>Dependency integrity</li>\n        <li>Transitive dependency versions control</li>\n      </ul>\n      <p>Team project-এ lock file commit করা সাধারণত recommended।</p>\n    "
  },
  {
    "id": "node-22",
    "category": "NPM",
    "difficulty": "Important",
    "tags": [
      "npm",
      "Semantic Versioning"
    ],
    "question": "Semantic Versioning কী?",
    "answer": "\n      <h4>Version format:</h4>\n      <p>MAJOR.MINOR.PATCH</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>2.5.3</code></pre>\n      </div>\n      <p><strong>MAJOR:</strong><br>Breaking changes</p>\n      <p><strong>MINOR:</strong><br>Backward-compatible features</p>\n      <p><strong>PATCH:</strong><br>Backward-compatible bug fixes</p>\n      <p>^ এবং ~ version range dependency resolution-এ গুরুত্বপূর্ণ।</p>\n      <p>Production application-এ dependency upgrades controlledভাবে করা উচিত।</p>\n    "
  },
  {
    "id": "node-23",
    "category": "Node.js APIs",
    "difficulty": "Very Important",
    "tags": [
      "fs",
      "File System"
    ],
    "question": "Node.js fs module কী?",
    "answer": "\n      <p>fs module filesystem-এর সাথে কাজ করতে ব্যবহৃত হয়।</p>\n      <h4>Examples:</h4>\n      <ul>\n        <li>readFile</li>\n        <li>writeFile</li>\n        <li>appendFile</li>\n        <li>mkdir</li>\n        <li>unlink</li>\n        <li>rename</li>\n        <li>stat</li>\n      </ul>\n      <h4>Synchronous:</h4>\n      <p>fs.readFileSync()</p>\n      <h4>Asynchronous:</h4>\n      <p>fs.promises.readFile()</p>\n      <p>Server application-এ asynchronous API prefer করা উচিত যাতে main thread unnecessarily block না হয়।</p>\n    "
  },
  {
    "id": "node-24",
    "category": "Streams",
    "difficulty": "Very Important",
    "tags": [
      "Streams",
      "File"
    ],
    "question": "Node.js Stream কী?",
    "answer": "\n      <p>Stream data পুরোপুরি memory-তে load না করে chunk-by-chunk process করতে দেয়।</p>\n      <h4>Types:</h4>\n      <ol>\n        <li>Readable</li>\n        <li>Writable</li>\n        <li>Duplex</li>\n        <li>Transform</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Large File\n ↓\nChunk 1\n ↓\nChunk 2\n ↓\nChunk 3</code></pre>\n      </div>\n      <p>এতে memory efficient processing সম্ভব।</p>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Large file upload/download</li>\n        <li>Video streaming</li>\n        <li>HTTP response</li>\n        <li>Compression</li>\n        <li>Data processing</li>\n      </ul>\n    "
  },
  {
    "id": "node-25",
    "category": "Streams",
    "difficulty": "Very Important",
    "tags": [
      "Backpressure",
      "Streams"
    ],
    "question": "Backpressure কী?",
    "answer": "\n      <p>Producer যদি consumer-এর চেয়ে দ্রুত data produce করে, তখন consumer-এর capacity-এর বাইরে data জমতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Producer → 100 MB/s\nConsumer → 10 MB/s</code></pre>\n      </div>\n      <p>এখানে backpressure প্রয়োজন।</p>\n      <p>Node.js streams backpressure handle করার mechanism দেয়।</p>\n      <h4>pipe():</h4>\n      <p>readable.pipe(writable)</p>\n      <p>automatically data flow manage করতে সাহায্য করে।</p>\n      <p>Large data processing-এর জন্য এটি খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-26",
    "category": "Streams",
    "difficulty": "Senior",
    "tags": [
      "pipe",
      "Stream"
    ],
    "question": "pipe() কীভাবে কাজ করে?",
    "answer": "\n      <p>pipe() একটি readable stream-এর output writable stream-এ পাঠায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>readStream.pipe(writeStream);</code></pre>\n      </div>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>File\n ↓\nReadable Stream\n ↓\npipe()\n ↓\nWritable Stream\n ↓\nDestination</code></pre>\n      </div>\n      <p>এটি memory usage এবং backpressure management-এর জন্য খুব useful।</p>\n    "
  },
  {
    "id": "node-27",
    "category": "Node.js APIs",
    "difficulty": "Very Important",
    "tags": [
      "Buffer",
      "Binary"
    ],
    "question": "Node.js Buffer কী?",
    "answer": "\n      <p>Buffer binary data handle করার জন্য Node.js-এর বিশেষ data structure।</p>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>File data</li>\n        <li>TCP packets</li>\n        <li>Image</li>\n        <li>Video</li>\n        <li>Encryption</li>\n        <li>Network protocols</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const buffer = Buffer.from(\"Hello\");</code></pre>\n      </div>\n      <p>JavaScript সাধারণত text-oriented হলেও Node.js server-side application-এ binary data frequently handle করতে হয়।</p>\n    "
  },
  {
    "id": "node-28",
    "category": "Node.js APIs",
    "difficulty": "Important",
    "tags": [
      "Buffer",
      "Encoding"
    ],
    "question": "Buffer এবং String-এর পার্থক্য কী?",
    "answer": "\n      <h4>String:</h4>\n      <p>Text data represent করে।</p>\n      <h4>Buffer:</h4>\n      <p>Raw binary bytes represent করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const buffer = Buffer.from(\"Hello\");</code></pre>\n      </div>\n      <p>buffer.toString();</p>\n      <p>Network/file processing-এ Buffer গুরুত্বপূর্ণ কারণ binary data byte-level-এ process করতে হয়।</p>\n    "
  },
  {
    "id": "node-29",
    "category": "HTTP",
    "difficulty": "Very Important",
    "tags": [
      "HTTP",
      "Server"
    ],
    "question": "Node.js-এ HTTP server কীভাবে তৈরি করবেন?",
    "answer": "\n      <p>Built-in http module ব্যবহার করা যায়।</p>\n      <h4>Example concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const http = require(\"node:http\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const server = http.createServer((req, res) =&gt; {\n  res.end(\"Hello\");\n});</code></pre>\n      </div>\n      <p>server.listen(3000);</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nHTTP Server\n ↓\nRequest Handler\n ↓\nResponse</code></pre>\n      </div>\n      <p>Express/Fastify/NestJS-এর মতো framework internally Node HTTP capabilities-এর উপর build করতে পারে।</p>\n    "
  },
  {
    "id": "node-30",
    "category": "HTTP",
    "difficulty": "Very Important",
    "tags": [
      "HTTP",
      "Request"
    ],
    "question": "HTTP request-এর প্রধান অংশগুলো কী?",
    "answer": "\n      <h4>HTTP request-এর মধ্যে থাকতে পারে:</h4>\n      <ol>\n        <li>Method</li>\n        <li>URL</li>\n        <li>Headers</li>\n        <li>Query parameters</li>\n        <li>Path parameters</li>\n        <li>Body</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>POST /users?id=10</code></pre>\n      </div>\n      <p><strong>Headers:</strong><br>Authorization<br>Content-Type</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Body:\n{\n  \"name\": \"Nazmul\"\n}</code></pre>\n      </div>\n      <p>Server এগুলো parse করে application logic-এ পাঠায়।</p>\n    "
  },
  {
    "id": "node-31",
    "category": "HTTP",
    "difficulty": "Very Important",
    "tags": [
      "HTTP",
      "Status Code"
    ],
    "question": "Common HTTP status codes কী কী?",
    "answer": "\n      <h4>2xx:</h4>\n      <p>200 → OK<br>201 → Created<br>204 → No Content</p>\n      <h4>4xx:</h4>\n      <p>400 → Bad Request<br>401 → Unauthorized<br>403 → Forbidden<br>404 → Not Found<br>409 → Conflict<br>422 → Unprocessable Content<br>429 → Too Many Requests</p>\n      <h4>5xx:</h4>\n      <p>500 → Internal Server Error<br>502 → Bad Gateway<br>503 → Service Unavailable<br>504 → Gateway Timeout</p>\n      <p>Interview-এ status code শুধু মুখস্থ নয়, কখন কোনটি ব্যবহার করবেন সেটাও জানতে হবে।</p>\n    "
  },
  {
    "id": "node-32",
    "category": "Node.js Process",
    "difficulty": "Very Important",
    "tags": [
      "process",
      "Environment"
    ],
    "question": "Node.js process object কী?",
    "answer": "\n      <p>process হলো current Node.js process-এর information এবং control interface।</p>\n      <h4>Common:</h4>\n      <p>process.env<br>process.argv<br>process.pid<br>process.cwd()<br>process.exit()<br>process.version</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const port = process.env.PORT || 3000;</code></pre>\n      </div>\n      <p>Production configuration environment variables-এর মাধ্যমে manage করা common practice।</p>\n    "
  },
  {
    "id": "node-33",
    "category": "Node.js Process",
    "difficulty": "Very Important",
    "tags": [
      "Environment Variables",
      "Config"
    ],
    "question": "Environment variable কীভাবে manage করবেন?",
    "answer": "\n      <p>Configuration hardcode না করে environment variable ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>PORT\nDATABASE_URL\nJWT_SECRET</code></pre>\n      </div>\n      <h4>Development:</h4>\n      <p>.env</p>\n      <h4>Production:</h4>\n      <p>Secret Manager / deployment environment</p>\n      <h4>Important:</h4>\n      <ul>\n        <li>Secrets Git-এ commit করবেন না</li>\n        <li>Environment-specific configuration রাখুন</li>\n        <li>Validation করুন</li>\n        <li>Required secret missing হলে application startup fail করতে পারেন</li>\n      </ul>\n    "
  },
  {
    "id": "node-34",
    "category": "Node.js Process",
    "difficulty": "Very Important",
    "tags": [
      "SIGTERM",
      "Graceful Shutdown"
    ],
    "question": "Graceful Shutdown কী এবং Node.js-এ কেন দরকার?",
    "answer": "\n      <p>Server বন্ধ হওয়ার আগে active requests এবং resources safely close করাকে graceful shutdown বলে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>SIGTERM\n ↓\nStop accepting new requests\n ↓\nFinish active requests\n ↓\nClose DB connection\n ↓\nClose Redis\n ↓\nClose message consumers\n ↓\nExit</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>process.on(\"SIGTERM\", async () =&gt; {\n  await server.close();\n  await db.close();\n  process.exit(0);\n});</code></pre>\n      </div>\n      <p>Docker/Kubernetes deployment-এ graceful shutdown খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-35",
    "category": "Error Handling",
    "difficulty": "Very Important",
    "tags": [
      "Error",
      "Async"
    ],
    "question": "Node.js-এ error handling কীভাবে করবেন?",
    "answer": "\n      <h4>Synchronous:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  riskyOperation();\n} catch (error) {\n  // handle\n}</code></pre>\n      </div>\n      <h4>Promise:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  await riskyOperation();\n} catch (error) {\n  // handle\n}</code></pre>\n      </div>\n      <h4>Promise chain:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>operation()\n  .catch(error =&gt; {});</code></pre>\n      </div>\n      <h4>Callback:</h4>\n      <p>callback(err, result);</p>\n      <p>Production application-এ centralized error handling এবং structured logging ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "node-36",
    "category": "Error Handling",
    "difficulty": "Very Important",
    "tags": [
      "Unhandled Rejection",
      "Exception"
    ],
    "question": "Unhandled Promise Rejection কী?",
    "answer": "\n      <p>যখন Promise reject হয় কিন্তু কোনো catch/handling নেই, তখন unhandled rejection হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.reject(new Error(\"Failed\"));</code></pre>\n      </div>\n      <p>Production-এ unhandled rejection ignore করা dangerous।</p>\n      <h4>Application-level strategy:</h4>\n      <ul>\n        <li>Proper await/catch</li>\n        <li>Centralized error handling</li>\n        <li>Logging</li>\n        <li>Monitoring</li>\n        <li>Controlled shutdown where appropriate</li>\n      </ul>\n      <p>Error silently ignore করা উচিত নয়।</p>\n    "
  },
  {
    "id": "node-37",
    "category": "Error Handling",
    "difficulty": "Senior",
    "tags": [
      "uncaughtException",
      "Process"
    ],
    "question": "uncaughtException কী?",
    "answer": "\n      <p>যখন synchronous exception process-level handler দ্বারা uncaught থাকে, তখন uncaughtException event trigger হতে পারে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>process.on(\"uncaughtException\", error =&gt; {\n  logger.error(error);\n});</code></pre>\n      </div>\n      <p>এটিকে normal error recovery mechanism হিসেবে ব্যবহার করা উচিত নয়।</p>\n      <p>কারণ process potentially corrupted state-এ থাকতে পারে।</p>\n      <h4>Production strategy:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Log\n ↓\nStop accepting new work\n ↓\nGraceful shutdown\n ↓\nRestart via process manager/orchestrator</code></pre>\n      </div>\n    "
  },
  {
    "id": "node-38",
    "category": "Memory Management",
    "difficulty": "Very Important",
    "tags": [
      "Heap",
      "Memory"
    ],
    "question": "Node.js memory কীভাবে manage করে?",
    "answer": "\n      <p>JavaScript objects সাধারণত V8 heap-এ থাকে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Node.js\n ↓\nV8\n ↓\nHeap\n ↓\nObjects</code></pre>\n      </div>\n      <p>V8 garbage collector unreachable objects cleanup করে।</p>\n      <h4>Memory-related issues:</h4>\n      <ul>\n        <li>Memory leak</li>\n        <li>Large objects</li>\n        <li>Unbounded cache</li>\n        <li>Event listener leak</li>\n        <li>Long-lived references</li>\n      </ul>\n      <p>Production-এ memory usage monitor করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-39",
    "category": "Memory Management",
    "difficulty": "Very Important",
    "tags": [
      "Memory Leak",
      "Heap"
    ],
    "question": "Node.js memory leak কী?",
    "answer": "\n      <p>যখন application এমন objects-এর reference ধরে রাখে যেগুলো আর দরকার নেই, Garbage Collector সেগুলো free করতে পারে না।</p>\n      <h4>Common causes:</h4>\n      <ul>\n        <li>Global arrays</li>\n        <li>Unbounded cache</li>\n        <li>Event listeners</li>\n        <li>Timers</li>\n        <li>Closures</li>\n        <li>Long-lived objects</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const cache = {};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app.get(\"/user/:id\", async (req, res) =&gt; {\n  cache[req.params.id] = await loadUser(req.params.id);\n});</code></pre>\n      </div>\n      <p>Cache cleanup না করলে memory continuously grow করতে পারে।</p>\n    "
  },
  {
    "id": "node-40",
    "category": "Memory Management",
    "difficulty": "Senior",
    "tags": [
      "Heap Snapshot",
      "Debugging"
    ],
    "question": "Node.js memory leak কীভাবে debug করবেন?",
    "answer": "\n      <h4>Approach:</h4>\n      <ol>\n        <li>Memory usage monitor</li>\n        <li>Heap snapshot নিন</li>\n        <li>Multiple snapshots compare করুন</li>\n        <li>Retained objects identify করুন</li>\n        <li>References trace করুন</li>\n        <li>Suspected code fix করুন</li>\n        <li>Load test করুন</li>\n      </ol>\n      <h4>Useful tools:</h4>\n      <ul>\n        <li>Chrome DevTools</li>\n        <li>Node.js inspector</li>\n        <li>Heap snapshots</li>\n        <li>Clinic.js</li>\n        <li>APM tools</li>\n      </ul>\n      <h4>Important metric:</h4>\n      <p>Heap usage continuously increase করছে কি না।</p>\n      <p>একটি normal GC cycle-এর পরে memory baseline recover না করলে leak-এর সম্ভাবনা থাকে।</p>\n    "
  },
  {
    "id": "node-41",
    "category": "Concurrency",
    "difficulty": "Very Important",
    "tags": [
      "Worker Threads",
      "CPU"
    ],
    "question": "Worker Threads কী?",
    "answer": "\n      <p>Worker Threads Node.js-এ JavaScript code parallelভাবে execute করতে দেয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Main Thread\n    |\n    +---- Worker Thread\n    |\n    +---- Worker Thread</code></pre>\n      </div>\n      <h4>CPU-intensive কাজের জন্য useful:</h4>\n      <ul>\n        <li>Image processing</li>\n        <li>Encryption</li>\n        <li>Compression</li>\n        <li>Large calculations</li>\n        <li>CPU-heavy parsing</li>\n      </ul>\n      <p>I/O-heavy কাজের জন্য সাধারণ async I/O যথেষ্ট হতে পারে।</p>\n    "
  },
  {
    "id": "node-42",
    "category": "Concurrency",
    "difficulty": "Very Important",
    "tags": [
      "Worker Threads",
      "Child Process"
    ],
    "question": "Worker Threads এবং Child Process-এর পার্থক্য কী?",
    "answer": "\n      <h4>Worker Threads:</h4>\n      <ul>\n        <li>Same Node.js process-এর মধ্যে worker</li>\n        <li>JavaScript execution parallel করতে পারে</li>\n        <li>Memory sharing-এর কিছু capability আছে</li>\n        <li>CPU-intensive JS-এর জন্য useful</li>\n      </ul>\n      <h4>Child Process:</h4>\n      <ul>\n        <li>Separate OS process</li>\n        <li>আলাদা memory space</li>\n        <li>Stronger isolation</li>\n        <li>External commands/programs চালাতে useful</li>\n      </ul>\n      <h4>Concept:</h4>\n      <p><strong>Worker:</strong><br>Process<br> ├── Main Thread<br> └── Worker</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Child Process:\nParent Process\n      |\n      +---- Child Process</code></pre>\n      </div>\n    "
  },
  {
    "id": "node-43",
    "category": "Concurrency",
    "difficulty": "Senior",
    "tags": [
      "Cluster",
      "Scaling"
    ],
    "question": "Node.js Cluster কী?",
    "answer": "\n      <p>Cluster multiple Node.js processes চালিয়ে multiple CPU cores ব্যবহার করতে সাহায্য করতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Load Balancer\n                  ↓\n       ┌──────────┼──────────┐\n       ↓          ↓          ↓\n   Worker 1   Worker 2   Worker 3\n       ↓          ↓          ↓\n    CPU Core   CPU Core   CPU Core</code></pre>\n      </div>\n      <p>প্রতিটি worker আলাদা process এবং আলাদা memory space ব্যবহার করে।</p>\n      <p>Modern deployments-এ Kubernetes বা external process managers দিয়ে horizontal scaling করাও common।</p>\n    "
  },
  {
    "id": "node-44",
    "category": "Node.js Core",
    "difficulty": "Very Important",
    "tags": [
      "EventEmitter",
      "Events"
    ],
    "question": "EventEmitter কী?",
    "answer": "\n      <p>EventEmitter Node.js-এর event-driven programming model-এর core abstraction।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const emitter = new EventEmitter();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>emitter.on(\"order.created\", data =&gt; {\n  console.log(data);\n});</code></pre>\n      </div>\n      <p>emitter.emit(\"order.created\", order);</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>emit event\n ↓\nregistered listeners\n ↓\ncallbacks execute</code></pre>\n      </div>\n      <p>Node.js-এর অনেক internal APIs event-based।</p>\n    "
  },
  {
    "id": "node-45",
    "category": "Node.js Core",
    "difficulty": "Important",
    "tags": [
      "EventEmitter",
      "Memory Leak"
    ],
    "question": "EventEmitter memory leak কীভাবে তৈরি করতে পারে?",
    "answer": "\n      <p>যদি repeatedly event listener add করা হয় কিন্তু remove না করা হয়, listener count বাড়তে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>emitter.on(\"data\", handler);</code></pre>\n      </div>\n      <h4>যদি request প্রতি নতুন listener add হয়:</h4>\n      <p>Request 1 → listener<br>Request 2 → listener<br>Request 3 → listener</p>\n      <p>এভাবে listeners accumulate করতে পারে।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Register listener once</li>\n        <li>Remove listener</li>\n        <li>Use once() where appropriate</li>\n        <li>Avoid per-request global listeners</li>\n      </ul>\n    "
  },
  {
    "id": "node-46",
    "category": "Node.js Security",
    "difficulty": "Very Important",
    "tags": [
      "Security",
      "SQL Injection"
    ],
    "question": "Node.js application-এ SQL Injection কীভাবে prevent করবেন?",
    "answer": "\n      <p>User input সরাসরি SQL string-এর মধ্যে concatenate করা উচিত নয়।</p>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const sql = \"SELECT * FROM users WHERE email = '\" + email + \"'\";</code></pre>\n      </div>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Parameterized query\n ↓\nPrepared statement\n ↓\nORM/Query Builder parameter binding</code></pre>\n      </div>\n      <h4>Additional:</h4>\n      <ul>\n        <li>Input validation</li>\n        <li>Least-privilege DB user</li>\n        <li>Proper escaping</li>\n        <li>Security testing</li>\n      </ul>\n      <p>ORM ব্যবহার করলেই automatically সব security problem solve হয় না; raw query ব্যবহারের ক্ষেত্রেও সতর্ক থাকতে হবে।</p>\n    "
  },
  {
    "id": "node-47",
    "category": "Node.js Security",
    "difficulty": "Very Important",
    "tags": [
      "Security",
      "XSS"
    ],
    "question": "XSS কী এবং Node.js API কীভাবে এটি reduce করতে পারে?",
    "answer": "\n      <p>XSS = Cross-Site Scripting।</p>\n      <p>Attacker malicious script inject করতে পারে।</p>\n      <h4>API layer:</h4>\n      <ul>\n        <li>Validate input</li>\n        <li>Sanitize where appropriate</li>\n        <li>Proper output encoding</li>\n        <li>Avoid unsafe HTML generation</li>\n        <li>Set security headers</li>\n      </ul>\n      <p>API নিজে browser rendering না করলেও backend থেকে unsafe content return করলে frontend risk তৈরি হতে পারে।</p>\n      <p>Security frontend + backend দুই layer-এই consider করতে হবে।</p>\n    "
  },
  {
    "id": "node-48",
    "category": "Node.js Security",
    "difficulty": "Very Important",
    "tags": [
      "Security",
      "Helmet"
    ],
    "question": "Helmet কী?",
    "answer": "\n      <p>Helmet Node.js/Express applications-এর HTTP security headers configure করতে সাহায্য করে।</p>\n      <h4>Security headers-এর examples:</h4>\n      <ul>\n        <li>Content-Security-Policy</li>\n        <li>X-Content-Type-Options</li>\n        <li>Referrer-Policy</li>\n        <li>Strict-Transport-Security</li>\n      </ul>\n      <p>Helmet security-এর একটি layer মাত্র।</p>\n      <p>Authentication, authorization, validation, rate limiting এবং secure configuration আলাদাভাবে দরকার।</p>\n    "
  },
  {
    "id": "node-49",
    "category": "Node.js Security",
    "difficulty": "Very Important",
    "tags": [
      "Password",
      "Hashing"
    ],
    "question": "Password Node.js-এ কীভাবে store করবেন?",
    "answer": "\n      <p>Password কখনো plain text হিসেবে store করা উচিত নয়।</p>\n      <h4>Use:</h4>\n      <ul>\n        <li>Argon2</li>\n        <li>bcrypt</li>\n      </ul>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Password\n ↓\nPassword Hashing\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Login:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Password\n ↓\nHash verification\n ↓\nMatch?\n ↓\nAuthenticated</code></pre>\n      </div>\n      <p>Encryption এবং password hashing এক জিনিস নয়।</p>\n      <p>Password সাধারণত reversible encryption নয়, one-way password hashing ব্যবহার করে store করা হয়।</p>\n    "
  },
  {
    "id": "node-50",
    "category": "Node.js Security",
    "difficulty": "Very Important",
    "tags": [
      "JWT",
      "Authentication"
    ],
    "question": "JWT কীভাবে Node.js authentication-এ কাজ করে?",
    "answer": "\n      <h4>Login:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nCredentials\n ↓\nServer\n ↓\nVerify\n ↓\nJWT\n ↓\nClient</code></pre>\n      </div>\n      <h4>পরবর্তী request:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAuthorization: Bearer &lt;token&gt;\n ↓\nServer\n ↓\nVerify JWT\n ↓\nUser identity\n ↓\nProtected resource</code></pre>\n      </div>\n      <p>JWT সাধারণত claims বহন করে।</p>\n      <h4>Important:</h4>\n      <p>JWT encrypted data নয়; সাধারণ JWT payload readable হতে পারে।</p>\n      <p>Sensitive data JWT payload-এ রাখা উচিত নয়।</p>\n    "
  },
  {
    "id": "node-51",
    "category": "Performance",
    "difficulty": "Very Important",
    "tags": [
      "Performance",
      "Latency"
    ],
    "question": "Node.js API slow হলে কীভাবে debug করবেন?",
    "answer": "\n      <h4>Step-by-step:</h4>\n      <ol>\n        <li>Measure API latency</li>\n        <li>Check event loop lag</li>\n        <li>Check CPU</li>\n        <li>Check memory</li>\n        <li>Check database latency</li>\n        <li>Check external API latency</li>\n        <li>Check connection pool</li>\n        <li>Check slow queries</li>\n        <li>Check network</li>\n        <li>Profile CPU</li>\n      </ol>\n      <h4>Potential causes:</h4>\n      <ul>\n        <li>Blocking code</li>\n        <li>Slow DB query</li>\n        <li>Missing index</li>\n        <li>External API timeout</li>\n        <li>Memory pressure</li>\n        <li>Event loop starvation</li>\n        <li>Too much JSON serialization</li>\n      </ul>\n      <h4>Rule:</h4>\n      <p>Measure first → Optimize second।</p>\n    "
  },
  {
    "id": "node-52",
    "category": "Performance",
    "difficulty": "Senior",
    "tags": [
      "Event Loop",
      "CPU"
    ],
    "question": "Node.js API-তে CPU-heavy কাজ কেন সমস্যা?",
    "answer": "\n      <p>Node.js main JavaScript thread event loop-এর উপর নির্ভর করে।</p>\n      <h4>যদি CPU-heavy code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (...) {\n  heavyCalculation();\n}</code></pre>\n      </div>\n      <p>তাহলে event loop blocked হতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request A\n ↓\nCPU-heavy task\n ↓\nEvent Loop blocked\n ↓\nRequest B waits\n ↓\nRequest C waits</code></pre>\n      </div>\n      <h4>Solution:</h4>\n      <ul>\n        <li>Worker Threads</li>\n        <li>Child Processes</li>\n        <li>Background jobs</li>\n        <li>Queue</li>\n        <li>Separate microservice</li>\n      </ul>\n    "
  },
  {
    "id": "node-53",
    "category": "Performance",
    "difficulty": "Very Important",
    "tags": [
      "Compression",
      "HTTP"
    ],
    "question": "Node.js API response compression কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Large response network-এর মাধ্যমে পাঠানোর আগে compression করলে payload size কমে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JSON 1 MB\n ↓\ngzip/brotli\n ↓\n200 KB</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Less bandwidth</li>\n        <li>Faster transfer</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <p>Compression CPU cost তৈরি করে।</p>\n      <p>সব response blindly compress করা উচিত নয়।</p>\n      <p>Reverse proxy/CDN layer-এ compression handle করাও common।</p>\n    "
  },
  {
    "id": "node-54",
    "category": "Performance",
    "difficulty": "Very Important",
    "tags": [
      "Caching",
      "Redis"
    ],
    "question": "Node.js application-এ caching কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Repeated expensive operation avoid করতে cache ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nRedis\n ↓\nCache Hit\n ↓\nReturn</code></pre>\n      </div>\n      <h4>Cache Miss:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nRedis miss\n ↓\nDatabase\n ↓\nCache\n ↓\nResponse</code></pre>\n      </div>\n      <h4>Common cached data:</h4>\n      <ul>\n        <li>User profile</li>\n        <li>Product</li>\n        <li>Configuration</li>\n        <li>Permission</li>\n        <li>Frequently accessed reports</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <p>Cache invalidation এবং stale data management করতে হয়।</p>\n    "
  },
  {
    "id": "node-55",
    "category": "Database",
    "difficulty": "Very Important",
    "tags": [
      "Connection Pool",
      "Database"
    ],
    "question": "Database Connection Pool কী?",
    "answer": "\n      <p>প্রতিটি request-এর জন্য নতুন DB connection তৈরি না করে reusable connection-এর pool রাখা হয়।</p>\n      <h4>Without pool:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCreate connection\n ↓\nQuery\n ↓\nClose</code></pre>\n      </div>\n      <h4>With pool:</h4>\n      <p>Connection Pool<br> ├── Connection 1<br> ├── Connection 2<br> ├── Connection 3<br> └── Connection 4</p>\n      <p>Request এসে available connection নেয়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Lower connection overhead</li>\n        <li>Better performance</li>\n        <li>Controlled concurrency</li>\n      </ul>\n      <p>Pool size খুব ছোট হলে waiting বাড়ে।</p>\n      <p>খুব বড় হলে database overload হতে পারে।</p>\n    "
  },
  {
    "id": "node-56",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "Connection Pool",
      "Scaling"
    ],
    "question": "Node.js connection pool size কীভাবে determine করবেন?",
    "answer": "\n      <p>একটি fixed magic number নেই।</p>\n      <h4>Consider:</h4>\n      <ul>\n        <li>DB max connections</li>\n        <li>Number of application instances</li>\n        <li>Query latency</li>\n        <li>CPU</li>\n        <li>Concurrent workload</li>\n        <li>Pool wait time</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>DB max connections = 500</code></pre>\n      </div>\n      <p>Application instances = 10</p>\n      <h4>প্রতিটি instance-কে 100 connections দিলে:</h4>\n      <p>10 × 100 = 1000</p>\n      <p>এটি DB capacity exceed করবে।</p>\n      <h4>তাই total pool capacity হিসাব করতে হবে:</h4>\n      <p>Instance Count × Pool Size &lt;= Safe DB Connection Capacity</p>\n      <p>তারপর load testing করে tune করতে হবে।</p>\n    "
  },
  {
    "id": "node-57",
    "category": "Observability",
    "difficulty": "Very Important",
    "tags": [
      "Logging",
      "Production"
    ],
    "question": "Production Node.js application-এ কীভাবে logging করবেন?",
    "answer": "\n      <p>Structured logging ব্যবহার করা ভালো।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  \"level\": \"error\",\n  \"requestId\": \"...\",\n  \"userId\": \"...\",\n  \"route\": \"/orders\",\n  \"duration\": 120,\n  \"error\": \"...\"\n}</code></pre>\n      </div>\n      <h4>Common information:</h4>\n      <ul>\n        <li>Timestamp</li>\n        <li>Level</li>\n        <li>Request ID</li>\n        <li>Trace ID</li>\n        <li>Service name</li>\n        <li>Route</li>\n        <li>Duration</li>\n        <li>Error stack</li>\n      </ul>\n      <h4>Popular libraries:</h4>\n      <ul>\n        <li>Pino</li>\n        <li>Winston</li>\n      </ul>\n      <p>console.log development-এ useful হলেও production observability-এর জন্য structured logger better।</p>\n    "
  },
  {
    "id": "node-58",
    "category": "Observability",
    "difficulty": "Very Important",
    "tags": [
      "Request ID",
      "Tracing"
    ],
    "question": "Request ID কেন দরকার?",
    "answer": "\n      <p>একটি request-এর সব logs correlate করার জন্য request ID ব্যবহার করা হয়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nNode Service\n ↓\nDatabase\n ↓\nOther Service</code></pre>\n      </div>\n      <p>সব log-এ একই requestId থাকলে পুরো request trace করা সহজ হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>requestId=abc123</code></pre>\n      </div>\n      <p>API log<br>DB log<br>Payment service log</p>\n      <h4>সব জায়গায়:</h4>\n      <p>abc123</p>\n      <p>Production debugging-এ এটি অত্যন্ত useful।</p>\n    "
  },
  {
    "id": "node-59",
    "category": "Testing",
    "difficulty": "Very Important",
    "tags": [
      "Unit Test",
      "Integration Test"
    ],
    "question": "Node.js application-এ Unit, Integration এবং E2E test-এর পার্থক্য কী?",
    "answer": "\n      <h4>Unit Test:</h4>\n      <p>একটি function/class isolatedভাবে test করে।</p>\n      <h4>Integration Test:</h4>\n      <p>Multiple components একসাথে কাজ করছে কি না test করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Service + Database</code></pre>\n      </div>\n      <h4>E2E:</h4>\n      <p>পুরো user flow test করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Login\n ↓\nCreate Order\n ↓\nPayment\n ↓\nOrder confirmation</code></pre>\n      </div>\n      <h4>Typical pyramid:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Many Unit Tests\n      ↓\nSome Integration Tests\n      ↓\nFewer E2E Tests</code></pre>\n      </div>\n    "
  },
  {
    "id": "node-60",
    "category": "Testing",
    "difficulty": "Very Important",
    "tags": [
      "Mock",
      "Stub"
    ],
    "question": "Mock এবং Stub কী?",
    "answer": "\n      <h4>Stub:</h4>\n      <p>Predefined response দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>getUser() → fake user</code></pre>\n      </div>\n      <h4>Mock:</h4>\n      <p>Interaction verify করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>paymentService.charge()\nmust be called once</code></pre>\n      </div>\n      <p>External API, database বা message broker test-এর সময় mocking useful।</p>\n      <p>তবে excessive mocking করলে test বাস্তব behavior থেকে দূরে চলে যেতে পারে।</p>\n    "
  },
  {
    "id": "node-61",
    "category": "API Design",
    "difficulty": "Very Important",
    "tags": [
      "REST",
      "API"
    ],
    "question": "Node.js REST API design-এর important principles কী?",
    "answer": "\n      <h4>Important:</h4>\n      <ul>\n        <li>Resource-oriented URLs</li>\n        <li>Correct HTTP methods</li>\n        <li>Correct status codes</li>\n        <li>Validation</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Pagination</li>\n        <li>Filtering</li>\n        <li>Sorting</li>\n        <li>Error format</li>\n        <li>Versioning</li>\n        <li>Idempotency</li>\n        <li>Rate limiting</li>\n        <li>Observability</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET    /users\nGET    /users/:id\nPOST   /users\nPATCH  /users/:id\nDELETE /users/:id</code></pre>\n      </div>\n      <p>API design শুধু route তৈরি করা নয়; consistency এবং operational behavior-ও গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-62",
    "category": "API Design",
    "difficulty": "Very Important",
    "tags": [
      "Pagination",
      "API"
    ],
    "question": "Offset pagination এবং Cursor pagination-এর পার্থক্য কী?",
    "answer": "\n      <h4>Offset:</h4>\n      <p>GET /orders?page=100&amp;limit=20</p>\n      <h4>Database:</h4>\n      <p>OFFSET 1980<br>LIMIT 20</p>\n      <p>Large offset হলে performance সমস্যা হতে পারে।</p>\n      <h4>Cursor:</h4>\n      <p>GET /orders?cursor=abc&amp;limit=20</p>\n      <p>Cursor একটি position represent করে।</p>\n      <h4>Cursor pagination:</h4>\n      <ul>\n        <li>Large dataset-এর জন্য better</li>\n        <li>Stable pagination</li>\n        <li>Infinite scroll-এর জন্য useful</li>\n      </ul>\n      <h4>Offset:</h4>\n      <ul>\n        <li>Simple</li>\n        <li>Admin/reporting UI-তে convenient</li>\n      </ul>\n      <p>Use case অনুযায়ী choose করতে হবে।</p>\n    "
  },
  {
    "id": "node-63",
    "category": "API Design",
    "difficulty": "Very Important",
    "tags": [
      "Idempotency",
      "API"
    ],
    "question": "Idempotency কী এবং payment API-তে কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>একই request multiple times execute হলেও final effect একই থাকা idempotency-এর মূল ধারণা।</p>\n      <h4>Payment:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCharge $100\n ↓\nNetwork timeout\n ↓\nClient retry\n ↓\nCharge $100 again?</code></pre>\n      </div>\n      <h4>Idempotency key:</h4>\n      <p>POST /payments<br><strong>Idempotency-Key:</strong> abc123</p>\n      <p>Server একই key-এর previous result return করতে পারে।</p>\n      <p>এতে duplicate payment risk কমে।</p>\n    "
  },
  {
    "id": "node-64",
    "category": "API Security",
    "difficulty": "Very Important",
    "tags": [
      "Rate Limiting",
      "Redis"
    ],
    "question": "Rate Limiting কী?",
    "answer": "\n      <p>একটি client/IP/user কত request নির্দিষ্ট সময়ে করতে পারবে তার limit।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>100 requests/minute</code></pre>\n      </div>\n      <h4>যদি 101st request আসে:</h4>\n      <p>429 Too Many Requests</p>\n      <h4>Algorithms:</h4>\n      <ul>\n        <li>Fixed Window</li>\n        <li>Sliding Window</li>\n        <li>Token Bucket</li>\n        <li>Leaky Bucket</li>\n      </ul>\n      <p>Distributed Node.js application-এ Redis-based rate limiting common।</p>\n    "
  },
  {
    "id": "node-65",
    "category": "Authentication",
    "difficulty": "Very Important",
    "tags": [
      "JWT",
      "Refresh Token"
    ],
    "question": "Access Token এবং Refresh Token-এর পার্থক্য কী?",
    "answer": "\n      <h4>Access Token:</h4>\n      <p>Short-lived</p>\n      <p>API access-এর জন্য।</p>\n      <h4>Refresh Token:</h4>\n      <p>Longer-lived</p>\n      <p>নতুন access token পাওয়ার জন্য।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Login\n ↓\nAccess Token + Refresh Token\n ↓\nAccess Token expires\n ↓\nRefresh Token\n ↓\nNew Access Token</code></pre>\n      </div>\n      <p>Security-এর জন্য refresh token carefully protect এবং rotate/revoke করার strategy প্রয়োজন।</p>\n    "
  },
  {
    "id": "node-66",
    "category": "Authentication",
    "difficulty": "Very Important",
    "tags": [
      "RBAC",
      "Authorization"
    ],
    "question": "Authentication এবং Authorization-এর পার্থক্য কী?",
    "answer": "\n      <h4>Authentication:</h4>\n      <p>\"তুমি কে?\"</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Login → user verified</code></pre>\n      </div>\n      <h4>Authorization:</h4>\n      <p>\"তুমি কী করতে পারবে?\"</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Admin → delete user\nUser → view profile</code></pre>\n      </div>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Authentication\n ↓\nIdentity\n ↓\nAuthorization\n ↓\nPermission\n ↓\nResource</code></pre>\n      </div>\n    "
  },
  {
    "id": "node-67",
    "category": "Node.js Microservices",
    "difficulty": "Very Important",
    "tags": [
      "Microservices",
      "Architecture"
    ],
    "question": "Node.js দিয়ে microservice কেন তৈরি করা হয়?",
    "answer": "\n      <h4>Node.js-এর সুবিধা:</h4>\n      <ul>\n        <li>Lightweight runtime</li>\n        <li>Fast startup</li>\n        <li>Excellent I/O handling</li>\n        <li>Good API ecosystem</li>\n        <li>Async programming</li>\n        <li>JSON-native ecosystem</li>\n        <li>Good fit for network-heavy services</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API Gateway\n   ↓\n ┌──────┬─────────┬──────────┐\n ↓      ↓         ↓          ↓\nUser  Order    Payment   Notification\nSvc    Svc       Svc        Svc</code></pre>\n      </div>\n      <p>তবে microservice শুধু Node.js দিয়ে তৈরি করা যায় না; architecture এবং service boundaries বেশি গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-68",
    "category": "Node.js Microservices",
    "difficulty": "Very Important",
    "tags": [
      "REST",
      "gRPC",
      "Kafka"
    ],
    "question": "Node.js microservices কীভাবে communicate করতে পারে?",
    "answer": "\n      <h4>দুই ধরনের communication:</h4>\n      <h4>Synchronous:</h4>\n      <ul>\n        <li>REST</li>\n        <li>HTTP</li>\n        <li>gRPC</li>\n      </ul>\n      <h4>Asynchronous:</h4>\n      <ul>\n        <li>Kafka</li>\n        <li>RabbitMQ</li>\n        <li>NATS</li>\n      </ul>\n      <h4>Example:</h4>\n      <h4>REST:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nPayment Service</code></pre>\n      </div>\n      <h4>Event:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nKafka\n ↓\nPayment Service</code></pre>\n      </div>\n      <p>Synchronous communication simple।</p>\n      <p>Asynchronous communication loose coupling এবং scalability improve করতে পারে, কিন্তু eventual consistency এবং operational complexity বাড়ায়।</p>\n    "
  },
  {
    "id": "node-69",
    "category": "Node.js Microservices",
    "difficulty": "Senior",
    "tags": [
      "Circuit Breaker",
      "Resilience"
    ],
    "question": "Circuit Breaker কী?",
    "answer": "\n      <p>একটি dependent service বারবার fail করলে continuously request পাঠানো বন্ধ করার pattern।</p>\n      <h4>States:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Closed\n ↓\nFailures\n ↓\nOpen\n ↓\nWait\n ↓\nHalf Open\n ↓\nSuccess → Closed</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nPayment Service DOWN</code></pre>\n      </div>\n      <p>Circuit breaker open হলে payment service-এ request না পাঠিয়ে দ্রুত failure/fallback return করা যায়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Cascading failure reduce</li>\n        <li>Resource protection</li>\n        <li>Faster failure response</li>\n      </ul>\n    "
  },
  {
    "id": "node-70",
    "category": "Node.js Microservices",
    "difficulty": "Senior",
    "tags": [
      "Retry",
      "Resilience"
    ],
    "question": "Retry strategy কীভাবে design করবেন?",
    "answer": "\n      <p>সব error retry করা উচিত নয়।</p>\n      <h4>Retry suitable:</h4>\n      <ul>\n        <li>Temporary network failure</li>\n        <li>Timeout</li>\n        <li>503</li>\n        <li>Rate limit অনুযায়ী retry-after</li>\n      </ul>\n      <h4>Retry unsuitable:</h4>\n      <ul>\n        <li>400 validation error</li>\n        <li>Authentication failure</li>\n        <li>Business rule failure</li>\n      </ul>\n      <h4>Use:</h4>\n      <p>Exponential Backoff<br>+<br>Jitter</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1 sec\n2 sec\n4 sec\n8 sec</code></pre>\n      </div>\n      <p>Jitter একই সময়ে অনেক client retry করার সমস্যা কমায়।</p>\n      <p>Retry + idempotency খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-71",
    "category": "Message Queue",
    "difficulty": "Very Important",
    "tags": [
      "RabbitMQ",
      "Kafka",
      "Queue"
    ],
    "question": "Node.js application-এ message queue কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Synchronous request-এর পরিবর্তে asynchronous processing করতে queue ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API\n ↓\nQueue\n ↓\nWorker\n ↓\nEmail</code></pre>\n      </div>\n      <p>User API response দ্রুত পেতে পারে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Async processing</li>\n        <li>Load buffering</li>\n        <li>Retry</li>\n        <li>Decoupling</li>\n        <li>Background jobs</li>\n      </ul>\n      <h4>Examples:</h4>\n      <ul>\n        <li>RabbitMQ</li>\n        <li>Kafka</li>\n        <li>BullMQ/Redis</li>\n        <li>NATS</li>\n      </ul>\n    "
  },
  {
    "id": "node-72",
    "category": "Message Queue",
    "difficulty": "Very Important",
    "tags": [
      "RabbitMQ",
      "Kafka"
    ],
    "question": "Kafka এবং RabbitMQ-এর মূল পার্থক্য কী?",
    "answer": "\n      <h4>RabbitMQ:</h4>\n      <ul>\n        <li>Traditional message broker</li>\n        <li>Queue-based</li>\n        <li>Routing এবং work distribution-এর জন্য excellent</li>\n        <li>Task processing-এ common</li>\n      </ul>\n      <h4>Kafka:</h4>\n      <ul>\n        <li>Distributed event streaming platform</li>\n        <li>Durable ordered log</li>\n        <li>High-throughput event streaming</li>\n        <li>Replay capability</li>\n        <li>Event-driven architecture-এর জন্য excellent</li>\n      </ul>\n      <h4>Simple task queue:</h4>\n      <p>RabbitMQ</p>\n      <h4>Large event streaming/data pipeline:</h4>\n      <p>Kafka</p>\n      <p>তবে actual choice workload এবং architecture-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "node-73",
    "category": "Distributed Systems",
    "difficulty": "Senior",
    "tags": [
      "Distributed Systems",
      "Consistency"
    ],
    "question": "Eventual Consistency কী?",
    "answer": "\n      <p>Distributed system-এ সব node একই মুহূর্তে একই data না দেখিয়ে কিছু সময় পরে consistent state-এ পৌঁছালে তাকে eventual consistency বলা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order Service\n ↓\nEvent\n ↓\nKafka\n ↓\nNotification Service</code></pre>\n      </div>\n      <p>Order update immediately notification DB-তে না পৌঁছালেও কিছু সময় পরে পৌঁছাবে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Scalability</li>\n        <li>Availability</li>\n        <li>Loose coupling</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>Temporary stale data</li>\n        <li>More complex application logic</li>\n      </ul>\n    "
  },
  {
    "id": "node-74",
    "category": "Distributed Systems",
    "difficulty": "Senior",
    "tags": [
      "Saga",
      "Transaction"
    ],
    "question": "Saga Pattern কী?",
    "answer": "\n      <p>Distributed transaction-এর পরিবর্তে ছোট local transactions এবং compensating actions ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Create Order\n ↓\nReserve Inventory\n ↓\nPayment\n ↓\nShipment</code></pre>\n      </div>\n      <h4>Payment failed হলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Cancel Order\n ↓\nRelease Inventory</code></pre>\n      </div>\n      <p>এটি compensation।</p>\n      <h4>Saga দুইভাবে হতে পারে:</h4>\n      <ul>\n        <li>Choreography</li>\n        <li>Orchestration</li>\n      </ul>\n      <p>Microservices-এ distributed business transaction manage করতে Saga গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-75",
    "category": "Database",
    "difficulty": "Senior",
    "tags": [
      "N+1",
      "ORM"
    ],
    "question": "Node.js ORM-এ N+1 query problem কী?",
    "answer": "\n      <p>একটি list query করার পর প্রতিটি row-এর জন্য আবার আলাদা query করলে N+1 হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>SELECT users;        // 1 query</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>For each user:\nSELECT orders;       // N queries</code></pre>\n      </div>\n      <h4>Total:</h4>\n      <p>1 + N queries</p>\n      <h4>যদি 100 users:</h4>\n      <p>101 queries</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>JOIN</li>\n        <li>Eager loading</li>\n        <li>Batch query</li>\n        <li>DataLoader</li>\n        <li>Proper ORM relation loading</li>\n      </ul>\n      <p>Performance-critical API-তে N+1 খুব common problem।</p>\n    "
  },
  {
    "id": "node-76",
    "category": "Architecture",
    "difficulty": "Very Important",
    "tags": [
      "Dependency Injection",
      "SOLID"
    ],
    "question": "Node.js application-এ Dependency Injection কী?",
    "answer": "\n      <p>Dependency Injection হলো class/function-এর dependency নিজে create না করে বাইরে থেকে provide করা।</p>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class UserService {\n  constructor() {\n    this.db = new MySQLDatabase();\n  }\n}</code></pre>\n      </div>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class UserService {\n  constructor(db) {\n    this.db = db;\n  }\n}</code></pre>\n      </div>\n      <h4>এতে:</h4>\n      <ul>\n        <li>Testing সহজ</li>\n        <li>Coupling কম</li>\n        <li>Dependency replace করা সহজ</li>\n        <li>Architecture cleaner</li>\n      </ul>\n      <p>NestJS এই pattern heavily ব্যবহার করে।</p>\n    "
  },
  {
    "id": "node-77",
    "category": "Architecture",
    "difficulty": "Senior",
    "tags": [
      "Clean Architecture",
      "SOLID"
    ],
    "question": "Node.js backend-এর Clean Architecture কীভাবে design করবেন?",
    "answer": "\n      <h4>একটি common structure:</h4>\n      <p>src/<br> ├── domain/<br> ├── application/<br> ├── infrastructure/<br> └── presentation/</p>\n      <p><strong>Domain:</strong><br>Business entities/rules</p>\n      <p><strong>Application:</strong><br>Use cases</p>\n      <p><strong>Infrastructure:</strong><br>Database<br>Redis<br>Kafka<br>External APIs</p>\n      <p><strong>Presentation:</strong><br>HTTP controllers/routes</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>HTTP\n ↓\nController\n ↓\nUse Case\n ↓\nRepository Interface\n ↓\nRepository Implementation\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Benefit:</h4>\n      <p>Business logic infrastructure-এর সাথে tightly coupled থাকে না।</p>\n    "
  },
  {
    "id": "node-78",
    "category": "Production",
    "difficulty": "Very Important",
    "tags": [
      "Graceful Shutdown",
      "Kubernetes"
    ],
    "question": "Kubernetes-এ Node.js service deploy করলে graceful shutdown কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>Kubernetes pod terminate করার সময় SIGTERM পাঠাতে পারে।</p>\n      <h4>যদি application immediately exit করে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Active requests\n ↓\nConnection terminated\n ↓\nFailed requests</code></pre>\n      </div>\n      <h4>Graceful shutdown:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>SIGTERM\n ↓\nReadiness false\n ↓\nStop accepting new traffic\n ↓\nFinish active requests\n ↓\nClose DB/Redis/Queue\n ↓\nExit</code></pre>\n      </div>\n      <p>এতে deployment এবং scaling-এর সময় request loss কমে।</p>\n    "
  },
  {
    "id": "node-79",
    "category": "Production",
    "difficulty": "Very Important",
    "tags": [
      "Health Check",
      "Kubernetes"
    ],
    "question": "Liveness এবং Readiness probe কী?",
    "answer": "\n      <h4>Liveness:</h4>\n      <p>Application process healthy কি না।</p>\n      <p><strong>যদি unhealthy:</strong></p>\n      <ul>\n        <li>restart হতে পারে।</li>\n      </ul>\n      <h4>Readiness:</h4>\n      <p>Application traffic নেওয়ার জন্য ready কি না।</p>\n      <p><strong>যদি false:</strong></p>\n      <ul>\n        <li>load balancer traffic পাঠাবে না।</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /health/live\nGET /health/ready</code></pre>\n      </div>\n      <p>Readiness check-এ database বা critical dependency-এর status consider করা যেতে পারে, কিন্তু check design carefully করতে হয় যাতে dependency failure নিজে cascading outage না তৈরি করে।</p>\n    "
  },
  {
    "id": "node-80",
    "category": "File Upload",
    "difficulty": "Very Important",
    "tags": [
      "Upload",
      "Security"
    ],
    "question": "Node.js-এ secure file upload কীভাবে implement করবেন?",
    "answer": "\n      <h4>Important checks:</h4>\n      <ol>\n        <li>File size limit</li>\n        <li>MIME type validation</li>\n        <li>Extension validation</li>\n        <li>File content validation where needed</li>\n        <li>Random filename</li>\n        <li>Storage outside executable directory</li>\n        <li>Virus scanning if required</li>\n        <li>Authentication/authorization</li>\n        <li>Rate limiting</li>\n        <li>Object storage for large files</li>\n      </ol>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nNode.js\n ↓\nValidation\n ↓\nObject Storage\n ↓\nMetadata DB</code></pre>\n      </div>\n      <p>Large files-এর জন্য streaming ব্যবহার করা ভালো।</p>\n    "
  },
  {
    "id": "node-81",
    "category": "Real-Time",
    "difficulty": "Very Important",
    "tags": [
      "WebSocket",
      "Socket.io"
    ],
    "question": "Node.js-এ WebSocket কী?",
    "answer": "\n      <p>WebSocket client এবং server-এর মধ্যে persistent bidirectional communication দেয়।</p>\n      <h4>HTTP:</h4>\n      <p>Client → Request<br>Server → Response</p>\n      <h4>WebSocket:</h4>\n      <p>Client ↔ Server</p>\n      <p>Connection open থাকে।</p>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Chat</li>\n        <li>Live notification</li>\n        <li>Real-time dashboard</li>\n        <li>Multiplayer</li>\n        <li>Live tracking</li>\n      </ul>\n      <p>Multiple Node.js instances হলে WebSocket state synchronization-এর জন্য Redis adapter/pub-sub বা অন্য distributed mechanism প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "node-82",
    "category": "Background Jobs",
    "difficulty": "Very Important",
    "tags": [
      "Cron",
      "Background Job"
    ],
    "question": "Node.js-এ Cron Job এবং Queue Worker-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Cron:</h4>\n      <p>সময় অনুযায়ী কাজ শুরু করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>প্রতি রাত 12টায় report generate।</code></pre>\n      </div>\n      <h4>Queue Worker:</h4>\n      <p>কাজ queue-তে আসলে process করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Order created\n ↓\nQueue\n ↓\nEmail worker</code></pre>\n      </div>\n      <p><strong>Cron:</strong><br>Time-driven</p>\n      <p><strong>Queue:</strong><br>Event/job-driven</p>\n      <p>Heavy background work-এর জন্য queue worker বেশি scalable।</p>\n    "
  },
  {
    "id": "node-83",
    "category": "Production Security",
    "difficulty": "Senior",
    "tags": [
      "Rate Limiting",
      "DDoS"
    ],
    "question": "Node.js API-কে high traffic বা abuse থেকে কীভাবে protect করবেন?",
    "answer": "\n      <h4>Layers:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nCDN / WAF\n ↓\nLoad Balancer\n ↓\nAPI Gateway\n ↓\nRate Limiter\n ↓\nNode.js\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Techniques:</h4>\n      <ul>\n        <li>Rate limiting</li>\n        <li>WAF</li>\n        <li>CDN</li>\n        <li>Request size limits</li>\n        <li>Timeout</li>\n        <li>Connection limits</li>\n        <li>Authentication</li>\n        <li>Abuse detection</li>\n        <li>Caching</li>\n        <li>Queueing</li>\n      </ul>\n      <p>শুধু application-level rate limiting দিয়ে large-scale DDoS solve করা যায় না; edge/network layer-ও প্রয়োজন।</p>\n    "
  },
  {
    "id": "node-84",
    "category": "Resilience",
    "difficulty": "Very Important",
    "tags": [
      "Timeout",
      "Microservices"
    ],
    "question": "Node.js external API call-এ timeout কেন সেট করবেন?",
    "answer": "\n      <p>Timeout না থাকলে একটি slow dependency-এর জন্য request দীর্ঘসময় hanging থাকতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Node API\n ↓\nPayment API\n ↓\nHanging</code></pre>\n      </div>\n      <h4>Result:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Connection occupied\n ↓\nPool exhausted\n ↓\nMore requests wait\n ↓\nCascading failure</code></pre>\n      </div>\n      <h4>তাই:</h4>\n      <p>Connect timeout<br>Request timeout<br>Idle timeout</p>\n      <p>যেখানে appropriate সেট করা উচিত।</p>\n      <p>Timeout + Retry + Circuit Breaker একসাথে resilience improve করতে পারে।</p>\n    "
  },
  {
    "id": "node-85",
    "category": "Database Transaction",
    "difficulty": "Very Important",
    "tags": [
      "Transaction",
      "Node.js"
    ],
    "question": "Node.js service-এ database transaction কীভাবে manage করবেন?",
    "answer": "\n      <h4>Typical flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>BEGIN\n ↓\nINSERT order\n ↓\nUPDATE inventory\n ↓\nINSERT payment record\n ↓\nCOMMIT</code></pre>\n      </div>\n      <h4>Error:</h4>\n      <p>ROLLBACK</p>\n      <h4>Important:</h4>\n      <p>Transaction-এর ভিতরে unnecessary external API call রাখা উচিত নয়।</p>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>BEGIN\n ↓\nDB update\n ↓\nHTTP call\n ↓\nWAIT\n ↓\nCOMMIT</code></pre>\n      </div>\n      <p>এতে transaction দীর্ঘ হয় এবং locks ধরে রাখে।</p>\n      <p>Distributed transaction হলে Saga/Outbox-এর মতো pattern প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "node-86",
    "category": "Database Migration",
    "difficulty": "Senior",
    "tags": [
      "Migration",
      "Zero Downtime"
    ],
    "question": "Node.js production application-এ zero-downtime database migration কীভাবে করবেন?",
    "answer": "\n      <p>Breaking migration সরাসরি করা risky।</p>\n      <h4>Example:</h4>\n      <p><strong>Old application:</strong><br>name column ব্যবহার করছে</p>\n      <p><strong>New application:</strong><br>full_name column চায়</p>\n      <h4>Safe approach:</h4>\n      <p><strong>Phase 1:</strong><br>Add new column</p>\n      <p><strong>Phase 2:</strong><br>Deploy code that writes both</p>\n      <p><strong>Phase 3:</strong><br>Backfill old data</p>\n      <p><strong>Phase 4:</strong><br>Deploy code reading new column</p>\n      <p><strong>Phase 5:</strong><br>Stop writing old column</p>\n      <p><strong>Phase 6:</strong><br>Remove old column later</p>\n      <p>এটি Expand → Migrate → Contract pattern-এর মতো।</p>\n      <p>Rolling deployment-এ backward compatibility গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-87",
    "category": "Deployment",
    "difficulty": "Very Important",
    "tags": [
      "Docker",
      "Production"
    ],
    "question": "Node.js application Dockerize করার basic architecture কী?",
    "answer": "\n      <h4>Typical:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Dockerfile\n ↓\nNode.js Image\n ↓\nContainer\n ↓\nApplication</code></pre>\n      </div>\n      <h4>Production:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Internet\n ↓\nLoad Balancer\n ↓\nNode.js Containers\n ↓\nDatabase / Redis / Kafka</code></pre>\n      </div>\n      <p>Container-এর ভিতরে process manager হিসেবে PM2 সবসময় দরকার হয় না; Docker/Kubernetes নিজেই process lifecycle manage করতে পারে।</p>\n      <p>Container environment-এ সাধারণত one main process per container principle follow করা হয়।</p>\n    "
  },
  {
    "id": "node-88",
    "category": "Deployment",
    "difficulty": "Very Important",
    "tags": [
      "PM2",
      "Cluster"
    ],
    "question": "PM2 কী?",
    "answer": "\n      <p>PM2 হলো Node.js process manager।</p>\n      <h4>Features:</h4>\n      <ul>\n        <li>Process management</li>\n        <li>Restart on crash</li>\n        <li>Log management</li>\n        <li>Environment management</li>\n        <li>Cluster mode</li>\n        <li>Monitoring</li>\n      </ul>\n      <h4>Example architecture:</h4>\n      <p>PM2<br> ├── Node Worker 1<br> ├── Node Worker 2<br> └── Node Worker 3</p>\n      <p>Cloud/Kubernetes environment-এ PM2 ব্যবহার করা হবে কি না deployment architecture-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "node-89",
    "category": "Scalability",
    "difficulty": "Very Important",
    "tags": [
      "Load Balancer",
      "Scaling"
    ],
    "question": "Node.js horizontal scaling কী?",
    "answer": "\n      <p>একটি Node.js process বড় করার বদলে multiple instances চালানোকে horizontal scaling বলে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Load Balancer\n                  ↓\n       ┌──────────┼──────────┐\n       ↓          ↓          ↓\n    Node 1     Node 2     Node 3</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>More traffic handling</li>\n        <li>Fault tolerance</li>\n        <li>Independent scaling</li>\n      </ul>\n      <p>Stateless API হলে horizontal scaling সহজ।</p>\n      <p>Session local memory-তে রাখলে distributed deployment-এ সমস্যা হতে পারে।</p>\n    "
  },
  {
    "id": "node-90",
    "category": "Authentication",
    "difficulty": "Very Important",
    "tags": [
      "Session",
      "Redis"
    ],
    "question": "Node.js distributed application-এ session কীভাবে manage করবেন?",
    "answer": "\n      <h4>Local memory session:</h4>\n      <p>Node 1 → Session A<br>Node 2 → Session নেই</p>\n      <p>Load balancer request অন্য server-এ পাঠালে সমস্যা হতে পারে।</p>\n      <h4>Better:</h4>\n      <p>Node 1 ─┐<br>Node 2 ─┼── Redis Session Store<br>Node 3 ─┘</p>\n      <p>তখন সব instance একই session store access করতে পারে।</p>\n      <h4>Alternative:</h4>\n      <p>Stateless JWT authentication।</p>\n      <p>কোনটি ব্যবহার করবেন তা security, revocation, session behavior এবং architecture-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "node-91",
    "category": "Architecture",
    "difficulty": "Very Important",
    "tags": [
      "API Gateway",
      "BFF"
    ],
    "question": "API Gateway এবং BFF কী?",
    "answer": "\n      <p>API Gateway হলো clients এবং backend services-এর সামনে থাকা entry point।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nServices</code></pre>\n      </div>\n      <h4>Responsibilities:</h4>\n      <ul>\n        <li>Authentication</li>\n        <li>Rate limiting</li>\n        <li>Routing</li>\n        <li>TLS termination</li>\n        <li>Logging</li>\n        <li>Request aggregation</li>\n      </ul>\n      <p>BFF = Backend For Frontend।</p>\n      <p>Different frontend-এর জন্য specialized backend layer।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Web BFF\nMobile BFF\nAdmin BFF</code></pre>\n      </div>\n      <p>সব frontend-এর requirement এক না হলে BFF useful হতে পারে।</p>\n    "
  },
  {
    "id": "node-92",
    "category": "Observability",
    "difficulty": "Senior",
    "tags": [
      "Tracing",
      "OpenTelemetry"
    ],
    "question": "Distributed Tracing কী?",
    "answer": "\n      <p>একটি request multiple services-এর মধ্য দিয়ে গেলে পুরো journey trace করার technique।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nAPI Gateway\n ↓\nOrder Service\n ↓\nPayment Service\n ↓\nInventory Service</code></pre>\n      </div>\n      <h4>একটি trace ID:</h4>\n      <p>trace-123</p>\n      <p>প্রতিটি service span তৈরি করতে পারে।</p>\n      <h4>Trace:</h4>\n      <p><strong>Gateway:</strong> 20ms<br><strong>Order:</strong> 50ms<br><strong>Payment:</strong> 500ms<br><strong>Inventory:</strong> 30ms</p>\n      <p>এখানে বোঝা যায় Payment Service bottleneck।</p>\n    "
  },
  {
    "id": "node-93",
    "category": "Resilience",
    "difficulty": "Senior",
    "tags": [
      "Fallback",
      "Circuit Breaker"
    ],
    "question": "Fallback strategy কী?",
    "answer": "\n      <p>Dependency unavailable হলে alternative response দেওয়া।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Product Service\n ↓\nRecommendation Service DOWN\n ↓\nReturn product without recommendations</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Primary API\n ↓\nFailure\n ↓\nCached data</code></pre>\n      </div>\n      <p>Fallback সব business operation-এর জন্য safe নয়।</p>\n      <p>Payment-এর মতো critical operation-এ incorrect fallback dangerous হতে পারে।</p>\n    "
  },
  {
    "id": "node-94",
    "category": "System Design",
    "difficulty": "Senior",
    "tags": [
      "Scalable API",
      "Architecture"
    ],
    "question": "একটি scalable Node.js API architecture কীভাবে design করবেন?",
    "answer": "\n      <h4>Typical architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Internet\n                    ↓\n                 CDN/WAF\n                    ↓\n              Load Balancer\n                    ↓\n              API Gateway\n                    ↓\n        ┌───────────┼───────────┐\n        ↓           ↓           ↓\n     Node API    Node API    Node API\n        ↓           ↓           ↓\n        └───────────┼───────────┘\n                    ↓\n               Redis Cache\n                    ↓\n              Primary DB\n              /       \\\n        Replica 1    Replica 2</code></pre>\n      </div>\n      <h4>Async workloads:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Node API\n ↓\nKafka/RabbitMQ\n ↓\nWorkers</code></pre>\n      </div>\n      <h4>Observability:</h4>\n      <p>Logs + Metrics + Traces</p>\n      <h4>Important principles:</h4>\n      <ul>\n        <li>Stateless API</li>\n        <li>Horizontal scaling</li>\n        <li>Connection pooling</li>\n        <li>Caching</li>\n        <li>Queue for async work</li>\n        <li>Database optimization</li>\n        <li>Timeouts</li>\n        <li>Retry</li>\n        <li>Circuit breaker</li>\n        <li>Rate limiting</li>\n      </ul>\n    "
  },
  {
    "id": "node-95",
    "category": "Production Troubleshooting",
    "difficulty": "Senior",
    "tags": [
      "Production",
      "Debugging"
    ],
    "question": "Production Node.js server CPU 100% হলে কীভাবে troubleshoot করবেন?",
    "answer": "\n      <p><strong>Step 1:</strong><br>Check which process/container high CPU ব্যবহার করছে।</p>\n      <p><strong>Step 2:</strong><br>Check event loop lag।</p>\n      <p><strong>Step 3:</strong><br>CPU profile নিন।</p>\n      <p><strong>Step 4:</strong><br>Identify hot function।</p>\n      <h4>Possible causes:</h4>\n      <ul>\n        <li>Infinite loop</li>\n        <li>Large JSON serialization</li>\n        <li>Regex catastrophic backtracking</li>\n        <li>CPU-heavy calculation</li>\n        <li>Excessive logging</li>\n        <li>Encryption/compression</li>\n        <li>Memory pressure/GC</li>\n      </ul>\n      <h4>Fix:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>CPU-heavy work\n ↓\nWorker Thread / Queue / Separate Service</code></pre>\n      </div>\n      <p>Database issue হলে CPU profiling-এর আগে DB metrics-ও check করতে হবে।</p>\n    "
  },
  {
    "id": "node-96",
    "category": "Production Troubleshooting",
    "difficulty": "Senior",
    "tags": [
      "Production",
      "Memory"
    ],
    "question": "Node.js server memory continuously increase করলে কী করবেন?",
    "answer": "\n      <p><strong>Step 1:</strong><br>Check RSS/heap usage।</p>\n      <p><strong>Step 2:</strong><br>Observe GC behavior।</p>\n      <p><strong>Step 3:</strong><br>Take heap snapshots।</p>\n      <p><strong>Step 4:</strong><br>Compare snapshots।</p>\n      <p><strong>Step 5:</strong><br>Find retained objects।</p>\n      <h4>Check:</h4>\n      <ul>\n        <li>Global cache</li>\n        <li>Event listeners</li>\n        <li>Timers</li>\n        <li>Closures</li>\n        <li>Request references</li>\n        <li>Large buffers</li>\n        <li>WebSocket connections</li>\n      </ul>\n      <p>তারপর fix করে load test করুন।</p>\n      <p>শুধু process restart করা permanent solution নয়; leak-এর root cause identify করতে হবে।</p>\n    "
  },
  {
    "id": "node-97",
    "category": "Production Troubleshooting",
    "difficulty": "Senior",
    "tags": [
      "Production",
      "Latency"
    ],
    "question": "Node.js API latency হঠাৎ বেড়ে গেলে কীভাবে root cause বের করবেন?",
    "answer": "\n      <h4>Observe:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API latency\n ↓\nApplication CPU\n ↓\nEvent loop lag\n ↓\nMemory\n ↓\nDB latency\n ↓\nExternal API latency\n ↓\nNetwork\n ↓\nConnection pool\n ↓\nQueue backlog</code></pre>\n      </div>\n      <h4>Distributed tracing থাকলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nGateway\n ↓\nService\n ↓\nDB\n ↓\nExternal service</code></pre>\n      </div>\n      <p>কোন span slow তা identify করুন।</p>\n      <h4>Principle:</h4>\n      <p>Don't guess.</p>\n      <p>Measure → isolate → reproduce → fix → verify.</p>\n    "
  },
  {
    "id": "node-98",
    "category": "JavaScript Runtime",
    "difficulty": "Very Important",
    "tags": [
      "Closure",
      "Memory"
    ],
    "question": "Closure Node.js application-এ কী?",
    "answer": "\n      <p>Closure হলো function-এর সাথে তার lexical scope-এর reference ধরে রাখার behavior।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function createCounter() {\n  let count = 0;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return () =&gt; ++count;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const counter = createCounter();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>counter();\ncounter();</code></pre>\n      </div>\n      <p>Returned function count variable access করতে পারে।</p>\n      <h4>Node.js-এ closure useful:</h4>\n      <ul>\n        <li>Callbacks</li>\n        <li>Middleware</li>\n        <li>Factories</li>\n        <li>Private state</li>\n      </ul>\n      <p>কিন্তু unnecessary large objects closure-এর মাধ্যমে retain করলে memory leak হতে পারে।</p>\n    "
  },
  {
    "id": "node-99",
    "category": "JavaScript Runtime",
    "difficulty": "Very Important",
    "tags": [
      "this",
      "JavaScript"
    ],
    "question": "Node.js-এ this কীভাবে কাজ করে?",
    "answer": "\n      <p>this-এর value function কীভাবে call হচ্ছে তার উপর নির্ভর করে।</p>\n      <h4>Object method:</h4>\n      <p>obj.method()</p>\n      <ul>\n        <li>this = obj</li>\n      </ul>\n      <h4>Arrow function:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const fn = () =&gt; {}</code></pre>\n      </div>\n      <p>Arrow function নিজের this bind করে না; lexical this ব্যবহার করে।</p>\n      <p>Node.js code-এ callback এবং class method-এর ক্ষেত্রে this behavior ভুল বুঝলে bug তৈরি হতে পারে।</p>\n      <p>Modern code-এ arrow functions এবং explicit binding ব্যবহারের কারণে এই issue কমানো যায়।</p>\n    "
  },
  {
    "id": "node-100",
    "category": "Node.js Internals",
    "difficulty": "Senior",
    "tags": [
      "libuv",
      "Internals"
    ],
    "question": "libuv কী?",
    "answer": "\n      <p>libuv হলো Node.js-এর গুরুত্বপূর্ণ cross-platform library, যা asynchronous I/O এবং event loop implementation-এর core অংশ।</p>\n      <h4>It helps with:</h4>\n      <ul>\n        <li>Event loop</li>\n        <li>File system operations</li>\n        <li>Networking</li>\n        <li>Timers</li>\n        <li>Thread pool</li>\n      </ul>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Node.js APIs\n ↓\nlibuv\n ↓\nOS / Thread Pool\n ↓\nEvents\n ↓\nEvent Loop\n ↓\nJavaScript</code></pre>\n      </div>\n      <p>Node.js-এর asynchronous architecture বোঝার জন্য libuv খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-101",
    "category": "Node.js Internals",
    "difficulty": "Senior",
    "tags": [
      "Thread Pool",
      "libuv"
    ],
    "question": "libuv Thread Pool কী?",
    "answer": "\n      <p>কিছু blocking বা expensive operations Node.js main JS thread-এর বাইরে libuv thread pool ব্যবহার করতে পারে।</p>\n      <p>Common examples-এর মধ্যে filesystem এবং কিছু crypto/DNS operations থাকতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JavaScript\n ↓\nlibuv\n ↓\nThread Pool\n ├── Worker\n ├── Worker\n ├── Worker\n └── Worker</code></pre>\n      </div>\n      <p>Thread pool size এবং workload অনুযায়ী concurrency behavior পরিবর্তিত হতে পারে।</p>\n      <p>CPU-heavy arbitrary JavaScript code-এর জন্য thread pool নয়; Worker Threads বেশি appropriate।</p>\n    "
  },
  {
    "id": "node-102",
    "category": "Networking",
    "difficulty": "Senior",
    "tags": [
      "DNS",
      "Networking"
    ],
    "question": "Node.js-এ DNS lookup কীভাবে কাজ করতে পারে?",
    "answer": "\n      <p>DNS hostname থেকে IP address resolve করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>api.example.com\n ↓\nDNS\n ↓\nIP address</code></pre>\n      </div>\n      <p>Node.js-এ DNS resolution-এর বিভিন্ন API এবং behavior আছে।</p>\n      <p>কিছু DNS operation OS/libuv facilities ব্যবহার করতে পারে, আবার dns.resolve-এর মতো APIs network DNS queries করতে পারে।</p>\n      <p>High-throughput application-এ DNS behavior এবং caching understanding useful।</p>\n    "
  },
  {
    "id": "node-103",
    "category": "Networking",
    "difficulty": "Senior",
    "tags": [
      "Keep Alive",
      "HTTP"
    ],
    "question": "HTTP Keep-Alive কী এবং Node.js-এ কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>প্রতিটি HTTP request-এর জন্য নতুন TCP connection তৈরি না করে existing connection reuse করা যায়।</p>\n      <h4>Without keep-alive:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nTCP connect\n ↓\nResponse\n ↓\nClose</code></pre>\n      </div>\n      <h4>With keep-alive:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Connection\n ↓\nRequest 1\n ↓\nResponse\n ↓\nRequest 2\n ↓\nResponse</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Less TCP handshake</li>\n        <li>Lower latency</li>\n        <li>Lower CPU/network overhead</li>\n      </ul>\n      <p>High-throughput microservices-এ connection reuse গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-104",
    "category": "Security",
    "difficulty": "Very Important",
    "tags": [
      "Prototype Pollution",
      "JavaScript"
    ],
    "question": "Prototype Pollution কী?",
    "answer": "\n      <p>JavaScript object prototype maliciousভাবে modify করা গেলে prototype pollution হতে পারে।</p>\n      <h4>Risk:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Object\n ↓\nPrototype modified\n ↓\nUnexpected properties inherited\n ↓\nSecurity/logic issue</code></pre>\n      </div>\n      <h4>Preventive measures:</h4>\n      <ul>\n        <li>Validate input</li>\n        <li>Avoid unsafe deep merge</li>\n        <li>Use trusted libraries</li>\n        <li>Restrict object keys</li>\n        <li>Avoid blindly merging user-controlled objects</li>\n      </ul>\n      <p>Node.js ecosystem-এ dependency security scanning-ও গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "node-105",
    "category": "Security",
    "difficulty": "Very Important",
    "tags": [
      "ReDoS",
      "Regex"
    ],
    "question": "ReDoS কী এবং Node.js-এ কেন dangerous?",
    "answer": "\n      <p>ReDoS = Regular Expression Denial of Service।</p>\n      <p>কিছু poorly designed regex specially crafted input-এর জন্য অত্যন্ত বেশি CPU time নিতে পারে।</p>\n      <h4>Node.js-এর main event loop block হলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Malicious input\n ↓\nExpensive Regex\n ↓\nCPU high\n ↓\nEvent Loop blocked\n ↓\nAll requests slow</code></pre>\n      </div>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Safe regex</li>\n        <li>Input length limits</li>\n        <li>Regex analysis</li>\n        <li>Avoid catastrophic backtracking</li>\n        <li>Move expensive processing off main thread</li>\n      </ul>\n    "
  },
  {
    "id": "node-106",
    "category": "Senior Interview",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Node.js"
    ],
    "question": "কখন Node.js ব্যবহার করবেন না?",
    "answer": "\n      <p>Node.js excellent হলেও সব workload-এর জন্য ideal নয়।</p>\n      <h4>Avoid বা carefully consider করুন যখন application-এর primary workload:</h4>\n      <ul>\n        <li>Heavy CPU computation</li>\n        <li>Scientific computation</li>\n        <li>Large ML training</li>\n        <li>CPU-intensive image/video processing</li>\n      </ul>\n      <p>যদিও Worker Threads বা separate services দিয়ে Node.js architecture-এ এগুলো integrate করা যায়।</p>\n      <h4>Node.js-এর strongest area:</h4>\n      <p>I/O-heavy<br>Network-heavy<br>Real-time<br>API<br>Microservices<br>Streaming</p>\n    "
  },
  {
    "id": "node-107",
    "category": "Senior Interview",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Scaling"
    ],
    "question": "Node.js application scalable করার সবচেয়ে গুরুত্বপূর্ণ principles কী?",
    "answer": "\n      <h4>Core principles:</h4>\n      <ol>\n        <li>Non-blocking I/O</li>\n        <li>Stateless services</li>\n        <li>Horizontal scaling</li>\n        <li>Connection pooling</li>\n        <li>Caching</li>\n        <li>Database indexing</li>\n        <li>Queue/background jobs</li>\n        <li>Timeouts</li>\n        <li>Retry with backoff</li>\n        <li>Circuit breaker</li>\n        <li>Rate limiting</li>\n        <li>Graceful shutdown</li>\n        <li>Health checks</li>\n        <li>Structured logging</li>\n        <li>Distributed tracing</li>\n        <li>Metrics</li>\n        <li>Load testing</li>\n        <li>Efficient memory management</li>\n        <li>Worker Threads for CPU-heavy tasks</li>\n        <li>Proper database architecture</li>\n      </ol>\n      <p>Scalability শুধু Node.js-এর speed-এর বিষয় নয়।</p>\n      <h4>পুরো system:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nGateway\n ↓\nNode.js\n ↓\nCache\n ↓\nDB\n ↓\nQueue\n ↓\nWorkers</code></pre>\n      </div>\n      <p>সব layer-এর bottleneck consider করতে হয়।</p>\n    "
  },
  {
    "id": "node-108",
    "category": "Senior Interview",
    "difficulty": "Senior",
    "tags": [
      "Interview",
      "Production"
    ],
    "question": "একজন Senior Node.js Developer-এর সবচেয়ে গুরুত্বপূর্ণ interview topics কী কী?",
    "answer": "\n      <h4>Core:</h4>\n      <ul>\n        <li>Node.js runtime</li>\n        <li>V8</li>\n        <li>libuv</li>\n        <li>Event Loop</li>\n        <li>Async programming</li>\n        <li>Promise</li>\n        <li>async/await</li>\n        <li>EventEmitter</li>\n        <li>Streams</li>\n        <li>Buffer</li>\n        <li>File system</li>\n      </ul>\n      <h4>Performance:</h4>\n      <ul>\n        <li>Event loop blocking</li>\n        <li>CPU profiling</li>\n        <li>Memory leak</li>\n        <li>Garbage collection</li>\n        <li>Connection pooling</li>\n        <li>Caching</li>\n      </ul>\n      <h4>Backend:</h4>\n      <ul>\n        <li>HTTP</li>\n        <li>REST API</li>\n        <li>Authentication</li>\n        <li>JWT</li>\n        <li>Authorization</li>\n        <li>Validation</li>\n        <li>Error handling</li>\n        <li>Rate limiting</li>\n        <li>Pagination</li>\n        <li>Idempotency</li>\n      </ul>\n      <h4>Database:</h4>\n      <ul>\n        <li>Transactions</li>\n        <li>Indexes</li>\n        <li>ORM</li>\n        <li>N+1</li>\n        <li>Connection pool</li>\n        <li>Query optimization</li>\n      </ul>\n      <h4>Distributed systems:</h4>\n      <ul>\n        <li>Microservices</li>\n        <li>REST/gRPC</li>\n        <li>Kafka/RabbitMQ</li>\n        <li>Retry</li>\n        <li>Timeout</li>\n        <li>Circuit breaker</li>\n        <li>Saga</li>\n        <li>Outbox</li>\n        <li>Eventual consistency</li>\n      </ul>\n      <h4>Production:</h4>\n      <ul>\n        <li>Docker</li>\n        <li>Kubernetes</li>\n        <li>Health check</li>\n        <li>Graceful shutdown</li>\n        <li>Logging</li>\n        <li>Metrics</li>\n        <li>Distributed tracing</li>\n        <li>CI/CD</li>\n      </ul>\n      <h4>Architecture:</h4>\n      <ul>\n        <li>SOLID</li>\n        <li>Dependency Injection</li>\n        <li>Clean Architecture</li>\n        <li>Repository pattern</li>\n        <li>Layered architecture</li>\n        <li>CQRS</li>\n        <li>Event-driven architecture</li>\n      </ul>\n      <h4>Senior interview-এ definition-এর পাশাপাশি অবশ্যই explain করতে হবে:</h4>\n      <ol>\n        <li>কী?</li>\n        <li>কেন?</li>\n        <li>কীভাবে কাজ করে?</li>\n        <li>কখন ব্যবহার করবেন?</li>\n        <li>কখন ব্যবহার করবেন না?</li>\n        <li>Trade-off কী?</li>\n        <li>Production-এ কীভাবে debug করবেন?</li>\n      </ol>\n    "
  }
];
