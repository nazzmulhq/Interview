const expressjsQuestions = [
  {
    id: "express-1",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Middleware", "Architecture", "next()"],
    question: "Express.js-এ Middleware কী? next() এবং next(err) কীভাবে রিকোয়েস্ট-রেসপন্স সাইকেল নিয়ন্ত্রণ করে?",
    answer: `
      <p><strong>Middleware</strong> হলো এমন ফাংশন যার কাছে Request Object (<code>req</code>), Response Object (<code>res</code>), এবং রিকোয়েস্ট-রেসপন্স সাইকেলের পরবর্তী মিডলওয়্যার ফাংশন <code>next</code>-এর অ্যাক্সেস থাকে।</p>
      <h4>Middleware-এর মূল দায়িত্ব:</h4>
      <ul>
        <li>যে কোনো কোড রান করা।</li>
        <li>Request এবং Response অবজেক্টে পরিবর্তন আনা (যেমন: user authentication data যুক্ত করা)।</li>
        <li>রিকোয়েস্ট-রেসপন্স সাইকেল শেষ করে দেওয়া (<code>res.send()</code> বা <code>res.json()</code>)।</li>
        <li>পরবর্তী মিডলওয়্যার কল করা (<code>next()</code>)।</li>
      </ul>
      <h4>next() vs next(err):</h4>
      <ul>
        <li><code>next()</code>: স্ট্যাকের পরবর্তী সাধারণ মিডলওয়্যার ফাংশনে কন্ট্রোল পাঠিয়ে দেয়।</li>
        <li><code>next(err)</code>: কোনো আর্গুমেন্ট পাস করলে Express বর্তমান বাকি সাধারণ মিডলওয়্যারগুলো স্কিপ করে সরাসরি <strong>Error Handling Middleware</strong>-এ জাম্প করে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return next(new Error('Unauthorized Access')); // Jump to Error Handler
  }
  req.user = { id: 123 }; // Modifying req object
  next(); // Pass to next handler
};</code></pre>
      </div>
    `
  },
  {
    id: "express-2",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Error Handling", "Async", "Express 5"],
    question: "Express.js-এ Custom Global Error Handler কীভাবে লিখবেন? Async route handler-এর এরর কীভাবে ক্যাচ করবেন?",
    answer: `
      <p>Express.js-এ গ্লোবাল এরর হ্যান্ডলিং মিডলওয়্যার তৈরি করার জন্য চার্টি (৪টি) প্যারামিটার থাকা বাধ্যতামূলক: <code>(err, req, res, next)</code>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});</code></pre>
      </div>
      <h4>Async Route Handler-এর এরর ক্যাচ করা:</h4>
      <p>Express v4-এ asynchronous <code>Promise.reject</code> বা <code>throw error</code> স্বয়ংক্রিয়ভাবে ধরা পড়ে না। তাই <code>try-catch</code> লিখে <code>next(err)</code> দিতে হয় অথবা <code>express-async-handler</code> র‍্যাপার ব্যবহার করতে হয়।</p>
      <p><em>নোট:</em> <strong>Express v5</strong>-এ Async handler-এর Unhandled Rejections স্বয়ংক্রিয়ভাবে গ্লোবাল এরর হ্যান্ডলারে চলে যায়।</p>
    `
  },
  {
    id: "express-3",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Rate Limit", "CORS"],
    question: "Express.js সার্ভারকে নিরাপদ (Security Best Practices) করার জন্য কী কী পদক্ষেপ নেওয়া উচিত?",
    answer: `
      <p>প্রোডাকশন লেভেলে একটি Express.js অ্যাপ্লিকেশনকে বিভিন্ন ধরনের সিকিউরিটি অ্যাটাক (XSS, CSRF, DDoS, SQL/NoSQL Injection) থেকে রক্ষা করার জন্য নিম্নের পদক্ষেপগুলো নেওয়া আবশ্যক:</p>
      <ol>
        <li><strong>Helmet.js:</strong> HTTP সিকিউরিটি হেডারের (X-DNS-Prefetch-Control, X-Frame-Options, Strict-Transport-Security ইত্যাদি) জন্য <code>app.use(helmet())</code> ব্যবহার করা।</li>
        <li><strong>Rate Limiting:</strong> Brute-force এবং DDoS প্রতিরোধে <code>express-rate-limit</code> দিয়ে আইপি ভিত্তিক রিকোয়েস্ট সামলানো।</li>
        <li><strong>CORS Configuration:</strong> কেবল বিশ্বস্ত ডোমেইনগুলোকে অনুমতি দেওয়া (<code>cors({ origin: 'https://myclient.com' })</code>)।</li>
        <li><strong>Data Sanitization:</strong> NoSQL Query Injection প্রতিরোধে <code>express-mongo-sanitize</code> এবং XSS থেকে বাঁচতে <code>xss-clean</code> ব্যবহার।</li>
        <li><strong>Hide Technology Stack:</strong> <code>app.disable('x-powered-by')</code> দিয়ে সার্ভারের নাম গোপন রাখা।</li>
      </ol>
    `
  },
  {
    id: "express-4",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["JWT", "Auth", "Cookies"],
    question: "Express.js-এ JWT Authentication কীভাবে বাস্তবায়ন করবেন? Access Token এবং Refresh Token-এর সেরা নিরাপত্তা কৌশল কী?",
    answer: `
      <p>JSON Web Token (JWT) হলো স্টেটলেস অথেনটিকেশনের সবচেয়ে জনপ্রিয় মাধ্যম।</p>
      <h4>নিরাপত্তা কৌশল (Security Best Practices):</h4>
      <ul>
        <li>Access Token কখনো <code>localStorage</code>-এ স্টোর করা উচিত নয় (XSS অ্যাটাকের ঝুঁকি থাকে)।</li>
        <li><strong>HTTP-Only Cookie:</strong> Access Token ও Refresh Token উভয়ই <code>httpOnly: true</code>, <code>secure: true</code> (HTTPS), এবং <code>sameSite: 'strict'</code> কুকিতে স্টোর করা সবচেয়ে নিরাপদ।</li>
        <li>Access Token-এর মেয়াদ কম রাখা (যেমন 15 minutes) এবং Refresh Token ব্যবহার করে নতুন Token জেনারেট করার মেকানিজম রাখা।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Setting JWT in HttpOnly Cookie
res.cookie('token', token, {
  httpOnly: true, // Prevents client-side JS from reading cookie
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict', // Protects against CSRF
  maxAge: 15 * 60 * 1000 // 15 mins
});</code></pre>
      </div>
    `
  },
  {
    id: "express-5",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Routing", "Router", "Modular Code"],
    question: "express.Router() কী? কীভাবে একটি স্কেলএবল ও মডুলার রাউটিং স্ট্রাকচার তৈরি করবেন?",
    answer: `
      <p><code>express.Router()</code> হলো একটি মিনি-অ্যাপ্লিকেশন (Mini-app) বা আইসোলেটেড রাউটিং ইনস্ট্যান্স, যা দিয়ে অ্যাপ্লিকেশনের বিভিন্ন রাউট মডিউল আকারে ভাগ করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/profile', getUserProfile);
router.post('/login', loginUser);

module.exports = router;

// app.js
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/users', userRoutes);</code></pre>
      </div>
      <h4>সুবিধা:</h4>
      <ul>
        <li>কোডবেস পরিচ্ছন্ন ও মডুলার থাকে।</li>
        <li>নির্দিষ্ট রাউট গ্রুপিংয়ের ওপর আলাদা মিডলওয়্যার অ্যানফোর্স করা যায় (যেমন <code>router.use(authCheck)</code>)।</li>
      </ul>
    `
  },
  {
    id: "express-6",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Validation", "Zod", "Joi"],
    question: "Request Payload Validation (Body, Query, Params) কেন জরুরি এবং Zod/Joi দিয়ে কীভাবে কাস্টম মিডলওয়্যার লিখবেন?",
    answer: `
      <p>ইউজার ইনপুট ব্লাইন্ডলি বিশ্বাস করা সিকিউরিটি এবং অ্যাপ্লিকেশনের স্থিতিশীলতার জন্য বিপজ্জনক। ডাটাবেজে ডাটা পাঠানোর আগেই DTO (Data Transfer Object) ভ্যালিডেশন করা উচিত।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { z } = require('zod');

// Schema Definition
const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
});

// Generic Validation Middleware
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    return next();
  } catch (error) {
    return res.status(400).json({ status: 'fail', errors: error.errors });
  }
};

app.post('/register', validate(registerSchema), registerController);</code></pre>
      </div>
    `
  },
  {
    id: "express-7",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Multer", "File Upload", "Streams"],
    question: "Express.js-এ Multer ব্যবহার করে ফাইল আপলোড কীভাবে হ্যান্ডেল করবেন? ক্লাউড স্টোরেজে (S3) স্ট্রিম করার উপায় কী?",
    answer: `
      <p>Express.js নেটিভভাবে <code>multipart/form-data</code> পার্স করতে পারে না। এজন্য <code>multer</code> মিডলওয়্যার ব্যবহৃত হয়।</p>
      <h4>Multer Configuration & Security:</h4>
      <ul>
        <li><code>fileFilter:</code> কেবল নির্দিষ্ট টাইপের ফাইল (যেমন png, jpg, pdf) অনুমোদন করা।</li>
        <li><code>limits:</code> ফাইল সাইজ লিমিট (যেমন max 5MB) সেট করে Disk Exhaustion প্রতিরোধ করা।</li>
        <li><strong>Direct S3 Stream Upload:</strong> ফাইল লোকাল ডিস্কে সেভ না করে <code>multer-s3</code> বা Memory Storage ব্যবহার করে সরাসরি AWS S3 বা Cloudinary-তে ফিল্টার করে পাঠানোর অভ্যাস ভালো।</li>
      </ul>
    `
  },
  {
    id: "express-8",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Performance", "Compression", "Caching"],
    question: "Express.js অ্যাপ্লিকেশনের রেসপন্স টাইম অপ্টিমাইজেশনের প্রধান ৩টি টেকনিক কী কী?",
    answer: `
      <p>উচ্চ ট্রাফিকের অ্যাপ্লিকেশনে Express.js-এর রেসপন্স গতি বাড়াতে ৩টি মুখ্য পদ্ধতি অবলম্বন করা যায়:</p>
      <ol>
        <li><strong>Response Compression:</strong> <code>compression</code> মিডলওয়্যার ব্যবহার করে JSON এবং HTML রেসপন্সকে Gzip/Brotli ফরম্যাটে কমপ্রেস করে নেটওয়ার্ক পেলোড ৭0% পর্যন্ত কমানো যায়।</li>
        <li><strong>Caching (Redis):</strong> ঘন ঘন কুয়েরি করা ধীর গতির ডাটাবেজ রেসপন্স কে র্যাডিসে (Redis) ক্যাশে করে রাখা।</li>
        <li><strong>Asynchronous I/O Optimization:</strong> ডেটাবেজ কলগুলোকে ব্লকিং স্টাইলে না লিখে <code>Promise.all()</code> ব্যবহার করে প্যারালালে এক্সিকিউট করা।</li>
      </ol>
    `
  },
  {
    id: "express-9",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Session", "Cookie", "Redis"],
    question: "Session-based Authentication এবং Token-based Authentication-এর মধ্যে এক্সপ্রেসের দৃষ্টিকোণ থেকে সুবিধা-অসুবিধা কী?",
    answer: `
      <p><strong>Session-based (express-session):</strong> স্টেটফুল (Stateful)। সার্ভার মেমোরি বা Redis-এ সেশন আইডি স্টোর থাকে। ক্লায়েন্টকে শুধু সেশন আইডি কুকিতে পাঠানো হয়।</p>
      <p><em>সুবিধা:</em> যেকোনো সময় মেমোরি থেকে কোনো ইউজারকে তাত্ক্ষণিক রিমুভ/লগআউট করা যায়। <em>অসুবিধা:</em> একাধিক সার্ভারে লোড ব্যালেন্স করার সময় র্যাডিসের মতো কেন্দ্রীয় সেন্ট্রাল সেশন স্টোর লাগে।</p>
      <p><strong>Token-based (JWT):</strong> স্টেটলেস (Stateless)। সার্ভারে কিছু স্টোর করতে হয় না। টোকেনেই ডেটা থাকে।</p>
      <p><em>সুবিধা:</em> স্কেলেবিলিটি অত্যন্ত সহজ। <em>অসুবিধা:</em> মেয়াদ শেষ হওয়ার আগে সহজ উপায়ে টোকেন রিভোক (Revoke) করা যায় না (ব্ল্যাকলিস্টিং লাগাতে হয়)।</p>
    `
  },
  {
    id: "express-10",
    category: "Express.js",
    difficulty: "Beginner",
    tags: ["Built-in Middleware", "Body Parser"],
    question: "express.json() এবং express.urlencoded()-এর কাজ কী?",
    answer: `
      <p>Express v4.16.0-এর পর থেকে <code>body-parser</code> প্যাকেজটি এক্সপ্রেসের ভেতরে বিল্ট-ইনভাবে ইনক্লুড করা হয়েছে।</p>
      <ul>
        <li><code>app.use(express.json())</code>: এটি ইনকামিং Request Payload এর JSON বডি পার্স করে <code>req.body</code> অবজেক্ট গঠন করে।</li>
        <li><code>app.use(express.urlencoded({ extended: true }))</code>: এটি HTML Form সাবমিশনের URL-encoded ডাটাসমূহ পার্স করে <code>req.body</code>-তে উপলব্ধ করে। (<code>extended: true</code> দিলে নেস্টেড অবজেক্ট পার্স করা যায়)।</li>
      </ul>
    `
  }
,

  {
    id: "express-11",
    category: "Express.js",
    difficulty: "Beginner",
    tags: ["Views","SSR","Templates"],
    question: "Express.js-এ Template Engine (EJS, Pug) কীভাবে কাজ করে?",
    answer: `
<p>Template Engine সার্ভার সাইডে dynamic HTML পেজ জেনারেট করে ক্লায়েন্টে রেন্ডার করার কাজ সম্পাদন করে।</p>
    `
  },
  {
    id: "express-12",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Deployment","Proxy","Security"],
    question: "Express.js-এ app.set('trust proxy', true) কেন ব্যবহার করা হয়?",
    answer: `
<p>Nginx বা Reverse Proxy-এর পেছনে Express অ্যাপ থাকলে <code>trust proxy</code> ট্রু করলে Express আসল ক্লায়েন্টের IP ও HTTPS প্রোটোকল হেডার পড়তে পারে।</p>
    `
  },
  {
    id: "express-13",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Realtime","SSE","HTTP"],
    question: "Express.js-এ Server-Sent Events (SSE) কীভাবে কাজ করে?",
    answer: `
<p><code>Content-Type: text/event-stream</code> হেডার দিয়ে কানেকশন ওপেন রেখে সার্ভার থেকে রিয়েল-টাইমে একমুখী লাইভ ডাটা নোটিফিকেশন পাঠানো হয়।</p>
    `
  },
  {
    id: "express-14",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Ops","Graceful Shutdown","Process"],
    question: "Express.js-এ Graceful Shutdown কী?",
    answer: `
<p>SIGTERM সিগন্যাল শুনে রানিং রিকুয়েস্ট হ্যান্ডেল শেষ করা এবং ডাটাবেজ সকেট ও HTTP সার্ভার সকেট নিরাপদে বন্ধ করার কৌশল।</p>
    `
  },
  {
    id: "express-15",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Logging","Winston","Morgan"],
    question: "Production Express app-এ Morgan এবং Winston logger কীভাবে ব্যবহৃত হয়?",
    answer: `
<p>Morgan ইনকামিং HTTP হিট লগ করে এবং Winston সেন্ট্রালাইজডভাবে বিভিন্ন লেভেলে (info, error) JSON ফাইলে স্ট্রাকচার্ড লগ স্টোর করে।</p>
    `
  },
  {
    id: "express-16",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Testing","Supertest","Architecture"],
    question: "Integration Testing-এ app.js এবং server.js আলাদা করা কেন ভালো প্র্যাকটিস?",
    answer: `
<p>পোর্ট লিসেন বাদ দিয়ে <code>app.js</code> আলাদা রাখলে Supertest পোর্ট বাইন্ড না করেই সরাসরি Express মিডলওয়্যার ও রুট ইন্টারঅ্যাকশন টেস্ট করতে পারে।</p>
    `
  },
  {
    id: "express-17",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security","Middleware","HPP"],
    question: "HTTP Parameter Pollution (HPP) অ্যাটাক কী?",
    answer: `
<p>একই কোয়েরি প্যারামিটার একাধিকবার পাঠিয়ে অ্যাররে ইনজেকশন ঘটানো। Express-এ <code>hpp()</code> মিডলওয়্যার ডুপ্লিকেট প্যারামিটার ক্লিন করে নিরাপত্তা দেয়।</p>
    `
  },
  {
    id: "express-18",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security","CSRF","Auth"],
    question: "Cross-Site Request Forgery (CSRF) কী এবং এটি কীভাবে প্রতিরোধ করবেন?",
    answer: `
<p>ক্ষতিকর ওয়েবসাইট ব্রাউজারের কুকি ব্যবহার করে অনাকাঙ্ক্ষিত রিকুয়েস্ট পাঠানোর অ্যাটাক। CSRF token এবং <code>SameSite=Strict</code> কুকি দিয়ে এটি প্রতিরোধ করা হয়।</p>
    `
  },
  {
    id: "express-19",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Middleware", "Architecture", "Flow"],
    question: "Express.js Middleware Architecture এবং next() / next(err) কন্ট্রোল ফ্লো কীভাবে কাজ করে?",
    answer: `
<p>Express মিডলওয়্যার চেইন আকারে কাজ করে। <code>next()</code> ডাকলে পরবর্তী মিডলওয়্যারে যায়। কিন্তু <code>next(err)</code> ডাকলে এক্সপ্রেস মাঝের সব মিডলওয়্যার স্কিপ করে সরাসরি Global Error Handling Middleware-এ চলে যায়।</p>
    `
  },
  {
    id: "express-20",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Error Handling", "Global Handler", "Async"],
    question: "Express 4 vs Express 5-এ Async Error Handling-এর পার্থক্য কী? express-async-errors কেন লাগত?",
    answer: `
<p>Express 4-এ async/await মেথডে এরর হলে তা স্বয়ংক্রিয়ভাবে ধরা পড়ত না (Unhandled Rejection), try...catch দিয়ে <code>next(err)</code> ডাকতে হতো। Express 5-এ নেটিভভাবে প্রমিস রিজেকশন গ্লোবাল এরর হ্যান্ডলারে চলে যায়।</p>
    `
  },
  {
    id: "express-21",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Routing", "express.Router", "Modular"],
    question: "express.Router() দিয়ে মডুলার ও মেইনটেইনেবল রুট আর্কিটেকচার কীভাবে সাজাবেন?",
    answer: `
<p>প্রতিটি রিসোর্সের (e.g. user.routes.js, product.routes.js) জন্য আলাদা Router ইন্সট্যান্স তৈরি করে <code>app.use('/api/v1/users', userRouter)</code> দিয়ে মডুলারলি যুক্ত করা।</p>
    `
  },
  {
    id: "express-22",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Performance", "Route Matcher", "radix-tree"],
    question: "Express Route Matching Performance এবং অতিরিক্ত মিডলওয়্যার ওভারহেড কীভাবে কমাবেন?",
    answer: `
<p>গ্লোবালি সব রুটে ভারী মিডলওয়্যার ব্যবহার না করে কেবল নির্দিষ্ট প্রয়োজনীয় রুটে স্কেপ করা এবং রাউটিং অর্ডারে সর্বাধিক ব্যবহৃত রুটগুলো উপরে রাখা।</p>
    `
  },
  {
    id: "express-23",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Request", "Response", "Methods"],
    question: "req.params vs req.query vs req.body-এর পার্থক্য ও ব্যবহার কী?",
    answer: `
<p><strong>req.params:</strong> URL Path-এর ডাইনামিক সেগমেন্ট (/users/:id -> req.params.id)।</p><p><strong>req.query:</strong> URL Search Query (/search?keyword=js -> req.query.keyword)।</p><p><strong>req.body:</strong> HTTP Request-এর JSON/Form Body।</p>
    `
  },
  {
    id: "express-24",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Body Parsing", "express.json", "raw-body"],
    question: "express.json() এবং express.urlencoded() মিডলওয়্যারের কাজ কী? limit সেটিংস কেন জরুরি?",
    answer: `
<p>ইনকামিং Raw HTTP Payload পার্স করে <code>req.body</code>-তে অবজেক্ট বানায়। <code>{ limit: '10kb' }</code> সেট না করলে অ্যাটাকার বিশাল মেগাবাইটের JSON পাঠিয়ে সার্ভার মেমোরি ক্র্যাশ করাতে পারে।</p>
    `
  },
  {
    id: "express-25",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "CORS", "Preflight"],
    question: "CORS Preflight Options Request (HTTP OPTIONS) কী এবং Express-এ cors() মিডলওয়্যার কীভাবে কাজ করে?",
    answer: `
<p>Non-simple HTTP Requests (যেমন: Custom Header বা PUT/DELETE) পাঠানোর আগে ব্রাউজার স্বয়ংক্রিয়ভাবে <code>OPTIONS</code> রিকুয়েস্ট পাঠিয়ে পারমিশন নিশ্চিত হয়। <code>cors()</code> এই প্র্রিফ্লাইট রিকুয়েস্ট হ্যান্ডেল করে।</p>
    `
  },
  {
    id: "express-26",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Cookies", "cookie-parser", "httpOnly"],
    question: "cookie-parser মিডলওয়্যার এবং httpOnly, Secure, SameSite Cookie Attributes-এর সিকিউরিটি ভূমিকা কী?",
    answer: `
<p><strong>httpOnly:</strong> ক্লায়েন্ট সাইড জাভাস্ক্রিপ্ট (XSS) দিয়ে কুকি পড়া ব্লক করে।</p><p><strong>Secure:</strong> কেবল HTTPS লাইনে কুকি পাঠায়।</p><p><strong>SameSite=Strict:</strong> Cross-site CSRF অ্যাটাক প্রতিরোধ করে।</p>
    `
  },
  {
    id: "express-27",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Rate Limiting", "Redis"],
    question: "rate-limit-redis ব্যবহার করে ডিস্ট্রিবিউটেড Express Cluster-এ Rate Limiting কীভাবে করবেন?",
    answer: `
<p>একাধিক প্রসেস বা সার্ভারে এক্সপ্রেস চললে ইন-মেমোরি কাউন্টার কাজ করে না। <code>rate-limit-redis</code> স্টোর ব্যবহার করে সেন্ট্রাল Redis-এ IP রিকুয়েস্ট হিসেব রাখা হয়।</p>
    `
  },
  {
    id: "express-28",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Streaming", "res.pipe", "Download"],
    question: "Express-এ res.sendFile vs res.download vs Streams দিয়ে বড় ফাইল ডাউনলোড কীভাবে করাবেন?",
    answer: `
<p><code>res.download()</code> ব্রাউজারে Attachment হিসেবে ফাইল সেভ করতে বাধ্য করে। বড় ফাইলে মেমোরি বাঁচাতে <code>fs.createReadStream().pipe(res)</code> ব্যবহার করা সবচেয়ে উপযোগী।</p>
    `
  },
  {
    id: "express-29",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "SQLi", "Sanitization"],
    question: "Express-এ Input Validation (express-validator) এবং Sanitization কীভাবে করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>const { body, validationResult } = require('express-validator');
