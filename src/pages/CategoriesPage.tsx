import { useState } from 'react';
import { useStore } from '../store';

export function CategoriesPage() {
  const { categories, deleteCategory, services } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const getServiceCount = (categoryId: string) => {
    return services.filter(s => s.category === categoryId).length;
  };

  const handleDelete = async (id: string) => {
    const count = getServiceCount(id);
    if (count > 0) {
      alert(`Cannot delete category with ${count} services. Please reassign them first.`);
      return;
    }
    if (confirm('Delete this category?')) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Categories</h1>
          <p className="text-slate-500 dark:text-slate-400">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h3 className="font-semibold text-slate-900 dark:text-white">{category.name}</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {getServiceCount(category.id)} services
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingId(category.id)}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <CategoryModal onClose={() => setShowAddModal(false)} />
      )}
      {editingId && (
        <CategoryModal 
          category={categories.find(c => c.id === editingId)} 
          onClose={() => setEditingId(null)} 
        />
      )}
    </div>
  );
}

function CategoryModal({ category, onClose }: { category?: { id: string; name: string; color: string }; onClose: () => void }) {
  const { addCategory, updateCategory } = useStore();
  const [name, setName] = useState(category?.name || '');
  const [color, setColor] = useState(category?.color || '#3B82F6');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      await updateCategory(category.id, { name, color });
    } else {
      await addCategory({ name, color });
    }
    onClose();
  };

  const colors = [
    '#3B82F6', '#EF4444', '#8B5CF6', '#F59E0B', '#10B981', 
    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {category ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Color</label>
            <div className="flex gap-2 flex-wrap">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors ${color === c ? 'border-slate-900 dark:border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
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
              {category ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
