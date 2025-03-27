import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller';

const router = Router();
const settingsController = new SettingsController();

router.get('/', (req, res, next) => settingsController.getSettings(req, res, next));
router.get('/:id', (req, res, next) => settingsController.getSetting(req, res, next));
router.post('/', (req, res, next) => settingsController.createSetting(req, res, next));
router.put('/:id', (req, res, next) => settingsController.updateSetting(req, res, next));

export default router;
