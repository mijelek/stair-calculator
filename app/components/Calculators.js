// app/components/Calculators.js
'use client';
import { useState } from 'react';

export function StepRisingCalc() {
  const [floorToFloor, setFloorToFloor] = useState(3500);
  const [numRisers, setNumRisers] = useState(18);

  const riserHeight = numRisers > 0 ? (floorToFloor / numRisers).toFixed(2) : 0;
  const isCompliant = riserHeight >= 150 && riserHeight <= 220;

  return (
    <div className="card">
      <h2>CALC - Step Rising</h2>
      <div className="form-group">
        <label>Finish to Finish Floor (mm)</label>
        <input type="number" value={floorToFloor} onChange={(e) => setFloorToFloor(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Number of Risers</label>
        <input type="number" value={numRisers} onChange={(e) => setNumRisers(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Current Riser:</strong> {riserHeight} mm</p>
        <p><strong>UK Regs Status:</strong> {isCompliant ? '✅ Compliant' : '❌ Non-Compliant'}</p>
      </div>
    </div>
  );
}

export function CostTrackerCalc() {
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(25);

  return (
    <div className="card">
      <h2>Working Hours & Cost</h2>
      <div className="form-group">
        <label>Hours Worked</label>
        <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Rate Per Hour (£)</label>
        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Total Cost:</strong> £{(hours * rate).toFixed(2)}</p>
      </div>
    </div>
  );
}