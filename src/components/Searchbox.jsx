export default function Searchbox() {
    return (
        <div style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '16px' }}>
            <div style={{ maxWidth: '896px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <textarea
                        placeholder="Type your message here..."
                        rows="1"
                        style={{ 
                            flex: 1, 
                            padding: '12px 16px', 
                            border: '1px solid #d1d5db', 
                            borderRadius: '8px',
                            fontSize: '14px',
                            resize: 'none',
                            outline: 'none'
                        }}
                    />
                    <button
                        style={{ 
                            padding: '12px 24px',  
                            color: 'white', 
                            borderRadius: '8px', 
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'blue',
                            cursor: 'pointer',
                        }}>
                        <span>Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}