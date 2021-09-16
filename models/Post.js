const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//initializes Post model
class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    }
)
