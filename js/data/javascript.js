const javascriptQuestions = [
  {
    id: "js-1",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Execution Context","V8","Hoisting"],
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
        <li><strong>Global Execution Context (GEC):</strong> কোড যখন প্রথম রান হয়, তখন ডিফল্টভাবে GEC তৈরি হয়। এটি সম্পূর্ণ কোডফ্লোর মাদার কনটেক্সট। ব্রাউজার এনভায়রনমেন্টে এটি <code>window</code> অবজেক্ট তৈরি করে।</li>
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
    tags: ["Event Loop","Microtask","Macrotask"],
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
    tags: ["Closure","Scope","Memory"],
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
    tags: ["Hoisting","let","const","var"],
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
    tags: ["this Keyword","Call Apply Bind"],
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
    tags: ["Prototype","Inheritance","ES6 Class"],
    question: "Prototypes এবং Prototype Chain কী? ES6 Class কীভাবে এর ব্যাকগ্রাউন্ডে কাজ করে?",
    answer: `
      <p>JavaScript হলো একটি <strong>Prototype-based Object Oriented</strong> ল্যাঙ্গুয়েজ। JS-ে প্রতিটি অবজেক্টের সাথে একটি হিডেন প্রপার্টি থাকে যাকে <code>[[Prototype]]</code> বা <code>__proto__</code> বলা হয়, যা আরেকটি অবজেক্টকে নির্দেশ করে।</p>
      <h4>Prototype Chain:</h4>
      <p>যখন কোনো অবজেক্টের কোনো প্রপার্টি বা মেথড খোঁজা হয়, JS ইঞ্জিন প্রথমে অবজেক্টের নিজস্ব প্রপার্টি চেক করে। না পেলে তার Prototype-ে খোঁজে, তারপর তার Prototype-এর Prototype-এ... এভাবে <code>null</code> না পাওয়া পর্যন্ত চেইন ধরে সার্চ করতে থাকে। একেই <strong>Prototype Chain</strong> বলে।</p>
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
    tags: ["Promises","Async Await","Error Handling"],
    question: "Promise-এর ৩টি স্টেট কী কী? Promise.all, Promise.allSettled, Promise.race এবং Promise.any-এর পার্থক্য কী?",
    answer: `
      <p><strong>Promise</strong> হলো একটি অবজেক্ট যা কোনো Asynchronous অপারেশনের চূড়ান্ত সাফল্য (Fulfillment) বা ব্যর্থতা (Rejection) এবং তার ভ্যালু প্রতিনিধিত্ব করে।</p>
      <h4>Promise-ের ৩টি স্টেট:</h4>
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
    tags: ["Performance","Debounce","Throttle"],
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
    tags: ["Memory Leak","Garbage Collection","WeakMap"],
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
    tags: ["Shallow Copy","Deep Copy","StructuredClone"],
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
    tags: ["Event Delegation","Bubbling","Capturing"],
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
    tags: ["Proxy","Reflect","Metaprogramming"],
    question: "JavaScript-ে Proxy এবং Reflect অবজেক্টের কাজ কী? মেটাপ্রোগ্রামিংয়ে এর ব্যবহার কী?",
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
    tags: ["Map","Set","WeakMap","WeakSet"],
    question: "Map vs Object এবং WeakMap vs Map-এর মধ্যে পার্থক্য ব্যাখ্যা করুন।",
    answer: `
      <p>JavaScript ES6-এ কী-ভ্যালু পেয়ার ও ইউনিক কালেকশনের জন্য নতুন ডেটা স্ট্রাকচার যুক্ত করা হয়েছে।</p>
      <h4>Map vs Object:</h4>
      <ul>
        <li><strong>Key Types:</strong> Object-এর কী শুধুমাত্র String বা Symbol হতে পারে। কিন্তু Map-ে যেকোনো ডেটা টাইপ (Object, Function, Number) কী হতে পারে।</li>
        <li><strong>Size:</strong> Map-ের সাইজ সহজেই <code>map.size</code> দিয়ে পাওয়া যায়, Object-এর ক্ষেত্রে ম্যানুয়ালি বের করতে হয়।</li>
        <li><strong>Order:</strong> Map কিগুলোর ইনসার্শন অর্ডার বজায় রাখে, Object-ে নির্দিষ্ট অর্ডার গ্যারান্টিড নয়।</li>
      </ul>
      <h4>WeakMap vs Map:</h4>
      <ul>
        <li>WeakMap-ের কী অবশ্যই একটি <strong>Object</strong> হতে হবে (Primitive নেওয়া যাবে না)।</li>
        <li>WeakMap-ের অবজেক্ট কী-গুলো <strong>Weakly Held</strong> থাকে। অর্থাৎ মূল অবজেক্টের ওপর অন্য কোনো রেফারেন্স না থাকলে Garbage Collector সেই কী এবং ভ্যালুকে মেমোরি থেকে মুছে ফেলে।</li>
        <li>WeakMap-ে <code>size</code> প্রপার্টি নেই এবং এটি Iteration (for..of) করা যায় না।</li>
      </ul>
    `
  },
  {
    id: "js-14",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["Equality","Coercion"],
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
    tags: ["Generator","Iterator","Yield"],
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
    tags: ["Currying","Functional Programming"],
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
    tags: ["JavaScript","ES Modules","Browser API","Senior"],
    question: "Import Maps কী? npm bundler ছাড়াই ব্রাউজারে সরাসরি bare module specifier কীভাবে resolve করে?",
    answer: `
      <p><strong>Import Maps</strong> একটি ব্রাউজার-নেটিভ ফিচার যা <code>import 'lodash'</code>-এর মতো bare specifier (যা ব্রাউজার সাধারণত বুঝতে পারে না, শুধু URL/relative path বোঝে) কে একটি নির্দিষ্ট URL-এ ম্যাপ করে দেয় — কোনো bundler (Webpack/Vite) ছাড়াই।</p>
      <div class="code-box">
        <div class="code-header"><span>html</span><button class="copy-btn">Copy</button></div>
        <pre><code>&lt;script type="importmap"&gt;
{
  "imports": {
    "lodash": "https://cdn.jsdelivr.net/npm/lodash-es@4/lodash.js",
    "react": "https://esm.sh/react@18"
  }
}
&lt;/script&gt;

&lt;script type="module"&gt;
  import _ from 'lodash';   // ব্রাউজার এখন জানে এটি কোথায় খুঁজতে হবে
  import React from 'react';
&lt;/script&gt;</code></pre>
      </div>
      <h4>কেন গুরুত্বপূর্ণ — বিল্ড টুল ছাড়া মডুলার JS</h4>
      <p>ঐতিহ্যবাহীভাবে, npm প্যাকেজ ব্যবহার করতে Webpack/Rollup-এর মতো bundler লাগত কারণ ব্রাউজার <code>import 'react'</code>-এর মতো bare specifier resolve করতে জানে না — শুধু <code>import './react.js'</code>-এর মতো সম্পূর্ণ পথ বোঝে। Import Maps এই ফাঁক পূরণ করে — ছোট প্রজেক্ট বা প্রোটোটাইপে সম্পূর্ণ বিল্ড পাইপলাইন ছাড়াই native ES modules ব্যবহার করা যায়।</p>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>Tree-shaking/minification নেই</strong> — bundler-এর অপ্টিমাইজেশন সুবিধা পাওয়া যায় না, তাই বড় প্রোডাকশন অ্যাপে এখনও bundler প্রয়োজন।</li>
        <li><strong>প্রতিটি মডিউল আলাদা HTTP রিকোয়েস্ট</strong> — HTTP/2 multiplexing থাকলেও bundled একক ফাইলের চেয়ে বেশি ওভারহেড।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Import Maps ও Deno-এর মডিউল রেজোলিউশনের মধ্যে সম্পর্ক কী?</li>
      </ul>
    `
  },
  {
    id: "js-18",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["ES6","Destructuring","Rest Spread"],
    question: "Rest Parameter এবং Spread Operator-ের মধ্যে পার্থক্য উদাহরণসহ বুঝিয়ে বলুন।",
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
    tags: ["Symbol","Primitive Data Types"],
    question: "JavaScript-ে Symbol কী এবং এটি কেন ব্যবহার করা হয়?",
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
    tags: ["V8 Engine","JIT Compiler","Optimization"],
    question: "V8 Engine কীভাবে JavaScript কোড কম্পাইল ও এক্সিকিউট করে? (Ignition & TurboFan)",
    answer: `
      <p>Google V8 Engine হলো একটি হাই-পারফরম্যান্স ওপেন সোর্স C++ ভিত্তিক JavaScript ও WebAssembly ইঞ্জিন।</p>
      <h4>V8 এক্সিকিউশন পাইপলাইন:</h4>
      <ol>
        <li><strong>Parser:</strong> সোর্স কোড রিড করে <strong>Abstract Syntax Tree (AST)</strong> তৈরি করে।</li>
        <li><strong>Ignition (Interpreter):</strong> AST থেকে দ্রুত Bytecode জেনারেট করে এবং রান করতে শুরু করে। এটি রান-টাইম প্রোফাইলিং ডেটা সংগ্রহ করে (Hot Code চিহ্নিত করার জন্য)।</li>
        <li><strong>TurboFan (JIT Compiler):</strong> যে কোড বারবার রান হয় (যেমন লুপের ভেতরের কোড বা হট ফাংশন), TurboFan সেগুলোকে সরাসরি অপ্টিমাইজড <strong>Machine Code</strong>-এ রূপান্তর করে।</li>
        <li><strong>Deoptimization:</strong> যদি কোনো ভ্যারিয়েবলের টাইপ হঠাৎ বদলে যায় (Dynamic typing distortion), TurboFan অপ্টিমাইজড কোড বাতিল করে আবার Ignition Bytecode-ে ফিরে যায়।</li>
      </ol>
    `
  },
  {
    id: "js-21",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Service Worker","PWA","Web API"],
    question: "Service Worker কী? Progressive Web App (PWA)-এ Offline Caching এবং Push Notification কীভাবে কাজ করে?",
    answer: `
      <p><strong>Service Worker</strong> হলো ব্রাউজারের ব্যাকগ্রাউন্ডে চলমান একটি স্ক্রিপ্ট যা মেইন থ্রেড থেকে আলাদাভাবে কাজ করে। এটি ব্রাউজার এবং নেটওয়ার্কের মাঝে একটি প্রোগ্রামেবল নেটওয়ার্ক প্রক্সি (Proxy) হিসেবে কাজ করে। এটি সরাসরি DOM অ্যাক্সেস করতে পারে না।</p>
      <h4>অফলাইন ক্যাশিং ও পুশ নোটিফিকেশন:</h4>
      <ul>
        <li><strong>Offline Caching:</strong> Service Worker <code>Cache API</code> ব্যবহার করে অ্যাসেট বা API রেসপন্স ক্যাশ করে রাখে। ইউজার অফলাইনে থাকলে <code>fetch</code> ইভেন্ট ইন্টারসেপ্ট করে ক্যাশ থেকে ডেটা দেখায়।</li>
        <li><strong>Push Notification:</strong> সার্ভার থেকে Push API-এর মাধ্যমে মেসেজ পাঠালে, অ্যাপ বন্ধ থাকলেও Service Worker সেটি রিসিভ করে ইউজারকে নোটিফিকেশন দেখায়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// sw.js (Service Worker File)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      return cachedRes || fetch(event.request);
    })
  );
});</code></pre>
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
      <p><strong>Tail Call Optimization (TCO)</strong> হলো ES6-এ প্রবর্তিত একটি কম্পাইলার অপটিমাইজেশন কৌশল। যখন কোনো ফাংশনের সর্বশেষ এক্সিকিউটেবল স্টেটমেন্ট হিসেবে অন্য একটি ফাংশন কল (বা নিজেকেই রিকারসিভ কল) করা হয়, তখন নতুন করে আলাদা Call Stack Frame তৈরি না করে বর্তমান স্ট্যাক ফ্রেমটি পুনঃব্যবহার (Reuse) করা হয়।</p>
      <h4>সুবিধা:</h4>
      <p>সাধারণ রিকারশনে প্রতি কলে নতুন স্ট্যাক তৈরি হওয়ায় ডeep রিকারশনে <code>Maximum call stack size exceeded</code> এরর ঘটে। TCO প্রয়োগ করলে মেমোরি কনস্ট্যান্ট O(1) থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Non-Tail Recursive (Stack grows O(n))
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Multiplication happens AFTER the recursive call
}

// Tail Recursive (TCO candidate O(1) space)
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc); // Recursive call is the LAST operation
}</code></pre>
      </div>
      <p><em>বিঃদ্রঃ বর্তমানে Safari (JavaScriptCore) ছাড়া V8 (Chrome/Node.js) ইঞ্জিনে TCO সাপোর্ট করে না।</em></p>
    `
  },
  {
    id: "js-23",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["ES6+","Operators","Syntax"],
    question: "Optional Chaining (?.) এবং Nullish Coalescing Operator (??) কীভাবে কাজ করে? Logical OR (||) এর সাথে ?? এর পার্থক্য কী?",
    answer: `
      <p><strong>Optional Chaining (<code>?.</code>):</strong> কোনো অবজেক্টের ডিপলি নেস্টেড প্রপার্টি রিড করার সময় যদি মাঝের কোনো প্রপার্টি <code>null</code> বা <code>undefined</code> হয়, তবে <code>TypeError</code> না দিয়ে নিরাপদে <code>undefined</code> রিটার্ন করে।</p>
      <p><strong>Nullish Coalescing (<code>??</code>):</strong> এটি কেবল বামের অপারেন্ডটি <code>null</code> অথবা <code>undefined</code> হলেই ডানের ভ্যালু রিটার্ন করে।</p>
      <h4><code>||</code> (Logical OR) vs <code>??</code> পার্থক্য:</h4>
      <p><code>||</code> যেকোনো Falsy ভ্যালুর (যেমন: <code>0</code>, <code>""</code>, <code>false</code>, <code>NaN</code>) জন্য ডানের ভ্যালু রিটার্ন করে। কিন্তু <code>??</code> কেবল <code>null</code> ও <code>undefined</code> কে চেক করে, ফলে <code>0</code> বা <code>false</code> ভ্যালু হিসেবে ট্রিট করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const user = { profile: { name: "Nazmul", score: 0 } };

console.log(user?.profile?.name); // "Nazmul"

const score1 = user.profile.score || 100; // 100 (wrong, because 0 is falsy)
const score2 = user.profile.score ?? 100; // 0 (correct! 0 is not nullish)</code></pre>
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
      <p><strong>Number Precision:</strong> JavaScript-ে সকল সাধারণ সংখ্যা <strong>IEEE 754 Double-Precision Floating-Point Format (64-bit)</strong> মেনে সংরক্ষিত হয়। বাইনারি ফরম্যাটে <code>0.1</code> এবং <code>0.2</code> এর সঠিক রূপান্তর সম্ভব নয় হওয়ায় ইনফিনিট লুপিং প্রতিরোধে রাউন্ডিং করা হয়, যার ফলে প্রিসিশন লস ঘটে।</p>
      <p><strong>BigInt:</strong> জাভাস্ক্রিপ্টে <code>Number.MAX_SAFE_INTEGER</code> হলো <code>2^53 - 1</code>। এর চেয়ে বড় পূর্ণসংখ্যা (যেমন ক্রিপ্টোগ্রাফিক কি বা বড় ফিন্যান্সিয়াল হিসাব) হ্যান্ডেল করতে <code>BigInt</code> ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Precision Issue
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Fix using EPSILON
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON); // true

// BigInt for massive numbers
const bigNum = 9007199254740991n + 2n; 
console.log(bigNum); // 9007199254740993n</code></pre>
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
      <p><strong><code>flat(depth)</code>:</strong> এটি নেস্টেড অ্যারের সাব-অ্যারেগুলোকে নির্দিষ্ট গভীরতা (depth) পর্যন্ত সমতল (flatten) করে নতুন একটি অ্যারে তৈরি করে। ডিফল্টভাবে depth ১ থাকে। পুরোপুরি সমতল করতে <code>Infinity</code> দেওয়া যায়।</p>
      <p><strong><code>flatMap(callback)</code>:</strong> এটি প্রথমে প্রতিটি এলিমেন্টে <code>map()</code> চালায় এবং তারপর রেজাল্টকে ১ লেভেল <code>flat()</code> করে। এটি <code>map().flat()</code> এর চেয়ে বেশি কার্যকরী ও দ্রুত।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const nested = [1, [2, [3, 4]]];
console.log(nested.flat(2)); // [1, 2, 3, 4]

// flatMap Example
const sentences = ["Hello World", "JS Tips"];
const words = sentences.flatMap(str => str.split(" "));
console.log(words); // ["Hello", "World", "JS", "Tips"]</code></pre>
      </div>
    `
  },
  {
    id: "js-26",
    category: "JavaScript",
    difficulty: "Beginner",
    tags: ["JavaScript","ES2024","Array Methods","Senior"],
    question: "Object.groupBy() ও Map.groupBy() (ES2024) কী? আগে Array.reduce() দিয়ে যা করতে হতো তা কীভাবে সহজ করে?",
    answer: `
      <p><code>Object.groupBy()</code> ও <code>Map.groupBy()</code> একটি অ্যারেকে একটি callback function-এর রিটার্ন করা key অনুযায়ী গ্রুপ করে দেয় — আগে এই কাজের জন্য <code>reduce()</code> দিয়ে ম্যানুয়াল বয়লারপ্লেট লিখতে হতো।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const orders = [
  { id: 1, status: 'pending' }, { id: 2, status: 'shipped' },
  { id: 3, status: 'pending' }, { id: 4, status: 'delivered' },
];

// ❌ আগে — reduce() দিয়ে ম্যানুয়াল গ্রুপিং
const grouped = orders.reduce((acc, order) => {
  (acc[order.status] ??= []).push(order);
  return acc;
}, {});

// ✅ এখন — Object.groupBy()
const groupedByStatus = Object.groupBy(orders, (order) => order.status);
// { pending: [...], shipped: [...], delivered: [...] }

// Map.groupBy() — key হিসেবে যেকোনো টাইপ ব্যবহার করা যায় (শুধু string নয়)
const groupedMap = Map.groupBy(orders, (order) => order.status);</code></pre>
      </div>
      <h4>Object.groupBy() বনাম Map.groupBy() — কখন কোনটি</h4>
      <p><code>Object.groupBy()</code> একটি plain object রিটার্ন করে — key স্বয়ংক্রিয়ভাবে string-এ কনভার্ট হয়। <code>Map.groupBy()</code> একটি <code>Map</code> রিটার্ন করে — key যেকোনো টাইপ (object, number) হতে পারে, এবং key-এর ইনসার্শন অর্ডার নিশ্চিতভাবে বজায় থাকে।</p>
      <h4>ব্রাউজার/Node.js সাপোর্ট বিবেচনা</h4>
      <p>এটি একটি তুলনামূলক নতুন ফিচার (ES2024, Node.js 21+, আধুনিক ব্রাউজার) — পুরনো এনভায়রনমেন্ট সাপোর্ট করতে হলে এখনও <code>reduce()</code>-ভিত্তিক polyfill বা Lodash-এর <code>groupBy</code> প্রয়োজন হতে পারে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক ফিল্ড দিয়ে (composite key) গ্রুপ করতে হলে callback ফাংশন কীভাবে লিখবেন?</li>
      </ul>
    `
  },
  {
    id: "js-27",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["DOM","Web Components","Shadow DOM"],
    question: "Web Components কী? Custom Elements এবং Shadow DOM কীভাবে কাজ করে?",
    answer: `
      <p><strong>Web Components</strong> হলো ব্রাউজারের নেটিভ W3C স্ট্যান্ডার্ডের সেট, যার সাহায্যে React বা Vue এর মতো ফ্রেমওয়ার্ক ছাড়াই রিইউজেবল, এনক্যাপসুলেটেড কাস্টম HTML ট্যাগ তৈরি করা যায়।</p>
      <h4>প্রধান পিলারসমূহ:</h4>
      <ul>
        <li><strong>Custom Elements:</strong> নিজস্ব HTML এলিমেন্ট তৈরি করার API (যেমন- <code>&lt;my-button&gt;</code>)।</li>
        <li><strong>Shadow DOM:</strong> এটি কম্পোনেন্টের CSS এবং DOM কে বাইরের গ্লোবাল স্টাইল থেকে সম্পূর্ণ আলাদা (Isolated) রাখে। বাইরের CSS এর কোনো প্রভাব Shadow DOM-এর ভেতরে পড়ে না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>class MyButton extends HTMLElement {
  constructor() {
    super();
    // Attach Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        button { background: purple; color: white; }
      </style>
      <button><slot></slot></button>\`;
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
      <p><strong>structuredClone()</strong> হলো আধুনিক ব্রাউজার ও Node.js (v17+) এর অফিশিয়াল নেটিভ ডিপ ক্লোনিং API। এটি কোনো অবজেক্ট বা অ্যারেকে সম্পূর্ণ গভীরভাবে কপি করে।</p>
      <h4>JSON মেথডের সীমাবদ্ধতা:</h4>
      <p><code>JSON.parse(JSON.stringify())</code> ডিপ কপি করতে পারলেও এটি <code>Date</code> অবজেক্টকে স্ট্রিং বানিয়ে ফেলে এবং <code>Set</code>, <code>Map</code>, <code>RegExp</code>, <code>undefined</code>, ফাংশন এবং <strong>Circular Reference</strong> কপি করতে পারে না (এরর থ্রো করে)।</p>
      <p><code>structuredClone()</code> নেটিভভাবে এসব ডেটা টাইপ এবং সার্কুলার রেফারেন্স নির্ভুলভাবে ক্লোন করতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const original = { 
  date: new Date(), 
  set: new Set([1, 2]),
  self: null
};
original.self = original; // Circular reference

// JSON method would throw an error here!
// const copy1 = JSON.parse(JSON.stringify(original)); 

// structuredClone handles it perfectly
const copy2 = structuredClone(original);
console.log(copy2.date instanceof Date); // true</code></pre>
      </div>
    `
  },
  {
    id: "js-29",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop","Microtask","Macrotask"],
    question: "queueMicrotask, requestAnimationFrame এবং setTimeout-এর মধ্যে এক্সিকিউশন অর্ডার কী?",
    answer: `
      <p>ব্রাউজারের Event Loop-এ এই তিনটির এক্সিকিউশন অগ্রাধিকার সম্পূর্ণ আলাদা। এরা যে ক্রমে ফায়ার হয় তা হলো:</p>
      <ol>
        <li><strong>queueMicrotask (Microtask Queue):</strong> সবচেয়ে বেশি অগ্রাধিকার পায়। কল স্ট্যাক খালি হওয়ার সাথে সাথেই মাইক্রোটাস্ক কিউ খালি না হওয়া পর্যন্ত রান করে। (Promise কলব্যাকও এখানে থাকে)।</li>
        <li><strong>requestAnimationFrame (Render Queue):</strong> মাইক্রোটাস্ক শেষ হলে এবং ব্রাউজার পেইন্ট (Paint) করার ঠিক আগে এটি এক্সিকিউট হয়। এটি DOM আপডেট বা অ্যানিমেশনের জন্য পারফেক্ট।</li>
        <li><strong>setTimeout (Macrotask/Task Queue):</strong> এটি সবার শেষে ফায়ার হয়। পেইন্ট শেষ হওয়ার পর ম্যাক্রোটাস্ক কিউ থেকে এক্সিকিউট হয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>console.log('1. Start');

setTimeout(() => console.log('4. setTimeout'), 0);

requestAnimationFrame(() => console.log('3. rAF'));

queueMicrotask(() => console.log('2. Microtask'));

// Output order: 1 -> 2 -> 3 -> 4</code></pre>
      </div>
    `
  },
  {
    id: "js-30",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Performance","Memory","Garbage Collection"],
    question: "JavaScript Garbage Collection Algorithms (Mark-and-Sweep, Generational GC, Scavenge vs Mark-Sweep-Compact) কীভাবে কাজ করে?",
    answer: `
      <p>V8 ইঞ্জিনের গারবেজ কালেকশন (GC) মেমোরি ম্যানেজমেন্টের জন্য <strong>Generational Garbage Collection</strong> ব্যবহার করে। মেমোরিকে দুই ভাগে ভাগ করা হয়: <strong>Young Generation</strong> (Nursery) এবং <strong>Old Generation</strong>।</p>
      <ul>
        <li><strong>Scavenge Algorithm (Minor GC):</strong> Young Generation-এর জন্য ব্যবহৃত হয়। নতুন অবজেক্ট এখানে আসে। এটি <em>Cheney's Copying Algorithm</em> ব্যবহার করে। যেসব অবজেক্ট আর রেফারেন্স হয় না সেগুলো মুছে ফেলে এবং বাকিগুলো Old Generation-এ প্রমোট করে। এটি খুব দ্রুত কাজ করে।</li>
        <li><strong>Mark-Sweep-Compact (Major GC):</strong> Old Generation-এর জন্য ব্যবহৃত হয়। দীর্ঘস্থায়ী অবজেক্টগুলো এখানে থাকে। 
          <ul>
            <li><strong>Mark:</strong> রুট থেকে শুরু করে পুরো অবজেক্ট গ্রাফ ট্রাভার্স করে যেসব অবজেক্ট রেফারেন্স হচ্ছে তাদের মার্ক করে।</li>
            <li><strong>Sweep:</strong> যেসব আনমার্কড (অব্যবহৃত) অবজেক্ট আছে সেগুলো মেমোরি থেকে মুছে ফেলে।</li>
            <li><strong>Compact:</strong> মুছে ফেলার পর মেমোরিতে যে গ্যাপ তৈরি হয় তা বন্ধ করতে বাকি অবজেক্টগুলোকে একত্রিত করে (ডিফ্র্যাগমেন্ট)।</li>
          </ul>
        </li>
      </ul>
    `
  },
  {
    id: "js-31",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Async","Iterators","Generators"],
    question: "Async Iterators এবং Async Generators (Symbol.asyncIterator, for await...of) কীভাবে স্ট্রিম প্রসেস করে?",
    answer: `
      <p><strong>Async Iterators</strong> ব্যবহার করে আমরা অ্যাসিনক্রোনাস ডেটা সোর্স (যেমন- নেটওয়ার্ক স্ট্রিম, ফাইল রিডিং বা ডাটাবেজ কার্সর) থেকে ডেটা চাংক (chunk) আকারে পড়তে পারি। এটি <code>Symbol.asyncIterator</code> মেথড ইমপ্লিমেন্ট করে এবং <code>next()</code> কল করলে একটি <strong>Promise</strong> রিটার্ন করে।</p>
      <p><strong>Async Generators (<code>async function*</code>):</strong> এটি অ্যাসিনক্রোনাসভাবে ডেটা জেনারেট করে স্ট্রিম আকারে সরবরাহ করে। <code>for await...of</code> লুপের মাধ্যমে এই স্ট্রিম খুব সহজেই কনজিউম করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>async function* fetchPages(url) {
  let page = 1;
  while (page <= 3) {
    // Fetch data asynchronously
    const response = await fetch(\`\${url}?page=\${page}\`);
    const data = await response.json();
    yield data; // Yielding chunk of data
    page++;
  }
}

// Consuming the async stream
(async () => {
  for await (const pageData of fetchPages('https://api.example.com/data')) {
    console.log('Received page:', pageData);
  }
})();</code></pre>
      </div>
    `
  },
  {
    id: "js-32",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["JavaScript","Immutability","Senior"],
    question: "Object.freeze() কেন শুধু Shallow Freeze করে? নেস্টেড অবজেক্টে Deep Freeze কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p><code>Object.freeze()</code> শুধুমাত্র <strong>প্রথম স্তরের</strong> প্রপার্টি immutable করে — নেস্টেড অবজেক্ট এখনও পরিবর্তনযোগ্য থাকে। এই সীমাবদ্ধতা প্রায়ই ভুল বোঝাবুঝি ও production বাগের কারণ হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const config = Object.freeze({
  name: 'App',
  settings: { theme: 'dark', maxRetries: 3 }
});

