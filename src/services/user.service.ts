import { UserRepository } from '../repositories/user.repository';
import { IUser, User } from '../models/user.model';
import { CreateUserDto, LogUserDto, UpdateUserSettingsDto } from '../dtos/user.dto';
import { AppError } from '../utils/AppError';
import { SettingsRepository } from '../repositories/settings.repository';
import { UserSettingsRepository } from '../repositories/user-settings.repository';

export class UserService {
    private userRepository: UserRepository;
    private settingsRepository: SettingsRepository;
    private userSettingsRepository: UserSettingsRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.settingsRepository = new SettingsRepository();
        this.userSettingsRepository = new UserSettingsRepository();
    }

    async getOneBy(filters: Partial<User>): Promise<IUser | null> {
        return await this.userRepository.getOneBy(filters);
    }

    async getBy(filters: Partial<User>): Promise<IUser[] | null> {
        return await this.userRepository.getBy(filters);
    }

    async logUser(userData: LogUserDto): Promise<IUser | null> {
        return await this.userRepository.getOneBy(userData);
    }

    async createUser(userData: CreateUserDto): Promise<IUser> {
        const existingUser = await this.userRepository.getOneBy({ email: userData.email })
        if (existingUser) {
            throw new AppError("User already exists", 400)
        }

        const user = await this.userRepository.create(userData);

        const settings = await this.settingsRepository.getBy({ active: true });

        if (settings) {
            this.userSettingsRepository.bulkCreate(user.id, settings.map(setting => setting.id));
        }

        const updated = await this.getOneBy({ id: user.id });

        if (!updated) {
            throw new AppError('Error while creating user', 500);
        }

        return updated;
    }

    async getUsersByFilters(filters: Partial<User>): Promise<User[] | null> {
        return await this.userRepository.getByFilters(filters);
    }

    async getUsersByScore(): Promise<User[] | null> {
        return await this.userRepository.getUsersByScore();
    }
}