const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//initializes Post model (table) to store data
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


        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },


        user_id: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: "user",
            },
        },
    },

    {
        sequelize,
        freezeTableName: true,
        modelName: "post",
        underscored: true,
    }

);

module.exports=Post;