import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />
      <div className="flex flex-1 pt-0 relative">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={closeMobileMenu}
        />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full lg:ml-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
