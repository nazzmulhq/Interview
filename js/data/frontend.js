const seniorFrontendQuestions = [
  {
    id: "sfe-1",
    category: "Micro Frontends",
    difficulty: "Advanced",
    tags: ["Architecture", "Micro Frontend", "Scalability"],
    question: "Micro Frontend Architecture কী এবং কখন এটি ব্যবহার করা উচিত?",
    answer: `
      <p><strong>Micro Frontend (MFE)</strong> হলো এমন একটি আর্কিটেকচারাল স্টাইল যেখানে একটি বৃহৎ ফ্রন্টএন্ড অ্যাপ্লিকেশনকে ছোট ছোট, স্বাধীন এবং ডিপ্লয়েবল মাইক্রো অ্যাপে ভাগ করা হয়। ব্যাকএন্ডের Microservices-এর মতোই ফ্রন্টএন্ডে এর প্রয়োগ।</p>
      <h4>কখন ব্যবহার করবেন?</h4>
      <ul>
        <li>যখন অ্যাপ্লিকেশনটি অনেক বড় হয়ে যায় এবং একটি একক রিপোজিটরি (Monolith) ম্যানেজ করা কঠিন হয়।</li>
        <li>একাধিক টিম (যেমন- Amazon-এর Checkout টিম, Search টিম) আলাদাভাবে কাজ করতে চাইলে।</li>
        <li>বিভিন্ন টিম তাদের নিজস্ব টেক স্ট্যাক (React, Vue, Angular) ব্যবহার করতে চাইলে।</li>
      </ul>
      <h4>সুবিধা ও অসুবিধা:</h4>
      <p><strong>সুবিধা:</strong> Independent deployment, Codebase isolation, Team autonomy.<br>
      <strong>অসুবিধা:</strong> UI Inconsistency, Bundle size বেড়ে যাওয়া (একই লাইব্রেরি একাধিক বার লোড হতে পারে), Cross-app communication জটিলতা।</p>
    `
  },
  {
    id: "sfe-2",
    category: "Micro Frontends",
    difficulty: "Advanced",
    tags: ["Module Federation", "Webpack 5", "Build Tools"],
    question: "Webpack 5 Module Federation কী? এটি কীভাবে Micro Frontend ইমপ্লিমেন্ট করতে সাহায্য করে?",
    answer: `
      <p><strong>Module Federation</strong> হলো Webpack 5-এর একটি ফিচার যা একটি জাভাস্ক্রিপ্ট অ্যাপ্লিকেশনকে রানটাইমে অন্য একটি অ্যাপ্লিকেশন বা বান্ডল থেকে কোড লোড করতে দেয়। </p>
      <h4>কিভাবে কাজ করে:</h4>
      <ul>
        <li><strong>Host (Container):</strong> মূল অ্যাপ্লিকেশন যা রানটাইমে অন্যান্য মডিউল লোড করে।</li>
        <li><strong>Remote:</strong> আলাদাভাবে বিল্ড করা মাইক্রো অ্যাপ যা Host-এ লোড হয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// webpack.config.js (Host App)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        // 'auth' remote app-টি রানটাইমে লোড হবে
        auth: 'auth@http://localhost:3001/remoteEntry.js',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
};

// Host App-এর ভেতরে লোড করা
const AuthApp = React.lazy(() => import('auth/AuthWidget'));</code></pre>
      </div>
      <p><strong>সুবিধা:</strong> একই React বা ReactDOM লাইব্রেরি Host এবং Remote-এ শেয়ার করা যায় (<code>singleton: true</code>), ফলে বান্ডল সাইজ কমে এবং State শেয়ারিং সহজ হয়।</p>
    `
  },
  {
    id: "sfe-3",
    category: "Micro Frontends",
    difficulty: "Advanced",
    tags: ["Communication", "State Management", "Event Bus"],
    question: "Micro Frontend-এ একাধিক independent app-এর মধ্যে Communication বা State Sharing কীভাবে করবেন?",
    answer: `
      <p>যেহেতু MFE গুলো আলাদা বান্ডল, তাই সরাসরি React Context বা Redux কাজ করবে না। কমিউনিকেশনের জন্য নিচের পদ্ধতিগুলো ব্যবহার করা হয়:</p>
      <ol>
        <li><strong>Custom Events (Event Bus / Pub-Sub):</strong> সবচেয়ে বেশি ব্যবহৃত প্যাটার্ন। একটি অ্যাপ ইভেন্ট পাঠায়, অন্যটি লিসেন করে।</li>
        <li><strong>URL/Route Parameters:</strong> রাউটারের মাধ্যমে ডেটা পাস করা (যেমন- <code>/dashboard?tenant=abc</code>)।</li>
        <li><strong>Browser Storage:</strong> LocalStorage বা SessionStorage-এর মাধ্যমে ডেটা শেয়ার করা (তবে সিঙ্ক্রোনাইজেশন কঠিন)।</li>
        <li><strong>Global Window Object:</strong> <code>window</code> অবজেক্টে কাস্টম প্রপার্টি রেখে শেয়ার করা (পরিষ্কার নয়, এড়িয়ে চলা ভালো)।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Custom Event Bus Implementation
class EventBus {
  constructor() { this.events = {}; }
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
  publish(event, data) {
    if (this.events[event]) this.events[event].forEach(cb => cb(data));
  }
}
window.mfeEventBus = new EventBus();

// MFE 1 (Publisher)
window.mfeEventBus.publish('userLoggedIn', { id: 123, name: 'Rahim' });

// MFE 2 (Subscriber)
window.mfeEventBus.subscribe('userLoggedIn', (user) => {
  console.log('User updated in MFE 2:', user);
});</code></pre>
      </div>
    `
  },
  {
    id: "sfe-4",
    category: "Micro Frontends",
    difficulty: "Advanced",
    tags: ["Single SPA", "Routing", "Framework Agnostic"],
    question: "Single SPA (Single Page Application) Framework কী? Module Federation থেকে এর পার্থক্য কী?",
    answer: `
      <p><strong>Single SPA</strong> হলো একটি Framework-agnostic Micro Frontend ফ্রেমওয়ার্ক। এটি রাউটিং হ্যান্ডল করে এবং সিদ্ধান্ত নেয় কোন URL-এ কোন মাইক্রো অ্যাপটি লোড হবে।</p>
      <h4>Module Federation vs Single SPA:</h4>
      <ul>
        <li><strong>Module Federation:</strong> এটি মূলত Webpack-এর একটি প্লাগইন। এটি কোড শেয়ারিং এবং রানটাইমে বান্ডল লোড করার কাজ করে। কিন্তু রাউটিং নিজে হ্যান্ডল করে না।</li>
        <li><strong>Single SPA:</strong> এটি একটি সম্পূর্ণ রাউটিং লেয়ার। এটি প্যাথ অনুযায়ী অ্যাপ লোড করে (যেমন- <code>/auth</code> এ Auth অ্যাপ, <code>/dashboard</code> এ Dashboard অ্যাপ)। বিভিন্ন ফ্রেমওয়ার্ক (React, Angular, Vue) একসাথে চালানো যায়।</li>
      </ul>
      <p><em>বর্তমান ট্রেন্ড:</em> Module Federation বেশি পপুলার হলেও, যদি সম্পূর্ণ আলাদা ফ্রেমওয়ার্ক একসাথে চালাতে হয়, তখন Single SPA ব্যবহার করা হয়।</p>
    `
  },
  {
    id: "sfe-5",
    category: "Performance",
    difficulty: "Advanced",
    tags: ["Core Web Vitals", "LCP", "CLS", "INP"],
    question: "Core Web Vitals (LCP, CLS, INP) কী এবং সিনিয়র ডেভেলপার হিসেবে আপনি এগুলো কীভাবে অপটিমাইজ করবেন?",
    answer: `
      <p>Core Web Vitals হলো Google-এর প্রস্তাবিত মেট্রিক্স যা একটি ওয়েব পেজের ইউজার এক্সপেরিয়েন্স মাপে।</p>
      <ol>
        <li><strong>LCP (Largest Contentful Paint):</strong> পেজের সবচেয়ে বড় এলিমেন্ট (যেমন- Hero Image) লোড হতে কত সময় লাগে। (Target: < 2.5s)।
          <ul><li><em>অপটিমাইজেশন:</em> Image optimization (WebP/AVIF), Lazy loading, CDN ব্যবহার, Render-blocking CSS/JS সরিয়ে ফেলা।</li></ul>
        </li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> পেজ লোড হওয়ার সময় এলিমেন্টগুলো কতটা নড়াচড়া করে। (Target: < 0.1)।
          <ul><li><em>অপটিমাইজেশন:</em> ছবি বা ভিডিওর জন্য আগে থেকে <code>width</code> ও <code>height</code> সেট করা, Font swap এড়াতে <code>font-display: swap</code> ব্যবহার করা, ডায়নামিক এড স্লটের জন্য মিনিমাম হাইট রাখা।</li></ul>
        </li>
        <li><strong>INP (Interaction to Next Paint):</strong> ইউজার ক্লিক বা টাইপ করার পর স্ক্রিনে রেসপন্স দেখতে কত সময় লাগে। (FID এর বদলে এটি এসেছে, Target: < 200ms)।
          <ul><li><em>অপটিমাইজেশন:</em> Main Thread ব্লক না করা, Heavy computation Web Workers-এ পাঠানো, Debouncing/Throttling ব্যবহার করা।</li></ul>
        </li>
      </ol>
    `
  },
  {
    id: "sfe-6",
    category: "Architecture",
    difficulty: "Advanced",
    tags: ["State Management", "Redux", "React Query"],
    question: "Global State (Redux) এবং Server State (React Query) এর মধ্যে পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p>আধুনিক ফ্রন্টএন্ড আর্কিটেকচারে State-কে দুই ভাগে ভাগ করা হয়:</p>
      <ul>
        <li><strong>Client State:</strong> ইউজারের UI-এর সাথে সরাসরি সম্পর্কিত ডেটা। যেমন- Theme (Dark/Light), Sidebar open/close, Form input values।</li>
        <li><strong>Server State:</strong> সার্ভার থেকে আসা ডেটা। যেমন- User Profile, Product List, Dashboard stats। এটি অ্যাসিনক্রোনাস এবং পুরোনো হয়ে যেতে পারে (Stale)।</li>
      </ul>
      <h4>কখন কোনটি?</h4>
      <p><strong>React Query / SWR:</strong> Server State ম্যানেজ করার জন্য সেরা। এটি অটোমেটিক্যালি Caching, Background Refetching, এবং Pagination হ্যান্ডল করে। Redux-এ এই কাজগুলো ম্যানুয়ালি করতে হয় (Boilerplate code বাড়ে)।<br>
      <strong>Redux / Zustand:</strong> শুধু Client State বা অ্যাপ্লিকেশনের গ্লোবাল UI লজিক ম্যানেজ করার জন্য ব্যবহার করা উচিত।</p>
      <p><em>আধুনিক অ্যাপ্রোচ:</em> Redux Toolkit (RTK) Query ব্যবহার করলে দুটোই একসাথে পাওয়া যায়।</p>
    `
  },
  {
    id: "sfe-7",
    category: "Performance",
    difficulty: "Advanced",
    tags: ["Bundle Size", "Code Splitting", "Tree Shaking"],
    question: "React অ্যাপ্লিকেশনের Bundle Size অনেক বড় হয়ে গেলে আপনি কীভাবে অপটিমাইজ করবেন?",
    answer: `
      <p>বড় বান্ডল সাইজ পারফরম্যান্স নষ্ট করে। এটি অপটিমাইজ করার প্রধান উপায়গুলো:</p>
      <ol>
        <li><strong>Code Splitting (Dynamic Import):</strong> রাউট বা কম্পোনেন্ট লেভেলে কোড ভাগ করা। যাতে প্রথম লোডে শুধু প্রয়োজনীয় কোড আসে।
          <pre><code>const Dashboard = React.lazy(() => import('./Dashboard'));</code></pre>
        </li>
        <li><strong>Tree Shaking:</strong> Webpack/Vite কনফিগ ঠিক রাখা যাতে লাইব্রেরির ব্যবহৃত অংশ ছাড়া বাকিটা বান্ডলে না আসে। (<code>sideEffects: false</code> in package.json)।</li>
        <li><strong>Heavy Libraries Replacement:</strong> Moment.js (বড়) এর বদলে date-fns (ট্রি-শেকেবল) ব্যবহার করা। Lodash এর বদলে স্পেসিফিক ফাংশন ইম্পোর্ট করা।</li>
        <li><strong>Bundle Analyzer:</strong> <code>webpack-bundle-analyzer</code> ব্যবহার করে দেখা কোন প্যাকেজ সবচেয়ে বেশি জায়গা নিয়েছে।</li>
        <li><strong>Image Optimization:</strong> SVG-এর বদলে WebP, এবং বড় ছবি Lazy load করা।</li>
      </ol>
    `
  },
  {
    id: "sfe-8",
    category: "Architecture",
    difficulty: "Advanced",
    tags: ["Design System", "Monorepo", "Component Library"],
    question: "Enterprise লেভেলে Design System তৈরি করার সময় আপনি কী কী বিষয় বিবেচনা করবেন?",
    answer: `
      <p>একটি সফল Design System শুধু কম্পোনেন্টের সংগ্রহ নয়, এটি পুরো প্রোডাক্টের একই রকম লুক অ্যান্ড ফিল নিশ্চিত করে।</p>
      <ol>
        <li><strong>Framework Agnostic (Web Components):</strong> যদি একাধিক ফ্রেমওয়ার্ক (React, Vue) থাকে, তবে Lit বা Stencil দিয়ে Web Components তৈরি করা ভালো।</li>
        <li><strong>Theming & Tokens:</strong> CSS Variables (<code>--primary-color</code>) ব্যবহার করে Design Tokens ডিফাইন করা, যাতে সহজে White-labeling করা যায়।</li>
        <li><strong>Accessibility (a11y):</strong> প্রতিটি কম্পোনেন্ট অবশ্যই WAI-ARIA স্ট্যান্ডার্ড মানতে হবে (Keyboard navigation, Screen reader support)।</li>
        <li><strong>Documentation:</strong> Storybook ব্যবহার করে কম্পোনেন্টের ইন্টারঅ্যাকটিভ ডকুমেন্টেশন তৈরি করা।</li>
        <li><strong>Distribution:</strong> প্রাইভেট npm রেজিস্ট্রিতে পাবলিশ করা এবং Semantic Versioning (SemVer) ফলো করা।</li>
        <li><strong>Headless UI:</strong> লজিক (Radix UI, Headless UI) এবং স্টাইল আলাদা রাখা, যাতে ডেভেলপাররা নিজেদের মতো স্টাইল করতে পারে।</li>
      </ol>
    `
  },
  {
    id: "sfe-9",
    category: "Real-World Scenario",
    difficulty: "Advanced",
    tags: ["Memory Leak", "useEffect", "Cleanup"],
    question: "React অ্যাপ্লিকেশনে Memory Leak কীভাবে ঘটে এবং আপনি কীভাবে ডিবাগ ও প্রতিরোধ করবেন?",
    answer: `
      <p>React-এ Memory Leak সাধারণত ঘটে যখন কোনো কম্পোনেন্ট Unmount হয়ে যায়, কিন্তু তার অ্যাসিনক্রোনাস কাজ (যেমন- API Call, setInterval) ব্যাকগ্রাউন্ডে চলতে থাকে এবং State আপডেট করার চেষ্টা করে।</p>
      <h4>কারণ ও প্রতিরোধ:</h4>
      <ul>
        <li><strong>Uncleaned Timers:</strong> <code>setInterval</code> বা <code>setTimeout</code> ক্লিয়ার না করা।
          <pre><code>useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(id); // Cleanup
}, []);</code></pre>
        </li>
        <li><strong>Unmounted Component State Update:</strong> API রিকোয়েস্ট শেষ হওয়ার আগে কম্পোনেন্ট আনমাউন্ট হলে।
          <pre><code>useEffect(() => {
  let isMounted = true;
  fetch('/api/data').then(data => {
    if (isMounted) setData(data);
  });
  return () => { isMounted = false; };
}, []);</code></pre>
        <li><strong>Event Listeners:</strong> <code>window.addEventListener</code> রিমুভ না করা।</li>
        <li><strong>Closures in WebSockets:</strong> পুরোনো স্টেট ক্লোজারে আটকে থাকা।</li>
      </ul>
      <h4>ডিবাগ করার উপায়:</h4>
      <p>Chrome DevTools-এর <strong>Memory</strong> ট্যাবে গিয়ে "Heap Snapshot" নিতে হয়। কম্পোনেন্ট আনমাউন্ট করার আগে ও পরে স্ন্যাপশট তুলে তুলনা করলে বোঝা যায় কোন অবজেক্টটি মেমোরিতে ধরে রাখা হয়েছে (Detached DOM nodes)।</p>
    `
  },
  {
    id: "sfe-10",
    category: "Architecture",
    difficulty: "Advanced",
    tags: ["Web Workers", "Main Thread", "CPU Intensive"],
    question: "Frontend-এ কোনো CPU-Intensive কাজ (যেমন- বড় JSON পার্সিং বা Image Processing) আসলে আপনি কীভাবে হ্যান্ডেল করবেন যাতে UI ফ্রিজ না হয়?",
    answer: `
      <p>JavaScript Single-threaded, তাই বড় হিসাব বা প্রসেসিং মেইন থ্রেডে করলে UI ব্লক হয়ে যায় (INP খারাপ হয়)। এটি সমাধানের জন্য <strong>Web Workers</strong> ব্যবহার করতে হয়।</p>
      <h4>Web Workers কীভাবে কাজ করে:</h4>
      <p>Web Worker হলো ব্যাকগ্রাউন্ডে চলা একটি আলাদা থ্রেড। এটি মেইন থ্রেডের UI-কে ব্লক না করে ভারী কাজ সম্পন্ন করে। থ্রেডগুলোর মধ্যে যোগাযোগ হয় <code>postMessage</code> এর মাধ্যমে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// main.js
