export default function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: '#0f172a',
        color: 'white',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 1000,
        boxShadow: '0 2px 6px rgba(2,6,23,0.15)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }} aria-hidden>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="chat icon">
          <rect x="2" y="3" width="20" height="14" rx="3" fill="#0747A6" />
          <path d="M7 18l-1.5 3L12 18" fill="#0747A6" />
          <circle cx="8.5" cy="9" r="1" fill="#fff" />
          <circle cx="12" cy="9" r="1" fill="#fff" />
          <circle cx="15.5" cy="9" r="1" fill="#fff" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Rapid Chatbot</span>
        <span style={{ fontSize: 12, color: '#93c5fd', marginTop: 2 }}>a Groq powered chatbot</span>
      </div>

      <div style={{ flex: 1 }} />
    </header>
  );
}
