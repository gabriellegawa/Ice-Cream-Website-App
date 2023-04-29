const mongoose = require("mongoose");
var objectId = require('mongoose').Types.ObjectId; 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const productsSchema = mongoose.Schema({
    name: String,
    description: String,
    SKU: String,
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategories"
      },
    productInventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInventories"
      },
    productDiscount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductDiscounts"
      },
    dateAdded: Date,
    lastUpdated: Date,
    dateDeleted: Date,
});


module.exports = mongoose.model("Products", productsSchema);
