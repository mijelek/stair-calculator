// app/components/SignedOutView.js
'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function SignedOutView() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Main Welcome Card */}
      <div className="card" style={{ padding: '24px 20px', gap: '14px' }}>
        <h2 style={{ fontSize: '18px', color: '#1e293b' }}>Stair Fabrication Suite</h2>
        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
          Professional dashboard for geometric stair calculators, cost and material management, and live project financial tracking.
        </p>
        <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '6px' }}>
          <SignInButton mode="modal">
            <button className="btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-secondary">Sign Up</button>
          </SignUpButton>
        </div>
      </div>

      {/* Feature Overview Card */}
      <div className="card" style={{ padding: '20px', textAlign: 'left', alignItems: 'stretch', gap: '10px' }}>
        <h3 style={{ fontSize: '14px', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', textAlign: 'center' }}>
          Key Features & Calculators
        </h3>
        <ul style={{ fontSize: '12px', color: '#64748b', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Live financial tracking for labor, materials, and parts.</li>
          <li>13 specialized calculators including step risers and make-ups.</li>
          <li>UK Building Regulations (Approved Document K) compliance checks.</li>
          <li>Balustrade bar spacing and geometric delta calculators.</li>
        </ul>
      </div>

    </div>
  );
}