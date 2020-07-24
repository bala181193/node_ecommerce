const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  image: {  type: String,
    required: true
}
});

// export model user with UserSchema
module.exports = mongoose.model("images", ImageSchema);
