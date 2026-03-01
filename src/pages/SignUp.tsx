import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else navigate('/')
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-800/40 p-10 md:p-14 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-500/10"
      >
        <div className="mb-12 text-center">
          <Link to="/" className="text-3xl font-black text-indigo-600 tracking-tighter mb-6 block">DevJournal</Link>
          <h1 className="text-4xl font-black tracking-tighter mb-3 leading-none">Join the journey</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Create your minimal dev diary today</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/50 border-none rounded-[24px] px-6 py-4 outline-none ring-2 ring-transparent focus:ring-indigo-600 transition-all font-medium"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/50 border-none rounded-[24px] px-6 py-4 outline-none ring-2 ring-transparent focus:ring-indigo-600 transition-all font-medium"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center uppercase tracking-widest">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-[24px] py-4 font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all text-lg tracking-tight"
          >
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-10 text-center text-sm">
          <span className="text-slate-400 font-medium">Have an account? </span>
          <Link to="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">Log in here</Link>
        </div>
      </motion.div>
    </div>
  )
}
