// app/components/Calculators.js
'use client';
import { useState } from 'react';

// 1. Step Rising Simple
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
        <p><strong>Status:</strong> {isCompliant ? '✅ Compliant' : '❌ Non-Compliant'}</p>
      </div>
    </div>
  );
}

// 2. Step Rising with Make Ups
export function StepRisingMakeUpsCalc() {
  const [screedToScreed, setScreedToScreed] = useState(1500);
  const [makeupBottom, setMakeupBottom] = useState(250);
  const [makeupTop, setMakeupTop] = useState(100);
  const [numRisers, setNumRisers] = useState(8);

  const totalHeight = screedToScreed + makeupBottom - makeupTop;
  const riserHeight = numRisers > 0 ? (totalHeight / numRisers).toFixed(2) : 0;

  return (
    <div className="card">
      <h2>CALC - Step Rising with Make Ups</h2>
      <div className="form-group">
        <label>Screed to Screed (mm)</label>
        <input type="number" value={screedToScreed} onChange={(e) => setScreedToScreed(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Makeup Bottom (mm)</label>
        <input type="number" value={makeupBottom} onChange={(e) => setMakeupBottom(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Makeup Top (mm)</label>
        <input type="number" value={makeupTop} onChange={(e) => setMakeupTop(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Number of Risers</label>
        <input type="number" value={numRisers} onChange={(e) => setNumRisers(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Total Height:</strong> {totalHeight} mm</p>
        <p><strong>Riser Height:</strong> {riserHeight} mm</p>
      </div>
    </div>
  );
}

// 3. Stair Rise & Going
export function StairRiseGoingCalc() {
  const [stairRise, setStairRise] = useState(1200);
  const [stairGoing, setStairGoing] = useState(2200);
  const [numRisers, setNumRisers] = useState(6);

  const stepRise = numRisers > 0 ? (stairRise / numRisers).toFixed(2) : 0;
  const stepGoing = numRisers > 1 ? (stairGoing / (numRisers - 1)).toFixed(2) : 0;

  return (
    <div className="card">
      <h2>CALC - Stair Rise & Going</h2>
      <div className="form-group">
        <label>Stair Rise (mm)</label>
        <input type="number" value={stairRise} onChange={(e) => setStairRise(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Stair Going (mm)</label>
        <input type="number" value={stairGoing} onChange={(e) => setStairGoing(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Number of Risers</label>
        <input type="number" value={numRisers} onChange={(e) => setNumRisers(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Step Rise:</strong> {stepRise} mm</p>
        <p><strong>Step Going:</strong> {stepGoing} mm</p>
      </div>
    </div>
  );
}

// 4. Tread Going & Angle
export function TreadGoingAngleCalc() {
  const [stepGoing, setStepGoing] = useState(250);
  const [angle, setAngle] = useState(38);

  const stepRise = (stepGoing * Math.tan((angle * Math.PI) / 180)).toFixed(2);

  return (
    <div className="card">
      <h2>CALC - Tread Going & Angle</h2>
      <div className="form-group">
        <label>Step Going (mm)</label>
        <input type="number" value={stepGoing} onChange={(e) => setStepGoing(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Stair Angle (°)</label>
        <input type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Calculated Step Rise:</strong> {stepRise} mm</p>
      </div>
    </div>
  );
}

// 5. Stair Balustrade
export function StairBalustradeCalc() {
  const [stepGoing, setStepGoing] = useState(350);
  const [hd, setHd] = useState(52);

  const deltaX1 = (stepGoing * 0.1347).toFixed(2);
  const deltaX2 = (hd * 1.1538).toFixed(2);

  return (
    <div className="card">
      <h2>CALC - Stair Balustrade</h2>
      <div className="form-group">
        <label>Step Going (mm)</label>
        <input type="number" value={stepGoing} onChange={(e) => setStepGoing(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>HD Dimension (mm)</label>
        <input type="number" value={hd} onChange={(e) => setHd(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Delta X1:</strong> {deltaX1}</p>
        <p><strong>Delta X2:</strong> {deltaX2}</p>
      </div>
    </div>
  );
}

// 6. Workers & Cost Tracker
export function WorkersCostTracker() {
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(25);

  return (
    <div className="card">
      <h2>Workers & Cost Tracker</h2>
      <div className="form-group">
        <label>Hours Worked</label>
        <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Hourly Rate (£)</label>
        <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Total Earnings:</strong> £{(hours * rate).toFixed(2)}</p>
      </div>
    </div>
  );
}

// 7. CNC Cutting Material Tracker
export function CNCMaterialTracker() {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(2000);
  const [thickness, setThickness] = useState(18);
  const [density, setDensity] = useState(720); // Mdf density kg/m3

  const volumeM3 = (width / 1000) * (height / 1000) * (thickness / 1000);
  const massKg = (volumeM3 * density).toFixed(2);

  return (
    <div className="card">
      <h2>CNC Material Tracker</h2>
      <div className="form-group">
        <label>Width (mm)</label>
        <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Height (mm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Thickness (mm)</label>
        <input type="number" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Mass Density (kg/m³)</label>
        <input type="number" value={density} onChange={(e) => setDensity(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Calculated Mass:</strong> {massKg} kg</p>
      </div>
    </div>
  );
}

// 8. CNC Cutting Time Tracker
export function CNCTimeTracker() {
  const [cuttingTimeMins, setCuttingTimeMins] = useState(45);
  const [ratePerHour, setRatePerHour] = useState(60);

  const totalCost = ((cuttingTimeMins / 60) * ratePerHour).toFixed(2);

  return (
    <div className="card">
      <h2>CNC Cutting Time Tracker</h2>
      <div className="form-group">
        <label>Cutting Time (mins)</label>
        <input type="number" value={cuttingTimeMins} onChange={(e) => setCuttingTimeMins(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Price Per Hour (£)</label>
        <input type="number" value={ratePerHour} onChange={(e) => setRatePerHour(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Total Cutting Cost:</strong> £{totalCost}</p>
      </div>
    </div>
  );
}

// 9. Fastener Cost Tracker
export function FastenerCostTracker() {
  const [quantity, setQuantity] = useState(100);
  const [unitPrice, setUnitPrice] = useState(0.15);

  const total = (quantity * unitPrice).toFixed(2);

  return (
    <div className="card">
      <h2>Fastener Cost Tracker</h2>
      <div className="form-group">
        <label>Quantity</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Unit Price (£)</label>
        <input type="number" step="0.01" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} />
      </div>
      <div className="result-box">
        <p><strong>Total Fastener Cost:</strong> £{total}</p>
      </div>
    </div>
  );
}