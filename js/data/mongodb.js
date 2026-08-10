const mongodbQuestions = [
  {
    id: "mongo-1",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["BSON","Architecture","NoSQL"],
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
    tags: ["MongoDB","Bulk Operations","Performance","Senior"],
    question: "MongoDB Bulk Write Operations (bulkWrite, insertMany ordered vs unordered) কীভাবে পারফরম্যান্স বাড়ায়?",
    answer: `
      <p>একাধিক ডকুমেন্ট একটির পর একটি আলাদাভাবে ইনসার্ট/আপডেট করলে প্রতিটির জন্য আলাদা নেটওয়ার্ক রাউন্ড-ট্রিপ লাগে — <code>bulkWrite()</code> একাধিক অপারেশন একটি single request-এ ব্যাচ করে পাঠায়, যা বড় ডেটা লোডে বিশাল পারফরম্যান্স পার্থক্য তৈরি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>await db.collection('orders').bulkWrite([
  { insertOne: { document: { userId: 1, total: 500 } } },
  { updateOne: { filter: { _id: id1 }, update: { $set: { status: 'shipped' } } } },
  { deleteOne: { filter: { _id: id2 } } },
], { ordered: false });</code></pre>
      </div>
      <h4>Ordered vs Unordered — গুরুত্বপূর্ণ পার্থক্য</h4>
      <table>
        <tr><th>মোড</th><th>আচরণ</th><th>গতি</th></tr>
        <tr><td><code>ordered: true</code> (ডিফল্ট)</td><td>ক্রমানুসারে চলে, একটি ব্যর্থ হলে বাকিগুলো থামে</td><td>ধীর (সিকোয়েন্সিয়াল)</td></tr>
        <tr><td><code>ordered: false</code></td><td>একাধিক শার্ডে সমান্তরালে চলে, একটি ব্যর্থ হলেও বাকিগুলো চলতে থাকে</td><td>দ্রুত</td></tr>
      </table>
      <p><strong>সিনিয়র-স্তরের নির্দেশনা:</strong> ডেটার মধ্যে কোনো নির্ভরতা না থাকলে (একটি অপারেশনের ফলাফল আরেকটির উপর নির্ভর করে না) <code>ordered: false</code> ব্যবহার করুন — শার্ডেড ক্লাস্টারে এটি সব শার্ডে সমান্তরালে execute হতে পারে, উল্লেখযোগ্যভাবে দ্রুত। কিন্তু order গুরুত্বপূর্ণ হলে (যেমন একটি লেনদেনের ধাপ) <code>ordered: true</code>-ই নিরাপদ।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>bulkWrite-এ আংশিক ব্যর্থতা হলে (কিছু অপারেশন সফল, কিছু ব্যর্থ) কীভাবে রেজাল্ট থেকে বুঝবেন কোনগুলো সফল হলো?</li>
      </ul>
    `
  },
  {
    id: "mongo-3",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["MongoDB","Indexing","Query Optimization","Senior"],
    question: "MongoDB Covered Query কী? Index-only Scan কীভাবে ডিস্ক I/O সম্পূর্ণ এড়িয়ে যায়?",
    answer: `
      <p><strong>Covered Query</strong> এমন একটি কোয়েরি যার সব প্রয়োজনীয় ফিল্ড (query filter + projection দুটোতেই) একটি ইনডেক্সে বিদ্যমান — MongoDB আসল ডকুমেন্ট (collection storage) স্পর্শই করে না, শুধু ইনডেক্স থেকে উত্তর দিয়ে দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.users.createIndex({ email: 1, name: 1 });

// ✅ Covered query — email দিয়ে ফিল্টার, name প্রজেক্ট, দুটোই ইনডেক্সে আছে, _id বাদ
db.users.find(
  { email: 'user@example.com' },
  { email: 1, name: 1, _id: 0 }
);
// explain() এ দেখাবে: totalDocsExamined: 0 — ডকুমেন্ট একবারও পড়া হয়নি!

// ❌ Covered নয় — status ইনডেক্সে নেই, তাই ডকুমেন্ট পড়তেই হবে
db.users.find({ email: 'user@example.com' }, { status: 1 });</code></pre>
      </div>
      <h4>কেন এটি দ্রুত — ভেতরের কারণ</h4>
      <p>সাধারণ ইনডেক্স-ব্যবহৃত কোয়েরিতে দুটি ধাপ লাগে: (১) ইনডেক্স স্ক্যান করে ম্যাচিং ডকুমেন্টের পয়েন্টার খোঁজা, (২) সেই পয়েন্টার দিয়ে collection storage থেকে আসল ডকুমেন্ট fetch করা (এটিকে <strong>document fetch</strong> বলে, যা ডিস্ক/RAM I/O প্রয়োজন করে)। Covered query-তে দ্বিতীয় ধাপ সম্পূর্ণ বাদ পড়ে যায় — কারণ প্রয়োজনীয় সব ডেটা ইনডেক্সেই আছে।</p>
      <h4>ব্যবহারিক শর্ত</h4>
      <ul>
        <li>Projection-এ শুধু ইনডেক্সের ফিল্ডই থাকতে হবে (<code>_id</code> ডিফল্টে যুক্ত থাকে বলে explicitly <code>_id: 0</code> দিতে হয়, যদি না <code>_id</code> ইনডেক্সে থাকে)।</li>
        <li>Filter-এও শুধু ইনডেক্স ফিল্ড ব্যবহার করতে হবে — অন্য কোনো non-indexed ফিল্ডে filter থাকলে covered হবে না।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>explain('executionStats')-এ কোন ফিল্ড দেখে বুঝবেন একটি কোয়েরি covered কিনা?</li>
      </ul>
    `
  },
  {
    id: "mongo-4",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Data Modeling","Embedding vs Referencing"],
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
    tags: ["MongoDB","Consistency","Replica Set","Senior"],
    question: "MongoDB Causal Consistency ও Read Concern 'linearizable' কীভাবে সেশন-লেভেল সামঞ্জস্য নিশ্চিত করে?",
    answer: `
      <p>Replica set-এ write master-এ হলেও read secondary থেকে হতে পারে — replication lag-এর কারণে ইউজার নিজের সদ্য করা write দেখতে না পারার ঝুঁকি থাকে। <strong>Causal Consistency</strong> MongoDB-এর সেশন-লেভেল ফিচার যা এই সমস্যা সমাধান করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const session = client.startSession({ causalConsistency: true });

await db.collection('orders').insertOne(
  { userId: 1, total: 500 },
  { session }
);

// একই সেশনে পরবর্তী read গ্যারান্টিড দেখবে উপরের write —
// এমনকি secondary থেকে পড়লেও, MongoDB নিশ্চিত করে read সেই write-এর "পরের" state দেখাবে
const order = await db.collection('orders').findOne(
  { userId: 1 },
  { session, readPreference: 'secondary' }
);</code></pre>
      </div>
      <h4>কীভাবে কাজ করে — ভেতরের প্রক্রিয়া</h4>
      <p>MongoDB প্রতিটি অপারেশনের সাথে একটি <strong>logical clock (operationTime)</strong> ট্র্যাক করে। Causal session-এ প্রতিটি অপারেশন আগের অপারেশনের clock value বহন করে — secondary থেকে read করার সময় MongoDB নিশ্চিত করে সেই secondary আগের write-এর clock পর্যন্ত sync হয়েছে কিনা, নাহলে অপেক্ষা করে বা primary-তে redirect করে।</p>
      <h4>Read Concern 'linearizable' — সবচেয়ে কড়া গ্যারান্টি</h4>
      <p><code>readConcern: 'linearizable'</code> নিশ্চিত করে যে read অপারেশন শুরু হওয়ার আগে যত write সফলভাবে acknowledge হয়েছে, তার সবকিছু দেখাবে — এটি শুধু primary-তে single-document read-এ প্রযোজ্য, এবং একটি network round-trip অতিরিক্ত সময় নেয় (majority acknowledgment যাচাই করতে)।</p>
      <h4>সিনিয়র-স্তরের ট্রেড-অফ</h4>
      <p>Causal consistency ও linearizable read উভয়ই <strong>অতিরিক্ত latency</strong>-এর বিনিময়ে সামঞ্জস্যতা কিনে নেয়। যেসব ফিচারে ইউজার-নিজের-লেখা-ডেটা দেখা জরুরি (প্রোফাইল আপডেট, অর্ডার তৈরি) সেখানেই এগুলো ব্যবহার করুন — সব read-এ প্রয়োগ করলে replica-এর load-balancing সুবিধা নষ্ট হয়ে যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Write Concern 'majority' ও Read Concern 'majority' একসাথে ব্যবহার করলে কী গ্যারান্টি পাওয়া যায় (Read-Your-Writes)?</li>
      </ul>
    `
  },
  {
    id: "mongo-6",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Sharding","Shard Key","Horizontal Scaling"],
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
    tags: ["Mongoose","Hooks","Middleware"],
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
    tags: ["MongoDB","Reliability","Transactions","Senior"],
    question: "MongoDB Retryable Writes কী? নেটওয়ার্ক ব্যর্থতায় Duplicate Insert কীভাবে প্রতিরোধ করে?",
    answer: `
      <p>একটি write অপারেশন সার্ভারে সফল হলেও, রেসপন্স ক্লায়েন্টে ফেরার পথে নেটওয়ার্ক ব্যর্থ হলে ক্লায়েন্ট জানতে পারে না write সফল হয়েছিল কিনা — নেইভভাবে retry করলে <strong>duplicate write</strong> হওয়ার ঝুঁকি থাকে। <strong>Retryable Writes</strong> এই সমস্যা নিরাপদে সমাধান করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// MongoDB ড্রাইভারে ডিফল্টভাবে চালু (retryWrites=true কানেকশন স্ট্রিং-এ)
const client = new MongoClient(uri, { retryWrites: true });

await db.collection('payments').insertOne({ orderId: 123, amount: 500 });
// নেটওয়ার্ক গ্লিচে রিকোয়েস্ট ব্যর্থ হলে ড্রাইভার স্বয়ংক্রিয়ভাবে একবার নিরাপদে retry করে —
// ডুপ্লিকেট payment ডকুমেন্ট তৈরি হয় না</code></pre>
      </div>
      <h4>কীভাবে কাজ করে — Server-side Deduplication</h4>
      <p>ড্রাইভার প্রতিটি write অপারেশনের সাথে একটি ইউনিক <strong>transaction identifier</strong> সংযুক্ত করে পাঠায়। রিট্রাই হলে সার্ভার (যা একটি replica set-এর অংশ, oplog-এ ট্র্যাক রাখে) দেখে এই identifier আগেই প্রসেস হয়েছে কিনা — হলে আবার execute না করে আগের ফলাফলই ফেরত দেয়। এভাবে ডুপ্লিকেট এড়ানো নিশ্চিত হয়, ক্লায়েন্টকে নিজে ম্যানুয়ালি ডুপ্লিকেট-চেক লজিক লিখতে হয় না।</p>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li>শুধু <strong>একবার</strong> স্বয়ংক্রিয়ভাবে retry হয় — একাধিকবার ধারাবাহিক ব্যর্থতায় অ্যাপ্লিকেশন-স্তরের retry লজিক প্রয়োজন।</li>
        <li>Standalone (non-replica-set) MongoDB ইনস্ট্যান্সে কাজ করে না — replica set বা sharded cluster প্রয়োজন।</li>
        <li>একাধিক ডকুমেন্ট affect করা bulk operation-এ (<code>ordered: true</code>) আংশিক retry জটিলতা তৈরি করতে পারে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Retryable Reads ও Retryable Writes-এর মধ্যে পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "mongo-9",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Array Operators","Update"],
    question: "MongoDB-তে Array Update Operators ($push, $addToSet, $pull, arrayFilters) কীভাবে কাজ করে?",
    answer: `
      <p>MongoDB-র array update operator গুলো অ্যারে ফিল্ডে অ্যাটমিক পরিবর্তন করতে দেয় — সম্পূর্ণ ডকুমেন্ট পড়ে, বদলে, আবার লেখার (যা race condition তৈরি করে) দরকার হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// $push — যোগ করা (ডুপ্লিকেট অনুমোদিত)
db.users.updateOne({ _id: 1 }, { $push: { tags: "mongodb" } });

// $push + modifier — শেষ ১০টি রাখা (রোলিং লিস্ট)
db.users.updateOne({ _id: 1 }, {
  $push: { recentViews: {
    $each: [{ productId: 42, at: new Date() }],
    $slice: -10,                       // শেষ ১০টি রাখো
    $sort: { at: -1 }
  }}
});

// $addToSet — শুধু না থাকলে যোগ করে (set semantics)
db.users.updateOne({ _id: 1 }, { $addToSet: { roles: "admin" } });

// $pull — শর্ত অনুযায়ী বাদ
db.users.updateOne({ _id: 1 }, { $pull: { tags: "deprecated" } });
db.orders.updateOne({ _id: 1 }, { $pull: { items: { qty: { $lte: 0 } } } });

// $pop — প্রথম (-1) বা শেষ (1) এলিমেন্ট বাদ
db.users.updateOne({ _id: 1 }, { $pop: { queue: -1 } });</code></pre>
      </div>
      <h4>নেস্টেড এলিমেন্ট আপডেট — তিনটি উপায়</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ১. positional $ — কুয়েরিতে মেলা প্রথম এলিমেন্ট
db.orders.updateOne(
  { _id: 1, "items.sku": "ABC" },
  { $set: { "items.$.qty": 5 } }
);

// ২. all positional $[] — সব এলিমেন্ট
db.orders.updateOne({ _id: 1 }, { $inc: { "items.$[].viewCount": 1 } });

// ৩. arrayFilters $[id] — শর্তসাপেক্ষে একাধিক ✅ সবচেয়ে শক্তিশালী
db.orders.updateOne(
  { _id: 1 },
  { $set: { "items.$[elem].status": "shipped" } },
  { arrayFilters: [ { "elem.qty": { $gte: 1 }, "elem.status": "pending" } ] }
);</code></pre>
      </div>
      <h4>যে বিষয়গুলো ইন্টারভিউতে গুরুত্বপূর্ণ</h4>
      <ul>
        <li><strong><code>$</code> শুধু <em>প্রথম</em> মেলা এলিমেন্ট আপডেট করে</strong> — এবং কুয়েরিতে সেই অ্যারে ফিল্ডের শর্ত থাকতেই হবে। একাধিক এলিমেন্ট আপডেট করতে <code>arrayFilters</code> লাগবে।</li>
        <li><strong><code>arrayFilters</code> (MongoDB 3.6+) সবচেয়ে নমনীয়</strong> — শর্তসাপেক্ষে একাধিক এলিমেন্ট একসাথে আপডেট করা যায়, এবং একাধিক ফিল্টার একসাথে দেওয়া যায়।</li>
        <li><strong><code>$addToSet</code> সম্পূর্ণ অবজেক্টের তুলনা করে</strong> — ফিল্ডের ক্রম ভিন্ন হলেও ভিন্ন ধরা হয়। তাই অবজেক্টের অ্যারেতে এটি প্রত্যাশিতভাবে কাজ না-ও করতে পারে।</li>
        <li><strong>অসীম বাড়তে পারে এমন অ্যারে এড়ান</strong> — ১৬ MB ডকুমেন্ট সীমা এবং বড় অ্যারেতে আপডেট ধীর। <code>$slice</code> দিয়ে সীমা বেঁধে দিন বা আলাদা কালেকশনে সরান।</li>
      </ul>
      <p><strong>অ্যাটমিকতার সুবিধা:</strong> এই সব অপারেশন সার্ভার-সাইডে অ্যাটমিক — দুটি সমান্তরাল <code>$push</code> কখনও একটি আরেকটিকে চাপা দেবে না। অ্যাপ্লিকেশনে read-modify-write করলে সেই নিশ্চয়তা থাকত না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>অ্যারেতে ইনডেক্স কীভাবে কাজ করে (multikey)?</li>
        <li>বড় অ্যারের বদলে কী ডিজাইন ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-10",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["TTL Index","Cache"],
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
  },
  {
    id: "mongo-11",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing","Text Search","Queries"],
    question: "MongoDB Text Search এবং Wildcard Indexing ($**) কীভাবে কাজ করে?",
    answer: `
      <p>MongoDB-তে টেক্সট সার্চের দুটি ব্যবস্থা আছে, এবং <strong>wildcard index</strong> একটি সম্পূর্ণ ভিন্ন জিনিস — নাম দেখে গুলিয়ে ফেলা সহজ।</p>
      <h4>Text Index — ফুল-টেক্সট সার্চ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// একাধিক ফিল্ডে ওজনসহ
db.articles.createIndex(
  { title: "text", body: "text" },
  { weights: { title: 10, body: 1 }, default_language: "english" }
);

db.articles.find(
  { $text: { $search: "mongodb performance -deprecated" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
// "-" = বাদ দাও, "\\"হুবহু বাক্যাংশ\\"" = phrase</code></pre>
      </div>
      <p><strong>সীমাবদ্ধতা:</strong> প্রতি কালেকশনে <strong>একটিমাত্র</strong> text index থাকতে পারে; বাংলা সহ অনেক ভাষায় stemming নেই; fuzzy/টাইপো সহনশীলতা নেই; প্রাসঙ্গিকতা স্কোরিং প্রাথমিক পর্যায়ের।</p>
      <p>গুরুতর সার্চের প্রয়োজন হলে <strong>Atlas Search</strong> (ভেতরে Lucene) বা আলাদা Elasticsearch ব্যবহার করুন — MongoDB-র নেটিভ text search কেবল সাধারণ প্রয়োজনের জন্য।</p>
      <h4>Wildcard Index — সম্পূর্ণ ভিন্ন জিনিস</h4>
      <p>এটি টেক্সট সার্চ নয় — এটি <strong>অজানা বা পরিবর্তনশীল ফিল্ড নামে</strong> ইনডেক্স করার উপায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// সব ফিল্ড ইনডেক্স করো
db.products.createIndex({ "$**": 1 });

// শুধু একটি সাবডকুমেন্টের সব ফিল্ড (অনেক বেশি প্রস্তাবিত)
db.products.createIndex({ "attributes.$**": 1 });

// ডকুমেন্ট যেখানে attributes প্রতিটি পণ্যে আলাদা:
{ sku: "A1", attributes: { color: "লাল", size: "XL" } }
{ sku: "B2", attributes: { voltage: "220V", warranty: "2 বছর" } }
// → যেকোনো attribute-এ কুয়েরি ইনডেক্স ব্যবহার করবে</code></pre>
      </div>
      <h4>Wildcard index-এর গুরুত্বপূর্ণ সীমা</h4>
      <ul>
        <li><strong>Compound index হিসেবে কাজ করে না</strong> — একটি কুয়েরিতে একটিমাত্র ফিল্ডেই ব্যবহার হবে।</li>
        <li><strong>Sort-এ সাহায্য করে না।</strong></li>
        <li><strong>ইনডেক্স বিশাল ও write ধীর হয়</strong> — প্রতিটি ফিল্ডের জন্য এন্ট্রি তৈরি হয়।</li>
      </ul>
      <p><strong>নিয়ম:</strong> ফিল্ডের নাম আগে থেকে জানা থাকলে <em>কখনও</em> wildcard index ব্যবহার করবেন না — নির্দিষ্ট ইনডেক্স সবসময় ভালো। এটি কেবল সত্যিকারের ডায়নামিক স্কিমার জন্য (ইউজার-সংজ্ঞায়িত কাস্টম ফিল্ড, বহু-টেন্যান্ট আলাদা অ্যাট্রিবিউট)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Text index-এর বদলে Atlas Search কখন বেছে নেবেন?</li>
        <li>Wildcard index-এ <code>wildcardProjection</code> কী কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "mongo-12",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["MongoDB","Aggregation","Materialized View","Senior"],
    question: "MongoDB Aggregation-এ $merge ও $out Stage দিয়ে Materialized View কীভাবে তৈরি করবেন?",
    answer: `
      <p>জটিল aggregation pipeline বারবার চালানো ব্যয়বহুল হতে পারে — <code>$merge</code> ও <code>$out</code> স্টেজ aggregation-এর ফলাফল একটি আলাদা কালেকশনে সংরক্ষণ করে, যাতে সেটি একটি প্রি-কম্পিউটেড <strong>Materialized View</strong> হিসেবে দ্রুত read করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// প্রতি রাতে চলা একটি cron job — daily sales summary প্রি-কম্পিউট করে
db.orders.aggregate([
  { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay } } },
  { $group: { _id: '$productId', totalSales: { $sum: '$amount' }, count: { $sum: 1 } } },
  { $merge: {
      into: 'daily_sales_summary',
      whenMatched: 'replace',      // আগে থেকে থাকলে replace করো
      whenNotMatched: 'insert'     // না থাকলে নতুন insert করো
  }}
]);

// এখন ড্যাশবোর্ড সরাসরি প্রি-কম্পিউটেড কালেকশন থেকে পড়ে — জটিল aggregation আবার চালাতে হয় না
db.daily_sales_summary.find({ _id: 'product-42' });</code></pre>
      </div>
      <h4>$merge বনাম $out — মূল পার্থক্য</h4>
      <table>
        <tr><th></th><th>$out</th><th>$merge</th></tr>
        <tr><td><strong>আচরণ</strong></td><td>টার্গেট কালেকশন সম্পূর্ণ প্রতিস্থাপন করে</td><td>ডকুমেন্ট-ভিত্তিক merge (update/insert/keep/fail — নিয়ন্ত্রণযোগ্য)</td></tr>
        <tr><td><strong>Incremental Update</strong></td><td>সমর্থন করে না — প্রতিবার পুরো পুনর্গণনা</td><td>সমর্থন করে — শুধু বদলানো অংশ merge করা যায়</td></tr>
        <tr><td><strong>Sharded কালেকশনে</strong></td><td>সীমিত</td><td>ভালো সাপোর্ট</td></tr>
      </table>
      <h4>কেন গুরুত্বপূর্ণ — Read-Heavy Analytics-এ পারফরম্যান্স</h4>
      <p>একটি ড্যাশবোর্ডে হাজার হাজার ইউজার একই ভারী aggregation বারবার ট্রিগার করলে ডাটাবেজে বিশাল লোড পড়ে। Materialized view প্যাটার্নে ভারী গণনা <strong>একবার (background job-এ)</strong> হয়, এবং সব read সেই প্রি-কম্পিউটেড ফলাফল থেকে দ্রুত সার্ভ হয় — এটি অনেকটা Redis caching-এর নীতির মতোই, শুধু ডাটাবেজের ভেতরেই বাস্তবায়িত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Materialized view কতক্ষণ পর পর রিফ্রেশ করা উচিত — stale ডেটা দেখানোর ঝুঁকি কীভাবে ব্যালেন্স করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-13",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Internals","WiredTiger","Engine"],
    question: "MongoDB WiredTiger Storage Engine কীভাবে Concurrency পরিচালনা করে?",
    answer: `
      <p><strong>WiredTiger</strong> MongoDB 3.2 থেকে ডিফল্ট storage engine। এর concurrency মডেলের ভিত্তি হলো <strong>MVCC (Multi-Version Concurrency Control)</strong> ও <strong>document-level locking</strong>।</p>
      <h4>Document-level locking</h4>
      <p>পুরনো MMAPv1 engine-এ <em>collection</em> বা এমনকি <em>database</em> স্তরে লক নেওয়া হতো — একটি write পুরো কালেকশনকে ব্লক করত। WiredTiger-এ লক <strong>ডকুমেন্ট স্তরে</strong>, তাই ভিন্ন ডকুমেন্টে সমান্তরাল write সম্পূর্ণ সম্ভব। এটিই MongoDB-র write throughput-এ সবচেয়ে বড় উন্নতি এনেছিল।</p>
      <h4>MVCC — লক ছাড়া পড়া</h4>
      <p>প্রতিটি write একটি ডকুমেন্টের <em>নতুন সংস্করণ</em> তৈরি করে, পুরনোটি মুছে ফেলে না। ফলে:</p>
      <ul>
        <li><strong>Reader কখনও writer-কে ব্লক করে না, এবং উল্টোটাও নয়</strong> — reader তার শুরুর মুহূর্তের সঙ্গতিপূর্ণ snapshot দেখে।</li>
        <li>দীর্ঘ কুয়েরি চলাকালে ডেটা বদলালেও সেই কুয়েরি একটি স্থির দৃশ্য পায়।</li>
      </ul>
      <h4>Optimistic concurrency ও write conflict</h4>
      <p>WiredTiger <em>আশাবাদী</em> — এটি ধরে নেয় দ্বন্দ্ব বিরল। দুটি অপারেশন একই ডকুমেন্ট একসাথে বদলাতে গেলে একটি <strong>WriteConflict</strong> এরর পায় এবং MongoDB সেটি স্বচ্ছভাবে পুনরায় চেষ্টা করে।</p>
      <p><strong>কিন্তু ট্রানজেকশনে এটি স্বয়ংক্রিয় নয়</strong> — সেখানে অ্যাপ্লিকেশনকে রিট্রাই করতে হয় (<code>withTransaction</code> এটি করে দেয়)। উচ্চ কনটেনশনে (যেমন একটি কাউন্টার ডকুমেন্টে হাজারো আপডেট) এটি পারফরম্যান্স সমস্যা তৈরি করে।</p>
      <h4>Cache — সবচেয়ে গুরুত্বপূর্ণ টিউনিং</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ডিফল্ট: max(50% of (RAM - 1GB), 256MB)
storage.wiredTiger.engineConfig.cacheSizeGB: 8

db.serverStatus().wiredTiger.cache
// "bytes currently in the cache"
// "tracked dirty bytes in the cache"
// "pages evicted by application threads"  ← ⚠️ শূন্যের বেশি = সমস্যা</code></pre>
      </div>
      <p><strong>বাকি ৫০% RAM কেন ছেড়ে দেওয়া হয়:</strong> WiredTiger ডিস্কে <strong>Snappy কম্প্রেশন</strong> সহ ডেটা রাখে, কিন্তু ক্যাশে রাখে <em>আন-কম্প্রেসড</em> অবস্থায়। বাকি RAM OS-এর file system cache-এ কম্প্রেসড ব্লক ধরে রাখে — কার্যত দুই স্তরের ক্যাশিং।</p>
      <p><strong>"pages evicted by application threads"</strong> শূন্যের বেশি হওয়া একটি সতর্কসংকেত — এর মানে ক্যাশ পূর্ণ এবং <em>ইউজারের কুয়েরি থ্রেডকেই</em> জায়গা খালি করতে হচ্ছে, যা latency নাটকীয়ভাবে বাড়ায়। ক্যাশ বাড়ান বা ওয়ার্কিং সেট কমান।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Working set কী এবং কীভাবে হিসাব করবেন?</li>
        <li>Checkpoint কীভাবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "mongo-14",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["MongoDB","Schema Design","Migration","Senior"],
    question: "MongoDB-তে Evolving Schema-র জন্য Schema Versioning Pattern কীভাবে বাস্তবায়ন করবেন?",
    answer: `
      <p>MongoDB schema-less হলেও, প্রোডাকশন অ্যাপ্লিকেশনের ডেটা মডেল সময়ের সাথে বদলায় — নতুন ফিল্ড যোগ, পুরনো ফিল্ডের গঠন পরিবর্তন। একই কালেকশনে <strong>বিভিন্ন ভার্সনের ডকুমেন্ট</strong> একসাথে থাকার বাস্তবতা সামলাতে Schema Versioning Pattern ব্যবহার করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// পুরনো ডকুমেন্ট (schemaVersion নেই বা 1)
{ _id: 1, name: 'Rahim', address: '123 Main St, Dhaka' }

