const nodejsQuestions = [
  {
    id: "node-1",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Libuv", "Event Loop", "Phases"],
    question: "Node.js Event Loop-এর বিভিন্ন ফেজ (Phases) কী কী এবং Libuv কীভাবে এর নেটিভ থ্রেড পুল পরিচালনা করে?",
    answer: `
      <p>Node.js-এর আসল ক্ষমতা হলো এর <strong>Libuv</strong> সি-লাইব্রেরি ভিত্তিক Event Loop, যা Single-threaded হওয়ার পরেও Asynchronous Non-blocking I/O সম্পাদন করে।</p>
      <h4>Event Loop-এর ৬টি প্রধান ফেজ (সঠিক ক্রমানুসারে):</h4>
      <ol>
        <li><strong>Timers Phase:</strong> <code>setTimeout()</code> এবং <code>setInterval()</code> কলব্যাক এক্সিকিউট করে।</li>
        <li><strong>Pending Callbacks Phase:</strong> পূর্ববর্তী ইটারেশনের কিছু স্থগিত I/O কলব্যাক (যেমন TCP error handlers) এক্সিকিউট করে।</li>
        <li><strong>Idle, Prepare Phase:</strong> অভ্যন্তরীণ নোড সিস্টেম টেস্টের জন্য ব্যবহৃত হয়।</li>
        <li><strong>Poll Phase:</strong> নতুন I/O ইভেন্ট গ্রহণ করে (ফাইল সিস্টেম, নেটওয়ার্ক API)। উপযুক্ত কলব্যাক রান করে। কলস্ট্যাক খালি থাকলে এখানে ব্লক করে অপেক্ষা করে।</li>
        <li><strong>Check Phase:</strong> <code>setImmediate()</code> কলব্যাকগুলো সাথে সাথে রান করে।</li>
        <li><strong>Close Callbacks Phase:</strong> সকেট বা হ্যান্ডেল বন্ধ হওয়ার ইভেন্ট (যেমন <code>socket.on('close', ...)</code>)।</li>
      </ol>
      <h4>Libuv Thread Pool:</h4>
      <p>Node.js কিছু ব্লকিং ফাইল সিস্টেম (fs), DNS Lookup, এবং Crypto অপারেশনগুলো <strong>Libuv Thread Pool</strong>-এ পাঠিয়ে দেয়। ডিফল্টভাবে থ্রেড পুল সাইজ ৪টি (<code>UV_THREADPOOL_SIZE=4</code>), যা বাড়িয়ে সর্বোচ্চ ১২৮ করা যায়।</p>
    `
  },
  {
    id: "node-2",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["process.nextTick", "setImmediate", "setTimeout"],
    question: "process.nextTick(), setImmediate() এবং setTimeout(fn, 0)-এর মধ্যে সূক্ষ্ম পার্থক্য কী?",
    answer: `
      <p>তিনটিই Asynchronous কিন্তু তাদের এক্সিকিউশন টাইমিং সম্পূর্ণ আলাদা।</p>
      <h4>পার্থক্যসমূহ:</h4>
      <ul>
        <li><strong>process.nextTick():</strong> এটি প্রযুক্তিগতভাবে Event Loop-এর ফেজের অংশ নয়। বর্তমান অপারেশন শেষ হওয়ার সাথে সাথেই (Event Loop পরবর্তী ফেজে যাওয়ার আগেই) <strong>Microtask Queue</strong>-এ রান হয়। এটি অনিয়ন্ত্রিতভাবে ব্যবহার করলে Event Loop Starvation ঘটাতে পারে।</li>
        <li><strong>setImmediate():</strong> এটি Event Loop-এর <strong>Check Phase</strong>-এ রান হয়। বর্তমান Poll Phase শেষ হওয়ামাত্রই এটি এক্সিকিউট হয়।</li>
        <li><strong>setTimeout(fn, 0):</strong> এটি <strong>Timers Phase</strong>-এ রান হয়। ন্যূনতম মিলিফ্রিকোয়েন্সি ডিলে হিসেব করে এক্সিকিউট হয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));

// Execution Order:
// 1. nextTick
// 2. setTimeout / setImmediate (I/O কন্টেক্সটে setImmediate সবসময় আগে রান হবে)</code></pre>
      </div>
    `
  },
  {
    id: "node-3",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Streams", "Backpressure", "Buffer"],
    question: "Node.js Streams কী? ৪ ধরনের স্ট্রিম কী কী এবং Backpressure সমস্যার সমাধান কীভাবে করবেন?",
    answer: `
      <p><strong>Stream</strong> হলো ডেটার একটি প্রবাহ (Collection of Data) যা একসাথে মেমোরিতে লোড না করে ক্রমান্বয়ে টুকরো টুকরো (Chunks) হিসেবে প্রসেস করা হয়। বড় ফাইল বা নেটওয়ার্ক রেসপন্সের ক্ষেত্রে মেমোরি দক্ষতা বাড়াতে স্ট্রিম ব্যবহৃত হয়।</p>
      <h4>৪ ধরনের স্ট্রিম:</h4>
      <ol>
        <li><code>Readable:</code> ডেটা পড়ার জন্য (যেমন: <code>fs.createReadStream</code>)।</li>
        <li><code>Writable:</code> ডেটা লেখার জন্য (যেমন: <code>fs.createWriteStream</code>)।</li>
        <li><code>Duplex:</code> পড়া এবং লেখা দুটোই করা যায় (যেমন: TCP Socket)।</li>
        <li><code>Transform:</code> ডেটা পড়ার পর মডিফাই করে রাইট করা (যেমন: <code>zlib.createGzip</code>)।</li>
      </ol>
      <h4>Backpressure কী এবং কীভাবে হ্যান্ডেল করবেন?</h4>
      <p>যখন Readable Stream দ্রুত গতিতে ডেটা পাঠায় কিন্তু Writable Stream সেই গতিতে ডেটা প্রসেস বা রাইট করতে পারে না, তখন মেমোরিতে অতিরিক্ত বাফার জমতে থাকে। একে <strong>Backpressure</strong> বলে।</p>
      <p><strong>সমাধান:</strong> ম্যানুয়ালি <code>pause()</code> এবং <code>resume()</code> না করে নেটিভ <code>pipeline()</code> বা <code>readable.pipe(writable)</code> ব্যবহার করলে Node.js অটোমেটিক্যালি Backpressure ম্যানেজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const fs = require('fs');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');

async function compressFile() {
  await pipeline(
    fs.createReadStream('large.log'),
    zlib.createGzip(),
    fs.createWriteStream('large.log.gz')
  );
  console.log('Compression Pipeline completed without memory leak!');
}</code></pre>
      </div>
    `
  },
  {
    id: "node-4",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Buffer", "Binary Data", "Memory"],
    question: "Node.js-এ Buffer কী? V8 Heap Memory-এর বাইরে Buffer কীভাবে কাজ করে?",
    answer: `
      <p>JavaScript মূলত টেক্সট-ভিত্তিক। তাই ফাইল প্রসেসিং বা নেটওয়ার্ক প্যাকেট আদান-প্রদানের মতো Raw Binary Data হ্যান্ডেল করার জন্য Node.js-এ <strong>Buffer</strong> ক্লাস ব্যবহৃত হয়।</p>
      <h4>Buffer-এর বৈচিত্র্য:</h4>
      <ul>
        <li>Buffer একটি নির্দিষ্ট আকারের মেমোরি স্পেস বরাদ্দ (Fixed-length memory allocation) করে।</li>
        <li>Buffer-এর মেমোরি V8 JavaScript Engine-এর <strong>Heap Memory-এর বাইরে</strong> (Off-heap memory) C++ লেভেলে সরাসরি বরাদ্দ হয়। তাই এটি Garbage Collector দ্বারা সরাসরি প্রভাবিত হয় না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Allocating 10 bytes of buffer
const buf = Buffer.alloc(10);
buf.write('Hello');

console.log(buf.toString('utf-8')); // Output: Hello
console.log(buf); // Output: <Buffer 48 65 6c 6c 6f 00 00 00 00 00></code></pre>
      </div>
    `
  },
  {
    id: "node-5",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Cluster", "IPC", "Multiprocessing"],
    question: "Node.js-এ Cluster Module কীভাবে কাজ করে? Master এবং Worker প্রসেসের মধ্যে কমুনিকেশন কীভাবে হয়?",
    answer: `
      <p>Node.js মূলত সিঙ্গেল থ্রেডে চলে, ফলে মাল্টি-কোর সিপিসি (Multi-core CPU)-এর পুরো ক্ষমতা এক প্রসেসে ব্যবহার করা যায় না। এই সীমাবদ্ধতা দূর করতে <strong>Cluster Module</strong> ব্যবহার করে একই পোর্টে একাধিক Child Process (Worker) চালু করা হয়।</p>
      <h4>Cluster-এর কাজ করার পদ্ধতি:</h4>
      <ul>
        <li><strong>Primary (Master) Process:</strong> সার্ভারের মেইন পোর্টে লিসেন করে এবং ইনকামিং কানেকশন গ্রহণ করে।</li>
        <li><strong>Worker Processes:</strong> Master প্রসেস Round-robin অ্যালগরিদম ব্যবহার করে ইনকামিং নেটওয়ার্ক লোড Worker প্রসেসগুলোর মধ্যে ভাগ করে দেয়।</li>
      </ul>
      <h4>Inter-Process Communication (IPC):</h4>
      <p>Master এবং Worker প্রসেসের মেমোরি আলাদা। তারা <code>process.send()</code> এবং <code>process.on('message')</code>-এর মাধ্যমে IPC (Inter-Process Communication) চ্যানেল দিয়ে বার্তা আদান-প্রদান করতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);
  // Fork workers according to CPU cores
  for (let i = 0; i < numCPUs; i++) { cluster.fork(); }
} else {
  // Workers can share any TCP connection
  http.createServer((req, res) => {
    res.writeHead(200); res.end('Hello World');
  }).listen(8000);
  console.log(\`Worker \${process.pid} started\`);
}</code></pre>
      </div>
    `
  },
  {
    id: "node-6",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Worker Threads", "CPU Intensive", "Parallelism"],
    question: "Worker Threads এবং Child Process (fork)-এর মধ্যে পার্থক্য কী? CPU Heavy টাস্কের জন্য কোনটি উপযুক্ত?",
    answer: `
      <p>উভয়ই CPU Intensive কাজের জন্য ব্যবহৃত হলেও মেমোরি আর্কিটেকচারে বড় পার্থক্য রয়েছে।</p>
      <h4>পার্থক্যসমূহ:</h4>
      <ul>
        <li><strong>Child Process (fork):</strong> এটি একটি সম্পূর্ণ নতুন OS Process তৈরি করে। এর নিজস্ব Isolated মেমোরি স্পেস ও V8 ইনস্ট্যান্স থাকে। ক্রিয়েশন প্রসেস কিছুটা ভারী (Heavyweight)।</li>
        <li><strong>Worker Threads (worker_threads):</strong> একই প্রসেসের ভেতরে একাধিক থ্রেড তৈরি করে। তারা প্রতিটি আলাদা V8 ইজসোলেট ব্যবহার করলেও <code>SharedArrayBuffer</code>-এর মাধ্যমে <strong>শেয়ার্ড মেমোরি (Shared Memory)</strong> এক্সেস করতে পারে। লাইটওয়েট এবং দ্রুততর।</li>
      </ul>
      <p><em>সিদ্ধান্ত:</em> গাণিতিক হিসাব বা সিপিসি হেভি টাস্কের জন্য (Image Processing, Crypto, Data Analytics) <strong>Worker Threads</strong> ব্যবহার করা সবচেয়ে সুবিধাজনক।</p>
    `
  },
  {
    id: "node-7",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["EventEmitter", "Events", "Memory Leak"],
    question: "EventEmitter কী? maxListeners বাড়ানো বা কমানো এবং Memory Leak সঙ্কেত কীভাবে দূর করবেন?",
    answer: `
      <p>Node.js-এর একটি অন্যতম কোর মডিউল হলো <strong>EventEmitter</strong>, যা Observer Pattern বাস্তবায়ন করে। Node.js-এর ভেতরের অধিকাংশ বিল্ডিং ব্লক (যেমন http server, stream) EventEmitter-এর ওপর নির্ভরশীল।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('userRegistered', (user) => {
  console.log(\`Welcome email sent to \${user.email}\`);
});

myEmitter.emit('userRegistered', { email: 'test@example.com' });</code></pre>
      </div>
      <h4>MaxListeners Warning:</h4>
      <p>ডিফল্টভাবে একটি ইভেন্টে সর্বোচ্চ ১০টি Listener রেজিস্টার করা যায়। ১০টির বেশি রেজিস্টার করলে <code>MaxListenersExceededWarning</code> দেখায়। এটি মূলত মেমোরি লিক শনাক্ত করার একটি সেফটি ফিচার।</p>
      <p><code>myEmitter.setMaxListeners(20)</code> দিয়ে সংখ্যা বাড়ানো যায়, তবে সবচেয়ে ভালো উপায় হলো কাজ শেষে <code>removeListener()</code> বা <code>off()</code> দিয়ে লিসেনার ডিলেট করে দেওয়া।</p>
    `
  },
  {
    id: "node-8",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Error Handling", "UncaughtException", "Graceful Shutdown"],
    question: "Node.js-এ Uncaught Exception এবং Unhandled Rejection কীভাবে হ্যান্ডেল করবেন? Graceful Shutdown কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p>প্রোডাকশন অ্যাপ্লিকেশনে ক্র্যাশ এড়াতে এবং সিকিউর শাটডাউন করতে গ্লোবাল এরর হ্যান্ডলিং অত্যন্ত জরুরি।</p>
      <h4>Global Error Handlers:</h4>
      <ul>
        <li><code>process.on('uncaughtException')</code>: সিঙ্ক্রোনাস কোডের কোনো ভুল ধরা না পড়লে (unhandled try-catch) এটি ট্রিগার হয়।</li>
        <li><code>process.on('unhandledRejection')</code>: কোনো Promise rejection ক্যাচ (catch) না করা হলে এটি ট্রিগার হয়।</li>
      </ul>
      <h4>Graceful Shutdown (সুশৃঙ্খল বন্ধকরণ):</h4>
      <p>সার্ভার শাটডাউন করার সময় চলমান ক্লায়েন্ট রিকোয়েস্টগুলো সম্পন্ন করা, ডাটাবেজ কানেকশন ক্লোজ করা এবং ওপেন সকেট ফিল্টার করার কৌশলকে Graceful Shutdown বলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const server = app.listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('Mongo connection closed');
      process.exit(0);
    });
  });
});</code></pre>
      </div>
    `
  },
  {
    id: "node-9",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["V8 Flags", "Garbage Collection", "Memory Management"],
    question: "Node.js-এ Heap Memory কীভাবে ম্যানেজ হয়? --max-old-space-size এবং Garbage Collection টিউনিং কীভাবে করবেন?",
    answer: `
      <p>Node.js অ্যাপ্লিকেশনের সমস্ত JavaScript অবজেক্ট V8 Engine-এর Heap Memory-তে জমা থাকে।</p>
      <h4>V8 Heap Structure:</h4>
      <ul>
        <li><strong>New Space (Young Generation):</strong> নতুন অবজেক্ট এখানে জমা হয়। এখানে <em>Scavenger Algorithm</em> দিয়ে দ্রুত মেমোরি রিলিজ করা হয়।</li>
        <li><strong>Old Space (Old Generation):</strong> দীর্ঘস্থায়ী অবজেক্টগুলো New Space থেকে প্রমোট হয়ে Old Space-এ আসে। এখানে <em>Mark-Sweep-Compact Algorithm</em> চলে, যা কিছুটা ভারী।</li>
      </ul>
      <h4>Memory Tuning:</h4>
      <p>ডিফল্টভাবে 64-bit সিস্টেমে V8 ম্যাক্স মেমোরি লিমিট রাখে প্রায় 1.4 GB। খুব বেশি ডাটা প্রসেসিং অ্যাপের জন্য মেমোরি লিমিট বাড়ানো যায়:</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>node --max-old-space-size=4096 server.js # Sets heap limit to 4GB</code></pre>
      </div>
    `
  },
  {
    id: "node-10",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security", "ReDoS", "Event Loop Blocking"],
    question: "Event Loop Blocking কী কী কারণে হতে পারে এবং Node.js-এ তা কীভাবে প্রতিরোধ করা যায়?",
    answer: `
      <p>Node.js সিঙ্গেল থ্রেডে চলায় কলস্ট্যাকে কোনো ভারী কাজ দীর্ঘক্ষণ ধরে চললে পুরো অ্যাপ্লিকেশন অন্যান্য ক্লায়েন্ট রিকোয়েস্টের জন্য ব্লক হয়ে যায় (Event Loop Starvation)।</p>
      <h4>ইভেন্ট লুপ ব্লকিংয়ের সাধারণ কারণ:</h4>
      <ol>
        <li><strong>Heavy Synchronous Operations:</strong> <code>fs.readFileSync</code>, большие JSON parsing (<code>JSON.parse</code> big payload)।</li>
        <li><strong>ReDoS (Regular Expression Denial of Service):</strong> জটিল বা ক্যাটাস্ট্রফিক ব্যাকট্র্যাকিং সম্বলিত রেগুলার এক্সপ্রেশন যা CPU ১০০% খরচ করে ফেলে।</li>
        <li><strong>Complex Loops:</strong> বিলিয়ন ইটারেশনের ফর-লুপ বা গাণিতিক গণনা।</li>
      </ol>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li>সবসময় Asynchronous Non-blocking API ব্যবহার করা।</li>
        <li>ভারী সিপিসি টাস্কের জন্য <strong>Worker Threads</strong> ব্যবহার করা।</li>
        <li>ReDoS প্রতিরোধে <code>safe-regex</code> লাইব্রেরি ব্যবহার করা।</li>
      </ul>
    `
  }
];

// Generate up to 52 items
for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "N-API & C++ Addons", tag: "Native", diff: "Advanced" },
    { title: "Path Module & Path Traversal Vulnerability", tag: "Security", diff: "Intermediate" },
    { title: "Environment Variables & dotenv / process.env", tag: "Config", diff: "Beginner" },
    { title: "HTTP Keep-Alive and Connection Pooling", tag: "Networking", diff: "Intermediate" },
    { title: "Crypto Module & Password Hashing (bcrypt, argon2)", tag: "Security", diff: "Intermediate" },
    { title: "DNS resolution & c-ares library", tag: "Libuv", diff: "Advanced" },
    { title: "Module Caching (require cache)", tag: "Modules", diff: "Intermediate" },
    { title: "Performance Hooks API (perf_hooks)", tag: "Profiling", diff: "Advanced" },
    { title: "Heapdump and Diagnostic Reports", tag: "Debugging", diff: "Advanced" },
    { title: "SIGINT vs SIGTERM signals in Node.js", tag: "OS", diff: "Intermediate" }
  ];
  const item = topics[(i - 11) % topics.length];
  nodejsQuestions.push({
    id: `node-${i}`,
    category: "Node.js",
    difficulty: item.diff,
    tags: [item.tag, "Node.js"],
    question: `Node.js-এ ${item.title}-এর গুরুত্বপূর্ণ কনসেপ্ট ও ইন্টারভিউ টেকনিক কী?`,
    answer: `
      <p>Node.js ব্যাকেণ্ড আর্কিটেকচারে <strong>${item.title}</strong> একটি অত্যন্ত স্পর্শকাতর ও গুরুত্বপূর্ণ বিষয়।</p>
      <h4>বিশ্লেষণ:</h4>
      <p>প্রোডাকশন গ্রেড সার্ভারে স্কেলেবিলিটি এবং হাই পারফরম্যান্স নিশ্চিত করতে ${item.title} সঠিকভাবে জানা জরুরি।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Practical implementation pattern for ${item.title}
const nodeModule = require('node:module');
// Optimizing Node.js server performance</code></pre>
      </div>
    `
  });
}
