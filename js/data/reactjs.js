const reactJsInterviewQuestions = [
	{
		id: "react-1",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Basics", "React"],
		question: "React.js কী এবং কেন ব্যবহার করা হয়?",
		answer: `React.js হলো JavaScript-এর একটি UI library, যা component-based user interface তৈরি করতে ব্যবহৃত হয়।

React-এর মূল ধারণা:

Component
↓
Props
↓
State
↓
Event
↓
Re-render
↓
Updated UI

React-এর প্রধান সুবিধা:

- Component-based architecture
- Declarative UI
- Reusable components
- Efficient rendering
- Strong ecosystem
- Large community
- Server-side rendering এবং Server Components support
- Modern frontend architecture-এর সাথে সহজ integration

React নিজে সম্পূর্ণ application framework নয়। Routing, data fetching, authentication ইত্যাদির জন্য অতিরিক্ত tools/framework ব্যবহার করা হয়।`,
	},

	{
		id: "react-2",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Declarative", "Imperative"],
		question: "Declarative এবং Imperative programming-এর মধ্যে পার্থক্য কী?",
		answer: `Imperative approach-এ কীভাবে UI পরিবর্তন করতে হবে তা manually বলা হয়।

Example:

document.getElementById("count").innerText = count;

Declarative React approach:

return <div>{count}</div>;

React-কে বলা হয়:

"UI state অনুযায়ী এমন হবে"

React rendering system প্রয়োজনীয় DOM update determine করে।

Declarative programming-এর ফলে UI logic সাধারণত বেশি predictable এবং maintainable হয়।`,
	},

	{
		id: "react-3",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Component"],
		question: "React component কী?",
		answer: `Component হলো UI-এর reusable building block।

Example:

function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

Component হতে পারে:

- Presentational
- Container
- Form
- Layout
- Feature component
- Page component

Large application-এ component-কে business responsibility এবং UI responsibility অনুযায়ী organize করা গুরুত্বপূর্ণ।`,
	},

	{
		id: "react-4",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["JSX"],
		question: "JSX কী?",
		answer: `JSX হলো JavaScript-এর একটি syntax extension, যা JavaScript-এর মধ্যে HTML-এর মতো syntax ব্যবহার করতে দেয়।

Example:

const element = (
  <div>
    <h1>Hello</h1>
  </div>
);

JSX সরাসরি browser বুঝে না।

Build process JSX-কে JavaScript function calls-এ transform করে।

JSX-এর সুবিধা:

- UI structure readable
- JavaScript expression ব্যবহার করা যায়
- Component composition সহজ
- Conditional rendering সহজ`,
	},

	{
		id: "react-5",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["JSX", "Expression"],
		question: "JSX-এর মধ্যে JavaScript কীভাবে ব্যবহার করবেন?",
		answer: `Curly braces {} ব্যবহার করে JavaScript expression ব্যবহার করা যায়।

Example:

const name = "Nazmul";

return <h1>Hello {name}</h1>;

Expression হিসেবে ব্যবহার করা যায়:

- Variable
- Function result
- Ternary
- Arithmetic
- Array methods

Example:

{isLoading ? <Spinner /> : <Content />}

Statement যেমন if/for সরাসরি JSX expression-এর মধ্যে লেখা যায় না; সাধারণত বাইরে logic তৈরি করা হয়।`,
	},

	{
		id: "react-6",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Props"],
		question: "Props কী?",
		answer: `Props হলো parent component থেকে child component-এ data পাঠানোর mechanism।

Example:

<UserCard
  name="Nazmul"
  age={30}
/>

Child:

function UserCard({ name, age }) {
  return <h2>{name} - {age}</h2>;
}

Props:

- Read-only
- Parent → Child data flow
- Component configurable করে
- Reusability বাড়ায়

Child সাধারণত props directly mutate করবে না।`,
	},

	{
		id: "react-7",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["State"],
		question: "React state কী?",
		answer: `State হলো component-এর internal data যা পরিবর্তন হলে component re-render হতে পারে।

Example:

const [count, setCount] = useState(0);

setCount(10);

State ব্যবহার করা হয়:

- Form input
- Modal open/close
- Selected item
- Loading state
- Counter
- UI preferences

Props external input, আর state component-এর managed data।`,
	},

	{
		id: "react-8",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Props", "State"],
		question: "Props এবং State-এর মধ্যে পার্থক্য কী?",
		answer: `Props:

- Parent থেকে আসে
- Child-এর জন্য read-only
- Component configure করে

State:

- Component নিজে manage করে
- State setter দিয়ে update হয়
- Update হলে re-render হতে পারে

Flow:

Props:
Parent
 ↓
Child

State:
Component
 ↓
setState
 ↓
Re-render`,
	},

	{
		id: "react-9",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Events"],
		question: "React event handling কীভাবে কাজ করে?",
		answer: `React event handler function-এর মাধ্যমে event handle করে।

Example:

function Button() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}

Common events:

- onClick
- onChange
- onSubmit
- onFocus
- onBlur
- onKeyDown

Event handler reference দিতে হয়; function call সরাসরি render-এর সময় করা উচিত নয়।

Correct:

onClick={handleClick}

Incorrect:

onClick={handleClick()}`,
	},

	{
		id: "react-10",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Conditional Rendering"],
		question: "React-এ conditional rendering কীভাবে করবেন?",
		answer: `Common techniques:

1. Ternary

{isLoading ? <Spinner /> : <Data />}

2. &&

{isAdmin && <AdminPanel />}

3. Early return

if (loading) {
  return <Spinner />;
}

return <Dashboard />;

Complex condition হলে render logic আলাদা function/component-এ নেওয়া ভালো।`,
	},

	{
		id: "react-11",
		category: "React.js",
		difficulty: "Beginner",
		tags: ["Lists", "Keys"],
		question: "React list rendering-এ key কেন ব্যবহার করা হয়?",
		answer: `List item-এর stable identity বোঝাতে key ব্যবহার করা হয়।

Example:

users.map(user => (
  <UserCard
    key={user.id}
    user={user}
  />
));

Key-এর মাধ্যমে React বুঝতে পারে:

- কোন item নতুন
- কোন item removed
- কোন item moved
- কোন item update হয়েছে

Stable unique ID সবচেয়ে ভালো key।

Index key হিসেবে ব্যবহার করা risky হতে পারে যখন list reorder/insert/delete হয়।`,
	},

	{
		id: "react-12",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Virtual DOM"],
		question: "Virtual DOM কী?",
		answer: `Virtual DOM হলো UI-এর একটি in-memory representation।

Conceptual flow:

State change
 ↓
React render
 ↓
New UI representation
 ↓
Previous representation-এর সাথে comparison
 ↓
Required DOM updates
 ↓
Browser DOM

এটি React-এর rendering architecture-এর একটি অংশ।

Virtual DOM মানেই প্রতিবার পুরো DOM recreate করা নয়। React প্রয়োজনীয় update determine করে।`,
	},

	{
		id: "react-13",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Reconciliation"],
		question: "React reconciliation কী?",
		answer: `Reconciliation হলো previous render এবং new render-এর UI tree compare করে কী update প্রয়োজন তা determine করার process।

Example:

Old:
<User id="1" />

New:
<User id="2" />

React identity এবং tree structure analyse করে update process চালায়।

Key এবং component type reconciliation-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "react-14",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Rendering"],
		question: "React component কখন re-render করে?",
		answer: `সাধারণ কারণ:

1. State update
2. Parent re-render
3. Context value change
4. Hook-related state update
5. External store update

Re-render মানে DOM-এর প্রতিটি node update হওয়া নয়।

React নতুন render output তৈরি করে এবং প্রয়োজনীয় DOM changes apply করে।

Performance optimization-এর আগে actual unnecessary render identify করা উচিত।`,
	},

	{
		id: "react-15",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["State", "Batching"],
		question: "React state batching কী?",
		answer: `React অনেক state update একসাথে process করে একটি render-এ combine করতে পারে।

Example:

setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);

Functional updater ব্যবহার করলে প্রত্যেক update previous state-এর উপর correctly apply হয়।

Batching-এর ফলে unnecessary multiple render কমে এবং performance improve হতে পারে।`,
	},

	{
		id: "react-16",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useState"],
		question: "useState কী?",
		answer: `useState functional component-এ local state রাখার জন্য ব্যবহৃত Hook।

Example:

const [count, setCount] = useState(0);

State update:

setCount(10);

Previous state-এর উপর নির্ভর করলে:

setCount(prev => prev + 1);

Functional update asynchronous/batched state updates-এর ক্ষেত্রে safer pattern।`,
	},

	{
		id: "react-17",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useEffect"],
		question: "useEffect কী এবং কখন ব্যবহার করবেন?",
		answer: `useEffect component-এর external systems-এর সাথে synchronization-এর জন্য ব্যবহৃত হয়।

Examples:

- API subscription
- Browser event listener
- Timer
- WebSocket connection
- Third-party library integration

Example:

useEffect(() => {
  const connection = connect();

  return () => {
    connection.disconnect();
  };
}, []);

Effect-এর cleanup function resource cleanup করার জন্য গুরুত্বপূর্ণ।

সব business calculation-এর জন্য useEffect ব্যবহার করা উচিত নয়।`,
	},

	{
		id: "react-18",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useEffect", "Dependency"],
		question: "useEffect dependency array কী করে?",
		answer: `Dependency array effect কখন re-run করবে তা control করতে সাহায্য করে।

Example:

useEffect(() => {
  fetchUser(userId);
}, [userId]);

userId change হলে effect আবার execute হবে।

Dependency:

[] → initial mount-এর পরে effect setup করার common pattern

[userId] → userId পরিবর্তন হলে re-run

Dependencies সঠিকভাবে declare করা গুরুত্বপূর্ণ।

Missing dependency stale value তৈরি করতে পারে।`,
	},

	{
		id: "react-19",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useEffect", "Cleanup"],
		question: "useEffect cleanup function কেন প্রয়োজন?",
		answer: `Cleanup function previous effect-এর resource cleanup করে।

Example:

useEffect(() => {
  const handler = () => {};

  window.addEventListener("resize", handler);

  return () => {
    window.removeEventListener("resize", handler);
  };
}, []);

Cleanup দরকার:

- Event listener
- Timer
- Subscription
- WebSocket
- External resource

Cleanup না করলে memory leak বা duplicate subscription হতে পারে।`,
	},

	{
		id: "react-20",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useEffect", "Race Condition"],
		question: "React data fetching-এ race condition কীভাবে হয়?",
		answer: `ধরা যাক user দ্রুত:

User A
 ↓
Request A

তারপর:

User B
 ↓
Request B

যদি Request A পরে complete হয়, পুরনো data নতুন data overwrite করতে পারে।

Solution:

- AbortController
- Request cancellation
- Request ID tracking
- Data-fetching library

Modern applications-এ TanStack Query-এর মতো library server-state lifecycle সহজ করতে পারে।`,
	},

	{
		id: "react-21",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useRef"],
		question: "useRef কী এবং কেন ব্যবহার করা হয়?",
		answer: `useRef এমন mutable value রাখতে পারে যা পরিবর্তন হলেও সাধারণত component re-render trigger করে না।

Common uses:

1. DOM reference
2. Previous value
3. Timer ID
4. Mutable instance value

Example:

const inputRef = useRef(null);

inputRef.current.focus();

useRef-এর value:

ref.current

State এবং ref-এর মূল পার্থক্য হলো state UI rendering-এর সাথে যুক্ত, ref সাধারণত rendering trigger করে না।`,
	},

	{
		id: "react-22",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useMemo", "Performance"],
		question: "useMemo কী?",
		answer: `useMemo expensive calculation-এর result memoize করতে ব্যবহার করা হয়।

Example:

const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);