// নতুন স্কিমা — address এখন structured অবজেক্ট
{ _id: 2, schemaVersion: 2, name: 'Karim', address: { street: '456 Ave', city: 'Dhaka', zip: '1200' } }</code></pre>
      </div>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// অ্যাপ্লিকেশন কোড উভয় ভার্সন সামলায়
function normalizeUser(doc) {
  if (!doc.schemaVersion || doc.schemaVersion < 2) {
    return { ...doc, address: parseAddressString(doc.address), schemaVersion: 2 };
  }
  return doc;
}

// Lazy Migration — read করার সময় পুরনো ডকুমেন্ট নতুন ফরম্যাটে আপডেট করে ফেলা
const doc = await db.users.findOne({ _id: id });
const normalized = normalizeUser(doc);
if (normalized.schemaVersion !== doc.schemaVersion) {
  await db.users.replaceOne({ _id: id }, normalized);   // পরের বার আর কনভার্সন লাগবে না
}</code></pre>
      </div>
      <h4>তিনটি মাইগ্রেশন কৌশল</h4>
      <table>
        <tr><th>কৌশল</th><th>পদ্ধতি</th><th>ট্রেড-অফ</th></tr>
        <tr><td><strong>Big Bang</strong></td><td>একবারে সব ডকুমেন্ট মাইগ্রেট করা (bulk script)</td><td>সহজ, কিন্তু বড় কালেকশনে ডাউনটাইম/লোড ঝুঁকি</td></tr>
        <tr><td><strong>Lazy (on-read)</strong></td><td>ডকুমেন্ট read/write হওয়ার সময় স্বয়ংক্রিয়ভাবে আপডেট</td><td>ধীরে ধীরে migrate হয়, কম-ব্যবহৃত ডকুমেন্ট পুরনোই থেকে যেতে পারে</td></tr>
        <tr><td><strong>Predicate-based Background Job</strong></td><td>ব্যাচে ব্যাচে পুরনো ভার্সন খুঁজে migrate করা</td><td>নিয়ন্ত্রিত, লোড ছড়িয়ে দেওয়া যায়</td></tr>
      </table>
      <p><strong>মূল নীতি:</strong> অ্যাপ্লিকেশন কোড সবসময় একাধিক schema version একসাথে সামলাতে সক্ষম থাকা উচিত — MongoDB নিজে কোনো স্কিমা এনফোর্স করে না, তাই এই দায়িত্ব সম্পূর্ণ অ্যাপ্লিকেশন লেয়ারের।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>$jsonSchema validation যোগ করলে বিদ্যমান পুরনো-ফরম্যাট ডকুমেন্টের কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mongo-15",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Realtime","Change Streams","Events"],
    question: "MongoDB Change Streams কীভাবে কাজ করে?",
    answer: `
      <p><strong>Change Streams</strong> MongoDB-র রিয়েল-টাইম ইভেন্ট API — ডেটাবেজে কোনো পরিবর্তন হলে সাথে সাথে অ্যাপ্লিকেশন জানতে পারে, কোনো polling ছাড়াই।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const pipeline = [
  { $match: {
      operationType: { $in: ["insert", "update", "replace"] },
      "fullDocument.status": "pending"
  }}
];

const changeStream = db.collection('orders').watch(pipeline, {
  fullDocument: "updateLookup",       // আপডেটে সম্পূর্ণ ডকুমেন্ট চাই
  resumeAfter: savedResumeToken       // ⚠️ পুনরায় শুরুর জন্য অপরিহার্য
});

for await (const change of changeStream) {
  await handleChange(change);
  // প্রতিটি ইভেন্টের পর token সংরক্ষণ করুন
  await saveResumeToken(change._id);
}</code></pre>
      </div>
      <h4>কীভাবে কাজ করে</h4>
      <p>Change stream ভেতরে <strong>oplog</strong> পড়ে — সেই একই লগ যা replica set রেপ্লিকেশনের জন্য ব্যবহার করে। তাই এটি নির্ভরযোগ্য ও দক্ষ, এবং <strong>replica set বা sharded ক্লাস্টার আবশ্যক</strong> (একক mongod-এ কাজ করে না)।</p>
      <h4>Resume token — সবচেয়ে গুরুত্বপূর্ণ ধারণা</h4>
      <p>প্রতিটি ইভেন্টে একটি <code>_id</code> (resume token) থাকে। অ্যাপ্লিকেশন ক্র্যাশ করলে বা রিস্টার্ট হলে সেই token দিয়ে <strong>ঠিক যেখানে থেমেছিল সেখান থেকে</strong> আবার শুরু করা যায় — কোনো ইভেন্ট মিস হয় না।</p>
      <p><strong>Token সংরক্ষণ না করলে</strong> রিস্টার্টে বর্তমান সময় থেকে শুরু হবে এবং মাঝের সব পরিবর্তন হারিয়ে যাবে। এটি সবচেয়ে সাধারণ বাগ।</p>
      <p><strong>সীমা:</strong> Token শুধু ততক্ষণ কাজ করে যতক্ষণ সেই oplog এন্ট্রি আছে। অ্যাপ্লিকেশন oplog window-র চেয়ে বেশি সময় বন্ধ থাকলে token অকেজো হয়ে যায় (<code>ChangeStreamHistoryLost</code>) — তখন সম্পূর্ণ resync লাগে।</p>
      <h4>ব্যবহার</h4>
      <ul>
        <li><strong>Cache invalidation:</strong> ডেটা বদলালেই Redis কী মুছে ফেলা।</li>
        <li><strong>Search index সিঙ্ক:</strong> MongoDB → Elasticsearch, dual write-এর অসঙ্গতি ছাড়াই।</li>
        <li><strong>রিয়েল-টাইম নোটিফিকেশন:</strong> WebSocket দিয়ে ইউজারকে লাইভ আপডেট।</li>
        <li><strong>Audit log ও ইভেন্ট-চালিত আর্কিটেকচার।</strong></li>
      </ul>
      <h4>যে বিষয়গুলো মনে রাখবেন</h4>
      <ul>
        <li><strong><code>fullDocument: "updateLookup"</code></strong> না দিলে আপডেট ইভেন্টে কেবল <em>পরিবর্তিত ফিল্ডগুলো</em> আসে। সম্পূর্ণ ডকুমেন্ট চাইলে এটি দিন — তবে এটি একটি অতিরিক্ত lookup করে, তাই ধীর। এছাড়া এটি <em>বর্তমান</em> অবস্থা দেয়, ইভেন্টের মুহূর্তের নয়।</li>
        <li><strong>Delete ইভেন্টে ডকুমেন্ট পাওয়া যায় না</strong> — শুধু <code>_id</code>। মুছে ফেলা ডেটা দরকার হলে <code>fullDocumentBeforeChange</code> (MongoDB 6.0+, pre-image চালু থাকলে) ব্যবহার করুন।</li>
        <li><strong>একাধিক কনজিউমার চালালে প্রত্যেকে সব ইভেন্ট পাবে</strong> — Kafka-র consumer group-এর মতো কাজ ভাগাভাগি নেই। কাজ ভাগ করতে হলে নিজে একটি কিউতে পাঠাতে হবে।</li>
        <li><strong>Pipeline দিয়ে সার্ভার-সাইডেই ফিল্টার করুন</strong> — অপ্রয়োজনীয় ইভেন্ট নেটওয়ার্কে পাঠানো এড়াতে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Change stream বনাম Debezium CDC — কখন কোনটি?</li>
        <li>একাধিক অ্যাপ্লিকেশন ইনস্ট্যান্সে change stream কীভাবে চালাবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-16",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Storage","GridFS","Files"],
    question: "MongoDB-তে 16MB-এর বড় ফাইল সংরক্ষণে GridFS কীভাবে কাজ করে?",
    answer: `
      <p><strong>GridFS</strong> MongoDB-র ১৬ MB ডকুমেন্ট সীমার চেয়ে বড় ফাইল সংরক্ষণের ব্যবস্থা — এটি ফাইলকে চাঙ্কে ভেঙে দুটি কালেকশনে রাখে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

// আপলোড — স্ট্রিমিং, পুরো ফাইল মেমরিতে আসে না
fs.createReadStream('./video.mp4')
  .pipe(bucket.openUploadStream('video.mp4', {
    metadata: { userId: 42, contentType: 'video/mp4' }
  }));

// ডাউনলোড — রেঞ্জ সহ (ভিডিও seek করার জন্য)
bucket.openDownloadStreamByName('video.mp4', { start: 0, end: 1048576 })
      .pipe(res);</code></pre>
      </div>
      <h4>দুটি কালেকশন</h4>
      <ul>
        <li><strong><code>fs.files</code></strong> — মেটাডেটা: ফাইলের নাম, আকার, আপলোডের সময়, MD5, কাস্টম metadata।</li>
        <li><strong><code>fs.chunks</code></strong> — আসল বাইনারি ডেটা, ডিফল্টে <strong>২৫৫ KB</strong> চাঙ্কে ভাগ করা। প্রতিটি চাঙ্কে <code>files_id</code> ও <code>n</code> (ক্রম নম্বর) থাকে।</li>
      </ul>
      <p>পড়ার সময় ড্রাইভার <code>{ files_id, n }</code> ইনডেক্স ব্যবহার করে ক্রমানুসারে চাঙ্ক এনে জোড়া লাগায়।</p>
      <h4>প্রকৃত সুবিধা</h4>
      <ul>
        <li><strong>Range request সমর্থন</strong> — ভিডিও streaming বা বড় ফাইলের একটি অংশ পড়া যায়, পুরোটা না নামিয়েই।</li>
        <li><strong>রেপ্লিকেশন ও ব্যাকআপে অন্তর্ভুক্ত</strong> — ফাইল ও ডেটা একই ব্যবস্থায়।</li>
        <li><strong>Sharding সম্ভব।</strong></li>
        <li>মেটাডেটায় সমৃদ্ধ কুয়েরি করা যায়।</li>
      </ul>
      <h4>কিন্তু বাস্তবে — সাধারণত ব্যবহার করবেন না</h4>
      <p><strong>প্রায় সব ক্ষেত্রেই object storage (S3, R2, GCS) অনেক ভালো:</strong></p>
      <ul>
        <li><strong>খরচ:</strong> S3 স্টোরেজ MongoDB স্টোরেজের একটি ভগ্নাংশ।</li>
        <li><strong>CDN ইন্টিগ্রেশন:</strong> ফাইল সরাসরি এজ থেকে সার্ভ হয় — আপনার সার্ভার ছোঁয়াই লাগে না।</li>
        <li><strong>Presigned URL:</strong> ব্রাউজার সরাসরি আপলোড/ডাউনলোড করে; ডেটা আপনার অ্যাপ্লিকেশন ও ডাটাবেজের মধ্য দিয়ে যায় না।</li>
        <li><strong>ডাটাবেজের উপর চাপ:</strong> GridFS ফাইল ডেটা WiredTiger ক্যাশ দখল করে — আপনার আসল ডেটার জন্য কম RAM থাকে। এটিই সবচেয়ে বড় সমস্যা।</li>
      </ul>
      <p><strong>GridFS কখন যুক্তিযুক্ত:</strong> যখন S3 ব্যবহার করা যায় না (এয়ার-গ্যাপড পরিবেশ, কড়া ডেটা রেসিডেন্সি নিয়ম), অথবা ফাইল ও ডেটার মধ্যে অ্যাটমিক ট্রানজেকশন দরকার।</p>
      <p><strong>স্ট্যান্ডার্ড প্যাটার্ন:</strong> ফাইল S3-তে, MongoDB-তে শুধু URL ও metadata।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Presigned URL দিয়ে আপলোড ফ্লো কীভাবে ডিজাইন করবেন?</li>
        <li>GridFS-এ ফাইল মুছলে চাঙ্কগুলো কীভাবে পরিষ্কার হয়?</li>
      </ul>
    `
  },
  {
    id: "mongo-17",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Mongoose","Populate","Aggregation"],
    question: "Mongoose Populate vs MongoDB Aggregation $lookup-এর পার্থক্য কী?",
    answer: `
      <p>দুটিই MongoDB-তে "join"-এর মতো কাজ করে, কিন্তু <strong>সম্পূর্ণ ভিন্ন জায়গায় চলে</strong> — এবং এই পার্থক্যটি পারফরম্যান্সে বিশাল প্রভাব ফেলে।</p>
      <table>
        <tr><th>দিক</th><th>Mongoose <code>populate()</code></th><th><code>$lookup</code></th></tr>
        <tr><td>কোথায় চলে</td><td><strong>অ্যাপ্লিকেশনে</strong></td><td><strong>ডাটাবেজে</strong></td></tr>
        <tr><td>কতগুলো কুয়েরি</td><td>২+ (আলাদা রাউন্ড-ট্রিপ)</td><td>১</td></tr>
        <tr><td>Aggregation-এ ব্যবহার</td><td>❌ না</td><td>✅ হ্যাঁ</td></tr>
        <tr><td>কোড পাঠযোগ্যতা</td><td>সহজ</td><td>বেশি ভার্বোস</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Mongoose populate — ভেতরে যা ঘটে
const posts = await Post.find({ published: true })
                        .populate('author', 'name email');
// ১. db.posts.find({ published: true })
// ২. db.users.find({ _id: { $in: [সব authorId] } })
// ৩. Node.js-এ মেমরিতে জোড়া লাগানো

// $lookup — একটি কুয়েরিতেই
db.posts.aggregate([
  { $match: { published: true } },
  { $lookup: {
      from: "users",
      localField: "authorId",
      foreignField: "_id",
      as: "author",
      pipeline: [ { $project: { name: 1, email: 1 } } ]   // ⚠️ ফিল্ড সীমিত করুন
  }},
  { $unwind: "$author" }
]);</code></pre>
      </div>
      <h4>Populate সম্পর্কে ভুল ধারণা</h4>
      <p>অনেকে ভাবেন <code>populate</code> N+1 কুয়েরি সমস্যা তৈরি করে। বাস্তবে Mongoose চতুর — এটি সব <code>authorId</code> সংগ্রহ করে <strong>একটিমাত্র <code>$in</code> কুয়েরি</strong> চালায়। তাই এটি N+1 নয়, বরং "১+১"।</p>
      <p><strong>তবু <code>$lookup</code> কখন ভালো:</strong></p>
      <ul>
        <li><strong>যুক্ত ডেটার উপর ফিল্টার বা সাজানো দরকার হলে</strong> — <code>populate</code>-এ সেটি সম্ভব নয়, কারণ জোড়া লাগানোর কাজ ডেটা আনার <em>পরে</em> হয়। ফলে "যেসব পোস্টের লেখক ঢাকায়" খুঁজতে হলে সব পোস্ট আনতে হবে, তারপর ফিল্টার — বিপুল অপচয়।</li>
        <li><strong>Aggregation pipeline-এর অংশ হিসেবে</strong> — <code>$group</code>, <code>$facet</code>-এর সাথে।</li>
        <li><strong>নেটওয়ার্ক রাউন্ড-ট্রিপ কমাতে</strong> — বিশেষত ডাটাবেজ দূরে থাকলে।</li>
      </ul>
      <h4>$lookup-এর পারফরম্যান্স সতর্কতা</h4>
      <ul>
        <li><strong><code>foreignField</code>-এ ইনডেক্স থাকতেই হবে</strong> — না থাকলে প্রতিটি ইনপুট ডকুমেন্টের জন্য একটি COLLSCAN চলবে। এটি সবচেয়ে সাধারণ পারফরম্যান্স বিপর্যয়।</li>
        <li><strong><code>pipeline</code> ব্যবহার করে ফিল্ড সীমিত করুন</strong> — নাহলে সম্পূর্ণ যুক্ত ডকুমেন্ট মেমরিতে আসে।</li>
        <li><strong>Sharded কালেকশনে সীমাবদ্ধতা আছে</strong> — <code>$lookup</code>-এর <code>from</code> কালেকশনটি sharded হলে কিছু সংস্করণে সীমা প্রযোজ্য।</li>
        <li><strong>১০০ MB stage সীমা</strong> — বড় join-এ <code>allowDiskUse</code> লাগতে পারে।</li>
      </ul>
      <p><strong>সবচেয়ে ভালো উত্তর:</strong> ঘন ঘন একসাথে লাগে এমন ডেটা <strong>denormalize</strong> করে রাখুন (যেমন পোস্টে লেখকের নাম কপি করা) — তাহলে join-ই লাগে না। MongoDB-তে এটি অ্যান্টি-প্যাটার্ন নয়, বরং প্রস্তাবিত নকশা।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Denormalize করা নাম বদলালে কীভাবে সিঙ্ক রাখবেন?</li>
        <li>Nested populate কতটা ব্যয়বহুল?</li>
      </ul>
    `
  },
  {
    id: "mongo-18",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Indexing","Sparse","Partial"],
    question: "MongoDB Sparse Index এবং Partial Index-এর পার্থক্য কী?",
    answer: `
      <p>দুটিই ইনডেক্সের আকার কমায় ডকুমেন্টের একটি উপসেট ইনডেক্স করে — কিন্তু নিয়ন্ত্রণের মাত্রা আলাদা।</p>
      <table>
        <tr><th>দিক</th><th>Sparse Index</th><th>Partial Index</th></tr>
        <tr><td>কী বাদ দেয়</td><td>যে ডকুমেন্টে ফিল্ডটি <strong>নেই</strong></td><td>যে ডকুমেন্ট <strong>শর্ত পূরণ করে না</strong></td></tr>
        <tr><td>নিয়ন্ত্রণ</td><td>শুধু অস্তিত্ব</td><td>যেকোনো ফিল্টার এক্সপ্রেশন</td></tr>
        <tr><td>প্রস্তাবনা</td><td>পুরনো</td><td><strong>প্রায় সব ক্ষেত্রেই ভালো</strong></td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Sparse — শুধু যাদের phone ফিল্ড আছে
db.users.createIndex({ phone: 1 }, { sparse: true });

// Partial — অনেক বেশি নমনীয়
db.orders.createIndex(
  { createdAt: -1 },
  { partialFilterExpression: { status: "pending" } }
);
// শুধু pending অর্ডার ইনডেক্স হবে — ইনডেক্স ছোট ও দ্রুত

// Unique + partial — অত্যন্ত কার্যকর সমন্বয়
db.users.createIndex(
  { email: 1 },
  { unique: true,
    partialFilterExpression: { email: { $exists: true, $type: "string" } } }
);
// একাধিক ডকুমেন্টে email অনুপস্থিত থাকতে পারবে,
// কিন্তু যাদের আছে তাদের মধ্যে অবশ্যই ইউনিক</code></pre>
      </div>
      <h4>একটি গুরুত্বপূর্ণ ফাঁদ</h4>
      <p>MongoDB একটি partial বা sparse ইনডেক্স <strong>কেবল তখনই ব্যবহার করবে</strong> যখন সে নিশ্চিত হতে পারে ইনডেক্সে সব প্রয়োজনীয় ডকুমেন্ট আছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ইনডেক্স: partialFilterExpression: { status: "pending" }

