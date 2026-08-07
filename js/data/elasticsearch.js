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
  },
  {
    id: "es-19",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Architecture", "Sharding", "Primary vs Replica"],
    question: "Elasticsearch Index, Shard, Primary Shard, Replica Shard এবং Node Architecture কীভাবে কাজ করে?",
    answer: `
<p>ইনডেক্স লজিক্যাল কালেকশন। ডেটা পার্টিশন করে একাধিক Primary Shards-এ ছড়ানো হয়। প্রতিটি প্রাইমারি শার্ডের ১ বা একাধিক Replica Shards ভিন্ন ভিন্ন নোডে থাকে যা হাই-অ্যাভেইলেবিলিটি ও রিড স্কেলিং গ্যারান্টি দেয়।</p>
    `
  },
  {
    id: "es-20",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Analysis", "Analyzers", "Tokenizers"],
    question: "Elasticsearch Text Analysis: Character Filters, Tokenizer, এবং Token Filters (Lowercase, Stemming, Stopwords) কীভাবে কাজ করে?",
    answer: `
<p>text ফিল্ড ইনডেক্স করার সময় ৩টি ধাপে প্রসেস হয়:</p><ol><li><strong>Char Filter:</strong> HTML ট্যাগ মুছে ফেলা।</li><li><strong>Tokenizer:</strong> বাক্যাংশ ভেঙে আলাদা টোকেনে রূপান্তর (Standard/Whitespace)।</li><li><strong>Token Filter:</strong> সব স্মল লেটার করা, Stopwords বাদ দেওয়া ও Stemming (running -> run) করা।</li></ol>
    `
  },
  {
    id: "es-21",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Queries", "Match vs Term", "Query Context"],
    question: "Match Query vs Term Query এবং Query Context vs Filter Context-এর পার্থক্য কী?",
    answer: `
<p><strong>Match Query:</strong> ইনপুটকে এনালাইজ করে ফুল-টেক্সট সার্চ চালায়।</p><p><strong>Term Query:</strong> অনালফা-নিউমেরিক অন-এনালাইজড এক্স্যাক্ট ম্যাচ খোঁজে (Fast)।</p><p><strong>Filter Context:</strong> স্কোরিং করে না, রেসপন্স ক্যাশ করে (অত্যন্ত দ্রুত)।</p>
    `
  },
  {
    id: "es-22",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Aggregations", "Metric vs Bucket", "Analytics"],
    question: "Elasticsearch Aggregations: Metric Aggregations vs Bucket Aggregations (Terms, Date Histogram) কীভাবে কাজ করে?",
    answer: `
<p><strong>Metric:</strong> গাণিতিক হিসাব (SUM, AVG, MIN, MAX)।</p><p><strong>Bucket:</strong> ডকুমেন্টকে বিভিন্ন গ্রুপে (যেমন ক্যাটাগরি বা ডেট রেঞ্জ) ভাগ করে সাজায়। এর ভেতরে নেস্টেড সাব-এগ্রিগেশন চালানো যায়।</p>
    `
  },
  {
    id: "es-23",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Mapping", "Dynamic Mapping", "Explicit Mapping"],
    question: "Dynamic Mapping vs Explicit Mapping এবং Dynamic Templates কীভাবে কনফিগার করবেন?",
    answer: `
<p><strong>Dynamic Mapping:</strong> নতুন ফিল্ড ঢুকলে অটোমেটিক টাইপ গেস করে ইনডেক্স করা (ইনপ্রোডাকশনে বিপজ্জনক)।</p><p><strong>Explicit Mapping:</strong> প্রতিটি ফিল্ডের টাইপ (text, keyword, integer) ম্যানুয়ালি ডিফাইন করা।</p>
    `
  },
  {
    id: "es-24",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Text vs Keyword", "Field Types", "Mapping"],
    question: "Elasticsearch Text Field Type vs Keyword Field Type-এর পার্থক্য ও ব্যবহার কী?",
    answer: `
<p><strong>text:</strong> এনালাইজড ফুল-টেক্সট সার্চের জন্য (যেমন প্রডাক্ট ডেসক্রিপশন)।</p><p><strong>keyword:</strong> অন-এনালাইজড এক্স্যাক্ট ম্যাচ, সর্টিং, ফিল্টারিং এবং এগ্রিগেশনের জন্য (যেমন ইমেইল, স্ট্যাটাস কোড)।</p>
    `
  },
  {
    id: "es-25",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Search", "Bool Query", "must/filter/should"],
    question: "Elasticsearch Bool Query: must, filter, should, must_not এবং minimum_should_match কীভাবে কাজ করে?",
    answer: `
<p><strong>must:</strong> অবশ্যই মিলতে হবে (স্কোরিংয়ে প্রভাব ফেলে)।</p><p><strong>filter:</strong> অবশ্যই মিলতে হবে (স্কোরিং বাদ দিয়ে ফাস্ট ক্যাশড ফিল্টারিং)।</p><p><strong>should:</strong> মিললে বোনাস স্কোর পাবে।</p><p><strong>must_not:</strong> থাকা যাবে না।</p>
    `
  },
  {
    id: "es-26",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Reindex", "Scroll", "Task Management"],
    question: "Reindex API (POST _reindex) দিয়ে লাইভ ইনডেক্স মাইগ্রেশন কীভাবে করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>json</span><button class="copy-btn">Copy</button></div><pre><code>POST _reindex
{
  "source": { "index": "users_v1" },
  "dest": { "index": "users_v2" }
}</code></pre></div><p>প্রোডাকশনে ব্যাকগ্রাউন্ডে wait_for_completion=false দিয়ে এ্যাসিঙ্ক মাইগ্রেশন চালানো।</p>
    `
  },
  {
    id: "es-27",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Performance", "Bulk API", "Indexing Speed"],
    question: "Elasticsearch Bulk API (_bulk) এবং Refresh Interval টিউন করে ইনডেক্সিং স্পিড কীভাবে বাড়াবেন?",
    answer: `
<p>সিঙ্গেল ইনসার্ট না করে _bulk API দিয়ে ১-৫ MB ব্যাচে ডেটা পাঠানো। বাল্ক ইনডেক্সিংয়ের সময় index.refresh_interval: "-1" করে পরে 1s করা।</p>
    `
  },
  {
    id: "es-28",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search", "Multi-match", "Cross Fields"],
    question: "Multi-match Query Types: best_fields, most_fields, cross_fields-এর পার্থক্য কী?",
    answer: `
<p><strong>best_fields:</strong> যেকোনো একটি ফিল্ডে সর্বোচ্চ স্কোর পাওয়া ডকুমেন্টকে উপরে তোলে।</p><p><strong>most_fields:</strong> একাধিক ফিল্ডের স্কোর যোগ করে।</p><p><strong>cross_fields:</strong> একাধিক ফিল্ডকে মিলিয়ে ১টি বড় ফিল্ড হিসেবে সার্চ করে (e.g. first_name + last_name)।</p>
    `
  },
  {
    id: "es-29",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Internals", "Lucene", "Segments"],
    question: "Elasticsearch Internals: Lucene Segments, Immutable Segments, and Segment Merging (forcemerge) কী?",
    answer: `
<p>Lucene শার্ডের ভেতরে থাকা ডেটা ফাইলগুলোকে Segment বলে। এগুলো Immutable (অপরিবর্তনযোগ্য)। ডিলিট করলে ডিলিট বিটম্যাপে মার্ক হয়। ব্যাকগ্রাউন্ডে অটোমেটিক Segment Merge প্রসেস ছোট ফাইল যুক্ত করে জায়গা ফিনিক্স করে।</p>
    `
  },
  {
    id: "es-30",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search", "Prefix", "Wildcard"],
    question: "Prefix Query, Wildcard Query, এবং Regexp Query কেন স্লো এবং search_as_you_type ফিল্ড কীভাবে এটি ফিক্স করে?",
    answer: `
<p>লিডিং ওয়াইল্ডকার্ড (e.g. *phone) ইনভার্সড ইনডেক্স স্কিপ করে সব টার্ম স্ক্যান করে। search_as_you_type টাইপ ফিল্ড n-grams তৈরি করে সার্চের সময় দ্রুত অটো-কমপ্লিট অফার করে।</p>
    `
  },
  {
    id: "es-31",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["ILM", "Lifecycle", "Hot Warm Cold"],
    question: "Index Lifecycle Management (ILM): Hot, Warm, Cold, Frozen, Delete Phases কীভাবে ডিস্ক ও RAM সাশ্রয় করে?",
    answer: `
<p><strong>Hot:</strong> রাইট ও রিড (ফাস্ট SSD)। <strong>Warm:</strong> নো রাইট, কেবল রিড। <strong>Cold:</strong> বিরল রিড (HDD)। <strong>Frozen:</strong> ডিস্কে মাউন্ট করা। <strong>Delete:</strong> অটোমেটিক ইনডেক্স ডিলিট।</p>
    `
  },
  {
    id: "es-32",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Cluster", "Master Node", "Split Brain"],
    question: "Master-eligible Nodes, Voting Only Nodes, এবং Split-Brain Condition কীভাবে প্রতিরোধ করবেন?",
    answer: `
<p>ক্লাস্টার মেটাডাটা নিয়ন্ত্রণে Master Node ব্যবহৃত হয়। cluster.no_master_block এবং মেজোরিটি Voting Nodes (Quorum = N/2 + 1) রেখে স্প্লিট ব্রেইন আটকানো হয়।</p>
    `
  },
  {
    id: "es-33",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Search", "Function Score", "Custom Scoring"],
    question: "Function Score Query এবং Decay Functions (gauss, exp, lin) দিয়ে কাস্টম র‍্যাঙ্কিং কীভাবে করবেন?",
    answer: `
<p>টেক্সট ম্যাচের স্কোরের সাথে প্রডাক্টের রেটিং, পপুলারিটি বা রিলিজের তারিখের ওপর ভিত্তি করে কাস্টম স্কোর যোগ করা (e.g. নতুন আইটেমকে সার্চের উপরে তোলা)।</p>
    `
  },
  {
    id: "es-34",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Index Template", "Component Template", "Dynamic"],
    question: "Index Templates and Component Templates (index_patterns) কীভাবে স্বয়ংক্রিয় ইনডেক্স সেটিংস ও ম্যাপিং দেয়?",
    answer: `
<p>index_patterns: ["logs-*"] সেট করে রাখলে ভবিষ্যতে logs-2026-08 নামের যেকোনো ইনডেক্স তৈরি হলে তা অটোমেটিক কাস্টম টেমপ্লেট সেটিংস ও ম্যাপিং পেয়ে যাবে।</p>
    `
  },
  {
    id: "es-35",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Vector Search", "kNN", "Dense Vector"],
    question: "Elasticsearch kNN (k-Nearest Neighbors) and dense_vector field type দিয়ে Vector Search কীভাবে করবেন?",
    answer: `
<p>dense_vector ফিল্ডে AI Model-এর ভেক্টর এমবেডিংস রেখে HNSW ইনডেক্স টাইপ ব্যবহার করে ডাইনামিক সিমান্টিক সিমিলারিটি কোয়েরি চালানো।</p>
    `
  },
  {
    id: "es-36",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Ops", "Cat API", "_cat"],
    question: "Elasticsearch _cat API (_cat/shards, _cat/indices, _cat/nodes) দিয়ে টার্মিনাল ডেবাগিং কীভাবে করবেন?",
    answer: `
<p>GET /_cat/shards?v চালালে মানুষের পাঠযোগ্য ট্যাবুলার ফরম্যাটে শার্ডগুলোর অবস্থান, সাইজ, এবং স্ট্যাটাস পাওয়া যায়।</p>
    `
  },
  {
    id: "es-37",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Circuit Breakers", "Parent Breaker", "OOM"],
    question: "Elasticsearch Circuit Breakers (indices.breaker.total.use_real_memory) কীভাবে OOM Crash প্রতিরোধ করে?",
    answer: `
<p>কোনো এগ্রিগেশন বা কোয়েরি চালানোর আগে সেটির প্রয়োজনীয় RAM আনুমানিক হিসাব করে। মেমোরি সীমা (e.g. 95% of Heap) পার হতে লাগলে Circuit Breaker সাথে সাথে কোয়েরি রিজেক্ট করে ক্লাস্টার বাঁচায়।</p>
    `
  },
  {
    id: "es-38",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Mapping", "copy_to", "Search All"],
    question: "Elasticsearch copy_to Mapping Parameter কীভাবে একাধিক ফিল্ড একসাথে কম্বাইন করে?",
    answer: `
<p>first_name এবং last_name কলামে copy_to: "full_name" বসালে ES ব্যাকগ্রাউন্ডে ২ ফিল্ডের মান full_name ফিল্ডে মার্জ করে সার্চ সহজ করে।</p>
    `
  },
  {
    id: "es-39",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Ops", "Snapshot and Restore", "S3 Plugin"],
    question: "Snapshot and Restore API (repository-s3) দিয়ে ব্যাকআপ ও রিকভারি কীভাবে করবেন?",
    answer: `
<p>S3 বা গিগাবাইট স্টোরেজে রেজিস্টার্ড রিপোজিটরি তৈরি করে PUT /_snapshot/my_s3_repository/snapshot_1 দিয়ে ইনক্রিমেন্টাল ব্যাকআপ নেওয়া।</p>
    `
  },
  {
    id: "es-40",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Queries", "Geo", "geo_point"],
    question: "geo_point vs geo_shape field type এবং geo_distance query কীভাবে কাজ করে?",
    answer: `
<p><strong>geo_point:</strong> Latitude/Longitude সিঙ্গেল পিন পয়েন্ট।</p><p><strong>geo_shape:</strong> বহুভুজ বা পলিগন (Polygon/Line) এরিয়াস। geo_distance দিয়ে নির্দিষ্ট ব্যাসার্ধের মধ্যে সার্চ করা।</p>
    `
  },
  {
    id: "es-41",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Internals", "Translog", "Flush"],
    question: "Elasticsearch Translog (Transactional Log) এবং Flush Operation কীভাবে ডেটা স্থায়িত্ব গ্যারান্টি দেয়?",
    answer: `
<p>ইনডেক্স করার সাথে সাথেই মেমোরিতে অপূর্ণ কাজ Translog ফাইলে লেখা হয়। Flush অপারেশন ঘটার সময় মেমোরির ইনডেক্স গ্যারান্টিসহ ডিস্কের ল্যুসিনের স্থায়ী সেগমেন্টে পরিণত হয়।</p>
    `
  },
  {
    id: "es-42",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search", "Rescore", "Top N"],
    question: "Elasticsearch Rescore Query দিয়ে শীর্ষ ৫০টি ডকুমেন্টের র‍্যাঙ্কিং কীভাবে টিউন করবেন?",
    answer: `
<p>প্রথম ধাপে দ্রুত ফাস্ট কুয়েরি দিয়ে ১০০০টি ডকুমেন্ট শর্টলিস্ট করা। ২য় ধাপে rescore উইন্ডো বসিয়ে কেবল প্রথম ৫০টি ডকুমেন্টের ওপর জটিল ভারী মডেল চালিয়ে র‍্যাঙ্ক টিউন করা।</p>
    `
  },
  {
    id: "es-43",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Security", "X-Pack", "RBP"],
    question: "Elasticsearch Security: Role-Based Access Control (RBAC), Document Level Security (DLS), and Field Level Security (FLS) কী?",
    answer: `
<p><strong>DLS:</strong> নির্দিষ্ট শর্তে (e.g. user_id == current_user) ইউজারকে কেবল তার নিজের ডকুমেন্ট দেখতে দেওয়া।</p><p><strong>FLS:</strong> রেসপন্স থেকে পাসওয়ার্ড বা সিক্রেট কলাম লুকানো।</p>
    `
  },
  {
    id: "es-44",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Mapping", "coerce", "ignore_malformed"],
    question: "Elasticsearch ignore_malformed and coerce mapping parameters কীভাবে ইনপুট এরর সামলায়?",
    answer: `
<p>ignore_malformed: true সেট করলে কোনো ডকুমেন্টের ১টি ফিল্ডে ভুল টাইপ থাকলেও সম্পূর্ণ ডকুমেন্ট রিজেক্ট না করে কেবল ওই ফিল্ডটি স্কিপ করে ইনডেক্স করে।</p>
    `
  },
  {
    id: "es-45",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Pipeline", "Ingest Node", "Grok"],
    question: "Ingest Pipelines (_ingest/pipeline) and Grok Processors দিয়ে ইনকামিং লগ পার্সিং কীভাবে করবেন?",
    answer: `
<p>ইনডেক্স হওয়ার ঠিক আগের মুহূর্তে ইনগেস্ট নোডে Grok, Date, GeoIP প্রসেসর চালিয়ে আনস্ট্রাকচার্ড কাস্টম র-লগ স্ট্রিংকে ডাইনামিক ফিল্ডে বিভক্ত করা।</p>
    `
  },
  {
    id: "es-46",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search", "Highlighting", "Fast Vector Highlighter"],
    question: "Unified Highlighter vs Fast Vector Highlighter (FVH) এর পার্থক্য কী?",
    answer: `
<p>বড় ফাইলে সাধারণ হাইলাইটার স্লো। term_vector: "with_positions_offsets" ইনডেক্স সেটিংস যুক্ত থাকলে Fast Vector Highlighter অতি দ্রুত গতির টেক্সট ফ্র্যাগমেন্টেশন অফার করে।</p>
    `
  },
  {
    id: "es-47",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Aggregations", "Significant Terms", "Anomaly"],
    question: "Significant Terms Aggregation দিয়ে ট্রেন্ড বা অস্বাভাবিকতা ডিটেক্ট কীভাবে করবেন?",
    answer: `
<p>সামগ্রিক ডাটাবেজের তুলনায় নির্দিষ্ট ফিল্টারে কোন কোন শব্দ বা কি-ওয়ার্ড অস্বাভাবিকভাবে বেশি দেখা যাচ্ছে (e.g. ফ্রড ডিটেকশন বা ট্রেন্ডিং টপিক) তা বের করা।</p>
    `
  },
  {
    id: "es-48",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search", "Explain API", "_explain"],
    question: "Elasticsearch Explain API (GET /index/_explain/id) দিয়ে কেন কোনো ডকুমেন্ট সার্চে আসল না তা ডেবাগ কীভাবে করবেন?",
    answer: `
<p>নির্দিষ্ট ডকুমেন্ট আইডি দিয়ে _explain কোয়েরি চালালে কেন এটি স্কোর পেল না বা কোন ফিল্টারে আটকে বাদ পড়েছে তার বিস্তারিত কারণ জানিয়ে দেয়।</p>
    `
  },
  {
    id: "es-49",
    category: "Elasticsearch",
    difficulty: "Advanced",
    tags: ["Performance", "Heap Size", "32GB Limit"],
    question: "Elasticsearch Heap Size Setting: 31GB এর বেশি RAM বরাদ্দ করা কেন ক্ষতিকর (Compressed OOPs)?",
    answer: `
<p>JVM Heap 32GB এর নিচে থাকলে ৬৪-বিট পয়েন্টারকে ৩২-বিট Compressed Ordinary Object Pointers (Compressed OOPs) হিসেবে চালায় যা RAM সাশ্রয় করে। ৩২GB পার হলে এই অপটিমাইজেশন লস হয়ে অতিরিক্ত RAM অপচয় হয়।</p>
    `
  },
  {
    id: "es-50",
    category: "Elasticsearch",
    difficulty: "Intermediate",
    tags: ["Search", "Search Templates", "Mustache"],
    question: "Search Templates (_render/template) and Mustache Templating কীভাবে সার্চ কোয়েরি ডিকুপল করে?",
    answer: `
<p>জটিল JSON সার্চ কুয়েরি ডাটাবেজে টেমপ্লেট হিসেবে সেভ রেখে প্যারামিটারাইজড আকারে (e.g. { "query": { "match": { "title": "{{query_string}}" } } }) ক্লায়েন্ট থেকে কল করা।</p>
    `
  }
];
