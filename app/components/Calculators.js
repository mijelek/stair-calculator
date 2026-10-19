// app/components/Calculators.js
'use client';
import { useState, useEffect } from 'react';

// --- 1. WORKERS & COST TRACKER ---
export function WorkersCostTracker({ onUpdateCost }) {
  const [workers] = useState([
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
              <th style={{ padding: '6px' }}>Total (£)</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(w => (
              <tr key={w.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '6px' }}>{w.name}</td>
                <td style={{ padding: '6px' }}>{w.position}</td>
                <td style={{ padding: '6px' }}>£{w.perHour.toFixed(2)}</td>
                <td style={{ padding: '6px', fontWeight: 'bold', color: '#0066cc' }}>
                  £{(w.perHour * w.hours).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Labor Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 2. CNC CUTTING MATERIAL TRACKER ---
export function CNCMaterialTracker({ onUpdateCost }) {
  const [materials] = useState([
    { id: 1, width: 3000, height: 2000, thickness: 10, material: 'Polypropylene', price: 450, quantity: 1 },
    { id: 2, width: 3000, height: 1500, thickness: 4, material: 'S235 Mild Steel', price: 250, quantity: 2 },
  ]);

  const totalCost = materials.reduce((sum, m) => sum + (m.price * m.quantity), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>CNC Cutting Material Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Dimensions</th>
              <th style={{ padding: '4px' }}>Material</th>
              <th style={{ padding: '4px' }}>Price</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>{m.width}x{m.height}x{m.thickness}</td>
                <td style={{ padding: '4px' }}>{m.material}</td>
                <td style={{ padding: '4px' }}>£{m.price}</td>
                <td style={{ padding: '4px' }}>{m.quantity}</td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(m.price * m.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total CNC Material Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 3. CNC CUTTING TIME TRACKER ---
export function CNCTimeTracker({ onUpdateCost }) {
  const [cuts] = useState([
    { id: 1, dimensions: '3000x1500x10', hours: 9.33, rate: 25.00 },
    { id: 2, dimensions: '3000x1500x4', hours: 1.50, rate: 25.00 },
    { id: 3, dimensions: '3000x1500x4', hours: 1.50, rate: 25.00 },
  ]);

  const totalCost = cuts.reduce((sum, c) => sum + (c.hours * c.rate), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>CNC Cutting Time Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Dimensions</th>
              <th style={{ padding: '4px' }}>Hours</th>
              <th style={{ padding: '4px' }}>Rate</th>
              <th style={{ padding: '4px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cuts.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>{c.dimensions}</td>
                <td style={{ padding: '4px' }}>{c.hours}h</td>
                <td style={{ padding: '4px' }}>£{c.rate.toFixed(2)}</td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(c.hours * c.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total CNC Time Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 4. FASTENER COST TRACKER ---
export function FastenerCostTracker({ onUpdateCost }) {
  const [fasteners] = useState([
    { id: 1, component: 'CSK M12 (40mm)', qty: 78, price: 0.45 },
    { id: 2, component: 'Hex Nut M12', qty: 78, price: 0.12 },
    { id: 3, component: 'Plain Washer M12', qty: 78, price: 0.08 },
    { id: 4, component: 'Spring Washer M12', qty: 78, price: 0.08 },
    { id: 5, component: 'CSK M6 (20mm)', qty: 76, price: 0.10 },
  ]);

  const totalCost = fasteners.reduce((sum, f) => sum + (f.qty * f.price), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Fastener Cost Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Component</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Price</th>
              <th style={{ padding: '4px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {fasteners.map(f => (
              <tr key={f.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>{f.component}</td>
                <td style={{ padding: '4px' }}>{f.qty}</td>
                <td style={{ padding: '4px' }}>£{f.price.toFixed(2)}</td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(f.qty * f.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Fasteners Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 5. PART LIST COST TRACKER ---
export function PartListCostTracker({ onUpdateCost }) {
  const [parts] = useState([
    { id: 1, part: 'RHS 40x40x1200', quantity: 4, price: 4.55 },
  ]);

  const totalCost = parts.reduce((sum, p) => sum + (p.quantity * p.price), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Part List Cost Tracker</h2>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Part</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Price</th>
              <th style={{ padding: '4px' }}>Sum</th>
            </tr>
          </thead>
          <tbody>
            {parts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>{p.part}</td>
                <td style={{ padding: '4px' }}>{p.quantity}</td>
                <td style={{ padding: '4px' }}>£{p.price.toFixed(2)}</td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(p.quantity * p.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="result-box" style={{ marginTop: '12px' }}>
        <strong>Total Part List Cost: £{totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
}

// --- 6. PART LIST STAIR COST TRACKER ---
export function PartListStairCostTracker({ onUpdateCost }) {
  const [mainParts] = useState([
    { part: 'Tread', qty: 17, price: 88.00 },
    { part: 'Hanging Plate', qty: 1, price: 94.00 },
    { part: 'Bottom Stringer Fixing Plate', qty: 2, price: 50.00 },
    { part: 'Bar Ornamental Gallery', qty: 13, price: 11.00 },
    { part: 'Bar Ornamental Stair 1', qty: 9, price: 11.00 },
    { part: 'Bar Ornamental Stair 2', qty: 8, price: 11.00 },
    { part: 'Bar Ornamental Stair 3', qty: 8, price: 11.00 },
    { part: 'Stringer OUT', qty: 1, price: 120.00 },
    { part: 'Stringer IN', qty: 1, price: 120.00 },
    { part: 'Riser 1', qty: 1, price: 4.00 },
    { part: 'Bar Gallery', qty: 13, price: 5.00 },
    { part: 'Bar Stair 1', qty: 9, price: 5.00 },
    { part: 'Bar Stair 2', qty: 8, price: 5.00 },
    { part: 'Bar Stair 3', qty: 8, price: 5.00 },
    { part: 'FLT 20x12 Wall Fixing', qty: 1, price: 12.00 },
    { part: 'FLT 20x12 Gallery', qty: 1, price: 25.00 },
    { part: 'FLT 20x12 Stairs', qty: 1, price: 30.00 },
  ]);

  const totalCost = mainParts.reduce((sum, p) => sum + (p.qty * p.price), 0);

  useEffect(() => {
    if (onUpdateCost) onUpdateCost(totalCost);
  }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Part List Stair Cost Tracker</h2>
      <div style={{ width: '100%', maxHeight: '250px', overflowY: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ background: '#334155', color: '#ffffff' }}>
              <th style={{ padding: '4px' }}>Part</th>
              <th style={{ padding: '4px' }}>Qty</th>
              <th style={{ padding: '4px' }}>Price</th>
              <th style={{ padding: '4px' }}>Sum</th>
            </tr>
          </thead>
          <tbody>
            {mainParts.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                <td style={{ padding: '4px' }}>{p.part}</td>
                <td style={{ padding: '4px' }}>{p.qty}</td>
                <td style={{ padding: '4px' }}>£{p.price.toFixed(2)}</td>
                <td style={{ padding: '4px', fontWeight: 'bold' }}>£{(p.qty * p.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#334155', color: '#fff' }}>
            <th style={{ padding: '4px' }}>Category</th>
            <th style={{ padding: '4px' }}>Min-Max</th>
            <th style={{ padding: '4px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <td>Private Stair</td>
            <td>150 - 220mm</td>
            <td style={{ color: checkRegs(150, 220) === 'PASS' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>{checkRegs(150, 220)}</td>
          </tr>
          <tr style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <td>Utility Stair</td>
            <td>150 - 190mm</td>
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

// --- 12. STAIR BUILDING REGULATIONS ---
export function StairBuildingRegulationsCalc() {
  return (
    <div className="card">
      <h2>Stair Building Regulations (Approved Document K)</h2>
      <p style={{ fontSize: '12px', color: '#64748b' }}>Statutory dimensional standards and safety requirements for stairs and handrails[cite: 14].</p>
      <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#334155', color: '#fff' }}>
            <th style={{ padding: '4px' }}>Category</th>
            <th style={{ padding: '4px' }}>Min-Max Rise</th>
            <th style={{ padding: '4px' }}>Min-Max Going</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
            <td style={{ padding: '4px' }}>Private Stair</td>
            <td style={{ padding: '4px' }}>150 - 220 mm</td>
            <td style={{ padding: '4px' }}>220 - 300 mm</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
            <td style={{ padding: '4px' }}>Utility Stair</td>
            <td style={{ padding: '4px' }}>150 - 190 mm</td>
            <td style={{ padding: '4px' }}>250 - 400 mm</td>
          </tr>
          <tr style={{ textAlign: 'center' }}>
            <td style={{ padding: '4px' }}>General Access</td>
            <td style={{ padding: '4px' }}>150 - 170 mm</td>
            <td style={{ padding: '4px' }}>250 - 400 mm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}