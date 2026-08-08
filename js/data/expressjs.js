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
        <li><strong>Asynchronous I/O Optimization:</strong> ডেটাবেস কলগুলোকে ব্লকিং স্টাইলে না লিখে <code>Promise.all()</code> ব্যবহার করে প্যারালালে এক্সিকিউট করা।</li>
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
  },
  {
    id: "express-11",
    category: "Express.js",
    difficulty: "Beginner",
    tags: ["Views","SSR","Templates"],
    question: "Express.js-এ Template Engine (EJS, Pug) কীভাবে কাজ করে?",
    answer: `
      <p>Template Engine হলো এমন একটি লাইব্রেরি যা সার্ভার সাইডে ডায়নামিক ভ্যারিয়েবল ব্যবহার করে HTML পেজ জেনারেট করে। Express.js এই টেমপ্লেটগুলোকে রেন্ডার করে ক্লায়েন্টের কাছে সম্পূর্ণ HTML হিসেবে পাঠায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'My App', user: 'Nazmul' });
});</code></pre>
      </div>
      <p>এখানে <code>index.ejs</code> ফাইলের ভেতর <code>&lt;h1&gt;&lt;%= title %&gt;&lt;/h1&gt;</code> লেখা থাকলে, এটি রেন্ডার হওয়ার পর <code>&lt;h1&gt;My App&lt;/h1&gt;</code> হিসেবে ব্রাউজারে দেখাবে।</p>
    `
  },
  {
    id: "express-12",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Deployment","Proxy","Security"],
    question: "Express.js-এ app.set('trust proxy', true) কেন ব্যবহার করা হয়?",
    answer: `
      <p>যখন Express অ্যাপ্লিকেশনটি Nginx, Varnish, AWS Load Balancer বা Cloudflare-এর মতো কোনো Reverse Proxy-এর পেছনে ডিপ্লয় করা হয়, তখন এক্সপ্রেস সরাসরি আসল ক্লায়েন্টের IP পায় না। সে প্রক্সি সার্ভারের IP ক্লায়েন্ট IP ভাবে।</p>
      <p><code>app.set('trust proxy', true)</code> সেট করলে Express বুঝতে পারে যে এটি একটি প্রক্সির পেছনে আছে এবং <code>X-Forwarded-For</code> বা <code>X-Forwarded-Proto</code> হেডারকে ট্রাস্ট করে আসল ক্লায়েন্টের IP ও HTTPS প্রোটোকল সঠিকভাবে পড়তে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.set('trust proxy', 1); // Trust first proxy
app.get('/', (req, res) => {
  console.log(req.ip); // Will now show real client IP
  console.log(req.protocol); // Will show 'https' if proxied over SSL
});</code></pre>
      </div>
    `
  },
  {
    id: "express-13",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Realtime","SSE","HTTP"],
    question: "Express.js-এ Server-Sent Events (SSE) কীভাবে কাজ করে?",
    answer: `
      <p><strong>Server-Sent Events (SSE)</strong> হলো এমন একটি টেকনোলজি যেখানে সার্ভার থেকে ক্লায়েন্টের ব্রাউজারে রিয়েল-টাইমে একমুখী (One-way) লাইভ আপডেট পাঠানো যায়। WebSocket-এর মতো বাইডিরেকশনাল না হলেও এটি সেটআপ করা সহজ এবং HTTP প্রোটোকলের ওপর চলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send real-time data every second
  const interval = setInterval(() => {
    res.write(\`data: \${JSON.stringify({ time: new Date() })}\\n\\n\`);
  }, 1000);

  req.on('close', () => clearInterval(interval));
});</code></pre>
      </div>
    `
  },
  {
    id: "express-14",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Ops","Graceful Shutdown","Process"],
    question: "Express.js-এ Graceful Shutdown কী?",
    answer: `
      <p>সার্ভার বন্ধ করার সময় (যেমন- ডিপ্লয়মেন্ট বা স্কেলিং) হঠাৎ করে প্রসেস কিল না করে, চলমান রিকোয়েস্টগুলো সম্পন্ন করা এবং ডাটাবেজ/রেডিস কানেকশন নিরাপদে বন্ধ করার কৌশলকে <strong>Graceful Shutdown</strong> বলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    mongoose.connection.close(false, () => {
      console.log('DB connection closed.');
      process.exit(0);
    });
  });
});</code></pre>
      </div>
    `
  },
  {
    id: "express-15",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Logging","Winston","Morgan"],
    question: "Production Express app-এ Morgan এবং Winston logger কীভাবে ব্যবহৃত হয়?",
    answer: `
      <p>প্রোডাকশনে স্ট্রাকচার্ড লগিংয়ের জন্য এই দুটি প্যাকেজ একসাথে ব্যবহৃত হয়:</p>
      <ul>
        <li><strong>Morgan:</strong> এটি HTTP রিকোয়েস্ট লগার। কোন আইপি থেকে কোন রাউটে রিকোয়েস্ট এসেছে এবং রেসপন্স টাইম কত তা লগ করে।</li>
        <li><strong>Winston:</strong> এটি অ্যাপ্লিকেশন লগার। এটি এরর, ইনফো, বা ডিবাগ মেসেজকে ফাইল বা ডাটাবেজে JSON ফরম্যাটে স্টোর করে।</li>
      </ul>
      <p>Morgan-এর আউটপুটকে Winston-এর মাধ্যমে স্ট্রিম করা যায়, যাতে সব লগ একই ফাইলে জমা হয়।</p>
    `
  },
  {
    id: "express-16",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Testing","Supertest","Architecture"],
    question: "Integration Testing-এ app.js এবং server.js আলাদা করা কেন ভালো প্র্যাকটিস?",
    answer: `
      <p>যদি <code>app.listen()</code> এবং এক্সপ্রেস অ্যাপ্লিকেশন সেটআপ একই ফাইলে থাকে, তবে টেস্ট রান করার সময় পোর্ট কনফ্লিক্ট হতে পারে বা টেস্ট চলাকালীন সার্ভার চালু হয়ে যেতে পারে।</p>
      <p>এটি সমাধানের জন্য <code>app.js</code> ফাইলে শুধু এক্সপ্রেস অ্যাপ কনফিগার করে <code>module.exports = app</code> করা হয়। আর <code>server.js</code> ফাইল থেকে অ্যাপকে ইম্পোর্ট করে <code>app.listen()</code> করা হয়।</p>
      <p>তখন <strong>Supertest</strong> দিয়ে <code>app.js</code>-কে সরাসরি ইম্পোর্ট করে কোনো পোর্ট বাইন্ড ছাড়াই টেস্ট করা যায়।</p>
    `
  },
  {
    id: "express-17",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security","Middleware","HPP"],
    question: "HTTP Parameter Pollution (HPP) অ্যাটাক কী?",
    answer: `
      <p>অ্যাটাকার যখন URL-এ একই কোয়েরি প্যারামিটার একাধিকবার পাঠায় (যেমন: <code>?id=1&id=2</code>), তখন এক্সপ্রেস ডিফল্টভাবে সেটিকে অ্যারে (<code>['1', '2']</code>) হিসেবে গ্রহণ করে। এটি ডাটাবেজ বা লজিক ইঞ্জেকশন ঘটাতে পারে।</p>
      <p>একে <strong>HPP অ্যাটাক</strong> বলে। এটি প্রতিরোধ করতে <code>hpp</code> মিডলওয়্যার ব্যবহৃত হয়, যা ডুপ্লিকেট প্যারামিটারগুলো মুছে শুধু শেষের ভ্যালুটি রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const hpp = require('hpp');
app.use(hpp()); // Protects against HPP</code></pre>
      </div>
    `
  },
  {
    id: "express-18",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security","CSRF","Auth"],
    question: "Cross-Site Request Forgery (CSRF) কী এবং এটি কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p><strong>CSRF</strong> হলো এমন একটি অ্যাটাক যেখানে অ্যাটাকার ইউজারের লগইন কুকি ব্যবহার করে ব্যাকগ্রাউন্ডে অনাকাঙ্ক্ষিত রিকোয়েস্ট পাঠিয়ে দেয়। এটি সাধারণত সেশন-ভিত্তিক অথেনটিকেশনে বেশি ঘটে।</p>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li><strong>CSRF Token:</strong> <code>csurf</code> প্যাকেজ ব্যবহার করে প্রতিটি ফর্মের সাথে একটি সিক্রেট টোকেন পাঠানো হয়, সার্ভার পোস্ট রিকোয়েস্টে সেই টোকেন ভ্যালিডেট করে।</li>
        <li><strong>SameSite Cookie:</strong> কুকিতে <code>sameSite: 'strict'</code> বা <code>sameSite: 'lax'</code> সেট করলে অন্য ডোমেইন থেকে আসা রিকোয়েস্টে কুকি পাঠানো হয় না। আধুনিক ব্রাউজারে এটি CSRF প্রতিরোধের সবচেয়ে কার্যকর উপায়।</li>
      </ul>
    `
  },
  {
    id: "express-19",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Middleware", "Architecture", "Flow"],
    question: "Express.js Middleware Architecture এবং next() / next(err) কন্ট্রোল ফ্লো কীভাবে কাজ করে?",
    answer: `
      <p>Express মিডলওয়্যার চেইন আকারে কাজ করে। একটি মিডলওয়্যার তার কাজ শেষ করে <code>next()</code> ডাকলে পরবর্তী মিডলওয়্যারে কন্ট্রোল যায়।</p>
      <p>কিন্তু <code>next(err)</code> ডাকলে এক্সপ্রেস মাঝের সব সাধারণ মিডলওয়্যার স্কিপ করে সরাসরি <strong>Global Error Handling Middleware</strong>-এ চলে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.use(logReq); // 1. Normal
app.use(authCheck); // 2. Normal (if fails, calls next(err))
app.get('/', getHome); // 3. Route Handler

// 4. Error Handler (Only reached if next(err) is called)
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});</code></pre>
      </div>
    `
  },
  {
    id: "express-20",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Error Handling", "Global Handler", "Async"],
    question: "Express 4 vs Express 5-এ Async Error Handling-এর পার্থক্য কী? express-async-errors কেন লাগত?",
    answer: `
      <p><strong>Express 4:</strong> অ্যাসিনক্রোনাস ফাংশনে (<code>async/await</code>) যদি কোনো এরর থ্রো হয় বা প্রমিস রিজেক্ট হয়, এক্সপ্রেস সেটি স্বয়ংক্রিয়ভাবে ধরতে পারত না (Unhandled Rejection)। এটি হ্যান্ডেল করতে <code>try...catch</code> ব্লক লিখে ম্যানুয়ালি <code>next(err)</code> ডাকতে হতো, অথবা <code>express-async-handler</code> বা <code>express-async-errors</code> প্যাকেজ ব্যবহার করতে হতো।</p>
      <p><strong>Express 5:</strong> নেটিভভাবে প্রমিস এবং অ্যাসিনক্রোনাস এরর সাপোর্ট করে। এতে কোনো র‍্যাপার ছাড়াই অ্যাসিনক্রোনাস রাউট হ্যান্ডলারের এরর সরাসরি গ্লোবাল এরর হ্যান্ডলারে চলে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Express 5 (No try-catch needed!)
