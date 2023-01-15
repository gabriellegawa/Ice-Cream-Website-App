const mongoose = require("mongoose");
var objectId = require('mongoose').Types.ObjectId; 

var userAccountsModel = require('./userAccounts.models')

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const servicesSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true ,
        minlength: 5,
        maxlength: 25,
        },
    description: { 
        type: String, 
        required: true,
        maxlength: 75 },
    dateAdded: {type: Date, required: true },
    lastUpdated: {type: Date, required: true },
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAccount",
        required: true,
        validate: {
            async validator(val) {
                const result = await userAccountsModel.findOne({
                    "_id": val
                })
                return result != null ? true : false
            },
            message: "userAccount doesn't exists"
        }

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

servicesSchema.methods.updateByServiceId = function(serviceId, title, description, lastUpdated, userAccount) {
    return mongoose.model("services").findOneAndUpdate({ _id: new objectId(serviceId) }, {
        title: title,
        description: description,
        lastUpdated: lastUpdated,
        userAccount: userAccount
    }, {new: true});
}

servicesSchema.methods.deleteByServiceId = function(val) {
    return mongoose.model("services").findByIdAndRemove({ _id: new objectId(val) });
}

module.exports = mongoose.model("services", servicesSchema);
