// app/page.js
'use client';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import SignedOutView from './components/SignedOutView';
import { StepRisingCalc, CostTrackerCalc } from './components/Calculators';

export default function Home() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('rising');

  return (
    <main>
      <header>
        <h1>Stair Calc</h1>
        {user && (
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }} onClick={logout}>
            Logout
          </button>
        )}
      </header>

      {!user ? (
        <SignedOutView />
      ) : (
        <div>
          <div className="nav-tabs">
            <button
              className={`tab-btn ${activeTab === 'rising' ? 'active' : ''}`}
              onClick={() => setActiveTab('rising')}
            >
              Step Rising
            </button>
            <button
              className={`tab-btn ${activeTab === 'costs' ? 'active' : ''}`}
              onClick={() => setActiveTab('costs')}
            >
              Cost Tracker
            </button>
          </div>

          {activeTab === 'rising' && <StepRisingCalc />}
          {activeTab === 'costs' && <CostTrackerCalc />}
        </div>
      )}
    </main>
  );
}