app.get('/users', async (req, res, next) => {
  const users = await User.find(); // If this fails, goes straight to error handler
  res.send(users);
});</code></pre>
      </div>
    `
  },
  {
    id: "express-21",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Routing", "express.Router", "Modular"],
    question: "express.Router() দিয়ে মডুলার ও মেইনটেইনেবল রুট আর্কিটেকচার কীভাবে সাজাবেন?",
    answer: `
      <p>বড় অ্যাপ্লিকেশনে সব রাউট এক ফাইলে রাখলে কোড আনমেইনটেইনেবল হয়ে যায়। <code>express.Router()</code> ব্যবহার করে রিসোর্স ভিত্তিক আর্কিটেকচার তৈরি করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// routes/user.routes.js
const router = require('express').Router();
router.get('/', getAllUsers);
router.post('/', createUser);
module.exports = router;

// app.js
const userRouter = require('./routes/user.routes');
app.use('/api/v1/users', userRouter);</code></pre>
      </div>
      <p>এতে প্রতিটি ফিচারের রাউট আলাদা ফাইলে থাকে এবং কমন মিডলওয়্যার (যেমন- অথেনটিকেশন) শুধু নির্দিষ্ট রাউটারে অ্যাপ্লাই করা যায়।</p>
    `
  },
  {
    id: "express-22",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Performance", "Route Matcher", "radix-tree"],
    question: "Express Route Matching Performance এবং অতিরিক্ত মিডলওয়্যার ওভারহেড কীভাবে কমাবেন?",
    answer: `
      <p>Express-এ প্রতিটি ইনকামিং রিকোয়েস্ট সব গ্লোবাল মিডলওয়্যার এবং রাউট স্ট্যাকের মধ্য দিয়ে যায়। পারফরম্যান্স অপটিমাইজ করতে নিচের নিয়মগুলো মানা উচিত:</p>
      <ul>
        <li><strong>Global Middleware কমানো:</strong> <code>body-parser</code> বা <code>cookie-parser</code> এর মতো ভারী মিডলওয়্যার সব রাউটের দরকার হয় না। এগুলো শুধু নির্দিষ্ট রাউটে ব্যবহার করা উচিত।</li>
        <li><strong>Static Routes আগে রাখা:</strong> ডায়নামিক রাউট (<code>/users/:id</code>) এর আগে স্ট্যাটিক রাউট (<code>/users/me</code>) ডিক্লেয়ার করা ভালো।</li>
        <li><strong>Route Caching:</strong> রেগুলার এক্সপ্রেস রাউট রেগুলার এক্সপ্রেশন পার্স করে, যা স্লো। <code>route-cache</code> বা রিভার্স প্রক্সি (Nginx) ক্যাশিং ব্যবহার করা যেতে পারে।</li>
      </ul>
    `
  },
  {
    id: "express-23",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Request", "Response", "Methods"],
    question: "req.params vs req.query vs req.body-এর পার্থক্য ও ব্যবহার কী?",
    answer: `
      <p>ক্লায়েন্ট থেকে ডেটা রিসিভ করার ৩টি প্রধান উপায় হলো:</p>
      <ul>
        <li><strong>req.params:</strong> URL-এর ডাইনামিক সেগমেন্ট থেকে ডেটা পাওয়া যায়। <br><code>/users/:id</code> -> <code>req.params.id</code></li>
        <li><strong>req.query:</strong> URL-এর পরে <code>?</code> চিহ্নের মাধ্যমে কোয়েরি প্যারামিটার পাঠানো হয়। সাধারণত ফিল্টারিং, সর্টিং বা পেজিনেশনে ব্যবহৃত হয়। <br><code>/users?role=admin</code> -> <code>req.query.role</code></li>
        <li><strong>req.body:</strong> HTTP বডিতে (সাধারণত POST, PUT, PATCH) JSON বা Form ডেটা হিসেবে পাঠানো ডেটা পার্স করে পাওয়া যায়।</li>
      </ul>
    `
  },
  {
    id: "express-24",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Body Parsing", "express.json", "raw-body"],
    question: "express.json() এবং express.urlencoded() মিডলওয়্যারের কাজ কী? limit সেটিংস কেন জরুরি?",
    answer: `
      <p>এই মিডলওয়্যারগুলো ইনকামিং Raw HTTP Payload পার্স করে <code>req.body</code>-তে জাভাস্ক্রিপ্ট অবজেক্ট হিসেবে স্টোর করে।</p>
      <ul>
        <li><code>express.json()</code>: JSON বডি পার্স করে।</li>
        <li><code>express.urlencoded()</code>: HTML ফর্মের URL-encoded ডেটা পার্স করে।</li>
      </ul>
      <h4>Limit সেটিংস কেন জরুরি?</h4>
      <p>ডিফল্টভাবে এক্সপ্রেস ১০০kb লিমিট দেয়। কিন্তু যদি <code>{ limit: '10mb' }</code> সেট করা হয় এবং ক্লায়েন্ট হ্যাকার হয়, সে যদি শত মেগাবাইটের একটি ভুয়া JSON পাঠায়, তবে সার্ভার সেটি পার্স করতে গিয়ে RAM ফুল হয়ে মেমোরি ক্র্যাশ (DoS অ্যাটাক) করতে পারে। তাই নিরাপত্তার জন্য কম লিমিট রাখা উচিত।</p>
    `
  },
  {
    id: "express-25",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "CORS", "Preflight"],
    question: "CORS Preflight Options Request (HTTP OPTIONS) কী এবং Express-এ cors() মিডলওয়্যার কীভাবে কাজ করে?",
    answer: `
      <p>ব্রাউজার যখন কোনো ক্রস-অরিজিন রিকোয়েস্ট (যেমন- কাস্টম হেডার বা PUT/DELETE মেথড) পাঠায়, তখন সে নিরাপত্তার জন্য আসল রিকোয়েস্টের আগে একটি <strong>OPTIONS</strong> (Preflight) রিকোয়েস্ট পাঠায় সার্ভারকে জিজ্ঞেস করতে যে এই রিকোয়েস্টটি গ্রহণযোগ্য কি না।</p>
      <p>এক্সপ্রেসে <code>cors()</code> মিডলওয়্যার এই Preflight রিকোয়েস্ট হ্যান্ডেল করে এবং সঠিক <code>Access-Control-Allow-*</code> হেডার সেট করে ব্রাউজারকে গ্রিন সিগন্যাল দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const cors = require('cors');
