
import React from 'react';
import { Package, Plus, User, Bell } from 'lucide-react';

interface NavbarProps {
  onAddClick: () => void;
  user: {
    avatar: string;
    name: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ onAddClick, user }) => {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Package size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          UniBorrow
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
        <button className="hover:text-blue-600 transition">Explore</button>
        <button className="hover:text-blue-600 transition">How it Works</button>
        <button className="hover:text-blue-600 transition">Safe Zones</button>
      </div>

      <div className="flex gap-4 items-center">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition">
          <Bell size={20} />
        </button>
        <button 
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 font-semibold"
        >
          <Plus size={18} /> <span className="hidden sm:inline">List Item</span>
        </button>
        <div className="flex items-center gap-2 ml-2 pl-4 border-l">
          <div className="w-10 h-10 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden shadow-sm">
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
