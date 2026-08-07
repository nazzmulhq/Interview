const rabbitmqKafkaQuestions = [
  {
    id: "mq-1",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ", "Kafka", "Architecture"],
    question: "RabbitMQ (Message Broker) এবং Apache Kafka (Event Streaming Platform)-এর মধ্যে মূল স্থাপত্যগত (Architectural) পার্থক্য কী?",
    answer: `
      <p>উভয়ই ডিস্ট্রিবিউটেড মেসেজিংয়ে ব্যবহৃত হলেও তাদের কাজের দর্শন ও আর্কিটেকচার সম্পূর্ণ ভিন্ন:</p>
      <h4>RabbitMQ (Smart Broker, Dumb Consumer):</h4>
      <ul>
        <li><strong>Architecture:</strong> এটি একটি প্রথাগত <strong>Message Broker</strong> যা AMQP (Advanced Message Queuing Protocol) মান অনুসরণ করে।</li>
        <li><strong>Message Delivery:</strong> মেসেজ কনজিউমার (Consumer) সফলভাবে গ্রহণ (ACK) করা মাত্রই ব্রোকার সেই মেসেজ কিউ (Queue) থেকে <em>মুছে ফেলে</em>।</li>
        <li><strong>Routing:</strong> এক্সচেঞ্জ (Exchange) ও রাউটিং কি-এর মাধ্যমে অত্যন্ত জটিল বার্তা রাউটিং (Complex Routing) করতে পারে।</li>
      </ul>
      <h4>Apache Kafka (Dumb Broker, Smart Consumer):</h4>
      <ul>
        <li><strong>Architecture:</strong> এটি একটি <strong>Distributed Commit Log / Event Streaming Platform</strong>।</li>
        <li><strong>Message Retention:</strong> কনজিউমার কনজিউম করার পরও মেসেজ ডিলেট হয় না। পার্টিশন লগে নির্দিষ্ট রিটেনশন সময় (যেমন 7 days) পর্যন্ত অক্ষত থাকে।</li>
        <li><strong>Replayability:</strong> কনজিউমার চাইলে অফসেট (Offset) রিওয়াইন্ড করে পুরোনো মেসেজ পুনরায় রিড (Replay) করতে পারে।</li>
        <li><strong>Throughput:</strong> প্রতি সেকেন্ডে লাখ লাখ ইভেন্ট স্ট্রিমিং ও বি ডেটা অ্যানালিটিক্সের জন্য অত্যন্ত দ্রুত (Ultra High-Throughput)।</li>
      </ul>
    `
  },
  {
    id: "mq-2",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ", "Exchanges", "AMQP"],
    question: "RabbitMQ-এর ৪ ধরনের Exchanges (Direct, Fanout, Topic, Headers) কীভাবে কাজ করে?",
    answer: `
      <p>RabbitMQ-তে প্রডিউসার সরাসরি কিউতে মেসেজ পাঠায় না; মেসেজ প্রথমে <strong>Exchange</strong>-এ যায়, যা রাউটিং কি (Routing Key) এবং বাইন্ডিং (Bindings) অনুযায়ী মেসেজকে উপযুক্ত কিউতে পাঠায়।</p>
      <ol>
        <li><strong>Direct Exchange:</strong> মেসেজের <code>routing_key</code> এবং কিউয়ের <code>binding_key</code> হুবহু ১০০% মিললে মেসেজ রুট করে। (যেমন: <code>routing_key = 'payment.success'</code>)।</li>
        <li><strong>Fanout Exchange:</strong> রাউটিং কি সম্পূর্ণ ইগনোর করে এর সাথে যুক্ত (Bound) <em>সকল কিউতে</em> মেসেজের কপি ব্রডকাস্ট করে দেয় (Pub/Sub pattern)।</li>
        <li><strong>Topic Exchange:</strong> ওয়াইল্ডকার্ড ডট প্যাটার্ন মেলানো হয় (<code>*</code> ১টি ওয়ার্ডের সাথে মেলে, <code>#</code> শূন্য বা একাধিক ওয়ার্ডের সাথে মেলে)। যেমন: <code>order.*.completed</code>।</li>
        <li><strong>Headers Exchange:</strong> রাউটিং কি-এর বদলে মেসেজের HTTP Header এট্রিবিউটের ওপর ভিত্তি করে রাউট করে।</li>
      </ol>
    `
  },
  {
    id: "mq-3",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ", "DLX", "Dead Letter Exchange"],
    question: "RabbitMQ Dead Letter Exchange (DLX) কী এবং কোনো মেসেজ কখন Dead Letter হয়?",
    answer: `
      <p><strong>Dead Letter Exchange (DLX):</strong> কোনো সাধারণ কিউতে প্রসেস হতে ব্যর্থ হওয়া মেসেজগুলো নষ্ট বা ড্রপ না করে যে বিশেষ এক্সচেঞ্জে ফরোয়ার্ড করা হয়, তাকে <strong>DLX</strong> বলে।</p>
      <h4>মেসেজ Dead Letter হওয়ার ৩টি প্রধান কারণ:</h4>
      <ol>
        <li>কনজিউমার মেসেজটিকে <code>nack</code> বা <code>reject</code> করেছে এবং <code>requeue = false</code> সেট করা রয়েছে।</li>
        <li>মেসেজের মেয়াদ শেষ হয়ে গেছে (Message TTL Expiry)।</li>
        <li>কিউয়ের সর্বোচ্চ ধারণক্ষমতা সীমা অতিক্রম করেছে (Queue Max-Length Exceeded)।</li>
      </ol>
      <p><em>ব্যবহার:</em> ফেইলড মেসেজ ট্র্যাক করা, অ্যালার্ট পাঠানো বা ম্যানুয়াল ইনস্পেকশনের জন্য ডেডিকেটেড DLQ (Dead Letter Queue)-তে রাখা।</p>
    `
  },
  {
    id: "mq-4",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ", "Prefetch Count", "Flow Control"],
    question: "RabbitMQ Prefetch Count (qos) কেন সেট করা আবশ্যক?",
    answer: `
      <p>ডিফল্টভাবে RabbitMQ কিউতে মেসেজ আসামাত্রই Round-robin স্টাইলে কনজিউমারকে গণহারে পাঠাতে থাকে। কনজিউমারের ধারণক্ষমতা না মেপেই আনলিমিটেড মেসেজ পুশ করলে কনজিউমার সার্ভার মেমোরি ফুল হয়ে ক্র্যাশ করতে পারে।</p>
      <p><strong>Prefetch Count (channel.prefetch(10)):</strong> এটি নির্ধারণ করে কনজিউমার নিশ্চিতভাবে আগের প্রসেস হওয়া মেসেজের <code>ACK</code> না পাঠানো পর্যন্ত ব্রোকার সর্বোচ্চ কতটি আন-অ্যাকনলেজড মেসেজ কনজিউমারকে দেবে।</p>
      <p><em>সেরা চর্চা:</em> হেভি টাস্কের জন্য <code>prefetch(1)</code> সেট করলে কেবল আগের টাস্ক শেষ হলেই পরবর্তী টাস্ক কনজিউমার পায় (Fair Dispatching)।</p>
    `
  },
  {
    id: "mq-5",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka", "Partitioning", "Consumer Groups"],
    question: "Apache Kafka-তে Topics, Partitions এবং Consumer Groups-এর স্কেলেবিলিটি সম্পর্ক ব্যাখ্যা করুন।",
    answer: `
      <p>Kafka-এর অসামান্য স্কেলেবিলিটির মূল রহস্য হলো **Partitions** এবং **Consumer Groups**-এর যুগল সমন্বয়:</p>
      <ul>
        <li><strong>Topic:</strong> ইভেন্ট স্ট্রিমিংয়ের একটি লজিক্যাল নাম বা ক্যাটাগরি (যেমন: <code>user-events</code>)।</li>
        <li><strong>Partition:</strong> একটি টপিককে একাধিক ফিজিক্যাল লগে ভাগ করে বহু সার্ভারে ছড়িয়ে দেওয়াকে Partition বলে। মেসেজের <code>Record Key</code>-এর হ্যাশ ভ্যালু দিয়ে নির্দিষ্ট পার্টিশনে পাঠানো হয়।</li>
        <li><strong>Consumer Group:</strong> একাধিক কনজিউমার সার্ভিস একসাথে একটি মেম্বার গ্রুপ তৈরি করে টপিকের পার্টিশনগুলো নিজেদের মধ্যে ভাগ করে রিড করে।</li>
      </ul>
      <h4>গুরুত্বপূর্ণ স্কেলিং রুল:</h4>
      <p>একটি পার্টিশন একটি Consumer Group-এর <strong>একটির বেশি কনজিউমার দ্বারা সমান্তরালে পঠিত হতে পারে না</strong>। তাই কোনো টপিকের সমান্তরাল প্রসেসিং সক্ষমতা বাড়াতে চাইলে তার পার্টিশন সংখ্যা বাড়াতে হবে (যেমন ৪টি পার্টিশন থাকলে ৪টি কনজিউমার প্যারালালে রিড করতে পারবে)।</p>
    `
  },
  {
    id: "mq-6",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka", "Producer Acks", "Reliability"],
    question: "Kafka Producer Acks (acks=0, acks=1, acks=all / -1)-এর মধ্যে পার্থক্য কী এবং ডাটা লস রোধে সেরা সেটিংস কোনটি?",
    answer: `
      <p>Kafka Producer ইভেন্ট রাইট করার পর ব্রোকারের কাছ থেকে প্রডিউসার কেমন অ্যাকনলেজমেন্টের জন্য অপেক্ষা করবে তা <code>acks</code> কনফিগ দিয়ে ঠিক করা হয়:</p>
      <ul>
        <li><strong>acks = 0:</strong> প্রডিউসার মেসেজ পাঠিয়েই নিশ্চিত ধরে নেয়, ব্রোকারের কোনো অ্যাকনলেজমেন্টের অপেক্ষা করে না। <em>(উচ্চ স্পিড, কিন্তু মেমোরিতে ডাটা লসের প্রবল সম্ভাবনা)</em>।</li>
        <li><strong>acks = 1 (ডিফল্ট):</strong> কেবল <strong>Leader Partition Node</strong> মেসেজটি ডিস্কে রাইট করলে Success ACK দেয়। (লিডার ক্র্যাশ করলে কিন্তু রেপ্লিকাতে সিঙ্ক না হলে ডাটা হারাবে)।</li>
        <li><strong>acks = all (বা -1):</strong> Leader Node এবং তার <strong>In-Sync Replicas (ISR)</strong> প্রত্যেকে মেসেজ স্থায়ীভাবে সেভ করার পরেই কেবল Success ACK দেয়।</li>
      </ul>
      <p><em>Zero Data Loss Settings:</em> <code>acks = all</code> এবং টপিক কনফিগারেশনে <code>min.insync.replicas = 2</code> সেট করা।</p>
    `
  },
  {
    id: "mq-7",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka", "Offset", "Consumer Offset Management"],
    question: "Kafka Offset কী? Auto-commit vs Manual Commit-এর মধ্যে কেন Manual Offset Commit বেছে নেওয়া উচিত?",
    answer: `
      <p><strong>Offset:</strong> পার্টিশনের প্রতিটি মেসেজের জন্য একটি ক্রমাগত বৃদ্ধি পাওয়া সিকোয়েন্সিয়াল আইডেন্টিফায়ার (অফসেট নাম্বার)। কনজিউমার কত নম্বর অফসেট পর্যন্ত রিড করেছে তা <code>__consumer_offsets</code> টপিকে সেভ থাকে।</p>
      <h4>Auto-commit (enable.auto.commit = true):</h4>
      <p>প্রতি ৫ সেকেন্ড পর পর অটোমেটিক্যালি অফসেট সেভ হয়ে যায়। কিন্তু কনজিউমার মেসেজ পেয়ে প্রসেস শেষ করার আগেই যদি ক্র্যাশ করে, তবে সেই মেসেজটি আর প্রসেস হবে না (Data Loss)।</p>
      <h4>Manual Commit (enable.auto.commit = false):</h4>
      <p>কনজিউমার কোডে বিজনেস লজিক এবং ডাটাবেজ সেভ সফলভাবে হওয়ার পরেই কেবল <code>consumer.commitSync()</code> বা <code>commitAsync()</code> ডায়নামিক্যালি ম্যানুয়ালি কল করা হয়। এতে ডাটা লস এড়ানো যায়।</p>
    `
  },
  {
    id: "mq-8",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka", "Exactly Once", "Transactional Producer"],
    question: "Apache Kafka-তে Exactly-Once Processing Semantics (EOS) কীভাবে অর্জিত হয়?",
    answer: `
      <p>ডিস্ট্রিবিউটেড মেসেজিংয়ে ৩টি সেমান্টিক্স থাকে: <em>At-Most-Once</em>, <em>At-Least-Once</em>, এবং <strong>Exactly-Once</strong>।</p>
      <h4>Kafka EOS-এর ৩টি স্তম্ভ:</h4>
      <ol>
        <li><strong>Idempotent Producer (enable.idempotence = true):</strong> প্রডিউসার নেটওয়ার্ক গ্লিচের জন্য একই মেসেজ পুনরায় পাঠালেও ব্রোকার প্রডিউসার আইডি (PID) ও সিকোয়েন্স নাম্বার দিয়ে চিনে নিয়ে ডুপ্লিকেট রাইট ড্রপ করে দেয়।</li>
        <li><strong>Transactional Coordinator:</strong> Read-Process-Write লুপের মধ্যে ইনপুট অফসেট কমিট এবং আউটপুট মেসেজ রাইট একটি এটমিক ট্রানজেকশনে সম্পাদন করে।</li>
        <li><strong>Read Committed Consumer (isolation.level = read_committed):</strong> কনজিউমার কেবল অসংকীর্ণ ট্রানজেকশনাল রাইট হওয়া ইভেন্টগুলো রিড করে।</li>
      </ol>
    `
  },
  {
    id: "mq-9",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ", "Publish Confirm", "Node.js"],
    question: "Node.js (amqplib) দিয়ে RabbitMQ Publisher Confirm এবং Consumer Ack কোড উদাহরণসহ লিখুন।",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const amqp = require('amqplib');

async function setupMessaging() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'order_created_queue';
  await channel.assertQueue(queue, { durable: true });

  // Fair Dispatching
  channel.prefetch(1);

  // Consumer Code with Manual ACK
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      try {
        const order = JSON.parse(msg.content.toString());
        console.log('Processing Order:', order.id);
        
        // Business logic...
        channel.ack(msg); // Successfully processed
      } catch (err) {
        console.error('Error processing, sending to DLQ');
        channel.nack(msg, false, false); // Don't requeue, send to DLX
      }
    }
  });
}
setupMessaging();</code></pre>
      </div>
    `
  },
  {
    id: "mq-10",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Kafka", "KafkaJS", "Node.js"],
    question: "Node.js (kafkajs) দিয়ে Kafka Producer এবং Consumer Group সেটআপ কীভাবে করবেন?",
    answer: `
      <div class="code-box">
        <div class="code-header"><span>javascript</span><button class="copy-btn">Copy</button></div>
        <pre><code>const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-payment-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'payment-group' });

async function run() {
  await producer.connect();
  await consumer.connect();

  // Subscribe Consumer Group to Topic
  await consumer.subscribe({ topic: 'payment-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        offset: message.offset
      });
    },
  });
}
run();</code></pre>
      </div>
    `
  }
,

  {
    id: "mq-11",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Log Compaction","Topics"],
    question: "Kafka Compacted Topics (Log Compaction) কী?",
    answer: `
<p>Log Compaction অন থাকলে Kafka পুরাতন ইতিহাস মুছে ফেলে প্রতিটি Message Key-এর কেবল সর্বশেষ সাম্প্রতিক মানটি রেখে দেয়।</p>
    `
  },
  {
    id: "mq-12",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["RabbitMQ","Quorum Queues","Raft"],
    question: "RabbitMQ Quorum Queues কী এবং এটি কেন ব্যবহার করা হয়?",
    answer: `
<p>Raft Consensus Algorithm ভিত্তিক ডিস্ট্রিবিউটেড কিউ যা নেটওয়ার্ক পার্টিশন ও ডাটা লস প্রতিরোধে শক্তিশালী হাই-অ্যাভেইলেবিলিটি অফার করে।</p>
    `
  },
  {
    id: "mq-13",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Kafka","Rebalance","Consumers"],
    question: "Kafka Rebalance Protocol এবং Cooperative Sticky Assignor কীভাবে কাজ করে?",
    answer: `
<p>Cooperative Sticky Assignor পুরো কনজিউমার থ্রেড না থামিয়ে কেবল প্রয়োজনীয় পার্টিশন রিব্যালেন্স করে ল্যাটেন্সি কমায়।</p>
    `
  },
  {
    id: "mq-14",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Architecture","Deduplication","Idempotency"],
    question: "Message Consumer-এ Deduplication (Idempotent Consumer) কীভাবে নিশ্চিত করা হয়?",
    answer: `
<p>ইউনিক Unique Message ID পাঠাতে হয়। কনজিউমার মেসেজ প্রসেস করার আগে Redis/DB-তে আইডি চেক করে প্রসেসড থাকলে ইগনোর করে।</p>
    `
  },
  {
    id: "mq-15",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["Schema","Avro","Serialization"],
    question: "Kafka Schema Registry এবং Avro Serialization কেন ব্যবহার করা হয়?",
    answer: `
<p>Avro বাইনারি ফরম্যাটে কম সাইজে ডাটা স্ট্রিমিং করে এবং Schema Registry স্কিমার সামঞ্জস্য বজায় রাখে।</p>
    `
  },
  {
    id: "mq-16",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["RabbitMQ","Priority Queues","Queues"],
    question: "RabbitMQ Priority Queues কীভাবে বার্তা অগ্রাধিকার নির্ধারণ করে?",
    answer: `
<p><code>x-max-priority</code> কিউ আর্গুমেন্ট ডিফাইন করে প্রতিটি বার্তার সাথে <code>priority: 10</code> হেডার দিয়ে জরুরি বার্তা আগে প্রসেস করা হয়।</p>
    `
  },
  {
    id: "mq-17",
    category: "RabbitMQ & Kafka",
    difficulty: "Advanced",
    tags: ["CDC","Kafka Connect","Debezium"],
    question: "Kafka Connect এবং Debezium (CDC) কী?",
    answer: `
<p>Debezium ডাটাবেজের Transaction Log রিড করে সরাসরি ডাটাবেজের সব পরিবর্তন কাফকা টপিকে রিয়েল-টাইম ইভেন্ট স্ট্রিমিং করে।</p>
    `
  },
  {
    id: "mq-18",
    category: "RabbitMQ & Kafka",
    difficulty: "Intermediate",
    tags: ["Performance","Backpressure","Flow"],
    question: "Event Consumers-এ Backpressure Handling কীভাবে করবেন?",
    answer: `
<p>RabbitMQ-তে <code>prefetch count</code> সেট করে এবং Kafka-তে <code>pause()/resume()</code> দিয়ে কনজিউমার ফ্লো কন্ট্রোল করা হয়।</p>
    `
  }
];
