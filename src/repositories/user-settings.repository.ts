import { IUserSettings, UserSettings } from '../models/user-settings.model';

export class UserSettingsRepository {
  // Helper method to sanitize filters
  private sanitizeFilters(filters: Partial<UserSettings>): Partial<UserSettings> {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
    );
  }

  async create(userId: string, settingId?: string): Promise<UserSettings> {
    return await UserSettings.create({
      userId,
      settingId,
    });
  }

  async update(userId: string, settingId: string, settingsData: Partial<UserSettings>): Promise<UserSettings | null> {
    const settings = await UserSettings.findOne({ where: { userId, settingId } });
    if (!settings) return null;
    return await settings.update(settingsData);
  }
}
