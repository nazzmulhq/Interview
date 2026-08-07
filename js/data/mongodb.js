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
,

  {
    id: "mongo-11",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing","Text Search","Queries"],
    question: "MongoDB Text Search এবং Wildcard Indexing ($**) কীভাবে কাজ করে?",
    answer: `
<p>Text Index স্ট্রিংয়ে ফুল-টেক্সট সার্চ ও র‍্যাঙ্কিং দেয়। Wildcard Index ডাইনামিক ফিল্ডগুলোকে স্বয়ংক্রিয় ইনডেক্সিং করে।</p>
    `
  },
  {
    id: "mongo-12",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Geospatial","Queries","Index"],
    question: "MongoDB 2dsphere index এবং Geospatial Queries ($near, $geoWithin) কীভাবে ব্যবহৃত হয়?",
    answer: `
<p>GPS Latitude/Longitude GeoJSON সংরক্ষণে 2dsphere ইনডেক্স ব্যবহৃত হয়। <code>$near</code> ও <code>$geoWithin</code> দিয়ে দূরত্ব অনুযায়ী ফিল্টারিং করা যায়।</p>
    `
  },
  {
    id: "mongo-13",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Internals","WiredTiger","Engine"],
    question: "MongoDB WiredTiger Storage Engine কীভাবে Concurrency পরিচালনা করে?",
    answer: `
<p>WiredTiger Document-level Locking এবং MVCC সাপোর্ট করার একই কালেকশনের বিভিন্ন ডকুমেন্টে সমান্তরাল Read/Write অপারেশন হাই স্পিডে সম্পন্ন করতে পারে।</p>
    `
  },
  {
    id: "mongo-14",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Collections","Capped","Performance"],
    question: "MongoDB Capped Collections কী?",
    answer: `
<p>নির্দিষ্ট ফিক্সড সাইজের সার্কুলার কালেকশন। মেমোরি পূর্ণ হলে স্বয়ংক্রিয়ভাবে প্রাচীনতম রেকর্ড ফেলে নতুন রেকর্ড জায়গা করে নেয়।</p>
    `
  },
  {
    id: "mongo-15",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Realtime","Change Streams","Events"],
    question: "MongoDB Change Streams কীভাবে কাজ করে?",
    answer: `
<p>Change Streams Oplog অনুসরন করে ডাটাবেজের insert, update, delete পরিবর্তনের রিয়েল-টাইম নোটিফিকেশন অ্যাপে পাঠায়।</p>
    `
  },
  {
    id: "mongo-16",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Storage","GridFS","Files"],
    question: "MongoDB-তে 16MB-এর বড় ফাইল সংরক্ষণে GridFS কীভাবে কাজ করে?",
    answer: `
<p>GridFS বড় ফাইলকে ২৫৫KB সাইজের ছোট ছোট Chunks-এ ভাগ করে <code>fs.files</code> এবং <code>fs.chunks</code> কালেকশনে স্টোর করে।</p>
    `
  },
  {
    id: "mongo-17",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Mongoose","Populate","Aggregation"],
    question: "Mongoose Populate vs MongoDB Aggregation $lookup-এর পার্থক্য কী?",
    answer: `
<p>Populate অ্যাপ লেভেলে একাধিক আলাদা কোয়েরি চালায়। <code>$lookup</code> ডাটাবেজের ভেতরে ডাইনামিক LEFT JOIN সম্পন্ন করে।</p>
    `
  },
  {
    id: "mongo-18",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Indexing","Sparse","Partial"],
    question: "MongoDB Sparse Index এবং Partial Index-এর পার্থক্য কী?",
    answer: `
<p>Sparse Index ফিল্ড উপস্থিত থাকা রেকর্ডগুলো ইনডেক্স করে। Partial Index <code>partialFilterExpression</code> শর্ত মেনে ফিল্টার রেকর্ড ইনডেক্স করে।</p>
    `
  },
  {
    id: "mongo-19",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation", "Pipeline", "Optimizations"],
    question: "MongoDB Aggregation Pipeline: $match, $group, $project, $lookup, $unwind, $facet এবং Pipeline Optimization কী?",
    answer: `
<p>একাধিক স্টেজে ডেটা ফিল্টার ও ট্রান্সফর্ম করা। অপটিমাইজেশন নিয়ম: <code>$match</code> এবং <code>$sort</code> একদম পাইপলাইনের শুরুতে রাখা উচিত যাতে ইনডেক্স ব্যবহার করা যায়।</p>
    `
  },
  {
    id: "mongo-20",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Indexing", "ESR Rule", "Compound Index"],
    question: "MongoDB ESR Rule (Equality, Sort, Range) compound indexing বেস্ট প্র্যাকটিস কী?",
    answer: `
<p>কম্পাউন্ড ইনডেক্সে ফিল্ড সাজানোর নিয়ম:</p><ol><li><strong>Equality:</strong> এক্সেক্ট ম্যাচ ফিল্ড সবার আগে।</li><li><strong>Sort:</strong> সর্টিং ফিল্ড মাঝে।</li><li><strong>Range:</strong> রেঞ্জ ফিল্ড (<code>$gt</code>, <code>$lt</code>) সবার শেষে।</li></ol>
    `
  },
  {
    id: "mongo-21",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Replication", "Replica Sets", "Oplog"],
    question: "MongoDB Replica Set Architecture: Primary Node, Secondary Nodes, Arbiter, Oplog, এবং Heartbeat Mechanism কী?",
    answer: `
<p>Primary Node-এ সকল রাইট অপারেশন হয় যা <code>local.oplog.rs</code> ফাইলে রেকর্ড হয়। Secondary Nodes এই Oplog রিড করে সিঙ্ক রাখে। Primary ডাউন হলে ১০ সেকেন্ডে ইলেকশন হয়ে নতুন প্রাইমারি নির্বাচিত হয়।</p>
    `
  },
  {
    id: "mongo-22",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Sharding", "Shard Key", "Jumbo Shards"],
    question: "MongoDB Sharding Architecture: Mongos Router, Config Server, Shards, এবং Shard Key (Hashed vs Ranged) নির্বাচনের নিয়ম কী?",
    answer: `
<p><strong>Mongos:</strong> রিকুয়েস্ট রাউটার। <strong>Config Server:</strong> মেটাডাটা রাখে। <strong>Shard Key:</strong> হাই কার্ডিনালিটি ও সুষম বন্টনমুখী কলাম বেছে নেওয়া উচিত যাতে Jumbo Shards বা Hotspots না তৈরি হয়।</p>
    `
  },
  {
    id: "mongo-23",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Transactions", "ACID", "WiredTiger"],
    question: "MongoDB Multi-Document ACID Transactions কীভাবে কাজ করে এবং কখন এটি এড়িয়ে যাওয়া উচিত?",
    answer: `
<p>WiredTiger স্টোরেজ ইঞ্জিন ব্যবহার করে একাধিক কালেকশনে <code>session.startTransaction()</code> দিয়ে ACID রাইট গ্যারান্টি। এটি মেমোরি কস্টলি হওয়ায় ডেনরম্যালাইজড নেস্টেড ডকুমেন্টে ডিজাইন করাই উত্তম।</p>
    `
  },
  {
    id: "mongo-24",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Schema Design", "Embedding vs Referencing", "Design"],
    question: "MongoDB Schema Design: Embedding (One-to-Few) vs Referencing (One-to-Many / One-to-Squillions) কখন কোনটি নির্বাচন করবেন?",
    answer: `
<p><strong>Embedding:</strong> ১টি ডকুমেন্টের ১৮MB সাইজ সীমানার মধ্যে যদি চাইল্ড ডেটা ছোট হয় (e.g. ইউজারের ৩টি এড্রেস)।</p><p><strong>Referencing:</strong> চাইল্ড ডেটা বিশাল বা আনলিমিটেড হলে (e.g. পোস্টের ১০ হাজার কমেন্ট)।</p>
    `
  },
  {
    id: "mongo-25",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Write Concern", "Read Concern", "Consistency"],
    question: "Write Concern (w: 1, w: majority, j: true) vs Read Concern (local, majority, linearizable) এর নিরাপত্তা ভূমিকা কী?",
    answer: `
<p><strong>w: majority:</strong> মেজোরিটি সেকেন্ডারি নোড ডিস্কে রাইট সিঙ্ক করলে কনফার্মেশন দেয় (জিরো রোলব্যাক)।</p><p><strong>readConcern: majority:</strong> কেবল মেজোরিটি নোডে নিশ্চিত হওয়া ডেটা রিড করে।</p>
    `
  },
  {
    id: "mongo-26",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Performance", "explain()", "executionStats"],
    question: "MongoDB explain('executionStats') দিয়ে COLLSCAN vs IXSCAN সনাক্তকরণ কীভাবে করবেন?",
    answer: `
<p><code>db.users.find({...}).explain("executionStats")</code> চালালে <code>stage: "COLLSCAN"</code> দেখলে বোঝা যায় ইনডেক্স নেই (Full Collection Scan)। <code>IXSCAN</code> দেখলে বোঝায় ইনডেক্স ব্যবহৃত হচ্ছে।</p>
    `
  },
  {
    id: "mongo-27",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Storage", "WiredTiger", "Cache"],
    question: "WiredTiger Storage Engine: Cache Management, Snappy Compression, এবং Eviction Policy কী?",
    answer: `
<p>WiredTiger নেটিভভাবে RAM মেমোরির ৫০% ক্যাশ হিসেবে ব্যবহার করে এবং ডিস্কে Snappy কমপ্রেশন দিয়ে ডেটা রাইট করে মেমোরি বাঁচায়।</p>
    `
  },
  {
    id: "mongo-28",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing", "TTL Index", "Partial Index"],
    question: "MongoDB TTL Index (expireAfterSeconds) এবং Partial Index (partialFilterExpression) কীভাবে ব্যবহার করবেন?",
    answer: `
<p><strong>TTL Index:</strong> নির্দিষ্ট সময় (e.g. ৩০ দিন) পর স্বয়ংক্রিয়ভাবে ওল্ড লগ ডকুমেন্ট মুছে ফেলা।</p><p><strong>Partial Index:</strong> কেবল <code>{ status: "active" }</code> হলে ইনডেক্স বানানো।</p>
    `
  },
  {
    id: "mongo-29",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Search", "Atlas Search", "Lucene"],
    question: "MongoDB Atlas Search ($search) এবং Apache Lucene Integration কীভাবে কাজ করে?",
    answer: `
<p>MongoDB-এর নেটিভ ইঞ্জিনের বাইরে Apache Lucene ইন-মেমোরি ইনভার্সড ইনডেক্স ব্যবহার করে ফুল-টেক্সট সার্চ, অটোকম্প্লিট এবং ফাজি ম্যাচিং প্রদান করা।</p>
    `
  },
  {
    id: "mongo-30",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Change Streams", "Real-time", "Oplog"],
    question: "MongoDB Change Streams (watch()) দিয়ে রিয়েল-টাইম ডাটাবেজ ইভেন্ট ট্র্যাকিং কীভাবে করবেন?",
    answer: `
<p>Replica Set-এর Oplog ব্যবহার করে ডাটাবেজে নতুন ইনসার্ট, আপডেট বা ডিলিট হওয়ার সাথে সাথেই অ্যাপ্লিকেশন লাইভ নোটিফিকেশন সাবস্ক্রাইব করতে পারে।</p>
    `
  },
  {
    id: "mongo-31",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Security", "FLE", "Encryption"],
    question: "MongoDB Client-Side Field Level Encryption (CSFLE) দিয়ে সংবেদনশীল ডেটা এনক্রিপশন কীভাবে করবেন?",
    answer: `
<p>ডাটাবেজ ড্রাইভার ক্লায়েন্ট সাইডেই ডেটা (e.g. ক্রেডিট কার্ড বা SSN) এনক্রিপ্ট করে পাঠায়, ফলে ডাটাবেজ এডমিন বা হ্যাকারও আসল ডেটা দেখতে পারে না।</p>
    `
  },
  {
    id: "mongo-32",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Schema Validation", "JSON Schema", "validator"],
    question: "MongoDB Schema Validation ($jsonSchema) দিয়ে ডাইনামিক ডকুমেন্টে কড়া টাইপ ডিফাইন কীভাবে করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div><pre><code>db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        email: { bsonType: "string", pattern: "^.+@.+$" }
      }
    }
  }
})</code></pre></div>
    `
  },
  {
    id: "mongo-33",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Time Series", "Collections", "Bucketing"],
    question: "MongoDB Time Series Collections এবং Internal Bucketing Pattern কীভাবে IoT / Metrics ডাটা অপটিমাইজ করে?",
    answer: `
