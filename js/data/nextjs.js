const nextjsQuestions = [
  {
    id: "next-1",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["App Router","Pages Router","File-based Routing"],
    question: "Next.js App Router vs Pages Router — পার্থক্য কী? নতুন প্রজেক্টে কোনটি ব্যবহার করবেন?",
    answer: `
      <p>Next.js 13+ থেকে <strong>App Router</strong> (<code>app/</code> directory) ডিফল্ট হিসেবে ব্যবহৃত হয়। এটি React Server Components, nested layouts, এবং streaming সাপোর্ট করে।</p>
      <h4>তুলনা:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid #ccc;">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Pages Router</th>
          <th style="text-align:left; padding:8px;">App Router</th>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">Directory</td><td style="padding:8px;">pages/</td><td style="padding:8px;">app/</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">Server Components</td><td style="padding:8px;">❌</td><td style="padding:8px;">✅ Default</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">Layouts</td><td style="padding:8px;">_app.js (global only)</td><td style="padding:8px;">Nested layouts</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">Data Fetching</td><td style="padding:8px;">getServerSideProps, getStaticProps</td><td style="padding:8px;">async components, fetch()</td>
        </tr>
        <tr>
          <td style="padding:8px;">Streaming</td><td style="padding:8px;">❌</td><td style="padding:8px;">✅ Suspense-based</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// App Router Structure
app/
├── layout.tsx          // Root layout (HTML, body)
├── page.tsx            // Home page (/)
├── loading.tsx         // Loading UI
├── error.tsx           // Error UI
├── dashboard/
│   ├── layout.tsx      // Dashboard layout (nested!)
│   └── page.tsx        // /dashboard
├── blog/
│   └── [slug]/
│       └── page.tsx    // /blog/my-post (dynamic)
└── api/
    └── users/
        └── route.ts    // API: /api/users</code></pre>
      </div>
      <p><strong>সিদ্ধান্ত:</strong> নতুন প্রজেক্টে সবসময় App Router ব্যবহার করুন। Pages Router শুধুমাত্র legacy প্রজেক্ট মেইনটেইন করার জন্য ব্যবহৃত হয়।</p>
    `
  },
  {
    id: "next-2",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Components","Client Components","use client"],
    question: "Next.js-এ Server Components vs Client Components — কখন কোনটি ব্যবহার করবেন? 'use client' directive কীভাবে কাজ করে?",
    answer: `
      <p>App Router-এ সব কম্পোনেন্ট ডিফল্টভাবে <strong>Server Component</strong>। Interactive features দরকার হলে <code>'use client'</code> directive দিয়ে Client Component বানাতে হবে।</p>
      <h4>কোনটি কখন ব্যবহার করবেন:</h4>
      <ul>
        <li><strong>Server Component:</strong> Data fetch, DB query, sensitive logic, static content, large dependencies (moment.js, lodash)।</li>
        <li><strong>Client Component:</strong> onClick, onChange, useState, useEffect, browser APIs, real-time features।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server Component (default) — NO 'use client'
// ✅ সরাসরি DB query, API call
async function ProductPage({ params }) {
  const product = await db.product.findUnique({ where: { id: params.id } });
  return (
    &lt;div&gt;
      &lt;h1&gt;{product.name}&lt;/h1&gt;
      &lt;AddToCartButton productId={product.id} /&gt; {/* Client Component */}
    &lt;/div&gt;
  );
}

// Client Component — interactive
'use client';
import { useState } from 'react';

function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  };
  return &lt;button onClick={handleAdd}&gt;{loading ? 'Adding...' : 'Add to Cart'}&lt;/button&gt;;
}

// ⚠️ Important Rules:
// 1. Server Component-এ useState/useEffect ব্যবহার করা যাবে না
// 2. Client Component সরাসরি Server Component-কে import করতে পারে না, কিন্তু children হিসেবে নিতে পারে!
// 3. 'use client' boundary — এর নিচের সব component client হয়ে যায়</code></pre>
      </div>
    `
  },
  {
    id: "next-3",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["SSR","SSG","ISR","Rendering"],
    question: "Next.js-এ SSR, SSG, ISR এবং Streaming কীভাবে কাজ করে? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <h4>Rendering Strategies:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid #ccc;">
          <th style="text-align:left; padding:8px;">Strategy</th>
          <th style="text-align:left; padding:8px;">When Built</th>
          <th style="text-align:left; padding:8px;">Best For</th>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;"><strong>SSG</strong> (Static)</td><td style="padding:8px;">Build time</td><td style="padding:8px;">Blog, docs, marketing</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;"><strong>SSR</strong> (Dynamic)</td><td style="padding:8px;">Every request</td><td style="padding:8px;">Personalized pages, real-time data</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;"><strong>ISR</strong> (Incremental)</td><td style="padding:8px;">Background revalidation</td><td style="padding:8px;">E-commerce products, news</td>
        </tr>
        <tr>
          <td style="padding:8px;"><strong>Streaming</strong></td><td style="padding:8px;">Progressive</td><td style="padding:8px;">Complex pages with slow data</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// SSG — Build time-এ generate (default)
async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return &lt;article&gt;{post.content}&lt;/article&gt;;
}

// SSR — প্রতি request-এ নতুন data
export const dynamic = 'force-dynamic';
async function DashboardPage() {
  const data = await fetch('/api/dashboard', { cache: 'no-store' });
  return &lt;Dashboard data={data} /&gt;;
}

// ISR — Cached + background revalidation
async function ProductPage({ params }) {
  const product = await fetch(\`/api/products/\${params.id}\`, {
    next: { revalidate: 60 } // 60 seconds পরে background-এ refresh
  });
  return &lt;Product data={product} /&gt;;
}

// On-demand ISR — webhook/action trigger-এ revalidate
import { revalidatePath, revalidateTag } from 'next/cache';
export async function POST(request) {
  revalidatePath('/products'); // Path revalidate
  revalidateTag('products');   // Tag-based revalidate
  return Response.json({ revalidated: true });
}

// Streaming — Suspense boundaries
async function Page() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Dashboard&lt;/h1&gt;
      &lt;Suspense fallback={&lt;ChartSkeleton /&gt;}&gt;
        &lt;SlowChart /&gt; {/* Server-এ stream হবে */}
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-4",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Actions","Form","Mutation"],
    question: "Next.js Server Actions কী? Form handling এবং data mutation কীভাবে করবেন?",
    answer: `
      <p><strong>Server Actions</strong> হলো server-side functions যা সরাসরি client components থেকে call করা যায়। API route তৈরি না করেই server-এ mutation করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server Action — 'use server' directive
'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters' };
  }

  await db.post.create({ data: { title, content } });
  revalidatePath('/posts');
  redirect('/posts');
}

// Client Component — form with Server Action
'use client';
import { useFormStatus, useActionState } from 'react';
import { createPost } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return &lt;button type="submit" disabled={pending}&gt;{pending ? 'Saving...' : 'Save Post'}&lt;/button&gt;;
}

function CreatePostForm() {
  const [state, formAction] = useActionState(createPost, null);
  return (
    &lt;form action={formAction}&gt;
      &lt;input name="title" placeholder="Post title" /&gt;
      {state?.error && &lt;p className="error"&gt;{state.error}&lt;/p&gt;}
      &lt;textarea name="content" /&gt;
      &lt;SubmitButton /&gt;
    &lt;/form&gt;
  );
}
// Progressive Enhancement: form action works WITHOUT JavaScript!</code></pre>
      </div>
    `
  },
  {
    id: "next-5",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Middleware","Authentication","Edge"],
    question: "Next.js Middleware কী? Authentication, rate limiting এবং redirects কীভাবে implement করবেন?",
    answer: `
      <p><strong>Middleware</strong> রিকোয়েস্ট সার্ভারে পৌঁছানোর আগে Edge-এ চলে। Authentication check, redirects, headers modification, A/B testing ইত্যাদির জন্য ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// middleware.ts (project root-এ)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  
  // 1. Authentication check
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Role-based access
  if (pathname.startsWith('/admin')) {
    const role = request.cookies.get('user-role')?.value;
    if (role !== 'admin') return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // 3. Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Request-Id', crypto.randomUUID());
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

// কোন paths-এ middleware চলবে specify করুন
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};</code></pre>
      </div>
      <p><strong>⚠️ Limitation:</strong> Middleware Edge Runtime-এ চলে, তাই Node.js APIs (fs, DB drivers) ব্যবহার করা যায় না। শুধু lightweight operations রাখুন।</p>
    `
  },
  {
    id: "next-6",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Data Fetching","Caching","Revalidation"],
    question: "Next.js App Router-এ Data Fetching এবং Caching কীভাবে কাজ করে? Caching layers কী কী?",
    answer: `
      <p>Next.js-এর caching system বেশ কমপ্লেক্স। এখানে চারটি caching layer আছে।</p>
      <h4>Caching Layers:</h4>
      <ol>
        <li><strong>Request Memoization:</strong> একই render-এ duplicate fetch auto-deduplicate হয়।</li>
        <li><strong>Data Cache:</strong> Server-এ fetch results persist হয় (across requests)।</li>
        <li><strong>Full Route Cache:</strong> Static routes build time-এ cache হয়।</li>
        <li><strong>Router Cache:</strong> Client-side — visited routes browser-এ cache থাকে।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Default — cached forever (SSG behavior)
const data = await fetch('https://api.example.com/posts');

// No cache — fresh every request (SSR behavior)
const data = await fetch('https://api.example.com/posts', { cache: 'no-store' });

// Time-based revalidation (ISR behavior)
const data = await fetch('https://api.example.com/posts', {
  next: { revalidate: 3600 } // 1 hour
});

// Tag-based revalidation
const data = await fetch('https://api.example.com/posts', { next: { tags: ['posts'] } });
// Server Action-এ: revalidateTag('posts');

