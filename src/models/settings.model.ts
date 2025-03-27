import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { UserSettings } from './user-settings.model';

export interface ISettings {
  id: string;
  name: string;
  active: boolean;
  userSettings?: UserSettings[];
}

@Table({ tableName: 'settings' })
export class Settings extends Model {
  @PrimaryKey
  @Default(() => crypto.randomUUID())
  @Column(DataType.UUIDV4)
  id!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.BOOLEAN)
  active!: boolean;

  @HasMany(() => UserSettings)
  userSettings!: UserSettings[];
}
