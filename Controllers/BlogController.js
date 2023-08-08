const BlogModel = require("../Models/BlogModel");
const UserModel = require("../Models/UserModel");
const mongoose = require("mongoose");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      res.status(501).send({
        success: false,
        msg: "all fields require",
      });
    }

    const existingUser = await UserModel.findById(user);
    if(!existingUser){
      res.status(400).send({
        success:false,
        msg:'user not found' 
      })
    }

    const blogCreating =  new BlogModel({ title, description, image, user });
       const session = await mongoose.startSession();
       session.startTransaction()
       await blogCreating.save({session})
       existingUser.blogs.push(blogCreating)
       await existingUser.save({session})
       await session.commitTransaction() 

    await blogCreating.save();

    return res.status(201).send({
      success: true,
      msg: "blog created",
      blogCreating,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: "error while creating blog",
      error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find({});
    if (!allBlogs) {
      return res.status(401).send({
        success: false,
        msg: "no blog found",
      });
    }
    return res.status(201).send({
      success: true,
      blogCount: allBlogs.length,
      msg: "blog found",
      allBlogs,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "error while getting posts",
      error,
    });
  }
};

exports.getSingleBlog = async(req,res)=>{
  try {
    const id = req.params.id;
    const getSingle = await BlogModel.findById(id);
    if(!getSingle){
      return res.status(501).send({
        success:false,
        msg:'blog not found',
      })
    }
    res.status(201).send({
      success:true,
      msg:'blog found',
      getSingle
    })
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success:false,
      msg:'error while finding blogs',
      error
    })
  }
}

exports.getSingleUserBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const userBlog = await UserModel.findById(id).populate('blogs')
    if (!userBlog) {
      return res.status(401).send({
        success: false,
        msg: "cant find single blog", 
      });
    }

    return res.status(201).send({ 
      success: true,
      msg: "single blog found",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "error while getting single blog",
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBlog = await BlogModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(201).send({
      success: true,
      msg: "updated successfully",
      updateBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "error while updating",
      error,
    });
  }
};

exports.deleteBlogs = async (req, res) => {

  try {
    const id = req.params.id;
    const deleteBlog = await BlogModel.findByIdAndDelete(id).populate('user');
    await deleteBlog.user.blogs.pull(deleteBlog);
    await deleteBlog.user.save();
    res.status(201).send({
      success: true,
      msg: "deleted success",
      deleteBlog
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({ 
      success: false,
      msg: "error while deleting",
      error
    });
  }
};
