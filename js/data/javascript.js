const javascriptInterviewQuestions = [
	{
		id: "js-1",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Basics", "Programming Language"],
		question: "JavaScript কী?",
		answer: `JavaScript হলো একটি high-level, dynamically typed, multi-paradigm programming language।

এটি মূলত web browser-এ interactive functionality তৈরির জন্য তৈরি হলেও বর্তমানে browser ছাড়াও Node.js-এর মাধ্যমে backend, CLI, desktop এবং server-side application তৈরি করা যায়।

JavaScript-এর গুরুত্বপূর্ণ বৈশিষ্ট্য:

- Dynamically typed
- Interpreted/JIT compiled
- Single-threaded execution model
- Event-driven
- Asynchronous programming support
- Object-oriented এবং functional programming support
- Prototype-based inheritance

Browser-এ JavaScript সাধারণত JavaScript Engine যেমন Chrome-এর V8-এর মাধ্যমে execute হয়।`,
	},

	{
		id: "js-2",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["ECMAScript", "JavaScript"],
		question: "JavaScript এবং ECMAScript-এর মধ্যে পার্থক্য কী?",
		answer: `ECMAScript হলো JavaScript language-এর specification বা standard।

JavaScript হলো ECMAScript specification-এর একটি implementation।

সহজভাবে:

ECMAScript = Standard
JavaScript = Implementation

Example:

ECMAScript specification define করে:

- let
- const
- Promise
- class
- modules
- async/await

Browser এবং Node.js তাদের নিজস্ব JavaScript runtime-এর মাধ্যমে এই specification implement করে।`,
	},

	{
		id: "js-3",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Variables", "let", "const", "var"],
		question: "var, let এবং const-এর মধ্যে পার্থক্য কী?",
		answer: `var:

- Function scoped
- Redeclare করা যায়
- Hoisting হয়
- পুরনো JavaScript code-এ বেশি দেখা যায়

let:

- Block scoped
- Redeclare করা যায় না একই scope-এ
- Reassign করা যায়

const:

- Block scoped
- Redeclare করা যায় না
- Reassign করা যায় না

Example:

let age = 30;
age = 31;

const name = "Nazmul";

const-এর object property পরিবর্তন করা যায়:

const user = { name: "A" };
user.name = "B";

কারণ const reference পরিবর্তন করতে দেয় না; object-এর internal mutation prevent করে না।

Modern JavaScript-এ সাধারণত let এবং const ব্যবহার করা উচিত।`,
	},

	{
		id: "js-4",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Data Types"],
		question: "JavaScript-এর data types কী কী?",
		answer: `JavaScript-এর primitive data types:

1. string
2. number
3. bigint
4. boolean
5. undefined
6. symbol
7. null

এছাড়া object হলো non-primitive/reference type।

Example:

let name = "Nazmul";       // string
let age = 30;              // number
let active = true;         // boolean
let x;                     // undefined
let value = null;          // null
let id = 123n;             // bigint
let key = Symbol("id");    // symbol

let user = {};             // object`,
	},

	{
		id: "js-5",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Primitive", "Reference"],
		question: "Primitive এবং Reference type-এর মধ্যে পার্থক্য কী?",
		answer: `Primitive value সাধারণত value হিসেবে কাজ করে।

Example:

let a = 10;
let b = a;

b = 20;

এখানে a থাকবে 10।

Object/Array-এর ক্ষেত্রে variable object-এর reference ধরে।

Example:

const a = { name: "A" };
const b = a;

b.name = "B";

এখন a.name-ও "B" হবে।

কারণ a এবং b একই object reference-কে point করছে।

তাই object copy করতে shallow বা deep copy technique প্রয়োজন হতে পারে।`,
	},

	{
		id: "js-6",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Type Coercion", "Types"],
		question: "Type coercion কী?",
		answer: `JavaScript যখন automatically এক data type-কে অন্য type-এ convert করে, তাকে type coercion বলে।

Example:

"5" + 2

Result:

"52"

কারণ + operator string concatenation করতে পারে।

কিন্তু:

"5" - 2

Result:

3

কারণ - operator numeric conversion করে।

Explicit conversion:

Number("10")
String(10)
Boolean(1)

Implicit coercion interview-এ খুব গুরুত্বপূর্ণ কারণ এটি unexpected result তৈরি করতে পারে।`,
	},

	{
		id: "js-7",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Equality", "Comparison"],
		question: "== এবং === এর মধ্যে পার্থক্য কী?",
		answer: `== loose equality।

এটি comparison-এর আগে type coercion করতে পারে।

Example:

"5" == 5

true

=== strict equality।

এখানে value এবং type দুটোই match করতে হয়।

"5" === 5

false

Production code-এ সাধারণত === prefer করা হয় কারণ এটি predictable।

একইভাবে:

!=

এর পরিবর্তে সাধারণত:

!==

ব্যবহার করা হয়।`,
	},

	{
		id: "js-8",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Truthy", "Falsy"],
		question: "Truthy এবং Falsy value কী?",
		answer: `JavaScript-এর কিছু value boolean context-এ false হিসেবে evaluate হয়।

Falsy values-এর মধ্যে গুরুত্বপূর্ণ:

false
0
-0
0n
""
null
undefined
NaN

বাকি সাধারণ values truthy।

Example:

if ("hello") {
  // execute
}

if (0) {
  // execute হবে না
}

Object এবং Array empty হলেও truthy:

Boolean({}) // true
Boolean([]) // true`,
	},

	{
		id: "js-9",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["null", "undefined"],
		question: "null এবং undefined-এর মধ্যে পার্থক্য কী?",
		answer: `undefined সাধারণত বোঝায় value assign করা হয়নি বা value পাওয়া যায়নি।

Example:

let user;
console.log(user);

undefined

null সাধারণত intentionally empty value বোঝাতে ব্যবহার করা হয়।

Example:

let selectedUser = null;

অর্থাৎ বর্তমানে কোনো user selected নেই।

দুটো একই নয়:

typeof undefined
→ "undefined"

typeof null
→ "object"

শেষের behaviour JavaScript-এর পুরনো language quirk।`,
	},

	{
		id: "js-10",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["NaN", "Number"],
		question: "NaN কী?",
		answer: `NaN = Not-a-Number।

Numeric operation-এর result valid number না হলে NaN পাওয়া যেতে পারে।

Example:

Number("hello")

→ NaN

NaN-এর একটি গুরুত্বপূর্ণ বিষয়:

NaN === NaN

false

NaN check করার জন্য:

Number.isNaN(value)

ব্যবহার করা ভালো।

Global isNaN() আগে type coercion করতে পারে, তাই Number.isNaN() সাধারণত বেশি predictable।`,
	},

	{
		id: "js-11",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Scope"],
		question: "JavaScript-এ scope কী?",
		answer: `Scope হলো কোনো variable কোথা থেকে access করা যাবে তার নির্ধারিত boundary।

প্রধান scope:

1. Global Scope
2. Function Scope
3. Block Scope
4. Module Scope

let এবং const block scoped।

var function scoped।

Example:

if (true) {
  let x = 10;
}

console.log(x);

এখানে x access করা যাবে না কারণ x block scope-এর মধ্যে আছে।`,
	},

	{
		id: "js-12",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Lexical Scope", "Scope"],
		question: "Lexical Scope কী?",
		answer: `Lexical scope হলো code কোথায় লেখা হয়েছে তার উপর variable access নির্ধারিত হওয়া।

Example:

const name = "Nazmul";

function outer() {
  function inner() {
    console.log(name);
  }

  inner();
}

inner() function তার নিজের scope-এ name না পেলেও outer lexical environment এবং তারপর global scope-এ খুঁজবে।

JavaScript runtime scope lookup lexical structure অনুসরণ করে।`,
	},

	{
		id: "js-13",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Hoisting", "Execution"],
		question: "Hoisting কী?",
		answer: `JavaScript execution-এর আগে declarations-এর জন্য environment তৈরি করে।

এটিকে সাধারণভাবে hoisting বলা হয়।

var:

console.log(x);
var x = 10;

এখানে error না হয়ে undefined পাওয়া যায়।

let/const-এর declaration scope-এ থাকে কিন্তু initialization declaration-এর জায়গায় না পৌঁছানো পর্যন্ত access করলে Temporal Dead Zone-এর কারণে ReferenceError হয়।

Function declaration:

hello();

function hello() {
  console.log("Hello");
}

এটি কাজ করে কারণ function declaration execution-এর আগে available থাকে।`,
	},

	{
		id: "js-14",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Temporal Dead Zone", "let", "const"],
		question: "Temporal Dead Zone বা TDZ কী?",
		answer: `let এবং const variable declaration-এর scope-এর শুরু থেকে declaration execute হওয়া পর্যন্ত যে সময়টায় variable access করা যায় না, সেটি Temporal Dead Zone।

Example:

console.log(name);

let name = "Nazmul";

এখানে ReferenceError হবে।

কারণ name scope-এ exist করে কিন্তু initialization এখনো হয়নি।

এটি var-এর behaviour থেকে একটি গুরুত্বপূর্ণ পার্থক্য।`,
	},

	{
		id: "js-15",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Execution Context", "Runtime"],
		question: "Execution Context কী?",
		answer: `Execution Context হলো JavaScript code execute করার জন্য runtime environment।

প্রধান ধরনের execution context:

1. Global Execution Context
2. Function Execution Context
3. Eval Execution Context

একটি execution context-এর মধ্যে সাধারণভাবে থাকে:

- Variable Environment
- Lexical Environment
- This binding

Function call হলে নতুন function execution context তৈরি হয়।

Execution contexts call stack-এ manage হয়।`,
	},

	{
		id: "js-16",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Call Stack", "Execution"],
		question: "Call Stack কী?",
		answer: `Call Stack হলো JavaScript-এর synchronous function execution track করার stack।

Example:

function a() {
  b();
}

function b() {
  c();
}

function c() {}

a();

Stack:

a()
 ↓
b()
 ↓
c()

c শেষ হলে pop হবে।

Stack overflow হতে পারে যদি recursion-এর depth অত্যন্ত বেশি হয়।

Example:

function infinite() {
  infinite();
}

এতে শেষ পর্যন্ত Maximum call stack size exceeded error হতে পারে।`,
	},

	{
		id: "js-17",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Closure", "Functions"],
		question: "Closure কী?",
		answer: `Closure হলো এমন function যা তার outer lexical scope-এর variables মনে রাখতে পারে, এমনকি outer function execution শেষ হয়ে গেলেও।

Example:

function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const increment = counter();

increment(); // 1
increment(); // 2

এখানে returned function count variable-এর access ধরে রাখে।

Closure ব্যবহৃত হয়:

- Data privacy
- Factory function
- Memoization
- Callback
- Function state
- Module pattern

Closure interview-এর সবচেয়ে গুরুত্বপূর্ণ JavaScript topics-এর একটি।`,
	},

	{
		id: "js-18",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Function", "First Class"],
		question: "JavaScript-এ first-class function কী?",
		answer: `JavaScript-এ function একটি normal value-এর মতো behave করে।

Function:

- Variable-এ assign করা যায়
- Argument হিসেবে পাঠানো যায়
- Return করা যায়
- Object property হিসেবে রাখা যায়
- Array-এর element হতে পারে

Example:

const greet = function () {
  return "Hello";
};

function execute(fn) {
  return fn();
}

execute(greet);

এই capability functional programming-এর foundation।`,
	},

	{
		id: "js-19",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Higher Order Function"],
		question: "Higher-order function কী?",
		answer: `যে function অন্য function-কে argument হিসেবে নেয় অথবা function return করে তাকে higher-order function বলা হয়।

Example:

function calculate(fn, value) {
  return fn(value);
}

const double = x => x * 2;

calculate(double, 5);

Array-এর map, filter, reduce-ও higher-order function-এর common example।`,
	},

	{
		id: "js-20",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Callback", "Async"],
		question: "Callback function কী?",
		answer: `যে function অন্য function-এর argument হিসেবে পাঠানো হয় এবং পরে execute করা হয় তাকে callback বলে।

Example:

function processUser(name, callback) {
  callback(name);
}

processUser("Nazmul", function (name) {
  console.log(name);
});

Callback synchronous বা asynchronous দুটোই হতে পারে।

Asynchronous callback-এর example:

setTimeout(() => {
  console.log("Done");
}, 1000);`,
	},

	{
		id: "js-21",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Callback Hell", "Async"],
		question: "Callback Hell কী এবং কীভাবে solve করবেন?",
		answer: `অনেক nested callback-এর কারণে code deeply nested এবং difficult to maintain হলে তাকে callback hell বলা হয়।

Example structure:

doA(() => {
  doB(() => {
    doC(() => {
      doD(() => {});
    });
  });
});

Problems:

- Readability কম
- Error handling কঠিন
- Maintenance কঠিন
- Control flow বুঝতে সমস্যা

Solutions:

- Promise
- async/await
- Separate functions
- Proper error handling

Modern JavaScript-এ async/await সাধারণত সবচেয়ে readable solution।`,
	},

	{
		id: "js-22",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Promise", "Async"],
		question: "Promise কী?",
		answer: `Promise হলো asynchronous operation-এর eventual result represent করার object।

Promise-এর তিনটি state:

1. Pending
2. Fulfilled
3. Rejected

Example:

const promise = fetch("/api/users");

promise
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

Pending:
→ কাজ চলছে

Fulfilled:
→ সফল

Rejected:
→ ব্যর্থ

Promise callback-based asynchronous code-এর তুলনায় cleaner composition এবং error propagation দেয়।`,
	},

	{
		id: "js-23",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["async", "await", "Promise"],
		question: "async/await কীভাবে কাজ করে?",
		answer: `async function সবসময় একটি Promise return করে।

await Promise-এর result পাওয়ার জন্য async function-এর execution suspend করে, কিন্তু JavaScript runtime পুরো thread block করে না।

Example:

async function getUser() {
  const response = await fetch("/api/user");
  const user = await response.json();

  return user;
}

Error handling:

async function getUser() {
  try {
    const response = await fetch("/api/user");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async/await Promise-এর উপর built।`,
	},

	{
		id: "js-24",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Promise.all", "Concurrency"],
		question: "Promise.all কী?",
		answer: `Promise.all একাধিক Promise concurrently execute করে এবং সবগুলো fulfilled হলে result array দেয়।

Example:

const [users, products] = await Promise.all([
  getUsers(),
  getProducts()
]);

যদি একটি Promise reject করে, Promise.all reject হবে।

Sequential:

const users = await getUsers();
const products = await getProducts();

Concurrent:

const [users, products] = await Promise.all([
  getUsers(),
  getProducts()
]);

Independent I/O operation-এর ক্ষেত্রে concurrency latency কমাতে পারে।`,
	},

	{
		id: "js-25",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Promise.allSettled", "Promise"],
		question: "Promise.allSettled কী?",
		answer: `Promise.allSettled সব Promise-এর execution শেষ হওয়া পর্যন্ত অপেক্ষা করে, কোনো Promise reject করলেও।

Example:

const results = await Promise.allSettled([
  task1(),
  task2(),
  task3()
]);

Result প্রতিটির status দেয়:

{
  status: "fulfilled",
  value: ...
}

অথবা:

{
  status: "rejected",
  reason: ...
}

যখন প্রতিটি operation-এর result independently দরকার এবং একটি failure-এর কারণে অন্য result হারাতে চান না, তখন allSettled useful।`,
	},

	{
		id: "js-26",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Promise.race", "Promise.any"],
		question: "Promise.race এবং Promise.any-এর মধ্যে পার্থক্য কী?",
		answer: `Promise.race:

যে Promise প্রথম settle করে, তার result নেয়।

অর্থাৎ fulfilled অথবা rejected—দুটোর যেটা আগে হয়।

Promise.any:

যে Promise প্রথম fulfilled হয় তার result নেয়।

সবগুলো reject করলে AggregateError দেয়।

Example use case:

Promise.race:
→ Timeout mechanism

Promise.any:
→ Multiple fallback servers থেকে প্রথম successful response`,
	},

	{
		id: "js-27",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Event Loop", "Async"],
		question: "JavaScript Event Loop কী?",
		answer: `JavaScript synchronous code Call Stack-এ execute করে।

Asynchronous operation browser/runtime-এর APIs দ্বারা handle হতে পারে।

তারপর callback/task queue-তে আসে এবং Event Loop দেখে Call Stack empty হলে appropriate task execution-এর জন্য নেয়।

Simplified flow:

Call Stack
   ↓
Web APIs / Runtime
   ↓
Queues
   ↓
Event Loop
   ↓
Call Stack

এই mechanism-এর মাধ্যমে JavaScript single-threaded execution model-এর মধ্যেও asynchronous কাজ handle করতে পারে।`,
	},

	{
		id: "js-28",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Microtask", "Macrotask", "Event Loop"],
		question: "Microtask এবং Macrotask কী?",
		answer: `Common microtask-এর মধ্যে Promise callbacks এবং queueMicrotask() থাকে।

Common task/macrotask examples:

- setTimeout
- setInterval
- কিছু runtime scheduling APIs

Simplified ordering:

1. Current synchronous code
2. Microtasks
3. Next task

Example:

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

Expected:

A
D
C
B

কারণ Promise callback microtask queue-তে যায় এবং সাধারণভাবে timer task-এর আগে process হয়।`,
	},

	{
		id: "js-29",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Event Loop", "Interview Trap"],
		question: "setTimeout(..., 0) কি সঙ্গে সঙ্গে execute হয়?",
		answer: `না।

setTimeout(fn, 0) মানে callback-এর minimum scheduling delay শূন্যের কাছাকাছি হতে পারে; এটি immediate execution guarantee করে না।

Callback আগে task queue-তে যেতে পারে।

Current synchronous code শেষ হওয়ার পরে এবং relevant microtasks process হওয়ার পরে callback execute হওয়ার সুযোগ পায়।

তাই:

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

Result:

A
C
B`,
	},

	{
		id: "js-30",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["this", "Context"],
		question: "JavaScript-এ this কী?",
		answer: `this-এর value function কীভাবে call করা হয়েছে তার উপর নির্ভর করে; arrow function-এর ক্ষেত্রে lexical this ব্যবহৃত হয়।

Example:

const user = {
  name: "Nazmul",
  getName() {
    return this.name;
  }
};

user.getName();

এখানে this সাধারণভাবে user object-কে refer করে।

কিন্তু method আলাদা করে assign করলে:

const fn = user.getName;

fn();

এখানে this আর user নাও হতে পারে, call context-এর উপর নির্ভর করবে।

Arrow function নিজের this তৈরি করে না; outer lexical context থেকে নেয়।`,
	},

	{
		id: "js-31",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["call", "apply", "bind"],
		question: "call, apply এবং bind-এর মধ্যে পার্থক্য কী?",
		answer: `তিনটিই function-এর this/context control করতে ব্যবহৃত হয়।

call:

function.call(thisArg, arg1, arg2)

apply:

function.apply(thisArg, [arg1, arg2])

bind:

function.bind(thisArg)

bind নতুন function return করে; সঙ্গে সঙ্গে execute করে না।

Example:

function greet(city) {
  return this.name + " " + city;
}

const user = { name: "Nazmul" };

greet.call(user, "Dhaka");
greet.apply(user, ["Dhaka"]);

const bound = greet.bind(user);
bound("Dhaka");`,
	},

	{
		id: "js-32",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Arrow Function", "Functions"],
		question: "Arrow function এবং normal function-এর মধ্যে পার্থক্য কী?",
		answer: `Arrow function:

- নিজের this নেই
- নিজের arguments binding নেই
- Constructor হিসেবে ব্যবহার করা যায় না
- Short syntax

Example:

const add = (a, b) => a + b;

Normal function:

function add(a, b) {
  return a + b;
}

সব জায়গায় arrow function ব্যবহার করা উচিত নয়।

বিশেষ করে object method বা constructor semantics দরকার হলে normal function প্রয়োজন হতে পারে।`,
	},

	{
		id: "js-33",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Rest", "Spread"],
		question: "Rest এবং Spread operator কী?",
		answer: `দুটির syntax একই: ...

কিন্তু কাজ আলাদা।

Rest:

Multiple values collect করে।

function sum(...numbers) {
  return numbers;
}

Spread:

Iterable/object-এর values expand করে।

const a = [1, 2];
const b = [...a, 3];

Object:

const user = { name: "A" };
const updated = { ...user, age: 30 };

Rest → collect

Spread → expand`,
	},

	{
		id: "js-34",
		category: "JavaScript",
		difficulty: "Beginner",
		tags: ["Destructuring", "Object", "Array"],
		question: "Destructuring কী?",
		answer: `Array বা object থেকে value সহজে extract করার syntax হলো destructuring।

Object:

const user = {
  name: "Nazmul",
  age: 30
};

const { name, age } = user;

Array:

const numbers = [10, 20];

const [first, second] = numbers;

Function parameters-এর ক্ষেত্রেও destructuring করা যায়।

এটি modern JavaScript code-কে concise করে।`,
	},

	{
		id: "js-35",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Shallow Copy", "Deep Copy"],
		question: "Shallow copy এবং Deep copy কী?",
		answer: `Shallow copy top-level properties copy করে কিন্তু nested object-এর reference share করতে পারে।

Example:

const original = {
  user: {
    name: "A"
  }
};

const copy = { ...original };

copy.user.name = "B";

Nested object-এর কারণে original.user.name-ও পরিবর্তিত হতে পারে।

Deep copy nested structure-ও independently copy করে।

Modern JavaScript-এ structuredClone() অনেক সাধারণ data structure-এর জন্য deep cloning-এর একটি built-in option।

তবে functions, DOM objects, class instances ইত্যাদির জন্য cloning requirements আলাদা হতে পারে।`,
	},

	{
		id: "js-36",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Mutation", "Immutability"],
		question: "Mutable এবং Immutable data কী?",
		answer: `Mutable object/array তৈরি হওয়ার পরে পরিবর্তন করা যায়।

Example:

const user = { name: "A" };
user.name = "B";

Immutable approach-এ existing value mutate না করে নতুন value তৈরি করা হয়।

Example:

const updatedUser = {
  ...user,
  name: "B"
};

React এবং state management-এ immutability বিশেষভাবে গুরুত্বপূর্ণ কারণ change detection সহজ হয়।`,
	},

	{
		id: "js-37",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Array", "map", "filter", "reduce"],
		question: "map, filter এবং reduce-এর পার্থক্য কী?",
		answer: `map:

প্রতিটি element transform করে নতুন array দেয়।

[1,2,3].map(x => x * 2)

filter:

Condition অনুযায়ী elements select করে।

[1,2,3].filter(x => x > 1)

reduce:

একাধিক value থেকে একটি accumulated result তৈরি করতে পারে।

[1,2,3].reduce((sum, x) => sum + x, 0)

সহজভাবে:

map → transform
filter → select
reduce → accumulate`,
	},

	{
		id: "js-38",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Array", "Iteration"],
		question: "forEach এবং map-এর মধ্যে পার্থক্য কী?",
		answer: `forEach মূলত প্রতিটি element-এর জন্য callback execute করে।

map নতুন transformed array return করে।

Example:

const result = numbers.map(x => x * 2);

এখানে result নতুন array।

forEach:

numbers.forEach(x => {
  console.log(x);
});

forEach সাধারণত transformation-এর জন্য নয়।

map chainable এবং transformation-oriented।`,
	},

	{
		id: "js-39",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Array", "sort"],
		question: "JavaScript-এর sort() নিয়ে common সমস্যা কী?",
		answer: `Default sort lexicographically বা string comparison-এর মতো আচরণ করতে পারে।

Example:

[10, 2, 5].sort();

Unexpected order পাওয়া যেতে পারে কারণ values string-এর মতো compare হতে পারে।

Numeric sorting:

numbers.sort((a, b) => a - b);

Descending:

numbers.sort((a, b) => b - a);

Large production dataset sort করার সময় algorithmic complexity এবং mutation behavior-ও consider করতে হবে।`,
	},

	{
		id: "js-40",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Object", "Reference"],
		question: "Object comparison কেন tricky?",
		answer: `দুটি object একই properties/value রাখলেও reference আলাদা হলে strict equality false হবে।

Example:

{} === {}

false

কারণ দুইটি আলাদা object।

const a = { x: 1 };
const b = a;

a === b

true

কারণ দুটো একই object reference।

Object content compare করতে application requirement অনুযায়ী:

- Specific fields compare
- Deep equality utility
- Serialization
- Structured comparison

ব্যবহার করা যায়।`,
	},

	{
		id: "js-41",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Prototype", "Inheritance"],
		question: "Prototype কী?",
		answer: `JavaScript-এর object অন্য object-এর properties/methods prototype chain-এর মাধ্যমে access করতে পারে।

Example:

const user = {
  name: "Nazmul"
};

Object.getPrototypeOf(user)

এই prototype chain-এর মাধ্যমে inherited properties পাওয়া যায়।

JavaScript traditional class-based inheritance-এর পরিবর্তে prototype-based inheritance ব্যবহার করে।

class syntax থাকলেও underlying object model prototype-based।`,
	},

	{
		id: "js-42",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Prototype Chain", "Inheritance"],
		question: "Prototype Chain কী?",
		answer: `কোনো object-এর property নিজের মধ্যে না থাকলে JavaScript তার prototype-এ খোঁজে।

তারপর prototype-এর prototype-এ খুঁজতে পারে।

Example:

object
 ↓
prototype
 ↓
prototype's prototype
 ↓
null

এই lookup chain-কে prototype chain বলা হয়।

যদি কোথাও property পাওয়া যায় না এবং chain null পর্যন্ত পৌঁছে যায়, সাধারণত property access undefined দেয়।`,
	},

	{
		id: "js-43",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["class", "OOP"],
		question: "JavaScript class কী?",
		answer: `class হলো object creation এবং inheritance লেখার একটি cleaner syntax।

Example:

class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return this.name;
  }
}

const user = new User("Nazmul");

class syntax ব্যবহার করলেও JavaScript-এর inheritance model prototype-based।`,
	},

	{
		id: "js-44",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["new", "Constructor"],
		question: "new keyword কীভাবে কাজ করে?",
		answer: `new constructor/class call করলে সাধারণভাবে কয়েকটি গুরুত্বপূর্ণ step ঘটে:

1. নতুন object তৈরি হয়
2. object-এর prototype constructor-এর prototype-এর সাথে যুক্ত হয়
3. constructor this-এর সাথে execute হয়
4. constructor যদি explicit object return না করে, newly created object result হয়

Example:

function User(name) {
  this.name = name;
}

const user = new User("Nazmul");

এখানে user নতুন object।`,
	},

	{
		id: "js-45",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Generator", "Iterator"],
		question: "Generator function কী?",
		answer: `Generator function function* syntax ব্যবহার করে এবং yield দিয়ে execution pause করতে পারে।

Example:

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = numbers();

generator.next();
generator.next();

প্রতিবার next() call করলে পরবর্তী yield পর্যন্ত execution চলে।

Generator useful:

- Lazy computation
- Custom iteration
- Large data processing
- Controlled execution flow`,
	},

	{
		id: "js-46",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Iterator", "Symbol.iterator"],
		question: "Iterator কী?",
		answer: `Iterator এমন object যার next() method থাকে এবং প্রতিবার next() call করলে একটি result object দেয়।

Result সাধারণত:

{
  value: ...,
  done: false
}

যে object iterable, সেটিকে for...of, spread ইত্যাদিতে ব্যবহার করা যায়।

Array, String, Map এবং Set built-in iterable examples।

Custom iterable তৈরি করতে Symbol.iterator implement করা যায়।`,
	},

	{
		id: "js-47",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Map", "Set"],
		question: "Map এবং Object-এর মধ্যে পার্থক্য কী?",
		answer: `Map:

- যেকোনো value key হিসেবে ব্যবহার করতে পারে
- size property আছে
- Iteration-friendly
- Dedicated map operations আছে

Object:

- মূলত key-value structure
- Keys সাধারণত string বা symbol
- Prototype-related behavior থাকতে পারে

Map useful যখন:

- Dynamic key-value collection
- Frequent insertion/deletion
- Arbitrary key types
- Clear iteration semantics

Object useful যখন:

- Structured record/data model represent করতে হয়।`,
	},

	{
		id: "js-48",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["WeakMap", "Garbage Collection"],
		question: "WeakMap এবং WeakSet কী?",
		answer: `WeakMap object keys-এর জন্য weak references রাখে।

WeakSet object values রাখে এবং weakly references them।

এগুলো garbage collection-এর সাথে কাজ করার জন্য useful হতে পারে।

Common use case:

- Object-associated metadata
- Caching without unnecessarily keeping objects alive

WeakMap সাধারণভাবে iterable নয় এবং normal Map-এর মতো সব operations support করে না।

Weak শব্দটি বোঝায় reference structure object-এর garbage collection prevent করার জন্য strong ownership তৈরি করে না।`,
	},

	{
		id: "js-49",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Symbol", "Object"],
		question: "Symbol কী?",
		answer: `Symbol হলো unique primitive value।

Example:

const id1 = Symbol("id");
const id2 = Symbol("id");

id1 === id2

false

Symbol object-এর unique property key হিসেবে ব্যবহার করা যায়।

Example:

const ID = Symbol("id");

const user = {
  [ID]: 123
};

Symbol collision avoid এবং কিছু meta-level protocol implement করতে useful।`,
	},

	{
		id: "js-50",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Proxy", "Reflect"],
		question: "Proxy কী?",
		answer: `Proxy object-এর operations intercept করতে দেয়।

যেমন:

- get
- set
- deleteProperty
- has
- construct

Example:

const user = {
  name: "Nazmul"
};

const proxy = new Proxy(user, {
  get(target, property) {
    return target[property];
  }
});

Proxy ব্যবহার করা হয়:

- Validation
- Logging
- Access control
- Reactive systems
- Meta-programming

Reflect API proxy handlers-এর ভিতরে default object operation করার জন্য useful।`,
	},

	{
		id: "js-51",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Memory", "Garbage Collection"],
		question: "JavaScript memory management কীভাবে কাজ করে?",
		answer: `JavaScript runtime সাধারণভাবে automatically memory manage করে।

Simplified lifecycle:

Allocate
 ↓
Use
 ↓
No longer reachable
 ↓
Garbage Collection

Memory areas-এর implementation engine-specific হলেও সাধারণভাবে:

- Stack → execution-related data
- Heap → objects/dynamic data

Developer-এর মূল responsibility:

- Unnecessary references না রাখা
- Event listeners clean করা
- Timers clear করা
- Large caches control করা
- Long-lived closures carefully ব্যবহার করা

Memory management implementation V8-এর মতো engine-এর উপর নির্ভর করে।`,
	},

	{
		id: "js-52",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Garbage Collection", "Memory Leak"],
		question: "JavaScript memory leak কী?",
		answer: `যখন application-এর আর প্রয়োজন নেই এমন object-এর reference accidentally ধরে রাখে এবং ফলে garbage collector সেটি reclaim করতে পারে না, তখন memory leak হতে পারে।

Common causes:

- Unremoved event listeners
- Uncleared timers
- Global variables
- Growing cache
- Detached DOM references
- Long-lived closures
- Subscription cleanup না করা

Production application-এ memory leak detect করতে heap snapshot এবং runtime memory profiling ব্যবহার করা যায়।`,
	},

	{
		id: "js-53",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Debounce", "Performance"],
		question: "Debouncing কী?",
		answer: `Debounce এমন technique যেখানে continuous events-এর মধ্যে নির্দিষ্ট সময় কোনো নতুন event না এলে function execute করা হয়।

Example:

Search input:

User types:
J
Ja
Jav
Java
JavaS
...

প্রতিটি keystroke-এ API call না করে user typing stop করার পরে API call করা যায়।

Useful:

- Search
- Resize
- Auto-save
- Validation

এতে unnecessary function execution কমে।`,
	},

	{
		id: "js-54",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Throttle", "Performance"],
		question: "Throttling কী?",
		answer: `Throttle নির্দিষ্ট time interval-এর মধ্যে function execution frequency সীমিত করে।

Example:

scroll event প্রতি millisecond-এ fire হতে পারে।

Throttle করলে:

প্রতি 100ms-এ সর্বোচ্চ একবার handler execute হবে।

Useful:

- Scroll
- Mouse movement
- Resize
- Continuous browser events

Debounce:
→ শেষ event-এর পরে execute

Throttle:
→ নির্দিষ্ট interval-এ execute`,
	},

	{
		id: "js-55",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Memoization", "Performance"],
		question: "Memoization কী?",
		answer: `Memoization হলো expensive function-এর previous result cache করে রাখা।

Example:

function expensiveCalculation(input) {
  // expensive operation
}

প্রথমবার:

input → calculate → result → cache

পরেরবার একই input:

input → cache → result

Useful:

- Expensive calculations
- Repeated computation
- Recursive algorithms

তবে cache unbounded হলে memory issue হতে পারে।`,
	},

	{
		id: "js-56",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Modules", "ESM", "CommonJS"],
		question: "ES Module এবং CommonJS-এর মধ্যে পার্থক্য কী?",
		answer: `ES Module:

import
export

Example:

import { add } from "./math.js";

export function add(a, b) {
  return a + b;
}

CommonJS:

require
module.exports

Example:

const math = require("./math");

module.exports = math;

ESM modern JavaScript standard module system।

CommonJS historically Node.js ecosystem-এ widely used।

Modern Node.js ESM এবং CommonJS দুটোই support করে, তবে project configuration অনুযায়ী behavior নির্ধারিত হয়।`,
	},

	{
		id: "js-57",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Error Handling", "try-catch"],
		question: "JavaScript-এ exception handling কীভাবে করা হয়?",
		answer: `try/catch/finally ব্যবহার করা হয়।

Example:

try {
  riskyOperation();
} catch (error) {
  console.error(error);
} finally {
  cleanup();
}

throw দিয়ে custom error তৈরি করা যায়:

throw new Error("Something went wrong");

Async code-এ:

try {
  await operation();
} catch (error) {
  // handle error
}

Production code-এ error silently swallow না করে proper logging, classification এবং response strategy রাখা উচিত।`,
	},

	{
		id: "js-58",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Optional Chaining", "Nullish Coalescing"],
		question: "Optional chaining এবং nullish coalescing কী?",
		answer: `Optional chaining:

?.

Nested property safely access করতে সাহায্য করে।

const city = user?.address?.city;

যদি intermediate value null/undefined হয়, error না দিয়ে undefined দিতে পারে।

Nullish coalescing:

??

শুধু null অথবা undefined হলে fallback নেয়।

const name = user.name ?? "Unknown";

এটি || থেকে আলাদা।

0, false এবং "" nullish নয়।

তাই:

0 ?? 10

→ 0

0 || 10

→ 10`,
	},

	{
		id: "js-59",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Web API", "Fetch", "HTTP"],
		question: "fetch API কী?",
		answer: `fetch HTTP request করার জন্য modern Promise-based API।

Example:

const response = await fetch("/api/users");

const data = await response.json();

Important:

fetch HTTP 404/500 পেলেই automatically reject করে না।

Network-level failure হলে Promise reject হতে পারে।

তাই response.ok বা response.status check করা উচিত।

Example:

if (!response.ok) {
  throw new Error("Request failed");
}`,
	},

	{
		id: "js-60",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["AbortController", "Fetch"],
		question: "AbortController কী?",
		answer: `AbortController asynchronous operation cancel করার জন্য ব্যবহার করা যায়।

Example:

const controller = new AbortController();

fetch("/api/users", {
  signal: controller.signal
});

controller.abort();

Useful:

- User দ্রুত search change করলে previous request cancel
- Component unmount cleanup
- Request timeout/cancellation
- Avoid unnecessary network work

Modern frontend এবং Node.js HTTP programming-এ এটি গুরুত্বপূর্ণ।`,
	},

	{
		id: "js-61",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["DOM", "Browser"],
		question: "DOM কী?",
		answer: `DOM = Document Object Model।

Browser HTML document-কে object/tree structure হিসেবে represent করে।

Example:

HTML
 ↓
Document
 ↓
html
 ├── head
 └── body
     └── div

JavaScript DOM ব্যবহার করে:

- Element select
- Content change
- Attribute change
- Event attach
- Element create/delete

করতে পারে।`,
	},

	{
		id: "js-62",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Event Bubbling", "DOM"],
		question: "Event Bubbling কী?",
		answer: `Event target element থেকে তার parent elements-এর দিকে propagate করলে তাকে bubbling বলে।

Example:

div
 └── button

Button click হলে event:

button
 ↓
div
 ↓
body
 ↓
document

Event bubbling-এর কারণে parent element-এ event listener দিয়ে child event handle করা যায়।

এটি event delegation-এর foundation।`,
	},

	{
		id: "js-63",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Event Capturing", "DOM"],
		question: "Event Capturing কী?",
		answer: `Event target-এ পৌঁছানোর আগে outer element থেকে inner target-এর দিকে propagate করলে capturing phase বলা হয়।

Simplified:

Capturing:

document
 ↓
body
 ↓
div
 ↓
button

Target phase-এর পরে bubbling phase-এ reverse direction-এ event propagate করতে পারে।

addEventListener-এর third parameter/options দিয়ে capture phase configure করা যায়।`,
	},

	{
		id: "js-64",
		category: "JavaScript",
		difficulty: "Intermediate",
		tags: ["Event Delegation", "DOM"],
		question: "Event Delegation কী?",
		answer: `প্রতিটি child element-এ আলাদা listener না দিয়ে parent element-এ একটি listener ব্যবহার করাকে event delegation বলে।

Example:

<ul id="users">
  <li>User 1</li>
  <li>User 2</li>
</ul>

ul-এ একটি click listener দিয়ে child li-এর event handle করা যায়।

Benefits:

- Fewer event listeners
- Dynamic elements support
- Better memory usage
- Cleaner code

Event bubbling এখানে গুরুত্বপূর্ণ ভূমিকা রাখে।`,
	},

	{
		id: "js-65",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["CORS", "Browser Security"],
		question: "CORS কী?",
		answer: `CORS = Cross-Origin Resource Sharing।

Browser security policy অনুযায়ী এক origin-এর frontend অন্য origin-এর resource access করতে গেলে server appropriate CORS headers দিয়ে permission দিতে পারে।

Example:

Frontend:
https://app.example.com

API:
https://api.example.com

এগুলো different origins হতে পারে।

Server response-এ:

Access-Control-Allow-Origin

ইত্যাদি headers থাকতে পারে।

CORS browser-enforced policy; এটি server-to-server communication-এর একই restriction নয়।`,
	},

	{
		id: "js-66",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["XSS", "Security"],
		question: "XSS কী?",
		answer: `XSS = Cross-Site Scripting।

যখন attacker-এর malicious script application-এর trusted page context-এ execute হয়ে যায়, XSS vulnerability হতে পারে।

Common types:

- Stored XSS
- Reflected XSS
- DOM-based XSS

Prevention:

- Proper output encoding
- Safe DOM APIs
- Avoid unsafe HTML injection
- Content Security Policy
- Input validation যেখানে appropriate
- Framework-এর escaping mechanism follow করা

User-controlled HTML render করার ক্ষেত্রে বিশেষ সতর্কতা দরকার।`,
	},

	{
		id: "js-67",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Prototype Pollution", "Security"],
		question: "Prototype Pollution কী?",
		answer: `Prototype pollution হলো এমন vulnerability যেখানে attacker JavaScript object prototype-এর properties manipulate করতে সক্ষম হয় এবং এর ফলে অন্য objects unexpected inherited properties পেতে পারে।

Risky patterns:

- Unsafe object merging
- Untrusted keys
- Deep assignment without validation

Prevention:

- Untrusted object keys validate করা
- Safe merge libraries/pattern ব্যবহার
- __proto__, constructor, prototype-related dangerous paths carefully handle করা
- Dependency updates রাখা

এটি Node.js এবং browser JavaScript দুটো ecosystem-এই relevant হতে পারে।`,
	},

	{
		id: "js-68",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Web Worker", "Concurrency"],
		question: "Web Worker কী?",
		answer: `Web Worker browser-এর main UI thread-এর বাইরে JavaScript code execute করতে দেয়।

Useful:

- CPU-intensive calculation
- Large data processing
- Parsing
- Heavy computation

Main thread
    |
    | message
    ↓
Web Worker
    |
    | result
    ↓
Main thread

Worker এবং main thread সাধারণত message passing-এর মাধ্যমে communicate করে।

এতে heavy computation-এর কারণে UI blocking কমানো যায়।`,
	},

	{
		id: "js-69",
		category: "JavaScript",
		difficulty: "Advanced",
		tags: ["Concurrency", "Parallelism"],
		question: "Concurrency এবং Parallelism-এর মধ্যে পার্থক্য কী?",
		answer: `Concurrency মানে multiple tasks-এর progress overlap করতে পারে।

Parallelism মানে multiple tasks একই সময়ে physically execute হতে পারে, সাধারণত multiple CPU cores/threads ব্যবহার করে।

JavaScript-এর main execution model traditionally single-threaded।

কিন্তু runtime environment:

- Web Workers
- Node.js worker_threads
- OS-level processes

ইত্যাদির মাধ্যমে parallel computation সম্ভব।

Async I/O concurrency এবং CPU parallelism এক জিনিস নয়।`,
	},

	{
		id: "js-70",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Performance", "Event Loop"],
		question: "CPU-intensive কাজ JavaScript main thread-এ করলে সমস্যা কী?",
		answer: `JavaScript synchronous CPU-heavy code Call Stack-কে দীর্ঘ সময় ব্যস্ত রাখতে পারে।

Example:

Large loop
 ↓
CPU-heavy calculation
 ↓
Main thread blocked
 ↓
UI/input/network callbacks delayed

Browser-এ এতে UI freeze হতে পারে।

Solutions:

- Web Worker
- Break work into chunks
- Scheduling/yielding
- Server-side processing
- WASM যেখানে appropriate

Node.js-এ CPU-heavy কাজ event loop block করলে অন্যান্য request-এর latency বেড়ে যেতে পারে।`,
	},

	{
		id: "js-71",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Performance", "Big O"],
		question: "JavaScript code-এর performance কীভাবে analyze করবেন?",
		answer: `প্রথমে algorithmic complexity দেখতে হবে।

Common:

O(1)
O(log n)
O(n)
O(n log n)
O(n²)

তারপর runtime-specific bottleneck identify করতে হবে।

Consider:

- CPU usage
- Memory
- Network
- DOM operations
- Serialization
- Database/API latency
- Garbage collection
- Bundle size

Browser-এ DevTools Performance এবং Memory tools ব্যবহার করা যায়।

Node.js-এ profiling এবং runtime metrics ব্যবহার করা যায়।

Blind optimization না করে measurement-based optimization করা উচিত।`,
	},

	{
		id: "js-72",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Closure", "Memory", "Interview Scenario"],
		question: "Closure কীভাবে memory leak তৈরি করতে পারে?",
		answer: `Closure নিজে memory leak নয়।

কিন্তু একটি long-lived object যদি closure-এর মাধ্যমে বড় data structure reference করে রাখে এবং সেই reference আর প্রয়োজন না থাকলেও release না হয়, memory unnecessarily retained হতে পারে।

Example scenario:

Large object
 ↓
Long-lived callback
 ↓
Closure
 ↓
Large object retained

Solution:

- Unnecessary references remove করা
- Event listener cleanup
- Timer cleanup
- Subscription cleanup
- Cache lifecycle control

Memory profiler দিয়ে actual retention path verify করা উচিত।`,
	},

	{
		id: "js-73",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Async", "Race Condition"],
		question: "JavaScript-এ race condition কী?",
		answer: `একাধিক asynchronous operation একই shared state-এর উপর কাজ করলে এবং result কোনটি আগে complete করছে তার উপর final state depend করলে race condition হতে পারে।

Example:

Request A → slow
Request B → fast

B আগে result দিল।
তারপর A late result দিয়ে নতুন state overwrite করল।

যদি A-এর result পুরনো হয়, তাহলে incorrect state হতে পারে।

Solutions:

- Abort previous request
- Request ID/version check
- Sequence number
- State validation
- Proper synchronization strategy`,
	},

	{
		id: "js-74",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Promise", "Concurrency", "Interview Scenario"],
		question: "একসাথে 1000টি API request করা কি ভালো?",
		answer: `সরাসরি 1000 request Promise.all() দিয়ে পাঠানো সবসময় ভালো design নয়।

Problems:

- Network saturation
- Server overload
- Browser connection limits
- Memory usage
- Rate limiting
- Failure amplification

Better approach:

Concurrency limit ব্যবহার করা।

Example conceptual flow:

1000 tasks
 ↓
10/20/50 concurrent tasks
 ↓
Next batch
 ↓
Continue

Production systems-এ controlled concurrency, retry এবং backoff ব্যবহার করা ভালো।`,
	},

	{
		id: "js-75",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Architecture", "Async"],
		question:
			"একটি production JavaScript application-এর জন্য async error handling কীভাবে design করবেন?",
		answer: `Error handling layer-wise হওয়া উচিত।

Low-level:

try/catch

Service-level:

Domain-specific errors

API-level:

Proper HTTP status এবং response

Global-level:

Centralized error handling/logging

Example:

Controller
 ↓
Service
 ↓
Repository
 ↓
Database

Error নিচ থেকে উপরে propagate হতে পারে।

Production-এ:

- Sensitive error client-কে expose না করা
- Structured logging
- Correlation/request ID
- Error classification
- Monitoring/alerting

রাখা উচিত।`,
	},

	{
		id: "js-76",
		category: "JavaScript",
		difficulty: "Senior",
		tags: ["Senior", "Architecture"],
		question: "JavaScript application scalable করার জন্য কী কী consider করবেন?",
		answer: `Scale করার আগে bottleneck identify করতে হবে।

Important areas:

Frontend:

- Code splitting
- Lazy loading
- Caching
- Memoization
- Bundle optimization
- Rendering optimization

Backend/Node.js:

- Non-blocking I/O
- Connection pooling
- Caching
- Horizontal scaling
- Worker processes
- Queue-based background jobs

General:

- Database optimization
- CDN
- Observability
- Rate limiting
- Load balancing
- Fault tolerance

Architecture business requirements অনুযায়ী design করতে হবে।`,
	},
];