app.post('/user', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
});</code></pre></div>
    `
  },
  {
    id: "express-30",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Sessions", "express-session", "Connect-Redis"],
    question: "express-session এবং connect-redis দিয়ে Scalable Session Storage কীভাবে তৈরি করবেন?",
    answer: `
<p>ডিফল্ট MemoryStore প্রোডাকশনে মেমোরি লিক ঘটায়। <code>connect-redis</code> ব্যবহার করে ইউজারের সেশন আইডি সিঙ্ক্রোনাসলি Redis ডাটাবেজে স্টোর রাখা হয়।</p>
    `
  },
  {
    id: "express-31",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Performance", "Compression", "Brotli"],
    question: "Express-এ compression middleware এবং Brotli/Gzip এনকোডিং কনফিগারেশন কীভাবে করবেন?",
    answer: `
<p><code>app.use(compression())</code> দিলে Express ব্রাউজারের <code>Accept-Encoding</code> অনুযায়ী রেসপন্স টেক্সট কমপ্রেস করে ডেটা ট্রান্সফার স্পিড বাড়ায়।</p>
    `
  },
  {
    id: "express-32",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Static Files", "express.static", "Caching"],
    question: "express.static() দিয়ে স্ট্যাটিক ফাইল সার্ভিং এবং Cache-Control Max-Age সেট কীভাবে করবেন?",
    answer: `
