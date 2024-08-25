"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });

            Cart.hasMany(models.CartItem, {
                foreignKey: "cartId",
                as: "items",
                onDelete: "CASCADE",
            });
        }
    }

    Cart.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            isOrdered: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            userId: {
                type: DataTypes.INTEGER,
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
            modelName: "Cart",
            tableName: "carts",
            timestamps: true,
        }
    );

    return Cart;
};
