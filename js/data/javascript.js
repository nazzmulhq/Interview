const javascriptQuestions = [
  {
    id: "js-1",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Execution Context", "V8", "Hoisting"],
    question: "JavaScript-এ Execution Context এবং Global Execution Context কীভাবে কাজ করে?",
    answer: `
      <p><strong>Execution Context</strong> হলো এমন একটি এনভায়রনমেন্ট (Environment) বা পরিবেশ যেখানে JavaScript কোড অ্যাসেম্বল ও এক্সিকিউট (Execute) হয়। JS ইঞ্জিন যখনই কোনো কোড রান করে, তখন সে একটি Execution Context তৈরি করে।</p>
      <h4>Execution Context-এর প্রধানত ২টি অংশ থাকে:</h4>
      <ol>
        <li><strong>Memory Component (Creation Phase / Variable Environment):</strong> এখানে সব ভ্যারিয়েবল এবং ফাংশনগুলো <code>key: value</code> পেয়ার আকারে মেমোরিতে স্টোর হয়। কোড এক্সিকিউশনের আগেই ভ্যারিয়েবলগুলোকে <code>undefined</code> এবং ফাংশন বডি সম্পূর্ণ মেমোরিতে রাখা হয় (যাকে <strong>Hoisting</strong> বলা হয়)।</li>
        <li><strong>Code Component (Execution Phase / Thread of Execution):</strong> এখানে কোড এক লাইন এক লাইন করে থ্রেড অনুসারে রিড ও এক্সিকিউট করা হয়।</li>
      </ol>
      <h4>Execution Context-এর ৩টি ধরন:</h4>
      <ul>
        <li><strong>Global Execution Context (GEC):</strong> কোড যখন প্রথম রান হয়, তখন ডিফল্টভাবে GEC তৈরি হয়। এটি সম্পূর্ণ কোডফ্লোর মাদার কনটেক্সট। брауজার এনভায়রনমেন্টে এটি <code>window</code> অবজেক্ট তৈরি করে।</li>
        <li><strong>Function Execution Context (FEC):</strong> প্রতিবার কোনো ফাংশন কল (Invoke) করা হলে একটি নতুন FEC তৈরি হয়।</li>
        <li><strong>Eval Execution Context:</strong> <code>eval()</code> ফাংশনের মধ্যে থাকা কোডের জন্য।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>var a = 10;
function calculate(num) {
  var b = 20;
  return a + b + num;
}
var result = calculate(5); // FEC is created for calculate(5)</code></pre>
      </div>
    `
  },
  {
    id: "js-2",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop", "Microtask", "Macrotask"],
    question: "JavaScript-এর Event Loop, Call Stack, Microtask Queue এবং Macrotask Queue কীভাবে কাজ করে?",
    answer: `
      <p>JavaScript হলো একটি <strong>Single-threaded Synchronous</strong> ল্যাঙ্গুয়েজ, কিন্তু এটি Event Loop-এর সাহায্যে Non-blocking Asynchronous অপারেশন পরিচালনা করতে পারে।</p>
      <h4>মূল উপাদানসমূহ:</h4>
      <ul>
        <li><strong>Call Stack:</strong> যেখানে বর্তমানে এক্সিকিউট হওয়া ফাংশনগুলো LIFO (Last In First Out) নীতিতে জমা হয় ও সম্পন্ন হলে বের হয়।</li>
        <li><strong>Web APIs / C++ Bindings:</strong> <code>setTimeout</code>, <code>fetch</code>, DOM events ইত্যাদি ব্যাকগ্রাউন্ডে ব্রাউজার বা Node.js হ্যান্ডেল করে।</li>
        <li><strong>Microtask Queue:</strong> উচ্চ অগ্রাধিকারযুক্ত asynchronous কাজগুলো যেমন- <code>Promise.then/catch/finally</code>, <code>process.nextTick</code>, <code>queueMicrotask</code> এখানে জমা হয়।</li>
        <li><strong>Macrotask Queue (Task Queue):</strong> <code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code>, I/O অপারেশন এখানে জমা হয়।</li>
      </ul>
      <h4>Event Loop-এর কাজের নিয়ম (Priority order):</h4>
      <ol>
        <li>Call Stack খালি হওয়া পর্যন্ত অপেক্ষা করে।</li>
        <li>Call Stack খালি হলে, প্রথমে <strong>Microtask Queue</strong>-এর সকল টাস্ক একে একে কল স্ট্যাকে পাঠিয়ে এক্সিকিউট করে।</li>
        <li>Microtask Queue সম্পূর্ণ খালি হলে, <strong>Macrotask Queue</strong> থেকে একটিমাত্র টাস্ক কল স্ট্যাকে পাঠায়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>console.log('Start'); // 1. Call Stack (Synchronous)

setTimeout(() => console.log('Timeout'), 0); // Macrotask Queue

Promise.resolve().then(() => console.log('Promise')); // Microtask Queue

console.log('End'); // 2. Call Stack

// Output: Start -> End -> Promise -> Timeout</code></pre>
      </div>
    `
  },
  {
    id: "js-3",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Closure", "Scope", "Memory"],
    question: "Closure কী? এর প্র্যাকটিক্যাল ইউজ কেস এবং মেমোরি ইমপ্যাক্ট ব্যাখ্যা করুন।",
    answer: `
      <p><strong>Closure</strong> হলো একটি ফাংশন এবং তার সাথে সম্পৃক্ত <strong>Lexical Environment</strong>-এর সমন্বয়। সহজ কথায়, একটি ফাংশন যখন তার প্যারেন্ট (Outer) ফাংশনের স্কোপের ভ্যারিয়েবলগুলোকে প্যারেন্ট ফাংশন রিটার্ন হয়ে যাওয়ার পরও অ্যাক্সেস করতে পারে, সেটাই Closure।</p>
      <h4>প্র্যাকটিক্যাল ইউজ কেস (Practical Use Cases):</h4>
      <ol>
        <li><strong>Data Privacy / Private Variables (Module Pattern):</strong> এনক্যাপসুলেশন তৈরি করতে।</li>
        <li><strong>Function Currying:</strong> একটি ফাংশনকে আংশিক আর্গুমেন্ট দিয়ে রি-ইউজ করার জন্য।</li>
        <li><strong>Memoization / Caching:</strong> ব্যয়বহুল গণনার রেজাল্ট ক্যাশে ধরে রাখার জন্য।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function createCounter() {
  let count = 0; // Private Variable
  return {
    increment: function() { count++; return count; },
    decrement: function() { count--; return count; },
    getCount: function() { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount());  // 1 (count is not directly accessible)</code></pre>
      </div>
      <h4>মেমোরি ইমপ্যাক্ট (Memory Impact / Leak):</h4>
      <p>Closure বাইরের স্কোপের ভ্যারিয়েবলের রেফারেন্স বজায় রাখে। তাই Garbage Collector সেই ভ্যারিয়েবলগুলোকে মেমোরি থেকে মুছে ফেলতে পারে না। অসাবধানতাবশত অনেক বড় রেফারেন্স ধরে রাখলে <strong>Memory Leak</strong> হতে পারে।</p>
    `
  },
  {
    id: "js-4",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Hoisting", "let", "const", "var"],
    question: "Hoisting কী? var, let এবং const-এর ক্ষেত্রে Hoisting-এর পার্থক্য ও Temporal Dead Zone (TDZ) কী?",
    answer: `
      <p><strong>Hoisting</strong> হলো JavaScript-এর একটি প্রসেস যেখানে মেমোরি ক্রিয়েশন ফেজে ভ্যারিয়েবল এবং ফাংশন ডিক্লেয়ারেশনকে তাদের স্কোপের একদম উপরে নিয়ে নেওয়া হয়।</p>
      <h4>var vs let vs const:</h4>
      <ul>
        <li><code>var</code>: ডিক্লেয়ারেশনের সময় মেমোরিতে <code>undefined</code> ভ্যালু দিয়ে ইনিশিয়ালাইজ হয়। তাই ডিক্লেয়ারেশনের আগেই অ্যাক্সেস করলে <code>undefined</code> আউটপুট পাওয়া যায়।</li>
        <li><code>let</code> এবং <code>const</code>: এগুলোও Hoisted হয়, কিন্তু মেমোরিতে কোনো ভ্যালু দিয়ে ইনিশিয়ালাইজ হয় না। এগুলো <strong>Temporal Dead Zone (TDZ)</strong>-এ অবস্থান করে।</li>
      </ul>
      <h4>Temporal Dead Zone (TDZ):</h4>
      <p>স্কোপ শুরু হওয়া থেকে শুরু করে ভ্যারিয়েবলটি কোডে প্রকৃত ইনিশিয়ালাইজ (Initialization) হওয়া পর্যন্ত যে সময় বা অঞ্চল, তাকে <strong>TDZ</strong> বলে। এই সময়ে ভ্যারিয়েবল অ্যাক্সেস করতে গেলে <code>ReferenceError: Cannot access 'x' before initialization</code> দেখাবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>console.log(a); // Output: undefined
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;</code></pre>
      </div>
    `
  },
  {
    id: "js-5",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["this Keyword", "Call Apply Bind"],
    question: "JavaScript-এ 'this' কিওয়ার্ডের বাইন্ডিং রুলস (Binding Rules) এবং call(), apply(), bind()-এর ব্যবহার ব্যাখ্যা করুন।",
    answer: `
      <p>JavaScript-এ <code>this</code> এর ভ্যালু ফাংশনটি কোথায় ডিক্লেয়ার হয়েছে তার ওপর নির্ভর করে না, বরং <strong>ফাংশনটি কীভাবে কল (Invoked) করা হয়েছে</strong> তার ওপর নির্ভর করে।</p>
      <h4>this-এর ৫টি বাইন্ডিং রুল:</h4>
      <ol>
        <li><strong>Default Binding:</strong> প্লেইন ফাংশন কলে <code>this</code> গ্লোবাল অবজেক্ট (<code>window</code> বা strict mode-এ <code>undefined</code>) রেফার করে।</li>
        <li><strong>Implicit Binding:</strong> কোনো অবজেক্টের মেথড হিসেবে কল হলে (<code>obj.fn()</code>), <code>this</code> ডট ডট-এর বামের অবজেক্ট নির্দেশ করে।</li>
        <li><strong>Explicit Binding:</strong> <code>call()</code>, <code>apply()</code>, বা <code>bind()</code> দিয়ে ম্যানুয়ালি <code>this</code> সেট করা।</li>
        <li><strong>New Binding:</strong> <code>new</code> কন্সট্রাকটর ফাংশন দিয়ে কল করলে <code>this</code> নতুন সৃষ্ট ইনস্ট্যান্সকে পয়েন্ট করে।</li>
        <li><strong>Lexical Binding (Arrow Function):</strong> এর নিজস্ব <code>this</code> নেই। এর বাইরের প্যারেন্ট এনভায়রনমেন্ট থেকে <code>this</code> ইনহেরিট করে।</li>
      </ol>
      <h4>call, apply, bind-এর পার্থক্য:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const person = { name: 'Rahim' };
function greet(greeting, punctuation) {
  console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

// 1. call: সাথে সাথে এক্সিকিউট করে, আর্গুমেন্ট কমা দিয়ে নেয়
greet.call(person, 'Hello', '!'); // Hello, Rahim!

// 2. apply: সাথে সাথে এক্সিকিউট করে, আর্গুমেন্ট Array আকারে নেয়
greet.apply(person, ['Hi', '.']); // Hi, Rahim.

// 3. bind: সাথে সাথে এক্সিকিউট করে না, নতুন একটি ফাংশন রিটার্ন করে
const boundGreet = greet.bind(person, 'Welcome');
boundGreet('!'); // Welcome, Rahim!</code></pre>
      </div>
    `
  },
  {
    id: "js-6",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Prototype", "Inheritance", "ES6 Class"],
    question: "Prototypes এবং Prototype Chain কী? ES6 Class কীভাবে এর ব্যাকগ্রাউন্ডে কাজ করে?",
    answer: `
      <p>JavaScript হলো একটি <strong>Prototype-based Object Oriented</strong> ল্যাঙ্গুয়েজ। JS-এ প্রতিটি অবজেক্টের সাথে একটি হিডেন প্রপার্টি থাকে যাকে <code>[[Prototype]]</code> বা <code>__proto__</code> বলা হয়, যা আরেকটি অবজেক্টকে নির্দেশ করে।</p>
      <h4>Prototype Chain:</h4>
      <p>যখন কোনো অবজেক্টের কোনো প্রপার্টি বা মেথড খোঁজা হয়, JS ইঞ্জিন প্রথমে অবজেক্টের নিজস্ব প্রপার্টি চেক করে। না পেলে তার Prototype-এ খোঁজে, তারপর তার Prototype-এর Prototype-এ... এভাবে <code>null</code> না পাওয়া পর্যন্ত চেইন ধরে সার্চ করতে থাকে। একেই <strong>Prototype Chain</strong> বলে।</p>
      <h4>ES6 Class vs Prototypes:</h4>
      <p>ES6 Class কোনো নতুন অবজেক্ট ওরিয়েন্টেড মডেল নয়, এটি মূলত Prototypal Inheritance-এর ওপর তৈরি একটি <strong>Syntactic Sugar</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ES6 Class
class User {
  constructor(name) { this.name = name; }
  sayHi() { return \`Hi \${this.name}\`; }
}

// Background JS Engine Execution Equivalent:
function UserProto(name) {
  this.name = name;
}
UserProto.prototype.sayHi = function() {
  return \`Hi \${this.name}\`;
};</code></pre>
      </div>
    `
  },
  {
    id: "js-7",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Promises", "Async Await", "Error Handling"],
    question: "Promise-এর ৩টি স্টেট কী কী? Promise.all, Promise.allSettled, Promise.race এবং Promise.any-এর পার্থক্য কী?",
    answer: `
      <p><strong>Promise</strong> হলো একটি অবজেক্ট যা কোনো Asynchronous অপারেশনের চূড়ান্ত সাফল্য (Fulfillment) বা ব্যর্থতা (Rejection) এবং তার ভ্যালু প্রতিনিধিত্ব করে।</p>
      <h4>Promise-এর ৩টি স্টেট:</h4>
      <ul>
        <li><code>Pending</code>: প্রাথমিক অবস্থা, এখনো সম্পূর্ণ বা রিজেক্ট হয়নি।</li>
        <li><code>Fulfilled</code>: অপারেশন সফল এবং রেজাল্ট প্রস্তুত (resolved)।</li>
        <li><code>Rejected</code>: অপারেশন ব্যর্থ হয়েছে (errored)।</li>
      </ul>
      <h4>Promise Combinators-এর তুলনা:</h4>
      <ul>
        <li><strong>Promise.all([p1, p2]):</strong> সবগুলো প্রমিস Resolve হলে রেজাল্ট অ্যারে দেয়। <em>যেকোনো ১টি Reject হলেই পুরো Promise.all সঙ্গে সঙ্গে Reject হয়ে যায়।</em></li>
        <li><strong>Promise.allSettled([p1, p2]):</strong> সব প্রমিস সম্পূর্ণ হওয়া পর্যন্ত (সফল বা ব্যর্থ যাই হোক) অপেক্ষা করে এবং প্রতিটি প্রমিসের স্ট্যাটাস ও ভ্যালুর অবজেক্ট অ্যারে দেয়।</li>
        <li><strong>Promise.race([p1, p2]):</strong> সবার আগে যে প্রমিসটি নিষ্পত্তিকৃত (Resolve বা Reject) হবে, কেবল সেটির রেজাল্ট বা এরর রিটার্ন করবে।</li>
        <li><strong>Promise.any([p1, p2]):</strong> সবার আগে যে প্রমিসটি সফলভাবে Resolve হবে, সেটির ভ্যালু রিটার্ন করে। (সব Reject হলে AggregateError দেয়)।</li>
      </ul>
    `
  },
  {
    id: "js-8",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Performance", "Debounce", "Throttle"],
    question: "Debouncing এবং Throttling-এর মধ্যে পার্থক্য কী এবং কোন বাস্তব পরিস্থিতিতে কোনটি ব্যবহার করা উচিত?",
    answer: `
      <p>Debouncing এবং Throttling উভয়ই উচ্চ ফ্রিকোয়েন্সির (High-frequency) ইভেন্ট কলসমূহকে সীমিত (Rate-limit) করার টেকনিক, যা DOM Performance বাড়াতে ব্যবহার করা হয়।</p>
      <h4>Debouncing:</h4>
      <p>ব্যবহারকারী শেষবার ইভেন্ট ট্রিগার করার পর একটি নির্দিষ্ট সময় (Delay) বিরতি দিলে তবেই ফাংশন এক্সিকিউট হয়। এর মাঝে আবার ইভেন্ট ট্রিগার হলে টাইমার রিস্টার্ট হয়।</p>
      <p><em>ইউজ কেস:</em> Search Auto-complete Input, Window Resize Event.</p>
      <h4>Throttling:</h4>
      <p>ব্যবহারকারী যতবারই ইভেন্ট ট্রিগার করুক না কেন, একটি নির্দিষ্ট সময় পর পর (Fixed Interval) ফাংশনটি সর্বোচ্চ একবার এক্সিকিউট হবে।</p>
      <p><em>ইউজ কেস:</em> Infinite Scroll Pagination, Button Double Click Protection, Game Loop Movement.</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Debounce Implementation
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle Implementation
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}</code></pre>
      </div>
    `
  },
  {
    id: "js-9",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Memory Leak", "Garbage Collection", "WeakMap"],
    question: "JavaScript-এ Memory Leaks কী কী কারণে ঘটে এবং তা প্রতিরোধ করার উপায় কী?",
    answer: `
      <p><strong>Memory Leak</strong> ঘটে যখন অ্যাপ্লিকেশন দ্বারা কোনো মেমোরির আর প্রয়োজন থাকে না, কিন্তু V8 ইঞ্জিনের Garbage Collector (Mark-and-Sweep) সেই মেমোরি ফ্রি/রিলিজ করতে পারে না।</p>
      <h4>Memory Leak-এর প্রধান ৪টি কারণ:</h4>
      <ol>
        <li><strong>Accidental Global Variables:</strong> ডিক্লেয়ারেশন ছাড়া ভ্যারিয়েবল ব্যবহার (যেমন <code>x = 100</code>), যা <code>window</code> অবজেক্টে আটকে থাকে।</li>
        <li><strong>Forgotten Timers / Callbacks:</strong> <code>setInterval</code> বা Event Listeners যা রিমুভ (clean up) করা হয়নি।</li>
        <li><strong>Out of DOM References:</strong> DOM নোড ডিলেট করার পরও JavaScript অবজেক্টের ভেতরে তার রেফারেন্স রেখে দেওয়া।</li>
        <li><strong>Closures:</strong> ভুলবশত বড় অবজেক্টের রেফারেন্স প্যারেন্ট স্কোপের ক্লোজারে ধরে রাখা।</li>
      </ol>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li>সবসময় Strict Mode (<code>'use strict'</code>) ব্যবহার করা।</li>
        <li>কম্পোনেন্ট বা ভিউ আনমাউন্ট করার সময় Event Listener এবং Timer ক্লিয়ার করা।</li>
        <li>মেমোরি সংবেদনশীল ডেটা স্ট্রাকচারে <code>WeakMap</code> বা <code>WeakSet</code> ব্যবহার করা (যা Garbage Collector-কে Weak Reference দেয়)।</li>
      </ul>
    `
  },
  {
    id: "js-10",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Shallow Copy", "Deep Copy", "StructuredClone"],
    question: "Shallow Copy এবং Deep Copy-এর পার্থক্য কী? কীভাবে একটি অবজেক্টকে সঠিকভাবে Deep Copy করবেন?",
    answer: `
      <p>অবজেক্ট কপি করার সময় রেফারেন্স বনাম ভ্যালু কপি করার ধারণার ওপর এটি নির্ভর করে।</p>
      <h4>Shallow Copy:</h4>
      <p>শুধুমাত্র অবজেক্টের প্রথম লেভেলের (First-level) প্রপার্টি কপি করে। কোনো নেস্টেড অবজেক্ট থাকলে তার মেমোরি রেফারেন্স কপি হয়। ফলে নেস্টেড অবজেক্ট চেঞ্জ করলে মেইন অবজেক্টেও চেঞ্জ হয়ে যায়।</p>
      <p><em>উদাহরণ:</em> <code>Object.assign({}, obj)</code>, Spread Operator <code>{...obj}</code>.</p>
      <h4>Deep Copy:</h4>
      <p>অবজেক্টের সকল লেভেল এবং নেস্টেড স্ট্রাকচার সম্পূর্ণ নতুন মেমোরি লোকেশনে কপি করে।</p>
      <h4>Deep Copy করার উপায়সমূহ:</h4>
      <ol>
        <li><strong>structuredClone(obj):</strong> আধুনিক ব্রাউজার ও Node.js v17+ এর অফিশিয়াল নেটিভ API (সার্কুলার রেফারেন্সও হ্যান্ডেল করে)।</li>
        <li><strong>JSON.parse(JSON.stringify(obj)):</strong> সহজ উপায়, কিন্তু Function, Date, Undefined, Symbol, NaN হ্যান্ডেল করতে পারে না।</li>
        <li><strong>Lodash <code>_.cloneDeep(obj)</code>:</strong> প্রোডাকশন গ্রেড ইউনিভার্সাল সলিউশন।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const user = { name: 'Ali', details: { age: 25 } };

// Shallow Copy
const shallow = { ...user };
shallow.details.age = 30; // Modifies original user.details.age too!

// Modern Deep Copy (Native)
const deep = structuredClone(user);
deep.details.age = 40; // original user remain unchanged</code></pre>
      </div>
    `
  },
  {
    id: "js-11",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Event Delegation", "Bubbling", "Capturing"],
    question: "Event Bubbling, Event Capturing এবং Event Delegation কীভাবে কাজ করে?",
    answer: `
      <p>DOM Event Propagation এর তিনটি ধাপ রয়েছে: <strong>Capturing Phase</strong> (উপর থেকে নিচে), <strong>Target Phase</strong> (টার্গেট এলিমেন্ট), এবং <strong>Bubbling Phase</strong> (নিচ থেকে উপরে)।</p>
      <h4>Event Bubbling:</h4>
      <p>চাইল্ড এলিমেন্টে ইভেন্ট ট্রিগার হলে সেই ইভেন্টটি তার প্যারেন্ট, গ্র্যান্ডপ্যারেন্ট হয়ে DOM ট্রির একদম উপরে (window পর্যন্ত) বাবল আপ করে।</p>
      <h4>Event Delegation:</h4>
      <p>Event Bubbling-কে কাজে লাগিয়ে প্রতিটি চাইল্ড এলিমেন্টে আলাদা Event Listener না বসিয়ে, তাদের কমন প্যারেন্ট এলিমেন্টে ১টি মাত্র Event Listener বসানোর কৌশলকে <strong>Event Delegation</strong> বলে।</p>
      <h4>সুবিধা:</h4>
      <ul>
        <li>মেমোরি কনজাম্পশন বহুগুণ কমায় (হাজার হাজার টেবিল রো বা লিস্ট আইটেমের ক্ষেত্রে)।</li>
        <li>ডাইনামিকভাবে যুক্ত হওয়া নতুন চাইল্ড এলিমেন্টের জন্যও স্বয়ংক্রিয়ভাবে কাজ করে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Delegating event to parent <ul>
document.getElementById('parent-ul').addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'LI') {
    console.log('List item clicked:', e.target.innerText);
  }
});</code></pre>
      </div>
    `
  },
  {
    id: "js-12",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Proxy", "Reflect", "Metaprogramming"],
    question: "JavaScript-এ Proxy এবং Reflect অবজেক্টের কাজ কী? মেটাপ্রোগ্রামিংয়ে এর ব্যবহার কী?",
    answer: `
      <p><strong>Proxy</strong> হলো একটি অবজেক্ট যা অন্য কোনো অবজেক্টের মৌলিক অপারেশনগুলোকে (যেমন: Property Lookup, Assignment, Enumeration, Function Invocation) ইন্টারসেপ্ট (Intercept) এবং কাস্টমাইজ করতে ব্যবহৃত হয়।</p>
      <h4> Proxy-এর প্রধান ৩টি পার্ট:</h4>
      <ol>
        <li><code>Target</code>: মূল অবজেক্ট যা র‌্যাঙ্ক করা হচ্ছে।</li>
        <li><code>Handler</code>: একটি অবজেক্ট যাতে ট্র্যাপস (Traps) যেমন- <code>get</code>, <code>set</code>, <code>deleteProperty</code> থাকে।</li>
        <li><code>Trap</code>: অপারেশনে বাধা দেওয়ার মেথড।</li>
      </ol>
      <h4>Reflect API:</h4>
      <p>Reflect হলো ইন্টারসেপ্ট করা কাজগুলোকে তাদের ডিফল্ট নেটিভ বিহেভিয়ারে সম্পাদন করার জন্য প্রোভাইড করা একটি বিল্ট-ইন অবজেক্ট।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const target = { name: 'Sakib', age: 30 };
const handler = {
  get(target, prop, receiver) {
    console.log(\`Property '\${prop}' accessed\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    return Reflect.set(target, prop, value);
  }
};

const proxyUser = new Proxy(target, handler);
console.log(proxyUser.name); // Logs access and returns Sakib</code></pre>
      </div>
    `
  },
  {
    id: "js-13",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Map", "Set", "WeakMap", "WeakSet"],
    question: "Map vs Object এবং WeakMap vs Map-এর মধ্যে পার্থক্য ব্যাখ্যা করুন।",
    answer: `
      <p>JavaScript ES6-এ কী-ভ্যালু পেয়ার ও ইউনিক কালেকশনের জন্য নতুন ডেটা স্ট্রাকচার যুক্ত করা হয়েছে।</p>
      <h4>Map vs Object:</h4>
      <ul>
        <li><strong>Key Types:</strong> Object-এর কী শুধুমাত্র String বা Symbol হতে পারে। কিন্তু Map-এ যেকোনো ডেটা টাইপ (Object, Function, Number) কী হতে পারে।</li>
        <li><strong>Size:</strong> Map-এর সাইজ সহজেই <code>map.size</code> দিয়ে পাওয়া যায়, Object-এর ক্ষেত্রে ম্যানুয়ালি বের করতে হয়।</li>
        <li><strong>Order:</strong> Map কিগুলোর ইনসার্শন অর্ডার বজায় রাখে, Object-এ নির্দিষ্ট অর্ডার গ্যারান্টিড নয়।</li>
      </ul>
      <h4>WeakMap vs Map:</h4>
      <ul>
        <li>WeakMap-এর কী অবশ্যই একটি <strong>Object</strong> হতে হবে (Primitive নেওয়া যাবে না)।</li>
        <li>WeakMap-এর অবজেক্ট কী-গুলো <strong>Weakly Held</strong> থাকে। অর্থাৎ মূল অবজেক্টের ওপর অন্য কোনো রেফারেন্স না থাকলে Garbage Collector সেই কী এবং ভ্যালুকে মেমোরি থেকে মুছে ফেলে।</li>
        <li>WeakMap-এ <code>size</code> প্রপার্টি নেই এবং এটি Iteration (for..of) করা যায় না।</li>
      </ul>
    `
  },
  {
    id: "js-14",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["Equality", "Coercion"],
    question: "== (Loose Equality) এবং === (Strict Equality)-এর মধ্যে পার্থক্য কী? Type Coercion কীভাবে কাজ করে?",
    answer: `
      <p><strong>== (Double Equals):</strong> এটি ডাল ভ্যালু কম্পেয়ার করার আগে স্বয়ংক্রিয়ভাবে টাইপ কনভার্সন বা <strong>Type Coercion</strong> ঘটায়।</p>
      <p><strong>=== (Triple Equals):</strong> এটি কোনো Type Coercion ঘটায় না। এটি টাইপ এবং ভ্যালু উভয়ই একই কিনা যাচাই করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>console.log(5 == '5');  // true (String '5' is coerced to Number 5)
console.log(5 === '5'); // false (Different types: Number vs String)

console.log(null == undefined);  // true
console.log(null === undefined); // false</code></pre>
      </div>
      <p>সবসময় কোডে <strong>=== (Strict Equality)</strong> ব্যবহার করা সেরা প্র্যাকটিস।</p>
    `
  },
  {
    id: "js-15",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Generator", "Iterator", "Yield"],
    question: "Generator Function কী? function* এবং yield কীভাবে কাজ করে?",
    answer: `
      <p><strong>Generator Function</strong> হলো একটি বিশেষ ধরনের ফাংশন যাকে মাঝপথে থামিয়ে রাখা (Pause) এবং পরবর্তীতে আবার যেখান থেকে থামা হয়েছিল সেখান থেকে পুনরায় চালানো (Resume) যায়।</p>
      <p>Generator ডিক্লেয়ার করার জন্য <code>function*</code> সিনট্যাক্স এবং এক্সিকিউশন পজ করার জন্য <code>yield</code> কিওয়ার্ড ব্যবহৃত হয়। Generator ফাংশন কল করলে একটি <strong>Iterator Object</strong> রিটার্ন করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }</code></pre>
      </div>
      <p><em>ব্যবহার:</em> অসীম ডেটা স্ট্রিম (Infinite Data Streams), Asynchronous Control Flow, Custom Iterators তৈরি।</p>
    `
  },
  {
    id: "js-16",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Currying", "Functional Programming"],
    question: "Function Currying কী এবং এর প্র্যাকটিক্যাল সুবিধা কী?",
    answer: `
      <p><strong>Currying</strong> হলো একটি ফাংশনাল প্রোগ্রামিং টেকনিক, যেখানে একটি বহুমাত্রিক আর্গুমেন্ট গ্রহণকারী ফাংশনকে ভেঙে একাধিক একক-আর্গুমেন্ট গ্রহণকারী ফাংশনের চেইনে রূপান্তর করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Normal Function
function add(a, b, c) { return a + b + c; }

// Curried Function
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
// Arrow Function syntax
const curriedAddArrow = a => b => c => a + b + c;

console.log(curriedAdd(1)(2)(3)); // 6</code></pre>
      </div>
      <h4>সুবিধা:</h4>
      <ul>
        <li><strong>Reusability (Higher Order Function):</strong> আংশিক আর্গুমেন্ট দিয়ে নির্দিষ্ট কাজের জন্য রি-ইউজেবল মেথড বানানো যায় (যেমন Logger বা Tax Calculator)।</li>
        <li>কোড মডুলারিটি বৃদ্ধি করে।</li>
      </ul>
    `
  },
  {
    id: "js-17",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Modules", "ESM", "CommonJS"],
    question: "ES Modules (ESM) এবং CommonJS (CJS)-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p>JavaScript-এ মডিউল সিস্টেম কোডকে মডুলার এবং রি-ইউজেবল করতে ব্যবহৃত হয়।</p>
      <h4>পার্থক্যসমূহ:</h4>
      <ul>
        <li><strong>Syntax:</strong> CommonJS ব্যবহার করে <code>require()</code> এবং <code>module.exports</code>। ES Modules ব্যবহার করে <code>import</code> এবং <code>export</code>।</li>
        <li><strong>Loading Mode:</strong> CommonJS হলো <strong>Synchronous & Dynamic</strong> (কোডের যেকোনো জায়গায় Conditionally require করা যায়)। ESM হলো <strong>Asynchronous & Static</strong> (ফাইল টপে পার্স টাইমেই অ্যালাইজ হয়)।</li>
        <li><strong>Tree Shaking:</strong> ESM স্ট্যাটিক হওয়ার কারণে বিল্ড টুলগুলো (Webpack/Vite) অব্যবহৃত কোড বাদ বা Tree Shaking করতে পারে। CommonJS-এ Tree Shaking কষ্টসাধ্য।</li>
        <li><strong>Top-level Await:</strong> ESM-এ Top-level await সাপোর্ট করে, CJS-এ করে না।</li>
      </ul>
    `
  },
  {
    id: "js-18",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["ES6", "Destructuring", "Rest Spread"],
    question: "Rest Parameter এবং Spread Operator-এর মধ্যে পার্থক্য উদাহরণসহ বুঝিয়ে বলুন।",
    answer: `
      <p>উভয়ই ট্রিপল ডট <code>...</code> সিনট্যাক্স ব্যবহার করলেও কাজের দিক থেকে সম্পূর্ণ বিপরীত।</p>
      <h4>Rest Parameter:</h4>
      <p>ফাংশনের সংজ্ঞায় (Function Parameters) অবশিষ্ট আর্গুমেন্টগুলোকে একত্রে গুটিয়ে একটি অ্যারেতে পরিণত করে।</p>
      <h4>Spread Operator:</h4>
      <p>একটি অ্যারে বা অবজেক্টকে ছড়িয়ে (Unpack / Expand) তার উপাদানগুলোকে আলাদা করে ফেলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Rest Parameter (Gathers items)
function sum(first, ...others) {
  return first + others.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(10, 20, 30, 40)); // first = 10, others = [20, 30, 40]

// Spread Operator (Expands items)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]</code></pre>
      </div>
    `
  },
  {
    id: "js-19",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Symbol", "Primitive Data Types"],
    question: "JavaScript-এ Symbol কী এবং এটি কেন ব্যবহার করা হয়?",
    answer: `
      <p><strong>Symbol</strong> হলো ES6-এ প্রবর্তিত একটি Primitive Data Type। প্রতিটি তৈরি হওয়া Symbol মান সম্পূর্ণ <strong>Unique & Immutable</strong> (অনন্য এবং অপরিবর্তনযোগ্য)।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false!</code></pre>
      </div>
      <h4>ব্যবহার:</h4>
      <ul>
        <li><strong>Private / Hidden Object Properties:</strong> অবজেক্টে এমন প্রপার্টি কী তৈরি করতে যা অন্য কোনো কোডের সাথে কলিশন (Name Collision) করবে না এবং <code>for..in</code> বা <code>Object.keys()</code> লুপে ধরা পড়বে না।</li>
        <li><strong>Well-Known Symbols:</strong> JS নেটিভ মেথড মেটা-কাস্টমাইজ করতে (যেমন <code>Symbol.iterator</code>)।</li>
      </ul>
    `
  },
  {
    id: "js-20",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["V8 Engine", "JIT Compiler", "Optimization"],
    question: "V8 Engine কীভাবে JavaScript কোড কম্পাইল ও এক্সিকিউট করে? (Ignition & TurboFan)",
    answer: `
      <p>Google V8 Engine হলো একটি হাই-পারফরম্যান্স ওপেন সোর্স C++ ভিত্তিক JavaScript ও WebAssembly ইঞ্জিন।</p>
      <h4>V8 এক্সিকিউশন পাইপলাইন:</h4>
      <ol>
        <li><strong>Parser:</strong> সোর্স কোড রিড করে <strong>Abstract Syntax Tree (AST)</strong> তৈরি করে।</li>
        <li><strong>Ignition (Interpreter):</strong> AST থেকে দ্রুত Bytecode জেনারেট করে এবং রান করতে শুরু করে। এটি রান-টাইম প্রোফাইলিং ডেটা সংগ্রহ করে (Hot Code চিহ্নিত করার জন্য)।</li>
        <li><strong>TurboFan (JIT Compiler):</strong> যে কোড বারবার রান হয় (যেমন লুপের ভেতরের কোড বা হট ফাংশন), TurboFan সেগুলোকে সরাসরি অপ্টিমাইজড <strong>Machine Code</strong>-এ রূপান্তর করে।</li>
        <li><strong>Deoptimization:</strong> যদি কোনো ভ্যারিয়েবলের টাইপ হঠাৎ বদলে যায় (Dynamic typing distortion), TurboFan অপ্টিমাইজড কোড বাতিল করে আবার Ignition Bytecode-এ ফিরে যায়।</li>
      </ol>
    `
  }
,

  {
    id: "js-21",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Service Worker","PWA","Web API"],
    question: "Service Worker কী? Progressive Web App (PWA)-এ Offline Caching এবং Push Notification কীভাবে কাজ করে?",
    answer: `
<p><strong>Service Worker</strong> হলো এমন একটি বিশেষ ব্রাউজার স্ক্রিপ্ট যা ব্যাকগ্রাউন্ডে ব্রাউজারের মেইন থ্রেড এবং নেটওয়ার্কের মাঝামাঝি প্রক্সি (Proxy) হিসেবে কাজ করে। এটি সরাসরি DOM এক্সেস করতে পারে না, তবে নেটওয়ার্ক রিকুয়েস্ট ইন্টারসেপ্ট করতে পারে।</p>
    <h4>প্রধান ফিচারসমূহ:</h4>
    <ul>
      <li><strong>Offline Capability:</strong> <code>CacheStorage</code> API ব্যবহার করে অ্যাসেট ও API রেসপন্স ক্যাশ করে অফলাইনে অ্যাপ সচল রাখে।</li>
      <li><strong>Background Sync:</strong> ইউজার অফলাইনে থাকলেও নেটওয়ার্ক ফিরে আসলে ডেটা সিঙ্ক সম্পন্ন করে।</li>
      <li><strong>Push Notifications:</strong> অ্যাপ বন্ধ থাকলেও ব্রাউজার পুশ নোটিফিকেশন পাঠাতে পারে।</li>
    </ul>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW Registered!', reg))
    .catch(err => console.error('SW Registration Failed!', err));
}</code></pre>
    </div>
    `
  },
  {
    id: "js-22",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Engine","Recursion","TCO"],
    question: "Tail Call Optimization (TCO) কী? রিকারসিভ ফাংশনে এটি কীভাবে Call Stack Overflow প্রতিরোধ করে?",
    answer: `
<p><strong>Tail Call Optimization (TCO)</strong> হলো এমন একটি কম্পাইলার অপটিমাইজেশন কৌশল যেখানে ফাংশনের শেষ এক্সিকিউটেবল স্টেটমেন্ট যদি অন্য কোনো ফাংশন কল (বা নিজে রিকারসিভ কল) হয়, তবে নতুন Call Stack Frame তৈরি না করে বিদ্যমান ফ্রেম পুনঃব্যবহার করা হয়।</p>
    <h4>সুবিধা:</h4>
    <p>সাধারণ রিকারশনে প্রতি কলে স্ট্যাক তৈরি হয়ে <code>Maximum call stack size exceeded</code> এরর ঘটে। TCO প্রয়োগে এটি Constant Space O(1) স্ট্যাকে রান করে।</p>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>// Non-Tail Recursive (Stack grows O(n))
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Tail Recursive (TCO candidate O(1))
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
}</code></pre>
    </div>
    `
  },
  {
    id: "js-23",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["ES6+","Operators","Syntax"],
    question: "Optional Chaining (?.) এবং Nullish Coalescing Operator (??) কীভাবে কাজ করে? Logical OR (||) এর সাথে ?? এর পার্থক্য কী?",
    answer: `
