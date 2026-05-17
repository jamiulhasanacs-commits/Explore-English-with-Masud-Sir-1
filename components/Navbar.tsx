
import React from 'react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
  userRole: string;
  onLogout: () => void;
  fullName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, userRole, onLogout, fullName }) => {
  const isPublic = ['home', 'courses', 'about', 'free-courses', 'free-resources', 'contact'].includes(currentView);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentView('home')}
        >
          <div className="bg-blue-600 text-white w-11 h-11 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-200">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <div>
            <h1 className="font-black text-xl text-blue-950 tracking-tight leading-none">Explore English</h1>
            <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.15em] mt-1">With Masud Sir</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {isPublic ? (
            <>
              <button onClick={() => setCurrentView('home')} className={`font-semibold transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>হোম</button>
              <button onClick={() => setCurrentView('courses')} className={`font-semibold transition-colors ${currentView === 'courses' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>পেইড কোর্সসমূহ</button>
              <button onClick={() => setCurrentView('free-courses')} className={`font-semibold transition-colors ${currentView === 'free-courses' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>ফ্রি কোর্স</button>
              <button onClick={() => setCurrentView('free-resources')} className={`font-semibold transition-colors ${currentView === 'free-resources' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>ফ্রি রিসোর্স</button>
              <button onClick={() => setCurrentView('about')} className={`font-semibold transition-colors ${currentView === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>আমাদের সম্পর্কে</button>
              <button onClick={() => setCurrentView('contact')} className={`font-semibold transition-colors ${currentView === 'contact' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>যোগাযোগ</button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setCurrentView(userRole === 'student' ? 'student-dashboard' : 'teacher-dashboard')} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black transition-all ${
                  ['student-dashboard', 'teacher-dashboard'].includes(currentView)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <i className="fa-solid fa-chart-pie text-sm"></i>
                ড্যাশবোর্ড
              </button>
              <button 
                onClick={() => setCurrentView('courses')} 
                className={`font-black px-4 py-2 rounded-xl transition-all ${
                  currentView === 'courses' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                পেইড কোর্সসমূহ
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!userRole ? (
            <>
              <button 
                onClick={() => setCurrentView('login')}
                className="text-blue-600 font-bold px-4 py-2 hover:bg-blue-50 rounded-lg transition"
              >
                লগইন
              </button>
              <button 
                onClick={() => setCurrentView('signup')}
                className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95"
              >
                রেজিস্ট্রেশন
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">{fullName || (userRole === 'student' ? 'ছাত্র' : 'শিক্ষক')}</p>
                  <p className="text-xs text-slate-500 font-medium">ব্যবহারকারী</p>
               </div>
               <button 
                  onClick={onLogout}
                  className="bg-red-50 p-2.5 rounded-xl hover:bg-red-100 text-red-600 transition active:scale-90"
                  title="Logout"
               >
                 <i className="fa-solid fa-right-from-bracket"></i>
               </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
