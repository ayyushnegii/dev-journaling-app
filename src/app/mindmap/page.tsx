import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Brain,
  Center,
  GitFork,
  Plus,
  Search,
  Terminal,
  Zap,
  ZoomIn,
} from 'lucide-react';

export default function MindmapPage() {
  return (
    <AppShell activeTab="mindmap">
      <header className="flex-shrink-0 flex items-center p-4 justify-between">
        <h2 className="text-lg font-bold leading-tight flex-1 text-center tracking-tight">
          System Mindmap
        </h2>
      </header>
      
      <div className="flex-shrink-0 px-4 pb-2">
        <Card className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-secondary p-1">
          <Button variant="ghost" className="h-full grow rounded-xl px-2 text-muted-foreground text-sm font-bold">Live</Button>
          <Button variant="secondary" className="h-full grow rounded-xl px-2 text-primary shadow-sm text-sm font-bold">Historical</Button>
          <Button variant="ghost" className="h-full grow rounded-xl px-2 text-muted-foreground text-sm font-bold">Network</Button>
        </Card>
      </div>

      <div className="flex-shrink-0 flex gap-3 px-4 py-2 overflow-x-auto">
        <Button className="h-10 shrink-0 gap-x-2 rounded-full bg-primary/20 border border-primary/50 text-primary px-5 shadow-[0_0_15px_rgba(59,130,246,0.2)]" size="sm">
          <Terminal className="size-4" />
          <p className="font-bold">Dev Log</p>
        </Button>
        <Button variant="outline" className="h-10 shrink-0 gap-x-2 rounded-full glass-card text-muted-foreground px-5" size="sm">
          <Brain className="size-4" />
          <p className="font-bold">Core</p>
        </Button>
        <Button variant="outline" className="h-10 shrink-0 gap-x-2 rounded-full glass-card text-muted-foreground px-5" size="sm">
          <Zap className="size-4" />
          <p className="font-bold">Ideas</p>
        </Button>
      </div>
      
      <main className="relative flex-1 overflow-hidden mindmap-area mx-4 mt-2 mb-2 rounded-3xl border bg-black shadow-inner">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border) / 0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 3px currentColor)'}}
        >
          <path d="M 195 200 Q 150 160, 110 120" fill="none" className="text-neon-emerald opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M 235 200 Q 300 140, 310 110" fill="none" className="text-neon-sapphire opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M 215 245 Q 215 310, 180 340" fill="none" className="text-neon-ruby opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          <path d="M 235 240 Q 280 280, 300 300" fill="none" className="text-neon-gold opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="size-28 rounded-full bg-background border-2 border-primary neon-glow-primary flex items-center justify-center transition-transform active:scale-95 group">
            <div className="flex flex-col items-center">
              <GitFork className="mb-1 text-primary" />
              <span className="font-bold text-lg tracking-widest uppercase">System</span>
            </div>
          </div>
        </div>

        <div className="absolute top-[22%] left-[25%] -translate-x-1/2 -translate-y-1/2">
          <div className="size-20 rounded-full glass-card border-neon-emerald/50 neon-glow-accent flex items-center justify-center text-center">
            <span className="text-neon-emerald font-bold text-xs uppercase tracking-tighter">Architecture</span>
          </div>
        </div>

        <div className="absolute top-[20%] left-[75%] -translate-x-1/2 -translate-y-1/2">
          <div className="size-16 rounded-full glass-card border-primary/50 neon-glow-primary flex items-center justify-center">
            <span className="text-primary font-bold text-[10px] uppercase">API v2</span>
          </div>
        </div>

        <div className="absolute top-[78%] left-[40%] -translate-x-1/2 -translate-y-1/2">
          <div className="size-24 rounded-full glass-card border-neon-ruby/50 shadow-[0_0_20px_theme(colors.neon-ruby/0.4)] flex items-center justify-center text-center px-2">
            <span className="text-neon-ruby font-bold text-xs uppercase">Security Protocol</span>
          </div>
        </div>

        <div className="absolute top-[72%] left-[72%] -translate-x-1/2 -translate-y-1/2">
          <div className="size-14 rounded-full glass-card border-neon-gold/50 flex items-center justify-center shadow-[0_0_15px_theme(colors.neon-gold/0.3)]">
            <span className="text-neon-gold font-bold text-[10px] uppercase">Assets</span>
          </div>
        </div>
        
        <div className="absolute bottom-6 right-6 flex flex-col gap-3">
          <Button variant="outline" size="icon" className="size-11 rounded-2xl glass-card active:bg-white/20"><ZoomIn/></Button>
          <Button variant="outline" size="icon" className="size-11 rounded-2xl glass-card active:bg-white/20"><Center/></Button>
          <Button size="icon" className="size-14 rounded-full bg-primary neon-glow-primary border-2 border-background mt-2 active:scale-95 transition-transform"><Plus className="size-8" /></Button>
        </div>
      </main>

      <section className="flex-shrink-0 px-4 py-4">
        <Card className="glass-card rounded-3xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm uppercase tracking-widest">Data Intensity</h3>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Sync</span>
          </div>
          <div className="flex items-end justify-between h-24 gap-4 px-2">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-neon-emerald/60 rounded-t-lg shadow-[0_0_10px_theme(colors.neon-emerald/0.3)]" style={{ height: '85%' }}></div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Arch</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-neon-ruby/60 rounded-t-lg shadow-[0_0_10px_theme(colors.neon-ruby/0.3)]" style={{ height: '45%' }}></div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Sec</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-primary/60 rounded-t-lg shadow-[0_0_10px_theme(colors.primary/0.3)]" style={{ height: '60%' }}></div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">API</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-muted/20 rounded-t-lg" style={{ height: '30%' }}></div>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Null</span>
            </div>
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
