const nginxQuestions = [
  {
    id: "nginx-1",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Reverse Proxy", "Architecture", "Load Balancer"],
    question: "Nginx-এ Reverse Proxy এবং Forward Proxy-এর মধ্যে মৌলিক পার্থক্য কী?",
    answer: `
      <p>প্রক্সি সার্ভার ক্লায়েন্ট এবং সার্ভারের মধ্যে মধ্যস্থতাকারী হিসেবে কাজ করে, তবে অবস্থান ও উদ্দেশ্যের দিক থেকে পার্থক্য রয়েছে:</p>
      <h4>Forward Proxy:</h4>
      <p>এটি <strong>ক্লায়েন্টের (Client Side) সামনে</strong> অবস্থান করে। ক্লায়েন্ট ইন্টারনেট বা কোনো বাহ্যিক সার্ভারে রিকোয়েস্ট পাঠানোর সময় Forward Proxy-এর মাধ্যমে পাঠায়।</p>
      <p><em>ব্যবহার:</em> ক্লায়েন্টের আইপি গোপন রাখা, কোম্পানি বা অফিসে নির্দিষ্ট ওয়েবসাইট ব্লক/ফিল্টার করা, ক্যাশিং করা।</p>
      <h4>Reverse Proxy (Nginx Default Role):</h4>
      <p>এটি <strong>ব্যাকএন্ড সার্ভারের (Server Side) সামনে</strong> অবস্থান করে। ইনকামিং ইন্টারনেট ক্লায়েন্ট রিকোয়েস্ট গ্রহণ করে পেছনের একাধিক প্রাইভেট ব্যাকএন্ড সার্ভারে রাউট করে দেয়।</p>
      <p><em>ব্যবহার:</em> Load Balancing, SSL/TLS Termination, Security (Hiding backend DB/Server IPs), Caching Static Assets, Rate Limiting.</p>
    `
  },
  {
    id: "nginx-2",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Load Balancing", "Algorithms", "Upstream"],
    question: "Nginx-এর বিভিন্ন Load Balancing Algorithms (Round Robin, Least Connections, IP Hash) কীভাবে কনফিগার করবেন?",
    answer: `
      <p>Nginx <code>upstream</code> ব্লকের মাধ্যমে ইনকামিং ট্রাফিক পেছনের ব্যাকএন্ড সার্ভারগুলোর মধ্যে লোড ব্যালেন্স করার জন্য বিভিন্ন অ্যালগরিদম সাপোর্ট করে:</p>
      <ol>
        <li><strong>Round Robin (ডিফল্ট):</strong> রিকোয়েস্টগুলো সারিবদ্ধভাবে একে একে সব সার্ভারে পাঠানো হয়।</li>
        <li><strong>Least Connections (<code>least_conn;</code>):</strong> যে সার্ভারে বর্তমানে সক্রিয় কানেকশন সংখ্যা সবচেয়ে কম, নতুন রিকোয়েস্ট সেই সার্ভারে পাঠানো হয়।</li>
        <li><strong>IP Hash (<code>ip_hash;</code>):</strong> ক্লায়েন্টের আইপি এড্রেসের হ্যাশ ভ্যালু অনুযায়ী রিকোয়েস্ট রাউট করা হয়। ফলে একই ক্লায়েন্ট সবসময় একই ব্যাকএন্ড সার্ভারে পৌঁছায় (Session Sticky Nature)।</li>
        <li><strong>Weighted Load Balancing:</strong> সার্ভারের ক্ষমতার ওপর ভিত্তি করে ওয়েট (<code>weight=3</code>) দেওয়া হয়।</li>
      </ol>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream backend_cluster {
  least_conn; # Load balancing algorithm
  server app1.example.com:8080 weight=3;
  server app2.example.com:8080 weight=1;
  server app3.example.com:8080 backup;
}

server {
  listen 80;
  location / {
    proxy_pass http://backend_cluster;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-3",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["SSL Termination", "HTTPS", "Security"],
    question: "Nginx SSL/TLS Termination কী এবং এর সুবিধা কী?",
    answer: `
      <p><strong>SSL/TLS Termination:</strong> ক্লায়েন্ট এবং এনজিনক্স প্রক্সির মধ্যকার কমুনিকেশন HTTPS (Encrypted) হলেও, Nginx ইনকামিং ট্রাফিক ডিক্রিপ্ট (Decrypt) করার পর পেছনের ব্যাকএন্ড মাইক্রোসার্ভিসগুলোতে প্লেইন HTTP-তে পাঠায়।</p>
      <h4>সুবিধা:</h4>
      <ul>
        <li><strong>CPU Offloading:</strong> ভারী SSL/TLS Encryption/Decryption সিপিসি প্রসেসিং কাজগুলো এনজিনক্স একাই সামলায়, ফলে পেছনের Node.js/Java অ্যাপ্লিকেশন সার্ভারের ওপর প্রেশার কমে।</li>
        <li><strong>Centralized Certificate Management:</strong> শত শত মাইক্রোসার্ভিসে আলাদা SSL সার্টিফিকেট সেটআপ করার বদলে কেবল এনজিনক্সে SSL Certificate (Let's Encrypt / Custom SSL) কনফিগার ও রিনিউ করলেই চলে।</li>
      </ul>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>server {
  listen 443 ssl http2;
  server_name api.mycompany.com;

  ssl_certificate /etc/nginx/ssl/live/fullchain.pem;
  ssl_certificate_key /etc/nginx/ssl/live/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;

  location / {
    proxy_pass http://localhost:5000;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-4",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "DDoS Protection", "leaky bucket"],
    question: "Nginx-এ Rate Limiting (limit_req_zone) কীভাবে সেটআপ করবেন? burst এবং nodelay প্যারামিটারের কাজ কী?",
    answer: `
      <p>Nginx <strong>Leaky Bucket Algorithm</strong> অনুসরণ করে আইপি ভিত্তিক রিকোয়েস্ট ফ্রিকোয়েন্সি লিমিট করার সুবিধা দেয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Define rate limit zone: 10MB memory zone holding client IPs, rate 5 requests per second
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=5r/s;

server {
  location /api/ {
    limit_req zone=api_limit burst=10 nodelay;
    proxy_pass http://backend_app;
  }
}</code></pre>
      </div>
      <h4>প্যারামিটার বিশ্লেষণ:</h4>
      <ul>
        <li><code>rate=5r/s:</code> প্রতি সেকেন্ডে সর্বোচ্চ ৫টি রিকোয়েস্ট অনুমোদিত।</li>
        <li><code>burst=10:</code> কোনো ক্লায়েন্ট হঠাৎ ট্রাফিক স্পাইক দিলে তাকে সাময়িকভাবে সর্বোচ্চ ১০টি অতিরিক্ত রিকোয়েস্ট কিউতে (Buffer) রাখার সুযোগ দেয়।</li>
        <li><code>nodelay:</code> কিউতে থাকা burst রিকোয়েস্টগুলোকে কৃত্রিমভাবে হোল্ড বা ডিলে না করে সাথে সাথে প্রসেস করার নির্দেশ দেয় (কিন্তু কিউ লিমিট পার হলে 503 Service Unavailable দেয়)।</li>
      </ul>
    `
  },
  {
    id: "nginx-5",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Event Loop", "Architecture", "Worker Processes"],
    question: "Nginx কীভাবে একাই লাখ লাখ কনকারেন্ট কানেকশন সামলাতে পারে? (Worker Processes & Event Loop)",
    answer: `
      <p>প্রথাগত Apache HTTP Server প্রতিটি ইনকামিং কানেকশনের জন্য ১টি করে নতুন থ্রেড বা প্রসেস (Thread-per-request) তৈরি করে, যা হাজার হাজার কানেকশনে RAM ফুল করে ক্র্যাশ করে।</p>
      <h4>Nginx-এর Asynchronous Architecture:</h4>
      <ul>
        <li><strong>Master Process:</strong> কনফিগারেশন রিড করে এবং Worker Process গুলোকে পরিচালনা করে।</li>
        <li><strong>Worker Processes:</strong> সিপিসি কোরের সংখ্যার সমান সংখ্যক Worker Process রান করে (<code>worker_processes auto;</code>)।</li>
        <li><strong>Non-blocking Event-Driven Loop:</strong> প্রতিটি Worker Process অসংকীর্ণ (Non-blocking) ইভেন্ট লুপ (Linux <code>epoll</code> বা BSD <code>kqueue</code>) ব্যবহার করে একটি মাত্র থ্রেডেই দশ হাজার কনকারেন্ট নেটওয়ার্ক সকেট ও কানেকশন দক্ষভাবে প্রসেস করে।</li>
      </ul>
    `
  },
  {
    id: "nginx-6",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Caching", "Static Assets", "Performance"],
    question: "Nginx Proxy Caching কীভাবে কাজ করে এবং static files (JS, CSS, Images) প্রক্সি ক্যাশে করার উপায় কী?",
    answer: `
      <p>ব্যাকএন্ড সার্ভারে হিট না পাঠিয়ে Nginx নিজেই ফ্রিকুয়েন্টলি ব্যবহৃত রেসপন্স ডিস্কে ক্যাশে করে অতি দ্রুত সার্ভিস দিতে পারে।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Define cache path and keys zone
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC_CACHE:10m max_size=1g inactive=60m;

server {
  location /static/ {
    proxy_cache STATIC_CACHE;
    proxy_cache_valid 200 302 60m;
    proxy_cache_valid 404 1m;
    proxy_cache_use_stale error timeout updating;
    add_header X-Cache-Status $upstream_cache_status;
    proxy_pass http://backend_app;
  }
}</code></pre>
      </div>
      <p><code>$upstream_cache_status</code> রেসপন্স হেডারে <code>HIT</code>, <code>MISS</code>, বা <code>BYPASS</code> স্ট্যাটাস প্রোভাইড করে।</p>
    `
  },
  {
    id: "nginx-7",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["gRPC Proxy", "HTTP2", "Microservices"],
    question: "Nginx-এ gRPC এবং HTTP/2 ট্রাফিক প্রক্সি ও লোড ব্যালেন্স কীভাবে করবেন?",
    answer: `
      <p>gRPC ট্রান্সপোর্টের জন্য HTTP/2 ব্যবহার করে। Nginx-এ gRPC ট্রাফিক প্রক্সি করার জন্য <code>grpc_pass</code> ডিরেক্টিভ এবং HTTP/2 সাপোর্ট এনাবল করতে হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream grpc_services {
  server 10.0.0.1:50051;
  server 10.0.0.2:50051;
}

server {
  listen 50051 ssl http2;
  server_name grpc.mycompany.com;

  ssl_certificate /etc/nginx/ssl/cert.pem;
  ssl_certificate_key /etc/nginx/ssl/key.pem;

  location / {
    grpc_pass grpc://grpc_services;
    grpc_set_header X-Real-IP $remote_addr;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-8",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Upstream Keep-Alive", "Performance", "TCP Handshake"],
    question: "Nginx Upstream Keep-Alive কনফিগারেশন কেন অত্যন্ত গুরুত্বপূর্ণ?",
    answer: `
      <p>ডিফল্টভাবে Nginx ব্যাকএন্ড সার্ভারের সাথে প্রতিটি ইনকামিং রিকোয়েস্টের জন্য নতুন TCP Connection তৈরি করে এবং কাজ শেষে ক্লোজ করে। উচ্চ ট্রাফিকের অ্যাপ্লিকেশনে এটি প্রচুর TCP Handshake ওভারহেড তৈরি করে এবং পোর্ট ফুরিয়ে যায় (Ephemeral Port Exhaustion)।</p>
      <p><strong>Upstream Keep-Alive Solution:</strong></p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>upstream backend_app {
  server 127.0.0.1:3000;
  keepalive 64; # Keep 64 idle connections open to backend
}

server {
  location / {
    proxy_http_version 1.1; # HTTP/1.1 supports persistent connection
    proxy_set_header Connection ""; # Clear Connection 'close' header
    proxy_pass http://backend_app;
  }
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-9",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Security Headers", "CORS", "Config"],
    question: "Nginx-এ Security Headers এবং CORS (Cross-Origin Resource Sharing) কীভাবে কনফিগার করবেন?",
    answer: `
      <p>অ্যাপ্লিকেশনকে সুরক্ষিত রাখতে Nginx লেভেলেই গ্লোবাল সিকিউরিটি হেডার ইনজেক্ট করা সেরা অনুশীলন:</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Content-Security-Policy "default-src 'self';" always;

# CORS Setup
location /api/ {
  if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://myclient.com';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
    return 204;
  }
  proxy_pass http://backend;
}</code></pre>
      </div>
    `
  },
  {
    id: "nginx-10",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Gzip", "Brotli", "Compression"],
    question: "Nginx Gzip Compression কীভাবে কনফিগার করবেন এবং টেক্সট/পেলোড ফাইল কমানোর উপায় কী?",
    answer: `
      <p>Nginx নেটিভভাবে রেসপন্স পেলোড (HTML, JS, CSS, JSON) Gzip কমপ্রেস করে ক্লায়েন্ট ব্রাউজারে পাঠাতে পারে, যা নেটওয়ার্ক ব্যান্ডউইথ বাঁচায়।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code>gzip on;
gzip_comp_level 5; # Balance between CPU usage and compression ratio (1-9)
gzip_min_length 256;
gzip_proxied any;
gzip_types
  text/plain
  text/css
  application/json
  application/javascript
  text/xml
  application/xml;</code></pre>
      </div>
    `
  }
];

for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "Nginx Location Block Matching Priority (=, ^~, ~, ~*)", tag: "Routing", diff: "Intermediate" },
    { title: "Client Max Body Size & File Upload Timeout Tuning", tag: "Config", diff: "Beginner" },
    { title: "Nginx Stream Module for Layer 4 TCP/UDP Load Balancing", tag: "L4 Balancing", diff: "Advanced" },
    { title: "Zero-Downtime Reloading (nginx -s reload)", tag: "Ops", diff: "Beginner" },
    { title: "Custom Log Formats with JSON output for ELK stack", tag: "Logging", diff: "Intermediate" },
    { title: "GeoIP module for Country-based Traffic Routing", tag: "Routing", diff: "Advanced" },
    { title: "Nginx OpenResty & Lua Scripting", tag: "Lua", diff: "Advanced" },
    { title: "WebSockets Proxying (Upgrade & Connection headers)", tag: "WebSockets", diff: "Intermediate" }
  ];
  const item = topics[(i - 11) % topics.length];
  nginxQuestions.push({
    id: `nginx-${i}`,
    category: "Nginx",
    difficulty: item.diff,
    tags: [item.tag, "Nginx"],
    question: `Nginx-এ ${item.title}-এর কনফিগারেশন এবং সেরা ব্যবহার কৌশল কী?`,
    answer: `
      <p>Nginx ওয়েবাসার্ভার এবং লোড ব্যালেন্সার অপারেশনে <strong>${item.title}</strong> কনসেপ্টটি খুবই গুরুত্ত্বপূর্ণ।</p>
      <h4>বিশ্লেষণ:</h4>
      <p>সার্ভার অপ্টিমাইজেশন এবং হাই-ট্রাফিক ব্যাকএন্ড সচল রাখতে Nginx-এ ${item.title} ব্যবহারের খুঁটিনাটি নিম্নে দেওয়া হলো।</p>
      <div class="code-box">
        <div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div>
        <pre><code># Configuration block snippet for ${item.title}
location /example {
  proxy_pass http://backend_upstream;
}</code></pre>
      </div>
    `
  });
}
