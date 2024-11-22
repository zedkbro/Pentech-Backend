import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from 'fs';
import logger from 'morgan';
import helmet from 'helmet';
import routes from './routes/index.js';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use('/api/v1/', express.static(path.join(__dirname, '../public')));
const corsOptions = {
  origin: process.env.FRONTEND_HOSTNAME //, credentials: true
  }
app.use(cors(corsOptions));
app.use(helmet());

// Enable Content Security Policy to protect XSS attacks
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.disable('x-powered-by');
app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
// const logStream = fs.createWriteStream('request_logs.txt', { flags: 'a' });
// app.use(logger('combined', { stream: logStream }));

app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1/', routes);

// Catch-all route for unknown routes
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Resource Not Found!' });
});


export default app;