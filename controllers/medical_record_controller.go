package controllers

import (
	"maker/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateMedicalRecord(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	if role != "doctor" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only doctors can create medical records"})
		return
	}
	var record models.MedicalRecord
	if err := c.ShouldBindJSON(&record); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&record)
	c.JSON(http.StatusCreated, record)
}

func GetMedicalRecords(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	username := c.GetString("username")
	var records []models.MedicalRecord
	if role == "patient" {
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		db.Where("patient_id = ?", user.ID).Find(&records)
	} else if role == "doctor" {
		var user models.User
		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
			return
		}
		db.Where("doctor_id = ?", user.ID).Find(&records)
	} else {
		db.Find(&records)
	}
	c.JSON(http.StatusOK, records)
}

func UpdateMedicalRecord(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	if role != "doctor" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only doctors can update medical records"})
		return
	}
	id := c.Param("id")
	var record models.MedicalRecord
	if err := db.First(&record, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Medical record not found"})
		return
	}
	c.BindJSON(&record)
	db.Save(&record)
	c.JSON(http.StatusOK, record)
}

func DeleteMedicalRecord(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	if role != "doctor" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only doctors can delete medical records"})
		return
	}
	id := c.Param("id")
	db.Delete(&models.MedicalRecord{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
