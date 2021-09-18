const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
	foreignKey: 'post_id' 
});

Post.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'SET NULL',
});

module.exports = { Post, User };
