package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-project.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	database.AutoMigrate(&Member{})
	db = database

	// Data
	male := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)
}
