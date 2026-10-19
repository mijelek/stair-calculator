// app/components/Calculators.js
'use client';
import { useState, useEffect } from 'react';

// --- 1. WORKERS & COST TRACKER ---
export function WorkersCostTracker({ onUpdateCost }) {
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Oliver Bennet', position: 'Manager', perHour: 56.00, hours: 0 },
    { id: 2, name: 'Eleanor Davis', position: '3D Designer', perHour: 42.00, hours: 0 },
    { id: 3, name: 'Callum Wright', position: 'Programmer', perHour: 35.00, hours: 8.25 },
    { id: 4, name: 'Gemma Forest', position: 'CNC Operator', perHour: 20.00, hours: 5.00 },
    { id: 5, name: 'Arthur Pendelton', position: 'Fabricator', perHour: 37.00, hours: 12.2 },
    { id: 6, name: 'Fiona Higgins', position: 'Site Fitter', perHour: 35.00, hours: 0 },
    { id: 7, name: 'Thomas Sterling', position: 'Welder', perHour: 35.00, hours: 11.33 },
    { id: 8, name: 'Julian Fletcher', position: 'Driver', perHour: 24.00, hours: 2.62 },
    { id: 9, name: 'Imogen Clarke', position: 'Drafter', perHour: 18.45, hours: 6.75 },
  ]);

  const totalCost = workers.reduce((sum, w) => sum + (w.perHour * w.hours), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  const updateWorker = (id, field, value) => {
    setWorkers(workers.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const addWorker = () => {
    setWorkers([...workers, { id: Date.now(), name: 'New Worker', position: 'General', perHour: 20.00, hours: 0 }]);
  };

  const deleteWorker = (id) => {
    setWorkers(workers.filter(w => w.id !== id));
  };

  return (
    <div className="card">
      <h2>Workers and Cost Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '6px' }}>Name</th>
              <th style={{ padding: '6px' }}>Position</th>
              <th style={{ padding: '6px' }}>£/Hr</th>
              <th style={{ padding: '6px' }}>Hours</th>
              <th style={{ padding: '6px' }}>Total (£)</th>
              <th style={{ padding: '6px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(w => (
              <tr key={w.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={w.name} onChange={(e) => updateWorker(w.id, 'name', e.target.value)} style={{ width: '90px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={w.position} onChange={(e) => updateWorker(w.id, 'position', e.target.value)} style={{ width: '80px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={w.perHour} onChange={(e) => updateWorker(w.id, 'perHour', Number(e.target.value))} style={{ width: '50px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={w.hours} onChange={(e) => updateWorker(w.id, 'hours', Number(e.target.value))} style={{ width: '50px' }} />
                </td>
                <td style={{ padding: '4px', fontWeight: 'bold', color: '#0066cc' }}>
                  £{(w.perHour * w.hours).toFixed(2)}
                </td>
                <td style={{ padding: '4px' }}>
                  <button onClick={() => deleteWorker(w.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addWorker} className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', padding: '6px 12px' }}>+ Add Row</button>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Labor Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 2. CNC CUTTING MATERIAL TRACKER ---
export function CNCMaterialTracker({ onUpdateCost }) {
  const [materials, setMaterials] = useState([
    { id: 1, width: 3000, height: 2000, thickness: 10, material: 'Polypropylene', price: 450, quantity: 1 },
    { id: 2, width: 3000, height: 1500, thickness: 4, material: 'S235 Mild Steel', price: 250, quantity: 2 },
  ]);

  const totalCost = materials.reduce((sum, m) => sum + (m.price * m.quantity), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  const updateMaterial = (id, field, value) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addMaterial = () => {
    setMaterials([...materials, { id: Date.now(), width: 2400, height: 1200, thickness: 3, material: 'S275 Mild Steel', price: 150, quantity: 1 }]);
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className="card">
      <h2>CNC Cutting Material Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Material</th>
              <th style={{ padding: '4px' }}>Price (£)</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Total</th>
              <th style={{ padding: '4px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={m.material} onChange={(e) => updateMaterial(m.id, 'material', e.target.value)} style={{ width: '100px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={m.price} onChange={(e) => updateMaterial(m.id, 'price', Number(e.target.value))} style={{ width: '50px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={m.quantity} onChange={(e) => updateMaterial(m.id, 'quantity', Number(e.target.value))} style={{ width: '40px' }} />
                </td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(m.price * m.quantity).toFixed(2)}</td>
                <td style={{ padding: '4px' }}>
                  <button onClick={() => deleteMaterial(m.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addMaterial} className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', padding: '6px 12px' }}>+ Add Row</button>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total CNC Material Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 3. CNC CUTTING TIME TRACKER ---
export function CNCTimeTracker({ onUpdateCost }) {
  const [cuts, setCuts] = useState([
    { id: 1, dimensions: '3000x1500x10', hours: 9.33, rate: 25.00 },
    { id: 2, dimensions: '3000x1500x4', hours: 1.50, rate: 25.00 },
  ]);

  const totalCost = cuts.reduce((sum, c) => sum + (c.hours * c.rate), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  const updateCut = (id, field, value) => {
    setCuts(cuts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCut = () => {
    setCuts([...cuts, { id: Date.now(), dimensions: '2400x1200x5', hours: 1.0, rate: 25.00 }]);
  };

  const deleteCut = (id) => {
    setCuts(cuts.filter(c => c.id !== id));
  };

  return (
    <div className="card">
      <h2>CNC Cutting Time Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Dimensions</th>
              <th style={{ padding: '4px' }}>Hours</th>
              <th style={{ padding: '4px' }}>Rate (£/h)</th>
              <th style={{ padding: '4px' }}>Total</th>
              <th style={{ padding: '4px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cuts.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={c.dimensions} onChange={(e) => updateCut(c.id, 'dimensions', e.target.value)} style={{ width: '100px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={c.hours} onChange={(e) => updateCut(c.id, 'hours', Number(e.target.value))} style={{ width: '45px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={c.rate} onChange={(e) => updateCut(c.id, 'rate', Number(e.target.value))} style={{ width: '45px' }} />
                </td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(c.hours * c.rate).toFixed(2)}</td>
                <td style={{ padding: '4px' }}>
                  <button onClick={() => deleteCut(c.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addCut} className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', padding: '6px 12px' }}>+ Add Row</button>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total CNC Time Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 4. FASTENER COST TRACKER ---
export function FastenerCostTracker({ onUpdateCost }) {
  const [fasteners, setFasteners] = useState([
    { id: 1, component: 'CSK M12', qty: 78, price: 0.45 },
    { id: 2, component: 'Hex Nut M12', qty: 78, price: 0.12 },
  ]);

  const totalCost = fasteners.reduce((sum, f) => sum + (f.qty * f.price), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  const updateFastener = (id, field, value) => {
    setFasteners(fasteners.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const addFastener = () => {
    setFasteners([...fasteners, { id: Date.now(), component: 'New Fastener', qty: 10, price: 0.50 }]);
  };

  const deleteFastener = (id) => {
    setFasteners(fasteners.filter(f => f.id !== id));
  };

  return (
    <div className="card">
      <h2>Fastener Cost Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Component</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Price (£)</th>
              <th style={{ padding: '4px' }}>Total</th>
              <th style={{ padding: '4px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {fasteners.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={f.component} onChange={(e) => updateFastener(f.id, 'component', e.target.value)} style={{ width: '90px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={f.qty} onChange={(e) => updateFastener(f.id, 'qty', Number(e.target.value))} style={{ width: '40px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={f.price} onChange={(e) => updateFastener(f.id, 'price', Number(e.target.value))} style={{ width: '50px' }} />
                </td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(f.qty * f.price).toFixed(2)}</td>
                <td style={{ padding: '4px' }}>
                  <button onClick={() => deleteFastener(f.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addFastener} className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', padding: '6px 12px' }}>+ Add Row</button>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Fasteners Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 5. PART LIST COST TRACKER ---
export function PartListCostTracker({ onUpdateCost }) {
  const [parts, setParts] = useState([
    { id: 1, part: 'RHS 40x40x1200', qty: 4, price: 4.55 },
  ]);

  const totalCost = parts.reduce((sum, p) => sum + (p.qty * p.price), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  const updatePart = (id, field, value) => {
    setParts(parts.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addPart = () => {
    setParts([...parts, { id: Date.now(), part: 'New Section', qty: 1, price: 10.00 }]);
  };

  const deletePart = (id) => {
    setParts(parts.filter(p => p.id !== id));
  };

  return (
    <div className="card">
      <h2>Part List Cost Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Part Description</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Price (£)</th>
              <th style={{ padding: '4px' }}>Sum</th>
              <th style={{ padding: '4px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {parts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={p.part} onChange={(e) => updatePart(p.id, 'part', e.target.value)} style={{ width: '110px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={p.qty} onChange={(e) => updatePart(p.id, 'qty', Number(e.target.value))} style={{ width: '40px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={p.price} onChange={(e) => updatePart(p.id, 'price', Number(e.target.value))} style={{ width: '50px' }} />
                </td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(p.qty * p.price).toFixed(2)}</td>
                <td style={{ padding: '4px' }}>
                  <button onClick={() => deletePart(p.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addPart} className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', padding: '6px 12px' }}>+ Add Row</button>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Part List Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 6. PART LIST STAIR COST TRACKER ---
export function PartListStairCostTracker({ onUpdateCost }) {
  const [mainParts, setMainParts] = useState([
    { id: 1, part: 'Tread', qty: 17, price: 88.00 },
    { id: 2, part: 'Hanging Plate', qty: 1, price: 94.00 },
    { id: 3, part: 'Bottom Stringer Fixing Plate', qty: 2, price: 50.00 },
  ]);

  const totalCost = mainParts.reduce((sum, p) => sum + (p.qty * p.price), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  const updateStairPart = (id, field, value) => {
    setMainParts(mainParts.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addStairPart = () => {
    setMainParts([...mainParts, { id: Date.now(), part: 'New Stair Element', qty: 1, price: 25.00 }]);
  };

  const deleteStairPart = (id) => {
    setMainParts(mainParts.filter(p => p.id !== id));
  };

  return (
    <div className="card">
      <h2>Part List Stair Cost Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Part</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Price (£)</th>
              <th style={{ padding: '4px' }}>Sum</th>
              <th style={{ padding: '4px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mainParts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>
                  <input type="text" value={p.part} onChange={(e) => updateStairPart(p.id, 'part', e.target.value)} style={{ width: '100px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={p.qty} onChange={(e) => updateStairPart(p.id, 'qty', Number(e.target.value))} style={{ width: '40px' }} />
                </td>
                <td style={{ padding: '4px' }}>
                  <input type="number" value={p.price} onChange={(e) => updateStairPart(p.id, 'price', Number(e.target.value))} style={{ width: '50px' }} />
                </td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(p.qty * p.price).toFixed(2)}</td>
                <td style={{ padding: '4px' }}>
                  <button onClick={() => deleteStairPart(p.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addStairPart} className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', padding: '6px 12px' }}>+ Add Row</button>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Stair Parts Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 7. CALC: STEP RISING (SIMPLE) ---
export function StepRisingCalc() {
  const [finishFloor, setFinishFloor] = useState(3500);
  const [stepNumbers, setStepNumbers] = useState(22);

  const riser = stepNumbers > 0 ? finishFloor / stepNumbers : 0;
  const checkRegs = (min, max) => (riser >= min && riser <= max ? 'PASS' : 'FAIL');

  return (
    <div className="card">
      <h2>CALC - Step Rising Simple</h2>
      <div className="form-group">
        <label>Finish to Finish Floor (mm)</label>
        <input type="number" value={finishFloor} onChange={(e) => setFinishFloor(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Step Numbers</label>
        <input type="number" value={stepNumbers} onChange={(e) => setStepNumbers(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <strong>Calculated Riser Height: {riser.toFixed(1)} mm</strong>
      </div>

      {/* READ-ONLY STATUTORY BUILDING REGS TABLE */}
      <h3 style={{ fontSize: '12px', color: '#1e293b', marginTop: '10px' }}>Building Regulations Guidance (Read-Only Reference)</h3>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '6px' }}>
        <thead>
          <tr style={{ background: '#1e3a8a', color: '#ffffff' }}>
            <th style={{ padding: '4px' }}>Category</th>
            <th style={{ padding: '4px' }}>Min-Max</th>
            <th style={{ padding: '4px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <td style={{ padding: '4px' }}>Private Stair</td>
            <td style={{ padding: '4px' }}>150 - 220 mm</td>
            <td style={{ color: checkRegs(150, 220) === 'PASS' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>{checkRegs(150, 220)}</td>
          </tr>
          <tr style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <td style={{ padding: '4px' }}>Utility Stair</td>
            <td style={{ padding: '4px' }}>150 - 190 mm</td>
            <td style={{ color: checkRegs(150, 190) === 'PASS' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>{checkRegs(150, 190)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// --- 8. CALC: STEP RISING WITH MAKE UPS ---
export function StepRisingMakeUpsCalc() {
  const [screedToScreed, setScreedToScreed] = useState(1500);
  const [makeupBottom, setMakeupBottom] = useState(250);
  const [makeupTop, setMakeupTop] = useState(125);
  const [stepNumbers, setStepNumbers] = useState(9);

  const finishToFinish = screedToScreed - makeupTop;
  const riser = stepNumbers > 0 ? finishToFinish / stepNumbers : 0;

  return (
    <div className="card">
      <h2>CALC - Step Rising with Make Ups</h2>
      <div className="form-group"><label>Screed to Screed (mm)</label><input type="number" value={screedToScreed} onChange={(e) => setScreedToScreed(Number(e.target.value))} /></div>
      <div className="form-group"><label>Makeup Bottom (mm)</label><input type="number" value={makeupBottom} onChange={(e) => setMakeupBottom(Number(e.target.value))} /></div>
      <div className="form-group"><label>Makeup Top (mm)</label><input type="number" value={makeupTop} onChange={(e) => setMakeupTop(Number(e.target.value))} /></div>
      <div className="form-group"><label>Step Numbers</label><input type="number" value={stepNumbers} onChange={(e) => setStepNumbers(Number(e.target.value))} /></div>
      <div className="result-box">
        <div>Finish to Finish Floor: <strong>{finishToFinish} mm</strong></div>
        <div>Calculated Riser: <strong>{riser.toFixed(1)} mm</strong></div>
      </div>
    </div>
  );
}

// --- 9. CALC: STAIR RISE & GOING ---
export function StairRiseGoingCalc() {
  const [stairRise, setStairRise] = useState(1200);
  const [stairGoing, setStairGoing] = useState(1250);
  const [stepNumbers, setStepNumbers] = useState(6);

  const stepGoing = stepNumbers > 0 ? stairGoing / stepNumbers : 0;
  const stepRise = stepNumbers > 0 ? stairRise / stepNumbers : 0;
  const stepD = Math.sqrt(Math.pow(stepGoing, 2) + Math.pow(stepRise, 2));

  return (
    <div className="card">
      <h2>CALC - Stair Rise & Going</h2>
      <div className="form-group"><label>Stair Rise (mm)</label><input type="number" value={stairRise} onChange={(e) => setStairRise(Number(e.target.value))} /></div>
      <div className="form-group"><label>Stair Going (mm)</label><input type="number" value={stairGoing} onChange={(e) => setStairGoing(Number(e.target.value))} /></div>
      <div className="form-group"><label>Step Numbers</label><input type="number" value={stepNumbers} onChange={(e) => setStepNumbers(Number(e.target.value))} /></div>
      <div className="result-box">
        <div>Step Going: <strong>{stepGoing.toFixed(1)} mm</strong></div>
        <div>Step Rise: <strong>{stepRise.toFixed(1)} mm</strong></div>
        <div>Step Diagonal (D): <strong>{stepD.toFixed(2)} mm</strong></div>
      </div>
    </div>
  );
}

// --- 10. CALC: GOING & ANGLE ---
export function TreadGoingAngleCalc() {
  const [stepGoing, setStepGoing] = useState(250);
  const [angleDeg, setAngleDeg] = useState(54.24);

  const stepRise = stepGoing * Math.tan(angleDeg * (Math.PI / 180));

  return (
    <div className="card">
      <h2>CALC - Stair Calculator 2 (Going & Angle)</h2>
      <div className="form-group"><label>Step Going (mm)</label><input type="number" value={stepGoing} onChange={(e) => setStepGoing(Number(e.target.value))} /></div>
      <div className="form-group"><label>Step Angle (°)</label><input type="number" value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} /></div>
      <div className="result-box">
        <div>Calculated Step Rise: <strong>{stepRise.toFixed(1)} mm</strong></div>
      </div>
    </div>
  );
}

// --- 11. CALC: BALUSTRADE ---
export function StairBalustradeCalc() {
  const [handrailLength, setHandrailLength] = useState(2000);
  const [barThickness, setBarThickness] = useState(16);
  const [targetGap, setTargetGap] = useState(99);

  const totalUnit = barThickness + targetGap;
  const numBars = Math.floor((handrailLength - barThickness) / totalUnit);
  const exactGap = (handrailLength - (numBars * barThickness)) / (numBars + 1);

  return (
    <div className="card">
      <h2>CALC - Stair Balustrade Spacing</h2>
      <div className="form-group"><label>Handrail Length (mm)</label><input type="number" value={handrailLength} onChange={(e) => setHandrailLength(Number(e.target.value))} /></div>
      <div className="form-group"><label>Bar Thickness (mm)</label><input type="number" value={barThickness} onChange={(e) => setBarThickness(Number(e.target.value))} /></div>
      <div className="form-group"><label>Target Gap (Max 99mm Regs)</label><input type="number" value={targetGap} onChange={(e) => setTargetGap(Number(e.target.value))} /></div>
      <div className="result-box">
        <div>Number of Bars Required: <strong>{numBars}</strong></div>
        <div>Exact Gap Between Bars: <strong>{exactGap.toFixed(1)} mm</strong></div>
      </div>
    </div>
  );
}

// --- 12. STAIR BUILDING REGULATIONS (READ ONLY BLUE GUIDE) ---
export function StairBuildingRegulationsCalc() {
  return (
    <div className="card">
      <h2>Stair Building Regulations (Approved Document K)</h2>
      <p style={{ fontSize: '11px', color: '#64748b' }}>Statutory dimensional standards and safety requirements (Read-Only Reference Guide)[cite: 14].</p>
      <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#1e3a8a', color: '#ffffff' }}>
            <th style={{ padding: '6px' }}>Category</th>
            <th style={{ padding: '6px' }}>Min-Max Rise</th>
            <th style={{ padding: '6px' }}>Min-Max Going</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center', background: '#f8fafc' }}>
            <td style={{ padding: '6px', fontWeight: 'bold' }}>Private Stair</td>
            <td style={{ padding: '6px' }}>150 - 220 mm</td>
            <td style={{ padding: '6px' }}>220 - 300 mm</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center', background: '#f8fafc' }}>
            <td style={{ padding: '6px', fontWeight: 'bold' }}>Utility Stair</td>
            <td style={{ padding: '6px' }}>150 - 190 mm</td>
            <td style={{ padding: '6px' }}>250 - 400 mm</td>
          </tr>
          <tr style={{ textAlign: 'center', background: '#f8fafc' }}>
            <td style={{ padding: '6px', fontWeight: 'bold' }}>General Access</td>
            <td style={{ padding: '6px' }}>150 - 170 mm</td>
            <td style={{ padding: '6px' }}>250 - 400 mm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}