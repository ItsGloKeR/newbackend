
import React, { useState } from 'react';
import OverridesManager from '../components/admin/OverridesManager';
import ReportsViewer from '../components/admin/ReportsViewer';

type AdminTab = 'overrides' | 'reports';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overrides');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overrides':
        return <OverridesManager />;
      case 'reports':
        return <ReportsViewer />;
      default:
        return null;
    }
  };
  
  const tabClasses = (tabName: AdminTab) =>
    `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
      activeTab === tabName
        ? 'border-b-2 border-primary text-primary bg-surface'
        : 'text-text-secondary hover:text-text-primary'
    }`;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <button className={tabClasses('overrides')} onClick={() => setActiveTab('overrides')}>
            URL Overrides
          </button>
          <button className={tabClasses('reports')} onClick={() => setActiveTab('reports')}>
            Issue Reports
          </button>
        </nav>
      </div>
      <div className="p-4 bg-surface rounded-b-lg">{renderTabContent()}</div>
    </div>
  );
};

export default AdminPage;