app.use(cors({
  origin: 'https://myfrontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));</code></pre>
      </div>
    `
  },
  {
    id: "express-26",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Cookies", "cookie-parser", "httpOnly"],
    question: "cookie-parser মিডলওয়্যার এবং httpOnly, Secure, SameSite Cookie Attributes-এর সিকিউরিটি ভূমিকা কী?",
    answer: `
      <p><code>cookie-parser</code> ক্লায়েন্টের পাঠানো <code>Cookie</code> হেডারকে পার্স করে <code>req.cookies</code> অবজেক্ট বানায়।</p>
      <h4>সিকিউরিটি এট্রিবিউটসমূহ:</h4>
      <ul>
        <li><strong>httpOnly: true</strong> দিলে ক্লায়েন্ট সাইড জাভাস্ক্রিপ্ট (<code>document.cookie</code>) দিয়ে কুকি পড়া যায় না, ফলে XSS অ্যাটাকে টোকেন চুরি হতে পারে না।</li>
        <li><strong>secure: true</strong> দিলে কেবল HTTPS কানেকশনেই কুকি ট্রান্সমিট হয়।</li>
        <li><strong>sameSite: 'strict'</strong> দিলে অন্য কোনো সাইট থেকে রিকোয়েস্ট এলে কুকি যায় না, ফলে CSRF অ্যাটাক প্রতিরোধ হয়।</li>
      </ul>
    `
  },
  {
    id: "express-27",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Rate Limiting", "Redis"],
    question: "rate-limit-redis ব্যবহার করে ডিস্ট্রিবিউটেড Express Cluster-এ Rate Limiting কীভাবে করবেন?",
    answer: `
      <p>এক্সপ্রেস যদি PM2 বা Kubernetes-এ ক্লাস্টার মোডে একাধিক প্রসেসে চলে, তবে ডিফল্ট <code>express-rate-limit</code> এর ইন-মেমোরি স্টোর কাজ করবে না, কারণ প্রতিটি প্রসেসের আইপি কাউন্টার আলাদা হবে।</p>
      <p>এটি সমাধান করতে সেন্ট্রাল <strong>Redis</strong> ডাটাবেজ ব্যবহার করা হয়, যেখানে সব প্রসেস একই আইপির রিকোয়েস্ট কাউন্ট শেয়ার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const limiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.call(...args) }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);</code></pre>
      </div>
    `
  },
  {
    id: "express-28",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Streaming", "res.pipe", "Download"],
    question: "Express-এ res.sendFile vs res.download vs Streams দিয়ে বড় ফাইল ডাউনলোড কীভাবে করাবেন?",
    answer: `
      <ul>
        <li><strong>res.sendFile(path):</strong> ব্রাউজারে ফাইলটি ডিসপ্লে করার জন্য (যেমন- ছবি বা পিডিএফ ব্রাউজারেই খোলে) পাঠানো হয়।</li>
        <li><strong>res.download(path):</strong> ফাইলটিকে ব্রাউজারে Attachment হিসেবে সেভ করতে বাধ্য করে।</li>
        <li><strong>Streams (res.pipe):</strong> বড় ফাইল (যেমন- ভিডিও) পাঠানোর জন্য মেমোরিতে পুরো ফাইল লোড না করে ছোট ছোট চাংক (chunk) হিসেবে স্ট্রিম করা হয়। এটি সবচেয়ে মেমোরি-ইফিশিয়েন্ট।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const fs = require('fs');
app.get('/video', (req, res) => {
  const fileStream = fs.createReadStream('large-video.mp4');
  fileStream.pipe(res); // Streams directly to client
});</code></pre>
      </div>
    `
  },
  {
    id: "express-29",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "SQLi", "Sanitization"],
    question: "Express-এ Input Validation (express-validator) এবং Sanitization কীভাবে করবেন?",
    answer: `
      <p>Validation যাচাই করে ইনপুট সঠিক কি না, আর Sanitization ইনপুট থেকে ক্ষতিকর অংশ মুছে ফেলে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { body, validationResult } = require('express-validator');

app.post('/register', [
  body('email').isEmail().normalizeEmail(), // Sanitizes email
  body('password').isLength({ min: 6 }).trim(), // Trims whitespace
  body('name').escape() // Removes HTML chars (prevents XSS)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
  // Safe to save to DB
});</code></pre>
      </div>
    `
  },
  {
    id: "express-30",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Sessions", "express-session", "Connect-Redis"],
    question: "express-session এবং connect-redis দিয়ে Scalable Session Storage কীভাবে তৈরি করবেন?",
    answer: `
      <p><code>express-session</code> ডিফল্টভাবে মেমোরিতে সেশন স্টোর করে, যা প্রোডাকশনে মেমোরি লিক ঘটায় এবং ক্লাস্টার মোডে কাজ করে না। স্কেলেবিলিটির জন্য <code>connect-redis</code> ব্যবহার করে সেশন ডাটাবেজে স্টোর করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // HTTPS only
}));</code></pre>
      </div>
    `
  },
  {
    id: "express-31",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Performance", "Compression", "Brotli"],
    question: "Express-এ compression middleware এবং Brotli/Gzip এনকোডিং কনফিগারেশন কীভাবে করবেন?",
    answer: `
      <p>রেসপন্স পেলোড কমাতে <code>compression</code> মিডলওয়্যার ব্যবহৃত হয়। ব্রাউজার যদি <code>Accept-Encoding: br</code> হেডার পাঠায়, তবে এটি Brotli (যা Gzip-এর চেয়ে বেশি কম্প্রেস করে) ব্যবহার করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const compression = require('compression');
