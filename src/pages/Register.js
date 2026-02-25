import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    setLoading(true);
    setError('');

    if (form.password !== form.password2) {
      setError('Parollar mos kelmaydi!');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Xatolik yuz berdi!');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#0d1f35', border: '1px solid #1a3a5c', padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontFamily: 'Orbitron', color: '#00d4ff', fontSize: '1.5rem', marginBottom: '0.5rem', letterSpacing: '3px' }}>
          RO'YXATDAN O'TISH
        </h1>
        <p style={{ color: '#8aa5c0', marginBottom: '2rem', fontSize: '0.9rem' }}>Yangi hisob yaratish</p>

        {error && (
          <div style={{ background: 'rgba(255,50,50,0.1)', border: '1px solid #ff5050', color: '#ff5050', padding: '0.8rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#8aa5c0', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
            Foydalanuvchi nomi
          </label>
          <input className="filter-input" style={{ width: '100%' }} name="username" value={form.username} onChange={handleForm} placeholder="username" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#8aa5c0', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
            Email
          </label>
          <input className="filter-input" style={{ width: '100%' }} name="email" value={form.email} onChange={handleForm} placeholder="email@mail.com" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#8aa5c0', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
            Parol
          </label>
          <input className="filter-input" style={{ width: '100%' }} name="password" type="password" value={form.password} onChange={handleForm} placeholder="••••••••" />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ color: '#8aa5c0', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
            Parolni tasdiqlang
          </label>
          <input className="filter-input" style={{ width: '100%' }} name="password2" type="password" value={form.password2} onChange={handleForm} placeholder="••••••••" />
        </div>

        <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }} onClick={register} disabled={loading}>
          {loading ? 'YUKLANMOQDA...' : 'RO\'YXATDAN O\'TISH →'}
        </button>

        <p style={{ color: '#8aa5c0', textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
          Hisobingiz bormi?{' '}
          <Link to="/login" style={{ color: '#00d4ff' }}>Kirish</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;