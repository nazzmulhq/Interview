const pythonQuestions = [
	// ============================================================
	// PYTHON FUNDAMENTALS
	// ============================================================

	{
		id: "py-1",
		category: "Python",
		difficulty: "Beginner",
		tags: ["Python", "Interpreter", "Features", "PEP8"],
		question: "Python কী? Python-এর প্রধান বৈশিষ্ট্যগুলো কী?",
		answer: `Python হলো একটি high-level, general-purpose, interpreted programming language। এটি web development, API development, automation, data science, AI/ML, scripting এবং microservices-এ ব্যাপকভাবে ব্যবহৃত হয়।

Python-এর প্রধান বৈশিষ্ট্য:

1. সহজ এবং readable syntax
2. Dynamically typed
3. Interpreted/bytecode-based execution
4. Object-oriented programming support
5. Functional programming support
6. Automatic memory management
7. Large standard library
8. বিশাল third-party ecosystem
9. Exception handling
10. Generators এবং iterators
11. Async/await support
12. Cross-platform
13. Fast development speed

Python-এর একটি গুরুত্বপূর্ণ বিষয় হলো এটি শুধু "interpreted language" বললে পুরো picture পাওয়া যায় না। CPython সাধারণত source code-কে bytecode-এ compile করে এবং Python Virtual Machine সেই bytecode execute করে।

Typical flow:

Python Source Code
        ↓
Python Compiler
        ↓
Bytecode
        ↓
Python Virtual Machine
        ↓
Execution

PEP 8 Python code-এর style এবং formatting-এর guideline প্রদান করে।`,
	},

	{
		id: "py-2",
		category: "Python",
		difficulty: "Beginner",
		tags: ["Syntax", "Variables", "Dynamic Typing", "Strong Typing"],
		question: "Python dynamically typed এবং strongly typed বলতে কী বোঝায়?",
		answer: `Python dynamically typed কারণ variable declare করার সময় data type explicitly declare করতে হয় না।

উদাহরণ:

x = 10
x = "Nazmul"

একই variable পরে অন্য type-এর object reference করতে পারে।

Python strongly typed কারণ incompatible types automatically unsafeভাবে combine করে না।

উদাহরণ:

age = 30
name = "Nazmul"

age + name

এখানে Python implicitভাবে integer এবং string concatenate করে দেবে না; TypeError হবে।

সুতরাং:

Dynamic typing:
Variable-এর type runtime-এ determine হয়।

Strong typing:
Different incompatible types-এর operation automatically unsafe conversion করে না।`,
	},

	{
		id: "py-3",
		category: "Python",
		difficulty: "Beginner",
		tags: ["Data Types", "Built-in Types"],
		question: "Python-এর built-in data types কী কী?",
		answer: `Python-এর গুরুত্বপূর্ণ built-in data types:

1. Numeric:
   - int
   - float
   - complex

2. Boolean:
   - bool

3. Sequence:
   - list
   - tuple
   - range

4. Text:
   - str

5. Mapping:
   - dict

6. Set:
   - set
   - frozenset

7. Binary:
   - bytes
   - bytearray
   - memoryview

8. Special:
   - NoneType

উদাহরণ:

age = 30                  # int
price = 99.5              # float
name = "Nazmul"           # str
active = True              # bool
items = [1, 2, 3]         # list
point = (10, 20)          # tuple
users = {"id": 1}         # dict
unique = {1, 2, 3}        # set
value = None              # NoneType

Interview-এ list, tuple, set এবং dict-এর difference অবশ্যই জানতে হবে।`,
	},

	{
		id: "py-4",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["List", "Tuple", "Set", "Dictionary", "Data Structures"],
		question: "List, Tuple, Set এবং Dictionary-এর মধ্যে পার্থক্য কী?",
		answer: `List:
- Ordered
- Mutable
- Duplicate allowed
- Index দিয়ে access করা যায়

Example:
items = [1, 2, 2, 3]

Tuple:
- Ordered
- Immutable
- Duplicate allowed
- Index দিয়ে access করা যায়

Example:
items = (1, 2, 2, 3)

Set:
- Unique values
- Mutable
- সাধারণত unordered collection হিসেবে ব্যবহার করা হয়
- Duplicate রাখে না

Example:
items = {1, 2, 3}

Dictionary:
- Key-value structure
- Mutable
- Key unique হতে হয়
- Key hashable হতে হয়

Example:
user = {
    "id": 1,
    "name": "Nazmul"
}

কখন কোনটি ব্যবহার করবেন:

List → Ordered collection এবং পরিবর্তন দরকার হলে
Tuple → Immutable structured data
Set → Unique values / membership checking
Dict → Key-value lookup`,
	},

	{
		id: "py-5",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Mutable", "Immutable", "Object"],
		question: "Mutable এবং Immutable object কী?",
		answer: `Mutable object হলো এমন object যার internal state তৈরি হওয়ার পরে পরিবর্তন করা যায়।

Mutable examples:
- list
- dict
- set
- bytearray

Immutable examples:
- int
- float
- str
- tuple
- bool
- frozenset
- bytes

Example:

items = [1, 2, 3]
items.append(4)

এখানে একই list object পরিবর্তিত হয়েছে।

কিন্তু:

name = "Nazmul"
name = name + " Haque"

এখানে original string পরিবর্তন হয়নি। নতুন string object তৈরি হয়েছে।

Immutable object সাধারণত hashable হতে পারে, তাই string এবং tuple dictionary key হিসেবে ব্যবহার করা যায় যদি tuple-এর সব element hashable হয়।`,
	},

	{
		id: "py-6",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["is", "==", "Equality", "Identity"],
		question: "Python-এ == এবং is-এর মধ্যে পার্থক্য কী?",
		answer: `== value equality check করে।

is object identity check করে।

উদাহরণ:

a = [1, 2]
b = [1, 2]

a == b
→ True

কারণ দুইটির value একই।

কিন্তু:

a is b
→ False

কারণ দুইটি আলাদা object।

সাধারণত None check করার সময়:

if value is None:
    ...

ব্যবহার করা উচিত।

কারণ এখানে আমরা value equality নয়, object identity check করতে চাই।`,
	},

	{
		id: "py-7",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Shallow Copy", "Deep Copy", "Copy"],
		question: "Shallow copy এবং Deep copy কী?",
		answer: `Shallow copy outer object copy করে, কিন্তু nested mutable object-এর reference share করতে পারে।

Example:

import copy

a = [[1, 2], [3, 4]]
b = copy.copy(a)

এখানে outer list আলাদা হলেও nested list একই object হতে পারে।

Deep copy recursively nested object-ও copy করে।

b = copy.deepcopy(a)

তখন nested object-ও আলাদা হবে।

Shallow copy:
Outer object → নতুন
Nested object → shared হতে পারে

Deep copy:
Outer object → নতুন
Nested object → নতুন

Large object-এর ক্ষেত্রে deep copy memory এবং performance-এর জন্য expensive হতে পারে। তাই প্রয়োজন ছাড়া deepcopy ব্যবহার করা উচিত নয়।`,
	},

	{
		id: "py-8",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Variables", "Reference", "Object Model"],
		question: "Python variable কীভাবে কাজ করে? Python কি variable-এ value রাখে?",
		answer: `Python-এ variable মূলত object-এর reference বা name binding হিসেবে কাজ করে।

উদাহরণ:

a = [1, 2, 3]
b = a

এখানে a এবং b একই list object-কে reference করছে।

Concept:

a ─────┐
       ↓
    [1, 2, 3]
       ↑
       └───── b

তাই:

b.append(4)

করলে a-এর মাধ্যমে দেখা list-ও পরিবর্তিত হবে।

এই object reference model Python-এর mutable এবং immutable behavior বোঝার জন্য খুব গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-9",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Function", "Parameters", "Arguments", "Return"],
		question: "Python function কী? Parameter এবং argument-এর মধ্যে পার্থক্য কী?",
		answer: `Function হলো reusable code block যা নির্দিষ্ট কাজ করে।

Example:

def add(a, b):
    return a + b

এখানে a এবং b হলো parameters।

যখন call করা হয়:

add(10, 20)

এখানে 10 এবং 20 হলো arguments।

Parameter:
Function definition-এর variable।

Argument:
Function call করার সময় দেওয়া actual value।

Python function:
- Multiple arguments নিতে পারে
- Default parameter থাকতে পারে
- Keyword argument নিতে পারে
- *args নিতে পারে
- **kwargs নিতে পারে
- Function object হিসেবে pass করা যায়
- Function থেকে multiple values return করা যায়`,
	},

	{
		id: "py-10",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Default Argument", "Function", "Mutable Default"],
		question: "Python-এ mutable default argument-এর সমস্যা কী?",
		answer: `একটি common Python mistake হলো mutable object-কে function-এর default argument হিসেবে ব্যবহার করা।

Problematic example:

def add_item(item, items=[]):
    items.append(item)
    return items

এই default list function definition-এর সময় একবার তৈরি হয় এবং পরবর্তী call-গুলোতে একই list reuse হতে পারে।

তাই:

add_item("A")
add_item("B")

এর result unexpectedভাবে:

["A", "B"]

হতে পারে।

Better approach:

def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items

এখানে প্রতিবার প্রয়োজন হলে নতুন list তৈরি হয়।

Interview-এ এটি Python-এর খুব common trick question।`,
	},

	{
		id: "py-11",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["args", "kwargs", "Function"],
		question: "*args এবং **kwargs কী?",
		answer: `*args variable number of positional arguments গ্রহণ করে।

Example:

def add(*args):
    return sum(args)

add(1, 2, 3, 4)

এখানে args একটি tuple।

**kwargs variable number of keyword arguments গ্রহণ করে।

Example:

def create_user(**kwargs):
    return kwargs

create_user(name="Nazmul", age=30)

এখানে kwargs একটি dictionary।

দুটো একসাথে:

def function(*args, **kwargs):
    ...

Use cases:
- Flexible APIs
- Wrapper functions
- Decorators
- Generic utility functions

Argument order সাধারণত:
positional parameters
→ *args
→ keyword-only parameters
→ **kwargs`,
	},

	{
		id: "py-12",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Lambda", "Anonymous Function", "Functional Programming"],
		question: "Lambda function কী? কখন ব্যবহার করবেন?",
		answer: `Lambda হলো ছোট anonymous function।

Example:

square = lambda x: x * x

এটি equivalent:

def square(x):
    return x * x

Lambda সাধারণত ছোট এক-line operation-এর জন্য ব্যবহার করা হয়।

Example:

users = [
    {"name": "A", "age": 30},
    {"name": "B", "age": 20}
]

users.sort(key=lambda user: user["age"])

Complex business logic lambda-এর মধ্যে না রেখে normal named function ব্যবহার করা বেশি readable।`,
	},

	{
		id: "py-13",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["List Comprehension", "Dictionary Comprehension", "Set Comprehension"],
		question: "List comprehension কী?",
		answer: `List comprehension হলো concise syntax ব্যবহার করে list তৈরি করার উপায়।

Normal:

result = []

for i in range(10):
    if i % 2 == 0:
        result.append(i)

Comprehension:

result = [i for i in range(10) if i % 2 == 0]

Dictionary comprehension:

squares = {
    i: i * i
    for i in range(5)
}

Set comprehension:

values = {
    i * 2
    for i in range(10)
}

ছোট এবং readable transformation-এর জন্য comprehension ভালো।

অতিরিক্ত complex comprehension readability কমিয়ে দিতে পারে।`,
	},

	{
		id: "py-14",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Iterator", "Iterable", "Iteration"],
		question: "Iterable এবং Iterator-এর মধ্যে পার্থক্য কী?",
		answer: `Iterable হলো এমন object যার উপর iteration করা যায়।

Examples:
- list
- tuple
- string
- dict
- set

Iterator হলো এমন object যা একবারে একটি value return করে এবং __next__() support করে।

Example:

numbers = [1, 2, 3]

iterator = iter(numbers)

next(iterator)
→ 1

next(iterator)
→ 2

next(iterator)
→ 3

next(iterator)
→ StopIteration

for loop internally iterable থেকে iterator তৈরি করে এবং next() ব্যবহার করে value নেয়।

Generator হলো iterator তৈরি করার একটি সহজ উপায়।`,
	},

	{
		id: "py-15",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Generator", "Yield", "Lazy Evaluation", "Memory"],
		question: "Generator কী এবং yield কীভাবে কাজ করে?",
		answer: `Generator এমন function যা yield ব্যবহার করে একবারে একটি value produce করে।

Example:

def numbers():
    for i in range(1000000):
        yield i

এটি একসাথে 1 million value memory-তে রাখে না।

Flow:

next()
↓
Generate value
↓
Pause
↓
next()
↓
Resume
↓
Generate next value

Generator-এর সুবিধা:
- Memory efficient
- Lazy evaluation
- Large dataset processing
- File streaming
- Data pipeline

List:
সব data তৈরি করে memory-তে রাখে।

Generator:
প্রয়োজন অনুযায়ী data তৈরি করে।`,
	},

	// ============================================================
	// OOP
	// ============================================================

	{
		id: "py-16",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["OOP", "Class", "Object", "Encapsulation"],
		question: "Python-এ OOP কী? Class এবং Object কী?",
		answer: `OOP-এর পূর্ণরূপ Object-Oriented Programming।

Class হলো object তৈরির blueprint।

Object হলো class-এর instance।

Example:

class User:
    def __init__(self, name):
        self.name = name

user = User("Nazmul")

এখানে User হলো class এবং user হলো object।

OOP-এর প্রধান concept:
1. Encapsulation
2. Inheritance
3. Polymorphism
4. Abstraction

Large application এবং domain/business logic organize করার জন্য OOP useful।`,
	},

	{
		id: "py-17",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Inheritance", "Polymorphism", "OOP"],
		question: "Inheritance এবং Polymorphism কী?",
		answer: `Inheritance-এর মাধ্যমে একটি class অন্য class-এর behavior এবং attributes reuse করতে পারে।

Example:

class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Bark"

Dog Animal-এর behavior inherit করেছে।

Polymorphism হলো একই interface/method বিভিন্ন class-এ ভিন্নভাবে কাজ করা।

dog.speak()
→ Bark

cat.speak()
→ Meow

Python duck typing-এর কারণে explicit inheritance ছাড়াও polymorphism সম্ভব।`,
	},

	{
		id: "py-18",
		category: "Python",
		difficulty: "Advanced",
		tags: ["Duck Typing", "Polymorphism", "Dynamic Typing"],
		question: "Duck typing কী?",
		answer: `Python-এ object-এর exact type-এর চেয়ে object কী behavior support করে সেটি বেশি গুরুত্বপূর্ণ হলে তাকে duck typing বলা হয়।

Concept:

"If it walks like a duck and quacks like a duck, treat it like a duck."

Example:

def make_sound(animal):
    return animal.speak()

Dog-এর speak() থাকলে এবং Cat-এরও speak() থাকলে function দুটোর ক্ষেত্রেই কাজ করতে পারে।

এখানে function class-এর inheritance relationship-এর উপর depend করছে না; expected behavior-এর উপর depend করছে।

এটি Python-এর dynamic এবং flexible design-এর গুরুত্বপূর্ণ অংশ।`,
	},

	{
		id: "py-19",
		category: "Python",
		difficulty: "Advanced",
		tags: ["ABC", "Abstract Class", "Abstraction", "OOP"],
		question: "Abstract class কী? Python-এ abstraction কীভাবে implement করবেন?",
		answer: `Abstract class এমন base class যা common contract define করে এবং child class-কে নির্দিষ্ট method implement করতে বাধ্য করতে পারে।

Python-এ abc module ব্যবহার করা যায়।

Example:

from abc import ABC, abstractmethod

class Payment(ABC):

    @abstractmethod
    def pay(self, amount):
        pass

class StripePayment(Payment):

    def pay(self, amount):
        return "Paid"

এখানে Payment একটি abstraction এবং StripePayment concrete implementation।

Dependency Inversion এবং clean architecture-এ abstraction গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-20",
		category: "Python",
		difficulty: "Advanced",
		tags: ["Magic Methods", "Dunder Methods", "OOP"],
		question: "Magic বা Dunder methods কী?",
		answer: `যেসব special method-এর নাম __ দিয়ে শুরু এবং শেষ হয় সেগুলোকে dunder বা magic methods বলা হয়।

Examples:

__init__
__str__
__repr__
__len__
__eq__
__lt__
__add__
__enter__
__exit__

Example:

class User:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

__str__ object-এর human-readable representation দিতে ব্যবহৃত হয়।

__repr__ debugging/developer-oriented representation-এর জন্য বেশি useful।

Magic methods Python object-এর built-in behavior customize করতে সাহায্য করে।`,
	},

	// ============================================================
	// DECORATORS / CONTEXT MANAGER
	// ============================================================

	{
		id: "py-21",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Decorator", "Higher Order Function", "Wrapper"],
		question: "Decorator কী এবং বাস্তবে কোথায় ব্যবহার করবেন?",
		answer: `Decorator এমন function যা অন্য function-এর behavior modify বা extend করে।

Example:

def logger(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result

    return wrapper

@logger
def hello():
    print("Hello")

Decorator-এর real-world use:
- Logging
- Authentication
- Authorization
- Caching
- Retry
- Performance measurement
- Permission checking

FastAPI-এর route declaration-ও decorator pattern-এর একটি practical example।`,
	},

	{
		id: "py-22",
		category: "Python",
		difficulty: "Advanced",
		tags: ["functools", "Decorator", "Metadata", "wraps"],
		question: "functools.wraps কেন ব্যবহার করা হয়?",
		answer: `Decorator-এর wrapper function ব্যবহার করলে original function-এর metadata হারিয়ে যেতে পারে।

যেমন:
- __name__
- __doc__
- অন্যান্য metadata

functools.wraps ব্যবহার করলে original function-এর metadata preserve করা যায়।

Example:

from functools import wraps

def logger(func):

    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper

Production decorator লেখার সময় @wraps ব্যবহার করা ভালো practice।`,
	},

	{
		id: "py-23",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Context Manager", "With", "Resource Management"],
		question: "Context manager কী এবং কীভাবে নিজে তৈরি করবেন?",
		answer: `Context manager resource lifecycle automatically manage করে।

Example:

with open("file.txt") as file:
    data = file.read()

এখানে with block শেষ হলে file properly close হয়।

নিজে context manager তৈরি করার দুটি common উপায়:

1. __enter__ এবং __exit__
2. contextlib.contextmanager

Example:

from contextlib import contextmanager

@contextmanager
def resource():
    print("Open")
    try:
        yield
    finally:
        print("Close")

Database connection, lock এবং file handling-এর মতো resource management-এ context manager useful।`,
	},

	// ============================================================
	// EXCEPTION HANDLING
	// ============================================================

	{
		id: "py-24",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Exception", "Try", "Except", "Finally", "Raise"],
		question: "Python exception handling কীভাবে কাজ করে?",
		answer: `Python-এ exception handling-এর জন্য try, except, else এবং finally ব্যবহার করা যায়।

Structure:

try:
    risky_operation()
except SpecificException:
    handle_error()
else:
    success_logic()
finally:
    cleanup()

try:
যে code exception তৈরি করতে পারে।

except:
Exception handle করে।

else:
কোনো exception না হলে execute হয়।

finally:
Exception হোক বা না হোক সাধারণত execute হয় এবং cleanup-এর জন্য useful।

নিজে exception তৈরি করতে raise ব্যবহার করা যায়।`,
	},

	{
		id: "py-25",
		category: "Python",
		difficulty: "Senior",
		tags: ["Custom Exception", "Exception Hierarchy", "Error Handling"],
		question: "Custom exception কেন এবং কীভাবে তৈরি করবেন?",
		answer: `Business-specific error পরিষ্কারভাবে represent করার জন্য custom exception ব্যবহার করা হয়।

Example:

class UserNotFoundException(Exception):
    pass

class PaymentFailedException(Exception):
    pass

তারপর:

if user is None:
    raise UserNotFoundException("User not found")

Advantages:
- Business error আলাদা করা যায়
- Centralized exception handler করা সহজ
- Error code mapping সহজ
- Readability বাড়ে

Large application-এ generic Exception-এর বদলে meaningful domain-specific exception ব্যবহার করা ভালো।`,
	},

	{
		id: "py-26",
		category: "Python",
		difficulty: "Senior",
		tags: ["Exception", "Bare Except", "Error Handling"],
		question: "except Exception এবং bare except-এর মধ্যে পার্থক্য কী?",
		answer: `except Exception সাধারণ application-level exception ধরতে পারে।

উদাহরণ:

try:
    ...
except Exception as e:
    ...

Bare except:

try:
    ...
except:
    ...

Bare except খুব broad এবং KeyboardInterrupt, SystemExit-এর মতো BaseException subclass-ও catch করতে পারে।

Production code-এ সাধারণত specific exception বা প্রয়োজন অনুযায়ী Exception catch করা ভালো।

Exception silently swallow করা উচিত নয়; logging এবং appropriate handling করা উচিত।`,
	},

	// ============================================================
	// MEMORY / GIL / CONCURRENCY
	// ============================================================

	{
		id: "py-27",
		category: "Python",
		difficulty: "Senior",
		tags: ["Memory", "Reference Counting", "Heap", "CPython"],
		question: "Python memory management কীভাবে কাজ করে?",
		answer: `CPython-এর memory management-এর গুরুত্বপূর্ণ অংশগুলো হলো:

1. Python private heap
2. Reference counting
3. Garbage collector
4. Memory allocator

Python objects private heap-এ রাখা হয়।

Variable object-কে reference করে।

Example:

a = []
b = a

এখানে একই list object-এর multiple references আছে।

Reference count zero হলে object সাধারণত cleanup-এর জন্য eligible হয়।

Circular reference handle করার জন্য garbage collector কাজ করে।

Python developer হিসেবে memory optimization-এর জন্য:
- Large unnecessary objects avoid করা
- Generator ব্যবহার করা
- Cache size control করা
- Connection/resource properly close করা
- Memory leak-এর source identify করা

গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-28",
		category: "Python",
		difficulty: "Senior",
		tags: ["Garbage Collection", "Reference Cycle", "Memory"],
		question: "Python garbage collector কীভাবে কাজ করে?",
		answer: `CPython মূলত reference counting-এর মাধ্যমে object cleanup করে।

যখন object-এর reference count zero হয়, object সাধারণত immediately deallocate হতে পারে।

Problem হলো circular reference:

A → B
↑   ↓
└───┘

এখানে A এবং B একে অপরকে reference করলে external reference না থাকলেও reference count zero নাও হতে পারে।

Python-এর cyclic garbage collector unreachable reference cycle detect করে cleanup করতে পারে।

gc module ব্যবহার করে garbage collector inspect বা control করা যায়।

তবে production code-এ gc.disable() বা manual GC নিয়ে কাজ করার আগে profiling এবং বাস্তব কারণ জানা উচিত।`,
	},

	{
		id: "py-29",
		category: "Python",
		difficulty: "Senior",
		tags: ["GIL", "Concurrency", "CPython", "Thread"],
		question: "GIL কী? কেন আছে এবং এর impact কী?",
		answer: `GIL-এর পূর্ণরূপ Global Interpreter Lock।

CPython-এর একটি process-এর মধ্যে একই সময়ে একটি thread Python bytecode execute করতে পারে।

GIL-এর মূল impact CPU-bound Python code-এর ক্ষেত্রে দেখা যায়।

CPU-bound:
- Complex calculation
- Image processing
- CPU-heavy algorithms

এক্ষেত্রে multiple threads দিয়ে linear CPU scaling পাওয়া কঠিন হতে পারে।

কিন্তু I/O-bound:
- Database
- HTTP
- File
- Network

কাজে thread এবং async খুব useful।

CPU-bound কাজের জন্য multiprocessing বা external worker ব্যবহার করা যেতে পারে।

Interview-এ গুরুত্বপূর্ণ distinction:

GIL মানে Python-এ concurrency নেই — এটি ভুল।

I/O concurrency সম্ভব।
CPU-bound parallelism-এর ক্ষেত্রে CPython GIL একটি limitation।`,
	},

	{
		id: "py-30",
		category: "Python",
		difficulty: "Senior",
		tags: ["Thread", "Process", "Async", "Concurrency"],
		question: "Thread vs Process vs Async কখন ব্যবহার করবেন?",
		answer: `Thread:
একই process-এর মধ্যে multiple threads চলে এবং memory share করে।

Best for:
- Blocking I/O
- Network I/O
- File I/O

Process:
প্রতিটি process-এর আলাদা memory space থাকে।

Best for:
- CPU-bound কাজ
- Multiple CPU cores ব্যবহার

Async:
Event loop ব্যবহার করে cooperative concurrency তৈরি করে।

Best for:
- High-concurrency I/O
- API calls
- Database I/O
- Network I/O

Simple decision:

CPU-bound
→ Multiprocessing / Worker

I/O-bound
→ AsyncIO

Blocking I/O
→ Threading বা compatible async wrapper

FastAPI application-এ asynchronous database এবং HTTP client ব্যবহার করলে async architecture-এর সুবিধা পাওয়া যায়।`,
	},

	{
		id: "py-31",
		category: "Python",
		difficulty: "Senior",
		tags: ["Coroutine", "AsyncIO", "Event Loop", "Await"],
		question: "Coroutine এবং Event Loop কীভাবে কাজ করে?",
		answer: `Coroutine হলো async function-এর execution object যা await-এর মাধ্যমে pause/resume হতে পারে।

Example:

async def fetch_user():
    response = await client.get("/users")
    return response

Event loop asynchronous task schedule এবং execute করে।

Concept:

Task A
↓
await network I/O
↓
Pause

Task B
↓
execute

Task C
↓
execute

Network response এলে:

Task A
↓
Resume

এটি thread তৈরি না করেও অনেক I/O-bound task efficiently handle করতে পারে।

তবে async code-এর মধ্যে blocking operation ঢুকিয়ে দিলে event loop block হতে পারে।`,
	},

	{
		id: "py-32",
		category: "Python",
		difficulty: "Senior",
		tags: ["Async", "Blocking", "Event Loop", "Performance"],
		question: "Async code-এর মধ্যে blocking operation দিলে কী সমস্যা হয়?",
		answer: `Async event loop cooperative concurrency ব্যবহার করে।

যদি async endpoint-এর মধ্যে blocking operation করা হয়:

async def endpoint():
    time.sleep(10)

তাহলে event loop 10 seconds block হতে পারে।

এই সময়ে একই event loop-এর অন্য task affected হবে।

Better:

await asyncio.sleep(10)

অথবা blocking কাজ হলে thread/process worker-এ offload করা যায়।

FastAPI performance-এর জন্য শুধু endpoint-কে async def করলেই হবে না। ভিতরের database client, HTTP client এবং অন্যান্য I/O operation-ও appropriate asynchronous হতে হবে।`,
	},

	// ============================================================
	// OOP / DESIGN / PYTHON ADVANCED
	// ============================================================

	{
		id: "py-33",
		category: "Python",
		difficulty: "Advanced",
		tags: ["Class Method", "Static Method", "Instance Method", "OOP"],
		question: "Instance method, classmethod এবং staticmethod-এর মধ্যে পার্থক্য কী?",
		answer: `Instance method প্রথম parameter হিসেবে self নেয় এবং object instance-এর data access করতে পারে।

Example:

class User:
    def get_name(self):
        ...

classmethod প্রথম parameter হিসেবে cls নেয় এবং class-level data/behavior নিয়ে কাজ করতে পারে।

@classmethod
def create(cls):
    return cls()

staticmethod self বা cls automatically নেয় না।

@staticmethod
def validate_email(email):
    ...

সাধারণ rule:

Instance method
→ object-specific behavior

classmethod
→ class-level behavior / alternative constructor

staticmethod
→ class-এর namespace-এর মধ্যে logically related utility function`,
	},

	{
		id: "py-34",
		category: "Python",
		difficulty: "Advanced",
		tags: ["Dataclass", "Pydantic", "Data Model"],
		question: "Dataclass এবং Pydantic model-এর মধ্যে পার্থক্য কী?",
		answer: `Dataclass Python-এর standard library-এর data container।

Example:

@dataclass
class User:
    id: int
    name: str

Pydantic model data validation এবং serialization-এর জন্য বিশেষভাবে শক্তিশালী।

Pydantic:

class User(BaseModel):
    id: int
    name: str

FastAPI request/response schema-এর জন্য Pydantic বেশি suitable।

Dataclass:
→ Internal domain/data object-এর জন্য useful

Pydantic:
→ External input/output validation
→ API schema
→ Serialization
→ Parsing

কোনটি ব্যবহার করবেন তা use case-এর উপর নির্ভর করবে।`,
	},

	{
		id: "py-35",
		category: "Python",
		difficulty: "Senior",
		tags: ["SOLID", "OOP", "Clean Code", "Architecture"],
		question: "SOLID principles কী এবং Python project-এ কেন গুরুত্বপূর্ণ?",
		answer: `SOLID হলো পাঁচটি software design principle।

S — Single Responsibility:
একটি class/module-এর একটি primary responsibility।

O — Open/Closed:
Extension-এর জন্য open, modification-এর জন্য closed।

L — Liskov Substitution:
Child class parent-এর contract ভাঙবে না।

I — Interface Segregation:
বড় interface-এর বদলে ছোট focused abstraction।

D — Dependency Inversion:
High-level business logic concrete implementation-এর উপর নয়, abstraction-এর উপর depend করবে।

Python project-এ SOLID ব্যবহার করলে:
- Coupling কমে
- Testing সহজ হয়
- Mock করা সহজ হয়
- Business logic আলাদা থাকে
- Future change সহজ হয়

তবে principle-এর জন্য অতিরিক্ত abstraction তৈরি করাও উচিত নয়। Simple code যেখানে যথেষ্ট, সেখানে unnecessary architecture avoid করা উচিত।`,
	},

	// ============================================================
	// PACKAGES / MODULES / ENVIRONMENT
	// ============================================================

	{
		id: "py-36",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Module", "Package", "Import", "Project Structure"],
		question: "Python module এবং package কী?",
		answer: `Module হলো একটি Python file যা সাধারণত .py extension ব্যবহার করে।

Example:

user.py

Package হলো related Python modules-এর organized collection।

Example:

app/
    users/
        service.py
        repository.py
        schemas.py

Import:

from users.service import UserService

Large application-এ modules এবং packages code organization এবং separation of concerns-এর জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-37",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Virtual Environment", "venv", "Dependency"],
		question: "Virtual environment কেন ব্যবহার করবেন?",
		answer: `প্রতিটি project-এর dependency আলাদা রাখার জন্য virtual environment ব্যবহার করা হয়।

ধরা যাক:

Project A
→ Django 4

Project B
→ Django 5

Global Python environment-এ conflict হতে পারে।

Virtual environment:

Project A
→ .venv-A

Project B
→ .venv-B

তাই প্রতিটি project নিজের dependency version maintain করতে পারে।

Common approach:

python -m venv .venv

তারপর environment activate করে dependencies install করা হয়।`,
	},

	{
		id: "py-38",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["pip", "requirements", "Dependency Management"],
		question: "pip এবং dependency management কী?",
		answer: `pip হলো Python package installer।

Example:

pip install fastapi

Project dependencies সাধারণত version-controlled রাখা হয়।

একটি common approach:

requirements.txt

fastapi==...
sqlalchemy==...
pydantic==...

Production application-এ dependency version pin বা appropriately constrain করা গুরুত্বপূর্ণ, যাতে environment reproducible হয়।

Modern Python project-এ pyproject.toml এবং tools যেমন Poetry বা uv-ও dependency এবং project management-এর জন্য ব্যবহার করা যায়।`,
	},

	// ============================================================
	// TYPE SYSTEM / MODERN PYTHON
	// ============================================================

	{
		id: "py-39",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Type Hints", "Typing", "Static Type Checking"],
		question: "Python type hints কী এবং কেন ব্যবহার করা হয়?",
		answer: `Type hints variable, parameter এবং return value-এর expected type প্রকাশ করে।

Example:

def add(a: int, b: int) -> int:
    return a + b

Type hints-এর সুবিধা:
- IDE autocomplete
- Static analysis
- Better documentation
- Refactoring
- Code readability
- FastAPI schema generation

Python dynamically typed হওয়ায় type hint সবসময় runtime type enforcement করে না।

Static type checker যেমন mypy বা pyright code-এর type-related সমস্যা detect করতে পারে।`,
	},

	{
		id: "py-40",
		category: "Python",
		difficulty: "Advanced",
		tags: ["TypeVar", "Generic", "Typing", "Type Safety"],
		question: "Generic এবং TypeVar কী?",
		answer: `Generic programming একই logic বিভিন্ন type-এর জন্য reusable করতে সাহায্য করে।

TypeVar একটি generic type variable।

Concept:

T = TypeVar("T")

def first(items: list[T]) -> T:
    return items[0]

এখানে function integer list দিলে integer return type এবং string list দিলে string return type represent করতে পারে।

Generics বড় codebase-এ reusable repository, service এবং utility abstraction তৈরি করতে useful।`,
	},

	// ============================================================
	// FILE / SERIALIZATION / DATA
	// ============================================================

	{
		id: "py-41",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["File", "IO", "Context Manager"],
		question: "Python-এ file handling কীভাবে করবেন?",
		answer: `Python-এ open() ব্যবহার করে file access করা যায়।

Example:

with open("data.txt", "r") as file:
    data = file.read()

Common modes:

r → read
w → write
a → append
b → binary
x → create

with ব্যবহার করলে file automatically close হয়।

Large file-এর ক্ষেত্রে পুরো file read না করে line-by-line বা generator-based processing করলে memory usage কমানো যায়।`,
	},

	{
		id: "py-42",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["JSON", "Serialization", "Deserialization", "API"],
		question: "JSON serialization এবং deserialization কী?",
		answer: `Python object থেকে JSON-compatible representation তৈরি করাকে serialization বলা হয়।

JSON থেকে Python object তৈরি করাকে deserialization বলা হয়।

Example:

import json

data = {
    "name": "Nazmul",
    "age": 30
}

json_data = json.dumps(data)

Python object
↓
JSON string

আবার:

data = json.loads(json_data)

JSON string
↓
Python object

API development-এ JSON serialization/deserialization খুব গুরুত্বপূর্ণ।`,
	},

	// ============================================================
	// PERFORMANCE / DATA STRUCTURES
	// ============================================================

	{
		id: "py-43",
		category: "Python",
		difficulty: "Senior",
		tags: ["Performance", "Big O", "Data Structures"],
		question: "Python code performance কীভাবে analyze করবেন?",
		answer: `Performance optimize করার আগে bottleneck identify করা উচিত।

প্রথমে measure করতে হবে:

1. CPU usage
2. Memory usage
3. Database latency
4. Network latency
5. Function execution time
6. Number of queries

Big-O complexity বোঝাও গুরুত্বপূর্ণ।

উদাহরণ:

List membership:
x in list
→ সাধারণত O(n)

Set membership:
x in set
→ average O(1)

Dictionary lookup:
dict[key]
→ average O(1)

Performance optimization-এর আগে profiling করা উচিত। Blind optimization avoid করা ভালো।`,
	},

	{
		id: "py-44",
		category: "Python",
		difficulty: "Senior",
		tags: ["Profiling", "Performance", "cProfile", "Optimization"],
		question: "Python application profile কীভাবে করবেন?",
		answer: `Performance bottleneck identify করার জন্য profiling করা হয়।

Common tools:

cProfile
→ Function-level profiling

timeit
→ ছোট code-এর execution time compare

tracemalloc
→ Memory allocation analysis

Application-level metrics:
- Request latency
- Throughput
- CPU
- Memory
- Database query time

Production system-এ observability এবং profiling data ব্যবহার করে bottleneck identify করে তারপর optimization করা উচিত।`,
	},

	// ============================================================
	// TESTING
	// ============================================================

	{
		id: "py-45",
		category: "Python",
		difficulty: "Intermediate",
		tags: ["Testing", "Pytest", "Unit Test"],
		question: "Python testing কী? Unit test কী?",
		answer: `Testing application-এর behavior expected অনুযায়ী কাজ করছে কিনা verify করার process।

Unit test একটি ছোট unit যেমন function বা class-এর behavior test করে।

Example:

def add(a, b):
    return a + b

Test:

def test_add():
    assert add(2, 3) == 5

Python ecosystem-এ pytest খুব জনপ্রিয়।

Testing-এর স্তর:

Unit Test
↓
Integration Test
↓
API Test
↓
E2E Test

Unit test fast এবং isolated হওয়া উচিত।`,
	},

	{
		id: "py-46",
		category: "Python",
		difficulty: "Senior",
		tags: ["Mock", "Mocking", "Unit Test", "Testing"],
		question: "Mocking কী এবং কেন ব্যবহার করবেন?",
		answer: `কোনো external dependency-এর real implementation-এর বদলে test-এর সময় fake বা controlled implementation ব্যবহার করাকে mocking বলা হয়।

Example:

Service
↓
Payment API

Unit test-এ real payment API call করা উচিত নয়।

তাই:

Service
↓
Mock Payment Client

ব্যবহার করা যায়।

Mocking useful:
- External API
- Database
- Message broker
- File system
- Time-dependent code

তবে excessive mocking করলে test বাস্তব behavior থেকে দূরে চলে যেতে পারে।`,
	},

	// ============================================================
	// CLEAN CODE / ARCHITECTURE
	// ============================================================

	{
		id: "py-47",
		category: "Python",
		difficulty: "Senior",
		tags: ["Clean Code", "Separation of Concerns", "Architecture"],
		question: "Python application-এ clean architecture কীভাবে maintain করবেন?",
		answer: `Large Python application-এ business logic এবং infrastructure আলাদা রাখা ভালো।

একটি possible structure:

app/
    api/
    services/
    repositories/
    models/
    schemas/
    domain/
    infrastructure/
    config/

Flow:

API
↓
Service
↓
Repository
↓
Database

API layer:
HTTP-related কাজ

Service:
Business logic

Repository:
Data access

Domain:
Core business rules

Infrastructure:
Database, Redis, external services ইত্যাদি

এতে business logic framework বা database implementation-এর সাথে অতিরিক্ত tightly coupled হয় না।`,
	},

	{
		id: "py-48",
		category: "Python",
		difficulty: "Senior",
		tags: ["Dependency Inversion", "Repository Pattern", "Clean Architecture"],
		question: "Repository Pattern কী এবং Python-এ কেন ব্যবহার করবেন?",
		answer: `Repository Pattern database access এবং business logic আলাদা করে।

Without repository:

Service
↓
SQL Query
↓
Database

Repository pattern:

Service
↓
UserRepository
↓
Database

Service database query details না জেনেও কাজ করতে পারে।

Advantages:
- Separation of concerns
- Testability
- Database abstraction
- Maintainability

তবে খুব ছোট application-এ unnecessary repository abstraction তৈরি করলে complexity বাড়তে পারে।`,
	},

	// ============================================================
	// COMMON INTERVIEW TRAPS
	// ============================================================

	{
		id: "py-49",
		category: "Python",
		difficulty: "Advanced",
		tags: ["LEGB", "Scope", "Variable", "Namespace"],
		question: "Python LEGB rule কী?",
		answer: `Python variable lookup-এর ক্ষেত্রে LEGB rule অনুসরণ করে।

L = Local
E = Enclosing
G = Global
B = Built-in

Example:

x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()

Python প্রথমে Local scope-এ খুঁজবে।
না পেলে Enclosing।
না পেলে Global।
না পেলে Built-in।

global এবং nonlocal keyword দিয়ে specific scope-এর variable modify করা যায়।`,
	},

	{
		id: "py-50",
		category: "Python",
		difficulty: "Advanced",
		tags: ["Closure", "Decorator", "Function", "Scope"],
		question: "Closure কী?",
		answer: `Closure হলো এমন function যা নিজের বাইরের enclosing scope-এর variable মনে রাখতে পারে, এমনকি outer function execution শেষ হওয়ার পরেও।

Example:

def multiplier(x):

    def multiply(y):
        return x * y

    return multiply

double = multiplier(2)

double(5)
→ 10

এখানে multiply function x-এর value মনে রাখে।

Closure decorator, factory function এবং functional programming-এর ক্ষেত্রে useful।`,
	},

	{
		id: "py-51",
		category: "Python",
		difficulty: "Advanced",
		tags: ["Decorator", "Closure", "Function"],
		question: "Decorator এবং Closure-এর মধ্যে সম্পর্ক কী?",
		answer: `Decorator সাধারণত closure-এর concept ব্যবহার করে।

Decorator একটি function গ্রহণ করে এবং একটি নতুন wrapper function return করে।

Wrapper function বাইরের function-এর reference মনে রাখতে পারে।

Concept:

Decorator
↓
Outer function
↓
Wrapper function
↓
Original function reference

তাই decorator implement করার সময় closure এবং first-class function-এর ধারণা গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-52",
		category: "Python",
		difficulty: "Advanced",
		tags: ["First Class Function", "Higher Order Function", "Functional Programming"],
		question: "Python-এ First-Class Function কী?",
		answer: `Python-এ function একটি object হিসেবে treat করা যায়।

Function:
- Variable-এ assign করা যায়
- অন্য function-এ argument হিসেবে পাঠানো যায়
- Function থেকে return করা যায়
- Collection-এ রাখা যায়

Example:

def greet():
    return "Hello"

func = greet

print(func())

এটি decorator, callback, functional programming এবং event-driven code বোঝার জন্য গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-53",
		category: "Python",
		difficulty: "Senior",
		tags: ["Concurrency", "Race Condition", "Thread Safety", "Lock"],
		question: "Race condition কী? Python-এ কীভাবে prevent করবেন?",
		answer: `যখন একাধিক thread/process একই shared resource একই সময়ে access বা modify করে এবং execution order-এর কারণে unexpected result তৈরি হয়, তখন race condition হয়।

Example:

Thread A → read balance
Thread B → read balance
Thread A → update
Thread B → update

ফলে expected result নাও পাওয়া যেতে পারে।

Solutions:
- Lock
- RLock
- Queue
- Atomic operation
- Database transaction
- Proper synchronization

Database application-এ শুধু Python lock যথেষ্ট নয়; distributed environment হলে database-level locking, transaction বা distributed coordination প্রয়োজন হতে পারে।`,
	},

	{
		id: "py-54",
		category: "Python",
		difficulty: "Senior",
		tags: ["Thread Safety", "Lock", "Concurrency", "Synchronization"],
		question: "Lock কী? Lock এবং RLock-এর মধ্যে পার্থক্য কী?",
		answer: `Lock shared resource-এর concurrent access synchronize করতে ব্যবহার করা হয়।

Example:

lock.acquire()

try:
    shared_resource_update()
finally:
    lock.release()

RLock হলো re-entrant lock। একই thread একাধিকবার একই RLock acquire করতে পারে এবং appropriate সংখ্যক release করতে হয়।

সাধারণ Lock recursive বা nested acquisition-এর ক্ষেত্রে deadlock তৈরি করতে পারে।

Thread synchronization-এর সময় lock ব্যবহার করলেও lock contention এবং deadlock-এর possibility consider করতে হয়।`,
	},

	{
		id: "py-55",
		category: "Python",
		difficulty: "Senior",
		tags: ["Deadlock", "Concurrency", "Thread"],
		question: "Deadlock কী এবং কীভাবে prevent করবেন?",
		answer: `Deadlock হলো এমন অবস্থা যেখানে দুই বা তার বেশি thread/process একে অপরের resource release করার জন্য অপেক্ষা করতে থাকে।

Example:

Thread A
→ Lock 1 ধরে
→ Lock 2 চায়

Thread B
→ Lock 2 ধরে
→ Lock 1 চায়

দুইজনই অপেক্ষা করবে।

Prevention:
1. Consistent lock ordering
2. Lock timeout
3. Lock scope ছোট রাখা
4. Nested lock কমানো
5. Proper resource ownership

Database transaction-এর ক্ষেত্রেও deadlock হতে পারে, তাই transaction ordering এবং appropriate locking strategy গুরুত্বপূর্ণ।`,
	},

	{
		id: "py-56",
		category: "Python",
		difficulty: "Senior",
		tags: ["Multiprocessing", "IPC", "CPU Bound", "Parallelism"],
		question: "Multiprocessing কী এবং কখন ব্যবহার করবেন?",
		answer: `Multiprocessing একাধিক OS process ব্যবহার করে কাজ execute করে।

প্রতিটি process-এর আলাদা memory space থাকে।

CPU-bound workload-এর ক্ষেত্রে এটি useful কারণ আলাদা process আলাদা CPU core ব্যবহার করতে পারে।

Examples:
- Image processing
- Large calculations
- CPU-heavy data processing

Architecture:

Main Process
├── Worker Process 1
├── Worker Process 2
└── Worker Process 3

Process-এর মধ্যে data share করা thread-এর মতো simple নয়। IPC, Queue, Pipe বা shared memory mechanism প্রয়োজন হতে পারে।

Web request-এর heavy CPU processing-এর জন্য external worker system যেমন Celery/RQ অথবা dedicated service ব্যবহার করাও ভালো architecture হতে পারে।`,
	},

	{
		id: "py-57",
		category: "Python",
		difficulty: "Senior",
		tags: ["AsyncIO", "Task", "Gather", "Concurrency"],
		question: "asyncio.gather কী?",
		answer: `asyncio.gather একাধিক coroutine concurrently execute করে এবং তাদের result collect করতে পারে।

Concept:

Task A ──┐
Task B ──┼── Event Loop
Task C ──┘

সবগুলো I/O-bound independent কাজ হলে একটির পর একটি অপেক্ষা করার পরিবর্তে concurrent execution করা যায়।

Example:

results = await asyncio.gather(
    fetch_user(),
    fetch_orders(),
    fetch_notifications()
)

এটি useful যখন operations একে অপরের উপর depend করে না।

তবে একই database connection বা non-thread-safe resource concurrentভাবে ব্যবহার করার আগে resource-এর concurrency support নিশ্চিত করতে হবে।`,
	},

	{
		id: "py-58",
		category: "Python",
		difficulty: "Senior",
		tags: ["AsyncIO", "Timeout", "Cancellation", "Resilience"],
		question: "Async operation-এ timeout এবং cancellation কেন গুরুত্বপূর্ণ?",
		answer: `External service বা database indefinitely response না দিলে application resource আটকে যেতে পারে।

তাই async operation-এ timeout রাখা উচিত।

Concept:

Request
↓
External API
↓
Timeout
↓
Cancel operation
↓
Fallback / Retry / Error

Timeout-এর সুবিধা:
- Worker আটকে থাকা কমায়
- Connection resource release হয়
- Cascading failure কমাতে সাহায্য করে

Distributed application-এ timeout খুব গুরুত্বপূর্ণ resilience mechanism। শুধু retry রাখলে হবে না; retry-এর সাথে timeout এবং retry limit থাকা উচিত।`,
	},

	{
		id: "py-59",
		category: "Python",
		difficulty: "Senior",
		tags: ["Logging", "Observability", "Production"],
		question: "Python production application-এ logging কীভাবে করবেন?",
		answer: `Production application-এ print() ব্যবহার না করে Python logging framework ব্যবহার করা উচিত।

Important levels:

DEBUG
INFO
WARNING
ERROR
CRITICAL

Production log-এ সাধারণত:
- Timestamp
- Log level
- Service name
- Request ID
- Trace ID
- User/request context
- Error information

রাখা যায়।

Microservice architecture-এ centralized logging এবং structured JSON logs ব্যবহার করলে log search এবং correlation সহজ হয়।

Sensitive data যেমন password, access token বা secret log করা উচিত নয়।`,
	},

	{
		id: "py-60",
		category: "Python",
		difficulty: "Senior",
		tags: ["Senior", "Architecture", "Performance", "Security", "Testing"],
		question:
			"একজন Senior Python Developer হিসেবে production Python application design করার সময় কোন বিষয়গুলো consider করবেন?",
		answer: `আমি শুধু code কাজ করছে কিনা তা দেখব না; পুরো production lifecycle consider করব।

1. Code quality
   → Clean code
   → SOLID যেখানে প্রয়োজন
   → Separation of concerns

2. Performance
   → Algorithm complexity
   → Database queries
   → Caching
   → Async I/O
   → Profiling

3. Concurrency
   → Async
   → Thread
   → Process
   → Race condition
   → Deadlock

4. Database
   → Connection pooling
   → Transaction
   → Index
   → Query optimization

5. Security
   → Input validation
   → Authentication
   → Authorization
   → Secret management
   → Secure dependency management

6. Reliability
   → Timeout
   → Retry
   → Idempotency
   → Error handling

7. Testing
   → Unit
   → Integration
   → API
   → E2E

8. Observability
   → Logs
   → Metrics
   → Tracing

9. Deployment
   → Docker
   → CI/CD
   → Environment configuration
   → Health checks

10. Maintainability
   → Type hints
   → Documentation
   → Consistent project structure
   → Code review

Senior developer হিসেবে আমার লক্ষ্য শুধু feature implement করা নয়; system-কে maintainable, testable, observable, secure এবং scalable রাখা।`,
	},
];
