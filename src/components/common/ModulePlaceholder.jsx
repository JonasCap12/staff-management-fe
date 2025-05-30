import React from 'react';

const ModulePlaceholder = ({ title, icon: Icon }) => {
  return (
    <section className="space-y-6">
      <header className="flex items-center space-x-3">
        <Icon className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="text-center py-12">
          <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Module này đang được phát triển. Các chức năng sẽ được cập nhật sớm.
          </p>
          <button className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all">
            Bắt đầu cấu hình
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModulePlaceholder;
