import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react'
import type { Node, Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { supabase } from '../lib/supabase'
import { useAuth } from '../components/AuthContext'
import { useTheme } from '../components/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function Mindmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTopic, setSelectedTopic] = useState<{ name: string; entries: any[] } | null>(null)
  
  const { user } = useAuth()
  const { theme } = useTheme()

  const fetchGraphData = useCallback(async () => {
    if (!user) return
    setLoading(true)

    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('id, name, frequency_score')
      .order('frequency_score', { ascending: false })
      .limit(20)

    const { data: connectionsData, error: connectionsError } = await supabase
      .from('connections')
      .select('topic_1, topic_2, weight')

    console.log('Mindmap Graph Fetch:', { topicsData, connectionsData, topicsError, connectionsError })

    if (!topicsData) return

    const newNodes: Node[] = topicsData.map((topic, index) => {
      const angle = (index / topicsData.length) * 2 * Math.PI
      const radius = 280
      const x = Math.cos(angle) * radius + 400
      const y = Math.sin(angle) * radius + 300
      const size = Math.min(Math.max(topic.frequency_score * 5 + 60, 80), 160)

      return {
        id: topic.id,
        data: { label: topic.name },
        position: { x, y },
        style: {
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme === 'dark' ? '#1e293b' : '#ffffff',
          color: theme === 'dark' ? '#f8fafc' : '#0f172a',
          border: '4px solid #6366f1',
          fontSize: size / 8,
          fontFamily: 'Inter, sans-serif',
          fontWeight: '900',
          letterSpacing: '-0.025em',
          textTransform: 'uppercase',
          boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.2)',
          cursor: 'pointer',
        },
      }
    })

    const newEdges: Edge[] = (connectionsData || [])
      .filter(conn => 
        topicsData.find(t => t.id === conn.topic_1) && 
        topicsData.find(t => t.id === conn.topic_2)
      )
      .map(conn => ({
        id: `${conn.topic_1}-${conn.topic_2}`,
        source: conn.topic_1,
        target: conn.topic_2,
        style: { strokeWidth: Math.min(conn.weight * 3, 12), stroke: '#6366f1', opacity: 0.2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
      }))

    setNodes(newNodes)
    setEdges(newEdges)
    setLoading(false)
  }, [user, theme, setNodes, setEdges])

  useEffect(() => {
    fetchGraphData()
  }, [fetchGraphData])

  const onNodeClick = async (_: any, node: Node) => {
    const topicName = node.data.label as string
    const { data, error } = await supabase
      .from('journal_entries')
      .select('date, content, topics')
      .eq('user_id', user?.id)
      .contains('topics', [topicName])
      .gte('date', startDate)
      .lte('date', endDate)

    if (error) return
    setSelectedTopic({ name: topicName, entries: data || [] })
  }

  const flowStyle = useMemo(() => ({
    width: '100%',
    height: '650px',
    background: 'transparent',
  }), [])

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Knowledge Graph</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">Mindmap</h1>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center space-x-6">
          <DateInput label="From" value={startDate} onChange={setStartDate} />
          <div className="h-10 w-px bg-slate-100 dark:bg-slate-700"></div>
          <DateInput label="To" value={endDate} onChange={setEndDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 relative bg-[var(--background)] dark:bg-slate-900/40 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-500/5 overflow-hidden transition-colors">
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          )}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            style={flowStyle}
            fitView
            colorMode={theme}
          >
            <Background color={theme === 'dark' ? '#334155' : '#cbd5e1'} gap={20} size={1} />
            <Controls className="!bg-white dark:!bg-slate-800 !border-none !shadow-xl !rounded-xl overflow-hidden" />
          </ReactFlow>
        </div>

        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div
                key={selectedTopic.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[var(--background)] dark:bg-slate-900/40 rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl h-full min-h-[500px] transition-colors"
              >
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">#{selectedTopic.name}</h2>
                  <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {selectedTopic.entries.length} Entries
                  </span>
                </div>
                
                <div className="space-y-6">
                  {selectedTopic.entries.length > 0 ? (
                    selectedTopic.entries.map((entry, idx) => (
                      <div key={idx} className="group p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer">
                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{entry.date}</div>
                        <div className="text-slate-700 dark:text-slate-300 line-clamp-2 text-sm font-medium leading-relaxed">
                          Ref: {entry.topics.join(' • ')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-slate-400 font-bold italic">No records in this timeframe.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-slate-50/50 dark:bg-slate-900/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] flex flex-col items-center justify-center text-center p-10 text-slate-400">
                <div className="text-4xl mb-6 grayscale opacity-30">🕸️</div>
                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">Select a knowledge node<br/>to explore connections</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function DateInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col">
      <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1 ml-1">{label}</label>
      <input 
        type="date" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-none text-sm font-black text-slate-700 dark:text-slate-100 outline-none cursor-pointer"
      />
    </div>
  )
}
