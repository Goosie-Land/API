import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/', (req, res, next) => userController.getUsersByFilters(req, res, next));
router.get('/byScore', (req, res, next) => userController.getUserByScore(req, res, next));

export default router;
