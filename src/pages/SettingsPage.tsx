import { useState } from 'react';
import { useStore } from '../store';
import { db } from '../db';

export function SettingsPage() {
  const { settings, updateSettings, currentUser, darkMode, toggleDarkMode, loadServices, loadCategories } = useStore();
  const [orgName, setOrgName] = useState(settings?.orgName || '');
  const [orgDesc, setOrgDesc] = useState(settings?.orgDescription || '');
  const [currency, setCurrency] = useState(settings?.defaultCurrency || 'USD');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    await updateSettings({
      orgName,
      orgDescription: orgDesc,
      defaultCurrency: currency,
    });
    setMessage('Settings saved!');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleExport = async () => {
    const services = await db.services.toArray();
    const categories = await db.categories.toArray();
    const data = { services, categories, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skyline-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (data.services) {
        await db.services.clear();
        await db.services.bulkAdd(data.services);
      }
      if (data.categories) {
        await db.categories.clear();
        await db.categories.bulkAdd(data.categories);
      }
      await loadServices();
      await loadCategories();
      setMessage('Import successful!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Invalid file format');
      setTimeout(() => setMessage(''), 3000);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your organization settings</p>
      </div>

      {message && (
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm">
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-slate-900 dark:text-white">Organization</h2>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
          <input
            type="text"
            value={orgName}
            onChange={e => setOrgName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
          <textarea
            value={orgDesc}
            onChange={e => setOrgDesc(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Currency</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD ($)</option>
            <option value="AUD">AUD ($)</option>
          </select>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-slate-900 dark:text-white">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-900 dark:text-white">Dark Mode</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Use dark theme</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-slate-900 dark:text-white">Data Management</h2>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors"
          >
            Export Data
          </button>
          <label className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors cursor-pointer">
            Import Data
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-2">Current User</h2>
        <p className="text-slate-700 dark:text-slate-300">
          <span className="font-medium">{currentUser?.name}</span> ({currentUser?.email})
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{currentUser?.role}</p>
      </div>
    </div>
  );
}