db.orders.find({ status: "pending" }).sort({ createdAt: -1 });  // ✅ ব্যবহার করবে
db.orders.find({}).sort({ createdAt: -1 });                     // ❌ করবে না
// কারণ MongoDB জানে ইনডেক্সে সব ডকুমেন্ট নেই</code></pre>
      </div>
      <p>তাই কুয়েরিতে <strong>partial filter-এর শর্তটি স্পষ্টভাবে থাকতে হবে</strong> — নাহলে COLLSCAN হবে এবং আপনি বুঝতেই পারবেন না কেন ইনডেক্সটি অকেজো।</p>
      <h4>কেন Partial ব্যবহার করবেন</h4>
      <ul>
        <li><strong>ইনডেক্স আকার নাটকীয়ভাবে কমে:</strong> ১ কোটি অর্ডারের মধ্যে যদি মাত্র ৫০ হাজার "pending" থাকে, তবে partial index ২০০ গুণ ছোট — কম RAM, দ্রুত কুয়েরি, দ্রুত write।</li>
        <li><strong>Write পারফরম্যান্স:</strong> প্রতিটি ইনডেক্স প্রতিটি write-এ আপডেট করতে হয়। কম ডকুমেন্ট ইনডেক্স করা মানে কম কাজ।</li>
        <li><strong>Sparse-এর সব ক্ষমতা partial-এ আছে:</strong> <code>{ field: { $exists: true } }</code> দিলেই sparse-এর সমতুল্য। তাই নতুন কোডে partial-ই ব্যবহার করুন।</li>
      </ul>
      <p><strong>TTL-এর সাথেও কাজ করে:</strong> <code>expireAfterSeconds</code> + <code>partialFilterExpression</code> দিয়ে কেবল নির্দিষ্ট শর্তের ডকুমেন্ট স্বয়ংক্রিয়ভাবে মুছে ফেলা যায়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Partial index কি sort-এও কাজ করে?</li>
        <li>বিদ্যমান ইনডেক্সকে partial-এ রূপান্তর কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-19",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation","Pipeline","Optimizations"],
    question: "MongoDB Aggregation Pipeline: $match, $group, $project, $lookup, $unwind, $facet এবং Pipeline Optimization কী?",
    answer: `
      <p><strong>Aggregation Pipeline</strong> MongoDB-র বিশ্লেষণী ইঞ্জিন — ডকুমেন্টগুলো ধাপে ধাপে (stage) প্রবাহিত হয়, প্রতিটি ধাপ আগেরটির আউটপুট নিয়ে কাজ করে। ধারণাটি Unix পাইপের মতো।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.orders.aggregate([
  // ১. যত আগে সম্ভব ফিল্টার করুন — ইনডেক্স ব্যবহার করতে পারে
  { $match: { status: "completed", createdAt: { $gte: ISODate("2026-01-01") } } },

  // ২. অন্য কালেকশন থেকে যুক্ত করা (left outer join)
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
  }},
  { $unwind: "$user" },                    // অ্যারে থেকে একক অবজেক্টে

  // ৩. গ্রুপ ও গণনা
  { $group: {
      _id: "$user.city",
      totalRevenue: { $sum: "$amount" },
      orderCount:   { $sum: 1 },
      avgOrder:     { $avg: "$amount" }
  }},

  { $sort: { totalRevenue: -1 } },
  { $limit: 10 },

  // ৪. আউটপুট আকার দেওয়া
  { $project: { city: "$_id", totalRevenue: 1, orderCount: 1, _id: 0 } }
]);</code></pre>
      </div>
      <h4>Pipeline অপ্টিমাইজেশনের নিয়ম</h4>
      <ul>
        <li><strong><code>$match</code> সবার আগে রাখুন</strong> — এটিই সবচেয়ে গুরুত্বপূর্ণ নিয়ম। প্রথম stage হিসেবে থাকলে এটি <em>ইনডেক্স ব্যবহার করতে পারে</em>; <code>$group</code> বা <code>$lookup</code>-এর পরে থাকলে পারে না, কারণ তখন ডেটা আর মূল কালেকশনের নয়।</li>
        <li><strong><code>$project</code>/<code>$unset</code> আগে দিন</strong> — অপ্রয়োজনীয় ফিল্ড বাদ দিলে পরের stage-গুলোতে কম ডেটা প্রবাহিত হয়।</li>
        <li><strong><code>$sort</code> + <code>$limit</code> একসাথে রাখুন</strong> — MongoDB এটি শনাক্ত করে top-N অপ্টিমাইজেশন করে, পুরো সেট সাজায় না।</li>
        <li>MongoDB নিজেও কিছু অপ্টিমাইজেশন করে (যেমন <code>$sort</code>-এর পরের <code>$match</code> আগে সরিয়ে আনা), কিন্তু এর উপর ভরসা না করে নিজেই সঠিক ক্রমে লিখুন।</li>
      </ul>
      <h4>মেমরি সীমা — একটি বড় ফাঁদ</h4>
      <p>প্রতিটি stage সর্বোচ্চ <strong>১০০ MB</strong> মেমরি ব্যবহার করতে পারে। <code>$group</code> বা <code>$sort</code>-এ বড় ডেটাসেটে এই সীমা অতিক্রম হলে এরর আসে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.orders.aggregate(pipeline, { allowDiskUse: true });
// MongoDB 6.0+ এ ডিফল্টে চালু, কিন্তু এটি ধীর — মূল সমাধান নয়</code></pre>
      </div>
      <p><code>allowDiskUse</code> কাজ চালিয়ে দেয়, কিন্তু ডিস্কে স্পিল করা অনেক ধীর। আসল সমাধান — <code>$match</code> দিয়ে আগেই ডেটা কমানো।</p>
      <h4>দুটি বিশেষ stage</h4>
      <ul>
        <li><strong><code>$facet</code>:</strong> একই ইনপুটে একাধিক সাব-পাইপলাইন সমান্তরালে চালায় — একটি কুয়েরিতেই ফলাফল ও ফিল্টার-কাউন্ট দুটোই পাওয়া যায়।</li>
        <li><strong><code>$unwind</code>:</strong> অ্যারের প্রতিটি এলিমেন্টের জন্য আলাদা ডকুমেন্ট তৈরি করে। <strong>সতর্কতা:</strong> এটি ডকুমেন্ট সংখ্যা বহুগুণ বাড়িয়ে দেয় — ১০০ এলিমেন্টের অ্যারে মানে ১০০টি ডকুমেন্ট। বড় পাইপলাইনে এটি প্রধান পারফরম্যান্স সমস্যা।</li>
      </ul>
      <p><strong>ডিবাগিং:</strong> <code>db.orders.explain("executionStats").aggregate(pipeline)</code> দিয়ে দেখুন কোন stage কত সময় নিচ্ছে এবং <code>$match</code> ইনডেক্স ব্যবহার করছে কি না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>$lookup</code> কেন ব্যয়বহুল এবং কীভাবে এড়াবেন?</li>
        <li>Aggregation বনাম অ্যাপ্লিকেশনে প্রসেসিং — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "mongo-20",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Indexing","ESR Rule","Compound Index"],
    question: "MongoDB ESR Rule (Equality, Sort, Range) compound indexing বেস্ট প্র্যাকটিস কী?",
    answer: `
      <p><strong>ESR Rule</strong> (Equality, Sort, Range) compound index-এ ফিল্ডের ক্রম নির্ধারণের নিয়ম — এবং এটি MongoDB ইনডেক্সিংয়ের সবচেয়ে ব্যবহারিক নীতি।</p>
      <h4>নিয়মটি</h4>
      <p>Compound index-এ ফিল্ডগুলো এই ক্রমে রাখুন:</p>
      <ol>
        <li><strong>E — Equality:</strong> হুবহু মিলের ফিল্ড (<code>status: "active"</code>)</li>
        <li><strong>S — Sort:</strong> যে ফিল্ডে সাজানো হয় (<code>createdAt: -1</code>)</li>
        <li><strong>R — Range:</strong> রেঞ্জ শর্ত (<code>price: { $gte: 100 }</code>)</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// কুয়েরি
db.products.find({
  category: "electronics",              // Equality
  price: { $gte: 1000, $lte: 5000 }     // Range
}).sort({ createdAt: -1 });             // Sort

// ✅ সঠিক ইনডেক্স — ESR ক্রমে
db.products.createIndex({ category: 1, createdAt: -1, price: 1 });

// ❌ ভুল ক্রম — range মাঝখানে
db.products.createIndex({ category: 1, price: 1, createdAt: -1 });
// → MongoDB ইনডেক্স থেকে সাজানো ক্রম পাবে না,
//    মেমরিতে আলাদা করে sort করতে হবে (SORT stage)</code></pre>
      </div>
      <h4>কেন এই ক্রম</h4>
      <p>B-Tree ইনডেক্স একটি সাজানো কাঠামো। Equality শর্ত ইনডেক্সের একটি <em>নির্দিষ্ট অংশে</em> নিয়ে যায় — সেখানে বাকি ফিল্ডগুলো সাজানো অবস্থায় থাকে, তাই sort বিনামূল্যে পাওয়া যায়।</p>
      <p>কিন্তু <strong>range শর্ত ইনডেক্সের একটি বিস্তৃত অংশ স্ক্যান করে</strong>। সেই স্ক্যানের ভেতরে পরবর্তী ফিল্ডগুলো আর গ্লোবালি সাজানো থাকে না। তাই range-এর <em>পরে</em> sort ফিল্ড রাখলে ইনডেক্স sort-এ সাহায্য করতে পারে না — MongoDB-কে মেমরিতে সাজাতে হয়।</p>
      <h4>কীভাবে যাচাই করবেন</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.products.find({...}).sort({...}).explain("executionStats")

// দেখুন:
//   winningPlan.stage: "IXSCAN"  ✅  (COLLSCAN হলে ইনডেক্সই ব্যবহার হয়নি)
//   কোথাও "SORT" stage আছে কি?  ❌  থাকলে ইনডেক্স sort দিতে পারছে না
//   totalKeysExamined ≈ nReturned ✅  (অনেক বেশি হলে ইনডেক্স অদক্ষ)</code></pre>
      </div>
      <p><strong>মেমরি sort-এর সীমা:</strong> MongoDB মেমরিতে sort করতে সর্বোচ্চ <strong>৩২ MB</strong> ব্যবহার করতে পারে; অতিক্রম করলে কুয়েরি সম্পূর্ণ ব্যর্থ হয়। তাই ESR নিয়ম কেবল গতির নয়, <em>কার্যকারিতার</em>ও প্রশ্ন।</p>
      <h4>অন্যান্য ইনডেক্স নীতি</h4>
      <ul>
        <li><strong>Prefix নিয়ম:</strong> <code>{a:1, b:1, c:1}</code> ইনডেক্স <code>{a}</code>, <code>{a,b}</code>, <code>{a,b,c}</code> কুয়েরিতে কাজ করে — কিন্তু <code>{b}</code> বা <code>{b,c}</code>-তে নয়। তাই কম সংখ্যক, বিস্তৃত compound index বেশি কার্যকর।</li>
        <li><strong>Covered query:</strong> কুয়েরির সব ফিল্ড (filter, sort ও projection) ইনডেক্সে থাকলে MongoDB ডকুমেন্ট পড়েই না — অত্যন্ত দ্রুত। <code>_id: 0</code> দিতে ভুলবেন না।</li>
        <li><strong>Sort-এর দিক:</strong> <code>{a:1, b:-1}</code> ইনডেক্স <code>{a:1, b:-1}</code> এবং তার সম্পূর্ণ উল্টো <code>{a:-1, b:1}</code> — দুটোতেই কাজ করে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>অতিরিক্ত ইনডেক্স থাকার ক্ষতি কী?</li>
        <li>একই কালেকশনে কতগুলো ইনডেক্স যুক্তিসঙ্গত?</li>
      </ul>
    `
  },
  {
    id: "mongo-21",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Replication","Replica Sets","Oplog"],
    question: "MongoDB Replica Set Architecture: Primary Node, Secondary Nodes, Arbiter, Oplog, এবং Heartbeat Mechanism কী?",
    answer: `
      <p><strong>Replica set</strong> MongoDB-র high availability ব্যবস্থা — একই ডেটার একাধিক কপি, স্বয়ংক্রিয় failover সহ।</p>
      <pre class="mermaid">
