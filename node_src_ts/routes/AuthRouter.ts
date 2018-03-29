import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserModel } from '../models/User';
import { coreConfig } from '../config/keys';
import { authenticate } from 'passport';

export class AuthRouter {
  private readonly userController: UserController;
  private readonly fileSize: number = 0.1 * 1024 * 1024;
  private readonly upload: multer.Instance;
  private readonly storage: multer.StorageEngine;
  router: Router;

  constructor() {
    this.userController = new UserController(UserModel);
    this.router = Router();
    this.storage = multerS3({
      s3: this.userController.s3,
      bucket: coreConfig.aws.bucketName,
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        cb(null, Date.now().toString());
      }
    });
    this.upload = multer({
      storage: this.storage,
      limits: { fileSize: this.fileSize }
    });

    this.routes();
  }

  private routes() {
    this.router.post('/register', this.userController.register.bind(this.userController));
    this.router.post('/login', this.userController.login.bind(this.userController));
    this.router
      .use(authenticate('jwt', { session: false }))
      .route('/profile')
      .get(this.userController.getProfile.bind(this.userController))
      .post(this.upload.single('profile_pic'), this.userController.uploadProfile.bind(this.userController));
    this.router.post('/reset', authenticate('jwt', { session: false }), this.userController.resetProfilePic.bind(this.userController));
  }
}
