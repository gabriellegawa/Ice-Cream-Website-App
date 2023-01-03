const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const customerSchema = mongoose.Schema({
    userName: String,
    address: String,
    city: String,
    postalCode: String,
    dateOfBirth: Date,
    emailAddress: String,
    firstName: String,
    lastName: String,
    password: String,
    permissionLevel: Number
 });
 
 module.exports = mongoose.model("Customers", customerSchema);
