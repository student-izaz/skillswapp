const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, require: true },
    password: {
      type: String,
      require: true,
    },
    gender: String,
    phone: String,
    country: String,
    city: String,
    avatar: String,
    skillsToTeach: [String],
    skillsToLearn: [String],
    bio: String,
    socialLinks: {
      github: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash if password is new or modified
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Add matchPassword method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
