const express = require('express');
const cart = require('../models/cart');
const router = express.Router();


//save post
router.post('/post/c', (req, res) => {
    let ca = new cart(req.body);
    ca.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: ca
        });
    });
});


//get post
router.get('/posts/c', (req, res) => {
    cart.find().exec((err, cart) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: cart
        });
    });
});


//update post
router.put('/post/c/:id', (req, res) => {
    cart.findByIdAndUpdate(   
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
router.delete('/post/c/:id', (req, res) => {
    cart.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });
        return res.json({
            message: "Delete successful", deletedPost
        });
    });
});


//get specific post
router.get("/post/c/:id", (req, res) => {
    let postId = req.params.id;
    cart.findById(postId , (err, post) => {
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