items পরিবর্তন না হলে cached result reuse করা যেতে পারে।

useMemo সব জায়গায় ব্যবহার করা উচিত নয়।

অতিরিক্ত memoization:

- Code complex করে
- Memory cost বাড়াতে পারে
- Performance benefit নাও দিতে পারে

Actual bottleneck থাকলে ব্যবহার করা উচিত।`,
	},

	{
		id: "react-23",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useCallback", "Performance"],
		question: "useCallback কী?",
		answer: `useCallback function reference memoize করে।

Example:

const handleClick = useCallback(() => {
  saveUser(id);
}, [id]);

এটি বিশেষভাবে useful হতে পারে যখন:

- Function child component-এর prop
- Child React.memo ব্যবহার করে
- Function identity-এর কারণে unnecessary render হচ্ছে

শুধু "সব function-এ useCallback" করা best practice নয়।`,
	},

	{
		id: "react-24",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["React.memo", "Performance"],
		question: "React.memo কী?",
		answer: `React.memo component-এর props unchanged থাকলে unnecessary re-render skip করতে সাহায্য করে।

Example:

const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});

তবে object/function props-এর reference প্রতিবার পরিবর্তন হলে memoization ineffective হতে পারে।

Optimization করার আগে profiling করা উচিত।`,
	},

	{
		id: "react-25",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Performance", "Memoization"],
		question: "useMemo, useCallback এবং React.memo-এর পার্থক্য কী?",
		answer: `useMemo:

