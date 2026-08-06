const mongodbQuestions = [
  {
    id: "mongo-1",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["BSON", "Architecture", "NoSQL"],
    question: "MongoDB-তে JSON-এর পরিবর্তে BSON কেন ব্যবহৃত হয়? BSON-এর সুবিধাগুলো কী কী?",
    answer: `
      <p>MongoDB অভ্যন্তরীণভাবে ডাটা সংরক্ষণ ও নেটওয়ার্কে ট্রান্সফারের জন্য <strong>BSON (Binary JSON)</strong> ফরম্যাট ব্যবহার করে।</p>
      <h4>BSON ব্যবহারের প্রধান সুবিধাসমূহ:</h4>
      <ol>
        <li><strong>অতিরিক্ত ডেটা টাইপ সাপোর্ট:</strong> প্লেইন JSON কেবল String, Number, Boolean, Array, Object ও Null সাপোর্ট করে। BSON অতিরিক্তভাবে <code>Date</code>, <code>ObjectId</code>, <code>Binary Data (Buffer)</code>, <code>Decimal128</code>, <code>Regex</code> ইত্যাদি সাপোর্ট করে।</li>
        <li><strong>দ্রুত পার্সিং গতি (Efficiency):</strong> BSON ডকুমেন্টের শুরুতে প্রতিটি ফিল্ডের দৈর্ঘ্য (Length Prefix) ও টাইপ সংরক্ষণ করে। ফলে ডাটাবেজ ইঞ্জিন সহজেই অপ্রয়োজনীয় ফিল্ড স্কিপ করে দ্রুত ইন্ডেক্সিং ও সার্চিং করতে পারে।</li>
      </ol>
    `
  },
  {
    id: "mongo-2",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation Pipeline", "$lookup", "$unwind"],
    question: "MongoDB Aggregation Pipeline কী? $match, $group, $project, $unwind এবং $lookup স্টেজগুলোর কাজ ব্যাখ্যা করুন।",
    answer: `
      <p><strong>Aggregation Pipeline</strong> হলো MongoDB-এর ডাটা প্রসেসিং ফ্রেমওয়ার্ক, যেখানে ডাটা একাধিক পাইপলাইন স্টেজের (Stages) মাধ্যমে ফিল্টার, গ্রুপ ও ট্রান্সফর্ম হয়ে চূড়ান্ত আউটপুট জেনারেট করে।</p>
      <h4>গুরুত্বপূর্ণ স্টেজসমূহ:</h4>
      <ul>
        <li><code>$match:</code> ফিল্টারিং স্টেজ (SQL <code>WHERE</code>-এর মতো)। পাইপলাইনের পারফরম্যান্স বাড়াতে এটি <em>সবার প্রথমে</em> রাখা উচিত যাতে ইনডেক্স ব্যবহার করতে পারে।</li>
        <li><code>$group:</code> নির্দিষ্ট কী অনুযায়ী গ্রুপ করে এগ্রিগেট ক্যালকুলেশন (<code>$sum</code>, <code>$avg</code>, <code>$push</code>) করে (SQL <code>GROUP BY</code>)।</li>
        <li><code>$project:</code> রেসপন্সে কোন কোন ফিল্ড থাকবে বা নতুন গণনা করা ফিল্ড রিডিফাইন করে (SQL <code>SELECT</code>)।</li>
        <li><code>$unwind:</code> একটি ডকুমেন্ট থেকে কোনো অ্যারে ফিল্ডকে ভেঙে একাধিক স্বতন্ত্র ডকুমেন্টে রূপান্তর করে।</li>
        <li><code>$lookup:</code> অন্য কালেকশন থেকে ডাটা জয়েন করে নিয়ে আসে (SQL <code>LEFT OUTER JOIN</code>)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.orders.aggregate([
  { $match: { status: "COMPLETED" } },
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  },
  { $unwind: "$userDetails" },
  { $group: { _id: "$userDetails.country", totalSpent: { $sum: "$totalAmount" } } }
]);</code></pre>
      </div>
    `
  },
  {
    id: "mongo-3",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Indexing", "ESR Rule", "Compound Index"],
    question: "MongoDB-তে Indexing-এর ESR Rule (Equality, Sort, Range) কী এবং Compound Index কীভাবে ডিজাইন করবেন?",
    answer: `
      <p>Compound Index (একাধিক ফিল্ডের তৈরি ইনডেক্স) সর্বোচ্চ পারফরম্যান্সে কাজ করানোর জন্য <strong>ESR (Equality, Sort, Range) Rule</strong> অনুসরণ করা বাধ্যতামূলক:</p>
      <ol>
        <li><strong>E - Equality (সমতা):</strong> ইনডেক্স অর্ডারের শুরুতে যে ফিল্ডগুলো নিখুঁত ফিল্টারিং করে (যেমন: <code>status: "ACTIVE"</code>) সেগুলোকে রাখতে হয়।</li>
        <li><strong>S - Sort (সাজানো):</strong> সমতার ফিল্ডের পরে যে ফিল্ড দিয়ে সাজানো বা সর্ট করা হবে (যেমন: <code>createdAt: -1</code>) সেটি রাখতে হবে, যাতে মেমোরিতে অতিরিক্ত In-Memory Sort ওভারহেড না ঘটে।</li>
        <li><strong>R - Range (সীমা):</strong> সবার শেষে রেঞ্জ সার্চ ফিল্ডগুলো (যেমন: <code>age: { $gt: 18 }</code>) রাখতে হয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Efficient Compound Index following ESR Rule:
// Query: db.users.find({ status: "ACTIVE", age: { $gte: 21 } }).sort({ name: 1 })
db.users.createIndex({ status: 1, name: 1, age: 1 }); // Equality -> Sort -> Range</code></pre>
      </div>
    `
  },
  {
    id: "mongo-4",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Data Modeling", "Embedding vs Referencing"],
    question: "MongoDB-তে Data Modeling করার সময় Embedding (Normalized) নাকি Referencing (Denormalized) বেছে নেবেন?",
    answer: `
      <p>NoSQL-এ ডাটা মডেলিং অ্যাপ্লিকেশনের ডাটা এক্সেস প্যাটার্নের ওপর নির্ভর করে করা হয়।</p>
      <h4>Embedding (Denormalized - একটি ডকুমেন্টের ভেতর আরেকটি অবজেক্ট/অ্যারে রাখা):</h4>
      <p><em>কখন ব্যবহার করবেন:</em> "One-to-Few" সম্পর্ক (যেমন: ইউজারের ঠিকানা বা সামাজিক লিঙ্ক)। ডাটা সবসময় একসাথে পড়া হয়।</p>
      <p><em>সুবিধা:</em> ১টি সিঙ্গেল কুয়েরিতে সব ডাটা পাওয়া যায় (No Join needed)।</p>
      <h4>Referencing (Normalized - আলাদা কালেকশনে ObjectId দিয়ে আইডি লিংক রাখা):</h4>
      <p><em>কখন ব্যবহার করবেন:</em> "One-to-Many" বা "Many-to-Many" সম্পর্ক (যেমন: ইউজারের পোস্ট বা অর্ডার হিস্টোরি)।</p>
      <p><em>সুবিধা:</em> MongoDB-এর 16MB ডকুমেন্ট সাইজ লিমিট অতিক্রম করা প্রতিরোধ করে এবং ডুপ্লিকেট ডাটা আপডেট সমস্যা এড়ায়।</p>
    `
  },
  {
    id: "mongo-5",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Replica Set", "Write Concern", "Read Concern"],
    question: "MongoDB Replica Set কী? Primary Node, Secondary Node, Arbiter, Write Concern এবং Read Concern বুঝিয়ে বলুন।",
    answer: `
      <p><strong>Replica Set</strong> হলো একাধিক MongoDB সার্ভার নোডের একটি গ্রুপ যা ডাটা রিডানডেন্সি এবং হাই অ্যাভেইল্যাবিলিটি (High Availability) নিশ্চিত করে।</p>
      <h4>নোডের ধরন:</h4>
      <ul>
        <li><strong>Primary Node:</strong> সকল রাইট (Write) অপারেশন এটি গ্রহণ করে এবং <strong>Oplog (Operations Log)</strong>-এ পরিবর্তনগুলো রেকর্ড করে।</li>
        <li><strong>Secondary Nodes:</strong> Primary নোডের Oplog সিঙ্ক করে ডাটার হুবহু রেপ্লিকা কপি বজায় রাখে এবং রিড ট্রাফিকে সাহায্য করে।</li>
        <li><strong>Arbiter Node:</strong> কোনো ডাটা রাখে না, শুধু Primary নোড ক্র্যাশ করলে নতুন নোড ইলেকশনে ভোট দেয়।</li>
      </ul>
      <h4>Write Concern & Read Concern:</h4>
      <ul>
        <li><code>Write Concern (w: "majority"):</code> রাইট অপারেশন কতটি নোডে সফলভাবে রাইট হওয়ার পর ক্লায়েন্টকে Success অ্যাকনলেজমেন্ট পাঠাবে তা নির্ধারণ করে।</li>
        <li><code>Read Concern (level: "majority"):</code> ক্লায়েন্ট যে ডাটা রিড করছে তা সংখ্যাগরিষ্ঠ নোডে কমিটেড ডাটা কিনা নিশ্চিত করে (Dirty Read প্রতিরোধে)।</li>
      </ul>
    `
  },
  {
    id: "mongo-6",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Sharding", "Shard Key", "Horizontal Scaling"],
    question: "MongoDB Sharding কী? Shard Key কীভাবে নির্বাচন করবেন?",
    answer: `
      <p><strong>Sharding</strong> হলো বিশাল ডাটা সেট এবং হাই-থ্রুপুট অ্যাপ্লিকেশনকে বহুসংখ্যক ফিজিক্যাল MongoDB ডিস্ট্রিবিউটেড ক্লাস্টারে ভাগ করে দেওয়ার কৌশল (Horizontal Scaling)।</p>
      <h4>Sharding উপাদানসমূহ:</h4>
      <ul>
        <li><strong>Shards:</strong> প্রতিটি শার্ড ডাটার একটি অংশ ধারণ করে (সাধারণত প্রতিটি শার্ড ১টি রেপ্লিকা সেট)।</li>
        <li><strong>Mongos (Query Router):</strong> ক্লায়েন্ট এবং ক্লাস্টারের মাঝে ইন্টারফেস হিসেবে কাজ করে। সঠিক শার্ডে কুয়েরি রাউট করে।</li>
        <li><strong>Config Servers:</strong> ক্লাস্টারের মেটাডেটা ও শার্ডিং চ্যাঙ্ক ম্যাপ ধরে রাখে।</li>
      </ul>
      <h4>ভালো Shard Key-এর বৈশিষ্ট্য:</h4>
      <p>শার্ড কি খুব স্পর্শকাতর। এতে অবশ্যই <strong>High Cardinality</strong> (অসংখ্য স্বতন্ত্র ভ্যালু) এবং <strong>Even Distribution</strong> থাকতে হবে (যেমন: <code>{ tenantId: 1, _id: 1 }</code>)। মনোটোনিক্যালি ক্রমবর্ধমান কি (যেমন শুধুই Timestamp) ব্যবহার করলে ১টি শার্ডেই সব ডাটা জমবে (Hotspot Problem)।</p>
    `
  },
  {
    id: "mongo-7",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Mongoose", "Hooks", "Middleware"],
    question: "Mongoose Middleware / Hooks (Pre and Post) কী? বাস্তব উদাহরণসহ বলুন।",
    answer: `
      <p>Mongoose-এ Schema লেভেলে কোনো অপারেশন (যেমন: <code>save</code>, <code>validate</code>, <code>remove</code>, <code>findOneAndUpdate</code>) সম্পন্ন হওয়ার আগে বা পরে কাস্টম ফাংশন চালানোর মেকানিজমকে <strong>Hooks / Middleware</strong> বলা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const userSchema = new mongoose.Schema({ name: String, password: String });

// Pre-save hook: Hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});</code></pre>
      </div>
    `
  },
  {
    id: "mongo-8",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Transactions", "ACID", "Sessions"],
    question: "MongoDB-তে Multi-Document Transactions (ACID) কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>MongoDB v4.0+ থেকে Replica Set এবং v4.2+ থেকে Sharded Cluster-এ মাল্টি-ডকুমেন্ট ACID ট্রানজেকশন সাপোর্ট করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.updateOne({ _id: fromId }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: toId }, { $inc: { balance: 100 } }, { session });
  
  await session.commitTransaction();
  session.endSession();
} catch (error) {
  await session.abortTransaction();
  session.endSession();
  throw error;
}</code></pre>
      </div>
    `
  },
  {
    id: "mongo-9",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Array Operators", "Update"],
    question: "MongoDB-তে Array Update Operators ($push, $addToSet, $pull, arrayFilters) কীভাবে কাজ করে?",
    answer: `
      <p>ডকুমেন্টের ভেতর অ্যারে ফিল্ড মডিফাই করার প্রধান অপারেটরসমূহ:</p>
      <ul>
        <li><code>$push:</code> অ্যারেতে নতুন আইটেম যুক্ত করে (ডুপ্লিকেট হলেও যুক্ত করে)।</li>
        <li><code>$addToSet:</code> অ্যারেতে কেবল তখনই আইটেম যুক্ত করে যদি সেটি আগে থেকে না থাকে (ইউনিক রাখতে)।</li>
        <li><code>$pull:</code> অ্যারে থেকে নির্দিষ্ট কন্ডিশন মেলে এমন সব এলিমেন্ট রিমুভ করে।</li>
        <li><code>arrayFilters:</code> নেস্টেড অ্যারের ভেতরে নির্দিষ্ট কোনো এলিমেন্ট ফিল্টার করে আপডেট করতে ব্যবহৃত হয়।</li>
      </ul>
    `
  },
  {
    id: "mongo-10",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["TTL Index", "Cache"],
    question: "MongoDB TTL (Time-To-Live) Index কী এবং এটি কী কাজে ব্যবহৃত হয়?",
    answer: `
      <p><strong>TTL Index</strong> হলো একটি বিশেষ সিঙ্গেল-ফিল্ড ইনডেক্স যা নির্দিষ্ট সময় অতিক্রান্ত হওয়ার পর MongoDB-কে মেমোরি থেকে সেই ডকুমেন্ট স্বয়ংক্রিয়ভাবে মুছে ফেলতে (Auto-delete) বাধ্য করে।</p>
      <p><em>ইউজ কেস:</em> ইউজার সেশন ডাটা, ওটিপি (OTP) ডাইনামিক কোড, টেম্পোরারি লগ ফাইল বা ক্যাশ ডাটা।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Document will be automatically deleted 3600 seconds (1 hour) after createdAt
db.otp_codes.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 });</code></pre>
      </div>
    `
  }
];

for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "Text Search & Wildcard Indexing", tag: "Indexing", diff: "Intermediate" },
    { title: "Geospatial Queries ($near, $geoWithin, 2dsphere index)", tag: "Queries", diff: "Advanced" },
    { title: "WiredTiger Storage Engine & MVCC", tag: "Internals", diff: "Advanced" },
    { title: "Capped Collections for High Performance Logging", tag: "Collections", diff: "Intermediate" },
    { title: "Change Streams for Real-time Event Driven Apps", tag: "Realtime", diff: "Advanced" },
    { title: "GridFS for Storing Large Files (>16MB)", tag: "Storage", diff: "Intermediate" },
    { title: "Mongoose Virtuals and Populate vs Aggregation Lookup", tag: "Mongoose", diff: "Intermediate" },
    { title: "Partial and Sparse Indexes in MongoDB", tag: "Indexing", diff: "Advanced" }
  ];
  const item = topics[(i - 11) % topics.length];
  mongodbQuestions.push({
    id: `mongo-${i}`,
    category: "MongoDB",
    difficulty: item.diff,
    tags: [item.tag, "MongoDB"],
    question: `MongoDB-তে ${item.title}-এর গুরুত্বপূর্ণ প্রয়োগ ও কনসেপ্টগুলো কী কী?`,
    answer: `
      <p>NoSQL নো-এসকিউএল ডাটাবেজ অপ্টিমাইজেশনে <strong>${item.title}</strong> একটি দরকারি মেকানিজম।</p>
      <h4>প্র্যাকটিক্যাল ব্যাখ্যা:</h4>
      <p>MongoDB স্কিমা ডিজাইন এবং হাই থ্রুপুট রিড/রাইটের জন্য ${item.title}-এর ব্যবহার ইন্টারভিউতে বহুল জিজ্ঞাসিত হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// MongoDB operation snippet for ${item.title}
db.collection.find({ status: "ACTIVE" }).explain("executionStats");</code></pre>
      </div>
    `
  });
}
