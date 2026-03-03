import { useState, useEffect } from 'react';
import { companyAPI } from '../services/api';

function AdminPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await companyAPI.getAllCompanies();
      setCompanies(response.companies);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (companyId) => {
    if (expandedCompany === companyId) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(companyId);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <p>Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <div className="error-message">{error}</div>
        <button onClick={fetchCompanies} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">All registered companies and shareholders</p>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Companies</h3>
          <p className="stat-number">{companies.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Shareholders</h3>
          <p className="stat-number">
            {companies.reduce((sum, company) => sum + (company.shareholders?.length || 0), 0)}
          </p>
        </div>
      </div>

      {companies.length === 0 ? (
        <div className="empty-state">
          <p>No companies registered yet.</p>
        </div>
      ) : (
        <div className="companies-list">
          {companies.map((company) => (
            <div key={company.id} className="company-card">
              <div 
                className="company-header"
                onClick={() => toggleExpand(company.id)}
              >
                <div className="company-info">
                  <h3>{company.company_name}</h3>
                  <p className="company-meta">
                    {company.number_of_shareholders} shareholder(s) • 
                    Capital: {formatCurrency(company.total_capital_invested)}
                  </p>
                  <p className="company-date">
                    Registered: {formatDate(company.created_at)}
                  </p>
                </div>
                <button className="expand-btn">
                  {expandedCompany === company.id ? '▼' : '▶'}
                </button>
              </div>

              {expandedCompany === company.id && (
                <div className="shareholders-section">
                  <h4>Shareholders</h4>
                  {company.shareholders && company.shareholders.length > 0 ? (
                    <table className="shareholders-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Nationality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {company.shareholders.map((shareholder, index) => (
                          <tr key={shareholder.id}>
                            <td>{index + 1}</td>
                            <td>{shareholder.first_name}</td>
                            <td>{shareholder.last_name}</td>
                            <td>{shareholder.nationality}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-shareholders">No shareholders registered yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={fetchCompanies} className="btn-secondary" style={{ marginTop: '20px' }}>
        Refresh Data
      </button>
    </div>
  );
}

export default AdminPage;