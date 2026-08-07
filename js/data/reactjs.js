const reactjsQuestions = [
  {
    id: "react-1",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Virtual DOM", "Reconciliation", "Fiber"],
    question: "React-এর Virtual DOM এবং Reconciliation Algorithm কীভাবে কাজ করে? Fiber Architecture কী?",
    answer: `
      <p><strong>Virtual DOM</strong> হলো ব্রাউজারের Real DOM-এর একটি লাইটওয়েট JavaScript অবজেক্ট রিপ্রেজেন্টেশন। React প্রতিটি রেন্ডারে একটি নতুন Virtual DOM Tree তৈরি করে এবং আগের Tree-এর সাথে তুলনা (Diffing) করে।</p>
      <h4>Reconciliation Process:</h4>
      <ol>
        <li><strong>Diffing Algorithm:</strong> React দুটি Virtual DOM Tree-কে তুলনা করে এবং সর্বনিম্ন সংখ্যক পরিবর্তন খুঁজে বের করে।</li>
        <li><strong>Batch Update:</strong> সব পরিবর্তন একসাথে Real DOM-এ অ্যাপ্লাই করা হয় (Batch DOM Manipulation)।</li>
        <li><strong>Key Prop:</strong> লিস্ট রেন্ডারে <code>key</code> prop ব্যবহার করে React বুঝতে পারে কোন element নতুন, কোনটি সরানো হয়েছে, কোনটি মুছে গেছে।</li>
      </ol>
      <h4>Fiber Architecture (React 16+):</h4>
      <ul>
        <li><strong>Incremental Rendering:</strong> Fiber বড় রেন্ডার কাজকে ছোট ছোট ইউনিটে ভাগ করে। প্রতিটি ইউনিটকে "fiber" বলা হয়।</li>
        <li><strong>Priority-based Scheduling:</strong> User interaction (click, type) হাই প্রায়োরিটি পায়, আর data fetching লো প্রায়োরিটি পায়।</li>
        <li><strong>Concurrent Mode:</strong> Fiber-এর কারণে React একাধিক রেন্ডার একই সাথে প্রসেস করতে পারে এবং যেকোনো সময় pause/resume করতে পারে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Virtual DOM কাজের ধারা:
// 1. State পরিবর্তন হলো
setState({ count: count + 1 });

// 2. নতুন Virtual DOM Tree তৈরি হয়
// 3. আগের Tree-এর সাথে Diff হয়
// 4. শুধুমাত্র পরিবর্তিত অংশ Real DOM-এ আপডেট হয়

// Fiber Priority Example:
// High: User clicks, typing → Immediate render
// Low: Data fetch, analytics → Deferred render</code></pre>
      </div>
    `
  },
  {
    id: "react-2",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Hooks", "useState", "useReducer", "State Management"],
    question: "useState vs useReducer - কখন কোনটি ব্যবহার করবেন? Complex state management-এ useReducer কেন ভালো?",
    answer: `
      <p>Senior Developer হিসেবে সঠিক state management pattern বাছাই করা গুরুত্বপূর্ণ।</p>
      <h4>useState ব্যবহার করুন যখন:</h4>
      <ul>
        <li>State সিম্পল (primitive value বা ছোট object)</li>
        <li>State transitions সোজা (direct replacement)</li>
        <li>কম সংখ্যক related state আছে</li>
      </ul>
      <h4>useReducer ব্যবহার করুন যখন:</h4>
      <ul>
        <li>Complex state object (nested data, multiple related fields)</li>
        <li>State transition logic জটিল (conditional updates, computed states)</li>
        <li>Multiple sub-values একসাথে আপডেট করতে হয়</li>
        <li>Next state, previous state-এর উপর নির্ভরশীল</li>
        <li>Testing-এ reducer function আলাদাভাবে test করা যায়</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// useReducer for complex form state
const initialState = {
  values: { name: '', email: '', role: '' },
  errors: {},
  isSubmitting: false,
  isDirty: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        isDirty: true,
        errors: { ...state.errors, [action.field]: null }
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors, isSubmitting: false };
    case 'SUBMIT':
      return { ...state, isSubmitting: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(formReducer, initialState);

// ব্যবহার:
dispatch({ type: 'SET_FIELD', field: 'name', value: 'নাজমুল' });
dispatch({ type: 'SUBMIT' });</code></pre>
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
      <p><strong>useEffect</strong> হলো React-এর side effect হ্যান্ডলিং hook। Senior developer হিসেবে এর সঠিক ব্যবহার না জানলে performance issues এবং memory leaks হতে পারে।</p>
      <h4>Dependency Array Rules:</h4>
      <ul>
        <li><code>useEffect(() => {}, [])</code> — শুধুমাত্র mount-এ একবার চলে (componentDidMount)</li>
        <li><code>useEffect(() => {})</code> — প্রতি render-এ চলে (সাধারণত ভুল)</li>
        <li><code>useEffect(() => {}, [dep1, dep2])</code> — dep1 বা dep2 পরিবর্তন হলে চলে</li>
      </ul>
      <h4>Common Pitfalls ও Memory Leak Prevention:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Memory Leak: Component unmount হলেও setState হচ্ছে
useEffect(() => {
  fetch('/api/data').then(res => res.json())
    .then(data => setData(data)); // unmount-এর পরেও চলতে পারে
}, []);

// ✅ AbortController দিয়ে cleanup
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

// ✅ Subscription cleanup
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (event) => setMessages(prev => [...prev, event.data]);
  
  return () => ws.close(); // WebSocket বন্ধ করুন
}, []);

// ✅ Timer cleanup
useEffect(() => {
  const intervalId = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(intervalId);
}, []);</code></pre>
      </div>
      <h4>Lead Developer Tip:</h4>
      <p>Custom hook তৈরি করুন যাতে সব data fetching-এ automatic cleanup থাকে। এতে টিমের সবাই consistent pattern ফলো করবে।</p>
    `
  },
  {
    id: "react-4",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["useMemo", "useCallback", "Performance", "Re-render"],
    question: "useMemo এবং useCallback কখন ব্যবহার করবেন? অতিরিক্ত ব্যবহারের সমস্যা কী?",
    answer: `
      <p>Performance optimization-এ <strong>useMemo</strong> এবং <strong>useCallback</strong> গুরুত্বপূর্ণ, কিন্তু অতিরিক্ত ব্যবহার করলে উল্টো performance খারাপ হতে পারে।</p>
      <h4>useMemo — Expensive computation ক্যাশ করে:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ ভালো: Expensive filter/sort operation
const filteredProducts = useMemo(() => {
  return products
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => a.price - b.price);
}, [products, selectedCategory]);

// ❌ খারাপ: Simple computation memoize করার দরকার নেই
const fullName = useMemo(() => firstName + ' ' + lastName, [firstName, lastName]);
// সরাসরি লিখুন: const fullName = firstName + ' ' + lastName;</code></pre>
      </div>
      <h4>useCallback — Function reference স্থির রাখে:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ ভালো: Child component React.memo দিয়ে wrapped
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);

// React.memo child — useCallback ছাড়া প্রতি render-এ re-render হবে
const ItemList = React.memo(({ items, onDelete }) => {
  return items.map(item => <Item key={item.id} onDelete={onDelete} />);
});

// ❌ খারাপ: Child React.memo না হলে useCallback অর্থহীন
const handleClick = useCallback(() => {
  console.log('clicked');
}, []); // child memo না হলে এটার কোনো লাভ নেই</code></pre>
      </div>
      <h4>Lead Developer Guideline:</h4>
      <p>টিমকে বলুন: "প্রথমে profile করুন, তারপর optimize করুন।" React DevTools Profiler দিয়ে re-render খুঁজে বের করুন, তারপর targeted memoization করুন।</p>
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
      <h4>Custom Hook Design Principles:</h4>
      <ol>
        <li>নাম অবশ্যই <code>use</code> দিয়ে শুরু হবে</li>
        <li>একটি নির্দিষ্ট concern handle করবে (Single Responsibility)</li>
        <li>Internal state ও side effects encapsulate করবে</li>
        <li>Composable হবে — অন্য hooks-এর সাথে মিলিয়ে ব্যবহার করা যাবে</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// useApi — Data fetching hook with loading, error, retry
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      const res = await fetch(url, { ...options, signal: controller.signal });
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}

// ব্যবহার:
const { data: users, loading, error, refetch } = useApi('/api/users');

// useDebounce — Search input optimization
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// useLocalStorage — Persistent state
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setValue = useCallback((value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
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
      <h4>সমস্যা:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ সমস্যা: একটি বড় context
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState([]);

  // theme পরিবর্তন হলে user ও notifications consume করা
  // সব component-ও re-render হবে!
  return (
    <AppContext.Provider value={{ user, theme, notifications, setUser, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}</code></pre>
      </div>
      <h4>সমাধান ১: Context Splitting</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ আলাদা context — শুধু সংশ্লিষ্ট consumer re-render হবে
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

// ✅ State এবং Dispatch আলাদা context
const UserStateContext = createContext();
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

// Component শুধু dispatch চাইলে state পরিবর্তনে re-render হবে না
const setUser = useContext(UserDispatchContext);</code></pre>
      </div>
      <h4>সমাধান ২: useMemo দিয়ে value memoize</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  // value object memoize করুন
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}</code></pre>
      </div>
    `
  },
  {
    id: "react-7",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["HOC", "Render Props", "Compound Components"],
    question: "Higher-Order Components (HOC), Render Props এবং Compound Components Pattern কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p>React-এ code reuse-এর জন্য তিনটি প্রধান advanced pattern আছে। Senior developer হিসেবে সঠিক pattern বাছাই করতে হবে।</p>
      <h4>1. Higher-Order Component (HOC):</h4>
      <p>একটি function যা component নেয় এবং enhanced component রিটার্ন করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// withAuth HOC — Authentication check
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;
    return <WrappedComponent {...props} user={user} />;
  };
}
const ProtectedDashboard = withAuth(Dashboard);</code></pre>
      </div>
      <h4>2. Render Props:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Mouse position tracker
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return render(position);
}
// ব্যবহার:
<MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} /></code></pre>
      </div>
      <h4>3. Compound Components (Best for UI Libraries):</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Tabs compound component
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}
Tabs.Tab = function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return <button className={activeTab === id ? 'active' : ''} 
    onClick={() => setActiveTab(id)}>{children}</button>;
};
Tabs.Panel = function Panel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === id ? <div>{children}</div> : null;
};

