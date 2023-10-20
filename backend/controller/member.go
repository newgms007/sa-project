package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/newgms007/sa-66/entity"
)

// POST /users

func CreateMember(c *gin.Context) {

	var member entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	newMember := entity.Member{
		Email:          member.Email,
		Username:       member.Username,
		Password:       member.Password,
		GenderID:       member.GenderID,
		Hashedpassword: member.Hashedpassword,
	}

	if err := entity.DB().Create(&newMember).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": newMember})

}

// GET /user/:id

func GetMember(c *gin.Context) {

	var member entity.Member

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member})

}

// GET /users

func ListMembers(c *gin.Context) {

	var member []entity.Member

	if err := entity.DB().Raw("SELECT * FROM members").Scan(&member).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member})

}

// DELETE /users/:id

func DeleteMember(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateMember(c *gin.Context) {

	var member entity.Member

	if err := c.ShouldBindJSON(&member); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", member.ID).First(&member); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&member).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member})

}

func GetMemberByHash(c *gin.Context) {
	var member entity.Member
	hashedPassword := c.Param("hashed_password")

	// Replace this with a proper database query to retrieve the customer by hashed password
	if err := entity.DB().Where("hashed_password = ?", hashedPassword).First(&member).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}
