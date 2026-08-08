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
    tags: ["process.nextTick", "setImmediate", "setTimeout"],
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
    tags: ["Streams", "Backpressure", "Buffer"],
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
    tags: ["Buffer", "Binary Data", "Memory"],
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
    tags: ["Cluster", "IPC", "Multiprocessing"],
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
    tags: ["Worker Threads", "CPU Intensive", "Parallelism"],
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
    tags: ["EventEmitter", "Events", "Memory Leak"],
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
    tags: ["Error Handling", "UncaughtException", "Graceful Shutdown"],
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
    tags: ["V8 Flags", "Garbage Collection", "Memory Management"],
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
    tags: ["Security", "ReDoS", "Event Loop Blocking"],
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
      <p>Node.js 20.6.0 ভার্সন থেকে <code>dotenv</code> এর মতো থার্ড-পার্টি প্যাকেজ ছাড়াই নেটিভভাবে <code>.env</code> ফাইল লোড করা যায়। শুধু কমান্ড লাইনে <code>--env-file</code> ফ্ল্যাগ যুক্ত করলেই Node.js স্বয়ংক্রিয়ভাবে <code>process.env</code> ভ্যারিয়েবল লোড করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>node --env-file=.env app.js</code></pre>
      </div>
      <p>এটি অ্যাপ্লিকেশন স্টার্ট হওয়ার আগেই এনভায়রনমেন্ট ভেরিয়েবল লোড করে, ফলে কোডের কোথাও ডটেনভ কনফিগ কল করার প্রয়োজন হয় না।</p>
    `
  },
  {
    id: "node-14",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Networking","Keep-Alive","Sockets"],
    question: "Node.js HTTP Keep-Alive এবং socket reuse সুবিধা কী?",
    answer: `
      <p><code>http.Agent({ keepAlive: true })</code> সেটিংস ব্যবহার করলে প্রতিবার নতুন TCP হ্যান্ডশেক করার পরিবর্তে বিদ্যমান সকেট রিইউজ করা হয়। এতে ব্যাকএন্ড API কলের ল্যাটেন্সি অর্ধেকের বেশি কমে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const http = require('http');
const agent = new http.Agent({ keepAlive: true });

http.get({ hostname: 'example.com', agent }, (res) => {
  // TCP connection reused for subsequent requests
});</code></pre>
      </div>
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
      <p>উভয়ই DNS কুয়েরি করে কিন্তু ব্যাকগ্রাউন্ডে কাজ করার পদ্ধতি আলাদা।</p>
      <ul>
        <li><strong>dns.lookup():</strong> এটি অপারেটিং সিস্টেমের (OS) <code>getaddrinfo</code> ব্যবহার করে। এটি সিঙ্ক্রোনাস কাজ করে এবং Libuv থ্রেড পুলের একটি থ্রেড ব্লক করে রাখে। এটি ডিফল্ট DNS রেজলভার।</li>
        <li><strong>dns.resolve():</strong> এটি c-ares লাইব্রেরি ব্যবহার করে নন-ব্লকিং অ্যাসিনক্রোনাসভাবে কাজ করে। থ্রেড পুল ব্যবহার না করেই সরাসরি নেটওয়ার্ক কুয়েরি পাঠায়, তাই দ্রুত।</li>
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
      <p>Node.js-এ কোনো মডিউল প্রথমবার <code>require()</code> করা হলে তা <code>require.cache</code> অবজেক্টে ক্যাশ হয়ে যায়। দ্বিতীয়বার require করলে মডিউলটি আবার এক্সিকিউট না হয়ে ক্যাশ থেকেই রেজাল্ট দেয়।</p>
      <p>রানটাইমে কোনো মডিউল রিলোড করতে চাইলে ক্যাশ থেকে ডিলিট করতে হয়:</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>delete require.cache[require.resolve('./myModule')];
const reloadedModule = require('./myModule');</code></pre>
      </div>
    `
  },
  {
    id: "node-18",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Performance","Perf Hooks","Metrics"],
    question: "Node.js perf_hooks API দিয়ে কোডের ল্যাটেন্সি কীভাবে মাপবেন?",
    answer: `
      <p><code>perf_hooks</code> মডিউল ব্যবহার করে কোডের নির্দিষ্ট ব্লকের এক্সিকিউশন টাইম মাপা যায়। <code>performance.mark()</code> দিয়ে শুরু ও শেষ পয়েন্ট চিহ্নিত করে <code>performance.measure()</code> দিয়ে টাইম ক্যালকুলেট করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { performance } = require('perf_hooks');

