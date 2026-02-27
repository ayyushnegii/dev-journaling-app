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
      <header className="flex items-center px-4 pt-6 pb-6 justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Hi, there</h1>
          <p className="text-sm text-muted-foreground">System status: Creative</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Avatar className="h-11 w-11 border-2 border-primary/50">
            <AvatarImage src={userAvatar?.imageUrl} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 space-y-8 pb-8">
        <section>
          <div className="flex w-full justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-4">
            {days.map((day) => (
              <span key={day}>{day.charAt(0)}</span>
            ))}
          </div>
          <div className="flex justify-between items-center gap-2">
            {weekDates.map((date, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center min-w-[44px] h-14 rounded-2xl font-bold text-sm transition-colors ${
                  date.getDate() === today.getDate()
                    ? 'bg-primary text-primary-foreground neon-glow-primary'
                    : 'glass-card text-foreground'
                }`}
              >
                <span>{date.getDate()}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Focus Session</h3>
            <Button variant="link" className="text-primary h-auto p-0">
              View Timeline
            </Button>
          </div>
          <Card className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-52 border-primary/20">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/10 to-transparent"></div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold leading-tight">
                Deep Work Pulse
              </h4>
              <p className="text-muted-foreground text-xs mt-2 max-w-[160px]">
                Log your technical breakthroughs and architecture decisions.
              </p>
            </div>
            <Link
              href={`/journal/${today.toISOString().split('T')[0]}`}
              className="relative z-10 flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Terminal className="size-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary tracking-wide">
                Start Today's Entry
              </span>
              <ArrowRight className="size-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </Card>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Quick Logs</h3>
            <Button variant="link" className="text-muted-foreground h-auto p-0">
              Edit Layout
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {quickLogs.map((log, i) => (
              <Card
                key={i}
                className={`min-w-[160px] glass-card rounded-2xl p-5 flex flex-col gap-3 border-l-4 ${
                  log.color === 'primary'
                    ? 'border-l-primary'
                    : log.color === 'accent'
                    ? 'border-l-accent'
                    : 'border-l-muted'
                }`}
              >
                <h4 className="text-sm font-bold">{log.title}</h4>
                <p className="text-[12px] text-muted-foreground leading-relaxed flex-1">
                  {log.description}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span
                    className={`text-[9px] font-black uppercase ${
                      log.color === 'primary'
                        ? 'text-primary'
                        : log.color === 'accent'
                        ? 'text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {log.tag}
                  </span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-md font-bold ${
                      log.color === 'primary'
                        ? 'bg-primary/10 text-primary'
                        : log.color === 'accent'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {log.category}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold mb-4">Active Clusters</h3>
          <div className="flex flex-wrap gap-3">
            {activeClusters.map((cluster, i) => (
              <Button
                key={i}
                variant="ghost"
                className="px-5 py-2.5 h-auto glass-card rounded-xl text-xs font-bold flex items-center gap-2 border-white/10 hover:border-primary/50 transition-colors hover:bg-primary/10"
              >
                {cluster.icon}
                <span>{cluster.label}</span>
              </Button>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
