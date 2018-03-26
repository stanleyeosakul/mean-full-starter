// ******************************************
// INITIALIZATION
// ******************************************
// Require Zone.js
require('zone.js/dist/zone-node');

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Configuration
const app = express();
const port = process.env.PORT || 3000;
app.disable('etag').disable('x-powered-by');

// Angular Universal Server Bundle
const ngUniversal = require('@nguniversal/express-engine');
const appServer = require('./dist-server/main.bundle');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { ServerAppModuleNgFactory, LAZY_MODULE_MAP } = appServer;
const provider = provideModuleMap(LAZY_MODULE_MAP);

// Routes
const auth = require('./node_src/routes/auth')
const library = require('./node_src/routes/library');
const payment = require('./node_src/routes/payment');

// Database
require('./node_src/config/db');

// ******************************************
// MIDDLEWARE
// ******************************************
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// ******************************************
// API ROUTES
// ******************************************
app.use('/api/auth', auth);
app.use('/api/library', library);
app.use('/api/payment', payment);

// ******************************************
// ANGULAR UNIVERSAL EXPRESS ENGINE
// ******************************************
// Configuration
app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: appServer.AppServerModuleNgFactory,
  providers: [provider]
}));

app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.static(`${__dirname}/dist`, { index: false }));

// Set the default route
app.get('/*', (req, res) => res.render('./dist/index', { req, res }));

// ******************************************
// API ERROR HANDLER
// ******************************************
app.use((req, res, next) => res.status(404).json({ success: false, status: 404, message: 'Page Not Found' }));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, status: err.status, message: `Server Error: ${err.message}` });
});

// ******************************************
// SERVER START
// ******************************************
app.listen(port, () => console.log(`Server started on port ${port}`));