import { Navbar } from '@/components/navbar/navbar';
import { Sidebar } from '@/components/sidebar/sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';


export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        <main
          className={`mt-16 px-4 py-6 transition-all duration-300 ${
            isSidebarOpen ? 'ml-60' : 'ml-20'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};