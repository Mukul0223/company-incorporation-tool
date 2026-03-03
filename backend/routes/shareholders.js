const express = require('express')
const router = express.Router()

let supabase

const setSupabase = (supabaseClient) => {
  supabase = supabaseClient
}

router.post('/', async (req, res) => {
  try {
    const { company_id, shareholders } = req.body
    
    if (!company_id || !shareholders || !Array.isArray(shareholders)) {
      return res.status(400).json({
        error: 'Invalid request. Provide company_id and shareholders array'
      })
    }
    
    for (const shareholder of shareholders) {
      if (!shareholder.first_name || !shareholder.last_name || !shareholder.nationality) {
        return res.status(400).json({
          error: 'Each shareholder must have first_name, last_name and nationality'
        })
      }
    }
    
    const shareholdersWithCompanyId = shareholders.map(sh => ({
      ...sh,
      company_id
    }))
    
    const { data, error } = await supabase.from('shareholders').insert(shareholdersWithCompanyId).select()
    
    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({error: error.message})
    }
    res.status(201).json({
      message: 'Shareholders added successfully',
      shareholders: data
    })
  } catch (error) {
    console.error('Server error', error)
    res.status(500).json({error: 'Internal server error'})
  }
})

module.exports = {router, setSupabase}