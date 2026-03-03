# Company Incorporation Tool

A full-stack application for registering companies and their shareholders with a multi-step form interface and admin dashboard.

## 🚀 Features

- **Multi-Step Form**: Intuitive two-step process for company registration
- **Draft Persistence**: Automatic saving with browser refresh protection
- **Admin Dashboard**: View all registered companies and shareholders
- **Form Validation**: Client-side validation for all inputs
- **Responsive Design**: Clean, modern UI that works on all devices
- **RESTful API**: Well-structured backend with proper error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **JavaScript** (ES6+)
- **Axios** for API calls
- **CSS3** for styling

### Backend
- **Node.js** with Express.js
- **Supabase** (PostgreSQL database)
- **CORS** enabled for cross-origin requests

### Database
- **PostgreSQL** (via Supabase)
- Two tables: `companies` and `shareholders`
- Proper foreign key relationships

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher) installed
- **npm** (comes with Node.js)
- **Supabase account** with a project created

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up
2. Create a new project
3. Wait for the project to be provisioned

### 2. Create Database Tables

Go to SQL Editor in your Supabase dashboard and run:
```sql
-- Create companies table
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  number_of_shareholders INTEGER NOT NULL,
  total_capital_invested DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shareholders table
CREATE TABLE shareholders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_shareholders_company_id ON shareholders(company_id);
```

### 3. Get API Credentials

1. Go to **Project Settings** → **API**
2. Copy your:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/company-incorporation-tool.git
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

## 📖 Usage

### Registering a Company

1. Open `http://localhost:5173` in your browser
2. Click **"Register Company"** in the navigation
3. Fill in **Step 1: Company Information**:
   - Company Name
   - Number of Shareholders
   - Total Capital Invested
4. Click **"Save & Continue"**
5. Fill in **Step 2: Shareholder Information** for each shareholder
6. Click **"Submit"**

### Viewing Registered Companies

1. Click **"Admin Dashboard"** in the navigation
2. View all registered companies
3. Click on any company card to expand and see shareholders
4. Use **"Refresh Data"** button to reload the list

### Draft Persistence

- Data from Step 1 is automatically saved to the database and browser
- If you refresh the page, your progress is preserved
- You can continue from where you left off

## 🗂️ Project Structure
```
company-incorporation-tool/
├── backend/
│   ├── routes/
│   │   ├── companies.js       # Company endpoints
│   │   └── shareholders.js    # Shareholder endpoints
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Step1CompanyInfo.jsx
│   │   │   ├── Step2ShareholderInfo.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── Navigation.jsx
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   └── package.json
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Companies

- **POST** `/api/companies` - Create a new company
```json
  {
    "company_name": "Tech Corp",
    "number_of_shareholders": 2,
    "total_capital_invested": 100000
  }
```

- **GET** `/api/companies` - Get all companies with shareholders

- **GET** `/api/companies/:id` - Get single company with shareholders

### Shareholders

- **POST** `/api/shareholders` - Add shareholders to a company
```json
  {
    "company_id": "uuid-here",
    "shareholders": [
      {
        "first_name": "John",
        "last_name": "Doe",
        "nationality": "American"
      }
    ]
  }
```

## ✨ Key Features Implemented

### Required Features ✅
- [x] Multi-step form (2 steps)
- [x] Company information persistence
- [x] Draft save to database
- [x] Browser refresh protection
- [x] Dynamic shareholder forms based on count
- [x] RESTful API endpoints
- [x] SQL database with proper relationships
- [x] Admin view for all companies

### Additional Features ✅
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Success feedback
- [x] Clean UI/UX
- [x] Expandable company cards
- [x] Statistics dashboard
- [x] Navigation between pages

## 🧪 Testing the Application

### Test Scenario 1: Complete Registration
1. Fill Step 1 with test data
2. Complete Step 2 with shareholder details
3. Verify success message appears
4. Check Admin Dashboard to confirm data

### Test Scenario 2: Draft Persistence
1. Fill Step 1 and save
2. Refresh the browser (F5)
3. Verify data persists and Step 2 is shown
4. Complete registration

### Test Scenario 3: Validation
1. Try submitting Step 1 with empty fields
2. Verify error messages appear
3. Fill in correct data
4. Verify form submits successfully

## 🐛 Troubleshooting

### Backend won't start
- Check if `.env` file exists in `backend/` folder
- Verify Supabase credentials are correct
- Ensure port 5000 is not being used by another application

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Ensure both servers are running

### Database errors
- Verify tables are created in Supabase
- Check Supabase dashboard for any errors
- Ensure foreign key relationships are set up correctly

## 📝 Development Notes

- The application uses localStorage for draft persistence on the client side
- Data is saved to the database immediately after Step 1
- Form validation is performed on both client and server side
- The admin dashboard fetches fresh data from the database

## 🎯 Future Enhancements

- [ ] Edit existing companies
- [ ] Delete companies/shareholders
- [ ] Search and filter functionality
- [ ] Export data to CSV/PDF
- [ ] User authentication
- [ ] Email notifications
- [ ] Company document uploads
- [ ] Shareholder ownership percentages

## 👨‍💻 Author

**Your Name**
- GitHub: [@Mukul0223](https://github.com/Mukul0223)

## 📄 License

This project was created as part of a technical assessment.

## 🙏 Acknowledgments

- Built with React and Express.js
- Database hosted on Supabase
- Created as part of a full-stack developer assessment