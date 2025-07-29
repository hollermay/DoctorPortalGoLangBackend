package config

import (
	"log"
	"maker/models"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() *gorm.DB {
	dsn := os.Getenv("DB_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}

	// Auto migrate all models
	db.AutoMigrate(
		&models.User{},
		&models.Patient{},
		&models.Appointment{},
		&models.MedicalRecord{},
		&models.DoctorProfile{},
	)

	// Seed admin user if it doesn't exist
	seedAdminUser(db)

	return db
}

func seedAdminUser(db *gorm.DB) {
	var adminUser models.User
	result := db.Where("username = ?", "admin").First(&adminUser)

	if result.Error != nil {
		// Admin user doesn't exist, create it
		adminUser = models.User{
			Username: "admin",
			Password: "admin123", // In production, use hashed passwords
			Role:     "admin",
			Email:    "admin@hospital.com",
			Phone:    "1234567890",
		}

		if err := db.Create(&adminUser).Error; err != nil {
			log.Printf("Failed to create admin user: %v", err)
		} else {
			log.Println("Admin user created successfully")
			log.Println("Username: admin")
			log.Println("Password: admin123")
		}
	}
}
