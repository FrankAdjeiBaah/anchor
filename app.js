const RSS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

async function loadFeed(category, source) {
  try {
    const res = await fetch(`${RSS_PROXY}${encodeURIComponent(source.url)}`);
    const data = await res.json();
    if (data.status !== "ok") return [];
    return data.items.slice(0, 5).map(item => ({
      title: item.title,
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
    container.innerHTML = `<p class="empty">Nothing loaded yet.</p>`;
    return;
  }
  container.innerHTML = items.map(item => `
    <a class="item" href="${item.link}" target="_blank" rel="noopener">
      <span class="item-source">${item.source}</span>
      <span class="item-title">${item.title}</span>
      <span class="item-date">${item.date}</span>
    </a>
  `).join("");
}

async function loadAll() {
  for (const [category, sources] of Object.entries(FEEDS)) {
    const container = document.querySelector(`[data-feed="${category}"]`);
    container.innerHTML = `<p class="loading">Loading...</p>`;

    const results = await Promise.all(sources.map(s => loadFeed(category, s)));
    const items = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
    renderItems(category, items);
  }
}

loadAll();
