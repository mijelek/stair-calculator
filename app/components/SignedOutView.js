// app/components/SignedOutView.js
'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const calculators = [
  { title: 'Step Rising', desc: 'Simple step rising calculations.' },
  { title: 'Step Rising (Make Ups)', desc: 'Calculations with screed and makeup.' },
  { title: 'Stair Rise & Going', desc: 'Calculate rise and going dimensions.' },
  { title: 'Tread Going & Angle', desc: 'Calculations using going and angle.' },
  { title: 'Stair Balustrade', desc: 'Balustrade and simple bar spacing.' },
  { title: 'Workers & Cost Tracker', desc: 'Track worker rates and total project costs.' },
  { title: 'CNC Material & Time', desc: 'Track materials, density, and CNC cutting times.' },
];

export default function SignedOutView() {
  const { login } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) login(username);
  };

  return (
    <div>
      {!showLogin ? (
        <>
          <button className="btn" style={{ marginBottom: '16px' }} onClick={() => setShowLogin(true)}>
            Sign In
          </button>
          <div className="card-grid">
            {calculators.map((calc, idx) => (
              <div key={idx} className="card">
                <h2>{calc.title}</h2>
                <p style={{ fontSize: '13px', color: '#666' }}>{calc.desc}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>
            <button type="submit" className="btn" style={{ marginBottom: '8px' }}>Login</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowLogin(false)}>Back</button>
          </form>
        </div>
      )}
    </div>
  );
}