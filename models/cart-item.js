"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class CartItem extends Model {
        static associate(models) {
            CartItem.belongsTo(models.Cart, {
                foreignKey: "cartId",
                as: "cart",
            });

            CartItem.belongsTo(models.Book, {
                foreignKey: "bookId",
                as: "book",
            });
        }
    }

    CartItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cartId: {
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
                defaultValue: 1,
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
            modelName: "CartItem",
            tableName: "cart_items",
            timestamps: true,
        }
    );

    return CartItem;
};
