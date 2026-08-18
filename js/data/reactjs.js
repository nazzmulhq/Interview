const reactJsInterviewQuestions = [
  {
    "id": "react-1",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Basics",
      "React"
    ],
    "question": "React.js কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>React.js হলো JavaScript-এর একটি UI library, যা component-based user interface তৈরি করতে ব্যবহৃত হয়।</p>\n      <h4>React-এর মূল ধারণা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Component\n↓\nProps\n↓\nState\n↓\nEvent\n↓\nRe-render\n↓\nUpdated UI</code></pre>\n      </div>\n      <h4>React-এর প্রধান সুবিধা:</h4>\n      <ul>\n        <li>Component-based architecture</li>\n        <li>Declarative UI</li>\n        <li>Reusable components</li>\n        <li>Efficient rendering</li>\n        <li>Strong ecosystem</li>\n        <li>Large community</li>\n        <li>Server-side rendering এবং Server Components support</li>\n        <li>Modern frontend architecture-এর সাথে সহজ integration</li>\n      </ul>\n      <p>React নিজে সম্পূর্ণ application framework নয়। Routing, data fetching, authentication ইত্যাদির জন্য অতিরিক্ত tools/framework ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "react-2",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Declarative",
      "Imperative"
    ],
    "question": "Declarative এবং Imperative programming-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Imperative approach-এ কীভাবে UI পরিবর্তন করতে হবে তা manually বলা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>document.getElementById(\"count\").innerText = count;</code></pre>\n      </div>\n      <h4>Declarative React approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;div&gt;{count}&lt;/div&gt;;</code></pre>\n      </div>\n      <h4>React-কে বলা হয়:</h4>\n      <p>\"UI state অনুযায়ী এমন হবে\"</p>\n      <p>React rendering system প্রয়োজনীয় DOM update determine করে।</p>\n      <p>Declarative programming-এর ফলে UI logic সাধারণত বেশি predictable এবং maintainable হয়।</p>\n    "
  },
  {
    "id": "react-3",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Component"
    ],
    "question": "React component কী?",
    "answer": "\n      <p>Component হলো UI-এর reusable building block।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function UserCard({ user }) {\n  return (\n    &lt;div&gt;\n      &lt;h2&gt;{user.name}&lt;/h2&gt;\n      &lt;p&gt;{user.email}&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}</code></pre>\n      </div>\n      <h4>Component হতে পারে:</h4>\n      <ul>\n        <li>Presentational</li>\n        <li>Container</li>\n        <li>Form</li>\n        <li>Layout</li>\n        <li>Feature component</li>\n        <li>Page component</li>\n      </ul>\n      <p>Large application-এ component-কে business responsibility এবং UI responsibility অনুযায়ী organize করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "react-4",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "JSX"
    ],
    "question": "JSX কী?",
    "answer": "\n      <p>JSX হলো JavaScript-এর একটি syntax extension, যা JavaScript-এর মধ্যে HTML-এর মতো syntax ব্যবহার করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const element = (\n  &lt;div&gt;\n    &lt;h1&gt;Hello&lt;/h1&gt;\n  &lt;/div&gt;\n);</code></pre>\n      </div>\n      <p>JSX সরাসরি browser বুঝে না।</p>\n      <p>Build process JSX-কে JavaScript function calls-এ transform করে।</p>\n      <h4>JSX-এর সুবিধা:</h4>\n      <ul>\n        <li>UI structure readable</li>\n        <li>JavaScript expression ব্যবহার করা যায়</li>\n        <li>Component composition সহজ</li>\n        <li>Conditional rendering সহজ</li>\n      </ul>\n    "
  },
  {
    "id": "react-5",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "JSX",
      "Expression"
    ],
    "question": "JSX-এর মধ্যে JavaScript কীভাবে ব্যবহার করবেন?",
    "answer": "\n      <p>Curly braces {} ব্যবহার করে JavaScript expression ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const name = \"Nazmul\";</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;h1&gt;Hello {name}&lt;/h1&gt;;</code></pre>\n      </div>\n      <h4>Expression হিসেবে ব্যবহার করা যায়:</h4>\n      <ul>\n        <li>Variable</li>\n        <li>Function result</li>\n        <li>Ternary</li>\n        <li>Arithmetic</li>\n        <li>Array methods</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>{isLoading ? &lt;Spinner /&gt; : &lt;Content /&gt;}</code></pre>\n      </div>\n      <p>Statement যেমন if/for সরাসরি JSX expression-এর মধ্যে লেখা যায় না; সাধারণত বাইরে logic তৈরি করা হয়।</p>\n    "
  },
  {
    "id": "react-6",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Props"
    ],
    "question": "Props কী?",
    "answer": "\n      <p>Props হলো parent component থেকে child component-এ data পাঠানোর mechanism।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;UserCard\n  name=\"Nazmul\"\n  age={30}\n/&gt;</code></pre>\n      </div>\n      <h4>Child:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function UserCard({ name, age }) {\n  return &lt;h2&gt;{name} - {age}&lt;/h2&gt;;\n}</code></pre>\n      </div>\n      <h4>Props:</h4>\n      <ul>\n        <li>Read-only</li>\n        <li>Parent → Child data flow</li>\n        <li>Component configurable করে</li>\n        <li>Reusability বাড়ায়</li>\n      </ul>\n      <p>Child সাধারণত props directly mutate করবে না।</p>\n    "
  },
  {
    "id": "react-7",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "State"
    ],
    "question": "React state কী?",
    "answer": "\n      <p>State হলো component-এর internal data যা পরিবর্তন হলে component re-render হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [count, setCount] = useState(0);</code></pre>\n      </div>\n      <p>setCount(10);</p>\n      <h4>State ব্যবহার করা হয়:</h4>\n      <ul>\n        <li>Form input</li>\n        <li>Modal open/close</li>\n        <li>Selected item</li>\n        <li>Loading state</li>\n        <li>Counter</li>\n        <li>UI preferences</li>\n      </ul>\n      <p>Props external input, আর state component-এর managed data।</p>\n    "
  },
  {
    "id": "react-8",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Props",
      "State"
    ],
    "question": "Props এবং State-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Props:</h4>\n      <ul>\n        <li>Parent থেকে আসে</li>\n        <li>Child-এর জন্য read-only</li>\n        <li>Component configure করে</li>\n      </ul>\n      <h4>State:</h4>\n      <ul>\n        <li>Component নিজে manage করে</li>\n        <li>State setter দিয়ে update হয়</li>\n        <li>Update হলে re-render হতে পারে</li>\n      </ul>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Props:\nParent\n ↓\nChild</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>State:\nComponent\n ↓\nsetState\n ↓\nRe-render</code></pre>\n      </div>\n    "
  },
  {
    "id": "react-9",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Events"
    ],
    "question": "React event handling কীভাবে কাজ করে?",
    "answer": "\n      <p>React event handler function-এর মাধ্যমে event handle করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function Button() {\n  const handleClick = () =&gt; {\n    console.log(\"Clicked\");\n  };</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;button onClick={handleClick}&gt;Click&lt;/button&gt;;\n}</code></pre>\n      </div>\n      <h4>Common events:</h4>\n      <ul>\n        <li>onClick</li>\n        <li>onChange</li>\n        <li>onSubmit</li>\n        <li>onFocus</li>\n        <li>onBlur</li>\n        <li>onKeyDown</li>\n      </ul>\n      <p>Event handler reference দিতে হয়; function call সরাসরি render-এর সময় করা উচিত নয়।</p>\n      <h4>Correct:</h4>\n      <p>onClick={handleClick}</p>\n      <h4>Incorrect:</h4>\n      <p>onClick={handleClick()}</p>\n    "
  },
  {
    "id": "react-10",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Conditional Rendering"
    ],
    "question": "React-এ conditional rendering কীভাবে করবেন?",
    "answer": "\n      <h4>Common techniques:</h4>\n      <ol>\n        <li>Ternary</li>\n      </ol>\n      <p>{isLoading ? &lt;Spinner /&gt; : &lt;Data /&gt;}</p>\n      <ol>\n        <li>&amp;&amp;</li>\n      </ol>\n      <p>{isAdmin &amp;&amp; &lt;AdminPanel /&gt;}</p>\n      <ol>\n        <li>Early return</li>\n      </ol>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (loading) {\n  return &lt;Spinner /&gt;;\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;Dashboard /&gt;;</code></pre>\n      </div>\n      <p>Complex condition হলে render logic আলাদা function/component-এ নেওয়া ভালো।</p>\n    "
  },
  {
    "id": "react-11",
    "category": "React.js",
    "difficulty": "Beginner",
    "tags": [
      "Lists",
      "Keys"
    ],
    "question": "React list rendering-এ key কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>List item-এর stable identity বোঝাতে key ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users.map(user =&gt; (\n  &lt;UserCard\n    key={user.id}\n    user={user}\n  /&gt;\n));</code></pre>\n      </div>\n      <h4>Key-এর মাধ্যমে React বুঝতে পারে:</h4>\n      <ul>\n        <li>কোন item নতুন</li>\n        <li>কোন item removed</li>\n        <li>কোন item moved</li>\n        <li>কোন item update হয়েছে</li>\n      </ul>\n      <p>Stable unique ID সবচেয়ে ভালো key।</p>\n      <p>Index key হিসেবে ব্যবহার করা risky হতে পারে যখন list reorder/insert/delete হয়।</p>\n    "
  },
  {
    "id": "react-12",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Virtual DOM"
    ],
    "question": "Virtual DOM কী?",
    "answer": "\n      <p>Virtual DOM হলো UI-এর একটি in-memory representation।</p>\n      <h4>Conceptual flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>State change\n ↓\nReact render\n ↓\nNew UI representation\n ↓\nPrevious representation-এর সাথে comparison\n ↓\nRequired DOM updates\n ↓\nBrowser DOM</code></pre>\n      </div>\n      <p>এটি React-এর rendering architecture-এর একটি অংশ।</p>\n      <p>Virtual DOM মানেই প্রতিবার পুরো DOM recreate করা নয়। React প্রয়োজনীয় update determine করে।</p>\n    "
  },
  {
    "id": "react-13",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Reconciliation"
    ],
    "question": "React reconciliation কী?",
    "answer": "\n      <p>Reconciliation হলো previous render এবং new render-এর UI tree compare করে কী update প্রয়োজন তা determine করার process।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Old:\n&lt;User id=\"1\" /&gt;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>New:\n&lt;User id=\"2\" /&gt;</code></pre>\n      </div>\n      <p>React identity এবং tree structure analyse করে update process চালায়।</p>\n      <p>Key এবং component type reconciliation-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "react-14",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Rendering"
    ],
    "question": "React component কখন re-render করে?",
    "answer": "\n      <h4>সাধারণ কারণ:</h4>\n      <ol>\n        <li>State update</li>\n        <li>Parent re-render</li>\n        <li>Context value change</li>\n        <li>Hook-related state update</li>\n        <li>External store update</li>\n      </ol>\n      <p>Re-render মানে DOM-এর প্রতিটি node update হওয়া নয়।</p>\n      <p>React নতুন render output তৈরি করে এবং প্রয়োজনীয় DOM changes apply করে।</p>\n      <p>Performance optimization-এর আগে actual unnecessary render identify করা উচিত।</p>\n    "
  },
  {
    "id": "react-15",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "State",
      "Batching"
    ],
    "question": "React state batching কী?",
    "answer": "\n      <p>React অনেক state update একসাথে process করে একটি render-এ combine করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setCount(c =&gt; c + 1);\nsetCount(c =&gt; c + 1);\nsetCount(c =&gt; c + 1);</code></pre>\n      </div>\n      <p>Functional updater ব্যবহার করলে প্রত্যেক update previous state-এর উপর correctly apply হয়।</p>\n      <p>Batching-এর ফলে unnecessary multiple render কমে এবং performance improve হতে পারে।</p>\n    "
  },
  {
    "id": "react-16",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useState"
    ],
    "question": "useState কী?",
    "answer": "\n      <p>useState functional component-এ local state রাখার জন্য ব্যবহৃত Hook।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [count, setCount] = useState(0);</code></pre>\n      </div>\n      <h4>State update:</h4>\n      <p>setCount(10);</p>\n      <h4>Previous state-এর উপর নির্ভর করলে:</h4>\n      <p>setCount(prev =&gt; prev + 1);</p>\n      <p>Functional update asynchronous/batched state updates-এর ক্ষেত্রে safer pattern।</p>\n    "
  },
  {
    "id": "react-17",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useEffect"
    ],
    "question": "useEffect কী এবং কখন ব্যবহার করবেন?",
    "answer": "\n      <p>useEffect component-এর external systems-এর সাথে synchronization-এর জন্য ব্যবহৃত হয়।</p>\n      <h4>Examples:</h4>\n      <ul>\n        <li>API subscription</li>\n        <li>Browser event listener</li>\n        <li>Timer</li>\n        <li>WebSocket connection</li>\n        <li>Third-party library integration</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>useEffect(() =&gt; {\n  const connection = connect();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return () =&gt; {\n    connection.disconnect();\n  };\n}, []);</code></pre>\n      </div>\n      <p>Effect-এর cleanup function resource cleanup করার জন্য গুরুত্বপূর্ণ।</p>\n      <p>সব business calculation-এর জন্য useEffect ব্যবহার করা উচিত নয়।</p>\n    "
  },
  {
    "id": "react-18",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useEffect",
      "Dependency"
    ],
    "question": "useEffect dependency array কী করে?",
    "answer": "\n      <p>Dependency array effect কখন re-run করবে তা control করতে সাহায্য করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>useEffect(() =&gt; {\n  fetchUser(userId);\n}, [userId]);</code></pre>\n      </div>\n      <p>userId change হলে effect আবার execute হবে।</p>\n      <h4>Dependency:</h4>\n      <p>[] → initial mount-এর পরে effect setup করার common pattern</p>\n      <p>[userId] → userId পরিবর্তন হলে re-run</p>\n      <p>Dependencies সঠিকভাবে declare করা গুরুত্বপূর্ণ।</p>\n      <p>Missing dependency stale value তৈরি করতে পারে।</p>\n    "
  },
  {
    "id": "react-19",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useEffect",
      "Cleanup"
    ],
    "question": "useEffect cleanup function কেন প্রয়োজন?",
    "answer": "\n      <p>Cleanup function previous effect-এর resource cleanup করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>useEffect(() =&gt; {\n  const handler = () =&gt; {};</code></pre>\n      </div>\n      <p>window.addEventListener(\"resize\", handler);</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return () =&gt; {\n    window.removeEventListener(\"resize\", handler);\n  };\n}, []);</code></pre>\n      </div>\n      <h4>Cleanup দরকার:</h4>\n      <ul>\n        <li>Event listener</li>\n        <li>Timer</li>\n        <li>Subscription</li>\n        <li>WebSocket</li>\n        <li>External resource</li>\n      </ul>\n      <p>Cleanup না করলে memory leak বা duplicate subscription হতে পারে।</p>\n    "
  },
  {
    "id": "react-20",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useEffect",
      "Race Condition"
    ],
    "question": "React data fetching-এ race condition কীভাবে হয়?",
    "answer": "\n      <h4>ধরা যাক user দ্রুত:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User A\n ↓\nRequest A</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User B\n ↓\nRequest B</code></pre>\n      </div>\n      <p>যদি Request A পরে complete হয়, পুরনো data নতুন data overwrite করতে পারে।</p>\n      <h4>Solution:</h4>\n      <ul>\n        <li>AbortController</li>\n        <li>Request cancellation</li>\n        <li>Request ID tracking</li>\n        <li>Data-fetching library</li>\n      </ul>\n      <p>Modern applications-এ TanStack Query-এর মতো library server-state lifecycle সহজ করতে পারে।</p>\n    "
  },
  {
    "id": "react-21",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useRef"
    ],
    "question": "useRef কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>useRef এমন mutable value রাখতে পারে যা পরিবর্তন হলেও সাধারণত component re-render trigger করে না।</p>\n      <h4>Common uses:</h4>\n      <ol>\n        <li>DOM reference</li>\n        <li>Previous value</li>\n        <li>Timer ID</li>\n        <li>Mutable instance value</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const inputRef = useRef(null);</code></pre>\n      </div>\n      <p>inputRef.current.focus();</p>\n      <h4>useRef-এর value:</h4>\n      <p>ref.current</p>\n      <p>State এবং ref-এর মূল পার্থক্য হলো state UI rendering-এর সাথে যুক্ত, ref সাধারণত rendering trigger করে না।</p>\n    "
  },
  {
    "id": "react-22",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useMemo",
      "Performance"
    ],
    "question": "useMemo কী?",
    "answer": "\n      <p>useMemo expensive calculation-এর result memoize করতে ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const total = useMemo(() =&gt; {\n  return calculateTotal(items);\n}, [items]);</code></pre>\n      </div>\n      <p>items পরিবর্তন না হলে cached result reuse করা যেতে পারে।</p>\n      <p>useMemo সব জায়গায় ব্যবহার করা উচিত নয়।</p>\n      <h4>অতিরিক্ত memoization:</h4>\n      <ul>\n        <li>Code complex করে</li>\n        <li>Memory cost বাড়াতে পারে</li>\n        <li>Performance benefit নাও দিতে পারে</li>\n      </ul>\n      <p>Actual bottleneck থাকলে ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "react-23",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useCallback",
      "Performance"
    ],
    "question": "useCallback কী?",
    "answer": "\n      <p>useCallback function reference memoize করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const handleClick = useCallback(() =&gt; {\n  saveUser(id);\n}, [id]);</code></pre>\n      </div>\n      <h4>এটি বিশেষভাবে useful হতে পারে যখন:</h4>\n      <ul>\n        <li>Function child component-এর prop</li>\n        <li>Child React.memo ব্যবহার করে</li>\n        <li>Function identity-এর কারণে unnecessary render হচ্ছে</li>\n      </ul>\n      <p>শুধু \"সব function-এ useCallback\" করা best practice নয়।</p>\n    "
  },
  {
    "id": "react-24",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "React.memo",
      "Performance"
    ],
    "question": "React.memo কী?",
    "answer": "\n      <p>React.memo component-এর props unchanged থাকলে unnecessary re-render skip করতে সাহায্য করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const UserCard = React.memo(function UserCard({ user }) {\n  return &lt;div&gt;{user.name}&lt;/div&gt;;\n});</code></pre>\n      </div>\n      <p>তবে object/function props-এর reference প্রতিবার পরিবর্তন হলে memoization ineffective হতে পারে।</p>\n      <p>Optimization করার আগে profiling করা উচিত।</p>\n    "
  },
  {
    "id": "react-25",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Performance",
      "Memoization"
    ],
    "question": "useMemo, useCallback এবং React.memo-এর পার্থক্য কী?",
    "answer": "\n      <h4>useMemo:</h4>\n      <p>Value memoize করে।</p>\n      <h4>useCallback:</h4>\n      <p>Function reference memoize করে।</p>\n      <h4>React.memo:</h4>\n      <p>Component-এর rendering skip করার সুযোগ দেয় যদি props unchanged থাকে।</p>\n      <h4>Relationship:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Parent\n ↓\nuseCallback\n ↓\nReact.memo Child\n ↓\nUnchanged function reference\n ↓\nPotential render skip</code></pre>\n      </div>\n      <p>এগুলো optimization tools; application correctness-এর জন্য প্রয়োজনীয় নয়।</p>\n    "
  },
  {
    "id": "react-26",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useContext",
      "Context"
    ],
    "question": "useContext কী?",
    "answer": "\n      <p>Context prop drilling কমাতে ব্যবহার করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>ThemeContext\n ↓\nProvider\n ↓\nDeep Child\n ↓\nuseContext()</code></pre>\n      </div>\n      <h4>Common use cases:</h4>\n      <ul>\n        <li>Theme</li>\n        <li>Locale</li>\n        <li>Authentication context</li>\n        <li>Application-level configuration</li>\n      </ul>\n      <p>তবে frequently changing large state-এর জন্য Context blindly ব্যবহার করলে অনেক component re-render হতে পারে।</p>\n    "
  },
  {
    "id": "react-27",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Context",
      "Performance"
    ],
    "question": "Context API-এর performance problem কী?",
    "answer": "\n      <p>Context value পরিবর্তন হলে সেই context consume করা components update হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;AuthContext.Provider value={{\n  user,\n  setUser\n}}&gt;\n  ...\n&lt;/AuthContext.Provider&gt;</code></pre>\n      </div>\n      <p>Value object প্রতিবার নতুন হলে unnecessary updates হতে পারে।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Split contexts</li>\n        <li>Stable provider values</li>\n        <li>Separate state/dispatch contexts</li>\n        <li>External state store</li>\n        <li>Component boundary optimization</li>\n      </ul>\n      <p>Large frequently changing state-এর জন্য specialized state management ব্যবহার করা যেতে পারে।</p>\n    "
  },
  {
    "id": "react-28",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "useReducer",
      "State"
    ],
    "question": "useReducer কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Complex state transition-এর ক্ষেত্রে useReducer useful।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [state, dispatch] = useReducer(reducer, initialState);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>dispatch({\n  type: \"ADD_ITEM\",\n  payload: item\n});</code></pre>\n      </div>\n      <h4>Useful যখন:</h4>\n      <ul>\n        <li>অনেক related state</li>\n        <li>Complex transitions</li>\n        <li>Multiple actions</li>\n        <li>Predictable state updates</li>\n      </ul>\n      <h4>Reducer:</h4>\n      <p>(state, action) =&gt; newState</p>\n      <p>Reducer ideally pure function হওয়া উচিত।</p>\n    "
  },
  {
    "id": "react-29",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Custom Hooks"
    ],
    "question": "Custom Hook কী?",
    "answer": "\n      <p>Custom Hook হলো reusable Hook logic।</p>\n      <p>Naming সাধারণত use দিয়ে শুরু হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function useDebounce(value, delay) {\n  ...\n}</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const debouncedSearch = useDebounce(search, 500);</code></pre>\n      </div>\n      <p>Custom Hook reusable logic share করে।</p>\n      <p>তবে Custom Hook UI share করে না; logic share করে।</p>\n    "
  },
  {
    "id": "react-30",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Rules of Hooks"
    ],
    "question": "React Hooks-এর Rules কী?",
    "answer": "\n      <h4>মূল Rules:</h4>\n      <ol>\n        <li>Hooks শুধুমাত্র top level-এ call করতে হবে।</li>\n        <li>Hooks সাধারণত React function component বা custom Hook-এর মধ্যে call করতে হবে।</li>\n      </ol>\n      <h4>Avoid:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (condition) {\n  useEffect(...);\n}</code></pre>\n      </div>\n      <h4>Avoid:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for (...) {\n  useState(...);\n}</code></pre>\n      </div>\n      <p>কারণ React Hook call order-এর উপর state association নির্ভর করে।</p>\n    "
  },
  {
    "id": "react-31",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Forms"
    ],
    "question": "Controlled এবং Uncontrolled component কী?",
    "answer": "\n      <h4>Controlled:</h4>\n      <p>Input value React state দ্বারা controlled।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;input\n  value={email}\n  onChange={e =&gt; setEmail(e.target.value)}\n/&gt;</code></pre>\n      </div>\n      <h4>Uncontrolled:</h4>\n      <p>DOM নিজে value maintain করে এবং ref দিয়ে access করা যায়।</p>\n      <h4>Controlled useful:</h4>\n      <ul>\n        <li>Validation</li>\n        <li>Dynamic UI</li>\n        <li>Conditional fields</li>\n        <li>Form state management</li>\n      </ul>\n      <h4>Uncontrolled useful হতে পারে:</h4>\n      <ul>\n        <li>Simple forms</li>\n        <li>Performance-sensitive large forms</li>\n        <li>Third-party/form libraries</li>\n      </ul>\n    "
  },
  {
    "id": "react-32",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Forms",
      "Validation"
    ],
    "question": "React form validation কীভাবে design করবেন?",
    "answer": "\n      <h4>Validation দুই layer-এ করা উচিত:</h4>\n      <p><strong>Client-side:</strong></p>\n      <ul>\n        <li>Required</li>\n        <li>Format</li>\n        <li>Length</li>\n        <li>User experience</li>\n      </ul>\n      <p><strong>Server-side:</strong></p>\n      <ul>\n        <li>Final authority</li>\n        <li>Security</li>\n        <li>Business validation</li>\n        <li>Database constraints</li>\n      </ul>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Form\n ↓\nClient validation\n ↓\nAPI\n ↓\nServer validation\n ↓\nBusiness validation\n ↓\nDatabase</code></pre>\n      </div>\n      <p>Client validation কখনো security boundary নয়।</p>\n    "
  },
  {
    "id": "react-33",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "State Management"
    ],
    "question": "Local state, Context এবং Global state কখন ব্যবহার করবেন?",
    "answer": "\n      <h4>Local state:</h4>\n      <p>Component-specific UI state।</p>\n      <p><strong>Example:</strong><br>Modal open/close</p>\n      <h4>Context:</h4>\n      <p>Shared relatively stable application data।</p>\n      <p><strong>Example:</strong><br>Theme/Auth context</p>\n      <h4>Global state store:</h4>\n      <p>Complex shared client state।</p>\n      <p><strong>Example:</strong><br>Large dashboard filters/cart/workflow state</p>\n      <h4>Server state:</h4>\n      <p>API/database data।</p>\n      <p>এর জন্য TanStack Query-এর মতো server-state solution ব্যবহার করা ভালো।</p>\n      <p>সব state global করার দরকার নেই।</p>\n    "
  },
  {
    "id": "react-34",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Server State",
      "TanStack Query"
    ],
    "question": "Client state এবং Server state-এর পার্থক্য কী?",
    "answer": "\n      <h4>Client state:</h4>\n      <p>Browser/application-এর local state।</p>\n      <h4>Example:</h4>\n      <ul>\n        <li>Modal</li>\n        <li>Selected tab</li>\n        <li>Theme</li>\n        <li>Form draft</li>\n      </ul>\n      <h4>Server state:</h4>\n      <p>Backend/database থেকে আসা data।</p>\n      <h4>Characteristics:</h4>\n      <ul>\n        <li>Remote</li>\n        <li>Async</li>\n        <li>Cacheable</li>\n        <li>Can become stale</li>\n        <li>Multiple clients share it</li>\n      </ul>\n      <p>Server state-এর জন্য caching, refetching, invalidation, retry ইত্যাদি দরকার।</p>\n      <p>তাই server state এবং UI state আলাদাভাবে manage করা ভালো।</p>\n    "
  },
  {
    "id": "react-35",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Data Fetching",
      "Caching"
    ],
    "question": "React application-এ API data fetching কীভাবে ভালোভাবে design করবেন?",
    "answer": "\n      <h4>Production architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Component\n ↓\nCustom Hook\n ↓\nData-fetching layer\n ↓\nAPI Client\n ↓\nBackend</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>useUsers()\n ↓\nuserApi.getUsers()\n ↓\nHTTP Client\n ↓\nAPI</code></pre>\n      </div>\n      <h4>Need:</h4>\n      <ul>\n        <li>Loading state</li>\n        <li>Error state</li>\n        <li>Empty state</li>\n        <li>Retry</li>\n        <li>Cache</li>\n        <li>Refetch</li>\n        <li>Pagination</li>\n        <li>Cancellation</li>\n        <li>Authentication</li>\n      </ul>\n      <p>Large application-এ component-এর মধ্যে raw fetch logic ছড়িয়ে না দেওয়াই ভালো।</p>\n    "
  },
  {
    "id": "react-36",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Suspense",
      "Loading"
    ],
    "question": "React Suspense কী?",
    "answer": "\n      <p>Suspense rendering-এর কিছু অংশ asynchronous resource-এর জন্য অপেক্ষা করার সময় fallback UI দেখানোর mechanism।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;Suspense fallback={&lt;Spinner /&gt;}&gt;\n  &lt;Dashboard /&gt;\n&lt;/Suspense&gt;</code></pre>\n      </div>\n      <h4>Modern React architecture-এ Suspense ব্যবহার হতে পারে:</h4>\n      <ul>\n        <li>Lazy-loaded components</li>\n        <li>Code splitting</li>\n        <li>Framework-supported data loading</li>\n        <li>Server rendering workflows</li>\n      </ul>\n      <p>Suspense নিজে সাধারণ Promise fetch library নয়; framework/data layer integration অনুযায়ী behavior নির্ভর করে।</p>\n    "
  },
  {
    "id": "react-37",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Lazy Loading",
      "Code Splitting"
    ],
    "question": "React.lazy এবং code splitting কী?",
    "answer": "\n      <p>Large JavaScript bundle initial loading slow করতে পারে।</p>\n      <p>React.lazy দিয়ে component dynamically load করা যায়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Initial bundle\n ↓\nDashboard\n ↓\nUser clicks Reports\n ↓\nReports chunk download\n ↓\nRender Reports</code></pre>\n      </div>\n      <p>Suspense fallback loading UI দেখাতে পারে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Smaller initial bundle</li>\n        <li>Faster initial load</li>\n        <li>Route/feature-based loading</li>\n      </ul>\n    "
  },
  {
    "id": "react-38",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Performance",
      "Bundle"
    ],
    "question": "React application-এর bundle size কীভাবে optimize করবেন?",
    "answer": "\n      <h4>Techniques:</h4>\n      <ul>\n        <li>Code splitting</li>\n        <li>Lazy loading</li>\n        <li>Tree shaking</li>\n        <li>Remove unused dependencies</li>\n        <li>Analyze bundle</li>\n        <li>Dynamic imports</li>\n        <li>Optimize images</li>\n        <li>Use modern formats</li>\n        <li>Avoid huge libraries for simple tasks</li>\n        <li>Route-level splitting</li>\n      </ul>\n      <p>Bundle analyzer দিয়ে কোন package বেশি size নিচ্ছে identify করা যায়।</p>\n    "
  },
  {
    "id": "react-39",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Performance",
      "Virtualization"
    ],
    "question": "Large list rendering কীভাবে optimize করবেন?",
    "answer": "\n      <p>ধরা যাক 100,000 rows render করতে হবে।</p>\n      <p>সব row একসাথে DOM-এ render করা expensive।</p>\n      <h4>Solution:</h4>\n      <p>Virtualization।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>100,000 records\n ↓\nOnly visible ~30 rows render\n ↓\nUser scrolls\n ↓\nRows reused/updated</code></pre>\n      </div>\n      <h4>Tools:</h4>\n      <ul>\n        <li>TanStack Virtual</li>\n        <li>react-window</li>\n        <li>Other virtualization solutions</li>\n      </ul>\n      <h4>Additionally:</h4>\n      <ul>\n        <li>Pagination</li>\n        <li>Server-side filtering</li>\n        <li>Memoization</li>\n        <li>Efficient row components</li>\n      </ul>\n    "
  },
  {
    "id": "react-40",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Performance",
      "Profiler"
    ],
    "question": "React performance কীভাবে debug করবেন?",
    "answer": "\n      <h4>Tools/techniques:</h4>\n      <ul>\n        <li>React DevTools Profiler</li>\n        <li>Browser Performance panel</li>\n        <li>Network panel</li>\n        <li>Memory profiler</li>\n        <li>Lighthouse</li>\n        <li>Bundle analyzer</li>\n      </ul>\n      <h4>Check:</h4>\n      <ul>\n        <li>Unnecessary renders</li>\n        <li>Expensive calculations</li>\n        <li>Large DOM</li>\n        <li>Slow API</li>\n        <li>Large JS bundle</li>\n        <li>Long tasks</li>\n        <li>Memory growth</li>\n      </ul>\n      <p>Optimization-এর আগে profiling করা উচিত।</p>\n    "
  },
  {
    "id": "react-41",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "React 18",
      "Concurrency"
    ],
    "question": "React 18-এর concurrent rendering কী?",
    "answer": "\n      <p>Concurrent rendering React-কে rendering work interrupt/reprioritize করার capability দেয়।</p>\n      <p>এর ফলে urgent এবং non-urgent update আলাদা priority-তে handle করা যায়।</p>\n      <h4>Related APIs:</h4>\n      <ul>\n        <li>startTransition</li>\n        <li>useTransition</li>\n        <li>Suspense</li>\n      </ul>\n      <h4>Concept:</h4>\n      <p>Urgent update<br>→ Input typing</p>\n      <p>Non-urgent update<br>→ Large search result rendering</p>\n      <p>React user interaction responsive রাখার জন্য rendering work prioritize করতে পারে।</p>\n    "
  },
  {
    "id": "react-42",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "useTransition",
      "React 18"
    ],
    "question": "useTransition কী?",
    "answer": "\n      <p>useTransition non-urgent state update mark করার জন্য ব্যবহার করা হয়।</p>\n      <h4>Example concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const [isPending, startTransition] = useTransition();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>startTransition(() =&gt; {\n  setSearchResults(results);\n});</code></pre>\n      </div>\n      <p>এখানে React বুঝতে পারে update-টি transition হিসেবে treat করা যেতে পারে।</p>\n      <p>User input-এর মতো urgent interaction responsive রাখতে এটি useful।</p>\n    "
  },
  {
    "id": "react-43",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "useDeferredValue",
      "React 18"
    ],
    "question": "useDeferredValue কী?",
    "answer": "\n      <p>useDeferredValue কোনো value-এর non-urgent version তৈরি করতে সাহায্য করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const deferredSearch = useDeferredValue(search);</code></pre>\n      </div>\n      <h4>Input:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>search\n ↓\nImmediate UI</code></pre>\n      </div>\n      <h4>Large result list:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>deferredSearch\n ↓\nCan update later</code></pre>\n      </div>\n      <p>Search input responsive রাখার ক্ষেত্রে useful হতে পারে।</p>\n    "
  },
  {
    "id": "react-44",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "React 19",
      "Actions"
    ],
    "question": "React 19-এর Actions কী?",
    "answer": "\n      <p>React 19 async mutation/form workflows সহজ করার জন্য Actions-এর concept introduce করেছে।</p>\n      <h4>Actions-এর মাধ্যমে:</h4>\n      <ul>\n        <li>Async operation</li>\n        <li>Pending state</li>\n        <li>Error handling</li>\n        <li>Form submission</li>\n        <li>Optimistic update</li>\n      </ul>\n      <p>ইত্যাদি workflow আরও declarative করা যায়।</p>\n      <p>React 19-এর নতুন form-related APIs-এর সাথে Actions closely related।</p>\n    "
  },
  {
    "id": "react-45",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "React 19",
      "useActionState"
    ],
    "question": "useActionState কী?",
    "answer": "\n      <p>useActionState async action-এর result/state manage করতে সাহায্য করে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Form\n ↓\nAction\n ↓\nServer/API\n ↓\nAction result\n ↓\nUI state</code></pre>\n      </div>\n      <h4>এতে form submission-এর:</h4>\n      <ul>\n        <li>Pending</li>\n        <li>Success</li>\n        <li>Error</li>\n        <li>Returned state</li>\n      </ul>\n      <p>একটি structured flow-এ handle করা যায়।</p>\n      <p>React 19-এর modern form/action architecture-এ এটি গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "react-46",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "React 19",
      "useFormStatus"
    ],
    "question": "useFormStatus কী?",
    "answer": "\n      <p>useFormStatus parent form-এর submission status access করতে সাহায্য করে।</p>\n      <p>যেমন submit button component জানতে পারে form pending কিনা।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>&lt;form&gt;\n  ↓\nSubmitButton\n  ↓\nuseFormStatus()\n  ↓\npending\n  ↓\nDisable button / Show loading\n&lt;/form&gt;</code></pre>\n      </div>\n      <p>এটি form submission UX সহজ করে।</p>\n    "
  },
  {
    "id": "react-47",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "React 19",
      "useOptimistic"
    ],
    "question": "useOptimistic কী?",
    "answer": "\n      <p>useOptimistic server response আসার আগেই expected UI update দেখাতে সাহায্য করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User likes post\n ↓\nImmediately show liked\n ↓\nSend API request\n ↓\nServer confirms\n ↓\nFinal state</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Faster UX</li>\n        <li>Responsive UI</li>\n      </ul>\n      <p>কিন্তু server operation fail করলে rollback/error handling strategy থাকতে হবে।</p>\n    "
  },
  {
    "id": "react-48",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "React 19",
      "use"
    ],
    "question": "React-এর use API কী?",
    "answer": "\n      <p>React-এর use API resource থেকে value read করার নতুন mechanism।</p>\n      <p>এটি বিশেষভাবে Suspense এবং modern Server Component architecture-এর সাথে গুরুত্বপূর্ণ।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Resource\n ↓\nuse(resource)\n ↓\nValue</code></pre>\n      </div>\n      <p>Resource pending হলে Suspense boundary ব্যবহার করে fallback দেখানো যেতে পারে।</p>\n      <p>use সাধারণ Hook-এর মতো একই rules follow করে না; এটি modern React rendering model-এর অংশ।</p>\n    "
  },
  {
    "id": "react-49",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Server Components",
      "RSC"
    ],
    "question": "React Server Components কী?",
    "answer": "\n      <p>React Server Components এমন component যা server environment-এ render/execute হতে পারে এবং client-এর JavaScript bundle-এর অংশ হিসেবে পাঠানো প্রয়োজন হয় না।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server Component\n ↓\nDatabase/API\n ↓\nRendered result\n ↓\nClient</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Less client JavaScript</li>\n        <li>Server-side data access</li>\n        <li>Better initial performance</li>\n        <li>Smaller client bundle</li>\n      </ul>\n      <p>Interactive UI-এর জন্য Client Component প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "react-50",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Server Components",
      "Client Components"
    ],
    "question": "Server Component এবং Client Component-এর পার্থক্য কী?",
    "answer": "\n      <h4>Server Component:</h4>\n      <ul>\n        <li>Server-এ execute হয়</li>\n        <li>Direct server-side data access possible</li>\n        <li>Client JS কমাতে সাহায্য করে</li>\n        <li>Browser-only APIs ব্যবহার করতে পারে না</li>\n        <li>Interactive state/event handling-এর জন্য নয়</li>\n      </ul>\n      <h4>Client Component:</h4>\n      <ul>\n        <li>Browser-এ execute হয়</li>\n        <li>useState/useEffect-এর মতো client interaction ব্যবহার করতে পারে</li>\n        <li>Event handlers ব্যবহার করতে পারে</li>\n        <li>Browser APIs ব্যবহার করতে পারে</li>\n      </ul>\n      <p>Modern full-stack React framework যেমন Next.js এই architecture extensively ব্যবহার করে।</p>\n    "
  },
  {
    "id": "react-51",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Hydration",
      "SSR"
    ],
    "question": "Hydration কী?",
    "answer": "\n      <p>SSR-এর সময় server HTML generate করে browser-এ পাঠায়।</p>\n      <h4>Browser:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server HTML\n ↓\nHydration\n ↓\nReact attaches event behavior\n ↓\nInteractive UI</code></pre>\n      </div>\n      <p>Hydration mismatch হয় যখন server-rendered output এবং client-rendered output expectedভাবে match করে না।</p>\n      <h4>Common causes:</h4>\n      <ul>\n        <li>Browser-only APIs</li>\n        <li>Random values</li>\n        <li>Current time</li>\n        <li>Different data</li>\n        <li>Incorrect conditional rendering</li>\n      </ul>\n      <p>SSR application-এ hydration mismatch carefully debug করতে হয়।</p>\n    "
  },
  {
    "id": "react-52",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "SSR",
      "CSR",
      "SSG"
    ],
    "question": "CSR, SSR এবং SSG-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>CSR:</h4>\n      <p>Browser JavaScript দিয়ে UI render করে।</p>\n      <h4>SSR:</h4>\n      <p>প্রতি request বা server rendering workflow অনুযায়ী HTML server-side তৈরি হয়।</p>\n      <h4>SSG:</h4>\n      <p>Build time-এ static HTML/content generate করা হয়।</p>\n      <h4>Use cases:</h4>\n      <p>CSR → Highly interactive dashboard</p>\n      <p>SSR → Dynamic SEO-sensitive pages</p>\n      <p>SSG → Marketing/content pages</p>\n      <p>Modern frameworks অনেক সময় এই strategies combine করে।</p>\n    "
  },
  {
    "id": "react-53",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Error Boundary",
      "Error Handling"
    ],
    "question": "React Error Boundary কী?",
    "answer": "\n      <p>Error Boundary descendant component-এর rendering/lifecycle-related errors catch করে fallback UI দেখাতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Error Boundary\n ↓\nApplication\n ├── Header\n ├── Dashboard\n └── Reports</code></pre>\n      </div>\n      <p>Reports crash করলে পুরো application blank হওয়ার পরিবর্তে fallback দেখানো যেতে পারে।</p>\n      <p>Error Boundary সাধারণত event handler বা arbitrary async callback-এর সব error catch করার mechanism নয়।</p>\n    "
  },
  {
    "id": "react-54",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Error Handling",
      "API"
    ],
    "question": "React API error handling কীভাবে করবেন?",
    "answer": "\n      <h4>UI-তে অন্তত এই states consider করা উচিত:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Idle\n ↓\nLoading\n ↓\nSuccess\n ↓\nError</code></pre>\n      </div>\n      <h4>আরও থাকতে পারে:</h4>\n      <ul>\n        <li>Empty</li>\n        <li>Partial</li>\n        <li>Retry</li>\n        <li>Unauthorized</li>\n        <li>Forbidden</li>\n        <li>Offline</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (isLoading) return &lt;Loading /&gt;;\nif (error) return &lt;ErrorState /&gt;;\nif (!data.length) return &lt;EmptyState /&gt;;</code></pre>\n      </div>\n      <p>Production UX-এ শুধু success state implement করা যথেষ্ট নয়।</p>\n    "
  },
  {
    "id": "react-55",
    "category": "React.js",
    "difficulty": "Intermediate",
    "tags": [
      "Authentication",
      "Protected Routes"
    ],
    "question": "React application-এ protected route কী?",
    "answer": "\n      <p>Protected route authenticated user ছাড়া access করতে দেয় না।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request/navigation\n ↓\nCheck authentication\n ↓\nAuthenticated?\n ├── Yes → Page\n └── No → Login</code></pre>\n      </div>\n      <p>তবে শুধু frontend route protection security boundary নয়।</p>\n      <p>Backend API-তেও অবশ্যই authentication এবং authorization enforce করতে হবে।</p>\n      <p>Frontend protection মূলত UX/navigation control।</p>\n    "
  },
  {
    "id": "react-56",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Authentication",
      "Security"
    ],
    "question": "React application-এ JWT কোথায় রাখা উচিত?",
    "answer": "\n      <p>এটি authentication architecture-এর উপর নির্ভর করে।</p>\n      <h4>Browser storage:</h4>\n      <p>localStorage/sessionStorage</p>\n      <p>ব্যবহার করলে JavaScript access করতে পারে, তাই XSS হলে token exposure-এর risk থাকে।</p>\n      <h4>HttpOnly Secure cookie:</h4>\n      <p>JavaScript সরাসরি access করতে পারে না এবং cookie-based session architecture-এর সাথে useful।</p>\n      <p>Best approach application-এর threat model অনুযায়ী নির্ধারণ করতে হবে।</p>\n      <h4>Important:</h4>\n      <ul>\n        <li>HTTPS</li>\n        <li>Secure cookies</li>\n        <li>HttpOnly যেখানে appropriate</li>\n        <li>SameSite</li>\n        <li>CSRF protection যেখানে applicable</li>\n        <li>Short-lived access token</li>\n        <li>Refresh strategy</li>\n      </ul>\n    "
  },
  {
    "id": "react-57",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "XSS",
      "Security"
    ],
    "question": "React কীভাবে XSS attack থেকে protection দেয়?",
    "answer": "\n      <p>React সাধারণ JSX rendering-এর সময় values escape করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;div&gt;{userInput}&lt;/div&gt;</code></pre>\n      </div>\n      <p>এখানে userInput HTML হিসেবে execute হওয়ার কথা নয়।</p>\n      <p>Risk বাড়ে যখন raw HTML render করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>dangerouslySetInnerHTML</code></pre>\n      </div>\n      <p>এটি ব্যবহার করলে trusted/sanitized HTML নিশ্চিত করতে হবে।</p>\n      <p>User-generated HTML sanitize না করে render করা উচিত নয়।</p>\n    "
  },
  {
    "id": "react-58",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Testing",
      "React Testing Library"
    ],
    "question": "React component কীভাবে test করবেন?",
    "answer": "\n      <h4>Testing levels:</h4>\n      <p><strong>Unit:</strong><br>Pure function</p>\n      <p><strong>Component:</strong><br>UI behavior</p>\n      <p><strong>Integration:</strong><br>Multiple components + API/data layer</p>\n      <p><strong>E2E:</strong><br>Real user workflow</p>\n      <p>React Testing Library user behavior-এর উপর focus করে।</p>\n      <h4>Example scenarios:</h4>\n      <ul>\n        <li>Button click</li>\n        <li>Form submission</li>\n        <li>Validation</li>\n        <li>Loading</li>\n        <li>Error</li>\n        <li>API success</li>\n        <li>API failure</li>\n      </ul>\n      <p>Implementation details-এর চেয়ে user-visible behavior test করা ভালো।</p>\n    "
  },
  {
    "id": "react-59",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Testing",
      "Mocking"
    ],
    "question": "React API testing-এ MSW কী?",
    "answer": "\n      <p>MSW = Mock Service Worker।</p>\n      <p>এটি network level-এ API request intercept করে mock response দিতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>React\n ↓\nHTTP Request\n ↓\nMSW intercept\n ↓\nMock Response</code></pre>\n      </div>\n      <p>এতে component/API integration test করা যায় without requiring real backend.</p>\n      <h4>Possible scenarios:</h4>\n      <ul>\n        <li>200 success</li>\n        <li>400 validation</li>\n        <li>401 unauthorized</li>\n        <li>500 server error</li>\n        <li>Slow response</li>\n      </ul>\n    "
  },
  {
    "id": "react-60",
    "category": "React.js",
    "difficulty": "Advanced",
    "tags": [
      "Testing",
      "E2E"
    ],
    "question": "React application-এর E2E testing কী?",
    "answer": "\n      <p>E2E = End-to-End testing।</p>\n      <p>Real user workflow simulate করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Open application\n ↓\nLogin\n ↓\nDashboard\n ↓\nCreate product\n ↓\nSubmit\n ↓\nVerify result</code></pre>\n      </div>\n      <h4>Tools:</h4>\n      <ul>\n        <li>Playwright</li>\n        <li>Cypress</li>\n      </ul>\n      <p>E2E test expensive/slow হতে পারে, তাই critical business flows-এর উপর focus করা ভালো।</p>\n    "
  },
  {
    "id": "react-61",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Feature Based"
    ],
    "question": "Large React application-এর architecture কীভাবে design করবেন?",
    "answer": "\n      <p>Feature-based architecture scalable হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>src/\n ├── app/\n ├── components/\n ├── features/\n │    ├── auth/\n │    │    ├── components/\n │    │    ├── hooks/\n │    │    ├── api/\n │    │    └── types/\n │    │\n │    ├── users/\n │    ├── products/\n │    └── orders/\n │\n ├── shared/\n │    ├── ui/\n │    ├── hooks/\n │    ├── utils/\n │    └── constants/\n │\n └── services/</code></pre>\n      </div>\n      <p>Feature-specific logic feature-এর মধ্যে থাকবে।</p>\n      <p>Shared logic সত্যিই shared হলে shared folder-এ যাবে।</p>\n    "
  },
  {
    "id": "react-62",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Clean Architecture"
    ],
    "question": "React application-এ Clean Architecture কীভাবে apply করবেন?",
    "answer": "\n      <h4>Possible layers:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>UI\n ↓\nApplication/Use Case\n ↓\nDomain\n ↓\nInfrastructure</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Component\n ↓\nuseCreateOrder()\n ↓\nCreateOrderUseCase\n ↓\nOrderRepository\n ↓\nAPI</code></pre>\n      </div>\n      <p>UI directly low-level API implementation-এর সাথে tightly coupled না থাকলে testing এবং replacement সহজ হয়।</p>\n      <p>তবে ছোট application-এ অতিরিক্ত abstraction unnecessary complexity তৈরি করতে পারে।</p>\n    "
  },
  {
    "id": "react-63",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Design Patterns",
      "React"
    ],
    "question": "React-এ common design patterns কী কী?",
    "answer": "\n      <h4>Important patterns:</h4>\n      <ul>\n        <li>Compound Components</li>\n        <li>Render Props</li>\n        <li>Higher-Order Components</li>\n        <li>Custom Hooks</li>\n        <li>Provider Pattern</li>\n        <li>Container/Presentational</li>\n        <li>State Reducer Pattern</li>\n        <li>Controlled Components</li>\n        <li>Composition</li>\n      </ul>\n      <h4>Modern React-এ:</h4>\n      <p>Composition<br>+<br>Custom Hooks<br>+<br>Context<br>+<br>Server/Client Components</p>\n      <p>বেশি common।</p>\n      <p>HOC এবং Render Props legacy codebase-এ এখনও দেখা যায়।</p>\n    "
  },
  {
    "id": "react-64",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Composition",
      "Architecture"
    ],
    "question": "React composition কেন inheritance-এর চেয়ে বেশি preferred?",
    "answer": "\n      <p>React component reuse-এর জন্য composition encourage করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;Card&gt;\n  &lt;Header /&gt;\n  &lt;Content /&gt;\n  &lt;Footer /&gt;\n&lt;/Card&gt;</code></pre>\n      </div>\n      <p>একটি generic component বিভিন্ন child content accept করতে পারে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Flexible</li>\n        <li>Loose coupling</li>\n        <li>Reusable</li>\n        <li>Easier to extend</li>\n      </ul>\n      <p>React architecture-এ inheritance-এর পরিবর্তে composition সাধারণত preferred।</p>\n    "
  },
  {
    "id": "react-65",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "State Management",
      "Redux"
    ],
    "question": "Redux কখন ব্যবহার করবেন?",
    "answer": "\n      <p>Redux complex global client state-এর জন্য useful হতে পারে।</p>\n      <h4>Useful যখন:</h4>\n      <ul>\n        <li>অনেক component একই state share করে</li>\n        <li>Complex state transitions</li>\n        <li>Predictable state updates</li>\n        <li>Debugging/time-travel tooling প্রয়োজন</li>\n        <li>Large team-এর standardized state architecture দরকার</li>\n      </ul>\n      <p>Redux ব্যবহার করার আগে state-এর প্রকৃতি বুঝতে হবে।</p>\n      <p>Server state-এর জন্য Redux দিয়ে সব API cache নিজে manage করার প্রয়োজন নেই; dedicated server-state solution অনেক ক্ষেত্রে ভালো।</p>\n    "
  },
  {
    "id": "react-66",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Redux Toolkit",
      "State Management"
    ],
    "question": "Redux Toolkit কেন Redux-এর recommended approach?",
    "answer": "\n      <p>Redux Toolkit Redux-এর boilerplate কমায় এবং recommended patterns provide করে।</p>\n      <h4>Important features:</h4>\n      <ul>\n        <li>configureStore</li>\n        <li>createSlice</li>\n        <li>createAsyncThunk</li>\n        <li>RTK Query</li>\n        <li>Immer-based immutable update handling</li>\n      </ul>\n      <h4>Example architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Component\n ↓\ndispatch(action)\n ↓\nSlice/Reducer\n ↓\nStore\n ↓\nSelector\n ↓\nComponent</code></pre>\n      </div>\n      <p>RTK Query server data fetching/cache-এর জন্যও useful।</p>\n    "
  },
  {
    "id": "react-67",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "State Management",
      "Zustand"
    ],
    "question": "Redux এবং Zustand-এর মধ্যে কী পার্থক্য?",
    "answer": "\n      <h4>Redux:</h4>\n      <ul>\n        <li>Structured architecture</li>\n        <li>Strong ecosystem</li>\n        <li>Middleware</li>\n        <li>DevTools</li>\n        <li>Large-team conventions</li>\n      </ul>\n      <h4>Zustand:</h4>\n      <ul>\n        <li>Minimal API</li>\n        <li>Less boilerplate</li>\n        <li>Simple store model</li>\n        <li>Lightweight</li>\n      </ul>\n      <h4>Choice depends on:</h4>\n      <ul>\n        <li>Application complexity</li>\n        <li>Team preference</li>\n        <li>Existing ecosystem</li>\n        <li>Debugging requirements</li>\n        <li>State architecture</li>\n      </ul>\n      <p>কোনোটিই সব application-এর জন্য universally best নয়।</p>\n    "
  },
  {
    "id": "react-68",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Micro Frontend",
      "Architecture"
    ],
    "question": "Micro Frontend কী?",
    "answer": "\n      <p>Micro Frontend হলো frontend application-কে independently owned/deployed feature applications-এ ভাগ করার architecture।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Shell\n ├── Admin\n ├── Commerce\n ├── Payment\n └── Reporting</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Team autonomy</li>\n        <li>Independent deployment</li>\n        <li>Large organization scaling</li>\n      </ul>\n      <h4>Challenges:</h4>\n      <ul>\n        <li>Shared dependencies</li>\n        <li>Routing</li>\n        <li>Authentication</li>\n        <li>Design consistency</li>\n        <li>Performance</li>\n        <li>Cross-app communication</li>\n      </ul>\n      <p>Small application-এ Micro Frontend unnecessary complexity হতে পারে।</p>\n    "
  },
  {
    "id": "react-69",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Real Time",
      "WebSocket"
    ],
    "question": "React application-এ real-time data কীভাবে implement করবেন?",
    "answer": "\n      <h4>Common approaches:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>WebSocket\n ↓\nBackend\n ↓\nReact</code></pre>\n      </div>\n      <h4>অথবা:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server-Sent Events\n ↓\nReact</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Dashboard\n ↓\nWebSocket\n ↓\nOrder event\n ↓\nUpdate UI</code></pre>\n      </div>\n      <p>Large application-এ WebSocket connection lifecycle, reconnection, authentication এবং cleanup properly handle করতে হয়।</p>\n    "
  },
  {
    "id": "react-70",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "WebSocket",
      "State"
    ],
    "question": "React WebSocket connection কীভাবে safely manage করবেন?",
    "answer": "\n      <h4>Connection lifecycle:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Component mount\n ↓\nCreate WebSocket\n ↓\nSubscribe\n ↓\nReceive events\n ↓\nUpdate state\n ↓\nCleanup\n ↓\nClose connection</code></pre>\n      </div>\n      <h4>Need to handle:</h4>\n      <ul>\n        <li>Reconnection</li>\n        <li>Backoff</li>\n        <li>Authentication</li>\n        <li>Duplicate connection</li>\n        <li>Cleanup</li>\n        <li>Heartbeat</li>\n        <li>Server disconnect</li>\n        <li>Offline/online state</li>\n      </ul>\n      <p>useEffect বা dedicated custom hook ব্যবহার করে lifecycle encapsulate করা যায়।</p>\n    "
  },
  {
    "id": "react-71",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "SEO",
      "SSR"
    ],
    "question": "React application-এর SEO কীভাবে improve করবেন?",
    "answer": "\n      <p>SEO-sensitive pages-এর জন্য server rendering/static generation useful হতে পারে।</p>\n      <h4>Important:</h4>\n      <ul>\n        <li>Semantic HTML</li>\n        <li>Correct title</li>\n        <li>Meta description</li>\n        <li>Canonical URL</li>\n        <li>Open Graph metadata</li>\n        <li>Structured data</li>\n        <li>Server-rendered content where appropriate</li>\n        <li>Fast loading</li>\n        <li>Good Core Web Vitals</li>\n      </ul>\n      <p>Pure CSR application-এর SEO strategy page/content type অনুযায়ী আলাদা হতে পারে।</p>\n    "
  },
  {
    "id": "react-72",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Accessibility",
      "a11y"
    ],
    "question": "React accessibility কীভাবে নিশ্চিত করবেন?",
    "answer": "\n      <h4>Important practices:</h4>\n      <ul>\n        <li>Semantic HTML</li>\n        <li>Proper labels</li>\n        <li>Keyboard navigation</li>\n        <li>Focus management</li>\n        <li>ARIA only when needed</li>\n        <li>Color contrast</li>\n        <li>Accessible buttons</li>\n        <li>Form error messages</li>\n        <li>Screen reader support</li>\n      </ul>\n      <h4>Bad:</h4>\n      <p>&lt;div onClick={handleClick}&gt;Save&lt;/div&gt;</p>\n      <h4>Better:</h4>\n      <p>&lt;button onClick={handleClick}&gt;Save&lt;/button&gt;</p>\n      <p>Accessibility শুধু visual design issue নয়; keyboard এবং assistive technology support-ও গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "react-73",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Internationalization",
      "i18n"
    ],
    "question": "React application-এ internationalization কীভাবে design করবেন?",
    "answer": "\n      <p>UI text hardcode না করে translation resources ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>en.json\n{\n  \"welcome\": \"Welcome\"\n}</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>bn.json\n{\n  \"welcome\": \"স্বাগতম\"\n}</code></pre>\n      </div>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Component\n ↓\nTranslation function\n ↓\nLocale resource</code></pre>\n      </div>\n      <h4>Consider:</h4>\n      <ul>\n        <li>Language switching</li>\n        <li>Date formatting</li>\n        <li>Number formatting</li>\n        <li>Currency</li>\n        <li>RTL</li>\n        <li>Pluralization</li>\n        <li>Dynamic content</li>\n      </ul>\n    "
  },
  {
    "id": "react-74",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Internationalization",
      "RTL"
    ],
    "question": "RTL language support React application-এ কীভাবে করবেন?",
    "answer": "\n      <p>Arabic/Hebrew-এর মতো RTL language support-এর জন্য document direction dynamically set করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>document.documentElement.dir = \"rtl\";</code></pre>\n      </div>\n      <p>CSS framework/design system-এ logical properties ব্যবহার করা ভালো।</p>\n      <h4>Prefer:</h4>\n      <p>margin-inline-start</p>\n      <h4>instead of hardcoded:</h4>\n      <p>margin-left</p>\n      <p>Component library-তেও RTL support properly configure করতে হবে।</p>\n    "
  },
  {
    "id": "react-75",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Dashboard"
    ],
    "question": "একটি large React dashboard কীভাবে architect করবেন?",
    "answer": "\n      <h4>Example architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nReact App\n ↓\nRouter\n ↓\nFeature Modules\n ├── Dashboard\n ├── Users\n ├── Orders\n ├── Reports\n └── Settings\n        ↓\nAPI Layer\n        ↓\nBackend</code></pre>\n      </div>\n      <h4>State separation:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>UI State\n ↓\nLocal/Context/Store</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server State\n ↓\nQuery Cache</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Real-time:\nWebSocket\n ↓\nEvent Handler\n ↓\nState/Cache Update</code></pre>\n      </div>\n      <h4>Performance:</h4>\n      <ul>\n        <li>Route splitting</li>\n        <li>Lazy loading</li>\n        <li>Virtualized tables</li>\n        <li>Memoization যেখানে প্রয়োজন</li>\n        <li>Server pagination</li>\n        <li>Debounced filters</li>\n      </ul>\n      <h4>Security:</h4>\n      <ul>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Secure token strategy</li>\n        <li>Input validation</li>\n      </ul>\n      <h4>Observability:</h4>\n      <ul>\n        <li>Error tracking</li>\n        <li>Performance monitoring</li>\n        <li>User/session correlation</li>\n      </ul>\n    "
  },
  {
    "id": "react-76",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Large Application"
    ],
    "question": "একটি React application-এর page navigation 5-10 seconds slow হলে কীভাবে debug করবেন?",
    "answer": "\n      <h4>Step-by-step:</h4>\n      <ol>\n        <li>Browser Performance inspect</li>\n        <li>Network waterfall check</li>\n        <li>JS bundle size check</li>\n        <li>API latency check</li>\n        <li>React Profiler</li>\n        <li>Long tasks identify</li>\n        <li>Component render count</li>\n        <li>Large lists inspect</li>\n        <li>Images inspect</li>\n        <li>Code splitting inspect</li>\n        <li>Cache behavior inspect</li>\n        <li>Server rendering/data-fetching path inspect</li>\n      </ol>\n      <h4>Possible causes:</h4>\n      <ul>\n        <li>Large JS bundle</li>\n        <li>Sequential API calls</li>\n        <li>Slow backend</li>\n        <li>Unnecessary re-render</li>\n        <li>Large table</li>\n        <li>Blocking JavaScript</li>\n        <li>Missing cache</li>\n        <li>Hydration cost</li>\n      </ul>\n      <p>First measure, তারপর optimize।</p>\n    "
  },
  {
    "id": "react-77",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Rendering"
    ],
    "question": "একটি parent component re-render হলে সব child কি re-render হয়?",
    "answer": "\n      <p>Parent re-render হলে child elements-এর নতুন render output তৈরি হতে পারে।</p>\n      <p>কিন্তু actual DOM update এবং component rendering একই বিষয় নয়।</p>\n      <p>React.memo-এর মতো optimization child re-render skip করার সুযোগ দিতে পারে যখন props unchanged থাকে।</p>\n      <h4>Performance বুঝতে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Parent render\n ↓\nChild render?\n ↓\nMemoization?\n ↓\nProps identity?\n ↓\nContext?\n ↓\nActual DOM update?</code></pre>\n      </div>\n      <p>React DevTools Profiler দিয়ে actual behavior measure করা উচিত।</p>\n    "
  },
  {
    "id": "react-78",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "Stale Closure",
      "Hooks"
    ],
    "question": "React-এ stale closure কী?",
    "answer": "\n      <p>Function কোনো পুরনো render-এর state/props capture করলে stale closure হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>useEffect(() =&gt; {\n  const timer = setInterval(() =&gt; {\n    console.log(count);\n  }, 1000);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return () =&gt; clearInterval(timer);\n}, []);</code></pre>\n      </div>\n      <p>এখানে dependency design ভুল হলে callback পুরনো count ধরে রাখতে পারে।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Correct dependencies</li>\n        <li>Functional state update</li>\n        <li>useRef যেখানে appropriate</li>\n        <li>Effect architecture ঠিক করা</li>\n      </ul>\n      <p>Hooks-এর closure behavior বুঝতে পারা senior React developer-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "react-79",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "State",
      "Immutability"
    ],
    "question": "React state immutableভাবে update করা কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>React state update-এ নতুন object/array reference তৈরি করা সাধারণ pattern।</p>\n      <h4>Bad:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>user.name = \"New\";\nsetUser(user);</code></pre>\n      </div>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setUser({\n  ...user,\n  name: \"New\"\n});</code></pre>\n      </div>\n      <h4>Array:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>jsx</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>setItems([\n  ...items,\n  newItem\n]);</code></pre>\n      </div>\n      <h4>Immutable updates:</h4>\n      <ul>\n        <li>Predictable</li>\n        <li>Easier debugging</li>\n        <li>Memoization-এর সাথে compatible</li>\n        <li>Change detection সহজ করে</li>\n      </ul>\n      <p>Nested structures-এর ক্ষেত্রে Immer-এর মতো tools ব্যবহার করা যেতে পারে।</p>\n    "
  },
  {
    "id": "react-80",
    "category": "React.js",
    "difficulty": "Senior",
    "tags": [
      "System Design",
      "Architecture"
    ],
    "question": "Senior React developer হিসেবে production-grade React architecture কীভাবে design করবেন?",
    "answer": "\n      <h4>একটি scalable architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n                       ↓\n                 React Application\n                       ↓\n              ┌────────┴────────┐\n              ↓                 ↓\n          UI State         Server State\n              ↓                 ↓\n       Local/Context/Store   Query Cache\n              │                 │\n              └────────┬────────┘\n                       ↓\n                    API Layer\n                       ↓\n                Backend Services\n                       ↓\n                  Database/Cache</code></pre>\n      </div>\n      <h4>Application layers:</h4>\n      <ol>\n        <li>App/Shell</li>\n        <li>Routing</li>\n        <li>Features</li>\n        <li>Shared UI</li>\n        <li>Hooks</li>\n        <li>API/Data layer</li>\n        <li>State management</li>\n        <li>Utilities</li>\n        <li>Error boundaries</li>\n        <li>Testing</li>\n        <li>Observability</li>\n      </ol>\n      <h4>Performance:</h4>\n      <ul>\n        <li>Code splitting</li>\n        <li>Lazy loading</li>\n        <li>Virtualization</li>\n        <li>Server rendering where useful</li>\n        <li>Cache</li>\n        <li>Image optimization</li>\n        <li>Avoid unnecessary renders</li>\n      </ul>\n      <h4>Security:</h4>\n      <ul>\n        <li>Backend authorization</li>\n        <li>XSS prevention</li>\n        <li>Secure authentication</li>\n        <li>CSRF protection where applicable</li>\n        <li>Dependency security</li>\n      </ul>\n      <h4>Quality:</h4>\n      <ul>\n        <li>TypeScript</li>\n        <li>ESLint</li>\n        <li>Unit tests</li>\n        <li>Integration tests</li>\n        <li>E2E tests</li>\n        <li>CI/CD</li>\n      </ul>\n      <p><strong>Modern React architecture-এ সবচেয়ে গুরুত্বপূর্ণ হলো:</strong><br>\"কোন state কোথায় থাকবে, কোন code server-এ চলবে, কোন code client-এ চলবে, এবং কোন data কীভাবে fetch/cache/update হবে\"—এই boundaries পরিষ্কারভাবে design করা।</p>\n    "
  }
];