<p>টাইম সিরিজ কালেকশন সময়ভিত্তিক ইনকামিং ডাটা সংকুচিত কাস্টম বাকেটে স্টোর করায় ডিস্ক স্পেস ৯০% পর্যন্ত হ্রাস পায় এবং রিড স্পিড বহু গুণ বাড়ে।</p>
    `
  },
  {
    id: "mongo-34",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing", "Text Index", "Weights"],
    question: "MongoDB Text Index ($text) এবং Text Search Weights (weights parameter) কীভাবে টিউন করবেন?",
    answer: `
<p><code>title</code> ফিল্ডের ওয়েট ১০ এবং <code>description</code> ফিল্ডের ওয়েট ২ দিলে সার্চের সময় টাইটেলে শব্দ মিললে উচ্চ রেলিভেন্স স্কোর পেয়ে সামনে আসবে।</p>
    `
  },
  {
    id: "mongo-35",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Ops", "Balancing", "Chunk Migration"],
    question: "MongoDB Sharding Chunk Migration, Auto-Balancer, এবং Jumbo Chunks ফিক্সিং কৌশল কী?",
    answer: `
<p>ডাটা সাইজ ৬৪MB ছোঁয়ালে চ্যাঙ্ক স্প্লিট হয়। অটো-ব্যালেন্সার ব্যাকগ্রাউন্ডে চ্যাঙ্ক নোডগুলোর মাঝে ছড়ায়। Shard key ভুল হলে স্প্লিট না হয়ে Jumbo Chunk তৈরি হয়।</p>
    `
  },
  {
    id: "mongo-36",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Queries", "Array Operations", "elemMatch"],
    question: "MongoDB Array Query Operators: $elemMatch, $all, $slice, এবং position operator ($) কীভাবে কাজ করে?",
    answer: `
