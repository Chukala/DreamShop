const mongoose = require('mongoose');
// putting databaseschemas in a model module

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});



module.exports = mongoose.model("Admin", adminSchema);
