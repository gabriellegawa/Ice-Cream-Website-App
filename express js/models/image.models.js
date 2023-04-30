const mongoose = require("mongoose");
var objectId = require('mongoose').Types.ObjectId; 

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const imagesSchema = mongoose.Schema({
    shortDescription: String,
    imagePath: String
});

imagesSchema.methods.findByImageId = function(val) {
    return mongoose.model("image").find({ _id : new objectId(val) });
}

imagesSchema.methods.updateByImageId = function(imageId, shortDescription, imagePath) {
    return mongoose.model("image").findOneAndUpdate({ _id: new objectId(imageId) }, {
        shortDescription: shortDescription,
        imagePath: imagePath
    }, {new: true});
}

imagesSchema.methods.deleteByImageId = function(val) {
    //add soft delete to move to another collection
    return mongoose.model("image").findByIdAndRemove({ _id: new objectId(val) });
}

module.exports = mongoose.model("image", imagesSchema);
