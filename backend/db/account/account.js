const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const Account = new Schema({
    id : String,
    password : String,
    nickname : String,
    created : {
        type : Date,
        default : Date.now
    }
});

Account.methods.generateHash = function(password){
    return bcrypt.hashSync(password, 8);
};

Account.methods.validateHash = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("account", Account);