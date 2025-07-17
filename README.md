# Interior Design Portfolio - Full Stack Website

A modern, responsive interior design portfolio website with a complete backend system, admin dashboard, and Google Sheets integration.

## Features

### Frontend
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Fast performance with Vite
- 🎭 Smooth animations and transitions
- 📱 Mobile-first responsive design
- 🔍 SEO optimized
- 🎯 Interactive portfolio gallery
- 📞 Contact form with validation

### Backend
- 🔐 JWT authentication with role-based access
- 🛡️ Encrypted data storage
- 📊 MongoDB database with Mongoose
- 📧 Email notifications
- 📈 Google Sheets integration
- 🚫 Spam protection
- 📁 File upload system
- 🔒 Rate limiting and security headers

### Admin Dashboard
- 📊 Real-time statistics and analytics
- 👥 User management
- 📞 Contact form submissions management
- 🖼️ Portfolio project management
- 📈 Activity monitoring
- 🔍 Advanced filtering and search

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Query
- React Hook Form
- Headless UI
- Heroicons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Nodemailer
- Google APIs
- Helmet
- Morgan
- Express Rate Limit

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Cloud Platform account (for Google Sheets API)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd interior-design-frontend
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Environment Setup

#### Frontend (.env)
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Backend (.env)
Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/interior-design-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google Sheets API
GOOGLE_SHEETS_CLIENT_ID=your-google-client-id
GOOGLE_SHEETS_CLIENT_SECRET=your-google-client-secret
GOOGLE_SHEETS_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### 5. Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create credentials (Service Account)
5. Download the JSON key file
6. Place it in the backend directory as `google-credentials.json`
7. Create a Google Sheet and share it with the service account email
8. Copy the spreadsheet ID from the URL

### 6. MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB (macOS with Homebrew)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend Development Server
```bash
# In a new terminal
npm run dev
```

### Production Mode

#### Build Frontend
```bash
npm run build
```

#### Start Production Server
```bash
cd backend
npm start
```

## Initial Setup

### 1. Create Admin User

After starting the backend server, create the first admin user:

```bash
curl -X POST http://localhost:5000/api/auth/setup-admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "your-secure-password"
  }'
```

Or use the admin setup endpoint in your browser/Postman.

### 2. Access Admin Dashboard

1. Go to `http://localhost:5173/admin/login`
2. Login with admin credentials
3. Access dashboard at `http://localhost:5173/admin/dashboard`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/setup-admin` - Create admin user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id` - Update contact status (admin)

### Projects
- `GET /api/projects` - Get all published projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard overview
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/activity` - Recent activity

## File Structure

```
interior-design-frontend/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   └── App.jsx            # Main app component
├── backend/
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js         # Express server
└── README.md
```

## Security Features

- 🔐 JWT token authentication
- 🔒 Password encryption with bcrypt
- 🛡️ Data encryption for sensitive information
- 🚫 Rate limiting to prevent abuse
- 🛡️ Helmet security headers
- 🚫 CORS protection
- 🚫 Input validation and sanitization
- 🚫 Spam detection for contact forms

## Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Backend (Heroku/Railway)
1. Set environment variables
2. Add MongoDB connection
3. Deploy with Git

### Environment Variables for Production
- Update `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Set production MongoDB URI
- Configure production email settings
- Update Google Sheets credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@example.com or create an issue in the repository.

## Changelog

### v1.0.0
- Initial release
- Full-stack implementation
- Admin dashboard
- Google Sheets integration
- Email notifications
- Security features 