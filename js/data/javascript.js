const javascriptInterviewQuestions = [
  {
    "id": "js-1",
    "category": "JavaScript",
    "difficulty": "Basic",
    "tags": [
      "JavaScript",
      "Runtime"
    ],
    "question": "JavaScript কী এবং কীভাবে কাজ করে?",
    "answer": "\n      <p>JavaScript হলো একটি high-level, dynamically typed, multi-paradigm programming language।</p>\n      <p>Browser-এ JavaScript সাধারণত JavaScript Engine-এর মাধ্যমে execute হয়।</p>\n      <p><strong>উদাহরণ:</strong><br>Chrome → V8<br>Firefox → SpiderMonkey<br>Safari → JavaScriptCore</p>\n      <h4>Basic execution flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JavaScript Code\n      ↓\nParser\n      ↓\nAST\n      ↓\nInterpreter / Compiler\n      ↓\nMachine Code\n      ↓\nCPU</code></pre>\n      </div>\n      <p>Modern JavaScript engine Just-In-Time (JIT) compilation ব্যবহার করে performance improve করে।</p>\n      <p>JavaScript single-threaded হলেও asynchronous operation-এর মাধ্যমে network request, timer, file operation ইত্যাদি handle করতে পারে।</p>\n    "
  },
  {
    "id": "js-2",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "var",
      "let",
      "const",
      "Scope"
    ],
    "question": "var, let এবং const-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p><strong>var:</strong></p>\n      <ul>\n        <li>Function scoped</li>\n        <li>Re-declare করা যায়</li>\n        <li>Re-assign করা যায়</li>\n        <li>Hoisting হয় এবং initial value হিসেবে undefined থাকে</li>\n      </ul>\n      <p><strong>let:</strong></p>\n      <ul>\n        <li>Block scoped</li>\n        <li>Re-declare করা যায় না একই scope-এ</li>\n        <li>Re-assign করা যায়</li>\n        <li>Temporal Dead Zone থাকে</li>\n      </ul>\n      <p><strong>const:</strong></p>\n      <ul>\n        <li>Block scoped</li>\n        <li>Re-declare করা যায় না</li>\n        <li>Re-assign করা যায় না</li>\n        <li>Temporal Dead Zone থাকে</li>\n      </ul>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let age = 30;\nage = 31; // valid</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const name = \"Nazmul\";\nname = \"ABC\"; // Error</code></pre>\n      </div>\n      <h4>তবে const object-এর property পরিবর্তন করা যায়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n      <p>user.name = \"Rahim\"; // valid</p>\n      <p>কারণ const reference পরিবর্তন করতে দেয় না, object-এর internal state পরিবর্তন আটকায় না।</p>\n    "
  },
  {
    "id": "js-3",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Scope",
      "Lexical Scope"
    ],
    "question": "JavaScript-এ Scope কী?",
    "answer": "\n      <p>Scope হলো কোন variable কোথা থেকে access করা যাবে তার boundary।</p>\n      <h4>JavaScript-এর প্রধান scope:</h4>\n      <ol>\n        <li>Global Scope</li>\n        <li>Function Scope</li>\n        <li>Block Scope</li>\n        <li>Module Scope</li>\n      </ol>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let a = 10;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function test() {\n  let b = 20;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (true) {\n    let c = 30;\n  }\n}</code></pre>\n      </div>\n      <p><strong>এখানে:</strong><br>a → global/module scope<br>b → function scope<br>c → block scope</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let এবং const block scoped।\nvar function scoped।</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-4",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Hoisting",
      "Execution Context"
    ],
    "question": "Hoisting কী?",
    "answer": "\n      <p>Hoisting হলো JavaScript execution-এর আগে declarations-এর জন্য environment তৈরি করার behavior।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(a);\nvar a = 10;</code></pre>\n      </div>\n      <p><strong>Output:</strong><br>undefined</p>\n      <h4>কিন্তু:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(b);\nlet b = 10;</code></pre>\n      </div>\n      <p>এখানে ReferenceError হবে কারণ let Temporal Dead Zone-এর মধ্যে থাকে।</p>\n      <h4>Function declaration:</h4>\n      <p>sayHello();</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function sayHello() {\n  console.log(\"Hello\");\n}</code></pre>\n      </div>\n      <p>এটি কাজ করবে।</p>\n      <p><strong>Interview-এ মনে রাখতে হবে:</strong><br>Hoisting মানে code physically উপরে move করা নয়; JavaScript engine execution context তৈরি করার সময় declarations register করে।</p>\n    "
  },
  {
    "id": "js-5",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "TDZ",
      "let",
      "const"
    ],
    "question": "Temporal Dead Zone বা TDZ কী?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let এবং const variable scope-এ enter করার পর declaration execute হওয়ার আগের সময়কে Temporal Dead Zone বলে।</code></pre>\n      </div>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(name);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let name = \"Nazmul\";</code></pre>\n      </div>\n      <p>এখানে ReferenceError হবে।</p>\n      <p>কারণ name scope-এর মধ্যে আছে কিন্তু declaration line execute হয়নি।</p>\n      <p>TDZ accidental variable access prevent করে এবং code safer করে।</p>\n    "
  },
  {
    "id": "js-6",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Primitive",
      "Reference",
      "Data Types"
    ],
    "question": "JavaScript-এর data types কী কী?",
    "answer": "\n      <h4>JavaScript-এর primitive types:</h4>\n      <ol>\n        <li>String</li>\n        <li>Number</li>\n        <li>BigInt</li>\n        <li>Boolean</li>\n        <li>Undefined</li>\n        <li>Null</li>\n        <li>Symbol</li>\n      </ol>\n      <p><strong>Non-primitive/reference type:</strong></p>\n      <ul>\n        <li>Object</li>\n      </ul>\n      <p>Array, Function, Date, Map, Set ইত্যাদি technically object category-এর মধ্যে পড়ে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let name = \"Nazmul\";       // String\nlet age = 30;              // Number\nlet active = true;         // Boolean\nlet x;                     // Undefined\nlet value = null;          // Null\nlet id = 123n;             // BigInt\nlet key = Symbol(\"id\");    // Symbol</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-7",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Equality",
      "Type Coercion"
    ],
    "question": "== এবং === এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>== এবং === দুটোই equality check করে।</p>\n      <p>==:<br>Type coercion করতে পারে।</p>\n      <p>5 == \"5\"<br>→ true</p>\n      <p>===:<br>Type এবং value দুটোই check করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>5 === \"5\"\n→ false</code></pre>\n      </div>\n      <p><strong>Best practice:</strong><br>সাধারণত === এবং !== ব্যবহার করা উচিত কারণ এটি implicit type coercion-এর unexpected behavior কমায়।</p>\n    "
  },
  {
    "id": "js-8",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "Type Coercion"
    ],
    "question": "Type coercion কী?",
    "answer": "\n      <p>এক type-এর value অন্য type-এ automatically বা explicitly convert হওয়াকে type coercion বলে।</p>\n      <h4>Implicit:</h4>\n      <p>\"5\" + 2<br>→ \"52\"</p>\n      <p>\"5\" - 2<br>→ 3</p>\n      <h4>Explicit:</h4>\n      <p>Number(\"5\")<br>String(100)<br>Boolean(1)</p>\n      <p>Interview-এ বুঝতে হবে + operator string থাকলে concatenation করতে পারে, কিন্তু - সাধারণত numeric conversion-এর দিকে যায়।</p>\n    "
  },
  {
    "id": "js-9",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "null",
      "undefined"
    ],
    "question": "null এবং undefined-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p><strong>undefined:</strong><br>সাধারণত value assign করা হয়নি বা property পাওয়া যায়নি।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let x;\nconsole.log(x);\n// undefined</code></pre>\n      </div>\n      <p><strong>null:</strong><br>Developer ইচ্ছাকৃতভাবে empty/no-value বোঝাতে assign করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let user = null;</code></pre>\n      </div>\n      <p><strong>তাই:</strong><br>undefined → value missing/not initialized<br>null → intentional absence of value</p>\n      <p><strong>একটি historical JavaScript behavior:</strong><br>typeof null<br>→ \"object\"</p>\n      <p>এটি JavaScript-এর পুরনো legacy behavior।</p>\n    "
  },
  {
    "id": "js-10",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Execution Context",
      "Call Stack"
    ],
    "question": "Execution Context কী?",
    "answer": "\n      <p>Execution Context হলো JavaScript code execute করার environment।</p>\n      <h4>প্রধান ধরনের execution context:</h4>\n      <ol>\n        <li>Global Execution Context</li>\n        <li>Function Execution Context</li>\n        <li>Eval Execution Context</li>\n      </ol>\n      <p><strong>প্রতিটি execution context-এর মধ্যে সাধারণত:</strong></p>\n      <ul>\n        <li>Variable Environment</li>\n        <li>Lexical Environment</li>\n        <li>This binding</li>\n      </ul>\n      <p>Function call হলে নতুন function execution context তৈরি হয় এবং Call Stack-এ push হয়।</p>\n    "
  },
  {
    "id": "js-11",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Call Stack",
      "Runtime"
    ],
    "question": "Call Stack কী?",
    "answer": "\n      <p>Call Stack হলো JavaScript runtime-এর একটি stack data structure যেখানে currently executing function-এর execution context রাখা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function one() {\n  two();\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function two() {\n  console.log(\"Hello\");\n}</code></pre>\n      </div>\n      <p>one();</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>one()\n ↓\ntwo()\n ↓\nconsole.log()\n ↓\nreturn\n ↓\ntwo()\n ↓\none()</code></pre>\n      </div>\n      <p>JavaScript-এর main execution thread single call stack ব্যবহার করে।</p>\n    "
  },
  {
    "id": "js-12",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Closure",
      "Scope"
    ],
    "question": "Closure কী?",
    "answer": "\n      <p>Closure হলো এমন function যা নিজের outer lexical scope-এর variables মনে রাখতে পারে, এমনকি outer function execution শেষ হওয়ার পরও।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function counter() {\n  let count = 0;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return function () {\n    count++;\n    return count;\n  };\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const increment = counter();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>increment(); // 1\nincrement(); // 2</code></pre>\n      </div>\n      <p>এখানে inner function count variable-এর access ধরে রেখেছে।</p>\n      <p><strong>Closure-এর common use:</strong></p>\n      <ul>\n        <li>Data encapsulation</li>\n        <li>Private state</li>\n        <li>Function factories</li>\n        <li>Callbacks</li>\n        <li>Memoization</li>\n        <li>Event handlers</li>\n      </ul>\n    "
  },
  {
    "id": "js-13",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "this",
      "Object"
    ],
    "question": "JavaScript-এ this কী?",
    "answer": "\n      <p>this-এর value function কীভাবে call হয়েছে তার উপর নির্ভর করে।</p>\n      <h4>Object method:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  getName() {\n    return this.name;\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>user.getName();\n// Nazmul</code></pre>\n      </div>\n      <p>Regular function-এর this strict mode এবং call context অনুযায়ী পরিবর্তিত হতে পারে।</p>\n      <p>Arrow function-এর নিজের this নেই। এটি surrounding lexical context থেকে this নেয়।</p>\n      <p>এই কারণে callback এবং object method-এর মধ্যে arrow function ব্যবহার করার সময় সতর্ক হতে হয়।</p>\n    "
  },
  {
    "id": "js-14",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Arrow Function",
      "this"
    ],
    "question": "Arrow function এবং regular function-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Arrow function:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const add = (a, b) =&gt; a + b;</code></pre>\n      </div>\n      <h4>গুরুত্বপূর্ণ পার্থক্য:</h4>\n      <ol>\n        <li>Arrow function-এর নিজের this নেই।</li>\n        <li>নিজের arguments object নেই।</li>\n        <li>Constructor হিসেবে ব্যবহার করা যায় না।</li>\n        <li>prototype নেই।</li>\n        <li>Lexical this ব্যবহার করে।</li>\n      </ol>\n      <p><strong>Regular function:</strong></p>\n      <ul>\n        <li>নিজের this binding থাকতে পারে।</li>\n        <li>arguments object থাকে।</li>\n        <li>new দিয়ে constructor হিসেবে ব্যবহার করা যায়।</li>\n      </ul>\n    "
  },
  {
    "id": "js-15",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Prototype",
      "Inheritance"
    ],
    "question": "JavaScript Prototype কী?",
    "answer": "\n      <p>JavaScript prototype-based inheritance ব্যবহার করে।</p>\n      <p>প্রতিটি object-এর একটি internal prototype relationship থাকে, যার মাধ্যমে inherited property/method পাওয়া যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n      <p>Object.prototype-এর methods যেমন toString() prototype chain-এর মাধ্যমে পাওয়া যায়।</p>\n      <h4>Prototype chain:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>object\n ↓\nObject.prototype\n ↓\nnull</code></pre>\n      </div>\n      <p>Class syntax থাকলেও JavaScript-এর underlying inheritance mechanism prototype-based।</p>\n    "
  },
  {
    "id": "js-16",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Prototype Chain",
      "Inheritance"
    ],
    "question": "Prototype Chain কী?",
    "answer": "\n      <p>কোনো property object-এ না পাওয়া গেলে JavaScript তার prototype-এ খুঁজে এবং এভাবে উপরের দিকে যেতে থাকে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>user\n ↓\nUser.prototype\n ↓\nObject.prototype\n ↓\nnull</code></pre>\n      </div>\n      <p>যদি user.name পাওয়া না যায়:<br>1. user<br>2. user prototype<br>3. Object.prototype<br>4. null</p>\n      <p>এটিই prototype chain।</p>\n    "
  },
  {
    "id": "js-17",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Class",
      "OOP"
    ],
    "question": "JavaScript class কীভাবে কাজ করে?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class syntax JavaScript-এ object-oriented programming-এর convenient syntax।</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class User {\n  constructor(name) {\n    this.name = name;\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>greet() {\n    return \"Hello \" + this.name;\n  }\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = new User(\"Nazmul\");</code></pre>\n      </div>\n      <p>Class method সাধারণত prototype-এ থাকে।</p>\n      <p>অর্থাৎ class syntax ব্যবহার করলেও underlying inheritance prototype-based।</p>\n    "
  },
  {
    "id": "js-18",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Destructuring",
      "ES6"
    ],
    "question": "Destructuring কী?",
    "answer": "\n      <p>Object বা array থেকে সহজে value বের করার syntax হলো destructuring।</p>\n      <h4>Object:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  age: 30\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const { name, age } = user;</code></pre>\n      </div>\n      <h4>Array:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [10, 20];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [a, b] = numbers;</code></pre>\n      </div>\n      <h4>Function parameter-এও ব্যবহার করা যায়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function greet({ name }) {\n  console.log(name);\n}</code></pre>\n      </div>\n      <p>Modern JavaScript এবং React/Node.js code-এ এটি খুব common।</p>\n    "
  },
  {
    "id": "js-19",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Spread",
      "Rest",
      "ES6"
    ],
    "question": "Spread operator এবং Rest operator-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p><strong>দুটির syntax একই:</strong> ...</p>\n      <p><strong>Spread:</strong><br>Iterable/object-এর values expand করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const a = [1, 2];\nconst b = [...a, 3];</code></pre>\n      </div>\n      <p><strong>Rest:</strong><br>Multiple values collect করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function sum(...numbers) {\n  return numbers;\n}</code></pre>\n      </div>\n      <p>Spread → expand<br>Rest → collect</p>\n      <h4>Object:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user2 = {\n  ...user1,\n  age: 30\n};</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-20",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Shallow Copy",
      "Deep Copy"
    ],
    "question": "Shallow copy এবং Deep copy কী?",
    "answer": "\n      <p>Shallow copy শুধু top-level properties copy করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  address: {\n    city: \"Dhaka\"\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const copy = { ...user };</code></pre>\n      </div>\n      <p>copy.address.city = \"Chittagong\";</p>\n      <p>এতে original user-এর nested address-ও পরিবর্তিত হবে।</p>\n      <p>Deep copy nested structure-ও আলাদা করে copy করে।</p>\n      <p><strong>Modern approach:</strong><br>structuredClone(user)</p>\n      <p>JSON.parse(JSON.stringify(obj)) কিছু ক্ষেত্রে কাজ করলেও Date, undefined, functions, Map, Set ইত্যাদির জন্য reliable general-purpose solution নয়।</p>\n    "
  },
  {
    "id": "js-21",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Higher Order Function",
      "Functional Programming"
    ],
    "question": "Higher-Order Function কী?",
    "answer": "\n      <p>যে function অন্য function-কে argument হিসেবে নেয় অথবা function return করে তাকে Higher-Order Function বলে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function calculate(a, b, operation) {\n  return operation(a, b);\n}</code></pre>\n      </div>\n      <p>calculate(5, 3, (a, b) =&gt; a + b);</p>\n      <p><strong>Common built-in HOF:</strong></p>\n      <ul>\n        <li>map()</li>\n        <li>filter()</li>\n        <li>reduce()</li>\n        <li>forEach()</li>\n        <li>some()</li>\n        <li>every()</li>\n        <li>find()</li>\n      </ul>\n      <p>Functional programming-এ Higher-Order Function খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-22",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "map",
      "filter",
      "reduce"
    ],
    "question": "map(), filter() এবং reduce() এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>map():<br>প্রতিটি element transform করে নতুন array return করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1,2,3].map(x =&gt; x * 2)\n// [2,4,6]</code></pre>\n      </div>\n      <p>filter():<br>Condition অনুযায়ী element রেখে নতুন array দেয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1,2,3].filter(x =&gt; x &gt; 1)\n// [2,3]</code></pre>\n      </div>\n      <p>reduce():<br>সব element process করে একটি accumulated result তৈরি করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1,2,3].reduce((sum, x) =&gt; sum + x, 0)\n// 6</code></pre>\n      </div>\n      <p><strong>Interview-এ বুঝতে হবে:</strong><br>map → transform<br>filter → select<br>reduce → accumulate</p>\n    "
  },
  {
    "id": "js-23",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Async",
      "Promise"
    ],
    "question": "Promise কী?",
    "answer": "\n      <p>Promise হলো asynchronous operation-এর eventual success বা failure represent করার object।</p>\n      <h4>Promise-এর তিনটি state:</h4>\n      <ol>\n        <li>Pending</li>\n        <li>Fulfilled</li>\n        <li>Rejected</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const promise = fetch(\"/users\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>promise\n  .then(response =&gt; response.json())\n  .then(data =&gt; console.log(data))\n  .catch(error =&gt; console.error(error));</code></pre>\n      </div>\n      <p>Promise callback nesting কমায় এবং asynchronous flow manage করতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "js-24",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "async",
      "await",
      "Promise"
    ],
    "question": "async/await কীভাবে কাজ করে?",
    "answer": "\n      <p>async function Promise return করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>await Promise settle হওয়া পর্যন্ত ওই async function-এর execution pause করে, কিন্তু JavaScript-এর পুরো thread block করে না।</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async function getUsers() {\n  const response = await fetch(\"/users\");\n  const users = await response.json();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return users;\n}</code></pre>\n      </div>\n      <h4>Error handling:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  const users = await getUsers();\n} catch (error) {\n  console.error(error);\n}</code></pre>\n      </div>\n      <p>async/await Promise-এর উপর built হওয়া cleaner syntax।</p>\n    "
  },
  {
    "id": "js-25",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Event Loop",
      "Async",
      "Runtime"
    ],
    "question": "Event Loop কী?",
    "answer": "\n      <p>JavaScript single-threaded হলেও asynchronous কাজ manage করার mechanism হলো Event Loop।</p>\n      <h4>Main components:</h4>\n      <p>Call Stack<br>Web APIs / Runtime APIs<br>Task Queue<br>Microtask Queue<br>Event Loop</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"A\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setTimeout(() =&gt; {\n  console.log(\"B\");\n}, 0);</code></pre>\n      </div>\n      <p>console.log(\"C\");</p>\n      <p><strong>Output:</strong><br>A<br>C<br>B</p>\n      <p>কারণ setTimeout callback পরে task queue-তে যায়। Call stack empty হলে event loop callback execute করায়।</p>\n    "
  },
  {
    "id": "js-26",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Microtask",
      "Macrotask",
      "Promise"
    ],
    "question": "Microtask এবং Macrotask-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p><strong>Microtask-এর উদাহরণ:</strong></p>\n      <ul>\n        <li>Promise.then()</li>\n        <li>Promise.catch()</li>\n        <li>queueMicrotask()</li>\n        <li>MutationObserver</li>\n      </ul>\n      <p><strong>Task/macrotask-এর উদাহরণ:</strong></p>\n      <ul>\n        <li>setTimeout()</li>\n        <li>setInterval()</li>\n        <li>কিছু browser event callbacks</li>\n      </ul>\n      <p>সাধারণভাবে একটি task শেষ হওয়ার পর এবং পরবর্তী task নেওয়ার আগে pending microtasks drain করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"A\");</code></pre>\n      </div>\n      <p>setTimeout(() =&gt; console.log(\"B\"), 0);</p>\n      <p>Promise.resolve().then(() =&gt; console.log(\"C\"));</p>\n      <p>console.log(\"D\");</p>\n      <p><strong>Output:</strong><br>A<br>D<br>C<br>B</p>\n      <p>কারণ Promise callback microtask queue-তে যায় এবং timer callback task queue-তে যায়।</p>\n    "
  },
  {
    "id": "js-27",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Promise.all",
      "Concurrency"
    ],
    "question": "Promise.all(), Promise.allSettled(), Promise.race() এবং Promise.any() এর পার্থক্য কী?",
    "answer": "\n      <p>Promise.all():<br>সব Promise সফল হলে result দেয়।<br>একটি reject হলে পুরো Promise reject হয়।</p>\n      <p>Promise.allSettled():<br>সব Promise complete হওয়া পর্যন্ত wait করে এবং প্রতিটির status দেয়।</p>\n      <p>Promise.race():<br>যে Promise প্রথম settle করে তার result দেয়।</p>\n      <p>Promise.any():<br>যে Promise প্রথম fulfill করে তার result দেয়।<br>সব reject হলে AggregateError দেয়।</p>\n      <h4>Use case:</h4>\n      <p>Promise.all()<br>→ independent requests parallelভাবে execute</p>\n      <p>Promise.allSettled()<br>→ সব operation-এর result দরকার</p>\n      <p>Promise.race()<br>→ timeout বা first-completion pattern</p>\n      <p>Promise.any()<br>→ multiple sources-এর মধ্যে প্রথম successful result</p>\n    "
  },
  {
    "id": "js-28",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Callback",
      "Async"
    ],
    "question": "Callback কী এবং Callback Hell কী?",
    "answer": "\n      <p>Callback হলো একটি function যা অন্য function-এর argument হিসেবে দেওয়া হয় এবং পরে execute করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setTimeout(() =&gt; {\n  console.log(\"Done\");\n}, 1000);</code></pre>\n      </div>\n      <p>Callback Hell হলো nested callbacks-এর কারণে code deeply nested এবং difficult-to-maintain হয়ে যাওয়া।</p>\n      <p><strong>Solution:</strong></p>\n      <ul>\n        <li>Promise</li>\n        <li>async/await</li>\n        <li>Modular functions</li>\n        <li>Proper error handling</li>\n      </ul>\n      <p>Modern JavaScript-এ async/await সাধারণত callback nesting কমায়।</p>\n    "
  },
  {
    "id": "js-29",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Debounce",
      "Performance"
    ],
    "question": "Debouncing কী?",
    "answer": "\n      <p>Debouncing এমন technique যেখানে continuous events-এর মধ্যে শেষ event-এর পরে নির্দিষ্ট সময় অপেক্ষা করে function execute করা হয়।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Search input</li>\n        <li>Auto-save</li>\n        <li>Resize event</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User types:\na → ab → abc → abcd</code></pre>\n      </div>\n      <p>প্রতিবার API call না করে user typing থামার 300ms পরে একবার API call করা।</p>\n      <p>এতে unnecessary function/API calls কমে।</p>\n    "
  },
  {
    "id": "js-30",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Throttle",
      "Performance"
    ],
    "question": "Throttling কী?",
    "answer": "\n      <p>Throttle নির্দিষ্ট time interval-এর মধ্যে function সর্বোচ্চ কতবার execute করতে পারবে তা সীমাবদ্ধ করে।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Scroll</li>\n        <li>Mouse move</li>\n        <li>Resize</li>\n        <li>Continuous UI events</li>\n      </ul>\n      <h4>Difference:</h4>\n      <p><strong>Debounce:</strong><br>শেষ event-এর পরে execute।</p>\n      <p><strong>Throttle:</strong><br>নির্দিষ্ট interval-এ সর্বোচ্চ একবার execute।</p>\n      <p><strong>উদাহরণ:</strong><br>Scroll event প্রতি 100ms-এ সর্বোচ্চ একবার process করা।</p>\n    "
  },
  {
    "id": "js-31",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Event Delegation",
      "DOM"
    ],
    "question": "Event Delegation কী?",
    "answer": "\n      <p>Parent element-এর event listener ব্যবহার করে child elements-এর events handle করাকে Event Delegation বলে।</p>\n      <p>কারণ event bubbling-এর মাধ্যমে event parent-এর দিকে যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>list.addEventListener(\"click\", event =&gt; {\n  if (event.target.matches(\"button\")) {\n    // handle\n  }\n});</code></pre>\n      </div>\n      <p><strong>সুবিধা:</strong></p>\n      <ul>\n        <li>অনেক listener attach করতে হয় না।</li>\n        <li>Dynamic elements handle করা যায়।</li>\n        <li>Memory usage কমতে পারে।</li>\n      </ul>\n      <p>Large dynamic lists-এর জন্য useful।</p>\n    "
  },
  {
    "id": "js-32",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Event Bubbling",
      "Event Capturing"
    ],
    "question": "Event Bubbling এবং Event Capturing কী?",
    "answer": "\n      <h4>Event propagation-এর প্রধান phase:</h4>\n      <ol>\n        <li>Capturing</li>\n        <li>Target</li>\n        <li>Bubbling</li>\n      </ol>\n      <h4>HTML:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;div&gt;\n  &lt;button&gt;Click&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n      </div>\n      <p>Button click করলে event প্রথমে outer থেকে target-এর দিকে capture করতে পারে, তারপর target এবং পরে parent-এর দিকে bubble করে।</p>\n      <p><strong>Capturing:</strong><br>Parent → Child</p>\n      <p><strong>Bubbling:</strong><br>Child → Parent</p>\n      <p><strong>addEventListener-এর third argument বা options-এর capture:</strong> true ব্যবহার করে capturing phase listen করা যায়।</p>\n    "
  },
  {
    "id": "js-33",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "preventDefault",
      "stopPropagation",
      "DOM"
    ],
    "question": "preventDefault() এবং stopPropagation() এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>preventDefault():<br>Browser-এর default behavior prevent করে।</p>\n      <p><strong>Example:</strong><br>Form submit prevent করা।</p>\n      <p>event.preventDefault();</p>\n      <p>stopPropagation():<br>Event-এর propagation বন্ধ করে।</p>\n      <p>event.stopPropagation();</p>\n      <p><strong>Example:</strong><br>Child button-এর click parent listener-এ যেতে না দেওয়া।</p>\n      <p><strong>দুটো এক জিনিস নয়:</strong><br>preventDefault → default browser action বন্ধ<br>stopPropagation → event propagation বন্ধ</p>\n    "
  },
  {
    "id": "js-34",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Memory",
      "Garbage Collection"
    ],
    "question": "JavaScript Garbage Collection কী?",
    "answer": "\n      <p>JavaScript automatic memory management ব্যবহার করে।</p>\n      <p>যে object আর reachable নয় সেটি garbage collection-এর জন্য eligible হয়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Root\n ↓\nObject A\n ↓\nObject B</code></pre>\n      </div>\n      <p>যদি Object A থেকে Object B-এর reference remove হয়ে যায় এবং অন্য কোনো reachable reference না থাকে, তাহলে B garbage collection-এর জন্য eligible হতে পারে।</p>\n      <p>Modern engines সাধারণত tracing-based garbage collection ব্যবহার করে।</p>\n      <p>Developer সরাসরি garbage collector control করতে পারে না।</p>\n    "
  },
  {
    "id": "js-35",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Memory Leak",
      "Performance"
    ],
    "question": "JavaScript Memory Leak কীভাবে হয়?",
    "answer": "\n      <p>Memory leak হলো এমন memory যা application-এর আর প্রয়োজন নেই কিন্তু reference থাকার কারণে garbage collector reclaim করতে পারছে না।</p>\n      <p><strong>Common causes:</strong><br>1. Unremoved event listeners<br>2. Timers/intervals<br>3. Global variables<br>4. Large cached objects<br>5. Closures ধরে রাখা references<br>6. Detached DOM references</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Example:\nsetInterval(() =&gt; {\n  // unnecessary reference\n}, 1000);</code></pre>\n      </div>\n      <p>Production application-এ browser memory profiling দিয়ে leak detect করা যায়।</p>\n    "
  },
  {
    "id": "js-36",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Module",
      "ESM",
      "CommonJS"
    ],
    "question": "ES Modules এবং CommonJS-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>ES Modules:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export:\nexport function add() {}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import:\nimport { add } from \"./math.js\";</code></pre>\n      </div>\n      <h4>CommonJS:</h4>\n      <p>module.exports = add;</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>require:\nconst add = require(\"./math\");</code></pre>\n      </div>\n      <p>ESM JavaScript-এর standard module system।</p>\n      <p>CommonJS Node.js ecosystem-এ historically খুব common।</p>\n      <p>Modern Node.js এবং frontend tooling-এ ESM increasingly common।</p>\n    "
  },
  {
    "id": "js-37",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "Optional Chaining",
      "Nullish Coalescing",
      "ES2020"
    ],
    "question": "Optional chaining এবং Nullish coalescing কী?",
    "answer": "\n      <p><strong>Optional chaining:</strong><br>?. ব্যবহার করে safely nested property access করা যায়।</p>\n      <p>user?.profile?.address?.city</p>\n      <p>যদি মাঝখানে null/undefined থাকে তাহলে error না দিয়ে undefined return করতে পারে।</p>\n      <p><strong>Nullish coalescing:</strong><br>?? ব্যবহার করে null বা undefined হলে fallback দেওয়া যায়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const name = user.name ?? \"Guest\";</code></pre>\n      </div>\n      <p>এটি || থেকে আলাদা।</p>\n      <p>0 || 10<br>→ 10</p>\n      <p>0 ?? 10<br>→ 0</p>\n      <p>কারণ ?? শুধু null এবং undefined-এর জন্য fallback ব্যবহার করে।</p>\n    "
  },
  {
    "id": "js-38",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "Map",
      "Set",
      "Data Structures"
    ],
    "question": "Map এবং Set কী?",
    "answer": "\n      <p>Map key-value collection।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const map = new Map();\nmap.set(\"id\", 10);\nmap.get(\"id\");</code></pre>\n      </div>\n      <p>Map-এর key যেকোনো value হতে পারে।</p>\n      <p>Set unique values store করে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const set = new Set([1, 2, 2, 3]);</code></pre>\n      </div>\n      <p><strong>Result:</strong><br>1, 2, 3</p>\n      <p><strong>Use case:</strong><br>Map → structured key-value lookup<br>Set → uniqueness check / duplicate removal</p>\n      <p>Object-এর পরিবর্তে Map ব্যবহার করা useful হতে পারে যখন arbitrary key types বা Map-specific operations দরকার হয়।</p>\n    "
  },
  {
    "id": "js-39",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "WeakMap",
      "WeakSet",
      "Memory"
    ],
    "question": "WeakMap এবং WeakSet কী?",
    "answer": "\n      <p>WeakMap object keys-এর সাথে value associate করে এবং keys weakly held হয়।</p>\n      <p>WeakSet object values রাখে এবং weak references ব্যবহার করে।</p>\n      <p><strong>এগুলোর important property:</strong></p>\n      <ul>\n        <li>সাধারণ iteration নেই।</li>\n        <li>Keys/values garbage collection-এর সাথে compatible।</li>\n        <li>Memory-sensitive metadata storage-এ useful হতে পারে।</li>\n      </ul>\n      <p><strong>Example use case:</strong><br>Object-এর সাথে private metadata associate করা।</p>\n    "
  },
  {
    "id": "js-40",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Object",
      "Immutability"
    ],
    "question": "Object.freeze(), Object.seal() এবং Object.preventExtensions() এর পার্থক্য কী?",
    "answer": "\n      <p>Object.preventExtensions():<br>নতুন property add করা যায় না।</p>\n      <p>Object.seal():<br>নতুন property add করা যায় না এবং existing property delete করা যায় না।</p>\n      <p>Object.freeze():<br>Object-এর own data properties সাধারণভাবে add/delete/change করা যায় না।</p>\n      <p>তবে এগুলো shallow।</p>\n      <p>Nested object আলাদা করে freeze না করলে nested object পরিবর্তন হতে পারে।</p>\n    "
  },
  {
    "id": "js-41",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Functional Programming",
      "Pure Function"
    ],
    "question": "Pure Function কী?",
    "answer": "\n      <h4>Pure function-এর দুটি প্রধান property:</h4>\n      <ol>\n        <li>একই input দিলে সবসময় একই output।</li>\n        <li>External state-এর side effect নেই।</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function add(a, b) {\n  return a + b;\n}</code></pre>\n      </div>\n      <h4>Impure:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let total = 0;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function addToTotal(value) {\n  total += value;\n}</code></pre>\n      </div>\n      <p>Pure functions testing এবং reasoning সহজ করে এবং functional programming-এর গুরুত্বপূর্ণ concept।</p>\n    "
  },
  {
    "id": "js-42",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "Currying",
      "Functional Programming"
    ],
    "question": "Currying কী?",
    "answer": "\n      <p>একটি multiple-argument function-কে একাধিক single-argument function-এ transform করাকে currying বলে।</p>\n      <h4>Normal:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function add(a, b) {\n  return a + b;\n}</code></pre>\n      </div>\n      <h4>Curried:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function add(a) {\n  return function(b) {\n    return a + b;\n  };\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>add(5)(3);\n// 8</code></pre>\n      </div>\n      <p>Functional programming এবং reusable function তৈরি করতে currying ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "js-43",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Memoization",
      "Performance"
    ],
    "question": "Memoization কী?",
    "answer": "\n      <p>Expensive function-এর previous result cache করে রাখাকে memoization বলে।</p>\n      <h4>Example concept:</h4>\n      <p>calculate(10)<br>→ calculate</p>\n      <p>calculate(10)<br>→ cached result</p>\n      <p>এতে একই input-এর জন্য expensive calculation পুনরায় করতে হয় না।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Expensive calculations</li>\n        <li>Recursive algorithms</li>\n        <li>Derived data</li>\n      </ul>\n      <p>তবে cache size এবং invalidation বিবেচনা করতে হবে।</p>\n    "
  },
  {
    "id": "js-44",
    "category": "JavaScript",
    "difficulty": "Important",
    "tags": [
      "Error Handling",
      "try-catch"
    ],
    "question": "JavaScript-এ Error Handling কীভাবে করা হয়?",
    "answer": "\n      <h4>Common mechanisms:</h4>\n      <p>try<br>catch<br>finally<br>throw</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  riskyOperation();\n} catch (error) {\n  console.error(error);\n} finally {\n  cleanup();\n}</code></pre>\n      </div>\n      <h4>Custom error:</h4>\n      <p>throw new Error(\"Invalid user\");</p>\n      <h4>Async/await:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  await apiCall();\n} catch (error) {\n  // handle error\n}</code></pre>\n      </div>\n      <p>Production application-এ error log, meaningful response এবং sensitive internal details hide করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-45",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Security",
      "XSS"
    ],
    "question": "XSS কী এবং JavaScript application কীভাবে protect করবেন?",
    "answer": "\n      <p>XSS = Cross-Site Scripting।</p>\n      <p>Attacker malicious script inject করে এবং victim-এর browser-এ execute করানোর চেষ্টা করে।</p>\n      <p><strong>Protection:</strong><br>1. User input properly validate।<br>2. Output context অনুযায়ী encode।<br>3. Dangerous HTML injection avoid।<br>4. Content Security Policy ব্যবহার।<br>5. Trusted sanitization library ব্যবহার যেখানে HTML allow করতে হয়।<br>6. Cookies-এ HttpOnly/Secure/SameSite ব্যবহার যেখানে appropriate।</p>\n      <p>React-এর default rendering অনেক ক্ষেত্রে HTML escape করে, কিন্তু dangerouslySetInnerHTML-এর মতো API ব্যবহার করলে extra care দরকার।</p>\n    "
  },
  {
    "id": "js-46",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "CORS",
      "Browser",
      "Security"
    ],
    "question": "CORS কী?",
    "answer": "\n      <p>CORS = Cross-Origin Resource Sharing।</p>\n      <p>Browser security policy অনুযায়ী একটি origin থেকে অন্য origin-এর resource access করার permission server response headers দিয়ে control করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Frontend:\nhttps://app.example.com</code></pre>\n      </div>\n      <p><strong>API:</strong><br>https://api.example.com</p>\n      <p>Server trusted origin allow করতে পারে।</p>\n      <p>CORS browser-enforced policy।</p>\n      <p>এটি authentication system-এর replacement নয় এবং server-to-server requests-এ browser CORS restriction একইভাবে apply করে না।</p>\n    "
  },
  {
    "id": "js-47",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Storage",
      "Browser"
    ],
    "question": "localStorage, sessionStorage এবং cookies-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p><strong>localStorage:</strong></p>\n      <ul>\n        <li>Browser-এ persistent storage</li>\n        <li>Expire হয় না যতক্ষণ না manually clear করা হয়</li>\n        <li>Server-এ automatically পাঠানো হয় না</li>\n      </ul>\n      <p><strong>sessionStorage:</strong></p>\n      <ul>\n        <li>Tab/session-এর সাথে associated</li>\n        <li>Tab/session শেষ হলে সাধারণত clear হয়</li>\n        <li>Server-এ automatically পাঠানো হয় না</li>\n      </ul>\n      <p><strong>Cookies:</strong></p>\n      <ul>\n        <li>ছোট data</li>\n        <li>Request-এর সাথে automatically পাঠানো হতে পারে</li>\n        <li>Expiration এবং security attributes থাকে</li>\n      </ul>\n      <p>Authentication-এর ক্ষেত্রে sensitive session identifiers-এর জন্য HttpOnly + Secure + appropriate SameSite cookie ব্যবহার করা অনেক ক্ষেত্রে safer approach হতে পারে।</p>\n    "
  },
  {
    "id": "js-48",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Web API",
      "Fetch",
      "HTTP"
    ],
    "question": "fetch() কী এবং কীভাবে error handle করবেন?",
    "answer": "\n      <p>fetch() HTTP request করার জন্য Promise-based Web API।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const response = await fetch(\"/users\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (!response.ok) {\n  throw new Error(\"Request failed\");\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const data = await response.json();</code></pre>\n      </div>\n      <p><strong>গুরুত্বপূর্ণ:</strong><br>fetch() HTTP 4xx/5xx response পেলেই automatically reject করে না।</p>\n      <p>Network failure হলে Promise reject হতে পারে।</p>\n      <p>তাই response.ok/status explicitly check করা উচিত।</p>\n    "
  },
  {
    "id": "js-49",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Async",
      "Concurrency"
    ],
    "question": "Sequential এবং Parallel asynchronous execution-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Sequential:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const a = await getA();\nconst b = await getB();</code></pre>\n      </div>\n      <p>এখানে B শুরু হবে A শেষ হওয়ার পরে।</p>\n      <h4>Parallel/concurrent start:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [a, b] = await Promise.all([\n  getA(),\n  getB()\n]);</code></pre>\n      </div>\n      <p>যদি A এবং B একে অপরের উপর dependent না হয় তাহলে Promise.all() latency কমাতে পারে।</p>\n      <p>তবে dependency থাকলে sequential execution দরকার হতে পারে।</p>\n    "
  },
  {
    "id": "js-50",
    "category": "JavaScript",
    "difficulty": "Very Important",
    "tags": [
      "Interview",
      "Advanced",
      "Runtime"
    ],
    "question": "JavaScript interview-এর জন্য কোন concepts সবচেয়ে গুরুত্বপূর্ণ?",
    "answer": "\n      <h4>Senior/Mid-level JavaScript interview-এর জন্য নিচের topics অবশ্যই strong হতে হবে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Core:\n1. var / let / const\n2. Scope\n3. Hoisting\n4. TDZ\n5. Data Types\n6. Type Coercion\n7. == vs ===\n8. Execution Context\n9. Call Stack\n10. this\n11. Closure\n12. Prototype\n13. Prototype Chain\n14. Class\n15. Object/Array</code></pre>\n      </div>\n      <p>ES6+:<br>16. Destructuring<br>17. Spread/Rest<br>18. Template literals<br>19. Default parameters<br>20. Modules<br>21. Optional chaining<br>22. Nullish coalescing<br>23. Map/Set<br>24. Symbols</p>\n      <p><strong>Async:</strong><br>25. Callback<br>26. Promise<br>27. async/await<br>28. Event Loop<br>29. Microtask vs Task<br>30. Promise.all/allSettled/race/any<br>31. Sequential vs parallel execution</p>\n      <p><strong>Functional:</strong><br>32. Higher-order function<br>33. map/filter/reduce<br>34. Closure<br>35. Pure function<br>36. Currying<br>37. Memoization</p>\n      <p><strong>Browser:</strong><br>38. DOM<br>39. Event bubbling/capturing<br>40. Event delegation<br>41. preventDefault<br>42. localStorage/sessionStorage/cookies<br>43. CORS<br>44. Fetch<br>45. Web APIs</p>\n      <p><strong>Performance:</strong><br>46. Debounce<br>47. Throttle<br>48. Memory management<br>49. Garbage collection<br>50. Memory leak</p>\n      <p><strong>Security:</strong><br>51. XSS<br>52. CSRF<br>53. CORS<br>54. Secure cookies<br>55. Input validation</p>\n      <p><strong>Advanced:</strong><br>56. Prototype inheritance<br>57. Generators<br>58. Iterators<br>59. Symbols<br>60. WeakMap/WeakSet<br>61. Proxy<br>62. Reflect<br>63. TypedArray<br>64. AbortController<br>65. Web Workers</p>\n      <p><strong>সবচেয়ে বেশি interview value:</strong><br>Closure<br>→ this<br>→ Prototype<br>→ Hoisting<br>→ Event Loop<br>→ Promise<br>→ async/await<br>→ Microtask<br>→ Call Stack<br>→ Scope<br>→ Debounce/Throttle<br>→ Shallow/Deep Copy<br>→ map/filter/reduce<br>→ Event Delegation<br>→ Memory Leak<br>→ CORS/XSS<br>→ ES Modules</p>\n    "
  },
  {
    "id": "js-61",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Iterator",
      "ES6"
    ],
    "question": "Iterator কী?",
    "answer": "\n      <p>Iterator হলো এমন object যার next() method থাকে এবং প্রতিবার next() call করলে পরবর্তী value return করে।</p>\n      <h4>Iterator-এর next() সাধারণত এই structure return করে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  value: ...,\n  done: false\n}</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [10, 20, 30];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const iterator = numbers[Symbol.iterator]();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>iterator.next();\n// { value: 10, done: false }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>iterator.next();\n// { value: 20, done: false }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>iterator.next();\n// { value: 30, done: false }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>iterator.next();\n// { value: undefined, done: true }</code></pre>\n      </div>\n      <p>Array, String, Map, Set ইত্যাদি iterable এবং তাদের iterator পাওয়া যায় Symbol.iterator-এর মাধ্যমে।</p>\n    "
  },
  {
    "id": "js-62",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Iterable",
      "Iterator",
      "Symbol"
    ],
    "question": "Iterable এবং Iterator-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Iterable হলো এমন object যেটির Symbol.iterator method আছে।</p>\n      <p>Iterator হলো এমন object যার next() method আছে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [1, 2, 3];</code></pre>\n      </div>\n      <p>numbers<br>→ Iterable</p>\n      <p>numbers[Symbol.iterator]()<br>→ Iterator</p>\n      <p>Iterator-এর next() method দিয়ে একে একে values পাওয়া যায়।</p>\n      <p>for...of loop internally iterable-এর iterator ব্যবহার করে।</p>\n    "
  },
  {
    "id": "js-63",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Generator",
      "Iterator"
    ],
    "question": "Generator Function কী?",
    "answer": "\n      <p>Generator হলো বিশেষ function যা execution pause এবং resume করতে পারে।</p>\n      <h4>Syntax:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function* numbers() {\n  yield 1;\n  yield 2;\n  yield 3;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const generator = numbers();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>generator.next();\n// { value: 1, done: false }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>generator.next();\n// { value: 2, done: false }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>generator.next();\n// { value: 3, done: false }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>generator.next();\n// { value: undefined, done: true }</code></pre>\n      </div>\n      <p>Generator function-এর execution yield-এর জায়গায় pause হয় এবং পরবর্তী next() call-এ resume হয়।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Lazy evaluation</li>\n        <li>Large data processing</li>\n        <li>Custom iterators</li>\n        <li>State machines</li>\n        <li>Streaming-like processing</li>\n      </ul>\n    "
  },
  {
    "id": "js-64",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Generator",
      "yield"
    ],
    "question": "yield কী?",
    "answer": "\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>yield Generator function-এর execution pause করে এবং একটি value return করে।</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function* test() {\n  yield 10;\n  yield 20;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const gen = test();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>gen.next();\n// 10</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>gen.next();\n// 20</code></pre>\n      </div>\n      <h4>yield এবং return-এর মধ্যে পার্থক্য:</h4>\n      <p><strong>return:</strong><br>Function permanently শেষ করে।</p>\n      <p><strong>yield:</strong><br>Generator temporarily pause করে এবং পরে resume হতে পারে।</p>\n    "
  },
  {
    "id": "js-65",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Generator",
      "Async"
    ],
    "question": "Generator কি asynchronous?",
    "answer": "\n      <p>সাধারণ Generator নিজে asynchronous নয়।</p>\n      <p>Generator synchronous execution pause/resume করে।</p>\n      <p>Async Generator asynchronous iteration support করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async function* stream() {\n  yield await getData();\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for await (const item of stream()) {\n  console.log(item);\n}</code></pre>\n      </div>\n      <p><strong>Async Generator useful:</strong></p>\n      <ul>\n        <li>Streaming API data</li>\n        <li>Paginated API</li>\n        <li>Async data sources</li>\n        <li>Large asynchronous datasets</li>\n      </ul>\n    "
  },
  {
    "id": "js-66",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Symbol",
      "ES6"
    ],
    "question": "Symbol কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Symbol হলো JavaScript-এর primitive data type যার প্রতিটি Symbol সাধারণত unique।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const id1 = Symbol(\"id\");\nconst id2 = Symbol(\"id\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>id1 === id2;\n// false</code></pre>\n      </div>\n      <p><strong>Common use:</strong></p>\n      <ul>\n        <li>Unique object keys</li>\n        <li>Avoid property name collision</li>\n        <li>Language protocols</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  [Symbol(\"id\")]: 123\n};</code></pre>\n      </div>\n      <p>JavaScript-এর built-in protocols যেমন Symbol.iterator Symbol ব্যবহার করে।</p>\n    "
  },
  {
    "id": "js-67",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Symbol",
      "Iterator"
    ],
    "question": "Symbol.iterator কী?",
    "answer": "\n      <p>Symbol.iterator একটি well-known Symbol যা কোনো object-এর default iterator নির্ধারণ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const collection = {\n  values: [10, 20, 30],</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>*[Symbol.iterator]() {\n    yield* this.values;\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (const value of collection) {\n  console.log(value);\n}</code></pre>\n      </div>\n      <p>এখানে Symbol.iterator থাকার কারণে object-টি iterable হয়ে গেছে।</p>\n    "
  },
  {
    "id": "js-68",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Proxy",
      "Metaprogramming"
    ],
    "question": "Proxy কী?",
    "answer": "\n      <p>Proxy হলো এমন object যা অন্য object-এর operations intercept বা customize করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const proxy = new Proxy(user, {\n  get(target, property) {\n    console.log(\"Access:\", property);\n    return target[property];\n  }\n});</code></pre>\n      </div>\n      <p>proxy.name;</p>\n      <p><strong>Proxy দিয়ে:</strong><br>- get<br>- set<br>- delete<br>- has<br>- apply<br>- construct<br>সহ বিভিন্ন operation intercept করা যায়।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Validation</li>\n        <li>Logging</li>\n        <li>Reactive systems</li>\n        <li>Access control</li>\n        <li>Framework internals</li>\n      </ul>\n    "
  },
  {
    "id": "js-69",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Proxy",
      "Validation"
    ],
    "question": "Proxy দিয়ে object validation কীভাবে করা যায়?",
    "answer": "\n      <p>set trap ব্যবহার করে property assignment validate করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const proxy = new Proxy(user, {\n  set(target, property, value) {\n    if (property === \"age\" &amp;&amp; typeof value !== \"number\") {\n      throw new TypeError(\"Age must be a number\");\n    }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>target[property] = value;\n    return true;\n  }\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>proxy.age = 30;\nproxy.age = \"30\"; // Error</code></pre>\n      </div>\n      <p>এভাবে object-এর mutation-এর আগে validation করা যায়।</p>\n    "
  },
  {
    "id": "js-70",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Reflect",
      "Proxy"
    ],
    "question": "Reflect কী?",
    "answer": "\n      <p>Reflect হলো JavaScript-এর built-in object যার methods object operations করার জন্য standard API দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Reflect.get(user, \"name\");\nReflect.set(user, \"age\", 30);\nReflect.has(user, \"name\");\nReflect.deleteProperty(user, \"name\");</code></pre>\n      </div>\n      <p>Proxy-এর সাথে Reflect খুব common।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const proxy = new Proxy(user, {\n  get(target, property, receiver) {\n    return Reflect.get(target, property, receiver);\n  }\n});</code></pre>\n      </div>\n      <p>Reflect code-কে predictable এবং standard object-operation API দিতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "js-71",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Proxy",
      "Reflect"
    ],
    "question": "Proxy-এর সাথে Reflect কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Proxy trap-এর ভিতরে original/default behavior preserve করার জন্য Reflect useful।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>get(target, property, receiver) {\n  return Reflect.get(target, property, receiver);\n}</code></pre>\n      </div>\n      <p><strong>এর সুবিধা:</strong></p>\n      <ul>\n        <li>Default JavaScript semantics maintain করা সহজ।</li>\n        <li>Prototype এবং receiver behavior সঠিকভাবে handle করা যায়।</li>\n        <li>Proxy code cleaner হয়।</li>\n      </ul>\n      <p>Production code-এ custom behavior-এর পাশাপাশি default behavior রাখতে Reflect খুব useful।</p>\n    "
  },
  {
    "id": "js-72",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "WeakMap",
      "Garbage Collection"
    ],
    "question": "WeakMap কেন memory-sensitive application-এ useful?",
    "answer": "\n      <p>WeakMap-এর object keys weakly held হয়।</p>\n      <p>অর্থাৎ key object-এর অন্য কোনো strong reference না থাকলে garbage collection-এর জন্য eligible হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const metadata = new WeakMap();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>let user = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>metadata.set(user, {\n  lastAccess: Date.now()\n});</code></pre>\n      </div>\n      <p>user = null;</p>\n      <p>এখন metadata-এর key object-এর জন্য অন্য strong reference না থাকলে garbage collection সম্ভব।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Object metadata</li>\n        <li>Private-like associations</li>\n        <li>Cache-like structures</li>\n      </ul>\n    "
  },
  {
    "id": "js-73",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "WeakSet",
      "Garbage Collection"
    ],
    "question": "WeakSet কী এবং কোথায় ব্যবহার করবেন?",
    "answer": "\n      <p>WeakSet শুধু object references রাখে এবং weakly held হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const processed = new WeakSet();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const request = {};</code></pre>\n      </div>\n      <p>processed.add(request);</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (processed.has(request)) {\n  console.log(\"Already processed\");\n}</code></pre>\n      </div>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Object tracking</li>\n        <li>Visited object tracking</li>\n        <li>Temporary metadata</li>\n      </ul>\n      <p>WeakSet iterable নয় এবং সাধারণভাবে এর contents enumerate করা যায় না।</p>\n    "
  },
  {
    "id": "js-74",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "TypedArray",
      "Binary Data"
    ],
    "question": "TypedArray কী?",
    "answer": "\n      <p>TypedArray হলো binary data-এর উপর কাজ করার জন্য specialized array-like structure।</p>\n      <h4>Examples:</h4>\n      <p>Int8Array<br>Uint8Array<br>Int16Array<br>Uint16Array<br>Int32Array<br>Float32Array<br>Float64Array</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = new Uint8Array([10, 20, 30]);</code></pre>\n      </div>\n      <p>TypedArray সাধারণ Array-এর মতো নয়।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Binary data</li>\n        <li>Audio/video processing</li>\n        <li>Image processing</li>\n        <li>Web APIs</li>\n        <li>Network protocols</li>\n        <li>WebAssembly</li>\n      </ul>\n    "
  },
  {
    "id": "js-75",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "ArrayBuffer",
      "TypedArray"
    ],
    "question": "ArrayBuffer কী?",
    "answer": "\n      <p>ArrayBuffer হলো raw binary memory block।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const buffer = new ArrayBuffer(8);</code></pre>\n      </div>\n      <p>এটি নিজে সাধারণত data interpret করে না।</p>\n      <p>TypedArray বা DataView ব্যবহার করে buffer-এর data access করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const buffer = new ArrayBuffer(8);\nconst view = new Uint8Array(buffer);</code></pre>\n      </div>\n      <p>view[0] = 255;</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>ArrayBuffer\n   ↓\nTypedArray / DataView\n   ↓\nBinary data interpretation</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-76",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "DataView",
      "Binary Data"
    ],
    "question": "DataView কী?",
    "answer": "\n      <p>DataView ArrayBuffer-এর উপর বিভিন্ন byte offset এবং data type দিয়ে read/write করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const buffer = new ArrayBuffer(8);\nconst view = new DataView(buffer);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>view.setInt32(0, 100);\nview.getInt32(0);</code></pre>\n      </div>\n      <p>DataView useful যখন binary protocol-এর exact byte layout control করতে হয়।</p>\n    "
  },
  {
    "id": "js-77",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "BigInt",
      "Number"
    ],
    "question": "BigInt কী এবং Number-এর পরিবর্তে কখন ব্যবহার করবেন?",
    "answer": "\n      <p>BigInt arbitrary-size integer represent করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const value = 9007199254740993n;</code></pre>\n      </div>\n      <h4>JavaScript Number-এর safe integer range:</h4>\n      <p>Number.MAX_SAFE_INTEGER</p>\n      <p>এর বাইরে integer precision সমস্যা হতে পারে।</p>\n      <p><strong>BigInt ব্যবহার করুন:</strong></p>\n      <ul>\n        <li>Very large integer</li>\n        <li>Database IDs যদি exact integer semantics দরকার হয়</li>\n        <li>Financial/integer calculations যেখানে precision requirement আছে</li>\n      </ul>\n      <h4>BigInt এবং Number সরাসরি arithmetic-এ mix করা যায় না:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>10n + 10\n// TypeError</code></pre>\n      </div>\n      <p>BigInt JSON serialization-এর জন্যও আলাদা handling প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "js-78",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Intl",
      "Internationalization"
    ],
    "question": "Intl API কী?",
    "answer": "\n      <p>Intl API JavaScript-এর internationalization functionality দেয়।</p>\n      <h4>Examples:</h4>\n      <p>Intl.NumberFormat<br>Intl.DateTimeFormat<br>Intl.Collator<br>Intl.PluralRules<br>Intl.RelativeTimeFormat</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>new Intl.NumberFormat(\"en-US\").format(1234567);</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1,234,567</code></pre>\n      </div>\n      <p>Multi-language application, currency formatting এবং date formatting-এর জন্য Intl খুব useful।</p>\n    "
  },
  {
    "id": "js-79",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Date",
      "Timezone"
    ],
    "question": "JavaScript Date নিয়ে common problem কী?",
    "answer": "\n      <p>JavaScript Date-এর সাথে timezone এবং parsing নিয়ে ভুল হতে পারে।</p>\n      <p>একটি Date internally একটি timestamp represent করে।</p>\n      <p><strong>সমস্যা হতে পারে:</strong></p>\n      <ul>\n        <li>Local timezone</li>\n        <li>UTC conversion</li>\n        <li>ISO parsing</li>\n        <li>Daylight saving time</li>\n        <li>String parsing differences</li>\n      </ul>\n      <p><strong>Production application-এ:</strong></p>\n      <ul>\n        <li>UTC storage</li>\n        <li>Explicit timezone handling</li>\n        <li>Standardized date formats</li>\n      </ul>\n      <p>ব্যবহার করা উচিত।</p>\n      <p>Complex timezone/date calculations-এর জন্য Temporal API availability/runtime support অথবা established date libraries বিবেচনা করা যায়।</p>\n    "
  },
  {
    "id": "js-80",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "AbortController",
      "Fetch",
      "Async"
    ],
    "question": "AbortController কী?",
    "answer": "\n      <p>AbortController asynchronous operation cancel করার mechanism দেয়।</p>\n      <p>Fetch request cancel করতে এটি খুব useful।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const controller = new AbortController();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>fetch(\"/users\", {\n  signal: controller.signal\n});</code></pre>\n      </div>\n      <p>controller.abort();</p>\n      <p><strong>AbortController-এর common use:</strong></p>\n      <ul>\n        <li>User navigates away</li>\n        <li>Search request cancellation</li>\n        <li>Component unmount</li>\n        <li>Request timeout handling</li>\n        <li>Avoid unnecessary network work</li>\n      </ul>\n    "
  },
  {
    "id": "js-81",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Fetch",
      "Timeout",
      "AbortController"
    ],
    "question": "Fetch request-এ timeout কীভাবে implement করবেন?",
    "answer": "\n      <p>AbortController ব্যবহার করে timeout implement করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const controller = new AbortController();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const timeout = setTimeout(() =&gt; {\n  controller.abort();\n}, 5000);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  const response = await fetch(\"/api/users\", {\n    signal: controller.signal\n  });</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return await response.json();\n} finally {\n  clearTimeout(timeout);\n}</code></pre>\n      </div>\n      <p>Modern runtimes-এ AbortSignal.timeout() support থাকলে সেটিও ব্যবহার করা যায়।</p>\n      <p>Timeout distributed application-এ গুরুত্বপূর্ণ কারণ indefinitely hanging request resource আটকে রাখতে পারে।</p>\n    "
  },
  {
    "id": "js-82",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Web Worker",
      "Concurrency"
    ],
    "question": "Web Worker কী?",
    "answer": "\n      <p>Web Worker JavaScript code-কে main UI thread-এর বাইরে execute করতে দেয়।</p>\n      <p><strong>Main thread:</strong><br>UI + DOM</p>\n      <p><strong>Worker:</strong><br>CPU-heavy JavaScript work</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const worker = new Worker(\"worker.js\");</code></pre>\n      </div>\n      <p>worker.postMessage(data);</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>worker.onmessage = event =&gt; {\n  console.log(event.data);\n};</code></pre>\n      </div>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Large calculations</li>\n        <li>Image processing</li>\n        <li>Data parsing</li>\n        <li>CPU-heavy algorithms</li>\n      </ul>\n      <p>Worker সরাসরি DOM manipulate করতে পারে না।</p>\n    "
  },
  {
    "id": "js-83",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Web Worker",
      "SharedArrayBuffer"
    ],
    "question": "Web Worker-এর সাথে data কীভাবে communicate হয়?",
    "answer": "\n      <p>Worker এবং main thread সাধারণত message passing ব্যবহার করে।</p>\n      <h4>Main thread:</h4>\n      <p>worker.postMessage(data);</p>\n      <h4>Worker:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>self.onmessage = event =&gt; {\n  const data = event.data;\n  self.postMessage(result);\n};</code></pre>\n      </div>\n      <p>Structured clone algorithm-এর মাধ্যমে data transfer হতে পারে।</p>\n      <p>Large binary data-এর ক্ষেত্রে Transferable Objects ব্যবহার করলে ownership transfer করে copying cost কমানো যায়।</p>\n    "
  },
  {
    "id": "js-84",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Transferable Objects",
      "Performance"
    ],
    "question": "Transferable Object কী?",
    "answer": "\n      <p>Transferable Object এমন data যার underlying resource এক execution context থেকে অন্য context-এ transfer করা যায়, ফলে সাধারণ cloning-এর বদলে ownership transfer করা হয়।</p>\n      <p><strong>Common example:</strong><br>ArrayBuffer</p>\n      <p>Worker-এর সাথে large binary data পাঠানোর সময় transfer করলে performance improve হতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Main Thread\n     ↓ transfer\nArrayBuffer ownership\n     ↓\nWorker</code></pre>\n      </div>\n      <p>Transfer করার পর sender-side buffer সাধারণত detached হয়ে যায়।</p>\n    "
  },
  {
    "id": "js-85",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "structuredClone",
      "Deep Copy"
    ],
    "question": "structuredClone() কী?",
    "answer": "\n      <p>structuredClone() structured clone algorithm ব্যবহার করে supported data-এর deep copy তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const original = {\n  user: {\n    name: \"Nazmul\"\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const copy = structuredClone(original);</code></pre>\n      </div>\n      <p>copy.user.name = \"Rahim\";</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>original.user.name;\n// Nazmul</code></pre>\n      </div>\n      <p>JSON.parse(JSON.stringify())-এর তুলনায় structuredClone অনেক বেশি data type correctly handle করতে পারে, যেমন অনেক built-in object type।</p>\n      <p>তবে function এবং কিছু special host object clone করা যায় না।</p>\n    "
  },
  {
    "id": "js-86",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Optional Chaining",
      "Operator"
    ],
    "question": "Optional chaining-এর বিভিন্ন form কী?",
    "answer": "\n      <p>Optional chaining শুধু property access নয়, আরও কয়েকভাবে ব্যবহার করা যায়।</p>\n      <h4>Property:</h4>\n      <p>user?.name</p>\n      <h4>Nested:</h4>\n      <p>user?.profile?.address?.city</p>\n      <h4>Method:</h4>\n      <p>user?.getName?.()</p>\n      <h4>Array index:</h4>\n      <p>users?.[0]</p>\n      <p>যদি chain-এর relevant অংশ null বা undefined হয়, expression সাধারণত undefined return করে।</p>\n    "
  },
  {
    "id": "js-87",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Nullish Coalescing",
      "Operator"
    ],
    "question": "?? এবং || এর tricky difference কী?",
    "answer": "\n      <p>|| falsy value-এর জন্য fallback নেয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>0 || 100\n// 100</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>\"\" || \"Guest\"\n// Guest</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>false || true\n// true</code></pre>\n      </div>\n      <p>?? শুধু null এবং undefined-এর জন্য fallback নেয়।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>0 ?? 100\n// 0</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>\"\" ?? \"Guest\"\n// \"\"</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>false ?? true\n// false</code></pre>\n      </div>\n      <p>যখন 0, false বা empty string valid value হতে পারে তখন ?? বেশি appropriate।</p>\n    "
  },
  {
    "id": "js-88",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Logical Assignment",
      "ES2021"
    ],
    "question": "||=, &&= এবং ??= কী?",
    "answer": "\n      <p>Logical assignment operators existing value-এর উপর ভিত্তি করে assignment করে।</p>\n      <h4>||=:</h4>\n      <p>user.name ||= \"Guest\";</p>\n      <p>name falsy হলে assign হবে।</p>\n      <h4>&amp;&amp;=:</h4>\n      <p>user.isActive &amp;&amp;= true;</p>\n      <p>existing value truthy হলে assignment হবে।</p>\n      <h4>??=:</h4>\n      <p>user.name ??= \"Guest\";</p>\n      <p>শুধু null বা undefined হলে assign হবে।</p>\n      <p>Default value logic লেখার সময় এগুলো code concise করতে পারে।</p>\n    "
  },
  {
    "id": "js-89",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Private Fields",
      "Class",
      "OOP"
    ],
    "question": "JavaScript class-এর private field কী?",
    "answer": "\n      <p>Class-এর private field # দিয়ে declare করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class User {\n  #password;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>constructor(password) {\n    this.#password = password;\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>checkPassword(password) {\n    return this.#password === password;\n  }\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = new User(\"123\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>user.#password;\n// SyntaxError</code></pre>\n      </div>\n      <p># field class-এর বাইরে directly access করা যায় না।</p>\n      <p>এটি true language-level private field।</p>\n    "
  },
  {
    "id": "js-90",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Static",
      "Class",
      "OOP"
    ],
    "question": "static method এবং static field কী?",
    "answer": "\n      <p>static member instance-এর পরিবর্তে class-এর সাথে associated।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class MathUtil {\n  static add(a, b) {\n    return a + b;\n  }\n}</code></pre>\n      </div>\n      <p>MathUtil.add(2, 3);</p>\n      <p>এখানে new MathUtil() তৈরি করার প্রয়োজন নেই।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Utility methods</li>\n        <li>Factory methods</li>\n        <li>Class-level configuration</li>\n        <li>Shared constants/state</li>\n      </ul>\n    "
  },
  {
    "id": "js-91",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Private Static",
      "Class"
    ],
    "question": "Private static field কী?",
    "answer": "\n      <p>Class-এর static member-কে private করতে # ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Counter {\n  static #count = 0;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>static increment() {\n    Counter.#count++;\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>static getCount() {\n    return Counter.#count;\n  }\n}</code></pre>\n      </div>\n      <p>এখানে #count class-এর বাইরে access করা যায় না।</p>\n      <p>এটি class-level private state রাখার জন্য useful।</p>\n    "
  },
  {
    "id": "js-92",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Getters",
      "Setters",
      "Object"
    ],
    "question": "Getter এবং Setter কী?",
    "answer": "\n      <p>Getter property read করার সময় function-এর মতো behavior দেয়।</p>\n      <p>Setter property assign করার সময় custom logic চালায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  firstName: \"Nazmul\",\n  lastName: \"Haque\",</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>get fullName() {\n    return this.firstName + \" \" + this.lastName;\n  },</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>set fullName(value) {\n    const [first, last] = value.split(\" \");\n    this.firstName = first;\n    this.lastName = last;\n  }\n};</code></pre>\n      </div>\n      <p><strong>Getter:</strong><br>user.fullName</p>\n      <p><strong>Setter:</strong><br>user.fullName = \"Rahim Khan\"</p>\n      <p>Validation বা computed properties-এর জন্য useful।</p>\n    "
  },
  {
    "id": "js-93",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Property Descriptor",
      "Object"
    ],
    "question": "Property Descriptor কী?",
    "answer": "\n      <p>Object property-এর metadata Property Descriptor-এর মাধ্যমে পাওয়া যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Object.getOwnPropertyDescriptor(user, \"name\");</code></pre>\n      </div>\n      <h4>Common attributes:</h4>\n      <p>value<br>writable<br>enumerable<br>configurable</p>\n      <h4>Accessor descriptor-এর ক্ষেত্রে:</h4>\n      <p>get<br>set</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Object.defineProperty(obj, \"id\", {\n  value: 10,\n  writable: false,\n  enumerable: true,\n  configurable: false\n});</code></pre>\n      </div>\n      <p>Advanced object behavior control করতে Property Descriptor গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-94",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Object",
      "Property Descriptor"
    ],
    "question": "enumerable, writable এবং configurable কী?",
    "answer": "\n      <p><strong>writable:</strong><br>Property value পরিবর্তন করা যাবে কি না।</p>\n      <p><strong>enumerable:</strong><br>for...in/Object.keys() ইত্যাদিতে property দেখা যাবে কি না।</p>\n      <p><strong>configurable:</strong><br>Property descriptor পরিবর্তন বা property delete করা যাবে কি না।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Object.defineProperty(obj, \"id\", {\n  value: 10,\n  writable: false,\n  enumerable: false,\n  configurable: false\n});</code></pre>\n      </div>\n      <p>এই attributes library/framework internals এবং API design-এ গুরুত্বপূর্ণ হতে পারে।</p>\n    "
  },
  {
    "id": "js-95",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Prototype",
      "Object"
    ],
    "question": "Object.create() কী?",
    "answer": "\n      <p>Object.create() নির্দিষ্ট prototype দিয়ে নতুন object তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const person = {\n  greet() {\n    return \"Hello\";\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = Object.create(person);</code></pre>\n      </div>\n      <p>user.greet();</p>\n      <p>এখানে user-এর prototype হলো person।</p>\n      <p>Prototype chain বুঝতে এবং inheritance manually control করতে Object.create() useful।</p>\n    "
  },
  {
    "id": "js-96",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Prototype",
      "Object"
    ],
    "question": "__proto__, prototype এবং [[Prototype]] এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>[[Prototype]]:<br>JavaScript object-এর internal prototype relationship।</p>\n      <p><strong>prototype:</strong><br>Function object-এর একটি property, যা new দিয়ে তৈরি instance-এর prototype হিসেবে ব্যবহৃত হয়।</p>\n      <p><strong>__proto__:</strong><br>Historically object-এর prototype access/set করার legacy accessor।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function User() {}</code></pre>\n      </div>\n      <p>User.prototype</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = new User();</code></pre>\n      </div>\n      <p>user-এর internal [[Prototype]] সাধারণত User.prototype-এর দিকে point করে।</p>\n      <p><strong>Interview-এর জন্য:</strong><br>prototype → constructor function-এর property<br>[[Prototype]] → object-এর internal link<br>__proto__ → legacy accessor</p>\n    "
  },
  {
    "id": "js-97",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Function",
      "Constructor",
      "new"
    ],
    "question": "new keyword internally কী করে?",
    "answer": "\n      <h4>new Constructor() সাধারণভাবে কয়েকটি step-এর মতো কাজ করে:</h4>\n      <ol>\n        <li>নতুন object তৈরি করে।</li>\n        <li>নতুন object's prototype constructor.prototype-এর সাথে link করে।</li>\n        <li>Constructor-এর this নতুন object-এ bind করে।</li>\n        <li>Constructor execute করে।</li>\n        <li>Constructor যদি object explicitly return না করে, নতুন object return হয়।</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function User(name) {\n  this.name = name;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = new User(\"Nazmul\");</code></pre>\n      </div>\n      <p>এখানে user-এর prototype chain User.prototype-এর সাথে connected।</p>\n    "
  },
  {
    "id": "js-98",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "this",
      "bind",
      "call",
      "apply"
    ],
    "question": "call(), apply() এবং bind() এর পার্থক্য কী?",
    "answer": "\n      <p>call():<br>Function immediately execute করে এবং arguments আলাদাভাবে নেয়।</p>\n      <p>fn.call(obj, a, b);</p>\n      <p>apply():<br>Immediately execute করে কিন্তু arguments array-like হিসেবে নেয়।</p>\n      <p>fn.apply(obj, [a, b]);</p>\n      <p>bind():<br>Immediately execute করে না; নতুন function return করে যার this/arguments bind করা থাকে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const bound = fn.bind(obj);</code></pre>\n      </div>\n      <p>bound();</p>\n      <h4>Interview shortcut:</h4>\n      <p>call → execute now + comma arguments<br>apply → execute now + array arguments<br>bind → execute later</p>\n    "
  },
  {
    "id": "js-99",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "this",
      "Arrow Function"
    ],
    "question": "Arrow function-এ call(), apply() বা bind() করলে কী হয়?",
    "answer": "\n      <p>Arrow function নিজের this binding তৈরি করে না।</p>\n      <h4>তাই:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const obj = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const fn = () =&gt; this.name;</code></pre>\n      </div>\n      <p>fn.call(obj);</p>\n      <p>এতে arrow function-এর lexical this পরিবর্তন হবে না।</p>\n      <p>Regular function-এর ক্ষেত্রে call/apply/bind this পরিবর্তন করতে পারে।</p>\n      <p>এই difference interview-এ খুব common।</p>\n    "
  },
  {
    "id": "js-100",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Closure",
      "Loop",
      "let",
      "var"
    ],
    "question": "Loop-এর ভিতরে var এবং let closure-এর behavior কেন আলাদা?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (var i = 0; i &lt; 3; i++) {\n  setTimeout(() =&gt; console.log(i), 0);\n}</code></pre>\n      </div>\n      <p><strong>সাধারণত output:</strong><br>3<br>3<br>3</p>\n      <p>কারণ var একই function-scoped binding share করে।</p>\n      <h4>let ব্যবহার করলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (let i = 0; i &lt; 3; i++) {\n  setTimeout(() =&gt; console.log(i), 0);\n}</code></pre>\n      </div>\n      <p><strong>Output:</strong><br>0<br>1<br>2</p>\n      <p>কারণ প্রতিটি iteration-এর জন্য let-এর আলাদা lexical binding তৈরি হয়।</p>\n      <p>এটি closure + scope + async callback-এর classic interview question।</p>\n    "
  },
  {
    "id": "js-101",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Loop",
      "Promise",
      "Output Based"
    ],
    "question": "এই code-এর output কী হবে এবং কেন?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"1\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setTimeout(() =&gt; {\n  console.log(\"2\");\n}, 0);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n  console.log(\"3\");\n});</code></pre>\n      </div>\n      <p>console.log(\"4\");</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1\n4\n3\n2</code></pre>\n      </div>\n      <h4>কারণ:</h4>\n      <p><strong>প্রথমে synchronous code:</strong><br>1<br>4</p>\n      <p>Promise callback microtask queue-তে যায়।</p>\n      <p>setTimeout callback task queue-তে যায়।</p>\n      <p><strong>Call stack empty হওয়ার পর microtask আগে execute হয়:</strong><br>3</p>\n      <p><strong>তারপর timer:</strong><br>2</p>\n      <p><strong>Key rule:</strong><br>Synchronous code<br>→ Microtasks<br>→ Next task/callback</p>\n    "
  },
  {
    "id": "js-102",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Loop",
      "Promise",
      "setTimeout",
      "Output Based"
    ],
    "question": "এই tricky Event Loop code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"A\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setTimeout(() =&gt; {\n  console.log(\"B\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n    console.log(\"C\");\n  });\n}, 0);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n  console.log(\"D\");\n});</code></pre>\n      </div>\n      <p>console.log(\"E\");</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>A\nE\nD\nB\nC</code></pre>\n      </div>\n      <h4>কারণ:</h4>\n      <p><strong>Synchronous:</strong><br>A<br>E</p>\n      <p><strong>Microtask:</strong><br>D</p>\n      <p><strong>Timer task:</strong><br>B</p>\n      <p><strong>Timer callback-এর ভিতরে Promise তৈরি হওয়ায় নতুন microtask:</strong><br>C</p>\n      <p>একটি task-এর callback শেষ হওয়ার পর pending microtasks drain হয়।</p>\n    "
  },
  {
    "id": "js-103",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Loop",
      "async",
      "await",
      "Output Based"
    ],
    "question": "async/await এবং Event Loop-এর tricky behavior কী?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async function test() {\n  console.log(\"A\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>await Promise.resolve();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"B\");\n}</code></pre>\n      </div>\n      <p>console.log(\"C\");</p>\n      <p>test();</p>\n      <p>console.log(\"D\");</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>C\nA\nD\nB</code></pre>\n      </div>\n      <p>কারণ await-এর পরে function-এর continuation সাধারণত microtask হিসেবে schedule হয়।</p>\n      <p>test() call হলে:<br>A synchronous অংশ execute হয়।</p>\n      <p>await-এ pause।</p>\n      <p><strong>তারপর main synchronous code:</strong><br>D</p>\n      <p><strong>তারপর microtask:</strong><br>B</p>\n    "
  },
  {
    "id": "js-104",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise",
      "Error Handling"
    ],
    "question": "Promise rejection handle না করলে কী সমস্যা হতে পারে?",
    "answer": "\n      <p>Promise reject হলে এবং appropriate handler না থাকলে unhandled rejection হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.reject(new Error(\"Failed\"));</code></pre>\n      </div>\n      <p><strong>Production application-এ unhandled rejection:</strong></p>\n      <ul>\n        <li>Unexpected behavior</li>\n        <li>Logging/monitoring issue</li>\n        <li>Runtime-specific consequences</li>\n      </ul>\n      <h4>Promise chain-এ catch রাখা উচিত:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>doSomething()\n  .then(...)\n  .catch(error =&gt; {\n    // handle\n  });</code></pre>\n      </div>\n      <p>async/await হলে try/catch বা higher-level error handling ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "js-105",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise",
      "Error Handling"
    ],
    "question": "Promise constructor-এর executor function-এর error কীভাবে কাজ করে?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const promise = new Promise((resolve, reject) =&gt; {\n  throw new Error(\"Failed\");\n});</code></pre>\n      </div>\n      <p>Executor-এর ভিতরে synchronous throw হলে Promise rejected হয়।</p>\n      <h4>Equivalent concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>new Promise((resolve, reject) =&gt; {\n  try {\n    throw new Error();\n  } catch (error) {\n    reject(error);\n  }\n});</code></pre>\n      </div>\n      <p>তবে সাধারণ application code-এ নিজে Promise constructor তৈরি করার প্রয়োজন কম; existing Promise API বা async function ব্যবহার করা preferable।</p>\n    "
  },
  {
    "id": "js-106",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise",
      "Concurrency"
    ],
    "question": "Promise.all() কখন ব্যবহার করা উচিত এবং কখন নয়?",
    "answer": "\n      <p><strong>Promise.all() ব্যবহার করুন যখন:</strong></p>\n      <ul>\n        <li>একাধিক asynchronous operation independent।</li>\n        <li>সব result দরকার।</li>\n        <li>একটি failure হলে overall operation failure ধরা যায়।</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [users, products] = await Promise.all([\n  getUsers(),\n  getProducts()\n]);</code></pre>\n      </div>\n      <p><strong>ব্যবহার করবেন না যখন:</strong></p>\n      <ul>\n        <li>একটি request fail করলেও অন্যগুলোর result অবশ্যই দরকার।</li>\n        <li>তখন Promise.allSettled() বেশি appropriate হতে পারে।</li>\n      </ul>\n      <p>এছাড়া dependent requests-এ sequential await প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "js-107",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Async",
      "Concurrency",
      "Rate Limiting"
    ],
    "question": "একসাথে 10,000 API request চালানো কেন খারাপ এবং কীভাবে control করবেন?",
    "answer": "\n      <p><strong>একসাথে অনেক request চালালে:</strong></p>\n      <ul>\n        <li>Memory usage বাড়ে।</li>\n        <li>Connection saturation হতে পারে।</li>\n        <li>Server overload হতে পারে।</li>\n        <li>Rate limit hit হতে পারে।</li>\n        <li>Client/network resource শেষ হতে পারে।</li>\n      </ul>\n      <p><strong>Solution:</strong></p>\n      <ul>\n        <li>Concurrency limit</li>\n        <li>Queue</li>\n        <li>Batch processing</li>\n        <li>Retry with backoff</li>\n        <li>Rate limiting</li>\n      </ul>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>10,000 jobs\n     ↓\nConcurrency limiter\n     ↓\n10 বা 20 jobs at a time</code></pre>\n      </div>\n      <p>Production Node.js systems-এ p-limit-এর মতো concurrency control utility বা নিজের queue mechanism ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "js-108",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Retry",
      "Exponential Backoff"
    ],
    "question": "API retry কীভাবে properly implement করবেন?",
    "answer": "\n      <p>সব error retry করা উচিত নয়।</p>\n      <p><strong>Retry করা যেতে পারে:</strong></p>\n      <ul>\n        <li>Temporary network error</li>\n        <li>Timeout</li>\n        <li>429</li>\n        <li>কিছু 5xx error</li>\n      </ul>\n      <p>সাধারণত exponential backoff ব্যবহার করা হয়।</p>\n      <h4>Example concept:</h4>\n      <p>Attempt 1 → 100ms<br>Attempt 2 → 200ms<br>Attempt 3 → 400ms<br>Attempt 4 → 800ms</p>\n      <p>সাথে jitter যোগ করলে অনেক client একই সময়ে retry করার সমস্যা কমে।</p>\n      <p>POST request retry করার আগে idempotency বিবেচনা করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-109",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Idempotency",
      "HTTP",
      "API"
    ],
    "question": "Idempotency কী?",
    "answer": "\n      <p>একই operation একাধিকবার execute করলেও final state একই থাকলে operation-টিকে idempotent বলা হয়।</p>\n      <p>GET সাধারণত idempotent।</p>\n      <p>PUT সাধারণত idempotent design করা যায়।</p>\n      <p>POST সাধারণত inherently idempotent নয়।</p>\n      <p>Payment/order API-তে idempotency key ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>POST /payments</code></pre>\n      </div>\n      <p><strong>Idempotency-Key:</strong><br>abc-123</p>\n      <p>Client retry করলে server একই operation duplicate না করে আগের result return করতে পারে।</p>\n      <p>Distributed systems-এ এটি অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-110",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Performance",
      "Big O"
    ],
    "question": "JavaScript code-এর performance কীভাবে analyze করবেন?",
    "answer": "\n      <p>প্রথমে algorithmic complexity দেখুন।</p>\n      <h4>Common complexities:</h4>\n      <p>O(1)<br>O(log n)<br>O(n)<br>O(n log n)<br>O(n²)</p>\n      <h4>Example:</h4>\n      <p>array.find()<br>→ সাধারণত O(n)</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Nested loop:\nfor (...)\n  for (...)\n→ সাধারণত O(n²)</code></pre>\n      </div>\n      <p><strong>তারপর বাস্তব performance-এর জন্য:</strong></p>\n      <ul>\n        <li>Browser Performance panel</li>\n        <li>Memory profiler</li>\n        <li>Network panel</li>\n        <li>CPU profiling</li>\n        <li>Node.js profiling</li>\n        <li>Benchmarking</li>\n      </ul>\n      <p>শুধু micro-optimization না করে bottleneck identify করা উচিত।</p>\n    "
  },
  {
    "id": "js-111",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Loop",
      "Long Task",
      "Performance"
    ],
    "question": "Long Task কী এবং কেন সমস্যা?",
    "answer": "\n      <p>Main thread-এ দীর্ঘ সময় ধরে চলা JavaScript execution-কে long task বলা হয়।</p>\n      <p><strong>এতে:</strong></p>\n      <ul>\n        <li>UI freeze হতে পারে।</li>\n        <li>User interaction delay হতে পারে।</li>\n        <li>Rendering বাধাগ্রস্ত হতে পারে।</li>\n      </ul>\n      <p><strong>Solution:</strong></p>\n      <ul>\n        <li>Work ছোট chunks-এ ভাগ করা</li>\n        <li>Web Worker</li>\n        <li>requestAnimationFrame</li>\n        <li>setTimeout / scheduling</li>\n        <li>Algorithm optimize করা</li>\n        <li>Unnecessary rendering কমানো</li>\n      </ul>\n      <p>Browser application-এ responsiveness-এর জন্য এটি গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-112",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "requestAnimationFrame",
      "Browser",
      "Performance"
    ],
    "question": "requestAnimationFrame() কী?",
    "answer": "\n      <p>requestAnimationFrame() browser-এর next repaint-এর আগে animation/update callback schedule করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function animate() {\n  // update UI\n  requestAnimationFrame(animate);\n}</code></pre>\n      </div>\n      <p>requestAnimationFrame(animate);</p>\n      <p>Animation-এর জন্য setTimeout-এর পরিবর্তে requestAnimationFrame সাধারণত বেশি appropriate কারণ browser rendering cycle-এর সাথে কাজ করে।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Animation</li>\n        <li>Canvas rendering</li>\n        <li>Visual updates</li>\n      </ul>\n    "
  },
  {
    "id": "js-113",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "MutationObserver",
      "DOM"
    ],
    "question": "MutationObserver কী?",
    "answer": "\n      <p>MutationObserver DOM-এর পরিবর্তন observe করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const observer = new MutationObserver(mutations =&gt; {\n  console.log(mutations);\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>observer.observe(element, {\n  childList: true,\n  attributes: true,\n  subtree: true\n});</code></pre>\n      </div>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>DOM changes monitor</li>\n        <li>Dynamic UI integration</li>\n        <li>Third-party DOM modifications detect</li>\n      </ul>\n      <p>Observer ব্যবহার শেষে disconnect() করা উচিত যদি আর প্রয়োজন না থাকে।</p>\n    "
  },
  {
    "id": "js-114",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "IntersectionObserver",
      "Performance"
    ],
    "question": "IntersectionObserver কী?",
    "answer": "\n      <p>IntersectionObserver কোনো element viewport বা অন্য root-এর সাথে intersect করছে কি না তা observe করে।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Lazy loading</li>\n        <li>Infinite scrolling</li>\n        <li>Advertisement visibility</li>\n        <li>Scroll-based activation</li>\n      </ul>\n      <p>এটি manually scroll event + getBoundingClientRect() বারবার করার তুলনায় অনেক ক্ষেত্রে cleaner এবং efficient approach।</p>\n    "
  },
  {
    "id": "js-115",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "ResizeObserver",
      "Browser"
    ],
    "question": "ResizeObserver কী?",
    "answer": "\n      <p>ResizeObserver কোনো element-এর size পরিবর্তন observe করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const observer = new ResizeObserver(entries =&gt; {\n  for (const entry of entries) {\n    console.log(entry.contentRect);\n  }\n});</code></pre>\n      </div>\n      <p>observer.observe(element);</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Responsive components</li>\n        <li>Charts</li>\n        <li>Layout calculation</li>\n        <li>Component-level responsiveness</li>\n      </ul>\n      <p>Window resize event-এর তুলনায় element-level size observation-এর জন্য এটি বেশি appropriate।</p>\n    "
  },
  {
    "id": "js-116",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Security",
      "CSRF"
    ],
    "question": "CSRF কী এবং JavaScript application-এ কীভাবে prevent করবেন?",
    "answer": "\n      <p>CSRF = Cross-Site Request Forgery।</p>\n      <p>Attacker victim-এর authenticated browser ব্যবহার করে unwanted request করানোর চেষ্টা করে।</p>\n      <p><strong>Protection:</strong></p>\n      <ul>\n        <li>SameSite cookies</li>\n        <li>CSRF token</li>\n        <li>Origin/Referer validation যেখানে appropriate</li>\n        <li>Proper authentication architecture</li>\n      </ul>\n      <p>বিশেষ করে cookie-based authentication-এ CSRF protection গুরুত্বপূর্ণ।</p>\n      <p>CORS একা CSRF protection-এর replacement নয়।</p>\n    "
  },
  {
    "id": "js-117",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Security",
      "Prototype Pollution"
    ],
    "question": "Prototype Pollution কী?",
    "answer": "\n      <p>Prototype Pollution হলো attacker-controlled input ব্যবহার করে Object.prototype বা অন্য prototype-এর properties manipulate করার vulnerability।</p>\n      <p>এতে application-এর অনেক object unexpected property inherit করতে পারে।</p>\n      <p><strong>Risk:</strong></p>\n      <ul>\n        <li>Authorization bypass</li>\n        <li>Unexpected behavior</li>\n        <li>Security vulnerabilities</li>\n      </ul>\n      <p><strong>Protection:</strong></p>\n      <ul>\n        <li>Untrusted object keys validate করা</li>\n        <li>Dangerous prototype keys handle করা</li>\n        <li>Secure merge/deep-merge libraries</li>\n        <li>Object.create(null) কিছু dictionary use case-এ</li>\n        <li>Dependencies updated রাখা</li>\n      </ul>\n    "
  },
  {
    "id": "js-118",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Security",
      "Dependency"
    ],
    "question": "JavaScript dependency security কীভাবে maintain করবেন?",
    "answer": "\n      <h4>Production application-এ dependency risk কমাতে:</h4>\n      <ol>\n        <li>package-lock/pnpm-lock/yarn.lock commit করা।</li>\n        <li>Dependency update নিয়মিত করা।</li>\n        <li>Security audit চালানো।</li>\n        <li>Unused dependencies remove করা।</li>\n        <li>Trusted packages ব্যবহার করা।</li>\n        <li>Transitive dependencies monitor করা।</li>\n        <li>Supply-chain attack সম্পর্কে সচেতন থাকা।</li>\n      </ol>\n      <p>npm ecosystem-এ dependency tree বড় হতে পারে, তাই direct dependency-এর পাশাপাশি transitive dependency-ও গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-119",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Module",
      "Tree Shaking",
      "Bundler"
    ],
    "question": "Tree Shaking কী?",
    "answer": "\n      <p>Tree shaking হলো bundler-এর optimization technique যেখানে ব্যবহার না করা code/module export বাদ দেওয়া হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import { add } from \"./math.js\";</code></pre>\n      </div>\n      <p>যদি একই module-এ unused function থাকে এবং bundler statically determine করতে পারে যে সেটি ব্যবহার হয়নি, সেটি final bundle থেকে বাদ যেতে পারে।</p>\n      <p>ES Modules static structure হওয়ায় tree shaking-এর জন্য ভালো।</p>\n      <p>Production frontend performance-এর জন্য bundle size কমানো গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-120",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Senior Interview",
      "Architecture"
    ],
    "question": "Senior JavaScript developer হিসেবে কোন advanced topics অবশ্যই জানতে হবে?",
    "answer": "\n      <p>Senior-level interview-এর জন্য শুধু syntax জানা যথেষ্ট নয়।</p>\n      <h4>Must Know:</h4>\n      <p><strong>Runtime:</strong></p>\n      <ul>\n        <li>Execution Context</li>\n        <li>Call Stack</li>\n        <li>Event Loop</li>\n        <li>Microtask</li>\n        <li>Task Queue</li>\n        <li>Garbage Collection</li>\n      </ul>\n      <p><strong>Language:</strong></p>\n      <ul>\n        <li>Scope</li>\n        <li>Closure</li>\n        <li>this</li>\n        <li>Prototype</li>\n        <li>Prototype Chain</li>\n        <li>Classes</li>\n        <li>Property Descriptor</li>\n        <li>Proxy</li>\n        <li>Reflect</li>\n        <li>Symbol</li>\n      </ul>\n      <p><strong>Async:</strong></p>\n      <ul>\n        <li>Promise</li>\n        <li>async/await</li>\n        <li>Promise combinators</li>\n        <li>AbortController</li>\n        <li>Concurrency control</li>\n        <li>Retry</li>\n        <li>Timeout</li>\n        <li>Idempotency</li>\n      </ul>\n      <p><strong>Performance:</strong></p>\n      <ul>\n        <li>Debounce</li>\n        <li>Throttle</li>\n        <li>Memoization</li>\n        <li>Big O</li>\n        <li>Memory leak</li>\n        <li>Web Worker</li>\n        <li>requestAnimationFrame</li>\n        <li>Lazy loading</li>\n      </ul>\n      <p><strong>Browser:</strong></p>\n      <ul>\n        <li>DOM</li>\n        <li>Event propagation</li>\n        <li>Event delegation</li>\n        <li>MutationObserver</li>\n        <li>IntersectionObserver</li>\n        <li>ResizeObserver</li>\n        <li>Storage</li>\n        <li>CORS</li>\n      </ul>\n      <p><strong>Security:</strong></p>\n      <ul>\n        <li>XSS</li>\n        <li>CSRF</li>\n        <li>Prototype Pollution</li>\n        <li>Dependency/Supply-chain security</li>\n        <li>CSP</li>\n        <li>Secure cookies</li>\n      </ul>\n      <p><strong>Data:</strong></p>\n      <ul>\n        <li>Iterator</li>\n        <li>Generator</li>\n        <li>Async Generator</li>\n        <li>Map</li>\n        <li>Set</li>\n        <li>WeakMap</li>\n        <li>WeakSet</li>\n        <li>TypedArray</li>\n        <li>ArrayBuffer</li>\n      </ul>\n      <p><strong>Modern JS:</strong></p>\n      <ul>\n        <li>Optional chaining</li>\n        <li>Nullish coalescing</li>\n        <li>Logical assignment</li>\n        <li>Private fields</li>\n        <li>Static fields</li>\n        <li>ES Modules</li>\n        <li>structuredClone</li>\n      </ul>\n      <p><strong>সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো এগুলো মুখস্থ না করে:</strong><br>\"কেন কাজ করে?\"<br>\"কখন ব্যবহার করব?\"<br>\"কখন ব্যবহার করব না?\"<br>\"Performance impact কী?\"<br>\"Production-এ কী সমস্যা হতে পারে?\"</p>\n      <p>এই চারটি perspective থেকে explain করতে পারা।</p>\n    "
  },
  {
    "id": "js-121",
    "category": "JavaScript",
    "difficulty": "Intermediate",
    "tags": [
      "Hoisting",
      "var",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(a);\nvar a = 10;</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>undefined</code></pre>\n      </div>\n      <p>কারণ var declaration hoist হয়, কিন্তু assignment hoist হয় না।</p>\n      <h4>Internally:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>var a;\nconsole.log(a);\na = 10;</code></pre>\n      </div>\n      <p>তাই console.log(a)-তে undefined পাওয়া যায়।</p>\n    "
  },
  {
    "id": "js-122",
    "category": "JavaScript",
    "difficulty": "Intermediate",
    "tags": [
      "Hoisting",
      "let",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(a);\nlet a = 10;</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ReferenceError</code></pre>\n      </div>\n      <p>কারণ let declaration hoist হলেও initialization-এর আগে Temporal Dead Zone (TDZ)-এ থাকে।</p>\n      <p>তাই declaration-এর আগে access করলে ReferenceError হয়।</p>\n    "
  },
  {
    "id": "js-123",
    "category": "JavaScript",
    "difficulty": "Intermediate",
    "tags": [
      "Hoisting",
      "Function",
      "Output"
    ],
    "question": "Function declaration hoisting-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>sayHello();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function sayHello() {\n  console.log(\"Hello\");\n}</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Hello</code></pre>\n      </div>\n      <p>Function declaration পুরো function body সহ hoist হয়।</p>\n      <p>তাই declaration-এর আগে function call করা যায়।</p>\n    "
  },
  {
    "id": "js-124",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Function Hoisting",
      "var",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>sayHello();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>var sayHello = function () {\n  console.log(\"Hello\");\n};</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>TypeError: sayHello is not a function</code></pre>\n      </div>\n      <h4>কারণ var declaration hoist হয়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>var sayHello;</code></pre>\n      </div>\n      <p>কিন্তু function assignment পরে হয়।</p>\n      <h4>তাই প্রথমে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>sayHello();\n// undefined কে function হিসেবে call করার চেষ্টা</code></pre>\n      </div>\n      <p>ফলে TypeError হয়।</p>\n    "
  },
  {
    "id": "js-125",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Closure",
      "Loop",
      "var",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (var i = 0; i &lt; 3; i++) {\n  setTimeout(() =&gt; {\n    console.log(i);\n  }, 100);\n}</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>3\n3\n3</code></pre>\n      </div>\n      <p>কারণ var function-scoped।</p>\n      <p>সব callback একই i binding reference করে।</p>\n      <h4>Loop শেষ হওয়ার সময়:</h4>\n      <p>i = 3</p>\n      <p>তারপর callback execute হয়।</p>\n      <p>তাই তিনবারই 3 পাওয়া যায়।</p>\n    "
  },
  {
    "id": "js-126",
    "category": "JavaScript",
    "difficulty": "Intermediate",
    "tags": [
      "Closure",
      "Loop",
      "let",
      "Output"
    ],
    "question": "আগের code-এ var-এর পরিবর্তে let দিলে কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (let i = 0; i &lt; 3; i++) {\n  setTimeout(() =&gt; {\n    console.log(i);\n  }, 100);\n}</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>0\n1\n2</code></pre>\n      </div>\n      <p>কারণ let block-scoped এবং loop-এর প্রতিটি iteration-এর জন্য আলাদা binding তৈরি হয়।</p>\n      <p>প্রতিটি callback তার নিজের iteration-এর i capture করে।</p>\n    "
  },
  {
    "id": "js-127",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Closure",
      "IIFE",
      "Output"
    ],
    "question": "var loop-এর সমস্যা IIFE দিয়ে কীভাবে solve করবেন?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (var i = 0; i &lt; 3; i++) {\n  ((index) =&gt; {\n    setTimeout(() =&gt; {\n      console.log(index);\n    }, 100);\n  })(i);\n}</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>0\n1\n2</code></pre>\n      </div>\n      <p>প্রতিটি iteration-এ IIFE একটি নতুন parameter binding তৈরি করে।</p>\n      <p>Callback সেই নতুন binding-এর value capture করে।</p>\n    "
  },
  {
    "id": "js-128",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Closure",
      "Counter",
      "Coding"
    ],
    "question": "Closure ব্যবহার করে private counter তৈরি করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function createCounter() {\n  let count = 0;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return {\n    increment() {\n      return ++count;\n    },</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>decrement() {\n      return --count;\n    },</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>getValue() {\n      return count;\n    }\n  };\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const counter = createCounter();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>counter.increment();\ncounter.increment();</code></pre>\n      </div>\n      <p>console.log(counter.getValue());</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>2</code></pre>\n      </div>\n      <p>count সরাসরি বাইরে access করা যায় না।</p>\n      <p>Closure-এর কারণে returned functions count-এর reference ধরে রাখে।</p>\n      <p>এভাবে private state তৈরি করা যায়।</p>\n    "
  },
  {
    "id": "js-129",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Closure",
      "Function",
      "Coding"
    ],
    "question": "একটি function লিখুন যা multiply-by-n function তৈরি করবে।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function multiplyBy(n) {\n  return function (value) {\n    return value * n;\n  };\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const double = multiplyBy(2);\nconst triple = multiplyBy(3);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(double(5));\nconsole.log(triple(5));</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>10\n15</code></pre>\n      </div>\n      <p>Inner function outer function-এর n variable closure-এর মাধ্যমে ধরে রাখে।</p>\n    "
  },
  {
    "id": "js-130",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "this",
      "Object",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>getName() {\n    return this.name;\n  }\n};</code></pre>\n      </div>\n      <p>console.log(user.getName());</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Nazmul</code></pre>\n      </div>\n      <h4>Method call:</h4>\n      <p>user.getName()</p>\n      <p>এখানে this সাধারণত user object-কে refer করে।</p>\n    "
  },
  {
    "id": "js-131",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "this",
      "Function",
      "Output"
    ],
    "question": "Object method আলাদা variable-এ রাখলে কী সমস্যা হতে পারে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>getName() {\n    return this.name;\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const fn = user.getName;</code></pre>\n      </div>\n      <p>console.log(fn());</p>\n      <h4>Strict/module environments-এ সাধারণত output হবে:</h4>\n      <p>TypeError বা undefined-related behavior</p>\n      <p>কারণ fn() call-এর সময় আর user.method() call হচ্ছে না।</p>\n      <p>Method-এর receiver হারিয়ে গেছে।</p>\n      <h4>Solution:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const fn = user.getName.bind(user);</code></pre>\n      </div>\n      <p>console.log(fn());</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Nazmul</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-132",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "this",
      "Arrow Function",
      "Output"
    ],
    "question": "Arrow function object-এর this কেন expected result দেয় না?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>getName: () =&gt; {\n    return this.name;\n  }\n};</code></pre>\n      </div>\n      <p>console.log(user.getName());</p>\n      <p>Arrow function নিজের this তৈরি করে না।</p>\n      <p>এটি surrounding lexical scope-এর this নেয়।</p>\n      <p>তাই object method হিসেবে arrow function ব্যবহার করে dynamic this পাওয়া যায় না।</p>\n      <h4>Regular method দরকার হলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>getName() {\n  return this.name;\n}</code></pre>\n      </div>\n      <p>ব্যবহার করুন।</p>\n    "
  },
  {
    "id": "js-133",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "call",
      "bind",
      "this",
      "Output"
    ],
    "question": "call() দিয়ে this পরিবর্তন করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function greet() {\n  return \"Hello \" + this.name;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n      <p>console.log(greet.call(user));</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Hello Nazmul</code></pre>\n      </div>\n      <p>call() function immediately execute করে এবং নির্দিষ্ট object-কে this হিসেবে দেয়।</p>\n    "
  },
  {
    "id": "js-134",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "apply",
      "this",
      "Output"
    ],
    "question": "apply() কীভাবে কাজ করে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function add(a, b) {\n  return this.value + a + b;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const obj = {\n  value: 10\n};</code></pre>\n      </div>\n      <p>console.log(add.apply(obj, [20, 30]));</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>60</code></pre>\n      </div>\n      <p>apply() এবং call() একইভাবে this সেট করে।</p>\n      <h4>Difference:</h4>\n      <p><strong>call:</strong><br>arguments আলাদাভাবে নেয়।</p>\n      <p><strong>apply:</strong><br>arguments array হিসেবে নেয়।</p>\n    "
  },
  {
    "id": "js-135",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "bind",
      "this",
      "Output"
    ],
    "question": "bind() এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\"\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function greet() {\n  return this.name;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const boundGreet = greet.bind(user);</code></pre>\n      </div>\n      <p>console.log(boundGreet());</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Nazmul</code></pre>\n      </div>\n      <p>bind() function immediately execute করে না।</p>\n      <p>এটি একটি নতুন function return করে যার this bind করা থাকে।</p>\n    "
  },
  {
    "id": "js-136",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Type Coercion",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(1 + \"2\");\nconsole.log(\"5\" - 2);\nconsole.log(\"5\" + 2);\nconsole.log(true + 1);</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>12\n3\n52\n2</code></pre>\n      </div>\n      <h4>কারণ:</h4>\n      <p>1 + \"2\"<br>→ string concatenation</p>\n      <p>\"5\" - 2<br>→ numeric conversion</p>\n      <p>\"5\" + 2<br>→ string concatenation</p>\n      <p>true + 1<br>→ true becomes 1</p>\n    "
  },
  {
    "id": "js-137",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Equality",
      "Type Coercion",
      "Output"
    ],
    "question": "== এবং === এর difference output দিয়ে explain করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(5 == \"5\");\nconsole.log(5 === \"5\");</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>true\nfalse</code></pre>\n      </div>\n      <p>== type coercion করতে পারে।</p>\n      <p>=== type এবং value দুটোই strictভাবে compare করে।</p>\n      <p>Production code-এ সাধারণত === prefer করা হয়।</p>\n    "
  },
  {
    "id": "js-138",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "NaN",
      "Equality",
      "Output"
    ],
    "question": "NaN নিয়ে এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(NaN === NaN);\nconsole.log(Number.isNaN(NaN));</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>false\ntrue</code></pre>\n      </div>\n      <p>NaN নিজের সাথেও === comparison-এ equal নয়।</p>\n      <h4>NaN check করার জন্য:</h4>\n      <p>Number.isNaN(value)</p>\n      <p>ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "js-139",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Object",
      "Reference",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const a = { name: \"Nazmul\" };\nconst b = a;</code></pre>\n      </div>\n      <p>b.name = \"Rahim\";</p>\n      <p>console.log(a.name);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Rahim</code></pre>\n      </div>\n      <p>কারণ a এবং b একই object-এর reference ধরে রেখেছে।</p>\n      <p>b পরিবর্তন করলে একই object-এর data পরিবর্তন হয়।</p>\n    "
  },
  {
    "id": "js-140",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Shallow Copy",
      "Reference",
      "Output"
    ],
    "question": "Spread operator কি সবসময় deep copy করে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  address: {\n    city: \"Dhaka\"\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const copy = { ...user };</code></pre>\n      </div>\n      <p>copy.address.city = \"Chittagong\";</p>\n      <p>console.log(user.address.city);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Chittagong</code></pre>\n      </div>\n      <p>কারণ spread shallow copy করে।</p>\n      <p>Top-level property copy হয়, কিন্তু nested object-এর reference একই থাকে।</p>\n    "
  },
  {
    "id": "js-141",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Deep Copy",
      "structuredClone",
      "Output"
    ],
    "question": "structuredClone দিয়ে nested object copy করলে কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  address: {\n    city: \"Dhaka\"\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const copy = structuredClone(user);</code></pre>\n      </div>\n      <p>copy.address.city = \"Chittagong\";</p>\n      <p>console.log(user.address.city);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Dhaka</code></pre>\n      </div>\n      <p>কারণ structuredClone nested structure-এর deep clone তৈরি করেছে।</p>\n    "
  },
  {
    "id": "js-142",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Array",
      "Mutation",
      "Output"
    ],
    "question": "এই code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [1, 2, 3];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = numbers.map(n =&gt; {\n  n * 2;\n});</code></pre>\n      </div>\n      <p>console.log(result);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[undefined, undefined, undefined]</code></pre>\n      </div>\n      <p>কারণ arrow function-এর block body ব্যবহার করলে explicit return প্রয়োজন।</p>\n      <h4>Correct:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = numbers.map(n =&gt; {\n  return n * 2;\n});</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = numbers.map(n =&gt; n * 2);</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-143",
    "category": "JavaScript",
    "difficulty": "Intermediate",
    "tags": [
      "Array",
      "map",
      "filter",
      "reduce"
    ],
    "question": "map(), filter() এবং reduce() এর পার্থক্য কী?",
    "answer": "\n      <p>map():<br>প্রতিটি element transform করে এবং নতুন array return করে।</p>\n      <p>filter():<br>Condition অনুযায়ী elements রেখে নতুন array return করে।</p>\n      <p>reduce():<br>পুরো array থেকে একটি accumulated result তৈরি করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3].map(x =&gt; x * 2);\n// [2, 4, 6]</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3].filter(x =&gt; x &gt; 1);\n// [2, 3]</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3].reduce((sum, x) =&gt; sum + x, 0);\n// 6</code></pre>\n      </div>\n    "
  },
  {
    "id": "js-144",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Reduce",
      "Coding"
    ],
    "question": "reduce() ব্যবহার করে array থেকে frequency map তৈরি করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const items = [\"a\", \"b\", \"a\", \"c\", \"b\", \"a\"];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const frequency = items.reduce((acc, item) =&gt; {\n  acc[item] = (acc[item] || 0) + 1;\n  return acc;\n}, {});</code></pre>\n      </div>\n      <p>console.log(frequency);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  a: 3,\n  b: 2,\n  c: 1\n}</code></pre>\n      </div>\n      <p>Interview-এ reduce দিয়ে grouping, counting এবং aggregation খুব common।</p>\n    "
  },
  {
    "id": "js-145",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Array",
      "Duplicate",
      "Set",
      "Coding"
    ],
    "question": "Array থেকে duplicate remove করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [1, 2, 2, 3, 3, 4];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const unique = [...new Set(numbers)];</code></pre>\n      </div>\n      <p>console.log(unique);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3, 4]</code></pre>\n      </div>\n      <p>Set unique values রাখে।</p>\n      <h4>Alternative:</h4>\n      <p>Array.from(new Set(numbers))</p>\n    "
  },
  {
    "id": "js-146",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Array",
      "Sorting",
      "Coding"
    ],
    "question": "Number array sort করতে ভুল কোথায় হয়?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [10, 2, 5, 1];</code></pre>\n      </div>\n      <p>console.log(numbers.sort());</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 10, 2, 5]</code></pre>\n      </div>\n      <p>কারণ default sort values-কে string হিসেবে compare করে।</p>\n      <h4>Correct:</h4>\n      <p>numbers.sort((a, b) =&gt; a - b);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 5, 10]</code></pre>\n      </div>\n      <h4>Descending:</h4>\n      <p>numbers.sort((a, b) =&gt; b - a);</p>\n    "
  },
  {
    "id": "js-147",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Array",
      "Mutation",
      "Sort"
    ],
    "question": "Array.sort() কি original array পরিবর্তন করে?",
    "answer": "\n      <p>হ্যাঁ।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const numbers = [3, 1, 2];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const sorted = numbers.sort((a, b) =&gt; a - b);</code></pre>\n      </div>\n      <p>console.log(numbers);</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3]</code></pre>\n      </div>\n      <p>sort() original array mutate করে।</p>\n      <h4>Original preserve করতে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const sorted = [...numbers].sort((a, b) =&gt; a - b);</code></pre>\n      </div>\n      <p>ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "js-148",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Debounce",
      "Performance",
      "Coding"
    ],
    "question": "Debounce implement করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function debounce(fn, delay) {\n  let timer;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return function (...args) {\n    clearTimeout(timer);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>timer = setTimeout(() =&gt; {\n      fn.apply(this, args);\n    }, delay);\n  };\n}</code></pre>\n      </div>\n      <h4>Use case:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const search = debounce((value) =&gt; {\n  console.log(\"API:\", value);\n}, 500);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>search(\"j\");\nsearch(\"ja\");\nsearch(\"jav\");\nsearch(\"java\");</code></pre>\n      </div>\n      <p>শুধু শেষ call-এর পরে 500ms অপেক্ষা করে function execute হবে।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Search API</li>\n        <li>Input validation</li>\n        <li>Resize handling</li>\n      </ul>\n    "
  },
  {
    "id": "js-149",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Throttle",
      "Performance",
      "Coding"
    ],
    "question": "Throttle implement করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function throttle(fn, delay) {\n  let lastCall = 0;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return function (...args) {\n    const now = Date.now();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (now - lastCall &gt;= delay) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}</code></pre>\n      </div>\n      <p>Throttle নির্দিষ্ট interval-এর মধ্যে function execution limit করে।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Scroll</li>\n        <li>Mouse move</li>\n        <li>Resize</li>\n        <li>Continuous events</li>\n      </ul>\n      <h4>Difference:</h4>\n      <p><strong>Debounce:</strong><br>শেষ event-এর পরে execute করে।</p>\n      <p><strong>Throttle:</strong><br>নির্দিষ্ট interval-এ সর্বোচ্চ একবার execute করে।</p>\n    "
  },
  {
    "id": "js-150",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Memoization",
      "Performance",
      "Coding"
    ],
    "question": "Memoization কী এবং implement করুন।",
    "answer": "\n      <p>Memoization হলো expensive function-এর previous result cache করে রাখা।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function memoize(fn) {\n  const cache = new Map();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return function (arg) {\n    if (cache.has(arg)) {\n      return cache.get(arg);\n    }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = fn(arg);\n    cache.set(arg, result);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return result;\n  };\n}</code></pre>\n      </div>\n      <p><strong>এটি useful যখন:</strong></p>\n      <ul>\n        <li>Function pure</li>\n        <li>Same input বারবার আসে</li>\n        <li>Calculation expensive</li>\n      </ul>\n      <p>কিন্তু cache size এবং memory growth control করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-151",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise",
      "Output"
    ],
    "question": "Promise.resolve().then() এবং setTimeout-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"A\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setTimeout(() =&gt; {\n  console.log(\"B\");\n}, 0);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n  console.log(\"C\");\n});</code></pre>\n      </div>\n      <p>console.log(\"D\");</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>A\nD\nC\nB</code></pre>\n      </div>\n      <h4>Order:</h4>\n      <p>Synchronous<br>→ A, D</p>\n      <p>Microtask<br>→ C</p>\n      <p>Task/timer<br>→ B</p>\n    "
  },
  {
    "id": "js-152",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise",
      "Microtask",
      "Output"
    ],
    "question": "এই nested Promise code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n  console.log(\"A\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n    console.log(\"B\");\n  });\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Promise.resolve().then(() =&gt; {\n  console.log(\"C\");\n});</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>A\nC\nB</code></pre>\n      </div>\n      <p>প্রথম Promise callback microtask queue-তে যায়।</p>\n      <p>A execute হওয়ার সময় B-এর জন্য নতুন microtask schedule হয়।</p>\n      <p>কিন্তু queue-তে C আগে থেকেই ছিল।</p>\n      <h4>তাই:</h4>\n      <p>A<br>C<br>B</p>\n    "
  },
  {
    "id": "js-153",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "async",
      "await",
      "Promise",
      "Output"
    ],
    "question": "এই async/await code-এর output কী হবে?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async function test() {\n  console.log(\"1\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>await Promise.resolve();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\"2\");\n}</code></pre>\n      </div>\n      <p>console.log(\"3\");</p>\n      <p>test();</p>\n      <p>console.log(\"4\");</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>3\n1\n4\n2</code></pre>\n      </div>\n      <p>test() call হলে 1 synchronousভাবে execute হয়।</p>\n      <p>await-এর পরে function pause হয়।</p>\n      <p>main synchronous code 4 print করে।</p>\n      <p>তারপর await continuation microtask হিসেবে execute হয়ে 2 print করে।</p>\n    "
  },
  {
    "id": "js-154",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise.all",
      "Coding"
    ],
    "question": "দুটি API parallelভাবে call করার correct approach কী?",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [users, products] = await Promise.all([\n  fetchUsers(),\n  fetchProducts()\n]);</code></pre>\n      </div>\n      <p>এতে দুইটি operation parallelভাবে শুরু হয়।</p>\n      <h4>Sequential approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const users = await fetchUsers();\nconst products = await fetchProducts();</code></pre>\n      </div>\n      <p>এখানে products request users শেষ হওয়ার পরে শুরু হয়।</p>\n      <p>যদি দুই operation independent হয়, Promise.all সাধারণত latency কমাতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "js-155",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise.allSettled",
      "Promise"
    ],
    "question": "Promise.allSettled() কখন ব্যবহার করবেন?",
    "answer": "\n      <p>যখন সব asynchronous operation-এর final status দরকার, even if some fail।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const results = await Promise.allSettled([\n  fetchUsers(),\n  fetchProducts(),\n  fetchOrders()\n]);</code></pre>\n      </div>\n      <h4>Result-এর প্রতিটি item সাধারণত:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  status: \"fulfilled\",\n  value: ...\n}</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  status: \"rejected\",\n  reason: ...\n}</code></pre>\n      </div>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Batch API</li>\n        <li>Independent operations</li>\n        <li>Partial failure acceptable</li>\n      </ul>\n    "
  },
  {
    "id": "js-156",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise.race",
      "Timeout",
      "Coding"
    ],
    "question": "Promise.race() ব্যবহার করে timeout pattern তৈরি করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const timeout = new Promise((_, reject) =&gt; {\n  setTimeout(() =&gt; {\n    reject(new Error(\"Timeout\"));\n  }, 5000);\n});</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = await Promise.race([\n  fetchData(),\n  timeout\n]);</code></pre>\n      </div>\n      <p>যেটি আগে settle করবে সেটিই race-এর result।</p>\n      <p>তবে শুধু Promise.race() ব্যবহার করলে underlying fetch automatically cancel হয় না।</p>\n      <p>Real implementation-এ AbortController ব্যবহার করে request abort করা ভালো।</p>\n    "
  },
  {
    "id": "js-157",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Promise.any",
      "Promise"
    ],
    "question": "Promise.any() কী?",
    "answer": "\n      <p>Promise.any() প্রথম fulfilled Promise-এর result return করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const result = await Promise.any([\n  fetchFromServer1(),\n  fetchFromServer2(),\n  fetchFromServer3()\n]);</code></pre>\n      </div>\n      <p>যদি একটি successful হয়, সেটিই পাওয়া যাবে।</p>\n      <p>সব Promise reject করলে AggregateError পাওয়া যায়।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Multiple fallback servers</li>\n        <li>Redundant services</li>\n        <li>Fastest successful source</li>\n      </ul>\n    "
  },
  {
    "id": "js-158",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Async",
      "Sequential",
      "Parallel"
    ],
    "question": "কখন async operations sequential এবং কখন parallel করবেন?",
    "answer": "\n      <h4>Parallel:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [a, b, c] = await Promise.all([\n  getA(),\n  getB(),\n  getC()\n]);</code></pre>\n      </div>\n      <p>যখন operations independent।</p>\n      <h4>Sequential:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = await getUser();\nconst orders = await getOrders(user.id);</code></pre>\n      </div>\n      <p>যখন দ্বিতীয় operation প্রথমটির result-এর উপর নির্ভর করে।</p>\n      <h4>Common performance mistake:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const a = await getA();\nconst b = await getB();</code></pre>\n      </div>\n      <p>যদি a এবং b independent হয়, unnecessarily sequential execution latency বাড়াতে পারে।</p>\n    "
  },
  {
    "id": "js-159",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Error Handling",
      "try-catch",
      "async"
    ],
    "question": "async function-এর error কীভাবে handle করবেন?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async function getUser() {\n  try {\n    const response = await fetch(\"/api/user\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (!response.ok) {\n      throw new Error(\"Request failed\");\n    }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return await response.json();\n  } catch (error) {\n    console.error(error);\n    throw error;\n  }\n}</code></pre>\n      </div>\n      <h4>Important:</h4>\n      <p>catch করে error silently ignore করা উচিত নয়।</p>\n      <p>Layered application-এ lower layer error log/transform করতে পারে এবং upper layer appropriate response দিতে পারে।</p>\n    "
  },
  {
    "id": "js-160",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Error Handling",
      "finally"
    ],
    "question": "finally কখন execute হয়?",
    "answer": "\n      <p>finally সাধারণত try/catch flow-এর পরে cleanup করার জন্য ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try {\n  await request();\n} catch (error) {\n  console.error(error);\n} finally {\n  hideLoading();\n}</code></pre>\n      </div>\n      <p>Request success বা failure—দুই ক্ষেত্রেই cleanup প্রয়োজন হলে finally useful।</p>\n      <p><strong>Use case:</strong></p>\n      <ul>\n        <li>Loading state</li>\n        <li>Lock release</li>\n        <li>Resource cleanup</li>\n        <li>Temporary state cleanup</li>\n      </ul>\n    "
  },
  {
    "id": "js-161",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Prototype",
      "Inheritance",
      "Coding"
    ],
    "question": "Prototype inheritance implement করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const animal = {\n  speak() {\n    return \"Animal sound\";\n  }\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const dog = Object.create(animal);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>dog.bark = function () {\n  return \"Woof\";\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(dog.speak());\nconsole.log(dog.bark());</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Animal sound\nWoof</code></pre>\n      </div>\n      <p>dog-এর নিজের speak property নেই।</p>\n      <p>JavaScript prototype chain অনুসরণ করে animal-এর speak খুঁজে পায়।</p>\n    "
  },
  {
    "id": "js-162",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Class",
      "Inheritance",
      "super"
    ],
    "question": "class inheritance-এ super কী?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Animal {\n  speak() {\n    return \"Animal\";\n  }\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Dog extends Animal {\n  speak() {\n    return super.speak() + \" Dog\";\n  }\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const dog = new Dog();</code></pre>\n      </div>\n      <p>console.log(dog.speak());</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Animal Dog</code></pre>\n      </div>\n      <p>super parent class-এর method/property access করার জন্য ব্যবহৃত হয়।</p>\n    "
  },
  {
    "id": "js-163",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Proxy",
      "Coding"
    ],
    "question": "Proxy ব্যবহার করে property access logging implement করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const user = {\n  name: \"Nazmul\",\n  age: 30\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const proxy = new Proxy(user, {\n  get(target, property, receiver) {\n    console.log(\"Reading:\", property);\n    return Reflect.get(target, property, receiver);\n  }\n});</code></pre>\n      </div>\n      <p>console.log(proxy.name);</p>\n      <h4>Output-এর আগে:</h4>\n      <p><strong>Reading:</strong> name</p>\n      <h4>তারপর:</h4>\n      <p>Nazmul</p>\n      <p>Proxy দিয়ে object access intercept করা যায়।</p>\n    "
  },
  {
    "id": "js-164",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Deep Clone",
      "Coding"
    ],
    "question": "একটি nested object safely clone করার modern approach কী?",
    "answer": "\n      <h4>Simple supported data structure হলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const copy = structuredClone(original);</code></pre>\n      </div>\n      <p>এটি nested object-এর deep clone তৈরি করতে পারে।</p>\n      <p>তবে সব JavaScript value structured-cloneable নয়।</p>\n      <p><strong>Alternative:</strong></p>\n      <ul>\n        <li>Custom clone</li>\n        <li>Specialized library</li>\n        <li>Domain-specific serialization</li>\n      </ul>\n      <p>JSON.parse(JSON.stringify()) blindly ব্যবহার করা উচিত নয়, কারণ এটি অনেক data type এবং special values preserve করতে পারে না।</p>\n    "
  },
  {
    "id": "js-165",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Flatten",
      "Array",
      "Coding"
    ],
    "question": "Nested array flatten করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const arr = [1, [2, [3, 4]], 5];</code></pre>\n      </div>\n      <p>console.log(arr.flat(Infinity));</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3, 4, 5]</code></pre>\n      </div>\n      <h4>নির্দিষ্ট depth:</h4>\n      <p>arr.flat(1);</p>\n      <p>Recursive custom implementation-ও interview-এ জিজ্ঞেস করা হতে পারে।</p>\n    "
  },
  {
    "id": "js-166",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Flatten",
      "Recursion",
      "Coding"
    ],
    "question": "Array.flat() ছাড়া recursive flatten function লিখুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function flatten(arr) {\n  const result = [];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (const item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flatten(item));\n    } else {\n      result.push(item);\n    }\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return result;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(\n  flatten([1, [2, [3, 4]], 5])\n);</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[1, 2, 3, 4, 5]</code></pre>\n      </div>\n      <p>এখানে recursion ব্যবহার করা হয়েছে।</p>\n    "
  },
  {
    "id": "js-167",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Object",
      "GroupBy",
      "Coding"
    ],
    "question": "Array of objects category অনুযায়ী group করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const products = [\n  { name: \"A\", category: \"mobile\" },\n  { name: \"B\", category: \"laptop\" },\n  { name: \"C\", category: \"mobile\" }\n];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const grouped = products.reduce((acc, product) =&gt; {\n  const key = product.category;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (!acc[key]) {\n    acc[key] = [];\n  }</code></pre>\n      </div>\n      <p>acc[key].push(product);</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return acc;\n}, {});</code></pre>\n      </div>\n      <h4>Result:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{\n  mobile: [\n    { name: \"A\", category: \"mobile\" },\n    { name: \"C\", category: \"mobile\" }\n  ],\n  laptop: [\n    { name: \"B\", category: \"laptop\" }\n  ]\n}</code></pre>\n      </div>\n      <p>Modern JavaScript-এর Object.groupBy() supported runtime-এ এই ধরনের কাজ আরও সরাসরি করা যায়।</p>\n    "
  },
  {
    "id": "js-168",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Array",
      "Two Sum",
      "Algorithm"
    ],
    "question": "Two Sum problem solve করুন।",
    "answer": "\n      <h4>Problem:</h4>\n      <p>[2, 7, 11, 15]</p>\n      <p>target = 9</p>\n      <h4>Expected:</h4>\n      <p>[0, 1]</p>\n      <h4>Optimized solution:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function twoSum(nums, target) {\n  const map = new Map();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (let i = 0; i &lt; nums.length; i++) {\n    const complement = target - nums[i];</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (map.has(complement)) {\n      return [map.get(complement), i];\n    }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>map.set(nums[i], i);\n  }\n}</code></pre>\n      </div>\n      <p><strong>Time Complexity:</strong><br>O(n)</p>\n      <p><strong>Space Complexity:</strong><br>O(n)</p>\n      <p>Brute force করলে O(n²) হতে পারে।</p>\n    "
  },
  {
    "id": "js-169",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Algorithm",
      "Palindrome",
      "Coding"
    ],
    "question": "String palindrome check করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function isPalindrome(str) {\n  const normalized = str\n    .toLowerCase()\n    .replace(/[^a-z0-9]/g, \"\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return normalized ===\n    normalized.split(\"\").reverse().join(\"\");\n}</code></pre>\n      </div>\n      <p>console.log(isPalindrome(\"Madam\"));</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>true</code></pre>\n      </div>\n      <p>Interview-এ optimized two-pointer approach-ও implement করতে বলা হতে পারে।</p>\n    "
  },
  {
    "id": "js-170",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Algorithm",
      "String",
      "Coding"
    ],
    "question": "String-এর প্রথম non-repeating character বের করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function firstUniqueChar(str) {\n  const count = new Map();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (const char of str) {\n    count.set(char, (count.get(char) || 0) + 1);\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (const char of str) {\n    if (count.get(char) === 1) {\n      return char;\n    }\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return null;\n}</code></pre>\n      </div>\n      <p>console.log(firstUniqueChar(\"aabbcdd\"));</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>c</code></pre>\n      </div>\n      <p><strong>Time Complexity:</strong><br>O(n)</p>\n      <p><strong>Space Complexity:</strong><br>O(n)</p>\n    "
  },
  {
    "id": "js-171",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Algorithm",
      "Anagram",
      "Coding"
    ],
    "question": "দুটি string anagram কি না check করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function isAnagram(a, b) {\n  if (a.length !== b.length) {\n    return false;\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const count = new Map();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (const char of a) {\n    count.set(char, (count.get(char) || 0) + 1);\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (const char of b) {\n    const value = count.get(char);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (!value) {\n      return false;\n    }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>count.set(char, value - 1);\n  }</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return true;\n}</code></pre>\n      </div>\n      <p>console.log(isAnagram(\"listen\", \"silent\"));</p>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>true</code></pre>\n      </div>\n      <p><strong>Time Complexity:</strong><br>O(n)</p>\n      <p><strong>Space Complexity:</strong><br>O(n)</p>\n    "
  },
  {
    "id": "js-172",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Algorithm",
      "Array",
      "Intersection"
    ],
    "question": "দুটি array-এর common values বের করুন।",
    "answer": "\n      <h4>Code:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function intersection(a, b) {\n  const set = new Set(a);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return [...new Set(\n    b.filter(value =&gt; set.has(value))\n  )];\n}</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>intersection(\n  [1, 2, 3, 4],\n  [3, 4, 5, 6]\n);</code></pre>\n      </div>\n      <h4>Output:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>[3, 4]</code></pre>\n      </div>\n      <p>Set ব্যবহার করার কারণে lookup average O(1) হতে পারে।</p>\n    "
  },
  {
    "id": "js-173",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Concurrency",
      "Promise",
      "Coding"
    ],
    "question": "একসাথে সর্বোচ্চ 2টি Promise execute করার concurrency limiter কীভাবে বানাবেন?",
    "answer": "\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>100 jobs\n    ↓\nConcurrency = 2\n    ↓\nJob 1 + Job 2\n    ↓\nJob 3 starts\n    ↓\nJob 4 starts</code></pre>\n      </div>\n      <p>Interview implementation-এ সাধারণত worker pool pattern ব্যবহার করা হয়।</p>\n      <h4>Important idea:</h4>\n      <ul>\n        <li>Pending jobs queue</li>\n        <li>Active counter</li>\n        <li>Maximum concurrency</li>\n        <li>Promise completion হলে next job start</li>\n      </ul>\n      <p>এটি production systems-এ API rate limiting এবং resource control-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-174",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Memory Leak",
      "Closure",
      "Performance"
    ],
    "question": "Closure কীভাবে memory leak-এর কারণ হতে পারে?",
    "answer": "\n      <p>Closure নিজে memory leak নয়।</p>\n      <p>কিন্তু unnecessary long-lived reference থাকলে memory release হতে দেরি হতে পারে।</p>\n      <h4>Example concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function createHandler() {\n  const hugeData = new Array(1000000).fill(\"data\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return () =&gt; {\n    console.log(\"handler\");\n  };\n}</code></pre>\n      </div>\n      <p>যদি returned function দীর্ঘসময় alive থাকে এবং closure-এর কারণে বড় object reachable থাকে, memory unnecessarily retained হতে পারে।</p>\n      <p><strong>Prevention:</strong></p>\n      <ul>\n        <li>Unnecessary references remove করা</li>\n        <li>Event listeners cleanup</li>\n        <li>Timers cleanup</li>\n        <li>Cache limit করা</li>\n        <li>Long-lived closures review করা</li>\n      </ul>\n    "
  },
  {
    "id": "js-175",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Listener",
      "Memory Leak",
      "DOM"
    ],
    "question": "Event listener থেকে memory leak কীভাবে হতে পারে?",
    "answer": "\n      <p>যদি dynamically created object/element-এর সাথে listener attach করা হয় কিন্তু পরে listener remove না করা হয়, long-lived references তৈরি হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const button = document.querySelector(\"#button\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function handleClick() {\n  console.log(\"clicked\");\n}</code></pre>\n      </div>\n      <p>button.addEventListener(\"click\", handleClick);</p>\n      <h4>Cleanup:</h4>\n      <p>button.removeEventListener(\"click\", handleClick);</p>\n      <p>Modern UI frameworks-এ component unmount হলে subscriptions, timers এবং listeners cleanup করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "js-176",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Debounce",
      "Throttle",
      "Interview"
    ],
    "question": "Debounce এবং Throttle-এর real-world example দিন।",
    "answer": "\n      <h4>Debounce:</h4>\n      <h4>User search box-এ typing করছে:</h4>\n      <p>J<br>Ja<br>Jav<br>Java</p>\n      <p>প্রতিটি keystroke-এ API call না করে user typing থামানোর 300-500ms পরে API call করা।</p>\n      <h4>Throttle:</h4>\n      <p>User scroll করছে।</p>\n      <p>প্রতি millisecond-এ event process না করে প্রতি 100ms-এ সর্বোচ্চ একবার handler চালানো।</p>\n      <h4>Shortcut:</h4>\n      <p><strong>Debounce:</strong><br>\"Stop করলে কাজ করো\"</p>\n      <p><strong>Throttle:</strong><br>\"চলতে থাকলেও নির্দিষ্ট interval-এ কাজ করো\"</p>\n    "
  },
  {
    "id": "js-177",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Delegation",
      "DOM",
      "Coding"
    ],
    "question": "Event Delegation কী এবং কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Parent element-এ একটি listener রেখে child events handle করাকে event delegation বলা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>document.querySelector(\"#list\")\n  .addEventListener(\"click\", event =&gt; {\n    const item = event.target.closest(\"li\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (!item) return;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>console.log(item.dataset.id);\n  });</code></pre>\n      </div>\n      <p><strong>Advantages:</strong></p>\n      <ul>\n        <li>অনেক child-এর জন্য আলাদা listener প্রয়োজন নেই।</li>\n        <li>Dynamically added elements handle করা যায়।</li>\n        <li>Listener count কমে।</li>\n      </ul>\n      <p>এটি event bubbling-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "js-178",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Event Propagation",
      "DOM"
    ],
    "question": "Event capturing এবং bubbling কী?",
    "answer": "\n      <h4>Event propagation সাধারণভাবে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Capturing:\nWindow\n ↓\nDocument\n ↓\nParent\n ↓\nTarget</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Target\n ↓\nParent\n ↓\nDocument\n ↓\nWindow</code></pre>\n      </div>\n      <p>এটি bubbling phase।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>javascript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>element.addEventListener(\n  \"click\",\n  handler,\n  true\n);</code></pre>\n      </div>\n      <p>true দিলে capturing phase listener register করা যায়।</p>\n      <p>Default addEventListener listener bubbling phase-এ থাকে।</p>\n    "
  },
  {
    "id": "js-179",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "stopPropagation",
      "DOM"
    ],
    "question": "stopPropagation() এবং preventDefault() এর পার্থক্য কী?",
    "answer": "\n      <h4>preventDefault():</h4>\n      <p>Browser-এর default action prevent করে।</p>\n      <p><strong>Example:</strong><br>Link click করলে navigation prevent করা।</p>\n      <h4>stopPropagation():</h4>\n      <p>Event propagation বন্ধ করে।</p>\n      <p>অর্থাৎ event parent/other propagation phases-এ আর যেতে না পারে।</p>\n      <p>দুটো একই কাজ করে না।</p>\n      <p><strong>preventDefault:</strong><br>\"Default browser action বন্ধ করো\"</p>\n      <p><strong>stopPropagation:</strong><br>\"Event propagation বন্ধ করো\"</p>\n    "
  },
  {
    "id": "js-180",
    "category": "JavaScript",
    "difficulty": "Advanced",
    "tags": [
      "Senior Interview",
      "Output",
      "Event Loop"
    ],
    "question": "Senior JavaScript interview-এর জন্য সবচেয়ে গুরুত্বপূর্ণ output concepts কী কী?",
    "answer": "\n      <h4>সবচেয়ে বেশি practice করুন:</h4>\n      <ol>\n        <li>var hoisting</li>\n        <li>let/const TDZ</li>\n        <li>Function hoisting</li>\n        <li>Closure</li>\n        <li>var vs let loop</li>\n        <li>this</li>\n        <li>Arrow function this</li>\n        <li>call/apply/bind</li>\n        <li>Prototype chain</li>\n        <li>Type coercion</li>\n        <li>== vs ===</li>\n        <li>null vs undefined</li>\n        <li>NaN</li>\n        <li>Object reference</li>\n        <li>Shallow copy</li>\n        <li>Deep copy</li>\n        <li>map/filter/reduce</li>\n        <li>sort mutation</li>\n        <li>Promise</li>\n        <li>Promise chaining</li>\n        <li>Promise.all</li>\n        <li>Promise.allSettled</li>\n        <li>Promise.race</li>\n        <li>Promise.any</li>\n        <li>async/await</li>\n        <li>Microtask</li>\n        <li>setTimeout</li>\n        <li>Event Loop</li>\n        <li>Generator</li>\n        <li>Iterator</li>\n        <li>Proxy</li>\n        <li>Reflect</li>\n        <li>Debounce</li>\n        <li>Throttle</li>\n        <li>Memoization</li>\n        <li>Event delegation</li>\n        <li>Event propagation</li>\n        <li>Memory leak</li>\n        <li>Garbage collection</li>\n        <li>Concurrency control</li>\n      </ol>\n      <p>Senior interview-এ শুধু output বলা যথেষ্ট নয়।</p>\n      <h4>আপনাকে explain করতে হবে:</h4>\n      <p>\"কেন এই output?\"</p>\n      <p>\"Call stack-এ কখন গেল?\"</p>\n      <p>\"Microtask queue-তে কখন গেল?\"</p>\n      <p>\"Reference কোথায়?\"</p>\n      <p>\"Closure কোন variable ধরে রেখেছে?\"</p>\n      <p>\"এই implementation-এর complexity কত?\"</p>\n      <p>\"Production-এ এর সমস্যা কী হতে পারে?\"</p>\n      <p>এই reasoning ability-টাই senior-level JavaScript interview-এ সবচেয়ে গুরুত্বপূর্ণ।</p>\n    "
  }
];
