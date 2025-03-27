import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Default,
    DataType,
    IsEmail,
    Unique,
    HasMany,
  } from 'sequelize-typescript';
import { UserSettings } from './user-settings.model';

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    maxScore: number;
    settings?: UserSettings[];
}  

@Table({ tableName: 'users' })
export class User extends Model {
    @PrimaryKey
    @Default(() => crypto.randomUUID())
    @Column(DataType.UUIDV4)
    id!: string;
  
    @Unique
    @Column(DataType.STRING)
    username!: string;
  
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    email!: string;
  
    @Column(DataType.STRING)
    password!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    maxScore!: number;
  
    @HasMany(() => UserSettings)
    settings!: UserSettings[];
  }
  