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
,

  {
    id: "node-11",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Native","C++ Addons","N-API"],
    question: "Node.js-এ Node-API (N-API) এবং C++ Addons কী?",
    answer: `
<p>C/C++ দিয়ে তৈরি নেটিভ বাইনারি মডিউলকে Node.js-এ চালানোর ABI-stable API। ভারী গাণিতিক হিসাব বা নেটিভ সিটেম মেমোরি অ্যাক্সেসে এটি ব্যবহৃত হয়।</p>
    `
  },
  {
    id: "node-12",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security","Path Traversal","FS"],
    question: "Node.js path মডিউল ব্যবহারে Path Traversal সিকিউরিটি ঝুঁকি কী?",
    answer: `
<p>ইউজার ইনপুট ফিল্টার না করে সরাসরি ফাইল রিড করলে ডিরেক্টরি ট্রাভার্সাল হ্যাক হয়। সমাধান: <code>path.resolve</code> করে বেস ডিরেক্টরির সাথে মেলানো।</p>
    `
  },
  {
    id: "node-13",
    category: "Node.js",
    difficulty: "Beginner",
    tags: ["Config","Env","Node20"],
    question: "Node.js 20.6+ এর নেটিভ --env-file ফ্ল্যাগ কীভাবে কাজ করে?",
    answer: `
<p>dotenv প্যাকেজ ছাড়াই <code>node --env-file=.env app.js</code> চালালে Node.js স্বয়ংক্রিয়ভাবে <code>process.env</code> ভ্যারিয়েবল লোড করে।</p>
    `
  },
  {
    id: "node-14",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Networking","Keep-Alive","Sockets"],
    question: "Node.js HTTP Keep-Alive এবং socket reuse সুবিধা কী?",
    answer: `
<p><code>http.Agent({ keepAlive: true })</code> সেটিংস TCP handshakes বারবার না করে বিদ্যমান সকেট রিইউজ করে ল্যাটেন্সি অর্ধেকের বেশি কমায়।</p>
    `
  },
  {
    id: "node-15",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security","Crypto","Hashing"],
    question: "Node.js crypto module দিয়ে পাসওয়ার্ড হ্যশিং এবং এনক্রিপশন কীভাবে করবেন?",
    answer: `
<p><code>crypto.scrypt</code> দিয়ে নিরাপদ হ্যাশ এবং <code>crypto.createCipheriv('aes-256-gcm')</code> দিয়ে ফাইল এনক্রিপ্ট করা যায়।</p>
    `
  },
  {
    id: "node-16",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["DNS","Libuv","Threads"],
    question: "dns.lookup() এবং dns.resolve()-এর মধ্যে মূল পার্থক্য কী?",
    answer: `
<p><code>dns.lookup()</code> ওএসের getaddrinfo ব্যবহার করে Worker Thread ব্লক করে। <code>dns.resolve()</code> c-ares লাইব্রেরি দিয়ে নন-ব্লকিং অ্যাসিনক্রোনাস ডিএনএস কুয়েরি পাঠায়।</p>
    `
  },
  {
    id: "node-17",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Modules","Cache","Require"],
    question: "Node.js require.cache কীভাবে কাজ করে?",
    answer: `
<p>require করা ফাইল <code>require.cache</code> অবজেক্টে ক্যাশ হয়। ফাইল রিলোড করতে <code>delete require.cache[require.resolve('./module')]</code> করতে হয়।</p>
    `
  },
  {
    id: "node-18",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Performance","Perf Hooks","Metrics"],
    question: "Node.js perf_hooks API দিয়ে কোডের ল্যাটেন্সি কীভাবে মাপবেন?",
    answer: `
<p><code>performance.mark('start')</code> এবং <code>performance.mark('end')</code> দিয়ে <code>performance.measure()</code> করে ল্যাটেন্সি মাপা হয়।</p>
    `
  },
  {
    id: "node-19",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Debugging","Heapdump","Diagnostics"],
    question: "Node.js Diagnostic Reports (process.report) কী?",
    answer: `
<p>প্রসেস ক্র্যাশ বা হাই মেমোরিতে <code>process.report.getReport()</code> দিয়ে ওএস মেমোরি, থ্রেড স্ট্যাক এবং ইভেন্ট লুপের স্টেট স্ন্যাপশট জেনারেট করা হয়।</p>
    `
  },
  {
    id: "node-20",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["OS","Signals","Process"],
    question: "Node.js-এ SIGINT এবং SIGTERM সিগন্যাল কেন হ্যান্ডেল করা উচিত?",
    answer: `
<p>প্রসেস বন্ধের নোটিফিকেশন শুনে ডাটাবেজ সকেট বন্ধ ও পেন্ডিং জব শেষ করার জন্য <code>process.on('SIGTERM')</code> হ্যান্ডলার ব্যবহার করা আবশ্যক।</p>
    `
  },
  {
    id: "node-21",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Async", "AsyncLocalStorage", "Tracing"],
    question: "AsyncLocalStorage (async_hooks) কী এবং ডিস্ট্রিবিউটেড লগার বা রিকুয়েস্ট কনটেক্সট ট্র্যাকিংয়ে এটি কীভাবে কাজ করে?",
    answer: `
<p>Thread-local storage এর Node.js বিকল্প। কোনো ফাংশন প্যারামিটারে কন্টিনিউয়াস Trace ID না পাঠিয়ে সম্পূর্ণ Async Request Chain জুড়ে ভ্যারিয়েবল (e.g. Current User / Request ID) শেয়ার করতে সাহায্য করে।</p>
    `
  },
  {
    id: "node-22",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics", "Heap Dump", "v8"],
    question: "v8.getHeapSnapshot() এবং Chrome DevTools দিয়ে Node.js Memory Leak কীভাবে ডেবাগ করবেন?",
    answer: `
<p>প্রসেস চলাকালীন <code>v8.getHeapSnapshot()</code> চালিয়ে <code>.heapsnapshot</code> ফাইল জেনারেট করে Chrome DevTools Memory Tab-এ লোড করে Retained Size ও Detached DOM Node চেক করে মেমোরি লিকের মূল পয়েন্ট সনাক্ত করা।</p>
    `
  },
  {
    id: "node-23",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Security", "Graceful Shutdown", "SIGTERM"],
    question: "Node.js Application Graceful Shutdown (process.on('SIGTERM'), process.on('SIGINT')) কীভাবে বাস্তবায়ন করবেন?",
    answer: `
<p>নতুন রিকুয়েস্ট বন্ধ করা (<code>server.close()</code>), ডাটাবেজ কানেকশন পুল সুন্দরভাবে ড্রেন করা এবং রানিং জবগুলো শেষ করে <code>process.exit(0)</code> দিয়ে সার্ভার শাটডাউন করা।</p>
    `
  },
  {
    id: "node-24",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Streams", "Transform Stream", "pipeline"],
    question: "stream.pipeline() এবং stream.finished() ব্যবহার করে Stream Error & Memory Leak কীভাবে প্রতিরোধ করবেন?",
    answer: `
<p>সরাসরি <code>pipe()</code> করলে মাঝের স্ট্রিম ডাউন হলে এরর হ্যান্ডেল না হয়ে মেমোরি লিক হয়। <code>pipeline(rs, transform, ws, (err) => {})</code> সঠিক ক্লিনআপ নিশ্চিত করে।</p>
    `
  },
  {
    id: "node-25",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Process", "PM2", "Cluster"],
    question: "PM2 Process Manager (Cluster Mode, Reload vs Restart) কীভাবে নোড অ্যাপ স্কেল করে?",
    answer: `
<p><code>pm2 start app.js -i max</code> দিয়ে সকল CPU কোরে প্রসেস স্পন করা। <code>pm2 reload</code> জিরো-ডাউনটাইমে একে একে কন্টেইনার আপডেট রিফ্রেশ করে।</p>
    `
  },
  {
    id: "node-26",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Rate Limiting"],
    question: "Node.js Production Hardening: Helmet, Rate Limiting, HPP (HTTP Parameter Pollution) প্রতিরোধ বেস্ট প্র্যাকটিস কী?",
    answer: `
<p><code>helmet()</code> দিয়ে সিকিউর HTTP হেডার দেওয়া, <code>express-rate-limit</code> দিয়ে পার-আইপি রিকুয়েস্ট লিমিট করা এবং ডুপ্লিকেট কুয়েরি এড়াতে <code>hpp</code> মিডলওয়্যার ব্যবহার করা।</p>
    `
  },
  {
    id: "node-27",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Performance", "Compression", "gzip"],
    question: "compression middleware (Gzip/Brotli) দিয়ে Node.js Response Payload সাশ্রয় কীভাবে করবেন?",
    answer: `
<p>টেক্সট রেসপন্স (JSON/HTML) অন-দ্য-ফ্লাই সংকুচিত করে ব্রাউজারে ট্রান্সফার স্পিড ৬০-৮০% পর্যন্ত উন্নত করা।</p>
    `
  },
  {
    id: "node-28",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Architecture", "Domain Driven", "Clean Architecture"],
    question: "Clean Architecture in Node.js: Controllers, Use Cases, Repositories, Domain Entities কীভাবে সাজাবেন?",
    answer: `
<p>বিজনেস লজিককে এক্সপ্রেস বা ডাটাবেজ মডিউল থেকে সম্পূর্ণ স্বাধীন খাঁটি জাভাস্ক্রিপ্ট ক্লাসে রাখা। ইনফ্রাস্ট্রাকচার লেয়ারের মাধ্যমে সার্ভিস ডিআই (Dependency Injection) করা।</p>
    `
  },
  {
    id: "node-29",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Package", "pnpm", "npm"],
    question: "pnpm / yarn / npm Workspaces দিয়ে Monorepo Package Management কীভাবে পরিচালিত হয়?",
    answer: `
<p><code>pnpm</code> কনটেন্ট-অ্যাড্রেসেবল স্টোরেজ ব্যবহার করে হার্ডলিংক দিয়ে মেমোরি বাঁচায়। Workspaces দিয়ে একাধিক ইন্টারনাল প্যাকেজ একসাথে লিংক রাখা যায়।</p>
    `
  },
  {
    id: "node-30",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Performance", "uv_threadpool_size", "libuv"],
    question: "UV_THREADPOOL_SIZE (Default 4) কীভাবে বাড়াবেন এবং এটি কোন কোন অপারেশনে প্রভাব ফেলে?",
    answer: `
<p>libuv থ্রেডপুল ফাইল সিস্টেম (fs), ক্রিপ্টো (crypto.pbkdf2), এবং DNS অনুসন্ধানে ব্যবহৃত হয়। <code>process.env.UV_THREADPOOL_SIZE = 128</code> দিলে ব্লকিং অপারেশনের সমান্তরাল ক্ষমতা বাড়ে।</p>
    `
  },
  {
    id: "node-31",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Modules", "ESM", "package.json"],
    question: "Node.js-এ type: 'module' এবং .mjs vs .cjs ফাইল এক্সটেনশন ব্যবহারের সঠিক নিয়ম কী?",
    answer: `
<p><code>package.json</code>-এ <code>"type": "module"</code> দিলে সব <code>.js</code> ফাইল ES Module হিসেবে বিবেচিত হয়। তখন CommonJS ফাইলের জন্য <code>.cjs</code> এক্সটেনশন বাধ্যতামূলক করতে হয়।</p>
    `
  },
  {
    id: "node-32",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security", "REPL", "eval"],
    question: "Node.js-এ eval() এবং new Function() ব্যবহারের ভয়াবহ নিরাপত্তা ঝুঁকি কী?",
    answer: `
<p>অ্যাটাকার যদি ইনপুটে কাস্টম কোড ইনজেক্ট করতে পারে (RCE Attack), তবে সে <code>eval()</code> ব্যবহার করে সার্ভারের পুরো ফাইল সিস্টেম এবং ওএস এক্সেস করে ডিলিট বা লিক করে দিতে পারে।</p>
    `
  },
  {
    id: "node-33",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["HTTP", "http.Agent", "KeepAlive"],
    question: "http.Agent { keepAlive: true } ব্যাকএন্ড এপিআই কলের ল্যাটেন্সি কীভাবে কমায়?",
    answer: `
<p>প্রতিটি আউটগোয়িং HTTP রিকুয়েস্টে নতুন TCP 3-way handshake না করে পুরোনো সকেট কানেকশন রিইউজ করে ল্যাটেন্সি ৫০ms পর্যন্ত কমিয়ে দেয়।</p>
    `
  },
  {
    id: "node-34",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Testing", "node:test", "Mocking"],
    question: "Node.js Native Test Runner (node:test) এবং Mocking API (node:test/reporters) কীভাবে কাজ করে?",
    answer: `
<p>Node 18+ এ কোনো থার্ডপার্টি Jest/Mocha ছাড়াই নেটিভ <code>import test from 'node:test'</code> এবং <code>test.mock.fn()</code> ব্যবহার করে সুপারফাস্ট ইউনিট টেস্ট চালানো যায়।</p>
    `
  },
  {
    id: "node-35",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["FileSystem", "fs/promises", "fs.watch"],
    question: "fs.watch vs fs.watchFile এবং fs/promises ব্যবহারের আধুনিক সুবিধা কী?",
    answer: `
<p><code>fs/promises</code> অ্যাসিনক্রোনাস প্রমিস ড্রিভেন কোড নিশ্চিত করে। <code>fs.watch</code> ওএস নেটিভ ইভেন্ট লিসেনার ব্যবহার করায় <code>fs.watchFile</code> পোলিং মেথডের চেয়ে দ্রুত।</p>
    `
  },
  {
    id: "node-36",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics", "perf_hooks", "PerformanceObserver"],
    question: "node:perf_hooks এবং PerformanceObserver দিয়ে এন্ডপয়েন্টের ল্যাটেন্সি বেন্চমার্ক কীভাবে মেজার করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>const { performance, PerformanceObserver } = require('perf_hooks');
performance.mark('A');
// code execution
performance.mark('B');
performance.measure('A to B', 'A', 'B');</code></pre></div>
    `
  },
  {
    id: "node-37",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Crypto", "crypto.randomBytes", "UUID"],
    question: "crypto.randomBytes() vs Math.random() — কেন সিকিউরিটিতে Cryptographically Secure Pseudo-Random (CSPRNG) জরুরি?",
    answer: `
<p><code>Math.random()</code> প্রেডিক্টেবল অ্যালগরিদম অনুসরণ করে (Non-secure)। <code>crypto.randomBytes()</code> ওএস এনট্রপি রিড করে ক্রিপ্টোগ্রাফিকালি সিকিউর র্যান্ডম টোকেন ও পাসওয়ার্ড জেনারেট করে।</p>
    `
  },
  {
    id: "node-38",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Native", "N-API", "C++ Addons"],
    question: "Node-API (N-API) এবং C++ Addons দিয়ে অতি উচ্চ পারফরম্যান্সের নেটিভ মডিউল কীভাবে তৈরি করা হয়?",
    answer: `
<p>অত্যন্ত ভারী গাণিতিক বা ইমেজ প্রসেসিংয়ের কাজ C/C++ এ লিখে <code>N-API</code> ইন্টারফেসের মাধ্যমে Node.js V8 বিহাইন্ড দ্য সিন ইন্টিগ্রেট করা যাতে Node.js ভার্সন আপগ্রেডে কোড ব্রেক না করে।</p>
    `
  },
  {
    id: "node-39",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Globals", "process.nextTick", "setImmediate"],
    question: "process.nextTick vs setImmediate vs setTimeout(fn, 0) এর এক্সিকিউশন সিকুয়েন্স প্র্যাকটিকাল প্রমাণ কী?",
    answer: `
<ol><li><code>process.nextTick</code> (Microtask Phase এর শুরুতেই)</li><li><code>Promise.then</code> (Microtask Phase)</li><li><code>setTimeout 0</code> (Timers Phase)</li><li><code>setImmediate</code> (Check Phase)</li></ol>
    `
  },
  {
    id: "node-40",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security", "Policy", "Permission Model"],
    question: "Node.js Experimental Permission Model (--experimental-permission) দিয়ে ফাইল সিস্টেম এক্সেস কীভাবে লক ডাউন করবেন?",
    answer: `
<p><code>node --permission --allow-fs-read=/tmp app.js</code> দিলে নোড অ্যাপ ওই সুনির্দিষ্ট ডিরেক্টরি ছাড়া ওএস-এর অন্য কোনো ফাইল রিড বা রাইট করতে পারবে না।</p>
    `
  },
  {
    id: "node-41",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Process", "child_process.fork", "IPC"],
    question: "child_process.fork() এবং Inter-Process Communication (process.send) কীভাবে ব্যাকগ্রাউন্ড ভারী কাজ প্রসেস করে?",
    answer: `
<p>মেইন ইভেন্ট লুপ ব্লক না করে আলাদা Node.js V8 প্রসেস স্পন করে <code>process.send()</code> এবং <code>process.on('message')</code> দিয়ে তথ্য আদান-প্রদান করা।</p>
    `
  },
  {
    id: "node-42",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Security", "HTTPS", "TLS"],
    question: "tls.createServer() এবং ALPN (Application-Layer Protocol Negotiation) কনফিগারেশন কী?",
    answer: `
<p>SSL/TLS হ্যান্ডশেক করার সময় ক্লায়েন্ট ও সার্ভারের মধ্যে প্রোটোকল (e.g. HTTP/1.1 vs HTTP/2) নেগোশিয়েট করার প্রক্রিয়া।</p>
    `
  },
  {
    id: "node-43",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Console", "console.time", "console.trace"],
    question: "console.time(), console.timeEnd(), এবং console.trace()-এর কাজের সুবিধা কী?",
    answer: `
<p><code>console.time('DB')</code> ও <code>console.timeEnd('DB')</code> দিয়ে কোনো নির্দিষ্ট কোড ব্লকের এক্সিকিউশন টাইম মিলিসেকেন্ডে মাপা এবং <code>console.trace()</code> দিয়ে কল স্ট্যাক ট্র্যাকিং করা।</p>
    `
  },
  {
    id: "node-44",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Cluster", "Sticky Sessions", "Socket.io"],
    question: "Node.js Cluster Mode-এ Sticky Sessions (socket.io-sticky) কেন বাধ্যতামূলক?",
    answer: `
<p>সকেট কানেকশন হ্যান্ডশেক করার সময় একাধিক প্রসেসের মধ্যে র্যান্ডমলি ঘুরে গেলে সকেট এরর দেয়। Sticky Sessions ইউজারের IP অনুযায়ী একই Worker Process-এ রিকুয়েস্ট ফিক্স রাখে।</p>
    `
  },
  {
    id: "node-45",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Environment", "NODE_ENV", "Optimization"],
    question: "NODE_ENV=production দিলে Node.js অ্যান্ড এক্সপ্রেস অভ্যন্তরীণভাবে কী কী অপটিমাইজেশন অন করে?",
    answer: `
<p>ভিউ ক্যাশিং অন করা, CSS/JS মেনিফেস্ট সংকুচিত করা, স্ট্যাক ট্রেস হাইড করা এবং রেসপন্স বাফারিং ফাস্ট করা।</p>
    `
  },
  {
    id: "node-46",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Diagnostics", "Diagnostic Channel", "diagnostics_channel"],
    question: "node:diagnostics_channel দিয়ে ইন-মেমোরি পারফরম্যান্স মেট্রিক্স ট্র্যাকিং কীভাবে করবেন?",
    answer: `
<p>অ্যাপ্লিকেশনের বিভিন্ন লাইফসাইকেল বা থার্ডপার্টি মডিউলের অভ্যন্তরীণ ইভেন্ট সাবস্ক্রাইব করে পারফরম্যান্স টেলিমেট্রি ডাটা প্রমোট করা।</p>
    `
  },
  {
    id: "node-47",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Stream", "Backpressure", "highWaterMark"],
    question: "Stream highWaterMark Parameter (Default 64KB) টিউন করার কৌশল কী?",
    answer: `
<p>বড় ফাইল বা ভিডিও প্রসেস করার সময় <code>highWaterMark</code> কমিয়ে বা বাড়িয়ে RAM সাশ্রয় ও গিগাবিট নেটওয়ার্ক থ্রুপুট ব্যালেন্স করা।</p>
    `
  },
  {
    id: "node-48",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["WebSockets", "ws", "Heartbeat"],
    question: "ws library দিয়ে WebSockets Ping/Pong Heartbeat Mechanism এবং Dead Socket Cleanup কীভাবে করবেন?",
    answer: `
<p>নির্ধারিত সময় পর পর (e.g. 30s) সার্ভার <code>ping</code> পাঠাবে। সকেট <code>pong</code> না পাঠালে সেটিকে মরা সকেট (Dead socket) চিহ্নিত করে <code>terminate()</code> কল করা।</p>
    `
  },
  {
    id: "node-49",
    category: "Node.js",
    difficulty: "Intermediate",
    tags: ["Utils", "util.promisify", "Custom Promisify"],
    question: "util.promisify() এবং custom promisify symbol (util.promisify.custom) কীভাবে ব্যবহার করবেন?",
    answer: `
<p>পুরোনো Callback-style মেথডকে (<code>(err, data) => {}</code>) নিমেষেই modern Promise-based <code>async/await</code> মেথডে রূপান্তর করা।</p>
    `
  },
  {
    id: "node-50",
    category: "Node.js",
    difficulty: "Advanced",
    tags: ["Architecture", "Event Driven", "Decoupling"],
    question: "Node.js-এ Event-Driven Microservices Layer Architecture কীভাবে সংগঠিত করবেন?",
    answer: `
<p>সার্ভিসগুলোর সরাসরি এইচটিটিপি কল এড়িয়ে NATS/RabbitMQ মেসেজিং দিয়ে এসিনক্রোনাস ডিসকানেক্টেড সিস্টেম বজায় রাখা।</p>
    `
  }
];
