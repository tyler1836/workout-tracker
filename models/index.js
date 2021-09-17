const Posts = require('./Posts');
const Users = require('./Users');

Posts.belongsTo(Users, {
	foreignKey: 'user_id',
	onDelete: 'SET NULL',
});

module.exports = { Posts, Users };
