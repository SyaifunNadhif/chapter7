require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routers');
const cors = require('cors');
const Sentry = require('@sentry/node');


const {
    SENTRY_DSN,
    ENVIRONMENT
} = process.env;

Sentry.init({
    environment: ENVIRONMENT,
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
});
  
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.set("view engine", "ejs");



app.use(router);

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// 404 handler
app.use((req, res, next) => {
    return res.status(404).json({ message: `can't find ${req.url}` });
  });

// 500
app.use((err, req, res, next) => {
    // console.log(err);
    return res.status(500).json({
        message: err.message,
    });
});

// app.listen(HTTP_PORT, () => console.log('running on port', HTTP_PORT));
module.exports = app;