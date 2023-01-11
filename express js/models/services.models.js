const mongoose = require("mongoose");
var validate = require('mongoose-validator');

var titleValidator = [
    validate({
      validator: 'isLength',
      arguments: [15, 50],
      message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
];
  

var objectId = require('mongoose').Types.ObjectId; 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const servicesSchema = mongoose.Schema({
    title: { type: String, required: true, validate: titleValidator },
    description: String,
    dateAdded: Date,
    lastUpdated: String,
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAccount"
    }
 });

servicesSchema.methods.findByServiceId = function(val) {
    return mongoose.model("services").find({ _id : new objectId(val) });
}

servicesSchema.methods.findByTitle = function(val) {
    return mongoose.model("services").find({ title : val });
}

servicesSchema.methods.findByUserAccountId = function(val) {
    return mongoose.model("services").find({ userAccount : new objectId(val) });
}

servicesSchema.methods.updateByServiceId = function(serviceId, title, description, dateAdded, lastUpdated, userAccount) {
    return mongoose.model("services").findOneAndUpdate({ _id: new objectId(serviceId) }, {
        title: title,
        description: description,
        dateAdded: new Date(dateAdded),
        lastUpdated: new Date(lastUpdated),
        userAccount: userAccount
    }, {new: true});
}

servicesSchema.methods.deleteByServiceId = function(val) {
    return mongoose.model("services").findByIdAndRemove({ _id: new objectId(val) });
}

module.exports = mongoose.model("services", servicesSchema);
