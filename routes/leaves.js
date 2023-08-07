const express = require('express');
const leaves = require('../models/leaves');
const router = express.Router();

// Save leave
router.post('/post', (req, res) => {
  let newLeave = new leaves(req.body);
  newLeave.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: newLeave
    });
  });
});



// Get leaves
router.get('/post', (req, res) => {
    leaves.find().exec((err, leaves) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        existingPosts: leaves
      });
    });
  });
  

// Update leave
router.put('/post/:id', (req, res) => {
  leaves.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (err, leave) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated successfully"
      });
    }
  );
});

// Delete leave
router.delete('/post/:id', (req, res) => {
  leaves.findByIdAndRemove(req.params.id).exec((err, deletedLeave) => {
    if (err) {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err
      });
    }
    return res.json({
      message: "Delete successful",
      deletedLeave
    });
  });
});

// Get specific leave
router.get("/post/:id", (req, res) => {
  let leaveId = req.params.id;
  leaves.findById(leaveId, (err, leave) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      leave
    });
  });
});

module.exports = router;
