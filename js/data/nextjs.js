const nextjsQuestions = [
  {
    id: "next-1",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["App Router", "Pages Router", "File-based Routing"],
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
    tags: ["Server Components", "Client Components", "use client"],
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
    tags: ["SSR", "SSG", "ISR", "Rendering"],
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
    tags: ["Server Actions", "Form", "Mutation"],
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
    tags: ["Middleware", "Authentication", "Edge"],
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
    tags: ["Data Fetching", "Caching", "Revalidation"],
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
    tags: ["Layout", "Template", "Nested"],
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
    tags: ["Image", "Font", "Optimization"],
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
    tags: ["API Routes", "Route Handlers", "REST"],
    question: "Next.js Route Handlers (API Routes) কীভাবে লিখবেন? Request/Response handling best practices কী?",
    answer: `
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
    tags: ["Authentication", "NextAuth", "Session"],
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
    tags: ["Dynamic Routes", "Params", "Catch-all"],
    question: "Next.js-এ Dynamic Routes কীভাবে কাজ করে? Catch-all এবং Optional Catch-all routes কী?",
    answer: `
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
    tags: ["Error Handling", "Loading", "Not Found"],
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
    tags: ["Metadata", "SEO", "OpenGraph"],
    question: "Next.js-ে SEO optimization এবং Metadata কীভাবে manage করবেন?",
    answer: `
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
    tags: ["Deployment", "Vercel", "Docker", "Standalone"],
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
    tags: ["Parallel Routes", "Intercepting Routes", "Modal"],
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
    tags: ["Environment Variables", "Config", "Security"],
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
    tags: ["Internationalization", "i18n", "Routing"],
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
    tags: ["Link", "Navigation", "useRouter"],
    question: "Next.js-ে Navigation কীভাবে করবেন? Link, useRouter, redirect — কখন কোনটি?",
    answer: `
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
    tags: ["Database", "Prisma", "ORM"],
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
    tags: ["Performance", "Bundle", "Analytics"],
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
    tags: ["Testing", "Jest", "Playwright", "E2E"],
    question: "Next.js app কীভাবে test করবেন? Unit, Integration এবং E2E testing setup কী?",
    answer: `
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
    tags: ["Styling", "CSS Modules", "Tailwind", "Global CSS"],
    question: "Next.js-ে Styling options কী কী? CSS Modules vs Tailwind — কোনটি recommended?",
    answer: `
      <h4>Next.js Styling Options:</h4>
      <ol>
        <li><strong>CSS Modules</strong> — .module.css (built-in, scoped)</li>
        <li><strong>Tailwind CSS</strong> — Utility-first (official support, recommended)</li>
        <li><strong>Global CSS</strong> — layout.tsx/globals.css-এ import</li>
        <li><strong>CSS-in-JS</strong> — Styled Components (⚠️ Server Components-এ limitation, 'use client' লাগে)</li>
      </ol>
    `
  },
  {
    id: "next-23",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Edge Runtime", "Serverless", "Node"],
    question: "Next.js Edge Runtime vs Node.js Runtime — পার্থক্য কী? কখন কোনটি ব্যবহার করবেন?",
    answer: `
      <h4>Runtime Options:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid #ccc;">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Node.js Runtime</th>
          <th style="text-align:left; padding:8px;">Edge Runtime</th>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">Cold Start</td><td style="padding:8px;">ধীর (~250ms)</td><td style="padding:8px;">দ্রুত (~0ms)</td>
        </tr>
        <tr style="border-bottom:1px solid #ccc;">
          <td style="padding:8px;">APIs Available</td><td style="padding:8px;">সব Node.js APIs</td><td style="padding:8px;">Web APIs only (limited)</td>
        </tr>
        <tr>
          <td style="padding:8px;">Location</td><td style="padding:8px;">Single region</td><td style="padding:8px;">Global CDN edge</td>
        </tr>
      </table>
      <p><strong>Use Edge for:</strong> Middleware, simple API responses, auth token verification, redirects।<br><strong>Use Node.js for:</strong> Database operations (Prisma), file system access, heavy computation।</p>
    `
  },
  {
    id: "next-24",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Static Export", "SPA", "Output"],
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
    tags: ["Caching", "unstable_cache", "Tags"],
    question: "Next.js-ের Caching মেকানিজম গভীরভাবে ব্যাখ্যা করুন। Cache invalidation strategies কী কী?",
    answer: `
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
    tags: ["Multi-zone", "Micro-frontend", "Architecture"],
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
    tags: ["File Upload", "Server Action", "FormData"],
    question: "Next.js-ে File Upload কীভাবে implement করবেন?",
    answer: `
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
    tags: ["Rate Limiting", "Security", "Headers"],
    question: "Next.js API-তে Rate Limiting, CORS, এবং Security Headers কীভাবে configure করবেন?",
    answer: `
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
    tags: ["Loading", "Streaming", "Suspense"],
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
    tags: ["Monorepo", "Turborepo", "Shared"],
    question: "Next.js প্রজেক্টে Turborepo Monorepo কীভাবে সেটআপ করবেন?",
    answer: `
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
    tags: ["Redirects", "Rewrites", "Config"],
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
    tags: ["WebSocket", "Real-time", "Socket.io"],
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
    tags: ["Migration", "Pages to App Router"],
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
    tags: ["State Management", "Server State", "Client State"],
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
    tags: ["Setup", "Create Next App", "Project Structure"],
    question: "নতুন Next.js প্রজেক্ট কীভাবে শুরু করবেন? Recommended project structure কী?",
    answer: `
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
    tags: ["Route Groups", "Organization"],
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
    tags: ["next.config", "Configuration", "Plugins"],
    question: "next.config.js-ের গুরুত্বপূর্ণ configuration options কী কী?",
    answer: `
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
    tags: ["Dynamic Import", "Client Only", "SSR"],
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
    tags: ["Email", "Notification", "Background Jobs"],
    question: "Next.js-ে Email পাঠানো, Background Jobs এবং Cron Jobs কীভাবে implement করবেন?",
    answer: `
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
    tags: ["Observability", "Logging", "Monitoring"],
    question: "Production Next.js app-ে Logging, Error Tracking এবং Monitoring কীভাবে সেটআপ করবেন?",
    answer: `
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
    tags: ["Cookies", "Headers", "Request"],
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
    tags: ["Stripe", "Payment", "E-commerce"],
    question: "Next.js-ে Payment Integration (Stripe) কীভাবে করবেন?",
    answer: `
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
    tags: ["Pagination", "Infinite Scroll", "searchParams"],
    question: "Next.js App Router-ে Server-side Pagination এবং Infinite Scroll কীভাবে implement করবেন?",
    answer: `
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
    tags: ["Error", "Validation", "Zod"],
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
    tags: ["Architecture", "Clean Code", "Best Practices"],
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
    tags: ["usePathname", "useSearchParams", "Hooks"],
    question: "Next.js App Router-ের নতুন navigation hooks কী কী এবং কীভাবে ব্যবহার করবেন?",
    answer: `
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
    tags: ["PWA", "Service Worker", "Offline"],
    question: "Next.js-কে Progressive Web App (PWA) কীভাবে বানাবেন?",
    answer: `
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
    tags: ["Sitemap", "Robots", "SEO"],
    question: "Next.js-ে Sitemap, Robots.txt এবং OpenGraph images কীভাবে generate করবেন?",
    answer: `
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
    tags: ["Interview", "System Design", "Architecture"],
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
    tags: ["Turbopack", "Compiler", "Future"],
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