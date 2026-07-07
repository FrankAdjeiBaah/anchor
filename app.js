const RSS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function skeletonHTML() {
  return `<div class="skeleton">${[1,2,3].map(() => `<div class="skeleton-card"></div>`).join("")}</div>`;
}

async function loadFeed(category, source) {
  try {
    const res = await fetch(`${RSS_PROXY}${encodeURIComponent(source.url)}`);
    const data = await res.json();
    if (data.status !== "ok") return [];
    const cutoff = source.maxAgeDays ? Date.now() - source.maxAgeDays * 86400000 : null;
    return data.items
      .filter(item => {
        if (!cutoff) return true;
        const t = new Date(item.pubDate.replace(" ", "T")).getTime();
        return !isNaN(t) && t > cutoff;
      })
      .slice(0, source.limit || 5)
      .map(item => ({
        title: decodeHTML(item.title),
        link: item.link,
        source: source.name,
        date: new Date(item.pubDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      }));
  } catch {
    return [];
  }
}

function renderItems(category, items) {
  const container = document.querySelector(`[data-feed="${category}"]`);
  if (!items.length) {
    container.innerHTML = `<p class="empty">No stories right now.</p>`;
    return;
  }
  container.innerHTML = items.map((item, i) => `
    <a class="item ${i === 0 ? "item-top" : ""}" href="${item.link}" target="_blank" rel="noopener" style="animation-delay:${i * 0.05}s">
      <div class="item-meta">
        <span class="item-source">${item.source}</span>
        <span class="item-date">${item.date}</span>
      </div>
      <span class="item-title">${item.title}</span>
    </a>
  `).join("");
}

async function loadAll() {
  const btn = document.getElementById("refresh-btn");
  const updatedEl = document.getElementById("last-updated");
  if (btn) { btn.disabled = true; }

  for (const [category] of Object.entries(FEEDS)) {
    const container = document.querySelector(`[data-feed="${category}"]`);
    if (container) container.innerHTML = skeletonHTML();
  }

  await Promise.all(Object.entries(FEEDS).map(async ([category, sources]) => {
    const results = await Promise.all(sources.map(s => loadFeed(category, s)));
    const items = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
    renderItems(category, items);
  }));

  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (updatedEl) updatedEl.textContent = `Updated ${time}`;
  if (btn) { btn.disabled = false; }
}

function refreshAll() { loadAll(); }

function setEditionDate() {
  const el = document.getElementById("edition-date");
  if (!el) return;
  const now = new Date();
  const hour = now.getHours();
  const edition = hour < 12 ? "Morning Edition" : hour < 17 ? "Afternoon Edition" : "Evening Edition";
  const date = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  el.textContent = `${date} · ${edition}`;
}

setEditionDate();
loadAll();