// Request Memoization — same fetch deduplicated
// Layout.tsx ও Page.tsx দুজনেই একই URL fetch করলে Next.js একটিমাত্র request পাঠায়!
async function Layout({ children }) {
  const user = await fetch('/api/user'); // ← একটি request
  return &lt;div&gt;{children}&lt;/div&gt;;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-7",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Layout","Template","Nested"],
    question: "Next.js-এ Layouts এবং Templates কীভাবে কাজ করে? Nested layouts-এর সুবিধা কী?",
    answer: `
      <p><strong>Layout</strong> হলো UI যা multiple pages-এ share হয় এবং navigation-এ re-render হয় না। <strong>Template</strong> প্রতি navigation-এ re-mount হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app/layout.tsx — Root Layout (required)
export default function RootLayout({ children }) {
  return (
    &lt;html lang="bn"&gt;
      &lt;body&gt;
        &lt;Navbar /&gt;
        &lt;main&gt;{children}&lt;/main&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}

// app/dashboard/layout.tsx — Nested Layout
// Navigation-এ state preserve থাকে!
export default function DashboardLayout({ children }) {
  return (
    &lt;div className="dashboard"&gt;
      &lt;Sidebar /&gt; {/* Re-render হবে না! */}
      &lt;div className="content"&gt;{children}&lt;/div&gt;
    &lt;/div&gt;
  );
}

// app/dashboard/template.tsx — Template (re-mount হয়)
// useEffect আবার চলবে, animations replay হবে
export default function DashboardTemplate({ children }) {
  useEffect(() => { logPageView(); }, []); // প্রতি navigation-এ চলবে
  return &lt;motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}&gt;{children}&lt;/motion.div&gt;;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-8",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Image","Font","Optimization"],
    question: "Next.js Image এবং Font Optimization কীভাবে কাজ করে? Performance-এ কী প্রভাব ফেলে?",
    answer: `
      <h4>next/image — Automatic Image Optimization:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import Image from 'next/image';
import heroImage from './hero.jpg';

function Hero() {
  return (
    &lt;Image
      src={heroImage}
      alt="Hero banner"
      placeholder="blur"     // Auto blur placeholder
      priority               // LCP image — preload করে
      sizes="(max-width: 768px) 100vw, 50vw"
    /&gt;
  );
}

// next.config.js — remote image domains
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};</code></pre>
      </div>
      <h4>next/font — Zero Layout Shift Fonts:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { Inter, Hind_Siliguri } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const hindSiliguri = Hind_Siliguri({ 
  subsets: ['bengali'],
  variable: '--font-bengali'
});

// Benefits:
// - Self-hosted — Google-এ request যায় না
// - Zero CLS — font swap-এ layout shift হয় না
// - Automatic subsetting</code></pre>
      </div>
    `
  },
  {
    id: "next-9",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["API Routes","Route Handlers","REST"],
    question: "Next.js Route Handlers (API Routes) কীভাবে লিখবেন? Request/Response handling best practices কী?",
    answer: `
      <p><strong>Route Handler</strong> হলো App Router-এর API এন্ডপয়েন্ট — <code>app/api/**/route.ts</code> ফাইলে HTTP মেথডের নামে ফাংশন এক্সপোর্ট করলেই সেটি এন্ডপয়েন্ট হয়ে যায় (<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>)।</p>
      <p>Pages Router-এর <code>req/res</code>-এর বদলে এখানে ওয়েব স্ট্যান্ডার্ড <code>Request</code> ও <code>Response</code> অবজেক্ট ব্যবহার হয়, তাই একই কোড Edge ও Node — দুই রানটাইমেই চলে।</p>
      <h4>মনে রাখার বিষয়</h4>
      <ul>
        <li><code>GET</code> হ্যান্ডলার ডিফল্টভাবে স্ট্যাটিক্যালি ক্যাশ হতে পারে; ডায়নামিক করতে <code>export const dynamic = 'force-dynamic'</code> দিন।</li>
        <li>ভ্যালিডেশন সবসময় সার্ভারে করুন (Zod ইত্যাদি) — ক্লায়েন্টের পাঠানো ডেটা কখনও বিশ্বাস করবেন না।</li>
        <li>এরর রেসপন্সে সঠিক HTTP স্ট্যাটাস দিন; ভেতরের এরর মেসেজ সরাসরি ফাঁস করবেন না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const users = await db.user.findMany({ skip: (page - 1) * 10, take: 10 });
  return NextResponse.json({ data: users });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;
    if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 });

    const user = await db.user.create({ data: { name, email } });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Email exists' }, { status: 409 });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// app/api/users/[id]/route.ts — Dynamic route
export async function GET(request, { params }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}</code></pre>
      </div>
    `
  },
  {
    id: "next-10",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Authentication","NextAuth","Session"],
    question: "Next.js-এ Authentication কীভাবে implement করবেন? NextAuth.js (Auth.js) এর architecture কী?",
    answer: `
      <p><strong>NextAuth.js (Auth.js v5)</strong> Next.js-এর জন্য সবচেয়ে জনপ্রিয় authentication solution।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// auth.ts
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';
export const { GET, POST } = handlers;

// Server Component-এ session check
import { auth } from '@/auth';
async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/login');
  return &lt;div&gt;Welcome {session.user.name}&lt;/div&gt;;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-11",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Dynamic Routes","Params","Catch-all"],
    question: "Next.js-এ Dynamic Routes কীভাবে কাজ করে? Catch-all এবং Optional Catch-all routes কী?",
    answer: `
      <p>Next.js ফোল্ডারের নাম দেখেই রুট তৈরি করে। ডায়নামিক অংশের জন্য তিনটি সিনট্যাক্স আছে:</p>
      <ul>
        <li><strong><code>[id]</code> — Dynamic Segment:</strong> ঠিক একটি সেগমেন্ট মেলায়। <code>/blog/hello</code> → <code>params.id = 'hello'</code>।</li>
        <li><strong><code>[...slug]</code> — Catch-all:</strong> এক বা একাধিক সেগমেন্ট মেলায় (অ্যারে হিসেবে)। <code>/docs/a/b</code> → <code>['a','b']</code>। কিন্তু <code>/docs</code> মেলাবে না।</li>
        <li><strong><code>[[...slug]]</code> — Optional Catch-all:</strong> উপরেরটির মতোই, তবে <em>শূন্য</em> সেগমেন্টও মেলায় — অর্থাৎ <code>/docs</code>-ও ধরবে।</li>
      </ul>
      <p><code>generateStaticParams()</code> দিয়ে বিল্ড টাইমে কোন কোন পাথ প্রি-রেন্ডার হবে তা জানানো যায় — এটি SSG-র মূল চাবি।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Single dynamic segment
app/blog/[slug]/page.tsx     →  /blog/my-post     → params = { slug: 'my-post' }

// 2. Multiple dynamic segments
app/shop/[category]/[id]/page.tsx  →  /shop/shoes/123  → { category: 'shoes', id: '123' }

// 3. Catch-all segments (required)
app/docs/[...slug]/page.tsx  →  /docs/a/b/c  → { slug: ['a', 'b', 'c'] }
                             →  /docs         → 404!

// 4. Optional catch-all segments
app/docs/[[...slug]]/page.tsx →  /docs/a/b    → { slug: ['a', 'b'] }
                              →  /docs         → { slug: undefined } ✅</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return &lt;article&gt;&lt;h1&gt;{post.title}&lt;/h1&gt;&lt;/article&gt;;
}

// Static params for SSG (generateStaticParams)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// Metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.title, description: post.excerpt };
}</code></pre>
      </div>
    `
  },
  {
    id: "next-12",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Error Handling","Loading","Not Found"],
    question: "Next.js-এ Error Handling, Loading States এবং Not Found pages কীভাবে manage করবেন?",
    answer: `
      <p>App Router-এ special files দিয়ে error, loading, এবং 404 states handle করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app/dashboard/loading.tsx — Automatic loading state
export default function DashboardLoading() {
  return &lt;div className="skeleton-grid"&gt;&lt;div className="skeleton-card" /&gt;&lt;/div&gt;;
}

// app/dashboard/error.tsx — Error boundary
'use client'; // Error components must be Client Components!

export default function DashboardError({ error, reset }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    &lt;div&gt;
      &lt;h2&gt;কিছু ভুল হয়েছে!&lt;/h2&gt;
      &lt;button onClick={reset}&gt;আবার চেষ্টা করুন&lt;/button&gt;
    &lt;/div&gt;
  );
}

// app/dashboard/not-found.tsx — 404 page
export default function NotFound() {
  return &lt;h2&gt;পৃষ্ঠা পাওয়া যায়নি&lt;/h2&gt;;
}

// Programmatic 404
import { notFound } from 'next/navigation';
async function UserPage({ params }) {
  const user = await getUser(params.id);
  if (!user) notFound(); // not-found.tsx render হবে
  return &lt;UserProfile user={user} /&gt;;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-13",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Metadata","SEO","OpenGraph"],
    question: "Next.js-ে SEO optimization এবং Metadata কীভাবে manage করবেন?",
    answer: `
      <p>App Router-এ SEO মেটাডেটা দুইভাবে দেওয়া যায়: স্ট্যাটিক <code>metadata</code> অবজেক্ট এক্সপোর্ট করে, অথবা ডায়নামিক ডেটার জন্য <code>generateMetadata()</code> ফাংশন দিয়ে।</p>
      <p>Next.js এই মেটাডেটা সার্ভারেই <code>&lt;head&gt;</code>-এ বসিয়ে দেয়, তাই ক্রলার ও সোশ্যাল মিডিয়ার প্রিভিউ বট সঠিক টাইটেল/ছবি পায় — ক্লায়েন্ট-সাইড JavaScript চালানোর অপেক্ষা করতে হয় না।</p>
      <h4>গুরুত্বপূর্ণ</h4>
      <ul>
        <li><code>generateMetadata</code>-এর ভেতরের <code>fetch</code> পেজের fetch-এর সাথে <strong>ডিডুপ্লিকেট</strong> হয় — একই ডেটা দুবার আনা হয় না।</li>
        <li><code>metadataBase</code> সেট করুন, নাহলে OG ছবির আপেক্ষিক URL ভাঙবে।</li>
        <li>প্রতিটি পেজে ইউনিক <code>title</code> ও <code>description</code> দিন; layout-এ <code>title.template</code> ব্যবহার করলে ধারাবাহিকতা বজায় থাকে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Static Metadata — app/layout.tsx
export const metadata = {
  title: { template: '%s | My App', default: 'My App' },
  description: 'Best app ever',
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
};

// Dynamic Metadata — app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, images: [post.coverImage] },
  };
}

