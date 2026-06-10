
import React, { useState, useEffect } from 'react';
import { PageRoute, ServiceRequest, AuthUser, WasteResult } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AIIdentifier from './pages/AIIdentifier';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LearnSegregation from './pages/LearnSegregation';
import FindDisposal from './pages/FindDisposal';
import Contact from './pages/Contact';
import ServiceRequestPage from './pages/ServiceRequest';
import StatusTracking from './pages/StatusTracking';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(PageRoute.Home);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  
  // Persistence mock
  useEffect(() => {
    const savedUser = localStorage.getItem('sortify_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedRequests = localStorage.getItem('sortify_requests');
    if (savedRequests) setServiceRequests(JSON.parse(savedRequests));
  }, []);

  /* Navigation handler */
  const navigate = (page: PageRoute) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem('sortify_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sortify_user');
    navigate(PageRoute.Home);
  };

  const handleAddRequest = (req: ServiceRequest) => {
    const newRequests = [req, ...serviceRequests];
    setServiceRequests(newRequests);
    localStorage.setItem('sortify_requests', JSON.stringify(newRequests));
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (Object.values(PageRoute).includes(hash as PageRoute)) {
        setCurrentPage(hash as PageRoute);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case PageRoute.Home:
        return <Home onNavigate={navigate} />;
      case PageRoute.AI:
        return <AIIdentifier user={user} />;
      case PageRoute.Login:
        return <Login onNavigate={navigate} onLogin={handleLogin} />;
      case PageRoute.Signup:
        return <Signup onNavigate={navigate} onLogin={handleLogin} />;
      case PageRoute.Learn:
        return <LearnSegregation />;
      case PageRoute.Find:
        return <FindDisposal />;
      case PageRoute.Contact:
        return <Contact />;
      case PageRoute.Request:
        return <ServiceRequestPage onNavigate={navigate} onSubmit={handleAddRequest} />;
      case PageRoute.Tracking:
        return <StatusTracking requests={serviceRequests} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentPage={currentPage} onNavigate={navigate} user={user} onLogout={handleLogout} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span className="text-white font-black text-2xl tracking-tight">Sortify</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium">
            <button onClick={() => navigate(PageRoute.Home)} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => navigate(PageRoute.AI)} className="hover:text-white transition-colors">AI Identifier</button>
            <button onClick={() => navigate(PageRoute.Login)} className="hover:text-white transition-colors">Login</button>
            <button onClick={() => navigate(PageRoute.Signup)} className="hover:text-white transition-colors">Sign Up</button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Sortify Technologies Inc. Simplified waste intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
