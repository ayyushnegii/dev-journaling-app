import React, { useState, useEffect, useCallback } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
// import './CalendarStyles.css'
import { supabase } from '../lib/supabase'
import { useAuth } from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface EntryStatus {
  [key: string]: 'completed' | 'partial' | 'none'
}

export default function CalendarPage() {
  const [value, onChange] = useState<Value>(new Date())
  const [entries, setEntries] = useState<EntryStatus>({})
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const { user } = useAuth()
  const navigate = useNavigate()

  const fetchEntries = useCallback(async () => {
    if (!user) return
    setLoading(true)
    console.log('Fetching entries for user:', user.id)
    const { data, error } = await supabase
      .from('journal_entries')
      .select('date, content')
      .eq('user_id', user.id)

    console.log('Calendar fetch response:', { data, error })
    if (error) {
      console.error('Error fetching calendar entries:', error)
    } else {
      const statusMap: EntryStatus = {}
      data?.forEach((entry: any) => {
        const contentLength = JSON.stringify(entry.content).length
        statusMap[entry.date] = contentLength > 500 ? 'completed' : 'partial'
      })
      console.log('Generated status map:', statusMap)
      setEntries(statusMap)
      calculateStreak(data || [])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const calculateStreak = (data: any[]) => {
    if (!data.length) return
    const dates = data.map(e => e.date).sort().reverse()
    let currentStreak = 0
    let lastDate = new Date()
    lastDate.setHours(0, 0, 0, 0)

    for (let i = 0; i < dates.length; i++) {
      const entryDate = new Date(dates[i])
      entryDate.setHours(0,0,0,0)
      
      const diffTime = Math.abs(lastDate.getTime() - entryDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays <= 1) {
        currentStreak++
        lastDate = entryDate
      } else {
        break
      }
    }
    setStreak(currentStreak)
  }

  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0]
      const status = entries[dateStr]
      if (status === 'completed') {
        return <div className="dot dot-completed"></div>
      } else if (status === 'partial') {
        return <div className="dot dot-partial"></div>
      }
    }
    return null
  }

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    navigate(`/journal?date=${dateStr}`)
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Journey History</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Revisit your past self, one day at a time.</p>
        </div>
        
        <div className="flex items-center space-x-6 bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-indigo-500/5 transition-transform hover:scale-105">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-500 flex items-center justify-center text-2xl">
            🔥
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 dark:text-white leading-none">{streak}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Day Streak</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/50 p-10 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none min-h-[500px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 rounded-[48px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        )}
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDateClick}
          tileContent={tileContent}
          className="mx-auto"
        />
      </div>
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <StatusKey label="Completed" color="bg-emerald-500" />
        <StatusKey label="Partial" color="bg-amber-400" />
        <StatusKey label="Empty" color="bg-slate-100 dark:bg-slate-800" />
        <StatusKey label="Today" color="bg-indigo-600" />
      </div>
    </div>
  )
}

function StatusKey({ label, color }: { label: string, color: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
  )
}
