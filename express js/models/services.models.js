const mongoose = require("mongoose");
var objectId = require('mongoose').Types.ObjectId; 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const servicesSchema = mongoose.Schema({
    title: String,
    description: String,
    dateAdded: Date,
    lastUpdated: String,
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAccount"
      }
 });
 
 servicesSchema.methods.findByTitle = function(val) {
    return mongoose.model("services").find({ title : val });
}

servicesSchema.methods.findByUserAccountId = function(val) {
    return mongoose.model("services").find({ userAccount : new objectId(val) });
}

 module.exports = mongoose.model("services", servicesSchema);
