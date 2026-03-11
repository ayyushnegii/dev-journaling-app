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
      description: 'Document that pesky race condition...',
      category: 'Dev',
      tag: 'Sprint',
      color: 'primary',
    },
    {
      title: 'Mental State 🧠',
      description: 'How is your cognitive load today?',
      category: 'Personal',
      tag: 'Health',
      color: 'accent',
    },
    {
      title: 'Refactor Notes ⚡️',
      description: 'Keep track of tech debt items.',
      category: 'Code',
      tag: 'Legacy',
      color: 'muted',
    },
  ];

  const activeClusters = [
    { icon: <Zap className="size-4 text-primary" />, label: 'TypeScript' },
    { icon: <Brain className="size-4 text-accent" />, label: 'UI/UX' },
    { icon: <Database className="size-4 text-muted-foreground" />, label: 'Backend' },
    { icon: <Heart className="size-4 text-red-500" />, label: 'Fitness' },
  ];

  return (
    <AppShell activeTab="dashboard">
      <header className="flex items-center px-4 pt-6 pb-6 lg:pt-10 lg:pb-8 justify-between sticky top-0 z-10 bg-background/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Hi, there</h1>
          <p className="text-sm text-muted-foreground italic">System status: Creative</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Live Syncing</span>
          </div>
          <ThemeToggle />
          <Avatar className="h-11 w-11 border-2 border-primary/50">
            <AvatarImage src={userAvatar?.imageUrl} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="px-4 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 flex flex-col space-y-8">
            <section className="order-2 lg:order-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Quick Logs</h3>
                <Button variant="link" className="text-muted-foreground h-auto p-0 text-xs">
                  See all
                </Button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 lg:mx-0 px-4 lg:px-0 scrollbar-hide">
                {quickLogs.map((log, i) => (
                  <Card
                    key={i}
                    className={`min-w-[160px] lg:min-w-[200px] glass-card rounded-2xl p-5 flex flex-col gap-3 border-l-4 ${
                      log.color === 'primary'
                        ? 'border-l-primary/70'
                        : log.color === 'accent'
                        ? 'border-l-accent/70'
                        : 'border-l-muted/70'
                    } hover:border-l-primary transition-all duration-300`}
                  >
                    <h4 className="text-sm font-bold">{log.title}</h4>
                    <p className="text-[12px] text-muted-foreground leading-relaxed flex-1">
                      {log.description}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-[9px] font-black uppercase ${
                          log.color === 'primary' ? 'text-primary' : log.color === 'accent' ? 'text-accent' : 'text-muted-foreground'
                        }`}
                      >
                        {log.tag}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Current Focus</h3>
                <Button variant="link" className="text-primary h-auto p-0 font-bold">
                  Review Journey
                </Button>
              </div>
              <Card className="glass-card rounded-3xl p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[220px] lg:min-h-[260px] border-primary/10">
                <div className="absolute right-[-5%] top-[-10%] w-[40%] h-[60%] bg-primary/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] bg-accent/15 rounded-full blur-[60px]"></div>
                
                <div className="relative z-10 max-w-md">
                  <h4 className="text-2xl lg:text-3xl font-bold leading-tight mb-4">
                    Deep Work Pulse
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Analyze your cognitive load and technical growth through structured journaling.
                  </p>
                </div>
                
                <Link
                  href={`/journal/${today.toISOString().split('T')[0]}`}
                  className="relative z-10 flex items-center justify-between group bg-background/50 hover:bg-background/80 transition-colors p-4 rounded-2xl border border-white/5 w-full lg:max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Terminal className="size-5 text-primary" />
                    </div>
                    <span className="text-sm font-bold tracking-wide">
                      Entry: {today.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <ArrowRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Active Clusters</h3>
              <div className="flex flex-wrap gap-3">
                {activeClusters.map((cluster, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="px-5 py-3 h-auto glass-card rounded-xl text-xs font-bold flex items-center gap-3 border-white/5 hover:border-primary/40 transition-all hover:bg-primary/5 hover:-translate-y-0.5"
                  >
                    {cluster.icon}
                    <span>{cluster.label}</span>
                  </Button>
                ))}
              </div>
            </section>
          </div>

          {/* Side Column (Stats/Calendar) */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <section className="glass-card rounded-2xl p-6 border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Pulse Week</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase tracking-tight">Active</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <span key={day} className="text-[10px] text-center font-bold text-muted-foreground uppercase opacity-50">{day.charAt(0)}</span>
                ))}
                {weekDates.map((date, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center justify-center aspect-square rounded-lg font-bold text-xs transition-all",
                      date.getDate() === today.getDate()
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'hover:bg-muted/50 text-foreground'
                    )}
                  >
                    <span>{date.getDate()}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-2xl p-6 border-white/5 flex-1 min-h-[200px]">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">Memory Index</h3>
              <div className="space-y-4">
                {[
                  { label: 'Total Links', count: 124, trend: '+12' },
                  { label: 'Connections', count: 48, trend: '+5' },
                  { label: 'Deep Units', count: 32, trend: '+2' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-end border-b border-border/50 pb-3">
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.count}</p>
                    </div>
                    <span className="text-[10px] text-green-500 font-bold">{stat.trend}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
