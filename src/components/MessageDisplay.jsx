export default function MessageDisplay({ messages = [] }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f9fafb' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '12px 16px' }}>
        {messages.length === 0 ? (
          <div style={{ color: '#6b7280', textAlign: 'center', padding: '24px 0' }}>
            The conversation is empty. Start chatting now!
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '8px 12px',
                  borderRadius: 12,
                  background: m.sender === 'user' ? '#3b82f6' : '#ffffff',
                  color: m.sender === 'user' ? 'white' : '#111827',
                  boxShadow: m.sender === 'user' ? 'none' : '0 1px 2px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                {m.timestamp && (
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                    {typeof m.timestamp === 'string' ? m.timestamp : new Date(m.timestamp).toLocaleTimeString()}
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
