// Master Application State
let allQuestions = [];
let currentCategory = "All";
let searchQuery = "";
let selectedDifficulty = "All";
let selectedStatus = "All";
let allExpanded = false;

// LocalStorage State Management
let userProgress = {
  mastered: JSON.parse(localStorage.getItem('interview_mastered')) || [],
  review: JSON.parse(localStorage.getItem('interview_review')) || [],
  bookmarks: JSON.parse(localStorage.getItem('interview_bookmarks')) || [],
  theme: localStorage.getItem('interview_theme') || 'dark'
};

document.addEventListener("DOMContentLoaded", () => {
  // Load All 14 Data Files
  if (typeof javascriptQuestions !== 'undefined') allQuestions.push(...javascriptQuestions);
  if (typeof reactjsQuestions !== 'undefined') allQuestions.push(...reactjsQuestions);
  if (typeof nextjsQuestions !== 'undefined') allQuestions.push(...nextjsQuestions);
  if (typeof nodejsQuestions !== 'undefined') allQuestions.push(...nodejsQuestions);
  if (typeof expressjsQuestions !== 'undefined') allQuestions.push(...expressjsQuestions);
  if (typeof nestjsQuestions !== 'undefined') allQuestions.push(...nestjsQuestions);
  if (typeof databaseQuestions !== 'undefined') allQuestions.push(...databaseQuestions);
  if (typeof systemDesignInfraQuestions !== 'undefined') allQuestions.push(...systemDesignInfraQuestions);
  if (typeof seniorFullstackQuestions !== 'undefined') allQuestions.push(...seniorFullstackQuestions.map(q => ({...q, category: `Full-Stack - ${q.category}`})));
  if (typeof pythonQuestions !== 'undefined') allQuestions.push(...pythonQuestions);

  // Initialize UI & Sidebar Sublists
  initTheme();
  initMermaid();
  initVoices();
  renderSidebarCategories();
  updateProgressStats();
  renderQuestions();
  setupEventListeners();
});

// Voice dropdown is pre-populated with Bengali options in HTML
function initVoices() {
  // Static Bengali voice options (bn-BD, bn-IN) are set directly in index.html
  // No dynamic population needed since we use SoundOfText API
}

// Initialize Theme
function initTheme() {
  document.documentElement.setAttribute('data-theme', userProgress.theme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = userProgress.theme === 'dark' 
      ? '☀️ <span>Light Mode</span>' 
      : '🌙 <span>Dark Mode</span>';
  }
}

// Toggle Theme
function toggleTheme() {
  userProgress.theme = userProgress.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('interview_theme', userProgress.theme);
  initTheme();
  // Diagrams are baked as SVG with theme colours, so redraw them on theme switch
  initMermaid();
  resetMermaidDiagrams(document);
  renderMermaidIn(document);
}

/* =========================================================
   Mermaid Diagram Rendering
   Answers embed diagrams as <pre class="mermaid">...</pre>.
   Answer bodies are display:none until opened, and Mermaid
   cannot measure text inside a hidden element, so diagrams
   are rendered lazily the first time a card becomes visible.
   ========================================================= */
function initMermaid() {
  if (typeof mermaid === 'undefined') return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: userProgress.theme === 'dark' ? 'dark' : 'default',
    fontFamily: 'inherit',
    flowchart: { htmlLabels: true, curve: 'basis', useMaxWidth: true },
    sequence: { useMaxWidth: true, wrap: true },
    er: { useMaxWidth: true }
  });
}

// Render every not-yet-drawn diagram inside a visible root element
function renderMermaidIn(root) {
  if (typeof mermaid === 'undefined' || !root) return;
  const pending = Array.from(root.querySelectorAll('pre.mermaid'))
    .filter(node => node.dataset.rendered !== 'true' && node.offsetParent !== null);
  if (!pending.length) return;

  // Keep the source around so the diagram can be redrawn on theme change
  pending.forEach(node => {
    if (node.dataset.src === undefined) node.dataset.src = node.textContent.trim();
    node.dataset.rendered = 'true';
  });

  Promise.resolve(mermaid.run({ nodes: pending, suppressErrors: true }))
    .catch(err => console.warn('Mermaid render failed:', err));
}

// Restore diagrams back to their source text so they can be drawn again
function resetMermaidDiagrams(root) {
  if (!root) return;
  root.querySelectorAll('pre.mermaid[data-src]').forEach(node => {
    node.innerHTML = '';
    node.textContent = node.dataset.src;
    node.removeAttribute('data-processed');
    node.dataset.rendered = 'false';
  });
}

