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
,

  {
    id: "grpc-11",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf","Versioning","Rules"],
    question: "Protocol Buffers (Protobuf)-এ Backward এবং Forward Compatibility রুলস কী কী?",
    answer: `
<p>Tag Number কখনো চেঞ্জ বা ডিলিট করা যাবে না। নতুন ফিল্ড যোগ করলে পুরাতন ক্লায়েন্ট তা ইগনোর করবে এবং রিমুভড ফিল্ড <code>reserved</code> মার্ক করতে হবে।</p>
    `
  },
  {
    id: "grpc-12",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Error Handling","Status Codes","API"],
    question: "gRPC Status Codes (OK, NOT_FOUND, CANCELLED) কীভাবে কাজ করে?",
    answer: `
<p>gRPC নির্দিষ্ট ১৬টি ক্যানোনিকাল স্ট্যাটাস কোড (যেমন OK, INVALID_ARGUMENT, NOT_FOUND) প্রদান করে এবং Rich Error অবজেক্ট সাপোর্ট করে।</p>
    `
  },
  {
    id: "grpc-13",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Tools","Buf","Linting"],
    question: "gRPC-তে Buf Tool কী?",
    answer: `
<p>Protobuf ফাইলের Linting, Breaking Change Detection এবং অটোমেটিক কোড জেনারেটর প্রসেস সহজ করার আধুনিক CLI টুল।</p>
    `
  },
  {
    id: "grpc-14",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Debugging","Evans CLI","Reflection"],
    question: "gRPC Server Reflection এবং Evans CLI কী?",
    answer: `
<p>Server Reflection <code>.proto</code> ফাইল ছাড়াই মেটাডাটা জানায় এবং Evans CLI দিয়ে ইন্টারেক্টিভভাবে টার্মিনাল থেকে gRPC মেথড টেস্ট করা হয়।</p>
    `
  },
  {
    id: "grpc-15",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["DevOps","Health Check","Kubernetes"],
    question: "gRPC Health Checking Protocol কীভাবে কাজ করে?",
    answer: `
<p>Kubernetes বা Load Balancer-এর জন্য gRPC স্ট্যান্ডার্ড <code>grpc.health.v1.Health</code> সার্ভিস অফার করে (Check & Watch RPC)।</p>
    `
  },
  {
    id: "grpc-16",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Optimization","FieldMask","Performance"],
    question: "gRPC FieldMask (Partial Response) কী?",
    answer: `
<p>ক্লায়েন্ট সব ফিল্ড না চেয়ে কেবল প্রয়োজনীয় ফিল্ড ফিল্টার করে ডেটা ট্রান্সফার ব্যান্ডউইথ অপটিমাইজ করার পদ্ধতি।</p>
    `
  },
  {
    id: "grpc-17",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Gateway","Transcoding","JSON"],
    question: "gRPC JSON Transcoding (grpc-gateway) কী?",
    answer: `
<p>ইনকামিং RESTful JSON HTTP রিকুয়েস্টকে অটোমেটিক gRPC বাইনারিতে রূপান্তর করে সার্ভারে পাঠানোর প্রক্সি গেটওয়ে।</p>
    `
  },
  {
    id: "grpc-18",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Networking","HTTP/2","Keepalive"],
    question: "gRPC Stream-এ HTTP/2 Keepalive Pings-এর ভূমিকা কী?",
    answer: `
<p>আইডল কানেকশন যেন নেটওয়ার্ক লড ব্যালেন্সার বা ফায়ারওয়াল বন্ধ না করে দেয়, সে জন্য সময় পর পর Keepalive Ping প্যাকেট পাঠায়।</p>
    `
  },
  {
    id: "grpc-19",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf", "Serialization", "Varints"],
    question: "Protocol Buffers Binary Wire Format (Varints, Tag-Length-Value) কীভাবে JSON-এর তুলনায় চরম ব্যান্ডউইথ সাশ্রয় করে?",
    answer: `
<p>JSON প্লেন টেক্সট স্ট্রিং হিসেবে ডেটা স্টোর করে। Protobuf ফিল্ড নেম না পাঠিয়ে কাস্টম Varints এবং Tag-Length-Value (TLV) বাইনারি ফরম্যাটে ছোট সংখ্যা ১ বাইটে সংকুচিত করে পাঠায় (৮০% সাইজ কমার কারণ)।</p>
    `
  },
  {
    id: "grpc-20",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Streaming", "Bidirectional", "HTTP2"],
    question: "gRPC 4 Types of RPCs: Unary, Server Streaming, Client Streaming, Bidirectional Streaming কীভাবে কাজ করে?",
    answer: `
<p><strong>Unary:</strong> ১টি রিকুয়েস্ট -> ১টি রেসপন্স।</p><p><strong>Server Streaming:</strong> ১টি রিকুয়েস্ট -> একাধিক রেসপন্স স্ট্রিম।</p><p><strong>Client Streaming:</strong> একাধিক রিকুয়েস্ট স্ট্রিম -> ১টি রেসপন্স।</p><p><strong>Bidirectional:</strong> উভয় দিকেই স্বাধীন সকেটে সমান্তরাল ডেটা স্ট্রিম।</p>
    `
  },
  {
    id: "grpc-21",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Interceptors", "Middleware", "Auth"],
    question: "gRPC Interceptors (UnaryInterceptor vs StreamInterceptor) দিয়ে Authentication & Logging কীভাবে করবেন?",
    answer: `
<p>gRPC-এর মিডলওয়্যার সার্ভিস। ইনকামিং RPC কলে Metadata (Headers) থেকে Authorization Bearer token রিড করে ভ্যালিডেট করা এবং রেসপন্স টাইম স্টপওয়াচ হিসাব করা।</p>
    `
  },
  {
    id: "grpc-22",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Deadlines", "Timeouts", "Context"],
    question: "gRPC Deadlines / Timeouts এবং Cascading Cancellation কীভাবে সার্ভিস ক্যাস্কেডিং ফেইলিয়র প্রতিরোধ করে?",
    answer: `
<p>ক্লায়েন্ট প্রতিটি কলের সাথে Deadline (e.g. 2 seconds) পাঠায়। কলটি চেইনের মধ্যে অন্য ১০টি অভ্যন্তরীণ সার্ভিসে গেলেও টাইমআউট পার হলে পুরো সার্ভিস চেইন স্বয়ংক্রিয়ভাবে এক্সিকিউশন ক্যানসেল (CANCELLED status) করে রিসোর্স ফ্রি করে।</p>
    `
  },
  {
    id: "grpc-23",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Load Balancing", "Client-Side LB", "Lookaside LB"],
    question: "gRPC Load Balancing: Proxy Model vs Client-Side Load Balancing vs Lookaside LB (gRPC Name Resolver) কী?",
    answer: `
<p>HTTP/2 সকেট পারসিস্টেন্ট থাকায় স্ট্যান্ডার্ড L4 Load Balancer সমবন্টন করতে পারে না। Client-Side LB ক্লায়েন্ট নিজে সকেটে নাম পাওয়ার পর (Name Resolver) Round-Robin রুলস মেনে বিভিন্ন পোডে সাব-সকেট বন্টন করে।</p>
    `
  },
  {
    id: "grpc-24",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Metadata", "Headers", "Context"],
    question: "gRPC Metadata (metadata.MD) কী এবং কীভাবে Key-Value Pair হেডার প্রোপাগেট করা হয়?",
    answer: `
<p>HTTP/2 Headers-এর gRPC রূপান্তর। metadata.Pairs("authorization", "token") দিয়ে ক্লায়েন্ট থেকে সার্ভারে বা সার্ভার থেকে ক্লায়েন্টে কাস্টম হেডার পাঠানো।</p>
    `
  },
  {
    id: "grpc-25",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf", "Well-Known Types", "Timestamp"],
    question: "Protobuf Well-Known Types (google.protobuf.Timestamp, Duration, Any, Empty, Struct) কী?",
    answer: `
<p>অফিশিয়াল স্ট্যান্ডারডাইজড টাইপস। Timestamp তারিখ নির্দেশ করে, Duration সময়সীমা, Any যেকোনো ডায়নামিক প্রোটো স্ট্রাকচার ডাইনামিকালি বহন করে।</p>
    `
  },
  {
    id: "grpc-26",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Channel", "Subchannel", "Connection Pool"],
    question: "gRPC Channel, Subchannel এবং Connectivity States (IDLE, CONNECTING, READY, TRANSIENT_FAILURE, SHUTDOWN) কী?",
    answer: `
<p><strong>Channel:</strong> গ্লোবাল সকেট কানেকশন ভার্চুয়াল পাইপ। এটি ভেতরে একাধিক ফিজিক্যাল সকেট (Subchannel) মেইনটেইন করে স্টেট পরিবর্তন ট্র্যাকিং করে।</p>
    `
  },
  {
    id: "grpc-27",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Security", "TLS", "mTLS"],
    question: "gRPC Channel Security: Insecure vs TLS Credentials vs mTLS (Mutual TLS) কীভাবে কনফিগার করবেন?",
    answer: `
<p>grpc.credentials.createSsl() দিয়ে ক্লায়েন্ট ও সার্ভারের মধ্যে CA সার্টিফিকেট সিঙ্ক করে সকেটের ট্রান্সফার সম্পূর্ণ এনক্রিপ্ট করা।</p>
    `
  },
  {
    id: "grpc-28",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "Packages", "Namespaces"],
    question: "Protobuf package, option go_package, option java_package কীভাবে নেমস্পেস কলিশন এড়ায়?",
    answer: `
<p>package user.v1; ডিক্লেয়ার করলে তা ভিন্ন ভাষার সোর্স কোড জেনারেট করার সময় নিজস্ব ক্লাসের প্যাকেজ নাম ও নেমস্পেস বজায় রাখে।</p>
    `
  },
  {
    id: "grpc-29",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf", "oneof", "Unions"],
    question: "Protobuf oneof Keyword কীভাবে C-style Unions বা Polymorphic Values অফার করে?",
    answer: `
<div class="code-box"><div class="code-header"><span>protobuf</span><button class="copy-btn">Copy</button></div><pre><code>message PaymentMethod {
  oneof method {
    CreditCard credit_card = 1;
    PaypalAccount paypal = 2;
  }
}</code></pre></div><p>oneof ডিক্লেয়ার করলে একই সাথে মেমোরিতে কেবল ১টি ফিল্ড কার্যকর থাকবে।</p>
    `
  },
  {
    id: "grpc-30",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Code Generation", "protoc", "Plugins"],
    question: "protoc Compiler and gRPC Plugins (protoc-gen-go, protoc-gen-ts) কীভাবে কাজ করে?",
    answer: `
<p>.proto সোর্স ফাইল পার্স করে AST তৈরি করে এবং নির্দিষ্ট ল্যাঙ্গুয়েজ প্লাগইনের মাধ্যমে টাইপ-সেফ স্টাব (Stubs) কোড অটো-জেনারেট করে।</p>
    `
  },
  {
    id: "grpc-31",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Performance", "Compression", "gzip"],
    question: "gRPC Message Compression (gzip, deflate, snappy) কীভাবে সক্রিয় করবেন?",
    answer: `
<p>grpc-internal-encoding: gzip হেডার দিয়ে প্রতিটি RPC বার্তার প্যাকট অন-দ্য-ফ্লাই সংকুচিত করে ব্যান্ডউইথ আরও সাশ্রয় করা।</p>
    `
  },
  {
    id: "grpc-32",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Errors", "Status", "Details"],
    question: "gRPC Error Details (google.rpc.ErrorInfo, BadRequest, RetryInfo) কীভাবে সমৃদ্ধ এরর পাঠায়?",
    answer: `
<p>কেবল এরর স্ট্যাটাস কোড না পাঠিয়ে Status.withDetails() দিয়ে সাথে Validation Errors বা Retry Delay সেশন সহ সমৃদ্ধ অবজেক্ট পাঠানো।</p>
    `
  },
  {
    id: "grpc-33",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Web", "gRPC-Web", "Envoy Proxy"],
    question: "Browser JavaScript থেকে gRPC ডাকতে gRPC-Web এবং Envoy Proxy কেন প্রয়োজন?",
    answer: `
<p>ব্রাউজার নেটিভ HTTP/2 Framing সরাসরি অ্যাক্সেস করতে পারে না। gRPC-Web ব্রাউজার থেকে HTTP/1.1 বা কাস্টম প্রোটোকলে রেসপন্স পাঠায় এবং Envoy Proxy তা gRPC-তে রূপান্তর করে।</p>
    `
  },
  {
    id: "grpc-34",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "repeated", "Arrays"],
    question: "Protobuf repeated fields (packed=true) কীভাবে অ্যারে স্টোর করে?",
    answer: `
<p>repeated string tags = 1; দিয়ে অ্যারে লিস্ট বজায় রাখা। packed=true নিউমেরিক অ্যাররে ট্যাগ ওভারহেড ছাড়া ১টি স্লাইসে প্যাক করে।</p>
    `
  },
  {
    id: "grpc-35",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Testing", "grpcurl", "Mocking"],
    question: "grpcurl Tool দিয়ে cURL-এর মতো gRPC এন্ডপয়েন্ট টার্মিনাল থেকে কীভাবে টেস্ট করবেন?",
    answer: `
<p>grpcurl -plaintext -d '{"name": "Nazmul"}' localhost:50051 user.v1.UserService/SayHello আদেশ দিয়ে সরাসরি কমান্ড লাইন টেস্ট।</p>
    `
  },
  {
    id: "grpc-36",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "enum", "Zero Value"],
    question: "Protobuf Enum Design Best Practice: 0-Index UNSPECIFIED Value কেন রাখা আবশ্যক?",
    answer: `
<p>Protobuf-এ ফিল্ড না পাঠালে ডিফল্ট ভ্যালু 0 সেট হয়। তাই প্রথম Enum ভ্যালু UNKNOWN = 0 রাখা উচিত যাতে ভুল মান পড়া প্রতিরোধ হয়।</p>
    `
  },
  {
    id: "grpc-37",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Resilience", "Retry Policy", "Hedging"],
    question: "gRPC Native Service Config: Auto Retry Policy এবং Hedged Requests কীভাবে কাজ করে?",
    answer: `
<p><strong>Retry Policy:</strong> নির্দিষ্ট স্ট্যাটাস কোডে (e.g. UNAVAILABLE) স্বয়ংক্রিয় রিট্রি করা।</p><p><strong>Hedging:</strong> প্রথম সকেট স্লো হলে ব্যাকগ্রাউন্ডে ২য় নোডে সমান্তরাল বিকল্প রিকুয়েস্ট পাঠিয়ে ল্যাটেন্সি কমানো।</p>
    `
  },
  {
    id: "grpc-38",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "map", "Dictionary"],
    question: "Protobuf map<key_type, value_type> Syntax কীভাবে ডিকশনারি স্টোর করে?",
    answer: `
<p>map<string, int32> scores = 1; দিয়ে Dynamic Key-Value Pair স্টোর করা (Key অবশ্যই Primitive type হতে হবে)।</p>
    `
  },
  {
    id: "grpc-39",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Architecture", "REST vs gRPC", "Benchmark"],
    question: "REST (JSON over HTTP/1.1) vs gRPC (Protobuf over HTTP/2)-এর পারফরম্যান্স বেঞ্চমার্ক তুলনা কী?",
    answer: `
<p>gRPC ৭ থেকে ১০ গুণ পর্যন্ত দ্রুততর আউটপুট দেয়, ব্যান্ডউইথ সাশ্রয় করে, স্ট্রিম সাপোর্ট করে এবং টাইপ-সেফ কোড জেনারেটর অফার করে।</p>
    `
  },
  {
    id: "grpc-40",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "Import", "Proto Path"],
    question: "Protobuf import \"other.proto\" এবং proto_path দিয়ে ফাইল অর্গানাইজেশন কীভাবে করবেন?",
    answer: `
<p>একটি .proto ফাইল থেকে অন্য প্রোটো ফাইল ইম্পোর্ট করা এবং protoc -I=proto/ দিয়ে পাথ সোর্স নির্দেশ করা।</p>
    `
  },
  {
    id: "grpc-41",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Gateway", "OpenAPI", "protoc-gen-openapiv2"],
    question: "grpc-gateway দিয়ে automatic Swagger / OpenAPI Schema Generator কীভাবে সক্রিয় করবেন?",
    answer: `
<p>protoc-gen-openapiv2 প্লাগইন দিয়ে .proto ডিক্লারেশন থেকে স্বয়ংক্রিয় swagger.json ফাইল তৈরি করা।</p>
    `
  },
  {
    id: "grpc-42",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Context", "Call Options", "Header Injection"],
    question: "gRPC Call Options (Header, Trailer, MaxRecvMsgSize) কীভাবে সেট করবেন?",
    answer: `
<p>client.SayHello(ctx, req, grpc.MaxCallRecvMsgSize(1024 * 1024 * 10)) দিয়ে ডিফল্ট ৪MB রেসপন্স লিমিট বাড়িয়ে ১০MB করা।</p>
    `
  },
  {
    id: "grpc-43",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Keepalive", "Client Parameters", "PermitWithoutStream"],
    question: "gRPC Keepalive Client Parameters: Time, Timeout, and PermitWithoutStream টিউন কীভাবে করবেন?",
    answer: `
<p>grpc.WithKeepaliveParams(keepalive.ClientParameters{ Time: 10 * time.Second, Timeout: 3 * time.Second, PermitWithoutStream: true }) কনফিগারেশন।</p>
    `
  },
  {
    id: "grpc-44",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Debugging", "GRPC_GO_LOG_VERBOSITY", "Env"],
    question: "gRPC Internal Debugging: GRPC_GO_LOG_VERBOSITY=debug এবং GRPC_TRACE=all দিয়ে নেটওয়ার্ক ফ্রেম কীভাবে রিড করবেন?",
    answer: `
<p>টার্মিনালে এনভায়রনমেন্ট ভ্যারিয়েবল অন করে gRPC ইঞ্জিনের ভেতর চলা সকেট কানেকশন ও HTTP/2 Framing র-লগ আকারে রিড করা।</p>
    `
  },
  {
    id: "grpc-45",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Protobuf", "Custom Options", "Extensions"],
    question: "Protobuf Custom Options দিয়ে মেটাডাটা বা অডিটিং ডেকোরেটর কীভাবে বানাবেন?",
    answer: `
<p>extend google.protobuf.FieldOptions { string sensitive = 50001; } ডিক্লেয়ার করে ফিল্ডে প্রোটো লেভেল ডেকোরেটর যোগ করা।</p>
    `
  },
  {
    id: "grpc-46",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Server", "Graceful Stop", "GracefulStop"],
    question: "gRPC Server Graceful Shutdown: server.GracefulStop() vs server.Stop() কী?",
    answer: `
<p><strong>GracefulStop:</strong> নতুন রিকুয়েস্ট নেওয়া বন্ধ করে রানিং স্ট্রিমিং ও RPC প্রসেস শেষ হওয়া পর্যন্ত অপেক্ষা করে সার্ভার সকেট ক্লোজ করে।</p>
    `
  },
  {
    id: "grpc-47",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Tracing", "OpenTelemetry", "StatsHandler"],
    question: "gRPC OpenTelemetry StatsHandler দিয়ে ক্লায়েন্ট ও সার্ভারের Metrics & Tracing কীভাবে ট্র্যাকিং করবেন?",
    answer: `
<p>stats.Handler ইন্টিগ্রেট করে প্রতিটি RPC কলের সাইজ, টাইম এবং স্ট্যাটাস কোড অটোমেটিক Prometheus বা Jaeger-এ পাঠানো।</p>
    `
  },
  {
    id: "grpc-48",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Protobuf", "Deprecated", "deprecated option"],
    question: "Protobuf option deprecated = true কীভাবে কোড জেনারেটরে ওয়ার্নিং ফায়ার করে?",
    answer: `
<p>string old_field = 1 [deprecated = true]; দিলে আইডিই ও কম্পাইলার ডেভেলপারদের ওয়ার্নিং দেয় যে ফিল্ডটি আগামীতে রিমুভ করা হবে।</p>
    `
  },
  {
    id: "grpc-49",
    category: "gRPC",
    difficulty: "Advanced",
    tags: ["Connection", "Subchannel Reconnection", "Backoff"],
    question: "gRPC Subchannel Connection Backoff Algorithm কীভাবে কাজ করে?",
    answer: `
<p>সার্ভার রেসপন্স না দিলে কানেকশন লুপ এড়াতে টাইমআউট ১ সে, ২ সে, ৪ সে করে বাড়িয়ে ট্রাই করে (Exponent backoff with random jitter)।</p>
    `
  },
  {
    id: "grpc-50",
    category: "gRPC",
    difficulty: "Intermediate",
    tags: ["Testing", "Buf Breaking", "CI CD"],
    question: "CI/CD Pipeline-এ buf breaking --against \".git#branch=main\" দিয়ে Breaking Change Detection কীভাবে করবেন?",
    answer: `
<p>পুল রিকুয়েস্টে (PR) কোনো ডেভেলপার ভুলবশত Protobuf ফিল্ড ট্যাগ চেঞ্জ বা ডিলিট করলে বিফোর-আফটার গিট ব্রাঞ্চ কম্পেয়ার করে বিল্ড ফেইল করানো।</p>
    `
  }
];
