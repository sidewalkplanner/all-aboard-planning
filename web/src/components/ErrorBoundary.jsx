import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error in app tree:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <section style={{ maxWidth: 560, margin: 'auto', padding: '40px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#646A85', margin: '14px 0 0' }}>
            This page hit an unexpected error. Reloading usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 22, background: '#1A1C2B', color: '#F6F7FB', border: 'none', padding: '13px 24px', borderRadius: 10, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}
          >
            Reload the page
          </button>
        </section>
      </div>
    );
  }
}
