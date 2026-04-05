import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../db';
import type { Service, Category, User, OrgSettings, RiskLevel } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AppState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  currentUser: User | null;
  darkMode: boolean;
  
  services: Service[];
  categories: Category[];
  settings: OrgSettings | null;
  
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleDarkMode: () => void;
  
  loadServices: () => Promise<void>;
  addService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  
  loadCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<OrgSettings>) => Promise<void>;
  
  getRiskLevel: (eolDate: string | null) => RiskLevel;
  
  getTotalMonthlySpend: () => number;
  getTotalAnnualSpend: () => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      isInitialized: false,
      isAuthenticated: false,
      currentUser: null,
      darkMode: true,
      
      services: [],
      categories: [],
      settings: null,
      
      initialize: async () => {
        await db.initialize();
        await get().loadServices();
        await get().loadCategories();
        await get().loadSettings();
        set({ isInitialized: true });
        
        const savedDarkMode = localStorage.getItem('skyline-dark-mode');
        if (savedDarkMode !== null) {
          set({ darkMode: savedDarkMode === 'true' });
        }
      },
      
      login: async (email: string, password: string) => {
        const user = await db.users.where('email').equals(email).first();
        if (user && user.passwordHash === password) {
          set({ isAuthenticated: true, currentUser: user });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ isAuthenticated: false, currentUser: null });
      },
      
      toggleDarkMode: () => {
        const newMode = !get().darkMode;
        set({ darkMode: newMode });
        document.documentElement.classList.toggle('dark', newMode);
      },
      
      loadServices: async () => {
        const services = await db.services.toArray();
        set({ services });
      },
      
      addService: async (service) => {
        const newService: Service = {
          ...service,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await db.services.add(newService);
        await get().loadServices();
      },
      
      updateService: async (id, updates) => {
        await db.services.update(id, { ...updates, updatedAt: new Date().toISOString() });
        await get().loadServices();
      },
      
      deleteService: async (id) => {
        await db.services.delete(id);
        await get().loadServices();
      },
      
      loadCategories: async () => {
        const categories = await db.categories.toArray();
        set({ categories });
      },
      
      addCategory: async (category) => {
        const newCategory: Category = { ...category, id: uuidv4() };
        await db.categories.add(newCategory);
        await get().loadCategories();
      },
      
      updateCategory: async (id, updates) => {
        await db.categories.update(id, updates);
        await get().loadCategories();
      },
      
      deleteCategory: async (id) => {
        await db.categories.delete(id);
        await get().loadCategories();
      },
      
      loadSettings: async () => {
        const settings = await db.settings.get('main');
        if (settings) {
          const { id: _, ...orgSettings } = settings;
          set({ settings: orgSettings });
        }
      },
      
      updateSettings: async (updates) => {
        await db.settings.update('main', updates);
        await get().loadSettings();
      },
      
      getTotalMonthlySpend: () => {
        return get().services
          .filter(s => s.status === 'active')
          .reduce((acc, s) => {
            const monthly = s.billingCycle === 'annual' ? s.cost / 12 : s.cost;
            return acc + monthly;
          }, 0);
      },
      
      getTotalAnnualSpend: () => {
        return get().services
          .filter(s => s.status === 'active')
          .reduce((acc, s) => {
            const annual = s.billingCycle === 'monthly' ? s.cost * 12 : s.cost;
            return acc + annual;
          }, 0);
      },
      
      getRiskLevel: (eolDate: string | null): RiskLevel => {
        if (!eolDate) return 'unknown';
        const now = new Date();
        const eol = new Date(eolDate);
        const monthsUntilEol = (eol.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
        
        if (monthsUntilEol < 0) return 'critical';
        if (monthsUntilEol < 3) return 'critical';
        if (monthsUntilEol < 6) return 'high';
        if (monthsUntilEol < 12) return 'medium';
        return 'low';
      },
    }),
    {
      name: 'skyline-storage',
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);
