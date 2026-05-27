/* ─────────────────────────────────────────
   성빈약국 · Sungbin Pharmacy
   Script
   ───────────────────────────────────────── */

let faqData = [];
const PHARMACY_PHONE = '031-719-0936';

/* ─── Screen navigation ─── */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 채팅 화면을 떠날 때 답변 초기화
  if (screenId !== 'chat') {
    const ans = document.getElementById('chatAnswer');
    if (ans) ans.classList.remove('show');
  }
}

/* ─── FAQ 로드 ─── */
async function loadFAQ() {
  try {
    const res = await fetch('data/faq.json');
    faqData = await res.json();
    renderQuickQuestions();
  } catch (e) {
    console.error('FAQ 로드 실패:', e);
    faqData = [];
  }
}

/* ─── 빠른 질문 칩 렌더 (상위 4개) ─── */
function renderQuickQuestions() {
  const container = document.getElementById('quickQuestions');
  if (!container) return;
  const quick = faqData.slice(0, 4);
  container.innerHTML = quick
    .map(item =>
      `<button class="quick-q" onclick="showAnswer('${item.id}')">${escapeHtml(item.question)}</button>`
    )
    .join('');
}

/* ─── 사용자 입력으로 질문하기 ─── */
function askPharmacist() {
  const input = document.getElementById('chatInput');
  const query = input.value.trim();
  if (!query) return;

  const matched = findBestMatch(query);

  if (matched) {
    showAnswerHtml(matched);
  } else {
    showNotFound(query);
  }
}

/* ─── 키워드 매칭: 가장 관련 높은 FAQ 찾기 ─── */
function findBestMatch(query) {
  const lowerQuery = query.toLowerCase().replace(/\s+/g, '');
  let best = null;
  let bestScore = 0;

  for (const item of faqData) {
    let score = 0;
    for (const kw of item.keywords) {
      const cleaned = kw.toLowerCase().replace(/\s+/g, '');
      if (lowerQuery.includes(cleaned)) {
        // 긴 키워드 매칭이 더 높은 점수
        score += cleaned.length * 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  // 점수가 너무 낮으면 매칭 안 됨으로 처리
  return bestScore >= 2 ? best : null;
}

/* ─── 빠른질문 칩 클릭 ─── */
function showAnswer(id) {
  const item = faqData.find(f => f.id === id);
  if (!item) return;
  document.getElementById('chatInput').value = item.question;
  showAnswerHtml(item);
}

/* ─── 답변 표시 ─── */
function showAnswerHtml(item) {
  const ans = document.getElementById('chatAnswer');
  ans.innerHTML = `
    <div class="answer-title">${escapeHtml(item.question)}</div>
    <div>${escapeHtml(item.answer)}</div>
    <div class="answer-cta">
      <a class="cta-btn" href="tel:${PHARMACY_PHONE}">약사에게 직접 ☎</a>
    </div>
  `;
  ans.classList.add('show');
  setTimeout(() => {
    ans.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 120);
}

/* ─── 답변 없음 처리 ─── */
function showNotFound(query) {
  const ans = document.getElementById('chatAnswer');
  ans.innerHTML = `
    <div class="answer-title">"${escapeHtml(query)}"에 대한 답변을 준비 중입니다</div>
    <div>약사가 직접 답변드릴 수 있는 내용입니다.\n매장으로 전화 주시거나 방문해 주세요.</div>
    <div class="answer-cta">
      <a class="cta-btn" href="tel:${PHARMACY_PHONE}">약사에게 직접 ☎</a>
    </div>
  `;
  ans.classList.add('show');
  setTimeout(() => {
    ans.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 120);
}

/* ─── XSS 방지 ─── */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ─── 초기화 ─── */
document.addEventListener('DOMContentLoaded', () => {
  loadFAQ();

  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        askPharmacist();
      }
    });
  }
});
