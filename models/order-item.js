"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class OrderItem extends Model {
        static associate(models) {
            /* An order item belongs to an order */
            OrderItem.belongsTo(models.Order, {
                foreignKey: "orderId",
                as: "order",
            });

            /* An order item belongs to a book */
            OrderItem.belongsTo(models.Book, {
                foreignKey: "bookId",
                as: "book",
            });
        }
    }

    OrderItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bookId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1, // Default quantity to 1
            },
            perItemPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
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
            modelName: "OrderItem",
            tableName: "order_items",
            timestamps: true, // Automatically add createdAt and updatedAt
        }
    );

    return OrderItem;
};
