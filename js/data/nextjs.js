const nextJsInterviewQuestions = [
  {
    "id": "next-1",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "Basics",
      "Framework"
    ],
    "question": "Next.js কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Next.js হলো React-এর উপর তৈরি একটি full-stack web framework।</p>\n      <p>React মূলত UI library, কিন্তু Next.js production application-এর জন্য অতিরিক্ত features দেয়।</p>\n      <h4>Next.js-এর গুরুত্বপূর্ণ features:</h4>\n      <ul>\n        <li>File-based routing</li>\n        <li>App Router</li>\n        <li>Server Components</li>\n        <li>Client Components</li>\n        <li>Server-side rendering</li>\n        <li>Static rendering</li>\n        <li>Dynamic rendering</li>\n        <li>Streaming</li>\n        <li>Suspense</li>\n        <li>Route Handlers</li>\n        <li>Middleware/Proxy-based request handling</li>\n        <li>Server Actions</li>\n        <li>Data fetching</li>\n        <li>Caching</li>\n        <li>Image optimization</li>\n        <li>Font optimization</li>\n        <li>Metadata/SEO</li>\n        <li>Authentication integration</li>\n        <li>API integration</li>\n      </ul>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nNext.js\n ├── Server Components\n ├── Client Components\n ├── Server Actions\n ├── Route Handlers\n └── Rendering/Cache\n        ↓\n     Backend/DB/API</code></pre>\n      </div>\n    "
  },
  {
    "id": "next-2",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "React",
      "Next.js"
    ],
    "question": "React এবং Next.js-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>React হলো UI library।</p>\n      <p>Next.js হলো React-based full-stack framework।</p>\n      <h4>React:</h4>\n      <ul>\n        <li>Component UI</li>\n        <li>State</li>\n        <li>Hooks</li>\n        <li>Rendering</li>\n      </ul>\n      <h4>Next.js:</h4>\n      <ul>\n        <li>React</li>\n        <li>Routing</li>\n        <li>Server Components</li>\n        <li>SSR</li>\n        <li>Static rendering</li>\n        <li>Dynamic rendering</li>\n        <li>Streaming</li>\n        <li>Server Actions</li>\n        <li>Route Handlers</li>\n        <li>Metadata</li>\n        <li>Image optimization</li>\n        <li>Full-stack application structure</li>\n      </ul>\n      <h4>সহজভাবে:</h4>\n      <p>React = UI building</p>\n      <p>Next.js = Production React application framework</p>\n    "
  },
  {
    "id": "next-3",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "App Router",
      "Routing"
    ],
    "question": "Next.js App Router কী?",
    "answer": "\n      <p>App Router হলো Next.js-এর modern routing architecture।</p>\n      <p>এটি app/ directory-এর উপর ভিত্তি করে কাজ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n ├── page.tsx\n ├── layout.tsx\n ├── loading.tsx\n ├── error.tsx\n ├── not-found.tsx\n ├── users/\n │    └── page.tsx\n └── products/\n      └── page.tsx</code></pre>\n      </div>\n      <p>প্রতিটি folder একটি route segment এবং page.tsx সেই route-এর UI।</p>\n      <p>App Router Server Components এবং modern React features-এর সাথে closely integrated।</p>\n    "
  },
  {
    "id": "next-4",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "Routing",
      "File Based Routing"
    ],
    "question": "Next.js file-based routing কীভাবে কাজ করে?",
    "answer": "\n      <p>Folder structure route structure define করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n ├── page.tsx\n ├── about/\n │    └── page.tsx\n └── products/\n      └── page.tsx</code></pre>\n      </div>\n      <h4>Routes:</h4>\n      <p>/<br> /about<br> /products</p>\n      <p>Next.js route configuration-এর অনেক অংশ filesystem থেকে automatically তৈরি করে।</p>\n    "
  },
  {
    "id": "next-5",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "Routing",
      "Dynamic Route"
    ],
    "question": "Dynamic route কীভাবে তৈরি করবেন?",
    "answer": "\n      <p>Square bracket ব্যবহার করে dynamic segment তৈরি করা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/products/[id]/page.tsx</code></pre>\n      </div>\n      <h4>URL:</h4>\n      <p>/products/100<br>/products/200</p>\n      <h4>এখানে:</h4>\n      <p>id = dynamic parameter</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export default async function Page({ params }) {\n  const { id } = await params;</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;div&gt;Product: {id}&lt;/div&gt;;\n}</code></pre>\n      </div>\n      <p>Dynamic route product details, user profile ইত্যাদির জন্য common।</p>\n    "
  },
  {
    "id": "next-6",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Routing",
      "Catch All"
    ],
    "question": "Catch-all এবং optional catch-all route কী?",
    "answer": "\n      <h4>Catch-all:</h4>\n      <p>app/docs/[...slug]/page.tsx</p>\n      <h4>Matches:</h4>\n      <p>/docs/a<br>/docs/a/b<br>/docs/a/b/c</p>\n      <h4>Optional catch-all:</h4>\n      <p>app/docs/[[...slug]]/page.tsx</p>\n      <h4>এটি base route-ও match করতে পারে:</h4>\n      <p>/docs<br>/docs/a<br>/docs/a/b</p>\n      <p>Documentation, CMS এবং nested content routing-এর জন্য useful।</p>\n    "
  },
  {
    "id": "next-7",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Route Groups",
      "Routing"
    ],
    "question": "Route Groups কী?",
    "answer": "\n      <p>Parentheses ব্যবহার করে route group তৈরি করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n ├── (marketing)/\n │    ├── page.tsx\n │    └── pricing/\n │         └── page.tsx\n └── (dashboard)/\n      └── dashboard/\n           └── page.tsx</code></pre>\n      </div>\n      <p>Parentheses route URL-এর অংশ হয় না।</p>\n      <h4>এটি:</h4>\n      <ul>\n        <li>Organization</li>\n        <li>Separate layouts</li>\n        <li>Feature grouping</li>\n      </ul>\n      <p>এর জন্য useful।</p>\n    "
  },
  {
    "id": "next-8",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Parallel Routes",
      "Routing"
    ],
    "question": "Parallel Routes কী?",
    "answer": "\n      <p>Parallel Routes একই layout-এর মধ্যে একাধিক route segment independently render করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n ├── @team/\n ├── @analytics/\n └── layout.tsx</code></pre>\n      </div>\n      <h4>একই page structure-এর মধ্যে:</h4>\n      <p>Team<br>+<br>Analytics</p>\n      <p>independently render করা যায়।</p>\n      <p>Dashboard-এর complex multi-panel UI-এর ক্ষেত্রে useful।</p>\n    "
  },
  {
    "id": "next-9",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Intercepting Routes"
    ],
    "question": "Intercepting Routes কী?",
    "answer": "\n      <p>Intercepting Routes একটি route navigation-এর সময় অন্য route-এর UI contextually show করতে দেয়।</p>\n      <h4>Common example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Product list\n ↓\nClick product\n ↓\nProduct details modal</code></pre>\n      </div>\n      <h4>Direct URL:</h4>\n      <p>/products/100</p>\n      <h4>কিন্তু navigation-এর সময়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>/products\n ↓\nModal product details</code></pre>\n      </div>\n      <p>এ ধরনের UX-এর জন্য Intercepting Routes useful।</p>\n    "
  },
  {
    "id": "next-10",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "Layout"
    ],
    "question": "Next.js layout কী?",
    "answer": "\n      <p>layout.tsx shared UI define করে যা multiple routes-এর মধ্যে reuse হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/layout.tsx</code></pre>\n      </div>\n      <h4>এখানে থাকতে পারে:</h4>\n      <ul>\n        <li>Header</li>\n        <li>Sidebar</li>\n        <li>Footer</li>\n        <li>Providers</li>\n      </ul>\n      <p>Nested layout ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/\n ├── layout.tsx\n └── dashboard/\n      ├── layout.tsx\n      └── page.tsx</code></pre>\n      </div>\n      <p>Dashboard-এর জন্য আলাদা layout থাকবে।</p>\n    "
  },
  {
    "id": "next-11",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Layout",
      "State"
    ],
    "question": "Next.js layout এবং page-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>page.tsx একটি নির্দিষ্ট route-এর UI।</p>\n      <p>layout.tsx shared UI structure।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Root Layout\n ↓\nDashboard Layout\n ↓\nDashboard Page</code></pre>\n      </div>\n      <p>Layout navigation-এর সময় সাধারণত preserve করা যায়, ফলে shared UI unnecessarily recreate না করেও রাখা যায়।</p>\n      <p>Large application-এ nested layouts খুব গুরুত্বপূর্ণ architecture feature।</p>\n    "
  },
  {
    "id": "next-12",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "Loading UI",
      "Suspense"
    ],
    "question": "loading.tsx কী?",
    "answer": "\n      <p>loading.tsx route segment-এর loading UI define করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/dashboard/loading.tsx</code></pre>\n      </div>\n      <p>Data বা route rendering-এর সময় user একটি fallback/loading UI দেখতে পারে।</p>\n      <p>এটি Suspense-based streaming architecture-এর সাথে integrated।</p>\n    "
  },
  {
    "id": "next-13",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Error Handling"
    ],
    "question": "Next.js error.tsx কী?",
    "answer": "\n      <p>error.tsx route segment-এর rendering error-এর জন্য error UI define করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/dashboard/error.tsx</code></pre>\n      </div>\n      <p>এটি সাধারণত Client Component হতে হয় কারণ reset/recovery interaction থাকতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Dashboard\n ↓\nError\n ↓\nError UI\n ↓\nRetry / Reset</code></pre>\n      </div>\n    "
  },
  {
    "id": "next-14",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "404",
      "Routing"
    ],
    "question": "Next.js-এ 404 page কীভাবে handle করবেন?",
    "answer": "\n      <p>not-found.tsx ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/not-found.tsx</code></pre>\n      </div>\n      <h4>Specific route segment-এর জন্যও:</h4>\n      <p>app/products/not-found.tsx</p>\n      <h4>Programmatically:</h4>\n      <p>notFound();</p>\n      <p>ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const product = await getProduct(id);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>if (!product) {\n  notFound();\n}</code></pre>\n      </div>\n    "
  },
  {
    "id": "next-15",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Server Components",
      "RSC"
    ],
    "question": "Next.js App Router-এ component defaultভাবে Server Component কেন?",
    "answer": "\n      <p>App Router-এর architecture server-first।</p>\n      <h4>Default component Server Component হওয়ায়:</h4>\n      <ul>\n        <li>Server-side data access সহজ</li>\n        <li>Client JavaScript কমে</li>\n        <li>Sensitive server logic client bundle-এ পাঠানোর প্রয়োজন কমে</li>\n        <li>Initial rendering efficient হতে পারে</li>\n      </ul>\n      <h4>Interactive component-এর জন্য:</h4>\n      <p>\"use client\"</p>\n      <p>দিতে হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>\"use client\";</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>import { useState } from \"react\";</code></pre>\n      </div>\n      <p>এটি component-কে Client Component boundary-তে নিয়ে যায়।</p>\n    "
  },
  {
    "id": "next-16",
    "category": "Next.js",
    "difficulty": "Beginner",
    "tags": [
      "Client Components"
    ],
    "question": "\"use client\" কী করে?",
    "answer": "\n      <p>\"use client\" file-এর top-এ দিলে সেই module একটি Client Component boundary হিসেবে treated হয়।</p>\n      <h4>এটি প্রয়োজন হতে পারে:</h4>\n      <ul>\n        <li>useState</li>\n        <li>useEffect</li>\n        <li>Event handlers</li>\n        <li>Browser APIs</li>\n        <li>Client-side interaction</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>\"use client\";</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export default function Counter() {\n  const [count, setCount] = useState(0);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;button&gt;{count}&lt;/button&gt;;\n}</code></pre>\n      </div>\n      <p>শুধু component interactive করার জন্য প্রয়োজনীয় জায়গাতেই \"use client\" রাখা ভালো।</p>\n    "
  },
  {
    "id": "next-17",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Server Components",
      "Client Components"
    ],
    "question": "Server Component থেকে Client Component-এ কী pass করা যায়?",
    "answer": "\n      <p>Server → Client boundary পার হওয়ার সময় serializable data pass করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;UserCard user={user} /&gt;</code></pre>\n      </div>\n      <p>যেখানে user plain serializable object।</p>\n      <p>Server function, database connection বা arbitrary non-serializable object client component-এ সরাসরি pass করা যায় না।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server Component\n ↓\nSerializable Props\n ↓\nClient Component</code></pre>\n      </div>\n    "
  },
  {
    "id": "next-18",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Server Components",
      "Architecture"
    ],
    "question": "Client Component-এর ভিতরে Server Component import করা কেন problematic?",
    "answer": "\n      <p>Client Component browser-side bundle boundary তৈরি করে।</p>\n      <p>Server-only logic client environment-এ নেওয়া যাবে না।</p>\n      <h4>Better architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server Component\n ├── Server data\n └── Client Component\n        ↓\n      Props</code></pre>\n      </div>\n      <p>অর্থাৎ server/client boundary আগে design করতে হবে।</p>\n      <h4>Complex application-এ এই boundary ভুল করলে:</h4>\n      <ul>\n        <li>Bundle বড়</li>\n        <li>Server-only code leak</li>\n        <li>Architecture complex</li>\n      </ul>\n      <p>হতে পারে।</p>\n    "
  },
  {
    "id": "next-19",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Data Fetching",
      "Server"
    ],
    "question": "Next.js App Router-এ server-side data fetching কীভাবে করবেন?",
    "answer": "\n      <p>Server Component async হতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export default async function UsersPage() {\n  const response = await fetch(\"https://api.example.com/users\");</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const users = await response.json();</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return &lt;UserList users={users} /&gt;;\n}</code></pre>\n      </div>\n      <p>Server Component-এ data fetch করলে browser-এ unnecessary API orchestration code পাঠানোর প্রয়োজন কমতে পারে।</p>\n      <p>Database বা internal service access-এর ক্ষেত্রেও server-side architecture ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "next-20",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Data Fetching",
      "Caching"
    ],
    "question": "Next.js data caching কী?",
    "answer": "\n      <p>Next.js rendering/data architecture-এ caching বিভিন্ন স্তরে থাকতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nData Cache / Application Cache\n ↓\nRender\n ↓\nResponse</code></pre>\n      </div>\n      <h4>Cache-এর উদ্দেশ্য:</h4>\n      <ul>\n        <li>Duplicate work কমানো</li>\n        <li>Faster response</li>\n        <li>Backend load কমানো</li>\n      </ul>\n      <p>কোন data cache হবে এবং কতক্ষণ থাকবে তা data freshness requirement অনুযায়ী design করতে হয়।</p>\n    "
  },
  {
    "id": "next-21",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Caching",
      "Revalidation"
    ],
    "question": "Revalidation কী?",
    "answer": "\n      <p>Revalidation cached data-এর freshness maintain করার mechanism।</p>\n      <p>ধরুন product data cache করা হয়েছে।</p>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Product update\n ↓\nOld cache\n ↓\nRevalidation\n ↓\nFresh data</code></pre>\n      </div>\n      <h4>Common strategies:</h4>\n      <ul>\n        <li>Time-based revalidation</li>\n        <li>On-demand invalidation</li>\n      </ul>\n      <p>CMS, product catalog, blog, e-commerce-এর মতো application-এ এটি গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "next-22",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "ISR",
      "Caching"
    ],
    "question": "ISR কী?",
    "answer": "\n      <p>ISR = Incremental Static Regeneration।</p>\n      <p>Static content generate করার পর নির্দিষ্ট সময় বা invalidation event-এর মাধ্যমে নতুন content তৈরি করা যায়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Build\n ↓\nStatic page\n ↓\nUsers\n ↓\nRevalidation\n ↓\nFresh page</code></pre>\n      </div>\n      <h4>Useful:</h4>\n      <ul>\n        <li>Product pages</li>\n        <li>Blog</li>\n        <li>News/content pages</li>\n        <li>CMS pages</li>\n      </ul>\n      <p>যেখানে pure static এবং fully dynamic-এর মাঝামাঝি freshness দরকার।</p>\n    "
  },
  {
    "id": "next-23",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Static Rendering",
      "Dynamic Rendering"
    ],
    "question": "Static এবং Dynamic rendering-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Static rendering:</h4>\n      <p>Output আগেই generate/cache করা যায়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Fast</li>\n        <li>CDN-friendly</li>\n        <li>Low server cost</li>\n      </ul>\n      <h4>Dynamic rendering:</h4>\n      <p>Request-specific data বা runtime information অনুযায়ী render হয়।</p>\n      <h4>Example:</h4>\n      <ul>\n        <li>Personalized dashboard</li>\n        <li>User-specific data</li>\n        <li>Request-dependent content</li>\n      </ul>\n      <h4>Decision:</h4>\n      <p>Static → content stable</p>\n      <p>Dynamic → content request/user dependent</p>\n    "
  },
  {
    "id": "next-24",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "SSR",
      "Rendering"
    ],
    "question": "Next.js-এ SSR কীভাবে কাজ করে?",
    "answer": "\n      <p>SSR-এ request-এর সময় server HTML/content generate করতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nRequest\n ↓\nNext.js Server\n ↓\nData Fetch\n ↓\nReact Render\n ↓\nHTML/stream\n ↓\nBrowser</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>SEO</li>\n        <li>Faster content visibility</li>\n        <li>Dynamic server-side content</li>\n      </ul>\n      <h4>Trade-off:</h4>\n      <ul>\n        <li>Server compute</li>\n        <li>Data latency</li>\n        <li>Infrastructure complexity</li>\n      </ul>\n    "
  },
  {
    "id": "next-25",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Streaming",
      "Suspense"
    ],
    "question": "Next.js streaming rendering কী?",
    "answer": "\n      <p>Streaming-এর মাধ্যমে পুরো page তৈরি হওয়ার জন্য অপেক্ষা না করে UI-এর ready অংশ আগে পাঠানো যায়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nShell ready\n ↓\nSend shell\n ↓\nSlow data\n ↓\nSend remaining content</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>&lt;Dashboard&gt;\n ├── Header      → fast\n ├── Sidebar     → fast\n └── Analytics   → slow\n                  ↓\n                stream later</code></pre>\n      </div>\n      <p>Slow component-এর জন্য Suspense boundary ব্যবহার করা যায়।</p>\n    "
  },
  {
    "id": "next-26",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Streaming",
      "Performance"
    ],
    "question": "Streaming-এর সুবিধা কী?",
    "answer": "\n      <h4>Streaming:</h4>\n      <ul>\n        <li>Time to first content improve করতে পারে</li>\n        <li>Slow data-এর জন্য পুরো page block হয় না</li>\n        <li>Progressive rendering হয়</li>\n        <li>Better perceived performance</li>\n      </ul>\n      <h4>Traditional:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nWait for everything\n ↓\nResponse</code></pre>\n      </div>\n      <h4>Streaming:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nShell\n ↓\nPartial UI\n ↓\nSlow section\n ↓\nComplete UI</code></pre>\n      </div>\n    "
  },
  {
    "id": "next-27",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Route Handlers",
      "API"
    ],
    "question": "Next.js Route Handler কী?",
    "answer": "\n      <p>Route Handler App Router-এর মধ্যে server-side HTTP endpoint তৈরি করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>app/api/users/route.ts</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export async function GET() {\n  return Response.json({\n    users: []\n  });\n}</code></pre>\n      </div>\n      <h4>HTTP methods:</h4>\n      <ul>\n        <li>GET</li>\n        <li>POST</li>\n        <li>PUT</li>\n        <li>PATCH</li>\n        <li>DELETE</li>\n      </ul>\n      <p>এটি lightweight backend/API endpoint-এর জন্য useful।</p>\n    "
  },
  {
    "id": "next-28",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Route Handlers",
      "REST"
    ],
    "question": "Route Handler এবং Server Action-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Route Handler:</h4>\n      <p>HTTP endpoint।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>GET /api/users\nPOST /api/orders</code></pre>\n      </div>\n      <h4>Useful:</h4>\n      <ul>\n        <li>External API</li>\n        <li>Mobile client</li>\n        <li>Webhook</li>\n        <li>REST endpoint</li>\n      </ul>\n      <h4>Server Action:</h4>\n      <p>Server function যা application-এর UI/action workflow-এর সাথে tightly integrated।</p>\n      <h4>Useful:</h4>\n      <ul>\n        <li>Form submission</li>\n        <li>Mutations</li>\n        <li>Internal application actions</li>\n      </ul>\n      <h4>সহজভাবে:</h4>\n      <p>Route Handler = HTTP API boundary</p>\n      <p>Server Action = server-side application action</p>\n    "
  },
  {
    "id": "next-29",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Server Actions",
      "Mutations"
    ],
    "question": "Next.js Server Action কী?",
    "answer": "\n      <p>Server Action হলো server-side function যা client interaction থেকে server-side mutation execute করতে পারে।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Form\n ↓\nServer Action\n ↓\nValidation\n ↓\nBusiness Logic\n ↓\nDatabase\n ↓\nRevalidate\n ↓\nUpdated UI</code></pre>\n      </div>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Create</li>\n        <li>Update</li>\n        <li>Delete</li>\n        <li>Form submission</li>\n      </ul>\n      <p>Security-wise Server Action-কে public endpoint-এর মতো treat করে authentication এবং authorization validate করতে হবে।</p>\n    "
  },
  {
    "id": "next-30",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Server Actions",
      "Security"
    ],
    "question": "Server Action কি security boundary?",
    "answer": "\n      <p>Server Action server-side execute হলেও authentication/authorization automatically business permission guarantee করে না।</p>\n      <h4>প্রতিটি sensitive mutation-এ:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nAuthentication\n ↓\nAuthorization\n ↓\nInput validation\n ↓\nBusiness validation\n ↓\nDatabase mutation</code></pre>\n      </div>\n      <p>করতে হবে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User logged in ≠ User allowed to delete this order.</code></pre>\n      </div>\n      <p>Authentication এবং authorization আলাদা concern।</p>\n    "
  },
  {
    "id": "next-31",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Forms",
      "Server Actions"
    ],
    "question": "Next.js-এ form submission কীভাবে design করবেন?",
    "answer": "\n      <h4>Modern architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Form\n ↓\nServer Action\n ↓\nValidate\n ↓\nBusiness Logic\n ↓\nDatabase\n ↓\nRevalidate\n ↓\nUpdated UI</code></pre>\n      </div>\n      <h4>Need:</h4>\n      <ul>\n        <li>Client validation</li>\n        <li>Server validation</li>\n        <li>Authentication</li>\n        <li>Authorization</li>\n        <li>Error handling</li>\n        <li>Pending state</li>\n        <li>Success state</li>\n        <li>Optimistic UI where appropriate</li>\n      </ul>\n      <p>Client validation UX-এর জন্য; server validation security/business correctness-এর জন্য।</p>\n    "
  },
  {
    "id": "next-32",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Revalidation",
      "Cache"
    ],
    "question": "Next.js-এ mutation-এর পর cache কীভাবে invalidate করবেন?",
    "answer": "\n      <h4>Mutation:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Create Product\n ↓\nDatabase update\n ↓\nInvalidate affected cached data\n ↓\nFresh data\n ↓\nUI update</code></pre>\n      </div>\n      <p>Use cases অনুযায়ী path/tag-based invalidation strategy ব্যবহার করা যায়।</p>\n      <h4>Example concept:</h4>\n      <p>revalidatePath(\"/products\");</p>\n      <h4>অথবা tag-based:</h4>\n      <p>revalidateTag(\"products\");</p>\n      <p>কোন data invalidate হবে তা application cache architecture-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "next-33",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Cache",
      "Architecture"
    ],
    "question": "Next.js caching এবং browser caching-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Next.js/application cache:</h4>\n      <p>Server-side data/rendering/cache strategy-এর অংশ।</p>\n      <h4>Browser cache:</h4>\n      <p>Client browser HTTP resource cache করে।</p>\n      <h4>CDN cache:</h4>\n      <p>Edge location-এ response/resource cache করতে পারে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nCDN\n ↓\nNext.js\n ↓\nApplication/Data Cache\n ↓\nDatabase/API</code></pre>\n      </div>\n      <p>Production performance-এর জন্য কোন layer-এ cache হবে তা পরিষ্কারভাবে design করা গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "next-34",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Middleware",
      "Request"
    ],
    "question": "Next.js Middleware কী?",
    "answer": "\n      <p>Middleware request-এর lifecycle-এর একটি early processing layer হিসেবে কাজ করতে পারে।</p>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Authentication checks</li>\n        <li>Redirect</li>\n        <li>Rewrite</li>\n        <li>Headers</li>\n        <li>Locale detection</li>\n        <li>Request-based routing</li>\n      </ul>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nMiddleware\n ├── Allow\n ├── Redirect\n └── Rewrite\n ↓\nNext.js route</code></pre>\n      </div>\n      <p>Current Next.js versions-এ request interception-এর architecture/version-specific terminology পরিবর্তিত হতে পারে, তাই production project-এর version documentation follow করা উচিত।</p>\n    "
  },
  {
    "id": "next-35",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Middleware",
      "Authentication"
    ],
    "question": "Middleware দিয়ে authentication করা উচিত?",
    "answer": "\n      <p>Middleware authentication-এর early routing check-এর জন্য useful।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nMiddleware\n ↓\nHas session?\n ├── No → Login\n └── Yes → Continue</code></pre>\n      </div>\n      <p>কিন্তু middleware-কে একমাত্র authorization layer করা উচিত নয়।</p>\n      <p>Backend/server action/data access-এর কাছেও permission check থাকা উচিত।</p>\n      <h4>Security architecture:</h4>\n      <p>Middleware<br>+<br>Server authorization<br>+<br>Database/resource authorization</p>\n    "
  },
  {
    "id": "next-36",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Authentication",
      "Authorization"
    ],
    "question": "Authentication এবং Authorization-এর পার্থক্য কী?",
    "answer": "\n      <h4>Authentication:</h4>\n      <p>\"আপনি কে?\"</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User login করেছে।</code></pre>\n      </div>\n      <h4>Authorization:</h4>\n      <p>\"আপনি কী করতে পারবেন?\"</p>\n      <h4>Example:</h4>\n      <p>Admin product delete করতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Authentication\n ↓\nIdentity\n ↓\nAuthorization\n ↓\nPermission\n ↓\nResource</code></pre>\n      </div>\n    "
  },
  {
    "id": "next-37",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "RBAC",
      "Authorization"
    ],
    "question": "Next.js application-এ RBAC কীভাবে implement করবেন?",
    "answer": "\n      <p>RBAC = Role-Based Access Control।</p>\n      <h4>Example:</h4>\n      <h4>Roles:</h4>\n      <p>admin<br>manager<br>editor<br>viewer</p>\n      <h4>Permissions:</h4>\n      <p>product:create<br>product:update<br>product:delete<br>report:view</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n ↓\nRole\n ↓\nPermissions\n ↓\nResource/action</code></pre>\n      </div>\n      <p>Authorization server-side enforce করতে হবে।</p>\n      <p>UI-তে button hide করা শুধু UX; security enforcement backend/server-side হতে হবে।</p>\n    "
  },
  {
    "id": "next-38",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Multi Tenant",
      "SaaS"
    ],
    "question": "Next.js-এ multi-tenant SaaS architecture কীভাবে design করবেন?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>tenant-a.example.com\ntenant-b.example.com</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nTenant detection\n ↓\nMiddleware/Proxy\n ↓\nTenant context\n ↓\nServer Component\n ↓\nTenant database/data\n ↓\nUI</code></pre>\n      </div>\n      <h4>Tenant identify করা যেতে পারে:</h4>\n      <ul>\n        <li>Subdomain</li>\n        <li>Custom domain</li>\n        <li>Path</li>\n        <li>Authenticated user mapping</li>\n      </ul>\n      <h4>Critical:</h4>\n      <p>Tenant ID শুধু client input থেকে trust করা যাবে না।</p>\n      <p>Every database query/resource authorization tenant scope enforce করতে হবে।</p>\n    "
  },
  {
    "id": "next-39",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Custom Domain",
      "SaaS"
    ],
    "question": "Next.js SaaS application-এ custom domain কীভাবে support করবেন?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>shop1.com\nshop2.com</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>DNS\n ↓\nLoad Balancer/CDN\n ↓\nNext.js\n ↓\nDomain detection\n ↓\nTenant lookup\n ↓\nTenant configuration\n ↓\nRender store</code></pre>\n      </div>\n      <h4>Database:</h4>\n      <p>domains<br> ├── domain<br> ├── tenant_id<br> └── status</p>\n      <p>Request-এর Host header থেকে domain resolve করে tenant identify করা যায়।</p>\n      <p>Production-এ TLS certificate এবং DNS management-ও architecture-এর অংশ।</p>\n    "
  },
  {
    "id": "next-40",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Environment Variables",
      "Security"
    ],
    "question": "Next.js environment variable কীভাবে কাজ করে?",
    "answer": "\n      <p>Server-only environment variables server-side রাখা উচিত।</p>\n      <p>Client-এর জন্য explicitly exposed variables সাধারণত NEXT_PUBLIC_ prefix ব্যবহার করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>DATABASE_URL=...</code></pre>\n      </div>\n      <p>Server-side only।</p>\n      <h4>Public:</h4>\n      <p>NEXT_PUBLIC_API_URL=...</p>\n      <h4>Important:</h4>\n      <p>NEXT_PUBLIC_ value client bundle-এ expose হতে পারে।</p>\n      <h4>তাই secret:</h4>\n      <ul>\n        <li>Database password</li>\n        <li>Private API key</li>\n        <li>Secret token</li>\n      </ul>\n      <p>কখনো public environment variable করা উচিত নয়।</p>\n    "
  },
  {
    "id": "next-41",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Metadata",
      "SEO"
    ],
    "question": "Next.js metadata কী?",
    "answer": "\n      <p>Metadata page-এর SEO এবং social sharing information define করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export const metadata = {\n  title: \"Products\",\n  description: \"Product listing\"\n};</code></pre>\n      </div>\n      <p>Dynamic metadata-এর জন্য generateMetadata ব্যবহার করা যায়।</p>\n      <h4>Important:</h4>\n      <ul>\n        <li>title</li>\n        <li>description</li>\n        <li>canonical</li>\n        <li>Open Graph</li>\n        <li>Twitter metadata</li>\n        <li>robots</li>\n      </ul>\n      <p>SEO-sensitive application-এর জন্য metadata গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "next-42",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "SEO",
      "Dynamic Metadata"
    ],
    "question": "Dynamic metadata কীভাবে তৈরি করবেন?",
    "answer": "\n      <p>Product ID অনুযায়ী metadata generate করা যায়।</p>\n      <h4>Concept:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>/products/100\n ↓\nFetch product\n ↓\ngenerateMetadata()\n ↓\nProduct title\n ↓\nHTML metadata</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>export async function generateMetadata({ params }) {\n  const product = await getProduct(params.id);</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>return {\n    title: product.name,\n    description: product.description\n  };\n}</code></pre>\n      </div>\n      <p>Dynamic content pages-এর জন্য এটি useful।</p>\n    "
  },
  {
    "id": "next-43",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Image Optimization"
    ],
    "question": "Next.js Image component কেন ব্যবহার করবেন?",
    "answer": "\n      <p>next/image image optimization-এর জন্য useful।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Responsive sizing</li>\n        <li>Lazy loading</li>\n        <li>Image optimization</li>\n        <li>Layout stability</li>\n        <li>Modern image formats where supported</li>\n        <li>Better loading behavior</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>&lt;Image\n  src=\"/product.jpg\"\n  width={800}\n  height={600}\n  alt=\"Product\"\n/&gt;</code></pre>\n      </div>\n      <p>Remote image-এর ক্ষেত্রে allowed remote sources/configuration ঠিকভাবে configure করতে হয়।</p>\n    "
  },
  {
    "id": "next-44",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "Fonts",
      "Performance"
    ],
    "question": "Next.js font optimization কী?",
    "answer": "\n      <p>Next.js font loading optimize করার tooling provide করে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Better font loading</li>\n        <li>Reduced layout shift</li>\n        <li>Self-hosting options</li>\n        <li>Performance optimization</li>\n      </ul>\n      <p>Production application-এ unnecessary external font request কমানো এবং font-display strategy গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "next-45",
    "category": "Next.js",
    "difficulty": "Intermediate",
    "tags": [
      "SEO",
      "Sitemap"
    ],
    "question": "Next.js-এ sitemap এবং robots কীভাবে manage করবেন?",
    "answer": "\n      <h4>SEO architecture-এর অংশ হিসেবে:</h4>\n      <p>sitemap<br>robots<br>canonical<br>metadata</p>\n      <p>manage করতে হয়।</p>\n      <p>Dynamic e-commerce site-এ product URLs অনেক বেশি হতে পারে।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Database\n ↓\nPublished products\n ↓\nSitemap generation\n ↓\nSearch engine</code></pre>\n      </div>\n      <p>Only indexable/public pages sitemap-এ include করা উচিত।</p>\n    "
  },
  {
    "id": "next-46",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "API",
      "BFF"
    ],
    "question": "Next.js Backend-for-Frontend বা BFF কী?",
    "answer": "\n      <p>BFF = Backend for Frontend।</p>\n      <h4>Browser সরাসরি অনেক backend service call না করে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nNext.js BFF\n ├── User Service\n ├── Product Service\n ├── Order Service\n └── Payment Service</code></pre>\n      </div>\n      <p>Next.js frontend-specific response তৈরি করতে পারে।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>API aggregation</li>\n        <li>Hide internal services</li>\n        <li>Frontend-specific response</li>\n        <li>Authentication integration</li>\n        <li>Reduce client complexity</li>\n      </ul>\n      <p>Large microservice architecture-এ BFF useful হতে পারে।</p>\n    "
  },
  {
    "id": "next-47",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Microservices",
      "Architecture"
    ],
    "question": "Next.js microservice architecture-এর সাথে কীভাবে কাজ করতে পারে?",
    "answer": "\n      <h4>Possible architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nNext.js\n ↓\nAPI Gateway/BFF\n ↓\n ┌───────────────┐\n ↓       ↓       ↓\nUser   Product  Order\nService Service Service\n ↓       ↓       ↓\nDB      DB      DB</code></pre>\n      </div>\n      <p>Next.js frontend orchestration এবং presentation-এর দায়িত্ব নিতে পারে।</p>\n      <p>Business logic সাধারণত backend services-এর মধ্যে রাখা উচিত।</p>\n      <p>Next.js-কে সব microservice-এর business logic dump করার জায়গা বানানো উচিত নয়।</p>\n    "
  },
  {
    "id": "next-48",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Database",
      "ORM"
    ],
    "question": "Next.js থেকে সরাসরি database access করা যায়?",
    "answer": "\n      <p>Server-side code থেকে database access করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server Component\n ↓\nRepository\n ↓\nORM\n ↓\nDatabase</code></pre>\n      </div>\n      <p>কিন্তু database client browser-side Client Component-এ পাঠানো যাবে না।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nServer Component / Server Action / Route Handler\n ↓\nRepository\n ↓\nDatabase</code></pre>\n      </div>\n      <p>DB credentials অবশ্যই server-side রাখতে হবে।</p>\n    "
  },
  {
    "id": "next-49",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "ORM",
      "Prisma"
    ],
    "question": "Next.js-এ Prisma কীভাবে ব্যবহার করা যায়?",
    "answer": "\n      <p>Prisma একটি TypeScript ORM।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Server Component\n ↓\nService\n ↓\nPrisma Client\n ↓\nPostgreSQL/MySQL</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>const users = await prisma.user.findMany();</code></pre>\n      </div>\n      <h4>Production application-এ:</h4>\n      <ul>\n        <li>Connection management</li>\n        <li>Migration</li>\n        <li>Transaction</li>\n        <li>Query optimization</li>\n        <li>Error handling</li>\n      </ul>\n      <p>ঠিকভাবে design করতে হবে।</p>\n    "
  },
  {
    "id": "next-50",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Connection Pool",
      "Database"
    ],
    "question": "Next.js serverless environment-এ database connection problem কেন হয়?",
    "answer": "\n      <p>Serverless architecture-এ অনেক function instance তৈরি হতে পারে।</p>\n      <h4>যদি প্রতিটি invocation নতুন DB connection তৈরি করে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nFunction\n ↓\nNew DB connection\n ↓\nDatabase</code></pre>\n      </div>\n      <p>High traffic-এ connection limit exceed হতে পারে।</p>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>Connection pooling</li>\n        <li>Managed database pooling</li>\n        <li>Appropriate ORM configuration</li>\n        <li>Serverless-aware database architecture</li>\n      </ul>\n      <p>Production deployment target অনুযায়ী DB strategy design করতে হয়।</p>\n    "
  },
  {
    "id": "next-51",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Cookies",
      "Authentication"
    ],
    "question": "Next.js-এ cookie কীভাবে handle করবেন?",
    "answer": "\n      <p>Server-side request context থেকে cookies read/write করা যায়।</p>\n      <h4>Authentication-এর ক্ষেত্রে সাধারণত:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nSecure HttpOnly Cookie\n ↓\nNext.js Server\n ↓\nSession validation</code></pre>\n      </div>\n      <h4>Important cookie flags:</h4>\n      <ul>\n        <li>HttpOnly</li>\n        <li>Secure</li>\n        <li>SameSite</li>\n        <li>Appropriate Path</li>\n        <li>Appropriate expiry</li>\n      </ul>\n      <p>Sensitive token JavaScript-accessible storage-এ রাখার পরিবর্তে secure cookie architecture অনেক ক্ষেত্রে preferable।</p>\n    "
  },
  {
    "id": "next-52",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "CSRF",
      "Security"
    ],
    "question": "Next.js application-এ CSRF কীভাবে prevent করবেন?",
    "answer": "\n      <p>CSRF cookie-based authentication-এর ক্ষেত্রে গুরুত্বপূর্ণ।</p>\n      <h4>Possible protections:</h4>\n      <ul>\n        <li>SameSite cookies</li>\n        <li>CSRF token</li>\n        <li>Origin/Referer validation where appropriate</li>\n        <li>Framework/server action protections where applicable</li>\n        <li>Avoid unsafe state-changing GET requests</li>\n      </ul>\n      <p>Security architecture request type এবং authentication mechanism অনুযায়ী design করতে হবে।</p>\n    "
  },
  {
    "id": "next-53",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "CORS",
      "API"
    ],
    "question": "Next.js-এ CORS কীভাবে handle করবেন?",
    "answer": "\n      <p>CORS browser security policy।</p>\n      <p>যদি Next.js Route Handler API expose করে, response headers দিয়ে allowed origin/method/header configure করা যায়।</p>\n      <h4>Example concept:</h4>\n      <p>Access-Control-Allow-Origin<br>Access-Control-Allow-Methods<br>Access-Control-Allow-Headers</p>\n      <p>যদি Next.js frontend একই-origin API ব্যবহার করে, অনেক ক্ষেত্রে CORS complexity কমে।</p>\n      <p>CORS authentication/authorization-এর replacement নয়।</p>\n    "
  },
  {
    "id": "next-54",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Rate Limiting",
      "Security"
    ],
    "question": "Next.js API rate limiting কীভাবে implement করবেন?",
    "answer": "\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nRate Limiter\n ↓\nNext.js API\n ↓\nBackend</code></pre>\n      </div>\n      <p>Production distributed deployment-এ Redis বা edge/infrastructure-level rate limiter ব্যবহার করা যেতে পারে।</p>\n      <h4>Limit হতে পারে:</h4>\n      <ul>\n        <li>IP</li>\n        <li>User ID</li>\n        <li>API key</li>\n        <li>Tenant</li>\n        <li>Endpoint</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>100 requests/minute/user</code></pre>\n      </div>\n      <p>Rate limit response সাধারণত HTTP 429।</p>\n    "
  },
  {
    "id": "next-55",
    "category": "Next.js",
    "difficulty": "Advanced",
    "tags": [
      "Security",
      "Headers"
    ],
    "question": "Next.js application-এর important security headers কী?",
    "answer": "\n      <h4>Common security headers:</h4>\n      <ul>\n        <li>Content-Security-Policy</li>\n        <li>Strict-Transport-Security</li>\n        <li>X-Content-Type-Options</li>\n        <li>Referrer-Policy</li>\n        <li>Permissions-Policy</li>\n      </ul>\n      <p>CSP বিশেষভাবে XSS risk কমাতে সাহায্য করতে পারে।</p>\n      <p>Security headers application dependencies এবং third-party scripts অনুযায়ী carefully configure করতে হয়।</p>\n    "
  },
  {
    "id": "next-56",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Core Web Vitals"
    ],
    "question": "Next.js application-এর Core Web Vitals কীভাবে improve করবেন?",
    "answer": "\n      <h4>Important metrics:</h4>\n      <p>LCP<br>INP<br>CLS</p>\n      <h4>Improve করতে:</h4>\n      <p><strong>LCP:</strong></p>\n      <ul>\n        <li>Optimize server response</li>\n        <li>Reduce render-blocking resources</li>\n        <li>Optimize images</li>\n        <li>Streaming</li>\n      </ul>\n      <p><strong>INP:</strong></p>\n      <ul>\n        <li>Reduce long JavaScript tasks</li>\n        <li>Optimize event handlers</li>\n        <li>Reduce unnecessary rendering</li>\n      </ul>\n      <p><strong>CLS:</strong></p>\n      <ul>\n        <li>Reserve image dimensions</li>\n        <li>Avoid layout shifts</li>\n        <li>Stable fonts/layout</li>\n      </ul>\n      <h4>Additional:</h4>\n      <ul>\n        <li>Code splitting</li>\n        <li>Caching</li>\n        <li>CDN</li>\n        <li>Image optimization</li>\n        <li>Reduce client JS</li>\n      </ul>\n    "
  },
  {
    "id": "next-57",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Waterfall"
    ],
    "question": "Next.js data-fetching waterfall কী?",
    "answer": "\n      <h4>যখন একটি request শেষ হওয়ার পর পরের request শুরু হয়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request A\n ↓\nWait\n ↓\nRequest B\n ↓\nWait\n ↓\nRequest C</code></pre>\n      </div>\n      <p>এতে total latency বেড়ে যায়।</p>\n      <h4>Parallel fetching:</h4>\n      <p>Request A ──────┐<br>Request B ──────┼→ Render<br>Request C ──────┘</p>\n      <p>Promise.all বা architecture-level parallel data fetching ব্যবহার করা যেতে পারে।</p>\n      <p>Dependent request হলে sequential dependency প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "next-58",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Request Memoization"
    ],
    "question": "Next.js duplicate data fetching কীভাবে optimize করবেন?",
    "answer": "\n      <p>একই render tree-তে একই data প্রয়োজন হলে request deduplication/memoization mechanisms ব্যবহার করা যেতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Layout\n ↓\ngetUser()</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Page\n ↓\ngetUser()</code></pre>\n      </div>\n      <p>Architecture এমনভাবে design করা উচিত যাতে একই remote resource unnecessarily বারবার fetch না হয়।</p>\n      <p>Cache এবং request memoization-এর behavior Next.js version এবং API অনুযায়ী verify করতে হবে।</p>\n    "
  },
  {
    "id": "next-59",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Error Handling",
      "Observability"
    ],
    "question": "Production Next.js error handling কীভাবে design করবেন?",
    "answer": "\n      <h4>Layered approach:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>UI error\n ↓\nerror.tsx\n ↓\nApplication logging\n ↓\nError tracking\n ↓\nBackend logs\n ↓\nDistributed tracing</code></pre>\n      </div>\n      <h4>Need:</h4>\n      <ul>\n        <li>User-friendly error UI</li>\n        <li>Correlation/request ID</li>\n        <li>Server logs</li>\n        <li>Error monitoring</li>\n        <li>Sensitive data masking</li>\n        <li>Retry where safe</li>\n      </ul>\n      <p>Production-এ raw stack trace user-কে দেখানো উচিত নয়।</p>\n    "
  },
  {
    "id": "next-60",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Logging",
      "Observability"
    ],
    "question": "Next.js application-এ observability কীভাবে implement করবেন?",
    "answer": "\n      <h4>Three pillars:</h4>\n      <ol>\n        <li>Logs</li>\n        <li>Metrics</li>\n        <li>Traces</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nNext.js\n ↓\nAPI Gateway\n ↓\nMicroservices</code></pre>\n      </div>\n      <h4>একটি request-এর correlation ID থাকতে পারে:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request ID\n ↓\nNext.js log\n ↓\nBackend log\n ↓\nDatabase/service trace</code></pre>\n      </div>\n      <h4>Monitoring:</h4>\n      <ul>\n        <li>Error rate</li>\n        <li>Latency</li>\n        <li>Throughput</li>\n        <li>CPU/memory</li>\n        <li>Cache hit ratio</li>\n        <li>API failure</li>\n        <li>Web Vitals</li>\n      </ul>\n    "
  },
  {
    "id": "next-61",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Testing",
      "Unit Testing"
    ],
    "question": "Next.js application কীভাবে test করবেন?",
    "answer": "\n      <h4>Testing pyramid:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Unit\n ↓\nIntegration\n ↓\nE2E</code></pre>\n      </div>\n      <h4>Unit:</h4>\n      <p>Utility/function</p>\n      <h4>Component:</h4>\n      <p>React Testing Library</p>\n      <h4>Integration:</h4>\n      <p>Component + API/data layer</p>\n      <h4>E2E:</h4>\n      <p>Playwright/Cypress</p>\n      <h4>Critical flows:</h4>\n      <ul>\n        <li>Login</li>\n        <li>Checkout</li>\n        <li>Payment</li>\n        <li>Product creation</li>\n        <li>Admin workflow</li>\n      </ul>\n      <p>সবকিছু E2E করার প্রয়োজন নেই।</p>\n    "
  },
  {
    "id": "next-62",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Testing",
      "Server Components"
    ],
    "question": "Server Component কীভাবে test করবেন?",
    "answer": "\n      <p>Server Component-এর test strategy component-এর responsibility অনুযায়ী হবে।</p>\n      <h4>Test করতে হবে:</h4>\n      <ul>\n        <li>Data transformation</li>\n        <li>Rendering</li>\n        <li>Error state</li>\n        <li>Not found</li>\n        <li>Authorization</li>\n        <li>Server-side logic</li>\n      </ul>\n      <p>Database/API dependency mock করা যেতে পারে।</p>\n      <p>Business logic component-এর মধ্যে না রেখে service/use-case layer-এ রাখলে unit testing সহজ হয়।</p>\n    "
  },
  {
    "id": "next-63",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "CI/CD",
      "Deployment"
    ],
    "question": "Next.js application-এর production deployment process কী?",
    "answer": "\n      <h4>Typical pipeline:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Developer\n ↓\nGit\n ↓\nPull Request\n ↓\nLint\n ↓\nType Check\n ↓\nUnit Tests\n ↓\nBuild\n ↓\nSecurity Scan\n ↓\nDeploy\n ↓\nHealth Check\n ↓\nMonitoring</code></pre>\n      </div>\n      <h4>Production deployment হতে পারে:</h4>\n      <ul>\n        <li>Vercel</li>\n        <li>Docker</li>\n        <li>Kubernetes</li>\n        <li>Cloud VM</li>\n        <li>Cloud container platform</li>\n      </ul>\n      <p>Deployment target অনুযায়ী caching, environment variables এবং server runtime design করতে হবে।</p>\n    "
  },
  {
    "id": "next-64",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Docker",
      "Deployment"
    ],
    "question": "Next.js Docker architecture কীভাবে design করবেন?",
    "answer": "\n      <h4>Typical production setup:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Internet\n ↓\nNginx / Load Balancer\n ↓\nNext.js Container\n ↓\nAPI Services\n ↓\nDatabase</code></pre>\n      </div>\n      <h4>Docker image:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Build Stage\n ↓\nProduction Stage\n ↓\nNext.js Runtime</code></pre>\n      </div>\n      <p>Multi-stage Docker build ব্যবহার করে unnecessary build dependencies production image থেকে বাদ দেওয়া যায়।</p>\n      <p>Standalone output mode container image size কমাতে সাহায্য করতে পারে।</p>\n    "
  },
  {
    "id": "next-65",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Horizontal Scaling",
      "Deployment"
    ],
    "question": "Next.js application horizontally scale করলে কী কী সমস্যা হতে পারে?",
    "answer": "\n      <h4>Architecture:</h4>\n      <p>Load Balancer<br> ├── Next.js Instance 1<br> ├── Next.js Instance 2<br> └── Next.js Instance 3</p>\n      <h4>Potential issues:</h4>\n      <ul>\n        <li>Session storage</li>\n        <li>Cache consistency</li>\n        <li>WebSocket connections</li>\n        <li>File uploads</li>\n        <li>In-memory state</li>\n        <li>Rate limiting</li>\n      </ul>\n      <h4>Solutions:</h4>\n      <ul>\n        <li>External session store</li>\n        <li>Redis</li>\n        <li>Shared object storage</li>\n        <li>External cache</li>\n        <li>Stateless application design</li>\n        <li>Load balancer strategy</li>\n      </ul>\n      <p>Application server-এর local memory-তে critical shared state রাখা উচিত নয়।</p>\n    "
  },
  {
    "id": "next-66",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Caching",
      "Redis"
    ],
    "question": "Next.js application-এ Redis কোথায় ব্যবহার করা যায়?",
    "answer": "\n      <h4>Redis ব্যবহার হতে পারে:</h4>\n      <ul>\n        <li>Session</li>\n        <li>Distributed cache</li>\n        <li>Rate limiting</li>\n        <li>Temporary data</li>\n        <li>Distributed locks</li>\n        <li>Pub/Sub</li>\n        <li>Queue integration</li>\n      </ul>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Next.js\n ↓\nRedis\n ├── Cache\n ├── Session\n └── Rate Limit</code></pre>\n      </div>\n      <p>তবে Redis-কে primary database-এর replacement হিসেবে ব্যবহার করা উচিত নয় যদি durable persistence প্রয়োজন হয়।</p>\n    "
  },
  {
    "id": "next-67",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "File Upload",
      "Storage"
    ],
    "question": "Next.js application-এ large file upload কীভাবে design করবেন?",
    "answer": "\n      <p>Large file Next.js server-এর মাধ্যমে stream করে database/server disk-এ রাখার পরিবর্তে object storage architecture ভালো হতে পারে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nRequest signed upload URL\n ↓\nObject Storage\n ↓\nUpload complete\n ↓\nNext.js/API\n ↓\nSave metadata</code></pre>\n      </div>\n      <h4>Storage:</h4>\n      <ul>\n        <li>S3-compatible object storage</li>\n        <li>Cloud object storage</li>\n      </ul>\n      <p>Database-এ সাধারণত file metadata রাখা হয়, binary file নয়।</p>\n    "
  },
  {
    "id": "next-68",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Background Jobs",
      "Queue"
    ],
    "question": "Next.js request-এর মধ্যে heavy task করা উচিত কি?",
    "answer": "\n      <p>Long-running task synchronous request-এ রাখা risky।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Generate 500-page report\n ↓\nRequest waits\n ↓\nTimeout</code></pre>\n      </div>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Next.js\n ↓\nCreate Job\n ↓\nQueue\n ↓\nWorker\n ↓\nGenerate Report\n ↓\nStorage\n ↓\nNotify User</code></pre>\n      </div>\n      <p>RabbitMQ/Kafka/SQS-এর মতো queue architecture ব্যবহার করা যায়।</p>\n      <p>Next.js request দ্রুত acknowledge করে।</p>\n    "
  },
  {
    "id": "next-69",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "E-commerce",
      "Architecture"
    ],
    "question": "Next.js দিয়ে high-scale e-commerce application কীভাবে design করবেন?",
    "answer": "\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>CDN\n                     ↓\n                 Next.js\n                     ↓\n              ┌──────┴──────┐\n              ↓             ↓\n          Server UI       Client UI\n              ↓             ↓\n             BFF/API Gateway\n                     ↓\n       ┌─────────────┼─────────────┐\n       ↓             ↓             ↓\n    Product        Cart          Order\n    Service        Service       Service\n       ↓             ↓             ↓\n      DB            Redis         DB</code></pre>\n      </div>\n      <h4>Additional:</h4>\n      <ul>\n        <li>CDN</li>\n        <li>Product caching</li>\n        <li>Search engine</li>\n        <li>Image CDN</li>\n        <li>Payment service</li>\n        <li>Queue</li>\n        <li>Inventory locking</li>\n        <li>Distributed tracing</li>\n      </ul>\n      <p>Product pages can be heavily cached, while cart/checkout must remain user-specific and dynamic।</p>\n    "
  },
  {
    "id": "next-70",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Multi Tenant",
      "E-commerce SaaS"
    ],
    "question": "Shopify-এর মতো Next.js multi-tenant e-commerce builder কীভাবে design করবেন?",
    "answer": "\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>DNS\n                     ↓\n                CDN / Proxy\n                     ↓\n                 Next.js\n                     ↓\n               Tenant Resolver\n                     ↓\n            ┌────────┴─────────┐\n            ↓                  ↓\n        Storefront          Admin\n            ↓                  ↓\n       Tenant Context      Tenant Context\n            ↓                  ↓\n             BFF/API Gateway\n                     ↓\n        ┌────────────┼────────────┐\n        ↓            ↓            ↓\n      Catalog       Order       Payment\n      Service       Service      Service\n        ↓            ↓            ↓\n       DB           DB          DB</code></pre>\n      </div>\n      <h4>Tenant identification:</h4>\n      <p>custom domain<br>+<br>subdomain<br>+<br>authenticated tenant</p>\n      <h4>Important:</h4>\n      <h4>Every query:</h4>\n      <p>WHERE tenant_id = currentTenant</p>\n      <p>Authorization must be server-side.</p>\n      <h4>Storefront pages:</h4>\n      <p>Static/ISR/cache</p>\n      <h4>Admin:</h4>\n      <p>Dynamic/authenticated</p>\n      <h4>Checkout:</h4>\n      <p>Highly dynamic</p>\n      <p>এই separation scalable SaaS architecture-এর জন্য অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "next-71",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Clean Architecture"
    ],
    "question": "Next.js application-এ business logic কোথায় রাখা উচিত?",
    "answer": "\n      <p>সব business logic page.tsx-এর মধ্যে রাখা উচিত নয়।</p>\n      <h4>Better:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Page\n ↓\nUse Case / Service\n ↓\nRepository\n ↓\nDatabase/API</code></pre>\n      </div>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>app/orders/page.tsx\n        ↓\norderService.getOrders()\n        ↓\norderRepository\n        ↓\nDatabase</code></pre>\n      </div>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Testability</li>\n        <li>Reusability</li>\n        <li>Separation of concerns</li>\n        <li>Easier migration</li>\n        <li>Easier API reuse</li>\n      </ul>\n      <p>UI layer presentation-এর দায়িত্ব নেবে।</p>\n    "
  },
  {
    "id": "next-72",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Monorepo",
      "Architecture"
    ],
    "question": "Large Next.js organization-এর জন্য monorepo কীভাবে design করবেন?",
    "answer": "\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>apps/\n ├── storefront/\n ├── admin/\n └── docs/</code></pre>\n      </div>\n      <p>packages/<br> ├── ui/<br> ├── eslint-config/<br> ├── types/<br> ├── config/<br> ├── api-client/<br> └── auth/</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Shared UI</li>\n        <li>Shared TypeScript types</li>\n        <li>Shared configuration</li>\n        <li>Consistent tooling</li>\n      </ul>\n      <h4>Tools:</h4>\n      <ul>\n        <li>Turborepo</li>\n        <li>pnpm workspaces</li>\n        <li>Nx</li>\n      </ul>\n      <p>Shared package-এ business coupling অতিরিক্ত বাড়ানো উচিত নয়।</p>\n    "
  },
  {
    "id": "next-73",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "TypeScript",
      "Type Safety"
    ],
    "question": "Next.js application-এ TypeScript কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>TypeScript runtime error prevent করে না, কিন্তু development-time type safety দেয়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Props validation</li>\n        <li>API response types</li>\n        <li>Component contracts</li>\n        <li>Better autocomplete</li>\n        <li>Refactoring safety</li>\n        <li>Compile-time errors</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>type User = {\n  id: string;\n  name: string;\n};</code></pre>\n      </div>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>typescript</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>function UserCard({ user }: { user: User }) {\n  ...\n}</code></pre>\n      </div>\n      <p>Runtime data-এর জন্য TypeScript-এর পাশাপাশি runtime validation প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "next-74",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Validation",
      "Zod"
    ],
    "question": "TypeScript type এবং runtime validation-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>TypeScript:</h4>\n      <p>Compile-time/static checking।</p>\n      <h4>Runtime API:</h4>\n      <p>Actual unknown data।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>API\n ↓\nunknown JSON\n ↓\nRuntime validation\n ↓\nValidated data\n ↓\nTypeScript application</code></pre>\n      </div>\n      <p>Zod-এর মতো schema validation library ব্যবহার করা যায়।</p>\n      <p>কারণ TypeScript type runtime-এ exist করে না।</p>\n    "
  },
  {
    "id": "next-75",
    "category": "Next.js",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Production"
    ],
    "question": "একজন Senior Next.js developer-এর জন্য সবচেয়ে গুরুত্বপূর্ণ architecture decision কী কী?",
    "answer": "\n      <h4>প্রথমে এই প্রশ্নগুলোর উত্তর দিতে হবে:</h4>\n      <ol>\n        <li>কোন component Server?</li>\n        <li>কোন component Client?</li>\n        <li>কোন data static?</li>\n        <li>কোন data dynamic?</li>\n        <li>কোন data cache হবে?</li>\n        <li>Cache কখন invalidate হবে?</li>\n        <li>কোথায় authentication হবে?</li>\n        <li>কোথায় authorization হবে?</li>\n        <li>Business logic কোথায় থাকবে?</li>\n        <li>Database access কোথায় থাকবে?</li>\n        <li>API/BFF প্রয়োজন কি?</li>\n        <li>Large operation queue-তে যাবে কি?</li>\n        <li>Multi-tenant হলে tenant isolation কীভাবে হবে?</li>\n        <li>File কোথায় store হবে?</li>\n        <li>Application কীভাবে scale করবে?</li>\n        <li>Error কীভাবে observe করা হবে?</li>\n        <li>Performance কীভাবে measure হবে?</li>\n        <li>Testing strategy কী?</li>\n        <li>Deployment architecture কী?</li>\n        <li>Security boundary কোথায়?</li>\n      </ol>\n      <h4>Production-grade Next.js architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Browser\n ↓\nCDN / Edge\n ↓\nNext.js\n ├── Server Components\n ├── Client Components\n ├── Server Actions\n ├── Route Handlers\n ├── Cache\n └── BFF\n       ↓\n API Gateway\n       ↓\nMicroservices\n ├── Auth\n ├── User\n ├── Product\n ├── Order\n ├── Payment\n └── Notification\n       ↓\nDatabase / Redis / Queue / Object Storage</code></pre>\n      </div>\n      <h4>সবচেয়ে গুরুত্বপূর্ণ principle:</h4>\n      <p>\"React component কোথায় render হবে\" শুধু সেটাই নয়—  <br>\"data কোথায় থাকবে, business logic কোথায় থাকবে, cache কোথায় হবে, এবং security কোথায় enforce হবে\"—এই architecture decisions-ই Senior Next.js interview-এর সবচেয়ে গুরুত্বপূর্ণ অংশ।</p>\n    "
  }
];
