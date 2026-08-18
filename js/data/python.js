const pythonQuestions = [
  {
    "id": "py-1",
    "category": "Python",
    "difficulty": "Beginner",
    "tags": [
      "Python",
      "Interpreter",
      "Features",
      "PEP8"
    ],
    "question": "Python কী? Python-এর প্রধান বৈশিষ্ট্যগুলো কী?",
    "answer": "\n      <p>Python হলো একটি high-level, general-purpose, interpreted programming language। এটি web development, API development, automation, data science, AI/ML, scripting এবং microservices-এ ব্যাপকভাবে ব্যবহৃত হয়।</p>\n      <h4>Python-এর প্রধান বৈশিষ্ট্য:</h4>\n      <ol>\n        <li>সহজ এবং readable syntax</li>\n        <li>Dynamically typed</li>\n        <li>Interpreted/bytecode-based execution</li>\n        <li>Object-oriented programming support</li>\n        <li>Functional programming support</li>\n        <li>Automatic memory management</li>\n        <li>Large standard library</li>\n        <li>বিশাল third-party ecosystem</li>\n        <li>Exception handling</li>\n        <li>Generators এবং iterators</li>\n        <li>Async/await support</li>\n        <li>Cross-platform</li>\n        <li>Fast development speed</li>\n      </ol>\n      <p>Python-এর একটি গুরুত্বপূর্ণ বিষয় হলো এটি শুধু \"interpreted language\" বললে পুরো picture পাওয়া যায় না। CPython সাধারণত source code-কে bytecode-এ compile করে এবং Python Virtual Machine সেই bytecode execute করে।</p>\n      <h4>Typical flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Python Source Code\n        ↓\nPython Compiler\n        ↓\nBytecode\n        ↓\nPython Virtual Machine\n        ↓\nExecution</code></pre>\n      </div>\n      <p>PEP 8 Python code-এর style এবং formatting-এর guideline প্রদান করে।</p>\n    "
  },
  {
    "id": "py-2",
    "category": "Python",
    "difficulty": "Beginner",
    "tags": [
      "Syntax",
      "Variables",
      "Dynamic Typing",
      "Strong Typing"
    ],
    "question": "Python dynamically typed এবং strongly typed বলতে কী বোঝায়?",
    "answer": "\n      <p>Python dynamically typed কারণ variable declare করার সময় data type explicitly declare করতে হয় না।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>x = 10\nx = \"Nazmul\"</code></pre>\n      </div>\n      <p>একই variable পরে অন্য type-এর object reference করতে পারে।</p>\n      <p>Python strongly typed কারণ incompatible types automatically unsafeভাবে combine করে না।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>age = 30\nname = \"Nazmul\"</code></pre>\n      </div>\n      <p>age + name</p>\n      <p>এখানে Python implicitভাবে integer এবং string concatenate করে দেবে না; TypeError হবে।</p>\n      <h4>সুতরাং:</h4>\n      <p><strong>Dynamic typing:</strong><br>Variable-এর type runtime-এ determine হয়।</p>\n      <p><strong>Strong typing:</strong><br>Different incompatible types-এর operation automatically unsafe conversion করে না।</p>\n    "
  },
  {
    "id": "py-3",
    "category": "Python",
    "difficulty": "Beginner",
    "tags": [
      "Data Types",
      "Built-in Types"
    ],
    "question": "Python-এর built-in data types কী কী?",
    "answer": "\n      <h4>Python-এর গুরুত্বপূর্ণ built-in data types:</h4>\n      <p><strong>1. Numeric:</strong></p>\n      <ul>\n        <li>   - int</li>\n        <li>   - float</li>\n        <li>   - complex</li>\n      </ul>\n      <p><strong>2. Boolean:</strong></p>\n      <ul>\n        <li>   - bool</li>\n      </ul>\n      <p><strong>3. Sequence:</strong></p>\n      <ul>\n        <li>   - list</li>\n        <li>   - tuple</li>\n        <li>   - range</li>\n      </ul>\n      <p><strong>4. Text:</strong></p>\n      <ul>\n        <li>   - str</li>\n      </ul>\n      <p><strong>5. Mapping:</strong></p>\n      <ul>\n        <li>   - dict</li>\n      </ul>\n      <p><strong>6. Set:</strong></p>\n      <ul>\n        <li>   - set</li>\n        <li>   - frozenset</li>\n      </ul>\n      <p><strong>7. Binary:</strong></p>\n      <ul>\n        <li>   - bytes</li>\n        <li>   - bytearray</li>\n        <li>   - memoryview</li>\n      </ul>\n      <p><strong>8. Special:</strong></p>\n      <ul>\n        <li>   - NoneType</li>\n      </ul>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>age = 30                  # int\nprice = 99.5              # float\nname = \"Nazmul\"           # str\nactive = True              # bool\nitems = [1, 2, 3]         # list\npoint = (10, 20)          # tuple\nusers = {\"id\": 1}         # dict\nunique = {1, 2, 3}        # set\nvalue = None              # NoneType</code></pre>\n      </div>\n      <p>Interview-এ list, tuple, set এবং dict-এর difference অবশ্যই জানতে হবে।</p>\n    "
  },
  {
    "id": "py-4",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "List",
      "Tuple",
      "Set",
      "Dictionary",
      "Data Structures"
    ],
    "question": "List, Tuple, Set এবং Dictionary-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p><strong>List:</strong></p>\n      <ul>\n        <li>Ordered</li>\n        <li>Mutable</li>\n        <li>Duplicate allowed</li>\n        <li>Index দিয়ে access করা যায়</li>\n      </ul>\n      <p><strong>Example:</strong><br>items = [1, 2, 2, 3]</p>\n      <p><strong>Tuple:</strong></p>\n      <ul>\n        <li>Ordered</li>\n        <li>Immutable</li>\n        <li>Duplicate allowed</li>\n        <li>Index দিয়ে access করা যায়</li>\n      </ul>\n      <p><strong>Example:</strong><br>items = (1, 2, 2, 3)</p>\n      <p><strong>Set:</strong></p>\n      <ul>\n        <li>Unique values</li>\n        <li>Mutable</li>\n        <li>সাধারণত unordered collection হিসেবে ব্যবহার করা হয়</li>\n        <li>Duplicate রাখে না</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Example:\nitems = {1, 2, 3}</code></pre>\n      </div>\n      <p><strong>Dictionary:</strong></p>\n      <ul>\n        <li>Key-value structure</li>\n        <li>Mutable</li>\n        <li>Key unique হতে হয়</li>\n        <li>Key hashable হতে হয়</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Example:\nuser = {\n    \"id\": 1,\n    \"name\": \"Nazmul\"\n}</code></pre>\n      </div>\n      <h4>কখন কোনটি ব্যবহার করবেন:</h4>\n      <p>List → Ordered collection এবং পরিবর্তন দরকার হলে<br>Tuple → Immutable structured data<br>Set → Unique values / membership checking<br>Dict → Key-value lookup</p>\n    "
  },
  {
    "id": "py-5",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Mutable",
      "Immutable",
      "Object"
    ],
    "question": "Mutable এবং Immutable object কী?",
    "answer": "\n      <p>Mutable object হলো এমন object যার internal state তৈরি হওয়ার পরে পরিবর্তন করা যায়।</p>\n      <p><strong>Mutable examples:</strong></p>\n      <ul>\n        <li>list</li>\n        <li>dict</li>\n        <li>set</li>\n        <li>bytearray</li>\n      </ul>\n      <p><strong>Immutable examples:</strong></p>\n      <ul>\n        <li>int</li>\n        <li>float</li>\n        <li>str</li>\n        <li>tuple</li>\n        <li>bool</li>\n        <li>frozenset</li>\n        <li>bytes</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>items = [1, 2, 3]\nitems.append(4)</code></pre>\n      </div>\n      <p>এখানে একই list object পরিবর্তিত হয়েছে।</p>\n      <h4>কিন্তু:</h4>\n      <p>name = \"Nazmul\"<br>name = name + \" Haque\"</p>\n      <p>এখানে original string পরিবর্তন হয়নি। নতুন string object তৈরি হয়েছে।</p>\n      <p>Immutable object সাধারণত hashable হতে পারে, তাই string এবং tuple dictionary key হিসেবে ব্যবহার করা যায় যদি tuple-এর সব element hashable হয়।</p>\n    "
  },
  {
    "id": "py-6",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "is",
      "==",
      "Equality",
      "Identity"
    ],
    "question": "Python-এ == এবং is-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>== value equality check করে।</p>\n      <p>is object identity check করে।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>a = [1, 2]\nb = [1, 2]</code></pre>\n      </div>\n      <p>a == b<br>→ True</p>\n      <p>কারণ দুইটির value একই।</p>\n      <h4>কিন্তু:</h4>\n      <p>a is b<br>→ False</p>\n      <p>কারণ দুইটি আলাদা object।</p>\n      <h4>সাধারণত None check করার সময়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if value is None:\n    ...</code></pre>\n      </div>\n      <p>ব্যবহার করা উচিত।</p>\n      <p>কারণ এখানে আমরা value equality নয়, object identity check করতে চাই।</p>\n    "
  },
  {
    "id": "py-7",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Shallow Copy",
      "Deep Copy",
      "Copy"
    ],
    "question": "Shallow copy এবং Deep copy কী?",
    "answer": "\n      <p>Shallow copy outer object copy করে, কিন্তু nested mutable object-এর reference share করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import copy</code></pre>\n      </div>\n      <p>a = [[1, 2], [3, 4]]<br>b = copy.copy(a)</p>\n      <p>এখানে outer list আলাদা হলেও nested list একই object হতে পারে।</p>\n      <p>Deep copy recursively nested object-ও copy করে।</p>\n      <p>b = copy.deepcopy(a)</p>\n      <p>তখন nested object-ও আলাদা হবে।</p>\n      <p><strong>Shallow copy:</strong><br>Outer object → নতুন<br>Nested object → shared হতে পারে</p>\n      <p><strong>Deep copy:</strong><br>Outer object → নতুন<br>Nested object → নতুন</p>\n      <p>Large object-এর ক্ষেত্রে deep copy memory এবং performance-এর জন্য expensive হতে পারে। তাই প্রয়োজন ছাড়া deepcopy ব্যবহার করা উচিত নয়।</p>\n    "
  },
  {
    "id": "py-8",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Variables",
      "Reference",
      "Object Model"
    ],
    "question": "Python variable কীভাবে কাজ করে? Python কি variable-এ value রাখে?",
    "answer": "\n      <p>Python-এ variable মূলত object-এর reference বা name binding হিসেবে কাজ করে।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>a = [1, 2, 3]\nb = a</code></pre>\n      </div>\n      <p>এখানে a এবং b একই list object-কে reference করছে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>a ─────┐\n       ↓\n    [1, 2, 3]\n       ↑\n       └───── b</code></pre>\n      </div>\n      <h4>তাই:</h4>\n      <p>b.append(4)</p>\n      <p>করলে a-এর মাধ্যমে দেখা list-ও পরিবর্তিত হবে।</p>\n      <p>এই object reference model Python-এর mutable এবং immutable behavior বোঝার জন্য খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-9",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Function",
      "Parameters",
      "Arguments",
      "Return"
    ],
    "question": "Python function কী? Parameter এবং argument-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Function হলো reusable code block যা নির্দিষ্ট কাজ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def add(a, b):\n    return a + b</code></pre>\n      </div>\n      <p>এখানে a এবং b হলো parameters।</p>\n      <h4>যখন call করা হয়:</h4>\n      <p>add(10, 20)</p>\n      <p>এখানে 10 এবং 20 হলো arguments।</p>\n      <p><strong>Parameter:</strong><br>Function definition-এর variable।</p>\n      <p><strong>Argument:</strong><br>Function call করার সময় দেওয়া actual value।</p>\n      <p><strong>Python function:</strong></p>\n      <ul>\n        <li>Multiple arguments নিতে পারে</li>\n        <li>Default parameter থাকতে পারে</li>\n        <li>Keyword argument নিতে পারে</li>\n        <li>*args নিতে পারে</li>\n        <li>**kwargs নিতে পারে</li>\n        <li>Function object হিসেবে pass করা যায়</li>\n        <li>Function থেকে multiple values return করা যায়</li>\n      </ul>\n    "
  },
  {
    "id": "py-10",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Default Argument",
      "Function",
      "Mutable Default"
    ],
    "question": "Python-এ mutable default argument-এর সমস্যা কী?",
    "answer": "\n      <p>একটি common Python mistake হলো mutable object-কে function-এর default argument হিসেবে ব্যবহার করা।</p>\n      <h4>Problematic example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def add_item(item, items=[]):\n    items.append(item)\n    return items</code></pre>\n      </div>\n      <p>এই default list function definition-এর সময় একবার তৈরি হয় এবং পরবর্তী call-গুলোতে একই list reuse হতে পারে।</p>\n      <h4>তাই:</h4>\n      <p>add_item(\"A\")<br>add_item(\"B\")</p>\n      <h4>এর result unexpectedভাবে:</h4>\n      <p>[\"A\", \"B\"]</p>\n      <p>হতে পারে।</p>\n      <h4>Better approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def add_item(item, items=None):\n    if items is None:\n        items = []</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>items.append(item)\n    return items</code></pre>\n      </div>\n      <p>এখানে প্রতিবার প্রয়োজন হলে নতুন list তৈরি হয়।</p>\n      <p>Interview-এ এটি Python-এর খুব common trick question।</p>\n    "
  },
  {
    "id": "py-11",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "args",
      "kwargs",
      "Function"
    ],
    "question": "*args এবং **kwargs কী?",
    "answer": "\n      <p>*args variable number of positional arguments গ্রহণ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def add(*args):\n    return sum(args)</code></pre>\n      </div>\n      <p>add(1, 2, 3, 4)</p>\n      <p>এখানে args একটি tuple।</p>\n      <p><strong>kwargs variable number of keyword arguments গ্রহণ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def create_user(</strong>kwargs):\n    return kwargs</code></pre>\n      </div>\n      <p>create_user(name=\"Nazmul\", age=30)</p>\n      <p>এখানে kwargs একটি dictionary।</p>\n      <h4>দুটো একসাথে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def function(*args, **kwargs):\n    ...</code></pre>\n      </div>\n      <p><strong>Use cases:</strong></p>\n      <ul>\n        <li>Flexible APIs</li>\n        <li>Wrapper functions</li>\n        <li>Decorators</li>\n        <li>Generic utility functions</li>\n      </ul>\n      <p><strong>Argument order সাধারণত:</strong><br>positional parameters<br>→ *args<br>→ keyword-only parameters<br>→ **kwargs</p>\n    "
  },
  {
    "id": "py-12",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Lambda",
      "Anonymous Function",
      "Functional Programming"
    ],
    "question": "Lambda function কী? কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Lambda হলো ছোট anonymous function।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>square = lambda x: x * x</code></pre>\n      </div>\n      <h4>এটি equivalent:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def square(x):\n    return x * x</code></pre>\n      </div>\n      <p>Lambda সাধারণত ছোট এক-line operation-এর জন্য ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users = [\n    {\"name\": \"A\", \"age\": 30},\n    {\"name\": \"B\", \"age\": 20}\n]</code></pre>\n      </div>\n      <p>users.sort(key=lambda user: user[\"age\"])</p>\n      <p>Complex business logic lambda-এর মধ্যে না রেখে normal named function ব্যবহার করা বেশি readable।</p>\n    "
  },
  {
    "id": "py-13",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "List Comprehension",
      "Dictionary Comprehension",
      "Set Comprehension"
    ],
    "question": "List comprehension কী?",
    "answer": "\n      <p>List comprehension হলো concise syntax ব্যবহার করে list তৈরি করার উপায়।</p>\n      <h4>Normal:</h4>\n      <p>result = []</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for i in range(10):\n    if i % 2 == 0:\n        result.append(i)</code></pre>\n      </div>\n      <h4>Comprehension:</h4>\n      <p>result = [i for i in range(10) if i % 2 == 0]</p>\n      <h4>Dictionary comprehension:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>squares = {\n    i: i * i\n    for i in range(5)\n}</code></pre>\n      </div>\n      <h4>Set comprehension:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>values = {\n    i * 2\n    for i in range(10)\n}</code></pre>\n      </div>\n      <p>ছোট এবং readable transformation-এর জন্য comprehension ভালো।</p>\n      <p>অতিরিক্ত complex comprehension readability কমিয়ে দিতে পারে।</p>\n    "
  },
  {
    "id": "py-14",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Iterator",
      "Iterable",
      "Iteration"
    ],
    "question": "Iterable এবং Iterator-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Iterable হলো এমন object যার উপর iteration করা যায়।</p>\n      <p><strong>Examples:</strong></p>\n      <ul>\n        <li>list</li>\n        <li>tuple</li>\n        <li>string</li>\n        <li>dict</li>\n        <li>set</li>\n      </ul>\n      <p>Iterator হলো এমন object যা একবারে একটি value return করে এবং __next__() support করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>numbers = [1, 2, 3]</code></pre>\n      </div>\n      <p>iterator = iter(numbers)</p>\n      <p>next(iterator)<br>→ 1</p>\n      <p>next(iterator)<br>→ 2</p>\n      <p>next(iterator)<br>→ 3</p>\n      <p>next(iterator)<br>→ StopIteration</p>\n      <p>for loop internally iterable থেকে iterator তৈরি করে এবং next() ব্যবহার করে value নেয়।</p>\n      <p>Generator হলো iterator তৈরি করার একটি সহজ উপায়।</p>\n    "
  },
  {
    "id": "py-15",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Generator",
      "Yield",
      "Lazy Evaluation",
      "Memory"
    ],
    "question": "Generator কী এবং yield কীভাবে কাজ করে?",
    "answer": "\n      <p>Generator এমন function যা yield ব্যবহার করে একবারে একটি value produce করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def numbers():\n    for i in range(1000000):\n        yield i</code></pre>\n      </div>\n      <p>এটি একসাথে 1 million value memory-তে রাখে না।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>next()\n↓\nGenerate value\n↓\nPause\n↓\nnext()\n↓\nResume\n↓\nGenerate next value</code></pre>\n      </div>\n      <p><strong>Generator-এর সুবিধা:</strong></p>\n      <ul>\n        <li>Memory efficient</li>\n        <li>Lazy evaluation</li>\n        <li>Large dataset processing</li>\n        <li>File streaming</li>\n        <li>Data pipeline</li>\n      </ul>\n      <p><strong>List:</strong><br>সব data তৈরি করে memory-তে রাখে।</p>\n      <p><strong>Generator:</strong><br>প্রয়োজন অনুযায়ী data তৈরি করে।</p>\n    "
  },
  {
    "id": "py-16",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "OOP",
      "Class",
      "Object",
      "Encapsulation"
    ],
    "question": "Python-এ OOP কী? Class এবং Object কী?",
    "answer": "\n      <p>OOP-এর পূর্ণরূপ Object-Oriented Programming।</p>\n      <p>Class হলো object তৈরির blueprint।</p>\n      <p>Object হলো class-এর instance।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class User:\n    def __init__(self, name):\n        self.name = name</code></pre>\n      </div>\n      <p>user = User(\"Nazmul\")</p>\n      <p>এখানে User হলো class এবং user হলো object।</p>\n      <p><strong>OOP-এর প্রধান concept:</strong><br>1. Encapsulation<br>2. Inheritance<br>3. Polymorphism<br>4. Abstraction</p>\n      <p>Large application এবং domain/business logic organize করার জন্য OOP useful।</p>\n    "
  },
  {
    "id": "py-17",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Inheritance",
      "Polymorphism",
      "OOP"
    ],
    "question": "Inheritance এবং Polymorphism কী?",
    "answer": "\n      <p>Inheritance-এর মাধ্যমে একটি class অন্য class-এর behavior এবং attributes reuse করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Animal:\n    def speak(self):\n        pass</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Dog(Animal):\n    def speak(self):\n        return \"Bark\"</code></pre>\n      </div>\n      <p>Dog Animal-এর behavior inherit করেছে।</p>\n      <p>Polymorphism হলো একই interface/method বিভিন্ন class-এ ভিন্নভাবে কাজ করা।</p>\n      <p>dog.speak()<br>→ Bark</p>\n      <p>cat.speak()<br>→ Meow</p>\n      <p>Python duck typing-এর কারণে explicit inheritance ছাড়াও polymorphism সম্ভব।</p>\n    "
  },
  {
    "id": "py-18",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "Duck Typing",
      "Polymorphism",
      "Dynamic Typing"
    ],
    "question": "Duck typing কী?",
    "answer": "\n      <p>Python-এ object-এর exact type-এর চেয়ে object কী behavior support করে সেটি বেশি গুরুত্বপূর্ণ হলে তাকে duck typing বলা হয়।</p>\n      <h4>Concept:</h4>\n      <p>\"If it walks like a duck and quacks like a duck, treat it like a duck.\"</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def make_sound(animal):\n    return animal.speak()</code></pre>\n      </div>\n      <p>Dog-এর speak() থাকলে এবং Cat-এরও speak() থাকলে function দুটোর ক্ষেত্রেই কাজ করতে পারে।</p>\n      <p>এখানে function class-এর inheritance relationship-এর উপর depend করছে না; expected behavior-এর উপর depend করছে।</p>\n      <p>এটি Python-এর dynamic এবং flexible design-এর গুরুত্বপূর্ণ অংশ।</p>\n    "
  },
  {
    "id": "py-19",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "ABC",
      "Abstract Class",
      "Abstraction",
      "OOP"
    ],
    "question": "Abstract class কী? Python-এ abstraction কীভাবে implement করবেন?",
    "answer": "\n      <p>Abstract class এমন base class যা common contract define করে এবং child class-কে নির্দিষ্ট method implement করতে বাধ্য করতে পারে।</p>\n      <p>Python-এ abc module ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>from abc import ABC, abstractmethod</code></pre>\n      </div>\n      <h4>class Payment(ABC):</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@abstractmethod\n    def pay(self, amount):\n        pass</code></pre>\n      </div>\n      <h4>class StripePayment(Payment):</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def pay(self, amount):\n        return \"Paid\"</code></pre>\n      </div>\n      <p>এখানে Payment একটি abstraction এবং StripePayment concrete implementation।</p>\n      <p>Dependency Inversion এবং clean architecture-এ abstraction গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-20",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "Magic Methods",
      "Dunder Methods",
      "OOP"
    ],
    "question": "Magic বা Dunder methods কী?",
    "answer": "\n      <p>যেসব special method-এর নাম __ দিয়ে শুরু এবং শেষ হয় সেগুলোকে dunder বা magic methods বলা হয়।</p>\n      <h4>Examples:</h4>\n      <p>__init__<br>__str__<br>__repr__<br>__len__<br>__eq__<br>__lt__<br>__add__<br>__enter__<br>__exit__</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class User:\n    def __init__(self, name):\n        self.name = name</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def __str__(self):\n        return self.name</code></pre>\n      </div>\n      <p>__str__ object-এর human-readable representation দিতে ব্যবহৃত হয়।</p>\n      <p>__repr__ debugging/developer-oriented representation-এর জন্য বেশি useful।</p>\n      <p>Magic methods Python object-এর built-in behavior customize করতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "py-21",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Decorator",
      "Higher Order Function",
      "Wrapper"
    ],
    "question": "Decorator কী এবং বাস্তবে কোথায় ব্যবহার করবেন?",
    "answer": "\n      <p>Decorator এমন function যা অন্য function-এর behavior modify বা extend করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def logger(func):\n    def wrapper(*args, **kwargs):\n        print(\"Before\")\n        result = func(*args, **kwargs)\n        print(\"After\")\n        return result</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return wrapper</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@logger\ndef hello():\n    print(\"Hello\")</code></pre>\n      </div>\n      <p><strong>Decorator-এর real-world use:</strong></p>\n      <ul>\n        <li>Logging</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Caching</li>\n        <li>Retry</li>\n        <li>Performance measurement</li>\n        <li>Permission checking</li>\n      </ul>\n      <p>FastAPI-এর route declaration-ও decorator pattern-এর একটি practical example।</p>\n    "
  },
  {
    "id": "py-22",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "functools",
      "Decorator",
      "Metadata",
      "wraps"
    ],
    "question": "functools.wraps কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Decorator-এর wrapper function ব্যবহার করলে original function-এর metadata হারিয়ে যেতে পারে।</p>\n      <p><strong>যেমন:</strong></p>\n      <ul>\n        <li>__name__</li>\n        <li>__doc__</li>\n        <li>অন্যান্য metadata</li>\n      </ul>\n      <p>functools.wraps ব্যবহার করলে original function-এর metadata preserve করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>from functools import wraps</code></pre>\n      </div>\n      <h4>def logger(func):</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return wrapper</code></pre>\n      </div>\n      <p>Production decorator লেখার সময় @wraps ব্যবহার করা ভালো practice।</p>\n    "
  },
  {
    "id": "py-23",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Context Manager",
      "With",
      "Resource Management"
    ],
    "question": "Context manager কী এবং কীভাবে নিজে তৈরি করবেন?",
    "answer": "\n      <p>Context manager resource lifecycle automatically manage করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>with open(\"file.txt\") as file:\n    data = file.read()</code></pre>\n      </div>\n      <p>এখানে with block শেষ হলে file properly close হয়।</p>\n      <h4>নিজে context manager তৈরি করার দুটি common উপায়:</h4>\n      <ol>\n        <li>__enter__ এবং __exit__</li>\n        <li>contextlib.contextmanager</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>from contextlib import contextmanager</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@contextmanager\ndef resource():\n    print(\"Open\")\n    try:\n        yield\n    finally:\n        print(\"Close\")</code></pre>\n      </div>\n      <p>Database connection, lock এবং file handling-এর মতো resource management-এ context manager useful।</p>\n    "
  },
  {
    "id": "py-24",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Exception",
      "Try",
      "Except",
      "Finally",
      "Raise"
    ],
    "question": "Python exception handling কীভাবে কাজ করে?",
    "answer": "\n      <p>Python-এ exception handling-এর জন্য try, except, else এবং finally ব্যবহার করা যায়।</p>\n      <h4>Structure:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try:\n    risky_operation()\nexcept SpecificException:\n    handle_error()\nelse:\n    success_logic()\nfinally:\n    cleanup()</code></pre>\n      </div>\n      <p><strong>try:</strong><br>যে code exception তৈরি করতে পারে।</p>\n      <p><strong>except:</strong><br>Exception handle করে।</p>\n      <p><strong>else:</strong><br>কোনো exception না হলে execute হয়।</p>\n      <p><strong>finally:</strong><br>Exception হোক বা না হোক সাধারণত execute হয় এবং cleanup-এর জন্য useful।</p>\n      <p>নিজে exception তৈরি করতে raise ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "py-25",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Custom Exception",
      "Exception Hierarchy",
      "Error Handling"
    ],
    "question": "Custom exception কেন এবং কীভাবে তৈরি করবেন?",
    "answer": "\n      <p>Business-specific error পরিষ্কারভাবে represent করার জন্য custom exception ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class UserNotFoundException(Exception):\n    pass</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class PaymentFailedException(Exception):\n    pass</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if user is None:\n    raise UserNotFoundException(\"User not found\")</code></pre>\n      </div>\n      <p><strong>Advantages:</strong></p>\n      <ul>\n        <li>Business error আলাদা করা যায়</li>\n        <li>Centralized exception handler করা সহজ</li>\n        <li>Error code mapping সহজ</li>\n        <li>Readability বাড়ে</li>\n      </ul>\n      <p>Large application-এ generic Exception-এর বদলে meaningful domain-specific exception ব্যবহার করা ভালো।</p>\n    "
  },
  {
    "id": "py-26",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Exception",
      "Bare Except",
      "Error Handling"
    ],
    "question": "except Exception এবং bare except-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>except Exception সাধারণ application-level exception ধরতে পারে।</p>\n      <h4>উদাহরণ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try:\n    ...\nexcept Exception as e:\n    ...</code></pre>\n      </div>\n      <h4>Bare except:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try:\n    ...\nexcept:\n    ...</code></pre>\n      </div>\n      <p>Bare except খুব broad এবং KeyboardInterrupt, SystemExit-এর মতো BaseException subclass-ও catch করতে পারে।</p>\n      <p>Production code-এ সাধারণত specific exception বা প্রয়োজন অনুযায়ী Exception catch করা ভালো।</p>\n      <p>Exception silently swallow করা উচিত নয়; logging এবং appropriate handling করা উচিত।</p>\n    "
  },
  {
    "id": "py-27",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Memory",
      "Reference Counting",
      "Heap",
      "CPython"
    ],
    "question": "Python memory management কীভাবে কাজ করে?",
    "answer": "\n      <h4>CPython-এর memory management-এর গুরুত্বপূর্ণ অংশগুলো হলো:</h4>\n      <ol>\n        <li>Python private heap</li>\n        <li>Reference counting</li>\n        <li>Garbage collector</li>\n        <li>Memory allocator</li>\n      </ol>\n      <p>Python objects private heap-এ রাখা হয়।</p>\n      <p>Variable object-কে reference করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>a = []\nb = a</code></pre>\n      </div>\n      <p>এখানে একই list object-এর multiple references আছে।</p>\n      <p>Reference count zero হলে object সাধারণত cleanup-এর জন্য eligible হয়।</p>\n      <p>Circular reference handle করার জন্য garbage collector কাজ করে।</p>\n      <p><strong>Python developer হিসেবে memory optimization-এর জন্য:</strong></p>\n      <ul>\n        <li>Large unnecessary objects avoid করা</li>\n        <li>Generator ব্যবহার করা</li>\n        <li>Cache size control করা</li>\n        <li>Connection/resource properly close করা</li>\n        <li>Memory leak-এর source identify করা</li>\n      </ul>\n      <p>গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-28",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Garbage Collection",
      "Reference Cycle",
      "Memory"
    ],
    "question": "Python garbage collector কীভাবে কাজ করে?",
    "answer": "\n      <p>CPython মূলত reference counting-এর মাধ্যমে object cleanup করে।</p>\n      <p>যখন object-এর reference count zero হয়, object সাধারণত immediately deallocate হতে পারে।</p>\n      <h4>Problem হলো circular reference:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>A → B\n↑   ↓\n└───┘</code></pre>\n      </div>\n      <p>এখানে A এবং B একে অপরকে reference করলে external reference না থাকলেও reference count zero নাও হতে পারে।</p>\n      <p>Python-এর cyclic garbage collector unreachable reference cycle detect করে cleanup করতে পারে।</p>\n      <p>gc module ব্যবহার করে garbage collector inspect বা control করা যায়।</p>\n      <p>তবে production code-এ gc.disable() বা manual GC নিয়ে কাজ করার আগে profiling এবং বাস্তব কারণ জানা উচিত।</p>\n    "
  },
  {
    "id": "py-29",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "GIL",
      "Concurrency",
      "CPython",
      "Thread"
    ],
    "question": "GIL কী? কেন আছে এবং এর impact কী?",
    "answer": "\n      <p>GIL-এর পূর্ণরূপ Global Interpreter Lock।</p>\n      <p>CPython-এর একটি process-এর মধ্যে একই সময়ে একটি thread Python bytecode execute করতে পারে।</p>\n      <p>GIL-এর মূল impact CPU-bound Python code-এর ক্ষেত্রে দেখা যায়।</p>\n      <p><strong>CPU-bound:</strong></p>\n      <ul>\n        <li>Complex calculation</li>\n        <li>Image processing</li>\n        <li>CPU-heavy algorithms</li>\n      </ul>\n      <p>এক্ষেত্রে multiple threads দিয়ে linear CPU scaling পাওয়া কঠিন হতে পারে।</p>\n      <p><strong>কিন্তু I/O-bound:</strong></p>\n      <ul>\n        <li>Database</li>\n        <li>HTTP</li>\n        <li>File</li>\n        <li>Network</li>\n      </ul>\n      <p>কাজে thread এবং async খুব useful।</p>\n      <p>CPU-bound কাজের জন্য multiprocessing বা external worker ব্যবহার করা যেতে পারে।</p>\n      <h4>Interview-এ গুরুত্বপূর্ণ distinction:</h4>\n      <p>GIL মানে Python-এ concurrency নেই — এটি ভুল।</p>\n      <p>I/O concurrency সম্ভব।<br>CPU-bound parallelism-এর ক্ষেত্রে CPython GIL একটি limitation।</p>\n    "
  },
  {
    "id": "py-30",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Thread",
      "Process",
      "Async",
      "Concurrency"
    ],
    "question": "Thread vs Process vs Async কখন ব্যবহার করবেন?",
    "answer": "\n      <p><strong>Thread:</strong><br>একই process-এর মধ্যে multiple threads চলে এবং memory share করে।</p>\n      <p><strong>Best for:</strong></p>\n      <ul>\n        <li>Blocking I/O</li>\n        <li>Network I/O</li>\n        <li>File I/O</li>\n      </ul>\n      <p><strong>Process:</strong><br>প্রতিটি process-এর আলাদা memory space থাকে।</p>\n      <p><strong>Best for:</strong></p>\n      <ul>\n        <li>CPU-bound কাজ</li>\n        <li>Multiple CPU cores ব্যবহার</li>\n      </ul>\n      <p><strong>Async:</strong><br>Event loop ব্যবহার করে cooperative concurrency তৈরি করে।</p>\n      <p><strong>Best for:</strong></p>\n      <ul>\n        <li>High-concurrency I/O</li>\n        <li>API calls</li>\n        <li>Database I/O</li>\n        <li>Network I/O</li>\n      </ul>\n      <h4>Simple decision:</h4>\n      <p>CPU-bound<br>→ Multiprocessing / Worker</p>\n      <p>I/O-bound<br>→ AsyncIO</p>\n      <p>Blocking I/O<br>→ Threading বা compatible async wrapper</p>\n      <p>FastAPI application-এ asynchronous database এবং HTTP client ব্যবহার করলে async architecture-এর সুবিধা পাওয়া যায়।</p>\n    "
  },
  {
    "id": "py-31",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Coroutine",
      "AsyncIO",
      "Event Loop",
      "Await"
    ],
    "question": "Coroutine এবং Event Loop কীভাবে কাজ করে?",
    "answer": "\n      <p>Coroutine হলো async function-এর execution object যা await-এর মাধ্যমে pause/resume হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def fetch_user():\n    response = await client.get(\"/users\")\n    return response</code></pre>\n      </div>\n      <p>Event loop asynchronous task schedule এবং execute করে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Task A\n↓\nawait network I/O\n↓\nPause</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Task B\n↓\nexecute</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Task C\n↓\nexecute</code></pre>\n      </div>\n      <h4>Network response এলে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Task A\n↓\nResume</code></pre>\n      </div>\n      <p>এটি thread তৈরি না করেও অনেক I/O-bound task efficiently handle করতে পারে।</p>\n      <p>তবে async code-এর মধ্যে blocking operation ঢুকিয়ে দিলে event loop block হতে পারে।</p>\n    "
  },
  {
    "id": "py-32",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Async",
      "Blocking",
      "Event Loop",
      "Performance"
    ],
    "question": "Async code-এর মধ্যে blocking operation দিলে কী সমস্যা হয়?",
    "answer": "\n      <p>Async event loop cooperative concurrency ব্যবহার করে।</p>\n      <h4>যদি async endpoint-এর মধ্যে blocking operation করা হয়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def endpoint():\n    time.sleep(10)</code></pre>\n      </div>\n      <p>তাহলে event loop 10 seconds block হতে পারে।</p>\n      <p>এই সময়ে একই event loop-এর অন্য task affected হবে।</p>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>await asyncio.sleep(10)</code></pre>\n      </div>\n      <p>অথবা blocking কাজ হলে thread/process worker-এ offload করা যায়।</p>\n      <p>FastAPI performance-এর জন্য শুধু endpoint-কে async def করলেই হবে না। ভিতরের database client, HTTP client এবং অন্যান্য I/O operation-ও appropriate asynchronous হতে হবে।</p>\n    "
  },
  {
    "id": "py-33",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "Class Method",
      "Static Method",
      "Instance Method",
      "OOP"
    ],
    "question": "Instance method, classmethod এবং staticmethod-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Instance method প্রথম parameter হিসেবে self নেয় এবং object instance-এর data access করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class User:\n    def get_name(self):\n        ...</code></pre>\n      </div>\n      <p>classmethod প্রথম parameter হিসেবে cls নেয় এবং class-level data/behavior নিয়ে কাজ করতে পারে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@classmethod\ndef create(cls):\n    return cls()</code></pre>\n      </div>\n      <p>staticmethod self বা cls automatically নেয় না।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@staticmethod\ndef validate_email(email):\n    ...</code></pre>\n      </div>\n      <h4>সাধারণ rule:</h4>\n      <p>Instance method<br>→ object-specific behavior</p>\n      <p>classmethod<br>→ class-level behavior / alternative constructor</p>\n      <p>staticmethod<br>→ class-এর namespace-এর মধ্যে logically related utility function</p>\n    "
  },
  {
    "id": "py-34",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "Dataclass",
      "Pydantic",
      "Data Model"
    ],
    "question": "Dataclass এবং Pydantic model-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Dataclass Python-এর standard library-এর data container।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>@dataclass\nclass User:\n    id: int\n    name: str</code></pre>\n      </div>\n      <p>Pydantic model data validation এবং serialization-এর জন্য বিশেষভাবে শক্তিশালী।</p>\n      <h4>Pydantic:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class User(BaseModel):\n    id: int\n    name: str</code></pre>\n      </div>\n      <p>FastAPI request/response schema-এর জন্য Pydantic বেশি suitable।</p>\n      <p><strong>Dataclass:</strong></p>\n      <ul>\n        <li>Internal domain/data object-এর জন্য useful</li>\n      </ul>\n      <p><strong>Pydantic:</strong></p>\n      <ul>\n        <li>External input/output validation</li>\n        <li>API schema</li>\n        <li>Serialization</li>\n        <li>Parsing</li>\n      </ul>\n      <p>কোনটি ব্যবহার করবেন তা use case-এর উপর নির্ভর করবে।</p>\n    "
  },
  {
    "id": "py-35",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "SOLID",
      "OOP",
      "Clean Code",
      "Architecture"
    ],
    "question": "SOLID principles কী এবং Python project-এ কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>SOLID হলো পাঁচটি software design principle।</p>\n      <p>S — Single Responsibility:<br>একটি class/module-এর একটি primary responsibility।</p>\n      <p>O — Open/Closed:<br>Extension-এর জন্য open, modification-এর জন্য closed।</p>\n      <p>L — Liskov Substitution:<br>Child class parent-এর contract ভাঙবে না।</p>\n      <p>I — Interface Segregation:<br>বড় interface-এর বদলে ছোট focused abstraction।</p>\n      <p>D — Dependency Inversion:<br>High-level business logic concrete implementation-এর উপর নয়, abstraction-এর উপর depend করবে।</p>\n      <p><strong>Python project-এ SOLID ব্যবহার করলে:</strong></p>\n      <ul>\n        <li>Coupling কমে</li>\n        <li>Testing সহজ হয়</li>\n        <li>Mock করা সহজ হয়</li>\n        <li>Business logic আলাদা থাকে</li>\n        <li>Future change সহজ হয়</li>\n      </ul>\n      <p>তবে principle-এর জন্য অতিরিক্ত abstraction তৈরি করাও উচিত নয়। Simple code যেখানে যথেষ্ট, সেখানে unnecessary architecture avoid করা উচিত।</p>\n    "
  },
  {
    "id": "py-36",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Module",
      "Package",
      "Import",
      "Project Structure"
    ],
    "question": "Python module এবং package কী?",
    "answer": "\n      <p>Module হলো একটি Python file যা সাধারণত .py extension ব্যবহার করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>user.py</code></pre>\n      </div>\n      <p>Package হলো related Python modules-এর organized collection।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n    users/\n        service.py\n        repository.py\n        schemas.py</code></pre>\n      </div>\n      <h4>Import:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>from users.service import UserService</code></pre>\n      </div>\n      <p>Large application-এ modules এবং packages code organization এবং separation of concerns-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-37",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Virtual Environment",
      "venv",
      "Dependency"
    ],
    "question": "Virtual environment কেন ব্যবহার করবেন?",
    "answer": "\n      <p>প্রতিটি project-এর dependency আলাদা রাখার জন্য virtual environment ব্যবহার করা হয়।</p>\n      <h4>ধরা যাক:</h4>\n      <p>Project A<br>→ Django 4</p>\n      <p>Project B<br>→ Django 5</p>\n      <p>Global Python environment-এ conflict হতে পারে।</p>\n      <h4>Virtual environment:</h4>\n      <p>Project A<br>→ .venv-A</p>\n      <p>Project B<br>→ .venv-B</p>\n      <p>তাই প্রতিটি project নিজের dependency version maintain করতে পারে।</p>\n      <h4>Common approach:</h4>\n      <p>python -m venv .venv</p>\n      <p>তারপর environment activate করে dependencies install করা হয়।</p>\n    "
  },
  {
    "id": "py-38",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "pip",
      "requirements",
      "Dependency Management"
    ],
    "question": "pip এবং dependency management কী?",
    "answer": "\n      <p>pip হলো Python package installer।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>pip install fastapi</code></pre>\n      </div>\n      <p>Project dependencies সাধারণত version-controlled রাখা হয়।</p>\n      <h4>একটি common approach:</h4>\n      <p>requirements.txt</p>\n      <p>fastapi==...<br>sqlalchemy==...<br>pydantic==...</p>\n      <p>Production application-এ dependency version pin বা appropriately constrain করা গুরুত্বপূর্ণ, যাতে environment reproducible হয়।</p>\n      <p>Modern Python project-এ pyproject.toml এবং tools যেমন Poetry বা uv-ও dependency এবং project management-এর জন্য ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "py-39",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Type Hints",
      "Typing",
      "Static Type Checking"
    ],
    "question": "Python type hints কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Type hints variable, parameter এবং return value-এর expected type প্রকাশ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def add(a: int, b: int) -&gt; int:\n    return a + b</code></pre>\n      </div>\n      <p><strong>Type hints-এর সুবিধা:</strong></p>\n      <ul>\n        <li>IDE autocomplete</li>\n        <li>Static analysis</li>\n        <li>Better documentation</li>\n        <li>Refactoring</li>\n        <li>Code readability</li>\n        <li>FastAPI schema generation</li>\n      </ul>\n      <p>Python dynamically typed হওয়ায় type hint সবসময় runtime type enforcement করে না।</p>\n      <p>Static type checker যেমন mypy বা pyright code-এর type-related সমস্যা detect করতে পারে।</p>\n    "
  },
  {
    "id": "py-40",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "TypeVar",
      "Generic",
      "Typing",
      "Type Safety"
    ],
    "question": "Generic এবং TypeVar কী?",
    "answer": "\n      <p>Generic programming একই logic বিভিন্ন type-এর জন্য reusable করতে সাহায্য করে।</p>\n      <p>TypeVar একটি generic type variable।</p>\n      <h4>Concept:</h4>\n      <p>T = TypeVar(\"T\")</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def first(items: list[T]) -&gt; T:\n    return items[0]</code></pre>\n      </div>\n      <p>এখানে function integer list দিলে integer return type এবং string list দিলে string return type represent করতে পারে।</p>\n      <p>Generics বড় codebase-এ reusable repository, service এবং utility abstraction তৈরি করতে useful।</p>\n    "
  },
  {
    "id": "py-41",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "File",
      "IO",
      "Context Manager"
    ],
    "question": "Python-এ file handling কীভাবে করবেন?",
    "answer": "\n      <p>Python-এ open() ব্যবহার করে file access করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>with open(\"data.txt\", \"r\") as file:\n    data = file.read()</code></pre>\n      </div>\n      <h4>Common modes:</h4>\n      <p>r → read<br>w → write<br>a → append<br>b → binary<br>x → create</p>\n      <p>with ব্যবহার করলে file automatically close হয়।</p>\n      <p>Large file-এর ক্ষেত্রে পুরো file read না করে line-by-line বা generator-based processing করলে memory usage কমানো যায়।</p>\n    "
  },
  {
    "id": "py-42",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "JSON",
      "Serialization",
      "Deserialization",
      "API"
    ],
    "question": "JSON serialization এবং deserialization কী?",
    "answer": "\n      <p>Python object থেকে JSON-compatible representation তৈরি করাকে serialization বলা হয়।</p>\n      <p>JSON থেকে Python object তৈরি করাকে deserialization বলা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import json</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>data = {\n    \"name\": \"Nazmul\",\n    \"age\": 30\n}</code></pre>\n      </div>\n      <p>json_data = json.dumps(data)</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Python object\n↓\nJSON string</code></pre>\n      </div>\n      <h4>আবার:</h4>\n      <p>data = json.loads(json_data)</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>JSON string\n↓\nPython object</code></pre>\n      </div>\n      <p>API development-এ JSON serialization/deserialization খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-43",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Big O",
      "Data Structures"
    ],
    "question": "Python code performance কীভাবে analyze করবেন?",
    "answer": "\n      <p>Performance optimize করার আগে bottleneck identify করা উচিত।</p>\n      <h4>প্রথমে measure করতে হবে:</h4>\n      <ol>\n        <li>CPU usage</li>\n        <li>Memory usage</li>\n        <li>Database latency</li>\n        <li>Network latency</li>\n        <li>Function execution time</li>\n        <li>Number of queries</li>\n      </ol>\n      <p>Big-O complexity বোঝাও গুরুত্বপূর্ণ।</p>\n      <h4>উদাহরণ:</h4>\n      <p><strong>List membership:</strong><br>x in list<br>→ সাধারণত O(n)</p>\n      <p><strong>Set membership:</strong><br>x in set<br>→ average O(1)</p>\n      <p><strong>Dictionary lookup:</strong><br>dict[key]<br>→ average O(1)</p>\n      <p>Performance optimization-এর আগে profiling করা উচিত। Blind optimization avoid করা ভালো।</p>\n    "
  },
  {
    "id": "py-44",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Profiling",
      "Performance",
      "cProfile",
      "Optimization"
    ],
    "question": "Python application profile কীভাবে করবেন?",
    "answer": "\n      <p>Performance bottleneck identify করার জন্য profiling করা হয়।</p>\n      <h4>Common tools:</h4>\n      <p>cProfile<br>→ Function-level profiling</p>\n      <p>timeit<br>→ ছোট code-এর execution time compare</p>\n      <p>tracemalloc<br>→ Memory allocation analysis</p>\n      <p><strong>Application-level metrics:</strong></p>\n      <ul>\n        <li>Request latency</li>\n        <li>Throughput</li>\n        <li>CPU</li>\n        <li>Memory</li>\n        <li>Database query time</li>\n      </ul>\n      <p>Production system-এ observability এবং profiling data ব্যবহার করে bottleneck identify করে তারপর optimization করা উচিত।</p>\n    "
  },
  {
    "id": "py-45",
    "category": "Python",
    "difficulty": "Intermediate",
    "tags": [
      "Testing",
      "Pytest",
      "Unit Test"
    ],
    "question": "Python testing কী? Unit test কী?",
    "answer": "\n      <p>Testing application-এর behavior expected অনুযায়ী কাজ করছে কিনা verify করার process।</p>\n      <p>Unit test একটি ছোট unit যেমন function বা class-এর behavior test করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def add(a, b):\n    return a + b</code></pre>\n      </div>\n      <h4>Test:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def test_add():\n    assert add(2, 3) == 5</code></pre>\n      </div>\n      <p>Python ecosystem-এ pytest খুব জনপ্রিয়।</p>\n      <h4>Testing-এর স্তর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Unit Test\n↓\nIntegration Test\n↓\nAPI Test\n↓\nE2E Test</code></pre>\n      </div>\n      <p>Unit test fast এবং isolated হওয়া উচিত।</p>\n    "
  },
  {
    "id": "py-46",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Mock",
      "Mocking",
      "Unit Test",
      "Testing"
    ],
    "question": "Mocking কী এবং কেন ব্যবহার করবেন?",
    "answer": "\n      <p>কোনো external dependency-এর real implementation-এর বদলে test-এর সময় fake বা controlled implementation ব্যবহার করাকে mocking বলা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service\n↓\nPayment API</code></pre>\n      </div>\n      <p>Unit test-এ real payment API call করা উচিত নয়।</p>\n      <h4>তাই:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service\n↓\nMock Payment Client</code></pre>\n      </div>\n      <p>ব্যবহার করা যায়।</p>\n      <p><strong>Mocking useful:</strong></p>\n      <ul>\n        <li>External API</li>\n        <li>Database</li>\n        <li>Message broker</li>\n        <li>File system</li>\n        <li>Time-dependent code</li>\n      </ul>\n      <p>তবে excessive mocking করলে test বাস্তব behavior থেকে দূরে চলে যেতে পারে।</p>\n    "
  },
  {
    "id": "py-47",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Clean Code",
      "Separation of Concerns",
      "Architecture"
    ],
    "question": "Python application-এ clean architecture কীভাবে maintain করবেন?",
    "answer": "\n      <p>Large Python application-এ business logic এবং infrastructure আলাদা রাখা ভালো।</p>\n      <h4>একটি possible structure:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n    api/\n    services/\n    repositories/\n    models/\n    schemas/\n    domain/\n    infrastructure/\n    config/</code></pre>\n      </div>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API\n↓\nService\n↓\nRepository\n↓\nDatabase</code></pre>\n      </div>\n      <p><strong>API layer:</strong><br>HTTP-related কাজ</p>\n      <p><strong>Service:</strong><br>Business logic</p>\n      <p><strong>Repository:</strong><br>Data access</p>\n      <p><strong>Domain:</strong><br>Core business rules</p>\n      <p><strong>Infrastructure:</strong><br>Database, Redis, external services ইত্যাদি</p>\n      <p>এতে business logic framework বা database implementation-এর সাথে অতিরিক্ত tightly coupled হয় না।</p>\n    "
  },
  {
    "id": "py-48",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Dependency Inversion",
      "Repository Pattern",
      "Clean Architecture"
    ],
    "question": "Repository Pattern কী এবং Python-এ কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Repository Pattern database access এবং business logic আলাদা করে।</p>\n      <h4>Without repository:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service\n↓\nSQL Query\n↓\nDatabase</code></pre>\n      </div>\n      <h4>Repository pattern:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Service\n↓\nUserRepository\n↓\nDatabase</code></pre>\n      </div>\n      <p>Service database query details না জেনেও কাজ করতে পারে।</p>\n      <p><strong>Advantages:</strong></p>\n      <ul>\n        <li>Separation of concerns</li>\n        <li>Testability</li>\n        <li>Database abstraction</li>\n        <li>Maintainability</li>\n      </ul>\n      <p>তবে খুব ছোট application-এ unnecessary repository abstraction তৈরি করলে complexity বাড়তে পারে।</p>\n    "
  },
  {
    "id": "py-49",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "LEGB",
      "Scope",
      "Variable",
      "Namespace"
    ],
    "question": "Python LEGB rule কী?",
    "answer": "\n      <p>Python variable lookup-এর ক্ষেত্রে LEGB rule অনুসরণ করে।</p>\n      <p>L = Local<br>E = Enclosing<br>G = Global<br>B = Built-in</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>x = \"global\"</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def outer():\n    x = \"enclosing\"</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def inner():\n        x = \"local\"\n        print(x)</code></pre>\n      </div>\n      <p>inner()</p>\n      <p>Python প্রথমে Local scope-এ খুঁজবে।<br>না পেলে Enclosing।<br>না পেলে Global।<br>না পেলে Built-in।</p>\n      <p>global এবং nonlocal keyword দিয়ে specific scope-এর variable modify করা যায়।</p>\n    "
  },
  {
    "id": "py-50",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "Closure",
      "Decorator",
      "Function",
      "Scope"
    ],
    "question": "Closure কী?",
    "answer": "\n      <p>Closure হলো এমন function যা নিজের বাইরের enclosing scope-এর variable মনে রাখতে পারে, এমনকি outer function execution শেষ হওয়ার পরেও।</p>\n      <h4>Example:</h4>\n      <h4>def multiplier(x):</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def multiply(y):\n        return x * y</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return multiply</code></pre>\n      </div>\n      <p>double = multiplier(2)</p>\n      <p>double(5)<br>→ 10</p>\n      <p>এখানে multiply function x-এর value মনে রাখে।</p>\n      <p>Closure decorator, factory function এবং functional programming-এর ক্ষেত্রে useful।</p>\n    "
  },
  {
    "id": "py-51",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "Decorator",
      "Closure",
      "Function"
    ],
    "question": "Decorator এবং Closure-এর মধ্যে সম্পর্ক কী?",
    "answer": "\n      <p>Decorator সাধারণত closure-এর concept ব্যবহার করে।</p>\n      <p>Decorator একটি function গ্রহণ করে এবং একটি নতুন wrapper function return করে।</p>\n      <p>Wrapper function বাইরের function-এর reference মনে রাখতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Decorator\n↓\nOuter function\n↓\nWrapper function\n↓\nOriginal function reference</code></pre>\n      </div>\n      <p>তাই decorator implement করার সময় closure এবং first-class function-এর ধারণা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-52",
    "category": "Python",
    "difficulty": "Advanced",
    "tags": [
      "First Class Function",
      "Higher Order Function",
      "Functional Programming"
    ],
    "question": "Python-এ First-Class Function কী?",
    "answer": "\n      <p>Python-এ function একটি object হিসেবে treat করা যায়।</p>\n      <p><strong>Function:</strong></p>\n      <ul>\n        <li>Variable-এ assign করা যায়</li>\n        <li>অন্য function-এ argument হিসেবে পাঠানো যায়</li>\n        <li>Function থেকে return করা যায়</li>\n        <li>Collection-এ রাখা যায়</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def greet():\n    return \"Hello\"</code></pre>\n      </div>\n      <p>func = greet</p>\n      <p>print(func())</p>\n      <p>এটি decorator, callback, functional programming এবং event-driven code বোঝার জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-53",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Concurrency",
      "Race Condition",
      "Thread Safety",
      "Lock"
    ],
    "question": "Race condition কী? Python-এ কীভাবে prevent করবেন?",
    "answer": "\n      <p>যখন একাধিক thread/process একই shared resource একই সময়ে access বা modify করে এবং execution order-এর কারণে unexpected result তৈরি হয়, তখন race condition হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Thread A → read balance\nThread B → read balance\nThread A → update\nThread B → update</code></pre>\n      </div>\n      <p>ফলে expected result নাও পাওয়া যেতে পারে।</p>\n      <p><strong>Solutions:</strong></p>\n      <ul>\n        <li>Lock</li>\n        <li>RLock</li>\n        <li>Queue</li>\n        <li>Atomic operation</li>\n        <li>Database transaction</li>\n        <li>Proper synchronization</li>\n      </ul>\n      <p>Database application-এ শুধু Python lock যথেষ্ট নয়; distributed environment হলে database-level locking, transaction বা distributed coordination প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "py-54",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Thread Safety",
      "Lock",
      "Concurrency",
      "Synchronization"
    ],
    "question": "Lock কী? Lock এবং RLock-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Lock shared resource-এর concurrent access synchronize করতে ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>lock.acquire()</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>try:\n    shared_resource_update()\nfinally:\n    lock.release()</code></pre>\n      </div>\n      <p>RLock হলো re-entrant lock। একই thread একাধিকবার একই RLock acquire করতে পারে এবং appropriate সংখ্যক release করতে হয়।</p>\n      <p>সাধারণ Lock recursive বা nested acquisition-এর ক্ষেত্রে deadlock তৈরি করতে পারে।</p>\n      <p>Thread synchronization-এর সময় lock ব্যবহার করলেও lock contention এবং deadlock-এর possibility consider করতে হয়।</p>\n    "
  },
  {
    "id": "py-55",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Deadlock",
      "Concurrency",
      "Thread"
    ],
    "question": "Deadlock কী এবং কীভাবে prevent করবেন?",
    "answer": "\n      <p>Deadlock হলো এমন অবস্থা যেখানে দুই বা তার বেশি thread/process একে অপরের resource release করার জন্য অপেক্ষা করতে থাকে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Thread A\n→ Lock 1 ধরে\n→ Lock 2 চায়</code></pre>\n      </div>\n      <p>Thread B<br>→ Lock 2 ধরে<br>→ Lock 1 চায়</p>\n      <p>দুইজনই অপেক্ষা করবে।</p>\n      <p><strong>Prevention:</strong><br>1. Consistent lock ordering<br>2. Lock timeout<br>3. Lock scope ছোট রাখা<br>4. Nested lock কমানো<br>5. Proper resource ownership</p>\n      <p>Database transaction-এর ক্ষেত্রেও deadlock হতে পারে, তাই transaction ordering এবং appropriate locking strategy গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "py-56",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Multiprocessing",
      "IPC",
      "CPU Bound",
      "Parallelism"
    ],
    "question": "Multiprocessing কী এবং কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Multiprocessing একাধিক OS process ব্যবহার করে কাজ execute করে।</p>\n      <p>প্রতিটি process-এর আলাদা memory space থাকে।</p>\n      <p>CPU-bound workload-এর ক্ষেত্রে এটি useful কারণ আলাদা process আলাদা CPU core ব্যবহার করতে পারে।</p>\n      <p><strong>Examples:</strong></p>\n      <ul>\n        <li>Image processing</li>\n        <li>Large calculations</li>\n        <li>CPU-heavy data processing</li>\n      </ul>\n      <h4>Architecture:</h4>\n      <p>Main Process<br>├── Worker Process 1<br>├── Worker Process 2<br>└── Worker Process 3</p>\n      <p>Process-এর মধ্যে data share করা thread-এর মতো simple নয়। IPC, Queue, Pipe বা shared memory mechanism প্রয়োজন হতে পারে।</p>\n      <p>Web request-এর heavy CPU processing-এর জন্য external worker system যেমন Celery/RQ অথবা dedicated service ব্যবহার করাও ভালো architecture হতে পারে।</p>\n    "
  },
  {
    "id": "py-57",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "AsyncIO",
      "Task",
      "Gather",
      "Concurrency"
    ],
    "question": "asyncio.gather কী?",
    "answer": "\n      <p>asyncio.gather একাধিক coroutine concurrently execute করে এবং তাদের result collect করতে পারে।</p>\n      <h4>Concept:</h4>\n      <p>Task A ──┐<br>Task B ──┼── Event Loop<br>Task C ──┘</p>\n      <p>সবগুলো I/O-bound independent কাজ হলে একটির পর একটি অপেক্ষা করার পরিবর্তে concurrent execution করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>results = await asyncio.gather(\n    fetch_user(),\n    fetch_orders(),\n    fetch_notifications()\n)</code></pre>\n      </div>\n      <p>এটি useful যখন operations একে অপরের উপর depend করে না।</p>\n      <p>তবে একই database connection বা non-thread-safe resource concurrentভাবে ব্যবহার করার আগে resource-এর concurrency support নিশ্চিত করতে হবে।</p>\n    "
  },
  {
    "id": "py-58",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "AsyncIO",
      "Timeout",
      "Cancellation",
      "Resilience"
    ],
    "question": "Async operation-এ timeout এবং cancellation কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>External service বা database indefinitely response না দিলে application resource আটকে যেতে পারে।</p>\n      <p>তাই async operation-এ timeout রাখা উচিত।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n↓\nExternal API\n↓\nTimeout\n↓\nCancel operation\n↓\nFallback / Retry / Error</code></pre>\n      </div>\n      <p><strong>Timeout-এর সুবিধা:</strong></p>\n      <ul>\n        <li>Worker আটকে থাকা কমায়</li>\n        <li>Connection resource release হয়</li>\n        <li>Cascading failure কমাতে সাহায্য করে</li>\n      </ul>\n      <p>Distributed application-এ timeout খুব গুরুত্বপূর্ণ resilience mechanism। শুধু retry রাখলে হবে না; retry-এর সাথে timeout এবং retry limit থাকা উচিত।</p>\n    "
  },
  {
    "id": "py-59",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Logging",
      "Observability",
      "Production"
    ],
    "question": "Python production application-এ logging কীভাবে করবেন?",
    "answer": "\n      <p>Production application-এ print() ব্যবহার না করে Python logging framework ব্যবহার করা উচিত।</p>\n      <h4>Important levels:</h4>\n      <p>DEBUG<br>INFO<br>WARNING<br>ERROR<br>CRITICAL</p>\n      <p><strong>Production log-এ সাধারণত:</strong></p>\n      <ul>\n        <li>Timestamp</li>\n        <li>Log level</li>\n        <li>Service name</li>\n        <li>Request ID</li>\n        <li>Trace ID</li>\n        <li>User/request context</li>\n        <li>Error information</li>\n      </ul>\n      <p>রাখা যায়।</p>\n      <p>Microservice architecture-এ centralized logging এবং structured JSON logs ব্যবহার করলে log search এবং correlation সহজ হয়।</p>\n      <p>Sensitive data যেমন password, access token বা secret log করা উচিত নয়।</p>\n    "
  },
  {
    "id": "py-60",
    "category": "Python",
    "difficulty": "Senior",
    "tags": [
      "Senior",
      "Architecture",
      "Performance",
      "Security",
      "Testing"
    ],
    "question": "একজন Senior Python Developer হিসেবে production Python application design করার সময় কোন বিষয়গুলো consider করবেন?",
    "answer": "\n      <p>আমি শুধু code কাজ করছে কিনা তা দেখব না; পুরো production lifecycle consider করব।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>1. Code quality\n   → Clean code\n   → SOLID যেখানে প্রয়োজন\n   → Separation of concerns</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>2. Performance\n   → Algorithm complexity\n   → Database queries\n   → Caching\n   → Async I/O\n   → Profiling</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>3. Concurrency\n   → Async\n   → Thread\n   → Process\n   → Race condition\n   → Deadlock</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>4. Database\n   → Connection pooling\n   → Transaction\n   → Index\n   → Query optimization</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>5. Security\n   → Input validation\n   → Authentication\n   → Authorization\n   → Secret management\n   → Secure dependency management</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>6. Reliability\n   → Timeout\n   → Retry\n   → Idempotency\n   → Error handling</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>7. Testing\n   → Unit\n   → Integration\n   → API\n   → E2E</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>8. Observability\n   → Logs\n   → Metrics\n   → Tracing</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>9. Deployment\n   → Docker\n   → CI/CD\n   → Environment configuration\n   → Health checks</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>10. Maintainability\n   → Type hints\n   → Documentation\n   → Consistent project structure\n   → Code review</code></pre>\n      </div>\n      <p>Senior developer হিসেবে আমার লক্ষ্য শুধু feature implement করা নয়; system-কে maintainable, testable, observable, secure এবং scalable রাখা।</p>\n    "
  }
];
