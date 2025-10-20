
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import type { Override } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

const OverridesManager: React.FC = () => {
  const [overrides, setOverrides] = useState<Override[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverrides = async () => {
      setLoading(true);
      const data = await apiService.getOverrides();
      setOverrides(data);
      setLoading(false);
    };
    fetchOverrides();
  }, []);
  
  // In a real app, you would have forms to add/edit overrides.
  // This is a simplified view.

  if (loading) return <div>Loading overrides...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Manage URL Overrides</h2>
      <Button>Add New Override</Button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">AniList ID</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">URL Template</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {overrides.map(o => (
              <tr key={o.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="px-4 py-2 capitalize">{o.type}</td>
                <td className="px-4 py-2">{o.anilistId || 'N/A'}</td>
                <td className="px-4 py-2">{o.source}</td>
                <td className="px-4 py-2 truncate max-w-xs">{o.urlTemplate}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverridesManager;