// Sitemap — app/sitemap.ts
export default async function sitemap() {
  const posts = await getAllPosts();
  return [
    { url: 'https://myapp.com', lastModified: new Date() },
    ...posts.map(post => ({ url: \`https://myapp.com/blog/\${post.slug}\`, lastModified: post.updatedAt })),
  ];
}</code></pre>
      </div>
    `
  },
  {
    id: "next-14",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Deployment","Vercel","Docker","Standalone"],
    question: "Next.js app কীভাবে deploy করবেন? Vercel vs Self-hosted (Docker) — কোনটি কখন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>dockerfile</span><button class="copy-btn">Copy</button></div>
        <pre><code># Dockerfile — Multi-stage optimized build
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system nodejs && adduser --system nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// next.config.js — standalone output for Docker
module.exports = { output: 'standalone' };

// Static Export (no server needed)
// module.exports = { output: 'export' };</code></pre>
      </div>
      <p><strong>Vercel:</strong> দ্রুত deploy, Edge, analytics, preview deploys-এর জন্য সেরা। <strong>Docker:</strong> Self-hosted, enterprise, যেকোনো ক্লাউডে ফুল কন্ট্রোলের জন্য সেরা।</p>
    `
  },
  {
    id: "next-15",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Parallel Routes","Intercepting Routes","Modal"],
    question: "Next.js Parallel Routes এবং Intercepting Routes কী? Modal pattern কীভাবে implement করবেন?",
    answer: `
      <p>এগুলো Next.js-ের advanced routing features যা complex UI patterns (modals, split views) সমাধান করে।</p>
      <h4>Parallel Routes (@slot):</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একই layout-ে একাধিক page simultaneously render
app/
├── layout.tsx
├── @analytics/
│   └── page.tsx        // Analytics panel
├── @team/
│   └── page.tsx        // Team members panel
└── page.tsx            // Main content

// layout.tsx
export default function Layout({ children, analytics, team }) {
  return (
    &lt;div className="dashboard-grid"&gt;
      &lt;main&gt;{children}&lt;/main&gt;
      &lt;aside&gt;{analytics}&lt;/aside&gt;
      &lt;aside&gt;{team}&lt;/aside&gt;
    &lt;/div&gt;
  );
}</code></pre>
      </div>
      <h4>Intercepting Routes (.) — Modal Pattern:</h4>
      <p>Instagram-style: click photo → modal, direct URL → full page। <code>(.)</code> দিয়ে সেম লেভেল ইন্টারসেপ্ট করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>app/
├── @modal/
│   └── (.)photos/[id]/   // Intercepts /photos/[id]
│       └── page.tsx       // Modal version
├── photos/
│   └── [id]/
│       └── page.tsx       // Full page version (direct URL access)</code></pre>
      </div>
    `
  },
  {
    id: "next-16",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Environment Variables","Config","Security"],
    question: "Next.js-এ Environment Variables কীভাবে কাজ করে? NEXT_PUBLIC_ prefix কেন দরকার?",
    answer: `
      <h4>Environment Variable Rules:</h4>
      <ul>
        <li><code>NEXT_PUBLIC_*</code> — Client-side-এ accessible (browser bundle-এ থাকে)।</li>
        <li>Without prefix — শুধুমাত্র server-side-এ accessible (API routes, Server Components)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># .env.local (git-ignored!)
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
JWT_SECRET="super-secret-key"

# Client-side accessible
NEXT_PUBLIC_API_URL="https://api.myapp.com"</code></pre>
      </div>
      <p><strong>⚠️ Security Warning:</strong> <code>NEXT_PUBLIC_</code> variables ব্রাউজারে visible! কখনও secrets এই প্রিফিক্স দিয়ে expose করবেন না।</p>
    `
  },
  {
    id: "next-17",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Internationalization","i18n","Routing"],
    question: "Next.js App Router-ে Internationalization (i18n) কীভাবে implement করবেন?",
    answer: `
      <p>App Router-ে built-in i18n routing নেই। Manual middleware-based approach নিতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// middleware.ts — Locale detection & redirect
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['bn', 'en'];

function getLocale(request) {
  const negotiator = new Negotiator({ headers: Object.fromEntries(request.headers) });
  return match(negotiator.languages(), locales, 'bn');
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`);
  if (hasLocale) return;
  
  const locale = getLocale(request);
  request.nextUrl.pathname = \`/\${locale}\${pathname}\`;
  return Response.redirect(request.nextUrl);
}

// Dictionary loader
const dictionaries = {
  en: () => import('./dictionaries/en.json').then(m => m.default),
  bn: () => import('./dictionaries/bn.json').then(m => m.default),
};
export const getDictionary = async (locale) => dictionaries[locale]();</code></pre>
      </div>
    `
  },
  {
    id: "next-18",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Link","Navigation","useRouter"],
    question: "Next.js-ে Navigation কীভাবে করবেন? Link, useRouter, redirect — কখন কোনটি?",
    answer: `
      <p>Next.js-এ নেভিগেশনের তিনটি উপায় আছে, এবং কোনটি কখন ব্যবহার করবেন তা পরিষ্কার:</p>
      <ul>
        <li><strong><code>&lt;Link&gt;</code>:</strong> ডিফল্ট পছন্দ। এটি ক্লায়েন্ট-সাইড নেভিগেশন করে এবং ভিউপোর্টে এলে রুট <strong>প্রিফেচ</strong> করে রাখে, তাই ক্লিক করলে প্রায় তাৎক্ষণিক লোড হয়। আসল <code>&lt;a&gt;</code> ট্যাগ রেন্ডার করে বলে SEO ও মিডল-ক্লিক ঠিক থাকে।</li>
        <li><strong><code>useRouter()</code>:</strong> শুধু ইভেন্টের প্রতিক্রিয়ায় প্রোগ্রাম্যাটিক নেভিগেশনে (ফর্ম সাবমিটের পর <code>router.push()</code>)। মনে রাখবেন — App Router-এ এটি <code>next/navigation</code> থেকে আসে, <code>next/router</code> থেকে নয়।</li>
        <li><strong><code>redirect()</code>:</strong> সার্ভার কম্পোনেন্ট বা Server Action-এ ব্যবহার হয়, যেমন অনুমতি না থাকলে সরিয়ে দেওয়া। এটি ভেতরে একটি এরর থ্রো করে, তাই <code>try/catch</code>-এর ভেতরে রাখবেন না — নাহলে রিডাইরেক্ট গিলে ফেলবে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { redirect } from 'next/navigation';

// 1. Link — Declarative navigation (preferred)
&lt;Link href="/about" prefetch={true}&gt;About&lt;/Link&gt;

// 2. useRouter — Programmatic navigation (Client Component)
'use client';
function LoginForm() {
  const router = useRouter();
  const handleLogin = async () => {
    await login(credentials);
    router.push('/dashboard');   // Navigate
    router.replace('/dashboard'); // Replace (no back)
    router.refresh();            // Refresh current route (re-fetch server data)
  };
}

// 3. redirect() — Server Component / Server Action
async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/login'); // Server-side redirect
  return &lt;Profile /&gt;;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-19",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Database","Prisma","ORM"],
    question: "Next.js-ে Database connection কীভাবে manage করবেন? Prisma ORM best practices কী?",
    answer: `
      <p>Next.js serverless environment-এ চলে, তাই database connection pooling গুরুত্বপূর্ণ।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// lib/db.ts — Prisma singleton (serverless-safe)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
// Why singleton?
// Development-ে hot reload-ে নতুন PrismaClient তৈরি হয়। globalThis-ে রাখলে connection reuse হয়।</code></pre>
      </div>
    `
  },
  {
    id: "next-20",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Performance","Bundle","Analytics"],
    question: "Next.js app-ের performance কীভাবে measure এবং optimize করবেন?",
    answer: `
      <h4>Optimization Techniques:</h4>
      <ul>
        <li><strong>Dynamic imports:</strong> <code>const Heavy = dynamic(() => import('./Heavy'), { ssr: false })</code></li>
        <li><strong>Image optimization:</strong> next/image সবসময় ব্যবহার করুন</li>
        <li><strong>Font optimization:</strong> next/font — zero CLS</li>
        <li><strong>Prefetching:</strong> Link component automatically prefetch করে</li>
        <li><strong>Server Components:</strong> Client JS কমায়, zero bundle impact</li>
        <li><strong>Parallel Data Fetching:</strong> <code>Promise.all([fetch1(), fetch2()])</code></li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Built-in Web Vitals reporting
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'LCP': console.log('LCP:', metric.value); break;
    case 'CLS': console.log('CLS:', metric.value); break;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "next-21",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Testing","Jest","Playwright","E2E"],
    question: "Next.js app কীভাবে test করবেন? Unit, Integration এবং E2E testing setup কী?",
    answer: `
      <p>Next.js অ্যাপে তিন স্তরে টেস্ট করা হয়, এবং প্রতিটির খরচ ও উপযোগিতা আলাদা:</p>
      <ul>
        <li><strong>Unit (Jest/Vitest):</strong> বিশুদ্ধ ফাংশন, ইউটিলিটি, হুক। দ্রুত ও সস্তা — সবচেয়ে বেশি সংখ্যায় থাকবে।</li>
        <li><strong>Integration (React Testing Library):</strong> কম্পোনেন্ট আচরণ ইউজারের দৃষ্টিকোণ থেকে। ইমপ্লিমেন্টেশন নয়, আচরণ পরীক্ষা করুন।</li>
        <li><strong>E2E (Playwright/Cypress):</strong> আসল ব্রাউজারে সম্পূর্ণ ফ্লো — লগইন, চেকআউট। ধীর ও ভঙ্গুর, তাই শুধু গুরুত্বপূর্ণ পথে।</li>
      </ul>
      <p><strong>সতর্কতা:</strong> <code>async</code> Server Component সরাসরি RTL দিয়ে টেস্ট করা এখনও সীমিত। বাস্তবে সেগুলোর ডেটা-ফেচিং লজিক আলাদা ফাংশনে সরিয়ে সেটিকে unit-test করুন, আর রেন্ডারিং E2E দিয়ে যাচাই করুন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// jest.config.js — Next.js setup
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });
module.exports = createJestConfig({ testEnvironment: 'jsdom' });

// E2E with Playwright
// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: { command: 'npm run dev', url: 'http://localhost:3000' },
});

// e2e/home.spec.ts
import { test, expect } from '@playwright/test';
test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
});</code></pre>
      </div>
    `
  },
  {
    id: "next-22",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Styling","CSS Modules","Tailwind","Global CSS"],
    question: "Next.js-ে Styling options কী কী? CSS Modules vs Tailwind — কোনটি recommended?",
    answer: `
      <p>Next.js একাধিক স্টাইলিং পদ্ধতিকে বিল্ট-ইন সাপোর্ট দেয় — কোনো একক "সঠিক" উত্তর নেই, তবে প্রজেক্টের প্রকৃতির উপর ভিত্তি করে একটি স্পষ্ট সুপারিশ দেওয়া যায়।</p>
      <h4>উপলব্ধ অপশন</h4>
      <table>
        <tr><th>পদ্ধতি</th><th>Server Component সাপোর্ট</th><th>বৈশিষ্ট্য</th></tr>
        <tr><td><strong>CSS Modules</strong></td><td>✅ পূর্ণ</td><td>বিল্ট-ইন, জিরো কনফিগ, স্কোপড ক্লাসনাম</td></tr>
        <tr><td><strong>Tailwind CSS</strong></td><td>✅ পূর্ণ</td><td>utility-first, বিল্ড টাইমে purge, অফিসিয়ালি সুপারিশকৃত</td></tr>
        <tr><td><strong>Styled Components / Emotion</strong></td><td>⚠️ আংশিক, অতিরিক্ত কনফিগ প্রয়োজন</td><td>runtime CSS-in-JS, Server Component-এর সাথে ঘর্ষণ</td></tr>
        <tr><td><strong>Sass</strong></td><td>✅ পূর্ণ</td><td>বিল্ট-ইন সাপোর্ট, CSS Modules-এর সাথেও কম্বাইন করা যায়</td></tr>
      </table>
      <h4>CSS Modules — App Router-এ ডিফল্ট পছন্দ</h4>
      <div class="code-box">
        <div class="code-header"><span>tsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Button.module.css
.button { padding: 8px 16px; border-radius: 4px; }

// Button.tsx — Server Component-এও ঝামেলাহীনভাবে কাজ করে
import styles from './Button.module.css';
export default function Button() {
  return <button className={styles.button}>জমা দিন</button>;
}</code></pre>
      </div>
      <h4>Tailwind CSS — কেন Next.js-এর সাথে বিশেষভাবে ভালো মানায়</h4>
      <div class="code-box">
        <div class="code-header"><span>tsx</span><button class="copy-btn">Copy</button></div>
        <pre><code>export default function Button() {
  return <button className="px-4 py-2 rounded bg-indigo-500 text-white">জমা দিন</button>;
}
// create-next-app -e ফ্ল্যাগে Tailwind ডিফল্টভাবে অফার করা হয়</code></pre>
      </div>
      <p>Tailwind সম্পূর্ণভাবে বিল্ড-টাইম টুল — কোনো runtime JavaScript ওভারহেড নেই, তাই Server Component-এর সাথে ঘর্ষণহীনভাবে কাজ করে। এই কারণে Next.js টিম Tailwind-কে ডিফল্ট স্টার্টার অপশন হিসেবে অফার করে।</p>
      <h4>কেন Styled Components-এর মতো Runtime CSS-in-JS-এ সমস্যা হয়</h4>
      <p>App Router-এ Server Component ব্রাউজারে কোনো JavaScript পাঠায় না — সরাসরি HTML রেন্ডার হয়। কিন্তু Styled Components-এর মতো লাইব্রেরি রানটাইমে (ব্রাউজারে) CSS তৈরি করে <code>&lt;style&gt;</code> ট্যাগ ইনজেক্ট করে — এই প্রক্রিয়া <code>useContext</code>/client-side JavaScript-এর উপর নির্ভরশীল, যা Server Component-এ পাওয়া যায় না। ফলে Styled Components ব্যবহার করতে হলে সংশ্লিষ্ট কম্পোনেন্টকে <code>'use client'</code> দিয়ে Client Component বানাতে হয় — যা Server Component-এর পারফরম্যান্স সুবিধা হারায়।</p>
      <h4>ব্যবহারিক সুপারিশ</h4>
      <ul>
        <li><strong>নতুন প্রজেক্ট, App Router:</strong> Tailwind CSS — Server Component-বান্ধব, দ্রুত ডেভেলপমেন্ট, কোনো runtime খরচ নেই।</li>
        <li><strong>টিম CSS Module-এর সিনট্যাক্স পছন্দ করে:</strong> CSS Modules — একই সুবিধা (zero-runtime, Server Component সাপোর্ট), শুধু utility class নয়, ঐতিহ্যবাহী CSS।</li>
        <li><strong>জটিল ডায়নামিক থিমিং প্রয়োজন এবং Client Component-এই থাকবে:</strong> Styled Components গ্রহণযোগ্য, কিন্তু সচেতনভাবে সেই কম্পোনেন্টগুলোকে Client Component হিসেবে চিহ্নিত করুন।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>vanilla-extract-এর মতো zero-runtime CSS-in-JS Server Component-এর সাথে কীভাবে কাজ করে?</li>
        <li>Tailwind-এর JIT (Just-In-Time) কম্পাইলার কীভাবে কাজ করে বিল্ড টাইমে?</li>
      </ul>
    `
  },
  {
    id: "next-23",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Edge Runtime","Serverless","Node"],
    question: "Next.js Edge Runtime vs Node.js Runtime — পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <p>Next.js দুটি ভিন্ন রানটাইম-এ কোড এক্সিকিউট করতে পারে — <strong>Node.js Runtime</strong> (পূর্ণাঙ্গ Node.js এনভায়রনমেন্ট) এবং <strong>Edge Runtime</strong> (একটি সীমিত, V8-ভিত্তিক লাইটওয়েট রানটাইম যা CDN-এর কাছাকাছি চলে) — এই দুইয়ের মধ্যে সিদ্ধান্ত পারফরম্যান্স ও ক্ষমতার মধ্যে একটি ট্রেড-অফ।</p>
      <h4>মূল পার্থক্য</h4>
      <table>
        <tr><th></th><th>Node.js Runtime</th><th>Edge Runtime</th></tr>
        <tr><td><strong>এক্সিকিউশন লোকেশন</strong></td><td>একটি নির্দিষ্ট সার্ভার/রিজিয়ন</td><td>ব্যবহারকারীর কাছাকাছি CDN edge location</td></tr>
        <tr><td><strong>কোল্ড স্টার্ট</strong></td><td>ধীর (পুরো Node.js প্রসেস স্পিন আপ)</td><td>প্রায় তাৎক্ষণিক (হালকা V8 isolate)</td></tr>
        <tr><td><strong>Node.js API</strong></td><td>সম্পূর্ণ (fs, net, crypto সম্পূর্ণ)</td><td>সীমিত (fs নেই, কিছু API-এর ওয়েব-স্ট্যান্ডার্ড ভার্সন)</td></tr>
        <tr><td><strong>মেমরি/টাইমআউট সীমা</strong></td><td>বড়, নমনীয়</td><td>ছোট, কঠোর সীমা (সাধারণত কয়েক MB, কয়েক সেকেন্ড)</td></tr>
        <tr><td><strong>Database ড্রাইভার</strong></td><td>সব সমর্থিত (pg, mongoose ইত্যাদি)</td><td>সীমিত — HTTP-ভিত্তিক ড্রাইভার প্রয়োজন (Neon, PlanetScale HTTP API)</td></tr>
      </table>
      <h4>কেন Edge Runtime দ্রুত — ভেতরের কারণ</h4>
      <p>Edge Runtime সম্পূর্ণ Node.js প্রসেস চালু করে না — এটি <strong>V8 isolate</strong> ব্যবহার করে (Cloudflare Workers-এর মতো একই ধারণা), যা মিলিসেকেন্ডে চালু হতে পারে কারণ এটি একটি পূর্ণাঙ্গ প্রসেস নয়, শুধু একটি লাইটওয়েট স্যান্ডবক্স। এবং যেহেতু এটি বিশ্বজুড়ে বহু CDN লোকেশনে ডিপ্লয় হয়, ব্যবহারকারীর <strong>ভৌগোলিকভাবে নিকটতম</strong> সার্ভার থেকে রেসপন্স আসে — নেটওয়ার্ক ল্যাটেন্সি কমে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>typescript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// middleware.ts — সবসময় Edge Runtime-এ চলে (বাধ্যতামূলক)
export function middleware(request: NextRequest) {
  const country = request.geo?.country;   // দ্রুত, geolocation-ভিত্তিক redirect
  if (country === 'BD') return NextResponse.redirect(new URL('/bn', request.url));
}

// একটি নির্দিষ্ট Route Handler-কে Edge Runtime-এ চালানো
export const runtime = 'edge';

export async function GET(request: Request) {
  // ⚠️ এখানে Node.js-নির্দিষ্ট API (fs, path, বেশিরভাগ npm প্যাকেজ) ব্যবহার করা যাবে না
  const data = await fetch('https://api.example.com/data');
  return Response.json(await data.json());
}</code></pre>
      </div>
      <h4>কখন Edge Runtime ব্যবহার করবেন</h4>
      <ul>
        <li><strong>Middleware:</strong> Authentication চেক, A/B টেস্টিং, geolocation redirect — প্রতিটি রিকোয়েস্টে চলে, তাই দ্রুত হওয়া জরুরি।</li>
        <li><strong>সরল, দ্রুত API রুট:</strong> যেগুলো Node.js-নির্দিষ্ট প্যাকেজের উপর নির্ভর করে না (যেমন সাধারণ প্রক্সি, header ম্যানিপুলেশন)।</li>
        <li><strong>বৈশ্বিকভাবে ছড়ানো ব্যবহারকারীর জন্য ল্যাটেন্সি-সংবেদনশীল ফিচার।</strong></li>
      </ul>
      <h4>কখন Node.js Runtime বাধ্যতামূলক</h4>
      <ul>
        <li><strong>ডাটাবেজ ড্রাইভার</strong> যা raw TCP সংযোগ ব্যবহার করে (যেমন <code>pg</code>, <code>mysql2</code>) — Edge Runtime raw TCP সাপোর্ট করে না।</li>
        <li><strong>ফাইল সিস্টেম অ্যাক্সেস</strong> (<code>fs</code> মডিউল) — Edge-এ সম্পূর্ণ অনুপস্থিত।</li>
        <li><strong>ভারী npm প্যাকেজ</strong> যা Node.js-নির্দিষ্ট বাইনারি বা native addon ব্যবহার করে (image processing লাইব্রেরি, বেশিরভাগ ORM)।</li>
        <li><strong>দীর্ঘ-চলমান প্রসেস</strong> যা Edge Runtime-এর কঠোর সময়/মেমরি সীমার বাইরে যায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Edge Runtime-এ ডাটাবেজে কানেক্ট করতে হলে কী পদ্ধতি ব্যবহার করবেন (HTTP-ভিত্তিক ড্রাইভার)?</li>
        <li>Middleware কেন সবসময় Edge Runtime-এ চলতে বাধ্য — Node.js Runtime middleware-এ কেন সমর্থিত নয়?</li>
      </ul>
    `
  },
  {
    id: "next-24",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Static Export","SPA","Output"],
    question: "Next.js Static Export কী? কখন ব্যবহার করবেন এবং কী limitation আছে?",
    answer: `
      <p><strong>Static Export</strong> পুরো Next.js app-কে static HTML/CSS/JS-ে রূপান্তর করে। কোনো Node.js server দরকার হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true }, // Static export-ে image optimization নেই
};</code></pre>
      </div>
      <h4>❌ কাজ করবে না:</h4>
      <ul>
        <li>Server-side rendering (per-request)</li>
        <li>API Routes / Route Handlers</li>
        <li>Middleware</li>
        <li>Incremental Static Regeneration (ISR)</li>
        <li>Dynamic routes without generateStaticParams</li>
      </ul>
    `
  },
  {
    id: "next-25",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Caching","unstable_cache","Tags"],
    question: "Next.js-ের Caching মেকানিজম গভীরভাবে ব্যাখ্যা করুন। Cache invalidation strategies কী কী?",
    answer: `
      <p>App Router-এ চারটি আলাদা ক্যাশিং স্তর আছে — বেশিরভাগ বিভ্রান্তি হয় কারণ ডেভেলপাররা এগুলোকে একটি জিনিস ভাবেন:</p>
      <ol>
        <li><strong>Request Memoization:</strong> একই রেন্ডার পাসে একই <code>fetch</code> একাধিকবার কল করলে একবারই যায়। শুধু একটি রিকোয়েস্টের জীবনকালের জন্য।</li>
        <li><strong>Data Cache:</strong> <code>fetch</code>-এর ফল সার্ভারে রিকোয়েস্ট ও ডিপ্লয়ের মধ্যেও টিকে থাকে। <code>revalidate</code> দিয়ে নিয়ন্ত্রিত।</li>
        <li><strong>Full Route Cache:</strong> বিল্ড টাইমে রেন্ডার করা HTML ও RSC পেলোড।</li>
        <li><strong>Router Cache:</strong> ব্রাউজারে ক্লায়েন্ট-সাইড ক্যাশ, যাতে back/forward তাৎক্ষণিক হয়।</li>
      </ol>
      <h4>Invalidation</h4>
      <ul>
        <li><code>revalidatePath('/blog')</code> — নির্দিষ্ট রুটের ক্যাশ বাতিল।</li>
        <li><code>revalidateTag('posts')</code> — ট্যাগযুক্ত সব fetch একসাথে বাতিল (সবচেয়ে নমনীয়)।</li>
        <li><code>cache: 'no-store'</code> — একদম ক্যাশ না করা (ডায়নামিক ডেটা)।</li>
      </ul>
      <p><strong>মনে রাখবেন:</strong> Next.js 15 থেকে <code>fetch</code> ডিফল্টে আর ক্যাশ হয় না (<code>no-store</code> ডিফল্ট) — ১৪ থেকে আপগ্রেড করলে এটি বড় আচরণগত পরিবর্তন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. fetch() caching
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600, tags: ['posts'] }
});

// 2. unstable_cache — DB queries cache
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (userId) => { return await prisma.user.findUnique({ where: { id: userId } }); },
  ['user-by-id'],
  { tags: ['users'], revalidate: 3600 }
);