config.name = 'Changed';           // ❌ silently ব্যর্থ (strict mode-এ TypeError)
console.log(config.name);          // 'App' — অপরিবর্তিত ✅

config.settings.theme = 'light';   // ⚠️ এটি কাজ করে যায়! settings ফ্রিজড নয়
console.log(config.settings.theme); // 'light' — বদলে গেছে ❌</code></pre>
      </div>
      <h4>Deep Freeze — রিকার্সিভ সমাধান</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach((key) => {
    const value = obj[key];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);   // রিকার্সিভভাবে নেস্টেড অবজেক্ট ফ্রিজ করা
    }
  });
  return Object.freeze(obj);
}

const config = deepFreeze({ name: 'App', settings: { theme: 'dark' } });
config.settings.theme = 'light';   // এখন silently ব্যর্থ হবে</code></pre>
      </div>
      <h4>বাস্তবিক বিকল্প — কখন লাইব্রেরি ব্যবহার করবেন</h4>
      <p>নিজে <code>deepFreeze</code> লেখার বদলে, Redux-এর মতো state management-এ <strong>Immer</strong> লাইব্রেরি ব্যবহার করা বেশি প্রচলিত — এটি "draft" অবজেক্টে সাধারণ mutable syntax লিখতে দেয়, কিন্তু ভেতরে ভেতরে immutable আপডেট তৈরি করে (structural sharing দিয়ে) — কর্মক্ষমতা ও এরগনমিক্স উভয়ই ভালো।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Object.freeze() ও TypeScript-এর readonly-এর মধ্যে পার্থক্য কী — একটি compile-time, অন্যটি runtime কেন?</li>
      </ul>
    `
  },
  {
    id: "js-33",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["WebAssembly","Wasm","Performance"],
    question: "WebAssembly (Wasm) কী এবং JavaScript-এর সাথে WebAssembly.instantiateStreaming কীভাবে কাজ করে?",
    answer: `
      <p><strong>WebAssembly (Wasm)</strong> হলো একটি লো-লেভেল বাইনারি ইনস্ট্রাকশন ফরম্যাট। C, C++, বা Rust এ লেখা কোড কম্পাইল করে Wasm-এ রূপান্তর করে ব্রাউজারে প্রায় নেটিভ স্পিডে এক্সিকিউট করা যায়। ভিডিও এডিটিং, গেমিং, বা ক্রিপ্টোগ্রাফির মতো CPU-ইনটেনসিভ কাজের জন্য এটি জাভাস্ক্রিপ্টের চেয়ে অনেক দ্রুত।</p>
      <p><code>WebAssembly.instantiateStreaming()</code> হলো Wasm মডিউল কম্পাইল এবং ইনস্ট্যানশিয়েট করার সবচেয়ে দ্রুত ও কার্যকর উপায়। এটি সরাসরি নেটওয়ার্ক স্ট্রিম থেকে কোড কম্পাইল করে (প্রথমে অ্যারে বাফারে কপি না করেই)।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const importObject = { imports: { imported_func: arg => console.log(arg) } };