// Render Sidebar Category Tree with Expandable Question Sublists
function renderSidebarCategories() {
  const sidebarList = document.getElementById('sidebar-category-list');
  if (!sidebarList) return;

  const categories = [
    { name: "All", label: "📚 All Topics", icon: "" },
    { name: "JavaScript", label: "⚡ JavaScript" },
    { name: "Node.js", label: "🟩 Node.js" },
    { name: "Express.js", label: "🚂 Express.js" },
    { name: "NestJS", label: "🦁 NestJS" },
    { name: "Database", label: "🛢️ Database (SQL)" },
    { name: "React.js", label: "⚛️ React.js" },
    { name: "Next.js", label: "▲ Next.js" },
    { name: "Python", label: "🐍 Python" },
    { name: "Full-Stack", label: "🌐 Full-Stack" },
    { name: "System Design", label: "🏗️ System Design" }
  ];

  sidebarList.innerHTML = categories.map(cat => {
    const isAll = cat.name === "All";
    const catQuestions = isAll ? allQuestions : allQuestions.filter(q => {
      if (cat.name === "System Design") {
        return ["System Design"].includes(q.category) || q.category.startsWith("System Design");
      }
      if (cat.name === "Database") {
        return q.category === "Database" || q.category.startsWith("Database");
      }
      if (cat.name === "Full-Stack") return q.category.startsWith("Full-Stack");
      return q.category === cat.name;
    });
    const count = catQuestions.length;
    const isActive = currentCategory === cat.name;

    return `
      <li class="category-group ${isActive ? 'active' : ''}" id="cat-group-${cat.name.replace(/[^a-zA-Z0-9]/g, '')}">
        <div class="category-item-header" onclick="handleCategoryHeaderClick('${cat.name}')">
          <div class="cat-left">
            ${!isAll ? `<span class="cat-arrow">▶</span>` : ''}
            <span>${cat.label}</span>
          </div>
          <span class="cat-badge">${count}</span>
        </div>
        ${!isAll ? `
          <ul class="sub-q-list">
            ${catQuestions.map((q, idx) => `
              <li class="sub-q-item" id="sub-item-${q.id}" onclick="event.stopPropagation(); navigateToQuestion('${q.id}', '${cat.name}')">
                #${idx + 1} ${q.question}
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </li>
    `;
  }).join('');
}

// Handle Category Header Click in Sidebar
function handleCategoryHeaderClick(catName) {
  const groupElem = document.getElementById(`cat-group-${catName.replace(/[^a-zA-Z0-9]/g, '')}`);
  
  // Toggle expansion of sub-list
  if (groupElem && catName !== "All") {
    groupElem.classList.toggle('expanded');
  }

  // Switch Active Category Filter
  document.querySelectorAll('.category-group').forEach(el => el.classList.remove('active'));
  if (groupElem) groupElem.classList.add('active');

  currentCategory = catName;
  renderQuestions();
}

// Quick Navigate to a Specific Question from Sidebar
function navigateToQuestion(qId, catName) {
  // If current category filter is different, switch it first
  if (currentCategory !== catName && currentCategory !== "All") {
    currentCategory = catName;
    
    // Update active highlight in sidebar
    document.querySelectorAll('.category-group').forEach(el => el.classList.remove('active'));
    const groupElem = document.getElementById(`cat-group-${catName.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (groupElem) {
      groupElem.classList.add('active');
      groupElem.classList.add('expanded');
    }
  }

  // Re-render questions if needed
  renderQuestions();

  // Find Sub-item in Sidebar and highlight
  document.querySelectorAll('.sub-q-item').forEach(el => el.classList.remove('active-sub'));
  const subItem = document.getElementById(`sub-item-${qId}`);
  if (subItem) subItem.classList.add('active-sub');

  // Find target card in main view
  setTimeout(() => {
    const card = document.getElementById(`card-${qId}`);
    if (card) {
      // Expand question open
      card.classList.add('open');
      renderMermaidIn(card);

      // Scroll into view smoothly
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add glow highlight animation
      card.classList.add('highlight-focus');
      setTimeout(() => {
        card.classList.remove('highlight-focus');
      }, 2500);
    }
  }, 50);
}

// Update Progress Dashboard Stats
function updateProgressStats() {
  const totalCount = allQuestions.length;
  const masteredCount = userProgress.mastered.length;
  const reviewCount = userProgress.review.length;
  const pct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  const pctElem = document.getElementById('progress-pct');
  const barElem = document.getElementById('progress-bar-fill');
  const masteredElem = document.getElementById('stat-mastered');
  const reviewElem = document.getElementById('stat-review');

  if (pctElem) pctElem.textContent = `${pct}%`;
  if (barElem) barElem.style.width = `${pct}%`;
  if (masteredElem) masteredElem.textContent = masteredCount;
  if (reviewElem) reviewElem.textContent = reviewCount;
}

// Render Filtered Questions List
function renderQuestions() {
  const container = document.getElementById('questions-container');
  if (!container) return;

  // Filter Logic
  let filtered = allQuestions.filter(q => {
    if (currentCategory !== "All") {
      if (currentCategory === "Database") {
        if (q.category !== "Database" && !q.category.startsWith("Database")) return false;
      } else if (currentCategory === "Full-Stack") {
        if (!q.category.startsWith("Full-Stack")) return false;
      } else if (q.category !== currentCategory) {
        return false;
      }
    }
    if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) return false;
    if (selectedStatus === "Mastered" && !userProgress.mastered.includes(q.id)) return false;
    if (selectedStatus === "Review" && !userProgress.review.includes(q.id)) return false;
    if (selectedStatus === "Bookmarked" && !userProgress.bookmarks.includes(q.id)) return false;

    if (searchQuery.trim() !== "") {
      const qText = (q.question + " " + q.answer + " " + q.tags.join(" ")).toLowerCase();
      return qText.includes(searchQuery.toLowerCase());
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3>কোনো প্রশ্ন পাওয়া যায়নি!</h3>
        <p>অন্য কোনো কিওয়ার্ড দিয়ে সার্চ করুন অথবা ফিল্টার রিসেট করুন।</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((q, index) => {
    const isMastered = userProgress.mastered.includes(q.id);
    const isReview = userProgress.review.includes(q.id);
    const isBookmarked = userProgress.bookmarks.includes(q.id);
    const diffClass = q.difficulty === 'Beginner' ? 'badge-easy' : (q.difficulty === 'Intermediate' ? 'badge-medium' : 'badge-hard');

    return `
      <div class="question-card ${allExpanded ? 'open' : ''}" id="card-${q.id}">
        <div class="question-header" onclick="toggleQuestion('${q.id}')">
          <span class="q-number">#${index + 1}</span>
          <div class="q-title-wrapper">
            <h3 class="q-title">${q.question}</h3>
            <div class="q-meta">
              <span class="badge ${diffClass}">${q.difficulty}</span>
              <span class="tag">${q.category}</span>
              ${q.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
            </div>
          </div>
          <div class="q-actions">
            <button class="btn-icon read-btn" id="read-btn-${q.id}" title="Read Aloud (Text to Speech)" onclick="event.stopPropagation(); readAloud('${q.id}')">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M11 5L6 9H2v6h4l5 4V5z"></path>
              </svg>
            </button>
            <button class="btn-icon ${isBookmarked ? 'bookmarked' : ''}" title="Bookmark" onclick="event.stopPropagation(); toggleBookmark('${q.id}')">
              <svg width="20" height="20" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            </button>
            <button class="btn-icon chevron-icon" title="Toggle Details">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>

        <div class="question-body">
          <div class="answer-content">
            ${q.answer}
          </div>
          <div class="status-bar">
            <div class="status-btns">
              <button class="btn-status ${isMastered ? 'active-mastered' : ''}" onclick="toggleStatus('${q.id}', 'mastered')">
                ${isMastered ? '✓ Mastered' : 'Mark as Mastered'}
              </button>
              <button class="btn-status ${isReview ? 'active-review' : ''}" onclick="toggleStatus('${q.id}', 'review')">
                ${isReview ? '⚠️ Needs Revision' : 'Needs Revision'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  setupCodeCopyButtons();
}

// Toggle Accordion Card Open/Close
function toggleQuestion(id) {
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.classList.toggle('open');
    if (card.classList.contains('open')) renderMermaidIn(card);
  }
}

// Global Toggle Expand All / Collapse All
function toggleExpandAllAnswers() {
  allExpanded = !allExpanded;
  const btn = document.getElementById('btn-expand-all');
  if (btn) {
    btn.innerHTML = allExpanded ? '📂 Collapse All' : '📖 Expand All';
  }
  document.querySelectorAll('.question-card').forEach(card => {
    if (allExpanded) {
      card.classList.add('open');
      renderMermaidIn(card);
    } else {
      card.classList.remove('open');
    }
  });
}

// Toggle Bookmark State
function toggleBookmark(id) {
  if (userProgress.bookmarks.includes(id)) {
    userProgress.bookmarks = userProgress.bookmarks.filter(bId => bId !== id);
  } else {
    userProgress.bookmarks.push(id);
  }
  localStorage.setItem('interview_bookmarks', JSON.stringify(userProgress.bookmarks));
  renderQuestions();
}

// Toggle Mastered / Review Status
function toggleStatus(id, statusType) {
  if (statusType === 'mastered') {
    if (userProgress.mastered.includes(id)) {
      userProgress.mastered = userProgress.mastered.filter(mId => mId !== id);
    } else {
      userProgress.mastered.push(id);
      userProgress.review = userProgress.review.filter(rId => rId !== id);
    }
  } else if (statusType === 'review') {
    if (userProgress.review.includes(id)) {
      userProgress.review = userProgress.review.filter(rId => rId !== id);
    } else {
      userProgress.review.push(id);
      userProgress.mastered = userProgress.mastered.filter(mId => mId !== id);
    }
  }
  
  localStorage.setItem('interview_mastered', JSON.stringify(userProgress.mastered));
  localStorage.setItem('interview_review', JSON.stringify(userProgress.review));
  
  updateProgressStats();
  renderQuestions();
}

// Setup Copy to Clipboard functionality for Code blocks
function setupCodeCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const codeBox = btn.closest('.code-box');
      const codeText = codeBox.querySelector('code').innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    };
  });
}

// Event Listeners setup
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Expand All Button
  const expandAllBtn = document.getElementById('btn-expand-all');
  if (expandAllBtn) expandAllBtn.addEventListener('click', toggleExpandAllAnswers);

  // Search Input Handler
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderQuestions();
    });
  }

  // Difficulty Filter
  const diffSelect = document.getElementById('filter-difficulty');
  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      selectedDifficulty = e.target.value;
      renderQuestions();
    });
  }

  // Status Filter
  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      selectedStatus = e.target.value;
      renderQuestions();
    });
  }
}

