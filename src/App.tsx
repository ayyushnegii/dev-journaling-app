import React, { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Calendar from './pages/Calendar'
import Mindmap from './pages/Mindmap'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { AuthProvider, useAuth } from './components/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ThemeProvider, useTheme } from './components/ThemeContext'
import { supabase } from './lib/supabase'

function Navbar() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (!user) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter hover:opacity-80 transition-opacity">
          DevJournal
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/calendar">History</NavLink>
          <NavLink to="/mindmap">Network</NavLink>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all active:scale-90 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            )}
          </button>

          <button 
            onClick={handleSignOut}
            className="ml-4 text-sm font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:opacity-90 transition-all active:scale-95 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
           <button onClick={toggleTheme} className="p-2 text-slate-500 text-xs">
             {theme === 'light' ? '🌙' : '☀️'}
           </button>
           <button className="text-slate-900 dark:text-white">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
           </button>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }: { to: string, children: ReactNode }) {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
        isActive 
          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
          : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
      }`}
    >
      {children}
    </Link>
  )
}

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
)

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
          <Route path="/calendar" element={<PageTransition><Calendar /></PageTransition>} />
          <Route path="/mindmap" element={<PageTransition><Mindmap /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-950 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
              <AppRoutes />
            </main>
            
            <footer className="py-12 px-6 text-center border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm font-medium text-slate-400">
                  &copy; {new Date().getFullYear()} Dev Journaling App
                </div>
                <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy</span>
                  <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms</span>
                  <span className="hover:text-indigo-600 cursor-pointer transition-colors">GitHub</span>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