WebAssembly.instantiateStreaming(fetch('module.wasm'), importObject)
  .then(obj => {
    // Call exported Wasm function
    obj.instance.exports.exported_func();
  });</code></pre>
      </div>
    `
  },
  {
    id: "js-34",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["JavaScript","Immutability","Performance","Senior"],
    question: "Structural Sharing কী? Immer-এর মতো লাইব্রেরি কীভাবে Immutability ও Performance দুটোই একসাথে দেয়?",
    answer: `
      <p><strong>Structural Sharing</strong> একটি কৌশল যেখানে একটি বড় ডেটা স্ট্রাকচারের নতুন (immutable) ভার্সন তৈরি করার সময়, যা <em>বদলায়নি</em> তার রেফারেন্স পুনর্ব্যবহার করা হয় — শুধু যে অংশ বদলেছে সেটুকুই নতুনভাবে তৈরি হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const state = {
  user: { name: 'Rahim', age: 25 },
  settings: { theme: 'dark' },
  posts: [/* ১০০০টি পোস্ট */]
};

// ❌ পুরো ডিপ ক্লোন — অপ্রয়োজনীয় মেমরি ও CPU খরচ
const newState1 = JSON.parse(JSON.stringify(state));
newState1.user.age = 26;

// ✅ Structural sharing — শুধু user অবজেক্ট নতুন, settings ও posts একই রেফারেন্স
const newState2 = { ...state, user: { ...state.user, age: 26 } };
console.log(newState2.settings === state.settings);  // true — একই রেফারেন্স, কপি হয়নি
console.log(newState2.posts === state.posts);        // true — ১০০০ পোস্ট আবার কপি হয়নি</code></pre>
      </div>
      <h4>কেন এটি গুরুত্বপূর্ণ — React-এর সাথে সম্পর্ক</h4>
      <p>React-এর <code>memo</code>/<code>useMemo</code> reference equality (<code>===</code>) দিয়ে বদল সনাক্ত করে। Structural sharing থাকলে অপরিবর্তিত অংশের রেফারেন্স একই থাকে — React বুঝতে পারে সেই অংশ re-render করার দরকার নেই। পুরো ডিপ ক্লোন করলে সব রেফারেন্স বদলে যায়, ফলে অপ্রয়োজনীয় re-render হয়।</p>
      <h4>Immer কীভাবে এটি স্বয়ংক্রিয় করে</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { produce } from 'immer';

