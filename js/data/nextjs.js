const nextJsInterviewQuestions = [
  {
    id: "next-1",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Basics", "Framework"],
    question: "Next.js কী এবং কেন ব্যবহার করা হয়?",
    answer: `Next.js হলো React-এর উপর তৈরি একটি full-stack web framework।

React মূলত UI library, কিন্তু Next.js production application-এর জন্য অতিরিক্ত features দেয়।

Next.js-এর গুরুত্বপূর্ণ features:

- File-based routing
- App Router
- Server Components
- Client Components
- Server-side rendering
- Static rendering
- Dynamic rendering
- Streaming
- Suspense
- Route Handlers
- Middleware/Proxy-based request handling
- Server Actions
- Data fetching
- Caching
- Image optimization
- Font optimization
- Metadata/SEO
- Authentication integration
- API integration

Architecture:

Browser
 ↓
Next.js
 ├── Server Components
 ├── Client Components
 ├── Server Actions
 ├── Route Handlers
 └── Rendering/Cache
        ↓
     Backend/DB/API`
  },

  {
    id: "next-2",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["React", "Next.js"],
    question: "React এবং Next.js-এর মধ্যে পার্থক্য কী?",
    answer: `React হলো UI library।

Next.js হলো React-based full-stack framework।

React:

- Component UI
- State
- Hooks
- Rendering

Next.js:

- React
- Routing
- Server Components
- SSR
- Static rendering
- Dynamic rendering
- Streaming
- Server Actions
- Route Handlers
- Metadata
- Image optimization
- Full-stack application structure

সহজভাবে:

React = UI building

Next.js = Production React application framework`
  },

  {
    id: "next-3",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["App Router", "Routing"],
    question: "Next.js App Router কী?",
    answer: `App Router হলো Next.js-এর modern routing architecture।

এটি app/ directory-এর উপর ভিত্তি করে কাজ করে।

Example:

app/
 ├── page.tsx
 ├── layout.tsx
 ├── loading.tsx
 ├── error.tsx
 ├── not-found.tsx
 ├── users/
 │    └── page.tsx
 └── products/
      └── page.tsx

প্রতিটি folder একটি route segment এবং page.tsx সেই route-এর UI।

App Router Server Components এবং modern React features-এর সাথে closely integrated।`
  },

  {
    id: "next-4",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Routing", "File Based Routing"],
    question: "Next.js file-based routing কীভাবে কাজ করে?",
    answer: `Folder structure route structure define করে।

Example:

app/
 ├── page.tsx
 ├── about/
 │    └── page.tsx
 └── products/
      └── page.tsx

Routes:

/
 /about
 /products

Next.js route configuration-এর অনেক অংশ filesystem থেকে automatically তৈরি করে।`
  },

  {
    id: "next-5",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Routing", "Dynamic Route"],
    question: "Dynamic route কীভাবে তৈরি করবেন?",
    answer: `Square bracket ব্যবহার করে dynamic segment তৈরি করা হয়।

Example:

app/products/[id]/page.tsx

URL:

/products/100
/products/200

এখানে:

id = dynamic parameter

Example:

export default async function Page({ params }) {
  const { id } = await params;

  return <div>Product: {id}</div>;
}

Dynamic route product details, user profile ইত্যাদির জন্য common।`
  },

  {
    id: "next-6",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Routing", "Catch All"],
    question: "Catch-all এবং optional catch-all route কী?",
    answer: `Catch-all:

app/docs/[...slug]/page.tsx

Matches:

/docs/a
/docs/a/b
/docs/a/b/c

Optional catch-all:

app/docs/[[...slug]]/page.tsx

এটি base route-ও match করতে পারে:

/docs
/docs/a
/docs/a/b

Documentation, CMS এবং nested content routing-এর জন্য useful।`
  },

  {
    id: "next-7",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Route Groups", "Routing"],
    question: "Route Groups কী?",
    answer: `Parentheses ব্যবহার করে route group তৈরি করা যায়।

Example:

app/
 ├── (marketing)/
 │    ├── page.tsx
 │    └── pricing/
 │         └── page.tsx
 └── (dashboard)/
      └── dashboard/
           └── page.tsx

Parentheses route URL-এর অংশ হয় না।

এটি:

- Organization
- Separate layouts
- Feature grouping

এর জন্য useful।`
  },

  {
    id: "next-8",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Parallel Routes", "Routing"],
    question: "Parallel Routes কী?",
    answer: `Parallel Routes একই layout-এর মধ্যে একাধিক route segment independently render করতে দেয়।

Example:

app/
 ├── @team/
 ├── @analytics/
 └── layout.tsx

একই page structure-এর মধ্যে:

Team
+
Analytics

independently render করা যায়।

Dashboard-এর complex multi-panel UI-এর ক্ষেত্রে useful।`
  },

  {
    id: "next-9",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Intercepting Routes"],
    question: "Intercepting Routes কী?",
    answer: `Intercepting Routes একটি route navigation-এর সময় অন্য route-এর UI contextually show করতে দেয়।

Common example:

Product list
 ↓
Click product
 ↓
Product details modal

Direct URL:

/products/100

কিন্তু navigation-এর সময়:

/products
 ↓
Modal product details

এ ধরনের UX-এর জন্য Intercepting Routes useful।`
  },

  {
    id: "next-10",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Layout"],
    question: "Next.js layout কী?",
    answer: `layout.tsx shared UI define করে যা multiple routes-এর মধ্যে reuse হয়।

Example:

app/layout.tsx

এখানে থাকতে পারে:

- Header
- Sidebar
- Footer
- Providers

Nested layout ব্যবহার করা যায়।

Example:

app/
 ├── layout.tsx
 └── dashboard/
      ├── layout.tsx
      └── page.tsx

Dashboard-এর জন্য আলাদা layout থাকবে।`
  },

  {
    id: "next-11",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Layout", "State"],
    question: "Next.js layout এবং page-এর মধ্যে পার্থক্য কী?",
    answer: `page.tsx একটি নির্দিষ্ট route-এর UI।

layout.tsx shared UI structure।

Example:

Root Layout
 ↓
Dashboard Layout
 ↓
Dashboard Page

Layout navigation-এর সময় সাধারণত preserve করা যায়, ফলে shared UI unnecessarily recreate না করেও রাখা যায়।

Large application-এ nested layouts খুব গুরুত্বপূর্ণ architecture feature।`
  },

  {
    id: "next-12",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Loading UI", "Suspense"],
    question: "loading.tsx কী?",
    answer: `loading.tsx route segment-এর loading UI define করে।

Example:

app/dashboard/loading.tsx

Data বা route rendering-এর সময় user একটি fallback/loading UI দেখতে পারে।

এটি Suspense-based streaming architecture-এর সাথে integrated।`
  },

  {
    id: "next-13",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Error Handling"],
    question: "Next.js error.tsx কী?",
    answer: `error.tsx route segment-এর rendering error-এর জন্য error UI define করে।

Example:

app/dashboard/error.tsx

এটি সাধারণত Client Component হতে হয় কারণ reset/recovery interaction থাকতে পারে।

Concept:

Dashboard
 ↓
Error
 ↓
Error UI
 ↓
Retry / Reset`
  },

  {
    id: "next-14",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["404", "Routing"],
    question: "Next.js-এ 404 page কীভাবে handle করবেন?",
    answer: `not-found.tsx ব্যবহার করা যায়।

Example:

app/not-found.tsx

Specific route segment-এর জন্যও:

app/products/not-found.tsx

Programmatically:

notFound();

ব্যবহার করা যায়।

Example:

const product = await getProduct(id);

if (!product) {
  notFound();
}`
  },

  {
    id: "next-15",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Server Components", "RSC"],
    question: "Next.js App Router-এ component defaultভাবে Server Component কেন?",
    answer: `App Router-এর architecture server-first।

Default component Server Component হওয়ায়:

- Server-side data access সহজ
- Client JavaScript কমে
- Sensitive server logic client bundle-এ পাঠানোর প্রয়োজন কমে
- Initial rendering efficient হতে পারে

Interactive component-এর জন্য:

"use client"

দিতে হয়।

Example:

"use client";

import { useState } from "react";

এটি component-কে Client Component boundary-তে নিয়ে যায়।`
  },

  {
    id: "next-16",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Client Components"],
    question: "\"use client\" কী করে?",
    answer: `"use client" file-এর top-এ দিলে সেই module একটি Client Component boundary হিসেবে treated হয়।

এটি প্রয়োজন হতে পারে:

- useState
- useEffect
- Event handlers
- Browser APIs
- Client-side interaction

Example:

"use client";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button>{count}</button>;
}

শুধু component interactive করার জন্য প্রয়োজনীয় জায়গাতেই "use client" রাখা ভালো।`
  },

  {
    id: "next-17",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Components", "Client Components"],
    question: "Server Component থেকে Client Component-এ কী pass করা যায়?",
    answer: `Server → Client boundary পার হওয়ার সময় serializable data pass করা যায়।

Example:

<UserCard user={user} />

যেখানে user plain serializable object।

Server function, database connection বা arbitrary non-serializable object client component-এ সরাসরি pass করা যায় না।

Architecture:

Server Component
 ↓
Serializable Props
 ↓
Client Component`
  },

  {
    id: "next-18",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Components", "Architecture"],
    question: "Client Component-এর ভিতরে Server Component import করা কেন problematic?",
    answer: `Client Component browser-side bundle boundary তৈরি করে।

Server-only logic client environment-এ নেওয়া যাবে না।

Better architecture:

Server Component
 ├── Server data
 └── Client Component
        ↓
      Props

অর্থাৎ server/client boundary আগে design করতে হবে।

Complex application-এ এই boundary ভুল করলে:

- Bundle বড়
- Server-only code leak
- Architecture complex

হতে পারে।`
  },

  {
    id: "next-19",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Data Fetching", "Server"],
    question: "Next.js App Router-এ server-side data fetching কীভাবে করবেন?",
    answer: `Server Component async হতে পারে।

Example:

export default async function UsersPage() {
  const response = await fetch("https://api.example.com/users");

  const users = await response.json();

  return <UserList users={users} />;
}

Server Component-এ data fetch করলে browser-এ unnecessary API orchestration code পাঠানোর প্রয়োজন কমতে পারে।

Database বা internal service access-এর ক্ষেত্রেও server-side architecture ব্যবহার করা যায়।`
  },

  {
    id: "next-20",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Data Fetching", "Caching"],
    question: "Next.js data caching কী?",
    answer: `Next.js rendering/data architecture-এ caching বিভিন্ন স্তরে থাকতে পারে।

Concept:

Request
 ↓
Data Cache / Application Cache
 ↓
Render
 ↓
Response

Cache-এর উদ্দেশ্য:

- Duplicate work কমানো
- Faster response
- Backend load কমানো

কোন data cache হবে এবং কতক্ষণ থাকবে তা data freshness requirement অনুযায়ী design করতে হয়।`
  },

  {
    id: "next-21",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Caching", "Revalidation"],
    question: "Revalidation কী?",
    answer: `Revalidation cached data-এর freshness maintain করার mechanism।

ধরুন product data cache করা হয়েছে।

Product update
 ↓
Old cache
 ↓
Revalidation
 ↓
Fresh data

Common strategies:

- Time-based revalidation
- On-demand invalidation

CMS, product catalog, blog, e-commerce-এর মতো application-এ এটি গুরুত্বপূর্ণ।`
  },

  {
    id: "next-22",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["ISR", "Caching"],
    question: "ISR কী?",
    answer: `ISR = Incremental Static Regeneration।

Static content generate করার পর নির্দিষ্ট সময় বা invalidation event-এর মাধ্যমে নতুন content তৈরি করা যায়।

Concept:

Build
 ↓
Static page
 ↓
Users
 ↓
Revalidation
 ↓
Fresh page

Useful:

- Product pages
- Blog
- News/content pages
- CMS pages

যেখানে pure static এবং fully dynamic-এর মাঝামাঝি freshness দরকার।`
  },

  {
    id: "next-23",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Static Rendering", "Dynamic Rendering"],
    question: "Static এবং Dynamic rendering-এর মধ্যে পার্থক্য কী?",
    answer: `Static rendering:

Output আগেই generate/cache করা যায়।

Benefits:

- Fast
- CDN-friendly
- Low server cost

Dynamic rendering:

Request-specific data বা runtime information অনুযায়ী render হয়।

Example:

- Personalized dashboard
- User-specific data
- Request-dependent content

Decision:

Static → content stable

Dynamic → content request/user dependent`
  },

  {
    id: "next-24",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["SSR", "Rendering"],
    question: "Next.js-এ SSR কীভাবে কাজ করে?",
    answer: `SSR-এ request-এর সময় server HTML/content generate করতে পারে।

Flow:

Browser
 ↓
Request
 ↓
Next.js Server
 ↓
Data Fetch
 ↓
React Render
 ↓
HTML/stream
 ↓
Browser

Benefits:

- SEO
- Faster content visibility
- Dynamic server-side content

Trade-off:

- Server compute
- Data latency
- Infrastructure complexity`
  },

  {
    id: "next-25",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Streaming", "Suspense"],
    question: "Next.js streaming rendering কী?",
    answer: `Streaming-এর মাধ্যমে পুরো page তৈরি হওয়ার জন্য অপেক্ষা না করে UI-এর ready অংশ আগে পাঠানো যায়।

Concept:

Request
 ↓
Shell ready
 ↓
Send shell
 ↓
Slow data
 ↓
Send remaining content

Example:

<Dashboard>
 ├── Header      → fast
 ├── Sidebar     → fast
 └── Analytics   → slow
                  ↓
                stream later

Slow component-এর জন্য Suspense boundary ব্যবহার করা যায়।`
  },

  {
    id: "next-26",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Streaming", "Performance"],
    question: "Streaming-এর সুবিধা কী?",
    answer: `Streaming:

- Time to first content improve করতে পারে
- Slow data-এর জন্য পুরো page block হয় না
- Progressive rendering হয়
- Better perceived performance

Traditional:

Request
 ↓
Wait for everything
 ↓
Response

Streaming:

Request
 ↓
Shell
 ↓
Partial UI
 ↓
Slow section
 ↓
Complete UI`
  },

  {
    id: "next-27",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Route Handlers", "API"],
    question: "Next.js Route Handler কী?",
    answer: `Route Handler App Router-এর মধ্যে server-side HTTP endpoint তৈরি করতে দেয়।

Example:

app/api/users/route.ts

export async function GET() {
  return Response.json({
    users: []
  });
}

HTTP methods:

- GET
- POST
- PUT
- PATCH
- DELETE

এটি lightweight backend/API endpoint-এর জন্য useful।`
  },

  {
    id: "next-28",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Route Handlers", "REST"],
    question: "Route Handler এবং Server Action-এর মধ্যে পার্থক্য কী?",
    answer: `Route Handler:

HTTP endpoint।

Example:

GET /api/users
POST /api/orders

Useful:

- External API
- Mobile client
- Webhook
- REST endpoint

Server Action:

Server function যা application-এর UI/action workflow-এর সাথে tightly integrated।

Useful:

- Form submission
- Mutations
- Internal application actions

সহজভাবে:

Route Handler = HTTP API boundary

Server Action = server-side application action`
  },

  {
    id: "next-29",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Actions", "Mutations"],
    question: "Next.js Server Action কী?",
    answer: `Server Action হলো server-side function যা client interaction থেকে server-side mutation execute করতে পারে।

Concept:

Form
 ↓
Server Action
 ↓
Validation
 ↓
Business Logic
 ↓
Database
 ↓
Revalidate
 ↓
Updated UI

Use cases:

- Create
- Update
- Delete
- Form submission

Security-wise Server Action-কে public endpoint-এর মতো treat করে authentication এবং authorization validate করতে হবে।`
  },

  {
    id: "next-30",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Actions", "Security"],
    question: "Server Action কি security boundary?",
    answer: `Server Action server-side execute হলেও authentication/authorization automatically business permission guarantee করে না।

প্রতিটি sensitive mutation-এ:

Request
 ↓
Authentication
 ↓
Authorization
 ↓
Input validation
 ↓
Business validation
 ↓
Database mutation

করতে হবে।

Example:

User logged in ≠ User allowed to delete this order.

Authentication এবং authorization আলাদা concern।`
  },

  {
    id: "next-31",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Forms", "Server Actions"],
    question: "Next.js-এ form submission কীভাবে design করবেন?",
    answer: `Modern architecture:

Form
 ↓
Server Action
 ↓
Validate
 ↓
Business Logic
 ↓
Database
 ↓
Revalidate
 ↓
Updated UI

Need:

- Client validation
- Server validation
- Authentication
- Authorization
- Error handling
- Pending state
- Success state
- Optimistic UI where appropriate

Client validation UX-এর জন্য; server validation security/business correctness-এর জন্য।`
  },

  {
    id: "next-32",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Revalidation", "Cache"],
    question: "Next.js-এ mutation-এর পর cache কীভাবে invalidate করবেন?",
    answer: `Mutation:

Create Product
 ↓
Database update
 ↓
Invalidate affected cached data
 ↓
Fresh data
 ↓
UI update

Use cases অনুযায়ী path/tag-based invalidation strategy ব্যবহার করা যায়।

Example concept:

revalidatePath("/products");

অথবা tag-based:

revalidateTag("products");

কোন data invalidate হবে তা application cache architecture-এর উপর নির্ভর করে।`
  },

  {
    id: "next-33",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Cache", "Architecture"],
    question: "Next.js caching এবং browser caching-এর মধ্যে পার্থক্য কী?",
    answer: `Next.js/application cache:

Server-side data/rendering/cache strategy-এর অংশ।

Browser cache:

Client browser HTTP resource cache করে।

CDN cache:

Edge location-এ response/resource cache করতে পারে।

Architecture:

Browser
 ↓
CDN
 ↓
Next.js
 ↓
Application/Data Cache
 ↓
Database/API

Production performance-এর জন্য কোন layer-এ cache হবে তা পরিষ্কারভাবে design করা গুরুত্বপূর্ণ।`
  },

  {
    id: "next-34",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Middleware", "Request"],
    question: "Next.js Middleware কী?",
    answer: `Middleware request-এর lifecycle-এর একটি early processing layer হিসেবে কাজ করতে পারে।

Use cases:

- Authentication checks
- Redirect
- Rewrite
- Headers
- Locale detection
- Request-based routing

Concept:

Request
 ↓
Middleware
 ├── Allow
 ├── Redirect
 └── Rewrite
 ↓
Next.js route

Current Next.js versions-এ request interception-এর architecture/version-specific terminology পরিবর্তিত হতে পারে, তাই production project-এর version documentation follow করা উচিত।`
  },

  {
    id: "next-35",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Middleware", "Authentication"],
    question: "Middleware দিয়ে authentication করা উচিত?",
    answer: `Middleware authentication-এর early routing check-এর জন্য useful।

Example:

Request
 ↓
Middleware
 ↓
Has session?
 ├── No → Login
 └── Yes → Continue

কিন্তু middleware-কে একমাত্র authorization layer করা উচিত নয়।

Backend/server action/data access-এর কাছেও permission check থাকা উচিত।

Security architecture:

Middleware
+
Server authorization
+
Database/resource authorization`
  },

  {
    id: "next-36",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Authentication", "Authorization"],
    question: "Authentication এবং Authorization-এর পার্থক্য কী?",
    answer: `Authentication:

"আপনি কে?"

Example:

User login করেছে।

Authorization:

"আপনি কী করতে পারবেন?"

Example:

Admin product delete করতে পারে।

Flow:

Authentication
 ↓
Identity
 ↓
Authorization
 ↓
Permission
 ↓
Resource
`
  },

  {
    id: "next-37",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["RBAC", "Authorization"],
    question: "Next.js application-এ RBAC কীভাবে implement করবেন?",
    answer: `RBAC = Role-Based Access Control।

Example:

Roles:

admin
manager
editor
viewer

Permissions:

product:create
product:update
product:delete
report:view

Flow:

User
 ↓
Role
 ↓
Permissions
 ↓
Resource/action

Authorization server-side enforce করতে হবে।

UI-তে button hide করা শুধু UX; security enforcement backend/server-side হতে হবে।`
  },

  {
    id: "next-38",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Multi Tenant", "SaaS"],
    question: "Next.js-এ multi-tenant SaaS architecture কীভাবে design করবেন?",
    answer: `Example:

tenant-a.example.com
tenant-b.example.com

Request
 ↓
Tenant detection
 ↓
Middleware/Proxy
 ↓
Tenant context
 ↓
Server Component
 ↓
Tenant database/data
 ↓
UI

Tenant identify করা যেতে পারে:

- Subdomain
- Custom domain
- Path
- Authenticated user mapping

Critical:

Tenant ID শুধু client input থেকে trust করা যাবে না।

Every database query/resource authorization tenant scope enforce করতে হবে।`
  },

  {
    id: "next-39",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Custom Domain", "SaaS"],
    question: "Next.js SaaS application-এ custom domain কীভাবে support করবেন?",
    answer: `Example:

shop1.com
shop2.com

DNS
 ↓
Load Balancer/CDN
 ↓
Next.js
 ↓
Domain detection
 ↓
Tenant lookup
 ↓
Tenant configuration
 ↓
Render store

Database:

domains
 ├── domain
 ├── tenant_id
 └── status

Request-এর Host header থেকে domain resolve করে tenant identify করা যায়।

Production-এ TLS certificate এবং DNS management-ও architecture-এর অংশ।`
  },

  {
    id: "next-40",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Environment Variables", "Security"],
    question: "Next.js environment variable কীভাবে কাজ করে?",
    answer: `Server-only environment variables server-side রাখা উচিত।

Client-এর জন্য explicitly exposed variables সাধারণত NEXT_PUBLIC_ prefix ব্যবহার করে।

Example:

DATABASE_URL=...

Server-side only।

Public:

NEXT_PUBLIC_API_URL=...

Important:

NEXT_PUBLIC_ value client bundle-এ expose হতে পারে।

তাই secret:

- Database password
- Private API key
- Secret token

কখনো public environment variable করা উচিত নয়।`
  },

  {
    id: "next-41",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Metadata", "SEO"],
    question: "Next.js metadata কী?",
    answer: `Metadata page-এর SEO এবং social sharing information define করে।

Example:

export const metadata = {
  title: "Products",
  description: "Product listing"
};

Dynamic metadata-এর জন্য generateMetadata ব্যবহার করা যায়।

Important:

- title
- description
- canonical
- Open Graph
- Twitter metadata
- robots

SEO-sensitive application-এর জন্য metadata গুরুত্বপূর্ণ।`
  },

  {
    id: "next-42",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["SEO", "Dynamic Metadata"],
    question: "Dynamic metadata কীভাবে তৈরি করবেন?",
    answer: `Product ID অনুযায়ী metadata generate করা যায়।

Concept:

/products/100
 ↓
Fetch product
 ↓
generateMetadata()
 ↓
Product title
 ↓
HTML metadata

Example:

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description
  };
}

Dynamic content pages-এর জন্য এটি useful।`
  },

  {
    id: "next-43",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Image Optimization"],
    question: "Next.js Image component কেন ব্যবহার করবেন?",
    answer: `next/image image optimization-এর জন্য useful।

Benefits:

- Responsive sizing
- Lazy loading
- Image optimization
- Layout stability
- Modern image formats where supported
- Better loading behavior

Example:

<Image
  src="/product.jpg"
  width={800}
  height={600}
  alt="Product"
/>

Remote image-এর ক্ষেত্রে allowed remote sources/configuration ঠিকভাবে configure করতে হয়।`
  },

  {
    id: "next-44",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Fonts", "Performance"],
    question: "Next.js font optimization কী?",
    answer: `Next.js font loading optimize করার tooling provide করে।

Benefits:

- Better font loading
- Reduced layout shift
- Self-hosting options
- Performance optimization

Production application-এ unnecessary external font request কমানো এবং font-display strategy গুরুত্বপূর্ণ।`
  },

  {
    id: "next-45",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["SEO", "Sitemap"],
    question: "Next.js-এ sitemap এবং robots কীভাবে manage করবেন?",
    answer: `SEO architecture-এর অংশ হিসেবে:

sitemap
robots
canonical
metadata

manage করতে হয়।

Dynamic e-commerce site-এ product URLs অনেক বেশি হতে পারে।

Architecture:

Database
 ↓
Published products
 ↓
Sitemap generation
 ↓
Search engine

Only indexable/public pages sitemap-এ include করা উচিত।`
  },

  {
    id: "next-46",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["API", "BFF"],
    question: "Next.js Backend-for-Frontend বা BFF কী?",
    answer: `BFF = Backend for Frontend।

Browser সরাসরি অনেক backend service call না করে:

Browser
 ↓
Next.js BFF
 ├── User Service
 ├── Product Service
 ├── Order Service
 └── Payment Service

Next.js frontend-specific response তৈরি করতে পারে।

Benefits:

- API aggregation
- Hide internal services
- Frontend-specific response
- Authentication integration
- Reduce client complexity

Large microservice architecture-এ BFF useful হতে পারে।`
  },

  {
    id: "next-47",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Microservices", "Architecture"],
    question: "Next.js microservice architecture-এর সাথে কীভাবে কাজ করতে পারে?",
    answer: `Possible architecture:

Browser
 ↓
Next.js
 ↓
API Gateway/BFF
 ↓
 ┌───────────────┐
 ↓       ↓       ↓
User   Product  Order
Service Service Service
 ↓       ↓       ↓
DB      DB      DB

Next.js frontend orchestration এবং presentation-এর দায়িত্ব নিতে পারে।

Business logic সাধারণত backend services-এর মধ্যে রাখা উচিত।

Next.js-কে সব microservice-এর business logic dump করার জায়গা বানানো উচিত নয়।`
  },

  {
    id: "next-48",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Database", "ORM"],
    question: "Next.js থেকে সরাসরি database access করা যায়?",
    answer: `Server-side code থেকে database access করা যায়।

Example:

Server Component
 ↓
Repository
 ↓
ORM
 ↓
Database

কিন্তু database client browser-side Client Component-এ পাঠানো যাবে না।

Architecture:

Client
 ↓
Server Component / Server Action / Route Handler
 ↓
Repository
 ↓
Database

DB credentials অবশ্যই server-side রাখতে হবে।`
  },

  {
    id: "next-49",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["ORM", "Prisma"],
    question: "Next.js-এ Prisma কীভাবে ব্যবহার করা যায়?",
    answer: `Prisma একটি TypeScript ORM।

Architecture:

Server Component
 ↓
Service
 ↓
Prisma Client
 ↓
PostgreSQL/MySQL

Example:

const users = await prisma.user.findMany();

Production application-এ:

- Connection management
- Migration
- Transaction
- Query optimization
- Error handling

ঠিকভাবে design করতে হবে।`
  },

  {
    id: "next-50",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Connection Pool", "Database"],
    question: "Next.js serverless environment-এ database connection problem কেন হয়?",
    answer: `Serverless architecture-এ অনেক function instance তৈরি হতে পারে।

যদি প্রতিটি invocation নতুন DB connection তৈরি করে:

Request
 ↓
Function
 ↓
New DB connection
 ↓
Database

High traffic-এ connection limit exceed হতে পারে।

Solutions:

- Connection pooling
- Managed database pooling
- Appropriate ORM configuration
- Serverless-aware database architecture

Production deployment target অনুযায়ী DB strategy design করতে হয়।`
  },

  {
    id: "next-51",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Cookies", "Authentication"],
    question: "Next.js-এ cookie কীভাবে handle করবেন?",
    answer: `Server-side request context থেকে cookies read/write করা যায়।

Authentication-এর ক্ষেত্রে সাধারণত:

Browser
 ↓
Secure HttpOnly Cookie
 ↓
Next.js Server
 ↓
Session validation

Important cookie flags:

- HttpOnly
- Secure
- SameSite
- Appropriate Path
- Appropriate expiry

Sensitive token JavaScript-accessible storage-এ রাখার পরিবর্তে secure cookie architecture অনেক ক্ষেত্রে preferable।`
  },

  {
    id: "next-52",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["CSRF", "Security"],
    question: "Next.js application-এ CSRF কীভাবে prevent করবেন?",
    answer: `CSRF cookie-based authentication-এর ক্ষেত্রে গুরুত্বপূর্ণ।

Possible protections:

- SameSite cookies
- CSRF token
- Origin/Referer validation where appropriate
- Framework/server action protections where applicable
- Avoid unsafe state-changing GET requests

Security architecture request type এবং authentication mechanism অনুযায়ী design করতে হবে।`
  },

  {
    id: "next-53",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["CORS", "API"],
    question: "Next.js-এ CORS কীভাবে handle করবেন?",
    answer: `CORS browser security policy।

যদি Next.js Route Handler API expose করে, response headers দিয়ে allowed origin/method/header configure করা যায়।

Example concept:

Access-Control-Allow-Origin
Access-Control-Allow-Methods
Access-Control-Allow-Headers

যদি Next.js frontend একই-origin API ব্যবহার করে, অনেক ক্ষেত্রে CORS complexity কমে।

CORS authentication/authorization-এর replacement নয়।`
  },

  {
    id: "next-54",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "Security"],
    question: "Next.js API rate limiting কীভাবে implement করবেন?",
    answer: `Architecture:

Client
 ↓
Rate Limiter
 ↓
Next.js API
 ↓
Backend

Production distributed deployment-এ Redis বা edge/infrastructure-level rate limiter ব্যবহার করা যেতে পারে।

Limit হতে পারে:

- IP
- User ID
- API key
- Tenant
- Endpoint

Example:

100 requests/minute/user

Rate limit response সাধারণত HTTP 429।`
  },

  {
    id: "next-55",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Security", "Headers"],
    question: "Next.js application-এর important security headers কী?",
    answer: `Common security headers:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

CSP বিশেষভাবে XSS risk কমাতে সাহায্য করতে পারে।

Security headers application dependencies এবং third-party scripts অনুযায়ী carefully configure করতে হয়।`
  },

  {
    id: "next-56",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Performance", "Core Web Vitals"],
    question: "Next.js application-এর Core Web Vitals কীভাবে improve করবেন?",
    answer: `Important metrics:

LCP
INP
CLS

Improve করতে:

LCP:
- Optimize server response
- Reduce render-blocking resources
- Optimize images
- Streaming

INP:
- Reduce long JavaScript tasks
- Optimize event handlers
- Reduce unnecessary rendering

CLS:
- Reserve image dimensions
- Avoid layout shifts
- Stable fonts/layout

Additional:

- Code splitting
- Caching
- CDN
- Image optimization
- Reduce client JS`
  },

  {
    id: "next-57",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Performance", "Waterfall"],
    question: "Next.js data-fetching waterfall কী?",
    answer: `যখন একটি request শেষ হওয়ার পর পরের request শুরু হয়:

Request A
 ↓
Wait
 ↓
Request B
 ↓
Wait
 ↓
Request C

এতে total latency বেড়ে যায়।

Parallel fetching:

Request A ──────┐
Request B ──────┼→ Render
Request C ──────┘

Promise.all বা architecture-level parallel data fetching ব্যবহার করা যেতে পারে।

Dependent request হলে sequential dependency প্রয়োজন হতে পারে।`
  },

  {
    id: "next-58",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Performance", "Request Memoization"],
    question: "Next.js duplicate data fetching কীভাবে optimize করবেন?",
    answer: `একই render tree-তে একই data প্রয়োজন হলে request deduplication/memoization mechanisms ব্যবহার করা যেতে পারে।

Example:

Layout
 ↓
getUser()

Page
 ↓
getUser()

Architecture এমনভাবে design করা উচিত যাতে একই remote resource unnecessarily বারবার fetch না হয়।

Cache এবং request memoization-এর behavior Next.js version এবং API অনুযায়ী verify করতে হবে।`
  },

  {
    id: "next-59",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Error Handling", "Observability"],
    question: "Production Next.js error handling কীভাবে design করবেন?",
    answer: `Layered approach:

UI error
 ↓
error.tsx
 ↓
Application logging
 ↓
Error tracking
 ↓
Backend logs
 ↓
Distributed tracing

Need:

- User-friendly error UI
- Correlation/request ID
- Server logs
- Error monitoring
- Sensitive data masking
- Retry where safe

Production-এ raw stack trace user-কে দেখানো উচিত নয়।`
  },

  {
    id: "next-60",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Logging", "Observability"],
    question: "Next.js application-এ observability কীভাবে implement করবেন?",
    answer: `Three pillars:

1. Logs
2. Metrics
3. Traces

Example:

Browser
 ↓
Next.js
 ↓
API Gateway
 ↓
Microservices

একটি request-এর correlation ID থাকতে পারে:

Request ID
 ↓
Next.js log
 ↓
Backend log
 ↓
Database/service trace

Monitoring:

- Error rate
- Latency
- Throughput
- CPU/memory
- Cache hit ratio
- API failure
- Web Vitals`
  },

  {
    id: "next-61",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Testing", "Unit Testing"],
    question: "Next.js application কীভাবে test করবেন?",
    answer: `Testing pyramid:

Unit
 ↓
Integration
 ↓
E2E

Unit:

Utility/function

Component:

React Testing Library

Integration:

Component + API/data layer

E2E:

Playwright/Cypress

Critical flows:

- Login
- Checkout
- Payment
- Product creation
- Admin workflow

সবকিছু E2E করার প্রয়োজন নেই।`
  },

  {
    id: "next-62",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Testing", "Server Components"],
    question: "Server Component কীভাবে test করবেন?",
    answer: `Server Component-এর test strategy component-এর responsibility অনুযায়ী হবে।

Test করতে হবে:

- Data transformation
- Rendering
- Error state
- Not found
- Authorization
- Server-side logic

Database/API dependency mock করা যেতে পারে।

Business logic component-এর মধ্যে না রেখে service/use-case layer-এ রাখলে unit testing সহজ হয়।`
  },

  {
    id: "next-63",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["CI/CD", "Deployment"],
    question: "Next.js application-এর production deployment process কী?",
    answer: `Typical pipeline:

Developer
 ↓
Git
 ↓
Pull Request
 ↓
Lint
 ↓
Type Check
 ↓
Unit Tests
 ↓
Build
 ↓
Security Scan
 ↓
Deploy
 ↓
Health Check
 ↓
Monitoring

Production deployment হতে পারে:

- Vercel
- Docker
- Kubernetes
- Cloud VM
- Cloud container platform

Deployment target অনুযায়ী caching, environment variables এবং server runtime design করতে হবে।`
  },

  {
    id: "next-64",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Docker", "Deployment"],
    question: "Next.js Docker architecture কীভাবে design করবেন?",
    answer: `Typical production setup:

Internet
 ↓
Nginx / Load Balancer
 ↓
Next.js Container
 ↓
API Services
 ↓
Database

Docker image:

Build Stage
 ↓
Production Stage
 ↓
Next.js Runtime

Multi-stage Docker build ব্যবহার করে unnecessary build dependencies production image থেকে বাদ দেওয়া যায়।

Standalone output mode container image size কমাতে সাহায্য করতে পারে।`
  },

  {
    id: "next-65",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Horizontal Scaling", "Deployment"],
    question: "Next.js application horizontally scale করলে কী কী সমস্যা হতে পারে?",
    answer: `Architecture:

Load Balancer
 ├── Next.js Instance 1
 ├── Next.js Instance 2
 └── Next.js Instance 3

Potential issues:

- Session storage
- Cache consistency
- WebSocket connections
- File uploads
- In-memory state
- Rate limiting

Solutions:

- External session store
- Redis
- Shared object storage
- External cache
- Stateless application design
- Load balancer strategy

Application server-এর local memory-তে critical shared state রাখা উচিত নয়।`
  },

  {
    id: "next-66",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Caching", "Redis"],
    question: "Next.js application-এ Redis কোথায় ব্যবহার করা যায়?",
    answer: `Redis ব্যবহার হতে পারে:

- Session
- Distributed cache
- Rate limiting
- Temporary data
- Distributed locks
- Pub/Sub
- Queue integration

Architecture:

Next.js
 ↓
Redis
 ├── Cache
 ├── Session
 └── Rate Limit

তবে Redis-কে primary database-এর replacement হিসেবে ব্যবহার করা উচিত নয় যদি durable persistence প্রয়োজন হয়।`
  },

  {
    id: "next-67",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["File Upload", "Storage"],
    question: "Next.js application-এ large file upload কীভাবে design করবেন?",
    answer: `Large file Next.js server-এর মাধ্যমে stream করে database/server disk-এ রাখার পরিবর্তে object storage architecture ভালো হতে পারে।

Flow:

Browser
 ↓
Request signed upload URL
 ↓
Object Storage
 ↓
Upload complete
 ↓
Next.js/API
 ↓
Save metadata

Storage:

- S3-compatible object storage
- Cloud object storage

Database-এ সাধারণত file metadata রাখা হয়, binary file নয়।`
  },

  {
    id: "next-68",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Background Jobs", "Queue"],
    question: "Next.js request-এর মধ্যে heavy task করা উচিত কি?",
    answer: `Long-running task synchronous request-এ রাখা risky।

Example:

Generate 500-page report
 ↓
Request waits
 ↓
Timeout

Better:

Next.js
 ↓
Create Job
 ↓
Queue
 ↓
Worker
 ↓
Generate Report
 ↓
Storage
 ↓
Notify User

RabbitMQ/Kafka/SQS-এর মতো queue architecture ব্যবহার করা যায়।

Next.js request দ্রুত acknowledge করে।`
  },

  {
    id: "next-69",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["E-commerce", "Architecture"],
    question: "Next.js দিয়ে high-scale e-commerce application কীভাবে design করবেন?",
    answer: `Architecture:

                    CDN
                     ↓
                 Next.js
                     ↓
              ┌──────┴──────┐
              ↓             ↓
          Server UI       Client UI
              ↓             ↓
             BFF/API Gateway
                     ↓
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
    Product        Cart          Order
    Service        Service       Service
       ↓             ↓             ↓
      DB            Redis         DB

Additional:

- CDN
- Product caching
- Search engine
- Image CDN
- Payment service
- Queue
- Inventory locking
- Distributed tracing

Product pages can be heavily cached, while cart/checkout must remain user-specific and dynamic।`
  },

  {
    id: "next-70",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Multi Tenant", "E-commerce SaaS"],
    question: "Shopify-এর মতো Next.js multi-tenant e-commerce builder কীভাবে design করবেন?",
    answer: `Architecture:

                    DNS
                     ↓
                CDN / Proxy
                     ↓
                 Next.js
                     ↓
               Tenant Resolver
                     ↓
            ┌────────┴─────────┐
            ↓                  ↓
        Storefront          Admin
            ↓                  ↓
       Tenant Context      Tenant Context
            ↓                  ↓
             BFF/API Gateway
                     ↓
        ┌────────────┼────────────┐
        ↓            ↓            ↓
      Catalog       Order       Payment
      Service       Service      Service
        ↓            ↓            ↓
       DB           DB          DB

Tenant identification:

custom domain
+
subdomain
+
authenticated tenant

Important:

Every query:

WHERE tenant_id = currentTenant

Authorization must be server-side.

Storefront pages:

Static/ISR/cache

Admin:

Dynamic/authenticated

Checkout:

Highly dynamic

এই separation scalable SaaS architecture-এর জন্য অত্যন্ত গুরুত্বপূর্ণ।`
  },

  {
    id: "next-71",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Architecture", "Clean Architecture"],
    question: "Next.js application-এ business logic কোথায় রাখা উচিত?",
    answer: `সব business logic page.tsx-এর মধ্যে রাখা উচিত নয়।

Better:

Page
 ↓
Use Case / Service
 ↓
Repository
 ↓
Database/API

Example:

app/orders/page.tsx
        ↓
orderService.getOrders()
        ↓
orderRepository
        ↓
Database

Benefits:

- Testability
- Reusability
- Separation of concerns
- Easier migration
- Easier API reuse

UI layer presentation-এর দায়িত্ব নেবে।`
  },

  {
    id: "next-72",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Monorepo", "Architecture"],
    question: "Large Next.js organization-এর জন্য monorepo কীভাবে design করবেন?",
    answer: `Example:

apps/
 ├── storefront/
 ├── admin/
 └── docs/

packages/
 ├── ui/
 ├── eslint-config/
 ├── types/
 ├── config/
 ├── api-client/
 └── auth/

Benefits:

- Shared UI
- Shared TypeScript types
- Shared configuration
- Consistent tooling

Tools:

- Turborepo
- pnpm workspaces
- Nx

Shared package-এ business coupling অতিরিক্ত বাড়ানো উচিত নয়।`
  },

  {
    id: "next-73",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["TypeScript", "Type Safety"],
    question: "Next.js application-এ TypeScript কেন গুরুত্বপূর্ণ?",
    answer: `TypeScript runtime error prevent করে না, কিন্তু development-time type safety দেয়।

Benefits:

- Props validation
- API response types
- Component contracts
- Better autocomplete
- Refactoring safety
- Compile-time errors

Example:

type User = {
  id: string;
  name: string;
};

function UserCard({ user }: { user: User }) {
  ...
}

Runtime data-এর জন্য TypeScript-এর পাশাপাশি runtime validation প্রয়োজন হতে পারে।`
  },

  {
    id: "next-74",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Validation", "Zod"],
    question: "TypeScript type এবং runtime validation-এর মধ্যে পার্থক্য কী?",
    answer: `TypeScript:

Compile-time/static checking।

Runtime API:

Actual unknown data।

Example:

API
 ↓
unknown JSON
 ↓
Runtime validation
 ↓
Validated data
 ↓
TypeScript application

Zod-এর মতো schema validation library ব্যবহার করা যায়।

কারণ TypeScript type runtime-এ exist করে না।`
  },

  {
    id: "next-75",
    category: "Next.js",
    difficulty: "Senior",
    tags: ["Architecture", "Production"],
    question: "একজন Senior Next.js developer-এর জন্য সবচেয়ে গুরুত্বপূর্ণ architecture decision কী কী?",
    answer: `প্রথমে এই প্রশ্নগুলোর উত্তর দিতে হবে:

1. কোন component Server?
2. কোন component Client?
3. কোন data static?
4. কোন data dynamic?
5. কোন data cache হবে?
6. Cache কখন invalidate হবে?
7. কোথায় authentication হবে?
8. কোথায় authorization হবে?
9. Business logic কোথায় থাকবে?
10. Database access কোথায় থাকবে?
11. API/BFF প্রয়োজন কি?
12. Large operation queue-তে যাবে কি?
13. Multi-tenant হলে tenant isolation কীভাবে হবে?
14. File কোথায় store হবে?
15. Application কীভাবে scale করবে?
16. Error কীভাবে observe করা হবে?
17. Performance কীভাবে measure হবে?
18. Testing strategy কী?
19. Deployment architecture কী?
20. Security boundary কোথায়?

Production-grade Next.js architecture:

Browser
 ↓
CDN / Edge
 ↓
Next.js
 ├── Server Components
 ├── Client Components
 ├── Server Actions
 ├── Route Handlers
 ├── Cache
 └── BFF
       ↓
 API Gateway
       ↓
Microservices
 ├── Auth
 ├── User
 ├── Product
 ├── Order
 ├── Payment
 └── Notification
       ↓
Database / Redis / Queue / Object Storage

সবচেয়ে গুরুত্বপূর্ণ principle:

"React component কোথায় render হবে" শুধু সেটাই নয়—  
"data কোথায় থাকবে, business logic কোথায় থাকবে, cache কোথায় হবে, এবং security কোথায় enforce হবে"—এই architecture decisions-ই Senior Next.js interview-এর সবচেয়ে গুরুত্বপূর্ণ অংশ।`
  }
];