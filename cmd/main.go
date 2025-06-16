package main

import (
	"log"
	"maker/config"
	"maker/routes"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load(".env")
	db := config.ConnectDatabase()
	r := gin.Default()
	routes.SetupRoutes(r, db)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(r.Run(":" + port))
}