// 3. Cache invalidation
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updatePost(id, data) {
  await prisma.post.update({ where: { id }, data });
  revalidateTag('posts');        // Tag-based
  revalidatePath('/blog');       // Path-based
}

// 4. Route Segment Config
export const revalidate = 3600;     // Page-level revalidation
export const dynamic = 'force-dynamic'; // Force SSR</code></pre>
      </div>
    `
  },
  {
    id: "next-26",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Multi-zone","Micro-frontend","Architecture"],
    question: "Next.js Multi-zone Architecture কী? বড় organization-ে কীভাবে ব্যবহার করবেন?",
    answer: `
      <p><strong>Multi-zone</strong> হলো একাধিক Next.js app-কে একটি domain-ে serve করার পদ্ধতি। প্রতিটি zone আলাদাভাবে develop ও deploy হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Main app — next.config.js
module.exports = {
  async rewrites() {
    return [
      { source: '/blog/:path*', destination: 'https://blog.internal.myapp.com/blog/:path*' },
      { source: '/docs/:path*', destination: 'https://docs.internal.myapp.com/docs/:path*' },
    ];
  },
};

// Blog app — next.config.js
module.exports = { basePath: '/blog' };</code></pre>
      </div>
      <h4>কখন Multi-zone ব্যবহার করবেন:</h4>
      <ul><li>৫০+ developer, একাধিক টিম</li><li>আলাদা deploy cycle দরকার</li><li>Monorepo-র চেয়ে আরও বেশি isolation দরকার</li></ul>
    `
  },
  {
    id: "next-27",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["File Upload","Server Action","FormData"],
    question: "Next.js-ে File Upload কীভাবে implement করবেন?",
    answer: `
      <p>Next.js-এ ফাইল আপলোডের দুটি পথ আছে, এবং প্রোডাকশনে পছন্দটি গুরুত্বপূর্ণ:</p>
      <ul>
        <li><strong>সার্ভারের মধ্য দিয়ে:</strong> ফাইল Route Handler/Server Action-এ যায়, তারপর স্টোরেজে। সহজ, কিন্তু সার্ভারের মেমরি ও ব্যান্ডউইথ খরচ হয়। Vercel-এ সার্ভারলেস বডি সাইজের সীমাও (৪.৫MB) আছে।</li>
        <li><strong>Presigned URL (প্রস্তাবিত):</strong> সার্ভার শুধু একটি স্বল্পমেয়াদি আপলোড URL তৈরি করে দেয়; ব্রাউজার ফাইলটি <strong>সরাসরি</strong> S3/R2-তে পাঠায়। বড় ফাইলেও সার্ভারে কোনো চাপ পড়ে না।</li>
      </ul>
      <h4>নিরাপত্তা</h4>
      <ul>
        <li>MIME টাইপ ও সাইজ <strong>সার্ভারে</strong> যাচাই করুন — ক্লায়েন্টের <code>accept</code> অ্যাট্রিবিউট কেবল UX।</li>
        <li>ফাইলের নাম কখনও সরাসরি ব্যবহার করবেন না (path traversal ঝুঁকি) — নতুন UUID নাম দিন।</li>
        <li>আপলোড করা ফাইল অ্যাপের ডোমেইন থেকে সার্ভ করলে stored-XSS হতে পারে; আলাদা ডোমেইন বা <code>Content-Disposition: attachment</code> ব্যবহার করুন।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server Action for file upload
