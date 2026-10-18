// app/components/SignedOutView.js
'use client';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

const featureCards = [
  {
    title: 'Stair Pitch & Rise Calculators',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    desc: 'Calculate exact step riser heights, floor-to-floor pitch angles, and verify compliance with UK Approved Document K building regulations automatically.',
  },
  {
    title: 'Balustrade & Spindle Spacing',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    desc: 'Work out exact bar gaps, delta geometry adjustments, and spindle spacing to guarantee safe handrail installations.',
  },
  {
    title: 'CNC Cutting & Material Densities',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    desc: 'Track sheet dimensions, material mass (kg), CNC run times, and hourly machining costs across custom timber or steel components.',
  },
  {
    title: 'Labor & Fastener Cost Tracking',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    desc: 'Log worker hours, component unit prices, and overall project job costs to keep site fabrication within budget.',
  },
];

export default function SignedOutView() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      
      {/* Hero Card */}
      <div className="card" style={{ background: '#ffffff', border: '1px solid #0066cc', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', color: '#0066cc' }}>Staircase Fabrication & Cost Suite</h2>
        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
          An all-in-one suite built for joiners, fabricators, and site managers to calculate staircase geometry and manage material expenses on mobile.
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

      {/* Cards with Photos and Detailed Explanations */}
      <div className="card-grid">
        {featureCards.map((card, idx) => (
          <div key={idx} className="card">
            <img src={card.image} alt={card.title} className="card-image" />
            <h2>{card.title}</h2>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>{card.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}