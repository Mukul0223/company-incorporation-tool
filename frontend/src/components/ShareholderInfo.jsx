import { useState } from 'react';

function ShareholderInfo({ numberOfShareholders, onSubmit, onBack }) {
  const [shareholders, setShareholders] = useState(
    Array(numberOfShareholders).fill(null).map(() => ({
      first_name: '',
      last_name: '',
      nationality: '',
    }))
  )

  const [errors, setErrors] = useState({})

  const handleChange = (index, field, value) => {
    const newShareholders = [...shareholders]
    newShareholders[index][field] = value
    setShareholders(newShareholders)

    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors }
      delete newErrors[`${index}-${field}`]
      setErrors(newErrors)
    }
  }

  const validate = () => {
    const newErrors = {}

    shareholders.forEach((shareholder, index) => {
      if (!shareholder.first_name.trim()) {
        newErrors[`${index}-first_name`] = 'First name is required'
      }
      if (!shareholder.last_name.trim()) {
        newErrors[`${index}-last_name`] = 'Last name is required'
      }
      if (!shareholder.nationality.trim()) {
        newErrors[`${index}-nationality`] = 'Nationality is required'
      }
    })

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      onSubmit(shareholders)
    }
  }

  return (
    <div className="form-container">
      <h2>Step 2: Shareholder Information</h2>
      <p className="subtitle">Enter details for {numberOfShareholders} shareholder(s)</p>

      <form onSubmit={handleSubmit}>
        {shareholders.map((shareholder, index) => (
          <div key={index} className="shareholder-section">
            <h3>Shareholder {index + 1}</h3>

            <div className="form-group">
              <label htmlFor={`first_name_${index}`}>First Name *</label>
              <input
                type="text"
                id={`first_name_${index}`}
                value={shareholder.first_name}
                onChange={(e) => handleChange(index, 'first_name', e.target.value)}
                placeholder="Enter first name"
              />
              {errors[`${index}-first_name`] && (
                <span className="error-message">{errors[`${index}-first_name`]}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`last_name_${index}`}>Last Name *</label>
              <input
                type="text"
                id={`last_name_${index}`}
                value={shareholder.last_name}
                onChange={(e) => handleChange(index, 'last_name', e.target.value)}
                placeholder="Enter last name"
              />
              {errors[`${index}-last_name`] && (
                <span className="error-message">{errors[`${index}-last_name`]}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`nationality_${index}`}>Nationality *</label>
              <input
                type="text"
                id={`nationality_${index}`}
                value={shareholder.nationality}
                onChange={(e) => handleChange(index, 'nationality', e.target.value)}
                placeholder="Enter nationality"
              />
              {errors[`${index}-nationality`] && (
                <span className="error-message">{errors[`${index}-nationality`]}</span>
              )}
            </div>
          </div>
        ))}

        <div className="button-group">
          <button type="button" onClick={onBack} className="btn-secondary">
            Back
          </button>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShareholderInfo;