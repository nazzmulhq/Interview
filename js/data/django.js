const django = [
  {
    "id": "django-1",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "Django",
      "Framework"
    ],
    "question": "Django কী এবং কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Django হলো Python-এর high-level web framework। এটি secure, scalable এবং maintainable web application ও backend API তৈরি করার জন্য ব্যবহৃত হয়।</p>\n      <p><strong>Django-এর গুরুত্বপূর্ণ সুবিধা:</strong><br>1. ORM<br>2. Authentication<br>3. Authorization<br>4. Admin Panel<br>5. Middleware<br>6. URL Routing<br>7. Forms<br>8. Security<br>9. Migration<br>10. Template Engine</p>\n      <p>Django-এর মূল philosophy হলো \"batteries included\"। অর্থাৎ common web application-এর অনেক functionality built-in পাওয়া যায়।</p>\n    "
  },
  {
    "id": "django-2",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "Architecture",
      "MVT"
    ],
    "question": "Django MVT architecture কী?",
    "answer": "\n      <p>Django সাধারণত MVT architecture ব্যবহার করে।</p>\n      <p>M = Model<br>V = View<br>T = Template</p>\n      <p><strong>Model:</strong><br>Database structure এবং data access handle করে।</p>\n      <p><strong>View:</strong><br>Request process করে এবং response তৈরি করে।</p>\n      <p><strong>Template:</strong><br>HTML presentation handle করে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n  ↓\nURL\n  ↓\nView\n  ↓\nModel\n  ↓\nDatabase\n  ↓\nView\n  ↓\nTemplate/Response\n  ↓\nClient</code></pre>\n      </div>\n    "
  },
  {
    "id": "django-3",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "Project",
      "App",
      "Structure"
    ],
    "question": "Django Project এবং Django App-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>Django Project হলো পুরো application-এর configuration এবং main container।</p>\n      <p>Django App হলো নির্দিষ্ট business functionality-এর একটি module।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>my_project/\n    manage.py\n    config/\n    users/\n    products/\n    orders/\n    payments/</code></pre>\n      </div>\n      <h4>এখানে:</h4>\n      <p>config → project configuration<br>users → user management<br>products → product management<br>orders → order management<br>payments → payment management</p>\n      <p>একটি Django project-এর মধ্যে একাধিক app থাকতে পারে।</p>\n    "
  },
  {
    "id": "django-4",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "manage.py",
      "CLI"
    ],
    "question": "manage.py কী?",
    "answer": "\n      <p>manage.py হলো Django project-এর command-line utility।</p>\n      <p>এটি দিয়ে বিভিন্ন administrative এবং development command চালানো হয়।</p>\n      <h4>Common commands:</h4>\n      <p>python manage.py runserver<br>python manage.py startapp users<br>python manage.py makemigrations<br>python manage.py migrate<br>python manage.py createsuperuser<br>python manage.py shell<br>python manage.py test</p>\n      <p>manage.py মূলত Django project-এর settings/configuration-এর সাথে command-line interface হিসেবে কাজ করে।</p>\n    "
  },
  {
    "id": "django-5",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "Settings",
      "Configuration"
    ],
    "question": "Django settings.py কী?",
    "answer": "\n      <p>settings.py হলো Django project-এর প্রধান configuration file।</p>\n      <h4>এখানে সাধারণত থাকে:</h4>\n      <ul>\n        <li>SECRET_KEY</li>\n        <li>DEBUG</li>\n        <li>ALLOWED_HOSTS</li>\n        <li>INSTALLED_APPS</li>\n        <li>MIDDLEWARE</li>\n        <li>DATABASES</li>\n        <li>TEMPLATES</li>\n        <li>STATIC_URL</li>\n        <li>MEDIA_URL</li>\n        <li>AUTH_USER_MODEL</li>\n        <li>REST framework configuration</li>\n      </ul>\n      <p>Production environment-এ secret এবং environment-specific configuration source code-এ hardcode না করে environment variable বা secret manager ব্যবহার করা উচিত।</p>\n    "
  },
  {
    "id": "django-6",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "URL",
      "Routing"
    ],
    "question": "Django URL routing কীভাবে কাজ করে?",
    "answer": "\n      <p>Django URL routing incoming request-এর URL দেখে নির্দিষ্ট view-এর সাথে request map করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>/users/\n/products/\n/orders/</code></pre>\n      </div>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>HTTP Request\n    ↓\nurls.py\n    ↓\nURL Pattern\n    ↓\nView\n    ↓\nResponse</code></pre>\n      </div>\n      <p>Django path() এবং re_path() ব্যবহার করে URL define করা যায়।</p>\n      <p>Large project-এ app-level urls.py ব্যবহার করে URL structure modular রাখা ভালো।</p>\n    "
  },
  {
    "id": "django-7",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "Views",
      "Request",
      "Response"
    ],
    "question": "Django View কী?",
    "answer": "\n      <p>View হলো Django-এর সেই component যা HTTP request process করে এবং HTTP response return করে।</p>\n      <h4>View দুইভাবে লেখা যায়:</h4>\n      <ol>\n        <li>Function-Based View (FBV)</li>\n        <li>Class-Based View (CBV)</li>\n      </ol>\n      <h4>Basic flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nView\n ↓\nBusiness Logic\n ↓\nDatabase\n ↓\nResponse</code></pre>\n      </div>\n      <p>API project-এ DRF সাধারণত View-এর উপর আরও abstraction দেয়।</p>\n    "
  },
  {
    "id": "django-8",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "FBV",
      "CBV",
      "Views"
    ],
    "question": "Function-Based View এবং Class-Based View-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Function-Based View:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>def user_list(request):\n    ...</code></pre>\n      </div>\n      <p>সহজ এবং ছোট logic-এর জন্য convenient।</p>\n      <h4>Class-Based View:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class UserListView(View):\n    def get(self, request):\n        ...</code></pre>\n      </div>\n      <p>Inheritance এবং reusable behavior-এর সুবিধা পাওয়া যায়।</p>\n      <p><strong>FBV:</strong></p>\n      <ul>\n        <li>Simple</li>\n        <li>Explicit</li>\n        <li>Easy to understand</li>\n      </ul>\n      <p><strong>CBV:</strong></p>\n      <ul>\n        <li>Reusable</li>\n        <li>Inheritance</li>\n        <li>Generic behavior</li>\n      </ul>\n      <p>কোনটি ব্যবহার করবেন তা project architecture এবং team convention-এর উপর নির্ভর করে।</p>\n    "
  },
  {
    "id": "django-9",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Middleware",
      "Request",
      "Response"
    ],
    "question": "Django Middleware কী?",
    "answer": "\n      <p>Middleware হলো request এবং response processing-এর মাঝখানে কাজ করা component।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nMiddleware\n ↓\nView\n ↓\nMiddleware\n ↓\nClient</code></pre>\n      </div>\n      <h4>Middleware-এর common use:</h4>\n      <ul>\n        <li>Authentication</li>\n        <li>Logging</li>\n        <li>Security</li>\n        <li>Session</li>\n        <li>CORS</li>\n        <li>Request ID</li>\n        <li>Performance monitoring</li>\n      </ul>\n      <p>Middleware global cross-cutting concern-এর জন্য ব্যবহার করা উচিত। Business-specific logic সাধারণত middleware-এ রাখা উচিত নয়।</p>\n    "
  },
  {
    "id": "django-10",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Middleware",
      "Order"
    ],
    "question": "Django middleware order কেন গুরুত্বপূর্ণ?",
    "answer": "\n      <p>Django middleware sequential order-এ execute হয়।</p>\n      <p>একটি middleware অন্য middleware-এর আগে বা পরে request/response process করতে পারে।</p>\n      <h4>তাই middleware order ভুল হলে:</h4>\n      <ul>\n        <li>Authentication issue</li>\n        <li>CORS issue</li>\n        <li>Security issue</li>\n        <li>Session issue</li>\n      </ul>\n      <p>হতে পারে।</p>\n      <p>বিশেষ করে security, authentication, session এবং CORS middleware-এর order বুঝে configure করতে হয়।</p>\n    "
  },
  {
    "id": "django-11",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "ORM",
      "Database"
    ],
    "question": "Django ORM কী?",
    "answer": "\n      <p>ORM-এর পূর্ণরূপ Object Relational Mapping।</p>\n      <p>Django ORM Python object এবং relational database-এর মধ্যে abstraction তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User.objects.filter(is_active=True)</code></pre>\n      </div>\n      <h4>ORM দিয়ে:</h4>\n      <ul>\n        <li>Create</li>\n        <li>Read</li>\n        <li>Update</li>\n        <li>Delete</li>\n        <li>Filtering</li>\n        <li>Joining</li>\n        <li>Aggregation</li>\n        <li>Annotation</li>\n      </ul>\n      <p>করা যায়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Python\n ↓\nDjango ORM\n ↓\nSQL\n ↓\nDatabase</code></pre>\n      </div>\n    "
  },
  {
    "id": "django-12",
    "category": "Django",
    "difficulty": "Beginner",
    "tags": [
      "Model",
      "Database"
    ],
    "question": "Django Model কী?",
    "answer": "\n      <p>Django Model হলো database table-এর Python representation।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Product(models.Model):\n    name = models.CharField(max_length=200)\n    price = models.DecimalField(max_digits=10, decimal_places=2)</code></pre>\n      </div>\n      <h4>Conceptually:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Product Model\n      ↓\nDatabase Table</code></pre>\n      </div>\n      <p>Model field সাধারণত database column-এর সাথে map করে।</p>\n      <p>Django ORM model-এর মাধ্যমে database operation করা যায়।</p>\n    "
  },
  {
    "id": "django-13",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Model",
      "Relationships"
    ],
    "question": "Django Model Relationship কী কী?",
    "answer": "\n      <h4>Django তিনটি প্রধান database relationship support করে:</h4>\n      <ol>\n        <li>One-to-One</li>\n        <li>ForeignKey / Many-to-One</li>\n        <li>Many-to-Many</li>\n      </ol>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n ↓\nProfile</code></pre>\n      </div>\n      <ul>\n        <li>OneToOne</li>\n      </ul>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User\n ↓\nOrders</code></pre>\n      </div>\n      <ul>\n        <li>ForeignKey</li>\n      </ul>\n      <p>Product<br> ↕<br>Category</p>\n      <ul>\n        <li>ManyToMany</li>\n      </ul>\n      <p>Relationship সঠিকভাবে design করা database consistency এবং query performance-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "django-14",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "ForeignKey",
      "Database"
    ],
    "question": "ForeignKey কী?",
    "answer": "\n      <p>ForeignKey হলো Django model-এর relationship field যা Many-to-One relationship তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Order(models.Model):\n    customer = models.ForeignKey(\n        User,\n        on_delete=models.CASCADE\n    )</code></pre>\n      </div>\n      <h4>এর অর্থ:</h4>\n      <p>একজন User-এর অনেক Order থাকতে পারে।</p>\n      <p>User<br> ├── Order 1<br> ├── Order 2<br> └── Order 3</p>\n      <p>on_delete behaviour determine করে related object delete হলে কী হবে।</p>\n    "
  },
  {
    "id": "django-15",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "on_delete",
      "ForeignKey"
    ],
    "question": "Django ForeignKey-এর on_delete কী?",
    "answer": "\n      <p>on_delete determine করে referenced object delete হলে related object-এর কী হবে।</p>\n      <h4>Common options:</h4>\n      <p>CASCADE<br>→ Parent delete হলে child delete।</p>\n      <p>PROTECT<br>→ Child থাকলে parent delete prevent।</p>\n      <p>SET_NULL<br>→ Foreign key NULL করে।</p>\n      <p>SET_DEFAULT<br>→ Default value set করে।</p>\n      <p>DO_NOTHING<br>→ Django automatic action নেয় না।</p>\n      <p>Business requirement অনুযায়ী সঠিক on_delete নির্বাচন করতে হয়।</p>\n    "
  },
  {
    "id": "django-16",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Migration",
      "Database"
    ],
    "question": "Django Migration কী?",
    "answer": "\n      <p>Migration হলো database schema change-এর version-controlled representation।</p>\n      <h4>Model change:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>class Product(models.Model):\n    name = models.CharField(...)\n    price = models.DecimalField(...)</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n      <p>python manage.py makemigrations</p>\n      <p>Migration file তৈরি হবে।</p>\n      <h4>তারপর:</h4>\n      <p>python manage.py migrate</p>\n      <p>Database schema update হবে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Model Change\n ↓\nmakemigrations\n ↓\nMigration File\n ↓\nmigrate\n ↓\nDatabase</code></pre>\n      </div>\n    "
  },
  {
    "id": "django-17",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Migration",
      "Production"
    ],
    "question": "makemigrations এবং migrate-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>makemigrations:</h4>\n      <p>Model-এর পরিবর্তন detect করে migration file তৈরি করে।</p>\n      <h4>migrate:</h4>\n      <p>Migration file database-এ apply করে।</p>\n      <h4>অর্থাৎ:</h4>\n      <p>makemigrations<br>→ Migration তৈরি</p>\n      <p>migrate<br>→ Database update</p>\n      <p>Production deployment-এ migration files version control-এ রাখা উচিত।</p>\n    "
  },
  {
    "id": "django-18",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "QuerySet",
      "ORM"
    ],
    "question": "Django QuerySet কী?",
    "answer": "\n      <p>QuerySet হলো database query-এর representation।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users = User.objects.filter(is_active=True)</code></pre>\n      </div>\n      <p>QuerySet সাধারণত lazy।</p>\n      <p>অর্থাৎ QuerySet তৈরি করলেই database query সবসময় immediately execute হয় না।</p>\n      <h4>QuerySet chain করা যায়:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User.objects\n    .filter(is_active=True)\n    .order_by(\"-created_at\")</code></pre>\n      </div>\n      <p>এটি readable এবং composable database query তৈরি করতে সাহায্য করে।</p>\n    "
  },
  {
    "id": "django-19",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "QuerySet",
      "Lazy Evaluation"
    ],
    "question": "Django QuerySet lazy কেন?",
    "answer": "\n      <p>Django QuerySet প্রয়োজন হওয়ার আগে database query execute না করার চেষ্টা করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>users = User.objects.filter(is_active=True)</code></pre>\n      </div>\n      <p>এখানে QuerySet তৈরি হয়েছে।</p>\n      <h4>তারপর:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for user in users:\n    print(user.name)</code></pre>\n      </div>\n      <p>এসময় database query execute হতে পারে।</p>\n      <h4>Lazy evaluation-এর সুবিধা:</h4>\n      <ul>\n        <li>Query chain করা যায়</li>\n        <li>Unnecessary query avoid করা যায়</li>\n        <li>Query optimize করা যায়</li>\n      </ul>\n      <p>তবে QuerySet কখন evaluate হচ্ছে তা জানা performance-এর জন্য গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "django-20",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "select_related",
      "prefetch_related",
      "ORM"
    ],
    "question": "select_related এবং prefetch_related-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>দুটিই related object efficiently load করার জন্য ব্যবহৃত হয়।</p>\n      <p><strong>select_related:</strong></p>\n      <ul>\n        <li>ForeignKey</li>\n        <li>OneToOne</li>\n      </ul>\n      <p>সাধারণত SQL JOIN ব্যবহার করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Order.objects.select_related(\"customer\")</code></pre>\n      </div>\n      <p><strong>prefetch_related:</strong></p>\n      <ul>\n        <li>ManyToMany</li>\n        <li>Reverse ForeignKey</li>\n        <li>Related objects আলাদা query করে load করতে পারে।</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Order.objects.prefetch_related(\"items\")</code></pre>\n      </div>\n      <h4>Rule:</h4>\n      <p>Single-valued relation<br>→ select_related</p>\n      <p>Multi-valued relation<br>→ prefetch_related</p>\n    "
  },
  {
    "id": "django-21",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "N+1",
      "Performance",
      "ORM"
    ],
    "question": "Django-তে N+1 query problem কী?",
    "answer": "\n      <p>প্রথমে একটি query দিয়ে main records আনা হয়, তারপর প্রতিটি record-এর related data-এর জন্য আলাদা query চালানো হলে N+1 problem তৈরি হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>orders = Order.objects.all()</code></pre>\n      </div>\n      <p><strong>প্রথম query:</strong></p>\n      <ul>\n        <li>Orders</li>\n      </ul>\n      <h4>তারপর 100 order-এর customer access করলে:</h4>\n      <p>100 additional queries</p>\n      <p><strong>Total:</strong><br>101 queries</p>\n      <h4>Solution:</h4>\n      <p>select_related()<br>অথবা<br>prefetch_related()</p>\n      <p>ব্যবহার করা যায়।</p>\n      <p>Production API performance-এর জন্য N+1 query identify করা খুব গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "django-22",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Manager",
      "QuerySet"
    ],
    "question": "Django Manager কী?",
    "answer": "\n      <p>Manager হলো Django model-এর database query interface।</p>\n      <h4>Default manager:</h4>\n      <p>objects</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User.objects.all()</code></pre>\n      </div>\n      <p>Custom Manager তৈরি করে reusable query logic রাখা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>ActiveUserManager</code></pre>\n      </div>\n      <h4>তারপর:</h4>\n      <p>User.active.all()</p>\n      <p>Manager সাধারণত model-level query abstraction-এর জন্য ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "django-23",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Model Manager",
      "QuerySet"
    ],
    "question": "Custom Manager এবং Custom QuerySet কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Repeated query logic reusable করার জন্য Custom Manager/QuerySet ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User.objects.active()\nUser.objects.verified()</code></pre>\n      </div>\n      <p>এতে একই filtering logic বিভিন্ন জায়গায় duplicate করতে হয় না।</p>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>View\n ↓\nManager/QuerySet\n ↓\nORM\n ↓\nDatabase</code></pre>\n      </div>\n      <p>তবে complex business workflow Manager-এর মধ্যে না রেখে service layer-এ রাখা ভালো।</p>\n    "
  },
  {
    "id": "django-24",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Transactions",
      "Database"
    ],
    "question": "Django transaction কী?",
    "answer": "\n      <p>Transaction হলো একাধিক database operation-কে একটি logical unit হিসেবে execute করা।</p>\n      <p><strong>সব operation successful:</strong></p>\n      <ul>\n        <li>COMMIT</li>\n      </ul>\n      <p><strong>একটি operation fail:</strong></p>\n      <ul>\n        <li>ROLLBACK</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Create Order\n+\nCreate Order Items\n+\nUpdate Inventory</code></pre>\n      </div>\n      <p>সবগুলোকে একটি transaction-এর মধ্যে রাখা যায়।</p>\n      <p>Django-তে transaction.atomic() ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "django-25",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "transaction.atomic",
      "Database",
      "Concurrency"
    ],
    "question": "transaction.atomic() কীভাবে কাজ করে?",
    "answer": "\n      <p>transaction.atomic() একটি atomic database block তৈরি করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>with transaction.atomic():\n    order = create_order()\n    create_order_items(order)\n    update_inventory()</code></pre>\n      </div>\n      <h4>সব operation successful হলে:</h4>\n      <p>COMMIT</p>\n      <h4>Exception হলে:</h4>\n      <p>ROLLBACK</p>\n      <p>এটি order processing, payment state, inventory update-এর মতো consistency-sensitive operation-এ গুরুত্বপূর্ণ।</p>\n      <p>তবে transaction দীর্ঘ সময় open রাখা উচিত নয়।</p>\n    "
  },
  {
    "id": "django-26",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "select_for_update",
      "Concurrency",
      "Lock"
    ],
    "question": "Django select_for_update() কী?",
    "answer": "\n      <p>select_for_update() database row-level lock নেওয়ার জন্য ব্যবহৃত হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>with transaction.atomic():\n    product = Product.objects.select_for_update().get(id=1)</code></pre>\n      </div>\n      <p>এখন transaction শেষ না হওয়া পর্যন্ত অন্য transaction-এর concurrent update block হতে পারে, database behaviour অনুযায়ী।</p>\n      <h4>Useful for:</h4>\n      <ul>\n        <li>Inventory</li>\n        <li>Wallet</li>\n        <li>Balance</li>\n        <li>Order state</li>\n        <li>Concurrent updates</li>\n      </ul>\n      <p>এটি সাধারণত transaction.atomic() এর সাথে ব্যবহার করা হয়।</p>\n    "
  },
  {
    "id": "django-27",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Optimistic Locking",
      "Concurrency"
    ],
    "question": "Django-তে optimistic locking কী?",
    "answer": "\n      <p>Optimistic locking ধরে নেয় যে concurrent conflict সাধারণত কম হবে এবং update করার সময় conflict detect করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Record:\nversion = 5</code></pre>\n      </div>\n      <p>User A এবং User B দুজনেই version 5 read করল।</p>\n      <p><strong>A update:</strong><br>5 → 6</p>\n      <h4>B update করার সময় check:</h4>\n      <p>WHERE version = 5</p>\n      <p>কিন্তু এখন version = 6।</p>\n      <p>তাই B-এর update fail হবে।</p>\n      <p>এতে lost update prevent করা যায়।</p>\n    "
  },
  {
    "id": "django-28",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Database",
      "Index",
      "Performance"
    ],
    "question": "Django Model-এ database index কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Index frequently searched বা sorted field-এর query দ্রুত করতে পারে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User.objects.get(email=email)</code></pre>\n      </div>\n      <p>যদি email frequently search করা হয়, email-এর উপর index useful হতে পারে।</p>\n      <h4>Index-এর cost:</h4>\n      <ul>\n        <li>Extra storage</li>\n        <li>INSERT overhead</li>\n        <li>UPDATE overhead</li>\n        <li>DELETE overhead</li>\n      </ul>\n      <p>তাই সব field-এ index দেওয়া উচিত নয়।</p>\n      <p>Real query pattern এবং database query plan দেখে index design করা উচিত।</p>\n    "
  },
  {
    "id": "django-29",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Unique Constraint",
      "Database Integrity"
    ],
    "question": "Django Unique Constraint কী?",
    "answer": "\n      <p>Unique constraint database-level uniqueness enforce করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>email unique</code></pre>\n      </div>\n      <p>এর ফলে একই email একাধিক record-এ রাখা যাবে না।</p>\n      <h4>Django-তে:</h4>\n      <p>unique=True</p>\n      <p>অথবা Meta constraints ব্যবহার করা যায়।</p>\n      <p>Database-level constraint গুরুত্বপূর্ণ কারণ শুধু application-level validation race condition-এর কারণে duplicate data prevent করার জন্য যথেষ্ট নাও হতে পারে।</p>\n    "
  },
  {
    "id": "django-30",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Signals",
      "post_save",
      "Architecture"
    ],
    "question": "Django Signals কী?",
    "answer": "\n      <p>Django Signals নির্দিষ্ট event ঘটলে অন্য code execute করার mechanism।</p>\n      <h4>Common signals:</h4>\n      <p>pre_save<br>post_save<br>pre_delete<br>post_delete<br>m2m_changed</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User created\n ↓\npost_save\n ↓\nCreate Profile</code></pre>\n      </div>\n      <p>Signals simple side effect-এর জন্য useful।</p>\n      <p>কিন্তু complex business workflow signal-এর মধ্যে লুকিয়ে রাখা উচিত নয়, কারণ debugging এবং code flow বোঝা কঠিন হয়ে যেতে পারে।</p>\n    "
  },
  {
    "id": "django-31",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Signals",
      "Service Layer",
      "Architecture"
    ],
    "question": "Django Signals বনাম Service Layer—কখন কোনটি ব্যবহার করবেন?",
    "answer": "\n      <h4>Signal:</h4>\n      <p>Simple event-driven side effect-এর জন্য ভালো।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User created\n→ Create profile</code></pre>\n      </div>\n      <h4>Service Layer:</h4>\n      <p>Explicit business workflow-এর জন্য ভালো।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Create Order\n→ Validate Cart\n→ Calculate Price\n→ Reserve Inventory\n→ Create Payment</code></pre>\n      </div>\n      <p>Complex business logic service layer-এ রাখলে flow explicit এবং testable থাকে।</p>\n    "
  },
  {
    "id": "django-32",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Custom User",
      "Authentication"
    ],
    "question": "Django-তে Custom User Model কেন ব্যবহার করবেন?",
    "answer": "\n      <p>Django project শুরু করার সময় custom user model ব্যবহার করা ভালো practice হতে পারে।</p>\n      <h4>বিশেষ করে যদি application-এ:</h4>\n      <ul>\n        <li>Email login</li>\n        <li>Custom user fields</li>\n        <li>Multiple user types</li>\n        <li>Custom authentication rules</li>\n      </ul>\n      <p>থাকে।</p>\n      <p>Custom user model project-এর শুরুতেই define করা সহজ।</p>\n      <p>Existing project-এর পরে user model পরিবর্তন করলে migration complexity অনেক বেড়ে যেতে পারে।</p>\n    "
  },
  {
    "id": "django-33",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Authentication",
      "Authorization",
      "Security"
    ],
    "question": "Authentication এবং Authorization-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Authentication:</h4>\n      <p>\"আপনি কে?\"</p>\n      <p><strong>Example:</strong></p>\n      <ul>\n        <li>Login</li>\n        <li>JWT</li>\n        <li>Session</li>\n      </ul>\n      <h4>Authorization:</h4>\n      <p>\"আপনি কী করতে পারবেন?\"</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Admin\n→ Delete User</code></pre>\n      </div>\n      <p>Employee<br>→ View User</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nAuthentication\n ↓\nIdentify User\n ↓\nAuthorization\n ↓\nCheck Permission\n ↓\nAllow/Deny</code></pre>\n      </div>\n    "
  },
  {
    "id": "django-34",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Session",
      "Authentication"
    ],
    "question": "Django Session Authentication কীভাবে কাজ করে?",
    "answer": "\n      <p>Session authentication-এ user login করার পরে server-side session তৈরি করে।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Login\n ↓\nValidate credentials\n ↓\nCreate session\n ↓\nSession ID\n ↓\nCookie\n ↓\nBrowser</code></pre>\n      </div>\n      <p>পরবর্তী request-এ browser cookie পাঠায়।</p>\n      <p>Django session থেকে user identify করে।</p>\n      <p>Traditional web application-এর জন্য এটি খুব useful।</p>\n      <p>Stateless REST API-তে JWT বা token-based authentication বেশি common হতে পারে।</p>\n    "
  },
  {
    "id": "django-35",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "CSRF",
      "Security"
    ],
    "question": "CSRF কী এবং Django কীভাবে protection দেয়?",
    "answer": "\n      <p>CSRF = Cross-Site Request Forgery।</p>\n      <p>Attacker অন্য website ব্যবহার করে authenticated user's browser থেকে unwanted request পাঠানোর চেষ্টা করতে পারে।</p>\n      <p>Django CSRF token ব্যবহার করে protection দেয়।</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Form\n ↓\nCSRF Token\n ↓\nRequest\n ↓\nDjango Validation\n ↓\nAllow/Deny</code></pre>\n      </div>\n      <p>Session/cookie-based authentication-এর ক্ষেত্রে CSRF protection বিশেষভাবে গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "django-36",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "XSS",
      "Security"
    ],
    "question": "XSS কী এবং Django কীভাবে সাহায্য করে?",
    "answer": "\n      <p>XSS = Cross-Site Scripting।</p>\n      <p>Attacker malicious JavaScript application-এর page-এ inject করার চেষ্টা করে।</p>\n      <p>Django template engine defaultভাবে অনেক HTML output escape করে।</p>\n      <p>তবে developer যদি unsafe HTML explicitly render করে, তখন risk তৈরি হতে পারে।</p>\n      <h4>Security-এর জন্য:</h4>\n      <ul>\n        <li>Escape user input</li>\n        <li>Avoid unsafe HTML</li>\n        <li>Validate input</li>\n        <li>Content Security Policy consider করা</li>\n        <li>Trusted HTML carefully handle করা</li>\n      </ul>\n      <p>প্রয়োজন।</p>\n    "
  },
  {
    "id": "django-37",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "CSRF",
      "CORS",
      "Security"
    ],
    "question": "CSRF এবং CORS-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>CSRF:</h4>\n      <p>Browser authenticated request misuse prevent করার security mechanism।</p>\n      <h4>CORS:</h4>\n      <p>এক origin-এর browser application অন্য origin-এর resource/API access করতে পারবে কিনা তা control করে।</p>\n      <h4>সহজভাবে:</h4>\n      <p>CSRF<br>→ Unauthorized browser action protection</p>\n      <p>CORS<br>→ Cross-origin browser access policy</p>\n      <p>দুটো আলাদা security concept।</p>\n    "
  },
  {
    "id": "django-38",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Static",
      "Media",
      "Files"
    ],
    "question": "Django Static Files এবং Media Files-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <h4>Static files:</h4>\n      <p>Application-এর fixed assets।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>CSS\nJavaScript\nImages\nFonts</code></pre>\n      </div>\n      <h4>Media files:</h4>\n      <p>User-uploaded files।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Profile photo\nProduct image\nDocuments</code></pre>\n      </div>\n      <p><strong>Static:</strong></p>\n      <ul>\n        <li>Developer/application controlled</li>\n      </ul>\n      <p><strong>Media:</strong></p>\n      <ul>\n        <li>User generated</li>\n      </ul>\n      <p>Production-এ এগুলোর storage এবং serving strategy আলাদা করে design করা উচিত।</p>\n    "
  },
  {
    "id": "django-39",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "File Upload",
      "Security"
    ],
    "question": "Django file upload-এর সময় কী কী security concern আছে?",
    "answer": "\n      <p>File upload untrusted input হিসেবে treat করতে হবে।</p>\n      <h4>Consider:</h4>\n      <ul>\n        <li>File size limit</li>\n        <li>File type validation</li>\n        <li>MIME validation</li>\n        <li>Extension validation</li>\n        <li>Filename sanitization</li>\n        <li>Storage isolation</li>\n        <li>Virus scanning যেখানে প্রয়োজন</li>\n        <li>Executable file restriction</li>\n      </ul>\n      <p>User-uploaded file directly executable location-এ রাখা উচিত নয়।</p>\n      <p>Large file system-এ object storage যেমন S3-compatible storage ব্যবহার করা যেতে পারে।</p>\n    "
  },
  {
    "id": "django-40",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Caching",
      "Redis",
      "Performance"
    ],
    "question": "Django caching কী?",
    "answer": "\n      <p>Caching frequently requested data memory/fast storage-এ রেখে দ্রুত response দেওয়ার technique।</p>\n      <h4>Common backend:</h4>\n      <p>Redis</p>\n      <h4>Flow:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nCache\n ├── Hit → Response\n └── Miss\n       ↓\n     Database\n       ↓\n     Cache\n       ↓\n     Response</code></pre>\n      </div>\n      <h4>Caching use case:</h4>\n      <ul>\n        <li>Frequently read data</li>\n        <li>Expensive computation</li>\n        <li>API response</li>\n        <li>Session</li>\n        <li>Rate limiting</li>\n      </ul>\n      <h4>সবচেয়ে গুরুত্বপূর্ণ বিষয়:</h4>\n      <p>Cache invalidation</p>\n      <p>Data update হলে stale cache কীভাবে remove/update হবে তা design করতে হবে।</p>\n    "
  },
  {
    "id": "django-41",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Celery",
      "Background Task"
    ],
    "question": "Celery কী এবং Django-তে কেন ব্যবহার করা হয়?",
    "answer": "\n      <p>Celery হলো distributed task queue।</p>\n      <p>Django request-এর মধ্যে long-running কাজ না করে background worker-এ পাঠানো যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>User Registration\n ↓\nDjango\n ↓\nCreate User\n ↓\nCelery Task\n ↓\nSend Email</code></pre>\n      </div>\n      <h4>Use cases:</h4>\n      <ul>\n        <li>Email</li>\n        <li>Report generation</li>\n        <li>Image processing</li>\n        <li>Scheduled jobs</li>\n        <li>Data processing</li>\n        <li>External API operations</li>\n      </ul>\n      <h4>Architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Django\n ↓\nBroker\n ↓\nCelery Worker\n ↓\nTask</code></pre>\n      </div>\n    "
  },
  {
    "id": "django-42",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Celery",
      "Retry",
      "Reliability"
    ],
    "question": "Celery task retry কীভাবে design করবেন?",
    "answer": "\n      <p>Temporary failure হলে Celery task retry করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>External API\n ↓\nTimeout\n ↓\nRetry\n ↓\nExponential Backoff\n ↓\nSuccess</code></pre>\n      </div>\n      <h4>Production strategy:</h4>\n      <ul>\n        <li>Maximum retries</li>\n        <li>Exponential backoff</li>\n        <li>Retryable errors</li>\n        <li>Permanent error handling</li>\n        <li>Idempotency</li>\n        <li>Failure monitoring</li>\n      </ul>\n      <p>সব exception blindly retry করা উচিত নয়।</p>\n    "
  },
  {
    "id": "django-43",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Bulk Operations",
      "ORM",
      "Performance"
    ],
    "question": "bulk_create এবং bulk_update কেন ব্যবহার করবেন?",
    "answer": "\n      <p>অনেক record একসাথে insert/update করতে bulk operation database round trip কমাতে পারে।</p>\n      <h4>Instead of:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>for item in items:\n    item.save()</code></pre>\n      </div>\n      <h4>ব্যবহার করা যায়:</h4>\n      <p>bulk_create()</p>\n      <h4>অথবা:</h4>\n      <p>bulk_update()</p>\n      <p>এটি large data processing-এর performance improve করতে পারে।</p>\n      <p>তবে bulk operation-এর limitations এবং signal/save behavior সম্পর্কে সচেতন থাকতে হবে।</p>\n    "
  },
  {
    "id": "django-44",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Aggregation",
      "Annotation",
      "ORM"
    ],
    "question": "Django annotate() এবং aggregate() কী?",
    "answer": "\n      <h4>aggregate():</h4>\n      <p>পুরো QuerySet-এর উপর calculation করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Sum\nAvg\nCount\nMax\nMin</code></pre>\n      </div>\n      <h4>annotate():</h4>\n      <p>প্রতিটি returned object-এর সাথে calculated field যোগ করে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>প্রতিটি Category-এর সাথে product_count যোগ করা।</code></pre>\n      </div>\n      <h4>Concept:</h4>\n      <p>aggregate<br>→ Overall result</p>\n      <p>annotate<br>→ Per-object calculated result</p>\n    "
  },
  {
    "id": "django-45",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "F Expression",
      "ORM",
      "Concurrency"
    ],
    "question": "Django F() expression কী?",
    "answer": "\n      <p>F() database field-এর current value ব্যবহার করে database-side operation করতে দেয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Product.objects.update(\n    stock=F(\"stock\") - 1\n)</code></pre>\n      </div>\n      <p>এখানে application আগে stock read করে তারপর update করছে না।</p>\n      <h4>Database নিজেই:</h4>\n      <p>stock = stock - 1</p>\n      <p>করতে পারে।</p>\n      <p>এটি concurrency এবং performance-এর জন্য useful হতে পারে।</p>\n    "
  },
  {
    "id": "django-46",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Q Object",
      "ORM",
      "Query"
    ],
    "question": "Django Q object কী?",
    "answer": "\n      <p>Q object complex query condition তৈরি করতে ব্যবহার করা হয়।</p>\n      <h4>যেমন:</h4>\n      <p>name contains \"phone\"<br>OR<br>description contains \"phone\"</p>\n      <h4>Q object দিয়ে:</h4>\n      <p>AND<br>OR<br>NOT</p>\n      <p>logic তৈরি করা যায়।</p>\n      <p>Complex filtering এবং dynamic search API তৈরি করার সময় এটি খুব useful।</p>\n    "
  },
  {
    "id": "django-47",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Raw SQL",
      "ORM",
      "Database"
    ],
    "question": "Django ORM থাকা সত্ত্বেও Raw SQL কখন ব্যবহার করবেন?",
    "answer": "\n      <p>সাধারণ CRUD এবং common queries-এর জন্য ORM preferred।</p>\n      <h4>Raw SQL consider করা যেতে পারে যখন:</h4>\n      <ul>\n        <li>Extremely complex SQL</li>\n        <li>Database-specific feature</li>\n        <li>ORM query inefficient</li>\n        <li>Advanced reporting</li>\n        <li>Vendor-specific optimization</li>\n      </ul>\n      <h4>তবে Raw SQL ব্যবহারের আগে:</h4>\n      <ol>\n        <li>Query plan</li>\n        <li>Index</li>\n        <li>ORM optimization</li>\n        <li>select_related/prefetch_related</li>\n      </ol>\n      <p>check করা উচিত।</p>\n      <p>Raw SQL ব্যবহার করলে SQL injection prevent করার জন্য parameterized query ব্যবহার করতে হবে।</p>\n    "
  },
  {
    "id": "django-48",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Performance",
      "Database",
      "Optimization"
    ],
    "question": "Django application slow হলে কীভাবে troubleshoot করবেন?",
    "answer": "\n      <p>Guess না করে প্রথমে measure করতে হবে।</p>\n      <p><strong>Step 1:</strong></p>\n      <ul>\n        <li>Request latency</li>\n      </ul>\n      <p><strong>Step 2:</strong></p>\n      <ul>\n        <li>Database query count</li>\n      </ul>\n      <p><strong>Step 3:</strong></p>\n      <ul>\n        <li>Slow SQL</li>\n      </ul>\n      <p><strong>Step 4:</strong></p>\n      <ul>\n        <li>N+1 queries</li>\n      </ul>\n      <p><strong>Step 5:</strong></p>\n      <ul>\n        <li>Index</li>\n      </ul>\n      <p><strong>Step 6:</strong></p>\n      <ul>\n        <li>Serialization</li>\n      </ul>\n      <p><strong>Step 7:</strong></p>\n      <ul>\n        <li>External API latency</li>\n      </ul>\n      <p><strong>Step 8:</strong></p>\n      <ul>\n        <li>Cache</li>\n      </ul>\n      <p><strong>Step 9:</strong></p>\n      <ul>\n        <li>CPU/Memory</li>\n      </ul>\n      <h4>Typical optimization:</h4>\n      <p>select_related<br>prefetch_related<br>indexes<br>pagination<br>bulk operations<br>caching<br>query optimization</p>\n      <h4>Golden rule:</h4>\n      <p>Measure → Identify bottleneck → Optimize → Measure again</p>\n    "
  },
  {
    "id": "django-49",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Async",
      "ASGI",
      "Concurrency"
    ],
    "question": "Modern Django কি async support করে?",
    "answer": "\n      <p>হ্যাঁ, modern Django ASGI এবং asynchronous request handling support করে।</p>\n      <h4>Async view:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>async def my_view(request):\n    ...</code></pre>\n      </div>\n      <p>Async বিশেষভাবে useful হতে পারে I/O-bound workload-এর ক্ষেত্রে।</p>\n      <h4>যেমন:</h4>\n      <ul>\n        <li>External API</li>\n        <li>Async network operation</li>\n        <li>Long-lived connection</li>\n      </ul>\n      <p>তবে synchronous blocking operation async code-এর ভিতরে রাখলে expected benefit পাওয়া যাবে না।</p>\n      <p>তাই async migration-এর আগে dependency এবং actual workload analyze করা উচিত।</p>\n    "
  },
  {
    "id": "django-50",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "ASGI",
      "WSGI",
      "Deployment"
    ],
    "question": "WSGI এবং ASGI-এর মধ্যে পার্থক্য কী?",
    "answer": "\n      <p>WSGI traditional synchronous Python web application interface।</p>\n      <p>ASGI modern asynchronous Python application interface।</p>\n      <h4>WSGI:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nWSGI Server\n ↓\nDjango</code></pre>\n      </div>\n      <h4>ASGI:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n ↓\nASGI Server\n ↓\nDjango\n ↓\nAsync support</code></pre>\n      </div>\n      <p>ASGI WebSocket এবং asynchronous workloads-এর জন্যও suitable।</p>\n      <p>Modern Django deployment-এর ক্ষেত্রে workload অনুযায়ী WSGI বা ASGI নির্বাচন করা যায়।</p>\n    "
  },
  {
    "id": "django-51",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Admin",
      "Django Admin"
    ],
    "question": "Django Admin কী?",
    "answer": "\n      <p>Django Admin হলো Django-এর built-in administrative interface।</p>\n      <h4>এটি দিয়ে:</h4>\n      <ul>\n        <li>Users manage</li>\n        <li>Products manage</li>\n        <li>Orders manage</li>\n        <li>Database records inspect</li>\n        <li>Internal operations</li>\n      </ul>\n      <p>করা যায়।</p>\n      <p>Django Admin customer-facing frontend নয়।</p>\n      <p>Internal staff operation-এর জন্য এটি খুব useful।</p>\n    "
  },
  {
    "id": "django-52",
    "category": "Django",
    "difficulty": "Intermediate",
    "tags": [
      "Admin",
      "Security"
    ],
    "question": "Django Admin production-এ কীভাবে secure করবেন?",
    "answer": "\n      <p>Production admin interface sensitive হওয়ায় extra security দরকার।</p>\n      <h4>Consider:</h4>\n      <ul>\n        <li>Strong authentication</li>\n        <li>Least privilege permission</li>\n        <li>HTTPS</li>\n        <li>Secure cookies</li>\n        <li>Admin activity logging</li>\n        <li>MFA যেখানে সম্ভব</li>\n        <li>Restricted access</li>\n        <li>Sensitive field protection</li>\n        <li>Monitoring</li>\n      </ul>\n      <p>Admin URL পরিবর্তন করা একা security solution নয়।</p>\n      <p>মূল security হলো authentication, authorization এবং network/access control।</p>\n    "
  },
  {
    "id": "django-53",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Multi-Tenancy",
      "SaaS",
      "Architecture"
    ],
    "question": "Django-তে Multi-Tenancy কী?",
    "answer": "\n      <p>Multi-tenancy হলো একই application multiple organization/customer-এর data serve করবে।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>Tenant A\n→ Users\n→ Products\n→ Orders</code></pre>\n      </div>\n      <p>Tenant B<br>→ Users<br>→ Products<br>→ Orders</p>\n      <h4>Common approaches:</h4>\n      <ol>\n        <li>Shared database + tenant_id</li>\n        <li>Separate schema</li>\n        <li>Separate database</li>\n      </ol>\n      <h4>Shared database architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nIdentify Tenant\n ↓\nTenant Context\n ↓\nTenant-filtered Query\n ↓\nResponse</code></pre>\n      </div>\n      <p>সব query-তে tenant isolation নিশ্চিত করা অত্যন্ত গুরুত্বপূর্ণ।</p>\n    "
  },
  {
    "id": "django-54",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Soft Delete",
      "Database"
    ],
    "question": "Soft Delete কী?",
    "answer": "\n      <p>Soft delete-এ database row physically delete করা হয় না।</p>\n      <h4>বরং:</h4>\n      <p>deleted_at = timestamp</p>\n      <h4>অথবা:</h4>\n      <p>is_deleted = true</p>\n      <p>করা হয়।</p>\n      <h4>Benefits:</h4>\n      <ul>\n        <li>Data recovery</li>\n        <li>Audit</li>\n        <li>History</li>\n        <li>Referential integrity</li>\n      </ul>\n      <p>কিন্তু application-এর সব relevant query-তে deleted record exclude করতে হবে।</p>\n      <p>Compliance বা privacy requirement অনুযায়ী কিছু ক্ষেত্রে actual deletion প্রয়োজন হতে পারে।</p>\n    "
  },
  {
    "id": "django-55",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Audit Log",
      "Security",
      "Compliance"
    ],
    "question": "Django-তে Audit Log কেন প্রয়োজন?",
    "answer": "\n      <p>Audit log দিয়ে কে কখন কী পরিবর্তন করেছে তার history রাখা হয়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>python</span><button class=\"copy-btn\">Copy</button></div>\n        <pre><code>User:\nadmin</code></pre>\n      </div>\n      <p><strong>Action:</strong><br>UPDATE</p>\n      <p><strong>Resource:</strong><br>Order #100</p>\n      <p><strong>Before:</strong><br>pending</p>\n      <p><strong>After:</strong><br>approved</p>\n      <h4>Useful for:</h4>\n      <ul>\n        <li>Security</li>\n        <li>Debugging</li>\n        <li>Compliance</li>\n        <li>Admin tracking</li>\n        <li>Business traceability</li>\n      </ul>\n      <p>Sensitive system-এ audit logs restricted access-এর মধ্যে রাখা উচিত।</p>\n    "
  },
  {
    "id": "django-56",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Testing",
      "Unit Test",
      "Integration Test"
    ],
    "question": "Django application কীভাবে test করবেন?",
    "answer": "\n      <p>Django testing-এর জন্য বিভিন্ন ধরনের test করা যায়।</p>\n      <p>1. Unit Test<br>→ Individual function/class</p>\n      <p>2. Model Test<br>→ Model behavior</p>\n      <p>3. View Test<br>→ HTTP behavior</p>\n      <p>4. Integration Test<br>→ Multiple components</p>\n      <p>5. API Test<br>→ API endpoint</p>\n      <p>6. End-to-End Test<br>→ Complete user flow</p>\n      <h4>Testing tools:</h4>\n      <ul>\n        <li>Django TestCase</li>\n        <li>unittest</li>\n        <li>pytest</li>\n        <li>pytest-django</li>\n      </ul>\n      <h4>Important cases:</h4>\n      <p>Success<br>Validation error<br>Authentication failure<br>Permission failure<br>Not found<br>Database constraint<br>Transaction failure</p>\n    "
  },
  {
    "id": "django-57",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Testing",
      "Mock",
      "External API"
    ],
    "question": "External API call কীভাবে test করবেন?",
    "answer": "\n      <p>Automated test-এ real production external API call করা উচিত নয়।</p>\n      <h4>Instead:</h4>\n      <p>Mock<br>Fake<br>Stub<br>Test environment</p>\n      <p>ব্যবহার করা যায়।</p>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Django\n ↓\nPayment Client\n ↓\nMock Payment API</code></pre>\n      </div>\n      <h4>Test করা যায়:</h4>\n      <p>Success<br>Timeout<br>500 error<br>Invalid response<br>Retry<br>Duplicate request</p>\n      <p>এতে test দ্রুত এবং deterministic হয়।</p>\n    "
  },
  {
    "id": "django-58",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Logging",
      "Observability",
      "Production"
    ],
    "question": "Production Django application-এ logging কীভাবে design করবেন?",
    "answer": "\n      <p>Production logging structured এবং searchable হওয়া উচিত।</p>\n      <h4>Important fields:</h4>\n      <ul>\n        <li>Timestamp</li>\n        <li>Log level</li>\n        <li>Request ID</li>\n        <li>User ID</li>\n        <li>Endpoint</li>\n        <li>Status code</li>\n        <li>Response time</li>\n        <li>Error</li>\n        <li>Service name</li>\n      </ul>\n      <h4>Example:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Request\n ↓\nrequest_id = abc123\n ↓\nDjango\n ↓\nService\n ↓\nDatabase</code></pre>\n      </div>\n      <p>Password, JWT token, secret বা sensitive personal data log করা উচিত নয়।</p>\n    "
  },
  {
    "id": "django-59",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Production",
      "Deployment",
      "Scalability"
    ],
    "question": "Django production deployment architecture কেমন হতে পারে?",
    "answer": "\n      <h4>একটি common production architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Internet\n   ↓\nLoad Balancer\n   ↓\nNginx\n   ↓\nDjango Application\n   ↓\nDatabase</code></pre>\n      </div>\n      <h4>Parallel components:</h4>\n      <p>Django<br> ├── Redis<br> ├── Celery<br> ├── Message Broker<br> ├── Object Storage<br> └── Monitoring</p>\n      <p>Application multiple instance-এ scale করা যায়।</p>\n      <p>Django application stateless রাখা হলে horizontal scaling সহজ হয়।</p>\n    "
  },
  {
    "id": "django-60",
    "category": "Django",
    "difficulty": "Senior",
    "tags": [
      "Architecture",
      "Scalability",
      "Production",
      "Senior"
    ],
    "question": "একজন Senior Django Developer হিসেবে production application design করার সময় কী কী বিষয় consider করবেন?",
    "answer": "\n      <p>Senior Django developer হিসেবে শুধু Model এবং View তৈরি করা যথেষ্ট নয়।</p>\n      <p>পুরো system consider করতে হবে।</p>\n      <p>1. Architecture<br>→ Modular apps<br>→ Service layer<br>→ Clear responsibility</p>\n      <p>2. Database<br>→ Schema design<br>→ Index<br>→ Query optimization<br>→ Transactions<br>→ Locking</p>\n      <p>3. Performance<br>→ N+1 prevention<br>→ select_related<br>→ prefetch_related<br>→ Caching<br>→ Pagination<br>→ Bulk operations</p>\n      <p>4. Security<br>→ Authentication<br>→ Authorization<br>→ CSRF<br>→ CORS<br>→ XSS<br>→ Secret management<br>→ Rate limiting</p>\n      <p>5. Background Processing<br>→ Celery<br>→ Redis/RabbitMQ<br>→ Retry<br>→ Scheduled jobs</p>\n      <p>6. Reliability<br>→ Idempotency<br>→ Timeout<br>→ Retry<br>→ Graceful failure</p>\n      <p>7. Observability<br>→ Structured logging<br>→ Metrics<br>→ Request ID<br>→ Tracing<br>→ Alerting</p>\n      <p>8. Deployment<br>→ Docker<br>→ WSGI/ASGI<br>→ Nginx/Load Balancer<br>→ CI/CD<br>→ Health checks<br>→ Migration strategy</p>\n      <p>9. Scalability<br>→ Stateless application<br>→ Horizontal scaling<br>→ Database optimization<br>→ Redis<br>→ Background workers</p>\n      <p>10. Maintainability<br>→ SOLID<br>→ Separation of concerns<br>→ Testing<br>→ Documentation<br>→ Code review</p>\n      <h4>Overall architecture:</h4>\n\n      <div class=\"code-box\">\n        <div class=\"code-header\"><span>Flow / Architecture</span></div>\n        <pre><code>Client\n   ↓\nLoad Balancer / API Gateway\n   ↓\nDjango\n   ↓\nService Layer\n   ↓\nORM\n   ↓\nDatabase</code></pre>\n      </div>\n      <h4>Parallel:</h4>\n      <p>Django<br> ├── Redis<br> ├── Celery<br> ├── RabbitMQ/Kafka<br> ├── External Services<br> └── Monitoring</p>\n      <p>এই foundation-এর উপর পরে Django REST Framework এবং Microservice architecture build করা যায়।</p>\n    "
  }
];