const newState = produce(state, (draft) => {
  draft.user.age = 26;   // সাধারণ mutable syntax লিখলেই যথেষ্ট
});
// Immer ভেতরে Proxy ব্যবহার করে বুঝে নেয় কোন অংশ বদলেছে,
// এবং স্বয়ংক্রিয়ভাবে structural sharing সহ একটি নতুন immutable object তৈরি করে</code></pre>
      </div>
      <p>Immer একটি JavaScript Proxy দিয়ে "draft" অবজেক্ট তৈরি করে — আপনি স্বাভাবিক mutable কোড লেখেন, কিন্তু ভেতরে Immer ঠিক কোন প্রপার্টি স্পর্শ হয়েছে তা ট্র্যাক করে এবং শুধু সেই পথের নতুন কপি তৈরি করে, বাকি সব পুরনো রেফারেন্স বজায় রাখে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redux Toolkit-এ Immer ডিফল্টভাবে ব্যবহৃত হয় কেন — এটি reducer লেখা কীভাবে সহজ করে?</li>
      </ul>
    `
  },
  {
    id: "js-35",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web APIs","Web Workers","SharedArrayBuffer"],
    question: "Web Workers এবং SharedArrayBuffer / Atomics দিয়ে Multi-threaded JavaScript প্রোগ্রামিং কীভাবে করবেন?",
    answer: `
      <p>JavaScript সিঙ্গেল থ্রেডেড হলেও <strong>Web Workers</strong> ব্যবহার করে মেইন UI থ্রেডকে ব্লক না করে ব্যাকগ্রাউন্ডে কাজ চালানো যায়। তবে Worker এবং মেইন থ্রেডের মধ্যে ডেটা শেয়ার করতে <code>postMessage</code> দিয়ে ডেটা কপি করতে হয়, যা ভারী ডেটার জন্য অদক্ষ।</p>
      <p><strong>SharedArrayBuffer</strong> ব্যবহার করে মেমোরি কপি না করেই সরাসরি একই মেমোরি সেগমেন্ট একাধিক থ্রেডের মধ্যে শেয়ার করা যায়। আর রেস কন্ডিশন (Race Condition) এড়াতে <strong>Atomics</strong> API ব্যবহার করা হয়, যা থ্রেড-সেফ অপারেশন গ্যারান্টি দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Main Thread
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1);
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker('worker.js');
worker.postMessage(sharedBuffer);