flowchart TD
    C["Client / Driver"] -->|"সব write"| P["PRIMARY<br/>read + write"]
    P -->|"oplog রেপ্লিকেট"| S1["SECONDARY 1"]
    P -->|"oplog রেপ্লিকেট"| S2["SECONDARY 2"]
    P -.->|"heartbeat (2s)"| S1
    S1 -.->|"heartbeat"| S2
    P -->|"ব্যর্থ হলে"| X["❌"]
    X -.->|"নির্বাচন → নতুন PRIMARY"| S1
      </pre>
      <span class="diagram-caption">একটি primary, একাধিক secondary; primary গেলে নির্বাচন হয়</span>
      <h4>ভূমিকা</h4>
      <ul>
        <li><strong>Primary:</strong> সব write এখানে যায়। ডিফল্টে read-ও।</li>
        <li><strong>Secondary:</strong> primary-র oplog রিপ্লে করে ডেটা সিঙ্ক রাখে। <code>readPreference</code> দিলে read সার্ভ করতে পারে।</li>
        <li><strong>Arbiter:</strong> কোনো ডেটা রাখে না, শুধু নির্বাচনে ভোট দেয় — জোড় সংখ্যা এড়াতে।</li>
      </ul>
      <h4>Oplog — রেপ্লিকেশনের হৃদয়</h4>
      <p><code>local.oplog.rs</code> একটি <strong>capped collection</strong> যেখানে primary-র সব পরিবর্তন <em>idempotent</em> অপারেশন হিসেবে লেখা থাকে। Secondary এটি ক্রমাগত পড়ে নিজের কাছে প্রয়োগ করে।</p>
      <p><strong>Idempotent হওয়া অপরিহার্য:</strong> <code>{$inc: {count: 1}}</code> oplog-এ <code>{$set: {count: 42}}</code> হিসেবে লেখা হয় — তাই একই এন্ট্রি দুবার প্রয়োগ হলেও ফল একই থাকে।</p>
      <p><strong>Oplog window গুরুত্বপূর্ণ:</strong> oplog capped, তাই পুরনো এন্ট্রি মুছে যায়। একটি secondary যদি oplog window-র চেয়ে বেশি সময় পিছিয়ে পড়ে, সে আর ধরতে পারে না — <strong>সম্পূর্ণ initial sync</strong> লাগে (ঘণ্টার পর ঘণ্টা)। তাই oplog সাইজ পর্যবেক্ষণ করুন।</p>
      <h4>নির্বাচন প্রক্রিয়া</h4>
      <p>Secondary-রা প্রতি ২ সেকেন্ডে heartbeat পাঠায়। ১০ সেকেন্ড (<code>electionTimeoutMillis</code>) primary-র সাড়া না পেলে নির্বাচন শুরু হয়। <strong>সংখ্যাগরিষ্ঠতার ভোট</strong> পেলে একজন নতুন primary হয় — সাধারণত ১০-১২ সেকেন্ডে সম্পূর্ণ।</p>
      <p><strong>বিজোড় সংখ্যক ভোটদাতা রাখুন</strong> — নাহলে split-brain-এর ঝুঁকি বা নির্বাচনে অচলাবস্থা।</p>
      <h4>Arbiter নিয়ে সতর্কতা</h4>
      <p>Arbiter সস্তা মনে হলেও এটি ডেটার কোনো কপি রাখে না। ২ ডেটা নোড + ১ arbiter সেটআপে একটি ডেটা নোড হারালে <strong>ডেটার আর কোনো redundancy থাকে না</strong>, এবং <code>w: majority</code> write ব্লক হয়ে যেতে পারে। MongoDB এখন arbiter-এর বদলে <strong>৩টি পূর্ণ ডেটা নোড</strong> ব্যবহারের পরামর্শ দেয়।</p>
      <p><strong>Rollback:</strong> পুরনো primary যদি এমন write নিয়ে থাকে যা majority-তে পৌঁছায়নি, তবে ফিরে আসার সময় সেগুলো rollback হয়। <code>w: "majority"</code> ব্যবহার করলে এই ঝুঁকি দূর হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Replication lag কীভাবে মনিটর করবেন?</li>
        <li>Failover চলাকালে অ্যাপ্লিকেশনে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mongo-22",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Sharding","Shard Key","Jumbo Shards"],
    question: "MongoDB Sharding Architecture: Mongos Router, Config Server, Shards, এবং Shard Key (Hashed vs Ranged) নির্বাচনের নিয়ম কী?",
    answer: `
      <p><strong>Sharding</strong> MongoDB-র horizontal scaling — ডেটা একাধিক স্বাধীন replica set-এ (shard) ভাগ করা। এটি write throughput ও স্টোরেজ দুটোই স্কেল করে।</p>
      <pre class="mermaid">
flowchart TD
    A["Application"] --> M["mongos router<br/>(stateless)"]
    M --> CS[("Config Servers<br/>মেটাডেটা, chunk ম্যাপ")]
    M --> S1["Shard 1<br/>(replica set)"]
    M --> S2["Shard 2<br/>(replica set)"]
    M --> S3["Shard 3<br/>(replica set)"]
      </pre>
      <span class="diagram-caption">mongos জানে কোন chunk কোন shard-এ; ক্লায়েন্ট শুধু mongos-এর সাথে কথা বলে</span>
      <ul>
        <li><strong>mongos:</strong> stateless রাউটার — কুয়েরি সঠিক shard-এ পাঠায়, ফলাফল একত্র করে। একাধিক চালান (SPOF এড়াতে)।</li>
        <li><strong>Config server:</strong> নিজেই একটি replica set; chunk-to-shard ম্যাপিং রাখে। এটি হারালে ক্লাস্টার অচল।</li>
        <li><strong>Shard:</strong> প্রতিটি একটি সম্পূর্ণ replica set, ডেটার একটি উপসেট ধারণ করে।</li>
      </ul>
      <h4>Shard key — সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্ত</h4>
      <table>
        <tr><th>দিক</th><th>Ranged</th><th>Hashed</th></tr>
        <tr><td>বণ্টন</td><td>অসম হতে পারে</td><td><strong>সমান</strong></td></tr>
        <tr><td>Range query</td><td>✅ দক্ষ (একটি shard-এ)</td><td>❌ সব shard-এ যায়</td></tr>
        <tr><td>ক্রমিক কী (তারিখ, ObjectId)</td><td>❌ সব write একটি shard-এ (hotspot)</td><td>✅ ছড়িয়ে যায়</td></tr>
      </table>
      <p><strong>ক্লাসিক ভুল:</strong> <code>createdAt</code> বা <code>_id</code> (ObjectId) দিয়ে ranged sharding। এগুলো ক্রমবর্ধমান, তাই <em>সব নতুন write সর্বশেষ chunk-এ</em> যায় — অর্থাৎ একটি shard-এ। বাকি shard গুলো নিষ্ক্রিয় বসে থাকে, এবং sharding-এর পুরো উদ্দেশ্যই ব্যর্থ হয়।</p>
      <h4>ভালো shard key-র তিনটি গুণ</h4>
      <ul>
        <li><strong>উচ্চ cardinality:</strong> যথেষ্ট ভিন্ন মান, যাতে chunk ভাগ করা যায়।</li>
        <li><strong>কম ফ্রিকোয়েন্সি:</strong> কোনো একটি মান অসামঞ্জস্যপূর্ণভাবে বেশি নয়।</li>
        <li><strong>অ-একঘেয়ে পরিবর্তন:</strong> সময়ের সাথে ক্রমাগত বাড়ে না।</li>
      </ul>
      <p><strong>Compound shard key প্রায়ই সেরা সমাধান</strong> — যেমন <code>{ userId: 1, createdAt: 1 }</code>। এতে বণ্টন সমান হয় (userId-র কারণে) এবং একজন ইউজারের ডেটা একসাথে থাকে (locality)।</p>
      <h4>যে সীমাবদ্ধতাগুলো মানতে হবে</h4>
      <ul>
        <li><strong>Unique index শুধু shard key দিয়ে সম্ভব</strong> — অন্য ফিল্ডে গ্লোবাল uniqueness প্রয়োগ করা যায় না।</li>
        <li><strong>Shard key ছাড়া কুয়েরি = scatter-gather</strong> — সব shard-এ যায়, ধীর। কুয়েরি প্যাটার্ন দেখে shard key বাছুন।</li>
        <li><strong>MongoDB 5.0+ এ shard key বদলানো যায়</strong> (<code>reshardCollection</code>), কিন্তু এটি ব্যয়বহুল ও দীর্ঘ প্রক্রিয়া।</li>
      </ul>
      <p><strong>সবচেয়ে গুরুত্বপূর্ণ পরামর্শ:</strong> যত দেরিতে সম্ভব shard করুন। আগে ইনডেক্স অপ্টিমাইজেশন, ক্যাশিং, read replica ও vertical scaling শেষ করুন — sharding স্থায়ীভাবে অপারেশনাল জটিলতা যোগ করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Jumbo chunk কী এবং কীভাবে ঠিক করবেন?</li>
        <li>Balancer কখন চালানো উচিত?</li>
      </ul>
    `
  },
  {
    id: "mongo-23",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Transactions","ACID","WiredTiger"],
    question: "MongoDB Multi-Document ACID Transactions কীভাবে কাজ করে এবং কখন এটি এড়িয়ে যাওয়া উচিত?",
    answer: `
      <p>MongoDB 4.0 থেকে replica set-এ এবং 4.2 থেকে sharded ক্লাস্টারে <strong>multi-document ACID transaction</strong> সমর্থিত — একাধিক ডকুমেন্ট ও কালেকশনে অ্যাটমিক পরিবর্তন করা যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const session = client.startSession();
try {
  await session.withTransaction(async () => {
    await accounts.updateOne(
      { _id: fromId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { session }                          // ⚠️ প্রতিটি অপারেশনে session দিতেই হবে
    );
    await accounts.updateOne(
      { _id: toId }, { $inc: { balance: amount } }, { session }
    );
    await transfers.insertOne({ fromId, toId, amount }, { session });
  }, {
    readConcern:  { level: "majority" },
    writeConcern: { w: "majority" },
    maxCommitTimeMS: 5000
  });
} finally {
  await session.endSession();
}</code></pre>
      </div>
      <p><code>withTransaction</code> ব্যবহার করুন — এটি ক্ষণস্থায়ী এরর (<code>TransientTransactionError</code>) হলে স্বয়ংক্রিয়ভাবে পুনরায় চেষ্টা করে, যা ম্যানুয়ালি লিখতে গেলে সহজেই ভুল হয়।</p>
      <h4>কখন এড়িয়ে যাবেন — এটিই আসল প্রশ্ন</h4>
      <p>MongoDB-তে ট্রানজেকশন আছে বলেই সেটি SQL-এর মতো অবাধে ব্যবহার করা উচিত নয়। এর খরচ উল্লেখযোগ্য:</p>
      <ul>
        <li><strong>পারফরম্যান্স:</strong> ট্রানজেকশন WiredTiger-এ একটি snapshot ধরে রাখে ও লক নেয় — একক-ডকুমেন্ট অপারেশনের তুলনায় অনেক ধীর।</li>
        <li><strong>৬০ সেকেন্ড সীমা:</strong> ডিফল্টে একটি ট্রানজেকশন সর্বোচ্চ ৬০ সেকেন্ড চলতে পারে। দীর্ঘ ব্যাচ কাজ এতে চলবে না।</li>
        <li><strong>Write conflict:</strong> দুটি ট্রানজেকশন একই ডকুমেন্ট বদলাতে চাইলে একটি সাথে সাথে ব্যর্থ হয় (optimistic concurrency) — উচ্চ কনটেনশনে বারবার রিট্রাই।</li>
        <li><strong>Sharded ক্লাস্টারে আরও ব্যয়বহুল</strong> — একাধিক shard জুড়ে সমন্বয় করতে হয়।</li>
      </ul>
      <h4>বিকল্প — যা প্রায়ই ভালো</h4>
      <p><strong>MongoDB-তে একটি একক ডকুমেন্টের আপডেট সবসময়ই অ্যাটমিক</strong> — এটিই এর মূল শক্তি। ট্রানজেকশন লাগার প্রয়োজনটাই প্রায়ই একটি সংকেত যে <em>schema design ভুল</em>।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ট্রানজেকশন লাগছে — কারণ ডেটা আলাদা ডকুমেন্টে
// ✅ একসাথে বদলায় এমন ডেটা একসাথে রাখুন → ট্রানজেকশনই লাগে না
db.orders.updateOne(
  { _id: orderId, "items.sku": sku, "items.qty": { $gte: 1 } },
  { $inc: { "items.$.qty": -1, total: -price },
    $push: { history: { action: "item_removed", at: new Date() } } }
);
// একটি ডকুমেন্ট = একটি অ্যাটমিক অপারেশন</code></pre>
      </div>
      <p><strong>অন্যান্য বিকল্প:</strong> শর্তসাপেক্ষ আপডেট (<code>{ balance: { $gte: amount } }</code>) দিয়ে অনেক race condition সমাধান হয়; দীর্ঘ ব্যবসায়িক প্রক্রিয়ায় <strong>Saga pattern</strong> বা <strong>outbox pattern</strong> ট্রানজেকশনের চেয়ে উপযুক্ত।</p>
      <p><strong>নিয়ম:</strong> ট্রানজেকশন একটি নিরাপত্তা জাল — প্রথম পছন্দ নয়। আগে ডেটা মডেল ঠিক করার চেষ্টা করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Write conflict হলে অ্যাপ্লিকেশনে কী করবেন?</li>
        <li>Sharded ক্লাস্টারে ট্রানজেকশনের অতিরিক্ত সীমাবদ্ধতা কী?</li>
      </ul>
    `
  },
  {
    id: "mongo-24",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Schema Design","Embedding vs Referencing","Design"],
    question: "MongoDB Schema Design: Embedding (One-to-Few) vs Referencing (One-to-Many / One-to-Squillions) কখন কোনটি নির্বাচন করবেন?",
    answer: `
      <p>MongoDB-তে schema design-এর মূল সিদ্ধান্ত — সম্পর্কিত ডেটা <strong>embed</strong> করবেন (একই ডকুমেন্টে) নাকি <strong>reference</strong> করবেন (আলাদা কালেকশনে)।</p>
      <h4>মূল নীতি: "যা একসাথে অ্যাক্সেস হয়, তা একসাথে রাখুন"</h4>
      <p>SQL-এ normalization-এর নিয়ম শেখানো হয়। MongoDB-তে নিয়মটি ভিন্ন — <strong>ডেটা মডেল নির্ধারিত হয় কুয়েরি প্যাটার্ন দিয়ে</strong>, সম্পর্কের গঠন দিয়ে নয়।</p>
      <table>
        <tr><th>সম্পর্ক</th><th>কৌশল</th><th>উদাহরণ</th></tr>
        <tr><td><strong>One-to-Few</strong> (&lt;১০০)</td><td><strong>Embed</strong></td><td>ইউজারের ঠিকানা, পণ্যের ভ্যারিয়েন্ট</td></tr>
        <tr><td><strong>One-to-Many</strong> (শত-হাজার)</td><td>Reference, বা hybrid</td><td>পোস্টের কমেন্ট</td></tr>
        <tr><td><strong>One-to-Squillions</strong></td><td><strong>Reference</strong> (child-এ parent id)</td><td>সার্ভারের লগ এন্ট্রি</td></tr>
        <tr><td><strong>Many-to-Many</strong></td><td>দুই দিকে reference</td><td>ছাত্র ↔ কোর্স</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ✅ Embed — সবসময় একসাথে পড়া হয়, সীমিত সংখ্যা
{
  _id: 1, name: "রহিম",
  addresses: [
    { type: "home", city: "ঢাকা", street: "..." },
    { type: "office", city: "ঢাকা", street: "..." }
  ]
}
// একটি কুয়েরিতেই সব — কোনো join নেই

// ✅ Reference — অসীম বাড়তে পারে
// posts কালেকশন
{ _id: 101, title: "MongoDB গাইড", authorId: 1 }
// comments কালেকশন
{ _id: 501, postId: 101, text: "দারুণ!", userId: 7 }

// ✅ Hybrid — সাম্প্রতিক কিছু embed, বাকিটা reference
{
  _id: 101, title: "MongoDB গাইড",
  commentCount: 1543,
  recentComments: [ /* সর্বশেষ ৫টি — তালিকা পেজের জন্য */ ]
}</code></pre>
      </div>
      <h4>Embed-এর সীমা</h4>
      <ul>
        <li><strong>১৬ MB ডকুমেন্ট সীমা</strong> — অসীম বাড়তে পারে এমন অ্যারে কখনও embed করবেন না। এটিই সবচেয়ে বড় বিপদ।</li>
        <li><strong>অ্যারে বড় হলে আপডেট ধীর</strong> — ডকুমেন্ট বড় হয়ে গেলে MongoDB-কে সেটি নতুন জায়গায় সরাতে হতে পারে।</li>
        <li><strong>ডুপ্লিকেশন:</strong> embed করা ডেটা একাধিক জায়গায় থাকলে আপডেট করতে সব জায়গায় বদলাতে হয়।</li>
      </ul>
      <h4>ইচ্ছাকৃত denormalization</h4>
      <p>SQL-এ ডুপ্লিকেশন খারাপ; MongoDB-তে এটি প্রায়ই <em>সঠিক</em> পছন্দ। অর্ডারে গ্রাহকের নাম ও পণ্যের দাম কপি করে রাখা যুক্তিসঙ্গত — কারণ <strong>অর্ডারের সময়ের দামটিই ঐতিহাসিকভাবে সঠিক</strong>, বর্তমান দাম নয়। এটি join-ও বাঁচায়।</p>
      <p><strong>প্রশ্নটি করুন:</strong> "এই ডেটা কি বদলায়? বদলালে কি পুরনো কপি আপডেট হওয়া উচিত?" উত্তর "না" হলে denormalize করুন নির্দ্বিধায়।</p>
      <p><strong>MongoDB 5.0+ এ ট্রানজেকশন আছে</strong>, কিন্তু সেটির উপর নির্ভরতা কমাতে ডেটা এমনভাবে সাজান যাতে একটি ডকুমেন্টেই অ্যাটমিক আপডেট সম্ভব হয় — এটিই MongoDB-র শক্তি।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Embed করা ডেটা বদলালে সব জায়গায় কীভাবে আপডেট করবেন?</li>
        <li>Bucket pattern কী এবং কখন ব্যবহার করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-25",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Write Concern","Read Concern","Consistency"],
    question: "Write Concern (w: 1, w: majority, j: true) vs Read Concern (local, majority, linearizable) এর নিরাপত্তা ভূমিকা কী?",
    answer: `
      <p><strong>Write concern</strong> ও <strong>read concern</strong> MongoDB-তে ডেটা নিরাপত্তা ও পারফরম্যান্সের মধ্যে ভারসাম্য নিয়ন্ত্রণ করে।</p>
      <h4>Write Concern — লেখা কতটা নিশ্চিত</h4>
      <table>
        <tr><th>সেটিং</th><th>অর্থ</th><th>ঝুঁকি</th></tr>
        <tr><td><code>w: 0</code></td><td>কোনো নিশ্চয়তা নেই (fire and forget)</td><td>নীরবে ডেটা হারানো</td></tr>
        <tr><td><code>w: 1</code></td><td>primary লিখেছে</td><td>failover-এ rollback সম্ভব</td></tr>
        <tr><td><strong><code>w: "majority"</code></strong></td><td>সংখ্যাগরিষ্ঠ নোড লিখেছে</td><td><strong>নিরাপদ — ডিফল্ট (৫.০+)</strong></td></tr>
        <tr><td><code>j: true</code></td><td>ডিস্কের journal-এ লেখা হয়েছে</td><td>ধীর, কিন্তু ক্র্যাশ-নিরাপদ</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.orders.insertOne(doc, {
  writeConcern: { w: "majority", j: true, wtimeout: 5000 }
});
// ⚠️ wtimeout অবশ্যই দিন — নাহলে নোড ডাউন থাকলে অনির্দিষ্টকাল ঝুলে থাকবে</code></pre>
      </div>
      <p><strong><code>w: "majority"</code> কেন গুরুত্বপূর্ণ:</strong> <code>w: 1</code>-এ primary লেখা নিশ্চিত করেছে, কিন্তু secondary-তে পৌঁছানোর আগেই primary ক্র্যাশ করলে সেই write <strong>rollback</strong> হয়ে যাবে — অ্যাপ্লিকেশন সফল ভেবেছিল, অথচ ডেটা নেই। majority নিশ্চিত করে write টি নতুন primary-তেও থাকবে।</p>
      <h4>Read Concern — পড়া কতটা নির্ভরযোগ্য</h4>
      <ul>
        <li><strong><code>local</code></strong> (ডিফল্ট): নোডের সর্বশেষ ডেটা — এমন ডেটাও আসতে পারে যা পরে rollback হবে।</li>
        <li><strong><code>majority</code></strong>: কেবল সেই ডেটা যা সংখ্যাগরিষ্ঠে নিশ্চিত — <strong>কখনও rollback হবে না</strong>। সামান্য পিছিয়ে থাকতে পারে।</li>
        <li><strong><code>linearizable</code></strong>: সবচেয়ে কড়া, কিন্তু অত্যন্ত ধীর। কেবল একক ডকুমেন্ট রিডে, খুব বিরল প্রয়োজনে।</li>
      </ul>
      <h4>একটি সূক্ষ্ম কিন্তু গুরুত্বপূর্ণ বিষয়</h4>
      <p><strong><code>w: "majority"</code> একা যথেষ্ট নয়</strong> যদি আপনি secondary থেকে পড়েন। লেখা majority-তে নিশ্চিত হলেও, একটি পিছিয়ে থাকা secondary থেকে <code>readConcern: "local"</code> দিয়ে পড়লে পুরনো ডেটাই আসবে।</p>
      <p><strong>"read your own writes" নিশ্চিত করতে</strong> — হয় primary থেকে পড়ুন, নয়তো <code>readConcern: "majority"</code> ও causal consistency (session) ব্যবহার করুন।</p>
      <h4>ব্যবহারিক নির্দেশনা</h4>
      <ul>
        <li><strong>আর্থিক/ক্রিটিক্যাল ডেটা:</strong> <code>w: "majority", j: true</code> + primary থেকে read।</li>
        <li><strong>সাধারণ অ্যাপ্লিকেশন:</strong> ডিফল্ট (<code>w: "majority"</code>) যথেষ্ট।</li>
        <li><strong>লগ/অ্যানালিটিক্স:</strong> <code>w: 1</code> গ্রহণযোগ্য — গতি বেশি গুরুত্বপূর্ণ।</li>
        <li><strong>কখনও <code>w: 0</code> নয়</strong> যদি না ডেটা সম্পূর্ণ পরিত্যাজ্য হয়।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Rollback হলে সেই ডেটা কোথায় যায়?</li>
        <li>Causal consistency session কীভাবে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "mongo-26",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Performance","explain()","executionStats"],
    question: "MongoDB explain('executionStats') দিয়ে COLLSCAN vs IXSCAN সনাক্তকরণ কীভাবে করবেন?",
    answer: `
      <p><code>explain()</code> MongoDB কুয়েরি অপ্টিমাইজেশনের প্রধান টুল — এটি দেখায় কুয়েরি ইনডেক্স ব্যবহার করছে কি না এবং কতটা কাজ করছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.orders.find({ status: "pending", userId: 42 })
         .sort({ createdAt: -1 })
         .explain("executionStats");</code></pre>
      </div>
      <h4>যে তিনটি সংখ্যা সবচেয়ে গুরুত্বপূর্ণ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{
  executionStats: {
    nReturned: 10,                  // কতটি ডকুমেন্ট ফেরত গেল
    totalKeysExamined: 10,          // কতটি ইনডেক্স এন্ট্রি পড়া হলো
    totalDocsExamined: 10,          // কতটি ডকুমেন্ট পড়া হলো
    executionTimeMillis: 2
  }
}</code></pre>
      </div>
      <p><strong>আদর্শ অনুপাত:</strong> <code>nReturned ≈ totalKeysExamined ≈ totalDocsExamined</code></p>
      <ul>
        <li><strong><code>totalDocsExamined</code> ≫ <code>nReturned</code></strong> → ইনডেক্স যথেষ্ট নির্বাচনী নয়; অনেক ডকুমেন্ট পড়ে বেশিরভাগ ফেলে দেওয়া হচ্ছে।</li>
        <li><strong><code>totalDocsExamined = 0</code></strong> → 🎉 <strong>Covered query</strong> — সব তথ্য ইনডেক্সেই পাওয়া গেছে, ডকুমেন্ট পড়তেই হয়নি। এটিই সর্বোত্তম।</li>
        <li><strong><code>totalKeysExamined = 0</code> এবং <code>totalDocsExamined</code> বিশাল</strong> → COLLSCAN, কোনো ইনডেক্সই ব্যবহার হয়নি।</li>
      </ul>
      <h4>Stage-গুলো পড়া</h4>
      <table>
        <tr><th>Stage</th><th>অর্থ</th></tr>
        <tr><td><strong>COLLSCAN</strong></td><td>❌ পুরো কালেকশন স্ক্যান — ইনডেক্স যোগ করুন</td></tr>
        <tr><td><strong>IXSCAN</strong></td><td>✅ ইনডেক্স ব্যবহৃত</td></tr>
        <tr><td><strong>FETCH</strong></td><td>ইনডেক্স থেকে ডকুমেন্ট আনা হচ্ছে (স্বাভাবিক)</td></tr>
        <tr><td><strong>SORT</strong></td><td>⚠️ মেমরিতে সাজানো হচ্ছে — ইনডেক্স sort দিতে পারছে না</td></tr>
        <tr><td><strong>PROJECTION_COVERED</strong></td><td>✅ Covered query</td></tr>
      </table>
      <p><strong><code>SORT</code> stage বিশেষভাবে খারাপ</strong> — এটি মেমরিতে ৩২ MB সীমার মধ্যে কাজ করে, অতিক্রম করলে কুয়েরি সম্পূর্ণ ব্যর্থ হয়। ESR নিয়ম মেনে ইনডেক্স বানালে এই stage-টি থাকে না।</p>
      <h4>Verbosity মোড</h4>
      <ul>
        <li><code>"queryPlanner"</code> (ডিফল্ট) — শুধু পরিকল্পনা, কুয়েরি চালায় না।</li>
        <li><code>"executionStats"</code> — কুয়েরি চালিয়ে প্রকৃত সংখ্যা দেয়। <strong>সাধারণত এটিই ব্যবহার করুন।</strong></li>
        <li><code>"allPlansExecution"</code> — বিবেচিত সব পরিকল্পনার তুলনা; MongoDB কেন একটি ইনডেক্স বাছল তা বুঝতে।</li>
      </ul>
      <h4>প্রোডাকশনে ধীর কুয়েরি খোঁজা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.setProfilingLevel(1, { slowms: 100 });   // ১০০ms এর বেশি লগ করো
db.system.profile.find().sort({ ts: -1 }).limit(10);

// COLLSCAN হওয়া কুয়েরি খুঁজুন
db.system.profile.find({ "planSummary": "COLLSCAN" });</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Covered query পেতে কী কী শর্ত পূরণ করতে হয়?</li>
        <li>MongoDB একাধিক ইনডেক্সের মধ্যে কীভাবে বাছাই করে?</li>
      </ul>
    `
  },
  {
    id: "mongo-27",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Storage","WiredTiger","Cache"],
    question: "WiredTiger Storage Engine: Cache Management, Snappy Compression, এবং Eviction Policy কী?",
    answer: `
      <p>WiredTiger-এর দুটি মূল প্রক্রিয়া — <strong>cache management</strong> ও <strong>eviction</strong> — একসাথে ঠিক করে দেয় MongoDB কতটা মেমরি ব্যবহার করবে এবং কখন ডেটা ডিস্কে পাঠাবে।</p>
      <h4>Cache Management</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ডিফল্ট: max(50% of (RAM - 1GB), 256MB)
storage.wiredTiger.engineConfig.cacheSizeGB: 8

db.serverStatus().wiredTiger.cache
// "bytes currently in the cache"
// "maximum bytes configured"
// "tracked dirty bytes in the cache"        ← এখনও ডিস্কে লেখা হয়নি
// "pages evicted by application threads"    ← ⚠️ শূন্যের বেশি = সমস্যা</code></pre>
      </div>
      <p>ক্যাশে ডেটা <strong>আন-কম্প্রেসড</strong> অবস্থায় থাকে, ডিস্কে থাকে <strong>কম্প্রেসড</strong>। তাই ৫০% RAM ছেড়ে দেওয়া হয় OS-এর file system cache-এর জন্য, যা কম্প্রেসড ব্লক ধরে রাখে — কার্যত দুই স্তরের ক্যাশিং।</p>
      <h4>Snappy Compression</h4>
      <p>WiredTiger ডিফল্টে <strong>Snappy</strong> ব্যবহার করে ডিস্কে ডেটা কম্প্রেস করতে — গতি ও কম্প্রেশন অনুপাতের ভালো ভারসাম্য।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.createCollection("logs", {
  storageEngine: { wiredTiger: {
    configString: "block_compressor=zstd"    // snappy | zlib | zstd | none
  }}
});</code></pre>
      </div>
      <table>
        <tr><th>অ্যালগরিদম</th><th>কম্প্রেশন</th><th>CPU</th><th>কখন</th></tr>
        <tr><td>snappy (ডিফল্ট)</td><td>মাঝারি</td><td>খুব কম</td><td>সাধারণ ব্যবহার</td></tr>
        <tr><td>zstd</td><td>ভালো</td><td>কম</td><td>MongoDB 4.2+, প্রায়ই সেরা পছন্দ</td></tr>
        <tr><td>zlib</td><td>সর্বোচ্চ</td><td>বেশি</td><td>স্টোরেজ সবচেয়ে গুরুত্বপূর্ণ হলে</td></tr>
        <tr><td>none</td><td>—</td><td>—</td><td>ইতিমধ্যে কম্প্রেসড ডেটা</td></tr>
      </table>
      <h4>Eviction Policy — যখন ক্যাশ পূর্ণ হয়</h4>
      <p>ক্যাশ একটি নির্দিষ্ট থ্রেশহোল্ডে (ডিফল্ট ৮০%) পৌঁছালে WiredTiger ব্যাকগ্রাউন্ড থ্রেড দিয়ে পুরনো/অপরিবর্তিত পেজ সরিয়ে জায়গা খালি করে। এটি স্বাভাবিক ও প্রত্যাশিত।</p>
      <p><strong>সমস্যা তখনই হয়</strong> যখন write এত দ্রুত আসে যে ব্যাকগ্রাউন্ড eviction পেরে ওঠে না — তখন <strong>ইউজারের কুয়েরি থ্রেডকেই</strong> জায়গা খালি করতে বাধ্য করা হয় ("application thread eviction")। এতে সেই থ্রেডের latency নাটকীয়ভাবে বেড়ে যায়।</p>
      <p><code>"pages evicted by application threads"</code> ক্রমাগত বাড়তে থাকলে এর অর্থ ক্যাশ ওয়ার্কিং সেটের তুলনায় ছোট। সমাধান: cache বাড়ান, ইনডেক্স/প্রশ্ন অপ্টিমাইজ করুন যাতে কম ডেটা স্পর্শ করতে হয়, অথবা shard করে ওয়ার্কিং সেট ছড়িয়ে দিন।</p>
      <h4>Dirty bytes ও checkpoint</h4>
      <p>WiredTiger প্রতি ৬০ সেকেন্ডে (বা ২ GB dirty ডেটা জমলে) একটি <strong>checkpoint</strong> নেয় — যা মেমরির সব পরিবর্তন ডিস্কে স্থায়ীভাবে লেখে। এটি এবং durability-র জন্য journal (WAL) — দুটি ভিন্ন প্রক্রিয়া, একসাথে কাজ করে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Cache size বাড়ালে কি সবসময় পারফরম্যান্স বাড়ে?</li>
        <li>Checkpoint চলাকালে write ব্লক হয় কি?</li>
      </ul>
    `
  },
  {
    id: "mongo-28",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing","TTL Index","Partial Index"],
    question: "MongoDB TTL Index (expireAfterSeconds) এবং Partial Index (partialFilterExpression) কীভাবে ব্যবহার করবেন?",
    answer: `
      <p><strong>TTL index</strong> নির্দিষ্ট সময় পর ডকুমেন্ট <em>স্বয়ংক্রিয়ভাবে</em> মুছে ফেলে — সেশন, ক্যাশ, লগ ও অস্থায়ী ডেটার জন্য অত্যন্ত কার্যকর।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// createdAt-এর ২৪ ঘণ্টা পর মুছে যাবে
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// প্রতি-ডকুমেন্ট মেয়াদ — expireAfterSeconds: 0 দিয়ে
db.tokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
db.tokens.insertOne({
  token: "abc",
  expiresAt: new Date(Date.now() + 3600000)   // এই সময়েই মুছবে
});

// TTL + partial — শুধু নির্দিষ্ট শর্তে মুছুন
db.events.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 604800,
    partialFilterExpression: { archived: false } }
);</code></pre>
      </div>
      <h4>যা অবশ্যই জানতে হবে</h4>
      <ul>
        <li><strong>ফিল্ডটি অবশ্যই <code>Date</code> টাইপ হতে হবে</strong> — স্ট্রিং বা সংখ্যা হলে TTL নীরবে <em>কাজ করবে না</em>, কোনো এরর ছাড়াই। এটি সবচেয়ে সাধারণ বাগ।</li>
        <li><strong>মোছা তাৎক্ষণিক নয়:</strong> একটি ব্যাকগ্রাউন্ড থ্রেড <strong>প্রতি ৬০ সেকেন্ডে</strong> চলে। তাই ডকুমেন্ট তার মেয়াদের পরেও ১ মিনিট পর্যন্ত (বা লোড বেশি হলে আরও বেশি) থাকতে পারে। <strong>নিরাপত্তার জন্য TTL-এর উপর নির্ভর করবেন না</strong> — টোকেন যাচাইয়ের সময় মেয়াদ কোডেও পরীক্ষা করুন।</li>
        <li><strong>Compound index-এ TTL কাজ করে না</strong> — কেবল একক-ফিল্ড ইনডেক্সে।</li>
        <li><strong>Secondary-তে TTL মোছে না</strong> — primary মুছে oplog-এ delete পাঠায়, secondary সেটি প্রয়োগ করে। এতে ধারাবাহিকতা বজায় থাকে।</li>
        <li><strong>মোছা ক্লাস্টারে চাপ ফেলে</strong> — বিপুল সংখ্যক ডকুমেন্ট একসাথে মেয়াদোত্তীর্ণ হলে I/O স্পাইক হতে পারে।</li>
      </ul>
      <h4><code>expireAfterSeconds</code> বদলানো</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.runCommand({
  collMod: "sessions",
  index: { keyPattern: { createdAt: 1 }, expireAfterSeconds: 172800 }
});
// ইনডেক্স মুছে আবার বানাতে হয় না</code></pre>
      </div>
      <h4>বিকল্প: Capped collection</h4>
      <p>TTL সময়-ভিত্তিক; <strong>capped collection</strong> আকার-ভিত্তিক (নির্দিষ্ট সাইজে পৌঁছালে সবচেয়ে পুরনোটি বাদ)। লগে "শেষ ১ GB রাখো" ধরনের নিয়মে capped ভালো, "৭ দিনের পুরনো মুছে ফেলো" নিয়মে TTL।</p>
      <p><strong>বাস্তব ব্যবহার:</strong> সেশন, OTP, পাসওয়ার্ড রিসেট টোকেন, রেট-লিমিট রেকর্ড, অস্থায়ী আপলোড, অ্যানালিটিক্স ইভেন্ট — এসবে TTL রাখলে ম্যানুয়াল ক্লিনআপ জব লেখার দরকারই পড়ে না।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>TTL কাজ করছে না — কী কী পরীক্ষা করবেন?</li>
        <li>বিপুল ডেটা একসাথে মেয়াদোত্তীর্ণ হলে কী সমস্যা?</li>
      </ul>
    `
  },
  {
    id: "mongo-29",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Search","Atlas Search","Lucene"],
    question: "MongoDB Atlas Search ($search) এবং Apache Lucene Integration কীভাবে কাজ করে?",
    answer: `
      <p><strong>Atlas Search</strong> MongoDB Atlas-এ বিল্ট-ইন একটি ফুল-টেক্সট সার্চ ইঞ্জিন — ভেতরে <strong>Apache Lucene</strong> ব্যবহার করে (Elasticsearch-এর একই ভিত্তি), কিন্তু আপনার কালেকশনের ডেটার সাথে স্বয়ংক্রিয়ভাবে সিঙ্ক থাকে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Atlas UI বা API দিয়ে সার্চ ইনডেক্স সংজ্ঞায়িত করুন
{
  "mappings": { "dynamic": false, "fields": {
    "title": { "type": "string", "analyzer": "lucene.standard" },
    "price": { "type": "number" },
    "category": { "type": "stringFacet" }
  }}
}

// $search stage দিয়ে কুয়েরি — aggregation pipeline-এর অংশ
db.products.aggregate([
  { $search: {
      index: "default",
      compound: {
        must: [{ text: { query: "wireless headphones", path: "title" } }],
        filter: [{ range: { path: "price", gte: 1000, lte: 5000 } }]
      }
  }},
  { $limit: 20 },
  { $project: { title: 1, price: 1, score: { $meta: "searchScore" } } }
]);</code></pre>
      </div>
      <h4>Elasticsearch-এর তুলনায় মূল সুবিধা</h4>
      <p><strong>কোনো CDC বা dual-write পাইপলাইন লাগে না।</strong> Atlas Search ভেতরে <em>একই oplog</em> পড়ে যা রেপ্লিকেশনে ব্যবহৃত হয় — তাই আপনার MongoDB কালেকশনে write করলেই সার্চ ইনডেক্স স্বয়ংক্রিয়ভাবে (near real-time) আপডেট হয়।</p>
      <p>Elasticsearch ব্যবহার করলে আলাদা ক্লাস্টার, ডেটা সিঙ্ক পাইপলাইন (Debezium/CDC বা dual-write) এবং দুটি সিস্টেমের সামঞ্জস্য বজায় রাখতে হতো — Atlas Search এই পুরো জটিলতা দূর করে।</p>
      <h4>ক্ষমতা</h4>
      <ul>
        <li>ফুল-টেক্সট সার্চ, fuzzy matching, autocomplete, highlighting — Elasticsearch-এর মতোই।</li>
        <li><strong>Facet</strong> (<code>$searchMeta</code>) — সাইডবার ফিল্টারের গণনা।</li>
        <li><strong>Vector search</strong> (<code>$vectorSearch</code>) — RAG ও সিমান্টিক সার্চের জন্য।</li>
        <li>একই aggregation pipeline-এ <code>$search</code>-এর পর <code>$lookup</code>, <code>$group</code> ইত্যাদি ব্যবহার করা যায় — টেক্সট সার্চ ও সাধারণ ডেটাবেজ অপারেশন এক জায়গায়।</li>
      </ul>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>শুধু MongoDB Atlas-এ পাওয়া যায়</strong> — স্ব-হোস্ট করা MongoDB-তে নেই (Atlas-এর বাইরে চালাতে Community Edition + Search-এর জন্য আলাদা সেটআপ লাগে)।</li>
        <li>Elasticsearch-এর মতো গভীর কাস্টমাইজেশন (কাস্টম analyzer plugin, জটিল স্কোরিং ফাংশন) কম নমনীয়।</li>
        <li>খুব উচ্চ থ্রুপুট সার্চ-নিবিড় ওয়ার্কলোডে ডেডিকেটেড Elasticsearch ক্লাস্টার এখনও বেশি স্কেলযোগ্য।</li>
      </ul>
      <p><strong>সিদ্ধান্ত:</strong> MongoDB Atlas ব্যবহার করলে এবং সার্চ প্রধান ফোকাস না হলে, Atlas Search প্রায়ই সেরা পছন্দ — অপারেশনাল জটিলতা নাটকীয়ভাবে কমায়। সার্চ-ই যদি পণ্যের মূল অংশ হয় (যেমন একটি সার্চ ইঞ্জিন কোম্পানি), তবে ডেডিকেটেড Elasticsearch বিবেচনা করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Atlas Search-এর ইনডেক্সিং ল্যাগ কতটা?</li>
        <li>$search ও সাধারণ $text-এর পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "mongo-30",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Change Streams","Real-time","Oplog"],
    question: "MongoDB Change Streams (watch()) দিয়ে রিয়েল-টাইম ডাটাবেজ ইভেন্ট ট্র্যাকিং কীভাবে করবেন?",
    answer: `
      <p><code>watch()</code> মেথড change stream খোলে — ডাটাবেজে ঘটা প্রতিটি পরিবর্তন রিয়েল-টাইমে অ্যাপ্লিকেশনে পৌঁছে দেয়, কোনো polling ছাড়াই।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// কালেকশন, ডাটাবেজ, বা পুরো ক্লাস্টার — যেকোনো স্তরে watch করা যায়
const changeStream = db.collection('orders').watch([
  { $match: { operationType: { $in: ["insert", "update"] } } }
], { fullDocument: "updateLookup" });

changeStream.on('change', async (event) => {
  switch (event.operationType) {
    case 'insert':
      await notifyNewOrder(event.fullDocument);
      break;
    case 'update':
      await syncToSearchIndex(event.documentKey._id, event.fullDocument);
      break;
  }
  await saveResumeToken(event._id);      // ⚠️ প্রতিটি ইভেন্টের পর সংরক্ষণ করুন
});

changeStream.on('error', (err) => reconnectWithResumeToken());</code></pre>
      </div>
      <h4>Resume token — নির্ভরযোগ্যতার চাবি</h4>
      <p>প্রতিটি ইভেন্টে একটি অনন্য <code>_id</code> (resume token) থাকে। অ্যাপ্লিকেশন ক্র্যাশ করলে বা ডিপ্লয় হলে, সংরক্ষিত token দিয়ে <strong>ঠিক যেখানে থেমেছিল সেখান থেকে</strong> আবার শুরু করা যায় — একটিও ইভেন্ট মিস না করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const savedToken = await loadResumeToken();
const changeStream = db.collection('orders').watch([], {
  resumeAfter: savedToken   // পুরনো token না থাকলে বাদ দিন
});</code></pre>
      </div>
      <p><strong>Token সংরক্ষণ না করলে</strong> রিস্টার্টে বর্তমান মুহূর্ত থেকে শুরু হবে — বন্ধ থাকাকালীন সব পরিবর্তন হারিয়ে যাবে। এটি সবচেয়ে সাধারণ ও গুরুতর বাগ।</p>
      <h4>ভেতরে কী ঘটে</h4>
      <p>Change stream oplog পড়ে — তাই <strong>replica set বা sharded ক্লাস্টার আবশ্যক</strong> (একক নোডে কাজ করে না)। এটি একটি টেইলিং কার্সার হিসেবে কাজ করে, MongoDB নিজের রেপ্লিকেশনেই যে প্রক্রিয়া ব্যবহার করে সেটিই এখানে এক্সপোজ করা হয়।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <ul>
        <li><strong>Cache invalidation:</strong> কোনো ডকুমেন্ট বদলালেই সাথে সাথে Redis কী মুছে ফেলা — TTL-এর অপেক্ষা না করে।</li>
        <li><strong>Search index সিঙ্ক:</strong> MongoDB → Elasticsearch/Atlas Search, dual write ছাড়াই।</li>
        <li><strong>WebSocket-এর মাধ্যমে UI আপডেট:</strong> ড্যাশবোর্ড লাইভ ডেটা দেখানো।</li>
        <li><strong>Materialized view রক্ষণাবেক্ষণ:</strong> একটি সমষ্টিগত view স্বয়ংক্রিয়ভাবে আপডেট রাখা।</li>
      </ul>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>একাধিক কনজিউমার প্রত্যেকে সব ইভেন্ট পায়</strong> — Kafka-র consumer group-এর মতো কাজ ভাগাভাগি নেই।</li>
        <li><strong>Oplog window শেষ হয়ে গেলে</strong> (দীর্ঘদিন বন্ধ থাকলে) resume token অকেজো হয় — সম্পূর্ণ resync লাগে।</li>
        <li><strong>Delete ইভেন্টে সম্পূর্ণ ডকুমেন্ট থাকে না</strong>, শুধু <code>_id</code> — <code>fullDocumentBeforeChange</code> (6.0+, pre-image চালু থাকলে) লাগে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>একাধিক অ্যাপ্লিকেশন ইনস্ট্যান্স একই change stream শোনা মানে কী হবে?</li>
        <li>Change stream ও Kafka-র মাধ্যমে event streaming — কখন কোনটি?</li>
      </ul>
    `
  },
  {
    id: "mongo-31",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Security","FLE","Encryption"],
    question: "MongoDB Client-Side Field Level Encryption (CSFLE) দিয়ে সংবেদনশীল ডেটা এনক্রিপশন কীভাবে করবেন?",
    answer: `
      <p><strong>CSFLE (Client-Side Field Level Encryption)</strong> সংবেদনশীল ডেটা <strong>ক্লায়েন্টে, MongoDB-তে পাঠানোর আগেই</strong> এনক্রিপ্ট করে। ফলে সার্ভার — এমনকি MongoDB Atlas-ও — কখনও প্লেইনটেক্সট দেখে না।</p>
      <pre class="mermaid">
flowchart LR
    A["অ্যাপ্লিকেশন"] -->|"১. ফিল্ড এনক্রিপ্ট করে<br/>(লোকাল বা KMS কী দিয়ে)"| E["এনক্রিপ্টেড বাইনারি"]
    E -->|"২. সার্ভারে পাঠানো"| DB[("MongoDB<br/>প্লেইনটেক্সট কখনও দেখে না")]
    DB -->|"৩. এনক্রিপ্টেড ডেটা ফেরত"| A
    A -->|"৪. ক্লায়েন্টেই ডিক্রিপ্ট"| P["মূল মান"]
      </pre>
      <span class="diagram-caption">এনক্রিপশন/ডিক্রিপশন সম্পূর্ণ ক্লায়েন্টে — সার্ভার শুধু বাইট সংরক্ষণ করে</span>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const schemaMap = {
  "myapp.patients": {
    bsonType: "object",
    properties: {
      ssn: {
        encrypt: {
          bsonType: "string",
          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",  // সার্চযোগ্য
          keyId: [dataKeyId]
        }
      },
      diagnosis: {
        encrypt: {
          bsonType: "string",
          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random"           // সবচেয়ে নিরাপদ
        }
      }
    }
  }
};

const client = new MongoClient(uri, {
  autoEncryption: { keyVaultNamespace: "encryption.__keyVault",
                     kmsProviders: { aws: { accessKeyId, secretAccessKey } },
                     schemaMap }
});
// এরপর সাধারণ insert/find কল — এনক্রিপশন স্বচ্ছভাবে ঘটে</code></pre>
      </div>
      <h4>Deterministic বনাম Random এনক্রিপশন</h4>
      <table>
        <tr><th>মোড</th><th>আচরণ</th><th>সীমাবদ্ধতা</th></tr>
        <tr><td><strong>Deterministic</strong></td><td>একই ইনপুট → একই সাইফারটেক্সট</td><td>Equality কুয়েরি সম্ভব; কিন্তু ফ্রিকোয়েন্সি বিশ্লেষণে দুর্বল</td></tr>
        <tr><td><strong>Random</strong></td><td>একই ইনপুটেও প্রতিবার ভিন্ন সাইফারটেক্সট</td><td>সবচেয়ে নিরাপদ, কিন্তু <strong>কুয়েরি করা যায় না</strong></td></tr>
      </table>
      <p><strong>Deterministic মোড ব্যবহার করুন কেবল</strong> সেই ফিল্ডে যেখানে হুবহু মিল দিয়ে খুঁজতে হবে (যেমন SSN দিয়ে রোগী খোঁজা)। বাকি সব সংবেদনশীল ফিল্ডে Random ব্যবহার করুন — সর্বোচ্চ নিরাপত্তার জন্য।</p>
      <h4>কেন এটি গুরুত্বপূর্ণ</h4>
      <ul>
        <li><strong>ডাটাবেজ আপস হলেও ডেটা নিরাপদ:</strong> কেউ MongoDB সার্ভার বা ব্যাকআপ ফাইল চুরি করলেও এনক্রিপ্টেড বাইট ছাড়া কিছু পাবে না।</li>
        <li><strong>DBA-ও দেখতে পারেন না:</strong> এমনকি অ্যাডমিন অ্যাক্সেস থাকলেও প্লেইনটেক্সট সার্ভারে কখনও থাকে না — এটি কমপ্লায়েন্সে (HIPAA, PCI-DSS) গুরুত্বপূর্ণ।</li>
        <li><strong>নেটওয়ার্কেও সুরক্ষিত:</strong> TLS ছাড়াও অতিরিক্ত স্তর।</li>
      </ul>
      <h4>সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>এনক্রিপ্টেড ফিল্ডে রেঞ্জ কুয়েরি, sort বা aggregation সীমিত</strong> (MongoDB 6.0+ থেকে queryable encryption দিয়ে কিছু সম্প্রসারিত হয়েছে, তবে এখনও সাধারণ ফিল্ডের চেয়ে সীমিত)।</li>
        <li><strong>Key ব্যবস্থাপনা জটিল:</strong> KMS (AWS KMS, Azure Key Vault, GCP KMS) সেটআপ ও key rotation নিজে সামলাতে হয়।</li>
        <li><strong>পারফরম্যান্স খরচ:</strong> প্রতিটি এনক্রিপ্ট/ডিক্রিপ্ট অপারেশনে CPU সময় যায়।</li>
        <li><strong>শুধু নির্দিষ্ট ড্রাইভার সংস্করণে সমর্থিত</strong> এবং <code>mongocryptd</code> বা crypt shared library প্রয়োজন।</li>
      </ul>
      <p><strong>ব্যবহারিক নিয়ম:</strong> সব ফিল্ড এনক্রিপ্ট করবেন না — শুধু সত্যিকারের সংবেদনশীল ডেটা (SSN, ক্রেডিট কার্ড, স্বাস্থ্য তথ্য)। সাধারণ ফিল্ড এনক্রিপ্ট করলে কুয়েরি ক্ষমতা ও পারফরম্যান্স অনাবশ্যকভাবে ক্ষতিগ্রস্ত হয়।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Queryable encryption (6.0+) কীভাবে রেঞ্জ কুয়েরি সম্ভব করে?</li>
        <li>KMS কী হারিয়ে গেলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mongo-32",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Schema Validation","JSON Schema","validator"],
    question: "MongoDB Schema Validation ($jsonSchema) দিয়ে ডাইনামিক ডকুমেন্টে কড়া টাইপ ডিফাইন কীভাবে করবেন?",
    answer: `
      <p>MongoDB ডিফল্টভাবে schema-less — যেকোনো আকারের ডকুমেন্ট ঢুকে যেতে পারে। <strong>$jsonSchema validator</strong> দিয়ে ডাটাবেজ স্তরেই কড়া নিয়ম আরোপ করা যায়, যাতে অ্যাপ্লিকেশনের বাগ বা ভুল স্ক্রিপ্ট খারাপ ডেটা ঢোকাতে না পারে।</p>
      <h4>গুরুত্বপূর্ণ বিষয়</h4>
      <ul>
        <li><strong><code>validationLevel</code>:</strong> <code>strict</code> (ডিফল্ট) সব insert ও update-এ নিয়ম প্রয়োগ করে; <code>moderate</code> কেবল <em>ইতিমধ্যে বৈধ</em> ডকুমেন্টে প্রয়োগ করে — পুরনো ডেটা থাকা কালেকশনে ধাপে ধাপে মাইগ্রেশনের জন্য উপযোগী।</li>
        <li><strong><code>validationAction</code>:</strong> <code>error</code> অবৈধ লেখা আটকে দেয়; <code>warn</code> কেবল লগে লেখে — নতুন নিয়ম চালুর আগে কতটা ডেটা ভাঙবে তা যাচাই করতে দারুণ।</li>
        <li>বিদ্যমান কালেকশনে নিয়ম যোগ করতে <code>collMod</code> ব্যবহার করুন।</li>
        <li>Validator পুরনো ডকুমেন্টকে <em>পূর্ববর্তীভাবে</em> যাচাই করে না — শুধু নতুন লেখায় প্রযোজ্য।</li>
      </ul>
      <p><strong>মনে রাখবেন:</strong> এটি Mongoose-এর মতো অ্যাপ্লিকেশন-স্তরের ভ্যালিডেশনের বিকল্প নয়, বরং শেষ রক্ষাকবচ — কারণ mongo shell বা অন্য সার্ভিস থেকেও ডেটা ঢুকতে পারে।</p>
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
    tags: ["Time Series","Collections","Bucketing"],
    question: "MongoDB Time Series Collections এবং Internal Bucketing Pattern কীভাবে IoT / Metrics ডাটা অপটিমাইজ করে?",
    answer: `
      <p>MongoDB 5.0 থেকে <strong>Time Series Collection</strong> যুক্ত হয়েছে — IoT সেন্সর, মেট্রিক ও যেকোনো সময়-ক্রমিক ডেটার জন্য বিশেষভাবে অপ্টিমাইজ করা।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.createCollection("sensor_readings", {
  timeseries: {
    timeField: "timestamp",        // আবশ্যক
    metaField: "sensorId",         // যা বদলায় না — গুচ্ছবদ্ধ করার কী
    granularity: "minutes"         // seconds | minutes | hours
  },
  expireAfterSeconds: 2592000      // ৩০ দিন পর স্বয়ংক্রিয় মোছা
});