'use server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function uploadFile(formData) {
  const file = formData.get('file');
  if (!file) return { error: 'No file uploaded' };

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) return { error: 'File too large' };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = \`\${Date.now()}-\${file.name}\`;
  const filepath = path.join(process.cwd(), 'public/uploads', filename);
  
  await writeFile(filepath, buffer);
  return { success: true, url: \`/uploads/\${filename}\` };
}</code></pre>
      </div>
    `
  },
  {
    id: "next-28",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Rate Limiting","Security","Headers"],
    question: "Next.js API-তে Rate Limiting, CORS, এবং Security Headers কীভাবে configure করবেন?",
    answer: `
      <p>Next.js-এ API সুরক্ষার তিনটি স্তর সাধারণত একসাথে লাগে:</p>
      <ul>
        <li><strong>Security Headers:</strong> <code>next.config.js</code>-এর <code>headers()</code> দিয়ে সব রুটে একবারে প্রয়োগ করুন — HSTS, X-Frame-Options, X-Content-Type-Options, CSP। CSP প্রথমে <code>Report-Only</code> মোডে চালিয়ে দেখুন কী ভাঙে।</li>
        <li><strong>CORS:</strong> শুধু আপনার নিজের ফ্রন্টএন্ড API কল করলে CORS হেডারের দরকারই নেই (same-origin)। থার্ড-পার্টি ক্লায়েন্ট থাকলে নির্দিষ্ট origin-এর তালিকা দিন, <code>*</code> নয়।</li>
        <li><strong>Rate Limiting:</strong> সার্ভারলেস পরিবেশে ইন-মেমোরি কাউন্টার কাজ করে না, কারণ প্রতিটি ইনভোকেশন আলাদা ইনস্ট্যান্স হতে পারে। তাই Redis (Upstash ইত্যাদি) দিয়ে শেয়ার্ড কাউন্টার রাখতে হবে।</li>
      </ul>
      <p><strong>Middleware-এর সীমা:</strong> <code>middleware.ts</code> Edge রানটাইমে চলে — Node.js API বা ভারী লাইব্রেরি সেখানে পাবেন না। ভারী যাচাই Route Handler-এ করুন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// next.config.js — Security Headers
module.exports = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Content-Security-Policy', value: "default-src 'self'" },
      ],
    }];
  },
};

// Rate Limiting with Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
}</code></pre>
      </div>
    `
  },
  {
    id: "next-29",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Loading","Streaming","Suspense"],
    question: "Next.js-ে Loading UI এবং Streaming কীভাবে কাজ করে? User experience কীভাবে উন্নত করে?",
    answer: `
      <p>Streaming দিয়ে page-ের দ্রুত parts আগে দেখানো যায়, ধীর parts পরে load হলে replace হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Manual Streaming with Suspense
async function DashboardPage() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Dashboard&lt;/h1&gt;
      &lt;UserGreeting /&gt; {/* দ্রুত data — আগে দেখাবে */}
      
      &lt;Suspense fallback={&lt;ChartSkeleton /&gt;}&gt;
        &lt;SlowAnalyticsChart /&gt; {/* 2s API call */}
      &lt;/Suspense&gt;
      
      &lt;Suspense fallback={&lt;TableSkeleton /&gt;}&gt;
        &lt;SlowDataTable /&gt; {/* 3s API call */}
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-30",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Monorepo","Turborepo","Shared"],
    question: "Next.js প্রজেক্টে Turborepo Monorepo কীভাবে সেটআপ করবেন?",
    answer: `
      <p><strong>Turborepo</strong> একাধিক অ্যাপ ও শেয়ার্ড প্যাকেজকে একটি রিপোজিটরিতে রাখতে সাহায্য করে, এবং সবচেয়ে বড় সুবিধা হলো এর <strong>ক্যাশিং</strong>: যে প্যাকেজে কোনো পরিবর্তন হয়নি, তার build/test আবার চালানো হয় না।</p>
      <ul>
        <li><strong>apps/</strong> — ডিপ্লয়যোগ্য অ্যাপ (web, admin, docs)।</li>
        <li><strong>packages/</strong> — শেয়ার্ড কোড (ui, config, types, api-client)।</li>
        <li><strong>Remote cache:</strong> CI ও টিমের সবার মধ্যে বিল্ড ক্যাশ শেয়ার হয় — বড় টিমে বিল্ড টাইম নাটকীয়ভাবে কমে।</li>
      </ul>
      <p><code>turbo.json</code>-এ <code>dependsOn: ["^build"]</code> লিখলে Turborepo নিজেই নির্ভরতার ক্রম বুঝে আগে প্যাকেজ, পরে অ্যাপ বিল্ড করে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>my-turborepo/
├── apps/
│   ├── web/               # Next.js main app
│   ├── admin/             # Next.js admin panel
│   └── docs/              # Next.js docs site
├── packages/
│   ├── ui/                # Shared React components
│   ├── database/          # Prisma client
│   └── utils/             # Shared utilities
├── turbo.json
└── pnpm-workspace.yaml</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev": { "cache": false, "persistent": true }
  }
}
# Commands: turbo run build, turbo run dev</code></pre>
      </div>
    `
  },
  {
    id: "next-31",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Redirects","Rewrites","Config"],
    question: "Next.js-ে Redirects এবং Rewrites কীভাবে configure করবেন? পার্থক্য কী?",
    answer: `
      <ul>
        <li><strong>Redirect:</strong> URL পরিবর্তন হয়, user দেখতে পায় (301/302/307/308)।</li>
        <li><strong>Rewrite:</strong> URL একই থাকে, internally অন্য path serve করে (proxy-like)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// next.config.js
