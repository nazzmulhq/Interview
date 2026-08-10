
const expressjsQuestions = [
  {
    id: "express-1",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Middleware", "Architecture", "next()"],
    question: "Express.js-এ Middleware কী? next() এবং next(err) কীভাবে রিকোয়েস্ট-রেসপন্স সাইকেল নিয়ন্ত্রণ করে?",
    answer: `
      <p><strong>Middleware</strong> হলো এমন ফাংশন যার কাছে Request Object (<code>req</code>), Response Object (<code>res</code>), এবং রিকোয়েস্ট-রেসপন্স সাইকেলের পরবর্তী মিডলওয়্যার ফাংশন <code>next</code>-এর অ্যাক্সেস থাকে।</p>
      <h4>Middleware-এর মূল দায়িত্ব:</h4>
      <ul>
        <li>যে কোনো কোড রান করা।</li>
        <li>Request এবং Response অবজেক্টে পরিবর্তন আনা (যেমন: user authentication data যুক্ত করা)।</li>
        <li>রিকোয়েস্ট-রেসপন্স সাইকেল শেষ করে দেওয়া (<code>res.send()</code> বা <code>res.json()</code>)।</li>
        <li>পরবর্তী মিডলওয়্যার কল করা (<code>next()</code>)।</li>
      </ul>
      <h4>next() vs next(err):</h4>
      <ul>
        <li><code>next()</code>: স্ট্যাকের পরবর্তী সাধারণ মিডলওয়্যার ফাংশনে কন্ট্রোল পাঠিয়ে দেয়।</li>
        <li><code>next(err)</code>: কোনো আর্গুমেন্ট পাস করলে Express বর্তমান বাকি সাধারণ মিডলওয়্যারগুলো স্কিপ করে সরাসরি <strong>Error Handling Middleware</strong>-এ জাম্প করে।</li>
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
      <p>Express.js-এ গ্লোবাল এরর হ্যান্ডলিং মিডলওয়্যার তৈরি করার জন্য চারটি (৪টি) প্যারামিটার থাকা বাধ্যতামূলক: <code>(err, req, res, next)</code>।</p>
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
      <p>Express v4-এ asynchronous <code>Promise.reject</code> বা <code>throw error</code> স্বয়ংক্রিয়ভাবে ধরা পড়ে না। তাই <code>try-catch</code> লিখে <code>next(err)</code> দিতে হয় অথবা <code>express-async-handler</code> র‍্যাপার ব্যবহার করতে হয়।</p>
      <p><em>নোট:</em> <strong>Express v5</strong>-এ Async handler-এর Unhandled Rejections স্বয়ংক্রিয়ভাবে গ্লোবাল এরর হ্যান্ডলারে চলে যায়।</p>
    `
  },
  {
    id: "express-3",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Rate Limit", "CORS"],
    question: "Express.js সার্ভারকে নিরাপদ (Security Best Practices) করার জন্য কী কী পদক্ষেপ নেওয়া উচিত?",
    answer: `
      <p>প্রোডাকশন লেভেলে একটি Express.js অ্যাপ্লিকেশনকে বিভিন্ন ধরনের সিকিউরিটি অ্যাটাক (XSS, CSRF, DDoS, SQL/NoSQL Injection) থেকে রক্ষা করার জন্য নিম্নের পদক্ষেপগুলো নেওয়া আবশ্যক:</p>
      <ol>
        <li><strong>Helmet.js:</strong> HTTP সিকিউরিটি হেডারের (X-DNS-Prefetch-Control, X-Frame-Options, Strict-Transport-Security ইত্যাদি) জন্য <code>app.use(helmet())</code> ব্যবহার করা।</li>
        <li><strong>Rate Limiting:</strong> Brute-force এবং DDoS প্রতিরোধে <code>express-rate-limit</code> দিয়ে আইপি ভিত্তিক রিকোয়েস্ট সামলানো।</li>
        <li><strong>CORS Configuration:</strong> কেবল বিশ্বস্ত ডোমেইনগুলোকে অনুমতি দেওয়া (<code>cors({ origin: 'https://myclient.com' })</code>)।</li>
        <li><strong>Data Sanitization:</strong> NoSQL Query Injection প্রতিরোধে <code>express-mongo-sanitize</code> এবং XSS থেকে বাঁচতে <code>xss-clean</code> ব্যবহার।</li>
        <li><strong>Hide Technology Stack:</strong> <code>app.disable('x-powered-by')</code> দিয়ে সার্ভারের নাম গোপন রাখা।</li>
      </ol>
    `
  },
  {
    id: "express-4",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["JWT", "Auth", "Cookies"],
    question: "Express.js-এ JWT Authentication কীভাবে বাস্তবায়ন করবেন? Access Token এবং Refresh Token-এর সেরা নিরাপত্তা কৌশল কী?",
    answer: `
      <p>JSON Web Token (JWT) হলো স্টেটলেস অথেনটিকেশনের সবচেয়ে জনপ্রিয় মাধ্যম।</p>
      <h4>নিরাপত্তা কৌশল (Security Best Practices):</h4>
      <ul>
        <li>Access Token কখনো <code>localStorage</code>-এ স্টোর করা উচিত নয় (XSS অ্যাটাকের ঝুঁকি থাকে)।</li>
        <li><strong>HTTP-Only Cookie:</strong> Access Token ও Refresh Token উভয়ই <code>httpOnly: true</code>, <code>secure: true</code> (HTTPS), এবং <code>sameSite: 'strict'</code> কুকিতে স্টোর করা সবচেয়ে নিরাপদ।</li>
        <li>Access Token-এর মেয়াদ কম রাখা (যেমন 15 minutes) এবং Refresh Token ব্যবহার করে নতুন Token জেনারেট করার মেকানিজম রাখা।</li>
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
      <p><code>express.Router()</code> হলো একটি মিনি-অ্যাপ্লিকেশন (Mini-app) বা আইসোলেটেড রাউটিং ইনস্ট্যান্স, যা দিয়ে অ্যাপ্লিকেশনের বিভিন্ন রাউট মডিউল আকারে ভাগ করা যায়।</p>
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
        <li>নির্দিষ্ট রাউট গ্রুপিংয়ের ওপর আলাদা মিডলওয়্যার অ্যানফোর্স করা যায় (যেমন <code>router.use(authCheck)</code>)।</li>
      </ul>
    `
  },
  {
    id: "express-6",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Validation", "Zod", "Joi"],
    question: "Request Payload Validation (Body, Query, Params) কেন জরুরি এবং Zod/Joi দিয়ে কীভাবে কাস্টম মিডলওয়্যার লিখবেন?",
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
    question: "Express.js-এ Multer ব্যবহার করে ফাইল আপলোড কীভাবে হ্যান্ডেল করবেন? ক্লাউড স্টোরেজে (S3) স্ট্রিম করার উপায় কী?",
    answer: `
      <p>Express.js নেটিভভাবে <code>multipart/form-data</code> পার্স করতে পারে না। এজন্য <code>multer</code> মিডলওয়্যার ব্যবহৃত হয়।</p>
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
      <p>উচ্চ ট্রাফিকের অ্যাপ্লিকেশনে Express.js-এর রেসপন্স গতি বাড়াতে ৩টি মুখ্য পদ্ধতি অবলম্বন করা যায়:</p>
      <ol>
        <li><strong>Response Compression:</strong> <code>compression</code> মিডলওয়্যার ব্যবহার করে JSON এবং HTML রেসপন্সকে Gzip/Brotli ফরম্যাটে কমপ্রেস করে নেটওয়ার্ক পেলোড ৭০% পর্যন্ত কমানো যায়।</li>
        <li><strong>Caching (Redis):</strong> ঘন ঘন কুয়েরি করা ধীর গতির ডাটাবেজ রেসপন্স কে র্যাডিসে (Redis) ক্যাশে করে রাখা।</li>
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
      <p><strong>Session-based (express-session):</strong> স্টেটফুল (Stateful)। সার্ভার মেমোরি বা Redis-এ সেশন আইডি স্টোর থাকে। ক্লায়েন্টকে শুধু সেশন আইডি কুকিতে পাঠানো হয়।</p>
      <p><em>সুবিধা:</em> যেকোনো সময় মেমোরি থেকে কোনো ইউজারকে তাত্ক্ষণিক রিমুভ/লগআউট করা যায়। <em>অসুবিধা:</em> একাধিক সার্ভারে লোড ব্যালেন্স করার সময় র্যাডিসের মতো কেন্দ্রীয় সেন্ট্রাল সেশন স্টোর লাগে।</p>
      <p><strong>Token-based (JWT):</strong> স্টেটলেস (Stateless)। সার্ভারে কিছু স্টোর করতে হয় না। টোকেনেই ডেটা থাকে।</p>
      <p><em>সুবিধা:</em> স্কেলেবিলিটি অত্যন্ত সহজ। <em>অসুবিধা:</em> মেয়াদ শেষ হওয়ার আগে সহজ উপায়ে টোকেন রিভোক (Revoke) করা যায় না (ব্ল্যাকলিস্টিং লাগাতে হয়)।</p>
    `
  },
  {
    id: "express-10",
    category: "Express.js",
    difficulty: "Beginner",
    tags: ["Built-in Middleware", "Body Parser"],
    question: "express.json() এবং express.urlencoded()-এর কাজ কী?",
    answer: `
      <p><code>express.json()</code> ও <code>express.urlencoded()</code> হলো Express-এর বিল্ট-ইন body-parsing middleware — HTTP রিকোয়েস্টের raw বাইট স্ট্রিমকে <code>req.body</code>-তে ব্যবহারযোগ্য JavaScript অবজেক্টে রূপান্তর করে।</p>
      <h4>কেন এগুলো দরকার — সমস্যাটি বুঝা</h4>
      <p>HTTP রিকোয়েস্ট বডি নেটওয়ার্কে <strong>raw বাইট স্ট্রিম</strong> হিসেবে আসে — Express (Node.js-এর মতোই) ডিফল্টভাবে এটি পার্স করে না। এই middleware ছাড়া <code>req.body</code> <code>undefined</code> থাকবে, এমনকি ক্লায়েন্ট সঠিকভাবে JSON পাঠালেও।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const express = require('express');
const app = express();

// JSON বডি পার্স করে (Content-Type: application/json)
app.use(express.json({ limit: '10mb' }));

// URL-encoded ফর্ম বডি পার্স করে (Content-Type: application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
  console.log(req.body);   // { name: 'Rahim', email: '...' } — parse না করলে undefined হতো
  res.json({ received: req.body });
});</code></pre>
      </div>
      <h4>কীভাবে কাজ করে — ভেতরের প্রক্রিয়া</h4>
      <p>এই middleware Content-Type হেডার দেখে — যদি অনুরূপ হয় (<code>application/json</code> বা <code>application/x-www-form-urlencoded</code>), তাহলে স্ট্রিম থেকে chunk-বাই-chunk ডেটা সংগ্রহ করে (Node.js stream হিসেবে), সম্পূর্ণ বডি জমা হলে JSON.parse (বা querystring parse) করে <code>req.body</code>-তে বসিয়ে দেয়। Content-Type না মিললে middleware কিছুই করে না, পরের middleware-এ চলে যায়।</p>
      <h4>express.urlencoded-এ extended অপশন</h4>
      <table>
        <tr><th>অপশন</th><th>পার্সিং লাইব্রেরি</th><th>সমর্থন</th></tr>
        <tr><td><code>extended: false</code></td><td>Node-এর বিল্ট-ইন <code>querystring</code></td><td>শুধু সাধারণ key-value, নেস্টেড অবজেক্ট নয়</td></tr>
        <tr><td><code>extended: true</code></td><td><code>qs</code> লাইব্রেরি</td><td>নেস্টেড অবজেক্ট ও অ্যারে পার্স করতে পারে (<code>user[name]=Rahim</code>)</td></tr>
      </table>
      <h4>নিরাপত্তা বিবেচনা — সিনিয়র-স্তরের গুরুত্বপূর্ণ পয়েন্ট</h4>
      <ul>
        <li><strong><code>limit</code> অপশন সবসময় সেট করুন:</strong> ডিফল্ট ১০০KB, কিন্তু স্পষ্টভাবে সেট না করলে ভুল অনুমান হতে পারে। সীমা ছাড়া একটি বিশাল বডি পাঠিয়ে DoS আক্রমণ (মেমরি এক্সহস্ট) সম্ভব।</li>
        <li><strong>ভুল JSON পাঠালে middleware নিজেই <code>SyntaxError</code> থ্রো করে</strong> — এটি ধরার জন্য একটি error-handling middleware (৪-প্যারামিটার সিগনেচার) থাকা আবশ্যক, নাহলে ক্লায়েন্ট একটি generic ৫০০ এরর পাবে informative মেসেজ ছাড়া।</li>
        <li><strong>Content-Type স্পুফিং:</strong> body-parser Content-Type হেডারের উপর নির্ভর করে — এটি ক্লায়েন্ট-নিয়ন্ত্রিত, তাই কখনও অন্ধভাবে বিশ্বাস করবেন না; সবসময় পার্স করা <code>req.body</code>-র উপর schema validation (Zod/Joi) চালান।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Multipart/form-data (ফাইল আপলোড) এই middleware দিয়ে পার্স হয় কি — না হলে কী ব্যবহার করবেন?</li>
        <li>body-parser SyntaxError কীভাবে সঠিকভাবে হ্যান্ডল করবেন?</li>
      </ul>
    `
  },
  {
    id: "express-11",
    category: "Express.js",
    difficulty: "Beginner",
    tags: ["Views", "SSR", "Templates"],
    question: "Express.js-এ Template Engine (EJS, Pug) কীভাবে কাজ করে?",
    answer: `
      <p>Template Engine হলো এমন একটি লাইব্রেরি যা সার্ভার সাইডে ডায়নামিক ভ্যারিয়েবল ব্যবহার করে HTML পেজ জেনারেট করে। Express.js এই টেমপ্লেটগুলোকে রেন্ডার করে ক্লায়েন্টের কাছে সম্পূর্ণ HTML হিসেবে পাঠায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'My App', user: 'Nazmul' });
});</code></pre>
      </div>
      <p>এখানে <code>index.ejs</code> ফাইলের ভেতর <code>&lt;h1&gt;&lt;%= title %&gt;&lt;/h1&gt;</code> লেখা থাকলে, এটি রেন্ডার হওয়ার পর <code>&lt;h1&gt;My App&lt;/h1&gt;</code> হিসেবে ব্রাউজারে দেখাবে।</p>
    `
  },
  {
    id: "express-12",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Deployment", "Proxy", "Security"],
    question: "Express.js-এ app.set('trust proxy', true) কেন ব্যবহার করা হয়?",
    answer: `
      <p>যখন Express অ্যাপ্লিকেশনটি Nginx, Varnish, AWS Load Balancer বা Cloudflare-এর মতো কোনো Reverse Proxy-এর পেছনে ডিপ্লয় করা হয়, তখন এক্সপ্রেস সরাসরি আসল ক্লায়েন্টের IP পায় না। সে প্রক্সি সার্ভারের IP ক্লায়েন্ট IP ভাবে।</p>
      <p><code>app.set('trust proxy', true)</code> সেট করলে Express বুঝতে পারে যে এটি একটি প্রক্সির পেছনে আছে এবং <code>X-Forwarded-For</code> বা <code>X-Forwarded-Proto</code> হেডারকে ট্রাস্ট করে আসল ক্লায়েন্টের IP ও HTTPS প্রোটোকল সঠিকভাবে পড়তে পারে।</p>
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
    tags: ["Realtime", "SSE", "HTTP"],
    question: "Express.js-এ Server-Sent Events (SSE) কীভাবে কাজ করে?",
    answer: `
      <p><strong>Server-Sent Events (SSE)</strong> হলো এমন একটি টেকনোলজি যেখানে সার্ভার থেকে ক্লায়েন্টের ব্রাউজারে রিয়েল-টাইমে একমুখী (One-way) লাইভ আপডেট পাঠানো যায়। WebSocket-এর মতো বাইডিরেকশনাল না হলেও এটি সেটআপ করা সহজ এবং HTTP প্রোটোকলের ওপর চলে।</p>
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
    tags: ["Ops", "Graceful Shutdown", "Process"],
    question: "Express.js-এ Graceful Shutdown কী?",
    answer: `
      <p>সার্ভার বন্ধ করার সময় (যেমন- ডিপ্লয়মেন্ট বা স্কেলিং) হঠাৎ করে প্রসেস কিল না করে, চলমান রিকোয়েস্টগুলো সম্পন্ন করা এবং ডাটাবেজ/রেডিস কানেকশন নিরাপদে বন্ধ করার কৌশলকে <strong>Graceful Shutdown</strong> বলে।</p>
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
    tags: ["Logging", "Winston", "Morgan"],
    question: "Production Express app-এ Morgan এবং Winston logger কীভাবে ব্যবহৃত হয়?",
    answer: `
      <p>প্রোডাকশন Express অ্যাপে দুই ধরনের logging দরকার — <strong>HTTP অ্যাক্সেস লগ</strong> (কে, কখন, কোন এন্ডপয়েন্ট হিট করল) এবং <strong>অ্যাপ্লিকেশন লগ</strong> (এরর, ডিবাগ তথ্য, বিজনেস ইভেন্ট)। Morgan প্রথমটির জন্য, Winston দ্বিতীয়টির জন্য — একসাথে ব্যবহার করা সাধারণ প্র্যাকটিস।</p>
      <h4>Morgan — HTTP Request Logger Middleware</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const morgan = require('morgan');
app.use(morgan('combined'));   // Apache-স্টাইল লগ ফরম্যাট
// আউটপুট: 127.0.0.1 - - [10/Aug/2026:10:00:00] "GET /api/users HTTP/1.1" 200 1234

// প্রোডাকশনে Winston-এর সাথে ইন্টিগ্রেট — Morgan-এর আউটপুট Winston দিয়ে লেখা
app.use(morgan('combined', {
  stream: { write: (msg) => logger.info(msg.trim()) }
}));</code></pre>
      </div>
      <p>Morgan প্রতিটি HTTP রিকোয়েস্টের জন্য স্বয়ংক্রিয়ভাবে একটি লগ লাইন তৈরি করে (method, URL, status code, response time) — এটি একটি middleware, তাই request pipeline-এর প্রতিটি রিকোয়েস্টে চলে, ম্যানুয়ালি প্রতিটি রুটে লগ লেখার দরকার নেই।</p>
      <h4>Winston — Structured Application Logger</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()          // ← structured JSON, log aggregator পার্স করতে পারে
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// অ্যাপ্লিকেশন কোডে ব্যবহার
logger.info('Order created', { orderId: 123, userId: 45 });
logger.error('Payment failed', { orderId: 123, error: err.message });</code></pre>
      </div>
      <h4>কেন JSON ফরম্যাট — Structured Logging-এর গুরুত্ব</h4>
      <p>প্লেইন টেক্সট লগ (<code>"Order 123 failed"</code>) মানুষের পড়ার জন্য সহজ, কিন্তু <strong>মেশিন পার্স করার জন্য কঠিন</strong>। JSON ফরম্যাটে লগ লিখলে (<code>{"orderId": 123, "level": "error", "msg": "Payment failed"}</code>) log aggregation টুল (ELK Stack, Datadog, CloudWatch) সরাসরি ফিল্ড-ভিত্তিক সার্চ ও ড্যাশবোর্ড তৈরি করতে পারে — "গত ১ ঘণ্টায় সব payment error দেখাও" এর মতো কোয়েরি সম্ভব হয়।</p>
      <h4>Log Level নিয়ন্ত্রণ — প্রোডাকশনে গুরুত্বপূর্ণ</h4>
      <table>
        <tr><th>Level</th><th>কখন ব্যবহার</th></tr>
        <tr><td><code>error</code></td><td>এক্সসেপশন, ফেইলিউর — তাৎক্ষণিক অ্যাকশন দরকার</td></tr>
        <tr><td><code>warn</code></td><td>অস্বাভাবিক কিন্তু ক্র্যাশ নয় (deprecated API ব্যবহার, retry হচ্ছে)</td></tr>
        <tr><td><code>info</code></td><td>গুরুত্বপূর্ণ বিজনেস ইভেন্ট (অর্ডার তৈরি, ইউজার লগইন)</td></tr>
        <tr><td><code>debug</code></td><td>ডেভেলপমেন্ট-স্তরের বিস্তারিত তথ্য — প্রোডাকশনে সাধারণত বন্ধ থাকে</td></tr>
      </table>
      <p>প্রোডাকশনে <code>debug</code> লেভেল চালু রাখলে লগ ভলিউম বিস্ফোরিত হয়ে যায় (স্টোরেজ খরচ, পারফরম্যান্স প্রভাব) — <code>NODE_ENV</code> অনুযায়ী লেভেল নিয়ন্ত্রণ জরুরি।</p>
      <h4>সিনিয়র-স্তরের বিবেচনা</h4>
      <ul>
        <li><strong>সংবেদনশীল ডেটা কখনও লগ করবেন না</strong> — পাসওয়ার্ড, টোকেন, ক্রেডিট কার্ড নম্বর। লগ প্রায়ই কম সুরক্ষিত সিস্টেমে সংরক্ষিত/এক্সপোর্ট হয়।</li>
        <li><strong>Correlation ID:</strong> প্রতিটি রিকোয়েস্টে একটি ইউনিক ID যোগ করে (middleware দিয়ে) সব লগ লাইনে সেটি সংযুক্ত করুন — একটি নির্দিষ্ট রিকোয়েস্টের পুরো জীবনচক্র ট্রেস করা সহজ হয় (microservices-এ বিশেষভাবে গুরুত্বপূর্ণ)।</li>
        <li><strong>Log rotation:</strong> ফাইলে লগ লিখলে <code>winston-daily-rotate-file</code> ব্যবহার করুন — নাহলে একটি একক লগ ফাইল ডিস্ক পূর্ণ করে ফেলতে পারে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Correlation ID কীভাবে microservices জুড়ে propagate করবেন?</li>
        <li>Winston-এর transport কীভাবে কাজ করে — একাধিক destination-এ একসাথে লেখা কীভাবে সম্ভব?</li>
      </ul>
    `
  },
  {
    id: "express-16",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Testing", "Supertest", "Architecture"],
    question: "Integration Testing-এ app.js এবং server.js আলাদা করা কেন ভালো প্র্যাকটিস?",
    answer: `
      <p>যদি <code>app.listen()</code> এবং এক্সপ্রেস অ্যাপ্লিকেশন সেটআপ একই ফাইলে থাকে, তবে টেস্ট রান করার সময় পোর্ট কনফ্লিক্ট হতে পারে বা টেস্ট চলাকালীন সার্ভার চালু হয়ে যেতে পারে।</p>
      <p>এটি সমাধানের জন্য <code>app.js</code> ফাইলে শুধু এক্সপ্রেস অ্যাপ কনফিগার করে <code>module.exports = app</code> করা হয়। আর <code>server.js</code> ফাইল থেকে অ্যাপকে ইম্পোর্ট করে <code>app.listen()</code> করা হয়।</p>
      <p>তখন <strong>Supertest</strong> দিয়ে <code>app.js</code>-কে সরাসরি ইম্পোর্ট করে কোনো পোর্ট বাইন্ড ছাড়াই টেস্ট করা যায়।</p>
    `
  },
  {
    id: "express-17",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Middleware", "HPP"],
    question: "HTTP Parameter Pollution (HPP) অ্যাটাক কী?",
    answer: `
      <p>অ্যাটাকার যখন URL-এ একই কোয়েরি প্যারামিটার একাধিকবার পাঠায় (যেমন: <code>?id=1&id=2</code>), তখন এক্সপ্রেস ডিফল্টভাবে সেটিকে অ্যারে (<code>['1', '2']</code>) হিসেবে গ্রহণ করে। এটি ডাটাবেজ বা লজিক ইঞ্জেকশন ঘটাতে পারে।</p>
      <p>একে <strong>HPP অ্যাটাক</strong> বলে। এটি প্রতিরোধ করতে <code>hpp</code> মিডলওয়্যার ব্যবহৃত হয়, যা ডুপ্লিকেট প্যারামিটারগুলো মুছে শুধু শেষের ভ্যালুটি রাখে।</p>
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
    tags: ["Security", "CSRF", "Auth"],
    question: "Cross-Site Request Forgery (CSRF) কী এবং এটি কীভাবে প্রতিরোধ করবেন?",
    answer: `
      <p><strong>CSRF</strong> হলো এমন একটি অ্যাটাক যেখানে অ্যাটাকার ইউজারের লগইন কুকি ব্যবহার করে ব্যাকগ্রাউন্ডে অনাকাঙ্ক্ষিত রিকোয়েস্ট পাঠিয়ে দেয়। এটি সাধারণত সেশন-ভিত্তিক অথেনটিকেশনে বেশি ঘটে।</p>
      <h4>প্রতিরোধের উপায়:</h4>
      <ul>
        <li><strong>CSRF Token:</strong> <code>csurf</code> প্যাকেজ ব্যবহার করে প্রতিটি ফর্মের সাথে একটি সিক্রেট টোকেন পাঠানো হয়, সার্ভার পোস্ট রিকোয়েস্টে সেই টোকেন ভ্যালিডেট করে।</li>
        <li><strong>SameSite Cookie:</strong> কুকিতে <code>sameSite: 'strict'</code> বা <code>sameSite: 'lax'</code> সেট করলে অন্য কোনো সাইট থেকে রিকোয়েস্ট এলে কুকি পাঠানো হয় না। আধুনিক ব্রাউজারে এটি CSRF প্রতিরোধের সবচেয়ে কার্যকর উপায়।</li>
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
      <p>Express মিডলওয়্যার চেইন আকারে কাজ করে। একটি মিডলওয়্যার তার কাজ শেষ করে <code>next()</code> ডাকলে পরবর্তী মিডলওয়্যারে কন্ট্রোল যায়।</p>
      <p>কিন্তু <code>next(err)</code> ডাকলে এক্সপ্রেস মাঝের সব সাধারণ মিডলওয়্যার স্কিপ করে সরাসরি <strong>Global Error Handling Middleware</strong>-এ চলে যায়।</p>
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
      <p><strong>Express 4:</strong> অ্যাসিনক্রোনাস ফাংশনে (<code>async/await</code>) যদি কোনো এরর থ্রো হয় বা প্রমিস রিজেক্ট হয়, এক্সপ্রেস সেটি স্বয়ংক্রিয়ভাবে ধরতে পারত না (Unhandled Rejection)। এটি হ্যান্ডেল করতে <code>try...catch</code> ব্লক লিখে ম্যানুয়ালি <code>next(err)</code> ডাকতে হতো, অথবা <code>express-async-handler</code> বা <code>express-async-errors</code> প্যাকেজ ব্যবহার করতে হতো।</p>
      <p><strong>Express 5:</strong> নেটিভভাবে প্রমিস এবং অ্যাসিনক্রোনাস এরর সাপোর্ট করে। এতে কোনো র‍্যাপার ছাড়াই অ্যাসিনক্রোনাস রাউট হ্যান্ডলারের এরর সরাসরি গ্লোবাল এরর হ্যান্ডলারে চলে যায়।</p>
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
    question: "express.Router() দিয়ে মডুলার ও মেইনটেইনেবল রুট আর্কিটেকচার কীভাবে সাজাবেন?",
    answer: `
      <p>বড় অ্যাপ্লিকেশনে সব রাউট এক ফাইলে রাখলে কোড আনমেইনটেইনেবল হয়ে যায়। <code>express.Router()</code> ব্যবহার করে রিসোর্স ভিত্তিক আর্কিটেকচার তৈরি করা হয়।</p>
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
      <p>এতে প্রতিটি ফিচারের রাউট আলাদা ফাইলে থাকে এবং কমন মিডলওয়্যার (যেমন- অথেনটিকেশন) শুধু নির্দিষ্ট রাউটারে অ্যাপ্লাই করা যায়।</p>
    `
  },
  {
    id: "express-22",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Performance", "Route Matcher", "radix-tree"],
    question: "Express Route Matching Performance এবং অতিরিক্ত মিডলওয়্যার ওভারহেড কীভাবে কমাবেন?",
    answer: `
      <p>Express-এ প্রতিটি ইনকামিং রিকোয়েস্ট সব গ্লোবাল মিডলওয়্যার এবং রাউট স্ট্যাকের মধ্য দিয়ে যায়। পারফরম্যান্স অপটিমাইজ করতে নিচের নিয়মগুলো মানা উচিত:</p>
      <ul>
        <li><strong>Global Middleware কমানো:</strong> <code>body-parser</code> বা <code>cookie-parser</code> এর মতো ভারী মিডলওয়্যার সব রাউটের দরকার হয় না। এগুলো শুধু নির্দিষ্ট রাউটে ব্যবহার করা উচিত।</li>
        <li><strong>Static Routes আগে রাখা:</strong> ডায়নামিক রাউট (<code>/users/:id</code>) এর আগে স্ট্যাটিক রাউট (<code>/users/me</code>) ডিক্লেয়ার করা ভালো।</li>
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
      <p>ক্লায়েন্ট থেকে ডেটা রিসিভ করার ৩টি প্রধান উপায় হলো:</p>
      <ul>
        <li><strong>req.params:</strong> URL-এর ডাইনামিক সেগমেন্ট থেকে ডেটা পাওয়া যায়। <br><code>/users/:id</code> -> <code>req.params.id</code></li>
        <li><strong>req.query:</strong> URL-এর পরে <code>?</code> চিহ্নের মাধ্যমে কোয়েরি প্যারামিটার পাঠানো হয়। সাধারণত ফিল্টারিং, সর্টিং বা পেজিনেশনে ব্যবহৃত হয়। <br><code>/users?role=admin</code> -> <code>req.query.role</code></li>
        <li><strong>req.body:</strong> HTTP বডিতে (সাধারণত POST, PUT, PATCH) JSON বা Form ডেটা হিসেবে পাঠানো ডেটা পার্স করে পাওয়া যায়।</li>
      </ul>
    `
  },
  {
    id: "express-24",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Express.js", "Middleware", "Architecture", "Senior"],
    question: "Express-এ Application-level, Router-level এবং Route-level Middleware-এর scope ও execution order কী?",
    answer: `
      <p>Express middleware তিনটি ভিন্ন স্তরে ডিফাইন করা যায় — প্রতিটির scope ও কার্যকরী পরিসর ভিন্ন, এবং তাদের ডিফাইন করার ক্রমই নির্ধারণ করে execution order।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Application-level — প্রতিটি রিকোয়েস্টে চলে (পুরো অ্যাপে)
app.use((req, res, next) => { console.log('সব রিকোয়েস্টে'); next(); });

// Router-level — শুধু নির্দিষ্ট router-এর রুটগুলোতে চলে
const router = express.Router();
router.use((req, res, next) => { console.log('শুধু /api/* রুটে'); next(); });
app.use('/api', router);

// Route-level — শুধু একটি নির্দিষ্ট রুটে চলে
app.get('/orders/:id', authMiddleware, validateId, getOrderController);
// authMiddleware, validateId শুধু এই একটি রুটেই সক্রিয়</code></pre>
      </div>
      <h4>Execution Order — কেন এটি গুরুত্বপূর্ণ</h4>
      <p>Express middleware <strong>ডিফাইন করার ক্রম অনুযায়ী</strong> চলে — উপর থেকে নিচে। একটি Application-level middleware Router-level middleware-এর আগে <code>app.use()</code> করা হলে, সেটি router-এর middleware চেইনের আগে চলবে। এই কারণে সাধারণ নিয়ম: সবচেয়ে সাধারণ (broad) middleware (logging, CORS, body-parser) আগে, নির্দিষ্ট (specific) middleware (auth, validation) পরে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.use(morgan('combined'));       // ১. সব রিকোয়েস্টে লগিং
app.use(express.json());           // ২. body parsing
app.use('/api', apiRouter);        // ৩. router-level middleware + রুট হ্যান্ডলার
app.use(errorHandler);             // ৪. সবার শেষে — ৪-প্যারামিটার error middleware</code></pre>
      </div>
      <h4>সিনিয়র-স্তরের সতর্কতা</h4>
      <p>Error-handling middleware (৪-প্যারামিটার সিগনেচার <code>(err, req, res, next)</code>) সবসময় সব রুট ডিফাইন করার <strong>পরে</strong> রাখতে হবে — নাহলে এটি কখনও ট্রিগার হবে না, কারণ Express middleware ক্রমানুসারে চেক করে এবং error middleware শুধুমাত্র <code>next(err)</code> কল হলে খোঁজা হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একটি route-level middleware থেকে router-level middleware skip করানো সম্ভব কি (next('route'))?</li>
      </ul>
    `
  },
  {
    id: "express-25",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "CORS", "Preflight"],
    question: "CORS Preflight Options Request (HTTP OPTIONS) কী এবং Express-এ cors() মিডলওয়্যার কীভাবে কাজ করে?",
    answer: `
      <p>ব্রাউজার যখন কোনো ক্রস-অরিজিন রিকোয়েস্ট (যেমন- কাস্টম হেডার বা PUT/DELETE মেথড) পাঠায়, তখন সে নিরাপত্তার জন্য আসল রিকোয়েস্টের আগে একটি <strong>OPTIONS</strong> (Preflight) রিকোয়েস্ট পাঠায় সার্ভারকে জিজ্ঞেস করতে যে এই রিকোয়েস্টটি গ্রহণযোগ্য কি না।</p>
      <p>এক্সপ্রেসে <code>cors()</code> মিডলওয়্যার এই Preflight রিকোয়েস্ট হ্যান্ডেল করে এবং সঠিক <code>Access-Control-Allow-*</code> হেডার সেট করে ব্রাউজারকে গ্রিন সিগন্যাল দেয়।</p>
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
    question: "cookie-parser মিডলওয়্যার এবং httpOnly, Secure, SameSite Cookie Attributes-এর সিকিউরিটি ভূমিকা কী?",
    answer: `
      <p><code>cookie-parser</code> ক্লায়েন্টের পাঠানো <code>Cookie</code> হেডারকে পার্স করে <code>req.cookies</code> অবজেক্ট বানায়।</p>
      <h4>সিকিউরিটি এট্রিবিউটসমূহ:</h4>
      <ul>
        <li><strong>httpOnly: true</strong> দিলে ক্লায়েন্ট সাইড জাভাস্ক্রিপ্ট (<code>document.cookie</code>) দিয়ে কুকি পড়া যায় না, ফলে XSS অ্যাটিকে টোকেন চুরি হতে পারে না।</li>
        <li><strong>secure: true</strong> দিলে কেবল HTTPS কানেকশনেই কুকি ট্রান্সমিট হয়।</li>
        <li><strong>sameSite: 'strict'</strong> দিলে অন্য কোনো সাইট থেকে রিকোয়েস্ট এলে কুকি যায় না, ফলে CSRF অ্যাটাক প্রতিরোধ হয়।</li>
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
      <p>এটি সমাধান করতে সেন্ট্রাল <strong>Redis</strong> ডাটাবেজ ব্যবহার করা হয়, যেখানে সব প্রসেস একই আইপির রিকোয়েস্ট কাউন্ট শেয়ার করে।</p>
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
    question: "Express-এ res.sendFile vs res.download vs Streams দিয়ে বড় ফাইল ডাউনলোড কীভাবে করাবেন?",
    answer: `
      <ul>
        <li><strong>res.sendFile(path):</strong> ব্রাউজারে ফাইলটি ডিসপ্লে করার জন্য (যেমন- ছবি বা পিডিএফ ব্রাউজারেই খোলে) পাঠানো হয়।</li>
        <li><strong>res.download(path):</strong> ফাইলটিকে ব্রাউজারে Attachment হিসেবে সেভ করতে বাধ্য করে।</li>
        <li><strong>Streams (res.pipe):</strong> বড় ফাইল (যেমন- ভিডিও) পাঠানোর জন্য মেমোরিতে পুরো ফাইল লোড না করে ছোট ছোট চাংক (chunk) হিসেবে স্ট্রিম করা হয়। এটি সবচেয়ে মেমোরি-ইফিশিয়েন্ট।</li>
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
    question: "express-session এবং connect-redis দিয়ে Scalable Session Storage কীভাবে তৈরি করবেন?",
    answer: `
      <p><code>express-session</code> ডিফল্টভাবে মেমোরিতে সেশন স্টোর করে, যা প্রোডাকশনে মেমোরি লিক ঘটায় এবং ক্লাস্টার মোডে কাজ করে না। স্কেলেবিলিটির জন্য <code>connect-redis</code> ব্যবহার করে সেশন ডাটাবেজে স্টোর করা হয়।</p>
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
      <p>রেসপন্স পেলোড কমাতে <code>compression</code> মিডলওয়্যার ব্যবহৃত হয়। ব্রাউজার যদি <code>Accept-Encoding: br</code> হেডার পাঠায়, তবে এটি Brotli (যা Gzip-এর চেয়ে বেশি কম্প্রেস করে) ব্যবহার করে।</p>
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
    question: "express.static() দিয়ে স্ট্যাটিক ফাইল সার্ভিং এবং Cache-Control Max-Age সেট কীভাবে করবেন?",
    answer: `
      <p><code>express.static()</code> একটি বিল্ট-ইন middleware যা একটি নির্দিষ্ট ডিরেক্টরি থেকে ফাইল (HTML, CSS, JS, ছবি) সরাসরি সার্ভ করে — প্রতিটি ফাইলের জন্য আলাদা রুট হ্যান্ডলার লেখার প্রয়োজন হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const path = require('path');

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',              // ব্রাউজার ক্যাশ কতদিন বৈধ থাকবে
  etag: true,                  // কনটেন্ট বদলেছে কিনা যাচাইয়ের জন্য
  immutable: true,             // ফাইলনাম বদলাবে না, ক্যাশ পুনরায় যাচাই না করেই ব্যবহারযোগ্য
  index: 'index.html'
}));

