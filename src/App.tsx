import type { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Calendar from './pages/Calendar'
import Mindmap from './pages/Mindmap'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { AuthProvider, useAuth } from './components/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ThemeProvider } from './components/ThemeContext'
import { supabase } from './lib/supabase'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  Journal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Mindmap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <circle cx="12" cy="12" r="3"/>
      <circle cx="3" cy="6" r="2"/>
      <circle cx="21" cy="6" r="2"/>
      <circle cx="3" cy="18" r="2"/>
      <circle cx="21" cy="18" r="2"/>
      <line x1="5" y1="6" x2="9.5" y2="10.5"/>
      <line x1="19" y1="6" x2="14.5" y2="10.5"/>
      <line x1="5" y1="18" x2="9.5" y2="13.5"/>
      <line x1="19" y1="18" x2="14.5" y2="13.5"/>
    </svg>
  ),
  Stats: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Profile: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" width="24" height="24">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (!user) return null

  const isActive = (path: string) => location.pathname === path

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    textDecoration: 'none',
    color: active ? 'var(--accent)' : 'var(--muted)',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.04em',
    transition: 'color 0.2s',
    flex: 1,
    padding: '4px 0',
  })

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out failed:', error.message)
    }
    navigate('/login')
  }

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(22,22,26,0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '10px 8px',
      paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
      zIndex: 100,
    }}>
      {/* Journal */}
      <Link to="/" style={navItemStyle(isActive('/'))}>
        <Icons.Journal />
        Journal
      </Link>

      {/* Mindmap */}
      <Link to="/mindmap" style={navItemStyle(isActive('/mindmap'))}>
        <Icons.Mindmap />
        Mindmap
      </Link>

      {/* FAB */}
      <button
        onClick={() => navigate('/journal')}
        aria-label="New Entry"
        style={{
          width: 52, height: 52,
          background: 'var(--accent2)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer', color: 'white',
          marginTop: -20,
          boxShadow: '0 0 24px rgba(59,130,246,0.5)',
          flexShrink: 0,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <Icons.Plus />
      </button>

      {/* Stats / Calendar */}
      <Link to="/calendar" style={navItemStyle(isActive('/calendar'))}>
        <Icons.Stats />
        Calendar
      </Link>
      {/* Profile / Sign Out */}
      <button onClick={handleSignOut} style={{
        ...navItemStyle(false),
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        flex: 1,
        padding: '4px 0',
      } as React.CSSProperties}>
        <Icons.Profile />
        Sign Out
      </button>
    </nav>
  )
}

// ─── Page Transition ──────────────────────────────────────────────────────────
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
)

// ─── App Routes ───────────────────────────────────────────────────────────────
function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login"  element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/"         element={<PageTransition><Home /></PageTransition>} />
          <Route path="/journal"  element={<PageTransition><Journal /></PageTransition>} />
          <Route path="/calendar" element={<PageTransition><Calendar /></PageTransition>} />
          <Route path="/mindmap"  element={<PageTransition><Mindmap /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)' }}>
            <AppRoutes />
            <BottomNav />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