app.use(compression({
  // Enable Brotli if supported
  brotli: { enabled: true, quality: 5 }
}));

app.get('/data', (req, res) => res.json(largeData)); // Compressed automatically</code></pre>
      </div>
    `
  },
  {
    id: "express-32",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Static Files", "express.static", "Caching"],
    question: "express.static() দিয়ে স্ট্যাটিক ফাইল সার্ভিং এবং Cache-Control Max-Age সেট কীভাবে করবেন?",
    answer: `
      <p>ইমেজ, CSS বা JS ফাইল সার্ভ করার জন্য <code>express.static</code> ব্যবহৃত হয়। ব্রাউজার ক্যাশিং অন করলে সার্ভারের লোড অনেক কমে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const path = require('path');

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d', // Cache for 1 day
  etag: true,   // Enable ETag generation
  lastModified: true
}));</code></pre>
      </div>
    `
  },
  {
    id: "express-33",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Content-Security-Policy"],
    question: "Helmet.js দিয়ে Express-এ Content Security Policy (CSP) কীভাবে সেটআপ করবেন?",
    answer: `
      <p><strong>CSP (Content Security Policy)</strong> একটি হেডার যা ব্রাউজারকে নির্দেশ দেয় কোন ডোমেইন থেকে স্ক্রিপ্ট, স্টাইল বা ইমেজ লোড করা নিরাপদ। এটি XSS অ্যাটাক প্রতিরোধ করে। Helmet.js দিয়ে এটি কনফিগার করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
    styleSrc: ["'self'", 'https://fonts.googleapis.com'],
    imgSrc: ["'self'", 'data:']
  }
}));</code></pre>
      </div>
    `
  },
  {
    id: "express-34",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Routing", "Param Middleware", "router.param"],
    question: "Express-এ router.param() মিডলওয়্যার দিয়ে ড্রাই (DRY) কোড কীভাবে লিখবেন?",
    answer: `
      <p>যখন কোনো রাউটে <code>:id</code> প্যারামিটার থাকে, তখন ডাটাবেজ থেকে ইউজার খুঁজে আনার লজিক প্রতিটি রাউটে না লিখে <code>router.param()</code> দিয়ে একবার লেখা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Runs automatically when :userId is in the URL
