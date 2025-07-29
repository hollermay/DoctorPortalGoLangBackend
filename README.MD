# Doctor Portal - GoLang Backend with React Frontend

A comprehensive healthcare management system built with Go (Gin) backend and React TypeScript frontend.

## Features

- **Patient Management**: Add, view, and manage patient records
- **Appointment Scheduling**: Book and manage appointments with time-based filtering
- **Doctor Profiles**: View doctor specializations and availability
- **Medical Records**: Create and manage patient medical records
- **Role-based Access Control**: Different permissions for admin, doctors, receptionists, and patients
- **Modern UI**: Beautiful, responsive dashboard with dark theme

## Tech Stack

### Backend
- **Go** with **Gin** framework
- **GORM** for database ORM
- **PostgreSQL** database
- **JWT** for authentication
- **CORS** middleware for frontend integration

### Frontend
- **React** with **TypeScript**
- **Vite** for build tooling
- **React Router** for navigation
- **React Icons** for UI icons

## Setup Instructions

### Prerequisites
- Go 1.21 or higher
- Node.js 16 or higher
- PostgreSQL database

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DoctorPortalGoLangBackend
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DB_URL=postgres://username:password@localhost:5432/doctor_portal
   PORT=8080
   JWT_SECRET=your-secret-key
   ```

3. **Install Go dependencies**
   ```bash
   go mod tidy
   ```

4. **Run database migrations and seed data**
   ```bash
   go run cmd/main.go
   ```
   This will automatically create the admin user and other test users.

5. **Run the seed script (optional - for additional test data)**
   ```bash
   go run cmd/seed.go
   ```

6. **Start the backend server**
   ```bash
   go run cmd/main.go
   ```
   The server will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

## Login Credentials

The system comes with pre-configured users for testing:

### Admin User
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Full system access

### Receptionist Users
- **Username**: `receptionist1` or `receptionist2`
- **Password**: `receptionist123`
- **Role**: Can manage patients, appointments, and view records

### Doctor Users
- **Username**: `doctor1` or `doctor2`
- **Password**: `doctor123`
- **Role**: Can view patients, manage appointments, and create medical records

### Patient Users
- **Username**: `patient1` or `patient2`
- **Password**: `patient123`
- **Role**: Can view their own appointments and medical records

## API Endpoints

### Authentication
- `POST /login` - User login

### Protected Routes (require JWT token)
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient (receptionist only)
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

- `GET /api/medical-records` - Get medical records
- `POST /api/medical-records` - Create medical record (doctor only)
- `PUT /api/medical-records/:id` - Update medical record (doctor only)
- `DELETE /api/medical-records/:id` - Delete medical record (doctor only)

- `GET /api/doctor-profiles` - Get doctor profiles
- `POST /api/doctor-profiles` - Create/update doctor profile (doctor only)

## Dashboard Features

### Overview Tab
- Quick statistics and navigation cards
- Real-time counts of patients, appointments, doctors, and records

### Patients Tab
- View all patient records in a grid layout
- Add new patients (receptionist/admin only)
- Patient information includes name, age, gender, contact details, and disease

### Appointments Tab
- View all appointments with search functionality
- Filter appointments by time (Today, Upcoming, Past, All)
- Book new appointments with patient and doctor selection
- Appointment status tracking (Scheduled, Completed, Cancelled)

### Doctors Tab
- View doctor profiles and specializations
- Doctor availability information

### Medical Records Tab
- View all medical records
- Add new medical records (doctors only)
- Record details include patient info, diagnosis, prescriptions, and lab results

## Role-based Permissions

### Admin
- Full access to all features
- Can manage all users and data

### Receptionist
- Can create and manage patients
- Can book and manage appointments
- Can view all records

### Doctor
- Can view patients and appointments
- Can create and manage medical records
- Can update their own profile

### Patient
- Can view their own appointments
- Can view their own medical records
- Limited access to other features

## Development

### Backend Development
- The backend uses Gin framework with GORM for database operations
- JWT middleware handles authentication
- CORS is configured for frontend integration
- All models are auto-migrated on startup

### Frontend Development
- React with TypeScript for type safety
- Modern CSS-in-JS styling
- Responsive design with mobile support
- Real-time data fetching from API

## Security Notes

⚠️ **Important**: This is a development setup. For production:

1. Use environment variables for sensitive data
2. Implement proper password hashing (bcrypt)
3. Use HTTPS
4. Implement rate limiting
5. Add input validation and sanitization
6. Use a proper JWT secret key
7. Implement proper error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.