db.sensor_readings.insertOne({
  timestamp: new Date(),
  sensorId: { deviceId: "d-42", location: "ঢাকা" },   // metaField
  temperature: 31.5,
  humidity: 78
});</code></pre>
      </div>
      <h4>Internal Bucketing — মূল কৌশল</h4>
      <p>ভেতরে MongoDB প্রতিটি রিডিং আলাদা ডকুমেন্ট হিসেবে রাখে না। বরং <strong>একই <code>metaField</code> ও কাছাকাছি সময়ের রিডিংগুলো একটি "bucket" ডকুমেন্টে গুচ্ছবদ্ধ করে</strong> — কলাম-ভিত্তিক আকারে।</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>আপনি যা দেখেন (৩টি ডকুমেন্ট):
  { timestamp: 10:00, sensorId: d-42, temperature: 31.5 }
  { timestamp: 10:01, sensorId: d-42, temperature: 31.6 }
  { timestamp: 10:02, sensorId: d-42, temperature: 31.4 }

ভেতরে যা সংরক্ষিত হয় (১টি bucket):
  { _id: ..., meta: { deviceId: "d-42" },
    control: { min/max timestamp },
    data: { timestamp: [10:00, 10:01, 10:02],
            temperature: [31.5, 31.6, 31.4] } }</code></pre>
      </div>
      <h4>এর ফলে যা পাওয়া যায়</h4>
      <ul>
        <li><strong>স্টোরেজ নাটকীয়ভাবে কমে</strong> — প্রতিটি ডকুমেন্টে <code>_id</code>, ফিল্ডের নাম ও metadata পুনরাবৃত্তি হয় না। সাধারণত <strong>৫-১০ গুণ</strong> সাশ্রয়।</li>
        <li><strong>কম্প্রেশন অনেক ভালো</strong> — একই কলামের পরপর মান (৩১.৫, ৩১.৬, ৩১.৪) প্রায় একই, তাই চমৎকার কম্প্রেস হয়।</li>
        <li><strong>রেঞ্জ কুয়েরি দ্রুত</strong> — একটি bucket পড়লেই অনেকগুলো রিডিং পাওয়া যায়, র‍্যান্ডম I/O কম।</li>
        <li><strong>স্বয়ংক্রিয় ক্লাস্টার্ড ইনডেক্স</strong> সময় ও meta ফিল্ডে।</li>
      </ul>
      <h4>সীমাবদ্ধতা — যা জানা জরুরি</h4>
      <ul>
        <li><strong>ডকুমেন্ট আপডেট বা ডিলিট করা যায় না</strong> (MongoDB 5.0-এ একেবারেই নয়; পরের সংস্করণে সীমিত)। এটি append-only ডেটার জন্য ডিজাইন করা।</li>
        <li><strong><code>metaField</code> বাছাই অত্যন্ত গুরুত্বপূর্ণ</strong> — এটি এমন ফিল্ড হতে হবে যা <em>প্রায় বদলায় না</em> এবং যা দিয়ে সাধারণত ফিল্টার করা হয়। ভুল বাছলে bucket ছোট হয়ে যায় এবং সব সুবিধা হারিয়ে যায়।</li>
        <li><strong><code>granularity</code> ঠিকভাবে দিন</strong> — ডেটা আসার হারের সাথে মেলান। ভুল হলে bucket খুব বড় বা খুব ছোট হয়।</li>
        <li>Shard key-তে কিছু সীমাবদ্ধতা আছে।</li>
      </ul>
      <p><strong>বিকল্প:</strong> Time series collection-এর আগে ডেভেলপাররা হাতে <strong>bucket pattern</strong> বাস্তবায়ন করতেন (একটি ডকুমেন্টে ঘণ্টার সব রিডিং অ্যারে হিসেবে)। এখন MongoDB সেটি নিজেই করে দেয় — নতুন প্রজেক্টে নেটিভ টাইপ ব্যবহার করুন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>MongoDB time series বনাম InfluxDB/TimescaleDB — কখন কোনটি?</li>
        <li>Downsampling কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-34",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing","Text Index","Weights"],
    question: "MongoDB Text Index ($text) এবং Text Search Weights (weights parameter) কীভাবে টিউন করবেন?",
    answer: `
      <p>MongoDB-র text index-এ <strong>weights</strong> প্যারামিটার দিয়ে নির্ধারণ করা যায় কোন ফিল্ড প্রাসঙ্গিকতা স্কোরে কতটা গুরুত্বপূর্ণ — ঠিক Elasticsearch-এর <code>boost</code>-এর সমতুল্য।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.articles.createIndex(
  { title: "text", tags: "text", body: "text" },
  {
    weights: { title: 10, tags: 5, body: 1 },   // ডিফল্ট সবার জন্য 1
    name: "article_text_index"
  }
);

db.articles.find(
  { $text: { $search: "mongodb performance tuning" } },
  { score: { $meta: "textScore" }, title: 1 }
).sort({ score: { $meta: "textScore" } }).limit(10);</code></pre>
      </div>
      <h4>Weight কীভাবে স্কোরকে প্রভাবিত করে</h4>
      <p>MongoDB-র text score একটি সরল TF (term frequency)-ভিত্তিক গণনা — Elasticsearch-এর BM25-এর মতো পরিশীলিত নয়। Weight প্রতিটি ম্যাচের অবদানকে গুণ করে:</p>
      <ul>
        <li><code>title: 10</code> মানে শিরোনামে একবার মেলা <code>body: 1</code>-এর ১০ বার মেলার সমান স্কোর দেয়।</li>
        <li>এভাবে "শিরোনামে মিল বেশি গুরুত্বপূর্ণ" — এই স্বাভাবিক প্রত্যাশা প্রয়োগ করা যায়।</li>
      </ul>
      <h4>Text search syntax</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{ $text: { $search: "mongodb performance" } }         // OR — যেকোনো শব্দ
{ $text: { $search: "\\"exact phrase\\"" } }             // হুবহু বাক্যাংশ
{ $text: { $search: "mongodb -deprecated" } }         // "-" = বাদ দাও
{ $text: { $search: "database", $caseSensitive: false,
           $language: "english" } }</code></pre>
      </div>
      <h4>গুরুত্বপূর্ণ সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>প্রতি কালেকশনে একটিমাত্র text index</strong> — একাধিক ফিল্ড একই ইনডেক্সে থাকতে পারে (উপরের উদাহরণে যেমন), কিন্তু দুটি আলাদা text index তৈরি করা যায় না।</li>
        <li><strong>Stemming সীমিত ভাষায়</strong> — ইংরেজি, স্প্যানিশ ইত্যাদির জন্য বিল্ট-ইন stemmer আছে, কিন্তু বাংলার মতো ভাষায় নেই।</li>
        <li><strong>Fuzzy/টাইপো সহনশীলতা নেই</strong> — Elasticsearch-এর মতো Levenshtein-ভিত্তিক fuzzy matching নেই।</li>
        <li><strong>একটি কুয়েরিতে <code>$text</code> সহ compound query-তে অন্য শর্তও একটি ইনডেক্সেই থাকতে হবে</strong>, নাহলে দক্ষতা কমে।</li>
        <li><strong>$text sort ছাড়া <code>textScore</code> $meta ছাড়া কাজ করে না।</strong></li>
      </ul>
      <p><strong>কখন যথেষ্ট, কখন নয়:</strong> সাধারণ "সার্চ বার" ফিচারে (ব্লগ, ছোট ক্যাটালগ) MongoDB text index সম্পূর্ণ যথেষ্ট — কোনো বাড়তি অবকাঠামো লাগে না। কিন্তু autocomplete, fuzzy matching, ফ্যাসেটেড সার্চ বা বাংলা/জটিল ভাষার stemming দরকার হলে <strong>Atlas Search</strong> (Lucene-ভিত্তিক) বা আলাদা Elasticsearch প্রয়োজন।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Text index-এর সাইজ কীভাবে অনুমান করবেন?</li>
        <li><code>$text</code> কেন aggregation pipeline-এর প্রথম stage হতে হয়?</li>
      </ul>
    `
  },
  {
    id: "mongo-35",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Ops","Balancing","Chunk Migration"],
    question: "MongoDB Sharding Chunk Migration, Auto-Balancer, এবং Jumbo Chunks ফিক্সিং কৌশল কী?",
    answer: `
      <p>Sharded ক্লাস্টারে ডেটা সমানভাবে বণ্টিত রাখতে MongoDB স্বয়ংক্রিয়ভাবে <strong>chunk</strong> সরায় — এই প্রক্রিয়াটি বোঝা প্রোডাকশন sharding ডিবাগ করার জন্য অপরিহার্য।</p>
      <h4>Chunk ও Balancer</h4>
      <p>প্রতিটি shard key রেঞ্জের একটি অংশকে <strong>chunk</strong> বলে (ডিফল্ট লক্ষ্য আকার ~১২৮ MB)। <strong>Balancer</strong> একটি ব্যাকগ্রাউন্ড প্রক্রিয়া যা নিয়মিত পরীক্ষা করে কোনো shard-এ অন্যদের তুলনায় বেশি chunk আছে কি না, এবং থাকলে সেগুলো <strong>migrate</strong> করে ভারসাম্য আনে।</p>
      <pre class="mermaid">
sequenceDiagram
    participant B as Balancer
    participant S1 as Shard A (বেশি chunk)
    participant S2 as Shard B (কম chunk)
    B->>S1: migration শুরু করো
    S1->>S2: chunk-এর ডেটা কপি করো
    Note over S1,S2: এই সময় দুই দিকেই write রাউট হয়
    S2-->>B: কপি সম্পূর্ণ
    B->>S1: পুরনো ডেটা মুছে ফেলো
    B->>B: config server-এ মেটাডেটা আপডেট
      </pre>
      <span class="diagram-caption">Migration চলাকালে ডেটা ক্লাস্টারে সবসময় অ্যাক্সেসযোগ্য থাকে</span>
      <h4>Jumbo Chunk — সবচেয়ে সাধারণ sharding সমস্যা</h4>
      <p>একটি chunk লক্ষ্য আকারের চেয়ে বড় হয়ে গেলে এবং <strong>ভাগ করা যায় না</strong>, তখন সেটি "jumbo" চিহ্নিত হয়। এটি ঘটে যখন একটি নির্দিষ্ট shard key মানে (বা সংকীর্ণ রেঞ্জে) অস্বাভাবিক পরিমাণ ডেটা জমে যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Jumbo chunk খুঁজুন
db.getSiblingDB("config").chunks.find({ jumbo: true });

// কারণ: একটি shard key মান (বা রেঞ্জ) অসামঞ্জস্যপূর্ণভাবে বড়
// উদাহরণ: { tenantId: "big-customer" } — একটি বড় গ্রাহকের
//          সব ডেটা একটি chunk-এই আটকে আছে</code></pre>
      </div>
      <p><strong>Jumbo chunk migrate করা যায় না</strong> — balancer এড়িয়ে যায়, ফলে সেই shard-টি চিরকাল অতিরিক্ত ভারী থেকে যায়, যতক্ষণ না সমাধান করা হয়।</p>
      <h4>Jumbo chunk ঠিক করার কৌশল</h4>
      <ul>
        <li><strong><code>manuallySplitChunk</code> চালান</strong> — MongoDB 6.0+ এ একটি কমান্ড আছে যা জোর করে বিভক্ত করার চেষ্টা করে।</li>
        <li><strong>Shard key পুনর্বিবেচনা করুন:</strong> এটিই আসল কারণ। যদি কোনো একটি মান (hot value) সব ডেটা টেনে নেয়, তবে shard key-তে আরও একটি ফিল্ড যোগ করুন (compound shard key) যাতে সেই মানও ভাগ হয়।</li>
        <li><strong>Hashed shard key বিবেচনা করুন</strong> — যদি ranged key-তে বণ্টন অসম হয়।</li>
        <li><strong>MongoDB 4.4+ এ <code>reshardCollection</code></strong> — সম্পূর্ণ নতুন shard key দিয়ে কালেকশন পুনর্গঠন করা যায় (ব্যয়বহুল কিন্তু কার্যকর সমাধান)।</li>
      </ul>
      <h4>Auto-Balancer নিয়ন্ত্রণ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>sh.getBalancerState();               // চালু আছে কি না
sh.setBalancerState(false);          // ব্যস্ত সময়ে বন্ধ রাখা

// নির্দিষ্ট সময়ের উইন্ডোতে চালানো (কম ট্রাফিকের সময়)
db.getSiblingDB("config").settings.updateOne(
  { _id: "balancer" },
  { $set: { activeWindow: { start: "02:00", stop: "05:00" } } },
  { upsert: true }
);</code></pre>
      </div>
      <p><strong>Migration ক্লাস্টারে চাপ ফেলে</strong> — নেটওয়ার্ক ও I/O খরচ করে। প্রোডাকশনে balancer window ব্যবহার করে কম ট্রাফিকের সময়ে সীমাবদ্ধ রাখা ভালো অভ্যাস।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Reshard করার সময় ডাউনটাইম কীভাবে এড়াবেন?</li>
        <li>Balancer বন্ধ থাকা অবস্থায় নতুন shard যোগ করলে কী হয়?</li>
      </ul>
    `
  },
  {
    id: "mongo-36",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Queries","Array Operations","elemMatch"],
    question: "MongoDB Array Query Operators: $elemMatch, $all, $slice, এবং position operator ($) কীভাবে কাজ করে?",
    answer: `
      <p>অ্যারে ফিল্ডে কুয়েরি করার সময় MongoDB-র কিছু আচরণ স্বজ্ঞাবিরোধী — এই operator গুলো না জানলে নীরবে ভুল ফলাফল আসে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ডকুমেন্ট
{ _id: 1, name: "রহিম", scores: [
    { subject: "math",    value: 45 },
    { subject: "physics", value: 92 }
]}

// ❌ ভুল — শর্তগুলো ভিন্ন এলিমেন্টে মিললেও পাস করে
db.students.find({ "scores.subject": "math", "scores.value": { $gt: 80 } });
// math আছে (৪৫), ৮০+ মান আছে (৯২) → মিলে যায়, যদিও math-এ ৮০+ নেই ✗

// ✅ $elemMatch — একই এলিমেন্টে সব শর্ত
db.students.find({
  scores: { $elemMatch: { subject: "math", value: { $gt: 80 } } }
});   // সঠিকভাবে কিছুই মিলবে না ✅</code></pre>
      </div>
      <p><strong>এটি MongoDB-র সবচেয়ে বিপজ্জনক ফাঁদগুলোর একটি</strong> — কোনো এরর নেই, শুধু ভুল ডেটা। অবজেক্টের অ্যারেতে একাধিক শর্ত দিলে <em>সবসময়</em> <code>$elemMatch</code> ব্যবহার করুন।</p>
      <h4>অন্যান্য operator</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// $all — অ্যারেতে এই সবগুলোই থাকতে হবে (ক্রম নির্বিশেষে)
db.posts.find({ tags: { $all: ["mongodb", "nosql"] } });

// $size — ঠিক এতগুলো এলিমেন্ট (⚠️ রেঞ্জ দেওয়া যায় না, ইনডেক্স ব্যবহার করে না)
db.posts.find({ tags: { $size: 3 } });

// $slice — projection-এ, কতগুলো এলিমেন্ট ফেরত আসবে
db.posts.find({}, { comments: { $slice: 5 } });          // প্রথম ৫টি
db.posts.find({}, { comments: { $slice: -3 } });         // শেষ ৩টি
db.posts.find({}, { comments: { $slice: [10, 5] } });    // skip 10, নাও 5

// positional $ — projection-এ শুধু মেলা এলিমেন্ট
db.orders.find({ "items.sku": "ABC" }, { "items.$": 1 });

// সরল অ্যারেতে — সরাসরি মান দিলে "যেকোনো এলিমেন্ট মিললেই"
db.posts.find({ tags: "mongodb" });    // অ্যারেতে এটি থাকলেই মিলবে ✅</code></pre>
      </div>
      <h4>মনে রাখার মতো বিষয়</h4>
      <ul>
        <li><strong><code>$size</code> ইনডেক্স ব্যবহার করে না</strong> এবং রেঞ্জ সমর্থন করে না ("৩টির বেশি" বলা যায় না)। প্রায়ই একটি আলাদা <code>tagCount</code> ফিল্ড রেখে সেটিতে ইনডেক্স করা ভালো।</li>
        <li><strong><code>$elemMatch</code> projection-এও ব্যবহার করা যায়</strong> — শর্ত মেলা এলিমেন্টগুলো ফেরত দিতে।</li>
        <li><strong>Multikey index <code>$elemMatch</code>-এ কাজ করে</strong>, তবে compound শর্তে সম্পূর্ণ দক্ষ না-ও হতে পারে — <code>explain()</code> দিয়ে যাচাই করুন।</li>
        <li><strong>সরল মানের অ্যারেতে</strong> (স্ট্রিং/সংখ্যা) একটি শর্ত হলে <code>$elemMatch</code> লাগে না — সরাসরি মান দিলেই চলে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>$all</code> ও <code>$in</code>-এর পার্থক্য কী?</li>
        <li>অ্যারের ভেতরের অবজেক্টে aggregation কীভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-37",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Replication","Read Preference","secondaryPreferred"],
    question: "MongoDB Read Preference (primary, primaryPreferred, secondary, secondaryPreferred, nearest) এর কাজের পার্থক্য কী?",
    answer: `
      <p><strong>Read preference</strong> ঠিক করে ড্রাইভার কোন নোড থেকে read করবে — primary নাকি secondary। এটি স্কেলিং ও consistency-র মধ্যে একটি সরাসরি আপস।</p>
      <table>
        <tr><th>মোড</th><th>আচরণ</th><th>Consistency</th></tr>
        <tr><td><code>primary</code> (ডিফল্ট)</td><td>সবসময় primary</td><td>✅ সর্বদা সতেজ</td></tr>
        <tr><td><code>primaryPreferred</code></td><td>primary, না থাকলে secondary</td><td>সাধারণত সতেজ</td></tr>
        <tr><td><code>secondary</code></td><td>শুধু secondary</td><td>⚠️ stale হতে পারে</td></tr>
        <tr><td><code>secondaryPreferred</code></td><td>secondary, না থাকলে primary</td><td>⚠️ stale হতে পারে</td></tr>
        <tr><td><code>nearest</code></td><td>সর্বনিম্ন latency-র নোড</td><td>⚠️ stale হতে পারে</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// প্রতি-কুয়েরি
db.collection('reports').find({}, {
  readPreference: 'secondaryPreferred',
  maxStalenessSeconds: 90              // ⚠️ ৯০ সেকেন্ডের বেশি পিছিয়ে থাকা নোড এড়াও
});

// ট্যাগ দিয়ে নির্দিষ্ট নোড নির্বাচন (যেমন অ্যানালিটিক্স নোড)
{ readPreference: { mode: 'secondary', tags: [{ workload: 'analytics' }] } }</code></pre>
      </div>
      <h4>সবচেয়ে বড় ভুল ধারণা</h4>
      <p><strong>"Secondary থেকে read করলে স্কেল হবে" — এটি প্রায়ই ভুল।</strong></p>
      <p>কারণ: প্রতিটি secondary-কেও primary-র <em>সব</em> write রেপ্লিকেট করতে হয়। অর্থাৎ write লোড সব নোডে সমানভাবেই পড়ে। শুধু read লোড ভাগ হয়। write-heavy সিস্টেমে secondary read থেকে খুব কম লাভ হয়, এবং রেপ্লিকেশন lag বেড়ে যেতে পারে।</p>
      <p><strong>প্রকৃত সমাধান</strong> read স্কেল করতে — ক্যাশিং (Redis), ভালো ইনডেক্স, বা sharding।</p>
      <h4>Stale read-এর বিপদ</h4>
      <p>Secondary থেকে পড়লে ব্যবহারকারী <strong>নিজের সদ্য করা পরিবর্তন দেখতে না-ও পারেন</strong> — প্রোফাইল আপডেট করে রিফ্রেশ দিলে পুরনো ডেটা। এটি অত্যন্ত বিভ্রান্তিকর বাগ, এবং টেস্টিংয়ে ধরা পড়ে না (লোকাল সেটআপে lag থাকে না)।</p>
      <p><strong>নিয়ম:</strong> ইউজারের নিজের ডেটা সবসময় primary থেকে পড়ুন। কেবল অ্যানালিটিক্স, রিপোর্ট ও ব্যাকগ্রাউন্ড প্রসেসিংয়ে secondary ব্যবহার করুন — যেখানে কয়েক সেকেন্ডের পুরনো ডেটা সম্পূর্ণ গ্রহণযোগ্য।</p>
      <h4>বৈধ ব্যবহার</h4>
      <ul>
        <li><strong>ভারী রিপোর্ট কুয়েরি</strong> secondary-তে পাঠিয়ে primary-কে ট্রানজেকশনাল কাজের জন্য মুক্ত রাখা।</li>
        <li><strong><code>nearest</code> দিয়ে ভৌগোলিক latency কমানো</strong> — বহু-অঞ্চলে ছড়ানো replica set-এ।</li>
        <li><strong>Tag দিয়ে ডেডিকেটেড অ্যানালিটিক্স নোড</strong> — সেই নোডে ভারী কুয়েরি চললেও অন্যরা অপ্রভাবিত।</li>
      </ul>
      <p><strong><code>maxStalenessSeconds</code> সবসময় দিন</strong> — এটি নিশ্চিত করে অত্যধিক পিছিয়ে থাকা নোড থেকে পড়া হবে না। সর্বনিম্ন মান ৯০ সেকেন্ড।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Replication lag কীভাবে মনিটর করবেন?</li>
        <li>Causal consistency session কীভাবে stale read ঠেকায়?</li>
      </ul>
    `
  },
  {
    id: "mongo-38",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Operators","$set","$inc"],
    question: "Atomic Update Operators: $set, $inc, $push, $pull, $addToSet, এবং upsert: true কীভাবে ব্যবহার করবেন?",
    answer: `
      <p>MongoDB-র update operator গুলো <strong>সার্ভার-সাইডে অ্যাটমিক</strong> — এটিই এদের মূল মূল্য, কারণ read-modify-write প্যাটার্নের race condition এড়ানো যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ Race condition — দুটি সমান্তরাল রিকোয়েস্টে একটি আপডেট হারাবে
const doc = await db.counters.findOne({ _id: "views" });
await db.counters.updateOne({ _id: "views" }, { $set: { count: doc.count + 1 } });

// ✅ অ্যাটমিক — সার্ভারেই গণনা হয়, কখনও হারায় না
await db.counters.updateOne({ _id: "views" }, { $inc: { count: 1 } });</code></pre>
      </div>
      <h4>প্রধান operator</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{ $set:   { status: "shipped", updatedAt: new Date() } }
{ $unset: { tempField: "" } }
{ $inc:   { views: 1, stock: -1 } }          // ঋণাত্মকও চলে
{ $mul:   { price: 1.1 } }
{ $min:   { lowestPrice: 450 } }             // বর্তমানের চেয়ে কম হলেই সেট
{ $max:   { highestScore: 98 } }
{ $rename: { oldName: "newName" } }
{ $currentDate: { lastModified: true } }

// $setOnInsert — শুধু upsert-এ নতুন ডকুমেন্ট তৈরি হলে
db.users.updateOne(
  { email: "a@b.com" },
  { $set: { lastLogin: new Date() },
    $setOnInsert: { createdAt: new Date(), role: "user" } },
  { upsert: true }
);</code></pre>
      </div>
      <h4>Upsert — একটি শক্তিশালী প্যাটার্ন</h4>
      <p><code>upsert: true</code> মানে "থাকলে আপডেট করো, না থাকলে তৈরি করো"। এটি অ্যাটমিক, তাই "আগে খুঁজে দেখি আছে কি না, তারপর insert করি" ধরনের race condition দূর হয়।</p>
      <p><strong>গুরুত্বপূর্ণ:</strong> upsert-এ নতুন ডকুমেন্ট তৈরি হলে <em>কুয়েরির ফিল্ডগুলোও</em> ডকুমেন্টে যোগ হয়। আর <code>$setOnInsert</code> কেবল তৈরির সময় প্রয়োগ হয় — <code>createdAt</code> বা ডিফল্ট মানের জন্য আদর্শ।</p>
      <p><strong>Race condition সতর্কতা:</strong> দুটি সমান্তরাল upsert একই কুয়েরিতে চললে duplicate key এরর হতে পারে। এটি এড়াতে সেই ফিল্ডে <strong>unique index</strong> রাখুন এবং এররটি ধরে রিট্রাই করুন।</p>
      <h4>শর্তসাপেক্ষ আপডেট — ট্রানজেকশনের বিকল্প</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// স্টক থাকলে তবেই কমাও — অ্যাটমিক, ট্রানজেকশন ছাড়াই
const result = await db.products.updateOne(
  { _id: productId, stock: { $gte: qty } },
  { $inc: { stock: -qty } }
);
if (result.modifiedCount === 0) {
  throw new Error("পর্যাপ্ত স্টক নেই");
}</code></pre>
      </div>
      <p>এই প্যাটার্নটি অত্যন্ত মূল্যবান — <strong>একটি একক অ্যাটমিক অপারেশনে শর্ত যাচাই ও পরিবর্তন</strong> দুটোই হয়ে যায়। overselling-এর মতো সমস্যা এভাবেই সমাধান করা হয়, কোনো লক বা ট্রানজেকশন ছাড়াই।</p>
      <p><strong><code>findOneAndUpdate</code></strong> ব্যবহার করুন যদি আপডেট করা ডকুমেন্টটিও ফেরত দরকার হয় (<code>returnDocument: 'after'</code>)।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Upsert-এ duplicate key এরর কীভাবে সামলাবেন?</li>
        <li><code>updateOne</code> ও <code>findOneAndUpdate</code>-এর পার্থক্য কী?</li>
      </ul>
    `
  },
  {
    id: "mongo-39",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation","$lookup","Uncorrelated Subqueries"],
    question: "MongoDB $lookup (Left Outer Join) uncorrelated and correlated subqueries কীভাবে টিউন করবেন?",
    answer: `
      <p><code>$lookup</code>-এ দুটি ভিন্ন সিনট্যাক্স আছে — এবং তাদের মধ্যে পার্থক্য বোঝা জটিল join অপ্টিমাইজ করার চাবি।</p>
      <h4>Uncorrelated (সরল) $lookup</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{ $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"
}}
// ভেতরে এটি একটি সরল $in কুয়েরির সমতুল্য:
// db.users.find({ _id: { $in: [সব userId] } })</code></pre>
      </div>
      <p>এই ফর্মে subquery মূল কালেকশনের প্রতিটি ডকুমেন্টের উপর নির্ভর করে না — MongoDB সব <code>localField</code> মান সংগ্রহ করে একটিমাত্র <code>$in</code> কুয়েরিতে যুক্ত ডেটা এনে ফেলে। <strong>দক্ষ এবং সাধারণত এটিই যথেষ্ট।</strong></p>
      <h4>Correlated $lookup — pipeline সহ</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{ $lookup: {
    from: "orders",
    let: { userId: "$_id", joinDate: "$createdAt" },
    pipeline: [
      { $match: { $expr: {
          $and: [
            { $eq: ["$userId", "$$userId"] },
            { $gt: ["$createdAt", "$$joinDate"] }    // মূল ডকুমেন্টের উপর নির্ভরশীল শর্ত
          ]
      }}},
      { $sort: { createdAt: -1 } },
      { $limit: 5 },                                  // প্রতি ইউজারের সাম্প্রতিক ৫টি
      { $project: { total: 1, status: 1 } }
    ],
    as: "recentOrders"
}}</code></pre>
      </div>
      <p><code>let</code> দিয়ে মূল ডকুমেন্টের মান pipeline-এ পাঠানো হয় — এটি <strong>correlated subquery</strong>, যা প্রতিটি ইনপুট ডকুমেন্টের জন্য আলাদাভাবে চালাতে হয় (SQL-এর correlated subquery-র মতো)।</p>
      <h4>টিউনিংয়ের নিয়ম</h4>
      <ul>
        <li><strong>যতটা সম্ভব uncorrelated ফর্ম ব্যবহার করুন</strong> — এটি দ্রুত, কারণ একটি ব্যাচ কুয়েরিতে সব যুক্ত ডেটা আসে।</li>
        <li><strong><code>foreignField</code>-এ ইনডেক্স থাকতেই হবে</strong> — না থাকলে uncorrelated ফর্মেও প্রতিটি lookup ধীর হবে। এটি সবচেয়ে সাধারণ পারফরম্যান্স ভুল।</li>
        <li><strong>Pipeline-এ <code>$match</code> আগে রাখুন এবং যতটা সম্ভব সেটিকে <code>let</code>-নির্ভর না করে সাধারণ রাখুন</strong> — সাধারণ শর্ত ইনডেক্স ব্যবহার করতে পারে, <code>$expr</code>-ভিত্তিক জটিল শর্ত পারে না।</li>
        <li><strong>Pipeline-এ <code>$project</code> দিয়ে ফিল্ড সীমিত করুন</strong> — সম্পূর্ণ যুক্ত ডকুমেন্ট না এনে শুধু যা দরকার।</li>
        <li><strong><code>$limit</code> pipeline-এর ভেতরে দিন</strong> (বাইরে নয়) — "প্রতি ইউজারের সাম্প্রতিক ৫টি অর্ডার" এভাবেই সম্ভব; বাইরে <code>$limit</code> দিলে তা মূল ফলাফলের সংখ্যা সীমিত করবে, প্রতি-গ্রুপের নয়।</li>
      </ul>
      <h4>একটি গুরুত্বপূর্ণ পারফরম্যান্স সতর্কতা</h4>
      <p>Correlated <code>$lookup</code> (pipeline সহ) মূলত প্রতিটি ইনপুট ডকুমেন্টের জন্য <strong>একটি আলাদা কুয়েরি</strong> চালায় — এটি N+1 সমস্যার MongoDB সংস্করণ। বড় ইনপুট সেটে এটি ধীর হয়ে যেতে পারে।</p>
      <p><strong>বিকল্প:</strong> যদি pipeline-এর জটিলতা কেবল ফিল্টারের জন্য হয় (correlated সম্পর্ক ছাড়া), তবে uncorrelated <code>$lookup</code> ব্যবহার করে তারপর একটি আলাদা <code>$match</code> stage দিন — MongoDB তখন সেটিকে uncorrelated হিসেবে অপ্টিমাইজ করতে পারবে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>$lookup-এর পরিবর্তে denormalization কখন ভালো?</li>
        <li>Sharded from-কালেকশনে $lookup-এর সীমাবদ্ধতা কী?</li>
      </ul>
    `
  },
  {
    id: "mongo-40",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Geospatial","2dsphere","near"],
    question: "MongoDB Geospatial Index (2dsphere) এবং $near / $geoWithin Query কীভাবে কাজ করে?",
    answer: `
      <p>MongoDB-তে ভৌগোলিক ডেটার জন্য একটি বিশেষ ইনডেক্স টাইপ দরকার — সাধারণ B-Tree ইনডেক্স গোলকীয় স্থানাঙ্কে দূরত্ব বোঝে না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ⚠️ GeoJSON: coordinates অ্যারেতে [longitude, latitude] — উল্টো নয়!