module.exports = {
  async redirects() {
    return [
      { source: '/old-blog/:slug', destination: '/blog/:slug', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // API proxy — CORS সমস্যা সমাধান
      { source: '/api/external/:path*', destination: 'https://external-api.com/:path*' },
    ];
  },
};</code></pre>
      </div>
    `
  },
  {
    id: "next-32",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["WebSocket","Real-time","Socket.io"],
    question: "Next.js-ে Real-time features (WebSocket, Server-Sent Events) কীভাবে implement করবেন?",
    answer: `
      <p>Next.js-ের serverless nature-এ persistent WebSocket connections চ্যালেঞ্জিং। বিভিন্ন approach আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Approach 1: Server-Sent Events (SSE) — Simple, one-way
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(\`data: \${JSON.stringify({ time: new Date() })}\\n\\n\`));
      }, 1000);
      setTimeout(() => { clearInterval(interval); controller.close(); }, 30000);
    },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
}

// Approach 2: Third-party real-time services (recommended)
// Pusher, Ably, Supabase Realtime, Liveblocks</code></pre>
      </div>
    `
  },
  {
    id: "next-33",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Migration","Pages to App Router"],
    question: "Next.js Pages Router থেকে App Router-ে কীভাবে migrate করবেন? Step-by-step strategy কী?",
    answer: `
      <h4>Incremental Migration Strategy:</h4>
      <ol>
        <li><strong>Phase 1:</strong> app/ directory তৈরি করুন, pages/ সাথে co-exist করবে।</li>
        <li><strong>Phase 2:</strong> Static pages আগে migrate করুন (সহজ)।</li>
        <li><strong>Phase 3:</strong> Dynamic pages এবং API routes migrate করুন।</li>
        <li><strong>Phase 4:</strong> pages/ directory মুছে ফেলুন।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// BEFORE: pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  return { props: { post: await getPost(params.slug) }, revalidate: 60 };
}

// AFTER: app/blog/[slug]/page.tsx
export const revalidate = 60;
export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return &lt;article&gt;{post.title}&lt;/article&gt;;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-34",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["State Management","Server State","Client State"],
    question: "Next.js App Router-ে State Management strategy কী হওয়া উচিত? Server State vs Client State কীভাবে handle করবেন?",
    answer: `
      <h4>State Categories in Next.js:</h4>
      <ol>
        <li><strong>Server State:</strong> DB data → Server Components-ে সরাসরি fetch করুন।</li>
        <li><strong>URL State:</strong> Filters, search, pagination → searchParams ব্যবহার করুন।</li>
        <li><strong>Form State:</strong> Server Actions + useActionState।</li>
        <li><strong>Client UI State:</strong> Modals, tabs, toasts → Zustand বা useState।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Avoid: Redux/Context for server-fetched data
// ✅ Use: Server Components + searchParams + Zustand (UI only)

import { create } from 'zustand';
const useUIStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set(s => ({ isSidebarOpen: !s.isSidebarOpen })),
}));</code></pre>
      </div>
    `
  },
  {
    id: "next-35",
    category: "Next.js",
    difficulty: "Beginner",
    tags: ["Setup","Create Next App","Project Structure"],
    question: "নতুন Next.js প্রজেক্ট কীভাবে শুরু করবেন? Recommended project structure কী?",
    answer: `
      <p>নতুন প্রজেক্ট <code>create-next-app</code> দিয়ে শুরু করাই সবচেয়ে নিরাপদ — এটি TypeScript, ESLint, Tailwind ও App Router একসাথে সঠিকভাবে কনফিগার করে দেয়।</p>
      <p>নিচের ফোল্ডার কাঠামোটি বেশিরভাগ প্রোডাকশন প্রজেক্টে ভালো কাজ করে। মূল নীতি — <strong>ফিচার অনুযায়ী ভাগ করুন, ফাইলের ধরন অনুযায়ী নয়</strong>।</p>
      <ul>
        <li><strong>Route Group <code>(auth)</code>:</strong> বন্ধনীর ফোল্ডার URL-এ যুক্ত হয় না, শুধু সংগঠনের জন্য এবং আলাদা layout দিতে কাজে লাগে।</li>
        <li><strong><code>lib/</code>:</strong> ডাটাবেজ ক্লায়েন্ট, auth কনফিগ — যা UI নয়।</li>
        <li><strong><code>components/ui</code> বনাম <code>components/features</code>:</strong> পুনঃব্যবহারযোগ্য ডাম্ব কম্পোনেন্ট আলাদা রাখলে ফিচার বাড়লেও কাঠামো এলোমেলো হয় না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code>npx create-next-app@latest my-app \\
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>src/
├── app/                    # App Router
│   ├── (auth)/            # Route group (no URL impact)
│   │   ├── login/
│   ├── api/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home
├── components/
│   ├── ui/                # Reusable UI components
│   └── features/          # Feature-specific components
├── lib/                   # Infrastructure (db, auth, utils)
├── actions/               # Server Actions
└── middleware.ts</code></pre>
      </div>
    `
  },
  {
    id: "next-36",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Route Groups","Organization"],
    question: "Next.js Route Groups কী? কীভাবে URL-এ প্রভাব না ফেলে routes organize করবেন?",
    answer: `
      <p><strong>Route Groups</strong> <code>(parentheses)</code> দিয়ে তৈরি হয় এবং URL path-ে include হয় না। Routes organize করতে এবং আলাদা layouts দিতে ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>app/
├── (marketing)/           # Marketing pages group
│   ├── layout.tsx         # Marketing layout (no sidebar)
│   ├── page.tsx           # / (home)
│   └── about/page.tsx     # /about
├── (dashboard)/           # Dashboard pages group
│   ├── layout.tsx         # Dashboard layout (with sidebar)
│   └── dashboard/page.tsx # /dashboard
└── (auth)/                # Auth pages group
    ├── layout.tsx         # Auth layout (centered card)
    └── login/page.tsx     # /login</code></pre>
      </div>
    `
  },
  {
    id: "next-37",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["next.config","Configuration","Plugins"],
    question: "next.config.js-ের গুরুত্বপূর্ণ configuration options কী কী?",
    answer: `
      <p><code>next.config.js</code> হলো বিল্ড ও রানটাইম আচরণ নিয়ন্ত্রণের কেন্দ্রীয় জায়গা। প্রোডাকশনে যেগুলো সবচেয়ে বেশি দরকার হয়:</p>
      <ul>
        <li><strong><code>images.remotePatterns</code>:</strong> কোন ডোমেইন থেকে ছবি অপ্টিমাইজ করা যাবে তার শ্বেততালিকা। না দিলে বাইরের ছবিতে <code>next/image</code> এরর দেবে।</li>
        <li><strong><code>headers()</code>:</strong> নিরাপত্তা হেডার সব রুটে একবারে বসানো।</li>
        <li><strong><code>redirects()</code> / <code>rewrites()</code>:</strong> redirect ইউজারের URL বদলায় (SEO-তে দৃশ্যমান), rewrite ভেতরে ভেতরে প্রক্সি করে (URL অপরিবর্তিত থাকে)।</li>
        <li><strong><code>output: 'standalone'</code>:</strong> Docker ইমেজের জন্য ন্যূনতম বিল্ড তৈরি করে — ইমেজ সাইজ অনেক কমে।</li>
      </ul>
      <p><strong>সতর্কতা:</strong> <code>typescript.ignoreBuildErrors</code> বা <code>eslint.ignoreDuringBuilds</code> দিয়ে এরর চাপা দেবেন না — এগুলো প্রোডাকশনে বাগ পার করে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Docker-friendly minimal build
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*.amazonaws.com' }],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() { return [{ source: '/old', destination: '/new', permanent: true }]; },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
    }];
  },
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,
};
module.exports = nextConfig;</code></pre>
      </div>
    `
  },
  {
    id: "next-38",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Dynamic Import","Client Only","SSR"],
    question: "Next.js-ে Dynamic Import এবং Client-only components কীভাবে handle করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import dynamic from 'next/dynamic';

// Disable SSR — browser-only components
const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false,  // ❌ Server-এ render হবে না (Leaflet, D3 etc.)
  loading: () => &lt;div&gt;Loading map...&lt;/div&gt;,
});

// ⚠️ Common SSR errors and fixes:
// Error: "window is not defined"
// Fix 1: dynamic(() => import('./Component'), { ssr: false })
// Fix 2: useEffect check
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : null;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-39",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Email","Notification","Background Jobs"],
    question: "Next.js-ে Email পাঠানো, Background Jobs এবং Cron Jobs কীভাবে implement করবেন?",
    answer: `
      <p>এখানে মূল স্থাপত্যগত নীতিটি হলো: <strong>দীর্ঘ বা অনির্ভরযোগ্য কাজ কখনও রিকোয়েস্ট সাইকেলের ভেতরে করবেন না</strong>। ইউজারের রেসপন্স আটকে রেখে ইমেইল পাঠানো মানে SMTP ধীর হলে আপনার পেজও ধীর।</p>
      <ul>
        <li><strong>Email:</strong> Resend/SendGrid-এর মতো সার্ভিস ব্যবহার করুন। Server Action থেকে কল করলে অন্তত <code>await</code> না করে কিউতে পাঠানোই ভালো।</li>
        <li><strong>Background Jobs:</strong> সার্ভারলেস ফাংশন টাইমআউটের (সাধারণত ১০–৬০ সেকেন্ড) মধ্যেই শেষ হতে হয়, তাই ভারী কাজের জন্য আলাদা ওয়ার্কার বা Inngest/Trigger.dev-এর মতো সার্ভিস দরকার।</li>
        <li><strong>Cron Jobs:</strong> <code>vercel.json</code>-এ শিডিউল দিয়ে একটি Route Handler কল করানো যায়। সেই এন্ডপয়েন্ট অবশ্যই একটি সিক্রেট হেডার দিয়ে সুরক্ষিত করুন — নাহলে যে কেউ কল করতে পারবে।</li>
      </ul>
      <p><strong>Idempotency:</strong> ক্রন বা কিউ একই জব দুবার চালাতে পারে। তাই "এই ইউজারকে আজ ইমেইল পাঠানো হয়েছে কি না" ডাটাবেজে চিহ্নিত রাখুন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Email — Resend (recommended)
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email, name) {
  await resend.emails.send({ from: 'hello@myapp.com', to: email, subject: 'Welcome!', react: &lt;WelcomeEmail /&gt; });
}

