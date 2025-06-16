package controllers

import (
	"maker/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePatient(c *gin.Context, db *gorm.DB) {
	var patient models.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&patient)
	c.JSON(http.StatusCreated, patient)
}

func GetAllPatients(c *gin.Context, db *gorm.DB) {
	var patients []models.Patient
	db.Find(&patients)
	c.JSON(http.StatusOK, patients)
}

func UpdatePatient(c *gin.Context, db *gorm.DB) {
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
	id := c.Param("id")
	db.Delete(&models.Patient{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
}
