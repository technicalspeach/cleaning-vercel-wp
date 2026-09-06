import React from 'react';

export default async function Navigation() {
  return (
    <header style={{ padding: '20px', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <strong style={{ fontSize: '20px' }}>Cleaning Xpert</strong>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
        </div>
      </div>
    </header>
  );
}
