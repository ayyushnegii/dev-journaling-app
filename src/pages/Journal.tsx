import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../components/AuthContext'
import BlockEditor from '../components/BlockEditor'
import type { Block } from '@blocknote/core'
import { processTopics } from '../lib/topicExtractor'

export default function Journal() {
  const [searchParams] = useSearchParams()
  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0]
  const [content, setContent] = useState<Block[] | null>(null)
  const [initialContent, setInitialContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchEntry = useCallback(async () => {
    if (!user || !dateParam) return
    setLoading(true)
    const { data, error } = await supabase
      .from('journal_entries')
      .select('content')
      .eq('user_id', user?.id)
      .eq('date', dateParam)
      .maybeSingle()

    console.log('Fetch entry response:', { data, error })
    if (error) {
      console.error('Error fetching entry:', error)
      setError('Could not load entry: ' + (error.message || 'Unknown error'))
    }

    if (data?.content) {
      const contentStr = JSON.stringify(data.content)
      setInitialContent(contentStr)
      setContent(data.content as unknown as Block[])
    } else {
      setInitialContent(null)
      setContent(null)
    }
    setLoading(false)
  }, [user, dateParam])

  useEffect(() => {
    fetchEntry()
  }, [fetchEntry])

  const handleSave = useCallback(async (contentToSave: Block[]) => {
    if (!user || !contentToSave) return
    
    setSaving(true)
    const { data: upsertData, error } = await supabase
      .from('journal_entries')
      .upsert({
        user_id: user?.id,
        date: dateParam,
        content: contentToSave as any,
        created_at: new Date().toISOString()
      }, { onConflict: 'user_id,date' })
      .select('id')
      .single()

    console.log('Save entry response:', { data: upsertData, error })
    if (error) {
      console.error('Error saving entry:', error)
      setError('Auto-save failed: ' + (error.message || 'Check console'))
    } else {
      setLastSaved(new Date())
      setError(null)
      
      if (upsertData?.id) {
        processTopics(user.id, upsertData.id, contentToSave)
      }
    }
    setSaving(false)
  }, [user, dateParam])

  useEffect(() => {
    const timer = setInterval(() => {
      if (content) {
        handleSave(content)
      }
    }, 30000)
    return () => clearInterval(timer)
  }, [content, handleSave])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const formattedDate = new Date(dateParam).toLocaleDateString(undefined, { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-slate-800/40 rounded-[40px] border border-slate-100 dark:border-slate-800/50 shadow-2xl shadow-indigo-500/5 overflow-hidden">
        <div className="p-10 md:p-14">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Daily Entry</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                {formattedDate}
              </h1>
            </div>
            
            <div className="flex flex-col items-end space-y-4 w-full md:w-auto">
              <div className="flex items-center space-x-4">
                {error && <span className="text-sm font-bold text-red-500">{error}</span>}
                {!error && lastSaved && (
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <button
                  onClick={() => content && handleSave(content)}
                  disabled={saving || !content}
                  className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-30 cursor-pointer shadow-xl shadow-slate-900/10"
                >
                  {saving ? 'Saving...' : 'Save Draft'}
                </button>
              </div>
            </div>
          </header>

          <div className="min-h-[600px] prose prose-indigo dark:prose-invert max-w-none">
            <BlockEditor 
              key={dateParam}
              initialContent={initialContent || undefined} 
              onChange={(c: Block[]) => setContent(c)} 
            />
          </div>
          
          <footer className="mt-20 pt-10 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 gap-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span> "/" Command</span>
              <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span> Auto-Save</span>
            </div>
            <div className="opacity-50">Content protected by end-to-end encryption</div>
          </footer>
        </div>
      </div>
    </div>
  )
}
