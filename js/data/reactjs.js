
const reactjsQuestions = [
  {
    id: "react-1",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Virtual DOM", "Reconciliation", "Fiber"],
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
    tags: ["Hooks", "useState", "useReducer", "State Management"],
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
    tags: ["useEffect", "Cleanup", "Dependencies", "Memory Leak"],
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
    tags: ["useMemo", "useCallback", "Performance", "Re-render"],
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
    tags: ["Custom Hooks", "Reusability", "Architecture"],
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
    tags: ["Context API", "Provider Pattern", "Performance"],
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
    tags: ["HOC", "Render Props", "Compound Components"],
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
    tags: ["Redux", "Zustand", "State Management"],
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
    tags: ["React.memo", "Performance", "Profiling", "Re-render"],
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
    tags: ["Suspense", "Lazy Loading", "Code Splitting"],
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
    tags: ["Error Boundary", "Error Handling", "Production"],
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
    tags: ["useRef", "forwardRef", "DOM"],
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
    tags: ["Server Components", "RSC", "React 19"],
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
    tags: ["Testing", "React Testing Library", "Jest"],
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
    tags: ["Form", "React Hook Form", "Validation"],
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
    tags: ["Routing", "React Router", "Protected Routes"],
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
    tags: ["Micro-Frontend", "Module Federation", "Architecture"],
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
    tags: ["JSX", "Babel", "SWC"],
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
    tags: ["Component", "Props", "State"],
    question: "React-ে Functional Component কী? Props এবং State-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p><strong>Functional Component</strong> হলো একটি JavaScript function যা JSX return করে। React 16.8 থেকে Hooks আসার পর Class Component-ের প্রয়োজনীয়তা প্রায় শেষ।</p>
      <h4>Props vs State:</h4>
      <ul>
        <li><strong>Props:</strong> Parent component থেকে পাঠানো হয়। Read-only (Immutable)।</li>
        <li><strong>State:</strong> Component নিজে manage করে। পরিবর্তনযোগ্য (Mutable via setState)। State পরিবর্তন হলে component re-render হয়।</li>
      </ul>
    `
  },
  {
    id: "react-20",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["List", "Key", "Rendering"],
    question: "React-ে list rendering-এ key prop কেন গুরুত্বপূর্ণ? index কে key হিসেবে ব্যবহার করলে কী সমস্যা হয়?",
    answer: `
      <p><strong>Key</strong> prop React-এর reconciliation algorithm-কে বলে দেয় কোন element নতুন, কোনটি পরিবর্তিত, কোনটি মুছে গেছে।</p>
      <h4>Index key-এর সমস্যা:</h4>
      <ul>
        <li>List reorder বা delete হলে React ভুল element আপডেট করে।</li>
        <li>Item delete/insert হলে wrong component-এ state থেকে যায় (State corruption)।</li>
        <li>Input fields-এ ভুল value দেখায়।</li>
      </ul>
      <p><strong>সমাধান:</strong> সবসময় সার্ভার থেকে আসা unique, stable ID (<code>item.id</code>) কে key হিসেবে ব্যবহার করুন।</p>
    `
  },
  {
    id: "react-21",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Concurrent", "useTransition", "useDeferredValue"],
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
    tags: ["Design System", "Component Library", "Storybook"],
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
    tags: ["Conditional Rendering", "Pattern"],
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
    tags: ["Accessibility", "a11y", "ARIA"],
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
    tags: ["SSR", "CSR", "Hydration"],
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
    tags: ["Virtualization", "Large List", "Performance"],
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
    tags: ["useImperativeHandle", "DOM", "Ref"],
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
    tags: ["Controlled", "Uncontrolled", "Form"],
    question: "Controlled vs Uncontrolled Components — পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <h4>Controlled Component:</h4>
      <p>React state-ই হলো "single source of truth"। <code>value</code> এবং <code>onChange</code> থাকে। Real-time validation সহজ।</p>
      <h4>Uncontrolled Component:</h4>
      <p>DOM নিজেই value ম্যানেজ করে। <code>ref</code> দিয়ে value পড়া হয়।</p>
      <p><strong>Decision Guide:</strong> Real-time validation বা dynamic disabling দরকার হলে Controlled। বড় ফর্ম বা ফাইল ইনপুটের ক্ষেত্রে Uncontrolled (React Hook Form internally uncontrolled ব্যবহার করে)।</p>
    `
  },
  {
    id: "react-29",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Portal", "Modal", "Tooltip"],
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
    tags: ["TypeScript", "React", "Generics"],
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
    tags: ["Lifecycle", "Hooks", "Class"],
    question: "React Component Lifecycle Methods এবং তাদের Hooks equivalent কী কী?",
    answer: `
      <h4>Class Lifecycle → Hooks Mapping:</h4>
      <ul>
        <li><strong>componentDidMount:</strong> <code>useEffect(() => {}, [])</code></li>
        <li><strong>componentDidUpdate:</strong> <code>useEffect(() => {}, [deps])</code></li>
        <li><strong>componentWillUnmount:</strong> <code>useEffect(() => { return () => {} }, [])</code></li>
        <li><strong>shouldComponentUpdate:</strong> <code>React.memo()</code></li>
      </ul>
    `
  },
  {
    id: "react-32",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["State Batching", "React 18", "Automatic"],
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
    tags: ["Security", "XSS", "dangerouslySetInnerHTML"],
    question: "React অ্যাপে Security best practices কী কী? XSS attack কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p>React by default JSX-ে HTML escape করে, কিন্তু কিছু ক্ষেত্রে XSS vulnerability তৈরি হতে পারে।</p>
      <ul>
        <li>❌ <code>dangerouslySetInnerHTML</code> ব্যবহার করলে অবশ্যই <strong>DOMPurify</strong> দিয়ে sanitize করতে হবে।</li>
        <li>❌ URL-ভিত্তিক XSS (<code>javascript:alert(1)</code>) এড়াতে <code>href</code> ভ্যালিডেট করতে হবে।</li>
        <li>Environment variables: <code>REACT_APP_</code> বা <code>NEXT_PUBLIC_</code> prefix শুধু public ডাটার জন্য, সিক্রেট নয়।</li>
      </ul>
    `
  },
  {
    id: "react-34",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Webpack", "Vite", "Build", "Bundle"],
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
    tags: ["Monorepo", "Turborepo", "Nx", "Architecture"],
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
    tags: ["Styling", "CSS Modules", "Styled Components", "Tailwind"],
    question: "React-ে styling approaches — CSS Modules, Styled Components, Tailwind CSS — কোনটি কখন ব্যবহার করবেন?",
    answer: `
      <p>2024+ এ <strong>Tailwind CSS</strong> সবচেয়ে জনপ্রিয়। সিনিয়র ডেভেলপারদের আর্কিটেকচার ডিসিশন জরুরি।</p>
      <ul>
        <li><strong>CSS Modules:</strong> Zero runtime, scoped। ছোট প্রজেক্টে ভালো।</li>
        <li><strong>Tailwind CSS:</strong> Fast development, tiny CSS ( purge unused)। নতুন প্রজেক্টে recommend।</li>
        <li><strong>Zero-runtime CSS-in-JS (Vanilla Extract, Panda CSS):</strong> TypeScript support এবং RSC compatible। Styled Components RSC তে কাজ করে না।</li>
      </ul>
    `
  },
  {
    id: "react-37",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["WebSocket", "Real-time", "Optimistic Update"],
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
    tags: ["Internationalization", "i18n", "Localization"],
    question: "React অ্যাপে Internationalization (i18n) কীভাবে implement করবেন?",
    answer: `
      <p>Multi-language support-এর জন্য <strong>react-i18next</strong> সবচেয়ে জনপ্রিয় library।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function Dashboard() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1>{t('greeting', { name: 'নাজমুল' })}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  );
}

