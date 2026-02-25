import { useState, useEffect } from 'react';
import axios from 'axios';

function Bron() {
  const [parvozlar, setParvozlar] = useState([]);
  const [step, setStep] = useState(1); // 1-parvoz, 2-malumot, 3-tasdiqlash
  const [tanlanganParvoz, setTanlanganParvoz] = useState(null);
  const [form, setForm] = useState({
    ism: '', familiya: '', pasport_raqam: '',
    telefon: '', email: '', orindiq: '', sinf: 'economy'
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/parvozlar/?holat=rejalashtirilgan')
      .then(res => setParvozlar(res.data));
  }, []);

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value });

  const bronQilish = async () => {
    setLoading(true);
    try {
      // 1. Yo'lovchi yaratish
      const yolovchiRes = await axios.post('http://127.0.0.1:8000/api/yolovchilar/', {
        ism: form.ism,
        familiya: form.familiya,
        pasport_raqam: form.pasport_raqam,
        telefon: form.telefon,
        email: form.email,
      });

      // 2. Chipta yaratish
      await axios.post('http://127.0.0.1:8000/api/chiptalar/', {
        yolovchi: yolovchiRes.data.id,
        parvoz: tanlanganParvoz.id,
        orindiq_raqami: form.orindiq,
        sinf: form.sinf,
        narxi: tanlanganParvoz.bosh_narx,
        holat: 'band',
      });

      setSuccess(true);
    } catch (err) {
      alert('Xatolik! Pasport raqami allaqachon mavjud bo\'lishi mumkin.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 className="page-title" style={{ justifyContent: 'center', display: 'flex' }}>CHIPTA BRON QILINDI!</h1>
        <p style={{ color: '#8aa5c0', marginTop: '1rem', fontSize: '1.1rem' }}>
          {form.ism} {form.familiya} — {tanlanganParvoz.qayerdan} → {tanlanganParvoz.qayerga}
        </p>
        <p style={{ color: '#00d4ff', marginTop: '0.5rem' }}>O'rindiq: {form.orindiq} | Sinf: {form.sinf}</p>
        <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => { setSuccess(false); setStep(1); setTanlanganParvoz(null); }}>
          Yangi bron
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">CHIPTA BRON</h1>
      <p className="page-subtitle">Online chipta bron qilish</p>

      {/* STEPS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
        {['Parvoz tanlash', "Ma'lumotlar", 'Tasdiqlash'].map((s, i) => (
          <div key={i} style={{
            padding: '0.5rem 1.5rem',
            border: `1px solid ${step === i + 1 ? '#00d4ff' : '#1a3a5c'}`,
            color: step === i + 1 ? '#00d4ff' : '#8aa5c0',
            fontFamily: 'Orbitron',
            fontSize: '0.75rem',
            letterSpacing: '1px'
          }}>
            {i + 1}. {s}
          </div>
        ))}
      </div>

      {/* STEP 1 - Parvoz tanlash */}
      {step === 1 && (
        <div className="cards-grid">
          {parvozlar.map(p => (
            <div key={p.id} className="parvoz-card" onClick={() => { setTanlanganParvoz(p); setStep(2); }}
              style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontFamily: 'Orbitron', fontSize: '0.8rem', color: '#8aa5c0' }}>{p.parvoz_raqami}</span>
                <span style={{ color: '#00d4ff', fontFamily: 'Orbitron', fontSize: '0.9rem' }}>${p.bosh_narx}</span>
              </div>
              <div className="parvoz-route">
                <span className="parvoz-city">{p.qayerdan}</span>
                <span className="parvoz-arrow">✈</span>
                <span className="parvoz-city">{p.qayerga}</span>
              </div>
              <div style={{ marginTop: '1rem', color: '#8aa5c0', fontSize: '0.85rem' }}>
                {new Date(p.uchish_vaqti).toLocaleString('uz-UZ', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2 - Ma'lumotlar */}
      {step === 2 && (
        <div style={{ maxWidth: '600px' }}>
          <div style={{ background: '#0d1f35', border: '1px solid #1a3a5c', padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ color: '#8aa5c0', fontSize: '0.8rem', letterSpacing: '2px' }}>TANLANGAN PARVOZ</p>
            <p style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', marginTop: '0.5rem' }}>
              {tanlanganParvoz.qayerdan} → {tanlanganParvoz.qayerga}
            </p>
            <p style={{ color: '#00d4ff' }}>{tanlanganParvoz.parvoz_raqami} | ${tanlanganParvoz.bosh_narx}</p>
          </div>

          {[
            { name: 'ism', label: 'Ism' },
            { name: 'familiya', label: 'Familiya' },
            { name: 'pasport_raqam', label: 'Pasport raqami' },
            { name: 'telefon', label: 'Telefon' },
            { name: 'email', label: 'Email' },
            { name: 'orindiq', label: "O'rindiq raqami (masalan: 14A)" },
          ].map(f => (
            <div key={f.name} style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#8aa5c0', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                {f.label}
              </label>
              <input
                className="filter-input"
                style={{ width: '100%' }}
                name={f.name}
                value={form[f.name]}
                onChange={handleForm}
                placeholder={f.label}
              />
            </div>
          ))}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#8aa5c0', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
              Sinf
            </label>
            <select className="filter-select" style={{ width: '100%' }} name="sinf" value={form.sinf} onChange={handleForm}>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>← Orqaga</button>
            <button className="btn-primary" onClick={() => setStep(3)}>Davom etish →</button>
          </div>
        </div>
      )}

      {/* STEP 3 - Tasdiqlash */}
      {step === 3 && (
        <div style={{ maxWidth: '500px' }}>
          <div style={{ background: '#0d1f35', border: '1px solid #1a3a5c', padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'Orbitron', color: '#00d4ff', marginBottom: '1.5rem', fontSize: '1rem' }}>BRON MA'LUMOTLARI</h3>
            {[
              ['Parvoz', `${tanlanganParvoz.qayerdan} → ${tanlanganParvoz.qayerga}`],
              ['Parvoz raqami', tanlanganParvoz.parvoz_raqami],
              ['Yo\'lovchi', `${form.ism} ${form.familiya}`],
              ['Pasport', form.pasport_raqam],
              ['Telefon', form.telefon],
              ['O\'rindiq', form.orindiq],
              ['Sinf', form.sinf],
              ['Narx', `$${tanlanganParvoz.bosh_narx}`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '1px solid #1a3a5c' }}>
                <span style={{ color: '#8aa5c0', fontSize: '0.85rem' }}>{label}</span>
                <span style={{ color: '#e8f4fd', fontWeight: '600' }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" onClick={() => setStep(2)}>← Orqaga</button>
            <button className="btn-primary" onClick={bronQilish} disabled={loading}>
              {loading ? 'YUKLANMOQDA...' : 'BRONNI TASDIQLASH ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bron;