db.stores.insertOne({
  name: "গুলশান শাখা",
  location: { type: "Point", coordinates: [90.4152, 23.7925] }
});

db.stores.createIndex({ location: "2dsphere" });

// নিকটতম — স্বয়ংক্রিয়ভাবে দূরত্ব অনুযায়ী সাজানো ফল
db.stores.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [90.4125, 23.8103] },
      $maxDistance: 5000   // মিটারে
    }
  }
});

// একটি এলাকার মধ্যে (সাজানো ছাড়া, তাই দ্রুত)
db.stores.find({
  location: { $geoWithin: {
    $geometry: {
      type: "Polygon",
      coordinates: [[[90.40,23.79],[90.42,23.79],[90.42,23.81],[90.40,23.81],[90.40,23.79]]]
  }}}
});</code></pre>
      </div>
      <h4>$near বনাম $geoWithin</h4>
      <ul>
        <li><strong><code>$near</code>:</strong> নিকটতম বিন্দু, দূরত্ব অনুযায়ী স্বয়ংক্রিয়ভাবে সাজানো। "কাছের দোকান দেখাও" ফিচারে আদর্শ। ইনডেক্স বাধ্যতামূলক।</li>
        <li><strong><code>$geoWithin</code>:</strong> একটি নির্দিষ্ট আকৃতির (বৃত্ত, বহুভুজ) মধ্যে যা কিছু আছে — সাজায় না, তাই দ্রুত। "এই এলাকায় কী আছে" প্রশ্নে উপযুক্ত।</li>
      </ul>
      <h4>সবচেয়ে সাধারণ বাগ: স্থানাঙ্কের ক্রম</h4>
      <p>GeoJSON স্ট্যান্ডার্ড অনুযায়ী <strong>longitude সবসময় প্রথমে</strong> — সাধারণ কথ্য "lat, long" অভ্যাসের বিপরীত। এটি উল্টে দিলে কোনো এরর আসে না, শুধু আপনার ঢাকার দোকান সাগরের মাঝখানে চলে যায় (কারণ lat/long মান কাছাকাছি সীমায় থাকলে এটি একটি বৈধ কিন্তু ভুল স্থানাঙ্ক তৈরি করে)।</p>
      <h4>Aggregation-এ $geoNear — বেশি সুবিধাজনক</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.stores.aggregate([
  { $geoNear: {
      near: { type: "Point", coordinates: [90.4125, 23.8103] },
      distanceField: "distanceMeters",     // প্রতিটি ফলাফলে দূরত্ব যুক্ত হয়
      maxDistance: 5000,
      query: { isOpen: true },              // অতিরিক্ত ফিল্টার
      spherical: true
  }},
  { $limit: 20 }
]);
// ⚠️ $geoNear pipeline-এর প্রথম stage-ই হতে হবে</code></pre>
      </div>
      <p><code>$geoNear</code> সরাসরি প্রতিটি ফলাফলে দূরত্ব যোগ করে দেয় — "১.২ কিমি দূরে" দেখানোর জন্য আলাদা গণনা লাগে না।</p>
      <h4>2dsphere বনাম পুরনো 2d</h4>
      <p><strong>সবসময় <code>2dsphere</code> ব্যবহার করুন</strong> — এটি গোলকীয় জ্যামিতি হিসাব করে (পৃথিবীর বক্রতা বিবেচনা করে) এবং GeoJSON সমর্থন করে। পুরনো <code>2d</code> সমতল জ্যামিতি ব্যবহার করে, যা বড় দূরত্বে ভুল ফল দেয় — নতুন প্রজেক্টে এটি ব্যবহার করবেন না।</p>
      <p><strong>সীমাবদ্ধতা:</strong> এটি সরলরেখার দূরত্ব, রাস্তার প্রকৃত দূরত্ব নয়। ডেলিভারি ETA-তে চূড়ান্ত সিদ্ধান্তে routing API প্রয়োজন। অতি উচ্চ write হারে (প্রতি সেকেন্ডে লাইভ লোকেশন) Redis GEO বেশি উপযুক্ত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Polygon-এর ভেতরে বিন্দু আছে কি না কীভাবে কুয়েরি করবেন?</li>
        <li>Sharded কালেকশনে geo query-র সীমাবদ্ধতা কী?</li>
      </ul>
    `
  },
  {
    id: "mongo-41",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Internal","BSON","Data Limits"],
    question: "BSON Binary Format vs JSON এবং 16MB Document Limit কেন রাখা হয়েছে?",
    answer: `
      <p><strong>BSON (Binary JSON)</strong> হলো MongoDB-র অভ্যন্তরীণ ডেটা ফরম্যাট — JSON-এর বাইনারি সংস্করণ, কিন্তু অতিরিক্ত টাইপ ও দক্ষতা সহ।</p>
      <h4>BSON কী যোগ করে</h4>
      <ul>
        <li><strong>সমৃদ্ধ টাইপ:</strong> JSON-এ কেবল string, number, boolean, array, object, null আছে। BSON যোগ করে <code>Date</code>, <code>ObjectId</code>, <code>Binary</code>, <code>Decimal128</code>, <code>Int32</code>, <code>Int64</code>, <code>Regex</code>।</li>
        <li><strong>দৈর্ঘ্য-প্রিফিক্স:</strong> প্রতিটি ডকুমেন্ট ও ফিল্ডের আগে তার দৈর্ঘ্য লেখা থাকে — তাই পার্সার একটি ফিল্ড <em>এড়িয়ে যেতে</em> পারে সেটি না পড়েই। বড় ডকুমেন্ট থেকে একটি ফিল্ড বের করা অত্যন্ত দ্রুত।</li>
        <li><strong>দ্রুত ট্রাভার্সাল:</strong> স্ট্রিং পার্সিং বা টাইপ অনুমান লাগে না।</li>
      </ul>
      <p><strong>একটি সূক্ষ্ম বিষয়:</strong> BSON সবসময় JSON-এর চেয়ে <em>ছোট</em> নয় — দৈর্ঘ্য ও টাইপ মেটাডেটার কারণে ছোট ডকুমেন্টে এটি বড়ও হতে পারে। এর মূল সুবিধা <strong>আকার নয়, গতি ও টাইপ নির্ভুলতা</strong>।</p>
      <h4><code>Decimal128</code> কেন গুরুত্বপূর্ণ</h4>
      <p>JSON-এ সব সংখ্যা double — তাই <code>0.1 + 0.2 !== 0.3</code>। আর্থিক হিসাবে এটি অগ্রহণযোগ্য। BSON-এর <code>Decimal128</code> দশমিক নির্ভুলতা দেয়, তাই <strong>টাকার পরিমাণে এটি বা integer (পয়সা) ব্যবহার করুন</strong> — কখনও double নয়।</p>
      <h4>১৬ MB ডকুমেন্ট সীমা</h4>
      <p>এটি একটি <strong>ইচ্ছাকৃত ডিজাইন সিদ্ধান্ত</strong>, প্রযুক্তিগত সীমাবদ্ধতা নয়। কারণগুলো:</p>
      <ul>
        <li><strong>মেমরি সুরক্ষা:</strong> MongoDB ডকুমেন্ট প্রক্রিয়াকরণের সময় সম্পূর্ণ মেমরিতে আনে। সীমা না থাকলে একটি বিশাল ডকুমেন্ট সার্ভারের RAM শেষ করে দিতে পারত।</li>
        <li><strong>নেটওয়ার্ক:</strong> ১০০ MB ডকুমেন্ট পাঠানো নেটওয়ার্ক জ্যাম করে দিত এবং অন্য কুয়েরি আটকে যেত।</li>
        <li><strong>ডিজাইনের দিকনির্দেশনা:</strong> সীমাটি কার্যত ডেভেলপারদের <em>অসীম বাড়তে পারে এমন অ্যারে</em> embed করা থেকে বিরত রাখে — যা একটি অ্যান্টি-প্যাটার্ন।</li>
      </ul>
      <h4>সীমায় পৌঁছালে কী করবেন</h4>
      <p><strong>সীমা বাড়ানোর উপায় নেই</strong> — ডেটা মডেল বদলাতে হবে:</p>
      <ul>
        <li><strong>Reference ব্যবহার করুন:</strong> কমেন্ট, লগ, ইভেন্ট আলাদা কালেকশনে সরান।</li>
        <li><strong>Bucket pattern:</strong> টাইম-সিরিজ ডেটা ঘণ্টা/দিন অনুযায়ী গুচ্ছবদ্ধ করুন — একটি ডকুমেন্টে ১০০০টি রিডিং, তারপর নতুন ডকুমেন্ট।</li>
        <li><strong>GridFS:</strong> বড় ফাইলের জন্য — এটি ফাইলকে ২৫৫ KB চাঙ্কে ভেঙে সংরক্ষণ করে।</li>
        <li><strong>Object storage (S3):</strong> বাস্তবে বড় ফাইলের জন্য এটিই সেরা — MongoDB-তে শুধু URL রাখুন।</li>
      </ul>
      <p><strong>ব্যবহারিক সতর্কতা:</strong> ১৬ MB-র কাছাকাছি ডকুমেন্ট থাকলেই পারফরম্যান্স খারাপ হতে শুরু করে — সীমায় পৌঁছানোর অনেক আগেই। ডকুমেন্ট সাধারণত কয়েকশো KB-র নিচে রাখাই স্বাস্থ্যকর।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Bucket pattern কীভাবে বাস্তবায়ন করবেন?</li>
        <li>ObjectId-এর ১২ বাইটে কী কী তথ্য থাকে?</li>
      </ul>
    `
  },
  {
    id: "mongo-42",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Indexing","Wildcard Index","$**"],
    question: "MongoDB Wildcard Index ($**) কখন ব্যবহার করা উচিত?",
    answer: `
      <p>Wildcard index (<code>$**</code>) স্থির স্কিমা ছাড়া ডেটাতে ইনডেক্সিং সমস্যার সমাধান — কিন্তু এটি একটি বিশেষায়িত টুল, ডিফল্ট পছন্দ নয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ডকুমেন্ট প্রতি ভিন্ন attribute
{ sku: "A1", category: "electronics",
  attributes: { voltage: "220V", warranty: "2 years" } }
{ sku: "B2", category: "clothing",
  attributes: { size: "XL", color: "লাল", material: "cotton" } }

