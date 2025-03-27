import { IUser, User } from '../models/user.model';
import { UserSettings } from '../models/user-settings.model';
import { Settings } from '../models/settings.model';

export class UserRepository {
  // Helper method to sanitize filters
  private sanitizeFilters(filters: Partial<User>): Partial<User> {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
    );
  }

  async getBy(filters: Partial<User>): Promise<IUser[] | null> {
    const sanitizedFilters = this.sanitizeFilters(filters);
    return await User.findAll({ 
      where: sanitizedFilters, 
      include: [{ 
        model: UserSettings, as: 'settings', 
          include: [{
          model: Settings, as: 'setting'
        }] 
      }]     });
  }

  async getOneBy(filters: Partial<User>): Promise<IUser | null> {
    const sanitizedFilters = this.sanitizeFilters(filters);
    console.log(sanitizedFilters)
    return await User.findOne({ 
      where: sanitizedFilters, 
      include: [{ 
        model: UserSettings, as: 'settings', 
          include: [{
          model: Settings, as: 'setting'
        }] 
      }] 
    });
  }

  async create(userData: Partial<User>): Promise<IUser> {
    return await User.create(userData);
  }

  async updateSettings(userId: string, settingsData: Partial<UserSettings>): Promise<UserSettings | null> {
    const settings = await UserSettings.findOne({ where: { userId } });
    if (!settings) return null;
    return await settings.update(settingsData);
  }

  async createSettings(userId: string, settingId?: string): Promise<UserSettings> {
    return await UserSettings.create({
      userId,
      settingId,
    });
  }

  async getByFilters(filters: Partial<User>): Promise<User[] | null> {
    const sanitizedFilters = this.sanitizeFilters(filters);
    return await User.findAll({ 
      where: sanitizedFilters, 
      include: [{ 
        model: UserSettings, as: 'settings', 
          include: [{
          model: Settings, as: 'setting'
        }] 
      }]    
   });
  }

  async update(userId: string, userData: Partial<User>): Promise<User | null> {
    const data = this.sanitizeFilters(userData);
    const user = await User.update(data, { where: { id: userId } });
    if (!user) return null;
    return await User.findOne({ where: { id: userId } });
  }

  async getUsersByScore(): Promise<User[]> {
    return await User.findAll({ 
      order: [['maxScore', 'DESC']], 
      include: [{ 
        model: UserSettings, as: 'settings', 
          include: [{
          model: Settings, as: 'setting'
        }] 
      }] 
    });
  }
}
