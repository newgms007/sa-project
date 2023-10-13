package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model
	member_id int
	Email     string
	Username  string
	Password  string

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"foreignKey:GenderID"`
}

type Gender struct {
	gorm.Model
	Name   string
	Member []Member `gorm:"foreignKey:GenderID"`
}
