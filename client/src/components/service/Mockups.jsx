// Decorative device mockups for the Capabilities section (same content as the live site's drawn phones/laptop)
export function AppMockup() {
  return (
    <div className="mock mock--app" aria-hidden="true">
      <div className="mock-phone mock-phone--back">
        <div className="mock-phone__screen mock-phone__screen--dark">
          <div className="mock-phone__status"><span>9:41</span><span>●●●</span></div>
          <small>Good Morning</small>
          <strong>John 👋</strong>
          <div className="mock-search">⌕ Search services...</div>
          <div className="mock-tiles">
            <span><b>🍔</b>Food Delivery</span>
            <span><b>🛍</b>Grocery</span>
          </div>
          <small className="mock-label">Popular Services</small>
          {[['Medicine', 'Fast delivery'], ['Beauty', 'At your home'], ['Electronics', 'Best deals']].map(([a, b]) => (
            <div key={a} className="mock-row"><i />{a}<em>{b}</em></div>
          ))}
        </div>
      </div>
      <div className="mock-phone mock-phone--front">
        <div className="mock-phone__screen">
          <div className="mock-phone__status"><span>9:41</span><span>●●●</span></div>
          <small>Total Balance</small>
          <div className="mock-balance">₹ 24,500 <em>+12%</em></div>
          <div className="mock-actions"><span>◉<br />Send</span><span>▣<br />Receive</span><span>●<br />History</span></div>
          <small className="mock-label">Recent Activity</small>
          {[['Shopping', '-₹1,250'], ['Food Order', '-₹320'], ['Mobile Recharge', '-₹299'], ['Salary Credit', '+₹25,000']].map(([a, b]) => (
            <div key={a} className="mock-row"><i />{a}<em className={b.startsWith('+') ? 'up' : ''}>{b}</em></div>
          ))}
          <div className="mock-tabbar">⌂ ▢ ⌁ ◉</div>
        </div>
      </div>
      <span className="mock-chip mock-chip--1">◈</span>
      <span className="mock-chip mock-chip--2">⚛</span>
      <span className="mock-chip mock-chip--3">⌁</span>
    </div>
  );
}

export function SoftwareMockup() {
  return (
    <div className="mock mock--software" aria-hidden="true">
      <div className="mock-laptop">
        <div className="mock-laptop__screen">
          <div className="mock-dash">
            <aside><i /><i /><i /><i /><i /></aside>
            <div className="mock-dash__main">
              <div className="mock-dash__kpis"><span /><span /><span /></div>
              <div className="mock-dash__chart">
                {[40, 65, 50, 80, 60, 90, 72].map((h, i) => <b key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />)}
              </div>
              <div className="mock-dash__rows"><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <div className="mock-laptop__base" />
      </div>
      <div className="mock-phone mock-phone--mini">
        <div className="mock-phone__screen">
          <div className="mock-dash__kpis"><span /><span /></div>
          <div className="mock-dash__chart">{[50, 75, 60, 90].map((h, i) => <b key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} />)}</div>
          <div className="mock-dash__rows"><i /><i /></div>
        </div>
      </div>
      {['☁', 'GO', 'JS', '◆', '⚙'].map((t, i) => <span key={t} className={`mock-chip mock-chip--t${i + 1}`}>{t}</span>)}
    </div>
  );
}
