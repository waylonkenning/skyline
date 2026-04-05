import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export function ServicesPage() {
  const { services, categories, currentUser, getRiskLevel } = useStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || s.category === categoryFilter;
    const matchesStatus = !statusFilter || s.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'editor';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-emerald-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Services</h1>
          <p className="text-slate-500 dark:text-slate-400">{services.length} services in catalogue</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            + Add Service
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="deprecated">Deprecated</option>
          <option value="replaced">Replaced</option>
        </select>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">No services found</p>
        </div>
      ) : (
        <>
          <div className="md:hidden space-y-3">
            {filteredServices.map(service => {
              const risk = getRiskLevel(service.eolDate);
              const category = categories.find(c => c.id === service.category);
              const monthlyCost = service.billingCycle === 'annual' ? service.cost / 12 : service.cost;
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="block bg-white dark:bg-slate-800 rounded-xl shadow p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{service.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{service.vendor}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${getRiskColor(risk)}`}>
                      {risk}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span 
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                    >
                      {category?.name || 'Unknown'}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {formatCurrency(monthlyCost)}/mo
                    </span>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      service.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      service.status === 'deprecated' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Risk</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(service => {
                  const risk = getRiskLevel(service.eolDate);
                  const category = categories.find(c => c.id === service.category);
                  const monthlyCost = service.billingCycle === 'annual' ? service.cost / 12 : service.cost;
                  return (
                    <tr key={service.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{service.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{service.vendor}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span 
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                        >
                          {category?.name || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                        {formatCurrency(monthlyCost)}/mo
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          service.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          service.status === 'deprecated' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-white ${getRiskColor(risk)}`}>
                          {risk}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link 
                          to={`/services/${service.id}`}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showAddModal && (
        <AddServiceModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

function AddServiceModal({ onClose }: { onClose: () => void }) {
  const { categories, addService, currentUser } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    vendor: '',
    category: categories[0]?.id || '',
    cost: 0,
    billingCycle: 'monthly' as const,
    contractEndDate: '',
    eolDate: '',
    alternativeIds: [] as string[],
    status: 'active' as const,
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addService({
      ...formData,
      contractEndDate: formData.contractEndDate || null,
      eolDate: formData.eolDate || null,
      createdBy: currentUser?.id || '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Add Service</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Vendor</label>
              <input
                type="text"
                required
                value={formData.vendor}
                onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="deprecated">Deprecated</option>
                <option value="replaced">Replaced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cost</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.cost}
                onChange={e => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Billing Cycle</label>
              <select
                value={formData.billingCycle}
                onChange={e => setFormData({ ...formData, billingCycle: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contract End Date</label>
              <input
                type="date"
                value={formData.contractEndDate}
                onChange={e => setFormData({ ...formData, contractEndDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">EOL Date</label>
              <input
                type="date"
                value={formData.eolDate}
                onChange={e => setFormData({ ...formData, eolDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
