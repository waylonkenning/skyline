import Dexie, { type Table } from 'dexie';
import type { Service, Category, User, OrgSettings } from '../types';
import { DEFAULT_CATEGORIES, DEFAULT_ORG_SETTINGS } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class SkylineDB extends Dexie {
  services!: Table<Service>;
  categories!: Table<Category>;
  users!: Table<User>;
  settings!: Table<OrgSettings & { id: string }>;

  constructor() {
    super('skyline');
    this.version(1).stores({
      services: 'id, name, vendor, category, status, eolDate',
      categories: 'id, name',
      users: 'id, email, role',
      settings: 'id',
    });
  }

  async initialize(): Promise<void> {
    const categoryCount = await this.categories.count();
    if (categoryCount === 0) {
      await this.categories.bulkAdd(DEFAULT_CATEGORIES);
    }

    const settings = await this.settings.get('main');
    if (!settings) {
      await this.settings.add({ id: 'main', ...DEFAULT_ORG_SETTINGS });
    }

    const userCount = await this.users.count();
    if (userCount === 0) {
      const defaultAdmin: User = {
        id: uuidv4(),
        name: 'Admin',
        email: 'admin@skyline.local',
        passwordHash: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      await this.users.add(defaultAdmin);
    }
  }
}

export const db = new SkylineDB();