performance.mark('start');
// Execute some code
for(let i=0; i<1000000; i++) {}
performance.mark('end');

performance.measure('Execution Time', 'start', 'end');
const measure = performance.getEntriesByName('Execution Time')[0];
console.log(measure.duration); // in milliseconds</code></pre>
      </div>
    `
  },
  {
    id: "node-19",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Debugging","Heapdump","Diagnostics"],
    question: "Node.js Diagnostic Reports (process.report) কী?",
    answer: `
      <p>প্রসেস ক্র্যাশ, মেমোরি লিক বা ইভেন্ট লুপ ব্লক হলে <code>process.report</code> দিয়ে একটি JSON ফরম্যাটে স্ন্যাপশট জেনারেট করা যায়। এতে OS মেমোরি, থ্রেড স্ট্যাক, ইভেন্ট লুপের অবস্থা ইত্যাদি থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Run with: node --report-on-fatalerror app.js
const report = process.report.getReport();
console.log(report.javascriptStack);</code></pre>
      </div>
    `
  },
  {
    id: "node-20",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["OS","Signals","Process"],
    question: "Node.js-এ SIGINT এবং SIGTERM সিগন্যাল কেন হ্যান্ডেল করা উচিত?",
    answer: `
      <p>সার্ভার বন্ধ করার সময় ডাটাবেজ কানেকশন বন্ধ ও পেন্ডিং জব শেষ করার জন্য এই সিগন্যালগুলো হ্যান্ডেল করা আবশ্যক।</p>
      <ul>
        <li><strong>SIGINT:</strong> সাধারণত <code>Ctrl+C</code> চাপলে এটি ট্রিগার হয়।</li>
        <li><strong>SIGTERM:</strong> কন্টেইনার (যেমন Docker/Kubernetes) বা PM2 গ্রেসফুলি শাটডাউন করার সময় এটি পাঠায়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});</code></pre>
      </div>
    `
  },
  {
    id: "node-21",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Async", "AsyncLocalStorage", "Tracing"],
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
    tags: ["Diagnostics", "Heap Dump", "v8"],
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
    tags: ["Security", "Graceful Shutdown", "SIGTERM"],
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
    tags: ["Streams", "Transform Stream", "pipeline"],
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
    tags: ["Process", "PM2", "Cluster"],
    question: "PM2 Process Manager (Cluster Mode, Reload vs Restart) কীভাবে নোড অ্যাপ স্কেল করে?",
    answer: `
      <p><code>pm2 start app.js -i max</code> দিয়ে সকল CPU কোরে প্রসেস স্পন করা হয় (Cluster Mode)। এটি লোড ব্যালেন্সিং করে।</p>
      <ul>
        <li><strong>Reload:</strong> <code>pm2 reload</code> জিরো-ডাউনটাইমে একে একে প্রসেস রিস্টার্ট করে, ফলে ইউজার এক্সপেরিয়েন্স ব্যাহত হয় না।</li>
        <li><strong>Restart:</strong> <code>pm2 restart</code> সব প্রসেস একসাথে কিল করে আবার চালু করে, যা সাময়িক ডাউনটাইম তৈরি করে।</li>
      </ul>
    `
  },
  {
    id: "node-26",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Rate Limiting"],
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
    tags: ["Performance", "Compression", "gzip"],
    question: "compression middleware (Gzip/Brotli) দিয়ে Node.js Response Payload সাশ্রয় কীভাবে করবেন?",
    answer: `
      <p>টেক্সট রেসপন্স (JSON/HTML) অন-দ্য-ফ্লাই সংকুচিত (Compress) করলে পেলোড সাইজ কমে যায়, ফলে ব্রাউজারে ট্রান্সফার স্পিড ৬০-৮০% পর্যন্ত উন্নত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const compression = require('compression');
app.use(compression()); // Enables Gzip/Brotli compression

