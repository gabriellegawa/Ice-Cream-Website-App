const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const productInventoriesSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    dateAdded: Date,
    lastUpdated: Date,
    dateDeleted: Date,
});

module.exports = mongoose.model("ProductInventories", productInventoriesSchema);