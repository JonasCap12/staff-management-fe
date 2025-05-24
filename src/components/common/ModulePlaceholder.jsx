const ModulePlaceholder = ({ title, icon: Icon }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-3">
      <Icon className="h-8 w-8 text-blue-600" />
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center py-12">
        <Icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">Module này đang được phát triển. Các chức năng sẽ được cập nhật sớm.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Bắt đầu cấu hình
        </button>
      </div>
    </div>
  </div>
);

export default ModulePlaceholder;