// Date/Number formatting (Intl API)
const formattedPrice = new Intl.NumberFormat('bn-BD', {
  style: 'currency', currency: 'BDT'
}).format(15000); // "১৫,০০০.০০৳"</code></pre>
      </div>
    `
  },
  {
    id: "react-39",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Prop Drilling", "Composition"],
    question: "Prop Drilling সমস্যা কী? Context ছাড়া কীভাবে সমাধান করবেন?",
    answer: `
      <p><strong>Prop Drilling</strong> হলো props-কে অনেকগুলো intermediate component-ের মধ্য দিয়ে পাস করা, যেখানে middle components সেই props ব্যবহারই করে না।</p>
      <h4>সমাধান: Component Composition (children pattern)</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ children pattern
function App() {
  const [user, setUser] = useState(userData);
  return (
    <Layout>
      <Sidebar>
        <UserAvatar user={user} /> {/* সরাসরি পাস! */}
      </Sidebar>
    </Layout>
  );
}
function Layout({ children }) { return <div>{children}</div>; }</code></pre>
      </div>
    `
  },
  {
    id: "react-40",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Authentication", "JWT", "Session", "Security"],
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
    tags: ["useLayoutEffect", "DOM", "Measurement"],
    question: "useLayoutEffect vs useEffect — পার্থক্য কী? কখন useLayoutEffect ব্যবহার করবেন?",
    answer: `
      <h4>মূল পার্থক্য — Timing:</h4>
      <ul>
        <li><strong>useEffect:</strong> ব্রাউজার paint-এর <em>পরে</em> চলে (asynchronous)।</li>
        <li><strong>useLayoutEffect:</strong> DOM mutation-এর <em>পরে</em> কিন্তু paint-এর <em>আগে</em> চলে (synchronous)।</li>
      </ul>
      <p>DOM মেজারমেন্ট (যেমন Tooltip এর পজিশন ক্যালকুলেশন) করতে হলে <code>useLayoutEffect</code> ব্যবহার করুন যাতে স্ক্রিনে ফ্লিকার (flicker) না হয়। বাকি সব ক্ষেত্রে <code>useEffect</code>।</p>
    `
  },
  {
    id: "react-42",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Code Review", "Architecture", "Best Practices"],
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
    tags: ["Fragment", "Key", "Wrapper"],
    question: "React Fragment কী? কখন এবং কেন ব্যবহার করবেন?",
    answer: `
      <p><strong>Fragment</strong> একাধিক element-কে group করে extra DOM node যোগ না করে। এটি CSS layout (যেমন Flexbox বা Table) নষ্ট হওয়া থেকে বাঁচায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Short syntax
