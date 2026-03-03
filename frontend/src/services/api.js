import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const companyAPI = {
  createCompany: async (companyData) => {
    const response = await api.post('/companies', companyData)
    return response.data
  },
  
  getAllCompanies: async () => {
    const response = await api.get('/companies')
    return response.data
  },
  
  getCompany: async (id) => {
    const response = await api.get(`/companies/${id}`)
    return response.data
  },
}

export const shareholderAPI = {
  addShareholders: async (company_id, shareholders) => {
    const response = await api.post('/shareholders', {
      company_id,
      shareholders
    })
    return response.data
  }
}