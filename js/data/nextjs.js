const nextjsQuestions = [
  {
    id: "next-1",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["App Router", "Pages Router", "File-based Routing"],
    question: "Next.js App Router vs Pages Router — পার্থক্য কী? নতুন প্রজেক্টে কোনটি ব্যবহার করবেন?",
    answer: `
      <p>Next.js 13+ থেকে <strong>App Router</strong> (app/ directory) ডিফল্ট। এটি React Server Components, nested layouts, এবং streaming সাপোর্ট করে।</p>
      <h4>তুলনা:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Pages Router</th>
          <th style="text-align:left; padding:8px;">App Router</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Directory</td><td style="padding:8px;">pages/</td><td style="padding:8px;">app/</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Server Components</td><td style="padding:8px;">❌</td><td style="padding:8px;">✅ Default</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Layouts</td><td style="padding:8px;">_app.js (global only)</td><td style="padding:8px;">Nested layouts</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
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
├── not-found.tsx       // 404 page
├── dashboard/
│   ├── layout.tsx      // Dashboard layout (nested!)
│   ├── page.tsx        // /dashboard
│   └── settings/
│       └── page.tsx    // /dashboard/settings
├── blog/
│   ├── page.tsx        // /blog
│   └── [slug]/
│       └── page.tsx    // /blog/my-post (dynamic)
└── api/
    └── users/
        └── route.ts    // API: /api/users</code></pre>
      </div>
      <p><strong>Decision:</strong> নতুন প্রজেক্টে সবসময় App Router ব্যবহার করুন। Pages Router শুধু legacy প্রজেক্ট maintain-এর জন্য।</p>
    `
  },
  {
    id: "next-2",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Server Components", "Client Components", "use client"],
    question: "Next.js-এ Server Components vs Client Components — কখন কোনটি ব্যবহার করবেন? 'use client' directive কীভাবে কাজ করে?",
    answer: `
      <p>App Router-এ সব component ডিফল্টভাবে <strong>Server Component</strong>। Interactive features দরকার হলে <code>'use client'</code> directive দিয়ে Client Component বানাতে হবে।</p>
      <h4>কোনটি কখন:</h4>
      <ul>
        <li><strong>Server Component:</strong> Data fetch, DB query, sensitive logic, static content, large dependencies (moment.js, lodash)</li>
        <li><strong>Client Component:</strong> onClick, onChange, useState, useEffect, browser APIs, real-time features</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server Component (default) — NO 'use client'
// ✅ সরাসরি DB query, API call
async function ProductPage({ params }) {
  const product = await db.product.findUnique({ where: { id: params.id } });
  const reviews = await db.review.findMany({ where: { productId: params.id } });
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />  {/* Client Component */}
      <ReviewList reviews={reviews} />             {/* Server Component */}
    </div>
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
  
  return (
    <button onClick={handleAdd} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart 🛒'}
    </button>
  );
}

// ⚠️ Important Rules:
// 1. Server Component-এ useState/useEffect ব্যবহার করা যাবে না
// 2. Client Component Server Component-কে import করতে পারে না
//    কিন্তু children হিসেবে নিতে পারে!
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
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Strategy</th>
          <th style="text-align:left; padding:8px;">When Built</th>
          <th style="text-align:left; padding:8px;">Best For</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;"><strong>SSG</strong> (Static)</td>
          <td style="padding:8px;">Build time</td>
          <td style="padding:8px;">Blog, docs, marketing</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;"><strong>SSR</strong> (Dynamic)</td>
          <td style="padding:8px;">Every request</td>
          <td style="padding:8px;">Personalized pages, real-time data</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;"><strong>ISR</strong> (Incremental)</td>
          <td style="padding:8px;">Background revalidation</td>
          <td style="padding:8px;">E-commerce products, news</td>
        </tr>
        <tr>
          <td style="padding:8px;"><strong>Streaming</strong></td>
          <td style="padding:8px;">Progressive</td>
          <td style="padding:8px;">Complex pages with slow data</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// SSG — Build time-এ generate (default)
async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}

// SSR — প্রতি request-এ নতুন data
export const dynamic = 'force-dynamic';
// অথবা: export const revalidate = 0;
async function DashboardPage() {
  const data = await fetch('/api/dashboard', { cache: 'no-store' });
  return <Dashboard data={data} />;
}

// ISR — Cached + background revalidation
async function ProductPage({ params }) {
  const product = await fetch(\`/api/products/\${params.id}\`, {
    next: { revalidate: 60 } // 60 seconds পরে background-এ refresh
  });
  return <Product data={product} />;
}

// On-demand ISR — webhook/action trigger-এ revalidate
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  revalidatePath('/products'); // Path revalidate
  revalidateTag('products');   // Tag-based revalidate
  return Response.json({ revalidated: true });
}

// Streaming — Suspense boundaries
async function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <SlowChart /> {/* Server-এ stream হবে */}
      </Suspense>
    </div>
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
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  // Validation
  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters' };
  }

  // Database operation
  await db.post.create({ data: { title, content } });

  // Cache invalidation
  revalidatePath('/posts');
  redirect('/posts');
}

export async function deletePost(postId) {
  await db.post.delete({ where: { id: postId } });
  revalidatePath('/posts');
}

// Client Component — form with Server Action
'use client';
import { useFormStatus, useActionState } from 'react';
import { createPost } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Post'}
    </button>
  );
}

function CreatePostForm() {
  const [state, formAction] = useActionState(createPost, null);

  return (
    <form action={formAction}>
      <input name="title" placeholder="Post title" />
      {state?.error && <p className="error">{state.error}</p>}
      <textarea name="content" />
      <SubmitButton />
    </form>
  );
}

// Progressive Enhancement:
// form action works WITHOUT JavaScript!
// JavaScript adds loading states, optimistic updates</code></pre>
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
      <p><strong>Middleware</strong> request সার্ভারে পৌঁছানোর আগে Edge-এ চলে। Authentication check, redirects, headers modification, A/B testing ইত্যাদির জন্য ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// middleware.ts (project root-এ)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Authentication check
  const token = request.cookies.get('auth-token')?.value;
  
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Role-based access
  if (pathname.startsWith('/admin')) {
    const role = request.cookies.get('user-role')?.value;
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // 3. Geo-based redirect
  const country = request.geo?.country || 'BD';
  if (pathname === '/' && country === 'US') {
    return NextResponse.redirect(new URL('/en-us', request.url));
  }

  // 4. Add custom headers
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
      <p>Next.js-এর caching system বেশ complex। চারটি caching layer আছে।</p>
      <h4>Caching Layers:</h4>
      <ol>
        <li><strong>Request Memoization:</strong> একই render-এ duplicate fetch auto-deduplicate হয়</li>
        <li><strong>Data Cache:</strong> Server-এ fetch results persist হয় (across requests)</li>
        <li><strong>Full Route Cache:</strong> Static routes build time-এ cache হয়</li>
        <li><strong>Router Cache:</strong> Client-side — visited routes browser-এ cache থাকে</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Default — cached forever (SSG behavior)
const data = await fetch('https://api.example.com/posts');

// No cache — fresh every request (SSR behavior)
const data = await fetch('https://api.example.com/posts', {
  cache: 'no-store'
});

// Time-based revalidation (ISR behavior)
const data = await fetch('https://api.example.com/posts', {
  next: { revalidate: 3600 } // 1 hour
});

// Tag-based revalidation
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] }
});
// Server Action-এ: revalidateTag('posts');

// Request Memoization — same fetch deduplicated
// Layout.tsx ও Page.tsx দুজনেই একই URL fetch করলে
// Next.js একটিমাত্র request পাঠায়!
async function Layout({ children }) {
  const user = await fetch('/api/user'); // ← একটি request
  return <div><Header user={user} />{children}</div>;
}
async function Page() {
  const user = await fetch('/api/user'); // ← Deduplicated!
  return <Profile user={user} />;
}

// Opt out of caching for entire route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
// বা fetchCache = 'force-no-store';</code></pre>
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
    <html lang="bn">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx — Nested Layout
// Navigation-এ state preserve থাকে!
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar /> {/* Re-render হবে না! */}
      <div className="content">{children}</div>
    </div>
  );
}

// app/dashboard/template.tsx — Template (re-mount হয়)
// useEffect আবার চলবে, animations replay হবে
export default function DashboardTemplate({ children }) {
  useEffect(() => {
    logPageView(); // প্রতি navigation-এ চলবে
  });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  );
}

// কখন Layout vs Template:
// Layout: Sidebar, header, shared state — preserve করতে চান
// Template: Page transition animation, analytics logging</code></pre>
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

// Static import — automatic width/height, blur placeholder
import heroImage from './hero.jpg';

function Hero() {
  return (
    <Image
      src={heroImage}
      alt="Hero banner"
      placeholder="blur"     // Auto blur placeholder from static import
      priority               // LCP image — preload করে
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}

// Remote image
function Avatar({ user }) {
  return (
    <Image
      src={user.avatarUrl}
      alt={user.name}
      width={64}
      height={64}
      className="rounded-full"
      loading="lazy"          // Default — viewport-এ আসলে load
    />
  );
}

// next.config.js — remote image domains
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
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
  weight: ['400', '600', '700'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-bengali'
});

// Layout-এ ব্যবহার
export default function RootLayout({ children }) {
  return (
    <html className={\`\${inter.variable} \${hindSiliguri.variable}\`}>
      <body>{children}</body>
    </html>
  );
}

// Benefits:
// - Self-hosted — Google-এ request যায় না
// - Zero CLS — font swap-এ layout shift হয় না
// - Automatic subsetting — শুধু দরকারি characters</code></pre>
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

// GET /api/users
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const users = await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  
  return NextResponse.json({
    data: users,
    pagination: { page, limit, total: await db.user.count() }
  });
}

// POST /api/users
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validation
    const { name, email } = body;
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email required' },
        { status: 400 }
      );
    }

    const user = await db.user.create({ data: { name, email } });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// app/api/users/[id]/route.ts — Dynamic route
export async function GET(request, { params }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const user = await db.user.update({ where: { id: params.id }, data: body });
  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  await db.user.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
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
        <pre><code>// auth.ts — NextAuth configuration
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({ 
          where: { email: credentials.email } 
        });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        return valid ? user : null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
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
  return <div>Welcome {session.user.name}</div>;
}

// Middleware protection
import { auth } from './auth';
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});</code></pre>
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
        <pre><code>// Dynamic Route Types:

// 1. Single dynamic segment
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
  return <article><h1>{post.title}</h1></article>;
}

// Static params for SSG (generateStaticParams)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
  // Build time-এ সব pages generate হবে
}

// Metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] }
  };
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
// Suspense boundary-র মতো কাজ করে
export default function DashboardLoading() {
  return (
    <div className="skeleton-grid">
      <div className="skeleton-card" />
      <div className="skeleton-card" />
      <div className="skeleton-card" />
    </div>
  );
}

// app/dashboard/error.tsx — Error boundary
'use client'; // Error components must be Client Components!

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>কিছু ভুল হয়েছে!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>আবার চেষ্টা করুন</button>
    </div>
  );
}

// app/dashboard/not-found.tsx — 404 page
export default function NotFound() {
  return (
    <div className="not-found">
      <h2>পৃষ্ঠা পাওয়া যায়নি</h2>
      <Link href="/dashboard">Dashboard-এ ফিরুন</Link>
    </div>
  );
}

// Programmatic 404
import { notFound } from 'next/navigation';

async function UserPage({ params }) {
  const user = await getUser(params.id);
  if (!user) notFound(); // not-found.tsx render হবে
  return <UserProfile user={user} />;
}

// app/global-error.tsx — Root layout error (rare)
'use client';
export default function GlobalError({ error, reset }) {
  return (
    <html><body>
      <h2>Critical Error!</h2>
      <button onClick={reset}>Retry</button>
    </body></html>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-13",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Metadata", "SEO", "OpenGraph"],
    question: "Next.js-এ SEO optimization এবং Metadata কীভাবে manage করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Static Metadata — app/layout.tsx
export const metadata = {
  title: {
    template: '%s | My App',  // Child pages-এ: "About | My App"
    default: 'My App'
  },
  description: 'Best app ever',
  metadataBase: new URL('https://myapp.com'),
  openGraph: {
    title: 'My App',
    description: 'Best app ever',
    url: 'https://myapp.com',
    siteName: 'My App',
    locale: 'bn_BD',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@myapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'google-verification-code',
  },
};

// Dynamic Metadata — app/blog/[slug]/page.tsx
export async function generateMetadata({ params, searchParams }) {
  const post = await getPost(params.slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage, ...previousImages],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    alternates: {
      canonical: \`/blog/\${params.slug}\`,
    },
  };
}

// Structured Data (JSON-LD)
function BlogPost({ post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author.name }
  };

  return (
    <>
      <script type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>{post.content}</article>
    </>
  );
}

// Sitemap — app/sitemap.ts
export default async function sitemap() {
  const posts = await getAllPosts();
  return [
    { url: 'https://myapp.com', lastModified: new Date() },
    ...posts.map(post => ({
      url: \`https://myapp.com/blog/\${post.slug}\`,
      lastModified: post.updatedAt,
    })),
  ];
}

// Robots — app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: 'https://myapp.com/sitemap.xml',
  };
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
      <h4>Deployment Options:</h4>
      <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Platform</th>
          <th style="text-align:left; padding:8px;">Best For</th>
          <th style="text-align:left; padding:8px;">Features</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Vercel</td><td style="padding:8px;">দ্রুত deploy, small teams</td><td style="padding:8px;">Edge, analytics, preview deploys</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Docker</td><td style="padding:8px;">Self-hosted, enterprise</td><td style="padding:8px;">Full control, any cloud</td>
        </tr>
        <tr>
          <td style="padding:8px;">Static Export</td><td style="padding:8px;">CDN hosting, no server</td><td style="padding:8px;">GitHub Pages, S3, Netlify</td>
        </tr>
      </table>
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
ENV NEXT_TELEMETRY_DISABLED=1

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
module.exports = {
  output: 'standalone', // Minimal server build
};

// Static Export (no server needed)
module.exports = {
  output: 'export',
  // ⚠️ SSR, API routes, middleware কাজ করবে না
};</code></pre>
      </div>
    `
  },
  {
    id: "next-15",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Parallel Routes", "Intercepting Routes", "Modal"],
    question: "Next.js Parallel Routes এবং Intercepting Routes কী? Modal pattern কীভাবে implement করবেন?",
    answer: `
      <p>এগুলো Next.js-এর advanced routing features যা complex UI patterns (modals, split views) সমাধান করে।</p>
      <h4>Parallel Routes (@slot):</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একই layout-এ একাধিক page simultaneously render
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
    <div className="dashboard-grid">
      <main>{children}</main>
      <aside>{analytics}</aside>
      <aside>{team}</aside>
    </div>
  );
}</code></pre>
      </div>
      <h4>Intercepting Routes (.) — Modal Pattern:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Instagram-style: click photo → modal, direct URL → full page
app/
├── @modal/
│   └── (.)photos/[id]/   // Intercepts /photos/[id]
│       └── page.tsx       // Modal version
├── photos/
│   └── [id]/
│       └── page.tsx       // Full page version
└── layout.tsx

// (.) — same level intercept
// (..) — one level up
// (..)(..) — two levels up
// (...) — root level</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// @modal/(.)photos/[id]/page.tsx — Modal version
'use client';
import { useRouter } from 'next/navigation';

export default function PhotoModal({ params }) {
  const router = useRouter();
  return (
    <div className="modal-overlay" onClick={() => router.back()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <Image src={\`/photos/\${params.id}.jpg\`} />
        <button onClick={() => router.back()}>✕</button>
      </div>
    </div>
  );
}

// photos/[id]/page.tsx — Full page version (direct URL access)
export default async function PhotoPage({ params }) {
  const photo = await getPhoto(params.id);
  return <FullPhotoView photo={photo} />;
}</code></pre>
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
        <li><code>NEXT_PUBLIC_*</code> — Client-side-এ accessible (browser bundle-এ থাকে)</li>
        <li>Without prefix — শুধুমাত্র server-side-এ accessible (API routes, Server Components)</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># .env.local (git-ignored!)
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
JWT_SECRET="super-secret-key"
STRIPE_SECRET_KEY="sk_live_..."

# Client-side accessible
NEXT_PUBLIC_API_URL="https://api.myapp.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXX"</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ Server Component / API Route — সব env accessible
async function ServerComponent() {
  const data = await fetch(process.env.API_URL); // Works!
  const secret = process.env.JWT_SECRET; // Works!
}

// ❌ Client Component — শুধু NEXT_PUBLIC_ accessible
'use client';
function ClientComponent() {
  console.log(process.env.DATABASE_URL); // undefined!
  console.log(process.env.NEXT_PUBLIC_API_URL); // ✅ Works!
}

// ⚠️ Security Warning:
// NEXT_PUBLIC_ variables browser-এ visible!
// কখনও secrets NEXT_PUBLIC_ দিয়ে expose করবেন না!

// .env file priority (highest → lowest):
// 1. .env.$(NODE_ENV).local  → .env.development.local
// 2. .env.local              → Always loaded (except test)
// 3. .env.$(NODE_ENV)        → .env.development
// 4. .env                    → Default</code></pre>
      </div>
    `
  },
  {
    id: "next-17",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Internationalization", "i18n", "Routing"],
    question: "Next.js App Router-এ Internationalization (i18n) কীভাবে implement করবেন?",
    answer: `
      <p>App Router-এ built-in i18n routing নেই (Pages Router-এ ছিল)। Manual middleware-based approach নিতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// URL structure: /bn/about, /en/about
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
├── middleware.ts
└── dictionaries/
    ├── en.json
    └── bn.json</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// middleware.ts — Locale detection & redirect
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['bn', 'en'];
const defaultLocale = 'bn';

function getLocale(request) {
  const negotiator = new Negotiator({ headers: Object.fromEntries(request.headers) });
  return match(negotiator.languages(), locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );
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

export const getDictionary = async (locale) => dictionaries[locale]();

// Page component
export default async function HomePage({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return <h1>{dict.home.title}</h1>;
}

// dictionaries/bn.json
// { "home": { "title": "স্বাগতম", "description": "..." } }</code></pre>
      </div>
    `
  },
  {
    id: "next-18",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Link", "Navigation", "useRouter"],
    question: "Next.js-এ Navigation কীভাবে করবেন? Link, useRouter, redirect — কখন কোনটি?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { redirect, permanentRedirect } from 'next/navigation';

// 1. Link — Declarative navigation (preferred)
<Link href="/about">About</Link>
<Link href="/blog/my-post" prefetch={true}>My Post</Link>
<Link href={{ pathname: '/search', query: { q: 'next.js' } }}>Search</Link>

// Active link styling
'use client';
function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  );
}

// 2. useRouter — Programmatic navigation (Client Component)
'use client';
function LoginForm() {
  const router = useRouter();
  
  const handleLogin = async () => {
    await login(credentials);
    router.push('/dashboard');   // Navigate
    router.replace('/dashboard'); // Replace (no back)
    router.back();               // Go back
    router.refresh();            // Refresh current route (re-fetch server data)
    router.prefetch('/about');   // Prefetch route
  };
}

// 3. redirect() — Server Component / Server Action
async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/login'); // Server-side redirect
  return <Profile />;
}

// 4. permanentRedirect — 308 redirect (SEO)
async function OldPage() {
  permanentRedirect('/new-page'); // Search engines update
}

// 5. useSearchParams — Query parameters
'use client';
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  // Update search params
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  params.set('page', '2');
  router.push(\`\${pathname}?\${params.toString()}\`);
}</code></pre>
      </div>
    `
  },
  {
    id: "next-19",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Database", "Prisma", "ORM"],
    question: "Next.js-এ Database connection কীভাবে manage করবেন? Prisma ORM best practices কী?",
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
// Development-এ hot reload-এ নতুন PrismaClient তৈরি হয়
// globalThis-এ রাখলে connection reuse হয়

// schema.prisma
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
//   directUrl = env("DIRECT_URL") // For migrations
// }

// Server Component-এ ব্যবহার
async function UsersPage() {
  const users = await prisma.user.findMany({
    include: { posts: { take: 5 } },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  return <UserList users={users} />;
}

// Server Action-এ ব্যবহার
'use server';
export async function createUser(formData) {
  const user = await prisma.user.create({
    data: {
      name: formData.get('name'),
      email: formData.get('email'),
    },
  });
  revalidatePath('/users');
  return user;
}

// Connection pooling for serverless (PgBouncer, Prisma Accelerate)
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=..."</code></pre>
      </div>
    `
  },
  {
    id: "next-20",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Performance", "Bundle", "Analytics"],
    question: "Next.js app-এর performance কীভাবে measure এবং optimize করবেন?",
    answer: `
      <h4>Built-in Performance Tools:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. next/bundle-analyzer
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({ /* config */ });
// Run: ANALYZE=true npm run build

// 2. Built-in Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next';
function Layout({ children }) {
  return <>{children}<SpeedInsights /></>;
}

// 3. Web Vitals reporting
// app/layout.tsx
export function reportWebVitals(metric) {
  // Send to analytics
  switch (metric.name) {
    case 'LCP': console.log('LCP:', metric.value); break;
    case 'FID': console.log('FID:', metric.value); break;
    case 'CLS': console.log('CLS:', metric.value); break;
  }
}</code></pre>
      </div>
      <h4>Optimization Techniques:</h4>
      <ul>
        <li><strong>Dynamic imports:</strong> <code>const Heavy = dynamic(() => import('./Heavy'), { ssr: false })</code></li>
        <li><strong>Image optimization:</strong> next/image সবসময় ব্যবহার করুন</li>
        <li><strong>Font optimization:</strong> next/font — zero CLS</li>
        <li><strong>Prefetching:</strong> Link component automatically prefetch করে</li>
        <li><strong>Server Components:</strong> Client JS কমায়, zero bundle impact</li>
        <li><strong>Route Segments Config:</strong> <code>export const runtime = 'edge'</code></li>
        <li><strong>Parallel Data Fetching:</strong> <code>Promise.all([fetch1(), fetch2()])</code></li>
      </ul>
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
module.exports = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
});

// Component test
import { render, screen } from '@testing-library/react';

test('renders heading', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome');
});

