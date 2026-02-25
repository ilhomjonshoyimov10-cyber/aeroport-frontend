import { useState, useEffect } from 'react';
import axios from 'axios';

function Parvozlar() {
  const [parvozlar, setParvozlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [holat, setHolat] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/parvozlar/')
      .then(res => {
        setParvozlar(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = parvozlar.filter(p => {
    const matchSearch = p.qayerdan?.toLowerCase().includes(search.toLowerCase()) ||
                        p.qayerga?.toLowerCase().includes(search.toLowerCase()) ||
                        p.parvoz_raqami?.toLowerCase().includes(search.toLowerCase());
    const matchHolat = holat ? p.holat === holat : true;
    return matchSearch && matchHolat;
  });

  const formatVaqt = (vaqt) => {
    if (!vaqt) return '—';
    return new Date(vaqt).toLocaleString('uz-UZ', {
      day: '2-digit', month: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="page">
      <h1 className="page-title">PARVOZLAR</h1>
      <p className="page-subtitle">Barcha parvozlar jadvali</p>

      <div className="filter-bar">
        <input
          className="filter-input"
          placeholder="Shahar yoki parvoz raqami bo'yicha qidiring..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={holat}
          onChange={e => setHolat(e.target.value)}
        >
          <option value="">Barcha holatlar</option>
          <option value="rejalashtirilgan">Rejalashtirilgan</option>
          <option value="kechikkan">Kechikkan</option>
          <option value="bekor_qilingan">Bekor qilingan</option>
          <option value="uchdi">Uchdi</option>
          <option value="qondi">Qo'ndi</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">YUKLANMOQDA...</div>
      ) : filtered.length === 0 ? (
        <div className="empty">Parvozlar topilmadi</div>
      ) : (
        <div className="cards-grid">
          {filtered.map(p => (
            <div key={p.id} className="parvoz-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'Orbitron', fontSize: '0.8rem', color: '#8aa5c0', letterSpacing: '2px' }}>
                  {p.parvoz_raqami}
                </span>
                <span className={`holat-badge holat-${p.holat}`}>{p.holat}</span>
              </div>

              <div className="parvoz-route">
                <span className="parvoz-city">{p.qayerdan}</span>
                <span className="parvoz-arrow">✈</span>
                <span className="parvoz-city">{p.qayerga}</span>
              </div>

              <div className="parvoz-info">
                <div className="parvoz-info-item">
                  <span className="info-label">Uchish vaqti</span>
                  <span className="info-value">{formatVaqt(p.uchish_vaqti)}</span>
                </div>
                <div className="parvoz-info-item">
                  <span className="info-label">Terminal</span>
                  <span className="info-value">{p.terminal || '—'}</span>
                </div>
                <div className="parvoz-info-item">
                  <span className="info-label">Gate</span>
                  <span className="info-value">{p.gate || '—'}</span>
                </div>
                <div className="parvoz-info-item">
                  <span className="info-label">Narx</span>
                  <span className="info-value">${p.bosh_narx}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Parvozlar;