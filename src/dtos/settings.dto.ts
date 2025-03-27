import { Expose } from 'class-transformer';

export class SettingsDTO {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    isActive!: boolean;

    @Expose()
    user!: string;
}

export class CreateSettingsDTO {
    @Expose()
    name!: string;

    @Expose()
    isActive?: boolean;
}

export class UpdateSettingsDTO {
    @Expose()
    name?: string;

    @Expose()
    isActive?: boolean;
}

export class SettingsPresenter {
    @Expose()
    active!: boolean;

    @Expose()
    name!: string;

    @Expose()
    id!: string;
}