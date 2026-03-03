function Navigation({ currentPage, onNavigate }) {
  return (
    <div className="nav-container">
      <nav>
        <a 
          href="#"
          className={`nav-link ${currentPage === 'form' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('form');
          }}
        >
          Register Company
        </a>
        
        <a 
          href="#"
          className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('admin');
          }}
        >
          Admin Dashboard
        </a>
      </nav>
    </div>
  );
}

export default Navigation;