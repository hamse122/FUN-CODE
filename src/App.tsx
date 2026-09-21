import Terminal from "./components/Terminal";
import Profile from "./components/Profile";
import PirateSkull from "./components/PirateSkull";

function App() {
  return (
    <main className="app">
      <div className="background-grid" />

      <div className="app-container">
        <header className="top-bar">
          <div className="brand">
            <PirateSkull className="brand-skull" />
            HAMSE-MO
          </div>

          <div className="system-info">
            SYSTEM ONLINE
          </div>
        </header>

        <section className="hero">
          <Profile />

          <div className="terminal-wrapper">
            <Terminal />
          </div>
        </section>

        <footer>
          <span>© 2026 HAMSE.MO</span>
          <span>Built with React + TypeScript</span>
        </footer>
      </div>
    </main>
  );
}

export default App;