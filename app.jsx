function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'cyan',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '12px', color: '#f472b6' }}>
        TrendNexus (Test)
      </h1>
      <p>GitHub Pages + React + Babel のテスト表示です。</p>
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