// শুধু attributes সাবডকুমেন্টে wildcard — সুপারিশকৃত পদ্ধতি
db.products.createIndex({ "attributes.$**": 1 });

// নির্দিষ্ট ফিল্ড বাদ দিতে (বড়, অপ্রাসঙ্গিক ডেটা এড়াতে)
db.products.createIndex(
  { "$**": 1 },
  { wildcardProjection: { "internalNotes": 0, "rawLogs": 0 } }
);</code></pre>
      </div>
      <h4>কখন সত্যিই দরকার</h4>
      <ul>
        <li><strong>ইউজার-সংজ্ঞায়িত কাস্টম ফিল্ড:</strong> প্রতিটি গ্রাহক নিজস্ব মেটাডেটা যোগ করতে পারেন — ফিল্ডের নাম আগে থেকে জানা নেই।</li>
        <li><strong>বহু-টেন্যান্ট অ্যাপ্লিকেশন:</strong> প্রতিটি টেন্যান্টের ভিন্ন attribute স্কিমা।</li>
        <li><strong>জেনেরিক লগ/ইভেন্ট ডেটা:</strong> ইভেন্ট টাইপ অনুযায়ী পেলোড ফিল্ড বদলায়।</li>
        <li><strong>প্রোটোটাইপিং/ডিবাগিং:</strong> স্কিমা এখনও স্থির হয়নি এমন পর্যায়ে দ্রুত এক্সপ্লোর করতে।</li>
      </ul>
      <h4>কেন এটি ডিফল্ট পছন্দ নয়</h4>
      <ul>
        <li><strong>একটি কুয়েরিতে একটিমাত্র ফিল্ডে কাজ করে</strong> — নির্দিষ্ট compound index-এর মতো একাধিক শর্তে একসাথে অপ্টিমাইজ করে না।</li>
        <li><strong>Sort-এ সাহায্য করে না।</strong></li>
        <li><strong>ইনডেক্স বিশাল হয়ে যায়</strong> — প্রতিটি ফিল্ড, প্রতিটি নেস্টেড লেভেল আলাদা এন্ট্রি তৈরি করে। ডকুমেন্টে ৫০টি ফিল্ড থাকলে সেই ডকুমেন্টের জন্য ৫০টি ইনডেক্স এন্ট্রি।</li>
        <li><strong>Write পারফরম্যান্স উল্লেখযোগ্যভাবে কমে</strong> — প্রতিটি insert/update-এ অনেক ইনডেক্স এন্ট্রি আপডেট করতে হয়।</li>
        <li><strong>Array field-এ ব্যয়বহুল</strong> — multikey ও wildcard একসাথে হলে এন্ট্রি সংখ্যা গুণিতক হারে বাড়ে।</li>
      </ul>
      <h4>নিয়ম</h4>
      <p><strong>ফিল্ডের নাম আগে থেকে জানা থাকলে কখনও wildcard ব্যবহার করবেন না</strong> — নির্দিষ্ট single/compound index সবসময় দ্রুত ও সংক্ষিপ্ত। Wildcard শুধু <em>সত্যিকারের অজানা</em> স্কিমার জন্য।</p>
      <p><strong>প্রায়ই ভালো বিকল্প:</strong> কাস্টম ফিল্ডগুলোকে একটি <code>key: value</code> অ্যারেতে রূপান্তর করে সেটিতে সাধারণ multikey index দেওয়া — ভবিষ্যদ্বাণীযোগ্য কাঠামো, নিয়ন্ত্রিত ইনডেক্স আকার।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// বিকল্প: key-value অ্যারে প্যাটার্ন
{ sku: "A1", customAttrs: [
    { k: "voltage", v: "220V" },
    { k: "warranty", v: "2 years" }
]}
db.products.createIndex({ "customAttrs.k": 1, "customAttrs.v": 1 });</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>wildcardProjection</code> কখন ব্যবহার করবেন?</li>
        <li>Wildcard index-এর আকার কীভাবে অনুমান করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-43",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Aggregation","$facet","Parallel Pipelines"],
    question: "MongoDB $facet Stage দিয়ে সমান্তরাল প্যারালাল মেট্রিকেল এগ্রিগেশন কীভাবে করবেন?",
    answer: `
      <p><code>$facet</code> একই ইনপুট ডেটার উপর <strong>একাধিক সাব-পাইপলাইন সমান্তরালে</strong> চালায় — একটি কুয়েরিতেই ভিন্ন ভিন্ন দৃষ্টিকোণ থেকে ফলাফল পাওয়া যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.products.aggregate([
  { $match: { category: "electronics", inStock: true } },

  { $facet: {
      // ১. পেজিনেটেড ফলাফল
      "results": [
        { $sort: { createdAt: -1 } },
        { $skip: 0 }, { $limit: 20 },
        { $project: { name: 1, price: 1, rating: 1 } }
      ],

      // ২. মোট সংখ্যা (পেজিনেশনের জন্য)
      "totalCount": [ { $count: "count" } ],

      // ৩. ফিল্টারের জন্য ব্র্যান্ড তালিকা
      "brands": [
        { $group: { _id: "$brand", count: { $sum: 1 } } },
        { $sort: { count: -1 } }, { $limit: 10 }
      ],

      // ৪. দামের রেঞ্জ ফিল্টার
      "priceRanges": [
        { $bucket: {
            groupBy: "$price",
            boundaries: [0, 1000, 5000, 20000, 100000],
            default: "20000+",
            output: { count: { $sum: 1 } }
        }}
      ]
  }}
]);</code></pre>
      </div>
      <h4>প্রধান ব্যবহার: faceted search</h4>
      <p>ই-কমার্স সার্চ পেজে একসাথে দরকার হয় — পণ্যের তালিকা, মোট সংখ্যা, এবং সাইডবারের সব ফিল্টার (ব্র্যান্ড, দামের রেঞ্জ, রেটিং) সহ প্রতিটির গণনা।</p>
      <p><code>$facet</code> ছাড়া এর জন্য <strong>৪-৫টি আলাদা কুয়েরি</strong> চালাতে হতো — প্রতিটিতে একই <code>$match</code> পুনরাবৃত্তি করে। <code>$facet</code>-এ <code>$match</code> একবার চলে, তারপর ফলাফল সব সাব-পাইপলাইনে শেয়ার হয়।</p>
      <h4>গুরুত্বপূর্ণ বিষয়</h4>
      <ul>
        <li><strong><code>$match</code> অবশ্যই <code>$facet</code>-এর আগে রাখুন</strong> — তখনই সেটি ইনডেক্স ব্যবহার করতে পারে। <code>$facet</code>-এর <em>ভেতরের</em> কোনো stage ইনডেক্স ব্যবহার করতে পারে না, কারণ তারা মধ্যবর্তী ফলাফলের উপর কাজ করে।</li>
        <li><strong>১০০ MB মেমরি সীমা</strong> সব সাব-পাইপলাইন মিলিয়ে প্রযোজ্য। ইনপুট বড় হলে সমস্যা হতে পারে — তাই আগে ভালোভাবে ফিল্টার করা জরুরি।</li>
        <li><strong>আউটপুট একটি ডকুমেন্ট</strong> — প্রতিটি facet একটি অ্যারে ফিল্ড হিসেবে আসে।</li>
        <li><strong><code>$count</code> খালি ফলাফলে অ্যারেই দেয় না</strong> — অ্যাপ্লিকেশনে <code>result.totalCount[0]?.count ?? 0</code> লিখুন, নাহলে undefined এরর হবে।</li>
      </ul>
      <p><strong>পারফরম্যান্স বিবেচনা:</strong> সব facet একই ইনপুট প্রক্রিয়া করে, তাই ইনপুট বড় হলে খরচ যোগ হয়। খুব বড় ডেটাসেটে মোট গণনা আলাদাভাবে ক্যাশ করা বা আনুমানিক গণনা ব্যবহার করা ভালো।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>$bucket</code> ও <code>$bucketAuto</code>-এর পার্থক্য কী?</li>
        <li>বিশাল কালেকশনে মোট গণনা কীভাবে দক্ষভাবে করবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-44",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Capped Collections","Logs","Fixed Size"],
    question: "MongoDB Capped Collections (Circular Queue) কী এবং এর সুবিধা কী?",
    answer: `
      <p><strong>Capped collection</strong> একটি নির্দিষ্ট আকারের বৃত্তাকার বাফার — পূর্ণ হলে সবচেয়ে পুরনো ডকুমেন্ট স্বয়ংক্রিয়ভাবে মুছে গিয়ে নতুনের জায়গা করে দেয়। নাম "circular queue"-র ধারণা থেকেই এসেছে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.createCollection("recent_events", {
  capped: true,
  size: 52428800,      // ৫০ MB — ডিস্কে আগেই বরাদ্দ (আবশ্যক)
  max: 50000           // ঐচ্ছিক: সর্বোচ্চ ডকুমেন্ট সংখ্যা
});

// insertion-এর ক্রমেই ফেরত আসে — কোনো ইনডেক্স ছাড়াই
db.recent_events.find().sort({ $natural: 1 });    // পুরনো → নতুন
db.recent_events.find().sort({ $natural: -1 });   // নতুন → পুরনো</code></pre>
      </div>
      <h4>কেন এটি দ্রুত</h4>
      <ul>
        <li><strong>ডিস্কে জায়গা আগেই বরাদ্দ</strong> — ডকুমেন্ট বাড়ার সাথে সাথে বরাদ্দ (allocation) করতে হয় না। এটি insert-কে সাধারণ কালেকশনের চেয়ে দ্রুত করে।</li>
        <li><strong>Physical insertion order বজায় থাকে</strong> — <code>$natural</code> sort দ্রুত, কারণ কোনো ইনডেক্স স্ক্যান লাগে না।</li>
        <li><strong>মোছার জন্য কোনো ব্যাকগ্রাউন্ড প্রক্রিয়া লাগে না</strong> — সীমা ছুঁলেই পুরনো ডেটা তাৎক্ষণিক প্রতিস্থাপিত হয়, ঠিক buffer-এর মতো।</li>
      </ul>
      <h4>কড়া সীমাবদ্ধতা</h4>
      <ul>
        <li><strong>ডকুমেন্ট মুছে ফেলা যায় না</strong> — শুধু পুরো কালেকশন drop করা সম্ভব, নির্দিষ্ট ডকুমেন্ট নয়।</li>
        <li><strong>ডকুমেন্টের আকার বাড়ানো যায় না</strong> — এমন আপডেট এরর দেয়, কারণ এটি bucket ক্রম ভেঙে দিত।</li>
        <li><strong>Sharding সমর্থিত নয়</strong> — একটি একক নোডেই থাকতে হবে, স্কেল করা যায় না।</li>
        <li><strong>আকার আগেই নির্ধারণ করতে হয়</strong> এবং পরে বদলানো সহজ নয় (<code>convertToCapped</code> লাগে, যা কালেকশন পুনর্নির্মাণ করে)।</li>
      </ul>
      <h4>Tailable Cursor</h4>
      <p>Capped collection-এর সাথে <strong>tailable cursor</strong> ব্যবহার করা যায় — <code>tail -f</code>-এর মতো, নতুন ডকুমেন্ট এলেই কার্সার সেটি ফেরত দেয়, পুনরায় কুয়েরি না করেই।</p>
      <h4>বাস্তব ব্যবহার</h4>
      <p>MongoDB নিজেই <strong>oplog</strong>-এর জন্য এটি ব্যবহার করে — সম্ভবত সবচেয়ে গুরুত্বপূর্ণ ব্যবহারিক উদাহরণ। রেপ্লিকেশন ও change stream এর উপরই নির্ভরশীল।</p>
      <h4>আধুনিক প্রজেক্টে কেন কম ব্যবহৃত হয়</h4>
      <p>অ্যাপ্লিকেশন-স্তরের ব্যবহারে এখন ভালো বিকল্প আছে:</p>
      <ul>
        <li><strong>TTL index:</strong> সাধারণ কালেকশনে সময়-ভিত্তিক মোছা, কোনো সীমাবদ্ধতা ছাড়া — "৭ দিনের পুরনো মুছে ফেলো" ধরনের নিয়মে এটিই স্বাভাবিক পছন্দ।</li>
        <li><strong>Time series collection:</strong> মেট্রিক ও সেন্সর ডেটায় অনেক বেশি দক্ষ, কম্প্রেশনসহ।</li>
        <li><strong>Change streams:</strong> resume token-সহ tailable cursor-এর নির্ভরযোগ্য প্রতিস্থাপন।</li>
      </ul>
      <p><strong>নিয়ম:</strong> নতুন কোডে capped collection বেছে নেওয়ার আগে ভাবুন — সময়-ভিত্তিক হলে TTL, মেট্রিকের জন্য time series, প্রায় সবসময় ভালো পছন্দ। Capped কেবল তখনই যখন কড়াকড়িভাবে <em>আকারের</em> সীমা দরকার এবং সর্বোচ্চ insert গতি চাই।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Capped collection-এর আকার কীভাবে ঠিক করবেন?</li>
        <li>Tailable cursor ব্যবহারে কী কী সতর্কতা প্রয়োজন?</li>
      </ul>
    `
  },
  {
    id: "mongo-45",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Index","Multikey Index","Arrays"],
    question: "MongoDB Multikey Indexing এবং অ্যারে ফিল্ড ইনডেক্সিং সীমানা কী?",
    answer: `
      <p><strong>Multikey index</strong> — MongoDB যখন একটি অ্যারে ফিল্ডে ইনডেক্স তৈরি করে, তখন সে <em>অ্যারের প্রতিটি এলিমেন্টের জন্য একটি করে ইনডেক্স এন্ট্রি</em> তৈরি করে। এটি স্বয়ংক্রিয়, আলাদা কিছু করতে হয় না।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ডকুমেন্ট
{ _id: 1, title: "MongoDB গাইড", tags: ["database", "nosql", "backend"] }

db.posts.createIndex({ tags: 1 });   // স্বয়ংক্রিয়ভাবে multikey

// ভেতরে ৩টি ইনডেক্স এন্ট্রি তৈরি হয়:
//   "database" → doc 1
//   "nosql"    → doc 1
//   "backend"  → doc 1

db.posts.find({ tags: "nosql" });    // দ্রুত ইনডেক্স lookup ✅</code></pre>
      </div>
      <h4>প্রধান সীমাবদ্ধতা</h4>
      <p><strong>একটি compound index-এ সর্বোচ্চ একটি অ্যারে ফিল্ড থাকতে পারে।</strong></p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ❌ ব্যর্থ হবে — দুটিই অ্যারে
db.products.createIndex({ tags: 1, categories: 1 });
// "cannot index parallel arrays"</code></pre>
      </div>
      <p><strong>কারণ:</strong> দুটি অ্যারে (প্রতিটিতে ১০টি এলিমেন্ট) থাকলে সব সমন্বয়ের জন্য ১০ × ১০ = <strong>১০০টি ইনডেক্স এন্ট্রি</strong> লাগত একটিমাত্র ডকুমেন্টের জন্য। তিনটি অ্যারে হলে ১০০০। এই গুণিতক বিস্ফোরণ ঠেকাতেই MongoDB এটি নিষিদ্ধ করেছে।</p>
      <h4>ইনডেক্সের আকার নিয়ে সতর্কতা</h4>
      <p>একটি ডকুমেন্টে ১০০০ এলিমেন্টের অ্যারে থাকলে সেটি একাই <strong>১০০০টি ইনডেক্স এন্ট্রি</strong> তৈরি করে। ফলে:</p>
      <ul>
        <li>ইনডেক্স ডকুমেন্ট সংখ্যার তুলনায় বহুগুণ বড় হয়ে যায় — RAM চাপ বাড়ে।</li>
        <li>প্রতিটি write-এ অনেকগুলো ইনডেক্স এন্ট্রি আপডেট করতে হয় — write ধীর হয়।</li>
      </ul>
      <h4>অ্যারে কুয়েরির একটি গুরুত্বপূর্ণ সূক্ষ্মতা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// ডকুমেন্ট: { scores: [ { subject: "math", value: 45 } ] }

// ❌ ভুলভাবে মিলে যায় — শর্তগুলো ভিন্ন এলিমেন্টে মিললেও চলে
db.students.find({ "scores.subject": "math", "scores.value": { $gt: 80 } });
// math আছে (৪৫), এবং ৮০-র বেশি কোনো একটি value আছে → মিলে যাবে ✗

