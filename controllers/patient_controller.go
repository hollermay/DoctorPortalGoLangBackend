package controllers

import (
	"maker/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePatient(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	if role != "receptionist" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only receptionists can create patients"})
		return
	}
	var patient models.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&patient)
	c.JSON(http.StatusCreated, patient)
}

func GetAllPatients(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	username := c.GetString("username")
	var patients []models.Patient
	if role == "patient" {
		// Only return the patient record for the logged-in patient
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		if err := db.Where("email = ?", user.Email).Find(&patients).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Patient record not found"})
			return
		}
	} else {
		db.Find(&patients)
	}
	c.JSON(http.StatusOK, patients)
}

func UpdatePatient(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	if role != "receptionist" && role != "doctor" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only receptionists and doctors can update patients"})
		return
	}
	id := c.Param("id")
	var patient models.Patient
	if err := db.First(&patient, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Patient not found"})
		return
	}
	c.BindJSON(&patient)
	db.Save(&patient)
	c.JSON(http.StatusOK, patient)
}

func DeletePatient(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	if role != "receptionist" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only receptionists can delete patients"})
		return
	}
	id := c.Param("id")
	db.Delete(&models.Patient{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