// Background Jobs — Vercel Cron
// vercel.json
{ "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 0 * * *" }] }

// app/api/cron/cleanup/route.ts
export async function GET(request) {
  if (request.headers.get('authorization') !== \`Bearer \${process.env.CRON_SECRET}\`) {
    return new Response('Unauthorized', { status: 401 });
  }
  await prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  return Response.json({ success: true });
}</code></pre>
      </div>
    `
  },
  {
    id: "next-40",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Observability","Logging","Monitoring"],
    question: "Production Next.js app-ে Logging, Error Tracking এবং Monitoring কীভাবে সেটআপ করবেন?",
    answer: `
      <p>প্রোডাকশনে তিনটি আলাদা জিনিস দরকার, এবং একটি অন্যটির বিকল্প নয়:</p>
      <ul>
        <li><strong>Error Tracking (Sentry):</strong> স্ট্যাক ট্রেস, রিলিজ ভার্সন ও ইউজার কনটেক্সটসহ এক্সেপশন ধরে। সোর্স ম্যাপ আপলোড করুন, নাহলে minified কোডে ট্রেস অপাঠ্য থাকবে।</li>
        <li><strong>Structured Logging:</strong> <code>console.log</code>-এর বদলে JSON লগ (pino ইত্যাদি) — ফিল্টার ও কুয়েরি করা যায়। প্রতিটি লগে <code>requestId</code> রাখুন।</li>
        <li><strong>Monitoring / RUM:</strong> Core Web Vitals ও আসল ইউজারের latency। ল্যাব ডেটা (Lighthouse) আর বাস্তব ডেটা প্রায়ই আলাদা হয়।</li>
      </ul>
      <h4>Next.js-নির্দিষ্ট বিষয়</h4>
      <ul>
        <li><code>error.tsx</code> ও <code>global-error.tsx</code> দিয়ে UI ক্র্যাশ ধরুন এবং সেখান থেকেই রিপোর্ট পাঠান।</li>
        <li>সার্ভার ও ক্লায়েন্ট — দুই দিকেই আলাদা করে ইনস্ট্রুমেন্ট করতে হয়।</li>
        <li>লগে কখনও টোকেন, পাসওয়ার্ড বা সম্পূর্ণ রিকোয়েস্ট বডি রাখবেন না।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Sentry — Error tracking
import * as Sentry from '@sentry/nextjs';
Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 0.1 });

// 2. Structured Logging — Pino
import pino from 'pino';
export const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// 3. Health check endpoint
// app/api/health/route.ts
export async function GET() {
  try {
    await prisma.$queryRaw\`SELECT 1\`; // DB check
    return Response.json({ status: 'ok', timestamp: new Date() });
  } catch {
    return Response.json({ status: 'error' }, { status: 503 });
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "next-41",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Cookies","Headers","Request"],
    question: "Next.js Server Components-ে cookies এবং headers কীভাবে access ও modify করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { cookies, headers } from 'next/headers';

// Server Component-এ cookies read
async function UserPreferences() {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value || 'dark';
  return &lt;div&gt;Theme: {theme}&lt;/div&gt;;
}

// Server Component-ে headers read
async function GeoContent() {
  const headersList = headers();
  const country = headersList.get('x-vercel-ip-country') || 'BD';
  return &lt;div&gt;Country: {country}&lt;/div&gt;;
}

// Server Action-ে cookies set
'use server';
export async function setTheme(theme) {
  cookies().set('theme', theme, { httpOnly: true, maxAge: 60 * 60 * 24 * 365 });
}

// ⚠️ cookies() ও headers() ডায়নামিক function — যেকোনো page এগুলো ব্যবহার করলে SSR হবে</code></pre>
      </div>
    `
  },
  {
    id: "next-42",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Stripe","Payment","E-commerce"],
    question: "Next.js-ে Payment Integration (Stripe) কীভাবে করবেন?",
    answer: `
      <p>Stripe ইন্টিগ্রেশনের সবচেয়ে গুরুত্বপূর্ণ নিয়ম: <strong>পেমেন্ট সফল হয়েছে কি না তা কখনও ব্রাউজারের রিডাইরেক্ট দেখে সিদ্ধান্ত নেবেন না</strong>। ইউজার সফল পেজে পৌঁছানোর আগেই ব্রাউজার বন্ধ করতে পারেন, আবার সেই URL সরাসরি খুলেও ফেলতে পারেন।</p>
      <p>সত্যের একমাত্র উৎস হলো <strong>Webhook</strong> — Stripe সার্ভার-টু-সার্ভার আপনাকে জানায় পেমেন্ট সম্পন্ন হয়েছে।</p>
      <h4>অপরিহার্য নিয়মগুলো</h4>
      <ul>
        <li><strong>Webhook signature যাচাই করুন</strong> (<code>stripe.webhooks.constructEvent</code>) — নাহলে যে কেউ ভুয়া "পেমেন্ট সফল" পাঠাতে পারবে।</li>
        <li>Signature যাচাইয়ের জন্য <strong>raw body</strong> দরকার — Next.js-এ বডি পার্স হওয়ার আগেই নিতে হয়।</li>
        <li><strong>Idempotent থাকুন:</strong> Stripe একই ইভেন্ট একাধিকবার পাঠাতে পারে। <code>event.id</code> সংরক্ষণ করে ডুপ্লিকেট প্রসেসিং এড়ান।</li>
        <li>দাম <strong>সবসময় সার্ভারে</strong> নির্ধারণ করুন — ক্লায়েন্টের পাঠানো amount কখনও বিশ্বাস করবেন না।</li>
        <li>দ্রুত <code>200</code> ফেরত দিন; ভারী কাজ কিউতে পাঠান, নাহলে Stripe রিট্রাই করতে থাকবে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server Action — Checkout session create
'use server';
export async function createCheckoutSession(cartItems) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map(item => ({
      price_data: { currency: 'bdt', product_data: { name: item.name }, unit_amount: item.price * 100 },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cart\`,
  });
  redirect(session.url);
}

// Webhook — Payment confirmation
export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await prisma.order.create({ data: { userId: session.metadata.userId, amount: session.amount_total / 100, status: 'paid' } });
  }
  return new Response('OK');
}</code></pre>
      </div>
    `
  },
  {
    id: "next-43",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Pagination","Infinite Scroll","searchParams"],
    question: "Next.js App Router-ে Server-side Pagination এবং Infinite Scroll কীভাবে implement করবেন?",
    answer: `
      <p>সার্ভার-সাইড পেজিনেশনে দুটি কৌশল আছে, এবং বড় ডেটাসেটে পছন্দটি গুরুত্বপূর্ণ:</p>
      <ul>
        <li><strong>Offset pagination</strong> (<code>LIMIT 20 OFFSET 10000</code>): সহজ ও পেজ নম্বর দেখানো যায়। কিন্তু ডাটাবেজকে ১০,০২০টি সারি পড়ে প্রথম ১০,০০০টি ফেলে দিতে হয় — গভীর পেজে ক্রমশ ধীর।</li>
        <li><strong>Cursor pagination</strong> (<code>WHERE id &lt; lastId LIMIT 20</code>): সবসময় দ্রুত, কারণ ইনডেক্স দিয়ে সরাসরি জায়গায় চলে যায়। ইনফিনিট স্ক্রলের জন্য এটিই সঠিক পছন্দ। তাছাড়া নতুন আইটেম যোগ হলেও আইটেম <em>দুবার দেখানো বা বাদ পড়ার</em> সমস্যা হয় না।</li>
      </ul>
      <p>App Router-এ পেজ নম্বর <code>searchParams</code>-এ রাখলে URL শেয়ারযোগ্য ও bookmarkable থাকে, এবং সার্ভার কম্পোনেন্ট সরাসরি সেই অনুযায়ী ডেটা আনতে পারে।</p>
      <p><strong>ইনফিনিট স্ক্রলের সতর্কতা:</strong> এটি SEO ও অ্যাক্সেসিবিলিটির জন্য খারাপ হতে পারে — ফুটার অগম্য হয়ে যায়। তাই "Load more" বোতাম বা পেজিনেশন fallback রাখা ভালো।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server-side Pagination with searchParams
async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  const [products, total] = await Promise.all([
    prisma.product.findMany({ skip: (page - 1) * 20, take: 20 }),
    prisma.product.count(),
  ]);
  return &lt;ProductGrid products={products} /&gt;;
}

// Infinite Scroll (Client + Intersection Observer)
'use client';
function InfiniteProductList({ initialProducts }) {
  const [page, setPage] = useState(1);
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        const newProducts = await loadMoreProducts(page + 1);
        setProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [page]);</code></pre>
      </div>
    `
  },
  {
    id: "next-44",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Error","Validation","Zod"],
    question: "Next.js Server Actions-ে input validation এবং error handling কীভাবে করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// lib/validations.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষর হতে হবে'),
  email: z.string().email('সঠিক ইমেইল দিন'),
});

