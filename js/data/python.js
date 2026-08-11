const pythonQuestions = [
  {
    id: "py-1",
    category: "Python",
    difficulty: "Advanced",
    tags: ["CPython", "PVM", "Bytecode", "GIL", "Memory Management", "Python Internals & Execution"],
    question: "How does CPython execute Python code under the hood, and how do Frame Objects and the Evaluation Loop work?",
    answer: `
      <p>CPython is the reference implementation of Python written in C. It uses a <strong>stack-based virtual machine</strong> to execute bytecode. Understanding how CPython evaluates code at the C level reveals how scope, execution overhead, and stack limits operate.</p>

      <h4>1. Compilation to Bytecode</h4>
      <p>When you run <code>python script.py</code>, CPython converts the source code into an Abstract Syntax Tree (AST) and compiles it into <strong>Bytecode</strong>—a sequence of 16-bit instructions (opcodes and arguments). Bytecode is cached inside <code>.pyc</code> files inside the <code>__pycache__</code> directory.</p>

      <h4>2. Frame Objects (PyFrameObject)</h4>
      <p>Every function call in CPython creates a <code>PyFrameObject</code> on the C stack. A Frame Object acts as an execution context containing:</p>
      <ul>
        <li><code>f_code</code>: The compiled code object (containing raw bytecode instructions).</li>
        <li><code>f_globals</code>: Reference to the global namespace dictionary.</li>
        <li><code>f_locals</code>: Reference to local variables (stored as an array for fast indexed lookup).</li>
        <li><code>f_valuestack</code>: The evaluation stack where operands and intermediate results are pushed and popped.</li>
        <li><code>f_back</code>: A pointer to the calling parent frame (forming the call stack trace).</li>
      </ul>

      <h4>3. The PVM Evaluation Loop</h4>
      <p>The core of CPython is its main evaluation loop (found in <code>Python/ceval.c</code>). It fetches bytecodes sequentially and executes corresponding C operations using a giant switch-case/computed-goto construct.</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>import dis

def add(a, b):
    return a + b

# Inspecting raw CPython bytecode instructions
dis.dis(add)

/* Output:
  2           0 RESUME                   0
              2 LOAD_FAST                0 (a)   # Push local 'a' to evaluation stack
              4 LOAD_FAST                1 (b)   # Push local 'b' to evaluation stack
              6 BINARY_OP                0 (+)   # Pop both, add via C-API, push result
             10 RETURN_VALUE                     # Pop result and return to calling frame
*/</code></pre>
      </div>
    `
  },
  {
    id: "py-2",
    category: "Python",
    difficulty: "Advanced",
    tags: ["Reference Counting", "Cyclic GC", "PyMalloc", "Memory Leaks", "Memory Management & Garbage Collection"],
    question: "How does Python manage memory via Reference Counting and the Generational Cyclical Garbage Collector?",
    answer: `
      <p>Python utilizes a dual-layer memory management strategy: primary instantaneous cleanup via <strong>Reference Counting</strong> and secondary cleanup of reference cycles via a <strong>Generational Garbage Collector (GC)</strong>.</p>

      <h4>1. Primary Layer: Reference Counting</h4>
      <p>Every object in CPython contains a header field called <code>ob_refcnt</code> (defined in <code>PyObject</code>). CPython automatically increments or decrements this counter:</p>
      <ul>
        <li><strong>Incremented:</strong> When assigned to a variable, passed to a function, or stored in a list/dict.</li>
        <li><strong>Decremented:</strong> When a variable goes out of scope, is explicitly deleted (<code>del</code>), or overwritten.</li>
      </ul>
      <p>When <code>ob_refcnt == 0</code>, CPython immediately deallocates the object's memory without waiting for a GC pause.</p>

      <h4>2. Secondary Layer: Generational Garbage Collection</h4>
      <p>Reference counting fails when objects hold <strong>circular references</strong> (e.g., Object A references Object B, and Object B references Object A). Even if all external variables are deleted, their <code>ob_refcnt</code> stays at 1, leaking memory.</p>

      <p>To fix this, CPython tracks container objects (tuples, lists, dicts, custom objects) across three generations:</p>
      <ul>
        <li><strong>Generation 0 (Gen 0):</strong> Newly created objects. Collected frequently using a fast reference graph traversal algorithm that identifies unreachable circular groups.</li>
        <li><strong>Generation 1 (Gen 1):</strong> Objects that survive a Gen 0 collection sweep.</li>
        <li><strong>Generation 2 (Gen 2):</strong> Long-lived objects that survive Gen 1 collection sweeps. Collected least frequently.</li>
      </ul>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>import gc

# Inspecting GC thresholds (Gen0, Gen1, Gen2 allocation triggers)
print(gc.get_threshold()) # Default: (700, 10, 10)

# Manually forcing a full Generation 2 collection sweep
unreachable_objects = gc.collect()
print(f"Cleaned {unreachable_objects} circular reference objects.")</code></pre>
      </div>

      <h4>3. PyMalloc (Custom Small Object Allocator)</h4>
      <p>To avoid frequent operating system <code>malloc()</code>/<code>free()</code> overhead for tiny objects ($\le 512$ bytes), CPython uses <strong>PyMalloc</strong>. It allocates memory in 256KB Arenas divided into 4KB Pools consisting of uniform Size Classes (e.g., 16-byte blocks, 32-byte blocks), drastically reducing fragmentation.</p>
    `
  },
  {
    id: "py-3",
    category: "Python",
    difficulty: "Advanced",
    tags: ["GIL", "Multithreading", "Multiprocessing", "Subinterpreters", "Concurrency & Engine Mechanics"],
    question: "What is the Global Interpreter Lock (GIL), why does it limit multithreading, and how do you achieve true parallelism in Python?",
    answer: `
      <p>The <strong>Global Interpreter Lock (GIL)</strong> is a mutual exclusion lock (mutex) used by CPython to prevent multiple native OS threads from executing Python bytecodes simultaneously on multi-core processors.</p>

      <h4>1. Why the GIL Exists</h4>
      <p>CPython's reference counting memory management is <strong>not thread-safe</strong>. Without the GIL, concurrent threads modifying object reference counts (<code>ob_refcnt</code>) simultaneously would cause race conditions, memory leaks, or premature object deallocations (dangling pointers). The GIL makes CPython C-extensions simple to write and fast for single-threaded programs.</p>

      <h4>2. Impact on I/O-Bound vs CPU-Bound Tasks</h4>
      <ul>
        <li><strong>I/O-Bound Tasks (Disk, Network, DB):</strong> Multithreading via <code>threading</code> works effectively because CPython explicitly releases the GIL during blocking I/O calls, allowing other threads to run while one waits for network/disk responses.</li>
        <li><strong>CPU-Bound Tasks (Math, Data Processing, ML):</strong> Multithreading fails to utilize multiple CPU cores because threads fight for the GIL. Only one thread can execute Python bytecode at any given millisecond.</li>
      </ul>

      <h4>3. Strategies to Achieve True Parallelism</h4>

      <h5>Strategy A: Multiprocessing (Separate Memory Spaces)</h5>
      <p>The <code>multiprocessing</code> module spawns separate OS processes, each with its own independent Python interpreter instance, V8/PVM state, and GIL.</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>from concurrent.futures import ProcessPoolExecutor
import math

def cpu_heavy_computation(n):
    return sum(math.factorial(i) for i in range(n))

if __name__ == "__main__":
    # Spawns process pool matching available physical CPU cores
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(cpu_heavy_computation, [5000, 5000, 5000, 5000]))</code></pre>
      </div>

      <h5>Strategy B: Offloading Computation to C/Rust Extensions</h5>
      <p>Libraries like <code>NumPy</code>, <code>Pandas</code>, and <code>Polars</code> release the GIL during heavy vector calculations compiled in C/C++/Rust.</p>

      <h5>Strategy C: Free-Threaded Python (PEP 703)</h5>
      <p>Modern Python versions support a free-threaded build option (<code>python3.13t</code>) that removes the GIL entirely by replacing simple reference counting with atomic reference counts and biased locking.</p>
    `
  },
  {
    id: "py-4",
    category: "Python",
    difficulty: "Advanced",
    tags: ["MRO", "C3 Linearization", "Inheritance", "super()", "Object-Oriented Programming Internals"],
    question: "How does Python resolve Method Resolution Order (MRO) using the C3 Linearization Algorithm in multiple inheritance?",
    answer: `
      <p>When dealing with multiple inheritance, Python must deterministically decide which parent class method to invoke. Python solves the "Diamond Problem" using the <strong>C3 Linearization Algorithm</strong> to compute an immutable <strong>Method Resolution Order (MRO)</strong> for every class.</p>

      <h4>1. The Diamond Problem Scenario</h4>
      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>class A:
    def process(self): print("A")

class B(A):
    def process(self): print("B")

class C(A):
    def process(self): print("C")

class D(B, C):
    pass

d = D()
d.process() # Which process() runs? Output: "B"</code></pre>
      </div>

      <h4>2. Rules of C3 Linearization</h4>
      <p>The C3 Linearization algorithm guarantees three properties:</p>
      <ol>
        <li><strong>Subclass Precedence:</strong> Subclasses appear before their parent classes.</li>
        <li><strong>Parent Precedence:</strong> Parent classes listed in class definition order <code>class D(B, C)</code> preserve that relative order (<code>B</code> before <code>C</code>).</li>
        <li><strong>Monotonicity:</strong> A class always appears before its ancestors across the entire inheritance tree without breaking order consistency.</li>
      </ol>

      <h4>3. Inspecting Class MRO</h4>
      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code># Inspecting the computed MRO tuple
print(D.__mro__)
# Output: (<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)</code></pre>
      </div>

      <h4>4. How super() Works Under the Hood</h4>
      <p>Contrary to common belief, <code>super()</code> does <strong>not</strong> simply call the immediate parent class. It looks up the <strong>next class in the MRO chain</strong> of the instance calling it. This ensures that in cooperative multiple inheritance, every class method in the tree executes exactly once.</p>
    `
  },
  {
    id: "py-5",
    category: "Python",
    difficulty: "Advanced",
    tags: ["Metaclasses", "type", "__new__", "__init__", "Metaprogramming", "Metaprogramming & Types"],
    question: "What are Metaclasses in Python, how does type act as a default metaclass, and how do you implement a custom Metaclass?",
    answer: `
      <p>In Python, <em>everything is an object</em>—including class definitions themselves. Just as an object is an instance of a class, a class is an instance of a <strong>Metaclass</strong>. By default, all classes in Python are instances of the built-in metaclass <code>type</code>.</p>

      <h4>1. The Object-Class-Metaclass Hierarchy</h4>
      <ul>
        <li>Instance <code>obj</code> is created by Class <code>MyClass</code>.</li>
        <li>Class <code>MyClass</code> is created by Metaclass <code>type</code>.</li>
        <li>Metaclass <code>type</code> inherits from <code>object</code> and is an instance of itself.</li>
      </ul>

      <h4>2. Class Creation Lifecycle: __new__ vs __init__</h4>
      <p>When Python encounters a <code>class</code> definition block:</p>
      <ol>
        <li>It collects class attributes, methods, and variables into a namespace dictionary.</li>
        <li>It calls the metaclass's <code>__new__(mcs, name, bases, dct)</code> to allocate and create the actual class object in memory.</li>
        <li>It calls <code>__init__(cls, name, bases, dct)</code> to initialize the class object after creation.</li>
      </ol>

      <h4>3. Implementing a Custom Enforcement Metaclass</h4>
      <p>Metaclasses allow framework developers to intercept, modify, validate, or register classes at import time before any instance is instantiated.</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>class InterfaceEnforcer(type):
    def __new__(mcs, name, bases, dct):
        # Enforce that all subclasses MUST define an 'execute' method
        if "execute" not in dct and not any(hasattr(b, "execute") for b in bases):
            raise TypeError(f"Class '{name}' must implement an 'execute()' method!")
        return super().__new__(mcs, name, bases, dct)

# Applying the metaclass
class BaseTask(metaclass=InterfaceEnforcer):
    def execute(self):
        pass

# This class will raise a TypeError at import/parse time!
class InvalidTask(BaseTask):
    # Missing execute() definition!
    pass</code></pre>
      </div>
    `
  },
  {
    id: "py-6",
    category: "Python",
    difficulty: "Advanced",
    tags: ["Descriptors", "__get__", "__set__", "Attribute Lookup", "Advanced Protocols & Descriptors"],
    question: "How does Python's Descriptor Protocol work, and how does it power @property, @classmethod, and @staticmethod?",
    answer: `
      <p>The <strong>Descriptor Protocol</strong> is the foundational mechanism underlying attribute access in Python. Any object that defines at least one of <code>__get__()</code>, <code>__set__()</code>, or <code>__delete__()</code> is a <strong>Descriptor</strong>.</p>

      <h4>1. Attribute Lookup Order</h4>
      <p>When you evaluate <code>obj.attr</code>, Python follows a strict lookup hierarchy:</p>
      <ol>
        <li>If <code>attr</code> is a <strong>Data Descriptor</strong> (defines both <code>__get__</code> and <code>__set__</code>) on the class, Python calls its <code>__get__</code> method.</li>
        <li>Else, look in the instance dictionary <code>obj.__dict__['attr']</code>.</li>
        <li>Else, if <code>attr</code> is a <strong>Non-Data Descriptor</strong> (defines only <code>__get__</code>), call its <code>__get__</code> method.</li>
        <li>Else, look in the class dictionary <code>Class.__dict__['attr']</code>.</li>
        <li>Else, traverse the MRO chain.</li>
        <li>Else, invoke <code>__getattr__()</code> if defined, or raise <code>AttributeError</code>.</li>
      </ol>

      <h4>2. Custom Implementation of @property</h4>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>class CustomProperty:
    def __init__(self, fget=None, fset=None):
        self.fget = fget
        self.fset = fset

    def __get__(self, instance, owner):
        if instance is None:
            return self
        if self.fget is None:
            raise AttributeError("Unreadable attribute")
        return self.fget(instance)

    def __set__(self, instance, value):
        if self.fset is None:
            raise AttributeError("Can't set attribute")
        self.fset(instance, value)

    def setter(self, fset):
        self.fset = fset
        return self

class BankAccount:
    def __init__(self, balance):
        self._balance = balance

    @CustomProperty
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative!")
        self._balance = value</code></pre>
      </div>

      <h4>3. How Functions Turn into Bound Methods</h4>
      <p>In Python, functions are non-data descriptors. When accessed via an instance <code>obj.method()</code>, the function's <code>__get__()</code> method automatically binds the instance as the first argument (<code>self</code>), returning a <strong>Bound Method</strong> object.</p>
    `
  },
  {
    id: "py-7",
    category: "Python",
    difficulty: "Advanced",
    tags: ["asyncio", "Event Loop", "Coroutines", "Tasks", "Futures", "Asynchronous Programming & Event Loop"],
    question: "How does Python's asyncio Event Loop work under the hood, and how do Coroutines suspend and resume execution?",
    answer: `
      <p>Python's <code>asyncio</code> provides single-threaded concurrency using asynchronous I/O primitives, coroutines, and a event loop.</p>

      <h4>1. Generators to Coroutines Evolution</h4>
      <p>Historically, Python used generators (<code>yield</code>) to suspend function execution. Modern <code>async def</code> functions are <strong>Coroutines</strong>. When CPython encounters an <code>await</code> expression, it yields execution control back to the <code>asyncio</code> Event Loop, allowing other tasks to run while awaiting I/O.</p>

      <h4>2. Core asyncio Components</h4>
      <ul>
        <li><strong>Event Loop:</strong> A single-threaded infinite loop that uses OS multiplexing system calls (<code>select</code>, <code>epoll</code> on Linux, <code>kqueue</code> on macOS) to monitor file descriptors and network sockets for readiness.</li>
        <li><strong>Future:</strong> A low-level object representing an eventual result of an asynchronous operation.</li>
        <li><strong>Task:</strong> A subclass of <code>Future</code> that wraps a Coroutine and manages its execution state inside the Event Loop.</li>
      </ul>

      <h4>3. Async Lifecycle Example</h4>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>import asyncio

async def fetch_api_data(endpoint, delay):
    print(f"Fetching from {endpoint}...")
    # Yields control back to the Event Loop for 'delay' seconds
    await asyncio.sleep(delay) 
    print(f"Received data from {endpoint}!")
    return { "endpoint": endpoint, "status": 200 }

async def main():
    # Wrap coroutines into concurrent Tasks
    task1 = asyncio.create_task(fetch_api_data("Users", 2))
    task2 = asyncio.create_task(fetch_api_data("Orders", 1))

    # Concurrently await both tasks
    results = await asyncio.gather(task1, task2)
    print("All requests complete:", results)

# Bootstrap the event loop
asyncio.run(main())</code></pre>
      </div>

      <h4>4. Crucial Production Pitfall: Blocking the Event Loop</h4>
      <p>If you execute a heavy synchronous computation (e.g., a massive <code>for</code> loop) or a blocking socket call (e.g., standard <code>requests.get()</code>) inside an <code>async def</code> function, it blocks the single-threaded Event Loop entirely. Use <code>asyncio.to_thread()</code> to offload synchronous work to an underlying thread pool.</p>
    `
  },
  {
    id: "py-8",
    category: "Python",
    difficulty: "Intermediate",
    tags: ["__slots__", "Memory Optimization", "Dict Overhead", "Data Structures", "Memory Optimization & Data Structures"],
    question: "How does __slots__ optimize class memory consumption, and what are its trade-offs?",
    answer: `
      <p>By default, Python dynamic instances store their instance attributes inside a dynamic dictionary object called <code>__dict__</code>. While this provides flexibility (allowing attributes to be added at runtime), dictionary objects incur significant memory overhead.</p>

      <h4>1. The Memory Overhead of __dict__</h4>
      <p>Each Python dictionary requires memory for hash tables, pointers, and key strings. Instantiating millions of small objects (e.g., <code>Point(x, y)</code>) can cause massive RAM consumption.</p>

      <h4>2. How __slots__ Solves This</h4>
      <p>Defining <code>__slots__</code> tells Python to replace the dynamic <code>__dict__</code> with a fixed-size array of attribute pointers allocated directly in the C struct layout of the object.</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>import sys

class StandardPoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class SlottedPoint:
    __slots__ = ('x', 'y') # Allocates static array of size 2
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = StandardPoint(10, 20)
p2 = SlottedPoint(10, 20)

# Memory size comparison
print("Standard Instance Size + Dict:", sys.getsizeof(p1) + sys.getsizeof(p1.__dict__)) # ~150+ bytes
print("Slotted Instance Size:", sys.getsizeof(p2)) # ~48 bytes (Over 60% RAM savings!)</code></pre>
      </div>

      <h4>3. Trade-offs of Using __slots__</h4>
      <ul>
        <li><strong>No Dynamic Attribute Assignment:</strong> You cannot assign new attributes at runtime if they are not defined in <code>__slots__</code>.</li>
        <li><strong>Multiple Inheritance Complexity:</strong> Inheriting from multiple slotted classes requires careful handling to avoid layout conflicts.</li>
        <li><strong>Weakref Support Removed:</strong> Unless <code>'__weakref__'</code> is explicitly added to <code>__slots__</code>, instances cannot be referenced by <code>weakref</code>.</li>
      </ul>
    `
  },
  {
    id: "py-9",
    category: "Python",
    difficulty: "Intermediate",
    tags: ["Context Managers", "__enter__", "__exit__", "Generators", "Resource Cleanup", "Functional Programming & Context Management"],
    question: "How do Context Managers work in Python, and how do you build custom context managers using class protocols vs contextlib?",
    answer: `
      <p><strong>Context Managers</strong> ensure reliable resource management (closing files, releasing locks, terminating DB connections) using the <code>with</code> statement syntax, guaranteeing cleanup even if exceptions occur.</p>

      <h4>1. The Context Manager Protocol (__enter__ and __exit__)</h4>
      <p>When entering a <code>with</code> block:</p>
      <ol>
        <li>Python evaluates the context manager expression and invokes its <code>__enter__()</code> method. The return value is bound to the <code>as</code> variable.</li>
        <li>The body code inside the block executes.</li>
        <li>When exiting the block (normally or via an exception), Python calls <code>__exit__(exc_type, exc_val, exc_tb)</code>.</li>
        <li>If <code>__exit__()</code> returns <code>True</code>, Python suppresses any raised exception. If it returns <code>False</code> or <code>None</code>, the exception propagates up.</li>
      </ol>

      <h4>2. Implementation Method A: Class-Based Protocol</h4>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>class DatabaseConnection:
    def __init__(self, db_url):
        self.db_url = db_url
        self.connection = None

    def __enter__(self):
        print(f"Opening connection to {self.db_url}...")
        self.connection = f"ActiveConn({self.db_url})"
        return self.connection # Assigned to the 'as' target variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection...")
        self.connection = None
        if exc_type:
            print(f"Exception caught during transaction: {exc_val}")
        return True # Suppresses exception</code></pre>
      </div>

      <h4>3. Implementation Method B: Generator-Based (@contextmanager)</h4>
      <p>The <code>contextlib</code> module allows writing context managers using a single generator function:</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"Allocating resource {name}")
    resource = {"name": name, "status": "READY"}
    try:
        yield resource # Hands resource to the 'with' block body
    finally:
        # Guarantees execution during cleanup
        print(f"Freeing resource {name}")

# Usage
with managed_resource("Buffer_A") as res:
    print(f"Processing using {res['name']}")</code></pre>
      </div>
    `
  },
  {
    id: "py-10",
    category: "Python",
    difficulty: "Intermediate",
    tags: ["Decorators", "functools.wraps", "Closures", "Higher-Order Functions", "Decorators & Function Wrappers"],
    question: "How do Decorators work under the hood, how do parameterized decorators operate, and why is functools.wraps essential?",
    answer: `
      <p>A <strong>Decorator</strong> is a Higher-Order Function that accepts a function object as an argument, wraps it with additional behavior, and returns the modified wrapper function.</p>

      <h4>1. Basic Syntax Transformation</h4>
      <p>Applying the <code>@decorator</code> syntax:</p>
      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>@my_decorator
def my_function():
    pass

# Is exact syntactic sugar for:
my_function = my_decorator(my_function)</code></pre>
      </div>

      <h4>2. Parameterized Decorators (Three-Level Closures)</h4>
      <p>If a decorator accepts configuration arguments (e.g., <code>@retry(retries=3)</code>), it requires an additional outer function factory layer to capture those parameters before accepting the target function.</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>import time
from functools import wraps

# Outer layer accepts decorator parameters
def retry(max_attempts=3, delay=1):
    # Middle layer accepts target function
    def decorator(func):
        # Inner wrapper layer accepts function runtime arguments
        @wraps(func) # Preserves func's __name__, __doc__, and type metadata
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    print(f"Attempt {attempts} failed: {e}. Retrying in {delay}s...")
                    time.sleep(delay)
            return func(*args, **kwargs) # Final attempt
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def unstable_api_call():
    """Fetches remote data."""
    raise ConnectionError("Server Unavailable")</code></pre>
      </div>

      <h4>3. Why functools.wraps is Essential</h4>
      <p>When wrapping a function, the outer wrapper function replaces the original function object. Without <code>@wraps(func)</code>, metadata such as <code>__name__</code>, <code>__doc__</code>, and type annotations are lost (overwritten by the wrapper's metadata), breaking introspection, documentation generators, and debugging tools.</p>
    `
  },
  {
    id: "py-11",
    category: "Python",
    difficulty: "Advanced",
    tags: ["PEP 703", "Free-Threaded Python", "GIL Removal", "Biased Locking", "Immortal Objects", "Python 3.13 & Free-Threaded Architecture"],
    question: "How does PEP 703 remove the Global Interpreter Lock (GIL) in Python 3.13 free-threaded builds, and what architectural mechanisms replace it?",
    answer: `
      <p>PEP 703 introduces a free-threaded build option (<code>python3.13t</code>) that makes the <strong>Global Interpreter Lock (GIL) optional and detachable</strong>. Removing the GIL requires replacing single-threaded memory safety assumptions with fine-grained concurrency control across CPython internals.</p>

      <h4>1. Core Challenge of GIL Removal</h4>
      <p>The GIL previously protected three major CPython invariants:</p>
      <ul>
        <li><strong>Non-atomic Reference Counts:</strong> Simple C increments/decrements (<code>ob_refcnt++</code>) cause data races across CPU threads.</li>
        <li><strong>PyMalloc Management:</strong> Small object allocation pools were single-threaded by design.</li>
        <li><strong>Global State Consistency:</strong> Dictionaries, list mutations, and global type singletons relied on lock-free thread isolation.</li>
      </ul>

      <h4>2. Replacement Architectural Mechanisms</h4>

      <h5>A. Biased Reference Counting</h5>
      <p>Standard atomic operations (<code>std::atomic</code>) incur cache-line bouncing penalties across CPU cores. PEP 703 splits reference counting into <strong>Biased Reference Counting</strong>:</p>
      <ul>
        <li>An object is <em>biased</em> toward the specific OS thread that instantiated it.</li>
        <li>The owning thread modifies the reference count using standard non-atomic instructions (near zero overhead).</li>
        <li>External threads modifying references write to a separate thread-safe <em>atomic extra-reference count</em> field, merging state during garbage collection passes.</li>
      </ul>

      <h5>B. Immortal Objects</h5>
      <p>Global objects (e.g., <code>None</code>, <code>True</code>, <code>False</code>, small integers, built-in type objects) have their reference counts set to special static bit-masks. They are marked as <strong>Immortal</strong>, meaning reference operations on them are completely skipped, eliminating thread contention on core singletons.</p>

      <h5>C. Mimalloc Integration (Thread-Local Allocations)</h5>
      <p>PyMalloc is replaced with <strong>mimalloc</strong> (Microsoft's free-list allocator). mimalloc uses thread-local allocation pages, enabling threads to instantiate small objects concurrently without acquiring a global memory pool lock.</p>

      <h5>D. Deferred Garbage Collection</h5>
      <p>Reference counting cannot safely free objects concurrently while another thread might be traversing the object graph. PEP 703 uses <strong>Deferred Reference Counting and Read-Copy-Update (RCU)</strong> semantics to postpone container deallocations until threads reach safe synchronization checkpoints.</p>

      <div class="code-box">
        <div class="code-header"><span>bash</span></div>
        <pre><code># Checking GIL status in Python 3.13+ free-threaded build
python3.13t -c "import sys; print(sys._is_gil_enabled())"
# Output: False (Runs true native multi-threaded Python bytecode in parallel!)</code></pre>
      </div>
    `
  },
  {
    id: "py-12",
    category: "Python",
    difficulty: "Advanced",
    tags: ["CPython C-API", "PyObject", "GIL Management", "Py_BEGIN_ALLOW_THREADS", "CPython C-API & Native Extensions"],
    question: "How do you write a C-API extension that safely manages GIL acquisition and release during heavy parallel C computations?",
    answer: `
      <p>When extending Python with C/C++, high-performance operations should <strong>explicitly release the GIL</strong> before executing intensive CPU algorithms or blocking C system calls, allowing other Python threads to execute concurrently.</p>

      <h4>1. The PyObject Header Structure</h4>
      <p>At the C level, every Python variable points to a <code>PyObject*</code> pointer, defined internally in CPython as:</p>

      <div class="code-box">
        <div class="code-header"><span>c</span></div>
        <pre><code>typedef struct _object {
    _PyObject_HEAD_EXTRA // Double-linked list pointers (debug builds)
    Py_ssize_t ob_refcnt; // Reference counter
    struct _typeobject *ob_type; // Pointer to Python Type Object
} PyObject;</code></pre>
      </div>

      <h4>2. Managing GIL Acquisition Macro Boundaries</h4>
      <p>CPython provides macro primitives to manipulate the thread state (<code>PyThreadState</code>):</p>
      <ul>
        <li><code>Py_BEGIN_ALLOW_THREADS</code>: Releases the GIL and saves current thread execution state. <strong>WARNING:</strong> Inside this block, you CANNOT read, write, or instantiate any <code>PyObject*</code> variables or invoke CPython APIs.</li>
        <li><code>Py_END_ALLOW_THREADS</code>: Re-acquires the GIL and restores thread state before returning results to Python.</li>
      </ul>

      <h4>3. Safe Native C Extension Example</h4>

      <div class="code-box">
        <div class="code-header"><span>c</span></div>
        <pre><code>#define PY_SSIZE_T_CLEAN
#include <Python.h>

// Native C implementation of heavy computation
static double compute_c_matrix(double* data, int size) {
    double sum = 0.0;
    for (int i = 0; i < size; i++) {
        sum += data[i] * data[i]; // Pure C, no Python runtime references
    }
    return sum;
}

// C-API Wrapper exposed to Python
static PyObject* py_compute_matrix(PyObject* self, PyObject* args) {
    Py_buffer buf;
    
    // Parse Python MemoryBuffer object (e.g., NumPy array or bytearray)
    if (!PyArg_ParseTuple(args, "y*", &buf)) {
        return NULL; // Exception raised automatically
    }

    double* raw_data = (double*)buf.buf;
    int size = buf.len / sizeof(double);
    double result = 0.0;

    // --- RELEASE GIL HERE ---
    Py_BEGIN_ALLOW_THREADS
    
    // Computation runs on raw C array; other Python threads can run in parallel!
    result = compute_c_matrix(raw_data, size);

    Py_END_ALLOW_THREADS
    // --- RE-ACQUIRE GIL HERE ---

    PyBuffer_Release(&buf);
    
    // Convert C double back to Python Float PyObject*
    return PyFloat_FromDouble(result);
}</code></pre>
      </div>
    `
  },
  {
    id: "py-13",
    category: "Python",
    difficulty: "Advanced",
    tags: ["TypeVar", "Variance", "Covariance", "Contravariance", "Generic Protocols", "Advanced Typing & Generics"],
    question: "What is Variance in Python Type Systems, and how do Covariant and Contravariant TypeVars differ in generic abstractions?",
    answer: `
      <p>In Python's <code>typing</code> system, <strong>Variance</strong> defines how subtyping between complex generic types (e.g., <code>Container[Dog]</code>) relates to subtyping between their underlying component types (e.g., <code>Dog</code> as a subtype of <code>Animal</code>).</p>

      <h4>1. The Subtype Baseline</h4>
      <p>Assume <code>Dog</code> is a subtype of <code>Animal</code> (<code>Dog <: Animal</code>).</p>

      <h4>2. The Three Variance Modes</h4>

      <h5>A. Invariant (Default)</h5>
      <p>A generic class <code>Container[T]</code> is <strong>Invariant</strong> if <code>Container[Dog]</code> has NO subtyping relationship to <code>Container[Animal]</code>.</p>
      <p><em>Why needed for mutable types:</em> Mutable collections (like <code>list[T]</code>) must be invariant. If a function accepts <code>list[Animal]</code>, passing a <code>list[Dog]</code> would allow the function to append a <code>Cat()</code> into the dog list, violating type safety.</p>

      <h5>B. Covariant (covariant=True)</h5>
      <p>A generic class <code>Producer[T]</code> is <strong>Covariant</strong> if <code>Producer[Dog]</code> IS a valid subtype of <code>Producer[Animal]</code>. The subtyping direction is <strong>preserved</strong>.</p>
      <p><em>Use Case:</em> Read-only/immutable containers or producer objects (e.g., a function returning or yielding items).</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>from typing import TypeVar, Generic, Sequence

# Covariant TypeVar (Preserves Subtype Order)
T_co = TypeVar("T_co", covariant=True)

class ReadOnlyRepository(Generic[T_co]):
    def __init__(self, items: Sequence[T_co]):
        self._items = items

    def get_first(self) -> T_co: # COVARIANT: Returns T_co (Producer)
        return self._items[0]

class Animal: pass
class Dog(Animal): pass

def process_animals(repo: ReadOnlyRepository[Animal]) -> None:
    print(repo.get_first())

dog_repo: ReadOnlyRepository[Dog] = ReadOnlyRepository([Dog()])
# VALID under mypy/pyright! ReadOnlyRepository[Dog] is a subtype of ReadOnlyRepository[Animal]
process_animals(dog_repo)</code></pre>
      </div>

      <h5>C. Contravariant (contravariant=True)</h5>
      <p>A generic class <code>Consumer[T]</code> is <strong>Contravariant</strong> if <code>Consumer[Animal]</code> IS a valid subtype of <code>Consumer[Dog]</code>. The subtyping direction is <strong>reversed</strong>.</p>
      <p><em>Use Case:</em> Write-only receivers or consumer handlers (e.g., a logger or serializer receiving input objects).</p>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code># Contravariant TypeVar (Reverses Subtype Order)
T_contra = TypeVar("T_contra", contravariant=True)

class Sink(Generic[T_contra]):
    def consume(self, item: T_contra) -> None: # CONTRAVARIANT: Accepts T_contra as argument
        pass

def feed_dogs(sink: Sink[Dog]) -> None:
    sink.consume(Dog())

animal_sink: Sink[Animal] = Sink()
# VALID! A sink that can process ANY Animal is fully capable of consuming a Dog.
feed_dogs(animal_sink)</code></pre>
      </div>

      <h4>3. Python 3.12+ PEP 695 Syntax</h4>
      <p>Modern Python uses clean inline variance inference automatically without manual <code>TypeVar</code> declarations:</p>
      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code># Auto-inferred variance syntax in Python 3.12+
class ReadOnlyBox[+T]: pass # '+' indicates Covariant
class WriteOnlyBox[-T]: pass # '-' indicates Contravariant
class MutableBox[T]: pass    # Invariant</code></pre>
      </div>
    `
  },
  {
    id: "py-14",
    category: "Python",
    difficulty: "Advanced",
    tags: ["Protocol", "PEP 544", "Structural Subtyping", "Static Duck Typing", "Advanced Structural Typing & Protocols"],
    question: "How does PEP 544 Protocol enable Static Duck Typing in Python, and how do runtime_checkable attributes work?",
    answer: `
      <p>Traditionally, Python enforces <strong>Nominal Subtyping</strong> using explicit class inheritance (e.g., <code>class CustomStream(BaseStream)</code>). PEP 544 introduced <strong>Protocols</strong>, enabling <strong>Structural Subtyping (Static Duck Typing)</strong> where type compatibility is determined solely by the presence of matching methods/attributes rather than class inheritance trees.</p>

      <h4>1. Nominal vs Structural Subtyping</h4>
      <ul>
        <li><strong>Nominal Subtyping:</strong> Class A must explicitly inherit from Class B (<code>class A(B)</code>) for static type checkers (mypy/pyright) to consider A a valid subtype of B.</li>
        <li><strong>Structural Subtyping (Protocols):</strong> Class A is implicitly compatible with Protocol B if Class A defines all methods and attributes declared in Protocol B, without inheriting from it.</li>
      </ul>

      <h4>2. Implementing Generic Protocols</h4>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>from typing import Protocol, runtime_checkable, Any

# Define a Structural Protocol
@runtime_checkable
class Renderable(Protocol):
    render_width: int
    
    def render(self) -> str:
        ...

# Class 1: Unrelated independent class
class HTMLButton:
    render_width: int = 120
    
    def render(self) -> str:
        return "<button>Click Me</button>"

# Class 2: Unrelated independent class
class TerminalWidget:
    render_width: int = 80
    
    def render(self) -> str:
        return "[=== WIDGET ===]"

# Function accepting ANY object that satisfies the Renderable protocol structure
def display_component(component: Renderable) -> None:
    print(f"Width: {component.render_width} | Rendered: {component.render()}")

# Valid for static type checkers WITHOUT explicit class inheritance!
display_component(HTMLButton())
display_component(TerminalWidget())</code></pre>
      </div>

      <h4>3. How @runtime_checkable Works Under the Hood</h4>
      <p>Standard protocols exist solely for static type checkers and are erased at runtime. Decorating a Protocol with <code>@runtime_checkable</code> overrides the metaclass <code>__instancecheck__</code> hook.</p>

      <p>This enables standard Python <code>isinstance(obj, Renderable)</code> runtime assertions by inspecting whether <code>obj</code> contains all attributes and callable methods declared on the Protocol interface via <code>hasattr()</code> checks.</p>
    `
  },
  {
    id: "py-15",
    category: "Python",
    difficulty: "Advanced",
    tags: ["asyncio", "loop.run_in_executor", "Task Groups", "Exception Groups", "Asyncio Internals & Free-Threaded Concurrency"],
    question: "How do ExceptionGroups and TaskGroups (PEP 654 / PEP 658) transform structured concurrency and error propagation in asyncio?",
    answer: `
      <p>Prior to Python 3.11, handling multiple concurrent asynchronous tasks using <code>asyncio.gather()</code> had a major flaw: if one task failed, other running tasks were left floating, leading to resource leaks or unhandled exception swallowing. Python 3.11 introduced <strong>Structured Concurrency via TaskGroups and ExceptionGroups</strong>.</p>

      <h4>1. The Structural Failure of Legacy asyncio.gather()</h4>
      <p>With <code>asyncio.gather(task1, task2, return_exceptions=False)</code>, if <code>task1</code> raises an exception, <code>gather()</code> immediately re-raises that exception to the caller. However, <code>task2</code> continues running in the background unmonitored (a dangling task resource leak).</p>

      <h4>2. Structured Concurrency with TaskGroup</h4>
      <p>A <code>TaskGroup</code> provides a strict, deterministic context manager boundary:</p>
      <ul>
        <li>When exiting the <code>async with asyncio.TaskGroup() as tg:</code> block, the execution <strong>pauses until ALL spawned tasks complete</strong>.</li>
        <li>If any single task raises an exception, all other active tasks inside the group are <strong>automatically canceled instantly</strong> (via <code>task.cancel()</code>).</li>
        <li>If multiple tasks fail simultaneously, the exceptions are aggregated and re-raised together as a single <strong><code>ExceptionGroup</code></strong>.</li>
      </ul>

      <h4>3. Production TaskGroup Implementation Example</h4>

      <div class="code-box">
        <div class="code-header"><span>python</span></div>
        <pre><code>import asyncio

async def fetch_user_profile(user_id: int):
    await asyncio.sleep(0.5)
    if user_id == 0:
        raise ValueError("Invalid User ID!")
    return {"user_id": user_id, "name": "Alice"}

async def fetch_user_orders(user_id: int):
    await asyncio.sleep(1.0)
    raise ConnectionError("Database Cluster Unreachable!")

async def function_main():
    try:
        # Structured Concurrency Scope
        async with asyncio.TaskGroup() as tg:
            task1 = tg.create_task(fetch_user_profile(0))  # Will fail with ValueError
            task2 = tg.create_task(fetch_user_orders(101)) # Will fail with ConnectionError

    # Catching multiple concurrent exceptions using except* syntax
    except* ValueError as eg:
        print(f"Handled Validation Exceptions: {eg.exceptions}")
    except* ConnectionError as eg:
        print(f"Handled Network Exceptions: {eg.exceptions}")

asyncio.run(function_main())</code></pre>
      </div>

      <h4>4. Filtering Exceptions with except* Syntax</h4>
      <p>The <code>except*</code> syntax allows developers to selectively handle specific sub-types of an <code>ExceptionGroup</code> in parallel branches, matching exception classes while letting unmatched concurrent exceptions bubble up safely.</p>
    `
  }
];