Value memoize করে।

useCallback:

Function reference memoize করে।

React.memo:

Component-এর rendering skip করার সুযোগ দেয় যদি props unchanged থাকে।

Relationship:

Parent
 ↓
useCallback
 ↓
React.memo Child
 ↓
Unchanged function reference
 ↓
Potential render skip

এগুলো optimization tools; application correctness-এর জন্য প্রয়োজনীয় নয়।`,
	},

	{
		id: "react-26",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useContext", "Context"],
		question: "useContext কী?",
		answer: `Context prop drilling কমাতে ব্যবহার করা হয়।

Example:

ThemeContext
 ↓
Provider
 ↓
Deep Child
 ↓
useContext()

Common use cases:

- Theme
- Locale
- Authentication context
- Application-level configuration

তবে frequently changing large state-এর জন্য Context blindly ব্যবহার করলে অনেক component re-render হতে পারে।`,
	},

	{
		id: "react-27",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Context", "Performance"],
		question: "Context API-এর performance problem কী?",
		answer: `Context value পরিবর্তন হলে সেই context consume করা components update হতে পারে।

Example:

<AuthContext.Provider value={{
  user,
  setUser
}}>
  ...
</AuthContext.Provider>

Value object প্রতিবার নতুন হলে unnecessary updates হতে পারে।

Solutions:

- Split contexts
- Stable provider values
- Separate state/dispatch contexts
- External state store
- Component boundary optimization

Large frequently changing state-এর জন্য specialized state management ব্যবহার করা যেতে পারে।`,
	},

	{
		id: "react-28",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["useReducer", "State"],
		question: "useReducer কখন ব্যবহার করবেন?",
		answer: `Complex state transition-এর ক্ষেত্রে useReducer useful।

Example:

const [state, dispatch] = useReducer(reducer, initialState);

dispatch({
  type: "ADD_ITEM",
  payload: item
});

Useful যখন:

- অনেক related state
- Complex transitions
- Multiple actions
- Predictable state updates

Reducer:

(state, action) => newState

Reducer ideally pure function হওয়া উচিত।`,
	},

	{
		id: "react-29",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Custom Hooks"],
		question: "Custom Hook কী?",
		answer: `Custom Hook হলো reusable Hook logic।

Naming সাধারণত use দিয়ে শুরু হয়।

Example:

function useDebounce(value, delay) {
  ...
}

তারপর:

const debouncedSearch = useDebounce(search, 500);

Custom Hook reusable logic share করে।

তবে Custom Hook UI share করে না; logic share করে।`,
	},

	{
		id: "react-30",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Rules of Hooks"],
		question: "React Hooks-এর Rules কী?",
		answer: `মূল Rules:

1. Hooks শুধুমাত্র top level-এ call করতে হবে।
2. Hooks সাধারণত React function component বা custom Hook-এর মধ্যে call করতে হবে।

Avoid:

if (condition) {
  useEffect(...);
}

Avoid:

for (...) {
  useState(...);
}

কারণ React Hook call order-এর উপর state association নির্ভর করে।`,
	},

	{
		id: "react-31",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Forms"],
		question: "Controlled এবং Uncontrolled component কী?",
		answer: `Controlled:

Input value React state দ্বারা controlled।

Example:

<input
  value={email}
  onChange={e => setEmail(e.target.value)}
/>

Uncontrolled:

DOM নিজে value maintain করে এবং ref দিয়ে access করা যায়।

Controlled useful:

- Validation
- Dynamic UI
- Conditional fields
- Form state management

Uncontrolled useful হতে পারে:

- Simple forms
- Performance-sensitive large forms
- Third-party/form libraries`,
	},

	{
		id: "react-32",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Forms", "Validation"],
		question: "React form validation কীভাবে design করবেন?",
		answer: `Validation দুই layer-এ করা উচিত:

Client-side:
- Required
- Format
- Length
- User experience

Server-side:
- Final authority
- Security
- Business validation
- Database constraints

Flow:

Form
 ↓
Client validation
 ↓
API
 ↓
Server validation
 ↓
Business validation
 ↓
Database

Client validation কখনো security boundary নয়।`,
	},

	{
		id: "react-33",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["State Management"],
		question: "Local state, Context এবং Global state কখন ব্যবহার করবেন?",
		answer: `Local state:

Component-specific UI state।

