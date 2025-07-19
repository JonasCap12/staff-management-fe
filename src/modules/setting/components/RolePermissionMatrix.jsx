import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { 
  ROLE_OPTIONS, 
  PERMISSION_MODULES, 
  DEFAULT_ROLE_PERMISSIONS 
} from '../../../constants/settingOptions';
import { rolePermissionApi } from '../services/settingsApi';

const RolePermissionMatrix = () => {
  const [roles, setRoles] = useState(ROLE_OPTIONS);
  const [selectedRole, setSelectedRole] = useState('admin');
  const [permissions, setPermissions] = useState(DEFAULT_ROLE_PERMISSIONS);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', label: '', color: 'gray' });
  const [showNewRoleForm, setShowNewRoleForm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load roles and permissions
  useEffect(() => {
    const loadRolesAndPermissions = async () => {
      setLoading(true);
      try {
        // In a real app, you would load from API
        // const rolesData = await rolePermissionApi.getRoles();
        // setRoles(rolesData);
        
        // For now, use mock data
        setRoles(ROLE_OPTIONS);
        setPermissions(DEFAULT_ROLE_PERMISSIONS);
      } catch (error) {
        console.error('Failed to load roles and permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRolesAndPermissions();
  }, []);

  const handlePermissionChange = (permissionId, checked) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: checked
        ? [...(prev[selectedRole] || []), permissionId]
        : (prev[selectedRole] || []).filter(id => id !== permissionId)
    }));
    setHasChanges(true);
  };

  const handleSelectAllModule = (moduleId, checked) => {
    const modulePermissions = PERMISSION_MODULES.find(m => m.id === moduleId)?.permissions || [];
    const permissionIds = modulePermissions.map(p => p.id);
    
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: checked
        ? [...new Set([...(prev[selectedRole] || []), ...permissionIds])]
        : (prev[selectedRole] || []).filter(id => !permissionIds.includes(id))
    }));
    setHasChanges(true);
  };

  const handleSelectAllRole = (checked) => {
    const allPermissions = PERMISSION_MODULES.flatMap(module => 
      module.permissions.map(permission => permission.id)
    );
    
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: checked ? allPermissions : []
    }));
    setHasChanges(true);
  };

  const handleSavePermissions = async () => {
    setSaving(true);
    try {
      // In a real app, you would save to API
      // await rolePermissionApi.updateRolePermissions(selectedRole, permissions[selectedRole]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasChanges(false);
      alert('Quyền đã được cập nhật thành công!');
    } catch (error) {
      console.error('Failed to save permissions:', error);
      alert('Có lỗi xảy ra khi lưu quyền');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateRole = async () => {
    if (!newRole.name || !newRole.label) {
      alert('Vui lòng nhập đầy đủ thông tin vai trò');
      return;
    }

    try {
      // In a real app, you would create via API
      // const createdRole = await rolePermissionApi.createRole(newRole);
      
      const createdRole = {
        value: newRole.name.toLowerCase(),
        label: newRole.label,
        color: newRole.color
      };
      
      setRoles(prev => [...prev, createdRole]);
      setPermissions(prev => ({
        ...prev,
        [createdRole.value]: []
      }));
      
      setNewRole({ name: '', label: '', color: 'gray' });
      setShowNewRoleForm(false);
      setSelectedRole(createdRole.value);
      
      alert('Vai trò đã được tạo thành công!');
    } catch (error) {
      console.error('Failed to create role:', error);
      alert('Có lỗi xảy ra khi tạo vai trò');
    }
  };

  const handleDeleteRole = async (roleValue) => {
    if (roleValue === 'admin') {
      alert('Không thể xóa vai trò Admin');
      return;
    }

    if (!window.confirm(`Bạn có chắc chắn muốn xóa vai trò "${roles.find(r => r.value === roleValue)?.label}"?`)) {
      return;
    }

    try {
      // In a real app, you would delete via API
      // await rolePermissionApi.deleteRole(roleValue);
      
      setRoles(prev => prev.filter(r => r.value !== roleValue));
      setPermissions(prev => {
        const newPermissions = { ...prev };
        delete newPermissions[roleValue];
        return newPermissions;
      });
      
      if (selectedRole === roleValue) {
        setSelectedRole('admin');
      }
      
      alert('Vai trò đã được xóa thành công!');
    } catch (error) {
      console.error('Failed to delete role:', error);
      alert('Có lỗi xảy ra khi xóa vai trò');
    }
  };

  const getRoleColor = (color) => {
    const colorMap = {
      red: 'bg-red-100 text-red-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      gray: 'bg-gray-100 text-gray-800',
      yellow: 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[color] || colorMap.gray;
  };

  const isModuleSelected = (moduleId) => {
    const modulePermissions = PERMISSION_MODULES.find(m => m.id === moduleId)?.permissions || [];
    const rolePermissions = permissions[selectedRole] || [];
    return modulePermissions.every(p => rolePermissions.includes(p.id));
  };

  const isModulePartiallySelected = (moduleId) => {
    const modulePermissions = PERMISSION_MODULES.find(m => m.id === moduleId)?.permissions || [];
    const rolePermissions = permissions[selectedRole] || [];
    const selectedCount = modulePermissions.filter(p => rolePermissions.includes(p.id)).length;
    return selectedCount > 0 && selectedCount < modulePermissions.length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải phân quyền...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Quản lý vai trò và phân quyền
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Tạo và quản lý vai trò, phân quyền cho người dùng
          </p>
        </div>
        
        {/* Save indicator */}
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Có thay đổi chưa lưu</span>
            </div>
          )}
          
          {saving && (
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Đang lưu...</span>
            </div>
          )}
          
          {!hasChanges && !saving && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu</span>
            </div>
          )}
          
          <button
            onClick={handleSavePermissions}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            Lưu quyền
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Vai trò</h3>
              <button
                onClick={() => setShowNewRoleForm(true)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm
              </button>
            </div>
            
            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.value}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole === role.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getRoleColor(role.color).split(' ')[0]}`}></div>
                    <span className="text-sm font-medium text-gray-900">{role.label}</span>
                  </div>
                  
                  {role.value !== 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(role.value);
                      }}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Phân quyền: {roles.find(r => r.value === selectedRole)?.label}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSelectAllRole(true)}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                >
                  Chọn tất cả
                </button>
                <button
                  onClick={() => handleSelectAllRole(false)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  Bỏ chọn tất cả
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {PERMISSION_MODULES.map((module) => (
                <React.Fragment key={module.id}>
                  {/* Module Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isModuleSelected(module.id)}
                        ref={(el) => {
                          if (el) {
                            el.indeterminate = isModulePartiallySelected(module.id);
                          }
                        }}
                        onChange={(e) => handleSelectAllModule(module.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-900">{module.label}</span>
                    </div>
                    <span className="text-gray-500">
                      {module.permissions.length} quyền
                    </span>
                  </div>
                  
                  {/* Module Permissions */}
                  {module.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{permission.label}</span>
                      <input
                        type="checkbox"
                        checked={(permissions[selectedRole] || []).includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Lưu ý về phân quyền</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Vai trò Admin có tất cả quyền và không thể bị xóa</li>
              <li>• Thay đổi quyền sẽ ảnh hưởng đến tất cả người dùng có vai trò tương ứng</li>
              <li>• Nhấn "Lưu quyền" để áp dụng thay đổi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMatrix; 