const worker = new Worker('./heavyTask.worker.js');

// UI ব্লক হবে না
worker.postMessage({ data: hugeArray });

worker.onmessage = function(event) {
  console.log('Result from worker:', event.data);
  setProcessedData(event.data);
};

// heavyTask.worker.js
self.onmessage = function(event) {
  const result = doHeavyCalculation(event.data); // CPU intensive task
  self.postMessage(result);
};</code></pre>
      </div>
      <p>React-এ এটি সহজে করার জন্য <code>comlink</code> লাইব্রেরি বা <code>useWebWorker</code> হুক ব্যবহার করা যায়।</p>
    `
  },
  {
    id: "sfe-11",
    category: "Security",
    difficulty: "Advanced",
    tags: ["XSS", "CSRF", "CSP"],
    question: "Frontend Security-তে XSS এবং CSRF অ্যাটাক কী এবং আপনি কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p><strong>XSS (Cross-Site Scripting):</strong> অ্যাটাকার যখন আপনার ওয়েবসাইটে বিপজ্জনক JavaScript ইনজেক্ট করে।</p>
      <ul>
        <li><em>প্রতিরোধ:</em> ইউজার ইনপুট স্যানিটাইজ করা (DOMPurify)। React-এ <code>dangerouslySetInnerHTML</code> এড়িয়ে চলা। HTTP হেডারে <strong>Content Security Policy (CSP)</strong> সেট করা, যাতে অননুমোদিত স্ক্রিপ্ট রান না হয়।</li>
      </ul>
      <p><strong>CSRF (Cross-Site Request Forgery):</strong> অ্যাটাকার ইউজারের লগইন সেশন ব্যবহার করে অনাকাঙ্ক্ষিত রিকোয়েস্ট (যেমন- টাকা ট্রান্সফার) পাঠায়।</p>
      <ul>
        <li><em>প্রতিরোধ:</em> প্রতিটি ফর্মের সাথে একটি লুকানো <strong>Anti-CSRF Token</strong> পাঠানো এবং সার্ভারে ভ্যালিডেট করা। কুকিতে <code>SameSite=Strict</code> বা <code>Lax</code> সেট করা, যাতে অন্য ডোমেইন থেকে রিকোয়েস্ট এলে কুকি না যায়।</li>
      </ul>
    `
  },
  {
    id: "sfe-12",
    category: "Real-World Scenario",
    difficulty: "Advanced",
    tags: ["Rendering", "SSR", "Hydration"],
    question: "React Hydration কী? Hydration Mismatch Error কেন ঘটে এবং কীভাবে সমাধান করবেন?",
    answer: `
      <p>SSR (Server-Side Rendering)-এ সার্ভার থেকে প্লেইন HTML ক্লায়েন্টে পাঠানো হয়। এরপর ক্লায়েন্টে জাভাস্ক্রিপ্ট লোড হওয়ার পর সেই HTML-কে ইন্টারঅ্যাকটিভ (Event listeners যুক্ত) করার প্রক্রিয়াকে <strong>Hydration</strong> বলে।</p>
      <h4>Hydration Mismatch Error:</h4>
      <p>যদি সার্ভারে রেন্ডার হওয়া HTML এবং ক্লায়েন্টে রেন্ডার হওয়া React ট্রি-এর মধ্যে কোনো পার্থক্য থাকে, তবে React এই এরর থ্রো করে।</p>
      <h4>কারণ ও সমাধান:</h4>
      <ul>
        <li><strong>Browser API (window, localStorage):</strong> সার্ভারে <code>window</code> থাকে না।
          <em>সমাধান:</em> <code>useEffect</code> এর ভেতরে ব্রাউজার API ব্যবহার করা (কারণ useEffect শুধু ক্লায়েন্টে রান করে)।</li>
        <li><strong>Date/Time বা Random Number:</strong> সার্ভার ও ক্লায়েন্টে টাইম আলাদা হতে পারে।
          <em>সমাধান:</em> ডেট ফরম্যাটিং ক্লায়েন্ট সাইডে করা।</li>
        <li><strong>Theme (Dark/Light):</strong> সার্ভার ডিফল্ট থিম পাঠে, কিন্তু ক্লায়েন্টের localStorage-এ আরেক থিম থাকতে পারে।
          <em>সমাধান:</em> Next.js-এ <code>next-themes</code> ব্যবহার করা বা <code>suppressHydrationWarning</code> অ্যাট্রিবিউট ব্যবহার করা।</li>
      </ul>
    `
  }
];
