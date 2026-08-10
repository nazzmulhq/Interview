const nodejsQuestions = [
  {
    id: "node-1",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Libuv","Event Loop","Phases"],
    question: "Node.js Event Loop-এর বিভিন্ন ফেজ (Phases) কী কী এবং Libuv কীভাবে এর নেটিভ থ্রেড পুল পরিচালনা করে?",
    answer: `
      <p>Node.js-এর আসল ক্ষমতা হলো এর <strong>Libuv</strong> সি-লাইব্রেরি ভিত্তিক Event Loop, যা Single-threaded হওয়ার পরেও Asynchronous Non-blocking I/O সম্পাদন করে।</p>
      <h4>Event Loop-এর ৬টি প্রধান ফেজ (সঠিক ক্রমানুসারে):</h4>
      <ol>
        <li><strong>Timers Phase:</strong> <code>setTimeout()</code> এবং <code>setInterval()</code> কলব্যাক এক্সিকিউট করে।</li>
        <li><strong>Pending Callbacks Phase:</strong> পূর্ববর্তী ইটারেশনের কিছু স্থগিত I/O কলব্যাক (যেমন TCP error handlers) এক্সিকিউট করে।</li>
        <li><strong>Idle, Prepare Phase:</strong> অভ্যন্তরীণ নোড সিস্টেমের জন্য ব্যবহৃত হয়।</li>
        <li><strong>Poll Phase:</strong> নতুন I/O ইভেন্ট গ্রহণ করে (ফাইল সিস্টেম, নেটওয়ার্ক API)। উপযুক্ত কলব্যাক রান করে। কলস্ট্যাক খালি থাকলে এখানে ব্লক করে অপেক্ষা করে।</li>
        <li><strong>Check Phase:</strong> <code>setImmediate()</code> কলব্যাকগুলো সাথে সাথে রান করে।</li>
        <li><strong>Close Callbacks Phase:</strong> সকেট বা হ্যান্ডেল বন্ধ হওয়ার ইভেন্ট (যেমন <code>socket.on('close', ...)</code>)।</li>
      </ol>
      <h4>Libuv Thread Pool:</h4>
      <p>Node.js কিছু ব্লকিং ফাইল সিস্টেম (fs), DNS Lookup, এবং Crypto অপারেশনগুলো <strong>Libuv Thread Pool</strong>-এ পাঠিয়ে দেয়। ডিফল্টভাবে থ্রেড পুল সাইজ ৪টি (<code>UV_THREADPOOL_SIZE=4</code>), যা পরিবেশ ভেরিয়েবল পরিবর্তন করে সর্বোচ্চ ১২৮ করা যায়।</p>
    `
  },
  {
    id: "node-2",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["process.nextTick","setImmediate","setTimeout"],
    question: "process.nextTick(), setImmediate() এবং setTimeout(fn, 0)-এর মধ্যে সূক্ষ্ম পার্থক্য কী?",
    answer: `
      <p>তিনটিই Asynchronous কিন্তু তাদের এক্সিকিউশন টাইমিং সম্পূর্ণ আলাদা।</p>
      <h4>পার্থক্যসমূহ:</h4>
      <ul>
        <li><strong>process.nextTick():</strong> এটি প্রযুক্তিগতভাবে Event Loop-এর ফেজের অংশ নয়। বর্তমান অপারেশন শেষ হওয়ার সাথে সাথেই (Event Loop পরবর্তী ফেজে যাওয়ার আগেই) <strong>Microtask Queue</strong>-এ রান হয়। এটি অনিয়ন্ত্রিতভাবে ব্যবহার করলে Event Loop Starvation ঘটাতে পারে।</li>
        <li><strong>setImmediate():</strong> এটি Event Loop-এর <strong>Check Phase</strong>-এ রান হয়। বর্তমান Poll Phase শেষ হওয়ামাত্রই এটি এক্সিকিউট হয়।</li>
        <li><strong>setTimeout(fn, 0):</strong> এটি <strong>Timers Phase</strong>-এ রান হয়। ন্যূনতম মিলিসেকেন্ড ডিলে হিসেব করে এক্সিকিউট হয়।</li>
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
    tags: ["Streams","Backpressure","Buffer"],
    question: "Node.js Streams কী? ৪ ধরনের স্ট্রিম কী কী এবং Backpressure সমস্যার সমাধান কীভাবে করবেন?",
    answer: `
      <p><strong>Stream</strong> হলো ডেটার একটি প্রবাহ যা একসাথে মেমোরিতে লোড না করে ক্রমান্বয়ে টুকরো টুকরো (Chunks) হিসেবে প্রসেস করা হয়। বড় ফাইল বা নেটওয়ার্ক রেসপন্সের ক্ষেত্রে মেমোরি দক্ষতা বাড়াতে স্ট্রিম ব্যবহৃত হয়।</p>
      <h4>৪ ধরনের স্ট্রিম:</h4>
      <ol>
        <li><code>Readable:</code> ডেটা পড়ার জন্য (যেমন: <code>fs.createReadStream</code>)।</li>
        <li><code>Writable:</code> ডেটা লেখার জন্য (যেমন: <code>fs.createWriteStream</code>)।</li>
        <li><code>Duplex:</code> পড়া এবং লেখা দুটোই করা যায় (যেমন: TCP Socket)।</li>
        <li><code>Transform:</code> ডেটা পড়ার পর মডিফাই করে রাইট করা (যেমন: <code>zlib.createGzip</code>)।</li>
      </ol>
      <h4>Backpressure এবং এর সমাধান:</h4>
      <p>যখন Readable Stream দ্রুত গতিতে ডেটা পাঠায় কিন্তু Writable Stream সেই গতিতে ডেটা প্রসেস করতে পারে না, তখন মেমোরিতে অতিরিক্ত বাফার জমতে থাকে। একে <strong>Backpressure</strong> বলে। ম্যানুয়ালি <code>pause()</code> এবং <code>resume()</code> না করে নেটিভ <code>pipeline()</code> ব্যবহার করলে Node.js অটোমেটিক্যালি এটি ম্যানেজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

async function compressFile() {
  await pipeline(
    fs.createReadStream('large.log'),
    zlib.createGzip(),
    fs.createWriteStream('large.log.gz')
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "node-4",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Buffer","Binary Data","Memory"],
    question: "Node.js-এ Buffer কী? V8 Heap Memory-এর বাইরে Buffer কীভাবে কাজ করে?",
    answer: `
      <p>JavaScript মূলত টেক্সট-ভিত্তিক। তাই Raw Binary Data হ্যান্ডেল করার জন্য Node.js-এ <strong>Buffer</strong> ক্লাস ব্যবহৃত হয়।</p>
      <h4>Buffer-এর বৈশিষ্ট্য:</h4>
      <ul>
        <li>Buffer একটি নির্দিষ্ট আকারের মেমোরি স্পেস বরাদ্দ (Fixed-length memory allocation) করে।</li>
        <li>এর মেমোরি V8 Engine-এর <strong>Heap Memory-এর বাইরে</strong> (Off-heap memory) C++ লেভেলে সরাসরি বরাদ্দ হয়, তাই এটি Garbage Collector-এর সরাসরি নিয়ন্ত্রণে থাকে না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const buf = Buffer.alloc(10);
buf.write('Hello');
console.log(buf.toString('utf-8')); // Output: Hello</code></pre>
      </div>
    `
  },
  {
    id: "node-5",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Cluster","IPC","Multiprocessing"],
    question: "Node.js-এ Cluster Module কীভাবে কাজ করে? Master এবং Worker প্রসেসের মধ্যে কমুনিকেশন কীভাবে হয়?",
    answer: `
      <p>Node.js সিঙ্গেল থ্রেডে চলে, ফলে মাল্টি-কোর CPU-এর পুরো ক্ষমতা ব্যবহার করা যায় না। এই সীমাবদ্ধতা দূর করতে <strong>Cluster Module</strong> ব্যবহার করে একই পোর্টে একাধিক Child Process (Worker) চালু করা হয়।</p>
      <h4>কাজের পদ্ধতি:</h4>
      <ul>
        <li><strong>Primary (Master) Process:</strong> সার্ভারের মেইন পোর্টে লিসেন করে এবং ইনকামিং কানেকশন গ্রহণ করে।</li>
        <li><strong>Worker Processes:</strong> Master প্রসেস Round-robin অ্যালগরিদম ব্যবহার করে লোড Worker-দের মধ্যে ভাগ করে দেয়।</li>
      </ul>
      <h4>Inter-Process Communication (IPC):</h4>
      <p>Master এবং Worker প্রসেসের মেমোরি আলাদা। তারা <code>process.send()</code> এবং <code>process.on('message')</code>-এর মাধ্যমে IPC চ্যানেল দিয়ে বার্তা আদান-প্রদান করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) cluster.fork();
} else {
  http.createServer((req, res) => res.end('Hello')).listen(8000);
}</code></pre>
      </div>
    `
  },
  {
    id: "node-6",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Worker Threads","CPU Intensive","Parallelism"],
    question: "Worker Threads এবং Child Process (fork)-এর মধ্যে পার্থক্য কী? CPU Heavy টাস্কের জন্য কোনটি উপযুক্ত?",
    answer: `
      <p>উভয়ই CPU Intensive কাজের জন্য ব্যবহৃত হলেও মেমোরি আর্কিটেকচারে বড় পার্থক্য রয়েছে।</p>
      <ul>
        <li><strong>Child Process (fork):</strong> সম্পূর্ণ নতুন OS Process তৈরি করে। নিজস্ব Isolated মেমোরি ও V8 ইনস্ট্যান্স থাকে। ক্রিয়েশন ভারী (Heavyweight)।</li>
        <li><strong>Worker Threads:</strong> একই প্রসেসের ভেতরে থ্রেড তৈরি করে। <code>SharedArrayBuffer</code>-এর মাধ্যমে <strong>শেয়ার্ড মেমোরি</strong> এক্সেস করতে পারে। লাইটওয়েট ও দ্রুততর।</li>
      </ul>
      <p><em>সিদ্ধান্ত:</em> ইমেজ প্রসেসিং, ক্রিপ্টো বা ডেটা অ্যানালিটিক্সের মতো CPU Heavy টাস্কের জন্য <strong>Worker Threads</strong> সবচেয়ে উপযুক্ত।</p>
    `
  },
  {
    id: "node-7",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["EventEmitter","Events","Memory Leak"],
    question: "EventEmitter কী? maxListeners বাড়ানো বা কমানো এবং Memory Leak সঙ্কেত কীভাবে দূর করবেন?",
    answer: `
      <p>Node.js-এর একটি কোর মডিউল <strong>EventEmitter</strong>, যা Observer Pattern বাস্তবায়ন করে। Node.js-এর ভেতরের অধিকাংশ মডিউল (http server, stream) এর ওপর নির্ভরশীল।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('userRegistered', (user) => console.log('Email sent'));
myEmitter.emit('userRegistered', { email: 'test@example.com' });</code></pre>
      </div>
      <h4>MaxListeners Warning:</h4>
      <p>ডিফল্টভাবে একটি ইভেন্টে সর্বোচ্চ ১০টি Listener রেজিস্টার করা যায়। এর বেশি হলে <code>MaxListenersExceededWarning</code> দেখায়, যা মেমোরি লিক শনাক্ত করে। <code>myEmitter.setMaxListeners(20)</code> দিয়ে সংখ্যা বাড়ানো যায়, তবে কাজ শেষে <code>removeListener()</code> করে ডিলিট করাই সবচেয়ে ভালো প্র্যাকটিস।</p>
    `
  },
  {
    id: "node-8",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Error Handling","UncaughtException","Graceful Shutdown"],
    question: "Node.js-এ Uncaught Exception এবং Unhandled Rejection কীভাবে হ্যান্ডেল করবেন? Graceful Shutdown কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p>প্রোডাকশন অ্যাপ্লিকেশনে ক্র্যাশ এড়াতে গ্লোবাল এরর হ্যান্ডলিং অত্যন্ত জরুরি।</p>
      <ul>
        <li><code>process.on('uncaughtException')</code>: সিঙ্ক্রোনাস কোডের আনহ্যান্ডেলড ভুল ধরে।</li>
        <li><code>process.on('unhandledRejection')</code>: আনহ্যান্ডেলড Promise Rejection ধরে।</li>
      </ul>
      <p>সার্ভার শাটডাউনের সময় চলমান রিকোয়েস্ট সম্পন্ন করা ও ডাটাবেজ কানেকশন ক্লোজ করাকে <strong>Graceful Shutdown</strong> বলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server');
  server.close(() => {
    mongoose.connection.close(false, () => process.exit(0));
  });
});</code></pre>
      </div>
    `
  },
  {
    id: "node-9",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["V8 Flags","Garbage Collection","Memory Management"],
    question: "Node.js-এ Heap Memory কীভাবে ম্যানেজ হয়? --max-old-space-size এবং Garbage Collection টিউনিং কীভাবে করবেন?",
    answer: `
      <p>Node.js-এর সমস্ত JS অবজেক্ট V8 Engine-এর Heap Memory-তে জমা থাকে।</p>
      <h4>V8 Heap Structure:</h4>
      <ul>
        <li><strong>New Space (Young Generation):</strong> নতুন অবজেক্ট এখানে থাকে। <em>Scavenger Algorithm</em> দ্রুত মেমোরি রিলিজ করে।</li>
        <li><strong>Old Space (Old Generation):</strong> দীর্ঘস্থায়ী অবজেক্ট এখানে আসে। <em>Mark-Sweep-Compact Algorithm</em> চলে, যা ভারী।</li>
      </ul>
      <h4>Memory Tuning:</h4>
      <p>ডিফল্ট V8 ম্যাক্স মেমোরি লিমিট 1.4 GB। বড় অ্যাপের জন্য এটি বাড়ানো যায়:</p>
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
    tags: ["Security","ReDoS","Event Loop Blocking"],
    question: "Event Loop Blocking কী কী কারণে হতে পারে এবং Node.js-এ তা কীভাবে প্রতিরোধ করা যায়?",
    answer: `
      <p>Node.js সিঙ্গেল থ্রেডে চলায় কলস্ট্যাকে কোনো ভারী কাজ দীর্ঘক্ষণ চললে পুরো অ্যাপ্লিকেশন ব্লক হয়ে যায়।</p>
      <h4>সাধারণ কারণসমূহ:</h4>
      <ol>
        <li><strong>Heavy Synchronous Operations:</strong> <code>fs.readFileSync</code>, বড় JSON পার্সিং।</li>
        <li><strong>ReDoS:</strong> ক্যাটাস্ট্রফিক ব্যাকট্র্যাকিং সম্বলিত রেগুলার এক্সপ্রেশন যা CPU ১০০% খরচ করে।</li>
        <li><strong>Complex Loops:</strong> বিলিয়ন ইটারেশনের ফর-লুপ।</li>
      </ol>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li>সবসময় Asynchronous Non-blocking API ব্যবহার করা।</li>
        <li>ভারী CPU টাস্কের জন্য <strong>Worker Threads</strong> ব্যবহার করা।</li>
        <li>ReDoS প্রতিরোধে <code>safe-regex</code> লাইব্রেরি ব্যবহার করা।</li>
      </ul>
    `
  },
  {
    id: "node-11",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Native","C++ Addons","N-API"],
    question: "Node.js-এ Node-API (N-API) এবং C++ Addons কী?",
    answer: `
      <p>N-API (Node-API) হলো একটি ABI (Application Binary Interface) স্টেবল API, যা C/C++ দিয়ে তৈরি নেটিভ মডিউলগুলোকে Node.js-এর সাথে যুক্ত করে। সাধারণ C++ Addons Node.js ভার্সন আপগ্রেড হলে ব্রেক হয়ে যেতে পারে, কিন্তু N-API সেই সমস্যা সমাধান করে।</p>
      <h4>ব্যবহার:</h4>
      <p>অত্যন্ত ভারী গাণিতিক হিসাব, ইমেজ প্রসেসিং (যেমন- Sharp), বা সিস্টেম-লেভেল মেমোরি অ্যাক্সেসের জন্য এটি ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// node-addon-api প্যাকেজ ব্যবহার করে N-API মডিউল ইম্পোর্ট
const nativeAddon = require('./build/Release/nativeaddon.node');
console.log(nativeAddon.doHeavyCalculation());</code></pre>
      </div>
    `
  },
  {
    id: "node-12",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security","Path Traversal","FS"],
    question: "Node.js path মডিউল ব্যবহারে Path Traversal সিকিউরিটি ঝুঁকি কী?",
    answer: `
      <p>Path Traversal হলো এমন একটি হ্যাকিং কৌশল যেখানে অ্যাটাকার <code>../</code> (ডিরেক্টরি ব্যাক) ব্যবহার করে সার্ভারের বেস ডিরেক্টরির বাইরের ফাইল অ্যাক্সেস করার চেষ্টা করে। ইউজার ইনপুট সরাসরি ফাইল রিড ফাংশনে দিলে এই ঝুঁকি থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const path = require('path');
const fs = require('fs');

const unsafePath = '../../etc/passwd';
const baseDir = '/var/www/public';

// Safe way: resolve করে baseDir এর সাথে মেলানো
const safePath = path.normalize(path.join(baseDir, unsafePath));
if (!safePath.startsWith(baseDir)) {
  throw new Error('Path Traversal Detected!');
}</code></pre>
      </div>
    `
  },
  {
    id: "node-13",
    category: "Node.js",
    difficulty: "Beginner",
    tags: ["Config","Env","Node20"],
    question: "Node.js 20.6+ এর নেটিভ --env-file ফ্ল্যাগ কীভাবে কাজ করে?",
    answer: `
      <p>Node.js 20.6+ এ <code>--env-file</code> ফ্ল্যাগ যুক্ত হওয়ার আগে, <code>.env</code> ফাইল থেকে environment variable লোড করতে প্রায় প্রতিটি প্রজেক্টে <code>dotenv</code> নামের একটি তৃতীয়-পক্ষ প্যাকেজ ইনস্টল করতে হতো। এখন এটি Node.js-এ <strong>নেটিভ</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># .env ফাইল
DATABASE_URL=postgres://localhost/mydb
API_KEY=secret123

# ⚠️ কোনো dependency ইনস্টল ছাড়াই
node --env-file=.env server.js

# একাধিক ফাইল লোড করা (Node.js 21.7+)
node --env-file=.env --env-file=.env.local server.js
# পরের ফাইলের মান আগেরটির উপর ওভাররাইড করে

# কোডে যাচাই
console.log(process.env.DATABASE_URL);</code></pre>
      </div>
      <h4>কেন এটি গুরুত্বপূর্ণ</h4>
      <ul>
        <li><strong>একটি কম dependency:</strong> <code>dotenv</code> npm প্যাকেজ বাদ দেওয়া যায় — সরবরাহ শৃঙ্খল (supply chain) ঝুঁকি কমে, <code>node_modules</code> ছোট হয়।</li>
        <li><strong>ভাষার স্তরে সমর্থন:</strong> কোনো <code>require('dotenv').config()</code> বয়লারপ্লেট লাগে না — কমান্ড লাইন থেকেই কাজ হয়ে যায়।</li>
        <li><strong>Docker/CI-তে সহজ:</strong> এন্ট্রিপয়েন্ট স্ক্রিপ্টে একটি ফ্ল্যাগ যোগ করলেই যথেষ্ট।</li>
      </ul>
      <h4>এখনও experimental — সতর্কতার সাথে ব্যবহার করুন</h4>
      <p>Node.js 20-22 এ এই ফিচারটি <strong>experimental</strong> চিহ্নিত (একটি সতর্কবার্তা দেখায়)। এর মানে API ভবিষ্যতে সামান্য বদলাতে পারে। প্রোডাকশনে ব্যবহারের আগে আপনার Node.js সংস্করণে স্থিতিশীলতার অবস্থা যাচাই করুন।</p>
      <h4>dotenv-এর তুলনায় সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Variable interpolation নেই:</strong> <code>dotenv</code>-এ একটি ভ্যারিয়েবলের ভেতরে আরেকটি ভ্যারিয়েবল রেফারেন্স করা যায় (dotenv-expand সহ, যেমন <code>BASE_URL</code> ব্যবহার করে <code>API_URL</code> বানানো); নেটিভ <code>--env-file</code>-এ এই সুবিধা নেই।</li>
        <li><strong>কম নমনীয় পার্সিং:</strong> কমেন্ট, multiline value-এর সমর্থন dotenv-এর মতো সমৃদ্ধ নয়।</li>
        <li><strong>প্রোগ্রাম্যাটিক নিয়ন্ত্রণ কম:</strong> <code>dotenv</code>-এ কোড থেকে কখন, কোন ফাইল লোড হবে তা নিয়ন্ত্রণ করা যায় (পরিবেশ অনুযায়ী শর্তসাপেক্ষে); নেটিভ ফ্ল্যাগ স্টার্টআপেই নির্ধারিত।</li>
      </ul>
      <h4>ব্যবহারিক সিদ্ধান্ত</h4>
      <p>সাধারণ প্রজেক্টে (একটি <code>.env</code> ফাইল, সরল key-value) নেটিভ <code>--env-file</code> ব্যবহার করে একটি dependency বাদ দেওয়া যুক্তিসঙ্গত। জটিল প্রয়োজনে (একাধিক পরিবেশ-নির্ভর ফাইল, variable interpolation, রানটাইমে শর্তসাপেক্ষ লোডিং) <code>dotenv</code> এখনও বেশি নমনীয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Environment variable-এ সিক্রেট রাখা কতটা নিরাপদ?</li>
        <li>Production-এ .env ফাইলের বদলে কী ব্যবহার করা উচিত (secret manager)?</li>
      </ul>
    `
  },
  {
    id: "node-14",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Networking","Keep-Alive","Sockets"],
    question: "Node.js HTTP Keep-Alive এবং socket reuse সুবিধা কী?",
    answer: `
      <p>HTTP Keep-Alive একই TCP কানেকশনে <strong>একাধিক request-response</strong> চালাতে দেয় — প্রতিটি রিকোয়েস্টে নতুন কানেকশন খোলার খরচ এড়িয়ে।</p>
      <h4>কানেকশন ছাড়া প্রতিটি রিকোয়েস্টের খরচ</h4>
      <p>Keep-Alive ছাড়া প্রতিটি HTTP রিকোয়েস্টে লাগে: TCP three-way handshake (১ RTT), এবং HTTPS হলে TLS handshake (আরও ১-২ RTT)। একই সার্ভারে ১০০টি রিকোয়েস্ট পাঠালে এই খরচ ১০০ বার দিতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// সার্ভার-সাইড — Node.js-এর HTTP সার্ভার ডিফল্টে keep-alive সমর্থন করে
const server = http.createServer(handler);
server.keepAliveTimeout = 65000;    // ⚠️ লোড ব্যালেন্সারের timeout-এর চেয়ে বড় রাখুন
server.headersTimeout = 66000;      // keepAliveTimeout-এর চেয়ে বড় হতেই হবে

// ক্লায়েন্ট-সাইড — Node.js-এর ডিফল্ট http.Agent-এ keep-alive বন্ধ থাকে!
const https = require('https');
const agent = new https.Agent({ keepAlive: true, maxSockets: 50 });
https.get('https://api.example.com/data', { agent }, callback);</code></pre>
      </div>
      <h4>একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ সমস্যা: timeout সামঞ্জস্য</h4>
      <p>Node.js-এর ডিফল্ট <code>keepAliveTimeout</code> ৫ সেকেন্ড। এটি যদি সামনের লোড ব্যালেন্সার (Nginx/ALB)-এর timeout-এর চেয়ে <strong>কম</strong> হয়, তবে একটি race condition তৈরি হয়: লোড ব্যালেন্সার একটি "idle" কানেকশন পুনর্ব্যবহার করতে চাইল, ঠিক সেই মুহূর্তে Node.js সেটি বন্ধ করে দিল — ফলাফল মাঝে মাঝে <strong>502 Bad Gateway</strong>।</p>
      <p><strong>নিয়ম:</strong> ব্যাকএন্ডের <code>keepAliveTimeout</code> সবসময় সামনের প্রক্সির timeout-এর চেয়ে <em>বড়</em> রাখুন — তাহলে প্রক্সিই আগে কানেকশন বন্ধ করবে, Node.js নয়।</p>
      <h4>Client-side keep-alive — প্রায়ই ভুলে যাওয়া হয়</h4>
      <p>Node.js-এর <strong>ডিফল্ট HTTP agent-এ keep-alive বন্ধ</strong> — প্রতিটি বাইরের API কলে (payment gateway, third-party API) নতুন TCP+TLS handshake হয়। আপনার সার্ভিস যখন নিজেই অন্য সার্ভিস কল করে (মাইক্রোসার্ভিসে অত্যন্ত সাধারণ), তখন <code>keepAlive: true</code> সহ একটি কাস্টম agent ব্যবহার করলে latency নাটকীয়ভাবে কমে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>মাঝে মাঝে 502 আসছে — কীভাবে ডিবাগ করবেন?</li>
        <li>HTTP/2-এ keep-alive-এর ধারণা কীভাবে বদলায়?</li>
      </ul>
    `
  },
  {
    id: "node-15",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security","Crypto","Hashing"],
    question: "Node.js crypto module দিয়ে পাসওয়ার্ড হ্যশিং এবং এনক্রিপশন কীভাবে করবেন?",
    answer: `
      <p>পাসওয়ার্ড হ্যাশিংয়ের জন্য <code>crypto.scrypt</code> বা <code>bcrypt</code> ব্যবহার করা নিরাপদ। আর সিমেট্রিক এনক্রিপশনের জন্য <code>aes-256-gcm</code> অ্যালগরিদম ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const crypto = require('crypto');

// Password Hashing
const salt = crypto.randomBytes(16).toString('hex');
const hashedPassword = crypto.scryptSync('myPassword', salt, 64).toString('hex');

// Encryption
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
let encrypted = cipher.update('secret text', 'utf8', 'hex');
encrypted += cipher.final('hex');</code></pre>
      </div>
    `
  },
  {
    id: "node-16",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["DNS","Libuv","Threads"],
    question: "dns.lookup() এবং dns.resolve()-এর মধ্যে মূল পার্থক্য কী?",
    answer: `
      <p>এই দুটি ফাংশন দেখতে একই কাজ করে মনে হলেও — একটি DNS নাম থেকে IP বের করে — এদের ভেতরের বাস্তবায়ন সম্পূর্ণ ভিন্ন, এবং এই পার্থক্য প্রোডাকশনে গুরুত্বপূর্ণ পারফরম্যান্স প্রভাব ফেলে।</p>
      <table>
        <tr><th>দিক</th><th><code>dns.lookup()</code></th><th><code>dns.resolve()</code></th></tr>
        <tr><td>ব্যবহার করে</td><td>OS-এর <code>getaddrinfo()</code></td><td>c-ares লাইব্রেরি (সরাসরি DNS)</td></tr>
        <tr><td>থ্রেড</td><td><strong>libuv thread pool</strong></td><td>Event loop-এই (অ-ব্লকিং)</td></tr>
        <tr><td>OS ক্যাশ/hosts ফাইল</td><td>✅ ব্যবহার করে</td><td>❌ করে না</td></tr>
        <tr><td>ফলাফলের ধরন</td><td>একটি IP</td><td>সব রেকর্ড (A, AAAA, MX...)</td></tr>
      </table>
      <h4>কেন এই পার্থক্যটি গুরুত্বপূর্ণ</h4>
      <p><code>dns.lookup()</code> সিস্টেমের <code>getaddrinfo()</code> সিস্টেম কল ব্যবহার করে, যা একটি <strong>ব্লকিং</strong> অপারেশন। Node.js এটিকে event loop-এ না চালিয়ে <strong>libuv thread pool</strong>-এ পাঠায় (ডিফল্ট মাত্র ৪টি থ্রেড)।</p>
      <p>একটি অ্যাপ্লিকেশন যদি সেকেন্ডে অনেকবার নতুন হোস্টনেম resolve করে (যেমন বহু বাইরের API-তে কল), এবং একই সময়ে ফাইল সিস্টেম অপারেশনও চলে (যা একই thread pool ব্যবহার করে), তাহলে DNS lookup <strong>thread pool bottleneck</strong> তৈরি করতে পারে — এমনকি CPU ও নেটওয়ার্ক দুটোই অলস থাকা সত্ত্বেও।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const dns = require('dns');

// থ্রেড পুল ব্যবহার করে — hosts ফাইল, OS ক্যাশ সম্মান করে
dns.lookup('example.com', (err, address, family) => {
  console.log(address);   // '93.184.216.34'
});

// থ্রেড পুল ব্যবহার করে না — সরাসরি DNS সার্ভারে c-ares দিয়ে
dns.resolve4('example.com', (err, addresses) => {
  console.log(addresses);   // ['93.184.216.34', ...] — সব A রেকর্ড
});

dns.resolveMx('example.com', callback);   // MX রেকর্ড
dns.resolveTxt('example.com', callback);  // TXT রেকর্ড</code></pre>
      </div>
      <h4>কখন কোনটি</h4>
      <ul>
        <li><strong><code>dns.lookup()</code>:</strong> সাধারণ ব্যবহারের জন্য — এটি সিস্টেমের <code>/etc/hosts</code> ফাইল ও লোকাল DNS ক্যাশ সম্মান করে, যা Docker/Kubernetes পরিবেশে সার্ভিস ডিসকভারির জন্য প্রায়ই গুরুত্বপূর্ণ (কনটেইনার নাম থেকে IP)।</li>
        <li><strong><code>dns.resolve*()</code>:</strong> উচ্চ থ্রুপুট DNS lookup-এ, যেখানে thread pool bottleneck এড়াতে হবে, অথবা নির্দিষ্ট রেকর্ড টাইপ (MX, TXT, SRV) দরকার। কিন্তু এটি <code>hosts</code> ফাইল দেখে না — কনটেইনার নেটওয়ার্কিংয়ে এটি সমস্যা তৈরি করতে পারে।</li>
      </ul>
      <p><strong>প্রোডাকশন সমস্যা যা এই জ্ঞান দিয়ে ডিবাগ হয়:</strong> একটি অ্যাপ্লিকেশনে হঠাৎ latency spike দেখা যাচ্ছিল যখন একই সাথে অনেক বাইরের API কল ও ফাইল আপলোড চলছিল — কারণ ছিল <code>dns.lookup()</code> এবং <code>fs</code> অপারেশন একই ছোট thread pool শেয়ার করছিল। <code>UV_THREADPOOL_SIZE</code> বাড়ানো বা DNS resolution ক্যাশ করাই সমাধান ছিল।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>DNS lookup ফলাফল কীভাবে ক্যাশ করবেন?</li>
        <li>Kubernetes-এ <code>dns.resolve()</code> ব্যবহার করলে কী সমস্যা হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "node-17",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Modules","Cache","Require"],
    question: "Node.js require.cache কীভাবে কাজ করে?",
    answer: `
      <p>Node.js যখন একটি মডিউল <code>require()</code> করে, সে প্রথমে মডিউলের কোড রান করে, তারপর ফলাফলটি <strong><code>require.cache</code></strong>-এ সংরক্ষণ করে রাখে। একই মডিউল পরে আবার <code>require()</code> করলে <em>পুনরায় চালানো হয় না</em> — সরাসরি ক্যাশ থেকে ফেরত আসে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// a.js
console.log('a.js চলছে');   // এটি শুধু একবার প্রিন্ট হবে
module.exports = { count: 0 };

// b.js
const a1 = require('./a');
a1.count = 5;

// c.js
const a2 = require('./a');
console.log(a2.count);   // 5 — একই অবজেক্ট, cache থেকে

// key = রিজলভড absolute পাথ
console.log(require.cache[require.resolve('./a')]);
// { id, exports, children, filename, loaded: true, ... }</code></pre>
      </div>
      <h4>Cache key কীভাবে কাজ করে</h4>
      <p>ক্যাশের key হলো <strong>রিজলভড absolute ফাইল পাথ</strong>, মডিউলের নাম নয়। এর মানে একই ফাইল ভিন্ন relative পাথে <code>require()</code> করলেও (<code>./utils</code> বনাম <code>../lib/utils</code>) সেগুলো <em>একই absolute পাথে</em> রিজলভ হলে একই ক্যাশ এন্ট্রি ব্যবহার হবে — একটিই instance।</p>
      <h4>Singleton প্যাটার্ন — এর সবচেয়ে গুরুত্বপূর্ণ প্রভাব</h4>
      <p>এই ক্যাশিংয়ের কারণেই Node.js-এ মডিউল-লেভেল state স্বাভাবিকভাবেই singleton আচরণ করে — একটি ডাটাবেজ কানেকশন পুল বা কনফিগ অবজেক্ট একবার তৈরি হলে গোটা অ্যাপ্লিকেশনে একই instance শেয়ার হয়, কোনো ম্যানুয়াল singleton প্যাটার্ন লেখার দরকার নেই।</p>
      <h4>Cache clear করা — টেস্টিংয়ে দরকার হয়</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একটি মডিউল জোর করে আবার লোড করানো
delete require.cache[require.resolve('./config')];
const freshConfig = require('./config');   // এবার আসলেই আবার চলবে

// ⚠️ সতর্কতা: circular dependency-তে এটি বিপজ্জনক হতে পারে —
//    অন্য মডিউল এখনও পুরনো instance রেফারেন্স করে থাকতে পারে</code></pre>
      </div>
      <p><strong>ব্যবহারিক ক্ষেত্র:</strong> টেস্টে প্রতিটি টেস্ট কেসের আগে একটি মডিউলের fresh state দরকার হলে (যেমন কনফিগারেশন পরীক্ষা করা)। প্রোডাকশন কোডে এটি প্রায় কখনও ব্যবহার করা উচিত নয় — এটি সহজেই অসঙ্গত অবস্থা তৈরি করতে পারে।</p>
      <h4>ESM-এ এই ক্যাশ নেই</h4>
      <p>ES module (<code>import</code>) সম্পূর্ণ ভিন্ন একটি মডিউল রেজিস্ট্রি ব্যবহার করে — <code>require.cache</code>-এর মতো সরাসরি ম্যানিপুলেট করা যায় না। ESM-এ singleton নিশ্চিত হয় module specifier resolution-এর মাধ্যমে, কিন্তু cache clear করার কোনো পাবলিক API নেই — এটি ESM ডিজাইনের একটি ইচ্ছাকৃত সিদ্ধান্ত (module identity স্থিতিশীল রাখতে)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Circular dependency-তে require.cache কীভাবে আচরণ করে?</li>
        <li>Hot module reloading কীভাবে এই ক্যাশ কাজে লাগায় বা এড়ায়?</li>
      </ul>
    `
  },
  {
    id: "node-18",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Performance","Perf Hooks","Metrics"],
    question: "Node.js perf_hooks API দিয়ে কোডের ল্যাটেন্সি কীভাবে মাপবেন?",
    answer: `
      <p><code>perf_hooks</code> Node.js-এর বিল্ট-ইন performance measurement API — উচ্চ-নির্ভুলতার (sub-millisecond) সময় পরিমাপ এবং ভেতরের ইভেন্ট (GC, HTTP) পর্যবেক্ষণ করতে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { performance, PerformanceObserver } = require('perf_hooks');

// মৌলিক মাপ — Date.now()-এর চেয়ে অনেক বেশি নির্ভুল
performance.mark('db-query-start');
await db.query('SELECT * FROM orders');
performance.mark('db-query-end');
performance.measure('db-query', 'db-query-start', 'db-query-end');

// সব measurement একসাথে পর্যবেক্ষণ করা
const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)}ms\`);
    if (entry.duration > 100) {
      metrics.recordSlowOperation(entry.name, entry.duration);
    }
  }
});
obs.observe({ entryTypes: ['measure'], buffered: true });

// GC ইভেন্ট পর্যবেক্ষণ — GC pause ধরার জন্য
const gcObs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`GC: \${entry.kind}, সময়: \${entry.duration}ms\`);
  }
});
gcObs.observe({ entryTypes: ['gc'] });</code></pre>
      </div>
      <h4><code>Date.now()</code>-এর চেয়ে ভালো কেন</h4>
      <ul>
        <li><strong>নির্ভুলতা:</strong> <code>performance.now()</code> সাব-মিলিসেকেন্ড (মাইক্রোসেকেন্ড) নির্ভুলতা দেয়; <code>Date.now()</code> শুধু মিলিসেকেন্ড, এবং সিস্টেম ঘড়ি বদলালে (NTP sync) মান পিছিয়েও যেতে পারে।</li>
        <li><strong>একঘেয়ে (monotonic):</strong> <code>performance.now()</code> কখনও পিছিয়ে যায় না — এটি একটি নির্দিষ্ট রেফারেন্স পয়েন্ট থেকে পার হওয়া সময় গোনে, সিস্টেম ঘড়ির উপর নির্ভর করে না। latency পরিমাপে এটি অত্যন্ত গুরুত্বপূর্ণ, নাহলে ঘড়ি সমন্বয়ে ভুল (এমনকি ঋণাত্মক) সময় দেখাতে পারে।</li>
      </ul>
      <h4>GC pause ধরা — সবচেয়ে মূল্যবান ব্যবহার</h4>
      <p>একটি অ্যাপ্লিকেশনে মাঝে মাঝে অস্পষ্ট latency spike দেখা যায়, কোনো নির্দিষ্ট কোডে দোষ পাওয়া যায় না — প্রায়ই এটি garbage collection pause। <code>entryTypes: ['gc']</code> দিয়ে ঠিক কোন মুহূর্তে GC চলেছে এবং কতক্ষণ ধরে তা দেখা যায়, যা latency spike-এর সাথে মিলিয়ে মূল কারণ শনাক্ত করা যায়।</p>
      <h4>Event loop delay মাপা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { monitorEventLoopDelay } = require('perf_hooks');
const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  console.log('event loop delay p99:', histogram.percentile(99), 'ms');
  histogram.reset();
}, 10000);
// ক্রমাগত বাড়তে থাকলে → event loop ব্লক হচ্ছে, CPU-নিবিড় কাজ সরাতে হবে</code></pre>
      </div>
      <p>এটি একটি সহজ কিন্তু অত্যন্ত কার্যকর স্বাস্থ্য মেট্রিক — event loop delay বাড়তে থাকলে বোঝা যায় সিঙ্ক্রোনাস/ব্লকিং কোড event loop-কে থামিয়ে রাখছে।</p>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <p>এই সব ম্যানুয়ালি সেটআপ করার বদলে প্রোডাকশনে OpenTelemetry বা APM টুল (Datadog, New Relic) ব্যবহার করুন — সেগুলো ভেতরে <code>perf_hooks</code>-এর মতো একই API ব্যবহার করে, কিন্তু ড্যাশবোর্ড, alert ও historical trend দিয়ে ঘিরে দেয়। <code>perf_hooks</code> সরাসরি ব্যবহার করা ভালো নির্দিষ্ট, লক্ষ্যভিত্তিক প্রোফাইলিংয়ের জন্য।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Event loop delay বেশি দেখলে কীভাবে root cause খুঁজবেন?</li>
        <li><code>performance.timerify()</code> কী কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "node-19",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Debugging","Heapdump","Diagnostics"],
    question: "Node.js Diagnostic Reports (process.report) কী?",
    answer: `
      <p><strong>Diagnostic Report</strong> একটি JSON স্ন্যাপশট — প্রসেসের অবস্থা, স্ট্যাক ট্রেস, মেমরি ব্যবহার ও সিস্টেম তথ্য একসাথে ধারণ করে। এটি production ক্র্যাশ বা অস্বাভাবিক আচরণ পরবর্তীতে বিশ্লেষণের জন্য অমূল্য — যখন সমস্যাটি ইতিমধ্যে ঘটে গেছে এবং আর reproduce করা যাচ্ছে না।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># নির্দিষ্ট শর্তে স্বয়ংক্রিয়ভাবে রিপোর্ট তৈরি