Example:
Modal open/close

Context:

Shared relatively stable application data।

Example:
Theme/Auth context

Global state store:

Complex shared client state।

Example:
Large dashboard filters/cart/workflow state

Server state:

API/database data।

এর জন্য TanStack Query-এর মতো server-state solution ব্যবহার করা ভালো।

সব state global করার দরকার নেই।`,
	},

	{
		id: "react-34",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Server State", "TanStack Query"],
		question: "Client state এবং Server state-এর পার্থক্য কী?",
		answer: `Client state:

Browser/application-এর local state।

Example:

- Modal
- Selected tab
- Theme
- Form draft

Server state:

Backend/database থেকে আসা data।

Characteristics:

- Remote
- Async
- Cacheable
- Can become stale
- Multiple clients share it

Server state-এর জন্য caching, refetching, invalidation, retry ইত্যাদি দরকার।

তাই server state এবং UI state আলাদাভাবে manage করা ভালো।`,
	},

	{
		id: "react-35",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Data Fetching", "Caching"],
		question: "React application-এ API data fetching কীভাবে ভালোভাবে design করবেন?",
		answer: `Production architecture:

Component
 ↓
Custom Hook
 ↓
Data-fetching layer
 ↓
API Client
 ↓
Backend

Example:

useUsers()
 ↓
userApi.getUsers()
 ↓
HTTP Client
 ↓
API

Need:

- Loading state
- Error state
- Empty state
- Retry
- Cache
- Refetch
- Pagination
- Cancellation
- Authentication

Large application-এ component-এর মধ্যে raw fetch logic ছড়িয়ে না দেওয়াই ভালো।`,
	},

	{
		id: "react-36",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Suspense", "Loading"],
		question: "React Suspense কী?",
		answer: `Suspense rendering-এর কিছু অংশ asynchronous resource-এর জন্য অপেক্ষা করার সময় fallback UI দেখানোর mechanism।

Example:

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>

Modern React architecture-এ Suspense ব্যবহার হতে পারে:

- Lazy-loaded components
- Code splitting
- Framework-supported data loading
- Server rendering workflows

Suspense নিজে সাধারণ Promise fetch library নয়; framework/data layer integration অনুযায়ী behavior নির্ভর করে।`,
	},

	{
		id: "react-37",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Lazy Loading", "Code Splitting"],
		question: "React.lazy এবং code splitting কী?",
		answer: `Large JavaScript bundle initial loading slow করতে পারে।

React.lazy দিয়ে component dynamically load করা যায়।

Concept:

Initial bundle
 ↓
Dashboard
 ↓
User clicks Reports
 ↓
Reports chunk download
 ↓
Render Reports

Suspense fallback loading UI দেখাতে পারে।

Benefits:

- Smaller initial bundle
- Faster initial load
- Route/feature-based loading`,
	},

	{
		id: "react-38",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Performance", "Bundle"],
		question: "React application-এর bundle size কীভাবে optimize করবেন?",
		answer: `Techniques:

- Code splitting
- Lazy loading
- Tree shaking
- Remove unused dependencies
- Analyze bundle
- Dynamic imports
- Optimize images
- Use modern formats
- Avoid huge libraries for simple tasks
- Route-level splitting

Bundle analyzer দিয়ে কোন package বেশি size নিচ্ছে identify করা যায়।`,
	},

	{
		id: "react-39",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Performance", "Virtualization"],
		question: "Large list rendering কীভাবে optimize করবেন?",
		answer: `ধরা যাক 100,000 rows render করতে হবে।

সব row একসাথে DOM-এ render করা expensive।

Solution:

Virtualization।

Concept:

100,000 records
 ↓
Only visible ~30 rows render
 ↓
User scrolls
 ↓
Rows reused/updated

Tools:

- TanStack Virtual
- react-window
- Other virtualization solutions

Additionally:

- Pagination
- Server-side filtering
- Memoization
- Efficient row components`,
	},

	{
		id: "react-40",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Performance", "Profiler"],
		question: "React performance কীভাবে debug করবেন?",
		answer: `Tools/techniques:

- React DevTools Profiler
- Browser Performance panel
- Network panel
- Memory profiler
- Lighthouse
- Bundle analyzer

Check:

- Unnecessary renders
- Expensive calculations
- Large DOM
- Slow API
- Large JS bundle
- Long tasks
- Memory growth

Optimization-এর আগে profiling করা উচিত।`,
	},

	{
		id: "react-41",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["React 18", "Concurrency"],
		question: "React 18-এর concurrent rendering কী?",
		answer: `Concurrent rendering React-কে rendering work interrupt/reprioritize করার capability দেয়।

এর ফলে urgent এবং non-urgent update আলাদা priority-তে handle করা যায়।

Related APIs:

- startTransition
- useTransition
- Suspense

Concept:

Urgent update
→ Input typing

Non-urgent update
→ Large search result rendering

React user interaction responsive রাখার জন্য rendering work prioritize করতে পারে।`,
	},

	{
		id: "react-42",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["useTransition", "React 18"],
		question: "useTransition কী?",
		answer: `useTransition non-urgent state update mark করার জন্য ব্যবহার করা হয়।

Example concept:

const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchResults(results);
});

এখানে React বুঝতে পারে update-টি transition হিসেবে treat করা যেতে পারে।

User input-এর মতো urgent interaction responsive রাখতে এটি useful।`,
	},

	{
		id: "react-43",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["useDeferredValue", "React 18"],
		question: "useDeferredValue কী?",
		answer: `useDeferredValue কোনো value-এর non-urgent version তৈরি করতে সাহায্য করে।

Example:

const deferredSearch = useDeferredValue(search);

Input:

search
 ↓
Immediate UI

Large result list:

deferredSearch
 ↓
Can update later