// ব্যবহার — খুবই পরিষ্কার API:
<Tabs defaultTab="overview">
  <Tabs.Tab id="overview">Overview</Tabs.Tab>
  <Tabs.Tab id="settings">Settings</Tabs.Tab>
  <Tabs.Panel id="overview"><Overview /></Tabs.Panel>
  <Tabs.Panel id="settings"><Settings /></Tabs.Panel>
</Tabs></code></pre>
      </div>
      <p><strong>Lead Developer Decision:</strong> Modern React-এ Custom Hooks প্রায়ই HOC ও Render Props-কে replace করে। কিন্তু Compound Components UI library-তে এখনও অপরিহার্য।</p>
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
        <li><strong>Server State:</strong> API থেকে আসা data (caching, sync, invalidation প্রয়োজন) → <strong>React Query / TanStack Query</strong></li>
        <li><strong>Client State:</strong> UI state, form state, user preferences → <strong>Zustand / Redux Toolkit</strong></li>
        <li><strong>URL State:</strong> Filters, pagination, search → <strong>URL params / React Router</strong></li>
      </ul>
      <h4>তুলনা:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Redux Toolkit</th>
          <th style="text-align:left; padding:8px;">Zustand</th>
          <th style="text-align:left; padding:8px;">React Query</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Bundle Size</td><td style="padding:8px;">~12KB</td><td style="padding:8px;">~1KB</td><td style="padding:8px;">~13KB</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Boilerplate</td><td style="padding:8px;">Medium</td><td style="padding:8px;">Very Low</td><td style="padding:8px;">Low</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Best For</td><td style="padding:8px;">Complex client state</td><td style="padding:8px;">Simple-medium state</td><td style="padding:8px;">Server state</td>
        </tr>
        <tr>
          <td style="padding:8px;">DevTools</td><td style="padding:8px;">Excellent</td><td style="padding:8px;">Good</td><td style="padding:8px;">Excellent</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Zustand — সবচেয়ে সহজ (Small-Medium প্রজেক্ট)
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter(i => i.id !== id) 
  })),
  total: 0,
}));

// React Query — Server state (API data)
const { data, isLoading } = useQuery({
  queryKey: ['users', page],
  queryFn: () => fetch(\`/api/users?page=\${page}\`).then(r => r.json()),
  staleTime: 5 * 60 * 1000, // 5 minutes cache
});</code></pre>
      </div>
      <p><strong>Lead Decision:</strong> বেশিরভাগ মডার্ন অ্যাপে React Query (server state) + Zustand (client state) সবচেয়ে কার্যকর combination।</p>
    `
  },
  {
    id: "react-9",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["React.memo", "Performance", "Profiling", "Re-render"],
    question: "React-এ unnecessary re-renders কীভাবে চিহ্নিত করবেন এবং optimize করবেন? Production-এ performance profiling কীভাবে করবেন?",
    answer: `
      <p>Re-render optimization হলো Senior Developer-এর অন্যতম গুরুত্বপূর্ণ দক্ষতা।</p>
      <h4>Re-render কখন হয়:</h4>
      <ol>
        <li>State পরিবর্তন হলে (নিজের বা parent-এর)</li>
        <li>Props পরিবর্তন হলে</li>
        <li>Context value পরিবর্তন হলে</li>
        <li>Parent re-render হলে (default behavior)</li>
      </ol>
      <h4>Optimization Strategies:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. React.memo — শুধুমাত্র props পরিবর্তন হলে re-render
const ExpensiveList = React.memo(({ items, onSelect }) => {
  console.log('List rendered'); // শুধু items/onSelect পরিবর্তনে
  return items.map(item => (
    <div key={item.id} onClick={() => onSelect(item.id)}>
      {item.name}
    </div>
  ));
});

// 2. Children pattern — parent re-render হলেও children re-render হবে না
function Layout({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {children} {/* children re-render হবে না! */}
    </div>
  );
}

// 3. State colocation — State-কে যতটা সম্ভব নিচে রাখুন
// ❌ খারাপ: App level-এ search state
// ✅ ভালো: SearchBar component-এ search state

// 4. Profiling
// React DevTools > Profiler tab > Record
// "Why did this render?" option চালু করুন
// Flamegraph দেখে কোন component ধীরগতির খুঁজে বের করুন</code></pre>
      </div>
    `
  },
  {
    id: "react-10",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Suspense", "Lazy Loading", "Code Splitting"],
    question: "React Suspense, lazy loading এবং Code Splitting কীভাবে implement করবেন? Production-এ loading strategy কী হওয়া উচিত?",
    answer: `
      <p>বড় অ্যাপ্লিকেশনে initial bundle size কমানো critical। React.lazy এবং Suspense দিয়ে route-based এবং component-based code splitting করা যায়।</p>
      <h4>Route-based Code Splitting:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Dynamic import — আলাদা chunk হিসেবে bundle হবে
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import(
  /* webpackChunkName: "analytics" */ './pages/Analytics'
));

function App() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}

// Nested Suspense — granular loading states
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <LazyChart />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <LazyDataTable />
      </Suspense>
    </div>
  );
}

// Preloading — hover-এ load করুন navigation-এর আগে
const SettingsPage = lazy(() => import('./pages/Settings'));
function NavLink() {
  const preload = () => import('./pages/Settings');
  return <Link to="/settings" onMouseEnter={preload}>Settings</Link>;
}</code></pre>
      </div>
      <p><strong>Lead Tip:</strong> Webpack Bundle Analyzer ব্যবহার করে দেখুন কোন module কত বড়, তারপর strategic splitting করুন।</p>
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
        <pre><code>class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Error logging service-এ পাঠান (Sentry, DataDog)
    logErrorToService(error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>কিছু একটা ভুল হয়েছে</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            আবার চেষ্টা করুন
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre>{this.state.error?.toString()}</pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

// Strategic placement — granular boundaries
function App() {
  return (
    <ErrorBoundary> {/* Top level fallback */}
      <Header />
      <ErrorBoundary fallback={<WidgetError />}> {/* Widget level */}
        <DashboardWidgets />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ChartError />}> {/* Chart level */}
        <Charts />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// react-error-boundary library (recommended)
import { ErrorBoundary } from 'react-error-boundary';
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onError={(error) => logToSentry(error)}
  onReset={() => queryClient.invalidateQueries()}
>
  <App />
</ErrorBoundary></code></pre>
      </div>
    `
  },
  {
    id: "react-12",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["useRef", "forwardRef", "DOM"],
    question: "useRef-এর বিভিন্ন ব্যবহার কী কী? forwardRef কেন দরকার?",
    answer: `
      <p><strong>useRef</strong> দুটি প্রধান কাজে ব্যবহৃত হয়: DOM element অ্যাক্সেস এবং mutable value ধরে রাখা যা re-render trigger করে না।</p>
      <h4>ব্যবহার ১: DOM Access</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function SearchInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus(); // Auto focus on mount
  }, []);
  
  return <input ref={inputRef} placeholder="Search..." />;
}</code></pre>
      </div>
      <h4>ব্যবহার ২: Previous value track করা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

// Timer / interval ID ধরে রাখা
function Timer() {
  const intervalRef = useRef(null);
  const start = () => {
    intervalRef.current = setInterval(() => console.log('tick'), 1000);
  };
  const stop = () => clearInterval(intervalRef.current);
  return <><button onClick={start}>Start</button><button onClick={stop}>Stop</button></>;
}</code></pre>
      </div>
      <h4>forwardRef — Parent থেকে child-এর DOM access:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const FancyInput = forwardRef((props, ref) => (
  <input ref={ref} className="fancy-input" {...props} />
));

// Parent component
function Form() {
  const inputRef = useRef();
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}</code></pre>
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
      <p><strong>React Server Components</strong> হলো React-এর নতুন paradigm যেখানে component সার্ভারে render হয় এবং শুধুমাত্র HTML/output ক্লায়েন্টে পাঠানো হয়। কোনো JavaScript bundle ক্লায়েন্টে যায় না।</p>
      <h4>Server vs Client Components:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Server Component</th>
          <th style="text-align:left; padding:8px;">Client Component</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Directive</td><td style="padding:8px;">Default (কোনো directive নেই)</td><td style="padding:8px;">'use client'</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">useState/useEffect</td><td style="padding:8px;">❌ ব্যবহার করা যায় না</td><td style="padding:8px;">✅ ব্যবহার করা যায়</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Data Fetching</td><td style="padding:8px;">সরাসরি async/await</td><td style="padding:8px;">useEffect বা React Query</td>
        </tr>
        <tr>
          <td style="padding:8px;">Bundle Size Impact</td><td style="padding:8px;">Zero — JS পাঠায় না</td><td style="padding:8px;">Bundle-এ যোগ হয়</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server Component (default) — no 'use client'
async function UserProfile({ userId }) {
  const user = await db.users.findById(userId); // সরাসরি DB query!
  return <div><h2>{user.name}</h2><p>{user.bio}</p></div>;
}

// Client Component — interactive elements
'use client';
function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>
    {liked ? '❤️' : '🤍'}
  </button>;
}

// React 19 New Features:
// 1. useActionState — form actions
// 2. useOptimistic — optimistic UI updates
// 3. use() — Promise/Context unwrapping
// 4. ref as prop — forwardRef আর লাগবে না</code></pre>
      </div>
    `
  },
  {
    id: "react-14",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Testing", "React Testing Library", "Jest"],
    question: "React component testing-এর best practices কী? Integration test vs Unit test কীভাবে লিখবেন?",
    answer: `
      <p>Senior Developer হিসেবে testing strategy নির্ধারণ করা আপনার দায়িত্ব। React Testing Library ব্যবহারকারীর দৃষ্টিভঙ্গি থেকে test লিখতে encourage করে।</p>
      <h4>Testing Philosophy:</h4>
      <ul>
        <li>"Implementation details test করবেন না, behavior test করুন।"</li>
        <li>ব্যবহারকারী কীভাবে interact করে সেভাবে test লিখুন</li>
        <li>Test pyramid: বেশি integration, কম unit, সবচেয়ে কম E2E</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Component test
test('login form validates and submits', async () => {
  const mockLogin = jest.fn();
  render(<LoginForm onLogin={mockLogin} />);

  // ব্যবহারকারীর মতো interact করুন
  await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  // Assertions
  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'password123'
    });
  });
});

// Hook test
import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});

// API integration test
test('displays user data after loading', async () => {
  server.use(
    rest.get('/api/users', (req, res, ctx) => 
      res(ctx.json([{ id: 1, name: 'নাজমুল' }]))
    )
  );
  render(<UserList />);
  expect(await screen.findByText('নাজমুল')).toBeInTheDocument();
});</code></pre>
      </div>
    `
  },
  {
    id: "react-15",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Form", "React Hook Form", "Validation"],
    question: "React-এ complex form handling কীভাবে করবেন? React Hook Form vs Formik — কোনটি ভালো?",
    answer: `
      <p>Complex form (multi-step, dynamic fields, file upload, conditional validation) হ্যান্ডল করা Senior Developer-এর গুরুত্বপূর্ণ দক্ষতা।</p>
      <h4>React Hook Form (Recommended):</h4>
      <ul>
        <li>Uncontrolled components ব্যবহার করে — কম re-render</li>
        <li>বড় ফর্মে Formik-এর চেয়ে অনেক দ্রুত</li>
        <li>Zod/Yup integration সহজ</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষর'),
  email: z.string().email('সঠিক ইমেইল দিন'),
  skills: z.array(z.object({
    name: z.string().min(1),
    level: z.enum(['beginner', 'intermediate', 'advanced'])
  })).min(1, 'কমপক্ষে একটি skill যোগ করুন')
});

function ProfileForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { skills: [{ name: '', level: 'beginner' }] }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

  const onSubmit = async (data) => {
    await api.updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(\`skills.\${index}.name\`)} />
          <select {...register(\`skills.\${index}.level\`)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', level: 'beginner' })}>
        + Add Skill
      </button>
      <button type="submit">Save</button>
    </form>
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
    question: "React Router v6-এর নতুন features কী কী? Protected routes কীভাবে implement করবেন?",
    answer: `
      <p>React Router v6 অনেক breaking changes এনেছে। Senior developer হিসেবে v6-এর patterns জানা জরুরি।</p>
      <h4>v6 Key Changes:</h4>
      <ul>
        <li><code>&lt;Switch&gt;</code> → <code>&lt;Routes&gt;</code></li>
        <li><code>component</code> prop → <code>element</code> prop</li>
        <li>Nested routes সহজ হয়েছে (<code>&lt;Outlet /&gt;</code>)</li>
        <li><code>useNavigate()</code> replaced <code>useHistory()</code></li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// App routing with layouts
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected layout */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Route>
      
      <Route path="*" element={<NotFound />} />
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
      <p>বড় organization-এ একাধিক টিম একই অ্যাপে কাজ করলে Micro-Frontend architecture ব্যবহার করা হয়। Lead Developer হিসেবে এটি একটি critical architectural decision।</p>
      <h4>Micro-Frontend Approaches:</h4>
      <ol>
        <li><strong>Module Federation (Webpack 5):</strong> Runtime-এ আলাদা build-এর component share করে</li>
        <li><strong>iframe:</strong> সবচেয়ে isolated কিন্তু UX খারাপ</li>
        <li><strong>Web Components:</strong> Framework-agnostic কিন্তু complex</li>
        <li><strong>Build-time integration:</strong> NPM packages হিসেবে (monorepo)</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Module Federation — webpack.config.js (Host App)
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    dashboard: 'dashboard@http://localhost:3001/remoteEntry.js',
    payments: 'payments@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true },
  },
});

