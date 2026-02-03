
import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, ShieldCheck, Clock, Camera, Zap, Filter, ArrowRight, Star, Package, Loader2 } from 'lucide-react';
import { MOCK_ITEMS, SAFE_ZONES } from './constants';
import { Item, Category, User } from './types';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import ItemModal from './components/ItemModal';
import AIChat from './components/AIChat';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (data) {
          setUserProfile(data as User);
        }
      };
      fetchUserProfile();
    }
  }, [user]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package size={40} className="text-blue-600" />
              <h1 className="text-3xl font-black">UniBorrow</h1>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome to Campus Rental Marketplace
            </h2>
            <p className="text-slate-600">
              Rent gear, textbooks, and equipment from your peers safely and easily
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
            >
              Create Account
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t">
            <div className="text-center">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">Verified Students Only</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">Safe Exchange Zones</p>
            </div>
            <div className="text-center">
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">24/7 CCTV Monitored</p>
            </div>
          </div>
        </div>

        {showLoginModal && (
          <LoginForm
            onClose={() => setShowLoginModal(false)}
            onSwitchToRegister={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
          />
        )}

        {showRegisterModal && (
          <RegisterForm
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar
        onAddClick={() => setShowAddModal(true)}
        user={userProfile || {
          id: user.id,
          name: user.user_metadata?.name || user.email || 'User',
          avatar: user.user_metadata?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
          rating: 5.0,
          verified: false
        }}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* --- Hero Section --- */}
        <section className="mb-12 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-8 md:p-16 text-white shadow-2xl shadow-blue-200/50">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
             <div className="absolute transform rotate-45 -right-12 top-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
             <div className="absolute transform -rotate-45 right-0 bottom-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md px-4 py-2 rounded-full text-blue-100 text-xs font-bold mb-6 border border-white/10 uppercase tracking-widest">
               <Zap size={14} fill="currentColor" /> Verified Campus Marketplace
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
              Rent anything from <br/> <span className="text-blue-200 italic">your peers.</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl leading-relaxed">
              Don't buy what you only need once. From expensive gear to rare textbooks, find it right here on campus.
            </p>
            
            <div className="relative max-w-2xl group">
              <Search className="absolute left-5 top-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={24} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cameras, tents, calculators..." 
                className="w-full pl-14 pr-4 py-5 rounded-[1.5rem] border-none shadow-xl text-slate-800 text-lg focus:ring-4 focus:ring-blue-400/50 outline-none transition-all"
              />
              <button className="absolute right-3 top-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-2xl font-bold transition-all shadow-lg flex items-center gap-2">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* --- Quick Categories --- */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Filter size={20} className="text-blue-600" /> Browse by Category
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                !selectedCategory ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
              }`}
            >
              All Items
            </button>
            {Object.values(Category).map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* --- Items Grid --- */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Featured Listings</h3>
              <p className="text-slate-500 text-sm">Recently added gear from your classmates</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-amber-500 text-xs font-black shadow-sm flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> {item.rating}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                  </div>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-6 p-2 bg-slate-50 rounded-xl">
                    <img src={item.owner.avatar} className="w-8 h-8 rounded-full border border-white" alt={item.owner.name} />
                    <div className="text-[10px] flex flex-col">
                      <span className="text-slate-400 font-bold uppercase tracking-tight">Listed by</span>
                      <span className="text-slate-800 font-bold truncate">{item.owner.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-black uppercase">Daily Fee</span>
                      <div className="text-xl font-black text-slate-900">₱{item.feePerDay}</div>
                    </div>
                    <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
              <div className="bg-slate-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={32} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">No results found</h4>
              <p className="text-slate-500">Try adjusting your filters or searching for something else.</p>
            </div>
          )}
        </section>

        {/* --- Safe Zone Section --- */}
        <section className="mb-12">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <h3 className="text-4xl font-black mb-4">Safe Exchange Zones</h3>
                <p className="text-slate-400 text-lg mb-10 max-w-xl">
                  Your safety is our priority. Every transaction must be finalized at one of our campus-monitored "Safe Zones" featuring 24/7 security.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SAFE_ZONES.map(zone => (
                    <div key={zone.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-600/30 p-2 rounded-lg">
                          <MapPin size={20} className="text-blue-400" />
                        </div>
                        <span className="font-bold text-lg">{zone.name}</span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">{zone.location}</div>
                      <div className="text-xs flex items-center gap-1 text-blue-400 font-medium">
                        <ShieldCheck size={14} /> CCTV Monitored
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="w-full lg:w-1/3 bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 font-black text-xl">
                    <Clock size={24} className="text-blue-400" /> Track Meetup
                  </div>
                  <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Live</span>
                </div>
                
                <div className="space-y-6">
                  <div className="relative pl-8 border-l-2 border-blue-500/30 pb-4">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900"></div>
                    <div className="text-xs text-blue-400 font-black uppercase mb-1">Pick up initiated</div>
                    <div className="text-sm">Owner is heading to Central Library</div>
                  </div>
                  <div className="relative pl-8 border-l-2 border-blue-500/30 pb-4">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full border-4 border-slate-900"></div>
                    <div className="text-xs text-slate-500 font-black uppercase mb-1">In Transit</div>
                    <div className="text-sm text-slate-400">Arriving in approx 4 mins</div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-600 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-blue-700 cursor-pointer transition">
                  <Camera size={20} /> Scan Item QR to Confirm
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footnotes --- */}
      <footer className="bg-white border-t py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Package size={24} className="text-blue-600" />
            <span className="text-xl font-bold">UniBorrow</span>
          </div>
          <div className="text-slate-400 text-sm">
            &copy; 2024 University Rental Marketplace. Built for students, by students.
          </div>
          <div className="flex gap-6">
            <button className="text-slate-600 hover:text-blue-600 text-sm font-medium transition">Terms</button>
            <button className="text-slate-600 hover:text-blue-600 text-sm font-medium transition">Privacy</button>
            <button className="text-slate-600 hover:text-blue-600 text-sm font-medium transition">Support</button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {/* AI Chatbot Overlay */}
      <AIChat items={items} />
    </div>
  );
};

export default App;