Search input responsive রাখার ক্ষেত্রে useful হতে পারে।`,
	},

	{
		id: "react-44",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["React 19", "Actions"],
		question: "React 19-এর Actions কী?",
		answer: `React 19 async mutation/form workflows সহজ করার জন্য Actions-এর concept introduce করেছে।

Actions-এর মাধ্যমে:

- Async operation
- Pending state
- Error handling
- Form submission
- Optimistic update

ইত্যাদি workflow আরও declarative করা যায়।

React 19-এর নতুন form-related APIs-এর সাথে Actions closely related।`,
	},

	{
		id: "react-45",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["React 19", "useActionState"],
		question: "useActionState কী?",
		answer: `useActionState async action-এর result/state manage করতে সাহায্য করে।

Concept:

Form
 ↓
Action
 ↓
Server/API
 ↓
Action result
 ↓
UI state

এতে form submission-এর:

- Pending
- Success
- Error
- Returned state

একটি structured flow-এ handle করা যায়।

React 19-এর modern form/action architecture-এ এটি গুরুত্বপূর্ণ।`,
	},

	{
		id: "react-46",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["React 19", "useFormStatus"],
		question: "useFormStatus কী?",
		answer: `useFormStatus parent form-এর submission status access করতে সাহায্য করে।

যেমন submit button component জানতে পারে form pending কিনা।

Concept:

<form>
  ↓
SubmitButton
  ↓
useFormStatus()
  ↓
pending
  ↓
Disable button / Show loading
</form>

এটি form submission UX সহজ করে।`,
	},

	{
		id: "react-47",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["React 19", "useOptimistic"],
		question: "useOptimistic কী?",
		answer: `useOptimistic server response আসার আগেই expected UI update দেখাতে সাহায্য করে।

Example:

User likes post
 ↓
Immediately show liked
 ↓
Send API request
 ↓
Server confirms
 ↓
Final state

Benefits:

- Faster UX
- Responsive UI

কিন্তু server operation fail করলে rollback/error handling strategy থাকতে হবে।`,
	},

	{
		id: "react-48",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["React 19", "use"],
		question: "React-এর use API কী?",
		answer: `React-এর use API resource থেকে value read করার নতুন mechanism।

এটি বিশেষভাবে Suspense এবং modern Server Component architecture-এর সাথে গুরুত্বপূর্ণ।

Concept:

Resource
 ↓
use(resource)
 ↓
Value

Resource pending হলে Suspense boundary ব্যবহার করে fallback দেখানো যেতে পারে।

use সাধারণ Hook-এর মতো একই rules follow করে না; এটি modern React rendering model-এর অংশ।`,
	},

	{
		id: "react-49",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Server Components", "RSC"],
		question: "React Server Components কী?",
		answer: `React Server Components এমন component যা server environment-এ render/execute হতে পারে এবং client-এর JavaScript bundle-এর অংশ হিসেবে পাঠানো প্রয়োজন হয় না।

Concept:

Server Component
 ↓
Database/API
 ↓
Rendered result
 ↓
Client

Benefits:

- Less client JavaScript
- Server-side data access
- Better initial performance
- Smaller client bundle

Interactive UI-এর জন্য Client Component প্রয়োজন হতে পারে।`,
	},

	{
		id: "react-50",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Server Components", "Client Components"],
		question: "Server Component এবং Client Component-এর পার্থক্য কী?",
		answer: `Server Component:

- Server-এ execute হয়
- Direct server-side data access possible
- Client JS কমাতে সাহায্য করে
- Browser-only APIs ব্যবহার করতে পারে না
- Interactive state/event handling-এর জন্য নয়

Client Component:

- Browser-এ execute হয়
- useState/useEffect-এর মতো client interaction ব্যবহার করতে পারে
- Event handlers ব্যবহার করতে পারে
- Browser APIs ব্যবহার করতে পারে

Modern full-stack React framework যেমন Next.js এই architecture extensively ব্যবহার করে।`,
	},

	{
		id: "react-51",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Hydration", "SSR"],
		question: "Hydration কী?",
		answer: `SSR-এর সময় server HTML generate করে browser-এ পাঠায়।

Browser:

Server HTML
 ↓
Hydration
 ↓
React attaches event behavior
 ↓
Interactive UI

Hydration mismatch হয় যখন server-rendered output এবং client-rendered output expectedভাবে match করে না।

Common causes:

- Browser-only APIs
- Random values
- Current time
- Different data
- Incorrect conditional rendering

SSR application-এ hydration mismatch carefully debug করতে হয়।`,
	},

	{
		id: "react-52",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["SSR", "CSR", "SSG"],
		question: "CSR, SSR এবং SSG-এর মধ্যে পার্থক্য কী?",
		answer: `CSR:

Browser JavaScript দিয়ে UI render করে।

SSR:

প্রতি request বা server rendering workflow অনুযায়ী HTML server-side তৈরি হয়।

SSG:

Build time-এ static HTML/content generate করা হয়।

Use cases:

CSR → Highly interactive dashboard

SSR → Dynamic SEO-sensitive pages

SSG → Marketing/content pages

Modern frameworks অনেক সময় এই strategies combine করে।`,
	},

	{
		id: "react-53",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Error Boundary", "Error Handling"],
		question: "React Error Boundary কী?",
		answer: `Error Boundary descendant component-এর rendering/lifecycle-related errors catch করে fallback UI দেখাতে পারে।

Concept:

Error Boundary
 ↓
Application
 ├── Header
 ├── Dashboard
 └── Reports

Reports crash করলে পুরো application blank হওয়ার পরিবর্তে fallback দেখানো যেতে পারে।

Error Boundary সাধারণত event handler বা arbitrary async callback-এর সব error catch করার mechanism নয়।`,
	},

	{
		id: "react-54",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Error Handling", "API"],
		question: "React API error handling কীভাবে করবেন?",
		answer: `UI-তে অন্তত এই states consider করা উচিত:

Idle
 ↓
Loading
 ↓
Success
 ↓
Error

আরও থাকতে পারে:

