// Import dependencies
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Import User Schema
const User = require('../models/User');

// Import middleware
const checkJWT = require('../middleware/check-jwt');

// ********************************
// AWS S3 SETUP
// ********************************
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({ 
  accessKeyId: keys.aws.accessKey,
  secretAccessKey: keys.aws.secretKey 
});
const fileSize = 0.1 * 1024 * 1024 // 100kb size limit

// Upload function using multer and multer-S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: keys.aws.bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  limits: { fileSize }
});

// Delete profile pic when uploading a new one or pic reset
const deleteProfilePic = function (imageKey) {
  const params = {
    Bucket: keys.aws.bucketName,
    Key: imageKey
  };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err);
  });
}

// ********************************
// USER AUTHENTICATION ROUTES
// ********************************
// Register a user
router.post('/register', (req, res, next) => {

  // Identify user
  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;

  // Checks if user exists in the database
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      res.json({ success: false, message: 'Email already in use' });
    } else {
      user.save();
      const token = jwt.sign({ user }, keys.JWT.secret, { expiresIn: '7d' });
      res.json({ success: true, message: 'Registration successful', token });
    }
  });
});

// Login a user
router.post('/login', (req, res, next) => {

  // Checks user's information against the database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.json({ success: false, message: 'Invalid email/password combination' });
    } else if (user) {
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({ success: false, message: 'Invalid email/password combination' });
      } else {
        user.lastLogin = Date.now();
        user.save();
        const token = jwt.sign({ user }, keys.JWT.secret, { expiresIn: '7d' });
        res.json({ success: true, message: "Login successful", token });
      }
    }
  });
});

// ********************************
// PROFILE ROUTES
// ********************************
router.route('/profile')
  // Get a user's profile
  .get(checkJWT, (req, res, next) => {
    User.findById(req.decoded.user._id, (err, user) => {
      if (err) return next(err);
      let filteredUser = {
        email: user.email,
        displayName: user.displayName,
        imageURL: user.imageURL,
        created: user.created,
        lastLogin: user.lastLogin
      }
      res.json({ success: true, message: 'User profile retrieved', user: filteredUser });
    });
  })

  // Update a user's profile
  .post([checkJWT, upload.single('profile_pic')], (req, res, next) => {
    User.findById(req.decoded.user._id, (err, user) => {
      if (err) return next(err);

      // Delete previous profile pic from AWS S3, if present
      if (user.hasUploadedImage) deleteProfilePic(user.imageKey);

      // Update displayName, password, and/or image data
      if (req.body.displayName) user.displayName = req.body.displayName;
      if (req.body.password) user.password = req.body.password;
      if (req.file !== undefined) {
        user.imageURL = req.file.location;
        user.imageKey = req.file.key;
        user.hasUploadedImage = true;
      }

      // Save updates to database
      user.save();
      res.json({ success: true, message: 'Profile information saved successfully' });
    });
  });

// Reset a user's profile image
router.post('/reset', checkJWT, (req, res, next) => {
    User.findById(req.decoded.user._id, (err, user) => {
      if (err) return next(err);

      // Delete previous profile pic from AWS S3, if present
      if (user.hasUploadedImage) deleteProfilePic(user.imageKey);

      // Reset image keys to default
      user.imageURL = req.body.imageURL;
      user.imageKey = '';
      user.hasUploadedImage = false;

      // Save updates to database
      user.save();
      res.json({ success: true, message: 'Profile information saved successfully' });
  });
});

module.exports = router;