<p><strong>Optional Chaining (<code>?.</code>):</strong> কোনো অবজেক্টের ডিপলি নেস্টেড প্রপার্টি রিড করার সময় যদি মাঝের কোনো প্রপার্টি <code>null</code> বা <code>undefined</code> হয়, তবে <code>TypeError</code> না দিয়ে <code>undefined</code> রিটার্ন করে।</p>
    <p><strong>Nullish Coalescing (<code>??</code>):</strong> এটি কেবল বামের অপারেন্ডটি <code>null</code> অথবা <code>undefined</code> হলেই ডানের ভ্যালু রিটার্ন করে।</p>
    <h4><code>||</code> (Logical OR) vs <code>??</code>:</h4>
    <p><code>||</code> যেকোনো Falsy ভ্যালুর জন্য (যেমন: <code>0</code>, <code>""</code>, <code>false</code>) ডানের ভ্যালু রিটার্ন করে। <code>??</code> কেবল <code>null</code> ও <code>undefined</code> কে চেক করে।</p>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>const user = { profile: { name: "Nazmul", score: 0 } };
console.log(user?.profile?.name); // "Nazmul"
const score1 = user.profile.score || 100; // 100 (wrong because 0 is falsy)
const score2 = user.profile.score ?? 100; // 0 (correct!)</code></pre>
    </div>
    `
  },
  {
    id: "js-24",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["Types","BigInt","Numbers"],
    question: "JavaScript-এ Number precision সমস্যা (যেমন: 0.1 + 0.2 !== 0.3) কেন ঘটে এবং BigInt কখন ব্যবহার করা উচিত?",
    answer: `
