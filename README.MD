# 🏥 Doctor-Reception Portal

A web application built with **Golang (Gin)** and **PostgreSQL** for managing patient records with role-based access control.

## Features

- **Role-based Authentication**
  - Receptionist: Full CRUD operations on patient records
  - Doctor: View and update patient information
- JWT-based authentication
- Unit tests
- Postman documentation
- Clean architecture
- Role-based access control

## 📁 Project Structure

```
reception-doctor-portal/
├── cmd/
│   └── main.go                 # Application entry point
├── config/
│   └── db.go                   # Database configuration
├── controllers/
│   ├── auth_controller.go      # Authentication handlers
│   └── patient_controller.go   # Patient management handlers
├── middleware/
│   └── auth.go                 # JWT authentication middleware
├── models/
│   ├── user.go                 # User model
│   └── patient.go              # Patient model
├── routes/
│   └── routes.go               # API routes
├── utils/
│   └── jwt.go                  # JWT utilities
├── tests/
│   └── unit_test.go            # Unit tests
├── go.mod                      # Go module file
├── go.sum                      # Dependency checksums
├── .env                        # Environment variables
└── README.md                   # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Go 1.21 or higher
- PostgreSQL 12 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/reception-doctor-portal.git
   cd reception-doctor-portal
   ```

2. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=8080
   DB_URL=postgres://myuser:mypassword@localhost:5432/doctor_portal
   JWT_SECRET=your_secret_key
   ```

3. **Install dependencies**
   ```bash
   go mod tidy
   ```

4. **Set up the database**
   ```sql
   CREATE DATABASE doctor_portal;
   CREATE USER myuser WITH PASSWORD 'mypassword';
   GRANT ALL PRIVILEGES ON DATABASE doctor_portal TO myuser;
   ```

5. **Run the application**
   ```bash
   go run cmd/main.go
   ```
   The application will be available at `http://localhost:8080`

## 📚 API Documentation

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | /login   | User login  | No           |

### Patient Management

| Method | Endpoint           | Description        | Required Role |
|--------|-------------------|-------------------|---------------|
| GET    | /api/patients     | List all patients | All           |
| POST   | /api/patients     | Create patient    | Receptionist  |
| PUT    | /api/patients/:id | Update patient    | All           |
| DELETE | /api/patients/:id | Delete patient    | Receptionist  |

### Authentication Headers

For protected routes, include the JWT token in the request header:
```
Authorization: Bearer <your_jwt_token>
```

## 📦 Postman Collection

Import the provided Postman collection for API testing:
- `DoctorReceptionPortalDocs.postman_collection.json`

## 🔑 Default User

```sql
INSERT INTO users (username, password, role)
VALUES ('admin', 'admin', 'receptionist');
```

## 🛠️ Future Enhancements

- [ ] Swagger API documentation
- [ ] User registration API
- [ ] Patient search and filtering
- [ ] Docker containerization
- [ ] CI/CD pipeline


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
