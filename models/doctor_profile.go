package models

type DoctorProfile struct {
	ID             uint   `gorm:"primaryKey" json:"id"`
	UserID         uint   `json:"user_id"`
	Specialization string `json:"specialization"`
	Bio            string `json:"bio"`
	Availability   string `json:"availability"`
}
