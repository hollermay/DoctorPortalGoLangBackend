package controllers

import (
	"maker/models"
	"maker/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Login(c *gin.Context, db *gorm.DB) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user models.User
	db.Where("username = ? AND password = ?", input.Username, input.Password).First(&user)
	if user.ID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}
	token, _ := utils.GenerateJWT(user.Username, user.Role)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