// Text-to-Speech (Read Aloud) Manager using SoundOfText (Google Bengali Voice)
const TTSManager = {
  audio: new Audio(),
  queue: [],
  isPlaying: false,
  isStopped: true,
  currentQId: null,
  isTopicPlay: false,
  topicQuestions: [],
  currentTopicIndex: 0,

  stop() {
    this.isStopped = true;
    this.isPlaying = false;
    this.queue = [];
    this.audio.pause();
    this.audio.src = '';
    if (this.currentQId) {
      updateReadButtonIcon(this.currentQId, false);
      this.currentQId = null;
    }
    this.isTopicPlay = false;
    updateTopicPlayButtonIcon(false);
  },

  playText(text, qId) {
    this.stop();
    this.isStopped = false;
    this.currentQId = qId;
    this.isPlaying = true;
    updateReadButtonIcon(qId, true);

    this.queue = this.chunkText(text, 150);
    this.playNextChunk();
  },

  async playNextChunk() {
    if (this.isStopped || !this.isPlaying) return;

    if (this.queue.length === 0) {
      this.isPlaying = false;
      updateReadButtonIcon(this.currentQId, false);
      if (this.isTopicPlay) {
        this.playNextInTopic();
      } else {
        this.currentQId = null;
      }
      return;
    }

    const chunk = this.queue.shift();
    if (!chunk || !chunk.trim()) {
      this.playNextChunk();
      return;
    }

    try {
      // Get selected Bengali voice from dropdown (bn-BD or bn-IN)
      const voiceSelect = document.getElementById('voice-select');
      const selectedVoice = (voiceSelect && voiceSelect.value) ? voiceSelect.value : 'bn-BD';

      // Request audio from SoundOfText API (uses real Google Bengali TTS)
      const res = await fetch('https://api.soundoftext.com/sounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ engine: 'Google', data: { text: chunk, voice: selectedVoice } })
      });
      const json = await res.json();
      if (this.isStopped) return;

      if (!json.success) throw new Error('SoundOfText request failed');

      // Poll for audio URL (usually ready quickly)
      const audioUrl = await this.pollForAudio(json.id);
      if (this.isStopped) return;

      this.audio.src = audioUrl;
      this.audio.playbackRate = 1.15; // Increased speed
      await new Promise((resolve, reject) => {
        this.audio.onended = resolve;
        this.audio.onerror = reject;
        this.audio.play().catch(reject);
      });
      if (!this.isStopped && this.isPlaying) {
        this.playNextChunk();
      }

    } catch (err) {
      console.warn('TTS error, skipping chunk:', err.message);
      if (!this.isStopped && this.isPlaying) {
        this.playNextChunk();
      }
    }
  },

  async pollForAudio(soundId, attempts = 0) {
    if (attempts > 15) throw new Error('Audio not ready in time');
    const res = await fetch(`https://api.soundoftext.com/sounds/${soundId}`);
    const json = await res.json();
    if (json.status === 'Done') return json.location;
    if (json.status === 'Error') throw new Error('SoundOfText error');
    await new Promise(r => setTimeout(r, 700));
    return this.pollForAudio(soundId, attempts + 1);
  },

  chunkText(text, maxLength) {
    const sentences = text.split(/(?<=[.!?।\n])\s*/);
    const chunks = [];
    let currentChunk = '';

    for (const part of sentences) {
      if ((currentChunk + ' ' + part).trim().length <= maxLength) {
        currentChunk = (currentChunk + ' ' + part).trim();
      } else {
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        currentChunk = part.trim();
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    return chunks.filter(c => c.length > 0);
  },


  playTopic() {
    this.stop();
    this.isTopicPlay = true;
    
    const container = document.getElementById('questions-container');
    const cards = container.querySelectorAll('.question-card');
    
    this.topicQuestions = Array.from(cards).map(card => card.id.replace('card-', ''));
    this.currentTopicIndex = 0;
    
    if (this.topicQuestions.length > 0) {
      updateTopicPlayButtonIcon(true);
      this.playNextInTopic();
    } else {
      this.isTopicPlay = false;
      updateTopicPlayButtonIcon(false);
    }
  },

  playNextInTopic() {
    if (this.currentTopicIndex >= this.topicQuestions.length) {
      this.stop();
      return;
    }
    const qId = this.topicQuestions[this.currentTopicIndex];
    this.currentTopicIndex++;
    
    const card = document.getElementById(`card-${qId}`);
    if (card && !card.classList.contains('open')) {
      card.classList.add('open');
    }
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const q = allQuestions.find(question => question.id === qId);
    if (q) {
      const text = prepareTextForReading(q);
      this.currentQId = qId;
      this.isPlaying = true;
      updateReadButtonIcon(qId, true);
      this.queue = this.chunkText(text, 180);
      this.playNextChunk();
    } else {
      this.playNextInTopic();
    }
  }
};



function prepareTextForReading(q) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = q.answer;
  const codeBlocks = tempDiv.querySelectorAll('pre, code');
  codeBlocks.forEach(block => block.remove());
  let cleanAnswerText = tempDiv.textContent || tempDiv.innerText || "";
  cleanAnswerText = cleanAnswerText.replace(/।/g, '.');
  return "প্রশ্ন: " + q.question + " উত্তর: " + cleanAnswerText;
}

