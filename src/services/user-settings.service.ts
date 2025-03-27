import { UserSettingsRepository } from '../repositories/user-settings.repository';
import { IUserSettings, UserSettings } from '../models/user-settings.model';
import { AppError } from '../utils/AppError';
import { UpdateUserSettingsDto } from '../dtos/user.dto';

export class UserSettingsSettingsService {
    private userRepository: UserSettingsRepository;

    constructor() {
        this.userRepository = new UserSettingsRepository();
    }

    async updateUserSettingsSettings(
        userId: string,
        settingsData: UpdateUserSettingsDto
    ): Promise<UserSettings | null> {
        return await this.userRepository.update(userId, settingsData.settingId, settingsData);
    }

    async addSettingsToUserSettings(
        userId: string,
        settingId: string
    ): Promise<UserSettings> {
        return await this.userRepository.create(userId, settingId);
    }
}