export interface Service {
  id: string;
  name: string;
  vendor: string;
  category: string;
  cost: number;
  billingCycle: 'monthly' | 'annual';
  contractEndDate: string | null;
  eolDate: string | null;
  alternativeIds: string[];
  status: 'active' | 'deprecated' | 'replaced';
  notes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'viewer' | 'editor' | 'admin';
  createdAt: string;
}

export interface OrgSettings {
  orgName: string;
  orgDescription: string;
  defaultCurrency: string;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical' | 'unknown';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Productivity', color: '#3B82F6' },
  { id: 'cat-2', name: 'Security', color: '#EF4444' },
  { id: 'cat-3', name: 'Communication', color: '#8B5CF6' },
  { id: 'cat-4', name: 'Infrastructure', color: '#F59E0B' },
  { id: 'cat-5', name: 'Development', color: '#10B981' },
  { id: 'cat-6', name: 'Finance', color: '#EC4899' },
  { id: 'cat-7', name: 'Other', color: '#6B7280' },
];

export const DEFAULT_ORG_SETTINGS: OrgSettings = {
  orgName: 'My Organization',
  orgDescription: '',
  defaultCurrency: 'USD',
};