router.param('userId', async (req, res, next, id) => {
  try {
    req.user = await User.findById(id);
    if (!req.user) throw new Error('User not found');
    next();
  } catch (err) {
    next(err);
  }
});

router.get('/users/:userId', (req, res) => res.json(req.user));
router.put('/users/:userId', (req, res) => updateUser(req.user));</code></pre>
      </div>
    `
  },
  {
    id: "express-35",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Architecture", "MVC", "Layered"],
    question: "Express.js-এ MVC / Controller-Service-Repository Pattern আর্কিটেকচার কেন প্রয়োজনীয়?",
    answer: `
      <p>এক্সপ্রেস রাউট ফাইলের ভেতর সরাসরি ডাটাবেজ কোয়েরি লিখলে কোড আনমেইনটেইনেবল হয়। <strong>Layered Architecture</strong> কোডকে ভাগ করে:</p>
      <ol>
        <li><strong>Routes/Controllers:</strong> শুধু HTTP রিকোয়েস্ট রিসিভ করে এবং রেসপন্স পাঠায়।</li>
        <li><strong>Services:</strong> মূল বিজনেস লজিক (যেমন- পেমেন্ট ক্যালকুলেশন) এখানে থাকে।</li>
        <li><strong>Repositories:</strong> ডাটাবেজ কোয়েরি (Mongoose/Prisma) এখানে থাকে।</li>
      </ol>
      <p>এতে কোড টেস্ট করা সহজ হয় এবং একই সার্ভিস লজিক অন্য কোথাও (যেমন- WebSocket) রি-ইউজ করা যায়।</p>
    `
  },
  {
    id: "express-36",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["HTTP Status", "Status Codes", "REST"],
    question: "RESTful API-তে এক্সপ্রেস দিয়ে সঠিক HTTP Status Codes (200, 201, 204, 400, 401, 403, 404, 409, 500) ব্যবহারের নিয়ম কী?",
    answer: `
      <p>REST API-তে সঠিক স্ট্যাটাস কোড ক্লায়েন্টকে রিকোয়েস্টের ফলাফল বোঝাতে সাহায্য করে।</p>
      <ul>
        <li><strong>200 OK:</strong> সফল রিকোয়েস্ট (GET, PUT, PATCH)।</li>
        <li><strong>201 Created:</strong> নতুন রিসোর্স তৈরি হয়েছে (POST)।</li>
        <li><strong>204 No Content:</strong> সফলভাবে ডিলিট হয়েছে, কোনো বডি নেই (DELETE)।</li>
        <li><strong>400 Bad Request:</strong> ভ্যালিডেশন এরর।</li>
        <li><strong>401 Unauthorized:</strong> লগইন করা নেই বা টোকেন নেই।</li>
        <li><strong>403 Forbidden:</strong> লগইন আছে কিন্তু অ্যাডমিন পারমিশন নেই।</li>
        <li><strong>404 Not Found:</strong> রিসোর্স পাওয়া যায়নি।</li>
        <li><strong>409 Conflict:</strong> ডুপ্লিকেট ডেটা (যেমন- ইমেইল আগে থেকেই আছে)।</li>
        <li><strong>500 Internal Server Error:</strong> সার্ভার এরর।</li>
      </ul>
    `
  },
  {
    id: "express-37",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["WebSockets", "ws", "http"],
    question: "একই Express HTTP Server-এ ws / Socket.io সকেট কীভাবে একসাথে রান করবেন?",
    answer: `
      <p>সাধারণত এক্সপ্রেস (<code>app.listen</code>) এবং Socket.io আলাদা পোর্টে রান করা যায়। তবে একই পোর্টে চালাতে হলে HTTP সার্ভার ইনস্ট্যান্স শেয়ার করতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log('User connected');
});

