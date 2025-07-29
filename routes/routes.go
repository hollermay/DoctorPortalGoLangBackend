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
	auth.Use(middleware.AuthMiddleware("receptionist", "doctor", "patient", "admin"))
	{
		// Patient routes
		auth.GET("/patients", func(c *gin.Context) { controllers.GetAllPatients(c, db) })
		auth.PUT("/patients/:id", func(c *gin.Context) { controllers.UpdatePatient(c, db) })
		auth.DELETE("/patients/:id", func(c *gin.Context) { controllers.DeletePatient(c, db) })
		auth.POST("/patients", middleware.AuthMiddleware("receptionist"), func(c *gin.Context) {
			controllers.CreatePatient(c, db)
		})

		// Appointment routes
		auth.GET("/appointments", func(c *gin.Context) { controllers.GetAppointments(c, db) })
		auth.POST("/appointments", func(c *gin.Context) { controllers.CreateAppointment(c, db) })
		auth.PUT("/appointments/:id", func(c *gin.Context) { controllers.UpdateAppointment(c, db) })
		auth.DELETE("/appointments/:id", func(c *gin.Context) { controllers.DeleteAppointment(c, db) })

		// Medical record routes
		auth.GET("/medical-records", func(c *gin.Context) { controllers.GetMedicalRecords(c, db) })
		auth.POST("/medical-records", middleware.AuthMiddleware("doctor"), func(c *gin.Context) {
			controllers.CreateMedicalRecord(c, db)
		})
		auth.PUT("/medical-records/:id", middleware.AuthMiddleware("doctor"), func(c *gin.Context) {
			controllers.UpdateMedicalRecord(c, db)
		})
		auth.DELETE("/medical-records/:id", middleware.AuthMiddleware("doctor"), func(c *gin.Context) {
			controllers.DeleteMedicalRecord(c, db)
		})

		// Doctor profile routes
		auth.GET("/doctor-profiles", func(c *gin.Context) { controllers.GetDoctorProfiles(c, db) })
		auth.GET("/doctor-profiles/:id", func(c *gin.Context) { controllers.GetDoctorProfileById(c, db) })
		auth.POST("/doctor-profiles", middleware.AuthMiddleware("doctor"), func(c *gin.Context) {
			controllers.CreateOrUpdateDoctorProfile(c, db)
		})
		auth.PUT("/doctor-profiles", middleware.AuthMiddleware("doctor"), func(c *gin.Context) {
			controllers.CreateOrUpdateDoctorProfile(c, db)
		})
	}
}