// Host App — lazy load remote component
const RemoteDashboard = React.lazy(() => import('dashboard/DashboardApp'));
const RemotePayments = React.lazy(() => import('payments/PaymentForm'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard/*" element={<RemoteDashboard />} />
        <Route path="/payments/*" element={<RemotePayments />} />
      </Routes>
    </Suspense>
  );
}</code></pre>
      </div>
      <h4>Lead Decision Points:</h4>
      <ul>
        <li>টিম সাইজ ১০+ এবং আলাদা deploy cycle দরকার হলেই Micro-Frontend বিবেচনা করুন</li>
        <li>Shared dependency (React version) management critical</li>
        <li>Cross-MFE communication-এর জন্য Custom Events বা shared state (Zustand) ব্যবহার করুন</li>
      </ul>
    `
  },
  {
    id: "react-18",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["JSX", "Babel", "createElement"],
    question: "JSX আসলে কী? ব্রাউজার কীভাবে JSX বোঝে? Babel এখানে কী ভূমিকা পালন করে?",
    answer: `
      <p><strong>JSX</strong> হলো JavaScript-এর একটি syntax extension যা HTML-এর মতো দেখতে কিন্তু আসলে JavaScript function call-এ রূপান্তরিত হয়।</p>
      <h4>JSX → JavaScript রূপান্তর:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// আপনি লিখেন (JSX):
const element = (
  <div className="card">
    <h1>Hello {name}</h1>
    <Button onClick={handleClick}>Click Me</Button>
  </div>
);

// Babel রূপান্তর করে (React 17+, automatic runtime):
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const element = _jsxs("div", {
  className: "card",
  children: [
    _jsx("h1", { children: ["Hello ", name] }),
    _jsx(Button, { onClick: handleClick, children: "Click Me" })
  ]
});

// পুরাতন পদ্ধতি (React 16):
const element = React.createElement("div", { className: "card" },
  React.createElement("h1", null, "Hello ", name),
  React.createElement(Button, { onClick: handleClick }, "Click Me")
);</code></pre>
      </div>
      <h4>JSX Rules:</h4>
      <ul>
        <li>Single root element return করতে হবে (Fragment <code>&lt;&gt;...&lt;/&gt;</code> ব্যবহার করা যায়)</li>
        <li><code>class</code> → <code>className</code>, <code>for</code> → <code>htmlFor</code></li>
        <li>Self-closing tags অবশ্যই বন্ধ করতে হবে: <code>&lt;img /&gt;</code></li>
        <li>JavaScript expressions <code>{}</code> curly braces-এ লিখতে হবে</li>
      </ul>
    `
  },
  {
    id: "react-19",
    category: "React.js",
    difficulty: "Beginner",
    tags: ["Component", "Props", "State"],
    question: "React-এ Functional Component কী? Props এবং State-এর মধ্যে পার্থক্য কী?",
    answer: `
      <p><strong>Functional Component</strong> হলো একটি JavaScript function যা JSX return করে। React 16.8 থেকে Hooks আসার পর Class Component-এর প্রয়োজনীয়তা প্রায় শেষ হয়ে গেছে।</p>
      <h4>Props vs State:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Props</th>
          <th style="text-align:left; padding:8px;">State</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">মালিকানা</td><td style="padding:8px;">Parent component পাঠায়</td><td style="padding:8px;">Component নিজে manage করে</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Mutability</td><td style="padding:8px;">Read-only (Immutable)</td><td style="padding:8px;">পরিবর্তনযোগ্য (setState দিয়ে)</td>
        </tr>
        <tr>
          <td style="padding:8px;">Re-render</td><td style="padding:8px;">Parent re-render হলে</td><td style="padding:8px;">State পরিবর্তন হলে</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Functional Component with Props & State
function UserCard({ name, role, avatarUrl }) { // Props
  const [isFollowing, setIsFollowing] = useState(false); // State

  return (
    <div className="user-card">
      <img src={avatarUrl} alt={name} />
      <h3>{name}</h3>
      <span>{role}</span>
      <button onClick={() => setIsFollowing(!isFollowing)}>
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

// ব্যবহার
<UserCard name="নাজমুল" role="Lead Developer" avatarUrl="/avatar.png" /></code></pre>
      </div>
    `
  },
  {
    id: "react-20",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["List", "Key", "Rendering"],
    question: "React-এ list rendering-এ key prop কেন গুরুত্বপূর্ণ? index কে key হিসেবে ব্যবহার করলে কী সমস্যা হয়?",
    answer: `
      <p><strong>Key</strong> prop React-এর reconciliation algorithm-কে বলে দেয় কোন element নতুন, কোনটি পরিবর্তিত, কোনটি মুছে গেছে।</p>
      <h4>Index key-এর সমস্যা:</h4>
      <ul>
        <li>List reorder হলে সব element re-render হয়</li>
        <li>Item delete/insert হলে wrong component-এ state থেকে যায়</li>
        <li>Input fields-এ ভুল value দেখায়</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ খারাপ: index as key
{items.map((item, index) => (
  <TodoItem key={index} item={item} /> // Reorder করলে bug হবে
))}

// ✅ ভালো: unique, stable ID as key
{items.map((item) => (
  <TodoItem key={item.id} item={item} />
))}

// যদি unique ID না থাকে, তাহলে generate করুন:
const itemsWithId = items.map((item, i) => ({
  ...item,
  _id: item.name + '_' + i // Stable composite key
}));</code></pre>
      </div>
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
      const filtered = hugeDataset.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} />
      {isPending && <Spinner />}
      <ResultList items={results} />
    </div>
  );
}</code></pre>
      </div>
      <h4>useDeferredValue — Heavy child rendering defer করে:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <SlowList query={deferredQuery} /> {/* ধীরে ধীরে আপডেট হবে */}
    </div>
  );
}

