// app/page.js
'use client';
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  
  // Unsaved changes & Save notification state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Initial persistent project state matching sheet data
  const [projectData, setProjectData] = useState({
    projectName: 'Stairs with Balustrade',
    customerName: 'Burvills',
    projectPrice: 27000,
    workers: [
      { id: 1, name: 'Oliver Bennet', position: 'Manager', perHour: 56.00, hours: 0 },
      { id: 2, name: 'Eleanor Davis', position: '3D Designer', perHour: 42.00, hours: 0 },
      { id: 3, name: 'Callum Wright', position: 'Programmer', perHour: 35.00, hours: 8.25 },
      { id: 4, name: 'Gemma Forest', position: 'CNC Operator', perHour: 20.00, hours: 5.00 },
      { id: 5, name: 'Arthur Pendelton', position: 'Fabricator', perHour: 37.00, hours: 12.2 },
      { id: 6, name: 'Fiona Higgins', position: 'Site Fitter', perHour: 35.00, hours: 0 },
      { id: 7, name: 'Thomas Sterling', position: 'Welder', perHour: 35.00, hours: 11.33 },
      { id: 8, name: 'Julian Fletcher', position: 'Driver', perHour: 24.00, hours: 2.62 },
      { id: 9, name: 'Imogen Clarke', position: 'Drafter', perHour: 18.45, hours: 6.75 },
    ],
    materials: [
      { id: 1, width: 3000, height: 2000, thickness: 10, material: 'Polypropylene', price: 450, quantity: 1 },
      { id: 2, width: 3000, height: 1500, thickness: 4, material: 'S235 Mild Steel', price: 250, quantity: 2 },
    ],
    cuts: [
      { id: 1, dimensions: '3000x1500x10', hours: 9.33, rate: 25.00 },
      { id: 2, dimensions: '3000x1500x4', hours: 1.50, rate: 25.00 },
    ],
    fasteners: [
      { id: 1, component: 'CSK M12 (40mm)', qty: 78, price: 0.45 },
      { id: 2, component: 'Hex Nut M12', qty: 78, price: 0.12 },
      { id: 3, component: 'Plain Washer M12', qty: 78, price: 0.08 },
      { id: 4, component: 'Spring Washer M12', qty: 78, price: 0.08 },
      { id: 5, component: 'CSK M6 (20mm)', qty: 76, price: 0.10 },
    ],
    parts: [
      { id: 1, part: 'RHS 40x40x1200', qty: 4, price: 4.55 },
    ],
    stairParts: [
      { id: 1, part: 'Tread', qty: 17, price: 88.00 },
      { id: 2, part: 'Hanging Plate', qty: 1, price: 94.00 },
      { id: 3, part: 'Bottom Stringer Fixing Plate', qty: 2, price: 50.00 },
      { id: 4, part: 'Bar Ornamental Gallery', qty: 13, price: 11.00 },
      { id: 5, part: 'Bar Ornamental Stair 1', qty: 9, price: 11.00 },
      { id: 6, part: 'Bar Ornamental Stair 2', qty: 8, price: 11.00 },
      { id: 7, part: 'Bar Ornamental Stair 3', qty: 8, price: 11.00 },
      { id: 8, part: 'Stringer OUT', qty: 1, price: 120.00 },
      { id: 9, part: 'Stringer IN', qty: 1, price: 120.00 },
      { id: 10, part: 'Riser 1', qty: 1, price: 4.00 },
      { id: 11, part: 'Bar Gallery', qty: 13, price: 5.00 },
      { id: 12, part: 'Bar Stair 1', qty: 9, price: 5.00 },
      { id: 13, part: 'Bar Stair 2', qty: 8, price: 5.00 },
      { id: 14, part: 'Bar Stair 3', qty: 8, price: 5.00 },
      { id: 15, part: 'FLT 20x12 Wall Fixing', qty: 1, price: 12.00 },
      { id: 16, part: 'FLT 20x12 Gallery', qty: 1, price: 25.00 },
      { id: 17, part: 'FLT 20x12 Stairs', qty: 1, price: 30.00 },
    ],
  });

  // Load user data from Supabase on load
  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/project')
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setProjectData((prev) => ({ ...prev, ...res.data }));
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isSignedIn]);

  // Helper to update local state and mark unsaved
  const updateData = (newData) => {
    setProjectData((prev) => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
  };

  // Manual save to Supabase
  const handleSaveToSupabase = async () => {
    setSaveStatus('Saving...');
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();
      if (response.ok) {
        setSaveStatus('Saved! ✓');
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus(`Save Error: ${result.error}`);
      }
    } catch (err) {
      setSaveStatus('Network Error during save');
    }
  };

  // Calculations derived directly from stored lists
  const workersCost = projectData.workers ? projectData.workers.reduce((s, w) => s + (w.perHour * w.hours), 0) : 0;
  const cncMaterialCost = projectData.materials ? projectData.materials.reduce((s, m) => s + (m.price * m.quantity), 0) : 0;
  const cncTimeCost = projectData.cuts ? projectData.cuts.reduce((s, c) => s + (c.hours * c.rate), 0) : 0;
  const fastenerCost = projectData.fasteners ? projectData.fasteners.reduce((s, f) => s + (f.qty * f.price), 0) : 0;
  const partListCost = projectData.parts ? projectData.parts.reduce((s, p) => s + (p.qty * p.price), 0) : 0;
  const stairPartCost = projectData.stairParts ? projectData.stairParts.reduce((s, p) => s + (p.qty * p.price), 0) : 0;

  const totalProjectCost = workersCost + cncMaterialCost + cncTimeCost + fastenerCost + partListCost + stairPartCost;
  const projectProfit = projectData.projectPrice - totalProjectCost;

  return (
    <main style={{ paddingBottom: '80px' }}>
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
      ) : isLoading ? (
        <div style={{ padding: '20px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>Loading project data...</div>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!activeCalc ? (
            <div className="dashboard-container">
              
              {/* Card 1: Complete Project Details Summary */}
              <div className="card" style={{ padding: '20px', textAlign: 'left', alignItems: 'stretch' }}>
                <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '14px', textAlign: 'center', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px' }}>
                  Project Details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project</span>
                    <span style={{ color: '#1e293b' }}>{projectData.projectName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Customer</span>
                    <span style={{ color: '#1e293b' }}>{projectData.customerName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project Price (£)</span>
                    <input 
                      type="number" 
                      value={projectData.projectPrice} 
                      onChange={(e) => updateData({ projectPrice: Number(e.target.value) })}
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

              {/* Card 2: Navigation List of All 13 Calculators */}
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
                    }}
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

              {activeCalc === 'workers' && (
                <WorkersCostTracker 
                  workers={projectData.workers} 
                  onUpdate={(workers) => updateData({ workers })} 
                />
              )}
              {activeCalc === 'cncmat' && (
                <CNCMaterialTracker 
                  materials={projectData.materials} 
                  onUpdate={(materials) => updateData({ materials })} 
                />
              )}
              {activeCalc === 'cnctime' && (
                <CNCTimeTracker 
                  cuts={projectData.cuts} 
                  onUpdate={(cuts) => updateData({ cuts })} 
                />
              )}
              {activeCalc === 'workinghours' && (
                <WorkersCostTracker 
                  workers={projectData.workers} 
                  onUpdate={(workers) => updateData({ workers })} 
                />
              )}
              {activeCalc === 'fasteners' && (
                <FastenerCostTracker 
                  fasteners={projectData.fasteners} 
                  onUpdate={(fasteners) => updateData({ fasteners })} 
                />
              )}
              {activeCalc === 'partlist' && (
                <PartListCostTracker 
                  parts={projectData.parts} 
                  onUpdate={(parts) => updateData({ parts })} 
                />
              )}
              {activeCalc === 'stairparts' && (
                <PartListStairCostTracker 
                  stairParts={projectData.stairParts} 
                  onUpdate={(stairParts) => updateData({ stairParts })} 
                />
              )}
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

      {/* Floating Save Notification Bar */}
      {(hasUnsavedChanges || saveStatus) && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1e293b',
          color: '#ffffff',
          padding: '10px 18px',
          borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          fontSize: '13px',
          width: '90%',
          maxWidth: '380px',
          justifyContent: 'space-between'
        }}>
          <span>{saveStatus || 'Unsaved changes'}</span>
          <button
            onClick={handleSaveToSupabase}
            style={{
              backgroundColor: '#0066cc',
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px',
              padding: '6px 14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Save Project
          </button>
        </div>
      )}
    </main>
  );
}