- Empty
- Partial
- Retry
- Unauthorized
- Forbidden
- Offline

Example:

if (isLoading) return <Loading />;
if (error) return <ErrorState />;
if (!data.length) return <EmptyState />;

Production UX-এ শুধু success state implement করা যথেষ্ট নয়।`,
	},

	{
		id: "react-55",
		category: "React.js",
		difficulty: "Intermediate",
		tags: ["Authentication", "Protected Routes"],
		question: "React application-এ protected route কী?",
		answer: `Protected route authenticated user ছাড়া access করতে দেয় না।

Flow:

Request/navigation
 ↓
Check authentication
 ↓
Authenticated?
 ├── Yes → Page
 └── No → Login

তবে শুধু frontend route protection security boundary নয়।

Backend API-তেও অবশ্যই authentication এবং authorization enforce করতে হবে।

Frontend protection মূলত UX/navigation control।`,
	},

	{
		id: "react-56",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Authentication", "Security"],
		question: "React application-এ JWT কোথায় রাখা উচিত?",
		answer: `এটি authentication architecture-এর উপর নির্ভর করে।

Browser storage:

localStorage/sessionStorage

ব্যবহার করলে JavaScript access করতে পারে, তাই XSS হলে token exposure-এর risk থাকে।

HttpOnly Secure cookie:

JavaScript সরাসরি access করতে পারে না এবং cookie-based session architecture-এর সাথে useful।

Best approach application-এর threat model অনুযায়ী নির্ধারণ করতে হবে।

Important:

- HTTPS
- Secure cookies
- HttpOnly যেখানে appropriate
- SameSite
- CSRF protection যেখানে applicable
- Short-lived access token
- Refresh strategy`,
	},

	{
		id: "react-57",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["XSS", "Security"],
		question: "React কীভাবে XSS attack থেকে protection দেয়?",
		answer: `React সাধারণ JSX rendering-এর সময় values escape করে।

Example:

<div>{userInput}</div>

এখানে userInput HTML হিসেবে execute হওয়ার কথা নয়।

Risk বাড়ে যখন raw HTML render করা হয়।

Example:

dangerouslySetInnerHTML

এটি ব্যবহার করলে trusted/sanitized HTML নিশ্চিত করতে হবে।

User-generated HTML sanitize না করে render করা উচিত নয়।`,
	},

	{
		id: "react-58",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Testing", "React Testing Library"],
		question: "React component কীভাবে test করবেন?",
		answer: `Testing levels:

Unit:
Pure function

Component:
UI behavior

Integration:
Multiple components + API/data layer

E2E:
Real user workflow

React Testing Library user behavior-এর উপর focus করে।

Example scenarios:

- Button click
- Form submission
- Validation
- Loading
- Error
- API success
- API failure

Implementation details-এর চেয়ে user-visible behavior test করা ভালো।`,
	},

	{
		id: "react-59",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Testing", "Mocking"],
		question: "React API testing-এ MSW কী?",
		answer: `MSW = Mock Service Worker।

এটি network level-এ API request intercept করে mock response দিতে পারে।

Flow:

React
 ↓
HTTP Request
 ↓
MSW intercept
 ↓
Mock Response

এতে component/API integration test করা যায় without requiring real backend.

Possible scenarios:

- 200 success
- 400 validation
- 401 unauthorized
- 500 server error
- Slow response`,
	},

	{
		id: "react-60",
		category: "React.js",
		difficulty: "Advanced",
		tags: ["Testing", "E2E"],
		question: "React application-এর E2E testing কী?",
		answer: `E2E = End-to-End testing।

Real user workflow simulate করা হয়।

Example:

Open application
 ↓
Login
 ↓
Dashboard
 ↓
Create product
 ↓
Submit
 ↓
Verify result

Tools:

- Playwright
- Cypress

E2E test expensive/slow হতে পারে, তাই critical business flows-এর উপর focus করা ভালো।`,
	},

	{
		id: "react-61",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Architecture", "Feature Based"],
		question: "Large React application-এর architecture কীভাবে design করবেন?",
		answer: `Feature-based architecture scalable হতে পারে।

Example:

src/
 ├── app/
 ├── components/
 ├── features/
 │    ├── auth/
 │    │    ├── components/
 │    │    ├── hooks/
 │    │    ├── api/
 │    │    └── types/
 │    │
 │    ├── users/
 │    ├── products/
 │    └── orders/
 │
 ├── shared/
 │    ├── ui/
 │    ├── hooks/
 │    ├── utils/
 │    └── constants/
 │
 └── services/

Feature-specific logic feature-এর মধ্যে থাকবে।

Shared logic সত্যিই shared হলে shared folder-এ যাবে।`,
	},

	{
		id: "react-62",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Architecture", "Clean Architecture"],
		question: "React application-এ Clean Architecture কীভাবে apply করবেন?",
		answer: `Possible layers:

UI
 ↓
Application/Use Case
 ↓
Domain
 ↓
Infrastructure

Example:

Component
 ↓
useCreateOrder()
 ↓
CreateOrderUseCase
 ↓
OrderRepository
 ↓
API

UI directly low-level API implementation-এর সাথে tightly coupled না থাকলে testing এবং replacement সহজ হয়।

তবে ছোট application-এ অতিরিক্ত abstraction unnecessary complexity তৈরি করতে পারে।`,
	},

	{
		id: "react-63",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Design Patterns", "React"],
		question: "React-এ common design patterns কী কী?",
		answer: `Important patterns:

- Compound Components
- Render Props
- Higher-Order Components
- Custom Hooks
- Provider Pattern
- Container/Presentational
- State Reducer Pattern
- Controlled Components
- Composition

Modern React-এ:

Composition
+
Custom Hooks
+
Context
+
Server/Client Components

বেশি common।

