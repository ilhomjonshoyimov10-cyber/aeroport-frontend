import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Statistika() {
  const [parvozlar, setParvozlar] = useState([]);
  const [xizmatlar, setXizmatlar] = useState([]);
  const [chiptalar, setChiptalar] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://127.0.0.1:8000/api/parvozlar/'),
      axios.get('http://127.0.0.1:8000/api/xizmatlar/'),
      axios.get('http://127.0.0.1:8000/api/chiptalar/'),
    ]).then(([p, x, c]) => {
      setParvozlar(p.data);
      setXizmatlar(x.data);
      setChiptalar(c.data);
    });
  }, []);

  // Parvoz holatlari (Pie chart)
  const holatlar = ['rejalashtirilgan', 'kechikkan', 'bekor_qilingan', 'uchdi', 'qondi'];
  const holatSanlar = holatlar.map(h => parvozlar.filter(p => p.holat === h).length);

  const pieData = {
    labels: ['Rejalashtirilgan', 'Kechikkan', 'Bekor qilingan', 'Uchdi', "Qo'ndi"],
    datasets: [{
      data: holatSanlar,
      backgroundColor: ['#00d4ff', '#ff6b35', '#ff5050', '#32ff64', '#aaaaaa'],
      borderWidth: 0,
    }]
  };

  // Yo'nalishlar bo'yicha parvozlar (Bar chart)
  const yonalishlar = {};
  parvozlar.forEach(p => {
    const key = p.qayerga;
    yonalishlar[key] = (yonalishlar[key] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(yonalishlar),
    datasets: [{
      label: 'Parvozlar soni',
      data: Object.values(yonalishlar),
      backgroundColor: '#00d4ff44',
      borderColor: '#00d4ff',
      borderWidth: 1,
    }]
  };

  // Chipta sinflari (Pie chart)
  const sinflar = ['economy', 'business', 'first'];
  const sinfSanlar = sinflar.map(s => chiptalar.filter(c => c.sinf === s).length);

  const sinfData = {
    labels: ['Economy', 'Business', 'First Class'],
    datasets: [{
      data: sinfSanlar,
      backgroundColor: ['#00d4ff', '#ff6b35', '#32ff64'],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: '#e8f4fd', font: { family: 'Rajdhani' } } }
    }
  };

  const barOptions = {
    plugins: {
      legend: { labels: { color: '#e8f4fd' } }
    },
    scales: {
      x: { ticks: { color: '#8aa5c0' }, grid: { color: '#1a3a5c' } },
      y: { ticks: { color: '#8aa5c0' }, grid: { color: '#1a3a5c' } }
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">STATISTIKA</h1>
      <p className="page-subtitle">Aeroport ko'rsatkichlari</p>

      {/* Umumiy raqamlar */}
      <div className="stats-section" style={{ marginBottom: '3rem', background: 'transparent', gap: '1.5rem', border: 'none' }}>
        {[
          { label: 'Jami parvozlar', value: parvozlar.length, color: '#00d4ff' },
          { label: 'Jami xizmatlar', value: xizmatlar.length, color: '#ff6b35' },
          { label: 'Jami chiptalar', value: chiptalar.length, color: '#32ff64' },
          { label: 'Faol parvozlar', value: parvozlar.filter(p => p.holat === 'rejalashtirilgan').length, color: '#00d4ff' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ border: '1px solid #1a3a5c' }}>
            <span className="stat-number" style={{ color: s.color }}>{s.value}</span>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grafiklar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

        <div style={{ background: '#0d1f35', border: '1px solid #1a3a5c', padding: '2rem' }}>
          <h3 style={{ fontFamily: 'Orbitron', color: '#00d4ff', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '2px' }}>
            PARVOZ HOLATLARI
          </h3>
          <Pie data={pieData} options={chartOptions} />
        </div>

        <div style={{ background: '#0d1f35', border: '1px solid #1a3a5c', padding: '2rem' }}>
          <h3 style={{ fontFamily: 'Orbitron', color: '#00d4ff', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '2px' }}>
            CHIPTA SINFLARI
          </h3>
          <Pie data={sinfData} options={chartOptions} />
        </div>

        <div style={{ background: '#0d1f35', border: '1px solid #1a3a5c', padding: '2rem', gridColumn: 'span 2' }}>
          <h3 style={{ fontFamily: 'Orbitron', color: '#00d4ff', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '2px' }}>
            YO'NALISHLAR BO'YICHA PARVOZLAR
          </h3>
          <Bar data={barData} options={barOptions} />
        </div>

      </div>
    </div>
  );
}

export default Statistika;