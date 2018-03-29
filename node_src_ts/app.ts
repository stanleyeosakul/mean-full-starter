import 'zone.js/dist/zone-node';

import * as express from 'express';
import { Application, json, NextFunction, Request, Response, static as expressStatic, urlencoded } from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as passport from 'passport';
import { initialize, session } from 'passport';
import { Database } from './config/Database';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { join } from 'path';
import { Connection } from 'mongoose';
import { authenticateUser } from './middleware/Passport';

import { AuthRouter } from './routes/AuthRouter';
import { LibraryRouter } from './routes/LibraryRouter';
import { PaymentRouter } from './routes/PaymentRouter';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist-server/main.bundle');

class App {
  private database: Database = new Database();
  private environmentHost: string = process.env.NODE_ENV || 'Development';
  private authRouter: AuthRouter = new AuthRouter();
  private libRouter: LibraryRouter = new LibraryRouter();
  private paymentRouter: PaymentRouter = new PaymentRouter();
  public app: Application;
  public mongooseConnection: Connection;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.database.connectDatabase();
    this.mongooseConnection = this.database.mongooseConnection;

    this.app.use(cors());

    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));

    this.app.use(logger('dev'));

    this.app.use(initialize());
    this.app.use(session());
    authenticateUser(passport);

    /**
     * Angular Universal
     */
    this.app.engine(
      'html',
      ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)]
      })
    );

    this.app.set('view engine', 'html');
    this.app.set('views', join(__dirname, '../'));
    this.app.use(expressStatic(join(__dirname, '../dist/'), { index: false }));
  }

  private routes() {
    /**
     * App Routes
     */
    this.app.use('/api/auth', this.authRouter.router);
    this.app.use('/api/library', this.libRouter.router);
    this.app.use('/api/payment', this.paymentRouter.router);

    /**
     * Index Route
     */
    this.app.get('/*', (req: Request, res: Response) => {
      res.render('./dist/index', { req, res });
    });

    /**
     * API ERROR HANDLER
     */
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ success: false, status: 404, message: 'Page Not Found' });
    });
    this.app.use((err, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({ success: false, status: err.status, message: `Server Error: ${err.message}` });
    });
  }
}

export default new App();
