const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    res.render('notespage')
});

router.get('/:id', (req, res)=> {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title'],
        include: [
            {
                model: User,
                attributes: [ 'id',  'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            
        ]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this specific id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res)=> {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'There are no posts found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res)=> {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id to delete' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;

