import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AppError } from '../utils/AppError';
import { SettingsService } from '../services/settings.service';
import { CreateSettingsDTO, SettingsDTO } from '../dtos/settings.dto';

export class SettingsController {
    private settingsService: SettingsService;

    constructor() {
        this.settingsService = new SettingsService();
    }

    async getSettings(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const filters = req.query;
            const settings = await this.settingsService.getBy(filters);
            res.status(200).json(settings);
        } catch (error) {
            next(error);
        }
    }

    async getSetting(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const filters = req.params;
            const setting = await this.settingsService.getOneBy(filters);
            if (setting) {
                res.status(200).json(setting);
            } else {
                res.status(404).json({ message: 'Setting not found' });
            }
        } catch (error) {
            next(error);
        }
    }

    async createSetting(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const createSettingsData = plainToClass(CreateSettingsDTO, req.body);
            const dtoErrors = await validate(createSettingsData);
            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => ({
                    field: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }));
                throw new AppError("Validation failed", 400, errors);
            }
            const setting = await this.settingsService.createSettings(createSettingsData);
            res.status(201).json(setting);
        } catch (error) {
            next(error);
        }
    }

    async updateSetting(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const updateSettingsData = plainToClass(SettingsDTO, req.body);
            const dtoErrors = await validate(updateSettingsData);
            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => ({
                    field: error.property,
                    constraints: error.constraints ? Object.values(error.constraints) : []
                }));
                throw new AppError("Validation failed", 400, errors);
            }
            const updatedSetting = await this.settingsService.updateSettings(req.params.id, updateSettingsData);
            if (updatedSetting) {
                res.status(200).json(updatedSetting);
            } else {
                res.status(404).json({ message: 'Setting not found' });
            }
        } catch (error) {
            next(error);
        }
    }
}