// Atomics ensures safe read/write across threads
Atomics.store(sharedArray, 0, 42);</code></pre>
      </div>
    `
  },
  {
    id: "js-36",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Web APIs","Service Workers","PWA"],
    question: "Service Workers Life Cycle (Install, Activate, Fetch) এবং Offline Cache Strategies কী?",
    answer: `
      <p>Service Worker-এর জীবনচক্র (Life Cycle) মূলত ৩টি ধাপে বিভক্ত:</p>
      <ol>
        <li><strong>Install:</strong> SW প্রথম রেজিস্টার হওয়ার সময় ট্রিগার হয়। এখানে সাধারণত প্রয়োজনীয় স্ট্যাটিক ফাইল ক্যাশ করা হয়।</li>
        <li><strong>Activate:</strong> পুরোনো SW ডিঅ্যাক্টিভ হয়ে নতুন SW সক্রিয় হলে এটি ট্রিগার হয়। এখানে পুরোনো ক্যাশ ক্লিন করা হয়।</li>
        <li><strong>Fetch:</strong> নেটওয়ার্ক রিকোয়েস্ট ইন্টারসেপ্ট করে ক্যাশ বা নেটওয়ার্ক থেকে রেসপন্স দেওয়া হয়।</li>
      </ol>
      <h4>Offline Cache Strategies:</h4>
      <ul>
        <li><strong>Cache First:</strong> আগে ক্যাশে খোঁজে, না পেলে নেটওয়ার্কে যায় (স্ট্যাটিক ফাইলের জন্য)।</li>
        <li><strong>Network First:</strong> আগে লাইভ নেটওয়ার্কে ট্রাই করে, অফলাইন হলে ক্যাশ থেকে দেয় (API বা ডায়নামিক ডেটার জন্য)।</li>
        <li><strong>Stale-While-Revalidate:</strong> দ্রুত ক্যাশ থেকে রেসপন্স দেয় এবং ব্যাকগ্রাউন্ডে নেটওয়ার্ক থেকে নতুন ডেটা এনে ক্যাশ আপডেট করে।</li>
      </ul>
    `
  },
  {
    id: "js-37",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["JavaScript","Iterators","Symbol","Senior"],
    question: "Symbol.iterator কী? কাস্টম ইটারেবল অবজেক্ট তৈরি করে for...of লুপে ব্যবহার কীভাবে করবেন?",
    answer: `
      <p><code>Symbol.iterator</code> একটি বিশেষ well-known symbol যা একটি অবজেক্টকে <strong>iterable</strong> বানায় — অর্থাৎ <code>for...of</code>, spread operator (<code>...</code>), বা destructuring-এ ব্যবহারযোগ্য করে তোলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const numberRange = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (const num of numberRange) console.log(num);  // 1, 2, 3, 4, 5
