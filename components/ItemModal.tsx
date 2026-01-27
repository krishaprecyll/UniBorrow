
import React from 'react';
import { X, Calendar, ShieldCheck, MapPin, Star, UserCheck } from 'lucide-react';
import { Item } from '../types';

interface ItemModalProps {
  item: Item;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
             <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {item.category}
             </span>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
          >
            <X size={24} />
          </button>

          <div className="flex justify-between items-start mb-2 pr-8">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">{item.name}</h2>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={18} fill="currentColor" />
              <span>{item.rating}</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <ShieldCheck size={18} />
              <span>Verified Owner</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl mb-8 flex flex-col gap-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.owner.avatar} className="w-10 h-10 rounded-full border shadow-sm" alt={item.owner.name} />
                <div>
                  <div className="font-bold text-slate-900">{item.owner.name}</div>
                  <div className="text-xs text-slate-500">Member since 2023</div>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-bold hover:underline">Contact Owner</button>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex flex-col">
                <span className="text-xs text-blue-600 font-bold uppercase">Rental Fee</span>
                <span className="text-2xl font-black text-blue-900">₱{item.feePerDay}<span className="text-sm font-medium text-blue-700/70">/day</span></span>
              </div>
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200">
                Rent Now
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <UserCheck size={14} />
              <span>Identity verified students only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