server.listen(3000, () => console.log('HTTP & WS running on port 3000'));</code></pre>
      </div>
    `
  },
  {
    id: "express-38",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Request Context", "res.locals", "req.state"],
    question: "res.locals vs req.user — রিকুয়েস্ট লাইফসাইকেলে ডাটা শেয়ার করার মাধ্যম কোনটি?",
    answer: `
      <p>মিডলওয়্যার থেকে কন্ট্রোলারে ডেটা পাস করার জন্য <code>req</code> অবজেক্টে কাস্টম প্রপার্টি (যেমন <code>req.user</code>) যোগ করা হয়। এটি কাজ করলেও, এক্সপ্রেসের অফিশিয়াল ও নিরাপদ উপায় হলো <code>res.locals</code>।</p>
      <p><code>res.locals</code> বর্তমান রিকোয়েস্টের ভিউ বা পরবর্তী মিডলওয়্যারে স্কোপড ভ্যারিয়েবল পাস করতে ব্যবহৃত হয়। রেসপন্ট শেষ হলে এটি ক্লিয়ার হয়ে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.use((req, res, next) => {
  res.locals.user = { name: 'Admin' };
  res.locals.timestamp = Date.now();
  next();
});

app.get('/', (req, res) => {
  res.json({ user: res.locals.user });
});</code></pre>
      </div>
    `
  },
  {
    id: "express-39",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Microservices", "Proxy", "express-http-proxy"],
    question: "express-http-proxy দিয়ে এক্সপ্রেসকে এপিআই গেটওয়ে প্রক্সি হিসেবে কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>মাইক্রোসার্ভিস আর্কিটেকচারে একটি এক্সপ্রেস অ্যাপকে API Gateway হিসেবে ব্যবহার করে অন্যান্য ইন্টারনাল সার্ভিসে রিকোয়েস্ট ফরওয়ার্ড করা যায়। <code>express-http-proxy</code> এর মাধ্যমে এটি সহজ।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const proxy = require('express-http-proxy');

// Forward /services/user to internal user microservice
app.use('/services/user', proxy('http://user-service:4000', {
  proxyReqPathResolver: (req) => {
    // Modify path if needed
    return req.url;
  }
}));</code></pre>
      </div>
    `
  },
  {
    id: "express-40",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Events", "Response", "finish event"],
    question: "Express-এ res.on('finish') এবং res.on('close') ইভেন্ট দিয়ে Response Metrics ট্র্যাকিং কীভাবে করবেন?",
    answer: `
      <p>রেসপন্স ক্লায়েন্টের কাছে যাওয়ার পর বা কানেকশন বন্ধ হওয়ার পর কিছু কাজ (যেমন- মেট্রিক্স বা অ্যানালিটিক্স লগ করা) করার জন্য এই ইভেন্টগুলো ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>res.on('finish'):</strong> যখন সম্পূর্ণ রেসপন্স হেডার এবং বডি সাকসেসফুলি ক্লায়েন্টের কাছে সেন্ড হয়ে যায় এবং রেসপন্স শেষ হয়।</li>
        <li><strong>res.on('close'):</strong> যখন রেসপন্স শেষ হওয়ার আগেই ক্লায়েন্ট কানেকশন বন্ধ করে দেয় (যেমন- ব্রাউজার ট্যাব বন্ধ করা)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`Request to \${req.path} took \${duration}ms\`);
  });
  next();
});</code></pre>
      </div>
    `
  },
  {
    id: "express-41",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Header Injection", "res.set"],
    question: "Express-এ HTTP Response Splitting / Header Injection কীভাবে এড়াবেন?",
    answer: `
      <p><strong>HTTP Response Splitting</strong> হলো এমন একটি অ্যাটাক যেখানে অ্যাটাকার ইউজার ইনপুটের মাধ্যমে হেডারে <code>\\r\\n</code> (Carriage Return Line Feed) ইনজেক্ট করে নতুন হেডার বা বডি তৈরি করে।</p>
      <p>Express.js v4+ এই সমস্যাটি নেটিভভাবে হ্যান্ডেল করে। এটি হেডার সেট করার সময় <code>\\r</code> বা <code>\\n</code> ক্যারেক্টার পেলে স্বয়ংক্রিয়ভাবে এরর থ্রো করে। তবে ডেভেলপার হিসেবে ইউজার ইনপুট হেডারে ব্যবহার করার আগে স্যানিটাইজ করা উচিত।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.get('/redirect', (req, res) => {
  const url = req.query.url;
  // Safe: Express rejects malicious URLs with CRLF characters
  res.setHeader('Location', url);
  res.status(302).send();
});</code></pre>
      </div>
    `
  },
  {
    id: "express-42",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Uploads", "Multer", "Memory Leak"],
    question: "Multer ফাইল আপলোডের সময় Disk Storage vs Memory Buffer Memory Leak এড়ানোর কৌশল কী?",
    answer: `
      <p>Multer ডিফল্টভাবে ফাইলকে মেমোরিতে (MemoryStorage) রাখে। বড় ফাইল আপলোড হলে পুরো ফাইল RAM-এ স্পেস নেয়, যা Memory Leak বা ক্র্যাশ করতে পারে।</p>
      <p>এটি এড়াতে বড় ফাইলের জন্য <code>diskStorage</code> ব্যবহার করা উচিত, যা ফাইলকে সরাসরি ডিস্কের একটি টেম্প ফোল্ডারে সেভ করে। অথবা <code>multer-s3</code> ব্যবহার করে সরাসরি AWS S3-এ স্ট্রিম করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/') },
  filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now()) }
});
const upload = multer({ storage: storage });</code></pre>
      </div>
    `
  },
  {
    id: "express-43",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Optimization", "ETag", "Fresh"],
    question: "Express ETag Generation এবং HTTP 304 Not Modified Status কীভাবে কাজ করে?",
    answer: `
      <p><strong>ETag</strong> (Entity Tag) হলো একটি হ্যাশ ভ্যালু যা এক্সপ্রেস প্রতিটি রেসপন্সের সাথে পাঠায়। ব্রাউজার পরের বার একই রিসোর্স চাইলে <code>If-None-Match</code> হেডারে সেই ETag পাঠায়। সার্ভার যদি দেখে ডাটা পরিবর্তন হয়নি, তবে সে কোনো বডি ছাড়া শুধু <strong>304 Not Modified</strong> স্ট্যাটাস পাঠায়।</p>
      <p>এতে ব্যান্ডউইথ বাঁচে এবং লোডিং দ্রুত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Express does this natively, but you can configure it:
app.set('etag', 'strong'); // or 'weak'
// To disable: app.disable('etag');</code></pre>
      </div>
    `
  },
  {
    id: "express-44",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Testing", "Supertest", "Mocks"],
    question: "Supertest এবং Jest দিয়ে Express REST API Route Testing কীভাবে করবেন?",
    answer: `
      <p>Supertest ব্যবহার করে কোনো পোর্ট লিসেন না করেই সরাসরি এক্সপ্রেস অ্যাপকে টেস্ট করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const request = require('supertest');
const app = require('../app'); // Import app, not server

test('GET /api/users should return 200', async () => {
  const response = await request(app).get('/api/users');
  
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('users');
});</code></pre>
      </div>
    `
  },
  {
    id: "express-45",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Routing", "Case Sensitivity", "Strict Routing"],
    question: "Express Application Settings: 'case sensitive routing' এবং 'strict routing' এর কাজ কী?",
    answer: `
      <p>এগুলো এক্সপ্রেসের রাউটিং বিহেভিয়ার কন্ট্রোল করে:</p>
      <ul>
        <li><strong>Case Sensitive Routing:</strong> ডিফল্টভাবে এক্সপ্রেস <code>/Users</code> এবং <code>/users</code> কে একই রাউট হিসেবে ধরে। <code>app.set('case sensitive routing', true)</code> দিলে এরা আলাদা রুট হিসেবে বিবেচিত হবে।</li>
        <li><strong>Strict Routing:</strong> ডিফল্টভাবে <code>/users</code> এবং <code>/users/</code> (শেষে স্ল্যাশ) একই রাউট। <code>app.set('strict routing', true)</code> দিলে এরা আলাদা রাউট হবে।</li>
      </ul>
    `
  },
  {
    id: "express-46",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Security", "Disable X-Powered-By", "Hide Tech"],
    question: "app.disable('x-powered-by') কেন প্রোডাকশন অ্যাপে কল করা বাধ্যতামূলক?",
    answer: `
      <p>এক্সপ্রেস বাই ডিফল্ট প্রতিটি রেসপন্সের হেডারে <code>X-Powered-By: Express</code> পাঠায়। এটি হ্যাকারদের সার্ভারের টেকনোলজি স্ট্যাক সম্পর্কে ধারণা দেয়, যাতে তারা এক্সপ্রেসের কোনো নির্দিষ্ট ভার্সনের ভালনারেবিলিটি ব্যবহার করে হ্যাক করতে পারে।</p>
      <p>নিরাপত্তার জন্য এটি বন্ধ করা উচিত। <code>helmet()</code> ব্যবহার করলে এটি অটোমেটিক বন্ধ হয়ে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.disable('x-powered-by');</code></pre>
      </div>
    `
  },
  {
    id: "express-47",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Middleware", "Conditional Middleware", "express-unless"],
    question: "নির্দিষ্ট রুটে মিডলওয়্যার স্কিপ করতে express-unless কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>অথেন্টিকেশন মিডলওয়্যার সাধারণত সব রাউটে লাগে, কিন্তু <code>/login</code> বা <code>/register</code> রাউটে এটি লাগে না। এটি স্কিপ করার জন্য <code>express-unless</code> প্যাকেজ ব্যবহৃত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const unless = require('express-unless');

const authMiddleware = (req, res, next) => { /* auth logic */ };
authMiddleware.unless = unless;

// Skip auth for /login and /register routes
app.use(authMiddleware.unless({ path: ['/api/login', '/api/register'] }));</code></pre>
      </div>
    `
  },
  {
    id: "express-48",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Graceful Shutdown", "stoppable", "http-terminator"],
    question: "http-terminator দিয়ে Express Active Keep-Alive HTTP Connections দ্রুত বন্ধ কীভাবে করবেন?",
    answer: `
      <p>Graceful Shutdown এর সময় ডিফল্ট <code>server.close()</code> কন্টিনিউয়াস Keep-alive কানেকশন সকেট বন্ধ করতে দীর্ঘ সময় নেয়, কখনো কখনো হ্যাং করে। <code>http-terminator</code> বা <code>stoppable</code> প্যাকেজ সব আইডল সকেট দ্রুত কিল করে শাটডাউন প্রসেস ফাস্ট করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const httpTerminator = require('http-terminator');
const server = app.listen(3000);
const terminator = httpTerminator.createHttpTerminator({ server });

process.on('SIGTERM', async () => {
  await terminator.terminate(); // Forcefully closes keep-alive connections
});</code></pre>
      </div>
    `
  },
  {
    id: "express-49",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["OpenAPI", "express-openapi-validator", "Swagger"],
    question: "express-openapi-validator দিয়ে OpenAPI Specs (.yaml) থেকে অটোমেটিক রুট ভ্যালিডেশন কীভাবে করবেন?",
    answer: `
      <p>Swagger YAML স্পেক্স ফাইল লোড করে দিলে এটি ইনকামিং রিকোয়েস্টের Body, Query, Params অটোমেটিক ওপেনএপিআই স্পেক্স অনুযায়ী টেস্ট ও ভ্যালিডেট করে। হাতে কোড করে ভ্যালিডেশন করতে হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const OpenApiValidator = require('express-openapi-validator');

app.use(OpenApiValidator.middleware({
  apiSpec: './openapi.yaml',
  validateRequests: true, // Validates body, query, params
  validateResponses: true, // Validates response schema
}));</code></pre>
      </div>
    `
  },
  {
    id: "express-50",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Response", "res.format", "Content Negotiation"],
    question: "res.format() দিয়ে Express-এ Content Negotiation (JSON, HTML, Text) কীভাবে করবেন?",
    answer: `
      <p>ক্লায়েন্ট যখন <code>Accept</code> হেডার পাঠায়, তখন সেই হেডার অনুযায়ী একই রাউট থেকে ভিন্ন ভিন্ন ফরম্যাটে রেসপন্স পাঠানোর টেকনিককে Content Negotiation বলে। <code>res.format()</code> দিয়ে এটি করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.get('/user', (req, res) => {
  const data = { name: 'John' };
  res.format({
    'application/json': () => res.json(data),
    'text/html': () => res.send(\`&lt;h1&gt;\${data.name}&lt;/h1&gt;\`),
    'text/plain': () => res.send('User: John'),
    'default': () => res.status(406).send('Not Acceptable')
  });
});</code></pre>
      </div>
    `
  }
];