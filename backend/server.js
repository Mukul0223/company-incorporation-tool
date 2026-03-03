const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const supabse = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

app.use(cors())
app.use(express.json())

const { router: companiesRouter, setSupabase: setCompaniesSupabase } = require('./routes/companies')
const { router: shareholdersRouter, setSupabase: setShareholdersSupabase } = require('./routes/shareholders')

setCompaniesSupabase(supabse)
setShareholdersSupabase(supabse)

app.get('/', (req, res) => {
  res.json({message: 'Company Incoporation API is running!'})
})

app.use('/api/companies', companiesRouter)
app.use('/api/shareholders', shareholdersRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})