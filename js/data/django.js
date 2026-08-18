const django = [
	{
		id: "django-1",
		category: "Django",
		difficulty: "Beginner",
		tags: ["Django", "Framework"],
		question: "Django কী এবং কেন ব্যবহার করা হয়?",
		answer: `Django হলো Python-এর high-level web framework। এটি secure, scalable এবং maintainable web application ও backend API তৈরি করার জন্য ব্যবহৃত হয়।

Django-এর গুরুত্বপূর্ণ সুবিধা:
1. ORM
2. Authentication
3. Authorization
4. Admin Panel
5. Middleware
6. URL Routing
7. Forms
8. Security
9. Migration
10. Template Engine

Django-এর মূল philosophy হলো "batteries included"। অর্থাৎ common web application-এর অনেক functionality built-in পাওয়া যায়।`,
	},

	{
		id: "django-2",
		category: "Django",
		difficulty: "Beginner",
		tags: ["Architecture", "MVT"],
		question: "Django MVT architecture কী?",
		answer: `Django সাধারণত MVT architecture ব্যবহার করে।

M = Model
V = View
T = Template

Model:
Database structure এবং data access handle করে।

View:
Request process করে এবং response তৈরি করে।

Template:
HTML presentation handle করে।

Flow:

Client
  ↓
URL
  ↓
View
  ↓
Model
  ↓
Database
  ↓
View
  ↓
Template/Response
  ↓
Client`,
	},

	{
		id: "django-3",
		category: "Django",
		difficulty: "Beginner",
		tags: ["Project", "App", "Structure"],
		question: "Django Project এবং Django App-এর মধ্যে পার্থক্য কী?",
		answer: `Django Project হলো পুরো application-এর configuration এবং main container।

Django App হলো নির্দিষ্ট business functionality-এর একটি module।

Example:

my_project/
    manage.py
    config/
    users/
    products/
    orders/
    payments/

এখানে:

config → project configuration
users → user management
products → product management
orders → order management
payments → payment management

একটি Django project-এর মধ্যে একাধিক app থাকতে পারে।`,
	},

	{
		id: "django-4",
		category: "Django",
		difficulty: "Beginner",
		tags: ["manage.py", "CLI"],
		question: "manage.py কী?",
		answer: `manage.py হলো Django project-এর command-line utility।

এটি দিয়ে বিভিন্ন administrative এবং development command চালানো হয়।

Common commands:

python manage.py runserver
python manage.py startapp users
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py shell
python manage.py test

manage.py মূলত Django project-এর settings/configuration-এর সাথে command-line interface হিসেবে কাজ করে।`,
	},

	{
		id: "django-5",
		category: "Django",
		difficulty: "Beginner",
		tags: ["Settings", "Configuration"],
		question: "Django settings.py কী?",
		answer: `settings.py হলো Django project-এর প্রধান configuration file।

এখানে সাধারণত থাকে:

- SECRET_KEY
- DEBUG
- ALLOWED_HOSTS
- INSTALLED_APPS
- MIDDLEWARE
- DATABASES
- TEMPLATES
- STATIC_URL
- MEDIA_URL
- AUTH_USER_MODEL
- REST framework configuration

Production environment-এ secret এবং environment-specific configuration source code-এ hardcode না করে environment variable বা secret manager ব্যবহার করা উচিত।`,
	},

	{
		id: "django-6",
		category: "Django",
		difficulty: "Beginner",
		tags: ["URL", "Routing"],
		question: "Django URL routing কীভাবে কাজ করে?",
		answer: `Django URL routing incoming request-এর URL দেখে নির্দিষ্ট view-এর সাথে request map করে।

Example:

/users/
/products/
/orders/

Flow:

HTTP Request
    ↓
urls.py
    ↓
URL Pattern
    ↓
View
    ↓
Response

Django path() এবং re_path() ব্যবহার করে URL define করা যায়।

Large project-এ app-level urls.py ব্যবহার করে URL structure modular রাখা ভালো।`,
	},

	{
		id: "django-7",
		category: "Django",
		difficulty: "Beginner",
		tags: ["Views", "Request", "Response"],
		question: "Django View কী?",
		answer: `View হলো Django-এর সেই component যা HTTP request process করে এবং HTTP response return করে।

View দুইভাবে লেখা যায়:

1. Function-Based View (FBV)
2. Class-Based View (CBV)

Basic flow:

Request
 ↓
View
 ↓
Business Logic
 ↓
Database
 ↓
Response

API project-এ DRF সাধারণত View-এর উপর আরও abstraction দেয়।`,
	},

	{
		id: "django-8",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["FBV", "CBV", "Views"],
		question: "Function-Based View এবং Class-Based View-এর মধ্যে পার্থক্য কী?",
		answer: `Function-Based View:

def user_list(request):
    ...

সহজ এবং ছোট logic-এর জন্য convenient।

Class-Based View:

class UserListView(View):
    def get(self, request):
        ...

Inheritance এবং reusable behavior-এর সুবিধা পাওয়া যায়।

FBV:
→ Simple
→ Explicit
→ Easy to understand

CBV:
→ Reusable
→ Inheritance
→ Generic behavior

কোনটি ব্যবহার করবেন তা project architecture এবং team convention-এর উপর নির্ভর করে।`,
	},

	{
		id: "django-9",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Middleware", "Request", "Response"],
		question: "Django Middleware কী?",
		answer: `Middleware হলো request এবং response processing-এর মাঝখানে কাজ করা component।

Flow:

Client
 ↓
Middleware
 ↓
View
 ↓
Middleware
 ↓
Client

Middleware-এর common use:

- Authentication
- Logging
- Security
- Session
- CORS
- Request ID
- Performance monitoring

Middleware global cross-cutting concern-এর জন্য ব্যবহার করা উচিত। Business-specific logic সাধারণত middleware-এ রাখা উচিত নয়।`,
	},

	{
		id: "django-10",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Middleware", "Order"],
		question: "Django middleware order কেন গুরুত্বপূর্ণ?",
		answer: `Django middleware sequential order-এ execute হয়।

একটি middleware অন্য middleware-এর আগে বা পরে request/response process করতে পারে।

তাই middleware order ভুল হলে:

- Authentication issue
- CORS issue
- Security issue
- Session issue

হতে পারে।

বিশেষ করে security, authentication, session এবং CORS middleware-এর order বুঝে configure করতে হয়।`,
	},

	{
		id: "django-11",
		category: "Django",
		difficulty: "Beginner",
		tags: ["ORM", "Database"],
		question: "Django ORM কী?",
		answer: `ORM-এর পূর্ণরূপ Object Relational Mapping।

Django ORM Python object এবং relational database-এর মধ্যে abstraction তৈরি করে।

Example:

User.objects.filter(is_active=True)

ORM দিয়ে:

- Create
- Read
- Update
- Delete
- Filtering
- Joining
- Aggregation
- Annotation

করা যায়।

Flow:

Python
 ↓
Django ORM
 ↓
SQL
 ↓
Database`,
	},

	{
		id: "django-12",
		category: "Django",
		difficulty: "Beginner",
		tags: ["Model", "Database"],
		question: "Django Model কী?",
		answer: `Django Model হলো database table-এর Python representation।

Example:

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)

Conceptually:

Product Model
      ↓
Database Table

Model field সাধারণত database column-এর সাথে map করে।

Django ORM model-এর মাধ্যমে database operation করা যায়।`,
	},

	{
		id: "django-13",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Model", "Relationships"],
		question: "Django Model Relationship কী কী?",
		answer: `Django তিনটি প্রধান database relationship support করে:

1. One-to-One
2. ForeignKey / Many-to-One
3. Many-to-Many

Example:

User
 ↓
Profile

→ OneToOne

User
 ↓
Orders

→ ForeignKey

Product
 ↕
Category

→ ManyToMany

Relationship সঠিকভাবে design করা database consistency এবং query performance-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "django-14",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["ForeignKey", "Database"],
		question: "ForeignKey কী?",
		answer: `ForeignKey হলো Django model-এর relationship field যা Many-to-One relationship তৈরি করে।

Example:

class Order(models.Model):
    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

এর অর্থ:

একজন User-এর অনেক Order থাকতে পারে।

User
 ├── Order 1
 ├── Order 2
 └── Order 3

on_delete behaviour determine করে related object delete হলে কী হবে।`,
	},

	{
		id: "django-15",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["on_delete", "ForeignKey"],
		question: "Django ForeignKey-এর on_delete কী?",
		answer: `on_delete determine করে referenced object delete হলে related object-এর কী হবে।

Common options:

CASCADE
→ Parent delete হলে child delete।

PROTECT
→ Child থাকলে parent delete prevent।

SET_NULL
→ Foreign key NULL করে।

SET_DEFAULT
→ Default value set করে।

DO_NOTHING
→ Django automatic action নেয় না।

Business requirement অনুযায়ী সঠিক on_delete নির্বাচন করতে হয়।`,
	},

	{
		id: "django-16",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Migration", "Database"],
		question: "Django Migration কী?",
		answer: `Migration হলো database schema change-এর version-controlled representation।

Model change:

class Product(models.Model):
    name = models.CharField(...)
    price = models.DecimalField(...)

তারপর:

python manage.py makemigrations

Migration file তৈরি হবে।

তারপর:

python manage.py migrate

Database schema update হবে।

Flow:

Model Change
 ↓
makemigrations
 ↓
Migration File
 ↓
migrate
 ↓
Database`,
	},

	{
		id: "django-17",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Migration", "Production"],
		question: "makemigrations এবং migrate-এর মধ্যে পার্থক্য কী?",
		answer: `makemigrations:

Model-এর পরিবর্তন detect করে migration file তৈরি করে।

migrate:

Migration file database-এ apply করে।

অর্থাৎ:

makemigrations
→ Migration তৈরি

migrate
→ Database update

Production deployment-এ migration files version control-এ রাখা উচিত।`,
	},

	{
		id: "django-18",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["QuerySet", "ORM"],
		question: "Django QuerySet কী?",
		answer: `QuerySet হলো database query-এর representation।

Example:

users = User.objects.filter(is_active=True)

QuerySet সাধারণত lazy।

অর্থাৎ QuerySet তৈরি করলেই database query সবসময় immediately execute হয় না।

QuerySet chain করা যায়:

User.objects
    .filter(is_active=True)
    .order_by("-created_at")

এটি readable এবং composable database query তৈরি করতে সাহায্য করে।`,
	},

	{
		id: "django-19",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["QuerySet", "Lazy Evaluation"],
		question: "Django QuerySet lazy কেন?",
		answer: `Django QuerySet প্রয়োজন হওয়ার আগে database query execute না করার চেষ্টা করে।

Example:

users = User.objects.filter(is_active=True)

এখানে QuerySet তৈরি হয়েছে।

তারপর:

for user in users:
    print(user.name)

এসময় database query execute হতে পারে।

Lazy evaluation-এর সুবিধা:

- Query chain করা যায়
- Unnecessary query avoid করা যায়
- Query optimize করা যায়

তবে QuerySet কখন evaluate হচ্ছে তা জানা performance-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "django-20",
		category: "Django",
		difficulty: "Senior",
		tags: ["select_related", "prefetch_related", "ORM"],
		question: "select_related এবং prefetch_related-এর মধ্যে পার্থক্য কী?",
		answer: `দুটিই related object efficiently load করার জন্য ব্যবহৃত হয়।

select_related:
→ ForeignKey
→ OneToOne

সাধারণত SQL JOIN ব্যবহার করে।

Example:

Order.objects.select_related("customer")

prefetch_related:
→ ManyToMany
→ Reverse ForeignKey
→ Related objects আলাদা query করে load করতে পারে।

Example:

Order.objects.prefetch_related("items")

Rule:

Single-valued relation
→ select_related

Multi-valued relation
→ prefetch_related`,
	},

	{
		id: "django-21",
		category: "Django",
		difficulty: "Senior",
		tags: ["N+1", "Performance", "ORM"],
		question: "Django-তে N+1 query problem কী?",
		answer: `প্রথমে একটি query দিয়ে main records আনা হয়, তারপর প্রতিটি record-এর related data-এর জন্য আলাদা query চালানো হলে N+1 problem তৈরি হয়।

Example:

orders = Order.objects.all()

প্রথম query:
→ Orders

তারপর 100 order-এর customer access করলে:

100 additional queries

Total:
101 queries

Solution:

select_related()
অথবা
prefetch_related()

ব্যবহার করা যায়।

Production API performance-এর জন্য N+1 query identify করা খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "django-22",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Manager", "QuerySet"],
		question: "Django Manager কী?",
		answer: `Manager হলো Django model-এর database query interface।

Default manager:

objects

Example:

User.objects.all()

Custom Manager তৈরি করে reusable query logic রাখা যায়।

Example:

ActiveUserManager

তারপর:

User.active.all()

Manager সাধারণত model-level query abstraction-এর জন্য ব্যবহার করা হয়।`,
	},

	{
		id: "django-23",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Model Manager", "QuerySet"],
		question: "Custom Manager এবং Custom QuerySet কেন ব্যবহার করবেন?",
		answer: `Repeated query logic reusable করার জন্য Custom Manager/QuerySet ব্যবহার করা যায়।

Example:

User.objects.active()
User.objects.verified()

এতে একই filtering logic বিভিন্ন জায়গায় duplicate করতে হয় না।

Architecture:

View
 ↓
Manager/QuerySet
 ↓
ORM
 ↓
Database

তবে complex business workflow Manager-এর মধ্যে না রেখে service layer-এ রাখা ভালো।`,
	},

	{
		id: "django-24",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Transactions", "Database"],
		question: "Django transaction কী?",
		answer: `Transaction হলো একাধিক database operation-কে একটি logical unit হিসেবে execute করা।

সব operation successful:
→ COMMIT

একটি operation fail:
→ ROLLBACK

Example:

Create Order
+
Create Order Items
+
Update Inventory

সবগুলোকে একটি transaction-এর মধ্যে রাখা যায়।

Django-তে transaction.atomic() ব্যবহার করা হয়।`,
	},

	{
		id: "django-25",
		category: "Django",
		difficulty: "Senior",
		tags: ["transaction.atomic", "Database", "Concurrency"],
		question: "transaction.atomic() কীভাবে কাজ করে?",
		answer: `transaction.atomic() একটি atomic database block তৈরি করে।

Example:

with transaction.atomic():
    order = create_order()
    create_order_items(order)
    update_inventory()

সব operation successful হলে:

COMMIT

Exception হলে:

ROLLBACK

এটি order processing, payment state, inventory update-এর মতো consistency-sensitive operation-এ গুরুত্বপূর্ণ।

তবে transaction দীর্ঘ সময় open রাখা উচিত নয়।`,
	},

	{
		id: "django-26",
		category: "Django",
		difficulty: "Senior",
		tags: ["select_for_update", "Concurrency", "Lock"],
		question: "Django select_for_update() কী?",
		answer: `select_for_update() database row-level lock নেওয়ার জন্য ব্যবহৃত হয়।

Example:

with transaction.atomic():
    product = Product.objects.select_for_update().get(id=1)

এখন transaction শেষ না হওয়া পর্যন্ত অন্য transaction-এর concurrent update block হতে পারে, database behaviour অনুযায়ী।

Useful for:

- Inventory
- Wallet
- Balance
- Order state
- Concurrent updates

এটি সাধারণত transaction.atomic() এর সাথে ব্যবহার করা হয়।`,
	},

	{
		id: "django-27",
		category: "Django",
		difficulty: "Senior",
		tags: ["Optimistic Locking", "Concurrency"],
		question: "Django-তে optimistic locking কী?",
		answer: `Optimistic locking ধরে নেয় যে concurrent conflict সাধারণত কম হবে এবং update করার সময় conflict detect করে।

Example:

Record:
version = 5

User A এবং User B দুজনেই version 5 read করল।

A update:
5 → 6

B update করার সময় check:

WHERE version = 5

কিন্তু এখন version = 6।

তাই B-এর update fail হবে।

এতে lost update prevent করা যায়।`,
	},

	{
		id: "django-28",
		category: "Django",
		difficulty: "Senior",
		tags: ["Database", "Index", "Performance"],
		question: "Django Model-এ database index কেন ব্যবহার করবেন?",
		answer: `Index frequently searched বা sorted field-এর query দ্রুত করতে পারে।

Example:

User.objects.get(email=email)

যদি email frequently search করা হয়, email-এর উপর index useful হতে পারে।

Index-এর cost:

- Extra storage
- INSERT overhead
- UPDATE overhead
- DELETE overhead

তাই সব field-এ index দেওয়া উচিত নয়।

Real query pattern এবং database query plan দেখে index design করা উচিত।`,
	},

	{
		id: "django-29",
		category: "Django",
		difficulty: "Senior",
		tags: ["Unique Constraint", "Database Integrity"],
		question: "Django Unique Constraint কী?",
		answer: `Unique constraint database-level uniqueness enforce করে।

Example:

email unique

এর ফলে একই email একাধিক record-এ রাখা যাবে না।

Django-তে:

unique=True

অথবা Meta constraints ব্যবহার করা যায়।

Database-level constraint গুরুত্বপূর্ণ কারণ শুধু application-level validation race condition-এর কারণে duplicate data prevent করার জন্য যথেষ্ট নাও হতে পারে।`,
	},

	{
		id: "django-30",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Signals", "post_save", "Architecture"],
		question: "Django Signals কী?",
		answer: `Django Signals নির্দিষ্ট event ঘটলে অন্য code execute করার mechanism।

Common signals:

pre_save
post_save
pre_delete
post_delete
m2m_changed

Example:

User created
 ↓
post_save
 ↓
Create Profile

Signals simple side effect-এর জন্য useful।

কিন্তু complex business workflow signal-এর মধ্যে লুকিয়ে রাখা উচিত নয়, কারণ debugging এবং code flow বোঝা কঠিন হয়ে যেতে পারে।`,
	},

	{
		id: "django-31",
		category: "Django",
		difficulty: "Senior",
		tags: ["Signals", "Service Layer", "Architecture"],
		question: "Django Signals বনাম Service Layer—কখন কোনটি ব্যবহার করবেন?",
		answer: `Signal:

Simple event-driven side effect-এর জন্য ভালো।

Example:

User created
→ Create profile

Service Layer:

Explicit business workflow-এর জন্য ভালো।

Example:

Create Order
→ Validate Cart
→ Calculate Price
→ Reserve Inventory
→ Create Payment

Complex business logic service layer-এ রাখলে flow explicit এবং testable থাকে।`,
	},

	{
		id: "django-32",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Custom User", "Authentication"],
		question: "Django-তে Custom User Model কেন ব্যবহার করবেন?",
		answer: `Django project শুরু করার সময় custom user model ব্যবহার করা ভালো practice হতে পারে।

বিশেষ করে যদি application-এ:

- Email login
- Custom user fields
- Multiple user types
- Custom authentication rules

থাকে।

Custom user model project-এর শুরুতেই define করা সহজ।

Existing project-এর পরে user model পরিবর্তন করলে migration complexity অনেক বেড়ে যেতে পারে।`,
	},

	{
		id: "django-33",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Authentication", "Authorization", "Security"],
		question: "Authentication এবং Authorization-এর মধ্যে পার্থক্য কী?",
		answer: `Authentication:

"আপনি কে?"

Example:
→ Login
→ JWT
→ Session

Authorization:

"আপনি কী করতে পারবেন?"

Example:

Admin
→ Delete User

Employee
→ View User

Flow:

Request
 ↓
Authentication
 ↓
Identify User
 ↓
Authorization
 ↓
Check Permission
 ↓
Allow/Deny`,
	},

	{
		id: "django-34",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Session", "Authentication"],
		question: "Django Session Authentication কীভাবে কাজ করে?",
		answer: `Session authentication-এ user login করার পরে server-side session তৈরি করে।

Flow:

Login
 ↓
Validate credentials
 ↓
Create session
 ↓
Session ID
 ↓
Cookie
 ↓
Browser

পরবর্তী request-এ browser cookie পাঠায়।

Django session থেকে user identify করে।

Traditional web application-এর জন্য এটি খুব useful।

Stateless REST API-তে JWT বা token-based authentication বেশি common হতে পারে।`,
	},

	{
		id: "django-35",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["CSRF", "Security"],
		question: "CSRF কী এবং Django কীভাবে protection দেয়?",
		answer: `CSRF = Cross-Site Request Forgery।

Attacker অন্য website ব্যবহার করে authenticated user's browser থেকে unwanted request পাঠানোর চেষ্টা করতে পারে।

Django CSRF token ব্যবহার করে protection দেয়।

Flow:

Form
 ↓
CSRF Token
 ↓
Request
 ↓
Django Validation
 ↓
Allow/Deny

Session/cookie-based authentication-এর ক্ষেত্রে CSRF protection বিশেষভাবে গুরুত্বপূর্ণ।`,
	},

	{
		id: "django-36",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["XSS", "Security"],
		question: "XSS কী এবং Django কীভাবে সাহায্য করে?",
		answer: `XSS = Cross-Site Scripting।

Attacker malicious JavaScript application-এর page-এ inject করার চেষ্টা করে।

Django template engine defaultভাবে অনেক HTML output escape করে।

তবে developer যদি unsafe HTML explicitly render করে, তখন risk তৈরি হতে পারে।

Security-এর জন্য:

- Escape user input
- Avoid unsafe HTML
- Validate input
- Content Security Policy consider করা
- Trusted HTML carefully handle করা

প্রয়োজন।`,
	},

	{
		id: "django-37",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["CSRF", "CORS", "Security"],
		question: "CSRF এবং CORS-এর মধ্যে পার্থক্য কী?",
		answer: `CSRF:

Browser authenticated request misuse prevent করার security mechanism।

CORS:

এক origin-এর browser application অন্য origin-এর resource/API access করতে পারবে কিনা তা control করে।

সহজভাবে:

CSRF
→ Unauthorized browser action protection

CORS
→ Cross-origin browser access policy

দুটো আলাদা security concept।`,
	},

	{
		id: "django-38",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Static", "Media", "Files"],
		question: "Django Static Files এবং Media Files-এর মধ্যে পার্থক্য কী?",
		answer: `Static files:

Application-এর fixed assets।

Example:

CSS
JavaScript
Images
Fonts

Media files:

User-uploaded files।

Example:

Profile photo
Product image
Documents

Static:
→ Developer/application controlled

Media:
→ User generated

Production-এ এগুলোর storage এবং serving strategy আলাদা করে design করা উচিত।`,
	},

	{
		id: "django-39",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["File Upload", "Security"],
		question: "Django file upload-এর সময় কী কী security concern আছে?",
		answer: `File upload untrusted input হিসেবে treat করতে হবে।

Consider:

- File size limit
- File type validation
- MIME validation
- Extension validation
- Filename sanitization
- Storage isolation
- Virus scanning যেখানে প্রয়োজন
- Executable file restriction

User-uploaded file directly executable location-এ রাখা উচিত নয়।

Large file system-এ object storage যেমন S3-compatible storage ব্যবহার করা যেতে পারে।`,
	},

	{
		id: "django-40",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Caching", "Redis", "Performance"],
		question: "Django caching কী?",
		answer: `Caching frequently requested data memory/fast storage-এ রেখে দ্রুত response দেওয়ার technique।

Common backend:

Redis

Flow:

Request
 ↓
Cache
 ├── Hit → Response
 └── Miss
       ↓
     Database
       ↓
     Cache
       ↓
     Response

Caching use case:

- Frequently read data
- Expensive computation
- API response
- Session
- Rate limiting

সবচেয়ে গুরুত্বপূর্ণ বিষয়:

Cache invalidation

Data update হলে stale cache কীভাবে remove/update হবে তা design করতে হবে।`,
	},

	{
		id: "django-41",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Celery", "Background Task"],
		question: "Celery কী এবং Django-তে কেন ব্যবহার করা হয়?",
		answer: `Celery হলো distributed task queue।

Django request-এর মধ্যে long-running কাজ না করে background worker-এ পাঠানো যায়।

Example:

User Registration
 ↓
Django
 ↓
Create User
 ↓
Celery Task
 ↓
Send Email

Use cases:

- Email
- Report generation
- Image processing
- Scheduled jobs
- Data processing
- External API operations

Architecture:

Django
 ↓
Broker
 ↓
Celery Worker
 ↓
Task`,
	},

	{
		id: "django-42",
		category: "Django",
		difficulty: "Senior",
		tags: ["Celery", "Retry", "Reliability"],
		question: "Celery task retry কীভাবে design করবেন?",
		answer: `Temporary failure হলে Celery task retry করা যায়।

Example:

External API
 ↓
Timeout
 ↓
Retry
 ↓
Exponential Backoff
 ↓
Success

Production strategy:

- Maximum retries
- Exponential backoff
- Retryable errors
- Permanent error handling
- Idempotency
- Failure monitoring

সব exception blindly retry করা উচিত নয়।`,
	},

	{
		id: "django-43",
		category: "Django",
		difficulty: "Senior",
		tags: ["Bulk Operations", "ORM", "Performance"],
		question: "bulk_create এবং bulk_update কেন ব্যবহার করবেন?",
		answer: `অনেক record একসাথে insert/update করতে bulk operation database round trip কমাতে পারে।

Instead of:

for item in items:
    item.save()

ব্যবহার করা যায়:

bulk_create()

অথবা:

bulk_update()

এটি large data processing-এর performance improve করতে পারে।

তবে bulk operation-এর limitations এবং signal/save behavior সম্পর্কে সচেতন থাকতে হবে।`,
	},

	{
		id: "django-44",
		category: "Django",
		difficulty: "Senior",
		tags: ["Aggregation", "Annotation", "ORM"],
		question: "Django annotate() এবং aggregate() কী?",
		answer: `aggregate():

পুরো QuerySet-এর উপর calculation করে।

Example:

Sum
Avg
Count
Max
Min

annotate():

প্রতিটি returned object-এর সাথে calculated field যোগ করে।

Example:

প্রতিটি Category-এর সাথে product_count যোগ করা।

Concept:

aggregate
→ Overall result

annotate
→ Per-object calculated result`,
	},

	{
		id: "django-45",
		category: "Django",
		difficulty: "Senior",
		tags: ["F Expression", "ORM", "Concurrency"],
		question: "Django F() expression কী?",
		answer: `F() database field-এর current value ব্যবহার করে database-side operation করতে দেয়।

Example:

Product.objects.update(
    stock=F("stock") - 1
)

এখানে application আগে stock read করে তারপর update করছে না।

Database নিজেই:

stock = stock - 1

করতে পারে।

এটি concurrency এবং performance-এর জন্য useful হতে পারে।`,
	},

	{
		id: "django-46",
		category: "Django",
		difficulty: "Senior",
		tags: ["Q Object", "ORM", "Query"],
		question: "Django Q object কী?",
		answer: `Q object complex query condition তৈরি করতে ব্যবহার করা হয়।

যেমন:

name contains "phone"
OR
description contains "phone"

Q object দিয়ে:

AND
OR
NOT

logic তৈরি করা যায়।

Complex filtering এবং dynamic search API তৈরি করার সময় এটি খুব useful।`,
	},

	{
		id: "django-47",
		category: "Django",
		difficulty: "Senior",
		tags: ["Raw SQL", "ORM", "Database"],
		question: "Django ORM থাকা সত্ত্বেও Raw SQL কখন ব্যবহার করবেন?",
		answer: `সাধারণ CRUD এবং common queries-এর জন্য ORM preferred।

Raw SQL consider করা যেতে পারে যখন:

- Extremely complex SQL
- Database-specific feature
- ORM query inefficient
- Advanced reporting
- Vendor-specific optimization

তবে Raw SQL ব্যবহারের আগে:

1. Query plan
2. Index
3. ORM optimization
4. select_related/prefetch_related

check করা উচিত।

Raw SQL ব্যবহার করলে SQL injection prevent করার জন্য parameterized query ব্যবহার করতে হবে।`,
	},

	{
		id: "django-48",
		category: "Django",
		difficulty: "Senior",
		tags: ["Performance", "Database", "Optimization"],
		question: "Django application slow হলে কীভাবে troubleshoot করবেন?",
		answer: `Guess না করে প্রথমে measure করতে হবে।

Step 1:
→ Request latency

Step 2:
→ Database query count

Step 3:
→ Slow SQL

Step 4:
→ N+1 queries

Step 5:
→ Index

Step 6:
→ Serialization

Step 7:
→ External API latency

Step 8:
→ Cache

Step 9:
→ CPU/Memory

Typical optimization:

select_related
prefetch_related
indexes
pagination
bulk operations
caching
query optimization

Golden rule:

Measure → Identify bottleneck → Optimize → Measure again`,
	},

	{
		id: "django-49",
		category: "Django",
		difficulty: "Senior",
		tags: ["Async", "ASGI", "Concurrency"],
		question: "Modern Django কি async support করে?",
		answer: `হ্যাঁ, modern Django ASGI এবং asynchronous request handling support করে।

Async view:

async def my_view(request):
    ...

Async বিশেষভাবে useful হতে পারে I/O-bound workload-এর ক্ষেত্রে।

যেমন:

- External API
- Async network operation
- Long-lived connection

তবে synchronous blocking operation async code-এর ভিতরে রাখলে expected benefit পাওয়া যাবে না।

তাই async migration-এর আগে dependency এবং actual workload analyze করা উচিত।`,
	},

	{
		id: "django-50",
		category: "Django",
		difficulty: "Senior",
		tags: ["ASGI", "WSGI", "Deployment"],
		question: "WSGI এবং ASGI-এর মধ্যে পার্থক্য কী?",
		answer: `WSGI traditional synchronous Python web application interface।

ASGI modern asynchronous Python application interface।

WSGI:

Client
 ↓
WSGI Server
 ↓
Django

ASGI:

Client
 ↓
ASGI Server
 ↓
Django
 ↓
Async support

ASGI WebSocket এবং asynchronous workloads-এর জন্যও suitable।

Modern Django deployment-এর ক্ষেত্রে workload অনুযায়ী WSGI বা ASGI নির্বাচন করা যায়।`,
	},

	{
		id: "django-51",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Admin", "Django Admin"],
		question: "Django Admin কী?",
		answer: `Django Admin হলো Django-এর built-in administrative interface।

এটি দিয়ে:

- Users manage
- Products manage
- Orders manage
- Database records inspect
- Internal operations

করা যায়।

Django Admin customer-facing frontend নয়।

Internal staff operation-এর জন্য এটি খুব useful।`,
	},

	{
		id: "django-52",
		category: "Django",
		difficulty: "Intermediate",
		tags: ["Admin", "Security"],
		question: "Django Admin production-এ কীভাবে secure করবেন?",
		answer: `Production admin interface sensitive হওয়ায় extra security দরকার।

Consider:

- Strong authentication
- Least privilege permission
- HTTPS
- Secure cookies
- Admin activity logging
- MFA যেখানে সম্ভব
- Restricted access
- Sensitive field protection
- Monitoring

Admin URL পরিবর্তন করা একা security solution নয়।

মূল security হলো authentication, authorization এবং network/access control।`,
	},

	{
		id: "django-53",
		category: "Django",
		difficulty: "Senior",
		tags: ["Multi-Tenancy", "SaaS", "Architecture"],
		question: "Django-তে Multi-Tenancy কী?",
		answer: `Multi-tenancy হলো একই application multiple organization/customer-এর data serve করবে।

Example:

Tenant A
→ Users
→ Products
→ Orders

Tenant B
→ Users
→ Products
→ Orders

Common approaches:

1. Shared database + tenant_id
2. Separate schema
3. Separate database

Shared database architecture:

Request
 ↓
Identify Tenant
 ↓
Tenant Context
 ↓
Tenant-filtered Query
 ↓
Response

সব query-তে tenant isolation নিশ্চিত করা অত্যন্ত গুরুত্বপূর্ণ।`,
	},

	{
		id: "django-54",
		category: "Django",
		difficulty: "Senior",
		tags: ["Soft Delete", "Database"],
		question: "Soft Delete কী?",
		answer: `Soft delete-এ database row physically delete করা হয় না।

বরং:

deleted_at = timestamp

অথবা:

is_deleted = true

করা হয়।

Benefits:

- Data recovery
- Audit
- History
- Referential integrity

কিন্তু application-এর সব relevant query-তে deleted record exclude করতে হবে।

Compliance বা privacy requirement অনুযায়ী কিছু ক্ষেত্রে actual deletion প্রয়োজন হতে পারে।`,
	},

	{
		id: "django-55",
		category: "Django",
		difficulty: "Senior",
		tags: ["Audit Log", "Security", "Compliance"],
		question: "Django-তে Audit Log কেন প্রয়োজন?",
		answer: `Audit log দিয়ে কে কখন কী পরিবর্তন করেছে তার history রাখা হয়।

Example:

User:
admin

Action:
UPDATE

Resource:
Order #100

Before:
pending

After:
approved

Useful for:

- Security
- Debugging
- Compliance
- Admin tracking
- Business traceability

Sensitive system-এ audit logs restricted access-এর মধ্যে রাখা উচিত।`,
	},

	{
		id: "django-56",
		category: "Django",
		difficulty: "Senior",
		tags: ["Testing", "Unit Test", "Integration Test"],
		question: "Django application কীভাবে test করবেন?",
		answer: `Django testing-এর জন্য বিভিন্ন ধরনের test করা যায়।

1. Unit Test
→ Individual function/class

2. Model Test
→ Model behavior

3. View Test
→ HTTP behavior

4. Integration Test
→ Multiple components

5. API Test
→ API endpoint

6. End-to-End Test
→ Complete user flow

Testing tools:

- Django TestCase
- unittest
- pytest
- pytest-django

Important cases:

Success
Validation error
Authentication failure
Permission failure
Not found
Database constraint
Transaction failure`,
	},

	{
		id: "django-57",
		category: "Django",
		difficulty: "Senior",
		tags: ["Testing", "Mock", "External API"],
		question: "External API call কীভাবে test করবেন?",
		answer: `Automated test-এ real production external API call করা উচিত নয়।

Instead:

Mock
Fake
Stub
Test environment

ব্যবহার করা যায়।

Example:

Django
 ↓
Payment Client
 ↓
Mock Payment API

Test করা যায়:

Success
Timeout
500 error
Invalid response
Retry
Duplicate request

এতে test দ্রুত এবং deterministic হয়।`,
	},

	{
		id: "django-58",
		category: "Django",
		difficulty: "Senior",
		tags: ["Logging", "Observability", "Production"],
		question: "Production Django application-এ logging কীভাবে design করবেন?",
		answer: `Production logging structured এবং searchable হওয়া উচিত।

Important fields:

- Timestamp
- Log level
- Request ID
- User ID
- Endpoint
- Status code
- Response time
- Error
- Service name

Example:

Request
 ↓
request_id = abc123
 ↓
Django
 ↓
Service
 ↓
Database

Password, JWT token, secret বা sensitive personal data log করা উচিত নয়।`,
	},

	{
		id: "django-59",
		category: "Django",
		difficulty: "Senior",
		tags: ["Production", "Deployment", "Scalability"],
		question: "Django production deployment architecture কেমন হতে পারে?",
		answer: `একটি common production architecture:

Internet
   ↓
Load Balancer
   ↓
Nginx
   ↓
Django Application
   ↓
Database

Parallel components:

Django
 ├── Redis
 ├── Celery
 ├── Message Broker
 ├── Object Storage
 └── Monitoring

Application multiple instance-এ scale করা যায়।

Django application stateless রাখা হলে horizontal scaling সহজ হয়।`,
	},

	{
		id: "django-60",
		category: "Django",
		difficulty: "Senior",
		tags: ["Architecture", "Scalability", "Production", "Senior"],
		question:
			"একজন Senior Django Developer হিসেবে production application design করার সময় কী কী বিষয় consider করবেন?",
		answer: `Senior Django developer হিসেবে শুধু Model এবং View তৈরি করা যথেষ্ট নয়।

পুরো system consider করতে হবে।

1. Architecture
→ Modular apps
→ Service layer
→ Clear responsibility

2. Database
→ Schema design
→ Index
→ Query optimization
→ Transactions
→ Locking

3. Performance
→ N+1 prevention
→ select_related
→ prefetch_related
→ Caching
→ Pagination
→ Bulk operations

4. Security
→ Authentication
→ Authorization
→ CSRF
→ CORS
→ XSS
→ Secret management
→ Rate limiting

5. Background Processing
→ Celery
→ Redis/RabbitMQ
→ Retry
→ Scheduled jobs

6. Reliability
→ Idempotency
→ Timeout
→ Retry
→ Graceful failure

7. Observability
→ Structured logging
→ Metrics
→ Request ID
→ Tracing
→ Alerting

8. Deployment
→ Docker
→ WSGI/ASGI
→ Nginx/Load Balancer
→ CI/CD
→ Health checks
→ Migration strategy

9. Scalability
→ Stateless application
→ Horizontal scaling
→ Database optimization
→ Redis
→ Background workers

10. Maintainability
→ SOLID
→ Separation of concerns
→ Testing
→ Documentation
→ Code review

Overall architecture:

Client
   ↓
Load Balancer / API Gateway
   ↓
Django
   ↓
Service Layer
   ↓
ORM
   ↓
Database

Parallel:

Django
 ├── Redis
 ├── Celery
 ├── RabbitMQ/Kafka
 ├── External Services
 └── Monitoring

এই foundation-এর উপর পরে Django REST Framework এবং Microservice architecture build করা যায়।`,
	},
];
