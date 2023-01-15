const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/iCreamDB", { useNewUrlParser: true, useUnifiedTopology: true });

const userAccountSchema = mongoose.Schema({
    userName: String,
    password: String
});
//Can add , { collection: 'userAccount' } after }__HERE__); to specify collection name
userAccountSchema.methods.findByUserName = function(val) {
    return mongoose.model("userAccount").find({ userName: val });
};

 module.exports = mongoose.model("userAccount", userAccountSchema);
