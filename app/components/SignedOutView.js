// app/components/SignedOutView.js
'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function SignedOutView() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      
      {/* Main Intro Card */}
      <div className="card">
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
          Stair Fabrication & Metalwork Suite
        </h2>
        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5', textAlign: 'center' }}>
          A mobile-first management dashboard and engineering calculator platform for stair fabricators, balustrade makers, and metalwork contractors.
        </p>
      </div>

      {/* Suite Previews Header */}
      <h3 style={{ fontSize: '14px', color: '#475569', fontWeight: '600', width: '100%', textAlign: 'left', marginTop: '4px' }}>
        Included Calculator Suites:
      </h3>

      {/* Preview Card 1: Panels Suite */}
      <div className="card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
            1. Panels Calculators
          </h3>
          <span style={{ fontSize: '10px', color: '#0066cc', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
            7 Modules
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 8px 0' }}>
          Infill panel calculations, single bar spacing, hoop configurations, and wall-fixing bar limits[cite: 2, 3].
        </p>
        <ul style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', margin: '0' }}>
          <li>Simple Panel Spacing & Clear Gap Verifications[cite: 2, 3]</li>
          <li>Bar-Hoop-Bar & Hoop-Bar-Hoop Pattern Layouts[cite: 2]</li>
          <li>Bar-Bar-Wall Offset Fixing Limits[cite: 2]</li>
        </ul>
      </div>

      {/* Preview Card 2: Balustrades Suite */}
      <div className="card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
            2. Balustrades & Stairs
          </h3>
          <span style={{ fontSize: '10px', color: '#0066cc', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
            12 Modules
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 8px 0' }}>
          Complete stair geometry engine, labor pricing, fastener counting, and live profit analysis.
        </p>
        <ul style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', margin: '0' }}>
          <li>Step Rising, Screed Make-Ups, and Pitch Angle</li>
          <li>100mm Sphere Gap Rule Regulation Checks</li>
          <li>Live Site Worker, CNC Machine, & Fastener Cost Trackers</li>
        </ul>
      </div>

      {/* Preview Card 3: Mats Suite */}
      <div className="card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>
            3. Mats Calculators
          </h3>
          <span style={{ fontSize: '10px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>
            Frameworks
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 8px 0' }}>
          Entrance matting frameworks, frame perimeter calculations, tray depths, and threshold trims.
        </p>
      </div>

      {/* Bottom CTA Card */}
      <div className="card" style={{ textAlign: 'center', marginTop: '8px' }}>
        <p style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
          Sign in or create an account to start calculating and save project data.
        </p>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <SignInButton mode="modal">
            <button className="btn">Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-secondary">Sign Up</button>
          </SignUpButton>
        </div>
      </div>

    </div>
  );
}