app.get('/api/data', (req, res) => {
  res.json({ hugeData: "..." });
});</code></pre>
      </div>
    `
  },
  {
    id: "node-28",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Architecture", "Domain Driven", "Clean Architecture"],
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
    tags: ["Package", "pnpm", "npm"],
    question: "pnpm / yarn / npm Workspaces দিয়ে Monorepo Package Management কীভাবে পরিচালিত হয়?",
    answer: `
      <p>Monorepo-তে একাধিক প্যাকেজ একই রিপোজিটরিতে থাকে। <code>pnpm</code> কনটেন্ট-অ্যাড্রেসেবল স্টোরেজ ব্যবহার করে হার্ডলিংক তৈরি করে, যা ডিস্ক স্পেস প্রচুর বাঁচায়।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// package.json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["packages/*"]
}</code></pre>
      </div>
      <p>এর ফলে <code>packages</code> ফোল্ডারের ভেতরের সব প্যাকেজ একসাথে ইনস্টল ও লিংক করা হয়।</p>
    `
  },
  {
    id: "node-30",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Performance", "uv_threadpool_size", "libuv"],
    question: "UV_THREADPOOL_SIZE (Default 4) কীভাবে বাড়াবেন এবং এটি কোন কোন অপারেশনে প্রভাব ফেলে?",
    answer: `
      <p>Libuv থ্রেডপুল সাইজ ডিফল্ট ৪ থাকে। ভারী I/O বা ক্রিপ্টোগ্রাফিক অপারেশনের সমান্তরাল ক্ষমতা বাড়াতে এটি পরিবর্তন করা যায়। এটি ফাইল সিস্টেম (fs), DNS (<code>dns.lookup</code>), এবং Crypto (<code>crypto.pbkdf2</code>) কে প্রভাবিত করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>export UV_THREADPOOL_SIZE=128
node app.js</code></pre>
      </div>
    `
  },
  {
    id: "node-31",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Modules", "ESM", "package.json"],
    question: "Node.js-এ type: 'module' এবং .mjs vs .cjs ফাইল এক্সটেনশন ব্যবহারের সঠিক নিয়ম কী?",
    answer: `
      <p><code>package.json</code>-এ <code>"type": "module"</code> দিলে সব <code>.js</code> ফাইল ES Module (ESM) হিসেবে বিবেচিত হয় (<code>import/export</code>)। একই প্রজেক্টে CommonJS (<code>require</code>) ব্যবহার করতে হলে ফাইল এক্সটেনশন <code>.cjs</code> দিতে হবে।</p>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// package.json
{ "type": "module" }

// math.mjs or math.js (ESM)
export const add = (a, b) => a + b;

// utils.cjs (CommonJS)
const fs = require('fs');</code></pre>
      </div>
    `
  },
  {
    id: "node-32",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security", "REPL", "eval"],
    question: "Node.js-এ eval() এবং new Function() ব্যবহারের ভয়াবহ নিরাপত্তা ঝুঁকি কী?",
    answer: `
      <p>অ্যাটাকার যদি ইনপুটে কাস্টম কোড ইনজেক্ট করতে পারে (RCE - Remote Code Execution Attack), তবে সে <code>eval()</code> বা <code>new Function()</code> ব্যবহার করে সার্ভারের পুরো ফাইল সিস্টেম এবং ওএস এক্সেস করে ডিলিট বা লিক করে দিতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Dangerous!
const userInput = "require('child_process').exec('rm -rf /')";
eval(userInput); </code></pre>
      </div>
      <p>তাই ইউজার ইনপুট কখনো <code>eval()</code>-এ পাঠানো উচিত নয়।</p>
    `
  },
  {
    id: "node-33",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["HTTP", "http.Agent", "KeepAlive"],
    question: "http.Agent { keepAlive: true } ব্যাকএন্ড এপিআই কলের ল্যাটেন্সি কীভাবে কমায়?",
    answer: `
      <p>প্রতিটি আউটগোয়িং HTTP রিকুয়েস্টে নতুন TCP 3-way handshake (SYN, SYN-ACK, ACK) না করে পুরোনো সকেট কানেকশন রিইউজ করে ল্যাটেন্সি ৫০ms পর্যন্ত কমিয়ে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true, maxSockets: 50 });

const options = { hostname: 'api.example.com', agent: keepAliveAgent };
http.get(options, (res) => { /*...*/ });</code></pre>
      </div>
    `
  },
  {
    id: "node-34",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Testing", "node:test", "Mocking"],
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
    tags: ["FileSystem", "fs/promises", "fs.watch"],
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
    tags: ["Diagnostics", "perf_hooks", "PerformanceObserver"],
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
    tags: ["Crypto", "crypto.randomBytes", "UUID"],
    question: "crypto.randomBytes() vs Math.random() — কেন সিকিউরিটিতে Cryptographically Secure Pseudo-Random (CSPRNG) জরুরি?",
    answer: `
      <p><code>Math.random()</code> সাধারণ প্রেডিক্টেবল অ্যালগরিদম অনুসরণ করে, যা হ্যাক করা সম্ভব। তাই টোকেন বা পাসওয়ার্ড রিসেট লিংক তৈরিতে এটি নিরাপদ নয়। <code>crypto.randomBytes()</code> ওএস এনট্রপি (OS Entropy) রিড করে ক্রিপ্টোগ্রাফিকালি সিকিউর র্যান্ডম ডেটা তৈরি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const crypto = require('crypto');

