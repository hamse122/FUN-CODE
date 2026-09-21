import Terminal from "./components/Terminal";
import Profile from "./components/Profile";

function App() {
  return (
    <main className="app">
      <div className="background-grid" />

      <div className="app-container">
        <header className="top-bar">
          <div className="brand">
            <span className="brand-dot" />
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
          <span>© 2026 HAMSE.DEV</span>
          <span>Built with React + TypeScript</span>
        </footer>
      </div>
    </main>
  );
}

export default App;