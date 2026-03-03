const express = require('express')
const router = express.Router()

let supabase

const setSupabase = (supabaseClient) => {
  supabase = supabaseClient
}

router.post('/', async (req, res) => {
  try {
    const { company_name, number_of_shareholders, total_capital_invested } = req.body

    if (!company_name || !number_of_shareholders || !total_capital_invested) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      })
    }

    const { data, error } = await supabase
      .from('companies')
      .insert([
        {
          company_name,
          number_of_shareholders,
          total_capital_invested
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: error.message })
    }

    res.status(201).json({
      message: 'Company created successfully',
      company: data
    })

  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        shareholders (*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: error.message })
    }

    res.json({
      companies: data
    })

  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        shareholders (*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return res.status(404).json({ error: 'Company not found' })
    }

    res.json({
      company: data
    })

  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = { router, setSupabase }