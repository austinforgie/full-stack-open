const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, "username must be at least 3 characters long"],
    required: [true, "username is required"],
    unique: true,
  },
  name: {
    type: String,
  },
  passwordHash: String,

  // refer to the 'Blog' model for future population based on 'ObjectId'
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    // facilitate further processing
    returnedObject.id = returnedObject._id.toString();

    // exclude MongoDB-specific properties
    delete returnedObject._id;
    delete returnedObject.__v;

    // do not expose sensitive data
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
