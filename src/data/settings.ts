import { Settings } from '../models/settings.model'; // adapte le chemin si nécessaire
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

export const seedSettings = async () => {
  const userService = new UserService();
  const defaultSettings = [
    { name: 'Can write', active: true },
    { name: 'Can click buttons', active: true },
    { name: 'Can change color', active: true },
  ];


  for (const setting of defaultSettings) {
    const [record, created] = await Settings.findOrCreate({
      where: { name: setting.name },
      defaults: setting,
    });

    if (created) {
      console.log(`✅ Setting "${setting.name}" created.`);
    } else {
      console.log(`ℹ️ Setting "${setting.name}" already exists.`);
    }
  }

  userService.createUser({
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  })
};
