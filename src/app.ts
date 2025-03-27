import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.middleware';
import logger from './middlewares/logger.middleware';
import { EncodedRequest } from './utils/EncodedRequest';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import settingsRoute from './routes/settings.route';
import userSettingsRoute from './routes/user-settings.route';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(logger as express.RequestHandler);

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/settings', settingsRoute);
app.use('/api/user-settings', userSettingsRoute);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req as EncodedRequest, res, next);
});

export default app;
