import { useState } from 'react';

function CompanyInfo({ onNext, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      company_name: '',
      number_of_shareholders: '',
      total_capital_invested: '',
    }
  )

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required'
    }

    if (!formData.number_of_shareholders) {
      newErrors.number_of_shareholders = 'Number of shareholders is required'
    } else if (formData.number_of_shareholders < 1) {
      newErrors.number_of_shareholders = 'Must have at least 1 shareholder'
    }

    if (!formData.total_capital_invested) {
      newErrors.total_capital_invested = 'Total capital invested is required'
    } else if (formData.total_capital_invested <= 0) {
      newErrors.total_capital_invested = 'Capital must be greater than 0'
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      const dataToSubmit = {
        company_name: formData.company_name,
        number_of_shareholders: parseInt(formData.number_of_shareholders),
        total_capital_invested: parseFloat(formData.total_capital_invested),
      }
      onNext(dataToSubmit)
    }
  }

  return (
    <div className="form-container">
      <h2>Step 1: Company Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company_name">Company Name *</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter company name"
          />
          {errors.company_name && (
            <span className="error-message">{errors.company_name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="number_of_shareholders">Number of Shareholders *</label>
          <input
            type="number"
            id="number_of_shareholders"
            name="number_of_shareholders"
            value={formData.number_of_shareholders}
            onChange={handleChange}
            placeholder="Enter number of shareholders"
            min="1"
          />
          {errors.number_of_shareholders && (
            <span className="error-message">{errors.number_of_shareholders}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="total_capital_invested">Total Capital Invested *</label>
          <input
            type="number"
            id="total_capital_invested"
            name="total_capital_invested"
            value={formData.total_capital_invested}
            onChange={handleChange}
            placeholder="Enter total capital"
            min="0"
            step="0.01"
          />
          {errors.total_capital_invested && (
            <span className="error-message">{errors.total_capital_invested}</span>
          )}
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfo;