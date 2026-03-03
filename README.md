# Company Incorporation Tool

A full-stack application for registering companies and shareholders.

## 📋 Prerequisites
- **Node.js** (v16 or higher)
- **Supabase account**

## 🗄️ Database Setup
Go to the **SQL Editor** in your [Supabase](https://supabase.com) dashboard and run:

```sql
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  number_of_shareholders INTEGER NOT NULL,
  total_capital_invested DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE shareholders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_shareholders_company_id ON shareholders(company_id);
```
## ⚙️ Installation & Environment
### 1. Clone the Repository
```bash
git clone https://github.com/Mukul0223/company-incorporation-tool.git
cd company-incorporation-tool
```
### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
# Create .env file
touch .env
```

Add the following to `backend/.env`:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual credentials.

### 3. Frontend Setup
```bash
# Navigate to frontend folder (from root)
cd ../frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

You need to run both backend and frontend servers simultaneously.

### Terminal 1: Start Backend Server
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### Terminal 2: Start Frontend Server
```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`
