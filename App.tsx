
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AIChatBot from './components/AIChatBot';
import { COURSES, BLOG_POSTS } from './constants';
import { UserRole, Course } from './types';
import { supabase } from './lib/supabase';
import masudSirHero from './src/assets/images/2Gemini_Generated_Image_4nyi784nyi784nyi.png';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('সব ক্লাস');
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentClass, setStudentClass] = useState('ষষ্ঠ শ্রেণি');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session) setUserRole('student');
      } catch (err) {
        console.error("Supabase Session Error:", err);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setUserRole('student');
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleEnroll = (course: Course) => {
    if (!session) {
      setCurrentView('login');
    } else {
      setSelectedCourse(course);
      setCurrentView('course-player');
    }
  };

  const handleLogin = async (role: UserRole) => {
    // This is the old mock handler. I'll update the login UI to call a new async function.
    setUserRole(role);
    setCurrentView(role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
    setCurrentView('home');
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setCurrentView('student-dashboard');
    }
    setLoading(false);
  };

  const handleSupabaseSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          student_class: studentClass
        }
      }
    });
    if (error) {
      setError(error.message);
    } else {
      alert('একাউন্ট তৈরি হয়েছে! দয়া করে আপনার ইমেইল ভেরিফাই করুন।');
      setCurrentView('login');
    }
    setLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-32 pb-32">
      {/* Hero Section with Masud Sir's Image */}
      <section className="relative min-h-[85vh] flex items-center bg-[#0a192f] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
          <div className="text-white space-y-8 reveal" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-400/20 px-5 py-2.5 rounded-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-blue-300 text-sm font-bold tracking-widest uppercase">বাংলাদেশের ১ নম্বর ইংলিশ লার্নিং প্ল্যাটফর্ম</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tight">
              ইংরেজি শিখুন <br/>
              সরাসরি <span className="gradient-text">মাসুদ স্যারের</span> কাছে
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              সহজ কৌশল, আধুনিক প্রযুক্তি এবং মাসুদ স্যারের ১০ বছরের অভিজ্ঞতায় ইংরেজিভীতি দূর করুন আজই।
            </p>
            
            <div className="flex flex-wrap gap-5 pt-6">
              <button 
                onClick={() => setCurrentView('courses')} 
                className="group bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                ভর্তি শুরু করুন
                <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
              </button>
              <button 
                onClick={() => setCurrentView('free-courses')}
                className="glass text-white bg-white/5 backdrop-blur-xl border border-white/10 px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-white/10 transition transform hover:-translate-y-1"
              >
                ফ্রি ভিডিও দেখুন
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
               <div>
                  <p className="text-3xl font-black text-white">১২ হাজার+</p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">সফল শিক্ষার্থী</p>
               </div>
               <div>
                  <p className="text-3xl font-black text-white">৪.৯/৫</p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">রেটিং</p>
               </div>
               <div>
                  <p className="text-3xl font-black text-white">১০০+</p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">ফ্রি রিসোর্স</p>
               </div>
            </div>
          </div>

          {/* Teacher Image Area */}
          <div className="relative reveal" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/20 to-transparent blur-[100px] rounded-full animate-float"></div>
            
            {/* The Main Frame for the User's Image */}
            <div className="relative z-10 p-4 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={masudSirHero} 
                alt="Masud Sir" 
                className="w-full h-auto rounded-[2.5rem] object-cover shadow-2xl transition-all duration-700 group-hover:scale-105" 
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-8 right-8 bg-white p-4 rounded-3xl shadow-2xl flex items-center gap-4 animate-float">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl">
                   <i className="fa-solid fa-book-open-reader"></i>
                 </div>
                 <div>
                    <p className="font-black text-slate-900 leading-tight text-sm">Gerund vs Participle</p>
                    <p className="text-[10px] text-blue-500 font-bold uppercase">আজকের ভিডিও লেসন</p>
                 </div>
              </div>
              
              {/* Left Badge */}
              <div className="absolute top-12 -left-4 bg-emerald-500 p-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                 <i className="fa-solid fa-check-circle text-white text-xl"></i>
                 <span className="text-white font-black text-sm pr-2">প্রফেশনাল গাইডেন্স</span>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-8 border-blue-600/20 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-6 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black text-[#0a192f] mb-4">সেরা কোর্সসমূহ</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              আপনার প্রয়োজন এবং বর্তমান লেভেল অনুযায়ী সবচেয়ে উপযোগী কোর্সটি বেছে নিন এবং আজই যাত্রা শুরু করুন।
            </p>
          </div>
          <button onClick={() => setCurrentView('courses')} className="bg-white border-2 border-slate-100 text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200/50 group">
            সব কোর্স দেখুন 
            <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {COURSES.map(course => (
            <div key={course.id} className="course-card bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-50 transition-all duration-500 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{course.level}</span>
                  {course.isFree && <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">ফ্রি</span>}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <button onClick={() => handleEnroll(course)} className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black shadow-2xl">বিস্তারিত দেখুন</button>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-px bg-blue-600"></span>
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{course.category}</span>
                </div>
                <h3 className="text-2xl font-black text-[#0a192f] mb-4 line-clamp-2 leading-snug">{course.title}</h3>
                
                <div className="flex items-center gap-6 text-slate-400 text-sm font-bold mb-8">
                   <span className="flex items-center gap-2"><i className="fa-regular fa-clock text-blue-500"></i> {course.duration}</span>
                   <span className="flex items-center gap-2"><i className="fa-regular fa-circle-play text-blue-500"></i> ১২০+ লেসন</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">ভর্তি ফি</span>
                    <span className="text-3xl font-black text-blue-600">
                      {course.isFree ? 'বিনামূল্যে' : `৳${course.price.toLocaleString()}`}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleEnroll(course)}
                    className="bg-[#0a192f] text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 shadow-xl"
                  >
                    <i className="fa-solid fa-plus text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Why Choose Us Section */}
      <section className="bg-slate-50 py-32 reveal">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-5xl font-black text-[#0a192f] mb-6">আমাদের বিশেষত্ব</h2>
              <p className="text-slate-500 font-medium text-lg">গতানুগতিক ধারার বাইরে এসে সহজ ও মজার ছলে ইংরেজি শিখুন আমাদের সাথে।</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'fa-chalkboard-user', title: 'ব্যক্তিগত মেন্টরশিপ', color: 'bg-blue-600', desc: 'সরাসরি মাসুদ স্যারের গাইডেন্সে শেখার সুযোগ।' },
                { icon: 'fa-robot', title: 'AI প্র্যাকটিস বট', color: 'bg-indigo-600', desc: '২৪/৭ প্র্যাকটিস করার জন্য রয়েছে আমাদের স্মার্ট AI সহযোগী।' },
                { icon: 'fa-layer-group', title: 'সম্পূর্ণ রিসোর্স', color: 'bg-emerald-600', desc: 'ভিডিও ক্লাসের সাথে রয়েছে লেকচার শিট ও PDF নোটস।' },
                { icon: 'fa-certificate', title: 'ভেরিফাইড সার্টিফিকেট', color: 'bg-amber-500', desc: 'কোর্স শেষে রয়েছে প্রফেশনাল অনলাইন সার্টিফিকেট।' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-50 hover:border-blue-200 transition-all group">
                   <div className={`${item.color} w-16 h-16 rounded-3xl flex items-center justify-center text-white text-2xl mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                      <i className={`fa-solid ${item.icon}`}></i>
                   </div>
                   <h4 className="text-xl font-black text-[#0a192f] mb-4">{item.title}</h4>
                   <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-7xl mx-auto px-6 py-24 reveal">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <div className="relative">
          <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 bg-white p-6 rounded-[3.5rem] shadow-3xl border border-slate-100 overflow-hidden">
            <img 
              src={masudSirHero} 
              alt="Masud Sir" 
              className="w-full h-auto rounded-[2.5rem] object-cover shadow-2xl"
            />
            <div className="mt-10 grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                  <p className="text-3xl font-black text-blue-600">২৬+</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">বছরের অভিজ্ঞতা</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                  <p className="text-3xl font-black text-emerald-500">১২কে+</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">সফল শিক্ষার্থী</p>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <span className="text-blue-600 font-black tracking-widest uppercase text-sm">মেন্টর পরিচিতি</span>
            <h1 className="text-5xl md:text-6xl font-black text-[#0a192f] mt-4 mb-8 leading-tight">আমাদের সম্পর্কে</h1>
            <div className="w-24 h-2 bg-blue-600 rounded-full mb-10"></div>
          </div>

          <div className="space-y-8 text-slate-600 text-xl leading-relaxed font-medium">
            <p>
              মাসুদ স্যার একজন অভিজ্ঞ ও জনপ্রিয় শিক্ষক, যিনি দীর্ঘদিন ধরে শিক্ষার্থীদের আন্তরিকতার সাথে পাঠদান করে আসছেন। তিনি মূলত ইংরেজি বিষয়ে পাঠদান করেন এবং সহজ ও বাস্তবধর্মী উপায়ে জটিল বিষয়গুলো শিক্ষার্থীদের কাছে উপস্থাপন করার জন্য পরিচিত।
            </p>
            <p>
              তাঁর লক্ষ্য শুধু ভালো রেজাল্ট করানো নয়, বরং প্রতিটি শিক্ষার্থীর ভিত শক্ত করা এবং আত্মবিশ্বাস বৃদ্ধি করা। তিনি গত ২৬ বছর ধরে সফলভাবে শিক্ষার্থীদের গাইড করে আসছেন। তাঁর তত্ত্বাবধানে অনেক শিক্ষার্থী বিভিন্ন পরীক্ষায় কৃতিত্বপূর্ণ ফলাফল অর্জন করেছে।
            </p>
            <p>
              মাসুদ স্যারের ক্লাসে প্রতিটি শিক্ষার্থীর প্রতি বিশেষ গুরুত্ব দেওয়া হয়। নিয়মিত ক্লাস টেস্ট, সাজেশন, এক্সাম প্রস্তুতি এবং দুর্বল শিক্ষার্থীদের আলাদা যত্নের মাধ্যমে তিনি শিক্ষার্থীদের সফলতার পথে এগিয়ে নিতে কাজ করেন। বর্তমানে তিনি "Explore English With Masud Sir" এ পাঠদান করছেন এবং online ও offline—উভয় মাধ্যমেই ক্লাস পরিচালনা করছেন।
            </p>
            <p>
              তিনি বিশ্বাস করেন, সঠিক দিকনির্দেশনা ও পরিশ্রম থাকলে প্রতিটি শিক্ষার্থীই সফল হতে পারে। তাই তিনি সবসময় শিক্ষার্থীদের অনুপ্রাণিত করেন মনোযোগ, শৃঙ্খলা ও ধারাবাহিকতার সাথে পড়াশোনা চালিয়ে যেতে।
            </p>
          </div>

          <div className="bg-[#0a192f] p-12 rounded-[3.5rem] shadow-3xl text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[50px] rounded-full"></div>
             <h3 className="text-2xl font-black mb-10 border-b border-white/10 pb-6 uppercase tracking-widest">যোগাযোগের জন্য</h3>
             <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-blue-600 transition-colors">
                      <i className="fa-solid fa-phone"></i>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">ফোন নম্বর</p>
                      <p className="text-xl font-bold">01729104426 & 01913124653</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-blue-300 transition-colors">
                      <i className="fa-brands fa-facebook"></i>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">ফেসবুক প্রোফাইল</p>
                      <a href="https://www.facebook.com/md.masudar.rahman.2024" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-blue-400 transition-colors">MD Masudar Rahman</a>
                   </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-rose-500 transition-colors">
                      <i className="fa-solid fa-envelope"></i>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">ইমেইল এড্রেস</p>
                      <p className="text-xl font-bold">masudarrahman019@gmail.com</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-emerald-500 transition-colors">
                      <i className="fa-solid fa-location-dot"></i>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">ঠিকানা</p>
                      <p className="text-xl font-bold">Char Rajibpur, Kurigram</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="reveal">
      {/* Hero Section */}
      <section className="bg-[#0a192f] py-24 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-blue-400 font-black tracking-widest uppercase text-sm">যোগাযোগ করুন</span>
          <h1 className="text-5xl md:text-7xl font-black mt-6 mb-8">আমাদের সাথে যুক্ত হও</h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
            “যেকোনো তথ্য, ভর্তি বা ক্লাস সংক্রান্ত সহায়তার জন্য আমাদের সাথে যোগাযোগ করো। আমরা তোমাকে সহায়তা করতে সবসময় প্রস্তুত।” ✨
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-3xl border border-slate-100">
               <h2 className="text-3xl font-black text-[#0a192f] mb-12 flex items-center gap-4">
                 <span className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl">
                   <i className="fa-solid fa-address-book"></i>
                 </span>
                 অফিসিয়াল তথ্যসমূহ
               </h2>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <i className="fa-solid fa-user-tie"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">শিক্ষকের নাম</p>
                        <p className="text-xl font-bold text-[#0a192f]">মোঃ মাসুদার রহমান</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">মোবাইল নাম্বার</p>
                        <p className="text-xl font-bold text-[#0a192f]">01729104426</p>
                        <p className="text-xl font-bold text-[#0a192f]">01913124653</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-xl group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">ইমেইল ঠিকানা</p>
                        <p className="text-xl font-bold text-[#0a192f]">masudarrahman019@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-800 text-xl group-hover:bg-blue-800 group-hover:text-white transition-all">
                        <i className="fa-brands fa-facebook-f"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Facebook Page</p>
                        <a href="https://www.facebook.com/profile.php?id=61550086503163" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-600 hover:underline">Explore English With Masud Sir</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                        <i className="fa-brands fa-youtube"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">YouTube Channel</p>
                        <a href="https://www.youtube.com/@ExploreEnglishwithMasudSir" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-red-600 hover:underline">Explore English With Masud Sir</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 text-xl group-hover:bg-amber-600 group-hover:text-white transition-all">
                        <i className="fa-solid fa-location-dot"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">কোচিং ঠিকানা</p>
                        <p className="text-xl font-bold text-[#0a192f]">Char Rajibpur, Kurigram</p>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="mt-16 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-black text-[#0a192f] mb-6 flex items-center gap-3">
                       <i className="fa-solid fa-clock text-blue-600"></i> ক্লাসের সময়সূচি
                    </h3>
                    <div className="bg-slate-50 p-6 rounded-3xl space-y-2">
                       <p className="font-bold text-slate-700">শনিবার – বৃহস্পতিবার</p>
                       <p className="text-blue-600 font-black text-2xl">বিকাল ৩টা – রাত ৮টা</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0a192f] mb-6 flex items-center gap-3">
                       <i className="fa-solid fa-headset text-blue-600"></i> অনলাইন সাপোর্ট
                    </h3>
                    <div className="bg-slate-50 p-6 rounded-3xl space-y-2">
                       <p className="font-bold text-slate-700">প্রতিদিন</p>
                       <p className="text-blue-600 font-black text-2xl">সকাল ১০টা – রাত ১০টা</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Live Location Map */}
            <div className="bg-white p-6 rounded-[3.5rem] shadow-3xl border border-slate-100 overflow-hidden">
               <div className="flex items-center justify-between p-6">
                  <h2 className="text-2xl font-black text-[#0a192f]">গুগল ম্যাপ লোকেশন</h2>
                  <a href="https://maps.app.goo.gl/v7LpMfvcjApdKutq9" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">ম্যাপে দেখুন <i className="fa-solid fa-external-link text-xs"></i></a>
               </div>
               <div className="h-[400px] rounded-[2.5rem] overflow-hidden bg-slate-100 relative">
                  {/* Embedded Google Map Iframe Placeholder - Real apps use a real iframe */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14457.915224345472!2d89.7891783!3d25.38531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2894101e13f9f%3A0xc07a8370129d2b27!2sRajibpur%20Upazila!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                    className="w-full h-full border-0" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Quick Student Support */}
            <div className="bg-[#0a192f] p-10 rounded-[3rem] text-white shadow-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 blur-[60px] rounded-full"></div>
               <h3 className="text-2xl font-black mb-8 relative z-10">ছাত্রদের সহায়তা কেন্দ্র</h3>
               <p className="text-slate-400 mb-8 leading-relaxed font-medium">ভর্তি সংক্রান্ত জটিলতা বা টেকনিক্যাল সাপোর্টের জন্য সরাসরি মেন্টরের সাথে সংযুক্ত হোন।</p>
               <div className="space-y-4">
                  <a href="tel:01729104426" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-5 rounded-2xl transition-all group">
                     <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-phone text-xl"></i>
                     </div>
                     <span className="font-bold">সরাসরি কল করুন</span>
                  </a>
               </div>
            </div>

            {/* Social Icons Card */}
            <div className="bg-white p-10 rounded-[3rem] shadow-3xl border border-slate-100">
               <h3 className="text-xl font-black text-[#0a192f] mb-8">ফেসবুক ও সোশ্যাল</h3>
               <div className="grid grid-cols-2 gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61550086503163" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 bg-slate-50 p-6 rounded-3xl hover:bg-blue-50 transition-colors group">
                     <i className="fa-brands fa-facebook text-3xl text-blue-600 group-hover:scale-110 transition-transform"></i>
                     <span className="text-xs font-black uppercase text-slate-400">Page</span>
                  </a>
                  <a href="https://www.youtube.com/@ExploreEnglishwithMasudSir" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 bg-slate-50 p-6 rounded-3xl hover:bg-red-50 transition-colors group">
                     <i className="fa-brands fa-youtube text-3xl text-red-600 group-hover:scale-110 transition-transform"></i>
                     <span className="text-xs font-black uppercase text-slate-400">YouTube</span>
                  </a>
               </div>
            </div>

            {/* Support Message */}
            <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-2xl relative">
               <i className="fa-solid fa-quote-left absolute top-8 right-8 text-white/20 text-5xl"></i>
               <p className="font-black text-lg leading-relaxed relative z-10 italic">
                 “শিক্ষা হচ্ছে জাতির মেরুদণ্ড, আর সঠিক শিক্ষা হচ্ছে সফলতার চাবিকাঠি। চলো এক সাথে এগিয়ে যাই।”
               </p>
               <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-black">M</div>
                  <div>
                    <p className="font-bold">মাসুদ স্যার</p>
                    <p className="text-xs text-white/60">English Specialist</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-40 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#0a192f] mb-6">সাধারণ কিছু প্রশ্ন (FAQ)</h2>
            <p className="text-slate-500 font-medium text-lg">আপনার মনে থাকা কিছু কমন প্রশ্নের উওর এখানে দেওয়া হলো।</p>
          </div>

          <div className="space-y-6">
            {[
              { q: 'অনলাইন ক্লাসগুলো কিভাবে হয়?', a: 'প্রতিটি ক্লাস আমাদের ওয়েবসাইট অথবা জুমের মাধ্যমে লাইভ নেওয়া হয় এবং ক্লাসের পর রেকর্ডেড ভিডিও প্যানেলে দেওয়া হয়।' },
              { q: 'আমি কি ক্লাস শেষে নোট পাবো?', a: 'হ্যাঁ, প্রতিটি ক্লাসের সাথে বিশেষ পিডিএফ লেকচার শিট এবং প্র্যাকটিস সেট প্রদান করা হবে।' },
              { q: 'ভর্তি ফি কিভাবে পরিশোধ করবো?', a: 'বিকাশ, রকেট অথবা নগদের মাধ্যমে খুব সহজেই কোর্স ফি পরিশোধ করা যাবে।' },
              { q: 'আমার কোনো দুর্বলতা থাকলে কি আলাদা সাহায্য পাবো?', a: 'অবশ্যই! দুর্বল শিক্ষার্থীদের জন্য আমাদের বিশেষ মেন্টরশিপ সাপোর্ট রয়েছে।' }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-50 group hover:border-blue-200 transition-all cursor-pointer">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-[#0a192f]">{faq.q}</h3>
                    <i className="fa-solid fa-chevron-down text-slate-300 group-hover:text-blue-600 transition-colors"></i>
                 </div>
                 <p className="text-slate-500 mt-6 leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Support Banner */}
      <section className="bg-slate-900 py-20 px-6">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-6">এখনো কোনো কনফিউশন আছে?</h2>
            <p className="text-slate-400 text-lg mb-10">নিঃসংকোচে আমাদের কল করুন অথবা সরাসরি মেসেজ দিন।</p>
            <div className="flex flex-wrap justify-center gap-6">
               <button onClick={() => window.open('tel:01729104426')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition">কল করুন</button>
               <button onClick={() => window.open('https://wa.me/8801966152630')} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition">WhatsApp করুন</button>
            </div>
         </div>
      </section>
    </div>
  );

  const renderFreeResources = () => {
    const resources = [
      { id: 1, title: 'বেসিক গ্রামার হ্যান্ডনোট', type: 'PDF', size: '2.5 MB', category: 'Grammar' },
      { id: 2, title: 'Tense শিখুন সহজ উপায়ে', type: 'PDF', size: '1.8 MB', category: 'Grammar' },
      { id: 3, title: 'Preposition এর ম্যাজিক রুলস', type: 'PDF', size: '3.2 MB', category: 'Grammar' },
      { id: 4, title: 'Parts of Speech পূর্ণাঙ্গ গাইডলাইন', type: 'PDF', size: '4.1 MB', category: 'Grammar' },
      { id: 5, title: 'Sentence Making Framework', type: 'PDF', size: '2.0 MB', category: 'Writing' },
      { id: 6, title: 'Daily Spoken English Phrases', type: 'PDF', size: '1.5 MB', category: 'Spoken' },
    ];

    return (
      <div className="max-w-7xl mx-auto px-6 py-24 reveal">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-black tracking-widest uppercase text-sm">ফ্রি লাইব্রেরি</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0a192f] mt-4 mb-6">ফ্রি রিসোর্স ও PDF</h1>
          <p className="text-slate-500 font-medium text-xl leading-relaxed">আপনার ইংরেজি দক্ষতাকে ঝালাই করতে আমাদের বিশেষ গ্রামার নোট ও রিসোর্সগুলো ডাউনলোড করুন সম্পূর্ণ ফ্রিতে।</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map(res => (
            <div key={res.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-50 hover:border-blue-200 transition-all group">
              <div className="flex items-start justify-between mb-8">
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i className="fa-solid fa-file-pdf"></i>
                 </div>
                 <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase">{res.category}</span>
              </div>
              <h3 className="text-xl font-black text-[#0a192f] mb-2 group-hover:text-blue-600 transition-colors">{res.title}</h3>
              <p className="text-slate-400 text-sm font-bold mb-8">ফরম্যাট: {res.type} • সাইজ: {res.size}</p>
              <button className="w-full bg-[#0a192f] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
                <i className="fa-solid fa-download"></i> ডাউনলোড করুন
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-blue-600 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-5xl font-black mb-6">আমাদের নিয়মিত আপডেট পেতে চান?</h2>
                 <p className="text-blue-100 text-xl font-medium">নতুন নতুন রিসোর্স এবং ক্লাসের আপডেট সরাসরি আপনার কাছে পৌঁছে দিতে আমাদের নিউজলেটারে যুক্ত হোন।</p>
              </div>
              <div className="flex w-full md:w-auto gap-4">
                 <input type="email" placeholder="আপনার ইমেইল" className="bg-white/10 border border-white/20 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-white outline-none flex-1 md:w-80 font-bold placeholder:text-blue-200" />
                 <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-2xl shadow-black/10">যুক্ত হোন</button>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderFreeCourses = () => {
    const freeCourses = COURSES.filter(course => course.id === 'class-6' || course.id === 'class-8');

    return (
      <div className="max-w-7xl mx-auto px-6 py-24 reveal">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-black tracking-widest uppercase text-sm">ফ্রি রিসোর্স</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0a192f] mt-4 mb-6">ফ্রি কোর্সসমূহ</h1>
          <p className="text-slate-500 font-medium text-xl leading-relaxed">ষষ্ঠ এবং অষ্টম শ্রেণির শিক্ষার্থীদের জন্য আমাদের বিশেষ ফ্রি কোর্সসমূহ।</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {freeCourses.map(course => (
            <div key={course.id} className="course-card bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-50 transition-all duration-500 group">
              <div className="relative h-72 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6">
                   <div className="bg-emerald-500 text-white px-6 py-2 rounded-2xl font-black shadow-xl">ফ্রি</div>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                   <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.2em]">{course.category}</span>
                </div>
                <h3 className="text-3xl font-black text-[#0a192f] mt-2 mb-6 leading-snug">{course.title}</h3>
                <p className="text-slate-500 font-medium mb-8 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">কোর্স ফি</p>
                    <p className="text-3xl font-black text-emerald-500">ফ্রি</p>
                  </div>
                  <button onClick={() => handleEnroll(course)} className="bg-[#0a192f] text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all active:scale-95 shadow-xl">
                    এখনই শুরু করো
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCourses = () => {
    const filteredCourses = COURSES.filter(course => {
      if (course.isFree) return false; // Hide free courses from Paid view
      if (courseFilter === 'সব ক্লাস') return true;
      if (courseFilter === 'স্কুল লেভেল') {
        // Class 6 to 10
        const classNum = parseInt(course.id.replace('class-', ''));
        return classNum >= 6 && classNum <= 10;
      }
      if (courseFilter === 'এসএসসি') {
        // Only Class 10
        return course.id === 'class-10';
      }
      if (courseFilter === 'এইচএসসি') {
        // Class 11 and 12
        const classNum = parseInt(course.id.replace('class-', ''));
        return classNum === 11 || classNum === 12;
      }
      return true;
    });

    return (
      <div className="max-w-7xl mx-auto px-6 py-24 reveal">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-black tracking-widest uppercase text-sm">আমাদের লাইব্রেরি</span>
          <h1 className="text-5xl md:text-6xl font-black text-[#0a192f] mt-4 mb-6">পেইড কোর্সসমূহ</h1>
          <p className="text-slate-500 font-medium text-xl leading-relaxed">ষষ্ঠ থেকে দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য বিশেষায়িত ইংলিশ কোর্সসমূহ।</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {['সব ক্লাস', 'স্কুল লেভেল', 'এসএসসি', 'এইচএসসি'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCourseFilter(cat)}
                className={`px-10 py-4 rounded-2xl font-black transition-all shadow-xl ${
                  courseFilter === cat 
                    ? 'bg-blue-600 text-white shadow-blue-500/20' 
                    : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-50 transition-all duration-500 group">
              <div className="relative h-64 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6">
                   <button className="bg-white/90 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center text-rose-500 shadow-xl">
                      <i className="fa-regular fa-heart text-xl"></i>
                   </button>
                </div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                   <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.2em]">{course.category}</span>
                   <span className="text-slate-300 font-black">|</span>
                   <span className="text-xs font-bold text-slate-400">{course.level}</span>
                </div>
                <h3 className="text-2xl font-black text-[#0a192f] mt-2 mb-6 leading-snug h-16 line-clamp-2">{course.title}</h3>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">কোর্স ফি</p>
                    <p className="text-3xl font-black text-blue-600">৳{course.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => handleEnroll(course)} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20">
                    ভর্তি হন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-xl font-bold">এই ক্যাটাগরিতে বর্তমানে কোনো কোর্স নেই।</p>
          </div>
        )}
      </div>
    );
  };

  const renderLogin = () => (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-6 bg-slate-50 reveal">
      <div className="bg-white w-full max-w-md p-12 rounded-[3rem] shadow-3xl border border-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] rounded-full"></div>
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-2xl shadow-blue-500/30">M</div>
            <h2 className="text-4xl font-black text-[#0a192f] mb-3">লগইন করুন</h2>
            <p className="text-slate-500 font-medium">ইংরেজি শিক্ষার নতুন দুয়ার খুলুন আজই।</p>
          </div>
          <form onSubmit={handleSupabaseLogin} className="space-y-6">
            {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-2">ইমেইল</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-sm font-black text-slate-700">পাসওয়ার্ড</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">পাসওয়ার্ড ভুলে গেছেন?</button>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium" 
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition shadow-2xl shadow-blue-500/30 active:scale-95 mt-4 disabled:opacity-50"
            >
              {loading ? 'প্রবেশ করা হচ্ছে...' : 'শিক্ষার্থী হিসেবে প্রবেশ'}
            </button>
          </form>
          <p className="text-center mt-12 text-slate-500 font-bold">
            নতুন ইউজার? <button onClick={() => setCurrentView('signup')} className="text-blue-600 font-black hover:underline">একাউন্ট তৈরি করুন</button>
          </p>
        </div>
      </div>
    </div>
  );

  // Remaining dashboard and player render functions... (Keeping them consistent with Bengali and BDT)
  
  const renderSignup = () => (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-6 bg-slate-50 reveal">
      <div className="bg-white w-full max-w-xl p-12 rounded-[3.5rem] shadow-3xl border border-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 blur-[60px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/5 blur-[50px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-2xl shadow-blue-500/20">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h2 className="text-4xl font-black text-[#0a192f] mb-3">নতুন একাউন্ট তৈরি করুন</h2>
            <p className="text-slate-500 font-medium">আজই আপনার শেখার যাত্রা শুরু করুন।</p>
          </div>

          <form onSubmit={handleSupabaseSignup}>
            {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100 mb-6">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-2">আপনার নাম</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="পুরো নাম লিখুন" 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-2">ইমেইল এড্রেস</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com" 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-2">ফোন নাম্বার</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXX-XXXXXX" 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-2">শ্রেণি</label>
                <select 
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium appearance-none"
                >
                  <option>ষষ্ঠ শ্রেণি</option>
                  <option>সপ্তম শ্রেণি</option>
                  <option>অষ্টম শ্রেণি</option>
                  <option>নবম শ্রেণি</option>
                  <option>দশম শ্রেণি (SSC)</option>
                  <option>একাদশ শ্রেণি</option>
                  <option>দ্বাদশ শ্রেণি (HSC)</option>
                  <option>অন্যান্য</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-2">পাসওয়ার্ড দিন</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="নিরাপদ পাসওয়ার্ড লিখুন" 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium" 
                />
              </div>
              
              <div className="flex items-start gap-3 px-2">
                <input type="checkbox" id="terms" required className="mt-1.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="terms" className="text-xs font-bold text-slate-500 leading-relaxed">
                  আমি আমাদের সকল <button type="button" className="text-blue-600 hover:underline">শর্তাবলী</button> এবং <button type="button" className="text-blue-600 hover:underline">প্রাইভেসি পলিসি</button> মেনে একাউন্ট তৈরি করছি।
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition shadow-2xl shadow-blue-500/30 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'অপেক্ষা করুন...' : 'একাউন্ট তৈরি করুন'}
              </button>
            </div>
          </form>

          <p className="text-center mt-10 text-slate-500 font-bold">
            ইতিমধ্যেই একাউন্ট আছে? <button onClick={() => setCurrentView('login')} className="text-blue-600 font-black hover:underline">লগইন করুন</button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 reveal">
      <div className="lg:grid lg:grid-cols-12 gap-8">
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-3 space-y-6 mb-8 lg:mb-0">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2.2rem] blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Masud" 
                className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white relative z-10" 
                alt="Avatar"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-4 border-white rounded-full z-20"></div>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="font-black text-xl text-[#0a192f] line-clamp-1">
                {session?.user?.user_metadata?.full_name || 'আব্দুর রহমান'}
              </h3>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {session?.user?.user_metadata?.student_class || 'স্কুল শিক্ষার্থী'}
              </p>
            </div>

            <div className="w-full mt-8 pt-6 border-t border-slate-50 flex justify-around">
               <div className="text-center">
                  <p className="text-lg font-black text-[#0a192f]">৳১২ক</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">ব্যয়</p>
               </div>
               <div className="w-px h-8 bg-slate-100"></div>
               <div className="text-center">
                  <p className="text-lg font-black text-emerald-600">৮৫%</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">স্কোর</p>
               </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-1">
            {[
              { id: 'dash', label: 'সারাংশ', icon: 'fa-house' },
              { id: 'my-courses', label: 'আমার কোর্সসমূহ', icon: 'fa-book-open' },
              { id: 'assignments', label: 'এসাইনমেন্ট', icon: 'fa-file-signature' },
              { id: 'quizzes', label: 'কুইজ টেস্ট', icon: 'fa-vial' },
              { id: 'achievements', label: 'অর্জিত সম্মান', icon: 'fa-award' },
              { id: 'support', label: 'সহায়তা কেন্দ্র', icon: 'fa-headset' },
            ].map(item => (
              <button 
                key={item.id} 
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all group ${
                  item.id === 'dash' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-lg group-hover:scale-110 transition-transform`}></i>
                <span className="text-[15px]">{item.label}</span>
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-rose-500 hover:bg-rose-50 transition-all group"
              >
                <i className="fa-solid fa-right-from-bracket text-lg group-hover:-translate-x-1 transition-transform"></i>
                <span className="text-[15px]">লগআউট</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-10">
          {/* Header & Greeting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#0a192f] flex items-center gap-3">
                স্বাগতম, {session?.user?.user_metadata?.full_name?.split(' ')[0] || 'শিক্ষার্থী'}! 👋
              </h2>
              <p className="text-slate-500 font-medium mt-1">আজ তোমার ইংরেজি শেখার লক্ষ্যগুলো পূরণ করো।</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="w-12 h-12 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors shadow-sm flex items-center justify-center relative">
                  <i className="fa-solid fa-bell"></i>
                  <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
               </button>
               <div className="h-10 w-px bg-slate-200"></div>
               <button onClick={() => setCurrentView('courses')} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2">
                 <i className="fa-solid fa-plus"></i> নতুন কোর্স
               </button>
            </div>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
               <i className="fa-solid fa-rocket absolute -right-4 -bottom-4 text-8xl text-white/10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700"></i>
               <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                  <div>
                    <p className="text-blue-100/70 text-[10px] font-black uppercase tracking-widest mb-1">মোট অগ্রগতি</p>
                    <h4 className="text-4xl font-black">৮২% সম্পন্ন</h4>
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                     <div className="flex-1 bg-white/10 h-3 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-[82%] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                     </div>
                     <span className="font-black text-sm">১৬/২০ লেসন</span>
                  </div>
               </div>
            </div>

            <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between group hover:border-emerald-200 transition-all">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-check-double"></i>
               </div>
               <div className="mt-6">
                  <h5 className="text-3xl font-black text-[#0a192f]">১২৪টি</h5>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">কমপ্লিট লেসন</p>
               </div>
            </div>

            <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between group hover:border-amber-200 transition-all">
               <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-crown"></i>
               </div>
               <div className="mt-6">
                  <h5 className="text-3xl font-black text-[#0a192f]">২,৫৫০</h5>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">অর্জিত পয়েন্ট</p>
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="flex justify-between items-center px-2">
                  <h3 className="text-2xl font-black text-[#0a192f]">চালিয়ে যান</h3>
                  <button className="text-blue-600 font-black text-sm hover:underline">সবগুলো দেখুন</button>
               </div>
               
               <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40 group hover:ring-2 hover:ring-blue-100 transition-all p-8 md:p-10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-56 h-36 relative rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                      <img 
                        src={COURSES[0].thumbnail} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt="Course"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                          <i className="fa-solid fa-play ml-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                           <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded-lg uppercase border border-blue-100">মডিউল ২</span>
                           <span className="text-slate-400 text-[10px] font-bold">১০টি লেসন বাকি • ১২ মিনিট</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#0a192f] mb-2 line-clamp-1">{COURSES[0].title}</h3>
                        <p className="text-slate-500 text-sm font-bold mb-6 flex items-center gap-2">
                           <i className="fa-solid fa-book-reader text-blue-500"></i>
                           ইংরেজিতে অভিবাদন জানানোর নিয়ম
                        </p>
                        <div className="flex items-center gap-6">
                           <div className="flex-1">
                              <div className="w-full bg-slate-50 h-2.5 rounded-full overflow-hidden mb-2">
                                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 h-full w-[45%] rounded-full"></div>
                              </div>
                              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-blue-600/70">
                                <span>৪৫% সম্পন্ন</span>
                              </div>
                           </div>
                           <button 
                            onClick={() => { setSelectedCourse(COURSES[0]); setCurrentView('course-player'); }}
                            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-xs hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95 transition-all whitespace-nowrap"
                           >
                            শিখা শুরু করো
                           </button>
                        </div>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {COURSES.slice(1, 3).map(course => (
                     <div key={course.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 flex items-center gap-5 hover:border-blue-100 transition-all group">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                           <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h5 className="font-black text-[#0a192f] text-sm line-clamp-1 group-hover:text-blue-600 transition-colors uppercase leading-tight">{course.title}</h5>
                           <p className="text-[10px] text-slate-400 font-bold mt-1">৮টি ভিডিও লেসন</p>
                           <div className="w-full bg-slate-50 h-1.5 rounded-full mt-3 overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full w-[40%]"></div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Notifications & Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-8">
                  <div className="flex justify-between items-center px-2">
                     <h3 className="text-2xl font-black text-[#0a192f]">সাম্প্রতিক অ্যাক্টিভিটি</h3>
                     <button className="text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest">সব মুছে ফেলুন</button>
                  </div>
                  
                  <div className="space-y-4">
                     {[
                        { title: 'Gerund vs Participle লেসন শেষ করেছ', time: '২ ঘণ্টা আগে', icon: 'fa-check', color: 'bg-emerald-50 text-emerald-600' },
                        { title: 'Tense কুইজে ৯/১০ স্কোর পেয়েছ', time: '৫ ঘণ্টা আগে', icon: 'fa-star', color: 'bg-amber-50 text-amber-500' },
                        { title: 'অষ্টম শ্রেণির নতুন ব্যাচে যুক্ত হয়েছ', time: '১ দিন আগে', icon: 'fa-user-plus', color: 'bg-blue-50 text-blue-600' },
                     ].map((activity, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-5 hover:border-blue-100 transition-all cursor-pointer group">
                           <div className={`${activity.color} w-12 h-12 rounded-2xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                              <i className={`fa-solid ${activity.icon}`}></i>
                           </div>
                           <div className="flex-1">
                              <h6 className="font-bold text-slate-800 text-sm">{activity.title}</h6>
                              <p className="text-[10px] text-slate-400 font-medium">{activity.time}</p>
                           </div>
                           <i className="fa-solid fa-chevron-right text-slate-200 group-hover:text-blue-600 transition-colors mr-2"></i>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-8">
                  <h3 className="text-2xl font-black text-[#0a192f]">নোটিফিকেশন</h3>
                  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                     <div className="flex gap-4 group cursor-pointer">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                        <div>
                           <h6 className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">আগামীকাল লাইভ ক্লাস!</h6>
                           <p className="text-xs text-slate-500 mt-1 leading-relaxed">রাত ৯টায় মাসুদ স্যার সরাসরি প্র্যাকটিস করাবেন। লিংক ড্যাশবোর্ডে পাওয়া যাবে।</p>
                        </div>
                     </div>
                     <div className="h-px bg-slate-50"></div>
                     <div className="flex gap-4 group cursor-pointer">
                        <div className="w-2 h-2 bg-slate-200 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                           <h6 className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">নতুন কোর্স রিলিজ</h6>
                           <p className="text-xs text-slate-500 mt-1 leading-relaxed">HSC Final Preparation কোর্সটি এখন লাইভ! এখনই এনরোল করো।</p>
                        </div>
                     </div>
                     <button className="w-full pt-4 text-blue-600 font-bold text-xs hover:underline">সবগুলো নোটিফিকেশন দেখুন</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-600 selection:text-white">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        userRole={userRole || ''} 
        onLogout={handleLogout}
        fullName={session?.user?.user_metadata?.full_name}
      />
      
      <main className="flex-grow">
        {currentView === 'home' && renderHome()}
        {currentView === 'about' && renderAbout()}
        {currentView === 'contact' && renderContact()}
        {currentView === 'courses' && renderCourses()}
        {currentView === 'free-courses' && renderFreeCourses()}
        {currentView === 'free-resources' && renderFreeResources()}
        {currentView === 'login' && renderLogin()}
        {currentView === 'signup' && renderSignup()}
        {currentView === 'student-dashboard' && renderStudentDashboard()}
        
        {/* Course Player Logic should follow similar premium UI patterns */}
        {currentView === 'course-player' && (
          <div className="bg-white min-h-screen reveal">
             {/* Simple high-end player mockup */}
             <div className="max-w-[1400px] mx-auto py-12 px-6">
                <button onClick={() => setCurrentView('student-dashboard')} className="mb-10 text-slate-500 font-bold hover:text-blue-600 flex items-center gap-2">
                   <i className="fa-solid fa-arrow-left"></i> ড্যাশবোর্ডে ফিরে যান
                </button>
                <div className="grid lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 space-y-8">
                      <div className="aspect-video bg-black rounded-[3rem] shadow-3xl overflow-hidden relative group">
                         <img src={selectedCourse?.thumbnail} className="w-full h-full object-cover opacity-50 blur-sm" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <button className="w-28 h-28 bg-blue-600 text-white rounded-[2.5rem] flex items-center justify-center text-4xl shadow-3xl hover:scale-110 transition-all active:scale-90 group-hover:rotate-6">
                               <i className="fa-solid fa-play ml-1"></i>
                            </button>
                         </div>
                      </div>
                      <div className="p-4">
                         <h1 className="text-4xl font-black text-[#0a192f] mb-4">{selectedCourse?.title}</h1>
                         <div className="flex items-center gap-8 border-b border-slate-100 pb-8 mb-8">
                            <button className="text-blue-600 font-black text-lg border-b-4 border-blue-600 pb-4">ওভারভিউ</button>
                            <button className="text-slate-400 font-black text-lg pb-4 hover:text-blue-600 transition-colors">লেকচার নোটস</button>
                            <button className="text-slate-400 font-black text-lg pb-4 hover:text-blue-600 transition-colors">প্রশ্ন ও উত্তর</button>
                         </div>
                         <p className="text-slate-600 text-xl leading-loose font-medium">{selectedCourse?.description}</p>
                      </div>
                   </div>
                   <div className="lg:col-span-4">
                      <div className="bg-slate-50 rounded-[3rem] border border-slate-100 p-8 space-y-6">
                         <h3 className="text-2xl font-black text-[#0a192f] mb-6">কোর্স কারিকুলাম</h3>
                         {COURSES[0].modules.map((m, idx) => (
                           <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">সেকশন {idx+1}</p>
                              <p className="font-black text-slate-800 text-lg">{m.title}</p>
                           </div>
                         ))}
                         <button className="w-full bg-[#0a192f] text-white py-5 rounded-2xl font-black text-lg mt-10 shadow-xl">সার্টিফিকেট আনলক করুন</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Fallback View */}
        {['teacher-dashboard'].includes(currentView) && (
          <div className="max-w-4xl mx-auto px-6 py-40 text-center reveal">
            <div className="w-32 h-32 bg-blue-100 text-blue-600 rounded-[3rem] flex items-center justify-center text-5xl mx-auto mb-10 shadow-xl">
               <i className="fa-solid fa-compass-drafting"></i>
            </div>
            <h1 className="text-6xl font-black text-[#0a192f] mb-8 leading-tight">এই সেকশনটি <br/> <span className="gradient-text">তৈরি করা হচ্ছে</span></h1>
            <p className="text-slate-500 text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
              খুব দ্রুত আমরা এই পাতাটি আপনার জন্য নিয়ে আসছি। আমাদের সাথেই থাকুন।
            </p>
            <button onClick={() => setCurrentView('home')} className="mt-16 bg-blue-600 text-white px-14 py-5 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-3xl shadow-blue-500/30 active:scale-95">
              হোম পেজে ফিরে যান
            </button>
          </div>
        )}
      </main>

      {/* Footer Section - Consistent High-end UI */}
      <footer className="bg-[#0a192f] text-slate-400 py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-8 col-span-1 md:col-span-1">
             <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl">
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3 className="text-white font-black text-3xl">Explore English</h3>
             </div>
             <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] -mt-6 ml-16">With Masud Sir</p>
             <p className="text-lg leading-loose font-medium text-slate-400">
               ইংরেজি শিক্ষার মাধ্যমে ক্যারিয়ার ও জীবনকে নতুনভাবে সাজাতে আমরা আছি আপনার পাশে। 
             </p>
             <div className="flex gap-5 pt-4">
                <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-xl"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-xl"><i className="fa-brands fa-youtube"></i></a>
             </div>
          </div>
          
          <div>
            <h4 className="text-white font-black text-xl mb-10 uppercase tracking-widest">কোর্সসমূহ</h4>
            <ul className="space-y-5 font-bold text-lg">
              <li><button onClick={() => setCurrentView('courses')} className="hover:text-blue-400 transition-all">পেইড কোর্সসমূহ</button></li>
              <li><button onClick={() => setCurrentView('free-courses')} className="hover:text-blue-400 transition-all">ফ্রি কোর্স</button></li>
              <li><button onClick={() => setCurrentView('courses')} className="hover:text-blue-400 transition-all">বেসিক গ্রামার</button></li>
              <li><button onClick={() => setCurrentView('about')} className="hover:text-blue-400 transition-all">আমাদের সম্পর্কে</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black text-xl mb-10 uppercase tracking-widest">কোম্পানি</h4>
            <ul className="space-y-5 font-bold text-lg">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-blue-400 transition-all">গাইডলাইন</button></li>
              <li><button onClick={() => setCurrentView('free-resources')} className="hover:text-blue-400 transition-all">ফ্রি রিসোর্স</button></li>
              <li><button className="hover:text-blue-400 transition-all">ক্যারিয়ার</button></li>
              <li><button className="hover:text-blue-400 transition-all">প্রাইভেসি পলিসি</button></li>
            </ul>
          </div>

          <div className="space-y-8">
             <h4 className="text-white font-black text-xl mb-10 uppercase tracking-widest">নিউজলেটার</h4>
             <p className="text-slate-400 font-medium">নতুন টিপস ও আপডেট পেতে জয়েন করুন।</p>
             <div className="flex gap-2">
                <input type="email" placeholder="ইমেইল এড্রেস" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-white font-medium" />
                <button className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all">
                   <i className="fa-solid fa-paper-plane"></i>
                </button>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-32 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
           <p>© ২০২৪ Explore English With Masud Sir। সকল অধিকার সংরক্ষিত।</p>
           <p className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span> 
              Premium Learning Platform
           </p>
        </div>
      </footer>

      <AIChatBot />
    </div>
  );
};

export default App;