<p>JavaScript-এ সকল সাধারণ সংখ্যা <strong>IEEE 754 Floating-Point Standard (64-bit double precision)</strong> মেনে সংরক্ষিত হয়। এতে বাইনারি ফরম্যাটে <code>0.1</code> এবং <code>0.2</code> এর সঠিক রূপান্তর বজায় রাখা সম্ভব হয় না, যার ফলে ফ্র্যাকশনাল প্রিসিশন লস ঘটে।</p>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON); // true
const bigNum = 9007199254740991n + 2n; // 9007199254740993n</code></pre>
    </div>
    `
  },
  {
    id: "js-25",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Arrays","ES6+","Methods"],
    question: "Array.prototype.flat() এবং flatMap() মেথড দুটি কীভাবে কাজ করে?",
    answer: `
<p><strong><code>flat(depth)</code>:</strong> এটি নেস্টেড অ্যারের সাব-অ্যারেগুলোকে নির্দিষ্ট গভীরতা (depth) পর্যন্ত সমতল (flatten) করে নতুন একটি অ্যারে তৈরি করে।</p>
    <p><strong><code>flatMap(callback)</code>:</strong> এটি প্রথমে প্রতিটি এলিমেন্টে <code>map()</code> চালায় এবং তারপর রেজাল্টকে ১ লেভেল <code>flat()</code> করে।</p>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>const nested = [1, [2, [3, 4]]];
