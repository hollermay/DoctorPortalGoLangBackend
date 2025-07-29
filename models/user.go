package models

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Username string `gorm:"unique" json:"username"`
	Password string `json:"password"` // Corrected: This will now bind the "password" field from JSON
	Role     string `json:"role"`     // "receptionist", "doctor", "patient", "admin"
	Email    string `gorm:"unique" json:"email"`
	Phone    string `json:"phone"`
}
