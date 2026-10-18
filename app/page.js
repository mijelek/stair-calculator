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
  { id: 'workers', title: 'Workers and Cost Tracker', desc: 'Manage site worker hours and totals.' },
  { id: 'cncmat', title: 'CNC Cutting Material Tracker', desc: 'Sheet dimensions, mass, and density.' },
  { id: 'cnctime', title: 'CNC Cutting Time Tracker', desc: 'Machining run times and operational costs.' },
  { id: 'workers', title: 'Working Hours Cost Tracker', desc: 'Track hourly rates and total labor expenses.' },
  { id: 'fasteners', title: 'Fastener Cost Tracker', desc: 'Fastener quantities and pricing.' },
  { id: 'rising', title: 'CALC-Step Rising', desc: 'Step riser heights & UK Regs compliance.' },
  { id: 'makeups', title: 'CALC-Step Rising with Make Ups', desc: 'Screed and makeup height adjustments.' },
  { id: 'risegoing', title: 'CALC-Stair Calculator', desc: 'Calculate overall stair rise and going.' },
  { id: 'angle', title: 'CALC-Stair Calculator 2', desc: 'Calculate step rise using going and pitch angle.' },
  { id: 'balustrade', title: 'CALC-Stair Balustrade', desc: 'Bar spacing and geometric delta values.' },
];

export default function Home() {
  const { isSignedIn } = useAuth();
  const [activeCalc, setActiveCalc] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // 0: Project Details, 1: Navigation List

  return (
    <main>
      <header>
        <h1>Stair Calc</h1>
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
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Card Container */}
              {currentPage === 0 ? (
                /* Page 1: Project Details */
                <div className="card" style={{ padding: '20px', textAlign: 'left', alignItems: 'stretch' }}>
                  <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '14px', textAlign: 'center', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px' }}>
                    Project Details
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Project</span>
                      <span style={{ color: '#1e293b' }}>Stairs with Balustrade[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Customer</span>
                      <span style={{ color: '#1e293b' }}>Burvills[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Telephone</span>
                      <span style={{ color: '#1e293b' }}>01932 589666[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Email</span>
                      <span style={{ color: '#1e293b', fontSize: '12px' }}>enquiries@burvills.co.uk[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Address</span>
                      <span style={{ color: '#1e293b', textAlign: 'right', maxWidth: '60%', fontSize: '12px' }}>Sandown Industrial Park, Mill Rd, Esher KT10 8BL[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Finish Date</span>
                      <span style={{ color: '#1e293b' }}>28/10/2026[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Days to Finish Date</span>
                      <span style={{ color: '#1e293b' }}>10[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Project Price</span>
                      <span style={{ color: '#0066cc', fontWeight: '600' }}>£27,000.00[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Project Cost</span>
                      <span style={{ color: '#1e293b' }}>£2,765.23[cite: 1]</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
                      <span style={{ fontWeight: '600', color: '#64748b' }}>Profit</span>
                      <span style={{ color: '#16a34a', fontWeight: '600' }}>£24,234.77[cite: 1]</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Page 2: Navigation List of Sheets */
                <div className="card" style={{ padding: '0px', overflow: 'hidden', textAlign: 'left', alignItems: 'stretch' }}>
                  <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e1e4e8', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '15px', color: '#1e293b' }}>Navigation: List of Sheets[cite: 1]</h2>
                  </div>
                  {calculatorList.map((calc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveCalc(calc.id)}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: idx < calculatorList.length - 1 ? '1px solid #e1e4e8' : 'none',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ fontSize: '13px', color: '#0066cc', fontWeight: '500' }}>{calc.title}</span>
                      <span style={{ color: '#94a3b8' }}>→</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                <span
                  onClick={() => setCurrentPage(0)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: currentPage === 0 ? '#0066cc' : '#cbd5e1',
                    cursor: 'pointer',
                  }}
                />
                <span
                  onClick={() => setCurrentPage(1)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: currentPage === 1 ? '#0066cc' : '#cbd5e1',
                    cursor: 'pointer',
                  }}
                />
              </div>

            </div>
          ) : (
            /* Selected Calculator View */
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setActiveCalc(null)}
                style={{ marginBottom: '4px' }}
              >
                ← Back to Menu
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