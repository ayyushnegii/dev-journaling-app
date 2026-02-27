'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GitFork,
  LayoutGrid,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ActiveTab = 'dashboard' | 'search' | 'mindmap' | 'settings';

const navItems = [
  { name: 'Dash', href: '/', icon: LayoutGrid, key: 'dashboard' },
  { name: 'Query', href: '#', icon: Search, key: 'search' },
  { name: 'Graph', href: '/mindmap', icon: GitFork, key: 'mindmap' },
  {
    name: 'Config',
    href: '#',
    icon: SlidersHorizontal,
    key: 'settings',
  },
] as const;

type BottomNavProps = {
  activeTab: ActiveTab;
};

export function BottomNav({ activeTab }: BottomNavProps) {
  const today = new Date().toISOString().split('T')[0];
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-xl px-4 pb-safe-or-4 pt-3 z-20 sm:absolute">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.slice(0, 2).map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1.5 transition-colors',
              activeTab === item.key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="size-5" />
            <p className="text-[9px] font-black uppercase tracking-tighter">
              {item.name}
            </p>
          </Link>
        ))}

        <div className="relative -top-8">
          <Link
            href={`/journal/${today}`}
            className="bg-primary text-primary-foreground size-16 rounded-2xl flex items-center justify-center shadow-lg neon-glow-primary border-2 border-background transform rotate-45 hover:rotate-0 transition-transform duration-300"
          >
            <Plus className="size-8 font-bold -rotate-45" />
          </Link>
        </div>

        {navItems.slice(2).map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1.5 transition-colors',
              activeTab === item.key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="size-5" />
            <p className="text-[9px] font-black uppercase tracking-tighter">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
