const elasticsearchQuestions = [
  {
    id: "es-1",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Inverted Index", "Lucene", "Architecture"],
    question: "Elasticsearch-এ Inverted Index কী এবং এটি কীভাবে টেক্সট সার্চকে মিলিসেকেন্ডে সম্পাদন করে?",
    answer: `
      <p><strong>Inverted Index:</strong> এটি এমন একটি বিশেষ সার্চ ডেটা স্ট্রাকচার যা বইয়ের শেষের ইনডেক্স সূচির মতো কাজ করে। প্রতিটি ডকুমেন্টের পুরো টেক্সট পড়ার বদলে এটি টেক্সটকে ছোট ছোট শব্দে (Tokens) ভেঙে প্রতিটি শব্দ কোন কোন ডকুমেন্টে এবং কত নম্বর পজিশনে আছে তার একটি ম্যাপ বজায় রাখে।</p>
      <h4>Inverted Index কীভাবে তৈরি হয়:</h4>
      <p>ধরা যাক ২টি ডকুমেন্ট রয়েছে:</p>
      <ul>
        <li>Doc 1: "Quick brown fox"</li>
        <li>Doc 2: "Fast brown dog"</li>
      </ul>
      <p>Elasticsearch-এর <strong>Lucene Engine</strong> ইনভার্টেড ইনডেক্স তৈরি করবে এভাবে:</p>
      <div class="code-box">
        <div class="code-header"><span>text</span><button class="copy-btn">Copy</button></div>
        <pre><code>Term      | Document IDs
------------------------
Quick     | [Doc 1]
Fast      | [Doc 2]
brown     | [Doc 1, Doc 2]
fox       | [Doc 1]
dog       | [Doc 2]</code></pre>
      </div>
      <p>এখন ইউজার "brown" লিখে সার্চ করলে Elasticsearch কোনো টেবিল স্ক্যান না করে ইনভার্টেড ইনডেক্স দেখে ১ মিলি-সেকেন্ডেই Doc 1 ও Doc 2 রিটার্ন করে দিতে পারে।</p>
    `
  },
  {
    id: "es-2",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Analyzer", "Tokenizer", "Stemming"],
    question: "Elasticsearch Text Analyzer কী? Character Filter, Tokenizer এবং Token Filter-এর কাজ কী?",
    answer: `
      <p>Elasticsearch-এ যখনই কোনো <code>text</code> টাইপ কলামে ইনডেক্স বা সার্চ করা হয়, তখন **Analyzer** সেই স্ট্রিংকে প্রসেস করে ইনভার্টেড ইনডেক্সের টার্মে রূপান্তর করে।</p>
      <h4>Analyzer-এর ৩টি পর্যায় (Pipeline):</h4>
      <ol>
        <li><strong>Character Filter:</strong> মূল স্ট্রিম থেকে অপছন্দনীয় ক্যারেক্টার ছেঁটে ফেলে বা মডিফাই করে (যেমন: HTML ট্যাগ <code>&lt;p&gt;</code> রিমুভ করা)।</li>
        <li><strong>Tokenizer:</strong> টেক্সটকে আলাদা আলাদা টোকেন বা শব্দে ভেঙে ফেলে (যেমন: স্পেস বা পাঙ্কচুয়েশন ধরে শব্দ আলাদা করা)।</li>
        <li><strong>Token Filter:</strong> টোকেনগুলোকে ছোট হাতের বর্ণে রূপান্তর (Lowercase), অতিরিক্ত সাধারণ শব্দ ছাঁটাই (Stopwords filter like 'is', 'the'), এবং মূল মূলে রূপান্তর (Stemming e.g., 'running' -> 'run') করে।</li>
      </ol>
    `
  },
  {
    id: "es-3",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Query DSL", "bool query", "filter vs must"],
    question: "Elasticsearch Query DSL-এ bool Query-এর must, filter, should, এবং must_not-এর পার্থক্য এবং Scoring (Relevance Score) কীভাবে কাজ করে?",
    answer: `
      <p>Elasticsearch-এ জটিল সার্চ লজিক লিখতে <strong>Query DSL (Domain Specific Language)</strong> ব্যবহার করা হয়। <code>bool</code> কুয়েরি দিয়ে একাধিক কন্ডিশন ব্লকে ভাগ করা হয়:</p>
      <ul>
        <li><code>must:</code> কন্ডিশন অবশ্যই মিলতে হবে এবং ডকুমেন্টের **Relevance Score (_score)** গণনায় প্রভাব ফেলবে।</li>
        <li><code>filter:</code> কন্ডিশন মিলতেই হবে, কিন্তু কোনো **Relevance Score হিসেব করে না**। এটি মেমোরিতে **Filter Cache** তৈরি করে, ফলে <code>must</code>-এর চেয়ে অনেক বেশি দ্রুত।</li>
        <li><code>should:</code> কন্ডিশন মেলা বাধ্যতামূলক নয়, তবে মিললে ডকুমেন্টের <code>_score</code> বা র্যাঙ্কিং বাড়িয়ে উপরে তুলবে (OR কন্ডিশনের মতো)।</li>
        <li><code>must_not:</code> এই কন্ডিশনের সাথে মিলে যাওয়া ডকুমেন্ট বাদ দেওয়া হবে (Score = 0)।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /products/_search
{
  "query": {
    "bool": {
      "must": [ { "match": { "name": "laptop" } } ],
      "filter": [ { "term": { "status": "ACTIVE" } }, { "range": { "price": { "lte": 1000 } } } ],
      "should": [ { "match": { "brand": "Apple" } } ]
    }
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "es-4",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Term Query", "Match Query", "Mapping"],
    question: "Term Query এবং Match Query-এর মধ্যে পার্থক্য কী এবং text vs keyword কলামের ভূমিকা কী?",
    answer: `
      <p>Elasticsearch-এ স্ট্রিং ফিল্ড ডিক্লেয়ার করার সময় কলামের ২ ধরনের ডাটা টাইপ থাকে:</p>
      <ul>
        <li><code>text:</code> অ্যানেলাইজড (Analyzed) হয়। ইনভার্টেড ইনডেক্সে ফুল টেক্সট সার্চের জন্য টোকেনাইজড হয়ে সেভ হয়।</li>
        <li><code>keyword:</code> আন-অ্যানেলাইজড (Not Analyzed)। সম্পূর্ণ স্ট্রিমটি ঠিক যেভাবে দেওয়া হয়েছে সেভাবেই ইনডেক্স হয় (Exact Matching)।</li>
      </ul>
      <h4>Term Query vs Match Query:</h4>
      <ul>
        <li><strong>Term Query:</strong> নিখুঁত হুবহু মেচিং (Exact Match) নিশ্চিত করে। এটি ইনপুটকে কোনো অ্যানালাইজ করে না। সবসময় <code>keyword</code> কলামের ওপর চালাতে হয়।</li>
        <li><strong>Match Query:</strong> ইনপুট টেক্সটকে অ্যানালাইজ (Tokenize/Lowercase) করে ইনভার্টেড ইনডেক্সে মেলায়। ফুল-টেক্সট সার্চের জন্য ব্যবহৃত হয়।</li>
      </ul>
    `
  },
  {
    id: "es-5",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Cluster", "Shards", "Node Types"],
    question: "Elasticsearch Cluster Architecture কীভাবে কাজ করে? Master Node, Data Node, Primary Shard এবং Replica Shard বুঝিয়ে বলুন।",
    answer: `
      <p>Elasticsearch একটি মাস্টারলেস ফিলিং ডিস্ট্রিবিউটেড ক্লাস্টার সিস্টেম হিসেবে কাজ করে:</p>
      <h4>Node Types:</h4>
      <ul>
        <li><strong>Master-eligible Node:</strong> ক্লাস্টারের মেটাডেটা নিয়ন্ত্রণ, ইনডেক্স তৈরি/ডিলেট এবং শার্ড অ্যালোকেশন দেখভাল করে।</li>
        <li><strong>Data Node:</strong> আসল ইনডেক্স করা ডাটা স্টোর করে এবং কুয়েরি ও এগ্রিগেশন এক্সিকিউট করে। (RAM & SSD নির্ভর)।</li>
        <li><strong>Ingest Node:</strong> ইনডেক্সিংয়ের আগে ডাটা প্রি-প্রসেস বা ট্রান্সফর্ম করে।</li>
      </ul>
      <h4>Primary vs Replica Shards:</h4>
      <p>একটি Index একাধিক <strong>Primary Shard</strong>-এ বিভক্ত থাকে যা বহু নোডে ছড়িয়ে থাকে। প্রতিটি Primary Shard-এর ১ বা একাধিক <strong>Replica Shard</strong> থাকে যা হাই-অ্যাভেইল্যাবিলিটি ও ডাটা লস রোধ নিশ্চিত করে এবং রিড পারফরম্যান্স বাড়ায়।</p>
    `
  },
  {
    id: "es-6",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Aggregations", "Metrics", "Buckets"],
    question: "Elasticsearch Aggregations কী? Bucket Aggregations এবং Metric Aggregations-এর উদাহরণ দিন।",
    answer: `
      <p><strong>Aggregations:</strong> এটি SQL-এর <code>GROUP BY</code> এবং এগ্রিগেট মেথডের থেকেও অনেক শক্তিশালী অ্যানালিটিক্যাল ফ্রেমওয়ার্ক যা সার্চ রেজাল্টের ওপর রিয়াল-টাইম স্ট্যাটিস্টিক্স হিসেব করে।</p>
      <h4>২ প্রধান টাইপ:</h4>
      <ol>
        <li><strong>Bucket Aggregations:</strong> ডকুমেন্টগুলোকে নির্দিষ্ট কন্ডিশন অনুসারে বালতিতে (Bucket) বিভক্ত করে (SQL GROUP BY-এর সমতুল্য)। যেমন: <code>terms</code>, <code>date_histogram</code>, <code>range</code>।</li>
        <li><strong>Metric Aggregations:</strong> বিভক্ত বা সম্পূর্ণ ডকুমেন্টের ওপর গাণিতিক হিসেব বের করে। যেমন: <code>avg</code>, <code>sum</code>, <code>min</code>, <code>max</code>, <code>stats</code>।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div>
        <pre><code>GET /sales/_search
{
  "size": 0,
  "aggs": {
    "by_category": {
      "terms": { "field": "category.keyword" },
      "aggs": { "avg_price": { "avg": { "field": "price" } } }
    }
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "es-7",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Mapping", "Explicit Mapping"],
    question: "Elasticsearch Mapping কী? Dynamic Mapping-এর ঝুঁকি এবং Explicit Mapping কেন প্রয়োজন?",
    answer: `
      <p><strong>Mapping:</strong> ডাটাবেজ স্কিমার মতোই Mapping হলো Elasticsearch-এর একটি ব্লুপ্রিন্ট যা নির্ধারণ করে ডকুমেন্টের কোন ফিল্ডের ডাটা টাইপ (text, keyword, integer, date, geo_point) কী হবে এবং কীভাবে ইনডেক্স হবে।</p>
      <h4>Dynamic Mapping Risk:</h4>
      <p>ডিফল্টভাবে Elasticsearch নতুন কোনো JSON ফিল্ড পেলেই নিজে টাইপ গেস করে Dynamic Mapping তৈরি করে নেয়। এতে কোনো তারিখ String বা সংখ্যা Float হিসেবে ভুলভাবে ম্যাপ হয়ে মেমোরি ওয়েস্ট ও কুয়েরি এরর ঘটাতে পারে।</p>
      <p><em>সমাধান:</em> প্রোডাকশন ক্লাস্টারে ইনডেক্স বানানোর সময়ই কাস্টম **Explicit Mapping** ডিক্লেয়ার করে রাখা।</p>
    `
  },
  {
    id: "es-8",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Performance", "Bulk API", "Reindex"],
    question: "Elasticsearch Bulk API এবং Reindex API-এর ব্যবহার কী?",
    answer: `
      <ul>
        <li><strong>Bulk API:</strong> লাখ লাখ ডকুমেন্ট একে একে সিঙ্গেল HTTP রিকোয়েস্টে ইনডেক্স না করে, একটি মাত্র HTTP রিকোয়েস্টে ব্যাচ আকারে (Batch index/update/delete) ইনডেক্সিং করার মেথড। এটি ইনডেক্সিং স্পিড ১০০ গুণ বাড়িয়ে দেয়।</li>
        <li><strong>Reindex API:</strong> Elasticsearch-এ একবার কোনো ইনডেক্সের কলাম টাইপ বা Mapping ডিক্লেয়ার হয়ে গেলে তা সরাসরি পরিবর্তন করা যায় না। Reindex API দিয়ে পুরোনো ইনডেক্স থেকে নতুন পরিবর্তিত Mapping-এর ইনডেক্সে ডাটা মাইগ্রেট করা হয়।</li>
      </ul>
    `
  },
  {
    id: "es-9",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Node.js", "@elastic/elasticsearch"],
    question: "Node.js (official elasticsearch client) দিয়ে Elasticsearch-এ সার্চ করার উদাহরণ দিন।",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function searchProducts(searchTerm) {
  const result = await client.search({
    index: 'products',
    query: {
      bool: {
        must: [ { match: { name: searchTerm } } ],
        filter: [ { term: { inStock: true } } ]
      }
    }
  });

  const hits = result.hits.hits.map(hit => hit._source);
  console.log('Search Results:', hits);
}
searchProducts('wireless headphones');</code></pre>
      </div>
    `
  },
  {
    id: "es-10",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["ILM", "Index Lifecycle", "Hot Warm Cold"],
    question: "Elasticsearch Index Lifecycle Management (ILM) এবং Hot-Warm-Cold Architecture কী?",
    answer: `
      <p>টাইম-সিরিজ ডাটা (যেমন প্রতিদিনের সার্ভার লগ) ম্যানেজ করার জন্য **ILM** ব্যবহার করা হয়:</p>
      <ul>
        <li><strong>Hot Phase:</strong> নতুন ডাটা ইনডেক্স ও সার্চ হচ্ছে (Fast NVMe SSD & High CPU Node)।</li>
        <li><strong>Warm Phase:</strong> রাইট বন্ধ, কেবল সার্চ হচ্ছে (Standard SSD, Shards system shrunk)।</li>
        <li><strong>Cold Phase:</strong> কদাচিৎ সার্চ হয় (Cheap HDD storage, Replicas reduced)।</li>
        <li><strong>Delete Phase:</strong> নির্দিষ্ট দিন (যেমন ৩০ দিন) পর ইনডেক্স স্বয়ংক্রিয়ভাবে ডিলেট হওয়া।</li>
      </ul>
    `
  }
,

  {
    id: "es-11",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Data Modeling","Mapping","Nested"],
    question: "Elasticsearch-এ Nested Object Mapping এবং Parent-Join (Join Field) Mapping-এর পার্থক্য কী?",
    answer: `
<p><strong>Nested Object:</strong> ভেতরের অবজেক্ট আলাদা হিডেন ডকুমেন্টে ইনডেক্স করে (সার্চ ফাস্ট, আপডেট করার সময় পুরো অবজেক্ট রিক্রিয়েট করতে হয়)।</p>
    <p><strong>Parent-Join:</strong> সম্পূর্ণ স্বাধীন চাইল্ড ডকুমেন্ট বানিয়ে পয়েন্ট করে (একক চাইল্ড ইন্ডিপেনডেন্টলি আপডেট করা সহজ)।</p>
    `
  },
  {
    id: "es-12",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search","Fuzzy","Algorithms"],
    question: "Elasticsearch Fuzzy Query কীভাবে Levenshtein Edit Distance ব্যবহার করে?",
    answer: `
<p>Fuzzy Query টাইপো বা বানান ভুল সংশোধন করে। এটি Levenshtein Distance অ্যালগরিদম দিয়ে শব্দের অমিল ক্যারেক্টার হিসাব করে সঠিক ম্যাচ নিয়ে আসে।</p>
    `
  },
  {
    id: "es-13",
    category: "Elasticsearch",
    difficulty: "Beginner",
    tags: ["Search","Highlighting","UI"],
    question: "Elasticsearch-এ Highlighting Search Results কীভাবে কাজ করে?",
    answer: `
<p>সার্চ রেজাল্টে ম্যাচ করা কি-ওয়ার্ড ফ্র্যাগমেন্টগুলোকে UI-তে দেখানোর জন্য <code>&lt;mark&gt;</code> বা <code>&lt;em&gt;</code> ট্যাগে র্যা প করে রেসপন্সে পাঠায়।</p>
    `
  },
  {
    id: "es-14",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Internals","Memory","Doc Values"],
    question: "Elasticsearch Inverted Index-এর সাথে Doc Values এবং Fielddata-র পার্থক্য কী?",
    answer: `
<p>Inverted Index টেক্সট সার্চের জন্য (Term -> Doc ID)। Doc Values হলো ডিস্ক-বেসড কলামনার স্ট্রাকচার যা RAM না বাড়িয়ে Sorting/Aggregation করায়।</p>
    `
  },
  {
    id: "es-15",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Pagination","Search After","Scroll"],
    question: "Elasticsearch-এ Deep Pagination-এর জন্য Search After কেন ব্যবহার করা হয়?",
    answer: `
<p><code>from + size</code> দিয়ে ১০,০০০ এর বেশি ডকুমেন্ট স্ক্যান করলে মেমোরিতে অতিরিক্ত লোড পড়ে। <code>search_after</code> দিয়ে লাইভ স্টেটলেস সিকুয়েন্সিয়াল পেজিনেশন করা অত্যন্ত এফিশিয়েন্ট।</p>
    `
  },
  {
    id: "es-16",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Ops","Aliases","Reindex"],
    question: "Elasticsearch Index Aliases কীভাবে Zero-Downtime Reindexing নিশ্চিত করে?",
    answer: `
<p>ইনডেক্সের ওপর Alias পয়েন্টার ব্যবহার করে ব্যাকগ্রাউন্ডে নতুন ইনডেক্স তৈরি করে ডেটা কপি করা হয় এবং অটমিকালি এলিয়াস সোয়াপ করে ডাউনটাইম মুক্ত আপডেট অর্জন করা হয়।</p>
    `
  },
  {
    id: "es-17",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Search","Percolator","Reverse Search"],
    question: "Elasticsearch Percolator Query কী?",
    answer: `
<p>Percolator কুয়েরিগুলোকে ডকুমেন্ট হিসেবে ইনডেক্স করে রিভার্স সার্চ অফার করে। নতুন ইনকামিং ডকুমেন্ট ঢুকলে তা কোন কোন সেভড কুয়েরির সাথে ম্যাচ করে তা তাৎক্ষণিক জানা যায়।</p>
    `
  },
  {
    id: "es-18",
    category: "Elasticsearch",
    difficulty: "Beginner",
    tags: ["Monitoring","Cluster","Health"],
    question: "Elasticsearch Cluster Health-এর ৩টি স্টেট (Green, Yellow, Red) কী নির্দেশ করে?",
    answer: `
<p>Green = সব প্রাইমারি ও রেপ্লিকা শার্ড ওকে। Yellow = প্রাইমারি ওকে কিন্তু অন্তত ১টি রেপ্লিকা শার্ড আনঅ্যালোকেটেড। Red = অন্তত ১টি প্রাইমারি শার্ড মিসিং বা ড্যামেজড।</p>
    `
  }
];
