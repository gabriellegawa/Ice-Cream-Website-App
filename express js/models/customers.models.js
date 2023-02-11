const mongoose = require("mongoose");
var objectId = require('mongoose').Types.ObjectId; 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const customersSchema = mongoose.Schema({
    address: String,
    city: String,
    postalCode: String,
    dateOfBirth: Date,
    emailAddress: String,
    firstName: String,
    lastName: String,
    permissionLevel: Number,
    //Add Payment info
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAccount"
      }
 });
 
customersSchema.methods.findByEmailAddress = function(val) {
    return mongoose.model("Customers").find({ emailAddress : val });
}

customersSchema.methods.findByUserAccountId = function(val) {
    return mongoose.model("Customers").find({ userAccount : new objectId(val) });
}

 module.exports = mongoose.model("Customers", customersSchema);
