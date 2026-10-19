// app/page.js
'use client';
import { useState, useEffect } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import SignedOutView from './components/SignedOutView';
// ... import your calculator components

export default function Home() {
  const { isSignedIn } = useAuth();
  const [activeCalc, setActiveCalc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(''); // Added for manual save feedback

  const [projectData, setProjectData] = useState({
    projectPrice: 27000,
    workers: [
      { id: 1, name: 'Oliver Bennet', position: 'Manager', perHour: 56.00, hours: 0 },
      // ... rest of initial state
    ],
    // ... other calculator lists
  });

  // Load from Supabase on mount
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

  // Manual Save Function to force error checking
  const handleManualSave = async () => {
    setSaveStatus('Saving...');
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      
      const result = await response.json();
      if (response.ok) {
        setSaveStatus('Saved Successfully! ✓');
      } else {
        setSaveStatus(`Error: ${result.error}`);
        console.error('Save failed:', result.error);
      }
    } catch (err) {
      setSaveStatus('Network Error!');
      console.error('Network error during save:', err);
    }
    
    setTimeout(() => setSaveStatus(''), 4000); // Clear message after 4 seconds
  };

  const updateAndSave = (newData) => {
    const updated = { ...projectData, ...newData };
    setProjectData(updated);
    
    // Auto-save call
    fetch('/api/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(err => console.error('Auto-save error:', err));
  };

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
      ) : isLoading ? (
        <div style={{ padding: '20px', fontSize: '14px', color: '#64748b' }}>Loading saved data...</div>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!activeCalc ? (
            <div className="dashboard-container">
              
              {/* Manual Save Button & Feedback Banner */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  className="btn" 
                  onClick={handleManualSave}
                  style={{ backgroundColor: '#0f4c3a' }}
                >
                  Save Project Data Now
                </button>
                {saveStatus && (
                  <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: saveStatus.includes('Error') ? '#dc2626' : '#16a34a' }}>
                    {saveStatus}
                  </div>
                )}
              </div>

              {/* Project Details Card */}
              <div className="card" style={{ padding: '20px', textAlign: 'left', alignItems: 'stretch' }}>
                <h2 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '14px', textAlign: 'center', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px' }}>
                  Project Details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: '600', color: '#64748b' }}>Project Price (£)</span>
                    <input 
                      type="number" 
                      value={projectData.projectPrice} 
                      onChange={(e) => updateAndSave({ projectPrice: Number(e.target.value) })}
                      style={{ width: '110px', padding: '2px 6px', textAlign: 'right', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation List */}
              {/* ... (rest of calculatorList mapping) */}

            </div>
          ) : (
            /* Selected Calculator View */
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <button className="btn btn-secondary" onClick={() => setActiveCalc(null)} style={{ marginBottom: '4px' }}>
                ← Back to Menu
              </button>
              {/* Render active calculator components here */}
            </div>
          )}
        </div>
      )}
    </main>
  );
}