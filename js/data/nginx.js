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
,

  {
    id: "nginx-11",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Routing","Location","Priority"],
    question: "Nginx Location Block Matching Priority-এর নিয়মসমূহ কী কী?",
    answer: `
<p>অগ্রাধিকারের ক্রম: 1. <code>=</code> Exact 2. <code>^~</code> Preferential Prefix 3. <code>~</code> / <code>~*</code> Regex 4. Standard Prefix Match।</p>
    `
  },
  {
    id: "nginx-12",
    category: "Nginx",
    difficulty: "Beginner",
    tags: ["Config","Uploads","Timeouts"],
    question: "Nginx-এ 413 Request Entity Too Large এরর ফিক্স করতে কোন কনফিগারেশন চেঞ্জ করবেন?",
    answer: `
<p><code>http</code> বা <code>server</code> ব্লকে <code>client_max_body_size 100M;</code> যোগ করতে হয়।</p>
    `
  },
  {
    id: "nginx-13",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["L4 Balancing","Stream","TCP"],
    question: "Nginx Stream Module দিয়ে Layer 4 (TCP/UDP) Load Balancing কীভাবে করা হয়?",
    answer: `
<p>HTTP ট্রান্সফর্ম না করে সরাসরি সকেট লেভেলে প্রোটোকল (MySQL, gRPC, Redis) লোড ব্যালেন্স করতে <code>stream { ... }</code> ব্যবহৃত হয়।</p>
    `
  },
  {
    id: "nginx-14",
    category: "Nginx",
    difficulty: "Beginner",
    tags: ["Ops","Reload","Process"],
    question: "nginx -s reload কমান্ড দিলে কীভাবে জিরো-ডাউনটাইম আপডেট হয়?",
    answer: `
<p>Master Process কনফিগারেশন রিড করে নতুন Worker Process চালু করে। পুরাতন ওয়ার্কারগুলো পেন্ডিং কাজ শেষ করে স্বয়ংক্রিয়ভাবে ক্লোজ হয়।</p>
    `
  },
  {
    id: "nginx-15",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Logging","JSON","ELK"],
    question: "Nginx-এ কাস্টম JSON Access Log ফরম্যাট কীভাবে তৈরি করবেন?",
    answer: `
<p><code>log_format json_analytics '{"time": "$time_iso8601", "ip": "$remote_addr", "status": "$status"}';</code> ডিক্লেয়ার করে দেওয়া হয়।</p>
    `
  },
  {
    id: "nginx-16",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["GeoIP","Routing","Security"],
    question: "Nginx GeoIP Module দিয়ে দেশভিত্তিক ট্রাফিক ব্লক বা রাউট কীভাবে করা হয়?",
    answer: `
<p>MaxMind GeoIP2 ডাটাবেজ দিয়ে ইনকামিং IP-র দেশ বের করে নির্দিষ্ট দেশের ট্রাফিক অন্য ইউআরএলে রিডাইরেক্ট বা ব্লক করা যায়।</p>
    `
  },
  {
    id: "nginx-17",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Lua","OpenResty","Dynamic"],
    question: "Nginx-এ OpenResty এবং Lua Scripting-এর কাজ কী?",
    answer: `
<p>Lua স্ক্রিপ্টিং দিয়ে Nginx-এর ভেতরেই ডায়নামিক অথেন্টিকেশন, কাস্টম ক্যাশিং ও এপিআই গেটওয়ে লজিক সি-লেভেল পারফরম্যান্সে চালানো যায়।</p>
    `
  },
  {
    id: "nginx-18",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["WebSockets","Proxy","Headers"],
    question: "Nginx-এ WebSockets Proxying করতে কোন কোন হেডার সেট করতে হয়?",
    answer: `
<p><code>proxy_set_header Upgrade $http_upgrade;</code> এবং <code>proxy_set_header Connection "upgrade";</code> দেওয়া আবশ্যক।</p>
    `
  },
  {
    id: "nginx-19",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Reverse Proxy", "HTTP2", "Performance"],
    question: "Nginx-এ HTTP/2 এবং HTTP/3 (QUIC) প্রোটোকল কীভাবে সক্রিয় করবেন?",
    answer: `
<p><code>listen 443 ssl http2;</code> এবং Nginx 1.25+ এর জন্য <code>listen 443 quic reuseport;</code> যোগ করে SSL সাইফার কনফিগারেশনসহ HTTP/3 সাপোর্ট অন করা যায়।</p>
    `
  },
  {
    id: "nginx-20",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["SSL", "Certbot", "HTTPS"],
    question: "Nginx-এ Let's Encrypt SSL (Certbot) এবং SSL Termination কীভাবে কনফিগার করা হয়?",
    answer: `
<p>Certbot স্বয়ংক্রিয়ভাবে TLS সার্টিফিকেট জেনারেট করে Nginx <code>listen 443 ssl;</code> ব্লকে <code>ssl_certificate</code> এবং <code>ssl_certificate_key</code> পাথ আপডেট করে HTTPS ডিরেক্টরি বজায় রাখে।</p>
    `
  },
  {
    id: "nginx-21",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Rate Limiting", "limit_req", "Security"],
    question: "Nginx-এ limit_req_zone এবং limit_req (Leaky Bucket) দিয়ে Rate Limiting কীভাবে করবেন?",
    answer: `
<p><code>limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;</code> সেট করে <code>limit_req zone=one burst=20 nodelay;</code> ব্যবহার করে DDoS ও ব্রুটফোর্স রিকুয়েস্ট ক্যানসেল করা।</p>
    `
  },
  {
    id: "nginx-22",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Upstream", "Load Balancing", "Keepalive"],
    question: "Nginx Upstream Block-এ keepalive সেটিংস ব্যাকএন্ড সকেট রিইউজে কীভাবে সাহায্য করে?",
    answer: `
<p><code>upstream backend { server 127.0.0.1:4000; keepalive 32; }</code> দিলে Nginx ব্যাকএন্ড Node.js প্রসেসের সাথে TCP সকেট কানেকশন রিইউজ করে ল্যাটেন্সি কমায়।</p>
    `
  },
  {
    id: "nginx-23",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Caching", "proxy_cache", "CDN"],
    question: "Nginx Microcaching (proxy_cache, proxy_cache_valid) দিয়ে ডায়নামিক API রেসপন্স ক্যাশ কীভাবে করবেন?",
    answer: `
<p><code>proxy_cache_path /var/cache/nginx keys_zone=my_cache:10m;</code> ডিক্লেয়ার করে এন্ডপয়েন্টে ১ সেকেন্ডের জন্য হলেও (Microcaching) ক্যাশ করলে সার্ভার RPS ১০ গুণ বাড়ে।</p>
    `
  },
  {
    id: "nginx-24",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Security", "Headers", "Hardening"],
    question: "Nginx Server Hardening: X-Frame-Options, CSP, HSTS হেডার যোগ করা এবং Nginx Version লুকানো কীভাবে করবেন?",
    answer: `
<p><code>server_tokens off;</code> দিয়ে ভার্সন লুকানো। <code>add_header X-Frame-Options "SAMEORIGIN";</code> এবং <code>add_header Strict-Transport-Security "max-age=31536000";</code> যোগ করা।</p>
    `
  },
  {
    id: "nginx-25",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Redirects", "301 vs 302", "Rewrite"],
    question: "Nginx 301 Permanent Redirect vs 302 Temporary Redirect এবং rewrite directive-এর নিয়ম কী?",
    answer: `
<p><strong>301:</strong> ব্রাউজার ও এসইও সার্চ ইঞ্জিনকে স্থায়ী স্থানান্তরের মেসেজ দেয় (ব্রাউজারে ক্যাশ হয়)।</p><p><strong>302:</strong> সাময়িক স্থানান্তর। <code>rewrite ^/old/(.*)$ /new/$1 permanent;</code> ডিরেক্টিভ দিয়ে ইউআরএল পরিবর্তন করা।</p>
    `
  },
  {
    id: "nginx-26",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Gzip", "Brotli", "Static"],
    question: "Nginx-এ Static File Gzip & Brotli Compression (gzip_static, brotli_static) কীভাবে কনফিগার করবেন?",
    answer: `
<p>বিল্ড টাইমেই <code>.gz</code> বা <code>.br</code> ফাইল বানিয়ে রাখলে <code>gzip_static on;</code> দিলে Nginx অন-দ্য-ফ্লাই CPU কমপ্রেশন ওভারহেড না রেখে সরাসরি প্রিসংকুচিত ফাইল রিড করে পাঠায়।</p>
    `
  },
  {
    id: "nginx-27",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Worker", "worker_processes", "worker_connections"],
    question: "Nginx worker_processes এবং worker_connections সেটিংস কীভাবে সর্বোচ্চ কনকারেন্সি গ্যারান্টি দেয়?",
    answer: `
<p><code>worker_processes auto;</code> (CPU কোরের সংখ্যার সমান) এবং <code>worker_connections 1024;</code> দিলে সর্বোচ্চ কনকারেন্ট সকেট হ্যান্ডলিং ক্যাপাসিটি হয় <code>worker_processes * worker_connections</code>।</p>
    `
  },
  {
    id: "nginx-28",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Security", "mTLS", "Client Certificate"],
    question: "Nginx-এ Mutual TLS (mTLS) Client Certificate Authentication কীভাবে কনফিগার করবেন?",
    answer: `
<p><code>ssl_client_certificate /etc/nginx/certs/ca.crt;</code> এবং <code>ssl_verify_client on;</code> দিলে Nginx ক্লায়েন্টের নিজস্ব ভ্যালিড SSL সার্টিফিকেট ছাড়া কানেকশন ড্রপ করে।</p>
    `
  },
  {
    id: "nginx-29",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Errors", "custom error_page", "Fallbacks"],
    question: "Nginx-এ কাস্টম 404/50x Error Pages এবং @fallback Location Block কীভাবে সেটআপ করবেন?",
    answer: `
<p><code>error_page 500 502 503 504 /50x.html;</code> এবং <code>location = /50x.html { root /usr/share/nginx/html; }</code> দিয়ে ব্যাকএন্ড ডাউন থাকলে কাস্টম পেজ দেখানো।</p>
    `
  },
  {
    id: "nginx-30",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Proxy", "proxy_pass", "Trailing Slash"],
    question: "Nginx proxy_pass-এ Trailing Slash (/)-এর ভূমিকা ও পার্থক্য কী?",
    answer: `
<p><code>proxy_pass http://backend;</code> দিলে পুরো অরিজিনাল ইউআরএল রিডাইরেক্ট করে। কিন্তু <code>proxy_pass http://backend/;</code> দিলে location প্রিফিক্স বাদ দিয়ে বাকি পাথ ব্যাকএন্ডে পাঠায়।</p>
    `
  },
  {
    id: "nginx-31",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Security", "IP Blocking", "allow deny"],
    question: "Nginx-এ allow এবং deny ডিরেক্টিভ দিয়ে IP Blacklisting / Whitelisting কীভাবে করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div><pre><code>location /admin {
  allow 192.168.1.10;
  deny all;
}</code></pre></div>
    `
  },
  {
    id: "nginx-32",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Stub Status", "Metrics", "Prometheus"],
    question: "Nginx stub_status module দিয়ে অ্যাক্টিভ কানেকশন মেট্রিক্স ট্র্যাকিং কীভাবে করবেন?",
    answer: `