node --report-uncaught-exception \\
     --report-on-signal \\
     --report-on-fatalerror \\
     --report-directory=/var/reports \\
     app.js

# রানিং প্রসেসে ম্যানুয়ালি ট্রিগার (সিগন্যাল পাঠিয়ে)
kill -USR2 &lt;pid&gt;

# অথবা কোড থেকে
process.report.writeReport();</code></pre>
      </div>
      <h4>রিপোর্টে যা থাকে</h4>
      <ul>
        <li><strong>জাভাস্ক্রিপ্ট ও নেটিভ স্ট্যাক ট্রেস</strong> — ঠিক কোন লাইনে সমস্যা হয়েছে।</li>
        <li><strong>Heap পরিসংখ্যান</strong> — মেমরি ব্যবহার, GC-এর অবস্থা।</li>
        <li><strong>Event loop-এর অবস্থা</strong> — কী কী pending handle/request আছে (timer, সকেট, ফাইল হ্যান্ডেল)।</li>
        <li><strong>সিস্টেম তথ্য</strong> — CPU, মেমরি, লোড এভারেজ, environment variable।</li>
        <li><strong>libuv-এর resource usage।</strong></li>
      </ul>
      <h4>কেন এটি সাধারণ লগের চেয়ে বেশি কার্যকর</h4>
      <p>একটি প্রোডাকশন ক্র্যাশ (বিশেষত মেমরি লিক বা মাঝে মাঝে ঘটা crash) ডিবাগ করার সবচেয়ে বড় সমস্যা — <strong>সমস্যাটি পুনরুৎপাদন করা যায় না</strong>। সাধারণ লগে হয়তো "process crashed" ছাড়া কিছুই থাকে না।</p>
      <p>Diagnostic report ক্র্যাশের মুহূর্তেই একটি সম্পূর্ণ স্ন্যাপশট নেয় — event loop-এ কী কী আটকে ছিল, মেমরি কোথায় ব্যবহৃত হচ্ছিল, স্ট্যাক কী ছিল। এটি অনেকটা এয়ারক্রাফটের "ব্ল্যাক বক্স"-এর মতো — ঘটনার পরে পুনর্গঠনের জন্য প্রমাণ।</p>
      <h4>ব্যবহারিক ট্রিগার</h4>
      <table>
        <tr><th>ফ্ল্যাগ</th><th>কখন রিপোর্ট তৈরি হয়</th></tr>
        <tr><td><code>--report-uncaught-exception</code></td><td>ধরা না পড়া exception-এ</td></tr>
        <tr><td><code>--report-on-fatalerror</code></td><td>OOM বা অন্য fatal error-এ</td></tr>
        <tr><td><code>--report-on-signal</code></td><td>SIGUSR2 পেলে (রানিং প্রসেসেও)</td></tr>
      </table>
      <p><strong>প্রোডাকশন পরামর্শ:</strong> সব ফ্ল্যাগ ডিফল্টে চালু রাখুন — এতে রানটাইম খরচ প্রায় নগণ্য, কিন্তু কোনো অস্বাভাবিক ঘটনা ঘটলে সাথে সাথে বিস্তারিত তথ্য পাওয়া যায়। <code>report-on-signal</code> বিশেষভাবে দরকারি — একটি প্রসেস হ্যাং করলে বা মেমরি ক্রমাগত বাড়তে থাকলে, না মেরেই একটি স্ন্যাপশট নিয়ে বিশ্লেষণ করা যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Heap snapshot ও diagnostic report-এর পার্থক্য কী?</li>
        <li>উৎপাদনে মেমরি লিক সন্দেহ হলে কীভাবে তদন্ত করবেন?</li>
      </ul>
    `
  },
  {
    id: "node-20",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["OS","Signals","Process"],
    question: "Node.js-এ SIGINT এবং SIGTERM সিগন্যাল কেন হ্যান্ডেল করা উচিত?",
    answer: `
      <p><code>SIGINT</code> ও <code>SIGTERM</code> সিগন্যাল হ্যান্ডেল না করলে একটি Node.js প্রসেস <strong>হঠাৎ বন্ধ হয়ে যায়</strong> — চলমান রিকোয়েস্ট, খোলা ডাটাবেজ কানেকশন, বা অসম্পূর্ণ ফাইল লেখা সবকিছুসহ। এটি প্রোডাকশনে ডেটা হারানো ও দুর্নীতির একটি সাধারণ উৎস।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const server = app.listen(3000);

