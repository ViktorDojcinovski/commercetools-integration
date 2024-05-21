import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import bodyParser from 'body-parser';

import EventRoutes from './routes/event.route';

import { readConfiguration } from './utils/config.utils';

dotenv.config();

readConfiguration();

const app: Express = express();
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/event', EventRoutes);

export { app };
