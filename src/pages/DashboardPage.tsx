import { Link } from 'react-router-dom';
import { useStore } from '../store';

export function DashboardPage() {
  const { services, categories, getTotalMonthlySpend, getTotalAnnualSpend, getRiskLevel } = useStore();
  
  const activeServices = services.filter(s => s.status === 'active');
  
  const riskCounts = services.reduce((acc, s) => {
    const risk = getRiskLevel(s.eolDate);
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const upcomingEol = services
    .filter(s => s.eolDate && new Date(s.eolDate) > new Date() && s.status === 'active')
    .sort((a, b) => new Date(a.eolDate!).getTime() - new Date(b.eolDate!).getTime())
    .slice(0, 5);
  
  const spendByCategory = activeServices.reduce((acc, s) => {
    const monthly = s.billingCycle === 'annual' ? s.cost / 12 : s.cost;
    acc[s.category] = (acc[s.category] || 0) + monthly;
    return acc;
  }, {} as Record<string, number>);

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
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Overview of your IT services</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Spend</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {formatCurrency(getTotalMonthlySpend())}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">Annual Spend</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {formatCurrency(getTotalAnnualSpend())}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">Active Services</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{activeServices.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">At Risk</p>
          <p className="text-2xl font-bold text-red-500 mt-1">
            {(riskCounts['high'] || 0) + (riskCounts['critical'] || 0)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Spend by Category</h2>
          {Object.keys(spendByCategory).length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-sm">No services added yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(spendByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([catId, amount]) => {
                  const category = categories.find(c => c.id === catId);
                  const percentage = (amount / getTotalMonthlySpend()) * 100;
                  return (
                    <div key={catId}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 dark:text-slate-300">{category?.name || 'Unknown'}</span>
                        <span className="text-slate-500 dark:text-slate-400">{formatCurrency(amount)}/mo</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${percentage}%`, backgroundColor: category?.color || '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Risk Overview</h2>
          <div className="space-y-2">
            {(['critical', 'high', 'medium', 'low', 'unknown'] as const).map(risk => (
              <div key={risk} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${getRiskColor(risk)}`} />
                  <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">{risk}</span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {riskCounts[risk] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Upcoming End of Life</h2>
          <Link to="/services" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
            View all →
          </Link>
        </div>
        {upcomingEol.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">No upcoming EOL dates</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="pb-2">Service</th>
                  <th className="pb-2">EOL Date</th>
                  <th className="pb-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {upcomingEol.map(s => {
                  const risk = getRiskLevel(s.eolDate);
                  const eolDate = new Date(s.eolDate!);
                  const monthsUntil = Math.round((eolDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30));
                  return (
                    <tr key={s.id} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="py-3 text-sm text-slate-900 dark:text-white">{s.name}</td>
                      <td className="py-3 text-sm text-slate-500 dark:text-slate-400">
                        {eolDate.toLocaleDateString()} ({monthsUntil}mo)
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-white ${getRiskColor(risk)}`}>
                          {risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
