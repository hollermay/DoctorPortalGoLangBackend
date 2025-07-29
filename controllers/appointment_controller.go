package controllers

import (
	"maker/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateAppointment(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	username := c.GetString("username")
	var appt models.Appointment
	if err := c.ShouldBindJSON(&appt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if role == "patient" {
		// Only allow creating for self
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		appt.PatientID = user.ID
	}
	db.Create(&appt)
	c.JSON(http.StatusCreated, appt)
}

func GetAppointments(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	username := c.GetString("username")
	var appts []models.Appointment
	if role == "patient" {
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		db.Where("patient_id = ?", user.ID).Find(&appts)
	} else if role == "doctor" {
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		db.Where("doctor_id = ?", user.ID).Find(&appts)
	} else {
		db.Find(&appts)
	}
	c.JSON(http.StatusOK, appts)
}

func UpdateAppointment(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	id := c.Param("id")
	var appt models.Appointment
	if err := db.First(&appt, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appointment not found"})
		return
	}
	if role == "patient" || role == "doctor" {
		username := c.GetString("username")
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		if (role == "patient" && appt.PatientID != user.ID) || (role == "doctor" && appt.DoctorID != user.ID) {
			c.JSON(http.StatusForbidden, gin.H{"error": "Not allowed"})
			return
		}
	}
	c.BindJSON(&appt)
	db.Save(&appt)
	c.JSON(http.StatusOK, appt)
}

func DeleteAppointment(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	id := c.Param("id")
	var appt models.Appointment
	if err := db.First(&appt, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Appointment not found"})
		return
	}
	if role == "patient" || role == "doctor" {
		username := c.GetString("username")
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		if (role == "patient" && appt.PatientID != user.ID) || (role == "doctor" && appt.DoctorID != user.ID) {
			c.JSON(http.StatusForbidden, gin.H{"error": "Not allowed"})
			return
		}
	}
	db.Delete(&models.Appointment{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
