import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ✈ AERO<span>PORT</span>
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Bosh sahifa</Link></li>
        <li><Link to="/parvozlar">Parvozlar</Link></li>
        <li><Link to="/xizmatlar">Xizmatlar</Link></li>
        <li><Link to="/bron">Chipta Bron</Link></li>
        <li><Link to="/statistika">Statistika</Link></li>
        {token ? (
          <li><button onClick={logout} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>Chiqish</button></li>
        ) : (
          <li><Link to="/login" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>Kirish</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;