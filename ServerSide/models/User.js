const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true,
      unique: true,
      trim: true
    },
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: props => `${props.value} is not a valid email`
      }
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^[0-9]{10,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    password: { 
      type: String, 
      required: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    }
  },
  {
    timestamps: true,
  }
);

// Remove password when sending user data
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);