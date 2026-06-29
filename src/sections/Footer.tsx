export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '3rem 2rem',
      }}
    >
      <div
        className="content-inner footer-layout"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logo + Copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.15em',
              color: '#ffffff',
            }}
          >
            ADTRON
          </span>
          <span style={{ color: 'var(--color-fg-dim)', fontSize: '0.875rem' }}>
            © 2025 Hefei Hito Technology Development Co., Ltd.
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <button
              key={link}
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                fontSize: '0.6875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-fg-dim)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-dim)')}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-layout {
            flex-direction: row !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </footer>
  )
}