<p><code>$elemMatch:</code> অ্যারেলিস্টের একই নেস্টেড অবজেক্টের ভেতরে একাধিক শর্ত মেলাতে সাহায্য করে।</p><p><code>$slice:</code> অ্যারের কেবল নির্দিষ্ট টপ ৫টি আইটেম ফেচ করা।</p>
    `
  },
  {
    id: "mongo-37",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Replication", "Read Preference", "secondaryPreferred"],
    question: "MongoDB Read Preference (primary, primaryPreferred, secondary, secondaryPreferred, nearest) এর কাজের পার্থক্য কী?",
    answer: `
<p><strong>primary:</strong> কেবল প্রাইমারি নোড থেকে রিড করা (Strictly consistent)।</p><p><strong>secondaryPreferred:</strong> রিড লোড স্লেভ নোডে ট্রান্সফার করা (Eventual consistency)।</p>
    `
  },
  {
    id: "mongo-38",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Operators", "$set", "$inc"],
    question: "Atomic Update Operators: $set, $inc, $push, $pull, $addToSet, এবং upsert: true কীভাবে ব্যবহার করবেন?",
    answer: `
<p>ডকুমেন্ট পুরো না পাল্টে কেবল ইন-প্লেস অ্যাটমিক ফেচ ও আপডেট করা। <code>$addToSet</code> অ্যারেলিস্টে ডুপ্লিকেট ভ্যালু ঢুকতে দেয় না। <code>upsert: true</code> না থাকলে নতুন ইনসার্ট করে।</p>
    `
  },
  {
    id: "mongo-39",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation", "$lookup", "Uncorrelated Subqueries"],
    question: "MongoDB $lookup (Left Outer Join) uncorrelated and correlated subqueries কীভাবে টিউন করবেন?",
    answer: `