// Server Component test
import { render } from '@testing-library/react';
// Mock DB/API
jest.mock('@/lib/db', () => ({
  prisma: { user: { findMany: jest.fn().mockResolvedValue([
    { id: '1', name: 'Test User' }
  ]) } }
}));

test('server component renders data', async () => {
  const Component = await UsersPage();
  render(Component);
  expect(screen.getByText('Test User')).toBeInTheDocument();
});

// Server Action test
test('createUser action', async () => {
  const formData = new FormData();
  formData.set('name', 'Test');
  formData.set('email', 'test@test.com');
  
  const result = await createUser(formData);
  expect(result).toHaveProperty('id');
});

// E2E with Playwright
// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
  },
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
    question: "Next.js-এ Styling options কী কী? CSS Modules vs Tailwind — কোনটি recommended?",
    answer: `
      <h4>Next.js Styling Options:</h4>
      <ol>
        <li><strong>CSS Modules</strong> — .module.css (built-in, scoped)</li>
        <li><strong>Tailwind CSS</strong> — Utility-first (official support)</li>
        <li><strong>Global CSS</strong> — layout.tsx/globals.css-এ import</li>
        <li><strong>CSS-in-JS</strong> — Styled Components (⚠️ Server Components-এ limitation)</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. CSS Modules (built-in)
// Button.module.css
// .primary { background: #6366f1; color: white; }
import styles from './Button.module.css';
function Button() {
  return <button className={styles.primary}>Click</button>;
}

// 2. Tailwind CSS (recommended for new projects)
// tailwind.config.ts
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
};

function Button() {
  return (
    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg 
      hover:bg-indigo-700 transition-colors">
      Click
    </button>
  );
}

// 3. Global CSS — app/globals.css → layout.tsx-এ import
import './globals.css';

// ⚠️ CSS-in-JS Limitation with Server Components:
// Styled Components, Emotion → শুধু Client Components-এ কাজ করে
// 'use client' দিতে হবে
// Alternative: Vanilla Extract, Panda CSS (zero-runtime)</code></pre>
      </div>
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
        <tr style="border-bottom:1px solid var(--border-color);">
          <th style="text-align:left; padding:8px;">Feature</th>
          <th style="text-align:left; padding:8px;">Node.js Runtime</th>
          <th style="text-align:left; padding:8px;">Edge Runtime</th>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Cold Start</td><td style="padding:8px;">ধীর (~250ms)</td><td style="padding:8px;">দ্রুত (~0ms)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">APIs Available</td><td style="padding:8px;">সব Node.js APIs</td><td style="padding:8px;">Web APIs only (limited)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-color);">
          <td style="padding:8px;">Max Duration</td><td style="padding:8px;">বড় (300s+)</td><td style="padding:8px;">ছোট (30s)</td>
        </tr>
        <tr>
          <td style="padding:8px;">Location</td><td style="padding:8px;">Single region</td><td style="padding:8px;">Global CDN edge</td>
        </tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Edge Runtime — Route Handler
export const runtime = 'edge'; // Fast, global

export async function GET(request) {
  // ✅ fetch, crypto, TextEncoder
  // ❌ fs, child_process, native Node modules
  const data = await fetch('https://api.example.com/data');
  return Response.json(await data.json());
}

// Node.js Runtime — default
export const runtime = 'nodejs';

export async function GET() {
  // ✅ সব Node.js APIs — fs, path, Buffer, streams
  const file = await fs.readFile('./data.json');
  return Response.json(JSON.parse(file));
}

// Use Edge for:
// - Middleware (always edge)
// - Simple API responses
// - Auth token verification
// - A/B testing, redirects
// - Geo-based content

// Use Node.js for:
// - Database operations (Prisma, etc)
// - File system access
// - Heavy computation
// - External service integration</code></pre>
      </div>
    `
  },
  {
    id: "next-24",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Static Export", "SPA", "Output"],
    question: "Next.js Static Export কী? কখন ব্যবহার করবেন এবং কী limitation আছে?",
    answer: `
      <p><strong>Static Export</strong> পুরো Next.js app-কে static HTML/CSS/JS-এ রূপান্তর করে। কোনো Node.js server দরকার হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// next.config.js
module.exports = {
  output: 'export',
  // Optional:
  trailingSlash: true,
  images: { unoptimized: true }, // Static export-এ image optimization নেই
};

// npm run build → out/ directory-তে static files generate হবে
// যেকোনো static hosting-এ deploy করুন (S3, GitHub Pages, Netlify)</code></pre>
      </div>
      <h4>✅ কাজ করবে:</h4>
      <ul>
        <li>Server Components (build time-এ render হবে)</li>
        <li>Client Components (interactive)</li>
        <li>Static data fetching</li>
        <li>Dynamic routes with generateStaticParams</li>
      </ul>
      <h4>❌ কাজ করবে না:</h4>
      <ul>
        <li>Server-side rendering (per-request)</li>
        <li>API Routes / Route Handlers</li>
        <li>Middleware</li>
        <li>Incremental Static Regeneration (ISR)</li>
        <li>next/image optimization (use unoptimized: true)</li>
        <li>Dynamic routes without generateStaticParams</li>
      </ul>
    `
  },
  {
    id: "next-25",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Caching", "unstable_cache", "Tags"],
    question: "Next.js-এর Caching মেকানিজম গভীরভাবে ব্যাখ্যা করুন। Cache invalidation strategies কী কী?",
    answer: `
      <h4>Next.js Cache Architecture:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. fetch() caching (default: cached)
// ✅ Cached — same result until revalidated
const data = await fetch('https://api.example.com/data');

// ⛔ No cache
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// ⏰ Time-based revalidation
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1 hour
});

// 🏷️ Tag-based revalidation
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] }
});

// 2. unstable_cache — DB queries cache
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (userId) => {
    return await prisma.user.findUnique({ where: { id: userId } });
  },
  ['user-by-id'],  // Cache key prefix
  {
    tags: ['users'],
    revalidate: 3600,
  }
);

// 3. Cache invalidation
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updatePost(id, data) {
  await prisma.post.update({ where: { id }, data });
  
  revalidateTag('posts');        // Tag-based
  revalidatePath('/blog');       // Path-based
  revalidatePath('/blog/[slug]', 'page'); // Dynamic path
  revalidatePath('/', 'layout'); // Everything under root
}

// 4. Route Segment Config
export const revalidate = 3600;     // Page-level revalidation
export const dynamic = 'force-static'; // Force static
export const dynamic = 'force-dynamic'; // Force SSR
export const fetchCache = 'force-no-store'; // No fetch cache</code></pre>
      </div>
    `
  },
  {
    id: "next-26",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Multi-zone", "Micro-frontend", "Architecture"],
    question: "Next.js Multi-zone Architecture কী? বড় organization-এ কীভাবে ব্যবহার করবেন?",
    answer: `
      <p><strong>Multi-zone</strong> হলো একাধিক Next.js app-কে একটি domain-এ serve করার পদ্ধতি। প্রতিটি zone আলাদাভাবে develop ও deploy হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Architecture:
// myapp.com/          → Main app (Next.js)
// myapp.com/blog/     → Blog app (Next.js)
// myapp.com/docs/     → Docs app (Next.js)
// Each is a separate Next.js application!

// Main app — next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog.internal.myapp.com/blog/:path*',
      },
      {
        source: '/docs/:path*',
        destination: 'https://docs.internal.myapp.com/docs/:path*',
      },
    ];
  },
};

// Blog app — next.config.js
module.exports = {
  basePath: '/blog',
  // All routes will be /blog/...
};

// Alternatively, use Vercel's multi-zone support or Nginx:
// nginx.conf
// location /blog/ {
//   proxy_pass http://blog-app:3001/blog/;
// }
// location /docs/ {
//   proxy_pass http://docs-app:3002/docs/;
// }</code></pre>
      </div>
      <h4>কখন Multi-zone ব্যবহার করবেন:</h4>
      <ul>
        <li>৫০+ developer, একাধিক টিম</li>
        <li>আলাদা deploy cycle দরকার</li>
        <li>বিভিন্ন section-এ বিভিন্ন tech decision</li>
        <li>Monorepo-র চেয়ে আরও বেশি isolation দরকার</li>
      </ul>
    `
  },
  {
    id: "next-27",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["File Upload", "Server Action", "FormData"],
    question: "Next.js-এ File Upload কীভাবে implement করবেন?",
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

  // Validation
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) return { error: 'File too large (max 5MB)' };

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type' };
  }

  // Save file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = \`\${Date.now()}-\${file.name}\`;
  const filepath = path.join(process.cwd(), 'public/uploads', filename);
  
  await writeFile(filepath, buffer);
  return { success: true, url: \`/uploads/\${filename}\` };
}

// Client Component
'use client';
function UploadForm() {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    const result = await uploadFile(formData);
    
    setUploading(false);
    if (result.error) alert(result.error);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {preview && <img src={preview} alt="Preview" width={200} />}
      {uploading && <p>Uploading...</p>}
    </div>
  );
}

// Production: Use cloud storage (S3, Cloudinary)
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';</code></pre>
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
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ];
  },
};

// Rate Limiting with Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
});

// API Route with rate limiting
export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }

  // Process request...
}

// CORS in Route Handlers
export async function GET(request) {
  const response = NextResponse.json({ data: 'hello' });
  response.headers.set('Access-Control-Allow-Origin', 'https://myapp.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}</code></pre>
      </div>
    `
  },
  {
    id: "next-29",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Loading", "Streaming", "Suspense"],
    question: "Next.js-এ Loading UI এবং Streaming কীভাবে কাজ করে? User experience কীভাবে উন্নত করে?",
    answer: `
      <p>Streaming দিয়ে page-এর দ্রুত parts আগে দেখানো যায়, ধীর parts পরে load হলে replace হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// loading.tsx — Automatic Suspense boundary
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-300 rounded" />
        <div className="h-32 bg-gray-300 rounded" />
        <div className="h-32 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

// Manual Streaming with Suspense
async function DashboardPage() {
  // এটি instantly দেখাবে
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* দ্রুত data — আগে দেখাবে */}
      <UserGreeting />
      
      {/* ধীর data — Skeleton দেখাবে, তারপর replace হবে */}
      <Suspense fallback={<ChartSkeleton />}>
        <SlowAnalyticsChart />  {/* 2s API call */}
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <SlowDataTable />      {/* 3s API call */}
      </Suspense>
    </div>
  );
}

// Parallel data fetching with streaming
async function SlowAnalyticsChart() {
  // এটি আলাদাভাবে stream হবে
  const data = await fetch('/api/analytics', { cache: 'no-store' });
  return <Chart data={data} />;
}

// Traditional approach (ধীর — সব data আসার পর পুরো page দেখায়):
// Total wait = 2s + 3s = 5s

// Streaming approach (দ্রুত — parts আগে দেখায়):
// User sees content in < 100ms
// Charts appear after 2s
// Table appears after 3s</code></pre>
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
        <pre><code># Monorepo structure
my-turborepo/
├── apps/
│   ├── web/               # Next.js main app
│   │   ├── app/
│   │   ├── next.config.js
│   │   └── package.json
│   ├── admin/             # Next.js admin panel
│   │   ├── app/
│   │   └── package.json
│   └── docs/              # Next.js docs site
├── packages/
│   ├── ui/                # Shared React components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── database/          # Prisma client
│   │   ├── prisma/
│   │   └── package.json
│   ├── config-eslint/     # Shared ESLint config
│   ├── config-typescript/ # Shared TS config
│   └── utils/             # Shared utilities
├── turbo.json
├── pnpm-workspace.yaml
└── package.json</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// packages/ui/src/Button.tsx
export function Button({ children, variant = 'primary', ...props }) {
  return <button className={styles[variant]} {...props}>{children}</button>;
}

// apps/web/app/page.tsx — Shared component ব্যবহার
import { Button } from '@repo/ui';

export default function HomePage() {
  return <Button variant="primary">Get Started</Button>;
}

// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "lint": { "dependsOn": ["^build"] },
    "test": { "dependsOn": ["^build"] }
  }
}

// Commands:
// turbo run build    — সব apps build (parallel + cached)
// turbo run dev      — সব apps dev mode
// turbo run build --filter=web  — শুধু web app build</code></pre>
      </div>
    `
  },
  {
    id: "next-31",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Redirects", "Rewrites", "Config"],
    question: "Next.js-এ Redirects এবং Rewrites কীভাবে configure করবেন? পার্থক্য কী?",
    answer: `
      <h4>Redirect vs Rewrite:</h4>
      <ul>
        <li><strong>Redirect:</strong> URL পরিবর্তন হয়, user দেখতে পায় (301/302/307/308)</li>
        <li><strong>Rewrite:</strong> URL একই থাকে, internally অন্য path serve করে (proxy-like)</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// next.config.js
module.exports = {
  async redirects() {
    return [
      // Permanent redirect (308)
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Temporary redirect (307)
      {
        source: '/maintenance',
        destination: '/',
        permanent: false,
      },
      // With regex
      {
        source: '/blog/:slug(\\\\d{4}-\\\\d{2}-.*)',
        destination: '/news/:slug',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      // API proxy — CORS সমস্যা সমাধান
      {
        source: '/api/external/:path*',
        destination: 'https://external-api.com/:path*',
      },
      // Legacy URL support
      {
        source: '/products/:id',
        destination: '/shop/product/:id',
      },
      // Multi-zone
      {
        source: '/blog/:path*',
        destination: 'https://blog.myapp.com/blog/:path*',
      },
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
    question: "Next.js-এ Real-time features (WebSocket, Server-Sent Events) কীভাবে implement করবেন?",
    answer: `
      <p>Next.js-এর serverless nature-এ persistent WebSocket connections চ্যালেঞ্জিং। বিভিন্ন approach আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Approach 1: Server-Sent Events (SSE) — Simple, one-way
// app/api/events/route.ts
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      // Send events periodically
      const interval = setInterval(() => {
        const data = JSON.stringify({ time: new Date().toISOString() });
        controller.enqueue(encoder.encode(\`data: \${data}\\n\\n\`));
      }, 1000);
      
      // Cleanup
      setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, 30000); // 30s timeout
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Client
'use client';
function LiveUpdates() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const source = new EventSource('/api/events');
    source.onmessage = (e) => {
      setEvents(prev => [...prev, JSON.parse(e.data)]);
    };
    return () => source.close();
  }, []);
}

// Approach 2: Third-party real-time services (recommended)
// Pusher, Ably, Supabase Realtime, Liveblocks
import Pusher from 'pusher-js';

function Chat() {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => setMessages(prev => [...prev, data]));
    return () => pusher.unsubscribe('chat');
  }, []);
}

// Approach 3: Custom WebSocket server (separate process)
// Next.js + separate ws server on different port</code></pre>
      </div>
    `
  },
  {
    id: "next-33",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Migration", "Pages to App Router"],
    question: "Next.js Pages Router থেকে App Router-এ কীভাবে migrate করবেন? Step-by-step strategy কী?",
    answer: `
      <h4>Incremental Migration Strategy:</h4>
      <ol>
        <li><strong>Phase 1:</strong> app/ directory তৈরি করুন, pages/ সাথে co-exist করবে</li>
        <li><strong>Phase 2:</strong> Static pages আগে migrate করুন (সহজ)</li>
        <li><strong>Phase 3:</strong> Dynamic pages migrate করুন</li>
        <li><strong>Phase 4:</strong> API routes migrate করুন</li>
        <li><strong>Phase 5:</strong> pages/ directory মুছে ফেলুন</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// BEFORE: pages/blog/[slug].tsx
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return { props: { post }, revalidate: 60 };
}

export default function BlogPost({ post }) {
  return <article>{post.title}</article>;
}

// AFTER: app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export const revalidate = 60;

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.title}</article>;
}

// BEFORE: pages/_app.tsx (global layout)
// AFTER: app/layout.tsx

// BEFORE: pages/api/users.ts
// AFTER: app/api/users/route.ts

// BEFORE: getServerSideProps
// AFTER: export const dynamic = 'force-dynamic' + async component

// Key differences:
// - No more getStaticProps/getServerSideProps
// - Components are async by default (Server Components)
// - Layouts persist across navigations
// - loading.tsx replaces manual loading states</code></pre>
      </div>
    `
  },
  {
    id: "next-34",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["State Management", "Server State", "Client State"],
    question: "Next.js App Router-এ State Management strategy কী হওয়া উচিত? Server State vs Client State কীভাবে handle করবেন?",
    answer: `
      <p>App Router-এ state management paradigm আলাদা কারণ Server Components-এ useState/useEffect নেই।</p>
      <h4>State Categories in Next.js:</h4>
      <ol>
        <li><strong>Server State:</strong> DB data → Server Components-এ সরাসরি fetch করুন</li>
        <li><strong>URL State:</strong> Filters, search, pagination → searchParams ব্যবহার করুন</li>
        <li><strong>Form State:</strong> Server Actions + useActionState</li>
        <li><strong>Client UI State:</strong> Modals, tabs, toasts → Zustand বা useState</li>
        <li><strong>Real-time State:</strong> WebSocket data → Client Component</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Server State — NO state management library needed!
async function ProductsPage({ searchParams }) {
  const category = searchParams.category || 'all';
  const products = await prisma.product.findMany({
    where: category !== 'all' ? { category } : {},
  });
  return <ProductList products={products} />;
}

// 2. URL State — searchParams as state
'use client';
function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(\`\${pathname}?\${params.toString()}\`);
  };

  return (
    <select onChange={(e) => setFilter('category', e.target.value)}>
      <option value="all">All</option>
      <option value="electronics">Electronics</option>
    </select>
  );
}

// 3. Client UI State — Zustand (lightweight)
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set(s => ({ isSidebarOpen: !s.isSidebarOpen })),
}));

// ❌ Avoid: Redux/Context for server-fetched data
// ✅ Use: Server Components + searchParams + Zustand (UI only)</code></pre>
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
        <pre><code># Create Next.js app with all recommendations
npx create-next-app@latest my-app \\
  --typescript \\
  --tailwind \\
  --eslint \\
  --app \\
  --src-dir \\
  --import-alias "@/*"

cd my-app
npm run dev</code></pre>
      </div>
      <h4>Recommended Project Structure:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>src/
├── app/                    # App Router
│   ├── (auth)/            # Route group (no URL impact)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── layout.tsx     # Dashboard layout
│   │   ├── page.tsx
│   │   └── settings/
│   ├── api/
│   │   └── users/
│   │       └── route.ts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home
│   ├── loading.tsx
│   ├── error.tsx
│   └── globals.css
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── features/          # Feature-specific components
│       ├── auth/
│       └── dashboard/
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # NextAuth config
│   └── utils.ts
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
├── actions/               # Server Actions
└── middleware.ts</code></pre>
      </div>
    `
  },
  {
    id: "next-36",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Route Groups", "Organization"],
    question: "Next.js Route Groups কী? কীভাবে URL-এ প্রভাব না ফেলে routes organize করবেন?",
    answer: `
      <p><strong>Route Groups</strong> <code>(parentheses)</code> দিয়ে তৈরি হয় এবং URL path-এ include হয় না। Routes organize করতে এবং আলাদা layouts দিতে ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Route Groups — () URL-এ reflect হয় না
app/
├── (marketing)/           # Marketing pages group
│   ├── layout.tsx         # Marketing layout (no sidebar)
│   ├── page.tsx           # / (home)
│   ├── about/page.tsx     # /about
│   └── pricing/page.tsx   # /pricing
├── (dashboard)/           # Dashboard pages group
│   ├── layout.tsx         # Dashboard layout (with sidebar)
│   ├── dashboard/page.tsx # /dashboard
│   ├── settings/page.tsx  # /settings
│   └── profile/page.tsx   # /profile
└── (auth)/                # Auth pages group
    ├── layout.tsx         # Auth layout (centered card)
    ├── login/page.tsx     # /login
    └── register/page.tsx  # /register</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// (marketing)/layout.tsx — No sidebar, full width
export default function MarketingLayout({ children }) {
  return (
    <div>
      <MarketingNav />
      <main className="max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

// (dashboard)/layout.tsx — With sidebar
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

// (auth)/layout.tsx — Centered card
export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-37",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["next.config", "Configuration", "Plugins"],
    question: "next.config.js-এর গুরুত্বপূর্ণ configuration options কী কী?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output mode
  output: 'standalone', // Docker-friendly minimal build
  // output: 'export',  // Static HTML export

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // Environment variables
  env: { CUSTOM_KEY: 'value' },

  // Redirects
  async redirects() {
    return [{ source: '/old', destination: '/new', permanent: true }];
  },

  // Rewrites (proxy)
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'https://api.backend.com/:path*' }];
  },

  // Headers
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
    }];
  },

  // Webpack customization
  webpack: (config, { isServer }) => {
    config.module.rules.push({ test: /\\.svg$/, use: ['@svgr/webpack'] });
    return config;
  },

  // Experimental features
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
    optimizePackageImports: ['lodash', 'lucide-react'],
  },

  // TypeScript & ESLint
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  // Performance
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true,

  // Logging
  logging: { fetches: { fullUrl: true } },
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
    question: "Next.js-এ Dynamic Import এবং Client-only components কীভাবে handle করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import dynamic from 'next/dynamic';

// 1. Basic dynamic import with loading
const HeavyChart = dynamic(() => import('../components/Chart'), {
  loading: () => <div className="skeleton-chart">Loading chart...</div>,
});

// 2. Disable SSR — browser-only components
const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false,  // ❌ Server-এ render হবে না (Leaflet, D3 etc.)
  loading: () => <div>Loading map...</div>,
});

// 3. Named export
const Tab = dynamic(() => import('../components/Tabs').then(mod => mod.Tab));

// 4. Multiple components lazy load
const AdminPanel = dynamic(() => import('../components/AdminPanel'), {
  ssr: false,
});

// Usage
function Dashboard() {
  const [showAdmin, setShowAdmin] = useState(false);
  
  return (
    <div>
      <HeavyChart data={chartData} />
      <MapComponent />
      
      <button onClick={() => setShowAdmin(true)}>
        Show Admin Panel
      </button>
      {showAdmin && <AdminPanel />}
    </div>
  );
}

// ⚠️ Common SSR errors and fixes:
// Error: "window is not defined"
// Fix 1: dynamic(() => import('./Component'), { ssr: false })

// Fix 2: useEffect check
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : null;
}

// Fix 3: typeof window check (in utility functions)
const isClient = typeof window !== 'undefined';</code></pre>
      </div>
    `
  },
  {
    id: "next-39",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Email", "Notification", "Background Jobs"],
    question: "Next.js-এ Email পাঠানো, Background Jobs এবং Cron Jobs কীভাবে implement করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Email — Resend (recommended)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Server Action
'use server';
export async function sendWelcomeEmail(email, name) {
  await resend.emails.send({
    from: 'My App <hello@myapp.com>',
    to: email,
    subject: \`Welcome, \${name}!\`,
    react: <WelcomeEmail name={name} />,
  });
}

// React Email template
function WelcomeEmail({ name }) {
  return (
    <Html>
      <Body style={{ fontFamily: 'sans-serif' }}>
        <Heading>স্বাগতম, {name}!</Heading>
        <Text>আপনার অ্যাকাউন্ট তৈরি হয়েছে।</Text>
        <Button href="https://myapp.com/dashboard">
          Dashboard-এ যান
        </Button>
      </Body>
    </Html>
  );
}

// Background Jobs — Vercel Cron or Inngest
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * *"
    }
  ]
}

// app/api/cron/cleanup/route.ts
export async function GET(request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== \`Bearer \${process.env.CRON_SECRET}\`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Cleanup old sessions
  await prisma.session.deleteMany({
    where: { expiresAt: { lt: new Date() } }
  });

  return Response.json({ success: true });
}

// Inngest (recommended for complex workflows)
import { Inngest } from 'inngest';

const inngest = new Inngest({ id: 'my-app' });

export const processOrder = inngest.createFunction(
  { id: 'process-order' },
  { event: 'order/created' },
  async ({ event, step }) => {
    await step.run('charge-payment', async () => {
      return stripe.charges.create({ amount: event.data.total });
    });
    await step.run('send-confirmation', async () => {
      return sendEmail(event.data.customerEmail);
    });
    await step.sleep('wait-for-review', '3 days');
    await step.run('request-review', async () => {
      return sendReviewRequest(event.data.customerEmail);
    });
  }
);</code></pre>
      </div>
    `
  },
  {
    id: "next-40",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Observability", "Logging", "Monitoring"],
    question: "Production Next.js app-এ Logging, Error Tracking এবং Monitoring কীভাবে সেটআপ করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// 1. Sentry — Error tracking
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% performance traces
  replaysSessionSampleRate: 0.1,
  environment: process.env.NODE_ENV,
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration(),
  ],
});

// Custom error logging
export function logError(error, context = {}) {
  Sentry.withScope((scope) => {
    Object.entries(context).forEach(([key, value]) => {
      scope.setExtra(key, value);
    });
    Sentry.captureException(error);
  });
}

// 2. Structured Logging — Pino
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' 
    ? { target: 'pino-pretty' } 
    : undefined,
});

// API Route-এ ব্যবহার
export async function POST(request) {
  const requestId = crypto.randomUUID();
  logger.info({ requestId, path: '/api/users' }, 'Request received');
  
  try {
    const user = await createUser(data);
    logger.info({ requestId, userId: user.id }, 'User created');
    return NextResponse.json(user);
  } catch (error) {
    logger.error({ requestId, error: error.message }, 'User creation failed');
    throw error;
  }
}

// 3. instrumentation.ts (Next.js 13.4+)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
}

// 4. Health check endpoint
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
    question: "Next.js Server Components-এ cookies এবং headers কীভাবে access ও modify করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>import { cookies, headers } from 'next/headers';

// Server Component-এ cookies read
async function UserPreferences() {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value || 'dark';
  const locale = cookieStore.get('locale')?.value || 'bn';
  
  return <div>Theme: {theme}, Locale: {locale}</div>;
}

// Server Component-এ headers read
async function GeoContent() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  const ip = headersList.get('x-forwarded-for');
  const country = headersList.get('x-vercel-ip-country') || 'BD';
  
  return <div>Country: {country}</div>;
}

// Server Action-এ cookies set
'use server';
export async function setTheme(theme) {
  cookies().set('theme', theme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
}

export async function clearSession() {
  cookies().delete('session-token');
}

// Route Handler-এ cookies
export async function GET(request) {
  const token = request.cookies.get('auth-token')?.value;
  
  const response = NextResponse.json({ data: 'hello' });
  response.cookies.set('visited', 'true', { maxAge: 3600 });
  return response;
}

// ⚠️ cookies() ও headers() ডায়নামিক function — 
// যেকোনো page এগুলো ব্যবহার করলে SSR হবে (static হবে না)</code></pre>
      </div>
    `
  },
  {
    id: "next-42",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Stripe", "Payment", "E-commerce"],
    question: "Next.js-এ Payment Integration (Stripe) কীভাবে করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

// Server Action — Checkout session create
'use server';
export async function createCheckoutSession(cartItems) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map(item => ({
      price_data: {
        currency: 'bdt',
        product_data: { name: item.name, images: [item.image] },
        unit_amount: item.price * 100, // Paisa-তে
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cart\`,
    metadata: { userId: session.user.id },
  });

  redirect(session.url);
}

// Webhook — Payment confirmation
// app/api/webhooks/stripe/route.ts
export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body, signature, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response('Webhook error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await prisma.order.create({
        data: {
          userId: session.metadata.userId,
          amount: session.amount_total / 100,
          status: 'paid',
          stripeSessionId: session.id,
        },
      });
      await sendOrderConfirmation(session.customer_email);
      break;
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
    question: "Next.js App Router-এ Server-side Pagination এবং Infinite Scroll কীভাবে implement করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Server-side Pagination with searchParams
// app/products/page.tsx
async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({ skip: offset, take: limit }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <ProductGrid products={products} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}

// Pagination Component (Client)
'use client';
function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(\`\${pathname}?\${params.toString()}\`);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => goToPage(currentPage - 1)} 
        disabled={currentPage <= 1}>Previous</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i + 1} onClick={() => goToPage(i + 1)}
          className={currentPage === i + 1 ? 'active' : ''}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => goToPage(currentPage + 1)} 
        disabled={currentPage >= totalPages}>Next</button>
    </div>
  );
}

// Infinite Scroll (Client + Server Action)
'use client';
function InfiniteProductList({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        const nextPage = page + 1;
        const newProducts = await loadMoreProducts(nextPage);
        if (newProducts.length === 0) setHasMore(false);
        setProducts(prev => [...prev, ...newProducts]);
        setPage(nextPage);
        setLoading(false);
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  return (
    <>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
      <div ref={observerRef}>{loading && <Spinner />}</div>
    </>
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-44",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Error", "Validation", "Zod"],
    question: "Next.js Server Actions-এ input validation এবং error handling কীভাবে করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// lib/validations.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষর হতে হবে'),
  email: z.string().email('সঠিক ইমেইল দিন'),
  password: z.string()
    .min(8, 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষর')
    .regex(/[A-Z]/, 'কমপক্ষে একটি বড় হাতের অক্ষর')
    .regex(/[0-9]/, 'কমপক্ষে একটি সংখ্যা'),
  role: z.enum(['user', 'admin']).default('user'),
});

// Server Action with validation
'use server';
export async function createUser(prevState, formData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // Validate
  const validatedFields = createUserSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    await prisma.user.create({
      data: { ...validatedFields.data, password: hashedPassword },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return { errors: { email: ['এই ইমেইল আগে থেকে আছে'] } };
    }
    return { message: 'সার্ভারে সমস্যা হয়েছে' };
  }

  revalidatePath('/users');
  redirect('/users');
}

// Client Form with error display
'use client';
function RegisterForm() {
  const [state, formAction] = useActionState(createUser, { errors: {} });

  return (
    <form action={formAction}>
      <div>
        <input name="name" placeholder="নাম" />
        {state.errors?.name && <p className="error">{state.errors.name[0]}</p>}
      </div>
      <div>
        <input name="email" type="email" placeholder="ইমেইল" />
        {state.errors?.email && <p className="error">{state.errors.email[0]}</p>}
      </div>
      <div>
        <input name="password" type="password" placeholder="পাসওয়ার্ড" />
        {state.errors?.password?.map((err, i) => (
          <p key={i} className="error">{err}</p>
        ))}
      </div>
      {state.message && <p className="error">{state.message}</p>}
      <SubmitButton />
    </form>
  );
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
        <li><strong>Feature-based organization:</strong> Technical concern না, feature অনুযায়ী organize করুন</li>
        <li><strong>Server-first mindset:</strong> Client Component সর্বনিম্ন রাখুন</li>
        <li><strong>Colocation:</strong> Related code কাছাকাছি রাখুন</li>
        <li><strong>Type safety:</strong> End-to-end TypeScript</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code># Lead Developer's Architecture
src/
├── app/                    # Routes only — thin layer
│   ├── (public)/
│   │   ├── page.tsx        # Just calls <HomePage />
│   │   └── blog/[slug]/
│   └── (auth)/
│       └── dashboard/
│           ├── page.tsx    # Minimal — data fetch + component
│           └── loading.tsx
├── features/               # Business logic
│   ├── auth/
│   │   ├── components/    # Auth-specific components
│   │   ├── actions/       # Server actions
│   │   ├── hooks/         # Client hooks
│   │   ├── lib/           # Auth utilities
│   │   └── types.ts
│   ├── products/
│   │   ├── components/
│   │   ├── actions/
│   │   ├── queries/       # Data access layer
│   │   └── types.ts
├── components/             # Shared UI
│   ├── ui/                # Atomic (Button, Input)
│   └── layout/            # Layout components
├── lib/                    # Infrastructure
│   ├── db.ts
│   ├── auth.ts
│   └── email.ts
└── middleware.ts</code></pre>
      </div>
      <h4>Code Review Guidelines:</h4>
      <ul>
        <li>✅ 'use client' সর্বনিম্ন boundary-তে রাখুন (leaf components)</li>
        <li>✅ Data fetching Server Components-এ রাখুন, Client-এ না</li>
        <li>✅ Server Actions-এ সবসময় input validate করুন (Zod)</li>
        <li>✅ Environment variables-এ secrets NEXT_PUBLIC_ দিয়ে expose করবেন না</li>
        <li>✅ Error boundaries প্রতিটি feature-এর root-এ রাখুন</li>
        <li>✅ Caching strategy document করুন — কোন data কখন revalidate হবে</li>
      </ul>
    `
  },
  {
    id: "next-46",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["usePathname", "useSearchParams", "Hooks"],
    question: "Next.js App Router-এর নতুন navigation hooks কী কী এবং কীভাবে ব্যবহার করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>'use client';
import { 
  useRouter, 
  usePathname, 
  useSearchParams, 
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments
} from 'next/navigation';

function NavigationExample() {
  // 1. useRouter — Programmatic navigation
  const router = useRouter();
  router.push('/dashboard');     // Navigate
  router.replace('/login');      // Replace history
  router.back();                 // Go back
  router.forward();              // Go forward
  router.refresh();              // Re-fetch server data (no full reload)
  router.prefetch('/about');     // Prefetch route

  // 2. usePathname — Current URL path
  const pathname = usePathname(); // e.g., '/blog/my-post'

  // 3. useSearchParams — Query parameters
  const searchParams = useSearchParams();
  const query = searchParams.get('q');      // ?q=react → 'react'
  const page = searchParams.get('page');    // ?page=2 → '2'

  // 4. useParams — Dynamic route params
  const params = useParams();
  // app/blog/[slug]/page → params.slug
  // app/shop/[...categories]/page → params.categories (array)

  // 5. useSelectedLayoutSegment — Active route segment
  const segment = useSelectedLayoutSegment();
  // Layout-এ কোন child page active তা জানায়
  // Navbar active state-এর জন্য

  // 6. useSelectedLayoutSegments — All active segments
  const segments = useSelectedLayoutSegments();
  // Breadcrumb তৈরিতে কাজে আসে

  // Practical Example: Active NavLink
  return (
    <nav>
      {['/dashboard', '/settings', '/profile'].map(href => (
        <Link 
          key={href} 
          href={href}
          className={pathname === href ? 'text-blue-500 font-bold' : ''}
        >
          {href.replace('/', '')}
        </Link>
      ))}
    </nav>
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
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\\/\\/fonts\\.googleapis\\.com/,
      handler: 'CacheFirst',
      options: { cacheName: 'google-fonts', expiration: { maxEntries: 20 } },
    },
    {
      urlPattern: /^https:\\/\\/api\\.myapp\\.com/,
      handler: 'NetworkFirst',
      options: { cacheName: 'api-cache', expiration: { maxEntries: 50 } },
    },
  ],
});

