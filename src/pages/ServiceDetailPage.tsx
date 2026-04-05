import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store';
import { ALTERNATIVES_DATA } from '../data/alternatives';

export function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, categories, deleteService, currentUser, updateService, getRiskLevel } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">Service not found</p>
        <Link to="/services" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 mt-2 inline-block">
          ← Back to Services
        </Link>
      </div>
    );
  }
  
  const category = categories.find(c => c.id === service.category);
  const risk = getRiskLevel(service.eolDate);
  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'editor';
  
  const alternatives = service.alternativeIds
    .map(altId => ALTERNATIVES_DATA.find(alt => alt.id === altId))
    .filter(Boolean);
  
  const relatedAlternatives = ALTERNATIVES_DATA.filter(alt => 
    alt.category === category?.name && !service.alternativeIds.includes(alt.id)
  ).slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-emerald-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(service.id);
      navigate('/services');
    }
  };

  const handleToggleAlternative = async (altId: string) => {
    const newAlternatives = service.alternativeIds.includes(altId)
      ? service.alternativeIds.filter(id => id !== altId)
      : [...service.alternativeIds, altId];
    await updateService(service.id, { alternativeIds: newAlternatives });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/services" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
          ← Back
        </Link>
        {canEdit && (
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{service.name}</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{service.vendor}</p>
            </div>
            <div className="flex gap-2">
              <span 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
              >
                {category?.name || 'Unknown'}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getRiskColor(risk)}`}>
                {risk}
              </span>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                service.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                service.status === 'deprecated' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {service.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Cost</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(service.billingCycle === 'annual' ? service.cost / 12 : service.cost)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Annual Cost</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(service.billingCycle === 'monthly' ? service.cost * 12 : service.cost)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Billing Cycle</p>
                <p className="text-slate-900 dark:text-white capitalize">{service.billingCycle}</p>
              </div>
              {service.contractEndDate && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Contract End Date</p>
                  <p className="text-slate-900 dark:text-white">
                    {new Date(service.contractEndDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {service.eolDate && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">End of Life</p>
                  <p className="text-slate-900 dark:text-white">
                    {new Date(service.eolDate).toLocaleDateString()}
                    {risk !== 'unknown' && risk !== 'low' && (
                      <span className={`ml-2 text-xs font-medium ${risk === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                        ({risk})
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div>
              {service.notes && (
                <div className="mb-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Notes</p>
                  <p className="text-slate-900 dark:text-white whitespace-pre-wrap">{service.notes}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Alternatives</p>
                {alternatives.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No alternatives linked</p>
                ) : (
                  <div className="space-y-2">
                    {alternatives.map(alt => alt && (
                      <div key={alt.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{alt.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{alt.vendor}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          alt.relativeCost === 'cheaper' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          alt.relativeCost === 'expensive' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300'
                        }`}>
                          {alt.relativeCost}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {canEdit && relatedAlternatives.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Suggested Alternatives</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Click to link/unlink alternatives</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedAlternatives.map(alt => {
                const isLinked = service.alternativeIds.includes(alt.id);
                return (
                  <button
                    key={alt.id}
                    onClick={() => handleToggleAlternative(alt.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      isLinked 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{alt.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        alt.relativeCost === 'cheaper' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        alt.relativeCost === 'expensive' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300'
                      }`}>
                        {alt.relativeCost}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{alt.vendor}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