// রিকোয়েস্ট: GET /style.css → সার্ভ হয় public/style.css থেকে</code></pre>
      </div>
      <h4>Cache-Control হেডার — কেন এত গুরুত্বপূর্ণ</h4>
      <p>স্ট্যাটিক ফাইল (CSS, JS bundle, ছবি) প্রতি রিকোয়েস্টে বদলায় না — একবার ব্রাউজারে ক্যাশ হয়ে গেলে বারবার নেটওয়ার্কে আনার প্রয়োজন নেই। <code>maxAge</code> অপশন <code>Cache-Control: max-age=...</code> হেডার সেট করে, যা ব্রাউজারকে বলে দেয় কতক্ষণ পর্যন্ত সার্ভারকে না জিজ্ঞেস করেই cache থেকে ফাইল ব্যবহার করা যাবে।</p>
      <h4>Cache Busting — versioned ফাইলনামের সাথে সংমিশ্রণ</h4>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>❌ সমস্যা: /style.css দীর্ঘ maxAge দিয়ে ক্যাশ করা হলে,
   সার্ভারে ফাইল আপডেট হলেও ব্রাউজার পুরনো ভার্সন দেখাতে থাকবে ১ বছর পর্যন্ত!

✅ সমাধান: বিল্ড টুল ফাইলনামে hash যোগ করে
   /style.a3f92c.css   ← কনটেন্ট বদলালে hash-ও বদলে যায়, নতুন URL
   → immutable + maxAge: 1y নিরাপদ, কারণ URL-ই বদলে গেছে
   → HTML ফাইল (যা নতুন hash রেফারেন্স করে) সবসময় no-cache/short cache</code></pre>
      </div>
      <p><strong>এই কারণেই <code>immutable: true</code></strong> শুধু hash-নেমড ফাইলে নিরাপদ — ব্রাউজারকে বলে "এই URL-এর কনটেন্ট কখনও বদলাবে না, revalidate করারও দরকার নেই"। কিন্তু <code>index.html</code>-এর মতো এন্ট্রি ফাইল, যা নতুন hash রেফারেন্স করে, দীর্ঘ ক্যাশ করা যাবে না — নাহলে ব্যবহারকারী পুরনো bundle-এর রেফারেন্স নিয়ে আটকে থাকবেন।</p>
      <h4>ETag — Conditional Revalidation</h4>
      <p>যেসব ফাইলের নামে hash নেই (বা ছোট maxAge সেট করা), ব্রাউজার পরবর্তী রিকোয়েস্টে <code>If-None-Match</code> হেডারে পুরনো ETag পাঠায় — সার্ভার যদি দেখে ফাইল বদলায়নি, শুধু <code>304 Not Modified</code> পাঠায় (কোনো বডি ছাড়া) — পুরো ফাইল আবার ডাউনলোড করার প্রয়োজন হয় না।</p>
      <h4>প্রোডাকশনে সিনিয়র-স্তরের বিবেচনা</h4>
      <ul>
        <li><strong>Node.js প্রসেস দিয়ে স্ট্যাটিক ফাইল সার্ভ করা প্রোডাকশনে অদক্ষ</strong> — Node single-threaded event loop স্ট্যাটিক ফাইল সার্ভিংয়ে ব্যস্ত থাকলে actual API রিকোয়েস্ট প্রসেস করার ক্ষমতা কমে যায়। প্রোডাকশনে সাধারণত <strong>Nginx বা CDN</strong> স্ট্যাটিক ফাইল সার্ভ করে, Node শুধু API হ্যান্ডল করে।</li>
        <li><strong>Compression:</strong> <code>compression</code> middleware বা Nginx gzip/brotli দিয়ে ফাইল সংকুচিত করে পাঠানো — নেটওয়ার্ক ট্রান্সফার কমায়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>CDN ব্যবহার করলে express.static-এর ভূমিকা কী থাকে?</li>
        <li>ETag ও Last-Modified হেডারের মধ্যে পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "express-33",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Security", "Helmet", "Content-Security-Policy"],
    question: "Helmet.js দিয়ে Express-এ Content Security Policy (CSP) কীভাবে সেটআপ করবেন?",
    answer: `
      <p><strong>CSP (Content Security Policy)</strong> একটি হেডার যা ব্রাউজারকে নির্দেশ দেয় কোন ডোমেইন থেকে স্ক্রিপ্ট, স্টাইল বা ইমেজ লোড করা নিরাপদ। এটি XSS অ্যাটাক প্রতিরোধ করে। Helmet.js দিয়ে এটি কনফিগার করা যায়।</p>
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
    question: "Express-এ router.param() মিডলওয়্যার দিয়ে ড্রাই (DRY) কোড কীভাবে লিখবেন?",
    answer: `
      <p>যখন কোনো রাউটে <code>:id</code> প্যারামিটার থাকে, তখন ডাটাবেজ থেকে ইউজার খুঁজে আনার লজিক প্রতিটি রাউটে না লিখে <code>router.param()</code> দিয়ে একবার লেখা যায়।</p>
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
    question: "Express.js-এ MVC / Controller-Service-Repository Pattern আর্কিটেকচার কেন প্রয়োজনীয়?",
    answer: `
      <p>MVC (Model-View-Controller) বা তার API-কেন্দ্রিক রূপ <strong>Controller-Service-Repository</strong> প্যাটার্ন Express অ্যাপে দায়িত্ব আলাদা করার জন্য ব্যবহৃত হয় — ছোট অ্যাপে সব লজিক একটি ফাইলে (route handler-এ) লেখা সম্ভব, কিন্তু বড় হতে থাকলে এটি রক্ষণাবেক্ষণযোগ্য থাকে না।</p>
      <h4>কেন প্রয়োজন — সমস্যাটি</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ সব লজিক একসাথে — route handler-এ DB কোয়েরি, বিজনেস লজিক, response ফরম্যাটিং
app.post('/orders', async (req, res) => {
  const { userId, items } = req.body;
  if (!items.length) return res.status(400).json({ error: 'Empty cart' });
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  if (!user) return res.status(404).json({ error: 'User not found' });
  let total = 0;
  for (const item of items) { total += item.price * item.qty; }
  const discount = user.isPremium ? total * 0.1 : 0;
  const order = await db.query('INSERT INTO orders ...', [...]);
  await emailService.send(user.email, 'Order confirmed');
  res.json({ order, total: total - discount });
});
// টেস্ট করা কঠিন, পুনর্ব্যবহার অসম্ভব, ফাইল বড় হতে থাকলে বোঝা কঠিন</code></pre>
      </div>
      <h4>তিন স্তরে ভাগ করা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Controller — শুধু HTTP layer সামলায় (request/response)
class OrderController {
  async create(req, res, next) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (err) { next(err); }
  }
}

// Service — বিজনেস লজিক, HTTP সম্পর্কে কিছুই জানে না
class OrderService {
  async createOrder({ userId, items }) {
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    const total = this.calculateTotal(items, user.isPremium);
    const order = await orderRepository.create({ userId, items, total });
    await emailService.sendConfirmation(user.email, order);
    return order;
  }
  calculateTotal(items, isPremium) { /* pure বিজনেস লজিক, সহজে ইউনিট টেস্টযোগ্য */ }
}

// Repository — শুধু ডেটা অ্যাক্সেস, কোনো বিজনেস লজিক নেই
class OrderRepository {
  async create(data) { return db.query('INSERT INTO orders ...', [...]); }
  async findById(id) { return db.query('SELECT * FROM orders WHERE id = $1', [id]); }
}</code></pre>
      </div>
      <h4>প্রতিটি স্তরের দায়িত্ব</h4>
      <table>
        <tr><th>স্তর</th><th>দায়িত্ব</th><th>জানে না</th></tr>
        <tr><td><strong>Controller</strong></td><td>HTTP রিকোয়েস্ট পার্স করা, response ফরম্যাট করা, status code</td><td>বিজনেস লজিক, SQL</td></tr>
        <tr><td><strong>Service</strong></td><td>বিজনেস লজিক, একাধিক repository/external service সমন্বয়</td><td>HTTP (req/res), SQL সিনট্যাক্স</td></tr>
        <tr><td><strong>Repository</strong></td><td>ডেটাবেজ কোয়েরি, ORM/query builder ব্যবহার</td><td>বিজনেস নিয়ম</td></tr>
      </table>
      <h4>সুবিধা</h4>
      <ul>
        <li><strong>টেস্টেবিলিটি:</strong> Service স্তর ইউনিট টেস্ট করা যায় HTTP বা ডাটাবেজ ছাড়াই — mock repository দিয়ে বিজনেস লজিক আলাদাভাবে যাচাই করা যায়।</li>
        <li><strong>পুনর্ব্যবহারযোগ্যতা:</strong> একই Service একাধিক Controller থেকে (REST API + GraphQL resolver + CLI script) ব্যবহার করা যায়।</li>
        <li><strong>ডাটাবেজ পরিবর্তন সহজ:</strong> Repository-তে ডাটাবেজ-নির্দিষ্ট কোড আটকে থাকে — MongoDB থেকে PostgreSQL-এ সরলে শুধু Repository বদলাতে হয়, Service/Controller অপরিবর্তিত থাকে।</li>
      </ul>
      <h4>সিনিয়র-স্তরের সতর্কতা — Over-engineering এড়ানো</h4>
      <p>খুব ছোট CRUD API-তে (৩-৪টি এন্ডপয়েন্ট, কোনো জটিল বিজনেস লজিক নেই) এই তিন-স্তর বিভাজন অপ্রয়োজনীয় জটিলতা যোগ করতে পারে। <strong>প্যাটার্ন প্রয়োগের সিদ্ধান্ত প্রজেক্টের জটিলতার সাথে সামঞ্জস্যপূর্ণ হওয়া উচিত</strong> — একটি ৫-রুটের প্রোটোটাইপে এই কাঠামো চাপিয়ে দেওয়া অপ্রয়োজনীয় বয়লারপ্লেট তৈরি করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Dependency Injection কীভাবে এই প্যাটার্নের সাথে সংযুক্ত হয় (NestJS-এর তুলনায়)?</li>
        <li>Repository প্যাটার্ন ব্যবহার করলে ORM (Prisma/TypeORM)-এর সাথে কীভাবে সংমিশ্রণ করবেন?</li>
      </ul>
    `
  },
  {
    id: "express-36",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["HTTP Status", "Status Codes", "REST"],
    question: "RESTful API-তে এক্সপ্রেস দিয়ে সঠিক HTTP Status Codes (200, 201, 204, 400, 401, 403, 404, 409, 500) ব্যবহারের নিয়ম কী?",
    answer: `
      <p>REST API-তে সঠিক স্ট্যাটাস কোড ক্লায়েন্টকে রিকোয়েস্টের ফলাফল বোঝাতে সাহায্য করে।</p>
      <ul>
        <li><strong>200 OK:</strong> সফল রিকোয়েস্ট (GET, PUT, PATCH)।</li>
        <li><strong>201 Created:</strong> নতুন রিসোর্স তৈরি হয়েছে (POST)।</li>
        <li><strong>204 No Content:</strong> সফলভাবে ডিলিট হয়েছে, কোনো বডি নেই (DELETE)।</li>
        <li><strong>400 Bad Request:</strong> ভ্যালিডেশন এরর।</li>
        <li><strong>401 Unauthorized:</strong> লগইন করা নেই বা টোকেন নেই।</li>
        <li><strong>403 Forbidden:</strong> লগইন আছে কিন্তু অ্যাডমিন পারমিশন নেই।</li>
        <li><strong>404 Not Found:</strong> রিসোর্স পাওয়া যায়নি।</li>
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
      <p>সাধারণত এক্সপ্রেস (<code>app.listen</code>) এবং Socket.io আলাদা পোর্টে রান করা যায়। তবে একই পোর্টে চালাতে হলে HTTP সার্ভার ইনস্ট্যান্স শেয়ার করতে হয়।</p>
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
      <p>মিডলওয়্যার থেকে কন্ট্রোলারে ডেটা পাস করার জন্য <code>req</code> অবজেক্টে কাস্টম প্রপার্টি (যেমন <code>req.user</code>) যোগ করা হয়। এটি কাজ করলেও, এক্সপ্রেসের অফিশিয়াল ও নিরাপদ উপায় হলো <code>res.locals</code>।</p>
      <p><code>res.locals</code> বর্তমান রিকোয়েস্টের ভিউ বা পরবর্তী মিডলওয়্যারে স্কোপড ভ্যারিয়েবল পাস করতে ব্যবহৃত হয়। রেসপন্ট শেষ হলে এটি ক্লিয়ার হয়ে যায়।</p>
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
    question: "express-http-proxy দিয়ে এক্সপ্রেসকে এপিআই গেটওয়ে প্রক্সি হিসেবে কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>মাইক্রোসার্ভিস আর্কিটেকচারে একটি এক্সপ্রেস অ্যাপকে API Gateway হিসেবে ব্যবহার করে অন্যান্য ইন্টারনাল সার্ভিসে রিকোয়েস্ট ফরওয়ার্ড করা যায়। <code>express-http-proxy</code> এর মাধ্যমে এটি সহজ।</p>
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
    question: "Express-এ res.on('finish') এবং res.on('close') ইভেন্ট দিয়ে Response Metrics ট্র্যাকিং কীভাবে করবেন?",
    answer: `
      <p>রেসপন্স ক্লায়েন্টের কাছে যাওয়ার পর বা কানেকশন বন্ধ হওয়ার পর কিছু কাজ (যেমন- মেট্রিক্স বা অ্যানালিটিক্স লগ করা) করার জন্য এই ইভেন্টগুলো ব্যবহৃত হয়।</p>
      <ul>
        <li><strong>res.on('finish'):</strong> যখন সম্পূর্ণ রেসপন্স হেডার এবং বডি সাকসেসফুলি ক্লায়েন্টের কাছে সেন্ড হয়ে যায় এবং রেসপন্স শেষ হয়।</li>
        <li><strong>res.on('close'):</strong> যখন রেসপন্স শেষ হওয়ার আগেই ক্লায়েন্ট কানেকশন বন্ধ করে দেয় (যেমন- ব্রাউজার ট্যাব বন্ধ করা)।</li>
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
    question: "Express-এ HTTP Response Splitting / Header Injection কীভাবে এড়াবেন?",
    answer: `
      <p><strong>HTTP Response Splitting</strong> হলো এমন একটি অ্যাটাক যেখানে অ্যাটাকার ইউজার ইনপুটের মাধ্যমে হেডারে <code>\\r\\n</code> (Carriage Return Line Feed) ইনজেক্ট করে নতুন হেডার বা বডি তৈরি করে।</p>
      <p>Express.js v4+ এই সমস্যাটি নেটিভভাবে হ্যান্ডেল করে। এটি হেডার সেট করার সময় <code>\\r</code> বা <code>\\n</code> ক্যারেক্টার পেলে স্বয়ংক্রিয়ভাবে এরর থ্রো করে। তবে ডেভেলপার হিসেবে ইউজার ইনপুট হেডারে ব্যবহার করার আগে স্যানিটাইজ করা উচিত।</p>
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
    question: "Multer ফাইল আপলোডের সময় Disk Storage vs Memory Buffer Memory Leak এড়ানোর কৌশল কী?",
    answer: `
      <p>Multer ডিফল্টভাবে ফাইলকে মেমোরিতে (MemoryStorage) রাখে। বড় ফাইল আপলোড হলে পুরো ফাইল RAM-এ স্পেস নেয়, যা Memory Leak বা ক্র্যাশ করতে পারে।</p>
      <p>এটি এড়াতে বড় ফাইলের জন্য <code>diskStorage</code> ব্যবহার করা উচিত, যা ফাইলকে সরাসরি ডিস্কের একটি টেম্প ফোল্ডারে সেভ করে। অথবা <code>multer-s3</code> ব্যবহার করে সরাসরি AWS S3-এ স্ট্রিম করা যায়।</p>
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
      <p><strong>ETag</strong> (Entity Tag) হলো একটি হ্যাশ ভ্যালু যা এক্সপ্রেস প্রতিটি রেসপন্সের সাথে পাঠায়। ব্রাউজার পরের বার একই রিসোর্স চাইলে <code>If-None-Match</code> হেডারে সেই ETag পাঠায়। সার্ভার যদি দেখে ডাটা পরিবর্তন হয়নি, তবে সে কোনো বডি ছাড়া শুধু <strong>304 Not Modified</strong> স্ট্যাটাস পাঠায়।</p>
      <p>এতে ব্যান্ডউইথ বাঁচে এবং লোডিং দ্রুত হয়।</p>
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
    question: "Supertest এবং Jest দিয়ে Express REST API Route Testing কীভাবে করবেন?",
    answer: `
      <p>Supertest ও Jest একসাথে ব্যবহার করে Express রুট টেস্ট করার অর্থ — অ্যাপকে বাস্তব পোর্টে চালু না করেই HTTP রিকোয়েস্ট সিমুলেট করা এবং response যাচাই করা।</p>
      <h4>বেসিক সেটআপ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// app.js — app.listen() আলাদা রাখা, শুধু app এক্সপোর্ট করা (টেস্টের জন্য গুরুত্বপূর্ণ)
const app = express();
app.use(express.json());
app.get('/users/:id', getUserController);
module.exports = app;   // listen() এখানে নেই!

// server.js — শুধু এখানে listen()
const app = require('./app');
app.listen(3000);

// users.test.js
const request = require('supertest');
const app = require('../app');

describe('GET /users/:id', () => {
  it('returns 200 with user data for valid id', async () => {
    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: expect.any(String) });
  });

  it('returns 404 for non-existent user', async () => {
    const res = await request(app).get('/users/99999');
    expect(res.status).toBe(404);
  });
});</code></pre>
      </div>
      <h4>কেন app.listen() আলাদা রাখা জরুরি</h4>
      <p>Supertest সরাসরি Express app instance-এর সাথে কাজ করে — এটি অভ্যন্তরীণভাবে একটি এলোমেলো পোর্টে সাময়িক সার্ভার চালু করে, তারপর বন্ধ করে দেয়, প্রতিটি টেস্টের জন্য। যদি <code>app.js</code>-এ <code>app.listen(3000)</code> সরাসরি থাকে, প্রতিটি টেস্ট ফাইল সেই একই পোর্টে বাইন্ড করার চেষ্টা করবে — <code>EADDRINUSE</code> এরর দেবে। এজন্যই app ও server আলাদা ফাইলে ভাগ করা একটি গুরুত্বপূর্ণ টেস্টেবিলিটি প্যাটার্ন।</p>
      <h4>POST রিকোয়েস্ট ও Authentication টেস্ট</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>it('creates an order with valid data', async () => {
  const res = await request(app)
    .post('/orders')
    .set('Authorization', \`Bearer \${testToken}\`)
    .send({ items: [{ productId: 1, qty: 2 }] });

  expect(res.status).toBe(201);
  expect(res.body.total).toBe(200);
});

it('rejects request without auth token', async () => {
  const res = await request(app).post('/orders').send({ items: [] });
  expect(res.status).toBe(401);
});</code></pre>
      </div>
      <h4>Database Mocking বনাম Test Database — সিনিয়র-স্তরের সিদ্ধান্ত</h4>
      <table>
        <tr><th>পদ্ধতি</th><th>সুবিধা</th><th>ঝুঁকি</th></tr>
        <tr><td><strong>Mock DB layer</strong></td><td>দ্রুত, বিচ্ছিন্ন (isolated)</td><td>প্রকৃত SQL/query ভুল ধরা পড়ে না</td></tr>
        <tr><td><strong>Test DB (Docker container, প্রতিটি টেস্ট রানে রিসেট)</strong></td><td>বাস্তব ডাটাবেজ আচরণ যাচাই করে — constraint, transaction, migration সবকিছু</td><td>ধীর, সেটআপ জটিল</td></tr>
      </table>
      <p><strong>ইন্টিগ্রেশন টেস্টে বাস্তব (কিন্তু বিচ্ছিন্ন) টেস্ট ডাটাবেজ ব্যবহার করা বেশি নির্ভরযোগ্য</strong> — DB layer মক করলে মক ও বাস্তব ডাটাবেজের আচরণ ভিন্ন হয়ে গেলে সেই বাগ টেস্টে ধরা পড়ে না, প্রোডাকশনে গিয়ে দেখা যায়।</p>
      <h4>টেস্ট আইসোলেশন — প্রতিটি টেস্ট স্বাধীন হওয়া উচিত</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>beforeEach(async () => {
  await db.query('BEGIN');           // প্রতিটি টেস্টের আগে transaction শুরু
});
afterEach(async () => {
  await db.query('ROLLBACK');        // পরে rollback — কোনো side effect থাকবে না
});
// এভাবে একটি টেস্ট অন্য টেস্টের ডেটার উপর নির্ভর করে না, ক্রম যাই হোক ফলাফল একই</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Supertest দিয়ে ফাইল আপলোড এন্ডপয়েন্ট কীভাবে টেস্ট করবেন?</li>
        <li>CI pipeline-এ টেস্ট ডাটাবেজ কীভাবে সেটআপ করবেন (Docker Compose)?</li>
      </ul>
    `
  },
  {
    id: "express-45",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Routing", "Case Sensitivity", "Strict Routing"],
    question: "Express Application Settings: 'case sensitive routing' এবং 'strict routing' এর কাজ কী?",
    answer: `
      <p>Express-এর <code>app.set()</code>-এ দুটি রাউটিং-সম্পর্কিত সেটিং আছে যা ডিফল্টভাবে বন্ধ থাকে — এগুলো URL ম্যাচিং কতটা কঠোর হবে তা নিয়ন্ত্রণ করে, এবং ভুল বোঝাবুঝি প্রায়ই প্রোডাকশনে অপ্রত্যাশিত রাউট আচরণের কারণ হয়।</p>
      <h4>case sensitive routing</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.set('case sensitive routing', true);

app.get('/Users', handler);
// ডিফল্ট (false): /users এবং /Users উভয়ই এই হ্যান্ডলারে যায়
// true হলে: শুধু /Users ম্যাচ করবে, /users হবে 404</code></pre>
      </div>
      <p>ডিফল্টভাবে Express কেস-ইনসেনসিটিভ — <code>/Users</code> ও <code>/users</code> একই রুট হিসেবে গণ্য হয়। এটি চালু করলে এই দুটি সম্পূর্ণ আলাদা রুট হিসেবে বিবেচিত হয়।</p>
      <h4>strict routing</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.set('strict routing', true);

app.get('/users', handler);
// ডিফল্ট (false): /users এবং /users/ উভয়ই একই হ্যান্ডলারে যায়
// true হলে: /users/ আলাদা রুট হিসেবে গণ্য — যদি আলাদাভাবে ডিফাইন না করা থাকে, 404 হবে</code></pre>
      </div>
      <h4>এই সেটিং ডিফল্টে বন্ধ কেন — ব্যবহারিক কারণ</h4>
      <p>ওয়েবের বাস্তবতা হলো ব্যবহারকারী ও ক্লায়েন্ট প্রায়ই URL-এ সামান্য অসামঞ্জস্য রেখে রিকোয়েস্ট পাঠায় (trailing slash যোগ/বাদ, কেস ভিন্নতা) — এগুলো ব্যবহারকারীর ভুল নয়, শুধু স্বাভাবিক বৈচিত্র্য। Express ডিফল্টভাবে <strong>নমনীয় (lenient)</strong> থাকে, যাতে সাধারণ ব্যবহারকারী অভিজ্ঞতা ভেঙে না যায় শুধুমাত্র URL-এর ছোট পার্থক্যের কারণে।</p>
      <h4>কখন কঠোর মোড ব্যবহার করবেন — সিনিয়র বিবেচনা</h4>
      <ul>
        <li><strong>SEO সংবেদনশীল সাইটে:</strong> <code>/page</code> ও <code>/page/</code> দুটি আলাদা URL হিসেবে সার্চ ইঞ্জিনে ইনডেক্স হলে duplicate content সমস্যা তৈরি হতে পারে — কিন্তু এটি সাধারণত canonical URL ও redirect দিয়ে সমাধান করা হয়, strict routing দিয়ে নয়।</li>
        <li><strong>API versioning-এ কঠোরতা প্রয়োজন হলে:</strong> কিছু টিম চায় <code>/api/v1/Users</code> ও <code>/api/v1/users</code> স্পষ্টভাবে ভিন্ন রুট হিসেবে গণ্য হোক, যাতে ভুল করে ভুল কেসে রিকোয়েস্ট গেলে সেটি ধরা পড়ে (silent success না হয়ে 404 দেয়)।</li>
        <li><strong>সাধারণত বেশিরভাগ প্রোডাকশন API ডিফল্ট (lenient) সেটিং-ই রাখে</strong> — কঠোরতা যোগ করলে অতিরিক্ত edge case তৈরি হয় (প্রতিটি রুট trailing slash সহ ও ছাড়া দুইভাবে ডিফাইন করতে হতে পারে) যার সুবিধা প্রায়ই ঝামেলার তুলনায় কম।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Nginx বা reverse proxy স্তরে trailing slash normalize করা কি Express-এর strict routing-এর চেয়ে ভালো সমাধান?</li>
        <li>এই সেটিং কি রানটাইমে (অ্যাপ চালু হওয়ার পরে) বদলানো যায়?</li>
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
      <p>Express ডিফল্টভাবে প্রতিটি রেসপন্সে একটি <code>X-Powered-By: Express</code> হেডার যোগ করে — <code>app.disable('x-powered-by')</code> এই হেডার বন্ধ করে দেয়। এটি ছোট একটি পরিবর্তন মনে হলেও, নিরাপত্তার দৃষ্টিকোণ থেকে গুরুত্বপূর্ণ।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const app = express();
app.disable('x-powered-by');
// অথবা helmet middleware ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যায়
const helmet = require('helmet');
app.use(helmet());   // x-powered-by সহ আরও অনেক নিরাপত্তা হেডার একসাথে সেট করে</code></pre>
      </div>
      <h4>কেন এটি নিরাপত্তা ঝুঁকি — Fingerprinting আক্রমণ</h4>
      <p><code>X-Powered-By: Express</code> হেডার আক্রমণকারীকে জানিয়ে দেয় সার্ভার ঠিক কোন ফ্রেমওয়ার্ক ব্যবহার করছে। এই তথ্য দিয়ে আক্রমণকারী:</p>
      <ul>
        <li><strong>নির্দিষ্ট Express ভার্সনের পরিচিত vulnerability খুঁজতে পারে</strong> — যদি সার্ভার পুরনো Express ভার্সনে চলে যাতে কোনো known CVE আছে, আক্রমণকারীর কাজ সহজ হয়ে যায় কারণ তারা জানে ঠিক কী আক্রমণ চেষ্টা করতে হবে।</li>
        <li><strong>Automated স্ক্যানার/বট বিশেষভাবে Express-নির্দিষ্ট আক্রমণ target করতে পারে</strong> — বড় মাপের attack surface reconnaissance-এ HTTP হেডার একটি প্রথম ধাপ।</li>
      </ul>
      <p>এটি "security through obscurity" — অর্থাৎ, শুধু তথ্য লুকিয়ে সুরক্ষা বাড়ানো, প্রকৃত দুর্বলতা সমাধান নয়। কিন্তু এটি <strong>attack surface reconnaissance কঠিন করে তোলে</strong> — একটি সহজ, শূন্য-খরচ পদক্ষেপ যা defense-in-depth-এর অংশ হিসেবে মূল্যবান।</p>
      <h4>শুধু এই একটি হেডার যথেষ্ট নয় — Helmet-এর ব্যাপকতা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// helmet() একসাথে ১৫+ নিরাপত্তা হেডার সেট করে:
app.use(helmet());
// Strict-Transport-Security  → শুধু HTTPS বাধ্যতামূলক করে (HSTS)
// X-Content-Type-Options: nosniff → ব্রাউজারকে MIME sniffing বন্ধ করতে বলে
// X-Frame-Options: DENY → clickjacking প্রতিরোধ (iframe-এ embed হতে বাধা)
// Content-Security-Policy → XSS আক্রমণ সীমিত করে
// X-Powered-By হেডার মুছে ফেলে</code></pre>
      </div>
      <p><strong>প্রোডাকশন-প্রস্তুত Express অ্যাপে <code>app.disable('x-powered-by')</code> আলাদাভাবে করার চেয়ে সরাসরি <code>helmet()</code> মিডলওয়্যার ব্যবহার করা বেশি প্র্যাক্টিক্যাল</strong> — এটি এই একটি হেডার সহ আরও অনেক গুরুত্বপূর্ণ নিরাপত্তা হেডার একসাথে সেট করে দেয়, প্রতিটি আলাদাভাবে মনে রেখে কনফিগার করার দরকার নেই।</p>
      <h4>এটি কেন যথেষ্ট নয় — বাস্তবতা</h4>
      <p>একজন দৃঢ়সংকল্প আক্রমণকারী হেডার ছাড়াই framework শনাক্ত করতে পারে — response-এর error page ফরম্যাট, কুকি নাম প্যাটার্ন (<code>connect.sid</code>), বা timing বিশ্লেষণ দিয়ে। তাই এই সেটিং একটি <strong>ভালো অভ্যাস</strong>, কিন্তু প্রকৃত নিরাপত্তার মূল ভিত্তি নয় — ভিত্তি হলো: dependency আপ-টু-ডেট রাখা, input validation, authentication/authorization সঠিকভাবে বাস্তবায়ন, rate limiting।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Helmet-এর CSP (Content-Security-Policy) কীভাবে কনফিগার করবেন একটি রিয়েল অ্যাপে?</li>
        <li>Security through obscurity ও প্রকৃত নিরাপত্তার মধ্যে পার্থক্য একটি বাস্তব উদাহরণ দিয়ে ব্যাখ্যা করুন।</li>
      </ul>
    `
  },
  {
    id: "express-47",
    category: "Express.js",
    difficulty: "Advanced",
    tags: ["Middleware", "Conditional Middleware", "express-unless"],
    question: "নির্দিষ্ট রুটে মিডলওয়্যার স্কিপ করতে express-unless কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>অথেন্টিকেশন মিডলওয়্যার সাধারণত সব রাউটে লাগে, কিন্তু <code>/login</code> বা <code>/register</code> রাউটে এটি লাগে না। এটি স্কিপ করার জন্য <code>express-unless</code> প্যাকেজ ব্যবহৃত হয়।</p>
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
    question: "http-terminator দিয়ে Express Active Keep-Alive HTTP Connections দ্রুত বন্ধ কীভাবে করবেন?",
    answer: `
      <p>Graceful Shutdown এর সময় ডিফল্ট <code>server.close()</code> কন্টিনিউয়াস Keep-alive কানেকশন সকেট বন্ধ করতে দীর্ঘ সময় নেয়, কখনো কখনো হ্যাং করে। <code>http-terminator</code> বা <code>stoppable</code> প্যাকেজ সব আইডল সকেট দ্রুত কিল করে শাটডাউন প্রসেস ফাস্ট করে।</p>
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
    question: "express-openapi-validator দিয়ে OpenAPI Specs (.yaml) থেকে অটোমেটিক রুট ভ্যালিডেশন কীভাবে করবেন?",
    answer: `
      <p>Swagger YAML স্পেক্স ফাইল লোড করে দিলে এটি ইনকামিং রিকোয়েস্টের Body, Query, Params অটোমেটিক ওপেনএপিআই স্পেক্স অনুযায়ী টেস্ট ও ভ্যালিডেট করে। হাতে কোড করে ভ্যালিডেশন করতে হয় না।</p>
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
    question: "res.format() দিয়ে Express-এ Content Negotiation (JSON, HTML, Text) কীভাবে করবেন?",
    answer: `
      <p>ক্লায়েন্ট যখন <code>Accept</code> হেডার পাঠায়, তখন সেই হেডার অনুযায়ী একই রাউট থেকে ভিন্ন ভিন্ন ফরম্যাটে রেসপন্স পাঠানোর টেকনিককে Content Negotiation বলে। <code>res.format()</code> দিয়ে এটি করা হয়।</p>
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
  },
  {
    id: "express-51",
    category: "Express.js",
    difficulty: "Intermediate",
    tags: ["Headers", "ERR_HTTP_HEADERS_SENT", "Response", "Error Handling"],
    question: "Express.js-এ 'Cannot set headers after they are sent to the client' (ERR_HTTP_HEADERS_SENT) এরর কেন হয় এবং কীভাবে এটি সমাধান করবেন?",
    answer: `
      <p><strong>ERR_HTTP_HEADERS_SENT</strong> হলো Express.js / Node.js-এর একটি খুবই সাধারণ কিন্তু মারাত্মক এরর। ক্লায়েন্টের কাছে HTTP Response Header ইতোমধ্যে পাঠিয়েই দেওয়া হয়েছে, এরপর পুনরায় যদি কোনো রেসপন্স (যেমন: <code>res.send()</code>, <code>res.json()</code>, <code>res.redirect()</code>, <code>res.render()</code>) পাঠানোর চেষ্টা করা হয়, অথবা রেসপন্স পাঠানোর পর <code>next()</code> ডাকা হয়, তখন এই এরর থ্রো হয়।</p>
      
      <h4>কেন এই এররটি ঘটে (Root Causes):</h4>
      <ul>
        <li><strong>একাধিকবার Response পাঠানো:</strong> একই Route Handler-এর ভেতর একাধিক জায়গায় <code>res.json()</code> বা <code>res.send()</code> কল করা।</li>
        <li><strong><code>return</code> ব্যবহার না করা:</strong> <code>if-else</code> ব্লকে রেসপন্স পাঠানোর সময় <code>return</code> না দেওয়া। ফলে রেসপন্স পাঠানোর পরও কোডের পরবর্তী লাইনগুলো এক্সিকিউট হতে থাকে এবং দ্বিতীয়বার রেসপন্স পাঠায়।</li>
        <li><strong>Response পাঠানোর পর <code>next()</code> কল করা:</strong> ক্লায়েন্টকে রেসপন্স পাঠানোর পর ভুলবশত <code>next()</code> ডেকে পরবর্তী মিডলওয়্যারে রিকোয়েস্ট পাস করা।</li>
        <li><strong>Async Callback / Loop-এ ভুল:</strong> কোনো লুপ (Loop) বা Multiple Callbacks-এর ভেতর থেকে বারবার <code>res.json()</code> কল করা।</li>
      </ul>

      <h4>ভুল পদ্ধতি (Bad Practice) — যেখানে এরর ঘটে:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.get('/user/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404).json({ message: 'User not found' }); 
    // ❌ ভুল! এখানে return দেওয়া হয়নি।
    // কোড নিচে চলতে থাকবে এবং ২য় বার res.json(user) রান করবে!
  }
  
  res.json(user); // ❌ Error: Cannot set headers after they are sent to the client
});</code></pre>
      </div>

      <h4>সঠিক পদ্ধতি (Best Practice) — এরর প্রতিরোধের উপায়:</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      // ✅ গার্ড ক্লজে return ব্যবহার করা হয়েছে, তাই ফাংশন এক্সিকিউশন এখানেই শেষ
      return res.status(404).json({ message: 'User not found' }); 
    }
    
    return res.json(user); // ✅ সফল রেসপন্স
  } catch (error) {
    return next(error); // ✅ গ্লোবাল এরর হ্যান্ডলারে পাঠানো
  }
});</code></pre>
      </div>

      <h4>প্রতিরোধের প্রধান ৪টি নিয়ম:</h4>
      <ol>
        <li><strong>সবসময় <code>return</code> ব্যবহার করুন:</strong> Conditional check (যেমন: <code>if</code>/<code>else</code>) দিয়ে রেসপন্স পাঠানোর সময় সর্বদা <code>return res.status(...).json(...)</code> লিখুন।</li>
        <li><strong>রেসপন্সের পর <code>next()</code> নয়:</strong> ক্লায়েন্টকে রেসপন্স পাঠিয়ে দিলে সেই রুটে আর <code>next()</code> ডাকবেন না।</li>
        <li><strong><code>res.headersSent</code> চেক করুন:</strong> কাস্টম বা জটিল মিডলওয়্যারে যদি নিশ্চিত না হন যে রেসপন্স ইতোমধ্যে পাঠানো হয়েছে কিনা, তবে <code>res.headersSent</code> চেক করতে পারেন:
          <pre><code>if (res.headersSent) {
  return next(err); // রেসপন্স আগে চলে গিয়ে থাকলে শুধু এরর হ্যান্ডলারে পাঠান
}</code></pre>
        </li>
        <li><strong>Array/Loop-এ রেসপন্স না পাঠানো:</strong> <code>forEach</code> বা <code>map</code>-এর ভেতর রেসপন্স না পাঠিয়ে আগে সম্পূর্ণ ডেটা প্রসেস করে তারপর একবার রেসপন্স পাঠান।</li>
      </ol>
    `
  }
];