<p><code>$lookup</code> পাইপলাইনে নেস্টেড <code>let</code> এবং <code>pipeline</code> ব্যবহার করে অন্য কালেকশন আনার আগেই <code>$match</code> এবং <code>$project</code> চালিয়ে জয়েন মেমোরি কমানো।</p>
    `
  },
  {
    id: "mongo-40",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Geospatial", "2dsphere", "near"],
    question: "MongoDB Geospatial Index (2dsphere) এবং $near / $geoWithin Query কীভাবে কাজ করে?",
    answer: `
<p>GeoJSON পয়েন্ট স্টোর করে <code>2dsphere</code> ইনডেক্স ব্যবহার করে জিপিএস লোকেশনের সাপেক্ষে নির্দিষ্ট দূরত্বের (e.g. 5km) সব আইটেম রিড করা।</p>
    `
  },
  {
    id: "mongo-41",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Internal", "BSON", "Data Limits"],
    question: "BSON Binary Format vs JSON এবং 16MB Document Limit কেন রাখা হয়েছে?",
    answer: `
<p>BSON-এ টাইপ ও লেন্থ প্রি-প্যাকিং থাকে যা পার্সিং ফাস্ট করে। ১৬MB লিমিট মেমোরি এবং নেটওয়ার্ক ট্র্যাফিক স্পাইক ব্লক করে আর্কিটেকচার সেফ রাখে।</p>
    `
  },
  {
    id: "mongo-42",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing", "Wildcard Index", "$**"],
    question: "MongoDB Wildcard Index ($**) কখন ব্যবহার করা উচিত?",
    answer: `