HOC এবং Render Props legacy codebase-এ এখনও দেখা যায়।`,
	},

	{
		id: "react-64",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Composition", "Architecture"],
		question: "React composition কেন inheritance-এর চেয়ে বেশি preferred?",
		answer: `React component reuse-এর জন্য composition encourage করে।

Example:

<Card>
  <Header />
  <Content />
  <Footer />
</Card>

একটি generic component বিভিন্ন child content accept করতে পারে।

Benefits:

- Flexible
- Loose coupling
- Reusable
- Easier to extend

React architecture-এ inheritance-এর পরিবর্তে composition সাধারণত preferred।`,
	},

	{
		id: "react-65",
		category: "React.js",
		difficulty: "Senior",
		tags: ["State Management", "Redux"],
		question: "Redux কখন ব্যবহার করবেন?",
		answer: `Redux complex global client state-এর জন্য useful হতে পারে।

Useful যখন:

- অনেক component একই state share করে
- Complex state transitions
- Predictable state updates
- Debugging/time-travel tooling প্রয়োজন
- Large team-এর standardized state architecture দরকার

Redux ব্যবহার করার আগে state-এর প্রকৃতি বুঝতে হবে।

Server state-এর জন্য Redux দিয়ে সব API cache নিজে manage করার প্রয়োজন নেই; dedicated server-state solution অনেক ক্ষেত্রে ভালো।`,
	},

	{
		id: "react-66",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Redux Toolkit", "State Management"],
		question: "Redux Toolkit কেন Redux-এর recommended approach?",
		answer: `Redux Toolkit Redux-এর boilerplate কমায় এবং recommended patterns provide করে।

Important features:

- configureStore
- createSlice
- createAsyncThunk
- RTK Query
- Immer-based immutable update handling

Example architecture:

Component
 ↓
dispatch(action)
 ↓
Slice/Reducer
 ↓
Store
 ↓
Selector
 ↓
Component

RTK Query server data fetching/cache-এর জন্যও useful।`,
	},

	{
		id: "react-67",
		category: "React.js",
		difficulty: "Senior",
		tags: ["State Management", "Zustand"],
		question: "Redux এবং Zustand-এর মধ্যে কী পার্থক্য?",
		answer: `Redux:

- Structured architecture
- Strong ecosystem
- Middleware
- DevTools
- Large-team conventions

Zustand:

- Minimal API
- Less boilerplate
- Simple store model
- Lightweight

Choice depends on:

- Application complexity
- Team preference
- Existing ecosystem
- Debugging requirements
- State architecture

কোনোটিই সব application-এর জন্য universally best নয়।`,
	},

	{
		id: "react-68",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Micro Frontend", "Architecture"],
		question: "Micro Frontend কী?",
		answer: `Micro Frontend হলো frontend application-কে independently owned/deployed feature applications-এ ভাগ করার architecture।

Example:

Shell
 ├── Admin
 ├── Commerce
 ├── Payment
 └── Reporting

Benefits:

- Team autonomy
- Independent deployment
- Large organization scaling

Challenges:

- Shared dependencies
- Routing
- Authentication
- Design consistency
- Performance
- Cross-app communication

Small application-এ Micro Frontend unnecessary complexity হতে পারে।`,
	},

	{
		id: "react-69",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Real Time", "WebSocket"],
		question: "React application-এ real-time data কীভাবে implement করবেন?",
		answer: `Common approaches:

WebSocket
 ↓
Backend
 ↓
React

অথবা:

Server-Sent Events
 ↓
React

Example:

Dashboard
 ↓
WebSocket
 ↓
Order event
 ↓
Update UI

Large application-এ WebSocket connection lifecycle, reconnection, authentication এবং cleanup properly handle করতে হয়।`,
	},

	{
		id: "react-70",
		category: "React.js",
		difficulty: "Senior",
		tags: ["WebSocket", "State"],
		question: "React WebSocket connection কীভাবে safely manage করবেন?",
		answer: `Connection lifecycle:

Component mount
 ↓
Create WebSocket
 ↓
Subscribe
 ↓
Receive events
 ↓
Update state
 ↓
Cleanup
 ↓
Close connection

Need to handle:

- Reconnection
- Backoff
- Authentication
- Duplicate connection
- Cleanup
- Heartbeat
- Server disconnect
- Offline/online state

useEffect বা dedicated custom hook ব্যবহার করে lifecycle encapsulate করা যায়।`,
	},

	{
		id: "react-71",
		category: "React.js",
		difficulty: "Senior",
		tags: ["SEO", "SSR"],
		question: "React application-এর SEO কীভাবে improve করবেন?",
		answer: `SEO-sensitive pages-এর জন্য server rendering/static generation useful হতে পারে।

Important:

- Semantic HTML
- Correct title
- Meta description
- Canonical URL
- Open Graph metadata
- Structured data
- Server-rendered content where appropriate
- Fast loading
- Good Core Web Vitals

Pure CSR application-এর SEO strategy page/content type অনুযায়ী আলাদা হতে পারে।`,
	},

	{
		id: "react-72",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Accessibility", "a11y"],
		question: "React accessibility কীভাবে নিশ্চিত করবেন?",
		answer: `Important practices:

- Semantic HTML
- Proper labels
- Keyboard navigation
- Focus management
- ARIA only when needed
- Color contrast
- Accessible buttons
- Form error messages
- Screen reader support

Bad:

<div onClick={handleClick}>Save</div>

Better:

<button onClick={handleClick}>Save</button>

Accessibility শুধু visual design issue নয়; keyboard এবং assistive technology support-ও গুরুত্বপূর্ণ।`,
	},

	{
		id: "react-73",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Internationalization", "i18n"],
		question: "React application-এ internationalization কীভাবে design করবেন?",
		answer: `UI text hardcode না করে translation resources ব্যবহার করা যায়।

Example:

en.json
{
  "welcome": "Welcome"
}

bn.json
{
  "welcome": "স্বাগতম"
}

Architecture:

Component
 ↓
Translation function
 ↓
