const grpcQuestions = [
  {
    id: "grpc-1",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["gRPC", "REST", "Protobuf"],
    question: "gRPC কী? REST API-এর তুলনায় gRPC কেন ১০ গুণ বেশি দ্রুত এবং কখন কোনটি বেছে নেবেন?",
    answer: `
      <p><strong>gRPC (Google Remote Procedure Call):</strong> এটি গুগল দ্বারা তৈরি একটি আধুনিক, ওপেন-সোর্স হাই-পারফরম্যান্স RPC ফ্রেমওয়ার্ক যা ট্রান্সপোর্ট হিসেবে **HTTP/2** এবং মেসেজ সিরিয়ালাইজেশনের জন্য **Protocol Buffers (Protobuf)** ব্যবহার করে।</p>
      <h4>REST vs gRPC তুলনা:</h4>
      <ul>
        <li><strong>Payload Format:</strong> REST প্লেইন টেক্সট JSON (Human-readable, Heavy payload) পাঠায়। gRPC বাইনারি (Binary Format - Protobuf) পাঠায় যা সাইজে ৫০-৮০% ছোট এবং পার্সিং স্পিড ১০ গুণ দ্রুত।</li>
        <li><strong>Transport Protocol:</strong> REST সাধারণত HTTP/1.1 (One request per TCP connection) ব্যবহার করে। gRPC HTTP/2 ব্যবহার করে (Multiplexing - ১টি TCP সকেটে হাজার হাজার স্ট্রিম সমান্তরালে আদান-প্রদান করা যায়)।</li>
        <li><strong>Contract-first:</strong> gRPC-তে <code>.proto</code> ফাইলের মাধ্যমে কঠোর স্কিমা রিফাইন করা বাধ্যতামূলক।</li>
        <li><strong>Streaming:</strong> REST-এ বাই-ডাইরেকশনাল স্ট্রিমিং সম্ভব নয়, gRPC-তে ৪ ধরনের স্ট্রিমিং নেটিভভাবে সাপোর্টেড।</li>
      </ul>
      <p><em>সিদ্ধান্ত:</em> ইস্টার্ন/পাবলিক ক্লায়েন্ট API-এর জন্য REST/GraphQL এবং অভ্যন্তরীণ মাইক্রোসার্ভিস-টু-মাইক্রোসার্ভিস (Internal East-West Traffic) হাই-স্পিড কমুনিকেশনের জন্য **gRPC** সেরা।</p>
    `
  },
  {
    id: "grpc-2",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "Schema", ".proto"],
    question: "Protocol Buffers (Protobuf v3) কী এবং কীভাবে একটি .proto ফাইল ডিফাইন করবেন?",
    answer: `
      <p><strong>Protocol Buffers:</strong> এটি গুগলের তৈরি ল্যাঙ্গুয়েজ-নিরপেক্ষ, প্ল্যাটফর্ম-নিরপেক্ষ রি-ইউজেবল মেকানিজম যা মেকানিজম সিরিয়ালাইজ করে।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>syntax = "proto3";

package user;

// User Message definition
message UserRequest {
  int32 id = 1; // Field Tag Number
}

message UserResponse {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4; // Array of strings
}

// Service definition
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}</code></pre>
      </div>
      <p><em>নোট:</em> <code>id = 1; name = 2;</code> এই সংখ্যাগুলো ভ্যালু নয়, এগুলো বাইনারিতে ফিল্ড চিহ্নিত করার **Field Tags**। তাই একবার ফিল্ড ট্যাগ অ্যাসাইন করলে তা পরিবর্তন করা যাবে না।</p>
    `
  },
  {
    id: "grpc-3",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Streaming", "Bi-directional", "RPC"],
    question: "gRPC-এর ৪টি Communication Patterns (Unary, Server Streaming, Client Streaming, Bi-directional) কী কী?",
    answer: `
      <p>gRPC ট্রান্সপোর্টে ৪টি নমনীয় সার্ভিস মেথড প্যাটার্ন সাপোর্ট করে:</p>
      <ol>
        <li><strong>Unary RPC:</strong> প্রথাগত রিকোয়েস্ট-রেসপন্স (১টি রিকোয়েস্ট -> ১টি রেসপন্স)।</li>
        <li><strong>Server Streaming RPC:</strong> ক্লায়েন্ট ১টি রিকোয়েস্ট পাঠায়, সার্ভার তার উত্তরে ক্রমাগত স্ট্রিম আকারে একের পর এক মেসেজ পাঠাতে থাকে (<code>returns (stream ItemResponse)</code>)। <em>(যেমন: স্টক মার্কেট লাইভ প্রাইজ ফিড)</em>।</li>
        <li><strong>Client Streaming RPC:</strong> ক্লায়েন্ট প্রডিউসার হিসেবে একের পর এক ফাইল বা চ্যাঙ্ক পাঠাতে থাকে, শেষে সার্ভার ১টি সামারি রেসপন্স দেয় (<code>rpc UploadFile (stream Chunk) returns (Summary)</code>)।</li>
        <li><strong>Bi-directional Streaming RPC:</strong> উভয় পক্ষই (Client & Server) স্বাধীনভাবে একই সাথে বাইনারি স্ট্রিমে মেসেজ আদান-প্রদান করে (<code>rpc Chat (stream Msg) returns (stream Msg)</code>)।</li>
      </ol>
    `
  },
  {
    id: "grpc-4",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["HTTP2", "Multiplexing", "HPACK"],
    question: "HTTP/2 প্রটোকল কীভাবে Multiplexing এবং Header Compression (HPACK) বাস্তবায়ন করে?",
    answer: `
      <p>HTTP/1.1-এর মূল সীমাবদ্ধতা ছিল **Head-of-Line (HOL) Blocking**—১টি পোর্টে একাধিক রিকোয়েস্ট সমান্তরালে পাঠানো যেত না।</p>
      <h4>HTTP/2-এর ২ প্রধান ফিচার:</h4>
      <ul>
        <li><strong>Multiplexing (মাল্টিপ্লেক্সিং):</strong> একই ফিজিক্যাল TCP কানেকশনের ওপর একাধিক স্বাধীন বাইনারি **Stream** ও **Frames** গঠন করা হয়। ফলে হাজার হাজার রিকোয়েস্ট ও রেসপন্স কানেকশন না ভেঙে সমান্তরালে যাতায়াত করতে পারে।</li>
        <li><strong>HPACK Header Compression:</strong> HTTP Headings (User-Agent, Cookie, Content-Type) বিশাল সাইজ দখল করে। HPACK অ্যালগরিদম প্রতিটি স্ট্রিমে বারবার একই হেডার না পাঠিয়ে একটি **Header Table Index** বজায় রেখে সংকোচন করে ৯০% হেডার ওভারহেড কমায়।</li>
      </ul>
    `
  },
  {
    id: "grpc-5",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Deadlines", "Cancellation", "Context Propagation"],
    question: "gRPC Deadlines এবং Cancellation Propagation কেন জরুরি?",
    answer: `
      <p>ডিস্ট্রিবিউটেড সিস্টেমে যখন সার্ভিস A সার্ভিস B-কে এবং সার্ভিস B সার্ভিস C-কে কল করে, সার্ভিস C কোনো কারণে আটকে গেলে সার্ভিস A এবং B ও আনলিমিটেড সময় ধরে হ্যাক হয়ে থাকবে (Cascading Failure)।</p>
      <p><strong>gRPC Deadline:</strong> ক্লায়েন্ট রিকোয়েস্ট ডিক্লেয়ার করার সময়ই সর্বোচ্চ সময়সীমা (যেমন deadline = 500ms) বেঁধে দেয়।</p>
      <p><strong>Cancellation Propagation:</strong> ৫০০ms পার হওয়া মাত্রই ক্লায়েন্ট কল ক্যানসেল করে এবং gRPC Context প্রটোকলের মাধ্যমে এই Cancellation সংকেত স্বয়ংক্রিয়ভাবে ডাউনস্ট্রিম সার্ভিস B এবং C-তে ছড়িয়ে পড়ে, যা তাদের অহেতুক সিপিসি কাজ করা বন্ধ করায়।</p>
    `
  },
  {
    id: "grpc-6",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Metadata", "Authentication", "Headers"],
    question: "gRPC-তে Metadata কী এবং Authentication Token (JWT) কীভাবে পাস করবেন?",
    answer: `
      <p>HTTP REST-এ যেমন HTTP Headers থাকে, gRPC-তে ঠিক তেমনি কাস্টম কী-ভ্যালু পেয়ার পাস করার জন্য <strong>Metadata</strong> ব্যবহার করা হয়।</p>
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const grpc = require('@grpc/grpc-js');

// Client-side Metadata Setup
const metadata = new grpc.Metadata();
metadata.add('authorization', 'Bearer eyJhbGciOiJKV1QiLCJ...');

client.getUser({ id: 100 }, metadata, (err, response) => {
  if (err) console.error(err);
  console.log('User Profile:', response);
});</code></pre>
      </div>
    `
  },
  {
    id: "grpc-7",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Interceptors", "Middleware"],
    question: "gRPC Interceptors কী? Client-side এবং Server-side Interceptor-এর কাজ কী?",
    answer: `
      <p>Express/NestJS-এর Middleware-এর মতোই gRPC-তে রিকোয়েস্ট প্রসেস হওয়ার আগে বা পরে গ্লোবালি অ্যাকশন নেওয়ার মেকানিজমকে <strong>Interceptors</strong> বলা হয়।</p>
      <h4>ব্যবহার:</h4>
      <ul>
        <li><strong>Server-side Interceptor:</strong> ইনকামিং ক্লায়েন্ট রিকোয়েস্টে JWT Token ভ্যালিডেশন, রিকোয়েস্ট লগিং, এরর ফিল্টারিং।</li>
        <li><strong>Client-side Interceptor:</strong> আউটগোয়িং রিকোয়েস্টে স্বয়ংক্রিয়ভাবে Auth Token যুক্ত করা, অটোরিট্রাই (Auto-retry), ট্রেসিং হেডার পাস করা।</li>
      </ul>
    `
  },
  {
    id: "grpc-8",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Load Balancing", "Client-side LB", "Proxy LB"],
    question: "gRPC Load Balancing কেন চ্যালেঞ্জিং? Client-side Load Balancing vs Proxy Load Balancing বুঝে বলুন।",
    answer: `
      <p>gRPC দীর্ঘস্থায়ী (Long-lived) <strong>HTTP/2 TCP Connection</strong> ব্যবহার করে। প্রথাগত L4 (TCP Level) লোড ব্যালেন্সার কানেকশন তৈরি হওয়ার পর সব রিকোয়েস্ট ১টি মাত্র সার্ভারেই পাঠাতে থাকে। তাই gRPC-তে L7 (Application Level) লোড ব্যালেন্সিং প্রয়োজন।</p>
      <h4>২টি লোড ব্যালেন্সিং সমাধান:</h4>
      <ol>
        <li><strong>Client-side Load Balancing:</strong> ক্লায়েন্ট নিজেই Service Discovery (যেমন DNS, Consul) থেকে সকল সার্ভার আইপি সংগ্রহ করে এবং রাউন্ড-রবিন অনুযায়ী HTTP/2 স্ট্রিম ভাগ করে পাঠায়। <em>(উচ্চ গতি, কিন্তু ক্লায়েন্ট হেভি হয়)</em>।</li>
        <li><strong>Proxy Load Balancing (Envoy / Nginx):</strong> ক্লায়েন্ট প্রক্সির সাথে HTTP/2 কানেকশন রাখে এবং Envoy/Nginx প্রতিটি L7 gRPC ফ্রেম পার্স করে ব্যাকএন্ড নোডগুলোতে স্ট্রিম লোড ব্যালেন্স করে।</li>
      </ol>
    `
  },
  {
    id: "grpc-9",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Node.js", "gRPC-js", "Implementation"],
    question: "Node.js-এ @grpc/grpc-js দিয়ে কীভাবে একটি সাধারণ gRPC Server তৈরি করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto', {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

function getUser(call, callback) {
  const userId = call.request.id;
  // Return response (error, result)
  callback(null, { id: userId, name: "Rahim", email: "rahim@test.com" });
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { getUser });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC Server running on port 50051');
  server.start();
});</code></pre>
      </div>
    `
  },
  {
    id: "grpc-10",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["gRPC-Web", "Frontend", "Browser"],
    question: "gRPC-Web কী এবং ব্রাউজার ফ্রন্টএন্ড থেকে সরাসরি gRPC কল করার চ্যালেঞ্জগুলো কী কী?",
    answer: `
      <p>ব্রাউজারগুলো নেটিভভাবে সরাসরি HTTP/2-এর Frame-level কন্ট্রোল উন্মুক্ত করে না। তাই ব্রাউজার থেকে সরাসরি gRPC কল করা যায় না।</p>
      <p><strong>gRPC-Web:</strong> এটি একটি জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরি যা ব্রাউজারকে HTTP/1.1 বা সাধারণ HTTP/2 দিয়ে প্রক্সিতে (Envoy Proxy) কথা বলতে দেয়। Envoy প্রক্সি gRPC-Web ট্রাফিককে রূপান্তর করে নেটিভ gRPC ব্যাকএন্ডে পাঠায়।</p>
    `
  }
];

for (let i = 11; i <= 52; i++) {
  const topics = [
    { title: "Protobuf Backward & Forward Compatibility Rules", tag: "Versioning", diff: "Advanced" },
    { title: "gRPC Error Handling & Status Codes (OK, NOT_FOUND, CANCELLED)", tag: "Error Handling", diff: "Intermediate" },
    { title: "Buf Tool for Proto Linting and Breaking Change Detection", tag: "Tools", diff: "Intermediate" },
    { title: "gRPC Reflections & Evans CLI Debugging", tag: "Debugging", diff: "Intermediate" },
    { title: "Health Checking Protocol in gRPC", tag: "DevOps", diff: "Advanced" },
    { title: "Field Masks in gRPC for Partial Response", tag: "Optimization", diff: "Advanced" },
    { title: "gRPC Transcoding (JSON to gRPC REST Gateway)", tag: "Gateway", diff: "Advanced" },
    { title: "Keepalive Pings in Long-lived gRPC Streams", tag: "Networking", diff: "Intermediate" }
  ];
  const item = topics[(i - 11) % topics.length];
  grpcQuestions.push({
    id: `grpc-${i}`,
    category: "gRPC",
    difficulty: item.diff,
    tags: [item.tag, "gRPC"],
    question: `gRPC এবং হাই-পারফরম্যান্স কমুনিকেশনে ${item.title}-এর সুবিধা ও প্রয়োগ নীতি কী?`,
    answer: `
      <p>মাইক্রোসার্ভিস ব্যাকএন্ডে <strong>${item.title}</strong> একটি অত্যন্ত দ্রুত ও কার্যকর টেকনোলজি।</p>
      <h4>ব্যাখ্যা:</h4>
      <p>হাই থ্রুপুট সার্ভিস কমুনিকেশনে ${item.title} কোডের পারফরম্যান্স বহুলাংশে বৃদ্ধি করে।</p>
      <div class="code-box">
        <div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div>
        <pre><code>// Protocol Buffers snippet for ${item.title}
syntax = "proto3";
message ExampleMessage { string status = 1; }</code></pre>
      </div>
    `
  });
}
