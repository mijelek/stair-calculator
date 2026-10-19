// app/page.js
'use client';
import { useState } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import SignedOutView from './components/SignedOutView';
import {
  WorkersCostTracker,
  CNCMaterialTracker,
  CNCTimeTracker,
  FastenerCostTracker,
  PartListCostTracker,
  PartListStairCostTracker,
  StepRisingCalc,
  StepRisingMakeUpsCalc,
  StairRiseGoingCalc,
  TreadGoingAngleCalc,
  StairBalustradeCalc,
  StairBuildingRegulationsCalc,
} from './components/Calculators';

const calculatorList = [
  { id: 'workers', title: 'Workers and Cost Tracker', desc: 'Manage site worker rates and totals.' },
  { id: 'cncmat', title: 'CNC Cutting Material Tracker', desc: 'Sheet dimensions, mass, and density.' },
  { id: 'cnctime', title: 'CNC Cutting Time Tracker', desc: 'Machining run times and operational costs.' },
  { id: 'workinghours', title: 'Working Hours Cost Tracker', desc: 'Track hourly rates and total labor expenses.' },
  { id: 'fasteners', title: 'Fastener Cost Tracker', desc: 'Fastener quantities and pricing.' },
  { id: 'partlist', title: 'Part List Cost Tracker', desc: 'Track minor components and parts.' },
  { id: 'stairparts', title: 'Part List Stair Cost Tracker', desc: 'Main part lists, treads, plates, and galleries.' },
  { id: 'rising', title: 'CALC-Step Rising', desc: 'Step riser heights & UK Regs compliance.' },
  { id: 'makeups', title: 'CALC-Step Rising with Make Ups', desc: 'Screed and makeup height adjustments.' },
  { id: 'risegoing', title: 'CALC-Stair Calculator', desc: 'Overall stair rise and going.' },
  { id: 'angle', title: 'CALC-Stair Calculator 2', desc: 'Going and pitch angle.' },
  { id: 'balustrade', title: 'CALC-Stair Balustrade', desc: 'Bar spacing and geometric delta values.' },
  { id: 'regulations', title: 'Stair Building Regulations', desc: 'Approved Document K code standards.' },
];

export default function Home() {
  const { isSignedIn } = useAuth();
  const [activeCalc, setActiveCalc] = useState(null);

  // Shared state fed from calculators
  const [projectPrice, setProjectPrice] = useState(27000);
  const [workersCost, setWorkersCost] = useState(1424.15);
  const [cncMaterialCost, setCncMaterialCost] = useState(950.00);
  const [cncTimeCost, setCncTimeCost] = useState(308.33);
  const [fastenerCost, setFastenerCost] = useState(64.54);
  const [partListCost, setPartListCost] = useState(18.20);
  const [stairPartCost, setStairPartCost] = useState(2609.00);

  const totalProjectCost = workersCost + cncMaterialCost + cncTimeCost + fastenerCost + partListCost + stairPartCost;
  const projectProfit = projectPrice - totalProjectCost;

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
            <div className="dashboard-container">
              
              {/* Card 1: Project Details */}
              <div className="card" style={{ padding: '20px', textAlign: 'left', alignItems: 'stretch' }}>
                <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '14px', textAlign: 'center', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px' }}>
                  Project Details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project</span>
                    <span style={{ color: '#1e293b' }}>Stairs with Balustrade</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Customer</span>
                    <span style={{ color: '#1e293b' }}>Burvills</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project Price (£)</span>
                    <input 
                      type="number" 
                      value={projectPrice} 
                      onChange={(e) => setProjectPrice(Number(e.target.value))}
                      style={{ width: '110px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Total Project Cost</span>
                    <span style={{ color: '#d97706', fontWeight: '600' }}>£{totalProjectCost.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Profit</span>
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>£{projectProfit.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Navigation List of Sheets (All 13) */}
              <div className="card" style={{ padding: '0px', overflow: 'hidden', textAlign: 'left', alignItems: 'stretch' }}>
                <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e1e4e8', textAlign: 'center' }}>
                  <h2 style={{ fontSize: '15px', color: '#1e293b' }}>Navigation: List of Sheets ({calculatorList.length})</h2>
                </div>
                {calculatorList.map((calc, idx) => (
                  <div
                    key={calc.id}
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
                    <div>
                      <span style={{ fontSize: '13px', color: '#0066cc', fontWeight: '500', display: 'block' }}>{calc.title}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{calc.desc}</span>
                    </div>
                    <span style={{ color: '#94a3b8' }}>→</span>
                  </div>
                ))}
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

              {activeCalc === 'workers' && <WorkersCostTracker onUpdateCost={setWorkersCost} />}
              {activeCalc === 'cncmat' && <CNCMaterialTracker onUpdateCost={setCncMaterialCost} />}
              {activeCalc === 'cnctime' && <CNCTimeTracker onUpdateCost={setCncTimeCost} />}
              {activeCalc === 'workinghours' && <WorkersCostTracker onUpdateCost={setWorkersCost} />}
              {activeCalc === 'fasteners' && <FastenerCostTracker onUpdateCost={setFastenerCost} />}
              {activeCalc === 'partlist' && <PartListCostTracker onUpdateCost={setPartListCost} />}
              {activeCalc === 'stairparts' && <PartListStairCostTracker onUpdateCost={setStairPartCost} />}
              {activeCalc === 'rising' && <StepRisingCalc />}
              {activeCalc === 'makeups' && <StepRisingMakeUpsCalc />}
              {activeCalc === 'risegoing' && <StairRiseGoingCalc />}
              {activeCalc === 'angle' && <TreadGoingAngleCalc />}
              {activeCalc === 'balustrade' && <StairBalustradeCalc />}
              {activeCalc === 'regulations' && <StairBuildingRegulationsCalc />}
            </div>
          )}
        </div>
      )}
    </main>
  );
}