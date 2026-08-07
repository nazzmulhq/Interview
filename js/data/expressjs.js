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
  }
];
