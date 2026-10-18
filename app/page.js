// app/page.js
'use client';
import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import SignedOutView from './components/SignedOutView';
import {
  StepRisingCalc,
  StepRisingMakeUpsCalc,
  StairRiseGoingCalc,
  TreadGoingAngleCalc,
  StairBalustradeCalc,
  WorkersCostTracker,
  CNCMaterialTracker,
  CNCTimeTracker,
  FastenerCostTracker,
} from './components/Calculators';

const calculatorList = [
  { id: 'rising', title: 'Step Rising', desc: 'Step riser heights & UK Regs compliance.' },
  { id: 'makeups', title: 'Make Ups', desc: 'Screed and makeup height adjustments.' },
  { id: 'risegoing', title: 'Rise & Going', desc: 'Calculate overall stair rise and going.' },
  { id: 'angle', title: 'Going & Angle', desc: 'Calculate step rise using going and pitch angle.' },
  { id: 'balustrade', title: 'Balustrade', desc: 'Bar spacing and geometric delta values.' },
  { id: 'workers', title: 'Workers Cost', desc: 'Track worker hours and labor totals.' },
  { id: 'cncmat', title: 'CNC Material', desc: 'Calculate sheet mass, thickness, and density.' },
  { id: 'cnctime', title: 'CNC Time', desc: 'Calculate CNC machining times and costs.' },
  { id: 'fasteners', title: 'Fasteners', desc: 'Track fastener quantities and pricing totals.' },
];

export default function Home() {
  const { isSignedIn } = useAuth();
  const [activeCalc, setActiveCalc] = useState(null);

  return (
    <main>
      <header>
        <h1>Stair Calculator</h1>
        {isSignedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeCalc && (
              <button 
                className="btn btn-secondary" 
                style={{ width: 'auto', padding: '6px 10px', fontSize: '12px' }}
                onClick={() => setActiveCalc(null)}
              >
                ← Menu
              </button>
            )}
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </header>

      {!isSignedIn ? (
        <SignedOutView />
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!activeCalc ? (
            /* Single Card Navigation List with Line Breaks */
            <div className="card" style={{ padding: '0px', overflow: 'hidden', textAlign: 'left', alignItems: 'stretch' }}>
              {calculatorList.map((calc, idx) => (
                <div
                  key={calc.id}
                  onClick={() => setActiveCalc(calc.id)}
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderBottom: idx < calculatorList.length - 1 ? '1px solid #e1e4e8' : 'none',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <h2 style={{ fontSize: '15px', color: '#0066cc', marginBottom: '4px' }}>{calc.title}</h2>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>{calc.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            /* Selected Calculator View */
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setActiveCalc(null)}
                style={{ marginBottom: '4px' }}
              >
                ← Back to Calculator Menu
              </button>

              {activeCalc === 'rising' && <StepRisingCalc />}
              {activeCalc === 'makeups' && <StepRisingMakeUpsCalc />}
              {activeCalc === 'risegoing' && <StairRiseGoingCalc />}
              {activeCalc === 'angle' && <TreadGoingAngleCalc />}
              {activeCalc === 'balustrade' && <StairBalustradeCalc />}
              {activeCalc === 'workers' && <WorkersCostTracker />}
              {activeCalc === 'cncmat' && <CNCMaterialTracker />}
              {activeCalc === 'cnctime' && <CNCTimeTracker />}
              {activeCalc === 'fasteners' && <FastenerCostTracker />}
            </div>
          )}
        </div>
      )}
    </main>
  );
}