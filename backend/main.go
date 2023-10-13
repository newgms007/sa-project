package main

import (
	"github.com/gin-gonic/gin"

	"github.com/newgms007/sa-66/controller"

	"github.com/newgms007/sa-66/entity"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// User Routes

	r.GET("/members", controller.ListMembers)

	r.GET("/members/:id", controller.GetMember)

	r.POST("/members", controller.CreateMember)

	r.PATCH("/members", controller.UpdateMember)

	r.DELETE("/members/:id", controller.DeleteMember)
	
	r.GET("/genders", controller.ListGenders)

	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
