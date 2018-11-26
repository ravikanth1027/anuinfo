const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    WorkerName: String,
    FatherName: String,
    AadharNumber:  {type: Number, required: true },
    MobileNumber : {type: Number, required: true, unique: true },
    /*RegistrationNo : String,
    Validity : Date*/
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);