console.log(nested.flat(2)); // [1, 2, 3, 4]
const words = ["Hello World", "JS Tips"].flatMap(str => str.split(" "));
console.log(words); // ["Hello", "World", "JS", "Tips"]</code></pre>
    </div>
    `
  },
  {
    id: "js-26",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["ES6+","Intl","Localization"],
    question: "JavaScript Intl (Internationalization) API কী?",
    answer: `
<p><strong>Intl</strong> হলো JavaScript-এর বিল্ট-ইন নেটিভ নেমস্পেস যা আন্তর্জাতিকীকরণ ও স্থানিকীকরণের (Localization & Formatting) কাজগুলো ব্রাউজার স্তরে থার্ড-পার্টি লাইব্রেরি ছাড়াই সম্পাদন করতে সাহায্য করে।</p>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>const priceFormatter = new Intl.NumberFormat("bn-BD", { style: "currency", currency: "BDT" });
console.log(priceFormatter.format(5000)); // ৳৫,০০০.০০
const dateFormatter = new Intl.DateTimeFormat("bn-BD", { dateStyle: "full" });
console.log(dateFormatter.format(new Date()));</code></pre>
    </div>
    `
  },
  {
    id: "js-27",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["DOM","Web Components","Shadow DOM"],
    question: "Web Components কী? Custom Elements এবং Shadow DOM কীভাবে কাজ করে?",
    answer: `
