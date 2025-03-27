import { Router } from 'express';
import { UserSettingsController } from '../controllers/user-settings.controller';

const router = Router();
const userSettingsController = new UserSettingsController();

router.put('/:userId', (req, res, next) => userSettingsController.updateUserSettings(req, res, next));
router.post('/:userId/add', (req, res, next) => userSettingsController.addSettingsToUser(req, res, next));

export default router;
