import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
    BelongsTo,
    Default,
  } from 'sequelize-typescript';
  import { User } from './user.model';
  import { Settings } from './settings.model';
  
  export interface IUserSettings {
    userId: string;
    settingId: string;
    active: boolean;
    weight: number;
  }
  
  @Table({ tableName: 'user_settings' })
  export class UserSettings extends Model {
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string;
  
    @ForeignKey(() => Settings)
    @Column(DataType.UUID)
    settingId!: string;
  
    @Default(true)
    @Column(DataType.BOOLEAN)
    active!: boolean;
  
    @Default(20)
    @Column(DataType.INTEGER)
    weight!: number;
  
    @BelongsTo(() => User)
    user!: User;
  
    @BelongsTo(() => Settings)
    setting!: Settings;
  }
  