// Server Action with validation
'use server';
export async function createUser(prevState, formData) {
  const validatedFields = createUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.user.create({ data: validatedFields.data });
  } catch (error) {
    if (error.code === 'P2002') return { errors: { email: ['এই ইমেইল আগে থেকে আছে'] } };
  }
  revalidatePath('/users');
  redirect('/users');
}</code></pre>
      </div>
    `
  },
  {
    id: "next-45",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Architecture","Clean Code","Best Practices"],
    question: "Senior/Lead Developer হিসেবে Next.js প্রজেক্টের Architecture best practices কী কী?",
    answer: `
      <h4>Architecture Principles:</h4>
      <ol>
        <li><strong>Feature-based organization:</strong> Technical concern না, feature অনুযায়ী organize করুন।</li>
        <li><strong>Server-first mindset:</strong> Client Component সর্বনিম্ন রাখুন।</li>
        <li><strong>Colocation:</strong> Related code কাছাকাছি রাখুন।</li>
        <li><strong>Type safety:</strong> End-to-end TypeScript।</li>
      </ol>
      <h4>Code Review Guidelines:</h4>
      <ul>
        <li>✅ 'use client' সর্বনিম্ন boundary-তে রাখুন (leaf components)।</li>
        <li>✅ Data fetching Server Components-ে রাখুন, Client-ে না।</li>
        <li>✅ Server Actions-ে সবসময় input validate করুন (Zod)।</li>
        <li>✅ Environment variables-ে secrets NEXT_PUBLIC_ দিয়ে expose করবেন না।</li>
        <li>✅ Error boundaries প্রতিটি feature-ের root-ে রাখুন।</li>
      </ul>
    `
  },
  {
    id: "next-46",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["usePathname","useSearchParams","Hooks"],
    question: "Next.js App Router-ের নতুন navigation hooks কী কী এবং কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>App Router-এ নেভিগেশন হুকগুলো <code>next/navigation</code> থেকে আসে (পুরনো <code>next/router</code> নয়)। এগুলো কেবল <strong>Client Component</strong>-এ ব্যবহারযোগ্য:</p>
      <ul>
        <li><strong><code>useRouter()</code>:</strong> <code>push</code>, <code>replace</code>, <code>refresh</code>, <code>back</code>। <code>router.refresh()</code> সার্ভার কম্পোনেন্ট পুনরায় ফেচ করে <em>ক্লায়েন্ট state না হারিয়ে</em> — মিউটেশনের পর খুব কাজে লাগে।</li>
        <li><strong><code>usePathname()</code>:</strong> বর্তমান পাথ — অ্যাক্টিভ নেভিগেশন লিংক হাইলাইট করতে।</li>
        <li><strong><code>useSearchParams()</code>:</strong> কুয়েরি স্ট্রিং পড়া (read-only)।</li>
        <li><strong><code>useParams()</code>:</strong> ডায়নামিক রুটের প্যারামিটার।</li>
      </ul>
      <p><strong>জরুরি:</strong> <code>useSearchParams()</code> ব্যবহারকারী কম্পোনেন্ট স্ট্যাটিক রেন্ডারিং থেকে বাদ পড়ে যায়। পুরো পেজ ডায়নামিক হয়ে যাওয়া ঠেকাতে সেটিকে <code>&lt;Suspense&gt;</code> দিয়ে মুড়ে দিন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function NavigationExample() {
  const router = useRouter();
  const pathname = usePathname(); // e.g., '/blog/my-post'
  const searchParams = useSearchParams();
  const query = searchParams.get('q'); // ?q=react → 'react'

  // Practical Example: Active NavLink
  return (
    &lt;nav&gt;
      {['/dashboard', '/settings'].map(href => (
        &lt;Link key={href} href={href} className={pathname === href ? 'active' : ''}&gt;
          {href.replace('/', '')}
        &lt;/Link&gt;
      ))}
    &lt;/nav&gt;
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-47",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["PWA","Service Worker","Offline"],
    question: "Next.js-কে Progressive Web App (PWA) কীভাবে বানাবেন?",
    answer: `
      <p>PWA বানাতে মূলত দুটি জিনিস লাগে: একটি <strong>Web App Manifest</strong> (অ্যাপের নাম, আইকন, ডিসপ্লে মোড) এবং একটি <strong>Service Worker</strong> (অফলাইন ক্যাশিং ও ব্যাকগ্রাউন্ড কাজ)।</p>
      <p>Next.js 13+ থেকে <code>app/manifest.ts</code> ফাইল এক্সপোর্ট করলেই ম্যানিফেস্ট তৈরি হয়ে যায়। Service Worker-এর জন্য <code>next-pwa</code> ব্যবহার করা যায়, যা ভেতরে Workbox দিয়ে ক্যাশিং কৌশল প্রয়োগ করে।</p>
      <h4>বাস্তব সতর্কতা</h4>
      <ul>
        <li>ডেভেলপমেন্টে Service Worker <strong>বন্ধ রাখুন</strong> — নাহলে পুরনো ক্যাশ করা ফাইল দেখে ঘণ্টার পর ঘণ্টা বিভ্রান্ত হবেন।</li>
        <li>SSR পেজ আক্রমণাত্মকভাবে ক্যাশ করলে ইউজার পুরনো ডেটা দেখবে — API কলে <code>NetworkFirst</code>, স্ট্যাটিক অ্যাসেটে <code>CacheFirst</code> ব্যবহার করুন।</li>
        <li>PWA শুধু HTTPS-এ কাজ করে (localhost ব্যতিক্রম)।</li>
        <li>iOS-এ PWA সাপোর্ট সীমিত — push notification ও ইনস্টল অভিজ্ঞতা Android-এর মতো নয়।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Install: npm install next-pwa
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});
module.exports = withPWA({});

// app/manifest.ts
export default function manifest() {
  return {
    name: 'My App',
    short_name: 'MyApp',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#6366f1',
    icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  };
}</code></pre>
      </div>
    `
  },
  {
    id: "next-48",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Sitemap","Robots","SEO"],
    question: "Next.js-ে Sitemap, Robots.txt এবং OpenGraph images কীভাবে generate করবেন?",
    answer: `
      <p>Next.js এই তিনটি SEO ফাইলই কনভেনশন-ভিত্তিক ফাইল দিয়ে তৈরি করতে পারে — আলাদা কোনো লাইব্রেরি লাগে না:</p>
      <ul>
        <li><strong><code>app/sitemap.ts</code>:</strong> একটি অ্যারে রিটার্ন করলেই <code>/sitemap.xml</code> তৈরি হয়। ডাটাবেজ থেকে ডায়নামিক URL আনতে পারেন। ৫০,০০০-এর বেশি URL হলে sitemap index-এ ভাগ করতে হবে।</li>
        <li><strong><code>app/robots.ts</code>:</strong> ক্রলারদের নিয়ম। স্টেজিং পরিবেশে অবশ্যই <code>disallow: '/'</code> দিন — নাহলে টেস্ট সাইট গুগলে ইনডেক্স হয়ে যাবে।</li>
        <li><strong><code>opengraph-image.tsx</code>:</strong> <code>ImageResponse</code> দিয়ে সোশ্যাল শেয়ারের ছবি <em>রানটাইমে</em> তৈরি হয় — প্রতিটি ব্লগ পোস্টের জন্য হাতে ছবি বানাতে হয় না।</li>
      </ul>
      <p><strong>মনে রাখবেন:</strong> OG ছবির URL অবশ্যই সম্পূর্ণ (absolute) হতে হবে, তাই layout-এ <code>metadataBase</code> সেট করা জরুরি। সোশ্যাল ক্রলার JavaScript চালায় না — তাই মেটা ট্যাগ সার্ভার-সাইডেই থাকতে হবে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app/sitemap.ts
export default async function sitemap() {
  const posts = await prisma.post.findMany({ select: { slug: true, updatedAt: true } });
  return [
    { url: 'https://myapp.com', lastModified: new Date(), priority: 1.0 },
    ...posts.map(post => ({ url: \`https://myapp.com/blog/\${post.slug}\`, lastModified: post.updatedAt })),
  ];
}

// app/robots.ts
export default function robots() {
  return { rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: 'https://myapp.com/sitemap.xml' };
}

// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export default async function OGImage() {
  return new ImageResponse(&lt;div style={{ background: 'purple', width: '100%', height: '100%' }}&gt;My App&lt;/div&gt;, { width: 1200, height: 630 });
}</code></pre>
      </div>
    `
  },
  {
    id: "next-49",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Interview","System Design","Architecture"],
    question: "Next.js দিয়ে E-commerce platform-ের System Design কীভাবে করবেন? (Senior/Lead Interview Question)",
    answer: `
      <h4>Rendering Strategy per Page:</h4>
      <ul>
        <li><strong>Home Page:</strong> ISR (revalidate: 3600) — Hero + featured products</li>
        <li><strong>Product Listing:</strong> SSR + Streaming — Filters in URL, real-time stock</li>
        <li><strong>Product Detail:</strong> ISR (revalidate: 60) — Static + dynamic stock</li>
        <li><strong>Cart:</strong> Client-side — Zustand store</li>
        <li><strong>Checkout:</strong> SSR — Secure, server-validated</li>
      </ul>
      <h4>Tech Stack Decisions:</h4>
      <ul>
        <li><strong>Database:</strong> PostgreSQL + Prisma</li>
        <li><strong>Cache:</strong> Redis (session, product cache)</li>
        <li><strong>Payment:</strong> Stripe (Server Actions + Webhooks)</li>
        <li><strong>Search:</strong> Algolia / Meilisearch</li>
      </ul>
      <h4>Key Decisions to Explain in Interview:</h4>
      <ul>
        <li>কেন ISR product pages-এর জন্য SSR-এর চেয়ে ভালো (কম server load, CDN cached)।</li>
        <li>কেন cart client-side রাখা হয়েছে (instant UX, no server round-trip)।</li>
        <li>কেন Streaming ব্যবহার হয়েছে product listing-ে (filters fast, product grid streams in)।</li>
      </ul>
    `
  },
  {
    id: "next-50",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Turbopack","Compiler","Future"],
    question: "Next.js Turbopack কী? Webpack-এর চেয়ে কেন দ্রুত? Next.js-ের ভবিষ্যৎ কোথায় যাচ্ছে?",
    answer: `
      <p><strong>Turbopack</strong> হলো Vercel-এর তৈরি Rust-based bundler যা Webpack-কে replace করতে চায়।</p>
      <h4>কেন দ্রুত:</h4>
      <ul>
        <li><strong>Rust-based:</strong> JavaScript-এর চেয়ে ১০-১০০x দ্রুত execution।</li>
        <li><strong>Incremental computation:</strong> শুধু পরিবর্তিত অংশ rebuild করে।</li>
        <li><strong>Function-level caching:</strong> আগের computation reuse করে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># Turbopack দিয়ে dev server চালান
next dev --turbo

# HMR (file change):
# Webpack:    ~500ms
# Turbopack:  ~10ms</code></pre>
      </div>
      <h4>Next.js-ের ভবিষ্যৎ Direction:</h4>
      <ol>
        <li><strong>Partial Prerendering (PPR):</strong> Static shell + dynamic holes — best of SSG + SSR।</li>
        <li><strong>React 19 Integration:</strong> Server Actions stable, useOptimistic, use() hook।</li>
        <li><strong>Turbopack Production:</strong> Build-এও Turbopack (currently dev only)।</li>
      </ol>
    `
  }
];