<p><strong>Web Components</strong> হলো ব্রাউজারের নেটিভ W3C স্ট্যান্ডার্ডের সেট যার সাহায্যে React বা Vue ছাড়াই রিইউজেবল, এনক্যাপসুলেটেড HTML ট্যাগ তৈরি করা যায়।</p>
    <div class="code-box">
      <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
      <pre><code>class MyButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button style="background:purple;color:white;"><slot></slot></button>';
  }
}
customElements.define('my-button', MyButton);</code></pre>
    </div>
    `
  },
  {
    id: "js-28",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Objects","Memory","API"],
    question: "structuredClone() API কী? JSON.parse(JSON.stringify()) এর সাথে এর পার্থক্য কী?",
    answer: `
<p><strong>structuredClone()</strong> হলো আধুনিক ব্রাউজার ও Node.js (v17+) এর অফিশিয়াল নেটিভ ডিপ ক্লোনিং API।</p>
    <p><code>JSON.stringify</code> ডাটাটাইপ যেমন: <code>Date</code> কে স্ট্রিং বানিয়ে ফেলে এবং <code>Set</code>, <code>Map</code>, <code>RegExp</code> বাদ দেয়। <code>structuredClone()</code> নেটিভভাবে এসব টাইপ এবং Circular Reference ক্লোন করতে পারে।</p>
    `
  },
  {
    id: "js-29",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop","Microtask","Macrotask"],
    question: "queueMicrotask, requestAnimationFrame এবং setTimeout-এর মধ্যে এক্সিকিউশন অর্ডার কী?",
    answer: `