// useTransition vs useDeferredValue:
// useTransition → আপনি state update control করেন
// useDeferredValue → আপনি props/value defer করেন</code></pre>
      </div>
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
      <h4>Design System Architecture:</h4>
      <ol>
        <li><strong>Design Tokens:</strong> Colors, spacing, typography, shadows — CSS variables বা theme object</li>
        <li><strong>Primitive Components:</strong> Button, Input, Badge, Card — atomic elements</li>
        <li><strong>Composite Components:</strong> DataTable, Modal, Dropdown — primitive combination</li>
        <li><strong>Patterns/Templates:</strong> Form layouts, page templates</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Composable Button with variants
const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button 
      className={\`\${buttonVariants[variant]} \${buttonSizes[size]} rounded-lg\`}
      {...props}
    >
      {children}
    </button>
  );
}

// Storybook documentation
export default { title: 'Components/Button', component: Button };
export const Primary = { args: { variant: 'primary', children: 'Click Me' } };
export const AllSizes = () => (
  <>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </>
);</code></pre>
      </div>
      <h4>Publishing & Versioning:</h4>
      <ul>
        <li>Monorepo (Turborepo/Nx) দিয়ে manage করুন</li>
        <li>Semantic versioning (semver) ফলো করুন</li>
        <li>Changesets দিয়ে changelog auto-generate করুন</li>
        <li>Chromatic / Percy দিয়ে visual regression testing করুন</li>
      </ul>
    `
  },
  {
    id: "react-23",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Conditional Rendering", "Pattern"],
    question: "React-এ Conditional Rendering-এর বিভিন্ন pattern কী কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p>Conditional rendering React-এর fundamental concept। বিভিন্ন situation-এ বিভিন্ন pattern কার্যকর।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Ternary — দুটি option থাকলে
{isLoggedIn ? <Dashboard /> : <LoginPage />}

// 2. && operator — শুধু truthy হলে দেখাতে
{hasNotification && <NotificationBadge count={count} />}
// ⚠️ সতর্কতা: count 0 হলে "0" দেখাবে
{count > 0 && <Badge count={count} />} // ✅ ভালো

// 3. Early return — complex conditions
function UserProfile({ user }) {
  if (!user) return <LoginPrompt />;
  if (user.isBanned) return <BannedMessage />;
  if (!user.isVerified) return <VerificationRequired />;
  return <ProfileContent user={user} />;
}

// 4. Object mapping — multiple conditions
const statusComponents = {
  loading: <Spinner />,
  error: <ErrorMessage />,
  success: <DataTable />,
  empty: <EmptyState />
};
return statusComponents[status] || <DefaultView />;

// 5. Switch-case pattern for complex logic
function renderStep(step) {
  switch(step) {
    case 1: return <PersonalInfo />;
    case 2: return <ContactDetails />;
    case 3: return <Review />;
    default: return <PersonalInfo />;
  }
}</code></pre>
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
      <p>Accessibility শুধু নৈতিক দায়িত্ব না, অনেক দেশে এটি আইনি requirement (ADA, WCAG)। Senior developer হিসেবে accessible UI তৈরি করা আপনার দায়িত্ব।</p>
      <h4>Common Mistakes ও Solutions:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ div as button — keyboard/screen reader কাজ করে না
<div onClick={handleClick}>Click me</div>

// ✅ Semantic HTML ব্যবহার করুন
<button onClick={handleClick}>Click me</button>

// ❌ Image without alt
<img src="/logo.png" />

// ✅ Descriptive alt text
<img src="/logo.png" alt="Company Logo" />
// Decorative image:
<img src="/divider.png" alt="" role="presentation" />

// ✅ Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-help" />
<span id="email-help">Enter your work email</span>

// ✅ ARIA for custom components
function Dropdown({ isOpen, options, onSelect }) {
  return (
    <div role="listbox" aria-expanded={isOpen} aria-label="Select option">
      {options.map(opt => (
        <div key={opt.id} role="option" aria-selected={opt.selected}
          tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect(opt)}
          onClick={() => onSelect(opt)}>
          {opt.label}
        </div>
      ))}
    </div>
  );
}

// ✅ Focus management
function Modal({ isOpen, onClose, children }) {
  const closeButtonRef = useRef();
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);
  // Focus trap implementation...
}</code></pre>
      </div>
      <h4>Testing Tools:</h4>
      <ul>
        <li><code>eslint-plugin-jsx-a11y</code> — build time checks</li>
        <li><code>@testing-library/jest-dom</code> — toBeAccessible assertions</li>
        <li>Axe DevTools — browser extension</li>
        <li>Lighthouse Accessibility audit</li>
      </ul>
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
      <h4>তুলনা:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Aspect</th>
          <th style="text-align:left; padding:8px;">CSR</th>
          <th style="text-align:left; padding:8px;">SSR</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Initial Load</td><td style="padding:8px;">ধীর (JS download → render)</td><td style="padding:8px;">দ্রুত (HTML ready)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">SEO</td><td style="padding:8px;">দুর্বল</td><td style="padding:8px;">চমৎকার</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Server Load</td><td style="padding:8px;">কম</td><td style="padding:8px;">বেশি</td>
        </tr>
        <tr>
          <td style="padding:8px;">Best For</td><td style="padding:8px;">Dashboard, SPA, internal tools</td><td style="padding:8px;">E-commerce, blog, marketing</td>
        </tr>
      </table>
      <h4>Hydration:</h4>
      <p>SSR-এ সার্ভার HTML পাঠায়, তারপর ক্লায়েন্টে React সেই HTML-এ event listeners যোগ করে interactive বানায়। এই প্রক্রিয়াকে <strong>Hydration</strong> বলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// SSR Flow:
// 1. Server: renderToString(<App />) → HTML string
// 2. Client receives HTML → User sees content immediately
// 3. Client: hydrateRoot(document.getElementById('root'), <App />)
// 4. React attaches event handlers → Page becomes interactive

// Hydration mismatch error (common bug):
// Server: <p>Time: 10:30:00</p>
// Client: <p>Time: 10:30:01</p> ← 1 second difference!
// Fix: useEffect দিয়ে client-only content render করুন

function Clock() {
  const [time, setTime] = useState(null);
  useEffect(() => setTime(new Date().toLocaleTimeString()), []);
  return <p>Time: {time ?? 'Loading...'}</p>;
}</code></pre>
      </div>
    `
  },
  {
    id: "react-26",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Virtualization", "Large List", "Performance"],
    question: "React-এ বিশাল তালিকা (10,000+ items) কীভাবে efficiently render করবেন? Virtualization কী?",
    answer: `
      <p>10,000+ items-এর list সরাসরি render করলে ব্রাউজার freeze হয়ে যায়। <strong>Virtualization</strong> শুধুমাত্র viewport-এ দৃশ্যমান items render করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// react-window (recommended — lightweight)
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style} className="list-item">
      {items[index].name} — {items[index].email}
    </div>
  );

  return (
    <FixedSizeList
      height={600}        // Container height
      itemCount={items.length} // Total items (10,000+)
      itemSize={50}        // Each row height
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}

// Variable size list (different row heights)
import { VariableSizeList } from 'react-window';

function ChatMessages({ messages }) {
  const getItemSize = (index) => messages[index].isLong ? 120 : 50;
  
  return (
    <VariableSizeList
      height={500}
      itemCount={messages.length}
      itemSize={getItemSize}
    >
      {({ index, style }) => (
        <div style={style}>{messages[index].text}</div>
      )}
    </VariableSizeList>
  );
}

// @tanstack/react-virtual (newer, more flexible)
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualTable({ data }) {
  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  // ... render virtual rows
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
    getDuration: () => videoRef.current.duration,
  }));

  return <video ref={videoRef} src={props.src} />;
});

