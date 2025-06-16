package routes

import (
	"maker/controllers"
	"maker/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	r.POST("/login", func(c *gin.Context) {
		controllers.Login(c, db)
	})
	auth := r.Group("/api")
	auth.Use(middleware.AuthMiddleware("receptionist", "doctor"))
	{
		auth.GET("/patients", func(c *gin.Context) { controllers.GetAllPatients(c, db) })
		auth.PUT("/patients/:id", func(c *gin.Context) { controllers.UpdatePatient(c, db) })
		auth.DELETE("/patients/:id", func(c *gin.Context) { controllers.DeletePatient(c, db) })
		auth.POST("/patients", middleware.AuthMiddleware("receptionist"), func(c *gin.Context) {
			controllers.CreatePatient(c, db)
		})
	}
}
