const FEEDS = {
  ghana: [
    { name: "Graphic Online", url: "https://www.graphic.com.gh/rss" },
    { name: "Joy FM", url: "https://www.myjoyonline.com/feed/" },
    { name: "3News", url: "https://3news.com/feed/" },
  ],
  uk: [
    { name: "BBC News", url: "https://feeds.bbci.co.uk/news/uk/rss.xml" },
    { name: "The Guardian", url: "https://www.theguardian.com/uk/rss" },
  ],
  world: [
    { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews" },
    { name: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  ],
  transfers: [
    { name: "BBC Sport Arsenal", url: "https://feeds.bbci.co.uk/sport/football/teams/arsenal/rss.xml" },
    { name: "Sky Sports Transfers", url: "https://www.skysports.com/rss/12040" },
    { name: "BBC Sport PL", url: "https://feeds.bbci.co.uk/sport/football/premier-league/rss.xml" },
  ],
  compliance: [
    { name: "LexisNexis Risk", url: "https://news.google.com/rss/search?q=%22LexisNexis+Risk%22+product+OR+launch+OR+partnership&hl=en-GB&gl=GB&ceid=GB:en", limit: 2, maxAgeDays: 30 },
    { name: "ComplyAdvantage", url: "https://news.google.com/rss/search?q=ComplyAdvantage+product+OR+launch+OR+partnership&hl=en-GB&gl=GB&ceid=GB:en", limit: 2, maxAgeDays: 30 },
    { name: "World-Check", url: "https://news.google.com/rss/search?q=%22World-Check%22+OR+%22LSEG+compliance%22&hl=en-GB&gl=GB&ceid=GB:en", limit: 2, maxAgeDays: 30 },
    { name: "Moody's / BvD", url: "https://news.google.com/rss/search?q=%22Moody%27s+Analytics%22+compliance+OR+%22Bureau+van+Dijk%22&hl=en-GB&gl=GB&ceid=GB:en", limit: 2, maxAgeDays: 30 },
    { name: "Kroll", url: "https://news.google.com/rss/search?q=Kroll+compliance+OR+Kroll+risk+product&hl=en-GB&gl=GB&ceid=GB:en", limit: 1, maxAgeDays: 30 },
    { name: "Dun & Bradstreet", url: "https://news.google.com/rss/search?q=%22Dun+%26+Bradstreet%22+compliance+OR+risk&hl=en-GB&gl=GB&ceid=GB:en", limit: 1, maxAgeDays: 30 },
  ],
  faith: [
    { name: "Christianity Today", url: "https://www.christianitytoday.com/ct/rss.xml" },
    { name: "Premier Christian", url: "https://premierchristian.news/en/rss/news" },
    { name: "The Gospel Coalition", url: "https://www.thegospelcoalition.org/feed/" },
  ],
};
