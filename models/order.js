"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            /* An order belongs to a user */
            Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });

            /* An order has many order items */
            Order.hasMany(models.OrderItem, {
                foreignKey: "orderId",
                as: "items",
            });
        }
    }

    Order.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "pending", // Default status to 'pending'
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
            modelName: "Order",
            tableName: "orders",
            timestamps: true, // Automatically add createdAt and updatedAt
        }
    );

    return Order;
};
