package controllers

import (
	"maker/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateOrUpdateDoctorProfile(c *gin.Context, db *gorm.DB) {
	role := c.GetString("role")
	username := c.GetString("username")
	if role != "doctor" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only doctors can update their profile"})
		return
	}
	var user models.User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "User not found"})
		return
	}
	var profile models.DoctorProfile
	if err := db.Where("user_id = ?", user.ID).First(&profile).Error; err != nil {
		profile.UserID = user.ID
		if err := c.ShouldBindJSON(&profile); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&profile)
		c.JSON(http.StatusCreated, profile)
		return
	}
	c.BindJSON(&profile)
	db.Save(&profile)
	c.JSON(http.StatusOK, profile)
}

func GetDoctorProfiles(c *gin.Context, db *gorm.DB) {
	var profiles []models.DoctorProfile
	db.Find(&profiles)
	c.JSON(http.StatusOK, profiles)
}

func GetDoctorProfileById(c *gin.Context, db *gorm.DB) {
	id := c.Param("id")
	var profile models.DoctorProfile
	if err := db.First(&profile, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Doctor profile not found"})
		return
	}
	c.JSON(http.StatusOK, profile)
}
