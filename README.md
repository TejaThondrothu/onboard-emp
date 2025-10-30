# Employee Onboarding System

A secure, production-ready employee onboarding application built with React, Express, and Supabase.

## Features

- Secure authentication with JWT and bcrypt password hashing
- Role-based access control (Admin/User)
- Complete employee onboarding workflow
- Document management with Cloudinary integration
- Rate limiting and security headers
- Input validation and sanitization
- Supabase PostgreSQL database with Row Level Security

## Tech Stack

### Backend
- Node.js + Express
- Supabase (PostgreSQL)
- JWT authentication
- bcrypt password hashing
- Helmet (security headers)
- express-rate-limit
- express-validator

### Frontend
- React 19
- React Router
- Tailwind CSS
- Axios
- React Toastify

## Prerequisites

- Node.js 18+
- Supabase account
- Cloudinary account (for file uploads)
- Resend account (for emails)

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
PORT=5000
NODE_ENV=production

SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

JWT_SECRET=your-super-secure-jwt-secret-key-min-32-chars

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

RESEND_API_KEY=your-resend-api-key

FRONTEND_URL=http://localhost:5173

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

Run migrations (already applied to Supabase):
- Database schema is automatically created in Supabase
- All tables have Row Level Security enabled
- Proper indexes for performance

Start backend:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd onboard-frontend
npm install
```

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Build frontend:
```bash
npm run build
```

Development mode:
```bash
npm run dev
```

## Security Features

### Authentication & Authorization
- JWT tokens with 8-hour expiration
- Bcrypt password hashing (12 rounds)
- Token verification on protected routes
- Role-based access control (Admin/User)
- Account status validation

### Input Validation
- Server-side validation using express-validator
- Email validation and normalization
- SQL injection prevention via parameterized queries
- XSS protection

### Rate Limiting
- Global API rate limit: 100 requests per 15 minutes
- Login endpoint: 5 attempts per 15 minutes
- IP-based tracking

### Security Headers (Helmet)
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Cross-Origin Resource Policy

### Database Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Service role used for admin operations
- Prepared statements prevent SQL injection
- Foreign key constraints maintain data integrity

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- Returns JWT token

### User Management (Protected)
- `POST /api/users/createUser` - Create new user (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/email/:email` - Get user by email
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/:id/status` - Change user status (Admin only)

### Onboarding (Protected)
- `POST /api/onboard` - Save employee onboarding details
- `GET /api/onboard/:registrationId` - Get employee details

## Database Schema

### Tables
- users
- employee_details
- employee_contact_details
- employee_bank_details
- education_details
- education_documents
- experience_details
- experience_napier_details
- experience_documents
- emergency_contacts
- dependent_details
- nominee_details
- personal_documents
- background_verification_documents

All tables include:
- UUID primary keys
- Timestamps (created_at, updated_at)
- Foreign key relationships
- RLS policies

## Production Deployment

### Environment Variables
1. Generate a strong JWT secret (min 32 characters)
2. Use production Supabase credentials
3. Configure allowed CORS origins
4. Set NODE_ENV=production
5. Configure rate limits based on traffic

### Security Checklist
- [ ] Change all default passwords and secrets
- [ ] Enable HTTPS/TLS
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging
- [ ] Enable database backups
- [ ] Review and test all RLS policies
- [ ] Configure proper CORS origins
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable database connection pooling
- [ ] Set up CDN for static assets

### Performance Optimization
- Database indexes are pre-configured
- API responses are optimized
- Frontend build is production-optimized
- Consider implementing Redis for session storage
- Use connection pooling for database

## Error Handling

The application includes comprehensive error handling:
- Async error wrapper for controllers
- Global error handler middleware
- Validation error formatting
- JWT error handling
- Database error handling
- 404 handler for unknown routes

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd onboard-frontend
npm run dev
```

## Testing

Test health endpoint:
```bash
curl http://localhost:5000/health
```

## Support

For issues or questions, please refer to the project documentation or contact the development team.

## License

Proprietary - All rights reserved