// Parent — শুধুমাত্র exposed methods অ্যাক্সেস করতে পারবে
function App() {
  const playerRef = useRef();
  return (
    <div>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
      <button onClick={() => playerRef.current.seekTo(30)}>Skip to 0:30</button>
    </div>
  );
}</code></pre>
      </div>
      <p><strong>কখন ব্যবহার করবেন:</strong> Custom media players, animation controllers, form components-এ যেখানে parent-কে child-এর নির্দিষ্ট behavior control করতে হয়।</p>
    `
  },
  {
    id: "react-28",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Controlled", "Uncontrolled", "Form"],
    question: "Controlled vs Uncontrolled Components — পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <h4>Controlled Component:</h4>
      <p>React state-ই হলো "single source of truth"। প্রতিটি input পরিবর্তনে state আপডেট হয়।</p>
      <h4>Uncontrolled Component:</h4>
      <p>DOM নিজেই value ম্যানেজ করে। <code>ref</code> দিয়ে value পড়া হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Controlled — React state drives the input
function ControlledForm() {
  const [email, setEmail] = useState('');
  return (
    <input value={email} onChange={(e) => setEmail(e.target.value)} />
    // Real-time validation, formatting সহজ
  );
}

// Uncontrolled — DOM manages the value
function UncontrolledForm() {
  const emailRef = useRef();
  const handleSubmit = () => {
    console.log(emailRef.current.value); // শুধু submit-এ পড়ুন
  };
  return <input ref={emailRef} defaultValue="" />;
}

// Decision Guide:
// Controlled ব্যবহার করুন:
//   - Real-time validation দরকার
//   - Conditional disabling দরকার
//   - Dynamic form fields
//   - Format as you type (phone, currency)

// Uncontrolled ব্যবহার করুন:
//   - Simple forms (নাম-ঠিকানা)
//   - File inputs (always uncontrolled)
//   - React Hook Form ব্যবহার করলে (internally uncontrolled)</code></pre>
      </div>
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
        <li>Parent-এ <code>overflow: hidden</code> থাকলে modal/tooltip কেটে যায়</li>
        <li><code>z-index</code> stacking context সমস্যা</li>
        <li>CSS transform parent-এ থাকলে <code>position: fixed</code> কাজ করে না</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // DOM-এ আলাদা div
  );
}

// index.html-এ:
// <div id="root"></div>
// <div id="modal-root"></div>

// ব্যবহার — React event bubbling Portal-এও কাজ করে!
function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div onClick={() => console.log('Parent click — Portal-এও fire হবে!')}>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Hello from Portal!</h2>
      </Modal>
    </div>
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
    question: "React-এ TypeScript কীভাবে কার্যকরভাবে ব্যবহার করবেন? Generic components কীভাবে লিখবেন?",
    answer: `
      <p>TypeScript React-এ type safety, better DX (autocomplete), এবং bug prevention দেয়। Senior developer হিসেবে proper typing জানা mandatory।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Component Props typing
interface UserCardProps {
  name: string;
  age: number;
  role: 'admin' | 'user' | 'moderator';
  onSelect?: (userId: string) => void; // Optional
  children: React.ReactNode;
}

function UserCard({ name, age, role, onSelect, children }: UserCardProps) {
  return <div>{name} - {role}</div>;
}

// Generic Component — Reusable List
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
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>} // user is typed!
  keyExtractor={(user) => user.id}
/>

// Hook typing
function useToggle(initial: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};</code></pre>
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
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Class Lifecycle</th>
          <th style="text-align:left; padding:8px;">Hook Equivalent</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">componentDidMount</td><td style="padding:8px;"><code>useEffect(() => {}, [])</code></td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">componentDidUpdate</td><td style="padding:8px;"><code>useEffect(() => {}, [deps])</code></td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">componentWillUnmount</td><td style="padding:8px;"><code>useEffect(() => { return () => {} }, [])</code></td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">shouldComponentUpdate</td><td style="padding:8px;"><code>React.memo()</code></td>
        </tr>
        <tr>
          <td style="padding:8px;">getDerivedStateFromProps</td><td style="padding:8px;">Render সময় state আপডেট</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// componentDidMount equivalent
useEffect(() => {
  console.log('Component mounted');
  fetchData();
}, []); // Empty deps = run once on mount

// componentDidUpdate equivalent
useEffect(() => {
  console.log('userId changed, refetching...');
  fetchUserData(userId);
}, [userId]); // Runs when userId changes

// componentWillUnmount equivalent
useEffect(() => {
  const subscription = api.subscribe(handleData);
  
  return () => {
    // Cleanup — runs on unmount
    subscription.unsubscribe();
    console.log('Component unmounted, cleaned up');
  };
}, []);</code></pre>
      </div>
    `
  },
  {
    id: "react-32",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["State Batching", "React 18", "Automatic"],
    question: "React 18-এ Automatic Batching কী? আগের version-এ batching কীভাবে আলাদা ছিল?",
    answer: `
      <p><strong>Batching</strong> মানে একাধিক state update-কে একটি single re-render-এ group করা। React 18-এ এটি automatic এবং সব জায়গায় কাজ করে।</p>
      <h4>React 17 (আগে):</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// React 17 — শুধু event handlers-এ batching ছিল
function handleClick() {
  setCount(c => c + 1); // ✅ Batched
  setFlag(f => !f);     // ✅ Batched — একটি re-render
}

// কিন্তু setTimeout, fetch, native events-এ batching ছিল না!
setTimeout(() => {
  setCount(c => c + 1); // ❌ আলাদা re-render
  setFlag(f => !f);     // ❌ আলাদা re-render — মোট ২টি!
}, 1000);

// React 18 — সব জায়গায় automatic batching!
setTimeout(() => {
  setCount(c => c + 1); // ✅ Batched
  setFlag(f => !f);     // ✅ Batched — একটি re-render!
}, 1000);

fetch('/api/data').then(() => {
  setData(newData);     // ✅ Batched
  setLoading(false);    // ✅ Batched — একটি re-render!
});

// Batching বন্ধ করতে চাইলে (rare case):
import { flushSync } from 'react-dom';
flushSync(() => setCount(c => c + 1)); // Immediate re-render
flushSync(() => setFlag(f => !f));     // Another immediate re-render</code></pre>
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
      <p>React by default JSX-এ HTML escape করে, কিন্তু কিছু ক্ষেত্রে XSS vulnerability তৈরি হতে পারে।</p>
      <h4>React-এর Built-in Protection:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ Safe — React automatically escapes
const userInput = '<script>alert("hacked")</script>';
return <p>{userInput}</p>; // Rendered as text, not executed

// ❌ Dangerous — XSS vulnerable!
return <div dangerouslySetInnerHTML={{ __html: userInput }} />;

// ✅ Safe alternative — sanitize first
import DOMPurify from 'dompurify';
const sanitized = DOMPurify.sanitize(userInput);
return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;

// ❌ URL-based XSS
const userUrl = 'javascript:alert("hacked")';
<a href={userUrl}>Click</a> // XSS!

// ✅ Validate URLs
const isSafeUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch { return false; }
};

// Security Checklist:
// 1. Never trust user input
// 2. Sanitize HTML with DOMPurify
// 3. Validate URLs before rendering
// 4. Use Content-Security-Policy headers
// 5. Keep dependencies updated (npm audit)
// 6. Environment variables: REACT_APP_ prefix only for public data
// 7. Never store secrets in frontend code</code></pre>
      </div>
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
      <h4>Webpack vs Vite:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Webpack</th>
          <th style="text-align:left; padding:8px;">Vite</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Dev Server Start</td><td style="padding:8px;">ধীর (full bundle)</td><td style="padding:8px;">তাৎক্ষণিক (ESM)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">HMR Speed</td><td style="padding:8px;">ধীর (বড় প্রজেক্টে)</td><td style="padding:8px;">খুব দ্রুত</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Config Complexity</td><td style="padding:8px;">জটিল</td><td style="padding:8px;">সহজ</td>
        </tr>
        <tr>
          <td style="padding:8px;">Ecosystem</td><td style="padding:8px;">সবচেয়ে বড়</td><td style="padding:8px;">দ্রুত বড় হচ্ছে</td>
        </tr>
      </table>
      <h4>Bundle Optimization Techniques:</h4>
      <ul>
        <li><strong>Code Splitting:</strong> <code>React.lazy()</code> + dynamic <code>import()</code></li>
        <li><strong>Tree Shaking:</strong> unused exports remove — ESM modules ব্যবহার করুন</li>
        <li><strong>Compression:</strong> gzip/brotli — Nginx-এ configure করুন</li>
        <li><strong>Source Map:</strong> Production-এ hidden source maps ব্যবহার করুন</li>
        <li><strong>Image Optimization:</strong> WebP format, lazy loading, responsive images</li>
        <li><strong>Bundle Analyzer:</strong> <code>webpack-bundle-analyzer</code> বা <code>rollup-plugin-visualizer</code></li>
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
      <p>বড় organization-এ multiple packages (shared UI, utils, apps) একই repository-তে manage করতে Monorepo ব্যবহার করা হয়।</p>
      <h4>Monorepo Structure:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>my-monorepo/
├── apps/
│   ├── web/          # Next.js main app
│   ├── admin/        # Admin dashboard
│   └── mobile/       # React Native app
├── packages/
│   ├── ui/           # Shared component library
│   ├── utils/        # Shared utilities
│   ├── config/       # ESLint, TypeScript configs
│   └── api-client/   # Generated API types
├── turbo.json        # Turborepo config
├── pnpm-workspace.yaml
└── package.json</code></pre>
      </div>
      <h4>Turborepo vs Nx:</h4>
      <ul>
        <li><strong>Turborepo:</strong> Simple, fast, Vercel-backed। ছোট-মাঝারি monorepo-র জন্য আদর্শ।</li>
        <li><strong>Nx:</strong> Feature-rich, code generation, dependency graph visualization। বড় enterprise-এর জন্য।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": { "outputs": [] },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}