<p><code>app.use(express.static('public', { maxAge: '1d', etag: true }))</code> দিলে ব্রাউজার ১ দিন পর্যন্ত ইমেজ ও সিএসএস ফাইল ই-ট্যাগ সিঙ্ক করে ক্যাশে ধরে রাখে।</p>
    `
  },
  {
    id: "express-33",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Content-Security-Policy"],
    question: "Helmet.js দিয়ে Express-এ Content Security Policy (CSP) কীভাবে সেটআপ করবেন?",
    answer: `
<p>CSP হেডার ডিক্লেয়ার করে দিয়ে ব্রাউজারকে নির্দেশ দেওয়া যে কোন কোন ডোমেন থেকে কেবল ইমেজ বা জাভাস্ক্রিপ্ট লোড করার অনুমতি দেওয়া হবে (XSS & Injection Protection)।</p>
    `
  },
  {
    id: "express-34",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Routing", "Param Middleware", "router.param"],
    question: "Express-এ router.param() মিডলওয়্যার দিয়ে ড্রাই (DRY) কোড কীভাবে লিখবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>router.param('userId', async (req, res, next, id) => {
  req.user = await User.findById(id);
  if (!req.user) return res.status(404).send('User not found');
  next();
});</code></pre></div>
    `
  },
  {
    id: "express-35",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Architecture", "MVC", "Layered"],
    question: "Express.js-এ MVC / Controller-Service-Repository Pattern আর্কিটেকচার কেন প্রয়োজনীয়?",
    answer: `
<p>রুট ফাইল থেকে ডাটাবেজ কোয়েরি ও বিজনেস লজিক আলাদা করা। Router -> Controller (Request/Response) -> Service (Business Logic) -> Repository (Database Query)।</p>
    `
  },
  {
    id: "express-36",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["HTTP Status", "Status Codes", "REST"],
    question: "RESTful API-তে এক্সপ্রেস দিয়ে সঠিক HTTP Status Codes (200, 201, 204, 400, 401, 403, 404, 409, 500) ব্যবহারের নিয়ম কী?",
    answer: `
<p><strong>201:</strong> নতুন রিসোর্স তৈরি। <strong>204:</strong> নো কন্টেন্ট (Delete)। <strong>401:</strong> আন-অথেনটিকেটেড (নো লগইন)। <strong>403:</strong> ফোর্বিডেন (নো পারমিশন)। <strong>409:</strong> কনফ্লিক্ট (ডুপ্লিকেট ইমেইল)।</p>
    `
  },
  {
    id: "express-37",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["WebSockets", "ws", "http"],
    question: "একই Express HTTP Server-এ ws / Socket.io সকেট কীভাবে একসাথে রান করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
server.listen(3000);</code></pre></div>
    `
  },
  {
    id: "express-38",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Request Context", "res.locals", "req.state"],
    question: "res.locals vs req.user — রিকুয়েস্ট লাইফসাইকেলে ডাটা শেয়ার করার মাধ্যম কোনটি?",
    answer: `
<p><code>res.locals</code> বর্তমান রিকুয়েস্টের ভিউ বা পরবর্তী মিডলওয়্যারে স্কোপড ভ্যারিয়েবল পাস করতে এক্সপ্রেসের অফিশিয়াল কনটেক্সট অবজেক্ট।</p>
    `
  },
  {
    id: "express-39",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Microservices", "Proxy", "express-http-proxy"],
    question: "express-http-proxy দিয়ে এক্সপ্রেসকে এপিআই গেটওয়ে প্রক্সি হিসেবে কীভাবে ব্যবহার করবেন?",
    answer: `
<p><code>app.use('/services/user', proxy('http://user-service:4000'))</code> দিয়ে ইনকামিং রিকুয়েস্ট অন্য ইন্টারনাল মাইক্রোসার্ভিসে ফরওয়ার্ড করা।</p>
    `
  },
  {
    id: "express-40",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Events", "Response", "finish event"],
    question: "Express-এ res.on('finish') এবং res.on('close') ইভেন্ট দিয়ে Response Metrics ট্র্যাকিং কীভাবে করবেন?",
    answer: `
<p><code>res.on('finish')</code> ইভেন্ট রান করে যখন সম্পূর্ণ রেসপন্স ক্লায়েন্টের কাছে সাকসেসফুলি সেন্ড হওয়া শেষ হয়, লগার এবং মেট্রিক্স ট্র্যাকিংয়ে এটি অত্যন্ত দরকারি।</p>
    `
  },
  {
    id: "express-41",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Header Injection", "res.set"],
    question: "Express-এ HTTP Response Splitting / Header Injection কীভাবে এড়াবেন?",
    answer: `
<p>রেসপন্স হেডারে নিউলাইন ক্যারেক্টার না পাঠানো। Express নেটিভভাবে হেডারে নিউলাইন থাকলে এরর থ্রো করে নিরাপদ রাখে।</p>
    `
  },
  {
    id: "express-42",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Uploads", "Multer", "Memory Leak"],
    question: "Multer ফাইল আপলোডের সময় Disk Storage vs Memory Buffer Memory Leak এড়ানোর কৌশল কী?",
    answer: `
<p>MemoryStorage ব্যবহার করলে বিশাল ফাইল পুরা RAM মেমোরিতে স্পেস নেয়। বড় ফাইলে <code>diskStorage</code> বা সরাসরি AWS S3 Multipart Upload Stream ব্যবহার করা নিরাপদ।</p>
    `
  },
  {
    id: "express-43",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Optimization", "ETag", "Fresh"],
    question: "Express ETag Generation এবং HTTP 304 Not Modified Status কীভাবে কাজ করে?",
    answer: `
<p>Express নেটিভভাবে রেসপন্স বাফারের হ্যাশ (ETag) বানায়। ক্লায়েন্ট <code>If-None-Match</code> পাঠালে ই-ট্যাগ মিললে ৩০৪ স্ট্যাটাস পাঠায় (জিরো রেসপন্স বাডি ট্রান্সফার)।</p>
    `
  },
  {
    id: "express-44",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Testing", "Supertest", "Mocks"],
    question: "Supertest এবং Jest দিয়ে Express REST API Route Testing কীভাবে করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>const request = require('supertest');
const app = require('../app');
test('GET /api/users', async () => {
  const res = await request(app).get('/api/users');
  expect(res.statusCode).toBe(200);
});</code></pre></div>
    `
  },
  {
    id: "express-45",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Routing", "Case Sensitivity", "Strict Routing"],
    question: "Express Application Settings: 'case sensitive routing' এবং 'strict routing' এর কাজ কী?",
    answer: `
<p><code>app.set('case sensitive routing', true)</code> দিলে <code>/Users</code> এবং <code>/users</code> আলাদা রুট হিসেবে বিবেচিত হয়। <code>strict routing</code> অন করলে <code>/users</code> এবং <code>/users/</code> আলাদা ধরে।</p>
    `
  },
  {
    id: "express-46",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Security", "Disable X-Powered-By", "Hide Tech"],
    question: "app.disable('x-powered-by') কেন প্রোডাকশন অ্যাপে কল করা বাধ্যতামূলক?",
    answer: `
<p>Express বাই ডিফল্ট <code>X-Powered-By: Express</code> হেডার পাঠায় যা হ্যাকারদের টেকনোলজি স্ট্যাক জানিয়ে দেয়। এটি ডিজেবল করে হাইড করা উচিত।</p>
    `
  },
  {
    id: "express-47",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Middleware", "Conditional Middleware", "express-unless"],
    question: "নির্দিষ্ট রুটে মিডলওয়্যার স্কিপ করতে express-unless কীভাবে ব্যবহার করবেন?",
    answer: `
<p>যেমন অথেন্টিকেশন মিডলওয়্যার <code>/login</code> বা <code>/register</code> রুটে স্কিপ করতে <code>authMiddleware.unless({ path: ['/login'] })</code> কনফিগার করা।</p>
    `
  },
  {
    id: "express-48",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Graceful Shutdown", "stoppable", "http-terminator"],
    question: "http-terminator দিয়ে Express Active Keep-Alive HTTP Connections দ্রুত বন্ধ কীভাবে করবেন?",
    answer: `
<p>ডিফল্ট <code>server.close()</code> কন্টিনিউয়াস Keep-alive কানেকশন সকেট বন্ধ করতে দীর্ঘ সময় নেয়। <code>http-terminator</code> দ্রুত সব আইডি সকেট কিল করে শাটডাউন ফাস্ট করে।</p>
    `
  },
  {
    id: "express-49",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["OpenAPI", "express-openapi-validator", "Swagger"],
    question: "express-openapi-validator দিয়ে OpenAPI Specs (.yaml) থেকে অটোমেটিক রুট ভ্যালিডেশন কীভাবে করবেন?",
    answer: `
<p>Swagger YAML ডেফিনিশন লোড করে দিলে এটি ইনকামিং রিকুয়েস্টের Body, Query, Params অটোমেটিক ওপেনএপিআই স্পেক্স অনুযায়ী টেস্ট ও ভ্যালিডেট করে।</p>
    `
  },
  {
    id: "express-50",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Response", "res.format", "Content Negotiation"],
    question: "res.format() দিয়ে Express-এ Content Negotiation (JSON, HTML, Text) কীভাবে করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div><pre><code>res.format({
  'text/plain': () => res.send('hey'),
  'text/html': () => res.send('<p>hey</p>'),
  'application/json': () => res.send({ message: 'hey' })
});</code></pre></div>
    `
  }
];