console.log([...numberRange]);                     // [1, 2, 3, 4, 5]
const [first, second] = numberRange;                // destructuring-ও কাজ করে</code></pre>
      </div>
      <h4>Iterator Protocol — ভেতরের নিয়ম</h4>
      <p>একটি অবজেক্ট iterable হওয়ার জন্য এর <code>[Symbol.iterator]</code> প্রপার্টি একটি ফাংশন হতে হবে যা একটি <strong>iterator object</strong> রিটার্ন করে — এবং iterator object-এ একটি <code>next()</code> মেথড থাকতে হবে যা প্রতিবার <code>{ value, done }</code> আকৃতির একটি অবজেক্ট রিটার্ন করে। <code>done: true</code> না হওয়া পর্যন্ত <code>for...of</code> লুপ চলতেই থাকে।</p>
      <h4>কেন এটি দরকার — Array/Map/Set ছাড়াও কাস্টম ডেটা স্ট্রাকচার</h4>
      <p>Array, Map, Set-এর নিজস্ব বিল্ট-ইন iterator আছে বলে <code>for...of</code>-এ সরাসরি ব্যবহার করা যায়। কিন্তু নিজস্ব ডেটা স্ট্রাকচার (linked list, tree, custom range/collection ক্লাস) তৈরি করলে, <code>Symbol.iterator</code> implement করলেই সেটি জাভাস্ক্রিপ্টের সব iteration সিনট্যাক্সের সাথে স্বাভাবিকভাবে কাজ করবে — আলাদা কোনো <code>.toArray()</code> মেথড না লিখেই।</p>
      <h4>Generator দিয়ে সংক্ষিপ্ত লেখা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const numberRange2 = {
  from: 1, to: 5,
  *[Symbol.iterator]() {   // generator function ব্যবহার করলে next()/done ম্যানুয়ালি লিখতে হয় না
    for (let i = this.from; i <= this.to; i++) yield i;
  }
};</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Iterable ও Iterator-এর মধ্যে পার্থক্য কী — একটি অবজেক্ট কি একইসাথে দুটোই হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "js-38",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["JavaScript","Async","Fetch API","Senior"],
    question: "AbortController ও AbortSignal দিয়ে fetch/async অপারেশন কীভাবে বাতিল (cancel) করবেন?",
    answer: `
      <p><code>AbortController</code> একটি ওয়েব-স্ট্যান্ডার্ড API যা চলমান async অপারেশন (মূলত <code>fetch</code>) বাতিল করার একটি প্রমিত উপায় দেয় — এটি ছাড়া একটি রিকোয়েস্ট শুরু হয়ে গেলে সেটি থামানোর কোনো সরাসরি উপায় ছিল না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const controller = new AbortController();

fetch('/api/search?q=laptop', { signal: controller.signal })
  .then(res => res.json())
  .then(data => renderResults(data))
  .catch(err => {
    if (err.name === 'AbortError') console.log('রিকোয়েস্ট বাতিল হয়েছে');
    else console.error('অন্য এরর:', err);
  });

// ৫ সেকেন্ড পরও রেসপন্স না এলে বাতিল করে দাও
setTimeout(() => controller.abort(), 5000);</code></pre>
      </div>
      <h4>বাস্তব ব্যবহার — Search-as-you-type</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>let currentController = null;

async function search(query) {
  if (currentController) currentController.abort();   // আগের চলমান রিকোয়েস্ট বাতিল
  currentController = new AbortController();
  try {
    const res = await fetch(\`/api/search?q=\${query}\`, { signal: currentController.signal });
    return res.json();
  } catch (err) {
    if (err.name !== 'AbortError') throw err;
  }
}
// ইউজার দ্রুত টাইপ করলে প্রতিটি নতুন key-stroke-এ আগের রিকোয়েস্ট বাতিল হয়ে যায়
// — পুরনো, দেরিতে আসা রেসপন্স নতুন রেজাল্ট ওভাররাইট করতে পারে না (race condition এড়ানো)</code></pre>
      </div>
      <h4>React-এ ব্যবহার — cleanup-এর সাথে সংযোগ</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>useEffect(() => {
  const controller = new AbortController();
  fetch(\`/api/user/\${id}\`, { signal: controller.signal })
    .then(res => res.json()).then(setUser);
  return () => controller.abort();   // কম্পোনেন্ট unmount বা id বদলালে পুরনো রিকোয়েস্ট বাতিল
}, [id]);</code></pre>
      </div>
      <h4>কেন গুরুত্বপূর্ণ — মেমরি লিক ও Race Condition প্রতিরোধ</h4>
      <p>বাতিল না করলে দুটি সমস্যা হতে পারে: (১) কম্পোনেন্ট unmount হওয়ার পরেও রেসপন্স এলে <code>setState</code> কল করার চেষ্টা — React warning/মেমরি লিক, (২) দ্রুত পরপর একাধিক রিকোয়েস্ট পাঠালে পুরনো রিকোয়েস্টের রেসপন্স নতুনটির পরে এসে ভুল ডেটা দেখানো (race condition)। <code>AbortController</code> উভয় সমস্যাই কাঠামোগতভাবে সমাধান করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি single AbortController দিয়ে একাধিক fetch একসাথে বাতিল করা যায় কি?</li>
      </ul>
    `
  },
  {
    id: "js-39",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["JavaScript","Temporal API","Dates","Senior"],
    question: "Temporal API কী? এটি কেন প্রচলিত Date অবজেক্ট প্রতিস্থাপনের জন্য প্রস্তাবিত হয়েছে?",
    answer: `
      <p><strong>Temporal</strong> একটি নতুন প্রস্তাবিত JavaScript API যা <code>Date</code> অবজেক্টের দীর্ঘদিনের সমস্যাগুলো সমাধান করার জন্য ডিজাইন করা হয়েছে — এটি ইতিমধ্যেই বহুল ব্যবহৃত <code>date-fns</code>/<code>Day.js</code>-এর মতো লাইব্রেরির প্রয়োজনীয়তা কমানোর লক্ষ্যে তৈরি।</p>
      <h4>Date অবজেক্টের সমস্যা — কেন প্রতিস্থাপন দরকার</h4>
      <ul>
        <li><strong>Mutable:</strong> <code>date.setMonth()</code> মূল অবজেক্ট বদলে দেয় — অপ্রত্যাশিত bug-এর সাধারণ কারণ।</li>
        <li><strong>শুধু একটি টাইমজোন কনসেপ্ট (local + UTC):</strong> একাধিক টাইমজোন নিয়ে কাজ করা (যেমন একটি মিটিং তিনটি ভিন্ন দেশের জন্য) কষ্টকর।</li>
        <li><strong>Month 0-indexed:</strong> জানুয়ারি = 0, ডিসেম্বর = 11 — একটি ক্লাসিক off-by-one bug উৎস।</li>
        <li><strong>Date-only বা Time-only আলাদা টাইপ নেই:</strong> শুধু "জন্মতারিখ" (সময় ছাড়া) সংরক্ষণ করতে চাইলেও পুরো Date অবজেক্ট (সময়সহ) ব্যবহার করতে হয়।</li>
      </ul>
      <h4>Temporal-এর সমাধান</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Immutable — প্রতিটি অপারেশন নতুন instance রিটার্ন করে
const date = Temporal.PlainDate.from('2026-08-10');
const nextMonth = date.add({ months: 1 });   // মূল date অপরিবর্তিত

// স্পষ্ট টাইপ — শুধু date, শুধু time, বা উভয়ই
const birthDate = Temporal.PlainDate.from('1995-03-15');       // শুধু তারিখ
const meetingTime = Temporal.PlainTime.from('14:30');           // শুধু সময়
const zonedMeeting = Temporal.ZonedDateTime.from('2026-08-10T14:30[Asia/Dhaka]'); // টাইমজোন-সচেতন

// সহজ, নির্ভুল টাইমজোন কনভার্সন
const newYorkTime = zonedMeeting.withTimeZone('America/New_York');</code></pre>
      </div>
      <h4>বর্তমান অবস্থা — Stage ও সাপোর্ট</h4>
      <p>Temporal TC39 প্রক্রিয়ায় একটি উন্নত স্তরে রয়েছে, কিন্তু এখনও সব ব্রাউজারে নেটিভভাবে উপলব্ধ নয় — বর্তমানে ব্যবহার করতে হলে polyfill প্রয়োজন। প্রোডাকশনে আজকের দিনে এখনও <code>date-fns</code> বা <code>Day.js</code>-এর মতো লাইব্রেরিই মূলধারার পছন্দ, কিন্তু ভবিষ্যতে Temporal এগুলোর প্রয়োজনীয়তা অনেকটাই কমিয়ে দেবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Temporal.Instant ও Temporal.ZonedDateTime-এর মধ্যে পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "js-40",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["JavaScript","ES2023","Array Methods","Senior"],
    question: "ES2023-এর Non-mutating Array মেথড: toSorted(), toReversed(), toSpliced(), with() কী সমস্যা সমাধান করে?",
    answer: `
      <p>ES2023-এ চারটি নতুন array মেথড যোগ হয়েছে যা তাদের পুরনো mutating সংস্করণের (<code>sort</code>, <code>reverse</code>, <code>splice</code>, index assignment) মতোই কাজ করে, কিন্তু <strong>মূল অ্যারে না বদলে একটি নতুন অ্যারে রিটার্ন করে</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const original = [3, 1, 4, 1, 5];

// ❌ পুরনো — sort() মূল অ্যারে mutate করে
const sorted1 = original.sort();
console.log(original);   // [1, 1, 3, 4, 5] — মূল অ্যারেও বদলে গেছে! বিপজ্জনক

// ✅ নতুন — toSorted() মূল অ্যারে অপরিবর্তিত রাখে
const original2 = [3, 1, 4, 1, 5];
const sorted2 = original2.toSorted();
console.log(original2);  // [3, 1, 4, 1, 5] — অপরিবর্তিত ✅
console.log(sorted2);    // [1, 1, 3, 4, 5] — নতুন অ্যারে

original2.toReversed();       // reverse()-এর immutable ভার্সন
original2.toSpliced(1, 2);    // splice()-এর immutable ভার্সন
original2.with(0, 99);        // arr[0] = 99-এর immutable ভার্সন — নির্দিষ্ট index বদলে নতুন অ্যারে</code></pre>
      </div>
      <h4>কেন এই মেথডগুলো দরকার — সাধারণ bug উৎস দূর করা</h4>
      <p>একটি ক্লাসিক জাভাস্ক্রিপ্ট bug: একটি ফাংশনে অ্যারে পাস করে <code>.sort()</code> কল করলে caller-এর মূল অ্যারেও নিঃশব্দে বদলে যায় — এটি প্রায়ই অপ্রত্যাশিত side effect তৈরি করে, বিশেষ করে React-এর মতো immutability-নির্ভর UI লাইব্রেরিতে (যেখানে state সরাসরি mutate করা একটি গুরুতর অ্যান্টি-প্যাটার্ন)।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// React state আপডেটে এখন সরাসরি ব্যবহারযোগ্য, spread অপারেটরের প্রয়োজন নেই
setItems(prev => prev.toSorted((a, b) => a.price - b.price));
// আগে লিখতে হতো: setItems(prev => [...prev].sort((a, b) => a.price - b.price));</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Redux reducer-এ toSorted()/toSpliced() ব্যবহার করলে immutability নিয়ম মেনে চলা কীভাবে সহজ হয়?</li>
      </ul>
    `
  },
  {
    id: "js-41",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Internationalization","Intl API","Formatting"],
    question: "Intl API (NumberFormat, DateTimeFormat, Collator) দিয়ে লোকাল মুদ্রা ও তারিখ ফরম্যাটিং কীভাবে করবেন?",
    answer: `
      <p><code>Intl</code> অবজেক্ট ব্যবহার করে ভাষা ও অঞ্চল অনুযায়ী সংখ্যা, তারিখ এবং স্ট্রিং সর্টিং করা যায়। Moment.js এর মতো হেভি লাইব্রেরি ছাড়াই এটি নেটিভভাবে কাজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. NumberFormat for Currency
const price = new Intl.NumberFormat('bn-BD', { 
  style: 'currency', 
  currency: 'BDT' 
}).format(1500); 
console.log(price); // ৳১,৫০০.০০

// 2. DateTimeFormat for Dates
const date = new Intl.DateTimeFormat('en-GB', { 
  dateStyle: 'full' 
}).format(new Date());
console.log(date); // Monday, 14 August 2023

// 3. Collator for String Sorting (Accurate language sorting)
const sorter = new Intl.Collator('de');
const sorted = ['b', 'a', 'ä'].sort(sorter.compare);
console.log(sorted); // ['a', 'ä', 'b']</code></pre>
      </div>
    `
  },
  {
    id: "js-42",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["JavaScript","Web Components","Custom Elements","Senior"],
    question: "Custom Elements-এর Lifecycle Callbacks (connectedCallback, disconnectedCallback, attributeChangedCallback) কীভাবে কাজ করে?",
    answer: `
      <p>একটি Custom Element ক্লাস <code>HTMLElement</code> এক্সটেন্ড করে এবং নির্দিষ্ট lifecycle callback মেথড implement করলে — ব্রাউজার স্বয়ংক্রিয়ভাবে সঠিক মুহূর্তে সেগুলো কল করে, ঠিক যেমন React কম্পোনেন্টের lifecycle method কাজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>class UserCard extends HTMLElement {
  static get observedAttributes() { return ['user-id']; }  // কোন attribute পর্যবেক্ষণ করবে

  connectedCallback() {
    // এলিমেন্ট DOM-এ যোগ হওয়ার সাথে সাথে চলে — React-এর componentDidMount-এর মতো
    console.log('DOM-এ যুক্ত হলো');
    this.render();
  }

  disconnectedCallback() {
    // এলিমেন্ট DOM থেকে সরানো হলে চলে — cleanup-এর জায়গা
    console.log('DOM থেকে সরানো হলো');
    this.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // observedAttributes-এ তালিকাভুক্ত কোনো attribute বদলালে চলে
    if (name === 'user-id' && oldValue !== newValue) this.fetchUser(newValue);
  }

  adoptedCallback() {
    // এলিমেন্ট এক document থেকে অন্য document-এ move হলে (খুবই বিরল ব্যবহার)
  }
}

customElements.define('user-card', UserCard);</code></pre>
      </div>
      <h4>HTML-এ ব্যবহার</h4>
      <div class="code-box">
        <div class="code-header"><span>html</span><button class="copy-btn">Copy</button></div>
        <pre><code>&lt;user-card user-id="42"&gt;&lt;/user-card&gt;
&lt;script&gt;
  document.querySelector('user-card').setAttribute('user-id', '99');
  // → attributeChangedCallback('user-id', '42', '99') স্বয়ংক্রিয়ভাবে ট্রিগার হবে
&lt;/script&gt;</code></pre>
      </div>
      <h4>React-এর সাথে তুলনা — Framework-Agnostic হওয়ার সুবিধা</h4>
      <p>এই lifecycle React/Vue/Angular কোনো ফ্রেমওয়ার্কের উপর নির্ভর করে না — এটি ব্রাউজারের নেটিভ স্ট্যান্ডার্ড। এই কারণে একটি Custom Element একবার লিখলে React, Vue, বা plain HTML — যেকোনো জায়গায় ব্যবহার করা যায়, যা Design System-এর মতো ফ্রেমওয়ার্ক-অজ্ঞেয় (framework-agnostic) কম্পোনেন্ট লাইব্রেরি তৈরিতে মূল্যবান।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>observedAttributes ডিফাইন না করলে attributeChangedCallback কেন কখনও ট্রিগার হয় না?</li>
      </ul>
    `
  },
  {
    id: "js-43",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Objects","Object.freeze","Object.seal"],
    question: "Object.freeze() vs Object.seal() vs Object.preventExtensions()-এর পার্থক্য কী?",
    answer: `
      <p>অবজেক্টের মিউটেবিলিটি (Mutability) নিয়ন্ত্রণ করার জন্য এই তিনটি মেথড ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>Object.preventExtensions():</strong> এটি অবজেক্টে নতুন প্রোপার্টি অ্যাড করতে নিষেধ করে, তবে বিদ্যমান প্রপার্টি ডিলিট বা মডিফাই করা যায়।</li>
        <li><strong>Object.seal():</strong> এটি <code>preventExtensions</code> এর সাথে প্রপার্টি ডিলিট করাও বন্ধ করে দেয়। তবে বিদ্যমান প্রোপার্টির ভ্যালু পরিবর্তন (Modify) করা যায়।</li>
        <li><strong>Object.freeze():</strong> এটি সবচেয়ে স্ট্রিক্ট। এটি <code>seal</code> এর সাথে ভ্যালু পরিবর্তন করাও বন্ধ করে দেয়। অবজেক্ট সম্পূর্ণ Immutable হয়ে যায়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // Fails silently in non-strict mode
obj.b = 3; // Fails silently
console.log(obj); // { a: 1 }</code></pre>
      </div>
      <p><em>বিঃদ্রঃ এগুলো শুধু Shallow Freeze করে। নেস্টেড অবজেক্ট এখনও মডিফায়েবল থাকে।</em></p>
    `
  },
  {
    id: "js-44",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security","XSS","DOM Purify"],
    question: "Cross-Site Scripting (XSS) অ্যাটাক প্রতিরোধে innerHTML-এর বদলে innerText / textContent বা Sanitizer API কেন ব্যবহার করা উচিত?",
    answer: `
      <p><strong>Cross-Site Scripting (XSS)</strong> হলো এমন একটি অ্যাটাক যেখানে অ্যাটাকার আপনার ওয়েবসাইটে বিপজ্জনক জাভাস্ক্রিপ্ট ইনজেক্ট করে। যখন আমরা ইউজারের দেওয়া ইনপুট সরাসরি <code>innerHTML</code> দিয়ে DOM-এ রেন্ডার করি, তখন ইনপুটের ভেতরের <code>&lt;script&gt;</code> ট্যাগ বা ইভেন্ট হ্যান্ডলার সরাসরি এক্সিকিউট হয়ে যায়।</p>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li><strong>textContent / innerText:</strong> ইউজার ইনপুট টেক্সট হিসেবে রেন্ডার করতে এগুলো ব্যবহার করা উচিত। এগুলো HTML ট্যাগকে প্লেইন টেক্সট হিসেবে দেখায়, এক্সিকিউট করে না।</li>
        <li><strong>Sanitizer API:</strong> আধুনিক ব্রাউজারে বিল্ট-ইন <code>Sanitizer</code> API ব্যবহার করে HTML ট্যাগ সেফ করে নেওয়া যায় (যেমন- DOMPurify লাইব্রেরির মতো)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const userInput = "&lt;img src='x' onerror='alert(1)'&gt;";

// DANGEROUS: Will execute the JS code
document.body.innerHTML = userInput; 

// SAFE: Will display the string exactly as text
document.body.textContent = userInput; 

// SAFE HTML: Using Sanitizer API
const cleanHTML = new Sanitizer().sanitizeFor('div', userInput);
document.body.append(cleanHTML);</code></pre>
      </div>
    `
  },
  {
    id: "js-45",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Web APIs","Intersection Observer","Lazy Loading"],
    question: "Intersection Observer API দিয়ে ইমেজ লেজি লোডিং এবং ইনফিনিট স্ক্রলিং কীভাবে বাস্তবায়িত হয়?",
    answer: `
      <p><strong>Intersection Observer API</strong> হলো ব্রাউজারের একটি নেটিভ টুল যা কোনো এলিমেন্ট ভিউপোর্টের (Viewport) ভেতরে বা বাইরে অবস্থান করছে কিনা তা অ্যাসিনক্রোনাসভাবে ট্র্যাক করে। এটি স্ক্রোল ইভেন্টের চেয়ে অনেক বেশি পারফরম্যান্ট।</p>
      <h4>লেজি লোডিং ও ইনফিনিট স্ক্রোল:</h4>
      <p>ইমেজের <code>src</code> এ না দিয়ে <code>data-src</code> এ রাখা হয়। যখন ইমেজ বা লোডার এলিমেন্ট ভিউপোর্টে ঢুকে (Intersect করে), তখন জাভাস্ক্রিপ্ট <code>data-src</code> থেকে ভ্যালু এনে <code>src</code> তে বসিয়ে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Load the image
      observer.unobserve(img);   // Stop observing once loaded
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});</code></pre>
      </div>
    `
  },
  {
    id: "js-46",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web APIs","Mutation Observer","DOM"],
    question: "MutationObserver API দিয়ে DOM সাব-ট্রি পরিবর্তন বা Attribute Modification কীভাবে ট্র্যাক করবেন?",
    answer: `
      <p><strong>MutationObserver</strong> হলো এমন একটি Web API যা দিয়ে DOM ট্রি-তে যেকোনো পরিবর্তন (যেমন- নতুন নোড যুক্ত হওয়া, টেক্সট পরিবর্তন, বা এট্রিবিউট পরিবর্তন) অ্যাসিনক্রোনাসভাবে ট্র্যাক করা যায়। এটি ডিপ্রেকেটেড Mutation Events-এর চেয়ে অনেক বেশি পারফরম্যান্ট।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const targetNode = document.getElementById('app');

