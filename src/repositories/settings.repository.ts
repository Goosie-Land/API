import { ISettings, Settings } from '../models/settings.model';

export class SettingsRepository {
  // Helper method to sanitize filters
  private sanitizeFilters(filters: Partial<Settings>): Partial<Settings> {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
    );
  }

  async getBy(filters: Partial<Settings>): Promise<ISettings[] | null> {
    const sanitizedFilters = this.sanitizeFilters(filters);
    return await Settings.findAll({ 
      where: sanitizedFilters
    });
  }

  async getOneBy(filters: Partial<Settings>): Promise<ISettings | null> {
    const sanitizedFilters = this.sanitizeFilters(filters);
    console.log(sanitizedFilters)
    return await Settings.findOne({ 
      where: sanitizedFilters
    });
  }

  async create(settingsData: Partial<Settings>): Promise<ISettings> {
    return await Settings.create(settingsData);
  }

  async updateSettings(settingsId: string, settingsData: Partial<Settings>): Promise<ISettings | null> {
    const settings = await Settings.findByPk(settingsId);
    if (!settings) return null;
    return await settings.update(settingsData);
  }
}
