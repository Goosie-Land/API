import { Request, Response } from 'express';
import { UserSettingsSettingsService } from '../services/user-settings.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserSettingsDto } from '../dtos/user.dto';
import { AppError } from '../utils/AppError';

export class UserSettingsController {
    private userSettingsService: UserSettingsSettingsService;

    constructor() {
        this.userSettingsService = new UserSettingsSettingsService();
    }

    async updateUserSettings(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const updateSettingsData = plainToClass(UpdateUserSettingsDto, req.body);
            const dtoErrors = await validate(updateSettingsData);
            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => ({
                    field: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }));
                throw new AppError("Validation failed", 400, errors);
            }
            const updatedSettings = await this.userSettingsService.updateUserSettingsSettings(req.params.userId, updateSettingsData);
            if (updatedSettings) {
                res.status(200).json(updatedSettings);
            } else {
                res.status(404).json({ message: 'User settings not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    async addSettingsToUser(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const { settingId } = req.body;
            const userId = req.params.userId;
            const newSettings = await this.userSettingsService.addSettingsToUserSettings(userId, settingId);
            res.status(201).json(newSettings);
        } catch (error) {
            next(error);
        }
    }
}