async function gracefulShutdown(signal) {
  console.log(\`\${signal} পেয়েছি, graceful shutdown শুরু...\`);

  // ১. নতুন কানেকশন নেওয়া বন্ধ করুন
  server.close(async () => {
    console.log('HTTP সার্ভার বন্ধ — নতুন রিকোয়েস্ট নিচ্ছে না');

    // ২. নির্ভরতা বন্ধ করুন (চলমান কাজ শেষ হওয়ার পর)
    await db.close();
    await redis.quit();
    await messageQueue.close();

    console.log('সব সংযোগ বন্ধ — নিরাপদে প্রস্থান');
    process.exit(0);
  });

  // ৩. জোর করে বন্ধ করার সময়সীমা — কোনো কিছু আটকে গেলে
  setTimeout(() => {
    console.error('Graceful shutdown সময়সীমা পার — জোর করে বন্ধ');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));</code></pre>
      </div>
      <h4>দুটি সিগন্যালের পার্থক্য</h4>
      <table>
        <tr><th>সিগন্যাল</th><th>কে পাঠায়</th><th>প্রসঙ্গ</th></tr>
        <tr><td><strong>SIGINT</strong></td><td>Ctrl+C (ইউজার)</td><td>ডেভেলপমেন্টে টার্মিনালে বন্ধ করা</td></tr>
        <tr><td><strong>SIGTERM</strong></td><td>Kubernetes, Docker, PM2, systemd</td><td><strong>প্রোডাকশনে সবচেয়ে গুরুত্বপূর্ণ</strong></td></tr>
      </table>
      <h4>কেন Kubernetes/Docker-এ এটি অপরিহার্য</h4>
      <p>যখন Kubernetes একটি পড বন্ধ করে (ডিপ্লয়, স্কেল-ডাউন, বা নোড drain), সে প্রথমে <code>SIGTERM</code> পাঠায় এবং <strong>একটি নির্দিষ্ট সময়</strong> (<code>terminationGracePeriodSeconds</code>, ডিফল্ট ৩০s) অপেক্ষা করে। এই সময়ে অ্যাপ্লিকেশন যদি চলমান রিকোয়েস্ট শেষ না করে, সেগুলো <strong>মাঝপথে কেটে যায়</strong> — ইউজার ৫০২ এরর পান বা অসম্পূর্ণ ট্রানজেকশন থেকে যায়।</p>
      <p>সময়সীমা পার হলে Kubernetes <code>SIGKILL</code> পাঠায় — যা <strong>কখনও ধরা যায় না</strong>, তাই graceful shutdown কোড অবশ্যই <code>SIGTERM</code>-এর সময়সীমার মধ্যেই শেষ হতে হবে।</p>
      <h4>যে বিষয়গুলো ভুলে গেলে বিপদ</h4>
      <ul>
        <li><strong>Load balancer-এর দৃষ্টিকোণ থেকে সময় দিন:</strong> <code>SIGTERM</code> পাওয়ামাত্র সার্ভার বন্ধ করলেও, লোড ব্যালেন্সার তখনও কিছুক্ষণ (endpoint propagation delay) নতুন ট্রাফিক পাঠাতে পারে। তাই readiness প্রোব প্রথমে "not ready" করে কিছুক্ষণ অপেক্ষা করার পর সার্ভার বন্ধ করা ভালো অভ্যাস।</li>
        <li><strong>জোর করে বন্ধ করার সময়সীমা রাখুন</strong> (<code>setTimeout</code>) — একটি আটকে থাকা কানেকশন বা অসীম অপেক্ষা যেন পুরো shutdown প্রক্রিয়া আটকে না দেয়।</li>
        <li><strong>কিউ/ওয়ার্কার প্রসেসেও একই নিয়ম:</strong> একটি মেসেজ প্রসেস করার মাঝপথে SIGKILL পেলে সেটি অসম্পূর্ণ অবস্থায় থেকে যেতে পারে — ack না দিয়ে ওয়ার্কার বন্ধ হলে মেসেজ কিউতে ফিরে যাবে (at-least-once ডেলিভারিতে এটি প্রত্যাশিত)।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>terminationGracePeriodSeconds</code> কত রাখা উচিত?</li>
        <li>Graceful shutdown-এর সময় নতুন রিকোয়েস্ট এলে কী হবে?</li>
      </ul>
    `
  },
  {
    id: "node-21",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Async","AsyncLocalStorage","Tracing"],
    question: "AsyncLocalStorage (async_hooks) কী এবং ডিস্ট্রিবিউটেড লগার বা রিকুয়েস্ট কনটেক্সট ট্র্যাকিংয়ে এটি কীভাবে কাজ করে?",
    answer: `
      <p>এটি Thread-local storage এর Node.js বিকল্প। কোনো ফাংশন প্যারামিটারে কন্টিনিউয়াস Trace ID না পাঠিয়ে সম্পূর্ণ Async Request Chain জুড়ে ভ্যারিয়েবল (যেমন- Current User, Request ID) শেয়ার করতে সাহায্য করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { AsyncLocalStorage } = require('async_hooks');
const als = new AsyncLocalStorage();

app.use((req, res, next) => {
  als.run({ requestId: req.headers['x-request-id'] }, () => next());
});

// Deep inside any function
function logMessage() {
  const store = als.getStore();
  console.log(\`[\${store.requestId}] Processing... \`);
}</code></pre>
      </div>
    `
  },
  {
    id: "node-22",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics","Heap Dump","v8"],
    question: "v8.getHeapSnapshot() এবং Chrome DevTools দিয়ে Node.js Memory Leak কীভাবে ডেবাগ করবেন?",
    answer: `
      <p>মেমোরি লিক সনাক্ত করতে রানটাইমে হিপ স্ন্যাপশট নিতে হয়। <code>v8.getHeapSnapshot()</code> দিয়ে স্ন্যাপশট ফাইল তৈরি করে তা Chrome DevTools-এর Memory Tab-এ লোড করা হয়।</p>
      <p>এখানে <strong>Retained Size</strong> বেশি এমন অবজেক্ট খুঁজে বের করতে হয়। ডিটাচড DOM নোড বা ক্লোজার রেফারেন্স সাধারণত মেমোরি লিকের কারণ।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const v8 = require('v8');
const fs = require('fs');
const snapshotStream = v8.getHeapSnapshot();
snapshotStream.pipe(fs.createWriteStream('heap.heapsnapshot'));</code></pre>
      </div>
    `
  },
  {
    id: "node-23",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security","Graceful Shutdown","SIGTERM"],
    question: "Node.js Application Graceful Shutdown (process.on('SIGTERM'), process.on('SIGINT')) কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p>গ্রেসফুল শাটডাউন মানে হঠাৎ করে প্রসেস কিল না করে, নতুন রিকুয়েস্ট বন্ধ করা, ডাটাবেজ কানেকশন সুন্দরভাবে ড্রেন করা এবং রানিং জবগুলো শেষ করে <code>process.exit(0)</code> দেওয়া।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function gracefulShutdown() {
  server.close(async () => {
    await db.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000); // Force kill after 10s
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);</code></pre>
      </div>
    `
  },
  {
    id: "node-24",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Streams","Transform Stream","pipeline"],
    question: "stream.pipeline() এবং stream.finished() ব্যবহার করে Stream Error & Memory Leak কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p>সরাসরি <code>src.pipe(dest)</code> ব্যবহার করলে গন্তব্য স্ট্রিম ক্র্যাশ করলে বা এরর হলে সোর্স স্ট্রিম বন্ধ হয় না, যা মেমোরি লিক করে। <code>stream.pipeline()</code> স্বয়ংক্রিয়ভাবে সব স্ট্রিম ক্লিনআপ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('output.txt.gz'),
  (err) => {
    if (err) console.error('Pipeline failed', err);
    else console.log('Pipeline succeeded');
  }
);</code></pre>
      </div>
    `
  },
  {
    id: "node-25",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Process","PM2","Cluster"],
    question: "PM2 Process Manager (Cluster Mode, Reload vs Restart) কীভাবে নোড অ্যাপ স্কেল করে?",
    answer: `
      <p><strong>PM2</strong> একটি প্রোডাকশন প্রসেস ম্যানেজার যা Node.js-এর বিল্ট-ইন cluster module-এর উপর একটি সুবিধাজনক স্তর যোগ করে — অটো-রিস্টার্ট, লগ ব্যবস্থাপনা, এবং সবচেয়ে গুরুত্বপূর্ণ, <strong>zero-downtime reload</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সব CPU কোরে cluster mode-এ চালানো
pm2 start app.js -i max --name api

pm2 list                    # সব প্রসেসের অবস্থা
pm2 logs api                # লগ দেখা
pm2 monit                   # লাইভ মনিটরিং

# ⚠️ এই দুটি সম্পূর্ণ আলাদা আচরণ করে
pm2 reload api               # ✅ zero-downtime — একে একে worker বদলায়
pm2 restart api              # ❌ সব worker একসাথে মেরে নতুন করে — সংক্ষিপ্ত ডাউনটাইম</code></pre>
      </div>
      <h4>Reload বনাম Restart — মূল পার্থক্য</h4>
      <p><strong><code>restart</code></strong>: সব worker প্রসেস একসাথে বন্ধ করে নতুন করে চালু করে। সহজ, কিন্তু সেই মুহূর্তে সব worker ডাউন থাকায় সংক্ষিপ্ত সময়ের জন্য কোনো রিকোয়েস্ট সার্ভ হয় না।</p>
      <p><strong><code>reload</code></strong>: PM2 <strong>একে একে</strong> প্রতিটি worker বদলায় — একটি নতুন worker চালু করে, সেটি প্রস্তুত হলে একটি পুরনো worker বন্ধ করে, এই ক্রম চলতে থাকে। যেকোনো মুহূর্তে অন্তত একটি worker ট্রাফিক সার্ভ করছে — <strong>ডাউনটাইম শূন্য</strong>।</p>
      <pre class="mermaid">
flowchart LR
    subgraph Reload["pm2 reload — একে একে"]
      A["W1(পুরনো) W2 W3 W4"] --> B["W1(নতুন) W2 W3 W4"]
      B --> C["W1 W2(নতুন) W3 W4"]
      C --> D["...সব বদলানো পর্যন্ত"]
    end
      </pre>
      <span class="diagram-caption">সবসময় অন্তত ৩টি worker ট্রাফিক সার্ভ করছে</span>
      <h4>Cluster mode-এর ভিত্তি</h4>
      <p>PM2 ভেতরে Node.js-এর <code>cluster</code> মডিউল ব্যবহার করে — একই পোর্টে একাধিক worker প্রসেস চালিয়ে সব CPU কোর কাজে লাগায় (Node.js একক-থ্রেডেড হওয়ায় এটি প্রয়োজনীয়)। PM2 শুধু এই মডিউল ব্যবহারকে সহজ করে এবং তার সাথে অপারেশনাল ফিচার যোগ করে।</p>
      <h4>গুরুত্বপূর্ণ সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Graceful shutdown নিজে লিখতে হয়:</strong> reload সঠিকভাবে কাজ করতে হলে অ্যাপ্লিকেশনকে <code>SIGINT</code> পেয়ে চলমান রিকোয়েস্ট শেষ করে তবেই বন্ধ হতে হবে — নাহলে reload-এর সময় রিকোয়েস্ট হারানোর ঝুঁকি থাকে।</li>
        <li><strong>In-memory state ভাগ হয় না:</strong> প্রতিটি worker আলাদা প্রসেস, আলাদা মেমরি। rate-limit কাউন্টার বা লোকাল ক্যাশ worker-ভেদে আলাদা থাকবে — Redis-এর মতো শেয়ার্ড স্টোর দরকার।</li>
        <li><strong>Kubernetes-এ প্রায়ই অপ্রয়োজনীয়:</strong> k8s নিজেই পড-স্তরে স্কেলিং, রোলিং আপডেট ও রিস্টার্ট সামলায়। সেখানে সাধারণত <strong>প্রতি পডে একটি Node প্রসেস</strong> চালানো হয় (cluster mode নয়), এবং replica সংখ্যা বাড়িয়ে স্কেল করা হয় — এতে রিসোর্স লিমিট ও অবজারভেবিলিটি অনেক পরিষ্কার থাকে।</li>
      </ul>
      <p><strong>বাস্তব নিয়ম:</strong> VM বা bare-metal সার্ভারে PM2 চমৎকার। Kubernetes-এ থাকলে PM2-এর বেশিরভাগ ফিচার (স্কেলিং, রোলিং আপডেট, স্বয়ংক্রিয় রিস্টার্ট) k8s নিজেই দেয় — PM2 যোগ করলে জটিলতা বাড়ে, লাভ কম।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>PM2-তে graceful shutdown কীভাবে বাস্তবায়ন করবেন?</li>
        <li>Kubernetes-এ Node.js অ্যাপে কীভাবে স্কেল করবেন?</li>
      </ul>
    `
  },
  {
    id: "node-26",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security","Helmet","Rate Limiting"],
    question: "Node.js Production Hardening: Helmet, Rate Limiting, HPP (HTTP Parameter Pollution) প্রতিরোধ বেস্ট প্র্যাকটিস কী?",
    answer: `
      <ul>
        <li><strong>Helmet:</strong> সিকিউর HTTP হেডার (যেমন- CSP, X-Frame-Options) সেট করতে <code>helmet()</code> মিডলওয়্যার ব্যবহৃত হয়।</li>
        <li><strong>Rate Limiting:</strong> Brute-force ঠেকাতে <code>express-rate-limit</code> দিয়ে পার-আইপি রিকুয়েস্ট লিমিট করা হয়।</li>
        <li><strong>HPP:</strong> ডুপ্লিকেট কুয়েরি প্যারামিটার (যেমন <code>?id=1&id=2</code>) এড়াতে <code>hpp</code> মিডলওয়্যার ব্যবহার করা হয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

app.use(helmet());
app.use(hpp());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));</code></pre>
      </div>
    `
  },
  {
    id: "node-27",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Performance","Compression","gzip"],
    question: "compression middleware (Gzip/Brotli) দিয়ে Node.js Response Payload সাশ্রয় কীভাবে করবেন?",
    answer: `
      <p>HTTP response compression টেক্সট-ভিত্তিক পেলোড (JSON, HTML, CSS, JS) এর আকার নাটকীয়ভাবে কমায় — সাধারণত ৬০-৮০% পর্যন্ত। Node.js-এ <code>compression</code> middleware দিয়ে এটি সহজে যোগ করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const compression = require('compression');

app.use(compression({
  threshold: 1024,       // এর চেয়ে ছোট রেসপন্স কম্প্রেস করবে না
  level: 6,               // 1 (দ্রুত) থেকে 9 (সর্বোচ্চ); ডিফল্ট 6 ভালো ভারসাম্য
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);   // ডিফল্ট: Content-Type দেখে সিদ্ধান্ত
  }
}));</code></pre>
      </div>
      <h4>কেন <code>threshold</code> গুরুত্বপূর্ণ</h4>
      <p>ছোট রেসপন্সে কম্প্রেশন <strong>ক্ষতিকর</strong> হতে পারে — gzip হেডার ও metadata-র ওভারহেড আসল ডেটার চেয়ে বেশি জায়গা নিতে পারে, এবং CPU খরচ করেও কোনো নেটওয়ার্ক লাভ হয় না। ১ KB-র নিচের রেসপন্সে compression সাধারণত বাদ দেওয়াই ভালো — এটিই <code>threshold</code>-এর কাজ।</p>
      <h4>CPU বনাম নেটওয়ার্ক — মূল আপস</h4>
      <p>Compression একটি সরাসরি ট্রেড-অফ: <strong>CPU সময় খরচ করে নেটওয়ার্ক ব্যান্ডউইথ বাঁচানো</strong>। <code>level: 9</code> সবচেয়ে ছোট আউটপুট দেয়, কিন্তু <code>level: 1</code>-এর চেয়ে কয়েকগুণ বেশি CPU লাগে — প্রায়ই মাত্র ২-৫% অতিরিক্ত সংকোচনের জন্য। উচ্চ থ্রুপুট সার্ভারে <code>level: 9</code> সহজেই CPU bottleneck তৈরি করতে পারে।</p>
      <p><strong>নিয়ম:</strong> <code>level: 6</code> (ডিফল্ট) বেশিরভাগ ক্ষেত্রে সেরা ভারসাম্য। CPU-সীমিত পরিবেশে <code>level: 4-5</code> বিবেচনা করুন।</p>
      <h4>একটি ভালো বিকল্প: প্রি-কম্প্রেশন</h4>
      <p>ডায়নামিক কম্প্রেশন প্রতিটি রিকোয়েস্টে CPU খরচ করে — একই স্ট্যাটিক ফাইল বারবার কম্প্রেস করা অপচয়। বিল্ড টাইমে একবার কম্প্রেস করে রাখলে (<code>express.static</code> + <code>.gz</code> ফাইল, বা Nginx-এর <code>gzip_static</code>) প্রতি-রিকোয়েস্ট CPU খরচ শূন্য হয়ে যায়।</p>
      <h4>Reverse proxy-তে করা প্রায়ই ভালো</h4>
      <p>অনেক প্রোডাকশন আর্কিটেকচারে compression Node.js অ্যাপ্লিকেশনে না করে <strong>Nginx বা CDN-এ</strong> করা হয়:</p>
      <ul>
        <li>Node.js-এর CPU সময় ব্যবসায়িক লজিকের জন্য মুক্ত থাকে।</li>
        <li>Nginx-এ compression C-তে লেখা, সাধারণত বেশি দক্ষ।</li>
        <li>একই কনফিগ সব ব্যাকএন্ড সার্ভিসে প্রযোজ্য — প্রতিটিতে আলাদা middleware লিখতে হয় না।</li>
      </ul>
      <p><strong>ব্যবহারিক সিদ্ধান্ত:</strong> Nginx বা CDN-এর পেছনে অ্যাপ চালালে সেখানেই compression করুন। Node.js সরাসরি এক্সপোজ করা থাকলে (বা প্রক্সিতে compression চালু করার নিয়ন্ত্রণ না থাকলে) <code>compression</code> middleware ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>SSE বা streaming রেসপন্সে compression সমস্যা তৈরি করে কেন?</li>
        <li>Brotli কীভাবে যোগ করবেন এবং gzip-এর চেয়ে কী সুবিধা দেয়?</li>
      </ul>
    `
  },
  {
    id: "node-28",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Architecture","Domain Driven","Clean Architecture"],
    question: "Clean Architecture in Node.js: Controllers, Use Cases, Repositories, Domain Entities কীভাবে সাজাবেন?",
    answer: `
      <p>Clean Architecture-এ বিজনেস লজিককে ফ্রেমওয়ার্ক (Express) বা ডাটাবেজ (MongoDB) থেকে সম্পূর্ণ স্বাধীন রাখা হয়।</p>
      <ol>
        <li><strong>Entities:</strong> কোর বিজনেস অবজেক্ট (যেমন- User, Order)।</li>
        <li><strong>Use Cases:</strong> অ্যাপ্লিকেশনের নির্দিষ্ট কাজের লজিক (যেমন- CreateUser)।</li>
        <li><strong>Repositories (Interfaces):</strong> ডাটাবেজ অ্যাক্সেসের ইন্টারফেস।</li>
        <li><strong>Controllers:</strong> HTTP রিকোয়েস্ট গ্রহণ করে Use Case-এ পাঠায়।</li>
      </ol>
      <p>Dependency Injection (DI) ব্যবহার করে ইনফ্রাস্ট্রাকচার লেয়ারকে ডোমেইন লেয়ার থেকে আলাদা রাখা হয়।</p>
    `
  },
  {
    id: "node-29",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Package","pnpm","npm"],
    question: "pnpm / yarn / npm Workspaces দিয়ে Monorepo Package Management কীভাবে পরিচালিত হয়?",
    answer: `
      <p>Monorepo-তে একাধিক প্যাকেজ (frontend, backend, shared libraries) একটি রিপোজিটরিতে থাকে। Package manager-এর <strong>workspace</strong> ফিচার এদের মধ্যে dependency শেয়ারিং ও লোকাল প্যাকেজ লিংকিং সামলায়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// package.json (root)
{
  "name": "my-monorepo",
  "workspaces": ["apps/*", "packages/*"]
}

// apps/api/package.json
{
  "dependencies": {
    "@myorg/shared-utils": "workspace:*",   // pnpm/yarn-এ লোকাল প্যাকেজ রেফারেন্স
    "express": "^4.18.0"
  }
}</code></pre>
      </div>
      <h4>মূল সুবিধা: symlink দিয়ে লোকাল প্যাকেজ লিংকিং</h4>
      <p>প্রতিটি প্যাকেজের <code>node_modules</code>-এ <code>@myorg/shared-utils</code> npm থেকে ডাউনলোড হওয়ার বদলে <strong>একটি symlink</strong> হয়ে থাকে, যা সরাসরি <code>packages/shared-utils</code> ফোল্ডারে নির্দেশ করে। ফলে shared code-এ পরিবর্তন করলেই সব ব্যবহারকারী অ্যাপে সাথে সাথে প্রতিফলিত হয় — আলাদা করে publish বা reinstall করতে হয় না।</p>
      <h4>Hoisting — এবং এর সমস্যা</h4>
      <p>npm/yarn (classic mode) সাধারণ dependency গুলো root <code>node_modules</code>-এ <strong>hoist</strong> করে, ডুপ্লিকেশন এড়াতে। কিন্তু এতে <strong>phantom dependency</strong> সমস্যা হয় — একটি প্যাকেজ নিজের <code>package.json</code>-এ ঘোষণা না করেই hoist হওয়া একটি প্যাকেজ ব্যবহার করতে পারে, কারণ সেটি node_modules-এ "কাকতালীয়ভাবে" আছে। অন্য পরিবেশে (বা hoisting অ্যালগরিদম বদলালে) এটি ভেঙে পড়ে।</p>
      <h4>pnpm-এর সমাধান — সবচেয়ে কঠোর ও নির্ভরযোগ্য</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>pnpm-এ node_modules structure:
  node_modules/
    .pnpm/                    ← আসল ফাইল, content-addressable store থেকে
      express@4.18.0/
    express -> .pnpm/express@4.18.0/node_modules/express   (symlink)
    # শুধু package.json-এ ঘোষিত dependency-র symlink থাকে
    # → phantom dependency ব্যবহার করলে সাথে সাথে "module not found"</code></pre>
      </div>
      <p>pnpm একটি <strong>global content-addressable store</strong> ব্যবহার করে — একই সংস্করণের প্যাকেজ ডিস্কে একবারই থাকে, সব প্রজেক্টে hard-link হয়ে শেয়ার হয়। ফলে ডিস্ক ব্যবহার নাটকীয়ভাবে কমে এবং প্রতিটি প্যাকেজ কেবল তার ঘোষিত dependency-ই দেখতে পায় — hoisting-জনিত বাগ কাঠামোগতভাবেই অসম্ভব।</p>
      <table>
        <tr><th>Manager</th><th>Hoisting</th><th>ডিস্ক দক্ষতা</th><th>Phantom dep সুরক্ষা</th></tr>
        <tr><td>npm workspaces</td><td>হ্যাঁ</td><td>মাঝারি</td><td>❌ না</td></tr>
        <tr><td>yarn classic</td><td>হ্যাঁ</td><td>মাঝারি</td><td>❌ না</td></tr>
        <tr><td>yarn (Plug'n'Play)</td><td>না</td><td>ভালো</td><td>✅ হ্যাঁ</td></tr>
        <tr><td><strong>pnpm</strong></td><td>না (কড়া)</td><td><strong>সেরা</strong></td><td>✅ হ্যাঁ</td></tr>
      </table>
      <h4>বিল্ড টুলের সাথে সমন্বয়</h4>
      <p>Workspace শুধু dependency ব্যবস্থাপনা করে — <strong>টাস্ক অর্কেস্ট্রেশন</strong> (কোন ক্রমে বিল্ড হবে, কোনটি ক্যাশ করা যায়) আলাদা টুলের কাজ। Turborepo বা Nx-এর মতো টুল প্যাকেজের নির্ভরতা গ্রাফ বুঝে সঠিক ক্রমে বিল্ড চালায় এবং যা বদলায়নি তা পুনরায় বিল্ড করে না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Monorepo-তে ভার্সনিং একসাথে না আলাদা রাখবেন?</li>
        <li>CI-তে শুধু বদলানো প্যাকেজ কীভাবে টেস্ট করবেন?</li>
      </ul>
    `
  },
  {
    id: "node-30",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Performance","uv_threadpool_size","libuv"],
    question: "UV_THREADPOOL_SIZE (Default 4) কীভাবে বাড়াবেন এবং এটি কোন কোন অপারেশনে প্রভাব ফেলে?",
    answer: `
      <p>Node.js একক-থ্রেডেড হলেও কিছু ব্লকিং অপারেশন (ফাইল সিস্টেম, DNS lookup, কিছু crypto, zlib) <strong>Libuv-এর thread pool</strong>-এ পাঠিয়ে দেয়, যাতে মূল event loop আটকে না থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># ডিফল্ট মাত্র 4 — অনেক কম-লোড অ্যাপে এটি bottleneck হয়
UV_THREADPOOL_SIZE=4 node app.js

# বাড়ানো — সর্বোচ্চ 1024
UV_THREADPOOL_SIZE=16 node app.js

# ⚠️ প্রোগ্রাম শুরু হওয়ার আগে সেট করতেই হবে — রানটাইমে বদলানো যায় না
process.env.UV_THREADPOOL_SIZE = 16;   // ❌ কাজ করবে না, খুব দেরি</code></pre>
      </div>
      <h4>কোন কোন অপারেশন এই pool ব্যবহার করে</h4>
      <ul>
        <li><strong><code>fs</code> মডিউল</strong> — <code>fs.readFile</code>, <code>fs.writeFile</code> ইত্যাদি সব async ফাইল অপারেশন (ব্যতিক্রম: কিছু নতুন Linux io_uring-ভিত্তিক অপারেশন)।</li>
        <li><strong><code>dns.lookup()</code></strong> — সিস্টেমের <code>getaddrinfo</code> কল করে, যা ব্লকিং। (<code>dns.resolve*()</code> এই pool ব্যবহার করে <strong>না</strong> — সরাসরি নেটওয়ার্কে c-ares লাইব্রেরি দিয়ে অ-ব্লকিংভাবে যায়।)</li>
        <li><strong><code>crypto</code></strong> — <code>pbkdf2</code>, <code>scrypt</code>, <code>randomBytes</code> (async ভার্সন)। <code>createHash</code>/<code>createCipher</code> সিঙ্ক্রোনাস, pool ব্যবহার করে না।</li>
        <li><strong><code>zlib</code></strong> — gzip/gunzip compression।</li>
      </ul>
      <h4>Bottleneck কীভাবে ধরবেন</h4>
      <p>ডিফল্ট সাইজ মাত্র <strong>৪</strong>। একটি অ্যাপ্লিকেশন প্রচুর ফাইল পড়ে বা bcrypt/pbkdf2 দিয়ে পাসওয়ার্ড হ্যাশ করে, এবং একসাথে ৫টির বেশি এমন অপারেশন এলে, ৫ম-টি প্রথম ৪টি শেষ না হওয়া পর্যন্ত <strong>কিউতে অপেক্ষা করে</strong> — এমনকি CPU ও I/O দুটোই অলস থাকলেও।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// সন্দেহ থাকলে পরীক্ষা করুন: pool size বাড়িয়ে থ্রুপুট বাড়ে কি না
console.time('bcrypt-batch');
await Promise.all(
  Array(20).fill(0).map(() => bcrypt.hash('password', 10))
);
console.timeEnd('bcrypt-batch');
// UV_THREADPOOL_SIZE=4 এ ধীর, =20 এ দ্রুত হলে → এটিই bottleneck ছিল</code></pre>
      </div>
      <h4>ব্যবহারিক পরামর্শ</h4>
      <ul>
        <li><strong>CPU কোর সংখ্যার সাথে মিলিয়ে বাড়ান</strong> (যেমন ৮-১৬), অতিরিক্ত বাড়ালে কোনো লাভ নেই — সিস্টেমেরই তো সীমিত কোর।</li>
        <li><strong>Cluster module ব্যবহার করলে</strong> প্রতিটি worker প্রসেসের <em>নিজস্ব</em> thread pool থাকে — তাই মোট থ্রেড সংখ্যা <code>worker সংখ্যা × UV_THREADPOOL_SIZE</code>। খুব বড় করবেন না।</li>
        <li><strong>এটি CPU-বাউন্ড কাজে সাহায্য করে না</strong> (যেমন ভারী loop) — শুধু I/O-বাউন্ড ও crypto-বাউন্ড অপারেশনে যা libuv-এ যায়। CPU-নিবিড় কাজে <code>worker_threads</code> ব্যবহার করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>dns.lookup()</code> ও <code>dns.resolve()</code> কেন আলাদাভাবে আচরণ করে?</li>
        <li>Thread pool ও <code>worker_threads</code>-এর পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "node-31",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Modules","ESM","package.json"],
    question: "Node.js-এ type: 'module' এবং .mjs vs .cjs ফাইল এক্সটেনশন ব্যবহারের সঠিক নিয়ম কী?",
    answer: `
      <p>Node.js দুটি মডিউল সিস্টেম সমর্থন করে — CommonJS (<code>require</code>) ও ES Module (<code>import</code>)। <code>package.json</code>-এর <code>"type"</code> ফিল্ড ও ফাইল এক্সটেনশন নির্ধারণ করে কোন ফাইল কোন সিস্টেমে চলবে।</p>
      <table>
        <tr><th>সেটিং</th><th>ফাইল টাইপ</th><th>ব্যবহৃত সিস্টেম</th></tr>
        <tr><td>(ডিফল্ট, কিছু নেই)</td><td><code>.js</code></td><td>CommonJS</td></tr>
        <tr><td><code>"type": "module"</code></td><td><code>.js</code></td><td>ES Module</td></tr>
        <tr><td>যেকোনো</td><td><code>.mjs</code></td><td>সবসময় ES Module</td></tr>
        <tr><td>যেকোনো</td><td><code>.cjs</code></td><td>সবসময় CommonJS</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// package.json
{ "type": "module" }   // এখন সব .js ফাইল ES module হিসেবে পার্স হবে</code></pre>
      </div>
      <h4>মূল আচরণগত পার্থক্য</h4>
      <ul>
        <li><strong>Synchronous বনাম asynchronous লোডিং:</strong> CommonJS <code>require()</code> সিঙ্ক্রোনাস; ES module <code>import</code> asynchronous (যদিও top-level সিনট্যাক্স সিঙ্ক্রোনাস দেখায়, ভেতরে module graph resolve হওয়ার পর চলে)।</li>
        <li><strong><code>__dirname</code>/<code>__filename</code> নেই ES module-এ:</strong> এগুলো CommonJS-নির্দিষ্ট। ES module-এ <code>import.meta.url</code> থেকে বের করতে হয়।</li>
        <li><strong>Top-level await:</strong> শুধু ES module-এ কাজ করে — CommonJS-এ <code>await</code> একটি async function-এর ভেতরেই থাকতে হয়।</li>
        <li><strong>Named export/import বেশি নমনীয়:</strong> ES module-এ static analysis (tree-shaking) সম্ভব; CommonJS-এ <code>module.exports</code> ডায়নামিক হতে পারে, যা bundler-এর জন্য বিশ্লেষণ করা কঠিন।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ES module-এ __dirname-এর বিকল্প
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);</code></pre>
      </div>
      <h4>দুটি সিস্টেম একসাথে ব্যবহার করা — লাইব্রেরি লেখকদের জন্য</h4>
      <p>একটি npm প্যাকেজ যদি দুই ধরনের কনজিউমারকেই সমর্থন করতে চায় (CommonJS ও ESM ব্যবহারকারী), <code>package.json</code>-এর <code>exports</code> ফিল্ডে <strong>dual package</strong> সেটআপ করা হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>{
  "name": "my-lib",
  "type": "module",
  "main": "./dist/index.cjs",       // CommonJS ব্যবহারকারীদের জন্য fallback
  "module": "./dist/index.mjs",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",   // import করলে ESM সংস্করণ
      "require": "./dist/index.cjs"   // require() করলে CJS সংস্করণ
    }
  }
}</code></pre>
      </div>
      <h4>বাস্তব নিয়ম</h4>
      <p><strong>নতুন প্রজেক্টে <code>"type": "module"</code> ব্যবহার করুন</strong> — ES module ভবিষ্যতের স্ট্যান্ডার্ড, browser-এও সরাসরি চলে, এবং ইকোসিস্টেম দ্রুত সেদিকে সরে যাচ্ছে। <code>.mjs</code>/<code>.cjs</code> এক্সটেনশন ব্যবহার করুন কেবল যখন একই প্রজেক্টে দুই ধরনের ফাইল <em>মেশাতে</em> হবে (যেমন একটি লিগ্যাসি কনফিগ ফাইল যা এখনও <code>require</code>-নির্ভর টুলের জন্য CommonJS থাকতে হবে)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CommonJS মডিউল থেকে ES module import করা যায় কি (এবং উল্টো)?</li>
        <li><code>require()</code> দিয়ে ESM-only প্যাকেজ লোড করলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "node-32",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security","REPL","eval"],
    question: "Node.js-এ eval() এবং new Function() ব্যবহারের ভয়াবহ নিরাপত্তা ঝুঁকি কী?",
    answer: `
      <p><code>eval()</code> ও <code>new Function()</code> রানটাইমে স্ট্রিং থেকে কোড তৈরি ও চালায় — এবং এটি ওয়েব অ্যাপ্লিকেশনের সবচেয়ে বিপজ্জনক দুর্বলতাগুলোর একটির দরজা খুলে দেয়: <strong>Remote Code Execution (RCE)</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ভয়াবহ — ইউজারের ইনপুট সরাসরি কোড হিসেবে চলছে
app.post('/calculate', (req, res) => {
  const result = eval(req.body.expression);   // RCE!
  res.json({ result });
});

// আক্রমণকারী পাঠাতে পারে:
// { "expression": "require('child_process').execSync('rm -rf /')" }
// অথবা: "require('fs').readFileSync('/etc/passwd').toString()"
// অথবা: "process.env" — সব সিক্রেট এনভায়রনমেন্ট ভ্যারিয়েবল ফাঁস</code></pre>
      </div>
      <h4>কেন এত বিপজ্জনক</h4>
      <p><code>eval()</code> যে কোনো JavaScript চালাতে পারে — এবং Node.js-এ JavaScript-এর <code>require('child_process')</code>, <code>require('fs')</code>-এর মতো মডিউলের মাধ্যমে <strong>সম্পূর্ণ সিস্টেম অ্যাক্সেস</strong> আছে। ব্রাউজারের <code>eval()</code>-এর চেয়ে এটি অনেক বেশি ভয়াবহ, কারণ সেখানে অন্তত sandbox আছে (DOM, cookie সীমাবদ্ধ) — Node.js-এ কোনো sandbox নেই।</p>
      <p><code>new Function()</code>-ও একই রকম বিপজ্জনক — এটি <code>eval</code>-এর একটি বিকল্প রূপ মাত্র, একই ঝুঁকি বহন করে।</p>
      <h4>পরোক্ষ ইনজেকশনও সম্ভব</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ এটিও eval-এর মতোই বিপজ্জনক — setTimeout স্ট্রিং নিলে eval করে
setTimeout(userInput, 1000);

// ❌ কিছু template engine-এ ভুল কনফিগারেশনে একই সমস্যা
// ❌ VM মডিউলও পুরোপুরি নিরাপদ sandbox দেয় না
const vm = require('vm');
vm.runInNewContext(userInput);   // এটিও escape করা সম্ভব বলে পরিচিত</code></pre>
      </div>
      <h4>বিকল্প — কখনও ইউজার ইনপুট থেকে কোড চালাবেন না</h4>
      <ul>
        <li><strong>গাণিতিক এক্সপ্রেশন মূল্যায়নে:</strong> <code>mathjs</code> বা <code>expr-eval</code>-এর মতো নিরাপদ পার্সার ব্যবহার করুন — এগুলো কোড চালায় না, শুধু গণিত পার্স করে।</li>
        <li><strong>JSON পার্স করতে:</strong> <code>eval()</code> নয়, সবসময় <code>JSON.parse()</code>।</li>
        <li><strong>ডায়নামিক টেমপ্লেটে:</strong> নিরাপদ টেমপ্লেট ইঞ্জিন (Handlebars, EJS with escaping) ব্যবহার করুন, নিজে string concatenation দিয়ে কোড বানাবেন না।</li>
        <li><strong>প্লাগইন/স্ক্রিপ্টিং ফিচারের জন্য:</strong> সত্যিকারের sandbox দরকার হলে <code>isolated-vm</code>-এর মতো লাইব্রেরি বা সম্পূর্ণ আলাদা প্রসেস/কন্টেইনারে (কড়া রিসোর্স সীমাসহ) চালান — Node.js-এর নিজস্ব <code>vm</code> মডিউল যথেষ্ট নয়।</li>
      </ul>
      <h4>একটি সাধারণ ভুল ধারণা</h4>
      <p>"আমি তো শুধু বিশ্বস্ত অ্যাডমিনদের জন্য এই ফিচার বানিয়েছি" — এই যুক্তি বিপজ্জনক। অ্যাডমিন অ্যাকাউন্ট XSS বা credential leak-এ আপস হতে পারে, এবং তখন <code>eval()</code>-এর মতো ফিচার আক্রমণকারীকে সরাসরি সার্ভার নিয়ন্ত্রণ দিয়ে দেয়। <strong>Trust boundary যতটা সম্ভব সংকীর্ণ রাখুন — কখনও কোড execution ইউজার-নিয়ন্ত্রিত করবেন না।</strong></p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Prototype pollution আক্রমণ eval ছাড়াও কীভাবে ঘটতে পারে?</li>
        <li><code>vm</code> মডিউল কীভাবে escape করা সম্ভব?</li>
      </ul>
    `
  },
  {
    id: "node-33",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["HTTP","http.Agent","KeepAlive"],
    question: "http.Agent { keepAlive: true } ব্যাকএন্ড এপিআই কলের ল্যাটেন্সি কীভাবে কমায়?",
    answer: `
      <p><code>http.Agent</code> Node.js-এ কানেকশন পুলিং সামলায়। ডিফল্টে <strong>keep-alive বন্ধ</strong> — প্রতিটি আউটগোয়িং রিকোয়েস্টে একটি নতুন TCP কানেকশন খোলে এবং কাজ শেষে বন্ধ করে দেয়। এটি মাইক্রোসার্ভিসে বা বাইরের API কলে সবচেয়ে সাধারণ, অথচ সহজে উপেক্ষিত পারফরম্যান্স সমস্যা।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const http = require('http');

const agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,       // TCP keep-alive প্যাকেট পাঠানোর ব্যবধান
  maxSockets: 50,              // প্রতি হোস্টে সর্বোচ্চ সমান্তরাল কানেকশন
  maxFreeSockets: 10,          // idle অবস্থায় কতগুলো কানেকশন রাখা হবে
  timeout: 60000
});

// axios-এ
const axios = require('axios');
const client = axios.create({ httpAgent: agent, httpsAgent: httpsAgent });

// fetch (undici)-তে — Node.js 18+ এ নেটিভ
const { Agent, setGlobalDispatcher } = require('undici');
setGlobalDispatcher(new Agent({ keepAliveTimeout: 30000, connections: 50 }));</code></pre>
      </div>
      <h4>কেন এটি latency কমায়</h4>
      <p>প্রতিটি নতুন কানেকশনে TCP handshake (১ RTT) এবং HTTPS হলে TLS handshake (১-২ RTT আরও) লাগে। একটি বাইরের API-তে সেকেন্ডে ১০০ কল হলে, keep-alive ছাড়া প্রতিটি কল অতিরিক্ত ৫০-১৫০ms নিচ্ছে শুধু হ্যান্ডশেকের জন্য।</p>
      <p><code>keepAlive: true</code> দিলে একটি কানেকশন পুনর্ব্যবহার হয় — হ্যান্ডশেক একবারই হয়, পরের সব রিকোয়েস্ট সরাসরি ডেটা পাঠায়। বাস্তবে এটি বাইরের API কলে <strong>৩০-৫০% latency সাশ্রয়</strong> করতে পারে।</p>
      <h4>একটি লুকানো সমস্যা: port exhaustion</h4>
      <p>Keep-alive ছাড়া প্রতিটি বন্ধ হওয়া কানেকশন কিছুক্ষণ (~৬০ সেকেন্ড) <code>TIME_WAIT</code> অবস্থায় থাকে। উচ্চ থ্রুপুটে এটি দ্রুত সব উপলব্ধ ephemeral পোর্ট (~২৮,০০০) নিঃশেষ করে দিতে পারে — তখন নতুন কোনো আউটগোয়িং কানেকশন খোলা যায় না। Keep-alive এই সমস্যা প্রায় সম্পূর্ণ দূর করে।</p>
      <h4>ব্যবহারিক নিয়ম</h4>
      <ul>
        <li><strong>বাইরের সব API কলে একটি শেয়ার্ড, keep-alive সক্ষম agent ব্যবহার করুন</strong> — প্রতিটি কলে নতুন agent বানাবেন না, তাহলে পুলিংয়ের কোনো লাভই হবে না।</li>
        <li><strong><code>maxSockets</code> ঠিক করুন</strong> — খুব কম হলে সমান্তরাল কল ব্লক হবে; খুব বেশি হলে দূরের সার্ভারে অপ্রয়োজনীয় চাপ পড়বে।</li>
        <li><strong>Undici (Node 18+ নেটিভ fetch)</strong> ডিফল্টে keep-alive চালু রাখে — নতুন কোডে সরাসরি এটি ব্যবহার করাই সহজ।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>TIME_WAIT অবস্থা কীভাবে port exhaustion তৈরি করে?</li>
        <li>একাধিক ডোমেইনে কল করলে agent কীভাবে সামলাবেন?</li>
      </ul>
    `
  },
  {
    id: "node-34",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Testing","node:test","Mocking"],
    question: "Node.js Native Test Runner (node:test) এবং Mocking API (node:test/reporters) কীভাবে কাজ করে?",
    answer: `
      <p>Node 18+ এ কোনো থার্ডপার্টি Jest/Mocha ছাড়াই নেটিভ <code>node:test</code> ব্যবহার করে সুপারফাস্ট ইউনিট টেস্ট চালানো যায়। এতে বিল্ট-ইন Mocking সাপোর্ট আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

test('Mocking fs.readFile', (t) => {
  const mock = t.mock.method(fs, 'readFile', (path, cb) => cb(null, 'mocked data'));
  fs.readFile('test.txt', (err, data) => {
    assert.strictEqual(data, 'mocked data');
    mock.mock.restore();
  });
});</code></pre>
      </div>
    `
  },
  {
    id: "node-35",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["FileSystem","fs/promises","fs.watch"],
    question: "fs.watch vs fs.watchFile এবং fs/promises ব্যবহারের আধুনিক সুবিধা কী?",
    answer: `
      <p><code>fs.watch</code> ওএস নেটিভ ইভেন্ট লিসেনার ব্যবহার করায় <code>fs.watchFile</code> পোলিং মেথডের চেয়ে দ্রুত ও মেমোরি ফ্রেন্ডলি। <code>fs/promises</code> কলব্যাকের বদলে async/await সাপোর্ট দেয়, যা কোড ক্লিন রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const fs = require('fs/promises');
const { watch } = require('fs');

watch('./file.txt', (eventType, filename) => {
  console.log(\`File \${filename} changed: \${eventType}\`);
});

async function readFile() {
  const data = await fs.readFile('./file.txt', 'utf-8');
  console.log(data);
}</code></pre>
      </div>
    `
  },
  {
    id: "node-36",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics","perf_hooks","PerformanceObserver"],
    question: "node:perf_hooks এবং PerformanceObserver দিয়ে এন্ডপয়েন্টের ল্যাটেন্সি বেন্চমার্ক কীভাবে মেজার করবেন?",
    answer: `
      <p><code>PerformanceObserver</code> দিয়ে মার্ক এবং মেজারগুলো কনসোলে বা লগিং সিস্টেমে রেকর্ড করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => console.log(entry.name, entry.duration));
});
obs.observe({ entryTypes: ['measure'] });

performance.mark('A');
// API Call or DB Query
performance.mark('B');
performance.measure('API Latency', 'A', 'B');</code></pre>
      </div>
    `
  },
  {
    id: "node-37",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Crypto","crypto.randomBytes","UUID"],
    question: "crypto.randomBytes() vs Math.random() — কেন সিকিউরিটিতে Cryptographically Secure Pseudo-Random (CSPRNG) জরুরি?",
    answer: `
      <p><strong>Math.random() কখনও নিরাপত্তা-সংক্রান্ত কাজে ব্যবহার করবেন না</strong> — এটি একটি সাধারণ (non-cryptographic) pseudo-random number generator, যার আউটপুট <em>অনুমানযোগ্য</em>।</p>
      <h4>কেন Math.random() অনিরাপদ</h4>
      <p>V8-এর <code>Math.random()</code> একটি নির্ধারক (deterministic) অ্যালগরিদম (xorshift128+) ব্যবহার করে। এর সীড ও অভ্যন্তরীণ অবস্থা পর্যাপ্ত আউটপুট দেখে <strong>পুনর্গঠন করা সম্ভব</strong> — গবেষকরা মাত্র কয়েকটি আউটপুট দেখেই পরবর্তী মান নির্ভুলভাবে অনুমান করে দেখিয়েছেন।</p>
      <p>এর মানে যদি এটি দিয়ে পাসওয়ার্ড রিসেট টোকেন, সেশন আইডি, বা API কী তৈরি করা হয়, একজন আক্রমণকারী কয়েকটি টোকেন পর্যবেক্ষণ করে <strong>পরবর্তী টোকেন অনুমান করতে পারবেন</strong> — সম্পূর্ণ authentication ভেঙে যাবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const crypto = require('crypto');

// ❌ কখনও নয় — অনুমানযোগ্য
const token = Math.random().toString(36).substring(2);

// ✅ CSPRNG — অপারেটিং সিস্টেমের এনট্রপি সোর্স ব্যবহার করে
const token = crypto.randomBytes(32).toString('hex');

// আধুনিক, সংক্ষিপ্ত সিনট্যাক্স (Node.js 14.17+)
const uuid = crypto.randomUUID();

// একটি রেঞ্জের মধ্যে নিরাপদ র‍্যান্ডম সংখ্যা (OTP-এর জন্য)
const otp = crypto.randomInt(100000, 999999);</code></pre>
      </div>
      <h4>CSPRNG কীভাবে ভিন্ন</h4>
      <p><strong>Cryptographically Secure PRNG</strong> অপারেটিং সিস্টেমের <code>/dev/urandom</code> (Linux/macOS) বা <code>CryptGenRandom</code> (Windows)-এর এনট্রপি ব্যবহার করে — যা হার্ডওয়্যার শব্দ, ইন্টারাপ্ট টাইমিং ইত্যাদি প্রকৃত এলোমেলো উৎস থেকে সংগৃহীত। এর আউটপুট থেকে অভ্যন্তরীণ অবস্থা পুনর্গঠন করা গণনাগতভাবে অসম্ভব।</p>
      <table>
        <tr><th>দিক</th><th><code>Math.random()</code></th><th><code>crypto.randomBytes()</code></th></tr>
        <tr><td>উৎস</td><td>নির্ধারক অ্যালগরিদম</td><td>OS এনট্রপি</td></tr>
        <tr><td>অনুমানযোগ্যতা</td><td>সম্ভব</td><td>গণনাগতভাবে অসম্ভব</td></tr>
        <tr><td>গতি</td><td>দ্রুত</td><td>সামান্য ধীর</td></tr>
        <tr><td>উপযুক্ত</td><td>গেম, UI অ্যানিমেশন, স্যাম্পলিং</td><td>টোকেন, কী, সল্ট, সেশন আইডি</td></tr>
      </table>
      <h4>যেখানে অবশ্যই CSPRNG লাগবে</h4>
      <ul>
        <li>পাসওয়ার্ড রিসেট টোকেন, ইমেইল ভেরিফিকেশন লিংক</li>
        <li>সেশন আইডি, API কী, JWT সিক্রেট</li>
        <li>পাসওয়ার্ড হ্যাশিংয়ের সল্ট</li>
        <li>এনক্রিপশন কী ও initialization vector (IV)</li>
        <li>CSRF টোকেন</li>
      </ul>
      <p><strong>যেখানে <code>Math.random()</code> গ্রহণযোগ্য:</strong> শাফল অ্যানিমেশন, র‍্যান্ডম রঙ, A/B টেস্ট বাকেটিং (নিরাপত্তা-সংবেদনশীল নয়) — যেখানে ফলাফল অনুমানযোগ্য হলে কোনো ক্ষতি নেই।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>crypto.randomInt()</code> কীভাবে modulo bias এড়ায়?</li>
        <li>UUID v4 কি নিরাপত্তা টোকেন হিসেবে যথেষ্ট?</li>
      </ul>
    `
  },
  {
    id: "node-38",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Native","N-API","C++ Addons"],
    question: "Node-API (N-API) এবং C++ Addons দিয়ে অতি উচ্চ পারফরম্যান্সের নেটিভ মডিউল কীভাবে তৈরি করা হয়?",
    answer: `
      <p>অত্যন্ত ভারী গাণিতিক বা ইমেজ প্রসেসিংয়ের কাজ C/C++ এ লিখে <code>N-API</code> ইন্টারফেসের মাধ্যমে Node.js-এ ইন্টিগ্রেট করা হয়। এতে Node.js ভার্সন আপগ্রেডে কোড ব্রেক করে না (ABI Stability)। <code>node-addon-api</code> প্যাকেজ ব্যবহার করে সহজে C++ অ্যাডঅন লেখা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>cpp</span><button class="copy-btn">Copy</button></div>
        <pre><code>// addon.cc (C++ code)
Napi::String Method(const Napi::CallbackInfo& info) {
  return Napi::String::New(info.Env(), "Hello from C++");
}
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Method));
  return exports;
}</code></pre>
      </div>
    `
  },
  {
    id: "node-39",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Globals","process.nextTick","setImmediate"],
    question: "process.nextTick vs setImmediate vs setTimeout(fn, 0) এর এক্সিকিউশন সিকুয়েন্স প্র্যাকটিকাল প্রমাণ কী?",
    answer: `
      <p>Microtask এবং Macrotask এর উপর ভিত্তি করে এদের এক্সিকিউশন সিকুয়েন্স নির্ধারিত হয়।</p>
      <ol>
        <li><code>process.nextTick</code> (Microtask Phase এর শুরুতেই)</li>
        <li><code>Promise.then</code> (Microtask Phase)</li>
        <li><code>setTimeout 0</code> (Timers Phase)</li>
        <li><code>setImmediate</code> (Check Phase)</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('nextTick'));

// Output:
// nextTick -> Promise -> setTimeout -> setImmediate</code></pre>
      </div>
    `
  },
  {
    id: "node-40",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security","Policy","Permission Model"],
    question: "Node.js Experimental Permission Model (--experimental-permission) দিয়ে ফাইল সিস্টেম এক্সেস কীভাবে লক ডাউন করবেন?",
    answer: `
      <p>Node.js 20+ এ <strong>Permission Model</strong> (এখনও experimental) একটি নতুন নিরাপত্তা স্তর যোগ করে — অ্যাপ্লিকেশন কী কী রিসোর্সে অ্যাক্সেস পাবে তা <em>startup-এই</em> সীমাবদ্ধ করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># সম্পূর্ণ ফাইল সিস্টেম অ্যাক্সেস বন্ধ, শুধু নির্দিষ্ট পাথে অনুমতি
node --experimental-permission \\
     --allow-fs-read=/app/data \\
     --allow-fs-write=/app/logs \\
     server.js

# চাইল্ড প্রসেস ও ওয়ার্কার থ্রেড নিষিদ্ধ
node --experimental-permission --allow-child-process=false server.js

# নেটওয়ার্ক অ্যাক্সেস নিয়ন্ত্রণ (Node 22+)
node --experimental-permission --allow-net server.js</code></pre>
      </div>
      <h4>যে সমস্যাটি সমাধান করে</h4>
      <p>ঐতিহ্যগতভাবে একটি Node.js প্রসেসের <strong>সম্পূর্ণ ও নিঃশর্ত সিস্টেম অ্যাক্সেস</strong> থাকে — যেকোনো ফাইল পড়তে/লিখতে পারে, যেকোনো নেটওয়ার্ক কল করতে পারে, চাইল্ড প্রসেস চালাতে পারে। একটি dependency-তে (আপনার নয়, তৃতীয়-পক্ষের নির্ভরতায়) দুর্বলতা থাকলে — সেটি আপনার সার্ভারের প্রতিটি ফাইল পড়তে বা মুছতে পারে, যা <em>supply chain attack</em>-এর মূল ঝুঁকি।</p>
      <p>Permission Model অ্যাপ্লিকেশনের <strong>blast radius সীমিত করে</strong> — একটি আপস হওয়া dependency শুধু স্পষ্টভাবে অনুমোদিত রিসোর্সেই পৌঁছাতে পারবে।</p>
      <h4>রানটাইমে পরীক্ষা করা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>if (process.permission) {
  console.log(process.permission.has('fs.read', '/app/data'));   // true
  console.log(process.permission.has('fs.write', '/etc'));       // false
}</code></pre>
      </div>
      <h4>বর্তমান সীমাবদ্ধতা — কেন এটি এখনও experimental</h4>
      <ul>
        <li><strong>কোনো "sandbox" নয়:</strong> এটি একটি অতিরিক্ত সুরক্ষা স্তর, কিন্তু নিখুঁত isolation দেয় না — এখনও কিছু bypass সম্ভব বলে জানা গেছে।</li>
        <li><strong>Native addon-এর উপর প্রয়োগ হয় না সম্পূর্ণভাবে</strong> — C++ addon যদি সরাসরি সিস্টেম কল করে, permission model তা আটকাতে পারে না।</li>
        <li><strong>অনেক লাইব্রেরি এখনও এর সাথে সামঞ্জস্যপূর্ণ নয়</strong> — অনুমতির বাইরে ফাইল অ্যাক্সেসের চেষ্টা করলে সেই লাইব্রেরি ভেঙে পড়বে।</li>
        <li><strong>Node.js নিজেই ভবিষ্যতে API বদলাতে পারে</strong> — এটি এখনও একটি স্থিতিশীল, ব্যাকওয়ার্ড-কম্প্যাটিবল ফিচার নয়।</li>
      </ul>
      <p><strong>ব্যবহারিক পরামর্শ:</strong> এখনই প্রোডাকশনে একমাত্র নিরাপত্তা ব্যবস্থা হিসেবে নির্ভর করবেন না। এটিকে defense-in-depth-এর একটি অতিরিক্ত স্তর হিসেবে দেখুন — মূল সুরক্ষা এখনও container isolation (Docker), least-privilege OS ইউজার, ও নিয়মিত dependency audit-এর উপরই থাকা উচিত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Container isolation ও Permission Model-এর মধ্যে পার্থক্য কী?</li>
        <li>কোন ধরনের অ্যাপ্লিকেশনে এটি সবচেয়ে বেশি উপকারী?</li>
      </ul>
    `
  },
  {
    id: "node-41",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Process","child_process.fork","IPC"],
    question: "child_process.fork() এবং Inter-Process Communication (process.send) কীভাবে ব্যাকগ্রাউন্ড ভারী কাজ প্রসেস করে?",
    answer: `
      <p>মেইন ইভেন্ট লুপ ব্লক না করে আলাদা Node.js V8 প্রসেস স্পন করতে <code>fork()</code> ব্যবহৃত হয়। এটি মূলত একটি বিল্ট-ইন IPC চ্যানেল সহ <code>child_process.spawn</code>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// parent.js
const forked = require('child_process').fork('./child.js');
forked.send({ data: 'Start processing' });
forked.on('message', (msg) => console.log('Result from child:', msg));

// child.js
process.on('message', (msg) => {
  const result = doHeavyTask();
  process.send(result);
});</code></pre>
      </div>
    `
  },
  {
    id: "node-42",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security","HTTPS","TLS"],
    question: "tls.createServer() এবং ALPN (Application-Layer Protocol Negotiation) কনফিগারেশন কী?",
    answer: `
      <p>SSL/TLS হ্যান্ডশেক করার সময় ক্লায়েন্ট ও সার্ভারের মধ্যে প্রোটোকল (যেমন- HTTP/1.1 নাকি HTTP/2) নেগোশিয়েট করার প্রক্রিয়াকে ALPN বলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const tls = require('tls');
const options = {
  ALPNProtocols: ['h2', 'http/1.1'],
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const server = tls.createServer(options, (socket) => {
  console.log('Negotiated Protocol:', socket.alpnProtocol);
});</code></pre>
      </div>
    `
  },
  {
    id: "node-43",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Console","console.time","console.trace"],
    question: "console.time(), console.timeEnd(), এবং console.trace()-এর কাজের সুবিধা কী?",
    answer: `
      <p>Node.js-এর কনসোল API শুধু <code>console.log</code>-এর বেশি কিছু দেয় — এই তিনটি মেথড দ্রুত ডিবাগিংয়ে সরাসরি কার্যকর, বিশেষ করে জটিল টুলিং সেটআপ ছাড়াই।</p>
      <h4><code>console.time()</code> / <code>console.timeEnd()</code></h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>console.time('db-query');
const results = await db.query('SELECT * FROM orders WHERE status = $1', ['pending']);
console.timeEnd('db-query');
// → db-query: 45.234ms

// একাধিক টাইমার একসাথে চালানো যায় — লেবেল দিয়ে আলাদা
console.time('total-request');
console.time('auth-check');
await verifyToken(token);
console.timeEnd('auth-check');       // → auth-check: 12ms
await processRequest();
console.timeEnd('total-request');     // → total-request: 89ms

// মাঝপথে সময় দেখতে (টাইমার থামায় না)
console.time('batch');
for (const item of items) {
  process(item);
  console.timeLog('batch', \`\${item.id} সম্পন্ন\`);
}
console.timeEnd('batch');</code></pre>
      </div>
      <p>এটি <code>Date.now()</code> দিয়ে ম্যানুয়াল হিসাব করার চেয়ে দ্রুত ও পরিষ্কার — দুটি লাইন, কোনো ভ্যারিয়েবল ব্যবস্থাপনা লাগে না।</p>
      <h4><code>console.trace()</code></h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function validateOrder(order) {
  if (!order.userId) {
    console.trace('userId অনুপস্থিত — কল স্ট্যাক:');
    // Trace: userId অনুপস্থিত — কল স্ট্যাক:
    //     at validateOrder (/app/orders.js:15:13)
    //     at processOrder (/app/orders.js:42:5)
    //     at /app/routes/checkout.js:23:18
  }
}</code></pre>
      </div>
      <p><strong>এটি কখন <code>console.log</code>-এর চেয়ে ভালো:</strong> একটি ফাংশন <em>কোথা থেকে</em> ভুল ডেটা নিয়ে ডাকা হচ্ছে তা বোঝা কঠিন হলে (বিশেষত একটি ফাংশন বহু জায়গা থেকে কল হয়), <code>console.trace()</code> সরাসরি সম্পূর্ণ কল চেইন দেখিয়ে দেয় — কোনো ম্যানুয়াল <code>new Error().stack</code> লেখার দরকার নেই।</p>
      <h4>প্রোডাকশনে ব্যবহারের সীমা</h4>
      <p>এই মেথডগুলো <strong>দ্রুত স্থানীয় ডিবাগিংয়ে চমৎকার</strong>, কিন্তু প্রোডাকশন মনিটরিংয়ের জন্য উপযুক্ত নয়:</p>
      <ul>
        <li><strong><code>console.time</code>/<code>timeEnd</code>:</strong> কেবল কনসোলে প্রিন্ট করে — কোনো মেট্রিক সিস্টেমে যায় না, তাই দীর্ঘমেয়াদি ট্রেন্ড দেখা যায় না। প্রোডাকশনে <code>perf_hooks</code> বা APM টুল ব্যবহার করুন, যা ডেটা সংরক্ষণ ও aggregate করতে পারে।</li>
        <li><strong><code>console.trace</code>:</strong> প্রতিবার সম্পূর্ণ স্ট্যাক ট্রেস তৈরি করা কিছুটা ব্যয়বহুল — উচ্চ-থ্রুপুট কোড পাথে (যেমন প্রতিটি রিকোয়েস্টে) রেখে দিলে পারফরম্যান্সে প্রভাব পড়তে পারে। ডিবাগিং শেষে সরিয়ে ফেলুন।</li>
      </ul>
      <p><strong>ব্যবহারিক নিয়ম:</strong> স্থানীয় ডেভেলপমেন্ট ও দ্রুত সমস্যা নির্ণয়ে এই টুলগুলো ব্যবহার করুন। প্রোডাকশনে স্থায়ী instrumentation-এর জন্য structured logging (pino) ও APM/OpenTelemetry ব্যবহার করুন, যা ডেটা সংরক্ষণ করে এবং ড্যাশবোর্ড/alert তৈরি করতে দেয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>console.table()</code> কখন কাজে লাগে?</li>
        <li>প্রোডাকশনে <code>console.log</code> সম্পূর্ণ বাদ দেওয়া উচিত কি?</li>
      </ul>
    `
  },
  {
    id: "node-44",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Cluster","Sticky Sessions","Socket.io"],
    question: "Node.js Cluster Mode-এ Sticky Sessions (socket.io-sticky) কেন বাধ্যতামূলক?",
    answer: `
      <p>WebSocket (Socket.io) এর HTTP হ্যান্ডশেক শুরু হওয়ার পর আপগ্রেড হয়। ক্লাস্টার মোডে লোড ব্যালেন্সার রাউন্ড-রবিনে রিকোয়েস্ট ভাগ করে, ফলে হ্যান্ডশেক এক প্রসেসে এবং আপগ্রেড অন্য প্রসেসে চলে গেলে সকেট এরর দেয়।</p>
      <p>Sticky Sessions ইউজারের IP অনুযায়ী একই Worker Process-এ রিকুয়েস্ট ফিক্স রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const cluster = require('cluster');
const sticky = require('sticky-session');

if (cluster.isMaster) {
  sticky.listen(server, 3000); // Sticky load balancer
} else {
  // Worker process handling WebSocket
}</code></pre>
      </div>
    `
  },
  {
    id: "node-45",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Environment","NODE_ENV","Optimization"],
    question: "NODE_ENV=production দিলে Node.js অ্যান্ড এক্সপ্রেস অভ্যন্তরীণভাবে কী কী অপটিমাইজেশন অন করে?",
    answer: `
      <p><code>NODE_ENV=production</code> নিজে থেকে Node.js-এর আচরণ বদলায় না — এটি শুধু একটি environment variable যা <strong>লাইব্রেরিগুলো নিজে চেক করে</strong> এবং সেই অনুযায়ী অপ্টিমাইজেশন চালু করে।</p>
      <h4>Express-এ যা বদলায়</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Express ভেতরে করে (সরলীকৃত):
if (process.env.NODE_ENV === 'production') {
  app.enable('view cache');      // Template compile করে ক্যাশে রাখা
  app.set('trust proxy', ...);   // (আপনাকে এটি নিজেই সেট করতে হয়)
}</code></pre>
      </div>
      <ul>
        <li><strong>View caching চালু:</strong> ডেভেলপমেন্টে প্রতিটি রিকোয়েস্টে template ফাইল থেকে পড়ে কম্পাইল হয় (যাতে পরিবর্তন সাথে সাথে দেখা যায়)। Production-এ একবার কম্পাইল হয়ে মেমরিতে ক্যাশে থাকে।</li>
        <li><strong>Verbose error page বন্ধ:</strong> ডেভেলপমেন্টে স্ট্যাক ট্রেসসহ বিস্তারিত এরর পেজ দেখায় — production-এ এটি চালু থাকলে সংবেদনশীল তথ্য (ফাইল পাথ, কোড) ফাঁস হতে পারে।</li>
      </ul>
      <h4>Node.js core-এ যা বদলায়</h4>
      <p>খুবই কম, কিন্তু গুরুত্বপূর্ণ — কিছু লাইব্রেরি (যেমন <code>debug</code>) <code>NODE_ENV</code> চেক করে ভার্বোস লগিং বন্ধ রাখে। V8 নিজে <code>NODE_ENV</code> দেখে না — এটি একটি অ্যাপ্লিকেশন-স্তরের কনভেনশন, Node.js-এর বিল্ট-ইন ফিচার নয়।</p>
      <h4>একটি গুরুত্বপূর্ণ ভুল ধারণা</h4>
      <p><strong>"<code>NODE_ENV=production</code> সেট করলেই সব প্রোডাকশন-রেডি হয়ে যায়" — এটি ভুল।</strong> এটি একটি একক ফ্ল্যাগ যা লাইব্রেরির আচরণ বদলায়, কিন্তু প্রকৃত প্রোডাকশন প্রস্তুতির জন্য আরও অনেক কিছু আপনাকে নিজে করতে হয়:</p>
      <ul>
        <li><strong>Logging level:</strong> debug লগ বন্ধ করে structured JSON লগে যাওয়া (নিজে কনফিগার করতে হয়)।</li>
        <li><strong>Error handling:</strong> uncaught exception ও unhandled rejection-এর জন্য সঠিক হ্যান্ডলার।</li>
        <li><strong>Security headers, rate limiting, CORS নীতি</strong> — এসব <code>NODE_ENV</code> সেট করলে আপনাআপনি হয় না।</li>
        <li><strong>Process manager (PM2, Kubernetes)</strong> দিয়ে ক্র্যাশে স্বয়ংক্রিয় রিস্টার্ট।</li>
      </ul>
      <h4><code>npm install</code>-এ প্রভাব</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>NODE_ENV=production npm install
# devDependencies ইনস্টল হবে না — ইমেজ ছোট থাকে
# ⚠️ কিন্তু build-এর আগে এটি সেট করলে TypeScript/webpack-এর মতো
#    devDependency-নির্ভর বিল্ড টুলও অনুপস্থিত থাকবে — বিল্ড ব্যর্থ হবে

# Docker-এ সঠিক ক্রম:
# 1. npm ci (সব dependency সহ) → 2. npm run build → 3. npm prune --production</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক পরিবেশ (staging, QA) থাকলে শুধু <code>NODE_ENV</code> দিয়ে যথেষ্ট কি?</li>
        <li><code>NODE_ENV</code> কখনও runtime লজিকে (if-else) ব্যবহার করা উচিত কি?</li>
      </ul>
    `
  },
  {
    id: "node-46",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics","Diagnostic Channel","diagnostics_channel"],
    question: "node:diagnostics_channel দিয়ে ইন-মেমোরি পারফরম্যান্স মেট্রিক্স ট্র্যাকিং কীভাবে করবেন?",
    answer: `
      <p>এটি অ্যাপ্লিকেশনের বা থার্ডপার্টি মডিউলের অভ্যন্তরীণ ইভেন্ট সাবস্ক্রাইব করে পারফরম্যান্স টেলিমেট্রি ডাটা প্রমোট করতে সাহায্য করে, কোড পরিবর্তন ছাড়াই।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const diagnostics_channel = require('diagnostics_channel');

const channel = diagnostics_channel.channel('my-app:request:start');

// Subscriber
diagnostics_channel.subscribe('my-app:request:start', (message) => {
  console.log('Request started with ID:', message.requestId);
});

// Publisher
channel.publish({ requestId: 123 });</code></pre>
      </div>
    `
  },
  {
    id: "node-47",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Stream","Backpressure","highWaterMark"],
    question: "Stream highWaterMark Parameter (Default 64KB) টিউন করার কৌশল কী?",
    answer: `
      <p><code>highWaterMark</code> Node.js Stream-এর <strong>internal buffer সীমা</strong> — এটি ঠিক করে কতটুকু ডেটা মেমরিতে জমতে দেওয়া হবে backpressure ট্রিগার হওয়ার আগে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Readable stream — bytes হিসেবে (ডিফল্ট 64KB, object mode-এ 16 objects)
const readStream = fs.createReadStream('large.log', {
  highWaterMark: 1024 * 1024   // 1 MB চাঙ্কে পড়বে
});

// Object mode-এ সংখ্যাটি বাইট নয়, অবজেক্ট সংখ্যা বোঝায়
const objStream = new Readable({
  objectMode: true,
  highWaterMark: 100           // ১০০টি অবজেক্ট বাফারে জমতে পারে
});

// write() এর রিটার্ন ভ্যালু দেখেই backpressure বোঝা যায়
const canContinue = writeStream.write(chunk);
if (!canContinue) {
  await new Promise(resolve => writeStream.once('drain', resolve));
}</code></pre>
      </div>
      <h4>এটি "সর্বোচ্চ সীমা" নয় — একটি সংকেত থ্রেশহোল্ড</h4>
      <p>একটি সাধারণ ভুল ধারণা: <code>highWaterMark</code> ডেটা <em>আটকে দেয় না</em>। এটি কেবল সেই বিন্দু নির্ধারণ করে যেখানে <code>write()</code> <code>false</code> ফেরত দেয় — অর্থাৎ "লেখক থামো, আমি এখনও পার্শ্ববর্তী সব প্রসেস করিনি"। বাফার তার চেয়ে বেশি বাড়তে পারে যদি লেখক এই সংকেত উপেক্ষা করে লিখতে থাকে।</p>
      <h4>ছোট রাখলে বনাম বড় রাখলে</h4>
      <table>
        <tr><th>দিক</th><th>ছোট highWaterMark</th><th>বড় highWaterMark</th></tr>
        <tr><td>মেমরি ব্যবহার</td><td>কম</td><td>বেশি</td></tr>
        <tr><td>থ্রুপুট</td><td>কম (বেশি ইভেন্ট ওভারহেড)</td><td>বেশি (কম সিস্টেম কল)</td></tr>
        <tr><td>Backpressure সাড়া</td><td>দ্রুত (তাড়াতাড়ি সতর্ক করে)</td><td>ধীর</td></tr>
        <tr><td>উপযুক্ত</td><td>মেমরি-সীমিত পরিবেশ, বহু সমান্তরাল স্ট্রিম</td><td>বড় ফাইল, নেটওয়ার্ক-বাউন্ড কাজ</td></tr>
      </table>
      <h4>কখন টিউন করবেন</h4>
      <ul>
        <li><strong>বহু সমান্তরাল স্ট্রিম</strong> (যেমন হাজারো ফাইল আপলোড একসাথে) — ডিফল্ট ৬৪ KB × ১০০০ = ৬৪ MB শুধু বাফারেই। ছোট করে দিন।</li>
        <li><strong>একটি বিশাল ফাইল সিরিয়ালি প্রসেস করা</strong> — বড় highWaterMark মানে কম <code>data</code> ইভেন্ট, কম ওভারহেড, বেশি থ্রুপুট।</li>
        <li><strong>ধীর ডাউনস্ট্রিম কনজিউমার</strong> — ছোট রাখলে আপস্ট্রিম দ্রুত সতর্ক হয়ে গতি কমাবে, মেমরি চাপ কম হবে।</li>
      </ul>
      <p><strong>ব্যবহারিক নিয়ম:</strong> ডিফল্ট ৬৪ KB বেশিরভাগ ব্যবহারে ভালো ভারসাম্য। শুধু প্রোফাইল করে দেখার পরে (মেমরি চাপ বা থ্রুপুট সমস্যা প্রমাণিত হলে) এটি বদলান — অনুমান করে নয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Backpressure না সামলালে কী ঘটতে পারে?</li>
        <li><code>pipeline()</code> কীভাবে backpressure স্বয়ংক্রিয়ভাবে সামলায়?</li>
      </ul>
    `
  },
  {
    id: "node-48",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["WebSockets","ws","Heartbeat"],
    question: "ws library দিয়ে WebSockets Ping/Pong Heartbeat Mechanism এবং Dead Socket Cleanup কীভাবে করবেন?",
    answer: `
      <p>ক্লায়েন্ট হঠাৎ বন্ধ হয়ে গেলে সার্ভার তা টের নাও পেতে পারে (Half-open connection)। এই মরা সকেটগুলো (Dead sockets) ক্লিন করার জন্য নির্দিষ্ট সময় পর পর (যেমন- ৩০ সেকেন্ড) সার্ভার <code>ping</code> পাঠায়। সকেট থেকে <code>pong</code> না পাঠালে সেটিকে <code>terminate()</code> করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function heartbeat() { this.isAlive = true; }
wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);</code></pre>
      </div>
    `
  },
  {
    id: "node-49",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Utils","util.promisify","Custom Promisify"],
    question: "util.promisify() এবং custom promisify symbol (util.promisify.custom) কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>পুরোনো কলব্যাক-ভিত্তিক মেথডকে (<code>(err, data) => {}</code>) মডার্ন <code>async/await</code> মেথডে রূপান্তর করতে <code>util.promisify()</code> ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function readData() {
  const data = await readFile('file.txt', 'utf-8');
  console.log(data);
}</code></pre>
      </div>
      <p>যদি কলব্যাক সিগনেচার স্ট্যান্ডার্ড না হয়, তখন <code>util.promisify.custom</code> সিম্বল দিয়ে কাস্টম প্রমিজ রিটার্ন করানো যায়।</p>
    `
  },
  {
    id: "node-50",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Architecture","Event Driven","Decoupling"],
    question: "Node.js-এ Event-Driven Microservices Layer Architecture কীভাবে সংগঠিত করবেন?",
    answer: `
      <p>মাইক্রোসার্ভিসগুলোর মধ্যে সরাসরি HTTP কল (টাইট কাপলিং) এড়িয়ে NATS, RabbitMQ বা Kafka-এর মতো Message Broker ব্যবহার করে অ্যাসিনক্রোনাস ইভেন্ট পাবলিশ/সাবস্ক্রাইব করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Order Service (Publisher)
eventBus.publish('order.created', { orderId: 123 });

// Notification Service (Subscriber)
eventBus.subscribe('order.created', (orderData) => {
  sendEmail(orderData);
});</code></pre>
      </div>
      <p>এতে সিস্টেম সম্পূর্ণ ডিকাপলড (Decoupled) থাকে এবং একটি সার্ভিস ডাউন হলেও অন্যগুলো কাজ চালিয়ে যেতে পারে।</p>
    `
  }
];
