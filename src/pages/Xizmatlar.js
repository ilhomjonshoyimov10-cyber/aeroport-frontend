import { useState, useEffect } from 'react';
import axios from 'axios';

function Xizmatlar() {
  const [xizmatlar, setXizmatlar] = useState([]);
  const [kategoriyalar, setKategoriyalar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [kategoriya, setKategoriya] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get('http://127.0.0.1:8000/api/xizmatlar/'),
      axios.get('http://127.0.0.1:8000/api/kategoriyalar/')
    ]).then(([xRes, kRes]) => {
      setXizmatlar(xRes.data);
      setKategoriyalar(kRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = xizmatlar.filter(x => {
    const matchSearch = x.nomi?.toLowerCase().includes(search.toLowerCase());
    const matchKat = kategoriya ? x.kategoriya === parseInt(kategoriya) : true;
    return matchSearch && matchKat;
  });

  return (
    <div className="page">
      <h1 className="page-title">XIZMATLAR</h1>
      <p className="page-subtitle">Aeroport xizmat ko'rsatish nuqtalari</p>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Xizmat nomi bo'yicha qidiring..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={kategoriya}
          onChange={e => setKategoriya(e.target.value)}
        >
          <option value="">Barcha kategoriyalar</option>
          {kategoriyalar.map(k => (
            <option key={k.id} value={k.id}>{k.nomi}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading">YUKLANMOQDA...</div>
      ) : filtered.length === 0 ? (
        <div className="empty">Xizmatlar topilmadi</div>
      ) : (
        <div className="cards-grid">
          {filtered.map(x => (
            <div key={x.id} className="xizmat-card">
              {/* RASM QO'SHILDI */}
              {x.rasm && (
                <img 
                  src={x.rasm}
                  alt={x.nomi}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '1rem'
                  }}
                />
              )}
              <p className="xizmat-kategoriya">{x.kategoriya_nomi}</p>
              <h3 className="xizmat-nomi">{x.nomi}</h3>
              {x.tavsif && <p style={{ color: '#8aa5c0', fontSize: '0.9rem', marginTop: '0.5rem' }}>{x.tavsif}</p>}
              <div className="xizmat-info">
                <span>📍 {x.joylashuv}</span>
                <span>🕐 {x.ochilish_vaqti} — {x.yopilish_vaqti}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Xizmatlar;