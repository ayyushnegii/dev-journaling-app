import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ArrowRight,
  Brain,
  Database,
  Heart,
  Terminal,
  Zap,
  Plus,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const userAvatar = PlaceHolderImages.find(
    (img) => img.id === 'userAvatar'
  );
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (today.getDay() - i));
    return date;
  });

  const quickLogs = [
    {
      title: 'Bug Squashing 🐛',
      description: 'Document that pesky race condition in the auth flow.',
      category: 'Dev',
      tag: 'Sprint',
      color: 'primary',
      nodes: 12,
    },
    {
      title: 'Mental State 🧠',
      description: 'How is your cognitive load today after the sprint?',
      category: 'Personal',
      tag: 'Health',
      color: 'accent',
      nodes: 5,
    },
    {
      title: 'Refactor Notes ⚡️',
      description: 'Keep track of tech debt items in the UI lib.',
      category: 'Code',
      tag: 'Legacy',
      color: 'muted',
      nodes: 8,
    },
  ];

  const activeClusters = [
    { icon: <Zap className="size-4 text-primary" />, label: 'TypeScript', count: 42 },
    { icon: <Brain className="size-4 text-accent" />, label: 'UI/UX', count: 28 },
    { icon: <Database className="size-4 text-muted-foreground" />, label: 'Backend', count: 19 },
    { icon: <Heart className="size-4 text-red-500" />, label: 'Fitness', count: 12 },
  ];

  return (
    <AppShell activeTab="dashboard">
      <header className="flex items-center pt-6 pb-8 lg:pt-4 lg:pb-12 justify-between sticky top-0 z-10 bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none transition-all duration-300">
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/40 leading-none">
            Deep Pulse
          </h1>
          <p className="text-sm font-bold text-primary italic mt-1 uppercase tracking-widest opacity-80">
            System status: <span className="text-primary italic animate-pulse">Optimum Flow</span>
          </p>
        </div>
        
        {/* Desktop Specific Stats Header */}
        <div className="hidden xl:flex items-center gap-8 mr-4">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Focus Score</span>
              <span className="text-2xl font-black text-primary">94%</span>
           </div>
           <div className="w-px h-8 bg-border/50" />
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Uptime</span>
              <span className="text-2xl font-black text-accent">14h</span>
           </div>
        </div>
      </header>

      <div className="space-y-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 flex flex-col space-y-10">
            <section>
              <div className="flex justify-between items-end mb-6 px-1">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Active Clusters</h3>
                  <p className="text-2xl font-bold tracking-tight">Recent Logs</p>
                </div>
                <Button variant="link" className="text-primary h-auto p-0 font-black uppercase text-[10px] tracking-widest hover:no-underline hover:opacity-70 transition-opacity">
                  System Index →
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickLogs.map((log, i) => (
                  <Card
                    key={i}
                    className={cn(
                      "group glass-card rounded-[2rem] p-6 flex flex-col gap-4 border border-white/5 transition-all duration-500",
                      "desktop-hover relative overflow-hidden",
                      log.color === 'primary' ? 'hover:border-primary/40' : log.color === 'accent' ? 'hover:border-accent/40' : 'hover:border-white/20'
                    )}
                  >
                    {/* Background Accent Gradient */}
                    <div className={cn(
                      "absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                      log.color === 'primary' ? 'bg-primary' : log.color === 'accent' ? 'bg-accent' : 'bg-muted-foreground'
                    )} />
                    
                    <div className="flex justify-between items-start">
                      <div className={cn(
                        "size-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                        log.color === 'primary' ? 'bg-primary/20 border-primary/30 text-primary' : log.color === 'accent' ? 'bg-accent/20 border-accent/30 text-accent' : 'bg-muted/20 border-white/10 text-muted-foreground'
                      )}>
                        <Brain className="size-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{log.nodes} Nodes</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{log.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {log.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                       <span className={cn(
                         log.color === 'primary' ? 'text-primary' : log.color === 'accent' ? 'text-accent' : 'text-muted-foreground'
                       )}>
                         {log.tag}
                       </span>
                       <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-6 px-1">
                <div>
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Deep Architecture</h3>
                   <p className="text-2xl font-bold tracking-tight">Main Protocol</p>
                </div>
              </div>
              <Card className="glass-card rounded-[3rem] p-10 lg:p-14 relative overflow-hidden flex flex-col lg:flex-row justify-between min-h-[340px] border-primary/10 group shadow-2xl">
                <div className="absolute right-[-10%] top-[-20%] w-[50%] h-[80%] bg-primary/20 rounded-full blur-[120px] transition-all duration-700 group-hover:scale-110"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-accent/15 rounded-full blur-[100px] transition-all duration-700 group-hover:scale-110 delay-100"></div>
                
                <div className="relative z-10 max-w-lg mb-8 lg:mb-0 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                    <Zap className="size-3 fill-current" />
                    High Priority Entry
                  </span>
                  <h4 className="text-4xl lg:text-5xl font-black leading-tight mb-6 tracking-tighter">
                    Ready to dump your <br/>
                    <span className="text-primary italic">Deep Logic?</span>
                  </h4>
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 max-w-sm">
                    Structural analysis of today's cognitive load and technical growth through decentralized journaling.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/journal/${today.toISOString().split('T')[0]}`}
                      className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 desktop-hover"
                    >
                      <Plus className="size-5" />
                      Initialize Node
                    </Link>
                    <Button variant="ghost" className="px-8 py-4 rounded-full border border-white/5 font-black text-xs uppercase tracking-widest hover:bg-white/5">
                      Archive Access
                    </Button>
                  </div>
                </div>
                
                <div className="relative z-10 flex flex-col justify-center items-center lg:items-end">
                   <div className="glass-card p-6 rounded-[2rem] border-white/10 w-full max-w-[280px] rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="size-12 rounded-2xl bg-muted/30 border border-white/5 flex items-center justify-center">
                            <Terminal className="size-6 text-primary" />
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Last Sync</p>
                            <p className="text-sm font-bold">14:24 Local</p>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[80%] bg-primary" />
                         </div>
                         <p className="text-[9px] font-bold text-primary text-right tracking-widest uppercase">80% Intensity</p>
                      </div>
                   </div>
                </div>
              </Card>
            </section>

            <section>
              <div className="flex justify-between items-end mb-6 px-1">
                 <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Taxonomy</h3>
                    <p className="text-2xl font-bold tracking-tight">Active Nodes</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeClusters.map((cluster, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="group px-6 py-6 h-auto glass-card rounded-[1.5rem] text-sm font-bold flex flex-col items-center gap-3 border-white/5 transition-all desktop-hover hover:bg-primary/5 hover:border-primary/20"
                  >
                    <div className="size-10 rounded-xl bg-background/50 flex items-center justify-center transition-transform group-hover:scale-110">
                       {cluster.icon}
                    </div>
                    <div className="text-center">
                       <p className="uppercase tracking-widest text-[10px] opacity-40 mb-0.5">{cluster.count} Nodes</p>
                       <span className="tracking-tight">{cluster.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </section>
          </div>

          {/* Side Column (Stats/Calendar) - Sticky on Desktop */}
          <div className="lg:col-span-4 flex flex-col space-y-8 lg:sticky lg:top-[120px]">
            <section className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Neuro-Sync</h3>
                   <p className="text-xl font-bold">Pulse Stream</p>
                </div>
                <span className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full font-black uppercase tracking-widest border border-primary/30">Live</span>
              </div>
              <div className="grid grid-cols-7 gap-3 mb-6">
                {days.map((day) => (
                  <span key={day} className="text-[10px] text-center font-black text-muted-foreground/30 uppercase">{day.charAt(0)}</span>
                ))}
                {weekDates.map((date, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center justify-center aspect-square rounded-xl font-bold text-xs transition-all relative group cursor-pointer",
                      date.getDate() === today.getDate()
                        ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/30 scale-110 z-10'
                        : 'hover:bg-white/5 text-foreground/70'
                    )}
                  >
                    <span>{date.getDate()}</span>
                    {date.getDate() % 2 === 0 && date.getDate() !== today.getDate() && (
                      <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary/40" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/5">
                 <Button variant="ghost" className="w-full justify-between px-4 py-6 rounded-2xl bg-muted/20 border border-white/5 hover:bg-white/5 group">
                    <span className="text-xs font-black uppercase tracking-widest">Full Resonance View</span>
                    <Calendar className="size-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                 </Button>
              </div>
            </section>

            <section className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">Memory Index</h3>
              <div className="space-y-6">
                {[
                  { label: 'Total Links', count: 124, trend: '+12', color: 'text-primary' },
                  { label: 'Connections', count: 48, trend: '+5', color: 'text-accent' },
                  { label: 'Deep Units', count: 32, trend: '+2', color: 'text-white' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-help">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground mb-1 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{stat.label}</p>
                      <p className={cn("text-3xl font-black tracking-tighter", stat.color)}>{stat.count}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[10px] text-green-500 font-black">▲ {stat.trend}</span>
                       <div className="w-12 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                          <div className="h-full w-2/3 bg-green-500/50" />
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-[1.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                 <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Insight</span>
                 </div>
                 <p className="text-xs text-muted-foreground leading-relaxed italic">
                   "Cognitive load is 15% lower than yesterday. High retention window open for another 2 hours."
                 </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
