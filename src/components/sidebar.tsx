'use client';

import Link from 'next/link';
import {
  GitFork,
  LayoutGrid,
  Plus,
  Search,
  SlidersHorizontal,
  Calendar,
  LogOut,
  Bell,
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
  const today = new Date().toISOString().split('T')[0];

  return (
    <aside className="hidden lg:flex flex-col w-[220px] h-screen fixed left-0 top-0 border-r border-border bg-background z-30 px-4 py-8">
      <div className="flex items-center gap-3 px-3 mb-12">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
          <GitFork className="size-5 text-primary rotate-180" />
        </div>
        <span className="font-bold text-xl tracking-tight">ThoughtFlow</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
              activeTab === item.key
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            <item.icon className={cn(
              "size-5 transition-colors",
              activeTab === item.key ? "text-primary-foreground" : "group-hover:text-primary"
            )} />
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border space-y-4">
        <Link
          href={`/journal/${today}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg neon-glow-primary hover:scale-[1.02] transition-transform active:scale-100"
        >
          <Plus className="size-5" />
          <span>New Entry</span>
        </Link>
        
        <div className="flex items-center justify-between px-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
