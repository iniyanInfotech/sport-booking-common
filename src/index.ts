import dotenv from "dotenv";
dotenv.config();
import express from "express";
import compression from 'compression';
import hpp from 'hpp';
import cors from "cors";
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import { rateLimiter } from "./middlewares/rateLimit";
import appController from "./controllers/app.controller";
import faqController from "./controllers/faq.controller";
import utilsController from "./controllers/utils.controller";
import log from "./shared/log";


const app = express();
const port = process.env.PORT || 3001;
const nodeEnv = process.env.NODE_ENV;

app.disable("x-powered-by");
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));


// cors options
const corsOptions = {
  origin: "*", // Allow requests from all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Use an array of methods
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ], // Include common headers for mobile apps
  maxAge: 86400, // Set maxAge to cache preflight requests (optional)
};
app.use(cors(corsOptions));
// Specify trusted proxies
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(rateLimiter);

// Apply security middleware if the environment is 'prod'
if (nodeEnv === 'prod') {
    app.use(
      helmet({
        // Content Security Policy (CSP) settings
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            defaultSrc: [
              "'self'",
              'https://polyfill.io',
              'https://*.cloudflare.com',
            ],
            scriptSrc: [
              "'self'",
              'https://polyfill.io',
              'https://*.cloudflare.com',
            ],
            styleSrc: ["'self'", 'https:'],
            imgSrc: ["'self'", 'data:', 'blob:'],
            fontSrc: ["'self'", 'https:', 'data:'],
            childSrc: ["'self'", 'blob:'],
            frameSrc: ["'self'"],
          },
        },
        // Additional security headers
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: true,
        crossOriginResourcePolicy: true,
        dnsPrefetchControl: true,
        frameguard: true,
        hsts: true,
        hidePoweredBy: true,
        ieNoOpen: true,
        noSniff: true,
        originAgentCluster: true,
        permittedCrossDomainPolicies: {
          permittedPolicies: 'by-content-type',
        },
        referrerPolicy: true,
        xssFilter: true,
      }),
    );
  }
  app.use(compression());
  app.use(hpp()); // Parameter pollution

const initServer = async () => {
  const swaggerFile = path.resolve(`${__dirname}/shared/swagger/swagger.json`);
  const swaggerSpec = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/v1/", appController);
  app.use("/api/v1/faq/", faqController);
  app.use("/api/v1/utils/", utilsController);
  app.listen(port, () => {
    log.info(`App listening on ${nodeEnv} environment port ${port} `);
  });
};
initServer();
