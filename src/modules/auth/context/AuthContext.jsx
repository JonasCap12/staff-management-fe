import { useState, createContext } from "react";
import { rolePermissions } from "./rolePermissions";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    const userWithPermissions = {
      ...userData,
      permissions: rolePermissions[userData.role],
    };
    setUser(userWithPermissions);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;

    // Admin has all permissions
    if (user.permissions.permissions.includes("*")) return true;

    return (
      user.permissions.permissions.includes(permission) ||
      user.permissions.permissions.some((p) => permission.startsWith(p + "."))
    );
  };

  const canAccessMenu = (menuItem) => {
    if (!user || !user.permissions) return false;

    // Admin can access everything
    if (user.permissions.permissions.includes("*")) return true;

    return user.permissions.menuItems.includes(menuItem);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    canAccessMenu,
    rolePermissions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the context for the hook to use
export { AuthContext };
