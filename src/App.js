import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Parvozlar from './pages/Parvozlar';
import Xizmatlar from './pages/Xizmatlar';
import Bron from './pages/Bron';
import Statistika from './pages/Statistika';
import Login from './pages/Login';
import './App.css';
import Register from './pages/Register';

// 🔒 Himoya komponenti
function PrivateRoute({ children }) {
  const token = localStorage.getItem('access');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Ochiq sahifalar */}
          <Route path="/" element={<Home />} />
          <Route path="/parvozlar" element={<Parvozlar />} />
          <Route path="/xizmatlar" element={<Xizmatlar />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 Himoyalangan sahifalar */}
          <Route path="/bron" element={
            <PrivateRoute><Bron /></PrivateRoute>
          } />
          <Route path="/statistika" element={
            <PrivateRoute><Statistika /></PrivateRoute>
          } />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;