<p><code>location /nginx_status { stub_status; allow 127.0.0.1; deny all; }</code> দিলে Nginx active connections, accepts, handled, requests মেট্রিক্স প্রমোট করে।</p>
    `
  },
  {
    id: "nginx-33",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Buffers", "proxy_buffer_size", "Tuning"],
    question: "Nginx-এ proxy_buffer_size এবং proxy_buffers দিয়ে Response Buffering টিউন কীভাবে করবেন?",
    answer: `
<p>ব্যাকএন্ড থেকে বড় হেডার বা বাফার আসলে Nginx ডিস্কে বাফার ফাইল বানায়। <code>proxy_buffer_size 16k; proxy_buffers 4 32k;</code> বাড়িয়ে ইন-মেমোরি বাফারিং ফাস্ট করা যায়।</p>
    `
  },
  {
    id: "nginx-34",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Stream", "SNI Routing", "ssl_preread"],
    question: "Nginx Stream Module-এ ssl_preread দিয়ে TLS SNI-এর ওপর ভিত্তি করে L4 ট্রাফিক রাউটিং কীভাবে করবেন?",
    answer: `
<p>SSL সার্টিফিকেট না খুলেই ইনকামিং প্যাকটের SNI (Server Name Indication) রিড করে Domain A এবং Domain B-কে আলাদা আলাদা পোর্ট/সার্ভারে L4 লেভেলে ফরওয়ার্ড করা।</p>
    `
  },
  {
    id: "nginx-35",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Try Files", "SPA", "History API"],
    question: "Single Page Application (React/Vue/Angular)-এর জন্য try_files $uri $uri/ /index.html; কেন বাধ্যতামূলক?",
    answer: `