<p>যখন ডকুমেন্টের ভেতরে অনাক্সিডেন্টাল অগণিত ডায়নামিক ফিল্ড থাকে (e.g. <code>customFields.$**</code>)। তবে অতিরিক্ত মেমোরির কারণে সতর্কতার সাথে ব্যবহার্য।</p>
    `
  },
  {
    id: "mongo-43",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation", "$facet", "Parallel Pipelines"],
    question: "MongoDB $facet Stage দিয়ে সমান্তরাল প্যারালাল মেট্রিকেল এগ্রিগেশন কীভাবে করবেন?",
    answer: `
<p>একই ইনপুট ডকুমেন্টের ওপর ১টি পাইপলাইনেই একসাথে প্রডাক্ট ক্যাটাগরি কাউন্ট, প্রাইস এভারেজ এবং পেজিনেটেড রেজাল্ট আলাদা আলাদা ব্র্যাকেটে বের করা।</p>
    `
  },
  {
    id: "mongo-44",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Capped Collections", "Logs", "Fixed Size"],
    question: "MongoDB Capped Collections (Circular Queue) কী এবং এর সুবিধা কী?",
    answer: `
<p>ফিক্সড সাইজের কালেকশন। সাইজ পূর্ণ হলে স্বয়ংক্রিয়ভাবে সবচেয়ে পুরোনো রেকর্ড মুছে নতুন ইনসার্ট জায়গা করে নেয় (লগিংয়ের জন্য আদর্শ)।</p>
    `
  },
  {
    id: "mongo-45",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Index", "Multikey Index", "Arrays"],
    question: "MongoDB Multikey Indexing এবং অ্যারে ফিল্ড ইনডেক্সিং সীমানা কী?",
    answer: `
<p>অ্যারে ফিল্ডে ইনডেক্স বসালে ES প্রতি এলিমেন্টের জন্য আলাদা ইনডেক্স কি বানায়। নিয়ম: ১টি কম্পাউন্ড ইনডেক্সে ১টির বেশি অ্যারে ফিল্ড রাখা নিষিদ্ধ।</p>
    `
  },
  {
    id: "mongo-46",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Connection", "Connection Pool", "maxPoolSize"],
    question: "MongoDB Connection String Options: maxPoolSize, minPoolSize, and maxIdleTimeMS কীভাবে কনফিগার করবেন?",
    answer: `
<p><code>mongodb://localhost:27017/db?maxPoolSize=50&minPoolSize=10</code> দিয়ে নোড ড্রাইভারে ডাটাবেজ সকেট পুল টিউন করা।</p>
    `
  },
  {
    id: "mongo-47",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Backup", "mongodump", "mongorestore"],
    question: "MongoDB Backup Strategies: mongodump / mongorestore vs Oplog Point-in-time Recovery কী?",
    answer: `
<p><strong>mongodump:</strong> BSON ব্যাকআপ ফাইল। <strong>Point-in-time Recovery:</strong> LVM Snapshot এবং Oplog রিড করে রিয়েল-টাইম সেকেন্ড লেভেলের ডাটা রিকভার করা।</p>
    `
  },
  {
    id: "mongo-48",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Queries", "Projection", "Fields"],
    question: "MongoDB Projection ({ name: 1, _id: 0 }) দিয়ে নেটওয়ার্ক পে-লোড কীভাবে কমাবেন?",
    answer: `
<p>প্রয়োজনীয় ফিল্ডগুলো সিলেক্ট করে অপ্রয়োজনীয় ভারী কলাম ফিল্টার করে আউটপুট পে-লোড এবং ব্যান্ডউইথ সাশ্রয় করা।</p>
    `
  },
  {
    id: "mongo-49",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["GridFS", "Big Files", "Chunks"],
    question: "MongoDB GridFS Architecture: fs.files vs fs.chunks দিয়ে ১৬MB-র বড় ফাইল স্টোর কীভাবে করা হয়?",
    answer: `
<p>বড় ফাইলকে (e.g. 500MB Video) 255KB এর ছোট ছোট বাইনারি Chunk-এ ভাগ করে <code>fs.chunks</code> কালেকশনে স্টোর রাখা এবং <code>fs.files</code>-এ মেটাডাটা রাখা।</p>
    `
  },
  {
    id: "mongo-50",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Optimization", "Hint", "force index"],
    question: "db.collection.find().hint() দিয়ে নির্দিষ্ট ইনডেক্স জোরপূর্বক ব্যবহার কীভাবে করাবেন?",
    answer: `
<p>MongoDB Query Planner যদি ভুল করে ধীরগতির ইনডেক্স নির্বাচন করে, তবে <code>.hint({ email: 1 })</code> দিয়ে কাঙ্ক্ষিত সেরা ইনডেক্স প্রয়োগ করতে বাধ্য করা।</p>
    `
  }
];
