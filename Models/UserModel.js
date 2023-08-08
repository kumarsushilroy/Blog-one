
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    blogs:[
      {
        type:mongoose.Types.ObjectId,
        ref:'blogss',
        
      }
     
    ]

    
    
}, {timestamps:true});

module.exports = mongoose.model('users', userSchema ); 