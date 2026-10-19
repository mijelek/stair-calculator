// app/components/Calculators.js
'use client';
import { useState, useEffect } from 'react';

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
  useEffect(() => { if (onUpdateCost) onUpdateCost(totalCost); }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Workers and Cost Tracker</h2>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#334155', color: '#fff' }}>
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
              <td style={{ padding: '6px', fontWeight: 'bold', color: '#0066cc' }}>£{(w.perHour * w.hours).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-box" style={{ marginTop: '12px' }}><strong>Total: £{totalCost.toFixed(2)}</strong></div>
    </div>
  );
}

export function CNCMaterialTracker({ onUpdateCost }) {
  const [materials] = useState([
    { id: 1, dims: '3000x2000x10', mat: 'Polypropylene', price: 450, qty: 1 },
    { id: 2, dims: '3000x1500x4', mat: 'S235 Mild Steel', price: 250, qty: 2 },
  ]);
  const totalCost = materials.reduce((sum, m) => sum + (m.price * m.qty), 0);
  useEffect(() => { if (onUpdateCost) onUpdateCost(totalCost); }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>CNC Cutting Material Tracker</h2>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead><tr style={{ background: '#334155', color: '#fff' }}><th style={{ padding: '4px' }}>Dims</th><th style={{ padding: '4px' }}>Material</th><th style={{ padding: '4px' }}>Price</th><th style={{ padding: '4px' }}>Total</th></tr></thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
              <td style={{ padding: '4px' }}>{m.dims}</td><td style={{ padding: '4px' }}>{m.mat}</td><td style={{ padding: '4px' }}>£{m.price}</td><td style={{ padding: '4px', fontWeight: 'bold' }}>£{m.price * m.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-box" style={{ marginTop: '12px' }}><strong>Total: £{totalCost.toFixed(2)}</strong></div>
    </div>
  );
}

export function CNCTimeTracker({ onUpdateCost }) {
  const [cuts] = useState([
    { id: 1, dims: '3000x1500x10', hours: 9.33, rate: 25 },
    { id: 2, dims: '3000x1500x4', hours: 1.50, rate: 25 },
  ]);
  const totalCost = cuts.reduce((sum, c) => sum + (c.hours * c.rate), 0);
  useEffect(() => { if (onUpdateCost) onUpdateCost(totalCost); }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>CNC Cutting Time Tracker</h2>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead><tr style={{ background: '#334155', color: '#fff' }}><th style={{ padding: '4px' }}>Dims</th><th style={{ padding: '4px' }}>Hours</th><th style={{ padding: '4px' }}>Total</th></tr></thead>
        <tbody>
          {cuts.map(c => (
            <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
              <td style={{ padding: '4px' }}>{c.dims}</td><td style={{ padding: '4px' }}>{c.hours}h</td><td style={{ padding: '4px', fontWeight: 'bold' }}>£{c.hours * c.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-box" style={{ marginTop: '12px' }}><strong>Total: £{totalCost.toFixed(2)}</strong></div>
    </div>
  );
}

export function FastenerCostTracker({ onUpdateCost }) {
  const [fasteners] = useState([
    { id: 1, name: 'CSK M12', qty: 78, price: 0.45 },
    { id: 2, name: 'Hex Nut M12', qty: 78, price: 0.12 },
  ]);
  const totalCost = fasteners.reduce((sum, f) => sum + (f.qty * f.price), 0);
  useEffect(() => { if (onUpdateCost) onUpdateCost(totalCost); }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Fastener Cost Tracker</h2>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead><tr style={{ background: '#334155', color: '#fff' }}><th style={{ padding: '4px' }}>Component</th><th style={{ padding: '4px' }}>Qty</th><th style={{ padding: '4px' }}>Total</th></tr></thead>
        <tbody>
          {fasteners.map(f => (
            <tr key={f.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
              <td style={{ padding: '4px' }}>{f.name}</td><td style={{ padding: '4px' }}>{f.qty}</td><td style={{ padding: '4px', fontWeight: 'bold' }}>£{(f.qty * f.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-box" style={{ marginTop: '12px' }}><strong>Total: £{totalCost.toFixed(2)}</strong></div>
    </div>
  );
}

export function PartListCostTracker({ onUpdateCost }) {
  const [parts] = useState([{ id: 1, part: 'RHS 40x40x1200', qty: 4, price: 4.55 }]);
  const totalCost = parts.reduce((sum, p) => sum + (p.qty * p.price), 0);
  useEffect(() => { if (onUpdateCost) onUpdateCost(totalCost); }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Part List Cost Tracker</h2>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead><tr style={{ background: '#334155', color: '#fff' }}><th style={{ padding: '4px' }}>Part</th><th style={{ padding: '4px' }}>Qty</th><th style={{ padding: '4px' }}>Sum</th></tr></thead>
        <tbody>
          {parts.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
              <td style={{ padding: '4px' }}>{p.part}</td><td style={{ padding: '4px' }}>{p.qty}</td><td style={{ padding: '4px', fontWeight: 'bold' }}>£{p.qty * p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-box" style={{ marginTop: '12px' }}><strong>Total: £{totalCost.toFixed(2)}</strong></div>
    </div>
  );
}

export function PartListStairCostTracker({ onUpdateCost }) {
  const [mainParts] = useState([
    { part: 'Tread', qty: 17, price: 88.00 },
    { part: 'Hanging Plate', qty: 1, price: 94.00 },
  ]);
  const totalCost = mainParts.reduce((sum, p) => sum + (p.qty * p.price), 0);
  useEffect(() => { if (onUpdateCost) onUpdateCost(totalCost); }, [totalCost, onUpdateCost]);

  return (
    <div className="card">
      <h2>Part List Stair Cost Tracker</h2>
      <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead><tr style={{ background: '#334155', color: '#fff' }}><th style={{ padding: '4px' }}>Part</th><th style={{ padding: '4px' }}>Qty</th><th style={{ padding: '4px' }}>Sum</th></tr></thead>
        <tbody>
          {mainParts.map((p, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
              <td style={{ padding: '4px' }}>{p.part}</td><td style={{ padding: '4px' }}>{p.qty}</td><td style={{ padding: '4px', fontWeight: 'bold' }}>£{p.qty * p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="result-box" style={{ marginTop: '12px' }}><strong>Total: £{totalCost.toFixed(2)}</strong></div>
    </div>
  );
}

export function StepRisingCalc() {
  const [floor, setFloor] = useState(3500);
  const [steps, setSteps] = useState(22);
  const riser = steps > 0 ? floor / steps : 0;
  return (
    <div className="card">
      <h2>CALC - Step Rising</h2>
      <div className="form-group"><label>Floor Height (mm)</label><input type="number" value={floor} onChange={e => setFloor(Number(e.target.value))} /></div>
      <div className="form-group"><label>Step Numbers</label><input type="number" value={steps} onChange={e => setSteps(Number(e.target.value))} /></div>
      <div className="result-box"><strong>Riser Height: {riser.toFixed(1)} mm</strong></div>
    </div>
  );
}

export function StepRisingMakeUpsCalc() {
  return (
    <div className="card">
      <h2>CALC - Step Rising with Make Ups</h2>
      <p style={{ fontSize: '12px', color: '#64748b' }}>Screed and makeup height adjustments.</p>
    </div>
  );
}

export function StairRiseGoingCalc() {
  return (
    <div className="card">
      <h2>CALC - Stair Calculator</h2>
      <p style={{ fontSize: '12px', color: '#64748b' }}>Overall stair rise and going calculations.</p>
    </div>
  );
}

export function TreadGoingAngleCalc() {
  return (
    <div className="card">
      <h2>CALC - Stair Calculator 2</h2>
      <p style={{ fontSize: '12px', color: '#64748b' }}>Going and pitch angle calculation module.</p>
    </div>
  );
}

export function StairBalustradeCalc() {
  return (
    <div className="card">
      <h2>CALC - Stair Balustrade</h2>
      <p style={{ fontSize: '12px', color: '#64748b' }}>Bar spacing and 100mm sphere rule checks.</p>
    </div>
  );
}

export function StairBuildingRegulationsCalc() {
  return (
    <div className="card">
      <h2>Stair Building Regulations</h2>
      <p style={{ fontSize: '12px', color: '#64748b' }}>Approved Document K code standards.</p>
    </div>
  );
}