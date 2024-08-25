"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here, if any
            // For example:
            // Book.belongsTo(models.Author, { foreignKey: 'authorId', as: 'author' });
        }
    }

    Book.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // Decimal type for currency
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0, // Default stock value
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            language: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Book",
            tableName: "books",
            timestamps: true, // Automatically manage createdAt and updatedAt fields
        }
    );

    return Book;
};