function readAloud(qId) {
  if (TTSManager.isPlaying && TTSManager.currentQId === qId && !TTSManager.isTopicPlay) {
    TTSManager.stop();
    return;
  }
  
  TTSManager.isTopicPlay = false; 
  updateTopicPlayButtonIcon(false);
  const q = allQuestions.find(question => question.id === qId);
  if (!q) return;
  const text = prepareTextForReading(q);
  TTSManager.playText(text, qId);
}

function toggleTopicPlay() {
  if (TTSManager.isTopicPlay && TTSManager.isPlaying) {
    TTSManager.stop();
  } else {
    TTSManager.playTopic();
  }
}

function updateTopicPlayButtonIcon(playing) {
  const btn = document.getElementById('btn-play-topic');
  if (!btn) return;
  if (playing) {
    btn.innerHTML = `⏹️ Stop Topic Audio`;
    btn.style.color = '#f87171';
  } else {
    btn.innerHTML = `▶️ Play Topic Audio`;
    btn.style.color = '';
  }
}

function updateReadButtonIcon(qId, playing) {
  const btn = document.getElementById(`read-btn-${qId}`);
  if (!btn) return;
  if (playing) {
    btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    btn.style.color = '#4ade80';
    btn.classList.add('reading-active');
  } else {
    btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M11 5L6 9H2v6h4l5 4V5z"></path></svg>`;
    btn.style.color = '';
    btn.classList.remove('reading-active');
  }
}

window.addEventListener('beforeunload', () => {
  TTSManager.stop();
});