module.exports = withPWA({ /* other config */ });

// app/manifest.ts — Web App Manifest
export default function manifest() {
  return {
    name: 'My App',
    short_name: 'MyApp',
    description: 'Best app ever',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#6366f1',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

// layout.tsx — Manifest link
export const metadata = {
  manifest: '/manifest.webmanifest',
  themeColor: '#6366f1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'My App',
  },
};

// PWA Features:
// ✅ Install prompt on mobile
// ✅ Offline support with cached pages
// ✅ Push notifications
// ✅ Home screen icon
// ✅ Splash screen</code></pre>
      </div>
    `
  },
  {
    id: "next-48",
    category: "Next.js",
    difficulty: "Intermediate",
    tags: ["Sitemap", "Robots", "SEO"],
    question: "Next.js-এ Sitemap, Robots.txt এবং OpenGraph images কীভাবে generate করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app/sitemap.ts — Dynamic Sitemap
export default async function sitemap() {
  const baseUrl = 'https://myapp.com';

  // Static pages
  const staticPages = ['', '/about', '/contact', '/pricing'].map(route => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic pages from DB
  const posts = await prisma.post.findMany({
    select: { slug: true, updatedAt: true },
  });

  const dynamicPages = posts.map(post => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...dynamicPages];
}

// app/robots.ts
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://myapp.com/sitemap.xml',
  };
}

// app/opengraph-image.tsx — Dynamic OG Image
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 60, fontWeight: 'bold',
      }}>
        My Awesome App
      </div>
    ),
    { ...size }
  );
}

// Per-page OG image: app/blog/[slug]/opengraph-image.tsx
export default async function OGImage({ params }) {
  const post = await getPost(params.slug);
  return new ImageResponse(
    <div style={{ /* ... */ }}>{post.title}</div>,
    { width: 1200, height: 630 }
  );
}</code></pre>
      </div>
    `
  },
  {
    id: "next-49",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Interview", "System Design", "Architecture"],
    question: "Next.js দিয়ে E-commerce platform-এর System Design কীভাবে করবেন? (Senior/Lead Interview Question)",
    answer: `
      <h4>Requirements Analysis:</h4>
      <ul>
        <li><strong>Functional:</strong> Product listing, search, cart, checkout, payment, order tracking</li>
        <li><strong>Non-functional:</strong> SEO-friendly, fast LCP, mobile responsive, scalable</li>
      </ul>
      <h4>Architecture Decision:</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Rendering Strategy per Page:
├── Home Page        → ISR (revalidate: 3600) — Hero + featured products
├── Product Listing  → SSR + Streaming — Filters in URL, real-time stock
├── Product Detail   → ISR (revalidate: 60) — Static + dynamic stock
├── Cart             → Client-side — Zustand store
├── Checkout         → SSR — Secure, server-validated
├── Order History    → SSR — User-specific, authenticated
├── Search Results   → SSR — Dynamic, SEO-friendly
└── Blog / FAQ       → SSG — Fully static

Tech Stack:
├── Framework:     Next.js 14+ (App Router)
├── Database:      PostgreSQL + Prisma
├── Cache:         Redis (session, cart, product cache)
├── Search:        Algolia / Meilisearch
├── Payment:       Stripe
├── Auth:          NextAuth.js v5
├── State:         Zustand (cart) + React Query (server state)
├── Image CDN:     Cloudinary / next/image
├── Monitoring:    Sentry + Vercel Analytics
├── Deployment:    Vercel (Edge + Serverless)
└── CI/CD:         GitHub Actions

Data Flow:
1. Product pages → ISR cached, revalidate on admin update (tag-based)
2. Cart → Client-side Zustand, sync to server on checkout
3. Checkout → Server Action with Stripe, webhook for confirmation
4. Search → Algolia index, synced via webhook on product CRUD</code></pre>
      </div>
      <h4>Key Decisions to Explain in Interview:</h4>
      <ul>
        <li>কেন ISR product pages-এর জন্য SSR-এর চেয়ে ভালো (কম server load, CDN cached)</li>
        <li>কেন cart client-side রাখা হয়েছে (instant UX, no server round-trip)</li>
        <li>কেন Streaming ব্যবহার হয়েছে product listing-এ (filters fast, product grid streams in)</li>
        <li>কেন tag-based revalidation (admin product update → specific pages refresh)</li>
      </ul>
    `
  },
  {
    id: "next-50",
    category: "Next.js",
    difficulty: "Advanced",
    tags: ["Turbopack", "Compiler", "Future"],
    question: "Next.js Turbopack কী? Webpack-এর চেয়ে কেন দ্রুত? Next.js-এর ভবিষ্যৎ কোথায় যাচ্ছে?",
    answer: `
      <p><strong>Turbopack</strong> হলো Vercel-এর তৈরি Rust-based bundler যা Webpack-কে replace করতে চায়। Next.js 14+ এ dev server-এ ব্যবহৃত হচ্ছে।</p>
      <h4>কেন দ্রুত:</h4>
      <ul>
        <li><strong>Rust-based:</strong> JavaScript-এর চেয়ে ১০-১০০x দ্রুত execution</li>
        <li><strong>Incremental computation:</strong> শুধু পরিবর্তিত অংশ rebuild করে</li>
        <li><strong>Lazy bundling:</strong> শুধু requested page-এর code bundle করে</li>
        <li><strong>Function-level caching:</strong> আগের computation reuse করে</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># Turbopack দিয়ে dev server চালান
next dev --turbo

# Performance comparison (large app):
# Webpack:    ~3.5s cold start
# Turbopack:  ~400ms cold start

# HMR (file change):
# Webpack:    ~500ms
# Turbopack:  ~10ms</code></pre>
      </div>
      <h4>Next.js-এর ভবিষ্যৎ Direction:</h4>
      <ol>
        <li><strong>Partial Prerendering (PPR):</strong> Static shell + dynamic holes — best of SSG + SSR</li>
        <li><strong>React 19 Integration:</strong> Server Actions stable, useOptimistic, use() hook</li>
        <li><strong>Turbopack Production:</strong> Build-এও Turbopack (currently dev only)</li>
        <li><strong>Better DX:</strong> Improved error messages, faster refresh</li>
        <li><strong>Edge-first:</strong> আরও বেশি functionality Edge Runtime-এ</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Partial Prerendering (experimental)
// Static shell build time-এ render, dynamic parts runtime-এ stream
export const experimental_ppr = true;

async function ProductPage({ params }) {
  return (
    <div>
      {/* Static — build time */}
      <ProductInfo id={params.id} />
      
      <Suspense fallback={<StockSkeleton />}>
        {/* Dynamic — streamed at request time */}
        <StockStatus id={params.id} />
      </Suspense>
    </div>
  );
}</code></pre>
      </div>
    `
  }
];
