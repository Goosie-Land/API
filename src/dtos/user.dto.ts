import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { SettingsPresenter } from './settings.dto';

export class UserPresenter {
  @Expose()
  id!: string;  

  @Expose()
  username!: string;  

  @Expose()
  email!: string;  

  @Expose()
  @IsOptional()
  @Type(() => UserSettingsPresenter)
  @ValidateNested({ each: true })
  settings?: UserSettingsPresenter;  

  @Expose()
  @IsOptional()
  maxScore?: number;
}

export class UserSettingsPresenter {
  @Expose()
  active!: boolean;

  @Expose()
  weight!: number;

  @Expose()
  userId!: string;

  @Expose()
  settingId!: string;

  @Expose()
  @Type(() => SettingsPresenter)
  @ValidateNested({ each: true })
  setting!: SettingsPresenter;
}

export class AddSettingToUserDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  settingId!: string;
}


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class LogUserDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password!: string;
}

export class UpdateUserSettingsDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  settingId!: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  isActive!: boolean;

  @IsOptional()
  @Type(() => Number)
  weight?: number;
}

export class FilterUserDto {
    @IsString()
    @IsOptional()
    @Type(() => String)
    id?: string;

    @IsString()
    @IsOptional()
    @Type(() => String)
    username?: string;

    @IsEmail()
    @IsOptional()
    @Type(() => String)
    email?: string;

    @IsOptional()
    @Type(() => Number)
    maxScore?: number;
}

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    id!: string;

    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    @Type(() => String)
    email!: string;

    @IsOptional()
    @Type(() => Number)
    maxScore?: number;
}

