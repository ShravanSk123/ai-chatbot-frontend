export default function MessageDisplay({ messages = [] }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#ffffff', paddingTop: '56px', paddingBottom: '120px' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 20px' }}>
        {messages.length === 0 ? (
          <div style={{
            color: '#999',
            textAlign: 'center',
            padding: '60px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.01 1 4.32L2 22l6.68-1c1.31.64 2.78 1 4.32 1 5.52 0 10-4.48 10-10S17.52 2 12 2z" stroke="#ddd" strokeWidth="1" />
            </svg>
            <p style={{ fontSize: 15, margin: 0 }}>Start a conversation</p>
            <p style={{ fontSize: 13, margin: 0, color: '#bbb' }}>Type a message below to begin</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 16,
                gap: 8
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: m.sender === 'user' ? '10px 16px' : '12px 16px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.sender === 'user' ? '#1a1a1a' : '#f0f0f0',
                  color: m.sender === 'user' ? '#ffffff' : '#1a1a1a',
                  wordWrap: 'break-word',
                  boxShadow: 'none'
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
                {m.timestamp && (
                  <div style={{ fontSize: 12, opacity: m.sender === 'user' ? 0.6 : 0.5, marginTop: 6 }}>
                    {typeof m.timestamp === 'string' ? m.timestamp : new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
