const javascriptInterviewQuestions = [
  {
    id: "js-1",
    category: "JavaScript",
    difficulty: "Basic",
    tags: ["JavaScript", "Runtime"],
    question: "JavaScript কী এবং কীভাবে কাজ করে?",
    answer: `JavaScript হলো একটি high-level, dynamically typed, multi-paradigm programming language।

Browser-এ JavaScript সাধারণত JavaScript Engine-এর মাধ্যমে execute হয়।

উদাহরণ:
Chrome → V8
Firefox → SpiderMonkey
Safari → JavaScriptCore

Basic execution flow:

JavaScript Code
      ↓
Parser
      ↓
AST
      ↓
Interpreter / Compiler
      ↓
Machine Code
      ↓
CPU

Modern JavaScript engine Just-In-Time (JIT) compilation ব্যবহার করে performance improve করে।

JavaScript single-threaded হলেও asynchronous operation-এর মাধ্যমে network request, timer, file operation ইত্যাদি handle করতে পারে।`
  },

  {
    id: "js-2",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["var", "let", "const", "Scope"],
    question: "var, let এবং const-এর মধ্যে পার্থক্য কী?",
    answer: `var:
- Function scoped
- Re-declare করা যায়
- Re-assign করা যায়
- Hoisting হয় এবং initial value হিসেবে undefined থাকে

let:
- Block scoped
- Re-declare করা যায় না একই scope-এ
- Re-assign করা যায়
- Temporal Dead Zone থাকে

const:
- Block scoped
- Re-declare করা যায় না
- Re-assign করা যায় না
- Temporal Dead Zone থাকে

উদাহরণ:

let age = 30;
age = 31; // valid

const name = "Nazmul";
name = "ABC"; // Error

তবে const object-এর property পরিবর্তন করা যায়:

const user = {
  name: "Nazmul"
};

user.name = "Rahim"; // valid

কারণ const reference পরিবর্তন করতে দেয় না, object-এর internal state পরিবর্তন আটকায় না।`
  },

  {
    id: "js-3",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Scope", "Lexical Scope"],
    question: "JavaScript-এ Scope কী?",
    answer: `Scope হলো কোন variable কোথা থেকে access করা যাবে তার boundary।

JavaScript-এর প্রধান scope:

1. Global Scope
2. Function Scope
3. Block Scope
4. Module Scope

উদাহরণ:

let a = 10;

function test() {
  let b = 20;

  if (true) {
    let c = 30;
  }
}

এখানে:
a → global/module scope
b → function scope
c → block scope

let এবং const block scoped।
var function scoped।`
  },

  {
    id: "js-4",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Hoisting", "Execution Context"],
    question: "Hoisting কী?",
    answer: `Hoisting হলো JavaScript execution-এর আগে declarations-এর জন্য environment তৈরি করার behavior।

উদাহরণ:

console.log(a);
var a = 10;

Output:
undefined

কিন্তু:

console.log(b);
let b = 10;

এখানে ReferenceError হবে কারণ let Temporal Dead Zone-এর মধ্যে থাকে।

Function declaration:

sayHello();

function sayHello() {
  console.log("Hello");
}

এটি কাজ করবে।

Interview-এ মনে রাখতে হবে:
Hoisting মানে code physically উপরে move করা নয়; JavaScript engine execution context তৈরি করার সময় declarations register করে।`
  },

  {
    id: "js-5",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["TDZ", "let", "const"],
    question: "Temporal Dead Zone বা TDZ কী?",
    answer: `let এবং const variable scope-এ enter করার পর declaration execute হওয়ার আগের সময়কে Temporal Dead Zone বলে।

উদাহরণ:

console.log(name);

let name = "Nazmul";

এখানে ReferenceError হবে।

কারণ name scope-এর মধ্যে আছে কিন্তু declaration line execute হয়নি।

TDZ accidental variable access prevent করে এবং code safer করে।`
  },

  {
    id: "js-6",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Primitive", "Reference", "Data Types"],
    question: "JavaScript-এর data types কী কী?",
    answer: `JavaScript-এর primitive types:

1. String
2. Number
3. BigInt
4. Boolean
5. Undefined
6. Null
7. Symbol

Non-primitive/reference type:
- Object

Array, Function, Date, Map, Set ইত্যাদি technically object category-এর মধ্যে পড়ে।

Example:

let name = "Nazmul";       // String
let age = 30;              // Number
let active = true;         // Boolean
let x;                     // Undefined
let value = null;          // Null
let id = 123n;             // BigInt
let key = Symbol("id");    // Symbol`
  },

  {
    id: "js-7",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Equality", "Type Coercion"],
    question: "== এবং === এর মধ্যে পার্থক্য কী?",
    answer: `== এবং === দুটোই equality check করে।

==:
Type coercion করতে পারে।

5 == "5"
→ true

===:
Type এবং value দুটোই check করে।

5 === "5"
→ false

Best practice:
সাধারণত === এবং !== ব্যবহার করা উচিত কারণ এটি implicit type coercion-এর unexpected behavior কমায়।`
  },

  {
    id: "js-8",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["Type Coercion"],
    question: "Type coercion কী?",
    answer: `এক type-এর value অন্য type-এ automatically বা explicitly convert হওয়াকে type coercion বলে।

Implicit:

"5" + 2
→ "52"

"5" - 2
→ 3

Explicit:

Number("5")
String(100)
Boolean(1)

Interview-এ বুঝতে হবে + operator string থাকলে concatenation করতে পারে, কিন্তু - সাধারণত numeric conversion-এর দিকে যায়।`
  },

  {
    id: "js-9",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["null", "undefined"],
    question: "null এবং undefined-এর মধ্যে পার্থক্য কী?",
    answer: `undefined:
সাধারণত value assign করা হয়নি বা property পাওয়া যায়নি।

let x;
console.log(x);
// undefined

null:
Developer ইচ্ছাকৃতভাবে empty/no-value বোঝাতে assign করে।

let user = null;

তাই:
undefined → value missing/not initialized
null → intentional absence of value

একটি historical JavaScript behavior:
typeof null
→ "object"

এটি JavaScript-এর পুরনো legacy behavior।`
  },

  {
    id: "js-10",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Execution Context", "Call Stack"],
    question: "Execution Context কী?",
    answer: `Execution Context হলো JavaScript code execute করার environment।

প্রধান ধরনের execution context:

1. Global Execution Context
2. Function Execution Context
3. Eval Execution Context

প্রতিটি execution context-এর মধ্যে সাধারণত:
- Variable Environment
- Lexical Environment
- This binding

Function call হলে নতুন function execution context তৈরি হয় এবং Call Stack-এ push হয়।`
  },

  {
    id: "js-11",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Call Stack", "Runtime"],
    question: "Call Stack কী?",
    answer: `Call Stack হলো JavaScript runtime-এর একটি stack data structure যেখানে currently executing function-এর execution context রাখা হয়।

Example:

function one() {
  two();
}

function two() {
  console.log("Hello");
}

one();

Flow:

one()
 ↓
two()
 ↓
console.log()
 ↓
return
 ↓
two()
 ↓
one()

JavaScript-এর main execution thread single call stack ব্যবহার করে।`
  },

  {
    id: "js-12",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Closure", "Scope"],
    question: "Closure কী?",
    answer: `Closure হলো এমন function যা নিজের outer lexical scope-এর variables মনে রাখতে পারে, এমনকি outer function execution শেষ হওয়ার পরও।

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

এখানে inner function count variable-এর access ধরে রেখেছে।

Closure-এর common use:
- Data encapsulation
- Private state
- Function factories
- Callbacks
- Memoization
- Event handlers`
  },

  {
    id: "js-13",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["this", "Object"],
    question: "JavaScript-এ this কী?",
    answer: `this-এর value function কীভাবে call হয়েছে তার উপর নির্ভর করে।

Object method:

const user = {
  name: "Nazmul",
  getName() {
    return this.name;
  }
};

user.getName();
// Nazmul

Regular function-এর this strict mode এবং call context অনুযায়ী পরিবর্তিত হতে পারে।

Arrow function-এর নিজের this নেই। এটি surrounding lexical context থেকে this নেয়।

এই কারণে callback এবং object method-এর মধ্যে arrow function ব্যবহার করার সময় সতর্ক হতে হয়।`
  },

  {
    id: "js-14",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Arrow Function", "this"],
    question: "Arrow function এবং regular function-এর মধ্যে পার্থক্য কী?",
    answer: `Arrow function:

const add = (a, b) => a + b;

গুরুত্বপূর্ণ পার্থক্য:

1. Arrow function-এর নিজের this নেই।
2. নিজের arguments object নেই।
3. Constructor হিসেবে ব্যবহার করা যায় না।
4. prototype নেই।
5. Lexical this ব্যবহার করে।

Regular function:
- নিজের this binding থাকতে পারে।
- arguments object থাকে।
- new দিয়ে constructor হিসেবে ব্যবহার করা যায়।`
  },

  {
    id: "js-15",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Prototype", "Inheritance"],
    question: "JavaScript Prototype কী?",
    answer: `JavaScript prototype-based inheritance ব্যবহার করে।

প্রতিটি object-এর একটি internal prototype relationship থাকে, যার মাধ্যমে inherited property/method পাওয়া যায়।

Example:

const user = {
  name: "Nazmul"
};

Object.prototype-এর methods যেমন toString() prototype chain-এর মাধ্যমে পাওয়া যায়।

Prototype chain:

object
 ↓
Object.prototype
 ↓
null

Class syntax থাকলেও JavaScript-এর underlying inheritance mechanism prototype-based।`
  },

  {
    id: "js-16",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Prototype Chain", "Inheritance"],
    question: "Prototype Chain কী?",
    answer: `কোনো property object-এ না পাওয়া গেলে JavaScript তার prototype-এ খুঁজে এবং এভাবে উপরের দিকে যেতে থাকে।

Example:

user
 ↓
User.prototype
 ↓
Object.prototype
 ↓
null

যদি user.name পাওয়া না যায়:
1. user
2. user prototype
3. Object.prototype
4. null

এটিই prototype chain।`
  },

  {
    id: "js-17",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Class", "OOP"],
    question: "JavaScript class কীভাবে কাজ করে?",
    answer: `class syntax JavaScript-এ object-oriented programming-এর convenient syntax।

class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return "Hello " + this.name;
  }
}

const user = new User("Nazmul");

Class method সাধারণত prototype-এ থাকে।

অর্থাৎ class syntax ব্যবহার করলেও underlying inheritance prototype-based।`
  },

  {
    id: "js-18",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Destructuring", "ES6"],
    question: "Destructuring কী?",
    answer: `Object বা array থেকে সহজে value বের করার syntax হলো destructuring।

Object:

const user = {
  name: "Nazmul",
  age: 30
};

const { name, age } = user;

Array:

const numbers = [10, 20];

const [a, b] = numbers;

Function parameter-এও ব্যবহার করা যায়:

function greet({ name }) {
  console.log(name);
}

Modern JavaScript এবং React/Node.js code-এ এটি খুব common।`
  },

  {
    id: "js-19",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Spread", "Rest", "ES6"],
    question: "Spread operator এবং Rest operator-এর মধ্যে পার্থক্য কী?",
    answer: `দুটির syntax একই: ...

Spread:
Iterable/object-এর values expand করে।

const a = [1, 2];
const b = [...a, 3];

Rest:
Multiple values collect করে।

function sum(...numbers) {
  return numbers;
}

Spread → expand
Rest → collect

Object:

const user2 = {
  ...user1,
  age: 30
};`
  },

  {
    id: "js-20",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Shallow Copy", "Deep Copy"],
    question: "Shallow copy এবং Deep copy কী?",
    answer: `Shallow copy শুধু top-level properties copy করে।

const user = {
  name: "Nazmul",
  address: {
    city: "Dhaka"
  }
};

const copy = { ...user };

copy.address.city = "Chittagong";

এতে original user-এর nested address-ও পরিবর্তিত হবে।

Deep copy nested structure-ও আলাদা করে copy করে।

Modern approach:
structuredClone(user)

JSON.parse(JSON.stringify(obj)) কিছু ক্ষেত্রে কাজ করলেও Date, undefined, functions, Map, Set ইত্যাদির জন্য reliable general-purpose solution নয়।`
  },

  {
    id: "js-21",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Higher Order Function", "Functional Programming"],
    question: "Higher-Order Function কী?",
    answer: `যে function অন্য function-কে argument হিসেবে নেয় অথবা function return করে তাকে Higher-Order Function বলে।

Example:

function calculate(a, b, operation) {
  return operation(a, b);
}

calculate(5, 3, (a, b) => a + b);

Common built-in HOF:
- map()
- filter()
- reduce()
- forEach()
- some()
- every()
- find()

Functional programming-এ Higher-Order Function খুব গুরুত্বপূর্ণ।`
  },

  {
    id: "js-22",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["map", "filter", "reduce"],
    question: "map(), filter() এবং reduce() এর মধ্যে পার্থক্য কী?",
    answer: `map():
প্রতিটি element transform করে নতুন array return করে।

[1,2,3].map(x => x * 2)
// [2,4,6]

filter():
Condition অনুযায়ী element রেখে নতুন array দেয়।

[1,2,3].filter(x => x > 1)
// [2,3]

reduce():
সব element process করে একটি accumulated result তৈরি করে।

[1,2,3].reduce((sum, x) => sum + x, 0)
// 6

Interview-এ বুঝতে হবে:
map → transform
filter → select
reduce → accumulate`
  },

  {
    id: "js-23",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Async", "Promise"],
    question: "Promise কী?",
    answer: `Promise হলো asynchronous operation-এর eventual success বা failure represent করার object।

Promise-এর তিনটি state:

1. Pending
2. Fulfilled
3. Rejected

Example:

const promise = fetch("/users");

promise
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

Promise callback nesting কমায় এবং asynchronous flow manage করতে সাহায্য করে।`
  },

  {
    id: "js-24",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["async", "await", "Promise"],
    question: "async/await কীভাবে কাজ করে?",
    answer: `async function Promise return করে।

await Promise settle হওয়া পর্যন্ত ওই async function-এর execution pause করে, কিন্তু JavaScript-এর পুরো thread block করে না।

Example:

async function getUsers() {
  const response = await fetch("/users");
  const users = await response.json();

  return users;
}

Error handling:

try {
  const users = await getUsers();
} catch (error) {
  console.error(error);
}

async/await Promise-এর উপর built হওয়া cleaner syntax।`
  },

  {
    id: "js-25",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Event Loop", "Async", "Runtime"],
    question: "Event Loop কী?",
    answer: `JavaScript single-threaded হলেও asynchronous কাজ manage করার mechanism হলো Event Loop।

Main components:

Call Stack
Web APIs / Runtime APIs
Task Queue
Microtask Queue
Event Loop

Example:

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

Output:
A
C
B

কারণ setTimeout callback পরে task queue-তে যায়। Call stack empty হলে event loop callback execute করায়।`
  },

  {
    id: "js-26",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Microtask", "Macrotask", "Promise"],
    question: "Microtask এবং Macrotask-এর মধ্যে পার্থক্য কী?",
    answer: `Microtask-এর উদাহরণ:
- Promise.then()
- Promise.catch()
- queueMicrotask()
- MutationObserver

Task/macrotask-এর উদাহরণ:
- setTimeout()
- setInterval()
- কিছু browser event callbacks

সাধারণভাবে একটি task শেষ হওয়ার পর এবং পরবর্তী task নেওয়ার আগে pending microtasks drain করা হয়।

Example:

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

Output:
A
D
C
B

কারণ Promise callback microtask queue-তে যায় এবং timer callback task queue-তে যায়।`
  },

  {
    id: "js-27",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Promise.all", "Concurrency"],
    question: "Promise.all(), Promise.allSettled(), Promise.race() এবং Promise.any() এর পার্থক্য কী?",
    answer: `Promise.all():
সব Promise সফল হলে result দেয়।
একটি reject হলে পুরো Promise reject হয়।

Promise.allSettled():
সব Promise complete হওয়া পর্যন্ত wait করে এবং প্রতিটির status দেয়।

Promise.race():
যে Promise প্রথম settle করে তার result দেয়।

Promise.any():
যে Promise প্রথম fulfill করে তার result দেয়।
সব reject হলে AggregateError দেয়।

Use case:

Promise.all()
→ independent requests parallelভাবে execute

Promise.allSettled()
→ সব operation-এর result দরকার

Promise.race()
→ timeout বা first-completion pattern

Promise.any()
→ multiple sources-এর মধ্যে প্রথম successful result`
  },

  {
    id: "js-28",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Callback", "Async"],
    question: "Callback কী এবং Callback Hell কী?",
    answer: `Callback হলো একটি function যা অন্য function-এর argument হিসেবে দেওয়া হয় এবং পরে execute করা হয়।

Example:

setTimeout(() => {
  console.log("Done");
}, 1000);

Callback Hell হলো nested callbacks-এর কারণে code deeply nested এবং difficult-to-maintain হয়ে যাওয়া।

Solution:
- Promise
- async/await
- Modular functions
- Proper error handling

Modern JavaScript-এ async/await সাধারণত callback nesting কমায়।`
  },

  {
    id: "js-29",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Debounce", "Performance"],
    question: "Debouncing কী?",
    answer: `Debouncing এমন technique যেখানে continuous events-এর মধ্যে শেষ event-এর পরে নির্দিষ্ট সময় অপেক্ষা করে function execute করা হয়।

Use case:
- Search input
- Auto-save
- Resize event

Example:

User types:
a → ab → abc → abcd

প্রতিবার API call না করে user typing থামার 300ms পরে একবার API call করা।

এতে unnecessary function/API calls কমে।`
  },

  {
    id: "js-30",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Throttle", "Performance"],
    question: "Throttling কী?",
    answer: `Throttle নির্দিষ্ট time interval-এর মধ্যে function সর্বোচ্চ কতবার execute করতে পারবে তা সীমাবদ্ধ করে।

Use case:
- Scroll
- Mouse move
- Resize
- Continuous UI events

Difference:

Debounce:
শেষ event-এর পরে execute।

Throttle:
নির্দিষ্ট interval-এ সর্বোচ্চ একবার execute।

উদাহরণ:
Scroll event প্রতি 100ms-এ সর্বোচ্চ একবার process করা।`
  },

  {
    id: "js-31",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Event Delegation", "DOM"],
    question: "Event Delegation কী?",
    answer: `Parent element-এর event listener ব্যবহার করে child elements-এর events handle করাকে Event Delegation বলে।

কারণ event bubbling-এর মাধ্যমে event parent-এর দিকে যায়।

Example:

list.addEventListener("click", event => {
  if (event.target.matches("button")) {
    // handle
  }
});

সুবিধা:
- অনেক listener attach করতে হয় না।
- Dynamic elements handle করা যায়।
- Memory usage কমতে পারে।

Large dynamic lists-এর জন্য useful।`
  },

  {
    id: "js-32",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Event Bubbling", "Event Capturing"],
    question: "Event Bubbling এবং Event Capturing কী?",
    answer: `Event propagation-এর প্রধান phase:

1. Capturing
2. Target
3. Bubbling

HTML:

<div>
  <button>Click</button>
</div>

Button click করলে event প্রথমে outer থেকে target-এর দিকে capture করতে পারে, তারপর target এবং পরে parent-এর দিকে bubble করে।

Capturing:
Parent → Child

Bubbling:
Child → Parent

addEventListener-এর third argument বা options-এর capture: true ব্যবহার করে capturing phase listen করা যায়।`
  },

  {
    id: "js-33",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["preventDefault", "stopPropagation", "DOM"],
    question: "preventDefault() এবং stopPropagation() এর মধ্যে পার্থক্য কী?",
    answer: `preventDefault():
Browser-এর default behavior prevent করে।

Example:
Form submit prevent করা।

event.preventDefault();

stopPropagation():
Event-এর propagation বন্ধ করে।

event.stopPropagation();

Example:
Child button-এর click parent listener-এ যেতে না দেওয়া।

দুটো এক জিনিস নয়:
preventDefault → default browser action বন্ধ
stopPropagation → event propagation বন্ধ`
  },

  {
    id: "js-34",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Memory", "Garbage Collection"],
    question: "JavaScript Garbage Collection কী?",
    answer: `JavaScript automatic memory management ব্যবহার করে।

যে object আর reachable নয় সেটি garbage collection-এর জন্য eligible হয়।

Concept:

Root
 ↓
Object A
 ↓
Object B

যদি Object A থেকে Object B-এর reference remove হয়ে যায় এবং অন্য কোনো reachable reference না থাকে, তাহলে B garbage collection-এর জন্য eligible হতে পারে।

Modern engines সাধারণত tracing-based garbage collection ব্যবহার করে।

Developer সরাসরি garbage collector control করতে পারে না।`
  },

  {
    id: "js-35",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Memory Leak", "Performance"],
    question: "JavaScript Memory Leak কীভাবে হয়?",
    answer: `Memory leak হলো এমন memory যা application-এর আর প্রয়োজন নেই কিন্তু reference থাকার কারণে garbage collector reclaim করতে পারছে না।

Common causes:
1. Unremoved event listeners
2. Timers/intervals
3. Global variables
4. Large cached objects
5. Closures ধরে রাখা references
6. Detached DOM references

Example:
setInterval(() => {
  // unnecessary reference
}, 1000);

Production application-এ browser memory profiling দিয়ে leak detect করা যায়।`
  },

  {
    id: "js-36",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Module", "ESM", "CommonJS"],
    question: "ES Modules এবং CommonJS-এর মধ্যে পার্থক্য কী?",
    answer: `ES Modules:

export:
export function add() {}

import:
import { add } from "./math.js";

CommonJS:

module.exports = add;

require:
const add = require("./math");

ESM JavaScript-এর standard module system।

CommonJS Node.js ecosystem-এ historically খুব common।

Modern Node.js এবং frontend tooling-এ ESM increasingly common।`
  },

  {
    id: "js-37",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["Optional Chaining", "Nullish Coalescing", "ES2020"],
    question: "Optional chaining এবং Nullish coalescing কী?",
    answer: `Optional chaining:
?. ব্যবহার করে safely nested property access করা যায়।

user?.profile?.address?.city

যদি মাঝখানে null/undefined থাকে তাহলে error না দিয়ে undefined return করতে পারে।

Nullish coalescing:
?? ব্যবহার করে null বা undefined হলে fallback দেওয়া যায়।

const name = user.name ?? "Guest";

এটি || থেকে আলাদা।

0 || 10
→ 10

0 ?? 10
→ 0

কারণ ?? শুধু null এবং undefined-এর জন্য fallback ব্যবহার করে।`
  },

  {
    id: "js-38",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["Map", "Set", "Data Structures"],
    question: "Map এবং Set কী?",
    answer: `Map key-value collection।

const map = new Map();
map.set("id", 10);
map.get("id");

Map-এর key যেকোনো value হতে পারে।

Set unique values store করে।

const set = new Set([1, 2, 2, 3]);

Result:
1, 2, 3

Use case:
Map → structured key-value lookup
Set → uniqueness check / duplicate removal

Object-এর পরিবর্তে Map ব্যবহার করা useful হতে পারে যখন arbitrary key types বা Map-specific operations দরকার হয়।`
  },

  {
    id: "js-39",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["WeakMap", "WeakSet", "Memory"],
    question: "WeakMap এবং WeakSet কী?",
    answer: `WeakMap object keys-এর সাথে value associate করে এবং keys weakly held হয়।

WeakSet object values রাখে এবং weak references ব্যবহার করে।

এগুলোর important property:
- সাধারণ iteration নেই।
- Keys/values garbage collection-এর সাথে compatible।
- Memory-sensitive metadata storage-এ useful হতে পারে।

Example use case:
Object-এর সাথে private metadata associate করা।`
  },

  {
    id: "js-40",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Object", "Immutability"],
    question: "Object.freeze(), Object.seal() এবং Object.preventExtensions() এর পার্থক্য কী?",
    answer: `Object.preventExtensions():
নতুন property add করা যায় না।

Object.seal():
নতুন property add করা যায় না এবং existing property delete করা যায় না।

Object.freeze():
Object-এর own data properties সাধারণভাবে add/delete/change করা যায় না।

তবে এগুলো shallow।

Nested object আলাদা করে freeze না করলে nested object পরিবর্তন হতে পারে।`
  },

  {
    id: "js-41",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Functional Programming", "Pure Function"],
    question: "Pure Function কী?",
    answer: `Pure function-এর দুটি প্রধান property:

1. একই input দিলে সবসময় একই output।
2. External state-এর side effect নেই।

Example:

function add(a, b) {
  return a + b;
}

Impure:

let total = 0;

function addToTotal(value) {
  total += value;
}

Pure functions testing এবং reasoning সহজ করে এবং functional programming-এর গুরুত্বপূর্ণ concept।`
  },

  {
    id: "js-42",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["Currying", "Functional Programming"],
    question: "Currying কী?",
    answer: `একটি multiple-argument function-কে একাধিক single-argument function-এ transform করাকে currying বলে।

Normal:

function add(a, b) {
  return a + b;
}

Curried:

function add(a) {
  return function(b) {
    return a + b;
  };
}

add(5)(3);
// 8

Functional programming এবং reusable function তৈরি করতে currying ব্যবহার করা যায়।`
  },

  {
    id: "js-43",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Memoization", "Performance"],
    question: "Memoization কী?",
    answer: `Expensive function-এর previous result cache করে রাখাকে memoization বলে।

Example concept:

calculate(10)
→ calculate

calculate(10)
→ cached result

এতে একই input-এর জন্য expensive calculation পুনরায় করতে হয় না।

Use case:
- Expensive calculations
- Recursive algorithms
- Derived data

তবে cache size এবং invalidation বিবেচনা করতে হবে।`
  },

  {
    id: "js-44",
    category: "JavaScript",
    difficulty: "Important",
    tags: ["Error Handling", "try-catch"],
    question: "JavaScript-এ Error Handling কীভাবে করা হয়?",
    answer: `Common mechanisms:

try
catch
finally
throw

Example:

try {
  riskyOperation();
} catch (error) {
  console.error(error);
} finally {
  cleanup();
}

Custom error:

throw new Error("Invalid user");

Async/await:

try {
  await apiCall();
} catch (error) {
  // handle error
}

Production application-এ error log, meaningful response এবং sensitive internal details hide করা গুরুত্বপূর্ণ।`
  },

  {
    id: "js-45",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Security", "XSS"],
    question: "XSS কী এবং JavaScript application কীভাবে protect করবেন?",
    answer: `XSS = Cross-Site Scripting।

Attacker malicious script inject করে এবং victim-এর browser-এ execute করানোর চেষ্টা করে।

Protection:
1. User input properly validate।
2. Output context অনুযায়ী encode।
3. Dangerous HTML injection avoid।
4. Content Security Policy ব্যবহার।
5. Trusted sanitization library ব্যবহার যেখানে HTML allow করতে হয়।
6. Cookies-এ HttpOnly/Secure/SameSite ব্যবহার যেখানে appropriate।

React-এর default rendering অনেক ক্ষেত্রে HTML escape করে, কিন্তু dangerouslySetInnerHTML-এর মতো API ব্যবহার করলে extra care দরকার।`
  },

  {
    id: "js-46",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["CORS", "Browser", "Security"],
    question: "CORS কী?",
    answer: `CORS = Cross-Origin Resource Sharing।

Browser security policy অনুযায়ী একটি origin থেকে অন্য origin-এর resource access করার permission server response headers দিয়ে control করা হয়।

Example:

Frontend:
https://app.example.com

API:
https://api.example.com

Server trusted origin allow করতে পারে।

CORS browser-enforced policy।

এটি authentication system-এর replacement নয় এবং server-to-server requests-এ browser CORS restriction একইভাবে apply করে না।`
  },

  {
    id: "js-47",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Storage", "Browser"],
    question: "localStorage, sessionStorage এবং cookies-এর মধ্যে পার্থক্য কী?",
    answer: `localStorage:
- Browser-এ persistent storage
- Expire হয় না যতক্ষণ না manually clear করা হয়
- Server-এ automatically পাঠানো হয় না

sessionStorage:
- Tab/session-এর সাথে associated
- Tab/session শেষ হলে সাধারণত clear হয়
- Server-এ automatically পাঠানো হয় না

Cookies:
- ছোট data
- Request-এর সাথে automatically পাঠানো হতে পারে
- Expiration এবং security attributes থাকে

Authentication-এর ক্ষেত্রে sensitive session identifiers-এর জন্য HttpOnly + Secure + appropriate SameSite cookie ব্যবহার করা অনেক ক্ষেত্রে safer approach হতে পারে।`
  },

  {
    id: "js-48",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Web API", "Fetch", "HTTP"],
    question: "fetch() কী এবং কীভাবে error handle করবেন?",
    answer: `fetch() HTTP request করার জন্য Promise-based Web API।

Example:

const response = await fetch("/users");

if (!response.ok) {
  throw new Error("Request failed");
}

const data = await response.json();

গুরুত্বপূর্ণ:
fetch() HTTP 4xx/5xx response পেলেই automatically reject করে না।

Network failure হলে Promise reject হতে পারে।

তাই response.ok/status explicitly check করা উচিত।`
  },

  {
    id: "js-49",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Async", "Concurrency"],
    question: "Sequential এবং Parallel asynchronous execution-এর মধ্যে পার্থক্য কী?",
    answer: `Sequential:

const a = await getA();
const b = await getB();

এখানে B শুরু হবে A শেষ হওয়ার পরে।

Parallel/concurrent start:

const [a, b] = await Promise.all([
  getA(),
  getB()
]);

যদি A এবং B একে অপরের উপর dependent না হয় তাহলে Promise.all() latency কমাতে পারে।

তবে dependency থাকলে sequential execution দরকার হতে পারে।`
  },

  {
    id: "js-50",
    category: "JavaScript",
    difficulty: "Very Important",
    tags: ["Interview", "Advanced", "Runtime"],
    question: "JavaScript interview-এর জন্য কোন concepts সবচেয়ে গুরুত্বপূর্ণ?",
    answer: `Senior/Mid-level JavaScript interview-এর জন্য নিচের topics অবশ্যই strong হতে হবে:

Core:
1. var / let / const
2. Scope
3. Hoisting
4. TDZ
5. Data Types
6. Type Coercion
7. == vs ===
8. Execution Context
9. Call Stack
10. this
11. Closure
12. Prototype
13. Prototype Chain
14. Class
15. Object/Array

ES6+:
16. Destructuring
17. Spread/Rest
18. Template literals
19. Default parameters
20. Modules
21. Optional chaining
22. Nullish coalescing
23. Map/Set
24. Symbols

Async:
25. Callback
26. Promise
27. async/await
28. Event Loop
29. Microtask vs Task
30. Promise.all/allSettled/race/any
31. Sequential vs parallel execution

Functional:
32. Higher-order function
33. map/filter/reduce
34. Closure
35. Pure function
36. Currying
37. Memoization

Browser:
38. DOM
39. Event bubbling/capturing
40. Event delegation
41. preventDefault
42. localStorage/sessionStorage/cookies
43. CORS
44. Fetch
45. Web APIs

Performance:
46. Debounce
47. Throttle
48. Memory management
49. Garbage collection
50. Memory leak

Security:
51. XSS
52. CSRF
53. CORS
54. Secure cookies
55. Input validation

Advanced:
56. Prototype inheritance
57. Generators
58. Iterators
59. Symbols
60. WeakMap/WeakSet
61. Proxy
62. Reflect
63. TypedArray
64. AbortController
65. Web Workers

সবচেয়ে বেশি interview value:
Closure
→ this
→ Prototype
→ Hoisting
→ Event Loop
→ Promise
→ async/await
→ Microtask
→ Call Stack
→ Scope
→ Debounce/Throttle
→ Shallow/Deep Copy
→ map/filter/reduce
→ Event Delegation
→ Memory Leak
→ CORS/XSS
→ ES Modules`
  },
  {
    id: "js-61",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Iterator", "ES6"],
    question: "Iterator কী?",
    answer: `Iterator হলো এমন object যার next() method থাকে এবং প্রতিবার next() call করলে পরবর্তী value return করে।

Iterator-এর next() সাধারণত এই structure return করে:

{
  value: ...,
  done: false
}

Example:

const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

iterator.next();
// { value: 10, done: false }

iterator.next();
// { value: 20, done: false }

iterator.next();
// { value: 30, done: false }

iterator.next();
// { value: undefined, done: true }

Array, String, Map, Set ইত্যাদি iterable এবং তাদের iterator পাওয়া যায় Symbol.iterator-এর মাধ্যমে।`
  },

  {
    id: "js-62",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Iterable", "Iterator", "Symbol"],
    question: "Iterable এবং Iterator-এর মধ্যে পার্থক্য কী?",
    answer: `Iterable হলো এমন object যেটির Symbol.iterator method আছে।

Iterator হলো এমন object যার next() method আছে।

Example:

const numbers = [1, 2, 3];

numbers
→ Iterable

numbers[Symbol.iterator]()
→ Iterator

Iterator-এর next() method দিয়ে একে একে values পাওয়া যায়।

for...of loop internally iterable-এর iterator ব্যবহার করে।`
  },

  {
    id: "js-63",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Generator", "Iterator"],
    question: "Generator Function কী?",
    answer: `Generator হলো বিশেষ function যা execution pause এবং resume করতে পারে।

Syntax:

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = numbers();

generator.next();
// { value: 1, done: false }

generator.next();
// { value: 2, done: false }

generator.next();
// { value: 3, done: false }

generator.next();
// { value: undefined, done: true }

Generator function-এর execution yield-এর জায়গায় pause হয় এবং পরবর্তী next() call-এ resume হয়।

Use case:
- Lazy evaluation
- Large data processing
- Custom iterators
- State machines
- Streaming-like processing`
  },

  {
    id: "js-64",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Generator", "yield"],
    question: "yield কী?",
    answer: `yield Generator function-এর execution pause করে এবং একটি value return করে।

Example:

function* test() {
  yield 10;
  yield 20;
}

const gen = test();

gen.next();
// 10

gen.next();
// 20

yield এবং return-এর মধ্যে পার্থক্য:

return:
Function permanently শেষ করে।

yield:
Generator temporarily pause করে এবং পরে resume হতে পারে।`
  },

  {
    id: "js-65",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Generator", "Async"],
    question: "Generator কি asynchronous?",
    answer: `সাধারণ Generator নিজে asynchronous নয়।

Generator synchronous execution pause/resume করে।

Async Generator asynchronous iteration support করে।

Example:

async function* stream() {
  yield await getData();
}

for await (const item of stream()) {
  console.log(item);
}

Async Generator useful:
- Streaming API data
- Paginated API
- Async data sources
- Large asynchronous datasets`
  },

  {
    id: "js-66",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Symbol", "ES6"],
    question: "Symbol কী এবং কেন ব্যবহার করা হয়?",
    answer: `Symbol হলো JavaScript-এর primitive data type যার প্রতিটি Symbol সাধারণত unique।

Example:

const id1 = Symbol("id");
const id2 = Symbol("id");

id1 === id2;
// false

Common use:
- Unique object keys
- Avoid property name collision
- Language protocols

Example:

const user = {
  name: "Nazmul",
  [Symbol("id")]: 123
};

JavaScript-এর built-in protocols যেমন Symbol.iterator Symbol ব্যবহার করে।`
  },

  {
    id: "js-67",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Symbol", "Iterator"],
    question: "Symbol.iterator কী?",
    answer: `Symbol.iterator একটি well-known Symbol যা কোনো object-এর default iterator নির্ধারণ করে।

Example:

const collection = {
  values: [10, 20, 30],

  *[Symbol.iterator]() {
    yield* this.values;
  }
};

for (const value of collection) {
  console.log(value);
}

এখানে Symbol.iterator থাকার কারণে object-টি iterable হয়ে গেছে।`
  },

  {
    id: "js-68",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Proxy", "Metaprogramming"],
    question: "Proxy কী?",
    answer: `Proxy হলো এমন object যা অন্য object-এর operations intercept বা customize করতে পারে।

Example:

const user = {
  name: "Nazmul"
};

const proxy = new Proxy(user, {
  get(target, property) {
    console.log("Access:", property);
    return target[property];
  }
});

proxy.name;

Proxy দিয়ে:
- get
- set
- delete
- has
- apply
- construct
সহ বিভিন্ন operation intercept করা যায়।

Use case:
- Validation
- Logging
- Reactive systems
- Access control
- Framework internals`
  },

  {
    id: "js-69",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Proxy", "Validation"],
    question: "Proxy দিয়ে object validation কীভাবে করা যায়?",
    answer: `set trap ব্যবহার করে property assignment validate করা যায়।

Example:

const user = {};

const proxy = new Proxy(user, {
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }

    target[property] = value;
    return true;
  }
});

proxy.age = 30;
proxy.age = "30"; // Error

এভাবে object-এর mutation-এর আগে validation করা যায়।`
  },

  {
    id: "js-70",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Reflect", "Proxy"],
    question: "Reflect কী?",
    answer: `Reflect হলো JavaScript-এর built-in object যার methods object operations করার জন্য standard API দেয়।

Example:

Reflect.get(user, "name");
Reflect.set(user, "age", 30);
Reflect.has(user, "name");
Reflect.deleteProperty(user, "name");

Proxy-এর সাথে Reflect খুব common।

Example:

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  }
});

Reflect code-কে predictable এবং standard object-operation API দিতে সাহায্য করে।`
  },

  {
    id: "js-71",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Proxy", "Reflect"],
    question: "Proxy-এর সাথে Reflect কেন ব্যবহার করা হয়?",
    answer: `Proxy trap-এর ভিতরে original/default behavior preserve করার জন্য Reflect useful।

Example:

get(target, property, receiver) {
  return Reflect.get(target, property, receiver);
}

এর সুবিধা:
- Default JavaScript semantics maintain করা সহজ।
- Prototype এবং receiver behavior সঠিকভাবে handle করা যায়।
- Proxy code cleaner হয়।

Production code-এ custom behavior-এর পাশাপাশি default behavior রাখতে Reflect খুব useful।`
  },

  {
    id: "js-72",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["WeakMap", "Garbage Collection"],
    question: "WeakMap কেন memory-sensitive application-এ useful?",
    answer: `WeakMap-এর object keys weakly held হয়।

অর্থাৎ key object-এর অন্য কোনো strong reference না থাকলে garbage collection-এর জন্য eligible হতে পারে।

Example:

const metadata = new WeakMap();

let user = {
  name: "Nazmul"
};

metadata.set(user, {
  lastAccess: Date.now()
});

user = null;

এখন metadata-এর key object-এর জন্য অন্য strong reference না থাকলে garbage collection সম্ভব।

Use case:
- Object metadata
- Private-like associations
- Cache-like structures`
  },

  {
    id: "js-73",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["WeakSet", "Garbage Collection"],
    question: "WeakSet কী এবং কোথায় ব্যবহার করবেন?",
    answer: `WeakSet শুধু object references রাখে এবং weakly held হয়।

Example:

const processed = new WeakSet();

const request = {};

processed.add(request);

if (processed.has(request)) {
  console.log("Already processed");
}

Use case:
- Object tracking
- Visited object tracking
- Temporary metadata

WeakSet iterable নয় এবং সাধারণভাবে এর contents enumerate করা যায় না।`
  },

  {
    id: "js-74",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["TypedArray", "Binary Data"],
    question: "TypedArray কী?",
    answer: `TypedArray হলো binary data-এর উপর কাজ করার জন্য specialized array-like structure।

Examples:

Int8Array
Uint8Array
Int16Array
Uint16Array
Int32Array
Float32Array
Float64Array

Example:

const numbers = new Uint8Array([10, 20, 30]);

TypedArray সাধারণ Array-এর মতো নয়।

Use case:
- Binary data
- Audio/video processing
- Image processing
- Web APIs
- Network protocols
- WebAssembly`
  },

  {
    id: "js-75",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["ArrayBuffer", "TypedArray"],
    question: "ArrayBuffer কী?",
    answer: `ArrayBuffer হলো raw binary memory block।

Example:

const buffer = new ArrayBuffer(8);

এটি নিজে সাধারণত data interpret করে না।

TypedArray বা DataView ব্যবহার করে buffer-এর data access করা যায়।

Example:

const buffer = new ArrayBuffer(8);
const view = new Uint8Array(buffer);

view[0] = 255;

Concept:

ArrayBuffer
   ↓
TypedArray / DataView
   ↓
Binary data interpretation`
  },

  {
    id: "js-76",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["DataView", "Binary Data"],
    question: "DataView কী?",
    answer: `DataView ArrayBuffer-এর উপর বিভিন্ন byte offset এবং data type দিয়ে read/write করতে দেয়।

Example:

const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);

view.setInt32(0, 100);
view.getInt32(0);

DataView useful যখন binary protocol-এর exact byte layout control করতে হয়।`
  },

  {
    id: "js-77",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["BigInt", "Number"],
    question: "BigInt কী এবং Number-এর পরিবর্তে কখন ব্যবহার করবেন?",
    answer: `BigInt arbitrary-size integer represent করতে পারে।

Example:

const value = 9007199254740993n;

JavaScript Number-এর safe integer range:

Number.MAX_SAFE_INTEGER

এর বাইরে integer precision সমস্যা হতে পারে।

BigInt ব্যবহার করুন:
- Very large integer
- Database IDs যদি exact integer semantics দরকার হয়
- Financial/integer calculations যেখানে precision requirement আছে

BigInt এবং Number সরাসরি arithmetic-এ mix করা যায় না:

10n + 10
// TypeError

BigInt JSON serialization-এর জন্যও আলাদা handling প্রয়োজন হতে পারে।`
  },

  {
    id: "js-78",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Intl", "Internationalization"],
    question: "Intl API কী?",
    answer: `Intl API JavaScript-এর internationalization functionality দেয়।

Examples:

Intl.NumberFormat
Intl.DateTimeFormat
Intl.Collator
Intl.PluralRules
Intl.RelativeTimeFormat

Example:

new Intl.NumberFormat("en-US").format(1234567);

Output:

1,234,567

Multi-language application, currency formatting এবং date formatting-এর জন্য Intl খুব useful।`
  },

  {
    id: "js-79",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Date", "Timezone"],
    question: "JavaScript Date নিয়ে common problem কী?",
    answer: `JavaScript Date-এর সাথে timezone এবং parsing নিয়ে ভুল হতে পারে।

একটি Date internally একটি timestamp represent করে।

সমস্যা হতে পারে:
- Local timezone
- UTC conversion
- ISO parsing
- Daylight saving time
- String parsing differences

Production application-এ:
- UTC storage
- Explicit timezone handling
- Standardized date formats

ব্যবহার করা উচিত।

Complex timezone/date calculations-এর জন্য Temporal API availability/runtime support অথবা established date libraries বিবেচনা করা যায়।`
  },

  {
    id: "js-80",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["AbortController", "Fetch", "Async"],
    question: "AbortController কী?",
    answer: `AbortController asynchronous operation cancel করার mechanism দেয়।

Fetch request cancel করতে এটি খুব useful।

Example:

const controller = new AbortController();

fetch("/users", {
  signal: controller.signal
});

controller.abort();

AbortController-এর common use:
- User navigates away
- Search request cancellation
- Component unmount
- Request timeout handling
- Avoid unnecessary network work`
  },

  {
    id: "js-81",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Fetch", "Timeout", "AbortController"],
    question: "Fetch request-এ timeout কীভাবে implement করবেন?",
    answer: `AbortController ব্যবহার করে timeout implement করা যায়।

Example:

const controller = new AbortController();

const timeout = setTimeout(() => {
  controller.abort();
}, 5000);

try {
  const response = await fetch("/api/users", {
    signal: controller.signal
  });

  return await response.json();
} finally {
  clearTimeout(timeout);
}

Modern runtimes-এ AbortSignal.timeout() support থাকলে সেটিও ব্যবহার করা যায়।

Timeout distributed application-এ গুরুত্বপূর্ণ কারণ indefinitely hanging request resource আটকে রাখতে পারে।`
  },

  {
    id: "js-82",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web Worker", "Concurrency"],
    question: "Web Worker কী?",
    answer: `Web Worker JavaScript code-কে main UI thread-এর বাইরে execute করতে দেয়।

Main thread:
UI + DOM

Worker:
CPU-heavy JavaScript work

Example:

const worker = new Worker("worker.js");

worker.postMessage(data);

worker.onmessage = event => {
  console.log(event.data);
};

Use case:
- Large calculations
- Image processing
- Data parsing
- CPU-heavy algorithms

Worker সরাসরি DOM manipulate করতে পারে না।`
  },

  {
    id: "js-83",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Web Worker", "SharedArrayBuffer"],
    question: "Web Worker-এর সাথে data কীভাবে communicate হয়?",
    answer: `Worker এবং main thread সাধারণত message passing ব্যবহার করে।

Main thread:

worker.postMessage(data);

Worker:

self.onmessage = event => {
  const data = event.data;
  self.postMessage(result);
};

Structured clone algorithm-এর মাধ্যমে data transfer হতে পারে।

Large binary data-এর ক্ষেত্রে Transferable Objects ব্যবহার করলে ownership transfer করে copying cost কমানো যায়।`
  },

  {
    id: "js-84",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Transferable Objects", "Performance"],
    question: "Transferable Object কী?",
    answer: `Transferable Object এমন data যার underlying resource এক execution context থেকে অন্য context-এ transfer করা যায়, ফলে সাধারণ cloning-এর বদলে ownership transfer করা হয়।

Common example:
ArrayBuffer

Worker-এর সাথে large binary data পাঠানোর সময় transfer করলে performance improve হতে পারে।

Concept:

Main Thread
     ↓ transfer
ArrayBuffer ownership
     ↓
Worker

Transfer করার পর sender-side buffer সাধারণত detached হয়ে যায়।`
  },

  {
    id: "js-85",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["structuredClone", "Deep Copy"],
    question: "structuredClone() কী?",
    answer: `structuredClone() structured clone algorithm ব্যবহার করে supported data-এর deep copy তৈরি করে।

Example:

const original = {
  user: {
    name: "Nazmul"
  }
};

const copy = structuredClone(original);

copy.user.name = "Rahim";

original.user.name;
// Nazmul

JSON.parse(JSON.stringify())-এর তুলনায় structuredClone অনেক বেশি data type correctly handle করতে পারে, যেমন অনেক built-in object type।

তবে function এবং কিছু special host object clone করা যায় না।`
  },

  {
    id: "js-86",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Optional Chaining", "Operator"],
    question: "Optional chaining-এর বিভিন্ন form কী?",
    answer: `Optional chaining শুধু property access নয়, আরও কয়েকভাবে ব্যবহার করা যায়।

Property:

user?.name

Nested:

user?.profile?.address?.city

Method:

user?.getName?.()

Array index:

users?.[0]

যদি chain-এর relevant অংশ null বা undefined হয়, expression সাধারণত undefined return করে।`
  },

  {
    id: "js-87",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Nullish Coalescing", "Operator"],
    question: "?? এবং || এর tricky difference কী?",
    answer: `|| falsy value-এর জন্য fallback নেয়।

0 || 100
// 100

"" || "Guest"
// Guest

false || true
// true

?? শুধু null এবং undefined-এর জন্য fallback নেয়।

0 ?? 100
// 0

"" ?? "Guest"
// ""

false ?? true
// false

যখন 0, false বা empty string valid value হতে পারে তখন ?? বেশি appropriate।`
  },

  {
    id: "js-88",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Logical Assignment", "ES2021"],
    question: "||=, &&= এবং ??= কী?",
    answer: `Logical assignment operators existing value-এর উপর ভিত্তি করে assignment করে।

||=:

user.name ||= "Guest";

name falsy হলে assign হবে।

&&=:

user.isActive &&= true;

existing value truthy হলে assignment হবে।

??=:

user.name ??= "Guest";

শুধু null বা undefined হলে assign হবে।

Default value logic লেখার সময় এগুলো code concise করতে পারে।`
  },

  {
    id: "js-89",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Private Fields", "Class", "OOP"],
    question: "JavaScript class-এর private field কী?",
    answer: `Class-এর private field # দিয়ে declare করা যায়।

Example:

class User {
  #password;

  constructor(password) {
    this.#password = password;
  }

  checkPassword(password) {
    return this.#password === password;
  }
}

const user = new User("123");

user.#password;
// SyntaxError

# field class-এর বাইরে directly access করা যায় না।

এটি true language-level private field।`
  },

  {
    id: "js-90",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Static", "Class", "OOP"],
    question: "static method এবং static field কী?",
    answer: `static member instance-এর পরিবর্তে class-এর সাথে associated।

Example:

class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

MathUtil.add(2, 3);

এখানে new MathUtil() তৈরি করার প্রয়োজন নেই।

Use case:
- Utility methods
- Factory methods
- Class-level configuration
- Shared constants/state`
  },

  {
    id: "js-91",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Private Static", "Class"],
    question: "Private static field কী?",
    answer: `Class-এর static member-কে private করতে # ব্যবহার করা যায়।

Example:

class Counter {
  static #count = 0;

  static increment() {
    Counter.#count++;
  }

  static getCount() {
    return Counter.#count;
  }
}

এখানে #count class-এর বাইরে access করা যায় না।

এটি class-level private state রাখার জন্য useful।`
  },

  {
    id: "js-92",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Getters", "Setters", "Object"],
    question: "Getter এবং Setter কী?",
    answer: `Getter property read করার সময় function-এর মতো behavior দেয়।

Setter property assign করার সময় custom logic চালায়।

Example:

const user = {
  firstName: "Nazmul",
  lastName: "Haque",

  get fullName() {
    return this.firstName + " " + this.lastName;
  },

  set fullName(value) {
    const [first, last] = value.split(" ");
    this.firstName = first;
    this.lastName = last;
  }
};

Getter:
user.fullName

Setter:
user.fullName = "Rahim Khan"

Validation বা computed properties-এর জন্য useful।`
  },

  {
    id: "js-93",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Property Descriptor", "Object"],
    question: "Property Descriptor কী?",
    answer: `Object property-এর metadata Property Descriptor-এর মাধ্যমে পাওয়া যায়।

Example:

Object.getOwnPropertyDescriptor(user, "name");

Common attributes:

value
writable
enumerable
configurable

Accessor descriptor-এর ক্ষেত্রে:

get
set

Example:

Object.defineProperty(obj, "id", {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false
});

Advanced object behavior control করতে Property Descriptor গুরুত্বপূর্ণ।`
  },

  {
    id: "js-94",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Object", "Property Descriptor"],
    question: "enumerable, writable এবং configurable কী?",
    answer: `writable:
Property value পরিবর্তন করা যাবে কি না।

enumerable:
for...in/Object.keys() ইত্যাদিতে property দেখা যাবে কি না।

configurable:
Property descriptor পরিবর্তন বা property delete করা যাবে কি না।

Example:

Object.defineProperty(obj, "id", {
  value: 10,
  writable: false,
  enumerable: false,
  configurable: false
});

এই attributes library/framework internals এবং API design-এ গুরুত্বপূর্ণ হতে পারে।`
  },

  {
    id: "js-95",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Prototype", "Object"],
    question: "Object.create() কী?",
    answer: `Object.create() নির্দিষ্ট prototype দিয়ে নতুন object তৈরি করে।

Example:

const person = {
  greet() {
    return "Hello";
  }
};

const user = Object.create(person);

user.greet();

এখানে user-এর prototype হলো person।

Prototype chain বুঝতে এবং inheritance manually control করতে Object.create() useful।`
  },

  {
    id: "js-96",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Prototype", "Object"],
    question: "__proto__, prototype এবং [[Prototype]] এর মধ্যে পার্থক্য কী?",
    answer: `[[Prototype]]:
JavaScript object-এর internal prototype relationship।

prototype:
Function object-এর একটি property, যা new দিয়ে তৈরি instance-এর prototype হিসেবে ব্যবহৃত হয়।

__proto__:
Historically object-এর prototype access/set করার legacy accessor।

Example:

function User() {}

User.prototype

const user = new User();

user-এর internal [[Prototype]] সাধারণত User.prototype-এর দিকে point করে।

Interview-এর জন্য:
prototype → constructor function-এর property
[[Prototype]] → object-এর internal link
__proto__ → legacy accessor`
  },

  {
    id: "js-97",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Function", "Constructor", "new"],
    question: "new keyword internally কী করে?",
    answer: `new Constructor() সাধারণভাবে কয়েকটি step-এর মতো কাজ করে:

1. নতুন object তৈরি করে।
2. নতুন object's prototype constructor.prototype-এর সাথে link করে।
3. Constructor-এর this নতুন object-এ bind করে।
4. Constructor execute করে।
5. Constructor যদি object explicitly return না করে, নতুন object return হয়।

Example:

function User(name) {
  this.name = name;
}

const user = new User("Nazmul");

এখানে user-এর prototype chain User.prototype-এর সাথে connected।`
  },

  {
    id: "js-98",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["this", "bind", "call", "apply"],
    question: "call(), apply() এবং bind() এর পার্থক্য কী?",
    answer: `call():
Function immediately execute করে এবং arguments আলাদাভাবে নেয়।

fn.call(obj, a, b);

apply():
Immediately execute করে কিন্তু arguments array-like হিসেবে নেয়।

fn.apply(obj, [a, b]);

bind():
Immediately execute করে না; নতুন function return করে যার this/arguments bind করা থাকে।

const bound = fn.bind(obj);

bound();

Interview shortcut:

call → execute now + comma arguments
apply → execute now + array arguments
bind → execute later`
  },

  {
    id: "js-99",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["this", "Arrow Function"],
    question: "Arrow function-এ call(), apply() বা bind() করলে কী হয়?",
    answer: `Arrow function নিজের this binding তৈরি করে না।

তাই:

const obj = {
  name: "Nazmul"
};

const fn = () => this.name;

fn.call(obj);

এতে arrow function-এর lexical this পরিবর্তন হবে না।

Regular function-এর ক্ষেত্রে call/apply/bind this পরিবর্তন করতে পারে।

এই difference interview-এ খুব common।`
  },

  {
    id: "js-100",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Closure", "Loop", "let", "var"],
    question: "Loop-এর ভিতরে var এবং let closure-এর behavior কেন আলাদা?",
    answer: `Example:

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

সাধারণত output:
3
3
3

কারণ var একই function-scoped binding share করে।

let ব্যবহার করলে:

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

Output:
0
1
2

কারণ প্রতিটি iteration-এর জন্য let-এর আলাদা lexical binding তৈরি হয়।

এটি closure + scope + async callback-এর classic interview question।`
  },

  {
    id: "js-101",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop", "Promise", "Output Based"],
    question: "এই code-এর output কী হবে এবং কেন?",
    answer: `Code:

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

Output:

1
4
3
2

কারণ:

প্রথমে synchronous code:
1
4

Promise callback microtask queue-তে যায়।

setTimeout callback task queue-তে যায়।

Call stack empty হওয়ার পর microtask আগে execute হয়:
3

তারপর timer:
2

Key rule:
Synchronous code
→ Microtasks
→ Next task/callback`
  },

  {
    id: "js-102",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop", "Promise", "setTimeout", "Output Based"],
    question: "এই tricky Event Loop code-এর output কী হবে?",
    answer: `Code:

console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");

Output:

A
E
D
B
C

কারণ:

Synchronous:
A
E

Microtask:
D

Timer task:
B

Timer callback-এর ভিতরে Promise তৈরি হওয়ায় নতুন microtask:
C

একটি task-এর callback শেষ হওয়ার পর pending microtasks drain হয়।`
  },

  {
    id: "js-103",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop", "async", "await", "Output Based"],
    question: "async/await এবং Event Loop-এর tricky behavior কী?",
    answer: `Code:

async function test() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

console.log("C");

test();

console.log("D");

Output:

C
A
D
B

কারণ await-এর পরে function-এর continuation সাধারণত microtask হিসেবে schedule হয়।

test() call হলে:
A synchronous অংশ execute হয়।

await-এ pause।

তারপর main synchronous code:
D

তারপর microtask:
B`
  },

  {
    id: "js-104",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise", "Error Handling"],
    question: "Promise rejection handle না করলে কী সমস্যা হতে পারে?",
    answer: `Promise reject হলে এবং appropriate handler না থাকলে unhandled rejection হতে পারে।

Example:

Promise.reject(new Error("Failed"));

Production application-এ unhandled rejection:
- Unexpected behavior
- Logging/monitoring issue
- Runtime-specific consequences

Promise chain-এ catch রাখা উচিত:

doSomething()
  .then(...)
  .catch(error => {
    // handle
  });

async/await হলে try/catch বা higher-level error handling ব্যবহার করা যায়।`
  },

  {
    id: "js-105",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise", "Error Handling"],
    question: "Promise constructor-এর executor function-এর error কীভাবে কাজ করে?",
    answer: `Example:

const promise = new Promise((resolve, reject) => {
  throw new Error("Failed");
});

Executor-এর ভিতরে synchronous throw হলে Promise rejected হয়।

Equivalent concept:

new Promise((resolve, reject) => {
  try {
    throw new Error();
  } catch (error) {
    reject(error);
  }
});

তবে সাধারণ application code-এ নিজে Promise constructor তৈরি করার প্রয়োজন কম; existing Promise API বা async function ব্যবহার করা preferable।`
  },

  {
    id: "js-106",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise", "Concurrency"],
    question: "Promise.all() কখন ব্যবহার করা উচিত এবং কখন নয়?",
    answer: `Promise.all() ব্যবহার করুন যখন:
- একাধিক asynchronous operation independent।
- সব result দরকার।
- একটি failure হলে overall operation failure ধরা যায়।

Example:

const [users, products] = await Promise.all([
  getUsers(),
  getProducts()
]);

ব্যবহার করবেন না যখন:
- একটি request fail করলেও অন্যগুলোর result অবশ্যই দরকার।
- তখন Promise.allSettled() বেশি appropriate হতে পারে।

এছাড়া dependent requests-এ sequential await প্রয়োজন হতে পারে।`
  },

  {
    id: "js-107",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Async", "Concurrency", "Rate Limiting"],
    question: "একসাথে 10,000 API request চালানো কেন খারাপ এবং কীভাবে control করবেন?",
    answer: `একসাথে অনেক request চালালে:
- Memory usage বাড়ে।
- Connection saturation হতে পারে।
- Server overload হতে পারে।
- Rate limit hit হতে পারে।
- Client/network resource শেষ হতে পারে।

Solution:
- Concurrency limit
- Queue
- Batch processing
- Retry with backoff
- Rate limiting

Concept:

10,000 jobs
     ↓
Concurrency limiter
     ↓
10 বা 20 jobs at a time

Production Node.js systems-এ p-limit-এর মতো concurrency control utility বা নিজের queue mechanism ব্যবহার করা যায়।`
  },

  {
    id: "js-108",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Retry", "Exponential Backoff"],
    question: "API retry কীভাবে properly implement করবেন?",
    answer: `সব error retry করা উচিত নয়।

Retry করা যেতে পারে:
- Temporary network error
- Timeout
- 429
- কিছু 5xx error

সাধারণত exponential backoff ব্যবহার করা হয়।

Example concept:

Attempt 1 → 100ms
Attempt 2 → 200ms
Attempt 3 → 400ms
Attempt 4 → 800ms

সাথে jitter যোগ করলে অনেক client একই সময়ে retry করার সমস্যা কমে।

POST request retry করার আগে idempotency বিবেচনা করা গুরুত্বপূর্ণ।`
  },

  {
    id: "js-109",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Idempotency", "HTTP", "API"],
    question: "Idempotency কী?",
    answer: `একই operation একাধিকবার execute করলেও final state একই থাকলে operation-টিকে idempotent বলা হয়।

GET সাধারণত idempotent।

PUT সাধারণত idempotent design করা যায়।

POST সাধারণত inherently idempotent নয়।

Payment/order API-তে idempotency key ব্যবহার করা যায়।

Example:

POST /payments

Idempotency-Key:
abc-123

Client retry করলে server একই operation duplicate না করে আগের result return করতে পারে।

Distributed systems-এ এটি অত্যন্ত গুরুত্বপূর্ণ।`
  },

  {
    id: "js-110",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Performance", "Big O"],
    question: "JavaScript code-এর performance কীভাবে analyze করবেন?",
    answer: `প্রথমে algorithmic complexity দেখুন।

Common complexities:

O(1)
O(log n)
O(n)
O(n log n)
O(n²)

Example:

array.find()
→ সাধারণত O(n)

Nested loop:
for (...)
  for (...)
→ সাধারণত O(n²)

তারপর বাস্তব performance-এর জন্য:
- Browser Performance panel
- Memory profiler
- Network panel
- CPU profiling
- Node.js profiling
- Benchmarking

শুধু micro-optimization না করে bottleneck identify করা উচিত।`
  },

  {
    id: "js-111",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Loop", "Long Task", "Performance"],
    question: "Long Task কী এবং কেন সমস্যা?",
    answer: `Main thread-এ দীর্ঘ সময় ধরে চলা JavaScript execution-কে long task বলা হয়।

এতে:
- UI freeze হতে পারে।
- User interaction delay হতে পারে।
- Rendering বাধাগ্রস্ত হতে পারে।

Solution:
- Work ছোট chunks-এ ভাগ করা
- Web Worker
- requestAnimationFrame
- setTimeout / scheduling
- Algorithm optimize করা
- Unnecessary rendering কমানো

Browser application-এ responsiveness-এর জন্য এটি গুরুত্বপূর্ণ।`
  },

  {
    id: "js-112",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["requestAnimationFrame", "Browser", "Performance"],
    question: "requestAnimationFrame() কী?",
    answer: `requestAnimationFrame() browser-এর next repaint-এর আগে animation/update callback schedule করে।

Example:

function animate() {
  // update UI
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

Animation-এর জন্য setTimeout-এর পরিবর্তে requestAnimationFrame সাধারণত বেশি appropriate কারণ browser rendering cycle-এর সাথে কাজ করে।

Use case:
- Animation
- Canvas rendering
- Visual updates`
  },

  {
    id: "js-113",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["MutationObserver", "DOM"],
    question: "MutationObserver কী?",
    answer: `MutationObserver DOM-এর পরিবর্তন observe করতে দেয়।

Example:

const observer = new MutationObserver(mutations => {
  console.log(mutations);
});

observer.observe(element, {
  childList: true,
  attributes: true,
  subtree: true
});

Use case:
- DOM changes monitor
- Dynamic UI integration
- Third-party DOM modifications detect

Observer ব্যবহার শেষে disconnect() করা উচিত যদি আর প্রয়োজন না থাকে।`
  },

  {
    id: "js-114",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["IntersectionObserver", "Performance"],
    question: "IntersectionObserver কী?",
    answer: `IntersectionObserver কোনো element viewport বা অন্য root-এর সাথে intersect করছে কি না তা observe করে।

Use case:
- Lazy loading
- Infinite scrolling
- Advertisement visibility
- Scroll-based activation

এটি manually scroll event + getBoundingClientRect() বারবার করার তুলনায় অনেক ক্ষেত্রে cleaner এবং efficient approach।`
  },

  {
    id: "js-115",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["ResizeObserver", "Browser"],
    question: "ResizeObserver কী?",
    answer: `ResizeObserver কোনো element-এর size পরিবর্তন observe করতে দেয়।

Example:

const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    console.log(entry.contentRect);
  }
});

observer.observe(element);

Use case:
- Responsive components
- Charts
- Layout calculation
- Component-level responsiveness

Window resize event-এর তুলনায় element-level size observation-এর জন্য এটি বেশি appropriate।`
  },

  {
    id: "js-116",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security", "CSRF"],
    question: "CSRF কী এবং JavaScript application-এ কীভাবে prevent করবেন?",
    answer: `CSRF = Cross-Site Request Forgery।

Attacker victim-এর authenticated browser ব্যবহার করে unwanted request করানোর চেষ্টা করে।

Protection:
- SameSite cookies
- CSRF token
- Origin/Referer validation যেখানে appropriate
- Proper authentication architecture

বিশেষ করে cookie-based authentication-এ CSRF protection গুরুত্বপূর্ণ।

CORS একা CSRF protection-এর replacement নয়।`
  },

  {
    id: "js-117",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security", "Prototype Pollution"],
    question: "Prototype Pollution কী?",
    answer: `Prototype Pollution হলো attacker-controlled input ব্যবহার করে Object.prototype বা অন্য prototype-এর properties manipulate করার vulnerability।

এতে application-এর অনেক object unexpected property inherit করতে পারে।

Risk:
- Authorization bypass
- Unexpected behavior
- Security vulnerabilities

Protection:
- Untrusted object keys validate করা
- Dangerous prototype keys handle করা
- Secure merge/deep-merge libraries
- Object.create(null) কিছু dictionary use case-এ
- Dependencies updated রাখা`
  },

  {
    id: "js-118",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Security", "Dependency"],
    question: "JavaScript dependency security কীভাবে maintain করবেন?",
    answer: `Production application-এ dependency risk কমাতে:

1. package-lock/pnpm-lock/yarn.lock commit করা।
2. Dependency update নিয়মিত করা।
3. Security audit চালানো।
4. Unused dependencies remove করা।
5. Trusted packages ব্যবহার করা।
6. Transitive dependencies monitor করা।
7. Supply-chain attack সম্পর্কে সচেতন থাকা।

npm ecosystem-এ dependency tree বড় হতে পারে, তাই direct dependency-এর পাশাপাশি transitive dependency-ও গুরুত্বপূর্ণ।`
  },

  {
    id: "js-119",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Module", "Tree Shaking", "Bundler"],
    question: "Tree Shaking কী?",
    answer: `Tree shaking হলো bundler-এর optimization technique যেখানে ব্যবহার না করা code/module export বাদ দেওয়া হয়।

Example:

import { add } from "./math.js";

যদি একই module-এ unused function থাকে এবং bundler statically determine করতে পারে যে সেটি ব্যবহার হয়নি, সেটি final bundle থেকে বাদ যেতে পারে।

ES Modules static structure হওয়ায় tree shaking-এর জন্য ভালো।

Production frontend performance-এর জন্য bundle size কমানো গুরুত্বপূর্ণ।`
  },

  {
    id: "js-120",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Senior Interview", "Architecture"],
    question: "Senior JavaScript developer হিসেবে কোন advanced topics অবশ্যই জানতে হবে?",
    answer: `Senior-level interview-এর জন্য শুধু syntax জানা যথেষ্ট নয়।

Must Know:

Runtime:
- Execution Context
- Call Stack
- Event Loop
- Microtask
- Task Queue
- Garbage Collection

Language:
- Scope
- Closure
- this
- Prototype
- Prototype Chain
- Classes
- Property Descriptor
- Proxy
- Reflect
- Symbol

Async:
- Promise
- async/await
- Promise combinators
- AbortController
- Concurrency control
- Retry
- Timeout
- Idempotency

Performance:
- Debounce
- Throttle
- Memoization
- Big O
- Memory leak
- Web Worker
- requestAnimationFrame
- Lazy loading

Browser:
- DOM
- Event propagation
- Event delegation
- MutationObserver
- IntersectionObserver
- ResizeObserver
- Storage
- CORS

Security:
- XSS
- CSRF
- Prototype Pollution
- Dependency/Supply-chain security
- CSP
- Secure cookies

Data:
- Iterator
- Generator
- Async Generator
- Map
- Set
- WeakMap
- WeakSet
- TypedArray
- ArrayBuffer

Modern JS:
- Optional chaining
- Nullish coalescing
- Logical assignment
- Private fields
- Static fields
- ES Modules
- structuredClone

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো এগুলো মুখস্থ না করে:
"কেন কাজ করে?"
"কখন ব্যবহার করব?"
"কখন ব্যবহার করব না?"
"Performance impact কী?"
"Production-এ কী সমস্যা হতে পারে?"

এই চারটি perspective থেকে explain করতে পারা।`
  },
  {
    id: "js-121",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Hoisting", "var", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

console.log(a);
var a = 10;

Output:

undefined

কারণ var declaration hoist হয়, কিন্তু assignment hoist হয় না।

Internally:

var a;
console.log(a);
a = 10;

তাই console.log(a)-তে undefined পাওয়া যায়।`
  },

  {
    id: "js-122",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Hoisting", "let", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

console.log(a);
let a = 10;

Output:

ReferenceError

কারণ let declaration hoist হলেও initialization-এর আগে Temporal Dead Zone (TDZ)-এ থাকে।

তাই declaration-এর আগে access করলে ReferenceError হয়।`
  },

  {
    id: "js-123",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Hoisting", "Function", "Output"],
    question: "Function declaration hoisting-এর output কী হবে?",
    answer: `Code:

sayHello();

function sayHello() {
  console.log("Hello");
}

Output:

Hello

Function declaration পুরো function body সহ hoist হয়।

তাই declaration-এর আগে function call করা যায়।`
  },

  {
    id: "js-124",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Function Hoisting", "var", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

sayHello();

var sayHello = function () {
  console.log("Hello");
};

Output:

TypeError: sayHello is not a function

কারণ var declaration hoist হয়:

var sayHello;

কিন্তু function assignment পরে হয়।

তাই প্রথমে:

sayHello();
// undefined কে function হিসেবে call করার চেষ্টা

ফলে TypeError হয়।`
  },

  {
    id: "js-125",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Closure", "Loop", "var", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

Output:

3
3
3

কারণ var function-scoped।

সব callback একই i binding reference করে।

Loop শেষ হওয়ার সময়:

i = 3

তারপর callback execute হয়।

তাই তিনবারই 3 পাওয়া যায়।`
  },

  {
    id: "js-126",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Closure", "Loop", "let", "Output"],
    question: "আগের code-এ var-এর পরিবর্তে let দিলে কী হবে?",
    answer: `Code:

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

Output:

0
1
2

কারণ let block-scoped এবং loop-এর প্রতিটি iteration-এর জন্য আলাদা binding তৈরি হয়।

প্রতিটি callback তার নিজের iteration-এর i capture করে।`
  },

  {
    id: "js-127",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Closure", "IIFE", "Output"],
    question: "var loop-এর সমস্যা IIFE দিয়ে কীভাবে solve করবেন?",
    answer: `Code:

for (var i = 0; i < 3; i++) {
  ((index) => {
    setTimeout(() => {
      console.log(index);
    }, 100);
  })(i);
}

Output:

0
1
2

প্রতিটি iteration-এ IIFE একটি নতুন parameter binding তৈরি করে।

Callback সেই নতুন binding-এর value capture করে।`
  },

  {
    id: "js-128",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Closure", "Counter", "Coding"],
    question: "Closure ব্যবহার করে private counter তৈরি করুন।",
    answer: `Code:

function createCounter() {
  let count = 0;

  return {
    increment() {
      return ++count;
    },

    decrement() {
      return --count;
    },

    getValue() {
      return count;
    }
  };
}

const counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getValue());

Output:

2

count সরাসরি বাইরে access করা যায় না।

Closure-এর কারণে returned functions count-এর reference ধরে রাখে।

এভাবে private state তৈরি করা যায়।`
  },

  {
    id: "js-129",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Closure", "Function", "Coding"],
    question: "একটি function লিখুন যা multiply-by-n function তৈরি করবে।",
    answer: `Code:

function multiplyBy(n) {
  return function (value) {
    return value * n;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));
console.log(triple(5));

Output:

10
15

Inner function outer function-এর n variable closure-এর মাধ্যমে ধরে রাখে।`
  },

  {
    id: "js-130",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["this", "Object", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

const user = {
  name: "Nazmul",

  getName() {
    return this.name;
  }
};

console.log(user.getName());

Output:

Nazmul

Method call:

user.getName()

এখানে this সাধারণত user object-কে refer করে।`
  },

  {
    id: "js-131",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["this", "Function", "Output"],
    question: "Object method আলাদা variable-এ রাখলে কী সমস্যা হতে পারে?",
    answer: `Code:

const user = {
  name: "Nazmul",

  getName() {
    return this.name;
  }
};

const fn = user.getName;

console.log(fn());

Strict/module environments-এ সাধারণত output হবে:

TypeError বা undefined-related behavior

কারণ fn() call-এর সময় আর user.method() call হচ্ছে না।

Method-এর receiver হারিয়ে গেছে।

Solution:

const fn = user.getName.bind(user);

console.log(fn());

Output:

Nazmul`
  },

  {
    id: "js-132",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["this", "Arrow Function", "Output"],
    question: "Arrow function object-এর this কেন expected result দেয় না?",
    answer: `Code:

const user = {
  name: "Nazmul",

  getName: () => {
    return this.name;
  }
};

console.log(user.getName());

Arrow function নিজের this তৈরি করে না।

এটি surrounding lexical scope-এর this নেয়।

তাই object method হিসেবে arrow function ব্যবহার করে dynamic this পাওয়া যায় না।

Regular method দরকার হলে:

getName() {
  return this.name;
}

ব্যবহার করুন।`
  },

  {
    id: "js-133",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["call", "bind", "this", "Output"],
    question: "call() দিয়ে this পরিবর্তন করুন।",
    answer: `Code:

function greet() {
  return "Hello " + this.name;
}

const user = {
  name: "Nazmul"
};

console.log(greet.call(user));

Output:

Hello Nazmul

call() function immediately execute করে এবং নির্দিষ্ট object-কে this হিসেবে দেয়।`
  },

  {
    id: "js-134",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["apply", "this", "Output"],
    question: "apply() কীভাবে কাজ করে?",
    answer: `Code:

function add(a, b) {
  return this.value + a + b;
}

const obj = {
  value: 10
};

console.log(add.apply(obj, [20, 30]));

Output:

60

apply() এবং call() একইভাবে this সেট করে।

Difference:

call:
arguments আলাদাভাবে নেয়।

apply:
arguments array হিসেবে নেয়।`
  },

  {
    id: "js-135",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["bind", "this", "Output"],
    question: "bind() এর output কী হবে?",
    answer: `Code:

const user = {
  name: "Nazmul"
};

function greet() {
  return this.name;
}

const boundGreet = greet.bind(user);

console.log(boundGreet());

Output:

Nazmul

bind() function immediately execute করে না।

এটি একটি নতুন function return করে যার this bind করা থাকে।`
  },

  {
    id: "js-136",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Type Coercion", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

console.log(1 + "2");
console.log("5" - 2);
console.log("5" + 2);
console.log(true + 1);

Output:

12
3
52
2

কারণ:

1 + "2"
→ string concatenation

"5" - 2
→ numeric conversion

"5" + 2
→ string concatenation

true + 1
→ true becomes 1`
  },

  {
    id: "js-137",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Equality", "Type Coercion", "Output"],
    question: "== এবং === এর difference output দিয়ে explain করুন।",
    answer: `Code:

console.log(5 == "5");
console.log(5 === "5");

Output:

true
false

== type coercion করতে পারে।

=== type এবং value দুটোই strictভাবে compare করে।

Production code-এ সাধারণত === prefer করা হয়।`
  },

  {
    id: "js-138",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["NaN", "Equality", "Output"],
    question: "NaN নিয়ে এই code-এর output কী হবে?",
    answer: `Code:

console.log(NaN === NaN);
console.log(Number.isNaN(NaN));

Output:

false
true

NaN নিজের সাথেও === comparison-এ equal নয়।

NaN check করার জন্য:

Number.isNaN(value)

ব্যবহার করা উচিত।`
  },

  {
    id: "js-139",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Object", "Reference", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

const a = { name: "Nazmul" };
const b = a;

b.name = "Rahim";

console.log(a.name);

Output:

Rahim

কারণ a এবং b একই object-এর reference ধরে রেখেছে।

b পরিবর্তন করলে একই object-এর data পরিবর্তন হয়।`
  },

  {
    id: "js-140",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Shallow Copy", "Reference", "Output"],
    question: "Spread operator কি সবসময় deep copy করে?",
    answer: `Code:

const user = {
  name: "Nazmul",
  address: {
    city: "Dhaka"
  }
};

const copy = { ...user };

copy.address.city = "Chittagong";

console.log(user.address.city);

Output:

Chittagong

কারণ spread shallow copy করে।

Top-level property copy হয়, কিন্তু nested object-এর reference একই থাকে।`
  },

  {
    id: "js-141",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Deep Copy", "structuredClone", "Output"],
    question: "structuredClone দিয়ে nested object copy করলে কী হবে?",
    answer: `Code:

const user = {
  name: "Nazmul",
  address: {
    city: "Dhaka"
  }
};

const copy = structuredClone(user);

copy.address.city = "Chittagong";

console.log(user.address.city);

Output:

Dhaka

কারণ structuredClone nested structure-এর deep clone তৈরি করেছে।`
  },

  {
    id: "js-142",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Array", "Mutation", "Output"],
    question: "এই code-এর output কী হবে?",
    answer: `Code:

const numbers = [1, 2, 3];

const result = numbers.map(n => {
  n * 2;
});

console.log(result);

Output:

[undefined, undefined, undefined]

কারণ arrow function-এর block body ব্যবহার করলে explicit return প্রয়োজন।

Correct:

const result = numbers.map(n => {
  return n * 2;
});

অথবা:

const result = numbers.map(n => n * 2);`
  },

  {
    id: "js-143",
    category: "JavaScript",
    difficulty: "Intermediate",
    tags: ["Array", "map", "filter", "reduce"],
    question: "map(), filter() এবং reduce() এর পার্থক্য কী?",
    answer: `map():
প্রতিটি element transform করে এবং নতুন array return করে।

filter():
Condition অনুযায়ী elements রেখে নতুন array return করে।

reduce():
পুরো array থেকে একটি accumulated result তৈরি করতে পারে।

Example:

[1, 2, 3].map(x => x * 2);
// [2, 4, 6]

[1, 2, 3].filter(x => x > 1);
// [2, 3]

[1, 2, 3].reduce((sum, x) => sum + x, 0);
// 6`
  },

  {
    id: "js-144",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Reduce", "Coding"],
    question: "reduce() ব্যবহার করে array থেকে frequency map তৈরি করুন।",
    answer: `Code:

const items = ["a", "b", "a", "c", "b", "a"];

const frequency = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

console.log(frequency);

Output:

{
  a: 3,
  b: 2,
  c: 1
}

Interview-এ reduce দিয়ে grouping, counting এবং aggregation খুব common।`
  },

  {
    id: "js-145",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Array", "Duplicate", "Set", "Coding"],
    question: "Array থেকে duplicate remove করুন।",
    answer: `Code:

const numbers = [1, 2, 2, 3, 3, 4];

const unique = [...new Set(numbers)];

console.log(unique);

Output:

[1, 2, 3, 4]

Set unique values রাখে।

Alternative:

Array.from(new Set(numbers))`
  },

  {
    id: "js-146",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Array", "Sorting", "Coding"],
    question: "Number array sort করতে ভুল কোথায় হয়?",
    answer: `Code:

const numbers = [10, 2, 5, 1];

console.log(numbers.sort());

Output:

[1, 10, 2, 5]

কারণ default sort values-কে string হিসেবে compare করে।

Correct:

numbers.sort((a, b) => a - b);

Output:

[1, 2, 5, 10]

Descending:

numbers.sort((a, b) => b - a);`
  },

  {
    id: "js-147",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Array", "Mutation", "Sort"],
    question: "Array.sort() কি original array পরিবর্তন করে?",
    answer: `হ্যাঁ।

Example:

const numbers = [3, 1, 2];

const sorted = numbers.sort((a, b) => a - b);

console.log(numbers);

Output:

[1, 2, 3]

sort() original array mutate করে।

Original preserve করতে:

const sorted = [...numbers].sort((a, b) => a - b);

ব্যবহার করা যায়।`
  },

  {
    id: "js-148",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Debounce", "Performance", "Coding"],
    question: "Debounce implement করুন।",
    answer: `Code:

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

Use case:

const search = debounce((value) => {
  console.log("API:", value);
}, 500);

search("j");
search("ja");
search("jav");
search("java");

শুধু শেষ call-এর পরে 500ms অপেক্ষা করে function execute হবে।

Use case:
- Search API
- Input validation
- Resize handling`
  },

  {
    id: "js-149",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Throttle", "Performance", "Coding"],
    question: "Throttle implement করুন।",
    answer: `Code:

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

Throttle নির্দিষ্ট interval-এর মধ্যে function execution limit করে।

Use case:
- Scroll
- Mouse move
- Resize
- Continuous events

Difference:

Debounce:
শেষ event-এর পরে execute করে।

Throttle:
নির্দিষ্ট interval-এ সর্বোচ্চ একবার execute করে।`
  },

  {
    id: "js-150",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Memoization", "Performance", "Coding"],
    question: "Memoization কী এবং implement করুন।",
    answer: `Memoization হলো expensive function-এর previous result cache করে রাখা।

Example:

function memoize(fn) {
  const cache = new Map();

  return function (arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const result = fn(arg);
    cache.set(arg, result);

    return result;
  };
}

এটি useful যখন:
- Function pure
- Same input বারবার আসে
- Calculation expensive

কিন্তু cache size এবং memory growth control করা গুরুত্বপূর্ণ।`
  },

  {
    id: "js-151",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise", "Output"],
    question: "Promise.resolve().then() এবং setTimeout-এর output কী হবে?",
    answer: `Code:

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");

Output:

A
D
C
B

Order:

Synchronous
→ A, D

Microtask
→ C

Task/timer
→ B`
  },

  {
    id: "js-152",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise", "Microtask", "Output"],
    question: "এই nested Promise code-এর output কী হবে?",
    answer: `Code:

Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

Promise.resolve().then(() => {
  console.log("C");
});

Output:

A
C
B

প্রথম Promise callback microtask queue-তে যায়।

A execute হওয়ার সময় B-এর জন্য নতুন microtask schedule হয়।

কিন্তু queue-তে C আগে থেকেই ছিল।

তাই:

A
C
B`
  },

  {
    id: "js-153",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["async", "await", "Promise", "Output"],
    question: "এই async/await code-এর output কী হবে?",
    answer: `Code:

async function test() {
  console.log("1");

  await Promise.resolve();

  console.log("2");
}

console.log("3");

test();

console.log("4");

Output:

3
1
4
2

test() call হলে 1 synchronousভাবে execute হয়।

await-এর পরে function pause হয়।

main synchronous code 4 print করে।

তারপর await continuation microtask হিসেবে execute হয়ে 2 print করে।`
  },

  {
    id: "js-154",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise.all", "Coding"],
    question: "দুটি API parallelভাবে call করার correct approach কী?",
    answer: `Code:

const [users, products] = await Promise.all([
  fetchUsers(),
  fetchProducts()
]);

এতে দুইটি operation parallelভাবে শুরু হয়।

Sequential approach:

const users = await fetchUsers();
const products = await fetchProducts();

এখানে products request users শেষ হওয়ার পরে শুরু হয়।

যদি দুই operation independent হয়, Promise.all সাধারণত latency কমাতে সাহায্য করে।`
  },

  {
    id: "js-155",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise.allSettled", "Promise"],
    question: "Promise.allSettled() কখন ব্যবহার করবেন?",
    answer: `যখন সব asynchronous operation-এর final status দরকার, even if some fail।

Example:

const results = await Promise.allSettled([
  fetchUsers(),
  fetchProducts(),
  fetchOrders()
]);

Result-এর প্রতিটি item সাধারণত:

{
  status: "fulfilled",
  value: ...
}

অথবা:

{
  status: "rejected",
  reason: ...
}

Use case:
- Batch API
- Independent operations
- Partial failure acceptable`
  },

  {
    id: "js-156",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise.race", "Timeout", "Coding"],
    question: "Promise.race() ব্যবহার করে timeout pattern তৈরি করুন।",
    answer: `Code:

const timeout = new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error("Timeout"));
  }, 5000);
});

const result = await Promise.race([
  fetchData(),
  timeout
]);

যেটি আগে settle করবে সেটিই race-এর result।

তবে শুধু Promise.race() ব্যবহার করলে underlying fetch automatically cancel হয় না।

Real implementation-এ AbortController ব্যবহার করে request abort করা ভালো।`
  },

  {
    id: "js-157",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Promise.any", "Promise"],
    question: "Promise.any() কী?",
    answer: `Promise.any() প্রথম fulfilled Promise-এর result return করে।

Example:

const result = await Promise.any([
  fetchFromServer1(),
  fetchFromServer2(),
  fetchFromServer3()
]);

যদি একটি successful হয়, সেটিই পাওয়া যাবে।

সব Promise reject করলে AggregateError পাওয়া যায়।

Use case:
- Multiple fallback servers
- Redundant services
- Fastest successful source`
  },

  {
    id: "js-158",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Async", "Sequential", "Parallel"],
    question: "কখন async operations sequential এবং কখন parallel করবেন?",
    answer: `Parallel:

const [a, b, c] = await Promise.all([
  getA(),
  getB(),
  getC()
]);

যখন operations independent।

Sequential:

const user = await getUser();
const orders = await getOrders(user.id);

যখন দ্বিতীয় operation প্রথমটির result-এর উপর নির্ভর করে।

Common performance mistake:

const a = await getA();
const b = await getB();

যদি a এবং b independent হয়, unnecessarily sequential execution latency বাড়াতে পারে।`
  },

  {
    id: "js-159",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Error Handling", "try-catch", "async"],
    question: "async function-এর error কীভাবে handle করবেন?",
    answer: `Example:

async function getUser() {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

Important:

catch করে error silently ignore করা উচিত নয়।

Layered application-এ lower layer error log/transform করতে পারে এবং upper layer appropriate response দিতে পারে।`
  },

  {
    id: "js-160",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Error Handling", "finally"],
    question: "finally কখন execute হয়?",
    answer: `finally সাধারণত try/catch flow-এর পরে cleanup করার জন্য ব্যবহার করা হয়।

Example:

try {
  await request();
} catch (error) {
  console.error(error);
} finally {
  hideLoading();
}

Request success বা failure—দুই ক্ষেত্রেই cleanup প্রয়োজন হলে finally useful।

Use case:
- Loading state
- Lock release
- Resource cleanup
- Temporary state cleanup`
  },

  {
    id: "js-161",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Prototype", "Inheritance", "Coding"],
    question: "Prototype inheritance implement করুন।",
    answer: `Code:

const animal = {
  speak() {
    return "Animal sound";
  }
};

const dog = Object.create(animal);

dog.bark = function () {
  return "Woof";
};

console.log(dog.speak());
console.log(dog.bark());

Output:

Animal sound
Woof

dog-এর নিজের speak property নেই।

JavaScript prototype chain অনুসরণ করে animal-এর speak খুঁজে পায়।`
  },

  {
    id: "js-162",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Class", "Inheritance", "super"],
    question: "class inheritance-এ super কী?",
    answer: `Example:

class Animal {
  speak() {
    return "Animal";
  }
}

class Dog extends Animal {
  speak() {
    return super.speak() + " Dog";
  }
}

const dog = new Dog();

console.log(dog.speak());

Output:

Animal Dog

super parent class-এর method/property access করার জন্য ব্যবহৃত হয়।`
  },

  {
    id: "js-163",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Proxy", "Coding"],
    question: "Proxy ব্যবহার করে property access logging implement করুন।",
    answer: `Code:

const user = {
  name: "Nazmul",
  age: 30
};

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log("Reading:", property);
    return Reflect.get(target, property, receiver);
  }
});

console.log(proxy.name);

Output-এর আগে:

Reading: name

তারপর:

Nazmul

Proxy দিয়ে object access intercept করা যায়।`
  },

  {
    id: "js-164",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Deep Clone", "Coding"],
    question: "একটি nested object safely clone করার modern approach কী?",
    answer: `Simple supported data structure হলে:

const copy = structuredClone(original);

এটি nested object-এর deep clone তৈরি করতে পারে।

তবে সব JavaScript value structured-cloneable নয়।

Alternative:
- Custom clone
- Specialized library
- Domain-specific serialization

JSON.parse(JSON.stringify()) blindly ব্যবহার করা উচিত নয়, কারণ এটি অনেক data type এবং special values preserve করতে পারে না।`
  },

  {
    id: "js-165",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Flatten", "Array", "Coding"],
    question: "Nested array flatten করুন।",
    answer: `Code:

const arr = [1, [2, [3, 4]], 5];

console.log(arr.flat(Infinity));

Output:

[1, 2, 3, 4, 5]

নির্দিষ্ট depth:

arr.flat(1);

Recursive custom implementation-ও interview-এ জিজ্ঞেস করা হতে পারে।`
  },

  {
    id: "js-166",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Flatten", "Recursion", "Coding"],
    question: "Array.flat() ছাড়া recursive flatten function লিখুন।",
    answer: `Code:

function flatten(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(
  flatten([1, [2, [3, 4]], 5])
);

Output:

[1, 2, 3, 4, 5]

এখানে recursion ব্যবহার করা হয়েছে।`
  },

  {
    id: "js-167",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Object", "GroupBy", "Coding"],
    question: "Array of objects category অনুযায়ী group করুন।",
    answer: `Code:

const products = [
  { name: "A", category: "mobile" },
  { name: "B", category: "laptop" },
  { name: "C", category: "mobile" }
];

const grouped = products.reduce((acc, product) => {
  const key = product.category;

  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push(product);

  return acc;
}, {});

Result:

{
  mobile: [
    { name: "A", category: "mobile" },
    { name: "C", category: "mobile" }
  ],
  laptop: [
    { name: "B", category: "laptop" }
  ]
}

Modern JavaScript-এর Object.groupBy() supported runtime-এ এই ধরনের কাজ আরও সরাসরি করা যায়।`
  },

  {
    id: "js-168",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Array", "Two Sum", "Algorithm"],
    question: "Two Sum problem solve করুন।",
    answer: `Problem:

[2, 7, 11, 15]

target = 9

Expected:

[0, 1]

Optimized solution:

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
}

Time Complexity:
O(n)

Space Complexity:
O(n)

Brute force করলে O(n²) হতে পারে।`
  },

  {
    id: "js-169",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Algorithm", "Palindrome", "Coding"],
    question: "String palindrome check করুন।",
    answer: `Code:

function isPalindrome(str) {
  const normalized = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return normalized ===
    normalized.split("").reverse().join("");
}

console.log(isPalindrome("Madam"));

Output:

true

Interview-এ optimized two-pointer approach-ও implement করতে বলা হতে পারে।`
  },

  {
    id: "js-170",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Algorithm", "String", "Coding"],
    question: "String-এর প্রথম non-repeating character বের করুন।",
    answer: `Code:

function firstUniqueChar(str) {
  const count = new Map();

  for (const char of str) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (const char of str) {
    if (count.get(char) === 1) {
      return char;
    }
  }

  return null;
}

console.log(firstUniqueChar("aabbcdd"));

Output:

c

Time Complexity:
O(n)

Space Complexity:
O(n)`
  },

  {
    id: "js-171",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Algorithm", "Anagram", "Coding"],
    question: "দুটি string anagram কি না check করুন।",
    answer: `Code:

function isAnagram(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  const count = new Map();

  for (const char of a) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (const char of b) {
    const value = count.get(char);

    if (!value) {
      return false;
    }

    count.set(char, value - 1);
  }

  return true;
}

console.log(isAnagram("listen", "silent"));

Output:

true

Time Complexity:
O(n)

Space Complexity:
O(n)`
  },

  {
    id: "js-172",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Algorithm", "Array", "Intersection"],
    question: "দুটি array-এর common values বের করুন।",
    answer: `Code:

function intersection(a, b) {
  const set = new Set(a);

  return [...new Set(
    b.filter(value => set.has(value))
  )];
}

Example:

intersection(
  [1, 2, 3, 4],
  [3, 4, 5, 6]
);

Output:

[3, 4]

Set ব্যবহার করার কারণে lookup average O(1) হতে পারে।`
  },

  {
    id: "js-173",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Concurrency", "Promise", "Coding"],
    question: "একসাথে সর্বোচ্চ 2টি Promise execute করার concurrency limiter কীভাবে বানাবেন?",
    answer: `Concept:

100 jobs
    ↓
Concurrency = 2
    ↓
Job 1 + Job 2
    ↓
Job 3 starts
    ↓
Job 4 starts

Interview implementation-এ সাধারণত worker pool pattern ব্যবহার করা হয়।

Important idea:

- Pending jobs queue
- Active counter
- Maximum concurrency
- Promise completion হলে next job start

এটি production systems-এ API rate limiting এবং resource control-এর জন্য গুরুত্বপূর্ণ।`
  },

  {
    id: "js-174",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Memory Leak", "Closure", "Performance"],
    question: "Closure কীভাবে memory leak-এর কারণ হতে পারে?",
    answer: `Closure নিজে memory leak নয়।

কিন্তু unnecessary long-lived reference থাকলে memory release হতে দেরি হতে পারে।

Example concept:

function createHandler() {
  const hugeData = new Array(1000000).fill("data");

  return () => {
    console.log("handler");
  };
}

যদি returned function দীর্ঘসময় alive থাকে এবং closure-এর কারণে বড় object reachable থাকে, memory unnecessarily retained হতে পারে।

Prevention:
- Unnecessary references remove করা
- Event listeners cleanup
- Timers cleanup
- Cache limit করা
- Long-lived closures review করা`
  },

  {
    id: "js-175",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Listener", "Memory Leak", "DOM"],
    question: "Event listener থেকে memory leak কীভাবে হতে পারে?",
    answer: `যদি dynamically created object/element-এর সাথে listener attach করা হয় কিন্তু পরে listener remove না করা হয়, long-lived references তৈরি হতে পারে।

Example:

const button = document.querySelector("#button");

function handleClick() {
  console.log("clicked");
}

button.addEventListener("click", handleClick);

Cleanup:

button.removeEventListener("click", handleClick);

Modern UI frameworks-এ component unmount হলে subscriptions, timers এবং listeners cleanup করা গুরুত্বপূর্ণ।`
  },

  {
    id: "js-176",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Debounce", "Throttle", "Interview"],
    question: "Debounce এবং Throttle-এর real-world example দিন।",
    answer: `Debounce:

User search box-এ typing করছে:

J
Ja
Jav
Java

প্রতিটি keystroke-এ API call না করে user typing থামানোর 300-500ms পরে API call করা।

Throttle:

User scroll করছে।

প্রতি millisecond-এ event process না করে প্রতি 100ms-এ সর্বোচ্চ একবার handler চালানো।

Shortcut:

Debounce:
"Stop করলে কাজ করো"

Throttle:
"চলতে থাকলেও নির্দিষ্ট interval-এ কাজ করো"`
  },

  {
    id: "js-177",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Delegation", "DOM", "Coding"],
    question: "Event Delegation কী এবং কেন ব্যবহার করবেন?",
    answer: `Parent element-এ একটি listener রেখে child events handle করাকে event delegation বলা হয়।

Example:

document.querySelector("#list")
  .addEventListener("click", event => {
    const item = event.target.closest("li");

    if (!item) return;

    console.log(item.dataset.id);
  });

Advantages:
- অনেক child-এর জন্য আলাদা listener প্রয়োজন নেই।
- Dynamically added elements handle করা যায়।
- Listener count কমে।

এটি event bubbling-এর উপর নির্ভর করে।`
  },

  {
    id: "js-178",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Event Propagation", "DOM"],
    question: "Event capturing এবং bubbling কী?",
    answer: `Event propagation সাধারণভাবে:

Capturing:
Window
 ↓
Document
 ↓
Parent
 ↓
Target

তারপর:

Target
 ↓
Parent
 ↓
Document
 ↓
Window

এটি bubbling phase।

Example:

element.addEventListener(
  "click",
  handler,
  true
);

true দিলে capturing phase listener register করা যায়।

Default addEventListener listener bubbling phase-এ থাকে।`
  },

  {
    id: "js-179",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["stopPropagation", "DOM"],
    question: "stopPropagation() এবং preventDefault() এর পার্থক্য কী?",
    answer: `preventDefault():

Browser-এর default action prevent করে।

Example:
Link click করলে navigation prevent করা।

stopPropagation():

Event propagation বন্ধ করে।

অর্থাৎ event parent/other propagation phases-এ আর যেতে না পারে।

দুটো একই কাজ করে না।

preventDefault:
"Default browser action বন্ধ করো"

stopPropagation:
"Event propagation বন্ধ করো"`
  },

  {
    id: "js-180",
    category: "JavaScript",
    difficulty: "Advanced",
    tags: ["Senior Interview", "Output", "Event Loop"],
    question: "Senior JavaScript interview-এর জন্য সবচেয়ে গুরুত্বপূর্ণ output concepts কী কী?",
    answer: `সবচেয়ে বেশি practice করুন:

1. var hoisting
2. let/const TDZ
3. Function hoisting
4. Closure
5. var vs let loop
6. this
7. Arrow function this
8. call/apply/bind
9. Prototype chain
10. Type coercion
11. == vs ===
12. null vs undefined
13. NaN
14. Object reference
15. Shallow copy
16. Deep copy
17. map/filter/reduce
18. sort mutation
19. Promise
20. Promise chaining
21. Promise.all
22. Promise.allSettled
23. Promise.race
24. Promise.any
25. async/await
26. Microtask
27. setTimeout
28. Event Loop
29. Generator
30. Iterator
31. Proxy
32. Reflect
33. Debounce
34. Throttle
35. Memoization
36. Event delegation
37. Event propagation
38. Memory leak
39. Garbage collection
40. Concurrency control

Senior interview-এ শুধু output বলা যথেষ্ট নয়।

আপনাকে explain করতে হবে:

"কেন এই output?"

"Call stack-এ কখন গেল?"

"Microtask queue-তে কখন গেল?"

"Reference কোথায়?"

"Closure কোন variable ধরে রেখেছে?"

"এই implementation-এর complexity কত?"

"Production-এ এর সমস্যা কী হতে পারে?"

এই reasoning ability-টাই senior-level JavaScript interview-এ সবচেয়ে গুরুত্বপূর্ণ।`
  }
];