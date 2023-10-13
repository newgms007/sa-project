package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/newgms007/sa-66/entity"
)

// POST /users

func CreateMember(c *gin.Context) {

	var member_id entity.Member

	if err := c.ShouldBindJSON(&member_id); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&member_id).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member_id})

}

// GET /user/:id

func GetMember(c *gin.Context) {

	var member_id entity.Member

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member_id).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member_id})

}

// GET /users

func ListMembers(c *gin.Context) {

	var member_id []entity.Member

	if err := entity.DB().Raw("SELECT * FROM members").Scan(&member_id).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member_id})

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

	var member_id entity.Member

	if err := c.ShouldBindJSON(&member_id); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", member_id.ID).First(&member_id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&member_id).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": member_id})

}