<p>SPA-তে ক্লায়েন্ট সাইড রাউটিং থাকায় ব্রাউজারে রিলোড দিলে Nginx সেই ফিজিক্যাল ফাইল না পেয়ে 404 দেয়। <code>try_files</code> ফাইল না পেলে ডিফল্ট <code>index.html</code> রেন্ডার করতে সাহায্য করে।</p>
    `
  },
  {
    id: "nginx-36",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["High Availability", "Keepalived", "VIP"],
    question: "Keepalived এবং Virtual IP (VIP) ব্যবহার করে Nginx High Availability (Active-Passive) কীভাবে সেটআপ করবেন?",
    answer: `
<p>২টি Nginx সার্ভারের মাঝে VRRP প্রোটোকল দিয়ে ১টি Virtual IP শেয়ার করা। Primary Nginx ক্র্যাশ করলে ১ সেকেন্ডের কম সময়ে Secondary Nginx ওই Virtual IP দখল করে ট্রাফিক সামলায়।</p>
    `
  },
  {
    id: "nginx-37",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Timeouts", "keepalive_timeout", "client_header_timeout"],
    question: "Nginx-এ keepalive_timeout এবং client_body_timeout সেটিংস কীভাবে স্লো-রিসোর্স অ্যাটাক প্রতিরোধ করে?",
    answer: `