// Configuration: What to observe
const config = { 
  attributes: true, 
  childList: true, 
  subtree: true 
};

const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
});

observer.observe(targetNode, config);
// observer.disconnect(); // To stop observing</code></pre>
      </div>
    `
  },
  {
    id: "js-47",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Web APIs","Resize Observer","Responsive"],
    question: "ResizeObserver API দিয়ে এলিমেন্টের নিজস্ব সাইজ পরিবর্তন কীভাবে ডিটেক্ট করবেন?",
    answer: `
      <p>সাধারণত উইন্ডো রিসাইজ (<code>window.onresize</code>) ডিটেক্ট করা যায়, কিন্তু নির্দিষ্ট কোনো <code>div</code> বা এলিমেন্টের সাইজ পরিবর্তন হলে তা ডিটেক্ট করা কঠিন। <strong>ResizeObserver</strong> API যেকোনো এলিমেন্টের সাইজ পরিবর্তন রিয়েল-টাইমে ট্র্যাক করতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    console.log('Element size changed:', width, 'x', height);
    
    // Dynamic adjustment based on size
    if (width < 600) {
      entry.target.classList.add('mobile-view');
    }
  }
});

// Start observing an element
resizeObserver.observe(document.querySelector('.dynamic-container'));</code></pre>
      </div>
    `
  },
  {
    id: "js-48",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["JavaScript","Promise","Error Handling","Senior"],
    question: "Promise Chain-এ Error Propagation কীভাবে কাজ করে? .catch()-এর অবস্থান কেন গুরুত্বপূর্ণ?",
    answer: `
      <p>একটি Promise chain-এ যেকোনো <code>.then()</code>-এ এরর থ্রো হলে, সেটি চেইনের পরবর্তী <code>.then()</code>-গুলো সব <strong>skip করে সরাসরি নিকটতম <code>.catch()</code></strong>-এ চলে যায় — এই propagation বোঝা না থাকলে erratic bug হতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>fetchUser(id)
  .then(user => {
    if (!user) throw new Error('User not found');   // এখানে থ্রো হলো
    return fetchOrders(user.id);
  })
  .then(orders => {
    console.log(orders);   // ⏭️ এই .then() স্কিপ হয়ে যাবে
    return processOrders(orders);
  })
  .then(result => console.log(result))   // ⏭️ এটিও স্কিপ
  .catch(err => console.error('চেইনের যেকোনো ধাপের এরর এখানে ধরা পড়বে:', err.message));</code></pre>
      </div>
      <h4>.catch()-এর অবস্থান কেন গুরুত্বপূর্ণ — মাঝপথে বসালে</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>fetchUser(id)
  .then(user => { if (!user) throw new Error('Not found'); return user; })
  .catch(err => {
    console.error('ধরা পড়ল:', err.message);
    return null;   // ⚠️ catch থেকে রিটার্ন করলে chain "সুস্থ" হয়ে যায়
  })
  .then(user => {
    console.log(user);   // null — এরর হ্যান্ডেল হয়ে গেছে, এই .then() স্বাভাবিকভাবে চলবে
  });