// Run all builds with caching:
// npx turbo run build — parallel + cached builds</code></pre>
      </div>
    `
  },
  {
    id: "react-36",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Styling", "CSS Modules", "Styled Components", "Tailwind"],
    question: "React-এ styling approaches — CSS Modules, Styled Components, Tailwind CSS — কোনটি কখন ব্যবহার করবেন?",
    answer: `
      <h4>তুলনা:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Approach</th>
          <th style="text-align:left; padding:8px;">Pros</th>
          <th style="text-align:left; padding:8px;">Cons</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">CSS Modules</td><td style="padding:8px;">Zero runtime, scoped</td><td style="padding:8px;">Verbose, no dynamic</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Styled Components</td><td style="padding:8px;">Dynamic, co-located</td><td style="padding:8px;">Runtime cost, SSR complexity</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Tailwind CSS</td><td style="padding:8px;">Fast development, tiny CSS</td><td style="padding:8px;">Long class names, learning curve</td>
        </tr>
        <tr>
          <td style="padding:8px;">CSS-in-JS (Vanilla Extract, Panda CSS)</td><td style="padding:8px;">Zero runtime + type-safe</td><td style="padding:8px;">Build setup</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// CSS Modules
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>

// Styled Components
const Button = styled.button\`
  background: \${props => props.variant === 'primary' ? '#6366f1' : '#e2e8f0'};
  color: white;
  padding: 0.75rem 1.5rem;
  &:hover { opacity: 0.9; }
\`;

// Tailwind CSS
<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
  Click
</button></code></pre>
      </div>
      <p><strong>Lead Decision:</strong> 2024+ এ Tailwind CSS + CSS Modules combination সবচেয়ে জনপ্রিয়। New project-এ Tailwind recommend করুন। CSS-in-JS library গুলো (Styled Components, Emotion) server components-এ কাজ করে না।</p>
    `
  },
  {
    id: "react-37",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["WebSocket", "Real-time", "Optimistic Update"],
    question: "React-এ Real-time features (WebSocket, SSE) কীভাবে implement করবেন? Optimistic UI কী?",
    answer: `
      <p>Chat, notifications, live dashboard-এ real-time data handling Senior Developer-এর গুরুত্বপূর্ণ দক্ষতা।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Custom hook for WebSocket
function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('connecting');
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setStatus('connected');
    ws.onclose = () => {
      setStatus('disconnected');
      // Auto reconnect after 3 seconds
      setTimeout(() => connectWs(), 3000);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    return () => ws.close();
  }, [url]);

  const send = useCallback((data) => {
    wsRef.current?.send(JSON.stringify(data));
  }, []);

  return { messages, status, send };
}

// Optimistic UI — server response-এর আগেই UI আপডেট
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (text) => {
    const optimisticTodo = { id: Date.now(), text, status: 'pending' };
    
    // 1. আগে UI আপডেট করুন (optimistic)
    setTodos(prev => [...prev, optimisticTodo]);

    try {
      // 2. Server-এ পাঠান
      const savedTodo = await api.createTodo(text);
      // 3. Server response দিয়ে replace
      setTodos(prev => prev.map(t => 
        t.id === optimisticTodo.id ? savedTodo : t
      ));
    } catch {
      // 4. Error হলে rollback
      setTodos(prev => prev.filter(t => t.id !== optimisticTodo.id));
      toast.error('Todo যোগ করা যায়নি');
    }
  };
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
        <pre><code>// i18n setup
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        greeting: 'Hello, {{name}}!',
        items_count: '{{count}} item',
        items_count_plural: '{{count}} items',
      }
    },
    bn: {
      translation: {
        greeting: 'হ্যালো, {{name}}!',
        items_count: '{{count}}টি আইটেম',
      }
    }
  },
  lng: 'bn', // Default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// Component-এ ব্যবহার
function Dashboard() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('greeting', { name: 'নাজমুল' })}</h1>
      <p>{t('items_count', { count: 5 })}</p>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('bn')}>বাংলা</button>
    </div>
  );
}

// Date/Number formatting (Intl API)
const formattedDate = new Intl.DateTimeFormat('bn-BD', {
  year: 'numeric', month: 'long', day: 'numeric'
}).format(new Date()); // "৭ আগস্ট, ২০২৬"

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
      <p><strong>Prop Drilling</strong> হলো props-কে অনেকগুলো intermediate component-এর মধ্য দিয়ে পাস করা, যেখানে middle components সেই props ব্যবহারই করে না।</p>
      <h4>সমাধান ১: Component Composition (Context ছাড়া!):</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Prop Drilling
function App() {
  const [user, setUser] = useState(userData);
  return <Layout user={user} />;      // Level 1
}
function Layout({ user }) {
  return <Sidebar user={user} />;     // Level 2 — user ব্যবহার করে না!
}
function Sidebar({ user }) {
  return <UserAvatar user={user} />;  // Level 3 — user ব্যবহার করে না!
}
function UserAvatar({ user }) {
  return <img src={user.avatar} />;   // Level 4 — এখানে দরকার ছিল!
}

// ✅ Component Composition — children pattern
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

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}

function Sidebar({ children }) {
  return <aside className="sidebar">{children}</aside>;
}

// ✅ Render Props pattern
function Layout({ renderSidebar }) {
  return <div className="layout">{renderSidebar()}</div>;
}

<Layout renderSidebar={() => <UserAvatar user={user} />} /></code></pre>
      </div>
      <p><strong>Rule of thumb:</strong> ২-৩ level prop pass acceptable। তার বেশি হলে composition বা context ব্যবহার করুন।</p>
    `
  },
  {
    id: "react-40",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Authentication", "JWT", "Session", "Security"],
    question: "React অ্যাপে Authentication flow কীভাবে implement করবেন? JWT token কোথায় store করবেন?",
    answer: `
      <p>Authentication হলো প্রতিটি production অ্যাপের মূল ভিত্তি। Token storage একটি critical security decision।</p>
      <h4>Token Storage Options:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Storage</th>
          <th style="text-align:left; padding:8px;">XSS Risk</th>
          <th style="text-align:left; padding:8px;">CSRF Risk</th>
          <th style="text-align:left; padding:8px;">Recommendation</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">localStorage</td><td style="padding:8px;">❌ High</td><td style="padding:8px;">✅ None</td><td style="padding:8px;">⚠️ Avoid for sensitive tokens</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">HttpOnly Cookie</td><td style="padding:8px;">✅ Safe</td><td style="padding:8px;">⚠️ Medium</td><td style="padding:8px;">✅ Best (with CSRF protection)</td>
        </tr>
        <tr>
          <td style="padding:8px;">Memory (variable)</td><td style="padding:8px;">✅ Safe</td><td style="padding:8px;">✅ Safe</td><td style="padding:8px;">✅ Best for access token</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Recommended: HttpOnly cookie (refresh) + Memory (access)
// AuthContext
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Refresh token is in HttpOnly cookie (set by server)
  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    setAccessToken(data.accessToken); // Memory only
    setUser(data.user);
  };

  const refreshToken = async () => {
    // Cookie automatically sent
    const { data } = await api.post('/auth/refresh');
    setAccessToken(data.accessToken);
    return data.accessToken;
  };

  // Axios interceptor for auto-refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401) {
          const newToken = await refreshToken();
          error.config.headers.Authorization = \`Bearer \${newToken}\`;
          return api(error.config); // Retry
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}</code></pre>
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
        <li><strong>useEffect:</strong> ব্রাউজার paint-এর <em>পরে</em> চলে (asynchronous)</li>
        <li><strong>useLayoutEffect:</strong> DOM mutation-এর <em>পরে</em> কিন্তু paint-এর <em>আগে</em> চলে (synchronous)</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// useLayoutEffect ব্যবহার করুন DOM measurement/mutation-এ
function Tooltip({ targetRef, text }) {
  const tooltipRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Paint-এর আগে position calculate — flicker হবে না!
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: targetRect.top - tooltipRect.height - 8,
      left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
    });
  }, []);

  return <div ref={tooltipRef} style={{ position: 'fixed', ...position }}>{text}</div>;
}

// useEffect ব্যবহার করুন বাকি সব কাজে:
// - Data fetching
// - Event listeners
// - Subscriptions
// - Analytics logging
// - Timer/intervals

// ⚠️ useLayoutEffect SSR-এ warning দেয়!
// SSR-এ useEffect ব্যবহার করুন।</code></pre>
      </div>
    `
  },
  {
    id: "react-42",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Code Review", "Architecture", "Best Practices"],
    question: "Lead Developer হিসেবে React code review-তে কী কী দেখবেন? Architecture guidelines কী হওয়া উচিত?",
    answer: `
      <p>Code review শুধু bug খোঁজা না — এটি knowledge sharing, pattern enforcement, এবং team growth-এর মাধ্যম।</p>
      <h4>Code Review Checklist:</h4>
      <ol>
        <li><strong>Component Structure:</strong>
          <ul>
            <li>Component কি একটি কাজ করছে? (Single Responsibility)</li>
            <li>Props কি ৫-এর বেশি? → Component break করা দরকার</li>
            <li>Business logic কি UI থেকে আলাদা? (Custom hooks)</li>
          </ul>
        </li>
        <li><strong>Performance:</strong>
          <ul>
            <li>Unnecessary re-renders আছে কি?</li>
            <li>Large list virtualized কি?</li>
            <li>useEffect-এ cleanup আছে কি?</li>
          </ul>
        </li>
        <li><strong>Security:</strong>
          <ul>
            <li>dangerouslySetInnerHTML sanitized কি?</li>
            <li>User input validated কি?</li>
          </ul>
        </li>
        <li><strong>Accessibility:</strong>
          <ul>
            <li>Semantic HTML ব্যবহার হয়েছে কি?</li>
            <li>Keyboard navigation কাজ করে কি?</li>
          </ul>
        </li>
        <li><strong>Testing:</strong>
          <ul>
            <li>Critical paths tested কি?</li>
            <li>Edge cases covered কি?</li>
          </ul>
        </li>
      </ol>
      <h4>Architecture Guidelines:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>src/
├── components/        # Shared UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.module.css
├── features/          # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   ├── dashboard/
├── hooks/             # Shared custom hooks
├── utils/             # Pure utility functions
├── api/               # API client, interceptors
├── types/             # Shared TypeScript types
└── constants/         # App-wide constants</code></pre>
      </div>
    `
  },
  {
    id: "react-43",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["Fragment", "Key", "Wrapper"],
    question: "React Fragment কী? কখন এবং কেন ব্যবহার করবেন?",
    answer: `
      <p><strong>Fragment</strong> একাধিক element-কে group করে extra DOM node যোগ না করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Extra div wrapper — CSS layout ভেঙে দিতে পারে
function TableRow() {
  return (
    <div> {/* Table-এ div invalid! */}
      <td>Name</td>
      <td>Age</td>
    </div>
  );
}

// ✅ Fragment — কোনো extra DOM node নেই
function TableRow() {
  return (
    <React.Fragment>
      <td>Name</td>
      <td>Age</td>
    </React.Fragment>
  );
}

// ✅ Short syntax
function TableRow() {
  return (
    <>
      <td>Name</td>
      <td>Age</td>
    </>
  );
}

// Keyed Fragment — list-এ key prop দেওয়া যায়
function GlossaryList({ items }) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ));
  // Short syntax <> </> তে key দেওয়া যায় না!
}</code></pre>
      </div>
    `
  },
  {
    id: "react-44",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Data Fetching", "TanStack Query", "SWR", "Caching"],
    question: "TanStack Query (React Query) দিয়ে data fetching, caching, এবং optimistic updates কীভাবে করবেন?",
    answer: `
      <p><strong>TanStack Query</strong> server state management-এর de-facto standard। এটি caching, background refetching, infinite scrolling, pagination সব handle করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Basic query with caching
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000, // 5 min fresh
    gcTime: 30 * 60 * 1000,   // 30 min cache
    retry: 3,
  });
}

// Dependent queries
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});
const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchUserPosts(user.id),
  enabled: !!user?.id, // user load হলেই চলবে
});

// Mutation with optimistic update
function useTodoMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newTodo) => api.post('/todos', newTodo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData(['todos']);
      queryClient.setQueryData(['todos'], old => [...old, newTodo]);
      return { previous };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previous); // Rollback
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Refetch
    },
  });
}

// Infinite scroll
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});</code></pre>
      </div>
    `
  },
  {
    id: "react-45",
    category: "React.js",
    difficulty: "Intermediate",
    tags: ["State", "Immutability", "Spread Operator"],
    question: "React-এ State immutability কেন গুরুত্বপূর্ণ? Complex state কীভাবে immutably update করবেন?",
    answer: `
      <p>React state <strong>immutable</strong> হতে হবে কারণ React shallow comparison দিয়ে বোঝে state পরিবর্তন হয়েছে কিনা। Reference একই থাকলে re-render হবে না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Mutation — React বুঝতে পারবে না পরিবর্তন হয়েছে
const [user, setUser] = useState({ name: 'নাজমুল', skills: ['React'] });
user.name = 'Updated'; // ❌ Direct mutation
setUser(user); // ❌ Same reference — re-render হবে না!

// ✅ Immutable update — নতুন object তৈরি করুন
setUser({ ...user, name: 'Updated' }); // ✅ New object

// Nested object update
setUser(prev => ({
  ...prev,
  address: { ...prev.address, city: 'Dhaka' }
}));

// Array operations
// Add
setItems(prev => [...prev, newItem]);
// Remove
setItems(prev => prev.filter(item => item.id !== targetId));
// Update specific item
setItems(prev => prev.map(item => 
  item.id === targetId ? { ...item, name: 'Updated' } : item
));

// Immer দিয়ে সহজে (deeply nested updates)
import { produce } from 'immer';
setUser(produce(draft => {
  draft.address.city = 'Dhaka';  // ✅ Looks like mutation but creates new object
  draft.skills.push('Next.js');  // ✅ Immer handles immutability
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
      <p>React নিজস্ব <strong>Synthetic Event</strong> system ব্যবহার করে যা cross-browser compatibility নিশ্চিত করে।</p>
      <h4>Key Differences from DOM Events:</h4>
      <ul>
        <li>Event names camelCase: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code></li>
        <li>JSX-এ function reference পাস করুন, string না</li>
        <li>React 17 থেকে events root element-এ delegate হয় (document না)</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Event handling patterns
function Form() {
  // Basic handler
  const handleClick = (e) => {
    e.preventDefault(); // Form submission বন্ধ
    console.log('Clicked!');
  };

  // Parameter passing
  const handleDelete = (id) => (e) => {
    e.stopPropagation(); // Event bubbling বন্ধ
    deleteItem(id);
  };

  // Async event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await api.post('/submit', Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button onClick={handleClick}>Submit</button>
      {items.map(item => (
        <button key={item.id} onClick={handleDelete(item.id)}>
          Delete {item.name}
        </button>
      ))}
    </form>
  );
}

// Event pooling (React 16 only — React 17+ এ নেই)
// React 16: e.persist() দরকার ছিল async-এ event access করতে
// React 17+: Synthetic events আর pool হয় না</code></pre>
      </div>
    `
  },
  {
    id: "react-47",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Performance", "Lighthouse", "Core Web Vitals"],
    question: "React অ্যাপে Core Web Vitals (LCP, FID, CLS) কীভাবে optimize করবেন?",
    answer: `
      <p>Core Web Vitals হলো Google-এর user experience metrics যা SEO ranking-এ সরাসরি প্রভাব ফেলে।</p>
      <h4>Three Core Metrics:</h4>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> ≤2.5s — মূল content কত দ্রুত দেখায়</li>
        <li><strong>FID (First Input Delay) / INP:</strong> ≤100ms — প্রথম interaction কত দ্রুত respond করে</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> ≤0.1 — page layout কতটা stable</li>
      </ul>
      <h4>Optimization Strategies:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// LCP Optimization
// 1. Hero image preload
<link rel="preload" as="image" href="/hero.webp" />

// 2. Critical CSS inline
// 3. Server-side rendering for initial content
// 4. Font display swap
<link href="https://fonts.googleapis.com/..." rel="stylesheet" />
// CSS: font-display: swap;

// CLS Optimization
// 1. Image dimensions সবসময় specify করুন
<img src="/photo.jpg" width={800} height={600} alt="Photo" />

// 2. Skeleton screens (content shifting রোধ)
function ProductCard({ product }) {
  if (!product) return <ProductSkeleton />;
  return <div>...</div>;
}

// 3. Dynamic content-এর জন্য min-height reserve করুন
<div style={{ minHeight: '200px' }}>
  {adLoaded ? <Ad /> : null}
</div>

// FID/INP Optimization
// 1. Long tasks break করুন
// 2. useTransition ব্যবহার করুন heavy updates-এ
// 3. Web Workers দিয়ে heavy computation offload করুন

// Measuring in production
import { onLCP, onFID, onCLS } from 'web-vitals';
onLCP(console.log);
onFID(console.log);
onCLS(console.log);</code></pre>
      </div>
    `
  },
  {
    id: "react-48",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Migration", "Upgrade", "Legacy"],
    question: "Legacy React (Class components, Redux) থেকে Modern React-এ কীভাবে migrate করবেন?",
    answer: `
      <p>Lead Developer হিসেবে legacy codebase modernize করা একটি চ্যালেঞ্জিং কিন্তু গুরুত্বপূর্ণ কাজ।</p>
      <h4>Migration Strategy (Strangler Fig Pattern):</h4>
      <ol>
        <li><strong>Phase 1 — Setup:</strong> TypeScript যোগ করুন, strict mode off রাখুন</li>
        <li><strong>Phase 2 — New features in modern React:</strong> নতুন feature hooks + functional components দিয়ে লিখুন</li>
        <li><strong>Phase 3 — Incremental migration:</strong> পুরাতন class components একটি একটি করে convert করুন</li>
        <li><strong>Phase 4 — State management:</strong> Redux → React Query + Zustand</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Class → Functional conversion
// BEFORE:
class UserProfile extends React.Component {
  state = { user: null, loading: true };
  
  componentDidMount() {
    fetchUser(this.props.userId).then(user => 
      this.setState({ user, loading: false })
    );
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ loading: true });
      fetchUser(this.props.userId).then(user =>
        this.setState({ user, loading: false })
      );
    }
  }
  
  render() {
    if (this.state.loading) return <Spinner />;
    return <div>{this.state.user.name}</div>;
  }
}

// AFTER:
function UserProfile({ userId }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });
  
  if (isLoading) return <Spinner />;
  return <div>{user.name}</div>;
}
// ৩০+ লাইন → ১০ লাইন!</code></pre>
      </div>
      <h4>Lead Tips:</h4>
      <ul>
        <li>একসাথে সব migrate করবেন না — incremental approach নিন</li>
        <li>প্রতিটি PR ছোট রাখুন (১ component = ১ PR)</li>
        <li>E2E tests আগে লিখুন, তারপর refactor করুন</li>
      </ul>
    `
  },
  {
    id: "react-49",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["CI/CD", "Deployment", "DevOps"],
    question: "React অ্যাপের CI/CD pipeline কীভাবে সেটআপ করবেন? Production deployment best practices কী?",
    answer: `
      <h4>CI/CD Pipeline Steps:</h4>
      <div class="code-box">
        <div class="code-header"><span>yaml</span><button class="copy-btn">Copy</button></div>
        <pre><code># GitHub Actions CI/CD
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test -- --coverage
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: vercel/action@v28
        with:
          vercel-token: secrets.VERCEL_TOKEN
          vercel-org-id: secrets.ORG_ID</code></pre>
      </div>
      <h4>Production Deployment Checklist:</h4>
      <ul>
        <li>✅ Environment variables সঠিকভাবে set করা</li>
        <li>✅ Source maps hidden বা আলাদা upload (Sentry)</li>
        <li>✅ CDN + edge caching configure করা</li>
        <li>✅ Error monitoring (Sentry, DataDog) সেটআপ</li>
        <li>✅ Performance monitoring (Lighthouse CI)</li>
        <li>✅ Preview deployments (PR preview)</li>
        <li>✅ Rollback strategy (instant rollback capability)</li>
        <li>✅ Feature flags (LaunchDarkly, Flagsmith)</li>
      </ul>
    `
  },
  {
    id: "react-50",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Interview", "System Design", "Architecture"],
    question: "Frontend System Design Interview — একটি complex React অ্যাপ কীভাবে design করবেন? (যেমন: E-commerce, Social Media)",
    answer: `
      <p>Senior/Lead level interview-এ frontend system design question আসে। এখানে systematic approach দেখানো জরুরি।</p>
      <h4>Design Framework (RADIO):</h4>
      <ol>
        <li><strong>R — Requirements:</strong> Functional ও non-functional requirements list করুন</li>
        <li><strong>A — Architecture:</strong> High-level component tree, data flow</li>
        <li><strong>D — Data Model:</strong> State shape, API contracts, caching strategy</li>
        <li><strong>I — Interface:</strong> Component API, props, hooks design</li>
        <li><strong>O — Optimization:</strong> Performance, SEO, accessibility</li>
      </ol>
      <h4>Example: E-commerce Product Listing Page</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Architecture:
├── App (Router, Auth, Error Boundary)
├── ProductListPage
│   ├── SearchBar (debounced search)
│   ├── FilterSidebar (category, price, rating)
│   ├── SortDropdown
│   ├── ProductGrid (virtualized if 100+ items)
│   │   └── ProductCard (lazy loaded image, React.memo)
│   ├── Pagination / Infinite Scroll
│   └── CartDrawer (Portal)

State Management:
- Server State: TanStack Query (products, categories)
- URL State: Search params (filters, page, sort)
- Client State: Zustand (cart, UI preferences)
- Form State: React Hook Form (checkout)

Performance:
- SSR for initial page (SEO)
- Image: Next.js Image (WebP, lazy, responsive)
- Code split: Checkout, Reviews lazy loaded
- Optimistic: Add to cart instant feedback

API Design:
GET /products?page=1&sort=price_asc&category=electronics&q=phone
Response: { items: [...], total: 150, hasMore: true }</code></pre>
      </div>
    `
  },
  {
    id: "react-51",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Hooks Rules", "Closure", "Stale State"],
    question: "React Hooks-এর Rules কী কী? Stale closure সমস্যা কী এবং কীভাবে সমাধান করবেন?",
    answer: `
      <h4>Rules of Hooks:</h4>
      <ol>
        <li>শুধুমাত্র top level-এ call করুন (loop, condition, nested function-এর ভেতরে না)</li>
        <li>শুধুমাত্র React function components বা custom hooks-এ call করুন</li>
      </ol>
      <h4>Stale Closure সমস্যা:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Stale closure — count সবসময় 0 থাকবে
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // সবসময় 0! (stale closure)
      setCount(count + 1); // সবসময় 0 + 1 = 1!
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Empty deps — count-এর পুরাতন value capture হয়েছে
}

// ✅ সমাধান ১: Functional updater
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1); // ✅ Always latest value
  }, 1000);
  return () => clearInterval(interval);
}, []);

// ✅ সমাধান ২: useRef দিয়ে latest value track
const countRef = useRef(count);
countRef.current = count; // প্রতি render-এ update

useEffect(() => {
  const interval = setInterval(() => {
    console.log(countRef.current); // ✅ Always latest
  }, 1000);
  return () => clearInterval(interval);
}, []);

// ✅ সমাধান ৩: Dependency array-তে count যোগ
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // ✅ Updated value
  }, 1000);
  return () => clearInterval(interval);
}, [count]); // count পরিবর্তনে নতুন interval</code></pre>
      </div>
    `
  },
  {
    id: "react-52",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Animation", "Framer Motion", "Transition"],
    question: "React-এ smooth animations কীভাবে করবেন? Framer Motion কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>Modern React অ্যাপে animations ব্যবহারকারীর অভিজ্ঞতা উল্লেখযোগ্যভাবে উন্নত করে। <strong>Framer Motion</strong> সবচেয়ে জনপ্রিয় animation library।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { motion, AnimatePresence } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Content
</motion.div>

// List animation with stagger
function AnimatedList({ items }) {
  return (
    <motion.ul variants={{
      visible: { transition: { staggerChildren: 0.1 } }
    }} initial="hidden" animate="visible">
      {items.map(item => (
        <motion.li key={item.id} variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 }
        }}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Page transitions
function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Home />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

// Gesture animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
>
  Drag me!
</motion.button></code></pre>
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
      <h4>useId — SSR-safe unique ID generation:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ SSR-এ Math.random() client ও server-এ different ID দেবে
const id = Math.random().toString(36);

// ✅ useId — SSR ও CSR-এ consistent ID
function FormField({ label }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}

// Multiple IDs from one useId call
function PasswordField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id + '-input'}>Password</label>
      <input id={id + '-input'} type="password" aria-describedby={id + '-hint'} />
      <p id={id + '-hint'}>Must be 8+ characters</p>
    </>
  );
}</code></pre>
      </div>
      <h4>useSyncExternalStore — External store subscribe:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Browser API subscribe
