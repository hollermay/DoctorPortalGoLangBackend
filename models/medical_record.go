package models

type MedicalRecord struct {
	ID            uint   `gorm:"primaryKey" json:"id"`
	PatientID     uint   `json:"patient_id"`
	DoctorID      uint   `json:"doctor_id"`
	Date          string `json:"date"`
	Description   string `json:"description"`
	Prescriptions string `json:"prescriptions"`
	LabResults    string `json:"lab_results"`
}
