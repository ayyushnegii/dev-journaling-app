'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GitFork,
  LayoutGrid,
  Plus,
  SlidersHorizontal,
  Calendar,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Command,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type ActiveTab } from '@/components/bottom-nav';
import { Button } from '@/components/ui/button';

type SidebarProps = {
  activeTab: ActiveTab | 'calendar';
};

const navItems = [
  { name: 'Journal', href: '/', icon: LayoutGrid, key: 'dashboard' },
  { name: 'Mindmap', href: '/mindmap', icon: GitFork, key: 'mindmap' },
  { name: 'Calendar', href: '#', icon: Calendar, key: 'calendar' },
  { name: 'Settings', href: '#', icon: SlidersHorizontal, key: 'settings' },
] as const;

export function Sidebar({ activeTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '80px' : '260px'
    );
  }, [isCollapsed]);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen fixed left-0 top-0 border-r border-border/50 bg-background/50 backdrop-blur-xl z-30 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className={cn("flex items-center px-4 py-8 mb-4 transition-all duration-300", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
              <GitFork className="size-5 text-primary rotate-180" />
            </div>
            <span className="font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">ThoughtFlow</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
            <GitFork className="size-6 text-primary rotate-180" />
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-20 size-6 rounded-full bg-background border border-border shadow-md hover:bg-primary hover:text-primary-foreground transition-all z-40",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft className="size-3" />
        </Button>
      </div>

      <nav className="flex-1 space-y-2 px-3">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            title={isCollapsed ? item.name : undefined}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group relative',
              activeTab === item.key
                ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
          >
            <item.icon className={cn(
              "size-5 transition-transform duration-300 group-hover:scale-110",
              activeTab === item.key ? "text-primary-foreground" : "group-hover:text-primary"
            )} />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
                {item.key === 'dashboard' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-white/50 font-mono">12+</span>
                )}
              </div>
            )}
            {activeTab === item.key && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-4 py-6 border-t border-border/50 space-y-4">
        {!isCollapsed && (
          <div className="glass-card rounded-2xl p-4 mb-4 border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 transition-opacity group-hover:opacity-40">
              <Sparkles className="size-8 text-primary" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1">Upgrade Goal</p>
            <p className="text-xs font-bold leading-tight mb-3">Sync all nodes to the decentralized mesh.</p>
            <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            </div>
          </div>
        )}

        <Link
          href={`/journal/${today}`}
          className={cn(
            "flex items-center justify-center gap-2 w-full py-4 rounded-[2rem] bg-primary text-primary-foreground font-black shadow-lg shadow-primary/30 transition-all hover:scale-[1.03] active:scale-95",
            isCollapsed ? "px-0" : "px-4"
          )}
        >
          <Plus className="size-6" />
          {!isCollapsed && <span className="tracking-tight uppercase text-xs">New Node</span>}
        </Link>
        
        {!isCollapsed && (
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2">
               <div className="size-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">Operational</span>
            </div>
            <kbd className="hidden xl:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>J
            </kbd>
          </div>
        )}
      </div>
    </aside>
  );
}