function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,     // Client snapshot
    () => true                   // Server snapshot (SSR)
  );
}

const isOnline = useOnlineStatus();
// {isOnline ? '🟢 Online' : '🔴 Offline'}</code></pre>
      </div>
    `
  },
  {
    id: "react-54",
    category: "React.js",
    difficulty: "Advanced",
    tags: ["Patterns", "Inversion of Control", "Headless"],
    question: "Headless Component Pattern কী? কেন এটি modern React library design-এ জনপ্রিয়?",
    answer: `
      <p><strong>Headless Components</strong> behavior/logic provide করে কিন্তু কোনো UI/styling নেই। Consumer সম্পূর্ণ UI নিয়ন্ত্রণ করে।</p>
      <h4>Examples: Headless UI, Radix UI, Downshift, TanStack Table</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Headless Autocomplete hook
function useAutocomplete({ items, onSelect }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredItems = useMemo(() =>
    items.filter(item => item.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  const getInputProps = () => ({
    value: query,
    onChange: (e) => { setQuery(e.target.value); setIsOpen(true); },
    onFocus: () => setIsOpen(true),
    onKeyDown: (e) => {
      if (e.key === 'ArrowDown') setHighlightedIndex(i => Math.min(i + 1, filteredItems.length - 1));
      if (e.key === 'ArrowUp') setHighlightedIndex(i => Math.max(i - 1, 0));
      if (e.key === 'Enter') { onSelect(filteredItems[highlightedIndex]); setIsOpen(false); }
    },
    role: 'combobox',
    'aria-expanded': isOpen,
  });

  const getItemProps = (index) => ({
    onClick: () => { onSelect(filteredItems[index]); setIsOpen(false); },
    'aria-selected': index === highlightedIndex,
    role: 'option',
  });

  return { getInputProps, getItemProps, filteredItems, isOpen, highlightedIndex };
}

// Consumer — সম্পূর্ণ UI control!
function MyAutocomplete() {
  const { getInputProps, getItemProps, filteredItems, isOpen } = useAutocomplete({
    items: ['React', 'Vue', 'Angular', 'Svelte'],
    onSelect: (item) => console.log('Selected:', item)
  });

  return (
    <div className="my-custom-styles">
      <input {...getInputProps()} className="my-input" />
      {isOpen && (
        <ul className="my-dropdown">
          {filteredItems.map((item, i) => (
            <li key={item} {...getItemProps(i)} className="my-item">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}</code></pre>
      </div>
      <p><strong>কেন জনপ্রিয়:</strong> একই logic, বিভিন্ন design system-এ ব্যবহার করা যায়। Accessibility built-in থাকে।</p>
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
      <h4>Recommended Options:</h4>
      <ol>
        <li><strong>Vite (SPA):</strong> সবচেয়ে দ্রুত dev server, simple config</li>
        <li><strong>Next.js (Full-stack):</strong> SSR, SSG, API routes — production-ready</li>
        <li><strong>Remix:</strong> Full-stack, nested routing, form handling</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># Vite দিয়ে React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev

# Next.js
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir
cd my-app
npm run dev

# Remix
npx create-remix@latest my-app
cd my-app
npm run dev</code></pre>
      </div>
      <h4>কোনটি কখন:</h4>
      <ul>
        <li><strong>Dashboard / SPA / Internal tool:</strong> Vite</li>
        <li><strong>Public website / E-commerce / Blog:</strong> Next.js (SEO দরকার)</li>
        <li><strong>Full-stack with complex forms:</strong> Remix</li>
      </ul>
      <p><strong>⚠️ CRA ব্যবহার করবেন না!</strong> এটি আর maintain হচ্ছে না, Webpack config outdated, dev server ধীর।</p>
    `
  }
];
