package models

type Patient struct {
	ID      uint            `gorm:"primaryKey" json:"id"`
	Name    string          `json:"name"`
	Age     int             `json:"age"`
	Gender  string          `json:"gender"`
	Address string          `json:"address"`
	Phone   string          `json:"phone"`
	Email   string          `json:"email"`
	Disease string          `json:"disease"`
	Records []MedicalRecord `gorm:"foreignKey:PatientID" json:"records"`
}