// catch()-এর পরের .then() সবসময় চলবে, যদি না catch() নিজেই আবার থ্রো করে</code></pre>
      </div>
      <p><strong>গুরুত্বপূর্ণ নিয়ম:</strong> একটি <code>.catch()</code> একটি এরর "সামলে নিলে" (কোনো নতুন এরর থ্রো না করে normal ভ্যালু রিটার্ন করলে), চেইন আবার স্বাভাবিক প্রবাহে ফিরে যায় — এর পরের <code>.then()</code> চলবে যেন কোনো এরর হয়ইনি।</p>
      <h4>async/await-এ সমতুল্য আচরণ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>try {
  const user = await fetchUser(id);
  if (!user) throw new Error('User not found');
  const orders = await fetchOrders(user.id);   // user না থাকলে এই লাইনে পৌঁছাবেই না
  console.log(orders);
} catch (err) {
  console.error('একই আচরণ:', err.message);   // try ব্লকের যেকোনো await-এর এরর এখানে ধরা পড়ে
}</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক .catch() একটি চেইনে ব্যবহার করলে কী হয় — কখন এটি প্রয়োজনীয়?</li>
      </ul>
    `
  },
  {
    id: "js-49",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Modules","ESM vs CJS","Dynamic Import"],
    question: "ES Modules (import/export) vs CommonJS (require/module.exports) এবং Dynamic import() কেন প্রয়োজন?",
    answer: `
      <p><strong>CommonJS (CJS):</strong> এটি Node.js-এর পুরোনো সিস্টেম। এটি সিঙ্ক্রোনাস এবং রান-টাইমে কোড লোড করে (<code>require()</code>)। এটি ডাইনামিক লোডিং সাপোর্ট করে কিন্তু Tree Shaking (অব্যবহৃত কোড বাদ দেওয়া) করতে পারে না।</p>
      <p><strong>ES Modules (ESM):</strong> এটি আধুনিক স্ট্যান্ডার্ড (<code>import/export</code>)। এটি কম্পাইল-টাইমে স্ট্যাটিকভাবে অ্যানালাইস হয়, ফলে Webpack/Vite খুব সহজে Tree Shaking করতে পারে।</p>
      <p><strong>Dynamic Import (<code>import()</code>):</strong> কখনো কখনো শুরুতে সব মডিউল লোড না করে প্রয়োজনের সময় লোড করতে হয় (Code Splitting)। ESM-এ স্ট্যাটিক <code>import</code> টপ-লেভেলে থাকতে হয়, কিন্তু <code>import()</code> এক্সপ্রেশন যেকোনো জায়গায় অ্যাসিনক্রোনাসভাবে কল করা যায় এবং এটি একটি Promise রিটার্ন করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>if (userRole === 'admin') {
  // Dynamically loaded only when needed
  import('./adminModule.js').then(module => {
    module.loadDashboard();
  });
}</code></pre>
      </div>
    `
  },
  {
    id: "js-50",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security","Prototype Pollution","Object.create"],
    question: "Prototype Pollution Attack কী এবং Object.create(null) দিয়ে এটি কীভাবে আটকাবেন?",
    answer: `
      <p><strong>Prototype Pollution</strong> হলো একটি সিকিউরিটি ভালনারেবিলিটি যেখানে অ্যাটাকার গ্লোবাল <code>Object.prototype</code>-এ নতুন প্রপার্টি ইনজেক্ট করে দেয়। ফলে পুরো অ্যাপ্লিকেশনের সকল অবজেক্ট সেই প্রপার্টি ইনহেরিট করে ফেলে, যা লজিক ভেঙে দিতে পারে।</p>
      <h4>প্রতিরোধের উপায়:</h4>
      <p>যখন ইউজার ইনপুট থেকে অবজেক্ট তৈরি করা হয় (যেমন- JSON পার্স করে), তখন <code>Object.create(null)</code> ব্যবহার করা উচিত। এটি এমন একটি অবজেক্ট তৈরি করে যার কোনো <code>[[Prototype]]</code> বা <code>__proto__</code> নেই। ফলে কেউ এর ভেতর দিয়ে গ্লোবাল প্রোটোটাইপ পালিউট করতে পারে না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Vulnerable way (Normal object)
const obj1 = {};
obj1.__proto__.isAdmin = true; // Pollutes all objects!

// Safe way (Null prototype object)
const obj2 = Object.create(null);
obj2.__proto__.isAdmin = true; // TypeError: Cannot set property 'isAdmin' of undefined</code></pre>
      </div>
    `
  }
];