<p><code>keepalive_timeout 65;</code> এবং <code>client_body_timeout 12;</code> দিলে ধীরগতির ক্ষতিকর ক্লায়েন্ট যদি টাইমআউটের মধ্যে বোডি বা হেডার না পাঠায়, তবে Nginx সকেট অটোমেটিক ড্রপ করে।</p>
    `
  },
  {
    id: "nginx-38",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Module", "Dynamic Modules", "so"],
    question: "Nginx Dynamic Modules (.so) কীভাবে লোড ও মেইনটেইন করা হয়?",
    answer: `
<p>Nginx Recompile ছাড়াই <code>load_module modules/ngx_http_geoip2_module.so;</code> মেইন কনফিগ ফাইলের একদম শুরুতে বসিয়ে নতুন নেটিভ মডিউল এক্সটেন্ড করা।</p>
    `
  },
  {
    id: "nginx-39",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Headers", "add_header", "proxy_hide_header"],
    question: "Nginx proxy_hide_header এবং add_header-এর সিকিউরিটি ব্যবহার কী?",
    answer: `
<p>ব্যাকএন্ড থেকে আসা <code>Server: Express</code> বা <code>X-Powered-By</code> হেডার <code>proxy_hide_header</code> দিয়ে রিমুভ করা এবং সিকিউর হেডারগুলো <code>add_header</code> দিয়ে ইম্পোজ করা।</p>
    `
  },
  {
    id: "nginx-40",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Caching", "proxy_cache_use_stale", "Resilience"],
    question: "Nginx proxy_cache_use_stale error timeout-এর সুবিধা কী?",
    answer: `
<p>যদি ব্যাকএন্ড প্রসেস (Node.js/DB) হঠাৎ ডাউন (502/504) হয়ে যায়, তবে Nginx এরর না দেখিয়ে আগের ক্যাশ করা পুরোনো বা বাসি (Stale) কন্টেন্ট ক্লায়েন্টকে সার্ভ করে সাইট সচল রাখে।</p>
    `
  },
  {
    id: "nginx-41",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Logs", "syslog", "Remote Logging"],
    question: "Nginx Access Log সরাসরি Remote Syslog সার্ভারে কীভাবে ফরওয়ার্ড করবেন?",
    answer: `
<p><code>access_log syslog:server=10.0.0.1:514,facility=local7,tag=nginx,severity=info json_analytics;</code> কনফিগার করে লোকাল ডিস্কে ফাইল ডাম্প না করে সরাসরি রিমোট লগার সার্ভারে রিডিক্ট করা।</p>
    `
  },
  {
    id: "nginx-42",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Performance", "sendfile", "tcp_nopush"],
    question: "Nginx Performance Tuning: sendfile, tcp_nopush, এবং tcp_nodelay সেটিংস কী কাজ করে?",
    answer: `
