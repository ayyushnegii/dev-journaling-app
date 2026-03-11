import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Brain,
  Crosshair,
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
      <header className="flex-shrink-0 flex items-center px-4 pt-6 pb-4 lg:pt-10 lg:pb-8 justify-between sticky top-0 z-10 bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">System Mindmap</h1>
          <p className="text-sm text-muted-foreground italic">Visualizing cognitive clusters</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="size-5" />
          </Button>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Neural Link Active</span>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
        <div className="lg:col-span-12 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-muted/30 p-1 border-white/5">
              <Button variant="ghost" className="h-full grow rounded-xl px-4 text-muted-foreground text-xs font-bold hover:text-foreground">Live</Button>
              <Button variant="secondary" className="h-full grow rounded-xl px-4 text-primary shadow-lg text-xs font-bold bg-background">Historical</Button>
              <Button variant="ghost" className="h-full grow rounded-xl px-4 text-muted-foreground text-xs font-bold hover:text-foreground">Network</Button>
            </Card>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button className="h-12 shrink-0 gap-x-2 rounded-2xl bg-primary/20 border border-primary/40 text-primary px-6 shadow-lg shadow-primary/10" size="sm">
                <Terminal className="size-4" />
                <span className="font-bold text-xs uppercase tracking-tight">Dev Log</span>
              </Button>
              <Button variant="outline" className="h-12 shrink-0 gap-x-2 rounded-2xl glass-card text-muted-foreground px-6 border-white/5" size="sm">
                <Brain className="size-4" />
                <span className="font-bold text-xs uppercase tracking-tight">Core</span>
              </Button>
              <Button variant="outline" className="h-12 shrink-0 gap-x-2 rounded-2xl glass-card text-muted-foreground px-6 border-white/5" size="sm">
                <Zap className="size-4" />
                <span className="font-bold text-xs uppercase tracking-tight">Ideas</span>
              </Button>
            </div>
          </div>
          
          <main className="relative flex-1 min-h-[450px] lg:min-h-[550px] overflow-hidden mindmap-area rounded-[2.5rem] border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 5px currentColor)'}}
            >
              <path d="M 40% 50% Q 30% 40%, 20% 30%" fill="none" className="text-neon-emerald opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M 60% 50% Q 70% 35%, 80% 25%" fill="none" className="text-neon-sapphire opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M 50% 60% Q 50% 80%, 40% 85%" fill="none" className="text-neon-ruby opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M 60% 55% Q 75% 75%, 85% 80%" fill="none" className="text-neon-gold opacity-60" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
            </svg>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="size-32 lg:size-40 rounded-full bg-background border-2 border-primary neon-glow-primary flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl">
                <div className="flex flex-col items-center">
                  <GitFork className="mb-2 text-primary size-6 lg:size-8" />
                  <span className="font-black text-sm lg:text-lg tracking-[0.2em] uppercase">System</span>
                </div>
              </div>
            </div>

            <div className="absolute top-[25%] left-[20%] -translate-x-1/2 -translate-y-1/2">
              <div className="size-24 lg:size-28 rounded-full glass-card border-neon-emerald/30 neon-glow-accent flex items-center justify-center text-center p-2 hover:scale-110 transition-transform cursor-pointer">
                <span className="text-neon-emerald font-black text-[10px] lg:text-xs uppercase tracking-widest">Architecture</span>
              </div>
            </div>

            <div className="absolute top-[20%] left-[85%] -translate-x-1/2 -translate-y-1/2">
              <div className="size-20 lg:size-24 rounded-full glass-card border-primary/30 neon-glow-primary flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <span className="text-primary font-black text-[10px] uppercase tracking-widest">API v2</span>
              </div>
            </div>

            <div className="absolute top-[85%] left-[35%] -translate-x-1/2 -translate-y-1/2">
              <div className="size-28 lg:size-32 rounded-full glass-card border-neon-ruby/30 shadow-[0_0_30px_theme(colors.neon-ruby/0.2)] flex items-center justify-center text-center px-4 hover:scale-110 transition-transform cursor-pointer">
                <span className="text-neon-ruby font-black text-[10px] lg:text-xs uppercase tracking-widest leading-tight">Security Protocol</span>
              </div>
            </div>

            <div className="absolute top-[80%] left-[75%] -translate-x-1/2 -translate-y-1/2">
              <div className="size-16 lg:size-20 rounded-full glass-card border-neon-gold/30 flex items-center justify-center shadow-[0_0_20px_theme(colors.neon-gold/0.2)] hover:scale-110 transition-transform cursor-pointer">
                <span className="text-neon-gold font-black text-[10px] uppercase tracking-widest">Assets</span>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 flex flex-col gap-4">
              <Button variant="outline" size="icon" className="size-12 rounded-2xl glass-card hover:bg-white/10 border-white/5 transition-all"><ZoomIn/></Button>
              <Button variant="outline" size="icon" className="size-12 rounded-2xl glass-card hover:bg-white/10 border-white/5 transition-all"><Crosshair/></Button>
              <Button size="icon" className="size-16 rounded-full bg-primary neon-glow-primary border-4 border-background mt-2 hover:scale-110 transition-transform shadow-2xl"><Plus className="size-10" /></Button>
            </div>
          </main>

          <section className="pb-8">
            <Card className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Data Intensity</h3>
                  <p className="text-2xl font-bold tracking-tight">System Resonance</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">Global Sync</span>
                  <span className="text-[10px] text-muted-foreground mt-2 font-medium">Updated 2m ago</span>
                </div>
              </div>
              <div className="flex items-end justify-between h-32 gap-6 px-4">
                {[
                  { label: 'Arch', height: '85%', color: 'bg-neon-emerald/60 shadow-[0_0_20px_theme(colors.neon-emerald/0.3)]' },
                  { label: 'Sec', height: '45%', color: 'bg-neon-ruby/60 shadow-[0_0_20px_theme(colors.neon-ruby/0.3)]' },
                  { label: 'API', height: '60%', color: 'bg-primary/60 shadow-[0_0_20px_theme(colors.primary/0.3)]' },
                  { label: 'Nodes', height: '75%', color: 'bg-neon-gold/60 shadow-[0_0_20px_theme(colors.neon-gold/0.3)]' },
                  { label: 'Null', height: '30%', color: 'bg-muted/20' },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-4 group cursor-help">
                    <div className={cn("w-full rounded-t-2xl transition-all duration-500 group-hover:opacity-100 opacity-80", bar.color)} style={{ height: bar.height }}></div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{bar.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
