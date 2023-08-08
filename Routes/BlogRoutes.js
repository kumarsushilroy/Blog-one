
const express = require('express');
const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlogs, getSingleUserBlog } = require('../Controllers/BlogController');

const router = express.Router();

// post blog method ...................................
router.route('/create/blog').post(createBlog);

// get blog method..................
router.route('/get/all/blogs').get(getAllBlogs);

// get single Blog...............
router.route('/get/single/blog/:id').get(getSingleBlog);

// get singleUser blog method........................
router.route('/get/singleuser/blog/:id').get(getSingleUserBlog);

// update blog method............................
router.route('/update/blog/:id').put(updateBlog); 

// delete blog method .........................
router.route('/delete/blog/:id').delete(deleteBlogs);

 
module.exports = router; 