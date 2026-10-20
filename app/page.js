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
  PanelSimpleCalc,
} from './components/Calculators';

// 3 Folders Structure (Cleaned without badge tags)
const folderCategories = [
  {
    id: 'panels',
    title: '1. Panels Calculators',
    description: 'Infill panel calculations, single bar spacing, hoop configurations, and wall-fixing bar limits.',
    calculators: [
      { id: 'panel_simple', title: 'Simple Panel Spacing', desc: 'Panel length, bar diameter, and clear gaps.' },
      { id: 'panel_simple2', title: 'Simple Panel 2', desc: 'Custom pitch and bar dimensions.' },
      { id: 'panel_bar_hoop_bar', title: 'Bar-Hoop-Bar Panel', desc: 'Alternating bar and hoop arrangements.' },
      { id: 'panel_hoop_bar_hoop', title: 'Hoop-Bar-Hoop Panel', desc: 'Double hoop pattern spacing.' },
      { id: 'panel_bar_hoop', title: 'Bar-Hoop Standard', desc: 'Hoop diameter and bar offsets.' },
      { id: 'panel_bar_bar_bar', title: 'Bar-Bar-Bar Panel', desc: 'Triple bar repeating pattern.' },
      { id: 'panel_bar_bar_wall', title: 'Bar-Bar-Wall Panel', desc: 'End wall fixing offset calculator.' },
    ],
  },
  {
    id: 'balustrades',
    title: '2. Balustrades Calculators',
    description: 'Complete stair fabrication suite: pitch angles, riser heights, balustrades, material costs, and labor tracking.',
    calculators: [
      { id: 'workers', title: 'Workers & Cost Tracker', desc: 'Site worker hourly rates and labor totals.' },
      { id: 'cncmat', title: 'CNC Material Tracker', desc: 'Sheet dimensions, mass, and pricing.' },
      { id: 'cnctime', title: 'CNC Time Tracker', desc: 'Machining run times and operational cost.' },
      { id: 'fasteners', title: 'Fastener Cost Tracker', desc: 'M12 CSK, nuts, and washer pricing.' },
      { id: 'partlist', title: 'Part List Tracker', desc: 'RHS and structural metal components.' },
      { id: 'stairparts', title: 'Stair Part Cost Tracker', desc: 'Treads, hanging plates, and stringers.' },
      { id: 'rising', title: 'CALC - Step Rising', desc: 'Riser height and UK Regs check.' },
      { id: 'makeups', title: 'CALC - Step Rising Makeups', desc: 'Screed and top/bottom makeup heights.' },
      { id: 'risegoing', title: 'CALC - Stair Rise & Going', desc: 'Overall stair length and step diagonal.' },
      { id: 'angle', title: 'CALC - Going & Angle', desc: 'Pitch angle and riser correlation.' },
      { id: 'balustrade', title: 'CALC - Balustrade Spacing', desc: 'Bar spacing under 100mm regulation.' },
      { id: 'regulations', title: 'Building Regulations', desc: 'Approved Document K standard reference.' },
    ],
  },
  {
    id: 'mats',
    title: '3. Mats Calculators',
    description: 'Entrance matting frameworks, frame dimensions, and threshold trim calculations.',
    calculators: [
      { id: 'mats_placeholder', title: 'Mat Frame Calculator', desc: 'Matting perimeter and tray depth.' },
    ],
  },
];

