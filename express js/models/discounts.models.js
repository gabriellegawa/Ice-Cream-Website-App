const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const discountsSchema = mongoose.Schema({
    name: String,
    description: String,
    discountType: String,
    discountValue: Number,
    couponCode: String,
    active: Boolean,
    dateAdded: Date,
    lastUpdated: Date,
    dateDeleted: Date,
});

module.exports = mongoose.model("Discounts", discountsSchema);