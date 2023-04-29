const mongoose = require("mongoose");
var objectId = require('mongoose').Types.ObjectId; 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const productCategoriesSchema = mongoose.Schema({
    name: String,
    description: String,
    dateAdded: Date,
    lastUpdated: Date,
    dateDeleted: Date,
});


module.exports = mongoose.model("ProductCategories", productCategoriesSchema);