<p>Event Loop অগ্রাধিকারের ক্রম: Synchronous Code -> Microtask Queue (Promise, queueMicrotask) -> Render Queue (requestAnimationFrame) -> Macrotask Queue (setTimeout, setInterval)।</p>
    `
  },
  {
    id: "js-30",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Performance", "Memory", "Garbage Collection"],
    question: "JavaScript Garbage Collection Algorithms (Mark-and-Sweep, Generational GC, Scavenge vs Mark-Sweep-Compact) কীভাবে কাজ করে?",
    answer: `
<p>V8 ইঞ্জিনে মেমোরি ২ ভাগে বিভক্ত: <strong>Young Generation</strong> (Nursery & Intermediate) এবং <strong>Old Generation</strong>।</p><ul><li><strong>Scavenge Algorithm:</strong> ছোট ও নতুন অবজেক্ট দ্রুত প্রসেস করে (Cheney's Copying Algorithm)।</li><li><strong>Mark-Sweep-Compact:</strong> পুরানো মেমোরি লিক পরিষ্কার করতে পুরো অবজেক্ট গ্রাফ ট্রাভার্স করে অব্যবহৃত পয়েন্টার ডিসকার্ড করে।</li></ul>
    `
  },
  {
    id: "js-31",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Async", "Iterators", "Generators"],
    question: "Async Iterators এবং Async Generators (Symbol.asyncIterator, for await...of) কীভাবে স্ট্রিম প্রসেস করে?",
    answer: `
<p><code>Symbol.asyncIterator</code> মেথড একটি অবজেক্ট রিটার্ন করে যা <code>next()</code> কল করলে প্রমিস (Promise) রিটার্ন করে। এটি নেটওয়ার্ক স্ট্রিম বা বড় ডাটা ফাইল চাংক হিসেবে প্রসেস করতে সাহায্য করে।</p><div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>async function* fetchPages() {
  yield await fetch('/page1').then(r => r.json());
  yield await fetch('/page2').then(r => r.json());
}
for await (const page of fetchPages()) { console.log(page); }</code></pre></div>
    `
  },
  {
    id: "js-32",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Metaprogramming", "Proxy", "Reflect"],
    question: "JavaScript Proxy and Reflect API দিয়ে Validation, Data Binding এবং Negative Array Indexing কীভাবে বাস্তবায়ন করবেন?",
    answer: `
<p><code>Proxy</code> অবজেক্টের মূল আচরণ (Get, Set, Delete) ইন্টারসেপ্ট করে। <code>Reflect</code> অবজেক্টের ডিফল্ট মেথড সেফলি বজায় রাখে।</p><div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>const arr = [10, 20, 30];
const proxyArr = new Proxy(arr, {
  get(target, prop) {
    const index = Number(prop);
    if (index < 0) return target[target.length + index];
    return Reflect.get(...arguments);
  }
});
console.log(proxyArr[-1]); // 30</code></pre></div>
    `
  },
  {
    id: "js-33",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["WebAssembly", "Wasm", "Performance"],
    question: "WebAssembly (Wasm) কী এবং JavaScript-এর সাথে WebAssembly.instantiateStreaming কীভাবে কাজ করে?",
    answer: `
<p>WebAssembly হলো একটি বাইনারি প্রোটোকল যা C/C++/Rust কোড ব্রাউজারে প্রায় নেটিভ স্পিডে এক্সিকিউট করতে সাহায্য করে। <code>WebAssembly.instantiateStreaming(fetch('module.wasm'), importObject)</code> দিয়ে সরাসরি স্ট্রিম পার্স ও মডিউল রান করা যায়।</p>
    `
  },
  {
    id: "js-34",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Data Structures", "StructuredClone", "Deep Copy"],
    question: "structuredClone() API vs JSON.parse(JSON.stringify()) vs Object.assign() — Deep Cloning-এর পার্থক্য কী?",
    answer: `
<p><strong>Object.assign:</strong> কেবল ১ম লেভেলের Shallow Copy করে।</p><p><strong>JSON.stringify:</strong> Deep Copy করতে পারলেও Date, RegExp, Map, Set, undefined এবং Circular Reference সাপোর্ট করে না।</p><p><strong>structuredClone():</strong> নেটিভ HTML5 স্পেক্স যা Circular Reference, Map, Set, ArrayBuffer-সহ নির্ভুল Deep Copy করে।</p>
    `
  },
  {
    id: "js-35",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web APIs", "Web Workers", "SharedArrayBuffer"],
    question: "Web Workers এবং SharedArrayBuffer / Atomics দিয়ে Multi-threaded JavaScript প্রোগ্রামিং কীভাবে করবেন?",
    answer: `
<p>Web Worker প্রধান UI থ্রেডকে ব্লক না করে ব্যাকগ্রাউন্ড থ্রেডে কাজ চালায়। <code>SharedArrayBuffer</code> একাধিক থ্রেডের মধ্যে মেমোরি শেয়ার করে এবং <code>Atomics</code> থ্রেড সেফটি ও Race Condition প্রতিরোধ গ্যারান্টি দেয়।</p>
    `
  },
  {
    id: "js-36",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Web APIs", "Service Workers", "PWA"],
    question: "Service Workers Life Cycle (Install, Activate, Fetch) এবং Offline Cache Strategies কী?",
    answer: `
<p>Service Worker ব্রাউজার ব্যাকগ্রাউন্ডে নেটওয়ার্ক রিকুয়েস্ট ইন্টারসেপ্ট করে proxy হিসেবে কাজ করে।</p><ul><li><strong>Cache First:</strong> আগে ক্যাশে খোঁজে, না পেলে নেটওয়ার্কে যায়।</li><li><strong>Network First:</strong> আগে লাইভ নেটওয়ার্কে ট্রাই করে, অফলাইন হলে ক্যাশ কন্টেন্ট পাঠায়।</li></ul>
    `
  },
  {
    id: "js-37",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Performance", "Tail Call Optimization", "TCO"],
    question: "Tail Call Optimization (TCO) কী এবং রিকার্সিভ ফাংশনে Stack Overflow কীভাবে প্রতিরোধ করে?",
    answer: `
<p>ফাংশনের শেষ কাজ যদি সরাসরি রিকার্সিভ কল হয় (e.g. <code>return fact(n - 1, acc * n)</code>), তবে ইঞ্জিন আগের Stack Frame মুছে নতুন কল রিইউজ করে মেমোরি বাঁচায়।</p>
    `
  },
  {
    id: "js-38",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Features", "Optional Chaining", "Nullish Coalescing"],
    question: "Optional Chaining (?.) এবং Nullish Coalescing Operator (??) vs OR Operator (||) এর পার্থক্য কী?",
    answer: `
<p><code>?.</code> এরর না খেয়ে শর্টসার্কিট সুরক্ষা দেয়।</p><p><code>||</code> অনলি Falsy মান (0, '', false, null, undefined) চেক করে, কিন্তু <code>??</code> কেবল <strong>null</strong> এবং <strong>undefined</strong> চেক করে (ফলে 0 বা false মান সঠিকভাবে বিবেচিত হয়)।</p>
    `
  },
  {
    id: "js-39",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Features", "BigInt", "Precision"],
    question: "BigInt Data Type কী এবং Number.MAX_SAFE_INTEGER (2^53 - 1) এর চেয়ে বড় সংখ্যা কীভাবে প্রসেস করবেন?",
    answer: `
<p>JavaScript-এর <code>Number</code> টাইপ 64-bit IEEE 754 অনুসরণ করায় (2^53 - 1) এর চেয়ে বড় সংখ্যায় প্রেসিকেশন হারায়। <code>BigInt(9007199254740991n)</code> সংখ্যা শেষে <code>n</code> যোগ করে অসীম দৈর্ঘ্যের পূর্ণসংখ্যা হিসাব রাখতে সাহায্য করে।</p>
    `
  },
  {
    id: "js-40",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Features", "Array Methods", "flat"],
    question: "Array.prototype.flat() এবং Array.prototype.flatMap() এর বাস্তবমুখী ব্যবহার কী?",
    answer: `
<p><code>flat(depth)</code> নেস্টেড অ্যারেকে সমতল করে। <code>flatMap()</code> একই সাথে <code>map()</code> এবং <code>flat(1)</code> চালায় যা ডায়নামিক অ্যারে মেপিং ফাস্ট করে।</p>
    `
  },
  {
    id: "js-41",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Internationalization", "Intl API", "Formatting"],
    question: "Intl API (NumberFormat, DateTimeFormat, Collator) দিয়ে লোকাল মুদ্রা ও তারিখ ফরম্যাটিং কীভাবে করবেন?",
    answer: `
<p><code>new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' }).format(1500)</code> দিলে স্বয়ংক্রিয়ভাবে '৳১,৫০০.০০' ফরম্যাট করে আউটপুট দেয়।</p>
    `
  },
  {
    id: "js-42",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web Components", "Custom Elements", "Shadow DOM"],
    question: "Web Components Architecture: Custom Elements, Shadow DOM, এবং HTML Templates কী?",
    answer: `
<p>কোনো ফ্রেমওয়ার্ক ছাড়া নেটিভ রিইউজেবল এইচটিএমএল ট্যাগ বানানো। <strong>Shadow DOM</strong> স্টাইল ও স্কোপ সম্পূর্ণ আইসোলেটেড রাখে যাতে বাইরের সিএসএস ট্যাগ ক্ষতিগ্রস্ত না করে।</p>
    `
  },
  {
    id: "js-43",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Objects", "Object.freeze", "Object.seal"],
    question: "Object.freeze() vs Object.seal() vs Object.preventExtensions()-এর পার্থক্য কী?",
    answer: `
<p><strong>preventExtensions:</strong> নতুন প্রোপার্টি অ্যাড করা বন্ধ করে।</p><p><strong>seal:</strong> অ্যাড ও ডিলিট বন্ধ করে, তবে বিদ্যমান মান পরিবর্তন করা যায়।</p><p><strong>freeze:</strong> অ্যাড, ডিলিট এবং ভ্যালু চেঞ্জ সবই বন্ধ করে সম্পূর্ণ ইমিউটেবল বানায়।</p>
    `
  },
  {
    id: "js-44",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security", "XSS", "DOM Purify"],
    question: "Cross-Site Scripting (XSS) অ্যাটাক প্রতিরোধে innerHTML-এর বদলে innerText / textContent বা Sanitizer API কেন ব্যবহার করা উচিত?",
    answer: `
<p><code>innerHTML</code> ইউজার ইনপুটে থাকা ক্ষতিকারক <code>&lt;script&gt;</code> ট্যাগ সরাসরি রান করিয়ে দেয়। <code>textContent</code> প্লেন টেক্সট হিসেবে এনকোড করে এক্সিকিউশন প্রতিরোধ করে।</p>
    `
  },
  {
    id: "js-45",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Web APIs", "Intersection Observer", "Lazy Loading"],
    question: "Intersection Observer API দিয়ে ইমেজ লেজি লোডিং এবং ইনফিনিট স্ক্রলিং কীভাবে বাস্তবায়িত হয়?",
    answer: `
<p>স্ক্রোল ইভেন্ট লিসেনারের বদলে Browser-এর নিজস্ব থ্রেড দিয়ে কোনো এলিমেন্ট ভিউপোর্টে (Viewport) দৃশ্যমান হচ্ছে কিনা তা ০% পারফরম্যান্স ল্যাগ ছাড়াই ট্র্যাকিং করা।</p>
    `
  },
  {
    id: "js-46",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web APIs", "Mutation Observer", "DOM"],
    question: "MutationObserver API দিয়ে DOM সাব-ট্রি পরিবর্তন বা Attribute Modification কীভাবে ট্র্যাক করবেন?",
    answer: `
<p>ডি ও এম (DOM)-এ কোনো নতুন চাইল্ড নোড যুক্ত হলে বা অ্যাট্রিবিউট চেঞ্জ হলে স্বয়ংক্রিয় অ্যাসিনক্রোনাস কলব্যাক ফায়ার করা।</p>
    `
  },
  {
    id: "js-47",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Web APIs", "Resize Observer", "Responsive"],
    question: "ResizeObserver API দিয়ে এলিমেন্টের নিজস্ব সাইজ পরিবর্তন কীভাবে ডিটেক্ট করবেন?",
    answer: `
<p>Window Resize Event না ডেকে নির্দিষ্ট কোনো ডাইনামিক Div বা কন্টেইনারের সাইজ পরিবর্তন রিয়েল-টাইমে ডিটেক্ট করা।</p>
    `
  },
  {
    id: "js-48",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Concurrency", "Promise.allSettled", "Promise.any"],
    question: "Promise Combinators: Promise.all vs Promise.allSettled vs Promise.race vs Promise.any-এর সূক্ষ্ম পার্থক্য কী?",
    answer: `
<p><strong>Promise.all:</strong> সব প্রমিস সফল হতে হবে, ১টি এরর হলেই রেসপন্স রিজেক্টড।</p><p><strong>Promise.allSettled:</strong> এরর বা সাকসেস যা-ই হোক সব প্রমিসের রেজাল্ট অবজেক্ট রিটার্ন করে।</p><p><strong>Promise.race:</strong> সবার আগে ফিনিশ হওয়া প্রমিস (সাকসেস বা ফেল) দেয়।</p><p><strong>Promise.any:</strong> সবার আগে প্রথম <strong>সাকসেসফুল</strong> হওয়া প্রমিসটি দেয়।</p>
    `
  },
  {
    id: "js-49",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Modules", "ESM vs CJS", "Dynamic Import"],
    question: "ES Modules (import/export) vs CommonJS (require/module.exports) এবং Dynamic import() কেন প্রয়োজন?",
    answer: `
<p>CJS হলো সিঙ্ক্রোনাস ও রানটাইম লোডিং। ESM হলো অ্যাসিনক্রোনাস ও কম্পাইল-টাইম স্ট্যাটিক বিশ্লেষণধর্মী। <code>import('module.js')</code> অন-ডিমান্ড প্রমিস ভিত্তিক কোড-স্প্লিটিং অফার করে।</p>
    `
  },
  {
    id: "js-50",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security", "Prototype Pollution", "Object.create"],
    question: "Prototype Pollution Attack কী এবং Object.create(null) দিয়ে এটি কীভাবে আটকাবেন?",
    answer: `
<p>অ্যাটাকার ডাইনামিক <code>__proto__</code> কি ইনজেক্ট করে গ্লোবাল <code>Object.prototype</code> পরিবর্তন করে দিতে পারে। <code>Object.create(null)</code> দিলে জিরো প্রোটোটাইপ অবজেক্ট তৈরি হয় যা নিরাপদ।</p>
    `
  }
];
