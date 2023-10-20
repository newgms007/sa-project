package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model

	Email          string
	Username       string
	Password       string
	Hashedpassword string

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"foreignKey:GenderID"`
}

type Gender struct {
	gorm.Model
	Name   string
	Member []Member `gorm:"foreignKey:GenderID"`
}
