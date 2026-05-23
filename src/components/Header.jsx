export default function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: '#ffffff',
        color: '#1a1a1a',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 1000,
        borderBottom: '1px solid #e5e5e5'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="chat icon">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.01 1 4.32L2 22l6.68-1c1.31.64 2.78 1 4.32 1 5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#1a1a1a" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>Chat</span>
          <span style={{ fontSize: 11, color: '#999', marginTop: 2 }}>Groq powered</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />
    </header>
  );
}