// Secure token generation
const token = crypto.randomBytes(32).toString('hex');
console.log(token);</code></pre>
      </div>
    `
  },
  {
    id: "node-38",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Native", "N-API", "C++ Addons"],
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
    tags: ["Globals", "process.nextTick", "setImmediate"],
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
    tags: ["Security", "Policy", "Permission Model"],
    question: "Node.js Experimental Permission Model (--experimental-permission) দিয়ে ফাইল সিস্টেম এক্সেস কীভাবে লক ডাউন করবেন?",
    answer: `
      <p>Node.js 20+ এ Permission Model চালু করা হয়েছে। এটি অ্যাপ্লিকেশনকে নির্দিষ্ট ডিরেক্টরির বাইরে ফাইল রিড/রাইট বা স্পন করতে নিষেধ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>node --experimental-permission --allow-fs-read=/tmp --allow-fs-write=/tmp/app app.js</code></pre>
      </div>
      <p>এতে সিস্টেমের অন্যান্য ফাইল থেকে অ্যাপকে এক্সেস করা থেকে বিরত রাখা যায়, যা ম্যালওয়্যার প্রতিরোধে দারুণ কার্যকর।</p>
    `
  },
  {
    id: "node-41",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Process", "child_process.fork", "IPC"],
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
    tags: ["Security", "HTTPS", "TLS"],
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
    tags: ["Console", "console.time", "console.trace"],
    question: "console.time(), console.timeEnd(), এবং console.trace()-এর কাজের সুবিধা কী?",
    answer: `
      <p>ডিবাগিংয়ের জন্য এগুলো খুবই কার্যকর। <code>console.time</code> দিয়ে টাইমার চালু করে <code>console.timeEnd</code> দিয়ে কত সময় লেগেছে তা মাপা যায়। <code>console.trace</code> কল স্ট্যাক দেখায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>console.time('DB Query');
await db.fetchData();
console.timeEnd('DB Query'); // Output: DB Query: 125.23ms

function testFunc() {
  console.trace('Where am I?'); // Prints full stack trace
}</code></pre>
      </div>
    `
  },
  {
    id: "node-44",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Cluster", "Sticky Sessions", "Socket.io"],
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
    tags: ["Environment", "NODE_ENV", "Optimization"],
    question: "NODE_ENV=production দিলে Node.js অ্যান্ড এক্সপ্রেস অভ্যন্তরীণভাবে কী কী অপটিমাইজেশন অন করে?",
    answer: `
      <p><code>NODE_ENV=production</code> সেট করলে Express এবং V8 ইঞ্জিন পারফরম্যান্সের জন্য নিজেদের কনফিগার করে।</p>
      <ul>
        <li>Express ভিউ টেমপ্লেট ক্যাশিং অন করে।</li>
        <li>এরর স্ট্যাক ট্রেস ক্লায়েন্টকে পাঠানো হয় না (সিকিউরিটি)।</li>
        <li>V8 জাস্ট-ইন-টাইম (JIT) কম্পাইলেশন অপটিমাইজ করে, ডিবাগ কোড রিমুভ করে।</li>
        <li>CSS/JS মিনিফিকেশন ও রেসপন্স বাফারিং ফাস্ট হয়।</li>
      </ul>
    `
  },
  {
    id: "node-46",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics", "Diagnostic Channel", "diagnostics_channel"],
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
    tags: ["Stream", "Backpressure", "highWaterMark"],
    question: "Stream highWaterMark Parameter (Default 64KB) টিউন করার কৌশল কী?",
    answer: `
      <p><code>highWaterMark</code> হলো স্ট্রিম বাফারের সর্বোচ্চ সাইজ। বড় ফাইল বা ভিডিও প্রসেস করার সময় এটি টিউন করলে RAM সাশ্রয় ও থ্রুপুট ব্যালেন্স করা যায়।</p>
      <ul>
        <li><strong>কমানো:</strong> মেমোরি কম খরচ হবে কিন্তু I/O কল বাড়বে।</li>
        <li><strong>বাড়ানো:</strong> পারফরম্যান্স বাড়বে কিন্তু মেমোরি প্রেশার তৈরি হতে পারে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const readStream = fs.createReadStream('video.mp4', {
  highWaterMark: 1024 * 1024 // 1MB buffer
});</code></pre>
      </div>
    `
  },
  {
    id: "node-48",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["WebSockets", "ws", "Heartbeat"],
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
    tags: ["Utils", "util.promisify", "Custom Promisify"],
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
    tags: ["Architecture", "Event Driven", "Decoupling"],
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