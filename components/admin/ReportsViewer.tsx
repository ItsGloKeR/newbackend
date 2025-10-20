
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import type { Report } from '../../types';
import Button from '../ui/Button';

const ReportsViewer: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const data = await apiService.getReports();
      setReports(data);
      setLoading(false);
    };
    fetchReports();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'open' | 'closed') => {
    const updatedReport = await apiService.updateReportStatus(id, newStatus);
    setReports(reports.map(r => r.id === id ? updatedReport : r));
  };

  if (loading) return <div>Loading reports...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">User Issue Reports</h2>
       <div className="overflow-x-auto">
        <table className="min-w-full bg-background rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left">Anime ID</th>
              <th className="px-4 py-2 text-left">Episode</th>
              <th className="px-4 py-2 text-left">Issue Type</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="px-4 py-2">{r.animeId}</td>
                <td className="px-4 py-2">{r.episodeNumber}</td>
                <td className="px-4 py-2">{r.issueType}</td>
                <td className="px-4 py-2 truncate max-w-sm">{r.description}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${r.status === 'open' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {r.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {r.status === 'open' ? (
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(r.id, 'closed')}>
                      Mark as Closed
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(r.id, 'open')}>
                      Re-open
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsViewer;