Locale resource

Consider:

- Language switching
- Date formatting
- Number formatting
- Currency
- RTL
- Pluralization
- Dynamic content`,
	},

	{
		id: "react-74",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Internationalization", "RTL"],
		question: "RTL language support React application-এ কীভাবে করবেন?",
		answer: `Arabic/Hebrew-এর মতো RTL language support-এর জন্য document direction dynamically set করা যায়।

Example:

document.documentElement.dir = "rtl";

CSS framework/design system-এ logical properties ব্যবহার করা ভালো।

Prefer:

margin-inline-start

instead of hardcoded:

margin-left

Component library-তেও RTL support properly configure করতে হবে।`,
	},

	{
		id: "react-75",
		category: "React.js",
		difficulty: "Senior",
		tags: ["System Design", "Dashboard"],
		question: "একটি large React dashboard কীভাবে architect করবেন?",
		answer: `Example architecture:

Browser
 ↓
React App
 ↓
Router
 ↓
Feature Modules
 ├── Dashboard
 ├── Users
 ├── Orders
 ├── Reports
 └── Settings
        ↓
API Layer
        ↓
Backend

State separation:

UI State
 ↓
Local/Context/Store

Server State
 ↓
Query Cache

Real-time:
WebSocket
 ↓
Event Handler
 ↓
State/Cache Update

Performance:

- Route splitting
- Lazy loading
- Virtualized tables
- Memoization যেখানে প্রয়োজন
- Server pagination
- Debounced filters

Security:

- Authentication
- Authorization
- Secure token strategy
- Input validation

Observability:

- Error tracking
- Performance monitoring
- User/session correlation`,
	},

	{
		id: "react-76",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Performance", "Large Application"],
		question:
			"একটি React application-এর page navigation 5-10 seconds slow হলে কীভাবে debug করবেন?",
		answer: `Step-by-step:

1. Browser Performance inspect
2. Network waterfall check
3. JS bundle size check
4. API latency check
5. React Profiler
6. Long tasks identify
7. Component render count
8. Large lists inspect
9. Images inspect
10. Code splitting inspect
11. Cache behavior inspect
12. Server rendering/data-fetching path inspect

Possible causes:

- Large JS bundle
- Sequential API calls
- Slow backend
- Unnecessary re-render
- Large table
- Blocking JavaScript
- Missing cache
- Hydration cost

First measure, তারপর optimize।`,
	},

	{
		id: "react-77",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Performance", "Rendering"],
		question: "একটি parent component re-render হলে সব child কি re-render হয়?",
		answer: `Parent re-render হলে child elements-এর নতুন render output তৈরি হতে পারে।

কিন্তু actual DOM update এবং component rendering একই বিষয় নয়।

React.memo-এর মতো optimization child re-render skip করার সুযোগ দিতে পারে যখন props unchanged থাকে।

Performance বুঝতে:

Parent render
 ↓
Child render?
 ↓
Memoization?
 ↓
Props identity?
 ↓
Context?
 ↓
Actual DOM update?

React DevTools Profiler দিয়ে actual behavior measure করা উচিত।`,
	},

	{
		id: "react-78",
		category: "React.js",
		difficulty: "Senior",
		tags: ["Stale Closure", "Hooks"],
		question: "React-এ stale closure কী?",
		answer: `Function কোনো পুরনো render-এর state/props capture করলে stale closure হতে পারে।

Example:

useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(timer);
}, []);

এখানে dependency design ভুল হলে callback পুরনো count ধরে রাখতে পারে।

Solutions:

- Correct dependencies
- Functional state update
- useRef যেখানে appropriate
- Effect architecture ঠিক করা

Hooks-এর closure behavior বুঝতে পারা senior React developer-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "react-79",
		category: "React.js",
		difficulty: "Senior",
		tags: ["State", "Immutability"],
		question: "React state immutableভাবে update করা কেন গুরুত্বপূর্ণ?",
		answer: `React state update-এ নতুন object/array reference তৈরি করা সাধারণ pattern।

Bad:

user.name = "New";
setUser(user);

Better:

setUser({
  ...user,
  name: "New"
});

Array:

setItems([
  ...items,
  newItem
]);

Immutable updates:

- Predictable
- Easier debugging
- Memoization-এর সাথে compatible
- Change detection সহজ করে

Nested structures-এর ক্ষেত্রে Immer-এর মতো tools ব্যবহার করা যেতে পারে।`,
	},

	{
		id: "react-80",
		category: "React.js",
		difficulty: "Senior",
		tags: ["System Design", "Architecture"],
		question:
			"Senior React developer হিসেবে production-grade React architecture কীভাবে design করবেন?",
		answer: `একটি scalable architecture:

                    Browser
                       ↓
                 React Application
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
          UI State         Server State
              ↓                 ↓
       Local/Context/Store   Query Cache
              │                 │
              └────────┬────────┘
                       ↓
                    API Layer
                       ↓
                Backend Services
                       ↓
                  Database/Cache

Application layers:

1. App/Shell
2. Routing
3. Features
4. Shared UI
5. Hooks
6. API/Data layer
7. State management
8. Utilities
9. Error boundaries
10. Testing
11. Observability

Performance:

- Code splitting
- Lazy loading
- Virtualization
- Server rendering where useful
- Cache
- Image optimization
- Avoid unnecessary renders

Security:

- Backend authorization
- XSS prevention
- Secure authentication
- CSRF protection where applicable
- Dependency security

Quality:

- TypeScript
- ESLint
- Unit tests
- Integration tests
- E2E tests
- CI/CD

Modern React architecture-এ সবচেয়ে গুরুত্বপূর্ণ হলো:
"কোন state কোথায় থাকবে, কোন code server-এ চলবে, কোন code client-এ চলবে, এবং কোন data কীভাবে fetch/cache/update হবে"—এই boundaries পরিষ্কারভাবে design করা।`,
	},
];
