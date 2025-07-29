package models

type Appointment struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	PatientID uint   `json:"patient_id"`
	DoctorID  uint   `json:"doctor_id"`
	Time      string `json:"time"`
	Status    string `json:"status"`
	Notes     string `json:"notes"`
}
