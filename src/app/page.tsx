import { API_URL, getApiHealth } from "@/lib/api";

export const dynamic = "force-dynamic";

const categories = [
  "Classifieds",
  "Jobs",
  "Stock media",
  "Real estate",
  "Rentals",
  "Services",
  "Events",
  "Datasets",
];

function StatusDot({ online }: { online: boolean }) {
  return <span className={`statusDot ${online ? "online" : "offline"}`} />;
}

export default async function Home() {
  const health = await getApiHealth();
  const openCodeReady = Boolean(health?.opencode?.ok);
  const renderedAt = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(new Date());

  return (
    <main className="page">
      <header className="header">
        <div className="brand">
          <span className="brandMark">10</span>
          <span>Web10</span>
        </div>
        <nav className="nav" aria-label="Primary">
          <a href="#catalog">Catalog</a>
          <a href="#status">Status</a>
          <a href={`${API_URL}/api/health`} target="_blank" rel="noreferrer">
            API
          </a>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">The supply and demand surface of the internet</p>
        <h1>Everything the internet offers. One faceted search.</h1>
        <p className="lede">
          Web10 is a deduplicated catalog of what is for sale, wanted, hiring,
          available to rent, or otherwise on offer—from classifieds and jobs to
          stock media, real estate, services, events, and datasets.
        </p>
      </section>

      <section id="catalog" className="categories" aria-labelledby="catalog-title">
        <div className="sectionHeading">
          <p className="sectionLabel" id="catalog-title">
            Catalog surface
          </p>
          <span className="sectionMeta">v0.1 · scaffold</span>
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </section>

      <section id="status" className="grid" aria-label="Service status">
        <article className="card">
          <div className="cardHeading">
            <StatusDot online={Boolean(health)} />
            <p className="cardLabel">Web10 API</p>
          </div>
          <p className="cardValue">
            {health ? "Connected" : "Unavailable"}
          </p>
          <p className="cardMeta">{API_URL}</p>
        </article>

        <article className="card">
          <div className="cardHeading">
            <StatusDot online={openCodeReady} />
            <p className="cardLabel">OpenCode</p>
          </div>
          <p className="cardValue">
            {openCodeReady ? "Ready" : "Not connected"}
          </p>
          <p className="cardMeta">
            {health?.opencode?.version
              ? `Version ${health.opencode.version}`
              : "Start the local instance to enable classification."}
          </p>
        </article>

        <article className="card">
          <div className="cardHeading">
            <StatusDot online />
            <p className="cardLabel">Rendering</p>
          </div>
          <p className="cardValue">Server-side</p>
          <p className="cardMeta">Rendered {renderedAt}</p>
        </article>
      </section>

      <section className="contract" aria-label="API contract">
        <div className="sectionHeading">
          <p className="sectionLabel">Service contract</p>
          <span className="sectionMeta">stateless · no database</span>
        </div>
        <div className="contractGrid">
          <div className="contractRow">
            <code>GET /api/health</code>
            <span>API and OpenCode connectivity</span>
          </div>
          <div className="contractRow">
            <code>POST /api/classify</code>
            <span>Page content → normalized entity JSON</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>Web10 UI</span>
        <span>Next.js App Router · SSR enabled</span>
      </footer>
    </main>
  );
}
