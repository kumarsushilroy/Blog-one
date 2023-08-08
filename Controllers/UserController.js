const bcrypt = require("bcrypt");
const userModel = require("../Models/UserModel");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {  
      return res.status(401).send({ 
        success: false,
        msg: "please fill all fields",
      });
    }

    //  const existing = userModel.findOne({email});

    //  if(existing){
    //     res.status(501).send({ 
    //         success:false,
    //         msg : "user already exist !"    
    //     })
    //  }

    const hashpassword = await bcrypt.hash(password, 10);

    const registerUser = new userModel({
      username,
      email,
      password: hashpassword,
    });

    const createdUser = await registerUser.save();

    res.status(201).send({
      success: true,
      msg: "successfully registered !",
      createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status({
      success: false,
      msg: "error while registering",
      error,
    });
  }
};

// get all user funcion............................
exports.getAlluser = async (req, res) => {
  const getUser = await userModel.find({});

  res.status(201).send({
    success: true,
    msg: "success",
    getUser,
  });
};

// login function........................................
exports.loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        msg: "please enter email and password",
      });

      
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success:false,
        msg:'please enter valid emailId !'
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return res.status(401).send({
          success: false,
          msg: "please input valid password",
        });
      }

      return await res.status(201).send({
        success: true,
        msg: "login successfull",
        user
      });

  } catch (error) {
    console.log(error);
    res.status({
      success: false,
      msg: "error while logging !",
      error,
    });
  }


};
