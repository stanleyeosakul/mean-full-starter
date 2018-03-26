// Require dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// User Schema
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  displayName: { type: String, default: 'New User' },
  created: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  imageURL: { type: String, default: 'assets/images/anonymous.png' },
  imageKey: { type: String, default: '' },
  hasUploadedImage: { type: Boolean, default: false }
});

// Encrypt password before saving it to the database
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// CUSTOM METHOD
// Compare user password to stored database password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Export Schema
module.exports = mongoose.model('User', UserSchema);