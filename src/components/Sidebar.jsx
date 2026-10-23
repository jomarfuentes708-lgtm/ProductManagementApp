const menuItems = [
  { label: 'Dashboard', icon: '▣' },
  { label: 'Products', icon: '◫', active: true },
  { label: 'Orders', icon: '◌' },
  { label: 'Customers', icon: '◎' },
  { label: 'Analytics', icon: '△' },
  { label: 'Settings', icon: '⚙' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-label">Management</p>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button type="button" className={item.active ? 'menu-item active' : 'menu-item'}>
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-card">
        <p className="sidebar-label">Monthly Goal</p>
        <h3>84%</h3>
        <p>Sales target reached this month.</p>
        <div className="progress-bar">
          <span></span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
