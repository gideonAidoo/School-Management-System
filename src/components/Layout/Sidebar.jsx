import React from 'react';

const LayoutDashboard = ({ className }) => <span className={className}>📊</span>;
const Users = ({ className }) => <span className={className}>👥</span>;
const FileText = ({ className }) => <span className={className}>📄</span>;
const Printer = ({ className }) => <span className={className}>🖨️</span>;
const School = ({ className }) => <span className={className}>🏫</span>;

const Sidebar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'bulk-print', icon: Printer, label: 'Bulk Print' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <School className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">EduManage</h1>
            <p className="text-sm text-gray-600">Exam System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;