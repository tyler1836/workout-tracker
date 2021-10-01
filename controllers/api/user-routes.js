const User = require('../../models/User');
const Post = require('../../models/Post');
const router = require('express').Router();
// const { User, Post } = require('sequelize')
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const loggedIn = (req, res, next) => {
	console.log(req.session.loggedIn, '-----------');
	if (req.session.loggedIn) {
		next();
	} else {
		res.redirect('/login');
	}
};

router.get('/login', (req, res) => {
	res.render('loginpage');
});

router.get('/signup', (req, res) => {
	res.render('signuppage');
});

//dashboard
router.get('/dashboard', loggedIn, (req, res) => {
	Post.findAll({
		where: {
			user_id: req.session.user_id,
		},
		attributes: ['id', 'post_text', 'title', 'created_at'],
		include: [
			{
				model: User,
				attributes: ['username'],
			},
		],
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render('notespage', { posts, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// router.post('/signup', async (req, res) => {

//   const { username, email, password } = req.body;

//   let user = await User.findOne({
//     where: {email}
//   });
//   console.log(chalk.blue(user));

//   // if (!user) {
//   //   return res.redirect('/login');
//   // }

//   user = new User({
//     username,
//     email,
//     password
//   });

//   await user.save();

//   res.redirect('/login');

// });

router.post('/signup', (req, res) => {
	User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.username = dbUserData.username;
				req.session.loggedIn = true;

				res.json(dbUserData);

				console.log(chalk.blue(dbUserData));
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/login', async (req, res) => {
	// expects {email: password:}
	const { email, password } = req.body;
	console.log(email, password);
	const user = await User.findOne({
		where: { email },
	});
	console.log(user);
	if (!user) {
		res.redirect('/api/signup');
	}

	const matchPass = await bcrypt.compare(password, user.password);

	if (!matchPass) {
		res.redirect('/api/login');
	}
	req.session.save(() => {
		req.session.user_id = user.id;
		req.session.username = user.username;
		req.session.loggedIn = true;
		res.json({ user: user.username, message: 'You are now logged in!' });
	});

	// if(loggedIn){
	//   res.redirect('/api/dashboard')
	// }
});

router.delete('/:id', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//logout
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
module.exports = router;