<p><strong>sendfile:</strong> ওএস কার্নেল স্পেস থেকে সরাসরি নেটওয়ার্ক সকেটে ফাইল পাঠায় (Zero-copy)।</p><p><strong>tcp_nopush:</strong> HTTP হেডার ও ফাইলের শুরু ১টি TCP প্যাকেটে পাঠায়।</p><p><strong>tcp_nodelay:</strong> ছোট প্যাকেটে Nagle's Algorithm ডিজেবল করে ল্যাটেন্সি কমায়।</p>
    `
  },
  {
    id: "nginx-43",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Auth", "auth_basic", "htpasswd"],
    question: "Nginx auth_basic এবং .htpasswd ফাইল দিয়ে কীভাবে সিম্পল পাসওয়ার্ড প্রটেকশন দেবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div><pre><code>location /admin {
  auth_basic "Restricted Area";
  auth_basic_user_file /etc/nginx/.htpasswd;
}</code></pre></div>
    `
  },
  {
    id: "nginx-44",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Upstream", "max_fails", "fail_timeout"],
    question: "Nginx Upstream-এ max_fails এবং fail_timeout দিয়ে স্বাস্থ্যহীন ব্যাকএন্ড নোড ড্রপ কীভাবে করবেন?",
    answer: `
<p><code>server 10.0.0.1:4000 max_fails=3 fail_timeout=30s;</code> দিলে টানা ৩টি কলে ব্যর্থ হলে Nginx পরবর্তী ৩০ সেকেন্ডের জন্য ওই নোডে ট্রাফিক পাঠাবে না।</p>
    `
  },
  {
    id: "nginx-45",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["CORS", "Multiple Origins", "map directive"],
    question: "Nginx map directive ব্যবহার করে ডায়নামিক Multiple Origin CORS কীভাবে কনফিগার করবেন?",
    answer: `
<div class="code-box"><div class="code-header"><span>nginx</span><button class="copy-btn">Copy</button></div><pre><code>map $http_origin $cors_origin {
  default "";
  "~^https?://(localhost|example\\.com)$" $http_origin;
}
server {
  add_header 'Access-Control-Allow-Origin' $cors_origin;
}</code></pre></div>
    `
  },
  {
    id: "nginx-46",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Security", "DoS", "limit_conn"],
    question: "Nginx limit_conn_zone এবং limit_conn দিয়ে পার-আইপি সকেট কানেকশন লিমিট কীভাবে করবেন?",
    answer: `
<p><code>limit_conn_zone $binary_remote_addr zone=addr:10m;</code> সেট করে <code>limit_conn addr 20;</code> বসালে ১টি IP থেকে সর্বোচ্চ ২০টি সকেট কানেকশন অনুমোদিত হয়।</p>
    `
  },
  {
    id: "nginx-47",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Geo", "GeoIP2", "MaxMind"],
    question: "Nginx-এ geo directive দিয়ে CIDR IP Block অনুযায়ী কাস্টম ভ্যারিয়েবল সেট কীভাবে করবেন?",
    answer: `
<p><code>geo $is_internal { default 0; 10.0.0.0/8 1; 192.168.0.0/16 1; }</code> দিয়ে নিজস্ব ইন্টারনাল আইপির ক্ষেত্রে কাস্টম রুলস বসানো।</p>
    `
  },
  {
    id: "nginx-48",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["HTTP2", "Server Push", "http2_push"],
    question: "Nginx HTTP/2 Server Push (http2_push) কনফিগারেশন কীভাবে কাজ করে?",
    answer: `
<p><code>location / { http2_push /css/main.css; http2_push /js/app.js; }</code> দিলে HTML পেজ ক্লায়েন্টে যাওয়ার সাথে সাথেই সিএসএস এবং জেএস ফাইলও একসাথে পুশ করা হয়।</p>
    `
  },
  {
    id: "nginx-49",
    category: "Nginx",
    difficulty: "Intermediate",
    tags: ["Config", "include directive", "conf.d"],
    question: "Nginx include directive দিয়ে কনফিগারেশন মডুলারিটি বজায় রাখা কেন জরুরি?",
    answer: `
<p><code>include /etc/nginx/conf.d/*.conf;</code> এবং <code>include /etc/nginx/sites-enabled/*;</code> দিয়ে শত শত ওয়েবসাইটের কনফিগ ফাইল আলাদা ও পরিষ্কার রাখা।</p>
    `
  },
  {
    id: "nginx-50",
    category: "Nginx",
    difficulty: "Advanced",
    tags: ["Architecture", "Master-Worker", "Shared Memory"],
    question: "Nginx Architecture: Master Process, Worker Processes এবং Shared Memory (Slab Allocator) কীভাবে কাজ করে?",
    answer: `
<p>Master Process পারমিশন নেওয়া, কনফিগ রিড করা ও রিইভেন্ট চালায়। non-blocking Worker Process সমূহ আসল নেটওয়ার্ক ট্রান্সফার পরিচালনা করে এবং Shared Memory (Slab) দিয়ে ওয়ার্কারগুলোর মধ্যে রেট-লিমিট ও ক্যাশ ডাটা শেয়ার করে।</p>
    `
  }
];
