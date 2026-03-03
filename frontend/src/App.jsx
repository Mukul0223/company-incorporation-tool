import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import CompanyInfo from './components/CompanyInfo';
import ShareholderInfo from './components/ShareholderInfo';
import AdminPage from './components/AdminPage';
import { companyAPI, shareholderAPI } from './services/api';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('form'); // 'form' or 'admin'
  const [currentStep, setCurrentStep] = useState(1);
  const [companyData, setCompanyData] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('company_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setCompanyData(draft.companyData);
        setCompanyId(draft.companyId);
        if (draft.companyId) {
          setCurrentStep(2);
        }
      } catch (err) {
        console.error('Error loading draft:', err);
      }
    }
  }, []);

  const saveDraft = (data, id) => {
    const draft = {
      companyData: data,
      companyId: id,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('company_draft', JSON.stringify(draft));
  };

  const handleStep1Submit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await companyAPI.createCompany(formData);
      const savedCompanyId = response.company.id;
      
      setCompanyData(formData);
      setCompanyId(savedCompanyId);
      saveDraft(formData, savedCompanyId);
      setCurrentStep(2);
    } catch (err) {
      console.error('Error saving company:', err);
      setError('Failed to save company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (shareholders) => {
    setLoading(true);
    setError(null);

    try {
      await shareholderAPI.addShareholders(companyId, shareholders);
      localStorage.removeItem('company_draft');
      setSuccess(true);
    } catch (err) {
      console.error('Error saving shareholders:', err);
      setError('Failed to save shareholders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setCompanyData(null);
    setCompanyId(null);
    setSuccess(false);
    setError(null);
    localStorage.removeItem('company_draft');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'form') {
      // Reset any errors when navigating back to form
      setError(null);
    }
  };

  return (
    <div>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === 'admin' ? (
        <AdminPage />
      ) : (
        <div className="app-container">
          <h1>Company Incorporation Tool</h1>
          <p className="subtitle">Register your company and shareholders</p>

          <div className="progress-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              Step 1: Company Info
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              Step 2: Shareholders
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {success ? (
            <div>
              <div className="success-message">
                <h2>✅ Success!</h2>
                <p>Company and shareholders have been registered successfully.</p>
              </div>
              <button onClick={handleStartOver} className="btn-primary">
                Register Another Company
              </button>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <CompanyInfo
                  onNext={handleStep1Submit}
                  initialData={companyData}
                />
              )}

              {currentStep === 2 && companyData && (
                <ShareholderInfo
                  numberOfShareholders={companyData.number_of_shareholders}
                  onSubmit={handleStep2Submit}
                  onBack={handleBack}
                />
              )}
            </>
          )}

          {loading && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p>Processing...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;