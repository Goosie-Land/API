import { SettingsRepository } from '../repositories/settings.repository';
import { ISettings, Settings } from '../models/settings.model';
import { CreateSettingsDTO, SettingsDTO } from '../dtos/settings.dto';
import { AppError } from '../utils/AppError';

export class SettingsService {
    private settingsRepository: SettingsRepository;

    constructor() {
        this.settingsRepository = new SettingsRepository();
    }

    async getOneBy(filters: Partial<Settings>): Promise<ISettings | null> {
        return await this.settingsRepository.getOneBy(filters);
    }

    async getBy(filters: Partial<Settings>): Promise<ISettings[] | null> {
        return await this.settingsRepository.getBy(filters);
    }

    async createSettings(settingsData: CreateSettingsDTO): Promise<ISettings> {
        const settings = await this.settingsRepository.create(settingsData);
        return settings;
    }

    async updateSettings(
        settingsId: string,
        settingsData: SettingsDTO
    ): Promise<ISettings | null> {
        return await this.settingsRepository.updateSettings(settingsId, settingsData);
    }
}