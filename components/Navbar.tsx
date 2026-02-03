
import React, { useState } from 'react';
import { Package, Plus, User, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onAddClick: () => void;
  user: {
    avatar: string;
    name: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ onAddClick, user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };
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
        <div className="relative ml-2 pl-4 border-l">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-xl transition"
          >
            <div className="w-10 h-10 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden shadow-sm">
              <img src={user.avatar} alt={user.name} />
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">Verified Student</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 transition flex items-center gap-3 text-red-600 font-medium"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