// ✅ $elemMatch — একই এলিমেন্টে সব শর্ত মিলতে হবে
db.students.find({
  scores: { $elemMatch: { subject: "math", value: { $gt: 80 } } }
});</code></pre>
      </div>
      <p>এটি Elasticsearch-এর nested object সমস্যার সমতুল্য — এবং সমান বিপজ্জনক, কারণ কোনো এরর আসে না, শুধু <strong>ভুল ফলাফল</strong>।</p>
      <h4>অন্যান্য সীমা</h4>
      <ul>
        <li>Multikey index <strong>covered query দিতে পারে না</strong> — ডকুমেন্ট পড়তেই হবে।</li>
        <li>Hashed index অ্যারেতে কাজ করে না।</li>
        <li>Shard key-তে multikey ব্যবহার করা যায় না।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>বড় অ্যারের বদলে কোন ডিজাইন প্যাটার্ন ব্যবহার করবেন?</li>
        <li>Multikey index ব্যবহার হচ্ছে কি না <code>explain()</code>-এ কীভাবে দেখবেন?</li>
      </ul>
    `
  },
  {
    id: "mongo-46",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Connection","Connection Pool","maxPoolSize"],
    question: "MongoDB Connection String Options: maxPoolSize, minPoolSize, and maxIdleTimeMS কীভাবে কনফিগার করবেন?",
    answer: `
      <p>MongoDB ড্রাইভার একটি <strong>কানেকশন পুল</strong> রক্ষণাবেক্ষণ করে — প্রতিটি অপারেশনে নতুন কানেকশন খোলার (TCP + auth হ্যান্ডশেক) ব্যয়বহুল খরচ এড়াতে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const client = new MongoClient(uri, {
  maxPoolSize: 100,           // সর্বোচ্চ সমান্তরাল কানেকশন (ডিফল্ট 100)
  minPoolSize: 10,            // সবসময় প্রস্তুত রাখা
  maxIdleTimeMS: 60000,       // নিষ্ক্রিয় কানেকশন কতক্ষণ পর বন্ধ
  waitQueueTimeoutMS: 5000,   // পুল পূর্ণ হলে কতক্ষণ অপেক্ষা
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,          // ক্ষণস্থায়ী ব্যর্থতায় স্বয়ংক্রিয় রিট্রাই
  retryReads: true
});

// ⚠️ অ্যাপ্লিকেশনে একটিই MongoClient তৈরি করে সর্বত্র পুনর্ব্যবহার করুন
await client.connect();</code></pre>
      </div>
      <h4>সবচেয়ে সাধারণ ও ব্যয়বহুল ভুল</h4>
      <p><strong>প্রতিটি রিকোয়েস্টে নতুন <code>MongoClient</code> তৈরি করা।</strong> প্রতিটি ক্লায়েন্ট নিজের পুল খোলে — কয়েক মিনিটেই MongoDB সার্ভারের কানেকশন সীমা শেষ হয়ে যায় এবং সব কিছু ব্যর্থ হতে শুরু করে।</p>
      <p>সঠিক পদ্ধতি: অ্যাপ্লিকেশন চালুর সময় একবার <code>MongoClient</code> তৈরি করে সর্বত্র সেটিই ব্যবহার করুন। এটি থ্রেড-নিরাপদ এবং ভেতরে পুলিং সামলায়।</p>
      <h4>Pool size কত রাখবেন</h4>
      <p>স্বজ্ঞাবিরোধী হলেও — <strong>বড় পুল সবসময় ভালো নয়</strong>। MongoDB সার্ভারে প্রতিটি কানেকশন একটি থ্রেড ও ~১ MB স্ট্যাক মেমরি নেয়। ১০০ অ্যাপ ইনস্ট্যান্স × ১০০ কানেকশন = ১০,০০০ কানেকশন, যা সার্ভারকে ধসিয়ে দিতে পারে।</p>
      <ul>
        <li>সূত্র: <code>maxPoolSize × অ্যাপ ইনস্ট্যান্স সংখ্যা</code> সার্ভারের ক্ষমতার (<code>net.maxIncomingConnections</code>) মধ্যে রাখুন।</li>
        <li>Node.js একক-থ্রেডেড — খুব বড় পুল সাধারণত অপ্রয়োজনীয়। বেশিরভাগ অ্যাপে ১০-৫০ যথেষ্ট।</li>
        <li><code>minPoolSize</code> দিলে ঠান্ডা অবস্থার পর প্রথম রিকোয়েস্টে হ্যান্ডশেকের latency এড়ানো যায়।</li>
      </ul>
      <h4>Serverless-এ বিশেষ সমস্যা</h4>
      <p>Lambda-র মতো পরিবেশে প্রতিটি ইনভোকেশন আলাদা ইনস্ট্যান্স হতে পারে — কানেকশন পুলিংয়ের ধারণাই ভেঙে পড়ে। সমাধান: হ্যান্ডলারের <em>বাইরে</em> ক্লায়েন্ট তৈরি করুন (warm ইনস্ট্যান্সে পুনর্ব্যবহার হবে), <code>maxPoolSize</code> ছোট (১-৫) রাখুন, এবং সম্ভব হলে <strong>MongoDB Atlas Data API</strong> বা একটি কানেকশন প্রক্সি ব্যবহার করুন।</p>
      <h4>মনিটরিং</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.serverStatus().connections
// { current: 250, available: 51950, totalCreated: 12043 }
// current দ্রুত বাড়তে থাকলে কানেকশন লিক সন্দেহ করুন</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li><code>waitQueueTimeoutMS</code> শেষ হলে কী হয়?</li>
        <li><code>retryWrites</code> কীভাবে নিরাপদে কাজ করে?</li>
      </ul>
    `
  },
  {
    id: "mongo-47",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["Backup","mongodump","mongorestore"],
    question: "MongoDB Backup Strategies: mongodump / mongorestore vs Oplog Point-in-time Recovery কী?",
    answer: `
      <p>MongoDB-তে ব্যাকআপের তিনটি স্তর আছে, এবং এদের RPO ও পুনরুদ্ধারের ক্ষমতা সম্পূর্ণ ভিন্ন।</p>
      <table>
        <tr><th>পদ্ধতি</th><th>RPO</th><th>উপযুক্ত</th></tr>
        <tr><td><code>mongodump</code></td><td>শেষ dump পর্যন্ত</td><td>ছোট DB, উন্নয়ন, নির্দিষ্ট কালেকশন</td></tr>
        <tr><td>Filesystem snapshot</td><td>শেষ snapshot</td><td>বড় DB, দ্রুত পুনরুদ্ধার</td></tr>
        <tr><td><strong>Oplog PITR</strong></td><td><strong>সেকেন্ড</strong></td><td>প্রোডাকশন</td></tr>
      </table>
      <div class="code-box">
        <div class="code-header"><span>bash</span><button class="copy-btn">Copy</button></div>
        <pre><code># mongodump — oplog সহ নিলে সঙ্গতিপূর্ণ হয়
mongodump --uri="mongodb://..." --oplog --gzip --archive=backup.gz

# রিস্টোর — oplog রিপ্লে সহ
mongorestore --uri="..." --oplogReplay --gzip --archive=backup.gz

# নির্দিষ্ট সময় পর্যন্ত রিস্টোর (PITR)
mongorestore --oplogReplay --oplogLimit=1723276800:1 ...</code></pre>
      </div>
      <h4><code>--oplog</code> ফ্ল্যাগ কেন অপরিহার্য</h4>
      <p><code>mongodump</code> কালেকশনগুলো <em>একের পর এক</em> পড়ে — এতে সময় লাগে। এই সময়ে ডেটা বদলাতে থাকে, তাই dump-টি <strong>সঙ্গতিপূর্ণ নয়</strong>: users কালেকশন ১০:০০-এর অবস্থা, orders ১০:০৫-এর।</p>
      <p><code>--oplog</code> দিলে dump চলাকালের সব পরিবর্তনও সংগ্রহ করা হয়, এবং রিস্টোরে <code>--oplogReplay</code> সেগুলো প্রয়োগ করে একটি নির্দিষ্ট মুহূর্তের সঙ্গতিপূর্ণ অবস্থা তৈরি করে।</p>
      <h4>Point-in-Time Recovery (PITR)</h4>
      <p>PITR-এর ভিত্তি: <strong>একটি বেস ব্যাকআপ + তারপর থেকে ধারাবাহিক oplog</strong>। এতে "গতকাল দুপুর ২টা ১৫ মিনিটের অবস্থায় ফিরে যাও" সম্ভব হয় — যা দুর্ঘটনাক্রমে ডেটা মুছে ফেলা বা খারাপ ডিপ্লয়ের পর অমূল্য।</p>
      <p><strong>MongoDB Atlas</strong> এটি বিল্ট-ইন দেয় (continuous backup)। স্ব-হোস্টে oplog নিজে সংরক্ষণ করার ব্যবস্থা করতে হয় — অথবা Percona Backup for MongoDB-র মতো টুল ব্যবহার করতে হয়।</p>
      <h4>বাস্তব পরামর্শ</h4>
      <ul>
        <li><strong><code>mongodump</code> বড় ডাটাবেজে অনুপযুক্ত</strong> — এটি সব ডেটা মেমরি ও নেটওয়ার্ক দিয়ে টানে, ক্লাস্টারে চাপ ফেলে এবং রিস্টোরে ইনডেক্স পুনর্নির্মাণে ঘণ্টার পর ঘণ্টা লাগে। TB-স্কেলে filesystem snapshot অনেক দ্রুত।</li>
        <li><strong>Secondary নোড থেকে ব্যাকআপ নিন</strong> — primary-তে চাপ এড়াতে।</li>
        <li><strong>Sharded ক্লাস্টারে সমন্বয় জটিল</strong> — সব shard ও config server-এর সঙ্গতিপূর্ণ snapshot দরকার; balancer বন্ধ রেখে নিতে হয়।</li>
        <li><strong>রিস্টোর নিয়মিত পরীক্ষা করুন</strong> — অপরীক্ষিত ব্যাকআপ কার্যত ব্যাকআপ নয়। এটি সবচেয়ে বেশি উপেক্ষিত এবং সবচেয়ে গুরুত্বপূর্ণ পরামর্শ।</li>
        <li><strong>ব্যাকআপ ভিন্ন অঞ্চলে ও অপরিবর্তনীয় (immutable) স্টোরেজে রাখুন</strong> — র‍্যানসমওয়্যার ব্যাকআপও এনক্রিপ্ট করে ফেলতে পারে।</li>
      </ul>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>দুর্ঘটনাক্রমে একটি কালেকশন মুছে ফেললে দ্রুততম পুনরুদ্ধার কী?</li>
        <li>Oplog কতদিনের রাখা উচিত?</li>
      </ul>
    `
  },
  {
    id: "mongo-48",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Queries","Projection","Fields"],
    question: "MongoDB Projection ({ name: 1, _id: 0 }) দিয়ে নেটওয়ার্ক পে-লোড কীভাবে কমাবেন?",
    answer: `
      <p><strong>Projection</strong> নির্দিষ্ট করে দেয় কোন ফিল্ডগুলো ফেরত আসবে। এটি একটি সহজ কিন্তু প্রায়ই উপেক্ষিত অপ্টিমাইজেশন।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>// শুধু যা দরকার
db.users.find({ status: "active" }, { name: 1, email: 1, _id: 0 });

// অথবা যা বাদ দিতে চান
db.users.find({}, { passwordHash: 0, internalNotes: 0 });

// ⚠️ include ও exclude মেশানো যায় না (_id ছাড়া)
db.users.find({}, { name: 1, email: 0 });   // ❌ এরর

// অ্যারে projection
db.posts.find({}, { comments: { $slice: 5 } });        // প্রথম ৫টি
db.posts.find({}, { comments: { $slice: -3 } });       // শেষ ৩টি
db.orders.find(
  { "items.sku": "ABC" },
  { "items.$": 1 }                                      // শুধু মেলা এলিমেন্ট
);</code></pre>
      </div>
      <h4>কেন এটি গুরুত্বপূর্ণ</h4>
      <ul>
        <li><strong>নেটওয়ার্ক পেলোড:</strong> ১০০ KB ডকুমেন্ট থেকে ২ ফিল্ড লাগলে ৯৮% ডেটা অপচয়। ১০০০ ডকুমেন্টে এটি ১০০ MB বনাম ২ MB।</li>
        <li><strong>অ্যাপ্লিকেশনের মেমরি:</strong> কম ডেটা পার্স ও ধরে রাখতে হয়।</li>
        <li><strong>Covered query সম্ভব হয়:</strong> এটিই সবচেয়ে বড় লাভ — যদি কুয়েরির filter, sort ও projection-এর সব ফিল্ড <em>একটি ইনডেক্সেই</em> থাকে, তবে MongoDB ডকুমেন্ট পড়েই না, শুধু ইনডেক্স থেকে উত্তর দেয়। এটি নাটকীয়ভাবে দ্রুত।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.users.createIndex({ status: 1, name: 1, email: 1 });

db.users.find({ status: "active" }, { name: 1, email: 1, _id: 0 })
        .explain("executionStats");
// totalDocsExamined: 0  ← 🎉 covered query!
// stage: "PROJECTION_COVERED"</code></pre>
      </div>
      <p><strong><code>_id: 0</code> দিতে ভুলবেন না</strong> — <code>_id</code> ডিফল্টে ফেরত আসে, এবং সেটি ইনডেক্সে না থাকলে covered query ভেঙে যায়। এটি একটি অত্যন্ত সাধারণ ফাঁদ।</p>
      <h4>নিরাপত্তার দিক</h4>
      <p>Projection <strong>সংবেদনশীল ফিল্ড ফাঁস হওয়া ঠেকানোর</strong> একটি গুরুত্বপূর্ণ উপায়। <code>passwordHash</code>, <code>resetToken</code>, অভ্যন্তরীণ নোট — এগুলো কখনও API রেসপন্সে যাওয়া উচিত নয়।</p>
      <p><strong>Mongoose-এ আরও ভালো:</strong> schema-তে <code>select: false</code> দিলে ফিল্ডটি ডিফল্টে <em>কখনও</em> আসবে না — প্রতিটি কুয়েরিতে মনে রাখতে হয় না। এটিই নিরাপদ ডিফল্ট।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const userSchema = new Schema({
  email: String,
  passwordHash: { type: String, select: false }   // ✅ ডিফল্টে বাদ
});
// দরকার হলে স্পষ্টভাবে চাইতে হবে:
User.findOne({ email }).select('+passwordHash');</code></pre>
      </div>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Covered query-র শর্তগুলো কী কী?</li>
        <li>Aggregation-এ <code>$project</code> কোথায় রাখা উচিত?</li>
      </ul>
    `
  },
  {
    id: "mongo-49",
    category: "MongoDB",
    difficulty: "Advanced",
    tags: ["GridFS","Big Files","Chunks"],
    question: "MongoDB GridFS Architecture: fs.files vs fs.chunks দিয়ে ১৬MB-র বড় ফাইল স্টোর কীভাবে করা হয়?",
    answer: `
      <p>GridFS ১৬ MB সীমার চেয়ে বড় ফাইল দুটি কালেকশনে ভেঙে সংরক্ষণ করে — একটি মেটাডেটার জন্য, একটি আসল বাইটের জন্য।</p>
      <pre class="mermaid">
flowchart TD
    F["আপলোড হওয়া ফাইল<br/>(যেমন 50 MB ভিডিও)"] --> M["fs.files<br/>১টি ডকুমেন্ট"]
    F --> C1["fs.chunks<br/>chunk 0 (255 KB)"]
    F --> C2["fs.chunks<br/>chunk 1 (255 KB)"]
    F --> C3["fs.chunks<br/>... আরও ~200টি chunk"]
    M -.->|"files_id দিয়ে<br/>সংযুক্ত"| C1
    M -.-> C2
    M -.-> C3
      </pre>
      <span class="diagram-caption">একটি ফাইল = একটি metadata ডকুমেন্ট + বহু chunk ডকুমেন্ট</span>
      <h4>fs.files — মেটাডেটা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{
  _id: ObjectId("..."),
  length: 52428800,             // মোট বাইট
  chunkSize: 261120,             // ডিফল্ট ২৫৫ KB
  uploadDate: ISODate("..."),
  filename: "video.mp4",
  metadata: { userId: 42, contentType: "video/mp4" }   // কাস্টম ফিল্ড
}</code></pre>
      </div>
      <h4>fs.chunks — আসল ডেটা</h4>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>{
  _id: ObjectId("..."),
  files_id: ObjectId("..."),    // কোন ফাইলের অংশ
  n: 0,                          // ক্রম নম্বর (0, 1, 2, ...)
  data: BinData(0, "...")        // বাইনারি বাইট
}
// ইনডেক্স: { files_id: 1, n: 1 } — ক্রমানুসারে দ্রুত পড়ার জন্য</code></pre>
      </div>
      <h4>পড়া কীভাবে কাজ করে</h4>
      <p>ড্রাইভার প্রথমে <code>fs.files</code> থেকে মেটাডেটা পড়ে, তারপর <code>{files_id, n: 1}</code> ইনডেক্স ব্যবহার করে চাঙ্কগুলো <strong>ক্রমানুসারে</strong> এনে জোড়া লাগায় — একটি স্ট্রিম হিসেবে ক্লায়েন্টে পাঠায়। এই কারণেই GridFS <strong>range request</strong> সমর্থন করে (ভিডিও seek করার জন্য অত্যন্ত গুরুত্বপূর্ণ) — নির্দিষ্ট byte range-এর সাথে মিলে যাওয়া chunk-গুলো বেছে পড়া যায়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const bucket = new GridFSBucket(db, { bucketName: 'videos' });

fs.createReadStream('./movie.mp4')
  .pipe(bucket.openUploadStream('movie.mp4'));

bucket.openDownloadStreamByName('movie.mp4', {
  start: 1000000, end: 2000000    // শুধু একটি byte range
}).pipe(res);</code></pre>
      </div>
      <h4>বাস্তব সিদ্ধান্ত</h4>
      <p>কাঠামোটি সুন্দর হলেও, GridFS প্রায়ই <strong>ভুল পছন্দ</strong> প্রোডাকশনের জন্য:</p>
      <ul>
        <li><strong>ফাইল ডেটা WiredTiger cache দখল করে</strong> — আপনার আসল ট্রানজেকশনাল ডেটার জন্য কম RAM অবশিষ্ট থাকে।</li>
        <li><strong>খরচ বেশি:</strong> S3-এর মতো object storage MongoDB স্টোরেজের চেয়ে অনেক সস্তা।</li>
        <li><strong>CDN নেই:</strong> S3 থেকে সরাসরি CloudFront/Cloudflare-এ যায়; GridFS-এর ফাইল আপনার অ্যাপ্লিকেশন সার্ভার দিয়েই যেতে হয়।</li>
        <li><strong>Presigned URL সম্ভব নয়:</strong> S3-তে ব্রাউজার সরাসরি আপলোড/ডাউনলোড করতে পারে; GridFS-এ সবকিছু আপনার সার্ভারের মধ্য দিয়ে যায়।</li>
      </ul>
      <p><strong>স্ট্যান্ডার্ড আধুনিক প্যাটার্ন:</strong> ফাইল S3/R2-তে, MongoDB-তে শুধু URL ও metadata। GridFS কেবল যখন S3 ব্যবহার করা যায় না (এয়ার-গ্যাপড পরিবেশ) বা ফাইল-ডেটার মধ্যে অ্যাটমিক ট্রানজেকশন প্রয়োজন — তখনই যুক্তিসঙ্গত।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>GridFS-এ ফাইল মুছলে chunk-গুলো কীভাবে পরিষ্কার হয়?</li>
        <li>Chunk size পরিবর্তনে কী প্রভাব পড়ে?</li>
      </ul>
    `
  },
  {
    id: "mongo-50",
    category: "MongoDB",
    difficulty: "Intermediate",
    tags: ["Optimization","Hint","force index"],
    question: "db.collection.find().hint() দিয়ে নির্দিষ্ট ইনডেক্স জোরপূর্বক ব্যবহার কীভাবে করাবেন?",
    answer: `
      <p><code>hint()</code> MongoDB-কে বাধ্য করে একটি নির্দিষ্ট ইনডেক্স ব্যবহার করতে — কুয়েরি অপ্টিমাইজারের নিজস্ব পছন্দ উপেক্ষা করে।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>db.orders.find({ status: "pending", userId: 42 })
         .hint({ status: 1, createdAt: -1 });

db.orders.find({...}).hint("status_1_createdAt_-1");   // নাম দিয়েও

// ইনডেক্স সম্পূর্ণ এড়াতে
db.orders.find({...}).hint({ $natural: 1 });

// aggregation-এ
db.orders.aggregate(pipeline, { hint: { status: 1 } });</code></pre>
      </div>
      <h4>MongoDB কীভাবে ইনডেক্স বাছে</h4>
      <p>একটি নতুন কুয়েরি প্যাটার্নে MongoDB সম্ভাব্য সব ইনডেক্স দিয়ে <strong>সমান্তরালে</strong> কুয়েরি চালিয়ে দেখে (trial period) কোনটি দ্রুত। বিজয়ী পরিকল্পনাটি <strong>plan cache</strong>-এ রাখা হয় এবং পরবর্তী একই আকারের কুয়েরিতে সেটিই ব্যবহৃত হয়।</p>
      <p>Plan cache নির্দিষ্ট শর্তে খালি হয় — ইনডেক্স যোগ/বাদ, <code>collMod</code>, সার্ভার রিস্টার্ট, বা পারফরম্যান্স উল্লেখযোগ্যভাবে খারাপ হলে।</p>
      <h4>কখন <code>hint()</code> দরকার হয়</h4>
      <ul>
        <li><strong>অপ্টিমাইজার ভুল ইনডেক্স বাছছে:</strong> ডেটার বণ্টন বদলে গেলে বা trial period-এ অস্বাভাবিক নমুনা পেলে এটি ঘটতে পারে।</li>
        <li><strong>পূর্বানুমেয়তা দরকার:</strong> ক্রিটিক্যাল কুয়েরিতে অপ্টিমাইজারের সিদ্ধান্তের উপর নির্ভর না করা।</li>
        <li><strong>বেঞ্চমার্কিং:</strong> কোন ইনডেক্স আসলে ভালো তা তুলনা করতে।</li>
        <li><strong>Partial index ব্যবহারে বাধ্য করা।</strong></li>
      </ul>
      <h4>সতর্কতা — এটি সাধারণত শেষ উপায়</h4>
      <p><code>hint()</code> ব্যবহারের প্রয়োজন হওয়া প্রায়ই একটি সংকেত যে <strong>ইনডেক্স ডিজাইনে সমস্যা আছে</strong>। অপ্টিমাইজার সাধারণত সঠিক সিদ্ধান্ত নেয়; সে ভুল করছে মনে হলে আগে দেখুন:</p>
      <ul>
        <li>ইনডেক্সটি কি ESR নিয়ম মেনে তৈরি?</li>
        <li>অপ্রয়োজনীয় বা অতিসদৃশ ইনডেক্স আছে কি, যা অপ্টিমাইজারকে বিভ্রান্ত করছে?</li>
        <li><code>explain("allPlansExecution")</code> দিয়ে দেখুন MongoDB কেন অন্যটি বাছল।</li>
      </ul>
      <p><strong>বিপদ:</strong> hint হার্ডকোড করলে ভবিষ্যতে ডেটা বা ইনডেক্স বদলালে সেটি <em>খারাপ</em> পছন্দ হয়ে যেতে পারে — এবং অপ্টিমাইজার আর সংশোধন করতে পারবে না। তাছাড়া hint-এ দেওয়া ইনডেক্স মুছে ফেললে কুয়েরি সম্পূর্ণ ব্যর্থ হবে।</p>
      <p><strong>আধুনিক বিকল্প:</strong> MongoDB 4.4+ এ <strong>index filter</strong> (<code>planCacheSetFilter</code>) দিয়ে সার্ভার-স্তরে নির্দিষ্ট কুয়েরি আকারের জন্য ইনডেক্স সীমিত করা যায় — অ্যাপ্লিকেশন কোডে hint ছড়িয়ে না দিয়ে।</p>
      <h4>Follow-up প্রশ্ন</h4>
      <ul>
        <li>Plan cache কীভাবে পরীক্ষা ও পরিষ্কার করবেন?</li>
        <li>একই কুয়েরি কখনও দ্রুত কখনও ধীর — কী কারণ হতে পারে?</li>
      </ul>
    `
  }
];
