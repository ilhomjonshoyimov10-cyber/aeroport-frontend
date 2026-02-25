import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">TOSHKENT<br/>XALQARO<br/>AEROPORTI</h1>
        <p className="hero-subtitle">Dunyo bilan bog'lanamiz</p>
        <div className="hero-buttons">
          <Link to="/parvozlar" className="btn-primary">Parvozlarni ko'rish</Link>
          <Link to="/xizmatlar" className="btn-secondary">Xizmatlar</Link>
        </div>
      </section>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">24/7</span>
          <p className="stat-label">Ishlash rejimi</p>
        </div>
        <div className="stat-card">
          <span className="stat-number">50+</span>
          <p className="stat-label">Yo'nalishlar</p>
        </div>
        <div className="stat-card">
          <span className="stat-number">100+</span>
          <p className="stat-label">Xizmat nuqtalari</p>
        </div>
        <div className="stat-card">
          <span className="stat-number">2M+</span>
          <p className="stat-label">Yillik yo'lovchilar</p>
        </div>
      </div>
    </div>
  );
}

export default Home;