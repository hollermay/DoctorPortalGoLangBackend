package main

import (
	"log"
	"maker/config"
	"maker/models"

	"gorm.io/gorm"
)

func main() {
	db := config.ConnectDatabase()
	seedDatabase(db)
}

func seedDatabase(db *gorm.DB) {
	// Create admin user
	createUserIfNotExists(db, models.User{
		Username: "admin",
		Password: "admin123",
		Role:     "admin",
		Email:    "admin@hospital.com",
		Phone:    "1234567890",
	})

	// Create receptionist users
	createUserIfNotExists(db, models.User{
		Username: "receptionist1",
		Password: "receptionist123",
		Role:     "receptionist",
		Email:    "receptionist1@hospital.com",
		Phone:    "1234567891",
	})

	createUserIfNotExists(db, models.User{
		Username: "receptionist2",
		Password: "receptionist123",
		Role:     "receptionist",
		Email:    "receptionist2@hospital.com",
		Phone:    "1234567892",
	})

	// Create doctor users
	createUserIfNotExists(db, models.User{
		Username: "doctor1",
		Password: "doctor123",
		Role:     "doctor",
		Email:    "doctor1@hospital.com",
		Phone:    "1234567893",
	})

	createUserIfNotExists(db, models.User{
		Username: "doctor2",
		Password: "doctor123",
		Role:     "doctor",
		Email:    "doctor2@hospital.com",
		Phone:    "1234567894",
	})

	// Create patient users
	createUserIfNotExists(db, models.User{
		Username: "patient1",
		Password: "patient123",
		Role:     "patient",
		Email:    "patient1@email.com",
		Phone:    "1234567895",
	})

	createUserIfNotExists(db, models.User{
		Username: "patient2",
		Password: "patient123",
		Role:     "patient",
		Email:    "patient2@email.com",
		Phone:    "1234567896",
	})

	// Create sample patients
	createPatientIfNotExists(db, models.Patient{
		Name:    "John Doe",
		Age:     35,
		Gender:  "Male",
		Address: "123 Main St, City, State",
		Phone:   "1234567897",
		Email:   "john.doe@email.com",
		Disease: "Hypertension",
	})

	createPatientIfNotExists(db, models.Patient{
		Name:    "Jane Smith",
		Age:     28,
		Gender:  "Female",
		Address: "456 Oak Ave, City, State",
		Phone:   "1234567898",
		Email:   "jane.smith@email.com",
		Disease: "Diabetes",
	})

	createPatientIfNotExists(db, models.Patient{
		Name:    "Mike Johnson",
		Age:     42,
		Gender:  "Male",
		Address: "789 Pine Rd, City, State",
		Phone:   "1234567899",
		Email:   "mike.johnson@email.com",
		Disease: "Asthma",
	})

	// Create doctor profiles
	var doctor1User models.User
	db.Where("username = ?", "doctor1").First(&doctor1User)
	if doctor1User.ID != 0 {
		createDoctorProfileIfNotExists(db, models.DoctorProfile{
			UserID:         doctor1User.ID,
			Specialization: "Cardiology",
			Bio:            "Experienced cardiologist with 15 years of practice",
			Availability:   "Monday-Friday, 9AM-5PM",
		})
	}

	var doctor2User models.User
	db.Where("username = ?", "doctor2").First(&doctor2User)
	if doctor2User.ID != 0 {
		createDoctorProfileIfNotExists(db, models.DoctorProfile{
			UserID:         doctor2User.ID,
			Specialization: "Neurology",
			Bio:            "Specialist in neurological disorders and treatments",
			Availability:   "Tuesday-Saturday, 10AM-6PM",
		})
	}

	log.Println("Database seeding completed successfully!")
	log.Println("\n=== Login Credentials ===")
	log.Println("Admin:")
	log.Println("  Username: admin")
	log.Println("  Password: admin123")
	log.Println("\nReceptionist:")
	log.Println("  Username: receptionist1")
	log.Println("  Password: receptionist123")
	log.Println("\nDoctor:")
	log.Println("  Username: doctor1")
	log.Println("  Password: doctor123")
	log.Println("\nPatient:")
	log.Println("  Username: patient1")
	log.Println("  Password: patient123")
}

func createUserIfNotExists(db *gorm.DB, user models.User) {
	var existingUser models.User
	result := db.Where("username = ?", user.Username).First(&existingUser)

	if result.Error != nil {
		if err := db.Create(&user).Error; err != nil {
			log.Printf("Failed to create user %s: %v", user.Username, err)
		} else {
			log.Printf("Created user: %s", user.Username)
		}
	} else {
		log.Printf("User %s already exists", user.Username)
	}
}

func createPatientIfNotExists(db *gorm.DB, patient models.Patient) {
	var existingPatient models.Patient
	result := db.Where("email = ?", patient.Email).First(&existingPatient)

	if result.Error != nil {
		if err := db.Create(&patient).Error; err != nil {
			log.Printf("Failed to create patient %s: %v", patient.Name, err)
		} else {
			log.Printf("Created patient: %s", patient.Name)
		}
	} else {
		log.Printf("Patient %s already exists", patient.Name)
	}
}

func createDoctorProfileIfNotExists(db *gorm.DB, profile models.DoctorProfile) {
	var existingProfile models.DoctorProfile
	result := db.Where("user_id = ?", profile.UserID).First(&existingProfile)

	if result.Error != nil {
		if err := db.Create(&profile).Error; err != nil {
			log.Printf("Failed to create doctor profile for user ID %d: %v", profile.UserID, err)
		} else {
			log.Printf("Created doctor profile for user ID: %d", profile.UserID)
		}
	} else {
		log.Printf("Doctor profile for user ID %d already exists", profile.UserID)
	}
}