function TableRow() {
  return (
    <>
      <td>Name</td>
      <td>Age</td>
    </>
  );
}

// Keyed Fragment (লিস্টে key দিতে হলে শর্ট সিনট্যাক্স কাজ করবে না)
items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
));</code></pre>
      </div>
    `
  },
  {
    id: "react-44",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Data Fetching", "TanStack Query", "SWR", "Caching"],
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
    tags: ["State", "Immutability", "Spread Operator"],
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
    tags: ["Event Handling", "Synthetic Events"],
    question: "React-এ Event Handling কীভাবে কাজ করে? Synthetic Events কী?",
    answer: `
      <p>React নিজস্ব <strong>Synthetic Event</strong> system ব্যবহার করে যা cross-browser compatibility নিশ্চিত করে। এটি ব্রাউজারের নেটিভ ইভেন্টের একটি র‍্যাপার।</p>
      <ul>
        <li>Event names camelCase: <code>onClick</code>, <code>onChange</code>।</li>
        <li>React 17+ থেকে events root element-এ delegate হয়।</li>
      </ul>
    `
  },
  {
    id: "react-47",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Performance", "Lighthouse", "Core Web Vitals"],
    question: "React অ্যাপে Core Web Vitals (LCP, INP, CLS) কীভাবে optimize করবেন?",
    answer: `
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> মূল content কত দ্রুত দেখায়। (Optimization: Image preload, SSR, Critical CSS)।</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> page layout কতটা stable। (Optimization: Image এর width/height দিন, Skeleton UI ব্যবহার করুন)।</li>
        <li><strong>INP (Interaction to Next Paint):</strong> FID এর বদলে এটি এসেছে। ইউজার ইন্টারঅ্যাকশনের রেসপন্স টাইম মাপে। (Optimization: Long tasks break করুন, <code>useTransition</code> ব্যবহার করুন)।</li>
      </ul>
    `
  },
  {
    id: "react-48",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Migration", "Upgrade", "Legacy"],
    question: "Legacy React (Class components, Redux) থেকে Modern React-ে কীভাবে migrate করবেন?",
    answer: `
      <p>Strangler Fig Pattern ব্যবহার করে incremental migration করুন।</p>
      <ol>
        <li>নতুন feature গুলো hooks + functional components দিয়ে লিখুন।</li>
        <li>পুরোনো class components একটি একটি করে convert করুন।</li>
        <li>Redux-এর API fetching গুলো React Query তে নিয়ে যান।</li>
        <li>E2E tests আগে লিখুন, তারপর refactor করুন যাতে কোনো feature break না হয়।</li>
      </ol>
    `
  },
  {
    id: "react-49",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["CI/CD", "Deployment", "DevOps"],
    question: "React অ্যাপের CI/CD pipeline কীভাবে সেটআপ করবেন? Production deployment best practices কী?",
    answer: `
      <h4>Production Deployment Checklist:</h4>
      <ul>
        <li>✅ Linting, Type-checking, Unit tests চালানো।</li>
        <li>✅ Source maps hidden বা Sentry-এ upload করা।</li>
        <li>✅ CDN + edge caching configure করা।</li>
        <li>✅ Preview deployments (PR preview) সেটআপ করা।</li>
        <li>✅ Rollback strategy (instant rollback capability)।</li>
        <li>✅ Feature flags (LaunchDarkly) ব্যবহার করা।</li>
      </ul>
    `
  },
  {
    id: "react-50",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Interview", "System Design", "Architecture"],
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
    tags: ["Hooks Rules", "Closure", "Stale State"],
    question: "React Hooks-এর Rules কী কী? Stale closure সমস্যা কী এবং কীভাবে সমাধান করবেন?",
    answer: `
      <p><strong>Stale Closure</strong> তখন ঘটে যখন কোনো ইভেন্ট হ্যান্ডলার বা useEffect পুরোনো state ভ্যালু ধরে রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Stale closure — count সবসময় 0 থাকবে
useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // সবসময় 0 + 1 = 1!
  }, 1000);
  return () => clearInterval(interval);
}, []); 

// ✅ সমাধান: Functional updater
setCount(prev => prev + 1);</code></pre>
      </div>
    `
  },
  {
    id: "react-52",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Animation", "Framer Motion", "Transition"],
    question: "React-ে smooth animations কীভাবে করবেন? Framer Motion কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>Modern React অ্যাপে animations ব্যবহারকারীর অভিজ্ঞতা উল্লেখযোগ্যভাবে উন্নত করে। <strong>Framer Motion</strong> সবচেয়ে জনপ্রিয় animation library।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { motion, AnimatePresence } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div></code></pre>
      </div>
    `
  },
  {
    id: "react-53",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["useId", "useSyncExternalStore", "React 18"],
    question: "React 18-এর নতুন hooks — useId এবং useSyncExternalStore কীভাবে কাজ করে?",
    answer: `
      <p><strong>useId:</strong> SSR ও CSR-এ consistent unique ID তৈরি করে। (Accessibility এর জন্য জরুরি)।</p>
      <p><strong>useSyncExternalStore:</strong> External store (যেমন- Zustand, Redux বা Browser API) কে React এর concurrent features এর সাথে নিরাপদে sync করতে সাহায্য করে। Tearing (একই রেন্ডারে ভিন্ন ভিন্ন ডাটা দেখা) প্রতিরোধ করে।</p>
    `
  },
  {
    id: "react-54",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Patterns", "Inversion of Control", "Headless"],
    question: "Headless Component Pattern কী? কেন এটি modern React library design-এ জনপ্রিয়?",
    answer: `
      <p><strong>Headless Components</strong> behavior/logic provide করে কিন্তু কোনো UI/styling নেই। Consumer সম্পূর্ণ UI নিয়ন্ত্রণ করে। (Examples: Radix UI, TanStack Table, Downshift)।</p>
      <p>এতে Accessibility এবং complex logic (যেমন Autocomplete) বিল্ট-ইন থাকে, কিন্তু ডিজাইনার চাইলে নিজের মতো CSS করতে পারে।</p>
    `
  },
  {
    id: "react-55",
    category: "React.js",
    difficulty: "Beginner",
    tags: ["Setup", "Create React App", "Vite"],
    question: "নতুন React প্রজেক্ট সেটআপ করার আধুনিক পদ্ধতি কী? CRA কি এখনও ব্যবহার করা উচিত?",
    answer: `
      <p><strong>Create React App (CRA)</strong> officially deprecated হয়ে গেছে। 2024+ এ নতুন React প্রজেক্ট শুরু করার recommended উপায়গুলো:</p>
      <ol>
        <li><strong>Vite (SPA):</strong> সবচেয়ে দ্রুত dev server।</li>
        <li><strong>Next.js (Full-stack):</strong> SSR, SSG, API routes।</li>
        <li><strong>Remix:</strong> Full-stack, nested routing, form handling।</li>
      </ol>
      <p><strong>⚠️ CRA ব্যবহার করবেন না!</strong> এটি আর maintain হচ্ছে না।</p>
    `
  }
];