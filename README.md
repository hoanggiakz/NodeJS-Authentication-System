# NodeJS Authentication System

A comprehensive authentication system built with Node.js, Express.js, and MongoDB featuring user registration, login, Google OAuth integration, and session management.

## 👨‍🎓 Student Information
- **Name:** Nguyen Hoang Gia
- **Student ID:** 22003145
- **Course:** Web Development with Node.js

## 🚀 Features

- ✅ **User Registration** - Create new user accounts with validation
- ✅ **User Authentication** - Secure login/logout functionality
- ✅ **Google OAuth Integration** - Sign in with Google account
- ✅ **Session Management** - Maintain user sessions across requests
- ✅ **Protected Routes** - Dashboard and profile pages for authenticated users
- ✅ **Responsive UI** - Bootstrap-powered responsive design
- ✅ **Student Information Display** - Shows student details on all pages
- ✅ **API Endpoints** - JSON API support for testing
- ✅ **Input Validation** - Form validation and error handling

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js (Google OAuth 2.0)
- **Session Storage:** Express Session
- **Template Engine:** EJS with Express EJS Layouts
- **Styling:** Bootstrap 5
- **Development:** Nodemon for auto-restart

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)
- A Google Cloud Console account (for OAuth setup)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/NodeJS-Authentication-System.git
cd NodeJS-Authentication-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_CONNECTION_STRING=mongodb://localhost:27017/nodejs_auth_system

# Session Configuration
SESSION_SECRET=your_super_secret_session_key_here

# Google OAuth Configuration (Optional)
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/auth/google/callback

# Student Information
STUDENT_NAME=Nguyen Hoang Gia
STUDENT_ID=22003145
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/auth/google/callback`
6. Copy Client ID and Client Secret to `.env` file

### 5. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Or using MongoDB Compass
# Connect to: mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `DB_CONNECTION_STRING` in `.env`

## 🚀 Running the Application

### Development Mode

```bash
npm start
# or
npm run dev
```

The application will start on `http://localhost:3000`

### Production Mode

```bash
NODE_ENV=production node app.js
```

## 📱 Application Structure

```
NodeJS-Authentication-System/
├── config/
│   ├── mongodb.js          # Database configuration
│   └── student.js          # Student information
├── routes/
│   ├── routes.js           # Main application routes
│   └── authRoutes.js       # Authentication routes
├── views/
│   ├── layout.ejs          # Base template
│   ├── index.ejs           # Home page
│   ├── signin.ejs          # Login page
│   ├── signup.ejs          # Registration page
│   ├── dashboard.ejs       # User dashboard
│   └── profile.ejs         # User profile
├── public/
│   └── results/            # Test screenshots
│       ├── login.png
│       ├── register.png
│       ├── dashboard.png
│       └── ...
├── .env                    # Environment variables
├── app.js                  # Main application file
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🌐 Available Routes

### Web Routes (HTML)
- `GET /` - Home page
- `GET /user/signin` - Login page
- `POST /user/signin` - Process login
- `GET /user/signup` - Registration page  
- `POST /user/signup` - Process registration
- `GET /user/dashboard` - User dashboard (protected)
- `GET /user/profile` - User profile (protected)
- `GET /user/logout` - Logout user

### Authentication Routes
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - OAuth logout

### API Routes (JSON)
- `GET /user/api/me` - Get current user info (JSON)
- All POST routes support both form-data and JSON

## 🧪 Testing

### Manual Testing

1. **Registration Flow:**
   - Visit `http://localhost:3000/user/signup`
   - Fill in the form with valid data
   - Submit and verify success message

2. **Login Flow:**
   - Visit `http://localhost:3000/user/signin`
   - Use credentials from registration
   - Verify redirect to dashboard

3. **Protected Routes:**
   - Try accessing `/user/dashboard` without login
   - Should redirect to signin page

4. **Google OAuth:**
   - Click "Sign in with Google" button
   - Complete Google authentication
   - Verify redirect to dashboard

### API Testing with Postman

Import the provided Postman collection for comprehensive API testing:

1. **Test Registration (JSON):**
```bash
POST http://localhost:3000/user/signup
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
}
```

2. **Test Login (JSON):**
```bash
POST http://localhost:3000/user/signin
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}
```

### Test Results

All test screenshots are stored in `public/results/`:
- `login.png` - Login functionality test
- `register.png` - Registration functionality test
- `dashboard.png` - Dashboard access test
- `profile.png` - Profile page test
- `logout.png` - Logout functionality test
- `google-auth.png` - Google OAuth test
- `postman-tests.png` - API testing results

## 🔒 Security Features

- **Password Validation** - Minimum requirements enforced
- **Session Security** - Secure session configuration
- **Input Sanitization** - Form data validation
- **CSRF Protection** - Session-based CSRF tokens
- **Environment Variables** - Sensitive data in `.env`
- **Error Handling** - Proper error messages without data leakage

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   **Solution:** Make sure MongoDB is running locally or check Atlas connection string

2. **Session Not Persisting**
   ```bash
   Error: Cannot read property of undefined (session)
   ```
   **Solution:** Verify SESSION_SECRET in `.env` file

3. **Google OAuth Not Working**
   ```bash
   Error: GoogleStrategy requires a clientID option
   ```
   **Solution:** Add CLIENT_ID and CLIENT_SECRET to `.env`

4. **Views Not Found**
   ```bash
   Error: Failed to lookup view "dashboard"
   ```
   **Solution:** Ensure all EJS files exist in `views/` directory

### Debug Mode

Enable debug logging:
```bash
DEBUG=app:* npm start
```

## 📝 Development Notes

### Adding New Features

1. **New Routes:** Add to `routes/routes.js`
2. **New Views:** Create EJS files in `views/`
3. **Database Models:** Add to `models/` directory
4. **Middleware:** Add to `middleware/` directory

### Code Style

- Use CommonJS syntax (`require`/`module.exports`)
- Follow ESLint configuration
- Add JSDoc comments for functions
- Use meaningful variable names

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nguyen Hoang Gia**
- Student ID: 22003145
- Email: [hoanggiakz@gmail.com](mailto:hoanggiakz@gmail.com)
- GitHub: [hoanggiakz](https://github.com/hoanggiakz)

## Acknowledgments

- Original repository by [mrhuynhnam](https://github.com/mrhuynhnam/NodeJS-Authentication-System)
- Bootstrap for responsive UI components
- Google for OAuth 2.0 integration
- MongoDB for database solution
- Node.js and Express.js communities

---

**Note:** This project was developed as part of a Node.js web development course. The application demonstrates practical implementation of authentication systems and modern web development practices.

---

**Last Updated:** January 2025