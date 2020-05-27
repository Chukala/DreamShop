const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
  //passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({ 

    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
 
userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model("User", userSchema);


/*var userSchema = new mongoose.Schema({
    local: {
        name: {
            type: String
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
    },
    facebook: {
        id: {
            type: String
        },
        token: {
            type: String
        },
        email: {
            type: String
        },
        name: {
            type: String
        }
    }
});

module.exports = mongoose.model('User', userSchema);*/

