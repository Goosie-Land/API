import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { EncodedRequest } from '../utils/EncodedRequest';

const router = Router();
const userController = new UserController();

router.post('/login', (req, res, next) => userController.logUser(req, res, next));
router.post('/register', (req, res, next) => userController.createUser(req, res, next));
router.post('/refresh', (req, res, next) => userController.refreshToken(req as EncodedRequest, res, next));
router.get('/me', (req, res, next) => userController.getMe(req as EncodedRequest, res, next))

export default router;
