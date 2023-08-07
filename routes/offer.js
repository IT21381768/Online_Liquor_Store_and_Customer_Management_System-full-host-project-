const express = require('express');
const offer = require('../models/offer');
const router = express.Router();



//save post
router.post('/post', (req, res) => {
    let sup = new offer(req.body);
    sup.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: sup
        });
    });
});




//insert

// router.route('/post').post(function(req,res) {
//     let Details = new details(req.body);
//     Details.save()
//         .then(details => {
//             res.status(200).json({'service': 'service added succesfully'});
//         })
//         .catch (err => {
//             res.status(400).send ("Unable to save")
//         })
// })



//get post
router.get('/posts', (req, res) => {
    offer.find().exec((err, offer) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: offer
        });
    });
});

//update post

router.put('/post/:id', (req, res) => {
    offer.findByIdAndUpdate(   
        req.params.id,
        {
            $set: req.body
        },
        (err, post) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            return res.status(200).json({
                success: "Updated successfully"
            });
        }
    );
});


//delete post

router.delete('/post/:id', (req, res) => {
    offer.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });
        return res.json({
            message: "Delete successful", deletedPost
        });
    });
});

//get specific post

router.get("/post/:id", (req, res) => {
    let postId = req.params.id;
    offer.findById(postId , (err, post) => {
            if (err) {
                return res.status(400).json({ success: false, err })
            }
            return res.status(200).json({
                success: true,
                post
            });
        });
});



module.exports = router;