export default function Home() {
  const { isSignedIn } = useAuth();
  const [activeCalc, setActiveCalc] = useState(null);
  const [openFolderId, setOpenFolderId] = useState('balustrades');
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const [projectData, setProjectData] = useState({
    projectName: 'Stairs & Metalwork Suite',
    customerName: 'Burvills',
    customerPhone: '07123 456789',
    customerEmail: 'contact@burvills.co.uk',
    postcode: 'SW1A 1AA',
    finishDate: '2026-12-15',
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
      { id: 1, component: 'CSK M12', qty: 78, price: 0.45 },
      { id: 2, component: 'Hex Nut M12', qty: 78, price: 0.12 },
    ],
    parts: [{ id: 1, part: 'RHS 40x40x1200', qty: 4, price: 4.55 }],
    stairParts: [
      { id: 1, part: 'Tread', qty: 17, price: 88.00 },
      { id: 2, part: 'Hanging Plate', qty: 1, price: 94.00 },
    ],
  });

  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/project')
        .then((res) => res.json())
        .then((res) => {
          if (res.data) setProjectData((prev) => ({ ...prev, ...res.data }));
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isSignedIn]);

  const updateData = (newData) => {
    setProjectData((prev) => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
  };

  const handleSaveToSupabase = async () => {
    setSaveStatus('Saving...');
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setSaveStatus('Saved! ✓');
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        const result = await response.json();
        setSaveStatus(`Save Error: ${result.error}`);
      }
    } catch (err) {
      setSaveStatus('Network Error during save');
    }
  };

  const workersCost = projectData.workers ? projectData.workers.reduce((s, w) => s + (w.perHour * w.hours), 0) : 0;
  const cncMaterialCost = projectData.materials ? projectData.materials.reduce((s, m) => s + (m.price * m.quantity), 0) : 0;
  const cncTimeCost = projectData.cuts ? projectData.cuts.reduce((s, c) => s + (c.hours * c.rate), 0) : 0;
  const fastenerCost = projectData.fasteners ? projectData.fasteners.reduce((s, f) => s + (f.qty * f.price), 0) : 0;
  const partListCost = projectData.parts ? projectData.parts.reduce((s, p) => s + (p.qty * p.price), 0) : 0;
  const stairPartCost = projectData.stairParts ? projectData.stairParts.reduce((s, p) => s + (p.qty * p.price), 0) : 0;

  const totalProjectCost = workersCost + cncMaterialCost + cncTimeCost + fastenerCost + partListCost + stairPartCost;
  const projectProfit = projectData.projectPrice - totalProjectCost;

  return (
    <main style={{ paddingBottom: '90px' }}>
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
            
            {/* Styled Clerk Profile Button to Match Theme Blue */}
            <div style={{
              borderRadius: '50%',
              backgroundColor: '#0066cc',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '32px',
                      height: '32px',
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </header>

      {!isSignedIn ? (
        <SignedOutView />
      ) : isLoading ? (
        <div style={{ padding: '20px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>Loading project data...</div>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {!activeCalc ? (
            <div className="dashboard-container" style={{ gap: '16px' }}>
              
              {/* Project Details Card */}
              <div className="card" style={{ padding: '20px', textAlign: 'left', alignItems: 'stretch' }}>
                <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '14px', textAlign: 'center', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px' }}>
                  Project Details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project Name</span>
                    <input 
                      type="text" 
                      value={projectData.projectName} 
                      onChange={(e) => updateData({ projectName: e.target.value })}
                      style={{ width: '160px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Customer</span>
                    <input 
                      type="text" 
                      value={projectData.customerName} 
                      onChange={(e) => updateData({ customerName: e.target.value })}
                      style={{ width: '160px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Telephone</span>
                    <input 
                      type="text" 
                      value={projectData.customerPhone} 
                      onChange={(e) => updateData({ customerPhone: e.target.value })}
                      style={{ width: '160px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Email</span>
                    <input 
                      type="email" 
                      value={projectData.customerEmail} 
                      onChange={(e) => updateData({ customerEmail: e.target.value })}
                      style={{ width: '160px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Postcode</span>
                    <input 
                      type="text" 
                      value={projectData.postcode} 
                      onChange={(e) => updateData({ postcode: e.target.value })}
                      style={{ width: '160px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Finish Date</span>
                    <input 
                      type="date" 
                      value={projectData.finishDate} 
                      onChange={(e) => updateData({ finishDate: e.target.value })}
                      style={{ width: '160px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project Price (£)</span>
                    <input 
                      type="number" 
                      value={projectData.projectPrice} 
                      onChange={(e) => updateData({ projectPrice: Number(e.target.value) })}
                      style={{ width: '110px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project Cost</span>
                    <span style={{ color: '#d97706', fontWeight: '600' }}>£{totalProjectCost.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Profit</span>
                    <span style={{ color: projectProfit >= 0 ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
                      £{projectProfit.toFixed(2)}
                    </span>
                  </div>

                </div>
              </div>

              {/* VERTICAL STACK OF FOLDER CARDS */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '14px', color: '#475569', fontWeight: '600', textAlign: 'left' }}>
                  Calculator Suites:
                </h3>

                {folderCategories.map((folder) => {
                  const isOpen = openFolderId === folder.id;
                  return (
                    <div 
                      key={folder.id} 
                      className="card" 
                      style={{ 
                        padding: '16px', 
                        textAlign: 'left', 
                        alignItems: 'stretch',
                        border: isOpen ? '1px solid #0066cc' : '1px solid #e1e4e8',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div 
                        onClick={() => setOpenFolderId(isOpen ? null : folder.id)}
                        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h2 style={{ fontSize: '16px', color: '#0f172a', margin: '0' }}>
                            {folder.title}
                          </h2>
                          <span style={{ fontSize: '12px', color: '#0066cc', fontWeight: '600' }}>
                            {isOpen ? '▲ View Calculators' : '▼ View Calculators'}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', marginTop: '4px' }}>
                          {folder.description}
                        </p>
                      </div>

                      {isOpen && (
                        <div style={{ 
                          marginTop: '12px', 
                          borderTop: '1px solid #e2e8f0', 
                          paddingTop: '12px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '6px' 
                        }}>
                          {folder.calculators.map((calc) => (
                            <div
                              key={calc.id}
                              onClick={() => setActiveCalc(calc.id)}
                              style={{
                                padding: '10px 12px',
                                borderRadius: '6px',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0066cc' }}>{calc.title}</div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{calc.desc}</div>
                              </div>
                              <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* Selected Calculator View */
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <button className="btn btn-secondary" onClick={() => setActiveCalc(null)}>
                ← Back to Menu
              </button>

              {/* PANELS CALCULATORS */}
              {activeCalc === 'panel_simple' && <PanelSimpleCalc />}
              {activeCalc.startsWith('panel_') && activeCalc !== 'panel_simple' && <PanelSimpleCalc />}

              {/* BALUSTRADES CALCULATORS */}
              {activeCalc === 'workers' && <WorkersCostTracker workers={projectData.workers} onUpdate={(workers) => updateData({ workers })} />}
              {activeCalc === 'cncmat' && <CNCMaterialTracker materials={projectData.materials} onUpdate={(materials) => updateData({ materials })} />}
              {activeCalc === 'cnctime' && <CNCTimeTracker cuts={projectData.cuts} onUpdate={(cuts) => updateData({ cuts })} />}
              {activeCalc === 'fasteners' && <FastenerCostTracker fasteners={projectData.fasteners} onUpdate={(fasteners) => updateData({ fasteners })} />}
              {activeCalc === 'partlist' && <PartListCostTracker parts={projectData.parts} onUpdate={(parts) => updateData({ parts })} />}
              {activeCalc === 'stairparts' && <PartListStairCostTracker stairParts={projectData.stairParts} onUpdate={(stairParts) => updateData({ stairParts })} />}
              {activeCalc === 'rising' && <StepRisingCalc />}
              {activeCalc === 'makeups' && <StepRisingMakeUpsCalc />}
              {activeCalc === 'risegoing' && <StairRiseGoingCalc />}
              {activeCalc === 'angle' && <TreadGoingAngleCalc />}
              {activeCalc === 'balustrade' && <StairBalustradeCalc />}
              {activeCalc === 'regulations' && <StairBuildingRegulationsCalc />}

              {/* MATS CALCULATOR */}
              {activeCalc === 'mats_placeholder' && (
                <div className="card">
                  <h2>Mat Frame Calculator</h2>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>Mats module structure prepared for input values.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Save Notification Bar */}
      {(hasUnsavedChanges || saveStatus) && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#1e293b', color: '#ffffff', padding: '10px 18px', borderRadius: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '12px',
          zIndex: 1000, fontSize: '13px', width: '90%', maxWidth: '380px', justifyContent: 'space-between'
        }}>
          <span>{saveStatus || 'Unsaved changes'}</span>
          <button
            onClick={handleSaveToSupabase}
            style={{
              backgroundColor: '#0066cc', color: '#ffffff', border: 'none', borderRadius: '14px',
              padding: '6px 14px', fontWeight: '600', cursor: 'pointer', fontSize: '12px'
            }}
          >
            Save Project
          </button>
        </div>
      )}
    </main>
  );
}