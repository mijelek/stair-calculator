// app/components/SignedOutView.js
'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function SignedOutView() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      
      {/* Card 1: Main Welcome & Authentication */}
      <div className="card">
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
          Stair Fabrication Suite
        </h2>
        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
          A minimalist, mobile-first dashboard for geometric stair calculators, panel spacing, live project cost tracking, and UK Building Regulations compliance.
        </p>
        <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '8px' }}>
          <SignInButton mode="modal">
            <button className="btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-secondary">Sign Up</button>
          </SignUpButton>
        </div>
      </div>

      {/* Card 2: Features & Modules Overview */}
      <div className="card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', width: '100%', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', textAlign: 'center' }}>
          Included Suites & Features
        </h3>
        <ul style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', margin: '0' }}>
          <li>
            <strong style={{ color: '#1e293b' }}>Panels Calculators:</strong> Infill panel specifications, single bar spacing, hoop configurations, and wall-fixing bar limits[cite: 2, 3].
          </li>
          <li>
            <strong style={{ color: '#1e293b' }}>Balustrades & Stairs:</strong> Pitch angles, riser heights, balustrades, material costs, and labor tracking[cite: 4].
          </li>
          <li>
            <strong style={{ color: '#1e293b' }}>UK Building Regulations:</strong> Statutory reference guides for Approved Document K compliance checks.
          </li>
          <li>
            <strong style={{ color: '#1e293b' }}>Remote Cloud Sync:</strong> Persistent per-user project storage via Supabase and Clerk authentication.
          </li>
        </ul>
      </div>

    </div>
  );
}